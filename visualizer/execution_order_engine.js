// =============================================================================
// ANIMATED SQL EXECUTION ORDER ENGINE ("ENGINE STEP-THROUGH")
// Demonstrates physical vs lexical query execution order with interactive scrubbers
// =============================================================================

const SQL_EXECUTION_STEPS = [
  {
    stepNumber: 1,
    clause: 'FROM',
    title: '1. FROM & JOIN — Working Table Identification',
    tagline: 'The database engine first identifies data sources and loads physical disk pages into memory buffers.',
    lexicalIndex: 2,
    codeSnippet: 'FROM Employees',
    explanation: 'Before filtering or projecting columns, the SQL engine must locate the target physical tables and materialize the working Cartesian product or join sets.',
    engineAction: 'Disk I/O -> Buffer Pool Allocation -> Table Scan initialized.',
    inputRows: 'Disk Storage: 10 Records',
    outputRows: 'Buffer Pool: 10 Working Rows',
    previewTable: [
      { id: 1, name: 'Sarah Connor', dept: 'Engineering', sal: '$95,000', status: 'Loaded' },
      { id: 2, name: 'John Doe', dept: 'Sales', sal: '$72,000', status: 'Loaded' },
      { id: 3, name: 'Elena Rostova', dept: 'Finance', sal: '$88,000', status: 'Loaded' },
      { id: 4, name: 'David Miller', dept: 'Engineering', sal: '$110,000', status: 'Loaded' }
    ]
  },
  {
    stepNumber: 2,
    clause: 'WHERE',
    title: '2. WHERE — Pre-Aggregation Row Filtering',
    tagline: 'Individual rows are evaluated against boolean predicates. Non-matching rows are immediately pruned.',
    lexicalIndex: 3,
    codeSnippet: 'WHERE salary > 75000',
    explanation: 'WHERE runs BEFORE GROUP BY! Individual rows that fail the boolean predicate are discarded before any CPU cycles are spent computing aggregates.',
    engineAction: 'Predicate Pushdown / B-Tree Index Seek -> Row Pruning.',
    inputRows: '10 Working Rows',
    outputRows: '3 Discarded, 7 Rows Passed',
    previewTable: [
      { id: 1, name: 'Sarah Connor', dept: 'Engineering', sal: '$95,000', status: '✓ Passed (> 75k)' },
      { id: 2, name: 'John Doe', dept: 'Sales', sal: '$72,000', status: '✗ Dropped (<= 75k)' },
      { id: 3, name: 'Elena Rostova', dept: 'Finance', sal: '$88,000', status: '✓ Passed (> 75k)' },
      { id: 4, name: 'David Miller', dept: 'Engineering', sal: '$110,000', status: '✓ Passed (> 75k)' }
    ]
  },
  {
    stepNumber: 3,
    clause: 'GROUP BY',
    title: '3. GROUP BY — Partition Bucketing',
    tagline: 'Surviving individual rows are partitioned into distinct hash buckets sharing common grouping keys.',
    lexicalIndex: 4,
    codeSnippet: 'GROUP BY department',
    explanation: 'The engine creates internal hash buckets. From this moment onward, individual rows collapse; subsequent steps can only reference grouping keys or aggregate rollups.',
    engineAction: 'Hash Partitioning / Sort-Aggregate table allocation.',
    inputRows: '7 Individual Rows',
    outputRows: '3 Group Buckets Created (Engineering, Finance, HR)',
    previewTable: [
      { id: 'Bucket 1', name: 'Engineering', dept: 'Engineering', sal: 'Count: 2 rows ($95k, $110k)', status: 'Bucket Formed' },
      { id: 'Bucket 2', name: 'Finance', dept: 'Finance', sal: 'Count: 1 row ($88k)', status: 'Bucket Formed' },
      { id: 'Bucket 3', name: 'HR', dept: 'HR', sal: 'Count: 1 row ($80k)', status: 'Bucket Formed' }
    ]
  },
  {
    stepNumber: 4,
    clause: 'HAVING',
    title: '4. HAVING — Post-Aggregation Group Filtering',
    tagline: 'Aggregate expressions (COUNT, AVG, SUM) are evaluated. Entire buckets failing the condition are pruned.',
    lexicalIndex: 5,
    codeSnippet: 'HAVING COUNT(*) >= 2',
    explanation: 'Unlike WHERE (which prunes individual rows), HAVING prunes entire summary buckets based on calculated aggregate metrics.',
    engineAction: 'Aggregate Metric Evaluation -> Bucket Elimination.',
    inputRows: '3 Group Buckets',
    outputRows: '1 Bucket Survived, 2 Buckets Pruned',
    previewTable: [
      { id: 'Bucket 1', name: 'Engineering', dept: 'Engineering', sal: 'COUNT(*) = 2', status: '✓ Passed (>= 2)' },
      { id: 'Bucket 2', name: 'Finance', dept: 'Finance', sal: 'COUNT(*) = 1', status: '✗ Pruned (< 2)' },
      { id: 'Bucket 3', name: 'HR', dept: 'HR', sal: 'COUNT(*) = 1', status: '✗ Pruned (< 2)' }
    ]
  },
  {
    stepNumber: 5,
    clause: 'SELECT',
    title: '5. SELECT — Column Projection & Expression Evaluation',
    tagline: 'The engine projects target columns, resolves aliases, and calculates final mathematical scalar expressions.',
    lexicalIndex: 1,
    codeSnippet: 'SELECT department, COUNT(*) AS staff_count, ROUND(AVG(salary), 2) AS avg_sal',
    explanation: 'Notice that SELECT runs FIFTH, not first! This is why you cannot use a SELECT alias (like `AS staff_count`) in the WHERE or HAVING clause in ANSI SQL.',
    engineAction: 'Column Projection -> Alias Binding -> Expression Arithmetic.',
    inputRows: '1 Qualifying Bucket',
    outputRows: 'Projected Output Columns (dept, staff_count, avg_sal)',
    previewTable: [
      { id: 1, name: 'Engineering', dept: 'staff_count: 2', sal: 'avg_sal: $102,500.00', status: 'Projected' }
    ]
  },
  {
    stepNumber: 6,
    clause: 'DISTINCT',
    title: '6. DISTINCT — Duplicate Elimination',
    tagline: 'If the DISTINCT keyword was specified, duplicate projected tuples are collapsed into unique values.',
    lexicalIndex: 1.5,
    codeSnippet: 'DISTINCT (Optional)',
    explanation: 'DISTINCT runs after SELECT projection because it must compare the final projected tuples to detect duplicates across all selected columns.',
    engineAction: 'Hash Deduplication / Unique Index Filter.',
    inputRows: '1 Projected Record',
    outputRows: '1 Unique Record',
    previewTable: [
      { id: 1, name: 'Engineering', dept: 'staff_count: 2', sal: 'avg_sal: $102,500.00', status: 'Unique' }
    ]
  },
  {
    stepNumber: 7,
    clause: 'ORDER BY',
    title: '7. ORDER BY — Output Sorting',
    tagline: 'The resulting tuples are sorted according to specified criteria and directions (ASC or DESC).',
    lexicalIndex: 6,
    codeSnippet: 'ORDER BY avg_sal DESC',
    explanation: 'ORDER BY runs SEVENTH! Because SELECT has already run, ORDER BY is the first clause that can legally reference SELECT column aliases!',
    engineAction: 'QuickSort / Timsort on Sort Keys.',
    inputRows: 'Unsorted Tuples',
    outputRows: 'Deterministically Ordered Tuples',
    previewTable: [
      { id: 1, name: 'Engineering', dept: 'staff_count: 2', sal: 'avg_sal: $102,500.00', status: 'Rank #1' }
    ]
  },
  {
    stepNumber: 8,
    clause: 'LIMIT',
    title: '8. LIMIT / OFFSET — Pagination & Window Slicing',
    tagline: 'The engine slices the top N tuples from the sorted output and discards the rest.',
    lexicalIndex: 7,
    codeSnippet: 'LIMIT 3 OFFSET 0;',
    explanation: 'LIMIT is the very last step. It truncates the pipeline stream, returning exactly the requested rows to the client application.',
    engineAction: 'Top-N Heap Slicing -> Cursor Stream Dispatched.',
    inputRows: 'Sorted Output Buffer',
    outputRows: 'Final Result Set Delivered to Client (1 row)',
    previewTable: [
      { id: 1, name: 'Engineering', dept: 'staff_count: 2', sal: 'avg_sal: $102,500.00', status: 'Delivered' }
    ]
  }
];

