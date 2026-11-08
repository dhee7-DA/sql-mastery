/**
 * SQL FOUNDRY - 80/20 UNIVERSAL PATTERN ACADEMY
 * Teaches the vital 20% of SQL archetypes that solve 80% of real-world company problems.
 * Includes deep subtopic breakdowns, intuitive visual mental models, and handcrafted dark-theme SVGs.
 */

(function(window) {
  'use strict';

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ===========================================================================
  // SVG DIAGRAM GENERATORS (Handcrafted with dark Koma.run styling)
  // ===========================================================================

  const SVG_LIBRARY = {
    // 1.1: INNER JOIN vs LEFT JOIN
    joinComparison: function() {
      return `
        <svg viewBox="0 0 680 230" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#0284c7" stop-opacity="0.1"/>
            </linearGradient>
            <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#34d399" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#059669" stop-opacity="0.1"/>
            </linearGradient>
            <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f87171" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#dc2626" stop-opacity="0.1"/>
            </linearGradient>
          </defs>

          <!-- Background Card -->
          <rect x="0" y="0" width="680" height="230" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <!-- LEFT SIDE: INNER JOIN -->
          <g transform="translate(20, 20)">
            <text x="140" y="22" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="700" letter-spacing="0.05em">INNER JOIN (ONLY MATCHES)</text>
            
            <!-- Table A -->
            <rect x="20" y="40" width="100" height="130" rx="6" fill="#18181c" stroke="#33333c" stroke-width="1"/>
            <text x="70" y="60" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">USERS (3)</text>
            <rect x="28" y="72" width="84" height="24" rx="4" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1"/>
            <text x="70" y="88" text-anchor="middle" fill="#e2e8f0" font-size="10.5" font-family="monospace">User #1</text>
            <rect x="28" y="102" width="84" height="24" rx="4" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1"/>
            <text x="70" y="118" text-anchor="middle" fill="#e2e8f0" font-size="10.5" font-family="monospace">User #2</text>
            <rect x="28" y="132" width="84" height="24" rx="4" fill="rgba(248,113,113,0.1)" stroke="#f87171" stroke-dasharray="2,2"/>
            <text x="70" y="148" text-anchor="middle" fill="#f87171" font-size="10.5" font-family="monospace">User #3 (No buy)</text>

            <!-- Table B -->
            <rect x="160" y="40" width="100" height="130" rx="6" fill="#18181c" stroke="#33333c" stroke-width="1"/>
            <text x="210" y="60" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">ORDERS (2)</text>
            <rect x="168" y="72" width="84" height="24" rx="4" fill="rgba(52,211,153,0.15)" stroke="#34d399" stroke-width="1"/>
            <text x="210" y="88" text-anchor="middle" fill="#e2e8f0" font-size="10.5" font-family="monospace">Order #101</text>
            <rect x="168" y="102" width="84" height="24" rx="4" fill="rgba(52,211,153,0.15)" stroke="#34d399" stroke-width="1"/>
            <text x="210" y="118" text-anchor="middle" fill="#e2e8f0" font-size="10.5" font-family="monospace">Order #102</text>

            <text x="140" y="195" text-anchor="middle" fill="#f87171" font-size="10.5">✕ User #3 dropped completely!</text>
          </g>

          <!-- Divider -->
          <line x1="335" y1="20" x2="335" y2="210" stroke="#27272e" stroke-dasharray="4,4"/>

          <!-- RIGHT SIDE: LEFT JOIN -->
          <g transform="translate(355, 20)">
            <text x="145" y="22" text-anchor="middle" fill="#34d399" font-size="12" font-weight="700" letter-spacing="0.05em">LEFT JOIN (KEEPS HOLES AS NULL)</text>
            
            <!-- Table A -->
            <rect x="15" y="40" width="105" height="130" rx="6" fill="#18181c" stroke="#33333c" stroke-width="1"/>
            <text x="67" y="60" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">USERS (3)</text>
            <rect x="23" y="72" width="89" height="24" rx="4" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1"/>
            <text x="67" y="88" text-anchor="middle" fill="#e2e8f0" font-size="10.5" font-family="monospace">User #1</text>
            <rect x="23" y="102" width="89" height="24" rx="4" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1"/>
            <text x="67" y="118" text-anchor="middle" fill="#e2e8f0" font-size="10.5" font-family="monospace">User #2</text>
            <rect x="23" y="132" width="89" height="24" rx="4" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="67" y="148" text-anchor="middle" fill="#38bdf8" font-size="10.5" font-weight="700" font-family="monospace">User #3 ★</text>

            <!-- Table B with NULL -->
            <rect x="160" y="40" width="115" height="130" rx="6" fill="#18181c" stroke="#33333c" stroke-width="1"/>
            <text x="217" y="60" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">MATCHED</text>
            <rect x="168" y="72" width="99" height="24" rx="4" fill="rgba(52,211,153,0.15)" stroke="#34d399" stroke-width="1"/>
            <text x="217" y="88" text-anchor="middle" fill="#e2e8f0" font-size="10.5" font-family="monospace">Order #101</text>
            <rect x="168" y="102" width="99" height="24" rx="4" fill="rgba(52,211,153,0.15)" stroke="#34d399" stroke-width="1"/>
            <text x="217" y="118" text-anchor="middle" fill="#e2e8f0" font-size="10.5" font-family="monospace">Order #102</text>
            <!-- The Null Box -->
            <rect x="168" y="132" width="99" height="24" rx="4" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-dasharray="3,3"/>
            <text x="217" y="148" text-anchor="middle" fill="#fde047" font-weight="700" font-size="10.5" font-family="monospace">NULL (Target!)</text>

            <text x="145" y="195" text-anchor="middle" fill="#34d399" font-size="10.5" font-weight="600">✓ User #3 survives with order_id = NULL</text>
          </g>
        </svg>
      `;
    },

    // 1.2: The Hole Hunter (Anti-Join filtering)
    antiJoinFilter: function() {
      return `
        <svg viewBox="0 0 680 160" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="160" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>
          
          <!-- Stage 1 -->
          <g transform="translate(30, 25)">
            <text x="90" y="20" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="700">1. LEFT JOIN OUTPUT</text>
            <rect x="0" y="32" width="180" height="26" rx="4" fill="#1c1c22" stroke="#2b2b36"/>
            <text x="15" y="49" fill="#94a3b8" font-size="10.5" font-family="monospace">User #1 | Order #101</text>
            <rect x="0" y="62" width="180" height="26" rx="4" fill="#1c1c22" stroke="#2b2b36"/>
            <text x="15" y="79" fill="#94a3b8" font-size="10.5" font-family="monospace">User #2 | Order #102</text>
            <rect x="0" y="92" width="180" height="26" rx="4" fill="rgba(245,158,11,0.12)" stroke="#f59e0b"/>
            <text x="15" y="109" fill="#fde047" font-weight="700" font-size="10.5" font-family="monospace">User #3 | NULL</text>
          </g>

          <!-- Arrow 1 -->
          <path d="M 235 88 L 275 88" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
          
          <!-- Filter Box -->
          <g transform="translate(285, 45)">
            <rect x="0" y="0" width="160" height="75" rx="6" fill="#18181f" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="80" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">2. WHERE CLAUSE</text>
            <rect x="15" y="34" width="130" height="26" rx="4" fill="#121217" stroke="#272730"/>
            <text x="80" y="51" text-anchor="middle" fill="#4ade80" font-size="10.5" font-weight="700" font-family="monospace">order_id IS NULL</text>
          </g>

          <!-- Arrow 2 -->
          <path d="M 465 88 L 505 88" stroke="#34d399" stroke-width="2"/>

          <!-- Stage 3 Output -->
          <g transform="translate(515, 45)">
            <rect x="0" y="0" width="135" height="75" rx="6" fill="rgba(52,211,153,0.1)" stroke="#34d399" stroke-width="1.5"/>
            <text x="67" y="24" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">3. FINAL RESULT</text>
            <rect x="12" y="34" width="111" height="26" rx="4" fill="#15261e" stroke="#34d399"/>
            <text x="67" y="51" text-anchor="middle" fill="#4ade80" font-weight="700" font-size="10.5" font-family="monospace">User #3 (Churn!)</text>
          </g>
        </svg>
      `;
    },

    // 2.1: GROUP BY vs PARTITION BY
    partitionVsGroupBy: function() {
      return `
        <svg viewBox="0 0 680 220" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="220" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <!-- GROUP BY (Collapses Rows) -->
          <g transform="translate(25, 20)">
            <text x="140" y="20" text-anchor="middle" fill="#f87171" font-size="11.5" font-weight="700">GROUP BY (SQUASHES ROWS)</text>
            <rect x="10" y="35" width="120" height="120" rx="6" fill="#18181c" stroke="#2f2f38"/>
            <text x="70" y="55" text-anchor="middle" fill="#94a3b8" font-size="10.5">6 Raw Rows</text>
            <text x="70" y="80" text-anchor="middle" fill="#cbd5e1" font-size="10" font-family="monospace">Shoes #1 ($80)</text>
            <text x="70" y="100" text-anchor="middle" fill="#cbd5e1" font-size="10" font-family="monospace">Shoes #2 ($120)</text>
            <text x="70" y="120" text-anchor="middle" fill="#cbd5e1" font-size="10" font-family="monospace">Shoes #3 ($45)</text>

            <!-- Arrow -->
            <path d="M 140 95 L 175 95" stroke="#f87171" stroke-width="2"/>

            <rect x="185" y="55" width="105" height="80" rx="6" fill="rgba(248,113,113,0.1)" stroke="#f87171"/>
            <text x="237" y="78" text-anchor="middle" fill="#f87171" font-size="10" font-weight="700">Only 1 Summary</text>
            <text x="237" y="105" text-anchor="middle" fill="#e2e8f0" font-size="10" font-family="monospace">SUM = $245</text>
            <text x="140" y="185" text-anchor="middle" fill="#94a3b8" font-size="10">Individual items destroyed!</text>
          </g>

          <!-- Divider -->
          <line x1="335" y1="20" x2="335" y2="200" stroke="#27272e" stroke-dasharray="4,4"/>

          <!-- PARTITION BY (Keeps Rows & Adds Tag) -->
          <g transform="translate(355, 20)">
            <text x="150" y="20" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="700">PARTITION BY (KEEPS ROWS + ADDS RANK)</text>
            <rect x="10" y="35" width="280" height="130" rx="6" fill="#18181c" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="25" y="58" fill="#94a3b8" font-size="10.5" font-weight="700">Department</text>
            <text x="125" y="58" fill="#94a3b8" font-size="10.5" font-weight="700">Product</text>
            <text x="230" y="58" fill="#38bdf8" font-size="10.5" font-weight="700">ROW_NUMBER</text>

            <rect x="15" y="68" width="270" height="24" rx="4" fill="rgba(56,189,248,0.1)"/>
            <text x="25" y="84" fill="#cbd5e1" font-size="10" font-family="monospace">Shoes</text>
            <text x="125" y="84" fill="#cbd5e1" font-size="10" font-family="monospace">Nike Air ($120)</text>
            <text x="245" y="84" fill="#38bdf8" font-weight="700" font-size="11" font-family="monospace">#1 🥇</text>

            <rect x="15" y="96" width="270" height="24" rx="4" fill="#141418"/>
            <text x="25" y="112" fill="#cbd5e1" font-size="10" font-family="monospace">Shoes</text>
            <text x="125" y="112" fill="#cbd5e1" font-size="10" font-family="monospace">Adidas ($80)</text>
            <text x="245" y="112" fill="#38bdf8" font-weight="700" font-size="11" font-family="monospace">#2 🥈</text>

            <rect x="15" y="124" width="270" height="24" rx="4" fill="#141418"/>
            <text x="25" y="140" fill="#cbd5e1" font-size="10" font-family="monospace">Shoes</text>
            <text x="125" y="140" fill="#cbd5e1" font-size="10" font-family="monospace">Puma ($45)</text>
            <text x="245" y="140" fill="#38bdf8" font-weight="700" font-size="11" font-family="monospace">#3 🥉</text>

            <text x="150" y="188" text-anchor="middle" fill="#34d399" font-size="10" font-weight="600">✓ Every row survives with an exact rank sticker!</text>
          </g>
        </svg>
      `;
    },

    // 2.2: The Three Ranks (Tie Race)
    rankComparison: function() {
      return `
        <svg viewBox="0 0 680 170" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="170" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <text x="340" y="24" text-anchor="middle" fill="#fde047" font-size="12" font-weight="700">TIE BREAKING: SONY ($1,200) vs SAMSUNG ($1,200) vs LG ($900)</text>

          <!-- ROW NUMBER -->
          <g transform="translate(30, 42)">
            <rect x="0" y="0" width="185" height="105" rx="6" fill="#18181f" stroke="#38bdf8" stroke-width="1"/>
            <text x="92" y="22" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">ROW_NUMBER()</text>
            <text x="20" y="45" fill="#cbd5e1" font-size="10.5" font-family="monospace">Sony:    <tspan fill="#38bdf8" font-weight="700">1</tspan></text>
            <text x="20" y="65" fill="#cbd5e1" font-size="10.5" font-family="monospace">Samsung: <tspan fill="#38bdf8" font-weight="700">2</tspan> (arbitrary)</text>
            <text x="20" y="85" fill="#cbd5e1" font-size="10.5" font-family="monospace">LG:      <tspan fill="#38bdf8" font-weight="700">3</tspan></text>
          </g>

          <!-- RANK -->
          <g transform="translate(245, 42)">
            <rect x="0" y="0" width="185" height="105" rx="6" fill="#18181f" stroke="#a78bfa" stroke-width="1"/>
            <text x="92" y="22" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="700">RANK() (With Gaps)</text>
            <text x="20" y="45" fill="#cbd5e1" font-size="10.5" font-family="monospace">Sony:    <tspan fill="#a78bfa" font-weight="700">1</tspan></text>
            <text x="20" y="65" fill="#cbd5e1" font-size="10.5" font-family="monospace">Samsung: <tspan fill="#a78bfa" font-weight="700">1</tspan> (Tie!)</text>
            <text x="20" y="85" fill="#cbd5e1" font-size="10.5" font-family="monospace">LG:      <tspan fill="#f87171" font-weight="700">3</tspan> (Skips 2!)</text>
          </g>

          <!-- DENSE RANK -->
          <g transform="translate(460, 42)">
            <rect x="0" y="0" width="190" height="105" rx="6" fill="#18181f" stroke="#34d399" stroke-width="1.5"/>
            <text x="95" y="22" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">DENSE_RANK() (Best for Top N)</text>
            <text x="20" y="45" fill="#cbd5e1" font-size="10.5" font-family="monospace">Sony:    <tspan fill="#34d399" font-weight="700">1</tspan></text>
            <text x="20" y="65" fill="#cbd5e1" font-size="10.5" font-family="monospace">Samsung: <tspan fill="#34d399" font-weight="700">1</tspan> (Tie!)</text>
            <text x="20" y="85" fill="#cbd5e1" font-size="10.5" font-family="monospace">LG:      <tspan fill="#34d399" font-weight="700">2</tspan> (No gaps!)</text>
          </g>
        </svg>
      `;
    },

    // 3.1: Timeline WHERE vs HAVING
    timelineWhereHaving: function() {
      return `
        <svg viewBox="0 0 680 180" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="180" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <text x="340" y="22" text-anchor="middle" fill="#94a3b8" font-size="11.5" font-weight="700" letter-spacing="0.04em">THE EXECUTION TIMELINE: WHERE vs. HAVING</text>

          <!-- Step 1: FROM -->
          <g transform="translate(25, 45)">
            <rect x="0" y="0" width="125" height="95" rx="6" fill="#18181f" stroke="#33333d"/>
            <text x="62" y="24" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">1. FROM</text>
            <text x="62" y="45" text-anchor="middle" fill="#94a3b8" font-size="10">Raw Data</text>
            <text x="62" y="65" text-anchor="middle" fill="#cbd5e1" font-size="10" font-family="monospace">10,000 Rows</text>
            <text x="62" y="82" text-anchor="middle" fill="#71717a" font-size="9.5">Transactions</text>
          </g>

          <path d="M 160 92 L 180 92" stroke="#38bdf8" stroke-width="2"/>

          <!-- Step 2: WHERE -->
          <g transform="translate(190, 45)">
            <rect x="0" y="0" width="135" height="95" rx="6" fill="#18181f" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="67" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">2. WHERE</text>
            <text x="67" y="45" text-anchor="middle" fill="#94a3b8" font-size="10">Filters Individual Rows</text>
            <text x="67" y="65" text-anchor="middle" fill="#cbd5e1" font-size="10" font-family="monospace">status = 'active'</text>
            <text x="67" y="82" text-anchor="middle" fill="#38bdf8" font-size="9.5">Leaves 4,000 Rows</text>
          </g>

          <path d="M 335 92 L 355 92" stroke="#a78bfa" stroke-width="2"/>

          <!-- Step 3: GROUP BY -->
          <g transform="translate(365, 45)">
            <rect x="0" y="0" width="130" height="95" rx="6" fill="#18181f" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="65" y="24" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="700">3. GROUP BY</text>
            <text x="65" y="45" text-anchor="middle" fill="#94a3b8" font-size="10">Piles by Merchant</text>
            <text x="65" y="65" text-anchor="middle" fill="#cbd5e1" font-size="10" font-family="monospace">500 Merchants</text>
            <text x="65" y="82" text-anchor="middle" fill="#a78bfa" font-size="9.5">Calculates Counts</text>
          </g>

          <path d="M 505 92 L 525 92" stroke="#34d399" stroke-width="2"/>

          <!-- Step 4: HAVING -->
          <g transform="translate(535, 45)">
            <rect x="0" y="0" width="125" height="95" rx="6" fill="#15261e" stroke="#34d399" stroke-width="1.5"/>
            <text x="62" y="24" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">4. HAVING</text>
            <text x="62" y="45" text-anchor="middle" fill="#94a3b8" font-size="10">Filters Summary Piles</text>
            <text x="62" y="65" text-anchor="middle" fill="#4ade80" font-size="10" font-family="monospace">COUNT(*) >= 5</text>
            <text x="62" y="82" text-anchor="middle" fill="#34d399" font-size="9.5 font-weight="700">Final 12 Outliers</text>
          </g>

          <text x="340" y="162" text-anchor="middle" fill="#f87171" font-size="10">⚠️ TRAP: You cannot put COUNT(*) in step #2 (WHERE), because the groups do not exist yet!</text>
        </svg>
      `;
    }
  };

  // ===========================================================================
  // THE 10 MASTER PATTERNS CATALOG WITH DEEP SUBTOPIC MASTERY
  // ===========================================================================

  const PATTERNS = [
    // -------------------------------------------------------------------------
    // PATTERN 1: THE MISSING MATCH (ANTI-JOIN)
    // -------------------------------------------------------------------------
    {
      id: 'anti_join',
      tier: 1,
      tierName: 'Tier 1: Everyday Essentials',
      title: '01. The Missing Match (Anti-Join)',
      subtitle: 'Identify customers, accounts, or items that have zero recorded activity',
      tag: 'CHURN & DORMANT USERS',
      companies: ['amazon', 'netflix', 'uber', 'stripe'],
      
      businessContext: `
        At every tech company, leaders constantly ask: 
        <em>"Who signed up but never made a purchase?"</em>, <em>"Which rides got canceled?"</em>, or <em>"Which products have zero sales?"</em>
        This is the single most common question in analytics because finding inactive users allows marketing to send targeted re-engagement emails.
      `,

      mentalModelText: `
        Imagine Table A is a list of 100 registered users. Table B is a stack of 80 shopping receipts. 
        When you connect them using a <strong>LEFT JOIN</strong>, the 80 users who bought items get paired with their receipt. 
        The 20 users who never bought anything have a blank hole on the right: <code>receipt_id IS NULL</code>. 
        All SQL does is filter for those exact holes!
      `,

      subtopics: [
        {
          num: '1.1',
          title: 'The Stepping Stone: INNER JOIN vs. LEFT JOIN',
          summary: 'Why standard INNER JOIN erases inactive users, and how LEFT JOIN keeps them alive with NULL placeholders.',
          svgName: 'joinComparison',
          rules: [
            '<strong>INNER JOIN:</strong> Drops any row from the left table that does not have an exact match in the right table.',
            '<strong>LEFT JOIN:</strong> Keeps 100% of rows from the left table, even if there is no match, filling empty right-side columns with <code>NULL</code>.'
          ]
        },
        {
          num: '1.2',
          title: 'The Hole Hunter: Why We Test For NULL',
          summary: 'In SQL, NULL means "missing or unknown". By asking for rows where the right ID is NULL, we isolate non-buyers.',
          svgName: 'antiJoinFilter',
          rules: [
            'Always filter on the <strong>primary key of the right table</strong> (e.g. <code>WHERE orders.order_id IS NULL</code>).',
            'Never test non-key columns, as a non-key column might be NULL even if an order actually occurred.'
          ]
        },
        {
          num: '1.3',
          title: 'The Silent Interview Trap: = NULL vs. IS NULL',
          summary: 'The #1 reason candidates fail SQL screenings on joins.',
          rules: [
            '❌ <code>WHERE order_id = NULL</code>: In SQL, <code>NULL = NULL</code> is FALSE! This returns 0 rows silently.',
            '✅ <code>WHERE order_id IS NULL</code>: Correctly identifies empty placeholders.'
          ]
        }
      ],

      universalBlueprint: `-- UNIVERSAL ANTI-JOIN BLUEPRINT
SELECT 
  a.id, 
  a.name, 
  a.created_at
FROM parent_table a
LEFT JOIN activity_table b 
  ON a.id = b.parent_id
WHERE b.id IS NULL;`,

      companyVariants: {
        amazon: {
          name: 'Amazon Prime',
          question: 'Find Prime customers who signed up on Day 1 but placed zero orders in their first 30 days.',
          sql: `-- Amazon: Prime members with 0 orders in first 30 days
SELECT DISTINCT 
  o1.customer_id, 
  o1.purchase_date, 
  o1.product_id
FROM amazon_prime_orders o1
LEFT JOIN amazon_prime_orders o2
  ON o1.customer_id = o2.customer_id
  AND o2.purchase_date > o1.purchase_date
  AND o2.purchase_date <= DATE(o1.purchase_date, '+30 days')
WHERE o2.order_id IS NULL;`
        },
        netflix: {
          name: 'Netflix Streaming',
          question: 'Find accounts that were active this week but generated 0 playback sessions.',
          sql: `-- Netflix: Subscribers who watched 0 hours
SELECT 
  u.event_id, 
  u.isp_asn, 
  u.platform
FROM playback_telemetry_events u
LEFT JOIN playback_telemetry_events p 
  ON u.isp_asn = p.isp_asn AND p.ttff_ms > 0
WHERE p.event_id IS NULL;`
        },
        uber: {
          name: 'Uber Rides',
          question: 'Find riders who opened the app and requested a ride but had 0 completed trips.',
          sql: `-- Uber: Churned riders with 0 completed pickups
SELECT 
  r.rider_id, 
  r.city, 
  r.signup_date
FROM uber_riders r
LEFT JOIN uber_trips t 
  ON r.rider_id = t.rider_id AND t.status = 'COMPLETED'
WHERE t.trip_id IS NULL;`
        },
        stripe: {
          name: 'Stripe Payments',
          question: 'Find merchants who generated an invoice but never had a successful charge captured.',
          sql: `-- Stripe: Invoices with 0 captured payment attempts
SELECT 
  i.invoice_id, 
  i.merchant_id, 
  i.amount_usd
FROM stripe_invoices i
LEFT JOIN stripe_charges c 
  ON i.invoice_id = c.invoice_id AND c.status = 'succeeded'
WHERE c.charge_id IS NULL;`
        }
      }
    },

    // -------------------------------------------------------------------------
    // PATTERN 2: TOP N PER GROUP (RANKING)
    // -------------------------------------------------------------------------
    {
      id: 'top_n_ranking',
      tier: 1,
      tierName: 'Tier 1: Everyday Essentials',
      title: '02. Top N Per Group (Category Leaders)',
      subtitle: 'Rank items within each category and slice out only the top 1, 2, or 3 winners',
      tag: 'LEADERBOARDS & RANKINGS',
      companies: ['amazon', 'netflix', 'uber', 'stripe'],

      businessContext: `
        Businesses love leaderboards: <em>"What are the top 3 best-selling products in each department?"</em>, 
        <em>"Who is the highest-spending customer per country?"</em>, or <em>"Top 5 most-watched TV shows per region."</em>
      `,

      mentalModelText: `
        Think of organizing a school sports day. Instead of one single race with 1,000 students, you divide students into classes (PARTITION BY). 
        Within each class, students race and you stamp gold, silver, and bronze ribbons (#1, #2, #3). 
        Finally, you take only the ribbon winners.
      `,

      subtopics: [
        {
          num: '2.1',
          title: 'The Stepping Stone: GROUP BY vs. PARTITION BY',
          summary: 'Why GROUP BY collapses your raw rows, while PARTITION BY preserves every row and stamps a calculated rank tag.',
          svgName: 'partitionVsGroupBy',
          rules: [
            '<strong>GROUP BY:</strong> Destroys individual rows and outputs 1 summary row per bucket.',
            '<strong>PARTITION BY:</strong> Keeps 100% of individual rows intact and attaches a new rank column.'
          ]
        },
        {
          num: '2.2',
          title: 'The 3-Way Tie Race: ROW_NUMBER vs. RANK vs. DENSE_RANK',
          summary: 'How ties are resolved when two competitors have the exact same score ($1,200).',
          svgName: 'rankComparison',
          rules: [
            '<strong>ROW_NUMBER():</strong> 1, 2, 3 (no ties allowed; breaks ties arbitrarily).',
            '<strong>RANK():</strong> 1, 1, 3 (skips rank #2 after a tie).',
            '<strong>DENSE_RANK():</strong> 1, 1, 2 (no gaps after a tie; standard for top N leaderboards).'
          ]
        },
        {
          num: '2.3',
          title: 'The Silent Interview Trap: Window Functions in WHERE',
          summary: 'Why you cannot write "WHERE ROW_NUMBER() <= 3" directly in the same query.',
          rules: [
            'SQL processes <code>WHERE</code> <em>before</em> window functions are calculated.',
            'Always wrap the ranking inside a <strong>Common Table Expression (WITH ranked AS (...))</strong> or subquery, then filter <code>WHERE rank_num <= 3</code> on the outside.'
          ]
        }
      ],

      universalBlueprint: `-- UNIVERSAL TOP-N BLUEPRINT
WITH ranked AS (
  SELECT
    category,
    item_name,
    metric_value,
    DENSE_RANK() OVER (
      PARTITION BY category 
      ORDER BY metric_value DESC
    ) AS rank_num
  FROM raw_items
)
SELECT *
FROM ranked
WHERE rank_num <= 3;`,

      companyVariants: {
        amazon: {
          name: 'Amazon Retail',
          question: 'Find the top 3 most expensive products in each product department.',
          sql: `-- Amazon: Top 3 highest-priced items per department
WITH ranked_products AS (
  SELECT 
    department,
    product_name,
    price_usd,
    DENSE_RANK() OVER (
      PARTITION BY department 
      ORDER BY price_usd DESC
    ) AS rank_num
  FROM products_catalog
)
SELECT department, product_name, price_usd, rank_num
FROM ranked_products
WHERE rank_num <= 3;`
        },
        netflix: {
          name: 'Netflix Telemetry',
          question: 'Find the top 2 slowest internet providers (highest TTFF buffer latency) in each region.',
          sql: `-- Netflix: Top 2 highest-latency ISPs per region
WITH isp_latency AS (
  SELECT 
    isp_asn,
    city,
    ttff_ms,
    ROW_NUMBER() OVER (
      PARTITION BY city 
      ORDER BY ttff_ms DESC
    ) AS latency_rank
  FROM playback_telemetry_events
)
SELECT city, isp_asn, ttff_ms, latency_rank
FROM isp_latency
WHERE latency_rank <= 2;`
        },
        uber: {
          name: 'Uber Mobility',
          question: 'Find the top 3 highest-fare rides completed in each city today.',
          sql: `-- Uber: Top 3 highest-paying trips per city
WITH ranked_trips AS (
  SELECT 
    city,
    trip_id,
    fare_usd,
    DENSE_RANK() OVER (
      PARTITION BY city 
      ORDER BY fare_usd DESC
    ) AS fare_rank
  FROM uber_trips
)
SELECT city, trip_id, fare_usd, fare_rank
FROM ranked_trips
WHERE fare_rank <= 3;`
        },
        stripe: {
          name: 'Stripe Payments',
          question: 'Find the top 2 highest-volume merchant accounts in each currency.',
          sql: `-- Stripe: Top 2 highest-volume accounts per currency
WITH merchant_rankings AS (
  SELECT 
    currency,
    merchant_id,
    volume_usd,
    ROW_NUMBER() OVER (
      PARTITION BY currency 
      ORDER BY volume_usd DESC
    ) AS volume_rank
  FROM merchant_metrics
)
SELECT currency, merchant_id, volume_usd, volume_rank
FROM merchant_rankings
WHERE volume_rank <= 2;`
        }
      }
    },

    // -------------------------------------------------------------------------
    // PATTERN 3: THRESHOLDS & OUTLIERS (HAVING)
    // -------------------------------------------------------------------------
    {
      id: 'outliers_having',
      tier: 1,
      tierName: 'Tier 1: Everyday Essentials',
      title: '03. Outliers & Thresholds (GROUP BY + HAVING)',
      subtitle: 'Aggregate millions of events and isolate only the suspicious groups that cross a critical benchmark',
      tag: 'FRAUD & ANOMALY DETECTION',
      companies: ['amazon', 'netflix', 'uber', 'stripe'],

      businessContext: `
        Fraud and security teams need to detect anomalies in real time: 
        <em>"Which merchant has more than 10 chargebacks this week?"</em>, 
        <em>"Which user had > 5 failed passwords?"</em>, or <em>"Which ISPs have an average buffer time over 2 seconds?"</em>
      `,

      mentalModelText: `
        Imagine sorting letters into mailboxes for 500 different recipients (GROUP BY). 
        Then you place each mailbox on a weight scale. 
        Instead of reading every letter, you only inspect the mailboxes that weigh more than 10 pounds (HAVING).
      `,

      subtopics: [
        {
          num: '3.1',
          title: 'The Stepping Stone: The Timeline of WHERE vs. HAVING',
          summary: 'WHERE filters individual raw rows BEFORE aggregation; HAVING filters group summaries AFTER aggregation.',
          svgName: 'timelineWhereHaving',
          rules: [
            '<strong>WHERE:</strong> Runs first on individual rows. Cannot contain aggregate functions like <code>COUNT(*)</code> or <code>AVG()</code>.',
            '<strong>HAVING:</strong> Runs after groups are formed. Used specifically to test aggregate conditions.'
          ]
        },
        {
          num: '3.2',
          title: 'The Silent Interview Trap: Putting Aggregates in WHERE',
          summary: 'The classic syntax error that reveals a candidate doesn\'t understand SQL query execution order.',
          rules: [
            '❌ <code>WHERE COUNT(*) > 5</code>: Causes immediate error: "aggregate function not allowed in WHERE".',
            '✅ <code>GROUP BY merchant_id HAVING COUNT(*) > 5</code>: Correctly filters summary totals.'
          ]
        }
      ],

      universalBlueprint: `-- UNIVERSAL THRESHOLD / OUTLIER BLUEPRINT
SELECT 
  entity_id,
  COUNT(*) AS event_count,
  SUM(metric_value) AS total_metric
FROM event_log
WHERE event_status = 'confirmed'   -- 1. Filter raw rows first
GROUP BY entity_id                 -- 2. Group into buckets
HAVING COUNT(*) >= 5               -- 3. Filter group aggregates
ORDER BY event_count DESC;`,

      companyVariants: {
        amazon: {
          name: 'Amazon Catalog',
          question: 'Find third-party sellers who uploaded more than 5 products priced above $1,000.',
          sql: `-- Amazon: Sellers with high concentration of luxury items
SELECT 
  merchant_id,
  COUNT(*) AS luxury_item_count,
  ROUND(AVG(price_usd), 2) AS avg_luxury_price
FROM products_catalog
WHERE price_usd >= 1000.00
GROUP BY merchant_id
HAVING COUNT(*) >= 3
ORDER BY luxury_item_count DESC;`
        },
        netflix: {
          name: 'Netflix Telemetry',
          question: 'Find ISPs with more than 3 high-latency events where TTFF exceeded 1,500ms.',
          sql: `-- Netflix: Problem ISPs with excessive rebuffering events
SELECT 
  isp_asn,
  COUNT(*) AS slow_stream_count,
  ROUND(AVG(ttff_ms), 1) AS avg_ttff_latency
FROM playback_telemetry_events
WHERE ttff_ms > 1500
GROUP BY isp_asn
HAVING COUNT(*) >= 2
ORDER BY avg_ttff_latency DESC;`
        },
        uber: {
          name: 'Uber Operations',
          question: 'Find cities with more than 10 rides during high surge multiplier (> 1.8x).',
          sql: `-- Uber: Surge concentration hotspots
SELECT 
  city,
  COUNT(*) AS surge_ride_count,
  ROUND(AVG(fare_usd), 2) AS avg_surge_fare
FROM uber_trips
WHERE surge_multiplier >= 1.8
GROUP BY city
HAVING COUNT(*) >= 5
ORDER BY surge_ride_count DESC;`
        },
        stripe: {
          name: 'Stripe Risk & Fraud',
          question: 'Find accounts that have more than 3 failed charge attempts in the last 24 hours.',
          sql: `-- Stripe: Fraud risk accounts with high card declines
SELECT 
  merchant_id,
  COUNT(*) AS failed_attempt_count,
  SUM(amount_usd) AS at_risk_volume
FROM stripe_charges
WHERE status = 'declined'
GROUP BY merchant_id
HAVING COUNT(*) >= 3
ORDER BY failed_attempt_count DESC;`
        }
      }
    }
  ];

  // ===========================================================================
  // PATTERN HUB STATE & ENGINE
  // ===========================================================================

  let activePatternId = 'anti_join';
  let activeCompanyMap = {
    anti_join: 'amazon',
    top_n_ranking: 'amazon',
    outliers_having: 'amazon'
  };

  function getActivePattern() {
    return PATTERNS.find(p => p.id === activePatternId) || PATTERNS[0];
  }

  function renderPatternHubHtml() {
    const p = getActivePattern();
    const curCompany = activeCompanyMap[p.id] || 'amazon';
    const variant = p.companyVariants[curCompany] || p.companyVariants.amazon;

    return `
      <div class="koma-pattern-hub-overlay" id="komaPatternHubModal">
        <div class="koma-pattern-hub-modal">
          
          <!-- Top Bar -->
          <div class="koma-hub-topbar">
            <div class="koma-hub-branding">
              <span class="koma-hub-dna-icon">🧬</span>
              <div>
                <h2 class="koma-hub-title">80/20 Universal SQL Pattern Academy</h2>
                <p class="koma-hub-subtitle">Master the 10 vital archetypes that solve 80% of company database questions</p>
              </div>
            </div>
            <button class="koma-hub-close-btn" onclick="window.SQL_PATTERN_HUB.close()" title="Close Pattern Academy">✕</button>
          </div>

          <!-- Main Layout -->
          <div class="koma-hub-body">
            
            <!-- Left Sidebar: Pattern Index -->
            <div class="koma-hub-sidebar">
              <div class="koma-hub-tier-label">🟢 TIER 1: EVERYDAY ESSENTIALS</div>
              ${PATTERNS.filter(x => x.tier === 1).map(item => `
                <button class="koma-hub-nav-item ${item.id === activePatternId ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectPattern('${item.id}')">
                  <div class="koma-hub-nav-title">${escapeHtml(item.title)}</div>
                  <span class="koma-hub-nav-tag">${escapeHtml(item.tag)}</span>
                </button>
              `).join('')}

              <div class="koma-hub-tier-label" style="margin-top:16px;">🟡 TIER 2: BUSINESS GROWTH</div>
              <div class="koma-hub-nav-item locked">
                <div class="koma-hub-nav-title">04. Period-over-Period Deltas (LAG)</div>
                <span class="koma-hub-nav-tag">GROWTH & MOM</span>
              </div>
              <div class="koma-hub-nav-item locked">
                <div class="koma-hub-nav-title">05. Cumulative Windows & Rolling Averages</div>
                <span class="koma-hub-nav-tag">RUNNING TOTALS</span>
              </div>
              <div class="koma-hub-nav-item locked">
                <div class="koma-hub-nav-title">06. Multi-Step Funnel Milestones</div>
                <span class="koma-hub-nav-tag">CONVERSIONS</span>
              </div>

              <div class="koma-hub-tier-label" style="margin-top:16px;">🔴 TIER 3: BIG TECH ARSENAL</div>
              <div class="koma-hub-nav-item locked">
                <div class="koma-hub-nav-title">07. Deduplication & Latest State</div>
                <span class="koma-hub-nav-tag">CLEAN DATA</span>
              </div>
              <div class="koma-hub-nav-item locked">
                <div class="koma-hub-nav-title">08. Consecutive Streaks (Gaps & Islands)</div>
                <span class="koma-hub-nav-tag">ENGAGEMENT</span>
              </div>
            </div>

            <!-- Right Stage: Deep Learning Blueprint -->
            <div class="koma-hub-content">
              
              <!-- Pattern Hero Header -->
              <div class="koma-pattern-hero">
                <div class="koma-pattern-meta">
                  <span class="koma-pill-tier">${escapeHtml(p.tierName)}</span>
                  <span class="koma-pill-tag">${escapeHtml(p.tag)}</span>
                </div>
                <h1 class="koma-pattern-name">${escapeHtml(p.title)}</h1>
                <p class="koma-pattern-lead">${escapeHtml(p.subtitle)}</p>
              </div>

              <!-- 1. The Business Problem -->
              <div class="koma-pattern-section">
                <h3 class="koma-sec-heading"><span class="sec-icon">🎯</span> 1. The Real Business Problem</h3>
                <div class="koma-sec-box business-box">
                  <p>${p.businessContext}</p>
                </div>
              </div>

              <!-- 2. Visual Mental Model -->
              <div class="koma-pattern-section">
                <h3 class="koma-sec-heading"><span class="sec-icon">🧠</span> 2. The Visual Mental Model (How To Picture It)</h3>
                <div class="koma-sec-box">
                  <p class="koma-mental-lead">${p.mentalModelText}</p>
                </div>
              </div>

              <!-- 3. Stepping Stones & Subtopics with SVGs -->
              <div class="koma-pattern-section">
                <h3 class="koma-sec-heading"><span class="sec-icon">🪜</span> 3. Stepping Stones: Concepts Needed to Master This</h3>
                <div class="koma-subtopics-list">
                  ${p.subtopics.map(st => `
                    <div class="koma-subtopic-card">
                      <div class="koma-subtopic-header">
                        <span class="koma-subtopic-num">${escapeHtml(st.num)}</span>
                        <h4 class="koma-subtopic-title">${escapeHtml(st.title)}</h4>
                      </div>
                      <p class="koma-subtopic-desc">${escapeHtml(st.summary)}</p>
                      
                      ${st.svgName && SVG_LIBRARY[st.svgName] ? `
                        <div class="koma-svg-viewport">
                          ${SVG_LIBRARY[st.svgName]()}
                        </div>
                      ` : ''}

                      ${st.rules && st.rules.length ? `
                        <div class="koma-subtopic-rules">
                          ${st.rules.map(r => `<div class="subtopic-rule-item">${r}</div>`).join('')}
                        </div>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- 4. Universal Blueprint Skeleton -->
              <div class="koma-pattern-section">
                <h3 class="koma-sec-heading"><span class="sec-icon">📐</span> 4. The Universal SQL Skeleton</h3>
                <div class="koma-blueprint-box">
                  <pre><code>${escapeHtml(p.universalBlueprint)}</code></pre>
                </div>
              </div>

              <!-- 5. Cross-Company Chameleon -->
              <div class="koma-pattern-section">
                <div class="koma-company-header-row">
                  <h3 class="koma-sec-heading"><span class="sec-icon">🏢</span> 5. Cross-Company Chameleon (Same Pattern Everywhere)</h3>
                  <div class="koma-company-pills">
                    ${p.companies.map(cKey => `
                      <button class="koma-comp-pill ${cKey === curCompany ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('${cKey}')">
                        ${cKey === 'amazon' ? '🛒 Amazon' : (cKey === 'netflix' ? '🍿 Netflix' : (cKey === 'uber' ? '🚗 Uber' : '💳 Stripe'))}
                      </button>
                    `).join('')}
                  </div>
                </div>

                <div class="koma-company-card">
                  <div class="koma-comp-challenge-prompt">
                    <strong>${escapeHtml(variant.name)} Question:</strong> ${escapeHtml(variant.question)}
                  </div>
                  <div class="koma-comp-sql-box">
                    <pre><code>${escapeHtml(variant.sql)}</code></pre>
                  </div>
                  <div class="koma-comp-actions">
                    <button class="koma-btn-load-run" onclick="window.SQL_PATTERN_HUB.loadAndRun('${p.id}', '${curCompany}')">
                      <span>🚀 Load into Live Editor &amp; Run Query</span>
                    </button>
                    <span class="koma-comp-note">Loads into SQL Foundry with live data, clause highlights, and data shrink preview!</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    `;
  }

  // ===========================================================================
  // PUBLIC CONTROLLER API
  // ===========================================================================

  const SqlPatternHub = {
    open: function(patternId) {
      if (patternId) activePatternId = patternId;
      let modal = document.getElementById('komaPatternHubMount');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'komaPatternHubMount';
        document.body.appendChild(modal);
      }
      modal.innerHTML = renderPatternHubHtml();
      document.body.style.overflow = 'hidden';
      if (window.soundFX && typeof window.soundFX.playPop === 'function') {
        try { window.soundFX.playPop(); } catch(e) {}
      }
    },

    close: function() {
      const modal = document.getElementById('komaPatternHubMount');
      if (modal) modal.innerHTML = '';
      document.body.style.overflow = '';
    },

    selectPattern: function(patternId) {
      activePatternId = patternId;
      const modal = document.getElementById('komaPatternHubMount');
      if (modal) modal.innerHTML = renderPatternHubHtml();
      if (window.soundFX && typeof window.soundFX.playClick === 'function') {
        try { window.soundFX.playClick(); } catch(e) {}
      }
    },

    selectCompany: function(companyKey) {
      activeCompanyMap[activePatternId] = companyKey;
      const modal = document.getElementById('komaPatternHubMount');
      if (modal) modal.innerHTML = renderPatternHubHtml();
      if (window.soundFX && typeof window.soundFX.playClick === 'function') {
        try { window.soundFX.playClick(); } catch(e) {}
      }
    },

    loadAndRun: function(patternId, companyKey) {
      const p = PATTERNS.find(x => x.id === patternId);
      if (!p) return;
      const variant = p.companyVariants[companyKey] || p.companyVariants.amazon;
      if (!variant) return;

      this.close();

      const textarea = document.getElementById('komaSqlEditor');
      if (textarea && window.LANDING_PAGE_ENGINE) {
        textarea.value = variant.sql;
        window.LANDING_PAGE_ENGINE.runActiveQuery();

        // Scroll down to editor view
        const editorSplit = document.querySelector('.koma-sandbox-split');
        if (editorSplit) {
          editorSplit.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    },

    detectPattern: function(sql) {
      sql = String(sql || '').toUpperCase();
      if (sql.includes('LEFT JOIN') && (sql.includes('IS NULL') || sql.includes('= NULL'))) {
        return { id: 'anti_join', title: 'The Missing Match (Anti-Join)', tag: 'CHURN PATTERN' };
      }
      if (sql.includes('ROW_NUMBER(') || sql.includes('DENSE_RANK(') || sql.includes('RANK(')) {
        return { id: 'top_n_ranking', title: 'Top N Per Group', tag: 'RANKING PATTERN' };
      }
      if (sql.includes('GROUP BY') && sql.includes('HAVING')) {
        return { id: 'outliers_having', title: 'Outliers & Thresholds', tag: 'HAVING PATTERN' };
      }
      return null;
    }
  };

  window.SQL_PATTERN_HUB = SqlPatternHub;

})(window);
