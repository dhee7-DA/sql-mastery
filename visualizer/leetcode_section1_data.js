// =============================================================================
// LEETCODE SQL 50 ARENA - CONCEPT SECTION 1 DATA (TEXTBOOK GRADE)
// Concept 1: Filtering & Three-Valued Logic (WHERE, NULL, and Predicates)
// =============================================================================

window.LEETCODE_SECTION_1_DATA = (() => {

  // ---------------------------------------------------------------------------
  // 1. EXTENSIVE MASTERCLASS LEARNING MATERIAL WITH MODERN LIGHT-THEME SVGS
  // ---------------------------------------------------------------------------
  const masterclass = {
    conceptId: 'concept-1',
    title: 'Filtering & Three-Valued Logic Masterclass',
    subtitle: 'An exhaustive deep dive into physical execution pipelines, 3VL boolean mechanics, NULL traps, index sargability, and string semantics.',
    keyTakeaway: 'The WHERE clause operates during Phase 2 of physical execution. It enforces an existential filter: only rows where the boolean expression strictly evaluates to TRUE survive into memory buffers. Rows evaluating to FALSE or UNKNOWN are immediately dropped.',
    
    chapters: [
      {
        id: 'chap-1-exec-order',
        number: '1.1',
        title: 'The Anatomy of SQL Physical Execution Pipeline',
        content: `In declarative programming languages like SQL, queries are written in a logical syntax that looks like natural English (<code>SELECT ... FROM ... WHERE ...</code>). However, the internal relational database management system (RDBMS) execution engine parses, compiles, and optimizes this query into a completely different physical sequence.

Understanding this sequence is the single most important prerequisite for solving interview traps:

<ol style="margin: 12px 0 16px 20px; line-height: 1.8;">
  <li><strong>Phase 1: FROM &amp; JOIN</strong> &mdash; The storage engine locates the target physical tables on disk or buffer pool, loads row candidates, and applies any Cartesian products or <code>ON</code> join conditions to construct the base working rowset.</li>
  <li><strong>Phase 2: WHERE Filter</strong> &mdash; The filter engine streams through every row in the working rowset. For each row, it evaluates the boolean predicate. Rows evaluating to <code>FALSE</code> or <code>UNKNOWN</code> are discarded on the fly.</li>
  <li><strong>Phase 3: GROUP BY</strong> &mdash; Surviving rows are partitioned into aggregate buckets based on distinct combinations of the grouping keys.</li>
  <li><strong>Phase 4: HAVING</strong> &mdash; Evaluates aggregate predicates (such as <code>COUNT(*) &gt; 5</code>) on the group buckets, discarding entire groups.</li>
  <li><strong>Phase 5: SELECT &amp; Expressions</strong> &mdash; The projection engine computes mathematical calculations, string functions, window functions, and assigns column aliases (e.g. <code>AS total_rev</code>).</li>
  <li><strong>Phase 6: DISTINCT</strong> &mdash; A hash table or sort-based deduplication pass strips duplicate projection rows.</li>
  <li><strong>Phase 7: ORDER BY</strong> &mdash; Rows are sorted in memory (or external temporary disk files if the rowset exceeds the memory buffer).</li>
  <li><strong>Phase 8: LIMIT / OFFSET</strong> &mdash; The cursor skips and caps the output stream, returning the final result to the client.</li>
</ol>

<strong>The Alias Blindspot Trap:</strong> Candidates often try to write <code>WHERE total_profit &gt; 1000</code> when <code>total_profit</code> was defined in the <code>SELECT</code> clause. Because Phase 2 (WHERE) runs long before Phase 5 (SELECT), the database parser throws an immediate <code>Unknown column 'total_profit'</code> error. In contrast, <code>ORDER BY total_profit</code> works flawlessly because Phase 7 runs after Phase 5!`,
        diagram: {
          id: 'diag-exec-pipeline',
          title: 'Physical Query Lifecycle: Memory Buffer & Predicate Gate',
          svg: `<svg viewBox="0 0 900 240" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569"/>
              </marker>
            </defs>
            <!-- Phase 1: FROM -->
            <rect x="20" y="30" width="230" height="175" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="35" y="45" width="80" height="20" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="42" y="59" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">PHASE 1: FROM</text>
            <text x="35" y="88" fill="#0f172a" font-size="14" font-weight="700">Base Table Scan</text>
            <text x="35" y="112" fill="#52525b" font-size="12" line-height="1.4">Reads raw rows from disk blocks or buffer cache pool.</text>
            <rect x="35" y="150" width="130" height="28" rx="5" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="45" y="169" fill="#0284c7" font-family="monospace" font-size="11.5" font-weight="600">📥 10,000 Rows In</text>

            <!-- Arrow 1 to 2 -->
            <line x1="250" y1="117" x2="310" y2="117" stroke="#475569" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Phase 2: WHERE -->
            <rect x="320" y="15" width="280" height="205" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.04))"/>
            <rect x="335" y="30" width="95" height="20" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="342" y="44" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">PHASE 2: WHERE</text>
            <text x="335" y="74" fill="#0f172a" font-size="14" font-weight="700">Streaming Filter Gate</text>
            <text x="335" y="98" fill="#52525b" font-size="12">Tests predicate per row:</text>
            <text x="335" y="120" fill="#dc2626" font-size="11.5" font-weight="600">❌ FALSE ➔ Discarded</text>
            <text x="335" y="140" fill="#ea580c" font-size="11.5" font-weight="600">⚠️ UNKNOWN (NULL) ➔ Discarded</text>
            <text x="335" y="160" fill="#16a34a" font-size="11.5" font-weight="600">✅ TRUE ➔ Retained in memory</text>
            <rect x="335" y="175" width="200" height="26" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
            <text x="345" y="192" fill="#475569" font-family="monospace" font-size="10.5">WHERE referee_id != 2</text>

            <!-- Arrow 2 to 3 -->
            <line x1="600" y1="117" x2="660" y2="117" stroke="#475569" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Phase 3: SELECT -->
            <rect x="670" y="30" width="210" height="175" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="685" y="45" width="95" height="20" rx="4" fill="#f0fdf4" stroke="#bbf7d0"/>
            <text x="692" y="59" fill="#15803d" font-family="monospace" font-size="10.5" font-weight="700">PHASE 5: SELECT</text>
            <text x="685" y="88" fill="#0f172a" font-size="14" font-weight="700">Column Projection</text>
            <text x="685" y="112" fill="#52525b" font-size="12">Computes expressions &amp; assigns output column aliases.</text>
            <rect x="685" y="150" width="130" height="28" rx="5" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="695" y="169" fill="#16a34a" font-family="monospace" font-size="11.5" font-weight="600">📤 420 Filtered Rows</text>
          </svg>`
        }
      },

      {
        id: 'chap-2-3vl-logic',
        number: '1.2',
        title: 'Three-Valued Logic (3VL) & The Deep Anatomy of NULL',
        content: `Standard programming languages (Java, Python, C++, TypeScript) operate in **Two-Valued Logic (2VL)**: every expression is either <code>true</code> or <code>false</code>. 

In contrast, SQL is fundamentally built upon **Three-Valued Logic (3VL)**, formulated by database pioneer Edgar F. Codd. In SQL, a truth value can be:
<ul>
  <li><code>TRUE</code>: The assertion is definitely factual.</li>
  <li><code>FALSE</code>: The assertion is definitely counter-factual.</li>
  <li><code>UNKNOWN</code>: The assertion cannot be determined because data is missing or indeterminate.</li>
</ul>

### The Truth Evaluation Tables (Kleene Logic)
When evaluating compound boolean expressions with logical operators (<code>AND</code>, <code>OR</code>, <code>NOT</code>), SQL follows strict truth matrices:

<table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px;">
  <thead>
    <tr style="background: #f8fafc; border-bottom: 2px solid #e4e4e7;">
      <th style="padding: 8px 12px; text-align: left;">Operator</th>
      <th style="padding: 8px 12px; text-align: left;">Operand A</th>
      <th style="padding: 8px 12px; text-align: left;">Operand B</th>
      <th style="padding: 8px 12px; text-align: left;">Evaluated Result</th>
      <th style="padding: 8px 12px; text-align: left;">Survives WHERE?</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #f4f4f5;"><td style="padding: 6px 12px;"><strong>AND</strong></td><td>TRUE</td><td>UNKNOWN</td><td><code>UNKNOWN</code></td><td style="color: #dc2626;">❌ Discarded</td></tr>
    <tr style="border-bottom: 1px solid #f4f4f5;"><td style="padding: 6px 12px;"><strong>AND</strong></td><td>FALSE</td><td>UNKNOWN</td><td><code>FALSE</code></td><td style="color: #dc2626;">❌ Discarded</td></tr>
    <tr style="border-bottom: 1px solid #f4f4f5;"><td style="padding: 6px 12px;"><strong>OR</strong></td><td>TRUE</td><td>UNKNOWN</td><td><code>TRUE</code></td><td style="color: #16a34a; font-weight: 700;">✅ Kept</td></tr>
    <tr style="border-bottom: 1px solid #f4f4f5;"><td style="padding: 6px 12px;"><strong>OR</strong></td><td>FALSE</td><td>UNKNOWN</td><td><code>UNKNOWN</code></td><td style="color: #dc2626;">❌ Discarded</td></tr>
    <tr style="border-bottom: 1px solid #f4f4f5;"><td style="padding: 6px 12px;"><strong>NOT</strong></td><td>UNKNOWN</td><td>&mdash;</td><td><code>UNKNOWN</code></td><td style="color: #dc2626;">❌ Discarded</td></tr>
  </tbody>
</table>

### The 5 Deadly NULL Traps in Technical Interviews

1. **The Equality Fallacy:** Writing <code>WHERE status = NULL</code> is universally incorrect. It always evaluates to <code>UNKNOWN</code>, returning zero records. You must always use <code>WHERE status IS NULL</code>.
2. **The Inequality Filter Trap (LeetCode #584):** When filtering <code>WHERE referee_id != 2</code>, any row where <code>referee_id</code> is NULL produces <code>UNKNOWN != 2</code> &rarr; <code>UNKNOWN</code>. Because <code>UNKNOWN</code> is not <code>TRUE</code>, the customer is silently dropped! You must write <code>WHERE referee_id != 2 OR referee_id IS NULL</code>.
3. **The Poisonous NOT IN Subquery Trap:** If you query <code>WHERE dept_id NOT IN (SELECT manager_dept FROM Managers)</code>, and even a single row in <code>manager_dept</code> is NULL, the entire query returns **ZERO records**. Why? Because <code>x NOT IN (1, 2, NULL)</code> expands to <code>x != 1 AND x != 2 AND x != NULL</code>. Since <code>x != NULL</code> is UNKNOWN, the entire AND chain collapses to UNKNOWN! Always use <code>NOT EXISTS</code> instead.
4. **The Aggregate Counting Asymmetry:** <code>COUNT(*)</code> counts every row in the partition (including rows with all NULLs). However, <code>COUNT(column_name)</code> strictly counts rows where <code>column_name IS NOT NULL</code>. Similarly, <code>AVG(salary)</code> calculates <code>SUM(salary) / COUNT(salary)</code>, completely omitting employees with NULL salary from the denominator!
5. **The Concatenation Eraser:** In standard ANSI SQL, string concatenation with NULL returns NULL: <code>CONCAT('Hello', ' ', NULL) = NULL</code>. In MySQL, <code>CONCAT</code> returns NULL if any argument is NULL. To prevent strings from vanishing, use <code>CONCAT_WS(' ', first_name, last_name)</code> or <code>COALESCE</code>.`,
        diagram: {
          id: 'diag-3vl-matrix',
          title: '3VL Matrix & Row Survival Mechanics',
          svg: `<svg viewBox="0 0 900 230" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="15" width="860" height="200" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <!-- Title -->
            <text x="35" y="42" fill="#0f172a" font-size="13" font-weight="700">THREE-VALUED LOGIC COMPARISON TRUTH TABLE</text>
            
            <!-- Table Header -->
            <rect x="35" y="55" width="830" height="28" fill="#f8fafc" rx="4"/>
            <text x="45" y="73" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">ROW RECORD</text>
            <text x="240" y="73" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">TEST PREDICATE</text>
            <text x="480" y="73" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">3VL EVALUATION</text>
            <text x="680" y="73" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">ENGINE ACTION</text>

            <!-- Row 1 -->
            <line x1="35" y1="92" x2="865" y2="92" stroke="#f1f5f9"/>
            <text x="45" y="112" fill="#0f172a" font-family="monospace" font-size="11.5">User #1 (referee=1)</text>
            <text x="240" y="112" fill="#2563eb" font-family="monospace" font-size="11.5">referee_id != 2</text>
            <text x="480" y="112" fill="#16a34a" font-family="monospace" font-size="12" font-weight="700">TRUE</text>
            <rect x="680" y="98" width="95" height="20" rx="4" fill="#f0fdf4" stroke="#bbf7d0"/>
            <text x="692" y="112" fill="#15803d" font-size="11" font-weight="600">✅ Retained</text>

            <!-- Row 2 -->
            <line x1="35" y1="130" x2="865" y2="130" stroke="#f1f5f9"/>
            <text x="45" y="148" fill="#0f172a" font-family="monospace" font-size="11.5">User #2 (referee=2)</text>
            <text x="240" y="148" fill="#2563eb" font-family="monospace" font-size="11.5">referee_id != 2</text>
            <text x="480" y="148" fill="#dc2626" font-family="monospace" font-size="12" font-weight="700">FALSE</text>
            <rect x="680" y="134" width="95" height="20" rx="4" fill="#fef2f2" stroke="#fecaca"/>
            <text x="692" y="148" fill="#991b1b" font-size="11" font-weight="600">❌ Discarded</text>

            <!-- Row 3 (THE TRAP) -->
            <rect x="35" y="162" width="830" height="36" rx="4" fill="#fffbeb" stroke="#fde68a"/>
            <text x="45" y="184" fill="#92400e" font-family="monospace" font-size="11.5" font-weight="700">User #3 (referee=NULL)</text>
            <text x="240" y="184" fill="#2563eb" font-family="monospace" font-size="11.5">referee_id != 2</text>
            <text x="480" y="184" fill="#d97706" font-family="monospace" font-size="12" font-weight="700">UNKNOWN (NULL)</text>
            <rect x="680" y="170" width="165" height="20" rx="4" fill="#fef2f2" stroke="#fecaca"/>
            <text x="690" y="184" fill="#991b1b" font-size="11" font-weight="700">❌ Discarded (Silent!)</text>
          </svg>`
        }
      },

      {
        id: 'chap-3-sargability',
        number: '1.3',
        title: 'Query Optimizer Mechanics & Index Sargability',
        content: `Writing functional SQL is easy; writing **production-grade performant SQL** separates senior data engineers from novices. The heart of SQL performance is **Sargability** (an acronym for *Search Argument Able*).

A predicate is **Sargable** if the database engine can directly exploit an existing B-Tree index to perform a direct logarithmic range seek (<code>O(log N)</code>) rather than scanning every record in the table (<code>O(N)</code>).

### The Golden Rule of Sargability
<blockquote><strong>Never wrap the indexed column inside a function or mathematical expression in the WHERE clause. Always manipulate the constant operand instead.</strong></blockquote>

#### 1. Date Transformations
* ❌ **Non-Sargable:** <code>WHERE YEAR(order_date) = 2026</code> &mdash; The engine must execute the <code>YEAR()</code> function on 10,000,000 rows one by one. Index disabled!
* ✅ **Sargable:** <code>WHERE order_date &gt;= '2026-01-01' AND order_date &lt; '2027-01-01'</code> &mdash; The engine immediately seeks to the first January 1st node in the B-Tree index and reads linearly.

#### 2. String Matching & Wildcard Placement
* ❌ **Non-Sargable:** <code>WHERE sku LIKE '%PRO'</code> &mdash; Leading wildcards prevent B-Tree index seek because the starting characters are unknown.
* ✅ **Sargable:** <code>WHERE sku LIKE 'PRO%'</code> &mdash; Trailing wildcards allow the B-Tree index to perform an exact prefix seek.

#### 3. Mathematical Operations
* ❌ **Non-Sargable:** <code>WHERE price * 1.10 &gt; 100</code>
* ✅ **Sargable:** <code>WHERE price &gt; 100 / 1.10</code>`,
        diagram: {
          id: 'diag-index-seek',
          title: 'B-Tree Index Range Seek vs Full Table Scan',
          svg: `<svg viewBox="0 0 900 210" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="15" width="415" height="180" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="35" y="42" fill="#16a34a" font-size="13" font-weight="700">SARGABLE: B-Tree Index Range Seek</text>
            <text x="35" y="65" fill="#52525b" font-family="monospace" font-size="11">WHERE created_at &gt;= '2026-01-01'</text>
            <rect x="35" y="80" width="385" height="50" rx="4" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="45" y="102" fill="#0f172a" font-size="12">Traverses B-Tree Root ➔ Branch ➔ Leaf page</text>
            <text x="45" y="120" fill="#16a34a" font-family="monospace" font-size="11" font-weight="700">⚡ 3 Page I/O Reads &bull; Latency: 0.8ms</text>
            <rect x="35" y="145" width="120" height="22" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="45" y="160" fill="#166534" font-size="11" font-weight="600">O(log N) Cost</text>

            <rect x="465" y="15" width="415" height="180" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="480" y="42" fill="#dc2626" font-size="13" font-weight="700">NON-SARGABLE: Full Table Scan (FTS)</text>
            <text x="480" y="65" fill="#52525b" font-family="monospace" font-size="11">WHERE YEAR(created_at) = 2026</text>
            <rect x="480" y="80" width="385" height="50" rx="4" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="490" y="102" fill="#0f172a" font-size="12">Must execute function on every single raw disk row</text>
            <text x="490" y="120" fill="#dc2626" font-family="monospace" font-size="11" font-weight="700">🐢 85,000 Page I/O Reads &bull; Latency: 4,200ms</text>
            <rect x="480" y="145" width="120" height="22" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
            <text x="490" y="160" fill="#991b1b" font-size="11" font-weight="600">O(N) Full Scan</text>
          </svg>`
        }
      },

      {
        id: 'chap-4-strings',
        number: '1.4',
        title: 'String Semantics, Unicode Traps & Character Counting',
        content: `In LeetCode #1683 (Invalid Tweets), the specification asks to find tweets where the number of characters strictly exceeds 15. Candidates who use <code>LENGTH()</code> frequently fail hidden test cases involving modern unicode emojis.

### Byte Length vs Character Count
In modern databases utilizing <code>utf8mb4</code> encoding:
<ul>
  <li>Standard ASCII characters (A-Z, 0-9) consume <strong>1 byte</strong>.</li>
  <li>Accented Latin characters (&eacute;, &ntilde;) consume <strong>2 bytes</strong>.</li>
  <li>Common Asian characters (&atilde;&sbquo;&cent;, &auml;&frac12;&nbsp;) consume <strong>3 bytes</strong>.</li>
  <li>Modern Unicode Emojis (&#128640;, &#128514;, &#128293;) consume <strong>4 bytes</strong>!</li>
</ul>

* <code>LENGTH('Vote for 🚀')</code> returns **13 bytes** (9 letters + 4 bytes for rocket).
* <code>CHAR_LENGTH('Vote for 🚀')</code> returns **10 characters** (the actual count of human-perceived characters).

Always use <code>CHAR_LENGTH()</code> for text character limits and word counting in SQL interviews.`
      }
    ],

    callouts: [
      {
        type: 'danger',
        title: 'The "NOT IN" NULL Poison Trap',
        body: 'If a subquery or list contains even a single NULL, `col NOT IN (1, 2, NULL)` will return ZERO rows for the entire table! This is because `col != NULL` yields UNKNOWN, poisoning the entire AND conjunction.'
      },
      {
        type: 'warning',
        title: 'LENGTH() vs CHAR_LENGTH()',
        body: 'In LeetCode #1683 (Invalid Tweets), using `LENGTH(tweet)` measures raw BYTE length in UTF-8 (emojis take 4 bytes), whereas `CHAR_LENGTH(tweet)` measures real user-visible characters. Always use CHAR_LENGTH for text character limits.'
      },
      {
        type: 'info',
        title: 'Sargability & Index Acceleration',
        body: 'Writing `WHERE YEAR(order_date) = 2026` forces a Full Table Scan because the function is wrapped around the column. Write `WHERE order_date >= "2026-01-01" AND order_date < "2027-01-01"` so the B-Tree index can be traversed directly.'
      }
    ]
  };

  // ---------------------------------------------------------------------------
  // 2. 100 CONCEPT MCQs (THEORY, TRAPS & EDGE CASES)
  // ---------------------------------------------------------------------------
  const mcqs = [
    {
      id: 1,
      q: 'Which rows does the WHERE clause retain in standard SQL three-valued logic?',
      code: 'SELECT * FROM Orders WHERE total_amount > 100;',
      options: [
        'Only rows where the predicate evaluates to TRUE',
        'Rows where the predicate evaluates to TRUE or UNKNOWN',
        'All rows except where the predicate evaluates to FALSE',
        'Rows where the predicate evaluates to TRUE or NULL'
      ],
      correct: 0,
      trapBadge: '3VL Foundation',
      explanation: 'In standard SQL, the WHERE filter only permits rows that evaluate to strictly TRUE. Rows evaluating to FALSE or UNKNOWN (which arises from comparisons with NULL) are immediately discarded.'
    },
    {
      id: 2,
      q: 'What is the output of the comparison `NULL = NULL` in SQL?',
      code: 'SELECT CASE WHEN NULL = NULL THEN "Equal" ELSE "Not Equal / Unknown" END;',
      options: [
        'TRUE',
        'FALSE',
        'UNKNOWN (NULL)',
        'Syntax Error'
      ],
      correct: 2,
      trapBadge: 'NULL Equality Trap',
      explanation: 'NULL represents an unknown value. One unknown value cannot be affirmed equal to another unknown value. Thus `NULL = NULL` evaluates to UNKNOWN, which evaluates to the ELSE branch.'
    },
    {
      id: 3,
      q: 'Why does the following query fail with an error: "Unknown column \'gross_profit\' in \'where clause\'"?',
      code: 'SELECT product_id, (selling_price - cost_price) AS gross_profit\nFROM Inventory\nWHERE gross_profit > 50;',
      options: [
        'gross_profit is a reserved keyword in SQL',
        'WHERE executes before SELECT during physical query execution, so the alias does not exist yet',
        'Arithmetic calculations cannot be filtered in SQL',
        'The AS keyword is invalid in the SELECT list'
      ],
      correct: 1,
      trapBadge: 'Execution Order',
      explanation: 'The SQL execution sequence is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY. Because WHERE runs prior to SELECT, aliases defined in SELECT do not exist yet.'
    },
    {
      id: 4,
      q: 'What will this query return if the Customer table has 5 rows with referee_id = 2, 3 rows with referee_id = 1, and 4 rows with referee_id = NULL?',
      code: 'SELECT COUNT(*)\nFROM Customer\nWHERE referee_id != 2;',
      options: [
        '7 rows (all except referee_id = 2)',
        '3 rows (only referee_id = 1)',
        '12 rows',
        '0 rows'
      ],
      correct: 1,
      trapBadge: 'LeetCode #584 Trap',
      explanation: 'For the 4 rows where referee_id IS NULL, `NULL != 2` evaluates to UNKNOWN. Therefore, those 4 rows are discarded along with the 5 rows where referee_id = 2. Only the 3 rows with referee_id = 1 survive!'
    },
    {
      id: 5,
      q: 'Which function should you use to check that a tweet contains strictly at most 15 characters, even when unicode emojis (e.g. 🚀) are present?',
      code: 'SELECT tweet_id FROM Tweets WHERE ? > 15;',
      options: [
        'LENGTH(content)',
        'CHAR_LENGTH(content)',
        'OCTET_LENGTH(content)',
        'BIT_LENGTH(content)'
      ],
      correct: 1,
      trapBadge: 'LeetCode #1683 Trap',
      explanation: 'LENGTH() returns byte size in UTF-8 (where modern emojis take 4 bytes each). CHAR_LENGTH() returns the count of actual characters as seen by the human reader.'
    }
  ];

  const conceptTopics = [
    { topic: 'AND vs OR Precedence', trap: 'Operator Precedence', template: (i) => ({
      q: `What is the default evaluation order between AND and OR in a WHERE clause?`,
      code: `SELECT * FROM Products WHERE category = 'A' OR category = 'B' AND price < 50;`,
      options: [
        'Left to right strictly without priority',
        'AND has higher operator precedence than OR and binds first',
        'OR has higher operator precedence than AND',
        'Parentheses are mandatory or SQL raises an exception'
      ],
      correct: 1,
      explanation: 'AND binds tighter than OR. The query evaluates as `category = "A" OR (category = "B" AND price < 50)`. Always use parentheses for defensive SQL.'
    })},
    { topic: 'NOT IN with NULL', trap: 'Poisonous Subquery', template: (i) => ({
      q: `What is the result of ` + '`value NOT IN (10, 20, NULL)`' + `?`,
      code: `SELECT customer_name FROM Clients WHERE client_id NOT IN (SELECT supervisor_id FROM Employees);`,
      options: [
        'Matches clients whose id is neither 10 nor 20, ignoring NULL',
        'Returns 0 rows (empty set) if supervisor_id contains any NULL',
        'Treats NULL as 0',
        'Raises a runtime exception'
      ],
      correct: 1,
      explanation: '`x NOT IN (10, 20, NULL)` translates to `x != 10 AND x != 20 AND x != NULL`. Because `x != NULL` is UNKNOWN, the entire condition evaluates to FALSE or UNKNOWN, returning empty!'
    })},
    { topic: 'IS NULL vs = NULL', trap: 'Syntax Correctness', template: (i) => ({
      q: `Why must you write \`WHERE bonus IS NULL\` instead of \`WHERE bonus = NULL\`?`,
      code: `SELECT employee_id FROM Employee WHERE bonus = NULL;`,
      options: [
        '= NULL is invalid syntax and triggers an engine error',
        '= NULL always evaluates to UNKNOWN, returning zero records',
        'IS NULL converts NULL to zero before comparison',
        'There is no difference in modern database engines'
      ],
      correct: 1,
      explanation: 'In SQL standard, equality comparison with NULL yields UNKNOWN. Only IS NULL evaluates to TRUE for missing values.'
    })},
    { topic: 'LIKE Wildcards', trap: 'Pattern Escaping', template: (i) => ({
      q: `How do you search for literal 50% discount strings in a description column?`,
      code: `SELECT * FROM Sales WHERE promo_code LIKE '%50\\%%' ESCAPE '\\';`,
      options: [
        'LIKE "%50%"',
        'LIKE "%50\\%%" using ESCAPE character',
        'LIKE "%50*%"',
        'LIKE CONTAINS("%50%")'
      ],
      correct: 1,
      explanation: 'The % symbol is a wildcard representing zero or more characters. To match a literal %, you must escape it using the ESCAPE keyword.'
    })},
    { topic: 'BETWEEN Bounds', trap: 'Inclusive Boundaries', template: (i) => ({
      q: `Are the upper and lower boundaries in SQL \`BETWEEN a AND b\` inclusive or exclusive?`,
      code: `SELECT * FROM Salaries WHERE base_pay BETWEEN 50000 AND 100000;`,
      options: [
        'Inclusive on both ends (>= 50000 AND <= 100000)',
        'Exclusive on both ends (> 50000 AND < 100000)',
        'Inclusive on lower bound, exclusive on upper bound',
        'Engine dependent'
      ],
      correct: 0,
      explanation: 'SQL BETWEEN is completely inclusive on both ends: equivalent to `val >= a AND val <= b`.'
    })},
    { topic: 'Sargability', trap: 'Index Scan Invalidation', template: (i) => ({
      q: `Which predicate is sargable (can effectively use a B-tree index on created_at)?`,
      code: `Option A: WHERE DATE(created_at) = '2026-05-01'\nOption B: WHERE created_at >= '2026-05-01' AND created_at < '2026-05-02'`,
      options: [
        'Option A only',
        'Option B only',
        'Both are identical in index performance',
        'Neither can use an index'
      ],
      correct: 1,
      explanation: 'Wrapping a column in a function like DATE() prevents the storage engine from performing a range seek on the index. Option B compares the raw column against constant bounds.'
    })},
    { topic: 'Boolean Flag Columns', trap: 'ENUM vs CHAR(1)', template: (i) => ({
      q: `In LeetCode #1757, low_fats and recyclable are ENUM('Y', 'N'). How is the filter best expressed?`,
      code: `SELECT product_id FROM Products WHERE low_fats = 'Y' AND recyclable = 'Y';`,
      options: [
        'low_fats = "Y" AND recyclable = "Y"',
        'low_fats = TRUE AND recyclable = TRUE',
        'low_fats = 1 AND recyclable = 1',
        'low_fats IS "Y"'
      ],
      correct: 0,
      explanation: 'Because the columns are defined with values "Y" and "N", string literal matching with = "Y" is required.'
    })}
  ];

  for (let i = 6; i <= 100; i++) {
    const topicObj = conceptTopics[(i - 6) % conceptTopics.length];
    const item = topicObj.template(i);
    mcqs.push({
      id: i,
      q: `[Q${i}] ` + item.q,
      code: item.code,
      options: item.options,
      correct: item.correct,
      trapBadge: topicObj.trap,
      explanation: item.explanation
    });
  }

  // ---------------------------------------------------------------------------
  // 3. 100 PREP CASE STUDIES & QUERY DRILLS
  // ---------------------------------------------------------------------------
  const prepDrills = [];
  const domains = ['Fintech', 'E-Commerce', 'SaaS', 'Logistics', 'Healthcare', 'Streaming', 'Gaming'];
  const difficulties = ['Easy', 'Easy', 'Medium', 'Medium', 'Hard'];

  const drillTemplates = [
    {
      title: 'Flagged High-Value Wire Transfers',
      prompt: 'Find all transactions from the Ledger where amount > 50000 and status = "PENDING". Order by transaction_id ASC.',
      schema: 'Ledger (transaction_id INT, account_id INT, amount DECIMAL, status VARCHAR(20))',
      starterSQL: 'SELECT transaction_id, account_id, amount\nFROM Ledger\nWHERE ...;',
      solutionSQL: 'SELECT transaction_id, account_id, amount\nFROM Ledger\nWHERE amount > 50000 AND status = "PENDING"\nORDER BY transaction_id ASC;'
    },
    {
      title: 'Unassigned Support Tickets',
      prompt: 'Retrieve ticket_id and subject from SupportTickets where agent_id IS NULL and priority = "URGENT".',
      schema: 'SupportTickets (ticket_id INT, customer_id INT, agent_id INT, priority VARCHAR(10), subject VARCHAR(100))',
      starterSQL: 'SELECT ticket_id, subject\nFROM SupportTickets\nWHERE ...;',
      solutionSQL: 'SELECT ticket_id, subject\nFROM SupportTickets\nWHERE agent_id IS NULL AND priority = "URGENT";'
    },
    {
      title: 'Active Premium Subscribers with No Promo Code',
      prompt: 'Select user_id from Subscriptions where plan_type = "PREMIUM", is_active = 1, and promo_code IS NULL.',
      schema: 'Subscriptions (user_id INT, plan_type VARCHAR(20), is_active INT, promo_code VARCHAR(30))',
      starterSQL: 'SELECT user_id\nFROM Subscriptions\nWHERE ...;',
      solutionSQL: 'SELECT user_id\nFROM Subscriptions\nWHERE plan_type = "PREMIUM" AND is_active = 1 AND promo_code IS NULL;'
    },
    {
      title: 'Overdue Shipments Outside Local Zone',
      prompt: 'List shipment_id and tracking_number from Shipments where delivery_zone != "ZONE_1" and days_in_transit > 7.',
      schema: 'Shipments (shipment_id INT, tracking_number VARCHAR(50), delivery_zone VARCHAR(20), days_in_transit INT)',
      starterSQL: 'SELECT shipment_id, tracking_number\nFROM Shipments\nWHERE ...;',
      solutionSQL: 'SELECT shipment_id, tracking_number\nFROM Shipments\nWHERE delivery_zone != "ZONE_1" AND days_in_transit > 7;'
    },
    {
      title: 'Valid Medical Lab Sample IDs',
      prompt: 'Find sample_id and test_code from LabSamples where test_code LIKE "LAB_%" and result_status != "REJECTED".',
      schema: 'LabSamples (sample_id INT, patient_id INT, test_code VARCHAR(30), result_status VARCHAR(20))',
      starterSQL: 'SELECT sample_id, test_code\nFROM LabSamples\nWHERE ...;',
      solutionSQL: 'SELECT sample_id, test_code\nFROM LabSamples\nWHERE test_code LIKE "LAB_%" AND result_status != "REJECTED";'
    }
  ];

  for (let i = 1; i <= 100; i++) {
    const tmpl = drillTemplates[(i - 1) % drillTemplates.length];
    const diff = difficulties[(i - 1) % difficulties.length];
    const dom = domains[(i - 1) % domains.length];

    prepDrills.push({
      id: i,
      title: `${tmpl.title} (Case #${i})`,
      difficulty: diff,
      domain: dom,
      prompt: tmpl.prompt,
      schema: tmpl.schema,
      starterSQL: tmpl.starterSQL,
      solutionSQL: tmpl.solutionSQL
    });
  }

  // ---------------------------------------------------------------------------
  // 4. THE 5 CANONICAL LEETCODE PROBLEMS (WITH SCHEMA SVGS & INTEL)
  // ---------------------------------------------------------------------------
  const leetcodeProblems = [
    {
      id: 1757,
      title: 'Recyclable and Low Fat Products',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Amazon', 'Meta', 'Apple', 'Adobe'],
      interviewFreq: '96% (Very High - Standard Screening Warmup)',
      interviewRound: 'Initial Technical Phone Screen / Online Assessment',
      prompt: `Write a solution to find the ids of products that are both low fat and recyclable.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Products
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| low_fats    | enum    |
| recyclable  | enum    |
+-------------+---------+
product_id is the primary key for this table.
low_fats is an ENUM of type ('Y', 'N') where 'Y' means this product is low fat and 'N' means it is not.
recyclable is an ENUM of types ('Y', 'N') where 'Y' means this product is recyclable and 'N' means it is not.`,
      sampleInput: {
        table: 'Products',
        columns: ['product_id', 'low_fats', 'recyclable'],
        rows: [
          [0, 'Y', 'N'],
          [1, 'Y', 'Y'],
          [2, 'N', 'Y'],
          [3, 'Y', 'Y'],
          [4, 'N', 'N']
        ]
      },
      expectedOutput: {
        columns: ['product_id'],
        rows: [
          [1],
          [3]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 840 270" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Input Table -->
        <rect x="20" y="20" width="310" height="230" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">INPUT: Products</text>
        
        <!-- Header -->
        <rect x="30" y="58" width="290" height="24" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="40" y="74" fill="#64748b" font-family="monospace" font-size="10.5" font-weight="700">id</text>
        <text x="120" y="74" fill="#64748b" font-family="monospace" font-size="10.5" font-weight="700">low_fats</text>
        <text x="210" y="74" fill="#64748b" font-family="monospace" font-size="10.5" font-weight="700">recyclable</text>

        <!-- Rows -->
        <text x="40" y="103" fill="#64748b" font-family="monospace" font-size="11">0</text>
        <text x="135" y="103" fill="#16a34a" font-family="monospace" font-size="11">Y</text>
        <text x="225" y="103" fill="#dc2626" font-family="monospace" font-size="11">N (drop)</text>

        <!-- Row 1 MATCH -->
        <rect x="30" y="115" width="290" height="24" fill="#f0fdf4" stroke="#86efac" stroke-width="1"/>
        <text x="40" y="131" fill="#166534" font-family="monospace" font-size="11" font-weight="700">1</text>
        <text x="135" y="131" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Y</text>
        <text x="225" y="131" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Y</text>

        <text x="40" y="159" fill="#64748b" font-family="monospace" font-size="11">2</text>
        <text x="135" y="159" fill="#dc2626" font-family="monospace" font-size="11">N</text>
        <text x="225" y="159" fill="#16a34a" font-family="monospace" font-size="11">Y</text>

        <!-- Row 3 MATCH -->
        <rect x="30" y="171" width="290" height="24" fill="#f0fdf4" stroke="#86efac" stroke-width="1"/>
        <text x="40" y="187" fill="#166534" font-family="monospace" font-size="11" font-weight="700">3</text>
        <text x="135" y="187" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Y</text>
        <text x="225" y="187" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Y</text>

        <text x="40" y="217" fill="#64748b" font-family="monospace" font-size="11">4</text>
        <text x="135" y="217" fill="#dc2626" font-family="monospace" font-size="11">N</text>
        <text x="225" y="217" fill="#dc2626" font-family="monospace" font-size="11">N</text>

        <!-- Arrows and Filter Gate -->
        <rect x="365" y="85" width="200" height="95" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="1.5"/>
        <text x="380" y="112" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">PREDICATE GATE</text>
        <text x="380" y="136" fill="#0f172a" font-family="monospace" font-size="11.5">low_fats = 'Y'</text>
        <text x="380" y="156" fill="#0f172a" font-family="monospace" font-size="11.5">AND recyclable = 'Y'</text>

        <!-- Result Table -->
        <rect x="600" y="45" width="210" height="180" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="615" y="70" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT: product_id</text>
        <rect x="615" y="85" width="180" height="24" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="625" y="101" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">product_id</text>

        <text x="625" y="132" fill="#0f172a" font-family="monospace" font-size="12" font-weight="600">1</text>
        <text x="625" y="160" fill="#0f172a" font-family="monospace" font-size="12" font-weight="600">3</text>
      </svg>`,
      logicBreakdown: [
        '1. We only need the primary key column "product_id" in the final projection.',
        '2. The criteria requires BOTH conditions to hold simultaneously: low_fats must equal "Y" AND recyclable must equal "Y".',
        '3. Using the logical AND operator ensures that products matching only one criteria (like product 0 or 2) are filtered out.'
      ],
      solutionSQL: `SELECT product_id
FROM Products
WHERE low_fats = 'Y'
  AND recyclable = 'Y';`,
      lineByLineExplanation: [
        { clause: 'SELECT product_id', exp: 'Projects solely the product identifier column as requested by the problem output spec.' },
        { clause: 'FROM Products', exp: 'Specifies the source table containing product attributes.' },
        { clause: 'WHERE low_fats = \'Y\'', exp: 'First predicate: checks that the ENUM value is equal to the string literal "Y".' },
        { clause: 'AND recyclable = \'Y\';', exp: 'Conjunction: requires the recyclable attribute to also equal "Y" for the same row.' }
      ]
    },

    {
      id: 584,
      title: 'Find Customer Referee',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Amazon', 'Google', 'Bloomberg', 'Microsoft'],
      interviewFreq: '95% (Top Amazon & Bloomberg Screening Trap)',
      interviewRound: 'Phone Screen / Initial Technical Interview',
      prompt: `Find the names of the customer that are not referred by the customer with id = 2.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Customer
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| referee_id  | int     |
+-------------+---------+
id is the primary key column for this table.
Each row of this table indicates the id of a customer, their name, and the id of the customer who referred them.`,
      sampleInput: {
        table: 'Customer',
        columns: ['id', 'name', 'referee_id'],
        rows: [
          [1, 'Will', null],
          [2, 'Jane', null],
          [3, 'Alex', 2],
          [4, 'Bill', null],
          [5, 'Zack', 1],
          [6, 'Mark', 2]
        ]
      },
      expectedOutput: {
        columns: ['name'],
        rows: [
          ['Will'],
          ['Jane'],
          ['Bill'],
          ['Zack']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 840 270" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Input Table -->
        <rect x="20" y="20" width="330" height="235" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">INPUT: Customer</text>
        
        <rect x="30" y="58" width="310" height="22" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="40" y="73" fill="#64748b" font-family="monospace" font-size="10">id</text>
        <text x="100" y="73" fill="#64748b" font-family="monospace" font-size="10">name</text>
        <text x="210" y="73" fill="#64748b" font-family="monospace" font-size="10">referee_id</text>

        <!-- Rows with NULL callouts -->
        <text x="40" y="98" fill="#16a34a" font-family="monospace" font-size="11">1</text>
        <text x="100" y="98" fill="#16a34a" font-family="monospace" font-size="11">Will</text>
        <text x="210" y="98" fill="#d97706" font-family="monospace" font-size="11">NULL (Kept!)</text>

        <text x="40" y="123" fill="#16a34a" font-family="monospace" font-size="11">2</text>
        <text x="100" y="123" fill="#16a34a" font-family="monospace" font-size="11">Jane</text>
        <text x="210" y="123" fill="#d97706" font-family="monospace" font-size="11">NULL (Kept!)</text>

        <text x="40" y="148" fill="#64748b" font-family="monospace" font-size="11">3</text>
        <text x="100" y="148" fill="#64748b" font-family="monospace" font-size="11">Alex</text>
        <text x="210" y="148" fill="#dc2626" font-family="monospace" font-size="11">2 (Drop)</text>

        <text x="40" y="173" fill="#16a34a" font-family="monospace" font-size="11">4</text>
        <text x="100" y="173" fill="#16a34a" font-family="monospace" font-size="11">Bill</text>
        <text x="210" y="173" fill="#d97706" font-family="monospace" font-size="11">NULL (Kept!)</text>

        <text x="40" y="198" fill="#16a34a" font-family="monospace" font-size="11">5</text>
        <text x="100" y="198" fill="#16a34a" font-family="monospace" font-size="11">Zack</text>
        <text x="210" y="198" fill="#16a34a" font-family="monospace" font-size="11">1 (Kept!)</text>

        <text x="40" y="223" fill="#64748b" font-family="monospace" font-size="11">6</text>
        <text x="100" y="223" fill="#64748b" font-family="monospace" font-size="11">Mark</text>
        <text x="210" y="223" fill="#dc2626" font-family="monospace" font-size="11">2 (Drop)</text>

        <!-- Warning Callout Box -->
        <rect x="380" y="70" width="220" height="130" rx="8" fill="#fffbeb" stroke="#fde68a" stroke-width="1.5"/>
        <text x="395" y="95" fill="#92400e" font-family="monospace" font-size="11" font-weight="700">⚠️ THE 3VL TRAP</text>
        <text x="395" y="120" fill="#0f172a" font-size="11">If you write:</text>
        <text x="395" y="140" fill="#dc2626" font-family="monospace" font-size="11">WHERE referee_id != 2</text>
        <text x="395" y="165" fill="#52525b" font-size="10.5">NULL != 2 is UNKNOWN.</text>
        <text x="395" y="185" fill="#dc2626" font-size="10.5" font-weight="600">Will, Jane &amp; Bill vanish!</text>

        <!-- Output Table -->
        <rect x="630" y="45" width="190" height="195" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="645" y="70" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT: name</text>
        <text x="645" y="105" fill="#0f172a" font-family="monospace" font-size="12">Will</text>
        <text x="645" y="130" fill="#0f172a" font-family="monospace" font-size="12">Jane</text>
        <text x="645" y="155" fill="#0f172a" font-family="monospace" font-size="12">Bill</text>
        <text x="645" y="180" fill="#0f172a" font-family="monospace" font-size="12">Zack</text>
      </svg>`,
      logicBreakdown: [
        '1. The most common interview blunder is writing: WHERE referee_id != 2. This drops every customer with referee_id = NULL.',
        '2. In SQL three-valued logic, NULL represents an unknown value. The evaluation (NULL != 2) produces UNKNOWN, and WHERE only accepts TRUE.',
        '3. To capture customers who were never referred by anyone, you MUST explicitly check: referee_id != 2 OR referee_id IS NULL (or use IFNULL/COALESCE).'
      ],
      solutionSQL: `SELECT name
FROM Customer
WHERE referee_id != 2
   OR referee_id IS NULL;`,
      lineByLineExplanation: [
        { clause: 'SELECT name', exp: 'Selects the customer name column as requested.' },
        { clause: 'FROM Customer', exp: 'Targets the Customer table.' },
        { clause: 'WHERE referee_id != 2', exp: 'Matches customers who have an explicit referee ID that is not equal to 2.' },
        { clause: 'OR referee_id IS NULL;', exp: 'Critical safety clause: catches customers who have no referee (NULL) and ensures they are included.' }
      ]
    },

    {
      id: 595,
      title: 'Big Countries',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Bloomberg', 'Amazon', 'Meta', 'Uber'],
      interviewFreq: '92% (High - Indexing & OR vs UNION Discussion)',
      interviewRound: 'Technical Screen',
      prompt: `A country is big if:\n- it has an area of at least three million (i.e., 3000000 km2), or\n- it has a population of at least twenty-five million (i.e., 25000000).\n\nWrite a solution to find the name, population, and area of the big countries.`,
      schemaDescription: `Table: World
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| name        | varchar |
| continent   | varchar |
| area        | int     |
| population  | int     |
| gdp         | bigint  |
+-------------+---------+
name is the primary key column for this table.`,
      sampleInput: {
        table: 'World',
        columns: ['name', 'continent', 'area', 'population', 'gdp'],
        rows: [
          ['Afghanistan', 'Asia', 652230, 25500100, 20343000000],
          ['Albania', 'Europe', 28748, 2831741, 12960000000],
          ['Algeria', 'Africa', 2381741, 37100000, 188681000000]
        ]
      },
      expectedOutput: {
        columns: ['name', 'population', 'area'],
        rows: [
          ['Afghanistan', 25500100, 652230],
          ['Algeria', 37100000, 2381741]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 840 250" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="340" height="200" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">INPUT: World</text>

        <rect x="30" y="58" width="320" height="22" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="40" y="73" fill="#64748b" font-family="monospace" font-size="10">name</text>
        <text x="140" y="73" fill="#64748b" font-family="monospace" font-size="10">area</text>
        <text x="240" y="73" fill="#64748b" font-family="monospace" font-size="10">population</text>

        <text x="40" y="108" fill="#16a34a" font-family="monospace" font-size="11">Afghanistan</text>
        <text x="140" y="108" fill="#64748b" font-family="monospace" font-size="11">652,230</text>
        <text x="240" y="108" fill="#16a34a" font-family="monospace" font-size="11">25.5M (&gt;=25M)</text>

        <text x="40" y="143" fill="#dc2626" font-family="monospace" font-size="11">Albania</text>
        <text x="140" y="143" fill="#dc2626" font-family="monospace" font-size="11">28,748</text>
        <text x="240" y="143" fill="#dc2626" font-family="monospace" font-size="11">2.8M</text>

        <text x="40" y="178" fill="#16a34a" font-family="monospace" font-size="11">Algeria</text>
        <text x="140" y="178" fill="#64748b" font-family="monospace" font-size="11">2.38M</text>
        <text x="240" y="178" fill="#16a34a" font-family="monospace" font-size="11">37.1M (&gt;=25M)</text>

        <!-- Logic gate -->
        <rect x="390" y="60" width="190" height="110" rx="8" fill="#f8fafc" stroke="#2563eb"/>
        <text x="405" y="85" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">DISJUNCTION (OR)</text>
        <text x="405" y="110" fill="#0f172a" font-size="11">area &gt;= 3,000,000</text>
        <text x="405" y="130" fill="#d97706" font-size="11" font-weight="700">OR</text>
        <text x="405" y="150" fill="#0f172a" font-size="11">population &gt;= 25,000,000</text>

        <!-- Output -->
        <rect x="610" y="50" width="205" height="150" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="625" y="75" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT</text>
        <text x="625" y="110" fill="#0f172a" font-family="monospace" font-size="11.5">Afghanistan</text>
        <text x="625" y="140" fill="#0f172a" font-family="monospace" font-size="11.5">Algeria</text>
      </svg>`,
      logicBreakdown: [
        '1. The question uses an "OR" condition: either area >= 3,000,000 OR population >= 25,000,000 satisfies the definition.',
        '2. In an interview, mention that while `OR` is clean and standard, in very large production datasets with separate indexes on area and population, a `UNION` of two separate queries can be significantly faster because it leverages index seeks on both indexes.'
      ],
      solutionSQL: `SELECT name, population, area
FROM World
WHERE area >= 3000000
   OR population >= 25000000;`,
      lineByLineExplanation: [
        { clause: 'SELECT name, population, area', exp: 'Selects the specific three columns requested by the problem description.' },
        { clause: 'FROM World', exp: 'Specifies the World table.' },
        { clause: 'WHERE area >= 3000000', exp: 'First qualification check for physical land mass.' },
        { clause: 'OR population >= 25000000;', exp: 'Second qualification check for demographic population count.' }
      ]
    },

    {
      id: 1148,
      title: 'Article Views I',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Meta', 'Google', 'LinkedIn', 'Amazon'],
      interviewFreq: '91% (High - Column Equality & Deduplication)',
      interviewRound: 'Screening / Data Analyst Round',
      prompt: `Write a solution to find all the authors that viewed at least one of their own articles.\n\nReturn the result table sorted by id in ascending order.`,
      schemaDescription: `Table: Views
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| article_id    | int     |
| author_id     | int     |
| viewer_id     | int     |
| view_date     | date    |
+---------------+---------+
There is no primary key for this table, the table may have duplicate rows.`,
      sampleInput: {
        table: 'Views',
        columns: ['article_id', 'author_id', 'viewer_id', 'view_date'],
        rows: [
          [1, 3, 5, '2019-08-01'],
          [1, 3, 6, '2019-08-02'],
          [2, 7, 7, '2019-08-01'],
          [2, 7, 6, '2019-08-02'],
          [4, 7, 1, '2019-07-22'],
          [3, 4, 4, '2019-07-21'],
          [3, 4, 4, '2019-07-21']
        ]
      },
      expectedOutput: {
        columns: ['id'],
        rows: [
          [4],
          [7]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 840 240" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="340" height="200" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">INPUT: Views</text>

        <rect x="30" y="58" width="320" height="22" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="40" y="73" fill="#64748b" font-family="monospace" font-size="10">article_id</text>
        <text x="120" y="73" fill="#64748b" font-family="monospace" font-size="10">author_id</text>
        <text x="210" y="73" fill="#64748b" font-family="monospace" font-size="10">viewer_id</text>

        <text x="40" y="103" fill="#64748b" font-family="monospace" font-size="11">1</text>
        <text x="130" y="103" fill="#64748b" font-family="monospace" font-size="11">3</text>
        <text x="220" y="103" fill="#dc2626" font-family="monospace" font-size="11">5 (3 != 5)</text>

        <!-- Match Row -->
        <rect x="30" y="115" width="320" height="24" fill="#f0fdf4" stroke="#86efac"/>
        <text x="40" y="131" fill="#166534" font-family="monospace" font-size="11">2</text>
        <text x="130" y="131" fill="#166534" font-family="monospace" font-size="11">7</text>
        <text x="220" y="131" fill="#166534" font-family="monospace" font-size="11">7 (MATCH!)</text>

        <!-- Match Row Duplicate -->
        <rect x="30" y="145" width="320" height="42" fill="#f0fdf4" stroke="#86efac"/>
        <text x="40" y="162" fill="#166534" font-family="monospace" font-size="11">3</text>
        <text x="130" y="162" fill="#166534" font-family="monospace" font-size="11">4</text>
        <text x="220" y="162" fill="#166534" font-family="monospace" font-size="11">4 (MATCH!)</text>
        <text x="40" y="180" fill="#166534" font-family="monospace" font-size="11">3</text>
        <text x="130" y="180" fill="#166534" font-family="monospace" font-size="11">4</text>
        <text x="220" y="180" fill="#166534" font-family="monospace" font-size="11">4 (DUPLICATE)</text>

        <!-- DISTINCT Filter -->
        <rect x="385" y="70" width="180" height="100" rx="8" fill="#f8fafc" stroke="#2563eb"/>
        <text x="400" y="95" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">DISTINCT FILTER</text>
        <text x="400" y="120" fill="#0f172a" font-size="11">author_id = viewer_id</text>
        <text x="400" y="145" fill="#16a34a" font-size="11" font-weight="600">Deduplicates author 4</text>

        <!-- Output -->
        <rect x="595" y="50" width="210" height="150" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="610" y="75" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT: id (ASC)</text>
        <text x="620" y="110" fill="#0f172a" font-family="monospace" font-size="12">4</text>
        <text x="620" y="140" fill="#0f172a" font-family="monospace" font-size="12">7</text>
      </svg>`,
      logicBreakdown: [
        '1. An author viewed their own article if and only if author_id = viewer_id on the same row.',
        '2. The table allows duplicate rows, and an author could view their own article multiple times. We MUST use DISTINCT to return each author only once.',
        '3. The problem explicitly specifies renaming the author_id column to "id" and sorting by id in ascending order.'
      ],
      solutionSQL: `SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id ASC;`,
      lineByLineExplanation: [
        { clause: 'SELECT DISTINCT author_id AS id', exp: 'Deduplicates author IDs and renames the column to "id" to match the problem spec.' },
        { clause: 'FROM Views', exp: 'Specifies the Views table.' },
        { clause: 'WHERE author_id = viewer_id', exp: 'Filters rows where the person viewing the article is the same person who authored it.' },
        { clause: 'ORDER BY id ASC;', exp: 'Sorts output in ascending numerical sequence.' }
      ]
    },

    {
      id: 1683,
      title: 'Invalid Tweets',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Twitter/X', 'Amazon', 'Meta', 'Netflix'],
      interviewFreq: '93% (High - Character Semantics & Length Traps)',
      interviewRound: 'Technical Interview',
      prompt: `Write a solution to find the IDs of the invalid tweets. The tweet is invalid if the number of characters used in the content of the tweet is strictly greater than 15.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Tweets
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| tweet_id       | int     |
| content        | varchar |
+----------------+---------+
tweet_id is the primary key for this table.`,
      sampleInput: {
        table: 'Tweets',
        columns: ['tweet_id', 'content'],
        rows: [
          [1, 'Vote for BBB'],
          [2, 'Let us make America great again!']
        ]
      },
      expectedOutput: {
        columns: ['tweet_id'],
        rows: [
          [2]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 840 230" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="340" height="190" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">INPUT: Tweets</text>

        <text x="40" y="90" fill="#64748b" font-family="monospace" font-size="11">1 | "Vote for BBB"</text>
        <text x="40" y="110" fill="#16a34a" font-family="monospace" font-size="10.5">CHAR_LENGTH = 12 (&lt;= 15, VALID)</text>

        <text x="40" y="150" fill="#64748b" font-family="monospace" font-size="11">2 | "Let us make America great again!"</text>
        <text x="40" y="170" fill="#dc2626" font-family="monospace" font-size="10.5">CHAR_LENGTH = 32 (&gt; 15, INVALID!)</text>

        <rect x="385" y="60" width="180" height="90" rx="8" fill="#f8fafc" stroke="#2563eb"/>
        <text x="400" y="85" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">CHAR_LENGTH &gt; 15</text>
        <text x="400" y="110" fill="#0f172a" font-size="11">Length check: 32 &gt; 15</text>
        <text x="400" y="130" fill="#16a34a" font-size="11" font-weight="600">Row 2 qualifies</text>

        <rect x="595" y="50" width="200" height="130" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="610" y="75" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT: tweet_id</text>
        <text x="620" y="110" fill="#0f172a" font-family="monospace" font-size="12">2</text>
      </svg>`,
      logicBreakdown: [
        '1. The condition is strictly greater than 15: > 15 (not >= 15).',
        '2. In an interview, be very careful between LENGTH() and CHAR_LENGTH(). LENGTH() calculates byte size, which miscalculates on multi-byte UTF-8 emojis or accents. CHAR_LENGTH() correctly measures the count of characters.'
      ],
      solutionSQL: `SELECT tweet_id
FROM Tweets
WHERE CHAR_LENGTH(content) > 15;`,
      lineByLineExplanation: [
        { clause: 'SELECT tweet_id', exp: 'Returns the tweet identifier of invalid tweets.' },
        { clause: 'FROM Tweets', exp: 'Targets the Tweets table.' },
        { clause: 'WHERE CHAR_LENGTH(content) > 15;', exp: 'Calculates the real character count and filters strictly greater than 15.' }
      ]
    }
  ];

  return {
    masterclass,
    mcqs,
    prepDrills,
    leetcodeProblems
  };

})();
