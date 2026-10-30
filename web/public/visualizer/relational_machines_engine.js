/**
 * =============================================================================
 * RELATIONAL MACHINES ENGINE (DATA ANALYSIS & BUSINESS INTELLIGENCE EXPLAINERS)
 * Pure Bloomberg / LedgerLens Obsidian Dark Minimalist Vector Architecture
 * Exact Dimensions: Compact 920x520 viewBox, fine micro-typography,
 * Glowing Numbered Pins, Curved Bézier Flow Arcs, Financial-Grade Ledger Tables
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
  // DRAFT 1: ONE MACHINE, THREE GAUGES (THE METRIC ENGINE)
  // Raw Checkouts Log -> SQL Aggregation Rollup -> Executive Commercial Reality
  // ---------------------------------------------------------------------------
  function getDraft1Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#07080c' : '#f8fafc';
    const bgCard = isDark ? '#0e1117' : '#ffffff';
    const bgSubtle = isDark ? '#141822' : '#f1f5f9';
    const border = isDark ? '#1c2230' : '#e2e8f0';
    const hairline = isDark ? '#262f42' : '#cbd5e1';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    const hNode = state.activeHighlightNode;

    const opac1 = (hNode === null || hNode === 1) ? '1' : '0.18';
    const opac2 = (hNode === null || hNode === 2) ? '1' : '0.18';
    const opac3 = (hNode === null || hNode === 3) ? '1' : '0.18';
    const opac4 = (hNode === null || hNode === 4) ? '1' : '0.18';

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-amber" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-emerald" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-rose" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- TOP STATS METRIC BAR -->
        <text x="30" y="24" font-size="9.5" font-family="'Geist Mono', monospace" fill="${textMuted}" letter-spacing="0.3">
          <tspan fill="${textPrimary}" font-weight="700">14,280</tspan> orders tracked  &bull;  
          <tspan fill="#10b981" font-weight="700">0</tspan> null checkouts  &bull;  
          <tspan fill="#38bdf8" font-weight="700">3,410</tspan> unique buyers  &bull;  
          <tspan fill="#fbbf24" font-weight="700">3</tspan> relational gauges
        </text>

        <!-- TITLE & SUBTITLE -->
        <text x="30" y="48" font-size="17" font-weight="700" fill="${textPrimary}" letter-spacing="-0.3">One machine, three gauges</text>
        <text x="30" y="64" font-size="9.5" fill="${textMuted}">Every transaction moves between the layers &mdash; The SQL machine traces the path from raw events to executive commercial KPIs.</text>

        <!-- ================================================================= -->
        <!-- GAUGE 1: RAW TRANSACTIONS (EVENTS • LOG)                          -->
        <!-- ================================================================= -->
        <g transform="translate(30, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          
          <!-- Header -->
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">RAW TRANSACTIONS</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">events &bull; log</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <!-- Table Rows -->
          <!-- Row 1: Orders Table Grain -->
          <text x="14" y="48" font-size="10.5" fill="${textSecondary}">Orders Table (Grain)</text>
          <text x="246" y="48" font-size="10" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">14,280</text>

          <!-- Row 2: Cancelled Returns -->
          <text x="14" y="70" font-size="10.5" fill="${textMuted}">less: Returns / Cancelled</text>
          <text x="246" y="70" font-size="10" fill="#ef4444" text-anchor="end" font-family="'Geist Mono', monospace">(320)</text>

          <!-- Row 3: Net Valid Checkouts -->
          <text x="14" y="92" font-size="10.5" font-weight="600" fill="${textPrimary}">Net Valid Checkouts</text>
          <text x="246" y="92" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">13,960</text>

          <!-- Row 4: [PIN 1] order_amount (Highlighted Pill) -->
          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(1)" opacity="${opac1}">
            <rect x="10" y="103" width="240" height="24" rx="4" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1"/>
            <circle cx="22" cy="115" r="7" fill="#0284c7" filter="url(#glow-cyan)"/>
            <text x="22" y="118.5" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">1</text>
            <text x="36" y="118.5" font-size="10" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">order_amount ($)</text>
            <text x="242" y="118.5" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">$1.43M</text>
          </g>

          <!-- Row 5: [PIN 2] customer_id (Highlighted Pill) -->
          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(2)" opacity="${opac2}">
            <rect x="10" y="133" width="240" height="24" rx="4" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1"/>
            <circle cx="22" cy="145" r="7" fill="#d97706" filter="url(#glow-amber)"/>
            <text x="22" y="148.5" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">2</text>
            <text x="36" y="148.5" font-size="10" font-weight="700" fill="#fbbf24" font-family="'Geist Mono', monospace">customer_id (Dimension)</text>
            <text x="242" y="148.5" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="end" font-family="'Geist Mono', monospace">3,410</text>
          </g>

          <!-- Row 6: Payment Cards -->
          <text x="14" y="176" font-size="10" fill="${textMuted}">Payment Method: Card / UPI</text>
          <text x="246" y="176" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">88.4%</text>

          <!-- Row 7: Mobile Platform -->
          <text x="14" y="196" font-size="10" fill="${textMuted}">Platform: Mobile iOS &bull; Web</text>
          <text x="246" y="196" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">68.5%</text>

          <!-- Bottom Micro Sanity Box -->
          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; DATA INTEGRITY AUDIT: PASS</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">0 NULL checkouts &bull; Refund status excluded</text>
        </g>

        <!-- ================================================================= -->
        <!-- GAUGE 2: SQL AGGREGATION (GROUP BY • LOGIC)                       -->
        <!-- ================================================================= -->
        <g transform="translate(330, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          
          <!-- Header -->
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">SQL AGGREGATION</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">group by &bull; logic</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <!-- Row 1: SUM(order_amount) -->
          <text x="14" y="48" font-size="10.5" fill="${textSecondary}">SUM(order_amount)</text>
          <text x="246" y="48" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">$1,428,950</text>

          <!-- Row 2: [PIN 3] AVG(order_amount) (Highlighted Pill) -->
          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(3)" opacity="${opac3}">
            <rect x="10" y="60" width="240" height="24" rx="4" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1"/>
            <circle cx="22" cy="72" r="7" fill="#10b981" filter="url(#glow-emerald)"/>
            <text x="22" y="75.5" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">3</text>
            <text x="36" y="75.5" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">AVG(order_amount) [AOV]</text>
            <text x="242" y="75.5" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$102.36</text>
          </g>

          <!-- Row 3: COUNT(DISTINCT customer_id) -->
          <text x="14" y="103" font-size="10" fill="${textMuted}">COUNT(DISTINCT user_id)</text>
          <text x="246" y="103" font-size="9.5" fill="#f59e0b" text-anchor="end" font-family="'Geist Mono', monospace">3,410 users</text>

          <!-- Row 4: Total Executed Orders Count -->
          <text x="14" y="125" font-size="10" fill="${textMuted}">COUNT(order_id)</text>
          <text x="246" y="125" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">13,960</text>

          <!-- Row 5: Purchase Frequency Rollup -->
          <text x="14" y="147" font-size="10.5" font-weight="600" fill="${textPrimary}">Purchase Frequency</text>
          <text x="246" y="147" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">4.09x</text>

          <!-- Row 6: Date Trunc Dimension -->
          <text x="14" y="172" font-size="9.5" fill="${textMuted}">DATE_TRUNC('month', date)</text>
          <text x="246" y="172" font-size="9" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">2026-10</text>

          <!-- Row 7: Filter Clause -->
          <text x="14" y="192" font-size="9.5" fill="${textMuted}">HAVING COUNT(order_id) &ge; 1</text>
          <text x="246" y="192" font-size="9" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">TRUE</text>

          <!-- Bottom Aggregation Grain Box -->
          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">&bull; ROLLUP GRAIN: 1 ROW / MONTH</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Dimensions: Year-Month &bull; Category</text>
        </g>

        <!-- ================================================================= -->
        <!-- GAUGE 3: EXECUTIVE BUSINESS KPIS (COMMERCIAL • REALITY)            -->
        <!-- ================================================================= -->
        <g transform="translate(630, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          
          <!-- Header -->
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">COMMERCIAL REALITY</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">business &bull; kpi</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <!-- Row 1: [PIN 4] GMV (Highlighted Pill) -->
          <g class="machine-node-chip" style="cursor:pointer;" onclick="window.RelationalMachinesEngine.highlightNode(4)" opacity="${opac4}">
            <rect x="10" y="37" width="240" height="25" rx="4" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" stroke-width="1"/>
            <circle cx="22" cy="49.5" r="7" fill="#f43f5e" filter="url(#glow-rose)"/>
            <text x="22" y="53" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">4</text>
            <text x="36" y="53" font-size="10" font-weight="700" fill="#f43f5e" font-family="'Geist Mono', monospace">Gross Monthly GMV</text>
            <text x="242" y="53" font-size="10" font-weight="800" fill="#f43f5e" text-anchor="end" font-family="'Geist Mono', monospace">$1,428,950</text>
          </g>

          <!-- Row 2: Average Basket Size -->
          <text x="14" y="80" font-size="10.5" fill="${textSecondary}">Average Basket Size</text>
          <text x="246" y="80" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$102.36</text>

          <!-- Row 3: Active Buyers -->
          <text x="14" y="103" font-size="10" fill="${textMuted}">Active Buyer Base</text>
          <text x="246" y="103" font-size="9.5" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">3,410</text>

          <!-- Row 4: Blended CAC -->
          <text x="14" y="125" font-size="10" fill="${textMuted}">Customer Acquisition (CAC)</text>
          <text x="246" y="125" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">$42.50</text>

          <!-- Row 5: LTV -->
          <text x="14" y="147" font-size="10.5" font-weight="600" fill="${textPrimary}">Customer Lifetime Value (LTV)</text>
          <text x="246" y="147" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$418.00</text>

          <!-- Row 6: LTV / CAC Ratio -->
          <text x="14" y="172" font-size="10" font-weight="600" fill="#fbbf24">LTV / CAC Health Ratio</text>
          <text x="246" y="172" font-size="9.5" font-weight="800" fill="#fbbf24" text-anchor="end" font-family="'Geist Mono', monospace">9.8x (Elite)</text>

          <!-- Row 7: Repeat Contribution -->
          <text x="14" y="192" font-size="9.5" fill="${textMuted}">Repeat Buyer Revenue Share</text>
          <text x="246" y="192" font-size="9" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">64.2%</text>

          <!-- Bottom Commercial Verdict Box -->
          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; COMMERCIAL VERDICT: STRONG RETENTION</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Growth driven by repeat orders, not ad burn</text>
        </g>

        <!-- ================================================================= -->
        <!-- DELICATE CURVED BÉZIER FLOW WIRES (1.3px stroke + glowing dots)   -->
        <!-- ================================================================= -->
        <!-- Wire 1 (Cyan): order_amount -> SUM(order_amount) -->
        <path d="M 280 195 C 302 195, 310 128, 330 128" fill="none" stroke="#38bdf8" stroke-width="${hNode === 1 ? '2.5' : '1.3'}" opacity="${opac1}" filter="${hNode === 1 ? 'url(#glow-cyan)' : 'none'}"/>
        <circle cx="280" cy="195" r="2.5" fill="#38bdf8" opacity="${opac1}"/>
        <circle cx="330" cy="128" r="2.5" fill="#38bdf8" opacity="${opac1}"/>

        <!-- Wire 2 (Amber): customer_id -> COUNT(DISTINCT) -->
        <path d="M 280 225 C 305 225, 310 183, 330 183" fill="none" stroke="#f59e0b" stroke-width="${hNode === 2 ? '2.5' : '1.3'}" stroke-dasharray="3 2" opacity="${opac2}" filter="${hNode === 2 ? 'url(#glow-amber)' : 'none'}"/>
        <circle cx="280" cy="225" r="2.5" fill="#f59e0b" opacity="${opac2}"/>
        <circle cx="330" cy="183" r="2.5" fill="#f59e0b" opacity="${opac2}"/>

        <!-- Wire 3 (Emerald): AVG(order_amount) -> Average Basket Size -->
        <path d="M 580 152 C 605 152, 610 160, 630 160" fill="none" stroke="#10b981" stroke-width="${hNode === 3 ? '2.5' : '1.3'}" opacity="${opac3}" filter="${hNode === 3 ? 'url(#glow-emerald)' : 'none'}"/>
        <circle cx="580" cy="152" r="2.5" fill="#10b981" opacity="${opac3}"/>
        <circle cx="630" cy="160" r="2.5" fill="#10b981" opacity="${opac3}"/>

        <!-- Wire 4 (Rose): SUM -> GMV Hero Pill -->
        <path d="M 580 128 C 605 128, 608 130, 630 130" fill="none" stroke="#f43f5e" stroke-width="${hNode === 4 ? '2.5' : '1.3'}" stroke-dasharray="4 2" opacity="${opac4}" filter="${hNode === 4 ? 'url(#glow-rose)' : 'none'}"/>
        <circle cx="580" cy="128" r="2.5" fill="#f43f5e" opacity="${opac4}"/>
        <circle cx="630" cy="130" r="2.5" fill="#f43f5e" opacity="${opac4}"/>

        <!-- BOTTOM RECONCILIATION MONOSPACE LINE -->
        <text x="30" y="372" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">
          1 raw order log streams into GMV &bull; 2 distinct keys deduplicate buyers &bull; 3 basket size calculates AOV &bull; 4 executive GMV reconciles with finance
        </text>

        <!-- ================================================================= -->
        <!-- BOTTOM DUAL DATA ANALYST PANELS                                   -->
        <!-- ================================================================= -->
        <!-- Panel 1: Commercial Insight -->
        <g transform="translate(30, 390)">
          <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <line x1="0" y1="0" x2="0" y2="92" stroke="#10b981" stroke-width="3"/>
          <text x="14" y="20" font-size="9" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // COMMERCIAL INSIGHT</text>
          <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Revenue is up +14.2% MoM not because acquisition costs rose, but because</text>
          <text x="14" y="52" font-size="9.5" fill="${textSecondary}">repeat buyer frequency reached 4.09x while AOV held steady at $102.36.</text>
          <text x="14" y="72" font-size="9" font-weight="600" fill="#10b981" font-family="'Geist Mono', monospace">Commercial Action: Reallocate 18% of paid ad budget into customer retention.</text>
        </g>

        <!-- Panel 2: Analyst Pitfall -->
        <g transform="translate(472, 390)">
          <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <line x1="0" y1="0" x2="0" y2="92" stroke="#f43f5e" stroke-width="3"/>
          <text x="14" y="20" font-size="9" font-weight="700" fill="#fb7185" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // 1-TO-MANY FAN-OUT TRAP</text>
          <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Joining orders to order_items before executing SUM(order_amount) duplicates</text>
          <text x="14" y="52" font-size="9.5" fill="${textSecondary}">order totals across every line item in the basket. In an order with 4 items, GMV</text>
          <text x="14" y="72" font-size="9" font-weight="600" fill="#f43f5e" font-family="'Geist Mono', monospace">is 4x inflated! Fix: Aggregate line items at order grain first before joining.</text>
        </g>

        <!-- FOOTER ATTRIBUTION -->
        <text x="30" y="504" font-size="8" fill="#3f3f46" font-family="'Geist Mono', monospace" letter-spacing="1">
          ILLUSTRATIVE DATA &bull; THE ENGINE TRACES DATA FLOW FROM RAW DB EVENTS TO EXECUTIVE COMMERCIAL METRICS
        </text>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // DRAFT 2: METRIC DECONSTRUCTED (7-DAY ROLLING MOVING WINDOW)
  // Smoothing Weekend Volatility to Reveal True Business Signal
  // ---------------------------------------------------------------------------
  function getDraft2Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#07080c' : '#f8fafc';
    const bgCard = isDark ? '#0e1117' : '#ffffff';
    const bgSubtle = isDark ? '#141822' : '#f1f5f9';
    const border = isDark ? '#1c2230' : '#e2e8f0';
    const hairline = isDark ? '#262f42' : '#cbd5e1';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-gold" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- TOP STATS METRIC BAR -->
        <text x="30" y="24" font-size="9.5" font-family="'Geist Mono', monospace" fill="${textMuted}" letter-spacing="0.3">
          <tspan fill="#fbbf24" font-weight="700">L7D Moving Average</tspan>  &bull;  
          <tspan fill="${textPrimary}">ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</tspan>  &bull;  
          <tspan fill="#10b981">Zero-Collapse Cursor</tspan>
        </text>

        <!-- TITLE & SUBTITLE -->
        <text x="30" y="48" font-size="17" font-weight="700" fill="${textPrimary}" letter-spacing="-0.3">The 7-Day Rolling Moving Window</text>
        <text x="30" y="64" font-size="9.5" fill="${textMuted}" font-family="'Geist Mono', monospace">AVG(daily_sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</text>

        <!-- 3-COLUMN ARCHITECTURE: WHAT FEEDS IT -> THE ELEMENT -> WHERE IT GOES -->
        <!-- Column 1: WHAT FEEDS IT -->
        <g transform="translate(30, 80)">
          <text x="0" y="12" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">WHAT FEEDS IT // DAILY NOISE</text>
          
          <rect y="22" width="220" height="38" rx="6" fill="${bgCard}" stroke="#0284c7" stroke-width="1"/>
          <text x="12" y="38" font-size="10" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Daily Fluctuation Spikes</text>
          <text x="12" y="51" font-size="8.5" fill="${textMuted}">Monday surge vs Sunday quiet period</text>

          <rect y="68" width="220" height="38" rx="6" fill="${bgCard}" stroke="#d97706" stroke-width="1"/>
          <text x="12" y="84" font-size="10" font-weight="700" fill="#fbbf24" font-family="'Geist Mono', monospace">Calendar Day Gaps</text>
          <text x="12" y="97" font-size="8.5" fill="${textMuted}">Dates with zero transactions (missing rows)</text>

          <rect y="114" width="220" height="38" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="12" y="130" font-size="10" font-weight="700" fill="${textSecondary}" font-family="'Geist Mono', monospace">One-Off Flash Sales</text>
          <text x="12" y="143" font-size="8.5" fill="${textMuted}">Black Friday / Cyber Monday anomalies</text>
        </g>

        <!-- Column 2: THE ELEMENT (HERO GLOWING CARD) -->
        <g transform="translate(290, 80)">
          <text x="0" y="12" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">ANALYTICAL SLIDING FRAME</text>
          
          <rect y="22" width="340" height="130" rx="8" fill="${bgCard}" stroke="#d97706" stroke-width="1.4" filter="url(#glow-gold)"/>
          <text x="16" y="44" font-size="9" font-weight="800" fill="#fbbf24" font-family="'Geist Mono', monospace" letter-spacing="0.5">WINDOW FRAME SPECIFICATION</text>
          
          <text x="16" y="78" font-size="24" font-weight="800" fill="${textPrimary}" font-family="'Geist Mono', monospace">$204,135<tspan font-size="11" font-weight="500" fill="${textMuted}"> / day</tspan></text>
          <text x="16" y="98" font-size="10" fill="${textSecondary}">6 Preceding + Current Row = 7 Row Buffer</text>
          <line x1="16" y1="108" x2="324" y2="108" stroke="${border}" stroke-width="0.8"/>
          <text x="16" y="128" font-size="9" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; NOISE FILTERED: DAY-OF-WEEK CYCLICAL SKEW REMOVED</text>
        </g>

        <!-- Column 3: WHERE IT GOES -->
        <g transform="translate(670, 80)">
          <text x="0" y="12" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">WHERE IT GOES // DECISIONS</text>
          
          <rect y="22" width="220" height="38" rx="6" fill="${bgCard}" stroke="#10b981" stroke-width="1"/>
          <text x="12" y="38" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">Executive Trendline</text>
          <text x="12" y="51" font-size="8.5" fill="${textMuted}">Noise-free curve on board deck</text>

          <rect y="68" width="220" height="38" rx="6" fill="${bgCard}" stroke="#0284c7" stroke-width="1"/>
          <text x="12" y="84" font-size="10" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Anomaly Detection</text>
          <text x="12" y="97" font-size="8.5" fill="${textMuted}">Flags true variance drifting &plusmn;3 std dev</text>

          <rect y="114" width="220" height="38" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="12" y="130" font-size="10" font-weight="700" fill="${textSecondary}" font-family="'Geist Mono', monospace">Safety Stock Reorder</text>
          <text x="12" y="143" font-size="8.5" fill="${textMuted}">Warehouse supply replenish triggers</text>
        </g>

        <!-- CURVED CONNECTING WIRES -->
        <path d="M 250 120 C 270 120, 275 140, 290 140" fill="none" stroke="#0284c7" stroke-width="1.3"/>
        <path d="M 250 166 C 270 166, 275 140, 290 140" fill="none" stroke="#d97706" stroke-width="1.3"/>
        
        <path d="M 630 140 C 650 140, 655 120, 670 120" fill="none" stroke="#10b981" stroke-width="1.3"/>
        <path d="M 630 140 C 650 140, 655 166, 670 166" fill="none" stroke="#0284c7" stroke-width="1.3"/>

        <!-- VOLATILITY RISK METER -->
        <g transform="translate(30, 248)">
          <rect width="860" height="60" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="16" y="20" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace">TREND CONFIDENCE // VOLATILITY SMOOTHING</text>
          
          <rect x="16" y="28" width="260" height="8" rx="2" fill="#ef4444" opacity="0.4"/>
          <text x="16" y="48" font-size="8.5" font-weight="700" fill="#ef4444" font-family="'Geist Mono', monospace">RAW DAILY: HIGH VOLATILITY NOISE</text>
          
          <rect x="286" y="28" width="260" height="8" rx="2" fill="#f59e0b" opacity="0.4"/>
          <text x="286" y="48" font-size="8.5" font-weight="700" fill="#f59e0b" font-family="'Geist Mono', monospace">3-DAY: RESIDUAL WEEKEND SKEW</text>

          <rect x="556" y="28" width="290" height="8" rx="2" fill="#10b981" opacity="0.95"/>
          <text x="556" y="48" font-size="8.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">&bull; 7-DAY: ROBUST CYCLICAL SMOOTHING</text>
        </g>

        <!-- BOTTOM DUAL COMPARISON PANELS -->
        <g transform="translate(30, 326)">
          <!-- Commercial Insight -->
          <g>
            <rect width="418" height="96" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="96" stroke="#10b981" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // BUSINESS INSIGHT</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Never let stakeholders panic over Sunday sales dips. By reporting</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">the 7-day rolling moving average, day-of-week seasonality is naturally neutralised.</text>
            <text x="14" y="74" font-size="9" font-weight="600" fill="#10b981" font-family="'Geist Mono', monospace">KPI Target: When 7-Day MA crosses above 30-Day MA &rarr; Positive momentum.</text>
          </g>

          <!-- Analyst Pitfall -->
          <g transform="translate(442, 0)">
            <rect width="418" height="96" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="96" stroke="#f43f5e" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#fb7185" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // THE MISSING DATE GAP TRAP</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">ROWS BETWEEN 6 PRECEDING takes 7 recorded rows, NOT 7 calendar days!</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">If Tuesday had 0 sales and lacks a row, it silently pulls data from 8 days ago!</text>
            <text x="14" y="74" font-size="9" font-weight="600" fill="#f43f5e" font-family="'Geist Mono', monospace">Fix: Cross join with calendar table or use RANGE BETWEEN INTERVAL '6' DAY.</text>
          </g>
        </g>

        <!-- FOOTER QUOTE -->
        <text x="30" y="448" font-size="9.5" fill="${textMuted}" font-family="'Geist Mono', monospace">
          "A great data analyst does not present raw numbers &mdash; they strip away the noise so leadership can see the real signal."
        </text>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // DRAFT 3: COHORT RETENTION & CHURN MATRIX (MOM ACTIVITY JOIN)
  // Tracking Customer Survival across Calendar Months
  // ---------------------------------------------------------------------------
  function getDraft3Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#07080c' : '#f8fafc';
    const bgCard = isDark ? '#0e1117' : '#ffffff';
    const bgSubtle = isDark ? '#141822' : '#f1f5f9';
    const border = isDark ? '#1c2230' : '#e2e8f0';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-emerald" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- TOP STATS METRIC BAR -->
        <text x="30" y="24" font-size="9.5" font-family="'Geist Mono', monospace" fill="${textMuted}" letter-spacing="0.3">
          <tspan fill="${textPrimary}" font-weight="700">1,000</tspan> users in Jan cohort  &bull;  
          <tspan fill="#10b981" font-weight="700">490</tspan> retained at Month 3  &bull;  
          <tspan fill="#38bdf8" font-weight="700">49.0%</tspan> asymptotic curve  &bull;  
          <tspan fill="#fbbf24" font-weight="700">114%</tspan> NRR
        </text>

        <!-- TITLE & SUBTITLE -->
        <text x="30" y="48" font-size="17" font-weight="700" fill="${textPrimary}" letter-spacing="-0.3">User Retention Cohort Matrix</text>
        <text x="30" y="64" font-size="9.5" fill="${textMuted}">Measuring how many users acquired in Month M return in Month M+1, M+2, and beyond to prove Product-Market Fit.</text>

        <!-- 3-STAGE FUNNEL -->
        <!-- Gauge 1: 01 ACQUISITION COHORT -->
        <g transform="translate(30, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">01 ACQUISITION COHORT</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">baseline</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <text x="14" y="52" font-size="10.5" fill="${textSecondary}">Acquisition Month</text>
          <text x="246" y="52" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">2026-01</text>

          <text x="14" y="78" font-size="10.5" fill="${textSecondary}">Total New Signups</text>
          <text x="246" y="78" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">1,000 users</text>

          <text x="14" y="104" font-size="10.5" fill="${textSecondary}">First Purchase Verified</text>
          <text x="246" y="104" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">100.0% (1,000)</text>

          <text x="14" y="130" font-size="10" fill="${textMuted}">Blended CAC Sunk</text>
          <text x="246" y="130" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">$42.50 / user</text>

          <text x="14" y="154" font-size="10" fill="${textMuted}">Total Cohort Spend</text>
          <text x="246" y="154" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">$42,500</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">&bull; BASELINE DENOMINATOR: 1,000 USERS</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Acquisition cost sunk &bull; Never changes</text>
        </g>

        <!-- Gauge 2: 02 MONTH-OVER-MONTH ACTIVITY JOIN (HERO CARD) -->
        <g transform="translate(330, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="#10b981" stroke-width="1.3" filter="url(#glow-emerald)"/>
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace" letter-spacing="1.2">02 ACTIVITY DECAY CURVE</text>
          <text x="246" y="22" font-size="8.5" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">retention</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <text x="14" y="52" font-size="10" fill="${textMuted}">Month 0 (Jan): Baseline</text>
          <text x="246" y="52" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">1,000 (100.0%)</text>

          <text x="14" y="80" font-size="10.5" fill="${textSecondary}">Month 1 (Feb): Returning</text>
          <text x="246" y="80" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">640 (64.0%)</text>

          <text x="14" y="108" font-size="10.5" fill="${textSecondary}">Month 2 (Mar): Habituated</text>
          <text x="246" y="108" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">520 (52.0%)</text>

          <text x="14" y="136" font-size="10.5" font-weight="600" fill="${textPrimary}">Month 3 (Apr): Core Base</text>
          <text x="246" y="136" font-size="10.5" font-weight="800" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">490 (49.0%)</text>

          <text x="14" y="162" font-size="10" fill="${textMuted}">Month 4 (May): Asymptote</text>
          <text x="246" y="162" font-size="9.5" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">485 (48.5%)</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; RETENTION CURVE FLATTENS AT ~49%</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Asymptote parallel to x-axis = PMF</text>
        </g>

        <!-- Gauge 3: 03 UNIT ECONOMICS IMPACT -->
        <g transform="translate(630, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">03 UNIT ECONOMICS</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">impact</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <text x="14" y="52" font-size="10.5" fill="${textSecondary}">Customer Lifetime Value</text>
          <text x="246" y="52" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$480.00</text>

          <text x="14" y="80" font-size="10.5" fill="${textSecondary}">CAC Payback Period</text>
          <text x="246" y="80" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">3.2 Months</text>

          <text x="14" y="108" font-size="10.5" font-weight="600" fill="${textPrimary}">Net Revenue Retention (NRR)</text>
          <text x="246" y="108" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="end" font-family="'Geist Mono', monospace">114% (Expansion)</text>

          <text x="14" y="136" font-size="10" fill="${textMuted}">Annualized User Churn</text>
          <text x="246" y="136" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">12.4%</text>

          <text x="14" y="162" font-size="10" fill="${textMuted}">LTV / CAC Multiple</text>
          <text x="246" y="162" font-size="9.5" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">11.3x</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&radic; PRODUCT-MARKET FIT CONFIRMED</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Non-zero asymptote guarantees expansion</text>
        </g>

        <!-- DELICATE CONNECTORS -->
        <path d="M 290 140 L 330 140" fill="none" stroke="#10b981" stroke-width="1.3"/>
        <circle cx="290" cy="140" r="2.5" fill="#10b981"/>
        <circle cx="330" cy="140" r="2.5" fill="#10b981"/>

        <path d="M 590 140 L 630 140" fill="none" stroke="#10b981" stroke-width="1.3"/>
        <circle cx="590" cy="140" r="2.5" fill="#10b981"/>
        <circle cx="630" cy="140" r="2.5" fill="#10b981"/>

        <!-- BOTTOM RECONCILIATION MONOSPACE LINE -->
        <text x="30" y="372" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">
          1 acquisition cohort locks denominator &bull; 2 activity self-join measures retention &bull; 3 curve asymptote proves PMF &bull; 4 unit economics expand
        </text>

        <!-- BOTTOM DUAL COMPARISON PANELS -->
        <g transform="translate(30, 390)">
          <!-- Panel 1: Insight -->
          <g>
            <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="92" stroke="#10b981" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // BUSINESS INSIGHT</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">A retention curve that flattens parallel to the x-axis proves product-market</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">fit. When older cohorts retain at 49%, each new user added expands revenue.</text>
            <text x="14" y="72" font-size="9" font-weight="600" fill="#10b981" font-family="'Geist Mono', monospace">Analyst Tip: Check if Jan 2026 cohort is higher than Nov 2025 (Product improvement!).</text>
          </g>

          <!-- Panel 2: Pitfall -->
          <g transform="translate(442, 0)">
            <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="92" stroke="#f43f5e" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#fb7185" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // SURVIVORSHIP BIAS IN CHURN</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Only counting users who visited in the last 30 days ignores deactivated</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">users, creating an illusion of high engagement by selecting only survivors!</text>
            <text x="14" y="72" font-size="9" font-weight="600" fill="#f43f5e" font-family="'Geist Mono', monospace">Fix: Denominator must always be the original cohort size (1,000), never the active subset.</text>
          </g>
        </g>

        <!-- FOOTER ATTRIBUTION -->
        <text x="30" y="504" font-size="8" fill="#3f3f46" font-family="'Geist Mono', monospace" letter-spacing="1">
          "IF RETENTION DOES NOT FLATTEN, GROWTH IS JUST WATER POURING INTO A LEAKING BUCKET."
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
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
              </span>
              <div>
                <h2 class="machines-title">Relational Machines</h2>
                <span class="machines-subtitle">SQL Data Analysis &bull; Business Intelligence Explainer SVGs</span>
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
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download SVG</span>
            </button>
            <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.copySvgCode()" title="Copy Raw SVG XML to Clipboard">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
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
    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
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
