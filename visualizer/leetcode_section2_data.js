// =============================================================================
// LEETCODE 50 SQL ARENA - CONCEPT SECTION 2 DATA
// Concept: Relational Joins & Self-Joins (9 Problems)
// =============================================================================

window.LEETCODE_SECTION_2_DATA = {
  conceptId: 'concept-2',
  conceptNumber: 2,
  title: 'Relational Joins & Self-Joins',
  subtitle: 'Master physical join engines, Venn set mechanics, the ON vs WHERE outer trap, temporal self-joins, and Cartesian matrices across 9 canonical problems.',
  badge: '9 Problems • 100 MCQs • 100 Drills',

  // ---------------------------------------------------------------------------
  // 1. MASTERCLASS CURRICULUM
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
        title: 'The Visual Taxonomy of Joins (Venn Sets & Boundaries)',
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
              <!-- Left circle -->
              <circle cx="60" cy="110" r="40" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
              <!-- Right circle -->
              <circle cx="100" cy="110" r="40" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
              <!-- Intersection Clip -->
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
              <!-- Left circle (Filled) -->
              <circle cx="60" cy="110" r="40" fill="#2563eb" opacity="0.85" stroke="#1d4ed8" stroke-width="1.5"/>
              <!-- Right circle (Outlined) -->
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
              <!-- Left circle filled -->
              <circle cx="60" cy="110" r="40" fill="#f59e0b" opacity="0.85" stroke="#d97706" stroke-width="1.5"/>
              <!-- Mask intersection with white -->
              <path d="M 80 75 A 40 40 0 0 1 80 145 A 40 40 0 0 1 80 75" fill="#ffffff"/>
              <!-- Right circle outline -->
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
              <!-- Left circle filled -->
              <circle cx="60" cy="110" r="40" fill="#10b981" opacity="0.75" stroke="#059669" stroke-width="1.5"/>
              <!-- Right circle filled -->
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
              <!-- Grid representation -->
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
            <!-- Header -->
            <text x="50" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">id (PK)</text>
            <text x="140" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">name</text>
            <line x1="30" y1="85" x2="250" y2="85" stroke="#e2e8f0"/>
            <!-- Row 1 -->
            <rect x="35" y="95" width="210" height="35" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="50" y="117" fill="#166534" font-family="monospace" font-size="12" font-weight="700">1</text>
            <text x="140" y="117" fill="#0f172a" font-size="12">Alice</text>
            <!-- Row 2 -->
            <rect x="35" y="140" width="210" height="35" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="50" y="162" fill="#166534" font-family="monospace" font-size="12" font-weight="700">2</text>
            <text x="140" y="162" fill="#0f172a" font-size="12">Bob</text>
            <!-- Row 3 -->
            <rect x="35" y="185" width="210" height="35" rx="4" fill="#fef2f2" stroke="#fecaca"/>
            <text x="50" y="207" fill="#991b1b" font-family="monospace" font-size="12" font-weight="700">3</text>
            <text x="140" y="207" fill="#0f172a" font-size="12">Charlie</text>

            <!-- Arrows Left to Right -->
            <!-- Alice Match -->
            <path d="M 250 112 Q 285 112, 310 112" fill="none" stroke="#16a34a" stroke-width="2.5" marker-end="url(#matchArrow)"/>
            <!-- Bob Match -->
            <path d="M 250 157 Q 285 157, 310 157" fill="none" stroke="#16a34a" stroke-width="2.5" marker-end="url(#matchArrow)"/>
            <!-- Charlie No Match -->
            <path d="M 250 202 Q 275 202, 290 220" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#nullArrow)"/>

            <!-- Table 2: EmployeeUNI (Right) -->
            <rect x="320" y="20" width="230" height="230" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="320" y="20" width="230" height="35" rx="8" fill="#f8fafc"/>
            <text x="335" y="42" fill="#0f172a" font-size="13" font-weight="700">EmployeeUNI (Right Table)</text>
            <!-- Header -->
            <text x="340" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">id</text>
            <text x="420" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">unique_id</text>
            <line x1="320" y1="85" x2="550" y2="85" stroke="#e2e8f0"/>
            <!-- Row 1 -->
            <rect x="325" y="95" width="220" height="35" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="340" y="117" fill="#166534" font-family="monospace" font-size="12" font-weight="700">1</text>
            <text x="420" y="117" fill="#1d4ed8" font-family="monospace" font-size="12" font-weight="700">101</text>
            <!-- Row 2 -->
            <rect x="325" y="140" width="220" height="35" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="340" y="162" fill="#166534" font-family="monospace" font-size="12" font-weight="700">2</text>
            <text x="420" y="162" fill="#1d4ed8" font-family="monospace" font-size="12" font-weight="700">102</text>
            <!-- Unmatched Indicator -->
            <rect x="325" y="185" width="220" height="45" rx="4" fill="#fffbeb" stroke="#fde68a"/>
            <text x="335" y="205" fill="#b45309" font-size="11" font-weight="700">⚠️ No Row for id: 3</text>
            <text x="335" y="222" fill="#78350f" font-size="10.5">Padded with NULL by LEFT JOIN</text>

            <!-- Arrow Right to Output -->
            <line x1="560" y1="135" x2="600" y2="135" stroke="#2563eb" stroke-width="2.5" marker-end="url(#outArrow)"/>

            <!-- Table 3: Joined Result Buffer -->
            <rect x="610" y="20" width="240" height="230" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
            <rect x="610" y="20" width="240" height="35" rx="8" fill="#eff6ff"/>
            <text x="625" y="42" fill="#1d4ed8" font-size="13" font-weight="700">Final Joined Output</text>
            <!-- Header -->
            <text x="625" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">unique_id</text>
            <text x="735" y="75" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">name</text>
            <line x1="610" y1="85" x2="850" y2="85" stroke="#e2e8f0"/>
            <!-- Result 1 -->
            <rect x="615" y="95" width="230" height="35" rx="4" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="625" y="117" fill="#1d4ed8" font-family="monospace" font-size="12" font-weight="700">101</text>
            <text x="735" y="117" fill="#0f172a" font-size="12">Alice</text>
            <!-- Result 2 -->
            <rect x="615" y="140" width="230" height="35" rx="4" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="625" y="162" fill="#1d4ed8" font-family="monospace" font-size="12" font-weight="700">102</text>
            <text x="735" y="162" fill="#0f172a" font-size="12">Bob</text>
            <!-- Result 3 (NULL) -->
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
        `
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
        id: 'chap-2-6-cheat-sheet',
        number: '2.6',
        title: 'The 60-Second Joins Executive Cheat Sheet',
        content: `
          <p class="lc-p">
            Quick mental reference for technical screenings:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px;">
            <thead>
              <tr style="background: #f8fafc; border-bottom: 2px solid #e4e4e7;">
                <th style="padding: 10px 12px; text-align: left;">Pattern</th>
                <th style="padding: 10px 12px; text-align: left;">Syntax</th>
                <th style="padding: 10px 12px; text-align: left;">When To Use It</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 10px 12px; font-weight: 700;">Anti-Join (Exclusion)</td>
                <td style="padding: 10px 12px; color: #2563eb; font-family: monospace;">A LEFT JOIN B ON A.id = B.id WHERE B.id IS NULL</td>
                <td style="padding: 10px 12px;">Customers who never purchased, visitors with no transactions (LC #1581)</td>
              </tr>
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 10px 12px; font-weight: 700;">Yesterday Offset</td>
                <td style="padding: 10px 12px; color: #2563eb; font-family: monospace;">ON DATEDIFF(w1.date, w2.date) = 1</td>
                <td style="padding: 10px 12px;">Comparing current day against previous calendar day (LC #197)</td>
              </tr>
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 10px 12px; font-weight: 700;">Zero-Count Matrix</td>
                <td style="padding: 10px 12px; color: #2563eb; font-family: monospace;">FROM A CROSS JOIN B LEFT JOIN C ...</td>
                <td style="padding: 10px 12px;">Preserving 0 counts across dimensions (LC #1280)</td>
              </tr>
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 10px 12px; font-weight: 700;">Safe Null Counting</td>
                <td style="padding: 10px 12px; color: #16a34a; font-family: monospace;">COUNT(right_table.col)</td>
                <td style="padding: 10px 12px;">Counts 0 when right side is NULL. <code>COUNT(*)</code> returns 1!</td>
              </tr>
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 10px 12px; font-weight: 700;">Boolean Avg Trick</td>
                <td style="padding: 10px 12px; color: #16a34a; font-family: monospace;">ROUND(IFNULL(AVG(action = 'confirmed'), 0), 2)</td>
                <td style="padding: 10px 12px;">Instant confirmation/success rate calculation (LC #1934)</td>
              </tr>
            </tbody>
          </table>
        `
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
  drills: (() => {
    const list = [];
    const domains = [
      { name: 'Fintech Banking Ledgers', leftTbl: 'Accounts', rightTbl: 'WireTransfers', leftCol: 'account_id', rightCol: 'sender_acct' },
      { name: 'E-Commerce Marketplace', leftTbl: 'Merchants', rightTbl: 'ProductListings', leftCol: 'merchant_id', rightCol: 'seller_id' },
      { name: 'SaaS User Analytics', leftTbl: 'Tenants', rightTbl: 'ActiveSubscriptions', leftCol: 'tenant_id', rightCol: 'org_id' },
      { name: 'Hospitality & Travel', leftTbl: 'Hotels', rightTbl: 'RoomBookings', leftCol: 'hotel_id', rightCol: 'property_id' },
      { name: 'Global Supply Chain', leftTbl: 'Warehouses', rightTbl: 'ShipmentManifests', leftCol: 'warehouse_id', rightCol: 'source_wh' }
    ];

    const drillScenarios = [
      {
        title: 'Preserve Inactive Accounts (Basic Left Join)',
        diff: 'Easy',
        prompt: 'Return all records from {leftTbl} along with their corresponding {rightTbl}. Ensure records with no activity appear with NULL values.',
        sql: 'SELECT a.*, b.* FROM {leftTbl} a LEFT JOIN {rightTbl} b ON a.{leftCol} = b.{rightCol};',
        hint: 'Use a LEFT JOIN from the primary entity table.'
      },
      {
        title: 'Zero Activity Audit (Anti-Join Pattern)',
        diff: 'Easy',
        prompt: 'Identify all records in {leftTbl} that have NEVER generated an entry in {rightTbl}.',
        sql: 'SELECT a.{leftCol} FROM {leftTbl} a LEFT JOIN {rightTbl} b ON a.{leftCol} = b.{rightCol} WHERE b.{rightCol} IS NULL;',
        hint: 'LEFT JOIN combined with WHERE right_table.key IS NULL.'
      },
      {
        title: 'Strict Active Pairs (Inner Join)',
        diff: 'Easy',
        prompt: 'Select only active relationships where an entity in {leftTbl} has at least one confirmed match in {rightTbl}.',
        sql: 'SELECT DISTINCT a.{leftCol} FROM {leftTbl} a INNER JOIN {rightTbl} b ON a.{leftCol} = b.{rightCol};',
        hint: 'INNER JOIN drops all unmatched records on both sides.'
      },
      {
        title: 'Consecutive Day Metric Delta (Self-Join Offset)',
        diff: 'Medium',
        prompt: 'Compare each entity against its own historical record exactly 1 day prior using a self-join with DATEDIFF.',
        sql: 'SELECT t1.{leftCol} FROM {rightTbl} t1 JOIN {rightTbl} t2 ON t1.{leftCol} = t2.{leftCol} AND DATEDIFF(t1.created_at, t2.created_at) = 1 WHERE t1.amount > t2.amount;',
        hint: 'Alias the table as t1 and t2 with DATEDIFF(t1.date, t2.date) = 1.'
      },
      {
        title: 'Cartesian Matrix Multiplier (Cross Join)',
        diff: 'Medium',
        prompt: 'Generate every possible combination of entities between {leftTbl} and regional subject dimensions before aggregating counts.',
        sql: 'SELECT a.{leftCol}, d.dimension_code, COUNT(b.{rightCol}) FROM {leftTbl} a CROSS JOIN Dimensions d LEFT JOIN {rightTbl} b ON a.{leftCol} = b.{rightCol} GROUP BY a.{leftCol}, d.dimension_code;',
        hint: 'CROSS JOIN creates the full universe before LEFT JOINing event counts.'
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

        list.push({
          id: idCount,
          domain: dom.name,
          title: `Drill #${idCount}: ${titleFormatted}`,
          difficulty: sc.diff,
          prompt: promptFormatted,
          solutionSql: sqlFormatted,
          hint: sc.hint
        });
        idCount++;
      });
    }

    return list.slice(0, 100);
  })(),

  // ---------------------------------------------------------------------------
  // 4. THE 9 CANONICAL LEETCODE PROBLEMS (WITH SVG SCHEMAS & INTEL)
  // ---------------------------------------------------------------------------
  problems: [
    {
      id: 1378,
      number: '1378',
      title: 'Replace Employee ID With The Unique Identifier',
      difficulty: 'Easy',
      acceptance: '86.4%',
      companies: ['Amazon', 'Microsoft', 'Bloomberg', 'Google'],
      interviewWeight: 'High (Standard Screening Warmup)',
      description: `
        Table: <code>Employees</code>
        <pre>
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
id is the primary key for this table.
Each row contains the id and the name of an employee.
        </pre>

        Table: <code>EmployeeUNI</code>
        <pre>
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| unique_id     | int     |
+---------------+---------+
(id, unique_id) is the primary key for this table.
Each row contains the id and corresponding unique_id of an employee.
        </pre>

        Write an SQL query to show the <strong>unique ID</strong> of each user. 
        If a user does not have a unique ID replacement, just show <code>null</code>.
        <br><br>
        Return the result table in <strong>any order</strong>.
      `,
      schemaDiagram: {
        title: 'Schema Linkage: Employees LEFT JOIN EmployeeUNI',
        svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="20" width="300" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <rect x="50" y="20" width="300" height="32" rx="8" fill="#f8fafc"/>
          <text x="65" y="42" fill="#0f172a" font-size="12" font-weight="700">Employees (Left Table)</text>
          <text x="70" y="80" fill="#2563eb" font-family="monospace" font-size="11" font-weight="700">id (PK)</text>
          <text x="180" y="80" fill="#64748b" font-family="monospace" font-size="11">name</text>
          <line x1="50" y1="92" x2="350" y2="92" stroke="#e2e8f0"/>
          <text x="70" y="115" fill="#0f172a" font-family="monospace" font-size="11">1, 2, 3, 11, 90</text>
          <text x="180" y="115" fill="#0f172a" font-size="11">Alice, Bob, Meir...</text>

          <!-- Arrow -->
          <path d="M 350 80 Q 440 80, 520 80" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrowDistinct)"/>
          <text x="435" y="70" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="10" font-weight="700">ON e.id = u.id</text>

          <rect x="530" y="20" width="300" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <rect x="530" y="20" width="300" height="32" rx="8" fill="#f8fafc"/>
          <text x="545" y="42" fill="#0f172a" font-size="12" font-weight="700">EmployeeUNI (Right Table)</text>
          <text x="550" y="80" fill="#2563eb" font-family="monospace" font-size="11" font-weight="700">id</text>
          <text x="660" y="80" fill="#16a34a" font-family="monospace" font-size="11" font-weight="700">unique_id</text>
          <line x1="530" y1="92" x2="830" y2="92" stroke="#e2e8f0"/>
          <text x="550" y="115" fill="#0f172a" font-family="monospace" font-size="11">3, 11, 90</text>
          <text x="660" y="115" fill="#16a34a" font-family="monospace" font-size="11">1, 2, 3</text>
          <text x="550" y="145" fill="#dc2626" font-size="10.5">⚠️ IDs 1 and 2 missing ➔ Padded with NULL</text>
        </svg>`
      },
      logicBreakdown: [
        'We must return the unique_id for EVERY user in the Employees table.',
        'Because some users (like Alice and Bob) do not exist in EmployeeUNI, an INNER JOIN would discard them.',
        'A LEFT JOIN starting from Employees guarantees that every employee is preserved, automatically outputting NULL for missing unique_ids.'
      ],
      solutionSql: `SELECT 
    u.unique_id, 
    e.name
FROM Employees e
LEFT JOIN EmployeeUNI u
    ON e.id = u.id;`,
      solutionWalkthrough: [
        { line: 'SELECT u.unique_id, e.name', explain: 'Selects the target unique_id from the right table and name from the left table.' },
        { line: 'FROM Employees e', explain: 'Designates Employees as the driving left table, guaranteeing all employee names survive.' },
        { line: 'LEFT JOIN EmployeeUNI u', explain: 'Pulls in unique_id where available, padding with NULL when no key matches.' },
        { line: '    ON e.id = u.id;', explain: 'Resolves the join on matching employee IDs.' }
      ],
      initialCode: `SELECT 
    u.unique_id, 
    e.name
FROM Employees e
LEFT JOIN EmployeeUNI u
    ON e.id = u.id;`,
      testQuery: `SELECT u.unique_id, e.name FROM Employees e LEFT JOIN EmployeeUNI u ON e.id = u.id;`,
      expectedColumns: ['unique_id', 'name']
    },

    {
      id: 1068,
      number: '1068',
      title: 'Product Sales Analysis I',
      difficulty: 'Easy',
      acceptance: '84.1%',
      companies: ['Amazon', 'Apple', 'Adobe'],
      interviewWeight: 'Medium (Dimension Lookup)',
      description: `
        Table: <code>Sales</code>
        <pre>
+-------------+-------+
| Column Name | Type  |
+-------------+-------+
| sale_id     | int   |
| product_id  | int   |
| year        | int   |
| quantity    | int   |
| price       | int   |
+-------------+-------+
(sale_id, year) is the primary key. product_id is a foreign key to Product.
        </pre>

        Table: <code>Product</code>
        <pre>
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| product_id   | int     |
| product_name | varchar |
+--------------+---------+
product_id is the primary key.
        </pre>

        Write an SQL query that reports the <code>product_name</code>, <code>year</code>, and <code>price</code> for each <code>sale_id</code> in the <code>Sales</code> table.
      `,
      schemaDiagram: {
        title: 'Sales Fact Table JOIN Product Dimension Table',
        svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="20" width="320" height="130" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="65" y="45" fill="#0f172a" font-size="12" font-weight="700">Sales (Fact Table)</text>
          <text x="65" y="75" fill="#2563eb" font-family="monospace" font-size="11">sale_id (PK), product_id (FK), year, price</text>
          <text x="65" y="110" fill="#64748b" font-size="11">Driving stream: contains numeric measures</text>

          <path d="M 370 75 Q 450 75, 500 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowDistinct)"/>

          <rect x="510" y="20" width="320" height="130" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="525" y="45" fill="#0f172a" font-size="12" font-weight="700">Product (Dimension Table)</text>
          <text x="525" y="75" fill="#16a34a" font-family="monospace" font-size="11">product_id (PK), product_name</text>
          <text x="525" y="110" fill="#64748b" font-size="11">Pulls in human-readable name for reporting</text>
        </svg>`
      },
      logicBreakdown: [
        'We need product_name from the Product table alongside year and price from Sales.',
        'Since product_id is a foreign key guaranteed to exist in Product, an INNER JOIN or LEFT JOIN on product_id matches each transaction.'
      ],
      solutionSql: `SELECT 
    p.product_name, 
    s.year, 
    s.price
FROM Sales s
JOIN Product p 
    ON s.product_id = p.product_id;`,
      solutionWalkthrough: [
        { line: 'SELECT p.product_name, s.year, s.price', explain: 'Projects the human-readable product name with transaction details.' },
        { line: 'FROM Sales s', explain: 'Starts from the sales transactions.' },
        { line: 'JOIN Product p ON s.product_id = p.product_id;', explain: 'Looks up the product metadata on matching product_id keys.' }
      ],
      initialCode: `SELECT 
    p.product_name, 
    s.year, 
    s.price
FROM Sales s
JOIN Product p 
    ON s.product_id = p.product_id;`,
      testQuery: `SELECT p.product_name, s.year, s.price FROM Sales s JOIN Product p ON s.product_id = p.product_id;`,
      expectedColumns: ['product_name', 'year', 'price']
    },

    {
      id: 1581,
      number: '1581',
      title: 'Customer Who Visited but Did Not Make Any Transactions',
      difficulty: 'Easy',
      acceptance: '82.8%',
      companies: ['Amazon', 'Apple', 'Google'],
      interviewWeight: 'High (Anti-Join Pattern)',
      description: `
        Table: <code>Visits</code>
        <pre>
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| visit_id    | int     |
| customer_id | int     |
+-------------+---------+
visit_id is the primary key.
        </pre>

        Table: <code>Transactions</code>
        <pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| transaction_id | int     |
| visit_id       | int     |
| amount         | int     |
+----------------+---------+
transaction_id is the primary key.
        </pre>

        Write an SQL query to find the IDs of the users who visited without making any transactions and the number of times they made these types of visits.
      `,
      schemaDiagram: {
        title: 'Anti-Join: Visits without Transactions',
        svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="65" y="45" fill="#0f172a" font-size="12" font-weight="700">Visits Table</text>
          <text x="65" y="75" fill="#2563eb" font-family="monospace" font-size="11">visit_id (PK), customer_id</text>
          <text x="65" y="110" fill="#16a34a" font-size="11">Visit logged whenever customer walks into store</text>

          <path d="M 390 75 Q 450 75, 490 75" fill="none" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrowDistinct)"/>
          <text x="440" y="65" text-anchor="middle" fill="#dc2626" font-size="10" font-weight="700">LEFT JOIN</text>

          <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
          <text x="515" y="45" fill="#0f172a" font-size="12" font-weight="700">Transactions Table</text>
          <text x="515" y="75" fill="#dc2626" font-family="monospace" font-size="11">transaction_id (PK), visit_id</text>
          <rect x="515" y="95" width="300" height="26" rx="4" fill="#fef2f2" stroke="#fecaca"/>
          <text x="525" y="112" fill="#991b1b" font-family="monospace" font-size="10.5" font-weight="700">WHERE t.transaction_id IS NULL</text>
        </svg>`
      },
      logicBreakdown: [
        'A visit without a transaction means visit_id exists in Visits, but has NO matching row in Transactions.',
        'Using a LEFT JOIN, unmatched visits receive NULL for all Transactions columns.',
        'Filter for WHERE t.transaction_id IS NULL to isolate non-purchasing visits, then GROUP BY customer_id and COUNT(*).'
      ],
      solutionSql: `SELECT 
    v.customer_id, 
    COUNT(v.visit_id) AS count_no_trans
FROM Visits v
LEFT JOIN Transactions t
    ON v.visit_id = t.visit_id
WHERE t.transaction_id IS NULL
GROUP BY v.customer_id;`,
      solutionWalkthrough: [
        { line: 'SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans', explain: 'Counts the number of isolated visits per customer.' },
        { line: 'FROM Visits v LEFT JOIN Transactions t ON v.visit_id = t.visit_id', explain: 'Attempts to match each visit to a payment record.' },
        { line: 'WHERE t.transaction_id IS NULL', explain: 'The Anti-Join filter: discards visits that generated a transaction.' },
        { line: 'GROUP BY v.customer_id;', explain: 'Aggregates the total empty visits per individual customer.' }
      ],
      initialCode: `SELECT 
    v.customer_id, 
    COUNT(v.visit_id) AS count_no_trans
FROM Visits v
LEFT JOIN Transactions t
    ON v.visit_id = t.visit_id
WHERE t.transaction_id IS NULL
GROUP BY v.customer_id;`,
      testQuery: `SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans FROM Visits v LEFT JOIN Transactions t ON v.visit_id = t.visit_id WHERE t.transaction_id IS NULL GROUP BY v.customer_id;`,
      expectedColumns: ['customer_id', 'count_no_trans']
    },

    {
      id: 197,
      number: '197',
      title: 'Rising Temperature',
      difficulty: 'Easy',
      acceptance: '46.2%',
      companies: ['Amazon', 'Bloomberg', 'Facebook / Meta', 'Google', 'Uber'],
      interviewWeight: 'Very High (Canonical Self-Join Offset)',
      description: `
        Table: <code>Weather</code>
        <pre>
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| recordDate    | date    |
| temperature   | int     |
+---------------+---------+
id is the primary key. There are no different rows with the same recordDate.
        </pre>

        Write an SQL query to find all dates' <code>Id</code> with higher temperatures compared to its <strong>previous dates (yesterday)</strong>.
      `,
      schemaDiagram: {
        title: 'Weather Table Self-Join on 1-Day Temporal Delta',
        svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
          <text x="65" y="45" fill="#1d4ed8" font-size="12" font-weight="700">Weather w1 (Today)</text>
          <text x="65" y="75" fill="#0f172a" font-family="monospace" font-size="11">id, recordDate, temperature</text>
          <text x="65" y="110" fill="#16a34a" font-size="11">Tests if temperature is strictly higher</text>

          <path d="M 390 75 Q 450 75, 490 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowDistinct)"/>
          <text x="440" y="65" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="9.5">DATEDIFF=1</text>

          <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>
          <text x="515" y="45" fill="#334155" font-size="12" font-weight="700">Weather w2 (Yesterday)</text>
          <text x="515" y="75" fill="#0f172a" font-family="monospace" font-size="11">id, recordDate, temperature</text>
          <text x="515" y="110" fill="#64748b" font-size="11">Serves as baseline comparison value</text>
        </svg>`
      },
      logicBreakdown: [
        'A single row cannot look backward to another row without a window function or a self-join.',
        'Join Weather w1 to Weather w2 on DATEDIFF(w1.recordDate, w2.recordDate) = 1.',
        'Add the filter WHERE w1.temperature > w2.temperature to return w1.id.'
      ],
      solutionSql: `SELECT 
    w1.id
FROM Weather w1
JOIN Weather w2
    ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;`,
      solutionWalkthrough: [
        { line: 'SELECT w1.id', explain: 'Returns the ID of today, the day when the temperature rose.' },
        { line: 'FROM Weather w1 JOIN Weather w2', explain: 'Instantiates two virtual copies of Weather in memory.' },
        { line: 'ON DATEDIFF(w1.recordDate, w2.recordDate) = 1', explain: 'Aligns today (w1) with exactly yesterday (w2).' },
        { line: 'WHERE w1.temperature > w2.temperature;', explain: 'Filters for days where today is strictly hotter than yesterday.' }
      ],
      initialCode: `SELECT 
    w1.id
FROM Weather w1
JOIN Weather w2
    ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;`,
      testQuery: `SELECT w1.id FROM Weather w1 JOIN Weather w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1 WHERE w1.temperature > w2.temperature;`,
      expectedColumns: ['id']
    },

    {
      id: 1661,
      number: '1661',
      title: 'Average Time of Process per Machine',
      difficulty: 'Easy',
      acceptance: '71.5%',
      companies: ['Amazon', 'Facebook / Meta', 'Google'],
      interviewWeight: 'High (Event Pair Delta)',
      description: `
        Table: <code>Activity</code>
        <pre>
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| machine_id     | int     |
| process_id     | int     |
| activity_type  | enum    |
| timestamp      | float   |
+----------------+---------+
(machine_id, process_id, activity_type) is the primary key.
activity_type is an ENUM of type ('start', 'end').
        </pre>

        There is a factory website that has several machines each running the same number of processes. 
        Write an SQL query to find the <strong>average time</strong> each machine takes to complete a process.
        The time to complete a process is <code>'end' timestamp - 'start' timestamp</code>. 
        The resulting table should have the <code>machine_id</code> and the average time as <code>processing_time</code> rounded to <strong>3 decimal places</strong>.
      `,
      schemaDiagram: {
        title: 'Activity Self-Join Pairing "start" and "end" timestamps',
        svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="65" y="45" fill="#0f172a" font-size="12" font-weight="700">Activity a1 (start)</text>
          <text x="65" y="75" fill="#2563eb" font-family="monospace" font-size="11">machine_id, process_id, timestamp</text>
          <text x="65" y="105" fill="#64748b" font-size="11">Filtered for activity_type = 'start'</text>

          <path d="M 390 75 Q 450 75, 490 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowDistinct)"/>

          <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="515" y="45" fill="#0f172a" font-size="12" font-weight="700">Activity a2 (end)</text>
          <text x="515" y="75" fill="#16a34a" font-family="monospace" font-size="11">machine_id, process_id, timestamp</text>
          <text x="515" y="105" fill="#64748b" font-size="11">Delta = a2.timestamp - a1.timestamp</text>
        </svg>`
      },
      logicBreakdown: [
        'Processes are split across two rows: one for start and one for end.',
        'Join Activity a1 to Activity a2 on machine_id and process_id, specifying a1.activity_type = "start" and a2.activity_type = "end".',
        'Compute the elapsed time as a2.timestamp - a1.timestamp, group by machine_id, and take ROUND(AVG(...), 3).'
      ],
      solutionSql: `SELECT 
    a1.machine_id,
    ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time
FROM Activity a1
JOIN Activity a2
    ON a1.machine_id = a2.machine_id
   AND a1.process_id = a2.process_id
   AND a1.activity_type = 'start'
   AND a2.activity_type = 'end'
GROUP BY a1.machine_id;`,
      solutionWalkthrough: [
        { line: 'SELECT a1.machine_id, ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time', explain: 'Computes the mean elapsed seconds rounded to 3 decimal places.' },
        { line: 'FROM Activity a1 JOIN Activity a2', explain: 'Pairs start and end timestamps into a single unified row in memory.' },
        { line: '    ON a1.machine_id = a2.machine_id AND a1.process_id = a2.process_id', explain: 'Ensures the process belonging to the exact same machine is compared.' },
        { line: '   AND a1.activity_type = "start" AND a2.activity_type = "end"', explain: 'Guarantees subtraction direction is end minus start.' },
        { line: 'GROUP BY a1.machine_id;', explain: 'Aggregates the averages across each individual factory machine.' }
      ],
      initialCode: `SELECT 
    a1.machine_id,
    ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time
FROM Activity a1
JOIN Activity a2
    ON a1.machine_id = a2.machine_id
   AND a1.process_id = a2.process_id
   AND a1.activity_type = 'start'
   AND a2.activity_type = 'end'
GROUP BY a1.machine_id;`,
      testQuery: `SELECT a1.machine_id, ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time FROM Activity a1 JOIN Activity a2 ON a1.machine_id = a2.machine_id AND a1.process_id = a2.process_id AND a1.activity_type = 'start' AND a2.activity_type = 'end' GROUP BY a1.machine_id;`,
      expectedColumns: ['machine_id', 'processing_time']
    },

    {
      id: 577,
      number: '577',
      title: 'Employee Bonus',
      difficulty: 'Easy',
      acceptance: '74.5%',
      companies: ['Amazon', 'Bloomberg', 'Microsoft'],
      interviewWeight: 'Medium (Outer Join NULL Evaluation)',
      description: `
        Table: <code>Employee</code>
        <pre>
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| empId       | int     |
| name        | varchar |
| supervisor  | int     |
| salary      | int     |
+-------------+---------+
empId is the primary key.
        </pre>

        Table: <code>Bonus</code>
        <pre>
+-------------+------+
| Column Name | Type |
+-------------+------+
| empId       | int  |
| bonus       | int  |
+-------------+------+
empId is the foreign key.
        </pre>

        Write an SQL query to report the name and bonus amount of each employee with a bonus <strong>less than 1000</strong>.
        Employees who received <strong>no bonus at all</strong> should also be included!
      `,
      schemaDiagram: {
        title: 'Employee LEFT JOIN Bonus with NULL Fallback',
        svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="65" y="45" fill="#0f172a" font-size="12" font-weight="700">Employee Table</text>
          <text x="65" y="75" fill="#2563eb" font-family="monospace" font-size="11">empId (PK), name, salary</text>
          <text x="65" y="105" fill="#16a34a" font-size="11">Every employee must be checked</text>

          <path d="M 390 75 Q 450 75, 490 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowDistinct)"/>

          <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="515" y="45" fill="#0f172a" font-size="12" font-weight="700">Bonus Table</text>
          <text x="515" y="75" fill="#16a34a" font-family="monospace" font-size="11">empId (FK), bonus</text>
          <rect x="515" y="95" width="300" height="26" rx="4" fill="#fffbeb" stroke="#fde68a"/>
          <text x="525" y="112" fill="#b45309" font-family="monospace" font-size="10.5" font-weight="700">WHERE b.bonus &lt; 1000 OR b.bonus IS NULL</text>
        </svg>`
      },
      logicBreakdown: [
        'A candidate who writes WHERE b.bonus < 1000 will fail hidden test cases because employees with no bonus have NULL bonus, which evaluates to UNKNOWN.',
        'Perform a LEFT JOIN from Employee to Bonus.',
        'In the WHERE clause, include both conditions: WHERE b.bonus < 1000 OR b.bonus IS NULL (or IFNULL(b.bonus, 0) < 1000).'
      ],
      solutionSql: `SELECT 
    e.name, 
    b.bonus
FROM Employee e
LEFT JOIN Bonus b
    ON e.empId = b.empId
WHERE b.bonus < 1000 
   OR b.bonus IS NULL;`,
      solutionWalkthrough: [
        { line: 'SELECT e.name, b.bonus', explain: 'Projects employee name and their corresponding bonus value.' },
        { line: 'FROM Employee e LEFT JOIN Bonus b ON e.empId = b.empId', explain: 'Preserves all employees even if they were never awarded a bonus.' },
        { line: 'WHERE b.bonus < 1000 OR b.bonus IS NULL;', explain: 'Defensive 3VL filter: prevents NULL bonus employees from being dropped.' }
      ],
      initialCode: `SELECT 
    e.name, 
    b.bonus
FROM Employee e
LEFT JOIN Bonus b
    ON e.empId = b.empId
WHERE b.bonus < 1000 
   OR b.bonus IS NULL;`,
      testQuery: `SELECT e.name, b.bonus FROM Employee e LEFT JOIN Bonus b ON e.empId = b.empId WHERE b.bonus < 1000 OR b.bonus IS NULL;`,
      expectedColumns: ['name', 'bonus']
    },

    {
      id: 1280,
      number: '1280',
      title: 'Students and Examinations',
      difficulty: 'Easy',
      acceptance: '53.6%',
      companies: ['Amazon', 'Apple', 'Facebook / Meta', 'Google', 'Microsoft'],
      interviewWeight: 'Very High (Cartesian Matrix Generation)',
      description: `
        Table: <code>Students</code>
        <pre>
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| student_id    | int     |
| student_name  | varchar |
+---------------+---------+
student_id is the primary key.
        </pre>

        Table: <code>Subjects</code>
        <pre>
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| subject_name | varchar |
+--------------+---------+
subject_name is the primary key.
        </pre>

        Table: <code>Examinations</code>
        <pre>
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| student_id   | int     |
| subject_name | varchar |
+--------------+---------+
There is no primary key for this table. It may contain duplicates.
        </pre>

        Write an SQL query to find the number of times each student attended each exam.
        Return the result table ordered by <code>student_id</code> and <code>subject_name</code>.
      `,
      schemaDiagram: {
        title: 'Two-Step Join: CROSS JOIN Matrix + LEFT JOIN Occurrences',
        svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="20" width="220" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="65" y="45" fill="#0f172a" font-size="12" font-weight="700">Students Table</text>
          <text x="65" y="75" fill="#2563eb" font-family="monospace" font-size="11">student_id (PK)</text>

          <text x="285" y="95" fill="#6366f1" font-size="20" font-weight="700">CROSS</text>

          <rect x="340" y="20" width="220" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="355" y="45" fill="#0f172a" font-size="12" font-weight="700">Subjects Table</text>
          <text x="355" y="75" fill="#6d28d9" font-family="monospace" font-size="11">subject_name (PK)</text>

          <path d="M 560 90 Q 600 90, 630 90" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowDistinct)"/>

          <rect x="640" y="20" width="200" height="140" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
          <text x="655" y="45" fill="#166534" font-size="12" font-weight="700">Examinations</text>
          <text x="655" y="75" fill="#16a34a" font-family="monospace" font-size="11">LEFT JOIN on both</text>
          <text x="655" y="105" fill="#0f172a" font-family="monospace" font-size="11">COUNT(e.subject_name)</text>
        </svg>`
      },
      logicBreakdown: [
        'Every student must appear with every subject, even if they attended 0 exams.',
        'Step 1: Students CROSS JOIN Subjects generates the complete Cartesian grid of all student-subject pairs.',
        'Step 2: LEFT JOIN Examinations on student_id AND subject_name.',
        'Step 3: GROUP BY s.student_id, sub.subject_name and use COUNT(e.subject_name) so unrepresented exams evaluate to 0 instead of 1.'
      ],
      solutionSql: `SELECT 
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
      solutionWalkthrough: [
        { line: 'SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams', explain: 'Projects student identification, subject, and non-null exam counts.' },
        { line: 'FROM Students s CROSS JOIN Subjects sub', explain: 'The Cartesian Matrix: generates every possible combination of student and course.' },
        { line: 'LEFT JOIN Examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name', explain: 'Matches real attendance records while preserving 0-attendance rows.' },
        { line: 'GROUP BY s.student_id, s.student_name, sub.subject_name', explain: 'Collapses multiple exam attendances into a single count per pair.' },
        { line: 'ORDER BY s.student_id, sub.subject_name;', explain: 'Sorts as requested by the problem specification.' }
      ],
      initialCode: `SELECT 
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
      testQuery: `SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams FROM Students s CROSS JOIN Subjects sub LEFT JOIN Examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name GROUP BY s.student_id, s.student_name, sub.subject_name ORDER BY s.student_id, sub.subject_name;`,
      expectedColumns: ['student_id', 'student_name', 'subject_name', 'attended_exams']
    },

    {
      id: 570,
      number: '570',
      title: 'Managers with at Least 5 Direct Reports',
      difficulty: 'Medium',
      acceptance: '64.8%',
      companies: ['Amazon', 'Apple', 'Bloomberg', 'Google'],
      interviewWeight: 'High (Self-Referential Hierarchy)',
      description: `
        Table: <code>Employee</code>
        <pre>
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| department  | varchar |
| managerId   | int     |
+-------------+---------+
id is the primary key.
Each row indicates the name of an employee, department, and the id of their manager.
If managerId is null, the employee does not have a manager.
        </pre>

        Write an SQL query to report the <strong>managers with at least five direct reports</strong>.
        Return the result table in any order.
      `,
      schemaDiagram: {
        title: 'Manager-Employee Self-Referential Hierarchy Matching',
        svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="65" y="45" fill="#0f172a" font-size="12" font-weight="700">Employee e (Direct Report)</text>
          <text x="65" y="75" fill="#2563eb" font-family="monospace" font-size="11">id, name, managerId</text>
          <text x="65" y="105" fill="#64748b" font-size="11">Points to boss via managerId</text>

          <path d="M 390 75 Q 450 75, 490 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowDistinct)"/>
          <text x="440" y="65" text-anchor="middle" fill="#2563eb" font-family="monospace" font-size="9.5">e.managerId = m.id</text>

          <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
          <text x="515" y="45" fill="#1d4ed8" font-size="12" font-weight="700">Employee m (Manager)</text>
          <text x="515" y="75" fill="#1d4ed8" font-family="monospace" font-size="11">id, name</text>
          <rect x="515" y="95" width="300" height="26" rx="4" fill="#f0fdf4" stroke="#86efac"/>
          <text x="525" y="112" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">HAVING COUNT(e.id) &gt;= 5</text>
        </svg>`
      },
      logicBreakdown: [
        'Employees report to managers using managerId, which points to another row\'s id.',
        'Join Employee e (subordinate) to Employee m (manager) on e.managerId = m.id.',
        'Group by m.id (and m.name) and filter with HAVING COUNT(e.id) >= 5.'
      ],
      solutionSql: `SELECT 
    m.name
FROM Employee e
JOIN Employee m
    ON e.managerId = m.id
GROUP BY m.id, m.name
HAVING COUNT(e.id) >= 5;`,
      solutionWalkthrough: [
        { line: 'SELECT m.name', explain: 'Projects the manager\'s name.' },
        { line: 'FROM Employee e JOIN Employee m ON e.managerId = m.id', explain: 'Links subordinates to their direct manager in the same table.' },
        { line: 'GROUP BY m.id, m.name', explain: 'Aggregates direct reports around each distinct manager.' },
        { line: 'HAVING COUNT(e.id) >= 5;', explain: 'Filters for managers supervising 5 or more team members.' }
      ],
      initialCode: `SELECT 
    m.name
FROM Employee e
JOIN Employee m
    ON e.managerId = m.id
GROUP BY m.id, m.name
HAVING COUNT(e.id) >= 5;`,
      testQuery: `SELECT m.name FROM Employee e JOIN Employee m ON e.managerId = m.id GROUP BY m.id, m.name HAVING COUNT(e.id) >= 5;`,
      expectedColumns: ['name']
    },

    {
      id: 1934,
      number: '1934',
      title: 'Confirmation Rate',
      difficulty: 'Medium',
      acceptance: '61.7%',
      companies: ['Amazon', 'Bloomberg', 'Facebook / Meta', 'Google', 'Uber'],
      interviewWeight: 'Very High (Outer Join Conditional Mean)',
      description: `
        Table: <code>Signups</code>
        <pre>
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| user_id        | int      |
| time_stamp     | datetime |
+----------------+----------+
user_id is the primary key.
        </pre>

        Table: <code>Confirmations</code>
        <pre>
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| user_id        | int      |
| time_stamp     | datetime |
| action         | ENUM     |
+----------------+----------+
(user_id, time_stamp) is the primary key.
action is an ENUM of ('confirmed', 'timeout')
        </pre>

        The <strong>confirmation rate</strong> of a user is the number of <code>'confirmed'</code> messages divided by the total number of requested confirmation messages.
        The confirmation rate of a user that did not request any confirmation messages is <code>0</code>. 
        Round the confirmation rate to <strong>two decimal places</strong>.
        <br><br>
        Write an SQL query to find the confirmation rate of each user.
      `,
      schemaDiagram: {
        title: 'Signups LEFT JOIN Confirmations with Boolean Mean',
        svg: `<svg viewBox="0 0 880 180" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="65" y="45" fill="#0f172a" font-size="12" font-weight="700">Signups (All Users)</text>
          <text x="65" y="75" fill="#2563eb" font-family="monospace" font-size="11">user_id (PK)</text>
          <text x="65" y="105" fill="#16a34a" font-size="11">Guarantees 0-rate users appear!</text>

          <path d="M 390 75 Q 450 75, 490 75" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowDistinct)"/>

          <rect x="500" y="20" width="340" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="515" y="45" fill="#0f172a" font-size="12" font-weight="700">Confirmations (Events)</text>
          <text x="515" y="75" fill="#64748b" font-family="monospace" font-size="11">user_id, action ('confirmed' | 'timeout')</text>
          <rect x="515" y="95" width="300" height="26" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
          <text x="525" y="112" fill="#1d4ed8" font-family="monospace" font-size="10.5" font-weight="700">ROUND(IFNULL(AVG(action = 'confirmed'), 0), 2)</text>
        </svg>`
      },
      logicBreakdown: [
        'Users who never requested a confirmation must appear in the output with a rate of 0.00. This mandates a LEFT JOIN from Signups.',
        'In MySQL, action = "confirmed" evaluates to 1 when true and 0 when false. For users with no rows, AVG yields NULL.',
        'Wrap with IFNULL(..., 0) and round to 2 decimal places.'
      ],
      solutionSql: `SELECT 
    s.user_id,
    ROUND(IFNULL(AVG(c.action = 'confirmed'), 0), 2) AS confirmation_rate
FROM Signups s
LEFT JOIN Confirmations c
    ON s.user_id = c.user_id
GROUP BY s.user_id;`,
      solutionWalkthrough: [
        { line: 'SELECT s.user_id, ROUND(IFNULL(AVG(c.action = "confirmed"), 0), 2) AS confirmation_rate', explain: 'Computes the fraction of confirmed messages, falling back to 0.00 for inactive users.' },
        { line: 'FROM Signups s LEFT JOIN Confirmations c ON s.user_id = c.user_id', explain: 'Retains every registered user regardless of confirmation activity.' },
        { line: 'GROUP BY s.user_id;', explain: 'Aggregates statistics per individual user.' }
      ],
      initialCode: `SELECT 
    s.user_id,
    ROUND(IFNULL(AVG(c.action = 'confirmed'), 0), 2) AS confirmation_rate
FROM Signups s
LEFT JOIN Confirmations c
    ON s.user_id = c.user_id
GROUP BY s.user_id;`,
      testQuery: `SELECT s.user_id, ROUND(IFNULL(AVG(c.action = 'confirmed'), 0), 2) AS confirmation_rate FROM Signups s LEFT JOIN Confirmations c ON s.user_id = c.user_id GROUP BY s.user_id;`,
      expectedColumns: ['user_id', 'confirmation_rate']
    }
  ]
};
