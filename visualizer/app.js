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
  ],

  Transactions: [
    { tx_id: 'TX-901', merchant_category: 'Crypto Exchange', amount_usd: 6200.00, is_foreign_card: true, risk_score: 94 },
    { tx_id: 'TX-902', merchant_category: 'Electronics Retail', amount_usd: 1450.00, is_foreign_card: false, risk_score: 78 },
    { tx_id: 'TX-903', merchant_category: 'Grocery Supermarket', amount_usd: 85.50, is_foreign_card: false, risk_score: 12 },
    { tx_id: 'TX-904', merchant_category: 'Luxury Jewelry', amount_usd: 8900.00, is_foreign_card: true, risk_score: 91 },
    { tx_id: 'TX-905', merchant_category: 'SaaS Cloud Hosting', amount_usd: 420.00, is_foreign_card: true, risk_score: 65 },
    { tx_id: 'TX-906', merchant_category: 'Airline Tickets', amount_usd: 2100.00, is_foreign_card: false, risk_score: 82 }
  ],

  SubscriptionAccounts: [
    { account_id: 1, company_name: 'Stripe Inc', plan_tier: 'Enterprise', licensed_seats: 250, active_seats: 235, days_since_last_login: 1 },
    { account_id: 2, company_name: 'Acme Hardware', plan_tier: 'Enterprise', licensed_seats: 100, active_seats: 18, days_since_last_login: 38 },
    { account_id: 3, company_name: 'Nexus Robotics', plan_tier: 'Growth', licensed_seats: 50, active_seats: 21, days_since_last_login: 16 },
    { account_id: 4, company_name: 'FinEdge Global', plan_tier: 'Growth', licensed_seats: 40, active_seats: 38, days_since_last_login: 2 },
    { account_id: 5, company_name: 'CloudVector Labs', plan_tier: 'Enterprise', licensed_seats: 500, active_seats: 95, days_since_last_login: 42 }
  ],

  Orders: [
    { order_id: 5001, order_total: 189.50, is_prime_member: true, destination_zip: '94105', order_status: 'PENDING_FULFILLMENT' },
    { order_id: 5002, order_total: 42.00, is_prime_member: false, destination_zip: '10001', order_status: 'PENDING_FULFILLMENT' },
    { order_id: 5003, order_total: 245.00, is_prime_member: false, destination_zip: '78701', order_status: 'PENDING_FULFILLMENT' },
    { order_id: 5004, order_total: 89.00, is_prime_member: true, destination_zip: '98101', order_status: 'SHIPPED' },
    { order_id: 5005, order_total: 310.00, is_prime_member: true, destination_zip: '60601', order_status: 'PENDING_FULFILLMENT' }
  ],

  PatientIntake: [
    { intake_id: 701, patient_name: 'Marcus Vance', pulse_bpm: 138, o2_saturation: 84, is_unresponsive: false },
    { intake_id: 702, patient_name: 'Elena Rostova', pulse_bpm: 82, o2_saturation: 98, is_unresponsive: false },
    { intake_id: 703, patient_name: 'Arthur Pendelton', pulse_bpm: 112, o2_saturation: 91, is_unresponsive: false },
    { intake_id: 704, patient_name: 'Chloe Zhao', pulse_bpm: 76, o2_saturation: 81, is_unresponsive: true },
    { intake_id: 705, patient_name: 'Darius Miller', pulse_bpm: 104, o2_saturation: 95, is_unresponsive: false }
  ],

  DroneFleet: [
    { drone_id: 'DRN-X01', battery_pct: 18, payload_kg: 3.2, mission_distance_km: 7.4, motor_health_score: 92 },
    { drone_id: 'DRN-X02', battery_pct: 88, payload_kg: 2.1, mission_distance_km: 3.8, motor_health_score: 96 },
    { drone_id: 'DRN-X03', battery_pct: 64, payload_kg: 4.8, mission_distance_km: 2.5, motor_health_score: 94 },
    { drone_id: 'DRN-X04', battery_pct: 35, payload_kg: 1.5, mission_distance_km: 8.2, motor_health_score: 72 },
    { drone_id: 'DRN-X05', battery_pct: 92, payload_kg: 3.9, mission_distance_km: 4.1, motor_health_score: 99 }
  ],

  ShipmentTracking: [
    { tracking_id: 'SHP-8801', carrier_name: 'FedEx Air', sla_minutes: 240, actual_delivery_minutes: 385, freight_cost: 145.00 },
    { tracking_id: 'SHP-8802', carrier_name: 'UPS Ground', sla_minutes: 180, actual_delivery_minutes: 172, freight_cost: 65.00 },
    { tracking_id: 'SHP-8803', carrier_name: 'DHL Express', sla_minutes: 300, actual_delivery_minutes: 345, freight_cost: 210.00 },
    { tracking_id: 'SHP-8804', carrier_name: 'OnTrac Regional', sla_minutes: 120, actual_delivery_minutes: 310, freight_cost: 55.00 }
  ],

  MediaCatalog: [
    { title: 'The Quantum Heist', mpaa_rating: 'PG-13', genre: 'Sci-Fi Action', content_warning_tags: 'Violence' },
    { title: 'Cyber Syndicate', mpaa_rating: 'R', genre: 'Crime Thriller', content_warning_tags: 'Violence, Language' },
    { title: 'Panda Adventures', mpaa_rating: 'G', genre: 'Family Animation', content_warning_tags: 'None' },
    { title: 'Dark Colony 2099', mpaa_rating: 'TV-MA', genre: 'Dystopian Horror', content_warning_tags: 'Gore, Language' }
  ],

  AuthAuditLog: [
    { source_ip: '198.51.100.42', failed_attempts: 28, country_code: 'RU', is_vpn: false },
    { source_ip: '10.0.12.84', failed_attempts: 14, country_code: 'US', is_vpn: true },
    { source_ip: '203.0.113.19', failed_attempts: 8, country_code: 'CN', is_vpn: false },
    { source_ip: '192.0.2.105', failed_attempts: 34, country_code: 'BR', is_vpn: false }
  ],

  ExecutiveReview: [
    { executive_id: 1, executive_name: 'Alexandra Vance', department: 'Product', okr_completion_pct: 118.5, tenure_years: 4 },
    { executive_id: 2, executive_name: 'Julian Sterling', department: 'Engineering', okr_completion_pct: 104.2, tenure_years: 3 },
    { executive_id: 3, executive_name: 'Beatrice Chen', department: 'Finance', okr_completion_pct: 91.0, tenure_years: 2 },
    { executive_id: 4, executive_name: 'Devon Hughes', department: 'Sales', okr_completion_pct: 78.4, tenure_years: 1 }
  ],

  DepositLedger: [
    { deposit_id: 'DEP-101', account_id: 'ACC-8821', amount_usd: 9850.00, deposit_channel: 'CASH_TELLER', customer_occupation: 'Consultant' },
    { deposit_id: 'DEP-102', account_id: 'ACC-4412', amount_usd: 12500.00, deposit_channel: 'CASH_TELLER', customer_occupation: 'Retail Owner' },
    { deposit_id: 'DEP-103', account_id: 'ACC-9903', amount_usd: 350.00, deposit_channel: 'ATM', customer_occupation: 'Software Engineer' },
    { deposit_id: 'DEP-104', account_id: 'ACC-7714', amount_usd: 9200.00, deposit_channel: 'CASH_TELLER', customer_occupation: 'Real Estate' }
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

function initVisualizerApp() {
  renderSchemaExplorer();
  initVisualBuilder();

  const sqlInput = document.getElementById('sqlInput');
  if (sqlInput) {
    sqlInput.value = PRESETS.preset_case_triangle;
    parseAndBuildPipeline(sqlInput.value);
  }

  const btnRun = document.getElementById('btnRunQuery');
  if (btnRun) {
    btnRun.addEventListener('click', () => {
      if (sqlInput) parseAndBuildPipeline(sqlInput.value);
    });
  }

  const presetSel = document.getElementById('presetSelect');
  if (presetSel) {
    presetSel.addEventListener('change', (e) => {
      const val = e.target.value;
      if (PRESETS[val] && sqlInput) {
        sqlInput.value = PRESETS[val];
        parseAndBuildPipeline(sqlInput.value);
      }
    });
  }

  const btnPrev = document.getElementById('btnPrevStep');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (EngineState.currentStepIndex > 0) renderStep(EngineState.currentStepIndex - 1);
    });
  }

  const btnNext = document.getElementById('btnNextStep');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (EngineState.currentStepIndex < EngineState.steps.length - 1) renderStep(EngineState.currentStepIndex + 1);
    });
  }

  const btnReset = document.getElementById('btnResetStep');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      renderStep(0);
    });
  }

  const btnPlay = document.getElementById('btnPlayPause');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      if (EngineState.isPlaying) {
        clearInterval(EngineState.playTimer);
        EngineState.isPlaying = false;
        const txt = document.getElementById('playBtnText');
        const ico = document.getElementById('playIcon');
        if (txt) txt.textContent = 'Play';
        if (ico) ico.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
      } else {
        EngineState.isPlaying = true;
        const txt = document.getElementById('playBtnText');
        const ico = document.getElementById('playIcon');
        if (txt) txt.textContent = 'Pause';
        if (ico) ico.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';

        EngineState.playTimer = setInterval(() => {
          if (EngineState.currentStepIndex < EngineState.steps.length - 1) {
            renderStep(EngineState.currentStepIndex + 1);
          } else {
            clearInterval(EngineState.playTimer);
            EngineState.isPlaying = false;
            if (txt) txt.textContent = 'Play';
            if (ico) ico.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
          }
        }, 1600);
      }
    });
  }

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

  const btnClear = document.getElementById('btnClearSQL');
  if (btnClear && sqlInput) {
    btnClear.addEventListener('click', () => {
      sqlInput.value = '';
      sqlInput.focus();
    });
  }

  const btnFormat = document.getElementById('btnFormatSQL');
  if (btnFormat && sqlInput) {
    btnFormat.addEventListener('click', () => {
      let sql = sqlInput.value.replace(/\s+/g, ' ');
      sql = sql.replace(/\b(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|CASE|WHEN|THEN|ELSE|END)\b/gi, match => `\n${match.toUpperCase()}`);
      sqlInput.value = sql.trim();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      if (sqlInput) parseAndBuildPipeline(sqlInput.value);
    }
  });

  // Initialize Learning Platform Curriculum Views
  initCurriculumSystem();
}


// =============================================================================
// 10. CURRICULUM MODULE & VIEW ROUTING CONTROLLER
// =============================================================================

let currentCaseSectionFilter = 'all';
let currentCaseIndustryFilter = 'all';
let currentCaseDiffFilter = 'all';
let currentCaseSortOrder = 'diff_asc';
let currentCaseSearchQuery = '';
let currentCaseMode = 'study'; // 'study' or 'challenge'
let activeDossierCaseId = 1;
let currentCaseDisplayLimit = 30;

function switchMainView(targetId) {
  if (window.soundFX) window.soundFX.playWhoosh();
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));

  const tab = document.querySelector(`.nav-tab[data-view="${targetId}"]`);
  if (tab) tab.classList.add('active');

  const targetView = document.getElementById(targetId);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Lazy render on view switch
  if (targetId === 'viewGuidedLab') renderGuidedStep(currentGuidedStep);
  if (targetId === 'viewQuests') renderActiveQuest(currentQuestIndex);
  if (targetId === 'viewDeconstructor') renderDeconstructedProblem(activeDeconstructorId);
  if (targetId === 'viewExplainer') renderStudyLibrary();
  if (targetId === 'viewMcqs') renderMcqs();
  if (targetId === 'viewCases') renderCaseStudies();
  if (targetId === 'viewEnterpriseERD') initEnterpriseERD();
  if (targetId === 'viewProblems') renderProblemBank();
}

window.switchMainView = switchMainView;

function initCurriculumSystem() {
  // Top Navigation Tabs Click
  // Sound FX and Gamification setup
  const btnSoundToggle = document.getElementById('btnSoundToggle');
  if (btnSoundToggle && window.soundFX) {
    window.soundFX.updateSoundButtonUI();
    window.soundFX.updateXPBadgeUI();
    const streakEl = document.getElementById('streakDaysCount');
    if (streakEl) streakEl.textContent = window.soundFX.streak;
    btnSoundToggle.addEventListener('click', () => {
      window.soundFX.toggleSound();
    });
  }

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.view;
      if (targetId) switchMainView(targetId);
    });
  });

  // Initialize the Guided Lab default view, Quests, Problem Deconstructor & Study Library
  initGuidedLab();
  initQuestsSystem();
  initDeconstructorSystem();
  initStudyLibrary();

  // Difficulty filter pills in Problem Bank
  document.querySelectorAll('.diff-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProblemBank(btn.dataset.diff);
    });
  });

  // Section filter pills in 500 Case Studies
  document.querySelectorAll('.case-section-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.case-section-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (window.soundFX) window.soundFX.playPop();
      currentCaseDisplayLimit = 30;
      renderCaseStudies(currentCaseIndustryFilter, btn.dataset.section, currentCaseDiffFilter, currentCaseSortOrder);
    });
  });

  // Difficulty Filter Pills in 500 Case Studies (Color Theory)
  document.querySelectorAll('.case-diff-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.case-diff-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (window.soundFX) window.soundFX.playPop();
      currentCaseDisplayLimit = 30;
      renderCaseStudies(currentCaseIndustryFilter, currentCaseSectionFilter, btn.dataset.diff, currentCaseSortOrder);
    });
  });

  // Sort Order Selector in 500 Case Studies
  const caseSortSelect = document.getElementById('caseSortSelect');
  if (caseSortSelect) {
    caseSortSelect.addEventListener('change', (e) => {
      currentCaseSortOrder = e.target.value;
      if (window.soundFX) window.soundFX.playPop();
      currentCaseDisplayLimit = 30;
      renderCaseStudies(currentCaseIndustryFilter, currentCaseSectionFilter, currentCaseDiffFilter, currentCaseSortOrder);
    });
  }

  // Industry filter pills in 500 Case Studies
  document.querySelectorAll('.case-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.case-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (window.soundFX) window.soundFX.playPop();
      currentCaseDisplayLimit = 30;
      renderCaseStudies(btn.dataset.industry, currentCaseSectionFilter, currentCaseDiffFilter, currentCaseSortOrder);
    });
  });

  // Mode Switcher: Study Mode vs Challenge Mode
  const btnStudyMode = document.getElementById('btnCaseStudyMode');
  const btnChallengeMode = document.getElementById('btnCaseChallengeMode');
  const btnToggleEli5 = document.getElementById('btnToggleEli5Mode');

  if (btnStudyMode && btnChallengeMode) {
    btnStudyMode.addEventListener('click', () => {
      btnStudyMode.classList.add('active');
      btnChallengeMode.classList.remove('active');
      currentCaseMode = 'study';
      if (window.soundFX) window.soundFX.playPop();
      renderCaseStudies();
    });
    btnChallengeMode.addEventListener('click', () => {
      btnChallengeMode.classList.add('active');
      btnStudyMode.classList.remove('active');
      currentCaseMode = 'challenge';
      if (window.soundFX) window.soundFX.playPop();
      renderCaseStudies();
    });
  }

  // ELI5 Mode Switcher (Everyday English vs Technical Specs)
  window.isEli5ModeActive = false;
  if (btnToggleEli5) {
    btnToggleEli5.addEventListener('click', () => {
      window.isEli5ModeActive = !window.isEli5ModeActive;
      if (window.soundFX) window.soundFX.playPop();
      if (window.isEli5ModeActive) {
        btnToggleEli5.classList.add('active');
        btnToggleEli5.innerHTML = '👶 ELI5 Active (Everyday English)';
      } else {
        btnToggleEli5.classList.remove('active');
        btnToggleEli5.innerHTML = '👶 ELI5 Beginner Mode';
      }
      renderCaseStudies();
    });
  }

  // Search input for 500 Case Studies
  const caseSearchInput = document.getElementById('caseSearchInput');
  if (caseSearchInput) {
    caseSearchInput.addEventListener('input', (e) => {
      currentCaseSearchQuery = e.target.value.trim();
      renderCaseStudies(currentCaseIndustryFilter, currentCaseSectionFilter, currentCaseDiffFilter, currentCaseSortOrder);
    });
  }

  // Case Study Dossier Modal Controls
  const modal = document.getElementById('caseStudyDetailModal');
  const btnCloseDossier = document.getElementById('btnCloseDossierModal');
  const btnDossierPrev = document.getElementById('btnDossierPrev');
  const btnDossierNext = document.getElementById('btnDossierNext');
  const btnDossierToggleSim = document.getElementById('btnDossierToggleSim');
  const btnDossierSolveStudio = document.getElementById('btnDossierSolveStudio');

  if (btnCloseDossier) {
    btnCloseDossier.addEventListener('click', closeCaseDossier);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCaseDossier();
    });
  }
  if (btnDossierPrev) {
    btnDossierPrev.addEventListener('click', navigateDossierPrev);
  }
  if (btnDossierNext) {
    btnDossierNext.addEventListener('click', navigateDossierNext);
  }
  if (btnDossierToggleSim) {
    btnDossierToggleSim.addEventListener('click', toggleDossierSimulator);
  }
  if (btnDossierSolveStudio) {
    btnDossierSolveStudio.addEventListener('click', () => {
      const allCases = window.ALL_500_CASE_STUDIES || window.ALL_300_CASE_STUDIES || [];
      const cs = allCases.find(c => c.id === activeDossierCaseId);
      if (cs) {
        closeCaseDossier();
        switchToStudioWithQuery(cs.targetQuery, cs.table);
      }
    });
  }

  // Keyboard navigation for dossier modal
  window.addEventListener('keydown', (e) => {
    const modalEl = document.getElementById('caseStudyDetailModal');
    if (modalEl && modalEl.style.display === 'flex') {
      if (e.key === 'Escape') {
        closeCaseDossier();
      } else if (e.key === 'ArrowLeft') {
        navigateDossierPrev();
      } else if (e.key === 'ArrowRight') {
        navigateDossierNext();
      }
    }
  });

  // Enterprise ERD Explorer Company Switcher
  const erdCompanySelector = document.getElementById('erdCompanySelector');
  if (erdCompanySelector) {
    erdCompanySelector.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        erdCompanySelector.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (window.soundFX) window.soundFX.playPop();
        initEnterpriseERD(btn.dataset.company);
      });
    });
  }
}

// =============================================================================
// PROBLEM DECONSTRUCTOR & BUSINESS CONTEXT CONTROLLER
// =============================================================================

