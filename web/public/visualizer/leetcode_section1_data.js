// =============================================================================
// LEETCODE SQL 50 ARENA - CONCEPT SECTION 1 DATA (INTUITIVE & BEAUTIFULLY FORMATTED)
// Concept 1: Filtering & Three-Valued Logic (WHERE, NULL, and Predicates)
// =============================================================================

window.LEETCODE_SECTION_1_DATA = (() => {

  const masterclass = {
    conceptId: 'concept-1',
    title: 'Filtering & Three-Valued Logic Masterclass',
    subtitle: 'Learn how the database really filters rows, why NULL is not zero, and how to avoid silent data loss in technical interviews.',
    keyTakeaway: 'The WHERE clause acts like a strict bouncer at a nightclub door: it only lets rows in if their pass evaluates to strictly TRUE. If a row evaluates to FALSE or UNKNOWN (NULL), it is discarded on the spot.',

    chapters: [
      {
        id: 'chap-1-exec-order',
        number: '1.1',
        title: 'How SQL Executes Your Query (The 8-Step Assembly Line)',
        content: `
          <p class="lc-p">
            When you read an SQL query, it looks like a natural English sentence:
            <code class="lc-code-pill">SELECT name, salary FROM Employees WHERE salary &gt; 50000;</code>
            Because you read <strong>SELECT</strong> first, your brain naturally assumes the database picks the columns first.
          </p>

          <p class="lc-p">
            <strong>The database does the exact opposite!</strong> Think of the database as a chef making a salad:
          </p>

          <div class="lc-rule-banner">
            <strong>The Kitchen Analogy:</strong><br>
            1. First, the chef grabs the raw vegetables from the refrigerator (<code class="lc-code-pill">FROM</code>).<br>
            2. Next, the chef washes and throws away rotten tomatoes (<code class="lc-code-pill">WHERE</code>).<br>
            3. Only at the very end does the chef chop them into a bowl, arrange the presentation, and serve (<code class="lc-code-pill">SELECT</code>).
          </div>

          <p class="lc-p">
            Here is the physical order the SQL engine runs internally every single time:
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin: 16px 0;">
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
              <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #2563eb;">STEP 1: FROM &amp; JOIN</span>
              <div style="font-weight: 600; font-size: 13px; color: #18181b; margin-top: 2px;">Load Raw Tables</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Pulls raw table pages from storage.</div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #2563eb; border-radius: 6px; padding: 12px;">
              <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #2563eb;">STEP 2: WHERE (Filter)</span>
              <div style="font-weight: 600; font-size: 13px; color: #18181b; margin-top: 2px;">Discard Bad Rows</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Tests your condition on every row.</div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
              <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #64748b;">STEP 3: GROUP BY</span>
              <div style="font-weight: 600; font-size: 13px; color: #18181b; margin-top: 2px;">Bucket Rows</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Groups remaining rows by key.</div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
              <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #64748b;">STEP 4: HAVING</span>
              <div style="font-weight: 600; font-size: 13px; color: #18181b; margin-top: 2px;">Filter Buckets</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Checks aggregate thresholds.</div>
            </div>

            <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 12px;">
              <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #166534;">STEP 5: SELECT</span>
              <div style="font-weight: 600; font-size: 13px; color: #18181b; margin-top: 2px;">Pick &amp; Name Columns</div>
              <div style="font-size: 12px; color: #166534; margin-top: 4px;">Calculates math and assigns aliases.</div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
              <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #64748b;">STEP 6: ORDER BY</span>
              <div style="font-weight: 600; font-size: 13px; color: #18181b; margin-top: 2px;">Sort Output</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Orders rows A-Z or High-Low.</div>
            </div>
          </div>

          <div class="lc-callout-card warning" style="margin-top: 14px;">
            <div class="lc-callout-title">
              <span>⚠️</span>
              <span>Why Aliases Fail in WHERE (The #1 Interview Stumble)</span>
            </div>
            <div class="lc-callout-body">
              Imagine you write: <code class="lc-code-pill">SELECT price * quantity AS total_cost FROM Sales WHERE total_cost &gt; 100;</code><br>
              This query crashes with: <em>"Unknown column 'total_cost' in where clause"</em>.<br><br>
              <strong>Why?</strong> The label tag <code class="lc-code-pill">total_cost</code> is only created at <strong>Step 5 (SELECT)</strong>. But <strong>Step 2 (WHERE)</strong> runs before Step 5 even begins! When Step 2 asks for "total_cost", that label does not exist in memory yet. You must write: <code class="lc-code-pill">WHERE price * quantity &gt; 100</code>.
            </div>
          </div>
        `,
        diagram: {
          id: 'diag-exec-pipeline',
          title: 'Visual Flow: Raw Rows Streaming Through The Filter Gate',
          svg: `<svg viewBox="0 0 880 220" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
              </marker>
            </defs>

            <!-- Box 1: Storage -->
            <rect x="20" y="30" width="220" height="160" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="35" y="45" width="105" height="22" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="43" y="60" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">1. FROM &amp; JOIN</text>
            <text x="35" y="92" fill="#0f172a" font-size="14" font-weight="700">Raw Table Data</text>
            <text x="35" y="115" fill="#64748b" font-size="12">Reads all candidate records from disk into RAM.</text>
            <rect x="35" y="145" width="120" height="26" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
            <text x="45" y="162" fill="#2563eb" font-family="monospace" font-size="11" font-weight="600">📥 1,000 Rows In</text>

            <!-- Arrow 1 to 2 -->
            <line x1="245" y1="110" x2="305" y2="110" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead)"/>

            <!-- Box 2: Filter Gate -->
            <rect x="315" y="15" width="270" height="190" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
            <rect x="330" y="30" width="130" height="22" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="338" y="45" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">2. WHERE (Filter Gate)</text>
            <text x="330" y="78" fill="#0f172a" font-size="14" font-weight="700">Tests Condition Per Row</text>
            <text x="330" y="105" fill="#dc2626" font-size="12" font-weight="600">❌ FALSE ➔ Dropped</text>
            <text x="330" y="128" fill="#d97706" font-size="12" font-weight="600">⚠️ UNKNOWN (NULL) ➔ Dropped</text>
            <text x="330" y="150" fill="#16a34a" font-size="12" font-weight="600">✅ TRUE ➔ Kept &amp; Passed Through</text>
            <rect x="330" y="165" width="210" height="24" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
            <text x="340" y="181" fill="#475569" font-family="monospace" font-size="11">Only TRUE rows survive</text>

            <!-- Arrow 2 to 3 -->
            <line x1="590" y1="110" x2="650" y2="110" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowhead)"/>

            <!-- Box 3: Projection -->
            <rect x="660" y="30" width="200" height="160" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <rect x="675" y="45" width="90" height="22" rx="4" fill="#f0fdf4" stroke="#bbf7d0"/>
            <text x="683" y="60" fill="#15803d" font-family="monospace" font-size="11" font-weight="700">5. SELECT</text>
            <text x="675" y="92" fill="#0f172a" font-size="14" font-weight="700">Final Columns</text>
            <text x="675" y="115" fill="#64748b" font-size="12">Picks the requested fields and renames aliases.</text>
            <rect x="675" y="145" width="130" height="26" rx="4" fill="#ffffff" stroke="#bbf7d0"/>
            <text x="685" y="162" fill="#16a34a" font-family="monospace" font-size="11" font-weight="600">📤 42 Surviving Rows</text>
          </svg>`
        }
      },

      {
        id: 'chap-2-3vl-logic',
        number: '1.2',
        title: 'The Mystery of NULL: Why NULL is NOT Zero or Blank',
        content: `
          <p class="lc-p">
            In everyday programming (JavaScript, Python), a variable is usually either truthy or falsy. In SQL, however, there is a third state called <strong>UNKNOWN</strong>.
          </p>

          <div class="lc-rule-banner">
            <strong>The Core Intuition:</strong><br>
            <code>NULL</code> does not mean zero (0), and it does not mean empty text ("").<br>
            <code>NULL</code> means: <strong>"We do not know what the value is."</strong>
          </div>

          <p class="lc-p">
            Imagine two strangers in a room: Alex and Brian. You do not know Alex's age (<code>NULL</code>), and you do not know Brian's age (<code>NULL</code>).
          </p>

          <p class="lc-p">
            If someone asks you: <em>"Is Alex the same age as Brian?"</em> &mdash; what do you answer?<br>
            &bull; Can you say <strong>YES (TRUE)</strong>? No, they might be different ages.<br>
            &bull; Can you say <strong>NO (FALSE)</strong>? No, they might happen to be the exact same age.<br>
            &bull; The only honest answer is: <strong>"I DO NOT KNOW" (UNKNOWN)</strong>!
          </p>

          <p class="lc-p">
            That is why in SQL, <code class="lc-code-pill">NULL = NULL</code> does <strong>NOT</strong> equal TRUE. It equals <strong>UNKNOWN</strong>!
          </p>

          <div class="lc-sub-header">
            <span>🚪</span>
            <span>The Nightclub Bouncer Rule: How WHERE Treats UNKNOWN</span>
          </div>

          <p class="lc-p">
            Think of the <code class="lc-code-pill">WHERE</code> clause as a nightclub bouncer guarding the VIP door:
          </p>
          <ul style="margin: 0 0 16px 20px; line-height: 1.8; color: var(--text-secondary);">
            <li>If your condition says <strong>TRUE</strong> &rarr; The bouncer lets the row through.</li>
            <li>If your condition says <strong>FALSE</strong> &rarr; The bouncer turns the row away.</li>
            <li>If your condition says <strong>UNKNOWN</strong> &rarr; <strong>The bouncer ALSO turns the row away!</strong></li>
          </ul>

          <div class="lc-callout-card danger">
            <div class="lc-callout-title">
              <span>🚨</span>
              <span>The LeetCode #584 Trap: Why Innocent Customers Disappear</span>
            </div>
            <div class="lc-callout-body">
              LeetCode #584 asks: <em>"Find customer names who were NOT referred by customer #2."</em><br><br>
              Most candidates immediately write: <code class="lc-code-pill">WHERE referee_id != 2</code><br><br>
              <strong>Why does this fail?</strong><br>
              Imagine customer Will has no referee (<code class="lc-code-pill">referee_id IS NULL</code>).<br>
              The query checks: <code class="lc-code-pill">NULL != 2</code> &rarr; Evaluates to <strong>UNKNOWN</strong>!<br>
              The WHERE bouncer sees UNKNOWN and throws Will out of the results! Will was never referred by #2, but he vanished.<br><br>
              <strong>The Fix:</strong> Always protect against NULLs explicitly:<br>
              <code class="lc-code-pill">WHERE referee_id != 2 OR referee_id IS NULL;</code>
            </div>
          </div>
        `,
        diagram: {
          id: 'diag-3vl-table',
          title: 'Three-Valued Logic Truth Table: What Happens When Conditions Run',
          svg: `<svg viewBox="0 0 880 230" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="15" width="840" height="200" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="35" y="42" fill="#0f172a" font-size="13" font-weight="700">THREE-VALUED LOGIC (3VL) EVALUATION MATRIX</text>
            
            <rect x="35" y="55" width="810" height="28" fill="#f8fafc" rx="4"/>
            <text x="45" y="73" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">ROW VALUE</text>
            <text x="240" y="73" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">YOUR CONDITION</text>
            <text x="480" y="73" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">EVALUATION</text>
            <text x="680" y="73" fill="#64748b" font-family="monospace" font-size="11" font-weight="700">SURVIVES WHERE?</text>

            <!-- Row 1 -->
            <line x1="35" y1="92" x2="845" y2="92" stroke="#f1f5f9"/>
            <text x="45" y="112" fill="#0f172a" font-family="monospace" font-size="11.5">referee_id = 1</text>
            <text x="240" y="112" fill="#2563eb" font-family="monospace" font-size="11.5">referee_id != 2</text>
            <text x="480" y="112" fill="#16a34a" font-family="monospace" font-size="12" font-weight="700">TRUE</text>
            <rect x="680" y="98" width="100" height="22" rx="4" fill="#f0fdf4" stroke="#86efac"/>
            <text x="692" y="113" fill="#15803d" font-size="11" font-weight="600">✅ Kept</text>

            <!-- Row 2 -->
            <line x1="35" y1="130" x2="845" y2="130" stroke="#f1f5f9"/>
            <text x="45" y="148" fill="#0f172a" font-family="monospace" font-size="11.5">referee_id = 2</text>
            <text x="240" y="148" fill="#2563eb" font-family="monospace" font-size="11.5">referee_id != 2</text>
            <text x="480" y="148" fill="#dc2626" font-family="monospace" font-size="12" font-weight="700">FALSE</text>
            <rect x="680" y="134" width="100" height="22" rx="4" fill="#fef2f2" stroke="#fecaca"/>
            <text x="692" y="149" fill="#991b1b" font-size="11" font-weight="600">❌ Dropped</text>

            <!-- Row 3 (TRAP) -->
            <rect x="35" y="162" width="810" height="38" rx="4" fill="#fffbeb" stroke="#fde68a"/>
            <text x="45" y="186" fill="#92400e" font-family="monospace" font-size="11.5" font-weight="700">referee_id = NULL</text>
            <text x="240" y="186" fill="#2563eb" font-family="monospace" font-size="11.5">referee_id != 2</text>
            <text x="480" y="186" fill="#d97706" font-family="monospace" font-size="12" font-weight="700">UNKNOWN</text>
            <rect x="680" y="170" width="150" height="22" rx="4" fill="#fef2f2" stroke="#fecaca"/>
            <text x="688" y="185" fill="#991b1b" font-size="11" font-weight="700">❌ Silently Dropped!</text>
          </svg>`
        }
      },

      {
        id: 'chap-3-sargability',
        number: '1.3',
        title: 'Making Queries 1,000x Faster: The Art of Sargability',
        content: `
          <p class="lc-p">
            Anyone can write a query that works on 5 rows. But what happens when your table has <strong>10,000,000 rows</strong> in production?
          </p>

          <div class="lc-rule-banner">
            <strong>The Dictionary Analogy:</strong><br>
            Imagine searching for the word <em>"Zebra"</em> in a 1,000-page English dictionary.<br>
            Because the dictionary has an alphabetical index (A to Z), you flip directly to the letter 'Z' in <strong>2 seconds</strong>.<br><br>
            Now imagine your boss asks: <em>"Find every word whose LAST letter is 'q'."</em><br>
            Can you use the alphabetical index? <strong>No!</strong> You are forced to read every single word on all 1,000 pages line-by-line. That takes <strong>3 hours</strong>!
          </div>

          <p class="lc-p">
            In SQL, a condition is called <strong>Sargable</strong> (Search-Argument-Able) if the database can flip directly to the index page instead of reading the entire table row-by-row.
          </p>

          <div class="lc-rule-banner" style="border-left-color: #16a34a; background: #f0fdf4;">
            <strong style="color: #166534;">The Golden Rule of Speed:</strong><br>
            Never put a function around your table column in the WHERE clause. Always keep the column bare and transform the number or date on the right side!
          </div>

          <div class="lc-comparison-grid">
            <div class="lc-compare-card bad">
              <div class="lc-compare-title">
                <span>❌</span>
                <span>Slow / Non-Sargable (Full Table Scan)</span>
              </div>
              <div class="lc-code-snippet">WHERE YEAR(order_date) = 2026</div>
              <div class="lc-compare-explain">
                The database must calculate <code>YEAR()</code> on 10,000,000 rows individually. The index is completely ignored!
              </div>
            </div>

            <div class="lc-compare-card good">
              <div class="lc-compare-title">
                <span>✅</span>
                <span>Fast / Sargable (Direct Index Seek)</span>
              </div>
              <div class="lc-code-snippet">WHERE order_date &gt;= '2026-01-01'<br>  AND order_date &lt; '2027-01-01'</div>
              <div class="lc-compare-explain">
                The column is untouched. The database jumps straight to Jan 1st in the B-Tree index in <strong>0.5 milliseconds</strong>!
              </div>
            </div>
          </div>

          <div class="lc-comparison-grid">
            <div class="lc-compare-card bad">
              <div class="lc-compare-title">
                <span>❌</span>
                <span>Slow / Non-Sargable</span>
              </div>
              <div class="lc-code-snippet">WHERE price * 1.10 &gt; 100</div>
              <div class="lc-compare-explain">
                Math is performed on the column itself, forcing the engine to calculate multiplication for every single row.
              </div>
            </div>

            <div class="lc-compare-card good">
              <div class="lc-compare-title">
                <span>✅</span>
                <span>Fast / Sargable</span>
              </div>
              <div class="lc-code-snippet">WHERE price &gt; 100 / 1.10</div>
              <div class="lc-compare-explain">
                Math is calculated ONCE on the constant right side. The database performs an instant B-Tree index range seek.
              </div>
            </div>
          </div>
        `,
        diagram: {
          id: 'diag-index-seek',
          title: 'Visual Proof: Index Range Seek (Fast) vs Full Table Scan (Slow)',
          svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Left: Fast Seek -->
            <rect x="20" y="15" width="410" height="170" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
            <rect x="35" y="30" width="130" height="22" rx="4" fill="#dcfce7" stroke="#86efac"/>
            <text x="43" y="45" fill="#166534" font-family="monospace" font-size="11" font-weight="700">FAST: B-Tree Seek</text>
            <text x="35" y="75" fill="#0f172a" font-size="13" font-weight="700">Direct Page Navigation</text>
            <text x="35" y="98" fill="#475569" font-size="12">Traverses B-Tree Root ➔ Leaf page directly.</text>
            <rect x="35" y="125" width="220" height="28" rx="4" fill="#ffffff" stroke="#86efac"/>
            <text x="45" y="143" fill="#16a34a" font-family="monospace" font-size="11.5" font-weight="700">⚡ 3 Page Reads &bull; 0.4 ms</text>

            <!-- Right: Slow Scan -->
            <rect x="450" y="15" width="410" height="170" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
            <rect x="465" y="30" width="145" height="22" rx="4" fill="#fee2e2" stroke="#fca5a5"/>
            <text x="473" y="45" fill="#991b1b" font-family="monospace" font-size="11" font-weight="700">SLOW: Full Table Scan</text>
            <text x="465" y="75" fill="#0f172a" font-size="13" font-weight="700">Reads Every Page on Disk</text>
            <text x="465" y="98" fill="#475569" font-size="12">Checks all 10,000,000 rows one by one.</text>
            <rect x="465" y="125" width="230" height="28" rx="4" fill="#ffffff" stroke="#fca5a5"/>
            <text x="475" y="143" fill="#dc2626" font-family="monospace" font-size="11.5" font-weight="700">🐢 85,000 Page Reads &bull; 4.2 sec</text>
          </svg>`
        }
      },

      {
        id: 'chap-4-strings',
        number: '1.4',
        title: 'String Length vs Byte Length (The Hidden Emoji Bug)',
        content: `
          <p class="lc-p">
            In <strong>LeetCode #1683 (Invalid Tweets)</strong>, you must find tweets that have strictly more than 15 characters.
          </p>

          <p class="lc-p">
            Many candidates write <code class="lc-code-pill">WHERE LENGTH(content) &gt; 15</code> and wonder why their solution fails hidden test cases.
          </p>

          <div class="lc-rule-banner">
            <strong>The Memory Difference:</strong><br>
            &bull; <code>LENGTH()</code> counts <strong>raw bytes</strong> stored on the hard drive.<br>
            &bull; <code>CHAR_LENGTH()</code> counts <strong>actual characters</strong> as seen by human eyes!
          </div>

          <p class="lc-p">
            In modern UTF-8 database encoding:
          </p>
          <ul style="margin: 0 0 16px 20px; line-height: 1.8; color: var(--text-secondary);">
            <li>Simple English letters (A-Z) take <strong>1 byte</strong> each.</li>
            <li>Accented letters (&eacute;, &ntilde;) take <strong>2 bytes</strong> each.</li>
            <li>Asian characters take <strong>3 bytes</strong> each.</li>
            <li>Modern Emojis (&#128640;, &#128514;, &#128293;) take <strong>4 bytes</strong> each!</li>
          </ul>

          <div class="lc-callout-card info">
            <div class="lc-callout-title">
              <span>💡</span>
              <span>The Takeaway</span>
            </div>
            <div class="lc-callout-body">
              The tweet: <strong>"Vote 🚀"</strong> has only 6 visible characters.<br>
              &bull; <code class="lc-code-pill">CHAR_LENGTH('Vote 🚀')</code> = <strong>6</strong> (Correct!)<br>
              &bull; <code class="lc-code-pill">LENGTH('Vote 🚀')</code> = <strong>9</strong> (Wrong: counts 5 letters + 4 bytes for the rocket!)<br><br>
              Whenever counting text length or characters in SQL interviews, <strong>always use CHAR_LENGTH()</strong>!
            </div>
          </div>
        `,
        diagram: {
          id: 'diag-string-byte-memory',
          title: 'Memory Representation: CHAR_LENGTH() vs LENGTH() in UTF-8',
          svg: `<svg viewBox="0 0 880 220" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Left Panel: CHAR_LENGTH (Characters) -->
            <rect x="30" y="20" width="400" height="180" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
            <rect x="45" y="32" width="160" height="24" rx="4" fill="#dcfce7" stroke="#86efac"/>
            <text x="53" y="48" fill="#166534" font-family="monospace" font-size="11" font-weight="700">CHAR_LENGTH('Vote 🚀')</text>
            <text x="45" y="78" fill="#0f172a" font-size="13" font-weight="700">6 Visible Character Glyphs</text>
            
            <g transform="translate(45, 95)">
              <rect x="0" y="0" width="45" height="40" rx="4" fill="#ffffff" stroke="#86efac"/>
              <text x="22" y="25" text-anchor="middle" font-family="monospace" font-weight="700" fill="#0f172a">V</text>
              <rect x="52" y="0" width="45" height="40" rx="4" fill="#ffffff" stroke="#86efac"/>
              <text x="74" y="25" text-anchor="middle" font-family="monospace" font-weight="700" fill="#0f172a">o</text>
              <rect x="104" y="0" width="45" height="40" rx="4" fill="#ffffff" stroke="#86efac"/>
              <text x="126" y="25" text-anchor="middle" font-family="monospace" font-weight="700" fill="#0f172a">t</text>
              <rect x="156" y="0" width="45" height="40" rx="4" fill="#ffffff" stroke="#86efac"/>
              <text x="178" y="25" text-anchor="middle" font-family="monospace" font-weight="700" fill="#0f172a">e</text>
              <rect x="208" y="0" width="45" height="40" rx="4" fill="#ffffff" stroke="#86efac"/>
              <text x="230" y="25" text-anchor="middle" font-family="monospace" fill="#94a3b8">[sp]</text>
              <rect x="260" y="0" width="70" height="40" rx="4" fill="#eff6ff" stroke="#93c5fd" stroke-width="2"/>
              <text x="295" y="26" text-anchor="middle" font-size="18">🚀</text>
            </g>
            <text x="45" y="165" fill="#166534" font-family="monospace" font-size="12" font-weight="700">Result: 6 characters (Safe &amp; Human-Accurate)</text>

            <!-- Right Panel: LENGTH (Raw Bytes) -->
            <rect x="450" y="20" width="400" height="180" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
            <rect x="465" y="32" width="150" height="24" rx="4" fill="#fee2e2" stroke="#fca5a5"/>
            <text x="473" y="48" fill="#991b1b" font-family="monospace" font-size="11" font-weight="700">LENGTH('Vote 🚀')</text>
            <text x="465" y="78" fill="#0f172a" font-size="13" font-weight="700">9 Raw UTF-8 Memory Bytes</text>

            <g transform="translate(465, 95)">
              <rect x="0" y="0" width="28" height="40" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
              <text x="14" y="24" text-anchor="middle" font-family="monospace" font-size="9" fill="#64748b">0x56</text>
              <rect x="32" y="0" width="28" height="40" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
              <text x="46" y="24" text-anchor="middle" font-family="monospace" font-size="9" fill="#64748b">0x6F</text>
              <rect x="64" y="0" width="28" height="40" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
              <text x="78" y="24" text-anchor="middle" font-family="monospace" font-size="9" fill="#64748b">0x74</text>
              <rect x="96" y="0" width="28" height="40" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
              <text x="110" y="24" text-anchor="middle" font-family="monospace" font-size="9" fill="#64748b">0x65</text>
              <rect x="128" y="0" width="28" height="40" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
              <text x="142" y="24" text-anchor="middle" font-family="monospace" font-size="9" fill="#64748b">0x20</text>
              <!-- 4-byte Emoji Block -->
              <rect x="160" y="0" width="180" height="40" rx="4" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.5"/>
              <text x="250" y="16" text-anchor="middle" font-family="monospace" font-size="8.5" fill="#e11d48">0xF0 0x9F 0x9A 0x80</text>
              <text x="250" y="32" text-anchor="middle" font-family="monospace" font-size="9" font-weight="700" fill="#be123c">🚀 Emoji = 4 Bytes!</text>
            </g>
            <text x="465" y="165" fill="#dc2626" font-family="monospace" font-size="12" font-weight="700">Result: 9 bytes (Causes False Failure in LC #1683)</text>
          </svg>`
        }
      },

      {
        id: 'chap-5-distinct',
        number: '1.5',
        title: 'The DISTINCT Engine & Tuple Deduplication (LeetCode #1148 Masterclass)',
        content: `
          <p class="lc-p">
            In <strong>LeetCode #1148 (Article Views I)</strong>, an author might read their own article multiple times across different days. The question demands returning each author exactly once, sorted by ID.
          </p>

          <p class="lc-p">
            To solve this, we write <code class="lc-code-pill">SELECT DISTINCT author_id AS id</code>. But how does <code class="lc-code-pill">DISTINCT</code> actually operate under the hood in database memory?
          </p>

          <div class="lc-rule-banner">
            <strong>The Memory Mechanics:</strong><br>
            When you run <code>DISTINCT</code>, the database allocates an internal <strong>In-Memory Hash Set</strong>.<br>
            As each surviving row arrives from the WHERE filter, the engine hashes the column values:<br>
            &bull; If the hash value is new &rarr; It stores it in memory and outputs the row.<br>
            &bull; If the hash value already exists &rarr; <strong>It drops the duplicate immediately!</strong>
          </div>

          <div class="lc-callout-card warning">
            <div class="lc-callout-title">
              <span>⚠️</span>
              <span>The Tuple Trap: What Does DISTINCT Actually Deduplicate?</span>
            </div>
            <div class="lc-callout-body">
              One of the most common candidate mistakes in interviews is writing:<br>
              <code class="lc-code-pill">SELECT DISTINCT author_id, view_date FROM Views;</code><br>
              and expecting only <code>author_id</code> to be unique.<br><br>
              <strong>The Rule:</strong> <code>DISTINCT</code> is <strong>NOT</strong> a function. It does not apply to just the first column. It applies to the <strong>entire combination of columns</strong> in your SELECT list!<br>
              If author #4 viewed the article on July 21st and again on July 22nd, both rows will appear because <code>(4, July 21)</code> &ne; <code>(4, July 22)</code>.
            </div>
          </div>
        `,
        diagram: {
          id: 'diag-distinct-hash',
          title: 'How The Database Deduplicates Rows In Memory',
          svg: `<svg viewBox="0 0 880 220" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrowDistinct" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
              </marker>
            </defs>

            <!-- Incoming Stream -->
            <rect x="20" y="25" width="220" height="170" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="35" y="50" fill="#0f172a" font-size="13" font-weight="700">Incoming Stream</text>
            <text x="35" y="70" fill="#64748b" font-size="11">From WHERE author = viewer</text>
            <rect x="35" y="85" width="180" height="24" rx="4" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="45" y="101" fill="#0f172a" font-family="monospace" font-size="11">author_id: 4</text>
            <rect x="35" y="115" width="180" height="24" rx="4" fill="#fffbeb" stroke="#fde68a"/>
            <text x="45" y="131" fill="#b45309" font-family="monospace" font-size="11">author_id: 4 (Duplicate)</text>
            <rect x="35" y="145" width="180" height="24" rx="4" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="45" y="161" fill="#0f172a" font-family="monospace" font-size="11">author_id: 7</text>

            <!-- Arrow 1 to 2 -->
            <line x1="245" y1="110" x2="310" y2="110" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowDistinct)"/>

            <!-- In-Memory Hash Set Engine -->
            <rect x="320" y="20" width="280" height="180" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
            <rect x="335" y="35" width="150" height="22" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="343" y="50" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">DISTINCT Hash Engine</text>
            <text x="335" y="80" fill="#0f172a" font-size="13" font-weight="700">Hash Set Lookup Table</text>
            <text x="335" y="105" fill="#16a34a" font-size="12">Key 4 ➔ Hash(4) &bull; Seen (Add)</text>
            <text x="335" y="130" fill="#dc2626" font-size="12" font-weight="600">Key 4 ➔ Hash(4) &bull; Collision! (DROP)</text>
            <text x="335" y="155" fill="#16a34a" font-size="12">Key 7 ➔ Hash(7) &bull; Seen (Add)</text>
            <rect x="335" y="168" width="220" height="22" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
            <text x="345" y="183" fill="#64748b" font-family="monospace" font-size="10.5">Hash collisions silently dropped</text>

            <!-- Arrow 2 to 3 -->
            <line x1="605" y1="110" x2="670" y2="110" stroke="#2563eb" stroke-width="2" marker-end="url(#arrowDistinct)"/>

            <!-- Output -->
            <rect x="680" y="25" width="180" height="170" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
            <text x="695" y="50" fill="#166534" font-size="13" font-weight="700">Unique Output</text>
            <text x="695" y="70" fill="#15803d" font-size="11">Sorted by id ASC</text>
            <rect x="695" y="90" width="150" height="26" rx="4" fill="#ffffff" stroke="#86efac"/>
            <text x="705" y="107" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">id: 4</text>
            <rect x="695" y="125" width="150" height="26" rx="4" fill="#ffffff" stroke="#86efac"/>
            <text x="705" y="142" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">id: 7</text>
          </svg>`
        }
      },

      {
        id: 'chap-6-or-vs-union',
        number: '1.6',
        title: 'The OR vs UNION Dilemma (LeetCode #595 Senior Follow-Up)',
        content: `
          <p class="lc-p">
            In <strong>LeetCode #595 (Big Countries)</strong>, a country is defined as big if:
            <code class="lc-code-pill">area &gt;= 3,000,000 OR population &gt;= 25,000,000</code>.
          </p>

          <p class="lc-p">
            Writing a simple <code class="lc-code-pill">OR</code> passes the LeetCode judge in 5 seconds. But in an onsite interview at Meta, Amazon, or Uber, the interviewer will immediately follow up:
          </p>

          <div class="lc-rule-banner">
            <strong>The Follow-up Question:</strong><br>
            <em>"Imagine our World table has 500,000,000 rows. There is an index on 'area' and an index on 'population'. Why does this simple OR query slow down, and how would you optimize it?"</em>
          </div>

          <p class="lc-p">
            <strong>The Problem with OR:</strong> When an OR condition references two <em>completely different columns</em>, the query optimizer usually cannot use both single-column indexes effectively. It often gives up and performs an excruciatingly slow <strong>Full Table Scan</strong> across all 500 million records!
          </p>

          <p class="lc-p">
            <strong>The Senior Solution (UNION):</strong> We split the query into two independent SELECT statements and combine them with <code class="lc-code-pill">UNION</code>:
          </p>

          <div class="lc-comparison-grid">
            <div class="lc-compare-card bad">
              <div class="lc-compare-title">
                <span>⚠️</span>
                <span>Standard OR Approach</span>
              </div>
              <div class="lc-code-snippet">SELECT name, population, area<br>FROM World<br>WHERE area &gt;= 3000000<br>   OR population &gt;= 25000000;</div>
              <div class="lc-compare-explain">
                Simple and clean for small tables. But on massive tables, the optimizer struggles to combine two indexes, causing table scan degradation.
              </div>
            </div>

            <div class="lc-compare-card good">
              <div class="lc-compare-title">
                <span>⚡</span>
                <span>High-Scale UNION Approach</span>
              </div>
              <div class="lc-code-snippet">SELECT name, population, area<br>FROM World<br>WHERE area &gt;= 3000000<br>UNION<br>SELECT name, population, area<br>FROM World<br>WHERE population &gt;= 25000000;</div>
              <div class="lc-compare-explain">
                Branch 1 uses the <code>area</code> index (0.8ms).<br>
                Branch 2 uses the <code>population</code> index (0.9ms).<br>
                <code>UNION</code> automatically deduplicates overlap. <strong>1,000x faster!</strong>
              </div>
            </div>
          </div>
        `,
        diagram: {
          id: 'diag-or-vs-union',
          title: 'Query Plan Comparison: Single OR vs Split UNION',
          svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Plan A -->
            <rect x="20" y="15" width="410" height="170" rx="8" fill="#fffbeb" stroke="#fde68a" stroke-width="1.5"/>
            <rect x="35" y="30" width="130" height="22" rx="4" fill="#fef3c7" stroke="#fde68a"/>
            <text x="43" y="45" fill="#b45309" font-family="monospace" font-size="11" font-weight="700">PLAN A: Single OR</text>
            <text x="35" y="75" fill="#0f172a" font-size="13" font-weight="700">Index Merge Failure</text>
            <text x="35" y="98" fill="#475569" font-size="12">Cannot traverse both B-Trees simultaneously.</text>
            <rect x="35" y="125" width="260" height="28" rx="4" fill="#ffffff" stroke="#fde68a"/>
            <text x="45" y="143" fill="#b45309" font-family="monospace" font-size="11.5" font-weight="700">🐢 Full Table Scan (3,800 ms)</text>

            <!-- Plan B -->
            <rect x="450" y="15" width="410" height="170" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
            <rect x="465" y="30" width="130" height="22" rx="4" fill="#dcfce7" stroke="#86efac"/>
            <text x="473" y="45" fill="#166534" font-family="monospace" font-size="11" font-weight="700">PLAN B: Split UNION</text>
            <text x="465" y="75" fill="#0f172a" font-size="13" font-weight="700">Dual Direct B-Tree Seeks</text>
            <text x="465" y="98" fill="#475569" font-size="12">Each query branch hits its own dedicated index.</text>
            <rect x="465" y="125" width="260" height="28" rx="4" fill="#ffffff" stroke="#86efac"/>
            <text x="475" y="143" fill="#16a34a" font-family="monospace" font-size="11.5" font-weight="700">⚡ Two Seeks &bull; Latency: 2.1 ms</text>
          </svg>`
        }
      },

      {
        id: 'chap-7-null-safe-toolkit',
        number: '1.7',
        title: 'The NULL-Safe Toolkit: <=>, COALESCE(), and IFNULL()',
        content: `
          <p class="lc-p">
            In <strong>LeetCode #584 (Find Customer Referee)</strong>, writing <code class="lc-code-pill">WHERE referee_id != 2 OR referee_id IS NULL</code> is the classic standard solution. But top engineers have three other powerful tools in their toolkit:
          </p>

          <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin: 16px 0;">
            <div style="background: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px; padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-weight: 700; font-size: 14px; color: #2563eb;">Tool 1: The MySQL Spaceship Operator (&lt;=&gt;)</span>
                <span style="font-family: var(--font-mono); font-size: 11px; background: #eff6ff; color: #1d4ed8; padding: 2px 8px; border-radius: 4px;">NULL-Safe Equal</span>
              </div>
              <p class="lc-p" style="margin-bottom: 8px;">
                MySQL has a unique operator called the <strong>Spaceship Operator</strong> (<code class="lc-code-pill">&lt;=&gt;</code>). Unlike the regular <code>=</code> operator, it <strong>NEVER evaluates to UNKNOWN</strong>!
              </p>
              <div class="lc-code-snippet">WHERE NOT (referee_id &lt;=&gt; 2);</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 6px;">
                If <code>referee_id</code> is NULL: <code>NULL &lt;=&gt; 2</code> evaluates to <strong>FALSE (0)</strong>, so <code>NOT FALSE</code> evaluates to <strong>TRUE (1)</strong>! Clean, concise, and no <code>OR</code> required!
              </div>
            </div>

            <div style="background: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px; padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-weight: 700; font-size: 14px; color: #059669;">Tool 2: COALESCE() and IFNULL() Fallbacks</span>
                <span style="font-family: var(--font-mono); font-size: 11px; background: #f0fdf4; color: #15803d; padding: 2px 8px; border-radius: 4px;">Fallback Functions</span>
              </div>
              <p class="lc-p" style="margin-bottom: 8px;">
                Substitute a dummy value (like 0 or -1) whenever a column is missing:
              </p>
              <div class="lc-code-snippet">WHERE COALESCE(referee_id, 0) != 2;</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 6px;">
                If <code>referee_id</code> is NULL, <code>COALESCE</code> converts it to <code>0</code>. Since <code>0 != 2</code> is TRUE, the customer is safely kept!
              </div>
            </div>
          </div>
        `,
        diagram: {
          id: 'diag-null-safe-flowchart',
          title: 'Evaluation Pathways: Regular != vs Spaceship <=> vs COALESCE()',
          svg: `<svg viewBox="0 0 880 210" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="flowArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
              </marker>
            </defs>

            <!-- Column Value (NULL) -->
            <rect x="30" y="70" width="140" height="70" rx="6" fill="#fffbeb" stroke="#fde68a" stroke-width="2"/>
            <text x="100" y="100" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="#b45309">referee_id = NULL</text>
            <text x="100" y="120" text-anchor="middle" font-size="10.5" fill="#78350f">Candidate Row</text>

            <!-- Branch 1: Standard != (DROPPED) -->
            <path d="M 170 85 C 240 85, 260 45, 330 45" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#flowArrow)"/>
            <rect x="330" y="20" width="280" height="50" rx="6" fill="#fef2f2" stroke="#fca5a5"/>
            <text x="345" y="42" font-family="monospace" font-size="11" font-weight="700" fill="#991b1b">referee_id != 2</text>
            <text x="345" y="58" font-size="11" fill="#dc2626">Evaluates to UNKNOWN ➔ ❌ Silently Dropped!</text>

            <!-- Branch 2: Spaceship <=> (KEPT) -->
            <path d="M 170 105 L 320 105" fill="none" stroke="#16a34a" stroke-width="2" marker-end="url(#flowArrow)"/>
            <rect x="330" y="80" width="280" height="50" rx="6" fill="#f0fdf4" stroke="#86efac"/>
            <text x="345" y="102" font-family="monospace" font-size="11" font-weight="700" fill="#166534">NOT (referee_id &lt;=&gt; 2)</text>
            <text x="345" y="118" font-size="11" fill="#15803d">NULL &lt;=&gt; 2 is FALSE ➔ NOT FALSE = TRUE ➔ ⚡ KEPT!</text>

            <!-- Branch 3: COALESCE (KEPT) -->
            <path d="M 170 125 C 240 125, 260 165, 330 165" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#flowArrow)"/>
            <rect x="330" y="140" width="280" height="50" rx="6" fill="#eff6ff" stroke="#bfdbfe"/>
            <text x="345" y="162" font-family="monospace" font-size="11" font-weight="700" fill="#1d4ed8">COALESCE(referee_id, 0) != 2</text>
            <text x="345" y="178" font-size="11" fill="#2563eb">NULL replaced by 0 ➔ 0 != 2 = TRUE ➔ ⚡ KEPT!</text>

            <!-- Final Takeaway Badge -->
            <rect x="640" y="45" width="210" height="120" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="655" y="70" font-size="12" font-weight="700" fill="#0f172a">Executive Takeaway</text>
            <text x="655" y="92" font-size="11" fill="#64748b">In SQL interviews, using</text>
            <text x="655" y="110" font-family="monospace" font-size="11" font-weight="700" fill="#2563eb">&lt;=&gt; or COALESCE()</text>
            <text x="655" y="130" font-size="11" fill="#64748b">proves you master 3VL</text>
            <text x="655" y="148" font-size="11" fill="#16a34a" font-weight="700">edge cases!</text>
          </svg>`
        }
      },

      {
        id: 'chap-8-cheat-sheet',
        number: '1.8',
        title: 'The 60-Second Interview Executive Cheat Sheet',
        content: `
          <p class="lc-p">
            Scan this quick reference table 5 minutes before your SQL technical screening:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px;">
            <thead>
              <tr style="background: #f8fafc; border-bottom: 2px solid #e4e4e7;">
                <th style="padding: 10px 12px; text-align: left;">Topic</th>
                <th style="padding: 10px 12px; text-align: left;">The Trap</th>
                <th style="padding: 10px 12px; text-align: left;">The Bulletproof Rule</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 10px 12px; font-weight: 700;">Aliases in WHERE</td>
                <td style="padding: 10px 12px; color: #dc2626;"><code>WHERE alias &gt; 10</code> crashes</td>
                <td style="padding: 10px 12px; color: #16a34a;">WHERE runs at Step 2; aliases are created at Step 5. Repeat the math in WHERE!</td>
              </tr>
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 10px 12px; font-weight: 700;">NULL Comparisons</td>
                <td style="padding: 10px 12px; color: #dc2626;"><code>col != 2</code> drops NULLs</td>
                <td style="padding: 10px 12px; color: #16a34a;">Always add <code>OR col IS NULL</code>, or use <code>COALESCE(col, 0) != 2</code></td>
              </tr>
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 10px 12px; font-weight: 700;">NOT IN with NULL</td>
                <td style="padding: 10px 12px; color: #dc2626;">Returns 0 rows if list has NULL</td>
                <td style="padding: 10px 12px; color: #16a34a;">Always prefer <code>NOT EXISTS</code> for subqueries instead of <code>NOT IN</code></td>
              </tr>
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 10px 12px; font-weight: 700;">Counting Text Length</td>
                <td style="padding: 10px 12px; color: #dc2626;"><code>LENGTH()</code> counts bytes</td>
                <td style="padding: 10px 12px; color: #16a34a;">Use <code>CHAR_LENGTH()</code> for character limits (emojis take 4 bytes!)</td>
              </tr>
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 10px 12px; font-weight: 700;">Sargability</td>
                <td style="padding: 10px 12px; color: #dc2626;"><code>WHERE YEAR(date) = 2026</code></td>
                <td style="padding: 10px 12px; color: #16a34a;">Never wrap columns in functions. Use <code>date &gt;= '2026-01-01' AND ...</code></td>
              </tr>
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 10px 12px; font-weight: 700;">Precedence Order</td>
                <td style="padding: 10px 12px; color: #dc2626;"><code>A OR B AND C</code> behaves as <code>A OR (B AND C)</code></td>
                <td style="padding: 10px 12px; color: #16a34a;">AND binds tighter than OR. Always use defensive parentheses: <code>(A OR B) AND C</code></td>
              </tr>
            </tbody>
          </table>
        `,
        diagram: {
          id: 'diag-operator-precedence',
          title: 'Operator Precedence Hierarchy & Defensive Parentheses Rule',
          svg: `<svg viewBox="0 0 880 200" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Left: Precedence Pyramid -->
            <g transform="translate(30, 20)">
              <rect x="0" y="0" width="380" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
              <text x="20" y="28" font-size="12" font-weight="700" fill="#0f172a">SQL Logical Operator Precedence</text>
              
              <!-- Tier 1: NOT -->
              <rect x="20" y="45" width="340" height="28" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
              <text x="35" y="64" font-family="monospace" font-size="11" font-weight="700" fill="#1d4ed8">1. NOT (Highest Priority • Binds Immediately)</text>

              <!-- Tier 2: AND -->
              <rect x="20" y="80" width="340" height="28" rx="4" fill="#f0fdf4" stroke="#86efac"/>
              <text x="35" y="99" font-family="monospace" font-size="11" font-weight="700" fill="#166534">2. AND (Medium Priority • Binds Like Multiplication)</text>

              <!-- Tier 3: OR -->
              <rect x="20" y="115" width="340" height="28" rx="4" fill="#fffbeb" stroke="#fde68a"/>
              <text x="35" y="134" font-family="monospace" font-size="11" font-weight="700" fill="#b45309">3. OR (Lowest Priority • Binds Like Addition)</text>
            </g>

            <!-- Right: The Classic Trap & Solution -->
            <g transform="translate(440, 20)">
              <rect x="0" y="0" width="410" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
              <text x="20" y="28" font-size="12" font-weight="700" fill="#0f172a">The Ambiguity Trap in Interviews</text>
              
              <rect x="20" y="45" width="370" height="42" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
              <text x="30" y="62" font-family="monospace" font-size="11" fill="#dc2626">WHERE status = 'active' OR role = 'admin' AND score &gt; 90</text>
              <text x="30" y="78" font-size="10.5" fill="#991b1b">⚠️ Engine evaluates as: active OR (admin AND score &gt; 90)</text>

              <rect x="20" y="95" width="370" height="42" rx="4" fill="#f0fdf4" stroke="#86efac"/>
              <text x="30" y="112" font-family="monospace" font-size="11" font-weight="700" fill="#166534">WHERE (status = 'active' OR role = 'admin') AND score &gt; 90</text>
              <text x="30" y="128" font-size="10.5" fill="#15803d">⚡ Defensive parentheses force intended grouping!</text>
            </g>
          </svg>`
        }
      }
    ],

    callouts: [
      {
        type: 'danger',
        title: 'The "NOT IN" Poison Trap',
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
    ,
      trapsAndEdgeCases: [
        "Collation Sensitivity: In case-sensitive binary collations (e.g. utf8mb4_bin), filtering low_fats = 'y' will fail to match 'Y'. Always match exact enum casing.",
        "Hidden NULL Traps: If low_fats or recyclable allows NULL, rows with (NULL, 'Y') evaluate to UNKNOWN AND TRUE = UNKNOWN and are dropped silently."
],
      alternativeSolutions: [
        {
                "name": "Bitwise / Integer Flag Mapping",
                "complexity": "O(1) CPU bit test",
                "sql": "SELECT product_id\nFROM Products\nWHERE (low_fats = 'Y') & (recyclable = 'Y') = 1;",
                "explanation": "Used in high-frequency trading and gaming architectures where boolean columns are stored as packed bitmasks to conserve cache line bandwidth."
        }
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
    ,
      trapsAndEdgeCases: [
        "The 3VL Silent Erasure: Writing WHERE referee_id != 2 drops all customers with referee_id IS NULL because NULL != 2 evaluates to UNKNOWN. The WHERE clause only admits rows evaluating to strictly TRUE.",
        "The Functional Index Trap: Writing WHERE IFNULL(referee_id, 0) != 2 blinds standard B-Tree indexes on referee_id, turning an O(log N) index seek into an O(N) full table scan."
],
      alternativeSolutions: [
        {
                "name": "Null-Safe Spaceship Operator (<=>)",
                "complexity": "O(log N) seek in MySQL",
                "sql": "SELECT name\nFROM Customer\nWHERE NOT (referee_id <=> 2);",
                "explanation": "The spaceship operator treats NULL as comparable. `referee_id <=> 2` is FALSE when referee_id is NULL, so NOT(FALSE) becomes TRUE."
        },
        {
                "name": "COALESCE Fallback",
                "complexity": "O(N) Full Table Scan",
                "sql": "SELECT name\nFROM Customer\nWHERE COALESCE(referee_id, 0) != 2;",
                "explanation": "Replaces NULL with 0 before comparison. Very clean to read, but note that wrapping indexed columns in functions defeats index seeks."
        }
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
    ,
      trapsAndEdgeCases: [
        "The OR Full Table Scan Trap: A single WHERE area >= 3000000 OR population >= 25000000 forces a full table scan if the query optimizer cannot execute an Index Merge."
],
      alternativeSolutions: [
        {
                "name": "UNION Dual Index Range Seek",
                "complexity": "2 * O(log N) seeks + O(M log M) dedupe",
                "sql": "SELECT name, population, area FROM World WHERE area >= 3000000\nUNION\nSELECT name, population, area FROM World WHERE population >= 25000000;",
                "explanation": "Enables independent index range scans on idx_area and idx_pop. UNION deduplicates boundary rows satisfying both criteria."
        }
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
    ,
      trapsAndEdgeCases: [
        "Duplicate Self-Views: An author viewing their own article 10 times outputs 10 identical rows unless deduplicated with DISTINCT.",
        "Strict Sorting: LeetCode requires ORDER BY id ASC. Omitting the sort clause triggers intermittent test failures."
],
      alternativeSolutions: [
        {
                "name": "GROUP BY Hash Aggregation",
                "complexity": "O(N) hash grouping",
                "sql": "SELECT author_id AS id\nFROM Views\nWHERE author_id = viewer_id\nGROUP BY author_id\nORDER BY id ASC;",
                "explanation": "Uses hash aggregation instead of sort-based distinct, which can perform faster on unsorted raw buffers."
        }
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
    ,
      trapsAndEdgeCases: [
        "Byte vs Character Length (UTF-8 Emojis): In UTF-8, emojis like 🚀 take 4 bytes. LENGTH('🚀') returns 4, but CHAR_LENGTH('🚀') returns 1. LENGTH() will incorrectly fail valid tweets with emojis!",
        "Strict Inequality: Must be > 15, not >= 15. A tweet with exactly 15 characters is valid."
],
      alternativeSolutions: [
        {
                "name": "CHARACTER_LENGTH ANSI Standard",
                "complexity": "O(K) character scan",
                "sql": "SELECT tweet_id\nFROM Tweets\nWHERE CHARACTER_LENGTH(content) > 15;",
                "explanation": "Direct ANSI SQL standard synonym for CHAR_LENGTH()."
        }
]
    },

    {
      id: 1873,
      title: 'Calculate Special Bonus',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Amazon', 'Apple', 'Meta', 'Bloomberg'],
      interviewFreq: '89% (High - Conditional Modulo & String Prefix)',
      interviewRound: 'Technical Screen',
      prompt: `Write a solution to calculate the bonus of each employee. The bonus of an employee is 100% of their salary if the ID of the employee is an odd number and the employee's name does not start with the character 'M'. The bonus of an employee is 0 otherwise.\n\nReturn the result table ordered by employee_id.`,
      schemaDescription: `Table: Employees
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| employee_id | int     |
| name        | varchar |
| salary      | int     |
+-------------+---------+
employee_id is the primary key for this table.`,
      sampleInput: {
        table: 'Employees',
        columns: ['employee_id', 'name', 'salary'],
        rows: [
          [2, 'Meir', 3000],
          [3, 'Michael', 3800],
          [7, 'Addilyn', 7400],
          [8, 'Juan', 6100],
          [9, 'Kannon', 7700]
        ]
      },
      expectedOutput: {
        columns: ['employee_id', 'bonus'],
        rows: [
          [2, 0],
          [3, 0],
          [7, 7400],
          [8, 0],
          [9, 7700]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 840 240" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="310" height="210" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="28" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">INPUT: Employees</text>
        <rect x="25" y="48" width="290" height="20" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="32" y="62" fill="#64748b" font-family="monospace" font-size="10">id</text>
        <text x="75" y="62" fill="#64748b" font-family="monospace" font-size="10">name</text>
        <text x="170" y="62" fill="#64748b" font-family="monospace" font-size="10">salary</text>
        <text x="240" y="62" fill="#64748b" font-family="monospace" font-size="10">mod/M%</text>

        <text x="32" y="85" fill="#64748b" font-family="monospace" font-size="10.5">2</text>
        <text x="75" y="85" fill="#64748b" font-family="monospace" font-size="10.5">Meir</text>
        <text x="170" y="85" fill="#64748b" font-family="monospace" font-size="10.5">3000</text>
        <text x="240" y="85" fill="#dc2626" font-family="monospace" font-size="9.5">Even (0)</text>

        <text x="32" y="112" fill="#64748b" font-family="monospace" font-size="10.5">3</text>
        <text x="75" y="112" fill="#64748b" font-family="monospace" font-size="10.5">Michael</text>
        <text x="170" y="112" fill="#64748b" font-family="monospace" font-size="10.5">3800</text>
        <text x="240" y="112" fill="#dc2626" font-family="monospace" font-size="9.5">M% (0)</text>

        <rect x="25" y="122" width="290" height="22" fill="#f0fdf4" stroke="#86efac"/>
        <text x="32" y="137" fill="#166534" font-family="monospace" font-size="10.5">7</text>
        <text x="75" y="137" fill="#166534" font-family="monospace" font-size="10.5">Addilyn</text>
        <text x="170" y="137" fill="#166534" font-family="monospace" font-size="10.5">7400</text>
        <text x="240" y="137" fill="#166534" font-family="monospace" font-size="9.5">Odd &amp; !M</text>

        <text x="32" y="165" fill="#64748b" font-family="monospace" font-size="10.5">8</text>
        <text x="75" y="165" fill="#64748b" font-family="monospace" font-size="10.5">Juan</text>
        <text x="170" y="165" fill="#64748b" font-family="monospace" font-size="10.5">6100</text>
        <text x="240" y="165" fill="#dc2626" font-family="monospace" font-size="9.5">Even (0)</text>

        <rect x="25" y="176" width="290" height="22" fill="#f0fdf4" stroke="#86efac"/>
        <text x="32" y="191" fill="#166534" font-family="monospace" font-size="10.5">9</text>
        <text x="75" y="191" fill="#166534" font-family="monospace" font-size="10.5">Kannon</text>
        <text x="170" y="191" fill="#166534" font-family="monospace" font-size="10.5">7700</text>
        <text x="240" y="191" fill="#166534" font-family="monospace" font-size="9.5">Odd &amp; !M</text>

        <!-- Condition Box -->
        <rect x="345" y="35" width="220" height="170" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="1.5"/>
        <text x="360" y="62" fill="#1d4ed8" font-family="monospace" font-size="11.5" font-weight="700">CASE PREDICATE LOGIC</text>
        <rect x="355" y="75" width="200" height="52" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
        <text x="365" y="93" fill="#1e40af" font-family="monospace" font-size="10">id % 2 = 1</text>
        <text x="365" y="112" fill="#1e40af" font-family="monospace" font-size="10">AND name NOT LIKE 'M%'</text>
        <path d="M 455 127 L 455 142" stroke="#2563eb" stroke-width="2"/>
        <text x="365" y="160" fill="#166534" font-family="monospace" font-size="10" font-weight="700">TRUE  =&gt; bonus = salary</text>
        <text x="365" y="180" fill="#dc2626" font-family="monospace" font-size="10" font-weight="700">FALSE =&gt; bonus = 0</text>

        <!-- Output Box -->
        <rect x="585" y="20" width="235" height="200" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="600" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT: ORDER BY id</text>
        <rect x="595" y="55" width="215" height="18" fill="#f0fdf4" stroke="#dcfce7"/>
        <text x="605" y="68" fill="#166534" font-family="monospace" font-size="10">employee_id</text>
        <text x="730" y="68" fill="#166534" font-family="monospace" font-size="10">bonus</text>
        <text x="605" y="92" fill="#0f172a" font-family="monospace" font-size="10.5">2 | 0</text>
        <text x="605" y="117" fill="#0f172a" font-family="monospace" font-size="10.5">3 | 0</text>
        <text x="605" y="142" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">7 | 7400</text>
        <text x="605" y="167" fill="#0f172a" font-family="monospace" font-size="10.5">8 | 0</text>
        <text x="605" y="192" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">9 | 7700</text>
      </svg>`,
      logicBreakdown: [
        '1. Odd numbers satisfy the modulo check: employee_id % 2 = 1 (or MOD(employee_id, 2) = 1).',
        '2. Names that do NOT start with M are matched via name NOT LIKE \'M%\'.',
        '3. Both conditions must hold simultaneously using AND. If true, bonus equals salary; otherwise 0.',
        '4. Results must be sorted numerically by employee_id ASC.'
      ],
      solutionSQL: `SELECT 
    employee_id,
    CASE 
        WHEN employee_id % 2 = 1 AND name NOT LIKE 'M%' THEN salary
        ELSE 0
    END AS bonus
FROM Employees
ORDER BY employee_id;`,
      lineByLineExplanation: [
        { clause: 'SELECT employee_id,', exp: 'Returns the primary employee ID.' },
        { clause: 'CASE WHEN employee_id % 2 = 1 AND name NOT LIKE \'M%\' THEN salary ELSE 0 END AS bonus', exp: 'Evaluates the conditional predicate: checks odd ID and name prefix before awarding salary or 0.' },
        { clause: 'FROM Employees', exp: 'Targets the Employees source table.' },
        { clause: 'ORDER BY employee_id;', exp: 'Ensures the final output is sorted in ascending employee ID sequence.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Missing ELSE Clause: Omitting ELSE in CASE WHEN causes unmatched rows to default to NULL rather than 0, failing LeetCode judge assertions.",
        "Missing ORDER BY: The problem explicitly demands ordering by employee_id."
],
      alternativeSolutions: [
        {
                "name": "MySQL IF() Expression",
                "complexity": "O(N) sequential scan",
                "sql": "SELECT employee_id,\n       IF(employee_id % 2 = 1 AND name NOT LIKE 'M%', salary, 0) AS bonus\nFROM Employees\nORDER BY employee_id;",
                "explanation": "Concise ternary-style syntax native to MySQL engines."
        },
        {
                "name": "Arithmetic Boolean Multiplication",
                "complexity": "O(N) vectorized math",
                "sql": "SELECT employee_id,\n       salary * (employee_id % 2) * (LEFT(name, 1) != 'M') AS bonus\nFROM Employees\nORDER BY employee_id;",
                "explanation": "Pure mathematical expression multiplying salary by boolean 0/1 predicates."
        }
]
    },

    {
      id: 627,
      title: 'Swap Salary',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Apple', 'Google', 'Amazon', 'Microsoft'],
      interviewFreq: '85% (High - In-place Mutation Without Temp Tables)',
      interviewRound: 'Technical Interview',
      prompt: `Write a solution to swap all 'f' and 'm' values (i.e., change all 'f' values to 'm' and vice versa) with a single update statement and no intermediate temporary tables.\n\nNote that you must write a single UPDATE statement, do NOT write any SELECT statement for this problem.`,
      schemaDescription: `Table: Salary
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| id          | int      |
| name        | varchar  |
| sex         | ENUM     |
| salary      | int      |
+-------------+----------+
id is the primary key for this table.
The sex column is ENUM value of type ('m', 'f').`,
      sampleInput: {
        table: 'Salary',
        columns: ['id', 'name', 'sex', 'salary'],
        rows: [
          [1, 'A', 'm', 2500],
          [2, 'B', 'f', 1500],
          [3, 'C', 'm', 5500],
          [4, 'D', 'f', 500]
        ]
      },
      expectedOutput: {
        columns: ['id', 'name', 'sex', 'salary'],
        rows: [
          [1, 'A', 'f', 2500],
          [2, 'B', 'm', 1500],
          [3, 'C', 'f', 5500],
          [4, 'D', 'm', 500]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 840 230" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="310" height="190" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">BEFORE: Salary</text>
        <text x="35" y="80" fill="#64748b" font-family="monospace" font-size="11">id 1: A | sex = 'm'</text>
        <text x="35" y="110" fill="#64748b" font-family="monospace" font-size="11">id 2: B | sex = 'f'</text>
        <text x="35" y="140" fill="#64748b" font-family="monospace" font-size="11">id 3: C | sex = 'm'</text>
        <text x="35" y="170" fill="#64748b" font-family="monospace" font-size="11">id 4: D | sex = 'f'</text>

        <!-- Swap Transform Engine -->
        <rect x="350" y="40" width="200" height="150" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="365" y="68" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">ATOMIC SWAP TRANSFORM</text>
        <text x="365" y="95" fill="#0f172a" font-size="11">CASE sex</text>
        <text x="365" y="118" fill="#2563eb" font-family="monospace" font-size="10.5">  WHEN 'm' THEN 'f'</text>
        <text x="365" y="138" fill="#2563eb" font-family="monospace" font-size="10.5">  ELSE 'm'</text>
        <text x="365" y="160" fill="#0f172a" font-size="11">END</text>

        <!-- AFTER -->
        <rect x="575" y="20" width="245" height="190" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="590" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">AFTER: Salary (Mutated)</text>
        <text x="590" y="80" fill="#166534" font-family="monospace" font-size="11" font-weight="700">id 1: A | sex = 'f' (Swapped!)</text>
        <text x="590" y="110" fill="#166534" font-family="monospace" font-size="11" font-weight="700">id 2: B | sex = 'm' (Swapped!)</text>
        <text x="590" y="140" fill="#166534" font-family="monospace" font-size="11" font-weight="700">id 3: C | sex = 'f' (Swapped!)</text>
        <text x="590" y="170" fill="#166534" font-family="monospace" font-size="11" font-weight="700">id 4: D | sex = 'm' (Swapped!)</text>
      </svg>`,
      logicBreakdown: [
        '1. The goal is to swap values in place without temporary tables or secondary writes.',
        '2. A single UPDATE statement with a conditional CASE statement (or IF() function in MySQL) evaluates every row atomically.',
        '3. If sex = "m", replace with "f"; otherwise replace with "m".'
      ],
      solutionSQL: `UPDATE Salary
SET sex = CASE 
    WHEN sex = 'm' THEN 'f' 
    ELSE 'm' 
END;`,
      lineByLineExplanation: [
        { clause: 'UPDATE Salary', exp: 'Targets the Salary table for in-place row mutation.' },
        { clause: 'SET sex = CASE WHEN sex = \'m\' THEN \'f\' ELSE \'m\' END;', exp: 'Atomically evaluates the current sex and toggles it to the opposite enum value.' }
      ]
    ,
      trapsAndEdgeCases: [
        "The Double-Update Trap: Running two separate UPDATE statements turns EVERY row into 'f'. The swap must be atomic in a single UPDATE.",
        "No Intermediate Temp Tables: Prohibited from creating temp tables or SELECT statements."
],
      alternativeSolutions: [
        {
                "name": "MySQL IF() Shortcut",
                "complexity": "O(N) atomic update",
                "sql": "UPDATE Salary\nSET sex = IF(sex = 'm', 'f', 'm');",
                "explanation": "Clean single-line ternary update."
        },
        {
                "name": "ASCII Inversion Complement",
                "complexity": "O(N) arithmetic byte mutation",
                "sql": "UPDATE Salary\nSET sex = CHAR(ASCII('m') + ASCII('f') - ASCII(sex));",
                "explanation": "Clever ASCII arithmetic: when sex is 'm', ('m'+'f') - 'm' = 'f'."
        }
]
    },

    {
      id: 1527,
      title: 'Patients With a Condition',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Bloomberg', 'Google', 'Amazon'],
      interviewFreq: '91% (High - String Boundary & Regex Traps)',
      interviewRound: 'Technical Interview',
      prompt: `Write a solution to find the patient_id, patient_name, and conditions of the patients who have Type I Diabetes. Type I Diabetes always starts with DIAB1 prefix.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Patients
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| patient_id   | int     |
| patient_name | varchar |
| conditions   | varchar |
+--------------+---------+
patient_id is the primary key for this table.
conditions contains 0 or more code separated by spaces.`,
      sampleInput: {
        table: 'Patients',
        columns: ['patient_id', 'patient_name', 'conditions'],
        rows: [
          [1, 'Daniel', 'YFEV COUGH'],
          [2, 'Alice', ''],
          [3, 'Bob', 'DIAB100 MYOP'],
          [4, 'George', 'ACNE DIAB100'],
          [5, 'Alain', 'SADIAB100']
        ]
      },
      expectedOutput: {
        columns: ['patient_id', 'patient_name', 'conditions'],
        rows: [
          [3, 'Bob', 'DIAB100 MYOP'],
          [4, 'George', 'ACNE DIAB100']
        ]
      },
      svgDiagram: `<svg viewBox="0 0 840 240" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="310" height="210" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="28" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">INPUT: Patients.conditions</text>
        <text x="28" y="65" fill="#64748b" font-family="monospace" font-size="10.5">1: "YFEV COUGH" (No match)</text>
        <text x="28" y="92" fill="#64748b" font-family="monospace" font-size="10.5">2: "" (Empty)</text>

        <!-- Match 1 -->
        <rect x="25" y="103" width="290" height="22" fill="#f0fdf4" stroke="#86efac"/>
        <text x="28" y="118" fill="#166534" font-family="monospace" font-size="10.5">3: "DIAB100 MYOP" (Starts with)</text>

        <!-- Match 2 -->
        <rect x="25" y="133" width="290" height="22" fill="#f0fdf4" stroke="#86efac"/>
        <text x="28" y="148" fill="#166534" font-family="monospace" font-size="10.5">4: "ACNE DIAB100" (Space + DIAB1)</text>

        <!-- Trap! -->
        <rect x="25" y="163" width="290" height="22" fill="#fef2f2" stroke="#fca5a5"/>
        <text x="28" y="178" fill="#dc2626" font-family="monospace" font-size="10.5">5: "SADIAB100" (TRAP! NOT A WORD BOUNDARY)</text>

        <!-- Pattern Filter Box -->
        <rect x="345" y="35" width="220" height="170" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="1.5"/>
        <text x="360" y="62" fill="#1d4ed8" font-family="monospace" font-size="11.5" font-weight="700">WORD BOUNDARY PREDICATE</text>
        <text x="360" y="88" fill="#0f172a" font-size="11">Prefix at string start:</text>
        <text x="360" y="106" fill="#2563eb" font-family="monospace" font-size="10.5">conditions LIKE 'DIAB1%'</text>
        <text x="360" y="132" fill="#0f172a" font-size="11">Prefix after space:</text>
        <text x="360" y="150" fill="#2563eb" font-family="monospace" font-size="10.5">conditions LIKE '% DIAB1%'</text>
        <text x="360" y="180" fill="#dc2626" font-size="10.5" font-weight="600">Rejects '%DIAB1%' trap!</text>

        <!-- Output Box -->
        <rect x="585" y="20" width="235" height="200" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="600" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT PATIENTS</text>
        <text x="600" y="80" fill="#166534" font-family="monospace" font-size="11" font-weight="700">3 | Bob | DIAB100 MYOP</text>
        <text x="600" y="120" fill="#166534" font-family="monospace" font-size="11" font-weight="700">4 | George | ACNE DIAB100</text>
        <text x="600" y="165" fill="#64748b" font-size="11">Row 5 correctly excluded.</text>
      </svg>`,
      logicBreakdown: [
        '1. The condition code can appear either as the first word in the string, or preceded by a space after other codes.',
        '2. Candidate trap: WHERE conditions LIKE \'%DIAB1%\' is INCORRECT because it erroneously matches \'SADIAB100\', which is a completely different medical condition.',
        '3. The robust query checks: conditions LIKE \'DIAB1%\' OR conditions LIKE \'% DIAB1%\' (or REGEXP \'\\\\bDIAB1\').'
      ],
      solutionSQL: `SELECT patient_id, patient_name, conditions
FROM Patients
WHERE conditions LIKE 'DIAB1%' 
   OR conditions LIKE '% DIAB1%';`,
      lineByLineExplanation: [
        { clause: 'SELECT patient_id, patient_name, conditions', exp: 'Projects patient identity and the full list of medical condition codes.' },
        { clause: 'FROM Patients', exp: 'Targets the Patients registry table.' },
        { clause: 'WHERE conditions LIKE \'DIAB1%\' OR conditions LIKE \'% DIAB1%\';', exp: 'Ensures DIAB1 matches at the start of the string or immediately following a space delimiter, preventing false substring matches.' }
      ]
    ,
      trapsAndEdgeCases: [
        "The Substring False Positive: Writing WHERE conditions LIKE '%DIAB1%' wrongly matches words like 'SADIAB100'. The target code must start at index 0 or follow a space delimiter."
],
      alternativeSolutions: [
        {
                "name": "Regex Word Boundary",
                "complexity": "O(N * L) regex scan",
                "sql": "SELECT patient_id, patient_name, conditions\nFROM Patients\nWHERE conditions REGEXP '\\\\bDIAB1';",
                "explanation": "Uses word boundary regex '\\bDIAB1' to prevent embedded substring matches."
        }
]
    },

    {
      id: 1821,
      title: 'Find Customers With Positive Revenue this Year',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Amazon', 'Google'],
      interviewFreq: '82% (High - Dual Predicate Partition Filtering)',
      interviewRound: 'Technical Screen',
      prompt: `Write an SQL query to report the customers with positive revenue in the year 2021.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Customers
+--------------+------+
| Column Name  | Type |
+--------------+------+
| customer_id  | int  |
| year         | int  |
| revenue      | int  |
+--------------+------+
(customer_id, year) is the primary key for this table.
This table contains the customer ID and the revenue of customers in different years.
Note that the revenue can be negative.`,
      sampleInput: {
        table: 'Customers',
        columns: ['customer_id', 'year', 'revenue'],
        rows: [
          [1, 2018, 50],
          [1, 2021, 30],
          [1, 2020, 70],
          [2, 2021, -50],
          [3, 2018, 10],
          [3, 2021, -20],
          [4, 2021, 20]
        ]
      },
      expectedOutput: {
        columns: ['customer_id'],
        rows: [
          [1],
          [4]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 840 230" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="310" height="190" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="35" y="45" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">INPUT: Customers</text>
        <text x="35" y="75" fill="#64748b" font-family="monospace" font-size="10.5">1 | 2018 | 50 (Wrong Year)</text>
        <text x="35" y="100" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">1 | 2021 | 30 (MATCH! &gt; 0)</text>
        <text x="35" y="125" fill="#dc2626" font-family="monospace" font-size="10.5">2 | 2021 | -50 (Negative Revenue)</text>
        <text x="35" y="150" fill="#dc2626" font-family="monospace" font-size="10.5">3 | 2021 | -20 (Negative Revenue)</text>
        <text x="35" y="175" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">4 | 2021 | 20 (MATCH! &gt; 0)</text>

        <!-- Filter Gate -->
        <rect x="355" y="50" width="190" height="130" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="1.5"/>
        <text x="370" y="75" fill="#1d4ed8" font-family="monospace" font-size="11" font-weight="700">DUAL FILTER GATE</text>
        <text x="370" y="105" fill="#0f172a" font-family="monospace" font-size="11">year = 2021</text>
        <text x="370" y="125" fill="#2563eb" font-family="monospace" font-size="11">AND</text>
        <text x="370" y="145" fill="#0f172a" font-family="monospace" font-size="11">revenue &gt; 0</text>

        <!-- Output Box -->
        <rect x="575" y="20" width="245" height="190" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="590" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT: customer_id</text>
        <text x="590" y="90" fill="#166534" font-family="monospace" font-size="12" font-weight="700">1</text>
        <text x="590" y="130" fill="#166534" font-family="monospace" font-size="12" font-weight="700">4</text>
      </svg>`,
      logicBreakdown: [
        '1. The query must isolate records for the exact year 2021 using year = 2021.',
        '2. Strictly positive revenue means revenue > 0 (strictly greater than zero, eliminating zero and negative balances).',
        '3. Since (customer_id, year) is the primary key, each customer appears at most once for year 2021, so duplicate suppression is unnecessary.'
      ],
      solutionSQL: `SELECT customer_id
FROM Customers
WHERE year = 2021 
  AND revenue > 0;`,
      lineByLineExplanation: [
        { clause: 'SELECT customer_id', exp: 'Returns the customer identifiers.' },
        { clause: 'FROM Customers', exp: 'Queries the Customers annual revenue table.' },
        { clause: 'WHERE year = 2021 AND revenue > 0;', exp: 'Filters strictly for the 2021 accounting year and checks that revenue is positive.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Negative and Zero Revenues: Revenue can be negative. Filtering only year = 2021 without revenue > 0 returns loss-making accounts."
],
      alternativeSolutions: [
        {
                "name": "HAVING Partition Filter",
                "complexity": "O(N) grouping",
                "sql": "SELECT customer_id\nFROM Customers\nWHERE year = 2021\nGROUP BY customer_id\nHAVING SUM(revenue) > 0;",
                "explanation": "Aggregates revenue if multiple transactions existed per customer within the year."
        }
]
    },

    {
      id: 1741,
      title: 'Find Total Time Spent by Each Employee',
      difficulty: 'Easy',
      category: 'Filtering & Logic',
      companies: ['Amazon', 'Meta', 'Bloomberg'],
      interviewFreq: '87% (High - Composite Granularity Grouping & Subtraction)',
      interviewRound: 'Technical Interview',
      prompt: `Write an SQL query to calculate the total time in minutes spent by each employee on each day at the office. Note that within one day, an employee can enter and leave more than once. The time spent in one visit is out_time - in_time.\n\nReturn the result table in any order.`,
      schemaDescription: `Table: Employees
+-------------+------+
| Column Name | Type |
+-------------+------+
| emp_id      | int  |
| event_day   | date |
| in_time     | int  |
| out_time    | int  |
+-------------+------+
(emp_id, event_day, in_time) is the primary key of this table.
The table shows the employees' entries and exits in an office.
event_day is the day at which this event happened, in_time is the minute at which the employee entered the office, and out_time is the minute at which they left the office.
in_time and out_time are between 1 and 1440.
It is guaranteed that in_time < out_time for all rows, and that visits on the same day for an employee do not intersect.`,
      sampleInput: {
        table: 'Employees',
        columns: ['emp_id', 'event_day', 'in_time', 'out_time'],
        rows: [
          [1, '2020-11-28', 4, 32],
          [1, '2020-11-28', 55, 200],
          [1, '2020-12-03', 1, 42],
          [2, '2020-11-28', 3, 33],
          [2, '2020-12-09', 47, 74]
        ]
      },
      expectedOutput: {
        columns: ['day', 'emp_id', 'total_time'],
        rows: [
          ['2020-11-28', 1, 173],
          ['2020-11-28', 2, 30],
          ['2020-12-03', 1, 41],
          ['2020-12-09', 2, 27]
        ]
      },
      svgDiagram: `<svg viewBox="0 0 840 240" class="lc-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="310" height="210" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="28" y="38" fill="#0f172a" font-family="monospace" font-size="12" font-weight="700">INPUT: Multiple Visits per Day</text>

        <!-- Emp 1, Day 11-28 Group -->
        <rect x="25" y="50" width="290" height="52" fill="#eff6ff" stroke="#bfdbfe"/>
        <text x="32" y="70" fill="#1d4ed8" font-family="monospace" font-size="10.5">Emp 1 | 2020-11-28: 32 - 4 = 28m</text>
        <text x="32" y="90" fill="#1d4ed8" font-family="monospace" font-size="10.5">Emp 1 | 2020-11-28: 200 - 55 = 145m</text>

        <!-- Emp 2, Day 11-28 -->
        <rect x="25" y="110" width="290" height="30" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="32" y="130" fill="#64748b" font-family="monospace" font-size="10.5">Emp 2 | 2020-11-28: 33 - 3 = 30m</text>

        <!-- Others -->
        <text x="32" y="165" fill="#64748b" font-family="monospace" font-size="10.5">Emp 1 | 2020-12-03: 42 - 1 = 41m</text>
        <text x="32" y="195" fill="#64748b" font-family="monospace" font-size="10.5">Emp 2 | 2020-12-09: 74 - 47 = 27m</text>

        <!-- Aggregator Box -->
        <rect x="345" y="35" width="220" height="170" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="1.5"/>
        <text x="360" y="62" fill="#1d4ed8" font-family="monospace" font-size="11.5" font-weight="700">GROUP BY (event_day, emp_id)</text>
        <text x="360" y="95" fill="#0f172a" font-size="11">Duration Per Swipe:</text>
        <text x="360" y="115" fill="#2563eb" font-family="monospace" font-size="10.5">out_time - in_time</text>
        <text x="360" y="145" fill="#0f172a" font-size="11">Sum Daily Swipes:</text>
        <text x="360" y="165" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">SUM(out_time - in_time)</text>

        <!-- Output Box -->
        <rect x="585" y="20" width="235" height="200" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="600" y="45" fill="#15803d" font-family="monospace" font-size="12" font-weight="700">OUTPUT: (day, emp_id, total)</text>
        <text x="600" y="80" fill="#166534" font-family="monospace" font-size="10.5" font-weight="700">2020-11-28 | 1 | 173m</text>
        <text x="600" y="110" fill="#0f172a" font-family="monospace" font-size="10.5">2020-11-28 | 2 | 30m</text>
        <text x="600" y="140" fill="#0f172a" font-family="monospace" font-size="10.5">2020-12-03 | 1 | 41m</text>
        <text x="600" y="170" fill="#0f172a" font-family="monospace" font-size="10.5">2020-12-09 | 2 | 27m</text>
      </svg>`,
      logicBreakdown: [
        '1. The granularity of the output is per (event_day, emp_id). Therefore, we group by event_day and emp_id.',
        '2. For each individual row visit, the elapsed time in minutes is out_time - in_time.',
        '3. To get the daily total, we aggregate with SUM(out_time - in_time).',
        '4. Rename event_day to day and the aggregate to total_time per the problem specification.'
      ],
      solutionSQL: `SELECT 
    event_day AS day,
    emp_id,
    SUM(out_time - in_time) AS total_time
FROM Employees
GROUP BY event_day, emp_id;`,
      lineByLineExplanation: [
        { clause: 'SELECT event_day AS day, emp_id,', exp: 'Projects the date and employee ID, renaming event_day to day.' },
        { clause: 'SUM(out_time - in_time) AS total_time', exp: 'Computes each visit interval and sums all durations within that group.' },
        { clause: 'FROM Employees', exp: 'Specifies the Employees badge access records.' },
        { clause: 'GROUP BY event_day, emp_id;', exp: 'Partitions data so each distinct day and employee combination is aggregated together.' }
      ]
    ,
      trapsAndEdgeCases: [
        "Single-Key Grouping Trap: Grouping solely by emp_id aggregates across all days together. You MUST group by (event_day, emp_id).",
        "Column Aliasing: Spec mandates event_day AS day and SUM(...) AS total_time."
],
      alternativeSolutions: [
        {
                "name": "Positional Grouping (Analytics Engine)",
                "complexity": "O(N log N) sorting group",
                "sql": "SELECT event_day AS day, emp_id, SUM(out_time - in_time) AS total_time\nFROM Employees\nGROUP BY 1, 2;",
                "explanation": "Standard analytical warehouse convention referencing columns by SELECT position."
        }
]
    }
  ];

  return {
    conceptId: 'concept-1',
    conceptNumber: 1,
    title: 'Filtering & Three-Valued Logic',
    subtitle: masterclass.subtitle || 'Master 3-Valued Logic, SARGable predicates, and NULL edge-cases.',
    keyTakeaway: masterclass.keyTakeaway || 'WHERE filters rows before grouping; only strictly TRUE passes.',
    masterclass,
    mcqs,
    prepDrills,
    drills: prepDrills,
    leetcodeProblems,
    problems: leetcodeProblems
  };

})();