class ExecutionOrderVisualizer {
  constructor() {
    this.currentStep = 0;
    this.isPlaying = false;
    this.timer = null;
  }

  open() {
    let modal = document.getElementById('executionOrderModal');
    if (!modal) {
      this.createModalHtml();
      modal = document.getElementById('executionOrderModal');
    }
    modal.style.display = 'flex';
    this.setStep(0);
    if (window.AudioFX) window.AudioFX.playSuccess();
    if (window.SQL_BUDDY) {
      window.SQL_BUDDY.say("🎬 Welcome to the Engine Step-Through! Watch how databases execute queries in logical order!", 4000, 'happy');
    }
  }

  close() {
    this.pause();
    const modal = document.getElementById('executionOrderModal');
    if (modal) modal.style.display = 'none';
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    const btn = document.getElementById('btnExecPlayToggle');
    if (btn) btn.innerHTML = '⏸ Pause';
    this.timer = setInterval(() => {
      if (this.currentStep >= SQL_EXECUTION_STEPS.length - 1) {
        this.setStep(0);
      } else {
        this.setStep(this.currentStep + 1);
      }
    }, 2800);
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) clearInterval(this.timer);
    const btn = document.getElementById('btnExecPlayToggle');
    if (btn) btn.innerHTML = '▶ Auto-Play';
  }

  setStep(idx) {
    this.currentStep = Math.max(0, Math.min(SQL_EXECUTION_STEPS.length - 1, idx));
    this.render();
    if (window.AudioFX) window.AudioFX.playClick();
  }

  createModalHtml() {
    const div = document.createElement('div');
    div.id = 'executionOrderModal';
    div.className = 'blitz-modal-overlay';
    div.style.display = 'none';
    div.innerHTML = `
      <div class="blitz-modal-card" style="max-width: 960px; width: 95vw; max-height: 90vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">🎬</span>
            <div>
              <h2 style="font-size: 18px; margin: 0; color: #ffffff;">Physical SQL Execution Order Visualizer</h2>
              <div style="font-size: 11px; color: var(--text-secondary);">Logical Pipeline Execution Order (Lexical vs Relational Engine Architecture)</div>
            </div>
          </div>
          <button class="card-nav-btn" onclick="window.execVisualizer.close()">&times; Close</button>
        </div>

        <!-- 8-Step Timeline Scrubber -->
        <div id="execStepPillContainer" class="exec-step-pills-row"></div>

        <!-- Main Step-Through Cockpit -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 14px;">
          <!-- Left: Query & Clause Highlighting -->
          <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-color); border-radius: 8px; padding: 16px;">
            <div style="font-size: 11px; font-weight: 700; color: #38bdf8; margin-bottom: 8px; letter-spacing: 0.5px;">QUERY CODE & ACTIVE CLAUSE</div>
            <pre id="execQueryDisplay" class="exec-code-block"></pre>
            
            <div style="margin-top: 14px; background: rgba(56, 189, 248, 0.08); border-left: 3px solid #38bdf8; padding: 10px; border-radius: 4px;">
              <div style="font-size: 12px; font-weight: 700; color: #38bdf8; margin-bottom: 4px;">Why does this order matter?</div>
              <div id="execWhyNote" style="font-size: 11px; line-height: 1.5; color: var(--text-secondary);"></div>
            </div>
          </div>

          <!-- Right: Engine Action & Data State -->
          <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; display: flex; flex-direction: column;">
            <div style="font-size: 11px; font-weight: 700; color: #10b981; margin-bottom: 4px; letter-spacing: 0.5px;">ENGINE MEMORY & DATA BUFFER STATE</div>
            <h3 id="execStepTitle" style="font-size: 15px; margin: 4px 0 6px 0; color: #ffffff;"></h3>
            <p id="execStepTagline" style="font-size: 12px; color: var(--text-secondary); margin: 0 0 10px 0; line-height: 1.4;"></p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; font-size: 11px; font-family: var(--font-mono);">
              <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
                <span style="color: var(--text-secondary);">INPUT:</span> <strong id="execInputRows" style="color: #38bdf8;"></strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
                <span style="color: var(--text-secondary);">OUTPUT:</span> <strong id="execOutputRows" style="color: #10b981;"></strong>
              </div>
            </div>

            <!-- Buffer Preview Table -->
            <div style="flex: 1; overflow-x: auto;">
              <table id="execBufferTable" class="live-preview-table" style="font-size: 11px;"></table>
            </div>
          </div>
        </div>

        <!-- Controls Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 14px; margin-top: 16px;">
          <div style="display: flex; gap: 8px;">
            <button class="card-nav-btn" onclick="window.execVisualizer.setStep(window.execVisualizer.currentStep - 1)">◀ Prev Step</button>
            <button class="card-nav-btn" onclick="window.execVisualizer.setStep(window.execVisualizer.currentStep + 1)">Next Step ▶</button>
            <button id="btnExecPlayToggle" class="card-nav-btn" onclick="window.execVisualizer.togglePlay()">▶ Auto-Play</button>
          </div>
          <div style="font-size: 12px; color: var(--text-secondary);">
            Step <strong id="execStepCounter" style="color: #ffffff;">1</strong> of 8
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(div);
  }

  render() {
    const step = SQL_EXECUTION_STEPS[this.currentStep];
    const pillsContainer = document.getElementById('execStepPillContainer');
    const queryDisplay = document.getElementById('execQueryDisplay');
    const stepTitle = document.getElementById('execStepTitle');
    const stepTagline = document.getElementById('execStepTagline');
    const whyNote = document.getElementById('execWhyNote');
    const inRows = document.getElementById('execInputRows');
    const outRows = document.getElementById('execOutputRows');
    const counter = document.getElementById('execStepCounter');
    const tableEl = document.getElementById('execBufferTable');

    if (!pillsContainer) return;

    // Render Pills
    pillsContainer.innerHTML = SQL_EXECUTION_STEPS.map((s, idx) => {
      let cls = 'exec-step-pill';
      if (idx === this.currentStep) cls += ' active';
      else if (idx < this.currentStep) cls += ' completed';
      return `<button class="${cls}" onclick="window.execVisualizer.setStep(${idx})">${s.clause}</button>`;
    }).join('');

    // Highlight Query Clause
    const fullQuery = [
      { clause: 'SELECT', text: 'SELECT department, COUNT(*) AS staff_count, ROUND(AVG(salary), 2) AS avg_sal' },
      { clause: 'FROM', text: 'FROM Employees' },
      { clause: 'WHERE', text: 'WHERE salary > 75000' },
      { clause: 'GROUP BY', text: 'GROUP BY department' },
      { clause: 'HAVING', text: 'HAVING COUNT(*) >= 2' },
      { clause: 'ORDER BY', text: 'ORDER BY avg_sal DESC' },
      { clause: 'LIMIT', text: 'LIMIT 3;' }
    ];

    queryDisplay.innerHTML = fullQuery.map(line => {
      const isCurrent = (line.clause === step.clause);
      const highlightStyle = isCurrent 
        ? 'background: rgba(56, 189, 248, 0.25); color: #38bdf8; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: block; border-left: 3px solid #38bdf8;'
        : 'color: #94a3b8; padding: 2px 6px; display: block;';
      return `<span style="${highlightStyle}">${line.text}</span>`;
    }).join('\n');

    stepTitle.textContent = step.title;
    stepTagline.textContent = step.tagline;
    whyNote.textContent = step.explanation;
    inRows.textContent = step.inputRows;
    outRows.textContent = step.outputRows;
    if (counter) counter.textContent = (this.currentStep + 1);

    // Render preview table
    if (tableEl && step.previewTable) {
      tableEl.innerHTML = `
        <thead>
          <tr>
            <th>ID / BUCKET</th>
            <th>LABEL</th>
            <th>DETAIL / METRIC</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          ${step.previewTable.map(r => `
            <tr class="${r.status.includes('Dropped') || r.status.includes('Pruned') ? 'row-filtered-out' : 'row-match'}">
              <td><code>${r.id}</code></td>
              <td>${r.name}</td>
              <td><code>${r.sal}</code></td>
              <td><span class="row-status-pill ${r.status.includes('Dropped') || r.status.includes('Pruned') ? 'drop' : 'keep'}">${r.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      `;
    }
  }
}

window.execVisualizer = new ExecutionOrderVisualizer();
window.openExecutionOrderModal = () => window.execVisualizer.open();
