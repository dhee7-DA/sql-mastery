/**
 * =============================================================================
 * RELATIONAL MACHINES ENGINE (DATA ANALYSIS & BUSINESS INTELLIGENCE EXPLAINERS)
 * Pure Data Analysis Mastery: Raw Data Events -> SQL Transformations -> Business Metrics
 * Obsidian Dark Canvas (#090d16), Glowing Numbered Data-Flow Pins,
 * Curved Bézier Transformation Arcs, Metric Deconstructions & Analyst Business Insights
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
  // DRAFT 1: THE METRIC MACHINE // RAW TRANSACTIONS -> AGGREGATION -> EXECUTIVE KPIS
  // E-Commerce Revenue, AOV (Average Order Value) & Repeat Customer Rate
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

        <!-- TOP HEADLINE -->
        <text x="36" y="38" font-size="20" font-weight="800" fill="${textPrimary}" letter-spacing="-0.5">The Revenue &amp; Basket Size Engine</text>
        <text x="36" y="58" font-size="11.5" fill="${textMuted}">How transactional log entries transform into executive commercial metrics: Gross Revenue, AOV, and Active Customers.</text>

        <!-- ================================================================= -->
        <!-- GAUGE 1: RAW TRANSACTION DATA (Orders & Customers)                -->
        <!-- ================================================================= -->
        <g transform="translate(36, 80)">
          <rect width="260" height="290" rx="10" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">01 RAW TRANSACTIONS // GRAIN</text>
          <line x1="18" y1="36" x2="242" y2="36" stroke="${border}" stroke-width="1"/>
          
          <text x="18" y="58" font-size="11.5" font-weight="600" fill="${textSecondary}">Orders Table (Row = 1 Checkout)</text>
          <text x="242" y="58" font-size="11" fill="${textMuted}" text-anchor="end" font-family="'Geist Mono', monospace">14,280 rows</text>
          
          <!-- Order Total Box -->
          <rect x="18" y="70" width="224" height="32" rx="5" fill="${bgSubtle}" stroke="${borderSubtle}" stroke-width="1"/>
          <text x="28" y="90" font-size="11" fill="#38bdf8" font-family="'Geist Mono', monospace">order_amount ($)</text>
          
          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(1)" opacity="${opac1}">
            <circle cx="228" cy="86" r="9" fill="#0284c7" filter="url(#glow-cyan)"/>
            <text x="228" y="90" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">1</text>
          </g>

          <!-- Customer ID Box -->
          <text x="18" y="128" font-size="11.5" font-weight="600" fill="${textSecondary}">customer_id (Dimension Key)</text>
          <text x="242" y="128" font-size="11" fill="${textMuted}" text-anchor="end" font-family="'Geist Mono', monospace">3,410 users</text>
          
          <rect x="18" y="140" width="224" height="32" rx="5" fill="${bgSubtle}" stroke="${borderSubtle}" stroke-width="1"/>
          <text x="28" y="160" font-size="11" fill="#f59e0b" font-family="'Geist Mono', monospace">user_id &bull; order_timestamp</text>
          
          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(2)" opacity="${opac2}">
            <circle cx="228" cy="156" r="9" fill="#d97706" filter="url(#glow-amber)"/>
            <text x="228" y="160" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">2</text>
          </g>

          <!-- Clean Data Quality Check -->
          <rect x="18" y="194" width="224" height="74" rx="6" fill="${bgSubtle}" stroke="${borderSubtle}" stroke-width="1"/>
          <text x="28" y="214" font-size="9.5" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">DATA SANITY AUDIT</text>
          <text x="28" y="234" font-size="13" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">0 NULL CHECKOUTS</text>
          <text x="28" y="252" font-size="10" fill="${textMuted}" font-family="'Geist Mono', monospace">Refund status &ne; 'CANCELLED' filtered</text>
        </g>

        <!-- ================================================================= -->
        <!-- GAUGE 2: ANALYTICAL AGGREGATION & ROLLUP (GROUP BY & AGGREGATES)  -->
        <!-- ================================================================= -->
        <g transform="translate(330, 80)">
          <rect width="280" height="290" rx="10" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">02 ANALYTICAL SQL LOGIC</text>
          <line x1="18" y1="36" x2="262" y2="36" stroke="${border}" stroke-width="1"/>

          <!-- Sum & Avg Math -->
          <rect x="18" y="52" width="244" height="70" rx="6" fill="${bgSubtle}" stroke="#0284c7" stroke-width="1.4"/>
          <text x="28" y="72" font-size="10.5" font-weight="800" fill="#38bdf8" font-family="'Geist Mono', monospace">REVENUE &amp; TICKET ROLLUP</text>
          <text x="28" y="90" font-size="10" fill="${textSecondary}" font-family="'Geist Mono', monospace">SUM(order_amount) AS total_gmv</text>
          <text x="28" y="106" font-size="10.5" font-weight="700" fill="#10b981">AVG(order_amount) AS aov</text>

          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(3)" opacity="${opac3}">
            <circle cx="250" cy="87" r="9" fill="#10b981" filter="url(#glow-emerald)"/>
            <text x="250" y="91" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">3</text>
          </g>

          <!-- Unique Customer Deduplication -->
          <rect x="18" y="136" width="244" height="66" rx="6" fill="${bgSubtle}" stroke="#f59e0b" stroke-width="1.4"/>
          <text x="28" y="156" font-size="10.5" font-weight="800" fill="#f59e0b" font-family="'Geist Mono', monospace">COUNT(DISTINCT customer_id)</text>
          <text x="28" y="174" font-size="10" fill="${textMuted}" font-family="'Geist Mono', monospace">Deduplicates multi-order shoppers</text>
          <text x="28" y="190" font-size="10" font-weight="700" fill="#f59e0b">3,410 Unique Buyers Identified</text>

          <!-- Granularity Dimension -->
          <rect x="18" y="216" width="244" height="52" rx="6" fill="${bgSubtle}" stroke="${borderSubtle}"/>
          <text x="28" y="234" font-size="9.5" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace">DIMENSIONAL DRILLDOWN</text>
          <text x="28" y="254" font-size="12" font-weight="800" fill="${textPrimary}" font-family="'Geist Mono', monospace">GROUP BY DATE_TRUNC('month', date)</text>
        </g>

        <!-- ================================================================= -->
        <!-- GAUGE 3: EXECUTIVE BUSINESS KPIS (THE NUMBERS LEADERSHIP LOOKS AT) -->
        <!-- ================================================================= -->
        <g transform="translate(644, 80)">
          <rect width="280" height="290" rx="10" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">03 BUSINESS INSIGHTS // KPIS</text>
          <line x1="18" y1="36" x2="262" y2="36" stroke="${border}" stroke-width="1"/>

          <!-- GMV Metric -->
          <rect x="18" y="52" width="244" height="60" rx="6" fill="${bgSubtle}" stroke="#38bdf8" stroke-width="1.3"/>
          <text x="28" y="70" font-size="9.5" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">TOTAL MONTHLY GMV</text>
          <text x="28" y="96" font-size="20" font-weight="800" fill="${textPrimary}" font-family="'Geist Mono', monospace">$1,428,950</text>
          <text x="250" y="96" font-size="10.5" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">+14.2% MoM</text>

          <!-- AOV Metric -->
          <rect x="18" y="122" width="244" height="60" rx="6" fill="${bgSubtle}" stroke="#10b981" stroke-width="1.3"/>
          <text x="28" y="140" font-size="9.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">AVERAGE ORDER VALUE (AOV)</text>
          <text x="28" y="166" font-size="20" font-weight="800" fill="${textPrimary}" font-family="'Geist Mono', monospace">$100.07</text>
          <text x="250" y="166" font-size="10.5" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">Healthy Basket</text>

          <!-- Order Frequency -->
          <rect x="18" y="192" width="244" height="74" rx="6" fill="${bgSubtle}" stroke="#f43f5e" stroke-width="1.3"/>
          <text x="28" y="210" font-size="9.5" font-weight="700" fill="#f43f5e" font-family="'Geist Mono', monospace">PURCHASE FREQUENCY</text>
          <text x="28" y="234" font-size="18" font-weight="800" fill="${textPrimary}" font-family="'Geist Mono', monospace">4.18 Orders / Buyer</text>
          <text x="28" y="254" font-size="10" fill="#f43f5e" font-family="'Geist Mono', monospace">&bull; Strong Repeat Customer Stickiness</text>

          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(4)" opacity="${opac4}">
            <circle cx="250" cy="226" r="9" fill="#f43f5e" filter="url(#glow-rose)"/>
            <text x="250" y="230" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">4</text>
          </g>
        </g>

        <!-- ================================================================= -->
        <!-- GLOWING CURVED BÉZIER DATA FLOW ARCS                              -->
        <!-- ================================================================= -->
        <!-- Arc 1: order_amount into SUM / AVG -->
        <path d="M 272 166 C 298 166, 310 167, 348 167" fill="none" stroke="#0284c7" stroke-width="${hNode === 1 ? '3.5' : '2'}" opacity="${opac1}" filter="${hNode === 1 ? 'url(#glow-cyan)' : 'none'}"/>
        
        <!-- Arc 2: customer_id into COUNT(DISTINCT) -->
        <path d="M 272 236 C 300 236, 315 220, 348 220" fill="none" stroke="#f59e0b" stroke-width="${hNode === 2 ? '3.5' : '2'}" stroke-dasharray="4 3" opacity="${opac2}" filter="${hNode === 2 ? 'url(#glow-amber)' : 'none'}"/>
        
        <!-- Arc 3: SUM / AVG into Executive GMV -->
        <path d="M 610 167 C 625 167, 630 140, 662 140" fill="none" stroke="#10b981" stroke-width="${hNode === 3 ? '3.5' : '2'}" opacity="${opac3}" filter="${hNode === 3 ? 'url(#glow-emerald)' : 'none'}"/>

        <!-- Arc 4: Distinct Ratio into Purchase Frequency -->
        <path d="M 610 220 C 626 220, 632 270, 662 270" fill="none" stroke="#f43f5e" stroke-width="${hNode === 4 ? '3.5' : '2'}" stroke-dasharray="3 3" opacity="${opac4}" filter="${hNode === 4 ? 'url(#glow-rose)' : 'none'}"/>

        <!-- ================================================================= -->
        <!-- DATA ANALYST INSIGHT & PITFALL AUDIT PANELS                       -->
        <!-- ================================================================= -->
        <g transform="translate(36, 390)">
          <!-- Analyst Commercial Takeaway -->
          <rect width="425" height="96" rx="8" fill="${bgCard}" stroke="#0284c7" stroke-width="1.3"/>
          <text x="18" y="24" font-size="10.5" font-weight="800" fill="#38bdf8" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // COMMERCIAL INSIGHT</text>
          <text x="18" y="44" font-size="11" fill="${textSecondary}">Revenue growth (+14.2% MoM) is driven by repeat buyer frequency (4.18x),</text>
          <text x="18" y="60" font-size="11" fill="${textSecondary}">not just top-of-funnel customer acquisition. Basket size ($100) remains stable.</text>
          <text x="18" y="80" font-size="10" fill="#10b981" font-family="'Geist Mono', monospace">Business Action: Increase retention marketing budget over paid ads.</text>

          <!-- Common Analyst Pitfall -->
          <rect x="460" width="428" height="96" rx="8" fill="${bgCard}" stroke="#f59e0b" stroke-width="1.3"/>
          <text x="478" y="24" font-size="10.5" font-weight="800" fill="#f59e0b" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // DOUBLE-COUNTING TRAP</text>
          <text x="478" y="44" font-size="11" fill="${textSecondary}">Joining Orders to Order_Items before summing order_amount multiplies</text>
          <text x="478" y="60" font-size="11" fill="${textSecondary}">order totals by the number of line items (1-to-many fan-out bias!).</text>
          <text x="478" y="80" font-size="10" fill="#f59e0b" font-family="'Geist Mono', monospace">Fix: Aggregate items at order grain first before joining to customer dimensions.</text>
        </g>

        <!-- FOOTER SUMMARY STRIP -->
        <text x="36" y="512" font-size="10.5" fill="${textMuted}" font-family="'Geist Mono', monospace">
          1 raw orders stream into aggregation &bull; 2 unique customer IDs deduplicate buyers &bull; 3 revenue &amp; ticket size rollup &bull; 4 executive business metrics empower decisions
        </text>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // DRAFT 2: METRIC DECONSTRUCTED // 7-DAY ROLLING AVERAGE & TREND SMOOTHING
  // Eliminating Weekend Noise from Daily Active Users & Sales
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
        <text x="36" y="38" font-size="18" font-weight="800" fill="${textPrimary}" letter-spacing="-0.4">AVG(daily_sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</text>
        <text x="36" y="58" font-size="11.5" fill="${textMuted}">The 7-Day Rolling Moving Window &mdash; smoothing daily volatility and weekend dips to reveal genuine business trajectory.</text>

        <!-- 3-COLUMN FLOW: WHAT FEEDS IT -> THE ELEMENT -> WHERE IT GOES -->
        
        <!-- LEFT: WHAT FEEDS IT -->
        <g transform="translate(36, 80)">
          <text x="0" y="14" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">WHAT FEEDS IT // DAILY NOISE</text>
          
          <rect y="26" width="230" height="42" rx="6" fill="${bgCard}" stroke="#0284c7" stroke-width="1.2"/>
          <text x="14" y="44" font-size="11" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Daily Fluctuation Spikes</text>
          <text x="14" y="58" font-size="9.5" fill="${textMuted}">Monday surge vs Saturday quiet period</text>

          <rect y="80" width="230" height="42" rx="6" fill="${bgCard}" stroke="#d97706" stroke-width="1.2"/>
          <text x="14" y="98" font-size="11" font-weight="700" fill="#f59e0b" font-family="'Geist Mono', monospace">Calendar Day Gaps</text>
          <text x="14" y="112" font-size="9.5" fill="${textMuted}">Dates with zero transactions (Missing rows)</text>

          <rect y="134" width="230" height="42" rx="6" fill="${bgCard}" stroke="${borderSubtle}" stroke-width="1"/>
          <text x="14" y="152" font-size="11" font-weight="700" fill="${textSecondary}" font-family="'Geist Mono', monospace">One-Off Flash Sales</text>
          <text x="14" y="166" font-size="9.5" fill="${textMuted}">Black Friday / Cyber Monday anomalies</text>
        </g>

        <!-- CENTER: THE ELEMENT (HERO GLOWING CARD) -->
        <g transform="translate(320, 80)">
          <text x="0" y="14" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">ANALYTICAL SLIDING FRAME</text>
          
          <rect y="26" width="310" height="150" rx="8" fill="${bgCard}" stroke="#f59e0b" stroke-width="1.8" filter="url(#glow-gold)"/>
          <text x="18" y="54" font-size="10" font-weight="800" fill="#f59e0b" font-family="'Geist Mono', monospace" letter-spacing="0.5">WINDOW FRAME SPECIFICATION</text>
          
          <text x="18" y="90" font-size="28" font-weight="800" fill="${textPrimary}" font-family="'Geist Mono', monospace">7-DAY ROLLING</text>
          <text x="18" y="114" font-size="11" fill="${textSecondary}">6 Preceding + Current Row = 7 Row Buffer</text>
          <line x1="18" y1="126" x2="292" y2="126" stroke="${border}" stroke-width="1"/>
          <text x="18" y="146" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; NOISE ELIMINATED: ZERO-COLLAPSE CURSOR</text>
          <text x="292" y="146" font-size="10" fill="${textMuted}" text-anchor="end" font-family="'Geist Mono', monospace">SLIDING L7D</text>
        </g>

        <!-- RIGHT: WHERE IT GOES -->
        <g transform="translate(684, 80)">
          <text x="0" y="14" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">WHERE IT GOES // DECISIONS</text>
          
          <rect y="26" width="240" height="42" rx="6" fill="${bgCard}" stroke="#10b981" stroke-width="1.2"/>
          <text x="14" y="44" font-size="11" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">Executive Trendline Chart</text>
          <text x="14" y="58" font-size="9.5" fill="${textMuted}">Smooth curve on board pitch deck</text>

          <rect y="80" width="240" height="42" rx="6" fill="${bgCard}" stroke="#0284c7" stroke-width="1.2"/>
          <text x="14" y="98" font-size="11" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Outlier Anomaly Detection</text>
          <text x="14" y="112" font-size="9.5" fill="${textMuted}">Flags when actual sales drift &plusmn;3 std dev</text>

          <rect y="134" width="240" height="42" rx="6" fill="${bgCard}" stroke="${borderSubtle}" stroke-width="1"/>
          <text x="14" y="152" font-size="11" font-weight="700" fill="${textSecondary}" font-family="'Geist Mono', monospace">Inventory Re-order Trigger</text>
          <text x="14" y="166" font-size="9.5" fill="${textMuted}">Warehouse supply safety calculations</text>
        </g>

        <!-- CURVED CONNECTING VECTORS -->
        <path d="M 266 127 C 285 127, 295 155, 320 155" fill="none" stroke="#0284c7" stroke-width="2"/>
        <path d="M 266 181 C 285 181, 295 155, 320 155" fill="none" stroke="#d97706" stroke-width="2"/>
        
        <path d="M 630 155 C 655 155, 665 127, 684 127" fill="none" stroke="#10b981" stroke-width="2"/>
        <path d="M 630 155 C 655 155, 665 181, 684 181" fill="none" stroke="#0284c7" stroke-width="2"/>

        <!-- GAUGE RISK METER -->
        <g transform="translate(36, 275)">
          <rect width="888" height="68" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="24" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace">TREND INTERPRETATION // MOVING AVERAGE CONFIDENCE</text>
          
          <rect x="18" y="34" width="270" height="10" rx="3" fill="#ef4444" opacity="0.4"/>
          <text x="18" y="56" font-size="9.5" font-weight="700" fill="#ef4444" font-family="'Geist Mono', monospace">RAW DAILY: HIGH VOLATILITY NOISE</text>
          
          <rect x="296" y="34" width="270" height="10" rx="3" fill="#f59e0b" opacity="0.4"/>
          <text x="296" y="56" font-size="9.5" font-weight="700" fill="#f59e0b" font-family="'Geist Mono', monospace">3-DAY: RESIDUAL WEEKEND SKEW</text>

          <rect x="574" y="34" width="296" height="10" rx="3" fill="#10b981" opacity="0.9"/>
          <text x="574" y="56" font-size="9.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">&bull; 7-DAY: ROBUST CYCLICAL SMOOTHING</text>
        </g>

        <!-- BOTTOM DUAL COMPARISON CARDS -->
        <g transform="translate(36, 360)">
          <!-- Commercial Insight -->
          <rect width="425" height="100" rx="8" fill="${bgCard}" stroke="#10b981" stroke-width="1.3"/>
          <text x="18" y="24" font-size="10.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // BUSINESS INSIGHT</text>
          <text x="18" y="44" font-size="11" fill="${textSecondary}">Never let stakeholders panic over Sunday sales dips. By reporting</text>
          <text x="18" y="60" font-size="11" fill="${textSecondary}">the 7-day rolling average, day-of-week seasonality is naturally neutralised.</text>
          <text x="18" y="82" font-size="10" fill="#10b981" font-family="'Geist Mono', monospace">KPI Target: When 7-Day MA crosses above 30-Day MA &rarr; Positive momentum.</text>

          <!-- Analyst Pitfall -->
          <rect x="460" width="428" height="100" rx="8" fill="${bgCard}" stroke="#ef4444" stroke-width="1.3"/>
          <text x="478" y="24" font-size="10.5" font-weight="800" fill="#ef4444" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // THE MISSING DATE GAP TRAP</text>
          <text x="478" y="44" font-size="11" fill="${textSecondary}">ROWS BETWEEN 6 PRECEDING takes 7 recorded rows, NOT 7 calendar days!</text>
          <text x="478" y="60" font-size="11" fill="${textSecondary}">If Tuesday had 0 sales and has no row, it silently pulls data from 8 days ago!</text>
          <text x="478" y="82" font-size="10" fill="#ef4444" font-family="'Geist Mono', monospace">Fix: Cross join with calendar table or use RANGE BETWEEN INTERVAL '6' DAY.</text>
        </g>

        <!-- FOOTER QUOTE -->
        <text x="36" y="488" font-size="11" fill="${textMuted}" font-family="'Geist Mono', monospace">
          "A great data analyst does not present raw numbers &mdash; they strip away the noise so leadership can see the real signal."
        </text>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // DRAFT 3: COHORT RETENTION & CHURN ANALYSIS
  // Tracking Customer Lifespan Month-over-Month
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
          <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- TOP HEADLINE -->
        <text x="36" y="38" font-size="18" font-weight="800" fill="${textPrimary}" letter-spacing="-0.4">User Retention Cohort Matrix (MoM Activity Join)</text>
        <text x="36" y="58" font-size="11.5" fill="${textMuted}">Measuring how many users acquired in Cohort Month M return in Month M+1, M+2, and beyond to prove Product-Market Fit.</text>

        <!-- 3-STAGE FUNNEL -->
        <g transform="translate(36, 80)">
          <!-- LEFT: COHORT BASE -->
          <rect width="250" height="260" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace">01 ACQUISITION COHORT</text>
          <line x1="18" y1="36" x2="232" y2="36" stroke="${border}" stroke-width="1"/>

          <rect x="18" y="52" width="214" height="34" rx="4" fill="${bgSubtle}" stroke="#0284c7"/>
          <text x="28" y="72" font-size="11" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Jan 2026 Cohort (100%)</text>

          <rect x="18" y="96" width="214" height="34" rx="4" fill="${bgSubtle}" stroke="#d97706"/>
          <text x="28" y="116" font-size="11" font-weight="700" fill="#f59e0b" font-family="'Geist Mono', monospace">Total Signups: 1,000 Users</text>

          <rect x="18" y="140" width="214" height="42" rx="4" fill="${bgSubtle}" stroke="#10b981" stroke-width="1.5"/>
          <text x="28" y="160" font-size="11" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">First Purchase Verified</text>
          <text x="28" y="174" font-size="9.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Activated in Customer Database</text>

          <text x="18" y="210" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">BASELINE: 1,000 INITIAL USERS</text>
          <text x="18" y="226" font-size="9.5" fill="${textMuted}">Customer acquisition cost (CAC) sunk</text>
        </g>

        <!-- CENTER: JOIN & RETENTION DECAY -->
        <g transform="translate(316, 80)">
          <rect width="320" height="260" rx="8" fill="${bgCard}" stroke="#10b981" stroke-width="1.8" filter="url(#glow-emerald)"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">02 MONTH-OVER-MONTH SELF-JOIN</text>
          <line x1="18" y1="36" x2="302" y2="36" stroke="${border}" stroke-width="1"/>

          <rect x="18" y="52" width="284" height="40" rx="4" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981"/>
          <text x="28" y="70" font-size="10.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">Month 1 (Feb): 640 Active &rarr; 64.0%</text>
          <text x="28" y="84" font-size="9.5" fill="${textSecondary}">Initial activation drop-off stabilized</text>

          <rect x="18" y="102" width="284" height="40" rx="4" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981"/>
          <text x="28" y="120" font-size="10.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">Month 2 (Mar): 520 Active &rarr; 52.0%</text>
          <text x="28" y="134" font-size="9.5" fill="${textSecondary}">Core habituated customer segment</text>

          <rect x="18" y="152" width="284" height="40" rx="4" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8"/>
          <text x="28" y="170" font-size="10.5" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Month 3 (Apr): 490 Active &rarr; 49.0%</text>
          <text x="28" y="184" font-size="9.5" fill="${textMuted}">Retention curve flattens into baseline!</text>

          <text x="18" y="222" font-size="10.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">LONG-TERM ASYMPTOTE: ~48% SMILE CURVE</text>
        </g>

        <!-- RIGHT: EMISSION / BUSINESS IMPACT -->
        <g transform="translate(666, 80)">
          <rect width="258" height="260" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1.2"/>
          <text x="18" y="26" font-size="10.5" font-weight="800" fill="${textMuted}" font-family="'Geist Mono', monospace">03 UNIT ECONOMICS IMPACT</text>
          <line x1="18" y1="36" x2="240" y2="36" stroke="${border}" stroke-width="1"/>

          <rect x="18" y="52" width="222" height="120" rx="6" fill="${bgSubtle}" stroke="#10b981" stroke-width="1.2"/>
          <text x="28" y="74" font-size="10" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">LTV / CAC HEALTH INDICATORS</text>
          <text x="28" y="94" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">Customer Lifetime Value: $480</text>
          <text x="28" y="112" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">Payback Period: 3.2 Months</text>
          <text x="28" y="130" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">Net Revenue Retention: 114%</text>
          <text x="28" y="148" font-size="10" fill="${textPrimary}" font-family="'Geist Mono', monospace">Annual Churn Rate: 12%</text>

          <text x="18" y="200" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&radic; PRODUCT-MARKET FIT CONFIRMED</text>
          <text x="18" y="218" font-size="9.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Retention curve is asymptotic (not zero)</text>
        </g>

        <!-- CONNECTORS -->
        <path d="M 286 161 L 316 161" fill="none" stroke="#10b981" stroke-width="2"/>
        <path d="M 636 161 L 666 161" fill="none" stroke="#10b981" stroke-width="2"/>

        <!-- BOTTOM COMPARISON -->
        <g transform="translate(36, 360)">
          <!-- Commercial Insight -->
          <rect width="425" height="100" rx="8" fill="${bgCard}" stroke="#10b981" stroke-width="1.3"/>
          <text x="18" y="24" font-size="10.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // BUSINESS INSIGHT</text>
          <text x="18" y="44" font-size="11" fill="${textSecondary}">A retention curve that flattens parallel to the x-axis proves product-market</text>
          <text x="18" y="60" font-size="11" fill="${textSecondary}">fit. When older cohorts retain at 49%, each new user added expands revenue.</text>
          <text x="18" y="82" font-size="10" fill="#10b981" font-family="'Geist Mono', monospace">Analyst Tip: Check if Jan 2026 cohort is higher than Nov 2025 (Product improvement!).</text>

          <!-- Analyst Pitfall -->
          <rect x="460" width="428" height="100" rx="8" fill="${bgCard}" stroke="#ef4444" stroke-width="1.3"/>
          <text x="478" y="24" font-size="10.5" font-weight="800" fill="#ef4444" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // SURVIVORSHIP BIAS IN CHURN</text>
          <text x="478" y="44" font-size="11" fill="${textSecondary}">Only counting users who visited in the last 30 days ignores deactivated</text>
          <text x="478" y="60" font-size="11" fill="${textSecondary}">users, creating an illusion of high engagement by selecting only survivors!</text>
          <text x="478" y="82" font-size="10" fill="#ef4444" font-family="'Geist Mono', monospace">Fix: Denominator must always be the original cohort size (1,000), never the active subset.</text>
        </g>

        <!-- FOOTER -->
        <text x="36" y="488" font-size="11" fill="${textMuted}" font-family="'Geist Mono', monospace">
          "If retention does not flatten, growth is just water pouring into a leaking bucket."
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
              </span>
              <div>
                <h2 class="machines-title">SQL for Data Analysis &amp; Business Intelligence</h2>
                <span class="machines-subtitle">Raw Data &bull; SQL Transformations &bull; Commercial Insights</span>
              </div>
            </div>

            <!-- Draft Switcher Buttons -->
            <div class="machines-tabs-group">
              <button class="machine-tab-btn ${state.activeDraft === 'machine01' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDraft('machine01')">
                <span>01 Metric Engine (Revenue, AOV &amp; Frequency)</span>
              </button>
              <button class="machine-tab-btn ${state.activeDraft === 'machine02' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDraft('machine02')">
                <span>02 Metric Deconstructed (7-Day Rolling Trend)</span>
              </button>
              <button class="machine-tab-btn ${state.activeDraft === 'machine03' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDraft('machine03')">
                <span>03 Cohort Retention &amp; Churn Matrix</span>
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
    a.download = state.activeDraft + '_data_analysis_machine.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (window.SQL_BUDDY) window.SQL_BUDDY.say("Exported pristine " + state.activeDraft + ".svg data analysis machine!", 4000, 'celebrate');
  }

  function copySvgCode() {
    const svgEl = document.getElementById('relationalMachineSvg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(source).then(() => {
        if (window.SQL_BUDDY) window.SQL_BUDDY.say("Data Analysis SVG code copied to clipboard!", 3500, 'happy');
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
