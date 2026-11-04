/**
 * SQL FOUNDRY - DATABASE ENGINE ARCHITECTURE EXPLAINER SVGS
 * Pure high-contrast Carbon monochrome diagrams illustrating relational engine internals.
 * Standard ViewBox: 1000 x 300 (Clean, widescreen architecture aspect ratio).
 * Zero neon colors, razor-sharp hairlines, tabular monospace metrics.
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

        <!-- Outer Frame -->
        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

        <!-- Title Bar -->
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">BUFFER POOL &amp; STORAGE ENGINE I/O // ZERO-COPY MEMORY PIPELINE</text>
        <rect x="854" y="18" width="120" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="914" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">VOLCANO ENGINE</text>

        <!-- Column 1: Client SQL Execution Stream -->
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

        <!-- Connector Arrow 1 -->
        <path d="M 218 166 L 246 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Column 2: Buffer Pool Manager (RAM) -->
        <g transform="translate(254, 62)">
          <rect x="0" y="0" width="460" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          
          <rect x="0" y="0" width="460" height="26" rx="6" fill="#141418" />
          <line x1="0" y1="26" x2="460" y2="26" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="14" y="17" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">2. IN-MEMORY BUFFER POOL (RAM // innodb_buffer_pool_size / shared_buffers)</text>

          <!-- Hash Directory (Page ID -> Frame ID) -->
          <g transform="translate(14, 38)">
            <rect x="0" y="0" width="190" height="154" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
            <text x="12" y="18" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">PAGE DIRECTORY (HASH)</text>
            
            <rect x="8" y="28" width="174" height="24" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.1)" stroke-width="0.8" />
            <text x="14" y="44" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5">Page 1048 &rarr; Frame 03 (HIT)</text>

            <rect x="8" y="58" width="174" height="24" rx="3" fill="#111115" />
            <text x="14" y="74" fill="#71717a" font-family="ui-monospace, monospace" font-size="8.5">Page 1049 &rarr; Frame 07 (HIT)</text>

            <rect x="8" y="88" width="174" height="24" rx="3" fill="#111115" />
            <text x="14" y="104" fill="#71717a" font-family="ui-monospace, monospace" font-size="8.5">Page 2088 &rarr; Frame 11 (HIT)</text>

            <line x1="8" y1="120" x2="182" y2="120" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
            <text x="14" y="136" fill="#ffffff" font-size="8" font-weight="600">Cache Hit Ratio: 99.8%</text>
            <text x="14" y="146" fill="#52525b" font-size="7.5">O(1) Bucket Resolution in RAM</text>
          </g>

          <!-- Frame Array & LRU-2 Eviction Clock -->
          <g transform="translate(216, 38)">
            <rect x="0" y="0" width="230" height="154" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
            <text x="12" y="18" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">FRAME ARRAY &amp; CLOCK SWEEP</text>

            <!-- Frame 01 -->
            <rect x="8" y="28" width="214" height="24" rx="3" fill="#111115" />
            <text x="14" y="44" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5">[F01] 8KB &bull; Clean &bull; Ref=1</text>

            <!-- Frame 02 -->
            <rect x="8" y="58" width="214" height="24" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
            <text x="14" y="74" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5">[F02] 8KB &bull; DIRTY &bull; LSN 49120</text>

            <!-- Frame 03 (Hit Frame) -->
            <rect x="8" y="88" width="214" height="24" rx="3" fill="#1f1f24" stroke="#ffffff" stroke-width="0.8" />
            <text x="14" y="104" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">[F03] 8KB &bull; P1048 &bull; Pinned (Read)</text>

            <line x1="8" y1="120" x2="222" y2="120" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
            <text x="14" y="136" fill="#a1a1aa" font-size="8">Dirty Frame Flush: Async WAL checkpoint</text>
            <text x="14" y="146" fill="#52525b" font-size="7.5">Pin count prevents premature eviction</text>
          </g>
        </g>

        <!-- Connector Arrow 2 -->
        <path d="M 724 166 L 752 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Column 3: Storage Engine & Disk Subsystem -->
        <g transform="translate(760, 62)">
          <rect x="0" y="0" width="212" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">3. PERSISTENT STORAGE</text>

          <!-- WAL Append -->
          <g transform="translate(14, 38)">
            <rect x="0" y="0" width="184" height="66" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
            <text x="10" y="17" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="600">WAL / REDO LOG (Sequential)</text>
            <text x="10" y="33" fill="#71717a" font-size="8">O_DIRECT Append-Only Flush</text>
            <rect x="10" y="42" width="164" height="16" rx="2" fill="#18181b" />
            <text x="14" y="54" fill="#d4d4d8" font-family="ui-monospace, monospace" font-size="7.5">LSN 49118 &rarr; 49119 &rarr; 49120</text>
          </g>

          <!-- Tablespace Disk Blocks -->
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

        <!-- Outer Frame -->
        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

        <!-- Title Bar -->
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">B+ TREE INDEX LOOKUP // POINT SEEK &amp; DOUBLY-LINKED RANGE SCAN</text>
        <rect x="844" y="18" width="130" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="909" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">O(LOG N) SEARCH</text>

        <!-- Level 0: ROOT PAGE -->
        <g transform="translate(370, 58)">
          <rect x="0" y="0" width="260" height="48" rx="6" fill="#141418" stroke="#ffffff" stroke-width="1" />
          <text x="130" y="18" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8" font-weight="700" text-anchor="middle">ROOT NODE (PAGE 100)</text>
          
          <!-- Key Cells -->
          <rect x="12" y="24" width="70" height="18" rx="2" fill="#1f1f24" />
          <text x="47" y="36" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" text-anchor="middle">&lt; 30</text>

          <rect x="95" y="24" width="70" height="18" rx="2" fill="#27272a" stroke="rgba(255,255,255,0.3)" stroke-width="0.8" />
          <text x="130" y="36" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">30 &le; K &lt; 70</text>

          <rect x="178" y="24" width="70" height="18" rx="2" fill="#1f1f24" />
          <text x="213" y="36" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" text-anchor="middle">&ge; 70</text>
        </g>

        <!-- Branch Connector Lines from Root to Intermediate -->
        <path d="M 417 106 L 240 134" fill="none" stroke="#71717a" stroke-width="1" marker-end="url(#arch-arrow-zinc)" />
        <path d="M 500 106 L 500 134" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />
        <path d="M 583 106 L 760 134" fill="none" stroke="#71717a" stroke-width="1" marker-end="url(#arch-arrow-zinc)" />

        <!-- Level 1: INTERMEDIATE NODES -->
        <!-- Child 1 -->
        <g transform="translate(130, 136)">
          <rect x="0" y="0" width="220" height="42" rx="5" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="110" y="16" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5" text-anchor="middle">BRANCH (PAGE 201) [1..29]</text>
          <text x="110" y="32" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8">Keys: 10 | 20</text>
        </g>

        <!-- Child 2 (Active Search Path) -->
        <g transform="translate(390, 136)">
          <rect x="0" y="0" width="220" height="42" rx="5" fill="#141418" stroke="#ffffff" stroke-width="1" />
          <text x="110" y="16" fill="#ffffff" font-family="ui-monospace, monospace" font-size="7.5" font-weight="700" text-anchor="middle">BRANCH (PAGE 202) [30..69] (TRAVERSED)</text>
          <text x="110" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">Keys: 40 | 55 (Seek K=42 &rarr; Left)</text>
        </g>

        <!-- Child 3 -->
        <g transform="translate(650, 136)">
          <rect x="0" y="0" width="220" height="42" rx="5" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="110" y="16" fill="#71717a" font-family="ui-monospace, monospace" font-size="7.5" text-anchor="middle">BRANCH (PAGE 203) [70..99]</text>
          <text x="110" y="32" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8">Keys: 80 | 90</text>
        </g>

        <!-- Branch to Leaves -->
        <path d="M 500 178 L 500 206" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Level 2: LEAF PAGES (DOUBLY LINKED CHAIN) -->
        <g transform="translate(60, 210)">
          <!-- Leaf 1 -->
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="260" height="64" rx="5" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
            <text x="14" y="18" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">LEAF PAGE 501</text>
            <rect x="10" y="26" width="240" height="28" rx="3" fill="#111115" />
            <text x="18" y="44" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8">K:10 &rarr; TID(1,2) | K:20 &rarr; TID(1,5)</text>
          </g>

          <!-- Doubly Linked Arrow 1 <-> 2 -->
          <path d="M 264 242 L 306 242" fill="none" stroke="#71717a" stroke-width="1.2" marker-end="url(#arch-arrow-zinc)" />
          <path d="M 306 248 L 264 248" fill="none" stroke="#71717a" stroke-width="1.2" marker-end="url(#arch-arrow-zinc)" />

          <!-- Leaf 2 (Match Target) -->
          <g transform="translate(310, 0)">
            <rect x="0" y="0" width="260" height="64" rx="5" fill="#18181b" stroke="#ffffff" stroke-width="1.2" />
            <text x="14" y="18" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8" font-weight="700">LEAF PAGE 502 (POINT HIT K=42)</text>
            <rect x="10" y="26" width="240" height="28" rx="3" fill="#27272a" stroke="rgba(255,255,255,0.2)" stroke-width="0.8" />
            <text x="18" y="44" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">K:42 &rarr; TID(Page: 1048, Slot: 03)</text>
          </g>

          <!-- Doubly Linked Arrow 2 <-> 3 -->
          <path d="M 574 242 L 616 242" fill="none" stroke="#71717a" stroke-width="1.2" marker-end="url(#arch-arrow-zinc)" />
          <path d="M 616 248 L 574 248" fill="none" stroke="#71717a" stroke-width="1.2" marker-end="url(#arch-arrow-zinc)" />

          <!-- Leaf 3 -->
          <g transform="translate(620, 0)">
            <rect x="0" y="0" width="260" height="64" rx="5" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
            <text x="14" y="18" fill="#71717a" font-family="ui-monospace, monospace" font-size="8">LEAF PAGE 503 (SEQUENTIAL RANGE)</text>
            <rect x="10" y="26" width="240" height="28" rx="3" fill="#111115" />
            <text x="18" y="44" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8">K:55 &rarr; TID(2,1) | K:62 &rarr; TID(2,4)</text>
          </g>
        </g>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // 3. HASH JOIN EXECUTION DAG (BUILD VS PROBE PHASE)
  // ---------------------------------------------------------------------------
  function renderHashJoinDagSvg() {
    return `
      <svg class="engine-arch-svg" viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        ${getEngineDefs()}
        <rect x="0" y="0" width="1000" height="300" fill="#000000" />
        <rect x="0" y="0" width="1000" height="300" fill="url(#arch-mesh-grid)" />

        <!-- Outer Frame -->
        <rect x="12" y="10" width="976" height="280" rx="8" fill="#090a0d" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

        <!-- Title Bar -->
        <rect x="12" y="10" width="976" height="36" rx="8" fill="#111116" />
        <line x1="12" y1="46" x2="988" y2="46" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="28" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="11" font-weight="700" letter-spacing="0.04em">HASH JOIN EXECUTION DAG // PHASE 1: BUILD HASH TABLE &rarr; PHASE 2: STREAMING PROBE</text>
        <rect x="850" y="18" width="124" height="20" rx="3" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        <text x="912" y="32" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" text-anchor="middle">O(M + N) LINEAR</text>

        <!-- Phase 1: BUILD (Left Table: Departments) -->
        <g transform="translate(28, 62)">
          <rect x="0" y="0" width="260" height="208" rx="6" fill="#0c0d10" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          <text x="14" y="24" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9" font-weight="700">PHASE 1: BUILD (SMALL RELATION)</text>
          
          <rect x="14" y="36" width="232" height="154" rx="4" fill="#08080a" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="24" y="54" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="600">Scan Table: Departments (M=3)</text>
          
          <rect x="24" y="66" width="212" height="22" fill="#141418" />
          <text x="32" y="80" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">[dept_id=1, name='Engineering']</text>

          <rect x="24" y="92" width="212" height="22" fill="#111115" />
          <text x="32" y="106" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">[dept_id=2, name='Product']</text>

          <rect x="24" y="118" width="212" height="22" fill="#141418" />
          <text x="32" y="132" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8">[dept_id=3, name='Analytics']</text>

          <line x1="24" y1="148" x2="236" y2="148" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <text x="24" y="164" fill="#52525b" font-size="8">Full table read into hash kernel</text>
          <text x="24" y="176" fill="#52525b" font-size="7.5">WorkMem: 14.2 KB (No temp spill)</text>
        </g>

        <!-- Arrow to Hash Table -->
        <path d="M 292 166 L 332 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

        <!-- Center: IN-MEMORY HASH TABLE BUCKETS -->
        <g transform="translate(340, 62)">
          <rect x="0" y="0" width="310" height="208" rx="6" fill="#111116" stroke="#ffffff" stroke-width="1" />
          <text x="14" y="24" fill="#ffffff" font-family="ui-monospace, monospace" font-size="9" font-weight="700">IN-MEMORY HASH TABLE (RAM BUCKETS)</text>

          <rect x="14" y="38" width="282" height="42" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
          <text x="24" y="54" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8">Bucket #0 (h(dept_id=1) % 4)</text>
          <text x="24" y="70" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">&bull; Key=1: Engineering &rarr; [Node ptr]</text>

          <rect x="14" y="86" width="282" height="42" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
          <text x="24" y="102" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8">Bucket #1 (h(dept_id=2) % 4)</text>
          <text x="24" y="118" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">&bull; Key=2: Product &rarr; [Node ptr]</text>

          <rect x="14" y="134" width="282" height="42" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
          <text x="24" y="150" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="8">Bucket #2 (h(dept_id=3) % 4)</text>
          <text x="24" y="166" fill="#ffffff" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700">&bull; Key=3: Analytics &rarr; [Node ptr]</text>

          <text x="14" y="194" fill="#71717a" font-size="7.5">MurmurHash3 64-bit seed &bull; Collision chain resolution</text>
        </g>

        <!-- Arrow to Probe / Emitter -->
        <path d="M 654 166 L 694 166" fill="none" stroke="#ffffff" stroke-width="1.2" marker-end="url(#arch-arrow-white)" />

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

  return {
    renderBufferPoolSvg: renderBufferPoolSvg,
    renderBTreeIndexSvg: renderBTreeIndexSvg,
    renderHashJoinDagSvg: renderHashJoinDagSvg
  };
})();
