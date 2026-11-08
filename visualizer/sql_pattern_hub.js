/**
 * SQL FOUNDRY - 80/20 UNIVERSAL SQL PATTERN ACADEMY
 * Clean Monochrome Architectural Theme - Only SQL Keywords Are Colored.
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

  function highlightSql(sql) {
    if (!sql) return '';
    let escaped = escapeHtml(sql);
    const keywords = [
      'SELECT', 'DISTINCT', 'FROM', 'LEFT JOIN', 'INNER JOIN', 'JOIN', 'ON', 'AND', 'OR', 'NOT',
      'WHERE', 'IS NULL', 'IS NOT NULL', 'NULL', 'ORDER BY', 'GROUP BY', 'HAVING', 'WITH', 'AS',
      'OVER', 'PARTITION BY', 'ROWS BETWEEN', 'UNBOUNDED PRECEDING', 'CURRENT ROW', 'PRECEDING',
      'FOLLOWING', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'DATE', 'SUBSTR',
      'COUNT', 'SUM', 'AVG', 'ROUND', 'LAG', 'LEAD', 'ROW_NUMBER', 'DENSE_RANK', 'RANK'
    ];
    keywords.sort((a, b) => b.length - a.length);
    keywords.forEach(kw => {
      const regex = new RegExp('\\b(' + kw.replace(/\s+/g, '\\s+') + ')\\b', 'gi');
      escaped = escaped.replace(regex, '<span style="color:#38bdf8; font-weight:600;">$1</span>');
    });
    return escaped;
  }

  // ===========================================================================
  // SVG DIAGRAM GENERATORS (Strict Monochrome Blueprint - SQL Keywords Colored)
  // ===========================================================================

  const SVG_LIBRARY = {
    // 1.1: INNER JOIN vs LEFT JOIN
    joinComparison: function() {
      return `
        <svg viewBox="0 0 680 230" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="230" rx="4" fill="#121214" stroke="#27272a" stroke-width="1"/>

          <!-- LEFT SIDE: INNER JOIN -->
          <g transform="translate(20, 20)">
            <text x="140" y="22" text-anchor="middle" fill="#d4d4d8" font-size="11" font-weight="600" font-family="monospace">
              <tspan fill="#38bdf8" font-weight="700">INNER JOIN</tspan> (ONLY MATCHES)
            </text>
            
            <!-- Table A -->
            <rect x="20" y="40" width="110" height="130" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="75" y="58" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="600" font-family="monospace">USERS (3)</text>
            <rect x="30" y="68" width="90" height="24" rx="2" fill="#222226"/>
            <text x="75" y="84" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">User #1</text>
            <rect x="30" y="98" width="90" height="24" rx="2" fill="#222226"/>
            <text x="75" y="114" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">User #2</text>
            <rect x="30" y="128" width="90" height="24" rx="2" fill="#18181b" stroke="#52525b" stroke-width="1" stroke-dasharray="2 2"/>
            <text x="75" y="144" text-anchor="middle" fill="#71717a" font-size="10" font-family="monospace">User #3</text>

            <!-- Table B -->
            <rect x="160" y="40" width="110" height="130" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="215" y="58" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="600" font-family="monospace">ORDERS (2)</text>
            <rect x="170" y="68" width="90" height="24" rx="2" fill="#222226"/>
            <text x="215" y="84" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Order #101</text>
            <rect x="170" y="98" width="90" height="24" rx="2" fill="#222226"/>
            <text x="215" y="114" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Order #102</text>

            <text x="140" y="190" text-anchor="middle" fill="#71717a" font-size="10.5" font-family="monospace">User #3 excluded from result set</text>
          </g>

          <!-- Divider -->
          <line x1="340" y1="20" x2="340" y2="210" stroke="#27272a" stroke-width="1" stroke-dasharray="3 3"/>

          <!-- RIGHT SIDE: LEFT JOIN -->
          <g transform="translate(360, 20)">
            <text x="140" y="22" text-anchor="middle" fill="#d4d4d8" font-size="11" font-weight="600" font-family="monospace">
              <tspan fill="#38bdf8" font-weight="700">LEFT JOIN</tspan> (KEEPS UNMATCHED)
            </text>
            
            <!-- Table A -->
            <rect x="20" y="40" width="110" height="130" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="75" y="58" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="600" font-family="monospace">USERS (3)</text>
            <rect x="30" y="68" width="90" height="24" rx="2" fill="#222226"/>
            <text x="75" y="84" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">User #1</text>
            <rect x="30" y="98" width="90" height="24" rx="2" fill="#222226"/>
            <text x="75" y="114" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">User #2</text>
            <rect x="30" y="128" width="90" height="24" rx="2" fill="#27272a" stroke="#52525b" stroke-width="1"/>
            <text x="75" y="144" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="600" font-family="monospace">User #3</text>

            <!-- Table B -->
            <rect x="160" y="40" width="110" height="130" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="215" y="58" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="600" font-family="monospace">MATCHED</text>
            <rect x="170" y="68" width="90" height="24" rx="2" fill="#222226"/>
            <text x="215" y="84" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Order #101</text>
            <rect x="170" y="98" width="90" height="24" rx="2" fill="#222226"/>
            <text x="215" y="114" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Order #102</text>
            <rect x="170" y="128" width="90" height="24" rx="2" fill="#18181b" stroke="#52525b" stroke-width="1" stroke-dasharray="2 2"/>
            <text x="215" y="144" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700" font-family="monospace">NULL (Target)</text>

            <text x="140" y="190" text-anchor="middle" fill="#d4d4d8" font-size="10.5" font-family="monospace">User #3 preserved with NULL placeholder</text>
          </g>
        </svg>
      `;
    },

    // 1.2: The Anti-Join Filter
    antiJoinFilter: function() {
      return `
        <svg viewBox="0 0 680 180" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="180" rx="4" fill="#121214" stroke="#27272a" stroke-width="1"/>
          
          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#d4d4d8" font-size="12" font-weight="600" font-family="monospace">THE 3-STAGE ANTI-JOIN PIPELINE</text>

            <!-- Stage 1 -->
            <rect x="10" y="45" width="170" height="90" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="95" y="68" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">1. <tspan fill="#38bdf8">LEFT JOIN</tspan></text>
            <text x="95" y="88" text-anchor="middle" fill="#888888" font-size="10">Attaches orders</text>
            <text x="95" y="104" text-anchor="middle" fill="#888888" font-size="10">Creates NULL slots</text>
            <text x="95" y="122" text-anchor="middle" fill="#d4d4d8" font-size="9" font-family="monospace">All Users Kept</text>

            <!-- Arrow 1 -->
            <path d="M 195 90 L 225 90" stroke="#52525b" stroke-width="1.5"/>

            <!-- Stage 2 -->
            <rect x="235" y="45" width="180" height="90" rx="3" fill="#18181b" stroke="#52525b" stroke-width="1"/>
            <text x="325" y="68" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">2. <tspan fill="#38bdf8">WHERE</tspan> id <tspan fill="#38bdf8">IS NULL</tspan></text>
            <text x="325" y="88" text-anchor="middle" fill="#888888" font-size="10">Filter Sieve</text>
            <text x="325" y="104" text-anchor="middle" fill="#888888" font-size="10">Discards matching rows</text>
            <text x="325" y="122" text-anchor="middle" fill="#d4d4d8" font-size="9" font-family="monospace">Holes Isolated</text>

            <!-- Arrow 2 -->
            <path d="M 430 90 L 460 90" stroke="#52525b" stroke-width="1.5"/>

            <!-- Stage 3 -->
            <rect x="470" y="45" width="160" height="90" rx="3" fill="#222226" stroke="#71717a" stroke-width="1"/>
            <text x="550" y="68" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">3. OUTPUT RESULT</text>
            <text x="550" y="88" text-anchor="middle" fill="#888888" font-size="10">Exact Dormant Entities</text>
            <text x="550" y="104" text-anchor="middle" fill="#888888" font-size="10">Clean Result Set</text>
            <text x="550" y="122" text-anchor="middle" fill="#ffffff" font-size="9" font-family="monospace">Zero Inactive Dropped</text>
          </g>
        </svg>
      `;
    },

    // 2.1: GROUP BY vs PARTITION BY
    partitionVsGroupBy: function() {
      return `
        <svg viewBox="0 0 680 230" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="230" rx="4" fill="#121214" stroke="#27272a" stroke-width="1"/>

          <!-- GROUP BY side -->
          <g transform="translate(25, 20)">
            <text x="140" y="20" text-anchor="middle" fill="#d4d4d8" font-size="11" font-weight="600" font-family="monospace">
              <tspan fill="#38bdf8" font-weight="700">GROUP BY</tspan> (SQUASHES ROWS)
            </text>
            
            <rect x="20" y="40" width="240" height="130" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="50" y="65" fill="#71717a" font-size="10" font-family="monospace">6 Raw Rows</text>
            <rect x="40" y="75" width="80" height="18" rx="2" fill="#222226"/>
            <text x="80" y="88" text-anchor="middle" fill="#888888" font-size="9" font-family="monospace">Item #1 ($80)</text>
            <rect x="40" y="98" width="80" height="18" rx="2" fill="#222226"/>
            <text x="80" y="111" text-anchor="middle" fill="#888888" font-size="9" font-family="monospace">Item #2 ($120)</text>
            <rect x="40" y="121" width="80" height="18" rx="2" fill="#222226"/>
            <text x="80" y="134" text-anchor="middle" fill="#888888" font-size="9" font-family="monospace">Item #3 ($45)</text>

            <path d="M 130 107 L 160 107" stroke="#52525b" stroke-width="1.5"/>

            <rect x="170" y="75" width="75" height="64" rx="3" fill="#222226" stroke="#52525b" stroke-width="1"/>
            <text x="207" y="95" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700" font-family="monospace">1 Summary</text>
            <text x="207" y="115" text-anchor="middle" fill="#d4d4d8" font-size="9" font-family="monospace">SUM = $245</text>

            <text x="140" y="190" text-anchor="middle" fill="#71717a" font-size="10" font-family="monospace">Individual row details collapsed</text>
          </g>

          <line x1="335" y1="20" x2="335" y2="210" stroke="#27272a" stroke-width="1" stroke-dasharray="3 3"/>

          <!-- PARTITION BY side -->
          <g transform="translate(350, 20)">
            <text x="150" y="20" text-anchor="middle" fill="#d4d4d8" font-size="11" font-weight="600" font-family="monospace">
              <tspan fill="#38bdf8" font-weight="700">PARTITION BY</tspan> (PRESERVES ROWS)
            </text>
            
            <rect x="15" y="40" width="280" height="130" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            
            <!-- Table Header -->
            <text x="45" y="60" fill="#71717a" font-size="10" font-weight="600" font-family="monospace">Category</text>
            <text x="140" y="60" fill="#71717a" font-size="10" font-weight="600" font-family="monospace">Item</text>
            <text x="245" y="60" fill="#38bdf8" font-size="10" font-weight="700" font-family="monospace">ROW_NUMBER</text>

            <line x1="25" y1="68" x2="285" y2="68" stroke="#27272a" stroke-width="1"/>

            <!-- Rows -->
            <text x="45" y="86" fill="#d4d4d8" font-size="9" font-family="monospace">Shoes</text>
            <text x="140" y="86" fill="#d4d4d8" font-size="9" font-family="monospace">Nike ($120)</text>
            <rect x="235" y="74" width="30" height="16" rx="2" fill="#27272a" stroke="#52525b" stroke-width="1"/>
            <text x="250" y="86" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700" font-family="monospace">1</text>

            <text x="45" y="110" fill="#d4d4d8" font-size="9" font-family="monospace">Shoes</text>
            <text x="140" y="110" fill="#d4d4d8" font-size="9" font-family="monospace">Adidas ($80)</text>
            <rect x="235" y="98" width="30" height="16" rx="2" fill="#27272a" stroke="#52525b" stroke-width="1"/>
            <text x="250" y="110" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700" font-family="monospace">2</text>

            <text x="45" y="134" fill="#d4d4d8" font-size="9" font-family="monospace">Shoes</text>
            <text x="140" y="134" fill="#d4d4d8" font-size="9" font-family="monospace">Puma ($45)</text>
            <rect x="235" y="122" width="30" height="16" rx="2" fill="#27272a" stroke="#52525b" stroke-width="1"/>
            <text x="250" y="134" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700" font-family="monospace">3</text>

            <text x="150" y="190" text-anchor="middle" fill="#a1a1aa" font-size="10" font-family="monospace">Every row preserved with calculated rank index</text>
          </g>
        </svg>
      `;
    },

    // 2.2: The 3-Way Tie Race
    rankComparison: function() {
      return `
        <svg viewBox="0 0 680 190" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="190" rx="4" fill="#121214" stroke="#27272a" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#d4d4d8" font-size="12" font-weight="600" font-family="monospace">TIE RESOLUTION: FUNCTION COMPARISON</text>
            
            <!-- ROW_NUMBER -->
            <rect x="20" y="45" width="160" height="110" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="100" y="68" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">ROW_NUMBER()</text>
            <text x="100" y="88" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Score 100 &rarr; 1</text>
            <text x="100" y="106" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Score 100 &rarr; 2</text>
            <text x="100" y="124" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Score 90 &rarr; 3</text>
            <text x="100" y="145" text-anchor="middle" fill="#71717a" font-size="9" font-family="monospace">Strictly unique values</text>

            <!-- RANK -->
            <rect x="225" y="45" width="160" height="110" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="305" y="68" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">RANK()</text>
            <text x="305" y="88" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Score 100 &rarr; 1</text>
            <text x="305" y="106" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Score 100 &rarr; 1</text>
            <text x="305" y="124" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Score 90 &rarr; 3 (Gap)</text>
            <text x="305" y="145" text-anchor="middle" fill="#71717a" font-size="9" font-family="monospace">Skips 2 due to duplicate</text>

            <!-- DENSE_RANK -->
            <rect x="430" y="45" width="160" height="110" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="510" y="68" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">DENSE_RANK()</text>
            <text x="510" y="88" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Score 100 &rarr; 1</text>
            <text x="510" y="106" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Score 100 &rarr; 1</text>
            <text x="510" y="124" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">Score 90 &rarr; 2 (No Gap)</text>
            <text x="510" y="145" text-anchor="middle" fill="#71717a" font-size="9" font-family="monospace">Continuous sequence</text>
          </g>
        </svg>
      `;
    },

    // 3.1: The Timeline of WHERE vs HAVING
    timelineWhereHaving: function() {
      return `
        <svg viewBox="0 0 680 180" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="180" rx="4" fill="#121214" stroke="#27272a" stroke-width="1"/>

          <g transform="translate(25, 20)">
            <text x="315" y="18" text-anchor="middle" fill="#d4d4d8" font-size="11" font-weight="600" font-family="monospace">
              EXECUTION ORDER: <tspan fill="#38bdf8">WHERE</tspan> vs. <tspan fill="#38bdf8">HAVING</tspan>
            </text>

            <!-- Step 1: FROM -->
            <rect x="15" y="42" width="125" height="85" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="77" y="62" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">1. <tspan fill="#38bdf8">FROM</tspan></text>
            <text x="77" y="80" text-anchor="middle" fill="#888888" font-size="10">Raw Data</text>
            <text x="77" y="98" text-anchor="middle" fill="#71717a" font-size="9" font-family="monospace">10,000 Rows</text>
            <text x="77" y="112" text-anchor="middle" fill="#71717a" font-size="9">Table scan</text>

            <line x1="147" y1="84" x2="167" y2="84" stroke="#52525b" stroke-width="1.5"/>

            <!-- Step 2: WHERE -->
            <rect x="175" y="42" width="135" height="85" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="242" y="62" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">2. <tspan fill="#38bdf8">WHERE</tspan></text>
            <text x="242" y="80" text-anchor="middle" fill="#888888" font-size="10">Row-level filter</text>
            <text x="242" y="98" text-anchor="middle" fill="#d4d4d8" font-size="9" font-family="monospace">status = 'active'</text>
            <text x="242" y="112" text-anchor="middle" fill="#71717a" font-size="9">Before grouping</text>

            <line x1="317" y1="84" x2="337" y2="84" stroke="#52525b" stroke-width="1.5"/>

            <!-- Step 3: GROUP BY -->
            <rect x="345" y="42" width="130" height="85" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="410" y="62" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">3. <tspan fill="#38bdf8">GROUP BY</tspan></text>
            <text x="410" y="80" text-anchor="middle" fill="#888888" font-size="10">Piles by key</text>
            <text x="410" y="98" text-anchor="middle" fill="#71717a" font-size="9" font-family="monospace">500 Groups</text>
            <text x="410" y="112" text-anchor="middle" fill="#71717a" font-size="9">Aggregation phase</text>

            <line x1="482" y1="84" x2="502" y2="84" stroke="#52525b" stroke-width="1.5"/>

            <!-- Step 4: HAVING -->
            <rect x="510" y="42" width="125" height="85" rx="3" fill="#222226" stroke="#52525b" stroke-width="1"/>
            <text x="572" y="62" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">4. <tspan fill="#38bdf8">HAVING</tspan></text>
            <text x="572" y="80" text-anchor="middle" fill="#888888" font-size="10">Group summary filter</text>
            <text x="572" y="98" text-anchor="middle" fill="#d4d4d8" font-size="9" font-family="monospace">COUNT(*) &gt;= 5</text>
            <text x="572" y="112" text-anchor="middle" fill="#ffffff" font-size="9" font-family="monospace">Final Outliers</text>

            <text x="315" y="152" text-anchor="middle" fill="#71717a" font-size="10" font-family="monospace">Note: Aggregates like COUNT(*) cannot be used in WHERE because groups are not yet formed.</text>
          </g>
        </svg>
      `;
    },

    // 4.1: LAG() Conveyor Belt
    lagConveyor: function() {
      return `
        <svg viewBox="0 0 680 230" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="230" rx="4" fill="#121214" stroke="#27272a" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#d4d4d8" font-size="12" font-weight="600" font-family="monospace">
              <tspan fill="#38bdf8">LAG()</tspan> LOOKBACK: PRIOR ROW COMPARISON
            </text>

            <!-- Month 1: Jan -->
            <rect x="20" y="65" width="160" height="90" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="100" y="88" text-anchor="middle" fill="#71717a" font-size="10" font-weight="600" font-family="monospace">JANUARY 2026</text>
            <text x="100" y="110" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700" font-family="monospace">$100,000</text>
            <rect x="35" y="122" width="130" height="20" rx="2" fill="#222226"/>
            <text x="100" y="136" text-anchor="middle" fill="#888888" font-size="9" font-family="monospace"><tspan fill="#38bdf8">LAG</tspan>() = NULL</text>

            <!-- Month 2: Feb -->
            <rect x="230" y="65" width="160" height="90" rx="3" fill="#18181b" stroke="#52525b" stroke-width="1"/>
            <text x="310" y="88" text-anchor="middle" fill="#d4d4d8" font-size="10" font-weight="600" font-family="monospace">FEBRUARY 2026</text>
            <text x="310" y="110" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700" font-family="monospace">$150,000</text>
            <rect x="245" y="122" width="130" height="20" rx="2" fill="#27272a"/>
            <text x="310" y="136" text-anchor="middle" fill="#ffffff" font-size="9" font-family="monospace">+ $50,000 (+50.0%)</text>

            <path d="M 230 100 C 195 55, 185 55, 180 75" fill="none" stroke="#52525b" stroke-width="1.5" stroke-dasharray="3 3"/>
            <text x="200" y="45" text-anchor="middle" fill="#38bdf8" font-size="9" font-family="monospace">LAG(sales, 1)</text>

            <!-- Month 3: Mar -->
            <rect x="440" y="65" width="160" height="90" rx="3" fill="#18181b" stroke="#52525b" stroke-width="1"/>
            <text x="520" y="88" text-anchor="middle" fill="#d4d4d8" font-size="10" font-weight="600" font-family="monospace">MARCH 2026</text>
            <text x="520" y="110" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="700" font-family="monospace">$120,000</text>
            <rect x="455" y="122" width="130" height="20" rx="2" fill="#27272a"/>
            <text x="520" y="136" text-anchor="middle" fill="#ffffff" font-size="9" font-family="monospace">- $30,000 (-20.0%)</text>

            <path d="M 440 100 C 405 55, 395 55, 390 75" fill="none" stroke="#52525b" stroke-width="1.5" stroke-dasharray="3 3"/>
            <text x="410" y="45" text-anchor="middle" fill="#38bdf8" font-size="9" font-family="monospace">LAG(sales, 1)</text>

            <text x="310" y="188" text-anchor="middle" fill="#71717a" font-size="10" font-family="monospace">Zero self-joins required. Every monthly row survives side-by-side with prior baseline.</text>
          </g>
        </svg>
      `;
    },

    // 4.2: Division By Zero Safety
    divisionByZeroSafety: function() {
      return `
        <svg viewBox="0 0 680 190" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="190" rx="4" fill="#121214" stroke="#27272a" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#d4d4d8" font-size="12" font-weight="600" font-family="monospace">GROWTH FORMULA ZERO-DIVISION PROTECTION</text>

            <!-- Dangerous formula -->
            <rect x="20" y="45" width="260" height="100" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="150" y="68" text-anchor="middle" fill="#888888" font-size="11" font-weight="600" font-family="monospace">STANDARD DIVISION</text>
            <text x="150" y="90" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">(sales - prev) / prev</text>
            <rect x="35" y="105" width="230" height="26" rx="2" fill="#222226"/>
            <text x="150" y="122" text-anchor="middle" fill="#71717a" font-size="9.5" font-family="monospace">If prev = 0 &rarr; Division by zero exception</text>

            <!-- Divider -->
            <line x1="310" y1="45" x2="310" y2="145" stroke="#27272a" stroke-width="1" stroke-dasharray="3 3"/>

            <!-- Bulletproof formula -->
            <rect x="340" y="45" width="260" height="100" rx="3" fill="#18181b" stroke="#52525b" stroke-width="1"/>
            <text x="470" y="68" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="600" font-family="monospace">SAFEGUARDED WITH <tspan fill="#38bdf8">NULLIF</tspan></text>
            <text x="470" y="90" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">(sales - prev) / <tspan fill="#38bdf8">NULLIF</tspan>(prev, 0)</text>
            <rect x="355" y="105" width="230" height="26" rx="2" fill="#27272a"/>
            <text x="470" y="122" text-anchor="middle" fill="#ffffff" font-size="9.5" font-family="monospace">If prev = 0 &rarr; returns NULL safely</text>

            <text x="310" y="170" text-anchor="middle" fill="#71717a" font-size="10" font-family="monospace">NULLIF(val, 0) converts zeros into NULLs, preventing SQL engine exceptions.</text>
          </g>
        </svg>
      `;
    },

    // 5.1: Cumulative Windows (Snowball)
    runningTotalSnowball: function() {
      return `
        <svg viewBox="0 0 680 230" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="230" rx="4" fill="#121214" stroke="#27272a" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#d4d4d8" font-size="12" font-weight="600" font-family="monospace">CUMULATIVE RUNNING TOTAL ACCUMULATION</text>

            <!-- Day 1 -->
            <rect x="20" y="55" width="165" height="105" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="102" y="78" text-anchor="middle" fill="#71717a" font-size="10" font-weight="600" font-family="monospace">DAY 1: ORDER #101</text>
            <text x="102" y="98" text-anchor="middle" fill="#888888" font-size="10">Daily Amount: $100</text>
            <rect x="35" y="112" width="135" height="32" rx="2" fill="#222226"/>
            <text x="102" y="127" text-anchor="middle" fill="#888888" font-size="9" font-family="monospace">RUNNING TOTAL</text>
            <text x="102" y="139" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">$100</text>

            <path d="M 190 108 L 220 108" stroke="#52525b" stroke-width="1.5"/>

            <!-- Day 2 -->
            <rect x="225" y="55" width="170" height="105" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="310" y="78" text-anchor="middle" fill="#71717a" font-size="10" font-weight="600" font-family="monospace">DAY 2: ORDER #102</text>
            <text x="310" y="98" text-anchor="middle" fill="#888888" font-size="10">Daily Amount: $200</text>
            <rect x="240" y="112" width="140" height="32" rx="2" fill="#222226"/>
            <text x="310" y="127" text-anchor="middle" fill="#888888" font-size="9" font-family="monospace">$100 + $200</text>
            <text x="310" y="139" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">$300</text>

            <path d="M 400 108 L 430 108" stroke="#52525b" stroke-width="1.5"/>

            <!-- Day 3 -->
            <rect x="435" y="55" width="165" height="105" rx="3" fill="#18181b" stroke="#52525b" stroke-width="1"/>
            <text x="517" y="78" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="600" font-family="monospace">DAY 3: ORDER #103</text>
            <text x="517" y="98" text-anchor="middle" fill="#888888" font-size="10">Daily Amount: $150</text>
            <rect x="450" y="112" width="135" height="32" rx="2" fill="#27272a"/>
            <text x="517" y="127" text-anchor="middle" fill="#888888" font-size="9" font-family="monospace">$300 + $150</text>
            <text x="517" y="139" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">$450</text>

            <!-- Bottom Frame Bar -->
            <rect x="20" y="172" width="580" height="24" rx="2" fill="#18181b" stroke="#27272a" stroke-width="1"/>
            <text x="310" y="188" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">
              <tspan fill="#38bdf8">SUM</tspan>(amount) <tspan fill="#38bdf8">OVER</tspan> (<tspan fill="#38bdf8">ORDER BY</tspan> date <tspan fill="#38bdf8">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</tspan>)
            </text>
          </g>
        </svg>
      `;
    },

    // 5.2: 7-Day Rolling Moving Window Frame
    rollingWindowSliding: function() {
      return `
        <svg viewBox="0 0 680 210" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="210" rx="4" fill="#121214" stroke="#27272a" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#d4d4d8" font-size="12" font-weight="600" font-family="monospace">MOVING AVERAGE WINDOW SMOOTHING</text>

            <!-- Daily bars in neutral grays -->
            <rect x="30" y="110" width="28" height="40" rx="2" fill="#27272a"/>
            <rect x="75" y="115" width="28" height="35" rx="2" fill="#27272a"/>
            <rect x="120" y="105" width="28" height="45" rx="2" fill="#27272a"/>
            <rect x="165" y="100" width="28" height="50" rx="2" fill="#27272a"/>
            <rect x="210" y="90" width="28" height="60" rx="2" fill="#27272a"/>
            <rect x="255" y="60" width="28" height="90" rx="2" fill="#3f3f46"/>
            <rect x="300" y="65" width="28" height="85" rx="2" fill="#3f3f46"/>
            
            <!-- Sliding Frame Bracket -->
            <rect x="22" y="45" width="315" height="115" rx="4" fill="none" stroke="#71717a" stroke-width="1.5" stroke-dasharray="4 4"/>
            <text x="180" y="40" text-anchor="middle" fill="#d4d4d8" font-size="10" font-family="monospace">
              <tspan fill="#38bdf8">ROWS BETWEEN</tspan> 6 <tspan fill="#38bdf8">PRECEDING AND CURRENT ROW</tspan>
            </text>

            <circle cx="314" cy="95" r="4" fill="#ffffff"/>
            <rect x="360" y="70" width="230" height="55" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="475" y="92" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">7-DAY AVERAGE: $59.2</text>
            <text x="475" y="110" text-anchor="middle" fill="#888888" font-size="9">Smooths weekend volume into trend</text>

            <rect x="345" y="115" width="28" height="35" rx="2" fill="#222226"/>
            <rect x="390" y="110" width="28" height="40" rx="2" fill="#222226"/>

            <text x="310" y="180" text-anchor="middle" fill="#71717a" font-size="10" font-family="monospace">
              <tspan fill="#38bdf8">AVG</tspan>(val) <tspan fill="#38bdf8">OVER</tspan> (<tspan fill="#38bdf8">ORDER BY</tspan> date <tspan fill="#38bdf8">ROWS BETWEEN</tspan> 6 <tspan fill="#38bdf8">PRECEDING AND CURRENT ROW</tspan>)
            </text>
          </g>
        </svg>
      `;
    },

    // 6.1: Conditional Aggregation
    conditionalAggregationMatrix: function() {
      return `
        <svg viewBox="0 0 680 200" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="200" rx="4" fill="#121214" stroke="#27272a" stroke-width="1"/>

          <g transform="translate(25, 20)">
            <text x="315" y="20" text-anchor="middle" fill="#d4d4d8" font-size="12" font-weight="600" font-family="monospace">CONDITIONAL AGGREGATION: ROW PIVOTING</text>

            <!-- Left: Vertical Event Stream -->
            <rect x="20" y="45" width="180" height="105" rx="3" fill="#18181b" stroke="#27272a" stroke-width="1"/>
            <text x="110" y="65" text-anchor="middle" fill="#71717a" font-size="10" font-weight="600" font-family="monospace">RAW EVENT STREAM</text>
            <rect x="30" y="74" width="160" height="18" rx="2" fill="#222226"/>
            <text x="110" y="86" text-anchor="middle" fill="#888888" font-size="9" font-family="monospace">User #882 | 'view'</text>
            <rect x="30" y="96" width="160" height="18" rx="2" fill="#222226"/>
            <text x="110" y="108" text-anchor="middle" fill="#888888" font-size="9" font-family="monospace">User #882 | 'cart'</text>
            <rect x="30" y="118" width="160" height="18" rx="2" fill="#222226"/>
            <text x="110" y="130" text-anchor="middle" fill="#888888" font-size="9" font-family="monospace">User #882 | 'buy'</text>

            <!-- Center Transformation Arrow -->
            <g transform="translate(215, 80)">
              <path d="M 0 15 L 50 15" stroke="#52525b" stroke-width="1.5"/>
              <text x="25" y="5" text-anchor="middle" fill="#38bdf8" font-size="9" font-family="monospace">SUM(CASE...)</text>
            </g>

            <!-- Right: Pivoted Horizontal Summary -->
            <rect x="280" y="45" width="330" height="105" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="445" y="65" text-anchor="middle" fill="#d4d4d8" font-size="10" font-weight="600" font-family="monospace">PIVOTED SUMMARY ROW</text>
            
            <rect x="295" y="80" width="70" height="45" rx="2" fill="#222226"/>
            <text x="330" y="97" text-anchor="middle" fill="#71717a" font-size="9" font-family="monospace">user_id</text>
            <text x="330" y="114" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">#882</text>

            <rect x="375" y="80" width="70" height="45" rx="2" fill="#222226"/>
            <text x="410" y="97" text-anchor="middle" fill="#71717a" font-size="9" font-family="monospace">views</text>
            <text x="410" y="114" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">1</text>

            <rect x="455" y="80" width="70" height="45" rx="2" fill="#222226"/>
            <text x="490" y="97" text-anchor="middle" fill="#71717a" font-size="9" font-family="monospace">carts</text>
            <text x="490" y="114" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">1</text>

            <rect x="535" y="80" width="65" height="45" rx="2" fill="#222226"/>
            <text x="567" y="97" text-anchor="middle" fill="#71717a" font-size="9" font-family="monospace">buys</text>
            <text x="567" y="114" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">1</text>

            <text x="315" y="172" text-anchor="middle" fill="#71717a" font-size="10" font-family="monospace">Pivots millions of events in 1 database scan without multiple expensive subqueries.</text>
          </g>
        </svg>
      `;
    },

    // 6.2: Multi-Stage Conversion Funnel
    funnelConversion: function() {
      return `
        <svg viewBox="0 0 680 230" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="230" rx="4" fill="#121214" stroke="#27272a" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#d4d4d8" font-size="12" font-weight="600" font-family="monospace">SEQUENTIAL FUNNEL MILESTONES</text>

            <!-- Stage 1 -->
            <rect x="40" y="42" width="400" height="26" rx="2" fill="#ffffff"/>
            <text x="55" y="59" fill="#141416" font-size="11" font-weight="700" font-family="monospace">1. Landing Page Visitors</text>
            <text x="380" y="59" text-anchor="end" fill="#141416" font-size="11" font-weight="700" font-family="monospace">10,000 (100%)</text>

            <rect x="460" y="42" width="130" height="26" rx="2" fill="#18181b" stroke="#27272a" stroke-width="1"/>
            <text x="525" y="59" text-anchor="middle" fill="#71717a" font-size="10" font-family="monospace">Baseline</text>

            <!-- Stage 2 -->
            <rect x="70" y="74" width="340" height="26" rx="2" fill="#d4d4d8"/>
            <text x="85" y="91" fill="#141416" font-size="11" font-weight="700" font-family="monospace">2. Added Item to Cart</text>
            <text x="380" y="91" text-anchor="end" fill="#141416" font-size="11" font-weight="700" font-family="monospace">3,200 (32.0%)</text>

            <rect x="460" y="74" width="130" height="26" rx="2" fill="#18181b" stroke="#27272a" stroke-width="1"/>
            <text x="525" y="91" text-anchor="middle" fill="#a1a1aa" font-size="10" font-family="monospace">-68.0% Drop</text>

            <!-- Stage 3 -->
            <rect x="100" y="106" width="280" height="26" rx="2" fill="#a1a1aa"/>
            <text x="115" y="123" fill="#141416" font-size="11" font-weight="700" font-family="monospace">3. Began Checkout</text>
            <text x="360" y="123" text-anchor="end" fill="#141416" font-size="11" font-weight="700" font-family="monospace">1,400 (14.0%)</text>

            <rect x="460" y="106" width="130" height="26" rx="2" fill="#18181b" stroke="#27272a" stroke-width="1"/>
            <text x="525" y="123" text-anchor="middle" fill="#a1a1aa" font-size="10" font-family="monospace">-56.2% Drop</text>

            <!-- Stage 4 -->
            <rect x="130" y="138" width="220" height="26" rx="2" fill="#71717a"/>
            <text x="145" y="155" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">4. Order Completed</text>
            <text x="330" y="155" text-anchor="end" fill="#ffffff" font-size="11" font-weight="700" font-family="monospace">420 (4.2%)</text>

            <rect x="460" y="138" width="130" height="26" rx="2" fill="#222226" stroke="#3f3f46" stroke-width="1"/>
            <text x="525" y="155" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700" font-family="monospace">-70.0% Drop</text>

            <text x="310" y="188" text-anchor="middle" fill="#71717a" font-size="10" font-family="monospace">Identifies conversion drop-off between checkout and purchase completion.</text>
          </g>
        </svg>
      `;
    }
  };

  // ===========================================================================
  // THE 6 CORE SQL 80/20 PATTERNS
  // ===========================================================================

  const PATTERNS = [
    {
      id: 'anti_join',
      tier: 1,
      title: '01. The Missing Match (Anti-Join)',
      tag: 'CHURN & DORMANT USERS',
      tagline: 'Identify customers, accounts, or items that have zero recorded activity',
      businessProblem: `At every tech company, leaders constantly ask: "Who signed up but never made a purchase?", "Which rides got canceled?", or "Which products have zero sales?" This is the single most common question in analytics because finding inactive users allows marketing to send targeted re-engagement emails.`,
      mentalModel: `Imagine Table A is a list of 100 registered users. Table B is a stack of 80 shopping receipts. When you connect them using a LEFT JOIN, the 80 users who bought items get paired with their receipt. The 20 users who never bought anything have a blank hole on the right: receipt_id IS NULL. All SQL does is filter for those exact holes!`,
      steppingStones: [
        {
          num: '1.1',
          title: 'The Stepping Stone: INNER JOIN vs. LEFT JOIN',
          summary: 'Why standard INNER JOIN erases inactive users, and how LEFT JOIN keeps them alive with NULL placeholders.',
          svg: 'joinComparison'
        },
        {
          num: '1.2',
          title: 'The Stepping Stone: Hunting the NULL Holes',
          summary: 'How adding WHERE right_table.primary_key IS NULL transforms a join into a surgical churn detector.',
          svg: 'antiJoinFilter'
        },
        {
          num: '1.3',
          title: 'The Stepping Stone: LEFT JOIN vs. NOT EXISTS vs. NOT IN',
          summary: 'Why NOT IN (subquery) breaks on NULL values and ruins interviews, while LEFT JOIN IS NULL is fast and immune to NULL traps.',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Identify the Master List: Which table has EVERY entity? Put this table immediately after FROM.',
        '2. Identify the Event Stream: Which table logs transactions or actions? Attach it via LEFT JOIN.',
        '3. Establish Primary Keys: Join on the shared key (e.g. ON u.user_id = o.user_id).',
        '4. Hunt for Holes: Add WHERE o.order_id IS NULL. Unmatched rows are guaranteed NULL.'
      ],
      gotchas: [
        '1. Checking the wrong table: Writing WHERE u.user_id IS NULL instead of WHERE o.order_id IS NULL returns 0 rows.',
        '2. The NOT IN Trap: If subquery returns even a single NULL value, NOT IN evaluates to UNKNOWN and drops all results. Anti-Join is immune.',
        '3. Accidental INNER JOIN: Putting filter conditions like AND o.order_date > "2026-01-01" in WHERE silently turns LEFT JOIN back into INNER JOIN.'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Prime',
          question: 'Find Prime members who joined on Day 1 but placed 0 orders in their first 30 days.',
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
          question: 'Find subscribers who signed up for Premium but watched 0 hours of video this month.',
          sql: `-- Netflix: Identify dormant subscribers for re-activation email campaign
SELECT 
  s.customer_id,
  s.purchase_date AS signup_date
FROM amazon_prime_orders s
LEFT JOIN playback_telemetry_events p
  ON s.customer_id = p.event_id
WHERE p.event_id IS NULL;`
        },
        uber: {
          name: 'Uber Mobility',
          question: 'Find geographic areas where riders opened the app but 0 drivers were available.',
          sql: `-- Uber: Unfulfilled ride demand areas (0 active drivers)
SELECT 
  r.h3_index AS area_id,
  r.request_id,
  r.requested_at
FROM uber_ride_requests r
LEFT JOIN uber_driver_telemetry d
  ON r.h3_index = d.h3_index
WHERE d.h3_index IS NULL;`
        },
        stripe: {
          name: 'Stripe Payments',
          question: 'Find merchant accounts created this quarter that have processed 0 successful payments.',
          sql: `-- Stripe: Onboarded merchants with zero processed transactions
SELECT 
  c.card_number_masked,
  c.ip_location
FROM card_authorization_events c
LEFT JOIN card_authorization_events settled
  ON c.card_number_masked = settled.card_number_masked
  AND settled.amount_usd > 10.0
WHERE settled.auth_id IS NULL;`
        }
      }
    },

    {
      id: 'top_n_ranking',
      tier: 1,
      title: '02. Top N Per Group (Category Leaders)',
      tag: 'LEADERBOARDS & RANKINGS',
      tagline: 'Rank items within each category and slice out only the top 1, 2, or 3 winners',
      businessProblem: `Businesses love leaderboards: "What are the top 3 best-selling products in each department?", "Who is the highest-spending customer per country?", or "Top 5 most-watched TV shows per region."`,
      mentalModel: `Think of organizing a school sports day. Instead of one single race with 1,000 students, you divide students into classes (PARTITION BY). Within each class, students race and you stamp rank badges (#1, #2, #3). Finally, you take only the top winners.`,
      steppingStones: [
        {
          num: '2.1',
          title: 'The Stepping Stone: GROUP BY vs. PARTITION BY',
          summary: 'Why GROUP BY collapses your raw rows, while PARTITION BY preserves every row and stamps a calculated rank tag.',
          svg: 'partitionVsGroupBy'
        },
        {
          num: '2.2',
          title: 'The Stepping Stone: ROW_NUMBER vs. RANK vs. DENSE_RANK',
          summary: 'How ties are resolved in Olympic medals vs. e-commerce catalogs, and when to pick which window function.',
          svg: 'rankComparison'
        },
        {
          num: '2.3',
          title: 'The Stepping Stone: The Subquery / CTE Wrap Trap',
          summary: 'Why you cannot write WHERE ROW_NUMBER() <= 3 directly in the main query and how a CTE solves it cleanly.',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Define the buckets: Which column divides your data into separate groups? -> PARTITION BY department.',
        '2. Define the metric: What constitutes the top score? -> ORDER BY revenue DESC.',
        '3. Stamp the rank: Use ROW_NUMBER() OVER (PARTITION BY group ORDER BY score DESC) AS rnk inside a CTE.',
        '4. Filter podium: In the outer query, filter WHERE rnk <= 3.'
      ],
      gotchas: [
        '1. WHERE clause rejection: Writing WHERE ROW_NUMBER() <= 3 directly fails because window functions execute AFTER WHERE.',
        '2. Tie handling: If two products have the same value, ROW_NUMBER() arbitrarily breaks the tie. Use DENSE_RANK() if both should share the rank.',
        '3. Missing ORDER BY: Forgetting ORDER BY inside OVER() creates undefined arbitrary ordering.'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Retail',
          question: 'Find the latest order placed by each customer in the marketplace.',
          sql: `-- Amazon: Most recent purchase per customer using ROW_NUMBER()
WITH ranked_orders AS (
  SELECT 
    customer_id,
    purchase_date,
    product_id,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id 
      ORDER BY purchase_date DESC
    ) AS purchase_rank
  FROM amazon_prime_orders
)
SELECT customer_id, purchase_date, product_id
FROM ranked_orders
WHERE purchase_rank = 1;`
        },
        netflix: {
          name: 'Netflix Content',
          question: 'Find the top 2 lowest latency streaming events per ISP.',
          sql: `-- Netflix: Top telemetry events per ISP network
WITH ranked_telemetry AS (
  SELECT 
    isp_asn,
    event_id,
    ttff_ms,
    DENSE_RANK() OVER (
      PARTITION BY isp_asn 
      ORDER BY ttff_ms ASC
    ) AS latency_rank
  FROM playback_telemetry_events
)
SELECT isp_asn, event_id, ttff_ms, latency_rank
FROM ranked_telemetry
WHERE latency_rank <= 2;`
        },
        uber: {
          name: 'Uber Dispatch',
          question: 'Find the most recent ride requested in each geographic area.',
          sql: `-- Uber: Latest requested trip per H3 geographic cell
WITH recent_requests AS (
  SELECT 
    h3_index AS area_id,
    request_id,
    requested_at,
    ROW_NUMBER() OVER (
      PARTITION BY h3_index 
      ORDER BY requested_at DESC
    ) AS rnk
  FROM uber_ride_requests
)
SELECT area_id, request_id, requested_at
FROM recent_requests
WHERE rnk = 1;`
        },
        stripe: {
          name: 'Stripe Risk',
          question: 'Find the largest dollar transaction attempted by each payment card.',
          sql: `-- Stripe: Peak authorization dollar attempt per card
WITH ranked_auths AS (
  SELECT 
    card_number_masked,
    amount_usd,
    charge_time,
    ROW_NUMBER() OVER (
      PARTITION BY card_number_masked 
      ORDER BY amount_usd DESC
    ) AS spend_rank
  FROM card_authorization_events
)
SELECT card_number_masked, amount_usd, charge_time
FROM ranked_auths
WHERE spend_rank = 1;`
        }
      }
    },

    {
      id: 'outliers_having',
      tier: 1,
      title: '03. Outliers & Thresholds (GROUP BY + HAVING)',
      tag: 'FRAUD & ANOMALY DETECTION',
      tagline: 'Aggregate millions of events and isolate only the suspicious groups that cross a critical benchmark',
      businessProblem: `Fraud and security teams need to detect anomalies in real time: "Which merchant has more than 10 chargebacks this week?", "Which user had > 5 failed passwords?", or "Which ISPs have an average buffer time over 2 seconds?"`,
      mentalModel: `Imagine sorting letters into mailboxes for 500 different recipients (GROUP BY). Then you place each mailbox on a weight scale. Instead of reading every letter, you only inspect the mailboxes that weigh more than 10 pounds (HAVING).`,
      steppingStones: [
        {
          num: '3.1',
          title: 'The Stepping Stone: The Timeline of WHERE vs. HAVING',
          summary: 'WHERE filters individual raw rows BEFORE aggregation; HAVING filters group summaries AFTER aggregation.',
          svg: 'timelineWhereHaving'
        },
        {
          num: '3.2',
          title: 'The Stepping Stone: Combining WHERE and HAVING in One Query',
          summary: 'Filter raw noise with WHERE (e.g. status = "failed") to keep group sizes lean, then benchmark with HAVING (COUNT >= 5).',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Pre-filter individual rows: Use WHERE to drop irrelevant raw records before grouping.',
        '2. Bundle into buckets: Choose your grouping dimension with GROUP BY.',
        '3. Calculate summary metrics: Choose aggregate functions like COUNT(*), SUM(amount), AVG(latency).',
        '4. Enforce group threshold: Add HAVING COUNT(*) >= 5 to filter out normal groups.'
      ],
      gotchas: [
        '1. The WHERE COUNT(*) mistake: Writing WHERE COUNT(*) > 5 triggers syntax errors because WHERE executes before grouping.',
        '2. Filtering non-aggregate columns in HAVING: Putting HAVING status = "active" wastes performance; move non-aggregates to WHERE.',
        '3. Integer division in AVG: In SQL engines, AVG(5 / 2) can round down to 2 unless cast to float.'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Prime',
          question: 'Find repeat buyers who placed 2 or more orders across the month.',
          sql: `-- Amazon: Loyal repeat buyers with 2+ purchases
SELECT 
  customer_id,
  COUNT(*) AS total_purchases
FROM amazon_prime_orders
GROUP BY customer_id
HAVING COUNT(*) >= 2
ORDER BY total_purchases DESC;`
        },
        netflix: {
          name: 'Netflix Telemetry',
          question: 'Find ISPs with more than 1 high-latency event where TTFF exceeded 500ms.',
          sql: `-- Netflix: Problem ISPs with excessive rebuffering events
SELECT 
  isp_asn,
  COUNT(*) AS slow_stream_count,
  ROUND(AVG(ttff_ms), 1) AS avg_ttff_latency
FROM playback_telemetry_events
WHERE ttff_ms > 500
GROUP BY isp_asn
HAVING COUNT(*) >= 1
ORDER BY avg_ttff_latency DESC;`
        },
        uber: {
          name: 'Uber Operations',
          question: 'Find geographic areas with 2 or more ride requests generated.',
          sql: `-- Uber: High demand ride request clusters
SELECT 
  h3_index AS area_id,
  COUNT(*) AS ride_count
FROM uber_ride_requests
GROUP BY h3_index
HAVING COUNT(*) >= 2
ORDER BY ride_count DESC;`
        },
        stripe: {
          name: 'Stripe Risk & Fraud',
          question: 'Detect credit cards attempting 5 or more rapid micro-charges under $1.00.',
          sql: `-- Stripe: Fraud risk accounts with rapid card testing attacks
SELECT 
  card_number_masked,
  ip_location,
  COUNT(*) AS attempt_count,
  ROUND(SUM(amount_usd), 2) AS total_tested_amount
FROM card_authorization_events
WHERE amount_usd < 1.00
GROUP BY card_number_masked, ip_location
HAVING COUNT(*) >= 5;`
        }
      }
    },

    {
      id: 'period_deltas',
      tier: 2,
      title: '04. Period-over-Period Deltas (LAG)',
      tag: 'GROWTH & MOM',
      tagline: 'Calculate month-over-month growth, pace metrics, and detect sudden metric swings',
      businessProblem: `Every executive asks: "Are sales growing or shrinking month-over-month?", "How does this week compare to last week?", "What was the time between a customer's first and second purchase?" Instead of comparing records by hand, companies use time-series window functions.`,
      mentalModel: `Picture a row of runners on a track. Each runner looks over their shoulder at the runner directly behind them (LAG) to see how many yards ahead or behind they are. Nobody gets crushed into a summary; every single runner keeps their place on the track.`,
      steppingStones: [
        {
          num: '4.1',
          title: 'The Stepping Stone: The LAG() Conveyor Belt',
          summary: 'Why self-joins on date - 1 are slow and brittle, and how LAG() looks back with zero performance overhead.',
          svg: 'lagConveyor'
        },
        {
          num: '4.2',
          title: 'The Stepping Stone: Safe Growth Percentage without Crashing',
          summary: 'Using NULLIF(prev_metric, 0) so queries never crash when a startup or product launched with zero sales.',
          svg: 'divisionByZeroSafety'
        },
        {
          num: '4.3',
          title: 'The Stepping Stone: Default Offsets & Lookaheads (LEAD)',
          summary: 'How LAG(col, 1, 0) handles the first period gracefully, and when LEAD() is used for churn forecasting.',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Establish chronological order: Wrap the metric with ORDER BY date ASC so SQL knows chronological progression.',
        '2. Grab the predecessor: Call LAG(metric, 1, 0) OVER (PARTITION BY entity ORDER BY date).',
        '3. Compute difference: current - previous for absolute change, or (current - prev) * 100.0 / NULLIF(prev, 0) for percentage.',
        '4. Handle first row: Remember the first period has no prior data, returning NULL safely.'
      ],
      gotchas: [
        '1. Missing dates: If a store had 0 sales in February, LAG() on March looks back to January unless continuous dates are generated via CTE.',
        '2. Division by zero: Naive (curr - prev) / prev crashes SQL engines if prev is 0. Always wrap with NULLIF(prev, 0).',
        '3. Forgetting PARTITION BY: Forgetting PARTITION BY product_id compares Product B to Product A.'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Retail',
          question: 'Track order velocity per customer across time to spot accelerating buyers.',
          sql: `-- Amazon: Track purchase intervals and order progression per customer
SELECT 
  customer_id,
  order_id,
  purchase_date,
  LAG(purchase_date, 1) OVER (
    PARTITION BY customer_id 
    ORDER BY purchase_date
  ) AS prev_purchase_date
FROM amazon_prime_orders
ORDER BY customer_id, purchase_date;`
        },
        netflix: {
          name: 'Netflix Telemetry',
          question: 'Compare TTFF latency against previous telemetry event to detect network degradation.',
          sql: `-- Netflix: Compare TTFF latency against prior event per ISP
SELECT 
  isp_asn,
  event_id,
  ttff_ms,
  LAG(ttff_ms, 1) OVER (
    PARTITION BY isp_asn 
    ORDER BY ttff_ms
  ) AS prev_ttff_ms,
  ROUND(ttff_ms - LAG(ttff_ms, 1) OVER (
    PARTITION BY isp_asn 
    ORDER BY ttff_ms
  ), 1) AS latency_delta_ms
FROM playback_telemetry_events
ORDER BY isp_asn, ttff_ms;`
        },
        uber: {
          name: 'Uber Operations',
          question: 'Track time interval between consecutive ride requests in each geographic zone.',
          sql: `-- Uber: Time gap between consecutive ride requests
SELECT 
  request_id,
  h3_index AS area_id,
  requested_at,
  LAG(requested_at, 1) OVER (
    PARTITION BY h3_index 
    ORDER BY requested_at
  ) AS prev_request_time
FROM uber_ride_requests
ORDER BY area_id, requested_at;`
        },
        stripe: {
          name: 'Stripe Risk',
          question: 'Calculate elapsed time between rapid charge attempts on the same card.',
          sql: `-- Stripe: Velocity check - elapsed time between charge attempts
SELECT 
  auth_id,
  card_number_masked,
  amount_usd,
  charge_time,
  LAG(charge_time, 1) OVER (
    PARTITION BY card_number_masked 
    ORDER BY charge_time
  ) AS prev_charge_time
FROM card_authorization_events
ORDER BY card_number_masked, charge_time;`
        }
      }
    },

    {
      id: 'running_totals',
      tier: 2,
      title: '05. Cumulative Windows & Rolling Averages',
      tag: 'RUNNING TOTALS',
      tagline: 'Calculate Year-to-Date (YTD) running totals and 7-day smoothed trendlines',
      businessProblem: `Finance teams need to know: "What is our cumulative revenue pacing toward the $10M annual goal?", "What is our 7-day rolling average active users to eliminate Saturday/Sunday noise?", "At what point in the quarter did we break even?"`,
      mentalModel: `Picture a snowball rolling down a snow-covered hill. As it rolls from Jan 1 down toward Dec 31, every day adds another layer of snow to the ball. The ball keeps growing continuously until New Year's Day, where a PARTITION BY year resets it to start fresh.`,
      steppingStones: [
        {
          num: '5.1',
          title: 'The Stepping Stone: Cumulative Windows (The Snowball)',
          summary: 'How SUM(amount) OVER (ORDER BY date) keeps an ongoing running tally without collapsing rows.',
          svg: 'runningTotalSnowball'
        },
        {
          num: '5.2',
          title: 'The Stepping Stone: The 7-Day Rolling Moving Window',
          summary: 'Using ROWS BETWEEN 6 PRECEDING AND CURRENT ROW to smooth out volatile weekday vs weekend swings.',
          svg: 'rollingWindowSliding'
        },
        {
          num: '5.3',
          title: 'The Stepping Stone: ROWS vs. RANGE Nuance',
          summary: 'Why physical row counts (ROWS) are safer and more predictable than logical value boundaries (RANGE) when timestamps contain duplicates.',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Establish chronological order: ORDER BY date ASC so the accumulation rolls forward.',
        '2. Define partitions: Add PARTITION BY customer_id or year if running totals reset per entity.',
        '3. Specify window frame: Use ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW for cumulative sums, or ROWS BETWEEN N PRECEDING AND CURRENT ROW for rolling averages.',
        '4. Verify duplicates: If timestamps repeat, add a secondary tiebreaker key (ORDER BY date, id).'
      ],
      gotchas: [
        '1. Duplicate timestamp grouping: In default SQL RANGE mode, rows with identical timestamps get summed together in a jump.',
        '2. Window frame boundaries: Forgetting ROWS BETWEEN in AVG() calculates the average over all preceding rows rather than just the last 7 days.',
        '3. Performance on large data: Running cumulative sums across millions of rows requires partitioning by day or month in production warehouses.'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Retail',
          question: 'Track cumulative orders placed across the month to monitor fulfillment pacing.',
          sql: `-- Amazon: Cumulative order volume running total
SELECT 
  purchase_date,
  product_id,
  customer_id,
  COUNT(*) OVER (
    ORDER BY purchase_date, order_id 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_orders_placed
FROM amazon_prime_orders
ORDER BY purchase_date, order_id;`
        },
        netflix: {
          name: 'Netflix Telemetry',
          question: 'Compute 2-event rolling average load time per ISP to smooth network jitter.',
          sql: `-- Netflix: 2-event moving average TTFF per ISP
SELECT 
  event_id,
  isp_asn,
  ttff_ms,
  ROUND(AVG(ttff_ms) OVER (
    PARTITION BY isp_asn 
    ORDER BY event_id 
    ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
  ), 1) AS rolling_avg_ttff
FROM playback_telemetry_events
ORDER BY isp_asn, event_id;`
        },
        uber: {
          name: 'Uber Operations',
          question: 'Track cumulative ride demand pacing within each metro zone.',
          sql: `-- Uber: Cumulative ride request accumulation per area
SELECT 
  request_id,
  h3_index AS area_id,
  requested_at,
  COUNT(*) OVER (
    PARTITION BY h3_index 
    ORDER BY requested_at 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_requests_in_area
FROM uber_ride_requests
ORDER BY area_id, requested_at;`
        },
        stripe: {
          name: 'Stripe Risk',
          question: 'Calculate cumulative dollar exposure per card during suspected card testing attacks.',
          sql: `-- Stripe: Cumulative dollar exposure per payment card
SELECT 
  auth_id,
  card_number_masked,
  amount_usd,
  charge_time,
  ROUND(SUM(amount_usd) OVER (
    PARTITION BY card_number_masked 
    ORDER BY charge_time 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2) AS cumulative_exposure_usd
FROM card_authorization_events
ORDER BY card_number_masked, charge_time;`
        }
      }
    },

    {
      id: 'funnel_milestones',
      tier: 2,
      title: '06. Multi-Step Funnel Milestones',
      tag: 'CONVERSIONS',
      tagline: 'Track user conversion across sequential funnel steps and isolate the biggest drop-offs',
      businessProblem: `Growth and product teams exist to optimize funnels: "What % of users who land on the homepage end up buying?", "Are users dropping off at the credit card entry screen or the shipping fee screen?", "Which marketing channel yields the highest end-to-end checkout rate?"`,
      mentalModel: `Picture a water pipeline with 4 filters. 10,000 gallons enter at the top. Some spills out at filter #1, more at filter #2. Your job in SQL is to measure the flow at each tap so engineers know exactly which pipe is leaking.`,
      steppingStones: [
        {
          num: '6.1',
          title: 'The Stepping Stone: Conditional Aggregation (Single-Pass Pivot)',
          summary: 'The super-power pattern SUM(CASE WHEN step = "cart" THEN 1 ELSE 0 END) that pivots thousands of event rows in a single pass.',
          svg: 'conditionalAggregationMatrix'
        },
        {
          num: '6.2',
          title: 'The Stepping Stone: Measuring Drop-Off Sieve Ratios',
          summary: 'Turning raw milestone counts into actionable conversion ratios across stages to pinpoint bottlenecks.',
          svg: 'funnelConversion'
        },
        {
          num: '6.3',
          title: 'The Stepping Stone: COUNT(DISTINCT user_id) vs. Event Count',
          summary: 'Preventing one hyper-active user who clicks "Refresh" 20 times from corrupting your funnel rates.',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Identify key milestone events: e.g. "view_item", "add_to_cart", "start_checkout", "purchase".',
        '2. Pivot with CASE WHEN: Wrap each milestone in SUM(CASE WHEN event_name = "..." THEN 1 ELSE 0 END).',
        '3. Compute conversion percentages: Divide Stage N by Stage 1 (overall conversion) and Stage N by Stage N-1 (step retention).',
        '4. Segment by dimensions: Group by marketing channel, device type, or country.'
      ],
      gotchas: [
        '1. Counting clicks instead of users: If a user clicks "Add to Cart" 6 times, SUM(CASE...) counts 6 actions, but only 1 converted user. Use COUNT(DISTINCT user_id).',
        '2. Chronological sequence: Ensuring the purchase happened AFTER the cart addition, not before.',
        '3. Integer division truncation: 450 / 1000 evaluates to 0 in many SQL dialects without 100.0 *.'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Retail',
          question: 'Pivot customer purchases into product category baskets in a single table scan.',
          sql: `-- Amazon: Single-pass product category basket conversion
SELECT 
  customer_id,
  COUNT(*) AS total_orders,
  SUM(CASE WHEN product_id LIKE '%KINDLE%' THEN 1 ELSE 0 END) AS kindle_orders,
  SUM(CASE WHEN product_id LIKE '%ECHO%' THEN 1 ELSE 0 END) AS echo_orders,
  SUM(CASE WHEN product_id LIKE '%MACBOOK%' OR product_id LIKE '%KEYBOARD%' THEN 1 ELSE 0 END) AS tech_accessories
FROM amazon_prime_orders
GROUP BY customer_id
ORDER BY total_orders DESC;`
        },
        netflix: {
          name: 'Netflix Telemetry',
          question: 'Segment stream playback events into fast, medium, and severe latency tiers per ISP.',
          sql: `-- Netflix: Quality-of-experience latency tiers per ISP
SELECT 
  isp_asn,
  COUNT(*) AS total_streams,
  SUM(CASE WHEN ttff_ms < 300 THEN 1 ELSE 0 END) AS fast_starts,
  SUM(CASE WHEN ttff_ms BETWEEN 300 AND 800 THEN 1 ELSE 0 END) AS medium_starts,
  SUM(CASE WHEN ttff_ms > 800 THEN 1 ELSE 0 END) AS severe_buffer_starts,
  ROUND(100.0 * SUM(CASE WHEN ttff_ms < 300 THEN 1 ELSE 0 END) / COUNT(*), 1) AS fast_start_pct
FROM playback_telemetry_events
GROUP BY isp_asn
ORDER BY fast_start_pct DESC;`
        },
        uber: {
          name: 'Uber Operations',
          question: 'Break down ride demand across early vs late dispatch windows.',
          sql: `-- Uber: Demand distribution across dispatch time windows
SELECT 
  h3_index AS area_id,
  COUNT(*) AS total_requests,
  SUM(CASE WHEN requested_at <= '2026-11-07 16:02:00' THEN 1 ELSE 0 END) AS early_requests,
  SUM(CASE WHEN requested_at > '2026-11-07 16:02:00' THEN 1 ELSE 0 END) AS late_requests,
  ROUND(100.0 * SUM(CASE WHEN requested_at > '2026-11-07 16:02:00' THEN 1 ELSE 0 END) / COUNT(*), 1) AS late_surge_pct
FROM uber_ride_requests
GROUP BY h3_index
ORDER BY total_requests DESC;`
        },
        stripe: {
          name: 'Stripe Risk & Fraud',
          question: 'Classify micro-charge card testing vs normal dollar authorizations.',
          sql: `-- Stripe: Micro-charge card testing attack classifier
SELECT 
  card_number_masked,
  ip_location,
  COUNT(*) AS total_attempts,
  SUM(CASE WHEN amount_usd < 0.60 THEN 1 ELSE 0 END) AS micro_probe_charges,
  SUM(CASE WHEN amount_usd >= 0.60 THEN 1 ELSE 0 END) AS standard_charges,
  ROUND(100.0 * SUM(CASE WHEN amount_usd < 0.60 THEN 1 ELSE 0 END) / COUNT(*), 1) AS card_testing_risk_pct
FROM card_authorization_events
GROUP BY card_number_masked, ip_location
ORDER BY total_attempts DESC;`
        }
      }
    }
  ];

  // ===========================================================================
  // STATE & CONTROLLER
  // ===========================================================================

  let activePatternId = 'anti_join';
  let activeCompanyMap = {
    anti_join: 'amazon',
    top_n_ranking: 'amazon',
    outliers_having: 'amazon',
    period_deltas: 'amazon',
    running_totals: 'amazon',
    funnel_milestones: 'amazon'
  };

  function getActivePattern() {
    return PATTERNS.find(p => p.id === activePatternId) || PATTERNS[0];
  }

  function renderPatternContentHtml(p, curCompany, isFullPage) {
    const variant = p.companyVariants[curCompany] || p.companyVariants.amazon;

    return `
      <!-- Pattern Header Banner -->
      <div class="koma-hub-header-banner">
        <div class="koma-hub-tier-pill">TIER ${p.tier} &middot; ${p.tier === 1 ? 'ESSENTIALS' : 'BUSINESS GROWTH'}</div>
        <div class="koma-hub-tag-pill">${escapeHtml(p.tag)}</div>
        <h1 class="koma-hub-header-title">${escapeHtml(p.title)}</h1>
        <p class="koma-hub-tagline">${escapeHtml(p.tagline)}</p>
      </div>

      <!-- Section 1: Business Problem -->
      <div class="koma-hub-section">
        <div class="koma-hub-section-title">1. BUSINESS PROBLEM</div>
        <div class="koma-hub-quote-card">${escapeHtml(p.businessProblem)}</div>
      </div>

      <!-- Section 2: Mental Model -->
      <div class="koma-hub-section">
        <div class="koma-hub-section-title">2. MENTAL MODEL</div>
        <div class="koma-hub-mental-card"><p>${escapeHtml(p.mentalModel)}</p></div>
      </div>

      <!-- Section 3: Stepping Stones (Monochrome Blueprint SVGs with Keyword Colors) -->
      <div class="koma-hub-section">
        <div class="koma-hub-section-title">3. STEPPING STONES</div>
        <div class="koma-subtopics-list">
          ${p.steppingStones.map(st => `
            <div class="koma-subtopic-card">
              <div class="koma-subtopic-header">
                <span class="koma-subtopic-badge">${st.num}</span>
                <div class="koma-subtopic-title">${escapeHtml(st.title)}</div>
              </div>
              <p class="koma-subtopic-desc">${escapeHtml(st.summary)}</p>
              ${st.svg && SVG_LIBRARY[st.svg] ? `
                <div class="koma-svg-viewport">
                  ${SVG_LIBRARY[st.svg]()}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Section 4: 4-Step Thinking Process -->
      <div class="koma-hub-section">
        <div class="koma-hub-section-title">4. THINKING PROCESS</div>
        <div class="koma-hub-steps-card">
          ${p.thinkingProcess.map(step => `
            <div class="koma-hub-step-item">
              <div class="koma-step-dot"></div>
              <div class="koma-step-text">${escapeHtml(step)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Section 5: Traps & Gotchas -->
      <div class="koma-hub-section">
        <div class="koma-hub-section-title">5. TRAPS &amp; GOTCHAS</div>
        <div class="koma-hub-gotchas-card">
          ${p.gotchas.map(g => `
            <div class="koma-gotcha-row">
              <span style="color:#71717a; font-family:monospace;">&bull;</span>
              <div class="koma-gotcha-text">${escapeHtml(g)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Section 6: Cross-Company Examples -->
      <div class="koma-hub-section">
        <div class="koma-hub-section-title">6. CROSS-COMPANY EXAMPLES</div>
        <p class="koma-chameleon-intro">
          Identical core query logic adapted across different company tables:
        </p>

        <!-- Company Selector Pills -->
        <div class="koma-company-pills">
          <button class="koma-company-pill ${curCompany === 'amazon' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('amazon', ${isFullPage})">Amazon</button>
          <button class="koma-company-pill ${curCompany === 'netflix' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('netflix', ${isFullPage})">Netflix</button>
          <button class="koma-company-pill ${curCompany === 'uber' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('uber', ${isFullPage})">Uber</button>
          <button class="koma-company-pill ${curCompany === 'stripe' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('stripe', ${isFullPage})">Stripe</button>
        </div>

        <!-- Company Drill Box with Syntax Highlighted Query -->
        <div class="koma-company-drill-box">
          <div class="koma-drill-head">
            <div class="koma-drill-co-name">${escapeHtml(variant.name)} Scenario</div>
            <button class="koma-load-editor-btn" onclick="window.SQL_PATTERN_HUB.loadAndRun('${p.id}', '${curCompany}')">
              Load into Live Studio &amp; Run
            </button>
          </div>
          <div class="koma-drill-prompt">
            <strong>Prompt:</strong> ${escapeHtml(variant.question)}
          </div>
          <pre class="koma-drill-sql"><code>${highlightSql(variant.sql)}</code></pre>
        </div>
      </div>
    `;
  }

  function renderSidebarHtml(isFullPage) {
    return `
      <div class="koma-hub-tier-label">TIER 1 &middot; ESSENTIALS</div>
      ${PATTERNS.filter(x => x.tier === 1).map(item => `
        <button class="koma-hub-nav-item ${item.id === activePatternId ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectPattern('${item.id}', ${isFullPage})">
          <div class="koma-hub-nav-title">${escapeHtml(item.title)}</div>
          <span class="koma-hub-nav-tag">${escapeHtml(item.tag)}</span>
        </button>
      `).join('')}

      <div class="koma-hub-tier-label">TIER 2 &middot; GROWTH</div>
      ${PATTERNS.filter(x => x.tier === 2).map(item => `
        <button class="koma-hub-nav-item ${item.id === activePatternId ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectPattern('${item.id}', ${isFullPage})">
          <div class="koma-hub-nav-title">${escapeHtml(item.title)}</div>
          <span class="koma-hub-nav-tag">${escapeHtml(item.tag)}</span>
        </button>
      `).join('')}

      <div class="koma-hub-tier-label">TIER 3 &middot; ADVANCED</div>
      <div class="koma-hub-nav-item locked">
        <div class="koma-hub-nav-title">07. Deduplication &amp; Latest State</div>
        <span class="koma-hub-nav-tag">CLEAN DATA</span>
      </div>
      <div class="koma-hub-nav-item locked">
        <div class="koma-hub-nav-title">08. Consecutive Streaks (Gaps &amp; Islands)</div>
        <span class="koma-hub-nav-tag">ENGAGEMENT</span>
      </div>
    `;
  }

  function renderFullPageViewHtml() {
    const p = getActivePattern();
    const curCompany = activeCompanyMap[p.id] || 'amazon';

    return `
      <div class="view-pattern-academy-page">
        <!-- Top Bar -->
        <div class="view-pattern-topbar">
          <div class="view-pattern-title-wrap">
            <div>
              <h1 class="view-pattern-main-heading">SQL Pattern Academy</h1>
              <p class="view-pattern-subtitle">The 6 universal archetypes that solve 80% of data &amp; finance query interviews</p>
            </div>
          </div>
          <div>
            <button class="koma-pafb-btn" onclick="try{window.location.hash='#home';}catch(e){} selectNavView('viewLandingPage', 'Home', null);">
              &larr; Back to SQL Studio
            </button>
          </div>
        </div>

        <!-- Layout: 2 Columns (Sidebar + Full Canvas) -->
        <div class="view-pattern-layout">
          <!-- Left Pattern Nav -->
          <div class="koma-hub-sidebar">
            ${renderSidebarHtml(true)}
          </div>

          <!-- Right Pattern Content Canvas -->
          <div class="koma-hub-content">
            ${renderPatternContentHtml(p, curCompany, true)}
          </div>
        </div>
      </div>
    `;
  }

  function renderPatternHubHtml() {
    const p = getActivePattern();
    const curCompany = activeCompanyMap[p.id] || 'amazon';

    return `
      <div class="koma-pattern-hub-overlay" id="komaPatternHubModal">
        <div class="koma-pattern-hub-modal">
          <div class="koma-hub-topbar" style="background:#141416; border-bottom:1px solid #27272a; padding:16px 20px;">
            <div class="koma-hub-branding">
              <div>
                <h2 class="koma-hub-title" style="font-family:var(--koma-font-mono); font-size:16px; font-weight:600; color:#ffffff;">SQL Pattern Academy</h2>
                <p class="koma-hub-subtitle" style="font-size:12px; color:#888888;">The 6 universal archetypes that solve 80% of company database questions</p>
              </div>
            </div>
            <button class="koma-hub-close-btn" onclick="window.SQL_PATTERN_HUB.close()" title="Close">✕</button>
          </div>

          <div class="koma-hub-body">
            <div class="koma-hub-sidebar">
              ${renderSidebarHtml(false)}
            </div>

            <div class="koma-hub-content">
              ${renderPatternContentHtml(p, curCompany, false)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // PUBLIC API
  // ===========================================================================

  window.SQL_PATTERN_HUB = {
    mountView: function(elementId) {
      const targetId = elementId || 'viewPatternAcademy';
      const el = document.getElementById(targetId);
      if (!el) return;
      el.innerHTML = renderFullPageViewHtml();
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e) {}
    },

    open: function(patternId) {
      if (patternId && PATTERNS.some(p => p.id === patternId)) {
        activePatternId = patternId;
      }
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

    selectPattern: function(patternId, isFullPage) {
      activePatternId = patternId;
      const fullView = document.getElementById('viewPatternAcademy');
      if (isFullPage || (fullView && fullView.classList.contains('active'))) {
        this.mountView('viewPatternAcademy');
      } else {
        const modal = document.getElementById('komaPatternHubMount');
        if (modal) modal.innerHTML = renderPatternHubHtml();
      }
      if (window.soundFX && typeof window.soundFX.playClick === 'function') {
        try { window.soundFX.playClick(); } catch(e) {}
      }
    },

    selectCompany: function(companyKey, isFullPage) {
      activeCompanyMap[activePatternId] = companyKey;
      const fullView = document.getElementById('viewPatternAcademy');
      if (isFullPage || (fullView && fullView.classList.contains('active'))) {
        this.mountView('viewPatternAcademy');
      } else {
        const modal = document.getElementById('komaPatternHubMount');
        if (modal) modal.innerHTML = renderPatternHubHtml();
      }
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

      const fullView = document.getElementById('viewPatternAcademy');
      if (fullView && fullView.classList.contains('active')) {
        try {
          window.location.hash = '#home';
          if (typeof selectNavView === 'function') selectNavView('viewLandingPage', 'Home', null);
        } catch(e) {}
      }

      setTimeout(() => {
        const textarea = document.getElementById('komaSqlEditor');
        if (textarea && window.LANDING_PAGE_ENGINE) {
          if (companyKey && typeof window.LANDING_PAGE_ENGINE.switchCompany === 'function') {
            try { window.LANDING_PAGE_ENGINE.switchCompany(companyKey); } catch(e) {}
          }

          textarea.value = variant.sql;
          window.LANDING_PAGE_ENGINE.runActiveQuery();

          const editorContainer = document.getElementById('komaInteractiveEditor') || textarea;
          if (editorContainer) {
            editorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 50);
    },

    detectPattern: function(sql) {
      if (!sql) return null;
      const s = sql.toUpperCase();
      if ((s.includes('LEFT JOIN') || s.includes('LEFT OUTER JOIN')) && (s.includes('IS NULL') || s.includes('NOT EXISTS'))) {
        return { id: 'anti_join', title: 'The Missing Match (Anti-Join)' };
      }
      if (s.includes('ROW_NUMBER(') || s.includes('DENSE_RANK(') || (s.includes('RANK(') && s.includes('OVER'))) {
        return { id: 'top_n_ranking', title: 'Top N Per Group (Ranking)' };
      }
      if (s.includes('GROUP BY') && s.includes('HAVING')) {
        return { id: 'outliers_having', title: 'Outliers & Thresholds (HAVING)' };
      }
      if (s.includes('LAG(') || s.includes('LEAD(')) {
        return { id: 'period_deltas', title: 'Period-over-Period Deltas (LAG)' };
      }
      if ((s.includes('SUM(') || s.includes('AVG(')) && s.includes('OVER') && (s.includes('ROWS BETWEEN') || s.includes('UNBOUNDED PRECEDING'))) {
        return { id: 'running_totals', title: 'Cumulative & Rolling Windows' };
      }
      if (s.includes('CASE WHEN') && (s.includes('SUM(') || s.includes('COUNT('))) {
        return { id: 'funnel_milestones', title: 'Multi-Step Funnel Milestones' };
      }
      return null;
    }
  };

})(window);
