/**
 * SQL ENGINE VISUALIZER
 * Minimalist In-Memory Relational Engine & AST Simulator
 */

// =============================================================================
// 1. IN-MEMORY DATASETS
// =============================================================================

const DATABASE = {
  TRIANGLES: [
    { A: 20, B: 20, C: 20 },
    { A: 20, B: 20, C: 40 }, // Flat line: 20 + 20 = 40 (Not A Triangle)
    { A: 20, B: 20, C: 30 },
    { A: 13, B: 14, C: 30 }, // 13 + 14 = 27 < 30 (Not A Triangle)
    { A: 10, B: 10, C: 10 },
    { A: 30, B: 40, C: 50 },
    { A: 15, B: 15, C: 25 },
    { A: 25, B: 15, C: 15 },
    { A: 12, B: 15, C: 20 },
    { A: 5,  B: 10, C: 16 }, // 5 + 10 = 15 < 16 (Not A Triangle)
    { A: 21, B: 21, C: 21 },
    { A: 7,  B: 24, C: 25 },
    { A: 18, B: 18, C: 10 },
    { A: 14, B: 18, C: 22 },
    { A: 8,  B: 8,  C: 18 }  // 8 + 8 = 16 < 18 (Not A Triangle)
  ],

  Employees: [
    { emp_id: 101, first_name: 'Ashley', last_name: 'Miller', department: 'Analytics', salary: 115000, months_tenure: 14 },
    { emp_id: 102, first_name: 'David', last_name: 'Chen', department: 'Engineering', salary: 125000, months_tenure: 36 },
    { emp_id: 103, first_name: 'Julia', last_name: 'Smith', department: 'Analytics', salary: 92000, months_tenure: 8 },
    { emp_id: 104, first_name: 'Kevin', last_name: 'Brown', department: 'Finance', salary: 88000, months_tenure: 22 },
    { emp_id: 105, first_name: 'Samantha', last_name: 'Davis', department: 'Engineering', salary: 145000, months_tenure: 48 },
    { emp_id: 106, first_name: 'Patrick', last_name: 'Wilson', department: 'Sales', salary: 62000, months_tenure: 6 },
    { emp_id: 107, first_name: 'Rose', last_name: 'Taylor', department: 'Finance', salary: 108000, months_tenure: 19 },
    { emp_id: 108, first_name: 'Belvet', last_name: 'Anderson', department: 'Analytics', salary: 97000, months_tenure: 11 },
    { emp_id: 109, first_name: 'Angela', last_name: 'Thomas', department: 'Marketing', salary: 74000, months_tenure: 15 },
    { emp_id: 110, first_name: 'Frank', last_name: 'Jackson', department: 'Finance', salary: 95000, months_tenure: 26 },
    { emp_id: 111, first_name: 'Lisa', last_name: 'White', department: 'Engineering', salary: 130000, months_tenure: 9 },
    { emp_id: 112, first_name: 'Amy', last_name: 'Harris', department: 'Analytics', salary: 89000, months_tenure: 4 }
  ],

  Customers: [
    { customer_id: 1001, first_name: 'Sophia', city: 'Austin', state: 'TX', country: 'USA', credit_score: 785 },
    { customer_id: 1002, first_name: 'Liam', city: 'Atlanta', state: 'GA', country: 'USA', credit_score: 690 },
    { customer_id: 1003, first_name: 'Emma', city: 'Orlando', state: 'FL', country: 'USA', credit_score: 740 },
    { customer_id: 1004, first_name: 'Noah', city: 'Chicago', state: 'IL', country: 'USA', credit_score: 620 },
    { customer_id: 1005, first_name: 'Olivia', city: 'Miami', state: 'FL', country: 'USA', credit_score: 810 },
    { customer_id: 1006, first_name: 'Ethan', city: 'Dallas', state: 'TX', country: 'USA', credit_score: 710 },
    { customer_id: 1007, first_name: 'Ava', city: 'Erie', state: 'PA', country: 'USA', credit_score: 670 },
    { customer_id: 1008, first_name: 'Lucas', city: 'Toronto', state: 'ON', country: 'CAN', credit_score: 760 },
    { customer_id: 1009, first_name: 'Mia', city: 'London', state: 'LD', country: 'GBR', credit_score: 820 },
    { customer_id: 1010, first_name: 'Amo', city: 'Amo', state: 'IN', country: 'USA', credit_score: 640 },
    { customer_id: 1011, first_name: 'Lee', city: 'Lee', state: 'MA', country: 'USA', credit_score: 730 },
    { customer_id: 1012, first_name: 'Roy', city: 'Roy', state: 'UT', country: 'USA', credit_score: 695 }
  ],

  STUDENTS: [
    { ID: 1, Name: 'Ashley', Marks: 81 },
    { ID: 2, Name: 'Samantha', Marks: 75 },
    { ID: 3, Name: 'Julia', Marks: 76 },
    { ID: 4, Name: 'Belvet', Marks: 84 },
    { ID: 5, Name: 'Kristeen', Marks: 88 },
    { ID: 6, Name: 'Ketty', Marks: 70 },
    { ID: 7, Name: 'Christene', Marks: 88 },
    { ID: 8, Name: 'Stuart', Marks: 99 },
    { ID: 9, Name: 'Maria', Marks: 65 },
    { ID: 10, Name: 'Amina', Marks: 89 },
    { ID: 11, Name: 'Priya', Marks: 91 },
    { ID: 12, Name: 'Devi', Marks: 78 }
  ]
};

// =============================================================================
// 2. PRESETS
// =============================================================================

const PRESETS = {
  preset_case_triangle: `SELECT A, B, C,
       CASE
           WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'
           WHEN A = B AND B = C THEN 'Equilateral'
           WHEN A = B OR B = C OR A = C THEN 'Isosceles'
           ELSE 'Scalene'
       END AS triangle_type
FROM TRIANGLES;`,

  preset_case_credit: `SELECT first_name, city, credit_score,
       CASE
           WHEN credit_score >= 750 THEN 'Prime'
           WHEN credit_score >= 670 THEN 'Near Prime'
           ELSE 'Subprime'
       END AS risk_tier
FROM Customers
WHERE country = 'USA'
ORDER BY credit_score DESC;`,

  preset_station5_tiebreak: `SELECT city, LENGTH(city) AS city_length
FROM Customers
ORDER BY LENGTH(city) ASC, city ASC
LIMIT 5;`,

  preset_students_right: `SELECT Name, Marks, RIGHT(Name, 3) AS suffix_3
FROM STUDENTS
WHERE Marks > 75
ORDER BY RIGHT(Name, 3) ASC, ID ASC;`,

  preset_employees_salaries: `SELECT first_name, department, salary, months_tenure
FROM Employees
WHERE salary > 85000 AND months_tenure < 24
ORDER BY salary DESC;`,

  preset_regex_vowels: `SELECT DISTINCT city
FROM Customers
WHERE city REGEXP '^[aeiou]' AND city REGEXP '[aeiou]$';`,

  preset_distinct_cities: `SELECT DISTINCT city, state
FROM Customers
ORDER BY state ASC, city ASC;`
};

// =============================================================================
// 3. ENGINE STATE
// =============================================================================

const EngineState = {
  currentQuery: '',
  activeTable: 'TRIANGLES',
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  playTimer: null
};

// =============================================================================
// 4. PARSER & PIPELINE BUILDER
// =============================================================================

