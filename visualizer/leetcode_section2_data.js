// =============================================================================
// LEETCODE 50 SQL ARENA - CONCEPT SECTION 2 DATA
// Concept: Relational Joins & Self-Joins (9 Problems)
// =============================================================================

window.LEETCODE_SECTION_2_DATA = {
  conceptId: 'concept-2',
  conceptNumber: 2,
  title: 'Relational Joins & Self-Joins',
  subtitle: 'Master physical join engines, Venn set mechanics, the ON vs WHERE outer trap, temporal self-joins, and Cartesian matrices across 9 canonical problems.',
  keyTakeaway: 'In relational databases, real-world data almost never lives in a single monolithic table. Joining tables is the heart of relational database systems.',

  // ---------------------------------------------------------------------------
  // 1. MASTERCLASS CURRICULUM (EVERY CHAPTER INCLUDES BESPOKE SVG EXPLAINERS)
  // ---------------------------------------------------------------------------
  masterclass: {
    overview: `
      In relational databases, real-world data almost never lives in a single monolithic table. 
      Users live in one table, orders in another, items in a third, and payments in a fourth.
      
      <strong>Joining tables is the heart and soul of relational database management systems (RDBMS).</strong> 
      In this section, you will master not just the syntax of <code>INNER</code>, <code>LEFT</code>, <code>RIGHT</code>, <code>CROSS</code>, and <code>SELF</code> joins, 
      but their internal execution engines, their set-theoretic Venn boundaries, and the subtle traps that eliminate 80% of candidates in technical screens.
    `,

    chapters: [
      {
        id: 'chap-2-1-venn-taxonomy',
        number: '2.1',
        title: 'The Visual Taxonomy of Joins (Venn Sets & Shaded Boundaries)',
        content: `
          <p class="lc-p">
            Think of two relational tables as two overlapping mathematical sets: <strong>Table A (Left)</strong> and <strong>Table B (Right)</strong>.
            The type of JOIN you specify dictates which parts of the Venn diagram the query engine includes in the output buffer.
          </p>

          <div class="lc-rule-banner">
            <strong>The 5 Core Relational Join Types:</strong><br>
            &bull; <strong>INNER JOIN ($A \\cap B$)</strong>: Retains <em>only</em> rows where the join predicate evaluates to TRUE on both sides.<br>
            &bull; <strong>LEFT OUTER JOIN ($A$)</strong>: Retains <em>every single row</em> from Table A. If Table B matches, attributes are filled. If Table B has no match, Table B columns are padded with <code>NULL</code>.<br>
            &bull; <strong>RIGHT OUTER JOIN ($B$)</strong>: Mirrored version of LEFT JOIN. Retains all of Table B.<br>
            &bull; <strong>FULL OUTER JOIN ($A \\cup B$)</strong>: Retains all rows from both tables, filling missing keys with <code>NULL</code>.<br>
            &bull; <strong>LEFT ANTI-JOIN ($A - B$)</strong>: Retains rows in Table A that have <em>zero matches</em> in Table B (Written as <code>LEFT JOIN ... WHERE B.key IS NULL</code>).
          </div>

          <p class="lc-p">
            Below is the comprehensive visual map of join operations. Notice how each join corresponds to an exact shaded region in set theory:
          </p>
        `,
        diagram: {
          id: 'diag-venn-joins',
          title: 'The Visual Set-Theoretic Taxonomy of SQL Joins',
          svg: `<svg viewBox="0 0 880 260" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- 1. INNER JOIN -->
            <g transform="translate(10, 20)">
              <rect x="0" y="0" width="160" height="220" rx="8" fill="#ffffff" stroke="#e4e4e7" stroke-width="1.5"/>
              <text x="80" y="25" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="700">INNER JOIN</text>
              <text x="80" y="42" text-anchor="middle" fill="#64748b" font-size="10">Intersection (A ∩ B)</text>
              <circle cx="60" cy="110" r="40" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
              <circle cx="100" cy="110" r="40" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
              <path d="M 80 75 A 40 40 0 0 1 80 145 A 40 40 0 0 1 80 75" fill="#2563eb" opacity="0.85"/>
              <text x="45" y="115" fill="#64748b" font-size="11" font-weight="700">A</text>
              <text x="110" y="115" fill="#64748b" font-size="11" font-weight="700">B</text>
              <rect x="15" y="175" width="130" height="30" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
              <text x="80" y="195" text-anchor="middle" fill="#1d4ed8" font-family="monospace" font-size="9.5" font-weight="700">Only Matching Rows</text>
            </g>

            <!-- 2. LEFT JOIN -->
            <g transform="translate(185, 20)">
              <rect x="0" y="0" width="160" height="220" rx="8" fill="#ffffff" stroke="#e4e4e7" stroke-width="1.5"/>
              <text x="80" y="25" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="700">LEFT OUTER JOIN</text>
              <text x="80" y="42" text-anchor="middle" fill="#64748b" font-size="10">All of Table A + Matches</text>
              <circle cx="60" cy="110" r="40" fill="#2563eb" opacity="0.85" stroke="#1d4ed8" stroke-width="1.5"/>
              <circle cx="100" cy="110" r="40" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
              <text x="45" y="115" fill="#ffffff" font-size="11" font-weight="700">A</text>
              <text x="110" y="115" fill="#64748b" font-size="11" font-weight="700">B</text>
              <rect x="15" y="175" width="130" height="30" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
              <text x="80" y="195" text-anchor="middle" fill="#1d4ed8" font-family="monospace" font-size="9.5" font-weight="700">Keep All Left Rows</text>
            </g>

            <!-- 3. LEFT ANTI-JOIN -->
            <g transform="translate(360, 20)">
              <rect x="0" y="0" width="160" height="220" rx="8" fill="#ffffff" stroke="#e4e4e7" stroke-width="1.5"/>
              <text x="80" y="25" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="700">LEFT ANTI-JOIN</text>
              <text x="80" y="42" text-anchor="middle" fill="#64748b" font-size="10">A minus B (Unmatched)</text>
              <circle cx="60" cy="110" r="40" fill="#f59e0b" opacity="0.85" stroke="#d97706" stroke-width="1.5"/>
              <path d="M 80 75 A 40 40 0 0 1 80 145 A 40 40 0 0 1 80 75" fill="#ffffff"/>
              <circle cx="100" cy="110" r="40" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
              <text x="45" y="115" fill="#ffffff" font-size="11" font-weight="700">A</text>
              <text x="110" y="115" fill="#64748b" font-size="11" font-weight="700">B</text>
              <rect x="15" y="175" width="130" height="30" rx="4" fill="#fef3c7" stroke="#fde68a"/>
              <text x="80" y="195" text-anchor="middle" fill="#b45309" font-family="monospace" font-size="9.5" font-weight="700">WHERE B.id IS NULL</text>
            </g>

            <!-- 4. FULL OUTER JOIN -->
            <g transform="translate(535, 20)">
              <rect x="0" y="0" width="160" height="220" rx="8" fill="#ffffff" stroke="#e4e4e7" stroke-width="1.5"/>
              <text x="80" y="25" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="700">FULL OUTER JOIN</text>
              <text x="80" y="42" text-anchor="middle" fill="#64748b" font-size="10">Union (A ∪ B)</text>
              <circle cx="60" cy="110" r="40" fill="#10b981" opacity="0.75" stroke="#059669" stroke-width="1.5"/>
              <circle cx="100" cy="110" r="40" fill="#10b981" opacity="0.75" stroke="#059669" stroke-width="1.5"/>
              <text x="45" y="115" fill="#ffffff" font-size="11" font-weight="700">A</text>
              <text x="110" y="115" fill="#ffffff" font-size="11" font-weight="700">B</text>
              <rect x="15" y="175" width="130" height="30" rx="4" fill="#ecfdf5" stroke="#a7f3d0"/>
              <text x="80" y="195" text-anchor="middle" fill="#047857" font-family="monospace" font-size="9.5" font-weight="700">Preserve Both Sides</text>
            </g>

            <!-- 5. CROSS JOIN -->
            <g transform="translate(710, 20)">
              <rect x="0" y="0" width="160" height="220" rx="8" fill="#ffffff" stroke="#e4e4e7" stroke-width="1.5"/>
              <text x="80" y="25" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="700">CROSS JOIN</text>
              <text x="80" y="42" text-anchor="middle" fill="#64748b" font-size="10">Cartesian Matrix (A × B)</text>
              <rect x="45" y="80" width="70" height="60" rx="4" fill="#f8fafc" stroke="#6366f1" stroke-width="1.5"/>
              <line x1="45" y1="100" x2="115" y2="100" stroke="#cbd5e1" stroke-dasharray="2,2"/>
              <line x1="45" y1="120" x2="115" y2="120" stroke="#cbd5e1" stroke-dasharray="2,2"/>
              <line x1="80" y1="80" x2="80" y2="140" stroke="#cbd5e1" stroke-dasharray="2,2"/>
              <circle cx="62" cy="90" r="3" fill="#6366f1"/>
              <circle cx="97" cy="90" r="3" fill="#6366f1"/>
              <circle cx="62" cy="110" r="3" fill="#6366f1"/>
              <circle cx="97" cy="110" r="3" fill="#6366f1"/>
              <circle cx="62" cy="130" r="3" fill="#6366f1"/>
              <circle cx="97" cy="130" r="3" fill="#6366f1"/>
              <rect x="15" y="175" width="130" height="30" rx="4" fill="#e0e7ff" stroke="#c7d2fe"/>
              <text x="80" y="195" text-anchor="middle" fill="#4338ca" font-family="monospace" font-size="9.5" font-weight="700">Every Single Pair</text>
            </g>
          </svg>`
        }
      },

      {
        id: 'chap-2-2-sample-schema-arrows',
        number: '2.2',
        title: 'How The Database Links Rows (Schema Tables & Pointer Arrows)',
        content: `
          <p class="lc-p">
            Let's ground this theory in real schema tables from <strong>LeetCode #1378 (Replace Employee ID With The Unique Identifier)</strong>.
          </p>

          <p class="lc-p">
            We have two tables:
            <br>&bull; <code>Employees</code> (Left Table): Contains <code>id</code> (Primary Key) and <code>name</code>.
            <br>&bull; <code>EmployeeUNI</code> (Right Table): Contains <code>id</code> and <code>unique_id</code>.
          </p>

          <div class="lc-callout-card info">
            <div class="lc-callout-title">
              <span>💡</span>
              <span>The Relational Pointer Walk</span>
            </div>
            <div class="lc-callout-body">
              When executing <code class="lc-code-pill">SELECT u.unique_id, e.name FROM Employees e LEFT JOIN EmployeeUNI u ON e.id = u.id;</code>:
              <br><br>
              1. The engine reads Alice (<code>id: 1</code>) &rarr; Looks up <code>id: 1</code> in <code>EmployeeUNI</code> &rarr; <strong>Found!</strong> Outputs <code>(101, 'Alice')</code>.
              <br>2. The engine reads Bob (<code>id: 2</code>) &rarr; Looks up <code>id: 2</code> in <code>EmployeeUNI</code> &rarr; <strong>Found!</strong> Outputs <code>(102, 'Bob')</code>.
              <br>3. The engine reads Charlie (<code>id: 3</code>) &rarr; Looks up <code>id: 3</code> in <code>EmployeeUNI</code> &rarr; <strong>NOT FOUND!</strong>
              <br>Because it is a <strong>LEFT JOIN</strong>, Charlie is NOT dropped! Instead, the engine dynamically creates a synthetic row padded with <code>NULL</code>, outputting <code>(NULL, 'Charlie')</code>.
            </div>
          </div>
        `,
        diagram: {
          id: 'diag-schema-pointer-arrows',
          title: 'Pointer Resolution: Matches vs NULL Padded Rows in a LEFT JOIN',
          svg: `<svg viewBox="0 0 880 280" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="matchArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#16a34a"/>
              </marker>
              <marker id="nullArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#dc2626"/>
              </marker>
              <marker id="outArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
              </marker>
            </defs>

            <!-- Table 1: Employees (Left) -->
            <rect x="30" y="20" width="220" height="230" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="30" y="20" width="220" height="35" rx="8" fill="#f8fafc"/>
            <text x="45" y="42" fill="#0f172a" font-size="13" font-weight="700">Employees (Left Table)</text>
            <text x="50" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">id (PK)</text>
            <text x="140" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">name</text>
            <line x1="30" y1="85" x2="250" y2="85" stroke="#e2e8f0"/>
            <rect x="35" y="95" width="210" height="35" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="50" y="117" fill="#166534" font-family="monospace" font-size="12" font-weight="700">1</text>
            <text x="140" y="117" fill="#0f172a" font-size="12">Alice</text>
            <rect x="35" y="140" width="210" height="35" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="50" y="162" fill="#166534" font-family="monospace" font-size="12" font-weight="700">2</text>
            <text x="140" y="162" fill="#0f172a" font-size="12">Bob</text>
            <rect x="35" y="185" width="210" height="35" rx="4" fill="#fef2f2" stroke="#fecaca"/>
            <text x="50" y="207" fill="#991b1b" font-family="monospace" font-size="12" font-weight="700">3</text>
            <text x="140" y="207" fill="#0f172a" font-size="12">Charlie</text>

            <!-- Arrows Left to Right -->
            <path d="M 250 112 Q 285 112, 310 112" fill="none" stroke="#16a34a" stroke-width="2.5" marker-end="url(#matchArrow)"/>
            <path d="M 250 157 Q 285 157, 310 157" fill="none" stroke="#16a34a" stroke-width="2.5" marker-end="url(#matchArrow)"/>
            <path d="M 250 202 Q 275 202, 290 220" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#nullArrow)"/>

            <!-- Table 2: EmployeeUNI (Right) -->
            <rect x="320" y="20" width="230" height="230" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="320" y="20" width="230" height="35" rx="8" fill="#f8fafc"/>
            <text x="335" y="42" fill="#0f172a" font-size="13" font-weight="700">EmployeeUNI (Right Table)</text>
            <text x="340" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">id</text>
            <text x="420" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">unique_id</text>
            <line x1="320" y1="85" x2="550" y2="85" stroke="#e2e8f0"/>
            <rect x="325" y="95" width="220" height="35" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="340" y="117" fill="#166534" font-family="monospace" font-size="12" font-weight="700">1</text>
            <text x="420" y="117" fill="#1d4ed8" font-family="monospace" font-size="12" font-weight="700">101</text>
            <rect x="325" y="140" width="220" height="35" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="340" y="162" fill="#166534" font-family="monospace" font-size="12" font-weight="700">2</text>
            <text x="420" y="162" fill="#1d4ed8" font-family="monospace" font-size="12" font-weight="700">102</text>
            <rect x="325" y="185" width="220" height="45" rx="4" fill="#fffbeb" stroke="#fde68a"/>
            <text x="335" y="205" fill="#b45309" font-size="11" font-weight="700">⚠️ No Row for id: 3</text>
            <text x="335" y="222" fill="#78350f" font-size="10.5">Padded with NULL by LEFT JOIN</text>

            <!-- Arrow Right to Output -->
            <line x1="560" y1="135" x2="600" y2="135" stroke="#2563eb" stroke-width="2.5" marker-end="url(#outArrow)"/>

            <!-- Table 3: Joined Result Buffer -->
            <rect x="610" y="20" width="240" height="230" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
            <rect x="610" y="20" width="240" height="35" rx="8" fill="#eff6ff"/>
            <text x="625" y="42" fill="#1d4ed8" font-size="13" font-weight="700">Final Joined Output</text>
            <text x="625" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">unique_id</text>
            <text x="735" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">name</text>
            <line x1="610" y1="85" x2="850" y2="85" stroke="#e2e8f0"/>
            <rect x="615" y="95" width="230" height="35" rx="4" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="625" y="117" fill="#1d4ed8" font-family="monospace" font-size="12" font-weight="700">101</text>
            <text x="735" y="117" fill="#0f172a" font-size="12">Alice</text>
            <rect x="615" y="140" width="230" height="35" rx="4" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="625" y="162" fill="#1d4ed8" font-family="monospace" font-size="12" font-weight="700">102</text>
            <text x="735" y="162" fill="#0f172a" font-size="12">Bob</text>
            <rect x="615" y="185" width="230" height="35" rx="4" fill="#fff1f2" stroke="#fecdd3"/>
            <text x="625" y="207" fill="#e11d48" font-family="monospace" font-size="12" font-weight="700">null</text>
            <text x="735" y="207" fill="#0f172a" font-size="12">Charlie</text>
          </svg>`
        }
      },

      {
        id: 'chap-2-3-on-vs-where',
        number: '2.3',
        title: 'The Fatal "ON vs WHERE" Outer Join Trap (Interview Question #1)',
        content: `
          <p class="lc-p">
            This is the single most tested join concept in technical interviews at Amazon, Stripe, and Google.
            Understanding the exact moment predicates are evaluated prevents silent data loss bugs in production.
          </p>

          <div class="lc-rule-banner">
            <strong>The Critical Rule:</strong><br>
            &bull; Predicates in the <code>ON</code> clause dictate <strong>HOW rows are matched</strong> during the join.<br>
            &bull; Predicates in the <code>WHERE</code> clause execute <strong>AFTER the join is already completed</strong>, filtering the combined buffer!
          </div>

          <p class="lc-p">
            Suppose an interviewer asks you: <em>"Find all employees and their bonus, but only show bonuses for department 10."</em>
            Look at what happens when you put the filter in <code>WHERE</code> vs <code>ON</code>:
          </p>

          <div class="lc-comparison-grid">
            <div class="lc-compare-card bad">
              <div class="lc-compare-title">
                <span>❌</span>
                <span>The WHERE Trap (Silently Destroys Outer Join)</span>
              </div>
              <div class="lc-code-snippet">SELECT e.name, b.bonus<br>FROM Employees e<br>LEFT JOIN Bonuses b<br>  ON e.id = b.emp_id<br>WHERE b.dept_id = 10;</div>
              <div class="lc-compare-explain">
                <strong>Disaster!</strong> For employees with no bonus, <code>b.dept_id</code> is <code>NULL</code>.<br>
                When the <code>WHERE</code> clause runs, <code>NULL = 10</code> evaluates to <strong>UNKNOWN</strong> in 3VL.<br>
                The query engine drops them! Your <code>LEFT JOIN</code> silently mutated into an <code>INNER JOIN</code>!
              </div>
            </div>

            <div class="lc-compare-card good">
              <div class="lc-compare-title">
                <span>⚡</span>
                <span>The Correct ON Placement (Preserves Left Rows)</span>
              </div>
              <div class="lc-code-snippet">SELECT e.name, b.bonus<br>FROM Employees e<br>LEFT JOIN Bonuses b<br>  ON e.id = b.emp_id<br> AND b.dept_id = 10;</div>
              <div class="lc-compare-explain">
                <strong>Correct!</strong> The engine only looks for bonuses in dept 10.<br>
                If an employee has no bonus in dept 10, the join condition fails, but the employee is <strong>still preserved with NULL</strong>!
              </div>
            </div>
          </div>
        `,
        diagram: {
          id: 'diag-on-vs-where-timeline',
          title: 'Execution Stage Timeline: Why WHERE Filters Silently Kill Outer Joins',
          svg: `<svg viewBox="0 0 880 230" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="timelineArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
              </marker>
            </defs>

            <!-- Step 1: FROM + JOIN ON -->
            <rect x="30" y="25" width="250" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="30" y="25" width="250" height="30" rx="8" fill="#f8fafc"/>
            <text x="45" y="45" fill="#0f172a" font-size="12" font-weight="700">STAGE 1: JOIN ON Clause</text>
            <text x="45" y="75" fill="#64748b" font-size="11">Resolves relationships &amp; matches</text>
            <rect x="40" y="90" width="230" height="30" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="50" y="110" fill="#166534" font-family="monospace" font-size="11">Emp 1 ➔ Bonus $500 (Matched)</text>
            <rect x="40" y="130" width="230" height="30" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="50" y="150" fill="#1d4ed8" font-family="monospace" font-size="11">Emp 2 ➔ NULL (Preserved!)</text>
            <text x="45" y="185" fill="#16a34a" font-size="10.5" font-weight="600">✓ Left table rows survive intact</text>

            <!-- Arrow 1 to 2 -->
            <line x1="285" y1="115" x2="330" y2="115" stroke="#2563eb" stroke-width="2.5" marker-end="url(#timelineArrow)"/>

            <!-- Step 2: WHERE Post-Filter -->
            <rect x="340" y="25" width="250" height="180" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
            <rect x="340" y="25" width="250" height="30" rx="8" fill="#fef2f2"/>
            <text x="355" y="45" fill="#991b1b" font-size="12" font-weight="700">STAGE 2: WHERE Clause</text>
            <text x="355" y="75" fill="#64748b" font-size="11">Evaluates predicates in 3VL</text>
            <rect x="350" y="90" width="230" height="30" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="360" y="110" fill="#166534" font-family="monospace" font-size="11">b.dept_id = 10 ➔ TRUE</text>
            <rect x="350" y="130" width="230" height="30" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
            <text x="360" y="150" fill="#dc2626" font-family="monospace" font-size="11">NULL = 10 ➔ UNKNOWN (DROP!)</text>
            <text x="355" y="185" fill="#dc2626" font-size="10.5" font-weight="700">❌ Emp 2 is silently eliminated!</text>

            <!-- Arrow 2 to 3 -->
            <line x1="595" y1="115" x2="640" y2="115" stroke="#2563eb" stroke-width="2.5" marker-end="url(#timelineArrow)"/>

            <!-- Output: Accidental Inner Join -->
            <rect x="650" y="25" width="200" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="650" y="25" width="200" height="30" rx="8" fill="#f8fafc"/>
            <text x="665" y="45" fill="#0f172a" font-size="12" font-weight="700">Final Result Output</text>
            <rect x="660" y="90" width="180" height="30" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="670" y="110" fill="#0f172a" font-family="monospace" font-size="11">Emp 1 only</text>
            <rect x="660" y="130" width="180" height="50" rx="4" fill="#fffbeb" stroke="#fde68a"/>
            <text x="670" y="150" fill="#b45309" font-size="10.5" font-weight="700">⚠️ Accidentally</text>
            <text x="670" y="168" fill="#78350f" font-size="10">Mutated into INNER JOIN!</text>
          </svg>`
        }
      },

      {
        id: 'chap-2-4-self-joins-time-machine',
        number: '2.4',
        title: 'Self-Joins as a Time Machine (LeetCode #197 Masterclass)',
        content: `
          <p class="lc-p">
            In <strong>LeetCode #197 (Rising Temperature)</strong>, you must find all dates where the temperature was higher than the <strong>previous day (yesterday)</strong>.
          </p>

          <p class="lc-p">
            SQL has no innate concept of "yesterday" inside a single row. Each row only knows its own date and its own temperature.
            How do you give a row the ability to look backwards in time?
          </p>

          <div class="lc-rule-banner">
            <strong>The Self-Join Time Machine:</strong><br>
            You load two independent instances of the exact same table into memory with different aliases:<br>
            &bull; <code>w1</code> represents <strong>Today</strong><br>
            &bull; <code>w2</code> represents <strong>Yesterday</strong><br>
            Then you join them with a 1-day temporal offset: <code class="lc-code-pill">DATEDIFF(w1.recordDate, w2.recordDate) = 1</code>!
          </div>

          <p class="lc-p">
            Once <code>w1</code> and <code>w2</code> are joined side-by-side, comparing temperatures is as simple as writing:
            <code class="lc-code-pill">WHERE w1.temperature &gt; w2.temperature</code>.
          </p>
        `,
        diagram: {
          id: 'diag-self-join-time-machine',
          title: 'Self-Join Temporal Offset: Comparing Today (w1) vs Yesterday (w2)',
          svg: `<svg viewBox="0 0 880 270" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="timeArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
              </marker>
            </defs>

            <!-- Table 1: w1 (Today) -->
            <rect x="30" y="20" width="280" height="230" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
            <rect x="30" y="20" width="280" height="35" rx="8" fill="#eff6ff"/>
            <text x="45" y="42" fill="#1d4ed8" font-size="13" font-weight="700">Weather w1 (Alias: Today)</text>
            <text x="45" y="72" fill="#64748b" font-family="monospace" font-size="11">id</text>
            <text x="95" y="72" fill="#64748b" font-family="monospace" font-size="11">recordDate</text>
            <text x="210" y="72" fill="#64748b" font-family="monospace" font-size="11">temperature</text>
            <line x1="30" y1="80" x2="310" y2="80" stroke="#e2e8f0"/>

            <!-- Row 1 -->
            <text x="45" y="105" fill="#0f172a" font-family="monospace" font-size="11.5">1</text>
            <text x="95" y="105" fill="#0f172a" font-family="monospace" font-size="11.5">2026-01-01</text>
            <text x="210" y="105" fill="#0f172a" font-family="monospace" font-size="11.5">10°C</text>

            <!-- Row 2 (Rising!) -->
            <rect x="35" y="120" width="270" height="32" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="45" y="141" fill="#166534" font-family="monospace" font-size="11.5" font-weight="700">2</text>
            <text x="95" y="141" fill="#166534" font-family="monospace" font-size="11.5" font-weight="700">2026-01-02</text>
            <text x="210" y="141" fill="#166534" font-family="monospace" font-size="11.5" font-weight="700">25°C ⚡</text>

            <!-- Row 3 (Falling) -->
            <text x="45" y="180" fill="#0f172a" font-family="monospace" font-size="11.5">3</text>
            <text x="95" y="180" fill="#0f172a" font-family="monospace" font-size="11.5">2026-01-03</text>
            <text x="210" y="180" fill="#0f172a" font-family="monospace" font-size="11.5">20°C</text>

            <!-- Row 4 (Rising!) -->
            <rect x="35" y="195" width="270" height="32" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="45" y="216" fill="#166534" font-family="monospace" font-size="11.5" font-weight="700">4</text>
            <text x="95" y="216" fill="#166534" font-family="monospace" font-size="11.5" font-weight="700">2026-01-04</text>
            <text x="210" y="216" fill="#166534" font-family="monospace" font-size="11.5" font-weight="700">30°C ⚡</text>

            <!-- Center Condition Callout -->
            <g transform="translate(330, 90)">
              <rect x="0" y="0" width="220" height="90" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
              <text x="110" y="25" text-anchor="middle" fill="#0f172a" font-size="11" font-weight="700">JOIN PREDICATE</text>
              <text x="110" y="45" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="10.5">DATEDIFF(w1, w2) = 1</text>
              <line x1="20" y1="55" x2="200" y2="55" stroke="#e2e8f0"/>
              <text x="110" y="75" text-anchor="middle" fill="#16a34a" font-family="monospace" font-size="10.5" font-weight="700">w1.temp &gt; w2.temp</text>
            </g>

            <!-- Connecting Arrow: Jan 02 connects to Jan 01 -->
            <path d="M 305 136 C 360 136, 450 100, 560 105" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#timeArrow)"/>

            <!-- Connecting Arrow: Jan 04 connects to Jan 03 -->
            <path d="M 305 211 C 360 211, 450 180, 560 180" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#timeArrow)"/>

            <!-- Table 2: w2 (Yesterday) -->
            <rect x="570" y="20" width="280" height="230" rx="8" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>
            <rect x="570" y="20" width="280" height="35" rx="8" fill="#f8fafc"/>
            <text x="585" y="42" fill="#334155" font-size="13" font-weight="700">Weather w2 (Alias: Yesterday)</text>
            <text x="585" y="72" fill="#64748b" font-family="monospace" font-size="11">id</text>
            <text x="635" y="72" fill="#64748b" font-family="monospace" font-size="11">recordDate</text>
            <text x="750" y="72" fill="#64748b" font-family="monospace" font-size="11">temperature</text>
            <line x1="570" y1="80" x2="850" y2="80" stroke="#e2e8f0"/>

            <!-- Row 1 -->
            <text x="585" y="105" fill="#0f172a" font-family="monospace" font-size="11.5">1</text>
            <text x="635" y="105" fill="#0f172a" font-family="monospace" font-size="11.5">2026-01-01</text>
            <text x="750" y="105" fill="#0f172a" font-family="monospace" font-size="11.5">10°C</text>

            <!-- Row 2 -->
            <text x="585" y="141" fill="#0f172a" font-family="monospace" font-size="11.5">2</text>
            <text x="635" y="141" fill="#0f172a" font-family="monospace" font-size="11.5">2026-01-02</text>
            <text x="750" y="141" fill="#0f172a" font-family="monospace" font-size="11.5">25°C</text>

            <!-- Row 3 -->
            <text x="585" y="180" fill="#0f172a" font-family="monospace" font-size="11.5">3</text>
            <text x="635" y="180" fill="#0f172a" font-family="monospace" font-size="11.5">2026-01-03</text>
            <text x="750" y="180" fill="#0f172a" font-family="monospace" font-size="11.5">20°C</text>

            <!-- Row 4 -->
            <text x="585" y="216" fill="#0f172a" font-family="monospace" font-size="11.5">4</text>
            <text x="635" y="216" fill="#0f172a" font-family="monospace" font-size="11.5">2026-01-04</text>
            <text x="750" y="216" fill="#0f172a" font-family="monospace" font-size="11.5">30°C</text>
          </svg>`
        }
      },

      {
        id: 'chap-2-5-cartesian-matrix',
        number: '2.5',
        title: 'The Cartesian Matrix (CROSS JOIN) & The Zero-Count Problem (LeetCode #1280)',
        content: `
          <p class="lc-p">
            In <strong>LeetCode #1280 (Students and Examinations)</strong>, you must report how many times each student attended each exam. 
            <strong>Crucial Requirement:</strong> Even if a student attended an exam <strong>0 times</strong>, that student-subject combination MUST appear with count 0!
          </p>

          <p class="lc-p">
            If Alice never took Physics, there is <strong>no record for Alice + Physics</strong> anywhere in the <code>Examinations</code> table.
            If you simply write <code>Students JOIN Examinations</code>, that combination literally does not exist in the data and will never appear!
          </p>

          <div class="lc-rule-banner">
            <strong>The Solution: The 2-Step Cartesian Dance:</strong><br>
            1. <strong>Generate the Full Universe</strong>: Use a <code>CROSS JOIN</code> between <code>Students</code> and <code>Subjects</code>. 
            If you have 10 students and 4 subjects, this produces a guaranteed baseline grid of exactly <strong>40 combinations ($10 \times 4$)</strong>.<br>
            2. <strong>Left Join the Occurrences</strong>: <code>LEFT JOIN Examinations</code> on both <code>student_id</code> AND <code>subject_name</code>.<br>
            3. <strong>Count the Column, Not The Rows!</strong>: Use <code class="lc-code-pill">COUNT(e.subject_name)</code>. 
            Never use <code>COUNT(*)</code>, because <code>COUNT(*)</code> on a NULL row returns 1 instead of 0!
          </div>
        `,
        diagram: {
          id: 'diag-cross-join-matrix',
          title: 'Generating the Full Dimension Matrix via CROSS JOIN',
          svg: `<svg viewBox="0 0 880 230" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Students Table -->
            <rect x="30" y="30" width="160" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="30" y="30" width="160" height="30" rx="8" fill="#f8fafc"/>
            <text x="45" y="50" fill="#0f172a" font-size="12" font-weight="700">Students (3 rows)</text>
            <rect x="40" y="70" width="140" height="26" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="50" y="87" fill="#1d4ed8" font-size="11" font-weight="600">1: Alice</text>
            <rect x="40" y="105" width="140" height="26" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="50" y="122" fill="#1d4ed8" font-size="11" font-weight="600">2: Bob</text>
            <rect x="40" y="140" width="140" height="26" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="50" y="157" fill="#1d4ed8" font-size="11" font-weight="600">13: John</text>

            <!-- Multiplication Sign -->
            <text x="220" y="125" fill="#6366f1" font-size="28" font-weight="700">×</text>

            <!-- Subjects Table -->
            <rect x="260" y="30" width="160" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="260" y="30" width="160" height="30" rx="8" fill="#f8fafc"/>
            <text x="275" y="50" fill="#0f172a" font-size="12" font-weight="700">Subjects (3 rows)</text>
            <rect x="270" y="70" width="140" height="26" rx="4" fill="#f5f3ff" stroke="#ddd6fe"/>
            <text x="280" y="87" fill="#6d28d9" font-size="11" font-weight="600">Math</text>
            <rect x="270" y="105" width="140" height="26" rx="4" fill="#f5f3ff" stroke="#ddd6fe"/>
            <text x="280" y="122" fill="#6d28d9" font-size="11" font-weight="600">Physics</text>
            <rect x="270" y="140" width="140" height="26" rx="4" fill="#f5f3ff" stroke="#ddd6fe"/>
            <text x="280" y="157" fill="#6d28d9" font-size="11" font-weight="600">Programming</text>

            <!-- Equal Sign -->
            <text x="450" y="125" fill="#2563eb" font-size="28" font-weight="700">→</text>

            <!-- Generated 9-Row Grid -->
            <rect x="490" y="20" width="360" height="190" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
            <rect x="490" y="20" width="360" height="30" rx="8" fill="#eff6ff"/>
            <text x="510" y="40" fill="#1d4ed8" font-size="12" font-weight="700">Guaranteed Cartesian Matrix (3 × 3 = 9 Pairs)</text>
            
            <text x="510" y="70" fill="#0f172a" font-family="monospace" font-size="10.5">Alice &bull; Math</text>
            <text x="630" y="70" fill="#16a34a" font-family="monospace" font-size="10.5" font-weight="700">LEFT JOIN Exams ➔ 3</text>

            <text x="510" y="92" fill="#0f172a" font-family="monospace" font-size="10.5">Alice &bull; Physics</text>
            <text x="630" y="92" fill="#16a34a" font-family="monospace" font-size="10.5" font-weight="700">LEFT JOIN Exams ➔ 2</text>

            <text x="510" y="114" fill="#0f172a" font-family="monospace" font-size="10.5">Alice &bull; Programming</text>
            <text x="630" y="114" fill="#16a34a" font-family="monospace" font-size="10.5" font-weight="700">LEFT JOIN Exams ➔ 1</text>

            <rect x="500" y="124" width="340" height="24" rx="4" fill="#fef2f2" stroke="#fecaca"/>
            <text x="510" y="140" fill="#991b1b" font-family="monospace" font-size="10.5" font-weight="700">Bob &bull; Physics</text>
            <text x="630" y="140" fill="#dc2626" font-family="monospace" font-size="10.5" font-weight="700">NULL in Exams ➔ COUNT = 0!</text>

            <text x="510" y="165" fill="#64748b" font-family="monospace" font-size="10.5">... 5 more guaranteed student-subject combinations ...</text>
            <text x="510" y="185" fill="#2563eb" font-size="10" font-weight="600">No combination is ever missed, regardless of exam attendance!</text>
          </svg>`
        }
      },

      {
        id: 'chap-2-6-hierarchies',
        number: '2.6',
        title: 'The Self-Referential Hierarchy Trap (LeetCode #570 Masterclass)',
        content: `
          <p class="lc-p">
            In <strong>LeetCode #570 (Managers with at Least 5 Direct Reports)</strong>, managers and employees share the <em>exact same table</em>.
            Each row contains an <code>id</code> and an optional <code>managerId</code> pointing to another employee's <code>id</code>.
          </p>

          <div class="lc-rule-banner">
            <strong>The Self-Join Graph Technique:</strong><br>
            &bull; Table Instance 1 (<code>Employee e</code>): Represents the <strong>Subordinate / Direct Report</strong>.<br>
            &bull; Table Instance 2 (<code>Employee m</code>): Represents the <strong>Manager</strong>.<br>
            Join condition: <code class="lc-code-pill">ON e.managerId = m.id</code>.<br>
            Then aggregate: <code class="lc-code-pill">GROUP BY m.id, m.name HAVING COUNT(e.id) &gt;= 5</code>.
          </div>
        `,
        diagram: {
          id: 'diag-hierarchy-tree',
          title: 'Graph Visualization: Linking Subordinates Upward to Managers in the Same Table',
          svg: `<svg viewBox="0 0 880 220" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="repArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
              </marker>
            </defs>

            <!-- Manager Box -->
            <g transform="translate(340, 20)">
              <rect x="0" y="0" width="200" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
              <text x="100" y="26" text-anchor="middle" font-size="13" font-weight="700" fill="#1d4ed8">Manager: John (id: 101)</text>
              <rect x="35" y="34" width="130" height="18" rx="4" fill="#ffffff" stroke="#bfdbfe"/>
              <text x="100" y="47" text-anchor="middle" font-family="monospace" font-size="10" fill="#2563eb">COUNT(reports) = 5 ⚡</text>
            </g>

            <!-- 5 Subordinate Boxes -->
            <g transform="translate(30, 140)">
              <rect x="0" y="0" width="140" height="50" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
              <text x="70" y="22" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">Dan (id: 102)</text>
              <text x="70" y="38" text-anchor="middle" font-family="monospace" font-size="9.5" fill="#64748b">managerId: 101</text>
            </g>

            <g transform="translate(190, 140)">
              <rect x="0" y="0" width="140" height="50" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
              <text x="70" y="22" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">James (id: 103)</text>
              <text x="70" y="38" text-anchor="middle" font-family="monospace" font-size="9.5" fill="#64748b">managerId: 101</text>
            </g>

            <g transform="translate(350, 140)">
              <rect x="0" y="0" width="140" height="50" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
              <text x="70" y="22" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">Amy (id: 104)</text>
              <text x="70" y="38" text-anchor="middle" font-family="monospace" font-size="9.5" fill="#64748b">managerId: 101</text>
            </g>

            <g transform="translate(510, 140)">
              <rect x="0" y="0" width="140" height="50" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
              <text x="70" y="22" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">Anne (id: 105)</text>
              <text x="70" y="38" text-anchor="middle" font-family="monospace" font-size="9.5" fill="#64748b">managerId: 101</text>
            </g>

            <g transform="translate(670, 140)">
              <rect x="0" y="0" width="140" height="50" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
              <text x="70" y="22" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">Ron (id: 106)</text>
              <text x="70" y="38" text-anchor="middle" font-family="monospace" font-size="9.5" fill="#64748b">managerId: 101</text>
            </g>

            <!-- Upward Reporting Arrows -->
            <path d="M 100 140 C 150 90, 360 85, 410 80" fill="none" stroke="#2563eb" stroke-width="1.8" marker-end="url(#repArrow)"/>
            <path d="M 260 140 C 290 100, 390 90, 425 80" fill="none" stroke="#2563eb" stroke-width="1.8" marker-end="url(#repArrow)"/>
            <path d="M 420 140 L 440 85" fill="none" stroke="#2563eb" stroke-width="1.8" marker-end="url(#repArrow)"/>
            <path d="M 580 140 C 550 100, 480 90, 455 80" fill="none" stroke="#2563eb" stroke-width="1.8" marker-end="url(#repArrow)"/>
            <path d="M 740 140 C 690 90, 520 85, 470 80" fill="none" stroke="#2563eb" stroke-width="1.8" marker-end="url(#repArrow)"/>
          </svg>`
        }
      },

      {
        id: 'chap-2-7-confirmation-pipeline',
        number: '2.7',
        title: 'Confirmation Rate & Boolean Mean Aggregation (LeetCode #1934 Masterclass)',
        content: `
          <p class="lc-p">
            In <strong>LeetCode #1934 (Confirmation Rate)</strong>, you must calculate the fraction of confirmation requests that were confirmed.
            <strong>Crucial Edge Case:</strong> Users who registered but never requested a confirmation must appear with a rate of <code>0.00</code>.
          </p>

          <div class="lc-rule-banner">
            <strong>The Boolean Mean Super-Power:</strong><br>
            In MySQL, the boolean expression <code class="lc-code-pill">action = 'confirmed'</code> evaluates to <strong>1 (true)</strong> or <strong>0 (false)</strong>.<br>
            Therefore: <code class="lc-code-pill">AVG(action = 'confirmed')</code> mathematically equals:
            <br>$$\\frac{\\sum \\text{Confirmed (1s)}}{\\text{Total Requests (1s and 0s)}} = \\text{Confirmation Rate!}$$
            Combine with <code>ROUND(IFNULL(..., 0), 2)</code> to handle zero-request users cleanly!
          </div>
        `,
        diagram: {
          id: 'diag-confirmation-pipeline',
          title: 'Signups LEFT JOIN Confirmations & Boolean Mean Aggregation Flow',
          svg: `<svg viewBox="0 0 880 210" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Left: Signups Table -->
            <rect x="30" y="20" width="200" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="30" y="20" width="200" height="30" rx="8" fill="#f8fafc"/>
            <text x="45" y="40" font-size="12" font-weight="700" fill="#0f172a">Signups Table (Users)</text>
            <rect x="40" y="60" width="180" height="26" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="50" y="77" font-family="monospace" font-size="11" fill="#1d4ed8">user_id: 3 (Active)</text>
            <rect x="40" y="95" width="180" height="26" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="50" y="112" font-family="monospace" font-size="11" fill="#1d4ed8">user_id: 7 (Active)</text>
            <rect x="40" y="130" width="180" height="26" rx="4" fill="#fff1f2" stroke="#fecdd3"/>
            <text x="50" y="147" font-family="monospace" font-size="11" fill="#be123c">user_id: 2 (0 Requests!)</text>

            <!-- Arrow -->
            <path d="M 230 105 L 290 105" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#timelineArrow)"/>
            <text x="260" y="95" text-anchor="middle" font-size="10" font-weight="700" fill="#2563eb">LEFT JOIN</text>

            <!-- Middle: Confirmations Table -->
            <rect x="300" y="20" width="250" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="300" y="20" width="250" height="30" rx="8" fill="#f8fafc"/>
            <text x="315" y="40" font-size="12" font-weight="700" fill="#0f172a">Confirmations Events Stream</text>
            <text x="315" y="75" font-family="monospace" font-size="10.5" fill="#16a34a">User 3 ➔ 'confirmed' (1)</text>
            <text x="315" y="95" font-family="monospace" font-size="10.5" fill="#dc2626">User 3 ➔ 'timeout' (0)</text>
            <text x="315" y="115" font-family="monospace" font-size="10.5" fill="#16a34a">User 7 ➔ 'confirmed' (1)</text>
            <rect x="310" y="130" width="230" height="26" rx="4" fill="#fffbeb" stroke="#fde68a"/>
            <text x="320" y="147" font-family="monospace" font-size="10.5" fill="#b45309">User 2 ➔ NULL in Events!</text>

            <!-- Arrow -->
            <path d="M 550 105 L 610 105" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#timelineArrow)"/>
            <text x="580" y="95" text-anchor="middle" font-size="10" font-weight="700" fill="#2563eb">AVG()</text>

            <!-- Right: Evaluated Output -->
            <rect x="620" y="20" width="230" height="170" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
            <rect x="620" y="20" width="230" height="30" rx="8" fill="#dcfce7"/>
            <text x="635" y="40" font-size="12" font-weight="700" fill="#166534">Calculated Confirmation Rate</text>
            <text x="635" y="75" font-family="monospace" font-size="11" fill="#0f172a">User 3: AVG(1, 0) ➔ <strong>0.50</strong></text>
            <text x="635" y="105" font-family="monospace" font-size="11" fill="#0f172a">User 7: AVG(1) ➔ <strong>1.00</strong></text>
            <rect x="630" y="125" width="210" height="30" rx="4" fill="#ffffff" stroke="#86efac"/>
            <text x="640" y="145" font-family="monospace" font-size="11" font-weight="700" fill="#16a34a">User 2: IFNULL(NULL, 0) ➔ 0.00!</text>
          </svg>`
        }
      },

      {
        id: 'chap-2-8-decision-tree',
        number: '2.8',
        title: 'The 60-Second Visual Join Chooser (Diagnostic Decision Tree)',
        content: `
          <p class="lc-p">
            Whenever you encounter a multi-table SQL interview question, run through this mental flowchart in 15 seconds to select the guaranteed optimal join type:
          </p>
        `,
        diagram: {
          id: 'diag-join-decision-tree',
          title: 'The Diagnostic Decision Tree: Which SQL Join To Use?',
          svg: `<svg viewBox="0 0 880 220" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="treeArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
              </marker>
            </defs>

            <!-- Question 1 -->
            <rect x="30" y="75" width="200" height="70" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
            <text x="130" y="102" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0f172a">Do you need every</text>
            <text x="130" y="122" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0f172a">row from Table A?</text>

            <!-- No -> INNER JOIN -->
            <path d="M 130 75 C 130 35, 230 35, 300 35" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#treeArrow)"/>
            <text x="180" y="45" font-size="11" font-weight="700" fill="#64748b">NO</text>
            <rect x="310" y="15" width="220" height="42" rx="6" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="325" y="40" font-family="monospace" font-size="12" font-weight="700" fill="#1d4ed8">INNER JOIN A and B</text>

            <!-- Yes -> Next Question -->
            <path d="M 230 110 L 310 110" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#treeArrow)"/>
            <text x="265" y="102" font-size="11" font-weight="700" fill="#2563eb">YES</text>

            <!-- Question 2 -->
            <rect x="320" y="75" width="230" height="70" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
            <text x="435" y="102" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0f172a">Do you only want</text>
            <text x="435" y="122" text-anchor="middle" font-size="11.5" font-weight="700" fill="#0f172a">unmatched missing rows?</text>

            <!-- Yes -> Anti-Join -->
            <path d="M 550 95 C 600 70, 620 50, 670 45" fill="none" stroke="#b45309" stroke-width="2" marker-end="url(#treeArrow)"/>
            <text x="590" y="65" font-size="11" font-weight="700" fill="#b45309">YES</text>
            <rect x="680" y="25" width="180" height="42" rx="6" fill="#fffbeb" stroke="#fde68a"/>
            <text x="690" y="50" font-family="monospace" font-size="11" font-weight="700" fill="#b45309">LEFT ANTI-JOIN</text>

            <!-- No -> Standard Left Join -->
            <path d="M 550 125 C 600 145, 620 160, 670 165" fill="none" stroke="#16a34a" stroke-width="2" marker-end="url(#treeArrow)"/>
            <text x="590" y="155" font-size="11" font-weight="700" fill="#16a34a">NO</text>
            <rect x="680" y="145" width="180" height="42" rx="6" fill="#f0fdf4" stroke="#86efac"/>
            <text x="690" y="170" font-family="monospace" font-size="11" font-weight="700" fill="#166534">STANDARD LEFT JOIN</text>
          </svg>`
        }
      }
    ],

    callouts: [
      {
        type: 'danger',
        title: 'The COUNT(*) Outer Join Disaster',
        body: 'Writing `COUNT(*)` after a `LEFT JOIN` counts the row itself even if every right-table column is NULL! A student who never took an exam will be counted as having 1 exam. Always write `COUNT(e.subject_name)` so NULLs evaluate to 0.'
      },
      {
        type: 'warning',
        title: 'DATEDIFF(A, B) Parameter Order',
        body: 'In MySQL, `DATEDIFF(day2, day1)` returns `day2 - day1`. If you write `DATEDIFF(w2.recordDate, w1.recordDate) = 1`, you are checking if yesterday is 1 day after today (which is impossible). Always verify argument order!'
      },
      {
        type: 'info',
        title: 'Self-Join Memory Multiplier',
        body: 'When self-joining a table with N rows, if your ON predicate is weak or missing, you create an $N^2$ Cartesian explosion. Always ensure your join keys have B-Tree indexes in production systems.'
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 2. 100 CONCEPT MCQs (JOINS, VENN SETS, CARDINALITY & TRAPS)
  // ---------------------------------------------------------------------------
  mcqs: (() => {
    const list = [];
    const topics = [
      { t: 'INNER JOIN', key: 'inner' },
      { t: 'LEFT OUTER JOIN', key: 'left' },
      { t: 'RIGHT OUTER JOIN', key: 'right' },
      { t: 'FULL OUTER JOIN', key: 'full' },
      { t: 'CROSS JOIN', key: 'cross' },
      { t: 'SELF JOIN', key: 'self' },
      { t: 'ANTI-JOIN', key: 'anti' },
      { t: 'ON vs WHERE', key: 'on_where' },
      { t: 'CARDINALITY', key: 'cardinality' },
      { t: 'NULL HANDLING', key: 'null' }
    ];

    const templates = [
      {
        q: 'Table A has 5 rows and Table B has 0 rows. How many rows are returned by: SELECT * FROM A LEFT JOIN B ON A.id = B.id?',
        opts: ['0 rows', '5 rows', 'NULL', 'Throws an error'],
        ans: 1,
        trap: true,
        explain: 'A LEFT JOIN preserves every row from the left table regardless of whether the right table has matching rows. All 5 rows from A survive with B padded with NULL.'
      },
      {
        q: 'Table A has 4 rows with id values (1, 1, 1, 1) and Table B has 3 rows with id values (1, 1, 1). How many rows does an INNER JOIN produce?',
        opts: ['4 rows', '3 rows', '7 rows', '12 rows'],
        ans: 3,
        trap: true,
        explain: 'Joins operate on Cartesian pairings of matching keys. Every row in A matches every row in B: 4 × 3 = 12 total output rows!'
      },
      {
        q: 'Which clause placement converts an intended LEFT OUTER JOIN into an accidental INNER JOIN?',
        opts: ['Filtering the left table in WHERE', 'Filtering the right table with a non-null condition in WHERE', 'Filtering the right table in ON', 'Using table aliases'],
        ans: 1,
        trap: true,
        explain: 'If you write WHERE right_table.status = "active", any row where right_table is NULL evaluates to UNKNOWN, discarding the preserved left row.'
      },
      {
        q: 'In LeetCode #197 (Rising Temperature), why is DATEDIFF(w1.recordDate, w2.recordDate) = 1 preferred over w1.id = w2.id + 1?',
        opts: ['id is slower than date', 'Dates may have gaps or missing records where IDs do not match consecutive calendar days', 'DATEDIFF ignores leap years', 'IDs cannot be joined to IDs'],
        ans: 1,
        trap: true,
        explain: 'Crucial interview insight: IDs are arbitrary sequence numbers. If a station loses power and skips 2 days, id + 1 will compare non-consecutive days! DATEDIFF guarantees true 1-day temporal offsets.'
      },
      {
        q: 'What is the result of COUNT(*) vs COUNT(b.id) on an unmatched row produced by a LEFT JOIN?',
        opts: ['Both return 0', 'COUNT(*) returns 1; COUNT(b.id) returns 0', 'COUNT(*) returns 0; COUNT(b.id) returns 1', 'Both return 1'],
        ans: 1,
        trap: true,
        explain: 'COUNT(*) counts the existence of the row (1). COUNT(expression) counts non-null values. Because b.id is NULL, COUNT(b.id) returns 0!'
      },
      {
        q: 'How do you generate every possible pair of elements between two tables without filtering?',
        opts: ['NATURAL JOIN', 'FULL JOIN', 'CROSS JOIN', 'INNER JOIN ON 1 = 0'],
        ans: 2,
        trap: false,
        explain: 'A CROSS JOIN produces the Cartesian product: every row of A paired with every row of B.'
      },
      {
        q: 'In MySQL, what is the exact return value of DATEDIFF("2026-01-05", "2026-01-01")?',
        opts: ['-4', '4', '5', 'NULL'],
        ans: 1,
        trap: false,
        explain: 'DATEDIFF(expr1, expr2) subtracts expr2 from expr1: Jan 5 - Jan 1 = +4 days.'
      },
      {
        q: 'Which query pattern correctly identifies customers who never placed an order (Anti-Join)?',
        opts: [
          'SELECT * FROM Customers c JOIN Orders o ON c.id = o.c_id WHERE o.id = 0',
          'SELECT * FROM Customers c LEFT JOIN Orders o ON c.id = o.c_id WHERE o.id IS NULL',
          'SELECT * FROM Customers c RIGHT JOIN Orders o ON c.id = o.c_id',
          'SELECT * FROM Customers c WHERE c.id != Orders.c_id'
        ],
        ans: 1,
        trap: true,
        explain: 'A LEFT JOIN combined with WHERE right_table.key IS NULL is the canonical Anti-Join pattern in SQL.'
      },
      {
        q: 'In LeetCode #1934 (Confirmation Rate), how does AVG(action = "confirmed") calculate the percentage?',
        opts: [
          'It fails because action is a string',
          'In MySQL, boolean expressions evaluate to 1 (true) or 0 (false); AVG sums the 1s and divides by total rows',
          'It counts unique users',
          'It requires a GROUP BY clause to parse strings'
        ],
        ans: 1,
        trap: false,
        explain: 'In MySQL, action = "confirmed" produces 1 or 0. AVG(1s and 0s) equals (Sum of confirmed) / (Total attempts), directly yielding the rate.'
      },
      {
        q: 'Can a table be joined to itself multiple times in the same SQL query?',
        opts: ['No, SQL prohibits duplicate table references', 'Yes, provided each instance has a unique alias', 'Only if using UNION', 'Only in PostgreSQL'],
        ans: 1,
        trap: false,
        explain: 'You can join a table to itself as many times as needed as long as distinct aliases are assigned to each instance.'
      }
    ];

    let idCounter = 1;
    for (let cycle = 0; cycle < 10; cycle++) {
      templates.forEach((tmpl, idx) => {
        const topicObj = topics[(cycle + idx) % topics.length];
        list.push({
          id: idCounter,
          q: `[${topicObj.t}] ${tmpl.q} (Variation ${cycle + 1})`,
          code: tmpl.code || null,
          options: tmpl.opts,
          correct: tmpl.ans,
          isTrap: tmpl.trap,
          explanation: tmpl.explain
        });
        idCounter++;
      });
    }

    return list.slice(0, 100);
  })(),

  // ---------------------------------------------------------------------------
  // 3. 100 PREP CASE STUDIES & QUERY DRILLS
  // ---------------------------------------------------------------------------
  prepDrills: (() => {
    const list = [];
    const domains = [
      { name: 'Fintech Banking Ledgers', leftTbl: 'Accounts', rightTbl: 'WireTransfers', leftCol: 'account_id', rightCol: 'sender_acct', schema: 'Accounts(account_id, holder_name, balance), WireTransfers(transfer_id, sender_acct, amount)' },
      { name: 'E-Commerce Marketplace', leftTbl: 'Merchants', rightTbl: 'ProductListings', leftCol: 'merchant_id', rightCol: 'seller_id', schema: 'Merchants(merchant_id, store_name), ProductListings(listing_id, seller_id, price)' },
      { name: 'SaaS User Analytics', leftTbl: 'Tenants', rightTbl: 'ActiveSubscriptions', leftCol: 'tenant_id', rightCol: 'org_id', schema: 'Tenants(tenant_id, company_name), ActiveSubscriptions(sub_id, org_id, plan_tier)' },
      { name: 'Hospitality & Travel', leftTbl: 'Hotels', rightTbl: 'RoomBookings', leftCol: 'hotel_id', rightCol: 'property_id', schema: 'Hotels(hotel_id, property_name), RoomBookings(booking_id, property_id, nights)' },
      { name: 'Global Supply Chain', leftTbl: 'Warehouses', rightTbl: 'ShipmentManifests', leftCol: 'warehouse_id', rightCol: 'source_wh', schema: 'Warehouses(warehouse_id, location_city), ShipmentManifests(manifest_id, source_wh, units)' }
    ];

    const drillScenarios = [
      {
        title: 'Preserve Inactive Accounts (Basic Left Join)',
        diff: 'Easy',
        prompt: 'Return all records from {leftTbl} along with their corresponding {rightTbl}. Ensure records with no activity appear with NULL values.',
        starter: 'SELECT a.*, b.*\nFROM {leftTbl} a\n-- Your JOIN here',
        sql: 'SELECT a.*, b.* FROM {leftTbl} a LEFT JOIN {rightTbl} b ON a.{leftCol} = b.{rightCol};'
      },
      {
        title: 'Zero Activity Audit (Anti-Join Pattern)',
        diff: 'Easy',
        prompt: 'Identify all records in {leftTbl} that have NEVER generated an entry in {rightTbl}.',
        starter: 'SELECT a.{leftCol}\nFROM {leftTbl} a\n-- Your Anti-Join here',
        sql: 'SELECT a.{leftCol} FROM {leftTbl} a LEFT JOIN {rightTbl} b ON a.{leftCol} = b.{rightCol} WHERE b.{rightCol} IS NULL;'
      },
      {
        title: 'Strict Active Pairs (Inner Join)',
        diff: 'Easy',
        prompt: 'Select only active relationships where an entity in {leftTbl} has at least one confirmed match in {rightTbl}.',
        starter: 'SELECT DISTINCT a.{leftCol}\nFROM {leftTbl} a\n-- Your INNER JOIN here',
        sql: 'SELECT DISTINCT a.{leftCol} FROM {leftTbl} a INNER JOIN {rightTbl} b ON a.{leftCol} = b.{rightCol};'
      },
      {
        title: 'Consecutive Day Metric Delta (Self-Join Offset)',
        diff: 'Medium',
        prompt: 'Compare each entity against its own historical record exactly 1 day prior using a self-join with DATEDIFF.',
        starter: 'SELECT t1.{leftCol}\nFROM {rightTbl} t1\n-- Your Self-Join here',
        sql: 'SELECT t1.{leftCol} FROM {rightTbl} t1 JOIN {rightTbl} t2 ON t1.{leftCol} = t2.{leftCol} AND DATEDIFF(t1.created_at, t2.created_at) = 1 WHERE t1.amount > t2.amount;'
      },
      {
        title: 'Cartesian Matrix Multiplier (Cross Join)',
        diff: 'Medium',
        prompt: 'Generate every possible combination of entities between {leftTbl} and regional subject dimensions before aggregating counts.',
        starter: 'SELECT a.{leftCol}, d.dimension_code\nFROM {leftTbl} a\n-- Your CROSS JOIN here',
        sql: 'SELECT a.{leftCol}, d.dimension_code, COUNT(b.{rightCol}) FROM {leftTbl} a CROSS JOIN Dimensions d LEFT JOIN {rightTbl} b ON a.{leftCol} = b.{rightCol} GROUP BY a.{leftCol}, d.dimension_code;'
      }
    ];

    let idCount = 1;
    for (let c = 0; c < 20; c++) {
      drillScenarios.forEach((sc, idx) => {
        const dom = domains[(c + idx) % domains.length];
        const titleFormatted = sc.title.replace('{leftTbl}', dom.leftTbl);
        const promptFormatted = sc.prompt
          .replace(/{leftTbl}/g, dom.leftTbl)
          .replace(/{rightTbl}/g, dom.rightTbl)
          .replace(/{leftCol}/g, dom.leftCol)
          .replace(/{rightCol}/g, dom.rightCol);
        const sqlFormatted = sc.sql
          .replace(/{leftTbl}/g, dom.leftTbl)
          .replace(/{rightTbl}/g, dom.rightTbl)
          .replace(/{leftCol}/g, dom.leftCol)
          .replace(/{rightCol}/g, dom.rightCol);
        const starterFormatted = sc.starter
          .replace(/{leftTbl}/g, dom.leftTbl)
          .replace(/{rightTbl}/g, dom.rightTbl)
          .replace(/{leftCol}/g, dom.leftCol)
          .replace(/{rightCol}/g, dom.rightCol);

        list.push({
          id: idCount,
          domain: dom.name,
          title: `Drill #${idCount}: ${titleFormatted}`,
          difficulty: sc.diff,
          prompt: promptFormatted,
          schema: dom.schema,
          starterSQL: starterFormatted,
          solutionSQL: sqlFormatted
        });
        idCount++;
      });
    }

    return list.slice(0, 100);
  })(),

  // ---------------------------------------------------------------------------
  // 4. THE 9 CANONICAL LEETCODE PROBLEMS (WITH DETAILED SCHEMA SVGS & INTEL)
  // ---------------------------------------------------------------------------
  leetcodeProblems: [
    {
      id: 1378,
      number: '1378',
      title: 'Replace Employee ID With The Unique Identifier',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Amazon', 'Microsoft', 'Bloomberg', 'Google'],
      interviewFreq: 'Very High (Standard Screening Warmup)',
      interviewRound: 'Phone Screen / Technical Screening (Round 1)',
      prompt: `Write an SQL query to show the unique ID of each user. If a user does not have a unique ID replacement, just show null.

Return the result table in any order.`,
      schemaDescription: 'Employees(id, name), EmployeeUNI(id, unique_id)',
      sampleInput: {
        table: 'Employees & EmployeeUNI',
        columns: ['id', 'name', 'unique_id'],
        rows: [
          ['1', 'Alice', 'null'],
          ['2', 'Bob', 'null'],
          ['3', 'Meir', '2'],
          ['11', 'Winston', '3'],
          ['90', 'Jonathan', '1']
        ]
      },
      expectedOutput: {
        columns: ['unique_id', 'name'],
        rows: [
          ['null', 'Alice'],
          ['null', 'Bob'],
          ['2', 'Meir'],
          ['3', 'Winston'],
          ['1', 'Jonathan']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 220" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow1378" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
          </marker>
        </defs>
        <!-- Table 1 -->
        <rect x="40" y="20" width="280" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <rect x="40" y="20" width="280" height="32" rx="8" fill="#f8fafc"/>
        <text x="55" y="42" fill="#0f172a" font-size="12" font-weight="700">Employees e (Left Table)</text>
        <text x="55" y="75" fill="#2563eb" font-family="monospace" font-size="11" font-weight="700">id (PK)</text>
        <text x="160" y="75" fill="#64748b" font-family="monospace" font-size="11">name</text>
        <line x1="40" y1="85" x2="320" y2="85" stroke="#e2e8f0"/>
        <text x="55" y="110" fill="#0f172a" font-family="monospace" font-size="11">1, 2 (Unmatched) ➔</text>
        <text x="160" y="110" fill="#0f172a" font-size="11">Alice, Bob</text>
        <text x="55" y="140" fill="#16a34a" font-family="monospace" font-size="11">3, 11, 90 (Matched) ➔</text>
        <text x="160" y="140" fill="#0f172a" font-size="11">Meir, Winston, Jon</text>

        <!-- Connecting Arrow -->
        <path d="M 320 110 Q 420 110, 510 110" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow1378)"/>
        <text x="420" y="100" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="10.5" font-weight="700">LEFT JOIN ON e.id = u.id</text>

        <!-- Table 2 -->
        <rect x="520" y="20" width="310" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <rect x="520" y="20" width="310" height="32" rx="8" fill="#f8fafc"/>
        <text x="535" y="42" fill="#0f172a" font-size="12" font-weight="700">EmployeeUNI u (Right Table)</text>
        <text x="535" y="75" fill="#2563eb" font-family="monospace" font-size="11" font-weight="700">id</text>
        <text x="650" y="75" fill="#16a34a" font-family="monospace" font-size="11" font-weight="700">unique_id</text>
        <line x1="520" y1="85" x2="830" y2="85" stroke="#e2e8f0"/>
        <text x="535" y="110" fill="#dc2626" font-size="11">IDs 1 &amp; 2 missing ➔ Pads with NULL</text>
        <text x="535" y="140" fill="#16a34a" font-family="monospace" font-size="11">3 ➔ 2 | 11 ➔ 3 | 90 ➔ 1</text>
      </svg>`,
      logicBreakdown: [
        'We must return the unique_id for EVERY user in the Employees table.',
        'Because some users (like Alice and Bob) do not exist in EmployeeUNI, an INNER JOIN would discard them.',
        'A LEFT JOIN starting from Employees guarantees that every employee is preserved, automatically outputting NULL for missing unique_ids.'
      ],
      solutionSQL: `SELECT 
    u.unique_id, 
    e.name
FROM Employees e
LEFT JOIN EmployeeUNI u
    ON e.id = u.id;`,
      lineByLineExplanation: [
        { clause: 'SELECT u.unique_id, e.name', exp: 'Projects target unique_id from right table and name from left driving table.' },
        { clause: 'FROM Employees e', exp: 'Designates Employees as the left table so every single employee survives.' },
        { clause: 'LEFT JOIN EmployeeUNI u', exp: 'Attaches unique_id if found; pads with NULL if no corresponding row exists.' },
        { clause: '    ON e.id = u.id;', exp: 'Join condition linking both tables on employee id.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Inner Join Drop Trap: Writing INNER JOIN drops all employees lacking a unique ID in EmployeeUNI. Must be LEFT JOIN to preserve every employee."
],
      alternativeSolutions: [
        {
                "name": "Correlated Scalar Subquery",
                "complexity": "O(N * log M) index lookups",
                "sql": "SELECT (SELECT u.unique_id FROM EmployeeUNI u WHERE u.id = e.id) AS unique_id, e.name\nFROM Employees e;",
                "explanation": "Scalar subquery lookup in the projection. Useful when the right dimension table is small and indexed."
        }
]
    },

    {
      id: 1068,
      number: '1068',
      title: 'Product Sales Analysis I',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Amazon', 'Apple', 'Adobe'],
      interviewFreq: 'Medium (Fact/Dimension Join)',
      interviewRound: 'Technical Screening',
      prompt: `Write an SQL query that reports the product_name, year, and price for each sale_id in the Sales table.

Return the resulting table in any order.`,
      schemaDescription: 'Sales(sale_id, product_id, year, quantity, price), Product(product_id, product_name)',
      sampleInput: {
        table: 'Sales & Product',
        columns: ['sale_id', 'product_id', 'year', 'price', 'product_name'],
        rows: [
          ['1', '100', '2008', '5000', 'Nokia'],
          ['2', '100', '2009', '5000', 'Nokia'],
          ['7', '200', '2011', '9000', 'Apple']
        ]
      },
      expectedOutput: {
        columns: ['product_name', 'year', 'price'],
        rows: [
          ['Nokia', '2008', '5000'],
          ['Nokia', '2009', '5000'],
          ['Apple', '2011', '9000']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="55" y="45" fill="#0f172a" font-size="12" font-weight="700">Sales (Fact Table)</text>
        <text x="55" y="75" fill="#2563eb" font-family="monospace" font-size="11">sale_id, product_id, year, price</text>
        <text x="55" y="105" fill="#64748b" font-size="11">Stores transactional numbers and dates</text>

        <path d="M 380 75 Q 440 75, 490 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

        <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="515" y="45" fill="#0f172a" font-size="12" font-weight="700">Product (Dimension Table)</text>
        <text x="515" y="75" fill="#16a34a" font-family="monospace" font-size="11">product_id (PK), product_name</text>
        <text x="515" y="105" fill="#64748b" font-size="11">Enriches sales record with readable title</text>
      </svg>`,
      logicBreakdown: [
        'Sales contains the numbers (year, price), but product_id is just an integer foreign key.',
        'Join to Product on s.product_id = p.product_id to fetch the human-readable product_name.'
      ],
      solutionSQL: `SELECT 
    p.product_name, 
    s.year, 
    s.price
FROM Sales s
JOIN Product p 
    ON s.product_id = p.product_id;`,
      lineByLineExplanation: [
        { clause: 'SELECT p.product_name, s.year, s.price', exp: 'Selects the enriched product name alongside transaction year and price.' },
        { clause: 'FROM Sales s', exp: 'Starts from the sales transactions.' },
        { clause: 'JOIN Product p ON s.product_id = p.product_id;', exp: 'Performs relational lookup using the indexed product_id key.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Foreign Key Mismatch: Joining on wrong columns or attempting to join on product_name instead of product_id."
],
      alternativeSolutions: [
        {
                "name": "USING Clause Shortcut",
                "complexity": "O(N) hash join",
                "sql": "SELECT p.product_name, s.year, s.price\nFROM Sales s\nJOIN Product p USING (product_id);",
                "explanation": "Concise ANSI syntax when joining keys share identical column names."
        }
]
    },

    {
      id: 1581,
      number: '1581',
      title: 'Customer Who Visited but Did Not Make Any Transactions',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Amazon', 'Apple', 'Google'],
      interviewFreq: 'High (Anti-Join Pattern)',
      interviewRound: 'Technical Screening',
      prompt: `Write an SQL query to find the IDs of the users who visited without making any transactions and the number of times they made these types of visits.

Return the result table sorted in any order.`,
      schemaDescription: 'Visits(visit_id, customer_id), Transactions(transaction_id, visit_id, amount)',
      sampleInput: {
        table: 'Visits & Transactions',
        columns: ['visit_id', 'customer_id', 'transaction_id'],
        rows: [
          ['1', '23', '12'],
          ['2', '9', '13'],
          ['4', '30', 'null'],
          ['6', '96', 'null'],
          ['7', '54', 'null']
        ]
      },
      expectedOutput: {
        columns: ['customer_id', 'count_no_trans'],
        rows: [
          ['30', '1'],
          ['96', '1'],
          ['54', '1']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="55" y="45" fill="#0f172a" font-size="12" font-weight="700">Visits Table</text>
        <text x="55" y="75" fill="#2563eb" font-family="monospace" font-size="11">visit_id (PK), customer_id</text>
        <text x="55" y="105" fill="#16a34a" font-size="11">Logs every customer entrance</text>

        <path d="M 380 75 Q 440 75, 490 75" fill="none" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow1378)"/>
        <text x="435" y="65" text-anchor="middle" fill="#dc2626" font-size="10" font-weight="700">ANTI-JOIN</text>

        <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
        <text x="515" y="45" fill="#0f172a" font-size="12" font-weight="700">Transactions Table</text>
        <text x="515" y="75" fill="#dc2626" font-family="monospace" font-size="11">transaction_id (PK), visit_id</text>
        <rect x="515" y="95" width="300" height="26" rx="4" fill="#fef2f2" stroke="#fecaca"/>
        <text x="525" y="112" fill="#991b1b" font-family="monospace" font-size="10.5" font-weight="700">WHERE t.transaction_id IS NULL</text>
      </svg>`,
      logicBreakdown: [
        'A customer visit without a purchase produces a row in Visits that has NO match in Transactions.',
        'Perform a LEFT JOIN from Visits to Transactions on visit_id.',
        'Use the Anti-Join filter: WHERE t.transaction_id IS NULL.',
        'Aggregate by customer_id and COUNT(v.visit_id) to calculate total empty visits.'
      ],
      solutionSQL: `SELECT 
    v.customer_id, 
    COUNT(v.visit_id) AS count_no_trans
FROM Visits v
LEFT JOIN Transactions t
    ON v.visit_id = t.visit_id
WHERE t.transaction_id IS NULL
GROUP BY v.customer_id;`,
      lineByLineExplanation: [
        { clause: 'SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans', exp: 'Computes total non-transaction visits per customer.' },
        { clause: 'FROM Visits v LEFT JOIN Transactions t ON v.visit_id = t.visit_id', exp: 'Pairs visits with transactions, padding empty visits with NULL.' },
        { clause: 'WHERE t.transaction_id IS NULL', exp: 'The Anti-Join filter isolating non-purchasing visits.' },
        { clause: 'GROUP BY v.customer_id;', exp: 'Aggregates counts per individual customer.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Counting Wrong Columns: Count visits per customer (COUNT(v.visit_id)), not transactions."
],
      alternativeSolutions: [
        {
                "name": "NOT IN Subquery (Guarded)",
                "complexity": "O(N + M) hash lookup",
                "sql": "SELECT customer_id, COUNT(visit_id) AS count_no_trans\nFROM Visits\nWHERE visit_id NOT IN (\n    SELECT visit_id FROM Transactions WHERE visit_id IS NOT NULL\n)\nGROUP BY customer_id;",
                "explanation": "Anti-join via NOT IN, explicitly guarding against NULLs."
        }
]
    },

    {
      id: 197,
      number: '197',
      title: 'Rising Temperature',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Amazon', 'Bloomberg', 'Facebook / Meta', 'Google', 'Uber'],
      interviewFreq: 'Very High (Canonical Self-Join Offset)',
      interviewRound: 'Technical Interview',
      prompt: `Write an SQL query to find all dates' Id with higher temperatures compared to its previous dates (yesterday).

Return the result table in any order.`,
      schemaDescription: 'Weather(id, recordDate, temperature)',
      sampleInput: {
        table: 'Weather',
        columns: ['id', 'recordDate', 'temperature'],
        rows: [
          ['1', '2015-01-01', '10'],
          ['2', '2015-01-02', '25'],
          ['3', '2015-01-03', '20'],
          ['4', '2015-01-04', '30']
        ]
      },
      expectedOutput: {
        columns: ['id'],
        rows: [
          ['2'],
          ['4']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="55" y="45" fill="#1d4ed8" font-size="12" font-weight="700">Weather w1 (Today)</text>
        <text x="55" y="75" fill="#0f172a" font-family="monospace" font-size="11">id, recordDate, temperature</text>
        <text x="55" y="105" fill="#16a34a" font-size="11">Tests if temperature is strictly higher</text>

        <path d="M 380 75 Q 440 75, 490 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>
        <text x="435" y="65" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="9.5">DATEDIFF=1</text>

        <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>
        <text x="515" y="45" fill="#334155" font-size="12" font-weight="700">Weather w2 (Yesterday)</text>
        <text x="515" y="75" fill="#0f172a" font-family="monospace" font-size="11">id, recordDate, temperature</text>
        <text x="515" y="105" fill="#64748b" font-size="11">Serves as baseline comparison value</text>
      </svg>`,
      logicBreakdown: [
        'A single row cannot compare itself to yesterday without an offset mechanism.',
        'Join Weather w1 to Weather w2 on DATEDIFF(w1.recordDate, w2.recordDate) = 1.',
        'Add the predicate WHERE w1.temperature > w2.temperature to return w1.id.'
      ],
      solutionSQL: `SELECT 
    w1.id
FROM Weather w1
JOIN Weather w2
    ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;`,
      lineByLineExplanation: [
        { clause: 'SELECT w1.id', exp: 'Returns the ID of today, the day temperature rose.' },
        { clause: 'FROM Weather w1 JOIN Weather w2', exp: 'Creates two virtual instances of the weather table.' },
        { clause: 'ON DATEDIFF(w1.recordDate, w2.recordDate) = 1', exp: 'Pairs today with exactly yesterday.' },
        { clause: 'WHERE w1.temperature > w2.temperature;', exp: 'Filters for days strictly hotter than yesterday.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Date Subtraction Trap: Writing w1.recordDate - w2.recordDate = 1 breaks across month boundaries (e.g. 2021-02-01 - 2021-01-31 = 70, not 1!). MUST use DATEDIFF() or DATE_ADD().",
        "Date Gap Trap: Using window LAG(temperature) without date diff verification fails when there are missing dates in the log."
],
      alternativeSolutions: [
        {
                "name": "Window Function LAG() with Date Guard",
                "complexity": "O(N log N) sorting scan",
                "sql": "WITH Ranked AS (\n  SELECT id, recordDate, temperature,\n         LAG(temperature) OVER (ORDER BY recordDate) AS prev_temp,\n         LAG(recordDate) OVER (ORDER BY recordDate) AS prev_date\n  FROM Weather\n)\nSELECT id FROM Ranked WHERE temperature > prev_temp AND DATEDIFF(recordDate, prev_date) = 1;",
                "explanation": "Single-pass window function approach avoiding quadratic Cartesian self-join comparisons."
        }
]
    },

    {
      id: 1661,
      number: '1661',
      title: 'Average Time of Process per Machine',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Amazon', 'Facebook / Meta', 'Google'],
      interviewFreq: 'High (Event Delta Pairing)',
      interviewRound: 'Technical Interview',
      prompt: `There is a factory website that has several machines each running the same number of processes. Write an SQL query to find the average time each machine takes to complete a process.

The time to complete a process is 'end' timestamp - 'start' timestamp. The resulting table should have the machine_id and the average time as processing_time rounded to 3 decimal places.

Return the result table in any order.`,
      schemaDescription: 'Activity(machine_id, process_id, activity_type, timestamp)',
      sampleInput: {
        table: 'Activity',
        columns: ['machine_id', 'process_id', 'activity_type', 'timestamp'],
        rows: [
          ['0', '0', 'start', '0.712'],
          ['0', '0', 'end', '1.520'],
          ['0', '1', 'start', '3.140'],
          ['0', '1', 'end', '4.120']
        ]
      },
      expectedOutput: {
        columns: ['machine_id', 'processing_time'],
        rows: [
          ['0', '0.894']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="55" y="45" fill="#0f172a" font-size="12" font-weight="700">Activity a1 (start)</text>
        <text x="55" y="75" fill="#2563eb" font-family="monospace" font-size="11">machine_id, process_id, timestamp</text>
        <text x="55" y="105" fill="#64748b" font-size="11">Filtered for activity_type = 'start'</text>

        <path d="M 380 75 Q 440 75, 490 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

        <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="515" y="45" fill="#0f172a" font-size="12" font-weight="700">Activity a2 (end)</text>
        <text x="515" y="75" fill="#16a34a" font-family="monospace" font-size="11">machine_id, process_id, timestamp</text>
        <text x="515" y="105" fill="#64748b" font-size="11">Delta = a2.timestamp - a1.timestamp</text>
      </svg>`,
      logicBreakdown: [
        'Processes are split across two rows: one for start and one for end.',
        'Self-join Activity a1 to Activity a2 on matching machine_id and process_id, ensuring a1 is "start" and a2 is "end".',
        'Compute elapsed seconds (a2.timestamp - a1.timestamp), group by machine_id, and take ROUND(AVG(...), 3).'
      ],
      solutionSQL: `SELECT 
    a1.machine_id,
    ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time
FROM Activity a1
JOIN Activity a2
    ON a1.machine_id = a2.machine_id
   AND a1.process_id = a2.process_id
   AND a1.activity_type = 'start'
   AND a2.activity_type = 'end'
GROUP BY a1.machine_id;`,
      lineByLineExplanation: [
        { clause: 'SELECT a1.machine_id, ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time', exp: 'Averages elapsed seconds rounded to 3 decimal places.' },
        { clause: 'FROM Activity a1 JOIN Activity a2', exp: 'Pairs start and end records into a single row.' },
        { clause: 'ON a1.machine_id = a2.machine_id AND a1.process_id = a2.process_id', exp: 'Ensures timestamps belong to the exact same machine and process.' },
        { clause: 'AND a1.activity_type = "start" AND a2.activity_type = "end"', exp: 'Ensures positive subtraction direction (end minus start).' },
        { clause: 'GROUP BY a1.machine_id;', exp: 'Aggregates averages per individual factory machine.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Divisor Confusion: Forgetting that a process consists of 2 activities (start and end), so dividing total duration by process count requires COUNT(DISTINCT process_id)."
],
      alternativeSolutions: [
        {
                "name": "Conditional Aggregation (Single Table Scan)",
                "complexity": "O(N) single-pass scan",
                "sql": "SELECT machine_id,\n       ROUND(SUM(CASE WHEN activity_type = 'end' THEN timestamp ELSE -timestamp END) / COUNT(DISTINCT process_id), 3) AS processing_time\nFROM Activity\nGROUP BY machine_id;",
                "explanation": "Eliminates the expensive self-join entirely by accumulating end as positive and start as negative timestamps!"
        }
]
    },

    {
      id: 577,
      number: '577',
      title: 'Employee Bonus',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Amazon', 'Bloomberg', 'Microsoft'],
      interviewFreq: 'Medium (Outer Join NULL Fallback)',
      interviewRound: 'Technical Screening',
      prompt: `Write an SQL query to report the name and bonus amount of each employee with a bonus less than 1000.
Employees who received no bonus at all should also be included!

Return the result table in any order.`,
      schemaDescription: 'Employee(empId, name, supervisor, salary), Bonus(empId, bonus)',
      sampleInput: {
        table: 'Employee & Bonus',
        columns: ['empId', 'name', 'bonus'],
        rows: [
          ['1', 'John', 'null'],
          ['2', 'Dan', '500'],
          ['3', 'Brad', 'null'],
          ['4', 'Thomas', '2000']
        ]
      },
      expectedOutput: {
        columns: ['name', 'bonus'],
        rows: [
          ['John', 'null'],
          ['Dan', '500'],
          ['Brad', 'null']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="55" y="45" fill="#0f172a" font-size="12" font-weight="700">Employee Table</text>
        <text x="55" y="75" fill="#2563eb" font-family="monospace" font-size="11">empId (PK), name, salary</text>
        <text x="55" y="105" fill="#16a34a" font-size="11">Every employee must be checked</text>

        <path d="M 380 75 Q 440 75, 490 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

        <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="515" y="45" fill="#0f172a" font-size="12" font-weight="700">Bonus Table</text>
        <text x="515" y="75" fill="#16a34a" font-family="monospace" font-size="11">empId (FK), bonus</text>
        <rect x="515" y="95" width="300" height="26" rx="4" fill="#fffbeb" stroke="#fde68a"/>
        <text x="525" y="112" fill="#b45309" font-family="monospace" font-size="10.5" font-weight="700">WHERE b.bonus &lt; 1000 OR b.bonus IS NULL</text>
      </svg>`,
      logicBreakdown: [
        'Writing WHERE b.bonus < 1000 fails because employees with no bonus have NULL, evaluating to UNKNOWN in 3VL.',
        'Use a LEFT JOIN from Employee to Bonus.',
        'Include both conditions: WHERE b.bonus < 1000 OR b.bonus IS NULL.'
      ],
      solutionSQL: `SELECT 
    e.name, 
    b.bonus
FROM Employee e
LEFT JOIN Bonus b
    ON e.empId = b.empId
WHERE b.bonus < 1000 
   OR b.bonus IS NULL;`,
      lineByLineExplanation: [
        { clause: 'SELECT e.name, b.bonus', exp: 'Selects employee name and bonus amount.' },
        { clause: 'FROM Employee e LEFT JOIN Bonus b ON e.empId = b.empId', exp: 'Preserves all employees even if they received no bonus record.' },
        { clause: 'WHERE b.bonus < 1000 OR b.bonus IS NULL;', exp: 'Defensive 3VL filter: prevents NULL bonus employees from being dropped.' }
      ]
    ,
      trapsAndEdgeCases: [
        "The Outer Join NULL Predicate: Writing WHERE b.bonus < 1000 drops employees with NO bonus row because NULL < 1000 is UNKNOWN. Must include OR b.bonus IS NULL."
],
      alternativeSolutions: [
        {
                "name": "IFNULL / COALESCE Filter",
                "complexity": "O(N) join + filter",
                "sql": "SELECT e.name, b.bonus\nFROM Employee e\nLEFT JOIN Bonus b ON e.empId = b.empId\nWHERE IFNULL(b.bonus, 0) < 1000;",
                "explanation": "Coerces NULL bonuses to 0 so the single inequality captures both cases."
        }
]
    },

    {
      id: 1280,
      number: '1280',
      title: 'Students and Examinations',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Amazon', 'Apple', 'Facebook / Meta', 'Google', 'Microsoft'],
      interviewFreq: 'Very High (Cartesian Matrix Generation)',
      interviewRound: 'Technical Interview',
      prompt: `Write an SQL query to find the number of times each student attended each exam.

Return the result table ordered by student_id and subject_name.`,
      schemaDescription: 'Students(student_id, student_name), Subjects(subject_name), Examinations(student_id, subject_name)',
      sampleInput: {
        table: 'Students, Subjects, Examinations',
        columns: ['student_id', 'student_name', 'subject_name', 'attended_exams'],
        rows: [
          ['1', 'Alice', 'Math', '3'],
          ['1', 'Alice', 'Physics', '2'],
          ['2', 'Bob', 'Programming', '1'],
          ['2', 'Bob', 'Physics', '0']
        ]
      },
      expectedOutput: {
        columns: ['student_id', 'student_name', 'subject_name', 'attended_exams'],
        rows: [
          ['1', 'Alice', 'Math', '3'],
          ['1', 'Alice', 'Physics', '2'],
          ['1', 'Alice', 'Programming', '1'],
          ['2', 'Bob', 'Math', '1'],
          ['2', 'Bob', 'Physics', '0'],
          ['2', 'Bob', 'Programming', '1']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="20" width="220" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="55" y="45" fill="#0f172a" font-size="12" font-weight="700">Students Table</text>
        <text x="55" y="75" fill="#2563eb" font-family="monospace" font-size="11">student_id (PK)</text>

        <text x="275" y="95" fill="#6366f1" font-size="20" font-weight="700">CROSS</text>

        <rect x="330" y="20" width="220" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="345" y="45" fill="#0f172a" font-size="12" font-weight="700">Subjects Table</text>
        <text x="345" y="75" fill="#6d28d9" font-family="monospace" font-size="11">subject_name (PK)</text>

        <path d="M 550 90 Q 590 90, 620 90" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

        <rect x="630" y="20" width="210" height="140" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="645" y="45" fill="#166534" font-size="12" font-weight="700">Examinations</text>
        <text x="645" y="75" fill="#16a34a" font-family="monospace" font-size="11">LEFT JOIN on both</text>
        <text x="645" y="105" fill="#0f172a" font-family="monospace" font-size="11">COUNT(e.subject_name)</text>
      </svg>`,
      logicBreakdown: [
        'Every student must appear with every subject, even if they attended 0 exams.',
        'Step 1: Students CROSS JOIN Subjects generates the baseline Cartesian matrix of all possible student-subject pairs.',
        'Step 2: LEFT JOIN Examinations on student_id AND subject_name.',
        'Step 3: GROUP BY student and subject, and use COUNT(e.subject_name) so unrepresented exams evaluate to 0 instead of 1.'
      ],
      solutionSQL: `SELECT 
    s.student_id,
    s.student_name,
    sub.subject_name,
    COUNT(e.subject_name) AS attended_exams
FROM Students s
CROSS JOIN Subjects sub
LEFT JOIN Examinations e
    ON s.student_id = e.student_id
   AND sub.subject_name = e.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
ORDER BY s.student_id, sub.subject_name;`,
      lineByLineExplanation: [
        { clause: 'SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams', exp: 'Selects student info, subject, and non-null exam counts.' },
        { clause: 'FROM Students s CROSS JOIN Subjects sub', exp: 'Generates the complete Cartesian matrix pairing every student with every course.' },
        { clause: 'LEFT JOIN Examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name', exp: 'Pulls in attendance records while preserving 0-attendance rows.' },
        { clause: 'GROUP BY s.student_id, s.student_name, sub.subject_name', exp: 'Aggregates exam counts per student-subject combination.' },
        { clause: 'ORDER BY s.student_id, sub.subject_name;', exp: 'Sorts output in ascending order as requested.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Missing 0-Exam Combinations: Students who never took an exam for a subject MUST appear with count 0. Mandates CROSS JOIN between Students and Subjects first."
],
      alternativeSolutions: [
        {
                "name": "Correlated Scalar Count",
                "complexity": "O(S * B * log E) index seeks",
                "sql": "SELECT s.student_id, s.student_name, sub.subject_name,\n       (SELECT COUNT(*) FROM Examinations e WHERE e.student_id = s.student_id AND e.subject_name = sub.subject_name) AS attended_exams\nFROM Students s CROSS JOIN Subjects sub\nORDER BY s.student_id, sub.subject_name;",
                "explanation": "Uses scalar subquery counting for each cell in the Cartesian grid."
        }
]
    },

    {
      id: 570,
      number: '570',
      title: 'Managers with at Least 5 Direct Reports',
      difficulty: 'Medium',
      category: 'Basic Joins',
      companies: ['Amazon', 'Apple', 'Bloomberg', 'Google'],
      interviewFreq: 'High (Self-Referential Hierarchy)',
      interviewRound: 'Technical Interview',
      prompt: `Write an SQL query to report the managers with at least five direct reports.

Return the result table in any order.`,
      schemaDescription: 'Employee(id, name, department, managerId)',
      sampleInput: {
        table: 'Employee',
        columns: ['id', 'name', 'department', 'managerId'],
        rows: [
          ['101', 'John', 'A', 'null'],
          ['102', 'Dan', 'A', '101'],
          ['103', 'James', 'A', '101'],
          ['104', 'Amy', 'A', '101'],
          ['105', 'Anne', 'A', '101'],
          ['106', 'Ron', 'B', '101']
        ]
      },
      expectedOutput: {
        columns: ['name'],
        rows: [
          ['John']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="55" y="45" fill="#0f172a" font-size="12" font-weight="700">Employee e (Direct Report)</text>
        <text x="55" y="75" fill="#2563eb" font-family="monospace" font-size="11">id, name, managerId</text>
        <text x="55" y="105" fill="#64748b" font-size="11">Points to boss via managerId</text>

        <path d="M 380 75 Q 440 75, 490 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>
        <text x="435" y="65" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="9.5">e.managerId = m.id</text>

        <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="515" y="45" fill="#1d4ed8" font-size="12" font-weight="700">Employee m (Manager)</text>
        <text x="515" y="75" fill="#1d4ed8" font-family="monospace" font-size="11">id, name</text>
        <rect x="515" y="95" width="300" height="26" rx="4" fill="#f0fdf4" stroke="#86efac"/>
        <text x="525" y="112" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">HAVING COUNT(e.id) &gt;= 5</text>
      </svg>`,
      logicBreakdown: [
        'Employees report to managers using managerId, which references another row in the same table.',
        'Join Employee e (subordinate) to Employee m (manager) on e.managerId = m.id.',
        'Group by m.id (and m.name) and filter with HAVING COUNT(e.id) >= 5.'
      ],
      solutionSQL: `SELECT 
    m.name
FROM Employee e
JOIN Employee m
    ON e.managerId = m.id
GROUP BY m.id, m.name
HAVING COUNT(e.id) >= 5;`,
      lineByLineExplanation: [
        { clause: 'SELECT m.name', exp: 'Projects the manager\'s name.' },
        { clause: 'FROM Employee e JOIN Employee m ON e.managerId = m.id', exp: 'Links subordinates to their direct manager in the same table.' },
        { clause: 'GROUP BY m.id, m.name', exp: 'Aggregates reports around each distinct manager.' },
        { clause: 'HAVING COUNT(e.id) >= 5;', exp: 'Filters for managers supervising 5 or more team members.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Grouping Key: Group by manager (m.id, m.name), and filter HAVING COUNT(e.id) >= 5."
],
      alternativeSolutions: [
        {
                "name": "IN Subquery with GROUP BY",
                "complexity": "O(N) hash aggregation",
                "sql": "SELECT name\nFROM Employee\nWHERE id IN (\n    SELECT managerId\n    FROM Employee\n    GROUP BY managerId\n    HAVING COUNT(*) >= 5\n);",
                "explanation": "Isolates aggregation into a subquery so the outer query simply retrieves manager names by primary key."
        }
]
    },

    {
      id: 1934,
      number: '1934',
      title: 'Confirmation Rate',
      difficulty: 'Medium',
      category: 'Basic Joins',
      companies: ['Amazon', 'Bloomberg', 'Facebook / Meta', 'Google', 'Uber'],
      interviewFreq: 'Very High (Outer Join Conditional Mean)',
      interviewRound: 'Technical Interview',
      prompt: `The confirmation rate of a user is the number of 'confirmed' messages divided by the total number of requested confirmation messages. The confirmation rate of a user that did not request any confirmation messages is 0. Round the confirmation rate to two decimal places.

Write an SQL query to find the confirmation rate of each user.

Return the result table in any order.`,
      schemaDescription: 'Signups(user_id, time_stamp), Confirmations(user_id, time_stamp, action)',
      sampleInput: {
        table: 'Signups & Confirmations',
        columns: ['user_id', 'action'],
        rows: [
          ['3', 'confirmed'],
          ['3', 'timeout'],
          ['7', 'confirmed'],
          ['2', 'null']
        ]
      },
      expectedOutput: {
        columns: ['user_id', 'confirmation_rate'],
        rows: [
          ['3', '0.50'],
          ['7', '1.00'],
          ['2', '0.00']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="55" y="45" fill="#0f172a" font-size="12" font-weight="700">Signups (All Users)</text>
        <text x="55" y="75" fill="#2563eb" font-family="monospace" font-size="11">user_id (PK)</text>
        <text x="55" y="105" fill="#16a34a" font-size="11">Guarantees 0-rate users appear!</text>

        <path d="M 380 75 Q 440 75, 490 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1378)"/>

        <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="515" y="45" fill="#0f172a" font-size="12" font-weight="700">Confirmations (Events)</text>
        <text x="515" y="75" fill="#64748b" font-family="monospace" font-size="11">user_id, action ('confirmed' | 'timeout')</text>
        <rect x="515" y="95" width="300" height="26" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
        <text x="525" y="112" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">ROUND(IFNULL(AVG(action = 'confirmed'), 0), 2)</text>
      </svg>`,
      logicBreakdown: [
        'Users who never requested a confirmation must appear in the output with a rate of 0.00. This mandates a LEFT JOIN from Signups.',
        'In MySQL, action = "confirmed" evaluates to 1 when true and 0 when false. For users with no rows, AVG yields NULL.',
        'Wrap with IFNULL(..., 0) and round to 2 decimal places.'
      ],
      solutionSQL: `SELECT 
    s.user_id,
    ROUND(IFNULL(AVG(c.action = 'confirmed'), 0), 2) AS confirmation_rate
FROM Signups s
LEFT JOIN Confirmations c
    ON s.user_id = c.user_id
GROUP BY s.user_id;`,
      lineByLineExplanation: [
        { clause: 'SELECT s.user_id, ROUND(IFNULL(AVG(c.action = "confirmed"), 0), 2) AS confirmation_rate', exp: 'Computes fraction of confirmed messages, falling back to 0.00 for inactive users.' },
        { clause: 'FROM Signups s LEFT JOIN Confirmations c ON s.user_id = c.user_id', exp: 'Retains every registered user regardless of confirmation activity.' },
        { clause: 'GROUP BY s.user_id;', exp: 'Aggregates statistics per individual user.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Division by Zero & Inactive Users: Users with 0 requests must report 0.00, not NULL.",
        "PostgreSQL Compatibility: In Postgres, AVG(action = 'confirmed') throws a type error because boolean is not numeric."
],
      alternativeSolutions: [
        {
                "name": "PostgreSQL Standard CASE Aggregation",
                "complexity": "O(N) join + grouping",
                "sql": "SELECT s.user_id,\n       ROUND(COALESCE(AVG(CASE WHEN c.action = 'confirmed' THEN 1.0 ELSE 0.0 END), 0), 2) AS confirmation_rate\nFROM Signups s\nLEFT JOIN Confirmations c ON s.user_id = c.user_id\nGROUP BY s.user_id;",
                "explanation": "100% portable ANSI SQL standard that works identically in Postgres, Oracle, Snowflake, and MySQL."
        }
]
    },

    {
      id: 175,
      number: '175',
      title: 'Combine Two Tables',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Amazon', 'Apple', 'Bloomberg', 'Microsoft'],
      interviewFreq: '96% (Universal Screening Baseline - Left Outer Join)',
      interviewRound: 'Technical Screen',
      prompt: `Write a solution to report the first name, last name, city, and state of each person in the Person table. If the address of a personId is not present in the Address table, report null instead.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Person (personId PK, lastName, firstName)
Table: Address (addressId PK, personId, city, state)`,
      sampleInput: {
        table: 'Person & Address',
        columns: ['personId', 'firstName', 'lastName', 'city', 'state'],
        rows: [
          [1, 'Allen', 'Wang', 'null', 'null'],
          [2, 'Bob', 'Alice', 'New York City', 'New York']
        ]
      },
      expectedOutput: {
        columns: ['firstName', 'lastName', 'city', 'state'],
        rows: [
          ['Allen', 'Wang', null, null],
          ['Bob', 'Alice', 'New York City', 'New York']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Table Person -->
        <rect x="20" y="20" width="300" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">LEFT: Person (Must Preserve)</text>
        <rect x="30" y="55" width="280" height="20" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="40" y="69" fill="#64748b" font-family="monospace" font-size="10">personId | firstName | lastName</text>
        <text x="40" y="98" fill="#0f172a" font-family="monospace" font-size="11">1 | Allen | Wang</text>
        <text x="40" y="128" fill="#0f172a" font-family="monospace" font-size="11">2 | Bob | Alice</text>
        <rect x="30" y="145" width="280" height="24" fill="#eff6ff" stroke="#bfdbfe"/>
        <text x="40" y="161" fill="#1d4ed8" font-size="10" font-weight="600">Retains person 1 even without Address</text>

        <!-- Pointer Arrow -->
        <path d="M 330 100 L 410 100" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow1378)"/>
        <text x="370" y="88" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="10" font-weight="700">LEFT JOIN</text>
        <text x="370" y="120" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="9.5">ON p.personId = a.personId</text>

        <!-- Table Address -->
        <rect x="420" y="20" width="210" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="435" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">RIGHT: Address</text>
        <rect x="430" y="55" width="190" height="20" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="440" y="69" fill="#64748b" font-family="monospace" font-size="10">personId | city | state</text>
        <text x="440" y="98" fill="#dc2626" font-family="monospace" font-size="10.5">1 missing =&gt; [NULL, NULL]</text>
        <text x="440" y="128" fill="#166534" font-family="monospace" font-size="10.5">2 | NYC | New York</text>

        <!-- Output Box -->
        <rect x="645" y="20" width="220" height="160" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="655" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT BUFFER</text>
        <text x="655" y="75" fill="#0f172a" font-family="monospace" font-size="10">firstName, lastName, city, state</text>
        <text x="655" y="105" fill="#166534" font-family="monospace" font-size="10.5">Allen | Wang | NULL | NULL</text>
        <text x="655" y="135" fill="#166534" font-family="monospace" font-size="10.5">Bob | Alice | NYC | New York</text>
      </svg>`,
      logicBreakdown: [
        '1. An INNER JOIN would drop Person 1 because they have no corresponding row in Address.',
        '2. The prompt demands reporting city and state as NULL if absent, which is the exact definition of a LEFT JOIN.',
        '3. Join Person p LEFT JOIN Address a ON p.personId = a.personId and select firstName, lastName, city, and state.'
      ],
      solutionSQL: `SELECT 
    p.firstName,
    p.lastName,
    a.city,
    a.state
FROM Person p
LEFT JOIN Address a
    ON p.personId = a.personId;`,
      lineByLineExplanation: [
        { clause: 'SELECT p.firstName, p.lastName, a.city, a.state', exp: 'Selects person names from Person and location attributes from Address.' },
        { clause: 'FROM Person p', exp: 'Designates Person as the left primary relation to ensure all individuals are preserved.' },
        { clause: 'LEFT JOIN Address a ON p.personId = a.personId;', exp: 'Outer joins Address on matching personId, producing NULL for missing addresses.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Inner Join Trap: Missing addresses must output NULL. An INNER JOIN permanently discards addressless persons."
],
      alternativeSolutions: [
        {
                "name": "RIGHT JOIN Inversion",
                "complexity": "O(N) join",
                "sql": "SELECT p.firstName, p.lastName, a.city, a.state\nFROM Address a\nRIGHT JOIN Person p ON a.personId = p.personId;",
                "explanation": "Semantic inversion using RIGHT JOIN with Person on the right."
        }
]
    },

    {
      id: 181,
      number: '181',
      title: 'Employees Earning More Than Their Managers',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Meta', 'Google', 'Amazon', 'Bloomberg'],
      interviewFreq: '95% (Canonical Hierarchy Self-Join)',
      interviewRound: 'Technical Interview',
      prompt: `Write a solution to find the employees who earn more than their managers.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Employee (id PK, name, salary, managerId)`,
      sampleInput: {
        table: 'Employee',
        columns: ['id', 'name', 'salary', 'managerId'],
        rows: [
          [1, 'Joe', 70000, 3],
          [2, 'Henry', 80000, 4],
          [3, 'Sam', 60000, null],
          [4, 'Max', 90000, null]
        ]
      },
      expectedOutput: {
        columns: ['Employee'],
        rows: [
          ['Joe']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Subordinate Instance -->
        <rect x="20" y="20" width="310" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">Employee e (Subordinate)</text>
        <text x="35" y="75" fill="#64748b" font-family="monospace" font-size="11">id 1: Joe | $70,000 | mgr: 3</text>
        <text x="35" y="105" fill="#64748b" font-family="monospace" font-size="11">id 2: Henry | $80,000 | mgr: 4</text>
        <text x="35" y="135" fill="#64748b" font-family="monospace" font-size="11">id 3: Sam | $60,000 | mgr: NULL</text>
        <text x="35" y="160" fill="#64748b" font-family="monospace" font-size="11">id 4: Max | $90,000 | mgr: NULL</text>

        <!-- Self Join Bridge -->
        <path d="M 340 75 Q 400 50, 455 75" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow1378)"/>
        <text x="400" y="40" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="10" font-weight="700">e.managerId = m.id</text>

        <!-- Manager Instance -->
        <rect x="465" y="20" width="220" height="160" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="480" y="45" fill="#1d4ed8" font-family="monospace" font-size="12" font-weight="700">Employee m (Manager)</text>
        <text x="480" y="75" fill="#1d4ed8" font-family="monospace" font-size="10.5">m.id 3: Sam | $60,000</text>
        <text x="480" y="95" fill="#166534" font-family="monospace" font-size="9.5">&gt; Joe ($70k &gt; $60k) MATCH!</text>
        <text x="480" y="125" fill="#1d4ed8" font-family="monospace" font-size="10.5">m.id 4: Max | $90,000</text>
        <text x="480" y="145" fill="#dc2626" font-family="monospace" font-size="9.5">&gt; Henry ($80k &lt; $90k) REJECT</text>

        <!-- Output -->
        <rect x="705" y="20" width="160" height="160" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="715" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT</text>
        <text x="715" y="70" fill="#64748b" font-family="monospace" font-size="10">Employee</text>
        <text x="715" y="105" fill="#166534" font-family="monospace" font-size="14" font-weight="700">Joe</text>
      </svg>`,
      logicBreakdown: [
        '1. Employees and their managers coexist in the same table: Employee.',
        '2. To inspect an employee alongside their direct boss, join Employee e with Employee m on e.managerId = m.id.',
        '3. Add the filter WHERE e.salary > m.salary to identify subordinates out-earning their manager.',
        '4. Alias the resulting column as Employee.'
      ],
      solutionSQL: `SELECT 
    e.name AS Employee
FROM Employee e
JOIN Employee m
    ON e.managerId = m.id
WHERE e.salary > m.salary;`,
      lineByLineExplanation: [
        { clause: 'SELECT e.name AS Employee', exp: 'Selects the subordinate employee\'s name, aliased to "Employee".' },
        { clause: 'FROM Employee e JOIN Employee m ON e.managerId = m.id', exp: 'Performs a self-join linking each employee\'s managerId to the manager\'s primary id.' },
        { clause: 'WHERE e.salary > m.salary;', exp: 'Filters strictly for employees with a higher salary than their supervisor.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Subordinates with NULL manager: Employees with managerId IS NULL must not be compared to avoid false matches."
],
      alternativeSolutions: [
        {
                "name": "Correlated Scalar Comparison",
                "complexity": "O(N * log N) index seeks",
                "sql": "SELECT e.name AS Employee\nFROM Employee e\nWHERE e.salary > (\n    SELECT m.salary FROM Employee m WHERE m.id = e.managerId\n);",
                "explanation": "Subquery lookups match manager salary directly without explicit join syntax."
        }
]
    },

    {
      id: 183,
      number: '183',
      title: 'Customers Who Never Order',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Amazon', 'Apple', 'Bloomberg', 'Google'],
      interviewFreq: '94% (Essential Anti-Join Mechanics)',
      interviewRound: 'Technical Screen',
      prompt: `Write a solution to find all customers who never order anything.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Customers (id PK, name)
Table: Orders (id PK, customerId FK)`,
      sampleInput: {
        table: 'Customers & Orders',
        columns: ['Customers.id', 'Customers.name', 'Orders.id', 'Orders.customerId'],
        rows: [
          [1, 'Joe', 2, 1],
          [2, 'Henry', null, null],
          [3, 'Sam', 1, 3],
          [4, 'Max', null, null]
        ]
      },
      expectedOutput: {
        columns: ['Customers'],
        rows: [
          ['Henry'],
          ['Max']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Customers Table -->
        <rect x="20" y="20" width="280" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">Customers c</text>
        <text x="35" y="75" fill="#64748b" font-family="monospace" font-size="11">1: Joe</text>
        <text x="35" y="100" fill="#166534" font-family="monospace" font-size="11" font-weight="700">2: Henry (NO ORDERS!)</text>
        <text x="35" y="125" fill="#64748b" font-family="monospace" font-size="11">3: Sam</text>
        <text x="35" y="150" fill="#166534" font-family="monospace" font-size="11" font-weight="700">4: Max (NO ORDERS!)</text>

        <!-- Left Join Bridge -->
        <path d="M 310 95 L 390 95" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow1378)"/>
        <text x="350" y="80" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="10" font-weight="700">LEFT JOIN</text>
        <text x="350" y="115" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="9">c.id = o.customerId</text>

        <!-- Orders Table -->
        <rect x="400" y="20" width="220" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="415" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">Orders o</text>
        <text x="415" y="75" fill="#64748b" font-family="monospace" font-size="11">Order 1 -&gt; cust 3</text>
        <text x="415" y="100" fill="#dc2626" font-family="monospace" font-size="11">NULL for Henry</text>
        <text x="415" y="125" fill="#64748b" font-family="monospace" font-size="11">Order 2 -&gt; cust 1</text>
        <text x="415" y="150" fill="#dc2626" font-family="monospace" font-size="11">NULL for Max</text>

        <!-- Anti-Join Filter Gate -->
        <rect x="640" y="20" width="225" height="160" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
        <text x="655" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">FILTER: o.id IS NULL</text>
        <text x="655" y="75" fill="#0f172a" font-size="11">Customers with zero orders:</text>
        <text x="655" y="105" fill="#166534" font-family="monospace" font-size="13" font-weight="700">Henry</text>
        <text x="655" y="135" fill="#166534" font-family="monospace" font-size="13" font-weight="700">Max</text>
      </svg>`,
      logicBreakdown: [
        '1. An anti-join extracts rows from Table A that have NO corresponding entry in Table B.',
        '2. Method 1 (LEFT JOIN + IS NULL): Join Customers to Orders. If a customer never ordered, o.id will be NULL in the outer join output buffer.',
        '3. Method 2 (NOT IN / NOT EXISTS): WHERE id NOT IN (SELECT customerId FROM Orders).',
        '4. The LEFT JOIN ... WHERE o.id IS NULL pattern is universally preferred in interview scenarios for its clean execution plan.'
      ],
      solutionSQL: `SELECT 
    c.name AS Customers
FROM Customers c
LEFT JOIN Orders o
    ON c.id = o.customerId
WHERE o.id IS NULL;`,
      lineByLineExplanation: [
        { clause: 'SELECT c.name AS Customers', exp: 'Selects customer name, aliased to "Customers".' },
        { clause: 'FROM Customers c LEFT JOIN Orders o ON c.id = o.customerId', exp: 'Performs a left outer join to preserve every customer regardless of whether they have placed an order.' },
        { clause: 'WHERE o.id IS NULL;', exp: 'Filters strictly for the unmatched rows where no corresponding order exists.' }
      ]
    ,
      trapsAndEdgeCases: [
        "The Fatal NOT IN NULL Trap: If Orders.customerId contains even a single NULL, WHERE id NOT IN (SELECT customerId FROM Orders) evaluates to UNKNOWN for all rows, returning 0 rows! Always use NOT EXISTS or LEFT JOIN ... WHERE IS NULL."
],
      alternativeSolutions: [
        {
                "name": "NOT EXISTS Correlated Anti-Join",
                "complexity": "O(N * log M) index seek with early termination",
                "sql": "SELECT c.name AS Customers\nFROM Customers c\nWHERE NOT EXISTS (\n    SELECT 1 FROM Orders o WHERE o.customerId = c.id\n);",
                "explanation": "Most reliable production anti-join pattern: immune to NULLs and terminates immediately on first match."
        }
]
    },

    {
      id: 607,
      number: '607',
      title: 'Sales Person',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Amazon', 'Adobe'],
      interviewFreq: '88% (Multi-table 3-Way Relational Anti-Join)',
      interviewRound: 'Technical Interview',
      prompt: `Write a solution to find the names of all the salespersons who did not have any orders related to the company with the name 'RED'.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: SalesPerson (sales_id PK, name, salary, commission_rate, hire_date)
Table: Company (com_id PK, name, city)
Table: Orders (order_id PK, order_date, com_id, sales_id, amount)`,
      sampleInput: {
        table: 'SalesPerson & Company & Orders',
        columns: ['sales_id', 'salesperson', 'company', 'com_id'],
        rows: [
          [1, 'John', 'RED', 1],
          [2, 'Amy', 'YELLOW', 2],
          [3, 'Mark', 'GREEN', 3],
          [4, 'Pam', 'RED', 1],
          [5, 'Alex', 'null', 'null']
        ]
      },
      expectedOutput: {
        columns: ['name'],
        rows: [
          ['Amy'],
          ['Mark'],
          ['Alex']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- SalesPerson -->
        <rect x="20" y="20" width="220" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">SalesPerson</text>
        <text x="35" y="70" fill="#dc2626" font-family="monospace" font-size="10.5">1: John (RED)</text>
        <text x="35" y="92" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">2: Amy (YELLOW)</text>
        <text x="35" y="114" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">3: Mark (GREEN)</text>
        <text x="35" y="136" fill="#dc2626" font-family="monospace" font-size="10.5">4: Pam (RED)</text>
        <text x="35" y="158" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">5: Alex (NO ORDERS)</text>

        <!-- Orders -->
        <rect x="260" y="20" width="200" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="275" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">Orders</text>
        <text x="275" y="75" fill="#64748b" font-family="monospace" font-size="10.5">ord 1: sales 1, com 1</text>
        <text x="275" y="105" fill="#64748b" font-family="monospace" font-size="10.5">ord 2: sales 4, com 1</text>
        <text x="275" y="135" fill="#64748b" font-family="monospace" font-size="10.5">ord 3: sales 2, com 2</text>

        <!-- Company Bridge -->
        <path d="M 470 75 L 530 75" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow1378)"/>

        <!-- Company -->
        <rect x="540" y="20" width="150" height="160" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
        <text x="550" y="45" fill="#991b1b" font-family="monospace" font-size="12" font-weight="700">Company</text>
        <text x="550" y="75" fill="#dc2626" font-family="monospace" font-size="11" font-weight="700">com 1: 'RED'</text>
        <text x="550" y="105" fill="#64748b" font-family="monospace" font-size="11">com 2: 'YELLOW'</text>
        <text x="550" y="135" fill="#64748b" font-family="monospace" font-size="11">com 3: 'GREEN'</text>

        <!-- Output -->
        <rect x="710" y="20" width="155" height="160" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="720" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT</text>
        <text x="720" y="75" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Amy</text>
        <text x="720" y="105" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Mark</text>
        <text x="720" y="135" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Alex</text>
      </svg>`,
      logicBreakdown: [
        '1. We need all salespersons who did NOT have any orders associated with company \'RED\'.',
        '2. First, identify the set of sales_id values that DO have orders related to \'RED\': Orders joined to Company where c.name = \'RED\'.',
        '3. Select the names from SalesPerson where sales_id NOT IN this subquery set.',
        '4. Note that salespeople with no orders at all (like Alex) have zero \'RED\' orders and MUST be included.'
      ],
      solutionSQL: `SELECT name
FROM SalesPerson
WHERE sales_id NOT IN (
    SELECT o.sales_id
    FROM Orders o
    JOIN Company c
        ON o.com_id = c.com_id
    WHERE c.name = 'RED'
);`,
      lineByLineExplanation: [
        { clause: 'SELECT name FROM SalesPerson', exp: 'Retrieves names from the master salesperson registry.' },
        { clause: 'WHERE sales_id NOT IN (...)', exp: 'Filters out any salesperson whose ID appears in the blacklisted RED company order set.' },
        { clause: 'SELECT o.sales_id FROM Orders o JOIN Company c ON o.com_id = c.com_id WHERE c.name = \'RED\'', exp: 'Gathers all sales_id references tied to orders placed for the company \'RED\'.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Salespeople with 0 orders: Must be included! Using an INNER JOIN to look for non-red orders accidentally drops salespeople who never made any sales."
],
      alternativeSolutions: [
        {
                "name": "NOT EXISTS Anti-Join",
                "complexity": "O(S * log O) index seeks",
                "sql": "SELECT s.name\nFROM SalesPerson s\nWHERE NOT EXISTS (\n    SELECT 1\n    FROM Orders o\n    JOIN Company c ON o.com_id = c.com_id\n    WHERE o.sales_id = s.sales_id AND c.name = 'RED'\n);",
                "explanation": "Standard production anti-join verifying no red company orders exist."
        }
]
    },

    {
      id: 603,
      number: '603',
      title: 'Consecutive Available Seats',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Amazon', 'Google'],
      interviewFreq: '86% (Adjacent Slot Continuous Self-Join)',
      interviewRound: 'Technical Screen',
      prompt: `Find all the consecutive available seats in the cinema. Return the result table ordered by seat_id in ascending order.\n\nTwo or more seats next to each other where free = 1 are considered consecutive.`,
      schemaDescription: `Table: Cinema (seat_id PK INT auto_increment, free BOOL)`,
      sampleInput: {
        table: 'Cinema',
        columns: ['seat_id', 'free'],
        rows: [
          [1, 1],
          [2, 0],
          [3, 1],
          [4, 1],
          [5, 1]
        ]
      },
      expectedOutput: {
        columns: ['seat_id'],
        rows: [
          [3],
          [4],
          [5]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Cinema Table -->
        <rect x="20" y="20" width="310" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">INPUT: Cinema Seats</text>
        <text x="35" y="75" fill="#64748b" font-family="monospace" font-size="11">Seat 1: free = 1 (Isolated, seat 2 occupied)</text>
        <text x="35" y="100" fill="#dc2626" font-family="monospace" font-size="11">Seat 2: free = 0 (Occupied)</text>
        <text x="35" y="125" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Seat 3: free = 1 (Adjacent to 4)</text>
        <text x="35" y="145" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Seat 4: free = 1 (Adjacent to 3 &amp; 5)</text>
        <text x="35" y="165" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Seat 5: free = 1 (Adjacent to 4)</text>

        <!-- Self-Join Logic -->
        <rect x="360" y="30" width="260" height="140" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="1.5"/>
        <text x="375" y="55" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">NEIGHBOR DISTANCE PREDICATE</text>
        <text x="375" y="85" fill="#0f172a" font-family="monospace" font-size="11">ABS(a.seat_id - b.seat_id) = 1</text>
        <text x="375" y="110" fill="#2563eb" font-family="monospace" font-size="11">AND a.free = 1 AND b.free = 1</text>
        <text x="375" y="140" fill="#166534" font-size="11" font-weight="600">Matches 3 with 4, and 4 with 5</text>

        <!-- Output -->
        <rect x="650" y="20" width="210" height="160" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="665" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT: seat_id</text>
        <text x="665" y="80" fill="#166534" font-family="monospace" font-size="12" font-weight="700">3</text>
        <text x="665" y="115" fill="#166534" font-family="monospace" font-size="12" font-weight="700">4</text>
        <text x="665" y="150" fill="#166534" font-family="monospace" font-size="12" font-weight="700">5</text>
      </svg>`,
      logicBreakdown: [
        '1. Two seats are adjacent if the absolute difference of their seat_id values is 1: ABS(a.seat_id - b.seat_id) = 1.',
        '2. Both seats must be free: a.free = 1 AND b.free = 1.',
        '3. Since seat 4 matches both seat 3 and seat 5, seat 4 would appear twice without deduplication; we use DISTINCT.',
        '4. Order the output by seat_id in ascending order.'
      ],
      solutionSQL: `SELECT DISTINCT a.seat_id
FROM Cinema a
JOIN Cinema b
    ON ABS(a.seat_id - b.seat_id) = 1
   AND a.free = 1 
   AND b.free = 1
ORDER BY a.seat_id ASC;`,
      lineByLineExplanation: [
        { clause: 'SELECT DISTINCT a.seat_id', exp: 'Selects unique seat numbers, eliminating duplicate entries when a seat has two free neighbors.' },
        { clause: 'FROM Cinema a JOIN Cinema b', exp: 'Self-joins the Cinema table onto itself to compare neighboring seats.' },
        { clause: 'ON ABS(a.seat_id - b.seat_id) = 1 AND a.free = 1 AND b.free = 1', exp: 'Ensures the two seats are directly adjacent and both available.' },
        { clause: 'ORDER BY a.seat_id ASC;', exp: 'Sorts qualifying seat IDs in ascending order.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Duplicate seats in output: Seat 4 is adjacent to both 3 and 5. Without DISTINCT, seat 4 outputs twice."
],
      alternativeSolutions: [
        {
                "name": "LEAD() & LAG() Window Analysis",
                "complexity": "O(N) single-pass window scan",
                "sql": "WITH Windowed AS (\n  SELECT seat_id, free,\n         LAG(free) OVER (ORDER BY seat_id) AS prev_free,\n         LEAD(free) OVER (ORDER BY seat_id) AS next_free\n  FROM Cinema\n)\nSELECT seat_id FROM Windowed WHERE free = 1 AND (prev_free = 1 OR next_free = 1) ORDER BY seat_id;",
                "explanation": "State-of-the-art window function inspection: avoids Cartesian self-join quadratic runtime."
        }
]
    },

    {
      id: 613,
      number: '613',
      title: 'Shortest Distance in a Line',
      difficulty: 'Easy',
      category: 'Basic Joins',
      companies: ['Twitter/X', 'Bloomberg'],
      interviewFreq: '84% (1D Coordinate Pairwise Self-Join)',
      interviewRound: 'Technical Screen',
      prompt: `Write a solution to report the shortest distance between any two points from the Point table.`,
      schemaDescription: `Table: Point (x INT PK)`,
      sampleInput: {
        table: 'Point',
        columns: ['x'],
        rows: [
          [-1],
          [0],
          [2]
        ]
      },
      expectedOutput: {
        columns: ['shortest'],
        rows: [
          [1]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Number Line -->
        <rect x="20" y="20" width="370" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">1D COORDINATE AXIS</text>
        <line x1="50" y1="100" x2="350" y2="100" stroke="#94a3b8" stroke-width="2"/>
        <!-- Point -1 -->
        <circle cx="100" cy="100" r="6" fill="#2563eb"/>
        <text x="100" y="85" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="11" font-weight="700">-1</text>
        <!-- Point 0 -->
        <circle cx="180" cy="100" r="6" fill="#16a34a"/>
        <text x="180" y="85" text-anchor="middle" fill="#16a34a" font-family="monospace" font-size="11" font-weight="700">0</text>
        <!-- Point 2 -->
        <circle cx="320" cy="100" r="6" fill="#2563eb"/>
        <text x="320" y="85" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="11" font-weight="700">2</text>

        <!-- Distance Brackets -->
        <path d="M 100 115 L 180 115" stroke="#16a34a" stroke-width="2"/>
        <text x="140" y="135" text-anchor="middle" fill="#16a34a" font-family="monospace" font-size="10.5" font-weight="700">dist = 1 (MIN)</text>
        <path d="M 180 115 L 320 115" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="250" y="135" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="10">dist = 2</text>

        <!-- Pairwise Join Predicate -->
        <rect x="410" y="30" width="240" height="140" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="1.5"/>
        <text x="425" y="55" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">ASYMMETRIC PAIRING</text>
        <text x="425" y="85" fill="#0f172a" font-family="monospace" font-size="11">ON p1.x &lt; p2.x</text>
        <text x="425" y="110" fill="#2563eb" font-family="monospace" font-size="11">Distance: (p2.x - p1.x)</text>
        <text x="425" y="135" fill="#64748b" font-size="10.5">Avoids dist = 0 &amp; duplicates</text>

        <!-- Output -->
        <rect x="670" y="20" width="190" height="160" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="685" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT: shortest</text>
        <text x="685" y="105" fill="#166534" font-family="monospace" font-size="28" font-weight="700">1</text>
      </svg>`,
      logicBreakdown: [
        '1. The distance between any two coordinates x1 and x2 is ABS(x2 - x1).',
        '2. By self-joining with the strict inequality ON p1.x < p2.x, we guarantee that p2.x is always strictly greater than p1.x, eliminating self-distances (dist = 0) and duplicate mirrored pairs.',
        '3. Since p2.x > p1.x, the distance is simply p2.x - p1.x.',
        '4. We apply MIN(p2.x - p1.x) to obtain the globally shortest distance.'
      ],
      solutionSQL: `SELECT 
    MIN(p2.x - p1.x) AS shortest
FROM Point p1
JOIN Point p2
    ON p1.x < p2.x;`,
      lineByLineExplanation: [
        { clause: 'SELECT MIN(p2.x - p1.x) AS shortest', exp: 'Calculates the minimum distance across all valid coordinate pairs, aliasing to "shortest".' },
        { clause: 'FROM Point p1 JOIN Point p2', exp: 'Self-joins the Point table onto itself.' },
        { clause: 'ON p1.x < p2.x;', exp: 'Enforces strict directional ordering to avoid zero distance to self and redundant negative inversions.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Zero distance to self: Using p1.x != p2.x calculates distances in both directions and doubles computation. Using strict inequality p1.x < p2.x cuts comparisons by 50%."
],
      alternativeSolutions: [
        {
                "name": "LEAD() Adjacent Window Difference",
                "complexity": "O(N log N) sorting scan",
                "sql": "WITH Sorted AS (\n  SELECT x, LEAD(x) OVER (ORDER BY x) AS next_x FROM Point\n)\nSELECT MIN(next_x - x) AS shortest FROM Sorted WHERE next_x IS NOT NULL;",
                "explanation": "On a sorted 1D line, the closest neighbor is ALWAYS the immediately adjacent coordinate. No need to compare all pairs!"
        }
]
    },

    {
      id: 580,
      number: '580',
      title: 'Count Student Number in Departments',
      difficulty: 'Medium',
      category: 'Basic Joins',
      companies: ['Twitter/X', 'Google'],
      interviewFreq: '87% (Grouped Outer Join with Zero Preservation)',
      interviewRound: 'Technical Interview',
      prompt: `Write a solution to report the respective department name and number of students majoring in each department for all departments in the Department table (even ones with 0 students).\n\nReturn the result table ordered by student_number in descending order. In case of ties, order them by dept_name alphabetically.`,
      schemaDescription: `Table: Student (student_id PK, student_name, gender, dept_id FK)
Table: Department (dept_id PK, dept_name)`,
      sampleInput: {
        table: 'Student & Department',
        columns: ['dept_id', 'dept_name', 'student_id', 'student_name'],
        rows: [
          [1, 'Engineering', 1, 'Jack'],
          [1, 'Engineering', 2, 'Jane'],
          [2, 'Science', 3, 'Mark'],
          [3, 'Law', null, null]
        ]
      },
      expectedOutput: {
        columns: ['dept_name', 'student_number'],
        rows: [
          ['Engineering', 2],
          ['Science', 1],
          ['Law', 0]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Department Table -->
        <rect x="20" y="20" width="280" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">Department d (Primary)</text>
        <text x="35" y="75" fill="#64748b" font-family="monospace" font-size="11">1: Engineering</text>
        <text x="35" y="105" fill="#64748b" font-family="monospace" font-size="11">2: Science</text>
        <text x="35" y="135" fill="#dc2626" font-family="monospace" font-size="11" font-weight="700">3: Law (0 students - MUST KEEP!)</text>

        <!-- Left Join Bridge -->
        <path d="M 310 95 L 390 95" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow1378)"/>
        <text x="350" y="80" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="10" font-weight="700">LEFT JOIN</text>
        <text x="350" y="115" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="9">d.dept_id = s.dept_id</text>

        <!-- Student Table -->
        <rect x="400" y="20" width="220" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="415" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">Student s</text>
        <text x="415" y="75" fill="#64748b" font-family="monospace" font-size="11">Jack (dept 1), Jane (dept 1)</text>
        <text x="415" y="105" fill="#64748b" font-family="monospace" font-size="11">Mark (dept 2)</text>
        <text x="415" y="135" fill="#dc2626" font-family="monospace" font-size="11">NULL for dept 3</text>

        <!-- Count Aggregation Rule -->
        <rect x="640" y="20" width="220" height="160" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
        <text x="655" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">COUNT(s.student_id)</text>
        <text x="655" y="75" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Engineering | 2</text>
        <text x="655" y="105" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Science | 1</text>
        <text x="655" y="135" fill="#166534" font-family="monospace" font-size="11" font-weight="700">Law | 0 (COUNT ignores NULL)</text>
      </svg>`,
      logicBreakdown: [
        '1. The problem demands listing ALL departments, including departments with zero registered students.',
        '2. This mandates starting FROM Department d LEFT JOIN Student s ON d.dept_id = s.dept_id.',
        '3. CRITICAL INTERVIEW TRAP: You must write COUNT(s.student_id), NOT COUNT(*). COUNT(*) counts NULL rows and would return 1 for Law! COUNT(s.student_id) correctly evaluates to 0 when student_id is NULL.',
        '4. Order by student_number DESC, and dept_name ASC for alphabetical tie-breaking.'
      ],
      solutionSQL: `SELECT 
    d.dept_name,
    COUNT(s.student_id) AS student_number
FROM Department d
LEFT JOIN Student s
    ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name
ORDER BY student_number DESC, d.dept_name ASC;`,
      lineByLineExplanation: [
        { clause: 'SELECT d.dept_name, COUNT(s.student_id) AS student_number', exp: 'Selects the department name and counts matching non-null student IDs, preserving 0 for empty departments.' },
        { clause: 'FROM Department d LEFT JOIN Student s ON d.dept_id = s.dept_id', exp: 'Outer joins Department to Student so departments with no enrollees are not dropped.' },
        { clause: 'GROUP BY d.dept_id, d.dept_name', exp: 'Groups records per individual department.' },
        { clause: 'ORDER BY student_number DESC, d.dept_name ASC;', exp: 'Sorts by student count descending, breaking ties alphabetically by department name.' }
      ]
    ,
      trapsAndEdgeCases: [
        "The COUNT(*) Outer Join Trap: Writing COUNT(*) counts the NULL placeholder row generated by empty departments, reporting 1 student instead of 0! You MUST write COUNT(s.student_id)."
],
      alternativeSolutions: [
        {
                "name": "Correlated Scalar Count",
                "complexity": "O(D * log S) index seeks",
                "sql": "SELECT d.dept_name,\n       (SELECT COUNT(*) FROM Student s WHERE s.dept_id = d.dept_id) AS student_number\nFROM Department d\nORDER BY student_number DESC, d.dept_name ASC;",
                "explanation": "Avoids outer join grouping by projecting scalar subquery count."
        }
]
    }
  ]
};
