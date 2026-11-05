// =============================================================================
// DEEP-DIVE PRACTICE VOLUMES SVG REPOSITORY
// High-Resolution Editorial Explainer Diagrams (Carbon Monochrome Architecture)
// 48 Handcrafted Diagrams Visualizing Physical Relational & Storage Invariants
// =============================================================================

window.DeepDivePracticeSvgs = {

    "vol1_01_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_01_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_01_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_01_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_01_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">PHYSICAL BUFFER POOL FRAME REPLACEMENT</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// 2Q / LRU-2 Circular Clock Sweep against Scan Pollution</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
      <g transform="translate(30, 60)">
        <!-- Frames array -->
        <rect x="0" y="0" width="880" height="130" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" />
        <text x="16" y="24" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">CIRCULAR BUFFER POOL FRAME ARRAY // CLOCK HAND SWEEP</text>
        
        <!-- Frame Slots -->
        <rect x="20" y="40" width="95" height="70" rx="4" fill="#1f2029" stroke="#ffffff" stroke-width="1.2" />
        <text x="28" y="58" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">FRAME 01</text>
        <text x="28" y="74" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Page: 1001</text>
        <text x="28" y="88" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Pin: 0 | Dirty</text>
        <text x="28" y="102" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">EVICT CANDIDATE</text>

        <rect x="125" y="40" width="95" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
        <text x="133" y="58" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">FRAME 02</text>
        <text x="133" y="74" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Page: 1002</text>
        <text x="133" y="88" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Pin: 2 | Clean</text>
        <text x="133" y="102" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">PROTECTED</text>

        <rect x="230" y="40" width="95" height="70" rx="4" fill="#1f2029" stroke="#ffffff" stroke-width="1.2" />
        <text x="238" y="58" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">FRAME 03</text>
        <text x="238" y="74" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Page: 1003</text>
        <text x="238" y="88" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Pin: 0 | Clean</text>
        <text x="238" y="102" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">EVICT CANDIDATE</text>

        <rect x="335" y="40" width="95" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
        <text x="343" y="58" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">FRAME 04</text>
        <text x="343" y="74" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Page: 1004</text>
        <text x="343" y="88" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Pin: 5 | Clean</text>
        <text x="343" y="102" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">CATALOG META</text>

        <rect x="440" y="40" width="95" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
        <text x="448" y="58" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">FRAME 05</text>
        <text x="448" y="74" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Page: 1005</text>
        <text x="448" y="88" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Pin: 0 | Ref: 1</text>
        <text x="448" y="102" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">CLOCK PASS 1</text>

        <rect x="545" y="40" width="95" height="70" rx="4" fill="#1f2029" stroke="#ffffff" stroke-width="1.2" />
        <text x="553" y="58" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">FRAME 06</text>
        <text x="553" y="74" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Page: 1006</text>
        <text x="553" y="88" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Pin: 0 | Clean</text>
        <text x="553" y="102" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">EVICT CANDIDATE</text>

        <rect x="650" y="40" width="95" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
        <text x="658" y="58" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">FRAME 07</text>
        <text x="658" y="74" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Page: 1007</text>
        <text x="658" y="88" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Pin: 1 | Dirty</text>
        <text x="658" y="102" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">ACTIVE LATCH</text>

        <rect x="755" y="40" width="95" height="70" rx="4" fill="#1f2029" stroke="#ffffff" stroke-width="1.2" />
        <text x="763" y="58" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">FRAME 08</text>
        <text x="763" y="74" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Page: 1008</text>
        <text x="763" y="88" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Pin: 0 | Dirty</text>
        <text x="763" y="102" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">EVICT CANDIDATE</text>

        <!-- Laser Clock Sweep Hand -->
        <path d="M 68 115 L 68 150 L 278 150 L 278 115" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4 3" />
        <text x="173" y="165" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" fill="#ffffff">CLOCK HAND ADVANCE // CLEAR REF &amp; EVICT PIN=0</text>
      </g>

      <g transform="translate(30, 240)">
        <rect x="0" y="0" width="420" height="120" rx="5" fill="#121318" stroke="rgba(255,255,255,0.12)" />
        <text x="16" y="24" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">LRU-2 DUAL-QUEUE ADMISSION</text>
        <text x="16" y="45" font-family="system-ui, sans-serif" font-size="9.5" fill="#a1a1aa">1st Touch: Lands in Q1 (FIFO probation queue).</text>
        <text x="16" y="65" font-family="system-ui, sans-serif" font-size="9.5" fill="#a1a1aa">2nd Touch: Promoted to Q2 (Warm LRU cache).</text>
        <text x="16" y="90" font-family="ui-monospace, monospace" font-size="9" fill="#ffffff">INVARIANT: Full sequential table scan never evicts Q2 pages.</text>

        <rect x="460" y="0" width="450" height="120" rx="5" fill="#121318" stroke="rgba(255,255,255,0.12)" />
        <text x="476" y="24" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DIRTY FLUSH WRITEBACK PIPELINE</text>
        <text x="476" y="45" font-family="system-ui, sans-serif" font-size="9.5" fill="#a1a1aa">Frame 01 &amp; Frame 08 flagged is_dirty = 1.</text>
        <text x="476" y="65" font-family="system-ui, sans-serif" font-size="9.5" fill="#a1a1aa">Dispatched to Background Cleaner thread before reuse.</text>
        <text x="476" y="90" font-family="ui-monospace, monospace" font-size="9" fill="#ffffff">INVARIANT: WAL LSN &lt;= Flushed LSN before tablespace sync.</text>
      </g>
    

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ENGINE INVARIANT</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Unpinned frames (pin_count=0) with cleared reference bits are evicted in order of oldest touch, isolating sequential scans from hot cache lines.</text>
        </svg>
      `;
    },


    "vol1_02_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_02_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_02_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_02_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_02_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STORAGE ARCHITECTURE // TOPIC V1-02</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Physical Disk, Memory & Hardware Storage Invariants</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left Node: Physical Block / Memory Frame Structure -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MEMORY &amp; CACHE LAYOUT [PHYSICAL STEP 01]</text>
                    
                    <!-- Sub-blocks / Slotted layout -->
                    <rect x="20" y="48" width="380" height="42" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#ffffff">HEADER &amp; METADATA CONTROL REGISTER</text>
                    <text x="32" y="82" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Page ID // LSN 0x00F891 // Pin Count // Latch Mutex // Checksum</text>

                    <rect x="20" y="102" width="380" height="85" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ACTIVE SLOTS &amp; POINTER ARRAY</text>
                    <text x="32" y="140" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 00: Offset 8120 (len 92)  |  Slot 01: [TOMBSTONE HOLE] (len 100)</text>
                    <text x="32" y="156" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 02: Offset 7850 (len 150) |  Slot 03: [TOMBSTONE HOLE] (len 250)</text>
                    <text x="32" y="174" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">&gt;&gt; FREE SPACE COMPACTION THRESHOLD EXCEEDED (43.2% DEAD)</text>

                    <rect x="20" y="198" width="380" height="85" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="218" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DATA PAYLOAD TUPLE HEAP [BOTTOM-UP GROWTH]</text>
                    <text x="32" y="238" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Variable-Length VARCHAR / BLOB / Null Bitmap Byte Array</text>
                    <text x="32" y="258" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Physical alignment: 64-byte L1 CPU cache-line boundary aligned</text>
                  </g>

                  <!-- Center Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right Node: Persistent Storage & I/O Pipeline -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PERSISTENCE &amp; HARDWARE STORAGE PIPELINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O_DIRECT ZERO-COPY DMA CONTROLLER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Bypasses OS page cache to eliminate double-buffering latency.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Direct Memory Access transfers directly between NVMe and Buffer Pool.</text>

                    <rect x="20" y="125" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DOUBLEWRITE BUFFER TORN-PAGE SHIELD</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Contiguous 2MB sequential disk write preceding tablespace update.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Guarantees 16KB physical page atomicity on sudden power loss.</text>

                    <rect x="20" y="202" width="380" height="80" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="222" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SSD FLASH WEAR-LEVELING &amp; TRIM GC</text>
                    <text x="32" y="240" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Erase Block: 256 physical flash pages (2MB total).</text>
                    <text x="32" y="256" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Background GC reclaims dead blocks to bound Write Amplification (WAF).</text>
                    <text x="32" y="272" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">FTL controller mapping: Monotonic sequence LSN ordering preserved.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Subsystem physical layout: enforces cache-line locality, 4KB/16KB page alignment, and sequential I/O bandwidth invariants.</text>
        </svg>
      `;
    },


    "vol1_03_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_03_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_03_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_03_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_03_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STORAGE ARCHITECTURE // TOPIC V1-03</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Physical Disk, Memory & Hardware Storage Invariants</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left Node: Physical Block / Memory Frame Structure -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MEMORY &amp; CACHE LAYOUT [PHYSICAL STEP 01]</text>
                    
                    <!-- Sub-blocks / Slotted layout -->
                    <rect x="20" y="48" width="380" height="42" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#ffffff">HEADER &amp; METADATA CONTROL REGISTER</text>
                    <text x="32" y="82" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Page ID // LSN 0x00F891 // Pin Count // Latch Mutex // Checksum</text>

                    <rect x="20" y="102" width="380" height="85" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ACTIVE SLOTS &amp; POINTER ARRAY</text>
                    <text x="32" y="140" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 00: Offset 8120 (len 92)  |  Slot 01: [TOMBSTONE HOLE] (len 100)</text>
                    <text x="32" y="156" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 02: Offset 7850 (len 150) |  Slot 03: [TOMBSTONE HOLE] (len 250)</text>
                    <text x="32" y="174" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">&gt;&gt; FREE SPACE COMPACTION THRESHOLD EXCEEDED (43.2% DEAD)</text>

                    <rect x="20" y="198" width="380" height="85" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="218" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DATA PAYLOAD TUPLE HEAP [BOTTOM-UP GROWTH]</text>
                    <text x="32" y="238" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Variable-Length VARCHAR / BLOB / Null Bitmap Byte Array</text>
                    <text x="32" y="258" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Physical alignment: 64-byte L1 CPU cache-line boundary aligned</text>
                  </g>

                  <!-- Center Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right Node: Persistent Storage & I/O Pipeline -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PERSISTENCE &amp; HARDWARE STORAGE PIPELINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O_DIRECT ZERO-COPY DMA CONTROLLER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Bypasses OS page cache to eliminate double-buffering latency.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Direct Memory Access transfers directly between NVMe and Buffer Pool.</text>

                    <rect x="20" y="125" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DOUBLEWRITE BUFFER TORN-PAGE SHIELD</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Contiguous 2MB sequential disk write preceding tablespace update.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Guarantees 16KB physical page atomicity on sudden power loss.</text>

                    <rect x="20" y="202" width="380" height="80" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="222" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SSD FLASH WEAR-LEVELING &amp; TRIM GC</text>
                    <text x="32" y="240" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Erase Block: 256 physical flash pages (2MB total).</text>
                    <text x="32" y="256" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Background GC reclaims dead blocks to bound Write Amplification (WAF).</text>
                    <text x="32" y="272" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">FTL controller mapping: Monotonic sequence LSN ordering preserved.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Subsystem physical layout: enforces cache-line locality, 4KB/16KB page alignment, and sequential I/O bandwidth invariants.</text>
        </svg>
      `;
    },


    "vol1_04_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_04_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_04_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_04_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_04_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STORAGE ARCHITECTURE // TOPIC V1-04</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Physical Disk, Memory & Hardware Storage Invariants</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left Node: Physical Block / Memory Frame Structure -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MEMORY &amp; CACHE LAYOUT [PHYSICAL STEP 01]</text>
                    
                    <!-- Sub-blocks / Slotted layout -->
                    <rect x="20" y="48" width="380" height="42" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#ffffff">HEADER &amp; METADATA CONTROL REGISTER</text>
                    <text x="32" y="82" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Page ID // LSN 0x00F891 // Pin Count // Latch Mutex // Checksum</text>

                    <rect x="20" y="102" width="380" height="85" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ACTIVE SLOTS &amp; POINTER ARRAY</text>
                    <text x="32" y="140" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 00: Offset 8120 (len 92)  |  Slot 01: [TOMBSTONE HOLE] (len 100)</text>
                    <text x="32" y="156" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 02: Offset 7850 (len 150) |  Slot 03: [TOMBSTONE HOLE] (len 250)</text>
                    <text x="32" y="174" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">&gt;&gt; FREE SPACE COMPACTION THRESHOLD EXCEEDED (43.2% DEAD)</text>

                    <rect x="20" y="198" width="380" height="85" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="218" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DATA PAYLOAD TUPLE HEAP [BOTTOM-UP GROWTH]</text>
                    <text x="32" y="238" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Variable-Length VARCHAR / BLOB / Null Bitmap Byte Array</text>
                    <text x="32" y="258" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Physical alignment: 64-byte L1 CPU cache-line boundary aligned</text>
                  </g>

                  <!-- Center Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right Node: Persistent Storage & I/O Pipeline -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PERSISTENCE &amp; HARDWARE STORAGE PIPELINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O_DIRECT ZERO-COPY DMA CONTROLLER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Bypasses OS page cache to eliminate double-buffering latency.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Direct Memory Access transfers directly between NVMe and Buffer Pool.</text>

                    <rect x="20" y="125" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DOUBLEWRITE BUFFER TORN-PAGE SHIELD</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Contiguous 2MB sequential disk write preceding tablespace update.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Guarantees 16KB physical page atomicity on sudden power loss.</text>

                    <rect x="20" y="202" width="380" height="80" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="222" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SSD FLASH WEAR-LEVELING &amp; TRIM GC</text>
                    <text x="32" y="240" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Erase Block: 256 physical flash pages (2MB total).</text>
                    <text x="32" y="256" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Background GC reclaims dead blocks to bound Write Amplification (WAF).</text>
                    <text x="32" y="272" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">FTL controller mapping: Monotonic sequence LSN ordering preserved.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Subsystem physical layout: enforces cache-line locality, 4KB/16KB page alignment, and sequential I/O bandwidth invariants.</text>
        </svg>
      `;
    },


    "vol1_05_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_05_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_05_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_05_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_05_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STORAGE ARCHITECTURE // TOPIC V1-05</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Physical Disk, Memory & Hardware Storage Invariants</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left Node: Physical Block / Memory Frame Structure -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MEMORY &amp; CACHE LAYOUT [PHYSICAL STEP 01]</text>
                    
                    <!-- Sub-blocks / Slotted layout -->
                    <rect x="20" y="48" width="380" height="42" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#ffffff">HEADER &amp; METADATA CONTROL REGISTER</text>
                    <text x="32" y="82" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Page ID // LSN 0x00F891 // Pin Count // Latch Mutex // Checksum</text>

                    <rect x="20" y="102" width="380" height="85" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ACTIVE SLOTS &amp; POINTER ARRAY</text>
                    <text x="32" y="140" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 00: Offset 8120 (len 92)  |  Slot 01: [TOMBSTONE HOLE] (len 100)</text>
                    <text x="32" y="156" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 02: Offset 7850 (len 150) |  Slot 03: [TOMBSTONE HOLE] (len 250)</text>
                    <text x="32" y="174" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">&gt;&gt; FREE SPACE COMPACTION THRESHOLD EXCEEDED (43.2% DEAD)</text>

                    <rect x="20" y="198" width="380" height="85" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="218" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DATA PAYLOAD TUPLE HEAP [BOTTOM-UP GROWTH]</text>
                    <text x="32" y="238" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Variable-Length VARCHAR / BLOB / Null Bitmap Byte Array</text>
                    <text x="32" y="258" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Physical alignment: 64-byte L1 CPU cache-line boundary aligned</text>
                  </g>

                  <!-- Center Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right Node: Persistent Storage & I/O Pipeline -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PERSISTENCE &amp; HARDWARE STORAGE PIPELINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O_DIRECT ZERO-COPY DMA CONTROLLER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Bypasses OS page cache to eliminate double-buffering latency.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Direct Memory Access transfers directly between NVMe and Buffer Pool.</text>

                    <rect x="20" y="125" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DOUBLEWRITE BUFFER TORN-PAGE SHIELD</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Contiguous 2MB sequential disk write preceding tablespace update.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Guarantees 16KB physical page atomicity on sudden power loss.</text>

                    <rect x="20" y="202" width="380" height="80" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="222" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SSD FLASH WEAR-LEVELING &amp; TRIM GC</text>
                    <text x="32" y="240" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Erase Block: 256 physical flash pages (2MB total).</text>
                    <text x="32" y="256" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Background GC reclaims dead blocks to bound Write Amplification (WAF).</text>
                    <text x="32" y="272" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">FTL controller mapping: Monotonic sequence LSN ordering preserved.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Subsystem physical layout: enforces cache-line locality, 4KB/16KB page alignment, and sequential I/O bandwidth invariants.</text>
        </svg>
      `;
    },


    "vol1_06_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_06_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_06_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_06_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_06_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STORAGE ARCHITECTURE // TOPIC V1-06</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Physical Disk, Memory & Hardware Storage Invariants</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left Node: Physical Block / Memory Frame Structure -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MEMORY &amp; CACHE LAYOUT [PHYSICAL STEP 01]</text>
                    
                    <!-- Sub-blocks / Slotted layout -->
                    <rect x="20" y="48" width="380" height="42" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#ffffff">HEADER &amp; METADATA CONTROL REGISTER</text>
                    <text x="32" y="82" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Page ID // LSN 0x00F891 // Pin Count // Latch Mutex // Checksum</text>

                    <rect x="20" y="102" width="380" height="85" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ACTIVE SLOTS &amp; POINTER ARRAY</text>
                    <text x="32" y="140" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 00: Offset 8120 (len 92)  |  Slot 01: [TOMBSTONE HOLE] (len 100)</text>
                    <text x="32" y="156" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 02: Offset 7850 (len 150) |  Slot 03: [TOMBSTONE HOLE] (len 250)</text>
                    <text x="32" y="174" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">&gt;&gt; FREE SPACE COMPACTION THRESHOLD EXCEEDED (43.2% DEAD)</text>

                    <rect x="20" y="198" width="380" height="85" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="218" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DATA PAYLOAD TUPLE HEAP [BOTTOM-UP GROWTH]</text>
                    <text x="32" y="238" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Variable-Length VARCHAR / BLOB / Null Bitmap Byte Array</text>
                    <text x="32" y="258" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Physical alignment: 64-byte L1 CPU cache-line boundary aligned</text>
                  </g>

                  <!-- Center Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right Node: Persistent Storage & I/O Pipeline -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PERSISTENCE &amp; HARDWARE STORAGE PIPELINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O_DIRECT ZERO-COPY DMA CONTROLLER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Bypasses OS page cache to eliminate double-buffering latency.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Direct Memory Access transfers directly between NVMe and Buffer Pool.</text>

                    <rect x="20" y="125" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DOUBLEWRITE BUFFER TORN-PAGE SHIELD</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Contiguous 2MB sequential disk write preceding tablespace update.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Guarantees 16KB physical page atomicity on sudden power loss.</text>

                    <rect x="20" y="202" width="380" height="80" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="222" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SSD FLASH WEAR-LEVELING &amp; TRIM GC</text>
                    <text x="32" y="240" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Erase Block: 256 physical flash pages (2MB total).</text>
                    <text x="32" y="256" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Background GC reclaims dead blocks to bound Write Amplification (WAF).</text>
                    <text x="32" y="272" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">FTL controller mapping: Monotonic sequence LSN ordering preserved.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Subsystem physical layout: enforces cache-line locality, 4KB/16KB page alignment, and sequential I/O bandwidth invariants.</text>
        </svg>
      `;
    },


    "vol1_07_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_07_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_07_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_07_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_07_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STORAGE ARCHITECTURE // TOPIC V1-07</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Physical Disk, Memory & Hardware Storage Invariants</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left Node: Physical Block / Memory Frame Structure -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MEMORY &amp; CACHE LAYOUT [PHYSICAL STEP 01]</text>
                    
                    <!-- Sub-blocks / Slotted layout -->
                    <rect x="20" y="48" width="380" height="42" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#ffffff">HEADER &amp; METADATA CONTROL REGISTER</text>
                    <text x="32" y="82" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Page ID // LSN 0x00F891 // Pin Count // Latch Mutex // Checksum</text>

                    <rect x="20" y="102" width="380" height="85" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ACTIVE SLOTS &amp; POINTER ARRAY</text>
                    <text x="32" y="140" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 00: Offset 8120 (len 92)  |  Slot 01: [TOMBSTONE HOLE] (len 100)</text>
                    <text x="32" y="156" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 02: Offset 7850 (len 150) |  Slot 03: [TOMBSTONE HOLE] (len 250)</text>
                    <text x="32" y="174" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">&gt;&gt; FREE SPACE COMPACTION THRESHOLD EXCEEDED (43.2% DEAD)</text>

                    <rect x="20" y="198" width="380" height="85" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="218" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DATA PAYLOAD TUPLE HEAP [BOTTOM-UP GROWTH]</text>
                    <text x="32" y="238" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Variable-Length VARCHAR / BLOB / Null Bitmap Byte Array</text>
                    <text x="32" y="258" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Physical alignment: 64-byte L1 CPU cache-line boundary aligned</text>
                  </g>

                  <!-- Center Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right Node: Persistent Storage & I/O Pipeline -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PERSISTENCE &amp; HARDWARE STORAGE PIPELINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O_DIRECT ZERO-COPY DMA CONTROLLER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Bypasses OS page cache to eliminate double-buffering latency.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Direct Memory Access transfers directly between NVMe and Buffer Pool.</text>

                    <rect x="20" y="125" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DOUBLEWRITE BUFFER TORN-PAGE SHIELD</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Contiguous 2MB sequential disk write preceding tablespace update.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Guarantees 16KB physical page atomicity on sudden power loss.</text>

                    <rect x="20" y="202" width="380" height="80" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="222" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SSD FLASH WEAR-LEVELING &amp; TRIM GC</text>
                    <text x="32" y="240" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Erase Block: 256 physical flash pages (2MB total).</text>
                    <text x="32" y="256" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Background GC reclaims dead blocks to bound Write Amplification (WAF).</text>
                    <text x="32" y="272" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">FTL controller mapping: Monotonic sequence LSN ordering preserved.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Subsystem physical layout: enforces cache-line locality, 4KB/16KB page alignment, and sequential I/O bandwidth invariants.</text>
        </svg>
      `;
    },


    "vol1_08_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_08_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_08_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_08_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_08_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STORAGE ARCHITECTURE // TOPIC V1-08</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Physical Disk, Memory & Hardware Storage Invariants</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left Node: Physical Block / Memory Frame Structure -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MEMORY &amp; CACHE LAYOUT [PHYSICAL STEP 01]</text>
                    
                    <!-- Sub-blocks / Slotted layout -->
                    <rect x="20" y="48" width="380" height="42" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#ffffff">HEADER &amp; METADATA CONTROL REGISTER</text>
                    <text x="32" y="82" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Page ID // LSN 0x00F891 // Pin Count // Latch Mutex // Checksum</text>

                    <rect x="20" y="102" width="380" height="85" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ACTIVE SLOTS &amp; POINTER ARRAY</text>
                    <text x="32" y="140" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 00: Offset 8120 (len 92)  |  Slot 01: [TOMBSTONE HOLE] (len 100)</text>
                    <text x="32" y="156" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 02: Offset 7850 (len 150) |  Slot 03: [TOMBSTONE HOLE] (len 250)</text>
                    <text x="32" y="174" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">&gt;&gt; FREE SPACE COMPACTION THRESHOLD EXCEEDED (43.2% DEAD)</text>

                    <rect x="20" y="198" width="380" height="85" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="218" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DATA PAYLOAD TUPLE HEAP [BOTTOM-UP GROWTH]</text>
                    <text x="32" y="238" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Variable-Length VARCHAR / BLOB / Null Bitmap Byte Array</text>
                    <text x="32" y="258" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Physical alignment: 64-byte L1 CPU cache-line boundary aligned</text>
                  </g>

                  <!-- Center Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right Node: Persistent Storage & I/O Pipeline -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PERSISTENCE &amp; HARDWARE STORAGE PIPELINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O_DIRECT ZERO-COPY DMA CONTROLLER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Bypasses OS page cache to eliminate double-buffering latency.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Direct Memory Access transfers directly between NVMe and Buffer Pool.</text>

                    <rect x="20" y="125" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DOUBLEWRITE BUFFER TORN-PAGE SHIELD</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Contiguous 2MB sequential disk write preceding tablespace update.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Guarantees 16KB physical page atomicity on sudden power loss.</text>

                    <rect x="20" y="202" width="380" height="80" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="222" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SSD FLASH WEAR-LEVELING &amp; TRIM GC</text>
                    <text x="32" y="240" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Erase Block: 256 physical flash pages (2MB total).</text>
                    <text x="32" y="256" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Background GC reclaims dead blocks to bound Write Amplification (WAF).</text>
                    <text x="32" y="272" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">FTL controller mapping: Monotonic sequence LSN ordering preserved.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Subsystem physical layout: enforces cache-line locality, 4KB/16KB page alignment, and sequential I/O bandwidth invariants.</text>
        </svg>
      `;
    },


    "vol1_09_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_09_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_09_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_09_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_09_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STORAGE ARCHITECTURE // TOPIC V1-09</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Physical Disk, Memory & Hardware Storage Invariants</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left Node: Physical Block / Memory Frame Structure -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MEMORY &amp; CACHE LAYOUT [PHYSICAL STEP 01]</text>
                    
                    <!-- Sub-blocks / Slotted layout -->
                    <rect x="20" y="48" width="380" height="42" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#ffffff">HEADER &amp; METADATA CONTROL REGISTER</text>
                    <text x="32" y="82" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Page ID // LSN 0x00F891 // Pin Count // Latch Mutex // Checksum</text>

                    <rect x="20" y="102" width="380" height="85" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ACTIVE SLOTS &amp; POINTER ARRAY</text>
                    <text x="32" y="140" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 00: Offset 8120 (len 92)  |  Slot 01: [TOMBSTONE HOLE] (len 100)</text>
                    <text x="32" y="156" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 02: Offset 7850 (len 150) |  Slot 03: [TOMBSTONE HOLE] (len 250)</text>
                    <text x="32" y="174" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">&gt;&gt; FREE SPACE COMPACTION THRESHOLD EXCEEDED (43.2% DEAD)</text>

                    <rect x="20" y="198" width="380" height="85" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="218" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DATA PAYLOAD TUPLE HEAP [BOTTOM-UP GROWTH]</text>
                    <text x="32" y="238" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Variable-Length VARCHAR / BLOB / Null Bitmap Byte Array</text>
                    <text x="32" y="258" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Physical alignment: 64-byte L1 CPU cache-line boundary aligned</text>
                  </g>

                  <!-- Center Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right Node: Persistent Storage & I/O Pipeline -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PERSISTENCE &amp; HARDWARE STORAGE PIPELINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O_DIRECT ZERO-COPY DMA CONTROLLER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Bypasses OS page cache to eliminate double-buffering latency.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Direct Memory Access transfers directly between NVMe and Buffer Pool.</text>

                    <rect x="20" y="125" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DOUBLEWRITE BUFFER TORN-PAGE SHIELD</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Contiguous 2MB sequential disk write preceding tablespace update.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Guarantees 16KB physical page atomicity on sudden power loss.</text>

                    <rect x="20" y="202" width="380" height="80" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="222" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SSD FLASH WEAR-LEVELING &amp; TRIM GC</text>
                    <text x="32" y="240" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Erase Block: 256 physical flash pages (2MB total).</text>
                    <text x="32" y="256" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Background GC reclaims dead blocks to bound Write Amplification (WAF).</text>
                    <text x="32" y="272" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">FTL controller mapping: Monotonic sequence LSN ordering preserved.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Subsystem physical layout: enforces cache-line locality, 4KB/16KB page alignment, and sequential I/O bandwidth invariants.</text>
        </svg>
      `;
    },


    "vol1_10_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_10_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_10_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_10_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_10_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STORAGE ARCHITECTURE // TOPIC V1-10</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Physical Disk, Memory & Hardware Storage Invariants</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left Node: Physical Block / Memory Frame Structure -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MEMORY &amp; CACHE LAYOUT [PHYSICAL STEP 01]</text>
                    
                    <!-- Sub-blocks / Slotted layout -->
                    <rect x="20" y="48" width="380" height="42" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#ffffff">HEADER &amp; METADATA CONTROL REGISTER</text>
                    <text x="32" y="82" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Page ID // LSN 0x00F891 // Pin Count // Latch Mutex // Checksum</text>

                    <rect x="20" y="102" width="380" height="85" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ACTIVE SLOTS &amp; POINTER ARRAY</text>
                    <text x="32" y="140" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 00: Offset 8120 (len 92)  |  Slot 01: [TOMBSTONE HOLE] (len 100)</text>
                    <text x="32" y="156" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 02: Offset 7850 (len 150) |  Slot 03: [TOMBSTONE HOLE] (len 250)</text>
                    <text x="32" y="174" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">&gt;&gt; FREE SPACE COMPACTION THRESHOLD EXCEEDED (43.2% DEAD)</text>

                    <rect x="20" y="198" width="380" height="85" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="218" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DATA PAYLOAD TUPLE HEAP [BOTTOM-UP GROWTH]</text>
                    <text x="32" y="238" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Variable-Length VARCHAR / BLOB / Null Bitmap Byte Array</text>
                    <text x="32" y="258" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Physical alignment: 64-byte L1 CPU cache-line boundary aligned</text>
                  </g>

                  <!-- Center Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right Node: Persistent Storage & I/O Pipeline -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PERSISTENCE &amp; HARDWARE STORAGE PIPELINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O_DIRECT ZERO-COPY DMA CONTROLLER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Bypasses OS page cache to eliminate double-buffering latency.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Direct Memory Access transfers directly between NVMe and Buffer Pool.</text>

                    <rect x="20" y="125" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DOUBLEWRITE BUFFER TORN-PAGE SHIELD</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Contiguous 2MB sequential disk write preceding tablespace update.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Guarantees 16KB physical page atomicity on sudden power loss.</text>

                    <rect x="20" y="202" width="380" height="80" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="222" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SSD FLASH WEAR-LEVELING &amp; TRIM GC</text>
                    <text x="32" y="240" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Erase Block: 256 physical flash pages (2MB total).</text>
                    <text x="32" y="256" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Background GC reclaims dead blocks to bound Write Amplification (WAF).</text>
                    <text x="32" y="272" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">FTL controller mapping: Monotonic sequence LSN ordering preserved.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Subsystem physical layout: enforces cache-line locality, 4KB/16KB page alignment, and sequential I/O bandwidth invariants.</text>
        </svg>
      `;
    },


    "vol1_11_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_11_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_11_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_11_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_11_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STORAGE ARCHITECTURE // TOPIC V1-11</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Physical Disk, Memory & Hardware Storage Invariants</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left Node: Physical Block / Memory Frame Structure -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MEMORY &amp; CACHE LAYOUT [PHYSICAL STEP 01]</text>
                    
                    <!-- Sub-blocks / Slotted layout -->
                    <rect x="20" y="48" width="380" height="42" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#ffffff">HEADER &amp; METADATA CONTROL REGISTER</text>
                    <text x="32" y="82" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Page ID // LSN 0x00F891 // Pin Count // Latch Mutex // Checksum</text>

                    <rect x="20" y="102" width="380" height="85" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ACTIVE SLOTS &amp; POINTER ARRAY</text>
                    <text x="32" y="140" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 00: Offset 8120 (len 92)  |  Slot 01: [TOMBSTONE HOLE] (len 100)</text>
                    <text x="32" y="156" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 02: Offset 7850 (len 150) |  Slot 03: [TOMBSTONE HOLE] (len 250)</text>
                    <text x="32" y="174" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">&gt;&gt; FREE SPACE COMPACTION THRESHOLD EXCEEDED (43.2% DEAD)</text>

                    <rect x="20" y="198" width="380" height="85" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="218" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DATA PAYLOAD TUPLE HEAP [BOTTOM-UP GROWTH]</text>
                    <text x="32" y="238" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Variable-Length VARCHAR / BLOB / Null Bitmap Byte Array</text>
                    <text x="32" y="258" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Physical alignment: 64-byte L1 CPU cache-line boundary aligned</text>
                  </g>

                  <!-- Center Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right Node: Persistent Storage & I/O Pipeline -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PERSISTENCE &amp; HARDWARE STORAGE PIPELINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O_DIRECT ZERO-COPY DMA CONTROLLER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Bypasses OS page cache to eliminate double-buffering latency.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Direct Memory Access transfers directly between NVMe and Buffer Pool.</text>

                    <rect x="20" y="125" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DOUBLEWRITE BUFFER TORN-PAGE SHIELD</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Contiguous 2MB sequential disk write preceding tablespace update.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Guarantees 16KB physical page atomicity on sudden power loss.</text>

                    <rect x="20" y="202" width="380" height="80" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="222" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SSD FLASH WEAR-LEVELING &amp; TRIM GC</text>
                    <text x="32" y="240" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Erase Block: 256 physical flash pages (2MB total).</text>
                    <text x="32" y="256" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Background GC reclaims dead blocks to bound Write Amplification (WAF).</text>
                    <text x="32" y="272" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">FTL controller mapping: Monotonic sequence LSN ordering preserved.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Subsystem physical layout: enforces cache-line locality, 4KB/16KB page alignment, and sequential I/O bandwidth invariants.</text>
        </svg>
      `;
    },


    "vol1_12_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol1_12_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol1_12_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol1_12_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol1_12_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STORAGE ARCHITECTURE // TOPIC V1-12</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Physical Disk, Memory & Hardware Storage Invariants</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left Node: Physical Block / Memory Frame Structure -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MEMORY &amp; CACHE LAYOUT [PHYSICAL STEP 01]</text>
                    
                    <!-- Sub-blocks / Slotted layout -->
                    <rect x="20" y="48" width="380" height="42" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700" fill="#ffffff">HEADER &amp; METADATA CONTROL REGISTER</text>
                    <text x="32" y="82" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Page ID // LSN 0x00F891 // Pin Count // Latch Mutex // Checksum</text>

                    <rect x="20" y="102" width="380" height="85" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="122" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ACTIVE SLOTS &amp; POINTER ARRAY</text>
                    <text x="32" y="140" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 00: Offset 8120 (len 92)  |  Slot 01: [TOMBSTONE HOLE] (len 100)</text>
                    <text x="32" y="156" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Slot 02: Offset 7850 (len 150) |  Slot 03: [TOMBSTONE HOLE] (len 250)</text>
                    <text x="32" y="174" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">&gt;&gt; FREE SPACE COMPACTION THRESHOLD EXCEEDED (43.2% DEAD)</text>

                    <rect x="20" y="198" width="380" height="85" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="218" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DATA PAYLOAD TUPLE HEAP [BOTTOM-UP GROWTH]</text>
                    <text x="32" y="238" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Variable-Length VARCHAR / BLOB / Null Bitmap Byte Array</text>
                    <text x="32" y="258" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Physical alignment: 64-byte L1 CPU cache-line boundary aligned</text>
                  </g>

                  <!-- Center Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right Node: Persistent Storage & I/O Pipeline -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PERSISTENCE &amp; HARDWARE STORAGE PIPELINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O_DIRECT ZERO-COPY DMA CONTROLLER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Bypasses OS page cache to eliminate double-buffering latency.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Direct Memory Access transfers directly between NVMe and Buffer Pool.</text>

                    <rect x="20" y="125" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DOUBLEWRITE BUFFER TORN-PAGE SHIELD</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Contiguous 2MB sequential disk write preceding tablespace update.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Guarantees 16KB physical page atomicity on sudden power loss.</text>

                    <rect x="20" y="202" width="380" height="80" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="222" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SSD FLASH WEAR-LEVELING &amp; TRIM GC</text>
                    <text x="32" y="240" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Erase Block: 256 physical flash pages (2MB total).</text>
                    <text x="32" y="256" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Background GC reclaims dead blocks to bound Write Amplification (WAF).</text>
                    <text x="32" y="272" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">FTL controller mapping: Monotonic sequence LSN ordering preserved.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Subsystem physical layout: enforces cache-line locality, 4KB/16KB page alignment, and sequential I/O bandwidth invariants.</text>
        </svg>
      `;
    },


    "vol2_01_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_01_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_01_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_01_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_01_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-01</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol2_02_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_02_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_02_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_02_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_02_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-02</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol2_03_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_03_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_03_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_03_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_03_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-03</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol2_04_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_04_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_04_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_04_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_04_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-04</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol2_05_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_05_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_05_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_05_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_05_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-05</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol2_06_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_06_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_06_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_06_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_06_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-06</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol2_07_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_07_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_07_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_07_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_07_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-07</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol2_08_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_08_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_08_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_08_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_08_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-08</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol2_09_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_09_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_09_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_09_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_09_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-09</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol2_10_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_10_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_10_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_10_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_10_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-10</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol2_11_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_11_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_11_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_11_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_11_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-11</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol2_12_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol2_12_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol2_12_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol2_12_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol2_12_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">RELATIONAL OPERATOR PHYSICS // TOPIC V2-12</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Hash Engines, Sort Fanout, SIMD Vectorization & Optimization</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Input Stream & Operator Pipeline Stage -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">OPERATOR BUILD / PIPELINE STREAM</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">INPUT VECTOR MORSEL [100,000 ROWS]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Morsel-driven work-stealing queue on NUMA socket node.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Pre-filtered by SIMD AVX-512 bitmask instructions in L1 cache.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HASH TABLE DIRECTORY / LOSER TREE</text>
                    <text x="32" y="163" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Partition 00: In-Memory Fast Path (8MB pinned)</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Partitions 01..K: Spilled to disk buffer under memory pressure</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Fan-in degree: K-way merge with O(log K) priority tournament.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CARDINALITY ESTIMATION ENGINE</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">HyperLogLog register array + Count-Min Sketch frequency tracker.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Prevents catastrophic Cartesian nested loops before execution.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Execution Engine & Physical Memory Buffer -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">PHYSICAL PROBE &amp; AGGREGATE ENGINE</text>

                    <rect x="20" y="48" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAMING PROBE &amp; MARK-RESTORE BUFFER</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Equi-join probe executes in O(1) hash lookup per streaming row.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Duplicate foreign keys trigger in-memory mark-restore materialization.</text>

                    <rect x="20" y="125" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="145" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">O(1) SLIDING WINDOW RING BUFFER</text>
                    <text x="32" y="163" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Maintains running totals: New_Sum = Old_Sum + In_Val - Out_Val.</text>
                    <text x="32" y="177" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Eliminates O(N*K) window frame recomputation latency.</text>
                    <text x="32" y="191" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Boundaries: ROWS BETWEEN K PRECEDING AND CURRENT ROW.</text>

                    <rect x="20" y="212" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="232" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">VECTORIZED BATCH OUTPUT SINK</text>
                    <text x="32" y="250" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Emits 2048-tuple vector batches directly to client sockets.</text>
                    <text x="32" y="264" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Zero tuple-at-a-time Volcano virtual function invocation overhead.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">ALGORITHMIC BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Operator physical execution model: dynamic partition spilling, cache-line streaming, and vectorized register evaluation.</text>
        </svg>
      `;
    },


    "vol3_01_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_01_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_01_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_01_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_01_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-01</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol3_02_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_02_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_02_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_02_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_02_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-02</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol3_03_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_03_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_03_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_03_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_03_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-03</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol3_04_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_04_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_04_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_04_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_04_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-04</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol3_05_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_05_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_05_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_05_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_05_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-05</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol3_06_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_06_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_06_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_06_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_06_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-06</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol3_07_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_07_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_07_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_07_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_07_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-07</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol3_08_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_08_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_08_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_08_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_08_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-08</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol3_09_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_09_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_09_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_09_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_09_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-09</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol3_10_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_10_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_10_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_10_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_10_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-10</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol3_11_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_11_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_11_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_11_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_11_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-11</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol3_12_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol3_12_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol3_12_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol3_12_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol3_12_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">CONCURRENCY & DISTRIBUTED CONSENSUS // TOPIC V3-12</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// MVCC Visibility, Strict 2PL, Raft Quorum & Outbox Reliability</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Concurrency & Lock Graph -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">MVCC SNAPSHOT &amp; LOCK MANAGER GRAPH</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SNAPSHOT HORIZON: [xmin: 100, xmax: 110]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Active uncommitted array: [Tx 102, Tx 107].</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Tuple Visibility: xmin committed &amp;&amp; (xmax IS NULL || xmax uncommitted).</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WAIT-FOR GRAPH (WFG) DEADLOCK DETECTOR</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Tx 101 --(PAGE_44)--&gt; Tx 102 --(ROW_88)--&gt; Tx 103</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Tx 103 --(PAGE_12)--&gt; Tx 101  [CIRCULAR DEPENDENCY DETECTED]</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#a1a1aa">Victim Preemption: Abort Tx 103 (lowest WAL byte generation).</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">NEXT-KEY LOCKING PHANTOM SHIELD</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Record Locks on keys (20, 30, 50) + Gap Locks on (10, 20], (20, 30].</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Blocks concurrent INSERTs until transaction commit or abort.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Distributed Consensus & Replication -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">DISTRIBUTED 2PC &amp; RAFT QUORUM ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TWO-PHASE COMMIT (2PC) COORDINATOR STATE</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Global Tx GTX_9001: Shards 1, 2, 3 all voted PREPARE (YES).</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Coordinator crash recovery: Unanimous YES forces recovery COMMIT.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">RAFT CONSENSUS QUORUM (TERM 04)</text>
                    <text x="32" y="168" font-family="ui-monospace, monospace" font-size="8.5" fill="#a1a1aa">Nodes 1, 2, 3 in Term 4 (Majority: 3/5 nodes = Quorum Active).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#71717a">Nodes 4, 5 in Term 3 (Minority: 2/5 nodes = Isolated Partition).</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Strict majority overlap guarantees zero split-brain data corruption.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">TRANSACTIONAL OUTBOX &amp; CDC RELAY</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Atomic local ACID write guarantees message creation with entity.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Debezium tails WAL to stream messages to Kafka without dual-write risk.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">CONSENSUS BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">Distributed invariants: atomic commit coordination, non-blocking snapshot reads, and split-brain majority protection.</text>
        </svg>
      `;
    },


    "vol4_01_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_01_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_01_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_01_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_01_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-01</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },


    "vol4_02_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_02_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_02_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_02_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_02_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-02</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },


    "vol4_03_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_03_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_03_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_03_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_03_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-03</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },


    "vol4_04_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_04_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_04_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_04_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_04_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-04</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },


    "vol4_05_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_05_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_05_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_05_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_05_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-05</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },


    "vol4_06_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_06_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_06_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_06_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_06_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-06</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },


    "vol4_07_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_07_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_07_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_07_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_07_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-07</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },


    "vol4_08_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_08_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_08_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_08_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_08_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-08</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },


    "vol4_09_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_09_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_09_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_09_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_09_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-09</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },


    "vol4_10_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_10_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_10_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_10_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_10_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-10</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },


    "vol4_11_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_11_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_11_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_11_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_11_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-11</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },


    "vol4_12_svg": function(prob) {
      var accent = '#ffffff';
      return `
        <svg viewBox="0 0 940 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="editorial-diagram-svg" style="display:block; background:#090a0d; border-radius:6px; overflow:hidden;">
          <defs>
            <pattern id="grid_vol4_12_svg" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#3f3f46" opacity="0.3" />
            </pattern>
            <linearGradient id="grad_pulse_vol4_12_svg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="box_fill_vol4_12_svg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#18181b" />
              <stop offset="100%" stop-color="#0f1015" />
            </linearGradient>
          </defs>

          <!-- Background & Grid -->
          <rect width="100%" height="100%" fill="#090a0d" />
          <rect width="100%" height="100%" fill="url(#grid_vol4_12_svg)" />
          <rect width="100%" height="100%" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

          <!-- Top Telemetry Header -->
          <rect x="0" y="0" width="940" height="38" fill="#121318" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <circle cx="20" cy="19" r="4.5" fill="#ffffff" />
          <text x="32" y="23" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">STREAM PROCESSING & TIME-SERIES // TOPIC V4-12</text>
          <text x="450" y="23" font-family="ui-monospace, monospace" font-size="9.5" fill="#a1a1aa">// Tumbling Windows, Watermarks, H3 Geospatial & Financial PnL</text>
          <rect x="800" y="8" width="124" height="22" rx="4" fill="#1c1d24" stroke="rgba(255,255,255,0.15)" />
          <text x="862" y="23" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">HARDWARE INVARIANT</text>

          <!-- Main Architectural Graphic Canvas -->
          
                  <g transform="translate(30, 55)">
                    <!-- Left: Ingestion & Windowing Engine -->
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">STREAM INGESTION &amp; TIME WINDOW ENGINE</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">WATERMARK EVENT-TIME FILTER [CUTOFF: T-30s]</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Timely arrivals are aggregated into active tumbling windows.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Late events beyond watermark cutoff route to Dead-Letter Queue.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">DYNAMIC SESSIONIZATION GAP DETECTOR</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Inactivity gap threshold = 900 seconds (15 minutes).</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">LAG() comparison dynamically delineates user browsing sessions.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Unbounded clickstreams partitioned without pre-fixed time boundaries.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">SALTED PARTITION KEY SHARDING</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Hot key suffix (merchant_101_% 8) balances 100K events/sec.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Eliminates single-shard consumer lag and CPU core saturation.</text>
                  </g>

                  <!-- Traversal Laser Pulse -->
                  <path d="M 450 190 L 490 190" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 3" />
                  <polygon points="492,190 484,185 484,195" fill="#ffffff" />

                  <!-- Right: Real-Time Analytics & Aggregation Engine -->
                  <g transform="translate(490, 55)">
                    <rect x="0" y="0" width="420" height="300" rx="6" fill="#121318" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />
                    <rect x="0" y="0" width="420" height="32" rx="6" fill="#18181b" />
                    <text x="16" y="21" font-family="ui-monospace, monospace" font-size="10" font-weight="700" fill="#ffffff">REAL-TIME ANALYTICS &amp; VALUATION SINK</text>

                    <rect x="20" y="48" width="380" height="70" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="68" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">UBER H3 DISCRETE HEXAGONAL GRID INDEX</text>
                    <text x="32" y="86" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Earth surface discretized into 64-bit integer hexagonal cells.</text>
                    <text x="32" y="100" font-family="ui-monospace, monospace" font-size="8" fill="#ffffff">Rider and driver pairing executes via O(1) integer relational join.</text>

                    <rect x="20" y="130" width="380" height="75" rx="4" fill="#1f2029" stroke="rgba(255,255,255,0.12)" />
                    <text x="32" y="150" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">REAL-TIME FINANCIAL PnL &amp; MtM EXPOSURE</text>
                    <text x="32" y="168" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Live market quote ticks stream into shared memory ring buffer.</text>
                    <text x="32" y="184" font-family="ui-monospace, monospace" font-size="8.5" fill="#ffffff">Instantaneous dot-product: (last_price - entry_price) * qty.</text>
                    <text x="32" y="198" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">Evaluates multi-million dollar desk capital risk with sub-microsecond latency.</text>

                    <rect x="20" y="217" width="380" height="65" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.1)" />
                    <text x="32" y="237" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">LTTB DOWNSAMPLING &amp; T-DIGEST QUANTILE</text>
                    <text x="32" y="255" font-family="system-ui, sans-serif" font-size="8.5" fill="#a1a1aa">Largest Triangle Three Buckets preserves visual peaks in 50 points.</text>
                    <text x="32" y="269" font-family="ui-monospace, monospace" font-size="8" fill="#71717a">T-Digest clusters centroids to calculate distributed P99 latency.</text>
                  </g>
                

          <!-- Bottom Footer Telemetry Callout -->
          <rect x="20" y="380" width="900" height="44" rx="5" fill="#121318" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
          <rect x="30" y="392" width="130" height="20" rx="3" fill="#27272a" />
          <text x="95" y="406" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="#ffffff">STREAM BOUND</text>
          <text x="175" y="407" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" fill="#d4d4d8">High-throughput real-time streaming: event-time watermarking, inactivity sessionization, and sub-microsecond vector valuation.</text>
        </svg>
      `;
    },

};