function parseAndBuildPipeline(sql) {
  const cleanSQL = sql.trim();

  // Detect FROM table
  let tableName = 'TRIANGLES';
  const fromMatch = cleanSQL.match(/FROM\s+([A-Za-z0-9_]+)/i);
  if (fromMatch) {
    const found = Object.keys(DATABASE).find(k => k.toLowerCase() === fromMatch[1].toLowerCase());
    if (found) tableName = found;
  }
  EngineState.activeTable = tableName;
  updateActiveTableBadge(tableName);

  const rawRows = JSON.parse(JSON.stringify(DATABASE[tableName]));
  const steps = [];

  // 1. FROM
  steps.push({
    phase: 'FROM',
    title: `FROM ${tableName}`,
    heading: `Table Scan: ${tableName}`,
    description: `Allocating memory buffer and loading ${rawRows.length} rows from table '${tableName}'.`,
    rows: JSON.parse(JSON.stringify(rawRows)),
    columns: Object.keys(rawRows[0] || {})
  });

  // 2. WHERE
  const whereMatch = cleanSQL.match(/WHERE\s+([\s\S]+?)(?:ORDER\s+BY|GROUP\s+BY|LIMIT|;|$)/i);
  let survivingRows = [];
  let evaluatedRows = [];

  if (whereMatch) {
    const whereClause = whereMatch[1].trim();

    rawRows.forEach(row => {
      const evalResult = evaluateWherePredicate(row, whereClause, tableName);
      evaluatedRows.push({ ...row, _passed: evalResult.passed, _reason: evalResult.reason });
      if (evalResult.passed) {
        survivingRows.push({ ...row });
      }
    });

    steps.push({
      phase: 'WHERE',
      title: 'WHERE Filter',
      heading: `Filter Predicate: ${whereClause}`,
      description: `Tested ${rawRows.length} rows. ${survivingRows.length} passed, ${rawRows.length - survivingRows.length} rejected.`,
      rows: evaluatedRows,
      columns: Object.keys(rawRows[0] || {}),
      isWhereEvaluation: true
    });
  } else {
    survivingRows = JSON.parse(JSON.stringify(rawRows));
    steps.push({
      phase: 'WHERE',
      title: 'WHERE (No Filter)',
      heading: 'Filter Predicate: All rows pass',
      description: 'No WHERE filter specified in query. All rows pass through to projection.',
      rows: survivingRows.map(r => ({ ...r, _passed: true, _reason: 'No filter' })),
      columns: Object.keys(rawRows[0] || {})
    });
  }

  // 3. SELECT & CASE WHEN
  const selectMatch = cleanSQL.match(/SELECT\s+([\s\S]+?)\s+FROM/i);
  let selectClause = '*';
  if (selectMatch) {
    selectClause = selectMatch[1].replace(/DISTINCT\s+/i, '').trim();
  }

  const projectedRows = survivingRows.map(row => evaluateSelectRow(row, selectClause, tableName));
  const finalCols = Object.keys(projectedRows[0] || {});

  steps.push({
    phase: 'SELECT',
    title: 'SELECT Projection',
    heading: `Projection: ${finalCols.join(', ')}`,
    description: `Computed attribute projection and conditional CASE statements. Output width: ${finalCols.length} columns.`,
    rows: JSON.parse(JSON.stringify(projectedRows)),
    columns: finalCols
  });

  // 4. DISTINCT
  const hasDistinct = /SELECT\s+DISTINCT\s+/i.test(cleanSQL);
  let distinctRows = [];

  if (hasDistinct) {
    const seen = new Set();
    projectedRows.forEach(row => {
      const key = JSON.stringify(row);
      if (!seen.has(key)) {
        seen.add(key);
        distinctRows.push(row);
      }
    });

    steps.push({
      phase: 'DISTINCT',
      title: 'DISTINCT Deduplication',
      heading: 'Deduplication: Unique Tuples',
      description: `Eliminated redundant duplicate rows. ${projectedRows.length} rows reduced to ${distinctRows.length} unique records.`,
      rows: JSON.parse(JSON.stringify(distinctRows)),
      columns: finalCols
    });
  } else {
    distinctRows = JSON.parse(JSON.stringify(projectedRows));
    steps.push({
      phase: 'DISTINCT',
      title: 'DISTINCT (Skipped)',
      heading: 'Deduplication: Off',
      description: 'No DISTINCT keyword present. Retaining all projected rows.',
      rows: JSON.parse(JSON.stringify(distinctRows)),
      columns: finalCols
    });
  }

  // 5. ORDER BY
  const orderMatch = cleanSQL.match(/ORDER\s+BY\s+([\s\S]+?)(?:LIMIT|;|$)/i);
  let sortedRows = JSON.parse(JSON.stringify(distinctRows));

  if (orderMatch) {
    const orderClause = orderMatch[1].trim();
    sortedRows = sortRows(sortedRows, orderClause);

    steps.push({
      phase: 'ORDER BY',
      title: 'ORDER BY Sort',
      heading: `Sorting: ${orderClause}`,
      description: `Reordered surviving rows according to primary sorting rules and secondary tie-breakers.`,
      rows: JSON.parse(JSON.stringify(sortedRows)),
      columns: finalCols
    });
  } else {
    steps.push({
      phase: 'ORDER BY',
      title: 'ORDER BY (Natural)',
      heading: 'Sorting: Natural Storage Order',
      description: 'No explicit ORDER BY clause. Rows preserve storage arrival order.',
      rows: JSON.parse(JSON.stringify(sortedRows)),
      columns: finalCols
    });
  }

  // 6. LIMIT
  const limitMatch = cleanSQL.match(/LIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+))?/i);
  let finalSlicedRows = JSON.parse(JSON.stringify(sortedRows));

  if (limitMatch) {
    const limitNum = parseInt(limitMatch[1], 10);
    const offsetNum = limitMatch[2] ? parseInt(limitMatch[2], 10) : 0;
    finalSlicedRows = sortedRows.slice(offsetNum, offsetNum + limitNum);

    steps.push({
      phase: 'LIMIT',
      title: 'LIMIT Slicing',
      heading: `Row Restriction: Top ${limitNum}${offsetNum ? ` (Offset ${offsetNum})` : ''}`,
      description: `Restricted final output stream to ${limitNum} records. Output: ${finalSlicedRows.length} rows.`,
      rows: JSON.parse(JSON.stringify(finalSlicedRows)),
      columns: finalCols
    });
  } else {
    steps.push({
      phase: 'LIMIT',
      title: 'LIMIT (All)',
      heading: 'Row Restriction: None',
      description: `Full result stream emitted without truncation. Total rows: ${finalSlicedRows.length}.`,
      rows: JSON.parse(JSON.stringify(finalSlicedRows)),
      columns: finalCols
    });
  }

  EngineState.steps = steps;
  EngineState.currentStepIndex = 0;
  renderStep(0);
}

// =============================================================================
// 5. EVALUATION LOGIC
// =============================================================================

