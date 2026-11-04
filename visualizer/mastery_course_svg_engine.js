/**
 * SQL FOUNDRY - CARBON PRECISION SVG ARCHITECTURE ENGINE
 * Ultra-clean, high-contrast, monochrome relational architecture diagrams.
 * ViewBox: 1000 x 270 (Sleek 25:6.75 Aspect Ratio).
 * 3-Column Symmetrical Layout: Source (314px) -> Kernel (300px) -> Materialized (314px).
 */

window.MasterySvgEngine = (function() {
  'use strict';

  function escapeXml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // --- COMMON SVG DEFS (ICONS, GRADIENTS, MARKERS) ---
  function getSvgDefs() {
    return `
      <defs>
        <!-- Gradients -->
        <linearGradient id="gPanelBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0e0e12"/>
          <stop offset="100%" stop-color="#08080a"/>
        </linearGradient>
        <linearGradient id="gHeaderBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#141418"/>
          <stop offset="100%" stop-color="#0c0c0e"/>
        </linearGradient>
        <linearGradient id="gChipBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1c1c22"/>
          <stop offset="100%" stop-color="#121216"/>
        </linearGradient>

        <!-- Arrow Markers -->
        <marker id="arrowMuted" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 1 1 L 7 4 L 1 7 z" fill="#44444a"/>
        </marker>
        <marker id="arrowWhite" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 1 1 L 7 4 L 1 7 z" fill="#ffffff"/>
        </marker>

        <!-- Vector Icons (14x14 coordinate space) -->
        <g id="icon-db">
          <path d="M 2 3 C 2 1.8 5 1.5 7 1.5 C 9 1.5 12 1.8 12 3 M 2 3 L 2 11 C 2 12.2 5 12.5 7 12.5 C 9 12.5 12 12.2 12 11 L 12 3 M 2 7 C 2 8.2 5 8.5 7 8.5 C 9 8.5 12 8.2 12 7" fill="none" stroke="currentColor" stroke-width="1.2"/>
        </g>
        <g id="icon-cpu">
          <rect x="2.5" y="2.5" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/>
          <rect x="5" y="5" width="4" height="4" rx="0.8" fill="currentColor"/>
          <line x1="4.5" y1="1" x2="4.5" y2="2.5" stroke="currentColor" stroke-width="1.2"/>
          <line x1="7" y1="1" x2="7" y2="2.5" stroke="currentColor" stroke-width="1.2"/>
          <line x1="9.5" y1="1" x2="9.5" y2="2.5" stroke="currentColor" stroke-width="1.2"/>
          <line x1="4.5" y1="11.5" x2="4.5" y2="13" stroke="currentColor" stroke-width="1.2"/>
          <line x1="7" y1="11.5" x2="7" y2="13" stroke="currentColor" stroke-width="1.2"/>
          <line x1="9.5" y1="11.5" x2="9.5" y2="13" stroke="currentColor" stroke-width="1.2"/>
          <line x1="1" y1="4.5" x2="2.5" y2="4.5" stroke="currentColor" stroke-width="1.2"/>
          <line x1="1" y1="7" x2="2.5" y2="7" stroke="currentColor" stroke-width="1.2"/>
          <line x1="1" y1="9.5" x2="2.5" y2="9.5" stroke="currentColor" stroke-width="1.2"/>
          <line x1="11.5" y1="4.5" x2="13" y2="4.5" stroke="currentColor" stroke-width="1.2"/>
          <line x1="11.5" y1="7" x2="13" y2="7" stroke="currentColor" stroke-width="1.2"/>
          <line x1="11.5" y1="9.5" x2="13" y2="9.5" stroke="currentColor" stroke-width="1.2"/>
        </g>
        <g id="icon-table">
          <rect x="1.5" y="2" width="11" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/>
          <line x1="1.5" y1="5.5" x2="12.5" y2="5.5" stroke="currentColor" stroke-width="1.1"/>
          <line x1="5.5" y1="5.5" x2="5.5" y2="12" stroke="currentColor" stroke-width="1.1"/>
        </g>
        <g id="icon-filter">
          <polygon points="1.5,2.5 12.5,2.5 8.5,7.5 8.5,12 5.5,10.5 5.5,7.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
        </g>
        <g id="icon-sort">
          <path d="M 3.5 11.5 L 3.5 2.5 M 3.5 2.5 L 1.5 4.5 M 3.5 2.5 L 5.5 4.5 M 10.5 2.5 L 10.5 11.5 M 10.5 11.5 L 8.5 9.5 M 10.5 11.5 L 12.5 9.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g id="icon-sigma">
          <path d="M 11 2.5 L 3 2.5 L 7 7 L 3 11.5 L 11 11.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g id="icon-group">
          <rect x="1.5" y="2" width="4.5" height="4.5" rx="1" fill="currentColor"/>
          <rect x="8" y="2" width="4.5" height="4.5" rx="1" fill="currentColor"/>
          <rect x="4.75" y="8" width="4.5" height="4.5" rx="1" fill="currentColor"/>
        </g>
        <g id="icon-join">
          <circle cx="5" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1.2"/>
          <circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1.2"/>
        </g>
        <g id="icon-branch">
          <path d="M 3 3 L 3 11 M 3 7 L 11 3 M 11 3 L 11 6" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
        </g>
        <g id="icon-pipe">
          <rect x="1.5" y="4.5" width="3.5" height="5" rx="1" fill="currentColor"/>
          <rect x="9" y="4.5" width="3.5" height="5" rx="1" fill="currentColor"/>
          <line x1="5" y1="7" x2="9" y2="7" stroke="currentColor" stroke-width="1.2"/>
        </g>
        <g id="icon-window">
          <rect x="1.5" y="2.5" width="11" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/>
          <line x1="5" y1="2.5" x2="5" y2="11.5" stroke="currentColor" stroke-width="1.1"/>
          <line x1="9" y1="2.5" x2="9" y2="11.5" stroke="currentColor" stroke-width="1.1"/>
        </g>
        <g id="icon-check">
          <polyline points="2.5,7 5.5,10 11.5,3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </defs>
    `;
  }

  // --- REUSABLE SHELL GENERATOR ---
  function renderPanelShell(x, y, w, h, iconId, title, badgeText, strokeColor, strokeWidth) {
    return `
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="url(#gPanelBg)" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>
      <!-- Header -->
      <path d="M ${x} ${y+8} Q ${x} ${y} ${x+8} ${y} L ${x+w-8} ${y} Q ${x+w} ${y} ${x+w} ${y+8} L ${x+w} ${y+32} L ${x} ${y+32} Z" fill="url(#gHeaderBg)"/>
      <line x1="${x}" y1="${y+32}" x2="${x+w}" y2="${y+32}" stroke="#1f1f23" stroke-width="1"/>
      <g transform="translate(${x+12}, ${y+9})" color="#a1a1aa">
        <use href="#${iconId}"/>
      </g>
      <text x="${x+32}" y="${y+20}" fill="#f4f4f5" font-size="11" font-weight="700" letter-spacing="0.04em">${escapeXml(title)}</text>
      ${badgeText ? `
        <rect x="${x+w - (badgeText.length * 6.2 + 16)}" y="${y+7}" width="${badgeText.length * 6.2 + 12}" height="18" rx="3" fill="#18181c" stroke="#2a2a30" stroke-width="0.8"/>
        <text x="${x+w - (badgeText.length * 3.1 + 10)}" y="${y+19}" fill="#a1a1aa" font-size="9" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">${escapeXml(badgeText)}</text>
      ` : ''}
    `;
  }

  // --- 1. TOPIC 01: PROJECTION (SELECT & FROM) ---
  function renderProjectionSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: SOURCE TABLE -->
      <g opacity="${srcActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(18, 14, 314, 242, 'icon-db', 'FROM employees', '4 ROWS IN RAM', step === 1 ? '#ffffff' : '#222226', step === 1 ? '1.5' : '1')}
        
        <!-- Column Headers -->
        <rect x="18" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="18" y1="70" x2="332" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="30" y="62" fill="#52525b" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">ID</text>
        <text x="64" y="62" fill="#ffffff" font-size="9.5" font-weight="700">FIRST_NAME ★</text>
        <text x="160" y="62" fill="#52525b" font-size="9.5" font-weight="600">DEPT</text>
        <text x="246" y="62" fill="#ffffff" font-size="9.5" font-weight="700" font-family="ui-monospace, monospace">SALARY ★</text>

        <!-- Active Column Highlight Rails -->
        <rect x="60" y="70" width="88" height="136" fill="rgba(255,255,255,0.02)"/>
        <rect x="238" y="70" width="84" height="136" fill="rgba(255,255,255,0.02)"/>

        <!-- Row 1 -->
        <text x="30" y="92" fill="#52525b" font-size="10" font-family="ui-monospace, monospace">101</text>
        <text x="64" y="92" fill="#ffffff" font-size="10.5" font-weight="600">Ashley</text>
        <text x="160" y="92" fill="#71717a" font-size="10">Analytics</text>
        <text x="246" y="92" fill="#ffffff" font-size="10.5" font-weight="600" font-family="ui-monospace, monospace">$115,000</text>
        <line x1="18" y1="104" x2="332" y2="104" stroke="#17171a" stroke-width="1"/>

        <!-- Row 2 -->
        <rect x="18" y="104" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="126" fill="#52525b" font-size="10" font-family="ui-monospace, monospace">102</text>
        <text x="64" y="126" fill="#ffffff" font-size="10.5" font-weight="600">David</text>
        <text x="160" y="126" fill="#71717a" font-size="10">Engineering</text>
        <text x="246" y="126" fill="#ffffff" font-size="10.5" font-weight="600" font-family="ui-monospace, monospace">$125,000</text>
        <line x1="18" y1="138" x2="332" y2="138" stroke="#17171a" stroke-width="1"/>

        <!-- Row 3 -->
        <text x="30" y="160" fill="#52525b" font-size="10" font-family="ui-monospace, monospace">103</text>
        <text x="64" y="160" fill="#ffffff" font-size="10.5" font-weight="600">Julia</text>
        <text x="160" y="160" fill="#71717a" font-size="10">Analytics</text>
        <text x="246" y="160" fill="#ffffff" font-size="10.5" font-weight="600" font-family="ui-monospace, monospace">$95,000</text>
        <line x1="18" y1="172" x2="332" y2="172" stroke="#17171a" stroke-width="1"/>

        <!-- Row 4 -->
        <rect x="18" y="172" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="194" fill="#52525b" font-size="10" font-family="ui-monospace, monospace">104</text>
        <text x="64" y="194" fill="#ffffff" font-size="10.5" font-weight="600">Carlos</text>
        <text x="160" y="194" fill="#71717a" font-size="10">Engineering</text>
        <text x="246" y="194" fill="#ffffff" font-size="10.5" font-weight="600" font-family="ui-monospace, monospace">$72,000</text>

        <!-- Footer Metric -->
        <line x1="18" y1="206" x2="332" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="18" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="30" y="228" fill="#a1a1aa" font-size="10" font-weight="500">Unselected columns [id, dept] pruned in memory</text>
        <text x="30" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">STORAGE: 4 TUPLES SCAN • ZERO COPIES</text>
      </g>

      <!-- CENTER: TRANSFORMATION KERNEL -->
      <g opacity="${opActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(350, 14, 300, 242, 'icon-cpu', 'PROJECTION KERNEL', 'MATH IN-FLIGHT', step === 2 ? '#ffffff' : '#222226', step === 2 ? '1.5' : '1')}
        
        <!-- SQL Expression Pill -->
        <g transform="translate(362, 48)">
          <rect x="0" y="0" width="276" height="26" rx="4" fill="url(#gChipBg)" stroke="#2b2b32" stroke-width="1"/>
          <text x="138" y="17" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" font-family="ui-monospace, monospace">SELECT first_name, salary * 1.10</text>
        </g>

        <!-- Bus Lines Connecting Left to Center -->
        <path d="M 332 92 L 350 92" stroke="#383840" stroke-width="1.2" marker-end="url(#arrowMuted)"/>
        <path d="M 332 126 L 350 126" stroke="#383840" stroke-width="1.2" marker-end="url(#arrowMuted)"/>
        <path d="M 332 160 L 350 160" stroke="#383840" stroke-width="1.2" marker-end="url(#arrowMuted)"/>
        <path d="M 332 194 L 350 194" stroke="#383840" stroke-width="1.2" marker-end="url(#arrowMuted)"/>

        <!-- Core Arithmetic Box -->
        <g transform="translate(362, 84)">
          <rect x="0" y="0" width="276" height="114" rx="6" fill="#09090c" stroke="#222226" stroke-width="1"/>
          
          <text x="14" y="22" fill="#e4e4e7" font-size="10.5" font-weight="600">Arithmetic Expression Evaluator</text>
          <text x="14" y="38" fill="#71717a" font-size="9.5">Calculated per tuple in processor registers:</text>
          
          <rect x="14" y="48" width="248" height="28" rx="4" fill="#131317" stroke="#27272e" stroke-width="0.8"/>
          <text x="24" y="66" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">salary * 1.10 AS projected_comp</text>

          <text x="14" y="94" fill="#a1a1aa" font-size="9.5">RAM Materialization: </text>
          <text x="114" y="94" fill="#ffffff" font-size="9.5" font-weight="600">0 Disk I/O Writes</text>
          <text x="14" y="108" fill="#52525b" font-size="8.5">Original source table rows on disk remain immutable</text>
        </g>

        <!-- Bus Lines Connecting Center to Right -->
        <path d="M 650 92 L 668 92" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arrowWhite)"/>
        <path d="M 650 126 L 668 126" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arrowWhite)"/>
        <path d="M 650 160 L 668 160" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arrowWhite)"/>
        <path d="M 650 194 L 668 194" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arrowWhite)"/>

        <!-- Footer Status -->
        <line x1="350" y1="206" x2="650" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="350" y="206" width="300" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="362" y="228" fill="#a1a1aa" font-size="10" font-weight="500">Pipeline latency: O(N) linear tuple scan</text>
        <text x="362" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">EXECUTION: STREAMING TUPLE PIPELINE</text>
      </g>

      <!-- RIGHT: EMITTED RESULT -->
      <g opacity="${resActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(668, 14, 314, 242, 'icon-table', 'PROJECTED RESULT SET', '2 COLS EMITTED', step === 3 ? '#ffffff' : '#222226', step === 3 ? '1.5' : '1')}
        
        <!-- Column Headers -->
        <rect x="668" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="668" y1="70" x2="982" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="682" y="62" fill="#ffffff" font-size="9.5" font-weight="700">FIRST_NAME</text>
        <text x="814" y="62" fill="#ffffff" font-size="9.5" font-weight="700" font-family="ui-monospace, monospace">PROJECTED_COMP (+10%)</text>

        <!-- Row 1 -->
        <text x="682" y="92" fill="#ffffff" font-size="10.5" font-weight="600">Ashley</text>
        <text x="814" y="92" fill="#ffffff" font-size="10.5" font-weight="700" font-family="ui-monospace, monospace">$126,500.00</text>
        <line x1="668" y1="104" x2="982" y2="104" stroke="#17171a" stroke-width="1"/>

        <!-- Row 2 -->
        <rect x="668" y="104" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="682" y="126" fill="#ffffff" font-size="10.5" font-weight="600">David</text>
        <text x="814" y="126" fill="#ffffff" font-size="10.5" font-weight="700" font-family="ui-monospace, monospace">$137,500.00</text>
        <line x1="668" y1="138" x2="982" y2="138" stroke="#17171a" stroke-width="1"/>

        <!-- Row 3 -->
        <text x="682" y="160" fill="#ffffff" font-size="10.5" font-weight="600">Julia</text>
        <text x="814" y="160" fill="#ffffff" font-size="10.5" font-weight="700" font-family="ui-monospace, monospace">$104,500.00</text>
        <line x1="668" y1="172" x2="982" y2="172" stroke="#17171a" stroke-width="1"/>

        <!-- Row 4 -->
        <rect x="668" y="172" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="682" y="194" fill="#ffffff" font-size="10.5" font-weight="600">Carlos</text>
        <text x="814" y="194" fill="#ffffff" font-size="10.5" font-weight="700" font-family="ui-monospace, monospace">$79,200.00</text>

        <!-- Footer -->
        <line x1="668" y1="206" x2="982" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="668" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="682" y="228" fill="#ffffff" font-size="10" font-weight="600">4 tuples emitted • Clean 2-column projected schema</text>
        <text x="682" y="244" fill="#71717a" font-size="9" font-family="ui-monospace, monospace">READY FOR APPLICATION CLIENT CONSUMPTION</text>
      </g>
    `;
  }

  // --- 2. TOPIC 02: PREDICATE SIEVE (WHERE & 3VL) ---
  function renderFilterSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: CANDIDATE TUPLES -->
      <g opacity="${srcActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(18, 14, 314, 242, 'icon-db', 'CANDIDATE ROWS', '4 INGESTED', step === 1 ? '#ffffff' : '#222226', step === 1 ? '1.5' : '1')}
        
        <rect x="18" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="18" y1="70" x2="332" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="30" y="62" fill="#71717a" font-size="9.5" font-weight="600">NAME</text>
        <text x="130" y="62" fill="#71717a" font-size="9.5" font-weight="600">DEPARTMENT</text>
        <text x="240" y="62" fill="#71717a" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">SALARY</text>

        <!-- Row 1 -->
        <text x="30" y="92" fill="#ffffff" font-size="10.5" font-weight="600">David</text>
        <text x="130" y="92" fill="#d4d4d8" font-size="10">Engineering</text>
        <text x="240" y="92" fill="#ffffff" font-size="10.5" font-weight="600" font-family="ui-monospace, monospace">$125,000</text>
        <line x1="18" y1="104" x2="332" y2="104" stroke="#17171a" stroke-width="1"/>

        <!-- Row 2 -->
        <rect x="18" y="104" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="126" fill="#a1a1aa" font-size="10.5">Ashley</text>
        <text x="130" y="126" fill="#71717a" font-size="10">Analytics</text>
        <text x="240" y="126" fill="#a1a1aa" font-size="10.5" font-family="ui-monospace, monospace">$115,000</text>
        <line x1="18" y1="138" x2="332" y2="138" stroke="#17171a" stroke-width="1"/>

        <!-- Row 3 -->
        <text x="30" y="160" fill="#a1a1aa" font-size="10.5">Carlos</text>
        <text x="130" y="160" fill="#71717a" font-size="10">Engineering</text>
        <text x="240" y="160" fill="#a1a1aa" font-size="10.5" font-family="ui-monospace, monospace">$72,000</text>
        <line x1="18" y1="172" x2="332" y2="172" stroke="#17171a" stroke-width="1"/>

        <!-- Row 4 -->
        <rect x="18" y="172" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="194" fill="#71717a" font-size="10.5">Sara</text>
        <text x="130" y="194" fill="#71717a" font-size="10">Engineering</text>
        <text x="240" y="194" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">NULL (Unknown)</text>

        <!-- Footer -->
        <line x1="18" y1="206" x2="332" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="18" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="30" y="228" fill="#a1a1aa" font-size="10">Raw input stream before predicate evaluation</text>
        <text x="30" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">PRE-FILTER: 4 TUPLES SCAN</text>
      </g>

      <!-- CENTER: PREDICATE SIEVE -->
      <g opacity="${opActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(350, 14, 300, 242, 'icon-filter', 'PREDICATE SIEVE (WHERE)', '3VL LOGIC', step === 2 ? '#ffffff' : '#222226', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(362, 48)">
          <rect x="0" y="0" width="276" height="26" rx="4" fill="url(#gChipBg)" stroke="#2b2b32" stroke-width="1"/>
          <text x="138" y="17" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" font-family="ui-monospace, monospace">WHERE salary >= 100k AND dept = 'Eng'</text>
        </g>

        <!-- Evaluation Gates -->
        <g transform="translate(362, 82)">
          <!-- Row 1: David -->
          <rect x="0" y="0" width="276" height="26" rx="4" fill="#09090c" stroke="#333338" stroke-width="0.8"/>
          <text x="12" y="17" fill="#ffffff" font-size="10" font-weight="600">David: Eng + $125k >= 100k</text>
          <rect x="210" y="4" width="56" height="18" rx="3" fill="#ffffff"/>
          <text x="238" y="16" fill="#000000" font-size="9" font-weight="800" text-anchor="middle">TRUE ✓</text>

          <!-- Row 2: Ashley -->
          <rect x="0" y="30" width="276" height="26" rx="4" fill="#09090c" stroke="#1f1f23" stroke-width="0.8"/>
          <text x="12" y="47" fill="#71717a" font-size="10">Ashley: Analytics ≠ Eng</text>
          <rect x="210" y="34" width="56" height="18" rx="3" fill="#18181c" stroke="#27272a" stroke-width="0.8"/>
          <text x="238" y="46" fill="#71717a" font-size="9" font-weight="700" text-anchor="middle">FALSE ✕</text>

          <!-- Row 3: Carlos -->
          <rect x="0" y="60" width="276" height="26" rx="4" fill="#09090c" stroke="#1f1f23" stroke-width="0.8"/>
          <text x="12" y="77" fill="#71717a" font-size="10">Carlos: $72k &lt; 100k</text>
          <rect x="210" y="64" width="56" height="18" rx="3" fill="#18181c" stroke="#27272a" stroke-width="0.8"/>
          <text x="238" y="76" fill="#71717a" font-size="9" font-weight="700" text-anchor="middle">FALSE ✕</text>

          <!-- Row 4: Sara -->
          <rect x="0" y="90" width="276" height="26" rx="4" fill="#09090c" stroke="#1f1f23" stroke-width="0.8"/>
          <text x="12" y="107" fill="#52525b" font-size="10">Sara: NULL >= 100k</text>
          <rect x="194" y="94" width="72" height="18" rx="3" fill="#18181c" stroke="#3f3f46" stroke-width="0.8"/>
          <text x="230" y="106" fill="#d4d4d8" font-size="8.5" font-weight="700" text-anchor="middle">UNKNOWN ⚠</text>
        </g>

        <!-- Footer -->
        <line x1="350" y1="206" x2="650" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="350" y="206" width="300" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="362" y="228" fill="#ffffff" font-size="10" font-weight="600">Three-Valued Logic Rule: WHERE keeps ONLY TRUE</text>
        <text x="362" y="244" fill="#71717a" font-size="9">FALSE and UNKNOWN are dropped immediately.</text>
      </g>

      <!-- RIGHT: FILTERED SURVIVORS -->
      <g opacity="${resActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(668, 14, 314, 242, 'icon-table', 'FILTERED SURVIVORS', '1 MATCH', step === 3 ? '#ffffff' : '#222226', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="668" y1="70" x2="982" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="682" y="62" fill="#ffffff" font-size="9.5" font-weight="700">SURVIVING TUPLE</text>
        <text x="860" y="62" fill="#a1a1aa" font-size="9.5" font-weight="600">STATUS</text>

        <!-- Survivor Card -->
        <g transform="translate(682, 82)">
          <rect x="0" y="0" width="286" height="42" rx="4" fill="#0e0e12" stroke="#ffffff" stroke-width="1"/>
          <text x="14" y="20" fill="#ffffff" font-size="11" font-weight="700">David — Engineering</text>
          <text x="14" y="34" fill="#a1a1aa" font-size="9.5" font-family="ui-monospace, monospace">Salary: $125,000.00 • Qualified</text>
          <rect x="220" y="10" width="54" height="22" rx="3" fill="#ffffff"/>
          <text x="247" y="24" fill="#000000" font-size="9" font-weight="800" text-anchor="middle">PASS ✓</text>
        </g>

        <!-- Pruned Bin -->
        <g transform="translate(682, 134)">
          <rect x="0" y="0" width="286" height="64" rx="4" fill="#09090c" stroke="#1f1f23" stroke-width="1"/>
          <text x="14" y="18" fill="#71717a" font-size="9.5" font-weight="600">PRUNED BY PREDICATE (3 TUPLES):</text>
          <text x="14" y="34" fill="#52525b" font-size="9">• Ashley: dept mismatch (Analytics)</text>
          <text x="14" y="46" fill="#52525b" font-size="9">• Carlos: salary below threshold ($72k &lt; $100k)</text>
          <text x="14" y="58" fill="#52525b" font-size="9">• Sara: NULL comparison yields UNKNOWN</text>
        </g>

        <!-- Footer -->
        <line x1="668" y1="206" x2="982" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="668" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="682" y="228" fill="#ffffff" font-size="10" font-weight="600">Sargable Index Seek: 1 matching row emitted</text>
        <text x="682" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">75% REDUCTION IN DOWNSTREAM WORKLOAD</text>
      </g>
    `;
  }

  // --- 3. TOPIC 03: SORTING & LIMITING (ORDER BY & LIMIT) ---
  function renderSortLimitSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: UNORDERED STREAM -->
      <g opacity="${srcActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(18, 14, 314, 242, 'icon-db', 'UNORDERED DISK HEAP', '5 TUPLES', step === 1 ? '#ffffff' : '#222226', step === 1 ? '1.5' : '1')}
        
        <rect x="18" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="18" y1="70" x2="332" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="30" y="62" fill="#71717a" font-size="9.5" font-weight="600">UNSORTED RECORD</text>
        <text x="240" y="62" fill="#71717a" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">SALARY</text>

        <text x="30" y="92" fill="#ffffff" font-size="10">Ashley</text>
        <text x="240" y="92" fill="#ffffff" font-size="10.5" font-family="ui-monospace, monospace">$115,000</text>
        <line x1="18" y1="104" x2="332" y2="104" stroke="#17171a" stroke-width="1"/>

        <rect x="18" y="104" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="126" fill="#ffffff" font-size="10">David</text>
        <text x="240" y="126" fill="#ffffff" font-size="10.5" font-family="ui-monospace, monospace">$125,000</text>
        <line x1="18" y1="138" x2="332" y2="138" stroke="#17171a" stroke-width="1"/>

        <text x="30" y="160" fill="#a1a1aa" font-size="10">Julia</text>
        <text x="240" y="160" fill="#a1a1aa" font-size="10.5" font-family="ui-monospace, monospace">$95,000</text>
        <line x1="18" y1="172" x2="332" y2="172" stroke="#17171a" stroke-width="1"/>

        <rect x="18" y="172" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="194" fill="#ffffff" font-size="10">Elena</text>
        <text x="240" y="194" fill="#ffffff" font-size="10.5" font-family="ui-monospace, monospace">$105,000</text>

        <!-- Footer -->
        <line x1="18" y1="206" x2="332" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="18" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="30" y="228" fill="#a1a1aa" font-size="10">Relational theory: Tables are unordered bags</text>
        <text x="30" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">PHYSICAL ORDER: ARBITRARY DISK PAGES</text>
      </g>

      <!-- CENTER: SORT LADDER & BOUNDARY -->
      <g opacity="${opActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(350, 14, 300, 242, 'icon-sort', 'SORT & SLICE ENGINE', 'HEAP SORT', step === 2 ? '#ffffff' : '#222226', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(362, 48)">
          <rect x="0" y="0" width="276" height="26" rx="4" fill="url(#gChipBg)" stroke="#2b2b32" stroke-width="1"/>
          <text x="138" y="17" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" font-family="ui-monospace, monospace">ORDER BY salary DESC LIMIT 3</text>
        </g>

        <!-- Sorted comparator ladder -->
        <g transform="translate(362, 82)">
          <rect x="0" y="0" width="210" height="22" rx="3" fill="#141418" stroke="#ffffff" stroke-width="0.8"/>
          <text x="10" y="15" fill="#ffffff" font-size="9.5" font-weight="700">1. David: $125,000</text>

          <rect x="0" y="26" width="210" height="22" rx="3" fill="#141418" stroke="#ffffff" stroke-width="0.8"/>
          <text x="10" y="41" fill="#ffffff" font-size="9.5" font-weight="700">2. Ashley: $115,000</text>

          <rect x="0" y="52" width="210" height="22" rx="3" fill="#141418" stroke="#ffffff" stroke-width="0.8"/>
          <text x="10" y="67" fill="#ffffff" font-size="9.5" font-weight="700">3. Elena: $105,000</text>

          <!-- Limit Bracket -->
          <path d="M 218 2 L 228 2 L 228 37 L 236 37 L 228 37 L 228 72 L 218 72" stroke="#ffffff" stroke-width="1.5" fill="none"/>
          <text x="244" y="41" fill="#ffffff" font-size="9.5" font-weight="800">LIMIT 3</text>

          <!-- Cutoff line -->
          <line x1="0" y1="80" x2="276" y2="80" stroke="#52525b" stroke-width="1" stroke-dasharray="4,3"/>
          <text x="138" y="93" fill="#71717a" font-size="8.5" text-anchor="middle" font-weight="600">✂ LIMIT 3 SLICING BOUNDARY (DISCARD BELOW)</text>

          <text x="10" y="108" fill="#52525b" font-size="9">4. Julia ($95k) &amp; 5. Carlos ($72k) pruned</text>
        </g>

        <!-- Footer -->
        <line x1="350" y1="206" x2="650" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="350" y="206" width="300" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="362" y="228" fill="#ffffff" font-size="10" font-weight="600">Top-N Heap Sort: O(N log K) efficiency</text>
        <text x="362" y="244" fill="#71717a" font-size="9">Only maintains 3 tuples in working memory.</text>
      </g>

      <!-- RIGHT: EMITTED TOP-3 RESULT -->
      <g opacity="${resActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(668, 14, 314, 242, 'icon-table', 'TOP-3 EARNERS SLICE', 'DETERMINISTIC', step === 3 ? '#ffffff' : '#222226', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="668" y1="70" x2="982" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="682" y="62" fill="#71717a" font-size="9.5" font-weight="600">RANK</text>
        <text x="730" y="62" fill="#ffffff" font-size="9.5" font-weight="700">EMPLOYEE</text>
        <text x="860" y="62" fill="#ffffff" font-size="9.5" font-weight="700" font-family="ui-monospace, monospace">COMPENSATION</text>

        <!-- Rank 1 -->
        <g transform="translate(682, 78)">
          <rect x="0" y="0" width="286" height="34" rx="4" fill="#0e0e12" stroke="#383840" stroke-width="0.8"/>
          <rect x="8" y="7" width="28" height="20" rx="3" fill="#ffffff"/>
          <text x="22" y="21" fill="#000000" font-size="10" font-weight="800" text-anchor="middle">#1</text>
          <text x="48" y="21" fill="#ffffff" font-size="11" font-weight="700">David</text>
          <text x="180" y="21" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">$125,000.00</text>
        </g>

        <!-- Rank 2 -->
        <g transform="translate(682, 118)">
          <rect x="0" y="0" width="286" height="34" rx="4" fill="#0e0e12" stroke="#383840" stroke-width="0.8"/>
          <rect x="8" y="7" width="28" height="20" rx="3" fill="#27272a"/>
          <text x="22" y="21" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">#2</text>
          <text x="48" y="21" fill="#ffffff" font-size="11" font-weight="700">Ashley</text>
          <text x="180" y="21" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">$115,000.00</text>
        </g>

        <!-- Rank 3 -->
        <g transform="translate(682, 158)">
          <rect x="0" y="0" width="286" height="34" rx="4" fill="#0e0e12" stroke="#383840" stroke-width="0.8"/>
          <rect x="8" y="7" width="28" height="20" rx="3" fill="#27272a"/>
          <text x="22" y="21" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">#3</text>
          <text x="48" y="21" fill="#ffffff" font-size="11" font-weight="700">Elena</text>
          <text x="180" y="21" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">$105,000.00</text>
        </g>

        <!-- Footer -->
        <line x1="668" y1="206" x2="982" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="668" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="682" y="228" fill="#ffffff" font-size="10" font-weight="600">Deterministic sort safety: Add unique tiebreaker</text>
        <text x="682" y="244" fill="#71717a" font-size="9">Guarantees stable pagination without tuple shifting.</text>
      </g>
    `;
  }

  // --- 4. TOPIC 04: AGGREGATES (SUM, AVG, COUNT, MIN, MAX) ---
  function renderAggregateSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: MULTI-ROW STREAM -->
      <g opacity="${srcActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(18, 14, 314, 242, 'icon-db', 'INPUT TUPLE STREAM', '5 TUPLES', step === 1 ? '#ffffff' : '#222226', step === 1 ? '1.5' : '1')}
        
        <rect x="18" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="18" y1="70" x2="332" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="30" y="62" fill="#71717a" font-size="9.5" font-weight="600">NAME</text>
        <text x="240" y="62" fill="#71717a" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">SALARY</text>

        <text x="30" y="92" fill="#ffffff" font-size="10">Ashley</text>
        <text x="240" y="92" fill="#ffffff" font-size="10.5" font-family="ui-monospace, monospace">$115,000</text>
        <line x1="18" y1="104" x2="332" y2="104" stroke="#17171a" stroke-width="1"/>

        <rect x="18" y="104" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="126" fill="#ffffff" font-size="10">David</text>
        <text x="240" y="126" fill="#ffffff" font-size="10.5" font-family="ui-monospace, monospace">$125,000</text>
        <line x1="18" y1="138" x2="332" y2="138" stroke="#17171a" stroke-width="1"/>

        <text x="30" y="160" fill="#ffffff" font-size="10">Julia</text>
        <text x="240" y="160" fill="#ffffff" font-size="10.5" font-family="ui-monospace, monospace">$95,000</text>
        <line x1="18" y1="172" x2="332" y2="172" stroke="#17171a" stroke-width="1"/>

        <rect x="18" y="172" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="194" fill="#ffffff" font-size="10">Carlos ($72k) + Elena ($137k)</text>
        <text x="240" y="194" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">+2 MORE</text>

        <!-- Footer -->
        <line x1="18" y1="206" x2="332" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="18" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="30" y="228" fill="#a1a1aa" font-size="10">N tuples enter streaming reduction funnel</text>
        <text x="30" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">STREAM: SEQUENTIAL TUPLE ITERATION</text>
      </g>

      <!-- CENTER: FUNNEL ACCUMULATOR -->
      <g opacity="${opActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(350, 14, 300, 242, 'icon-sigma', 'STREAM ACCUMULATOR', 'O(1) MEMORY', step === 2 ? '#ffffff' : '#222226', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(362, 48)">
          <rect x="0" y="0" width="276" height="26" rx="4" fill="url(#gChipBg)" stroke="#2b2b32" stroke-width="1"/>
          <text x="138" y="17" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" font-family="ui-monospace, monospace">SELECT COUNT(*), SUM(sal), AVG(sal)</text>
        </g>

        <!-- Accumulator Registers -->
        <g transform="translate(362, 82)">
          <rect x="0" y="0" width="276" height="114" rx="6" fill="#09090c" stroke="#222226" stroke-width="1"/>
          
          <text x="14" y="22" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">COUNT(*) += 1</text>
          <text x="210" y="22" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">→ 5</text>
          <line x1="14" y1="30" x2="262" y2="30" stroke="#17171a" stroke-width="0.8"/>

          <text x="14" y="48" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">SUM(salary) += row</text>
          <text x="180" y="48" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">→ $544,000</text>
          <line x1="14" y1="56" x2="262" y2="56" stroke="#17171a" stroke-width="0.8"/>

          <text x="14" y="74" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">AVG = SUM / COUNT</text>
          <text x="180" y="74" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">→ $108,800</text>
          <line x1="14" y1="82" x2="262" y2="82" stroke="#17171a" stroke-width="0.8"/>

          <text x="14" y="100" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">MAX(salary)</text>
          <text x="180" y="100" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">→ $137,000</text>
        </g>

        <!-- Footer -->
        <line x1="350" y1="206" x2="650" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="350" y="206" width="300" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="362" y="228" fill="#ffffff" font-size="10" font-weight="600">O(1) memory register consumption</text>
        <text x="362" y="244" fill="#71717a" font-size="9">Does not retain individual rows in memory.</text>
      </g>

      <!-- RIGHT: SINGLE COLLAPSED SCALAR ROW -->
      <g opacity="${resActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(668, 14, 314, 242, 'icon-table', 'SCALAR SUMMARY', '1 ROW RESULT', step === 3 ? '#ffffff' : '#222226', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="668" y1="70" x2="982" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="682" y="62" fill="#71717a" font-size="9.5" font-weight="600">AGGREGATE METRIC</text>
        <text x="880" y="62" fill="#ffffff" font-size="9.5" font-weight="700" font-family="ui-monospace, monospace">SCALAR VALUE</text>

        <g transform="translate(682, 78)">
          <rect x="0" y="0" width="286" height="28" rx="4" fill="#0e0e12" stroke="#2b2b32" stroke-width="0.8"/>
          <text x="12" y="18" fill="#a1a1aa" font-size="10.5">Headcount (COUNT):</text>
          <text x="250" y="18" fill="#ffffff" font-size="12" font-weight="800" font-family="ui-monospace, monospace" text-anchor="end">5</text>

          <rect x="0" y="32" width="286" height="28" rx="4" fill="#0e0e12" stroke="#2b2b32" stroke-width="0.8"/>
          <text x="12" y="50" fill="#a1a1aa" font-size="10.5">Total Payroll (SUM):</text>
          <text x="250" y="50" fill="#ffffff" font-size="11.5" font-weight="800" font-family="ui-monospace, monospace" text-anchor="end">$544,000.00</text>

          <rect x="0" y="64" width="286" height="28" rx="4" fill="#0e0e12" stroke="#2b2b32" stroke-width="0.8"/>
          <text x="12" y="82" fill="#a1a1aa" font-size="10.5">Average Salary (AVG):</text>
          <text x="250" y="82" fill="#ffffff" font-size="11.5" font-weight="800" font-family="ui-monospace, monospace" text-anchor="end">$108,800.00</text>

          <rect x="0" y="96" width="286" height="28" rx="4" fill="#0e0e12" stroke="#2b2b32" stroke-width="0.8"/>
          <text x="12" y="114" fill="#a1a1aa" font-size="10.5">Top Earner (MAX):</text>
          <text x="250" y="114" fill="#ffffff" font-size="11.5" font-weight="800" font-family="ui-monospace, monospace" text-anchor="end">$137,000.00</text>
        </g>

        <!-- Footer -->
        <line x1="668" y1="206" x2="982" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="668" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="682" y="228" fill="#ffffff" font-size="10" font-weight="600">Full table reduction to 1 scalar summary row</text>
        <text x="682" y="244" fill="#71717a" font-size="9">Row granularity collapsed into business metrics.</text>
      </g>
    `;
  }

  // --- 5. TOPIC 05: GROUP BY & HAVING ---
  function renderGroupBySvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: MIXED INPUT TUPLES -->
      <g opacity="${srcActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(18, 14, 314, 242, 'icon-db', 'RAW TUPLE STREAM', '5 MIXED', step === 1 ? '#ffffff' : '#222226', step === 1 ? '1.5' : '1')}
        
        <rect x="18" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="18" y1="70" x2="332" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="30" y="62" fill="#71717a" font-size="9.5" font-weight="600">EMPLOYEE</text>
        <text x="220" y="62" fill="#71717a" font-size="9.5" font-weight="600">BUCKET KEY</text>

        <text x="30" y="92" fill="#ffffff" font-size="10">David</text>
        <text x="220" y="92" fill="#ffffff" font-size="10" font-weight="600">Engineering</text>
        <line x1="18" y1="104" x2="332" y2="104" stroke="#17171a" stroke-width="1"/>

        <rect x="18" y="104" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="126" fill="#a1a1aa" font-size="10">Ashley</text>
        <text x="220" y="126" fill="#a1a1aa" font-size="10">Analytics</text>
        <line x1="18" y1="138" x2="332" y2="138" stroke="#17171a" stroke-width="1"/>

        <text x="30" y="160" fill="#ffffff" font-size="10">Carlos</text>
        <text x="220" y="160" fill="#ffffff" font-size="10" font-weight="600">Engineering</text>
        <line x1="18" y1="172" x2="332" y2="172" stroke="#17171a" stroke-width="1"/>

        <rect x="18" y="172" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="194" fill="#ffffff" font-size="10">Sara (Eng) + Julia (Anly)</text>
        <text x="220" y="194" fill="#52525b" font-size="9">+2 MORE</text>

        <!-- Footer -->
        <line x1="18" y1="206" x2="332" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="18" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="30" y="228" fill="#a1a1aa" font-size="10">Tuples partition into hash-table buckets</text>
        <text x="30" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">HASH BUCKET DISPATCHER</text>
      </g>

      <!-- CENTER: BUCKETING & HAVING GATE -->
      <g opacity="${opActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(350, 14, 300, 242, 'icon-group', 'BUCKETING & HAVING GATE', 'AGGREGATION', step === 2 ? '#ffffff' : '#222226', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(362, 48)">
          <rect x="0" y="0" width="276" height="26" rx="4" fill="url(#gChipBg)" stroke="#2b2b32" stroke-width="1"/>
          <text x="138" y="17" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" font-family="ui-monospace, monospace">GROUP BY dept HAVING COUNT(*) >= 3</text>
        </g>

        <!-- Bucket 1: Engineering -->
        <g transform="translate(362, 82)">
          <rect x="0" y="0" width="276" height="52" rx="4" fill="#0e0e12" stroke="#ffffff" stroke-width="1"/>
          <text x="12" y="18" fill="#ffffff" font-size="10.5" font-weight="700">Bucket: Engineering (3 Rows)</text>
          <text x="12" y="32" fill="#71717a" font-size="9">Contains: David, Carlos, Sara</text>
          <text x="12" y="45" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">COUNT(*) = 3</text>
          <rect x="210" y="14" width="56" height="22" rx="3" fill="#ffffff"/>
          <text x="238" y="28" fill="#000000" font-size="9" font-weight="800" text-anchor="middle">PASS ✓</text>
        </g>

        <!-- Bucket 2: Analytics -->
        <g transform="translate(362, 142)">
          <rect x="0" y="0" width="276" height="52" rx="4" fill="#09090c" stroke="#1f1f23" stroke-width="0.8"/>
          <text x="12" y="18" fill="#71717a" font-size="10.5" font-weight="600">Bucket: Analytics (2 Rows)</text>
          <text x="12" y="32" fill="#52525b" font-size="9">Contains: Ashley, Julia</text>
          <text x="12" y="45" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">COUNT(*) = 2 (Fails >= 3)</text>
          <rect x="210" y="14" width="56" height="22" rx="3" fill="#18181c" stroke="#27272a" stroke-width="0.8"/>
          <text x="238" y="28" fill="#71717a" font-size="9" font-weight="700" text-anchor="middle">DROP ✕</text>
        </g>

        <!-- Footer -->
        <line x1="350" y1="206" x2="650" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="350" y="206" width="300" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="362" y="228" fill="#ffffff" font-size="10" font-weight="600">HAVING filters groups AFTER bucketing</text>
        <text x="362" y="244" fill="#71717a" font-size="9">WHERE filters rows BEFORE grouping occurs.</text>
      </g>

      <!-- RIGHT: GROUP ROLLUP RESULT -->
      <g opacity="${resActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(668, 14, 314, 242, 'icon-table', 'FILTERED GROUP ROLLUP', '1 GROUP EMITTED', step === 3 ? '#ffffff' : '#222226', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="668" y1="70" x2="982" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="682" y="62" fill="#ffffff" font-size="9.5" font-weight="700">DEPARTMENT</text>
        <text x="790" y="62" fill="#71717a" font-size="9.5" font-weight="600">HEADCOUNT</text>
        <text x="880" y="62" fill="#ffffff" font-size="9.5" font-weight="700" font-family="ui-monospace, monospace">AVG_SALARY</text>

        <!-- Surviving Group Card -->
        <g transform="translate(682, 78)">
          <rect x="0" y="0" width="286" height="52" rx="4" fill="#0e0e12" stroke="#ffffff" stroke-width="1"/>
          <text x="14" y="22" fill="#ffffff" font-size="12" font-weight="700">Engineering</text>
          <text x="14" y="38" fill="#a1a1aa" font-size="10" font-family="ui-monospace, monospace">Headcount: 3 employees</text>
          <text x="180" y="28" fill="#ffffff" font-size="12" font-weight="800" font-family="ui-monospace, monospace">$90,666.67</text>
        </g>

        <!-- Pruned Bucket Log -->
        <g transform="translate(682, 140)">
          <rect x="0" y="0" width="286" height="56" rx="4" fill="#09090c" stroke="#1f1f23" stroke-width="1"/>
          <text x="14" y="18" fill="#71717a" font-size="9.5" font-weight="600">DISCARDED GROUPS (1):</text>
          <text x="14" y="34" fill="#52525b" font-size="9">• Analytics (Headcount = 2)</text>
          <text x="14" y="48" fill="#52525b" font-size="9">Failed HAVING predicate: COUNT(*) >= 3</text>
        </g>

        <!-- Footer -->
        <line x1="668" y1="206" x2="982" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="668" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="682" y="228" fill="#ffffff" font-size="10" font-weight="600">Single-Value Rule strictly enforced</text>
        <text x="682" y="244" fill="#71717a" font-size="9">Non-aggregated columns in SELECT must appear in GROUP BY.</text>
      </g>
    `;
  }

  // --- 6. TOPIC 06: JOINS (INNER & LEFT JOIN) ---
  function renderJoinSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: TWO TABLES (CUSTOMERS & ORDERS) -->
      <g opacity="${srcActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(18, 14, 314, 242, 'icon-join', 'RELATIONAL TABLES (PK / FK)', 'CUST + ORDERS', step === 1 ? '#ffffff' : '#222226', step === 1 ? '1.5' : '1')}
        
        <!-- Customers Table (Left Half) -->
        <g transform="translate(26, 46)">
          <rect x="0" y="0" width="140" height="20" fill="#0a0a0d"/>
          <text x="8" y="14" fill="#ffffff" font-size="9" font-weight="700">Customers (c)</text>
          
          <rect x="0" y="22" width="140" height="24" rx="3" fill="#121216" stroke="#222226" stroke-width="0.8"/>
          <text x="8" y="38" fill="#ffffff" font-size="9.5" font-family="ui-monospace, monospace">id: 1 • Alice</text>

          <rect x="0" y="50" width="140" height="24" rx="3" fill="#121216" stroke="#222226" stroke-width="0.8"/>
          <text x="8" y="66" fill="#ffffff" font-size="9.5" font-family="ui-monospace, monospace">id: 2 • Bob</text>

          <rect x="0" y="78" width="140" height="24" rx="3" fill="#121216" stroke="#222226" stroke-width="0.8"/>
          <text x="8" y="94" fill="#a1a1aa" font-size="9.5" font-family="ui-monospace, monospace">id: 3 • Charlie</text>

          <text x="8" y="120" fill="#52525b" font-size="8.5">Charlie has 0 orders</text>
        </g>

        <!-- Orders Table (Right Half) -->
        <g transform="translate(178, 46)">
          <rect x="0" y="0" width="146" height="20" fill="#0a0a0d"/>
          <text x="8" y="14" fill="#ffffff" font-size="9" font-weight="700">Orders (o)</text>
          
          <rect x="0" y="22" width="146" height="24" rx="3" fill="#121216" stroke="#222226" stroke-width="0.8"/>
          <text x="8" y="38" fill="#ffffff" font-size="9" font-family="ui-monospace, monospace">ord: 101 • c:1 ($150)</text>

          <rect x="0" y="50" width="146" height="24" rx="3" fill="#121216" stroke="#222226" stroke-width="0.8"/>
          <text x="8" y="66" fill="#ffffff" font-size="9" font-family="ui-monospace, monospace">ord: 102 • c:1 ($80)</text>

          <rect x="0" y="78" width="146" height="24" rx="3" fill="#121216" stroke="#222226" stroke-width="0.8"/>
          <text x="8" y="94" fill="#ffffff" font-size="9" font-family="ui-monospace, monospace">ord: 103 • c:2 ($220)</text>

          <text x="8" y="120" fill="#52525b" font-size="8.5">Foreign Key: cust_id</text>
        </g>

        <!-- Footer -->
        <line x1="18" y1="206" x2="332" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="18" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="30" y="228" fill="#a1a1aa" font-size="10">Normalized 3NF relational schema</text>
        <text x="30" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">PRIMARY KEY TO FOREIGN KEY INTEGRITY</text>
      </g>

      <!-- CENTER: RELATIONAL LINK ENGINE -->
      <g opacity="${opActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(350, 14, 300, 242, 'icon-cpu', 'JOIN COMPARATOR', 'ON c.id = o.cust_id', step === 2 ? '#ffffff' : '#222226', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(362, 48)">
          <rect x="0" y="0" width="276" height="26" rx="4" fill="url(#gChipBg)" stroke="#2b2b32" stroke-width="1"/>
          <text x="138" y="17" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" font-family="ui-monospace, monospace">FROM customers c LEFT JOIN orders o</text>
        </g>

        <!-- Join Modes Comparison -->
        <g transform="translate(362, 82)">
          <!-- INNER JOIN -->
          <rect x="0" y="0" width="276" height="52" rx="4" fill="#09090c" stroke="#222226" stroke-width="0.8"/>
          <text x="12" y="18" fill="#a1a1aa" font-size="10.5" font-weight="700">INNER JOIN (Strict Match)</text>
          <text x="12" y="32" fill="#71717a" font-size="9">Retains ONLY tuples where keys match:</text>
          <text x="12" y="44" fill="#ffffff" font-size="9" font-weight="600">• Alice (2 orders), Bob (1 order)</text>

          <!-- LEFT JOIN -->
          <rect x="0" y="58" width="276" height="56" rx="4" fill="#0e0e12" stroke="#ffffff" stroke-width="1"/>
          <text x="12" y="74" fill="#ffffff" font-size="10.5" font-weight="700">LEFT JOIN (Preserve Left)</text>
          <text x="12" y="88" fill="#a1a1aa" font-size="9">Preserves all Customers, even with 0 orders:</text>
          <text x="12" y="102" fill="#ffffff" font-size="9" font-weight="600">• Charlie preserved with NULL order columns</text>
        </g>

        <!-- Footer -->
        <line x1="350" y1="206" x2="650" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="350" y="206" width="300" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="362" y="228" fill="#ffffff" font-size="10" font-weight="600">Hash Join or Nested Loop execution</text>
        <text x="362" y="244" fill="#71717a" font-size="9">Anti-join: WHERE o.order_id IS NULL finds unmatched.</text>
      </g>

      <!-- RIGHT: JOINED RELATION OUTPUT -->
      <g opacity="${resActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(668, 14, 314, 242, 'icon-table', 'MATERIALIZED RELATION', '4 ROWS', step === 3 ? '#ffffff' : '#222226', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="668" y1="70" x2="982" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="682" y="62" fill="#71717a" font-size="9.5" font-weight="600">CUSTOMER</text>
        <text x="760" y="62" fill="#71717a" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">ORDER_ID</text>
        <text x="860" y="62" fill="#ffffff" font-size="9.5" font-weight="700" font-family="ui-monospace, monospace">AMOUNT</text>

        <!-- Row 1 -->
        <text x="682" y="92" fill="#ffffff" font-size="10" font-weight="600">Alice</text>
        <text x="760" y="92" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">101</text>
        <text x="860" y="92" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">$150.00</text>
        <line x1="668" y1="104" x2="982" y2="104" stroke="#17171a" stroke-width="1"/>

        <!-- Row 2 -->
        <rect x="668" y="104" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="682" y="126" fill="#ffffff" font-size="10" font-weight="600">Alice</text>
        <text x="760" y="126" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">102</text>
        <text x="860" y="126" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">$80.00</text>
        <line x1="668" y1="138" x2="982" y2="138" stroke="#17171a" stroke-width="1"/>

        <!-- Row 3 -->
        <text x="682" y="160" fill="#ffffff" font-size="10" font-weight="600">Bob</text>
        <text x="760" y="160" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">103</text>
        <text x="860" y="160" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">$220.00</text>
        <line x1="668" y1="172" x2="982" y2="172" stroke="#17171a" stroke-width="1"/>

        <!-- Row 4 (Charlie with NULL) -->
        <rect x="668" y="172" width="314" height="34" fill="rgba(255,255,255,0.03)"/>
        <text x="682" y="194" fill="#d4d4d8" font-size="10" font-weight="600">Charlie</text>
        <text x="760" y="194" fill="#71717a" font-size="9" font-family="ui-monospace, monospace">NULL</text>
        <text x="860" y="194" fill="#71717a" font-size="9" font-family="ui-monospace, monospace">NULL (Preserved)</text>

        <!-- Footer -->
        <line x1="668" y1="206" x2="982" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="668" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="682" y="228" fill="#ffffff" font-size="10" font-weight="600">Charlie preserved via LEFT JOIN</text>
        <text x="682" y="244" fill="#71717a" font-size="9">INNER JOIN would have silently dropped customer 3.</text>
      </g>
    `;
  }

  // --- 7. TOPIC 07: ADVANCED JOINS & SETS (UNION & FULL JOIN) ---
  function renderAdvJoinSetSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: SET THEORY VENN DIAGRAM -->
      <g opacity="${srcActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(18, 14, 314, 242, 'icon-join', 'RELATIONAL SET THEORY', 'SET A & B', step === 1 ? '#ffffff' : '#222226', step === 1 ? '1.5' : '1')}
        
        <!-- Venn Geometry -->
        <g transform="translate(18, 46)">
          <!-- Circle A: Employees -->
          <circle cx="100" cy="74" r="54" fill="#121216" stroke="#52525b" stroke-width="1.2"/>
          <text x="68" y="58" fill="#ffffff" font-size="10" font-weight="800">SET A</text>
          <text x="68" y="72" fill="#a1a1aa" font-size="8.5">Employees (4)</text>
          <text x="68" y="86" fill="#71717a" font-size="8">Alice, Bob,</text>
          <text x="68" y="98" fill="#71717a" font-size="8">Charlie</text>

          <!-- Circle B: Contractors -->
          <circle cx="196" cy="74" r="54" fill="#121216" stroke="#52525b" stroke-width="1.2"/>
          <text x="210" y="58" fill="#ffffff" font-size="10" font-weight="800">SET B</text>
          <text x="210" y="72" fill="#a1a1aa" font-size="8.5">Contractors (4)</text>
          <text x="210" y="86" fill="#71717a" font-size="8">Elena, Frank,</text>
          <text x="210" y="98" fill="#71717a" font-size="8">Grace</text>

          <!-- Intersecting Overlap -->
          <text x="148" y="70" fill="#ffffff" font-size="9" font-weight="800" text-anchor="middle">OVERLAP</text>
          <text x="148" y="84" fill="#ffffff" font-size="8.5" font-weight="700" font-family="ui-monospace, monospace" text-anchor="middle">[David]</text>
        </g>

        <!-- Footer -->
        <line x1="18" y1="206" x2="332" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="18" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="30" y="228" fill="#a1a1aa" font-size="10">Set A: 4 tuples • Set B: 4 tuples</text>
        <text x="30" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">1 SHARED KEY INTERSECTION</text>
      </g>

      <!-- CENTER: SET OPERATOR DISPATCHER -->
      <g opacity="${opActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(350, 14, 300, 242, 'icon-cpu', 'SET OPERATOR ENGINE', 'ALGEBRA', step === 2 ? '#ffffff' : '#222226', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(362, 48)">
          <rect x="0" y="0" width="276" height="26" rx="4" fill="url(#gChipBg)" stroke="#2b2b32" stroke-width="1"/>
          <text x="138" y="17" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" font-family="ui-monospace, monospace">SELECT * FROM A UNION SELECT * FROM B</text>
        </g>

        <g transform="translate(362, 82)">
          <!-- UNION (Deduplicated) -->
          <rect x="0" y="0" width="276" height="52" rx="4" fill="#0e0e12" stroke="#ffffff" stroke-width="1"/>
          <text x="12" y="18" fill="#ffffff" font-size="10.5" font-weight="700">UNION (Deduplicated Stream)</text>
          <text x="12" y="32" fill="#a1a1aa" font-size="9">Performs in-memory sorting / hashing to deduplicate:</text>
          <text x="12" y="44" fill="#ffffff" font-size="9" font-weight="600">David appears once → 7 total emitted tuples</text>

          <!-- UNION ALL (Fast Append) -->
          <rect x="0" y="58" width="276" height="56" rx="4" fill="#09090c" stroke="#222226" stroke-width="0.8"/>
          <text x="12" y="74" fill="#a1a1aa" font-size="10.5" font-weight="600">UNION ALL (Direct Stream Append)</text>
          <text x="12" y="88" fill="#71717a" font-size="9">O(1) fast append without sort or memory buffer:</text>
          <text x="12" y="102" fill="#52525b" font-size="9">David preserved twice → 8 total emitted tuples</text>
        </g>

        <!-- Footer -->
        <line x1="350" y1="206" x2="650" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="350" y="206" width="300" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="362" y="228" fill="#ffffff" font-size="10" font-weight="600">Performance rule: Prefer UNION ALL</text>
        <text x="362" y="244" fill="#71717a" font-size="9">Only use UNION when deduplication is strictly required.</text>
      </g>

      <!-- RIGHT: COMBINED UNION STREAM -->
      <g opacity="${resActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(668, 14, 314, 242, 'icon-table', 'COMBINED UNION STREAM', '7 DISTINCT ROWS', step === 3 ? '#ffffff' : '#222226', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="668" y1="70" x2="982" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="682" y="62" fill="#71717a" font-size="9.5" font-weight="600">MEMBER</text>
        <text x="800" y="62" fill="#71717a" font-size="9.5" font-weight="600">ORIGIN SET</text>
        <text x="890" y="62" fill="#ffffff" font-size="9.5" font-weight="700">STATUS</text>

        <!-- Stream Items -->
        <text x="682" y="92" fill="#ffffff" font-size="10">Alice, Bob, Charlie</text>
        <text x="800" y="92" fill="#71717a" font-size="9.5">Employees</text>
        <text x="890" y="92" fill="#ffffff" font-size="9.5" font-weight="600">SET A</text>
        <line x1="668" y1="104" x2="982" y2="104" stroke="#17171a" stroke-width="1"/>

        <rect x="668" y="104" width="314" height="34" fill="rgba(255,255,255,0.02)"/>
        <text x="682" y="126" fill="#ffffff" font-size="10.5" font-weight="700">David</text>
        <text x="800" y="126" fill="#ffffff" font-size="9.5" font-weight="600">Both Sets</text>
        <text x="890" y="126" fill="#ffffff" font-size="9.5" font-weight="800">DEDUPED ✓</text>
        <line x1="668" y1="138" x2="982" y2="138" stroke="#17171a" stroke-width="1"/>

        <text x="682" y="160" fill="#ffffff" font-size="10">Elena, Frank, Grace</text>
        <text x="800" y="160" fill="#71717a" font-size="9.5">Contractors</text>
        <text x="890" y="160" fill="#ffffff" font-size="9.5" font-weight="600">SET B</text>
        <line x1="668" y1="172" x2="982" y2="172" stroke="#17171a" stroke-width="1"/>

        <rect x="668" y="172" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="682" y="194" fill="#a1a1aa" font-size="10">Total 7 distinct tuples materialized</text>
        <text x="890" y="194" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">COMPLETE</text>

        <!-- Footer -->
        <line x1="668" y1="206" x2="982" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="668" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="682" y="228" fill="#ffffff" font-size="10" font-weight="600">7 unique records in output relation</text>
        <text x="682" y="244" fill="#71717a" font-size="9">Duplicate David safely removed by hash set.</text>
      </g>
    `;
  }

  // --- 8. TOPIC 08: CONDITIONAL LOGIC (CASE WHEN & COALESCE) ---
  function renderCaseWhenSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: RAW INPUT NUMBERS -->
      <g opacity="${srcActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(18, 14, 314, 242, 'icon-db', 'RAW INPUT VALUES', '4 CANDIDATES', step === 1 ? '#ffffff' : '#222226', step === 1 ? '1.5' : '1')}
        
        <rect x="18" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="18" y1="70" x2="332" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="30" y="62" fill="#71717a" font-size="9.5" font-weight="600">EMPLOYEE</text>
        <text x="140" y="62" fill="#71717a" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">SALARY</text>
        <text x="240" y="62" fill="#71717a" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">BONUS</text>

        <text x="30" y="92" fill="#ffffff" font-size="10">David</text>
        <text x="140" y="92" fill="#ffffff" font-size="10.5" font-family="ui-monospace, monospace">$125,000</text>
        <text x="240" y="92" fill="#a1a1aa" font-size="10" font-family="ui-monospace, monospace">$15,000</text>
        <line x1="18" y1="104" x2="332" y2="104" stroke="#17171a" stroke-width="1"/>

        <rect x="18" y="104" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="126" fill="#ffffff" font-size="10">Ashley</text>
        <text x="140" y="126" fill="#ffffff" font-size="10.5" font-family="ui-monospace, monospace">$115,000</text>
        <text x="240" y="126" fill="#a1a1aa" font-size="10" font-family="ui-monospace, monospace">$8,000</text>
        <line x1="18" y1="138" x2="332" y2="138" stroke="#17171a" stroke-width="1"/>

        <text x="30" y="160" fill="#ffffff" font-size="10">Carlos</text>
        <text x="140" y="160" fill="#ffffff" font-size="10.5" font-family="ui-monospace, monospace">$72,000</text>
        <text x="240" y="160" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">NULL</text>
        <line x1="18" y1="172" x2="332" y2="172" stroke="#17171a" stroke-width="1"/>

        <rect x="18" y="172" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="30" y="194" fill="#a1a1aa" font-size="10">Elena</text>
        <text x="140" y="194" fill="#ffffff" font-size="10.5" font-family="ui-monospace, monospace">$105,000</text>
        <text x="240" y="194" fill="#a1a1aa" font-size="10" font-family="ui-monospace, monospace">$5,000</text>

        <!-- Footer -->
        <line x1="18" y1="206" x2="332" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="18" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="30" y="228" fill="#a1a1aa" font-size="10">Continuous numerical metrics</text>
        <text x="30" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">UNCLASSIFIED SCALAR FIGURES</text>
      </g>

      <!-- CENTER: CONDITIONAL BRANCHING -->
      <g opacity="${opActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(350, 14, 300, 242, 'icon-branch', 'CASE WHEN EVALUATOR', 'DECISION TREE', step === 2 ? '#ffffff' : '#222226', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(362, 48)">
          <rect x="0" y="0" width="276" height="26" rx="4" fill="url(#gChipBg)" stroke="#2b2b32" stroke-width="1"/>
          <text x="138" y="17" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" font-family="ui-monospace, monospace">CASE WHEN salary >= 120k THEN ...</text>
        </g>

        <!-- Decision Branches -->
        <g transform="translate(362, 82)">
          <!-- Branch 1 -->
          <rect x="0" y="0" width="168" height="24" rx="3" fill="#121216" stroke="#ffffff" stroke-width="0.8"/>
          <text x="10" y="16" fill="#ffffff" font-size="9.5" font-weight="700">WHEN sal >= 120k</text>
          <path d="M 168 12 L 194 12" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arrowWhite)"/>
          <rect x="198" y="2" width="78" height="20" rx="3" fill="#ffffff"/>
          <text x="237" y="15" fill="#000000" font-size="9" font-weight="800" text-anchor="middle">EXECUTIVE</text>

          <!-- Branch 2 -->
          <rect x="0" y="30" width="168" height="24" rx="3" fill="#121216" stroke="#333338" stroke-width="0.8"/>
          <text x="10" y="46" fill="#e4e4e7" font-size="9.5" font-weight="600">WHEN sal >= 100k</text>
          <path d="M 168 42 L 194 42" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arrowWhite)"/>
          <rect x="198" y="32" width="78" height="20" rx="3" fill="#27272a"/>
          <text x="237" y="45" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">SENIOR</text>

          <!-- Branch 3: ELSE -->
          <rect x="0" y="60" width="168" height="24" rx="3" fill="#09090c" stroke="#1f1f23" stroke-width="0.8"/>
          <text x="10" y="76" fill="#71717a" font-size="9.5">ELSE Fallback</text>
          <path d="M 168 72 L 194 72" stroke="#44444a" stroke-width="1.2" marker-end="url(#arrowMuted)"/>
          <rect x="198" y="62" width="78" height="20" rx="3" fill="#18181c" stroke="#27272a" stroke-width="0.8"/>
          <text x="237" y="75" fill="#a1a1aa" font-size="9" font-weight="600" text-anchor="middle">MID-LEVEL</text>

          <!-- COALESCE Note -->
          <rect x="0" y="90" width="276" height="24" rx="3" fill="#09090c" stroke="#222226" stroke-width="0.8"/>
          <text x="10" y="105" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">COALESCE(bonus, 0.00)</text>
          <text x="160" y="105" fill="#ffffff" font-size="9" font-weight="600">Replaces NULL with 0</text>
        </g>

        <!-- Footer -->
        <line x1="350" y1="206" x2="650" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="350" y="206" width="300" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="362" y="228" fill="#ffffff" font-size="10" font-weight="600">Short-circuit evaluation order</text>
        <text x="362" y="244" fill="#71717a" font-size="9">Stops at first TRUE condition; ELSE handles residue.</text>
      </g>

      <!-- RIGHT: CATEGORIZED OUTPUT -->
      <g opacity="${resActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(668, 14, 314, 242, 'icon-table', 'CATEGORIZED RELATION', '3 TIERS CREATED', step === 3 ? '#ffffff' : '#222226', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="668" y1="70" x2="982" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="682" y="62" fill="#71717a" font-size="9.5" font-weight="600">EMPLOYEE</text>
        <text x="770" y="62" fill="#71717a" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">BASE SALARY</text>
        <text x="890" y="62" fill="#ffffff" font-size="9.5" font-weight="700">COMP TIER</text>

        <!-- David -->
        <text x="682" y="92" fill="#ffffff" font-size="10" font-weight="600">David</text>
        <text x="770" y="92" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$125,000</text>
        <rect x="874" y="78" width="86" height="20" rx="3" fill="#ffffff"/>
        <text x="917" y="91" fill="#000000" font-size="9" font-weight="800" text-anchor="middle">EXECUTIVE</text>
        <line x1="668" y1="104" x2="982" y2="104" stroke="#17171a" stroke-width="1"/>

        <!-- Ashley -->
        <rect x="668" y="104" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="682" y="126" fill="#ffffff" font-size="10" font-weight="600">Ashley</text>
        <text x="770" y="126" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$115,000</text>
        <rect x="874" y="112" width="86" height="20" rx="3" fill="#27272a"/>
        <text x="917" y="125" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">SENIOR</text>
        <line x1="668" y1="138" x2="982" y2="138" stroke="#17171a" stroke-width="1"/>

        <!-- Carlos -->
        <text x="682" y="160" fill="#a1a1aa" font-size="10">Carlos</text>
        <text x="770" y="160" fill="#a1a1aa" font-size="10" font-family="ui-monospace, monospace">$72,000</text>
        <rect x="874" y="146" width="86" height="20" rx="3" fill="#18181c" stroke="#27272a" stroke-width="0.8"/>
        <text x="917" y="159" fill="#a1a1aa" font-size="9" font-weight="600" text-anchor="middle">MID-LEVEL</text>
        <line x1="668" y1="172" x2="982" y2="172" stroke="#17171a" stroke-width="1"/>

        <!-- Elena -->
        <rect x="668" y="172" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="682" y="194" fill="#ffffff" font-size="10" font-weight="600">Elena</text>
        <text x="770" y="194" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$105,000</text>
        <rect x="874" y="180" width="86" height="20" rx="3" fill="#27272a"/>
        <text x="917" y="193" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">SENIOR</text>

        <!-- Footer -->
        <line x1="668" y1="206" x2="982" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="668" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="682" y="228" fill="#ffffff" font-size="10" font-weight="600">Dynamic in-flight categorical synthesis</text>
        <text x="682" y="244" fill="#71717a" font-size="9">Created on the fly without database ALTER TABLE changes.</text>
      </g>
    `;
  }

  // --- 9. TOPIC 09: MULTI-STEP PIPELINES (CTEs & WITH) ---
  function renderCtePipelineSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: STAGE 1 CTE DEFINITION -->
      <g opacity="${srcActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(18, 14, 314, 242, 'icon-pipe', 'CTE 1: DeptAverages', 'WITH SCOPE', step === 1 ? '#ffffff' : '#222226', step === 1 ? '1.5' : '1')}
        
        <g transform="translate(30, 48)">
          <rect x="0" y="0" width="290" height="148" rx="6" fill="#09090c" stroke="#222226" stroke-width="0.8"/>
          
          <text x="14" y="22" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">WITH DeptAverages AS (</text>
          <text x="24" y="42" fill="#a1a1aa" font-size="9.5" font-family="ui-monospace, monospace">SELECT department,</text>
          <text x="34" y="58" fill="#ffffff" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">AVG(salary) AS avg_sal</text>
          <text x="24" y="74" fill="#a1a1aa" font-size="9.5" font-family="ui-monospace, monospace">FROM Employees</text>
          <text x="24" y="90" fill="#a1a1aa" font-size="9.5" font-family="ui-monospace, monospace">GROUP BY department</text>
          <text x="14" y="110" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">)</text>

          <rect x="14" y="120" width="262" height="20" rx="3" fill="#131317"/>
          <text x="145" y="133" fill="#a1a1aa" font-size="8.5" text-anchor="middle">Materializes named temporary relation in memory</text>
        </g>

        <!-- Footer -->
        <line x1="18" y1="206" x2="332" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="18" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="30" y="228" fill="#a1a1aa" font-size="10">Precomputes benchmark per department</text>
        <text x="30" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">INLINE QUERY OPTIMIZER REGISTER</text>
      </g>

      <!-- CENTER: STAGE 2 CHAINED CTE -->
      <g opacity="${opActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(350, 14, 300, 242, 'icon-pipe', 'CTE 2: HighEarners', 'CHAINED PIPE', step === 2 ? '#ffffff' : '#222226', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(362, 48)">
          <rect x="0" y="0" width="276" height="148" rx="6" fill="#09090c" stroke="#222226" stroke-width="0.8"/>
          
          <text x="12" y="22" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">, HighEarners AS (</text>
          <text x="22" y="42" fill="#a1a1aa" font-size="9.5" font-family="ui-monospace, monospace">SELECT e.first_name, e.sal</text>
          <text x="22" y="58" fill="#a1a1aa" font-size="9.5" font-family="ui-monospace, monospace">FROM Employees e</text>
          <text x="22" y="74" fill="#ffffff" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">JOIN DeptAverages d</text>
          <text x="32" y="90" fill="#a1a1aa" font-size="9.5" font-family="ui-monospace, monospace">ON e.dept = d.dept</text>
          <text x="22" y="106" fill="#ffffff" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">WHERE e.salary > d.avg_sal</text>
          <text x="12" y="126" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">)</text>

          <text x="138" y="140" fill="#71717a" font-size="8.5" text-anchor="middle">References CTE 1 without nested subquery pyramid</text>
        </g>

        <!-- Footer -->
        <line x1="350" y1="206" x2="650" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="350" y="206" width="300" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="362" y="228" fill="#ffffff" font-size="10" font-weight="600">Modular top-to-bottom pipeline</text>
        <text x="362" y="244" fill="#71717a" font-size="9">Significantly improves readability &amp; maintainability.</text>
      </g>

      <!-- RIGHT: FINAL OUTER QUERY RESULT -->
      <g opacity="${resActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(668, 14, 314, 242, 'icon-table', 'FINAL QUERY RESULT', 'OUTER SELECT', step === 3 ? '#ffffff' : '#222226', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="668" y1="70" x2="982" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="682" y="62" fill="#ffffff" font-size="9.5" font-weight="700">EMPLOYEE</text>
        <text x="780" y="62" fill="#71717a" font-size="9.5" font-weight="600">DEPARTMENT</text>
        <text x="890" y="62" fill="#ffffff" font-size="9.5" font-weight="700" font-family="ui-monospace, monospace">BENCHMARK</text>

        <!-- Result 1 -->
        <g transform="translate(682, 78)">
          <rect x="0" y="0" width="286" height="42" rx="4" fill="#0e0e12" stroke="#ffffff" stroke-width="1"/>
          <text x="12" y="20" fill="#ffffff" font-size="11" font-weight="700">David</text>
          <text x="98" y="20" fill="#d4d4d8" font-size="10">Engineering</text>
          <text x="12" y="34" fill="#a1a1aa" font-size="9.5" font-family="ui-monospace, monospace">Salary $125k > Dept Avg $90.6k</text>
        </g>

        <!-- Result 2 -->
        <g transform="translate(682, 128)">
          <rect x="0" y="0" width="286" height="42" rx="4" fill="#0e0e12" stroke="#ffffff" stroke-width="1"/>
          <text x="12" y="20" fill="#ffffff" font-size="11" font-weight="700">Ashley</text>
          <text x="98" y="20" fill="#d4d4d8" font-size="10">Analytics</text>
          <text x="12" y="34" fill="#a1a1aa" font-size="9.5" font-family="ui-monospace, monospace">Salary $115k > Dept Avg $105k</text>
        </g>

        <!-- Footer -->
        <line x1="668" y1="206" x2="982" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="668" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="682" y="228" fill="#ffffff" font-size="10" font-weight="600">Final materialized result set</text>
        <text x="682" y="244" fill="#71717a" font-size="9">Linear DAG computation completed in RAM.</text>
      </g>
    `;
  }

  // --- 10. TOPIC 10: WINDOW FUNCTIONS (OVER, PARTITION BY, Sliding Frame) ---
  function renderWindowPartitionSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: PARTITION FENCES -->
      <g opacity="${srcActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(18, 14, 314, 242, 'icon-window', 'PARTITION BY DEPT', '2 PARTITIONS', step === 1 ? '#ffffff' : '#222226', step === 1 ? '1.5' : '1')}
        
        <!-- Partition 1: Engineering -->
        <g transform="translate(28, 48)">
          <rect x="0" y="0" width="294" height="70" rx="4" fill="#0e0e12" stroke="#333338" stroke-width="0.8"/>
          <text x="10" y="16" fill="#ffffff" font-size="9.5" font-weight="700">PARTITION 1: Engineering (3 Rows)</text>
          <text x="10" y="32" fill="#d4d4d8" font-size="9" font-family="ui-monospace, monospace">1. David: $125,000</text>
          <text x="10" y="46" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">2. Sara:  $110,000</text>
          <text x="10" y="60" fill="#71717a" font-size="9" font-family="ui-monospace, monospace">3. Carlos: $72,000</text>
        </g>

        <!-- Partition 2: Analytics -->
        <g transform="translate(28, 126)">
          <rect x="0" y="0" width="294" height="66" rx="4" fill="#09090c" stroke="#222226" stroke-width="0.8"/>
          <text x="10" y="16" fill="#a1a1aa" font-size="9.5" font-weight="700">PARTITION 2: Analytics (2 Rows)</text>
          <text x="10" y="34" fill="#d4d4d8" font-size="9" font-family="ui-monospace, monospace">1. Ashley: $115,000</text>
          <text x="10" y="50" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">2. Julia:  $95,000</text>
        </g>

        <!-- Footer -->
        <line x1="18" y1="206" x2="332" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="18" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="30" y="228" fill="#a1a1aa" font-size="10">Rows are NEVER collapsed or hidden</text>
        <text x="30" y="244" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">PRESERVES EXACT INPUT CARDINALITY</text>
      </g>

      <!-- CENTER: SLIDING ANALYTICAL FRAME -->
      <g opacity="${opActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(350, 14, 300, 242, 'icon-cpu', 'SLIDING WINDOW FRAME', 'OVER CLAUSE', step === 2 ? '#ffffff' : '#222226', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(362, 48)">
          <rect x="0" y="0" width="276" height="26" rx="4" fill="url(#gChipBg)" stroke="#2b2b32" stroke-width="1"/>
          <text x="138" y="17" fill="#ffffff" font-size="9.5" font-weight="700" text-anchor="middle" font-family="ui-monospace, monospace">OVER (PARTITION BY dept ORDER BY sal DESC)</text>
        </g>

        <!-- Frame Calculation Steps -->
        <g transform="translate(362, 82)">
          <rect x="0" y="0" width="276" height="34" rx="4" fill="#0e0e12" stroke="#ffffff" stroke-width="0.8"/>
          <text x="10" y="16" fill="#ffffff" font-size="10" font-weight="600">Row 1 (David): Start of Window</text>
          <text x="10" y="28" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">RANK: 1 • Running: $125,000</text>

          <rect x="0" y="38" width="276" height="34" rx="4" fill="#0e0e12" stroke="#333338" stroke-width="0.8"/>
          <text x="10" y="54" fill="#ffffff" font-size="10" font-weight="600">Row 2 (Sara): Accumulates Row 1</text>
          <text x="10" y="66" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">RANK: 2 • Running: $235,000</text>

          <rect x="0" y="76" width="276" height="34" rx="4" fill="#0e0e12" stroke="#222226" stroke-width="0.8"/>
          <text x="10" y="92" fill="#ffffff" font-size="10" font-weight="600">Row 3 (Carlos): Full Dept Total</text>
          <text x="10" y="104" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">RANK: 3 • Running: $307,000</text>
        </g>

        <!-- Footer -->
        <line x1="350" y1="206" x2="650" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="350" y="206" width="300" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="362" y="228" fill="#ffffff" font-size="10" font-weight="600">Default frame: UNBOUNDED PRECEDING</text>
        <text x="362" y="244" fill="#71717a" font-size="9">TO CURRENT ROW dynamically computes running sums.</text>
      </g>

      <!-- RIGHT: ENRICHED OUTPUT -->
      <g opacity="${resActive ? '1.0' : '0.28'}" class="svg-anim-layer">
        ${renderPanelShell(668, 14, 314, 242, 'icon-table', 'ENRICHED RELATION', 'ALL 5 ROWS KEPT', step === 3 ? '#ffffff' : '#222226', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="46" width="314" height="24" fill="#0a0a0d"/>
        <line x1="668" y1="70" x2="982" y2="70" stroke="#1f1f23" stroke-width="1"/>
        <text x="682" y="62" fill="#71717a" font-size="9.5" font-weight="600">NAME</text>
        <text x="736" y="62" fill="#71717a" font-size="9.5" font-weight="600">DEPT</text>
        <text x="810" y="62" fill="#ffffff" font-size="9.5" font-weight="700">RANK</text>
        <text x="880" y="62" fill="#ffffff" font-size="9.5" font-weight="700" font-family="ui-monospace, monospace">RUNNING SUM</text>

        <!-- David -->
        <text x="682" y="92" fill="#ffffff" font-size="10" font-weight="600">David</text>
        <text x="736" y="92" fill="#a1a1aa" font-size="9.5">Eng</text>
        <text x="810" y="92" fill="#ffffff" font-size="10" font-weight="700">1</text>
        <text x="880" y="92" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">$125,000</text>
        <line x1="668" y1="104" x2="982" y2="104" stroke="#17171a" stroke-width="1"/>

        <!-- Sara -->
        <rect x="668" y="104" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="682" y="126" fill="#ffffff" font-size="10" font-weight="600">Sara</text>
        <text x="736" y="126" fill="#a1a1aa" font-size="9.5">Eng</text>
        <text x="810" y="126" fill="#ffffff" font-size="10" font-weight="700">2</text>
        <text x="880" y="126" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">$235,000</text>
        <line x1="668" y1="138" x2="982" y2="138" stroke="#17171a" stroke-width="1"/>

        <!-- Carlos -->
        <text x="682" y="160" fill="#a1a1aa" font-size="10">Carlos</text>
        <text x="736" y="160" fill="#71717a" font-size="9.5">Eng</text>
        <text x="810" y="160" fill="#a1a1aa" font-size="10">3</text>
        <text x="880" y="160" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">$307,000</text>
        <line x1="668" y1="172" x2="982" y2="172" stroke="#17171a" stroke-width="1"/>

        <!-- Ashley (Analytics) -->
        <rect x="668" y="172" width="314" height="34" fill="rgba(255,255,255,0.015)"/>
        <text x="682" y="194" fill="#ffffff" font-size="10" font-weight="600">Ashley</text>
        <text x="736" y="194" fill="#a1a1aa" font-size="9.5">Anly</text>
        <text x="810" y="194" fill="#ffffff" font-size="10" font-weight="700">1</text>
        <text x="880" y="194" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">$115,000</text>

        <!-- Footer -->
        <line x1="668" y1="206" x2="982" y2="206" stroke="#1f1f23" stroke-width="1"/>
        <rect x="668" y="206" width="314" height="50" rx="0 0 8 8" fill="#09090c"/>
        <text x="682" y="228" fill="#ffffff" font-size="10" font-weight="600">Retains individual rows + analytics side by side</text>
        <text x="682" y="244" fill="#71717a" font-size="9">Analytics partitions compute independently.</text>
      </g>
    `;
  }

  // --- MASTER RENDER METHOD ---
  function render(phase, step) {
    if (!phase) return '';
    const diag = phase.svgDiagram || {};
    const type = diag.type || 'projection';
    const s = (typeof step === 'number') ? step : 0;

    let bodySvg = '';
    switch (type) {
      case 'projection':
        bodySvg = renderProjectionSvg(diag, s);
        break;
      case 'filter':
        bodySvg = renderFilterSvg(diag, s);
        break;
      case 'sort':
      case 'sort_limit':
        bodySvg = renderSortLimitSvg(diag, s);
        break;
      case 'aggregate':
        bodySvg = renderAggregateSvg(diag, s);
        break;
      case 'group':
      case 'groupby':
        bodySvg = renderGroupBySvg(diag, s);
        break;
      case 'join':
        bodySvg = renderJoinSvg(diag, s);
        break;
      case 'union':
      case 'adv_join_set':
        bodySvg = renderAdvJoinSetSvg(diag, s);
        break;
      case 'casewhen':
      case 'conditional_branch':
        bodySvg = renderCaseWhenSvg(diag, s);
        break;
      case 'cte':
      case 'cte_pipeline':
        bodySvg = renderCtePipelineSvg(diag, s);
        break;
      case 'window':
      case 'window_partition':
        bodySvg = renderWindowPartitionSvg(diag, s);
        break;
      default:
        bodySvg = renderProjectionSvg(diag, s);
        break;
    }

    return `
      <div class="course-svg-diagram-card">
        <svg viewBox="0 0 1000 270" class="course-explainer-svg" xmlns="http://www.w3.org/2000/svg">
          ${getSvgDefs()}
          <!-- Canvas Background -->
          <rect x="0" y="0" width="1000" height="270" rx="8" fill="#050507"/>
          ${bodySvg}
        </svg>

        <!-- Interactive Diagram Stepper Bar -->
        <div class="diagram-stepper-bar">
          <button class="diagram-step-btn ${s === 0 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(0)">
            <span>Overview</span>
          </button>
          <button class="diagram-step-btn ${s === 1 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(1)">
            <span>1. Scan Table</span>
          </button>
          <button class="diagram-step-btn ${s === 2 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(2)">
            <span>2. Relational Kernel</span>
          </button>
          <button class="diagram-step-btn ${s === 3 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(3)">
            <span>3. Emit Result</span>
          </button>
        </div>
      </div>
    `;
  }

  return {
    render,
    renderProjectionSvg,
    renderFilterSvg,
    renderSortLimitSvg,
    renderAggregateSvg,
    renderGroupBySvg,
    renderJoinSvg,
    renderAdvJoinSetSvg,
    renderCaseWhenSvg,
    renderCtePipelineSvg,
    renderWindowPartitionSvg
  };

})();
