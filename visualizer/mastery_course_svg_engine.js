/**
 * SQL FOUNDRY - BESPOKE SVG EXPLAINER ARCHITECTURE ENGINE
 * Generates 10 specialized, theme-aware architectural vector diagrams
 * with interactive stepper spotlight, crisp typography, and relational metaphors.
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

  // 1. TOPIC 01: PROJECTION (SELECT & FROM)
  function renderProjectionSvg(diag, step) {
    const src = diag.sourceTable || {};
    const res = diag.resultTable || {};
    const srcOpacity = (step === 0 || step === 1) ? '1.0' : '0.35';
    const opOpacity = (step === 0 || step === 2) ? '1.0' : '0.35';
    const resOpacity = (step === 0 || step === 3) ? '1.0' : '0.35';

    return `
      <!-- Layer 1: Source Table Scan -->
      <g opacity="${srcOpacity}" class="svg-anim-layer">
        <rect x="24" y="24" width="310" height="280" rx="14" class="svg-panel-bg" stroke="${step === 1 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 1 ? '2.5' : '1.2'}"/>
        <path d="M 24 38 Q 24 24 38 24 L 320 24 Q 334 24 334 38 L 334 66 L 24 66 Z" class="svg-panel-header"/>
        <text x="42" y="50" class="svg-text-title">📁 ${escapeXml(src.name || 'FROM Employees')}</text>

        <text x="36" y="86" class="svg-text-col" fill="#71717a">id</text>
        <text x="68" y="86" class="svg-text-col" fill="var(--accent)" font-weight="800">first_name ★</text>
        <text x="144" y="86" class="svg-text-col" fill="#71717a">dept</text>
        <text x="246" y="86" class="svg-text-col" fill="var(--accent)" font-weight="800">salary ★</text>
        <line x1="30" y1="94" x2="328" y2="94" stroke="var(--border-default)" stroke-width="1"/>

        <rect x="30" y="104" width="298" height="34" rx="6" class="svg-row-even"/>
        <text x="36" y="126" class="svg-text-cell svg-mono" fill="#a1a1aa">101</text>
        <text x="68" y="126" class="svg-text-cell" font-weight="700" fill="var(--accent)">Ashley</text>
        <text x="144" y="126" class="svg-text-cell" fill="#a1a1aa">Analytics</text>
        <text x="246" y="126" class="svg-text-cell svg-mono" font-weight="700" fill="var(--accent)">$115,000</text>

        <rect x="30" y="144" width="298" height="34" rx="6" class="svg-row-odd"/>
        <text x="36" y="166" class="svg-text-cell svg-mono" fill="#a1a1aa">102</text>
        <text x="68" y="166" class="svg-text-cell" font-weight="700" fill="var(--accent)">David</text>
        <text x="144" y="166" class="svg-text-cell" fill="#a1a1aa">Eng</text>
        <text x="246" y="166" class="svg-text-cell svg-mono" font-weight="700" fill="var(--accent)">$125,000</text>

        <rect x="30" y="184" width="298" height="34" rx="6" class="svg-row-even"/>
        <text x="36" y="206" class="svg-text-cell svg-mono" fill="#a1a1aa">103</text>
        <text x="68" y="206" class="svg-text-cell" font-weight="700" fill="var(--accent)">Julia</text>
        <text x="144" y="206" class="svg-text-cell" fill="#a1a1aa">Analytics</text>
        <text x="246" y="206" class="svg-text-cell svg-mono" font-weight="700" fill="var(--accent)">$95,000</text>

        <rect x="30" y="224" width="298" height="34" rx="6" class="svg-row-odd"/>
        <text x="36" y="246" class="svg-text-cell svg-mono" fill="#a1a1aa">104</text>
        <text x="68" y="246" class="svg-text-cell" font-weight="700" fill="var(--accent)">Carlos</text>
        <text x="144" y="246" class="svg-text-cell" fill="#a1a1aa">Eng</text>
        <text x="246" y="246" class="svg-text-cell svg-mono" font-weight="700" fill="var(--accent)">$72,000</text>

        <rect x="34" y="266" width="290" height="24" rx="6" fill="rgba(161, 161, 170, 0.1)"/>
        <text x="179" y="282" text-anchor="middle" font-size="10.5" fill="var(--text-muted)">Unselected Columns [id, dept, tenure] Pruned</text>
      </g>

      <!-- Layer 2: Projection & Arithmetic Conduit -->
      <g opacity="${opOpacity}" class="svg-anim-layer">
        <rect x="354" y="30" width="260" height="38" rx="19" fill="url(#gAccentGrad)" filter="url(#svgSoftShadow)"/>
        <text x="484" y="54" text-anchor="middle" fill="#ffffff" font-weight="800" font-size="12">⚡ SELECT first_name, salary * 1.10</text>

        <path d="M 334 126 C 410 126, 430 140, 630 126" stroke="var(--accent)" stroke-width="2.5" stroke-dasharray="6,4" fill="none" marker-end="url(#arrowAccent)"/>
        <path d="M 334 166 C 410 166, 430 166, 630 166" stroke="var(--accent)" stroke-width="2.5" stroke-dasharray="6,4" fill="none" marker-end="url(#arrowAccent)"/>
        <path d="M 334 206 C 410 206, 430 190, 630 206" stroke="var(--accent)" stroke-width="2.5" stroke-dasharray="6,4" fill="none" marker-end="url(#arrowAccent)"/>

        <rect x="354" y="94" width="260" height="190" rx="12" class="svg-panel-bg" stroke="${step === 2 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 2 ? '2' : '1'}" filter="url(#svgSoftShadow)"/>
        <rect x="366" y="106" width="140" height="22" rx="6" fill="var(--accent-soft)"/>
        <text x="372" y="121" font-size="10.5" font-weight="800" fill="var(--accent)">💡 Arithmetic In-Flight</text>
        <text x="368" y="148" font-size="11.5" class="svg-text-cell">Expressions evaluate per tuple:</text>
        <rect x="366" y="156" width="236" height="36" rx="6" fill="var(--bg-card-subtle)" stroke="var(--border-subtle)" stroke-width="1"/>
        <text x="374" y="179" class="svg-mono" font-size="11" fill="var(--accent)">salary * 1.10 AS projected_comp</text>
        <text x="368" y="214" font-size="11" class="svg-text-cell" fill="var(--text-muted)">The calculated expression is</text>
        <text x="368" y="230" font-size="11" class="svg-text-cell" fill="var(--text-muted)">materialized in RAM without</text>
        <text x="368" y="246" font-size="11" class="svg-text-cell" fill="var(--text-muted)">mutating disk storage.</text>
        <rect x="366" y="256" width="236" height="20" rx="4" fill="rgba(16, 185, 129, 0.1)"/>
        <text x="484" y="270" text-anchor="middle" font-size="10" font-weight="700" fill="#059669">✓ Memory Projection: 0 Disk Writes</text>
      </g>

      <!-- Layer 3: Emitted Result Table -->
      <g opacity="${resOpacity}" class="svg-anim-layer">
        <rect x="634" y="24" width="320" height="280" rx="14" class="svg-panel-bg" stroke="${step === 3 ? '#10b981' : 'var(--border-default)'}" stroke-width="${step === 3 ? '2.5' : '1.2'}"/>
        <path d="M 634 38 Q 634 24 648 24 L 940 24 Q 954 24 954 38 L 954 66 L 634 66 Z" fill="rgba(16, 185, 129, 0.12)"/>
        <text x="652" y="50" class="svg-text-title" fill="#047857">✨ Projected Result (2 Columns)</text>

        <text x="654" y="86" class="svg-text-col" fill="#047857">first_name</text>
        <text x="790" y="86" class="svg-text-col" fill="#047857">projected_comp (+10%)</text>
        <line x1="644" y1="94" x2="944" y2="94" stroke="#a7f3d0" stroke-width="1"/>

        <rect x="644" y="104" width="300" height="34" rx="6" class="svg-row-match"/>
        <text x="654" y="126" class="svg-text-cell-match">Ashley</text>
        <text x="790" y="126" class="svg-text-cell-match svg-mono">$126,500.00</text>

        <rect x="644" y="144" width="300" height="34" rx="6" class="svg-row-match"/>
        <text x="654" y="166" class="svg-text-cell-match">David</text>
        <text x="790" y="166" class="svg-text-cell-match svg-mono">$137,500.00</text>

        <rect x="644" y="184" width="300" height="34" rx="6" class="svg-row-match"/>
        <text x="654" y="206" class="svg-text-cell-match">Julia</text>
        <text x="790" y="206" class="svg-text-cell-match svg-mono">$104,500.00</text>

        <rect x="644" y="224" width="300" height="34" rx="6" class="svg-row-match"/>
        <text x="654" y="246" class="svg-text-cell-match">Carlos</text>
        <text x="790" y="246" class="svg-text-cell-match svg-mono">$79,200.00</text>

        <rect x="644" y="266" width="300" height="24" rx="6" fill="rgba(16, 185, 129, 0.15)"/>
        <text x="794" y="282" text-anchor="middle" font-size="10.5" font-weight="700" fill="#047857">✓ 4 Tuples Emitted • 2 Column Schema</text>
      </g>
    `;
  }

  // 2. TOPIC 02: PREDICATE SIEVE (WHERE & 3VL)
  function renderFilterSvg(diag, step) {
    const srcOpacity = (step === 0 || step === 1) ? '1.0' : '0.35';
    const opOpacity = (step === 0 || step === 2) ? '1.0' : '0.35';
    const resOpacity = (step === 0 || step === 3) ? '1.0' : '0.35';

    return `
      <!-- Source Rows Entering Sieve -->
      <g opacity="${srcOpacity}" class="svg-anim-layer">
        <rect x="24" y="24" width="280" height="280" rx="14" class="svg-panel-bg" stroke="${step === 1 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 1 ? '2.5' : '1.2'}"/>
        <path d="M 24 38 Q 24 24 38 24 L 290 24 Q 304 24 304 38 L 304 66 L 24 66 Z" class="svg-panel-header"/>
        <text x="42" y="50" class="svg-text-title">📥 4 Candidate Rows</text>

        <rect x="36" y="80" width="256" height="46" rx="8" class="svg-row-even"/>
        <text x="48" y="102" class="svg-text-cell" font-weight="700">David</text>
        <text x="140" y="102" class="svg-text-cell" fill="#71717a">Engineering</text>
        <text x="48" y="118" class="svg-mono" font-size="11" fill="var(--accent)">$125,000</text>

        <rect x="36" y="134" width="256" height="46" rx="8" class="svg-row-odd"/>
        <text x="48" y="156" class="svg-text-cell" font-weight="700">Ashley</text>
        <text x="140" y="156" class="svg-text-cell" fill="#71717a">Analytics</text>
        <text x="48" y="172" class="svg-mono" font-size="11" fill="var(--text-muted)">$115,000</text>

        <rect x="36" y="188" width="256" height="46" rx="8" class="svg-row-even"/>
        <text x="48" y="210" class="svg-text-cell" font-weight="700">Carlos</text>
        <text x="140" y="210" class="svg-text-cell" fill="#71717a">Engineering</text>
        <text x="48" y="226" class="svg-mono" font-size="11" fill="var(--text-muted)">$72,000</text>

        <rect x="36" y="242" width="256" height="46" rx="8" class="svg-row-odd"/>
        <text x="48" y="264" class="svg-text-cell" font-weight="700">Sara</text>
        <text x="140" y="264" class="svg-text-cell" fill="#71717a">Engineering</text>
        <text x="48" y="280" class="svg-mono" font-size="11" fill="#f59e0b">NULL (Unknown)</text>
      </g>

      <!-- Center Predicate Filter Sieve -->
      <g opacity="${opOpacity}" class="svg-anim-layer">
        <rect x="326" y="24" width="310" height="280" rx="14" class="svg-panel-bg" stroke="${step === 2 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 2 ? '2' : '1.2'}" filter="url(#svgSoftShadow)"/>
        
        <!-- Sieve Header -->
        <rect x="338" y="36" width="286" height="34" rx="8" fill="var(--accent-soft)" stroke="var(--accent-border)" stroke-width="1"/>
        <text x="481" y="58" text-anchor="middle" font-weight="800" font-size="11.5" fill="var(--accent)">🔍 WHERE salary >= 100k AND dept = 'Eng'</text>

        <!-- Dynamic Filter Gates -->
        <g transform="translate(340, 84)">
          <!-- Row 1: David => Passes -->
          <rect x="0" y="0" width="282" height="34" rx="6" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="1.2"/>
          <text x="12" y="22" font-size="11" font-weight="700" fill="#065f46">David: Eng ($125k >= 100k)</text>
          <rect x="220" y="6" width="54" height="22" rx="4" fill="#10b981"/>
          <text x="247" y="21" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">TRUE ✓</text>

          <!-- Row 2: Ashley => Fails dept -->
          <rect x="0" y="42" width="282" height="34" rx="6" fill="rgba(225, 29, 72, 0.08)" stroke="#f43f5e" stroke-width="1"/>
          <text x="12" y="64" font-size="11" fill="#9f1239">Ashley: Dept = Analytics ≠ Eng</text>
          <rect x="214" y="48" width="60" height="22" rx="4" fill="#e11d48"/>
          <text x="244" y="63" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">FALSE ✕</text>

          <!-- Row 3: Carlos => Fails salary -->
          <rect x="0" y="84" width="282" height="34" rx="6" fill="rgba(225, 29, 72, 0.08)" stroke="#f43f5e" stroke-width="1"/>
          <text x="12" y="106" font-size="11" fill="#9f1239">Carlos: $72k &lt; 100k</text>
          <rect x="214" y="90" width="60" height="22" rx="4" fill="#e11d48"/>
          <text x="244" y="105" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">FALSE ✕</text>

          <!-- Row 4: Sara => 3VL NULL -->
          <rect x="0" y="126" width="282" height="34" rx="6" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" stroke-width="1.2"/>
          <text x="12" y="148" font-size="11" font-weight="600" fill="#b45309">Sara: NULL >= 100k</text>
          <rect x="200" y="132" width="74" height="22" rx="4" fill="#f59e0b"/>
          <text x="237" y="147" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">UNKNOWN ⚠️</text>
        </g>

        <!-- 3VL Rule Banner -->
        <rect x="338" y="254" width="286" height="38" rx="8" fill="var(--bg-card-subtle)" stroke="var(--border-subtle)" stroke-width="1"/>
        <text x="481" y="270" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-secondary)">Three-Valued Logic Rule: WHERE keeps ONLY TRUE</text>
        <text x="481" y="284" text-anchor="middle" font-size="10" fill="var(--text-muted)">FALSE and UNKNOWN are immediately dropped.</text>
      </g>

      <!-- Emitted Surviving Tuples (Right) -->
      <g opacity="${resOpacity}" class="svg-anim-layer">
        <rect x="658" y="24" width="298" height="280" rx="14" class="svg-panel-bg" stroke="${step === 3 ? '#10b981' : 'var(--border-default)'}" stroke-width="${step === 3 ? '2.5' : '1.2'}"/>
        <path d="M 658 38 Q 658 24 672 24 L 942 24 Q 956 24 956 38 L 956 66 L 658 66 Z" fill="rgba(16, 185, 129, 0.12)"/>
        <text x="674" y="50" class="svg-text-title" fill="#047857">✨ Filtered Survivors (1 Row)</text>

        <rect x="670" y="90" width="274" height="54" rx="8" class="svg-row-match"/>
        <text x="684" y="114" class="svg-text-cell-match" font-size="13" font-weight="800">David (Engineering)</text>
        <text x="684" y="132" class="svg-mono" font-size="11.5" fill="#065f46">Salary: $125,000.00 • ID: 102</text>

        <!-- Pruned summary bin -->
        <rect x="670" y="160" width="274" height="96" rx="8" class="svg-row-discard"/>
        <text x="684" y="184" class="svg-text-cell-discard" font-weight="700">🗑️ 3 Rows Pruned by Predicate:</text>
        <text x="684" y="204" font-size="11" fill="#b91c1c">• Ashley (Dept mismatch: Analytics)</text>
        <text x="684" y="222" font-size="11" fill="#b91c1c">• Carlos (Salary threshold: $72k &lt; $100k)</text>
        <text x="684" y="240" font-size="11" fill="#b91c1c">• Sara (NULL comparison UNKNOWN)</text>

        <rect x="670" y="266" width="274" height="24" rx="6" fill="rgba(16, 185, 129, 0.15)"/>
        <text x="807" y="282" text-anchor="middle" font-size="10.5" font-weight="700" fill="#047857">✓ Sargable Index Seek: 1 Match</text>
      </g>
    `;
  }

  // 3. TOPIC 03: SORTING & LIMITING (ORDER BY & LIMIT)
  function renderSortLimitSvg(diag, step) {
    const srcOpacity = (step === 0 || step === 1) ? '1.0' : '0.35';
    const opOpacity = (step === 0 || step === 2) ? '1.0' : '0.35';
    const resOpacity = (step === 0 || step === 3) ? '1.0' : '0.35';

    return `
      <!-- Unsorted Stream -->
      <g opacity="${srcOpacity}" class="svg-anim-layer">
        <rect x="24" y="24" width="260" height="280" rx="14" class="svg-panel-bg" stroke="${step === 1 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 1 ? '2.5' : '1.2'}"/>
        <path d="M 24 38 Q 24 24 38 24 L 270 24 Q 284 24 284 38 L 284 66 L 24 66 Z" class="svg-panel-header"/>
        <text x="42" y="50" class="svg-text-title">🎲 Unordered Disk Storage</text>

        <g transform="translate(36, 80)">
          <rect x="0" y="0" width="236" height="34" rx="6" class="svg-row-even"/>
          <text x="14" y="22" class="svg-text-cell">Ashley: $115,000</text>
          
          <rect x="0" y="42" width="236" height="34" rx="6" class="svg-row-odd"/>
          <text x="14" y="64" class="svg-text-cell">David: $125,000</text>
          
          <rect x="0" y="84" width="236" height="34" rx="6" class="svg-row-even"/>
          <text x="14" y="106" class="svg-text-cell">Julia: $95,000</text>

          <rect x="0" y="126" width="236" height="34" rx="6" class="svg-row-odd"/>
          <text x="14" y="148" class="svg-text-cell">Carlos: $72,000</text>

          <rect x="0" y="168" width="236" height="34" rx="6" class="svg-row-even"/>
          <text x="14" y="190" class="svg-text-cell">Elena: $105,000</text>
        </g>
        <text x="154" y="286" text-anchor="middle" font-size="10.5" fill="var(--text-muted)">Relational sets have NO inherent order!</text>
      </g>

      <!-- Center Sorting Ladder & Limit Bracket -->
      <g opacity="${opOpacity}" class="svg-anim-layer">
        <rect x="306" y="24" width="340" height="280" rx="14" class="svg-panel-bg" stroke="${step === 2 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 2 ? '2' : '1.2'}" filter="url(#svgSoftShadow)"/>
        
        <rect x="318" y="34" width="316" height="32" rx="16" fill="url(#gAccentGrad)"/>
        <text x="476" y="55" text-anchor="middle" font-size="11.5" font-weight="800" fill="#ffffff">⚡ ORDER BY salary DESC LIMIT 3</text>

        <!-- Sorted Comparator Ladder -->
        <g transform="translate(320, 78)">
          <!-- Rank 1: David -->
          <rect x="0" y="0" width="240" height="32" rx="6" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="1"/>
          <text x="12" y="21" font-size="11" font-weight="700" fill="#047857">1. David: $125,000</text>
          
          <!-- Rank 2: Ashley -->
          <rect x="0" y="38" width="240" height="32" rx="6" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="1"/>
          <text x="12" y="59" font-size="11" font-weight="700" fill="#047857">2. Ashley: $115,000</text>

          <!-- Rank 3: Elena -->
          <rect x="0" y="76" width="240" height="32" rx="6" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="1"/>
          <text x="12" y="97" font-size="11" font-weight="700" fill="#047857">3. Elena: $105,000</text>

          <!-- Bracket for LIMIT 3 -->
          <path d="M 248 4 L 260 4 L 260 52 L 272 52 L 260 52 L 260 104 L 248 104" stroke="var(--accent)" stroke-width="2.5" fill="none"/>
          <text x="282" y="56" font-size="11" font-weight="800" fill="var(--accent)">LIMIT 3</text>

          <!-- Cutoff Line -->
          <line x1="0" y1="116" x2="310" y2="116" stroke="#e11d48" stroke-width="2" stroke-dasharray="6,4"/>
          <text x="155" y="132" text-anchor="middle" font-size="10" font-weight="800" fill="#e11d48">✂️ LIMIT Slicing Boundary (Discard Below)</text>

          <!-- Discarded Rank 4 & 5 -->
          <rect x="0" y="142" width="240" height="26" rx="4" fill="rgba(161, 161, 170, 0.1)"/>
          <text x="12" y="159" font-size="10.5" fill="#a1a1aa">4. Julia: $95,000 (Pruned)</text>

          <rect x="0" y="174" width="240" height="26" rx="4" fill="rgba(161, 161, 170, 0.1)"/>
          <text x="12" y="191" font-size="10.5" fill="#a1a1aa">5. Carlos: $72,000 (Pruned)</text>
        </g>
      </g>

      <!-- Emitted Top-3 Result (Right) -->
      <g opacity="${resOpacity}" class="svg-anim-layer">
        <rect x="668" y="24" width="288" height="280" rx="14" class="svg-panel-bg" stroke="${step === 3 ? '#10b981' : 'var(--border-default)'}" stroke-width="${step === 3 ? '2.5' : '1.2'}"/>
        <path d="M 668 38 Q 668 24 682 24 L 942 24 Q 956 24 956 38 L 956 66 L 668 66 Z" fill="rgba(16, 185, 129, 0.12)"/>
        <text x="684" y="50" class="svg-text-title" fill="#047857">✨ Top-3 Earners Slice</text>

        <rect x="680" y="80" width="264" height="42" rx="6" class="svg-row-match"/>
        <text x="694" y="106" class="svg-text-cell-match" font-weight="700">🥇 David — $125,000</text>

        <rect x="680" y="130" width="264" height="42" rx="6" class="svg-row-match"/>
        <text x="694" y="156" class="svg-text-cell-match" font-weight="700">🥈 Ashley — $115,000</text>

        <rect x="680" y="180" width="264" height="42" rx="6" class="svg-row-match"/>
        <text x="694" y="206" class="svg-text-cell-match" font-weight="700">🥉 Elena — $105,000</text>

        <rect x="680" y="244" width="264" height="42" rx="8" fill="var(--bg-card-subtle)" stroke="var(--border-subtle)" stroke-width="1"/>
        <text x="812" y="262" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text-secondary)">Deterministic Sort Safety:</text>
        <text x="812" y="276" text-anchor="middle" font-size="10" fill="var(--text-muted)">Add unique id tiebreaker for stable pagination!</text>
      </g>
    `;
  }

  // 4. TOPIC 04: AGGREGATES (SUM, AVG, COUNT, MIN, MAX)
  function renderAggregateSvg(diag, step) {
    const srcOpacity = (step === 0 || step === 1) ? '1.0' : '0.35';
    const opOpacity = (step === 0 || step === 2) ? '1.0' : '0.35';
    const resOpacity = (step === 0 || step === 3) ? '1.0' : '0.35';

    return `
      <!-- Multi-Row Source Table -->
      <g opacity="${srcOpacity}" class="svg-anim-layer">
        <rect x="24" y="24" width="270" height="280" rx="14" class="svg-panel-bg" stroke="${step === 1 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 1 ? '2.5' : '1.2'}"/>
        <path d="M 24 38 Q 24 24 38 24 L 280 24 Q 294 24 294 38 L 294 66 L 24 66 Z" class="svg-panel-header"/>
        <text x="42" y="50" class="svg-text-title">📊 5 Employee Rows</text>

        <g transform="translate(36, 78)">
          <rect x="0" y="0" width="246" height="34" rx="6" class="svg-row-even"/>
          <text x="14" y="22" class="svg-text-cell">Ashley: $115,000</text>
          
          <rect x="0" y="40" width="246" height="34" rx="6" class="svg-row-odd"/>
          <text x="14" y="62" class="svg-text-cell">David: $125,000</text>
          
          <rect x="0" y="80" width="246" height="34" rx="6" class="svg-row-even"/>
          <text x="14" y="102" class="svg-text-cell">Julia: $95,000</text>

          <rect x="0" y="120" width="246" height="34" rx="6" class="svg-row-odd"/>
          <text x="14" y="142" class="svg-text-cell">Carlos: $72,000</text>

          <rect x="0" y="160" width="246" height="34" rx="6" class="svg-row-even"/>
          <text x="14" y="182" class="svg-text-cell">Elena: $137,000</text>
        </g>
        <text x="159" y="286" text-anchor="middle" font-size="10.5" fill="var(--text-muted)">Input: N Tuples Scan Stream</text>
      </g>

      <!-- Center Funnel Compressor Core -->
      <g opacity="${opOpacity}" class="svg-anim-layer">
        <!-- Tapered Funnel Vector -->
        <path d="M 314 50 L 580 110 L 580 200 L 314 260 Z" fill="url(#gAccentGrad)" opacity="0.12" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="6,4"/>
        
        <rect x="330" y="24" width="230" height="34" rx="17" fill="url(#gAccentGrad)" filter="url(#svgSoftShadow)"/>
        <text x="445" y="46" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">🌀 Funnel Accumulator</text>

        <!-- Funnel Core Accumulator Box -->
        <rect x="340" y="76" width="220" height="170" rx="12" class="svg-panel-bg" stroke="${step === 2 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 2 ? '2' : '1.2'}" filter="url(#svgSoftShadow)"/>
        
        <text x="450" y="104" text-anchor="middle" font-size="11.5" font-weight="800" fill="var(--accent)">O(1) Streaming Math</text>
        
        <g transform="translate(352, 116)">
          <text x="0" y="18" font-size="11" class="svg-mono" fill="var(--text-secondary)">COUNT(*) += 1</text>
          <text x="120" y="18" font-size="11" class="svg-mono" font-weight="700" fill="var(--accent)">→ 5</text>

          <text x="0" y="42" font-size="11" class="svg-mono" fill="var(--text-secondary)">SUM(salary) += row</text>
          <text x="120" y="42" font-size="11" class="svg-mono" font-weight="700" fill="var(--accent)">→ $544,000</text>

          <text x="0" y="66" font-size="11" class="svg-mono" fill="var(--text-secondary)">AVG = SUM / COUNT</text>
          <text x="120" y="66" font-size="11" class="svg-mono" font-weight="700" fill="var(--accent)">→ $108,800</text>

          <text x="0" y="90" font-size="11" class="svg-mono" fill="var(--text-secondary)">MAX(salary)</text>
          <text x="120" y="90" font-size="11" class="svg-mono" font-weight="700" fill="var(--accent)">→ $137,000</text>
        </g>

        <!-- Memory note -->
        <rect x="330" y="258" width="240" height="34" rx="8" fill="var(--bg-card-subtle)" stroke="var(--border-subtle)" stroke-width="1"/>
        <text x="450" y="274" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-secondary)">O(1) Memory Register Consumption</text>
        <text x="450" y="286" text-anchor="middle" font-size="9.5" fill="var(--text-muted)">Does not retain individual rows in RAM!</text>
      </g>

      <!-- Emitted Single Scalar Rollup (Right) -->
      <g opacity="${resOpacity}" class="svg-anim-layer">
        <rect x="620" y="24" width="336" height="280" rx="14" class="svg-panel-bg" stroke="${step === 3 ? '#10b981' : 'var(--border-default)'}" stroke-width="${step === 3 ? '2.5' : '1.2'}"/>
        <path d="M 620 38 Q 620 24 634 24 L 942 24 Q 956 24 956 38 L 956 66 L 620 66 Z" fill="rgba(16, 185, 129, 0.12)"/>
        <text x="636" y="50" class="svg-text-title" fill="#047857">✨ Scalar Summary (1 Collapsed Row)</text>

        <g transform="translate(636, 84)">
          <rect x="0" y="0" width="304" height="42" rx="8" class="svg-row-match"/>
          <text x="14" y="26" font-size="12" font-weight="700" fill="#047857">Headcount (COUNT):</text>
          <text x="210" y="26" class="svg-mono" font-size="14" font-weight="800" fill="#065f46">5</text>

          <rect x="0" y="50" width="304" height="42" rx="8" class="svg-row-match"/>
          <text x="14" y="76" font-size="12" font-weight="700" fill="#047857">Total Payroll (SUM):</text>
          <text x="180" y="76" class="svg-mono" font-size="13.5" font-weight="800" fill="#065f46">$544,000.00</text>

          <rect x="0" y="100" width="304" height="42" rx="8" class="svg-row-match"/>
          <text x="14" y="126" font-size="12" font-weight="700" fill="#047857">Average Salary (AVG):</text>
          <text x="180" y="126" class="svg-mono" font-size="13.5" font-weight="800" fill="#065f46">$108,800.00</text>

          <rect x="0" y="150" width="304" height="42" rx="8" class="svg-row-match"/>
          <text x="14" y="176" font-size="12" font-weight="700" fill="#047857">Top Earner (MAX):</text>
          <text x="180" y="176" class="svg-mono" font-size="13.5" font-weight="800" fill="#065f46">$137,000.00</text>
        </g>
      </g>
    `;
  }

  // 5. TOPIC 05: GROUP BY & HAVING
  function renderGroupBySvg(diag, step) {
    const srcOpacity = (step === 0 || step === 1) ? '1.0' : '0.35';
    const opOpacity = (step === 0 || step === 2) ? '1.0' : '0.35';
    const resOpacity = (step === 0 || step === 3) ? '1.0' : '0.35';

    return `
      <!-- Input Mixed Tuples -->
      <g opacity="${srcOpacity}" class="svg-anim-layer">
        <rect x="24" y="24" width="240" height="280" rx="14" class="svg-panel-bg" stroke="${step === 1 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 1 ? '2.5' : '1.2'}"/>
        <path d="M 24 38 Q 24 24 38 24 L 250 24 Q 264 24 264 38 L 264 66 L 24 66 Z" class="svg-panel-header"/>
        <text x="38" y="50" class="svg-text-title">📥 5 Mixed Tuples</text>

        <g transform="translate(36, 78)">
          <rect x="0" y="0" width="216" height="32" rx="6" fill="rgba(59, 130, 246, 0.1)"/>
          <text x="10" y="21" font-size="11" fill="#1d4ed8">David (Eng)</text>

          <rect x="0" y="38" width="216" height="32" rx="6" fill="rgba(245, 158, 11, 0.1)"/>
          <text x="10" y="59" font-size="11" fill="#b45309">Ashley (Analytics)</text>

          <rect x="0" y="76" width="216" height="32" rx="6" fill="rgba(59, 130, 246, 0.1)"/>
          <text x="10" y="97" font-size="11" fill="#1d4ed8">Carlos (Eng)</text>

          <rect x="0" y="114" width="216" height="32" rx="6" fill="rgba(245, 158, 11, 0.1)"/>
          <text x="10" y="135" font-size="11" fill="#b45309">Julia (Analytics)</text>

          <rect x="0" y="152" width="216" height="32" rx="6" fill="rgba(59, 130, 246, 0.1)"/>
          <text x="10" y="173" font-size="11" fill="#1d4ed8">Sara (Eng)</text>
        </g>
        <text x="144" y="286" text-anchor="middle" font-size="10.5" fill="var(--text-muted)">Unbucketed stream</text>
      </g>

      <!-- Center Bucketing Chamber & HAVING Gate -->
      <g opacity="${opOpacity}" class="svg-anim-layer">
        <rect x="284" y="24" width="370" height="280" rx="14" class="svg-panel-bg" stroke="${step === 2 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 2 ? '2' : '1.2'}" filter="url(#svgSoftShadow)"/>
        
        <rect x="296" y="34" width="346" height="30" rx="15" fill="url(#gAccentGrad)"/>
        <text x="469" y="54" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">⚡ GROUP BY dept HAVING COUNT(*) >= 3</text>

        <!-- Bucket 1: Engineering -->
        <g transform="translate(296, 74)">
          <rect x="0" y="0" width="346" height="84" rx="8" fill="rgba(59, 130, 246, 0.08)" stroke="#3b82f6" stroke-width="1.2"/>
          <text x="12" y="20" font-size="11" font-weight="800" fill="#1d4ed8">🗂️ Bucket: Engineering (3 Rows)</text>
          <text x="12" y="38" font-size="10" fill="var(--text-muted)">Contains: David, Carlos, Sara</text>
          <rect x="12" y="48" width="160" height="24" rx="4" fill="var(--bg-card)"/>
          <text x="20" y="64" font-size="10.5" class="svg-mono" font-weight="700" fill="#1d4ed8">COUNT(*) = 3</text>
          <!-- HAVING Pass Gate -->
          <rect x="236" y="26" width="98" height="32" rx="6" fill="#10b981"/>
          <text x="285" y="47" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">PASSES ✓</text>
        </g>

        <!-- Bucket 2: Analytics -->
        <g transform="translate(296, 168)">
          <rect x="0" y="0" width="346" height="84" rx="8" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1"/>
          <text x="12" y="20" font-size="11" font-weight="800" fill="#b45309">🗂️ Bucket: Analytics (2 Rows)</text>
          <text x="12" y="38" font-size="10" fill="var(--text-muted)">Contains: Ashley, Julia</text>
          <rect x="12" y="48" width="160" height="24" rx="4" fill="var(--bg-card)"/>
          <text x="20" y="64" font-size="10.5" class="svg-mono" font-weight="700" fill="#b45309">COUNT(*) = 2</text>
          <!-- HAVING Drop Gate -->
          <rect x="236" y="26" width="98" height="32" rx="6" fill="#e11d48"/>
          <text x="285" y="47" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">DROPPED ✕</text>
        </g>

        <text x="469" y="284" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-secondary)">HAVING filters groups AFTER bucketing; WHERE filters BEFORE</text>
      </g>

      <!-- Emitted Surviving Group (Right) -->
      <g opacity="${resOpacity}" class="svg-anim-layer">
        <rect x="674" y="24" width="282" height="280" rx="14" class="svg-panel-bg" stroke="${step === 3 ? '#10b981' : 'var(--border-default)'}" stroke-width="${step === 3 ? '2.5' : '1.2'}"/>
        <path d="M 674 38 Q 674 24 688 24 L 942 24 Q 956 24 956 38 L 956 66 L 674 66 Z" fill="rgba(16, 185, 129, 0.12)"/>
        <text x="690" y="50" class="svg-text-title" fill="#047857">✨ Filtered Group Rollup</text>

        <rect x="686" y="86" width="258" height="80" rx="10" class="svg-row-match"/>
        <text x="702" y="112" class="svg-text-cell-match" font-size="13" font-weight="800">department: Engineering</text>
        <text x="702" y="134" class="svg-mono" font-size="12" fill="#065f46">headcount (COUNT): 3</text>
        <text x="702" y="152" class="svg-mono" font-size="12" fill="#065f46">avg_salary: $90,666.67</text>

        <rect x="686" y="180" width="258" height="74" rx="8" class="svg-row-discard"/>
        <text x="702" y="204" class="svg-text-cell-discard" font-weight="700">Analytics Group Discarded:</text>
        <text x="702" y="224" font-size="10.5" fill="#991b1b">Failed HAVING COUNT(*) >= 3</text>
        <text x="702" y="240" font-size="10.5" fill="#991b1b">Threshold (Headcount = 2)</text>

        <rect x="686" y="264" width="258" height="24" rx="6" fill="rgba(16, 185, 129, 0.15)"/>
        <text x="815" y="280" text-anchor="middle" font-size="10.5" font-weight="700" fill="#047857">✓ Single-Value Rule Satisfied</text>
      </g>
    `;
  }

  // 6. TOPIC 06: INNER & LEFT JOIN (PK to FK Relational Linking)
  function renderJoinSvg(diag, step) {
    const srcOpacity = (step === 0 || step === 1) ? '1.0' : '0.35';
    const opOpacity = (step === 0 || step === 2) ? '1.0' : '0.35';
    const resOpacity = (step === 0 || step === 3) ? '1.0' : '0.35';

    return `
      <!-- Left & Right Tables -->
      <g opacity="${srcOpacity}" class="svg-anim-layer">
        <!-- Customers Table (Left) -->
        <rect x="24" y="24" width="210" height="280" rx="14" class="svg-panel-bg" stroke="${step === 1 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 1 ? '2' : '1.2'}"/>
        <path d="M 24 38 Q 24 24 38 24 L 220 24 Q 234 24 234 38 L 234 62 L 24 62 Z" class="svg-panel-header"/>
        <text x="36" y="48" class="svg-text-title" font-size="11.5">Customers (c)</text>

        <g transform="translate(34, 74)">
          <rect x="0" y="0" width="190" height="34" rx="6" fill="rgba(59, 130, 246, 0.1)"/>
          <text x="10" y="22" font-size="11" class="svg-mono" font-weight="700" fill="#1d4ed8">id: 1 • Alice</text>

          <rect x="0" y="44" width="190" height="34" rx="6" fill="rgba(59, 130, 246, 0.1)"/>
          <text x="10" y="66" font-size="11" class="svg-mono" font-weight="700" fill="#1d4ed8">id: 2 • Bob</text>

          <rect x="0" y="88" width="190" height="34" rx="6" fill="rgba(245, 158, 11, 0.1)"/>
          <text x="10" y="110" font-size="11" class="svg-mono" font-weight="700" fill="#b45309">id: 3 • Charlie</text>
        </g>
        <text x="129" y="220" text-anchor="middle" font-size="10" fill="var(--text-muted)">Charlie has 0 orders!</text>
        <text x="129" y="286" text-anchor="middle" font-size="10.5" fill="var(--text-muted)">Left Primary Table</text>

        <!-- Orders Table (Right of Left) -->
        <rect x="250" y="24" width="220" height="280" rx="14" class="svg-panel-bg" stroke="${step === 1 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 1 ? '2' : '1.2'}"/>
        <path d="M 250 38 Q 250 24 264 24 L 456 24 Q 470 24 470 38 L 470 62 L 250 62 Z" class="svg-panel-header"/>
        <text x="262" y="48" class="svg-text-title" font-size="11.5">Orders (o)</text>

        <g transform="translate(260, 74)">
          <rect x="0" y="0" width="200" height="34" rx="6" fill="rgba(59, 130, 246, 0.1)"/>
          <text x="10" y="22" font-size="11" class="svg-mono" fill="#1d4ed8">ord: 101 • cust: 1 ($150)</text>

          <rect x="0" y="44" width="200" height="34" rx="6" fill="rgba(59, 130, 246, 0.1)"/>
          <text x="10" y="66" font-size="11" class="svg-mono" fill="#1d4ed8">ord: 102 • cust: 1 ($80)</text>

          <rect x="0" y="88" width="200" height="34" rx="6" fill="rgba(59, 130, 246, 0.1)"/>
          <text x="10" y="110" font-size="11" class="svg-mono" fill="#1d4ed8">ord: 103 • cust: 2 ($220)</text>
        </g>
        <text x="360" y="286" text-anchor="middle" font-size="10.5" fill="var(--text-muted)">Foreign Key Table</text>
      </g>

      <!-- Relational Key Link Lines -->
      <g opacity="${opOpacity}" class="svg-anim-layer">
        <!-- Connecting threads c.id => o.customer_id -->
        <path d="M 224 91 C 240 91, 244 91, 260 91" stroke="#3b82f6" stroke-width="2.5" fill="none" marker-end="url(#arrowBlue)"/>
        <path d="M 224 91 C 238 91, 244 135, 260 135" stroke="#3b82f6" stroke-width="2.5" fill="none" marker-end="url(#arrowBlue)"/>
        <path d="M 224 135 C 240 135, 244 179, 260 179" stroke="#3b82f6" stroke-width="2.5" fill="none" marker-end="url(#arrowBlue)"/>
        <!-- Charlie no match thread -->
        <path d="M 224 179 L 244 179" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,3" fill="none"/>

        <!-- Join Type Explainer Box -->
        <rect x="486" y="24" width="160" height="280" rx="12" class="svg-panel-bg" stroke="${step === 2 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 2 ? '2' : '1'}" filter="url(#svgSoftShadow)"/>
        <text x="566" y="48" text-anchor="middle" font-size="11" font-weight="800" fill="var(--accent)">ON c.id = o.cust_id</text>

        <rect x="496" y="66" width="140" height="90" rx="8" fill="rgba(59, 130, 246, 0.08)" stroke="#3b82f6" stroke-width="1"/>
        <text x="566" y="86" text-anchor="middle" font-size="11" font-weight="800" fill="#1d4ed8">INNER JOIN</text>
        <text x="506" y="106" font-size="10" fill="var(--text-secondary)">Matches ONLY:</text>
        <text x="506" y="122" font-size="10" fill="var(--text-muted)">Alice (2 rows)</text>
        <text x="506" y="138" font-size="10" fill="var(--text-muted)">Bob (1 row)</text>

        <rect x="496" y="168" width="140" height="96" rx="8" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1"/>
        <text x="566" y="188" text-anchor="middle" font-size="11" font-weight="800" fill="#b45309">LEFT JOIN</text>
        <text x="506" y="208" font-size="10" fill="var(--text-secondary)">Preserves Charlie:</text>
        <text x="506" y="224" font-size="10" fill="var(--text-muted)">order_id = NULL</text>
        <text x="506" y="240" font-size="10" fill="var(--text-muted)">amount = NULL</text>
      </g>

      <!-- Result Table (Right) -->
      <g opacity="${resOpacity}" class="svg-anim-layer">
        <rect x="660" y="24" width="296" height="280" rx="14" class="svg-panel-bg" stroke="${step === 3 ? '#10b981' : 'var(--border-default)'}" stroke-width="${step === 3 ? '2.5' : '1.2'}"/>
        <path d="M 660 38 Q 660 24 674 24 L 942 24 Q 956 24 956 38 L 956 62 L 660 62 Z" fill="rgba(16, 185, 129, 0.12)"/>
        <text x="674" y="48" class="svg-text-title" fill="#047857">✨ Joined Relation Output</text>

        <g transform="translate(670, 72)">
          <rect x="0" y="0" width="276" height="34" rx="6" class="svg-row-match"/>
          <text x="10" y="22" font-size="10.5" class="svg-mono" fill="#047857">Alice | ord: 101 | $150.00</text>

          <rect x="0" y="42" width="276" height="34" rx="6" class="svg-row-match"/>
          <text x="10" y="64" font-size="10.5" class="svg-mono" fill="#047857">Alice | ord: 102 | $80.00</text>

          <rect x="0" y="84" width="276" height="34" rx="6" class="svg-row-match"/>
          <text x="10" y="106" font-size="10.5" class="svg-mono" fill="#047857">Bob   | ord: 103 | $220.00</text>

          <!-- NULL padded row -->
          <rect x="0" y="126" width="276" height="34" rx="6" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" stroke-width="1"/>
          <text x="10" y="148" font-size="10.5" class="svg-mono" font-weight="700" fill="#b45309">Charlie | ord: NULL | NULL</text>
        </g>
        <text x="808" y="260" text-anchor="middle" font-size="10" font-weight="700" fill="#b45309">★ Charlie preserved via LEFT JOIN</text>
        <text x="808" y="284" text-anchor="middle" font-size="10" fill="var(--text-muted)">Anti-Join: WHERE o.order_id IS NULL</text>
      </g>
    `;
  }

  // 7. TOPIC 07: ADVANCED JOINS & SETS (UNION & FULL JOIN)
  function renderAdvJoinSetSvg(diag, step) {
    const srcOpacity = (step === 0 || step === 1) ? '1.0' : '0.35';
    const opOpacity = (step === 0 || step === 2) ? '1.0' : '0.35';
    const resOpacity = (step === 0 || step === 3) ? '1.0' : '0.35';

    return `
      <!-- Interactive Set Theory Venn Diagram -->
      <g opacity="${srcOpacity}" class="svg-anim-layer">
        <!-- Circle A: Employees -->
        <circle cx="210" cy="155" r="105" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="2.5"/>
        <text x="145" y="110" font-weight="800" font-size="13" fill="#1d4ed8">SET A</text>
        <text x="145" y="130" font-size="11" fill="var(--text-secondary)">Employees (4)</text>
        <text x="145" y="160" font-size="10.5" class="svg-mono" fill="var(--text-muted)">Alice, Bob,</text>
        <text x="145" y="176" font-size="10.5" class="svg-mono" fill="var(--text-muted)">Charlie, David</text>

        <!-- Circle B: Contractors -->
        <circle cx="340" cy="155" r="105" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2.5"/>
        <text x="390" y="110" font-weight="800" font-size="13" fill="#047857">SET B</text>
        <text x="390" y="130" font-size="11" fill="var(--text-secondary)">Contractors (4)</text>
        <text x="390" y="160" font-size="10.5" class="svg-mono" fill="var(--text-muted)">David, Elena,</text>
        <text x="390" y="176" font-size="10.5" class="svg-mono" fill="var(--text-muted)">Frank, Grace</text>

        <!-- Overlap Intersection -->
        <text x="275" y="148" text-anchor="middle" font-size="11" font-weight="800" fill="#6d28d9">Overlap</text>
        <text x="275" y="166" text-anchor="middle" font-size="10.5" class="svg-mono" font-weight="800" fill="#6d28d9">[David]</text>
      </g>

      <!-- Center Set Operator Explainer -->
      <g opacity="${opOpacity}" class="svg-anim-layer">
        <rect x="470" y="24" width="220" height="280" rx="14" class="svg-panel-bg" stroke="${step === 2 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 2 ? '2' : '1.2'}" filter="url(#svgSoftShadow)"/>
        
        <rect x="482" y="34" width="196" height="30" rx="15" fill="url(#gAccentGrad)"/>
        <text x="580" y="54" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">⚡ SET OPERATORS</text>

        <rect x="482" y="74" width="196" height="64" rx="8" fill="rgba(109, 40, 217, 0.08)" stroke="#8b5cf6" stroke-width="1"/>
        <text x="494" y="94" font-weight="800" font-size="11" fill="#6d28d9">UNION (Deduplicated)</text>
        <text x="494" y="112" font-size="10" fill="var(--text-secondary)">Sorts in RAM to remove</text>
        <text x="494" y="126" font-size="10" fill="var(--text-muted)">duplicate David → 7 rows</text>

        <rect x="482" y="146" width="196" height="64" rx="8" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1"/>
        <text x="494" y="166" font-weight="800" font-size="11" fill="#047857">UNION ALL (Fast O(1))</text>
        <text x="494" y="184" font-size="10" fill="var(--text-secondary)">Appends streams directly</text>
        <text x="494" y="198" font-size="10" fill="var(--text-muted)">Preserves David twice → 8 rows</text>

        <rect x="482" y="218" width="196" height="54" rx="8" fill="rgba(225, 29, 72, 0.08)" stroke="#e11d48" stroke-width="1"/>
        <text x="494" y="238" font-weight="800" font-size="11" fill="#e11d48">FULL OUTER JOIN</text>
        <text x="494" y="256" font-size="9.5" fill="var(--text-muted)">Both sets matched, NULL-padded</text>
      </g>

      <!-- Emitted Set Stream (Right) -->
      <g opacity="${resOpacity}" class="svg-anim-layer">
        <rect x="706" y="24" width="250" height="280" rx="14" class="svg-panel-bg" stroke="${step === 3 ? '#10b981' : 'var(--border-default)'}" stroke-width="${step === 3 ? '2.5' : '1.2'}"/>
        <path d="M 706 38 Q 706 24 720 24 L 942 24 Q 956 24 956 38 L 956 62 L 706 62 Z" fill="rgba(16, 185, 129, 0.12)"/>
        <text x="720" y="48" class="svg-text-title" fill="#047857">✨ Combined Union Stream</text>

        <g transform="translate(718, 72)">
          <rect x="0" y="0" width="226" height="24" rx="4" class="svg-row-match"/>
          <text x="10" y="16" font-size="10.5" class="svg-mono" fill="#047857">Alice (Employee)</text>

          <rect x="0" y="28" width="226" height="24" rx="4" class="svg-row-match"/>
          <text x="10" y="44" font-size="10.5" class="svg-mono" fill="#047857">Bob (Employee)</text>

          <rect x="0" y="56" width="226" height="24" rx="4" class="svg-row-match"/>
          <text x="10" y="72" font-size="10.5" class="svg-mono" fill="#047857">Charlie (Employee)</text>

          <rect x="0" y="84" width="226" height="24" rx="4" fill="rgba(109, 40, 217, 0.12)"/>
          <text x="10" y="100" font-size="10.5" class="svg-mono" font-weight="700" fill="#6d28d9">David (Deduped)</text>

          <rect x="0" y="112" width="226" height="24" rx="4" class="svg-row-match"/>
          <text x="10" y="128" font-size="10.5" class="svg-mono" fill="#047857">Elena (Contractor)</text>

          <rect x="0" y="140" width="226" height="24" rx="4" class="svg-row-match"/>
          <text x="10" y="156" font-size="10.5" class="svg-mono" fill="#047857">Frank (Contractor)</text>

          <rect x="0" y="168" width="226" height="24" rx="4" class="svg-row-match"/>
          <text x="10" y="184" font-size="10.5" class="svg-mono" fill="#047857">Grace (Contractor)</text>
        </g>
        <text x="831" y="284" text-anchor="middle" font-size="10" font-weight="700" fill="#047857">✓ 7 Unique Distinct Members</text>
      </g>
    `;
  }

  // 8. TOPIC 08: CONDITIONAL LOGIC (CASE WHEN & COALESCE)
  function renderCaseWhenSvg(diag, step) {
    const srcOpacity = (step === 0 || step === 1) ? '1.0' : '0.35';
    const opOpacity = (step === 0 || step === 2) ? '1.0' : '0.35';
    const resOpacity = (step === 0 || step === 3) ? '1.0' : '0.35';

    return `
      <!-- Input Salary Stream -->
      <g opacity="${srcOpacity}" class="svg-anim-layer">
        <rect x="24" y="24" width="240" height="280" rx="14" class="svg-panel-bg" stroke="${step === 1 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 1 ? '2.5' : '1.2'}"/>
        <path d="M 24 38 Q 24 24 38 24 L 250 24 Q 264 24 264 38 L 264 62 L 24 62 Z" class="svg-panel-header"/>
        <text x="36" y="48" class="svg-text-title">📥 Input Salaries</text>

        <g transform="translate(36, 76)">
          <rect x="0" y="0" width="216" height="42" rx="6" class="svg-row-even"/>
          <text x="12" y="26" class="svg-text-cell" font-weight="700">David: $125,000</text>

          <rect x="0" y="52" width="216" height="42" rx="6" class="svg-row-odd"/>
          <text x="12" y="78" class="svg-text-cell" font-weight="700">Ashley: $115,000</text>

          <rect x="0" y="104" width="216" height="42" rx="6" class="svg-row-even"/>
          <text x="12" y="130" class="svg-text-cell" font-weight="700">Carlos: $72,000</text>

          <rect x="0" y="156" width="216" height="42" rx="6" class="svg-row-odd"/>
          <text x="12" y="182" class="svg-text-cell" font-weight="700" fill="#f59e0b">Bonus: NULL</text>
        </g>
        <text x="144" y="286" text-anchor="middle" font-size="10.5" fill="var(--text-muted)">Unclassified numbers</text>
      </g>

      <!-- Center Diamond Decision Tree -->
      <g opacity="${opOpacity}" class="svg-anim-layer">
        <rect x="284" y="24" width="370" height="280" rx="14" class="svg-panel-bg" stroke="${step === 2 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 2 ? '2' : '1.2'}" filter="url(#svgSoftShadow)"/>
        
        <rect x="296" y="34" width="346" height="30" rx="15" fill="url(#gAccentGrad)"/>
        <text x="469" y="54" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff">⚡ CASE WHEN Branching Evaluator</text>

        <!-- Branch 1: Executive -->
        <g transform="translate(296, 76)">
          <polygon points="120,4 230,22 120,40 10,22" fill="rgba(147, 51, 234, 0.12)" stroke="#9333ea" stroke-width="1.5"/>
          <text x="120" y="26" text-anchor="middle" font-size="10" font-weight="800" fill="#7e22ce">salary >= 120k?</text>
          
          <path d="M 230 22 L 270 22" stroke="#9333ea" stroke-width="2" marker-end="url(#arrowPurple)"/>
          <rect x="274" y="10" width="62" height="24" rx="4" fill="#9333ea"/>
          <text x="305" y="26" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">Executive</text>
        </g>

        <!-- Branch 2: Senior -->
        <g transform="translate(296, 126)">
          <polygon points="120,4 230,22 120,40 10,22" fill="rgba(59, 130, 246, 0.12)" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="120" y="26" text-anchor="middle" font-size="10" font-weight="800" fill="#1d4ed8">salary >= 100k?</text>
          
          <path d="M 230 22 L 270 22" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue)"/>
          <rect x="274" y="10" width="62" height="24" rx="4" fill="#3b82f6"/>
          <text x="305" y="26" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">Senior</text>
        </g>

        <!-- Branch 3: ELSE -->
        <g transform="translate(296, 176)">
          <rect x="20" y="6" width="200" height="32" rx="6" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="1.2"/>
          <text x="120" y="26" text-anchor="middle" font-size="10.5" font-weight="800" fill="#047857">ELSE Fallback</text>
          
          <path d="M 220 22 L 270 22" stroke="#10b981" stroke-width="2" marker-end="url(#arrowGreen)"/>
          <rect x="274" y="10" width="62" height="24" rx="4" fill="#10b981"/>
          <text x="305" y="26" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">Mid-Level</text>
        </g>

        <!-- COALESCE Note -->
        <rect x="296" y="234" width="346" height="54" rx="8" fill="var(--bg-card-subtle)" stroke="var(--border-subtle)" stroke-width="1"/>
        <text x="469" y="252" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text-secondary)">COALESCE(bonus, 0.00)</text>
        <text x="469" y="270" text-anchor="middle" font-size="10" fill="var(--text-muted)">Evaluates left-to-right; safely replaces NULL with fallback value.</text>
      </g>

      <!-- Emitted Categorized Table (Right) -->
      <g opacity="${resOpacity}" class="svg-anim-layer">
        <rect x="674" y="24" width="282" height="280" rx="14" class="svg-panel-bg" stroke="${step === 3 ? '#10b981' : 'var(--border-default)'}" stroke-width="${step === 3 ? '2.5' : '1.2'}"/>
        <path d="M 674 38 Q 674 24 688 24 L 942 24 Q 956 24 956 38 L 956 62 L 674 62 Z" fill="rgba(16, 185, 129, 0.12)"/>
        <text x="688" y="48" class="svg-text-title" fill="#047857">✨ Labeled Output</text>

        <g transform="translate(686, 76)">
          <rect x="0" y="0" width="258" height="42" rx="6" class="svg-row-match"/>
          <text x="12" y="26" font-size="11" font-weight="700">David ($125k) →</text>
          <rect x="156" y="10" width="90" height="22" rx="4" fill="#9333ea"/>
          <text x="201" y="25" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">Executive</text>

          <rect x="0" y="52" width="258" height="42" rx="6" class="svg-row-match"/>
          <text x="12" y="78" font-size="11" font-weight="700">Ashley ($115k) →</text>
          <rect x="156" y="62" width="90" height="22" rx="4" fill="#3b82f6"/>
          <text x="201" y="77" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">Senior</text>

          <rect x="0" y="104" width="258" height="42" rx="6" class="svg-row-match"/>
          <text x="12" y="130" font-size="11" font-weight="700">Carlos ($72k) →</text>
          <rect x="156" y="114" width="90" height="22" rx="4" fill="#10b981"/>
          <text x="201" y="129" text-anchor="middle" font-size="9.5" font-weight="800" fill="#ffffff">Mid-Level</text>
        </g>
        <text x="815" y="284" text-anchor="middle" font-size="10.5" font-weight="700" fill="#047857">✓ Synthesized Categorical Column</text>
      </g>
    `;
  }

  // 9. TOPIC 09: MULTI-STEP PIPELINES (CTEs & WITH)
  function renderCtePipelineSvg(diag, step) {
    const srcOpacity = (step === 0 || step === 1) ? '1.0' : '0.35';
    const opOpacity = (step === 0 || step === 2) ? '1.0' : '0.35';
    const resOpacity = (step === 0 || step === 3) ? '1.0' : '0.35';

    return `
      <!-- Stage 1: Initial CTE Definition -->
      <g opacity="${srcOpacity}" class="svg-anim-layer">
        <rect x="24" y="24" width="260" height="280" rx="14" class="svg-panel-bg" stroke="${step === 1 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 1 ? '2.5' : '1.2'}"/>
        <path d="M 24 38 Q 24 24 38 24 L 270 24 Q 284 24 284 38 L 284 66 L 24 66 Z" fill="rgba(99, 102, 241, 0.12)"/>
        <text x="38" y="50" class="svg-text-title" fill="#4338ca">📦 CTE 1: DeptAverages</text>

        <rect x="36" y="78" width="236" height="150" rx="8" fill="var(--bg-card-subtle)" stroke="var(--border-subtle)" stroke-width="1"/>
        <text x="46" y="100" class="svg-mono" font-size="10.5" fill="#4338ca">WITH DeptAverages AS (</text>
        <text x="56" y="120" class="svg-mono" font-size="10" fill="var(--text-secondary)">SELECT department,</text>
        <text x="66" y="136" class="svg-mono" font-size="10" fill="var(--text-secondary)">AVG(salary) AS avg_sal</text>
        <text x="56" y="152" class="svg-mono" font-size="10" fill="var(--text-secondary)">FROM Employees</text>
        <text x="56" y="168" class="svg-mono" font-size="10" fill="var(--text-secondary)">GROUP BY department</text>
        <text x="46" y="188" class="svg-mono" font-size="10.5" fill="#4338ca">)</text>

        <rect x="36" y="238" width="236" height="48" rx="6" fill="rgba(99, 102, 241, 0.08)"/>
        <text x="46" y="258" font-size="10" font-weight="700" fill="#4338ca">Named Temporary Scope:</text>
        <text x="46" y="274" font-size="9.5" fill="var(--text-muted)">Inlined by query optimizer (0 disk table)</text>
      </g>

      <!-- Center Chained Pipe -->
      <g opacity="${opOpacity}" class="svg-anim-layer">
        <path d="M 284 130 C 310 130, 310 90, 334 90" stroke="#6366f1" stroke-width="3" fill="none" marker-end="url(#arrowIndigo)"/>
        
        <rect x="334" y="24" width="280" height="280" rx="14" class="svg-panel-bg" stroke="${step === 2 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 2 ? '2' : '1.2'}" filter="url(#svgSoftShadow)"/>
        <path d="M 334 38 Q 334 24 348 24 L 600 24 Q 614 24 614 38 L 614 66 L 334 66 Z" fill="rgba(244, 63, 94, 0.12)"/>
        <text x="348" y="50" class="svg-text-title" fill="#be123c">📦 CTE 2: Chained Normalizer</text>

        <rect x="346" y="78" width="256" height="150" rx="8" fill="var(--bg-card-subtle)" stroke="var(--border-subtle)" stroke-width="1"/>
        <text x="356" y="100" class="svg-mono" font-size="10.5" fill="#be123c">, FilteredHighEarners AS (</text>
        <text x="366" y="120" class="svg-mono" font-size="10" fill="var(--text-secondary)">SELECT e.first_name, e.salary</text>
        <text x="366" y="136" class="svg-mono" font-size="10" fill="var(--text-secondary)">FROM Employees e</text>
        <text x="366" y="152" class="svg-mono" font-size="10" fill="var(--text-secondary)">JOIN DeptAverages d</text>
        <text x="376" y="168" class="svg-mono" font-size="10" fill="var(--text-secondary)">ON e.dept = d.dept</text>
        <text x="366" y="184" class="svg-mono" font-size="10" fill="var(--text-secondary)">WHERE e.salary > d.avg_sal</text>
        <text x="356" y="204" class="svg-mono" font-size="10.5" fill="#be123c">)</text>

        <text x="474" y="258" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--text-secondary)">Modular Readability</text>
        <text x="474" y="274" text-anchor="middle" font-size="10" fill="var(--text-muted)">Replaces 3-level deep nested subqueries</text>
      </g>

      <!-- Final Query Outer Select (Right) -->
      <g opacity="${resOpacity}" class="svg-anim-layer">
        <path d="M 614 130 C 640 130, 640 90, 664 90" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowGreen)"/>

        <rect x="664" y="24" width="292" height="280" rx="14" class="svg-panel-bg" stroke="${step === 3 ? '#10b981' : 'var(--border-default)'}" stroke-width="${step === 3 ? '2.5' : '1.2'}"/>
        <path d="M 664 38 Q 664 24 678 24 L 942 24 Q 956 24 956 38 L 956 66 L 664 66 Z" fill="rgba(16, 185, 129, 0.12)"/>
        <text x="678" y="50" class="svg-text-title" fill="#047857">✨ Final Outer Query Result</text>

        <g transform="translate(676, 78)">
          <rect x="0" y="0" width="268" height="46" rx="8" class="svg-row-match"/>
          <text x="12" y="26" class="svg-text-cell-match" font-size="12.5" font-weight="700">David (Engineering)</text>
          <text x="12" y="40" class="svg-mono" font-size="10.5" fill="#065f46">Salary $125k > Dept Avg $90.6k</text>

          <rect x="0" y="58" width="268" height="46" rx="8" class="svg-row-match"/>
          <text x="12" y="84" class="svg-text-cell-match" font-size="12.5" font-weight="700">Ashley (Analytics)</text>
          <text x="12" y="98" class="svg-mono" font-size="10.5" fill="#065f46">Salary $115k > Dept Avg $105k</text>
        </g>
        <text x="810" y="260" text-anchor="middle" font-size="10.5" font-weight="700" fill="#047857">Clean Top-to-Bottom Data Flow</text>
        <text x="810" y="278" text-anchor="middle" font-size="10" fill="var(--text-muted)">Eliminates duplicated calculations</text>
      </g>
    `;
  }

  // 10. TOPIC 10: WINDOW FUNCTIONS (OVER, PARTITION BY, Sliding Frame)
  function renderWindowPartitionSvg(diag, step) {
    const srcOpacity = (step === 0 || step === 1) ? '1.0' : '0.35';
    const opOpacity = (step === 0 || step === 2) ? '1.0' : '0.35';
    const resOpacity = (step === 0 || step === 3) ? '1.0' : '0.35';

    return `
      <!-- Preserved Rows in Partition Fences -->
      <g opacity="${srcOpacity}" class="svg-anim-layer">
        <rect x="24" y="24" width="260" height="280" rx="14" class="svg-panel-bg" stroke="${step === 1 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 1 ? '2.5' : '1.2'}"/>
        <path d="M 24 38 Q 24 24 38 24 L 270 24 Q 284 24 284 38 L 284 62 L 24 62 Z" class="svg-panel-header"/>
        <text x="38" y="48" class="svg-text-title">🗂️ PARTITION BY dept</text>

        <!-- Partition 1: Engineering -->
        <g transform="translate(34, 72)">
          <rect x="0" y="0" width="240" height="92" rx="8" fill="rgba(59, 130, 246, 0.08)" stroke="#3b82f6" stroke-width="1.2"/>
          <text x="10" y="20" font-size="10.5" font-weight="800" fill="#1d4ed8">Partition: Engineering</text>
          <text x="10" y="40" font-size="10.5" class="svg-mono">David: $125,000</text>
          <text x="10" y="58" font-size="10.5" class="svg-mono">Carlos: $72,000</text>
          <text x="10" y="76" font-size="10.5" class="svg-mono">Sara: $110,000</text>
        </g>

        <!-- Partition 2: Analytics -->
        <g transform="translate(34, 174)">
          <rect x="0" y="0" width="240" height="74" rx="8" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1.2"/>
          <text x="10" y="20" font-size="10.5" font-weight="800" fill="#b45309">Partition: Analytics</text>
          <text x="10" y="40" font-size="10.5" class="svg-mono">Ashley: $115,000</text>
          <text x="10" y="58" font-size="10.5" class="svg-mono">Julia: $95,000</text>
        </g>
        <text x="154" y="286" text-anchor="middle" font-size="10" fill="var(--text-muted)">Rows are NEVER collapsed!</text>
      </g>

      <!-- Center Sliding Analytical Frame -->
      <g opacity="${opOpacity}" class="svg-anim-layer">
        <rect x="304" y="24" width="340" height="280" rx="14" class="svg-panel-bg" stroke="${step === 2 ? 'var(--accent)' : 'var(--border-default)'}" stroke-width="${step === 2 ? '2' : '1.2'}" filter="url(#svgSoftShadow)"/>
        
        <rect x="316" y="34" width="316" height="30" rx="15" fill="url(#gAccentGrad)"/>
        <text x="474" y="54" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">⚡ OVER (PARTITION BY dept ORDER BY sal DESC)</text>

        <!-- Sliding Frame Visualizer -->
        <g transform="translate(316, 76)">
          <rect x="0" y="0" width="316" height="42" rx="6" fill="rgba(99, 102, 241, 0.12)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="10" y="24" font-size="11" font-weight="700" fill="#4338ca">Current Row: David ($125k)</text>
          <text x="214" y="24" class="svg-mono" font-size="10" font-weight="800" fill="#4338ca">RNK: 1 | $125k</text>

          <rect x="0" y="48" width="316" height="42" rx="6" fill="rgba(99, 102, 241, 0.12)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="10" y="72" font-size="11" font-weight="700" fill="#4338ca">Current Row: Sara ($110k)</text>
          <text x="214" y="72" class="svg-mono" font-size="10" font-weight="800" fill="#4338ca">RNK: 2 | $235k</text>

          <rect x="0" y="96" width="316" height="42" rx="6" fill="rgba(99, 102, 241, 0.12)" stroke="#6366f1" stroke-width="1.5"/>
          <text x="10" y="120" font-size="11" font-weight="700" fill="#4338ca">Current Row: Carlos ($72k)</text>
          <text x="214" y="120" class="svg-mono" font-size="10" font-weight="800" fill="#4338ca">RNK: 3 | $307k</text>
        </g>

        <!-- Frame Specification Banner -->
        <rect x="316" y="234" width="316" height="54" rx="8" fill="var(--bg-card-subtle)" stroke="var(--border-subtle)" stroke-width="1"/>
        <text x="474" y="252" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-secondary)">Default Frame: ROWS BETWEEN UNBOUNDED</text>
        <text x="474" y="268" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-secondary)">PRECEDING AND CURRENT ROW</text>
      </g>

      <!-- Augmented Output Tuples (Right) -->
      <g opacity="${resOpacity}" class="svg-anim-layer">
        <rect x="664" y="24" width="292" height="280" rx="14" class="svg-panel-bg" stroke="${step === 3 ? '#10b981' : 'var(--border-default)'}" stroke-width="${step === 3 ? '2.5' : '1.2'}"/>
        <path d="M 664 38 Q 664 24 678 24 L 942 24 Q 956 24 956 38 L 956 62 L 664 62 Z" fill="rgba(16, 185, 129, 0.12)"/>
        <text x="678" y="48" class="svg-text-title" fill="#047857">✨ Enriched Output (All 5 Rows)</text>

        <g transform="translate(674, 72)">
          <rect x="0" y="0" width="272" height="34" rx="6" class="svg-row-match"/>
          <text x="10" y="22" font-size="10.5" class="svg-mono" fill="#047857">David | Eng | rnk: 1 | $125k run</text>

          <rect x="0" y="38" width="272" height="34" rx="6" class="svg-row-match"/>
          <text x="10" y="60" font-size="10.5" class="svg-mono" fill="#047857">Sara  | Eng | rnk: 2 | $235k run</text>

          <rect x="0" y="76" width="272" height="34" rx="6" class="svg-row-match"/>
          <text x="10" y="98" font-size="10.5" class="svg-mono" fill="#047857">Carlos| Eng | rnk: 3 | $307k run</text>

          <rect x="0" y="114" width="272" height="34" rx="6" fill="rgba(245, 158, 11, 0.1)"/>
          <text x="10" y="136" font-size="10.5" class="svg-mono" fill="#b45309">Ashley| Anly| rnk: 1 | $115k run</text>

          <rect x="0" y="152" width="272" height="34" rx="6" fill="rgba(245, 158, 11, 0.1)"/>
          <text x="10" y="174" font-size="10.5" class="svg-mono" fill="#b45309">Julia | Anly| rnk: 2 | $210k run</text>
        </g>
        <text x="810" y="284" text-anchor="middle" font-size="10" font-weight="700" fill="#047857">✓ Preserves Detailed Tuples + Aggregates</text>
      </g>
    `;
  }

  // Master Render Method
  function render(phase, step) {
    if (!phase) return '';
    const diag = phase.svgDiagram || {};
    const type = diag.type || 'projection';
    const s = step || 0;

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
        <svg viewBox="0 0 980 330" class="course-explainer-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="var(--accent, #e11d48)"/>
              <stop offset="100%" stop-color="var(--accent-hover, #be123c)"/>
            </linearGradient>
            <filter id="svgSoftShadow" x="-5%" y="-5%" width="110%" height="115%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.08"/>
            </filter>
            <marker id="arrowAccent" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--accent, #e11d48)"/>
            </marker>
            <marker id="arrowBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#10b981"/>
            </marker>
            <marker id="arrowPurple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#9333ea"/>
            </marker>
            <marker id="arrowIndigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#6366f1"/>
            </marker>
          </defs>

          <!-- Diagram Canvas Background -->
          <rect x="0" y="0" width="980" height="330" rx="16" class="svg-canvas-bg"/>

          ${bodySvg}
        </svg>

        <!-- Interactive Diagram Stepper Bar -->
        <div class="diagram-stepper-bar">
          <button class="diagram-step-btn ${s === 0 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(0)">
            <span>👁️ Overview</span>
          </button>
          <button class="diagram-step-btn ${s === 1 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(1)">
            <span>1️⃣ Step 1: Scan Table</span>
          </button>
          <button class="diagram-step-btn ${s === 2 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(2)">
            <span>2️⃣ Step 2: Relational Engine</span>
          </button>
          <button class="diagram-step-btn ${s === 3 ? 'active' : ''}" onclick="window.MasteryCourseEngine.setDiagramStep(3)">
            <span>3️⃣ Step 3: Emit Result</span>
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