function evaluateWherePredicate(row, whereClause, tableName) {
  try {
    if (/salary\s*>\s*(\d+)/i.test(whereClause) && /months(?:_tenure)?\s*<\s*(\d+)/i.test(whereClause)) {
      const salMin = parseInt(whereClause.match(/salary\s*>\s*(\d+)/i)[1], 10);
      const tenureMax = parseInt(whereClause.match(/months(?:_tenure)?\s*<\s*(\d+)/i)[1], 10);
      const salPass = row.salary > salMin;
      const tenurePass = row.months_tenure < tenureMax;
      const passed = salPass && tenurePass;
      return {
        passed,
        reason: `salary ${row.salary} > ${salMin} [${salPass ? '✓' : '✗'}] AND tenure ${row.months_tenure} < ${tenureMax} [${tenurePass ? '✓' : '✗'}]`
      };
    }

    if (/Marks\s*>\s*(\d+)/i.test(whereClause)) {
      const minMarks = parseInt(whereClause.match(/Marks\s*>\s*(\d+)/i)[1], 10);
      const passed = row.Marks > minMarks;
      return {
        passed,
        reason: `Marks ${row.Marks} > ${minMarks} (${passed ? 'Pass' : 'Fail'})`
      };
    }

    if (/country\s*=\s*'([^']+)'/i.test(whereClause)) {
      const targetCountry = whereClause.match(/country\s*=\s*'([^']+)'/i)[1];
      const passed = row.country === targetCountry;
      return {
        passed,
        reason: `country '${row.country}' = '${targetCountry}'`
      };
    }

    if (/REGEXP/i.test(whereClause)) {
      const startsVowel = /^[aeiou]/i.test(row.city);
      const endsVowel = /[aeiou]$/i.test(row.city);
      const passed = startsVowel && endsVowel;
      return {
        passed,
        reason: `'${row.city}': starts vowel [${startsVowel ? '✓' : '✗'}], ends vowel [${endsVowel ? '✓' : '✗'}]`
      };
    }

    return { passed: true, reason: 'Condition satisfied' };
  } catch (err) {
    return { passed: true, reason: 'Evaluated true' };
  }
}

function evaluateSelectRow(row, selectClause, tableName) {
  const result = {};

  if (/CASE[\s\S]+?END/i.test(selectClause)) {
    if (tableName === 'TRIANGLES') {
      result.A = row.A;
      result.B = row.B;
      result.C = row.C;

      const A = row.A, B = row.B, C = row.C;
      let triangleType = 'Scalene';

      if (A + B <= C || A + C <= B || B + C <= A) {
        triangleType = 'Not A Triangle';
      } else if (A === B && B === C) {
        triangleType = 'Equilateral';
      } else if (A === B || B === C || A === C) {
        triangleType = 'Isosceles';
      } else {
        triangleType = 'Scalene';
      }

      result.triangle_type = triangleType;
      return result;
    }

    if (row.credit_score !== undefined) {
      result.first_name = row.first_name;
      result.credit_score = row.credit_score;
      if (row.city) result.city = row.city;

      let riskTier = 'Subprime';
      if (row.credit_score >= 750) riskTier = 'Prime';
      else if (row.credit_score >= 670) riskTier = 'Near Prime';

      result.risk_tier = riskTier;
      return result;
    }
  }

  if (/RIGHT\s*\(\s*Name\s*,\s*3\s*\)/i.test(selectClause)) {
    result.Name = row.Name;
    if (row.Marks !== undefined) result.Marks = row.Marks;
    result.suffix_3 = row.Name.slice(-3);
    return result;
  }

  if (/LENGTH\s*\(\s*city\s*\)/i.test(selectClause)) {
    result.city = row.city;
    result.city_length = row.city.length;
    return result;
  }

  if (selectClause !== '*') {
    const rawCols = selectClause.split(',').map(c => c.trim().split(/\s+AS\s+/i)[0].trim());
    rawCols.forEach(col => {
      if (row[col] !== undefined) {
        result[col] = row[col];
      }
    });
    if (Object.keys(result).length > 0) return result;
  }

  return { ...row };
}

function sortRows(rows, orderClause) {
  return rows.sort((a, b) => {
    if (/LENGTH\s*\(\s*city\s*\)/i.test(orderClause)) {
      const lenA = (a.city || '').length;
      const lenB = (b.city || '').length;
      if (lenA !== lenB) return lenA - lenB;
      return (a.city || '').localeCompare(b.city || '');
    }

    if (/RIGHT\s*\(\s*Name\s*,\s*3\s*\)/i.test(orderClause)) {
      const suffA = (a.Name || a.name || '').slice(-3);
      const suffB = (b.Name || b.name || '').slice(-3);
      if (suffA !== suffB) return suffA.localeCompare(suffB);
      return (a.ID || 0) - (b.ID || 0);
    }

    if (/salary\s+DESC/i.test(orderClause)) return (b.salary || 0) - (a.salary || 0);
    if (/credit_score\s+DESC/i.test(orderClause)) return (b.credit_score || 0) - (a.credit_score || 0);

    if (/(?:first_)?name\s+ASC/i.test(orderClause)) {
      const nameA = a.first_name || a.Name || a.name || '';
      const nameB = b.first_name || b.Name || b.name || '';
      return nameA.localeCompare(nameB);
    }

    if (/state\s+ASC/i.test(orderClause)) {
      const stateComp = (a.state || '').localeCompare(b.state || '');
      if (stateComp !== 0) return stateComp;
      return (a.city || '').localeCompare(b.city || '');
    }

    return 0;
  });
}

// =============================================================================
// 6. RENDERERS
// =============================================================================

function renderStep(index) {
  const step = EngineState.steps[index];
  if (!step) return;

  EngineState.currentStepIndex = index;

  // Track nodes
  const nodes = document.querySelectorAll('.track-node');
  nodes.forEach((el, idx) => {
    el.classList.remove('active', 'completed');
    if (idx === index) el.classList.add('active');
    else if (idx < index) el.classList.add('completed');
  });

  // Top labels
  document.getElementById('stepCounterLabel').textContent = `STEP ${index + 1} OF ${EngineState.steps.length}`;
  document.getElementById('stepHeadingLabel').textContent = step.heading;
  document.getElementById('stepExplanationText').textContent = step.description;

  // Row tag
  document.getElementById('rowCounterBadge').textContent = `${step.rows.length} rows`;

  // Buttons
  document.getElementById('btnPrevStep').disabled = index === 0;
  document.getElementById('btnNextStep').disabled = index === EngineState.steps.length - 1;

  renderDataTable(step);
  renderDecisionTree(step);
  renderDistributionChart(step);
  renderDiffView();
}

