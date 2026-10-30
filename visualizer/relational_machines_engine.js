/**
 * =============================================================================
 * RELATIONAL MACHINES ENGINE (BESPOKE EDITORIAL EXPLAINER SVGS)
 * Inspired by High-End Financial Statement Engineering & Cathryn Lavery Diagram System
 * Deep Obsidian Black Canvas (#090d16), Glowing Numbered Relational Pins,
 * Curved Cubic Bézier Connecting Vectors, Clause Deconstruction & Health/Danger Audits
 * =============================================================================
 */

window.RelationalMachinesEngine = (function() {
  'use strict';

  let state = {
    activeDraft: 'machine01', // 'machine01' | 'machine02' | 'machine03'
    activeHighlightNode: null, // null or number
    canvasTheme: 'dark',      // 'dark' | 'light'
    zoomLevel: 1.0
  };

  // ---------------------------------------------------------------------------
  // DRAFT 1: ONE QUERY, THREE GAUGES (STORAGE -> TRANSFORM -> EMISSION)
  // ---------------------------------------------------------------------------
  function getDraft1Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#090d16' : '#f8fafc';
    const bgCard = isDark ? '#0d1117' : '#ffffff';
    const bgSubtle = isDark ? '#161b22' : '#f1f5f9';
    const border = isDark ? '#1e293b' : '#e2e8f0';
    const borderSubtle = isDark ? '#30363d' : '#cbd5e1';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#cbd5e1' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    const hNode = state.activeHighlightNode;

    const opac1 = (hNode === null || hNode === 1) ? '1' : '0.2';
    const opac2 = (hNode === null || hNode === 2) ? '1' : '0.2';
    const opac3 = (hNode === null || hNode === 3) ? '1' : '0.2';
    const opac4 = (hNode === null || hNode === 4) ? '1' : '0.2';

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- TOP HEADLINE STRIP -->
        <text x="36" y="38" font-size="20" font-weight="800" fill="${textPrimary}" letter-spacing="-0.5">One query, three physical realms</text>
        <text x="36" y="58" font-size="11.5" fill="${textMuted}">Every tuple moves through physical RAM &mdash; SQL Foundry draws the vector path, then proves each clause both ways.</text>

        <!-- ================================================================= -->
        <!-- GAUGE 1: STORAGE // BUFFER POOL (DISK & MEMORY)                   -->
        <!-- ================================================================= -->
        <g transform="translate(36, 80)">
          <rect width="260" height="290" rx="10" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">01 STORAGE // BUFFER POOL</text>
          <line x1="18" y1="36" x2="242" y2="36" stroke="${border}" stroke-width="1"/>
          
          <text x="18" y="58" font-size="11.5" font-weight="600" fill="${textSecondary}">Employees (Outer Stream)</text>
          <text x="242" y="58" font-size="11" fill="${textMuted}" text-anchor="end" font-family="'Geist Mono', monospace">12 tuples</text>
          
          <rect x="18" y="70" width="224" height="32" rx="5" fill="${bgSubtle}" stroke="${borderSubtle}" stroke-width="1"/>
          <text x="28" y="90" font-size="11" fill="#38bdf8" font-family="'Geist Mono', monospace">dept_id (FK Key)</text>
          
          <!-- Numbered Node 1 -->
          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(1)" opacity="${opac1}">
            <circle cx="228" cy="86" r="9" fill="#0284c7" filter="url(#glow-cyan)"/>
            <text x="228" y="90" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">1</text>
          </g>

          <text x="18" y="128" font-size="11.5" font-weight="600" fill="${textSecondary}">Departments (Hash Build)</text>
          <text x="242" y="128" font-size="11" fill="${textMuted}" text-anchor="end" font-family="'Geist Mono', monospace">4 tuples</text>
          
          <rect x="18" y="140" width="224" height="32" rx="5" fill="${bgSubtle}" stroke="${borderSubtle}" stroke-width="1"/>
          <text x="28" y="160" font-size="11" fill="#f59e0b" font-family="'Geist Mono', monospace">id (PK Hash Table)</text>
          
          <!-- Numbered Node 2 -->
          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(2)" opacity="${opac2}">
            <circle cx="228" cy="156" r="9" fill="#d97706" filter="url(#glow-amber)"/>
            <text x="228" y="160" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">2</text>
          </g>

          <!-- Cache Stat Box -->
          <rect x="18" y="194" width="224" height="74" rx="6" fill="${bgSubtle}" stroke="${borderSubtle}" stroke-width="1"/>
          <text x="28" y="214" font-size="9.5" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">PAGE BUFFER HIT RATIO</text>
          <text x="28" y="234" font-size="14" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">100% IN-MEMORY RAM</text>
          <text x="28" y="252" font-size="10" fill="${textMuted}" font-family="'Geist Mono', monospace">0 Disk Seeks &bull; Zero Disk Stall</text>
        </g>

        <!-- ================================================================= -->
        <!-- GAUGE 2: RELATIONAL TRANSFORM (HASH JOIN & PREDICATE FILTER)      -->
        <!-- ================================================================= -->
        <g transform="translate(330, 80)">
          <rect width="280" height="290" rx="10" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">02 TRANSFORM // HASH JOIN</text>
          <line x1="18" y1="36" x2="262" y2="36" stroke="${border}" stroke-width="1"/>

          <!-- Hash Bucket Build Box -->
          <rect x="18" y="52" width="244" height="70" rx="6" fill="${bgSubtle}" stroke="#0284c7" stroke-width="1.4"/>
          <text x="28" y="72" font-size="10.5" font-weight="800" fill="#38bdf8" font-family="'Geist Mono', monospace">HASH TABLE PROBE BUCKET</text>
          <text x="28" y="90" font-size="10" fill="${textSecondary}" font-family="'Geist Mono', monospace">Bucket[hash(dept_id)] &larr;&rarr; id</text>
          <text x="28" y="106" font-size="10.5" font-weight="700" fill="#10b981">Matched 11 tuples (1 unmatched)</text>

          <!-- Numbered Node 3 -->
          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(3)" opacity="${opac3}">
            <circle cx="250" cy="87" r="9" fill="#10b981" filter="url(#glow-emerald)"/>
            <text x="250" y="91" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">3</text>
          </g>

          <!-- Predicate WHERE Filter Box -->
          <rect x="18" y="136" width="244" height="66" rx="6" fill="${bgSubtle}" stroke="#ef4444" stroke-width="1.4"/>
          <text x="28" y="156" font-size="10.5" font-weight="800" fill="#f87171" font-family="'Geist Mono', monospace">WHERE salary &gt;= 100,000</text>
          <text x="28" y="174" font-size="10" fill="${textMuted}" font-family="'Geist Mono', monospace">CPU Register evaluation</text>
          <text x="28" y="190" font-size="10" font-weight="700" fill="#ef4444">&minus; 4 Tuples Pruned (Zero-Copy Drop)</text>

          <!-- Execution Specs -->
          <rect x="18" y="216" width="244" height="52" rx="6" fill="${bgSubtle}" stroke="${borderSubtle}"/>
          <text x="28" y="234" font-size="9.5" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace">ALGORITHM &bull; TIME COMPLEXITY</text>
          <text x="28" y="254" font-size="12" font-weight="800" fill="${textPrimary}" font-family="'Geist Mono', monospace">HYBRID HASH JOIN &bull; O(N + M)</text>
        </g>

        <!-- ================================================================= -->
        <!-- GAUGE 3: CLIENT EMISSION // RESULT STREAM                         -->
        <!-- ================================================================= -->
        <g transform="translate(644, 80)">
          <rect width="280" height="290" rx="10" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">03 EMISSION // CLIENT STREAM</text>
          <line x1="18" y1="36" x2="262" y2="36" stroke="${border}" stroke-width="1"/>

          <text x="18" y="58" font-size="10.5" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace">EMITTED COLUMNS:</text>
          <rect x="18" y="68" width="244" height="28" rx="4" fill="${bgSubtle}" stroke="${borderSubtle}"/>
          <text x="28" y="86" font-size="10.5" font-weight="600" fill="#38bdf8" font-family="'Geist Mono', monospace">first_name &bull; dept_name &bull; salary</text>

          <!-- Final Tuples Card -->
          <rect x="18" y="108" width="244" height="110" rx="6" fill="${bgSubtle}" stroke="#10b981" stroke-width="1.4"/>
          <text x="28" y="128" font-size="10" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">CLIENT OUTPUT BUFFER (STREAMING)</text>
          
          <text x="28" y="148" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">1. Ashley &bull; Analytics &bull; $115,000</text>
          <text x="28" y="166" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">2. David &bull; Engineering &bull; $125,000</text>
          <text x="28" y="184" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">3. Michael &bull; Executive &bull; $160,000</text>
          <text x="28" y="202" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">4. Carlos &bull; Engineering &bull; $145,000</text>

          <!-- Numbered Node 4 -->
          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(4)" opacity="${opac4}">
            <circle cx="250" cy="163" r="9" fill="#f43f5e" filter="url(#glow-rose)"/>
            <text x="250" y="167" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">4</text>
          </g>

          <!-- Slicing Window Info -->
          <rect x="18" y="230" width="244" height="38" rx="5" fill="${bgSubtle}" stroke="${borderSubtle}"/>
          <text x="28" y="248" font-size="9.5" fill="${textMuted}" font-family="'Geist Mono', monospace">LIMIT 4 OFFSET 0 &bull; Network Packet Buffer</text>
          <text x="28" y="260" font-size="9.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&radic; 100% RECONCILED TUPLES</text>
        </g>

        <!-- ================================================================= -->
        <!-- GLOWING CURVED BÉZIER FLOW ARCS                                   -->
        <!-- ================================================================= -->
        <!-- Arc 1: Dept ID to Hash Probe -->
        <path d="M 272 166 C 298 166, 310 167, 348 167" fill="none" stroke="#0284c7" stroke-width="${hNode === 1 ? '3.5' : '2'}" opacity="${opac1}" filter="${hNode === 1 ? 'url(#glow-cyan)' : 'none'}"/>
        
        <!-- Arc 2: PK ID to Hash Table Build -->
        <path d="M 272 236 C 300 236, 315 150, 348 150" fill="none" stroke="#f59e0b" stroke-width="${hNode === 2 ? '3.5' : '2'}" stroke-dasharray="4 3" opacity="${opac2}" filter="${hNode === 2 ? 'url(#glow-amber)' : 'none'}"/>
        
        <!-- Arc 3: Hash Match to Output Emission -->
        <path d="M 610 167 C 625 167, 630 243, 662 243" fill="none" stroke="#10b981" stroke-width="${hNode === 3 ? '3.5' : '2'}" opacity="${opac3}" filter="${hNode === 3 ? 'url(#glow-emerald)' : 'none'}"/>

        <!-- Arc 4: Emission to Output Buffer -->
        <path d="M 610 216 C 626 216, 632 243, 662 243" fill="none" stroke="#f43f5e" stroke-width="${hNode === 4 ? '3.5' : '2'}" stroke-dasharray="3 3" opacity="${opac4}" filter="${hNode === 4 ? 'url(#glow-rose)' : 'none'}"/>

        <!-- ================================================================= -->
        <!-- INTERVIEW DEFENSE: READS AS HEALTHY VS READS AS DANGER            -->
        <!-- ================================================================= -->
        <g transform="translate(36, 390)">
          <!-- Healthy Card -->
          <rect width="425" height="96" rx="8" fill="${bgCard}" stroke="#10b981" stroke-width="1.3"/>
          <text x="18" y="24" font-size="10.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">&bull; READS AS HEALTHY // STAFF-LEVEL RELATIONAL PATTERN</text>
          <text x="18" y="44" font-size="11" fill="${textSecondary}">Smaller table (Departments) built entirely in CPU L2 cache memory.</text>
          <text x="18" y="60" font-size="11" fill="${textSecondary}">Outer relation streams in O(N) linear time with 0 disk swap overhead.</text>
          <text x="18" y="80" font-size="10" fill="${textMuted}" font-family="'Geist Mono', monospace">Latency: 0.18ms &bull; Memory Footprint: 4.2 KB RAM &bull; 0 Page Faults</text>

          <!-- Danger Card -->
          <rect x="460" width="428" height="96" rx="8" fill="${bgCard}" stroke="#ef4444" stroke-width="1.3"/>
          <text x="478" y="24" font-size="10.5" font-weight="800" fill="#ef4444" font-family="'Geist Mono', monospace">&bull; READS AS DANGER // PRODUCTION GOTCHA &amp; SPILL</text>
          <text x="478" y="44" font-size="11" fill="${textSecondary}">If inner relation exceeds work_mem, hash table spills to TempDB disk.</text>
          <text x="478" y="60" font-size="11" fill="${textSecondary}">Optimizer fallback from Hash Join to Nested Loops causes 100x latency cliff.</text>
          <text x="478" y="80" font-size="10" fill="#ef4444" font-family="'Geist Mono', monospace">Risk: Unbounded Disk I/O Bottleneck &bull; High tail p99 latency</text>
        </g>

        <!-- FOOTER SUMMARY STRIP -->
        <text x="36" y="512" font-size="10.5" fill="${textMuted}" font-family="'Geist Mono', monospace">
          1 foreign key hashes into bucket &bull; 2 salary predicate filters in CPU &bull; 3 hash match pairs relations &bull; 4 zero-copy projection streams to client socket
        </text>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // DRAFT 2: ELEMENT DECONSTRUCTED // THE ANATOMY OF A WINDOW CLAUSE
  // Inspired by "WHAT FEEDS IT" -> "THE ELEMENT" -> "WHERE IT GOES"
  // ---------------------------------------------------------------------------
  function getDraft2Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#090d16' : '#f8fafc';
    const bgCard = isDark ? '#0d1117' : '#ffffff';
    const bgSubtle = isDark ? '#161b22' : '#f1f5f9';
    const border = isDark ? '#1e293b' : '#e2e8f0';
    const borderSubtle = isDark ? '#30363d' : '#cbd5e1';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#cbd5e1' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- TOP HEADLINE -->
        <text x="36" y="38" font-size="18" font-weight="800" fill="${textPrimary}" letter-spacing="-0.4">DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC)</text>
        <text x="36" y="58" font-size="11.5" fill="${textMuted}">The analytic podium frame &mdash; every rank assigned without collapsing underlying relational tuples.</text>

        <!-- ================================================================= -->
        <!-- 3-COLUMN FLOW: WHAT FEEDS IT -> THE ELEMENT -> WHERE IT GOES      -->
        <!-- ================================================================= -->
        
        <!-- LEFT: WHAT FEEDS IT -->
        <g transform="translate(36, 80)">
          <text x="0" y="14" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">WHAT FEEDS IT</text>
          
          <rect y="26" width="230" height="42" rx="6" fill="${bgCard}" stroke="#0284c7" stroke-width="1.2"/>
          <text x="14" y="44" font-size="11" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Department ID Vector</text>
          <text x="14" y="58" font-size="9.5" fill="${textMuted}">Hash partition boundary separator</text>

          <rect y="80" width="230" height="42" rx="6" fill="${bgCard}" stroke="#d97706" stroke-width="1.2"/>
          <text x="14" y="98" font-size="11" font-weight="700" fill="#f59e0b" font-family="'Geist Mono', monospace">Salary Integer Comparator</text>
          <text x="14" y="112" font-size="9.5" fill="${textMuted}">Quicksort comparator for rank tie-breaking</text>

          <rect y="134" width="230" height="42" rx="6" fill="${bgCard}" stroke="${borderSubtle}" stroke-width="1"/>
          <text x="14" y="152" font-size="11" font-weight="700" fill="${textSecondary}" font-family="'Geist Mono', monospace">Active Cursor Frame</text>
          <text x="14" y="166" font-size="9.5" fill="${textMuted}">Memory window frame (UNBOUNDED PRECEDING)</text>
        </g>

        <!-- CENTER: THE ELEMENT (HERO GLOWING CARD) -->
        <g transform="translate(320, 80)">
          <text x="0" y="14" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">THE PHYSICAL OPERATOR</text>
          
          <rect y="26" width="310" height="150" rx="8" fill="${bgCard}" stroke="#f59e0b" stroke-width="1.8" filter="url(#glow-gold)"/>
          <text x="18" y="54" font-size="10" font-weight="800" fill="#f59e0b" font-family="'Geist Mono', monospace" letter-spacing="0.5">WINDOW OPERATOR REGISTER</text>
          
          <text x="18" y="90" font-size="28" font-weight="800" fill="${textPrimary}" font-family="'Geist Mono', monospace">DENSE_RANK()</text>
          <text x="18" y="114" font-size="11" fill="${textSecondary}">1 &bull; 2 &bull; 2 &bull; 3 (Zero Gap Ties)</text>
          <line x1="18" y1="126" x2="292" y2="126" stroke="${border}" stroke-width="1"/>
          <text x="18" y="146" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; PASS: BOUNDED MEMORY ALLOCATION</text>
          <text x="292" y="146" font-size="10" fill="${textMuted}" text-anchor="end" font-family="'Geist Mono', monospace">L2 CACHE</text>
        </g>

        <!-- RIGHT: WHERE IT GOES -->
        <g transform="translate(684, 80)">
          <text x="0" y="14" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">WHERE IT GOES</text>
          
          <rect y="26" width="240" height="42" rx="6" fill="${bgCard}" stroke="#10b981" stroke-width="1.2"/>
          <text x="14" y="44" font-size="11" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">QUALIFY / WHERE rank &le; 3</text>
          <text x="14" y="58" font-size="9.5" fill="${textMuted}">Pruning non-podium salaries</text>

          <rect y="80" width="240" height="42" rx="6" fill="${bgCard}" stroke="#0284c7" stroke-width="1.2"/>
          <text x="14" y="98" font-size="11" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Top-N Heap Accumulator</text>
          <text x="14" y="112" font-size="9.5" fill="${textMuted}">Sorted priority buffer for final return</text>

          <rect y="134" width="240" height="42" rx="6" fill="${bgCard}" stroke="${borderSubtle}" stroke-width="1"/>
          <text x="14" y="152" font-size="11" font-weight="700" fill="${textSecondary}" font-family="'Geist Mono', monospace">Client Stream Socket</text>
          <text x="14" y="166" font-size="9.5" fill="${textMuted}">Zero-copy serialized JSON/Wire tuples</text>
        </g>

        <!-- CURVED CONNECTING VECTORS -->
        <!-- Inflows -->
        <path d="M 266 127 C 285 127, 295 155, 320 155" fill="none" stroke="#0284c7" stroke-width="2"/>
        <path d="M 266 181 C 285 181, 295 155, 320 155" fill="none" stroke="#d97706" stroke-width="2"/>
        
        <!-- Outflows -->
        <path d="M 630 155 C 655 155, 665 127, 684 127" fill="none" stroke="#10b981" stroke-width="2"/>
        <path d="M 630 155 C 655 155, 665 181, 684 181" fill="none" stroke="#0284c7" stroke-width="2"/>

        <!-- GAUGE RISK METER -->
        <g transform="translate(36, 275)">
          <rect width="888" height="68" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="24" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace">STAFF ENGINEER CODE REVIEW VERDICT</text>
          
          <!-- Meter Segments -->
          <rect x="18" y="34" width="270" height="10" rx="3" fill="#ef4444" opacity="0.4"/>
          <text x="18" y="56" font-size="9.5" font-weight="700" fill="#ef4444" font-family="'Geist Mono', monospace">CONCERN: UNINDEXED FULL SCAN</text>
          
          <rect x="296" y="34" width="270" height="10" rx="3" fill="#f59e0b" opacity="0.4"/>
          <text x="296" y="56" font-size="9.5" font-weight="700" fill="#f59e0b" font-family="'Geist Mono', monospace">WATCH: SKEWED PARTITION SIZES</text>

          <rect x="574" y="34" width="296" height="10" rx="3" fill="#10b981" opacity="0.9"/>
          <text x="574" y="56" font-size="9.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">&bull; ACTIVE: PARTITIONED L2 CACHE SEEK</text>
        </g>

        <!-- BOTTOM DUAL COMPARISON CARDS -->
        <g transform="translate(36, 360)">
          <!-- Healthy -->
          <rect width="425" height="100" rx="8" fill="${bgCard}" stroke="#10b981" stroke-width="1.3"/>
          <text x="18" y="24" font-size="10.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">&bull; READS AS HEALTHY // STAFF-LEVEL PATTERN</text>
          <text x="18" y="44" font-size="11" fill="${textSecondary}">DENSE_RANK preserves continuous ordinal sequence on salary ties (1, 1, 2).</text>
          <text x="18" y="60" font-size="11" fill="${textSecondary}">PARTITION BY department isolates state; memory overhead stays bounded.</text>
          <text x="18" y="82" font-size="10" fill="${textMuted}" font-family="'Geist Mono', monospace">Time: O(N log K) with Top-N Heap &bull; Space: O(K) in RAM</text>

          <!-- Danger -->
          <rect x="460" width="428" height="100" rx="8" fill="${bgCard}" stroke="#ef4444" stroke-width="1.3"/>
          <text x="478" y="24" font-size="10.5" font-weight="800" fill="#ef4444" font-family="'Geist Mono', monospace">&bull; READS AS DANGER // PRODUCTION GOTCHA</text>
          <text x="478" y="44" font-size="11" fill="${textSecondary}">Omission of PARTITION BY forces single-threaded quicksort over whole table.</text>
          <text x="478" y="60" font-size="11" fill="${textSecondary}">RANK() skips numbers on ties (1, 1, 3), accidentally dropping podium spots!</text>
          <text x="478" y="82" font-size="10" fill="#ef4444" font-family="'Geist Mono', monospace">Risk: Wrong interview answer &bull; Accidental O(N log N) full table sort</text>
        </g>

        <!-- FOOTER QUOTE -->
        <text x="36" y="488" font-size="11" fill="${textMuted}" font-family="'Geist Mono', monospace">
          "To a database optimizer, a window function is not syntax &mdash; it is a cursor over a segmented memory window."
        </text>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // DRAFT 3: SARGABLE PREDICATE FUNNEL // B-TREE SEEK VS FULL TABLE SCAN
  // ---------------------------------------------------------------------------
  function getDraft3Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#090d16' : '#f8fafc';
    const bgCard = isDark ? '#0d1117' : '#ffffff';
    const bgSubtle = isDark ? '#161b22' : '#f1f5f9';
    const border = isDark ? '#1e293b' : '#e2e8f0';
    const borderSubtle = isDark ? '#30363d' : '#cbd5e1';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#cbd5e1' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-crimson" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- TOP HEADLINE -->
        <text x="36" y="38" font-size="18" font-weight="800" fill="${textPrimary}" letter-spacing="-0.4">WHERE POPULATION &gt; 100,000 (SARGable Index Seek)</text>
        <text x="36" y="58" font-size="11.5" fill="${textMuted}">SARGable predicates enable B-Tree index traversal (O(log N)), cutting off full heap scans before memory allocation.</text>

        <!-- 3-STAGE FUNNEL -->
        <g transform="translate(36, 80)">
          <!-- LEFT: B-TREE ROOT -->
          <rect width="250" height="260" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace">01 B-TREE INDEX TRAVERSAL</text>
          <line x1="18" y1="36" x2="232" y2="36" stroke="${border}" stroke-width="1"/>

          <rect x="18" y="52" width="214" height="34" rx="4" fill="${bgSubtle}" stroke="#0284c7"/>
          <text x="28" y="72" font-size="11" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Index Root Node #401</text>

          <rect x="18" y="96" width="214" height="34" rx="4" fill="${bgSubtle}" stroke="#d97706"/>
          <text x="28" y="116" font-size="11" font-weight="700" fill="#f59e0b" font-family="'Geist Mono', monospace">Branch Node #812</text>

          <rect x="18" y="140" width="214" height="42" rx="4" fill="${bgSubtle}" stroke="#10b981" stroke-width="1.5"/>
          <text x="28" y="160" font-size="11" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">Leaf Key &ge; 100,000</text>
          <text x="28" y="174" font-size="9.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Direct Pointer to Disk Offset</text>

          <text x="18" y="210" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">TRAVERSAL: 3 I/O HOPS ONLY</text>
          <text x="18" y="226" font-size="9.5" fill="${textMuted}">Bypasses 96% of table heap rows</text>
        </g>

        <!-- CENTER: CPU REGISTERS -->
        <g transform="translate(316, 80)">
          <rect width="320" height="260" rx="8" fill="${bgCard}" stroke="#ef4444" stroke-width="1.8" filter="url(#glow-crimson)"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="#f87171" font-family="'Geist Mono', monospace">02 CPU REGISTER FUNNEL</text>
          <line x1="18" y1="36" x2="302" y2="36" stroke="${border}" stroke-width="1"/>

          <rect x="18" y="52" width="284" height="40" rx="4" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981"/>
          <text x="28" y="70" font-size="10.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">124,966 &gt; 100,000 &rarr; TRUE</text>
          <text x="28" y="84" font-size="9.5" fill="${textSecondary}">Scottsdale, USA &bull; EMITTED TO RAM</text>

          <rect x="18" y="102" width="284" height="40" rx="4" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981"/>
          <text x="28" y="120" font-size="10.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">121,780 &gt; 100,000 &rarr; TRUE</text>
          <text x="28" y="134" font-size="9.5" fill="${textSecondary}">Corona, USA &bull; EMITTED TO RAM</text>

          <rect x="18" y="152" width="284" height="40" rx="4" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444"/>
          <text x="28" y="170" font-size="10.5" font-weight="700" fill="#ef4444" font-family="'Geist Mono', monospace">91,200 &gt; 100,000 &rarr; FALSE</text>
          <text x="28" y="184" font-size="9.5" fill="${textMuted}">Zero CPU Allocation &bull; PRUNED IN CACHE</text>

          <text x="18" y="222" font-size="10.5" font-weight="800" fill="#38bdf8" font-family="'Geist Mono', monospace">REGISTERS: XMM0 &bull; BITWISE COMPARE</text>
        </g>

        <!-- RIGHT: EMISSION BUFFER -->
        <g transform="translate(666, 80)">
          <rect width="258" height="260" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace">03 EMITTED RECORD BUFFER</text>
          <line x1="18" y1="36" x2="240" y2="36" stroke="${border}" stroke-width="1"/>

          <rect x="18" y="52" width="222" height="120" rx="6" fill="${bgSubtle}" stroke="#10b981" stroke-width="1.2"/>
          <text x="28" y="74" font-size="10" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">5 QUALIFIED MUNICIPAL TUPLES</text>
          <text x="28" y="94" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">1. Scottsdale (1813)</text>
          <text x="28" y="112" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">2. Corona (1814)</text>
          <text x="28" y="130" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">3. Concord (1661)</text>
          <text x="28" y="148" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">4. Cedar Rapids (1662)</text>

          <text x="18" y="200" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&radic; SARGABILITY HIT: 100%</text>
          <text x="18" y="218" font-size="9.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Selectivity: 62.5% of dataset</text>
        </g>

        <!-- CONNECTORS -->
        <path d="M 286 161 L 316 161" fill="none" stroke="#10b981" stroke-width="2"/>
        <path d="M 636 161 L 666 161" fill="none" stroke="#10b981" stroke-width="2"/>

        <!-- BOTTOM COMPARISON -->
        <g transform="translate(36, 360)">
          <!-- Healthy -->
          <rect width="425" height="100" rx="8" fill="${bgCard}" stroke="#10b981" stroke-width="1.3"/>
          <text x="18" y="24" font-size="10.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">&bull; READS AS HEALTHY // SARGABLE PREDICATE</text>
          <text x="18" y="44" font-size="11" fill="${textSecondary}">Raw column directly compared against literal constant: col &gt; 100,000.</text>
          <text x="18" y="60" font-size="11" fill="${textSecondary}">B-Tree range seek pinpoints start leaf node in O(log N) operations.</text>
          <text x="18" y="82" font-size="10" fill="${textMuted}" font-family="'Geist Mono', monospace">Cost: 3 page reads &bull; 0 Table Scans &bull; Index Range Seek</text>

          <!-- Danger -->
          <rect x="460" width="428" height="100" rx="8" fill="${bgCard}" stroke="#ef4444" stroke-width="1.3"/>
          <text x="478" y="24" font-size="10.5" font-weight="800" fill="#ef4444" font-family="'Geist Mono', monospace">&bull; READS AS DANGER // FUNCTION WRAPPER ANTI-PATTERN</text>
          <text x="478" y="44" font-size="11" fill="${textSecondary}">Wrapping column: WHERE ROUND(population/1000) &gt; 100 destroys B-Tree!</text>
          <text x="478" y="60" font-size="11" fill="${textSecondary}">Forces engine into Full Table Scan O(N), reading all 100M rows off disk.</text>
          <text x="478" y="82" font-size="10" fill="#ef4444" font-family="'Geist Mono', monospace">Risk: 1,000x slower on large tables &bull; CPU saturation</text>
        </g>

        <!-- FOOTER -->
        <text x="36" y="488" font-size="11" fill="${textMuted}" font-family="'Geist Mono', monospace">
          "A query is only as fast as its most non-SARGable predicate."
        </text>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // PUBLIC CONTROLLER & INTERFACE
  // ---------------------------------------------------------------------------
  function renderView() {
    const container = document.getElementById('viewRelationalMachines');
    if (!container) return;

    let svgHtml = '';
    if (state.activeDraft === 'machine01') {
      svgHtml = getDraft1Svg();
    } else if (state.activeDraft === 'machine02') {
      svgHtml = getDraft2Svg();
    } else {
      svgHtml = getDraft3Svg();
    }

    container.innerHTML = `
      <div class="machines-studio-wrapper ${state.canvasTheme === 'dark' ? 'theme-dark' : 'theme-light'}">
        
        <!-- Header Controls Bar -->
        <header class="machines-topbar">
          <div class="machines-topbar-left">
            <div class="machines-brand">
              <span class="machines-brand-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </span>
              <div>
                <h2 class="machines-title">The Relational Machine</h2>
                <span class="machines-subtitle">Obsidian Explainer SVGs &bull; Architectural Vector Machines</span>
              </div>
            </div>

            <!-- Draft Switcher Buttons -->
            <div class="machines-tabs-group">
              <button class="machine-tab-btn ${state.activeDraft === 'machine01' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDraft('machine01')">
                <span>01 Three Gauges (Storage &bull; Join &bull; Output)</span>
              </button>
              <button class="machine-tab-btn ${state.activeDraft === 'machine02' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDraft('machine02')">
                <span>02 Element Deconstructed (DENSE_RANK)</span>
              </button>
              <button class="machine-tab-btn ${state.activeDraft === 'machine03' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDraft('machine03')">
                <span>03 SARGable Funnel (Index Seek &bull; WHERE)</span>
              </button>
            </div>
          </div>

          <!-- Right Action Tools -->
          <div class="machines-topbar-right">
            <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.toggleTheme()" title="Toggle Dark / Light Canvas">
              <span>${state.canvasTheme === 'dark' ? '&#9728; Light' : '&#9790; Dark'}</span>
            </button>
            <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.downloadSvg()" title="Download Standalone SVG File">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download SVG</span>
            </button>
            <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.copySvgCode()" title="Copy Raw SVG XML to Clipboard">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy SVG</span>
            </button>
          </div>
        </header>

        <!-- Main SVG Viewer Stage -->
        <main class="machines-canvas-card">
          <div class="machines-svg-viewport" id="machinesSvgViewport" style="transform: scale(${state.zoomLevel}); transform-origin: top center; transition: transform 0.2s ease;">
            ${svgHtml}
          </div>
        </main>

      </div>
    `;
  }

  function switchDraft(draftKey) {
    state.activeDraft = draftKey;
    state.activeHighlightNode = null;
    renderView();
  }

  function highlightNode(nodeId) {
    state.activeHighlightNode = state.activeHighlightNode === nodeId ? null : nodeId;
    renderView();
  }

  function toggleTheme() {
    state.canvasTheme = state.canvasTheme === 'dark' ? 'light' : 'dark';
    renderView();
  }

  function downloadSvg() {
    const svgEl = document.getElementById('relationalMachineSvg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgEl);
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.activeDraft + '_relational_machine.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (window.SQL_BUDDY) window.SQL_BUDDY.say("Exported pristine " + state.activeDraft + ".svg vector graphic!", 4000, 'celebrate');
  }

  function copySvgCode() {
    const svgEl = document.getElementById('relationalMachineSvg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(source).then(() => {
        if (window.SQL_BUDDY) window.SQL_BUDDY.say("Raw SVG vector code copied to clipboard!", 3500, 'happy');
      });
    }
  }

  function init() {
    renderView();
  }

  return {
    init,
    switchDraft,
    highlightNode,
    toggleTheme,
    downloadSvg,
    copySvgCode
  };
})();
