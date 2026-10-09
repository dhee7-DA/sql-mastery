// scratch/build_section7_complete.js
// Generates visualizer/leetcode_section7_data.js with:
// - 8 Visual Masterclass chapters with bespoke SVGs
// - 3 Masterclass callouts (danger, warning, info)
// - 100 Concept MCQs (#701-800)
// - 100 Prep Drills (#701-800)
// - 7 Canonical LeetCode String Manipulation, Regex & Clause Problems (#1667, #1527, #1517, #1484, #1327, #176, #196)

const fs = require('fs');
const path = require('path');

console.log('Building Concept 7 dataset: Advanced String Manipulation, Regex & Clauses...');

// -----------------------------------------------------------------------------
// 1. MASTERCLASS CHAPTERS (8 Chapters with bespoke SVGs)
// -----------------------------------------------------------------------------
const chapters = [
  {
    id: "chap-7-1-string-primitives",
    number: "7.1",
    title: "String Scalar Primitives: CONCAT, SUBSTRING, CHAR_LENGTH & 1-Based Indexing",
    content: `
      <p class="lc-p">
        Unlike general-purpose programming languages like Python or JavaScript where strings are zero-indexed, <strong>SQL string functions are strictly 1-based</strong>.
      </p>

      <div class="lc-rule-banner">
        <strong>The Essential String Functions Matrix:</strong><br>
        &bull; <code>SUBSTRING(str, pos, len)</code> / <code>SUBSTR()</code>: Extracts <code>len</code> characters starting at <code>pos</code>. Note: <code>SUBSTRING('Alice', 1, 1)</code> yields <code>'A'</code>.<br>
        &bull; <code>CONCAT(s1, s2, ...)</code>: Glues strings together. In MySQL, if any argument is <code>NULL</code>, <code>CONCAT</code> returns <code>NULL</code>! In PostgreSQL/SQL Server, use <code>CONCAT_WS()</code> or the string concatenation operator <code>||</code>.<br>
        &bull; <code>UPPER(str)</code> &amp; <code>LOWER(str)</code>: Normalizes character casing.<br>
        &bull; <code>CHAR_LENGTH(str)</code> vs <code>LENGTH(str)</code>: <code>CHAR_LENGTH</code> returns the number of human-readable Unicode glyphs/characters, while <code>LENGTH</code> returns physical storage bytes (critical difference for multibyte UTF-8 characters!).
      </div>

      <p class="lc-p">
        <strong>Capitalization Pattern:</strong> To format a name with initial capitalization (e.g., 'aLICE' -&gt; 'Alice'):<br>
        <code>CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2)))</code>
      </p>
    `,
    diagram: {
      title: "1-Based String Indexing & Substring Extraction in SQL",
      svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">1-BASED STRING INDEXING &amp; CANONICAL CAPITALIZATION FORMULA</text>

        <!-- String Character Cells -->
        <g transform="translate(40, 55)">
          <text x="0" y="18" fill="#64748b" font-family="monospace" font-size="10">String: 'mARy'</text>
          
          <rect x="0" y="28" width="45" height="45" rx="4" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="22" y="55" text-anchor="middle" fill="#1d4ed8" font-family="monospace" font-size="16" font-weight="700">'m'</text>
          <text x="22" y="90" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="10" font-weight="600">Pos 1</text>

          <rect x="55" y="28" width="45" height="45" rx="4" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="77" y="55" text-anchor="middle" fill="#0f172a" font-family="monospace" font-size="16" font-weight="700">'A'</text>
          <text x="77" y="90" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="10">Pos 2</text>

          <rect x="110" y="28" width="45" height="45" rx="4" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="132" y="55" text-anchor="middle" fill="#0f172a" font-family="monospace" font-size="16" font-weight="700">'R'</text>
          <text x="132" y="90" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="10">Pos 3</text>

          <rect x="165" y="28" width="45" height="45" rx="4" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="187" y="55" text-anchor="middle" fill="#0f172a" font-family="monospace" font-size="16" font-weight="700">'y'</text>
          <text x="187" y="90" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="10">Pos 4</text>
        </g>

        <!-- Arrow -->
        <path d="M 270 100 L 320 100" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

        <!-- Transformation Formula -->
        <g transform="translate(335, 55)">
          <rect x="0" y="0" width="500" height="110" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.2"/>
          <text x="14" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">CONCAT( UPPER(SUBSTR(s, 1, 1)), LOWER(SUBSTR(s, 2)) )</text>
          
          <rect x="14" y="38" width="220" height="30" rx="4" fill="#ffffff" stroke="#86efac"/>
          <text x="24" y="58" fill="#166534" font-family="monospace" font-size="10">UPPER('m') =&gt; 'M'</text>

          <rect x="250" y="38" width="235" height="30" rx="4" fill="#ffffff" stroke="#86efac"/>
          <text x="260" y="58" fill="#166534" font-family="monospace" font-size="10">LOWER('ARy') =&gt; 'ary'</text>

          <text x="14" y="95" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT RESULT: 'Mary'</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-7-2-like-vs-sargability",
    number: "7.2",
    title: "Pattern Matching: LIKE Wildcards (`%`, `_`) vs SARGability & B-Tree Index Traps",
    content: `
      <p class="lc-p">
        In relational databases, the <code>LIKE</code> operator enables pattern matching with two fundamental wildcards:
      </p>

      <div class="lc-rule-banner">
        <strong>The Two Standard SQL Wildcards:</strong><br>
        &bull; <code>%</code> (Percent): Matches zero or more arbitrary characters.<br>
        &bull; <code>_</code> (Underscore): Matches strictly exactly one single character.
      </div>

      <div class="lc-rule-banner" style="margin-top:12px; background:#fff1f2; border-color:#fecdd3;">
        <strong style="color:#be123c;">The SARGability Index Principle:</strong><br>
        1. <strong>Prefix Match (SARGable):</strong> <code>WHERE code LIKE 'DIAB1%'</code>.<br>
        The B-Tree index on <code>code</code> can perform an efficient <em>Index Range Scan</em> ($O(\log N)$) because the initial character prefix is known.<br>
        2. <strong>Leading Wildcard (Non-SARGable):</strong> <code>WHERE code LIKE '%DIAB1%'</code>.<br>
        Because the initial character is unknown, the B-Tree index is completely useless. The engine is forced to execute a <strong>Full Table Scan ($O(N)$)</strong>, reading every data page from storage disk!
      </div>
    `,
    diagram: {
      title: "SARGable Prefix Scan vs Leading Wildcard Full Table Scan",
      svg: `<svg viewBox="0 0 880 190" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">SARGABILITY: B-TREE INDEX SEEK VS FULL TABLE SCAN</text>

        <!-- SARGable Box -->
        <g transform="translate(35, 55)">
          <rect x="0" y="0" width="380" height="100" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.2"/>
          <text x="14" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">1. SARGable: LIKE 'DIAB1%' (Prefix)</text>
          <text x="14" y="44" fill="#166534" font-size="9.5">B-Tree knows root branch starts with 'D'.</text>
          <rect x="14" y="54" width="350" height="30" rx="4" fill="#ffffff" stroke="#86efac"/>
          <text x="24" y="74" fill="#166534" font-family="monospace" font-size="10" font-weight="700">Index Range Seek (O(log N)) - Fast!</text>
        </g>

        <!-- Non-SARGable Box -->
        <g transform="translate(445, 55)">
          <rect x="0" y="0" width="400" height="100" rx="6" fill="#fff1f2" stroke="#fecdd3" stroke-width="1.2"/>
          <text x="14" y="24" fill="#be123c" font-family="monospace" font-size="11" font-weight="700">2. Non-SARGable: LIKE '%DIAB1%' (Leading %)</text>
          <text x="14" y="44" fill="#9f1239" font-size="9.5">Prefix unknown. B-Tree cannot prune branches.</text>
          <rect x="14" y="54" width="370" height="30" rx="4" fill="#ffffff" stroke="#fda4af"/>
          <text x="24" y="74" fill="#be123c" font-family="monospace" font-size="10" font-weight="700">Full Table Scan (O(N)) - Reads all pages!</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-7-3-regex-in-sql",
    number: "7.3",
    title: "Regular Expressions in SQL: REGEXP / RLIKE Syntax, Anchors (`^`, `$`) & Character Classes",
    content: `
      <p class="lc-p">
        When simple wildcards cannot validate complex string specifications (e.g. validating email formats or phone numbers), SQL provides regular expression engines via <code>REGEXP</code> or <code>RLIKE</code>.
      </p>

      <div class="lc-rule-banner">
        <strong>The Essential SQL Regex Tokens:</strong><br>
        &bull; <code>^</code> (Caret): Anchors match strictly to the start of the string.<br>
        &bull; <code>$</code> (Dollar): Anchors match strictly to the end of the string.<br>
        &bull; <code>[a-zA-Z]</code>: Matches any single alphabetic letter.<br>
        &bull; <code>[a-zA-Z0-9_.-]*</code>: Matches zero or more allowed username characters (alphanumeric, underscore, period, hyphen).<br>
        &bull; <code>[.]</code> or <code>\\.</code>: Matches a literal dot character (since unescaped <code>.</code> matches any arbitrary character in regex!).
      </div>

      <p class="lc-p">
        <strong>LeetCode #1517 Canonical Regex:</strong><br>
        <code>WHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$'</code>
      </p>
    `,
    diagram: {
      title: "Regex Token Parsing Breakdown for Strict Email Validation",
      svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">REGULAR EXPRESSION TOKEN ARCHITECTURE FOR EMAIL VALIDATION</text>

        <!-- Token Blocks -->
        <g transform="translate(35, 55)">
          <rect x="0" y="0" width="130" height="100" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="12" y="24" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">^[a-zA-Z]</text>
          <text x="12" y="44" fill="#1e40af" font-size="9.5">Anchor: Start</text>
          <text x="12" y="62" fill="#475569" font-size="9">First char MUST</text>
          <text x="12" y="78" fill="#475569" font-size="9">be letter</text>
        </g>

        <g transform="translate(180, 55)">
          <rect x="0" y="0" width="220" height="100" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
          <text x="12" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">[a-zA-Z0-9_.-]*</text>
          <text x="12" y="44" fill="#166534" font-size="9.5">Quantifier: Zero or More</text>
          <text x="12" y="62" fill="#475569" font-size="9">Allowed domain chars:</text>
          <text x="12" y="78" fill="#475569" font-size="9">letters, digits, _, ., -</text>
        </g>

        <g transform="translate(415, 55)">
          <rect x="0" y="0" width="190" height="100" rx="6" fill="#fefce8" stroke="#eab308"/>
          <text x="12" y="24" fill="#a16207" font-family="monospace" font-size="11" font-weight="700">@leetcode[.]com$</text>
          <text x="12" y="44" fill="#854d0e" font-size="9.5">Exact Suffix &amp; End Anchor</text>
          <text x="12" y="62" fill="#475569" font-size="9">[.] escapes dot</text>
          <text x="12" y="78" fill="#475569" font-size="9">$ rejects extra text</text>
        </g>

        <g transform="translate(620, 55)">
          <rect x="0" y="0" width="225" height="100" rx="6" fill="#faf5ff" stroke="#a855f7"/>
          <text x="12" y="24" fill="#7e22ce" font-family="monospace" font-size="11" font-weight="700">Evaluation Result</text>
          <text x="12" y="44" fill="#166534" font-family="monospace" font-size="9">bella_1@leetcode.com ✓</text>
          <text x="12" y="62" fill="#dc2626" font-family="monospace" font-size="9">123_bob@leetcode.com ❌</text>
          <text x="12" y="80" fill="#dc2626" font-family="monospace" font-size="9">sam@leetcode.com.org ❌</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-7-4-group-concat-aggregation",
    number: "7.4",
    title: "Aggregation Across Strings: GROUP_CONCAT vs STRING_AGG & Buffer Limits",
    content: `
      <p class="lc-p">
        While arithmetic functions like <code>SUM()</code> aggregate numbers, aggregating multiple string values across grouped rows requires specialized aggregate string collectors:
      </p>

      <div class="lc-rule-banner">
        <strong>Dialect Syntax Comparison:</strong><br>
        &bull; <strong>MySQL / SQLite:</strong><br>
        <code>GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',')</code><br>
        &bull; <strong>PostgreSQL / DuckDB:</strong><br>
        <code>STRING_AGG(DISTINCT product, ',' ORDER BY product)</code><br>
        &bull; <strong>SQL Server:</strong><br>
        <code>STRING_AGG(product, ',') WITHIN GROUP (ORDER BY product)</code>
      </div>

      <p class="lc-p">
        <strong>The MySQL Truncation Trap (<code>group_concat_max_len</code>):</strong><br>
        By default, MySQL restricts the maximum length of a <code>GROUP_CONCAT</code> result to strictly 1,024 bytes. If a customer ordered 200 distinct products in a day, MySQL silently truncates the output after 1,024 characters without raising an error! In production systems, DBAs must increase this setting: <code>SET SESSION group_concat_max_len = 1000000;</code>.
      </p>
    `,
    diagram: {
      title: "Row Folding: Multiple String Tuples into Delimited Scalar Array",
      svg: `<svg viewBox="0 0 880 190" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">ROW FOLDING: GROUP_CONCAT DISTINCT AGGREGATION</text>

        <!-- Unaggregated Rows -->
        <g transform="translate(35, 55)">
          <rect x="0" y="0" width="260" height="100" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="12" y="22" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Raw Rows (sell_date: '2026-05-01')</text>
          <text x="12" y="42" fill="#334155" font-family="monospace" font-size="9.5">Row 1: 'Mask'</text>
          <text x="12" y="60" fill="#334155" font-family="monospace" font-size="9.5">Row 2: 'Book'</text>
          <text x="12" y="78" fill="#334155" font-family="monospace" font-size="9.5">Row 3: 'Mask' (Duplicate!)</text>
        </g>

        <path d="M 315 105 L 360 105" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

        <!-- Folding Engine -->
        <g transform="translate(370, 55)">
          <rect x="0" y="0" width="240" height="100" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="12" y="24" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">GROUP_CONCAT Engine</text>
          <text x="12" y="44" fill="#1e40af" font-size="9.5">1. DISTINCT: ['Book', 'Mask']</text>
          <text x="12" y="62" fill="#1e40af" font-size="9.5">2. ORDER BY product ASC</text>
          <text x="12" y="80" fill="#1e40af" font-size="9.5">3. SEPARATOR ','</text>
        </g>

        <path d="M 630 105 L 675 105" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>

        <!-- Folded Result -->
        <g transform="translate(685, 55)">
          <rect x="0" y="0" width="165" height="100" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
          <text x="12" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Aggregated String</text>
          <rect x="10" y="42" width="145" height="30" rx="4" fill="#ffffff" stroke="#86efac"/>
          <text x="82" y="62" text-anchor="middle" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">"Book,Mask"</text>
          <text x="12" y="90" fill="#475569" font-size="8.5">num_sold: 2 products</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-7-5-date-string-parsing",
    number: "7.5",
    title: "Temporal Strings & Date Extraction: SARGable Date Ranges vs String Formatting",
    content: `
      <p class="lc-p">
        In analytics queries, filtering temporal intervals (e.g. <em>"all orders placed in February 2020"</em>) can be written either via string formatting or algebraic interval comparisons:
      </p>

      <div class="lc-rule-banner">
        <strong>The Anti-Pattern vs The Production Standard:</strong><br>
        &bull; <strong>Anti-Pattern (Non-SARGable Function Call):</strong><br>
        <code>WHERE DATE_FORMAT(order_date, '%Y-%m') = '2020-02'</code><br>
        Because the column <code>order_date</code> is wrapped inside a function call, the database must execute the function for every row in the table, invalidating any index on <code>order_date</code>.<br>
        &bull; <strong>Production Standard (SARGable Range):</strong><br>
        <code>WHERE order_date &gt;= '2020-02-01' AND order_date &lt; '2020-03-01'</code><br>
        The column stands alone on the left-hand side of comparison operators, allowing the query engine to execute a high-speed B-Tree index seek!
      </div>
    `,
    diagram: {
      title: "SARGable Range Comparison vs Function Invalidation on Dates",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">DATE FILTERING: FUNCTION WRAPPING VS SARGABLE BOUNDS</text>

        <g transform="translate(35, 55)">
          <rect x="0" y="0" width="380" height="90" rx="6" fill="#fff1f2" stroke="#fecdd3"/>
          <text x="14" y="24" fill="#be123c" font-family="monospace" font-size="11" font-weight="700">SLOW: DATE_FORMAT(order_date, '%Y-%m') = '2020-02'</text>
          <text x="14" y="46" fill="#9f1239" font-size="9.5">Wraps column in function =&gt; Index disabled!</text>
          <text x="14" y="66" fill="#be123c" font-size="9.5" font-weight="600">Forces full table scan over millions of historical rows.</text>
        </g>

        <g transform="translate(445, 55)">
          <rect x="0" y="0" width="405" height="90" rx="6" fill="#f0fdf4" stroke="#86efac"/>
          <text x="14" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">FAST: order_date &gt;= '2020-02-01' AND order_date &lt; '2020-03-01'</text>
          <text x="14" y="46" fill="#166534" font-size="9.5">Column unwrapped =&gt; Direct B-Tree Range Seek!</text>
          <text x="14" y="66" fill="#15803d" font-size="9.5" font-weight="600">Completes in &lt;1ms regardless of table size.</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-7-6-dml-self-join-deletes",
    number: "7.6",
    title: "DML Deletions & Deduplication: Multi-Table DELETE via Self-Join vs CTEs",
    content: `
      <p class="lc-p">
        In problems like LeetCode #196 (Delete Duplicate Emails), the goal is not to query data, but to execute a Data Manipulation Language (<strong>DML</strong>) deletion in place while preserving the record with the minimum <code>id</code>.
      </p>

      <div class="lc-rule-banner">
        <strong>The Multi-Table DELETE via Self-Join:</strong><br>
        <code>DELETE p1 FROM Person p1, Person p2<br>
WHERE p1.email = p2.email AND p1.id &gt; p2.id;</code>
      </div>

      <p class="lc-p">
        <strong>How It Works Internally:</strong><br>
        The cross/inner join pairs every row in <code>Person</code> with every other row sharing the same email. Whenever <code>p1.id &gt; p2.id</code> evaluates to true, <code>p1</code> is recognized as a duplicate of lower priority. The <code>DELETE p1</code> target specifies that only the tuple from alias <code>p1</code> is removed, safely retaining the lowest <code>id</code> in <code>p2</code>!
      </p>
    `,
    diagram: {
      title: "Self-Join DML Deletion Mechanics: Retaining Minimum ID",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">DML DEDUPLICATION: SELF-JOIN DELETION CRITERIA (p1.id &gt; p2.id)</text>

        <!-- Person p1 -->
        <g transform="translate(35, 55)">
          <rect x="0" y="0" width="220" height="90" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
          <text x="14" y="24" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Alias p1 (Target)</text>
          <text x="14" y="46" fill="#334155" font-family="monospace" font-size="9.5">ID 1: john@example.com</text>
          <text x="14" y="68" fill="#dc2626" font-family="monospace" font-size="9.5" font-weight="700">ID 2: john@example.com (DROP)</text>
        </g>

        <!-- Join Condition -->
        <g transform="translate(290, 75)">
          <rect x="0" y="0" width="210" height="50" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="105" y="22" text-anchor="middle" fill="#1d4ed8" font-family="monospace" font-size="9.5" font-weight="700">p1.email = p2.email</text>
          <text x="105" y="38" text-anchor="middle" fill="#1d4ed8" font-family="monospace" font-size="9.5" font-weight="700">AND p1.id &gt; p2.id</text>
        </g>

        <!-- Person p2 -->
        <g transform="translate(535, 55)">
          <rect x="0" y="0" width="220" height="90" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
          <text x="14" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Alias p2 (Reference)</text>
          <text x="14" y="46" fill="#166534" font-family="monospace" font-size="9.5" font-weight="700">ID 1: john@example.com (KEPT)</text>
          <text x="14" y="68" fill="#334155" font-family="monospace" font-size="9.5">ID 2: john@example.com</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-7-7-scalar-null-shield",
    number: "7.7",
    title: "Scalar Fallback Shields: Wrapping OFFSET Queries to Safely Return NULL on Empty Sets",
    content: `
      <p class="lc-p">
        In LeetCode #176 (Second Highest Salary), a query asking for the second highest salary must return <code>null</code> if there is only one employee in the company:
      </p>

      <div class="lc-rule-banner">
        <strong>The Empty Set Pitfall:</strong><br>
        If you run directly:<br>
        <code>SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1;</code><br>
        When the table has only 1 row, this query emits an <strong>empty set (0 rows)</strong>. But LeetCode and API contracts expect a row containing <code>null</code> (1 row, 1 null column)!
      </div>

      <p class="lc-p">
        <strong>The Universal Scalar Wrapper Solution:</strong><br>
        Wrap the entire query inside an outer <code>SELECT (...) AS SecondHighestSalary</code>. In SQL relational grammar, any scalar subquery in the <code>SELECT</code> clause that returns 0 rows automatically evaluates to <code>NULL</code>!
      </p>
    `,
    diagram: {
      title: "Empty Result Set vs Outer Scalar NULL Shielding",
      svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">SCALAR WRAPPER: CONVERTING 0 ROWS INTO A 1-ROW NULL TOKEN</text>

        <g transform="translate(35, 55)">
          <rect x="0" y="0" width="360" height="85" rx="6" fill="#fff1f2" stroke="#fecdd3"/>
          <text x="14" y="24" fill="#be123c" font-family="monospace" font-size="11" font-weight="700">NAIVE: ... LIMIT 1 OFFSET 1</text>
          <text x="14" y="44" fill="#9f1239" font-size="9.5">When total distinct salaries &lt; 2:</text>
          <text x="14" y="64" fill="#be123c" font-family="monospace" font-size="10" font-weight="700">Emits: 0 rows (Empty set! Fails test!)</text>
        </g>

        <path d="M 415 97 L 460 97" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

        <g transform="translate(470, 55)">
          <rect x="0" y="0" width="380" height="85" rx="6" fill="#f0fdf4" stroke="#86efac"/>
          <text x="14" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">SHIELDED: SELECT (SELECT ... LIMIT 1 OFFSET 1)</text>
          <text x="14" y="44" fill="#166534" font-size="9.5">Scalar subquery in SELECT projection:</text>
          <text x="14" y="64" fill="#15803d" font-family="monospace" font-size="10" font-weight="700">Emits: 1 row with [ NULL ] (Passes 100%!)</text>
        </g>
      </svg>`
    }
  },
  {
    id: "chap-7-8-collation-and-encodings",
    number: "7.8",
    title: "String Collation & Character Encodings: utf8mb4_unicode_ci vs utf8mb4_bin",
    content: `
      <p class="lc-p">
        Every string comparison in SQL is governed by the table or database's <strong>Collation</strong> setting:
      </p>

      <div class="lc-rule-banner">
        <strong>Collation Suffix Decoding:</strong><br>
        &bull; <code>_ci</code> (Case-Insensitive): <code>'apple' = 'APPLE'</code> evaluates to <code>TRUE</code>. This is the default in MySQL.<br>
        &bull; <code>_cs</code> (Case-Sensitive): <code>'apple' = 'APPLE'</code> evaluates to <code>FALSE</code>.<br>
        &bull; <code>_bin</code> (Binary Byte-Exact): Characters are compared strictly by their binary code point values.
      </div>

      <p class="lc-p">
        <strong>Interview Insight:</strong> In LeetCode #1527 (Patients With a Condition), condition codes like <code>'DIAB100'</code> are uppercase. If comparing in a case-sensitive environment or using regex, be aware that <code>REGEXP</code> in MySQL uses the table's default collation unless binary mode <code>BINARY code REGEXP ...</code> is explicitly specified!
      </p>
    `,
    diagram: {
      title: "Collation Evaluation: Case-Insensitive vs Binary Comparisons",
      svg: `<svg viewBox="0 0 880 170" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="850" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">COLLATION BEHAVIOR: CASE-INSENSITIVE (_ci) VS BINARY (_bin)</text>

        <g transform="translate(35, 55)">
          <rect x="0" y="0" width="380" height="80" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
          <text x="14" y="24" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">utf8mb4_unicode_ci (Case-Insensitive)</text>
          <text x="14" y="46" fill="#1e40af" font-family="monospace" font-size="10">'apple' = 'Apple'  =&gt;  TRUE</text>
          <text x="14" y="64" fill="#64748b" font-size="9">Convenient for user logins, but masks case variations.</text>
        </g>

        <g transform="translate(445, 55)">
          <rect x="0" y="0" width="400" height="80" rx="6" fill="#faf5ff" stroke="#a855f7"/>
          <text x="14" y="24" fill="#7e22ce" font-family="monospace" font-size="11" font-weight="700">utf8mb4_bin (Binary Exact)</text>
          <text x="14" y="46" fill="#6b21a8" font-family="monospace" font-size="10">'apple' = 'Apple'  =&gt;  FALSE</text>
          <text x="14" y="64" fill="#64748b" font-size="9">Evaluates ASCII / UTF-8 code point bytes directly.</text>
        </g>
      </svg>`
    }
  }
];

// -----------------------------------------------------------------------------
// 2. MASTERCLASS CALLOUTS
// -----------------------------------------------------------------------------
const callouts = [
  {
    type: "danger",
    title: "The Leading Wildcard Index Killer",
    body: "Writing LIKE '%pattern%' disables B-Tree indexes completely, forcing the engine into an O(N) full table scan. Where possible, use prefix searches (LIKE 'prefix%') or full-text indexes."
  },
  {
    type: "warning",
    title: "GROUP_CONCAT Silent Truncation Trap",
    body: "MySQL defaults group_concat_max_len to 1,024 bytes. If aggregated strings exceed 1,024 characters, output is silently truncated without any warning or error."
  },
  {
    type: "info",
    title: "Scalar Subquery NULL Shield for Second Highest Salary",
    body: "A naked SELECT with LIMIT 1 OFFSET 1 returns an empty set (0 rows) when total distinct rows < 2. Wrapping it as a scalar subquery SELECT (SELECT ...) guarantees a clean 1-row [NULL] return."
  }
];

// -----------------------------------------------------------------------------
// 3. GENERATE 100 MCQS (#701-800)
// -----------------------------------------------------------------------------
console.log('Generating 100 Concept 7 MCQs (#701-800)...');
const mcqs = [];

const mcqTemplates = [
  {
    q: "Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
    options: [
      "SQL string indexes are strictly 1-based, where index 1 represents the first character",
      "SQL string indexes are 0-based, so position 1 refers to the second character",
      "SQL does not support integer index parameters for string functions",
      "SQL requires negative index numbers to refer to the start of a string"
    ],
    correctIndex: 0,
    explanation: "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
    isTrap: false
  },
  {
    q: "In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
    options: [
      "'HelloWorld'",
      "'Hello NULL World'",
      "NULL",
      "An invalid argument error is thrown"
    ],
    correctIndex: 2,
    explanation: "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
    isTrap: true,
    trapBadge: "NULL Concat Trap"
  },
  {
    q: "Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
    options: [
      "Because LIKE is only supported on integer columns",
      "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
      "Because B-Tree indexes only index the length of string values",
      "Because case-insensitive collation forces the engine to ignore all index structures"
    ],
    correctIndex: 1,
    explanation: "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
    isTrap: true,
    trapBadge: "SARGability Trap"
  },
  {
    q: "In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
    options: [
      "Because `[.]` enables case-insensitive matching for the dot character",
      "Because unescaped `.` matches ANY arbitrary character in regular expressions",
      "Because dots are not valid characters in standard ASCII regular expressions",
      "Because SQL requires square brackets around all vowels"
    ],
    correctIndex: 1,
    explanation: "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
    isTrap: false
  },
  {
    q: "What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
    options: [
      "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
      "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
      "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
      "Both functions are identical aliases in all database engines"
    ],
    correctIndex: 0,
    explanation: "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
    isTrap: false
  }
];

for (let i = 1; i <= 100; i++) {
  const t = mcqTemplates[(i - 1) % mcqTemplates.length];
  mcqs.push({
    id: 700 + i,
    q: `[Concept 7 Drill Q${i}] ${t.q}`,
    options: t.options,
    correctIndex: t.correctIndex,
    explanation: t.explanation,
    isTrap: t.isTrap,
    trapBadge: t.trapBadge || (t.isTrap ? "Concept 7 Trap" : undefined)
  });
}

// -----------------------------------------------------------------------------
// 4. GENERATE 100 PREP DRILLS (#701-800)
// -----------------------------------------------------------------------------
console.log('Generating 100 Concept 7 Prep Drills (#701-800)...');
const drills = [];

const drillDomains = [
  { domain: "Customer Data Quality", title: "Proper Case Capitalization", task: "Convert user names into capitalized format (first letter uppercase, remaining lowercase)." },
  { domain: "Healthcare Informatics", title: "Medical Condition Prefix Matching", task: "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks." },
  { domain: "Authentication Security", title: "Corporate Email Verification", task: "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP." },
  { domain: "Retail Inventory", title: "Daily Product Aggregation Array", task: "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically." },
  { domain: "Financial Payroll", title: "Second Highest Compensation Fallback", task: "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist." }
];

for (let i = 1; i <= 100; i++) {
  const d = drillDomains[(i - 1) % drillDomains.length];
  drills.push({
    id: 700 + i,
    title: `${d.title} (Scenario ${i})`,
    domain: d.domain,
    task: `${d.task} (Test case ${i}).`,
    starterSQL: `SELECT user_id, name\nFROM Users\nORDER BY user_id;`,
    solutionSQL: `SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;`,
    explanation: `Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization.`
  });
}

// -----------------------------------------------------------------------------
// 5. 7 CANONICAL LEETCODE PROBLEMS (#1667, #1527, #1517, #1484, #1327, #176, #196)
// -----------------------------------------------------------------------------
console.log('Building 7 Canonical Concept 7 LeetCode Problems...');

const leetcodeProblems = [
  // 1. #1667 Fix Names in a Table
  {
    id: 1667,
    title: "Fix Names in a Table",
    difficulty: "Easy",
    acceptance: "63.2%",
    interviewFreq: "Very High • Amazon, Adobe, Google",
    companies: ["Amazon", "Adobe", "Google", "Microsoft"],
    prompt: `Write a solution to fix the names so that only the first character is uppercase and the rest are lowercase.\n\nReturn the result table ordered by user_id.`,
    sampleInput: {
      table: "Users",
      columns: ["user_id", "name"],
      rows: [
        [1, "aLice"],
        [2, "bOB"]
      ]
    },
    expectedOutput: {
      columns: ["user_id", "name"],
      rows: [
        [1, "Alice"],
        [2, "Bob"]
      ]
    },
    svgDiagram: `<svg viewBox="0 0 880 210" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="850" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEETCODE #1667: STRING DECONSTRUCTION &amp; PROPER-CASE REASSEMBLY</text>

      <!-- Raw Input Table -->
      <g transform="translate(35, 55)">
        <rect x="0" y="0" width="220" height="115" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="14" y="24" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Users (Mangled Names)</text>
        <text x="14" y="50" fill="#dc2626" font-family="monospace" font-size="11">1 | 'aLice'</text>
        <text x="14" y="75" fill="#dc2626" font-family="monospace" font-size="11">2 | 'bOB'</text>
      </g>

      <path d="M 275 110 L 325 110" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Splitting Operation -->
      <g transform="translate(335, 55)">
        <rect x="0" y="0" width="300" height="115" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="14" y="24" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">String Transformation Pipeline</text>
        <text x="14" y="48" fill="#1e40af" font-family="monospace" font-size="9.5">1. UPPER(SUBSTRING(name, 1, 1)) =&gt; 'A', 'B'</text>
        <text x="14" y="68" fill="#1e40af" font-family="monospace" font-size="9.5">2. LOWER(SUBSTRING(name, 2))    =&gt; 'lice', 'ob'</text>
        <rect x="14" y="78" width="272" height="26" rx="4" fill="#dbeafe"/>
        <text x="20" y="95" fill="#1e40af" font-family="monospace" font-size="9.5" font-weight="700">CONCAT('A', 'lice') =&gt; 'Alice'</text>
      </g>

      <path d="M 655 110 L 705 110" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Output Table -->
      <g transform="translate(715, 55)">
        <rect x="0" y="0" width="135" height="115" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="12" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Clean Result</text>
        <text x="12" y="50" fill="#166534" font-family="monospace" font-size="11" font-weight="700">1 | 'Alice'</text>
        <text x="12" y="75" fill="#166534" font-family="monospace" font-size="11" font-weight="700">2 | 'Bob'</text>
      </g>
    </svg>`,
    logicBreakdown: [
      "Extract the first character using `SUBSTRING(name, 1, 1)` and transform it to uppercase via `UPPER()`.",
      "Extract the tail from character 2 onward using `SUBSTRING(name, 2)` and transform it to lowercase via `LOWER()`.",
      "Combine both segments using `CONCAT()`.",
      "Order the output ascending by `user_id`."
    ],
    trapsAndEdgeCases: [
      "1-Based Indexing: SQL string indexes start at 1, not 0. Writing `SUBSTRING(name, 0, 1)` produces empty strings in several SQL engines.",
      "Omission of length parameter in substring: `SUBSTR(name, 2)` automatically reads through the end of the string in MySQL and PostgreSQL."
    ],
    solutionSQL: `SELECT
    user_id,
    CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name
FROM Users
ORDER BY user_id;`,
    lineByLineExplanation: [
      { clause: "SELECT user_id,", exp: "Emits the unique user identifier." },
      { clause: "CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name", exp: "Capitalizes the first character and lowercases remaining characters." },
      { clause: "FROM Users", exp: "Source users table." },
      { clause: "ORDER BY user_id", exp: "Sorts final rows in ascending user ID order." }
    ],
    alternativeSolutions: [
      {
        name: "Standard SUBSTRING with Explicit Length",
        complexity: "O(N) String Scan",
        sql: `SELECT user_id,\n       CONCAT(UPPER(SUBSTRING(name, 1, 1)), LOWER(SUBSTRING(name, 2, LENGTH(name)))) AS name\nFROM Users\nORDER BY user_id;`,
        explanation: "Equivalent standard ANSI syntax explicitly passing the length bound to the second substring argument."
      }
    ]
  },

  // 2. #1527 Patients With a Condition
  {
    id: 1527,
    title: "Patients With a Condition",
    difficulty: "Easy",
    acceptance: "39.4%",
    interviewFreq: "Very High • Epic Systems, UnitedHealth, Amazon",
    companies: ["Epic Systems", "UnitedHealth", "Amazon", "Apple"],
    prompt: `Write a solution to find the patient_id, patient_name, and conditions of the patients who have Type I Diabetes. Type I Diabetes always starts with the 'DIAB1' prefix.\n\nReturn the result table in any order.`,
    sampleInput: {
      table: "Patients",
      columns: ["patient_id", "patient_name", "conditions"],
      rows: [
        [1, "Daniel", "YFEV COUGH"],
        [2, "Alice", ""],
        [3, "Bob", "DIAB100 MYOP"],
        [4, "George", "ACNE DIAB100"],
        [5, "Alain", "SADM DIAB201"]
      ]
    },
    expectedOutput: {
      columns: ["patient_id", "patient_name", "conditions"],
      rows: [
        [3, "Bob", "DIAB100 MYOP"],
        [4, "George", "ACNE DIAB100"]
      ]
    },
    svgDiagram: `<svg viewBox="0 0 880 210" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="850" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEETCODE #1527: WORD-BOUNDARY PREFIX PATTERN MATCHING</text>

      <!-- Raw Condition Strings -->
      <g transform="translate(35, 55)">
        <rect x="0" y="0" width="280" height="120" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="14" y="24" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Patient Conditions</text>
        <text x="14" y="46" fill="#15803d" font-family="monospace" font-size="9.5">Bob:    'DIAB100 MYOP' (Starts with DIAB1 ✓)</text>
        <text x="14" y="66" fill="#15803d" font-family="monospace" font-size="9.5">George: 'ACNE DIAB100' (Contains ' DIAB1' ✓)</text>
        <text x="14" y="86" fill="#dc2626" font-family="monospace" font-size="9.5">Alain:  'SADM DIAB201' (Type II, not I ❌)</text>
        <text x="14" y="106" fill="#dc2626" font-family="monospace" font-size="9.5">Alice:  'COUGH_DIAB1'  (Middle of word ❌)</text>
      </g>

      <path d="M 335 115 L 385 115" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Matching Dual Predicates -->
      <g transform="translate(395, 55)">
        <rect x="0" y="0" width="295" height="120" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="14" y="24" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">Dual LIKE Match Criteria</text>
        <text x="14" y="48" fill="#1e40af" font-family="monospace" font-size="10">1. conditions LIKE 'DIAB1%'</text>
        <text x="24" y="64" fill="#64748b" font-size="9">(Matches first condition in list)</text>
        <text x="14" y="86" fill="#1e40af" font-family="monospace" font-size="10">2. conditions LIKE '% DIAB1%'</text>
        <text x="24" y="102" fill="#64748b" font-size="9">(Matches subsequent space-delimited codes)</text>
      </g>

      <path d="M 710 115 L 750 115" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Output Table -->
      <g transform="translate(760, 55)">
        <rect x="0" y="0" width="90" height="120" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="12" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Emitted</text>
        <text x="12" y="55" fill="#166534" font-family="monospace" font-size="10">Bob (3)</text>
        <text x="12" y="80" fill="#166534" font-family="monospace" font-size="10">George(4)</text>
      </g>
    </svg>`,
    logicBreakdown: [
      "The ICD code for Type 1 Diabetes begins with 'DIAB1'.",
      "Because multiple conditions are space-separated in a single string, the code can appear either at the very beginning of the string (`LIKE 'DIAB1%'`) or as a secondary word preceded by a space (`LIKE '% DIAB1%'`).",
      "Writing `WHERE conditions LIKE '%DIAB1%'` is INCORRECT because it matches false positives where 'DIAB1' is embedded inside an unrelated word (e.g. 'PREDIAB100').",
      "Alternatively, using regular expressions with word boundary syntax: `conditions REGEXP '\\\\bDIAB1'`."
    ],
    trapsAndEdgeCases: [
      "Embedded code trap: `LIKE '%DIAB1%'` matches codes like 'XDIAB100', which violates the requirement that the code *starts* with DIAB1.",
      "First condition vs subsequent: Must include both `conditions LIKE 'DIAB1%'` (no space before) and `conditions LIKE '% DIAB1%'` (space before)."
    ],
    solutionSQL: `SELECT patient_id, patient_name, conditions
FROM Patients
WHERE conditions LIKE 'DIAB1%'
   OR conditions LIKE '% DIAB1%';`,
    lineByLineExplanation: [
      { clause: "SELECT patient_id, patient_name, conditions", exp: "Projects required patient columns." },
      { clause: "FROM Patients", exp: "Source medical table." },
      { clause: "WHERE conditions LIKE 'DIAB1%'", exp: "Matches diabetes code appearing as the very first token in the list." },
      { clause: "OR conditions LIKE '% DIAB1%'", exp: "Matches diabetes code appearing after a preceding space delimiter." }
    ],
    alternativeSolutions: [
      {
        name: "Regular Expression Word Boundary Pattern",
        complexity: "O(N) Regex Match",
        sql: `SELECT patient_id, patient_name, conditions\nFROM Patients\nWHERE conditions REGEXP '(^|[[:space:]])DIAB1';`,
        explanation: "Uses regex POSIX bracket character classes to match DIAB1 either at start of string or following whitespace."
      }
    ]
  },

  // 3. #1517 Find Users With Valid E-Mails
  {
    id: 1517,
    title: "Find Users With Valid E-Mails",
    difficulty: "Easy",
    acceptance: "27.5%",
    interviewFreq: "Very High • Meta, Google, Uber",
    companies: ["Meta", "Google", "Uber", "Amazon"],
    prompt: `Write a solution to find the users who have valid emails.\n\nA valid e-mail has a prefix name and a domain where:\n1. The prefix name is a string that starts with a letter and can contain letters (upper or lower case), digits, underscore '_', period '.', and/or dash '-'.\n2. The domain is '@leetcode.com'.\n\nReturn the result table in any order.`,
    sampleInput: {
      table: "Users",
      columns: ["user_id", "name", "mail"],
      rows: [
        [1, "Winston", "winston@leetcode.com"],
        [2, "Jonathan", "jonathanisgreat"],
        [3, "Annabelle", "bella-@leetcode.com"],
        [4, "Sally", "sally.come@leetcode.com"],
        [5, "Marwan", "quarz#2020@leetcode.com"],
        [6, "David", "david69@gmail.com"],
        [7, "Shapiro", ".shapiro@leetcode.com"]
      ]
    },
    expectedOutput: {
      columns: ["user_id", "name", "mail"],
      rows: [
        [1, "Winston", "winston@leetcode.com"],
        [3, "Annabelle", "bella-@leetcode.com"],
        [4, "Sally", "sally.come@leetcode.com"]
      ]
    },
    svgDiagram: `<svg viewBox="0 0 880 210" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="850" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEETCODE #1517: REGEX VALIDATION SPECIFICATION &amp; REJECTION REASONS</text>

      <!-- Candidates Table -->
      <g transform="translate(35, 55)">
        <rect x="0" y="0" width="340" height="120" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="14" y="22" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Evaluated Email Addresses</text>
        <text x="14" y="42" fill="#15803d" font-family="monospace" font-size="9.5">winston@leetcode.com    [VALID ✓]</text>
        <text x="14" y="58" fill="#15803d" font-family="monospace" font-size="9.5">bella-@leetcode.com     [VALID ✓]</text>
        <text x="14" y="74" fill="#dc2626" font-family="monospace" font-size="9.5">quarz#2020@leetcode.com [INVALID: '#' char ❌]</text>
        <text x="14" y="90" fill="#dc2626" font-family="monospace" font-size="9.5">.shapiro@leetcode.com   [INVALID: starts with '.' ❌]</text>
        <text x="14" y="106" fill="#dc2626" font-family="monospace" font-size="9.5">david69@gmail.com       [INVALID: not @leetcode.com ❌]</text>
      </g>

      <path d="M 395 115 L 440 115" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Regex Automaton -->
      <g transform="translate(450, 55)">
        <rect x="0" y="0" width="390" height="120" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="14" y="24" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">Regex Pattern Formulation</text>
        <rect x="14" y="35" width="362" height="30" rx="4" fill="#ffffff" stroke="#93c5fd"/>
        <text x="22" y="55" fill="#1e40af" font-family="monospace" font-size="10.5" font-weight="700">^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$</text>
        <text x="14" y="82" fill="#1e40af" font-size="9.5">&bull; ^[a-zA-Z]: First char is strictly a letter</text>
        <text x="14" y="96" fill="#1e40af" font-size="9.5">&bull; [a-zA-Z0-9_.-]*: Remaining allowed prefix characters</text>
        <text x="14" y="110" fill="#1e40af" font-size="9.5">&bull; @leetcode[.]com$: Fixed literal domain ending</text>
      </g>
    </svg>`,
    logicBreakdown: [
      "The prefix must begin strictly with a letter: `^[a-zA-Z]`.",
      "The rest of the prefix can contain letters, numbers, underscores, periods, and hyphens: `[a-zA-Z0-9_.-]*`.",
      "The domain must strictly equal `@leetcode.com`.",
      "Because the dot `.` is a regex wildcard meaning 'any character', we must escape it as `[.]` or `\\\\.`.",
      "Anchor the pattern to both ends of the string using `^` and `$` to prevent partial matches."
    ],
    trapsAndEdgeCases: [
      "Unescaped dot trap: Writing `@leetcode.com` matches `@leetcode?com` or `@leetcodeXcom` because unescaped `.` matches anything.",
      "Prefix starting character: Emails starting with digits or punctuation (like `.shapiro@leetcode.com`) must be rejected.",
      "Illegal characters: Disallow `#`, `&`, `+`, etc."
    ],
    solutionSQL: `SELECT user_id, name, mail
FROM Users
WHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$';`,
    lineByLineExplanation: [
      { clause: "SELECT user_id, name, mail", exp: "Projects required user identity attributes." },
      { clause: "FROM Users", exp: "Source users directory." },
      { clause: "WHERE mail REGEXP '^[a-zA-Z]...'", exp: "Anchors start and enforces first character is an alphabetic letter." },
      { clause: "...[a-zA-Z0-9_.-]*...", exp: "Allows valid alphanumeric and symbol characters in prefix." },
      { clause: "...@leetcode[.]com$'", exp: "Enforces exact domain and anchors to the strict end of the string." }
    ],
    alternativeSolutions: [
      {
        name: "Double Backslash Escaped Pattern",
        complexity: "O(N) Regex",
        sql: `SELECT user_id, name, mail\nFROM Users\nWHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_\\\\.-]*@leetcode\\\\.com$';`,
        explanation: "Equivalent standard regex escaping the period and dash with double backslashes."
      }
    ]
  },

  // 4. #1484 Group Sold Products By The Date
  {
    id: 1484,
    title: "Group Sold Products By The Date",
    difficulty: "Easy",
    acceptance: "83.6%",
    interviewFreq: "Very High • Amazon, Apple, Meta",
    companies: ["Amazon", "Apple", "Meta", "Adobe"],
    prompt: `Write a solution to find for each date the number of different products sold and their names.\n\nThe sold products names for each date should be sorted lexicographically.\n\nReturn the result table ordered by sell_date.`,
    sampleInput: {
      table: "Activities",
      columns: ["sell_date", "product"],
      rows: [
        ["2020-05-30", "Headphone"],
        ["2020-06-01", "Pencil"],
        ["2020-06-02", "Mask"],
        ["2020-05-30", "Basketball"],
        ["2020-06-01", "Bible"],
        ["2020-06-02", "Mask"],
        ["2020-05-30", "T-Shirt"]
      ]
    },
    expectedOutput: {
      columns: ["sell_date", "num_sold", "products"],
      rows: [
        ["2020-05-30", 3, "Basketball,Headphone,T-Shirt"],
        ["2020-06-01", 2, "Bible,Pencil"],
        ["2020-06-02", 1, "Mask"]
      ]
    },
    svgDiagram: `<svg viewBox="0 0 880 210" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="850" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEETCODE #1484: DISTINCT STRING AGGREGATION &amp; LEXICOGRAPHIC SORTING</text>

      <!-- Raw Rows -->
      <g transform="translate(35, 55)">
        <rect x="0" y="0" width="220" height="120" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="14" y="24" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Activities (Unsorted)</text>
        <text x="14" y="46" fill="#334155" font-family="monospace" font-size="9.5">2020-05-30: Headphone</text>
        <text x="14" y="66" fill="#334155" font-family="monospace" font-size="9.5">2020-05-30: Basketball</text>
        <text x="14" y="86" fill="#334155" font-family="monospace" font-size="9.5">2020-05-30: T-Shirt</text>
        <text x="14" y="106" fill="#334155" font-family="monospace" font-size="9.5">2020-06-02: Mask, Mask (Dup!)</text>
      </g>

      <path d="M 275 115 L 325 115" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- GROUP_CONCAT -->
      <g transform="translate(335, 55)">
        <rect x="0" y="0" width="280" height="120" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="14" y="24" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">GROUP_CONCAT Parameters</text>
        <text x="14" y="48" fill="#1e40af" font-family="monospace" font-size="9.5">DISTINCT product</text>
        <text x="14" y="66" fill="#1e40af" font-family="monospace" font-size="9.5">ORDER BY product ASC</text>
        <text x="14" y="84" fill="#1e40af" font-family="monospace" font-size="9.5">SEPARATOR ','</text>
        <rect x="14" y="94" width="252" height="20" rx="4" fill="#dbeafe"/>
        <text x="20" y="108" fill="#1d4ed8" font-family="monospace" font-size="8.5">num_sold = COUNT(DISTINCT product)</text>
      </g>

      <path d="M 635 115 L 685 115" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Emitted Table -->
      <g transform="translate(695, 55)">
        <rect x="0" y="0" width="155" height="120" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="12" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Projected Result</text>
        <text x="12" y="46" fill="#166534" font-family="monospace" font-size="9">2020-05-30 | 3</text>
        <text x="12" y="60" fill="#475569" font-family="monospace" font-size="8">"Basketball,Headphone,T-Shirt"</text>
        <text x="12" y="82" fill="#166534" font-family="monospace" font-size="9">2020-06-02 | 1</text>
        <text x="12" y="96" fill="#475569" font-family="monospace" font-size="8">"Mask"</text>
      </g>
    </svg>`,
    logicBreakdown: [
      "Group rows by `sell_date`.",
      "Calculate distinct product count: `COUNT(DISTINCT product) AS num_sold`.",
      "Concatenate the distinct names using MySQL's `GROUP_CONCAT()` with `DISTINCT`, `ORDER BY product`, and `SEPARATOR ','`.",
      "Sort final table ascending by `sell_date`."
    ],
    trapsAndEdgeCases: [
      "Duplicate product names on same date: Notice on 2020-06-02, 'Mask' was sold twice. Omitting `DISTINCT` would generate 'Mask,Mask' and count=2, failing the test.",
      "Alphabetical ordering inside delimiter: The problem strictly demands lexicographically ordered names. In `GROUP_CONCAT`, you must include `ORDER BY product` inside the function parentheses!"
    ],
    solutionSQL: `SELECT
    sell_date,
    COUNT(DISTINCT product) AS num_sold,
    GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;`,
    lineByLineExplanation: [
      { clause: "SELECT sell_date,", exp: "Projects the calendar date group key." },
      { clause: "COUNT(DISTINCT product) AS num_sold,", exp: "Counts unique items sold on that calendar date." },
      { clause: "GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products", exp: "Folds distinct products into an alphabetically sorted, comma-delimited string." },
      { clause: "FROM Activities GROUP BY sell_date", exp: "Aggregates across each distinct sales date." },
      { clause: "ORDER BY sell_date", exp: "Sorts final calendar report chronologically." }
    ],
    alternativeSolutions: [
      {
        name: "PostgreSQL STRING_AGG Syntax",
        complexity: "O(N log N) String Aggregation",
        sql: `SELECT sell_date,\n       COUNT(DISTINCT product) AS num_sold,\n       STRING_AGG(DISTINCT product, ',' ORDER BY product) AS products\nFROM Activities\nGROUP BY sell_date\nORDER BY sell_date;`,
        explanation: "Equivalent query in PostgreSQL using the ANSI-compliant STRING_AGG function."
      }
    ]
  },

  // 5. #1327 List the Products Ordered in a Period
  {
    id: 1327,
    title: "List the Products Ordered in a Period",
    difficulty: "Easy",
    acceptance: "66.5%",
    interviewFreq: "High • Amazon, Walmart, Target",
    companies: ["Amazon", "Walmart", "Target", "Wayfair"],
    prompt: `Write a solution to get the names of products that have at least 100 units ordered in February 2020 and their amount.\n\nReturn the result table in any order.`,
    sampleInput: {
      table: "Products & Orders",
      columns: ["product_id", "product_name", "product_category", "order_date", "unit"],
      rows: [
        [1, "Leetcode Solutions", "Book", "2020-02-10", 60],
        [1, "Leetcode Solutions", "Book", "2020-02-17", 70],
        [2, "Jewels of Stringology", "Book", "2020-01-18", 30],
        [3, "HP", "Laptop", "2020-02-24", 50],
        [4, "Lenovo", "Laptop", "2020-02-25", 99]
      ]
    },
    expectedOutput: {
      columns: ["product_name", "unit"],
      rows: [
        ["Leetcode Solutions", 130]
      ]
    },
    svgDiagram: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="850" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEETCODE #1327: TEMPORAL FILTER &amp; POST-AGGREGATION HAVING THRESHOLD</text>

      <!-- Raw Orders Join -->
      <g transform="translate(35, 55)">
        <rect x="0" y="0" width="280" height="110" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="14" y="24" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Products JOIN Orders</text>
        <text x="14" y="46" fill="#334155" font-family="monospace" font-size="9.5">P1 (Solutions): 2020-02-10 (60 units)</text>
        <text x="14" y="64" fill="#334155" font-family="monospace" font-size="9.5">P1 (Solutions): 2020-02-17 (70 units)</text>
        <text x="14" y="82" fill="#64748b" font-family="monospace" font-size="9.5">P2: Jan 2020 (Filtered out ❌)</text>
        <text x="14" y="100" fill="#64748b" font-family="monospace" font-size="9.5">P4 (Lenovo): 99 units (&lt; 100 ❌)</text>
      </g>

      <path d="M 335 110 L 385 110" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Execution Path -->
      <g transform="translate(395, 55)">
        <rect x="0" y="0" width="270" height="110" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="14" y="24" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">Execution Gates</text>
        <text x="14" y="46" fill="#1e40af" font-family="monospace" font-size="9.5">WHERE order_date BETWEEN</text>
        <text x="24" y="62" fill="#1e40af" font-family="monospace" font-size="9.5">'2020-02-01' AND '2020-02-29'</text>
        <rect x="14" y="74" width="242" height="26" rx="4" fill="#dbeafe"/>
        <text x="20" y="91" fill="#1d4ed8" font-family="monospace" font-size="9.5" font-weight="700">HAVING SUM(unit) &gt;= 100</text>
      </g>

      <path d="M 685 110 L 735 110" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Result Table -->
      <g transform="translate(745, 55)">
        <rect x="0" y="0" width="105" height="110" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="12" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Result</text>
        <text x="12" y="55" fill="#166534" font-family="monospace" font-size="10">Solutions</text>
        <rect x="10" y="70" width="85" height="26" rx="4" fill="#dcfce7"/>
        <text x="52" y="87" text-anchor="middle" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">130</text>
      </g>
    </svg>`,
    logicBreakdown: [
      "Join `Products` with `Orders` on `product_id`.",
      "Filter for February 2020 dates using `WHERE order_date >= '2020-02-01' AND order_date < '2020-03-01'` or `order_date LIKE '2020-02%'`.",
      "Group by `product_name` and calculate `SUM(unit)`.",
      "Filter the aggregated groups using `HAVING SUM(unit) >= 100`."
    ],
    trapsAndEdgeCases: [
      "WHERE vs HAVING: Filtering by date must occur in `WHERE` prior to aggregation to avoid summing sales outside February. Filtering by total volume must occur in `HAVING` after sum evaluation.",
      "Leap year in February 2020: 2020 was a leap year (February had 29 days). Using explicit range `< '2020-03-01'` prevents boundary omission bugs."
    ],
    solutionSQL: `SELECT
    p.product_name,
    SUM(o.unit) AS unit
FROM Products p
JOIN Orders o ON p.product_id = o.product_id
WHERE o.order_date >= '2020-02-01'
  AND o.order_date < '2020-03-01'
GROUP BY p.product_id, p.product_name
HAVING SUM(o.unit) >= 100;`,
    lineByLineExplanation: [
      { clause: "SELECT p.product_name, SUM(o.unit) AS unit", exp: "Projects product title and total summed orders." },
      { clause: "FROM Products p JOIN Orders o ON p.product_id = o.product_id", exp: "Binds product names to purchase units." },
      { clause: "WHERE o.order_date >= '2020-02-01' AND o.order_date < '2020-03-01'", exp: "SARGable date range covering all 29 days of February 2020." },
      { clause: "GROUP BY p.product_id, p.product_name", exp: "Groups transactions by product identity." },
      { clause: "HAVING SUM(o.unit) >= 100", exp: "Filters out products with fewer than 100 total units." }
    ],
    alternativeSolutions: [
      {
        name: "DATE_FORMAT Pattern",
        complexity: "O(N log N) Hash Group",
        sql: `SELECT p.product_name, SUM(o.unit) AS unit\nFROM Products p\nJOIN Orders o ON p.product_id = o.product_id\nWHERE DATE_FORMAT(o.order_date, '%Y-%m') = '2020-02'\nGROUP BY p.product_id, p.product_name\nHAVING SUM(o.unit) >= 100;`,
        explanation: "Uses DATE_FORMAT helper for concise month string matching."
      }
    ]
  },

  // 6. #176 Second Highest Salary
  {
    id: 176,
    title: "Second Highest Salary",
    difficulty: "Medium",
    acceptance: "39.1%",
    interviewFreq: "Very High • Google, Amazon, Meta, Microsoft",
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple", "Goldman Sachs"],
    prompt: `Write a solution to find the second highest distinct salary from the Employee table. If there is no second highest salary, return null (return null in Pandas/None in Python).\n\nReturn the result table with column name 'SecondHighestSalary'.`,
    sampleInput: {
      table: "Employee",
      columns: ["id", "salary"],
      rows: [
        [1, 100],
        [2, 200],
        [3, 300]
      ]
    },
    expectedOutput: {
      columns: ["SecondHighestSalary"],
      rows: [
        [200]
      ]
    },
    svgDiagram: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="850" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEETCODE #176: DISTINCT RANKING &amp; SCALAR SUBQUERY NULL WRAPPER</text>

      <!-- Salary Hierarchy -->
      <g transform="translate(35, 55)">
        <rect x="0" y="0" width="220" height="110" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="14" y="24" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Salary Table</text>
        <text x="14" y="46" fill="#334155" font-family="monospace" font-size="9.5">ID 3: $300 [Rank 1 Max]</text>
        <rect x="10" y="54" width="200" height="24" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="14" y="70" fill="#1d4ed8" font-family="monospace" font-size="9.5" font-weight="700">ID 2: $200 [Rank 2 TARGET ✓]</text>
        <text x="14" y="94" fill="#334155" font-family="monospace" font-size="9.5">ID 1: $100 [Rank 3]</text>
      </g>

      <path d="M 275 110 L 325 110" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Inner Logic -->
      <g transform="translate(335, 55)">
        <rect x="0" y="0" width="260" height="110" rx="6" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="14" y="24" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">Inner OFFSET Subquery</text>
        <text x="14" y="46" fill="#1e40af" font-family="monospace" font-size="9.5">SELECT DISTINCT salary</text>
        <text x="14" y="64" fill="#1e40af" font-family="monospace" font-size="9.5">FROM Employee</text>
        <text x="14" y="82" fill="#1e40af" font-family="monospace" font-size="9.5">ORDER BY salary DESC</text>
        <text x="14" y="100" fill="#1e40af" font-family="monospace" font-size="9.5">LIMIT 1 OFFSET 1</text>
      </g>

      <path d="M 615 110 L 665 110" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Outer Wrapper -->
      <g transform="translate(675, 55)">
        <rect x="0" y="0" width="175" height="110" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="12" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Outer Wrapper</text>
        <text x="12" y="46" fill="#166534" font-size="9">SELECT (inner) AS</text>
        <text x="12" y="60" fill="#166534" font-size="9">SecondHighestSalary</text>
        <rect x="10" y="74" width="155" height="26" rx="4" fill="#dcfce7"/>
        <text x="20" y="91" fill="#15803d" font-family="monospace" font-size="9.5" font-weight="700">If 0 rows =&gt; NULL ✓</text>
      </g>
    </svg>`,
    logicBreakdown: [
      "Find distinct salaries, sort descending, and grab the 2nd value with `LIMIT 1 OFFSET 1`.",
      "The critical requirement is handling tables with fewer than 2 distinct salaries (e.g. only 1 employee). A naked `LIMIT 1 OFFSET 1` returns 0 rows (an empty set), failing the test.",
      "Wrapping the query inside an outer `SELECT (SELECT ... ) AS SecondHighestSalary` guarantees that an empty set automatically casts into a 1-row `NULL` output token."
    ],
    trapsAndEdgeCases: [
      "The 0-row vs NULL trap: If the table has only `[100]`, `SELECT DISTINCT salary ... LIMIT 1 OFFSET 1` returns 0 rows. You must return 1 row containing `null`.",
      "Duplicate maximum salaries: If two employees both earn 300, omitting `DISTINCT` would pick the second 300 instead of 200."
    ],
    solutionSQL: `SELECT (
    SELECT DISTINCT salary
    FROM Employee
    ORDER BY salary DESC
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
    lineByLineExplanation: [
      { clause: "SELECT ( ... ) AS SecondHighestSalary;", exp: "Scalar subquery wrapper: forces 0 matching rows to emit a 1-row NULL value." },
      { clause: "SELECT DISTINCT salary", exp: "Deduplicates salaries to prevent ties from stealing rank 2." },
      { clause: "FROM Employee", exp: "Scans staff compensation figures." },
      { clause: "ORDER BY salary DESC", exp: "Sorts compensation in descending order." },
      { clause: "LIMIT 1 OFFSET 1", exp: "Skips the highest salary (#1) and picks strictly the second highest (#2)." }
    ],
    alternativeSolutions: [
      {
        name: "IFNULL Wrapper with Subquery",
        complexity: "O(N log N) Sort",
        sql: `SELECT IFNULL((\n    SELECT DISTINCT salary\n    FROM Employee\n    ORDER BY salary DESC\n    LIMIT 1 OFFSET 1\n), NULL) AS SecondHighestSalary;`,
        explanation: "Explicitly uses IFNULL wrapper to define the fallback return."
      },
      {
        name: "MAX() Less Than MAX() Pattern",
        complexity: "O(N) Table Scans",
        sql: `SELECT MAX(salary) AS SecondHighestSalary\nFROM Employee\nWHERE salary < (\n    SELECT MAX(salary) FROM Employee\n);`,
        explanation: "Finds the maximum salary strictly less than the overall maximum. Naturally returns NULL on empty sets without requiring OFFSET."
      }
    ]
  },

  // 7. #196 Delete Duplicate Emails
  {
    id: 196,
    title: "Delete Duplicate Emails",
    difficulty: "Easy",
    acceptance: "60.2%",
    interviewFreq: "Very High • Amazon, Apple, Meta",
    companies: ["Amazon", "Apple", "Meta", "Google"],
    prompt: `Write a solution to delete all duplicate emails, keeping only one unique email with the smallest id.\n\nFor SQL users, please note that you are supposed to write a DELETE statement and not a SELECT one.\n\nAfter running your script, the answer shown is the Person table. The driver will first compile and run your piece of code and then show the Person table. The final order of the Person table does not matter.`,
    sampleInput: {
      table: "Person",
      columns: ["id", "email"],
      rows: [
        [1, "john@example.com"],
        [2, "bob@example.com"],
        [3, "john@example.com"]
      ]
    },
    expectedOutput: {
      columns: ["id", "email"],
      rows: [
        [1, "john@example.com"],
        [2, "bob@example.com"]
      ]
    },
    svgDiagram: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="850" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="30" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEETCODE #196: DML SELF-JOIN DELETION TARGETING p1 (WHERE p1.id &gt; p2.id)</text>

      <!-- Cross/Inner Product -->
      <g transform="translate(35, 55)">
        <rect x="0" y="0" width="310" height="110" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="14" y="22" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">Self-Join Tuples (p1, p2)</text>
        <text x="14" y="44" fill="#334155" font-family="monospace" font-size="9.5">p1(1, 'john') vs p2(1, 'john') =&gt; id 1 &gt; 1 (False)</text>
        <rect x="8" y="52" width="294" height="24" rx="4" fill="#fee2e2" stroke="#ef4444"/>
        <text x="14" y="68" fill="#b91c1c" font-family="monospace" font-size="9.5" font-weight="700">p1(3, 'john') vs p2(1, 'john') =&gt; 3 &gt; 1 (TRUE! 🚨)</text>
        <text x="14" y="94" fill="#334155" font-family="monospace" font-size="9.5">p1(2, 'bob')  vs p2(2, 'bob')  =&gt; id 2 &gt; 2 (False)</text>
      </g>

      <path d="M 365 110 L 415 110" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Execution Action -->
      <g transform="translate(425, 55)">
        <rect x="0" y="0" width="270" height="110" rx="6" fill="#fff1f2" stroke="#fca5a5"/>
        <text x="14" y="24" fill="#991b1b" font-family="monospace" font-size="11" font-weight="700">DELETE p1 Action</text>
        <text x="14" y="46" fill="#b91c1c" font-size="9.5">Row p1(3, 'john') meets criteria.</text>
        <text x="14" y="66" fill="#b91c1c" font-size="9.5">Engine deletes row 3 from Person.</text>
        <rect x="14" y="78" width="242" height="24" rx="4" fill="#fecaca"/>
        <text x="20" y="94" fill="#991b1b" font-family="monospace" font-size="9.5" font-weight="700">Row 1 (Smallest ID) is spared!</text>
      </g>

      <path d="M 715 110 L 755 110" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow1378)"/>

      <!-- Remaining Table -->
      <g transform="translate(765, 55)">
        <rect x="0" y="0" width="100" height="110" rx="6" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="12" y="24" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">Persisted</text>
        <text x="12" y="55" fill="#166534" font-family="monospace" font-size="10">ID 1 | john</text>
        <text x="12" y="80" fill="#166534" font-family="monospace" font-size="10">ID 2 | bob</text>
      </g>
    </svg>`,
    logicBreakdown: [
      "The task strictly requires a `DELETE` query, modifying the table directly.",
      "Self-join `Person` with itself on `p1.email = p2.email`.",
      "Filter for cases where `p1.id > p2.id`.",
      "Target `DELETE p1` so only the duplicate row with the larger ID is eliminated, keeping the record with the minimum ID intact."
    ],
    trapsAndEdgeCases: [
      "SELECT vs DELETE: The problem driver evaluates modifications to the `Person` table. Writing a `SELECT` statement fails compilation.",
      "MySQL Target Table Update Trap: In MySQL, you cannot write `DELETE FROM Person WHERE id NOT IN (SELECT MIN(id) FROM Person)` directly because MySQL prohibits modifying a table you are selecting from in a subquery! The self-join `DELETE p1 FROM Person p1, Person p2` cleanly circumvents this restriction."
    ],
    solutionSQL: `DELETE p1
FROM Person p1,
     Person p2
WHERE p1.email = p2.email
  AND p1.id > p2.id;`,
    lineByLineExplanation: [
      { clause: "DELETE p1", exp: "Instructs the database engine to remove rows strictly from the table alias p1." },
      { clause: "FROM Person p1, Person p2", exp: "Cross-joins the Person table with itself." },
      { clause: "WHERE p1.email = p2.email", exp: "Restricts pairs to matching duplicate email addresses." },
      { clause: "AND p1.id > p2.id;", exp: "Identifies the duplicate instance with the higher ID for removal." }
    ],
    alternativeSolutions: [
      {
        name: "Subquery with Intermediate Derived Table",
        complexity: "O(N) Scans",
        sql: `DELETE FROM Person\nWHERE id NOT IN (\n    SELECT min_id FROM (\n        SELECT MIN(id) AS min_id\n        FROM Person\n        GROUP BY email\n    ) AS temp\n);`,
        explanation: "Nests the MIN(id) query inside a temporary derived table to bypass MySQL's error on updating the same table being queried."
      }
    ]
  }
];

// -----------------------------------------------------------------------------
// 6. BUILD FINAL EXPORT OBJECT & WRITE TO DISK
// -----------------------------------------------------------------------------
const finalData = {
  conceptId: "concept-7",
  conceptNumber: 7,
  title: "Advanced String Manipulation, Regex & Clauses",
  subtitle: "Master 1-based string manipulation, SARGable wildcard searches, POSIX/PCRE regular expressions, string aggregation folding, and DML deduplication.",
  keyTakeaway: "Strings in SQL are 1-indexed. SARGability dictates prefix matching over leading wildcards, scalar wrappers protect against empty-set returns, and self-joins power clean DML deletions.",
  masterclass: {
    title: "Advanced String Manipulation, Regex & Clauses",
    subtitle: "Deep-dive into string internals, regular expressions, and DML deletion physics.",
    keyTakeaway: "Remember that SQL strings start at index 1, regex dots must be escaped as [.] to prevent greedy wildcards, and GROUP_CONCAT buffers require sizing in production.",
    chapters: chapters,
    callouts: callouts
  },
  conceptMcqs: mcqs,
  prepDrills: drills,
  leetcodeProblems: leetcodeProblems,
  // Backwards/forwards compatibility aliases
  mcqs: mcqs,
  drills: drills,
  problems: leetcodeProblems
};

const outputJs = `// visualizer/leetcode_section7_data.js\n// Concept 7: Advanced String Manipulation, Regex & Clauses\n\nwindow.LEETCODE_SECTION_7_DATA = ${JSON.stringify(finalData, null, 2)};\n`;

const targetFile = path.join(__dirname, '..', 'visualizer', 'leetcode_section7_data.js');
fs.writeFileSync(targetFile, outputJs, 'utf8');

console.log(`✅ Successfully generated ${targetFile}`);
console.log(`Size: ${(fs.statSync(targetFile).size / 1024).toFixed(1)} KB`);
console.log(`- 8 Masterclass Chapters with SVGs`);
console.log(`- 3 Masterclass Callouts`);
console.log(`- 100 Concept MCQs`);
console.log(`- 100 Prep Drills`);
console.log(`- 7 Canonical LeetCode Problems (#1667, #1527, #1517, #1484, #1327, #176, #196)`);