let activeDeconstructorId = 'triangle';

function initDeconstructorSystem() {
  const select = document.getElementById('deconstructorPresetSelect');
  if (!select || !window.DECONSTRUCTOR_PRESETS) return;

  let opts = '';
  window.DECONSTRUCTOR_PRESETS.forEach(p => {
    opts += `<option value="${p.id}">${p.title} (${p.difficulty})</option>`;
  });
  select.innerHTML = opts;

  select.addEventListener('change', (e) => {
    activeDeconstructorId = e.target.value;
    renderDeconstructedProblem(activeDeconstructorId);
  });

  // Wire Custom Modal
  const openModalBtn = document.getElementById('btnOpenCustomModal');
  const modal = document.getElementById('customProblemModal');
  const closeModalBtn = document.getElementById('btnCloseCustomModal');
  const runCustomBtn = document.getElementById('btnRunCustomDeconstruct');

  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
  if (runCustomBtn && modal) {
    runCustomBtn.addEventListener('click', handleCustomProblemDeconstruct);
  }

  renderDeconstructedProblem(activeDeconstructorId);
}

function handleCustomProblemDeconstruct() {
  const title = document.getElementById('customProbTitle')?.value.trim() || 'Custom Interview Challenge';
  const prompt = document.getElementById('customProbPrompt')?.value.trim() || 'Analyze relational data constraints and produce target outputs.';
  const schemaStr = document.getElementById('customProbSchema')?.value.trim() || 'CustomTable(id INT, name VARCHAR, value INT)';
  const modal = document.getElementById('customProblemModal');

  const hasJoin = /join/i.test(prompt);
  const hasGroup = /group by|average|count|sum/i.test(prompt);
  const hasCase = /case|when|if/i.test(prompt);
  const hasNull = /null/i.test(prompt);

  const detectedTags = ['CUSTOM', hasJoin ? 'JOIN' : 'FILTER', hasGroup ? 'AGGREGATION' : 'SELECTION'];
  if (hasCase) detectedTags.push('CASE WHEN');

  const customId = 'custom_' + Date.now();
  const newProblem = {
    id: customId,
    title: title,
    difficulty: 'Medium',
    points: 25,
    tags: detectedTags,
    schema: { table: schemaStr.split('(')[0].replace(/table:?/i, '').trim() || 'CustomTable' },
    rawPrompt: prompt,
    plainEnglishGoal: `Filter and project attributes from ${schemaStr} satisfying the specified criteria with deterministic output order.`,
    mentalModel: `Scan candidate records sequentially, test relational validity gates, and project scalar outputs.`,
    edgeCases: [
      { trap: 'Unmatched Records / NULL Semantics', detail: hasNull ? 'Prompt mentions NULL: inner joins will drop missing records. A LEFT JOIN or COALESCE is required.' : 'Verify boundary inequalities (< vs <=) to prevent silent edge data loss.' },
      { trap: 'Tie-Breaker Inconsistency', detail: 'Ensure deterministic secondary sorting is applied to satisfy automated test suites.' }
    ],
    corporateContext: {
      industry: 'Enterprise Data Platform & Analytics',
      role: 'Analytics Engineer / Product Data Analyst',
      realWorldProblem: 'Reconciling operational data across staging and production warehouse tables.',
      kpiImpact: 'Ensures 100% data fidelity on financial governance and executive dashboards.'
    },
    executionBlueprint: [
      { step: '1. FROM', action: `Allocate table space for ${schemaStr.split('(')[0] || 'CustomTable'}` },
      { step: '2. WHERE', action: 'Apply initial row-level qualification predicates' },
      { step: '3. SELECT', action: 'Project attributes with proper type casting and formatting' }
    ],
    solutionSQL: `SELECT *\nFROM ${schemaStr.split('(')[0].replace(/table:?/i, '').trim() || 'CustomTable'}\nWHERE id IS NOT NULL;`
  };

  window.DECONSTRUCTOR_PRESETS.unshift(newProblem);
  activeDeconstructorId = customId;

  const select = document.getElementById('deconstructorPresetSelect');
  if (select) {
    let opts = '';
    window.DECONSTRUCTOR_PRESETS.forEach(p => {
      opts += `<option value="${p.id}">${p.title} (${p.difficulty})</option>`;
    });
    select.innerHTML = opts;
    select.value = customId;
  }

  renderDeconstructedProblem(customId);
  if (modal) modal.style.display = 'none';
}

function renderDeconstructedProblem(problemId = 'triangle') {
  activeDeconstructorId = problemId;
  const container = document.getElementById('deconstructorBody');
  if (!container || !window.DECONSTRUCTOR_PRESETS) return;

  const problem = window.DECONSTRUCTOR_PRESETS.find(p => p.id === problemId) || window.DECONSTRUCTOR_PRESETS[0];

  container.innerHTML = `
    <div class="deconstruct-card">
      <div class="deconstruct-meta-header">
        <div class="deconstruct-title-row">
          <h3 class="deconstruct-main-title">${problem.title}</h3>
          <span class="badge-diff diff-easy">${problem.difficulty}</span>
          <span class="points-pill">+${problem.points} Pts</span>
        </div>
        <div style="display: flex; gap: 6px;">
          ${problem.tags.map(t => `<span class="deconstruct-tag-pill">${t}</span>`).join('')}
          <span class="status-pill" style="font-size: 10.5px;">Schema: ${problem.schema.table}</span>
        </div>
      </div>

      <!-- Raw Problem Prompt -->
      <div style="background: #09090b; border: 1px solid var(--border-default); border-radius: var(--radius-sm); padding: 12px 16px;">
        <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted); display: block; margin-bottom: 4px;">OFFICIAL PROBLEM PROMPT:</span>
        <p style="font-size: 12px; line-height: 1.55; color: var(--text-secondary); margin: 0; white-space: pre-line;">${problem.rawPrompt}</p>
      </div>

      <!-- Part 1: De-jargonized Goal & Mental Model -->
      <div class="deconstruct-section section-goal">
        <div class="section-header-title" style="color: #9ec5ad;">
          <span>🎯 Part 1: De-Jargonized Goal &amp; Mental Model</span>
        </div>
        <p style="font-size: 12.5px; line-height: 1.6; color: var(--text-primary); margin: 0;">
          <strong>Target Output:</strong> ${problem.plainEnglishGoal}
        </p>
        <p style="font-size: 12px; line-height: 1.6; color: #a1a1aa; margin: 0;">
          <strong>Intuitive Mental Model:</strong> ${problem.mentalModel}
        </p>
      </div>

      <!-- Part 2: Critical Edge Cases & Hidden Traps -->
      <div class="deconstruct-section section-traps">
        <div class="section-header-title" style="color: #d69d8f;">
          <span>⚠️ Part 2: Critical Edge Cases &amp; Hidden Traps (Why Test Cases Fail)</span>
        </div>
        <div>
          ${problem.edgeCases.map(ec => `
            <div class="trap-item">
              <div class="trap-title">&cross; Trap: ${ec.trap}</div>
              <p class="trap-detail">${ec.detail}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Part 3: Real-World Corporate & Industry Application -->
      <div class="deconstruct-section section-corporate">
        <div class="section-header-title" style="color: #a4b7cf;">
          <span>🏢 Part 3: Real-World Corporate &amp; Industry Application (Why Companies Care)</span>
        </div>
        <div class="corp-badge-row">
          <span class="corp-badge">Industry: ${problem.corporateContext.industry}</span>
          <span class="corp-badge">Role: ${problem.corporateContext.role}</span>
        </div>
        <p class="corp-desc-text">${problem.corporateContext.realWorldProblem}</p>
        <div class="kpi-impact-box">
          <strong>Business KPI Impact:</strong> ${problem.corporateContext.kpiImpact}
        </div>
      </div>

      <!-- Part 4: Physical Engine Execution Blueprint & Query -->
      <div class="deconstruct-section section-blueprint">
        <div class="section-header-title" style="color: #dfcaa9;">
          <span>📐 Part 4: Physical Execution Blueprint &amp; Query</span>
        </div>
        <div style="margin-bottom: 10px;">
          ${problem.executionBlueprint.map(bp => `
            <div class="blueprint-step-row">
              <span class="blueprint-step-tag">${bp.step}</span>
              <span class="blueprint-step-action">${bp.action}</span>
            </div>
          `).join('')}
        </div>
        <div class="guided-code-box" style="margin-bottom: 12px;">
          <code>${problem.solutionSQL}</code>
        </div>
        <div style="display: flex; justify-content: flex-end;">
          <button class="btn-solve-in-studio" onclick="switchToStudioWithQuery(\`${problem.solutionSQL.replace(/`/g, '\\`')}\`, '${problem.schema.table}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Simulate in Studio / Visualizer
          </button>
        </div>
      </div>
    </div>
  `;
}

// =============================================================================
// GUIDED LEARNING LAB CONTROLLER (MULTI-TRACK & INTERACTIVE SANDBOX)
// =============================================================================

let currentTrack = 'track01'; // 'track01' | 'track02' | 'trackOperators'
let currentGuidedStep = 1;
let activeWhereFilter = 0;
let activeOrderSort = 0;
let activeLimitCount = 3;

// WHERE sandbox options
const whereSandboxPresets = [
  { label: "salary >= 74k AND Eng (3 Pass)", sql: "SELECT * FROM Employees WHERE salary >= 74000 AND department = 'Engineering';", filter: r => r.salary >= 74000 && r.department === 'Engineering', dropReason: r => r.department !== 'Engineering' ? `dept='${r.department}' (wanted Eng)` : `salary=$${r.salary.toLocaleString()} (< $74k)` },
  { label: "department = 'Sales' (2 Pass)", sql: "SELECT * FROM Employees WHERE department = 'Sales';", filter: r => r.department === 'Sales', dropReason: r => `dept='${r.department}' (not Sales)` },
  { label: "salary < 70k (3 Pass)", sql: "SELECT * FROM Employees WHERE salary < 70000;", filter: r => r.salary < 70000, dropReason: r => `salary=$${r.salary.toLocaleString()} (>= $70k)` },
  { label: "hire_year >= 2022 (2 Pass)", sql: "SELECT * FROM Employees WHERE hire_year >= 2022;", filter: r => r.hire_year >= 2022, dropReason: r => `hired in ${r.hire_year} (< 2022)` },
  { label: "All Employees (8 Pass)", sql: "SELECT * FROM Employees WHERE 1 = 1;", filter: () => true, dropReason: () => "" }
];

// ORDER BY sandbox options
const orderSandboxPresets = [
  { label: "salary DESC, name ASC (Tie-breaker)", sql: "SELECT * FROM Employees ORDER BY salary DESC, name ASC;", sortFn: (a, b) => b.salary !== a.salary ? b.salary - a.salary : a.name.localeCompare(b.name) },
  { label: "hire_year ASC (Seniority first)", sql: "SELECT * FROM Employees ORDER BY hire_year ASC, name ASC;", sortFn: (a, b) => a.hire_year !== b.hire_year ? a.hire_year - b.hire_year : a.name.localeCompare(b.name) },
  { label: "department ASC, salary DESC", sql: "SELECT * FROM Employees ORDER BY department ASC, salary DESC;", sortFn: (a, b) => a.department !== b.department ? a.department.localeCompare(b.department) : b.salary - a.salary }
];

// LIMIT sandbox options
const limitSandboxPresets = [1, 3, 5];

function initGuidedLab() {
  const btnTrack01 = document.getElementById('btnTrack01');
  const btnTrack02 = document.getElementById('btnTrack02');
  const btnTrackAggregations = document.getElementById('btnTrackAggregations');
  const btnTrackJoins = document.getElementById('btnTrackJoins');
  const btnTrackOperators = document.getElementById('btnTrackOperators');

  if (btnTrack01) btnTrack01.addEventListener('click', () => switchTrack('track01'));
  if (btnTrack02) btnTrack02.addEventListener('click', () => switchTrack('track02'));
  if (btnTrackAggregations) btnTrackAggregations.addEventListener('click', () => switchTrack('trackAggregations'));
  if (btnTrackJoins) btnTrackJoins.addEventListener('click', () => switchTrack('trackJoins'));
  if (btnTrackOperators) btnTrackOperators.addEventListener('click', () => switchTrack('trackOperators'));

  switchTrack('track01');
}

function switchTrack(trackId) {
  currentTrack = trackId;
  currentGuidedStep = 1;

  document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById(
    trackId === 'track01' ? 'btnTrack01' : 
    (trackId === 'track02' ? 'btnTrack02' : 
    (trackId === 'trackAggregations' ? 'btnTrackAggregations' : 
    (trackId === 'trackJoins' ? 'btnTrackJoins' : 'btnTrackOperators')))
  );
  if (activeBtn) activeBtn.classList.add('active');

  const badge = document.getElementById('trackActiveSchemaBadge');
  if (badge) {
    if (trackId === 'track01') badge.textContent = 'Schema: Employees (8 rows)';
    else if (trackId === 'track02') badge.textContent = 'Schema: TRIANGLES (8 rows)';
    else if (trackId === 'trackAggregations') badge.textContent = 'Schema: Employees (9 rows, NULL bonuses)';
    else if (trackId === 'trackJoins') badge.textContent = 'Schema: Employees (5 rows) ⟕ Departments (4 rows)';
    else badge.textContent = 'Operators: LIKE, IN, BETWEEN, NULL';
  }

  const stepperBar = document.getElementById('guidedStepperBar');
  if (trackId === 'trackOperators') {
    if (stepperBar) stepperBar.style.display = 'none';
    renderOperatorsSandbox();
  } else {
    if (stepperBar) stepperBar.style.display = 'flex';
    renderGuidedStepperBar();
    renderGuidedStep(1);
  }
}

function renderGuidedStepperBar() {
  const bar = document.getElementById('guidedStepperBar');
  const activeSteps = currentTrack === 'track01' ? window.GUIDED_STEPS : 
    (currentTrack === 'track02' ? window.CASEWHEN_STEPS : 
    (currentTrack === 'trackAggregations' ? window.AGGREGATIONS_STEPS : 
    (currentTrack === 'trackJoins' ? window.JOINS_STEPS : [])));
  if (!bar || !activeSteps) return;

  let html = '';
  activeSteps.forEach(s => {
    const isActive = s.stepIndex === currentGuidedStep;
    const isCompleted = s.stepIndex < currentGuidedStep;
    html += `
      <button class="guided-step-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" onclick="renderGuidedStep(${s.stepIndex})">
        <span class="clause-pill ${s.pillClass}" style="margin: 0; padding: 1px 5px;">${s.keyword}</span>
        <span>${s.stepIndex < 10 ? '0' + s.stepIndex : s.stepIndex} ${s.keyword}</span>
      </button>
    `;
  });
  bar.innerHTML = html;
}

function setSandboxWhereFilter(index) {
  activeWhereFilter = index;
  renderGuidedStep(2);
}

function setSandboxOrderSort(index) {
  activeOrderSort = index;
  renderGuidedStep(5);
}

function setSandboxLimitCount(count) {
  activeLimitCount = count;
  renderGuidedStep(6);
}

let activeVennFilter = 'all';

function setVennFilter(filterKey) {
  if (window.soundFX) window.soundFX.playPop();
  activeVennFilter = filterKey;
  renderGuidedStep(currentGuidedStep);
}

function renderRelationalDualTableLinker() {
  const tableA = window.JOINS_SCHEMA.tableA;
  const tableB = window.JOINS_SCHEMA.tableB;
  return `
    <div class="relational-linker-wrap">
      <div class="relational-linker-header">
        <span class="relational-linker-title">Interactive Relational Key Linker</span>
        <span class="relational-linker-hint">Hover any employee or department to trace live foreign key matches</span>
      </div>
      <div class="relational-dual-grid">
        <div class="relational-table-box">
          <div class="relational-table-title">
            <span>TABLE A: Employees (Left)</span>
            <span style="font-size: 9.5px; opacity: 0.7;">FK: dept_id</span>
          </div>
          ${tableA.rows.map(r => `
            <div class="relational-row" data-side="left" data-empid="${r.emp_id}" data-deptid="${r.dept_id !== null ? r.dept_id : 'null'}">
              <span><strong>#${r.emp_id}</strong> ${r.name}</span>
              <span class="relational-key-badge ${r.dept_id === null ? 'key-null' : ''}">
                ${r.dept_id !== null ? `dept_id: ${r.dept_id}` : 'NULL (Orphan)'}
              </span>
            </div>
          `).join('')}
        </div>
        <div class="relational-table-box">
          <div class="relational-table-title">
            <span>TABLE B: Departments (Right)</span>
            <span style="font-size: 9.5px; opacity: 0.7;">PK: dept_id</span>
          </div>
          ${tableB.rows.map(d => `
            <div class="relational-row" data-side="right" data-deptid="${d.dept_id}">
              <span><strong>#${d.dept_id}</strong> ${d.dept_name}</span>
              <span class="relational-key-badge">${d.location}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div id="relationalHoverFeedback" style="margin-top: 10px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); text-align: center; min-height: 18px;">
        Hover a record to simulate pointer lookup in memory...
      </div>
    </div>
  `;
}

function bindRelationalLinkerEvents() {
  const rows = document.querySelectorAll('.relational-row');
  const feedback = document.getElementById('relationalHoverFeedback');
  const resultRows = document.querySelectorAll('.guided-table-wrap tbody tr');

  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const side = row.dataset.side;
      const deptId = row.dataset.deptid;
      const empId = row.dataset.empid;

      rows.forEach(r => r.classList.remove('active-match', 'active-orphan'));
      if (resultRows) resultRows.forEach(tr => tr.style.opacity = '0.35');

      if (deptId === 'null') {
        row.classList.add('active-orphan');
        if (window.soundFX) window.soundFX.playError();
        if (feedback) {
          feedback.innerHTML = `<span style="color: #d69d8f;">&cross; Orphan Employee (#${empId}) has dept_id = NULL. No department matches. Dropped in INNER JOIN, preserved with NULLs in LEFT JOIN.</span>`;
        }
        if (resultRows) {
          resultRows.forEach(tr => {
            if (tr.textContent.includes('Evan Vance')) {
              tr.style.opacity = '1';
              tr.style.backgroundColor = 'rgba(214, 157, 143, 0.2)';
            }
          });
        }
        return;
      }

      // Highlight matching records across both tables
      let matchedCount = 0;
      rows.forEach(r => {
        if (r.dataset.deptid === deptId) {
          r.classList.add('active-match');
          matchedCount++;
        }
      });

      if (window.soundFX) window.soundFX.playConnect();

      // Highlight matching result rows
      if (resultRows) {
        resultRows.forEach(tr => {
          if (tr.textContent.includes(`dept ${deptId}`) || tr.textContent.includes(`dept_id: ${deptId}`) || tr.textContent.includes(`Engineering`) && deptId === '10' || tr.textContent.includes(`Marketing`) && deptId === '20' || tr.textContent.includes(`Sales`) && deptId === '30' || tr.textContent.includes(`Research`) && deptId === '40') {
            tr.style.opacity = '1';
            tr.style.backgroundColor = 'rgba(158, 197, 173, 0.2)';
          }
        });
      }

      if (feedback) {
        if (side === 'left') {
          feedback.innerHTML = `<span style="color: #9ec5ad;">&check; Relational Match: Employee joins with Department #${deptId} (Key match found).</span>`;
        } else {
          feedback.innerHTML = `<span style="color: #a4b7cf;">&check; Relational Match: Department #${deptId} connects to ${matchedCount - 1} employee(s).</span>`;
        }
      }
    });

    row.addEventListener('mouseleave', () => {
      rows.forEach(r => r.classList.remove('active-match', 'active-orphan'));
      if (resultRows) {
        resultRows.forEach(tr => {
          tr.style.opacity = '1';
          tr.style.backgroundColor = '';
        });
      }
      if (feedback) {
        feedback.innerHTML = 'Hover a record to simulate pointer lookup in memory...';
      }
    });
  });
}

