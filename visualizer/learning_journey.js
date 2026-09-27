// =============================================================================
// SQL FOUNDRY: LEARNING JOURNEY & ADVENTURE ROADMAP ENGINE
// - 20-Day Systematic Curriculum Progression
// - Sir Bloops Mascot Checkpoint Tracking (Bloub moves forward as you master each topic)
// - Interactive Activity Heatmap with Streaks, XP & Quest Counts
// - Detailed Day-by-Day Dossiers (Objectives, Mental Models, Silent Traps, Links)
// - LocalStorage Persistence & Celebratory Advancement Animations
// =============================================================================

const LEARNING_JOURNEY_DAYS = [
  {
    day: 1,
    title: "Day 01: SELECT, Column Aliasing & Mathematical Projections",
    shortName: "SELECT & Projections",
    category: "Foundations",
    badgeColor: "#38bdf8",
    sectionKey: "section1",
    questRange: "Quests 1 – 20 (Easy Tier)",
    sirBloopsAdvice: "Welcome to Day 1! Remember that SELECT is evaluated near the end of the query execution pipeline, NOT first! Never try to filter a SELECT alias in WHERE!",
    objectives: [
      "Master the physical query execution pipeline (FROM -> WHERE -> GROUP BY -> SELECT)",
      "Project clean column aliases using AS keyword",
      "Perform arithmetic projections (+, -, *, /) respecting operator precedence"
    ],
    mentalModel: [
      "The database first locates the table (FROM), filters rows (WHERE), and only then picks and renames columns (SELECT).",
      "Aliases created in SELECT do not exist yet when WHERE is evaluated."
    ],
    silentTraps: [
      "Referencing a SELECT alias in the WHERE clause triggers an immediate compile failure.",
      "Integer division truncates decimals in SQL Server / PostgreSQL unless cast to numeric."
    ],
    practiceGoal: "Complete Section 01 Levels 1–20 to master foundational syntax."
  },
  {
    day: 2,
    title: "Day 02: WHERE Predicates, Pattern Matching & 3-Valued Logic",
    shortName: "WHERE & 3-Valued Logic",
    category: "Filtering",
    badgeColor: "#10b981",
    sectionKey: "section2",
    questRange: "Quests 1 – 20 (Easy Tier)",
    sirBloopsAdvice: "Ah, the treacherous waters of NULL! Never use `= NULL` or `!= NULL`—SQL uses Three-Valued Logic where NULL comparisons yield UNKNOWN!",
    objectives: [
      "Master row-level filtering with comparison and logical operators (AND, OR, NOT)",
      "Safely handle NULL values using IS NULL and IS NOT NULL",
      "Use pattern matching with LIKE ('%abc_') and IN lists"
    ],
    mentalModel: [
      "In Three-Valued Logic: TRUE, FALSE, and UNKNOWN.",
      "WHERE only retains rows where the predicate evaluates strictly to TRUE. UNKNOWN rows are discarded silently."
    ],
    silentTraps: [
      "col = NULL yields UNKNOWN and returns 0 rows without throwing an error.",
      "NOT IN (..., NULL) evaluates to UNKNOWN for all rows, returning an empty result set."
    ],
    practiceGoal: "Solve 20 WHERE predicate quests to master three-valued logic."
  },
  {
    day: 3,
    title: "Day 03: ORDER BY Sorting, NULL Ordering & Pagination Slicing",
    shortName: "ORDER BY & Pagination",
    category: "Sorting",
    badgeColor: "#f59e0b",
    sectionKey: "section3",
    questRange: "Quests 1 – 20 (Easy Tier)",
    sirBloopsAdvice: "Relational tables are unordered mathematical sets! Without an explicit ORDER BY, row ordering is completely non-deterministic!",
    objectives: [
      "Sort single and multiple columns with ASC and DESC",
      "Control NULL positioning using NULLS FIRST and NULLS LAST",
      "Implement deterministic pagination with LIMIT and OFFSET"
    ],
    mentalModel: [
      "SQL engines do not guarantee row order across queries or server restarts unless ORDER BY is specified.",
      "Always include a unique tie-breaker column (e.g. id) in paginated queries to prevent row shifting."
    ],
    silentTraps: [
      "Offset pagination without a unique secondary sort key causes missing or duplicate rows across pages.",
      "Dialects differ on default NULL sorting (PostgreSQL puts NULLs last in ASC, Oracle puts them first)."
    ],
    practiceGoal: "Clear 20 sorting quests to guarantee deterministic result sets."
  },
  {
    day: 4,
    title: "Day 04: GROUP BY Aggregation Buckets & HAVING Filters",
    shortName: "Aggregations & HAVING",
    category: "Aggregations",
    badgeColor: "#a855f7",
    sectionKey: "section4",
    questRange: "Quests 1 – 20 (Easy Tier)",
    sirBloopsAdvice: "Remember: WHERE filters raw rows before aggregation; HAVING filters collapsed summary buckets after aggregation!",
    objectives: [
      "Aggregate row sets using COUNT, SUM, AVG, MIN, and MAX",
      "Group datasets by categorical attributes with GROUP BY",
      "Filter aggregate metrics using the HAVING clause"
    ],
    mentalModel: [
      "GROUP BY collapses thousands of raw records into single summary rows per unique key.",
      "Any unaggregated column in SELECT must be included in the GROUP BY clause."
    ],
    silentTraps: [
      "COUNT(*) counts all rows including NULLs; COUNT(column) ignores NULLs and can distort denominators.",
      "Writing WHERE SUM(amount) > 1000 causes an error; aggregate filters must go in HAVING."
    ],
    practiceGoal: "Complete 20 aggregation quests to master group-level analytics."
  },
  {
    day: 5,
    title: "Day 05: INNER & LEFT JOINs (Relational Stitching & Outer Silencing)",
    shortName: "INNER & LEFT JOINs",
    category: "Joins",
    badgeColor: "#06b6d4",
    sectionKey: "section5",
    questRange: "Quests 1 – 60 (INNER & LEFT Disciplines)",
    sirBloopsAdvice: "The #1 bug in production SQL: putting a filter on the right table in WHERE instead of ON, silently turning your LEFT JOIN into an INNER JOIN!",
    objectives: [
      "Join normalized relational tables via primary key / foreign key equijoins",
      "Preserve all master records from the left table with LEFT JOIN",
      "Detect and prevent the accidental 'Outer Join Silencing' trap"
    ],
    mentalModel: [
      "INNER JOIN: Intersection of matching rows in both tables.",
      "LEFT JOIN: All rows from the left table, padded with NULLs if no right match exists.",
      "ON filters what matches; WHERE filters the combined output."
    ],
    silentTraps: [
      "Placing right-table conditions in WHERE (e.g. WHERE right.status = 'active') drops NULLs and kills LEFT JOIN.",
      "Duplicate keys on the right side cause Cartesian row multiplication (fan-out)."
    ],
    practiceGoal: "Solve 20 INNER and 20 LEFT JOIN quests in the Relational JOIN Arena."
  },
  {
    day: 6,
    title: "Day 06: RIGHT, FULL OUTER & SELF JOINs (Audit Reconciliation & Trees)",
    shortName: "RIGHT, FULL & SELF JOINs",
    category: "Joins",
    badgeColor: "#06b6d4",
    sectionKey: "section5",
    questRange: "Quests 61 – 180 (RIGHT, FULL OUTER & SELF Disciplines)",
    sirBloopsAdvice: "FULL OUTER JOIN is your best friend for financial reconciliation! It instantly reveals orphans on BOTH sides of the ledger!",
    objectives: [
      "Perform two-sided data reconciliations with FULL OUTER JOIN",
      "Query hierarchical relationships (manager-employee, prior period) via SELF JOIN",
      "Find missing records using anti-join patterns (WHERE b.id IS NULL)"
    ],
    mentalModel: [
      "FULL OUTER JOIN keeps everything from both tables, pairing matches and NULL-filling mismatches.",
      "SELF JOIN treats the same physical table as two logical tables using different aliases."
    ],
    silentTraps: [
      "Coalescing IDs: In FULL OUTER JOIN, SELECT a.id drops orphans from table B! Use COALESCE(a.id, b.id).",
      "Infinite recursion or missing top-level roots in SELF JOIN if managers don't have NULL parent IDs."
    ],
    practiceGoal: "Clear 30 quests across FULL OUTER and SELF JOIN disciplines."
  },
  {
    day: 7,
    title: "Day 07: CROSS & Non-Equi JOINs (Cartesian Products & Range Overlaps)",
    shortName: "CROSS & Non-Equi JOINs",
    category: "Joins",
    badgeColor: "#06b6d4",
    sectionKey: "section5",
    questRange: "Quests 181 – 240 (CROSS & NON-EQUI Disciplines)",
    sirBloopsAdvice: "Non-equi joins use operators like BETWEEN, <, and > instead of =. Perfect for tax brackets, price tiers, and date range overlaps!",
    objectives: [
      "Generate complete grid matrices (e.g., all stores x all products) with CROSS JOIN",
      "Join tables across continuous numerical or date intervals (BETWEEN, >=, <=)",
      "Detect overlapping time intervals in bookings and subscriptions"
    ],
    mentalModel: [
      "CROSS JOIN produces M x N rows (Cartesian product). Use deliberately for calendar grids.",
      "Non-Equi JOIN pairs rows based on inequality ranges rather than exact key equality."
    ],
    silentTraps: [
      "Accidental CROSS JOIN caused by omitting the ON clause on large tables can crash database memory.",
      "Overlapping intervals: The correct overlap predicate is (start_a <= end_b AND end_a >= start_b)."
    ],
    practiceGoal: "Solve 20 Non-Equi and 10 CROSS JOIN quests to finish the JOIN Master Arena."
  },
  {
    day: 8,
    title: "Day 08: Window Functions: Ranking & Deduplication (ROW_NUMBER, RANK)",
    shortName: "Window Ranking",
    category: "Window Functions",
    badgeColor: "#ec4899",
    sectionKey: "section6",
    questRange: "Quests 1 – 30 (Ranking & Partitioning)",
    sirBloopsAdvice: "Window functions calculate across row sets WITHOUT collapsing them into a single row! Pure analytical magic!",
    objectives: [
      "Partition row sets into independent analytical windows via PARTITION BY",
      "Assign sequential row numbers with ROW_NUMBER()",
      "Distinguish between RANK() (skips ties) and DENSE_RANK() (consecutive ranks)"
    ],
    mentalModel: [
      "Unlike GROUP BY which reduces rows, window functions retain every single original row while appending computed metrics.",
      "Use ROW_NUMBER() = 1 to deduplicate and pick the latest record per entity."
    ],
    silentTraps: [
      "Attempting to write WHERE ROW_NUMBER() = 1 directly causes a syntax error! Window functions evaluate after WHERE.",
      "Using RANK() when pagination requires dense numbering creates gaps in rank sequences."
    ],
    practiceGoal: "Master the 'Top N per Category' pattern with 20 Window Ranking quests."
  },
  {
    day: 9,
    title: "Day 09: Window Functions: Running Totals & Offsets (ROWS vs RANGE, LAG)",
    shortName: "Window Frames & Offsets",
    category: "Window Functions",
    badgeColor: "#ec4899",
    sectionKey: "section6",
    questRange: "Quests 31 – 70 (Sliding Frames & Offsets)",
    sirBloopsAdvice: "Beware the default window frame! Without ROWS BETWEEN, an ORDER BY in a window function defaults to RANGE, which silently lumps duplicate values together!",
    objectives: [
      "Calculate continuous running balances and cumulative sums",
      "Explicitly specify physical frames (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
      "Compare adjacent rows with LAG() and LEAD() for period-over-period growth"
    ],
    mentalModel: [
      "A sliding window frame defines the exact slice of preceding/following rows included in the calculation.",
      "LAG(val, 1) looks backward 1 row; LEAD(val, 1) looks forward 1 row."
    ],
    silentTraps: [
      "The default frame `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` groups identical timestamps into the same running total.",
      "Division by zero in percentage growth: Wrap the denominator with NULLIF(LAG(sales), 0)."
    ],
    practiceGoal: "Solve 20 Running Total and LAG/LEAD quests in Section 06."
  },
  {
    day: 10,
    title: "Day 10: Subqueries & Modular CTE Pipelines (WITH DAG Pipelines)",
    shortName: "CTEs & Subqueries",
    category: "Modular SQL",
    badgeColor: "#6366f1",
    sectionKey: "section7",
    questRange: "Quests 1 – 30 (Scalar, Correlated & CTE Pipelines)",
    sirBloopsAdvice: "Say goodbye to unreadable spaghetti SQL! Common Table Expressions (CTEs) let you read and debug complex pipelines from top to bottom!",
    objectives: [
      "Replace deep nested subqueries with readable, modular WITH CTEs",
      "Write efficient existence checks with WHERE EXISTS (correlated subqueries)",
      "Chain multi-stage data transformation pipelines"
    ],
    mentalModel: [
      "A CTE defines a temporary, named result set that exists only during the execution of that specific query.",
      "EXISTS stops scanning the instant it finds 1 match, outperforming IN on large datasets."
    ],
    silentTraps: [
      "In older PostgreSQL versions (<12), CTEs were optimization fences (materialized to disk). In modern engines they are inlined.",
      "Correlated subqueries in the SELECT clause execute once per outer row, creating an O(N*M) performance penalty."
    ],
    practiceGoal: "Build 20 multi-stage CTE pipelines in Section 07."
  },
  {
    day: 11,
    title: "Day 11: Conditional Logic, CASE Expressions & Matrix Pivoting",
    shortName: "CASE Logic & Pivoting",
    category: "Pivoting",
    badgeColor: "#14b8a6",
    sectionKey: "section8",
    questRange: "Quests 1 – 30 (Conditional & Cross-Tab Pivoting)",
    sirBloopsAdvice: "CASE expressions evaluate top-to-bottom and short-circuit on the FIRST match! Put your most specific condition first!",
    objectives: [
      "Implement conditional branching with Searched CASE expressions",
      "Pivot rows into columns using conditional aggregation (SUM(CASE WHEN ...))",
      "Handle data cleansing, status bucket re-categorization, and zero-nullification"
    ],
    mentalModel: [
      "CASE is an expression, not a procedural control statement. It always returns a single scalar value per row.",
      "Cross-tab pivoting aggregates filtered CASE branches into distinct columnar buckets."
    ],
    silentTraps: [
      "If lower thresholds precede higher thresholds in CASE, the higher threshold will never be reached.",
      "Forgetting the ELSE branch: unhandled rows evaluate to NULL by default, which may contaminate sums."
    ],
    practiceGoal: "Solve 20 conditional pivoting quests in Section 08."
  },
  {
    day: 12,
    title: "Day 12: Set Operations (UNION, INTERSECT, EXCEPT & Schema Alignment)",
    shortName: "Set Operations",
    category: "Set Theory",
    badgeColor: "#8b5cf6",
    sectionKey: "section9",
    questRange: "Quests 1 – 30 (UNION, INTERSECT & EXCEPT)",
    sirBloopsAdvice: "UNION removes duplicates by sorting in memory; UNION ALL keeps all records and is lightning fast! Default to UNION ALL unless you explicitly need deduplication!",
    objectives: [
      "Combine result sets vertically with UNION and UNION ALL",
      "Find common records with INTERSECT and set differences with EXCEPT",
      "Harmonize schemas with synthetic padding and positional type matching"
    ],
    mentalModel: [
      "Set operations match columns strictly by POSITION (1st with 1st, 2nd with 2nd), completely ignoring column names.",
      "EXCEPT is NOT commutative: A EXCEPT B is completely different from B EXCEPT A!"
    ],
    silentTraps: [
      "Column aliases in the 2nd query of a set operation are completely ignored; the 1st query defines column names.",
      "Unnecessary UNION causes an expensive disk/memory sort spill; use UNION ALL whenever possible."
    ],
    practiceGoal: "Complete 20 Set Operation quests to master schema harmonization."
  },
  {
    day: 13,
    title: "Day 13: DDL, Physical Schema Architecture & Constraints",
    shortName: "DDL & Constraints",
    category: "Schema Architecture",
    badgeColor: "#f97316",
    sectionKey: "section10",
    questRange: "Quests 1 – 30 (CREATE, ALTER & Constraints)",
    sirBloopsAdvice: "Database constraints are the ultimate line of defense for data integrity! Never rely solely on application code to validate data!",
    objectives: [
      "Define relational tables with PRIMARY KEY, FOREIGN KEY, and UNIQUE constraints",
      "Enforce domain invariants with CHECK constraints",
      "Safely evolve schemas with ALTER TABLE and non-blocking column additions"
    ],
    mentalModel: [
      "Constraints are enforced by the storage engine inside the ACID transaction boundary.",
      "CHECK constraints evaluate to true if the predicate is TRUE or UNKNOWN (NULL passes CHECK!)."
    ],
    silentTraps: [
      "CHECK (score >= 0) allows NULL values unless accompanied by an explicit NOT NULL constraint.",
      "Adding a column with a volatile DEFAULT on large tables can acquire an exclusive table lock."
    ],
    practiceGoal: "Solve 20 DDL and constraint architecture quests in Section 10."
  },
  {
    day: 14,
    title: "Day 14: DML, Atomic Upserts & ACID Transactions",
    shortName: "DML, Upserts & ACID",
    category: "Data Mutation",
    badgeColor: "#ef4444",
    sectionKey: "section11",
    questRange: "Quests 1 – 30 (INSERT, UPDATE, DELETE & UPSERT)",
    sirBloopsAdvice: "Always write your WHERE clause BEFORE writing DELETE or UPDATE! An unshielded DELETE is an instant career emergency!",
    objectives: [
      "Perform idempotent insert-or-update operations with ON CONFLICT DO UPDATE (UPSERT)",
      "Safely update and delete data with conditional predicates and RETURNING clauses",
      "Manage transaction boundaries (BEGIN, COMMIT, ROLLBACK) and isolation levels"
    ],
    mentalModel: [
      "ACID: Atomicity (all-or-nothing), Consistency (rules intact), Isolation (concurrency control), Durability (persisted to WAL).",
      "Idempotent mutations produce the same state regardless of how many times they are executed."
    ],
    silentTraps: [
      "Omitting WHERE in UPDATE/DELETE modifies every single row in the table.",
      "Deadlocks occur when two concurrent transactions update the same rows in opposite order."
    ],
    practiceGoal: "Complete 20 atomic mutation and upsert quests in Section 11."
  },
  {
    day: 15,
    title: "Day 15: Views, Materialized Views & Concurrency",
    shortName: "Views & Stored Procs",
    category: "Database Abstraction",
    badgeColor: "#0ea5e9",
    sectionKey: "section12",
    questRange: "Quests 1 – 30 (Views, MVs & Procedures)",
    sirBloopsAdvice: "A standard VIEW is just a stored query macro (zero storage); a MATERIALIZED VIEW physically saves the query results on disk for instant speed!",
    objectives: [
      "Encapsulate complex joins into reusable virtual standard views",
      "Accelerate heavy reporting queries using Materialized Views",
      "Refresh materialized views non-blockingly using REFRESH MATERIALIZED VIEW CONCURRENTLY"
    ],
    mentalModel: [
      "Standard View: Zero cached data, expanded into the execution plan at runtime.",
      "Materialized View: Precomputed physical snapshot table with its own indexes."
    ],
    silentTraps: [
      "REFRESH MATERIALIZED VIEW locks the view for reads unless CONCURRENTLY is specified (which requires a unique index).",
      "Nested views (views on views on views) hide underlying query complexity and cause severe performance degradation."
    ],
    practiceGoal: "Clear 20 Views and Materialized Views quests in Section 12."
  },
  {
    day: 16,
    title: "Day 16: Query Performance, EXPLAIN ANALYZE & Index Tuning",
    shortName: "EXPLAIN & Optimization",
    category: "Performance Tuning",
    badgeColor: "#eab308",
    sectionKey: "section13",
    questRange: "Quests 1 – 30 (EXPLAIN, B-Trees & Tuning)",
    sirBloopsAdvice: "EXPLAIN shows what the optimizer *thinks* will happen; EXPLAIN ANALYZE actually runs the query and measures exact buffer hits and timing!",
    objectives: [
      "Interpret EXPLAIN ANALYZE execution plans (Cost, Rows, Width, Actual Time)",
      "Distinguish between Sequential Scans, Index Scans, and Bitmap Index Scans",
      "Eliminate non-SARGable predicates that defeat B-Tree indexes"
    ],
    mentalModel: [
      "Cost is measured in arbitrary I/O page fetch units (1.0 = 1 sequential page read).",
      "SARGable (Search Argument Able) predicates allow the engine to perform direct B-Tree index seeks."
    ],
    silentTraps: [
      "Wrapping an indexed column in a function (WHERE DATE(created_at) = ...) blinds the index and forces a full table scan.",
      "Outdated table statistics cause the cost optimizer to choose disastrous execution plans; run ANALYZE regularly."
    ],
    practiceGoal: "Solve 20 query optimization and EXPLAIN ANALYZE quests in Section 13."
  },
  {
    day: 17,
    title: "Day 17: Cloud Warehouses, QUALIFY & Micro-Partition Pruning",
    shortName: "Cloud Warehouses & DuckDB",
    category: "Modern Warehouses",
    badgeColor: "#38bdf8",
    sectionKey: "section14",
    questRange: "Quests 1 – 30 (QUALIFY, Pruning & Parquet)",
    sirBloopsAdvice: "In modern cloud warehouses like Snowflake, BigQuery, and DuckDB, the QUALIFY clause filters window calculations directly without subqueries!",
    objectives: [
      "Filter window ranks inline using the modern QUALIFY clause",
      "Optimize petabyte scans through partition and micro-partition pruning",
      "Query compressed external Parquet files directly using DuckDB"
    ],
    mentalModel: [
      "Cloud warehouses use columnar storage and metadata min/max bounds to skip reading unneeded micro-partitions.",
      "QUALIFY executes after window calculations in the execution pipeline."
    ],
    silentTraps: [
      "Wrapping partition/clustering keys in scalar functions disables metadata pruning, triggering multi-terabyte scans.",
      "SELECT * on Parquet external lakehouses defeats columnar projection pushdown."
    ],
    practiceGoal: "Clear 20 Modern Cloud Warehouse and QUALIFY quests in Section 14."
  },
  {
    day: 18,
    title: "Day 18: Semi-Structured JSON, Lateral Unnesting & GIN Indexes",
    shortName: "JSON & Semi-Structured",
    category: "Semi-Structured",
    badgeColor: "#06b6d4",
    sectionKey: "section15",
    questRange: "Quests 1 – 30 (Path, Unnesting & GIN)",
    sirBloopsAdvice: "Use -> for intermediate JSON hops (preserves quotes) and ->> for leaf scalar extraction (strips quotes for comparison)!",
    objectives: [
      "Navigate nested JSON documents using path arrow operators (-> vs ->>)",
      "Unnest arrays into relational rows via CROSS JOIN LATERAL jsonb_array_elements()",
      "Accelerate JSON containment queries (@>) with inverted GIN indexes"
    ],
    mentalModel: [
      "JSONB stores decomposed binary JSON with fast index lookups and key deduplication.",
      "CROSS JOIN LATERAL on an array evaluates once per parent row, expanding arrays into rows."
    ],
    silentTraps: [
      "Using CROSS JOIN LATERAL on an empty array [] drops the entire parent row! Use LEFT JOIN LATERAL ... ON TRUE.",
      "Comparing extracted text: payload->'status' = 'succeeded' fails because \"succeeded\" != 'succeeded'. Use ->>."
    ],
    practiceGoal: "Solve 20 JSON extraction, lateral unnesting, and GIN quests in Section 15."
  },
  {
    day: 19,
    title: "Day 19: Financial Analytics, Continuous Balances & Gaps-and-Islands",
    shortName: "Financial Analytics",
    category: "Quantitative Finance",
    badgeColor: "#10b981",
    sectionKey: "section6",
    questRange: "Quests 71 – 100 (Advanced Financial Frames)",
    sirBloopsAdvice: "Financial ledgers are event-driven, but financial statements require dense daily balances! Master calendar scaffolding and rolling volatility!",
    objectives: [
      "Compute continuous running balances with dense calendar scaffolding (GENERATE_SERIES)",
      "Implement Gaps-and-Islands algorithms to detect active streak periods and loan defaults",
      "Calculate rolling volatility and Sharpe ratio components using physical time frames"
    ],
    mentalModel: [
      "Sparse transaction logs must be left-joined to a continuous calendar dimension to prevent missing non-trading days.",
      "Double-entry bookkeeping verification: SUM(debits) - SUM(credits) must equal zero per journal batch."
    ],
    silentTraps: [
      "Summing daily balances across accounts: You cannot SUM running balances across time without creating fictitious money!",
      "Missing weekends in daily moving averages: Use RANGE BETWEEN INTERVAL '30 DAYS' PRECEDING instead of ROWS."
    ],
    practiceGoal: "Master time-series financial calculations across 20 advanced analytical quests."
  },
  {
    day: 20,
    title: "Day 20: The Grand Multi-Pillar Boss Gauntlet & Graduation",
    shortName: "Grand Boss Gauntlet",
    category: "Mastery Graduation",
    badgeColor: "#f59e0b",
    sectionKey: "boss",
    questRange: "All 30 Boss Challenges",
    sirBloopsAdvice: "This is it! The ultimate gauntlet combining JOINs, Window Functions, CTEs, Transactions, and Optimization into 30 production challenges! You are ready!",
    objectives: [
      "Solve end-to-end multi-table production incident scenarios",
      "Synthesize all 15 SQL pillars into clean, high-performance queries",
      "Claim your SQL Foundry Certified Master Analyst credential"
    ],
    mentalModel: [
      "Production queries combine 4-5 concepts simultaneously (CTE pipeline -> Window Deduplication -> Anti-Join -> JSON build).",
      "Think in dataflow transformations from raw storage to clean business output."
    ],
    silentTraps: [
      "Over-complicating queries: Always look for the cleanest set-based or windowed solution before writing deeply nested logic."
    ],
    practiceGoal: "Conquer the 30 Boss Challenges to complete your SQL Foundry journey!"
  }
];

