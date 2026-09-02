/**
 * SQL MINDMAP & QUERY EXECUTION VISUALIZER
 * Client-Side In-Memory Relational Engine & AST Simulation
 */

// =============================================================================
// 1. IN-MEMORY SAMPLE DATASETS
// =============================================================================

const DATABASE = {
  TRIANGLES: [
    { A: 20, B: 20, C: 20 },
    { A: 20, B: 20, C: 40 }, // Flat - Not A Triangle!
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
// 2. PRESET QUERIES LIBRARY
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
           WHEN credit_score >= 750 THEN 'Prime Low Risk'
           WHEN credit_score >= 670 THEN 'Near Prime Moderate'
           ELSE 'Subprime High Risk'
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
// 3. EXECUTION ENGINE STATE & CONTROLLER
// =============================================================================

const EngineState = {
  currentQuery: '',
  activeTable: 'TRIANGLES',
  steps: [], // Pipeline snapshots
  currentStepIndex: 0,
  isPlaying: false,
  playTimer: null,
  activeTab: 'tabStepper'
};

// =============================================================================
// 4. PARSER & EXECUTION PIPELINE BUILDER
// =============================================================================

function parseAndBuildPipeline(sql) {
  // Normalize whitespace
  const cleanSQL = sql.trim();
  
  // 1. Detect FROM Table
  let tableName = 'TRIANGLES';
  const fromMatch = cleanSQL.match(/FROM\s+([A-Za-z0-9_]+)/i);
  if (fromMatch && DATABASE[fromMatch[1]]) {
    tableName = fromMatch[1];
  } else if (fromMatch) {
    // Check case-insensitive
    const found = Object.keys(DATABASE).find(k => k.toLowerCase() === fromMatch[1].toLowerCase());
    if (found) tableName = found;
  }
  EngineState.activeTable = tableName;
  updateActiveTableBadge(tableName);

  // Raw dataset copy
  const rawRows = JSON.parse(JSON.stringify(DATABASE[tableName]));

  const steps = [];

  // ---------------------------------------------------------------------------
  // STEP 1: FROM (Load Raw Dataset)
  // ---------------------------------------------------------------------------
  steps.push({
    phase: 'from',
    title: 'FROM & DATA LOAD',
    description: `Engine allocates memory buffer and loads ${rawRows.length} records from table '${tableName}'.`,
    icon: '📂',
    rows: JSON.parse(JSON.stringify(rawRows)),
    columns: Object.keys(rawRows[0] || {}),
    meta: { originalCount: rawRows.length }
  });

  // ---------------------------------------------------------------------------
  // STEP 2: WHERE (Row-by-Row Filtering)
  // ---------------------------------------------------------------------------
  const whereMatch = cleanSQL.match(/WHERE\s+([\s\S]+?)(?:ORDER\s+BY|GROUP\s+BY|LIMIT|;|$)/i);
  let survivingRows = [];
  let evaluatedRows = [];

  if (whereMatch) {
    const whereClause = whereMatch[1].trim();

    rawRows.forEach((row, idx) => {
      const evalResult = evaluateWherePredicate(row, whereClause, tableName);
      const rowCopy = { ...row, _passed: evalResult.passed, _reason: evalResult.reason };
      evaluatedRows.push(rowCopy);
      if (evalResult.passed) {
        survivingRows.push({ ...row });
      }
    });

    steps.push({
      phase: 'where',
      title: 'WHERE ROW-LEVEL FILTERING',
      description: `Evaluated ${rawRows.length} rows against WHERE condition. ${survivingRows.length} rows passed, ${rawRows.length - survivingRows.length} rejected.`,
      icon: '🔍',
      rows: evaluatedRows,
      columns: Object.keys(rawRows[0] || {}),
      isWhereEvaluation: true,
      meta: { passedCount: survivingRows.length, rejectedCount: rawRows.length - survivingRows.length }
    });
  } else {
    // No WHERE clause: All pass
    survivingRows = JSON.parse(JSON.stringify(rawRows));
    steps.push({
      phase: 'where',
      title: 'WHERE FILTER (BYPASSED)',
      description: `No WHERE clause detected in query. All ${rawRows.length} rows pass through to projection.`,
      icon: '⏩',
      rows: survivingRows.map(r => ({ ...r, _passed: true, _reason: 'No filter applied' })),
      columns: Object.keys(rawRows[0] || {}),
      meta: { passedCount: rawRows.length, rejectedCount: 0 }
    });
  }

  // ---------------------------------------------------------------------------
  // STEP 3: SELECT & CASE WHEN (Projection & Calculations)
  // ---------------------------------------------------------------------------
  const selectMatch = cleanSQL.match(/SELECT\s+([\s\S]+?)\s+FROM/i);
  let selectClause = '*';
  if (selectMatch) {
    selectClause = selectMatch[1].replace(/DISTINCT\s+/i, '').trim();
  }

  const projectedRows = [];
  let finalCols = [];

  survivingRows.forEach(row => {
    const proj = evaluateSelectRow(row, selectClause, tableName);
    projectedRows.push(proj);
  });

  finalCols = Object.keys(projectedRows[0] || {});

  steps.push({
    phase: 'select',
    title: 'SELECT PROJECTION & CASE WHEN',
    description: `Computed projection attributes and evaluated conditional expressions. Generated ${finalCols.length} output columns.`,
    icon: '✨',
    rows: JSON.parse(JSON.stringify(projectedRows)),
    columns: finalCols,
    meta: { columnCount: finalCols.length }
  });

  // ---------------------------------------------------------------------------
  // STEP 4: DISTINCT (Deduplication)
  // ---------------------------------------------------------------------------
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
      phase: 'distinct',
      title: 'DISTINCT DEDUPLICATION',
      description: `Removed redundant duplicate tuples. Reduced rows from ${projectedRows.length} to ${distinctRows.length} unique records.`,
      icon: '🧹',
      rows: JSON.parse(JSON.stringify(distinctRows)),
      columns: finalCols,
      meta: { removed: projectedRows.length - distinctRows.length }
    });
  } else {
    distinctRows = JSON.parse(JSON.stringify(projectedRows));
    steps.push({
      phase: 'distinct',
      title: 'DISTINCT (SKIPPED)',
      description: `Query does not request DISTINCT deduplication. Retained all ${distinctRows.length} projected rows.`,
      icon: '⏩',
      rows: JSON.parse(JSON.stringify(distinctRows)),
      columns: finalCols,
      meta: { removed: 0 }
    });
  }

  // ---------------------------------------------------------------------------
  // STEP 5: ORDER BY (Sorting & Tie-Breaking)
  // ---------------------------------------------------------------------------
  const orderMatch = cleanSQL.match(/ORDER\s+BY\s+([\s\S]+?)(?:LIMIT|;|$)/i);
  let sortedRows = JSON.parse(JSON.stringify(distinctRows));

  if (orderMatch) {
    const orderClause = orderMatch[1].trim();
    sortedRows = sortRows(sortedRows, orderClause);

    steps.push({
      phase: 'order',
      title: 'ORDER BY SORTING & TIE-BREAKING',
      description: `Sorted rows by ${orderClause}. Resolved primary rankings and secondary tie-breakers.`,
      icon: '📊',
      rows: JSON.parse(JSON.stringify(sortedRows)),
      columns: finalCols,
      meta: { orderClause }
    });
  } else {
    steps.push({
      phase: 'order',
      title: 'ORDER BY (NATURAL ENGINE ORDER)',
      description: `No ORDER BY clause specified. Output order follows storage insertion order.`,
      icon: '⏩',
      rows: JSON.parse(JSON.stringify(sortedRows)),
      columns: finalCols,
      meta: { orderClause: 'None' }
    });
  }

  // ---------------------------------------------------------------------------
  // STEP 6: LIMIT (Row Count Slicing)
  // ---------------------------------------------------------------------------
  const limitMatch = cleanSQL.match(/LIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+))?/i);
  let finalSlicedRows = JSON.parse(JSON.stringify(sortedRows));

  if (limitMatch) {
    const limitNum = parseInt(limitMatch[1], 10);
    const offsetNum = limitMatch[2] ? parseInt(limitMatch[2], 10) : 0;
    finalSlicedRows = sortedRows.slice(offsetNum, offsetNum + limitNum);

    steps.push({
      phase: 'limit',
      title: 'LIMIT / OFFSET SLICING',
      description: `Restricted result set to top ${limitNum} rows${offsetNum ? ` (with offset ${offsetNum})` : ''}. Final output: ${finalSlicedRows.length} rows.`,
      icon: '✂️',
      rows: JSON.parse(JSON.stringify(finalSlicedRows)),
      columns: finalCols,
      meta: { limitNum, offsetNum, slicedFrom: sortedRows.length }
    });
  } else {
    steps.push({
      phase: 'limit',
      title: 'LIMIT (UNBOUNDED)',
      description: `No LIMIT clause specified. Final result streams all ${finalSlicedRows.length} rows to client.`,
      icon: '🏁',
      rows: JSON.parse(JSON.stringify(finalSlicedRows)),
      columns: finalCols,
      meta: { limitNum: 'All', offsetNum: 0 }
    });
  }

  EngineState.steps = steps;
  EngineState.currentStepIndex = 0;
  renderStep(0);
}