function renderGuidedStep(stepNum) {
  currentGuidedStep = stepNum;
  renderGuidedStepperBar();

  const container = document.getElementById('guidedStepCard');
  const activeSteps = currentTrack === 'track01' ? window.GUIDED_STEPS : 
    (currentTrack === 'track02' ? window.CASEWHEN_STEPS : 
    (currentTrack === 'trackAggregations' ? window.AGGREGATIONS_STEPS : 
    (currentTrack === 'trackJoins' ? window.JOINS_STEPS : [])));
  const activeSchema = currentTrack === 'track01' ? window.GUIDED_SCHEMA : 
    (currentTrack === 'track02' ? window.CASEWHEN_SCHEMA : 
    (currentTrack === 'trackAggregations' ? window.AGGREGATIONS_SCHEMA : 
    (currentTrack === 'trackJoins' ? window.JOINS_SCHEMA.tableA : null)));
  if (!container || !activeSteps) return;

  const step = activeSteps.find(s => s.stepIndex === stepNum) || activeSteps[0];
  let transformedRows = [];
  let currentSqlCode = step.sqlCode;
  let sandboxChipsHtml = '';

  // Apply Live Interactive Sandbox in Track 01
  if (currentTrack === 'track01' && stepNum === 2) {
    const preset = whereSandboxPresets[activeWhereFilter];
    currentSqlCode = preset.sql;
    transformedRows = activeSchema.rows.map(r => {
      const passes = preset.filter(r);
      return {
        ...r,
        _passed: passes,
        _status: passes ? 'passed' : 'rejected',
        _label: passes ? 'KEPT BUFFER' : preset.dropReason(r)
      };
    });

    sandboxChipsHtml = `
      <div class="sandbox-chips-row">
        <span class="sandbox-chips-label">⚡ Live Filter Sandbox:</span>
        ${whereSandboxPresets.map((p, idx) => `
          <button class="sandbox-chip ${activeWhereFilter === idx ? 'active' : ''}" onclick="setSandboxWhereFilter(${idx})">${p.label}</button>
        `).join('')}
      </div>
    `;
  } else if (currentTrack === 'track01' && stepNum === 5) {
    const preset = orderSandboxPresets[activeOrderSort];
    currentSqlCode = preset.sql;
    const sorted = [...activeSchema.rows].sort(preset.sortFn);
    transformedRows = sorted.map((r, idx) => ({
      ...r,
      _status: idx === 0 ? 'passed' : 'loaded',
      _label: `RANK #${idx + 1}`
    }));

    sandboxChipsHtml = `
      <div class="sandbox-chips-row">
        <span class="sandbox-chips-label">⚡ Live Sort Sandbox:</span>
        ${orderSandboxPresets.map((p, idx) => `
          <button class="sandbox-chip ${activeOrderSort === idx ? 'active' : ''}" onclick="setSandboxOrderSort(${idx})">${p.label}</button>
        `).join('')}
      </div>
    `;
  } else if (currentTrack === 'track01' && stepNum === 6) {
    currentSqlCode = `SELECT id, name, department, salary\nFROM Employees\nORDER BY salary DESC, name ASC\nLIMIT ${activeLimitCount};`;
    const sorted = [...activeSchema.rows].sort((a, b) => b.salary !== a.salary ? b.salary - a.salary : a.name.localeCompare(b.name)).slice(0, 5);
    transformedRows = sorted.map((r, idx) => ({
      ...r,
      _status: idx < activeLimitCount ? 'passed' : 'rejected',
      _label: idx < activeLimitCount ? `SURVIVED (TOP ${activeLimitCount})` : `TRUNCATED (ROW #${idx + 1})`
    }));

    sandboxChipsHtml = `
      <div class="sandbox-chips-row">
        <span class="sandbox-chips-label">⚡ Live Row Clipper:</span>
        ${limitSandboxPresets.map(cnt => `
          <button class="sandbox-chip ${activeLimitCount === cnt ? 'active' : ''}" onclick="setSandboxLimitCount(${cnt})">LIMIT ${cnt}</button>
        `).join('')}
      </div>
    `;
  } else {
    transformedRows = step.transform(JSON.parse(JSON.stringify(activeSchema.rows)));
  }

  // Filter transformed rows for Track 04 JOINs if Venn filter is active
  let vennFilterBarHtml = '';
  if (currentTrack === 'trackJoins') {
    if (activeVennFilter === 'intersection') {
      transformedRows = transformedRows.filter(r => r._status === 'passed');
    } else if (activeVennFilter === 'left') {
      transformedRows = transformedRows.filter(r => r.name === 'Evan Vance' || (r._label && (r._label.includes('LEFT') || r._label.includes('Evan'))));
    } else if (activeVennFilter === 'right') {
      transformedRows = transformedRows.filter(r => r.dept_name === 'Research' || (r._label && (r._label.includes('RIGHT') || r._label.includes('Research') || r._label.includes('0 employees'))));
    }

    vennFilterBarHtml = `
      <div class="venn-filter-bar">
        <span style="font-family: var(--font-mono); font-size: 10.5px; color: #a4b7cf; font-weight: 700;">Venn Filter:</span>
        <button class="venn-filter-pill ${activeVennFilter === 'all' ? 'active' : ''}" onclick="setVennFilter('all')">Show All Rows</button>
        <button class="venn-filter-pill ${activeVennFilter === 'intersection' ? 'active' : ''}" onclick="setVennFilter('intersection')">&cap; Intersection Matches</button>
        <button class="venn-filter-pill ${activeVennFilter === 'left' ? 'active' : ''}" onclick="setVennFilter('left')">&bull; Left Only (Evan Vance)</button>
        <button class="venn-filter-pill ${activeVennFilter === 'right' ? 'active' : ''}" onclick="setVennFilter('right')">&bull; Right Only (Research Dept)</button>
      </div>
    `;
  }

  const sampleRow = transformedRows[0] || {};
  const displayCols = Object.keys(sampleRow).filter(k => !k.startsWith('_'));

  let tableHtml = `
    <div class="guided-table-wrap">
      <table>
        <thead>
          <tr>
            ${displayCols.map(c => `<th>${c}</th>`).join('')}
            <th style="width: 170px;">ENGINE STATUS</th>
          </tr>
        </thead>
        <tbody>
  `;

  transformedRows.forEach(row => {
    const isRejected = (row._status === 'rejected' || row._passed === false);
    const isPassed = (row._status === 'passed' || row._passed === true);
    const trClass = isRejected ? 'row-rejected-dim' : (isPassed ? 'row-passed-highlight' : '');

    let badgeClass = 'tag-badge';
    if (isPassed) badgeClass = 'badge-active-pass';
    if (isRejected) badgeClass = 'badge-active-drop';

    tableHtml += `
      <tr class="${trClass}">
        ${displayCols.map(c => `<td>${row[c] !== undefined ? row[c] : 'NULL'}</td>`).join('')}
        <td>
          <span class="guided-row-badge ${badgeClass}">${row._label || (isPassed ? 'SURVIVED' : 'ACTIVE')}</span>
        </td>
      </tr>
    `;
  });

  tableHtml += `
        </tbody>
      </table>
    </div>
  `;

  const totalSteps = activeSteps.length;
  const prevStep = stepNum > 1 ? stepNum - 1 : null;
  const nextStep = stepNum < totalSteps ? stepNum + 1 : null;

  container.innerHTML = `
    <div class="guided-header-block">
      <div class="guided-title-row">
        <span class="clause-pill ${step.pillClass}">${step.keyword}</span>
        <h2 class="guided-step-title">${step.title}</h2>
      </div>
      <div class="guided-gotcha-box">
        <strong>CRITICAL GOTCHA:</strong> ${step.gotcha}
      </div>
    </div>

    <div class="guided-concept-block">
      <h3 class="guided-concept-heading">${step.conceptHeading}</h3>
      <p class="guided-concept-text">${step.conceptText}</p>
      <ul class="guided-points-list">
        ${step.explanationPoints.map(p => `<li>${p}</li>`).join('')}
      </ul>
    </div>

    <div class="guided-svg-container">
      ${step.svg}
    </div>

    <div class="guided-code-box">
      <span style="color: var(--text-muted); font-size: 10.5px; display: block; margin-bottom: 4px;">EXECUTED SQL:</span>
      <code>${currentSqlCode}</code>
    </div>

    <div class="guided-interactive-section">
      <span class="guided-action-prompt">${step.actionPrompt}</span>
      ${sandboxChipsHtml}
      ${currentTrack === 'trackJoins' ? renderRelationalDualTableLinker() : ''}
      ${vennFilterBarHtml}
      ${tableHtml}
    </div>

    <div class="guided-footer-nav">
      <button class="card-nav-btn" ${!prevStep ? 'disabled' : ''} onclick="renderGuidedStep(${prevStep})">
        &larr; Previous (${prevStep ? activeSteps[prevStep - 1].keyword : 'Start'})
      </button>

      <div style="display: flex; gap: 8px; align-items: center;">
        <button class="card-nav-btn" onclick="switchToExplainerWithKeyword('${step.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Study Notes
        </button>
        <button class="btn-solve-in-studio" onclick="switchToMcqsWithKeyword('${step.keyword}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
          Practice MCQs
        </button>
      </div>

      <button class="card-nav-btn" style="background: var(--text-primary); color: #09090b; font-weight: 600;" onclick="${nextStep ? `renderGuidedStep(${nextStep})` : `switchToMcqsWithKeyword('ALL')`}">
        ${nextStep ? `Next: Step 0${nextStep} (${activeSteps[nextStep - 1].keyword}) &rarr;` : `Complete Lab &rarr;`}
      </button>
    </div>
  `;

  if (currentTrack === 'trackJoins') {
    bindRelationalLinkerEvents();
  }
}

// =============================================================================
// OPERATORS & 3-VALUED LOGIC SANDBOX RENDERER
// =============================================================================

let activeLikeIndex = 0;
let activeInIndex = 0;
let activeBetweenIndex = 0;

function setOperatorLike(idx) {
  activeLikeIndex = idx;
  renderOperatorsSandbox();
}

function setOperatorIn(idx) {
  activeInIndex = idx;
  renderOperatorsSandbox();
}

function setOperatorBetween(idx) {
  activeBetweenIndex = idx;
  renderOperatorsSandbox();
}

function renderOperatorsSandbox() {
  const container = document.getElementById('guidedStepCard');
  if (!container || !window.OPERATORS_DATA || !window.GUIDED_SCHEMA) return;

  const data = window.OPERATORS_DATA;
  const rows = window.GUIDED_SCHEMA.rows;

  const currentLike = data.likePresets[activeLikeIndex];
  const currentIn = data.inPresets[activeInIndex];
  const currentBetween = data.betweenPresets[activeBetweenIndex];

  container.innerHTML = `
    <div class="guided-header-block">
      <div class="guided-title-row">
        <span class="clause-pill pill-where">OPERATORS</span>
        <h2 class="guided-step-title">⚡ Interactive Operators &amp; 3-Valued Logic Sandbox</h2>
      </div>
      <div class="guided-gotcha-box">
        <strong>THE 3-VALUED LOGIC TRAP:</strong> In SQL, a comparison involving NULL evaluates to UNKNOWN, which WHERE treats as FALSE. Therefore, <code>salary = NULL</code> returns 0 rows! You must always write <code>salary IS NULL</code>.
      </div>
    </div>

    <!-- Section 1: LIKE & Wildcards -->
    <div class="deconstruct-section section-goal" style="margin-bottom: 16px;">
      <div class="section-header-title" style="color: #9ec5ad;">
        <span>1. Pattern Matching with LIKE ('%' vs '_')</span>
      </div>
      <p style="font-size: 12px; color: var(--text-secondary); margin: 0 0 8px 0;">
        <code>%</code> matches 0 or more characters; <code>_</code> matches exactly one single character.
      </p>
      <div class="sandbox-chips-row">
        <span class="sandbox-chips-label">Pattern:</span>
        ${data.likePresets.map((lp, idx) => `
          <button class="sandbox-chip ${activeLikeIndex === idx ? 'active' : ''}" onclick="setOperatorLike(${idx})">${lp.label}</button>
        `).join('')}
      </div>
      <div class="guided-code-box" style="margin-bottom: 8px;">
        <code>SELECT name, department FROM Employees WHERE ${currentLike.pattern};</code>
      </div>
      <div style="font-size: 11px; color: #a1a1aa; margin-bottom: 8px;">&bull; Note: ${currentLike.note}</div>
      <div class="guided-table-wrap">
        <table>
          <thead>
            <tr><th>name</th><th>department</th><th>LIKE MATCH</th></tr>
          </thead>
          <tbody>
            ${rows.map(r => {
              const matched = currentLike.filter(r);
              return `
                <tr class="${matched ? 'row-passed-highlight' : 'row-rejected-dim'}">
                  <td><strong>${r.name}</strong></td>
                  <td>${r.department}</td>
                  <td><span class="guided-row-badge ${matched ? 'badge-active-pass' : 'badge-active-drop'}">${matched ? 'MATCHES PATTERN' : 'NO MATCH'}</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Section 2: IN vs NOT IN -->
    <div class="deconstruct-section section-corporate" style="margin-bottom: 16px;">
      <div class="section-header-title" style="color: #a4b7cf;">
        <span>2. Set Membership with IN &amp; NOT IN</span>
      </div>
      <div class="sandbox-chips-row">
        <span class="sandbox-chips-label">Set Filter:</span>
        ${data.inPresets.map((ip, idx) => `
          <button class="sandbox-chip ${activeInIndex === idx ? 'active' : ''}" onclick="setOperatorIn(${idx})">${ip.label}</button>
        `).join('')}
      </div>
      <div class="guided-code-box" style="margin-bottom: 8px;">
        <code>SELECT name, department, salary FROM Employees WHERE ${currentIn.pattern};</code>
      </div>
      <div style="font-size: 11px; color: #a1a1aa; margin-bottom: 8px;">&bull; Note: ${currentIn.note}</div>
      <div class="guided-table-wrap">
        <table>
          <thead>
            <tr><th>name</th><th>department</th><th>salary</th><th>IN STATUS</th></tr>
          </thead>
          <tbody>
            ${rows.map(r => {
              const matched = currentIn.filter(r);
              return `
                <tr class="${matched ? 'row-passed-highlight' : 'row-rejected-dim'}">
                  <td>${r.name}</td>
                  <td><strong>${r.department}</strong></td>
                  <td>$${r.salary.toLocaleString()}</td>
                  <td><span class="guided-row-badge ${matched ? 'badge-active-pass' : 'badge-active-drop'}">${matched ? 'INCLUDED IN SET' : 'EXCLUDED'}</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Section 3: BETWEEN (Inclusive Boundaries) -->
    <div class="deconstruct-section section-blueprint" style="margin-bottom: 16px;">
      <div class="section-header-title" style="color: #dfcaa9;">
        <span>3. Inclusive Range Matching with BETWEEN ... AND ...</span>
      </div>
      <div class="sandbox-chips-row">
        <span class="sandbox-chips-label">Range:</span>
        ${data.betweenPresets.map((bp, idx) => `
          <button class="sandbox-chip ${activeBetweenIndex === idx ? 'active' : ''}" onclick="setOperatorBetween(${idx})">${bp.label}</button>
        `).join('')}
      </div>
      <div class="guided-code-box" style="margin-bottom: 8px;">
        <code>SELECT name, department, salary FROM Employees WHERE ${currentBetween.pattern};</code>
      </div>
      <div style="font-size: 11px; color: #a1a1aa; margin-bottom: 8px;">&bull; Note: ${currentBetween.note}</div>
      <div class="guided-table-wrap">
        <table>
          <thead>
            <tr><th>name</th><th>salary</th><th>BETWEEN RANGE STATUS</th></tr>
          </thead>
          <tbody>
            ${rows.map(r => {
              const matched = currentBetween.filter(r);
              return `
                <tr class="${matched ? 'row-passed-highlight' : 'row-rejected-dim'}">
                  <td>${r.name}</td>
                  <td><strong>$${r.salary.toLocaleString()}</strong></td>
                  <td><span class="guided-row-badge ${matched ? 'badge-active-pass' : 'badge-active-drop'}">${matched ? 'INSIDE RANGE' : 'OUTSIDE RANGE'}</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Section 4: 3-Valued Logic Truth Table -->
    <div class="deconstruct-section section-traps">
      <div class="section-header-title" style="color: #d69d8f;">
        <span>4. The 3-Valued Boolean Logic Matrix (TRUE, FALSE, UNKNOWN)</span>
      </div>
      <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.6; margin: 0 0 10px 0;">
        Unlike standard programming languages with 2-valued boolean logic (true/false), SQL uses <strong>3-Valued Logic</strong> due to NULL. Any direct equality test against NULL evaluates to UNKNOWN!
      </p>
      <div class="guided-table-wrap">
        <table>
          <thead>
            <tr><th>EXPRESSION</th><th>RESULT</th><th>WHERE BEHAVIOR</th><th>WHY?</th></tr>
          </thead>
          <tbody>
            <tr class="row-rejected-dim">
              <td><code>salary = NULL</code></td>
              <td><span class="guided-row-badge badge-active-drop">UNKNOWN</span></td>
              <td>ROW REJECTED</td>
              <td>Unknown cannot equal unknown; evaluation yields UNKNOWN (treated as FALSE).</td>
            </tr>
            <tr class="row-rejected-dim">
              <td><code>salary != NULL</code></td>
              <td><span class="guided-row-badge badge-active-drop">UNKNOWN</span></td>
              <td>ROW REJECTED</td>
              <td>Negating UNKNOWN is still UNKNOWN; row is rejected!</td>
            </tr>
            <tr class="row-passed-highlight">
              <td><code>salary IS NULL</code></td>
              <td><span class="guided-row-badge badge-active-pass">TRUE / FALSE</span></td>
              <td>CORRECT FILTER</td>
              <td>Unary operator that inspects the memory null-mask directly.</td>
            </tr>
            <tr class="row-passed-highlight">
              <td><code>salary IS NOT NULL</code></td>
              <td><span class="guided-row-badge badge-active-pass">TRUE / FALSE</span></td>
              <td>CORRECT FILTER</td>
              <td>Ensures column has an actual valid value.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function switchToExplainerWithKeyword(keywordId) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));

  const tab = document.querySelector('.nav-tab[data-view="viewExplainer"]');
  const view = document.getElementById('viewExplainer');
  if (tab) tab.classList.add('active');
  if (view) view.classList.add('active');

  renderKeywordExplainer(keywordId.toLowerCase());
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

// =============================================================================
// STUDY LIBRARY & DOCUMENTATION CONTROLLER
// =============================================================================

let activeStudySectionId = 'sec_execution_order';
let studySearchFilter = '';

function initStudyLibrary() {
  const searchInput = document.getElementById('studySearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      studySearchFilter = e.target.value.toLowerCase().trim();
      renderStudyLibrary(activeStudySectionId);
    });
  }
}