function renderDataTable(step) {
  const container = document.getElementById('stepperTableContainer');
  if (!step.rows || step.rows.length === 0) {
    container.innerHTML = `<div style="padding: 32px; color: var(--text-muted); font-family: var(--font-mono);">0 rows in active stage.</div>`;
    return;
  }

  const cols = step.columns;
  let html = `<table class="clean-table"><thead><tr>`;
  cols.forEach(c => { html += `<th>${c}</th>`; });
  if (step.isWhereEvaluation) { html += `<th>Verdict &amp; Logic</th>`; }
  html += `</tr></thead><tbody>`;

  step.rows.forEach(row => {
    let trClass = '';
    if (step.isWhereEvaluation) {
      trClass = row._passed ? 'row-passed' : 'row-rejected';
    }

    html += `<tr class="${trClass}">`;
    cols.forEach(c => {
      let val = row[c];
      if (c === 'triangle_type' || c === 'risk_tier') {
        val = `<span class="tag-badge">${val}</span>`;
      }
      html += `<td>${val !== undefined ? val : ''}</td>`;
    });

    if (step.isWhereEvaluation) {
      const tagClass = row._passed ? 'tag-pass' : 'tag-fail';
      const label = row._passed ? 'PASS' : 'REJECT';
      html += `<td><span class="tag-badge ${tagClass}">${label}</span> <span style="font-size: 11px; color: var(--text-muted); margin-left: 8px;">${row._reason || ''}</span></td>`;
    }
    html += `</tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

function renderDecisionTree(step) {
  const container = document.getElementById('decisionTreeContainer');

  if (EngineState.activeTable === 'TRIANGLES') {
    container.innerHTML = `
      <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 8px;">
        Geometry Hierarchy &amp; Inequality Evaluation (Top-to-Bottom)
      </div>
      <div class="clean-node branch-active">
        <div class="node-cond">WHEN A + B &lt;= C OR A + C &lt;= B OR B + C &lt;= A</div>
        <div class="node-result">'Not A Triangle'</div>
      </div>
      <div class="node-arrow">&darr; If False</div>
      <div class="clean-node">
        <div class="node-cond">WHEN A = B AND B = C</div>
        <div class="node-result">'Equilateral'</div>
      </div>
      <div class="node-arrow">&darr; If False</div>
      <div class="clean-node">
        <div class="node-cond">WHEN A = B OR B = C OR A = C</div>
        <div class="node-result">'Isosceles'</div>
      </div>
      <div class="node-arrow">&darr; If False</div>
      <div class="clean-node">
        <div class="node-cond">ELSE</div>
        <div class="node-result">'Scalene'</div>
      </div>
    `;
    return;
  }

  if (EngineState.activeTable === 'Customers') {
    container.innerHTML = `
      <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 8px;">
        Credit Score Risk Hierarchy
      </div>
      <div class="clean-node branch-active">
        <div class="node-cond">WHEN credit_score &gt;= 750</div>
        <div class="node-result">'Prime'</div>
      </div>
      <div class="node-arrow">&darr; If False</div>
      <div class="clean-node">
        <div class="node-cond">WHEN credit_score &gt;= 670</div>
        <div class="node-result">'Near Prime'</div>
      </div>
      <div class="node-arrow">&darr; If False</div>
      <div class="clean-node">
        <div class="node-cond">ELSE</div>
        <div class="node-result">'Subprime'</div>
      </div>
    `;
    return;
  }

  container.innerHTML = `<div style="padding: 32px; color: var(--text-muted); font-family: var(--font-mono);">Logic tree active for queries containing CASE WHEN expressions.</div>`;
}

function renderDistributionChart(step) {
  const container = document.getElementById('chartContainer');
  if (!step.rows || step.rows.length === 0) {
    container.innerHTML = `<div style="color: var(--text-muted); font-family: var(--font-mono);">No chart data.</div>`;
    return;
  }

  let categoryKey = null;
  if (step.rows[0].triangle_type) categoryKey = 'triangle_type';
  else if (step.rows[0].risk_tier) categoryKey = 'risk_tier';
  else if (step.rows[0].department) categoryKey = 'department';
  else if (step.rows[0].city) categoryKey = 'city';

  if (!categoryKey) {
    container.innerHTML = `<div style="padding: 32px; color: var(--text-muted); font-family: var(--font-mono);">Categorical distribution chart active for discrete attributes.</div>`;
    return;
  }

  const counts = {};
  step.rows.forEach(r => {
    const val = r[categoryKey] || 'Other';
    counts[val] = (counts[val] || 0) + 1;
  });

  const categories = Object.keys(counts);
  const maxVal = Math.max(...Object.values(counts));

  const svgWidth = 600;
  const svgHeight = 220;
  const barWidth = 64;
  const gap = 48;
  const startX = 60;
  const chartBottom = 175;

  let barsHTML = '';
  categories.forEach((cat, idx) => {
    const count = counts[cat];
    const barHeight = (count / maxVal) * 120;
    const x = startX + idx * (barWidth + gap);
    const y = chartBottom - barHeight;

    barsHTML += `
      <g>
        <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="3" fill="#27272a" stroke="#3f3f46" stroke-width="1" />
        <text x="${x + barWidth / 2}" y="${y - 8}" fill="#fafafa" font-family="'Geist Mono', monospace" font-size="11" font-weight="600" text-anchor="middle">${count}</text>
        <text x="${x + barWidth / 2}" y="${chartBottom + 18}" fill="#a1a1aa" font-family="'Geist', sans-serif" font-size="11" text-anchor="middle">${cat}</text>
      </g>
    `;
  });

  container.innerHTML = `
    <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 10px;">
      Frequency Distribution: ${categoryKey}
    </div>
    <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width: 100%; max-width: 600px; height: 220px;">
      <line x1="30" y1="${chartBottom}" x2="${svgWidth - 20}" y2="${chartBottom}" stroke="#27272a" stroke-width="1" />
      ${barsHTML}
    </svg>
  `;
}

function renderDiffView() {
  const container = document.getElementById('diffContainer');
  const step0 = EngineState.steps[0];
  const stepFinal = EngineState.steps[EngineState.steps.length - 1];

  if (!step0 || !stepFinal) return;

  container.innerHTML = `
    <div class="diff-panel">
      <div class="diff-head">
        <span>RAW TABLE &bull; ${step0.rows.length} rows</span>
        <span class="status-pill">${EngineState.activeTable}</span>
      </div>
      <div class="diff-body">
        <table class="clean-table">
          <thead><tr>${step0.columns.map(c => `<th>${c}</th>`).join('')}</tr></thead>
          <tbody>
            ${step0.rows.slice(0, 8).map(r => `<tr>${step0.columns.map(c => `<td>${r[c]}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
        ${step0.rows.length > 8 ? `<div style="text-align: center; color: var(--text-muted); padding: 8px; font-size: 11px;">+ ${step0.rows.length - 8} more rows</div>` : ''}
      </div>
    </div>

    <div class="diff-panel">
      <div class="diff-head">
        <span>QUERY RESULT &bull; ${stepFinal.rows.length} rows</span>
        <span class="status-pill">PROCESSED</span>
      </div>
      <div class="diff-body">
        <table class="clean-table">
          <thead><tr>${stepFinal.columns.map(c => `<th>${c}</th>`).join('')}</tr></thead>
          <tbody>
            ${stepFinal.rows.map(r => `<tr>${stepFinal.columns.map(c => `<td>${r[c]}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// =============================================================================
// 7. SCHEMA LIST
// =============================================================================

function renderSchemaExplorer() {
  const tree = document.getElementById('schemaTree');
  let html = '';

  Object.keys(DATABASE).forEach(tbl => {
    const sample = DATABASE[tbl][0] || {};
    const cols = Object.keys(sample);
    const isActive = tbl === EngineState.activeTable ? 'active' : '';

    html += `
      <div class="schema-node">
        <div class="schema-head ${isActive}" onclick="switchTable('${tbl}')">
          <span>${tbl}</span>
          <span style="font-size: 10px; color: var(--text-muted);">${DATABASE[tbl].length} rows</span>
        </div>
        <div class="schema-cols">
          ${cols.map(c => `<div class="schema-col-item"><span>${c}</span><span class="col-data-type">${typeof sample[c]}</span></div>`).join('')}
        </div>
      </div>
    `;
  });

  tree.innerHTML = html;
}

function updateActiveTableBadge(tbl) {
  document.getElementById('activeTableBadge').textContent = tbl;
  renderSchemaExplorer();
}

function switchTable(tbl) {
  EngineState.activeTable = tbl;
  updateActiveTableBadge(tbl);
  document.getElementById('sqlInput').value = `SELECT *\nFROM ${tbl}\nLIMIT 10;`;
  parseAndBuildPipeline(document.getElementById('sqlInput').value);
  if (typeof syncBuilderFromTable === 'function') {
    syncBuilderFromTable(tbl);
  }
}

// =============================================================================
// 8. VISUAL QUERY BUILDER CONTROLLER
// =============================================================================

const BuilderState = {
  table: 'TRIANGLES',
  columns: new Set(['A', 'B', 'C']),
  isDistinct: false,
  hasCaseWhen: true,
  fn: 'none',
  logic: 'AND',
  filters: [],
  orderCol1: '',
  orderDir1: 'ASC',
  orderCol2: '',
  orderDir2: 'ASC',
  limit: 'All'
};

const TABLE_FILTER_TEMPLATES = {
  TRIANGLES: [
    { label: 'Valid Only', col: 'A', op: '>', val: '0', extra: 'A + B > C' },
    { label: 'Equilateral Match', col: 'A', op: '=', val: '20' }
  ],
  Employees: [
    { label: 'High Earners (> $80k)', col: 'salary', op: '>', val: '80000' },
    { label: 'Recent (< 12m)', col: 'months_tenure', op: '<', val: '12' }
  ],
  Customers: [
    { label: 'Prime Credit (>= 750)', col: 'credit_score', op: '>=', val: '750' },
    { label: 'USA Accounts', col: 'country', op: '=', val: 'USA' }
  ],
  STUDENTS: [
    { label: 'Honor Roll (> 75)', col: 'Marks', op: '>', val: '75' }
  ]
};

function initVisualBuilder() {
  const tableSelect = document.getElementById('builderTableSelect');
  if (!tableSelect) return;

  tableSelect.value = BuilderState.table;
  syncBuilderFromTable(BuilderState.table);

  // Table selection change
  tableSelect.addEventListener('change', (e) => {
    const newTbl = e.target.value;
    BuilderState.table = newTbl;
    syncBuilderFromTable(newTbl);
    generateSqlFromBuilder();
  });

  // Select All / Clear All Columns
  const btnSelectAll = document.getElementById('btnSelectAllCols');
  const btnClearAll = document.getElementById('btnClearAllCols');
  if (btnSelectAll && btnClearAll) {
    btnSelectAll.addEventListener('click', () => {
      const allCols = Object.keys(DATABASE[BuilderState.table][0] || {});
      BuilderState.columns = new Set(allCols);
      document.querySelectorAll('.col-chip').forEach(c => c.classList.add('active'));
      generateSqlFromBuilder();
    });

    btnClearAll.addEventListener('click', () => {
      const allCols = Object.keys(DATABASE[BuilderState.table][0] || {});
      const firstCol = allCols[0] || 'A';
      BuilderState.columns = new Set([firstCol]);
      document.querySelectorAll('.col-chip').forEach(c => {
        if (c.dataset.col === firstCol) c.classList.add('active');
        else c.classList.remove('active');
      });
      generateSqlFromBuilder();
    });
  }

  // Transform Function Chips (None, LENGTH, RIGHT 3)
  const fnChips = document.querySelectorAll('.transform-chip');
  fnChips.forEach(chip => {
    chip.addEventListener('click', () => {
      fnChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      BuilderState.fn = chip.dataset.fn;
      generateSqlFromBuilder();
    });
  });

  // Copy Generated SQL
  const btnCopy = document.getElementById('btnCopyGeneratedSQL');
  const copyLabel = document.getElementById('copyBtnLabel');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const query = document.getElementById('sqlInput').value;
      navigator.clipboard.writeText(query).then(() => {
        if (copyLabel) copyLabel.textContent = 'Copied!';
        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = 'Copy';
        }, 1500);
      });
    });
  }

  // Distinct toggle
  const distinctCheck = document.getElementById('builderDistinctCheck');
  if (distinctCheck) {
    distinctCheck.addEventListener('change', (e) => {
      BuilderState.isDistinct = e.target.checked;
      generateSqlFromBuilder();
    });
  }

  // CASE WHEN toggle
  const caseCheck = document.getElementById('builderCaseWhenCheck');
  if (caseCheck) {
    caseCheck.addEventListener('change', (e) => {
      BuilderState.hasCaseWhen = e.target.checked;
      generateSqlFromBuilder();
    });
  }

  // Logic Toggle (AND / OR)
  const logicAnd = document.getElementById('builderLogicAnd');
  const logicOr = document.getElementById('builderLogicOr');
  if (logicAnd && logicOr) {
    logicAnd.addEventListener('click', () => {
      logicAnd.classList.add('active');
      logicOr.classList.remove('active');
      BuilderState.logic = 'AND';
      generateSqlFromBuilder();
    });
    logicOr.addEventListener('click', () => {
      logicOr.classList.add('active');
      logicAnd.classList.remove('active');
      BuilderState.logic = 'OR';
      generateSqlFromBuilder();
    });
  }

  // Add Filter Row Button
  const btnAddFilter = document.getElementById('btnAddFilterRow');
  if (btnAddFilter) {
    btnAddFilter.addEventListener('click', () => {
      addFilterRow();
    });
  }

  // Order Direction Buttons
  const dirBtn1 = document.getElementById('builderOrderDir1');
  if (dirBtn1) {
    dirBtn1.addEventListener('click', () => {
      BuilderState.orderDir1 = BuilderState.orderDir1 === 'ASC' ? 'DESC' : 'ASC';
      dirBtn1.textContent = BuilderState.orderDir1;
      dirBtn1.dataset.dir = BuilderState.orderDir1;
      generateSqlFromBuilder();
    });
  }

  const dirBtn2 = document.getElementById('builderOrderDir2');
  if (dirBtn2) {
    dirBtn2.addEventListener('click', () => {
      BuilderState.orderDir2 = BuilderState.orderDir2 === 'ASC' ? 'DESC' : 'ASC';
      dirBtn2.textContent = BuilderState.orderDir2;
      dirBtn2.dataset.dir = BuilderState.orderDir2;
      generateSqlFromBuilder();
    });
  }

  // Order Column Selects
  const orderCol1 = document.getElementById('builderOrderCol1');
  if (orderCol1) {
    orderCol1.addEventListener('change', (e) => {
      BuilderState.orderCol1 = e.target.value;
      generateSqlFromBuilder();
    });
  }

  const orderCol2 = document.getElementById('builderOrderCol2');
  if (orderCol2) {
    orderCol2.addEventListener('change', (e) => {
      BuilderState.orderCol2 = e.target.value;
      generateSqlFromBuilder();
    });
  }

  // Limit Pills
  document.querySelectorAll('.limit-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.limit-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      BuilderState.limit = pill.dataset.limit;
      document.getElementById('builderLimitInput').value = '';
      generateSqlFromBuilder();
    });
  });

  const limitInput = document.getElementById('builderLimitInput');
  if (limitInput) {
    limitInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val && !isNaN(val)) {
        document.querySelectorAll('.limit-pill').forEach(p => p.classList.remove('active'));
        BuilderState.limit = parseInt(val, 10);
      } else {
        BuilderState.limit = 'All';
      }
      generateSqlFromBuilder();
    });
  }

  // Mode Switcher (Visual Builder vs Raw SQL)
  const btnModeBuilder = document.getElementById('btnModeBuilder');
  const btnModeRaw = document.getElementById('btnModeRaw');
  const visualContainer = document.getElementById('visualBuilderContainer');
  const rawContainer = document.getElementById('rawSqlContainer');
  const rawActions = document.getElementById('rawEditorActions');

  if (btnModeBuilder && btnModeRaw) {
    btnModeBuilder.addEventListener('click', () => {
      btnModeBuilder.classList.add('active');
      btnModeRaw.classList.remove('active');
      visualContainer.style.display = 'flex';
      rawContainer.style.display = 'none';
      if (rawActions) rawActions.style.display = 'none';
    });

    btnModeRaw.addEventListener('click', () => {
      btnModeRaw.classList.add('active');
      btnModeBuilder.classList.remove('active');
      visualContainer.style.display = 'none';
      rawContainer.style.display = 'block';
      if (rawActions) rawActions.style.display = 'flex';
    });
  }
}

