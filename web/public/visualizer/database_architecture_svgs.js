/**
 * SQL FOUNDRY - DATABASE ENGINE ARCHITECTURE EXPLAINER SVGS
 * Pure high-contrast Carbon monochrome diagrams illustrating relational engine internals.
 * Standard ViewBox: 1000 x 300 (Clean, widescreen architecture aspect ratio).
 * Zero neon colors, razor-sharp hairlines, tabular monospace metrics.
 * 12 Exhaustive Enterprise Engine Explainer Diagrams.
 */

window.DatabaseArchitectureSvgs = (function() {
  'use strict';

  function escapeXml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Common SVG Defs (Markers, Patterns, Shading)
  function getEngineDefs() {
    return `
      <defs>
        <pattern id="arch-mesh-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.4" />
        </pattern>
        <marker id="arch-arrow-white" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 1 1.5 L 6.5 4 L 1 6.5 z" fill="#ffffff"/>
        </marker>
        <marker id="arch-arrow-zinc" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 1 1.5 L 6.5 4 L 1 6.5 z" fill="#71717a"/>
        </marker>
        <marker id="arch-arrow-muted" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 1 1.5 L 6.5 4 L 1 6.5 z" fill="#52525b"/>
        </marker>
      </defs>
    `;
  }

  // ---------------------------------------------------------------------------
  // 1. BUFFER POOL & STORAGE ENGINE I/O ARCHITECTURE
  // ---------------------------------------------------------------------------
  function renderBufferPoolSvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">BUFFER POOL &amp; STORAGE ENGINE I/O // ZERO-COPY MEMORY PIPELINE</text>
        <rect x="854" y="18" width="120" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="914" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">VOLCANO ENGINE</text>

        <!-- Column 1: Client Query -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="180" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">1. QUERY EXECUTION</text>
          <rect x="14" y="36" width="152" height="42" rx="4" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="600">SELECT id, val</text>
          <text x="22" y="66" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">FROM ledger WHERE id=42</text>
          <rect x="14" y="88" width="152" height="30" rx="4" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="106" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5">Logical Plan &amp; AST</text>
          <rect x="14" y="126" width="152" height="68" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
          <text x="22" y="142" fill="#71717a" font-size="8.5">Engine requests Page:</text>
          <text x="22" y="158" fill="#ffffff" font-family="ui-monospace, monospace" font-size="10" font-weight="700">PAGE_ID: 1048</text>
          <text x="22" y="180" fill="#52525b" font-size="8">Zero direct disk read in path</text>
        </g>
        <path d="M 218 166 L 246 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Column 2: Buffer Pool Manager (RAM) -->
        <g transform="translate(254, 62)">
          <rect x="0" y="0" width="460" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <text x="18" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">2. BUFFER POOL MANAGER (SRAM / DRAM RESIDENT)</text>
          <rect x="18" y="36" width="424" height="64" rx="4" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="28" y="52" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">PAGE TABLE (HASH MAP LOOKUP: O(1))</text>
          <rect x="28" y="60" width="88" height="28" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.18)" stroke-width="0.8" />
          <text x="72" y="74" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700" text-anchor="middle">Page 1048</text>
          <text x="72" y="84" fill="#71717a" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">&rarr; Frame 03</text>
          <rect x="124" y="60" width="88" height="28" rx="3" fill="#090a0d" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
          <text x="168" y="74" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5" text-anchor="middle">Page 2092</text>
          <text x="168" y="84" fill="#52525b" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">&rarr; Frame 12</text>
          <rect x="220" y="60" width="88" height="28" rx="3" fill="#090a0d" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
          <text x="264" y="74" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5" text-anchor="middle">Page 8104</text>
          <text x="264" y="84" fill="#52525b" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">&rarr; Frame 07</text>
          <rect x="316" y="60" width="116" height="28" rx="3" fill="#1f1f23" stroke="#ffffff" stroke-width="1" />
          <text x="374" y="74" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700" text-anchor="middle">[CACHE HIT: 0.12ms]</text>
          <text x="374" y="84" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">Pin Count = 1</text>
          <rect x="18" y="108" width="424" height="88" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="28" y="124" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">FRAME BUFFER MEMORY SLOTS (8KB SLOTTED PAGES)</text>
          <rect x="28" y="132" width="96" height="52" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1" />
          <text x="76" y="148" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700" text-anchor="middle">FRAME 03 (HIT)</text>
          <text x="76" y="160" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">Dirty: false</text>
          <text x="76" y="172" fill="#71717a" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">LRU-2 Score: High</text>
          <rect x="132" y="132" width="96" height="52" rx="3" fill="#0f0f12" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
          <text x="180" y="148" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5" text-anchor="middle">FRAME 04</text>
          <text x="180" y="160" fill="#52525b" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">Dirty: true</text>
          <text x="180" y="172" fill="#52525b" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">Needs WAL flush</text>
          <rect x="236" y="132" width="96" height="52" rx="3" fill="#0f0f12" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
          <text x="284" y="148" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5" text-anchor="middle">FRAME 05</text>
          <text x="284" y="160" fill="#52525b" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">Dirty: false</text>
          <text x="284" y="172" fill="#52525b" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">Candidate Evict</text>
          <rect x="340" y="132" width="92" height="52" rx="3" fill="#090a0d" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
          <text x="386" y="148" fill="#52525b" font-family="ui-monospace, monospace" font-size="7.5" text-anchor="middle">FRAME 06 (FREE)</text>
          <text x="386" y="166" fill="#3f3f46" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">Clock Hand</text>
        </g>
        <path d="M 724 166 L 752 166" fill="none" stroke="#71717a" stroke-width="1.2" stroke-dasharray="3 3" marker-end="url(#arch-arrow-zinc)" />

        <!-- Column 3: Storage Subsystem & Disk -->
        <g transform="translate(760, 62)">
          <rect x="0" y="0" width="212" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">3. DISK PERSISTENCE</text>
          <g transform="translate(14, 36)">
            <rect x="0" y="0" width="184" height="66" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
            <text x="10" y="17" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600">WAL (Write-Ahead Log)</text>
            <text x="10" y="33" fill="#71717a" font-size="8">Sequential fsync Append</text>
            <rect x="10" y="42" width="164" height="16" rx="2" fill="#18181b" />
            <text x="14" y="54" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7.5">LSN 49118 &rarr; 49119 &rarr; 49120</text>
          </g>
          <g transform="translate(14, 114)">
            <rect x="0" y="0" width="184" height="78" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
            <text x="10" y="17" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600">TABLESPACE (Random NVMe)</text>
            <text x="10" y="33" fill="#71717a" font-size="8">Fuzzy Checkpoint (DBWR)</text>
            <rect x="10" y="42" width="164" height="28" rx="2" fill="#141418" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
            <text x="14" y="56" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Page 1048 [8,192 bytes]</text>
            <text x="14" y="66" fill="#52525b" font-family="ui-monospace, monospace" font-size="7.5">Slotted Tuple Page Layout</text>
          </g>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 2. B+ TREE INDEX POINT LOOKUP & RANGE SCAN ARCHITECTURE
  // ---------------------------------------------------------------------------
  function renderBTreeIndexSvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">B+ TREE CLUSTERED INDEX // LOGICAL TRAVERSAL &amp; LEAF LINKAGE</text>
        <rect x="834" y="18" width="140" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="904" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">O(log N) COMPLEXITY</text>

        <!-- Level 0: Root Node -->
        <g transform="translate(380, 56)">
          <rect x="0" y="0" width="240" height="42" rx="4" fill="#141418" stroke="#ffffff" stroke-width="1.2" />
          <text x="12" y="18" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">ROOT NODE (Page 01)</text>
          <rect x="12" y="24" width="66" height="14" rx="2" fill="#18181b" />
          <text x="45" y="34" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700" text-anchor="middle">Key &lt; 50</text>
          <rect x="86" y="24" width="66" height="14" rx="2" fill="#18181b" />
          <text x="119" y="34" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700" text-anchor="middle">Key 50-100</text>
          <rect x="160" y="24" width="68" height="14" rx="2" fill="#18181b" />
          <text x="194" y="34" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700" text-anchor="middle">Key &gt; 100</text>
        </g>

        <!-- Downward Pointers -->
        <path d="M 425 98 L 220 126" fill="none" stroke="#71717a" stroke-width="1" marker-end="url(#arch-arrow-zinc)" />
        <path d="M 500 98 L 500 126" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />
        <path d="M 575 98 L 780 126" fill="none" stroke="#71717a" stroke-width="1" marker-end="url(#arch-arrow-zinc)" />

        <!-- Level 1: Internal Nodes -->
        <g transform="translate(80, 128)">
          <rect x="0" y="0" width="230" height="38" rx="4" fill="#0f0f12" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
          <text x="10" y="16" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">INTERNAL NODE A (Page 04)</text>
          <text x="10" y="30" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Keys: [10 | 25 | 40]</text>
        </g>
        <g transform="translate(385, 128)">
          <rect x="0" y="0" width="230" height="38" rx="4" fill="#18181b" stroke="#ffffff" stroke-width="1.2" />
          <text x="10" y="16" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">INTERNAL NODE B (Page 07) [SEARCH TARGET]</text>
          <text x="10" y="30" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">Keys: [60 | 75 | 90] &rarr; Route key 72 to Leaf C</text>
        </g>
        <g transform="translate(690, 128)">
          <rect x="0" y="0" width="230" height="38" rx="4" fill="#0f0f12" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
          <text x="10" y="16" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">INTERNAL NODE C (Page 11)</text>
          <text x="10" y="30" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Keys: [120 | 160 | 210]</text>
        </g>

        <!-- Downward Pointers to Leaf -->
        <path d="M 500 166 L 500 196" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Level 2: Leaf Nodes (Linked List for Range Scans) -->
        <g transform="translate(32, 200)">
          <!-- Leaf 1 -->
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="210" height="74" rx="4" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
            <text x="10" y="16" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">LEAF PAGE 401 [Keys 1-25]</text>
            <rect x="10" y="24" width="190" height="42" rx="2" fill="#141418" />
            <text x="16" y="38" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7">Tuple [K:10, RID: 04:01]</text>
            <text x="16" y="50" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7">Tuple [K:18, RID: 04:02]</text>
            <text x="16" y="62" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7">Tuple [K:25, RID: 04:03]</text>
          </g>
          <!-- Horizontal Link -->
          <path d="M 210 237 L 244 237" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="2 2" marker-end="url(#arch-arrow-white)" />

          <!-- Leaf 2 -->
          <g transform="translate(246, 0)">
            <rect x="0" y="0" width="210" height="74" rx="4" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
            <text x="10" y="16" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">LEAF PAGE 402 [Keys 26-50]</text>
            <rect x="10" y="24" width="190" height="42" rx="2" fill="#141418" />
            <text x="16" y="38" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7">Tuple [K:32, RID: 07:01]</text>
            <text x="16" y="50" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7">Tuple [K:41, RID: 07:02]</text>
            <text x="16" y="62" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7">Tuple [K:48, RID: 07:03]</text>
          </g>
          <!-- Horizontal Link -->
          <path d="M 456 237 L 490 237" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

          <!-- Leaf 3: Target Hit -->
          <g transform="translate(492, 0)">
            <rect x="0" y="0" width="210" height="74" rx="4" fill="#18181b" stroke="#ffffff" stroke-width="1.2" />
            <text x="10" y="16" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">LEAF PAGE 403 [Keys 51-75] &bull; HIT</text>
            <rect x="10" y="24" width="190" height="42" rx="2" fill="#090a0d" />
            <text x="16" y="38" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7">Tuple [K:55, RID: 10:01]</text>
            <text x="16" y="50" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">&bull; Tuple [K:72, RID: 10:02] &larr; FOUND</text>
            <text x="16" y="62" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7">Tuple [K:75, RID: 10:03]</text>
          </g>
          <!-- Horizontal Link -->
          <path d="M 702 237 L 736 237" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="2 2" marker-end="url(#arch-arrow-white)" />

          <!-- Leaf 4 -->
          <g transform="translate(738, 0)">
            <rect x="0" y="0" width="198" height="74" rx="4" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
            <text x="10" y="16" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">LEAF PAGE 404 [Keys 76-100]</text>
            <rect x="10" y="24" width="178" height="42" rx="2" fill="#141418" />
            <text x="16" y="38" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7">Tuple [K:81, RID: 14:01]</text>
            <text x="16" y="50" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7">Tuple [K:90, RID: 14:02]</text>
            <text x="16" y="62" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7">Tuple [K:99, RID: 14:03]</text>
          </g>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 3. IN-MEMORY HASH JOIN: BUILD VS PROBE PHASES
  // ---------------------------------------------------------------------------
  function renderHashJoinDagSvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">IN-MEMORY HASH JOIN ENGINE // BUILD VS PROBE PIPELINE</text>
        <rect x="834" y="18" width="140" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="904" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">O(M + N) STREAMING</text>

        <!-- Phase 1: BUILD SIDE -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="270" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">PHASE 1: BUILD (SMALL RELATION)</text>
          <rect x="14" y="36" width="242" height="154" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="24" y="54" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="600">Table: Departments (N=4)</text>
          <rect x="24" y="66" width="222" height="26" rx="3" fill="#18181b" />
          <text x="32" y="82" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="8">[dept_id=1, name='Engineering']</text>
          <rect x="24" y="96" width="222" height="26" rx="3" fill="#18181b" />
          <text x="32" y="112" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="8">[dept_id=2, name='Product']</text>
          <rect x="24" y="126" width="222" height="26" rx="3" fill="#18181b" />
          <text x="32" y="142" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="8">[dept_id=3, name='Analytics']</text>
          <text x="24" y="174" fill="#71717a" font-size="8">Hash Function: Murmur3_x64(dept_id)</text>
        </g>
        <path d="M 308 166 L 338 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Hash Table in Memory -->
        <g transform="translate(346, 62)">
          <rect x="0" y="0" width="310" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
          <text x="14" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">HASH BUCKET ARRAY (RAM RESIDENT)</text>
          <g transform="translate(14, 36)">
            <rect x="0" y="0" width="282" height="34" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8" />
            <text x="12" y="21" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">Bucket 00 &rarr; [Empty]</text>
          </g>
          <g transform="translate(14, 74)">
            <rect x="0" y="0" width="282" height="34" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1" />
            <text x="12" y="17" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">Bucket 01 [HASH: 0x8F01]</text>
            <text x="12" y="28" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">&rarr; [dept_id=3, Analytics] (Ptr: 0x4A10)</text>
          </g>
          <g transform="translate(14, 112)">
            <rect x="0" y="0" width="282" height="34" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1" />
            <text x="12" y="17" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">Bucket 02 [HASH: 0x3C12]</text>
            <text x="12" y="28" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">&rarr; [dept_id=1, Engineering] (Ptr: 0x4A28)</text>
          </g>
          <g transform="translate(14, 150)">
            <rect x="0" y="0" width="282" height="34" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8" />
            <text x="12" y="21" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">Bucket 03 &rarr; [dept_id=2, Product]</text>
          </g>
        </g>
        <path d="M 664 166 L 694 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Phase 2: STREAMING PROBE & EMISSION -->
        <g transform="translate(702, 62)">
          <rect x="0" y="0" width="270" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">PHASE 2: PROBE (LARGE STREAM)</text>
          <rect x="14" y="36" width="242" height="154" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="24" y="54" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="600">Stream: Employees (N=10,000)</text>
          <rect x="24" y="66" width="222" height="26" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
          <text x="32" y="82" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">[emp_id=101, dept_id=3] &rarr; HIT (Analytics)</text>
          <rect x="24" y="96" width="222" height="26" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
          <text x="32" y="112" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">[emp_id=102, dept_id=1] &rarr; HIT (Engineering)</text>
          <line x1="24" y1="130" x2="246" y2="130" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="24" y="146" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">EMITTED TUPLES: 10,000</text>
          <text x="24" y="160" fill="#71717a" font-size="8">Zero index required on probe stream</text>
          <text x="24" y="174" fill="#52525b" font-size="7.5">Pipelined output: streaming directly to client</text>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 4. WRITE-AHEAD LOGGING (WAL) & ARIES RECOVERY ARCHITECTURE
  // ---------------------------------------------------------------------------
  function renderWalAriesRecoverySvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">WAL &amp; ARIES CRASH RECOVERY // PHYSIOLOGICAL LOGGING &amp; 3-PASS RESTORE</text>
        <rect x="834" y="18" width="140" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="904" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">ATOMICITY &amp; DURABILITY</text>

        <!-- Col 1: Transaction Modification & WAL Buffer -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="220" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">1. WAL PROTOCOL RULE</text>
          <rect x="14" y="36" width="192" height="74" rx="4" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">PageLSN &le; FlushedLSN</text>
          <text x="22" y="68" fill="#a1a1aa" font-size="7.5">A dirty page is NEVER flushed</text>
          <text x="22" y="80" fill="#a1a1aa" font-size="7.5">to disk until its matching log</text>
          <text x="22" y="92" fill="#71717a" font-size="7">record is fsynced to WAL file.</text>
          
          <rect x="14" y="120" width="192" height="74" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
          <text x="22" y="136" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">TRANSACTION LOG BUFFER</text>
          <rect x="22" y="146" width="176" height="18" rx="2" fill="#18181b" />
          <text x="28" y="159" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">LSN 101: T1 UPDATE P42</text>
          <rect x="22" y="168" width="176" height="18" rx="2" fill="#1f1f23" />
          <text x="28" y="181" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">LSN 102: T1 COMMIT (fsync)</text>
        </g>
        <path d="M 258 166 L 286 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 2: WAL Record Structure & Sequence -->
        <g transform="translate(296, 62)">
          <rect x="0" y="0" width="370" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <text x="16" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">2. WAL RECORD PAYLOAD &amp; CHECKPOINT</text>
          
          <!-- Record Box -->
          <rect x="16" y="36" width="338" height="64" rx="4" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="26" y="52" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8">RECORD HEADER [24 Bytes]</text>
          <g transform="translate(26, 60)">
            <rect x="0" y="0" width="72" height="28" rx="2" fill="#18181b" />
            <text x="36" y="14" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">LSN: 101</text>
            <text x="36" y="24" fill="#71717a" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">Seq Counter</text>

            <rect x="78" y="0" width="74" height="28" rx="2" fill="#18181b" />
            <text x="115" y="14" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">PrevLSN: 098</text>
            <text x="115" y="24" fill="#71717a" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">T1 Backlink</text>

            <rect x="158" y="0" width="74" height="28" rx="2" fill="#18181b" />
            <text x="195" y="14" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">PageID: 42</text>
            <text x="195" y="24" fill="#71717a" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">Target Page</text>

            <rect x="238" y="0" width="80" height="28" rx="2" fill="#1f1f23" stroke="#ffffff" stroke-width="0.8" />
            <text x="278" y="14" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7" font-weight="700" text-anchor="middle">Redo/Undo</text>
            <text x="278" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">Old: 10 &rarr; New: 42</text>
          </g>

          <!-- Checkpointing -->
          <rect x="16" y="110" width="338" height="84" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="26" y="126" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">NON-BLOCKING FUZZY CHECKPOINTING</text>
          <text x="26" y="142" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">&bull; Active Txn Table: [T1 (Active), T2 (Committed)]</text>
          <text x="26" y="156" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">&bull; Dirty Page Table (DPT): [Page 42 (RecLSN: 101), Page 99 (RecLSN: 88)]</text>
          <text x="26" y="170" fill="#71717a" font-size="7.5">Checkpoint records point to oldest RecLSN &rarr; bounds recovery window</text>
        </g>
        <path d="M 676 166 L 706 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 3: ARIES 3-Pass Crash Recovery -->
        <g transform="translate(716, 62)">
          <rect x="0" y="0" width="256" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">3. ARIES 3-PASS RESTORE</text>
          
          <rect x="14" y="36" width="228" height="46" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">PASS 1: ANALYSIS (FORWARD)</text>
          <text x="22" y="66" fill="#a1a1aa" font-size="7.5">Reconstruct Active Txn &amp; DPT tables.</text>

          <rect x="14" y="90" width="228" height="46" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
          <text x="22" y="106" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">PASS 2: REDO (REPEATING HISTORY)</text>
          <text x="22" y="120" fill="#a1a1aa" font-size="7.5">Replay all logged changes to exact crash point.</text>

          <rect x="14" y="144" width="228" height="46" rx="3" fill="#1f1f23" stroke="#ffffff" stroke-width="1" />
          <text x="22" y="160" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">PASS 3: UNDO (ROLLBACK LOSERS)</text>
          <text x="22" y="174" fill="#d4d4d8" font-size="7.5">Reverse uncommitted txns via CLR records.</text>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 5. COST-BASED OPTIMIZER (CBO) & VOLCANO ITERATOR TREE
  // ---------------------------------------------------------------------------
  function renderQueryOptimizerSvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">COST-BASED OPTIMIZER (CBO) // RELATIONAL ALGEBRA TO VOLCANO PIPELINE</text>
        <rect x="834" y="18" width="140" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="904" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">DYNAMIC PLANNING</text>

        <!-- Step 1: SQL to AST -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="190" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">1. LEXER &amp; PARSER</text>
          
          <rect x="14" y="36" width="162" height="60" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">SQL String</text>
          <text x="22" y="66" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">SELECT u.name, o.amt</text>
          <text x="22" y="78" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">FROM users u JOIN orders o</text>
          
          <rect x="14" y="106" width="162" height="88" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="124" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">ABSTRACT SYNTAX TREE</text>
          <text x="22" y="140" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">&bull; SelectStmt (Root)</text>
          <text x="32" y="154" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">&bull; TargetList: [u.name, o.amt]</text>
          <text x="32" y="168" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">&bull; FromClause: JoinExpr (Inner)</text>
          <text x="32" y="182" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">&bull; Qual: (u.id = o.user_id)</text>
        </g>
        <path d="M 228 166 L 254 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Step 2: Logical Optimization & Rewrites -->
        <g transform="translate(264, 62)">
          <rect x="0" y="0" width="220" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">2. LOGICAL PLAN REWRITE</text>

          <rect x="14" y="36" width="192" height="48" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">Predicate Pushdown (&sigma;)</text>
          <text x="22" y="66" fill="#a1a1aa" font-size="7.5">Filters applied before join to reduce cardinalities</text>

          <rect x="14" y="92" width="192" height="48" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="108" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">Projection Pruning (&pi;)</text>
          <text x="22" y="122" fill="#a1a1aa" font-size="7.5">Discard unused columns before pipeline entry</text>

          <rect x="14" y="148" width="192" height="46" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="0.8" />
          <text x="22" y="164" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">Equivalence Memo Class</text>
          <text x="22" y="178" fill="#d4d4d8" font-size="7.5">Generate permutations: (u &bowtie; o) vs (o &bowtie; u)</text>
        </g>
        <path d="M 494 166 L 520 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Step 3: Cost Estimation (CardEst) -->
        <g transform="translate(530, 62)">
          <rect x="0" y="0" width="200" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">3. CARDEST &amp; COST MODEL</text>

          <rect x="14" y="36" width="172" height="48" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">Histogram Statistics</text>
          <text x="22" y="66" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">MCV (Most Common Values) &amp; Equi-depth buckets</text>

          <rect x="14" y="92" width="172" height="96" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="108" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">FORMULA:</text>
          <text x="22" y="122" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">Cost = (Pages * Seq_Cost)</text>
          <text x="22" y="134" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">     + (CPU_Tuple * Rows)</text>
          <line x1="22" y1="144" x2="174" y2="144" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
          <text x="22" y="158" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7">Option A (Seq): 1420.5</text>
          <text x="22" y="172" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">&bull; Option B (Index): 12.8 &larr; WIN</text>
        </g>
        <path d="M 740 166 L 766 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Step 4: Physical Volcano Iterator Tree -->
        <g transform="translate(776, 62)">
          <rect x="0" y="0" width="196" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
          <text x="14" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">4. PHYSICAL VOLCANO TREE</text>

          <rect x="14" y="36" width="168" height="34" rx="3" fill="#1f1f23" stroke="#ffffff" stroke-width="1" />
          <text x="98" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700" text-anchor="middle">Projection (.Next())</text>
          <text x="98" y="62" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">Outputs [name, amt]</text>

          <line x1="98" y1="70" x2="98" y2="82" stroke="#ffffff" stroke-width="1" marker-end="url(#arch-arrow-white)" />

          <rect x="14" y="84" width="168" height="34" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.2)" stroke-width="0.8" />
          <text x="98" y="100" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700" text-anchor="middle">HashJoin (u.id = o.user_id)</text>
          <text x="98" y="110" fill="#71717a" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">Build: users | Probe: orders</text>

          <path d="M 60 118 L 45 136" fill="none" stroke="#71717a" stroke-width="1" marker-end="url(#arch-arrow-zinc)" />
          <path d="M 136 118 L 151 136" fill="none" stroke="#71717a" stroke-width="1" marker-end="url(#arch-arrow-zinc)" />

          <rect x="14" y="138" width="76" height="42" rx="2" fill="#090a0d" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
          <text x="52" y="154" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7" font-weight="700" text-anchor="middle">SeqScan</text>
          <text x="52" y="166" fill="#71717a" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">users</text>

          <rect x="106" y="138" width="76" height="42" rx="2" fill="#090a0d" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
          <text x="144" y="154" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7" font-weight="700" text-anchor="middle">IndexScan</text>
          <text x="144" y="166" fill="#71717a" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">orders_idx</text>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 6. MULTI-VERSION CONCURRENCY CONTROL (MVCC) & SNAPSHOT VISIBILITY
  // ---------------------------------------------------------------------------
  function renderMvccConcurrencySvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">MVCC SNAPSHOT ISOLATION // TUPLE HEADERS (XMIN, XMAX) &amp; UNDO LOG CHAIN</text>
        <rect x="834" y="18" width="140" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="904" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">NON-BLOCKING READS</text>

        <!-- Col 1: Transaction Timeline & Snapshot Horizon -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="230" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">1. ACTIVE SNAPSHOT HORIZON</text>

          <rect x="14" y="36" width="202" height="66" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">Snapshot (Txn 105)</text>
          <text x="22" y="66" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">xmin: 100 | xmax: 105</text>
          <text x="22" y="78" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">xip_list: [102, 104] (In Progress)</text>
          <text x="22" y="92" fill="#a1a1aa" font-size="7">Reads see committed state &le; 100</text>

          <rect x="14" y="112" width="202" height="86" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="128" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">VISIBILITY RULES:</text>
          <text x="22" y="144" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">&bull; xmin committed &amp;&amp; xmin &lt; xmax</text>
          <text x="22" y="158" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">&bull; xmin NOT in active xip_list</text>
          <text x="22" y="172" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">&bull; xmax = 0 OR xmax uncommitted</text>
        </g>
        <path d="M 268 166 L 298 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 2: In-Page Slotted Tuple Version Chain -->
        <g transform="translate(308, 62)">
          <rect x="0" y="0" width="390" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <text x="14" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">2. PHYSICAL TUPLE VERSION CHAIN (TABLESPACE)</text>

          <!-- Tuple Version 1 (Old, dead or visible to past) -->
          <g transform="translate(14, 36)">
            <rect x="0" y="0" width="362" height="46" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
            <rect x="8" y="8" width="60" height="30" rx="2" fill="#18181b" />
            <text x="38" y="22" fill="#71717a" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">xmin: 95</text>
            <text x="38" y="32" fill="#71717a" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">xmax: 101</text>
            <text x="80" y="26" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8">Tuple V1 [id=42, balance=$100]</text>
            <text x="260" y="26" fill="#52525b" font-family="ui-monospace, monospace" font-size="7.5">t_ctid: (0, 2) &rarr;</text>
          </g>

          <!-- Down arrow -->
          <path d="M 334 82 L 334 94" fill="none" stroke="#ffffff" stroke-width="1" marker-end="url(#arch-arrow-white)" />

          <!-- Tuple Version 2 (Current Visible) -->
          <g transform="translate(14, 96)">
            <rect x="0" y="0" width="362" height="48" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1.2" />
            <rect x="8" y="8" width="60" height="32" rx="2" fill="#1f1f23" />
            <text x="38" y="22" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7" font-weight="700" text-anchor="middle">xmin: 101</text>
            <text x="38" y="34" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">xmax: 0</text>
            <text x="80" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">Tuple V2 [id=42, balance=$250] &bull; VISIBLE</text>
            <text x="80" y="38" fill="#a1a1aa" font-size="7">Committed by Txn 101, valid for Txn 105 snapshot</text>
          </g>

          <!-- Tuple Version 3 (Uncommitted / Future) -->
          <g transform="translate(14, 154)">
            <rect x="0" y="0" width="362" height="42" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
            <rect x="8" y="6" width="60" height="30" rx="2" fill="#111116" />
            <text x="38" y="20" fill="#52525b" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">xmin: 107</text>
            <text x="38" y="30" fill="#52525b" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">xmax: 0</text>
            <text x="80" y="24" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">Tuple V3 [id=42, balance=$900] &bull; INVISIBLE (Future Txn)</text>
          </g>
        </g>
        <path d="M 708 166 L 738 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 3: VACUUM & Garbage Collection -->
        <g transform="translate(748, 62)">
          <rect x="0" y="0" width="224" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">3. VACUUM ENGINE</text>

          <rect x="14" y="36" width="196" height="52" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">Oldest Active XID</text>
          <text x="22" y="66" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">Global Horizon: 100</text>
          <text x="22" y="78" fill="#52525b" font-size="7">Any xmax &lt; 100 is reclaimable</text>

          <rect x="14" y="98" width="196" height="92" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="116" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">SPACE RECLAMATION</text>
          <text x="22" y="132" fill="#a1a1aa" font-size="7.5">&bull; Scans Page 42 slotted line ptrs</text>
          <text x="22" y="146" fill="#a1a1aa" font-size="7.5">&bull; Flags V1 (xmax: 95) as DEAD</text>
          <text x="22" y="160" fill="#a1a1aa" font-size="7.5">&bull; Free space offset shifted</text>
          <text x="22" y="174" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">&bull; Zero table lock required</text>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 7. LSM-TREE STORAGE ENGINE (ROCKSDB / CASSANDRA) VS B+ TREE
  // ---------------------------------------------------------------------------
  function renderLsmTreeStorageSvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">LSM-TREE STORAGE ENGINE // MEMTABLE, WAL &amp; LEVELED SSTABLE COMPACTION</text>
        <rect x="834" y="18" width="140" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="904" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">HIGH-THROUGHPUT WRITES</text>

        <!-- Col 1: MemTable & WAL -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="220" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">1. INGESTION (IN-MEMORY)</text>

          <rect x="14" y="36" width="192" height="66" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">MemTable (SkipList RAM)</text>
          <text x="22" y="66" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">[Key: 'user:101' &rarr; Val: 'Alice']</text>
          <text x="22" y="78" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">[Key: 'user:102' &rarr; Val: 'Bob']</text>
          <text x="22" y="90" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">Sorted in-memory: O(log N) insert</text>

          <rect x="14" y="112" width="192" height="84" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="128" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">SEQUENTIAL WRITE-AHEAD LOG</text>
          <text x="22" y="144" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">Append-Only NVMe Stream</text>
          <text x="22" y="158" fill="#52525b" font-size="7">Zero random write I/O on ingest</text>
          <text x="22" y="172" fill="#52525b" font-size="7">Flush to Immutable L0 at 64MB limit</text>
        </g>
        <path d="M 258 166 L 288 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 2: Immutable SSTables (Disk Layers) -->
        <g transform="translate(298, 62)">
          <rect x="0" y="0" width="380" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <text x="14" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">2. LAYERED SSTABLES &amp; BLOOM FILTERS</text>

          <!-- Level 0 -->
          <g transform="translate(14, 36)">
            <rect x="0" y="0" width="352" height="42" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
            <text x="12" y="18" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">LEVEL 0 (May Have Overlapping Key Ranges)</text>
            <rect x="12" y="24" width="100" height="12" rx="2" fill="#18181b" />
            <text x="62" y="33" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">SSTable 01 [A-M]</text>
            <rect x="118" y="24" width="100" height="12" rx="2" fill="#18181b" />
            <text x="168" y="33" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">SSTable 02 [D-Z]</text>
            <rect x="224" y="24" width="116" height="12" rx="2" fill="#1f1f23" stroke="#ffffff" stroke-width="0.6" />
            <text x="282" y="33" fill="#ffffff" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">Bloom Filter (Prob &lt; 1%)</text>
          </g>

          <!-- Down arrow -->
          <path d="M 190 82 L 190 94" fill="none" stroke="#ffffff" stroke-width="1" marker-end="url(#arch-arrow-white)" />

          <!-- Level 1 -->
          <g transform="translate(14, 96)">
            <rect x="0" y="0" width="352" height="46" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1" />
            <text x="12" y="18" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">LEVEL 1 (Disjoint, Partitioned Ranges: 10x Size)</text>
            <rect x="12" y="24" width="76" height="16" rx="2" fill="#090a0d" />
            <text x="50" y="35" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">SSTable A [A-D]</text>
            <rect x="94" y="24" width="76" height="16" rx="2" fill="#090a0d" />
            <text x="132" y="35" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">SSTable B [E-L]</text>
            <rect x="176" y="24" width="76" height="16" rx="2" fill="#090a0d" />
            <text x="214" y="35" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">SSTable C [M-R]</text>
            <rect x="258" y="24" width="82" height="16" rx="2" fill="#090a0d" />
            <text x="299" y="35" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">SSTable D [S-Z]</text>
          </g>

          <!-- Down arrow -->
          <path d="M 190 146 L 190 156" fill="none" stroke="#71717a" stroke-width="1" stroke-dasharray="2 2" marker-end="url(#arch-arrow-zinc)" />

          <!-- Level 2 -->
          <g transform="translate(14, 158)">
            <rect x="0" y="0" width="352" height="38" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
            <text x="12" y="18" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">LEVEL 2 (Cold Archive Tier: 100x Size)</text>
            <text x="12" y="30" fill="#52525b" font-family="ui-monospace, monospace" font-size="7">Compacted 10-way merge &bull; Tombstones removed</text>
          </g>
        </g>
        <path d="M 688 166 L 718 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 3: Compaction & Point Lookup Flow -->
        <g transform="translate(728, 62)">
          <rect x="0" y="0" width="244" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">3. COMPACTION &amp; READ PATH</text>

          <rect x="14" y="36" width="216" height="66" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">READ PIPELINE (CASCADE)</text>
          <text x="22" y="66" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">1. Check MemTable (O(1))</text>
          <text x="22" y="78" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">2. Check Bloom Filter of L0</text>
          <text x="22" y="90" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">3. Binary search in Level N SST</text>

          <rect x="14" y="112" width="216" height="84" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="128" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">LEVELED MERGE COMPACTION</text>
          <text x="22" y="144" fill="#71717a" font-size="7.5">Background worker picks L0 file,</text>
          <text x="22" y="156" fill="#71717a" font-size="7.5">merges with overlapping L1 files,</text>
          <text x="22" y="168" fill="#71717a" font-size="7.5">writes fresh sorted SSTable &amp; deletes old.</text>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 8. COLUMNAR STORAGE & VECTORIZED SIMD EXECUTION (CLICKHOUSE / DUCKDB)
  // ---------------------------------------------------------------------------
  function renderColumnarVectorizedSvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">COLUMNAR STORAGE &amp; VECTORIZED SIMD EXECUTION // AVX-512 CHUNKS &amp; ENCODING</text>
        <rect x="834" y="18" width="140" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="904" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">OLAP 100x SPEEDUP</text>

        <!-- Col 1: Row vs Columnar Memory Layout -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="280" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">1. MEMORY LAYOUT COMPARISON</text>

          <g transform="translate(14, 36)">
            <rect x="0" y="0" width="252" height="64" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
            <text x="10" y="16" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">ROW-ORIENTED (OLTP: PostgreSQL / MySQL)</text>
            <text x="10" y="30" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7">[R1: id, name, age, city] &bull; [R2: id, name, age, city]</text>
            <text x="10" y="44" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7">[R3: id, name, age, city] &bull; [R4: id, name, age, city]</text>
            <text x="10" y="58" fill="#52525b" font-size="7">Scanning 'age' requires loading all 4 attributes into L1 cache</text>
          </g>

          <g transform="translate(14, 110)">
            <rect x="0" y="0" width="252" height="84" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1.2" />
            <text x="10" y="18" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">COLUMN-ORIENTED (ClickHouse / Parquet)</text>
            <text x="10" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">ID:   [101, 102, 103, 104, 105, 106, 107, 108]</text>
            <text x="10" y="46" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">AGE:  [ 24,  31,  29,  45,  38,  22,  29,  51] &larr; CONTIGUOUS</text>
            <text x="10" y="60" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">CITY: ['NYC', 'SFO', 'NYC', 'LON', 'NYC', 'BER']</text>
            <text x="10" y="74" fill="#a1a1aa" font-size="7">100% cache-line utilization: only requested column touched</text>
          </g>
        </g>
        <path d="M 318 166 L 344 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 2: Column Compression & Encoding -->
        <g transform="translate(354, 62)">
          <rect x="0" y="0" width="310" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <text x="14" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">2. COMPRESSION &amp; ENCODING</text>

          <g transform="translate(14, 36)">
            <rect x="0" y="0" width="282" height="46" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
            <text x="10" y="16" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">DICTIONARY ENCODING</text>
            <text x="10" y="28" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">Dict: {0:'NYC', 1:'SFO', 2:'LON'}</text>
            <text x="10" y="40" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Data: [0, 1, 0, 2, 0] &rarr; Stored in 2 bits/row</text>
          </g>

          <g transform="translate(14, 90)">
            <rect x="0" y="0" width="282" height="46" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
            <text x="10" y="16" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">RUN-LENGTH ENCODING (RLE)</text>
            <text x="10" y="28" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">Sorted state: ['TX', 'TX', 'TX', 'WA', 'WA']</text>
            <text x="10" y="40" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Encoded: [('TX', 3), ('WA', 2)] &rarr; 85% disk reduction</text>
          </g>

          <g transform="translate(14, 144)">
            <rect x="0" y="0" width="282" height="50" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="0.8" />
            <text x="10" y="16" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">DELTA-OF-DELTA + BITPACKING</text>
            <text x="10" y="30" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7">Timestamp stream: 1620000000, 1620000010, ...</text>
            <text x="10" y="42" fill="#a1a1aa" font-size="7">Compresses 8-byte ints down to ~1.2 bytes/val</text>
          </g>
        </g>
        <path d="M 674 166 L 700 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 3: Vectorized SIMD Instruction Execution -->
        <g transform="translate(710, 62)">
          <rect x="0" y="0" width="262" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">3. SIMD VECTOR PIPELINE</text>

          <rect x="14" y="36" width="234" height="66" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1.2" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">AVX-512 REGISTER [512 Bits]</text>
          <text x="22" y="66" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Loads 16x 32-bit integers in 1 cycle</text>
          <text x="22" y="80" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">_mm512_cmp_epi32_mask(&gt; 30)</text>
          <text x="22" y="94" fill="#a1a1aa" font-size="7">Evaluates 16 rows per clock tick</text>

          <rect x="14" y="112" width="234" height="84" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="128" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">MORSEL-DRIVEN PARALLELISM</text>
          <text x="22" y="144" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">&bull; Worker threads steal 100k chunks</text>
          <text x="22" y="158" fill="#a1a1aa" font-size="7.5">&bull; Zero lock contention on aggregation</text>
          <text x="22" y="172" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">&bull; 1.2 Billion rows/sec on single socket</text>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 9. DISTRIBUTED 2-PHASE COMMIT (2PC) & RAFT CONSENSUS REPLICATION
  // ---------------------------------------------------------------------------
  function renderDistributed2PcSvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">DISTRIBUTED 2-PHASE COMMIT (2PC) // COORDINATOR, PARTICIPANTS &amp; RAFT QUORUM</text>
        <rect x="834" y="18" width="140" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="904" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">DISTRIBUTED ACID</text>

        <!-- Node 1: Transaction Coordinator -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="220" height="208" rx="6" fill="#0c0d10" stroke="#ffffff" stroke-width="1.2" />
          <text x="14" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">TXN COORDINATOR (Node 01)</text>

          <rect x="14" y="36" width="192" height="64" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">Global Txn: 0x9AF10</text>
          <text x="22" y="66" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Participants: [Shard A, Shard B]</text>
          <text x="22" y="78" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">State: WAITING_FOR_VOTES</text>

          <rect x="14" y="110" width="192" height="86" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="126" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">COORDINATOR LOG</text>
          <text x="22" y="142" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">&bull; PREPARE record fsynced</text>
          <text x="22" y="156" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">&bull; Votes received: 2 / 2 YES</text>
          <text x="22" y="170" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">&bull; COMMIT record fsynced</text>
        </g>

        <!-- Bi-directional arrows -->
        <g transform="translate(258, 100)">
          <path d="M 0 10 L 40 10" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />
          <text x="20" y="4" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">1. PREPARE</text>

          <path d="M 40 30 L 0 30" fill="none" stroke="#71717a" stroke-width="1.2" marker-end="url(#arch-arrow-zinc)" />
          <text x="20" y="42" fill="#71717a" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">2. VOTE_YES</text>

          <path d="M 0 60 L 40 60" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />
          <text x="20" y="54" fill="#ffffff" font-family="ui-monospace, monospace" font-size="6.5" text-anchor="middle">3. COMMIT</text>
        </g>

        <!-- Node 2: Participant Shard A (Raft Quorum) -->
        <g transform="translate(308, 62)">
          <rect x="0" y="0" width="310" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <text x="14" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">PARTICIPANT A (SHARD 01 // RAFT LEADER)</text>

          <g transform="translate(14, 36)">
            <rect x="0" y="0" width="282" height="52" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
            <text x="10" y="18" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">Local Lock Reservation</text>
            <text x="10" y="32" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Account #101: Exclusive Lock Acquired</text>
            <text x="10" y="44" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">Guarantees transaction cannot conflict</text>
          </g>

          <g transform="translate(14, 98)">
            <rect x="0" y="0" width="282" height="96" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1" />
            <text x="10" y="18" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">RAFT LOG REPLICATION (QUORUM: 2 OF 3)</text>
            <text x="10" y="32" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Leader: Node 02 &rarr; Replicating to [Node 03, Node 04]</text>
            <rect x="10" y="40" width="262" height="20" rx="2" fill="#090a0d" />
            <text x="18" y="53" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">Index 4910: AppendEntries(Txn 0x9AF10)</text>
            <text x="10" y="74" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7.5">&bull; Quorum ACK received in 1.4ms &bull; Log Committed</text>
            <text x="10" y="88" fill="#71717a" font-size="7">Survives leader crash with zero data loss</text>
          </g>
        </g>

        <!-- Node 3: Participant Shard B -->
        <g transform="translate(636, 62)">
          <rect x="0" y="0" width="336" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">PARTICIPANT B (SHARD 02 // REMOTE REGION)</text>

          <rect x="14" y="36" width="308" height="52" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="0.8" />
          <text x="10" y="18" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">Local Lock Reservation</text>
          <text x="10" y="32" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Account #808: Exclusive Lock Acquired</text>
          <text x="10" y="44" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">Locks held until 2PC phase 2 commit token arrives</text>

          <rect x="14" y="98" width="308" height="96" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="10" y="18" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">CONSENSUS &amp; LEASEHOLDER STATE</text>
          <text x="10" y="34" fill="#a1a1aa" font-size="7.5">&bull; Hybrid Logical Clock (HLC) Timestamp: 171092000.12</text>
          <text x="10" y="48" fill="#a1a1aa" font-size="7.5">&bull; Read Lease guarantees local linearizable reads</text>
          <text x="10" y="62" fill="#a1a1aa" font-size="7.5">&bull; Phase 2 Commit applied: Locks released</text>
          <rect x="10" y="70" width="288" height="18" rx="2" fill="#1f1f23" stroke="#ffffff" stroke-width="0.8" />
          <text x="154" y="83" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700" text-anchor="middle">GLOBAL TRANSACTION 0x9AF10 COMMITTED</text>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 10. WINDOW FUNCTION MULTI-PASS EXECUTION FRAME
  // ---------------------------------------------------------------------------
  function renderWindowExecutionSvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">WINDOW FUNCTION EXECUTION // PARTITION SORTING &amp; SLIDING FRAME BUFFER</text>
        <rect x="834" y="18" width="140" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="904" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">SLIDING WINDOW ENGINE</text>

        <!-- Col 1: Query & Partition Sorting -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="220" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">1. WINDOW DEFINITION</text>

          <rect x="14" y="36" width="192" height="74" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">SQL Over Clause:</text>
          <text x="22" y="66" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7">OVER (</text>
          <text x="30" y="78" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7">PARTITION BY dept</text>
          <text x="30" y="90" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7">ORDER BY salary DESC</text>
          <text x="30" y="102" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7" font-weight="700">ROWS 2 PRECEDING</text>

          <rect x="14" y="120" width="192" height="74" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
          <text x="22" y="136" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">PARTITION HASH ROUTING</text>
          <text x="22" y="152" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">Dept 'Eng' &rarr; Partition 01</text>
          <text x="22" y="166" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">Dept 'Sales' &rarr; Partition 02</text>
          <text x="22" y="180" fill="#71717a" font-size="7">Zero inter-partition data bleed</text>
        </g>
        <path d="M 258 166 L 286 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 2: The Physical Sliding Frame Buffer -->
        <g transform="translate(296, 62)">
          <rect x="0" y="0" width="410" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
          <text x="14" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">2. PHYSICAL SLIDING FRAME BUFFER (PARTITION: 'ENG')</text>

          <!-- Row 1: Preceding 2 -->
          <g transform="translate(14, 36)">
            <rect x="0" y="0" width="382" height="34" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8" />
            <text x="10" y="21" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">Row 1: [Emp: 101, Sal: $180k] &bull; 2 PRECEDING</text>
            <rect x="290" y="8" width="80" height="18" rx="2" fill="#18181b" />
            <text x="330" y="21" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">In Frame Window</text>
          </g>

          <!-- Row 2: Preceding 1 -->
          <g transform="translate(14, 76)">
            <rect x="0" y="0" width="382" height="34" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8" />
            <text x="10" y="21" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">Row 2: [Emp: 102, Sal: $160k] &bull; 1 PRECEDING</text>
            <rect x="290" y="8" width="80" height="18" rx="2" fill="#18181b" />
            <text x="330" y="21" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">In Frame Window</text>
          </g>

          <!-- Row 3: Current Row (Evaluated) -->
          <g transform="translate(14, 116)">
            <rect x="0" y="0" width="382" height="42" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1.4" />
            <text x="10" y="20" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">Row 3: [Emp: 103, Sal: $140k] &bull; CURRENT ROW &larr; EVAL</text>
            <text x="10" y="32" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7">Rolling Avg Window: ($180k + $160k + $140k) / 3 = $160,000</text>
            <rect x="290" y="10" width="80" height="22" rx="2" fill="#1f1f23" stroke="#ffffff" stroke-width="0.8" />
            <text x="330" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700" text-anchor="middle">HEAD POINTER</text>
          </g>

          <!-- Row 4: Outside Frame -->
          <g transform="translate(14, 164)">
            <rect x="0" y="0" width="382" height="32" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.04)" stroke-width="0.8" />
            <text x="10" y="20" fill="#3f3f46" font-family="ui-monospace, monospace" font-size="7.5">Row 4: [Emp: 104, Sal: $120k] &bull; FOLLOWING (OUTSIDE FRAME)</text>
          </g>
        </g>
        <path d="M 716 166 L 744 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 3: Framing Semantics & Pointers -->
        <g transform="translate(754, 62)">
          <rect x="0" y="0" width="218" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">3. FRAME SPEC DISCIPLINE</text>

          <rect x="14" y="36" width="190" height="74" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">ROWS vs RANGE</text>
          <text x="22" y="66" fill="#a1a1aa" font-size="7.5">&bull; ROWS: Physical offset count</text>
          <text x="22" y="80" fill="#a1a1aa" font-size="7.5">&bull; RANGE: Value interval peer groups</text>
          <text x="22" y="94" fill="#71717a" font-size="7">RANGE defaults include peer ties!</text>

          <rect x="14" y="120" width="190" height="74" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
          <text x="22" y="136" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">ALGORITHMIC COMPLEXITY</text>
          <text x="22" y="152" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">&bull; Partition Sort: O(N log N)</text>
          <text x="22" y="166" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">&bull; Ring Buffer Eval: O(N)</text>
          <text x="22" y="180" fill="#a1a1aa" font-size="7">Zero secondary query re-execution</text>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 11. EXTERNAL SORT & TOURNAMENT MERGE ENGINE
  // ---------------------------------------------------------------------------
  function renderExternalSortSvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">EXTERNAL MERGE SORT // WORK_MEM RUN GENERATION &amp; K-WAY MERGE FAN-IN</text>
        <rect x="834" y="18" width="140" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="904" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">BOUNDED WORK_MEM</text>

        <!-- Col 1: Phase 1: In-Memory Run Generation -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="220" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">1. RUN GENERATION</text>

          <rect x="14" y="36" width="192" height="66" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">work_mem Buffer [4 MB]</text>
          <text x="22" y="66" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">QuickSort / Replacement Sel.</text>
          <text x="22" y="78" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Sorts tuples in RAM until full</text>
          <text x="22" y="90" fill="#71717a" font-family="ui-monospace, monospace" font-size="7">Spills sorted run to temp disk</text>

          <rect x="14" y="112" width="192" height="84" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
          <text x="22" y="128" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">TEMP DISK RUNS (SPILL)</text>
          <rect x="22" y="138" width="176" height="14" rx="2" fill="#141418" />
          <text x="28" y="148" fill="#ffffff" font-family="ui-monospace, monospace" font-size="6.5">Run 01: [K: 04, 12, 19, 28, 44, 91]</text>
          <rect x="22" y="156" width="176" height="14" rx="2" fill="#141418" />
          <text x="28" y="166" fill="#ffffff" font-family="ui-monospace, monospace" font-size="6.5">Run 02: [K: 02, 18, 33, 40, 50, 88]</text>
          <rect x="22" y="174" width="176" height="14" rx="2" fill="#141418" />
          <text x="28" y="184" fill="#ffffff" font-family="ui-monospace, monospace" font-size="6.5">Run 03: [K: 07, 15, 29, 39, 60, 99]</text>
        </g>
        <path d="M 258 166 L 286 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 2: K-Way Tournament Tree Merge -->
        <g transform="translate(296, 62)">
          <rect x="0" y="0" width="410" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
          <text x="14" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">2. TOURNAMENT TREE (LOSER TREE) K-WAY MERGE</text>

          <!-- Input streams from runs -->
          <g transform="translate(14, 36)">
            <rect x="0" y="0" width="80" height="34" rx="2" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8" />
            <text x="40" y="16" fill="#71717a" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">Run 01 Head</text>
            <text x="40" y="28" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700" text-anchor="middle">Key: 04</text>

            <rect x="100" y="0" width="80" height="34" rx="2" fill="#18181b" stroke="#ffffff" stroke-width="1" />
            <text x="140" y="16" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">Run 02 Head</text>
            <text x="140" y="28" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700" text-anchor="middle">Key: 02 &bull; MIN</text>

            <rect x="200" y="0" width="80" height="34" rx="2" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8" />
            <text x="240" y="16" fill="#71717a" font-family="ui-monospace, monospace" font-size="7" text-anchor="middle">Run 03 Head</text>
            <text x="240" y="28" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700" text-anchor="middle">Key: 07</text>
          </g>

          <!-- Pointers to comparator -->
          <path d="M 54 70 L 140 100" fill="none" stroke="#71717a" stroke-width="1" marker-end="url(#arch-arrow-zinc)" />
          <path d="M 140 70 L 140 100" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />
          <path d="M 240 70 L 140 100" fill="none" stroke="#71717a" stroke-width="1" marker-end="url(#arch-arrow-zinc)" />

          <!-- Minimum Output Collector -->
          <g transform="translate(14, 106)">
            <rect x="0" y="0" width="382" height="42" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1.2" />
            <text x="14" y="20" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">EMITTING MINIMUM: Key 02 &rarr; ADVANCE RUN 02</text>
            <text x="14" y="32" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">Output Stream: [02, 04, 07, 12, 15, 18, 19, 28, ...]</text>
          </g>

          <g transform="translate(14, 158)">
            <rect x="0" y="0" width="382" height="38" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.04)" stroke-width="0.8" />
            <text x="14" y="18" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">FAN-IN RATIO: B = (work_mem / block_size) - 1</text>
            <text x="14" y="30" fill="#52525b" font-family="ui-monospace, monospace" font-size="7">Single-pass merge if total runs &le; B. Multi-pass if data &gt;&gt; RAM.</text>
          </g>
        </g>
        <path d="M 716 166 L 744 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 3: I/O Cost Metrics -->
        <g transform="translate(754, 62)">
          <rect x="0" y="0" width="218" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">3. I/O COMPLEXITY</text>

          <rect x="14" y="36" width="190" height="74" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">TOTAL DISK I/O:</text>
          <text x="22" y="68" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">2 * N * (1 + ceil(log_B(N/B)))</text>
          <text x="22" y="84" fill="#a1a1aa" font-size="7.5">Every pass reads &amp; writes full table</text>
          <text x="22" y="96" fill="#71717a" font-size="7">Tuning work_mem avoids 2nd pass!</text>

          <rect x="14" y="120" width="190" height="74" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
          <text x="22" y="136" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">STREAMING CONSUMER</text>
          <text x="22" y="152" fill="#a1a1aa" font-size="7.5">&bull; Pipelined directly to client</text>
          <text x="22" y="166" fill="#a1a1aa" font-size="7.5">&bull; Instant first-row delivery (LIMIT)</text>
          <text x="22" y="180" fill="#71717a" font-size="7">&bull; Zero full-table materialization in client</text>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 12. DATABASE LOCKING & CONCURRENCY HIERARCHY (2PL & LATCHES)
  // ---------------------------------------------------------------------------
  function renderLockingHierarchySvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">LOCKING HIERARCHY &amp; 2PL // INTENTION LOCKS, PAGE LATCHES &amp; DEADLOCK DETECTION</text>
        <rect x="834" y="18" width="140" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="904" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">STRICT 2PL ACID</text>

        <!-- Col 1: Lock Hierarchy Tree (Database -> Table -> Page -> Row) -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="260" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">1. GRANULAR LOCK TREE</text>

          <!-- Level 1: Table -->
          <rect x="14" y="36" width="232" height="32" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="24" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">TABLE: 'ORDERS' [IX LOCK]</text>
          <text x="24" y="62" fill="#71717a" font-family="ui-monospace, monospace" font-size="6.5">Intention Exclusive: Signals intention to lock child rows</text>

          <path d="M 60 68 L 60 84" fill="none" stroke="#ffffff" stroke-width="1" marker-end="url(#arch-arrow-white)" />

          <!-- Level 2: Page -->
          <rect x="14" y="86" width="232" height="32" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.12)" stroke-width="0.8" />
          <text x="24" y="102" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">PAGE 42 [IX INTENTION / SHORT LATCH]</text>
          <text x="24" y="112" fill="#71717a" font-family="ui-monospace, monospace" font-size="6.5">Short memory latch protects pointer consistency</text>

          <path d="M 60 118 L 60 134" fill="none" stroke="#ffffff" stroke-width="1" marker-end="url(#arch-arrow-white)" />

          <!-- Level 3: Row -->
          <rect x="14" y="136" width="232" height="42" rx="3" fill="#1f1f23" stroke="#ffffff" stroke-width="1.2" />
          <text x="24" y="152" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">ROW: ORDER_ID 109 [X LOCK]</text>
          <text x="24" y="164" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7">Exclusive Write Lock: Blocks concurrent writers &amp; dirty readers</text>
        </g>
        <path d="M 298 166 L 324 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 2: Strict 2-Phase Locking (2PL) Protocol -->
        <g transform="translate(334, 62)">
          <rect x="0" y="0" width="340" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <text x="14" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">2. STRICT TWO-PHASE LOCKING (S2PL)</text>

          <g transform="translate(14, 36)">
            <rect x="0" y="0" width="312" height="52" rx="3" fill="#18181b" stroke="#ffffff" stroke-width="1" />
            <text x="12" y="18" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">GROWING PHASE (ACQUISITION ONLY)</text>
            <text x="12" y="32" fill="#a1a1aa" font-size="7.5">Txn acquires locks before reading or writing.</text>
            <text x="12" y="44" fill="#71717a" font-size="7">Once a lock is released, NO MORE LOCKS can be acquired.</text>
          </g>

          <g transform="translate(14, 98)">
            <rect x="0" y="0" width="312" height="52" rx="3" fill="#141418" stroke="rgba(255,255,255,0.08)" stroke-width="0.8" />
            <text x="12" y="18" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">SHRINKING PHASE (HOLD UNTIL COMMIT)</text>
            <text x="12" y="32" fill="#a1a1aa" font-size="7.5">Strict 2PL: All X-locks held until COMMIT or ABORT.</text>
            <text x="12" y="44" fill="#71717a" font-size="7">Prevents cascading rollbacks completely.</text>
          </g>

          <g transform="translate(14, 158)">
            <rect x="0" y="0" width="312" height="38" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.04)" stroke-width="0.8" />
            <text x="12" y="18" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5">COMPATIBILITY MATRIX:</text>
            <text x="12" y="30" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7">IS &cap; IS: OK | IS &cap; IX: OK | X &cap; ANY: CONFLICT</text>
          </g>
        </g>
        <path d="M 684 166 L 710 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Col 3: Deadlock Detection Engine -->
        <g transform="translate(720, 62)">
          <rect x="0" y="0" width="252" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">3. DEADLOCK WAIT-FOR GRAPH</text>

          <rect x="14" y="36" width="224" height="66" rx="3" fill="#141418" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="52" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">CYCLE DETECTION (DFS)</text>
          <text x="22" y="66" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">T1 holds Lock A, waits on Lock B</text>
          <text x="22" y="78" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="7.5">T2 holds Lock B, waits on Lock A</text>
          <text x="22" y="92" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700">&rarr; CYCLE DETECTED: [T1 &rarr; T2 &rarr; T1]</text>

          <rect x="14" y="112" width="224" height="84" rx="3" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="22" y="128" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">VICTIM RESOLUTION</text>
          <text x="22" y="144" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5">&bull; Cost metric: least work done</text>
          <text x="22" y="158" fill="#a1a1aa" font-size="7.5">&bull; T2 selected as victim &rarr; ROLLBACK</text>
          <text x="22" y="172" fill="#a1a1aa" font-size="7.5">&bull; Lock A granted to T1 immediately</text>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // CATALOG OF ALL 12 ENTERPRISE ARCHITECTURE DIAGRAMS
  // ---------------------------------------------------------------------------
  const DIAGRAM_CATALOG = [
    {
      id: 'buffer_pool',
      title: 'Buffer Pool & Storage Engine I/O',
      badge: 'MEMORY PIPELINE',
      fn: renderBufferPoolSvg
    },
    {
      id: 'btree_index',
      title: 'B+ Tree Index Point Lookup & Range Scan',
      badge: 'O(log N) CLUSTER',
      fn: renderBTreeIndexSvg
    },
    {
      id: 'hash_join',
      title: 'In-Memory Hash Join Engine: Build vs Probe',
      badge: 'O(M+N) STREAMING',
      fn: renderHashJoinDagSvg
    },
    {
      id: 'wal_aries',
      title: 'WAL & ARIES Crash Recovery Protocol',
      badge: 'DURABILITY // LSN',
      fn: renderWalAriesRecoverySvg
    },
    {
      id: 'query_optimizer',
      title: 'Cost-Based Query Optimizer & Volcano Iterator',
      badge: 'CBO // REL ALGEBRA',
      fn: renderQueryOptimizerSvg
    },
    {
      id: 'mvcc',
      title: 'MVCC Snapshot Isolation & Tuple Version Chains',
      badge: 'NON-BLOCKING READS',
      fn: renderMvccConcurrencySvg
    },
    {
      id: 'lsm_tree',
      title: 'LSM-Tree Storage Engine & Leveled Compaction',
      badge: 'ROCKSDB // SSTABLES',
      fn: renderLsmTreeStorageSvg
    },
    {
      id: 'columnar_simd',
      title: 'Columnar Storage & SIMD Vectorized Execution',
      badge: 'CLICKHOUSE // AVX-512',
      fn: renderColumnarVectorizedSvg
    },
    {
      id: 'distributed_2pc',
      title: 'Distributed 2-Phase Commit & Raft Consensus',
      badge: 'DISTRIBUTED ACID',
      fn: renderDistributed2PcSvg
    },
    {
      id: 'window_execution',
      title: 'Window Function Multi-Pass Sliding Frame',
      badge: 'FRAME BUFFER ENGINE',
      fn: renderWindowExecutionSvg
    },
    {
      id: 'external_sort',
      title: 'External Merge Sort & Tournament Loser Tree',
      badge: 'BOUNDED WORK_MEM',
      fn: renderExternalSortSvg
    },
    {
      id: 'locking_hierarchy',
      title: 'Locking Hierarchy, Strict 2PL & Deadlock Graphs',
      badge: 'CONCURRENCY TREE',
      fn: renderLockingHierarchySvg
    }
  ];


  function normalizeDiagramId(id) {
    if (!id) return 'buffer_pool';
    const clean = String(id).toLowerCase().replace(/[-_]/g, '');
    if (clean.includes('buffer')) return 'buffer_pool';
    if (clean.includes('btree')) return 'btree_index';
    if (clean.includes('hash')) return 'hash_join';
    if (clean.includes('wal') || clean.includes('aries')) return 'wal_aries';
    if (clean.includes('opt')) return 'query_optimizer';
    if (clean.includes('mvcc')) return 'mvcc';
    if (clean.includes('lsm')) return 'lsm_tree';
    if (clean.includes('col') || clean.includes('simd')) return 'columnar_simd';
    if (clean.includes('2pc') || clean.includes('dist')) return 'distributed_2pc';
    if (clean.includes('window')) return 'window_execution';
    if (clean.includes('sort')) return 'external_sort';
    if (clean.includes('lock') || clean.includes('2pl')) return 'locking_hierarchy';
    return 'buffer_pool';
  }

  function getCatalog() {
    return DIAGRAM_CATALOG;
  }

  function renderById(id) {
    const norm = normalizeDiagramId(id);
    const item = DIAGRAM_CATALOG.find(d => d.id === norm || d.id === id);
    if (item && typeof item.fn === 'function') {
      return item.fn();
    }
    return renderBufferPoolSvg();
  }

  return {
    getCatalog: getCatalog,
    renderById: renderById,
    renderBufferPoolSvg: renderBufferPoolSvg,
    renderBTreeIndexSvg: renderBTreeIndexSvg,
    renderHashJoinDagSvg: renderHashJoinDagSvg,
    renderWalAriesRecoverySvg: renderWalAriesRecoverySvg,
    renderQueryOptimizerSvg: renderQueryOptimizerSvg,
    renderMvccConcurrencySvg: renderMvccConcurrencySvg,
    renderLsmTreeStorageSvg: renderLsmTreeStorageSvg,
    renderColumnarVectorizedSvg: renderColumnarVectorizedSvg,
    renderDistributed2PcSvg: renderDistributed2PcSvg,
    renderWindowExecutionSvg: renderWindowExecutionSvg,
    renderExternalSortSvg: renderExternalSortSvg,
    renderLockingHierarchySvg: renderLockingHierarchySvg
  };
})();