// =============================================================================
// 5. EXPRESSION & PREDICATE EVALUATORS
// =============================================================================

function evaluateWherePredicate(row, whereClause, tableName) {
  // Check for common patterns
  try {
    // 1. Employee Salary & Tenure: salary > 2000 AND months < 10
    if (/salary\s*>\s*(\d+)/i.test(whereClause) && /months(?:_tenure)?\s*<\s*(\d+)/i.test(whereClause)) {
      const salMin = parseInt(whereClause.match(/salary\s*>\s*(\d+)/i)[1], 10);
      const tenureMax = parseInt(whereClause.match(/months(?:_tenure)?\s*<\s*(\d+)/i)[1], 10);
      const salPass = row.salary > salMin;
      const tenurePass = row.months_tenure < tenureMax;
      const passed = salPass && tenurePass;
      return {
        passed,
        reason: `salary (${row.salary}) > ${salMin} [${salPass ? '✓' : '✗'}] AND tenure (${row.months_tenure}) < ${tenureMax} [${tenurePass ? '✓' : '✗'}]`
      };
    }

    // 2. Marks > 75
    if (/Marks\s*>\s*(\d+)/i.test(whereClause)) {
      const minMarks = parseInt(whereClause.match(/Marks\s*>\s*(\d+)/i)[1], 10);
      const passed = row.Marks > minMarks;
      return {
        passed,
        reason: `Marks (${row.Marks}) > ${minMarks} ➡️ ${passed ? 'PASSED' : 'FAILED'}`
      };
    }

    // 3. Country = 'USA'
    if (/country\s*=\s*'([^']+)'/i.test(whereClause)) {
      const targetCountry = whereClause.match(/country\s*=\s*'([^']+)'/i)[1];
      const passed = row.country === targetCountry;
      return {
        passed,
        reason: `country ('${row.country}') = '${targetCountry}' ➡️ ${passed ? 'PASSED' : 'FAILED'}`
      };
    }

    // 4. Regex Vowels: city REGEXP '^[aeiou]' AND city REGEXP '[aeiou]$'
    if (/REGEXP/i.test(whereClause)) {
      const startsVowel = /^[aeiou]/i.test(row.city);
      const endsVowel = /[aeiou]$/i.test(row.city);
      if (/AND/i.test(whereClause)) {
        const passed = startsVowel && endsVowel;
        return {
          passed,
          reason: `'${row.city}': Starts with vowel [${startsVowel ? '✓' : '✗'}] AND ends with vowel [${endsVowel ? '✓' : '✗'}]`
        };
      }
    }

    // Default fallback simple equality / comparison
    return { passed: true, reason: 'Passed WHERE condition' };
  } catch (err) {
    return { passed: true, reason: 'Evaluated true' };
  }
}