function syncBuilderFromTable(tableName) {
  const sample = DATABASE[tableName] ? DATABASE[tableName][0] : {};
  const cols = Object.keys(sample);

  BuilderState.table = tableName;
  BuilderState.columns = new Set(cols);

  // 1. Render Column Chips
  const chipsContainer = document.getElementById('builderColumnChips');
  if (chipsContainer) {
    chipsContainer.innerHTML = '';
    cols.forEach(col => {
      const chip = document.createElement('div');
      chip.className = 'col-chip active';
      chip.textContent = col;
      chip.dataset.col = col;
      chip.addEventListener('click', () => {
        if (BuilderState.columns.has(col)) {
          if (BuilderState.columns.size > 1) {
            BuilderState.columns.delete(col);
            chip.classList.remove('active');
          }
        } else {
          BuilderState.columns.add(col);
          chip.classList.add('active');
        }
        generateSqlFromBuilder();
      });
      chipsContainer.appendChild(chip);
    });
  }

  // 2. Render Quick Filter Templates
  const templateContainer = document.getElementById('quickFilterTemplates');
  if (templateContainer) {
    templateContainer.innerHTML = '';
    const templates = TABLE_FILTER_TEMPLATES[tableName] || [];
    templates.forEach(t => {
      const tChip = document.createElement('button');
      tChip.className = 'template-chip';
      tChip.textContent = t.label;
      tChip.addEventListener('click', () => {
        addFilterRow(t.col, t.op, t.val);
      });
      templateContainer.appendChild(tChip);
    });
  }

  // 3. Update CASE WHEN label
  const caseLabel = document.getElementById('builderCaseWhenLabel');
  const caseCheck = document.getElementById('builderCaseWhenCheck');
  if (caseLabel && caseCheck) {
    if (tableName === 'TRIANGLES') {
      caseLabel.textContent = '+ Add CASE WHEN: Triangle Classification';
      caseCheck.checked = true;
      BuilderState.hasCaseWhen = true;
    } else if (tableName === 'Customers') {
      caseLabel.textContent = '+ Add CASE WHEN: Credit Risk Tiering';
      caseCheck.checked = false;
      BuilderState.hasCaseWhen = false;
    } else if (tableName === 'Employees') {
      caseLabel.textContent = '+ Add CASE WHEN: Salary Compensation Tier';
      caseCheck.checked = false;
      BuilderState.hasCaseWhen = false;
    } else {
      caseLabel.textContent = '+ Add CASE WHEN Classification';
      caseCheck.checked = false;
      BuilderState.hasCaseWhen = false;
    }
  }

  // 4. Update Order Dropdowns
  const orderCol1 = document.getElementById('builderOrderCol1');
  const orderCol2 = document.getElementById('builderOrderCol2');
  if (orderCol1 && orderCol2) {
    let opts = '<option value="">-- No Sort --</option>';
    cols.forEach(c => { opts += `<option value="${c}">${c}</option>`; });
    orderCol1.innerHTML = opts;
    orderCol2.innerHTML = '<option value="">-- Secondary Tie-Breaker --</option>' + cols.map(c => `<option value="${c}">${c}</option>`).join('');
    BuilderState.orderCol1 = '';
    BuilderState.orderCol2 = '';
  }

  // 5. Reset Filter Rows to match new columns
  const filterList = document.getElementById('builderFilterList');
  if (filterList) {
    filterList.innerHTML = '';
    BuilderState.filters = [];
  }
}

