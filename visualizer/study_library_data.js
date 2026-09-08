// =============================================================================
// SQL MASTERY PLATFORM — COMPREHENSIVE STUDY LIBRARY & KNOWLEDGE REPOSITORY
// Exhaustive, textbook-grade study materials and Neo-Brutalist visual diagrams
// directly aligned with the 1,200 MCQs Technical Vault & 1,040 Case Studies.
// =============================================================================

window.STUDY_LIBRARY = [
  // ---------------------------------------------------------------------------
  // MODULE 01: SQL Foundations & Physical Execution Pipeline
  // ---------------------------------------------------------------------------
  {
    id: 'sec_execution_order',
    pillarId: 'pillar1',
    icon: '⚡',
    title: '01. Physical Execution Order & Query Lifecycle Engine',
    badge: 'Core Architecture',
    badgeClass: 'pill-from',
    readTime: '12 min read',
    summary: 'Why SQL queries are written declaratively in lexical order (SELECT ... FROM) but executed by the relational engine in a completely different physical sequence.',
    svgDiagram: `
      <svg viewBox="0 0 860 270" width="100%" height="100%" style="min-height: 220px; max-height: 320px; display: block;" xmlns="http://www.w3.org/2000/svg">
        <rect width="860" height="270" fill="#080c14" rx="14" stroke="#000000" stroke-width="3"/>
        <!-- Header Banner -->
        <rect x="18" y="16" width="824" height="34" fill="#fbbf24" rx="8" stroke="#000000" stroke-width="2"/>
        <text x="430" y="38" fill="#000000" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="0.5">
          PHYSICAL EXECUTION PIPELINE (LEXICAL SELECT RUNS 5TH, NOT 1ST!)
        </text>

        <!-- Stage Boxes: 8 Discrete Physical Steps -->
        <!-- Step 1: FROM & JOIN -->
        <rect x="23" y="73" width="90" height="90" fill="#000000" rx="8"/>
        <rect x="20" y="70" width="90" height="90" fill="#38bdf8" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="65" y="93" fill="#000000" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">01. FROM</text>
        <text x="65" y="112" fill="#000000" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">&amp; JOINs</text>
        <rect x="28" y="125" width="74" height="26" fill="#ffffff" rx="4" stroke="#000000" stroke-width="1.5"/>
        <text x="65" y="142" fill="#000000" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" text-anchor="middle">RAM Table Bind</text>

        <!-- Arrow 1 -->
        <path d="M 115 115 L 125 115" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

        <!-- Step 2: WHERE -->
        <rect x="130" y="73" width="90" height="90" fill="#000000" rx="8"/>
        <rect x="127" y="70" width="90" height="90" fill="#f43f5e" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="172" y="93" fill="#ffffff" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">02. WHERE</text>
        <text x="172" y="112" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Row Filter</text>
        <rect x="135" y="125" width="74" height="26" fill="#ffffff" rx="4" stroke="#000000" stroke-width="1.5"/>
        <text x="172" y="142" fill="#000000" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" text-anchor="middle">Discard Fails</text>

        <!-- Arrow 2 -->
        <path d="M 222 115 L 232 115" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

        <!-- Step 3: GROUP BY -->
        <rect x="237" y="73" width="90" height="90" fill="#000000" rx="8"/>
        <rect x="234" y="70" width="90" height="90" fill="#fbbf24" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="279" y="93" fill="#000000" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">03. GROUP</text>
        <text x="279" y="112" fill="#000000" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Hash Buckets</text>
        <rect x="242" y="125" width="74" height="26" fill="#ffffff" rx="4" stroke="#000000" stroke-width="1.5"/>
        <text x="279" y="142" fill="#000000" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" text-anchor="middle">Partition Rows</text>

        <!-- Arrow 3 -->
        <path d="M 329 115 L 339 115" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

        <!-- Step 4: HAVING -->
        <rect x="344" y="73" width="90" height="90" fill="#000000" rx="8"/>
        <rect x="341" y="70" width="90" height="90" fill="#f472b6" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="386" y="93" fill="#000000" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">04. HAVING</text>
        <text x="386" y="112" fill="#000000" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Group Filter</text>
        <rect x="349" y="125" width="74" height="26" fill="#ffffff" rx="4" stroke="#000000" stroke-width="1.5"/>
        <text x="386" y="142" fill="#000000" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" text-anchor="middle">Filter Aggregates</text>

        <!-- Arrow 4 -->
        <path d="M 436 115 L 446 115" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

        <!-- Step 5: SELECT -->
        <rect x="451" y="73" width="90" height="90" fill="#000000" rx="8"/>
        <rect x="448" y="70" width="90" height="90" fill="#22c55e" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="493" y="93" fill="#000000" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">05. SELECT</text>
        <text x="493" y="112" fill="#000000" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Projections</text>
        <rect x="456" y="125" width="74" height="26" fill="#ffffff" rx="4" stroke="#000000" stroke-width="1.5"/>
        <text x="493" y="142" fill="#000000" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" text-anchor="middle">Assign Aliases</text>

        <!-- Arrow 5 -->
        <path d="M 543 115 L 553 115" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

        <!-- Step 6: DISTINCT -->
        <rect x="558" y="73" width="90" height="90" fill="#000000" rx="8"/>
        <rect x="555" y="70" width="90" height="90" fill="#c084fc" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="600" y="93" fill="#000000" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">06. DISTINCT</text>
        <text x="600" y="112" fill="#000000" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Deduplicate</text>
        <rect x="563" y="125" width="74" height="26" fill="#ffffff" rx="4" stroke="#000000" stroke-width="1.5"/>
        <text x="600" y="142" fill="#000000" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" text-anchor="middle">Unique Tuples</text>

        <!-- Arrow 6 -->
        <path d="M 650 115 L 660 115" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

        <!-- Step 7: ORDER BY -->
        <rect x="665" y="73" width="90" height="90" fill="#000000" rx="8"/>
        <rect x="662" y="70" width="90" height="90" fill="#fef08a" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="707" y="93" fill="#000000" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">07. ORDER BY</text>
        <text x="707" y="112" fill="#000000" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">Sort Engine</text>
        <rect x="670" y="125" width="74" height="26" fill="#ffffff" rx="4" stroke="#000000" stroke-width="1.5"/>
        <text x="707" y="142" fill="#000000" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" text-anchor="middle">Priority Heap</text>

        <!-- Arrow 7 -->
        <path d="M 757 115 L 767 115" stroke="#000000" stroke-width="3" stroke-linecap="round"/>

        <!-- Step 8: LIMIT -->
        <rect x="772" y="73" width="68" height="90" fill="#000000" rx="8"/>
        <rect x="769" y="70" width="68" height="90" fill="#38bdf8" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="803" y="93" fill="#000000" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">08. LIMIT</text>
        <text x="803" y="112" fill="#000000" font-family="system-ui, sans-serif" font-size="9" font-weight="800" text-anchor="middle">Truncate</text>
        <rect x="774" y="125" width="58" height="26" fill="#ffffff" rx="4" stroke="#000000" stroke-width="1.5"/>
        <text x="803" y="142" fill="#000000" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" text-anchor="middle">Top Rows</text>

        <!-- Bottom Callout Strips (The Critical Traps) -->
        <rect x="23" y="179" width="394" height="74" fill="#000000" rx="10"/>
        <rect x="20" y="176" width="394" height="74" fill="#fee2e2" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="35" y="198" fill="#b91c1c" font-family="monospace" font-size="11" font-weight="900">⚠️ WHY ALIASES FAIL IN WHERE:</text>
        <text x="35" y="217" fill="#000000" font-family="system-ui, sans-serif" font-size="11" font-weight="700">WHERE runs at Step 02, while SELECT aliases are created</text>
        <text x="35" y="234" fill="#000000" font-family="system-ui, sans-serif" font-size="11" font-weight="700">at Step 05. The column alias does not physically exist yet!</text>

        <rect x="435" y="179" width="407" height="74" fill="#000000" rx="10"/>
        <rect x="432" y="176" width="407" height="74" fill="#dcfce7" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="447" y="198" fill="#15803d" font-family="monospace" font-size="11" font-weight="900">💡 WHY ALIASES WORK IN ORDER BY:</text>
        <text x="447" y="217" fill="#000000" font-family="system-ui, sans-serif" font-size="11" font-weight="700">ORDER BY executes at Step 07, AFTER Step 05 has projected</text>
        <text x="447" y="234" fill="#000000" font-family="system-ui, sans-serif" font-size="11" font-weight="700">all columns and registered your custom aliases in memory!</text>
      </svg>
    `,
    sections: [
      {
        heading: '1. Declarative Syntax vs. Imperative Storage Physics',
        content: `In standard declarative SQL, queries are written in **Lexical Order**:
\`\`\`sql
SELECT customer_id, COUNT(*) AS orders_count
FROM Orders
WHERE order_date >= '2026-01-01'
GROUP BY customer_id
HAVING COUNT(*) >= 5
ORDER BY orders_count DESC
LIMIT 10;
\`\`\`
However, the relational storage engine cannot read columns before it knows which tables to scan! Under the hood, MySQL InnoDB and PostgreSQL translate the query into an **Abstract Syntax Tree (AST)** and execute it in **Strict Physical Order**:
1. **FROM & JOINs**: Binds the target tables from disk storage pages into virtual working memory.
2. **WHERE**: Evaluates row-by-row boolean predicates, discarding failing records before any aggregation overhead.
3. **GROUP BY**: Hashes the surviving rows into discrete aggregation buckets in temporary RAM buffers.
4. **HAVING**: Filters group summary buckets based on aggregate function results.
5. **SELECT**: Evaluates mathematical projections and registers column aliases.
6. **DISTINCT**: Hashes or sorts output tuples to remove duplicate rows.
7. **ORDER BY**: Sorts the final stream using an in-memory priority queue heap or multi-way merge filesort.
8. **LIMIT / OFFSET**: Truncates the result stream to the requested row count.`
      },
      {
        heading: '2. The Alias Scope Fence (Interview Trap #1)',
        content: `A universal senior SQL interview question is: *"Why does \`WHERE total_price > 100\` fail with \`Unknown column 'total_price'\` if \`total_price\` was declared in \`SELECT\`?"*

The answer lies entirely in physical sequencing:
- At Step 2 (**WHERE**), the query engine is evaluating raw rows streaming from disk.
- Step 5 (**SELECT**) has not yet executed, meaning the alias \`total_price\` does not exist in the engine's symbol table!
- Conversely, at Step 7 (**ORDER BY**), Step 5 has completed. Therefore, \`ORDER BY total_price DESC\` works seamlessly.`
      },
      {
        heading: '3. WHERE vs. HAVING: Physical Filter Boundaries',
        content: `Understanding the physical execution boundary between Step 2 and Step 4 is essential for query performance:
- **WHERE filters base rows BEFORE grouping**: It operates on individual records. Running \`WHERE salary > 50000\` discards ineligible rows immediately, dramatically reducing the memory required by \`GROUP BY\`.
- **HAVING filters groups AFTER aggregation**: It operates on summary buckets. \`HAVING COUNT(*) > 5\` checks the computed aggregate accumulator.
- **Rule of Thumb**: Never filter raw unaggregated columns in \`HAVING\`. Always push row-level predicates into \`WHERE\` so the engine can utilize B-Tree indexes!`
      },
      {
        heading: '4. Memory Buffers & Disk Spill Mechanics',
        content: `When queries exceed available RAM, the physical engine alters its strategy:
- **tmp_table_size & max_heap_table_size**: Governs in-memory temporary tables created during \`GROUP BY\` and \`DISTINCT\`. If the aggregate hash table exceeds this limit, MySQL converts the table to an on-disk InnoDB temporary table, incurring heavy disk I/O.
- **sort_buffer_size**: Used by \`ORDER BY\`. When sorting small sets with \`LIMIT N\`, MySQL uses an in-memory Priority Queue. When the dataset exceeds this buffer, it performs a disk-based multi-way merge sort.`
      }
    ],
    interviewGotchas: [
      {
        title: "The Alias Collision Trap",
        trap: "Attempting to use a SELECT alias in WHERE or HAVING (in standard ANSI SQL) produces syntax errors. In MySQL, aliases are permitted in HAVING due to an engine extension, but this breaks portability to Postgres, Oracle, and SQL Server."
      },
      {
        title: "The WHERE Aggregate Crash",
        trap: "Writing WHERE COUNT(*) > 1 throws 'Invalid use of group function' because COUNT(*) requires groups that do not physically exist until Step 3!"
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 02: Filtering, Predicates & Three-Valued Logic (3VL)
  // ---------------------------------------------------------------------------
  {
    id: 'sec_filtering',
    pillarId: 'pillar2',
    icon: '🎯',
    title: '02. Filtering, Predicates & Three-Valued Logic (3VL)',
    badge: 'Predicate Engine',
    badgeClass: 'pill-where',
    readTime: '11 min read',
    summary: 'Master SQL Three-Valued Logic (TRUE, FALSE, UNKNOWN), the deadly NOT IN (NULL) trap, and SARGable B-Tree index optimization.',
    svgDiagram: `
      <svg viewBox="0 0 860 280" width="100%" height="100%" style="min-height: 230px; max-height: 330px; display: block;" xmlns="http://www.w3.org/2000/svg">
        <rect width="860" height="280" fill="#080c14" rx="14" stroke="#000000" stroke-width="3"/>
        <!-- Header -->
        <rect x="18" y="16" width="824" height="34" fill="#38bdf8" rx="8" stroke="#000000" stroke-width="2"/>
        <text x="430" y="38" fill="#000000" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="0.5">
          THREE-VALUED LOGIC (3VL) &amp; SARGABLE B-TREE INDEX SEEK PRESERVATION
        </text>

        <!-- Left Block: 3VL Truth Matrix -->
        <rect x="23" y="68" width="395" height="192" fill="#000000" rx="10"/>
        <rect x="20" y="65" width="395" height="192" fill="#fef08a" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="35" y="90" fill="#000000" font-family="monospace" font-size="12" font-weight="900">🧠 3-VALUED LOGIC TRUTH MATRIX</text>

        <!-- Table Header -->
        <rect x="35" y="102" width="365" height="22" fill="#000000" rx="4"/>
        <text x="50" y="117" fill="#ffffff" font-family="monospace" font-size="9.5" font-weight="800">Expression</text>
        <text x="210" y="117" fill="#ffffff" font-family="monospace" font-size="9.5" font-weight="800">Evaluates To</text>
        <text x="310" y="117" fill="#ffffff" font-family="monospace" font-size="9.5" font-weight="800">WHERE Keeps?</text>

        <!-- Row 1 -->
        <text x="50" y="138" fill="#000000" font-family="monospace" font-size="10" font-weight="700">col = NULL</text>
        <text x="210" y="138" fill="#b91c1c" font-family="monospace" font-size="10" font-weight="900">UNKNOWN</text>
        <text x="320" y="138" fill="#b91c1c" font-family="system-ui, sans-serif" font-size="10" font-weight="900">❌ NO (Dropped)</text>

        <!-- Row 2 -->
        <text x="50" y="158" fill="#000000" font-family="monospace" font-size="10" font-weight="700">col IS NULL</text>
        <text x="210" y="158" fill="#15803d" font-family="monospace" font-size="10" font-weight="900">TRUE / FALSE</text>
        <text x="320" y="158" fill="#15803d" font-family="system-ui, sans-serif" font-size="10" font-weight="900">✅ YES (If Null)</text>

        <!-- Row 3 -->
        <text x="50" y="178" fill="#000000" font-family="monospace" font-size="10" font-weight="700">TRUE AND UNKNOWN</text>
        <text x="210" y="178" fill="#b91c1c" font-family="monospace" font-size="10" font-weight="900">UNKNOWN</text>
        <text x="320" y="178" fill="#b91c1c" font-family="system-ui, sans-serif" font-size="10" font-weight="900">❌ NO</text>

        <!-- Row 4 -->
        <text x="50" y="198" fill="#000000" font-family="monospace" font-size="10" font-weight="700">FALSE AND UNKNOWN</text>
        <text x="210" y="198" fill="#000000" font-family="monospace" font-size="10" font-weight="900">FALSE</text>
        <text x="320" y="198" fill="#b91c1c" font-family="system-ui, sans-serif" font-size="10" font-weight="900">❌ NO</text>

        <!-- Warning Pill -->
        <rect x="35" y="212" width="365" height="35" fill="#fee2e2" rx="6" stroke="#b91c1c" stroke-width="1.5"/>
        <text x="45" y="227" fill="#b91c1c" font-family="system-ui, sans-serif" font-size="9" font-weight="800">⚠️ DEADLY TRAP: NOT IN (1, 2, NULL)</text>
        <text x="45" y="240" fill="#000000" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700">Any NULL in NOT IN makes entire predicate UNKNOWN -> 0 rows returned!</text>

        <!-- Right Block: SARGability -->
        <rect x="445" y="68" width="395" height="192" fill="#000000" rx="10"/>
        <rect x="442" y="65" width="395" height="192" fill="#ffffff" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="457" y="90" fill="#000000" font-family="monospace" font-size="12" font-weight="900">⚡ SARGABLE VS NON-SARGABLE PREDICATES</text>

        <!-- Non-SARGable Box -->
        <rect x="457" y="102" width="365" height="66" fill="#fee2e2" rx="6" stroke="#000000" stroke-width="2"/>
        <text x="467" y="118" fill="#b91c1c" font-family="monospace" font-size="9.5" font-weight="900">❌ NON-SARGABLE (FULL TABLE SCAN - 1M ROWS READ):</text>
        <text x="467" y="134" fill="#000000" font-family="monospace" font-size="10" font-weight="700">WHERE UPPER(email) = 'ALICE@CORP.COM'</text>
        <text x="467" y="150" fill="#000000" font-family="monospace" font-size="10" font-weight="700">WHERE YEAR(created_at) = 2026</text>
        <text x="467" y="162" fill="#b91c1c" font-family="system-ui, sans-serif" font-size="8" font-weight="700">Function wraps column -> Engine cannot use B-Tree index!</text>

        <!-- SARGable Box -->
        <rect x="457" y="178" width="365" height="68" fill="#dcfce7" rx="6" stroke="#000000" stroke-width="2"/>
        <text x="467" y="195" fill="#15803d" font-family="monospace" font-size="9.5" font-weight="900">✅ SARGABLE (INDEX RANGE SEEK - 3 I/O HOPS):</text>
        <text x="467" y="211" fill="#000000" font-family="monospace" font-size="10" font-weight="700">WHERE email = 'alice@corp.com'</text>
        <text x="467" y="227" fill="#000000" font-family="monospace" font-size="10" font-weight="700">WHERE created_at >= '2026-01-01' AND created_at &lt; '2027-01-01'</text>
        <text x="467" y="240" fill="#15803d" font-family="system-ui, sans-serif" font-size="8" font-weight="700">Direct column comparison -> High-speed B-Tree index traversal!</text>
      </svg>
    `,
    sections: [
      {
        heading: '1. Three-Valued Logic (3VL) Foundations',
        content: `Standard programming languages operate on two-valued boolean logic (\`TRUE\` or \`FALSE\`). Relational SQL operates on **Three-Valued Logic (3VL)**: \`TRUE\`, \`FALSE\`, and \`UNKNOWN\`.

- \`NULL\` represents missing, unrecorded, or inapplicable information.
- Comparing any value to \`NULL\` using equality (\`col = NULL\` or \`col != NULL\`) evaluates to \`UNKNOWN\`.
- **The Golden WHERE Rule**: A \`WHERE\` clause only admits rows where the predicate evaluates strictly to \`TRUE\`. Both \`FALSE\` and \`UNKNOWN\` are discarded!`
      },
      {
        heading: '2. The Fatal NOT IN (NULL) Catastrophe',
        content: `Consider this query intended to find employees who manage no departments:
\`\`\`sql
SELECT emp_id, name 
FROM Employees 
WHERE emp_id NOT IN (SELECT manager_id FROM Departments);
\`\`\`
If **a single row** in \`Departments.manager_id\` is \`NULL\`, the query returns **0 rows**, even if there are 10,000 unmanaged employees!

**Why?**
\`\`\`sql
x NOT IN (1, 2, NULL)
-- Expands to:
(x != 1) AND (x != 2) AND (x != NULL)
-- (x != NULL) evaluates to UNKNOWN:
TRUE AND TRUE AND UNKNOWN -> UNKNOWN
\`\`\`
Because \`UNKNOWN\` is rejected by \`WHERE\`, no rows are ever returned.
**Production Fix**: Always filter out NULLs in subqueries, or use \`NOT EXISTS\`:
\`\`\`sql
WHERE NOT EXISTS (
  SELECT 1 FROM Departments d WHERE d.manager_id = Employees.emp_id
);
\`\`\``
      },
      {
        heading: '3. SARGability (Search Argument Able)',
        content: `A predicate is **SARGable** if the relational query optimizer can navigate a B-Tree index directly to locate rows in $O(\log N)$ time rather than performing a sequential Full Table Scan ($O(N)$).

- **Index Destroyer: Function Wraps**: \`WHERE SUBSTRING(phone, 1, 3) = '415'\` forces the database to invoke \`SUBSTRING()\` on every single row in the table.
- **SARGable Equivalent**: \`WHERE phone LIKE '415%'\`. Because \`LIKE\` has a leading constant, MySQL can seek directly into the B-Tree range!
- **Index Destroyer: Leading Wildcards**: \`WHERE name LIKE '%son'\` cannot use an index because the root character is unknown.`
      },
      {
        heading: '4. REGEXP & Pattern Matching Syntax',
        content: `MySQL 8.0 uses ICU regular expressions via \`REGEXP\` / \`RLIKE\`:
- \`^\`: Matches start of string (\`REGEXP '^[aeiou]'\` matches vowels at start).
- \`$\`: Matches end of string (\`REGEXP '[aeiou]$'\` matches vowels at end).
- \`[a-z]\`: Character range.
- \`|\`: Alternation / OR operator.
- **Gotcha**: Unlike \`LIKE\`, \`REGEXP\` matches anywhere in the string unless bounded by \`^\` and \`$\`!`
      }
    ],
    interviewGotchas: [
      {
        title: "NULL != NULL Paradox",
        trap: "In SQL, NULL = NULL evaluates to UNKNOWN. Even two NULL values are not considered equal because one unknown value cannot be proven identical to another unknown value!"
      },
      {
        title: "NULL in ORDER BY Position",
        trap: "In MySQL, NULL values are treated as the lowest possible values and appear first in ASC order. In PostgreSQL, you can explicitly dictate placement using ORDER BY col ASC NULLS LAST."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 03: Sorting, Determinism & Slicing
  // ---------------------------------------------------------------------------
  {
    id: 'sec_sorting',
    pillarId: 'pillar3',
    icon: '🔢',
    title: '03. Sorting, Determinism & Slicing Engine',
    badge: 'Sort Physics',
    badgeClass: 'pill-orderby',
    readTime: '10 min read',
    summary: 'Priority queue heaps vs disk-spill filesorts, non-deterministic pagination bugs, and deep OFFSET performance optimization.',
    svgDiagram: `
      <svg viewBox="0 0 860 270" width="100%" height="100%" style="min-height: 220px; max-height: 320px; display: block;" xmlns="http://www.w3.org/2000/svg">
        <rect width="860" height="270" fill="#080c14" rx="14" stroke="#000000" stroke-width="3"/>
        <!-- Header -->
        <rect x="18" y="16" width="824" height="34" fill="#fef08a" rx="8" stroke="#000000" stroke-width="2"/>
        <text x="430" y="38" fill="#000000" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="0.5">
          PHYSICAL SORT ENGINE: IN-MEMORY PRIORITY HEAP VS. DISK-SPILL FILESORT
        </text>

        <!-- Left Branch: Small Limit Heap -->
        <rect x="23" y="68" width="395" height="182" fill="#000000" rx="10"/>
        <rect x="20" y="65" width="395" height="182" fill="#dcfce7" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="35" y="90" fill="#15803d" font-family="monospace" font-size="12" font-weight="900">⚡ PATH A: IN-MEMORY PRIORITY HEAP</text>
        <text x="35" y="108" fill="#000000" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Triggered by ORDER BY ... LIMIT N (N fits in sort_buffer)</text>

        <rect x="35" y="118" width="365" height="50" fill="#ffffff" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="45" y="137" fill="#000000" font-family="monospace" font-size="10" font-weight="800">Priority Queue Size: Exactly N Elements</text>
        <text x="45" y="154" fill="#15803d" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700">Reads rows, maintains top N in RAM, discards excess. Zero disk I/O!</text>

        <rect x="35" y="178" width="365" height="56" fill="#fef08a" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="45" y="196" fill="#000000" font-family="monospace" font-size="10" font-weight="900">Execution Speed: ~1.2ms (Ultra Fast)</text>
        <text x="45" y="214" fill="#000000" font-family="system-ui, sans-serif" font-size="9" font-weight="700">Complexity: O(M * log N) where M = candidate rows, N = limit count.</text>

        <!-- Right Branch: Large Dataset Filesort -->
        <rect x="445" y="68" width="395" height="182" fill="#000000" rx="10"/>
        <rect x="442" y="65" width="395" height="182" fill="#fee2e2" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="457" y="90" fill="#b91c1c" font-family="monospace" font-size="12" font-weight="900">⚠️ PATH B: DISK-SPILL FILESORT MERGE</text>
        <text x="457" y="108" fill="#000000" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Triggered when dataset exceeds sort_buffer_size</text>

        <rect x="457" y="118" width="365" height="50" fill="#ffffff" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="467" y="137" fill="#b91c1c" font-family="monospace" font-size="10" font-weight="800">Chunk Spills: Temp Files on Disk Pages</text>
        <text x="467" y="154" fill="#000000" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700">Sorts chunks in RAM, writes temp files to disk, runs multi-way merge.</text>

        <rect x="457" y="178" width="365" height="56" fill="#ffffff" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="467" y="196" fill="#b91c1c" font-family="monospace" font-size="10" font-weight="900">Execution Speed: ~480ms (Disk Bottleneck)</text>
        <text x="467" y="214" fill="#000000" font-family="system-ui, sans-serif" font-size="9" font-weight="700">Fix: Add composite B-Tree index matching ORDER BY columns!</text>
      </svg>
    `,
    sections: [
      {
        heading: '1. Physical Sorting: Priority Queue vs. Filesort',
        content: `When MySQL InnoDB encounters an \`ORDER BY\` clause without an index, it initiates a **Filesort**:
- **Priority Queue Optimization**: If the query includes \`LIMIT N\` and $N$ rows fit within \`sort_buffer_size\`, MySQL does **not** sort the entire table! It maintains an in-memory binary heap of size $N$, streams rows through it, and immediately returns the top elements.
- **Disk-Spill Multi-Way Merge**: If the candidate rows exceed \`sort_buffer_size\`, the engine partitions the rows, sorts each batch in memory, writes intermediate files to disk, and merges them using a multi-way merge algorithm.`
      },
      {
        heading: '2. The Non-Deterministic Pagination Bug',
        content: `A catastrophic bug in web applications is the **Jumping Row Syndrome** across paginated tables:
\`\`\`sql
-- Page 1:
SELECT id, name, salary FROM Employees ORDER BY salary DESC LIMIT 0, 10;
-- Page 2:
SELECT id, name, salary FROM Employees ORDER BY salary DESC LIMIT 10, 10;
\`\`\`
If multiple employees share the exact same salary (e.g., $95,000), the SQL standard allows the storage engine to return duplicate-salary rows in **any arbitrary order**! An employee can appear on Page 1, and then appear again on Page 2!

**The Production Fix: Deterministic Tie-Breaker**:
\`\`\`sql
ORDER BY salary DESC, id ASC;
\`\`\`
Always append a unique primary key column as the final tie-breaker.`
      },
      {
        heading: '3. Deep OFFSET Degradation & Keyset Pagination',
        content: `Why does \`LIMIT 1000000, 10\` take 8 seconds on an indexed table?
- The database must read and sort **1,000,010 rows**, traverse all of them, and then discard the first 1,000,000!
- **Keyset Pagination (Cursor-Based)**: Replace \`OFFSET\` with a seek on the last observed primary key:
\`\`\`sql
-- Page 2 onwards:
SELECT id, name, salary 
FROM Employees 
WHERE id > 1000000 
ORDER BY id ASC 
LIMIT 10;
\`\`\`
This converts an $O(N)$ full table scan into an instant $O(\log N)$ B-Tree index seek.`
      }
    ],
    interviewGotchas: [
      {
        title: "LENGTH() vs CHAR_LENGTH() Slicing",
        trap: "LENGTH() returns the number of bytes, while CHAR_LENGTH() returns the number of characters. For UTF-8 multi-byte characters (emoji, accents, CJK), LENGTH('café') returns 5 or 6 bytes, while CHAR_LENGTH() returns 4!"
      },
      {
        title: "Sorting on Expressions",
        trap: "ORDER BY RIGHT(name, 3) prevents index usage because the expression must be evaluated on every row. To optimize, create a generated column with an index."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 04: Conditional Logic & CASE WHEN Decision Trees
  // ---------------------------------------------------------------------------
  {
    id: 'sec_casewhen',
    pillarId: 'pillar4',
    icon: '⚖️',
    title: '04. Conditional Logic, CASE WHEN & Matrix Pivoting',
    badge: 'Branching Engine',
    badgeClass: 'pill-casewhen',
    readTime: '11 min read',
    summary: 'Simple vs Searched CASE, short-circuit execution order, implicit type coercion, and 0-cost pivot reporting.',
    svgDiagram: `
      <svg viewBox="0 0 860 270" width="100%" height="100%" style="min-height: 220px; max-height: 320px; display: block;" xmlns="http://www.w3.org/2000/svg">
        <rect width="860" height="270" fill="#080c14" rx="14" stroke="#000000" stroke-width="3"/>
        <!-- Header -->
        <rect x="18" y="16" width="824" height="34" fill="#f472b6" rx="8" stroke="#000000" stroke-width="2"/>
        <text x="430" y="38" fill="#000000" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="0.5">
          CASE WHEN SHORT-CIRCUITING &amp; PIVOT MATRIX CONDITIONAL AGGREGATION
        </text>

        <!-- Left Block: AST Short-Circuit Flow -->
        <rect x="23" y="68" width="395" height="182" fill="#000000" rx="10"/>
        <rect x="20" y="65" width="395" height="182" fill="#ffffff" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="35" y="90" fill="#000000" font-family="monospace" font-size="12" font-weight="900">🌳 SHORT-CIRCUITING EVALUATION FLOW</text>

        <rect x="35" y="103" width="220" height="30" fill="#fef08a" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="45" y="122" fill="#000000" font-family="monospace" font-size="10" font-weight="800">1. WHEN marks >= 90</text>
        <path d="M 255 118 L 290 118" stroke="#000000" stroke-width="2"/>
        <text x="300" y="122" fill="#15803d" font-family="monospace" font-size="10" font-weight="900">TRUE -> 'A' (EXIT)</text>

        <rect x="35" y="143" width="220" height="30" fill="#38bdf8" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="45" y="162" fill="#000000" font-family="monospace" font-size="10" font-weight="800">2. WHEN marks >= 75</text>
        <path d="M 255 158 L 290 158" stroke="#000000" stroke-width="2"/>
        <text x="300" y="162" fill="#15803d" font-family="monospace" font-size="10" font-weight="900">TRUE -> 'B' (EXIT)</text>

        <rect x="35" y="183" width="220" height="30" fill="#f472b6" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="45" y="202" fill="#000000" font-family="monospace" font-size="10" font-weight="800">3. ELSE</text>
        <path d="M 255 198 L 290 198" stroke="#000000" stroke-width="2"/>
        <text x="300" y="202" fill="#b91c1c" font-family="monospace" font-size="10" font-weight="900">FALLTHROUGH -> 'C'</text>

        <text x="35" y="235" fill="#000000" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800">First TRUE condition returns immediately. Later conditions never run!</text>

        <!-- Right Block: Matrix Pivot Aggregation -->
        <rect x="445" y="68" width="395" height="182" fill="#000000" rx="10"/>
        <rect x="442" y="65" width="395" height="182" fill="#fef9c3" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="457" y="90" fill="#000000" font-family="monospace" font-size="12" font-weight="900">📊 0-COST MATRIX PIVOT (ROW TO COLUMN)</text>

        <rect x="457" y="103" width="365" height="72" fill="#000000" rx="6"/>
        <text x="467" y="122" fill="#38bdf8" font-family="monospace" font-size="9.5" font-weight="700">SELECT dept_id,</text>
        <text x="467" y="138" fill="#4ade80" font-family="monospace" font-size="9.5" font-weight="700">  SUM(CASE WHEN role='Dev' THEN 1 ELSE 0 END) AS devs,</text>
        <text x="467" y="154" fill="#fbbf24" font-family="monospace" font-size="9.5" font-weight="700">  SUM(CASE WHEN role='QA'  THEN 1 ELSE 0 END) AS qas</text>
        <text x="467" y="168" fill="#ffffff" font-family="monospace" font-size="9.5" font-weight="700">FROM Employees GROUP BY dept_id;</text>

        <rect x="457" y="185" width="365" height="48" fill="#dcfce7" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="467" y="202" fill="#15803d" font-family="system-ui, sans-serif" font-size="9.5" font-weight="900">💡 1 SINGLE TABLE SCAN REPLACES 3 JOINs!</text>
        <text x="467" y="218" fill="#000000" font-family="system-ui, sans-serif" font-size="9" font-weight="700">Generates cross-tabulation reports without expensive multi-table joins.</text>
      </svg>
    `,
    sections: [
      {
        heading: '1. Simple CASE vs. Searched CASE',
        content: `SQL provides two distinct syntactic forms of \`CASE\`:
- **Simple CASE**: Evaluates an expression against exact literal matches:
\`\`\`sql
CASE status_code
  WHEN 200 THEN 'OK'
  WHEN 404 THEN 'Not Found'
  ELSE 'Unknown'
END
\`\`\`
- **Searched CASE**: Evaluates independent boolean predicates for each branch:
\`\`\`sql
CASE 
  WHEN salary >= 100000 THEN 'Executive'
  WHEN salary >= 60000  THEN 'Senior'
  ELSE 'Associate'
END
\`\`\`
**Interview Rule**: Searched \`CASE\` is vastly more powerful because it supports inequality operators (\`>\`, \`<\`), \`BETWEEN\`, \`AND\`, \`OR\`, and \`IS NULL\`. Simple \`CASE\` cannot evaluate NULLs because \`status_code = NULL\` evaluates to \`UNKNOWN\`!`
      },
      {
        heading: '2. The Triangle Inequality Algorithm',
        content: `A core technical benchmark problem (HackerRank & LeetCode) is classifying geometric triangles from lengths $A, B, C$:
\`\`\`sql
SELECT 
  CASE
    WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'
    WHEN A = B AND B = C THEN 'Equilateral'
    WHEN A = B OR B = C OR A = C THEN 'Isosceles'
    ELSE 'Scalene'
  END AS triangle_type
FROM TRIANGLES;
\`\`\`
**Critical Execution Order Rule**:
You **MUST** test for \`Not A Triangle\` **FIRST**! If a triangle has sides $A=2, B=2, C=10$, evaluating \`A = B\` first would incorrectly classify it as \`Isosceles\` before catching that it physically cannot form a closed triangle!`
      },
      {
        heading: '3. Short-Circuit Evaluation Guarantee',
        content: `The SQL standard specifies that \`CASE\` expressions short-circuit: the first \`WHEN\` condition that evaluates to \`TRUE\` returns its value, and the engine **does not evaluate remaining branches**.

This makes \`CASE\` safe against division-by-zero errors:
\`\`\`sql
SELECT 
  CASE 
    WHEN total_orders = 0 THEN 0 
    ELSE total_revenue / total_orders 
  END AS avg_order_val
FROM Merchants;
\`\`\`
If \`total_orders = 0\`, the \`ELSE\` division is never executed!`
      },
      {
        heading: '4. Type Coercion & Default NULL Fallthrough',
        content: `All \`THEN\` and \`ELSE\` return expressions in a \`CASE\` statement must resolve to a single, compatible data type:
- If you mix \`THEN 1\` (INTEGER) with \`THEN 'N/A'\` (VARCHAR), MySQL will coerce the return type to VARCHAR.
- **Omitted ELSE**: If no \`ELSE\` is specified and no \`WHEN\` condition matches, SQL implicitly returns \`NULL\` (\`ELSE NULL\`). Always specify explicit \`ELSE\` clauses in enterprise code to prevent unexpected NULL propagation!`
      }
    ],
    interviewGotchas: [
      {
        title: "The NULL Fallthrough Trap",
        trap: "Writing CASE WHEN status = 'ACTIVE' THEN 1 END without an ELSE clause results in NULL for all inactive rows, which can silently corrupt mathematical operations like SUM() or AVG()."
      },
      {
        title: "Evaluation Priority in Searched CASE",
        trap: "In multi-condition checks, placing broader conditions before specific ones causes early exit on the broader check, shadowing your specific edge-case handlers."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 05: Basic & Statistical Aggregations (GROUP BY)
  // ---------------------------------------------------------------------------
  {
    id: 'sec_aggregations',
    pillarId: 'pillar5',
    icon: '📊',
    title: '05. Basic & Statistical Aggregations (GROUP BY & HAVING)',
    badge: 'Aggregation Engine',
    badgeClass: 'pill-groupby',
    readTime: '13 min read',
    summary: 'COUNT(*) vs COUNT(col), NULL aggregation physics, ONLY_FULL_GROUP_BY standards, and two-phase hash bucketing.',
    svgDiagram: `
      <svg viewBox="0 0 860 270" width="100%" height="100%" style="min-height: 220px; max-height: 320px; display: block;" xmlns="http://www.w3.org/2000/svg">
        <rect width="860" height="270" fill="#080c14" rx="14" stroke="#000000" stroke-width="3"/>
        <!-- Header -->
        <rect x="18" y="16" width="824" height="34" fill="#fbbf24" rx="8" stroke="#000000" stroke-width="2"/>
        <text x="430" y="38" fill="#000000" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="0.5">
          TWO-PHASE HASH BUCKETING &amp; NULL AGGREGATION ACCUMULATOR MECHANICS
        </text>

        <!-- Left Block: Stream to Hash Buckets -->
        <rect x="23" y="68" width="395" height="182" fill="#000000" rx="10"/>
        <rect x="20" y="65" width="395" height="182" fill="#ffffff" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="35" y="90" fill="#000000" font-family="monospace" font-size="12" font-weight="900">📥 STREAMING INTO RAM HASH BUCKETS</text>

        <!-- Bucket 1: Dept 10 -->
        <rect x="35" y="105" width="175" height="60" fill="#fef08a" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="45" y="122" fill="#000000" font-family="monospace" font-size="10" font-weight="900">BUCKET: Dept 10</text>
        <text x="45" y="138" fill="#000000" font-family="monospace" font-size="9" font-weight="700">Rows: [Sal: 50k, 70k, NULL]</text>
        <text x="45" y="152" fill="#15803d" font-family="system-ui, sans-serif" font-size="9" font-weight="800">SUM=120k | COUNT=2 | AVG=60k</text>

        <!-- Bucket 2: Dept 20 -->
        <rect x="220" y="105" width="180" height="60" fill="#38bdf8" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="230" y="122" fill="#000000" font-family="monospace" font-size="10" font-weight="900">BUCKET: Dept 20</text>
        <text x="230" y="138" fill="#000000" font-family="monospace" font-size="9" font-weight="700">Rows: [Sal: 80k, 90k]</text>
        <text x="230" y="152" fill="#0284c7" font-family="system-ui, sans-serif" font-size="9" font-weight="800">SUM=170k | COUNT=2 | AVG=85k</text>

        <!-- Rule Pill -->
        <rect x="35" y="176" width="365" height="58" fill="#fef3c7" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="45" y="195" fill="#b45309" font-family="monospace" font-size="10" font-weight="900">⚡ NULL PHYSICS IN AGGREGATES:</text>
        <text x="45" y="211" fill="#000000" font-family="system-ui, sans-serif" font-size="9" font-weight="700">AVG(salary) divides by 2 (non-nulls), NOT 3! NULLs are skipped.</text>
        <text x="45" y="224" fill="#000000" font-family="system-ui, sans-serif" font-size="9" font-weight="700">COUNT(*) = 3, but COUNT(salary) = 2!</text>

        <!-- Right Block: ONLY_FULL_GROUP_BY Rule -->
        <rect x="445" y="68" width="395" height="182" fill="#000000" rx="10"/>
        <rect x="442" y="65" width="395" height="182" fill="#fef08a" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="457" y="90" fill="#000000" font-family="monospace" font-size="12" font-weight="900">🛡️ ONLY_FULL_GROUP_BY STANDARD RULE</text>

        <rect x="457" y="105" width="365" height="60" fill="#fee2e2" rx="6" stroke="#000000" stroke-width="2"/>
        <text x="467" y="122" fill="#b91c1c" font-family="monospace" font-size="9.5" font-weight="900">❌ ILLEGAL (SYNTAX ERROR IN SQL:2016):</text>
        <text x="467" y="138" fill="#000000" font-family="monospace" font-size="10" font-weight="700">SELECT dept_id, name, AVG(salary)</text>
        <text x="467" y="152" fill="#000000" font-family="monospace" font-size="10" font-weight="700">FROM Employees GROUP BY dept_id;</text>
        <text x="467" y="161" fill="#b91c1c" font-family="system-ui, sans-serif" font-size="7.5" font-weight="800">'name' is non-deterministic (which employee name should the engine display?)</text>

        <rect x="457" y="176" width="365" height="58" fill="#dcfce7" rx="6" stroke="#000000" stroke-width="2"/>
        <text x="467" y="195" fill="#15803d" font-family="monospace" font-size="9.5" font-weight="900">✅ COMPLIANT SQL STANDARD:</text>
        <text x="467" y="211" fill="#000000" font-family="monospace" font-size="10" font-weight="700">SELECT dept_id, AVG(salary), COUNT(*)</text>
        <text x="467" y="225" fill="#000000" font-family="monospace" font-size="10" font-weight="700">FROM Employees GROUP BY dept_id;</text>
      </svg>
    `,
    sections: [
      {
        heading: '1. The 5 Core Aggregation Accumulators',
        content: `Aggregate functions compute a single summary value across a set of rows:
- \`COUNT(*)\`: Counts total physical row slots in the bucket, **including NULLs and duplicates**.
- \`COUNT(column)\`: Counts non-NULL entries in that column.
- \`COUNT(DISTINCT column)\`: Computes unique, non-NULL entries using a temporary deduplication set.
- \`SUM(column)\`: Computes total sum of non-NULL values. If all rows are NULL, returns \`NULL\`.
- \`AVG(column)\`: Computes arithmetic mean: \`SUM(col) / COUNT(col)\`. **Critical**: The divisor is \`COUNT(col)\`, never \`COUNT(*)\`!
- \`MIN(column)\` & \`MAX(column)\`: Identifies extreme values (supports numbers, dates, and alphabetic strings).`
      },
      {
        heading: '2. ONLY_FULL_GROUP_BY & The SQL Standard',
        content: `In MySQL 5.7+ and all modern engines (PostgreSQL, SQL Server, Snowflake), \`ONLY_FULL_GROUP_BY\` is enabled by default:
- **The Rule**: Every non-aggregated column in the \`SELECT\` list **must** be explicitly declared in the \`GROUP BY\` clause.
- If a department has 50 employees, running \`SELECT dept_id, employee_name, AVG(salary) FROM Employees GROUP BY dept_id\` makes no logical sense: which of the 50 names should be displayed?
- **Workarounds**: Aggregate with \`GROUP_CONCAT(employee_name)\`, use \`MAX(employee_name)\`, or include \`employee_name\` in \`GROUP BY\`.`
      },
      {
        heading: '3. Statistical Metrics: Variance & Standard Deviation',
        content: `In quantitative analysis and risk engineering:
- \`VARIANCE(col)\` / \`VAR_POP(col)\`: Population variance $\sigma^2 = \frac{\sum (x - \mu)^2}{N}$.
- \`VAR_SAMP(col)\`: Sample variance $s^2 = \frac{\sum (x - \bar{x})^2}{N - 1}$ (Bessel's correction).
- \`STDDEV(col)\` / \`STDDEV_POP(col)\`: Population standard deviation $\sigma = \sqrt{\text{Variance}}$.
- **FinTech Gotcha**: If a group has only 1 row, \`VAR_SAMP()\` returns \`NULL\` due to division by zero ($N-1 = 0$)!`
      },
      {
        heading: '4. Physical Memory Architecture for Aggregations',
        content: `How engines execute \`GROUP BY\`:
1. **Hash Aggregation**: The engine hashes the grouping keys into an in-memory hash table in RAM (\`tmp_table_size\`). As rows stream through, hash collisions increment accumulator registers in place. Extremely fast ($O(N)$).
2. **Streaming Aggregation**: If the grouping columns have a pre-existing B-Tree index, the engine doesn't need a hash table! It reads rows in sorted order, emitting group summaries as soon as the key changes ($O(1)$ memory).`
      }
    ],
    interviewGotchas: [
      {
        title: "COUNT(1) vs COUNT(*)",
        trap: "In modern database optimizers, COUNT(1) and COUNT(*) parse to identical execution plans. However, COUNT(col) is physically different because it tests for NULL on every single row!"
      },
      {
        title: "Empty Table Aggregation Divergence",
        trap: "On an empty table: COUNT(*) returns 0, but SUM(val), AVG(val), MIN(val), and MAX(val) all return NULL!"
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 06: Spatial Coordinates, Math Functions & Medians
  // ---------------------------------------------------------------------------
  {
    id: 'sec_math',
    pillarId: 'pillar6',
    icon: '📐',
    title: '06. Spatial Coordinates, Math Functions & Medians',
    badge: 'Spatial Engine',
    badgeClass: 'pill-select',
    readTime: '11 min read',
    summary: 'Manhattan vs Euclidean distance vectors, ROUND vs TRUNCATE, and calculating continuous medians without native window functions.',
    svgDiagram: `
      <svg viewBox="0 0 860 270" width="100%" height="100%" style="min-height: 220px; max-height: 320px; display: block;" xmlns="http://www.w3.org/2000/svg">
        <rect width="860" height="270" fill="#080c14" rx="14" stroke="#000000" stroke-width="3"/>
        <!-- Header -->
        <rect x="18" y="16" width="824" height="34" fill="#38bdf8" rx="8" stroke="#000000" stroke-width="2"/>
        <text x="430" y="38" fill="#000000" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="0.5">
          SPATIAL METRICS (MANHATTAN VS. EUCLIDEAN) &amp; CONTINUOUS MEDIAN INTERPOLATION
        </text>

        <!-- Left Block: Distance Vectors -->
        <rect x="23" y="68" width="395" height="182" fill="#000000" rx="10"/>
        <rect x="20" y="65" width="395" height="182" fill="#e0f2fe" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="35" y="90" fill="#0284c7" font-family="monospace" font-size="12" font-weight="900">📐 SPATIAL DISTANCE FORMULAS</text>

        <!-- Manhattan Box -->
        <rect x="35" y="103" width="365" height="58" fill="#ffffff" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="45" y="122" fill="#b91c1c" font-family="monospace" font-size="10" font-weight="900">1. MANHATTAN DISTANCE (L1 NORM - GRID):</text>
        <text x="45" y="139" fill="#000000" font-family="monospace" font-size="10.5" font-weight="800">|X1 - X2| + |Y1 - Y2|</text>
        <text x="45" y="152" fill="#b91c1c" font-family="monospace" font-size="9" font-weight="700">ROUND(ABS(MIN(LAT) - MAX(LAT)) + ABS(MIN(LONG) - MAX(LONG)), 4)</text>

        <!-- Euclidean Box -->
        <rect x="35" y="171" width="365" height="64" fill="#ffffff" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="45" y="190" fill="#15803d" font-family="monospace" font-size="10" font-weight="900">2. EUCLIDEAN DISTANCE (L2 NORM - HYPOTENUSE):</text>
        <text x="45" y="207" fill="#000000" font-family="monospace" font-size="10.5" font-weight="800">SQRT( (X1 - X2)^2 + (Y1 - Y2)^2 )</text>
        <text x="45" y="222" fill="#15803d" font-family="monospace" font-size="9" font-weight="700">ROUND(SQRT(POW(MAX(LAT)-MIN(LAT),2) + POW(MAX(LONG)-MIN(LONG),2)), 4)</text>

        <!-- Right Block: Median Calculation -->
        <rect x="445" y="68" width="395" height="182" fill="#000000" rx="10"/>
        <rect x="442" y="65" width="395" height="182" fill="#fef08a" rx="10" stroke="#000000" stroke-width="2.5"/>
        <text x="457" y="90" fill="#000000" font-family="monospace" font-size="12" font-weight="900">🎯 CONTINUOUS MEDIAN ALGORITHM</text>

        <rect x="457" y="103" width="365" height="74" fill="#000000" rx="6"/>
        <text x="467" y="122" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="700">WITH Ranked AS (</text>
        <text x="467" y="136" fill="#f472b6" font-family="monospace" font-size="9" font-weight="700">  SELECT val, ROW_NUMBER() OVER (ORDER BY val) AS r,</text>
        <text x="467" y="150" fill="#f472b6" font-family="monospace" font-size="9" font-weight="700">         COUNT(*) OVER () AS total_n FROM Table</text>
        <text x="467" y="164" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="700">)</text>
        <text x="467" y="174" fill="#4ade80" font-family="monospace" font-size="9" font-weight="700">SELECT ROUND(AVG(val), 4) FROM Ranked</text>
        <text x="467" y="185" fill="#4ade80" font-family="monospace" font-size="9" font-weight="700">WHERE r IN (FLOOR((total_n+1)/2), CEIL((total_n+1)/2));</text>

        <rect x="457" y="196" width="365" height="38" fill="#dcfce7" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="467" y="211" fill="#15803d" font-family="system-ui, sans-serif" font-size="9" font-weight="900">✅ WORKS FOR BOTH EVEN AND ODD DATASETS!</text>
        <text x="467" y="225" fill="#000000" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700">Even N takes average of middle two; Odd N picks exact center.</text>
      </svg>
    `,
    sections: [
      {
        heading: '1. Spatial Distance Metrics (HackerRank Station Challenges)',
        content: `Spatial coordinate querying is standard in logistics, ridesharing (Uber, Lyft), and supply chains:
- **Manhattan Distance ($L_1$ Norm)**: Measures taxicab distance along orthogonal grid axes:
  $$\\text{Distance} = |x_1 - x_2| + |y_1 - y_2|$$
  \`\`\`sql
  SELECT ROUND(ABS(MIN(LAT_N) - MAX(LAT_N)) + ABS(MIN(LONG_W) - MAX(LONG_W)), 4)
  FROM STATION;
  \`\`\`
- **Euclidean Distance ($L_2$ Norm)**: Measures direct straight-line distance across the hypotenuse:
  $$\\text{Distance} = \\sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}$$
  \`\`\`sql
  SELECT ROUND(SQRT(POW(MAX(LAT_N) - MIN(LAT_N), 2) + POW(MAX(LONG_W) - MIN(LONG_W), 2)), 4)
  FROM STATION;
  \`\`\``
      },
      {
        heading: '2. ROUND vs. TRUNCATE vs. FLOOR / CEIL',
        content: `Mathematical precision requires strict keyword discipline:
- \`ROUND(x, d)\`: Rounds half-up toward nearest integer at decimal place $d$. \`ROUND(3.14159, 4) = 3.1416\`.
- \`TRUNCATE(x, d)\`: Cuts off digits strictly after $d$ decimal places **without rounding**. \`TRUNCATE(3.14159, 4) = 3.1415\`.
- **Negative Decimals**: Rounds to powers of 10!
  - \`ROUND(12345.67, -2) = 12300\`
  - \`TRUNCATE(12345.67, -3) = 12000\`
- \`FLOOR(x)\`: Greatest integer $\le x$. \`FLOOR(-3.2) = -4\`.
- \`CEIL(x)\` / \`CEILING(x)\`: Smallest integer $\ge x$. \`CEIL(-3.2) = -3\`.`
      },
      {
        heading: '3. Calculating the Median in MySQL',
        content: `Unlike Oracle or Snowflake, standard MySQL 8.0 lacks a native \`MEDIAN()\` aggregate function.
To compute the true median:
1. Rank records in ascending order with \`ROW_NUMBER() OVER (ORDER BY val)\`.
2. Compute the total count $N$.
3. If $N$ is odd, select the single middle record at $(N+1)/2$.
4. If $N$ is even, select the two middle records at $N/2$ and $(N/2)+1$, and average them using \`AVG(val)\`.
\`\`\`sql
WITH RankedData AS (
  SELECT LAT_N, 
         ROW_NUMBER() OVER (ORDER BY LAT_N) AS row_num,
         COUNT(*) OVER () AS total_count
  FROM STATION
)
SELECT ROUND(AVG(LAT_N), 4) AS median_latitude
FROM RankedData
WHERE row_num IN (FLOOR((total_count + 1) / 2), CEIL((total_count + 1) / 2));
\`\`\``
      }
    ],
    interviewGotchas: [
      {
        title: "Floating-Point Precision Trap",
        trap: "Using DOUBLE or FLOAT for currency or exact coordinates causes floating-point roundoff errors (e.g. 0.1 + 0.2 = 0.30000000000000004). Always use DECIMAL(18, 4) or NUMERIC for financial and geospatial coordinates!"
      },
      {
        title: "Negative Decimal ROUND in Payroll",
        trap: "Using ROUND(salary, -3) rounds salaries to the nearest thousand (e.g. 84,600 becomes 85,000)."
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 07: Relational Multi-Table Joins (FA / DA / BA)
  // ---------------------------------------------------------------------------
  {
    id: 'sec_joins',
    pillarId: 'pillar7',
    icon: '🔗',
    title: '07. Relational Multi-Table Joins & Physical Algorithms',
    badge: 'Relational Core',
    badgeClass: 'pill-from',
    readTime: '15 min read',
    summary: 'The 8 ANSI relational joins, Cartesian product explosions, Anti-Joins, and physical execution algorithms (Nested Loop vs Hash Join).',
    svgDiagram: `
      <svg viewBox="0 0 860 300" width="100%" height="100%" style="min-height: 250px; max-height: 350px; display: block;" xmlns="http://www.w3.org/2000/svg">
        <rect width="860" height="300" fill="#080c14" rx="14" stroke="#000000" stroke-width="3"/>
        <!-- Header -->
        <rect x="18" y="16" width="824" height="34" fill="#22c55e" rx="8" stroke="#000000" stroke-width="2"/>
        <text x="430" y="38" fill="#000000" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="0.5">
          RELATIONAL SET THEORY &amp; PHYSICAL JOIN EXECUTION ALGORITHMS
        </text>

        <!-- 4 Join Visual Set Cards -->
        <!-- Card 1: INNER JOIN -->
        <rect x="23" y="68" width="195" height="130" fill="#000000" rx="8"/>
        <rect x="20" y="65" width="195" height="130" fill="#ffffff" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="117" y="86" fill="#000000" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">1. INNER JOIN</text>
        <circle cx="85" cy="120" r="32" fill="rgba(56, 189, 248, 0.2)" stroke="#000000" stroke-width="1.5"/>
        <circle cx="150" cy="120" r="32" fill="rgba(244, 114, 182, 0.2)" stroke="#000000" stroke-width="1.5"/>
        <path d="M 117 95 A 32 32 0 0 1 117 145 A 32 32 0 0 1 117 95" fill="#22c55e" stroke="#000000" stroke-width="1.5"/>
        <text x="117" y="180" fill="#15803d" font-family="system-ui, sans-serif" font-size="9" font-weight="800" text-anchor="middle">Intersection (Matched Keys)</text>

        <!-- Card 2: LEFT JOIN -->
        <rect x="230" y="68" width="195" height="130" fill="#000000" rx="8"/>
        <rect x="227" y="65" width="195" height="130" fill="#ffffff" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="324" y="86" fill="#000000" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">2. LEFT JOIN</text>
        <circle cx="292" cy="120" r="32" fill="#38bdf8" stroke="#000000" stroke-width="1.5"/>
        <circle cx="357" cy="120" r="32" fill="rgba(244, 114, 182, 0.15)" stroke="#000000" stroke-width="1.5"/>
        <text x="324" y="180" fill="#0284c7" font-family="system-ui, sans-serif" font-size="9" font-weight="800" text-anchor="middle">All Left + Matched Right</text>

        <!-- Card 3: LEFT ANTI-JOIN -->
        <rect x="438" y="68" width="195" height="130" fill="#000000" rx="8"/>
        <rect x="435" y="65" width="195" height="130" fill="#ffffff" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="532" y="86" fill="#000000" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">3. LEFT ANTI-JOIN</text>
        <circle cx="500" cy="120" r="32" fill="#f43f5e" stroke="#000000" stroke-width="1.5"/>
        <circle cx="565" cy="120" r="32" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
        <text x="532" y="180" fill="#b91c1c" font-family="system-ui, sans-serif" font-size="9" font-weight="800" text-anchor="middle">WHERE right.id IS NULL</text>

        <!-- Card 4: FULL OUTER JOIN -->
        <rect x="645" y="68" width="195" height="130" fill="#000000" rx="8"/>
        <rect x="642" y="65" width="195" height="130" fill="#ffffff" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="739" y="86" fill="#000000" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">4. FULL OUTER JOIN</text>
        <circle cx="707" cy="120" r="32" fill="#c084fc" stroke="#000000" stroke-width="1.5"/>
        <circle cx="772" cy="120" r="32" fill="#c084fc" stroke="#000000" stroke-width="1.5"/>
        <text x="739" y="180" fill="#6b21a8" font-family="system-ui, sans-serif" font-size="9" font-weight="800" text-anchor="middle">Complete Union (All Rows)</text>

        <!-- Bottom Engineering Algorithms Strip -->
        <rect x="23" y="208" width="820" height="74" fill="#000000" rx="8"/>
        <rect x="20" y="205" width="820" height="74" fill="#fef08a" rx="8" stroke="#000000" stroke-width="2.5"/>
        <text x="35" y="226" fill="#000000" font-family="monospace" font-size="11" font-weight="900">⚙️ PHYSICAL JOIN ALGORITHMS IN THE STORAGE ENGINE:</text>
        <text x="35" y="245" fill="#000000" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800">
          • Nested Loop Join (NLJ): For every row in Outer table, engine performs B-Tree Index Seek on Inner table (O(N log M) - Fast).
        </text>
        <text x="35" y="262" fill="#000000" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800">
          • Hash Join (MySQL 8.0+): Builds in-memory hash table of smaller table, then probes it with stream from larger table (O(N+M)).
        </text>
      </svg>
    `,
    sections: [
      {
        heading: '1. The 8 ANSI Relational Joins',
        content: `Relational database engines link disparate entities through primary key (PK) and foreign key (FK) relationships:
1. **INNER JOIN**: Retains tuples where the join predicate evaluates to TRUE on both sides. Drops orphan rows.
2. **LEFT (OUTER) JOIN**: Preserves 100% of rows from the left table. If no match exists on the right, right-side columns populate as \`NULL\`.
3. **RIGHT (OUTER) JOIN**: Mirror of Left Join; preserves all rows from the right table.
4. **FULL OUTER JOIN**: Preserves all rows from both tables, populating NULLs wherever alignment fails. *(Emulated in MySQL via LEFT JOIN UNION RIGHT JOIN)*.
5. **LEFT ANTI-JOIN**: Identifies records in the left table with **no corresponding record** in the right table (\`WHERE right.id IS NULL\`).
6. **CROSS JOIN**: Produces the Cartesian Product ($N \\times M$ rows).
7. **SELF JOIN**: A table joined to itself using unique aliases (used for hierarchical trees like employees and managers).
8. **NON-EQUI JOIN**: Joins on inequality or range predicates (e.g. \`ON emp.salary BETWEEN grade.low AND grade.high\`).`
      },
      {
        heading: '2. The Cartesian Explosion Catastrophe',
        content: `If you omit the \`ON\` clause or specify a non-unique foreign key relationship:
- Joining Table A (10,000 rows) with Table B (10,000 rows) produces **100,000,000 output tuples**!
- This causes memory exhaustion, disk buffer overflows, and crashes production reporting servers.
- **Rule**: Always verify cardinality (1-to-1, 1-to-many, or many-to-many) before executing joins on massive datasets.`
      },
      {
        heading: '3. Physical Join Algorithms: NLJ vs Hash Join',
        content: `How does the relational optimizer physically join 2 tables?
- **Index Nested Loop Join**: The outer table is scanned. For each outer row, the database performs a high-speed B-Tree index seek on the inner table. Ideal for indexed OLTP lookups.
- **Block Nested Loop (BNL)**: If the inner table lacks an index, the engine buffers batches of outer rows in \`join_buffer_size\` in RAM to reduce repeated table scans.
- **Hash Join (Introduced in MySQL 8.0.18)**: Replaces BNL. The engine builds an in-memory hash table on the join key of the smaller table, then streams the larger table and probes the hash table in $O(1)$ time per row.`
      },
      {
        heading: '4. ON vs. WHERE Predicate Placement in Outer Joins',
        content: `A classic senior interview question: *"What is the physical difference between filtering in ON vs WHERE in a LEFT JOIN?"*
\`\`\`sql
-- Query A: Filter in ON
SELECT c.name, o.order_id 
FROM Customers c 
LEFT JOIN Orders o ON c.id = o.customer_id AND o.status = 'COMPLETED';

-- Query B: Filter in WHERE
SELECT c.name, o.order_id 
FROM Customers c 
LEFT JOIN Orders o ON c.id = o.customer_id 
WHERE o.status = 'COMPLETED';
\`\`\`
- **Query A**: Returns **ALL** customers! Customers without completed orders still appear with \`order_id = NULL\`.
- **Query B**: Accidentally converts the LEFT JOIN into an **INNER JOIN**! Because \`WHERE o.status = 'COMPLETED'\` discards NULL rows, any customer without orders is eliminated!`
      }
    ],
    interviewGotchas: [
      {
        title: "The Accidental Inner Join Trap",
        trap: "Adding WHERE right_table.col = 'val' on a LEFT JOIN immediately converts it to an INNER JOIN because NULLs generated by the join fail the WHERE predicate!"
      },
      {
        title: "Cartesian Multiplication in Multi-Join",
        trap: "Joining a customer table simultaneously to multiple one-to-many child tables (e.g. Orders and SupportTickets) creates duplicate permutations of both child rows, multiplying aggregate sums!"
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 08: Database Theory, Storage Engines & Architecture
  // ---------------------------------------------------------------------------
  {
    id: 'sec_theory_architecture',
    pillarId: 'pillar0',
    icon: '🏛️',
    title: '08. Database Architecture, Storage Engines & ACID Internals',
    badge: 'Interview Foundations',
    badgeClass: 'pill-from',
    readTime: '14 min read',
    summary: 'B+ Tree 16KB disk page anatomy, clustered vs secondary indexes, OLTP vs OLAP columnar storage, and ACID transaction isolation.',
    svgDiagram: `
      <svg viewBox="0 0 860 280" width="100%" height="100%" style="min-height: 230px; max-height: 330px; display: block;" xmlns="http://www.w3.org/2000/svg">
        <rect width="860" height="280" fill="#080c14" rx="14" stroke="#000000" stroke-width="3"/>
        <!-- Header -->
        <rect x="18" y="16" width="824" height="34" fill="#fbbf24" rx="8" stroke="#000000" stroke-width="2"/>
        <text x="430" y="38" fill="#000000" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="0.5">
          PHYSICAL B+ TREE INDEX PAGE HIERARCHY (16KB INNODB DISK PAGES)
        </text>

        <!-- Root Node -->
        <rect x="355" y="68" width="150" height="38" fill="#000000" rx="6"/>
        <rect x="352" y="65" width="150" height="38" fill="#38bdf8" rx="6" stroke="#000000" stroke-width="2.5"/>
        <text x="427" y="88" fill="#000000" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">ROOT PAGE [Key: 50]</text>

        <!-- Branch Lines -->
        <path d="M 370 103 L 235 125" stroke="#000000" stroke-width="2.5"/>
        <path d="M 485 103 L 625 125" stroke="#000000" stroke-width="2.5"/>

        <!-- Intermediate Branch Nodes -->
        <rect x="153" y="128" width="165" height="36" fill="#000000" rx="6"/>
        <rect x="150" y="125" width="165" height="36" fill="#fef08a" rx="6" stroke="#000000" stroke-width="2.5"/>
        <text x="232" y="147" fill="#000000" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">BRANCH [Keys: 10, 30]</text>

        <rect x="543" y="128" width="165" height="36" fill="#000000" rx="6"/>
        <rect x="540" y="125" width="165" height="36" fill="#fef08a" rx="6" stroke="#000000" stroke-width="2.5"/>
        <text x="622" y="147" fill="#000000" font-family="monospace" font-size="10.5" font-weight="900" text-anchor="middle">BRANCH [Keys: 70, 90]</text>

        <!-- Leaf Node Lines -->
        <path d="M 180 161 L 110 185" stroke="#000000" stroke-width="2"/>
        <path d="M 285 161 L 320 185" stroke="#000000" stroke-width="2"/>
        <path d="M 570 161 L 535 185" stroke="#000000" stroke-width="2"/>
        <path d="M 675 161 L 745 185" stroke="#000000" stroke-width="2"/>

        <!-- Leaf Pages: Doubly Linked on Disk -->
        <rect x="23" y="188" width="180" height="42" fill="#000000" rx="6"/>
        <rect x="20" y="185" width="180" height="42" fill="#dcfce7" rx="6" stroke="#000000" stroke-width="2.5"/>
        <text x="110" y="204" fill="#15803d" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">LEAF PAGE 1 (16KB)</text>
        <text x="110" y="218" fill="#000000" font-family="monospace" font-size="8.5" font-weight="800" text-anchor="middle">[Rec 1, 2, 5, 8] &harr;</text>

        <rect x="233" y="188" width="180" height="42" fill="#000000" rx="6"/>
        <rect x="230" y="185" width="180" height="42" fill="#dcfce7" rx="6" stroke="#000000" stroke-width="2.5"/>
        <text x="320" y="204" fill="#15803d" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">LEAF PAGE 2 (16KB)</text>
        <text x="320" y="218" fill="#000000" font-family="monospace" font-size="8.5" font-weight="800" text-anchor="middle">&harr; [Rec 10, 15, 22] &harr;</text>

        <rect x="443" y="188" width="180" height="42" fill="#000000" rx="6"/>
        <rect x="440" y="185" width="180" height="42" fill="#dcfce7" rx="6" stroke="#000000" stroke-width="2.5"/>
        <text x="530" y="204" fill="#15803d" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">LEAF PAGE 3 (16KB)</text>
        <text x="530" y="218" fill="#000000" font-family="monospace" font-size="8.5" font-weight="800" text-anchor="middle">&harr; [Rec 55, 62, 68] &harr;</text>

        <rect x="653" y="188" width="180" height="42" fill="#000000" rx="6"/>
        <rect x="650" y="185" width="180" height="42" fill="#dcfce7" rx="6" stroke="#000000" stroke-width="2.5"/>
        <text x="740" y="204" fill="#15803d" font-family="monospace" font-size="10" font-weight="900" text-anchor="middle">LEAF PAGE 4 (16KB)</text>
        <text x="740" y="218" fill="#000000" font-family="monospace" font-size="8.5" font-weight="800" text-anchor="middle">&harr; [Rec 75, 82, 99]</text>

        <!-- Bottom Explainer -->
        <rect x="23" y="238" width="814" height="28" fill="#ffffff" rx="6" stroke="#000000" stroke-width="1.5"/>
        <text x="430" y="256" fill="#000000" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" text-anchor="middle">
          Clustered Index stores complete row data on leaf pages. Secondary Index leaf stores Key + PK (requires double lookup hop).
        </text>
      </svg>
    `,
    sections: [
      {
        heading: '1. B+ Tree Anatomy & 16KB Disk Pages',
        content: `Relational databases use **B+ Trees** rather than binary search trees because disk I/O operates in blocks:
- **InnoDB Page Size**: By default, MySQL reads and writes data in **16KB physical disk pages**.
- **High Fan-Out**: A single 16KB index page can hold over 1,000 keys and pointers. As a result, a 3-level B+ Tree can index over **1 billion records** with only 3 I/O reads ($O(\\log N)$)!
- **Clustered Index**: In InnoDB, the table **is** the clustered index (ordered by Primary Key). The leaf pages contain the actual row data.
- **Secondary Index**: A separate B+ Tree. Its leaf nodes do not contain data rows; they store the Primary Key value. Looking up a row via a secondary index requires a **Bookmark Lookup** (2 traversals) unless all requested columns exist in the index (**Covering Index**).`
      },
      {
        heading: '2. OLTP vs. OLAP: Row-Oriented vs. Columnar',
        content: `Understanding database workload classification dictates system architecture:
- **OLTP (Online Transaction Processing - MySQL, Postgres, Aurora)**:
  - Optimized for low-latency concurrent reads and single-row updates.
  - Rows are stored contiguously on disk.
  - Bottlenecks when scanning millions of rows for analytical aggregations.
- **OLAP (Online Analytical Processing - Snowflake, BigQuery, ClickHouse)**:
  - Optimized for massive analytical scans.
  - Stores each column separately across contiguous micro-partitions.
  - Calculating \`SUM(revenue)\` reads **only the revenue column**, skipping all other data on disk, providing 50x query speedups and 10x compression ratios.`
      },
      {
        heading: '3. ACID Guarantees & The 4 Isolation Levels',
        content: `The 4 foundational guarantees protecting concurrent database transactions:
- **Atomicity**: All statements in a transaction commit together, or all roll back via the Undo Log.
- **Consistency**: Database transitions from one valid state to another, enforcing foreign keys and check constraints.
- **Isolation**: Prevents concurrent transactions from observing uncommitted changes.
- **Durability**: Committed data is safely written to the Write-Ahead Log (WAL / Redo Log) before returning success.

**The 4 ANSI Transaction Isolation Levels**:
1. **Read Uncommitted**: Suffers from **Dirty Reads** (reading data that gets rolled back).
2. **Read Committed** *(PostgreSQL default)*: Eliminates dirty reads; allows Non-Repeatable Reads.
3. **Repeatable Read** *(MySQL InnoDB default)*: Guarantees that rows read once retain identical values throughout the transaction using Multi-Version Concurrency Control (MVCC) snapshots.
4. **Serializable**: Highest isolation. Eliminates phantom rows using range locks, but incurs high lock contention.`
      },
      {
        heading: '4. Buffer Pool & Write-Ahead Logging (WAL)',
        content: `Writing directly to random disk pages for every update would destroy performance:
- **Buffer Pool**: Dedicated RAM cache in memory (typically 70-80% of server RAM). All reads and writes happen in the buffer pool first.
- **Dirty Pages**: Pages modified in RAM but not yet written to disk.
- **Write-Ahead Logging (WAL / Redo Log)**: Before a dirty page is flushed to disk, the change is written sequentially to the append-only Redo Log. Sequential writes to NVMe take &lt; 0.1ms. If the server loses power, InnoDB replays the Redo Log to recover all committed data!`
      }
    ],
    interviewGotchas: [
      {
        title: "The Covering Index Superpower",
        trap: "If a query requests SELECT id, email FROM Users WHERE email = '...', and an index exists on (email, id), the engine reads the data directly from the index leaf without ever touching the primary clustered table disk pages (Using index)!"
      },
      {
        title: "Phantom Read vs Non-Repeatable Read",
        trap: "Non-repeatable read occurs when existing rows are modified or deleted by another transaction. Phantom read occurs when brand-new rows matching the WHERE filter are inserted into the range."
      }
    ]
  }
];
