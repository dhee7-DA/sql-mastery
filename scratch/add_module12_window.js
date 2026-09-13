const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../visualizer/study_library_data.js');
let content = fs.readFileSync(targetFile, 'utf8');

const module12 = {
  id: "sec_window_functions",
  pillarId: "pillar4",
  icon: "🪟",
  title: "12. Analytical Window Functions, Value Offsets & Sliding Window Physics",
  badge: "Advanced Analytics Engine",
  badgeClass: "pill-select",
  readTime: "18 min read",
  summary: "Master the crown jewel of analytical SQL: partition fences, row ranking mechanics (ROW_NUMBER vs RANK vs DENSE_RANK), value offset navigation (LAG / LEAD), and physical sliding frame apertures (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW).",
  svgDiagram: `<svg viewBox="0 0 860 300" width="100%" height="100%" style="min-height: 250px; max-height: 350px; display: block;" xmlns="http://www.w3.org/2000/svg">
  <rect width="860" height="300" fill="#080c14" rx="14" stroke="#000000" stroke-width="3"/>
  <!-- Header -->
  <rect x="18" y="16" width="824" height="34" fill="#38bdf8" rx="8" stroke="#000000" stroke-width="2.5"/>
  <text x="430" y="38" fill="#000000" font-family="system-ui, -apple-system, sans-serif" font-size=\"13\" font-weight=\"900\" text-anchor=\"middle\" letter-spacing=\"0.5\">
    WINDOW FUNCTION MECHANICS: PARTITION FENCES, RANKING TRIAD &amp; SLIDING FRAMES
  </text>

  <!-- Section 1: Non-Destructive Partitioning -->
  <rect x=\"23\" y=\"71\" width=\"260\" height=\"135\" fill=\"#000000\" rx=\"10\"/>
  <rect x=\"20\" y=\"68\" width=\"260\" height=\"135\" fill=\"#fef08a\" rx=\"10\" stroke=\"#000000\" stroke-width=\"2.5\"/>
  <text x=\"35\" y=\"93\" fill=\"#854d0e\" font-family=\"system-ui, sans-serif\" font-size=\"11.5\" font-weight=\"900\">1. PARTITION BY (NO ROW COLLAPSE)</text>
  <text x=\"35\" y=\"110\" fill=\"#000000\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">OVER (PARTITION BY dept)</text>
  
  <rect x=\"35\" y=\"122\" width=\"230\" height=\"22\" fill=\"#ffffff\" rx=\"4\" stroke=\"#000000\" stroke-width=\"1.5\"/>
  <text x=\"42\" y=\"137\" fill=\"#000000\" font-family=\"monospace\" font-size=\"9\" font-weight=\"800\">Alice (Eng, $120k) ──► Rank: 2</text>
  <rect x=\"35\" y=\"148\" width=\"230\" height=\"22\" fill=\"#ffffff\" rx=\"4\" stroke=\"#000000\" stroke-width=\"1.5\"/>
  <text x=\"42\" y=\"163\" fill=\"#000000\" font-family=\"monospace\" font-size=\"9\" font-weight=\"800\">Bob   (Eng, $140k) ──► Rank: 1</text>
  <text x=\"35\" y=\"190\" fill=\"#854d0e\" font-family=\"system-ui, sans-serif\" font-size=\"9\" font-weight=\"800\">Every detail row preserved (N -> N)!</text>

  <!-- Section 2: The Ranking Triad -->
  <rect x=\"298\" y=\"71\" width=\"265\" height=\"135\" fill=\"#000000\" rx=\"10\"/>
  <rect x=\"295\" y=\"68\" width=\"265\" height=\"135\" fill=\"#fbcfe8\" rx=\"10\" stroke=\"#000000\" stroke-width=\"2.5\"/>
  <text x=\"310\" y=\"93\" fill=\"#9d174d\" font-family=\"system-ui, sans-serif\" font-size=\"11.5\" font-weight=\"900\">2. THE TIE-BREAKING TRIAD</text>
  <text x=\"310\" y=\"110\" fill=\"#000000\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">Tied Scores: [100, 90, 90, 80]</text>
  
  <rect x=\"310\" y=\"122\" width=\"235\" height=\"18\" fill=\"#ffffff\" rx=\"3\" stroke=\"#000000\" stroke-width=\"1\"/>
  <text x=\"315\" y=\"135\" fill=\"#000000\" font-family=\"monospace\" font-size=\"8.5\" font-weight=\"800\">ROW_NUMBER() : 1, 2, 3, 4 (No ties)</text>
  <rect x=\"310\" y=\"144\" width=\"235\" height=\"18\" fill=\"#ffffff\" rx=\"3\" stroke=\"#000000\" stroke-width=\"1\"/>
  <text x=\"315\" y=\"157\" fill=\"#000000\" font-family=\"monospace\" font-size=\"8.5\" font-weight=\"800\">RANK()       : 1, 2, 2, 4 (Gaps!)</text>
  <rect x=\"310\" y=\"166\" width=\"235\" height=\"18\" fill=\"#ffffff\" rx=\"3\" stroke=\"#000000\" stroke-width=\"1\"/>
  <text x=\"315\" y=\"179\" fill=\"#000000\" font-family=\"monospace\" font-size=\"8.5\" font-weight=\"800\">DENSE_RANK() : 1, 2, 2, 3 (No gaps)</text>

  <!-- Section 3: Sliding Frame Aperture & Offsets -->
  <rect x=\"578\" y=\"71\" width=\"260\" height=\"135\" fill=\"#000000\" rx=\"10\"/>
  <rect x=\"575\" y=\"68\" width=\"260\" height=\"135\" fill=\"#dcfce7\" rx=\"10\" stroke=\"#000000\" stroke-width=\"2.5\"/>
  <text x=\"590\" y=\"93\" fill=\"#14532d\" font-family=\"system-ui, sans-serif\" font-size=\"11.5\" font-weight=\"900\">3. SLIDING FRAMES &amp; OFFSETS</text>
  <text x=\"590\" y=\"110\" fill=\"#000000\" font-family=\"monospace\" font-size=\"9.5\" font-weight=\"700\">LAG(rev, 1) -&gt; MoM Growth</text>
  
  <rect x=\"590\" y=\"122\" width=\"230\" height=\"22\" fill=\"#ffffff\" rx=\"4\" stroke=\"#000000\" stroke-width=\"1.5\"/>
  <text x=\"595\" y=\"137\" fill=\"#000000\" font-family=\"monospace\" font-size=\"9\" font-weight=\"800\">SUM() OVER (ROWS UNBOUNDED PRECEDING)</text>
  <rect x=\"590\" y=\"148\" width=\"230\" height=\"22\" fill=\"#ffffff\" rx=\"4\" stroke=\"#000000\" stroke-width=\"1.5\"/>
  <text x=\"595\" y=\"163\" fill=\"#000000\" font-family=\"monospace\" font-size=\"9\" font-weight=\"800\">AVG() OVER (ROWS 6 PRECEDING) [7-Day]</text>
  <text x=\"590\" y=\"190\" fill=\"#14532d\" font-family=\"system-ui, sans-serif\" font-size=\"9\" font-weight=\"800\">Running Totals &amp; Moving Averages</text>

  <!-- Bottom Callout Strip -->
  <rect x=\"23\" y=\"219\" width=\"815\" height=\"66\" fill=\"#000000\" rx=\"10\"/>
  <rect x=\"20\" y=\"216\" width=\"815\" height=\"66\" fill=\"#fee2e2\" rx=\"10\" stroke=\"#000000\" stroke-width=\"2.5\"/>
  <text x=\"35\" y=\"238\" fill=\"#b91c1c\" font-family=\"monospace\" font-size=\"11\" font-weight=\"900\">⚠️ CRITICAL EXECUTION RULE: WHY WINDOW FUNCTIONS FAIL IN WHERE</text>
  <text x=\"35\" y=\"256\" fill=\"#1e293b\" font-family=\"system-ui, sans-serif\" font-size=\"11\" font-weight=\"700\">WHERE evaluates at Step 02, while Window Functions calculate at Step 05. The rank value physically does not exist yet!</text>
  <text x=\"35\" y=\"272\" fill=\"#1e293b\" font-family=\"system-ui, sans-serif\" font-size=\"11\" font-weight=\"700\">Universal Solution: Wrap in a Common Table Expression (CTE) or Derived Table, then filter 'WHERE rnk &lt;= 3'.</text>
</svg>`,
  sections: [
    {
      heading: "1. The Non-Destructive Analytical Paradigm",
      content: "Before window functions were codified in SQL:2003, calculating peer-relative metrics or running balances required expensive self-joins or temporary tables. \n\n**The Architectural Difference**:\n- **`GROUP BY` (Destructive)**: Collapses input rows into summary buckets. Detail rows are discarded ($N \\to 1$).\n- **Window Functions (Non-Destructive)**: Evaluates aggregate, ranking, or offset expressions across a virtual window partition while **retaining every individual input row** ($N \\to N$).\n\n```sql\n-- Full employee detail preserved alongside department aggregate\nSELECT employee_id, department_id, salary,\n       AVG(salary) OVER(PARTITION BY department_id) AS dept_avg_salary,\n       salary - AVG(salary) OVER(PARTITION BY department_id) AS variance_from_avg\nFROM Employees;\n```"
    },
    {
      heading: "2. The Big 4 Ranking Triad & Quantiles",
      content: "Understanding how tied values are handled is the single most tested concept in technical SQL screens:\n\n1. **`ROW_NUMBER()`**: Strictly sequential ($1, 2, 3, 4, 5$). Completely ignores ties. If no unique secondary sort key is provided, tie resolution is non-deterministic.\n2. **`RANK()`**: Olympic competition ranking ($1, 2, 2, 4, 5$). Tied rows share the same rank, and subsequent rank numbers are skipped by the tie multiplicity.\n3. **`DENSE_RANK()`**: Compact level ranking ($1, 2, 2, 3, 4$). Tied rows share the same rank, and the next row receives the immediate next integer without gaps. Essential for 'Top N Salary' problems.\n4. **`NTILE(k)`**: Divides ordered partition rows into $k$ roughly equal-sized buckets. If $N$ is not divisible by $k$, extra rows are distributed to the lowest-numbered buckets first."
    },
    {
      heading: "3. Value Navigation: Offsets, Growth & Churn",
      content: "Window offset functions allow relational engines to peek forward or backward across rows without complex self-joins:\n\n- **`LAG(col, offset, default)`**: Accesses data from a preceding row. The engine standard for calculating **Month-over-Month (MoM)** growth:\n```sql\nWITH MonthlyRevenue AS (\n    SELECT DATE_FORMAT(order_date, '%Y-%m-01') AS rev_month, SUM(amount) AS revenue\n    FROM Orders GROUP BY 1\n)\nSELECT rev_month, revenue,\n       LAG(revenue, 1, 0) OVER (ORDER BY rev_month ASC) AS prev_month_revenue,\n       ROUND((revenue - LAG(revenue, 1) OVER (ORDER BY rev_month ASC)) \n             / NULLIF(LAG(revenue, 1) OVER (ORDER BY rev_month ASC), 0) * 100.0, 2) AS mom_growth_pct\nFROM MonthlyRevenue;\n```\n- **`LEAD(col, offset, default)`**: Accesses data from a subsequent row. Used to compute session timeouts and time-to-conversion."
    },
    {
      heading: "4. Physical Frame Apertures: ROWS vs. RANGE",
      content: "When an `ORDER BY` is added to a window function without an explicit frame clause, SQL engines apply a dangerous default:\n`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`\n\n- **`ROWS` (Physical Rows)**: Operates on exact row counts regardless of duplicate values.\n- **`RANGE` (Logical Values)**: Groups duplicate values together. If two rows have the same timestamp, `RANGE` includes *both* in the running total at the same time, producing unexpected aggregate spikes!\n\n**Best Practice**: Always explicitly specify the physical frame:\n- **Running Total**: `SUM(amount) OVER (PARTITION BY account_id ORDER BY trans_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`\n- **7-Day Moving Average**: `AVG(signups) OVER (ORDER BY signup_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`"
    },
    {
      heading: "5. Execution Lifecycle & The CTE / QUALIFY Pattern",
      content: "A universal interview trap is attempting to write `WHERE ROW_NUMBER() OVER (...) <= 3`.\n\n**Physical Execution Sequence**:\n1. `FROM` & `JOIN`\n2. `WHERE` (Row filtering)\n3. `GROUP BY`\n4. `HAVING`\n5. **WINDOW FUNCTIONS** (Computed here at Step 5!)\n6. `SELECT`\n7. `ORDER BY`\n8. `LIMIT`\n\nBecause `WHERE` executes at Step 2, window results literally do not exist when `WHERE` runs. \n\n**Universal Solution**: Wrap the window calculation in a CTE or derived table, then filter in the outer query:"
    }
  ],
  interviewGotchas: [
    {
      title: "The Indeterminate Sorting Hazard",
      trap: "Using ROW_NUMBER() with an ORDER BY on a non-unique column (like order_date) causes non-deterministic query results. Different runs may select different rows as rank 1! Always append a unique tie-breaker: 'ORDER BY order_date DESC, order_id DESC'."
    },
    {
      title: "The Default RANGE Cumulative Inflation",
      trap: "Defaulting to RANGE instead of ROWS means tied dates accumulate together. If two sales occur on Monday, Monday's running total will immediately jump to include both rows on the first row."
    },
    {
      title: "The WHERE Window Function Crash",
      trap: "Filtering window functions in WHERE throws 'Window functions are not allowed in WHERE'. Always encapsulate in a CTE and filter 'WHERE rnk <= 3' in the outer query."
    }
  ]
};

// Insert module12 before the closing `];`
const lastBracketIdx = content.lastIndexOf('];');
if (lastBracketIdx === -1) {
  throw new Error("Could not find closing '];' in study_library_data.js");
}

const prefix = content.substring(0, lastBracketIdx).trim();
const needsComma = !prefix.endsWith(',');
const newContent = prefix + (needsComma ? ',\n' : '\n') + JSON.stringify(module12, null, 2) + '\n];\n';

fs.writeFileSync(targetFile, newContent, 'utf8');
console.log("Successfully added Module 12 to visualizer/study_library_data.js!");