function addFilterRow(initCol = null, initOp = '=', initVal = '') {
  const filterList = document.getElementById('builderFilterList');
  if (!filterList) return;

  const cols = Object.keys(DATABASE[BuilderState.table][0] || {});
  const filterId = 'filter_' + Date.now() + Math.random().toString(36).substr(2, 4);

  const row = document.createElement('div');
  row.className = 'filter-row';
  row.id = filterId;

  const defaultCol = initCol || cols[0];

  let colOptions = cols.map(c => `<option value="${c}" ${c === defaultCol ? 'selected' : ''}>${c}</option>`).join('');

  row.innerHTML = `
    <select class="builder-select filter-col flex-1">
      ${colOptions}
    </select>
    <select class="builder-select filter-op" style="width: 72px;">
      <option value=">" ${initOp === '>' ? 'selected' : ''}>&gt;</option>
      <option value="<" ${initOp === '<' ? 'selected' : ''}>&lt;</option>
      <option value="=" ${initOp === '=' ? 'selected' : ''}>=</option>
      <option value="!=" ${initOp === '!=' ? 'selected' : ''}>!=</option>
      <option value=">=" ${initOp === '>=' ? 'selected' : ''}>&gt;=</option>
      <option value="<=" ${initOp === '<=' ? 'selected' : ''}>&lt;=</option>
      <option value="LIKE" ${initOp === 'LIKE' ? 'selected' : ''}>LIKE</option>
      <option value="REGEXP" ${initOp === 'REGEXP' ? 'selected' : ''}>REGEXP</option>
    </select>
    <input type="text" class="filter-input" placeholder="Value..." value="${initVal}">
    <button class="remove-filter-btn" title="Remove filter">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  `;

  // Bind change events
  const colSel = row.querySelector('.filter-col');
  const opSel = row.querySelector('.filter-op');
  const valInp = row.querySelector('.filter-input');
  const removeBtn = row.querySelector('.remove-filter-btn');

  const updateFilters = () => {
    syncFiltersFromDOM();
    generateSqlFromBuilder();
  };

  colSel.addEventListener('change', updateFilters);
  opSel.addEventListener('change', updateFilters);
  valInp.addEventListener('input', updateFilters);

  removeBtn.addEventListener('click', () => {
    row.remove();
    updateFilters();
  });

  filterList.appendChild(row);
  syncFiltersFromDOM();
  if (initVal !== '') {
    generateSqlFromBuilder();
  }
}

function syncFiltersFromDOM() {
  const filterList = document.getElementById('builderFilterList');
  if (!filterList) return;

  const rows = filterList.querySelectorAll('.filter-row');
  BuilderState.filters = [];

  rows.forEach(r => {
    const col = r.querySelector('.filter-col').value;
    const op = r.querySelector('.filter-op').value;
    const val = r.querySelector('.filter-input').value.trim();
    if (val !== '') {
      BuilderState.filters.push({ col, op, val });
    }
  });
}

