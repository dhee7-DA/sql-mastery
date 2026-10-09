// visualizer/leetcode_section7_data.js
// Concept 7: Advanced String Manipulation, Regex & Clauses

window.LEETCODE_SECTION_7_DATA = {
  "conceptId": "concept-7",
  "conceptNumber": 7,
  "title": "Advanced String Manipulation, Regex & Clauses",
  "subtitle": "Master 1-based string manipulation, SARGable wildcard searches, POSIX/PCRE regular expressions, string aggregation folding, and DML deduplication.",
  "keyTakeaway": "Strings in SQL are 1-indexed. SARGability dictates prefix matching over leading wildcards, scalar wrappers protect against empty-set returns, and self-joins power clean DML deletions.",
  "masterclass": {
    "title": "Advanced String Manipulation, Regex & Clauses",
    "subtitle": "Deep-dive into string internals, regular expressions, and DML deletion physics.",
    "keyTakeaway": "Remember that SQL strings start at index 1, regex dots must be escaped as [.] to prevent greedy wildcards, and GROUP_CONCAT buffers require sizing in production.",
    "chapters": [
      {
        "id": "chap-7-1-string-primitives",
        "number": "7.1",
        "title": "String Scalar Primitives: CONCAT, SUBSTRING, CHAR_LENGTH & 1-Based Indexing",
        "content": "\n      <p class=\"lc-p\">\n        Unlike general-purpose programming languages like Python or JavaScript where strings are zero-indexed, <strong>SQL string functions are strictly 1-based</strong>.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Essential String Functions Matrix:</strong><br>\n        &bull; <code>SUBSTRING(str, pos, len)</code> / <code>SUBSTR()</code>: Extracts <code>len</code> characters starting at <code>pos</code>. Note: <code>SUBSTRING('Alice', 1, 1)</code> yields <code>'A'</code>.<br>\n        &bull; <code>CONCAT(s1, s2, ...)</code>: Glues strings together. In MySQL, if any argument is <code>NULL</code>, <code>CONCAT</code> returns <code>NULL</code>! In PostgreSQL/SQL Server, use <code>CONCAT_WS()</code> or the string concatenation operator <code>||</code>.<br>\n        &bull; <code>UPPER(str)</code> &amp; <code>LOWER(str)</code>: Normalizes character casing.<br>\n        &bull; <code>CHAR_LENGTH(str)</code> vs <code>LENGTH(str)</code>: <code>CHAR_LENGTH</code> returns the number of human-readable Unicode glyphs/characters, while <code>LENGTH</code> returns physical storage bytes (critical difference for multibyte UTF-8 characters!).\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>Capitalization Pattern:</strong> To format a name with initial capitalization (e.g., 'aLICE' -&gt; 'Alice'):<br>\n        <code>CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2)))</code>\n      </p>\n    ",
        "diagram": {
          "title": "1-Based String Indexing & Substring Extraction in SQL",
          "svg": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"170\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">1-BASED STRING INDEXING &amp; CANONICAL CAPITALIZATION FORMULA</text>\n\n        <!-- String Character Cells -->\n        <g transform=\"translate(40, 55)\">\n          <text x=\"0\" y=\"18\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"10\">String: 'mARy'</text>\n          \n          <rect x=\"0\" y=\"28\" width=\"45\" height=\"45\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n          <text x=\"22\" y=\"55\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"16\" font-weight=\"700\">'m'</text>\n          <text x=\"22\" y=\"90\" text-anchor=\"middle\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"10\" font-weight=\"600\">Pos 1</text>\n\n          <rect x=\"55\" y=\"28\" width=\"45\" height=\"45\" rx=\"4\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"77\" y=\"55\" text-anchor=\"middle\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"16\" font-weight=\"700\">'A'</text>\n          <text x=\"77\" y=\"90\" text-anchor=\"middle\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"10\">Pos 2</text>\n\n          <rect x=\"110\" y=\"28\" width=\"45\" height=\"45\" rx=\"4\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"132\" y=\"55\" text-anchor=\"middle\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"16\" font-weight=\"700\">'R'</text>\n          <text x=\"132\" y=\"90\" text-anchor=\"middle\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"10\">Pos 3</text>\n\n          <rect x=\"165\" y=\"28\" width=\"45\" height=\"45\" rx=\"4\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"187\" y=\"55\" text-anchor=\"middle\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"16\" font-weight=\"700\">'y'</text>\n          <text x=\"187\" y=\"90\" text-anchor=\"middle\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"10\">Pos 4</text>\n        </g>\n\n        <!-- Arrow -->\n        <path d=\"M 270 100 L 320 100\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Transformation Formula -->\n        <g transform=\"translate(335, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"500\" height=\"110\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">CONCAT( UPPER(SUBSTR(s, 1, 1)), LOWER(SUBSTR(s, 2)) )</text>\n          \n          <rect x=\"14\" y=\"38\" width=\"220\" height=\"30\" rx=\"4\" fill=\"#ffffff\" stroke=\"#86efac\"/>\n          <text x=\"24\" y=\"58\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">UPPER('m') =&gt; 'M'</text>\n\n          <rect x=\"250\" y=\"38\" width=\"235\" height=\"30\" rx=\"4\" fill=\"#ffffff\" stroke=\"#86efac\"/>\n          <text x=\"260\" y=\"58\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">LOWER('ARy') =&gt; 'ary'</text>\n\n          <text x=\"14\" y=\"95\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">OUTPUT RESULT: 'Mary'</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-7-2-like-vs-sargability",
        "number": "7.2",
        "title": "Pattern Matching: LIKE Wildcards (`%`, `_`) vs SARGability & B-Tree Index Traps",
        "content": "\n      <p class=\"lc-p\">\n        In relational databases, the <code>LIKE</code> operator enables pattern matching with two fundamental wildcards:\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Two Standard SQL Wildcards:</strong><br>\n        &bull; <code>%</code> (Percent): Matches zero or more arbitrary characters.<br>\n        &bull; <code>_</code> (Underscore): Matches strictly exactly one single character.\n      </div>\n\n      <div class=\"lc-rule-banner\" style=\"margin-top:12px; background:#fff1f2; border-color:#fecdd3;\">\n        <strong style=\"color:#be123c;\">The SARGability Index Principle:</strong><br>\n        1. <strong>Prefix Match (SARGable):</strong> <code>WHERE code LIKE 'DIAB1%'</code>.<br>\n        The B-Tree index on <code>code</code> can perform an efficient <em>Index Range Scan</em> ($O(log N)$) because the initial character prefix is known.<br>\n        2. <strong>Leading Wildcard (Non-SARGable):</strong> <code>WHERE code LIKE '%DIAB1%'</code>.<br>\n        Because the initial character is unknown, the B-Tree index is completely useless. The engine is forced to execute a <strong>Full Table Scan ($O(N)$)</strong>, reading every data page from storage disk!\n      </div>\n    ",
        "diagram": {
          "title": "SARGable Prefix Scan vs Leading Wildcard Full Table Scan",
          "svg": "<svg viewBox=\"0 0 880 190\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">SARGABILITY: B-TREE INDEX SEEK VS FULL TABLE SCAN</text>\n\n        <!-- SARGable Box -->\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"380\" height=\"100\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">1. SARGable: LIKE 'DIAB1%' (Prefix)</text>\n          <text x=\"14\" y=\"44\" fill=\"#166534\" font-size=\"9.5\">B-Tree knows root branch starts with 'D'.</text>\n          <rect x=\"14\" y=\"54\" width=\"350\" height=\"30\" rx=\"4\" fill=\"#ffffff\" stroke=\"#86efac\"/>\n          <text x=\"24\" y=\"74\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Index Range Seek (O(log N)) - Fast!</text>\n        </g>\n\n        <!-- Non-SARGable Box -->\n        <g transform=\"translate(445, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"400\" height=\"100\" rx=\"6\" fill=\"#fff1f2\" stroke=\"#fecdd3\" stroke-width=\"1.2\"/>\n          <text x=\"14\" y=\"24\" fill=\"#be123c\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">2. Non-SARGable: LIKE '%DIAB1%' (Leading %)</text>\n          <text x=\"14\" y=\"44\" fill=\"#9f1239\" font-size=\"9.5\">Prefix unknown. B-Tree cannot prune branches.</text>\n          <rect x=\"14\" y=\"54\" width=\"370\" height=\"30\" rx=\"4\" fill=\"#ffffff\" stroke=\"#fda4af\"/>\n          <text x=\"24\" y=\"74\" fill=\"#be123c\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Full Table Scan (O(N)) - Reads all pages!</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-7-3-regex-in-sql",
        "number": "7.3",
        "title": "Regular Expressions in SQL: REGEXP / RLIKE Syntax, Anchors (`^`, `$`) & Character Classes",
        "content": "\n      <p class=\"lc-p\">\n        When simple wildcards cannot validate complex string specifications (e.g. validating email formats or phone numbers), SQL provides regular expression engines via <code>REGEXP</code> or <code>RLIKE</code>.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Essential SQL Regex Tokens:</strong><br>\n        &bull; <code>^</code> (Caret): Anchors match strictly to the start of the string.<br>\n        &bull; <code>$</code> (Dollar): Anchors match strictly to the end of the string.<br>\n        &bull; <code>[a-zA-Z]</code>: Matches any single alphabetic letter.<br>\n        &bull; <code>[a-zA-Z0-9_.-]*</code>: Matches zero or more allowed username characters (alphanumeric, underscore, period, hyphen).<br>\n        &bull; <code>[.]</code> or <code>\\.</code>: Matches a literal dot character (since unescaped <code>.</code> matches any arbitrary character in regex!).\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>LeetCode #1517 Canonical Regex:</strong><br>\n        <code>WHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$'</code>\n      </p>\n    ",
        "diagram": {
          "title": "Regex Token Parsing Breakdown for Strict Email Validation",
          "svg": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"170\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">REGULAR EXPRESSION TOKEN ARCHITECTURE FOR EMAIL VALIDATION</text>\n\n        <!-- Token Blocks -->\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"130\" height=\"100\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">^[a-zA-Z]</text>\n          <text x=\"12\" y=\"44\" fill=\"#1e40af\" font-size=\"9.5\">Anchor: Start</text>\n          <text x=\"12\" y=\"62\" fill=\"#475569\" font-size=\"9\">First char MUST</text>\n          <text x=\"12\" y=\"78\" fill=\"#475569\" font-size=\"9\">be letter</text>\n        </g>\n\n        <g transform=\"translate(180, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"220\" height=\"100\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">[a-zA-Z0-9_.-]*</text>\n          <text x=\"12\" y=\"44\" fill=\"#166534\" font-size=\"9.5\">Quantifier: Zero or More</text>\n          <text x=\"12\" y=\"62\" fill=\"#475569\" font-size=\"9\">Allowed domain chars:</text>\n          <text x=\"12\" y=\"78\" fill=\"#475569\" font-size=\"9\">letters, digits, _, ., -</text>\n        </g>\n\n        <g transform=\"translate(415, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"190\" height=\"100\" rx=\"6\" fill=\"#fefce8\" stroke=\"#eab308\"/>\n          <text x=\"12\" y=\"24\" fill=\"#a16207\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">@leetcode[.]com$</text>\n          <text x=\"12\" y=\"44\" fill=\"#854d0e\" font-size=\"9.5\">Exact Suffix &amp; End Anchor</text>\n          <text x=\"12\" y=\"62\" fill=\"#475569\" font-size=\"9\">[.] escapes dot</text>\n          <text x=\"12\" y=\"78\" fill=\"#475569\" font-size=\"9\">$ rejects extra text</text>\n        </g>\n\n        <g transform=\"translate(620, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"225\" height=\"100\" rx=\"6\" fill=\"#faf5ff\" stroke=\"#a855f7\"/>\n          <text x=\"12\" y=\"24\" fill=\"#7e22ce\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Evaluation Result</text>\n          <text x=\"12\" y=\"44\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">bella_1@leetcode.com ✓</text>\n          <text x=\"12\" y=\"62\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9\">123_bob@leetcode.com ❌</text>\n          <text x=\"12\" y=\"80\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9\">sam@leetcode.com.org ❌</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-7-4-group-concat-aggregation",
        "number": "7.4",
        "title": "Aggregation Across Strings: GROUP_CONCAT vs STRING_AGG & Buffer Limits",
        "content": "\n      <p class=\"lc-p\">\n        While arithmetic functions like <code>SUM()</code> aggregate numbers, aggregating multiple string values across grouped rows requires specialized aggregate string collectors:\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>Dialect Syntax Comparison:</strong><br>\n        &bull; <strong>MySQL / SQLite:</strong><br>\n        <code>GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',')</code><br>\n        &bull; <strong>PostgreSQL / DuckDB:</strong><br>\n        <code>STRING_AGG(DISTINCT product, ',' ORDER BY product)</code><br>\n        &bull; <strong>SQL Server:</strong><br>\n        <code>STRING_AGG(product, ',') WITHIN GROUP (ORDER BY product)</code>\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>The MySQL Truncation Trap (<code>group_concat_max_len</code>):</strong><br>\n        By default, MySQL restricts the maximum length of a <code>GROUP_CONCAT</code> result to strictly 1,024 bytes. If a customer ordered 200 distinct products in a day, MySQL silently truncates the output after 1,024 characters without raising an error! In production systems, DBAs must increase this setting: <code>SET SESSION group_concat_max_len = 1000000;</code>.\n      </p>\n    ",
        "diagram": {
          "title": "Row Folding: Multiple String Tuples into Delimited Scalar Array",
          "svg": "<svg viewBox=\"0 0 880 190\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">ROW FOLDING: GROUP_CONCAT DISTINCT AGGREGATION</text>\n\n        <!-- Unaggregated Rows -->\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"260\" height=\"100\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"12\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Raw Rows (sell_date: '2026-05-01')</text>\n          <text x=\"12\" y=\"42\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Row 1: 'Mask'</text>\n          <text x=\"12\" y=\"60\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Row 2: 'Book'</text>\n          <text x=\"12\" y=\"78\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">Row 3: 'Mask' (Duplicate!)</text>\n        </g>\n\n        <path d=\"M 315 105 L 360 105\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Folding Engine -->\n        <g transform=\"translate(370, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"240\" height=\"100\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"12\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">GROUP_CONCAT Engine</text>\n          <text x=\"12\" y=\"44\" fill=\"#1e40af\" font-size=\"9.5\">1. DISTINCT: ['Book', 'Mask']</text>\n          <text x=\"12\" y=\"62\" fill=\"#1e40af\" font-size=\"9.5\">2. ORDER BY product ASC</text>\n          <text x=\"12\" y=\"80\" fill=\"#1e40af\" font-size=\"9.5\">3. SEPARATOR ','</text>\n        </g>\n\n        <path d=\"M 630 105 L 675 105\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <!-- Folded Result -->\n        <g transform=\"translate(685, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"165\" height=\"100\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Aggregated String</text>\n          <rect x=\"10\" y=\"42\" width=\"145\" height=\"30\" rx=\"4\" fill=\"#ffffff\" stroke=\"#86efac\"/>\n          <text x=\"82\" y=\"62\" text-anchor=\"middle\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">\"Book,Mask\"</text>\n          <text x=\"12\" y=\"90\" fill=\"#475569\" font-size=\"8.5\">num_sold: 2 products</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-7-5-date-string-parsing",
        "number": "7.5",
        "title": "Temporal Strings & Date Extraction: SARGable Date Ranges vs String Formatting",
        "content": "\n      <p class=\"lc-p\">\n        In analytics queries, filtering temporal intervals (e.g. <em>\"all orders placed in February 2020\"</em>) can be written either via string formatting or algebraic interval comparisons:\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Anti-Pattern vs The Production Standard:</strong><br>\n        &bull; <strong>Anti-Pattern (Non-SARGable Function Call):</strong><br>\n        <code>WHERE DATE_FORMAT(order_date, '%Y-%m') = '2020-02'</code><br>\n        Because the column <code>order_date</code> is wrapped inside a function call, the database must execute the function for every row in the table, invalidating any index on <code>order_date</code>.<br>\n        &bull; <strong>Production Standard (SARGable Range):</strong><br>\n        <code>WHERE order_date &gt;= '2020-02-01' AND order_date &lt; '2020-03-01'</code><br>\n        The column stands alone on the left-hand side of comparison operators, allowing the query engine to execute a high-speed B-Tree index seek!\n      </div>\n    ",
        "diagram": {
          "title": "SARGable Range Comparison vs Function Invalidation on Dates",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DATE FILTERING: FUNCTION WRAPPING VS SARGABLE BOUNDS</text>\n\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"380\" height=\"90\" rx=\"6\" fill=\"#fff1f2\" stroke=\"#fecdd3\"/>\n          <text x=\"14\" y=\"24\" fill=\"#be123c\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">SLOW: DATE_FORMAT(order_date, '%Y-%m') = '2020-02'</text>\n          <text x=\"14\" y=\"46\" fill=\"#9f1239\" font-size=\"9.5\">Wraps column in function =&gt; Index disabled!</text>\n          <text x=\"14\" y=\"66\" fill=\"#be123c\" font-size=\"9.5\" font-weight=\"600\">Forces full table scan over millions of historical rows.</text>\n        </g>\n\n        <g transform=\"translate(445, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"405\" height=\"90\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">FAST: order_date &gt;= '2020-02-01' AND order_date &lt; '2020-03-01'</text>\n          <text x=\"14\" y=\"46\" fill=\"#166534\" font-size=\"9.5\">Column unwrapped =&gt; Direct B-Tree Range Seek!</text>\n          <text x=\"14\" y=\"66\" fill=\"#15803d\" font-size=\"9.5\" font-weight=\"600\">Completes in &lt;1ms regardless of table size.</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-7-6-dml-self-join-deletes",
        "number": "7.6",
        "title": "DML Deletions & Deduplication: Multi-Table DELETE via Self-Join vs CTEs",
        "content": "\n      <p class=\"lc-p\">\n        In problems like LeetCode #196 (Delete Duplicate Emails), the goal is not to query data, but to execute a Data Manipulation Language (<strong>DML</strong>) deletion in place while preserving the record with the minimum <code>id</code>.\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Multi-Table DELETE via Self-Join:</strong><br>\n        <code>DELETE p1 FROM Person p1, Person p2<br>\nWHERE p1.email = p2.email AND p1.id &gt; p2.id;</code>\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>How It Works Internally:</strong><br>\n        The cross/inner join pairs every row in <code>Person</code> with every other row sharing the same email. Whenever <code>p1.id &gt; p2.id</code> evaluates to true, <code>p1</code> is recognized as a duplicate of lower priority. The <code>DELETE p1</code> target specifies that only the tuple from alias <code>p1</code> is removed, safely retaining the lowest <code>id</code> in <code>p2</code>!\n      </p>\n    ",
        "diagram": {
          "title": "Self-Join DML Deletion Mechanics: Retaining Minimum ID",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DML DEDUPLICATION: SELF-JOIN DELETION CRITERIA (p1.id &gt; p2.id)</text>\n\n        <!-- Person p1 -->\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"220\" height=\"90\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n          <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Alias p1 (Target)</text>\n          <text x=\"14\" y=\"46\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">ID 1: john@example.com</text>\n          <text x=\"14\" y=\"68\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">ID 2: john@example.com (DROP)</text>\n        </g>\n\n        <!-- Join Condition -->\n        <g transform=\"translate(290, 75)\">\n          <rect x=\"0\" y=\"0\" width=\"210\" height=\"50\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"105\" y=\"22\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">p1.email = p2.email</text>\n          <text x=\"105\" y=\"38\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">AND p1.id &gt; p2.id</text>\n        </g>\n\n        <!-- Person p2 -->\n        <g transform=\"translate(535, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"220\" height=\"90\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n          <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Alias p2 (Reference)</text>\n          <text x=\"14\" y=\"46\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">ID 1: john@example.com (KEPT)</text>\n          <text x=\"14\" y=\"68\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">ID 2: john@example.com</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-7-7-scalar-null-shield",
        "number": "7.7",
        "title": "Scalar Fallback Shields: Wrapping OFFSET Queries to Safely Return NULL on Empty Sets",
        "content": "\n      <p class=\"lc-p\">\n        In LeetCode #176 (Second Highest Salary), a query asking for the second highest salary must return <code>null</code> if there is only one employee in the company:\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>The Empty Set Pitfall:</strong><br>\n        If you run directly:<br>\n        <code>SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1;</code><br>\n        When the table has only 1 row, this query emits an <strong>empty set (0 rows)</strong>. But LeetCode and API contracts expect a row containing <code>null</code> (1 row, 1 null column)!\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>The Universal Scalar Wrapper Solution:</strong><br>\n        Wrap the entire query inside an outer <code>SELECT (...) AS SecondHighestSalary</code>. In SQL relational grammar, any scalar subquery in the <code>SELECT</code> clause that returns 0 rows automatically evaluates to <code>NULL</code>!\n      </p>\n    ",
        "diagram": {
          "title": "Empty Result Set vs Outer Scalar NULL Shielding",
          "svg": "<svg viewBox=\"0 0 880 180\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"150\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">SCALAR WRAPPER: CONVERTING 0 ROWS INTO A 1-ROW NULL TOKEN</text>\n\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"360\" height=\"85\" rx=\"6\" fill=\"#fff1f2\" stroke=\"#fecdd3\"/>\n          <text x=\"14\" y=\"24\" fill=\"#be123c\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">NAIVE: ... LIMIT 1 OFFSET 1</text>\n          <text x=\"14\" y=\"44\" fill=\"#9f1239\" font-size=\"9.5\">When total distinct salaries &lt; 2:</text>\n          <text x=\"14\" y=\"64\" fill=\"#be123c\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Emits: 0 rows (Empty set! Fails test!)</text>\n        </g>\n\n        <path d=\"M 415 97 L 460 97\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n        <g transform=\"translate(470, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"380\" height=\"85\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"14\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">SHIELDED: SELECT (SELECT ... LIMIT 1 OFFSET 1)</text>\n          <text x=\"14\" y=\"44\" fill=\"#166534\" font-size=\"9.5\">Scalar subquery in SELECT projection:</text>\n          <text x=\"14\" y=\"64\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">Emits: 1 row with [ NULL ] (Passes 100%!)</text>\n        </g>\n      </svg>"
        }
      },
      {
        "id": "chap-7-8-collation-and-encodings",
        "number": "7.8",
        "title": "String Collation & Character Encodings: utf8mb4_unicode_ci vs utf8mb4_bin",
        "content": "\n      <p class=\"lc-p\">\n        Every string comparison in SQL is governed by the table or database's <strong>Collation</strong> setting:\n      </p>\n\n      <div class=\"lc-rule-banner\">\n        <strong>Collation Suffix Decoding:</strong><br>\n        &bull; <code>_ci</code> (Case-Insensitive): <code>'apple' = 'APPLE'</code> evaluates to <code>TRUE</code>. This is the default in MySQL.<br>\n        &bull; <code>_cs</code> (Case-Sensitive): <code>'apple' = 'APPLE'</code> evaluates to <code>FALSE</code>.<br>\n        &bull; <code>_bin</code> (Binary Byte-Exact): Characters are compared strictly by their binary code point values.\n      </div>\n\n      <p class=\"lc-p\">\n        <strong>Interview Insight:</strong> In LeetCode #1527 (Patients With a Condition), condition codes like <code>'DIAB100'</code> are uppercase. If comparing in a case-sensitive environment or using regex, be aware that <code>REGEXP</code> in MySQL uses the table's default collation unless binary mode <code>BINARY code REGEXP ...</code> is explicitly specified!\n      </p>\n    ",
        "diagram": {
          "title": "Collation Evaluation: Case-Insensitive vs Binary Comparisons",
          "svg": "<svg viewBox=\"0 0 880 170\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"15\" y=\"15\" width=\"850\" height=\"140\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n        <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">COLLATION BEHAVIOR: CASE-INSENSITIVE (_ci) VS BINARY (_bin)</text>\n\n        <g transform=\"translate(35, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"380\" height=\"80\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n          <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">utf8mb4_unicode_ci (Case-Insensitive)</text>\n          <text x=\"14\" y=\"46\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">'apple' = 'Apple'  =&gt;  TRUE</text>\n          <text x=\"14\" y=\"64\" fill=\"#64748b\" font-size=\"9\">Convenient for user logins, but masks case variations.</text>\n        </g>\n\n        <g transform=\"translate(445, 55)\">\n          <rect x=\"0\" y=\"0\" width=\"400\" height=\"80\" rx=\"6\" fill=\"#faf5ff\" stroke=\"#a855f7\"/>\n          <text x=\"14\" y=\"24\" fill=\"#7e22ce\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">utf8mb4_bin (Binary Exact)</text>\n          <text x=\"14\" y=\"46\" fill=\"#6b21a8\" font-family=\"monospace\" font-size=\"10\">'apple' = 'Apple'  =&gt;  FALSE</text>\n          <text x=\"14\" y=\"64\" fill=\"#64748b\" font-size=\"9\">Evaluates ASCII / UTF-8 code point bytes directly.</text>\n        </g>\n      </svg>"
        }
      }
    ],
    "callouts": [
      {
        "type": "danger",
        "title": "The Leading Wildcard Index Killer",
        "body": "Writing LIKE '%pattern%' disables B-Tree indexes completely, forcing the engine into an O(N) full table scan. Where possible, use prefix searches (LIKE 'prefix%') or full-text indexes."
      },
      {
        "type": "warning",
        "title": "GROUP_CONCAT Silent Truncation Trap",
        "body": "MySQL defaults group_concat_max_len to 1,024 bytes. If aggregated strings exceed 1,024 characters, output is silently truncated without any warning or error."
      },
      {
        "type": "info",
        "title": "Scalar Subquery NULL Shield for Second Highest Salary",
        "body": "A naked SELECT with LIMIT 1 OFFSET 1 returns an empty set (0 rows) when total distinct rows < 2. Wrapping it as a scalar subquery SELECT (SELECT ...) guarantees a clean 1-row [NULL] return."
      }
    ]
  },
  "conceptMcqs": [
    {
      "id": 701,
      "q": "[Concept 7 Drill Q1] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 702,
      "q": "[Concept 7 Drill Q2] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 703,
      "q": "[Concept 7 Drill Q3] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 704,
      "q": "[Concept 7 Drill Q4] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 705,
      "q": "[Concept 7 Drill Q5] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 706,
      "q": "[Concept 7 Drill Q6] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 707,
      "q": "[Concept 7 Drill Q7] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 708,
      "q": "[Concept 7 Drill Q8] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 709,
      "q": "[Concept 7 Drill Q9] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 710,
      "q": "[Concept 7 Drill Q10] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 711,
      "q": "[Concept 7 Drill Q11] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 712,
      "q": "[Concept 7 Drill Q12] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 713,
      "q": "[Concept 7 Drill Q13] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 714,
      "q": "[Concept 7 Drill Q14] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 715,
      "q": "[Concept 7 Drill Q15] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 716,
      "q": "[Concept 7 Drill Q16] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 717,
      "q": "[Concept 7 Drill Q17] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 718,
      "q": "[Concept 7 Drill Q18] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 719,
      "q": "[Concept 7 Drill Q19] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 720,
      "q": "[Concept 7 Drill Q20] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 721,
      "q": "[Concept 7 Drill Q21] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 722,
      "q": "[Concept 7 Drill Q22] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 723,
      "q": "[Concept 7 Drill Q23] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 724,
      "q": "[Concept 7 Drill Q24] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 725,
      "q": "[Concept 7 Drill Q25] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 726,
      "q": "[Concept 7 Drill Q26] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 727,
      "q": "[Concept 7 Drill Q27] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 728,
      "q": "[Concept 7 Drill Q28] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 729,
      "q": "[Concept 7 Drill Q29] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 730,
      "q": "[Concept 7 Drill Q30] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 731,
      "q": "[Concept 7 Drill Q31] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 732,
      "q": "[Concept 7 Drill Q32] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 733,
      "q": "[Concept 7 Drill Q33] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 734,
      "q": "[Concept 7 Drill Q34] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 735,
      "q": "[Concept 7 Drill Q35] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 736,
      "q": "[Concept 7 Drill Q36] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 737,
      "q": "[Concept 7 Drill Q37] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 738,
      "q": "[Concept 7 Drill Q38] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 739,
      "q": "[Concept 7 Drill Q39] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 740,
      "q": "[Concept 7 Drill Q40] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 741,
      "q": "[Concept 7 Drill Q41] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 742,
      "q": "[Concept 7 Drill Q42] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 743,
      "q": "[Concept 7 Drill Q43] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 744,
      "q": "[Concept 7 Drill Q44] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 745,
      "q": "[Concept 7 Drill Q45] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 746,
      "q": "[Concept 7 Drill Q46] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 747,
      "q": "[Concept 7 Drill Q47] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 748,
      "q": "[Concept 7 Drill Q48] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 749,
      "q": "[Concept 7 Drill Q49] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 750,
      "q": "[Concept 7 Drill Q50] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 751,
      "q": "[Concept 7 Drill Q51] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 752,
      "q": "[Concept 7 Drill Q52] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 753,
      "q": "[Concept 7 Drill Q53] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 754,
      "q": "[Concept 7 Drill Q54] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 755,
      "q": "[Concept 7 Drill Q55] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 756,
      "q": "[Concept 7 Drill Q56] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 757,
      "q": "[Concept 7 Drill Q57] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 758,
      "q": "[Concept 7 Drill Q58] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 759,
      "q": "[Concept 7 Drill Q59] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 760,
      "q": "[Concept 7 Drill Q60] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 761,
      "q": "[Concept 7 Drill Q61] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 762,
      "q": "[Concept 7 Drill Q62] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 763,
      "q": "[Concept 7 Drill Q63] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 764,
      "q": "[Concept 7 Drill Q64] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 765,
      "q": "[Concept 7 Drill Q65] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 766,
      "q": "[Concept 7 Drill Q66] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 767,
      "q": "[Concept 7 Drill Q67] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 768,
      "q": "[Concept 7 Drill Q68] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 769,
      "q": "[Concept 7 Drill Q69] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 770,
      "q": "[Concept 7 Drill Q70] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 771,
      "q": "[Concept 7 Drill Q71] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 772,
      "q": "[Concept 7 Drill Q72] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 773,
      "q": "[Concept 7 Drill Q73] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 774,
      "q": "[Concept 7 Drill Q74] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 775,
      "q": "[Concept 7 Drill Q75] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 776,
      "q": "[Concept 7 Drill Q76] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 777,
      "q": "[Concept 7 Drill Q77] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 778,
      "q": "[Concept 7 Drill Q78] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 779,
      "q": "[Concept 7 Drill Q79] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 780,
      "q": "[Concept 7 Drill Q80] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 781,
      "q": "[Concept 7 Drill Q81] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 782,
      "q": "[Concept 7 Drill Q82] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 783,
      "q": "[Concept 7 Drill Q83] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 784,
      "q": "[Concept 7 Drill Q84] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 785,
      "q": "[Concept 7 Drill Q85] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 786,
      "q": "[Concept 7 Drill Q86] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 787,
      "q": "[Concept 7 Drill Q87] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 788,
      "q": "[Concept 7 Drill Q88] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 789,
      "q": "[Concept 7 Drill Q89] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 790,
      "q": "[Concept 7 Drill Q90] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 791,
      "q": "[Concept 7 Drill Q91] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 792,
      "q": "[Concept 7 Drill Q92] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 793,
      "q": "[Concept 7 Drill Q93] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 794,
      "q": "[Concept 7 Drill Q94] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 795,
      "q": "[Concept 7 Drill Q95] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 796,
      "q": "[Concept 7 Drill Q96] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 797,
      "q": "[Concept 7 Drill Q97] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 798,
      "q": "[Concept 7 Drill Q98] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 799,
      "q": "[Concept 7 Drill Q99] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 800,
      "q": "[Concept 7 Drill Q100] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    }
  ],
  "prepDrills": [
    {
      "id": 701,
      "title": "Proper Case Capitalization (Scenario 1)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 1).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 702,
      "title": "Medical Condition Prefix Matching (Scenario 2)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 2).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 703,
      "title": "Corporate Email Verification (Scenario 3)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 3).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 704,
      "title": "Daily Product Aggregation Array (Scenario 4)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 4).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 705,
      "title": "Second Highest Compensation Fallback (Scenario 5)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 5).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 706,
      "title": "Proper Case Capitalization (Scenario 6)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 6).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 707,
      "title": "Medical Condition Prefix Matching (Scenario 7)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 7).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 708,
      "title": "Corporate Email Verification (Scenario 8)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 8).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 709,
      "title": "Daily Product Aggregation Array (Scenario 9)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 9).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 710,
      "title": "Second Highest Compensation Fallback (Scenario 10)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 10).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 711,
      "title": "Proper Case Capitalization (Scenario 11)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 11).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 712,
      "title": "Medical Condition Prefix Matching (Scenario 12)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 12).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 713,
      "title": "Corporate Email Verification (Scenario 13)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 13).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 714,
      "title": "Daily Product Aggregation Array (Scenario 14)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 14).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 715,
      "title": "Second Highest Compensation Fallback (Scenario 15)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 15).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 716,
      "title": "Proper Case Capitalization (Scenario 16)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 16).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 717,
      "title": "Medical Condition Prefix Matching (Scenario 17)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 17).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 718,
      "title": "Corporate Email Verification (Scenario 18)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 18).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 719,
      "title": "Daily Product Aggregation Array (Scenario 19)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 19).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 720,
      "title": "Second Highest Compensation Fallback (Scenario 20)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 20).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 721,
      "title": "Proper Case Capitalization (Scenario 21)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 21).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 722,
      "title": "Medical Condition Prefix Matching (Scenario 22)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 22).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 723,
      "title": "Corporate Email Verification (Scenario 23)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 23).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 724,
      "title": "Daily Product Aggregation Array (Scenario 24)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 24).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 725,
      "title": "Second Highest Compensation Fallback (Scenario 25)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 25).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 726,
      "title": "Proper Case Capitalization (Scenario 26)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 26).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 727,
      "title": "Medical Condition Prefix Matching (Scenario 27)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 27).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 728,
      "title": "Corporate Email Verification (Scenario 28)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 28).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 729,
      "title": "Daily Product Aggregation Array (Scenario 29)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 29).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 730,
      "title": "Second Highest Compensation Fallback (Scenario 30)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 30).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 731,
      "title": "Proper Case Capitalization (Scenario 31)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 31).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 732,
      "title": "Medical Condition Prefix Matching (Scenario 32)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 32).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 733,
      "title": "Corporate Email Verification (Scenario 33)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 33).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 734,
      "title": "Daily Product Aggregation Array (Scenario 34)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 34).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 735,
      "title": "Second Highest Compensation Fallback (Scenario 35)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 35).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 736,
      "title": "Proper Case Capitalization (Scenario 36)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 36).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 737,
      "title": "Medical Condition Prefix Matching (Scenario 37)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 37).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 738,
      "title": "Corporate Email Verification (Scenario 38)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 38).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 739,
      "title": "Daily Product Aggregation Array (Scenario 39)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 39).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 740,
      "title": "Second Highest Compensation Fallback (Scenario 40)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 40).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 741,
      "title": "Proper Case Capitalization (Scenario 41)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 41).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 742,
      "title": "Medical Condition Prefix Matching (Scenario 42)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 42).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 743,
      "title": "Corporate Email Verification (Scenario 43)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 43).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 744,
      "title": "Daily Product Aggregation Array (Scenario 44)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 44).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 745,
      "title": "Second Highest Compensation Fallback (Scenario 45)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 45).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 746,
      "title": "Proper Case Capitalization (Scenario 46)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 46).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 747,
      "title": "Medical Condition Prefix Matching (Scenario 47)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 47).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 748,
      "title": "Corporate Email Verification (Scenario 48)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 48).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 749,
      "title": "Daily Product Aggregation Array (Scenario 49)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 49).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 750,
      "title": "Second Highest Compensation Fallback (Scenario 50)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 50).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 751,
      "title": "Proper Case Capitalization (Scenario 51)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 51).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 752,
      "title": "Medical Condition Prefix Matching (Scenario 52)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 52).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 753,
      "title": "Corporate Email Verification (Scenario 53)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 53).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 754,
      "title": "Daily Product Aggregation Array (Scenario 54)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 54).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 755,
      "title": "Second Highest Compensation Fallback (Scenario 55)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 55).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 756,
      "title": "Proper Case Capitalization (Scenario 56)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 56).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 757,
      "title": "Medical Condition Prefix Matching (Scenario 57)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 57).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 758,
      "title": "Corporate Email Verification (Scenario 58)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 58).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 759,
      "title": "Daily Product Aggregation Array (Scenario 59)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 59).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 760,
      "title": "Second Highest Compensation Fallback (Scenario 60)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 60).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 761,
      "title": "Proper Case Capitalization (Scenario 61)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 61).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 762,
      "title": "Medical Condition Prefix Matching (Scenario 62)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 62).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 763,
      "title": "Corporate Email Verification (Scenario 63)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 63).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 764,
      "title": "Daily Product Aggregation Array (Scenario 64)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 64).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 765,
      "title": "Second Highest Compensation Fallback (Scenario 65)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 65).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 766,
      "title": "Proper Case Capitalization (Scenario 66)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 66).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 767,
      "title": "Medical Condition Prefix Matching (Scenario 67)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 67).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 768,
      "title": "Corporate Email Verification (Scenario 68)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 68).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 769,
      "title": "Daily Product Aggregation Array (Scenario 69)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 69).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 770,
      "title": "Second Highest Compensation Fallback (Scenario 70)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 70).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 771,
      "title": "Proper Case Capitalization (Scenario 71)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 71).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 772,
      "title": "Medical Condition Prefix Matching (Scenario 72)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 72).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 773,
      "title": "Corporate Email Verification (Scenario 73)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 73).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 774,
      "title": "Daily Product Aggregation Array (Scenario 74)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 74).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 775,
      "title": "Second Highest Compensation Fallback (Scenario 75)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 75).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 776,
      "title": "Proper Case Capitalization (Scenario 76)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 76).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 777,
      "title": "Medical Condition Prefix Matching (Scenario 77)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 77).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 778,
      "title": "Corporate Email Verification (Scenario 78)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 78).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 779,
      "title": "Daily Product Aggregation Array (Scenario 79)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 79).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 780,
      "title": "Second Highest Compensation Fallback (Scenario 80)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 80).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 781,
      "title": "Proper Case Capitalization (Scenario 81)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 81).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 782,
      "title": "Medical Condition Prefix Matching (Scenario 82)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 82).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 783,
      "title": "Corporate Email Verification (Scenario 83)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 83).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 784,
      "title": "Daily Product Aggregation Array (Scenario 84)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 84).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 785,
      "title": "Second Highest Compensation Fallback (Scenario 85)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 85).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 786,
      "title": "Proper Case Capitalization (Scenario 86)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 86).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 787,
      "title": "Medical Condition Prefix Matching (Scenario 87)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 87).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 788,
      "title": "Corporate Email Verification (Scenario 88)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 88).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 789,
      "title": "Daily Product Aggregation Array (Scenario 89)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 89).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 790,
      "title": "Second Highest Compensation Fallback (Scenario 90)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 90).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 791,
      "title": "Proper Case Capitalization (Scenario 91)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 91).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 792,
      "title": "Medical Condition Prefix Matching (Scenario 92)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 92).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 793,
      "title": "Corporate Email Verification (Scenario 93)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 93).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 794,
      "title": "Daily Product Aggregation Array (Scenario 94)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 94).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 795,
      "title": "Second Highest Compensation Fallback (Scenario 95)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 95).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 796,
      "title": "Proper Case Capitalization (Scenario 96)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 96).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 797,
      "title": "Medical Condition Prefix Matching (Scenario 97)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 97).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 798,
      "title": "Corporate Email Verification (Scenario 98)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 98).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 799,
      "title": "Daily Product Aggregation Array (Scenario 99)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 99).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 800,
      "title": "Second Highest Compensation Fallback (Scenario 100)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 100).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    }
  ],
  "leetcodeProblems": [
    {
      "id": 1667,
      "title": "Fix Names in a Table",
      "difficulty": "Easy",
      "acceptance": "63.2%",
      "interviewFreq": "Very High • Amazon, Adobe, Google",
      "companies": [
        "Amazon",
        "Adobe",
        "Google",
        "Microsoft"
      ],
      "prompt": "Write a solution to fix the names so that only the first character is uppercase and the rest are lowercase.\n\nReturn the result table ordered by user_id.",
      "sampleInput": {
        "table": "Users",
        "columns": [
          "user_id",
          "name"
        ],
        "rows": [
          [
            1,
            "aLice"
          ],
          [
            2,
            "bOB"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "user_id",
          "name"
        ],
        "rows": [
          [
            1,
            "Alice"
          ],
          [
            2,
            "Bob"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 210\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1667: STRING DECONSTRUCTION &amp; PROPER-CASE REASSEMBLY</text>\n\n      <!-- Raw Input Table -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"115\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Users (Mangled Names)</text>\n        <text x=\"14\" y=\"50\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"11\">1 | 'aLice'</text>\n        <text x=\"14\" y=\"75\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"11\">2 | 'bOB'</text>\n      </g>\n\n      <path d=\"M 275 110 L 325 110\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Splitting Operation -->\n      <g transform=\"translate(335, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"300\" height=\"115\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">String Transformation Pipeline</text>\n        <text x=\"14\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">1. UPPER(SUBSTRING(name, 1, 1)) =&gt; 'A', 'B'</text>\n        <text x=\"14\" y=\"68\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">2. LOWER(SUBSTRING(name, 2))    =&gt; 'lice', 'ob'</text>\n        <rect x=\"14\" y=\"78\" width=\"272\" height=\"26\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"20\" y=\"95\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">CONCAT('A', 'lice') =&gt; 'Alice'</text>\n      </g>\n\n      <path d=\"M 655 110 L 705 110\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Output Table -->\n      <g transform=\"translate(715, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"135\" height=\"115\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Clean Result</text>\n        <text x=\"12\" y=\"50\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">1 | 'Alice'</text>\n        <text x=\"12\" y=\"75\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">2 | 'Bob'</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Extract the first character using `SUBSTRING(name, 1, 1)` and transform it to uppercase via `UPPER()`.",
        "Extract the tail from character 2 onward using `SUBSTRING(name, 2)` and transform it to lowercase via `LOWER()`.",
        "Combine both segments using `CONCAT()`.",
        "Order the output ascending by `user_id`."
      ],
      "trapsAndEdgeCases": [
        "1-Based Indexing: SQL string indexes start at 1, not 0. Writing `SUBSTRING(name, 0, 1)` produces empty strings in several SQL engines.",
        "Omission of length parameter in substring: `SUBSTR(name, 2)` automatically reads through the end of the string in MySQL and PostgreSQL."
      ],
      "solutionSQL": "SELECT\n    user_id,\n    CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT user_id,",
          "exp": "Emits the unique user identifier."
        },
        {
          "clause": "CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name",
          "exp": "Capitalizes the first character and lowercases remaining characters."
        },
        {
          "clause": "FROM Users",
          "exp": "Source users table."
        },
        {
          "clause": "ORDER BY user_id",
          "exp": "Sorts final rows in ascending user ID order."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Standard SUBSTRING with Explicit Length",
          "complexity": "O(N) String Scan",
          "sql": "SELECT user_id,\n       CONCAT(UPPER(SUBSTRING(name, 1, 1)), LOWER(SUBSTRING(name, 2, LENGTH(name)))) AS name\nFROM Users\nORDER BY user_id;",
          "explanation": "Equivalent standard ANSI syntax explicitly passing the length bound to the second substring argument."
        }
      ]
    },
    {
      "id": 1527,
      "title": "Patients With a Condition",
      "difficulty": "Easy",
      "acceptance": "39.4%",
      "interviewFreq": "Very High • Epic Systems, UnitedHealth, Amazon",
      "companies": [
        "Epic Systems",
        "UnitedHealth",
        "Amazon",
        "Apple"
      ],
      "prompt": "Write a solution to find the patient_id, patient_name, and conditions of the patients who have Type I Diabetes. Type I Diabetes always starts with the 'DIAB1' prefix.\n\nReturn the result table in any order.",
      "sampleInput": {
        "table": "Patients",
        "columns": [
          "patient_id",
          "patient_name",
          "conditions"
        ],
        "rows": [
          [
            1,
            "Daniel",
            "YFEV COUGH"
          ],
          [
            2,
            "Alice",
            ""
          ],
          [
            3,
            "Bob",
            "DIAB100 MYOP"
          ],
          [
            4,
            "George",
            "ACNE DIAB100"
          ],
          [
            5,
            "Alain",
            "SADM DIAB201"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "patient_id",
          "patient_name",
          "conditions"
        ],
        "rows": [
          [
            3,
            "Bob",
            "DIAB100 MYOP"
          ],
          [
            4,
            "George",
            "ACNE DIAB100"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 210\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1527: WORD-BOUNDARY PREFIX PATTERN MATCHING</text>\n\n      <!-- Raw Condition Strings -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"280\" height=\"120\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Patient Conditions</text>\n        <text x=\"14\" y=\"46\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">Bob:    'DIAB100 MYOP' (Starts with DIAB1 ✓)</text>\n        <text x=\"14\" y=\"66\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">George: 'ACNE DIAB100' (Contains ' DIAB1' ✓)</text>\n        <text x=\"14\" y=\"86\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">Alain:  'SADM DIAB201' (Type II, not I ❌)</text>\n        <text x=\"14\" y=\"106\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">Alice:  'COUGH_DIAB1'  (Middle of word ❌)</text>\n      </g>\n\n      <path d=\"M 335 115 L 385 115\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Matching Dual Predicates -->\n      <g transform=\"translate(395, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"295\" height=\"120\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Dual LIKE Match Criteria</text>\n        <text x=\"14\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">1. conditions LIKE 'DIAB1%'</text>\n        <text x=\"24\" y=\"64\" fill=\"#64748b\" font-size=\"9\">(Matches first condition in list)</text>\n        <text x=\"14\" y=\"86\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">2. conditions LIKE '% DIAB1%'</text>\n        <text x=\"24\" y=\"102\" fill=\"#64748b\" font-size=\"9\">(Matches subsequent space-delimited codes)</text>\n      </g>\n\n      <path d=\"M 710 115 L 750 115\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Output Table -->\n      <g transform=\"translate(760, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"90\" height=\"120\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Emitted</text>\n        <text x=\"12\" y=\"55\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">Bob (3)</text>\n        <text x=\"12\" y=\"80\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">George(4)</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "The ICD code for Type 1 Diabetes begins with 'DIAB1'.",
        "Because multiple conditions are space-separated in a single string, the code can appear either at the very beginning of the string (`LIKE 'DIAB1%'`) or as a secondary word preceded by a space (`LIKE '% DIAB1%'`).",
        "Writing `WHERE conditions LIKE '%DIAB1%'` is INCORRECT because it matches false positives where 'DIAB1' is embedded inside an unrelated word (e.g. 'PREDIAB100').",
        "Alternatively, using regular expressions with word boundary syntax: `conditions REGEXP '\\\\bDIAB1'`."
      ],
      "trapsAndEdgeCases": [
        "Embedded code trap: `LIKE '%DIAB1%'` matches codes like 'XDIAB100', which violates the requirement that the code *starts* with DIAB1.",
        "First condition vs subsequent: Must include both `conditions LIKE 'DIAB1%'` (no space before) and `conditions LIKE '% DIAB1%'` (space before)."
      ],
      "solutionSQL": "SELECT patient_id, patient_name, conditions\nFROM Patients\nWHERE conditions LIKE 'DIAB1%'\n   OR conditions LIKE '% DIAB1%';",
      "lineByLineExplanation": [
        {
          "clause": "SELECT patient_id, patient_name, conditions",
          "exp": "Projects required patient columns."
        },
        {
          "clause": "FROM Patients",
          "exp": "Source medical table."
        },
        {
          "clause": "WHERE conditions LIKE 'DIAB1%'",
          "exp": "Matches diabetes code appearing as the very first token in the list."
        },
        {
          "clause": "OR conditions LIKE '% DIAB1%'",
          "exp": "Matches diabetes code appearing after a preceding space delimiter."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Regular Expression Word Boundary Pattern",
          "complexity": "O(N) Regex Match",
          "sql": "SELECT patient_id, patient_name, conditions\nFROM Patients\nWHERE conditions REGEXP '(^|[[:space:]])DIAB1';",
          "explanation": "Uses regex POSIX bracket character classes to match DIAB1 either at start of string or following whitespace."
        }
      ]
    },
    {
      "id": 1517,
      "title": "Find Users With Valid E-Mails",
      "difficulty": "Easy",
      "acceptance": "27.5%",
      "interviewFreq": "Very High • Meta, Google, Uber",
      "companies": [
        "Meta",
        "Google",
        "Uber",
        "Amazon"
      ],
      "prompt": "Write a solution to find the users who have valid emails.\n\nA valid e-mail has a prefix name and a domain where:\n1. The prefix name is a string that starts with a letter and can contain letters (upper or lower case), digits, underscore '_', period '.', and/or dash '-'.\n2. The domain is '@leetcode.com'.\n\nReturn the result table in any order.",
      "sampleInput": {
        "table": "Users",
        "columns": [
          "user_id",
          "name",
          "mail"
        ],
        "rows": [
          [
            1,
            "Winston",
            "winston@leetcode.com"
          ],
          [
            2,
            "Jonathan",
            "jonathanisgreat"
          ],
          [
            3,
            "Annabelle",
            "bella-@leetcode.com"
          ],
          [
            4,
            "Sally",
            "sally.come@leetcode.com"
          ],
          [
            5,
            "Marwan",
            "quarz#2020@leetcode.com"
          ],
          [
            6,
            "David",
            "david69@gmail.com"
          ],
          [
            7,
            "Shapiro",
            ".shapiro@leetcode.com"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "user_id",
          "name",
          "mail"
        ],
        "rows": [
          [
            1,
            "Winston",
            "winston@leetcode.com"
          ],
          [
            3,
            "Annabelle",
            "bella-@leetcode.com"
          ],
          [
            4,
            "Sally",
            "sally.come@leetcode.com"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 210\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1517: REGEX VALIDATION SPECIFICATION &amp; REJECTION REASONS</text>\n\n      <!-- Candidates Table -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"340\" height=\"120\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Evaluated Email Addresses</text>\n        <text x=\"14\" y=\"42\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">winston@leetcode.com    [VALID ✓]</text>\n        <text x=\"14\" y=\"58\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">bella-@leetcode.com     [VALID ✓]</text>\n        <text x=\"14\" y=\"74\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">quarz#2020@leetcode.com [INVALID: '#' char ❌]</text>\n        <text x=\"14\" y=\"90\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">.shapiro@leetcode.com   [INVALID: starts with '.' ❌]</text>\n        <text x=\"14\" y=\"106\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">david69@gmail.com       [INVALID: not @leetcode.com ❌]</text>\n      </g>\n\n      <path d=\"M 395 115 L 440 115\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Regex Automaton -->\n      <g transform=\"translate(450, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"390\" height=\"120\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Regex Pattern Formulation</text>\n        <rect x=\"14\" y=\"35\" width=\"362\" height=\"30\" rx=\"4\" fill=\"#ffffff\" stroke=\"#93c5fd\"/>\n        <text x=\"22\" y=\"55\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$</text>\n        <text x=\"14\" y=\"82\" fill=\"#1e40af\" font-size=\"9.5\">&bull; ^[a-zA-Z]: First char is strictly a letter</text>\n        <text x=\"14\" y=\"96\" fill=\"#1e40af\" font-size=\"9.5\">&bull; [a-zA-Z0-9_.-]*: Remaining allowed prefix characters</text>\n        <text x=\"14\" y=\"110\" fill=\"#1e40af\" font-size=\"9.5\">&bull; @leetcode[.]com$: Fixed literal domain ending</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "The prefix must begin strictly with a letter: `^[a-zA-Z]`.",
        "The rest of the prefix can contain letters, numbers, underscores, periods, and hyphens: `[a-zA-Z0-9_.-]*`.",
        "The domain must strictly equal `@leetcode.com`.",
        "Because the dot `.` is a regex wildcard meaning 'any character', we must escape it as `[.]` or `\\\\.`.",
        "Anchor the pattern to both ends of the string using `^` and `$` to prevent partial matches."
      ],
      "trapsAndEdgeCases": [
        "Unescaped dot trap: Writing `@leetcode.com` matches `@leetcode?com` or `@leetcodeXcom` because unescaped `.` matches anything.",
        "Prefix starting character: Emails starting with digits or punctuation (like `.shapiro@leetcode.com`) must be rejected.",
        "Illegal characters: Disallow `#`, `&`, `+`, etc."
      ],
      "solutionSQL": "SELECT user_id, name, mail\nFROM Users\nWHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$';",
      "lineByLineExplanation": [
        {
          "clause": "SELECT user_id, name, mail",
          "exp": "Projects required user identity attributes."
        },
        {
          "clause": "FROM Users",
          "exp": "Source users directory."
        },
        {
          "clause": "WHERE mail REGEXP '^[a-zA-Z]...'",
          "exp": "Anchors start and enforces first character is an alphabetic letter."
        },
        {
          "clause": "...[a-zA-Z0-9_.-]*...",
          "exp": "Allows valid alphanumeric and symbol characters in prefix."
        },
        {
          "clause": "...@leetcode[.]com$'",
          "exp": "Enforces exact domain and anchors to the strict end of the string."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Double Backslash Escaped Pattern",
          "complexity": "O(N) Regex",
          "sql": "SELECT user_id, name, mail\nFROM Users\nWHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_\\\\.-]*@leetcode\\\\.com$';",
          "explanation": "Equivalent standard regex escaping the period and dash with double backslashes."
        }
      ]
    },
    {
      "id": 1484,
      "title": "Group Sold Products By The Date",
      "difficulty": "Easy",
      "acceptance": "83.6%",
      "interviewFreq": "Very High • Amazon, Apple, Meta",
      "companies": [
        "Amazon",
        "Apple",
        "Meta",
        "Adobe"
      ],
      "prompt": "Write a solution to find for each date the number of different products sold and their names.\n\nThe sold products names for each date should be sorted lexicographically.\n\nReturn the result table ordered by sell_date.",
      "sampleInput": {
        "table": "Activities",
        "columns": [
          "sell_date",
          "product"
        ],
        "rows": [
          [
            "2020-05-30",
            "Headphone"
          ],
          [
            "2020-06-01",
            "Pencil"
          ],
          [
            "2020-06-02",
            "Mask"
          ],
          [
            "2020-05-30",
            "Basketball"
          ],
          [
            "2020-06-01",
            "Bible"
          ],
          [
            "2020-06-02",
            "Mask"
          ],
          [
            "2020-05-30",
            "T-Shirt"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "sell_date",
          "num_sold",
          "products"
        ],
        "rows": [
          [
            "2020-05-30",
            3,
            "Basketball,Headphone,T-Shirt"
          ],
          [
            "2020-06-01",
            2,
            "Bible,Pencil"
          ],
          [
            "2020-06-02",
            1,
            "Mask"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 210\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1484: DISTINCT STRING AGGREGATION &amp; LEXICOGRAPHIC SORTING</text>\n\n      <!-- Raw Rows -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"120\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Activities (Unsorted)</text>\n        <text x=\"14\" y=\"46\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2020-05-30: Headphone</text>\n        <text x=\"14\" y=\"66\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2020-05-30: Basketball</text>\n        <text x=\"14\" y=\"86\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2020-05-30: T-Shirt</text>\n        <text x=\"14\" y=\"106\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2020-06-02: Mask, Mask (Dup!)</text>\n      </g>\n\n      <path d=\"M 275 115 L 325 115\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- GROUP_CONCAT -->\n      <g transform=\"translate(335, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"280\" height=\"120\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">GROUP_CONCAT Parameters</text>\n        <text x=\"14\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">DISTINCT product</text>\n        <text x=\"14\" y=\"66\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">ORDER BY product ASC</text>\n        <text x=\"14\" y=\"84\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">SEPARATOR ','</text>\n        <rect x=\"14\" y=\"94\" width=\"252\" height=\"20\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"20\" y=\"108\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"8.5\">num_sold = COUNT(DISTINCT product)</text>\n      </g>\n\n      <path d=\"M 635 115 L 685 115\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Emitted Table -->\n      <g transform=\"translate(695, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"155\" height=\"120\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Projected Result</text>\n        <text x=\"12\" y=\"46\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">2020-05-30 | 3</text>\n        <text x=\"12\" y=\"60\" fill=\"#475569\" font-family=\"monospace\" font-size=\"8\">\"Basketball,Headphone,T-Shirt\"</text>\n        <text x=\"12\" y=\"82\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">2020-06-02 | 1</text>\n        <text x=\"12\" y=\"96\" fill=\"#475569\" font-family=\"monospace\" font-size=\"8\">\"Mask\"</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Group rows by `sell_date`.",
        "Calculate distinct product count: `COUNT(DISTINCT product) AS num_sold`.",
        "Concatenate the distinct names using MySQL's `GROUP_CONCAT()` with `DISTINCT`, `ORDER BY product`, and `SEPARATOR ','`.",
        "Sort final table ascending by `sell_date`."
      ],
      "trapsAndEdgeCases": [
        "Duplicate product names on same date: Notice on 2020-06-02, 'Mask' was sold twice. Omitting `DISTINCT` would generate 'Mask,Mask' and count=2, failing the test.",
        "Alphabetical ordering inside delimiter: The problem strictly demands lexicographically ordered names. In `GROUP_CONCAT`, you must include `ORDER BY product` inside the function parentheses!"
      ],
      "solutionSQL": "SELECT\n    sell_date,\n    COUNT(DISTINCT product) AS num_sold,\n    GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products\nFROM Activities\nGROUP BY sell_date\nORDER BY sell_date;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT sell_date,",
          "exp": "Projects the calendar date group key."
        },
        {
          "clause": "COUNT(DISTINCT product) AS num_sold,",
          "exp": "Counts unique items sold on that calendar date."
        },
        {
          "clause": "GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products",
          "exp": "Folds distinct products into an alphabetically sorted, comma-delimited string."
        },
        {
          "clause": "FROM Activities GROUP BY sell_date",
          "exp": "Aggregates across each distinct sales date."
        },
        {
          "clause": "ORDER BY sell_date",
          "exp": "Sorts final calendar report chronologically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "PostgreSQL STRING_AGG Syntax",
          "complexity": "O(N log N) String Aggregation",
          "sql": "SELECT sell_date,\n       COUNT(DISTINCT product) AS num_sold,\n       STRING_AGG(DISTINCT product, ',' ORDER BY product) AS products\nFROM Activities\nGROUP BY sell_date\nORDER BY sell_date;",
          "explanation": "Equivalent query in PostgreSQL using the ANSI-compliant STRING_AGG function."
        }
      ]
    },
    {
      "id": 1327,
      "title": "List the Products Ordered in a Period",
      "difficulty": "Easy",
      "acceptance": "66.5%",
      "interviewFreq": "High • Amazon, Walmart, Target",
      "companies": [
        "Amazon",
        "Walmart",
        "Target",
        "Wayfair"
      ],
      "prompt": "Write a solution to get the names of products that have at least 100 units ordered in February 2020 and their amount.\n\nReturn the result table in any order.",
      "sampleInput": {
        "table": "Products & Orders",
        "columns": [
          "product_id",
          "product_name",
          "product_category",
          "order_date",
          "unit"
        ],
        "rows": [
          [
            1,
            "Leetcode Solutions",
            "Book",
            "2020-02-10",
            60
          ],
          [
            1,
            "Leetcode Solutions",
            "Book",
            "2020-02-17",
            70
          ],
          [
            2,
            "Jewels of Stringology",
            "Book",
            "2020-01-18",
            30
          ],
          [
            3,
            "HP",
            "Laptop",
            "2020-02-24",
            50
          ],
          [
            4,
            "Lenovo",
            "Laptop",
            "2020-02-25",
            99
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "product_name",
          "unit"
        ],
        "rows": [
          [
            "Leetcode Solutions",
            130
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"170\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1327: TEMPORAL FILTER &amp; POST-AGGREGATION HAVING THRESHOLD</text>\n\n      <!-- Raw Orders Join -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"280\" height=\"110\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Products JOIN Orders</text>\n        <text x=\"14\" y=\"46\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1 (Solutions): 2020-02-10 (60 units)</text>\n        <text x=\"14\" y=\"64\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1 (Solutions): 2020-02-17 (70 units)</text>\n        <text x=\"14\" y=\"82\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">P2: Jan 2020 (Filtered out ❌)</text>\n        <text x=\"14\" y=\"100\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">P4 (Lenovo): 99 units (&lt; 100 ❌)</text>\n      </g>\n\n      <path d=\"M 335 110 L 385 110\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Execution Path -->\n      <g transform=\"translate(395, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"270\" height=\"110\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Execution Gates</text>\n        <text x=\"14\" y=\"46\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">WHERE order_date BETWEEN</text>\n        <text x=\"24\" y=\"62\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">'2020-02-01' AND '2020-02-29'</text>\n        <rect x=\"14\" y=\"74\" width=\"242\" height=\"26\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"20\" y=\"91\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">HAVING SUM(unit) &gt;= 100</text>\n      </g>\n\n      <path d=\"M 685 110 L 735 110\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Result Table -->\n      <g transform=\"translate(745, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"105\" height=\"110\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Result</text>\n        <text x=\"12\" y=\"55\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">Solutions</text>\n        <rect x=\"10\" y=\"70\" width=\"85\" height=\"26\" rx=\"4\" fill=\"#dcfce7\"/>\n        <text x=\"52\" y=\"87\" text-anchor=\"middle\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">130</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Join `Products` with `Orders` on `product_id`.",
        "Filter for February 2020 dates using `WHERE order_date >= '2020-02-01' AND order_date < '2020-03-01'` or `order_date LIKE '2020-02%'`.",
        "Group by `product_name` and calculate `SUM(unit)`.",
        "Filter the aggregated groups using `HAVING SUM(unit) >= 100`."
      ],
      "trapsAndEdgeCases": [
        "WHERE vs HAVING: Filtering by date must occur in `WHERE` prior to aggregation to avoid summing sales outside February. Filtering by total volume must occur in `HAVING` after sum evaluation.",
        "Leap year in February 2020: 2020 was a leap year (February had 29 days). Using explicit range `< '2020-03-01'` prevents boundary omission bugs."
      ],
      "solutionSQL": "SELECT\n    p.product_name,\n    SUM(o.unit) AS unit\nFROM Products p\nJOIN Orders o ON p.product_id = o.product_id\nWHERE o.order_date >= '2020-02-01'\n  AND o.order_date < '2020-03-01'\nGROUP BY p.product_id, p.product_name\nHAVING SUM(o.unit) >= 100;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT p.product_name, SUM(o.unit) AS unit",
          "exp": "Projects product title and total summed orders."
        },
        {
          "clause": "FROM Products p JOIN Orders o ON p.product_id = o.product_id",
          "exp": "Binds product names to purchase units."
        },
        {
          "clause": "WHERE o.order_date >= '2020-02-01' AND o.order_date < '2020-03-01'",
          "exp": "SARGable date range covering all 29 days of February 2020."
        },
        {
          "clause": "GROUP BY p.product_id, p.product_name",
          "exp": "Groups transactions by product identity."
        },
        {
          "clause": "HAVING SUM(o.unit) >= 100",
          "exp": "Filters out products with fewer than 100 total units."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "DATE_FORMAT Pattern",
          "complexity": "O(N log N) Hash Group",
          "sql": "SELECT p.product_name, SUM(o.unit) AS unit\nFROM Products p\nJOIN Orders o ON p.product_id = o.product_id\nWHERE DATE_FORMAT(o.order_date, '%Y-%m') = '2020-02'\nGROUP BY p.product_id, p.product_name\nHAVING SUM(o.unit) >= 100;",
          "explanation": "Uses DATE_FORMAT helper for concise month string matching."
        }
      ]
    },
    {
      "id": 176,
      "title": "Second Highest Salary",
      "difficulty": "Medium",
      "acceptance": "39.1%",
      "interviewFreq": "Very High • Google, Amazon, Meta, Microsoft",
      "companies": [
        "Google",
        "Amazon",
        "Meta",
        "Microsoft",
        "Apple",
        "Goldman Sachs"
      ],
      "prompt": "Write a solution to find the second highest distinct salary from the Employee table. If there is no second highest salary, return null (return null in Pandas/None in Python).\n\nReturn the result table with column name 'SecondHighestSalary'.",
      "sampleInput": {
        "table": "Employee",
        "columns": [
          "id",
          "salary"
        ],
        "rows": [
          [
            1,
            100
          ],
          [
            2,
            200
          ],
          [
            3,
            300
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "SecondHighestSalary"
        ],
        "rows": [
          [
            200
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"170\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #176: DISTINCT RANKING &amp; SCALAR SUBQUERY NULL WRAPPER</text>\n\n      <!-- Salary Hierarchy -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"110\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Salary Table</text>\n        <text x=\"14\" y=\"46\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">ID 3: $300 [Rank 1 Max]</text>\n        <rect x=\"10\" y=\"54\" width=\"200\" height=\"24\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"70\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">ID 2: $200 [Rank 2 TARGET ✓]</text>\n        <text x=\"14\" y=\"94\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">ID 1: $100 [Rank 3]</text>\n      </g>\n\n      <path d=\"M 275 110 L 325 110\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Inner Logic -->\n      <g transform=\"translate(335, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"260\" height=\"110\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Inner OFFSET Subquery</text>\n        <text x=\"14\" y=\"46\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">SELECT DISTINCT salary</text>\n        <text x=\"14\" y=\"64\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">FROM Employee</text>\n        <text x=\"14\" y=\"82\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">ORDER BY salary DESC</text>\n        <text x=\"14\" y=\"100\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">LIMIT 1 OFFSET 1</text>\n      </g>\n\n      <path d=\"M 615 110 L 665 110\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Outer Wrapper -->\n      <g transform=\"translate(675, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"175\" height=\"110\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Outer Wrapper</text>\n        <text x=\"12\" y=\"46\" fill=\"#166534\" font-size=\"9\">SELECT (inner) AS</text>\n        <text x=\"12\" y=\"60\" fill=\"#166534\" font-size=\"9\">SecondHighestSalary</text>\n        <rect x=\"10\" y=\"74\" width=\"155\" height=\"26\" rx=\"4\" fill=\"#dcfce7\"/>\n        <text x=\"20\" y=\"91\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">If 0 rows =&gt; NULL ✓</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Find distinct salaries, sort descending, and grab the 2nd value with `LIMIT 1 OFFSET 1`.",
        "The critical requirement is handling tables with fewer than 2 distinct salaries (e.g. only 1 employee). A naked `LIMIT 1 OFFSET 1` returns 0 rows (an empty set), failing the test.",
        "Wrapping the query inside an outer `SELECT (SELECT ... ) AS SecondHighestSalary` guarantees that an empty set automatically casts into a 1-row `NULL` output token."
      ],
      "trapsAndEdgeCases": [
        "The 0-row vs NULL trap: If the table has only `[100]`, `SELECT DISTINCT salary ... LIMIT 1 OFFSET 1` returns 0 rows. You must return 1 row containing `null`.",
        "Duplicate maximum salaries: If two employees both earn 300, omitting `DISTINCT` would pick the second 300 instead of 200."
      ],
      "solutionSQL": "SELECT (\n    SELECT DISTINCT salary\n    FROM Employee\n    ORDER BY salary DESC\n    LIMIT 1 OFFSET 1\n) AS SecondHighestSalary;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT ( ... ) AS SecondHighestSalary;",
          "exp": "Scalar subquery wrapper: forces 0 matching rows to emit a 1-row NULL value."
        },
        {
          "clause": "SELECT DISTINCT salary",
          "exp": "Deduplicates salaries to prevent ties from stealing rank 2."
        },
        {
          "clause": "FROM Employee",
          "exp": "Scans staff compensation figures."
        },
        {
          "clause": "ORDER BY salary DESC",
          "exp": "Sorts compensation in descending order."
        },
        {
          "clause": "LIMIT 1 OFFSET 1",
          "exp": "Skips the highest salary (#1) and picks strictly the second highest (#2)."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "IFNULL Wrapper with Subquery",
          "complexity": "O(N log N) Sort",
          "sql": "SELECT IFNULL((\n    SELECT DISTINCT salary\n    FROM Employee\n    ORDER BY salary DESC\n    LIMIT 1 OFFSET 1\n), NULL) AS SecondHighestSalary;",
          "explanation": "Explicitly uses IFNULL wrapper to define the fallback return."
        },
        {
          "name": "MAX() Less Than MAX() Pattern",
          "complexity": "O(N) Table Scans",
          "sql": "SELECT MAX(salary) AS SecondHighestSalary\nFROM Employee\nWHERE salary < (\n    SELECT MAX(salary) FROM Employee\n);",
          "explanation": "Finds the maximum salary strictly less than the overall maximum. Naturally returns NULL on empty sets without requiring OFFSET."
        }
      ]
    },
    {
      "id": 196,
      "title": "Delete Duplicate Emails",
      "difficulty": "Easy",
      "acceptance": "60.2%",
      "interviewFreq": "Very High • Amazon, Apple, Meta",
      "companies": [
        "Amazon",
        "Apple",
        "Meta",
        "Google"
      ],
      "prompt": "Write a solution to delete all duplicate emails, keeping only one unique email with the smallest id.\n\nFor SQL users, please note that you are supposed to write a DELETE statement and not a SELECT one.\n\nAfter running your script, the answer shown is the Person table. The driver will first compile and run your piece of code and then show the Person table. The final order of the Person table does not matter.",
      "sampleInput": {
        "table": "Person",
        "columns": [
          "id",
          "email"
        ],
        "rows": [
          [
            1,
            "john@example.com"
          ],
          [
            2,
            "bob@example.com"
          ],
          [
            3,
            "john@example.com"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "email"
        ],
        "rows": [
          [
            1,
            "john@example.com"
          ],
          [
            2,
            "bob@example.com"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"170\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #196: DML SELF-JOIN DELETION TARGETING p1 (WHERE p1.id &gt; p2.id)</text>\n\n      <!-- Cross/Inner Product -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"310\" height=\"110\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Self-Join Tuples (p1, p2)</text>\n        <text x=\"14\" y=\"44\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">p1(1, 'john') vs p2(1, 'john') =&gt; id 1 &gt; 1 (False)</text>\n        <rect x=\"8\" y=\"52\" width=\"294\" height=\"24\" rx=\"4\" fill=\"#fee2e2\" stroke=\"#ef4444\"/>\n        <text x=\"14\" y=\"68\" fill=\"#b91c1c\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">p1(3, 'john') vs p2(1, 'john') =&gt; 3 &gt; 1 (TRUE! 🚨)</text>\n        <text x=\"14\" y=\"94\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">p1(2, 'bob')  vs p2(2, 'bob')  =&gt; id 2 &gt; 2 (False)</text>\n      </g>\n\n      <path d=\"M 365 110 L 415 110\" stroke=\"#ef4444\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Execution Action -->\n      <g transform=\"translate(425, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"270\" height=\"110\" rx=\"6\" fill=\"#fff1f2\" stroke=\"#fca5a5\"/>\n        <text x=\"14\" y=\"24\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">DELETE p1 Action</text>\n        <text x=\"14\" y=\"46\" fill=\"#b91c1c\" font-size=\"9.5\">Row p1(3, 'john') meets criteria.</text>\n        <text x=\"14\" y=\"66\" fill=\"#b91c1c\" font-size=\"9.5\">Engine deletes row 3 from Person.</text>\n        <rect x=\"14\" y=\"78\" width=\"242\" height=\"24\" rx=\"4\" fill=\"#fecaca\"/>\n        <text x=\"20\" y=\"94\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">Row 1 (Smallest ID) is spared!</text>\n      </g>\n\n      <path d=\"M 715 110 L 755 110\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Remaining Table -->\n      <g transform=\"translate(765, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"100\" height=\"110\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Persisted</text>\n        <text x=\"12\" y=\"55\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">ID 1 | john</text>\n        <text x=\"12\" y=\"80\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">ID 2 | bob</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "The task strictly requires a `DELETE` query, modifying the table directly.",
        "Self-join `Person` with itself on `p1.email = p2.email`.",
        "Filter for cases where `p1.id > p2.id`.",
        "Target `DELETE p1` so only the duplicate row with the larger ID is eliminated, keeping the record with the minimum ID intact."
      ],
      "trapsAndEdgeCases": [
        "SELECT vs DELETE: The problem driver evaluates modifications to the `Person` table. Writing a `SELECT` statement fails compilation.",
        "MySQL Target Table Update Trap: In MySQL, you cannot write `DELETE FROM Person WHERE id NOT IN (SELECT MIN(id) FROM Person)` directly because MySQL prohibits modifying a table you are selecting from in a subquery! The self-join `DELETE p1 FROM Person p1, Person p2` cleanly circumvents this restriction."
      ],
      "solutionSQL": "DELETE p1\nFROM Person p1,\n     Person p2\nWHERE p1.email = p2.email\n  AND p1.id > p2.id;",
      "lineByLineExplanation": [
        {
          "clause": "DELETE p1",
          "exp": "Instructs the database engine to remove rows strictly from the table alias p1."
        },
        {
          "clause": "FROM Person p1, Person p2",
          "exp": "Cross-joins the Person table with itself."
        },
        {
          "clause": "WHERE p1.email = p2.email",
          "exp": "Restricts pairs to matching duplicate email addresses."
        },
        {
          "clause": "AND p1.id > p2.id;",
          "exp": "Identifies the duplicate instance with the higher ID for removal."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery with Intermediate Derived Table",
          "complexity": "O(N) Scans",
          "sql": "DELETE FROM Person\nWHERE id NOT IN (\n    SELECT min_id FROM (\n        SELECT MIN(id) AS min_id\n        FROM Person\n        GROUP BY email\n    ) AS temp\n);",
          "explanation": "Nests the MIN(id) query inside a temporary derived table to bypass MySQL's error on updating the same table being queried."
        }
      ]
    }
  ],
  "mcqs": [
    {
      "id": 701,
      "q": "[Concept 7 Drill Q1] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 702,
      "q": "[Concept 7 Drill Q2] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 703,
      "q": "[Concept 7 Drill Q3] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 704,
      "q": "[Concept 7 Drill Q4] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 705,
      "q": "[Concept 7 Drill Q5] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 706,
      "q": "[Concept 7 Drill Q6] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 707,
      "q": "[Concept 7 Drill Q7] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 708,
      "q": "[Concept 7 Drill Q8] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 709,
      "q": "[Concept 7 Drill Q9] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 710,
      "q": "[Concept 7 Drill Q10] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 711,
      "q": "[Concept 7 Drill Q11] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 712,
      "q": "[Concept 7 Drill Q12] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 713,
      "q": "[Concept 7 Drill Q13] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 714,
      "q": "[Concept 7 Drill Q14] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 715,
      "q": "[Concept 7 Drill Q15] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 716,
      "q": "[Concept 7 Drill Q16] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 717,
      "q": "[Concept 7 Drill Q17] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 718,
      "q": "[Concept 7 Drill Q18] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 719,
      "q": "[Concept 7 Drill Q19] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 720,
      "q": "[Concept 7 Drill Q20] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 721,
      "q": "[Concept 7 Drill Q21] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 722,
      "q": "[Concept 7 Drill Q22] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 723,
      "q": "[Concept 7 Drill Q23] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 724,
      "q": "[Concept 7 Drill Q24] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 725,
      "q": "[Concept 7 Drill Q25] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 726,
      "q": "[Concept 7 Drill Q26] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 727,
      "q": "[Concept 7 Drill Q27] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 728,
      "q": "[Concept 7 Drill Q28] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 729,
      "q": "[Concept 7 Drill Q29] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 730,
      "q": "[Concept 7 Drill Q30] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 731,
      "q": "[Concept 7 Drill Q31] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 732,
      "q": "[Concept 7 Drill Q32] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 733,
      "q": "[Concept 7 Drill Q33] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 734,
      "q": "[Concept 7 Drill Q34] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 735,
      "q": "[Concept 7 Drill Q35] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 736,
      "q": "[Concept 7 Drill Q36] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 737,
      "q": "[Concept 7 Drill Q37] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 738,
      "q": "[Concept 7 Drill Q38] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 739,
      "q": "[Concept 7 Drill Q39] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 740,
      "q": "[Concept 7 Drill Q40] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 741,
      "q": "[Concept 7 Drill Q41] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 742,
      "q": "[Concept 7 Drill Q42] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 743,
      "q": "[Concept 7 Drill Q43] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 744,
      "q": "[Concept 7 Drill Q44] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 745,
      "q": "[Concept 7 Drill Q45] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 746,
      "q": "[Concept 7 Drill Q46] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 747,
      "q": "[Concept 7 Drill Q47] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 748,
      "q": "[Concept 7 Drill Q48] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 749,
      "q": "[Concept 7 Drill Q49] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 750,
      "q": "[Concept 7 Drill Q50] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 751,
      "q": "[Concept 7 Drill Q51] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 752,
      "q": "[Concept 7 Drill Q52] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 753,
      "q": "[Concept 7 Drill Q53] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 754,
      "q": "[Concept 7 Drill Q54] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 755,
      "q": "[Concept 7 Drill Q55] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 756,
      "q": "[Concept 7 Drill Q56] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 757,
      "q": "[Concept 7 Drill Q57] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 758,
      "q": "[Concept 7 Drill Q58] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 759,
      "q": "[Concept 7 Drill Q59] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 760,
      "q": "[Concept 7 Drill Q60] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 761,
      "q": "[Concept 7 Drill Q61] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 762,
      "q": "[Concept 7 Drill Q62] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 763,
      "q": "[Concept 7 Drill Q63] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 764,
      "q": "[Concept 7 Drill Q64] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 765,
      "q": "[Concept 7 Drill Q65] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 766,
      "q": "[Concept 7 Drill Q66] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 767,
      "q": "[Concept 7 Drill Q67] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 768,
      "q": "[Concept 7 Drill Q68] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 769,
      "q": "[Concept 7 Drill Q69] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 770,
      "q": "[Concept 7 Drill Q70] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 771,
      "q": "[Concept 7 Drill Q71] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 772,
      "q": "[Concept 7 Drill Q72] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 773,
      "q": "[Concept 7 Drill Q73] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 774,
      "q": "[Concept 7 Drill Q74] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 775,
      "q": "[Concept 7 Drill Q75] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 776,
      "q": "[Concept 7 Drill Q76] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 777,
      "q": "[Concept 7 Drill Q77] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 778,
      "q": "[Concept 7 Drill Q78] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 779,
      "q": "[Concept 7 Drill Q79] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 780,
      "q": "[Concept 7 Drill Q80] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 781,
      "q": "[Concept 7 Drill Q81] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 782,
      "q": "[Concept 7 Drill Q82] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 783,
      "q": "[Concept 7 Drill Q83] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 784,
      "q": "[Concept 7 Drill Q84] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 785,
      "q": "[Concept 7 Drill Q85] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 786,
      "q": "[Concept 7 Drill Q86] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 787,
      "q": "[Concept 7 Drill Q87] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 788,
      "q": "[Concept 7 Drill Q88] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 789,
      "q": "[Concept 7 Drill Q89] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 790,
      "q": "[Concept 7 Drill Q90] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 791,
      "q": "[Concept 7 Drill Q91] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 792,
      "q": "[Concept 7 Drill Q92] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 793,
      "q": "[Concept 7 Drill Q93] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 794,
      "q": "[Concept 7 Drill Q94] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 795,
      "q": "[Concept 7 Drill Q95] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    },
    {
      "id": 796,
      "q": "[Concept 7 Drill Q96] Why is `SUBSTRING('Data', 1, 1)` in SQL different from `string[0]` in Python or JavaScript?",
      "options": [
        "SQL string indexes are strictly 1-based, where index 1 represents the first character",
        "SQL string indexes are 0-based, so position 1 refers to the second character",
        "SQL does not support integer index parameters for string functions",
        "SQL requires negative index numbers to refer to the start of a string"
      ],
      "correctIndex": 0,
      "explanation": "Under the ANSI SQL specification, string positions are 1-based. Position 1 refers to the first character of the string.",
      "isTrap": false
    },
    {
      "id": 797,
      "q": "[Concept 7 Drill Q97] In MySQL, what is the result of evaluating `CONCAT('Hello', NULL, 'World')`?",
      "options": [
        "'HelloWorld'",
        "'Hello NULL World'",
        "NULL",
        "An invalid argument error is thrown"
      ],
      "correctIndex": 2,
      "explanation": "In MySQL, standard `CONCAT()` returns NULL if any of its arguments is NULL. To skip NULL values, use `CONCAT_WS()`.",
      "isTrap": true,
      "trapBadge": "NULL Concat Trap"
    },
    {
      "id": 798,
      "q": "[Concept 7 Drill Q98] Why does `WHERE name LIKE '%Smith'` trigger a Full Table Scan even if an index exists on `name`?",
      "options": [
        "Because LIKE is only supported on integer columns",
        "Because the leading `%` wildcard prevents the B-Tree index from locating candidate entry branches",
        "Because B-Tree indexes only index the length of string values",
        "Because case-insensitive collation forces the engine to ignore all index structures"
      ],
      "correctIndex": 1,
      "explanation": "B-Trees are ordered from left to right. When the prefix is wildcarded (`%Smith`), the engine cannot perform an index seek and must scan all table rows.",
      "isTrap": true,
      "trapBadge": "SARGability Trap"
    },
    {
      "id": 799,
      "q": "[Concept 7 Drill Q99] In the regex `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`, why is `[.]` used instead of a naked `.`?",
      "options": [
        "Because `[.]` enables case-insensitive matching for the dot character",
        "Because unescaped `.` matches ANY arbitrary character in regular expressions",
        "Because dots are not valid characters in standard ASCII regular expressions",
        "Because SQL requires square brackets around all vowels"
      ],
      "correctIndex": 1,
      "explanation": "In regular expressions, an unescaped dot `.` matches any single character (e.g. '@leetcodeXcom'). Enclosing it in square brackets `[.]` or escaping it `\\.` treats it as a literal period.",
      "isTrap": false
    },
    {
      "id": 800,
      "q": "[Concept 7 Drill Q100] What is the primary difference between `CHAR_LENGTH()` and `LENGTH()` in MySQL for UTF-8 strings?",
      "options": [
        "`CHAR_LENGTH` counts characters/glyphs, while `LENGTH` measures physical storage in bytes",
        "`CHAR_LENGTH` only counts uppercase letters, while `LENGTH` counts all letters",
        "`LENGTH` counts characters, while `CHAR_LENGTH` measures bits",
        "Both functions are identical aliases in all database engines"
      ],
      "correctIndex": 0,
      "explanation": "`CHAR_LENGTH` returns the number of Unicode characters, while `LENGTH` returns the number of storage bytes (multibyte characters like emojis or non-Latin scripts use 2-4 bytes).",
      "isTrap": false
    }
  ],
  "drills": [
    {
      "id": 701,
      "title": "Proper Case Capitalization (Scenario 1)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 1).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 702,
      "title": "Medical Condition Prefix Matching (Scenario 2)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 2).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 703,
      "title": "Corporate Email Verification (Scenario 3)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 3).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 704,
      "title": "Daily Product Aggregation Array (Scenario 4)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 4).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 705,
      "title": "Second Highest Compensation Fallback (Scenario 5)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 5).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 706,
      "title": "Proper Case Capitalization (Scenario 6)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 6).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 707,
      "title": "Medical Condition Prefix Matching (Scenario 7)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 7).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 708,
      "title": "Corporate Email Verification (Scenario 8)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 8).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 709,
      "title": "Daily Product Aggregation Array (Scenario 9)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 9).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 710,
      "title": "Second Highest Compensation Fallback (Scenario 10)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 10).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 711,
      "title": "Proper Case Capitalization (Scenario 11)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 11).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 712,
      "title": "Medical Condition Prefix Matching (Scenario 12)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 12).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 713,
      "title": "Corporate Email Verification (Scenario 13)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 13).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 714,
      "title": "Daily Product Aggregation Array (Scenario 14)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 14).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 715,
      "title": "Second Highest Compensation Fallback (Scenario 15)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 15).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 716,
      "title": "Proper Case Capitalization (Scenario 16)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 16).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 717,
      "title": "Medical Condition Prefix Matching (Scenario 17)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 17).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 718,
      "title": "Corporate Email Verification (Scenario 18)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 18).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 719,
      "title": "Daily Product Aggregation Array (Scenario 19)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 19).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 720,
      "title": "Second Highest Compensation Fallback (Scenario 20)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 20).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 721,
      "title": "Proper Case Capitalization (Scenario 21)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 21).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 722,
      "title": "Medical Condition Prefix Matching (Scenario 22)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 22).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 723,
      "title": "Corporate Email Verification (Scenario 23)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 23).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 724,
      "title": "Daily Product Aggregation Array (Scenario 24)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 24).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 725,
      "title": "Second Highest Compensation Fallback (Scenario 25)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 25).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 726,
      "title": "Proper Case Capitalization (Scenario 26)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 26).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 727,
      "title": "Medical Condition Prefix Matching (Scenario 27)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 27).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 728,
      "title": "Corporate Email Verification (Scenario 28)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 28).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 729,
      "title": "Daily Product Aggregation Array (Scenario 29)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 29).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 730,
      "title": "Second Highest Compensation Fallback (Scenario 30)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 30).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 731,
      "title": "Proper Case Capitalization (Scenario 31)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 31).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 732,
      "title": "Medical Condition Prefix Matching (Scenario 32)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 32).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 733,
      "title": "Corporate Email Verification (Scenario 33)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 33).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 734,
      "title": "Daily Product Aggregation Array (Scenario 34)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 34).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 735,
      "title": "Second Highest Compensation Fallback (Scenario 35)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 35).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 736,
      "title": "Proper Case Capitalization (Scenario 36)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 36).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 737,
      "title": "Medical Condition Prefix Matching (Scenario 37)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 37).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 738,
      "title": "Corporate Email Verification (Scenario 38)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 38).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 739,
      "title": "Daily Product Aggregation Array (Scenario 39)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 39).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 740,
      "title": "Second Highest Compensation Fallback (Scenario 40)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 40).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 741,
      "title": "Proper Case Capitalization (Scenario 41)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 41).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 742,
      "title": "Medical Condition Prefix Matching (Scenario 42)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 42).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 743,
      "title": "Corporate Email Verification (Scenario 43)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 43).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 744,
      "title": "Daily Product Aggregation Array (Scenario 44)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 44).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 745,
      "title": "Second Highest Compensation Fallback (Scenario 45)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 45).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 746,
      "title": "Proper Case Capitalization (Scenario 46)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 46).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 747,
      "title": "Medical Condition Prefix Matching (Scenario 47)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 47).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 748,
      "title": "Corporate Email Verification (Scenario 48)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 48).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 749,
      "title": "Daily Product Aggregation Array (Scenario 49)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 49).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 750,
      "title": "Second Highest Compensation Fallback (Scenario 50)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 50).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 751,
      "title": "Proper Case Capitalization (Scenario 51)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 51).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 752,
      "title": "Medical Condition Prefix Matching (Scenario 52)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 52).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 753,
      "title": "Corporate Email Verification (Scenario 53)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 53).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 754,
      "title": "Daily Product Aggregation Array (Scenario 54)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 54).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 755,
      "title": "Second Highest Compensation Fallback (Scenario 55)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 55).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 756,
      "title": "Proper Case Capitalization (Scenario 56)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 56).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 757,
      "title": "Medical Condition Prefix Matching (Scenario 57)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 57).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 758,
      "title": "Corporate Email Verification (Scenario 58)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 58).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 759,
      "title": "Daily Product Aggregation Array (Scenario 59)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 59).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 760,
      "title": "Second Highest Compensation Fallback (Scenario 60)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 60).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 761,
      "title": "Proper Case Capitalization (Scenario 61)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 61).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 762,
      "title": "Medical Condition Prefix Matching (Scenario 62)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 62).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 763,
      "title": "Corporate Email Verification (Scenario 63)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 63).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 764,
      "title": "Daily Product Aggregation Array (Scenario 64)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 64).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 765,
      "title": "Second Highest Compensation Fallback (Scenario 65)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 65).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 766,
      "title": "Proper Case Capitalization (Scenario 66)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 66).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 767,
      "title": "Medical Condition Prefix Matching (Scenario 67)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 67).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 768,
      "title": "Corporate Email Verification (Scenario 68)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 68).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 769,
      "title": "Daily Product Aggregation Array (Scenario 69)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 69).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 770,
      "title": "Second Highest Compensation Fallback (Scenario 70)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 70).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 771,
      "title": "Proper Case Capitalization (Scenario 71)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 71).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 772,
      "title": "Medical Condition Prefix Matching (Scenario 72)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 72).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 773,
      "title": "Corporate Email Verification (Scenario 73)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 73).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 774,
      "title": "Daily Product Aggregation Array (Scenario 74)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 74).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 775,
      "title": "Second Highest Compensation Fallback (Scenario 75)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 75).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 776,
      "title": "Proper Case Capitalization (Scenario 76)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 76).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 777,
      "title": "Medical Condition Prefix Matching (Scenario 77)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 77).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 778,
      "title": "Corporate Email Verification (Scenario 78)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 78).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 779,
      "title": "Daily Product Aggregation Array (Scenario 79)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 79).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 780,
      "title": "Second Highest Compensation Fallback (Scenario 80)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 80).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 781,
      "title": "Proper Case Capitalization (Scenario 81)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 81).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 782,
      "title": "Medical Condition Prefix Matching (Scenario 82)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 82).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 783,
      "title": "Corporate Email Verification (Scenario 83)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 83).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 784,
      "title": "Daily Product Aggregation Array (Scenario 84)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 84).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 785,
      "title": "Second Highest Compensation Fallback (Scenario 85)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 85).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 786,
      "title": "Proper Case Capitalization (Scenario 86)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 86).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 787,
      "title": "Medical Condition Prefix Matching (Scenario 87)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 87).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 788,
      "title": "Corporate Email Verification (Scenario 88)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 88).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 789,
      "title": "Daily Product Aggregation Array (Scenario 89)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 89).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 790,
      "title": "Second Highest Compensation Fallback (Scenario 90)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 90).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 791,
      "title": "Proper Case Capitalization (Scenario 91)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 91).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 792,
      "title": "Medical Condition Prefix Matching (Scenario 92)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 92).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 793,
      "title": "Corporate Email Verification (Scenario 93)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 93).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 794,
      "title": "Daily Product Aggregation Array (Scenario 94)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 94).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 795,
      "title": "Second Highest Compensation Fallback (Scenario 95)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 95).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 796,
      "title": "Proper Case Capitalization (Scenario 96)",
      "domain": "Customer Data Quality",
      "task": "Convert user names into capitalized format (first letter uppercase, remaining lowercase). (Test case 96).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 797,
      "title": "Medical Condition Prefix Matching (Scenario 97)",
      "domain": "Healthcare Informatics",
      "task": "Identify patients diagnosed with Type-1 Diabetes using prefix or whitespace-delimited code checks. (Test case 97).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 798,
      "title": "Corporate Email Verification (Scenario 98)",
      "domain": "Authentication Security",
      "task": "Validate employee email addresses adhering to strict enterprise domain specifications using REGEXP. (Test case 98).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 799,
      "title": "Daily Product Aggregation Array (Scenario 99)",
      "domain": "Retail Inventory",
      "task": "Fold multiple daily product sales into a distinct, comma-delimited string ordered alphabetically. (Test case 99).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    },
    {
      "id": 800,
      "title": "Second Highest Compensation Fallback (Scenario 100)",
      "domain": "Financial Payroll",
      "task": "Extract the second highest salary, ensuring a clean NULL return token when fewer than 2 distinct salaries exist. (Test case 100).",
      "starterSQL": "SELECT user_id, name\nFROM Users\nORDER BY user_id;",
      "solutionSQL": "SELECT user_id,\n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "explanation": "Combines UPPER() on position 1 with LOWER() on position 2 onward via CONCAT() to standardize proper-case capitalization."
    }
  ],
  "problems": [
    {
      "id": 1667,
      "title": "Fix Names in a Table",
      "difficulty": "Easy",
      "acceptance": "63.2%",
      "interviewFreq": "Very High • Amazon, Adobe, Google",
      "companies": [
        "Amazon",
        "Adobe",
        "Google",
        "Microsoft"
      ],
      "prompt": "Write a solution to fix the names so that only the first character is uppercase and the rest are lowercase.\n\nReturn the result table ordered by user_id.",
      "sampleInput": {
        "table": "Users",
        "columns": [
          "user_id",
          "name"
        ],
        "rows": [
          [
            1,
            "aLice"
          ],
          [
            2,
            "bOB"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "user_id",
          "name"
        ],
        "rows": [
          [
            1,
            "Alice"
          ],
          [
            2,
            "Bob"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 210\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1667: STRING DECONSTRUCTION &amp; PROPER-CASE REASSEMBLY</text>\n\n      <!-- Raw Input Table -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"115\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Users (Mangled Names)</text>\n        <text x=\"14\" y=\"50\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"11\">1 | 'aLice'</text>\n        <text x=\"14\" y=\"75\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"11\">2 | 'bOB'</text>\n      </g>\n\n      <path d=\"M 275 110 L 325 110\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Splitting Operation -->\n      <g transform=\"translate(335, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"300\" height=\"115\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">String Transformation Pipeline</text>\n        <text x=\"14\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">1. UPPER(SUBSTRING(name, 1, 1)) =&gt; 'A', 'B'</text>\n        <text x=\"14\" y=\"68\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">2. LOWER(SUBSTRING(name, 2))    =&gt; 'lice', 'ob'</text>\n        <rect x=\"14\" y=\"78\" width=\"272\" height=\"26\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"20\" y=\"95\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">CONCAT('A', 'lice') =&gt; 'Alice'</text>\n      </g>\n\n      <path d=\"M 655 110 L 705 110\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Output Table -->\n      <g transform=\"translate(715, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"135\" height=\"115\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Clean Result</text>\n        <text x=\"12\" y=\"50\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">1 | 'Alice'</text>\n        <text x=\"12\" y=\"75\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">2 | 'Bob'</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Extract the first character using `SUBSTRING(name, 1, 1)` and transform it to uppercase via `UPPER()`.",
        "Extract the tail from character 2 onward using `SUBSTRING(name, 2)` and transform it to lowercase via `LOWER()`.",
        "Combine both segments using `CONCAT()`.",
        "Order the output ascending by `user_id`."
      ],
      "trapsAndEdgeCases": [
        "1-Based Indexing: SQL string indexes start at 1, not 0. Writing `SUBSTRING(name, 0, 1)` produces empty strings in several SQL engines.",
        "Omission of length parameter in substring: `SUBSTR(name, 2)` automatically reads through the end of the string in MySQL and PostgreSQL."
      ],
      "solutionSQL": "SELECT\n    user_id,\n    CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT user_id,",
          "exp": "Emits the unique user identifier."
        },
        {
          "clause": "CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name",
          "exp": "Capitalizes the first character and lowercases remaining characters."
        },
        {
          "clause": "FROM Users",
          "exp": "Source users table."
        },
        {
          "clause": "ORDER BY user_id",
          "exp": "Sorts final rows in ascending user ID order."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Standard SUBSTRING with Explicit Length",
          "complexity": "O(N) String Scan",
          "sql": "SELECT user_id,\n       CONCAT(UPPER(SUBSTRING(name, 1, 1)), LOWER(SUBSTRING(name, 2, LENGTH(name)))) AS name\nFROM Users\nORDER BY user_id;",
          "explanation": "Equivalent standard ANSI syntax explicitly passing the length bound to the second substring argument."
        }
      ]
    },
    {
      "id": 1527,
      "title": "Patients With a Condition",
      "difficulty": "Easy",
      "acceptance": "39.4%",
      "interviewFreq": "Very High • Epic Systems, UnitedHealth, Amazon",
      "companies": [
        "Epic Systems",
        "UnitedHealth",
        "Amazon",
        "Apple"
      ],
      "prompt": "Write a solution to find the patient_id, patient_name, and conditions of the patients who have Type I Diabetes. Type I Diabetes always starts with the 'DIAB1' prefix.\n\nReturn the result table in any order.",
      "sampleInput": {
        "table": "Patients",
        "columns": [
          "patient_id",
          "patient_name",
          "conditions"
        ],
        "rows": [
          [
            1,
            "Daniel",
            "YFEV COUGH"
          ],
          [
            2,
            "Alice",
            ""
          ],
          [
            3,
            "Bob",
            "DIAB100 MYOP"
          ],
          [
            4,
            "George",
            "ACNE DIAB100"
          ],
          [
            5,
            "Alain",
            "SADM DIAB201"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "patient_id",
          "patient_name",
          "conditions"
        ],
        "rows": [
          [
            3,
            "Bob",
            "DIAB100 MYOP"
          ],
          [
            4,
            "George",
            "ACNE DIAB100"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 210\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1527: WORD-BOUNDARY PREFIX PATTERN MATCHING</text>\n\n      <!-- Raw Condition Strings -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"280\" height=\"120\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Patient Conditions</text>\n        <text x=\"14\" y=\"46\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">Bob:    'DIAB100 MYOP' (Starts with DIAB1 ✓)</text>\n        <text x=\"14\" y=\"66\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">George: 'ACNE DIAB100' (Contains ' DIAB1' ✓)</text>\n        <text x=\"14\" y=\"86\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">Alain:  'SADM DIAB201' (Type II, not I ❌)</text>\n        <text x=\"14\" y=\"106\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">Alice:  'COUGH_DIAB1'  (Middle of word ❌)</text>\n      </g>\n\n      <path d=\"M 335 115 L 385 115\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Matching Dual Predicates -->\n      <g transform=\"translate(395, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"295\" height=\"120\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Dual LIKE Match Criteria</text>\n        <text x=\"14\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">1. conditions LIKE 'DIAB1%'</text>\n        <text x=\"24\" y=\"64\" fill=\"#64748b\" font-size=\"9\">(Matches first condition in list)</text>\n        <text x=\"14\" y=\"86\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">2. conditions LIKE '% DIAB1%'</text>\n        <text x=\"24\" y=\"102\" fill=\"#64748b\" font-size=\"9\">(Matches subsequent space-delimited codes)</text>\n      </g>\n\n      <path d=\"M 710 115 L 750 115\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Output Table -->\n      <g transform=\"translate(760, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"90\" height=\"120\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Emitted</text>\n        <text x=\"12\" y=\"55\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">Bob (3)</text>\n        <text x=\"12\" y=\"80\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">George(4)</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "The ICD code for Type 1 Diabetes begins with 'DIAB1'.",
        "Because multiple conditions are space-separated in a single string, the code can appear either at the very beginning of the string (`LIKE 'DIAB1%'`) or as a secondary word preceded by a space (`LIKE '% DIAB1%'`).",
        "Writing `WHERE conditions LIKE '%DIAB1%'` is INCORRECT because it matches false positives where 'DIAB1' is embedded inside an unrelated word (e.g. 'PREDIAB100').",
        "Alternatively, using regular expressions with word boundary syntax: `conditions REGEXP '\\\\bDIAB1'`."
      ],
      "trapsAndEdgeCases": [
        "Embedded code trap: `LIKE '%DIAB1%'` matches codes like 'XDIAB100', which violates the requirement that the code *starts* with DIAB1.",
        "First condition vs subsequent: Must include both `conditions LIKE 'DIAB1%'` (no space before) and `conditions LIKE '% DIAB1%'` (space before)."
      ],
      "solutionSQL": "SELECT patient_id, patient_name, conditions\nFROM Patients\nWHERE conditions LIKE 'DIAB1%'\n   OR conditions LIKE '% DIAB1%';",
      "lineByLineExplanation": [
        {
          "clause": "SELECT patient_id, patient_name, conditions",
          "exp": "Projects required patient columns."
        },
        {
          "clause": "FROM Patients",
          "exp": "Source medical table."
        },
        {
          "clause": "WHERE conditions LIKE 'DIAB1%'",
          "exp": "Matches diabetes code appearing as the very first token in the list."
        },
        {
          "clause": "OR conditions LIKE '% DIAB1%'",
          "exp": "Matches diabetes code appearing after a preceding space delimiter."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Regular Expression Word Boundary Pattern",
          "complexity": "O(N) Regex Match",
          "sql": "SELECT patient_id, patient_name, conditions\nFROM Patients\nWHERE conditions REGEXP '(^|[[:space:]])DIAB1';",
          "explanation": "Uses regex POSIX bracket character classes to match DIAB1 either at start of string or following whitespace."
        }
      ]
    },
    {
      "id": 1517,
      "title": "Find Users With Valid E-Mails",
      "difficulty": "Easy",
      "acceptance": "27.5%",
      "interviewFreq": "Very High • Meta, Google, Uber",
      "companies": [
        "Meta",
        "Google",
        "Uber",
        "Amazon"
      ],
      "prompt": "Write a solution to find the users who have valid emails.\n\nA valid e-mail has a prefix name and a domain where:\n1. The prefix name is a string that starts with a letter and can contain letters (upper or lower case), digits, underscore '_', period '.', and/or dash '-'.\n2. The domain is '@leetcode.com'.\n\nReturn the result table in any order.",
      "sampleInput": {
        "table": "Users",
        "columns": [
          "user_id",
          "name",
          "mail"
        ],
        "rows": [
          [
            1,
            "Winston",
            "winston@leetcode.com"
          ],
          [
            2,
            "Jonathan",
            "jonathanisgreat"
          ],
          [
            3,
            "Annabelle",
            "bella-@leetcode.com"
          ],
          [
            4,
            "Sally",
            "sally.come@leetcode.com"
          ],
          [
            5,
            "Marwan",
            "quarz#2020@leetcode.com"
          ],
          [
            6,
            "David",
            "david69@gmail.com"
          ],
          [
            7,
            "Shapiro",
            ".shapiro@leetcode.com"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "user_id",
          "name",
          "mail"
        ],
        "rows": [
          [
            1,
            "Winston",
            "winston@leetcode.com"
          ],
          [
            3,
            "Annabelle",
            "bella-@leetcode.com"
          ],
          [
            4,
            "Sally",
            "sally.come@leetcode.com"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 210\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1517: REGEX VALIDATION SPECIFICATION &amp; REJECTION REASONS</text>\n\n      <!-- Candidates Table -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"340\" height=\"120\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Evaluated Email Addresses</text>\n        <text x=\"14\" y=\"42\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">winston@leetcode.com    [VALID ✓]</text>\n        <text x=\"14\" y=\"58\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\">bella-@leetcode.com     [VALID ✓]</text>\n        <text x=\"14\" y=\"74\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">quarz#2020@leetcode.com [INVALID: '#' char ❌]</text>\n        <text x=\"14\" y=\"90\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">.shapiro@leetcode.com   [INVALID: starts with '.' ❌]</text>\n        <text x=\"14\" y=\"106\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"9.5\">david69@gmail.com       [INVALID: not @leetcode.com ❌]</text>\n      </g>\n\n      <path d=\"M 395 115 L 440 115\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Regex Automaton -->\n      <g transform=\"translate(450, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"390\" height=\"120\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Regex Pattern Formulation</text>\n        <rect x=\"14\" y=\"35\" width=\"362\" height=\"30\" rx=\"4\" fill=\"#ffffff\" stroke=\"#93c5fd\"/>\n        <text x=\"22\" y=\"55\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10.5\" font-weight=\"700\">^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$</text>\n        <text x=\"14\" y=\"82\" fill=\"#1e40af\" font-size=\"9.5\">&bull; ^[a-zA-Z]: First char is strictly a letter</text>\n        <text x=\"14\" y=\"96\" fill=\"#1e40af\" font-size=\"9.5\">&bull; [a-zA-Z0-9_.-]*: Remaining allowed prefix characters</text>\n        <text x=\"14\" y=\"110\" fill=\"#1e40af\" font-size=\"9.5\">&bull; @leetcode[.]com$: Fixed literal domain ending</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "The prefix must begin strictly with a letter: `^[a-zA-Z]`.",
        "The rest of the prefix can contain letters, numbers, underscores, periods, and hyphens: `[a-zA-Z0-9_.-]*`.",
        "The domain must strictly equal `@leetcode.com`.",
        "Because the dot `.` is a regex wildcard meaning 'any character', we must escape it as `[.]` or `\\\\.`.",
        "Anchor the pattern to both ends of the string using `^` and `$` to prevent partial matches."
      ],
      "trapsAndEdgeCases": [
        "Unescaped dot trap: Writing `@leetcode.com` matches `@leetcode?com` or `@leetcodeXcom` because unescaped `.` matches anything.",
        "Prefix starting character: Emails starting with digits or punctuation (like `.shapiro@leetcode.com`) must be rejected.",
        "Illegal characters: Disallow `#`, `&`, `+`, etc."
      ],
      "solutionSQL": "SELECT user_id, name, mail\nFROM Users\nWHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$';",
      "lineByLineExplanation": [
        {
          "clause": "SELECT user_id, name, mail",
          "exp": "Projects required user identity attributes."
        },
        {
          "clause": "FROM Users",
          "exp": "Source users directory."
        },
        {
          "clause": "WHERE mail REGEXP '^[a-zA-Z]...'",
          "exp": "Anchors start and enforces first character is an alphabetic letter."
        },
        {
          "clause": "...[a-zA-Z0-9_.-]*...",
          "exp": "Allows valid alphanumeric and symbol characters in prefix."
        },
        {
          "clause": "...@leetcode[.]com$'",
          "exp": "Enforces exact domain and anchors to the strict end of the string."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Double Backslash Escaped Pattern",
          "complexity": "O(N) Regex",
          "sql": "SELECT user_id, name, mail\nFROM Users\nWHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_\\\\.-]*@leetcode\\\\.com$';",
          "explanation": "Equivalent standard regex escaping the period and dash with double backslashes."
        }
      ]
    },
    {
      "id": 1484,
      "title": "Group Sold Products By The Date",
      "difficulty": "Easy",
      "acceptance": "83.6%",
      "interviewFreq": "Very High • Amazon, Apple, Meta",
      "companies": [
        "Amazon",
        "Apple",
        "Meta",
        "Adobe"
      ],
      "prompt": "Write a solution to find for each date the number of different products sold and their names.\n\nThe sold products names for each date should be sorted lexicographically.\n\nReturn the result table ordered by sell_date.",
      "sampleInput": {
        "table": "Activities",
        "columns": [
          "sell_date",
          "product"
        ],
        "rows": [
          [
            "2020-05-30",
            "Headphone"
          ],
          [
            "2020-06-01",
            "Pencil"
          ],
          [
            "2020-06-02",
            "Mask"
          ],
          [
            "2020-05-30",
            "Basketball"
          ],
          [
            "2020-06-01",
            "Bible"
          ],
          [
            "2020-06-02",
            "Mask"
          ],
          [
            "2020-05-30",
            "T-Shirt"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "sell_date",
          "num_sold",
          "products"
        ],
        "rows": [
          [
            "2020-05-30",
            3,
            "Basketball,Headphone,T-Shirt"
          ],
          [
            "2020-06-01",
            2,
            "Bible,Pencil"
          ],
          [
            "2020-06-02",
            1,
            "Mask"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 210\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1484: DISTINCT STRING AGGREGATION &amp; LEXICOGRAPHIC SORTING</text>\n\n      <!-- Raw Rows -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"120\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Activities (Unsorted)</text>\n        <text x=\"14\" y=\"46\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2020-05-30: Headphone</text>\n        <text x=\"14\" y=\"66\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2020-05-30: Basketball</text>\n        <text x=\"14\" y=\"86\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2020-05-30: T-Shirt</text>\n        <text x=\"14\" y=\"106\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">2020-06-02: Mask, Mask (Dup!)</text>\n      </g>\n\n      <path d=\"M 275 115 L 325 115\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- GROUP_CONCAT -->\n      <g transform=\"translate(335, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"280\" height=\"120\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">GROUP_CONCAT Parameters</text>\n        <text x=\"14\" y=\"48\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">DISTINCT product</text>\n        <text x=\"14\" y=\"66\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">ORDER BY product ASC</text>\n        <text x=\"14\" y=\"84\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">SEPARATOR ','</text>\n        <rect x=\"14\" y=\"94\" width=\"252\" height=\"20\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"20\" y=\"108\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"8.5\">num_sold = COUNT(DISTINCT product)</text>\n      </g>\n\n      <path d=\"M 635 115 L 685 115\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Emitted Table -->\n      <g transform=\"translate(695, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"155\" height=\"120\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Projected Result</text>\n        <text x=\"12\" y=\"46\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">2020-05-30 | 3</text>\n        <text x=\"12\" y=\"60\" fill=\"#475569\" font-family=\"monospace\" font-size=\"8\">\"Basketball,Headphone,T-Shirt\"</text>\n        <text x=\"12\" y=\"82\" fill=\"#166534\" font-family=\"monospace\" font-size=\"9\">2020-06-02 | 1</text>\n        <text x=\"12\" y=\"96\" fill=\"#475569\" font-family=\"monospace\" font-size=\"8\">\"Mask\"</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Group rows by `sell_date`.",
        "Calculate distinct product count: `COUNT(DISTINCT product) AS num_sold`.",
        "Concatenate the distinct names using MySQL's `GROUP_CONCAT()` with `DISTINCT`, `ORDER BY product`, and `SEPARATOR ','`.",
        "Sort final table ascending by `sell_date`."
      ],
      "trapsAndEdgeCases": [
        "Duplicate product names on same date: Notice on 2020-06-02, 'Mask' was sold twice. Omitting `DISTINCT` would generate 'Mask,Mask' and count=2, failing the test.",
        "Alphabetical ordering inside delimiter: The problem strictly demands lexicographically ordered names. In `GROUP_CONCAT`, you must include `ORDER BY product` inside the function parentheses!"
      ],
      "solutionSQL": "SELECT\n    sell_date,\n    COUNT(DISTINCT product) AS num_sold,\n    GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products\nFROM Activities\nGROUP BY sell_date\nORDER BY sell_date;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT sell_date,",
          "exp": "Projects the calendar date group key."
        },
        {
          "clause": "COUNT(DISTINCT product) AS num_sold,",
          "exp": "Counts unique items sold on that calendar date."
        },
        {
          "clause": "GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products",
          "exp": "Folds distinct products into an alphabetically sorted, comma-delimited string."
        },
        {
          "clause": "FROM Activities GROUP BY sell_date",
          "exp": "Aggregates across each distinct sales date."
        },
        {
          "clause": "ORDER BY sell_date",
          "exp": "Sorts final calendar report chronologically."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "PostgreSQL STRING_AGG Syntax",
          "complexity": "O(N log N) String Aggregation",
          "sql": "SELECT sell_date,\n       COUNT(DISTINCT product) AS num_sold,\n       STRING_AGG(DISTINCT product, ',' ORDER BY product) AS products\nFROM Activities\nGROUP BY sell_date\nORDER BY sell_date;",
          "explanation": "Equivalent query in PostgreSQL using the ANSI-compliant STRING_AGG function."
        }
      ]
    },
    {
      "id": 1327,
      "title": "List the Products Ordered in a Period",
      "difficulty": "Easy",
      "acceptance": "66.5%",
      "interviewFreq": "High • Amazon, Walmart, Target",
      "companies": [
        "Amazon",
        "Walmart",
        "Target",
        "Wayfair"
      ],
      "prompt": "Write a solution to get the names of products that have at least 100 units ordered in February 2020 and their amount.\n\nReturn the result table in any order.",
      "sampleInput": {
        "table": "Products & Orders",
        "columns": [
          "product_id",
          "product_name",
          "product_category",
          "order_date",
          "unit"
        ],
        "rows": [
          [
            1,
            "Leetcode Solutions",
            "Book",
            "2020-02-10",
            60
          ],
          [
            1,
            "Leetcode Solutions",
            "Book",
            "2020-02-17",
            70
          ],
          [
            2,
            "Jewels of Stringology",
            "Book",
            "2020-01-18",
            30
          ],
          [
            3,
            "HP",
            "Laptop",
            "2020-02-24",
            50
          ],
          [
            4,
            "Lenovo",
            "Laptop",
            "2020-02-25",
            99
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "product_name",
          "unit"
        ],
        "rows": [
          [
            "Leetcode Solutions",
            130
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"170\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #1327: TEMPORAL FILTER &amp; POST-AGGREGATION HAVING THRESHOLD</text>\n\n      <!-- Raw Orders Join -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"280\" height=\"110\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Products JOIN Orders</text>\n        <text x=\"14\" y=\"46\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1 (Solutions): 2020-02-10 (60 units)</text>\n        <text x=\"14\" y=\"64\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">P1 (Solutions): 2020-02-17 (70 units)</text>\n        <text x=\"14\" y=\"82\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">P2: Jan 2020 (Filtered out ❌)</text>\n        <text x=\"14\" y=\"100\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">P4 (Lenovo): 99 units (&lt; 100 ❌)</text>\n      </g>\n\n      <path d=\"M 335 110 L 385 110\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Execution Path -->\n      <g transform=\"translate(395, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"270\" height=\"110\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Execution Gates</text>\n        <text x=\"14\" y=\"46\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">WHERE order_date BETWEEN</text>\n        <text x=\"24\" y=\"62\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">'2020-02-01' AND '2020-02-29'</text>\n        <rect x=\"14\" y=\"74\" width=\"242\" height=\"26\" rx=\"4\" fill=\"#dbeafe\"/>\n        <text x=\"20\" y=\"91\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">HAVING SUM(unit) &gt;= 100</text>\n      </g>\n\n      <path d=\"M 685 110 L 735 110\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Result Table -->\n      <g transform=\"translate(745, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"105\" height=\"110\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Result</text>\n        <text x=\"12\" y=\"55\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">Solutions</text>\n        <rect x=\"10\" y=\"70\" width=\"85\" height=\"26\" rx=\"4\" fill=\"#dcfce7\"/>\n        <text x=\"52\" y=\"87\" text-anchor=\"middle\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">130</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Join `Products` with `Orders` on `product_id`.",
        "Filter for February 2020 dates using `WHERE order_date >= '2020-02-01' AND order_date < '2020-03-01'` or `order_date LIKE '2020-02%'`.",
        "Group by `product_name` and calculate `SUM(unit)`.",
        "Filter the aggregated groups using `HAVING SUM(unit) >= 100`."
      ],
      "trapsAndEdgeCases": [
        "WHERE vs HAVING: Filtering by date must occur in `WHERE` prior to aggregation to avoid summing sales outside February. Filtering by total volume must occur in `HAVING` after sum evaluation.",
        "Leap year in February 2020: 2020 was a leap year (February had 29 days). Using explicit range `< '2020-03-01'` prevents boundary omission bugs."
      ],
      "solutionSQL": "SELECT\n    p.product_name,\n    SUM(o.unit) AS unit\nFROM Products p\nJOIN Orders o ON p.product_id = o.product_id\nWHERE o.order_date >= '2020-02-01'\n  AND o.order_date < '2020-03-01'\nGROUP BY p.product_id, p.product_name\nHAVING SUM(o.unit) >= 100;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT p.product_name, SUM(o.unit) AS unit",
          "exp": "Projects product title and total summed orders."
        },
        {
          "clause": "FROM Products p JOIN Orders o ON p.product_id = o.product_id",
          "exp": "Binds product names to purchase units."
        },
        {
          "clause": "WHERE o.order_date >= '2020-02-01' AND o.order_date < '2020-03-01'",
          "exp": "SARGable date range covering all 29 days of February 2020."
        },
        {
          "clause": "GROUP BY p.product_id, p.product_name",
          "exp": "Groups transactions by product identity."
        },
        {
          "clause": "HAVING SUM(o.unit) >= 100",
          "exp": "Filters out products with fewer than 100 total units."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "DATE_FORMAT Pattern",
          "complexity": "O(N log N) Hash Group",
          "sql": "SELECT p.product_name, SUM(o.unit) AS unit\nFROM Products p\nJOIN Orders o ON p.product_id = o.product_id\nWHERE DATE_FORMAT(o.order_date, '%Y-%m') = '2020-02'\nGROUP BY p.product_id, p.product_name\nHAVING SUM(o.unit) >= 100;",
          "explanation": "Uses DATE_FORMAT helper for concise month string matching."
        }
      ]
    },
    {
      "id": 176,
      "title": "Second Highest Salary",
      "difficulty": "Medium",
      "acceptance": "39.1%",
      "interviewFreq": "Very High • Google, Amazon, Meta, Microsoft",
      "companies": [
        "Google",
        "Amazon",
        "Meta",
        "Microsoft",
        "Apple",
        "Goldman Sachs"
      ],
      "prompt": "Write a solution to find the second highest distinct salary from the Employee table. If there is no second highest salary, return null (return null in Pandas/None in Python).\n\nReturn the result table with column name 'SecondHighestSalary'.",
      "sampleInput": {
        "table": "Employee",
        "columns": [
          "id",
          "salary"
        ],
        "rows": [
          [
            1,
            100
          ],
          [
            2,
            200
          ],
          [
            3,
            300
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "SecondHighestSalary"
        ],
        "rows": [
          [
            200
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"170\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #176: DISTINCT RANKING &amp; SCALAR SUBQUERY NULL WRAPPER</text>\n\n      <!-- Salary Hierarchy -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"220\" height=\"110\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"24\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Salary Table</text>\n        <text x=\"14\" y=\"46\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">ID 3: $300 [Rank 1 Max]</text>\n        <rect x=\"10\" y=\"54\" width=\"200\" height=\"24\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"70\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">ID 2: $200 [Rank 2 TARGET ✓]</text>\n        <text x=\"14\" y=\"94\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">ID 1: $100 [Rank 3]</text>\n      </g>\n\n      <path d=\"M 275 110 L 325 110\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Inner Logic -->\n      <g transform=\"translate(335, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"260\" height=\"110\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n        <text x=\"14\" y=\"24\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Inner OFFSET Subquery</text>\n        <text x=\"14\" y=\"46\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">SELECT DISTINCT salary</text>\n        <text x=\"14\" y=\"64\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">FROM Employee</text>\n        <text x=\"14\" y=\"82\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">ORDER BY salary DESC</text>\n        <text x=\"14\" y=\"100\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"9.5\">LIMIT 1 OFFSET 1</text>\n      </g>\n\n      <path d=\"M 615 110 L 665 110\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Outer Wrapper -->\n      <g transform=\"translate(675, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"175\" height=\"110\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Outer Wrapper</text>\n        <text x=\"12\" y=\"46\" fill=\"#166534\" font-size=\"9\">SELECT (inner) AS</text>\n        <text x=\"12\" y=\"60\" fill=\"#166534\" font-size=\"9\">SecondHighestSalary</text>\n        <rect x=\"10\" y=\"74\" width=\"155\" height=\"26\" rx=\"4\" fill=\"#dcfce7\"/>\n        <text x=\"20\" y=\"91\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">If 0 rows =&gt; NULL ✓</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "Find distinct salaries, sort descending, and grab the 2nd value with `LIMIT 1 OFFSET 1`.",
        "The critical requirement is handling tables with fewer than 2 distinct salaries (e.g. only 1 employee). A naked `LIMIT 1 OFFSET 1` returns 0 rows (an empty set), failing the test.",
        "Wrapping the query inside an outer `SELECT (SELECT ... ) AS SecondHighestSalary` guarantees that an empty set automatically casts into a 1-row `NULL` output token."
      ],
      "trapsAndEdgeCases": [
        "The 0-row vs NULL trap: If the table has only `[100]`, `SELECT DISTINCT salary ... LIMIT 1 OFFSET 1` returns 0 rows. You must return 1 row containing `null`.",
        "Duplicate maximum salaries: If two employees both earn 300, omitting `DISTINCT` would pick the second 300 instead of 200."
      ],
      "solutionSQL": "SELECT (\n    SELECT DISTINCT salary\n    FROM Employee\n    ORDER BY salary DESC\n    LIMIT 1 OFFSET 1\n) AS SecondHighestSalary;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT ( ... ) AS SecondHighestSalary;",
          "exp": "Scalar subquery wrapper: forces 0 matching rows to emit a 1-row NULL value."
        },
        {
          "clause": "SELECT DISTINCT salary",
          "exp": "Deduplicates salaries to prevent ties from stealing rank 2."
        },
        {
          "clause": "FROM Employee",
          "exp": "Scans staff compensation figures."
        },
        {
          "clause": "ORDER BY salary DESC",
          "exp": "Sorts compensation in descending order."
        },
        {
          "clause": "LIMIT 1 OFFSET 1",
          "exp": "Skips the highest salary (#1) and picks strictly the second highest (#2)."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "IFNULL Wrapper with Subquery",
          "complexity": "O(N log N) Sort",
          "sql": "SELECT IFNULL((\n    SELECT DISTINCT salary\n    FROM Employee\n    ORDER BY salary DESC\n    LIMIT 1 OFFSET 1\n), NULL) AS SecondHighestSalary;",
          "explanation": "Explicitly uses IFNULL wrapper to define the fallback return."
        },
        {
          "name": "MAX() Less Than MAX() Pattern",
          "complexity": "O(N) Table Scans",
          "sql": "SELECT MAX(salary) AS SecondHighestSalary\nFROM Employee\nWHERE salary < (\n    SELECT MAX(salary) FROM Employee\n);",
          "explanation": "Finds the maximum salary strictly less than the overall maximum. Naturally returns NULL on empty sets without requiring OFFSET."
        }
      ]
    },
    {
      "id": 196,
      "title": "Delete Duplicate Emails",
      "difficulty": "Easy",
      "acceptance": "60.2%",
      "interviewFreq": "Very High • Amazon, Apple, Meta",
      "companies": [
        "Amazon",
        "Apple",
        "Meta",
        "Google"
      ],
      "prompt": "Write a solution to delete all duplicate emails, keeping only one unique email with the smallest id.\n\nFor SQL users, please note that you are supposed to write a DELETE statement and not a SELECT one.\n\nAfter running your script, the answer shown is the Person table. The driver will first compile and run your piece of code and then show the Person table. The final order of the Person table does not matter.",
      "sampleInput": {
        "table": "Person",
        "columns": [
          "id",
          "email"
        ],
        "rows": [
          [
            1,
            "john@example.com"
          ],
          [
            2,
            "bob@example.com"
          ],
          [
            3,
            "john@example.com"
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "id",
          "email"
        ],
        "rows": [
          [
            1,
            "john@example.com"
          ],
          [
            2,
            "bob@example.com"
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n      <rect x=\"15\" y=\"15\" width=\"850\" height=\"170\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n      <text x=\"30\" y=\"38\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">LEETCODE #196: DML SELF-JOIN DELETION TARGETING p1 (WHERE p1.id &gt; p2.id)</text>\n\n      <!-- Cross/Inner Product -->\n      <g transform=\"translate(35, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"310\" height=\"110\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#94a3b8\"/>\n        <text x=\"14\" y=\"22\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Self-Join Tuples (p1, p2)</text>\n        <text x=\"14\" y=\"44\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">p1(1, 'john') vs p2(1, 'john') =&gt; id 1 &gt; 1 (False)</text>\n        <rect x=\"8\" y=\"52\" width=\"294\" height=\"24\" rx=\"4\" fill=\"#fee2e2\" stroke=\"#ef4444\"/>\n        <text x=\"14\" y=\"68\" fill=\"#b91c1c\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">p1(3, 'john') vs p2(1, 'john') =&gt; 3 &gt; 1 (TRUE! 🚨)</text>\n        <text x=\"14\" y=\"94\" fill=\"#334155\" font-family=\"monospace\" font-size=\"9.5\">p1(2, 'bob')  vs p2(2, 'bob')  =&gt; id 2 &gt; 2 (False)</text>\n      </g>\n\n      <path d=\"M 365 110 L 415 110\" stroke=\"#ef4444\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Execution Action -->\n      <g transform=\"translate(425, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"270\" height=\"110\" rx=\"6\" fill=\"#fff1f2\" stroke=\"#fca5a5\"/>\n        <text x=\"14\" y=\"24\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">DELETE p1 Action</text>\n        <text x=\"14\" y=\"46\" fill=\"#b91c1c\" font-size=\"9.5\">Row p1(3, 'john') meets criteria.</text>\n        <text x=\"14\" y=\"66\" fill=\"#b91c1c\" font-size=\"9.5\">Engine deletes row 3 from Person.</text>\n        <rect x=\"14\" y=\"78\" width=\"242\" height=\"24\" rx=\"4\" fill=\"#fecaca\"/>\n        <text x=\"20\" y=\"94\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">Row 1 (Smallest ID) is spared!</text>\n      </g>\n\n      <path d=\"M 715 110 L 755 110\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n      <!-- Remaining Table -->\n      <g transform=\"translate(765, 55)\">\n        <rect x=\"0\" y=\"0\" width=\"100\" height=\"110\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#22c55e\"/>\n        <text x=\"12\" y=\"24\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Persisted</text>\n        <text x=\"12\" y=\"55\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">ID 1 | john</text>\n        <text x=\"12\" y=\"80\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">ID 2 | bob</text>\n      </g>\n    </svg>",
      "logicBreakdown": [
        "The task strictly requires a `DELETE` query, modifying the table directly.",
        "Self-join `Person` with itself on `p1.email = p2.email`.",
        "Filter for cases where `p1.id > p2.id`.",
        "Target `DELETE p1` so only the duplicate row with the larger ID is eliminated, keeping the record with the minimum ID intact."
      ],
      "trapsAndEdgeCases": [
        "SELECT vs DELETE: The problem driver evaluates modifications to the `Person` table. Writing a `SELECT` statement fails compilation.",
        "MySQL Target Table Update Trap: In MySQL, you cannot write `DELETE FROM Person WHERE id NOT IN (SELECT MIN(id) FROM Person)` directly because MySQL prohibits modifying a table you are selecting from in a subquery! The self-join `DELETE p1 FROM Person p1, Person p2` cleanly circumvents this restriction."
      ],
      "solutionSQL": "DELETE p1\nFROM Person p1,\n     Person p2\nWHERE p1.email = p2.email\n  AND p1.id > p2.id;",
      "lineByLineExplanation": [
        {
          "clause": "DELETE p1",
          "exp": "Instructs the database engine to remove rows strictly from the table alias p1."
        },
        {
          "clause": "FROM Person p1, Person p2",
          "exp": "Cross-joins the Person table with itself."
        },
        {
          "clause": "WHERE p1.email = p2.email",
          "exp": "Restricts pairs to matching duplicate email addresses."
        },
        {
          "clause": "AND p1.id > p2.id;",
          "exp": "Identifies the duplicate instance with the higher ID for removal."
        }
      ],
      "alternativeSolutions": [
        {
          "name": "Subquery with Intermediate Derived Table",
          "complexity": "O(N) Scans",
          "sql": "DELETE FROM Person\nWHERE id NOT IN (\n    SELECT min_id FROM (\n        SELECT MIN(id) AS min_id\n        FROM Person\n        GROUP BY email\n    ) AS temp\n);",
          "explanation": "Nests the MIN(id) query inside a temporary derived table to bypass MySQL's error on updating the same table being queried."
        }
      ]
    }
  ]
};