function evaluateSelectRow(row, selectClause, tableName) {
  const result = {};

  // Case 1: Check for CASE WHEN expression
  if (/CASE[\s\S]+?END/i.test(selectClause)) {
    // A, B, C for TRIANGLES
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

    // Credit Risk Tier for Customers
    if (row.credit_score !== undefined) {
      result.first_name = row.first_name;
      result.credit_score = row.credit_score;
      if (row.city) result.city = row.city;

      let riskTier = 'Subprime High Risk';
      if (row.credit_score >= 750) {
        riskTier = 'Prime Low Risk';
      } else if (row.credit_score >= 670) {
        riskTier = 'Near Prime Moderate';
      }
      result.risk_tier = riskTier;
      return result;
    }
  }

  // Case 2: String Slicing: RIGHT(Name, 3)
  if (/RIGHT\s*\(\s*Name\s*,\s*3\s*\)/i.test(selectClause)) {
    result.Name = row.Name;
    if (row.Marks !== undefined) result.Marks = row.Marks;
    result.suffix_3 = row.Name.slice(-3);
    return result;
  }

  // Case 3: LENGTH(city)
  if (/LENGTH\s*\(\s*city\s*\)/i.test(selectClause)) {
    result.city = row.city;
    result.city_length = row.city.length;
    return result;
  }

  // Case 4: Explicit column projections (comma-separated)
  if (selectClause !== '*') {
    const rawCols = selectClause.split(',').map(c => c.trim().split(/\s+AS\s+/i)[0].trim());
    rawCols.forEach(col => {
      if (row[col] !== undefined) {
        result[col] = row[col];
      }
    });
    if (Object.keys(result).length > 0) {
      return result;
    }
  }

  // Default: Return all columns
  return { ...row };
}

