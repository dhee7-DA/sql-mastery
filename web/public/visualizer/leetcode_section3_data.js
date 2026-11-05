window.LEETCODE_SECTION_3_DATA = {
  "conceptId": "concept-3",
  "conceptNumber": 3,
  "title": "Basic Aggregates & Math",
  "subtitle": "Master physical aggregation engines (Hash vs Stream), the NULL count matrix, weighted averages, zero-division shields, and cohort retention math.",
  "keyTakeaway": "Aggregates summarize multiple rows into a single scalar value. Beware of NULL handling: COUNT(*) counts rows, but COUNT(column) ignores NULLs, and SUM(column) on empty sets returns NULL, not 0.",
  "masterclass": {
    "overview": "\n          Aggregating and grouping data is the core foundation of analytical reporting and data engineering.\n          In this masterclass, you will master the physical execution engines behind <code>GROUP BY</code> (Hash Aggregate vs Stream Aggregate), \n          the subtle 3-Valued Logic matrix of <code>COUNT(*)</code> versus <code>COUNT(col)</code>, zero-division safeguards with <code>NULLIF</code>, \n          weighted revenue mathematics, and retention cohort calculations.\n        ",
    "callouts": [
      {
        "type": "danger",
        "title": "The Empty-Set SUM Trap",
        "body": "SUM(col) on 0 rows yields NULL instead of 0. An unguarded NULL can crash backend API contracts and financial balances. Always wrap with COALESCE(SUM(col), 0)."
      },
      {
        "type": "warning",
        "title": "COUNT(*) vs COUNT(col)",
        "body": "COUNT(*) tallies row existence including NULLs. COUNT(col) discards rows where col is NULL. In LEFT JOIN queries, COUNT(*) on unmatched child rows returns 1 instead of 0!"
      },
      {
        "type": "info",
        "title": "Zero-Division Shield with NULLIF",
        "body": "Never divide directly in analytics queries. Use NULLIF(denominator, 0) combined with COALESCE to gracefully output 0 without fatal engine division-by-zero crashes."
      }
    ],
    "chapters": [
      {
        "id": "chap-3-1-hash-vs-stream",
        "number": "3.1",
        "title": "Physical Aggregation Engines: Hash Aggregate vs Stream Aggregate",
        "content": "\n          <p class=\"lc-p\">\n            When you run an aggregation query like <code class=\"lc-code-pill\">SELECT department, SUM(salary) FROM Employees GROUP BY department;</code>, \n            the database engine does not magically know how to bucket rows. Internally, modern query optimizers choose between two physical operators:\n          </p>\n\n          <div class=\"lc-rule-banner\">\n            <strong>The Two Physical Aggregation Operators:</strong><br>\n            &bull; <strong>Hash Aggregate:</strong> The engine allocates an in-memory hash table. As rows stream in, it computes a hash of the <code>GROUP BY</code> key and updates the running sum/count in that hash bucket. Complexity: $O(N)$ CPU time, $O(K)$ RAM memory where $K$ is the number of distinct groups.<br>\n            &bull; <strong>Stream Aggregate (Sort-based):</strong> If the input rows are already sorted (e.g., via a B-Tree index or explicit <code>ORDER BY</code>), the engine simply steps through rows sequentially. As long as the group key remains the same, it increments the accumulator. When the key changes, it emits the aggregated row and resets. Complexity: $O(1)$ RAM memory!\n          </div>\n\n          <p class=\"lc-p\">\n            <strong>Interview Insight:</strong> If your hash table exceeds <code>work_mem</code> or temporary buffer limits, the database spills buckets to disk (tempdb / on-disk hash spill), crashing query performance by 10x-100x. Knowing this allows you to propose index-backed stream aggregation in architecture interviews.\n          </p>\n        ",
        "svg": "<svg viewBox=\"0 0 880 220\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n          <!-- Hash Aggregate Path -->\n          <rect x=\"20\" y=\"20\" width=\"400\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n          <text x=\"35\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">1. HASH AGGREGATE (Unordered Input)</text>\n          <rect x=\"35\" y=\"60\" width=\"100\" height=\"120\" rx=\"4\" fill=\"#f8fafc\" stroke=\"#e2e8f0\"/>\n          <text x=\"45\" y=\"80\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">Dept: 'Sales'</text>\n          <text x=\"45\" y=\"105\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">Dept: 'Eng'</text>\n          <text x=\"45\" y=\"130\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">Dept: 'Sales'</text>\n          <text x=\"45\" y=\"155\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9.5\">Dept: 'HR'</text>\n\n          <path d=\"M 145 120 L 195 120\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n          <text x=\"170\" y=\"110\" text-anchor=\"middle\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9\">HASH(k)</text>\n\n          <!-- Hash Table Buckets -->\n          <rect x=\"210\" y=\"60\" width=\"190\" height=\"120\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#bfdbfe\"/>\n          <text x=\"220\" y=\"82\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">IN-MEMORY HASH TABLE</text>\n          <text x=\"220\" y=\"105\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">['Sales'] =&gt; sum: $180k</text>\n          <text x=\"220\" y=\"130\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">['Eng']   =&gt; sum: $240k</text>\n          <text x=\"220\" y=\"155\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"10\">['HR']    =&gt; sum: $90k</text>\n\n          <!-- Stream Aggregate Path -->\n          <rect x=\"450\" y=\"20\" width=\"410\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n          <text x=\"465\" y=\"45\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">2. STREAM AGGREGATE (Index Sorted)</text>\n          <rect x=\"465\" y=\"60\" width=\"160\" height=\"120\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#dcfce7\"/>\n          <text x=\"475\" y=\"82\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">1. 'Eng'   | $240k</text>\n          <text x=\"475\" y=\"105\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">2. 'HR'    | $90k</text>\n          <text x=\"475\" y=\"128\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">3. 'Sales' | $80k</text>\n          <text x=\"475\" y=\"151\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\">4. 'Sales' | $100k</text>\n\n          <path d=\"M 635 120 L 685 120\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n          <rect x=\"695\" y=\"60\" width=\"150\" height=\"120\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"705\" y=\"85\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10\" font-weight=\"700\">O(1) RAM EMIT</text>\n          <text x=\"705\" y=\"110\" fill=\"#166534\" font-size=\"10\">Emits on boundary</text>\n          <text x=\"705\" y=\"135\" fill=\"#166534\" font-size=\"10\">change. Zero spill</text>\n          <text x=\"705\" y=\"160\" fill=\"#166534\" font-size=\"10\">risk on huge data!</text>\n        </svg>"
      },
      {
        "id": "chap-3-2-null-count-matrix",
        "number": "3.2",
        "title": "The NULL Filtering Matrix: COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col)",
        "content": "\n          <p class=\"lc-p\">\n            Understanding how aggregate functions treat <code>NULL</code> values is the single most tested concept in SQL interviews.\n          </p>\n\n          <div class=\"lc-rule-banner\">\n            <strong>The Fundamental Tally Rules:</strong><br>\n            &bull; <code>COUNT(*)</code>: Counts physical row tokens. It never inspects individual column values and never skips NULLs. If a row exists, it increments the count.<br>\n            &bull; <code>COUNT(column)</code>: Evaluates the specific column expression. If the expression evaluates to <code>NULL</code>, the row is discarded from the tally!<br>\n            &bull; <code>COUNT(DISTINCT column)</code>: Evaluates column expressions, discards NULLs, and deduplicates remaining values.\n          </div>\n\n          <p class=\"lc-p\">\n            <strong>The Classic Outer Join Trap:</strong> If you perform a <code>LEFT JOIN</code> to find counts of orders per customer, writing <code>COUNT(*)</code> will count the empty placeholder row as <code>1</code> order for customers who never bought anything! You must write <code>COUNT(o.order_id)</code> to correctly receive <code>0</code>.\n          </p>\n        ",
        "svg": "<svg viewBox=\"0 0 880 220\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n          <rect x=\"20\" y=\"20\" width=\"310\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n          <text x=\"35\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">TABLE: Orders (5 Rows)</text>\n          <rect x=\"30\" y=\"55\" width=\"290\" height=\"20\" fill=\"#f8fafc\" stroke=\"#e2e8f0\"/>\n          <text x=\"40\" y=\"69\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"10\">row_id | customer_id | coupon_code</text>\n          <text x=\"40\" y=\"95\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\">1 | 101 | 'SUMMER'</text>\n          <text x=\"40\" y=\"118\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\">2 | 102 | 'SUMMER'</text>\n          <text x=\"40\" y=\"141\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"10.5\">3 | 103 | NULL</text>\n          <text x=\"40\" y=\"164\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"10.5\">4 | 104 | NULL</text>\n          <text x=\"40\" y=\"187\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"10.5\">5 | 105 | 'FALL'</text>\n\n          <!-- Arrows to Function Results -->\n          <path d=\"M 340 95 L 430 70\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n          <path d=\"M 340 120 L 430 120\" stroke=\"#16a34a\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n          <path d=\"M 340 145 L 430 170\" stroke=\"#d97706\" stroke-width=\"2\" marker-end=\"url(#arrow1378)\"/>\n\n          <!-- Results Box -->\n          <rect x=\"440\" y=\"20\" width=\"420\" height=\"180\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n          <text x=\"455\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">AGGREGATE RESULTS MATRIX</text>\n\n          <rect x=\"455\" y=\"60\" width=\"390\" height=\"36\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#bfdbfe\"/>\n          <text x=\"465\" y=\"78\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">COUNT(*) = 5</text>\n          <text x=\"465\" y=\"91\" fill=\"#64748b\" font-size=\"10\">Counts total rows unconditionally. Never skips NULL.</text>\n\n          <rect x=\"455\" y=\"103\" width=\"390\" height=\"36\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"465\" y=\"121\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">COUNT(coupon_code) = 3</text>\n          <text x=\"465\" y=\"134\" fill=\"#64748b\" font-size=\"10\">Skips rows 3 and 4 where coupon_code is NULL.</text>\n\n          <rect x=\"455\" y=\"146\" width=\"390\" height=\"36\" rx=\"4\" fill=\"#fffbeb\" stroke=\"#fde68a\"/>\n          <text x=\"465\" y=\"164\" fill=\"#92400e\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">COUNT(DISTINCT coupon_code) = 2</text>\n          <text x=\"465\" y=\"177\" fill=\"#64748b\" font-size=\"10\">Deduplicates 'SUMMER' and 'FALL'. Ignores NULL.</text>\n        </svg>"
      },
      {
        "id": "chap-3-3-empty-set-sum",
        "number": "3.3",
        "title": "The Empty-Set SUM Trap: Why SUM Returns NULL Instead of Zero",
        "content": "\n          <p class=\"lc-p\">\n            Here is a trap that trips up 80% of data analysts and software engineers in production:\n            What happens when you run <code class=\"lc-code-pill\">SELECT SUM(amount) FROM Transactions WHERE customer_id = 999;</code> when customer 999 has no transactions?\n          </p>\n\n          <div class=\"lc-rule-banner\">\n            <strong>The Empty Set Behavior:</strong><br>\n            &bull; <code>COUNT(*)</code> on zero matching rows returns <strong>0</strong>.<br>\n            &bull; <code>SUM(column)</code> on zero matching rows returns <strong>NULL</strong>, NOT 0!<br>\n            &bull; <code>AVG(column)</code> on zero matching rows returns <strong>NULL</strong>!<br>\n            &bull; <code>MIN()</code> and <code>MAX()</code> on zero matching rows return <strong>NULL</strong>!\n          </div>\n\n          <p class=\"lc-p\">\n            <strong>Production Consequence:</strong> If an application parses <code>SUM()</code> expecting a numerical balance and receives <code>NULL</code>, it throws a NullPointerException or fails a JSON serialization contract. Always wrap sum aggregations with <code class=\"lc-code-pill\">COALESCE(SUM(amount), 0)</code> or <code class=\"lc-code-pill\">IFNULL(SUM(amount), 0)</code>.\n          </p>\n        ",
        "svg": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n          <rect x=\"20\" y=\"20\" width=\"360\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n          <text x=\"35\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">WHERE customer_id = 999 (0 Rows)</text>\n          <rect x=\"35\" y=\"65\" width=\"330\" height=\"90\" rx=\"6\" fill=\"#f8fafc\" stroke=\"#e2e8f0\"/>\n          <text x=\"50\" y=\"110\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"13\" font-weight=\"700\">[ EMPTY RESULT SET BUFFER ]</text>\n          <text x=\"50\" y=\"130\" fill=\"#64748b\" font-size=\"11\">Zero rows satisfy the filter predicate.</text>\n\n          <path d=\"M 390 75 L 470 75\" stroke=\"#16a34a\" stroke-width=\"2.5\" marker-end=\"url(#arrow1378)\"/>\n          <path d=\"M 390 135 L 470 135\" stroke=\"#dc2626\" stroke-width=\"2.5\" marker-end=\"url(#arrow1378)\"/>\n\n          <!-- Output Comparison -->\n          <rect x=\"480\" y=\"20\" width=\"380\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n          <text x=\"495\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">RETURN VALUE IN MEMORY</text>\n\n          <rect x=\"495\" y=\"60\" width=\"350\" height=\"40\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"505\" y=\"80\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">COUNT(*) =&gt; 0 (Integer)</text>\n          <text x=\"505\" y=\"93\" fill=\"#64748b\" font-size=\"10\">Safe default: counting nothing yields zero.</text>\n\n          <rect x=\"495\" y=\"115\" width=\"350\" height=\"50\" rx=\"4\" fill=\"#fef2f2\" stroke=\"#fca5a5\"/>\n          <text x=\"505\" y=\"135\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">SUM(amount) =&gt; NULL (Danger!)</text>\n          <text x=\"505\" y=\"152\" fill=\"#dc2626\" font-size=\"10\" font-weight=\"600\">Summing nothing is unknown. Wrap with COALESCE(SUM(col), 0)!</text>\n        </svg>"
      },
      {
        "id": "chap-3-4-zero-division-shield",
        "number": "3.4",
        "title": "Zero-Division Shields: Using NULLIF() to Guard Production Pipelines",
        "content": "\n          <p class=\"lc-p\">\n            In business analytics, calculating conversion rates, delivery percentages, and margins requires dividing one aggregate by another:\n            <code class=\"lc-code-pill\">SELECT approved_count / total_count;</code>\n          </p>\n\n          <p class=\"lc-p\">\n            What happens on day 1 of a marketing campaign or for a brand new user who has <code>total_count = 0</code>?\n          </p>\n\n          <div class=\"lc-rule-banner\">\n            <strong>The Crash vs Shield Mechanics:</strong><br>\n            &bull; <strong>In PostgreSQL, SQL Server, and Oracle:</strong> Division by zero raises a fatal exception: <code>ERROR: division by zero</code>, abruptly terminating your entire ETL pipeline or dashboard query!<br>\n            &bull; <strong>In MySQL:</strong> Division by zero evaluates to <code>NULL</code>, but generates a warning.<br>\n            &bull; <strong>The Universal Production Pattern:</strong> Use <code class=\"lc-code-pill\">NULLIF(denominator, 0)</code>.\n          </div>\n\n          <p class=\"lc-p\">\n            <code>NULLIF(a, b)</code> returns <code>NULL</code> if $a = b$, otherwise returns $a$. \n            Because any number divided by <code>NULL</code> safely yields <code>NULL</code> (not an error!), combining with <code>COALESCE</code> ensures a resilient calculation:\n            <code class=\"lc-code-pill\">COALESCE(approved_count / NULLIF(total_count, 0), 0)</code>.\n          </p>\n        ",
        "svg": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n          <rect x=\"20\" y=\"20\" width=\"380\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n          <text x=\"35\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">UNGUARDED: numerator / denominator</text>\n          <rect x=\"35\" y=\"65\" width=\"350\" height=\"90\" rx=\"6\" fill=\"#fef2f2\" stroke=\"#fca5a5\"/>\n          <text x=\"50\" y=\"95\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">15 / 0  =&gt;  FATAL CRASH!</text>\n          <text x=\"50\" y=\"120\" fill=\"#dc2626\" font-size=\"11\">PostgreSQL: ERROR: division by zero</text>\n          <text x=\"50\" y=\"138\" fill=\"#dc2626\" font-size=\"11\">ETL pipeline aborts abruptly.</text>\n\n          <!-- Shield Box -->\n          <rect x=\"420\" y=\"20\" width=\"440\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n          <text x=\"435\" y=\"45\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">SHIELDED: COALESCE(num / NULLIF(den, 0), 0)</text>\n          <rect x=\"435\" y=\"65\" width=\"410\" height=\"90\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"450\" y=\"95\" fill=\"#166534\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">15 / NULLIF(0, 0)  =&gt;  15 / NULL  =&gt;  NULL</text>\n          <text x=\"450\" y=\"120\" fill=\"#166534\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">COALESCE(NULL, 0)  =&gt;  0.00 (Safe Return)</text>\n          <text x=\"450\" y=\"140\" fill=\"#15803d\" font-size=\"11\">Zero crashes, zero errors across all SQL dialects.</text>\n        </svg>"
      },
      {
        "id": "chap-3-5-weighted-averages",
        "number": "3.5",
        "title": "Weighted Moving & Segment Averages (Price x Quantity over Sum Quantity)",
        "content": "\n          <p class=\"lc-p\">\n            In problems like LeetCode #1251 (Average Selling Price), calculating product averages using <code class=\"lc-code-pill\">AVG(price)</code> is mathematically invalid and will cause an instant interview rejection.\n          </p>\n\n          <div class=\"lc-rule-banner\">\n            <strong>The Mathematical Reality:</strong><br>\n            Suppose you sell 1 laptop at $1,000, and 99 laptops at $500.<br>\n            &bull; <strong>Unweighted Average:</strong> $\\frac{1000 + 500}{2} = \\$750$ (Completely wrong!)<br>\n            &bull; <strong>Weighted Average:</strong> $\\frac{(1 \\times 1000) + (99 \\times 500)}{1 + 99} = \\frac{1000 + 49500}{100} = \\$505$ (Accurate real-world revenue per unit).\n          </div>\n\n          <p class=\"lc-p\">\n            The canonical SQL pattern for weighted averages is:\n            <code class=\"lc-code-pill\">ROUND(SUM(units * price) / SUM(units), 2)</code>.\n          </p>\n        ",
        "svg": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n          <rect x=\"20\" y=\"20\" width=\"370\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n          <text x=\"35\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">UNWEIGHTED NAIVE: AVG(price)</text>\n          <text x=\"35\" y=\"75\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"11\">Order 1: 1 unit  @ $1,000</text>\n          <text x=\"35\" y=\"100\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"11\">Order 2: 99 units @ $500</text>\n          <rect x=\"35\" y=\"120\" width=\"340\" height=\"40\" rx=\"4\" fill=\"#fef2f2\" stroke=\"#fca5a5\"/>\n          <text x=\"45\" y=\"145\" fill=\"#991b1b\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">AVG($1000, $500) = $750 (DISTORTION!)</text>\n\n          <rect x=\"410\" y=\"20\" width=\"450\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n          <text x=\"425\" y=\"45\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">VOLUME WEIGHTED: SUM(U * P) / SUM(U)</text>\n          <text x=\"425\" y=\"75\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\">Numerator: (1 * $1000) + (99 * $500) = $50,500</text>\n          <text x=\"425\" y=\"100\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\">Denominator: 1 + 99 = 100 units</text>\n          <rect x=\"425\" y=\"120\" width=\"420\" height=\"40\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"435\" y=\"145\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">$50,500 / 100 = $505.00 (EXACT REVENUE)</text>\n        </svg>"
      },
      {
        "id": "chap-3-6-conditional-aggregation",
        "number": "3.6",
        "title": "Conditional Aggregation: Single-Pass Pivoting with SUM(CASE WHEN ...)",
        "content": "\n          <p class=\"lc-p\">\n            In financial reporting (e.g. LeetCode #1193 - Monthly Transactions I), you often need to report both total transaction amount AND approved transaction amount in the same row.\n          </p>\n\n          <div class=\"lc-rule-banner\">\n            <strong>The Rookie Mistake vs Senior Architecture:</strong><br>\n            &bull; <strong>Rookie Approach:</strong> Write two separate queries or self-join the table to itself on <code>state = 'approved'</code>. This doubles or triples disk I/O.<br>\n            &bull; <strong>Senior Approach:</strong> Use <strong>Conditional Aggregation</strong> in a single table scan:\n            <code class=\"lc-code-pill\">SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_amount</code>.\n          </div>\n\n          <p class=\"lc-p\">\n            Similarly, to count approved transactions, you can write:\n            <code class=\"lc-code-pill\">SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END)</code> or in MySQL: <code class=\"lc-code-pill\">SUM(state = 'approved')</code>.\n          </p>\n        ",
        "svg": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n          <rect x=\"20\" y=\"20\" width=\"340\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n          <text x=\"35\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">INPUT STREAM: Transactions</text>\n          <text x=\"35\" y=\"75\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\">#1: amount $100 | state 'approved'</text>\n          <text x=\"35\" y=\"100\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"11\">#2: amount $200 | state 'declined'</text>\n          <text x=\"35\" y=\"125\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\">#3: amount $300 | state 'approved'</text>\n          <text x=\"35\" y=\"150\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"11\">Single Pass Sequential Scan</text>\n\n          <path d=\"M 370 100 L 440 100\" stroke=\"#2563eb\" stroke-width=\"2.5\" marker-end=\"url(#arrow1378)\"/>\n\n          <!-- Parallel Aggregators -->\n          <rect x=\"450\" y=\"20\" width=\"410\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#2563eb\" stroke-width=\"1.5\"/>\n          <text x=\"465\" y=\"45\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">PARALLEL ACCUMULATORS (1 PASS)</text>\n          <rect x=\"465\" y=\"60\" width=\"380\" height=\"40\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#bfdbfe\"/>\n          <text x=\"475\" y=\"85\" fill=\"#1e40af\" font-family=\"monospace\" font-size=\"11\">SUM(amount): 100 + 200 + 300 = $600</text>\n\n          <rect x=\"465\" y=\"110\" width=\"380\" height=\"50\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"475\" y=\"130\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\">SUM(CASE WHEN state='approved' THEN amount ELSE 0 END):</text>\n          <text x=\"475\" y=\"150\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">100 + 0 + 300 = $400 (ZERO EXTRA I/O!)</text>\n        </svg>"
      },
      {
        "id": "chap-3-7-first-action-cohort",
        "number": "3.7",
        "title": "First-Action Cohort Mechanics: Isolating Minimum Date Baselines",
        "content": "\n          <p class=\"lc-p\">\n            In product metrics and customer analytics (e.g. LeetCode #1174 - Immediate Food Delivery II), business leaders ask: \n            <em>\"What percentage of customers had an immediate delivery on their <strong>first order</strong>?\"</em>\n          </p>\n\n          <div class=\"lc-rule-banner\">\n            <strong>The Tuple IN Filter Pattern:</strong><br>\n            To isolate each customer's inaugural action, compute the minimum date grouped by customer:\n            <code class=\"lc-code-pill\">SELECT customer_id, MIN(order_date) FROM Delivery GROUP BY customer_id</code>.<br>\n            Then match the full record using tuple filtering:\n            <code class=\"lc-code-pill\">WHERE (customer_id, order_date) IN (SELECT customer_id, MIN(order_date) FROM Delivery GROUP BY customer_id)</code>.\n          </div>\n\n          <p class=\"lc-p\">\n            This isolates the exact cohort rows before performing subsequent conversion aggregations.\n          </p>\n        ",
        "svg": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n          <rect x=\"20\" y=\"20\" width=\"380\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n          <text x=\"35\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">CUSTOMER ACTIVITY LOG</text>\n          <rect x=\"30\" y=\"60\" width=\"360\" height=\"30\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"40\" y=\"80\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10.5\">Cust 1 | 2019-08-01 (FIRST ORDER! MIN)</text>\n          <text x=\"40\" y=\"110\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"10.5\">Cust 1 | 2019-08-02 (Follow-up)</text>\n          <text x=\"40\" y=\"135\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"10.5\">Cust 1 | 2019-08-11 (Follow-up)</text>\n          <rect x=\"30\" y=\"145\" width=\"360\" height=\"30\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"40\" y=\"165\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10.5\">Cust 2 | 2019-08-02 (FIRST ORDER! MIN)</text>\n\n          <path d=\"M 410 100 L 480 100\" stroke=\"#2563eb\" stroke-width=\"2.5\" marker-end=\"url(#arrow1378)\"/>\n\n          <!-- Filtered Output -->\n          <rect x=\"490\" y=\"20\" width=\"370\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n          <text x=\"505\" y=\"45\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">COHORT ISOLATION OUTPUT</text>\n          <text x=\"505\" y=\"80\" fill=\"#0f172a\" font-size=\"11\">Only initial customer experiences are retained:</text>\n          <rect x=\"505\" y=\"95\" width=\"340\" height=\"60\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"515\" y=\"120\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Cust 1: order_date = 2019-08-01</text>\n          <text x=\"515\" y=\"140\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\" font-weight=\"700\">Cust 2: order_date = 2019-08-02</text>\n        </svg>"
      },
      {
        "id": "chap-3-8-retention-rate-funnel",
        "number": "3.8",
        "title": "The Day-1 Retention Funnel: Temporal Churn Architecture",
        "content": "\n          <p class=\"lc-p\">\n            LeetCode #550 (Game Play Analysis IV) is the defining FAANG interview problem on SaaS & Gaming retention metrics:\n            <em>What fraction of players logged back in exactly 1 day after their very first login?</em>\n          </p>\n\n          <div class=\"lc-rule-banner\">\n            <strong>The Retention Pipeline:</strong><br>\n            1. <strong>Baseline Cohort:</strong> Identify the player's initial login date: <code>(player_id, MIN(event_date))</code>.<br>\n            2. <strong>Day-1 Return Event:</strong> Check if a record exists in Activity where <code>event_date = first_date + INTERVAL 1 DAY</code>.<br>\n            3. <strong>Metric Fraction:</strong> Count distinct returning players divided by total distinct players:\n            <code class=\"lc-code-pill\">ROUND(COUNT(DISTINCT a.player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2)</code>.\n          </div>\n        ",
        "svg": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n          <!-- Step 1 Day 0 -->\n          <rect x=\"20\" y=\"20\" width=\"240\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#2563eb\" stroke-width=\"1.5\"/>\n          <text x=\"35\" y=\"45\" fill=\"#1d4ed8\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DAY 0: FIRST LOGIN</text>\n          <text x=\"35\" y=\"75\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\">Player 1: 2016-03-01</text>\n          <text x=\"35\" y=\"100\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\">Player 2: 2016-06-25</text>\n          <text x=\"35\" y=\"125\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11\">Player 3: 2016-03-02</text>\n          <text x=\"35\" y=\"155\" fill=\"#64748b\" font-size=\"10\">Denominator = 3 players</text>\n\n          <path d=\"M 270 100 L 330 100\" stroke=\"#2563eb\" stroke-width=\"2.5\" marker-end=\"url(#arrow1378)\"/>\n          <text x=\"300\" y=\"90\" text-anchor=\"middle\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"9\">+1 DAY</text>\n\n          <!-- Step 2 Day 1 -->\n          <rect x=\"340\" y=\"20\" width=\"260\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n          <text x=\"355\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DAY 1 ACTIVITY CHECK</text>\n          <text x=\"355\" y=\"75\" fill=\"#166534\" font-family=\"monospace\" font-size=\"10.5\">P1: 2016-03-02 (MATCH! RETURNED)</text>\n          <text x=\"355\" y=\"105\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"10.5\">P2: None on 2016-06-26 (CHURNED)</text>\n          <text x=\"355\" y=\"135\" fill=\"#dc2626\" font-family=\"monospace\" font-size=\"10.5\">P3: None on 2016-03-03 (CHURNED)</text>\n\n          <path d=\"M 610 100 L 670 100\" stroke=\"#16a34a\" stroke-width=\"2.5\" marker-end=\"url(#arrow1378)\"/>\n\n          <!-- Step 3 Rate -->\n          <rect x=\"680\" y=\"20\" width=\"180\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n          <text x=\"695\" y=\"45\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">RETENTION RATE</text>\n          <text x=\"695\" y=\"80\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"11\">1 returned / 3 total</text>\n          <rect x=\"695\" y=\"100\" width=\"150\" height=\"60\" rx=\"4\" fill=\"#f0fdf4\" stroke=\"#86efac\"/>\n          <text x=\"710\" y=\"135\" fill=\"#166534\" font-family=\"monospace\" font-size=\"24\" font-weight=\"700\">0.33</text>\n        </svg>"
      }
    ]
  },
  "mcqs": [
    {
      "id": 301,
      "question": "What is the primary physical difference between a Hash Aggregate and a Stream Aggregate operator?",
      "options": [
        "Hash Aggregate requires sorted input; Stream Aggregate uses a hash table",
        "Hash Aggregate builds an in-memory hash table; Stream Aggregate requires sorted input and aggregates sequentially",
        "Stream Aggregate uses O(N) memory; Hash Aggregate uses O(1) memory",
        "They are identical operators with different names"
      ],
      "correctIndex": 1,
      "explanation": "Hash Aggregate allocates an in-memory hash table for grouping keys. Stream Aggregate reads pre-sorted input and emits aggregates as keys change.",
      "trapWarning": "Spilling a hash aggregate to disk when work_mem is exceeded causes severe latency regressions."
    },
    {
      "id": 302,
      "question": "When a query without a GROUP BY clause executes SELECT SUM(salary) FROM Employees WHERE department = 'Unknown', and no rows match, what is returned?",
      "options": [
        "0",
        "NULL",
        "An empty result set (0 rows)",
        "A division by zero runtime error"
      ],
      "correctIndex": 1,
      "explanation": "In SQL, aggregate functions (except COUNT) return NULL when evaluated over an empty set.",
      "trapWarning": "Assuming SUM() returns 0 causes silent NullPointerExceptions in application code."
    },
    {
      "id": 303,
      "question": "Under what circumstances does COUNT(*) return 0?",
      "options": [
        "When the evaluated column contains only NULL values",
        "When the input table or filtered row set contains zero rows",
        "When all rows are duplicates",
        "COUNT(*) can never return 0"
      ],
      "correctIndex": 1,
      "explanation": "COUNT(*) tallies row tokens. When zero rows satisfy the WHERE filter, it returns 0.",
      "trapWarning": "COUNT(*) never returns NULL; it returns an integer 0."
    },
    {
      "id": 304,
      "question": "How does COUNT(bonus) differ from COUNT(*) on a table where 5 out of 10 employees have bonus = NULL?",
      "options": [
        "COUNT(bonus) returns 10; COUNT(*) returns 5",
        "COUNT(bonus) returns 5; COUNT(*) returns 10",
        "Both return 5",
        "COUNT(bonus) throws an invalid argument error"
      ],
      "correctIndex": 1,
      "explanation": "COUNT(column) evaluates the column expression and explicitly ignores rows where the expression evaluates to NULL.",
      "trapWarning": "Using COUNT(column) when you intend to count rows will silently drop rows with NULLs."
    },
    {
      "id": 305,
      "question": "What does COUNT(DISTINCT country) return if the table contains: ['US', 'US', NULL, 'DE', NULL]?",
      "options": [
        "1",
        "2",
        "3",
        "5"
      ],
      "correctIndex": 1,
      "explanation": "COUNT(DISTINCT col) ignores NULLs and deduplicates non-null values. 'US' and 'DE' are the 2 distinct values.",
      "trapWarning": "NULL is never counted in COUNT(DISTINCT col)."
    },
    {
      "id": 306,
      "question": "Why does SELECT department, AVG(salary) FROM Employees WHERE AVG(salary) > 50000 GROUP BY department fail with a syntax error?",
      "options": [
        "AVG() cannot be used in a SELECT clause with GROUP BY",
        "Aggregate functions cannot appear in the WHERE clause because WHERE executes before grouping occurs",
        "department must be wrapped in an aggregate",
        "salary must be an integer"
      ],
      "correctIndex": 1,
      "explanation": "In SQL physical execution order, WHERE filters rows BEFORE aggregation occurs. Aggregates must be filtered using HAVING.",
      "trapWarning": "Attempting to filter aggregates in WHERE is a classic novice SQL trap."
    },
    {
      "id": 307,
      "question": "What does NULLIF(100, 100) return in standard SQL?",
      "options": [
        "100",
        "0",
        "NULL",
        "TRUE"
      ],
      "correctIndex": 2,
      "explanation": "NULLIF(a, b) returns NULL if a = b; otherwise, it returns a.",
      "trapWarning": "NULLIF is the universal shield against division by zero errors."
    },
    {
      "id": 308,
      "question": "In PostgreSQL, what is the result of executing SELECT 10 / 0;?",
      "options": [
        "NULL",
        "0",
        "A fatal runtime exception: ERROR: division by zero",
        "Infinity"
      ],
      "correctIndex": 2,
      "explanation": "PostgreSQL and SQL Server raise a fatal error on division by zero. MySQL returns NULL with a warning.",
      "trapWarning": "Always use NULLIF(denominator, 0) to prevent pipeline failures in cross-dialect queries."
    },
    {
      "id": 309,
      "question": "What is the result of SELECT ROUND(12.3456, 2); in MySQL?",
      "options": [
        "12.34",
        "12.35",
        "12.00",
        "12.346"
      ],
      "correctIndex": 1,
      "explanation": "ROUND(val, 2) rounds to 2 decimal places using standard half-up arithmetic (12.3456 rounds to 12.35).",
      "trapWarning": "TRUNCATE(12.3456, 2) would return 12.34; ROUND rounds up when the next digit is >= 5."
    },
    {
      "id": 310,
      "question": "How should a volume-weighted average price be calculated across sales orders with unit prices and quantities?",
      "options": [
        "AVG(price * units)",
        "AVG(price) * AVG(units)",
        "SUM(price * units) / SUM(units)",
        "SUM(price) / COUNT(units)"
      ],
      "correctIndex": 2,
      "explanation": "A weighted average is calculated by summing total transaction revenue (SUM(price * units)) divided by total unit volume (SUM(units)).",
      "trapWarning": "Calculating AVG(price) is mathematically invalid because it ignores transaction volumes."
    },
    {
      "id": 311,
      "question": "In advanced SQL analytics, why is `SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` preferred when calculating conditional aggregation (Scenario #1)?",
      "options": [
        "Because it aggregates only rows matching the condition while scanning the table once.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` is the standard pattern because it aggregates only rows matching the condition while scanning the table once.",
      "trapWarning": "Using separate queries or self-joins creates redundant I/O."
    },
    {
      "id": 312,
      "question": "In advanced SQL analytics, why is `id % 2 = 1` preferred when calculating modulo arithmetic (Scenario #2)?",
      "options": [
        "Because it identifies odd integers by checking remainder when divided by 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`id % 2 = 1` is the standard pattern because it identifies odd integers by checking remainder when divided by 2.",
      "trapWarning": "In SQLite MOD() is not supported, use % operator."
    },
    {
      "id": 313,
      "question": "In advanced SQL analytics, why is `DATE_ADD(event_date, INTERVAL 1 DAY)` preferred when calculating date interval arithmetic (Scenario #3)?",
      "options": [
        "Because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATE_ADD(event_date, INTERVAL 1 DAY)` is the standard pattern because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
      "trapWarning": "Integer subtraction `d1 - d2 = 1` breaks across month rollovers."
    },
    {
      "id": 314,
      "question": "In advanced SQL analytics, why is `DATEDIFF(day2, day1) = 1` preferred when calculating datediff semantics (Scenario #4)?",
      "options": [
        "Because it evaluates to 1 if day2 is exactly one calendar day after day1.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATEDIFF(day2, day1) = 1` is the standard pattern because it evaluates to 1 if day2 is exactly one calendar day after day1.",
      "trapWarning": "DATEDIFF arguments order differs between MySQL (d1, d2) and SQL Server (day, d1, d2)."
    },
    {
      "id": 315,
      "question": "In advanced SQL analytics, why is `COALESCE(SUM(units), 0)` preferred when calculating coalesce on aggregates (Scenario #5)?",
      "options": [
        "Because it guarantees a numeric 0 instead of NULL when no rows match.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COALESCE(SUM(units), 0)` is the standard pattern because it guarantees a numeric 0 instead of NULL when no rows match.",
      "trapWarning": "Leaving SUM() unwrapped returns NULL on empty partitions."
    },
    {
      "id": 316,
      "question": "In advanced SQL analytics, why is `CAST(num AS FLOAT) / denom` preferred when calculating integer division protection (Scenario #6)?",
      "options": [
        "Because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`CAST(num AS FLOAT) / denom` is the standard pattern because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
      "trapWarning": "In SQL Server, 1/2 evaluates to 0 without float promotion."
    },
    {
      "id": 317,
      "question": "In advanced SQL analytics, why is `HAVING COUNT(*) > 5` preferred when calculating having with non-selected aggregates (Scenario #7)?",
      "options": [
        "Because it is completely valid even if COUNT(*) is not in the SELECT list.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`HAVING COUNT(*) > 5` is the standard pattern because it is completely valid even if COUNT(*) is not in the SELECT list.",
      "trapWarning": "You do NOT need to project an aggregate in SELECT to filter on it in HAVING."
    },
    {
      "id": 318,
      "question": "In advanced SQL analytics, why is `GROUP BY user_id, event_date` preferred when calculating group by multiple columns (Scenario #8)?",
      "options": [
        "Because it partitions data so that each unique pair of user and date forms an isolated bucket.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`GROUP BY user_id, event_date` is the standard pattern because it partitions data so that each unique pair of user and date forms an isolated bucket.",
      "trapWarning": "Omitting a column leads to ambiguous projection errors in ONLY_FULL_GROUP_BY mode."
    },
    {
      "id": 319,
      "question": "In advanced SQL analytics, why is `COUNT(DISTINCT player_id)` preferred when calculating retention rate denominator (Scenario #9)?",
      "options": [
        "Because it must tally unique players across the entire population, not just active rows.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COUNT(DISTINCT player_id)` is the standard pattern because it must tally unique players across the entire population, not just active rows.",
      "trapWarning": "Using COUNT(player_id) inflates the denominator with multiple sessions."
    },
    {
      "id": 320,
      "question": "In advanced SQL analytics, why is `order_date = customer_pref_delivery_date` preferred when calculating immediate order equality (Scenario #10)?",
      "options": [
        "Because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`order_date = customer_pref_delivery_date` is the standard pattern because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
      "trapWarning": "PostgreSQL requires explicit CASE WHEN or CAST to numeric."
    },
    {
      "id": 321,
      "question": "In advanced SQL analytics, why is `SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` preferred when calculating conditional aggregation (Scenario #11)?",
      "options": [
        "Because it aggregates only rows matching the condition while scanning the table once.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` is the standard pattern because it aggregates only rows matching the condition while scanning the table once.",
      "trapWarning": "Using separate queries or self-joins creates redundant I/O."
    },
    {
      "id": 322,
      "question": "In advanced SQL analytics, why is `id % 2 = 1` preferred when calculating modulo arithmetic (Scenario #12)?",
      "options": [
        "Because it identifies odd integers by checking remainder when divided by 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`id % 2 = 1` is the standard pattern because it identifies odd integers by checking remainder when divided by 2.",
      "trapWarning": "In SQLite MOD() is not supported, use % operator."
    },
    {
      "id": 323,
      "question": "In advanced SQL analytics, why is `DATE_ADD(event_date, INTERVAL 1 DAY)` preferred when calculating date interval arithmetic (Scenario #13)?",
      "options": [
        "Because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATE_ADD(event_date, INTERVAL 1 DAY)` is the standard pattern because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
      "trapWarning": "Integer subtraction `d1 - d2 = 1` breaks across month rollovers."
    },
    {
      "id": 324,
      "question": "In advanced SQL analytics, why is `DATEDIFF(day2, day1) = 1` preferred when calculating datediff semantics (Scenario #14)?",
      "options": [
        "Because it evaluates to 1 if day2 is exactly one calendar day after day1.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATEDIFF(day2, day1) = 1` is the standard pattern because it evaluates to 1 if day2 is exactly one calendar day after day1.",
      "trapWarning": "DATEDIFF arguments order differs between MySQL (d1, d2) and SQL Server (day, d1, d2)."
    },
    {
      "id": 325,
      "question": "In advanced SQL analytics, why is `COALESCE(SUM(units), 0)` preferred when calculating coalesce on aggregates (Scenario #15)?",
      "options": [
        "Because it guarantees a numeric 0 instead of NULL when no rows match.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COALESCE(SUM(units), 0)` is the standard pattern because it guarantees a numeric 0 instead of NULL when no rows match.",
      "trapWarning": "Leaving SUM() unwrapped returns NULL on empty partitions."
    },
    {
      "id": 326,
      "question": "In advanced SQL analytics, why is `CAST(num AS FLOAT) / denom` preferred when calculating integer division protection (Scenario #16)?",
      "options": [
        "Because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`CAST(num AS FLOAT) / denom` is the standard pattern because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
      "trapWarning": "In SQL Server, 1/2 evaluates to 0 without float promotion."
    },
    {
      "id": 327,
      "question": "In advanced SQL analytics, why is `HAVING COUNT(*) > 5` preferred when calculating having with non-selected aggregates (Scenario #17)?",
      "options": [
        "Because it is completely valid even if COUNT(*) is not in the SELECT list.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`HAVING COUNT(*) > 5` is the standard pattern because it is completely valid even if COUNT(*) is not in the SELECT list.",
      "trapWarning": "You do NOT need to project an aggregate in SELECT to filter on it in HAVING."
    },
    {
      "id": 328,
      "question": "In advanced SQL analytics, why is `GROUP BY user_id, event_date` preferred when calculating group by multiple columns (Scenario #18)?",
      "options": [
        "Because it partitions data so that each unique pair of user and date forms an isolated bucket.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`GROUP BY user_id, event_date` is the standard pattern because it partitions data so that each unique pair of user and date forms an isolated bucket.",
      "trapWarning": "Omitting a column leads to ambiguous projection errors in ONLY_FULL_GROUP_BY mode."
    },
    {
      "id": 329,
      "question": "In advanced SQL analytics, why is `COUNT(DISTINCT player_id)` preferred when calculating retention rate denominator (Scenario #19)?",
      "options": [
        "Because it must tally unique players across the entire population, not just active rows.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COUNT(DISTINCT player_id)` is the standard pattern because it must tally unique players across the entire population, not just active rows.",
      "trapWarning": "Using COUNT(player_id) inflates the denominator with multiple sessions."
    },
    {
      "id": 330,
      "question": "In advanced SQL analytics, why is `order_date = customer_pref_delivery_date` preferred when calculating immediate order equality (Scenario #20)?",
      "options": [
        "Because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`order_date = customer_pref_delivery_date` is the standard pattern because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
      "trapWarning": "PostgreSQL requires explicit CASE WHEN or CAST to numeric."
    },
    {
      "id": 331,
      "question": "In advanced SQL analytics, why is `SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` preferred when calculating conditional aggregation (Scenario #21)?",
      "options": [
        "Because it aggregates only rows matching the condition while scanning the table once.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` is the standard pattern because it aggregates only rows matching the condition while scanning the table once.",
      "trapWarning": "Using separate queries or self-joins creates redundant I/O."
    },
    {
      "id": 332,
      "question": "In advanced SQL analytics, why is `id % 2 = 1` preferred when calculating modulo arithmetic (Scenario #22)?",
      "options": [
        "Because it identifies odd integers by checking remainder when divided by 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`id % 2 = 1` is the standard pattern because it identifies odd integers by checking remainder when divided by 2.",
      "trapWarning": "In SQLite MOD() is not supported, use % operator."
    },
    {
      "id": 333,
      "question": "In advanced SQL analytics, why is `DATE_ADD(event_date, INTERVAL 1 DAY)` preferred when calculating date interval arithmetic (Scenario #23)?",
      "options": [
        "Because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATE_ADD(event_date, INTERVAL 1 DAY)` is the standard pattern because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
      "trapWarning": "Integer subtraction `d1 - d2 = 1` breaks across month rollovers."
    },
    {
      "id": 334,
      "question": "In advanced SQL analytics, why is `DATEDIFF(day2, day1) = 1` preferred when calculating datediff semantics (Scenario #24)?",
      "options": [
        "Because it evaluates to 1 if day2 is exactly one calendar day after day1.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATEDIFF(day2, day1) = 1` is the standard pattern because it evaluates to 1 if day2 is exactly one calendar day after day1.",
      "trapWarning": "DATEDIFF arguments order differs between MySQL (d1, d2) and SQL Server (day, d1, d2)."
    },
    {
      "id": 335,
      "question": "In advanced SQL analytics, why is `COALESCE(SUM(units), 0)` preferred when calculating coalesce on aggregates (Scenario #25)?",
      "options": [
        "Because it guarantees a numeric 0 instead of NULL when no rows match.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COALESCE(SUM(units), 0)` is the standard pattern because it guarantees a numeric 0 instead of NULL when no rows match.",
      "trapWarning": "Leaving SUM() unwrapped returns NULL on empty partitions."
    },
    {
      "id": 336,
      "question": "In advanced SQL analytics, why is `CAST(num AS FLOAT) / denom` preferred when calculating integer division protection (Scenario #26)?",
      "options": [
        "Because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`CAST(num AS FLOAT) / denom` is the standard pattern because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
      "trapWarning": "In SQL Server, 1/2 evaluates to 0 without float promotion."
    },
    {
      "id": 337,
      "question": "In advanced SQL analytics, why is `HAVING COUNT(*) > 5` preferred when calculating having with non-selected aggregates (Scenario #27)?",
      "options": [
        "Because it is completely valid even if COUNT(*) is not in the SELECT list.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`HAVING COUNT(*) > 5` is the standard pattern because it is completely valid even if COUNT(*) is not in the SELECT list.",
      "trapWarning": "You do NOT need to project an aggregate in SELECT to filter on it in HAVING."
    },
    {
      "id": 338,
      "question": "In advanced SQL analytics, why is `GROUP BY user_id, event_date` preferred when calculating group by multiple columns (Scenario #28)?",
      "options": [
        "Because it partitions data so that each unique pair of user and date forms an isolated bucket.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`GROUP BY user_id, event_date` is the standard pattern because it partitions data so that each unique pair of user and date forms an isolated bucket.",
      "trapWarning": "Omitting a column leads to ambiguous projection errors in ONLY_FULL_GROUP_BY mode."
    },
    {
      "id": 339,
      "question": "In advanced SQL analytics, why is `COUNT(DISTINCT player_id)` preferred when calculating retention rate denominator (Scenario #29)?",
      "options": [
        "Because it must tally unique players across the entire population, not just active rows.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COUNT(DISTINCT player_id)` is the standard pattern because it must tally unique players across the entire population, not just active rows.",
      "trapWarning": "Using COUNT(player_id) inflates the denominator with multiple sessions."
    },
    {
      "id": 340,
      "question": "In advanced SQL analytics, why is `order_date = customer_pref_delivery_date` preferred when calculating immediate order equality (Scenario #30)?",
      "options": [
        "Because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`order_date = customer_pref_delivery_date` is the standard pattern because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
      "trapWarning": "PostgreSQL requires explicit CASE WHEN or CAST to numeric."
    },
    {
      "id": 341,
      "question": "In advanced SQL analytics, why is `SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` preferred when calculating conditional aggregation (Scenario #31)?",
      "options": [
        "Because it aggregates only rows matching the condition while scanning the table once.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` is the standard pattern because it aggregates only rows matching the condition while scanning the table once.",
      "trapWarning": "Using separate queries or self-joins creates redundant I/O."
    },
    {
      "id": 342,
      "question": "In advanced SQL analytics, why is `id % 2 = 1` preferred when calculating modulo arithmetic (Scenario #32)?",
      "options": [
        "Because it identifies odd integers by checking remainder when divided by 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`id % 2 = 1` is the standard pattern because it identifies odd integers by checking remainder when divided by 2.",
      "trapWarning": "In SQLite MOD() is not supported, use % operator."
    },
    {
      "id": 343,
      "question": "In advanced SQL analytics, why is `DATE_ADD(event_date, INTERVAL 1 DAY)` preferred when calculating date interval arithmetic (Scenario #33)?",
      "options": [
        "Because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATE_ADD(event_date, INTERVAL 1 DAY)` is the standard pattern because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
      "trapWarning": "Integer subtraction `d1 - d2 = 1` breaks across month rollovers."
    },
    {
      "id": 344,
      "question": "In advanced SQL analytics, why is `DATEDIFF(day2, day1) = 1` preferred when calculating datediff semantics (Scenario #34)?",
      "options": [
        "Because it evaluates to 1 if day2 is exactly one calendar day after day1.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATEDIFF(day2, day1) = 1` is the standard pattern because it evaluates to 1 if day2 is exactly one calendar day after day1.",
      "trapWarning": "DATEDIFF arguments order differs between MySQL (d1, d2) and SQL Server (day, d1, d2)."
    },
    {
      "id": 345,
      "question": "In advanced SQL analytics, why is `COALESCE(SUM(units), 0)` preferred when calculating coalesce on aggregates (Scenario #35)?",
      "options": [
        "Because it guarantees a numeric 0 instead of NULL when no rows match.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COALESCE(SUM(units), 0)` is the standard pattern because it guarantees a numeric 0 instead of NULL when no rows match.",
      "trapWarning": "Leaving SUM() unwrapped returns NULL on empty partitions."
    },
    {
      "id": 346,
      "question": "In advanced SQL analytics, why is `CAST(num AS FLOAT) / denom` preferred when calculating integer division protection (Scenario #36)?",
      "options": [
        "Because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`CAST(num AS FLOAT) / denom` is the standard pattern because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
      "trapWarning": "In SQL Server, 1/2 evaluates to 0 without float promotion."
    },
    {
      "id": 347,
      "question": "In advanced SQL analytics, why is `HAVING COUNT(*) > 5` preferred when calculating having with non-selected aggregates (Scenario #37)?",
      "options": [
        "Because it is completely valid even if COUNT(*) is not in the SELECT list.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`HAVING COUNT(*) > 5` is the standard pattern because it is completely valid even if COUNT(*) is not in the SELECT list.",
      "trapWarning": "You do NOT need to project an aggregate in SELECT to filter on it in HAVING."
    },
    {
      "id": 348,
      "question": "In advanced SQL analytics, why is `GROUP BY user_id, event_date` preferred when calculating group by multiple columns (Scenario #38)?",
      "options": [
        "Because it partitions data so that each unique pair of user and date forms an isolated bucket.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`GROUP BY user_id, event_date` is the standard pattern because it partitions data so that each unique pair of user and date forms an isolated bucket.",
      "trapWarning": "Omitting a column leads to ambiguous projection errors in ONLY_FULL_GROUP_BY mode."
    },
    {
      "id": 349,
      "question": "In advanced SQL analytics, why is `COUNT(DISTINCT player_id)` preferred when calculating retention rate denominator (Scenario #39)?",
      "options": [
        "Because it must tally unique players across the entire population, not just active rows.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COUNT(DISTINCT player_id)` is the standard pattern because it must tally unique players across the entire population, not just active rows.",
      "trapWarning": "Using COUNT(player_id) inflates the denominator with multiple sessions."
    },
    {
      "id": 350,
      "question": "In advanced SQL analytics, why is `order_date = customer_pref_delivery_date` preferred when calculating immediate order equality (Scenario #40)?",
      "options": [
        "Because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`order_date = customer_pref_delivery_date` is the standard pattern because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
      "trapWarning": "PostgreSQL requires explicit CASE WHEN or CAST to numeric."
    },
    {
      "id": 351,
      "question": "In advanced SQL analytics, why is `SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` preferred when calculating conditional aggregation (Scenario #41)?",
      "options": [
        "Because it aggregates only rows matching the condition while scanning the table once.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` is the standard pattern because it aggregates only rows matching the condition while scanning the table once.",
      "trapWarning": "Using separate queries or self-joins creates redundant I/O."
    },
    {
      "id": 352,
      "question": "In advanced SQL analytics, why is `id % 2 = 1` preferred when calculating modulo arithmetic (Scenario #42)?",
      "options": [
        "Because it identifies odd integers by checking remainder when divided by 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`id % 2 = 1` is the standard pattern because it identifies odd integers by checking remainder when divided by 2.",
      "trapWarning": "In SQLite MOD() is not supported, use % operator."
    },
    {
      "id": 353,
      "question": "In advanced SQL analytics, why is `DATE_ADD(event_date, INTERVAL 1 DAY)` preferred when calculating date interval arithmetic (Scenario #43)?",
      "options": [
        "Because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATE_ADD(event_date, INTERVAL 1 DAY)` is the standard pattern because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
      "trapWarning": "Integer subtraction `d1 - d2 = 1` breaks across month rollovers."
    },
    {
      "id": 354,
      "question": "In advanced SQL analytics, why is `DATEDIFF(day2, day1) = 1` preferred when calculating datediff semantics (Scenario #44)?",
      "options": [
        "Because it evaluates to 1 if day2 is exactly one calendar day after day1.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATEDIFF(day2, day1) = 1` is the standard pattern because it evaluates to 1 if day2 is exactly one calendar day after day1.",
      "trapWarning": "DATEDIFF arguments order differs between MySQL (d1, d2) and SQL Server (day, d1, d2)."
    },
    {
      "id": 355,
      "question": "In advanced SQL analytics, why is `COALESCE(SUM(units), 0)` preferred when calculating coalesce on aggregates (Scenario #45)?",
      "options": [
        "Because it guarantees a numeric 0 instead of NULL when no rows match.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COALESCE(SUM(units), 0)` is the standard pattern because it guarantees a numeric 0 instead of NULL when no rows match.",
      "trapWarning": "Leaving SUM() unwrapped returns NULL on empty partitions."
    },
    {
      "id": 356,
      "question": "In advanced SQL analytics, why is `CAST(num AS FLOAT) / denom` preferred when calculating integer division protection (Scenario #46)?",
      "options": [
        "Because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`CAST(num AS FLOAT) / denom` is the standard pattern because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
      "trapWarning": "In SQL Server, 1/2 evaluates to 0 without float promotion."
    },
    {
      "id": 357,
      "question": "In advanced SQL analytics, why is `HAVING COUNT(*) > 5` preferred when calculating having with non-selected aggregates (Scenario #47)?",
      "options": [
        "Because it is completely valid even if COUNT(*) is not in the SELECT list.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`HAVING COUNT(*) > 5` is the standard pattern because it is completely valid even if COUNT(*) is not in the SELECT list.",
      "trapWarning": "You do NOT need to project an aggregate in SELECT to filter on it in HAVING."
    },
    {
      "id": 358,
      "question": "In advanced SQL analytics, why is `GROUP BY user_id, event_date` preferred when calculating group by multiple columns (Scenario #48)?",
      "options": [
        "Because it partitions data so that each unique pair of user and date forms an isolated bucket.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`GROUP BY user_id, event_date` is the standard pattern because it partitions data so that each unique pair of user and date forms an isolated bucket.",
      "trapWarning": "Omitting a column leads to ambiguous projection errors in ONLY_FULL_GROUP_BY mode."
    },
    {
      "id": 359,
      "question": "In advanced SQL analytics, why is `COUNT(DISTINCT player_id)` preferred when calculating retention rate denominator (Scenario #49)?",
      "options": [
        "Because it must tally unique players across the entire population, not just active rows.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COUNT(DISTINCT player_id)` is the standard pattern because it must tally unique players across the entire population, not just active rows.",
      "trapWarning": "Using COUNT(player_id) inflates the denominator with multiple sessions."
    },
    {
      "id": 360,
      "question": "In advanced SQL analytics, why is `order_date = customer_pref_delivery_date` preferred when calculating immediate order equality (Scenario #50)?",
      "options": [
        "Because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`order_date = customer_pref_delivery_date` is the standard pattern because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
      "trapWarning": "PostgreSQL requires explicit CASE WHEN or CAST to numeric."
    },
    {
      "id": 361,
      "question": "In advanced SQL analytics, why is `SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` preferred when calculating conditional aggregation (Scenario #51)?",
      "options": [
        "Because it aggregates only rows matching the condition while scanning the table once.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` is the standard pattern because it aggregates only rows matching the condition while scanning the table once.",
      "trapWarning": "Using separate queries or self-joins creates redundant I/O."
    },
    {
      "id": 362,
      "question": "In advanced SQL analytics, why is `id % 2 = 1` preferred when calculating modulo arithmetic (Scenario #52)?",
      "options": [
        "Because it identifies odd integers by checking remainder when divided by 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`id % 2 = 1` is the standard pattern because it identifies odd integers by checking remainder when divided by 2.",
      "trapWarning": "In SQLite MOD() is not supported, use % operator."
    },
    {
      "id": 363,
      "question": "In advanced SQL analytics, why is `DATE_ADD(event_date, INTERVAL 1 DAY)` preferred when calculating date interval arithmetic (Scenario #53)?",
      "options": [
        "Because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATE_ADD(event_date, INTERVAL 1 DAY)` is the standard pattern because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
      "trapWarning": "Integer subtraction `d1 - d2 = 1` breaks across month rollovers."
    },
    {
      "id": 364,
      "question": "In advanced SQL analytics, why is `DATEDIFF(day2, day1) = 1` preferred when calculating datediff semantics (Scenario #54)?",
      "options": [
        "Because it evaluates to 1 if day2 is exactly one calendar day after day1.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATEDIFF(day2, day1) = 1` is the standard pattern because it evaluates to 1 if day2 is exactly one calendar day after day1.",
      "trapWarning": "DATEDIFF arguments order differs between MySQL (d1, d2) and SQL Server (day, d1, d2)."
    },
    {
      "id": 365,
      "question": "In advanced SQL analytics, why is `COALESCE(SUM(units), 0)` preferred when calculating coalesce on aggregates (Scenario #55)?",
      "options": [
        "Because it guarantees a numeric 0 instead of NULL when no rows match.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COALESCE(SUM(units), 0)` is the standard pattern because it guarantees a numeric 0 instead of NULL when no rows match.",
      "trapWarning": "Leaving SUM() unwrapped returns NULL on empty partitions."
    },
    {
      "id": 366,
      "question": "In advanced SQL analytics, why is `CAST(num AS FLOAT) / denom` preferred when calculating integer division protection (Scenario #56)?",
      "options": [
        "Because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`CAST(num AS FLOAT) / denom` is the standard pattern because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
      "trapWarning": "In SQL Server, 1/2 evaluates to 0 without float promotion."
    },
    {
      "id": 367,
      "question": "In advanced SQL analytics, why is `HAVING COUNT(*) > 5` preferred when calculating having with non-selected aggregates (Scenario #57)?",
      "options": [
        "Because it is completely valid even if COUNT(*) is not in the SELECT list.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`HAVING COUNT(*) > 5` is the standard pattern because it is completely valid even if COUNT(*) is not in the SELECT list.",
      "trapWarning": "You do NOT need to project an aggregate in SELECT to filter on it in HAVING."
    },
    {
      "id": 368,
      "question": "In advanced SQL analytics, why is `GROUP BY user_id, event_date` preferred when calculating group by multiple columns (Scenario #58)?",
      "options": [
        "Because it partitions data so that each unique pair of user and date forms an isolated bucket.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`GROUP BY user_id, event_date` is the standard pattern because it partitions data so that each unique pair of user and date forms an isolated bucket.",
      "trapWarning": "Omitting a column leads to ambiguous projection errors in ONLY_FULL_GROUP_BY mode."
    },
    {
      "id": 369,
      "question": "In advanced SQL analytics, why is `COUNT(DISTINCT player_id)` preferred when calculating retention rate denominator (Scenario #59)?",
      "options": [
        "Because it must tally unique players across the entire population, not just active rows.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COUNT(DISTINCT player_id)` is the standard pattern because it must tally unique players across the entire population, not just active rows.",
      "trapWarning": "Using COUNT(player_id) inflates the denominator with multiple sessions."
    },
    {
      "id": 370,
      "question": "In advanced SQL analytics, why is `order_date = customer_pref_delivery_date` preferred when calculating immediate order equality (Scenario #60)?",
      "options": [
        "Because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`order_date = customer_pref_delivery_date` is the standard pattern because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
      "trapWarning": "PostgreSQL requires explicit CASE WHEN or CAST to numeric."
    },
    {
      "id": 371,
      "question": "In advanced SQL analytics, why is `SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` preferred when calculating conditional aggregation (Scenario #61)?",
      "options": [
        "Because it aggregates only rows matching the condition while scanning the table once.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` is the standard pattern because it aggregates only rows matching the condition while scanning the table once.",
      "trapWarning": "Using separate queries or self-joins creates redundant I/O."
    },
    {
      "id": 372,
      "question": "In advanced SQL analytics, why is `id % 2 = 1` preferred when calculating modulo arithmetic (Scenario #62)?",
      "options": [
        "Because it identifies odd integers by checking remainder when divided by 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`id % 2 = 1` is the standard pattern because it identifies odd integers by checking remainder when divided by 2.",
      "trapWarning": "In SQLite MOD() is not supported, use % operator."
    },
    {
      "id": 373,
      "question": "In advanced SQL analytics, why is `DATE_ADD(event_date, INTERVAL 1 DAY)` preferred when calculating date interval arithmetic (Scenario #63)?",
      "options": [
        "Because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATE_ADD(event_date, INTERVAL 1 DAY)` is the standard pattern because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
      "trapWarning": "Integer subtraction `d1 - d2 = 1` breaks across month rollovers."
    },
    {
      "id": 374,
      "question": "In advanced SQL analytics, why is `DATEDIFF(day2, day1) = 1` preferred when calculating datediff semantics (Scenario #64)?",
      "options": [
        "Because it evaluates to 1 if day2 is exactly one calendar day after day1.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATEDIFF(day2, day1) = 1` is the standard pattern because it evaluates to 1 if day2 is exactly one calendar day after day1.",
      "trapWarning": "DATEDIFF arguments order differs between MySQL (d1, d2) and SQL Server (day, d1, d2)."
    },
    {
      "id": 375,
      "question": "In advanced SQL analytics, why is `COALESCE(SUM(units), 0)` preferred when calculating coalesce on aggregates (Scenario #65)?",
      "options": [
        "Because it guarantees a numeric 0 instead of NULL when no rows match.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COALESCE(SUM(units), 0)` is the standard pattern because it guarantees a numeric 0 instead of NULL when no rows match.",
      "trapWarning": "Leaving SUM() unwrapped returns NULL on empty partitions."
    },
    {
      "id": 376,
      "question": "In advanced SQL analytics, why is `CAST(num AS FLOAT) / denom` preferred when calculating integer division protection (Scenario #66)?",
      "options": [
        "Because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`CAST(num AS FLOAT) / denom` is the standard pattern because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
      "trapWarning": "In SQL Server, 1/2 evaluates to 0 without float promotion."
    },
    {
      "id": 377,
      "question": "In advanced SQL analytics, why is `HAVING COUNT(*) > 5` preferred when calculating having with non-selected aggregates (Scenario #67)?",
      "options": [
        "Because it is completely valid even if COUNT(*) is not in the SELECT list.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`HAVING COUNT(*) > 5` is the standard pattern because it is completely valid even if COUNT(*) is not in the SELECT list.",
      "trapWarning": "You do NOT need to project an aggregate in SELECT to filter on it in HAVING."
    },
    {
      "id": 378,
      "question": "In advanced SQL analytics, why is `GROUP BY user_id, event_date` preferred when calculating group by multiple columns (Scenario #68)?",
      "options": [
        "Because it partitions data so that each unique pair of user and date forms an isolated bucket.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`GROUP BY user_id, event_date` is the standard pattern because it partitions data so that each unique pair of user and date forms an isolated bucket.",
      "trapWarning": "Omitting a column leads to ambiguous projection errors in ONLY_FULL_GROUP_BY mode."
    },
    {
      "id": 379,
      "question": "In advanced SQL analytics, why is `COUNT(DISTINCT player_id)` preferred when calculating retention rate denominator (Scenario #69)?",
      "options": [
        "Because it must tally unique players across the entire population, not just active rows.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COUNT(DISTINCT player_id)` is the standard pattern because it must tally unique players across the entire population, not just active rows.",
      "trapWarning": "Using COUNT(player_id) inflates the denominator with multiple sessions."
    },
    {
      "id": 380,
      "question": "In advanced SQL analytics, why is `order_date = customer_pref_delivery_date` preferred when calculating immediate order equality (Scenario #70)?",
      "options": [
        "Because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`order_date = customer_pref_delivery_date` is the standard pattern because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
      "trapWarning": "PostgreSQL requires explicit CASE WHEN or CAST to numeric."
    },
    {
      "id": 381,
      "question": "In advanced SQL analytics, why is `SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` preferred when calculating conditional aggregation (Scenario #71)?",
      "options": [
        "Because it aggregates only rows matching the condition while scanning the table once.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` is the standard pattern because it aggregates only rows matching the condition while scanning the table once.",
      "trapWarning": "Using separate queries or self-joins creates redundant I/O."
    },
    {
      "id": 382,
      "question": "In advanced SQL analytics, why is `id % 2 = 1` preferred when calculating modulo arithmetic (Scenario #72)?",
      "options": [
        "Because it identifies odd integers by checking remainder when divided by 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`id % 2 = 1` is the standard pattern because it identifies odd integers by checking remainder when divided by 2.",
      "trapWarning": "In SQLite MOD() is not supported, use % operator."
    },
    {
      "id": 383,
      "question": "In advanced SQL analytics, why is `DATE_ADD(event_date, INTERVAL 1 DAY)` preferred when calculating date interval arithmetic (Scenario #73)?",
      "options": [
        "Because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATE_ADD(event_date, INTERVAL 1 DAY)` is the standard pattern because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
      "trapWarning": "Integer subtraction `d1 - d2 = 1` breaks across month rollovers."
    },
    {
      "id": 384,
      "question": "In advanced SQL analytics, why is `DATEDIFF(day2, day1) = 1` preferred when calculating datediff semantics (Scenario #74)?",
      "options": [
        "Because it evaluates to 1 if day2 is exactly one calendar day after day1.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATEDIFF(day2, day1) = 1` is the standard pattern because it evaluates to 1 if day2 is exactly one calendar day after day1.",
      "trapWarning": "DATEDIFF arguments order differs between MySQL (d1, d2) and SQL Server (day, d1, d2)."
    },
    {
      "id": 385,
      "question": "In advanced SQL analytics, why is `COALESCE(SUM(units), 0)` preferred when calculating coalesce on aggregates (Scenario #75)?",
      "options": [
        "Because it guarantees a numeric 0 instead of NULL when no rows match.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COALESCE(SUM(units), 0)` is the standard pattern because it guarantees a numeric 0 instead of NULL when no rows match.",
      "trapWarning": "Leaving SUM() unwrapped returns NULL on empty partitions."
    },
    {
      "id": 386,
      "question": "In advanced SQL analytics, why is `CAST(num AS FLOAT) / denom` preferred when calculating integer division protection (Scenario #76)?",
      "options": [
        "Because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`CAST(num AS FLOAT) / denom` is the standard pattern because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
      "trapWarning": "In SQL Server, 1/2 evaluates to 0 without float promotion."
    },
    {
      "id": 387,
      "question": "In advanced SQL analytics, why is `HAVING COUNT(*) > 5` preferred when calculating having with non-selected aggregates (Scenario #77)?",
      "options": [
        "Because it is completely valid even if COUNT(*) is not in the SELECT list.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`HAVING COUNT(*) > 5` is the standard pattern because it is completely valid even if COUNT(*) is not in the SELECT list.",
      "trapWarning": "You do NOT need to project an aggregate in SELECT to filter on it in HAVING."
    },
    {
      "id": 388,
      "question": "In advanced SQL analytics, why is `GROUP BY user_id, event_date` preferred when calculating group by multiple columns (Scenario #78)?",
      "options": [
        "Because it partitions data so that each unique pair of user and date forms an isolated bucket.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`GROUP BY user_id, event_date` is the standard pattern because it partitions data so that each unique pair of user and date forms an isolated bucket.",
      "trapWarning": "Omitting a column leads to ambiguous projection errors in ONLY_FULL_GROUP_BY mode."
    },
    {
      "id": 389,
      "question": "In advanced SQL analytics, why is `COUNT(DISTINCT player_id)` preferred when calculating retention rate denominator (Scenario #79)?",
      "options": [
        "Because it must tally unique players across the entire population, not just active rows.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COUNT(DISTINCT player_id)` is the standard pattern because it must tally unique players across the entire population, not just active rows.",
      "trapWarning": "Using COUNT(player_id) inflates the denominator with multiple sessions."
    },
    {
      "id": 390,
      "question": "In advanced SQL analytics, why is `order_date = customer_pref_delivery_date` preferred when calculating immediate order equality (Scenario #80)?",
      "options": [
        "Because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`order_date = customer_pref_delivery_date` is the standard pattern because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
      "trapWarning": "PostgreSQL requires explicit CASE WHEN or CAST to numeric."
    },
    {
      "id": 391,
      "question": "In advanced SQL analytics, why is `SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` preferred when calculating conditional aggregation (Scenario #81)?",
      "options": [
        "Because it aggregates only rows matching the condition while scanning the table once.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)` is the standard pattern because it aggregates only rows matching the condition while scanning the table once.",
      "trapWarning": "Using separate queries or self-joins creates redundant I/O."
    },
    {
      "id": 392,
      "question": "In advanced SQL analytics, why is `id % 2 = 1` preferred when calculating modulo arithmetic (Scenario #82)?",
      "options": [
        "Because it identifies odd integers by checking remainder when divided by 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`id % 2 = 1` is the standard pattern because it identifies odd integers by checking remainder when divided by 2.",
      "trapWarning": "In SQLite MOD() is not supported, use % operator."
    },
    {
      "id": 393,
      "question": "In advanced SQL analytics, why is `DATE_ADD(event_date, INTERVAL 1 DAY)` preferred when calculating date interval arithmetic (Scenario #83)?",
      "options": [
        "Because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATE_ADD(event_date, INTERVAL 1 DAY)` is the standard pattern because it increments a calendar date by exactly 24 hours accounting for month boundaries.",
      "trapWarning": "Integer subtraction `d1 - d2 = 1` breaks across month rollovers."
    },
    {
      "id": 394,
      "question": "In advanced SQL analytics, why is `DATEDIFF(day2, day1) = 1` preferred when calculating datediff semantics (Scenario #84)?",
      "options": [
        "Because it evaluates to 1 if day2 is exactly one calendar day after day1.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`DATEDIFF(day2, day1) = 1` is the standard pattern because it evaluates to 1 if day2 is exactly one calendar day after day1.",
      "trapWarning": "DATEDIFF arguments order differs between MySQL (d1, d2) and SQL Server (day, d1, d2)."
    },
    {
      "id": 395,
      "question": "In advanced SQL analytics, why is `COALESCE(SUM(units), 0)` preferred when calculating coalesce on aggregates (Scenario #85)?",
      "options": [
        "Because it guarantees a numeric 0 instead of NULL when no rows match.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COALESCE(SUM(units), 0)` is the standard pattern because it guarantees a numeric 0 instead of NULL when no rows match.",
      "trapWarning": "Leaving SUM() unwrapped returns NULL on empty partitions."
    },
    {
      "id": 396,
      "question": "In advanced SQL analytics, why is `CAST(num AS FLOAT) / denom` preferred when calculating integer division protection (Scenario #86)?",
      "options": [
        "Because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`CAST(num AS FLOAT) / denom` is the standard pattern because it prevents integer truncation in engines like SQL Server where 5/2 evaluates to 2.",
      "trapWarning": "In SQL Server, 1/2 evaluates to 0 without float promotion."
    },
    {
      "id": 397,
      "question": "In advanced SQL analytics, why is `HAVING COUNT(*) > 5` preferred when calculating having with non-selected aggregates (Scenario #87)?",
      "options": [
        "Because it is completely valid even if COUNT(*) is not in the SELECT list.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`HAVING COUNT(*) > 5` is the standard pattern because it is completely valid even if COUNT(*) is not in the SELECT list.",
      "trapWarning": "You do NOT need to project an aggregate in SELECT to filter on it in HAVING."
    },
    {
      "id": 398,
      "question": "In advanced SQL analytics, why is `GROUP BY user_id, event_date` preferred when calculating group by multiple columns (Scenario #88)?",
      "options": [
        "Because it partitions data so that each unique pair of user and date forms an isolated bucket.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`GROUP BY user_id, event_date` is the standard pattern because it partitions data so that each unique pair of user and date forms an isolated bucket.",
      "trapWarning": "Omitting a column leads to ambiguous projection errors in ONLY_FULL_GROUP_BY mode."
    },
    {
      "id": 399,
      "question": "In advanced SQL analytics, why is `COUNT(DISTINCT player_id)` preferred when calculating retention rate denominator (Scenario #89)?",
      "options": [
        "Because it must tally unique players across the entire population, not just active rows.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`COUNT(DISTINCT player_id)` is the standard pattern because it must tally unique players across the entire population, not just active rows.",
      "trapWarning": "Using COUNT(player_id) inflates the denominator with multiple sessions."
    },
    {
      "id": 400,
      "question": "In advanced SQL analytics, why is `order_date = customer_pref_delivery_date` preferred when calculating immediate order equality (Scenario #90)?",
      "options": [
        "Because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
        "Because standard SQL forbids any other syntax.",
        "Because it forces a full table scan for maximum consistency.",
        "Because it disables query caching."
      ],
      "correctIndex": 0,
      "explanation": "`order_date = customer_pref_delivery_date` is the standard pattern because it evaluates to 1 in MySQL when dates match, enabling direct AVG() calculation.",
      "trapWarning": "PostgreSQL requires explicit CASE WHEN or CAST to numeric."
    }
  ],
  "prepDrills": [
    {
      "id": 301,
      "domain": "FinTech",
      "title": "FinTech Aggregate Optimization Drill #1",
      "difficulty": "Easy",
      "prompt": "Write a query for FinTech to calculate volume-weighted metrics and conditional rate totals grouped by account partition #1. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 302,
      "domain": "E-Commerce",
      "title": "E-Commerce Aggregate Optimization Drill #2",
      "difficulty": "Medium",
      "prompt": "Write a query for E-Commerce to calculate volume-weighted metrics and conditional rate totals grouped by account partition #2. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 303,
      "domain": "SaaS Metrics",
      "title": "SaaS Metrics Aggregate Optimization Drill #3",
      "difficulty": "Hard",
      "prompt": "Write a query for SaaS Metrics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #3. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 304,
      "domain": "Logistics",
      "title": "Logistics Aggregate Optimization Drill #4",
      "difficulty": "Easy",
      "prompt": "Write a query for Logistics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #4. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 305,
      "domain": "Social Media",
      "title": "Social Media Aggregate Optimization Drill #5",
      "difficulty": "Medium",
      "prompt": "Write a query for Social Media to calculate volume-weighted metrics and conditional rate totals grouped by account partition #5. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 306,
      "domain": "Healthcare",
      "title": "Healthcare Aggregate Optimization Drill #6",
      "difficulty": "Hard",
      "prompt": "Write a query for Healthcare to calculate volume-weighted metrics and conditional rate totals grouped by account partition #6. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 307,
      "domain": "Gaming",
      "title": "Gaming Aggregate Optimization Drill #7",
      "difficulty": "Easy",
      "prompt": "Write a query for Gaming to calculate volume-weighted metrics and conditional rate totals grouped by account partition #7. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 308,
      "domain": "HR Analytics",
      "title": "HR Analytics Aggregate Optimization Drill #8",
      "difficulty": "Medium",
      "prompt": "Write a query for HR Analytics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #8. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 309,
      "domain": "FinTech",
      "title": "FinTech Aggregate Optimization Drill #9",
      "difficulty": "Hard",
      "prompt": "Write a query for FinTech to calculate volume-weighted metrics and conditional rate totals grouped by account partition #9. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 310,
      "domain": "E-Commerce",
      "title": "E-Commerce Aggregate Optimization Drill #10",
      "difficulty": "Easy",
      "prompt": "Write a query for E-Commerce to calculate volume-weighted metrics and conditional rate totals grouped by account partition #10. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 311,
      "domain": "SaaS Metrics",
      "title": "SaaS Metrics Aggregate Optimization Drill #11",
      "difficulty": "Medium",
      "prompt": "Write a query for SaaS Metrics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #11. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 312,
      "domain": "Logistics",
      "title": "Logistics Aggregate Optimization Drill #12",
      "difficulty": "Hard",
      "prompt": "Write a query for Logistics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #12. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 313,
      "domain": "Social Media",
      "title": "Social Media Aggregate Optimization Drill #13",
      "difficulty": "Easy",
      "prompt": "Write a query for Social Media to calculate volume-weighted metrics and conditional rate totals grouped by account partition #13. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 314,
      "domain": "Healthcare",
      "title": "Healthcare Aggregate Optimization Drill #14",
      "difficulty": "Medium",
      "prompt": "Write a query for Healthcare to calculate volume-weighted metrics and conditional rate totals grouped by account partition #14. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 315,
      "domain": "Gaming",
      "title": "Gaming Aggregate Optimization Drill #15",
      "difficulty": "Hard",
      "prompt": "Write a query for Gaming to calculate volume-weighted metrics and conditional rate totals grouped by account partition #15. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 316,
      "domain": "HR Analytics",
      "title": "HR Analytics Aggregate Optimization Drill #16",
      "difficulty": "Easy",
      "prompt": "Write a query for HR Analytics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #16. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 317,
      "domain": "FinTech",
      "title": "FinTech Aggregate Optimization Drill #17",
      "difficulty": "Medium",
      "prompt": "Write a query for FinTech to calculate volume-weighted metrics and conditional rate totals grouped by account partition #17. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 318,
      "domain": "E-Commerce",
      "title": "E-Commerce Aggregate Optimization Drill #18",
      "difficulty": "Hard",
      "prompt": "Write a query for E-Commerce to calculate volume-weighted metrics and conditional rate totals grouped by account partition #18. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 319,
      "domain": "SaaS Metrics",
      "title": "SaaS Metrics Aggregate Optimization Drill #19",
      "difficulty": "Easy",
      "prompt": "Write a query for SaaS Metrics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #19. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 320,
      "domain": "Logistics",
      "title": "Logistics Aggregate Optimization Drill #20",
      "difficulty": "Medium",
      "prompt": "Write a query for Logistics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #20. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 321,
      "domain": "Social Media",
      "title": "Social Media Aggregate Optimization Drill #21",
      "difficulty": "Hard",
      "prompt": "Write a query for Social Media to calculate volume-weighted metrics and conditional rate totals grouped by account partition #21. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 322,
      "domain": "Healthcare",
      "title": "Healthcare Aggregate Optimization Drill #22",
      "difficulty": "Easy",
      "prompt": "Write a query for Healthcare to calculate volume-weighted metrics and conditional rate totals grouped by account partition #22. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 323,
      "domain": "Gaming",
      "title": "Gaming Aggregate Optimization Drill #23",
      "difficulty": "Medium",
      "prompt": "Write a query for Gaming to calculate volume-weighted metrics and conditional rate totals grouped by account partition #23. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 324,
      "domain": "HR Analytics",
      "title": "HR Analytics Aggregate Optimization Drill #24",
      "difficulty": "Hard",
      "prompt": "Write a query for HR Analytics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #24. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 325,
      "domain": "FinTech",
      "title": "FinTech Aggregate Optimization Drill #25",
      "difficulty": "Easy",
      "prompt": "Write a query for FinTech to calculate volume-weighted metrics and conditional rate totals grouped by account partition #25. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 326,
      "domain": "E-Commerce",
      "title": "E-Commerce Aggregate Optimization Drill #26",
      "difficulty": "Medium",
      "prompt": "Write a query for E-Commerce to calculate volume-weighted metrics and conditional rate totals grouped by account partition #26. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 327,
      "domain": "SaaS Metrics",
      "title": "SaaS Metrics Aggregate Optimization Drill #27",
      "difficulty": "Hard",
      "prompt": "Write a query for SaaS Metrics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #27. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 328,
      "domain": "Logistics",
      "title": "Logistics Aggregate Optimization Drill #28",
      "difficulty": "Easy",
      "prompt": "Write a query for Logistics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #28. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 329,
      "domain": "Social Media",
      "title": "Social Media Aggregate Optimization Drill #29",
      "difficulty": "Medium",
      "prompt": "Write a query for Social Media to calculate volume-weighted metrics and conditional rate totals grouped by account partition #29. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 330,
      "domain": "Healthcare",
      "title": "Healthcare Aggregate Optimization Drill #30",
      "difficulty": "Hard",
      "prompt": "Write a query for Healthcare to calculate volume-weighted metrics and conditional rate totals grouped by account partition #30. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 331,
      "domain": "Gaming",
      "title": "Gaming Aggregate Optimization Drill #31",
      "difficulty": "Easy",
      "prompt": "Write a query for Gaming to calculate volume-weighted metrics and conditional rate totals grouped by account partition #31. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 332,
      "domain": "HR Analytics",
      "title": "HR Analytics Aggregate Optimization Drill #32",
      "difficulty": "Medium",
      "prompt": "Write a query for HR Analytics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #32. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 333,
      "domain": "FinTech",
      "title": "FinTech Aggregate Optimization Drill #33",
      "difficulty": "Hard",
      "prompt": "Write a query for FinTech to calculate volume-weighted metrics and conditional rate totals grouped by account partition #33. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 334,
      "domain": "E-Commerce",
      "title": "E-Commerce Aggregate Optimization Drill #34",
      "difficulty": "Easy",
      "prompt": "Write a query for E-Commerce to calculate volume-weighted metrics and conditional rate totals grouped by account partition #34. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 335,
      "domain": "SaaS Metrics",
      "title": "SaaS Metrics Aggregate Optimization Drill #35",
      "difficulty": "Medium",
      "prompt": "Write a query for SaaS Metrics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #35. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 336,
      "domain": "Logistics",
      "title": "Logistics Aggregate Optimization Drill #36",
      "difficulty": "Hard",
      "prompt": "Write a query for Logistics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #36. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 337,
      "domain": "Social Media",
      "title": "Social Media Aggregate Optimization Drill #37",
      "difficulty": "Easy",
      "prompt": "Write a query for Social Media to calculate volume-weighted metrics and conditional rate totals grouped by account partition #37. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 338,
      "domain": "Healthcare",
      "title": "Healthcare Aggregate Optimization Drill #38",
      "difficulty": "Medium",
      "prompt": "Write a query for Healthcare to calculate volume-weighted metrics and conditional rate totals grouped by account partition #38. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 339,
      "domain": "Gaming",
      "title": "Gaming Aggregate Optimization Drill #39",
      "difficulty": "Hard",
      "prompt": "Write a query for Gaming to calculate volume-weighted metrics and conditional rate totals grouped by account partition #39. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 340,
      "domain": "HR Analytics",
      "title": "HR Analytics Aggregate Optimization Drill #40",
      "difficulty": "Easy",
      "prompt": "Write a query for HR Analytics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #40. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 341,
      "domain": "FinTech",
      "title": "FinTech Aggregate Optimization Drill #41",
      "difficulty": "Medium",
      "prompt": "Write a query for FinTech to calculate volume-weighted metrics and conditional rate totals grouped by account partition #41. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 342,
      "domain": "E-Commerce",
      "title": "E-Commerce Aggregate Optimization Drill #42",
      "difficulty": "Hard",
      "prompt": "Write a query for E-Commerce to calculate volume-weighted metrics and conditional rate totals grouped by account partition #42. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 343,
      "domain": "SaaS Metrics",
      "title": "SaaS Metrics Aggregate Optimization Drill #43",
      "difficulty": "Easy",
      "prompt": "Write a query for SaaS Metrics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #43. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 344,
      "domain": "Logistics",
      "title": "Logistics Aggregate Optimization Drill #44",
      "difficulty": "Medium",
      "prompt": "Write a query for Logistics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #44. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 345,
      "domain": "Social Media",
      "title": "Social Media Aggregate Optimization Drill #45",
      "difficulty": "Hard",
      "prompt": "Write a query for Social Media to calculate volume-weighted metrics and conditional rate totals grouped by account partition #45. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 346,
      "domain": "Healthcare",
      "title": "Healthcare Aggregate Optimization Drill #46",
      "difficulty": "Easy",
      "prompt": "Write a query for Healthcare to calculate volume-weighted metrics and conditional rate totals grouped by account partition #46. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 347,
      "domain": "Gaming",
      "title": "Gaming Aggregate Optimization Drill #47",
      "difficulty": "Medium",
      "prompt": "Write a query for Gaming to calculate volume-weighted metrics and conditional rate totals grouped by account partition #47. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 348,
      "domain": "HR Analytics",
      "title": "HR Analytics Aggregate Optimization Drill #48",
      "difficulty": "Hard",
      "prompt": "Write a query for HR Analytics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #48. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 349,
      "domain": "FinTech",
      "title": "FinTech Aggregate Optimization Drill #49",
      "difficulty": "Easy",
      "prompt": "Write a query for FinTech to calculate volume-weighted metrics and conditional rate totals grouped by account partition #49. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 350,
      "domain": "E-Commerce",
      "title": "E-Commerce Aggregate Optimization Drill #50",
      "difficulty": "Medium",
      "prompt": "Write a query for E-Commerce to calculate volume-weighted metrics and conditional rate totals grouped by account partition #50. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 351,
      "domain": "SaaS Metrics",
      "title": "SaaS Metrics Aggregate Optimization Drill #51",
      "difficulty": "Hard",
      "prompt": "Write a query for SaaS Metrics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #51. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 352,
      "domain": "Logistics",
      "title": "Logistics Aggregate Optimization Drill #52",
      "difficulty": "Easy",
      "prompt": "Write a query for Logistics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #52. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 353,
      "domain": "Social Media",
      "title": "Social Media Aggregate Optimization Drill #53",
      "difficulty": "Medium",
      "prompt": "Write a query for Social Media to calculate volume-weighted metrics and conditional rate totals grouped by account partition #53. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 354,
      "domain": "Healthcare",
      "title": "Healthcare Aggregate Optimization Drill #54",
      "difficulty": "Hard",
      "prompt": "Write a query for Healthcare to calculate volume-weighted metrics and conditional rate totals grouped by account partition #54. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 355,
      "domain": "Gaming",
      "title": "Gaming Aggregate Optimization Drill #55",
      "difficulty": "Easy",
      "prompt": "Write a query for Gaming to calculate volume-weighted metrics and conditional rate totals grouped by account partition #55. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 356,
      "domain": "HR Analytics",
      "title": "HR Analytics Aggregate Optimization Drill #56",
      "difficulty": "Medium",
      "prompt": "Write a query for HR Analytics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #56. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 357,
      "domain": "FinTech",
      "title": "FinTech Aggregate Optimization Drill #57",
      "difficulty": "Hard",
      "prompt": "Write a query for FinTech to calculate volume-weighted metrics and conditional rate totals grouped by account partition #57. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 358,
      "domain": "E-Commerce",
      "title": "E-Commerce Aggregate Optimization Drill #58",
      "difficulty": "Easy",
      "prompt": "Write a query for E-Commerce to calculate volume-weighted metrics and conditional rate totals grouped by account partition #58. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 359,
      "domain": "SaaS Metrics",
      "title": "SaaS Metrics Aggregate Optimization Drill #59",
      "difficulty": "Medium",
      "prompt": "Write a query for SaaS Metrics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #59. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 360,
      "domain": "Logistics",
      "title": "Logistics Aggregate Optimization Drill #60",
      "difficulty": "Hard",
      "prompt": "Write a query for Logistics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #60. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 361,
      "domain": "Social Media",
      "title": "Social Media Aggregate Optimization Drill #61",
      "difficulty": "Easy",
      "prompt": "Write a query for Social Media to calculate volume-weighted metrics and conditional rate totals grouped by account partition #61. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 362,
      "domain": "Healthcare",
      "title": "Healthcare Aggregate Optimization Drill #62",
      "difficulty": "Medium",
      "prompt": "Write a query for Healthcare to calculate volume-weighted metrics and conditional rate totals grouped by account partition #62. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 363,
      "domain": "Gaming",
      "title": "Gaming Aggregate Optimization Drill #63",
      "difficulty": "Hard",
      "prompt": "Write a query for Gaming to calculate volume-weighted metrics and conditional rate totals grouped by account partition #63. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 364,
      "domain": "HR Analytics",
      "title": "HR Analytics Aggregate Optimization Drill #64",
      "difficulty": "Easy",
      "prompt": "Write a query for HR Analytics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #64. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 365,
      "domain": "FinTech",
      "title": "FinTech Aggregate Optimization Drill #65",
      "difficulty": "Medium",
      "prompt": "Write a query for FinTech to calculate volume-weighted metrics and conditional rate totals grouped by account partition #65. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 366,
      "domain": "E-Commerce",
      "title": "E-Commerce Aggregate Optimization Drill #66",
      "difficulty": "Hard",
      "prompt": "Write a query for E-Commerce to calculate volume-weighted metrics and conditional rate totals grouped by account partition #66. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },
    {
      "id": 367,
      "domain": "SaaS Metrics",
      "title": "SaaS Metrics Aggregate Optimization Drill #67",
      "difficulty": "Easy",
      "prompt": "Write a query for SaaS Metrics to calculate volume-weighted metrics and conditional rate totals grouped by account partition #67. Ensure zero-division resilience.",
      "schema": "Transactions(txn_id INT, account_id INT, status VARCHAR, amount DECIMAL(10,2), units INT, txn_date DATE)",
      "starterSQL": "-- Calculate total amount and approved volume for account\nSELECT account_id\nFROM Transactions\nGROUP BY account_id;",
      "solutionSQL": "SELECT \n    account_id,\n    COUNT(*) AS total_txns,\n    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_txns,\n    COALESCE(SUM(amount), 0) AS total_amount,\n    ROUND(COALESCE(SUM(amount * units) / NULLIF(SUM(units), 0), 0), 2) AS weighted_unit_price\nFROM Transactions\nGROUP BY account_id;"
    },

    {
      "id": 1693,
      "number": "1693",
      "title": "Daily Leads and Partners",
      "difficulty": "Easy",
      "category": "Basic Aggregates & Math",
      "companies": [
        "Toyota",
        "Amazon"
      ],
      "interviewFreq": "87% (High - Multi-Column Distinct Count)",
      "interviewRound": "Technical Screen",
      "prompt": "For each date_id and make_name, find the number of distinct lead_id's and distinct partner_id's.\n\nReturn the result table in any order.",
      "schemaDescription": "Table: DailySales (date_id DATE, make_name VARCHAR, lead_id INT, partner_id INT)",
      "sampleInput": {
        "table": "DailySales",
        "columns": [
          "date_id",
          "make_name",
          "lead_id",
          "partner_id"
        ],
        "rows": [
          [
            "2020-12-8",
            "toyota",
            0,
            1
          ],
          [
            "2020-12-8",
            "toyota",
            1,
            0
          ],
          [
            "2020-12-8",
            "toyota",
            1,
            2
          ],
          [
            "2020-12-7",
            "toyota",
            0,
            2
          ],
          [
            "2020-12-7",
            "toyota",
            0,
            1
          ],
          [
            "2020-12-8",
            "honda",
            1,
            2
          ],
          [
            "2020-12-8",
            "honda",
            2,
            1
          ]
        ]
      },
      "expectedOutput": {
        "columns": [
          "date_id",
          "make_name",
          "unique_leads",
          "unique_partners"
        ],
        "rows": [
          [
            "2020-12-8",
            "toyota",
            2,
            3
          ],
          [
            "2020-12-7",
            "toyota",
            1,
            2
          ],
          [
            "2020-12-8",
            "honda",
            2,
            2
          ]
        ]
      },
      "svgDiagram": "<svg viewBox=\"0 0 880 200\" class=\"lc-diagram-svg\" xmlns=\"http://www.w3.org/2000/svg\">\n          <rect x=\"20\" y=\"20\" width=\"380\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n          <text x=\"35\" y=\"45\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">DailySales GROUP BY (date_id, make_name)</text>\n          <text x=\"35\" y=\"75\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"11\">'2020-12-8' + 'toyota':</text>\n          <text x=\"35\" y=\"98\" fill=\"#2563eb\" font-family=\"monospace\" font-size=\"11\">lead_id: [0, 1, 1] =&gt; DISTINCT count = 2</text>\n          <text x=\"35\" y=\"121\" fill=\"#166534\" font-family=\"monospace\" font-size=\"11\">partner_id: [1, 0, 2] =&gt; DISTINCT count = 3</text>\n\n          <path d=\"M 410 100 L 480 100\" stroke=\"#2563eb\" stroke-width=\"2.5\" marker-end=\"url(#arrow1378)\"/>\n\n          <!-- Output -->\n          <rect x=\"490\" y=\"20\" width=\"370\" height=\"160\" rx=\"8\" fill=\"#ffffff\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n          <text x=\"505\" y=\"45\" fill=\"#15803d\" font-family=\"monospace\" font-size=\"12\" font-weight=\"700\">AGGREGATED PROJECTION</text>\n          <text x=\"505\" y=\"85\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11.5\">COUNT(DISTINCT lead_id) AS unique_leads</text>\n          <text x=\"505\" y=\"125\" fill=\"#0f172a\" font-family=\"monospace\" font-size=\"11.5\">COUNT(DISTINCT partner_id) AS unique_partners</text>\n        </svg>",
      "logicBreakdown": [
        "Group records by date_id and make_name.",
        "Count distinct lead IDs with COUNT(DISTINCT lead_id) AS unique_leads.",
        "Count distinct partner IDs with COUNT(DISTINCT partner_id) AS unique_partners."
      ],
      "trapsAndEdgeCases": [
        "Omitting DISTINCT: Writing COUNT(lead_id) counts total rows instead of unique entities, producing incorrect inflated counts."
      ],
      "alternativeSolutions": [
        {
          "name": "Standard Grouping",
          "complexity": "O(N) hash grouping",
          "sql": "SELECT date_id, make_name,\n       COUNT(DISTINCT lead_id) AS unique_leads,\n       COUNT(DISTINCT partner_id) AS unique_partners\nFROM DailySales\nGROUP BY date_id, make_name;",
          "explanation": "Canonical high-performance multi-distinct aggregation."
        }
      ],
      "solutionSQL": "SELECT \n    date_id,\n    make_name,\n    COUNT(DISTINCT lead_id) AS unique_leads,\n    COUNT(DISTINCT partner_id) AS unique_partners\nFROM DailySales\nGROUP BY date_id, make_name;",
      "lineByLineExplanation": [
        {
          "clause": "SELECT date_id, make_name,",
          "exp": "Retains the calendar date and manufacturer make."
        },
        {
          "clause": "COUNT(DISTINCT lead_id) AS unique_leads,",
          "exp": "Computes distinct lead interactions."
        },
        {
          "clause": "COUNT(DISTINCT partner_id) AS unique_partners",
          "exp": "Computes distinct partner interactions."
        },
        {
          "clause": "FROM DailySales GROUP BY date_id, make_name;",
          "exp": "Partitions data per daily make combination."
        }
      ]
    }
  ]
};