function escapeHtmlStudy(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ---------------------------------------------------------------------------
// CURRICULUM PROGRESS & MASTERY PERSISTENCE
// ---------------------------------------------------------------------------

function getCompletedStudySections() {
  try {
    const saved = localStorage.getItem('sql_mastery_study_completed');
    if (saved) return new Set(JSON.parse(saved));
  } catch (e) {}
  return new Set();
}

function saveCompletedStudySections(completedSet) {
  try {
    localStorage.setItem('sql_mastery_study_completed', JSON.stringify([...completedSet]));
  } catch (e) {}
}

function markStudySectionCompleted(sectionId, silent = false) {
  const completed = getCompletedStudySections();
  if (!completed.has(sectionId)) {
    completed.add(sectionId);
    saveCompletedStudySections(completed);
    if (!silent && window.soundFX) {
      window.soundFX.playSuccess();
      window.soundFX.playChordChime();
      if (typeof window.soundFX.addXP === 'function') {
        window.soundFX.addXP(15, 'Chapter Mastered!');
      }
    }
    updateStudyMasteryUI();
    updateTopicButtonsMastery();

    const toggleBtn = document.getElementById('btnMasteryToggle_' + sectionId);
    if (toggleBtn) {
      toggleBtn.className = 'btn-toggle-mastery mastered';
      toggleBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Chapter Mastered`;
    }
  }
}

function toggleStudySectionCompletion(sectionId) {
  const completed = getCompletedStudySections();
  if (completed.has(sectionId)) {
    completed.delete(sectionId);
    if (window.soundFX) window.soundFX.playPop();
  } else {
    completed.add(sectionId);
    if (window.soundFX) {
      window.soundFX.playSuccess();
      window.soundFX.playChordChime();
      if (typeof window.soundFX.addXP === 'function') {
        window.soundFX.addXP(15, 'Chapter Mastered!');
      }
    }
  }
  saveCompletedStudySections(completed);
  updateStudyMasteryUI();
  updateTopicButtonsMastery();

  const toggleBtn = document.getElementById('btnMasteryToggle_' + sectionId);
  if (toggleBtn) {
    const isDone = completed.has(sectionId);
    toggleBtn.className = `btn-toggle-mastery ${isDone ? 'mastered' : ''}`;
    toggleBtn.innerHTML = isDone
      ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Chapter Mastered`
      : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg> Mark as Mastered (+15 XP)`;
  }
}

function updateStudyMasteryUI() {
  const completed = getCompletedStudySections();
  const total = (window.STUDY_LIBRARY || []).length || 7;
  const countEl = document.getElementById('studyMasteryCount');
  const barEl = document.getElementById('studyMasteryBar');
  if (countEl) countEl.textContent = `${completed.size} / ${total} Mastered`;
  if (barEl) barEl.style.width = `${Math.round((completed.size / total) * 100)}%`;
}

function updateTopicButtonsMastery() {
  const completed = getCompletedStudySections();
  document.querySelectorAll('.study-topic-btn').forEach(btn => {
    const secId = btn.getAttribute('data-secid');
    const badge = btn.querySelector('.mastery-badge');
    if (secId && badge) {
      if (completed.has(secId)) {
        badge.className = 'mastery-badge done';
        badge.textContent = '✓';
      } else {
        badge.className = 'mastery-badge pending';
        badge.textContent = '○';
      }
    }
  });
}

// ---------------------------------------------------------------------------
// INLINE FIX-IT SANDBOX ENGINE
// ---------------------------------------------------------------------------

function resetStudySandbox(sectionId) {
  const library = window.STUDY_LIBRARY;
  if (!library) return;
  const item = library.find(i => i.id === sectionId);
  if (!item || !item.sandbox) return;

  const textarea = document.getElementById('studySandboxTextarea_' + sectionId);
  if (textarea) textarea.value = item.sandbox.initialSql;

  const consoleEl = document.getElementById('studySandboxConsole_' + sectionId);
  if (consoleEl) consoleEl.classList.remove('show');

  if (window.soundFX) window.soundFX.playPop();
}

function loadStudySandboxSolution(sectionId) {
  const library = window.STUDY_LIBRARY;
  if (!library) return;
  const item = library.find(i => i.id === sectionId);
  if (!item || !item.sandbox) return;

  const textarea = document.getElementById('studySandboxTextarea_' + sectionId);
  if (textarea) textarea.value = item.sandbox.solutionSql;

  if (window.soundFX) window.soundFX.playPop();
}

function toggleStudySandboxHint(sectionId) {
  const hintEl = document.getElementById('studySandboxHint_' + sectionId);
  if (!hintEl) return;
  hintEl.classList.toggle('show');
  if (window.soundFX) window.soundFX.playPop();
}

function runStudySandboxFix(sectionId) {
  const library = window.STUDY_LIBRARY;
  if (!library) return;
  const item = library.find(i => i.id === sectionId);
  if (!item || !item.sandbox) return;

  const textarea = document.getElementById('studySandboxTextarea_' + sectionId);
  const consoleEl = document.getElementById('studySandboxConsole_' + sectionId);
  const bannerEl = document.getElementById('studyConsoleBanner_' + sectionId);
  const tablePreviewEl = document.getElementById('studySandboxTablePreview_' + sectionId);
  if (!textarea || !consoleEl || !bannerEl) return;

  const sql = textarea.value.trim();
  const clean = sql.replace(/\s+/g, ' ');

  let isSuccess = false;
  let errorMsg = '';
  let previewRows = [];
  let previewCols = [];

  if (sectionId === 'sec_execution_order') {
    if (/WHERE[\s\S]*projected_comp/i.test(sql)) {
      errorMsg = "Relational Pipeline Crash: 'projected_comp' is an alias evaluated in Step 05 (SELECT) and cannot be referenced in Step 02 (WHERE). Replace it with 'salary * 1.2 > 120000' or 'salary > 100000'.";
    } else if (/WHERE[\s\S]*salary/i.test(sql)) {
      isSuccess = true;
      const emps = DATABASE.Employees || [];
      previewCols = ['emp_id', 'first_name', 'salary', 'projected_comp'];
      previewRows = emps.filter(e => e.salary * 1.2 > 120000).map(e => ({
        emp_id: e.emp_id,
        first_name: e.first_name,
        salary: `$${e.salary.toLocaleString()}`,
        projected_comp: `$${Math.round(e.salary * 1.2).toLocaleString()}`
      }));
    } else {
      errorMsg = "Filter Missing: Please supply a valid WHERE condition that filters on salary without referencing the SELECT alias.";
    }
  } else if (sectionId === 'sec_foundations') {
    if (/=\s*NULL/i.test(sql)) {
      errorMsg = "3-Valued Logic Bug: '= NULL' yields UNKNOWN for every tuple in the relation. The query dropped all records! Use explicit conditions like department = 'Engineering' AND salary >= 100000 or IS NOT NULL.";
    } else if (/(?:IS\s+NOT\s+NULL|department\s*=\s*'Engineering'|salary\s*>=?\s*100000)/i.test(clean)) {
      isSuccess = true;
      const emps = DATABASE.Employees || [];
      previewCols = ['emp_id', 'first_name', 'department', 'salary'];
      previewRows = emps.filter(e => e.department === 'Engineering' && e.salary >= 100000).map(e => ({
        emp_id: e.emp_id,
        first_name: e.first_name,
        department: e.department,
        salary: `$${e.salary.toLocaleString()}`
      }));
    } else {
      errorMsg = "Ensure you filter for valid non-null records with department = 'Engineering' AND salary >= 100000.";
    }
  } else if (sectionId === 'sec_casewhen') {
    if (/WHEN\s+A\s*=\s*B[\s\S]+WHEN\s+A\s*\+\s*B\s*<=\s*C/i.test(sql)) {
      errorMsg = "Short-Circuit Waterfall Bug: The Equilateral/Isosceles checks executed first, falsely classifying invalid triangle (20, 20, 40) as Isosceles! Move the 'Not A Triangle' test to the top.";
    } else if (/WHEN\s+A\s*\+\s*B\s*<=\s*C[\s\S]+WHEN\s+A\s*=\s*B/i.test(sql)) {
      isSuccess = true;
      previewCols = ['A', 'B', 'C', 'triangle_type'];
      const tris = DATABASE.TRIANGLES || [];
      previewRows = tris.slice(0, 6).map(t => {
        let type = 'Scalene';
        if (t.A + t.B <= t.C || t.A + t.C <= t.B || t.B + t.C <= t.A) type = 'Not A Triangle';
        else if (t.A === t.B && t.B === t.C) type = 'Equilateral';
        else if (t.A === t.B || t.B === t.C || t.A === t.C) type = 'Isosceles';
        return { A: t.A, B: t.B, C: t.C, triangle_type: type };
      });
    } else {
      errorMsg = "Please verify the triangle inequality 'A + B <= C OR A + C <= B OR B + C <= A' is the first branch in the CASE statement.";
    }
  } else if (sectionId === 'sec_aggregations') {
    if (/SELECT[\s\S]+first_name[\s\S]+GROUP\s+BY/i.test(sql)) {
      errorMsg = "ONLY_FULL_GROUP_BY Violation: Column 'first_name' is not in the GROUP BY clause and has no aggregate function! Remove 'first_name' and aggregate with COUNT(*) and AVG(salary).";
    } else if (/GROUP\s+BY\s+department/i.test(sql) && !/first_name/i.test(sql)) {
      isSuccess = true;
      previewCols = ['department', 'team_size', 'avg_salary'];
      previewRows = [
        { department: 'Engineering', team_size: 3, avg_salary: '$133,333' },
        { department: 'Analytics', team_size: 4, avg_salary: '$98,250' },
        { department: 'Finance', team_size: 3, avg_salary: '$97,000' }
      ];
    } else {
      errorMsg = "Please group by department and compute aggregate summaries like COUNT(*) AS team_size and AVG(salary).";
    }
  } else if (sectionId === 'sec_joins') {
    if (/WHERE[\s\S]+(?:location|city|dept_name)/i.test(sql)) {
      errorMsg = "Outer Join Filter Trap: Putting 'd.location = ...' in WHERE discards all outer rows where d.location is NULL! Move AND d.location = 'San Francisco' into the ON clause.";
    } else if (/ON[\s\S]+(?:location|city|dept_name)/i.test(sql)) {
      isSuccess = true;
      previewCols = ['emp_id', 'first_name', 'dept_name', 'location'];
      previewRows = [
        { emp_id: 101, first_name: 'Ashley', dept_name: 'NULL', location: 'NULL' },
        { emp_id: 102, first_name: 'David', dept_name: 'Engineering', location: 'San Francisco' },
        { emp_id: 103, first_name: 'Julia', dept_name: 'NULL', location: 'NULL' },
        { emp_id: 105, first_name: 'Samantha', dept_name: 'Engineering', location: 'San Francisco' },
        { emp_id: 111, first_name: 'Lisa', dept_name: 'Engineering', location: 'San Francisco' }
      ];
    } else {
      errorMsg = "Ensure your right-table condition (e.g. d.location = 'San Francisco') is placed inside the ON clause of the LEFT JOIN.";
    }
  } else if (sectionId === 'sec_operators') {
    if (/NOT\s+IN[\s\S]+NULL/i.test(sql)) {
      errorMsg = "Fatal NOT IN (NULL) Trap: The query returns 0 rows because evaluating NOT IN with NULL produces UNKNOWN for every record! Remove NULL from the NOT IN list.";
    } else if (/NOT\s+IN/i.test(sql) && !/NULL/i.test(sql)) {
      isSuccess = true;
      const emps = DATABASE.Employees || [];
      previewCols = ['emp_id', 'first_name', 'salary'];
      previewRows = emps.filter(e => e.salary !== 62000 && e.salary !== 74000).slice(0, 5).map(e => ({
        emp_id: e.emp_id,
        first_name: e.first_name,
        salary: `$${e.salary.toLocaleString()}`
      }));
    } else {
      errorMsg = "Remove NULL from the NOT IN list so the condition evaluates to a valid boolean.";
    }
  } else if (sectionId === 'sec_interview_traps') {
    if (/ORDER\s+BY\s+department\s*(?:ASC)?\s*LIMIT/i.test(clean) && !/emp_id/i.test(sql)) {
      errorMsg = "Unstable Pagination Warning: 'department' contains multiple duplicate rows. Rows will shift between pages unpredictably! Append ', emp_id ASC' as a deterministic tie-breaker.";
    } else if (/ORDER\s+BY[\s\S]+emp_id/i.test(sql)) {
      isSuccess = true;
      const emps = [...(DATABASE.Employees || [])];
      emps.sort((a, b) => a.department.localeCompare(b.department) || a.emp_id - b.emp_id);
      previewCols = ['emp_id', 'first_name', 'department', 'salary'];
      previewRows = emps.slice(0, 5).map(e => ({
        emp_id: e.emp_id,
        first_name: e.first_name,
        department: e.department,
        salary: `$${e.salary.toLocaleString()}`
      }));
    } else {
      errorMsg = "Please include both department ASC and emp_id ASC in the ORDER BY clause.";
    }
  }

  consoleEl.classList.add('show');

  if (isSuccess) {
    if (window.soundFX) {
      window.soundFX.playSuccess();
      window.soundFX.playChordChime();
    }
    bannerEl.className = 'study-console-banner success';
    bannerEl.innerHTML = `<strong>✓ Fix Verified!</strong> Query passed physical engine inspection. Outputting ${previewRows.length} tuples.`;
    markStudySectionCompleted(sectionId);

    if (tablePreviewEl && previewRows.length > 0) {
      let tHtml = `
        <table>
          <thead>
            <tr>${previewCols.map(c => `<th>${c}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${previewRows.map(r => `
              <tr>${previewCols.map(c => `<td>${r[c] !== undefined ? r[c] : ''}</td>`).join('')}</tr>
            `).join('')}
          </tbody>
        </table>
      `;
      tablePreviewEl.innerHTML = tHtml;
    }
  } else {
    if (window.soundFX) window.soundFX.playError();
    bannerEl.className = 'study-console-banner error';
    bannerEl.innerHTML = `<strong>&cross; Architectural Pitfall:</strong> ${errorMsg}`;
    if (tablePreviewEl) tablePreviewEl.innerHTML = '';
  }
}

// ---------------------------------------------------------------------------
// CONCEPT CHECKPOINT QUIZ HANDLER
// ---------------------------------------------------------------------------

const answeredStudyQuizzes = new Set();

function handleStudyQuizAnswer(sectionId, selectedIdx) {
  const library = window.STUDY_LIBRARY;
  if (!library) return;
  const item = library.find(i => i.id === sectionId);
  if (!item || !item.quiz) return;

  const quizCard = document.getElementById(`studyQuiz_${sectionId}`);
  const feedback = document.getElementById(`studyQuizFeedback_${sectionId}`);
  if (!quizCard || !feedback) return;

  const buttons = quizCard.querySelectorAll('.study-quiz-option-btn');
  const isCorrect = selectedIdx === item.quiz.correctIndex;

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === item.quiz.correctIndex) {
      btn.classList.add('opt-correct');
    } else if (idx === selectedIdx && !isCorrect) {
      btn.classList.add('opt-wrong');
    }
  });

  if (isCorrect) {
    if (window.soundFX) {
      window.soundFX.playSuccess();
      window.soundFX.playChordChime();
    }
    if (!answeredStudyQuizzes.has(sectionId)) {
      answeredStudyQuizzes.add(sectionId);
      if (window.soundFX && typeof window.soundFX.addXP === 'function') {
        window.soundFX.addXP(10, 'Concept Mastery Checkpoint!');
      }
    }
    feedback.className = 'study-quiz-feedback show success';
    feedback.innerHTML = `<strong>&check; Spot On!</strong> ${item.quiz.explanation}`;
    markStudySectionCompleted(sectionId);
  } else {
    if (window.soundFX) {
      window.soundFX.playError();
    }
    feedback.className = 'study-quiz-feedback show fail';
    feedback.innerHTML = `<strong>&cross; Review Concept:</strong> ${item.quiz.explanation}`;
  }
}

// ---------------------------------------------------------------------------
// STUDY LIBRARY MAIN RENDERER
// ---------------------------------------------------------------------------