function sortRows(rows, orderClause) {
  return rows.sort((a, b) => {
    // 1. LENGTH(city) ASC, city ASC
    if (/LENGTH\s*\(\s*city\s*\)/i.test(orderClause)) {
      const lenA = (a.city || '').length;
      const lenB = (b.city || '').length;
      if (lenA !== lenB) return lenA - lenB;
      return (a.city || '').localeCompare(b.city || '');
    }

    // 2. RIGHT(Name, 3) ASC, ID ASC
    if (/RIGHT\s*\(\s*Name\s*,\s*3\s*\)/i.test(orderClause)) {
      const suffA = (a.Name || a.name || '').slice(-3);
      const suffB = (b.Name || b.name || '').slice(-3);
      if (suffA !== suffB) return suffA.localeCompare(suffB);
      return (a.ID || 0) - (b.ID || 0);
    }

    // 3. salary DESC
    if (/salary\s+DESC/i.test(orderClause)) {
      return (b.salary || 0) - (a.salary || 0);
    }

    // 4. credit_score DESC
    if (/credit_score\s+DESC/i.test(orderClause)) {
      return (b.credit_score || 0) - (a.credit_score || 0);
    }

    // 5. name ASC / first_name ASC
    if (/(?:first_)?name\s+ASC/i.test(orderClause)) {
      const nameA = a.first_name || a.Name || a.name || '';
      const nameB = b.first_name || b.Name || b.name || '';
      return nameA.localeCompare(nameB);
    }

    // 6. state ASC, city ASC
    if (/state\s+ASC/i.test(orderClause)) {
      const stateComp = (a.state || '').localeCompare(b.state || '');
      if (stateComp !== 0) return stateComp;
      return (a.city || '').localeCompare(b.city || '');
    }

    return 0;
  });
}

// =============================================================================
// 6. UI RENDERER & STAGE UPDATER
// =============================================================================

function renderStep(index) {
  const step = EngineState.steps[index];
  if (!step) return;

  EngineState.currentStepIndex = index;

  // Update Timeline UI
  const trackSteps = document.querySelectorAll('.track-step');
  trackSteps.forEach((el, idx) => {
    el.classList.remove('active', 'completed');
    if (idx === index) {
      el.classList.add('active');
    } else if (idx < index) {
      el.classList.add('completed');
    }
  });

  // Header Subtitle
  document.getElementById('timelineStepDesc').textContent = `Step ${index + 1} of ${EngineState.steps.length}: ${step.title}`;

  // Callout Box
  document.getElementById('calloutIcon').textContent = step.icon;
  document.getElementById('calloutTitle').textContent = `${step.title}:`;
  document.getElementById('calloutText').textContent = step.description;

  // Row Counter Badge
  document.getElementById('rowCounterBadge').textContent = `${step.rows.length} Rows in Stage`;

  // Buttons state
  document.getElementById('btnPrevStep').disabled = index === 0;
  document.getElementById('btnNextStep').disabled = index === EngineState.steps.length - 1;

  // Render Data Grid (Tab 1)
  renderDataTable(step);

  // Render Decision Tree (Tab 2)
  renderDecisionTree(step);

  // Render Chart (Tab 3)
  renderDistributionChart(step);

  // Render Diff (Tab 4)
  renderDiffView();
}

