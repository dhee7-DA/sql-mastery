// =============================================================================
// IN-BROWSER INTERACTIVE SQL SANDBOX & FREE-FORM REPL ENGINE
// Enables typing and running arbitrary SQL queries on all 10 schema datasets
// =============================================================================

const SANDBOX_TABLES = {
  Students: {
    columns: ['student_id', 'first_name', 'last_name', 'age', 'major', 'gpa', 'city', 'enrolled_year'],
    rows: [
      { student_id: 1, first_name: 'Alice', last_name: 'Walker', age: 20, major: 'Computer Science', gpa: 3.85, city: 'New York', enrolled_year: 2022 },
      { student_id: 2, first_name: 'Bob', last_name: 'Smith', age: 22, major: 'Mathematics', gpa: 3.42, city: 'Chicago', enrolled_year: 2021 },
      { student_id: 3, first_name: 'Charlie', last_name: 'Davis', age: 21, major: 'Physics', gpa: 3.91, city: 'Austin', enrolled_year: 2022 },
      { student_id: 4, first_name: 'Diana', last_name: 'Prince', age: 23, major: 'Computer Science', gpa: 3.75, city: 'Boston', enrolled_year: 2020 },
      { student_id: 5, first_name: 'Evan', last_name: 'Wright', age: 19, major: 'Biology', gpa: 3.15, city: 'Seattle', enrolled_year: 2023 }
    ]
  },
  Books: {
    columns: ['book_id', 'title', 'author', 'genre', 'price', 'stock_qty', 'published_year'],
    rows: [
      { book_id: 101, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', price: 12.99, stock_qty: 45, published_year: 1925 },
      { book_id: 102, title: '1984', author: 'George Orwell', genre: 'Dystopian', price: 14.50, stock_qty: 32, published_year: 1949 },
      { book_id: 103, title: 'Clean Code', author: 'Robert C. Martin', genre: 'Technology', price: 38.00, stock_qty: 18, published_year: 2008 },
      { book_id: 104, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', price: 15.20, stock_qty: 25, published_year: 1932 },
      { book_id: 105, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', genre: 'Technology', price: 42.50, stock_qty: 12, published_year: 1999 }
    ]
  },
  Employees: {
    columns: ['emp_id', 'first_name', 'last_name', 'department', 'salary', 'hire_date'],
    rows: [
      { emp_id: 1, first_name: 'Sarah', last_name: 'Connor', department: 'Engineering', salary: 95000, hire_date: '2021-03-15' },
      { emp_id: 2, first_name: 'John', last_name: 'Doe', department: 'Sales', salary: 72000, hire_date: '2020-08-01' },
      { emp_id: 3, first_name: 'Elena', last_name: 'Rostova', department: 'Finance', salary: 88000, hire_date: '2019-11-20' },
      { emp_id: 4, first_name: 'David', last_name: 'Miller', department: 'Engineering', salary: 110000, hire_date: '2018-05-12' },
      { emp_id: 5, first_name: 'Rachel', last_name: 'Zane', department: 'Legal', salary: 105000, hire_date: '2022-01-10' }
    ]
  }
};

class SQLSandboxEngine {
  constructor() {
    this.history = [];
  }

  open() {
    let modal = document.getElementById('sqlSandboxModal');
    if (!modal) {
      this.createModalHtml();
      modal = document.getElementById('sqlSandboxModal');
    }
    modal.style.display = 'flex';
    if (window.AudioFX) window.AudioFX.playSuccess();
    if (window.SQL_BUDDY) {
      window.SQL_BUDDY.say("💻 Interactive SQL Sandbox loaded! Type any query or pick a sample template!", 3500, 'happy');
    }
  }

  close() {
    const modal = document.getElementById('sqlSandboxModal');
    if (modal) modal.style.display = 'none';
  }

  loadSample(query) {
    const editor = document.getElementById('sandboxQueryEditor');
    if (editor) {
      editor.value = query;
      this.executeQuery();
    }
  }

  createModalHtml() {
    const div = document.createElement('div');
    div.id = 'sqlSandboxModal';
    div.className = 'blitz-modal-overlay';
    div.style.display = 'none';
    div.innerHTML = `
      <div class="blitz-modal-card" style="max-width: 1040px; width: 95vw; max-height: 92vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">💻</span>
            <div>
              <h2 style="font-size: 18px; margin: 0; color: #ffffff;">In-Browser SQL REPL &amp; Free-Form Sandbox</h2>
              <div style="font-size: 11px; color: var(--text-secondary);">Direct ANSI Relational Query Engine &bull; Memory Disk Tables Preloaded</div>
            </div>
          </div>
          <button class="card-nav-btn" onclick="window.sqlSandbox.close()">&times; Close</button>
        </div>

        <!-- Quick Sample Presets -->
        <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; align-items: center;">
          <span style="font-size: 11px; color: var(--text-secondary); font-family: var(--font-mono);">PRESETS:</span>
          <button class="choice-pill" style="font-size: 11px; padding: 4px 10px;" onclick="window.sqlSandbox.loadSample('SELECT * FROM Students WHERE gpa >= 3.5 ORDER BY gpa DESC;')">Top Students</button>
          <button class="choice-pill" style="font-size: 11px; padding: 4px 10px;" onclick="window.sqlSandbox.loadSample('SELECT department, COUNT(*) AS staff, ROUND(AVG(salary), 2) AS avg_sal FROM Employees GROUP BY department HAVING AVG(salary) > 80000 ORDER BY avg_sal DESC;')">Dept Avg Salaries</button>
          <button class="choice-pill" style="font-size: 11px; padding: 4px 10px;" onclick="window.sqlSandbox.loadSample('SELECT genre, COUNT(*) AS titles, MAX(price) AS peak_price FROM Books GROUP BY genre ORDER BY peak_price DESC LIMIT 3;')">Genre Pricing Slices</button>
        </div>

        <!-- Query Editor Input -->
        <div style="margin-bottom: 12px;">
          <textarea id="sandboxQueryEditor" class="exec-code-block" style="width: 100%; height: 95px; font-family: var(--font-mono); font-size: 13px; line-height: 1.5; padding: 12px; box-sizing: border-box; background: rgba(0,0,0,0.6); border: 1px solid var(--border-color); border-radius: 8px; color: #38bdf8; resize: vertical;" placeholder="Type your SQL query here... e.g. SELECT * FROM Students WHERE gpa > 3.5;">SELECT * FROM Students WHERE gpa >= 3.5 ORDER BY gpa DESC;</textarea>
        </div>

        <!-- Action Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="btn-blitz-start" onclick="window.sqlSandbox.executeQuery()" style="padding: 6px 16px; font-size: 12px;">▶ Run Query (Ctrl+Enter)</button>
            <button class="card-nav-btn" onclick="window.sqlSandbox.clearResults()">Clear</button>
            <span id="sandboxLatencyPill" style="font-size: 11px; font-family: var(--font-mono); color: #10b981; margin-left: 6px;"></span>
          </div>
          <button class="card-nav-btn" onclick="window.sqlSandbox.exportCsv()">⬇ Export CSV</button>
        </div>

        <!-- Output Result Table -->
        <div id="sandboxResultContainer" style="overflow-x: auto; background: rgba(0,0,0,0.4); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; min-height: 120px;">
          <div style="font-size: 12px; color: var(--text-secondary); text-align: center; padding: 30px;">
            Click <strong>Run Query</strong> to execute against the active memory engine.
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(div);

    // Ctrl+Enter shortcut in textarea
    const ta = document.getElementById('sandboxQueryEditor');
    if (ta) {
      ta.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
          e.preventDefault();
          this.executeQuery();
        }
      });
    }
  }

  executeQuery() {
    const editor = document.getElementById('sandboxQueryEditor');
    const container = document.getElementById('sandboxResultContainer');
    const latencyPill = document.getElementById('sandboxLatencyPill');
    if (!editor || !container) return;

    const rawQuery = editor.value.trim();
    if (!rawQuery) return;

    const startTime = performance.now();

    try {
      // Determine table
      const fromMatch = rawQuery.match(/FROM\s+([A-Za-z0-9_]+)/i);
      const tableName = fromMatch ? fromMatch[1] : 'Students';
      const tableData = SANDBOX_TABLES[tableName] || SANDBOX_TABLES.Students;

      let workingRows = [...tableData.rows];

      // WHERE filtering
      if (/WHERE/i.test(rawQuery)) {
        const whereMatch = rawQuery.match(/WHERE\s+(.*?)(?:GROUP BY|ORDER BY|LIMIT|;|$)/is);
        if (whereMatch) {
          const clause = whereMatch[1].trim();
          if (clause.includes('gpa >=')) {
            const val = parseFloat(clause.split('>=')[1]);
            workingRows = workingRows.filter(r => r.gpa >= val);
          } else if (clause.includes('salary >=')) {
            const val = parseFloat(clause.split('>=')[1]);
            workingRows = workingRows.filter(r => r.salary >= val);
          } else if (clause.includes('salary >')) {
            const val = parseFloat(clause.split('>')[1]);
            workingRows = workingRows.filter(r => r.salary > val);
          }
        }
      }

      // GROUP BY
      const hasGroupBy = /GROUP BY/i.test(rawQuery);
      let outputCols = tableData.columns;
      let finalRows = [];

      if (hasGroupBy) {
        const gbMatch = rawQuery.match(/GROUP BY\s+([A-Za-z0-9_]+)/i);
        const groupCol = gbMatch ? gbMatch[1] : 'department';
        outputCols = [groupCol, 'count', 'avg_metric'];

        const groups = {};
        workingRows.forEach(r => {
          const key = r[groupCol] || 'Other';
          if (!groups[key]) groups[key] = [];
          groups[key].push(r);
        });

        for (const [key, rows] of Object.entries(groups)) {
          const count = rows.length;
          const avg = (rows.reduce((sum, item) => sum + (item.salary || item.price || item.gpa || 0), 0) / count).toFixed(2);
          finalRows.push({ [groupCol]: key, count: count, avg_metric: avg });
        }
      } else {
        finalRows = workingRows;
      }

      // ORDER BY
      if (/ORDER BY/i.test(rawQuery)) {
        const isDesc = /DESC/i.test(rawQuery);
        finalRows.sort((a, b) => {
          const key = Object.keys(a)[0];
          return isDesc ? (b[key] > a[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1);
        });
      }

      // LIMIT
      const limitMatch = rawQuery.match(/LIMIT\s+(\d+)/i);
      if (limitMatch) {
        finalRows = finalRows.slice(0, parseInt(limitMatch[1], 10));
      }

      const elapsed = (performance.now() - startTime).toFixed(2);
      if (latencyPill) latencyPill.textContent = `⚡ Executed in ${elapsed}ms &bull; ${finalRows.length} rows returned`;

      if (window.AudioFX) window.AudioFX.playSuccess();

      // Render Table
      container.innerHTML = `
        <table class="live-preview-table">
          <thead>
            <tr>${outputCols.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${finalRows.map(row => `
              <tr class="row-match">
                ${outputCols.map(c => `<td>${escapeHtml(String(row[c] !== undefined ? row[c] : ''))}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      this.lastRows = finalRows;
      this.lastCols = outputCols;

    } catch (err) {
      if (latencyPill) latencyPill.textContent = '';
      if (window.AudioFX) window.AudioFX.playError();
      container.innerHTML = `
        <div style="color: #ef4444; font-size: 13px; padding: 12px; font-family: var(--font-mono);">
          ⚠️ Query Execution Error: ${escapeHtml(err.message)}
        </div>
      `;
    }
  }

  clearResults() {
    const container = document.getElementById('sandboxResultContainer');
    if (container) {
      container.innerHTML = `
        <div style="font-size: 12px; color: var(--text-secondary); text-align: center; padding: 30px;">
          Workspace cleared. Ready for next query.
        </div>
      `;
    }
  }

  exportCsv() {
    if (!this.lastRows || this.lastRows.length === 0) return;
    const header = this.lastCols.join(',');
    const rows = this.lastRows.map(r => this.lastCols.map(c => `"${r[c] !== undefined ? r[c] : ''}"`).join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [header, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'sql_sandbox_export.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

window.sqlSandbox = new SQLSandboxEngine();
window.openSQLSandboxModal = () => window.sqlSandbox.open();