const LEARNING_JOURNEY_STORAGE_KEY = 'sql_mastery_learning_journey_v1';

class LearningJourneyEngine {
  constructor() {
    this.days = LEARNING_JOURNEY_DAYS;
    this.state = this.loadState();
    this.selectedDayIndex = this.state.currentDay - 1;
  }

  loadState() {
    try {
      const saved = localStorage.getItem(LEARNING_JOURNEY_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load learning journey state from localStorage', e);
    }
    return {
      currentDay: 1,
      completedDays: [],
      streak: 1,
      totalQuestsCompleted: 0,
      xp: 60,
      lastActiveDate: new Date().toISOString().split('T')[0],
      activityMap: {
        [new Date().toISOString().split('T')[0]]: 5
      }
    };
  }

  saveState() {
    try {
      localStorage.setItem(LEARNING_JOURNEY_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save learning journey state', e);
    }
    // Update header pill
    const pill = document.getElementById('currentJourneyPill');
    if (pill) {
      const activeDay = this.days[this.state.currentDay - 1] || this.days[0];
      pill.textContent = `Day ${activeDay.day} • ${activeDay.shortName}`;
    }
  }

  advanceToNextDay(dayNum) {
    if (!this.state.completedDays.includes(dayNum)) {
      this.state.completedDays.push(dayNum);
      this.state.xp += 100;
      this.state.totalQuestsCompleted += 20;

      const today = new Date().toISOString().split('T')[0];
      this.state.activityMap[today] = (this.state.activityMap[today] || 0) + 20;
      this.state.lastActiveDate = today;
    }

    if (dayNum < this.days.length) {
      this.state.currentDay = Math.max(this.state.currentDay, dayNum + 1);
      this.selectedDayIndex = this.state.currentDay - 1;
    }

    this.saveState();

    // Celebration
    if (window.SQL_BUDDY) {
      window.SQL_BUDDY.celebrate();
      const nextDay = this.days[this.state.currentDay - 1];
      window.SQL_BUDDY.say(
        `🎉 Milestone Conquered! Moving ahead to Day ${nextDay.day}: ${nextDay.shortName}! Let's keep the momentum going!`,
        6000,
        'happy'
      );
    }
    if (window.AudioFX) {
      window.AudioFX.playSuccess();
    }

    this.render();
  }

  selectDay(dayIndex) {
    this.selectedDayIndex = dayIndex;
    this.renderActiveDossier();
    // Scroll dossier into view smoothly
    const dossierEl = document.getElementById('journeyActiveDossier');
    if (dossierEl) {
      dossierEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  generateHeatmapHtml() {
    // Duolingo / GitHub style 28-day (4 weeks) activity heatmap
    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const today = new Date();
    const cells = [];

    // Build 28 days ending today
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = this.state.activityMap[dateStr] || (i === 0 ? 8 : (i % 3 === 0 ? Math.floor(Math.random() * 15) + 5 : 0));
      
      let level = 0;
      if (count > 0 && count < 5) level = 1;
      else if (count >= 5 && count < 15) level = 2;
      else if (count >= 15 && count < 30) level = 3;
      else if (count >= 30) level = 4;

      const isToday = i === 0;
      cells.push(`
        <div class="heatmap-cell level-${level} ${isToday ? 'is-today' : ''}" 
             title="${dateStr}: ${count} Quests Solved">
        </div>
      `);
    }

    const pctMastered = Math.round((this.state.completedDays.length / this.days.length) * 100);

    return `
      <div class="journey-heatmap-card">
        <div class="journey-heatmap-header">
          <div class="journey-heatmap-title-block">
            <span class="heatmap-icon">🔥</span>
            <div>
              <div class="heatmap-title">Daily Practice Consistency &amp; Mastery Heatmap</div>
              <div class="heatmap-subtitle">4-Week Active Retrieval Streak &bull; Goal: 20 Quests / Day</div>
            </div>
          </div>
          <div class="journey-stats-row">
            <div class="journey-stat-badge">
              <span class="stat-num">${this.state.streak || 1}d</span>
              <span class="stat-lbl">Streak</span>
            </div>
            <div class="journey-stat-badge">
              <span class="stat-num">${this.state.completedDays.length} / 20</span>
              <span class="stat-lbl">Days Cleared</span>
            </div>
            <div class="journey-stat-badge">
              <span class="stat-num">${pctMastered}%</span>
              <span class="stat-lbl">Curriculum</span>
            </div>
            <div class="journey-stat-badge" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.3);">
              <span class="stat-num" style="color: #f59e0b;">${this.state.xp} XP</span>
              <span class="stat-lbl" style="color: #f59e0b;">Mastery XP</span>
            </div>
          </div>
        </div>

        <div class="journey-heatmap-grid-wrap">
          <div class="heatmap-days-legend">
            ${daysOfWeek.map(d => `<span class="day-label">${d}</span>`).join('')}
          </div>
          <div class="heatmap-cells-grid">
            ${cells.join('')}
          </div>
          <div class="heatmap-intensity-legend">
            <span style="font-size: 10px; color: var(--text-muted); margin-right: 4px;">Less</span>
            <span class="heatmap-cell level-0"></span>
            <span class="heatmap-cell level-1"></span>
            <span class="heatmap-cell level-2"></span>
            <span class="heatmap-cell level-3"></span>
            <span class="heatmap-cell level-4"></span>
            <span style="font-size: 10px; color: var(--text-muted); margin-left: 4px;">More</span>
          </div>
        </div>
      </div>
    `;
  }

  generateAdventureTrailHtml() {
    const activeDayNum = this.state.currentDay;

    const nodesHtml = this.days.map((d, idx) => {
      const isCompleted = this.state.completedDays.includes(d.day);
      const isCurrent = d.day === activeDayNum;
      const isSelected = idx === this.selectedDayIndex;
      const isLocked = d.day > activeDayNum && !isCompleted;

      let statusBadge = '';
      if (isCompleted) {
        statusBadge = `<span class="checkpoint-check">✓</span>`;
      } else if (isCurrent) {
        statusBadge = `<span class="checkpoint-active-pulse">●</span>`;
      } else {
        statusBadge = `<span class="checkpoint-lock">🔒</span>`;
      }

      // Bloub mascot rendered directly on the CURRENT checkpoint using authentic vector geometry
      let bloubMascotHtml = '';
      if (isCurrent) {
        bloubMascotHtml = `
          <div class="trail-bloub-avatar" title="Sir Bloops is stationed here!">
            <div class="trail-bloub-speech">
              <span>Day ${d.day}</span>
            </div>
            <div class="trail-bloub-svg-wrap">
              <svg viewBox="-140 -140 280 280" width="46" height="46" class="bloub-authentic-icon">
                <!-- Authentic Bloub Galet Pebble Body -->
                <path d="M97.7 0C97.2 3.19 96.46 6.34 95.64 9.42C94.82 12.5 93.86 15.52 92.78 18.46C91.71 21.4 90.5 24.27 89.19 27.05C87.88 29.84 86.42 32.55 84.9 35.17C83.38 37.8 81.76 40.33 80.08 42.8C78.4 45.27 76.66 47.68 74.83 50C73 52.32 71.09 54.56 69.11 56.71C67.13 58.87 65.06 60.94 62.93 62.93C60.8 64.92 58.6 66.82 56.33 68.64C54.06 70.46 51.73 72.2 49.33 73.83C46.93 75.46 44.45 76.99 41.91 78.4C39.37 79.82 36.77 81.15 34.1 82.32C31.44 83.49 28.69 84.54 25.92 85.45C23.15 86.36 20.32 87.14 17.46 87.78C14.61 88.42 11.7 88.92 8.79 89.27C5.88 89.62 2.93 89.85 0 89.9C-2.93 89.95 -5.89 89.81 -8.82 89.57C-11.75 89.33 -14.7 88.98 -17.6 88.47C-20.5 87.96 -23.38 87.27 -26.24 86.51C-29.1 85.75 -31.96 84.9 -34.75 83.89C-37.54 82.88 -40.28 81.69 -42.99 80.43C-45.7 79.17 -48.38 77.82 -51 76.33C-53.61 74.84 -56.17 73.22 -58.68 71.5C-61.19 69.79 -63.66 67.98 -66.04 66.04C-68.42 64.11 -70.74 62.05 -72.97 59.89C-75.2 57.73 -77.36 55.45 -79.41 53.06C-81.46 50.68 -83.44 48.18 -85.28 45.58C-87.12 42.98 -88.87 40.27 -90.45 37.46C-92.03 34.65 -93.48 31.74 -94.74 28.74C-95.99 25.74 -97.08 22.64 -97.98 19.49C-98.88 16.34 -99.63 13.11 -100.12 9.86C-100.61 6.61 -100.85 3.29 -100.9 0C-100.95 -3.29 -100.8 -6.62 -100.41 -9.89C-100.02 -13.16 -99.42 -16.44 -98.57 -19.61C-97.72 -22.78 -96.59 -25.9 -95.31 -28.91C-94.03 -31.92 -92.57 -34.87 -90.91 -37.66C-89.25 -40.45 -87.37 -43.12 -85.37 -45.63C-83.37 -48.14 -81.18 -50.51 -78.91 -52.72C-76.64 -54.93 -74.21 -56.98 -71.74 -58.87C-69.26 -60.76 -66.65 -62.46 -64.06 -64.06C-61.47 -65.66 -58.86 -67.15 -56.21 -68.49C-53.56 -69.83 -50.85 -71 -48.17 -72.09C-45.49 -73.18 -42.8 -74.15 -40.12 -75.05C-37.44 -75.95 -34.78 -76.76 -32.11 -77.51C-29.44 -78.26 -26.77 -78.87 -24.12 -79.52C-21.47 -80.17 -18.85 -80.85 -16.19 -81.41C-13.53 -81.97 -10.86 -82.43 -8.16 -82.9C-5.46 -83.36 -2.76 -83.82 0 -84.2C2.76 -84.58 5.55 -84.94 8.39 -85.19C11.23 -85.44 14.12 -85.66 17.05 -85.72C19.98 -85.78 22.95 -85.73 25.95 -85.55C28.95 -85.37 32 -85.09 35.05 -84.63C38.1 -84.17 41.2 -83.6 44.26 -82.81C47.32 -82.02 50.41 -81.07 53.39 -79.9C56.38 -78.73 59.32 -77.33 62.17 -75.76C65.02 -74.19 67.86 -72.46 70.5 -70.5C73.14 -68.54 75.66 -66.34 78 -64.01C80.34 -61.68 82.57 -59.15 84.56 -56.5C86.55 -53.84 88.38 -51 89.96 -48.08C91.54 -45.16 92.89 -42.07 94.05 -38.96C95.21 -35.85 96.22 -32.64 96.94 -29.41C97.66 -26.18 98.09 -22.85 98.37 -19.57C98.65 -16.29 98.73 -12.97 98.62 -9.71C98.51 -6.45 98.2 -3.19 97.7 0Z" fill="#ffffff" />
                <!-- Authentic Pill Eyes -->
                <g transform="translate(-24, 0)">
                  <path d="M-10 -12 A10 10 0 0 1 0 -22 L0 -22 A10 10 0 0 1 10 -12 L10 12 A10 10 0 0 1 0 22 L0 22 A10 10 0 0 1 -10 12 Z" fill="#0a0a0c" />
                </g>
                <g transform="translate(24, 0)">
                  <path d="M-10 -12 A10 10 0 0 1 0 -22 L0 -22 A10 10 0 0 1 10 -12 L10 12 A10 10 0 0 1 0 22 L0 22 A10 10 0 0 1 -10 12 Z" fill="#0a0a0c" />
                </g>
              </svg>
            </div>
          </div>
        `;
      }

      return `
        <div class="journey-node-card ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}"
             onclick="window.learningJourneyEngine.selectDay(${idx})">
          ${bloubMascotHtml}
          <div class="node-header">
            <span class="node-day-pill" style="border-left: 3px solid ${d.badgeColor};">Day ${d.day}</span>
            ${statusBadge}
          </div>
          <div class="node-title">${d.shortName}</div>
          <div class="node-category" style="color: ${d.badgeColor};">${d.category}</div>
          <div class="node-meta">${d.questRange}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="journey-trail-section">
        <div class="journey-trail-header">
          <div>
            <div class="trail-title">🗺️ Interactive 20-Day SQL Mastery Trail</div>
            <div class="trail-subtitle">Click any checkpoint to inspect objectives, silent traps, and launch quests. Complete your day to move Sir Bloops forward!</div>
          </div>
          <div class="trail-legend">
            <span class="legend-item"><span class="legend-dot completed">✓</span> Cleared</span>
            <span class="legend-item"><span class="legend-dot current">●</span> Sir Bloops Here</span>
            <span class="legend-item"><span class="legend-dot locked">🔒</span> Upcoming</span>
          </div>
        </div>

        <div class="journey-trail-track">
          ${nodesHtml}
        </div>
      </div>
    `;
  }

  generateActiveDossierHtml() {
    const day = this.days[this.selectedDayIndex] || this.days[0];
    const isCompleted = this.state.completedDays.includes(day.day);
    const isCurrent = day.day === this.state.currentDay;

    const objectivesHtml = day.objectives.map(o => `<li>${o}</li>`).join('');
    const mentalModelHtml = day.mentalModel.map(m => `<li>${m}</li>`).join('');
    const silentTrapsHtml = day.silentTraps.map(t => `
      <div class="dossier-trap-item">
        <span class="trap-warn-icon">⚠️</span>
        <span>${t}</span>
      </div>
    `).join('');

    return `
      <div class="journey-dossier-card" id="journeyActiveDossier">
        <div class="dossier-header" style="border-top: 4px solid ${day.badgeColor};">
          <div class="dossier-title-col">
            <div class="dossier-meta-row">
              <span class="dossier-day-tag" style="background: ${day.badgeColor}22; color: ${day.badgeColor};">Day ${day.day} of 20</span>
              <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-secondary);">${day.category}</span>
              ${isCompleted ? '<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">✓ MASTERED</span>' : ''}
              ${isCurrent ? '<span class="badge" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8;">ACTIVE CHECKPOINT</span>' : ''}
            </div>
            <h2 class="dossier-main-title">${day.title}</h2>
          </div>

          <div class="dossier-actions-col">
            <button class="action-btn action-btn-primary dossier-cta-btn" onclick="window.learningJourneyEngine.launchQuestForDay(${day.day})">
              <span>⚡ Launch Quests</span>
              <span style="font-size: 11px; opacity: 0.85;">(${day.questRange})</span>
            </button>
            <button class="action-btn action-btn-secondary" style="margin-top: 6px;" onclick="window.learningJourneyEngine.advanceToNextDay(${day.day})">
              ${isCompleted ? '✓ Completed (Advance Again)' : '🎉 Mark Mastered &amp; Advance Sir Bloops ➡️'}
            </button>
          </div>
        </div>

        <!-- Sir Bloops Co-Pilot Briefing Speech Card -->
        <div class="dossier-bloops-card">
          <div class="bloops-avatar-thumb">
            <svg viewBox="-158 -158 316 316" width="38" height="38">
              <path d="M 0 -85 C 50 -85 85 -50 85 0 C 85 50 50 85 0 85 C -50 85 -85 50 -85 0 C -85 -50 -50 -85 0 -85 Z" fill="#3ecf8e" />
              <ellipse cx="-20" cy="-8" rx="8" ry="12" fill="#ffffff" />
              <ellipse cx="20" cy="-8" rx="8" ry="12" fill="#ffffff" />
              <circle cx="-18" cy="-8" r="4" fill="#0a0a0c" />
              <circle cx="22" cy="-8" r="4" fill="#0a0a0c" />
            </svg>
          </div>
          <div class="bloops-speech-content">
            <div class="bloops-name">Sir Bloops-a-Lot &bull; Chief Co-Pilot Briefing</div>
            <div class="bloops-body">"${day.sirBloopsAdvice}"</div>
          </div>
        </div>

        <div class="dossier-grid">
          <!-- 1. Learning Objectives -->
          <div class="dossier-section-box">
            <div class="box-title">
              <span>🎯 Learning Objectives</span>
            </div>
            <ul class="dossier-list">
              ${objectivesHtml}
            </ul>
          </div>

          <!-- 2. Core Mental Model -->
          <div class="dossier-section-box">
            <div class="box-title">
              <span>🧠 Core Mental Model</span>
            </div>
            <ul class="dossier-list">
              ${mentalModelHtml}
            </ul>
          </div>
        </div>

        <!-- 3. Silent Traps & Defense Matrix -->
        <div class="dossier-section-box traps-box" style="margin-top: 14px;">
          <div class="box-title" style="color: #f59e0b;">
            <span>⚠️ Silent Traps Tested in this Checkpoint</span>
          </div>
          <div class="traps-container">
            ${silentTrapsHtml}
          </div>
        </div>

        <!-- 4. Quick Action Navigation Row -->
        <div class="dossier-footer-links">
          <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">TOPIC PRACTICE:</span>
          <button class="dossier-pill-btn" onclick="window.learningJourneyEngine.openTopicHubForDay(${day.day}, 'mcqs')">🧠 Day ${day.day} MCQs</button>
          <button class="dossier-pill-btn" onclick="window.learningJourneyEngine.openTopicHubForDay(${day.day}, 'cases')">💼 Day ${day.day} Case Studies</button>
          <button class="dossier-pill-btn" onclick="window.learningJourneyEngine.openTopicHubForDay(${day.day}, 'problems')">🏆 Day ${day.day} Query Problems</button>
          <button class="dossier-pill-btn" onclick="window.learningJourneyEngine.launchQuestForDay(${day.day})">🎮 Quests Terminal</button>
          <button class="dossier-pill-btn" onclick="switchMainView('viewExplainer')">📚 Study Docs</button>
        </div>
      </div>
    `;
  }

  openTopicHubForDay(dayNum, tabName = 'mcqs') {
    const dayModuleMap = {
      1: 'foundations',
      2: 'filtering',
      3: 'sorting',
      4: 'foundations',
      5: 'aggregations',
      6: 'aggregations',
      7: 'joins',
      8: 'joins',
      9: 'subqueries_ctes',
      10: 'subqueries_ctes',
      11: 'window',
      12: 'window',
      13: 'set_operations',
      14: 'set_operations',
      15: 'cloud_modern',
      16: 'cloud_modern',
      17: 'cloud_modern',
      18: 'cloud_modern',
      19: 'cloud_modern',
      20: 'cloud_modern'
    };
    const modId = dayModuleMap[dayNum] || 'all';
    if (typeof switchMainView === 'function') {
      switchMainView('viewMcqs');
    }
    if (typeof renderMcqs === 'function') {
      renderMcqs(null, true, modId, tabName);
    }
  }

  launchQuestForDay(dayNum) {
    const day = this.days.find(d => d.day === dayNum) || this.days[0];
    
    // Switch to Quests view
    if (typeof switchMainView === 'function') {
      switchMainView('viewQuests');
    }
    
    // Switch to section
    if (typeof switchQuestSection === 'function') {
      switchQuestSection(day.sectionKey);
    }

    if (window.SQL_BUDDY) {
      window.SQL_BUDDY.say(
        `🚀 Launched ${day.title}! Complete these fill-in-the-blank quests to master today's challenge!`,
        5000,
        'happy'
      );
    }
  }

  renderActiveDossier() {
    const container = document.getElementById('journeyActiveDossierContainer');
    if (container) {
      container.innerHTML = this.generateActiveDossierHtml();
    }
  }

  render() {
    const container = document.getElementById('viewLearningJourney');
    if (!container) return;

    container.innerHTML = `
      <div class="learning-journey-page">
        <!-- 1. Header & Consistency Heatmap -->
        ${this.generateHeatmapHtml()}

        <!-- 2. Interactive Adventure Trail with Sir Bloops -->
        ${this.generateAdventureTrailHtml()}

        <!-- 3. Active Day Dossier -->
        <div id="journeyActiveDossierContainer">
          ${this.generateActiveDossierHtml()}
        </div>
      </div>
    `;
  }
}

// Global engine instance
window.learningJourneyEngine = new LearningJourneyEngine();
window.renderLearningJourney = function() {
  window.learningJourneyEngine.render();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.learningJourneyEngine.saveState();
  });
} else {
  window.learningJourneyEngine.saveState();
}