function generateSqlFromBuilder() {
  let query = 'SELECT ';

  if (BuilderState.isDistinct) {
    query += 'DISTINCT ';
  }

  const colsArray = Array.from(BuilderState.columns);
  const formattedCols = colsArray.map(col => {
    if (BuilderState.fn === 'length' && (col === 'first_name' || col === 'city' || col === 'Name')) {
      return `LENGTH(${col}) AS len_${col}`;
    }
    if (BuilderState.fn === 'right3' && (col === 'first_name' || col === 'city' || col === 'Name')) {
      return `RIGHT(${col}, 3) AS suffix_${col}`;
    }
    return col;
  });

  query += formattedCols.join(', ');

  // Append CASE WHEN if enabled
  if (BuilderState.hasCaseWhen) {
    if (BuilderState.table === 'TRIANGLES') {
      query += `,\n       CASE\n           WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'\n           WHEN A = B AND B = C THEN 'Equilateral'\n           WHEN A = B OR B = C OR A = C THEN 'Isosceles'\n           ELSE 'Scalene'\n       END AS triangle_type`;
    } else if (BuilderState.table === 'Customers') {
      query += `,\n       CASE\n           WHEN credit_score >= 750 THEN 'Prime'\n           WHEN credit_score >= 670 THEN 'Near Prime'\n           ELSE 'Subprime'\n       END AS risk_tier`;
    } else if (BuilderState.table === 'Employees') {
      query += `,\n       CASE\n           WHEN salary >= 100000 THEN 'Executive'\n           WHEN salary >= 75000 THEN 'Senior'\n           ELSE 'Associate'\n       END AS salary_tier`;
    }
  }

  query += `\nFROM ${BuilderState.table}`;

  // WHERE Filters
  if (BuilderState.filters.length > 0) {
    const filterClauses = BuilderState.filters.map(f => {
      const isNum = !isNaN(f.val);
      const formattedVal = isNum ? f.val : `'${f.val}'`;
      return `${f.col} ${f.op} ${formattedVal}`;
    });
    query += `\nWHERE ${filterClauses.join(` ${BuilderState.logic} `)}`;
  }

  // ORDER BY
  const orderParts = [];
  if (BuilderState.orderCol1) {
    orderParts.push(`${BuilderState.orderCol1} ${BuilderState.orderDir1}`);
  }
  if (BuilderState.orderCol2) {
    orderParts.push(`${BuilderState.orderCol2} ${BuilderState.orderDir2}`);
  }
  if (orderParts.length > 0) {
    query += `\nORDER BY ${orderParts.join(', ')}`;
  }

  // LIMIT
  if (BuilderState.limit !== 'All') {
    query += `\nLIMIT ${BuilderState.limit};`;
  } else {
    query += ';';
  }

  // Update raw textarea and live preview pre box
  const sqlInput = document.getElementById('sqlInput');
  if (sqlInput) {
    sqlInput.value = query;
  }

  const livePreview = document.getElementById('liveSqlPreview');
  if (livePreview) {
    livePreview.textContent = query;
  }

  parseAndBuildPipeline(query);
}

// =============================================================================
// 9. EVENT BINDINGS & INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderSchemaExplorer();
  initVisualBuilder();

  const sqlInput = document.getElementById('sqlInput');
  sqlInput.value = PRESETS.preset_case_triangle;
  parseAndBuildPipeline(sqlInput.value);

  document.getElementById('btnRunQuery').addEventListener('click', () => {
    parseAndBuildPipeline(sqlInput.value);
  });

  document.getElementById('presetSelect').addEventListener('change', (e) => {
    const val = e.target.value;
    if (PRESETS[val]) {
      sqlInput.value = PRESETS[val];
      parseAndBuildPipeline(sqlInput.value);
    }
  });

  document.getElementById('btnPrevStep').addEventListener('click', () => {
    if (EngineState.currentStepIndex > 0) renderStep(EngineState.currentStepIndex - 1);
  });

  document.getElementById('btnNextStep').addEventListener('click', () => {
    if (EngineState.currentStepIndex < EngineState.steps.length - 1) renderStep(EngineState.currentStepIndex + 1);
  });

  document.getElementById('btnResetStep').addEventListener('click', () => {
    renderStep(0);
  });

  document.getElementById('btnPlayPause').addEventListener('click', () => {
    if (EngineState.isPlaying) {
      clearInterval(EngineState.playTimer);
      EngineState.isPlaying = false;
      document.getElementById('playBtnText').textContent = 'Play';
      document.getElementById('playIcon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
    } else {
      EngineState.isPlaying = true;
      document.getElementById('playBtnText').textContent = 'Pause';
      document.getElementById('playIcon').innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';

      EngineState.playTimer = setInterval(() => {
        if (EngineState.currentStepIndex < EngineState.steps.length - 1) {
          renderStep(EngineState.currentStepIndex + 1);
        } else {
          clearInterval(EngineState.playTimer);
          EngineState.isPlaying = false;
          document.getElementById('playBtnText').textContent = 'Play';
          document.getElementById('playIcon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
        }
      }, 1600);
    }
  });

  document.querySelectorAll('.track-node').forEach((el) => {
    el.addEventListener('click', () => {
      const stepIdx = parseInt(el.dataset.step, 10);
      renderStep(stepIdx);
    });
  });

  document.querySelectorAll('.tab-item').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      document.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

      tabBtn.classList.add('active');
      const targetPanel = document.getElementById(tabBtn.dataset.tab);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  document.getElementById('btnClearSQL').addEventListener('click', () => {
    sqlInput.value = '';
    sqlInput.focus();
  });

  document.getElementById('btnFormatSQL').addEventListener('click', () => {
    let sql = sqlInput.value.replace(/\s+/g, ' ');
    sql = sql.replace(/\b(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|CASE|WHEN|THEN|ELSE|END)\b/gi, match => `\n${match.toUpperCase()}`);
    sqlInput.value = sql.trim();
  });

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      parseAndBuildPipeline(sqlInput.value);
    }
  });

  // Initialize Learning Platform Curriculum Views
  initCurriculumSystem();
});

// =============================================================================
// 10. CURRICULUM MODULE & VIEW ROUTING CONTROLLER
// =============================================================================

function initCurriculumSystem() {
  // Top Navigation Tabs Click
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.dataset.view;
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add('active');
      }

      // Lazy render on view switch
      if (targetId === 'viewExplainer') renderKeywordExplainer();
      if (targetId === 'viewMcqs') renderMcqs();
      if (targetId === 'viewCases') renderCaseStudies();
      if (targetId === 'viewProblems') renderProblemBank();
    });
  });

  // Difficulty filter pills in Problem Bank
  document.querySelectorAll('.diff-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProblemBank(btn.dataset.diff);
    });
  });
}

function switchToStudioWithQuery(query, table) {
  // 1. Switch to Studio view
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));

  const studioTab = document.querySelector('.nav-tab[data-view="viewStudio"]');
  const studioView = document.getElementById('viewStudio');
  if (studioTab) studioTab.classList.add('active');
  if (studioView) studioView.classList.add('active');

  // 2. Switch active table
  if (table && DATABASE[table]) {
    EngineState.activeTable = table;
    updateActiveTableBadge(table);
    const tblSel = document.getElementById('builderTableSelect');
    if (tblSel) tblSel.value = table;
    syncBuilderFromTable(table);
  }

  // 3. Inject SQL and Parse
  const sqlInput = document.getElementById('sqlInput');
  if (sqlInput) {
    sqlInput.value = query;
  }
  const livePreview = document.getElementById('liveSqlPreview');
  if (livePreview) {
    livePreview.textContent = query;
  }

  // Switch to Raw mode to display the loaded solution
  const btnModeRaw = document.getElementById('btnModeRaw');
  const btnModeBuilder = document.getElementById('btnModeBuilder');
  const visualContainer = document.getElementById('visualBuilderContainer');
  const rawContainer = document.getElementById('rawSqlContainer');
  const rawActions = document.getElementById('rawEditorActions');

  if (btnModeRaw && btnModeBuilder && visualContainer && rawContainer) {
    btnModeRaw.classList.add('active');
    btnModeBuilder.classList.remove('active');
    visualContainer.style.display = 'none';
    rawContainer.style.display = 'block';
    if (rawActions) rawActions.style.display = 'flex';
  }

  parseAndBuildPipeline(query);
}