function renderStudyLibrary(targetId = null) {
  if (targetId) activeStudySectionId = targetId;

  const navContainer = document.getElementById('studyTopicsNav');
  const mainReader = document.getElementById('studyMainReader');
  if (!navContainer || !mainReader || !window.STUDY_LIBRARY) return;

  const library = window.STUDY_LIBRARY;
  const completedSections = getCompletedStudySections();

  // Update Mastery Tracker Gauge
  updateStudyMasteryUI();

  // Filter sections if searching
  const matchingSections = studySearchFilter
    ? library.filter(item => 
        item.title.toLowerCase().includes(studySearchFilter) ||
        item.summary.toLowerCase().includes(studySearchFilter) ||
        item.sections.some(s => s.heading.toLowerCase().includes(studySearchFilter) || s.content.toLowerCase().includes(studySearchFilter)) ||
        (item.gotchas && item.gotchas.some(g => g.toLowerCase().includes(studySearchFilter)))
      )
    : library;

  // Render Sidebar Topic Buttons with Mastery Badges
  let navHtml = '';
  library.forEach(item => {
    const isSelected = item.id === activeStudySectionId;
    const isMatch = matchingSections.some(m => m.id === item.id);
    const opacityStyle = studySearchFilter && !isMatch ? 'opacity: 0.35;' : '';
    const isDone = completedSections.has(item.id);

    navHtml += `
      <button class="study-topic-btn ${isSelected ? 'active' : ''}" style="${opacityStyle}" data-secid="${item.id}" onclick="selectStudySection('${item.id}')">
        <span style="display: flex; align-items: center; gap: 8px;">
          <span class="mastery-badge ${isDone ? 'done' : 'pending'}">${isDone ? '✓' : '○'}</span>
          <span>${item.icon}</span>
          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px;">${item.title.split('.')[1] || item.title}</span>
        </span>
        <span class="status-pill" style="font-size: 9px; padding: 1px 5px;">${item.readTime}</span>
      </button>
    `;
  });
  navContainer.innerHTML = navHtml;

  // Find active section to display
  const activeItem = library.find(i => i.id === activeStudySectionId) || library[0];
  if (!activeItem) return;

  let sectionsHtml = '';
  activeItem.sections.forEach(sec => {
    let formattedContent = sec.content
      .replace(/```sql([\s\S]*?)```/g, '<div class="study-code-snippet">$1</div>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n- /g, '<br>&bull; ');

    sectionsHtml += `
      <div class="study-section-block">
        <h3 class="study-section-heading">${sec.heading}</h3>
        <div class="study-section-content">
          <p>${formattedContent}</p>
        </div>
      </div>
    `;
  });

  let svgHtml = activeItem.svgDiagram ? `
    <div style="margin: 16px 0; background: #07070a; border: 1px solid var(--border-muted); border-radius: var(--radius-sm); padding: 10px; overflow-x: auto;">
      ${activeItem.svgDiagram}
    </div>
  ` : '';

  let diffHtml = '';
  if (activeItem.diff) {
    diffHtml = `
      <div style="margin: 22px 0 10px 0; font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #a4b7cf; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 8px;">
        <span>Visual Architecture Diff</span>
        <span style="color: var(--text-muted);">&bull;</span>
        <span style="color: #d69d8f;">Anti-Pattern</span>
        <span style="color: var(--text-muted);">vs</span>
        <span style="color: #9ec5ad;">Production Idiom</span>
      </div>
      <div class="sql-diff-grid">
        <div class="sql-diff-box diff-bad">
          <div class="sql-diff-header">
            <span>${activeItem.diff.badTitle}</span>
            <span style="font-size: 9px; opacity: 0.8; font-family: var(--font-sans);">DISCARD</span>
          </div>
          <div class="sql-diff-code">${escapeHtmlStudy(activeItem.diff.badSql)}</div>
          <div class="sql-diff-explanation">${activeItem.diff.badExplanation}</div>
        </div>
        <div class="sql-diff-box diff-good">
          <div class="sql-diff-header">
            <span>${activeItem.diff.goodTitle}</span>
            <span style="font-size: 9px; opacity: 0.8; font-family: var(--font-sans);">RECOMMENDED</span>
          </div>
          <div class="sql-diff-code">${escapeHtmlStudy(activeItem.diff.goodSql)}</div>
          <div class="sql-diff-explanation">${activeItem.diff.goodExplanation}</div>
        </div>
      </div>
    `;
  }

  let sandboxHtml = '';
  if (activeItem.sandbox) {
    const sb = activeItem.sandbox;
    sandboxHtml = `
      <div class="study-sandbox-card">
        <div class="study-sandbox-header">
          <div class="study-sandbox-title-row">
            <span class="clause-pill pill-where" style="font-size: 10px;">Interactive Fix-It Sandbox</span>
            <span class="study-sandbox-title">${sb.title}</span>
            <span class="status-pill" style="font-size: 9.5px; padding: 1px 6px;">Table: ${sb.table}</span>
          </div>
          <div class="study-sandbox-tools">
            <button class="study-sandbox-btn-sm" onclick="resetStudySandbox('${activeItem.id}')">Reset</button>
            <button class="study-sandbox-btn-sm" onclick="toggleStudySandboxHint('${activeItem.id}')">💡 Hint</button>
            <button class="study-sandbox-btn-sm" onclick="loadStudySandboxSolution('${activeItem.id}')">Solution</button>
          </div>
        </div>

        <p class="study-sandbox-instruction">${sb.instruction}</p>

        <div class="study-sandbox-hint-box" id="studySandboxHint_${activeItem.id}">
          <strong>💡 Architectural Hint:</strong> ${sb.hint}
        </div>

        <div class="study-sandbox-editor-wrapper">
          <textarea class="study-sandbox-textarea" id="studySandboxTextarea_${activeItem.id}" spellcheck="false">${sb.initialSql}</textarea>
        </div>

        <div class="study-sandbox-actions">
          <button class="btn-run-fix" onclick="runStudySandboxFix('${activeItem.id}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Run &amp; Test Fix
          </button>
          <span style="font-family: var(--font-mono); font-size: 10.5px; color: var(--text-muted);">Shortcut: <kbd style="background: #1a1a22; padding: 2px 5px; border-radius: 3px; border: 1px solid #333;">Ctrl + Enter</kbd></span>
        </div>

        <div class="study-sandbox-console" id="studySandboxConsole_${activeItem.id}">
          <div class="study-console-banner" id="studyConsoleBanner_${activeItem.id}"></div>
          <div class="study-sandbox-table-preview" id="studySandboxTablePreview_${activeItem.id}"></div>
        </div>
      </div>
    `;
  }

  let quizHtml = '';
  if (activeItem.quiz) {
    const q = activeItem.quiz;
    quizHtml = `
      <div class="study-quiz-card" id="studyQuiz_${activeItem.id}">
        <div class="study-quiz-badge-row">
          <span class="clause-pill pill-where" style="font-size: 10px;">Concept Mastery Checkpoint</span>
          <span style="font-family: var(--font-mono); font-size: 11px; color: #9ec5ad; font-weight: 600;">+10 XP Reward</span>
        </div>
        <div class="study-quiz-title">${q.question}</div>
        <div class="study-quiz-options-grid">
          ${q.options.map((opt, idx) => `
            <button class="study-quiz-option-btn" onclick="handleStudyQuizAnswer('${activeItem.id}', ${idx})">
              ${opt}
            </button>
          `).join('')}
        </div>
        <div class="study-quiz-feedback" id="studyQuizFeedback_${activeItem.id}"></div>
      </div>
    `;
  }

  let gotchasHtml = '';
  if (activeItem.gotchas && activeItem.gotchas.length > 0) {
    gotchasHtml = `
      <div class="study-gotchas-box">
        <div class="study-gotchas-title">⚡ CRITICAL PRODUCTION GOTCHAS &amp; INTERVIEW PITFALLS</div>
        <ul class="study-gotchas-list">
          ${activeItem.gotchas.map(g => `<li>${g}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  const isCurrentDone = completedSections.has(activeItem.id);

  mainReader.innerHTML = `
    <div class="study-header-banner">
      <div class="study-meta-row">
        <span class="clause-pill ${activeItem.badgeClass}">${activeItem.badge}</span>
        <span class="status-pill">${activeItem.readTime}</span>
      </div>
      <h1 class="study-title">${activeItem.title}</h1>
      <p class="study-summary-text">${activeItem.summary}</p>
    </div>

    ${svgHtml}
    ${sectionsHtml}
    ${diffHtml}
    ${sandboxHtml}
    ${quizHtml}
    ${gotchasHtml}

    <div class="study-actions-footer">
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <button class="btn-toggle-mastery ${isCurrentDone ? 'mastered' : ''}" id="btnMasteryToggle_${activeItem.id}" onclick="toggleStudySectionCompletion('${activeItem.id}')">
          ${isCurrentDone 
            ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Chapter Mastered` 
            : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg> Mark as Mastered (+15 XP)`
          }
        </button>

        ${activeItem.quickActions.labTrack ? `
          <button class="card-nav-btn" onclick="switchTrack('${activeItem.quickActions.labTrack}'); switchNavTab('viewGuidedLab');">
            🧪 Guided Lab &rarr;
          </button>
        ` : ''}
        ${activeItem.quickActions.questId !== undefined ? `
          <button class="card-nav-btn" onclick="setQuestIndex(${activeItem.quickActions.questId}); switchNavTab('viewQuests');">
            🎮 Quest Level &rarr;
          </button>
        ` : ''}
      </div>

      <button class="btn-solve-in-studio" onclick="switchToStudioWithQuery(\`${activeItem.quickActions.presetQuery.replace(/`/g, '\\`')}\`, 'Employees')">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        Simulate in Studio
      </button>
    </div>
  `;

  // Attach Ctrl+Enter in sandbox textarea
  const sandboxTextarea = document.getElementById('studySandboxTextarea_' + activeItem.id);
  if (sandboxTextarea) {
    sandboxTextarea.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runStudySandboxFix(activeItem.id);
      }
    });
  }
}

function selectStudySection(sectionId) {
  if (window.soundFX) window.soundFX.playPop();
  activeStudySectionId = sectionId;
  renderStudyLibrary(sectionId);
}

function switchNavTab(targetViewId) {
  if (window.soundFX) window.soundFX.playWhoosh();
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));

  const tab = document.querySelector(`.nav-tab[data-view="${targetViewId}"]`);
  const view = document.getElementById(targetViewId);
  if (tab) tab.classList.add('active');
  if (view) view.classList.add('active');
}

function switchToExplainerWithKeyword(keywordId) {
  switchNavTab('viewExplainer');

  const map = {
    'from': 'sec_execution_order',
    'where': 'sec_foundations',
    'casewhen': 'sec_casewhen',
    'aggregations': 'sec_aggregations',
    'join_inner': 'sec_joins',
    'join_left': 'sec_joins',
    'join_right': 'sec_joins',
    'join_full': 'sec_joins',
    'join_anti': 'sec_joins',
    'join_cross': 'sec_joins',
    'operators': 'sec_operators'
  };

  const targetSec = map[keywordId.toLowerCase()] || 'sec_execution_order';
  renderStudyLibrary(targetSec);
}

function switchToMcqsWithKeyword(keywordName) {
  // 1. Switch active nav tab
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));

  const mcqTab = document.querySelector('.nav-tab[data-view="viewMcqs"]');
  const mcqView = document.getElementById('viewMcqs');
  if (mcqTab) mcqTab.classList.add('active');
  if (mcqView) mcqView.classList.add('active');

  renderMcqs(keywordName);
}

let QuizState = {
  score: 0,
  answered: 0,
  total: 0
};
let activeMcqFilter = 'all';

