/**
 * SQL FOUNDRY - MINIMALIST CARBON PRECISION SVG ENGINE
 * Ultra-clean, high-contrast monochrome relational architecture diagrams.
 * ViewBox: 1000 x 240 (Aspect Ratio: 25:6).
 * Symmetrical 3-Column Architecture: Source (316px) -> Transformation Kernel (304px) -> Emitted Result (316px).
 * Zero cartoon emojis, zero shouting footers, hair-thin lines, precision tabular typography.
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

  // --- MINIMALIST SVG DEFS (ICONS, MARKERS, GRADIENTS) ---
  function getSvgDefs() {
    return `
      <defs>
        <!-- Gradients -->
        <linearGradient id="gPanelBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0b0b0e"/>
          <stop offset="100%" stop-color="#060608"/>
        </linearGradient>
        <linearGradient id="gHeaderBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#121216"/>
          <stop offset="100%" stop-color="#0a0a0d"/>
        </linearGradient>
        <linearGradient id="gChipBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#18181e"/>
          <stop offset="100%" stop-color="#0f0f13"/>
        </linearGradient>

        <!-- Arrow Markers -->
        <marker id="arrowMuted" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
          <path d="M 1 1.5 L 6.5 4 L 1 6.5 z" fill="#3f3f46"/>
        </marker>
        <marker id="arrowWhite" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
          <path d="M 1 1.5 L 6.5 4 L 1 6.5 z" fill="#ffffff"/>
        </marker>

        <!-- Vector Icons (12x12 coordinate space) -->
        <g id="icon-db">
          <path d="M 1.5 2.5 C 1.5 1.5 4 1.2 6 1.2 C 8 1.2 10.5 1.5 10.5 2.5 M 1.5 2.5 L 1.5 9.5 C 1.5 10.5 4 10.8 6 10.8 C 8 10.8 10.5 10.5 10.5 9.5 L 10.5 2.5 M 1.5 6 C 1.5 7 4 7.3 6 7.3 C 8 7.3 10.5 7 10.5 6" fill="none" stroke="currentColor" stroke-width="1.1"/>
        </g>
        <g id="icon-cpu">
          <rect x="2" y="2" width="8" height="8" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.1"/>
          <rect x="4" y="4" width="4" height="4" rx="0.6" fill="currentColor"/>
          <line x1="3.5" y1="0.8" x2="3.5" y2="2" stroke="currentColor" stroke-width="1.1"/>
          <line x1="6" y1="0.8" x2="6" y2="2" stroke="currentColor" stroke-width="1.1"/>
          <line x1="8.5" y1="0.8" x2="8.5" y2="2" stroke="currentColor" stroke-width="1.1"/>
          <line x1="3.5" y1="10" x2="3.5" y2="11.2" stroke="currentColor" stroke-width="1.1"/>
          <line x1="6" y1="10" x2="6" y2="11.2" stroke="currentColor" stroke-width="1.1"/>
          <line x1="8.5" y1="10" x2="8.5" y2="11.2" stroke="currentColor" stroke-width="1.1"/>
        </g>
        <g id="icon-table">
          <rect x="1" y="1.5" width="10" height="9" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.1"/>
          <line x1="1" y1="4.5" x2="11" y2="4.5" stroke="currentColor" stroke-width="1"/>
          <line x1="4.5" y1="4.5" x2="4.5" y2="10.5" stroke="currentColor" stroke-width="1"/>
        </g>
        <g id="icon-filter">
          <polygon points="1,2 11,2 7.5,6.5 7.5,10.5 4.5,9.2 4.5,6.5" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>
        </g>
        <g id="icon-sort">
          <path d="M 3 10.5 L 3 1.5 M 3 1.5 L 1.2 3.3 M 3 1.5 L 4.8 3.3 M 9 1.5 L 9 10.5 M 9 10.5 L 7.2 8.7 M 9 10.5 L 10.8 8.7" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g id="icon-sigma">
          <path d="M 9.5 2 L 2.5 2 L 6 6 L 2.5 10 L 9.5 10" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g id="icon-group">
          <rect x="1" y="1.5" width="4" height="4" rx="0.8" fill="currentColor"/>
          <rect x="7" y="1.5" width="4" height="4" rx="0.8" fill="currentColor"/>
          <rect x="4" y="6.8" width="4" height="4" rx="0.8" fill="currentColor"/>
        </g>
        <g id="icon-join">
          <circle cx="4.2" cy="6" r="3.4" fill="none" stroke="currentColor" stroke-width="1.1"/>
          <circle cx="7.8" cy="6" r="3.4" fill="none" stroke="currentColor" stroke-width="1.1"/>
        </g>
        <g id="icon-branch">
          <path d="M 2.5 2.5 L 2.5 9.5 M 2.5 6 L 9.5 2.5 M 9.5 2.5 L 9.5 5" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
        </g>
        <g id="icon-window">
          <rect x="1" y="2" width="10" height="8" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.1"/>
          <line x1="4.5" y1="2" x2="4.5" y2="10" stroke="currentColor" stroke-width="1"/>
          <line x1="8" y1="2" x2="8" y2="10" stroke="currentColor" stroke-width="1"/>
        </g>
      </defs>
    `;
  }

  // --- REUSABLE MINIMAL PANEL SHELL ---
  function renderPanelShell(x, y, w, h, iconId, title, badgeText, strokeColor, strokeWidth) {
    return `
      <!-- Panel Outer Shell -->
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="url(#gPanelBg)" stroke="${strokeColor || 'rgba(255,255,255,0.08)'}" stroke-width="${strokeWidth || '1'}"/>
      <!-- Header Bar -->
      <path d="M ${x} ${y+6} Q ${x} ${y} ${x+6} ${y} L ${x+w-6} ${y} Q ${x+w} ${y} ${x+w} ${y+6} L ${x+w} ${y+28} L ${x} ${y+28} Z" fill="url(#gHeaderBg)"/>
      <line x1="${x}" y1="${y+28}" x2="${x+w}" y2="${y+28}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <g transform="translate(${x+10}, ${y+8})" color="#a1a1aa">
        <use href="#${iconId}"/>
      </g>
      <text x="${x+28}" y="${y+18}" fill="#f4f4f5" font-size="10.5" font-weight="600" letter-spacing="0.02em">${escapeXml(title)}</text>
      ${badgeText ? `
        <rect x="${x+w - (badgeText.length * 5.8 + 14)}" y="${y+6}" width="${badgeText.length * 5.8 + 10}" height="16" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
        <text x="${x+w - (badgeText.length * 2.9 + 9)}" y="${y+17}" fill="#71717a" font-size="8.5" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">${escapeXml(badgeText)}</text>
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
      <g opacity="${srcActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(16, 12, 316, 216, 'icon-db', 'FROM employees', '4 rows', step === 1 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 1 ? '1.5' : '1')}
        
        <!-- Column Headers -->
        <rect x="16" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="16" y1="62" x2="332" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">ID</text>
        <text x="64" y="55" fill="#ffffff" font-size="9" font-weight="600">FIRST_NAME</text>
        <text x="164" y="55" fill="#52525b" font-size="9">DEPT</text>
        <text x="246" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">SALARY</text>

        <!-- Column Highlight Rail -->
        <rect x="60" y="62" width="94" height="132" fill="rgba(255,255,255,0.018)"/>
        <rect x="240" y="62" width="86" height="132" fill="rgba(255,255,255,0.018)"/>

        <!-- Row 1 -->
        <text x="28" y="84" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">101</text>
        <text x="64" y="84" fill="#ffffff" font-size="10" font-weight="500">Ashley</text>
        <text x="164" y="84" fill="#71717a" font-size="9.5">Analytics</text>
        <text x="246" y="84" fill="#ffffff" font-size="10" font-weight="500" font-family="ui-monospace, monospace">$115,000</text>
        <line x1="16" y1="95" x2="332" y2="95" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <!-- Row 2 -->
        <rect x="16" y="95" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="117" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">102</text>
        <text x="64" y="117" fill="#ffffff" font-size="10" font-weight="500">David</text>
        <text x="164" y="117" fill="#71717a" font-size="9.5">Eng</text>
        <text x="246" y="117" fill="#ffffff" font-size="10" font-weight="500" font-family="ui-monospace, monospace">$125,000</text>
        <line x1="16" y1="128" x2="332" y2="128" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <!-- Row 3 -->
        <text x="28" y="150" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">103</text>
        <text x="64" y="150" fill="#ffffff" font-size="10" font-weight="500">Julia</text>
        <text x="164" y="150" fill="#71717a" font-size="9.5">Analytics</text>
        <text x="246" y="150" fill="#ffffff" font-size="10" font-weight="500" font-family="ui-monospace, monospace">$95,000</text>
        <line x1="16" y1="161" x2="332" y2="161" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <!-- Row 4 -->
        <rect x="16" y="161" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="183" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">104</text>
        <text x="64" y="183" fill="#ffffff" font-size="10" font-weight="500">Carlos</text>
        <text x="164" y="183" fill="#71717a" font-size="9.5">Eng</text>
        <text x="246" y="183" fill="#ffffff" font-size="10" font-weight="500" font-family="ui-monospace, monospace">$72,000</text>

        <!-- Minimal Hairline Status -->
        <line x1="16" y1="194" x2="332" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">4 tuples scanned • [id, dept] pruned in-flight</text>
      </g>

      <!-- CENTER: TRANSFORMATION KERNEL -->
      <g opacity="${opActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(348, 12, 304, 216, 'icon-cpu', 'PROJECTION KERNEL', 'scalar math', step === 2 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 2 ? '1.5' : '1')}
        
        <!-- SQL Expression Capsule -->
        <g transform="translate(360, 42)">
          <rect x="0" y="0" width="280" height="24" rx="4" fill="url(#gChipBg)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <text x="140" y="16" fill="#ffffff" font-size="9.5" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">SELECT first_name, salary * 1.10</text>
        </g>

        <!-- Relational Algebra Operation Chip -->
        <g transform="translate(360, 78)">
          <rect x="0" y="0" width="280" height="106" rx="5" fill="#07070a" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          <text x="14" y="24" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">RELATIONAL PROJECTION</text>
          
          <rect x="14" y="34" width="252" height="32" rx="4" fill="#111116" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
          <text x="24" y="54" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">&pi; first_name, salary * 1.10 AS comp</text>

          <text x="14" y="86" fill="#71717a" font-size="9">Evaluated in registers:</text>
          <text x="122" y="86" fill="#ffffff" font-size="9" font-weight="600">0 Disk I/O writes</text>
          <text x="14" y="99" fill="#52525b" font-size="8.5">Base table on disk remains strictly immutable</text>
        </g>

        <!-- Minimal Hairline Status -->
        <line x1="348" y1="194" x2="652" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="360" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Streaming tuple evaluation • O(N) linear time</text>

        <!-- Connecting Bus Arrows -->
        <path d="M 332 84 L 348 84" stroke="#3f3f46" stroke-width="1" marker-end="url(#arrowMuted)"/>
        <path d="M 332 117 L 348 117" stroke="#3f3f46" stroke-width="1" marker-end="url(#arrowMuted)"/>
        <path d="M 332 150 L 348 150" stroke="#3f3f46" stroke-width="1" marker-end="url(#arrowMuted)"/>
        <path d="M 332 183 L 348 183" stroke="#3f3f46" stroke-width="1" marker-end="url(#arrowMuted)"/>

        <path d="M 652 84 L 668 84" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 117 L 668 117" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 150 L 668 150" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 183 L 668 183" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
      </g>

      <!-- RIGHT: PROJECTED RESULT -->
      <g opacity="${resActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(668, 12, 316, 216, 'icon-table', 'PROJECTED RESULT', '2 cols emitted', step === 3 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 3 ? '1.5' : '1')}
        
        <!-- Column Headers -->
        <rect x="668" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="668" y1="62" x2="984" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="55" fill="#ffffff" font-size="9" font-weight="600">FIRST_NAME</text>
        <text x="824" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">PROJECTED_COMP (+10%)</text>

        <!-- Row 1 -->
        <text x="682" y="84" fill="#ffffff" font-size="10" font-weight="500">Ashley</text>
        <text x="824" y="84" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$126,500.00</text>
        <line x1="668" y1="95" x2="984" y2="95" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <!-- Row 2 -->
        <rect x="668" y="95" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="682" y="117" fill="#ffffff" font-size="10" font-weight="500">David</text>
        <text x="824" y="117" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$137,500.00</text>
        <line x1="668" y1="128" x2="984" y2="128" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <!-- Row 3 -->
        <text x="682" y="150" fill="#ffffff" font-size="10" font-weight="500">Julia</text>
        <text x="824" y="150" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$104,500.00</text>
        <line x1="668" y1="161" x2="984" y2="161" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <!-- Row 4 -->
        <rect x="668" y="161" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="682" y="183" fill="#ffffff" font-size="10" font-weight="500">Carlos</text>
        <text x="824" y="183" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$79,200.00</text>

        <!-- Minimal Hairline Status -->
        <line x1="668" y1="194" x2="984" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">4 tuples emitted • ready for client consumption</text>
      </g>
    `;
  }

  // --- 2. TOPIC 02: PREDICATE SIEVE (WHERE & 3VL) ---
  function renderWhereSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: UNFILTERED INPUT STREAM -->
      <g opacity="${srcActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(16, 12, 316, 216, 'icon-db', 'FROM customers', '5 tuples', step === 1 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 1 ? '1.5' : '1')}
        
        <!-- Headers -->
        <rect x="16" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="16" y1="62" x2="332" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">ID</text>
        <text x="64" y="55" fill="#ffffff" font-size="9" font-weight="600">CUSTOMER</text>
        <text x="174" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">COUNTRY</text>
        <text x="264" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">SPEND</text>

        <!-- Rows -->
        <text x="28" y="82" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">01</text>
        <text x="64" y="82" fill="#ffffff" font-size="10" font-weight="500">Acme Corp</text>
        <text x="174" y="82" fill="#d4d4d8" font-size="9.5">USA</text>
        <text x="264" y="82" fill="#ffffff" font-size="10" font-weight="500" font-family="ui-monospace, monospace">$14,200</text>
        <line x1="16" y1="91" x2="332" y2="91" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="91" width="316" height="27" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="108" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">02</text>
        <text x="64" y="108" fill="#71717a" font-size="10">Globex Ltd</text>
        <text x="174" y="108" fill="#52525b" font-size="9.5">UK</text>
        <text x="264" y="108" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">$3,400</text>
        <line x1="16" y1="118" x2="332" y2="118" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="28" y="135" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">03</text>
        <text x="64" y="135" fill="#ffffff" font-size="10" font-weight="500">Initech Inc</text>
        <text x="174" y="135" fill="#d4d4d8" font-size="9.5">USA</text>
        <text x="264" y="135" fill="#ffffff" font-size="10" font-weight="500" font-family="ui-monospace, monospace">$28,500</text>
        <line x1="16" y1="145" x2="332" y2="145" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="145" width="316" height="27" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="162" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">04</text>
        <text x="64" y="162" fill="#71717a" font-size="10">Soylent Corp</text>
        <text x="174" y="162" fill="#52525b" font-size="9.5">NULL</text>
        <text x="264" y="162" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">$9,100</text>
        <line x1="16" y1="172" x2="332" y2="172" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="28" y="189" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">05</text>
        <text x="64" y="189" fill="#ffffff" font-size="10" font-weight="500">Stark Ind</text>
        <text x="174" y="189" fill="#d4d4d8" font-size="9.5">USA</text>
        <text x="264" y="189" fill="#ffffff" font-size="10" font-weight="500" font-family="ui-monospace, monospace">$42,000</text>

        <!-- Minimal Hairline Status -->
        <line x1="16" y1="194" x2="332" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">5 raw tuples scanned from storage engine</text>
      </g>

      <!-- CENTER: THREE-VALUED LOGIC SIEVE -->
      <g opacity="${opActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(348, 12, 304, 216, 'icon-filter', 'PREDICATE SIEVE (3VL)', 'boolean gate', step === 2 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 2 ? '1.5' : '1')}
        
        <!-- Predicate Capsule -->
        <g transform="translate(360, 42)">
          <rect x="0" y="0" width="280" height="24" rx="4" fill="url(#gChipBg)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <text x="140" y="16" fill="#ffffff" font-size="9.5" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">WHERE country = 'USA' AND spend &gt; 5000</text>
        </g>

        <!-- Truth Table Matrix -->
        <g transform="translate(360, 78)">
          <rect x="0" y="0" width="280" height="106" rx="5" fill="#07070a" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          
          <rect x="12" y="12" width="256" height="22" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="22" y="27" fill="#ffffff" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">Row 01: TRUE AND TRUE</text>
          <text x="220" y="27" fill="#ffffff" font-size="9" font-weight="700">PASS</text>

          <rect x="12" y="38" width="256" height="22" rx="3" fill="#0a0a0d" stroke="rgba(255,255,255,0.04)" stroke-width="0.8"/>
          <text x="22" y="53" fill="#71717a" font-size="9.5" font-family="ui-monospace, monospace">Row 02: FALSE AND FALSE</text>
          <text x="220" y="53" fill="#52525b" font-size="9">DROP</text>

          <rect x="12" y="64" width="256" height="22" rx="3" fill="#0a0a0d" stroke="rgba(255,255,255,0.04)" stroke-width="0.8"/>
          <text x="22" y="79" fill="#71717a" font-size="9.5" font-family="ui-monospace, monospace">Row 04: UNKNOWN (NULL)</text>
          <text x="220" y="79" fill="#52525b" font-size="9">DROP</text>
        </g>

        <!-- Minimal Hairline Status -->
        <line x1="348" y1="194" x2="652" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="360" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">WHERE rejects both FALSE and UNKNOWN (3VL)</text>

        <!-- Flow Bus -->
        <path d="M 332 82 L 348 82" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 332 108 L 348 108" stroke="#3f3f46" stroke-width="1" marker-end="url(#arrowMuted)"/>
        <path d="M 332 135 L 348 135" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 332 162 L 348 162" stroke="#3f3f46" stroke-width="1" marker-end="url(#arrowMuted)"/>
        <path d="M 332 189 L 348 189" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>

        <path d="M 652 82 L 668 90" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 135 L 668 132" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 189 L 668 174" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
      </g>

      <!-- RIGHT: FILTERED QUALIFYING TUPLES -->
      <g opacity="${resActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(668, 12, 316, 216, 'icon-table', 'SURVIVING TUPLES', '3 passed sieve', step === 3 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 3 ? '1.5' : '1')}
        
        <!-- Headers -->
        <rect x="668" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="668" y1="62" x2="984" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">ID</text>
        <text x="718" y="55" fill="#ffffff" font-size="9" font-weight="600">CUSTOMER</text>
        <text x="828" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">COUNTRY</text>
        <text x="918" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">SPEND</text>

        <!-- Rows -->
        <text x="682" y="90" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">01</text>
        <text x="718" y="90" fill="#ffffff" font-size="10" font-weight="500">Acme Corp</text>
        <text x="828" y="90" fill="#d4d4d8" font-size="9.5">USA</text>
        <text x="918" y="90" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$14,200</text>
        <line x1="668" y1="108" x2="984" y2="108" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="668" y="108" width="316" height="42" fill="rgba(255,255,255,0.012)"/>
        <text x="682" y="132" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">03</text>
        <text x="718" y="132" fill="#ffffff" font-size="10" font-weight="500">Initech Inc</text>
        <text x="828" y="132" fill="#d4d4d8" font-size="9.5">USA</text>
        <text x="918" y="132" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$28,500</text>
        <line x1="668" y1="150" x2="984" y2="150" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="682" y="174" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">05</text>
        <text x="718" y="174" fill="#ffffff" font-size="10" font-weight="500">Stark Ind</text>
        <text x="828" y="174" fill="#d4d4d8" font-size="9.5">USA</text>
        <text x="918" y="174" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$42,000</text>

        <!-- Minimal Hairline Status -->
        <line x1="668" y1="194" x2="984" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">3 surviving tuples transmitted downstream</text>
      </g>
    `;
  }

  // --- 3. TOPIC 03: PHYSICAL SORTING (ORDER BY & LIMIT) ---
  function renderOrderByLimitSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: UNORDERED ROWS -->
      <g opacity="${srcActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(16, 12, 316, 216, 'icon-db', 'INPUT STREAM', '5 rows unsorted', step === 1 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 1 ? '1.5' : '1')}
        
        <rect x="16" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="16" y1="62" x2="332" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">ID</text>
        <text x="70" y="55" fill="#ffffff" font-size="9" font-weight="600">PRODUCT</text>
        <text x="250" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">PRICE</text>

        <text x="28" y="82" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">101</text>
        <text x="70" y="82" fill="#ffffff" font-size="10" font-weight="500">Keyboard Pro</text>
        <text x="250" y="82" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$149</text>
        <line x1="16" y1="91" x2="332" y2="91" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="91" width="316" height="27" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="108" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">102</text>
        <text x="70" y="108" fill="#ffffff" font-size="10" font-weight="500">Monitor 4K</text>
        <text x="250" y="108" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$699</text>
        <line x1="16" y1="118" x2="332" y2="118" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="28" y="135" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">103</text>
        <text x="70" y="135" fill="#ffffff" font-size="10" font-weight="500">USB Cable</text>
        <text x="250" y="135" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">$12</text>
        <line x1="16" y1="145" x2="332" y2="145" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="145" width="316" height="27" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="162" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">104</text>
        <text x="70" y="162" fill="#ffffff" font-size="10" font-weight="500">Desk Stand</text>
        <text x="250" y="162" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">$89</text>
        <line x1="16" y1="172" x2="332" y2="172" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="28" y="189" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">105</text>
        <text x="70" y="189" fill="#ffffff" font-size="10" font-weight="500">Studio Mic</text>
        <text x="250" y="189" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$249</text>

        <line x1="16" y1="194" x2="332" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Arbitrary physical insertion order on disk</text>
      </g>

      <!-- CENTER: TOP-K HEAP / QUICKSORT KERNEL -->
      <g opacity="${opActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(348, 12, 304, 216, 'icon-sort', 'TOP-K BOUNDED HEAP', 'in-memory sort', step === 2 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(360, 42)">
          <rect x="0" y="0" width="280" height="24" rx="4" fill="url(#gChipBg)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <text x="140" y="16" fill="#ffffff" font-size="9.5" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">ORDER BY price DESC LIMIT 2</text>
        </g>

        <g transform="translate(360, 78)">
          <rect x="0" y="0" width="280" height="106" rx="5" fill="#07070a" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          
          <rect x="14" y="12" width="252" height="28" rx="4" fill="#141418" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
          <text x="24" y="30" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">&tau; Bounded Priority Queue [k=2]</text>

          <text x="14" y="58" fill="#a1a1aa" font-size="9">Heap footprint:</text>
          <text x="110" y="58" fill="#ffffff" font-size="9" font-weight="600">O(K) RAM memory</text>

          <text x="14" y="74" fill="#a1a1aa" font-size="9">Algorithm:</text>
          <text x="110" y="74" fill="#ffffff" font-size="9" font-weight="600">Top-N heap sort (No temp files)</text>

          <text x="14" y="94" fill="#52525b" font-size="8.5">Discards items ranked &gt; LIMIT without sorting them</text>
        </g>

        <line x1="348" y1="194" x2="652" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="360" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Execution Step 07: ORDER BY operates after SELECT</text>

        <!-- Bus Arrows -->
        <path d="M 332 108 L 348 108" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 332 189 L 348 189" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 108 L 668 100" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 144 L 668 148" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
      </g>

      <!-- RIGHT: SLICED TOP-K RESULT -->
      <g opacity="${resActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(668, 12, 316, 216, 'icon-table', 'EMITTED TOP-2 WINDOW', '2 tuples sliced', step === 3 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="668" y1="62" x2="984" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">RANK</text>
        <text x="730" y="55" fill="#ffffff" font-size="9" font-weight="600">PRODUCT</text>
        <text x="918" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">PRICE</text>

        <!-- Row 1 -->
        <text x="682" y="100" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">#1</text>
        <text x="730" y="100" fill="#ffffff" font-size="11" font-weight="600">Monitor 4K</text>
        <text x="918" y="100" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">$699</text>
        <line x1="668" y1="124" x2="984" y2="124" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <!-- Row 2 -->
        <rect x="668" y="124" width="316" height="48" fill="rgba(255,255,255,0.012)"/>
        <text x="682" y="152" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">#2</text>
        <text x="730" y="152" fill="#ffffff" font-size="11" font-weight="600">Studio Mic</text>
        <text x="918" y="152" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">$249</text>

        <line x1="668" y1="194" x2="984" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Window bounded by LIMIT 2 (Step 08)</text>
      </g>
    `;
  }

  // --- 4. TOPIC 04: AGGREGATES (SUM, AVG, COUNT, MIN/MAX) ---
  function renderAggregatesSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: VECTOR STREAM -->
      <g opacity="${srcActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(16, 12, 316, 216, 'icon-db', 'NUMERIC STREAM', '5 elements', step === 1 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 1 ? '1.5' : '1')}
        
        <rect x="16" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="16" y1="62" x2="332" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">IDX</text>
        <text x="80" y="55" fill="#ffffff" font-size="9" font-weight="600">METRIC</text>
        <text x="240" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">AMOUNT</text>

        <text x="28" y="82" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">01</text>
        <text x="80" y="82" fill="#d4d4d8" font-size="9.5">Order Rev</text>
        <text x="240" y="82" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$100.00</text>
        <line x1="16" y1="91" x2="332" y2="91" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="91" width="316" height="27" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="108" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">02</text>
        <text x="80" y="108" fill="#d4d4d8" font-size="9.5">Order Rev</text>
        <text x="240" y="108" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$250.00</text>
        <line x1="16" y1="118" x2="332" y2="118" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="28" y="135" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">03</text>
        <text x="80" y="135" fill="#52525b" font-size="9.5">Refund (NULL)</text>
        <text x="240" y="135" fill="#52525b" font-size="10" font-family="ui-monospace, monospace">NULL</text>
        <line x1="16" y1="145" x2="332" y2="145" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="145" width="316" height="27" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="162" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">04</text>
        <text x="80" y="162" fill="#d4d4d8" font-size="9.5">Order Rev</text>
        <text x="240" y="162" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$400.00</text>
        <line x1="16" y1="172" x2="332" y2="172" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="28" y="189" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">05</text>
        <text x="80" y="189" fill="#d4d4d8" font-size="9.5">Order Rev</text>
        <text x="240" y="189" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$50.00</text>

        <line x1="16" y1="194" x2="332" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Aggregates ignore NULLs (COUNT(*) vs COUNT(col))</text>
      </g>

      <!-- CENTER: VECTOR ACCUMULATOR KERNEL -->
      <g opacity="${opActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(348, 12, 304, 216, 'icon-sigma', 'VECTOR ACCUMULATOR', 'single-pass', step === 2 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(360, 42)">
          <rect x="0" y="0" width="280" height="24" rx="4" fill="url(#gChipBg)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <text x="140" y="16" fill="#ffffff" font-size="9" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">SELECT COUNT(*), SUM(amt), AVG(amt)</text>
        </g>

        <g transform="translate(360, 78)">
          <rect x="0" y="0" width="280" height="106" rx="5" fill="#07070a" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          
          <text x="14" y="22" fill="#ffffff" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">Accumulator State Machine:</text>
          
          <rect x="14" y="32" width="122" height="28" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="22" y="49" fill="#a1a1aa" font-size="9">COUNT(*): </text>
          <text x="82" y="49" fill="#ffffff" font-size="9.5" font-weight="700">5</text>

          <rect x="144" y="32" width="122" height="28" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="152" y="49" fill="#a1a1aa" font-size="9">COUNT(val): </text>
          <text x="232" y="49" fill="#ffffff" font-size="9.5" font-weight="700">4</text>

          <rect x="14" y="66" width="122" height="28" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="22" y="83" fill="#a1a1aa" font-size="9">SUM(val): </text>
          <text x="82" y="83" fill="#ffffff" font-size="9.5" font-weight="700">$800</text>

          <rect x="144" y="66" width="122" height="28" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="152" y="83" fill="#a1a1aa" font-size="9">AVG(val): </text>
          <text x="224" y="83" fill="#ffffff" font-size="9.5" font-weight="700">$200</text>
        </g>

        <line x1="348" y1="194" x2="652" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="360" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">N tuples collapsed into 1 scalar summary row</text>

        <path d="M 332 135 L 348 135" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 135 L 668 135" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
      </g>

      <!-- RIGHT: SCALAR COLLAPSED ROW -->
      <g opacity="${resActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(668, 12, 316, 216, 'icon-table', 'SCALAR RESULT TUPLE', '1 row output', step === 3 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="668" y1="62" x2="984" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="55" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">COUNT(*)</text>
        <text x="764" y="55" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">COUNT(amt)</text>
        <text x="854" y="55" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">TOTAL_SUM</text>
        <text x="934" y="55" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">AVG</text>

        <rect x="668" y="80" width="316" height="70" fill="rgba(255,255,255,0.015)"/>
        <text x="696" y="122" fill="#ffffff" font-size="14" font-weight="700" font-family="ui-monospace, monospace">5</text>
        <text x="784" y="122" fill="#ffffff" font-size="14" font-weight="700" font-family="ui-monospace, monospace">4</text>
        <text x="862" y="122" fill="#ffffff" font-size="14" font-weight="700" font-family="ui-monospace, monospace">$800</text>
        <text x="936" y="122" fill="#ffffff" font-size="14" font-weight="700" font-family="ui-monospace, monospace">$200</text>

        <line x1="668" y1="194" x2="984" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Aggregated grain: entire table collapsed to 1 row</text>
      </g>
    `;
  }

  // --- 5. TOPIC 05: HASH GROUPING & HAVING ---
  function renderGroupBySvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: UNGROUPED TRANSACTIONS -->
      <g opacity="${srcActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(16, 12, 316, 216, 'icon-db', 'FROM transactions', '5 tuples', step === 1 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 1 ? '1.5' : '1')}
        
        <rect x="16" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="16" y1="62" x2="332" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">ID</text>
        <text x="70" y="55" fill="#ffffff" font-size="9" font-weight="600">DEPT</text>
        <text x="250" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">SPEND</text>

        <text x="28" y="82" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">01</text>
        <text x="70" y="82" fill="#ffffff" font-size="10" font-weight="500">Engineering</text>
        <text x="250" y="82" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$4,000</text>
        <line x1="16" y1="91" x2="332" y2="91" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="91" width="316" height="27" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="108" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">02</text>
        <text x="70" y="108" fill="#a1a1aa" font-size="10">Marketing</text>
        <text x="250" y="108" fill="#a1a1aa" font-size="10" font-family="ui-monospace, monospace">$1,200</text>
        <line x1="16" y1="118" x2="332" y2="118" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="28" y="135" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">03</text>
        <text x="70" y="135" fill="#ffffff" font-size="10" font-weight="500">Engineering</text>
        <text x="250" y="135" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$8,000</text>
        <line x1="16" y1="145" x2="332" y2="145" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="145" width="316" height="27" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="162" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">04</text>
        <text x="70" y="162" fill="#ffffff" font-size="10" font-weight="500">Engineering</text>
        <text x="250" y="162" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$3,000</text>
        <line x1="16" y1="172" x2="332" y2="172" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="28" y="189" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">05</text>
        <text x="70" y="189" fill="#a1a1aa" font-size="10">Marketing</text>
        <text x="250" y="189" fill="#a1a1aa" font-size="10" font-family="ui-monospace, monospace">$800</text>

        <line x1="16" y1="194" x2="332" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Rows partitioned by hash(dept) in Step 03</text>
      </g>

      <!-- CENTER: HASH BUCKETING & HAVING SIEVE -->
      <g opacity="${opActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(348, 12, 304, 216, 'icon-group', 'HASH BUCKETING & HAVING', 'group filter', step === 2 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(360, 42)">
          <rect x="0" y="0" width="280" height="24" rx="4" fill="url(#gChipBg)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <text x="140" y="16" fill="#ffffff" font-size="9" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">GROUP BY dept HAVING SUM(spend) &gt; 5000</text>
        </g>

        <g transform="translate(360, 78)">
          <rect x="0" y="0" width="280" height="106" rx="5" fill="#07070a" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          
          <rect x="12" y="12" width="256" height="38" rx="3" fill="#141418" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
          <text x="22" y="28" fill="#ffffff" font-size="10" font-weight="600">Bucket: Engineering (3 rows)</text>
          <text x="22" y="42" fill="#71717a" font-size="8.5" font-family="ui-monospace, monospace">SUM: $15,000 &gt; $5,000 &rarr; </text>
          <text x="150" y="42" fill="#ffffff" font-size="8.5" font-weight="700">QUALIFIED (PASS)</text>

          <rect x="12" y="56" width="256" height="38" rx="3" fill="#0a0a0d" stroke="rgba(255,255,255,0.04)" stroke-width="0.8"/>
          <text x="22" y="72" fill="#71717a" font-size="10">Bucket: Marketing (2 rows)</text>
          <text x="22" y="86" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">SUM: $2,000 &le; $5,000 &rarr; </text>
          <text x="150" y="86" fill="#52525b" font-size="8.5">PRUNED BY HAVING</text>
        </g>

        <line x1="348" y1="194" x2="652" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="360" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">HAVING evaluates post-group aggregations (Step 04)</text>

        <path d="M 332 108 L 348 108" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 108 L 668 120" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
      </g>

      <!-- RIGHT: GROUP SUMMARY RESULT -->
      <g opacity="${resActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(668, 12, 316, 216, 'icon-table', 'QUALIFYING BUCKET', '1 group emitted', step === 3 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="668" y1="62" x2="984" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="55" fill="#ffffff" font-size="9" font-weight="600">DEPARTMENT</text>
        <text x="824" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">HEADCOUNT</text>
        <text x="918" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">TOTAL_SPEND</text>

        <rect x="668" y="90" width="316" height="60" fill="rgba(255,255,255,0.015)"/>
        <text x="682" y="126" fill="#ffffff" font-size="11" font-weight="600">Engineering</text>
        <text x="836" y="126" fill="#ffffff" font-size="11" font-weight="600" font-family="ui-monospace, monospace">3</text>
        <text x="918" y="126" fill="#ffffff" font-size="11" font-weight="700" font-family="ui-monospace, monospace">$15,000</text>

        <line x1="668" y1="194" x2="984" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Marketing dropped: failed HAVING threshold</text>
      </g>
    `;
  }

  // --- 6. TOPIC 06: JOINS (INNER & LEFT) ---
  function renderJoinsSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: DUAL SOURCE TABLES -->
      <g opacity="${srcActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(16, 12, 316, 216, 'icon-db', 'USERS & ORDERS (STEP 01)', 'hash build', step === 1 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 1 ? '1.5' : '1')}
        
        <!-- Table A: Users -->
        <rect x="22" y="38" width="304" height="18" fill="#0c0c10"/>
        <text x="28" y="50" fill="#a1a1aa" font-size="8.5" font-weight="600">USERS (LEFT TABLE)</text>
        <text x="28" y="70" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">U1</text>
        <text x="64" y="70" fill="#ffffff" font-size="9.5" font-weight="500">Alice</text>
        <text x="28" y="88" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">U2</text>
        <text x="64" y="88" fill="#ffffff" font-size="9.5" font-weight="500">Bob</text>
        <text x="28" y="106" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">U3</text>
        <text x="64" y="106" fill="#ffffff" font-size="9.5" font-weight="500">Charlie (No Orders)</text>

        <!-- Table B: Orders -->
        <line x1="16" y1="116" x2="332" y2="116" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <rect x="22" y="122" width="304" height="18" fill="#0c0c10"/>
        <text x="28" y="134" fill="#a1a1aa" font-size="8.5" font-weight="600">ORDERS (RIGHT TABLE)</text>
        <text x="28" y="154" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">#501</text>
        <text x="80" y="154" fill="#a1a1aa" font-size="9">user_id: U1</text>
        <text x="240" y="154" fill="#ffffff" font-size="9.5" font-family="ui-monospace, monospace">$120</text>
        <text x="28" y="172" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">#502</text>
        <text x="80" y="172" fill="#a1a1aa" font-size="9">user_id: U2</text>
        <text x="240" y="172" fill="#ffffff" font-size="9.5" font-family="ui-monospace, monospace">$85</text>

        <line x1="16" y1="194" x2="332" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Key match: users.id = orders.user_id</text>
      </g>

      <!-- CENTER: HASH JOIN ENGINE -->
      <g opacity="${opActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(348, 12, 304, 216, 'icon-join', 'HASH JOIN PIPELINE', 'build & probe', step === 2 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(360, 42)">
          <rect x="0" y="0" width="280" height="24" rx="4" fill="url(#gChipBg)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <text x="140" y="16" fill="#ffffff" font-size="9" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">FROM users LEFT JOIN orders ON u.id = o.user_id</text>
        </g>

        <g transform="translate(360, 78)">
          <rect x="0" y="0" width="280" height="106" rx="5" fill="#07070a" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          
          <rect x="12" y="10" width="256" height="24" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="20" y="25" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">Probe U1 &rarr; Match #501 ($120)</text>

          <rect x="12" y="38" width="256" height="24" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="20" y="53" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">Probe U2 &rarr; Match #502 ($85)</text>

          <rect x="12" y="66" width="256" height="30" rx="3" fill="#0c0c10" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="20" y="80" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">Probe U3 &rarr; No Right Match</text>
          <text x="20" y="91" fill="#71717a" font-size="8">LEFT JOIN: Preserves U3 with NULL order values</text>
        </g>

        <line x1="348" y1="194" x2="652" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="360" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Hash Join: O(M + N) linear complexity</text>

        <path d="M 332 88 L 348 88" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 332 154 L 348 154" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 114 L 668 114" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
      </g>

      <!-- RIGHT: JOINED RESULT SET -->
      <g opacity="${resActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(668, 12, 316, 216, 'icon-table', 'EMITTED JOIN SET', '3 joined tuples', step === 3 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="668" y1="62" x2="984" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">ID</text>
        <text x="718" y="55" fill="#ffffff" font-size="9" font-weight="600">NAME</text>
        <text x="824" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">ORDER_ID</text>
        <text x="918" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">AMOUNT</text>

        <!-- Row 1 -->
        <text x="682" y="86" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">U1</text>
        <text x="718" y="86" fill="#ffffff" font-size="10" font-weight="500">Alice</text>
        <text x="824" y="86" fill="#ffffff" font-size="9.5" font-family="ui-monospace, monospace">#501</text>
        <text x="918" y="86" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$120</text>
        <line x1="668" y1="102" x2="984" y2="102" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <!-- Row 2 -->
        <rect x="668" y="102" width="316" height="38" fill="rgba(255,255,255,0.012)"/>
        <text x="682" y="126" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">U2</text>
        <text x="718" y="126" fill="#ffffff" font-size="10" font-weight="500">Bob</text>
        <text x="824" y="126" fill="#ffffff" font-size="9.5" font-family="ui-monospace, monospace">#502</text>
        <text x="918" y="126" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$85</text>
        <line x1="668" y1="140" x2="984" y2="140" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <!-- Row 3 -->
        <text x="682" y="166" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">U3</text>
        <text x="718" y="166" fill="#ffffff" font-size="10" font-weight="500">Charlie</text>
        <text x="824" y="166" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">NULL</text>
        <text x="918" y="166" fill="#52525b" font-size="10" font-family="ui-monospace, monospace">NULL</text>

        <line x1="668" y1="194" x2="984" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">INNER would drop Charlie; LEFT preserves with NULL</text>
      </g>
    `;
  }

  // --- 7. TOPIC 07: SET OPERATORS (UNION vs UNION ALL) ---
  function renderSetOpsSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: TWO RELATIONS -->
      <g opacity="${srcActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(16, 12, 316, 216, 'icon-db', 'QUERY A & QUERY B', 'two sets', step === 1 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 1 ? '1.5' : '1')}
        
        <rect x="22" y="38" width="304" height="18" fill="#0c0c10"/>
        <text x="28" y="50" fill="#a1a1aa" font-size="8.5" font-weight="600">QUERY A: ACTIVE USERS</text>
        <text x="28" y="70" fill="#ffffff" font-size="9.5" font-weight="500">sarah@acme.com</text>
        <text x="28" y="88" fill="#ffffff" font-size="9.5" font-weight="500">alex@corp.org</text>

        <line x1="16" y1="102" x2="332" y2="102" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <rect x="22" y="110" width="304" height="18" fill="#0c0c10"/>
        <text x="28" y="122" fill="#a1a1aa" font-size="8.5" font-weight="600">QUERY B: BETA INVITES</text>
        <text x="28" y="142" fill="#ffffff" font-size="9.5" font-weight="500">sarah@acme.com (Duplicate)</text>
        <text x="28" y="160" fill="#ffffff" font-size="9.5" font-weight="500">marta@lab.io</text>

        <line x1="16" y1="194" x2="332" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Both branches must share identical arity & types</text>
      </g>

      <!-- CENTER: SET OPERATOR DISPATCH -->
      <g opacity="${opActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(348, 12, 304, 216, 'icon-branch', 'SET ALGEBRA KERNEL', 'union vs all', step === 2 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(360, 42)">
          <rect x="0" y="0" width="280" height="24" rx="4" fill="url(#gChipBg)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <text x="140" y="16" fill="#ffffff" font-size="9.5" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">QueryA UNION QueryB</text>
        </g>

        <g transform="translate(360, 78)">
          <rect x="0" y="0" width="280" height="106" rx="5" fill="#07070a" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          
          <rect x="12" y="12" width="256" height="34" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="22" y="28" fill="#ffffff" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">UNION: Distinct Hash / Sort Pass</text>
          <text x="22" y="40" fill="#71717a" font-size="8.5">Strips duplicate 'sarah@acme.com'</text>

          <rect x="12" y="54" width="256" height="34" rx="3" fill="#0a0a0d" stroke="rgba(255,255,255,0.04)" stroke-width="0.8"/>
          <text x="22" y="70" fill="#71717a" font-size="9.5" font-family="ui-monospace, monospace">UNION ALL: Zero De-duplication</text>
          <text x="22" y="82" fill="#52525b" font-size="8.5">Appends streams directly (Fastest, 0 CPU sort)</text>
        </g>

        <line x1="348" y1="194" x2="652" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="360" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">UNION ALL is up to 10x faster when sets disjoint</text>

        <path d="M 332 78 L 348 78" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 332 150 L 348 150" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 114 L 668 114" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
      </g>

      <!-- RIGHT: DEDUPLICATED UNION RESULT -->
      <g opacity="${resActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(668, 12, 316, 216, 'icon-table', 'DISTINCT SET RESULT', '3 unique emails', step === 3 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="668" y1="62" x2="984" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">#</text>
        <text x="718" y="55" fill="#ffffff" font-size="9" font-weight="600">EMAIL_ADDRESS</text>
        <text x="918" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">ORIGIN</text>

        <text x="682" y="86" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">01</text>
        <text x="718" y="86" fill="#ffffff" font-size="10" font-weight="500">sarah@acme.com</text>
        <text x="918" y="86" fill="#a1a1aa" font-size="9.5">Shared</text>
        <line x1="668" y1="102" x2="984" y2="102" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="668" y="102" width="316" height="38" fill="rgba(255,255,255,0.012)"/>
        <text x="682" y="126" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">02</text>
        <text x="718" y="126" fill="#ffffff" font-size="10" font-weight="500">alex@corp.org</text>
        <text x="918" y="126" fill="#a1a1aa" font-size="9.5">Query A</text>
        <line x1="668" y1="140" x2="984" y2="140" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="682" y="166" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">03</text>
        <text x="718" y="166" fill="#ffffff" font-size="10" font-weight="500">marta@lab.io</text>
        <text x="918" y="166" fill="#a1a1aa" font-size="9.5">Query B</text>

        <line x1="668" y1="194" x2="984" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Duplicates pruned • Mathematical set union complete</text>
      </g>
    `;
  }

  // --- 8. TOPIC 08: CONDITIONAL LOGIC (CASE WHEN) ---
  function renderCaseWhenSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: UNCLASSIFIED SCORES -->
      <g opacity="${srcActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(16, 12, 316, 216, 'icon-db', 'FROM candidates', '4 tuples', step === 1 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 1 ? '1.5' : '1')}
        
        <rect x="16" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="16" y1="62" x2="332" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">ID</text>
        <text x="70" y="55" fill="#ffffff" font-size="9" font-weight="600">CANDIDATE</text>
        <text x="240" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">SCORE</text>

        <text x="28" y="84" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">1</text>
        <text x="70" y="84" fill="#ffffff" font-size="10" font-weight="500">Danielle</text>
        <text x="240" y="84" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">94</text>
        <line x1="16" y1="95" x2="332" y2="95" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="95" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="117" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">2</text>
        <text x="70" y="117" fill="#ffffff" font-size="10" font-weight="500">Ethan</text>
        <text x="240" y="117" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">78</text>
        <line x1="16" y1="128" x2="332" y2="128" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="28" y="150" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">3</text>
        <text x="70" y="150" fill="#ffffff" font-size="10" font-weight="500">Fiona</text>
        <text x="240" y="150" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">58</text>
        <line x1="16" y1="161" x2="332" y2="161" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="161" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="183" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">4</text>
        <text x="70" y="183" fill="#ffffff" font-size="10" font-weight="500">George</text>
        <text x="240" y="183" fill="#52525b" font-size="10" font-family="ui-monospace, monospace">NULL</text>

        <line x1="16" y1="194" x2="332" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Raw numeric metrics fed to branching logic</text>
      </g>

      <!-- CENTER: SHORT-CIRCUIT BRANCH ENGINE -->
      <g opacity="${opActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(348, 12, 304, 216, 'icon-cpu', 'BRANCH EVALUATOR', 'short-circuit', step === 2 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(360, 42)">
          <rect x="0" y="0" width="280" height="24" rx="4" fill="url(#gChipBg)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <text x="140" y="16" fill="#ffffff" font-size="9.5" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">CASE WHEN score &gt;= 90 THEN 'Tier 1' ...</text>
        </g>

        <g transform="translate(360, 78)">
          <rect x="0" y="0" width="280" height="106" rx="5" fill="#07070a" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          
          <rect x="12" y="8" width="256" height="20" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="20" y="22" fill="#ffffff" font-size="9" font-family="ui-monospace, monospace">score &gt;= 90 &rarr; 'Tier 1 (Elite)' [Exit]</text>

          <rect x="12" y="32" width="256" height="20" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="20" y="46" fill="#ffffff" font-size="9" font-family="ui-monospace, monospace">score &gt;= 70 &rarr; 'Tier 2 (Core)'  [Exit]</text>

          <rect x="12" y="56" width="256" height="20" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="20" y="70" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">score &gt;= 50 &rarr; 'Tier 3 (Pass)'  [Exit]</text>

          <rect x="12" y="80" width="256" height="20" rx="3" fill="#0c0c10" stroke="rgba(255,255,255,0.05)" stroke-width="0.8"/>
          <text x="20" y="94" fill="#71717a" font-size="9" font-family="ui-monospace, monospace">ELSE &rarr; 'Pending Evaluation'</text>
        </g>

        <line x1="348" y1="194" x2="652" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="360" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">First true branch wins; subsequent branches skipped</text>

        <path d="M 332 84 L 348 84" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 332 117 L 348 117" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 332 150 L 348 150" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 332 183 L 348 183" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>

        <path d="M 652 84 L 668 84" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 117 L 668 117" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 150 L 668 150" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 183 L 668 183" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
      </g>

      <!-- RIGHT: CLASSIFIED CATEGORIES -->
      <g opacity="${resActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(668, 12, 316, 216, 'icon-table', 'PROJECTED BUCKETS', '4 classified', step === 3 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="668" y1="62" x2="984" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="55" fill="#ffffff" font-size="9" font-weight="600">CANDIDATE</text>
        <text x="790" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">SCORE</text>
        <text x="864" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">STATUS_TIER</text>

        <text x="682" y="84" fill="#ffffff" font-size="10" font-weight="500">Danielle</text>
        <text x="790" y="84" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">94</text>
        <text x="864" y="84" fill="#ffffff" font-size="10" font-weight="700">Tier 1 (Elite)</text>
        <line x1="668" y1="95" x2="984" y2="95" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="668" y="95" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="682" y="117" fill="#ffffff" font-size="10" font-weight="500">Ethan</text>
        <text x="790" y="117" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">78</text>
        <text x="864" y="117" fill="#ffffff" font-size="10" font-weight="600">Tier 2 (Core)</text>
        <line x1="668" y1="128" x2="984" y2="128" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="682" y="150" fill="#ffffff" font-size="10" font-weight="500">Fiona</text>
        <text x="790" y="150" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">58</text>
        <text x="864" y="150" fill="#a1a1aa" font-size="10">Tier 3 (Pass)</text>
        <line x1="668" y1="161" x2="984" y2="161" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="668" y="161" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="682" y="183" fill="#ffffff" font-size="10" font-weight="500">George</text>
        <text x="790" y="183" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">NULL</text>
        <text x="864" y="183" fill="#71717a" font-size="10">Pending Eval</text>

        <line x1="668" y1="194" x2="984" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Without ELSE, unmatched rows evaluate to NULL</text>
      </g>
    `;
  }

  // --- 9. TOPIC 09: CTES & SUBQUERIES (WITH) ---
  function renderCtesSubqueriesSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: STAGE 1 CTE DEFINITION -->
      <g opacity="${srcActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(16, 12, 316, 216, 'icon-table', 'CTE 1: monthly_totals', 'materialized', step === 1 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 1 ? '1.5' : '1')}
        
        <rect x="16" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="16" y1="62" x2="332" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">MONTH</text>
        <text x="140" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">REVENUE</text>
        <text x="240" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">ORDERS</text>

        <text x="28" y="86" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">2026-01</text>
        <text x="140" y="86" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$420,000</text>
        <text x="240" y="86" fill="#71717a" font-size="9.5">1,200</text>
        <line x1="16" y1="102" x2="332" y2="102" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="102" width="316" height="38" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="126" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">2026-02</text>
        <text x="140" y="126" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$480,000</text>
        <text x="240" y="126" fill="#71717a" font-size="9.5">1,450</text>
        <line x1="16" y1="140" x2="332" y2="140" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="28" y="166" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">2026-03</text>
        <text x="140" y="166" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$520,000</text>
        <text x="240" y="166" fill="#71717a" font-size="9.5">1,600</text>

        <line x1="16" y1="194" x2="332" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Encapsulates complex aggregation into named view</text>
      </g>

      <!-- CENTER: CTE 2 ROLLING DELTA -->
      <g opacity="${opActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(348, 12, 304, 216, 'icon-cpu', 'CTE 2: mom_growth', 'chained pipeline', step === 2 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(360, 42)">
          <rect x="0" y="0" width="280" height="24" rx="4" fill="url(#gChipBg)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <text x="140" y="16" fill="#ffffff" font-size="9.5" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">WITH m1 AS (...), m2 AS (SELECT ... FROM m1)</text>
        </g>

        <g transform="translate(360, 78)">
          <rect x="0" y="0" width="280" height="106" rx="5" fill="#07070a" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          
          <text x="14" y="24" fill="#a1a1aa" font-size="9" font-family="ui-monospace, monospace">CHAINED COMPILER DAG</text>
          
          <rect x="14" y="34" width="252" height="34" rx="4" fill="#141418" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
          <text x="24" y="54" fill="#ffffff" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">rev - LAG(rev) OVER (ORDER BY m)</text>

          <text x="14" y="88" fill="#71717a" font-size="9">Optimizer Execution:</text>
          <text x="124" y="88" fill="#ffffff" font-size="9" font-weight="600">Single pipeline plan</text>
          <text x="14" y="100" fill="#52525b" font-size="8.5">Replaces deep nesting with readable step DAG</text>
        </g>

        <line x1="348" y1="194" x2="652" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="360" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Downstream query reads from previous CTE</text>

        <path d="M 332 114 L 348 114" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 114 L 668 114" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
      </g>

      <!-- RIGHT: FINAL CONSUMPTION -->
      <g opacity="${resActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(668, 12, 316, 216, 'icon-table', 'PRIMARY QUERY OUTPUT', 'final consumer', step === 3 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="668" y1="62" x2="984" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">MONTH</text>
        <text x="780" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">REVENUE</text>
        <text x="890" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">MOM_GROWTH</text>

        <text x="682" y="86" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">2026-01</text>
        <text x="780" y="86" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$420,000</text>
        <text x="890" y="86" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">NULL (Base)</text>
        <line x1="668" y1="102" x2="984" y2="102" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="668" y="102" width="316" height="38" fill="rgba(255,255,255,0.012)"/>
        <text x="682" y="126" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">2026-02</text>
        <text x="780" y="126" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$480,000</text>
        <text x="890" y="126" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">+$60,000 (+14%)</text>
        <line x1="668" y1="140" x2="984" y2="140" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="682" y="166" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">2026-03</text>
        <text x="780" y="166" fill="#ffffff" font-size="10" font-family="ui-monospace, monospace">$520,000</text>
        <text x="890" y="166" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">+$40,000 (+8.3%)</text>

        <line x1="668" y1="194" x2="984" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Clean, modular SQL without unwieldy nested subqueries</text>
      </g>
    `;
  }

  // --- 10. TOPIC 10: WINDOW FUNCTIONS (OVER, PARTITION, SLIDING FRAMES) ---
  function renderWindowFunctionsSvg(diag, step) {
    const srcActive = (step === 0 || step === 1);
    const opActive  = (step === 0 || step === 2);
    const resActive = (step === 0 || step === 3);

    return `
      <!-- LEFT: PARTITIONED ROWS -->
      <g opacity="${srcActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(16, 12, 316, 216, 'icon-db', 'ORDER STREAM', 'partitioned', step === 1 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 1 ? '1.5' : '1')}
        
        <rect x="16" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="16" y1="62" x2="332" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">DATE</text>
        <text x="120" y="55" fill="#ffffff" font-size="9" font-weight="600">REGION</text>
        <text x="250" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">DAILY_REV</text>

        <text x="28" y="84" fill="#71717a" font-size="9.5" font-family="ui-monospace, monospace">Nov 01</text>
        <text x="120" y="84" fill="#ffffff" font-size="10" font-weight="500">US-West</text>
        <text x="250" y="84" fill="#ffffff" font-size="10" font-weight="500" font-family="ui-monospace, monospace">$10,000</text>
        <line x1="16" y1="95" x2="332" y2="95" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="95" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="117" fill="#71717a" font-size="9.5" font-family="ui-monospace, monospace">Nov 02</text>
        <text x="120" y="117" fill="#ffffff" font-size="10" font-weight="500">US-West</text>
        <text x="250" y="117" fill="#ffffff" font-size="10" font-weight="500" font-family="ui-monospace, monospace">$15,000</text>
        <line x1="16" y1="128" x2="332" y2="128" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="28" y="150" fill="#71717a" font-size="9.5" font-family="ui-monospace, monospace">Nov 03</text>
        <text x="120" y="150" fill="#ffffff" font-size="10" font-weight="500">US-West</text>
        <text x="250" y="150" fill="#ffffff" font-size="10" font-weight="500" font-family="ui-monospace, monospace">$20,000</text>
        <line x1="16" y1="161" x2="332" y2="161" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="16" y="161" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="28" y="183" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">Nov 01</text>
        <text x="120" y="183" fill="#a1a1aa" font-size="10">US-East</text>
        <text x="250" y="183" fill="#a1a1aa" font-size="10" font-family="ui-monospace, monospace">$8,000</text>

        <line x1="16" y1="194" x2="332" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="28" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Zero row collapse: each input row preserves identity</text>
      </g>

      <!-- CENTER: SLIDING ACCUMULATION FRAME -->
      <g opacity="${opActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(348, 12, 304, 216, 'icon-window', 'SLIDING FRAME ACCUMULATOR', 'running sum', step === 2 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 2 ? '1.5' : '1')}
        
        <g transform="translate(360, 42)">
          <rect x="0" y="0" width="280" height="24" rx="4" fill="url(#gChipBg)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <text x="140" y="16" fill="#ffffff" font-size="9" font-weight="600" text-anchor="middle" font-family="ui-monospace, monospace">SUM(rev) OVER (PARTITION BY region ORDER BY dt)</text>
        </g>

        <g transform="translate(360, 78)">
          <rect x="0" y="0" width="280" height="106" rx="5" fill="#07070a" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          
          <rect x="12" y="8" width="256" height="26" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="20" y="24" fill="#ffffff" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">Nov 01: Frame [10k] &rarr; Running: $10,000</text>

          <rect x="12" y="38" width="256" height="26" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="20" y="54" fill="#ffffff" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">Nov 02: Frame [10k+15k] &rarr; Running: $25,000</text>

          <rect x="12" y="68" width="256" height="26" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
          <text x="20" y="84" fill="#ffffff" font-size="9.5" font-weight="600" font-family="ui-monospace, monospace">Nov 03: Frame [10k+15k+20k] &rarr; $45,000</text>
        </g>

        <line x1="348" y1="194" x2="652" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="360" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Window functions evaluate in Step 05b (after SELECT)</text>

        <path d="M 332 84 L 348 84" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 332 117 L 348 117" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 332 150 L 348 150" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>

        <path d="M 652 84 L 668 84" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 117 L 668 117" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
        <path d="M 652 150 L 668 150" stroke="#ffffff" stroke-width="1" marker-end="url(#arrowWhite)"/>
      </g>

      <!-- RIGHT: RUNNING TOTAL RESULT -->
      <g opacity="${resActive ? '1.0' : '0.24'}" class="svg-anim-layer">
        ${renderPanelShell(668, 12, 316, 216, 'icon-table', 'CALCULATED WINDOW METRIC', 'running metric', step === 3 ? '#ffffff' : 'rgba(255,255,255,0.09)', step === 3 ? '1.5' : '1')}
        
        <rect x="668" y="40" width="316" height="22" fill="#08080a"/>
        <line x1="668" y1="62" x2="984" y2="62" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="55" fill="#52525b" font-size="9" font-family="ui-monospace, monospace">DATE</text>
        <text x="750" y="55" fill="#ffffff" font-size="9" font-weight="600">REGION</text>
        <text x="836" y="55" fill="#71717a" font-size="9" font-family="ui-monospace, monospace">DAILY</text>
        <text x="906" y="55" fill="#ffffff" font-size="9" font-weight="600" font-family="ui-monospace, monospace">RUNNING_REV</text>

        <text x="682" y="84" fill="#71717a" font-size="9.5" font-family="ui-monospace, monospace">Nov 01</text>
        <text x="750" y="84" fill="#ffffff" font-size="10" font-weight="500">US-West</text>
        <text x="836" y="84" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">$10k</text>
        <text x="906" y="84" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$10,000</text>
        <line x1="668" y1="95" x2="984" y2="95" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="668" y="95" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="682" y="117" fill="#71717a" font-size="9.5" font-family="ui-monospace, monospace">Nov 02</text>
        <text x="750" y="117" fill="#ffffff" font-size="10" font-weight="500">US-West</text>
        <text x="836" y="117" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">$15k</text>
        <text x="906" y="117" fill="#ffffff" font-size="10" font-weight="600" font-family="ui-monospace, monospace">$25,000</text>
        <line x1="668" y1="128" x2="984" y2="128" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <text x="682" y="150" fill="#71717a" font-size="9.5" font-family="ui-monospace, monospace">Nov 03</text>
        <text x="750" y="150" fill="#ffffff" font-size="10" font-weight="500">US-West</text>
        <text x="836" y="150" fill="#71717a" font-size="10" font-family="ui-monospace, monospace">$20k</text>
        <text x="906" y="150" fill="#ffffff" font-size="10" font-weight="700" font-family="ui-monospace, monospace">$45,000</text>
        <line x1="668" y1="161" x2="984" y2="161" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

        <rect x="668" y="161" width="316" height="33" fill="rgba(255,255,255,0.012)"/>
        <text x="682" y="183" fill="#52525b" font-size="9.5" font-family="ui-monospace, monospace">Nov 01</text>
        <text x="750" y="183" fill="#a1a1aa" font-size="10">US-East</text>
        <text x="836" y="183" fill="#52525b" font-size="10" font-family="ui-monospace, monospace">$8k</text>
        <text x="906" y="183" fill="#a1a1aa" font-size="10" font-family="ui-monospace, monospace">$8,000</text>

        <line x1="668" y1="194" x2="984" y2="194" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="682" y="210" fill="#52525b" font-size="8.5" font-family="ui-monospace, monospace">Accumulator resets automatically on region partition boundary</text>
      </g>
    `;
  }

  // --- DISPATCHER & INTEGRATION ---
  function render(phase, step) {
    if (!phase) return '';
    const diag = phase.svgDiagram || {};
    const type = diag.type || '';
    const id = phase.id || '';
    const s = (typeof step === 'number') ? step : (parseInt(step, 10) || 0);

    let bodySvg = '';
    if (id === 'topic_01_select_from' || type === 'projection') {
      bodySvg = renderProjectionSvg(diag, s);
    } else if (id === 'topic_02_where' || type === 'filter') {
      bodySvg = renderWhereSvg(diag, s);
    } else if (id === 'topic_03_order_by_limit' || type === 'sort' || type === 'sort_limit') {
      bodySvg = renderOrderByLimitSvg(diag, s);
    } else if (id === 'topic_04_aggregates' || type === 'aggregate') {
      bodySvg = renderAggregatesSvg(diag, s);
    } else if (id === 'topic_05_group_by_having' || type === 'group' || type === 'groupby') {
      bodySvg = renderGroupBySvg(diag, s);
    } else if (id === 'topic_06_joins' || type === 'join') {
      bodySvg = renderJoinsSvg(diag, s);
    } else if (id === 'topic_07_advanced_joins_union' || type === 'union' || type === 'adv_join_set') {
      bodySvg = renderSetOpsSvg(diag, s);
    } else if (id === 'topic_08_case_when' || type === 'casewhen' || type === 'conditional_branch') {
      bodySvg = renderCaseWhenSvg(diag, s);
    } else if (id === 'topic_09_ctes_subqueries' || type === 'cte' || type === 'cte_pipeline') {
      bodySvg = renderCtesSubqueriesSvg(diag, s);
    } else if (id === 'topic_10_window_functions' || type === 'window' || type === 'window_partition') {
      bodySvg = renderWindowFunctionsSvg(diag, s);
    } else {
      bodySvg = renderProjectionSvg(diag, s);
    }

    return `
      <div class="course-svg-diagram-card">
        <svg viewBox="0 0 1000 240" class="course-explainer-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Relational Architecture Diagram">
          ${getSvgDefs()}
          <rect x="0" y="0" width="1000" height="240" rx="6" fill="#040406"/>
          ${bodySvg}
        </svg>

        <!-- Minimalist Stepper Control Bar -->
        <div class="diagram-stepper-bar">
          <div class="stepper-mode-label">
            <span class="stepper-dot"></span>
            <span>DATAFLOW PIPELINE</span>
          </div>
          <div class="stepper-btn-group">
            <button class="diagram-step-btn ${s === 0 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(0)">Overview</button>
            <button class="diagram-step-btn ${s === 1 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(1)">1. Source</button>
            <button class="diagram-step-btn ${s === 2 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(2)">2. Kernel</button>
            <button class="diagram-step-btn ${s === 3 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(3)">3. Emitted</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderSvg(topicId, diag, step) {
    return render({ id: topicId, svgDiagram: diag }, step);
  }

  return {
    render: render,
    renderSvg: renderSvg
  };
})();