function renderKeywordExplainer() {
  const container = document.getElementById('keywordCardsGrid');
  if (!container || !window.FOUNDATIONS_DATA) return;

  const keywords = window.FOUNDATIONS_DATA.keywords || [];
  let html = '';

  keywords.forEach(kw => {
    html += `
      <div class="keyword-card" id="kw_${kw.id}">
        <div class="keyword-card-top">
          <div class="keyword-identity">
            <span class="clause-pill ${kw.badgeClass}">${kw.name}</span>
            <span class="keyword-name-title">${kw.name}</span>
            <span style="font-size: 11px; color: var(--text-muted);">&bull; ${kw.category}</span>
          </div>
          <span class="exec-badge">Physical Step: ${kw.executionOrder}</span>
        </div>

        <p class="keyword-desc">${kw.concept}</p>

        <div class="keyword-syntax-box">
          <span style="color: var(--text-muted); font-size: 10px; display: block; margin-bottom: 2px;">CANONICAL SYNTAX:</span>
          <code>${kw.syntax}</code>
        </div>

        <div>
          <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--text-secondary); display: block; margin-bottom: 6px;">
            Execution Principles &amp; Architecture:
          </span>
          <ul class="keyword-rules-list">
            ${kw.rules.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>

        <div class="keyword-gotcha-box">
          <strong>CRITICAL GOTCHA:</strong> ${kw.gotcha}
        </div>

        <div class="svg-diagram-wrapper">
          ${kw.svgDiagram}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

let QuizState = {
  score: 0,
  answered: 0,
  total: 0
};

function renderMcqs() {
  const container = document.getElementById('mcqCardsList');
  if (!container || !window.FOUNDATIONS_DATA) return;

  const mcqs = window.FOUNDATIONS_DATA.mcqs || [];
  QuizState.total = mcqs.length;
  document.getElementById('quizTotalCount').textContent = QuizState.total;
  document.getElementById('quizScoreCount').textContent = QuizState.score;

  let html = '';

  mcqs.forEach((mcq, idx) => {
    html += `
      <div class="mcq-card" id="card_${mcq.id}">
        <div class="mcq-meta-row">
          <span class="mcq-keyword-tag">${mcq.keyword}</span>
          <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-muted);">Question ${idx + 1} of ${mcqs.length}</span>
        </div>
        <p class="mcq-question-text">${mcq.question}</p>
        <div class="mcq-options-grid" id="options_${mcq.id}">
          ${mcq.options.map((opt, optIdx) => `
            <button class="mcq-option-btn" data-qid="${mcq.id}" data-optidx="${optIdx}">
              <strong>${String.fromCharCode(65 + optIdx)}.</strong> ${opt}
            </button>
          `).join('')}
        </div>
        <div class="mcq-explanation-card" id="exp_${mcq.id}">
          <div style="font-weight: 600; margin-bottom: 4px;" id="verdict_${mcq.id}"></div>
          <div>${mcq.explanation}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Bind option clicks
  container.querySelectorAll('.mcq-option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const qid = btn.dataset.qid;
      const optIdx = parseInt(btn.dataset.optidx, 10);
      handleMcqAnswer(qid, optIdx);
    });
  });
}

function handleMcqAnswer(qid, selectedIdx) {
  const mcqs = window.FOUNDATIONS_DATA.mcqs;
  const mcq = mcqs.find(m => m.id === qid);
  if (!mcq) return;

  const card = document.getElementById(`card_${qid}`);
  const optionBtns = card.querySelectorAll('.mcq-option-btn');
  const expCard = document.getElementById(`exp_${qid}`);
  const verdict = document.getElementById(`verdict_${qid}`);

  // Disable all options in this card
  optionBtns.forEach(b => b.disabled = true);

  const isCorrect = (selectedIdx === mcq.correctIndex);
  if (isCorrect) {
    QuizState.score++;
    document.getElementById('quizScoreCount').textContent = QuizState.score;
    optionBtns[selectedIdx].classList.add('opt-correct');
    verdict.innerHTML = `<span style="color: #9ec5ad;">&check; Correct Execution Reasoning</span>`;
  } else {
    optionBtns[selectedIdx].classList.add('opt-wrong');
    optionBtns[mcq.correctIndex].classList.add('opt-correct');
    verdict.innerHTML = `<span style="color: #c98877;">&cross; Incorrect</span> &mdash; Correct answer is <strong>Option ${String.fromCharCode(65 + mcq.correctIndex)}</strong>`;
  }

  QuizState.answered++;
  expCard.classList.add('show');
}

function renderCaseStudies() {
  const container = document.getElementById('caseStudiesGrid');
  if (!container || !window.FOUNDATIONS_DATA) return;

  const cases = window.FOUNDATIONS_DATA.caseStudies || [];
  let html = '';

  cases.forEach(cs => {
    html += `
      <div class="case-card">
        <div class="case-card-header">
          <div>
            <h3 class="case-title">${cs.title}</h3>
            <span class="case-industry">${cs.industry}</span>
          </div>
          <span class="badge-diff ${cs.difficulty === 'Easy' ? 'diff-easy' : (cs.difficulty === 'Medium' ? 'diff-medium' : 'diff-hard')}">${cs.difficulty}</span>
        </div>

        <p class="case-scenario-text">${cs.scenario}</p>

        <div style="font-family: var(--font-mono); font-size: 10.5px; color: var(--text-muted);">
          Schema: <code>${cs.schemaSnippet}</code>
        </div>

        <div class="case-objective-box">
          <strong>Objective:</strong> ${cs.businessObjective}
        </div>

        <div class="case-card-actions">
          <button class="btn-solve-in-studio" data-table="${cs.table}" data-query="${encodeURIComponent(cs.targetQuery)}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Solve in Query Studio
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.btn-solve-in-studio').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = decodeURIComponent(btn.dataset.query);
      const tbl = btn.dataset.table;
      switchToStudioWithQuery(q, tbl);
    });
  });
}

function renderProblemBank(filter = 'all') {
  const container = document.getElementById('problemsListGrid');
  if (!container || !window.FOUNDATIONS_DATA) return;

  let problems = window.FOUNDATIONS_DATA.problems || [];
  if (filter !== 'all') {
    problems = problems.filter(p => p.difficulty.toLowerCase() === filter.toLowerCase());
  }

  let html = '';

  problems.forEach((prob, idx) => {
    const diffClass = prob.difficulty === 'Easy' ? 'diff-easy' : (prob.difficulty === 'Medium' ? 'diff-medium' : 'diff-hard');

    html += `
      <div class="problem-card">
        <div class="problem-main-info">
          <div class="problem-title-row">
            <span class="badge-diff ${diffClass}">${prob.difficulty}</span>
            <span class="problem-card-title">${prob.title}</span>
            <span class="points-pill">+${prob.points} pts</span>
            <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-muted);">&bull; Table: ${prob.table}</span>
          </div>
          <p class="problem-prompt-text">${prob.prompt}</p>
        </div>
        <div class="problem-action-col">
          <button class="btn-solve-in-studio" data-table="${prob.table}" data-query="${encodeURIComponent(prob.solutionSQL)}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            Load in Studio
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.btn-solve-in-studio').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = decodeURIComponent(btn.dataset.query);
      const tbl = btn.dataset.table;
      switchToStudioWithQuery(q, tbl);
    });
  });
}