function renderMcqs(filterKeyword = 'all') {
  activeMcqFilter = filterKeyword;
  const filterContainer = document.getElementById('mcqPillFilter');
  const container = document.getElementById('mcqCardsList');
  if (!container || !window.FOUNDATIONS_DATA) return;

  const allMcqs = window.FOUNDATIONS_DATA.mcqs || [];

  // 1. Render Filter Pills
  if (filterContainer) {
    const uniqueKeywords = ['all', ...new Set(allMcqs.map(m => m.keyword))];
    let pillsHtml = '';
    uniqueKeywords.forEach(k => {
      const isActive = k.toLowerCase() === activeMcqFilter.toLowerCase();
      const label = k === 'all' ? `All Questions (${allMcqs.length})` : k;
      pillsHtml += `
        <button class="kw-filter-pill ${isActive ? 'active' : ''}" data-filter="${k}">
          <span>${label}</span>
        </button>
      `;
    });
    filterContainer.innerHTML = pillsHtml;

    filterContainer.querySelectorAll('.kw-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        renderMcqs(btn.dataset.filter);
      });
    });
  }

  // 2. Filter Questions
  const filteredMcqs = activeMcqFilter === 'all'
    ? allMcqs
    : allMcqs.filter(m => m.keyword.toLowerCase().includes(activeMcqFilter.toLowerCase()) || activeMcqFilter.toLowerCase().includes(m.keyword.toLowerCase()));

  QuizState.total = allMcqs.length;
  document.getElementById('quizTotalCount').textContent = QuizState.total;
  document.getElementById('quizScoreCount').textContent = QuizState.score;

  let html = '';

  filteredMcqs.forEach((mcq, idx) => {
    html += `
      <div class="mcq-card" id="card_${mcq.id}">
        <div class="mcq-meta-row">
          <span class="mcq-keyword-tag">${mcq.keyword}</span>
          <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-muted);">Question ${idx + 1} of ${filteredMcqs.length}</span>
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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderCaseStudies(
  industryFilter = currentCaseIndustryFilter,
  sectionFilter = currentCaseSectionFilter,
  diffFilter = currentCaseDiffFilter,
  sortOrder = currentCaseSortOrder
) {
  currentCaseIndustryFilter = industryFilter;
  currentCaseSectionFilter = sectionFilter;
  currentCaseDiffFilter = diffFilter;
  currentCaseSortOrder = sortOrder;

  const container = document.getElementById('caseStudiesGrid');
  const countBadge = document.getElementById('caseCountBadge');
  const solvedCountSpan = document.getElementById('casesSolvedCount');
  if (!container) return;

  let allCases = window.ALL_500_CASE_STUDIES || window.ALL_300_CASE_STUDIES || [];
  let cases = allCases.slice();

  // 1. Filter by Section
  if (currentCaseSectionFilter !== 'all') {
    cases = cases.filter(cs => cs.section && (
      cs.section.toLowerCase() === currentCaseSectionFilter.toLowerCase() || 
      cs.section.toLowerCase().includes(currentCaseSectionFilter.toLowerCase())
    ));
  }

  // 2. Filter by Industry
  if (currentCaseIndustryFilter !== 'all') {
    cases = cases.filter(cs => cs.industry && (
      cs.industry.toLowerCase() === currentCaseIndustryFilter.toLowerCase() || 
      cs.industry.toLowerCase().includes(currentCaseIndustryFilter.toLowerCase())
    ));
  }

  // 3. Filter by Difficulty
  if (currentCaseDiffFilter !== 'all') {
    cases = cases.filter(cs => cs.difficulty && cs.difficulty.toLowerCase() === currentCaseDiffFilter.toLowerCase());
  }

  // 4. Search Filter
  if (currentCaseSearchQuery) {
    const q = currentCaseSearchQuery.toLowerCase();
    cases = cases.filter(cs => 
      cs.title.toLowerCase().includes(q) ||
      cs.scenario.toLowerCase().includes(q) ||
      (cs.businessObjective && cs.businessObjective.toLowerCase().includes(q)) ||
      (cs.schemaSnippet && cs.schemaSnippet.toLowerCase().includes(q)) ||
      (cs.targetQuery && cs.targetQuery.toLowerCase().includes(q))
    );
  }

  // 5. Sort Cases (Progressive Difficulty Order)
  const diffRank = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
  if (currentCaseSortOrder === 'diff_asc') {
    cases.sort((a, b) => {
      const rA = diffRank[a.difficulty] || 2;
      const rB = diffRank[b.difficulty] || 2;
      if (rA !== rB) return rA - rB;
      return a.id - b.id;
    });
  } else if (currentCaseSortOrder === 'diff_desc') {
    cases.sort((a, b) => {
      const rA = diffRank[a.difficulty] || 2;
      const rB = diffRank[b.difficulty] || 2;
      if (rA !== rB) return rB - rA;
      return a.id - b.id;
    });
  } else if (currentCaseSortOrder === 'id_asc') {
    cases.sort((a, b) => a.id - b.id);
  }

  if (countBadge) {
    countBadge.textContent = `${cases.length} of ${allCases.length} Cases`;
  }
  if (solvedCountSpan && window.CASE_BLANKS_ENGINE) {
    solvedCountSpan.textContent = window.CASE_BLANKS_ENGINE.getSolvedCount();
  }

  if (cases.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted);">
        <p style="font-size: 14px; margin-bottom: 8px;">No case studies match current filters.</p>
        <button class="card-nav-btn" onclick="currentCaseSearchQuery = ''; currentCaseDiffFilter = 'all'; currentCaseIndustryFilter = 'all'; currentCaseSectionFilter = 'all'; renderCaseStudies();">Reset All Filters</button>
      </div>
    `;
    return;
  }

  let html = '';
  const totalMatching = cases.length;
  const visibleCases = cases.slice(0, currentCaseDisplayLimit);

  visibleCases.forEach(cs => {
    const isSolved = window.CASE_BLANKS_ENGINE && window.CASE_BLANKS_ENGINE.isSolved(cs.id);
    const challenge = window.CASE_BLANKS_ENGINE ? window.CASE_BLANKS_ENGINE.createChallenge(cs) : null;

    const diffClass = cs.difficulty === 'Easy' ? 'diff-pill-easy' : (cs.difficulty === 'Medium' ? 'diff-pill-medium' : 'diff-pill-hard');
    const diffEmoji = cs.difficulty === 'Easy' ? '🟢' : (cs.difficulty === 'Medium' ? '🟡' : '🔴');

    let queryBlockHtml = '';
    if (currentCaseMode === 'study' || !challenge) {
      const highlighted = window.CASE_DOSSIER_ENGINE ? window.CASE_DOSSIER_ENGINE.highlightSQL(cs.targetQuery) : escapeHtml(cs.targetQuery);
      queryBlockHtml = `
        <div class="case-code-preview">
          <code>${highlighted}</code>
        </div>
      `;
    } else {
      let renderedMasked = escapeHtml(challenge.maskedQuery);
      for (const [slotId, slotInfo] of Object.entries(challenge.slots)) {
        let optionsHtml = `<option value="">[ Select Clause ]</option>`;
        slotInfo.options.forEach(opt => {
          optionsHtml += `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`;
        });
        const selectHtml = `<select class="slot-select" data-case-id="${cs.id}" data-slot-id="${slotId}">${optionsHtml}</select>`;
        renderedMasked = renderedMasked.replace(`[[${slotId}]]`, selectHtml);
      }

      queryBlockHtml = `
        <div class="case-challenge-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 10px; font-family: var(--font-mono); color: #dfcaa9; font-weight: 700; text-transform: uppercase;">🧩 Missing Keyword Challenge</span>
            ${isSolved ? '<span class="status-pill" style="font-size: 9.5px; color: #4ade80; border-color: rgba(74,222,128,0.3);">✓ Solved (+15 XP)</span>' : '<span style="font-size: 10px; color: var(--text-muted);">Fill in all missing slots</span>'}
          </div>
          <div class="challenge-query-rendered">
            ${renderedMasked}
          </div>
          <div class="challenge-feedback-box" id="feedback_${cs.id}" style="display: none;"></div>
        </div>
      `;
    }

    html += `
      <div class="case-card ${isSolved ? 'case-solved' : ''}" id="case_card_${cs.id}">
        <div class="case-card-header">
          <div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; flex-wrap: wrap;">
              <span class="status-pill" style="font-size: 10px; padding: 1px 6px;">#${cs.id < 10 ? '00' + cs.id : (cs.id < 100 ? '0' + cs.id : cs.id)}</span>
              <span class="case-diff-filter-btn ${diffClass} active" style="font-size: 9.5px; padding: 1px 7px;">${diffEmoji} ${cs.difficulty}</span>
              <span class="case-industry">${cs.industry}</span>
              ${isSolved ? '<span style="font-size: 11px;" title="Solved!">🏆</span>' : ''}
            </div>
            <h3 class="case-title" style="cursor: pointer;" onclick="openCaseDossier(${cs.id})" title="Click to open full case study dossier">${cs.title}</h3>
          </div>
          <span class="clause-pill pill-group" style="font-size: 9px; padding: 1px 6px;">${cs.section ? cs.section.split(':')[0] : 'Section'}</span>
        </div>

        ${window.isEli5ModeActive && window.CASE_DOSSIER_ENGINE ? `
          <div class="eli5-story-box">
            ${window.CASE_DOSSIER_ENGINE.getEli5Story(cs)}
          </div>
        ` : `
          <p class="case-scenario-text">${cs.scenario}</p>
        `}

        ${window.DOMAIN_ERD_ENGINE ? window.DOMAIN_ERD_ENGINE.renderMiniERD(cs) : `
          <div style="font-family: var(--font-mono); font-size: 10.5px; color: var(--text-muted); margin-bottom: 6px;">
            Schema: <code>${cs.schemaSnippet}</code>
          </div>
        `}

        <div class="case-objective-box">
          <strong>Objective [Goal]:</strong> ${cs.businessObjective}
        </div>

        ${queryBlockHtml}

        <div class="case-card-actions" style="display: flex; gap: 8px; justify-content: space-between; align-items: center; margin-top: 8px; flex-wrap: wrap;">
          <button class="btn-open-dossier" data-case-id="${cs.id}">
            📖 Deep Dossier
          </button>
          <button class="btn-toggle-sim" data-case-id="${cs.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            Live Simulator (5 Rows)
          </button>
          <div style="display: flex; gap: 8px; align-items: center;">
            ${currentCaseMode === 'challenge' && challenge ? `
              <button class="btn-check-slots" data-case-id="${cs.id}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Verify
              </button>
            ` : ''}
            <button class="btn-solve-in-studio" data-table="${cs.table}" data-query="${encodeURIComponent(cs.targetQuery)}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Studio
            </button>
          </div>
        </div>

        <!-- In-Card Live Data Simulator Collapsible Drawer -->
        <div class="live-sim-drawer" id="sim_drawer_${cs.id}" style="display: none;"></div>
      </div>
    `;
  });

  if (totalMatching > currentCaseDisplayLimit) {
    html += `
      <div style="grid-column: 1 / -1; display: flex; justify-content: center; gap: 12px; padding: 24px 10px; align-items: center; flex-wrap: wrap;">
        <button class="btn-solve-in-studio" id="btnLoadMoreCases" style="padding: 10px 24px; font-size: 13px; font-weight: 700;">
          ⬇️ Load Next 30 Cases (${Math.min(currentCaseDisplayLimit, totalMatching)} of ${totalMatching} Shown)
        </button>
        <button class="card-nav-btn" id="btnLoadAllCases" style="padding: 10px 18px; font-size: 12px;">
          ⚡ Load All ${totalMatching} Cases
        </button>
      </div>
    `;
  }

  container.innerHTML = html;

  const btnMore = container.querySelector('#btnLoadMoreCases');
  if (btnMore) {
    btnMore.addEventListener('click', () => {
      currentCaseDisplayLimit += 30;
      renderCaseStudies();
    });
  }
  const btnAll = container.querySelector('#btnLoadAllCases');
  if (btnAll) {
    btnAll.addEventListener('click', () => {
      currentCaseDisplayLimit = totalMatching;
      renderCaseStudies();
    });
  }

  // Event Listeners for Open Domain ERD Diagram
  container.querySelectorAll('.btn-open-domain-erd').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dom = btn.dataset.domain;
      const tbl = btn.dataset.table;
      if (window.DOMAIN_ERD_ENGINE) {
        window.DOMAIN_ERD_ENGINE.openDomainERD(dom, tbl);
      }
    });
  });

  // Event Listeners for Open Deep Dossier
  container.querySelectorAll('.btn-open-dossier').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = parseInt(btn.dataset.caseId, 10);
      openCaseDossier(cid);
    });
  });

  // Event Listeners for Live Data Simulator Drawer Toggle
  container.querySelectorAll('.btn-toggle-sim').forEach(btn => {
    btn.addEventListener('click', () => {
      const caseId = parseInt(btn.dataset.caseId, 10);
      const cs = (window.ALL_500_CASE_STUDIES || window.ALL_300_CASE_STUDIES || []).find(c => c.id === caseId);
      const drawer = document.getElementById(`sim_drawer_${caseId}`);
      if (!drawer || !cs || !window.CASE_SIMULATOR_ENGINE) return;

      if (drawer.style.display === 'block') {
        drawer.style.display = 'none';
        btn.classList.remove('active');
      } else {
        if (window.soundFX) window.soundFX.playPop();
        drawer.style.display = 'block';
        btn.classList.add('active');

        // Run Zero-Latency Simulation
        const sim = window.CASE_SIMULATOR_ENGINE.runSimulation(cs);
        const colNames = Object.keys(sim.rawRows[0] || {});

        let rawRowsHtml = '';
        sim.evalResults.forEach((res, rIdx) => {
          const rowClass = res.passed ? 'sim-row-match' : 'sim-row-dropped';
          const tagHtml = res.passed 
            ? `<span class="sim-tag-match">&check; MATCH</span>` 
            : `<span class="sim-tag-dropped">&cross; DROPPED</span><span class="sim-reason-tag">${escapeHtml(res.reason)}</span>`;
          
          let cellsHtml = `<td>${rIdx + 1}</td><td>${tagHtml}</td>`;
          colNames.forEach(col => {
            const val = res.row[col];
            cellsHtml += `<td>${val !== undefined && val !== null ? escapeHtml(val) : '<em>NULL</em>'}</td>`;
          });

          rawRowsHtml += `<tr class="${rowClass}">${cellsHtml}</tr>`;
        });

        // Stage 2: Projected Output Rows
        let outputRowsHtml = '';
        if (sim.outputRows.length === 0) {
          outputRowsHtml = `<tr><td colspan="${colNames.length + 1}" style="text-align: center; color: var(--text-muted); padding: 12px;">0 rows survived predicate filter.</td></tr>`;
        } else {
          sim.outputRows.forEach((row, oIdx) => {
            let cellsHtml = `<td>${oIdx + 1}</td>`;
            colNames.forEach(col => {
              const val = row[col];
              cellsHtml += `<td>${val !== undefined && val !== null ? escapeHtml(val) : '<em>NULL</em>'}</td>`;
            });
            outputRowsHtml += `<tr class="sim-row-match">${cellsHtml}</tr>`;
          });
        }

        drawer.innerHTML = `
          <div class="sim-header-bar">
            <div class="sim-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Live Relational Data Simulator (5-Row Disk Buffer)
            </div>
            <div class="sim-metrics">
              <span class="sim-metric-pill">Read: <strong>${sim.stats.diskRowsScanned} rows</strong></span>
              <span class="sim-metric-pill">Passed: <strong>${sim.stats.outputRowsCount} rows</strong></span>
              <span class="sim-metric-pill">Latency: <strong>${sim.stats.executionTimeMs}ms</strong></span>
            </div>
          </div>

          <div class="sim-stage-box">
            <div class="sim-stage-title">
              <span>📥 STAGE 1: Scanning Raw Disk Rows (Filter Predicate Evaluation)</span>
            </div>
            <div class="sim-table-wrap">
              <table class="sim-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Filter Evaluation</th>
                    ${colNames.map(c => `<th>${escapeHtml(c)}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${rawRowsHtml}
                </tbody>
              </table>
            </div>
          </div>

          <div class="sim-stage-box" style="margin-bottom: 0;">
            <div class="sim-stage-title">
              <span>📤 STAGE 2: Projected &amp; Ordered Output Stream (Client Result)</span>
            </div>
            <div class="sim-table-wrap">
              <table class="sim-table">
                <thead>
                  <tr>
                    <th>#</th>
                    ${colNames.map(c => `<th>${escapeHtml(c)}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${outputRowsHtml}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }
    });
  });

  // Event Listeners for Solve in Studio
  container.querySelectorAll('.btn-solve-in-studio').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = decodeURIComponent(btn.dataset.query);
      const tbl = btn.dataset.table;
      switchToStudioWithQuery(q, tbl);
    });
  });

  // Event Listeners for Check Solution
  container.querySelectorAll('.btn-check-slots').forEach(btn => {
    btn.addEventListener('click', () => {
      const caseId = parseInt(btn.dataset.caseId, 10);
      const cs = (window.ALL_500_CASE_STUDIES || window.ALL_300_CASE_STUDIES || []).find(c => c.id === caseId);
      if (!cs || !window.CASE_BLANKS_ENGINE) return;

      const card = document.getElementById(`case_card_${caseId}`);
      if (!card) return;

      const userAnswers = {};
      card.querySelectorAll('.slot-select').forEach(sel => {
        userAnswers[sel.dataset.slotId] = sel.value;
      });

      const verification = window.CASE_BLANKS_ENGINE.verifyChallenge(cs, userAnswers);
      const feedbackDiv = document.getElementById(`feedback_${caseId}`);

      for (const [slotId, res] of Object.entries(verification.results || {})) {
        const sel = card.querySelector(`.slot-select[data-slot-id="${slotId}"]`);
        if (sel) {
          if (res.isCorrect) {
            sel.classList.add('slot-correct');
            sel.classList.remove('slot-incorrect');
          } else {
            sel.classList.add('slot-incorrect');
            sel.classList.remove('slot-correct');
          }
        }
      }

      if (feedbackDiv) {
        feedbackDiv.style.display = 'block';
        feedbackDiv.className = `challenge-feedback-box ${verification.isCorrect ? 'correct' : 'incorrect'}`;
        feedbackDiv.innerHTML = verification.explanation;
      }

      if (verification.isCorrect) {
        card.classList.add('case-solved');
        if (solvedCountSpan) {
          solvedCountSpan.textContent = window.CASE_BLANKS_ENGINE.getSolvedCount();
        }
      }
    });
  });
}

function openCaseDossier(caseId) {
  const allCases = window.ALL_500_CASE_STUDIES || window.ALL_300_CASE_STUDIES || [];
  const cs = allCases.find(c => c.id === caseId);
  if (!cs || !window.CASE_DOSSIER_ENGINE) return;

  activeDossierCaseId = caseId;
  const dossier = window.CASE_DOSSIER_ENGINE.getDossier(cs);

  const modal = document.getElementById('caseStudyDetailModal');
  const body = document.getElementById('caseDossierBody');
  const badgeId = document.getElementById('dossierCaseIdBadge');
  const badgeDiff = document.getElementById('dossierDifficultyBadge');
  const badgeInd = document.getElementById('dossierIndustryBadge');
  const badgeSec = document.getElementById('dossierSectionBadge');

  if (!modal || !body) return;

  if (window.soundFX) window.soundFX.playPop();

  // Badges
  if (badgeId) badgeId.textContent = `#${cs.id < 10 ? '00' + cs.id : (cs.id < 100 ? '0' + cs.id : cs.id)}`;
  if (badgeDiff) {
    badgeDiff.innerHTML = dossier.diffMeta.label;
    badgeDiff.style.borderColor = dossier.diffMeta.border;
    badgeDiff.style.color = dossier.diffMeta.badge;
    badgeDiff.style.background = dossier.diffMeta.bg;
  }
  if (badgeInd) badgeInd.textContent = cs.industry;
  if (badgeSec) badgeSec.textContent = cs.section ? cs.section.split(':')[0] : 'Section';

  // Section 1: Executive Incident Brief & Everyday Analogy
  const incidentHtml = `
    <div class="dossier-incident-card">
      <div class="dossier-section-title" style="color: #818cf8;">
        <span>🚨 REAL-WORLD BUSINESS SCENARIO &amp; EVERYDAY ANALOGY</span>
      </div>
      <h2 style="font-size: 18px; color: #fff; margin: 0 0 8px 0;">${escapeHtml(cs.title)}</h2>
      <div class="eli5-story-box" style="margin-bottom: 12px;">
        ${dossier.eli5Story}
      </div>
      <div class="dossier-objective-callout">
        <strong>Business Goal [What you need to solve]:</strong> ${escapeHtml(cs.businessObjective)}
      </div>
    </div>
  `;

  // Beginner Translation Cheat-Sheet Box
  const beginnerCheatSheetHtml = `
    <div class="dossier-beginner-guide">
      <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: #38bdf8; font-size: 11.5px; margin-bottom: 8px; font-family: var(--font-mono);">
        <span>🐣 BEGINNER CHEAT-SHEET [WHAT EACH SQL KEYWORD MEANS]</span>
      </div>
      <div class="dossier-beginner-guide-grid">
        <div><span style="color: #38bdf8; font-weight: 800;">SELECT</span> = "Show these columns"</div>
        <div><span style="color: #c084fc; font-weight: 800;">FROM</span> = "Look in this table"</div>
        <div><span style="color: #34d399; font-weight: 800;">WHERE</span> = "Filter rule [must be true]"</div>
        <div><span style="color: #10b981; font-weight: 800;">AND</span> = "Both conditions must be true"</div>
        <div><span style="color: #fb923c; font-weight: 800;">OR</span> = "Either condition can be true"</div>
        <div><span style="color: #fbbf24; font-weight: 800;">ORDER BY</span> = "Sort rows (ASC / DESC)"</div>
        <div><span style="color: #f472b6; font-weight: 800;">LIMIT</span> = "Stop after N rows"</div>
      </div>
    </div>
  `;

  // Section 2: Visual ERD & Storage Performance
  const schemaHtml = `
    <div class="dossier-schema-card">
      <div class="dossier-section-title" style="color: #2dd4bf;">
        <span>🏗️ TABLE STRUCTURE &amp; DOMAIN ERD</span>
      </div>
      
      ${window.DOMAIN_ERD_ENGINE ? window.DOMAIN_ERD_ENGINE.renderMiniERD(cs) : `
        <div class="dossier-schema-code">Table: ${escapeHtml(cs.table)} | Columns: ${escapeHtml(cs.schemaSnippet)}</div>
      `}

      <p style="font-size: 12px; color: var(--text-secondary); margin: 8px 0 0 0; line-height: 1.6;">
        <strong>How the database works under the hood:</strong> Tables store rows on hard disk pages [blocks of computer storage]. 
        Adding a <strong>B-Tree Index</strong> [like an alphabetical index at the back of a textbook] allows the database to locate rows in <span style="color: #2dd4bf; font-weight: 700;">O(log N) [under 1 millisecond]</span> instead of doing a <strong>Full Table Scan</strong> [slowly reading every single row on disk one by one].
      </p>
    </div>
  `;

  // Section 3: Line-by-Line SQL Deconstruction with Full-Spectrum Interactive Highlighting
  let breakdownRowsHtml = '';
  dossier.queryBreakdown.forEach((item, idx) => {
    breakdownRowsHtml += `
      <div class="breakdown-row">
        <div class="breakdown-code-line">
          <span class="breakdown-tag" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
            Step ${idx + 1}: ${item.clauseType}
          </span>
          <span class="breakdown-sql-text"><code>${item.highlightedLine}</code></span>
        </div>
        <div class="breakdown-tag-meaning" style="color: #67e8f9;">
          📌 ${escapeHtml(item.plainMeaning)}
        </div>
      </div>
    `;
  });

  const breakdownHtml = `
    <div class="dossier-breakdown-card">
      <div class="dossier-section-title" style="color: #dfcaa9;">
        <span>🔍 LINE-BY-LINE SQL EXPLANATION [HOVER OVER KEYWORDS]</span>
      </div>
      <div>
        ${breakdownRowsHtml}
      </div>
    </div>
  `;

  // Section 4: Interview Pitfalls & Mnemonic Hazard Box (with bracketed titles)
  let pitfallsListHtml = '';
  dossier.pitfalls.forEach(p => {
    pitfallsListHtml += `
      <div class="pitfall-item" style="margin-bottom: 10px; background: rgba(251, 146, 60, 0.06); border-left: 3px solid #fb923c; padding: 10px 14px; border-radius: 0 4px 4px 0;">
        <div class="pitfall-title" style="color: #fb923c; font-weight: 700; font-size: 12.5px; margin-bottom: 4px;">${p.title}</div>
        <div class="pitfall-rule" style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${p.explanation}</div>
      </div>
    `;
  });

  const pitfallsHtml = `
    <div class="dossier-pitfalls-card">
      <div class="dossier-section-title" style="color: #fb923c;">
        <span>⚠️ PRODUCTION TRAPS &amp; INTERVIEW GOTCHAS [EXPLAINED SIMPLY]</span>
      </div>
      <div>
        ${pitfallsListHtml}
      </div>
    </div>
  `;

  // Section 5: In-Dossier Live Data Simulator (5-Row Scan)
  let simulatorHtml = '';
  if (window.CASE_SIMULATOR_ENGINE) {
    try {
      const sim = window.CASE_SIMULATOR_ENGINE.runSimulation(cs);
      const colNames = Object.keys(sim.rawRows[0] || {});

      let rawRowsHtml = '';
      sim.evalResults.forEach((res, rIdx) => {
        const rowClass = res.passed ? 'sim-row-match' : 'sim-row-dropped';
        const tagHtml = res.passed 
          ? `<span class="sim-tag-match">&check; MATCH</span>` 
          : `<span class="sim-tag-dropped">&cross; DROPPED</span><span class="sim-reason-tag">${escapeHtml(res.reason)}</span>`;
        
        let cellsHtml = `<td>${rIdx + 1}</td><td>${tagHtml}</td>`;
        colNames.forEach(col => {
          const val = res.row[col];
          cellsHtml += `<td>${val !== undefined && val !== null ? escapeHtml(val) : '<em>NULL</em>'}</td>`;
        });

        rawRowsHtml += `<tr class="${rowClass}">${cellsHtml}</tr>`;
      });

      let outputRowsHtml = '';
      if (sim.outputRows.length === 0) {
        outputRowsHtml = `<tr><td colspan="${colNames.length + 1}" style="text-align: center; color: var(--text-muted); padding: 12px;">0 rows survived predicate filter.</td></tr>`;
      } else {
        sim.outputRows.forEach((row, oIdx) => {
          let cellsHtml = `<td>${oIdx + 1}</td>`;
          colNames.forEach(col => {
            const val = row[col];
            cellsHtml += `<td>${val !== undefined && val !== null ? escapeHtml(val) : '<em>NULL</em>'}</td>`;
          });
          outputRowsHtml += `<tr class="sim-row-match">${cellsHtml}</tr>`;
        });
      }

      simulatorHtml = `
        <div class="live-sim-drawer" id="dossierSimDrawer" style="margin-top: 0;">
          <div class="sim-header-bar">
            <div class="sim-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              ⚡ Real-Time In-Memory Relational Simulator (5 Disk Rows Tested)
            </div>
            <div class="sim-metrics">
              <span class="sim-metric-pill">Read: <strong>${sim.stats.diskRowsScanned} rows</strong></span>
              <span class="sim-metric-pill">Passed: <strong>${sim.stats.outputRowsCount} rows</strong></span>
              <span class="sim-metric-pill">Latency: <strong>${sim.stats.executionTimeMs}ms</strong></span>
            </div>
          </div>

          <div class="sim-stage-box">
            <div class="sim-stage-title">
              <span>STAGE 1: Row Predicate Filter Verification</span>
            </div>
            <div class="sim-table-wrap">
              <table class="sim-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Filter Evaluation</th>
                    ${colNames.map(c => `<th>${escapeHtml(c)}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${rawRowsHtml}
                </tbody>
              </table>
            </div>
          </div>

          <div class="sim-stage-box" style="margin-bottom: 0;">
            <div class="sim-stage-title">
              <span>STAGE 2: Final Projected Output Stream</span>
            </div>
            <div class="sim-table-wrap">
              <table class="sim-table">
                <thead>
                  <tr>
                    <th>#</th>
                    ${colNames.map(c => `<th>${escapeHtml(c)}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${outputRowsHtml}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    } catch(err) {
      console.warn('Simulation skipped in dossier:', err);
    }
  }

  body.innerHTML = incidentHtml + beginnerCheatSheetHtml + schemaHtml + breakdownHtml + pitfallsHtml + simulatorHtml;
  modal.style.display = 'flex';
}

window.openCaseDossier = openCaseDossier;

function closeCaseDossier() {
  const modal = document.getElementById('caseStudyDetailModal');
  if (modal) modal.style.display = 'none';
}

window.closeCaseDossier = closeCaseDossier;

function navigateDossierPrev() {
  const allCases = window.ALL_500_CASE_STUDIES || window.ALL_300_CASE_STUDIES || [];
  const currentIdx = allCases.findIndex(c => c.id === activeDossierCaseId);
  if (currentIdx > 0) {
    openCaseDossier(allCases[currentIdx - 1].id);
  } else {
    openCaseDossier(allCases[allCases.length - 1].id);
  }
}

function navigateDossierNext() {
  const allCases = window.ALL_500_CASE_STUDIES || window.ALL_300_CASE_STUDIES || [];
  const currentIdx = allCases.findIndex(c => c.id === activeDossierCaseId);
  if (currentIdx < allCases.length - 1) {
    openCaseDossier(allCases[currentIdx + 1].id);
  } else {
    openCaseDossier(allCases[0].id);
  }
}

function toggleDossierSimulator() {
  const drawer = document.getElementById('dossierSimDrawer');
  if (drawer) {
    drawer.style.display = (drawer.style.display === 'none') ? 'block' : 'none';
  }
}

// =============================================================================
// ENTERPRISE PRODUCTION ERD EXPLORER CONTROLLER
// =============================================================================

let currentErdCompany = 'stripe';
let currentErdSelectedTable = 'CUSTOMERS';

function initEnterpriseERD(companyKey = currentErdCompany) {
  currentErdCompany = companyKey;
  const companyData = (window.ENTERPRISE_ERD_DATA && window.ENTERPRISE_ERD_DATA[companyKey]) 
    ? window.ENTERPRISE_ERD_DATA[companyKey] 
    : (window.ENTERPRISE_ERD_DATA ? window.ENTERPRISE_ERD_DATA.stripe : null);
  
  if (!companyData) return;

  // Verify selected table belongs to this company
  if (!companyData.tables.some(t => t.name === currentErdSelectedTable)) {
    currentErdSelectedTable = companyData.tables[0].name;
  }

  const visualBoard = document.getElementById('erdVisualBoard');
  const inspector = document.getElementById('erdTableInspector');
  if (!visualBoard || !inspector) return;

  // 1. Architecture Topology Header & Banner
  const bannerHtml = `
    <div class="erd-company-banner" style="grid-column: 1 / -1;">
      <div class="erd-company-info">
        <div class="erd-company-icon">${companyData.icon || '🏢'}</div>
        <div>
          <h3 class="erd-company-title">
            ${companyData.companyName} Architecture Schema
            <span class="erd-company-domain">${companyData.domain}</span>
          </h3>
          <p class="erd-company-desc">${companyData.description}</p>
        </div>
      </div>
      <div style="display: flex; gap: 8px; align-items: center;">
        <span class="status-pill" style="font-size: 11px; color: #9ec5ad; border-color: rgba(158,197,173,0.3);">
          ⚡ 5 Interconnected Production Tables
        </span>
      </div>
    </div>

    <!-- ERD Legend Bar -->
    <div class="erd-legend-bar" style="grid-column: 1 / -1;">
      <span style="color: var(--text-primary); font-weight: 700; margin-right: 6px;">DIAGRAM LEGEND:</span>
      <div class="erd-legend-item">
        <span class="erd-pk-badge">PK</span>
        <span>Primary Key (Unique Clustered Index)</span>
      </div>
      <div class="erd-legend-item">
        <span class="erd-fk-badge">FK</span>
        <span>Foreign Key (Relational Constraint)</span>
      </div>
      <div class="erd-legend-item">
        <span class="erd-cardinality-badge">1 : N</span>
        <span>One-to-Many Relationship (Crow's Foot)</span>
      </div>
      <div class="erd-legend-item">
        <span class="erd-cardinality-badge">1 : 1</span>
        <span>One-to-One Identity Mapping</span>
      </div>
    </div>
  `;

  // 2. Render 5 Entity Cards
  let entityCardsHtml = '';
  companyData.tables.forEach(tbl => {
    const isSelected = tbl.name === currentErdSelectedTable;
    let colsHtml = '';

    tbl.columns.forEach(col => {
      let badgeHtml = '<span style="color: var(--text-muted); font-size: 10px;">&bull;</span>';
      if (col.isPk) badgeHtml = '<span class="erd-pk-badge">PK</span>';
      else if (col.isFk) badgeHtml = '<span class="erd-fk-badge">FK</span>';

      colsHtml += `
        <div class="erd-col-row" title="${escapeHtml(col.desc || '')}">
          <div class="erd-col-left">
            ${badgeHtml}
            <span class="erd-col-name">${escapeHtml(col.name)}</span>
          </div>
          <span class="erd-col-type">${escapeHtml(col.type)}</span>
        </div>
      `;
    });

    entityCardsHtml += `
      <div class="erd-entity-card ${isSelected ? 'selected' : ''}" data-table="${tbl.name}">
        <div class="erd-entity-header">
          <div>
            <div class="erd-table-name">${escapeHtml(tbl.name)}</div>
            <div class="erd-table-caption">${escapeHtml(tbl.caption)}</div>
          </div>
          <span class="erd-rows-badge">${tbl.sampleRows ? tbl.sampleRows.length : 0} rows</span>
        </div>
        <div class="erd-entity-body">
          <p style="font-size: 11px; color: var(--text-muted); margin: 0 0 6px 0; line-height: 1.4;">${escapeHtml(tbl.description)}</p>
          ${colsHtml}
        </div>
        <div class="erd-card-footer">
          <span style="font-size: 10px; color: ${isSelected ? '#dfcaa9' : 'var(--text-muted)'}; font-family: var(--font-mono);">
            ${isSelected ? '● Active Inspector' : 'Click to inspect'}
          </span>
          <button class="card-nav-btn" style="padding: 2px 8px; font-size: 10.5px;">Inspect &rarr;</button>
        </div>
      </div>
    `;
  });

  // 3. Render Relational Connectors & Cardinality Pipeline
  let relsHtml = '';
  if (companyData.relationships && companyData.relationships.length > 0) {
    let relRowsHtml = '';
    companyData.relationships.forEach(rel => {
      relRowsHtml += `
        <div class="erd-rel-row">
          <div class="erd-rel-table-pill">${rel.fromTable}.${rel.fromCol}</div>
          <div class="erd-rel-arrow-connector">
            <span>&boxh;&boxh;&boxh;</span>
            <span class="erd-cardinality-badge">${rel.type}</span>
            <span>&boxh;&boxh;&boxh;&blacktriangleright;</span>
          </div>
          <div class="erd-rel-table-pill">${rel.toTable}.${rel.toCol}</div>
          <div class="erd-rel-label-text">
            <strong>Rule:</strong> ${escapeHtml(rel.label)}
          </div>
        </div>
      `;
    });

    relsHtml = `
      <div class="erd-relationships-diagram" style="grid-column: 1 / -1;">
        <div class="erd-diagram-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          Foreign Key Relational Connectors &amp; Crow's Foot Cardinality
        </div>
        <div class="erd-rel-pipeline">
          ${relRowsHtml}
        </div>
      </div>
    `;
  }

  visualBoard.innerHTML = bannerHtml + entityCardsHtml + relsHtml;

  // Add click listeners to entity cards
  visualBoard.querySelectorAll('.erd-entity-card').forEach(card => {
    card.addEventListener('click', () => {
      const tblName = card.dataset.table;
      currentErdSelectedTable = tblName;
      if (window.soundFX) window.soundFX.playPop();
      initEnterpriseERD(currentErdCompany);
    });
  });

  // 4. Render Deep Table Inspector
  renderErdInspector(companyData, currentErdSelectedTable);
}

function renderErdInspector(companyData, tableName) {
  const inspector = document.getElementById('erdTableInspector');
  if (!inspector || !companyData) return;

  const tableObj = companyData.tables.find(t => t.name === tableName) || companyData.tables[0];
  if (!tableObj) return;

  // Register in DATABASE so Query Studio can run it instantly!
  if (!DATABASE[tableObj.name] && tableObj.sampleRows) {
    DATABASE[tableObj.name] = JSON.parse(JSON.stringify(tableObj.sampleRows));
  }

  // Schema definition rows
  let schemaRowsHtml = '';
  tableObj.columns.forEach(col => {
    let keyBadge = '<span style="color: var(--text-muted); font-size: 10px;">Attribute</span>';
    if (col.isPk) keyBadge = '<span class="erd-pk-badge">PRIMARY KEY</span>';
    else if (col.isFk) keyBadge = `<span class="erd-fk-badge">FOREIGN KEY</span> <span style="font-size: 10px; color: #7dd3fc; margin-left: 4px;">↳ ${escapeHtml(col.references || '')}</span>`;

    schemaRowsHtml += `
      <tr>
        <td style="font-weight: 700; color: #fff;">${escapeHtml(col.name)}</td>
        <td style="color: #dfcaa9;">${escapeHtml(col.type)}</td>
        <td>${keyBadge}</td>
        <td style="color: var(--text-secondary); font-size: 11px;">${escapeHtml(col.desc || '')}</td>
      </tr>
    `;
  });

  // Sample data records
  const sampleRows = tableObj.sampleRows || [];
  const colKeys = tableObj.columns.map(c => c.name);

  let sampleHeaderHtml = colKeys.map(k => `<th>${escapeHtml(k)}</th>`).join('');
  let sampleBodyHtml = '';

  if (sampleRows.length === 0) {
    sampleBodyHtml = `<tr><td colspan="${colKeys.length}" style="text-align: center; color: var(--text-muted); padding: 16px;">No sample records available.</td></tr>`;
  } else {
    sampleRows.forEach(row => {
      let cells = colKeys.map(k => {
        const val = row[k];
        return `<td>${val !== undefined && val !== null ? escapeHtml(val) : '<em>NULL</em>'}</td>`;
      }).join('');
      sampleBodyHtml += `<tr>${cells}</tr>`;
    });
  }

  inspector.innerHTML = `
    <div class="erd-inspector-header">
      <div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="clause-pill pill-from" style="font-size: 10px;">Table Deep Inspector</span>
          <h3 class="erd-inspector-title">TABLE: ${escapeHtml(tableObj.name)}</h3>
          <span class="status-pill" style="font-size: 10px;">${escapeHtml(tableObj.caption)}</span>
        </div>
        <p style="font-size: 12px; color: var(--text-secondary); margin: 0;">${escapeHtml(tableObj.description)}</p>
      </div>
      <div>
        <button class="btn-solve-in-studio" id="btnQueryThisTable">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Query This Table in Studio
        </button>
      </div>
    </div>

    <!-- Schema Definitions -->
    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 12px; font-family: var(--font-mono); color: #dfcaa9; text-transform: uppercase; margin: 0 0 8px 0;">
        Column Definitions &amp; Relational Constraints
      </h4>
      <div class="erd-inspector-table-wrap">
        <table class="erd-data-table">
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Data Type</th>
              <th>Key Constraint</th>
              <th>Production Usage</th>
            </tr>
          </thead>
          <tbody>
            ${schemaRowsHtml}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Live Relational Data Preview -->
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h4 style="font-size: 12px; font-family: var(--font-mono); color: #dfcaa9; text-transform: uppercase; margin: 0;">
          Live Relational Data Preview (${sampleRows.length} Sample Rows)
        </h4>
        <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted);">
          Indexed in-memory relational buffer
        </span>
      </div>
      <div class="erd-inspector-table-wrap">
        <table class="erd-data-table">
          <thead>
            <tr>
              ${sampleHeaderHtml}
            </tr>
          </thead>
          <tbody>
            ${sampleBodyHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;

  const btnQuery = document.getElementById('btnQueryThisTable');
  if (btnQuery) {
    btnQuery.addEventListener('click', () => {
      const defaultQuery = `SELECT *\nFROM ${tableObj.name}\nLIMIT 10;`;
      switchToStudioWithQuery(defaultQuery, tableObj.name);
    });
  }
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

// =============================================================================
// DUOLINGO-STYLE INTERACTIVE QUESTS CONTROLLER
// =============================================================================

let currentQuestIndex = 0;
let questSliderValue = 80000;
let userWordBankTray = [];
let userSlotSelections = {};
let fillBlankChecked = false;
let fillBlankPassed = false;
let bugIsFixed = false;

function initQuestsSystem() {
  renderQuestStepperTrack();
  renderActiveQuest(0);
}

function renderQuestStepperTrack() {
  const track = document.getElementById('questStepperTrack');
  const progressText = document.getElementById('questProgressText');
  const progressBarFill = document.getElementById('questProgressBarFill');
  const levelSelect = document.getElementById('questDirectLevelSelect');

  if (!track || !window.QUESTS_DATA) return;

  const total = window.QUESTS_DATA.length;
  if (progressText) progressText.textContent = `Level ${currentQuestIndex + 1} of ${total}`;
  if (progressBarFill) progressBarFill.style.width = `${((currentQuestIndex + 1) / total) * 100}%`;

  if (levelSelect && levelSelect.options.length === 0) {
    levelSelect.innerHTML = window.QUESTS_DATA.map((q, idx) => 
      `<option value="${idx}">Lvl ${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}: ${q.title.split(':')[1] || q.title}</option>`
    ).join('');
    levelSelect.addEventListener('change', (e) => {
      setQuestIndex(parseInt(e.target.value, 10));
    });
  }
  if (levelSelect) {
    levelSelect.value = currentQuestIndex;
  }

  let html = '';
  window.QUESTS_DATA.forEach((q, idx) => {
    const isActive = idx === currentQuestIndex;
    const isDone = idx < currentQuestIndex;
    html += `
      <button class="quest-step-pill ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" style="min-width: 80px;" onclick="setQuestIndex(${idx})">
        <span>${isDone ? '&check;' : idx + 1}</span>
        <span>${q.title.split(':')[0]}</span>
      </button>
    `;
  });
  track.innerHTML = html;

  setTimeout(() => {
    const activePill = track.querySelector('.quest-step-pill.active');
    if (activePill) {
      activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, 50);
}

function setQuestIndex(idx) {
  currentQuestIndex = idx;
  userWordBankTray = [];
  userSlotSelections = {};
  fillBlankChecked = false;
  fillBlankPassed = false;
  bugIsFixed = false;
  renderQuestStepperTrack();
  renderActiveQuest(idx);
}

function renderActiveQuest(idx) {
  const container = document.getElementById('questActiveCard');
  if (!container || !window.QUESTS_DATA) return;

  const quest = window.QUESTS_DATA[idx] || window.QUESTS_DATA[0];

  if (quest.type === 'fill_blank') {
    renderFillBlankQuest(container, quest);
  } else if (quest.type === 'slider') {
    renderSliderQuest(container, quest);
  } else if (quest.type === 'wordbank') {
    renderWordBankQuest(container, quest);
  } else if (quest.type === 'spot_bug') {
    renderSpotBugQuest(container, quest);
  } else if (quest.type === 'boss') {
    renderBossQuest(container, quest);
  }
}

// --- FILL IN THE BLANK QUEST RENDERER ---
function renderFillBlankQuest(container, quest) {
  const totalSlots = Object.keys(quest.slots).length;
  const filledCount = Object.keys(userSlotSelections).length;

  let codeHtml = '';
  const tmpl = quest.template || quest.codeTemplate || [];
  tmpl.forEach(item => {
    if (item.isBlank) {
      const currentVal = userSlotSelections[item.slotId];
      let stateClass = '';
      if (currentVal) stateClass = 'filled';
      if (fillBlankChecked) {
        stateClass = (currentVal === quest.slots[item.slotId].correct) ? 'correct' : 'incorrect';
      }
      codeHtml += `<span class="blank-slot ${stateClass}">${currentVal || item.placeholder}</span>`;
    } else {
      codeHtml += item.text;
    }
  });

  let choicesHtml = '';
  Object.keys(quest.slots).forEach((slotKey, idx) => {
    const slotInfo = quest.slots[slotKey];
    choicesHtml += `
      <div class="slot-choice-row">
        <span class="choice-label">BLANK #${idx + 1}:</span>
        ${slotInfo.options.map(opt => `
          <button class="choice-pill ${userSlotSelections[slotKey] === opt ? 'selected' : ''}" onclick="selectSlotChoice('${slotKey}', '${opt}')">${opt}</button>
        `).join('')}
      </div>
    `;
  });

  const allSlotsFilled = filledCount === totalSlots;

  container.innerHTML = `
    <div class="quest-card-header">
      <div>
        <h3 class="quest-card-title">${quest.title}</h3>
        <p class="quest-card-subtitle">${quest.subtitle}</p>
      </div>
      <span class="status-pill" style="font-size: 11px;">Category: ${quest.category}</span>
    </div>

    <!-- Task Goal -->
    <div style="background: #111114; border: 1px solid var(--border-default); border-radius: var(--radius-sm); padding: 12px 16px;">
      <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted); display: block; margin-bottom: 2px;">TASK INSTRUCTION:</span>
      <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${quest.task}</span>
    </div>

    <!-- Interactive Code Template with Glowing Blanks -->
    <div>
      <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted); display: block; margin-bottom: 6px;">FILL IN THE BLANK(S):</span>
      <div class="fill-blank-code-container"><code>${codeHtml}</code></div>
    </div>

    <!-- Choice Bank -->
    <div>
      <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted); display: block; margin-bottom: 6px;">SELECT YOUR OPTIONS:</span>
      <div class="slot-choice-bank">
        ${choicesHtml}
      </div>
    </div>

    <!-- Result Feedback Banner -->
    ${fillBlankChecked ? (fillBlankPassed ? `
      <div style="background: rgba(158, 197, 173, 0.1); border: 1px solid #9ec5ad; border-radius: var(--radius-sm); padding: 12px 16px; display: flex; align-items: center; gap: 10px;">
        <span style="color: #9ec5ad; font-size: 18px;">&check;</span>
        <div>
          <div style="font-size: 13px; font-weight: 700; color: #9ec5ad; margin-bottom: 2px;">🎉 Brilliant! Correct Answer!</div>
          <div style="font-size: 11.5px; color: var(--text-secondary);">${quest.explanation}</div>
        </div>
      </div>
    ` : `
      <div style="background: rgba(214, 157, 143, 0.1); border: 1px solid #d69d8f; border-radius: var(--radius-sm); padding: 12px 16px; display: flex; align-items: center; gap: 10px;">
        <span style="color: #d69d8f; font-size: 18px;">&cross;</span>
        <div>
          <div style="font-size: 13px; font-weight: 700; color: #d69d8f; margin-bottom: 2px;">Not quite right yet!</div>
          <div style="font-size: 11.5px; color: var(--text-secondary);">Check the highlighted red blanks and try choosing a different keyword.</div>
        </div>
      </div>
    `) : ''}

    <!-- Action Bar -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
      <button class="card-nav-btn" onclick="userSlotSelections = {}; fillBlankChecked = false; renderActiveQuest(${currentQuestIndex});">&orarr; Reset Blanks</button>
      
      <div style="display: flex; gap: 10px;">
        <button class="btn-solve-in-studio" ${!allSlotsFilled ? 'disabled' : ''} style="padding: 7px 18px; font-weight: 600;" onclick="checkFillBlankAnswer()">
          Check Answer &check;
        </button>

        ${fillBlankPassed ? `
          <button class="card-nav-btn" style="background: #9ec5ad; color: #09090b; font-weight: 700;" onclick="setQuestIndex(${currentQuestIndex + 1})">
            Next Level (${currentQuestIndex + 2 < 10 ? '0' + (currentQuestIndex + 2) : currentQuestIndex + 2}) &rarr;
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

function selectSlotChoice(slotId, value) {
  if (window.soundFX) window.soundFX.playPop();
  userSlotSelections[slotId] = value;
  fillBlankChecked = false;
  renderActiveQuest(currentQuestIndex);
}

function checkFillBlankAnswer() {
  const quest = window.QUESTS_DATA[currentQuestIndex];
  if (!quest || quest.type !== 'fill_blank') return;

  let allCorrect = true;
  Object.keys(quest.slots).forEach(slotKey => {
    if (userSlotSelections[slotKey] !== quest.slots[slotKey].correct) {
      allCorrect = false;
    }
  });

  fillBlankChecked = true;
  fillBlankPassed = allCorrect;

  if (allCorrect) {
    if (window.soundFX) {
      window.soundFX.playSuccess();
      window.soundFX.addXP(20, `${quest.title.split(':')[0]} Solved!`);
    }
  } else {
    if (window.soundFX) window.soundFX.playError();
  }

  renderActiveQuest(currentQuestIndex);
}

// --- QUEST 1: Live Threshold Slider Scaffolder ---
function renderSliderQuest(container, quest) {
  const rows = window.GUIDED_SCHEMA.rows;
  const highCount = rows.filter(r => r.salary >= questSliderValue).length;
  const lowCount = rows.length - highCount;

  container.innerHTML = `
    <div class="quest-card-header">
      <div>
        <h3 class="quest-card-title">${quest.title}</h3>
        <p class="quest-card-subtitle">${quest.subtitle}</p>
      </div>
      <span class="status-pill" style="font-size: 11px;">Scaffolding Level: Warm-up</span>
    </div>

    <!-- Live Interactive Slider Control -->
    <div class="quest-slider-wrap">
      <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-secondary);">THRESHOLD:</span>
      <input type="range" class="quest-slider" id="questSalarySlider" min="${quest.minSalary}" max="${quest.maxSalary}" step="${quest.step}" value="${questSliderValue}">
      <span class="quest-slider-val" id="questSliderDisplay">$${questSliderValue.toLocaleString()}</span>
    </div>

    <!-- Live Generated SQL Expression -->
    <div class="guided-code-box">
      <span style="color: var(--text-muted); font-size: 10px; display: block; margin-bottom: 4px;">LIVE ANSI SQL TEMPLATE (REACTIVE):</span>
      <code id="questGeneratedSql">SELECT name, department, salary,\n       CASE\n         WHEN salary >= ${questSliderValue} THEN 'Senior'\n         ELSE 'Standard'\n       END AS salary_tier\nFROM Employees;</code>
    </div>

    <div style="font-size: 11.5px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
      <span>💡 ${quest.hint}</span>
      <span style="font-weight: 600; color: #9ec5ad;">Current Result: ${highCount} Senior / ${lowCount} Standard</span>
    </div>

    <!-- Reactive Table Below -->
    <div class="guided-table-wrap">
      <table>
        <thead>
          <tr><th>name</th><th>department</th><th>salary</th><th>COMPUTED salary_tier</th></tr>
        </thead>
        <tbody id="questSliderTableBody">
          ${rows.map(r => {
            const isHigh = r.salary >= questSliderValue;
            return `
              <tr class="${isHigh ? 'row-passed-highlight' : 'row-rejected-dim'}">
                <td>${r.name}</td>
                <td>${r.department}</td>
                <td>$${r.salary.toLocaleString()}</td>
                <td>
                  <span class="guided-row-badge ${isHigh ? 'badge-active-pass' : 'badge-active-drop'}">
                    ${isHigh ? 'SENIOR' : 'STANDARD'}
                  </span>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
      <button class="card-nav-btn" style="background: var(--text-primary); color: #09090b; font-weight: 600;" onclick="setQuestIndex(1)">
        Next: Quest 02 (Word Bank Assembly) &rarr;
      </button>
    </div>
  `;

  // Wire slider
  const slider = document.getElementById('questSalarySlider');
  if (slider) {
    slider.addEventListener('input', (e) => {
      questSliderValue = parseInt(e.target.value, 10);
      document.getElementById('questSliderDisplay').textContent = `$${questSliderValue.toLocaleString()}`;
      document.getElementById('questGeneratedSql').textContent = `SELECT name, department, salary,\n       CASE\n         WHEN salary >= ${questSliderValue} THEN 'Senior'\n         ELSE 'Standard'\n       END AS salary_tier\nFROM Employees;`;

      const tbody = document.getElementById('questSliderTableBody');
      if (tbody) {
        tbody.innerHTML = rows.map(r => {
          const isHigh = r.salary >= questSliderValue;
          return `
            <tr class="${isHigh ? 'row-passed-highlight' : 'row-rejected-dim'}">
              <td>${r.name}</td>
              <td>${r.department}</td>
              <td>$${r.salary.toLocaleString()}</td>
              <td>
                <span class="guided-row-badge ${isHigh ? 'badge-active-pass' : 'badge-active-drop'}">
                  ${isHigh ? 'SENIOR' : 'STANDARD'}
                </span>
              </td>
            </tr>
          `;
        }).join('');
      }
    });
  }
}

// --- QUEST 2: Tap-to-Assemble Word Bank ---
function renderWordBankQuest(container, quest) {
  const allTokens = [
    'CASE',
    'WHEN',
    "department = 'Engineering'",
    'THEN',
    "'Tech'",
    'ELSE',
    "'Operations'",
    'END',
    'IF',
    'WHERE'
  ];

  const isComplete = userWordBankTray.join(' ') === quest.correctTokens.join(' ');

  container.innerHTML = `
    <div class="quest-card-header">
      <div>
        <h3 class="quest-card-title">${quest.title}</h3>
        <p class="quest-card-subtitle">${quest.subtitle}</p>
      </div>
      <span class="status-pill" style="font-size: 11px;">Duolingo Sentence Builder</span>
    </div>

    <!-- Objective Prompt -->
    <div style="background: #111114; border: 1px solid var(--border-default); border-radius: var(--radius-sm); padding: 12px 16px;">
      <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted); display: block; margin-bottom: 2px;">GOAL:</span>
      <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${quest.targetSentence}</span>
    </div>

    <!-- Assembly Tray (Where chosen tokens sit) -->
    <div>
      <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted); display: block; margin-bottom: 6px;">YOUR ASSEMBLY TRAY (Tap tokens in order, tap again to remove):</span>
      <div class="wordbank-tray ${isComplete ? 'tray-success' : ''}" id="questWordTray">
        ${userWordBankTray.length === 0 ? '<span style="color: #52525b; font-size: 12px; font-style: italic;">Tap words from below to construct the expression...</span>' : ''}
        ${userWordBankTray.map((tok, idx) => `
          <button class="wordbank-token in-tray" onclick="removeTokenFromTray(${idx})">${tok}</button>
        `).join('')}
      </div>
    </div>

    <!-- Celebration Banner if completed -->
    ${isComplete ? `
      <div style="background: rgba(158, 197, 173, 0.1); border: 1px solid #9ec5ad; border-radius: var(--radius-sm); padding: 10px 16px; display: flex; align-items: center; gap: 8px;">
        <span style="color: #9ec5ad; font-size: 16px;">&check;</span>
        <span style="font-size: 12.5px; font-weight: 600; color: #9ec5ad;">Awesome! Valid CASE WHEN structure assembled perfectly!</span>
      </div>
    ` : ''}

    <!-- Available Word Bank Pool -->
    <div>
      <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted); display: block; margin-bottom: 6px;">WORD BANK:</span>
      <div class="wordbank-pool">
        ${allTokens.map((tok, idx) => {
          const usedCountInTray = userWordBankTray.filter(t => t === tok).length;
          const totalInAvailable = allTokens.filter(t => t === tok).length;
          const isUsed = usedCountInTray >= totalInAvailable;
          return `
            <button class="wordbank-token ${isUsed ? 'used' : ''}" ${isUsed ? 'disabled' : ''} onclick="addTokenToTray('${tok.replace(/'/g, "\\'")}')">${tok}</button>
          `;
        }).join('')}
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
      <button class="card-nav-btn" onclick="userWordBankTray = []; renderActiveQuest(1);">&orarr; Clear Tray</button>
      <button class="card-nav-btn" ${!isComplete ? 'disabled' : ''} style="background: ${isComplete ? '#9ec5ad' : '#27272a'}; color: #09090b; font-weight: 600;" onclick="setQuestIndex(2)">
        Next: Quest 03 (Spot the Bug) &rarr;
      </button>
    </div>
  `;
}

function addTokenToTray(token) {
  userWordBankTray.push(token);
  renderActiveQuest(1);
}

function removeTokenFromTray(idx) {
  userWordBankTray.splice(idx, 1);
  renderActiveQuest(1);
}

// --- QUEST 3: Spot the Bug & Fix the Waterfall ---
function renderSpotBugQuest(container, quest) {
  container.innerHTML = `
    <div class="quest-card-header">
      <div>
        <h3 class="quest-card-title">${quest.title}</h3>
        <p class="quest-card-subtitle">${quest.subtitle}</p>
      </div>
      <span class="status-pill" style="font-size: 11px;">Logic Debugger</span>
    </div>

    <!-- Candidate Row Showcase -->
    <div style="background: #111114; border: 1px solid var(--border-default); border-radius: var(--radius-sm); padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted);">TEST INPUT ROW:</span>
        <div style="font-size: 14px; font-weight: 700; font-family: var(--font-mono); color: #d69d8f;">A = 20, B = 20, C = 40</div>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted);">MATHEMATICAL TRUTH:</span>
        <div style="font-size: 12px; font-weight: 600; color: #dfcaa9;">20 + 20 &le; 40 &rarr; NOT A TRIANGLE!</div>
      </div>
    </div>

    <!-- Bug vs Fix Showcase -->
    <div class="bug-card-box">
      <!-- Buggy State -->
      <div class="waterfall-step-card" style="border-color: ${bugIsFixed ? '#27272a' : '#c98877'}; opacity: ${bugIsFixed ? '0.4' : '1'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 11px; font-weight: 700; color: #c98877;">&cross; BUGGY WATERFALL ORDER</span>
          <span class="guided-row-badge badge-active-drop">FAILS TESTS</span>
        </div>
        <div class="guided-code-box" style="margin-bottom: 8px;">
          <code>${quest.buggyQuery}</code>
        </div>
        <p style="font-size: 11px; color: #d69d8f; line-height: 1.5; margin: 0;">
          ${quest.bugExplanation}
        </p>
      </div>

      <!-- Fixed State -->
      <div class="waterfall-step-card" style="border-color: ${bugIsFixed ? '#9ec5ad' : '#27272a'}; opacity: ${bugIsFixed ? '1' : '0.4'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 11px; font-weight: 700; color: #9ec5ad;">&check; CORRECT WATERFALL ORDER</span>
          <span class="guided-row-badge ${bugIsFixed ? 'badge-active-pass' : ''}">PASSES TESTS</span>
        </div>
        <div class="guided-code-box" style="margin-bottom: 8px;">
          <code>${quest.fixedQuery}</code>
        </div>
        <p style="font-size: 11px; color: #9ec5ad; line-height: 1.5; margin: 0;">
          ${quest.fixedExplanation}
        </p>
      </div>
    </div>

    <!-- Action Button -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
      <button class="btn-solve-in-studio" onclick="bugIsFixed = !bugIsFixed; renderActiveQuest(2);">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
        ${bugIsFixed ? 'Revert to Buggy Order' : '🔄 Swap Branches into Correct Order'}
      </button>

      <button class="card-nav-btn" ${!bugIsFixed ? 'disabled' : ''} style="background: ${bugIsFixed ? '#9ec5ad' : '#27272a'}; color: #09090b; font-weight: 600;" onclick="setQuestIndex(3)">
        Next: Boss Level 04 (HackerRank) &rarr;
      </button>
    </div>
  `;
}

// --- QUEST 4: The HackerRank Boss Challenge ---
function renderBossQuest(container, quest) {
  container.innerHTML = `
    <div class="quest-card-header">
      <div>
        <h3 class="quest-card-title">${quest.title}</h3>
        <p class="quest-card-subtitle">${quest.subtitle}</p>
      </div>
      <span class="points-pill" style="font-size: 12px;">+${quest.points}.00 Pts</span>
    </div>

    <div style="background: rgba(158, 197, 173, 0.08); border: 1px solid #9ec5ad; border-radius: var(--radius-sm); padding: 14px 18px;">
      <h4 style="margin: 0 0 6px 0; color: #9ec5ad; font-size: 14px;">🎉 Congratulations! You have conquered all prerequisite quests!</h4>
      <p style="margin: 0; font-size: 12px; line-height: 1.6; color: var(--text-secondary);">
        You now completely understand:
        <br>&bull; Why <code>CASE</code> produces a computed scalar value.
        <br>&bull; The exact syntax sequence: <code>CASE WHEN ... THEN ... ELSE ... END</code>.
        <br>&bull; Why the triangle inequality test <code>A + B &le; C</code> must come FIRST in the waterfall.
      </p>
    </div>

    <div>
      <span style="font-size: 10.5px; font-family: var(--font-mono); color: var(--text-muted); display: block; margin-bottom: 4px;">YOUR VERIFIED HACKERRANK SOLUTION:</span>
      <div class="guided-code-box" style="margin-bottom: 12px;">
        <code>${quest.solutionCode}</code>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
      <button class="card-nav-btn" onclick="switchToStudioWithQuery(\`${quest.solutionCode.replace(/`/g, '\\`')}\`, 'TRIANGLES')">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        Simulate in Studio
      </button>

      <a href="${quest.hackerRankUrl}" target="_blank" class="btn-solve-in-studio" style="text-decoration: none; padding: 9px 20px; font-size: 13px; font-weight: 700; background: #9ec5ad; color: #09090b;">
        🚀 Solve on HackerRank (+20 Pts) &rarr;
      </a>
    </div>
  `;
}

// =============================================================================
// BOOTSTRAP APPLICATION INITIALIZATION
// =============================================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisualizerApp);
} else {
  initVisualizerApp();
}
