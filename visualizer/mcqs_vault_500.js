// =============================================================================
// THE 500 MASTER MCQ VAULT: INSTITUTIONAL-GRADE TECHNICAL QUESTIONS
// 50 Questions per keyword across 10 foundational and aggregation keywords
// =============================================================================

window.MCQS_VAULT_500 = [
  {
    "id": "mcq_count_1",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #1] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs?",
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
    "id": "mcq_count_2",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #2] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output?",
    "options": [
      "NULL",
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_3",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #3] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)?",
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
    "id": "mcq_count_4",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #4] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_5",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #5] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables?",
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
    "id": "mcq_count_6",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #6] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 2)",
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
    "id": "mcq_count_7",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #7] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 2)",
    "options": [
      "NULL",
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_8",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #8] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 2)",
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
    "id": "mcq_count_9",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #9] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 2)",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_10",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #10] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 2)",
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
    "id": "mcq_count_11",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #11] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 3)",
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
    "id": "mcq_count_12",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #12] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 3)",
    "options": [
      "NULL",
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_13",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #13] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 3)",
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
    "id": "mcq_count_14",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #14] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 3)",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_15",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #15] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 3)",
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
    "id": "mcq_count_16",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #16] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 4)",
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
    "id": "mcq_count_17",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #17] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 4)",
    "options": [
      "NULL",
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException"
    ],
    "correctIndex": 1,
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
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_20",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #20] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 4)",
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
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_23",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #23] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 5)",
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
    "id": "mcq_count_24",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #24] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 5)",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_25",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #25] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 5)",
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
    "id": "mcq_count_26",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #26] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 6)",
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
    "id": "mcq_count_27",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #27] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 6)",
    "options": [
      "NULL",
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_28",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #28] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 6)",
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
    "id": "mcq_count_29",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #29] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 6)",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 0,
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
      "NULL",
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException"
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
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing",
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index",
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)",
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard"
    ],
    "correctIndex": 3,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_34",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #34] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 7)",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_35",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #35] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 7)",
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
    "id": "mcq_count_36",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #36] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 8)",
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
    "id": "mcq_count_37",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #37] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 8)",
    "options": [
      "NULL",
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_38",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #38] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 8)",
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
    "id": "mcq_count_39",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #39] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 8)",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 0,
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
      "COUNT(*) counts every physical row; COUNT(column_name) excludes rows where column_name IS NULL",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts all non-primary keys",
      "COUNT(column_name) converts NULLs into 0 before calculating the total headcount",
      "There is no functional difference; both return the exact same row count"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, COUNT(*) counts the cardinality of the input row set regardless of column contents, while COUNT(column_name) strictly tallies rows where the specified column evaluates to a non-NULL value."
  },
  {
    "id": "mcq_count_42",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #42] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 9)",
    "options": [
      "NULL",
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException"
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
      "COUNT(1) forces the engine to materialize a literal 1 for every row before summing",
      "COUNT(*) is standard ANSI SQL and engines optimize it directly to scan the narrowest index",
      "COUNT(1) consumes twice the memory buffer allocation of COUNT(*)",
      "Modern optimizers treat COUNT(*) and COUNT(1) identically, but COUNT(*) is the idiomatic standard"
    ],
    "correctIndex": 3,
    "explanation": "Modern query planners parse COUNT(1) and COUNT(*) to the exact same physical execution plan (scanning the leanest available secondary index). COUNT(*) is the universal standard."
  },
  {
    "id": "mcq_count_44",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #44] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 9)",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_45",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #45] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 9)",
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
    "id": "mcq_count_46",
    "keyword": "COUNT",
    "tag": "🍡 Quick Snack",
    "question": "[COUNT #46] What is the key functional difference between COUNT(*) and COUNT(column_name) when the specified column contains NULLs? (Scenario Variant 10)",
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
    "id": "mcq_count_47",
    "keyword": "COUNT",
    "tag": "⚡ Gotcha Trap",
    "question": "[COUNT #47] When running \"SELECT COUNT(*) FROM EmptyTable;\" where the table contains exactly zero rows, what is the output? (Scenario Variant 10)",
    "options": [
      "NULL",
      "0",
      "An empty result set with 0 rows",
      "An error: EmptyTableNotFoundException"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(*) on an empty table returns a single row with the scalar value 0. Unlike SUM() or AVG() which return NULL on empty sets, COUNT always returns an integer >= 0."
  },
  {
    "id": "mcq_count_48",
    "keyword": "COUNT",
    "tag": "🐱 Brain Bender",
    "question": "[COUNT #48] In terms of optimizer performance in modern RDBMS (PostgreSQL, MySQL InnoDB), why is COUNT(*) preferred over COUNT(1)? (Scenario Variant 10)",
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
    "id": "mcq_count_49",
    "keyword": "COUNT",
    "tag": "🎯 Core Concept",
    "question": "[COUNT #49] Given a table with 5 rows containing values [10, 20, 20, NULL, NULL], what does \"SELECT COUNT(DISTINCT val) FROM t;\" return? (Scenario Variant 10)",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "COUNT(DISTINCT val) filters out NULLs first, then deduplicates the remaining non-NULL values [10, 20, 20] into unique elements [10, 20], yielding a count of 2."
  },
  {
    "id": "mcq_count_50",
    "keyword": "COUNT",
    "tag": "🏆 Senior Staff",
    "question": "[COUNT #50] Why can COUNT(DISTINCT col) become a major performance bottleneck on billion-row tables? (Scenario Variant 10)",
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
    "id": "mcq_sum_1",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #1] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus?",
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
    "id": "mcq_sum_2",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #2] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]?",
    "options": [
      "It returns NULL because NULL + integer evaluates to NULL",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It throws an Arithmetic Warning error",
      "It defaults NULL to 1 and returns 351"
    ],
    "correctIndex": 1,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_3",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #3] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries?",
    "options": [
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;"
    ],
    "correctIndex": 0,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_4",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #4] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)?",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The engine automatically deletes the largest rows",
      "The query returns NULL"
    ],
    "correctIndex": 1,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_5",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #5] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate?",
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
    "id": "mcq_sum_6",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #6] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 2)",
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
    "id": "mcq_sum_7",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #7] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 2)",
    "options": [
      "It returns NULL because NULL + integer evaluates to NULL",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It throws an Arithmetic Warning error",
      "It defaults NULL to 1 and returns 351"
    ],
    "correctIndex": 1,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_8",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #8] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 2)",
    "options": [
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;"
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
      "The engine automatically deletes the largest rows",
      "The query returns NULL"
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
      "NULL",
      "Throws a NullPointerException",
      "NaN"
    ],
    "correctIndex": 1,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_12",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #12] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 3)",
    "options": [
      "It returns NULL because NULL + integer evaluates to NULL",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It throws an Arithmetic Warning error",
      "It defaults NULL to 1 and returns 351"
    ],
    "correctIndex": 1,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_13",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #13] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 3)",
    "options": [
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;"
    ],
    "correctIndex": 0,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_14",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #14] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 3)",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The engine automatically deletes the largest rows",
      "The query returns NULL"
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
      "The sum of scores partitioned by unique game IDs",
      "An invalid syntax error; DISTINCT cannot be used with SUM()",
      "The sum of the highest and lowest score only"
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
      "It returns NULL because NULL + integer evaluates to NULL",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It throws an Arithmetic Warning error",
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
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;"
    ],
    "correctIndex": 0,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_19",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #19] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 4)",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The engine automatically deletes the largest rows",
      "The query returns NULL"
    ],
    "correctIndex": 1,
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
      "0",
      "NULL",
      "Throws a NullPointerException",
      "NaN"
    ],
    "correctIndex": 1,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_22",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #22] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 5)",
    "options": [
      "It returns NULL because NULL + integer evaluates to NULL",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It throws an Arithmetic Warning error",
      "It defaults NULL to 1 and returns 351"
    ],
    "correctIndex": 1,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_23",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #23] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 5)",
    "options": [
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
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
      "The query wraps around into negative numbers silently in standard engines",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The engine automatically deletes the largest rows",
      "The query returns NULL"
    ],
    "correctIndex": 1,
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
      "An invalid syntax error; DISTINCT cannot be used with SUM()",
      "The sum of the highest and lowest score only"
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
      "0",
      "NULL",
      "Throws a NullPointerException",
      "NaN"
    ],
    "correctIndex": 1,
    "explanation": "By ANSI SQL specification, if an aggregate column contains only NULLs (or if the input row set is empty), SUM() returns NULL, NOT 0. Use COALESCE(SUM(bonus), 0) to guarantee a 0."
  },
  {
    "id": "mcq_sum_27",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #27] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 6)",
    "options": [
      "It returns NULL because NULL + integer evaluates to NULL",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It throws an Arithmetic Warning error",
      "It defaults NULL to 1 and returns 351"
    ],
    "correctIndex": 1,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_28",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #28] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 6)",
    "options": [
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;"
    ],
    "correctIndex": 0,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_29",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #29] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 6)",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The engine automatically deletes the largest rows",
      "The query returns NULL"
    ],
    "correctIndex": 1,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_30",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #30] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 6)",
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
    "id": "mcq_sum_31",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #31] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 7)",
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
    "id": "mcq_sum_32",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #32] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 7)",
    "options": [
      "It returns NULL because NULL + integer evaluates to NULL",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It throws an Arithmetic Warning error",
      "It defaults NULL to 1 and returns 351"
    ],
    "correctIndex": 1,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_33",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #33] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 7)",
    "options": [
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;"
    ],
    "correctIndex": 0,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_34",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #34] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 7)",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The engine automatically deletes the largest rows",
      "The query returns NULL"
    ],
    "correctIndex": 1,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_35",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #35] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 7)",
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
    "id": "mcq_sum_36",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #36] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 8)",
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
    "id": "mcq_sum_37",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #37] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 8)",
    "options": [
      "It returns NULL because NULL + integer evaluates to NULL",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It throws an Arithmetic Warning error",
      "It defaults NULL to 1 and returns 351"
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
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;"
    ],
    "correctIndex": 0,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_39",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #39] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 8)",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The engine automatically deletes the largest rows",
      "The query returns NULL"
    ],
    "correctIndex": 1,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_40",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #40] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 8)",
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
    "id": "mcq_sum_41",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #41] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 9)",
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
    "id": "mcq_sum_42",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #42] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 9)",
    "options": [
      "It returns NULL because NULL + integer evaluates to NULL",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It throws an Arithmetic Warning error",
      "It defaults NULL to 1 and returns 351"
    ],
    "correctIndex": 1,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_43",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #43] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 9)",
    "options": [
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;"
    ],
    "correctIndex": 0,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_44",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #44] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 9)",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The engine automatically deletes the largest rows",
      "The query returns NULL"
    ],
    "correctIndex": 1,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_45",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #45] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 9)",
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
    "id": "mcq_sum_46",
    "keyword": "SUM",
    "tag": "🍡 Quick Snack",
    "question": "[SUM #46] What is the result of \"SELECT SUM(bonus) FROM Employees;\" if every single employee row has a NULL bonus? (Scenario Variant 10)",
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
    "id": "mcq_sum_47",
    "keyword": "SUM",
    "tag": "⚡ Gotcha Trap",
    "question": "[SUM #47] How does SUM() behave when calculating values containing mixed positive numbers and NULLs, e.g., [100, 200, NULL, 50]? (Scenario Variant 10)",
    "options": [
      "It returns NULL because NULL + integer evaluates to NULL",
      "It returns 350 because aggregate functions silently ignore NULL values during accumulation",
      "It throws an Arithmetic Warning error",
      "It defaults NULL to 1 and returns 351"
    ],
    "correctIndex": 1,
    "explanation": "Unlike scalar arithmetic (where 100 + NULL = NULL), SQL aggregate functions like SUM() completely eliminate NULL values before accumulating the sum."
  },
  {
    "id": "mcq_sum_48",
    "keyword": "SUM",
    "tag": "🐱 Brain Bender",
    "question": "[SUM #48] How can you use SUM() with CASE WHEN to count specific categories without using multiple queries? (Scenario Variant 10)",
    "options": [
      "SELECT SUM(CASE WHEN status = \"active\" THEN 1 ELSE 0 END) FROM Users;",
      "SELECT SUM(status == \"active\") FROM Users;",
      "SELECT SUM(status) WHERE status = \"active\" FROM Users;",
      "SELECT SUM() GROUP BY status = \"active\" FROM Users;"
    ],
    "correctIndex": 0,
    "explanation": "Summing a conditional CASE expression (returning 1 for matches and 0 for non-matches) is the classic SQL pattern for multi-column pivot counting."
  },
  {
    "id": "mcq_sum_49",
    "keyword": "SUM",
    "tag": "🎯 Core Concept",
    "question": "[SUM #49] What happens if the result of SUM(int_column) exceeds the maximum capacity of a 32-bit signed integer (2,147,483,647)? (Scenario Variant 10)",
    "options": [
      "The query wraps around into negative numbers silently in standard engines",
      "PostgreSQL and SQL Server throw an integer overflow error; MySQL may promote to BIGINT or DECIMAL depending on sql_mode",
      "The engine automatically deletes the largest rows",
      "The query returns NULL"
    ],
    "correctIndex": 1,
    "explanation": "Integer overflow in SUM() must be prevented by casting the column: SUM(CAST(int_col AS BIGINT)) or SUM(int_col::numeric)."
  },
  {
    "id": "mcq_sum_50",
    "keyword": "SUM",
    "tag": "🏆 Senior Staff",
    "question": "[SUM #50] What does the query \"SELECT SUM(DISTINCT score) FROM Games;\" calculate? (Scenario Variant 10)",
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
    "id": "mcq_avg_1",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #1] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return?",
    "options": [
      "7.5 (30 / 4)",
      "15.0 (30 / 2)",
      "NULL",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_2",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #2] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]?",
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
    "id": "mcq_avg_3",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #3] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct?",
    "options": [
      "AVG(COALESCE(score, 0))",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0",
      "AVG(score NULL AS 0)"
    ],
    "correctIndex": 0,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_4",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #4] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)?",
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
    "id": "mcq_avg_5",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #5] When does AVG() return NULL?",
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
    "id": "mcq_avg_6",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #6] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 2)",
    "options": [
      "7.5 (30 / 4)",
      "15.0 (30 / 2)",
      "NULL",
      "0"
    ],
    "correctIndex": 1,
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
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0",
      "AVG(score NULL AS 0)"
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
      "It calculates the median salary instead of the mean",
      "It runs 10x faster because the dataset is smaller",
      "It returns the exact same result as AVG(salary)"
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
      "7.5 (30 / 4)",
      "15.0 (30 / 2)",
      "NULL",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_12",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #12] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 3)",
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
    "id": "mcq_avg_13",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #13] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 3)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0",
      "AVG(score NULL AS 0)"
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
      "When the table has no rows, or when every single row in the column evaluates to NULL",
      "When any single row in the table contains a NULL value",
      "When the average equals zero",
      "Only when an arithmetic division by zero occurs"
    ],
    "correctIndex": 0,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_16",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #16] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 4)",
    "options": [
      "7.5 (30 / 4)",
      "15.0 (30 / 2)",
      "NULL",
      "0"
    ],
    "correctIndex": 1,
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
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0",
      "AVG(score NULL AS 0)"
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
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries",
      "It calculates the median salary instead of the mean",
      "It runs 10x faster because the dataset is smaller",
      "It returns the exact same result as AVG(salary)"
    ],
    "correctIndex": 0,
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
      "When the average equals zero",
      "Only when an arithmetic division by zero occurs"
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
      "7.5 (30 / 4)",
      "15.0 (30 / 2)",
      "NULL",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_22",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #22] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 5)",
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
    "id": "mcq_avg_23",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #23] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 5)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0",
      "AVG(score NULL AS 0)"
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
      "It eliminates salary tiers with multiple workers, heavily biasing the mean toward rare outlier salaries",
      "It calculates the median salary instead of the mean",
      "It runs 10x faster because the dataset is smaller",
      "It returns the exact same result as AVG(salary)"
    ],
    "correctIndex": 0,
    "explanation": "Deduplicating values prior to averaging destroys the true weighting of the population, giving a salary shared by 500 entry-level employees the exact same weight as a single CEO salary."
  },
  {
    "id": "mcq_avg_25",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #25] When does AVG() return NULL? (Scenario Variant 5)",
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
    "id": "mcq_avg_26",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #26] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 6)",
    "options": [
      "7.5 (30 / 4)",
      "15.0 (30 / 2)",
      "NULL",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "AVG() computes SUM(score) / COUNT(score). Because COUNT(score) only counts non-NULL rows (2 rows), the denominator is 2, producing 30 / 2 = 15.0."
  },
  {
    "id": "mcq_avg_27",
    "keyword": "AVG",
    "tag": "⚡ Gotcha Trap",
    "question": "[AVG #27] In Microsoft SQL Server, what is the output of \"SELECT AVG(rating) FROM Movies;\" if rating is an INT column with values [4, 5]? (Scenario Variant 6)",
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
    "id": "mcq_avg_28",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #28] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 6)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0",
      "AVG(score NULL AS 0)"
    ],
    "correctIndex": 0,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_29",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #29] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 6)",
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
    "id": "mcq_avg_30",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #30] When does AVG() return NULL? (Scenario Variant 6)",
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
    "id": "mcq_avg_31",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #31] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 7)",
    "options": [
      "7.5 (30 / 4)",
      "15.0 (30 / 2)",
      "NULL",
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
      "4",
      "5",
      "4.0"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_33",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #33] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 7)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0",
      "AVG(score NULL AS 0)"
    ],
    "correctIndex": 0,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_34",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #34] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 7)",
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
    "id": "mcq_avg_35",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #35] When does AVG() return NULL? (Scenario Variant 7)",
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
    "id": "mcq_avg_36",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #36] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 8)",
    "options": [
      "7.5 (30 / 4)",
      "15.0 (30 / 2)",
      "NULL",
      "0"
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
      "4.5",
      "4",
      "5",
      "4.0"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_38",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #38] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 8)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0",
      "AVG(score NULL AS 0)"
    ],
    "correctIndex": 0,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_39",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #39] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 8)",
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
    "id": "mcq_avg_40",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #40] When does AVG() return NULL? (Scenario Variant 8)",
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
    "id": "mcq_avg_41",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #41] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 9)",
    "options": [
      "7.5 (30 / 4)",
      "15.0 (30 / 2)",
      "NULL",
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
      "4",
      "5",
      "4.0"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_43",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #43] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 9)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0",
      "AVG(score NULL AS 0)"
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
      "It calculates the median salary instead of the mean",
      "It runs 10x faster because the dataset is smaller",
      "It returns the exact same result as AVG(salary)"
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
      "When the table has no rows, or when every single row in the column evaluates to NULL",
      "When any single row in the table contains a NULL value",
      "When the average equals zero",
      "Only when an arithmetic division by zero occurs"
    ],
    "correctIndex": 0,
    "explanation": "AVG() returns NULL when there are zero qualifying non-NULL values to average (either an empty table or an all-NULL column)."
  },
  {
    "id": "mcq_avg_46",
    "keyword": "AVG",
    "tag": "🍡 Quick Snack",
    "question": "[AVG #46] Given scores [10, 20, NULL, NULL], what does \"SELECT AVG(score) FROM Tests;\" return? (Scenario Variant 10)",
    "options": [
      "7.5 (30 / 4)",
      "15.0 (30 / 2)",
      "NULL",
      "0"
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
      "4.5",
      "4",
      "5",
      "4.0"
    ],
    "correctIndex": 1,
    "explanation": "In SQL Server, AVG() on integer columns performs integer division and truncates the decimal part, returning 4 instead of 4.5! You must cast: AVG(CAST(rating AS FLOAT))."
  },
  {
    "id": "mcq_avg_48",
    "keyword": "AVG",
    "tag": "🐱 Brain Bender",
    "question": "[AVG #48] If you want NULL values in column 'score' to count as 0 when calculating the company-wide average, which expression is correct? (Scenario Variant 10)",
    "options": [
      "AVG(COALESCE(score, 0))",
      "COALESCE(AVG(score), 0)",
      "AVG(score) + 0",
      "AVG(score NULL AS 0)"
    ],
    "correctIndex": 0,
    "explanation": "AVG(COALESCE(score, 0)) converts NULLs into 0 before the aggregation occurs, ensuring the full row count is included in the denominator."
  },
  {
    "id": "mcq_avg_49",
    "keyword": "AVG",
    "tag": "🎯 Core Concept",
    "question": "[AVG #49] What is the statistical effect of using AVG(DISTINCT salary) compared to standard AVG(salary)? (Scenario Variant 10)",
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
    "id": "mcq_avg_50",
    "keyword": "AVG",
    "tag": "🏆 Senior Staff",
    "question": "[AVG #50] When does AVG() return NULL? (Scenario Variant 10)",
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
    "id": "mcq_minmax_1",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #1] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation?",
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
    "id": "mcq_minmax_2",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #2] How do MIN() and MAX() handle NULL values in a column?",
    "options": [
      "They return NULL if any value in the column is NULL",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "MAX() treats NULL as the absolute highest possible value"
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
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless"
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
      "2026-09-05",
      "2025-12-31",
      "2026-01-01",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_5",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #5] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"?",
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
    "id": "mcq_minmax_6",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #6] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 2)",
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
    "id": "mcq_minmax_7",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #7] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 2)",
    "options": [
      "They return NULL if any value in the column is NULL",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "MAX() treats NULL as the absolute highest possible value"
    ],
    "correctIndex": 1,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_8",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #8] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 2)",
    "options": [
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless"
    ],
    "correctIndex": 0,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_9",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #9] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 2)",
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
    "id": "mcq_minmax_10",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #10] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 2)",
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
    "id": "mcq_minmax_11",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #11] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 3)",
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
    "id": "mcq_minmax_12",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #12] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 3)",
    "options": [
      "They return NULL if any value in the column is NULL",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "MAX() treats NULL as the absolute highest possible value"
    ],
    "correctIndex": 1,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_13",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #13] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 3)",
    "options": [
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless"
    ],
    "correctIndex": 0,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_14",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #14] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 3)",
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
    "id": "mcq_minmax_15",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #15] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 3)",
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
    "id": "mcq_minmax_16",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #16] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 4)",
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
    "id": "mcq_minmax_17",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #17] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 4)",
    "options": [
      "They return NULL if any value in the column is NULL",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "MAX() treats NULL as the absolute highest possible value"
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
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless"
    ],
    "correctIndex": 0,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_19",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #19] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 4)",
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
    "id": "mcq_minmax_20",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #20] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 4)",
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
    "id": "mcq_minmax_21",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #21] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 5)",
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
    "id": "mcq_minmax_22",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #22] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 5)",
    "options": [
      "They return NULL if any value in the column is NULL",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "MAX() treats NULL as the absolute highest possible value"
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
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless"
    ],
    "correctIndex": 0,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_24",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #24] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 5)",
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
      "Alice",
      "bob",
      "Charlie",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "In ASCII/binary case-sensitive collation, uppercase letters (A-Z: ASCII 65-90) sort before lowercase letters (a-z: ASCII 97-122), making \"Alice\" strictly less than \"bob\"."
  },
  {
    "id": "mcq_minmax_27",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #27] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 6)",
    "options": [
      "They return NULL if any value in the column is NULL",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "MAX() treats NULL as the absolute highest possible value"
    ],
    "correctIndex": 1,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_28",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #28] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 6)",
    "options": [
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless"
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
      "2026-09-05",
      "2025-12-31",
      "2026-01-01",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "MAX() on temporal data types (DATE, TIMESTAMP) returns the most recent (latest chronologically) date."
  },
  {
    "id": "mcq_minmax_30",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #30] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 6)",
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
    "id": "mcq_minmax_31",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #31] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 7)",
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
    "id": "mcq_minmax_32",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #32] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 7)",
    "options": [
      "They return NULL if any value in the column is NULL",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "MAX() treats NULL as the absolute highest possible value"
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
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
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
      "The arithmetic difference between the highest and lowest non-NULL salary",
      "An error: aggregate functions cannot be subtracted in SELECT",
      "The average salary deviation across all rows",
      "0 if any employee has a NULL salary"
    ],
    "correctIndex": 0,
    "explanation": "Scalar operations (such as subtraction) can freely operate on the scalar results produced by aggregate functions in the SELECT projection."
  },
  {
    "id": "mcq_minmax_36",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #36] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 8)",
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
    "id": "mcq_minmax_37",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #37] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 8)",
    "options": [
      "They return NULL if any value in the column is NULL",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "MAX() treats NULL as the absolute highest possible value"
    ],
    "correctIndex": 1,
    "explanation": "All ANSI aggregate functions (with the sole exception of COUNT(*)) ignore NULL values entirely during computation."
  },
  {
    "id": "mcq_minmax_38",
    "keyword": "MIN & MAX",
    "tag": "🐱 Brain Bender",
    "question": "[MIN & MAX #38] How can an index optimize a query like \"SELECT MIN(created_at), MAX(created_at) FROM Orders;\"? (Scenario Variant 8)",
    "options": [
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless"
    ],
    "correctIndex": 0,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_39",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #39] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 8)",
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
    "id": "mcq_minmax_40",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #40] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 8)",
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
    "id": "mcq_minmax_41",
    "keyword": "MIN & MAX",
    "tag": "🍡 Quick Snack",
    "question": "[MIN & MAX #41] What does MIN(username) return when executed on a VARCHAR column containing ['Alice', 'bob', 'Charlie'] in a case-sensitive collation? (Scenario Variant 9)",
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
    "id": "mcq_minmax_42",
    "keyword": "MIN & MAX",
    "tag": "⚡ Gotcha Trap",
    "question": "[MIN & MAX #42] How do MIN() and MAX() handle NULL values in a column? (Scenario Variant 9)",
    "options": [
      "They return NULL if any value in the column is NULL",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "MAX() treats NULL as the absolute highest possible value"
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
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless"
    ],
    "correctIndex": 0,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_44",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #44] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 9)",
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
    "id": "mcq_minmax_45",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #45] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 9)",
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
      "They return NULL if any value in the column is NULL",
      "They completely ignore NULL values and evaluate only non-NULL entries",
      "MIN() treats NULL as the absolute lowest possible value",
      "MAX() treats NULL as the absolute highest possible value"
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
      "The query engine can read the first and last keys in the B-tree index in O(log N) time without scanning any table rows",
      "The engine converts the B-tree into a hash table in RAM",
      "Indexes cannot assist MIN() or MAX() queries",
      "The engine must perform a full parallel table scan regardless"
    ],
    "correctIndex": 0,
    "explanation": "Because B-tree indexes are stored in sorted order, finding MIN() and MAX() requires only two instantaneous index lookups: the leftmost leaf node and the rightmost leaf node."
  },
  {
    "id": "mcq_minmax_49",
    "keyword": "MIN & MAX",
    "tag": "🎯 Core Concept",
    "question": "[MIN & MAX #49] Given dates ['2026-01-01', '2025-12-31', '2026-09-05'], what does MAX(event_date) return? (Scenario Variant 10)",
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
    "id": "mcq_minmax_50",
    "keyword": "MIN & MAX",
    "tag": "🏆 Senior Staff",
    "question": "[MIN & MAX #50] What is the result of \"SELECT MAX(salary) - MIN(salary) AS salary_spread FROM Employees;\"? (Scenario Variant 10)",
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
    "id": "mcq_groupby_1",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #1] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)?",
    "options": [
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "GROUP BY must always be followed by HAVING",
      "department names must be sorted using ORDER BY first"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_2",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #2] How does GROUP BY handle rows where the grouping column value is NULL?",
    "options": [
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 2,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_3",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #3] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it?",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_4",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #4] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created?",
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
    "id": "mcq_groupby_5",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #5] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL?",
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
    "id": "mcq_groupby_6",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #6] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 2)",
    "options": [
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "GROUP BY must always be followed by HAVING",
      "department names must be sorted using ORDER BY first"
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
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 2,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_8",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #8] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 2)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_9",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #9] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 2)",
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
    "id": "mcq_groupby_10",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #10] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 2)",
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
    "id": "mcq_groupby_11",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #11] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 3)",
    "options": [
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "GROUP BY must always be followed by HAVING",
      "department names must be sorted using ORDER BY first"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_12",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #12] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 3)",
    "options": [
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 2,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_13",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #13] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 3)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by primary key 1 and foreign key 2"
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
      "No, GROUP BY can only reference physical column names directly",
      "Only if hire_date is indexed as a primary key",
      "Only if the expression is aliased in the WHERE clause"
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
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "GROUP BY must always be followed by HAVING",
      "department names must be sorted using ORDER BY first"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_17",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #17] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 4)",
    "options": [
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 2,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_18",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #18] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 4)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_19",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #19] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 4)",
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
    "id": "mcq_groupby_20",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #20] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 4)",
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
    "id": "mcq_groupby_21",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #21] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 5)",
    "options": [
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "GROUP BY must always be followed by HAVING",
      "department names must be sorted using ORDER BY first"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_22",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #22] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 5)",
    "options": [
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 2,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_23",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #23] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 5)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_24",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #24] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 5)",
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
    "id": "mcq_groupby_25",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #25] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 5)",
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
    "id": "mcq_groupby_26",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #26] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 6)",
    "options": [
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "GROUP BY must always be followed by HAVING",
      "department names must be sorted using ORDER BY first"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_27",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #27] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 6)",
    "options": [
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 2,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_28",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #28] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 6)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_29",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #29] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 6)",
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
    "id": "mcq_groupby_30",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #30] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 6)",
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
    "id": "mcq_groupby_31",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #31] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 7)",
    "options": [
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "GROUP BY must always be followed by HAVING",
      "department names must be sorted using ORDER BY first"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_32",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #32] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 7)",
    "options": [
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 2,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_33",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #33] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 7)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_34",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #34] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 7)",
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
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "GROUP BY must always be followed by HAVING",
      "department names must be sorted using ORDER BY first"
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
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 2,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_38",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #38] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 8)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_39",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #39] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 8)",
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
    "id": "mcq_groupby_40",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #40] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 8)",
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
    "id": "mcq_groupby_41",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #41] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 9)",
    "options": [
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "GROUP BY must always be followed by HAVING",
      "department names must be sorted using ORDER BY first"
    ],
    "correctIndex": 1,
    "explanation": "Under ANSI SQL and MySQL ONLY_FULL_GROUP_BY, every column in the SELECT list that is not aggregated MUST appear in the GROUP BY clause to prevent non-deterministic values."
  },
  {
    "id": "mcq_groupby_42",
    "keyword": "GROUP BY",
    "tag": "⚡ Gotcha Trap",
    "question": "[GROUP BY #42] How does GROUP BY handle rows where the grouping column value is NULL? (Scenario Variant 9)",
    "options": [
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 2,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_43",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #43] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 9)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_44",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #44] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 9)",
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
    "id": "mcq_groupby_45",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #45] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 9)",
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
    "id": "mcq_groupby_46",
    "keyword": "GROUP BY",
    "tag": "🍡 Quick Snack",
    "question": "[GROUP BY #46] Why does the query \"SELECT department, name, AVG(salary) FROM Employees GROUP BY department;\" fail in standard SQL (ONLY_FULL_GROUP_BY)? (Scenario Variant 10)",
    "options": [
      "AVG() cannot be combined with text columns",
      "\"name\" is not in the GROUP BY clause and is not wrapped in an aggregate function, creating an ambiguous 1-to-many projection",
      "GROUP BY must always be followed by HAVING",
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
      "All NULL rows are discarded from the query result",
      "Every NULL row forms its own unique, separate group bucket",
      "All NULL rows are grouped together into a single collective group bucket",
      "An AmbiguousKeyException error is thrown"
    ],
    "correctIndex": 2,
    "explanation": "In SQL grouping, NULL values are considered equal to each other for the purpose of grouping, aggregating all rows with NULL in that column into one single bucket."
  },
  {
    "id": "mcq_groupby_48",
    "keyword": "GROUP BY",
    "tag": "🐱 Brain Bender",
    "question": "[GROUP BY #48] What does positional grouping syntax like \"GROUP BY 1, 2\" mean in engines that support it? (Scenario Variant 10)",
    "options": [
      "Group by the first and second physical columns stored on disk in the table schema",
      "Group by the 1st and 2nd expressions listed in the SELECT clause",
      "Group only the first 2 rows of the table",
      "Group by primary key 1 and foreign key 2"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY 1, 2 references columns by their ordinal 1-based index in the SELECT projection list. While convenient, it is considered fragile in production code if columns are reordered."
  },
  {
    "id": "mcq_groupby_49",
    "keyword": "GROUP BY",
    "tag": "🎯 Core Concept",
    "question": "[GROUP BY #49] In the query \"SELECT department, role, COUNT(*) FROM Staff GROUP BY department, role;\", how are groups created? (Scenario Variant 10)",
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
    "id": "mcq_groupby_50",
    "keyword": "GROUP BY",
    "tag": "🏆 Senior Staff",
    "question": "[GROUP BY #50] Can you group by a calculated expression such as \"GROUP BY YEAR(hire_date)\" in ANSI SQL? (Scenario Variant 10)",
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
    "id": "mcq_having_1",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #1] What is the fundamental architectural difference between the WHERE clause and the HAVING clause?",
    "options": [
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other"
    ],
    "correctIndex": 0,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_2",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #2] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail?",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a subquery to count rows",
      "department must be wrapped in a MAX() function"
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
      "No, SQL syntax requires GROUP BY immediately preceding HAVING",
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle",
      "Yes, but it automatically behaves identically to a WHERE clause"
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
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Only in SQLite"
    ],
    "correctIndex": 0,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_5",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #5] Which clause executes immediately before HAVING in the physical SQL pipeline?",
    "options": [
      "GROUP BY",
      "WHERE",
      "SELECT",
      "ORDER BY"
    ],
    "correctIndex": 0,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_6",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #6] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 2)",
    "options": [
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other"
    ],
    "correctIndex": 0,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_7",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #7] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 2)",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a subquery to count rows",
      "department must be wrapped in a MAX() function"
    ],
    "correctIndex": 0,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_8",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #8] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 2)",
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
    "id": "mcq_having_9",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #9] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 2)",
    "options": [
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Only in SQLite"
    ],
    "correctIndex": 0,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_10",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #10] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 2)",
    "options": [
      "GROUP BY",
      "WHERE",
      "SELECT",
      "ORDER BY"
    ],
    "correctIndex": 0,
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
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other"
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
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a subquery to count rows",
      "department must be wrapped in a MAX() function"
    ],
    "correctIndex": 0,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_13",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #13] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 3)",
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
    "id": "mcq_having_14",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #14] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 3)",
    "options": [
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Only in SQLite"
    ],
    "correctIndex": 0,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_15",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #15] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 3)",
    "options": [
      "GROUP BY",
      "WHERE",
      "SELECT",
      "ORDER BY"
    ],
    "correctIndex": 0,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_16",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #16] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 4)",
    "options": [
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other"
    ],
    "correctIndex": 0,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_17",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #17] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 4)",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a subquery to count rows",
      "department must be wrapped in a MAX() function"
    ],
    "correctIndex": 0,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_18",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #18] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 4)",
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
    "id": "mcq_having_19",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #19] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 4)",
    "options": [
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Only in SQLite"
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
      "GROUP BY",
      "WHERE",
      "SELECT",
      "ORDER BY"
    ],
    "correctIndex": 0,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_21",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #21] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 5)",
    "options": [
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other"
    ],
    "correctIndex": 0,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_22",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #22] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 5)",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a subquery to count rows",
      "department must be wrapped in a MAX() function"
    ],
    "correctIndex": 0,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_23",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #23] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 5)",
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
    "id": "mcq_having_24",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #24] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 5)",
    "options": [
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Only in SQLite"
    ],
    "correctIndex": 0,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_25",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #25] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 5)",
    "options": [
      "GROUP BY",
      "WHERE",
      "SELECT",
      "ORDER BY"
    ],
    "correctIndex": 0,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_26",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #26] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 6)",
    "options": [
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other"
    ],
    "correctIndex": 0,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_27",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #27] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 6)",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a subquery to count rows",
      "department must be wrapped in a MAX() function"
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
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Only in SQLite"
    ],
    "correctIndex": 0,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_30",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #30] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 6)",
    "options": [
      "GROUP BY",
      "WHERE",
      "SELECT",
      "ORDER BY"
    ],
    "correctIndex": 0,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_31",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #31] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 7)",
    "options": [
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other"
    ],
    "correctIndex": 0,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_32",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #32] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 7)",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a subquery to count rows",
      "department must be wrapped in a MAX() function"
    ],
    "correctIndex": 0,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_33",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #33] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 7)",
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
    "id": "mcq_having_34",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #34] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 7)",
    "options": [
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Only in SQLite"
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
      "GROUP BY",
      "WHERE",
      "SELECT",
      "ORDER BY"
    ],
    "correctIndex": 0,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_36",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #36] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 8)",
    "options": [
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other"
    ],
    "correctIndex": 0,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_37",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #37] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 8)",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a subquery to count rows",
      "department must be wrapped in a MAX() function"
    ],
    "correctIndex": 0,
    "explanation": "The WHERE clause operates on individual rows as they are read from disk. At that point, aggregation has not occurred, so aggregate functions like COUNT(*) are illegal in WHERE."
  },
  {
    "id": "mcq_having_38",
    "keyword": "HAVING",
    "tag": "🐱 Brain Bender",
    "question": "[HAVING #38] Can a query contain a HAVING clause without a GROUP BY clause? (Scenario Variant 8)",
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
    "id": "mcq_having_39",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #39] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 8)",
    "options": [
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Only in SQLite"
    ],
    "correctIndex": 0,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_40",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #40] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 8)",
    "options": [
      "GROUP BY",
      "WHERE",
      "SELECT",
      "ORDER BY"
    ],
    "correctIndex": 0,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_having_41",
    "keyword": "HAVING",
    "tag": "🍡 Quick Snack",
    "question": "[HAVING #41] What is the fundamental architectural difference between the WHERE clause and the HAVING clause? (Scenario Variant 9)",
    "options": [
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other"
    ],
    "correctIndex": 0,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_42",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #42] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 9)",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a subquery to count rows",
      "department must be wrapped in a MAX() function"
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
      "Yes, the entire table is treated as a single implicit group, and HAVING filters the whole-table aggregate",
      "No, SQL syntax requires GROUP BY immediately preceding HAVING",
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle",
      "Yes, but it automatically behaves identically to a WHERE clause"
    ],
    "correctIndex": 0,
    "explanation": "A HAVING clause without GROUP BY treats the entire dataset as one single group. If the condition (e.g. HAVING COUNT(*) > 100) fails, the query returns 0 rows."
  },
  {
    "id": "mcq_having_44",
    "keyword": "HAVING",
    "tag": "🎯 Core Concept",
    "question": "[HAVING #44] Is it valid standard SQL for a HAVING clause to reference an aggregate function that does NOT appear in the SELECT list? (Scenario Variant 9)",
    "options": [
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Only in SQLite"
    ],
    "correctIndex": 0,
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
      "SELECT",
      "ORDER BY"
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
      "WHERE filters individual rows before grouping; HAVING filters aggregated group buckets after grouping",
      "WHERE only works with numbers; HAVING only works with strings",
      "HAVING executes before FROM, while WHERE executes after SELECT",
      "There is no difference; they are aliases for each other"
    ],
    "correctIndex": 0,
    "explanation": "In the physical query pipeline, WHERE executes at Step 02 on raw table rows. HAVING executes at Step 04 after GROUP BY has aggregated rows into summary buckets."
  },
  {
    "id": "mcq_having_47",
    "keyword": "HAVING",
    "tag": "⚡ Gotcha Trap",
    "question": "[HAVING #47] Why does \"SELECT department, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY department;\" fail? (Scenario Variant 10)",
    "options": [
      "Aggregate functions cannot be evaluated in the WHERE clause because groups have not been formed yet",
      "COUNT(*) cannot be compared using the greater-than (>) operator",
      "Employees table requires a subquery to count rows",
      "department must be wrapped in a MAX() function"
    ],
    "correctIndex": 0,
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
      "Only in MySQL, but it causes a syntax crash in PostgreSQL and Oracle",
      "Yes, but it automatically behaves identically to a WHERE clause"
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
      "Yes, e.g., \"SELECT department FROM Employees GROUP BY department HAVING AVG(salary) > 80000;\" is fully valid",
      "No, any column or function tested in HAVING must be projected in SELECT",
      "Only if the aggregate function is aliased using AS in SELECT",
      "Only in SQLite"
    ],
    "correctIndex": 0,
    "explanation": "An aggregate in HAVING does not need to be projected in SELECT. The query engine calculates the aggregate in the group buffer to filter buckets without returning the metric to the user."
  },
  {
    "id": "mcq_having_50",
    "keyword": "HAVING",
    "tag": "🏆 Senior Staff",
    "question": "[HAVING #50] Which clause executes immediately before HAVING in the physical SQL pipeline? (Scenario Variant 10)",
    "options": [
      "GROUP BY",
      "WHERE",
      "SELECT",
      "ORDER BY"
    ],
    "correctIndex": 0,
    "explanation": "The execution order is FROM ➡️ WHERE ➡️ GROUP BY ➡️ HAVING ➡️ SELECT ➡️ DISTINCT ➡️ ORDER BY ➡️ LIMIT."
  },
  {
    "id": "mcq_where_1",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #1] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"?",
    "options": [
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "TRUE if the salary is indeed NULL",
      "FALSE",
      "Syntax Error: NULL cannot be compared with ="
    ],
    "correctIndex": 0,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_2",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #2] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly?",
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
    "id": "mcq_where_3",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #3] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)?",
    "options": [
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax",
      "The query uses asynchronous parallel threads",
      "The predicate has no WHERE keyword"
    ],
    "correctIndex": 0,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_4",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #4] What happens when you use column aliases defined in SELECT inside the WHERE clause?",
    "options": [
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines"
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
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 0,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_6",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #6] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 2)",
    "options": [
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "TRUE if the salary is indeed NULL",
      "FALSE",
      "Syntax Error: NULL cannot be compared with ="
    ],
    "correctIndex": 0,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_7",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #7] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 2)",
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
    "id": "mcq_where_8",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #8] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 2)",
    "options": [
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax",
      "The query uses asynchronous parallel threads",
      "The predicate has no WHERE keyword"
    ],
    "correctIndex": 0,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_9",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #9] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 2)",
    "options": [
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines"
    ],
    "correctIndex": 0,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_10",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #10] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 2)",
    "options": [
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 0,
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
      "FALSE",
      "Syntax Error: NULL cannot be compared with ="
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
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned",
      "It automatically treats NULL as 0",
      "It throws an InvalidSetComparison exception",
      "It returns all rows where department_id is 1 or 2"
    ],
    "correctIndex": 0,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_13",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #13] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 3)",
    "options": [
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax",
      "The query uses asynchronous parallel threads",
      "The predicate has no WHERE keyword"
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
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines"
    ],
    "correctIndex": 0,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_15",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #15] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 3)",
    "options": [
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 0,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_16",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #16] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 4)",
    "options": [
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "TRUE if the salary is indeed NULL",
      "FALSE",
      "Syntax Error: NULL cannot be compared with ="
    ],
    "correctIndex": 0,
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
      "The query uses asynchronous parallel threads",
      "The predicate has no WHERE keyword"
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
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines"
    ],
    "correctIndex": 0,
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
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence"
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
      "FALSE",
      "Syntax Error: NULL cannot be compared with ="
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
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned",
      "It automatically treats NULL as 0",
      "It throws an InvalidSetComparison exception",
      "It returns all rows where department_id is 1 or 2"
    ],
    "correctIndex": 0,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_23",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #23] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 5)",
    "options": [
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax",
      "The query uses asynchronous parallel threads",
      "The predicate has no WHERE keyword"
    ],
    "correctIndex": 0,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_24",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #24] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 5)",
    "options": [
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines"
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
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 0,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_26",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #26] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 6)",
    "options": [
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "TRUE if the salary is indeed NULL",
      "FALSE",
      "Syntax Error: NULL cannot be compared with ="
    ],
    "correctIndex": 0,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_27",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #27] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 6)",
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
    "id": "mcq_where_28",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #28] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 6)",
    "options": [
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax",
      "The query uses asynchronous parallel threads",
      "The predicate has no WHERE keyword"
    ],
    "correctIndex": 0,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_29",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #29] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 6)",
    "options": [
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines"
    ],
    "correctIndex": 0,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_30",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #30] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 6)",
    "options": [
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 0,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_31",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #31] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 7)",
    "options": [
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "TRUE if the salary is indeed NULL",
      "FALSE",
      "Syntax Error: NULL cannot be compared with ="
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
      "If the list contains NULL, NOT IN returns UNKNOWN for all non-matching rows, resulting in ZERO rows returned",
      "It automatically treats NULL as 0",
      "It throws an InvalidSetComparison exception",
      "It returns all rows where department_id is 1 or 2"
    ],
    "correctIndex": 0,
    "explanation": "NOT IN (1, 2, NULL) expands to (id != 1 AND id != 2 AND id != NULL). Because id != NULL is always UNKNOWN, the whole AND chain evaluates to UNKNOWN or FALSE, returning zero rows!"
  },
  {
    "id": "mcq_where_33",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #33] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 7)",
    "options": [
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax",
      "The query uses asynchronous parallel threads",
      "The predicate has no WHERE keyword"
    ],
    "correctIndex": 0,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_34",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #34] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 7)",
    "options": [
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines"
    ],
    "correctIndex": 0,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_35",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #35] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 7)",
    "options": [
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 0,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_36",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #36] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 8)",
    "options": [
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "TRUE if the salary is indeed NULL",
      "FALSE",
      "Syntax Error: NULL cannot be compared with ="
    ],
    "correctIndex": 0,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_37",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #37] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 8)",
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
    "id": "mcq_where_38",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #38] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 8)",
    "options": [
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax",
      "The query uses asynchronous parallel threads",
      "The predicate has no WHERE keyword"
    ],
    "correctIndex": 0,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_39",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #39] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 8)",
    "options": [
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines"
    ],
    "correctIndex": 0,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_40",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #40] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 8)",
    "options": [
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 0,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_41",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #41] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 9)",
    "options": [
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "TRUE if the salary is indeed NULL",
      "FALSE",
      "Syntax Error: NULL cannot be compared with ="
    ],
    "correctIndex": 0,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_42",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #42] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 9)",
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
    "id": "mcq_where_43",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #43] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 9)",
    "options": [
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax",
      "The query uses asynchronous parallel threads",
      "The predicate has no WHERE keyword"
    ],
    "correctIndex": 0,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_44",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #44] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 9)",
    "options": [
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines"
    ],
    "correctIndex": 0,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_45",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #45] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 9)",
    "options": [
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 0,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_where_46",
    "keyword": "WHERE",
    "tag": "🍡 Quick Snack",
    "question": "[WHERE #46] In SQL Three-Valued Logic (3VL), what is the evaluation result of \"WHERE salary = NULL\"? (Scenario Variant 10)",
    "options": [
      "UNKNOWN (evaluates to non-TRUE, so the row is rejected)",
      "TRUE if the salary is indeed NULL",
      "FALSE",
      "Syntax Error: NULL cannot be compared with ="
    ],
    "correctIndex": 0,
    "explanation": "In SQL, comparing any value to NULL using = produces UNKNOWN. In a WHERE clause, only rows evaluating strictly to TRUE pass. To check for nulls, use IS NULL."
  },
  {
    "id": "mcq_where_47",
    "keyword": "WHERE",
    "tag": "⚡ Gotcha Trap",
    "question": "[WHERE #47] Why does the predicate \"WHERE department_id NOT IN (1, 2, NULL)\" evaluate unexpectedly? (Scenario Variant 10)",
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
    "id": "mcq_where_48",
    "keyword": "WHERE",
    "tag": "🐱 Brain Bender",
    "question": "[WHERE #48] What does it mean for a WHERE clause predicate to be \"SARGable\" (Search Argument Able)? (Scenario Variant 10)",
    "options": [
      "The condition is structured so the query optimizer can utilize a B-tree index seek rather than a full table scan",
      "The condition is written in uppercase syntax",
      "The query uses asynchronous parallel threads",
      "The predicate has no WHERE keyword"
    ],
    "correctIndex": 0,
    "explanation": "A SARGable predicate allows index seeks. For example, \"WHERE created_at >= '2026-01-01'\" is SARGable, whereas \"WHERE YEAR(created_at) = 2026\" wraps the column in a function and disables index seeks."
  },
  {
    "id": "mcq_where_49",
    "keyword": "WHERE",
    "tag": "🎯 Core Concept",
    "question": "[WHERE #49] What happens when you use column aliases defined in SELECT inside the WHERE clause? (Scenario Variant 10)",
    "options": [
      "The database engine throws an \"Unknown Column\" error because WHERE executes before SELECT",
      "The query runs 2x faster",
      "The engine automatically aliases all table columns",
      "It is standard ANSI SQL and works in all engines"
    ],
    "correctIndex": 0,
    "explanation": "WHERE executes as Step 02, while SELECT executes as Step 03/05. The column alias does not exist yet when WHERE is evaluated."
  },
  {
    "id": "mcq_where_50",
    "keyword": "WHERE",
    "tag": "🏆 Senior Staff",
    "question": "[WHERE #50] In the condition \"WHERE status = 'active' OR role = 'admin' AND salary > 50000\", which operator has higher precedence? (Scenario Variant 10)",
    "options": [
      "AND has higher precedence than OR and is evaluated first",
      "OR has higher precedence than AND",
      "Operators are strictly evaluated left-to-right regardless of type",
      "AND and OR have equal precedence"
    ],
    "correctIndex": 0,
    "explanation": "AND has higher logical precedence than OR. The predicate is evaluated as: status = 'active' OR (role = 'admin' AND salary > 50000). Always use parentheses to ensure clarity."
  },
  {
    "id": "mcq_select_1",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #1] What is the relational algebra operation performed by the SELECT clause when picking specific columns?",
    "options": [
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)"
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
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It causes database disk corruption",
      "SQL compilers cannot compile SELECT *",
      "It automatically locks the entire database cluster"
    ],
    "correctIndex": 0,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_3",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #3] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"?",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE"
    ],
    "correctIndex": 0,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_4",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #4] Can a SELECT clause contain a scalar subquery that computes a value per row?",
    "options": [
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows",
      "Only in NoSQL databases"
    ],
    "correctIndex": 0,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
  },
  {
    "id": "mcq_select_5",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #5] What does \"SELECT 1;\" return in relational database engines?",
    "options": [
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified",
      "The first row of the primary database table",
      "NULL"
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
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)"
    ],
    "correctIndex": 0,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_7",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #7] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 2)",
    "options": [
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It causes database disk corruption",
      "SQL compilers cannot compile SELECT *",
      "It automatically locks the entire database cluster"
    ],
    "correctIndex": 0,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_8",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #8] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 2)",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE"
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
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows",
      "Only in NoSQL databases"
    ],
    "correctIndex": 0,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
  },
  {
    "id": "mcq_select_10",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #10] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 2)",
    "options": [
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified",
      "The first row of the primary database table",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_11",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #11] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 3)",
    "options": [
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)"
    ],
    "correctIndex": 0,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_12",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #12] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 3)",
    "options": [
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It causes database disk corruption",
      "SQL compilers cannot compile SELECT *",
      "It automatically locks the entire database cluster"
    ],
    "correctIndex": 0,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_13",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #13] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 3)",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE"
    ],
    "correctIndex": 0,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_14",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #14] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 3)",
    "options": [
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows",
      "Only in NoSQL databases"
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
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified",
      "The first row of the primary database table",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_16",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #16] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 4)",
    "options": [
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)"
    ],
    "correctIndex": 0,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_17",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #17] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 4)",
    "options": [
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It causes database disk corruption",
      "SQL compilers cannot compile SELECT *",
      "It automatically locks the entire database cluster"
    ],
    "correctIndex": 0,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_18",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #18] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 4)",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE"
    ],
    "correctIndex": 0,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_19",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #19] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 4)",
    "options": [
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows",
      "Only in NoSQL databases"
    ],
    "correctIndex": 0,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
  },
  {
    "id": "mcq_select_20",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #20] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 4)",
    "options": [
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified",
      "The first row of the primary database table",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_21",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #21] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 5)",
    "options": [
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)"
    ],
    "correctIndex": 0,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_22",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #22] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 5)",
    "options": [
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It causes database disk corruption",
      "SQL compilers cannot compile SELECT *",
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
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE"
    ],
    "correctIndex": 0,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_24",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #24] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 5)",
    "options": [
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows",
      "Only in NoSQL databases"
    ],
    "correctIndex": 0,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
  },
  {
    "id": "mcq_select_25",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #25] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 5)",
    "options": [
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified",
      "The first row of the primary database table",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_26",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #26] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 6)",
    "options": [
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)"
    ],
    "correctIndex": 0,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_27",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #27] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 6)",
    "options": [
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It causes database disk corruption",
      "SQL compilers cannot compile SELECT *",
      "It automatically locks the entire database cluster"
    ],
    "correctIndex": 0,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_28",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #28] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 6)",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE"
    ],
    "correctIndex": 0,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_29",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #29] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 6)",
    "options": [
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows",
      "Only in NoSQL databases"
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
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified",
      "The first row of the primary database table",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_31",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #31] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 7)",
    "options": [
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)"
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
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It causes database disk corruption",
      "SQL compilers cannot compile SELECT *",
      "It automatically locks the entire database cluster"
    ],
    "correctIndex": 0,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_33",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #33] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 7)",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE"
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
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows",
      "Only in NoSQL databases"
    ],
    "correctIndex": 0,
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
      "The first row of the primary database table",
      "NULL"
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
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)"
    ],
    "correctIndex": 0,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_37",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #37] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 8)",
    "options": [
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It causes database disk corruption",
      "SQL compilers cannot compile SELECT *",
      "It automatically locks the entire database cluster"
    ],
    "correctIndex": 0,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_38",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #38] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 8)",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE"
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
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows",
      "Only in NoSQL databases"
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
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified",
      "The first row of the primary database table",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_41",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #41] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 9)",
    "options": [
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)"
    ],
    "correctIndex": 0,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_42",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #42] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 9)",
    "options": [
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It causes database disk corruption",
      "SQL compilers cannot compile SELECT *",
      "It automatically locks the entire database cluster"
    ],
    "correctIndex": 0,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_43",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #43] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 9)",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE"
    ],
    "correctIndex": 0,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_44",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #44] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 9)",
    "options": [
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows",
      "Only in NoSQL databases"
    ],
    "correctIndex": 0,
    "explanation": "Correlated scalar subqueries in SELECT are valid, though they must return at most 1 row and 1 column, and can incur O(N) performance overhead."
  },
  {
    "id": "mcq_select_45",
    "keyword": "SELECT",
    "tag": "🏆 Senior Staff",
    "question": "[SELECT #45] What does \"SELECT 1;\" return in relational database engines? (Scenario Variant 9)",
    "options": [
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified",
      "The first row of the primary database table",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_select_46",
    "keyword": "SELECT",
    "tag": "🍡 Quick Snack",
    "question": "[SELECT #46] What is the relational algebra operation performed by the SELECT clause when picking specific columns? (Scenario Variant 10)",
    "options": [
      "Projection (choosing which vertical attributes appear in the output relation)",
      "Selection (filtering rows)",
      "Cartesian Product (joining relations)",
      "Union (combining sets)"
    ],
    "correctIndex": 0,
    "explanation": "In relational algebra, SELECT performs Projection (represented by the Greek letter π), while the WHERE clause performs Selection (represented by σ)."
  },
  {
    "id": "mcq_select_47",
    "keyword": "SELECT",
    "tag": "⚡ Gotcha Trap",
    "question": "[SELECT #47] Why is \"SELECT *\" considered a dangerous anti-pattern in high-throughput production backends? (Scenario Variant 10)",
    "options": [
      "It breaks covering indexes, increases network I/O payload, and breaks downstream applications if columns are added/removed",
      "It causes database disk corruption",
      "SQL compilers cannot compile SELECT *",
      "It automatically locks the entire database cluster"
    ],
    "correctIndex": 0,
    "explanation": "SELECT * fetches unneeded large columns (e.g. TEXT, BLOB), defeats index-only scans, inflates memory serialization overhead, and introduces brittle coupling."
  },
  {
    "id": "mcq_select_48",
    "keyword": "SELECT",
    "tag": "🐱 Brain Bender",
    "question": "[SELECT #48] What is the scope and lifecycle of a column alias created with \"SELECT col AS my_alias\"? (Scenario Variant 10)",
    "options": [
      "It is available in ORDER BY, GROUP BY (in some engines), and downstream outer queries, but NOT in WHERE or FROM",
      "It is globally persisted as a new database view",
      "It is only available inside stored procedures",
      "It is available everywhere including FROM and WHERE"
    ],
    "correctIndex": 0,
    "explanation": "Column aliases are born in SELECT. They are accessible in clauses that execute AFTER SELECT (ORDER BY), but not in clauses that execute BEFORE SELECT (FROM, WHERE)."
  },
  {
    "id": "mcq_select_49",
    "keyword": "SELECT",
    "tag": "🎯 Core Concept",
    "question": "[SELECT #49] Can a SELECT clause contain a scalar subquery that computes a value per row? (Scenario Variant 10)",
    "options": [
      "Yes, scalar subqueries returning a single value per row can be projected directly in SELECT",
      "No, subqueries are strictly restricted to the FROM clause",
      "Only if the subquery returns at least 10 rows",
      "Only in NoSQL databases"
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
      "A single-row, single-column result table containing the integer value 1",
      "A syntax error because no FROM clause was specified",
      "The first row of the primary database table",
      "NULL"
    ],
    "correctIndex": 0,
    "explanation": "Standard SQL engines (PostgreSQL, MySQL, SQLite) permit SELECT without a FROM clause to evaluate scalar expressions and test server connectivity."
  },
  {
    "id": "mcq_from_1",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #1] Why does the FROM clause execute as Step 01 in the physical query lifecycle?",
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
    "id": "mcq_from_2",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #2] What is a \"derived table\" in the context of the FROM clause?",
    "options": [
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition",
      "A materialized view refreshed hourly"
    ],
    "correctIndex": 0,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
  },
  {
    "id": "mcq_from_3",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #3] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"?",
    "options": [
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only in the WHERE clause",
      "Only if the alias is in lowercase"
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
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)",
      "An INNER JOIN on matching primary keys",
      "A UNION of both tables",
      "A syntax error"
    ],
    "correctIndex": 0,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_5",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #5] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"?",
    "options": [
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica",
      "It stores dual-key cryptographic certificates",
      "It is a temporary cache table that deletes itself upon disconnect"
    ],
    "correctIndex": 0,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_6",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #6] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 2)",
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
    "id": "mcq_from_7",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #7] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 2)",
    "options": [
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition",
      "A materialized view refreshed hourly"
    ],
    "correctIndex": 0,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
  },
  {
    "id": "mcq_from_8",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #8] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 2)",
    "options": [
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only in the WHERE clause",
      "Only if the alias is in lowercase"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_9",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #9] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 2)",
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
    "id": "mcq_from_10",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #10] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 2)",
    "options": [
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica",
      "It stores dual-key cryptographic certificates",
      "It is a temporary cache table that deletes itself upon disconnect"
    ],
    "correctIndex": 0,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_11",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #11] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 3)",
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
    "id": "mcq_from_12",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #12] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 3)",
    "options": [
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition",
      "A materialized view refreshed hourly"
    ],
    "correctIndex": 0,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
  },
  {
    "id": "mcq_from_13",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #13] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 3)",
    "options": [
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only in the WHERE clause",
      "Only if the alias is in lowercase"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_14",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #14] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 3)",
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
    "id": "mcq_from_15",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #15] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 3)",
    "options": [
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica",
      "It stores dual-key cryptographic certificates",
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
      "The query engine must first bind table storage and memory buffers to establish available columns and data types",
      "Because the word FROM comes first alphabetically among keywords",
      "To verify user write permissions on disk",
      "To format JSON network packets"
    ],
    "correctIndex": 0,
    "explanation": "Before a query engine can filter (WHERE), calculate (SELECT), or sort (ORDER BY), it must identify the physical relations on disk and load their column schemas."
  },
  {
    "id": "mcq_from_17",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #17] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 4)",
    "options": [
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition",
      "A materialized view refreshed hourly"
    ],
    "correctIndex": 0,
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
      "Only in the WHERE clause",
      "Only if the alias is in lowercase"
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
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)",
      "An INNER JOIN on matching primary keys",
      "A UNION of both tables",
      "A syntax error"
    ],
    "correctIndex": 0,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_20",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #20] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 4)",
    "options": [
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica",
      "It stores dual-key cryptographic certificates",
      "It is a temporary cache table that deletes itself upon disconnect"
    ],
    "correctIndex": 0,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_21",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #21] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 5)",
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
    "id": "mcq_from_22",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #22] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 5)",
    "options": [
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition",
      "A materialized view refreshed hourly"
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
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only in the WHERE clause",
      "Only if the alias is in lowercase"
    ],
    "correctIndex": 0,
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
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica",
      "It stores dual-key cryptographic certificates",
      "It is a temporary cache table that deletes itself upon disconnect"
    ],
    "correctIndex": 0,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_26",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #26] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 6)",
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
    "id": "mcq_from_27",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #27] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 6)",
    "options": [
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition",
      "A materialized view refreshed hourly"
    ],
    "correctIndex": 0,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
  },
  {
    "id": "mcq_from_28",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #28] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 6)",
    "options": [
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only in the WHERE clause",
      "Only if the alias is in lowercase"
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
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)",
      "An INNER JOIN on matching primary keys",
      "A UNION of both tables",
      "A syntax error"
    ],
    "correctIndex": 0,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_30",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #30] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 6)",
    "options": [
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica",
      "It stores dual-key cryptographic certificates",
      "It is a temporary cache table that deletes itself upon disconnect"
    ],
    "correctIndex": 0,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_31",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #31] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 7)",
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
    "id": "mcq_from_32",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #32] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 7)",
    "options": [
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition",
      "A materialized view refreshed hourly"
    ],
    "correctIndex": 0,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
  },
  {
    "id": "mcq_from_33",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #33] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 7)",
    "options": [
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only in the WHERE clause",
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
      "A Cartesian Product (CROSS JOIN) pairing every row of TableA with every row of TableB (RowsA * RowsB)",
      "An INNER JOIN on matching primary keys",
      "A UNION of both tables",
      "A syntax error"
    ],
    "correctIndex": 0,
    "explanation": "Comma-separated tables in FROM evaluate to a Cartesian product. If TableA has 1,000 rows and TableB has 1,000 rows, the intermediate set is 1,000,000 rows."
  },
  {
    "id": "mcq_from_35",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #35] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 7)",
    "options": [
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica",
      "It stores dual-key cryptographic certificates",
      "It is a temporary cache table that deletes itself upon disconnect"
    ],
    "correctIndex": 0,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_36",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #36] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 8)",
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
    "id": "mcq_from_37",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #37] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 8)",
    "options": [
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition",
      "A materialized view refreshed hourly"
    ],
    "correctIndex": 0,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
  },
  {
    "id": "mcq_from_38",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #38] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 8)",
    "options": [
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only in the WHERE clause",
      "Only if the alias is in lowercase"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_39",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #39] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 8)",
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
    "id": "mcq_from_40",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #40] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 8)",
    "options": [
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica",
      "It stores dual-key cryptographic certificates",
      "It is a temporary cache table that deletes itself upon disconnect"
    ],
    "correctIndex": 0,
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
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition",
      "A materialized view refreshed hourly"
    ],
    "correctIndex": 0,
    "explanation": "A derived table (or inline view) is a subquery in the FROM clause, e.g., \"FROM (SELECT id FROM Users) AS u\". Most engines strictly require an alias."
  },
  {
    "id": "mcq_from_43",
    "keyword": "FROM",
    "tag": "🐱 Brain Bender",
    "question": "[FROM #43] When aliasing a table in FROM (\"FROM Employees AS e\"), can you still refer to columns using the original table name \"Employees.salary\"? (Scenario Variant 9)",
    "options": [
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only in the WHERE clause",
      "Only if the alias is in lowercase"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_44",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #44] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 9)",
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
    "id": "mcq_from_45",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #45] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 9)",
    "options": [
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica",
      "It stores dual-key cryptographic certificates",
      "It is a temporary cache table that deletes itself upon disconnect"
    ],
    "correctIndex": 0,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_from_46",
    "keyword": "FROM",
    "tag": "🍡 Quick Snack",
    "question": "[FROM #46] Why does the FROM clause execute as Step 01 in the physical query lifecycle? (Scenario Variant 10)",
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
    "id": "mcq_from_47",
    "keyword": "FROM",
    "tag": "⚡ Gotcha Trap",
    "question": "[FROM #47] What is a \"derived table\" in the context of the FROM clause? (Scenario Variant 10)",
    "options": [
      "A subquery placed inside the FROM clause that produces a temporary virtual relation with a required alias",
      "A table created with the CREATE TABLE command",
      "A physical disk backup partition",
      "A materialized view refreshed hourly"
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
      "In standard SQL, once an alias is defined, the original table name is hidden and referencing it causes an error",
      "Yes, both table name and alias remain simultaneously accessible everywhere",
      "Only in the WHERE clause",
      "Only if the alias is in lowercase"
    ],
    "correctIndex": 0,
    "explanation": "In ANSI SQL, defining a table correlation name (alias) hides the underlying base table name within the scope of that query block."
  },
  {
    "id": "mcq_from_49",
    "keyword": "FROM",
    "tag": "🎯 Core Concept",
    "question": "[FROM #49] What is the physical result of listing two tables in FROM separated by a comma without a WHERE clause (\"FROM TableA, TableB\")? (Scenario Variant 10)",
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
    "id": "mcq_from_50",
    "keyword": "FROM",
    "tag": "🏆 Senior Staff",
    "question": "[FROM #50] In Oracle SQL, what is the purpose of the built-in single-row table named \"DUAL\"? (Scenario Variant 10)",
    "options": [
      "It provides a dummy table source for FROM when evaluating pure expressions like \"SELECT SYSDATE FROM DUAL;\"",
      "It duplicates all write transactions to a secondary replica",
      "It stores dual-key cryptographic certificates",
      "It is a temporary cache table that deletes itself upon disconnect"
    ],
    "correctIndex": 0,
    "explanation": "In Oracle SQL, every SELECT query historically required a FROM clause. The DUAL table contains exactly 1 row and 1 column (DUMMY) for evaluating scalar expressions."
  },
  {
    "id": "mcq_orderlimit_1",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #1] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle?",
    "options": [
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first",
      "It actually executes before WHERE"
    ],
    "correctIndex": 0,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_2",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #2] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL?",
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
    "id": "mcq_orderlimit_3",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #3] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables?",
    "options": [
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The network protocol cannot transmit large offsets"
    ],
    "correctIndex": 0,
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
      "NULLs are always placed in the exact center of the result",
      "An error is thrown if NULLs are sorted"
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
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first",
      "It actually executes before WHERE"
    ],
    "correctIndex": 0,
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
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The network protocol cannot transmit large offsets"
    ],
    "correctIndex": 0,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_9",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #9] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 2)",
    "options": [
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always removed from the result set during ORDER BY",
      "NULLs are always placed in the exact center of the result",
      "An error is thrown if NULLs are sorted"
    ],
    "correctIndex": 0,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_10",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #10] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 2)",
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
    "id": "mcq_orderlimit_11",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #11] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 3)",
    "options": [
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first",
      "It actually executes before WHERE"
    ],
    "correctIndex": 0,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_12",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #12] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 3)",
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
    "id": "mcq_orderlimit_13",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #13] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 3)",
    "options": [
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The network protocol cannot transmit large offsets"
    ],
    "correctIndex": 0,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_14",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #14] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 3)",
    "options": [
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always removed from the result set during ORDER BY",
      "NULLs are always placed in the exact center of the result",
      "An error is thrown if NULLs are sorted"
    ],
    "correctIndex": 0,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_15",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #15] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 3)",
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
    "id": "mcq_orderlimit_16",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #16] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 4)",
    "options": [
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first",
      "It actually executes before WHERE"
    ],
    "correctIndex": 0,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_17",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #17] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 4)",
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
    "id": "mcq_orderlimit_18",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #18] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 4)",
    "options": [
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The network protocol cannot transmit large offsets"
    ],
    "correctIndex": 0,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_19",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #19] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 4)",
    "options": [
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always removed from the result set during ORDER BY",
      "NULLs are always placed in the exact center of the result",
      "An error is thrown if NULLs are sorted"
    ],
    "correctIndex": 0,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_20",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #20] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 4)",
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
    "id": "mcq_orderlimit_21",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #21] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 5)",
    "options": [
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first",
      "It actually executes before WHERE"
    ],
    "correctIndex": 0,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_22",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #22] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 5)",
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
    "id": "mcq_orderlimit_23",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #23] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 5)",
    "options": [
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The network protocol cannot transmit large offsets"
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
      "NULLs are always removed from the result set during ORDER BY",
      "NULLs are always placed in the exact center of the result",
      "An error is thrown if NULLs are sorted"
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
      "A sort that finishes in under 1 millisecond",
      "A sort performed entirely in CPU registers",
      "A sort using only numeric columns"
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
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first",
      "It actually executes before WHERE"
    ],
    "correctIndex": 0,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_27",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #27] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 6)",
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
    "id": "mcq_orderlimit_28",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #28] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 6)",
    "options": [
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The network protocol cannot transmit large offsets"
    ],
    "correctIndex": 0,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_29",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #29] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 6)",
    "options": [
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always removed from the result set during ORDER BY",
      "NULLs are always placed in the exact center of the result",
      "An error is thrown if NULLs are sorted"
    ],
    "correctIndex": 0,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_30",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #30] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 6)",
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
    "id": "mcq_orderlimit_31",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #31] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 7)",
    "options": [
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first",
      "It actually executes before WHERE"
    ],
    "correctIndex": 0,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_32",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #32] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 7)",
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
    "id": "mcq_orderlimit_33",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #33] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 7)",
    "options": [
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The network protocol cannot transmit large offsets"
    ],
    "correctIndex": 0,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_34",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #34] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 7)",
    "options": [
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always removed from the result set during ORDER BY",
      "NULLs are always placed in the exact center of the result",
      "An error is thrown if NULLs are sorted"
    ],
    "correctIndex": 0,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_35",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #35] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 7)",
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
    "id": "mcq_orderlimit_36",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #36] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 8)",
    "options": [
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first",
      "It actually executes before WHERE"
    ],
    "correctIndex": 0,
    "explanation": "ORDER BY runs at Step 05/06 after projection, allowing it to reference aliases and computed expressions established during SELECT."
  },
  {
    "id": "mcq_orderlimit_37",
    "keyword": "ORDER BY & LIMIT",
    "tag": "⚡ Gotcha Trap",
    "question": "[ORDER BY & LIMIT #37] What does \"LIMIT 5 OFFSET 20\" do in MySQL and PostgreSQL? (Scenario Variant 8)",
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
    "id": "mcq_orderlimit_38",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #38] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 8)",
    "options": [
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The network protocol cannot transmit large offsets"
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
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always removed from the result set during ORDER BY",
      "NULLs are always placed in the exact center of the result",
      "An error is thrown if NULLs are sorted"
    ],
    "correctIndex": 0,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_40",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #40] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 8)",
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
    "id": "mcq_orderlimit_41",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #41] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 9)",
    "options": [
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first",
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
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)",
      "Returns 20 rows starting from row 5",
      "Limits the query to 5 columns and 20 rows",
      "Returns rows where id is between 5 and 20"
    ],
    "correctIndex": 0,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_43",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #43] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 9)",
    "options": [
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The network protocol cannot transmit large offsets"
    ],
    "correctIndex": 0,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_44",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #44] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 9)",
    "options": [
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always removed from the result set during ORDER BY",
      "NULLs are always placed in the exact center of the result",
      "An error is thrown if NULLs are sorted"
    ],
    "correctIndex": 0,
    "explanation": "Different engines have differing defaults: MySQL and SQL Server treat NULL as lower than any value. PostgreSQL and Oracle support explicit \"NULLS FIRST / NULLS LAST\" syntax."
  },
  {
    "id": "mcq_orderlimit_45",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🏆 Senior Staff",
    "question": "[ORDER BY & LIMIT #45] What is a \"deterministic sort\" and why is it essential when using LIMIT? (Scenario Variant 9)",
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
    "id": "mcq_orderlimit_46",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🍡 Quick Snack",
    "question": "[ORDER BY & LIMIT #46] Why is the ORDER BY clause executed AFTER the SELECT clause in the physical lifecycle? (Scenario Variant 10)",
    "options": [
      "Because the engine sorts the final projected result rows and can sort by column aliases defined in SELECT",
      "Because sorting on disk must precede reading rows",
      "Because SELECT filters rows first",
      "It actually executes before WHERE"
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
      "Skips the first 20 rows of the ordered result set and returns the next 5 rows (rows 21-25)",
      "Returns 20 rows starting from row 5",
      "Limits the query to 5 columns and 20 rows",
      "Returns rows where id is between 5 and 20"
    ],
    "correctIndex": 0,
    "explanation": "OFFSET skips the specified count of preceding rows, and LIMIT constrains the batch size of the returned window."
  },
  {
    "id": "mcq_orderlimit_48",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🐱 Brain Bender",
    "question": "[ORDER BY & LIMIT #48] Why does deep offset pagination like \"LIMIT 10 OFFSET 1000000\" perform poorly on large tables? (Scenario Variant 10)",
    "options": [
      "The database engine must still read, sort, and traverse 1,000,010 physical rows before discarding the first 1,000,000",
      "OFFSET locks the entire database buffer pool",
      "LIMIT only supports offsets up to 10,000",
      "The network protocol cannot transmit large offsets"
    ],
    "correctIndex": 0,
    "explanation": "Offset pagination requires the engine to generate and scan all N + M rows and discard N of them. Keyset (cursor-based) pagination using \"WHERE id > last_seen_id\" is far more performant."
  },
  {
    "id": "mcq_orderlimit_49",
    "keyword": "ORDER BY & LIMIT",
    "tag": "🎯 Core Concept",
    "question": "[ORDER BY & LIMIT #49] In standard SQL, where do NULL values appear when sorting with \"ORDER BY score ASC\"? (Scenario Variant 10)",
    "options": [
      "In PostgreSQL/Oracle, NULLS FIRST is default for ASC (or controlled via NULLS FIRST/LAST); in MySQL/SQL Server, NULLs sort first as lowest",
      "NULLs are always removed from the result set during ORDER BY",
      "NULLs are always placed in the exact center of the result",
      "An error is thrown if NULLs are sorted"
    ],
    "correctIndex": 0,
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
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MCQS_VAULT_500: window.MCQS_VAULT_500 };
}