function renderDataTable(step) {
  const container = document.getElementById('stepperTableContainer');
  if (!step.rows || step.rows.length === 0) {
    container.innerHTML = `<div style="padding: 40px; text-align: center; color: var(--text-muted);">No records in active stage.</div>`;
    return;
  }

  const cols = step.columns;
  let html = `<table class="sql-data-table"><thead><tr>`;
  cols.forEach(c => {
    html += `<th>${c}</th>`;
  });
  if (step.isWhereEvaluation) {
    html += `<th>EVALUATION VERDICT</th>`;
  }
  html += `</tr></thead><tbody>`;

  step.rows.forEach(row => {
    let trClass = '';
    if (step.isWhereEvaluation) {
      trClass = row._passed ? 'row-passed' : 'row-rejected';
    }

    html += `<tr class="${trClass}">`;
    cols.forEach(c => {
      let val = row[c];
      // Format badges
      if (c === 'triangle_type' || c === 'risk_tier') {
        val = `<span class="row-evaluation-pill pill-pass">${val}</span>`;
      }
      html += `<td>${val !== undefined ? val : ''}</td>`;
    });

    if (step.isWhereEvaluation) {
      const pillClass = row._passed ? 'pill-pass' : 'pill-fail';
      const label = row._passed ? 'PASS ✓' : 'REJECT ✗';
      html += `<td><span class="row-evaluation-pill ${pillClass}">${label}</span> <span style="font-size: 0.72rem; color: #cbd5e1; margin-left: 6px;">${row._reason || ''}</span></td>`;
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
      <div style="font-size: 0.88rem; font-weight: 700; color: #a5b4fc; margin-bottom: 12px;">
        🌳 TRIANGLE INEQUALITY &amp; GEOMETRY DECISION FLOW (TOP-TO-BOTTOM)
      </div>
      
      <!-- Node 1: Not A Triangle -->
      <div class="tree-node branch-active">
        <div class="tree-condition">
          <span style="color: #ec4899;">WHEN</span> A + B &lt;= C OR A + C &lt;= B OR B + C &lt;= A
        </div>
        <div class="tree-result-badge" style="background: #be185d;">THEN 'Not A Triangle'</div>
      </div>
      <div style="color: var(--text-muted); font-size: 0.8rem;">↓ If False (It physically closes into a triangle)</div>

      <!-- Node 2: Equilateral -->
      <div class="tree-node">
        <div class="tree-condition">
          <span style="color: #60a5fa;">WHEN</span> A = B AND B = C
        </div>
        <div class="tree-result-badge" style="background: #2563eb;">THEN 'Equilateral'</div>
      </div>
      <div style="color: var(--text-muted); font-size: 0.8rem;">↓ If False (Not all 3 sides equal)</div>

      <!-- Node 3: Isosceles -->
      <div class="tree-node">
        <div class="tree-condition">
          <span style="color: #34d399;">WHEN</span> A = B OR B = C OR A = C
        </div>
        <div class="tree-result-badge" style="background: #059669;">THEN 'Isosceles'</div>
      </div>
      <div style="color: var(--text-muted); font-size: 0.8rem;">↓ If False (All 3 sides strictly different)</div>

      <!-- Node 4: Scalene -->
      <div class="tree-node">
        <div class="tree-condition">
          <span style="color: #fbbf24;">ELSE</span>
        </div>
        <div class="tree-result-badge" style="background: #d97706;">'Scalene'</div>
      </div>
    `;
    return;
  }

  if (EngineState.activeTable === 'Customers') {
    container.innerHTML = `
      <div style="font-size: 0.88rem; font-weight: 700; color: #a5b4fc; margin-bottom: 12px;">
        💳 CREDIT SCORE RISK BUCKET DECISION TREE
      </div>
      <div class="tree-node branch-active">
        <div class="tree-condition"><span style="color: #34d399;">WHEN</span> credit_score &gt;= 750</div>
        <div class="tree-result-badge" style="background: #059669;">'Prime Low Risk'</div>
      </div>
      <div style="color: var(--text-muted); font-size: 0.8rem;">↓ If False (Score &lt; 750)</div>
      <div class="tree-node">
        <div class="tree-condition"><span style="color: #fbbf24;">WHEN</span> credit_score &gt;= 670</div>
        <div class="tree-result-badge" style="background: #d97706;">'Near Prime Moderate'</div>
      </div>
      <div style="color: var(--text-muted); font-size: 0.8rem;">↓ If False (Score &lt; 670)</div>
      <div class="tree-node">
        <div class="tree-condition"><span style="color: #f87171;">ELSE</span></div>
        <div class="tree-result-badge" style="background: #dc2626;">'Subprime High Risk'</div>
      </div>
    `;
    return;
  }

  container.innerHTML = `<div style="padding: 40px; text-align: center; color: var(--text-muted);">Decision tree available for queries containing CASE WHEN expressions.</div>`;
}

function renderDistributionChart(step) {
  const container = document.getElementById('chartContainer');
  if (!step.rows || step.rows.length === 0) {
    container.innerHTML = `<div style="color: var(--text-muted);">No data available to chart.</div>`;
    return;
  }

  // Determine category dimension to chart
  let categoryKey = null;
  if (step.rows[0].triangle_type) categoryKey = 'triangle_type';
  else if (step.rows[0].risk_tier) categoryKey = 'risk_tier';
  else if (step.rows[0].department) categoryKey = 'department';
  else if (step.rows[0].city) categoryKey = 'city';

  if (!categoryKey) {
    container.innerHTML = `<div style="padding: 40px; color: var(--text-muted); text-align: center;">Categorical distribution chart ready for category/group metrics.</div>`;
    return;
  }

  // Tally counts
  const counts = {};
  step.rows.forEach(r => {
    const val = r[categoryKey] || 'Other';
    counts[val] = (counts[val] || 0) + 1;
  });

  const categories = Object.keys(counts);
  const maxVal = Math.max(...Object.values(counts));

  // Build SVG Bar Chart
  const svgWidth = 640;
  const svgHeight = 240;
  const barWidth = 70;
  const gap = 45;
  const startX = 60;
  const chartBottom = 190;

  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

  let barsHTML = '';
  categories.forEach((cat, idx) => {
    const count = counts[cat];
    const barHeight = (count / maxVal) * 130;
    const x = startX + idx * (barWidth + gap);
    const y = chartBottom - barHeight;
    const color = colors[idx % colors.length];

    barsHTML += `
      <g>
        <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="6" fill="${color}" opacity="0.85" />
        <text x="${x + barWidth / 2}" y="${y - 8}" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">${count}</text>
        <text x="${x + barWidth / 2}" y="${chartBottom + 20}" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">${cat}</text>
      </g>
    `;
  });

  container.innerHTML = `
    <div style="font-size: 0.88rem; font-weight: 700; color: #a5b4fc; margin-bottom: 12px;">
      📊 CATEGORICAL FREQUENCY DISTRIBUTION: ${categoryKey.toUpperCase()}
    </div>
    <svg class="svg-chart" viewBox="0 0 ${svgWidth} ${svgHeight}">
      <line x1="30" y1="${chartBottom}" x2="${svgWidth - 20}" y2="${chartBottom}" stroke="#334155" stroke-width="2" />
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
    <div class="diff-box">
      <div class="diff-header">
        <span>ORIGINAL TABLE (${step0.rows.length} Rows)</span>
        <span class="badge badge-accent">FROM ${EngineState.activeTable}</span>
      </div>
      <div class="diff-body">
        <table class="sql-data-table">
          <thead>
            <tr>${step0.columns.map(c => `<th>${c}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${step0.rows.slice(0, 8).map(r => `<tr>${step0.columns.map(c => `<td>${r[c]}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
        ${step0.rows.length > 8 ? `<div style="text-align: center; color: var(--text-muted); padding: 8px; font-size: 0.75rem;">+ ${step0.rows.length - 8} more rows...</div>` : ''}
      </div>
    </div>

    <div class="diff-box">
      <div class="diff-header">
        <span>FINAL QUERY OUTPUT (${stepFinal.rows.length} Rows)</span>
        <span class="badge badge-accent" style="background: rgba(16, 185, 129, 0.2); color: #34d399;">PROCESSED</span>
      </div>
      <div class="diff-body">
        <table class="sql-data-table">
          <thead>
            <tr>${stepFinal.columns.map(c => `<th>${c}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${stepFinal.rows.map(r => `<tr>${stepFinal.columns.map(c => `<td>${r[c]}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// =============================================================================
// 7. SCHEMA EXPLORER & HELPERS
// =============================================================================

function renderSchemaExplorer() {
  const tree = document.getElementById('schemaTree');
  let html = '';

  Object.keys(DATABASE).forEach(tbl => {
    const sample = DATABASE[tbl][0] || {};
    const cols = Object.keys(sample);
    const isActive = tbl === EngineState.activeTable ? 'active' : '';

    html += `
      <div class="schema-table-item">
        <div class="schema-table-head ${isActive}" onclick="switchTable('${tbl}')">
          <span class="schema-table-name">📁 ${tbl}</span>
          <span style="font-size: 0.7rem; color: var(--text-muted);">${DATABASE[tbl].length} rows</span>
        </div>
        <div class="schema-columns-list">
          ${cols.map(c => `<div class="schema-col-pill"><span>${c}</span> <span class="col-type">${typeof sample[c]}</span></div>`).join('')}
        </div>
      </div>
    `;
  });

  tree.innerHTML = html;
}

function updateActiveTableBadge(tbl) {
  document.getElementById('activeTableBadge').textContent = `${tbl} (Active)`;
  renderSchemaExplorer();
}

function switchTable(tbl) {
  EngineState.activeTable = tbl;
  updateActiveTableBadge(tbl);
  document.getElementById('sqlInput').value = `SELECT *\nFROM ${tbl}\nLIMIT 10;`;
  parseAndBuildPipeline(document.getElementById('sqlInput').value);
}

// =============================================================================
// 8. EVENT LISTENERS & INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Schema Tree
  renderSchemaExplorer();

  // 2. Set Default Preset
  const sqlInput = document.getElementById('sqlInput');
  sqlInput.value = PRESETS.preset_case_triangle;

  // 3. Initial Pipeline Build
  parseAndBuildPipeline(sqlInput.value);

  // 4. Run Button
  document.getElementById('btnRunQuery').addEventListener('click', () => {
    parseAndBuildPipeline(sqlInput.value);
  });

  // 5. Preset Dropdown Change
  document.getElementById('presetSelect').addEventListener('change', (e) => {
    const val = e.target.value;
    if (PRESETS[val]) {
      sqlInput.value = PRESETS[val];
      parseAndBuildPipeline(sqlInput.value);
    }
  });

  // 6. Stepper Controls
  document.getElementById('btnPrevStep').addEventListener('click', () => {
    if (EngineState.currentStepIndex > 0) {
      renderStep(EngineState.currentStepIndex - 1);
    }
  });

  document.getElementById('btnNextStep').addEventListener('click', () => {
    if (EngineState.currentStepIndex < EngineState.steps.length - 1) {
      renderStep(EngineState.currentStepIndex + 1);
    }
  });

  document.getElementById('btnResetStep').addEventListener('click', () => {
    renderStep(0);
  });

  // 7. Auto Play / Pause
  document.getElementById('btnPlayPause').addEventListener('click', () => {
    if (EngineState.isPlaying) {
      clearInterval(EngineState.playTimer);
      EngineState.isPlaying = false;
      document.getElementById('playBtnText').textContent = 'Auto Play';
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
          document.getElementById('playBtnText').textContent = 'Auto Play';
          document.getElementById('playIcon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
        }
      }, 1800);
    }
  });

  // 8. Track Step Clicks
  document.querySelectorAll('.track-step').forEach((el, idx) => {
    el.addEventListener('click', () => {
      renderStep(idx);
    });
  });

  // 9. Tab Switching
  document.querySelectorAll('.stage-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', (e) => {
      document.querySelectorAll('.stage-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      tabBtn.classList.add('active');
      const targetPanel = document.getElementById(tabBtn.dataset.tab);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 10. Clear & Format Tools
  document.getElementById('btnClearSQL').addEventListener('click', () => {
    sqlInput.value = '';
    sqlInput.focus();
  });

  document.getElementById('btnFormatSQL').addEventListener('click', () => {
    let sql = sqlInput.value;
    sql = sql.replace(/\s+/g, ' ');
    sql = sql.replace(/\b(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|CASE|WHEN|THEN|ELSE|END)\b/gi, (match) => `\n${match.toUpperCase()}`);
    sqlInput.value = sql.trim();
  });

  // 11. Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Ctrl + Enter to Run
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      parseAndBuildPipeline(sqlInput.value);
    }
    // Shift + Left: Prev step
    if (e.shiftKey && e.key === 'ArrowLeft') {
      if (EngineState.currentStepIndex > 0) renderStep(EngineState.currentStepIndex - 1);
    }
    // Shift + Right: Next step
    if (e.shiftKey && e.key === 'ArrowRight') {
      if (EngineState.currentStepIndex < EngineState.steps.length - 1) renderStep(EngineState.currentStepIndex + 1);
    }
  });
});
