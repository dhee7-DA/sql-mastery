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
ORDER BY state ASC, city ASC;`,

  preset_top_earners: `SELECT (months_tenure * salary) AS total_earnings, COUNT(*) AS employee_count
FROM Employees
GROUP BY total_earnings
ORDER BY total_earnings DESC
LIMIT 1;`,

  preset_dept_payroll: `SELECT department, COUNT(*) AS staff_count, SUM(salary) AS total_payroll, AVG(salary) AS avg_salary
FROM Employees
GROUP BY department
ORDER BY total_payroll DESC;`
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
// 3.5 DYNAMIC TABLE INJECTION & SYNTHESIS ENGINE (STUDIO RELATIONAL EXECUTOR)
// Dynamically creates, populates, and registers tables for any Case Study or custom query
// =============================================================================

const DYNAMIC_TABLE_REGISTRY = new Set();

function ensureDynamicTableInDatabase(tableName, caseStudy = null, sqlContext = '') {
  if (!tableName) return 'Employees';
  const cleanName = tableName.trim();

  // If already in DATABASE and not a dynamic table, return existing key
  const existingKey = Object.keys(DATABASE).find(k => k.toLowerCase() === cleanName.toLowerCase());
  if (existingKey && !DYNAMIC_TABLE_REGISTRY.has(existingKey)) {
    return existingKey;
  }

  // 1. Locate case study or schema definition
  const allCases = window.ALL_600_CASE_STUDIES || window.ALL_500_CASE_STUDIES || [];
  let cs = caseStudy;
  if (!cs) {
    cs = allCases.find(c => c.table && c.table.toLowerCase() === cleanName.toLowerCase());
  }
  if (!cs && sqlContext) {
    cs = allCases.find(c => c.targetQuery && c.targetQuery.toLowerCase().includes(`from ${cleanName.toLowerCase()}`));
  }

  // Check DOMAIN_ERD_ENGINE for matching table schema
  let domainTableObj = null;
  if (window.DOMAIN_ERD_ENGINE && window.DOMAIN_ERD_ENGINE.DOMAIN_SCHEMAS) {
    for (const dom of Object.values(window.DOMAIN_ERD_ENGINE.DOMAIN_SCHEMAS)) {
      const match = (dom.tables || []).find(t => t.name.toLowerCase() === cleanName.toLowerCase());
      if (match) {
        domainTableObj = match;
        break;
      }
    }
  }

  // 2. Determine Columns & Types
  let cols = [];
  if (domainTableObj && domainTableObj.columns && domainTableObj.columns.length > 0) {
    cols = domainTableObj.columns.map(c => ({ name: c.name, type: c.type || 'VARCHAR(64)', isPk: c.isPk, isFk: c.isFk }));
  } else if (cs && cs.schemaSnippet && window.DOMAIN_ERD_ENGINE) {
    const parsed = window.DOMAIN_ERD_ENGINE.parseSchemaSnippet(cs.schemaSnippet);
    if (parsed && parsed.columns && parsed.columns.length > 0) {
      cols = parsed.columns;
    }
  }

  // Fallback: extract column names from SQL query (SELECT / WHERE)
  if (cols.length === 0 && sqlContext) {
    const selectColsMatch = sqlContext.match(/SELECT\s+([\s\S]+?)\s+FROM/i);
    if (selectColsMatch) {
      const raw = selectColsMatch[1].replace(/DISTINCT/i, '').split(/,(?![^(]*\))/);
      raw.forEach(colExpr => {
        const clean = colExpr.trim().split(/\s+AS\s+/i)[0].trim().replace(/[()]/g, '');
        const colName = clean.split(/\s+/).pop();
        if (colName && colName !== '*' && !cols.some(c => c.name.toLowerCase() === colName.toLowerCase())) {
          cols.push({ name: colName, type: 'VARCHAR(64)' });
        }
      });
    }
    const whereColsMatch = sqlContext.match(/WHERE\s+([\s\S]+?)(?:ORDER|GROUP|LIMIT|;|$)/i);
    if (whereColsMatch) {
      const tokens = whereColsMatch[1].match(/[a-zA-Z_][a-zA-Z0-9_]*/g) || [];
      const keywords = new Set(['WHERE', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'TRUE', 'FALSE', 'LIKE', 'BETWEEN']);
      tokens.forEach(tok => {
        if (!keywords.has(tok.toUpperCase()) && !cols.some(c => c.name.toLowerCase() === tok.toLowerCase())) {
          cols.push({ name: tok, type: 'VARCHAR(64)' });
        }
      });
    }
  }

  // Fallback defaults if still empty
  if (cols.length === 0) {
    cols = [
      { name: 'id', type: 'INT', isPk: true },
      { name: 'name', type: 'VARCHAR(64)' },
      { name: 'status', type: 'VARCHAR(20)' },
      { name: 'amount', type: 'DECIMAL(10,2)' },
      { name: 'is_active', type: 'BOOLEAN' }
    ];
  }

  // 3. Extract target filter values so at least 2 rows match whatever WHERE condition is in sqlContext
  const targetFilterValues = {};
  if (sqlContext) {
    const eqMatches = sqlContext.matchAll(/([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:'([^']*)'|(\d+(?:\.\d+)?)|(TRUE|FALSE))/gi);
    for (const m of eqMatches) {
      const col = m[1];
      const strVal = m[2];
      const numVal = m[3];
      const boolVal = m[4];
      if (strVal !== undefined) targetFilterValues[col.toLowerCase()] = strVal;
      else if (numVal !== undefined) targetFilterValues[col.toLowerCase()] = parseFloat(numVal);
      else if (boolVal !== undefined) targetFilterValues[col.toLowerCase()] = boolVal.toUpperCase() === 'TRUE';
    }
  }

  // 4. Synthesize 5 Domain-Accurate Rows
  const generatedRows = [];
  const rowCount = 5;
  for (let i = 0; i < rowCount; i++) {
    const row = {};
    cols.forEach(c => {
      const colName = c.name;
      const lowerName = colName.toLowerCase();
      const colType = (c.type || '').toUpperCase();

      // First 2 rows intentionally match target equality filters
      const shouldMatchTarget = (i < 2);
      if (shouldMatchTarget && targetFilterValues[lowerName] !== undefined) {
        row[colName] = targetFilterValues[lowerName];
        return;
      }

      // Generate realistic values based on column name semantics
      if (lowerName.includes('id')) {
        if (colType.includes('INT') || (!colType.includes('VARCHAR') && !lowerName.includes('uuid') && !lowerName.includes('code') && !lowerName.includes('card') && !lowerName.includes('token'))) {
          row[colName] = 1001 + i;
        } else {
          row[colName] = `${lowerName.replace('_id', '')}_${7710 + i}`;
        }
      } else if (lowerName.includes('frozen') || lowerName.includes('delivered') || lowerName.includes('active') || lowerName.includes('is_') || lowerName.includes('has_') || colType.includes('BOOL')) {
        row[colName] = (i % 2 === 0);
      } else if (lowerName.includes('limit') || lowerName.includes('budget') || lowerName.includes('cap')) {
        row[colName] = (i + 1) * 2500;
      } else if (lowerName.includes('yield') || lowerName.includes('pct') || lowerName.includes('rate') || lowerName.includes('percent')) {
        row[colName] = Number((0.025 * (i + 1)).toFixed(4));
      } else if (lowerName.includes('share') || lowerName.includes('shares') || lowerName.includes('qty') || lowerName.includes('count') || lowerName.includes('attempts')) {
        row[colName] = (i + 1) * 15;
      } else if (lowerName.includes('amount') || lowerName.includes('balance') || lowerName.includes('price') || lowerName.includes('mrr') || lowerName.includes('salary') || lowerName.includes('usd') || colType.includes('DECIMAL')) {
        row[colName] = Number(((i + 1) * 1250.50).toFixed(2));
      } else if (lowerName.includes('status') || lowerName.includes('tier') || lowerName.includes('state')) {
        const statuses = ['ACTIVE', 'PENDING', 'SUCCEEDED', 'COMPLETED', 'QUEUED'];
        row[colName] = statuses[i % statuses.length];
      } else if (lowerName.includes('type') || lowerName.includes('event')) {
        const types = ['PAYMENT_ATTEMPT', 'AUTH_HOLD', 'REFUND_SETTLED', 'WEBHOOK_DISPATCH', 'BALANCE_INQUIRY'];
        row[colName] = types[i % types.length];
      } else if (lowerName.includes('date') || lowerName.includes('at') || lowerName.includes('time') || colType.includes('DATE') || colType.includes('TIME')) {
        row[colName] = `2026-03-0${i + 1} 12:00:00`;
      } else if (lowerName.includes('ticker') || lowerName.includes('symbol')) {
        const tickers = ['AAPL', 'NVDA', 'MSFT', 'AMZN', 'GOOGL'];
        row[colName] = tickers[i % tickers.length];
      } else if (lowerName.includes('name') || lowerName.includes('user') || lowerName.includes('customer')) {
        const names = ['Alpha Corp', 'Beta Pay', 'Gamma Cloud', 'Delta Retail', 'Epsilon Health'];
        row[colName] = names[i % names.length];
      } else if (lowerName.includes('json') || lowerName.includes('payload')) {
        row[colName] = `{"event":"evt_${i + 1}","retries":${i}}`;
      } else {
        row[colName] = `sample_${lowerName}_${i + 1}`;
      }
    });
    generatedRows.push(row);
  }

  // 5. Register in DATABASE and track as dynamic
  DATABASE[cleanName] = generatedRows;
  DYNAMIC_TABLE_REGISTRY.add(cleanName);

  // 6. Update UI builderTableSelect dropdown
  const tblSel = document.getElementById('builderTableSelect');
  if (tblSel) {
    let opt = Array.from(tblSel.options).find(o => o.value.toLowerCase() === cleanName.toLowerCase());
    if (!opt) {
      opt = document.createElement('option');
      opt.value = cleanName;
      opt.textContent = `⚡ ${cleanName} (${cs ? cs.industry : 'Case Study Table'} - ${generatedRows.length} rows)`;
      tblSel.appendChild(opt);
    }
    tblSel.value = cleanName;
  }

  // 7. Update Schema explorer
  renderSchemaExplorer();

  return cleanName;
}

function resetStudioToDefaultTable() {
  switchTable('Employees');
  const banner = document.getElementById('dynamicTableBanner');
  if (banner) banner.style.display = 'none';
}

// =============================================================================
// 4. PARSER & PIPELINE BUILDER
// =============================================================================

function parseAndBuildPipeline(sql) {
  const cleanSQL = sql.trim();

  // Detect FROM table with Dynamic Injection
  let tableName = 'TRIANGLES';
  const fromMatch = cleanSQL.match(/FROM\s+([A-Za-z0-9_]+)/i);
  if (fromMatch) {
    const requested = fromMatch[1];
    const found = Object.keys(DATABASE).find(k => k.toLowerCase() === requested.toLowerCase());
    if (found) {
      tableName = found;
    } else {
      tableName = ensureDynamicTableInDatabase(requested, null, cleanSQL) || requested;
    }
  }
  EngineState.activeTable = tableName;
  updateActiveTableBadge(tableName);

  const rawRows = JSON.parse(JSON.stringify(DATABASE[tableName] || []));
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
    const cleanClause = (whereClause || '').trim();
    if (!cleanClause) return { passed: true, reason: 'No filter' };

    // 1. Check for compound AND conditions
    if (/\s+AND\s+/i.test(cleanClause)) {
      const parts = cleanClause.split(/\s+AND\s+/i);
      const subResults = parts.map(p => evaluateWherePredicate(row, p, tableName));
      const allPassed = subResults.every(r => r.passed);
      return {
        passed: allPassed,
        reason: subResults.map(r => r.reason).join(' AND ')
      };
    }

    // 2. Check for compound OR conditions
    if (/\s+OR\s+/i.test(cleanClause)) {
      const parts = cleanClause.split(/\s+OR\s+/i);
      const subResults = parts.map(p => evaluateWherePredicate(row, p, tableName));
      const anyPassed = subResults.some(r => r.passed);
      return {
        passed: anyPassed,
        reason: subResults.map(r => r.reason).join(' OR ')
      };
    }

    // 3. IS NULL / IS NOT NULL
    const nullMatch = cleanClause.match(/([a-zA-Z0-9_]+)\s+IS\s+(NOT\s+)?NULL/i);
    if (nullMatch) {
      const col = nullMatch[1];
      const isNot = Boolean(nullMatch[2]);
      const val = row[col];
      const isNull = val === null || val === undefined;
      const passed = isNot ? !isNull : isNull;
      return {
        passed,
        reason: `${col} is ${isNull ? 'NULL' : 'NOT NULL'} [${passed ? '✓' : '✗'}]`
      };
    }

    // 4. String Equality: col = 'value' or col != 'value'
    const strEqMatch = cleanClause.match(/([a-zA-Z0-9_]+)\s*(=|!=|<>)\s*'([^']*)'/i);
    if (strEqMatch) {
      const col = strEqMatch[1];
      const op = strEqMatch[2];
      const targetStr = strEqMatch[3];
      const rowVal = String(row[col] !== undefined ? row[col] : '');
      const isEqual = rowVal.toLowerCase() === targetStr.toLowerCase();
      const passed = (op === '=') ? isEqual : !isEqual;
      return {
        passed,
        reason: `${col} ('${rowVal}') ${op} '${targetStr}' [${passed ? '✓' : '✗'}]`
      };
    }

    // 5. Boolean Equality: col = TRUE / col = FALSE
    const boolMatch = cleanClause.match(/([a-zA-Z0-9_]+)\s*(=|!=|<>)\s*(TRUE|FALSE)/i);
    if (boolMatch) {
      const col = boolMatch[1];
      const op = boolMatch[2];
      const targetBool = boolMatch[3].toUpperCase() === 'TRUE';
      const rowVal = Boolean(row[col]);
      const isEqual = (rowVal === targetBool);
      const passed = (op === '=') ? isEqual : !isEqual;
      return {
        passed,
        reason: `${col} (${rowVal}) ${op} ${targetBool ? 'TRUE' : 'FALSE'} [${passed ? '✓' : '✗'}]`
      };
    }

    // 6. Numeric Comparison: col (> | < | >= | <= | = | !=) number
    const numCompMatch = cleanClause.match(/([a-zA-Z0-9_]+)\s*(>=|<=|>|<|=|!=|<>)\s*(\d+(?:\.\d+)?)/i);
    if (numCompMatch) {
      const col = numCompMatch[1];
      const op = numCompMatch[2];
      const targetNum = parseFloat(numCompMatch[3]);
      const rowVal = parseFloat(row[col]);
      if (!isNaN(rowVal)) {
        let passed = false;
        if (op === '>') passed = rowVal > targetNum;
        else if (op === '<') passed = rowVal < targetNum;
        else if (op === '>=') passed = rowVal >= targetNum;
        else if (op === '<=') passed = rowVal <= targetNum;
        else if (op === '=') passed = rowVal === targetNum;
        else if (op === '!=' || op === '<>') passed = rowVal !== targetNum;
        return {
          passed,
          reason: `${col} (${rowVal}) ${op} ${targetNum} [${passed ? '✓' : '✗'}]`
        };
      }
    }

    // 7. LIKE Pattern Matching
    const likeMatch = cleanClause.match(/([a-zA-Z0-9_]+)\s+(NOT\s+)?LIKE\s*'([^']*)'/i);
    if (likeMatch) {
      const col = likeMatch[1];
      const isNot = Boolean(likeMatch[2]);
      const pattern = likeMatch[3];
      const regexStr = '^' + pattern.replace(/%/g, '.*').replace(/_/g, '.') + '$';
      const re = new RegExp(regexStr, 'i');
      const val = String(row[col] || '');
      const matches = re.test(val);
      const passed = isNot ? !matches : matches;
      return {
        passed,
        reason: `${col} ('${val}') ${isNot ? 'NOT LIKE' : 'LIKE'} '${pattern}' [${passed ? '✓' : '✗'}]`
      };
    }

    // 8. IN List
    const inMatch = cleanClause.match(/([a-zA-Z0-9_]+)\s+(NOT\s+)?IN\s*\(([^)]+)\)/i);
    if (inMatch) {
      const col = inMatch[1];
      const isNot = Boolean(inMatch[2]);
      const items = inMatch[3].split(',').map(s => s.trim().replace(/^'|'$/g, '').toLowerCase());
      const val = String(row[col] || '').toLowerCase();
      const inList = items.includes(val);
      const passed = isNot ? !inList : inList;
      return {
        passed,
        reason: `${col} ('${row[col]}') ${isNot ? 'NOT IN' : 'IN'} (${inMatch[3].trim()}) [${passed ? '✓' : '✗'}]`
      };
    }

    // 9. REGEXP Pattern
    if (/REGEXP/i.test(cleanClause) && row.city) {
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

  if (!selectClause || selectClause.trim() === '*') {
    return { ...row };
  }

  // 1. Special Case When handling for Triangles & Credit Score
  if (/CASE[\s\S]+?END/i.test(selectClause)) {
    if (tableName === 'TRIANGLES' && row.A !== undefined) {
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

  // 2. Parse comma-separated projections
  const colExpressions = selectClause.split(/,(?![^(]*\))/);
  colExpressions.forEach(expr => {
    const raw = expr.trim();
    if (!raw) return;

    // Check for alias: `expression AS alias_name`
    const asMatch = raw.match(/^([\s\S]+?)\s+AS\s+([a-zA-Z0-9_]+)$/i);
    let expression = raw;
    let aliasName = raw;
    if (asMatch) {
      expression = asMatch[1].trim();
      aliasName = asMatch[2].trim();
    }

    // Direct column match
    if (row[aliasName] !== undefined) {
      result[aliasName] = row[aliasName];
      return;
    }
    if (row[expression] !== undefined) {
      result[aliasName] = row[expression];
      return;
    }

    // RIGHT(col, N)
    const rightMatch = expression.match(/RIGHT\s*\(\s*([a-zA-Z0-9_]+)\s*,\s*(\d+)\s*\)/i);
    if (rightMatch && row[rightMatch[1]] !== undefined) {
      result[aliasName] = String(row[rightMatch[1]]).slice(-parseInt(rightMatch[2], 10));
      return;
    }

    // LEFT(col, N)
    const leftMatch = expression.match(/LEFT\s*\(\s*([a-zA-Z0-9_]+)\s*,\s*(\d+)\s*\)/i);
    if (leftMatch && row[leftMatch[1]] !== undefined) {
      result[aliasName] = String(row[leftMatch[1]]).slice(0, parseInt(leftMatch[2], 10));
      return;
    }

    // LENGTH(col)
    const lenMatch = expression.match(/LENGTH\s*\(\s*([a-zA-Z0-9_]+)\s*\)/i);
    if (lenMatch && row[lenMatch[1]] !== undefined) {
      result[aliasName] = String(row[lenMatch[1]]).length;
      return;
    }

    // Multiplication: (col * number)
    const multMatch = expression.match(/\(?\s*([a-zA-Z0-9_]+)\s*\*\s*(\d+(?:\.\d+)?)\s*\)?/);
    if (multMatch && row[multMatch[1]] !== undefined) {
      result[aliasName] = Number((parseFloat(row[multMatch[1]]) * parseFloat(multMatch[2])).toFixed(4));
      return;
    }

    // Case-insensitive key match fallback
    const matchKey = Object.keys(row).find(k => k.toLowerCase() === expression.toLowerCase());
    if (matchKey) {
      result[aliasName] = row[matchKey];
    } else {
      result[aliasName] = row[aliasName] !== undefined ? row[aliasName] : '-';
    }
  });

  return Object.keys(result).length > 0 ? result : { ...row };
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
  const badge = document.getElementById('activeTableBadge');
  if (badge) {
    const isDynamic = DYNAMIC_TABLE_REGISTRY.has(tbl);
    badge.innerHTML = isDynamic ? `⚡ ${tbl}` : tbl;
    badge.title = isDynamic ? `Dynamic Case Study Table (${DATABASE[tbl]?.length || 0} rows)` : `Standard Database Table`;
  }
  
  // Show / hide the dynamic table banner in Studio
  const banner = document.getElementById('dynamicTableBanner');
  if (banner) {
    if (DYNAMIC_TABLE_REGISTRY.has(tbl)) {
      banner.style.display = 'flex';
      banner.innerHTML = `
        <div class="dynamic-banner-content">
          <span class="dynamic-banner-icon">⚡</span>
          <span>Dynamic Case Table Active: <strong>${tbl}</strong> (${DATABASE[tbl]?.length || 0} Synthetic Disk Records Generated)</span>
        </div>
        <button class="btn-reset-db" onclick="resetStudioToDefaultTable()">↺ Reset to Employees (Standard DB)</button>
      `;
    } else {
      banner.style.display = 'none';
    }
  }

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
// Immediate theme application to prevent FOUC
(function applyEarlyTheme() {
  try {
    const savedTheme = localStorage.getItem('sql_visualizer_theme') || 'zinc-pitch';
    document.documentElement.setAttribute('data-theme', savedTheme);
  } catch (e) {}
})();

function initThemeController() {
  const themeSelect = document.getElementById('themeSelect');
  let savedTheme = 'zinc-pitch';
  try {
    savedTheme = localStorage.getItem('sql_visualizer_theme') || 'zinc-pitch';
  } catch (e) {}

  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeSelect) {
    themeSelect.value = savedTheme;
    themeSelect.addEventListener('change', (e) => {
      const newTheme = e.target.value;
      document.documentElement.setAttribute('data-theme', newTheme);
      try {
        localStorage.setItem('sql_visualizer_theme', newTheme);
      } catch (err) {}
    });
  }
}

function initVisualizerApp() {
  initThemeController();
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
let currentCaseMode = 'challenge'; // 'challenge' (Token Puzzle) or 'study' (Reference)
let activeDossierCaseId = 1;
let currentCaseDisplayLimit = 30;

// Syntax Gym (Section 0: 300 Micro-Drills) State
let currentGymPillar = 'all'; // 'all', 'select', 'where', 'order'
let currentGymTable = 'all'; // 'all' or specific table name
let currentGymSearch = '';
let currentGymDisplayLimit = 30;

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
  if (targetId === 'viewPathways') renderTopicPathways();
  if (targetId === 'viewGuidedLab') {
    renderGuidedStep(currentGuidedStep);
    if (window.SQL_BUDDY) window.SQL_BUDDY.say("🔬 Welcome to the Guided Lab! Step through each physical execution phase row-by-row!", 4500, 'thinking');
  }
  if (targetId === 'viewQuests') {
    renderActiveQuest(currentQuestIndex);
    if (window.SQL_BUDDY) window.SQL_BUDDY.say("🎮 Quest Mode! Drag and assemble the AST query tokens to solve the puzzle!", 4500, 'happy');
  }
  if (targetId === 'viewDeconstructor') renderDeconstructedProblem(activeDeconstructorId);
  if (targetId === 'viewExplainer') {
    renderStudyLibrary();
    if (window.SQL_BUDDY) window.SQL_BUDDY.say("📚 Masterclass Study Library: 12 modules with deep storage physics and gotchas!", 4500, 'happy');
  }
  if (targetId === 'viewMcqs') {
    renderMcqs();
    if (window.SQL_BUDDY) window.SQL_BUDDY.say("🧠 2,100 Master MCQs loaded! Watch out for 3-valued logic and tie-breaking edge cases!", 4500, 'thinking');
  }
  if (targetId === 'viewSyntaxGym') {
    renderSyntaxGym();
    if (window.SQL_BUDDY) window.SQL_BUDDY.say("🏋️ Welcome to the Syntax Gym! 300 micro-drills to build muscle memory across 10 everyday schemas!", 4500, 'happy');
  }
  if (targetId === 'viewCases') {
    renderCaseStudies();
    if (window.SQL_BUDDY) window.SQL_BUDDY.say("💼 1,490 Enterprise Case Studies! Pick an industry vertical and let's solve real data challenges!", 4500, 'happy');
  }
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

  // Quick Jump Aggregations Hub Menu
  const qjBtn = document.getElementById('quickJumpAggregationsBtn');
  const qjMenu = document.getElementById('quickJumpAggregationsMenu');
  if (qjBtn && qjMenu) {
    qjBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      qjMenu.classList.toggle('open');
      if (window.soundFX) window.soundFX.playPop();
    });
    document.addEventListener('click', (e) => {
      if (!qjMenu.contains(e.target) && e.target !== qjBtn) {
        qjMenu.classList.remove('open');
      }
    });
  }

  // Initialize Topic Pathways Default Modular Hub
  renderTopicPathways();

  // Initialize the Guided Lab, Quests, Problem Deconstructor & Study Library
  initGuidedLab();
  initQuestsSystem();
  initDeconstructorSystem();
  initStudyLibrary();

  // Initialize Case Studies and Persistent Top Domain ERD Showcase on startup
  if (window.DOMAIN_ERD_ENGINE) {
    window.DOMAIN_ERD_ENGINE.renderTopShowcase('Fintech');
  }
  renderCaseStudies();
  renderSyntaxGym();

  // Difficulty filter pills in Problem Bank
  document.querySelectorAll('.diff-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProblemBank(btn.dataset.diff);
    });
  });

  // Section filter pills in Case Studies (scoped to #caseSectionFilters)
  document.querySelectorAll('#caseSectionFilters .case-section-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#caseSectionFilters .case-section-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (window.soundFX) window.soundFX.playPop();
      currentCaseDisplayLimit = 30;
      renderCaseStudies(currentCaseIndustryFilter, btn.dataset.section, currentCaseDiffFilter, currentCaseSortOrder);
    });
  });

  // Pillar filter pills in Syntax Gym (300)
  document.querySelectorAll('#gymPillarFilters .case-section-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#gymPillarFilters .case-section-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (window.soundFX) window.soundFX.playPop();
      currentGymPillar = btn.dataset.pillar || 'all';
      currentGymDisplayLimit = 30;
      renderSyntaxGym();
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
      if (btn.dataset.industry !== 'all' && window.DOMAIN_ERD_ENGINE) {
        window.DOMAIN_ERD_ENGINE.renderTopShowcase(btn.dataset.industry);
      }
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

  // Search input for Syntax Gym
  const gymSearchInput = document.getElementById('gymSearchInput');
  if (gymSearchInput) {
    gymSearchInput.addEventListener('input', (e) => {
      currentGymSearch = e.target.value.trim();
      currentGymDisplayLimit = 30;
      renderSyntaxGym();
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

  // 2. Ensure table is present in database (dynamically synthesize if from case study)
  let activeTbl = table;
  if (activeTbl) {
    activeTbl = ensureDynamicTableInDatabase(activeTbl, null, query);
  }
  if (!activeTbl && query) {
    const fromMatch = query.match(/FROM\s+([A-Za-z0-9_]+)/i);
    if (fromMatch) {
      activeTbl = ensureDynamicTableInDatabase(fromMatch[1], null, query);
    }
  }

  if (activeTbl && DATABASE[activeTbl]) {
    EngineState.activeTable = activeTbl;
    updateActiveTableBadge(activeTbl);
    const tblSel = document.getElementById('builderTableSelect');
    if (tblSel) tblSel.value = activeTbl;
    syncBuilderFromTable(activeTbl);
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
  const gotchasList = activeItem.interviewGotchas || activeItem.gotchas;
  if (gotchasList && gotchasList.length > 0) {
    gotchasHtml = `
      <div class="study-gotchas-box">
        <div class="study-gotchas-title">⚡ CRITICAL PRODUCTION GOTCHAS &amp; INTERVIEW PITFALLS</div>
        <ul class="study-gotchas-list">
          ${gotchasList.map(g => {
            if (typeof g === 'string') return `<li>${g}</li>`;
            return `<li><strong>${g.title}:</strong> ${g.trap || g.explanation || ''}</li>`;
          }).join('')}
        </ul>
      </div>
    `;
  }

  const isCurrentDone = completedSections.has(activeItem.id);

  const quickPillsHtml = `
    <div class="study-quick-nav-bar">
      <span class="study-quick-label">⚡ TOPIC JUMP:</span>
      <div class="study-quick-pills">
        ${library.map(sec => {
          const isActive = sec.id === activeItem.id;
          const isAgg = sec.id === 'sec_aggregations';
          const shortName = sec.title.replace(/^\\d+\\.\\s*/, '').split('(')[0].trim();
          return `<button class="study-quick-pill ${isActive ? 'active' : ''} ${isAgg ? 'pill-aggregations-highlight' : ''}" onclick="selectStudySection('${sec.id}')">
            ${isAgg ? '🔥 ' : ''}${sec.icon} ${shortName}
          </button>`;
        }).join('')}
      </div>
    </div>
  `;

  const hasLabTrack = activeItem.quickActions && activeItem.quickActions.labTrack;
  const hasQuestId = activeItem.quickActions && activeItem.quickActions.questId !== undefined;
  const presetQuery = (activeItem.quickActions && activeItem.quickActions.presetQuery) ? activeItem.quickActions.presetQuery : 'SELECT * FROM Employees;';

  mainReader.innerHTML = `
    ${quickPillsHtml}
    <div class="study-header-banner">
      <div class="study-meta-row">
        <span class="clause-pill ${activeItem.badgeClass || 'pill-from'}">${activeItem.badge || 'Core'}</span>
        <span class="status-pill">${activeItem.readTime || '10 min read'}</span>
      </div>
      <h1 class="study-title">${activeItem.title}</h1>
      <p class="study-summary-text">${activeItem.summary || ''}</p>
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

        ${hasLabTrack ? `
          <button class="card-nav-btn" onclick="switchTrack('${activeItem.quickActions.labTrack}'); switchNavTab('viewGuidedLab');">
            🧪 Guided Lab &rarr;
          </button>
        ` : ''}
        ${hasQuestId ? `
          <button class="card-nav-btn" onclick="setQuestIndex(${activeItem.quickActions.questId}); switchNavTab('viewQuests');">
            🎮 Quest Level &rarr;
          </button>
        ` : ''}
      </div>

      <button class="btn-solve-in-studio" onclick="switchToStudioWithQuery(\`${presetQuery.replace(/`/g, '\\`')}\`, 'Employees')">
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

window.jumpToAggregationsSection = function(destination) {
  const menu = document.getElementById('quickJumpAggregationsMenu');
  if (menu) menu.classList.remove('open');
  if (window.soundFX) window.soundFX.playPop();

  if (destination === 'cases') {
    switchMainView('viewCases');
    const sec6Btn = document.querySelector('.case-section-btn[data-section*="Section 6"]');
    if (sec6Btn) {
      document.querySelectorAll('.case-section-btn').forEach(b => b.classList.remove('active'));
      sec6Btn.classList.add('active');
    }
    currentCaseDisplayLimit = 30;
    renderCaseStudies(currentCaseIndustryFilter, 'Section 6: Aggregations, Statistical Metrics & GROUP BY', currentCaseDiffFilter, currentCaseSortOrder);
    const panel = document.getElementById('viewCases');
    if (panel) panel.scrollTop = 0;
  } else if (destination === 'docs') {
    switchMainView('viewExplainer');
    selectStudySection('sec_aggregations');
    const panel = document.getElementById('viewExplainer');
    if (panel) panel.scrollTop = 0;
  } else if (destination === 'lab') {
    switchMainView('viewGuidedLab');
    switchTrack('trackAggregations');
    const panel = document.getElementById('viewGuidedLab');
    if (panel) panel.scrollTop = 0;
  } else if (destination === 'studio') {
    switchMainView('viewStudio');
    const presetSelect = document.getElementById('presetSelect');
    if (presetSelect) {
      presetSelect.value = 'preset_dept_payroll';
      presetSelect.dispatchEvent(new Event('change'));
    }
    const panel = document.getElementById('viewStudio');
    if (panel) panel.scrollTop = 0;
  }
};

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
let currentMcqDisplayLimit = 25;

function renderMcqs(filterKeyword = 'all', resetLimit = true) {
  if (resetLimit) currentMcqDisplayLimit = 25;
  activeMcqFilter = filterKeyword;
  const filterContainer = document.getElementById('mcqPillFilter');
  const container = document.getElementById('mcqCardsList');
  const allMcqs = window.MCQS_VAULT_500 || (window.FOUNDATIONS_DATA ? window.FOUNDATIONS_DATA.mcqs : []);
  if (!container || !allMcqs.length) return;

  // 1. Render Filter Pills
  if (filterContainer) {
    const uniqueKeywords = ['all', ...new Set(allMcqs.map(m => m.keyword))];
    let pillsHtml = '';
    uniqueKeywords.forEach(k => {
      const isActive = k.toLowerCase() === activeMcqFilter.toLowerCase();
      const count = k === 'all' ? allMcqs.length : allMcqs.filter(m => m.keyword === k).length;
      const label = k === 'all' ? `All Questions (${count})` : `${k} (${count})`;
      pillsHtml += `
        <button class="kw-filter-pill ${isActive ? 'active' : ''}" data-filter="${k}">
          <span>${label}</span>
        </button>
      `;
    });
    filterContainer.innerHTML = pillsHtml;

    filterContainer.querySelectorAll('.kw-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.soundFX) window.soundFX.playPop();
        renderMcqs(btn.dataset.filter, true);
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
  const visibleMcqs = filteredMcqs.slice(0, currentMcqDisplayLimit);

  visibleMcqs.forEach((mcq, idx) => {
    html += `
      <div class="mcq-card" id="card_${mcq.id}">
        <div class="mcq-meta-row">
          <span class="mcq-keyword-tag">${mcq.keyword}</span>
          ${mcq.tag ? `<span class="mcq-cute-badge">${mcq.tag}</span>` : ''}
          <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-muted); margin-left: auto;">Question ${idx + 1} of ${filteredMcqs.length}</span>
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

  if (filteredMcqs.length > currentMcqDisplayLimit) {
    html += `
      <div style="text-align: center; margin: 20px 0;">
        <button id="btnLoadMoreMcqs" class="mcq-load-more-btn">
          <span>🍡 Load Next 25 Questions (${visibleMcqs.length} of ${filteredMcqs.length} loaded)</span>
        </button>
      </div>
    `;
  }

  container.innerHTML = html;

  const btnMore = document.getElementById('btnLoadMoreMcqs');
  if (btnMore) {
    btnMore.addEventListener('click', () => {
      currentMcqDisplayLimit += 25;
      if (window.soundFX) window.soundFX.playPop();
      renderMcqs(activeMcqFilter, false);
    });
  }

  // Bind option clicks
  container.querySelectorAll('.mcq-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qid = btn.dataset.qid;
      const optIdx = parseInt(btn.dataset.optidx, 10);
      handleMcqAnswer(qid, optIdx);
    });
  });
}

function handleMcqAnswer(qid, selectedIdx) {
  const mcqs = window.MCQS_VAULT_500 || (window.FOUNDATIONS_DATA ? window.FOUNDATIONS_DATA.mcqs : []);
  const mcq = mcqs.find(m => String(m.id) === String(qid));
  if (!mcq) return;

  const card = document.getElementById(`card_${qid}`);
  if (!card) return;
  const optionBtns = card.querySelectorAll('.mcq-option-btn');
  const expCard = document.getElementById(`exp_${qid}`);
  const verdict = document.getElementById(`verdict_${qid}`);

  // Disable all options in this card
  optionBtns.forEach(b => b.disabled = true);

  const correctIdx = (typeof mcq.correctIndex === 'number')
    ? mcq.correctIndex
    : (mcq.correctOption ? (mcq.correctOption.charCodeAt(0) - 65) : 0);

  const isCorrect = (selectedIdx === correctIdx);
  if (isCorrect) {
    QuizState.score++;
    if (window.soundFX) window.soundFX.playSuccess();
    if (window.SQL_BUDDY) window.SQL_BUDDY.onCorrectAnswer(mcq.topic || mcq.keyword);
    document.getElementById('quizScoreCount').textContent = QuizState.score;
    optionBtns[selectedIdx].classList.add('opt-correct');
    verdict.innerHTML = `<span style="color: #4ade80; font-weight: 700;">&check; Correct Reasoning! 🌸</span>`;
  } else {
    if (window.soundFX) window.soundFX.playError();
    if (window.SQL_BUDDY) window.SQL_BUDDY.onIncorrectAnswer();
    optionBtns[selectedIdx].classList.add('opt-wrong');
    if (optionBtns[correctIdx]) optionBtns[correctIdx].classList.add('opt-correct');
    verdict.innerHTML = `<span style="color: #fb7185; font-weight: 700;">&cross; Not quite!</span> &mdash; Correct answer is <strong>Option ${String.fromCharCode(65 + correctIdx)}</strong>`;
  }

  QuizState.answered++;
  if (expCard) expCard.classList.add('show');
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

function renderCaseInlineTablePreview(cs) {
  let rows = [];
  if (window.CASE_SIMULATOR_ENGINE && typeof window.CASE_SIMULATOR_ENGINE.generateSampleRows === 'function') {
    rows = window.CASE_SIMULATOR_ENGINE.generateSampleRows(cs) || [];
  }

  // Ensure table name is clean
  let tableName = cs.table;
  if (!tableName || tableName === 'undefined') {
    if (cs.schemaSnippet && cs.schemaSnippet.includes('(')) {
      tableName = cs.schemaSnippet.split('(')[0].trim();
    } else {
      tableName = 'Target_Table';
    }
  }

  if (!rows || rows.length === 0) {
    return `
      <div class="case-table-preview-card">
        <div class="case-table-preview-header">
          <span class="case-table-badge">🗄️ Table: <strong>${escapeHtml(tableName)}</strong></span>
          <span class="case-table-count-pill">${escapeHtml(cs.schemaSnippet || '')}</span>
        </div>
      </div>
    `;
  }

  const columns = Object.keys(rows[0]);
  const previewRows = rows.slice(0, 3);

  return `
    <div class="case-table-preview-card" id="caseTableCard_${cs.id}">
      <div class="case-table-preview-header">
        <div class="case-table-title-group">
          <span class="case-table-badge">🗄️ <strong>${escapeHtml(tableName)}</strong></span>
          <span class="case-table-count-pill">${columns.length} cols &bull; ${rows.length} rows sample</span>
        </div>
        <button class="case-table-expand-btn" onclick="toggleCaseTableRows(${cs.id})" id="btnTableRows_${cs.id}" title="Toggle full sample rows">
          3/${rows.length} rows
        </button>
      </div>
      <div class="case-table-scroll-wrap" id="caseTableScroll_${cs.id}">
        <table class="case-inline-table">
          <thead>
            <tr>
              ${columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}
            </tr>
          </thead>
          <tbody id="caseTableBody_${cs.id}">
            ${renderCaseTableRowsHtml(columns, previewRows)}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderCaseTableRowsHtml(columns, rows) {
  return rows.map(r => `
    <tr>
      ${columns.map(c => {
        const val = r[c];
        let cls = 'val-str';
        let formatted = escapeHtml(String(val));
        if (val === null || val === undefined) {
          cls = 'val-null';
          formatted = 'NULL';
        } else if (typeof val === 'boolean') {
          cls = 'val-bool';
          formatted = val ? 'TRUE' : 'FALSE';
        } else if (typeof val === 'number') {
          cls = 'val-num';
          formatted = String(val);
        }
        return `<td><span class="${cls}">${formatted}</span></td>`;
      }).join('')}
    </tr>
  `).join('');
}

window.toggleCaseTableRows = function(caseId) {
  const cs = (typeof getCaseStudyById === 'function' ? getCaseStudyById(caseId) : null) || (window.ALL_1490_CASE_STUDIES || window.ALL_500_CASE_STUDIES || []).find(c => c.id === caseId);
  if (!cs) return;
  const tbody = document.getElementById(`caseTableBody_${caseId}`);
  const btn = document.getElementById(`btnTableRows_${caseId}`);
  if (!tbody || !btn) return;

  const rows = window.CASE_SIMULATOR_ENGINE ? window.CASE_SIMULATOR_ENGINE.generateSampleRows(cs) : [];
  if (!rows || rows.length === 0) return;
  const columns = Object.keys(rows[0]);

  if (tbody.getAttribute('data-expanded') === 'true') {
    tbody.innerHTML = renderCaseTableRowsHtml(columns, rows.slice(0, 3));
    tbody.setAttribute('data-expanded', 'false');
    btn.textContent = `3/${rows.length} rows`;
  } else {
    tbody.innerHTML = renderCaseTableRowsHtml(columns, rows);
    tbody.setAttribute('data-expanded', 'true');
    btn.textContent = `All ${rows.length} rows`;
  }
};

function renderCaseCardHtml(cs) {
  const isSolved = window.CASE_BLANKS_ENGINE && window.CASE_BLANKS_ENGINE.isSolved(cs.id);
  const challenge = window.CASE_BLANKS_ENGINE ? window.CASE_BLANKS_ENGINE.createChallenge(cs) : null;
  const activeState = window.CASE_BLANKS_ENGINE ? window.CASE_BLANKS_ENGINE.getCaseState(cs.id) : { slots: {}, usedTokens: new Set() };

  const diffClass = cs.difficulty === 'Easy' ? 'diff-pill-easy' : (cs.difficulty === 'Medium' ? 'diff-pill-medium' : 'diff-pill-hard');
  const diffEmoji = cs.difficulty === 'Easy' ? '🟢' : (cs.difficulty === 'Medium' ? '🟡' : '🔴');
  const highlightedSolution = window.CASE_DOSSIER_ENGINE ? window.CASE_DOSSIER_ENGINE.highlightSQL(cs.targetQuery) : escapeHtml(cs.targetQuery);

  let queryBlockHtml = '';
  if (currentCaseMode === 'study' || !challenge) {
    queryBlockHtml = `
      <div class="case-terminal-box">
        <div class="case-terminal-header">
          <div class="terminal-dots">
            <span class="terminal-dot dot-red"></span>
            <span class="terminal-dot dot-yellow"></span>
            <span class="terminal-dot dot-green"></span>
          </div>
          <span class="terminal-title">MySQL 8.0 • Reference Query</span>
          <button class="micro-text-btn" style="font-size: 10px;" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(cs.targetQuery)}')); if(window.soundFX) window.soundFX.playPop(); this.textContent='Copied!'; setTimeout(()=>this.textContent='Copy', 1500);">Copy</button>
        </div>
        <div class="case-terminal-code">
          <code>${highlightedSolution}</code>
        </div>
      </div>
    `;
  } else {
    // Challenge / Token Puzzle Mode
    let renderedMasked = escapeHtml(challenge.maskedQuery);
    for (const [slotId, slotInfo] of Object.entries(challenge.slots)) {
      const placedVal = activeState.slots[slotId] || '';
      const isFilled = Boolean(placedVal);
      const slotSpan = `
        <span class="query-slot-target ${isFilled ? 'filled' : ''}" 
              id="target_${cs.id}_${slotId}"
              data-case-id="${cs.id}" 
              data-slot-id="${slotId}" 
              onclick="handleSlotEject('${cs.id}', '${slotId}')"
              ondragover="handleSlotDragOver(event)"
              ondragleave="handleSlotDragLeave(event)"
              ondrop="handleSlotDrop(event, '${cs.id}', '${slotId}')"
              title="${isFilled ? 'Click to remove token' : 'Click a token below or drag here'}">
          ${isFilled ? `${escapeHtml(placedVal)} <span class="slot-eject-icon">✕</span>` : `[ ${slotId.toUpperCase()} ]`}
        </span>
      `;
      renderedMasked = renderedMasked.replace(`[[${slotId}]]`, slotSpan);
    }

    queryBlockHtml = `
      <div class="case-terminal-box">
        <div class="case-terminal-header">
          <div class="terminal-dots">
            <span class="terminal-dot dot-red"></span>
            <span class="terminal-dot dot-yellow"></span>
            <span class="terminal-dot dot-green"></span>
          </div>
          <span class="terminal-title">Interactive Canvas • Fill the Missing Clauses</span>
          ${isSolved ? '<span class="status-pill terminal-solved-pill">✓ Solved (+15 XP)</span>' : '<span class="terminal-hint-pill">Click or drag chips into slots</span>'}
        </div>
        <div class="case-terminal-code" id="canvas_code_${cs.id}">
          ${renderedMasked}
        </div>
      </div>

      <!-- Jumbled Token Bank Dock -->
      <div class="token-bank-dock" id="dock_${cs.id}">
        <div class="token-bank-header">
          <span>🏷️ <strong>Jumbled Keyword Bank:</strong> Click or drag into blanks</span>
          <button class="token-bank-reset-btn" onclick="handleResetCase('${cs.id}')">↺ Reset Slots</button>
        </div>
        <div class="token-chips-grid" id="chips_grid_${cs.id}">
          ${challenge.tokenBank.map(tok => {
            const isPlaced = activeState.usedTokens && activeState.usedTokens.has(tok.id);
            return `
              <button class="token-chip ${isPlaced ? 'placed' : ''}" 
                      id="chip_${tok.id}"
                      draggable="${!isPlaced}"
                      data-case-id="${cs.id}"
                      data-token-id="${tok.id}"
                      data-token-text="${escapeHtml(tok.text)}"
                      onclick="handleTokenClick('${cs.id}', '${tok.id}', '${escapeHtml(tok.text)}')"
                      ondragstart="handleTokenDragStart(event, '${cs.id}', '${tok.id}', '${escapeHtml(tok.text)}')">
                ${escapeHtml(tok.text)}
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Real-time Verification Feedback -->
      <div class="case-feedback-banner" id="feedback_${cs.id}" style="display: none;"></div>

      <!-- Collapsible Official Solution Shield -->
      <div class="case-solution-shield" id="solution_${cs.id}" style="display: none;">
        <div class="solution-shield-header">
          <span>💡 Official Syntax-Highlighted Solution:</span>
          <button class="btn-case-action" style="padding: 3px 10px; font-size: 10px;" onclick="toggleCaseSolution('${cs.id}')">Hide Solution</button>
        </div>
        <div class="case-terminal-code" style="padding: 12px 14px; background: #0b0f17; border-radius: 8px;">
          <code>${highlightedSolution}</code>
        </div>
      </div>
    `;
  }

  return `
    <div class="case-card ${isSolved ? 'case-solved' : ''}" id="case_card_${cs.id}">
      <div class="case-card-header">
        <div>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; flex-wrap: wrap;">
            ${(cs.isGymDrill || cs.drillNumber)
              ? `<span class="status-pill case-id-pill" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border-color: rgba(245, 158, 11, 0.3);">⚡ Drill #${String(cs.drillNumber || cs.id).padStart(3, '0')}</span>`
              : `<span class="status-pill case-id-pill">#${String(cs.id).padStart(3, '0')}</span>`}
            <span class="case-diff-filter-btn ${diffClass} active">${diffEmoji} ${cs.difficulty}</span>
            <span class="case-industry-pill">${cs.industry}</span>
            ${isSolved ? '<span style="font-size: 11px;" title="Solved!">🏆</span>' : ''}
          </div>
          <h3 class="case-title" onclick="openCaseDossier('${cs.id}')" title="Click to open full case study dossier">${cs.title}</h3>
        </div>
        <span class="case-section-pill">${cs.section ? cs.section.split(':')[0] : 'Section'}</span>
      </div>

      ${window.isEli5ModeActive && window.CASE_DOSSIER_ENGINE ? `
        <div class="eli5-story-box">
          ${window.CASE_DOSSIER_ENGINE.getEli5Story(cs)}
        </div>
      ` : `
        <p class="case-scenario-text">${cs.scenario}</p>
      `}

      <!-- Modern Sleek Objective Strip -->
      <div class="case-objective-strip">
        <span class="case-objective-icon">🎯</span>
        <div class="case-objective-content">
          <div class="case-objective-body"><strong class="case-objective-label">Objective:</strong> ${cs.businessObjective}</div>
        </div>
      </div>

      <!-- Inline Visual Table Preview Component -->
      ${renderCaseInlineTablePreview(cs)}

      ${queryBlockHtml}

      <div class="case-actions-bar">
        <div class="case-actions-group">
          ${currentCaseMode === 'challenge' && challenge ? `
            <button class="btn-case-action btn-verify-puzzle" onclick="handleVerifyCase('${cs.id}')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Verify
            </button>
            <button class="btn-case-action btn-reveal-shield" onclick="toggleCaseSolution('${cs.id}')">
              👁️ Reveal Answer
            </button>
          ` : ''}
        </div>
        <div class="case-actions-group">
          <button class="btn-case-action btn-case-dossier" onclick="openCaseDossier('${cs.id}')" title="View Executive Dossier">
            📖 Dossier
          </button>
          <button class="btn-case-action btn-case-sim" onclick="toggleCaseSim('${cs.id}')" title="Simulate 5-Row Table">
            📊 Simulator
          </button>
          <button class="btn-case-action btn-case-studio" onclick="switchToStudioWithQuery(decodeURIComponent('${encodeURIComponent(cs.targetQuery)}'), '${cs.table}')" title="Test in Studio">
            ⚡ Studio
          </button>
        </div>
      </div>

      <!-- In-Card Live Data Simulator Collapsible Drawer -->
      <div class="live-sim-drawer" id="sim_drawer_${cs.id}" style="display: none;"></div>
    </div>
  `;
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

  // Mount or synchronize the persistent Top Domain ERD Showcase
  if (window.DOMAIN_ERD_ENGINE && document.getElementById('caseStudiesDomainErdShowcase')) {
    let targetDomain = (currentCaseIndustryFilter === 'all' || !currentCaseIndustryFilter) ? 'Fintech' : currentCaseIndustryFilter;
    if (currentCaseSectionFilter && (currentCaseSectionFilter.includes('Section 0') || currentCaseSectionFilter.includes('Syntax Gym'))) {
      targetDomain = 'Foundations';
    }
    window.DOMAIN_ERD_ENGINE.renderTopShowcase(targetDomain);
  }

  let allCases = window.ALL_1490_CASE_STUDIES || window.ALL_500_CASE_STUDIES || window.ALL_1340_CASE_STUDIES || window.ALL_1040_CASE_STUDIES || window.ALL_700_CASE_STUDIES || window.ALL_600_CASE_STUDIES || [];
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

  // 4. Filter by Search Query
  if (currentCaseSearchQuery && currentCaseSearchQuery.trim() !== '') {
    const q = currentCaseSearchQuery.toLowerCase().trim();
    cases = cases.filter(cs => 
      (cs.title && cs.title.toLowerCase().includes(q)) ||
      (cs.scenario && cs.scenario.toLowerCase().includes(q)) ||
      (cs.table && cs.table.toLowerCase().includes(q)) ||
      (cs.businessObjective && cs.businessObjective.toLowerCase().includes(q)) ||
      (cs.industry && cs.industry.toLowerCase().includes(q)) ||
      (cs.section && cs.section.toLowerCase().includes(q))
    );
  }

  // 5. Sort Cases
  if (currentCaseSortOrder === 'id_asc') {
    cases.sort((a, b) => a.id - b.id);
  } else if (currentCaseSortOrder === 'id_desc') {
    cases.sort((a, b) => b.id - a.id);
  } else if (currentCaseSortOrder === 'diff_asc') {
    const weights = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
    cases.sort((a, b) => (weights[a.difficulty] || 2) - (weights[b.difficulty] || 2));
  } else if (currentCaseSortOrder === 'diff_desc') {
    const weights = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
    cases.sort((a, b) => (weights[b.difficulty] || 2) - (weights[a.difficulty] || 2));
  }

  if (countBadge) {
    countBadge.textContent = `${cases.length} Cases`;
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
    html += renderCaseCardHtml(cs);
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

  // Event Listeners for Focus in Top Domain ERD Showcase
  container.querySelectorAll('.btn-open-domain-erd').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dom = btn.dataset.domain;
      const tbl = btn.dataset.table;
      if (window.DOMAIN_ERD_ENGINE) {
        window.DOMAIN_ERD_ENGINE.focusTableInTopERD(dom, tbl);
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

  // Universal Case Study & Syntax Drill Resolver
  function getCaseStudyById(caseId) {
    // 1. Check gym drills if caseId is string 'gym_X' or legacy 1491-1790
    let drillNum = null;
    if (typeof caseId === 'string' && caseId.startsWith('gym_')) {
      drillNum = parseInt(caseId.replace('gym_', ''), 10);
    } else if (typeof caseId === 'number' && caseId >= 1491 && caseId <= 1790) {
      drillNum = caseId - 1490;
    }

    if (drillNum !== null && window.SYNTAX_GYM_DRILLS) {
      const d = window.SYNTAX_GYM_DRILLS[drillNum - 1];
      if (d) {
        return {
          id: `gym_${d.drillNumber}`,
          drillNumber: d.drillNumber,
          isGymDrill: true,
          section: "Section 0: Foundations & Syntax Gym",
          title: d.title,
          industry: "Foundations",
          table: d.table,
          difficulty: "Easy",
          scenario: d.scenario,
          businessObjective: d.businessObjective,
          schemaSnippet: d.schemaSnippet,
          targetQuery: d.targetQuery,
          syntaxBlueprint: d.syntaxBlueprint,
          syntaxRule: d.syntaxRule,
          syntaxTrap: d.syntaxTrap,
          eli5Story: `[SYNTAX BLUEPRINT]:\n${d.syntaxBlueprint}\n\n[RULE]: ${d.syntaxRule}\n\n[TRAP TO AVOID]: ${d.syntaxTrap}`,
          commonMistakes: d.commonMistakes,
          learningOutcomes: d.learningOutcomes,
          challengeSlots: d.challengeSlots
        };
      }
    }

    // 2. Check corporate enterprise cases
    const allCases = window.ALL_1490_CASE_STUDIES || window.ALL_500_CASE_STUDIES || window.ALL_1340_CASE_STUDIES || window.ALL_1040_CASE_STUDIES || [];
    const numId = typeof caseId === 'number' ? caseId : parseInt(caseId, 10);
    let found = allCases.find(c => c.id === numId || c.id === caseId);

    // 3. Fallback to gym drill if not found in corporate cases
    if (!found && window.SYNTAX_GYM_DRILLS && numId >= 1 && numId <= (window.SYNTAX_GYM_DRILLS.length || 400)) {
      const d = window.SYNTAX_GYM_DRILLS[numId - 1];
      if (d) {
        found = {
          id: `gym_${d.drillNumber}`,
          drillNumber: d.drillNumber,
          isGymDrill: true,
          section: "Section 0: Foundations & Syntax Gym",
          title: d.title,
          industry: "Foundations",
          table: d.table,
          difficulty: "Easy",
          scenario: d.scenario,
          businessObjective: d.businessObjective,
          schemaSnippet: d.schemaSnippet,
          targetQuery: d.targetQuery,
          syntaxBlueprint: d.syntaxBlueprint,
          syntaxRule: d.syntaxRule,
          syntaxTrap: d.syntaxTrap,
          eli5Story: `[SYNTAX BLUEPRINT]:\n${d.syntaxBlueprint}\n\n[RULE]: ${d.syntaxRule}\n\n[TRAP TO AVOID]: ${d.syntaxTrap}`,
          commonMistakes: d.commonMistakes,
          learningOutcomes: d.learningOutcomes,
          challengeSlots: d.challengeSlots
        };
      }
    }
    return found;
  }
  window.getCaseStudyById = getCaseStudyById;

  // Global Token Puzzle Event Handlers
  window.handleTokenClick = function(caseId, tokenId, tokenText) {
    if (!window.CASE_BLANKS_ENGINE) return;
    const cs = getCaseStudyById(caseId);
    if (!cs) return;

    const challenge = window.CASE_BLANKS_ENGINE.createChallenge(cs);
    if (!challenge) return;

    const state = window.CASE_BLANKS_ENGINE.getCaseState(caseId);
    if (state.usedTokens && state.usedTokens.has(tokenId)) return;

    // Find first empty slot
    const slotKeys = Object.keys(challenge.slots);
    const targetSlotId = slotKeys.find(sId => !state.slots[sId]);
    if (!targetSlotId) {
      if (window.soundFX) window.soundFX.playPop();
      return;
    }

    // Place token
    state.slots[targetSlotId] = tokenText;
    state.usedTokens.add(tokenId);

    if (window.soundFX) window.soundFX.playPop();

    // Update DOM slot
    const slotEl = document.getElementById(`target_${caseId}_${targetSlotId}`);
    if (slotEl) {
      slotEl.classList.add('filled');
      slotEl.classList.remove('slot-correct', 'slot-wrong');
      slotEl.innerHTML = `${escapeHtml(tokenText)} <span class="slot-eject-icon">✕</span>`;
    }

    // Update DOM chip
    const chipEl = document.getElementById(`chip_${tokenId}`);
    if (chipEl) {
      chipEl.classList.add('placed');
      chipEl.setAttribute('draggable', 'false');
    }

    // Auto-verify when all slots filled
    const filledCount = Object.values(state.slots).filter(Boolean).length;
    if (filledCount === slotKeys.length) {
      setTimeout(() => window.handleVerifyCase(caseId), 180);
    }
  };

  window.handleSlotEject = function(caseId, slotId) {
    if (!window.CASE_BLANKS_ENGINE) return;
    const state = window.CASE_BLANKS_ENGINE.getCaseState(caseId);
    const currentVal = state.slots[slotId];
    if (!currentVal) return;

    delete state.slots[slotId];
    if (window.soundFX) window.soundFX.playClick();

    const cs = getCaseStudyById(caseId);
    if (cs) {
      const challenge = window.CASE_BLANKS_ENGINE.createChallenge(cs);
      if (challenge) {
        const matchTok = challenge.tokenBank.find(t => t.text === currentVal && state.usedTokens.has(t.id));
        if (matchTok) {
          state.usedTokens.delete(matchTok.id);
          const chipEl = document.getElementById(`chip_${matchTok.id}`);
          if (chipEl) {
            chipEl.classList.remove('placed');
            chipEl.setAttribute('draggable', 'true');
          }
        }
      }
    }

    const slotEl = document.getElementById(`target_${caseId}_${slotId}`);
    if (slotEl) {
      slotEl.classList.remove('filled', 'slot-correct', 'slot-wrong');
      slotEl.innerHTML = `[ ${slotId.toUpperCase()} ]`;
    }

    const fb = document.getElementById(`feedback_${caseId}`);
    if (fb) fb.style.display = 'none';
  };

  window.handleTokenDragStart = function(event, caseId, tokenId, tokenText) {
    event.dataTransfer.setData('text/plain', JSON.stringify({ caseId, tokenId, tokenText }));
    event.dataTransfer.effectAllowed = 'move';
  };

  window.handleSlotDragOver = function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    const target = event.currentTarget;
    if (target) target.classList.add('drag-over');
  };

  window.handleSlotDragLeave = function(event) {
    const target = event.currentTarget;
    if (target) target.classList.remove('drag-over');
  };

  window.handleSlotDrop = function(event, caseId, slotId) {
    event.preventDefault();
    const target = event.currentTarget;
    if (target) target.classList.remove('drag-over');

    try {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'));
      if (!data || data.caseId !== caseId) return;

      const state = window.CASE_BLANKS_ENGINE.getCaseState(caseId);

      // If slot already had a token, eject it first
      if (state.slots[slotId]) {
        window.handleSlotEject(caseId, slotId);
      }

      state.slots[slotId] = data.tokenText;
      state.usedTokens.add(data.tokenId);

      if (window.soundFX) window.soundFX.playPop();

      if (target) {
        target.classList.add('filled');
        target.classList.remove('slot-correct', 'slot-wrong');
        target.innerHTML = `${escapeHtml(data.tokenText)} <span class="slot-eject-icon">✕</span>`;
      }

      const chipEl = document.getElementById(`chip_${data.tokenId}`);
      if (chipEl) {
        chipEl.classList.add('placed');
        chipEl.setAttribute('draggable', 'false');
      }

      const cs = getCaseStudyById(caseId);
      if (cs) {
        const challenge = window.CASE_BLANKS_ENGINE.createChallenge(cs);
        if (challenge) {
          const slotKeys = Object.keys(challenge.slots);
          const filledCount = Object.values(state.slots).filter(Boolean).length;
          if (filledCount === slotKeys.length) {
            setTimeout(() => window.handleVerifyCase(caseId), 180);
          }
        }
      }
    } catch (e) {}
  };

  window.handleResetCase = function(caseId) {
    if (!window.CASE_BLANKS_ENGINE) return;
    window.CASE_BLANKS_ENGINE.clearCaseState(caseId);
    if (window.soundFX) window.soundFX.playClick();

    const cs = getCaseStudyById(caseId);
    if (!cs) return;

    const challenge = window.CASE_BLANKS_ENGINE.createChallenge(cs);
    if (!challenge) return;

    for (const slotId of Object.keys(challenge.slots)) {
      const slotEl = document.getElementById(`target_${caseId}_${slotId}`);
      if (slotEl) {
        slotEl.classList.remove('filled', 'slot-correct', 'slot-wrong');
        slotEl.innerHTML = `[ ${slotId.toUpperCase()} ]`;
      }
    }

    challenge.tokenBank.forEach(tok => {
      const chipEl = document.getElementById(`chip_${tok.id}`);
      if (chipEl) {
        chipEl.classList.remove('placed');
        chipEl.setAttribute('draggable', 'true');
      }
    });

    const fb = document.getElementById(`feedback_${caseId}`);
    if (fb) fb.style.display = 'none';
  };

  window.toggleCaseSolution = function(caseId) {
    const solEl = document.getElementById(`solution_${caseId}`);
    if (!solEl) return;
    const isHidden = solEl.style.display === 'none';
    solEl.style.display = isHidden ? 'block' : 'none';
    if (window.soundFX) window.soundFX.playPop();
  };

  window.handleVerifyCase = function(caseId) {
    if (!window.CASE_BLANKS_ENGINE) return;
    const cs = getCaseStudyById(caseId);
    if (!cs) return;

    const state = window.CASE_BLANKS_ENGINE.getCaseState(caseId);
    const result = window.CASE_BLANKS_ENGINE.verifyChallenge(cs, state.slots);

    const fb = document.getElementById(`feedback_${caseId}`);
    const card = document.getElementById(`case_card_${caseId}`);

    if (result.isCorrect) {
      Object.keys(result.results || {}).forEach(sId => {
        const slotEl = document.getElementById(`target_${caseId}_${sId}`);
        if (slotEl) {
          slotEl.classList.add('slot-correct');
          slotEl.classList.remove('slot-wrong');
        }
      });

      if (card) card.classList.add('case-solved');

      if (fb) {
        fb.className = 'case-feedback-banner feedback-success';
        fb.innerHTML = result.explanation;
        fb.style.display = 'block';
      }

      const solvedSpan = document.getElementById('casesSolvedCount');
      if (solvedSpan) solvedSpan.textContent = window.CASE_BLANKS_ENGINE.getSolvedCount();

      const gymSolvedSpan = document.getElementById('gymSolvedCount');
      if (gymSolvedSpan && window.SYNTAX_GYM_DRILLS) {
        gymSolvedSpan.textContent = window.SYNTAX_GYM_DRILLS.filter((d, idx) => 
          window.CASE_BLANKS_ENGINE.isSolved(`gym_${d.drillNumber || idx + 1}`) || window.CASE_BLANKS_ENGINE.isSolved(1491 + idx)
        ).length;
      }
    } else {
      Object.entries(result.results || {}).forEach(([sId, info]) => {
        const slotEl = document.getElementById(`target_${caseId}_${sId}`);
        if (slotEl) {
          if (info.isCorrect) {
            slotEl.classList.add('slot-correct');
            slotEl.classList.remove('slot-wrong');
          } else {
            slotEl.classList.add('slot-wrong');
            slotEl.classList.remove('slot-correct');
          }
        }
      });

      if (fb) {
        fb.className = 'case-feedback-banner feedback-error';
        fb.innerHTML = result.explanation;
        fb.style.display = 'block';
      }
    }
  };
}

function toggleCaseSim(caseId) {
  const cs = getCaseStudyById(caseId);
  const drawer = document.getElementById(`sim_drawer_${caseId}`);
  const btn = document.querySelector(`.btn-toggle-sim[data-case-id="${caseId}"]`);
  if (!drawer || !cs || !window.CASE_SIMULATOR_ENGINE) return;

  if (drawer.style.display === 'block') {
    drawer.style.display = 'none';
    if (btn) btn.classList.remove('active');
  } else {
    if (window.soundFX) window.soundFX.playPop();
    drawer.style.display = 'block';
    if (btn) btn.classList.add('active');

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
        outputRowsHtml += `<tr>${cellsHtml}</tr>`;
      });
    }

    drawer.innerHTML = `
      <div class="sim-header-bar">
        <div class="sim-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          Real-Time Zero-Latency In-Memory Simulator (5 Disk Rows Tested)
        </div>
        <div class="sim-metrics">
          <span class="sim-metric-pill">Scanned: <strong>${sim.stats.diskRowsScanned} rows</strong></span>
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
    `;
  }
}
window.toggleCaseSim = toggleCaseSim;

function openCaseDossier(caseId) {
  const cs = getCaseStudyById(caseId);
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
  modal.classList.add('active');
  modal.style.display = 'flex';
}

window.openCaseDossier = openCaseDossier;

function closeCaseDossier() {
  const modal = document.getElementById('caseStudyDetailModal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}

window.closeCaseDossier = closeCaseDossier;

function navigateDossierPrev() {
  const allCases = window.ALL_1490_CASE_STUDIES || window.ALL_500_CASE_STUDIES || [];
  const currentIdx = allCases.findIndex(c => c.id === activeDossierCaseId);
  if (currentIdx > 0) {
    openCaseDossier(allCases[currentIdx - 1].id);
  } else if (allCases.length > 0) {
    openCaseDossier(allCases[allCases.length - 1].id);
  }
}

function navigateDossierNext() {
  const allCases = window.ALL_1490_CASE_STUDIES || window.ALL_500_CASE_STUDIES || [];
  const currentIdx = allCases.findIndex(c => c.id === activeDossierCaseId);
  if (currentIdx >= 0 && currentIdx < allCases.length - 1) {
    openCaseDossier(allCases[currentIdx + 1].id);
  } else if (allCases.length > 0) {
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
// SYNTAX GYM CONTROLLER (300 PROGRESSIVE MICRO-DRILLS & EVERYDAY SCHEMAS)
// =============================================================================

function renderSyntaxGymTablesBrowser() {
  const browserEl = document.getElementById('gymTablesBrowser');
  if (!browserEl) return;

  const tables = [
    { name: 'all', label: 'All 10 Tables', icon: '⚡', desc: 'Browse across all 10 everyday schemas (300 drills)', cols: [] },
    { name: 'Students', label: 'Students', icon: '🎓', desc: 'Classroom rosters, academic majors, GPA scores, and enrolled cohorts.', cols: ['student_id INT (PK)', 'full_name VARCHAR', 'age INT', 'major VARCHAR', 'gpa DECIMAL', 'city VARCHAR', 'enrolled_year INT'] },
    { name: 'Books', label: 'Books', icon: '📚', desc: 'Library inventory catalog, literary genres, unit pricing, and binding types.', cols: ['book_id INT (PK)', 'title VARCHAR', 'author VARCHAR', 'genre VARCHAR', 'price DECIMAL', 'stock_qty INT', 'published_year INT', 'is_hardcover BOOLEAN'] },
    { name: 'Employees', label: 'Employees', icon: '💼', desc: 'Corporate staffing roster, salary distributions, departments, and tenure dates.', cols: ['emp_id INT (PK)', 'first_name VARCHAR', 'last_name VARCHAR', 'department VARCHAR', 'salary DECIMAL', 'bonus DECIMAL', 'hire_date DATE'] },
    { name: 'GroceryItems', label: 'GroceryItems', icon: '🛒', desc: 'Supermarket inventory, organic certifications, caloric metrics, and shelf stock.', cols: ['item_id INT (PK)', 'item_name VARCHAR', 'category VARCHAR', 'unit_price DECIMAL', 'is_organic BOOLEAN', 'calories INT', 'stock_units INT'] },
    { name: 'Orders', label: 'Orders', icon: '📦', desc: 'Customer sales transactions, discounts, shipping logistics, and order fulfillment.', cols: ['order_id INT (PK)', 'customer_name VARCHAR', 'item_name VARCHAR', 'unit_price DECIMAL', 'quantity INT', 'discount_pct DECIMAL', 'order_status VARCHAR', 'shipping_city VARCHAR'] },
    { name: 'MusicTracks', label: 'MusicTracks', icon: '🎵', desc: 'Streaming music catalog, audio duration, play counts, and release chronology.', cols: ['track_id INT (PK)', 'title VARCHAR', 'artist VARCHAR', 'genre VARCHAR', 'duration_sec INT', 'release_year INT', 'plays_count INT', 'is_explicit BOOLEAN'] },
    { name: 'GymMembers', label: 'GymMembers', icon: '🏋️', desc: 'Fitness club memberships, tier plans, monthly dues, and visit frequency.', cols: ['member_id INT (PK)', 'full_name VARCHAR', 'plan_type VARCHAR', 'monthly_fee DECIMAL', 'visits_per_month INT', 'join_date DATE', 'has_trainer BOOLEAN'] },
    { name: 'MovieReviews', label: 'MovieReviews', icon: '🎬', desc: 'Film ratings, film critics, star metrics, and verified audience feedback.', cols: ['review_id INT (PK)', 'movie_title VARCHAR', 'reviewer_name VARCHAR', 'rating_stars DECIMAL', 'review_year INT', 'is_verified_viewer BOOLEAN'] },
    { name: 'FlightSchedule', label: 'FlightSchedule', icon: '✈️', desc: 'Commercial air travel routes, origin/destination hubs, fares, and delays.', cols: ['flight_id INT (PK)', 'airline VARCHAR', 'origin_city VARCHAR', 'dest_city VARCHAR', 'departure_time TIME', 'duration_min INT', 'ticket_price DECIMAL', 'is_delayed BOOLEAN'] },
    { name: 'PetClinic', label: 'PetClinic', icon: '🐾', desc: 'Veterinary patient records, species, breeds, weights, and immunization records.', cols: ['pet_id INT (PK)', 'pet_name VARCHAR', 'species VARCHAR', 'breed VARCHAR', 'age_years INT', 'weight_kg DECIMAL', 'owner_name VARCHAR', 'vaccinated BOOLEAN'] }
  ];

  const activeTableObj = tables.find(t => t.name.toLowerCase() === (currentGymTable || 'all').toLowerCase()) || tables[0];

  let tabsHtml = '';
  tables.forEach(t => {
    const isActive = t.name.toLowerCase() === (currentGymTable || 'all').toLowerCase();
    tabsHtml += `
      <button class="gym-table-tab-btn ${isActive ? 'active' : ''}" data-table="${t.name}" onclick="selectGymTable('${t.name}')">
        <span>${t.icon}</span> ${t.label}
      </button>
    `;
  });

  let detailBoxHtml = '';
  if (activeTableObj.name !== 'all' && activeTableObj.cols && activeTableObj.cols.length > 0) {
    const colsHtml = activeTableObj.cols.map(c => {
      const isPk = c.includes('(PK)');
      return `<span class="gym-col-chip ${isPk ? 'pk' : ''}">${escapeHtml(c)}</span>`;
    }).join('');

    detailBoxHtml = `
      <div class="gym-table-detail-box">
        <div class="gym-table-meta-row">
          <div class="gym-table-meta-info">
            <span style="font-size: 16px;">${activeTableObj.icon}</span>
            <strong style="color: var(--text-primary); font-size: 13px;">${activeTableObj.name}</strong>
            <span class="gym-table-schema-code">${activeTableObj.cols.length} Columns</span>
          </div>
          <p style="font-size: 11.5px; color: var(--text-muted); margin: 0;">${activeTableObj.desc}</p>
        </div>
        <div class="gym-table-cols-list">
          ${colsHtml}
        </div>
      </div>
    `;
  } else {
    detailBoxHtml = `
      <div class="gym-table-detail-box" style="padding: 10px 14px;">
        <p style="font-size: 11.5px; color: var(--text-secondary); margin: 0;">
          💡 <strong>Punctuation &amp; Clause Muscle Memory:</strong> Click any of the 10 everyday schemas above to filter drills, or choose a topic pill above (SELECT, WHERE, ORDER BY) to practice active retrieval.
        </p>
      </div>
    `;
  }

  browserEl.innerHTML = `
    <div class="gym-browser-header">
      <div class="gym-browser-title-wrap">
        <span class="gym-browser-badge">RELATIONAL DATA MATRIX</span>
        <div>
          <h3 class="gym-browser-title">🗄️ 10 Everyday Schemas Inspector</h3>
          <p class="gym-browser-subtitle">Punctuation &amp; clause muscle memory drills built exclusively on relatable everyday data.</p>
        </div>
      </div>
    </div>
    <div class="gym-tables-tabs-strip">
      ${tabsHtml}
    </div>
    ${detailBoxHtml}
  `;
}

window.selectGymTable = function(tableName) {
  currentGymTable = tableName;
  currentGymDisplayLimit = 30;
  if (window.soundFX) window.soundFX.playPop();
  renderSyntaxGym();
};

function renderSyntaxGym() {
  const container = document.getElementById('syntaxGymGrid');
  const countBadge = document.getElementById('gymCountBadge');
  const solvedCountSpan = document.getElementById('gymSolvedCount');
  if (!container) return;

  renderSyntaxGymTablesBrowser();

  // Retrieve 300 syntax drills directly from SYNTAX_GYM_DRILLS
  let allDrills = [];
  if (window.SYNTAX_GYM_DRILLS && window.SYNTAX_GYM_DRILLS.length > 0) {
    allDrills = window.SYNTAX_GYM_DRILLS.map((d, index) => {
      const num = d.drillNumber || (index + 1);
      return {
        id: `gym_${num}`,
        drillNumber: num,
        isGymDrill: true,
        section: "Section 0: Foundations & Syntax Gym",
        title: d.title,
        industry: "Foundations",
        table: d.table,
        difficulty: "Easy",
        scenario: d.scenario,
        businessObjective: d.businessObjective,
        schemaSnippet: d.schemaSnippet,
        targetQuery: d.targetQuery,
        syntaxBlueprint: d.syntaxBlueprint,
        syntaxRule: d.syntaxRule,
        syntaxTrap: d.syntaxTrap,
        eli5Story: d.eli5Story || `[SYNTAX BLUEPRINT]:\n${d.syntaxBlueprint}\n\n[RULE]: ${d.syntaxRule}\n\n[TRAP TO AVOID]: ${d.syntaxTrap}`,
        commonMistakes: d.commonMistakes,
        learningOutcomes: d.learningOutcomes,
        challengeSlots: d.challengeSlots
      };
    });
  }

  let filtered = allDrills.slice();

  // 1. Pillar filter ('select' = 1-100, 'where' = 101-200, 'order' = 201-300, 'aggregate' = 301-400, 'all' = 400)
  if (currentGymPillar === 'select') {
    filtered = filtered.filter(d => d.drillNumber >= 1 && d.drillNumber <= 100);
  } else if (currentGymPillar === 'where') {
    filtered = filtered.filter(d => d.drillNumber >= 101 && d.drillNumber <= 200);
  } else if (currentGymPillar === 'order') {
    filtered = filtered.filter(d => d.drillNumber >= 201 && d.drillNumber <= 300);
  } else if (currentGymPillar === 'aggregate') {
    filtered = filtered.filter(d => d.drillNumber >= 301 && d.drillNumber <= 400);
  }

  // 2. Table filter
  if (currentGymTable && currentGymTable !== 'all') {
    filtered = filtered.filter(d => d.table && d.table.toLowerCase() === currentGymTable.toLowerCase());
  }

  // 3. Search query filter
  if (currentGymSearch && currentGymSearch.trim() !== '') {
    const q = currentGymSearch.toLowerCase().trim();
    filtered = filtered.filter(d => 
      (d.title && d.title.toLowerCase().includes(q)) ||
      (d.scenario && d.scenario.toLowerCase().includes(q)) ||
      (d.businessObjective && d.businessObjective.toLowerCase().includes(q)) ||
      (d.table && d.table.toLowerCase().includes(q)) ||
      (d.targetQuery && d.targetQuery.toLowerCase().includes(q)) ||
      (d.subcluster && d.subcluster.toLowerCase().includes(q))
    );
  }

  // Update counts on UI badges
  if (countBadge) {
    countBadge.textContent = `${filtered.length} Drills`;
  }
  if (solvedCountSpan && window.CASE_BLANKS_ENGINE) {
    const solvedTotal = allDrills.filter(d => window.CASE_BLANKS_ENGINE.isSolved(d.id)).length;
    solvedCountSpan.textContent = solvedTotal;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted);">
        <p style="font-size: 14px; margin-bottom: 8px;">No syntax drills match current filters.</p>
        <button class="card-nav-btn" onclick="currentGymSearch = ''; currentGymTable = 'all'; currentGymPillar = 'all'; renderSyntaxGym();">Reset All Filters</button>
      </div>
    `;
    return;
  }

  const totalMatching = filtered.length;
  const visibleDrills = filtered.slice(0, currentGymDisplayLimit);

  let html = '';
  visibleDrills.forEach(drill => {
    html += renderCaseCardHtml(drill);
  });

  if (totalMatching > currentGymDisplayLimit) {
    html += `
      <div style="grid-column: 1 / -1; display: flex; justify-content: center; gap: 12px; padding: 24px 10px; align-items: center; flex-wrap: wrap;">
        <button class="btn-solve-in-studio" id="btnLoadMoreGymDrills" style="padding: 10px 24px; font-size: 13px; font-weight: 700;">
          ⬇️ Load Next 30 Drills (${Math.min(currentGymDisplayLimit, totalMatching)} of ${totalMatching} Shown)
        </button>
        <button class="card-nav-btn" id="btnLoadAllGymDrills" style="padding: 10px 18px; font-size: 12px;">
          ⚡ Load All ${totalMatching} Drills
        </button>
      </div>
    `;
  }

  container.innerHTML = html;

  const btnMore = container.querySelector('#btnLoadMoreGymDrills');
  if (btnMore) {
    btnMore.addEventListener('click', () => {
      currentGymDisplayLimit += 30;
      renderSyntaxGym();
    });
  }
  const btnAll = container.querySelector('#btnLoadAllGymDrills');
  if (btnAll) {
    btnAll.addEventListener('click', () => {
      currentGymDisplayLimit = totalMatching;
      renderSyntaxGym();
    });
  }
}
window.renderSyntaxGym = renderSyntaxGym;

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
// TOPIC PATHWAYS & 4-STAGE MODULAR LEARNING PIPELINE ENGINE
// =============================================================================

const TOPIC_PATHWAY_MODULES = [
  {
    id: "mod_foundations",
    num: "01",
    title: "SQL Foundations & Execution Pipeline",
    icon: "🏛️",
    tagline: "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT",
    caseSection: "Section 2: Physical Query Execution Order & Projections",
    mcqKeywords: ["SELECT", "FROM"],
    studySectionId: "sec_execution_order",
    labTrackId: "track01",
    trapsModuleId: "mod_foundations",
    caseCount: 100,
    mcqCount: 200,
    trapsCount: 4,
    tipsCount: 2,
    interviewCount: 2
  },
  {
    id: "mod_filtering",
    num: "02",
    title: "Filtering, Predicates & Three-Valued Logic",
    icon: "🎯",
    tagline: "WHERE, LIKE, REGEXP, NOT, IN, NULL semantics & SARGable ranges",
    caseSection: "Section 3: Filtering, Predicates & Three-Valued Logic",
    mcqKeywords: ["WHERE"],
    studySectionId: "sec_filtering",
    labTrackId: "track01",
    trapsModuleId: "mod_foundations",
    caseCount: 100,
    mcqCount: 100,
    trapsCount: 3,
    tipsCount: 1,
    interviewCount: 1
  },
  {
    id: "mod_sorting",
    num: "03",
    title: "Sorting, Determinism & Slicing",
    icon: "🔢",
    tagline: "ORDER BY, LIMIT, OFFSET, LENGTH() expressions & tie-breakers",
    caseSection: "Section 5: Sorting, Determinism & Slicing",
    mcqKeywords: ["ORDER BY & LIMIT"],
    studySectionId: "sec_sorting",
    labTrackId: "track01",
    trapsModuleId: "mod_foundations",
    caseCount: 100,
    mcqCount: 100,
    trapsCount: 2,
    tipsCount: 1,
    interviewCount: 1
  },
  {
    id: "mod_casewhen",
    num: "04",
    title: "Conditional Logic & CASE WHEN Decision Trees",
    icon: "⚖️",
    tagline: "Simple vs Searched CASE, Short-circuiting, Pivot Reporting & NULLs",
    caseSection: "Section 3: Filtering, Predicates & Three-Valued Logic",
    mcqKeywords: ["WHERE", "SELECT"],
    studySectionId: "sec_casewhen",
    labTrackId: "track02",
    trapsModuleId: "mod_casewhen",
    caseCount: 100,
    mcqCount: 200,
    trapsCount: 3,
    tipsCount: 2,
    interviewCount: 1
  },
  {
    id: "mod_aggregations",
    num: "05",
    title: "Basic & Statistical Aggregations (GROUP BY)",
    icon: "📊",
    tagline: "COUNT, SUM, AVG, MIN, MAX, GROUP BY buckets, HAVING filters & Variance",
    caseSection: "Section 6: Aggregations, Statistical Metrics & GROUP BY",
    mcqKeywords: ["COUNT", "SUM", "AVG", "MIN & MAX", "GROUP BY", "HAVING"],
    studySectionId: "sec_aggregations",
    labTrackId: "track03",
    trapsModuleId: "mod_aggregations",
    caseCount: 100,
    mcqCount: 600,
    trapsCount: 3,
    tipsCount: 1,
    interviewCount: 1
  },
  {
    id: "mod_math",
    num: "06",
    title: "Spatial Coordinates, Math Functions & Medians",
    icon: "📐",
    tagline: "ROUND, TRUNCATE, ABS, SQRT, POW, Manhattan, Euclidean & Medians",
    caseSection: "Section 7: Spatial Coordinates, Math Functions & Medians",
    mcqKeywords: ["MATH & MEDIANS"],
    studySectionId: "sec_math",
    labTrackId: "track01",
    trapsModuleId: "mod_aggregations",
    caseCount: 50,
    mcqCount: 100,
    trapsCount: 2,
    tipsCount: 1,
    interviewCount: 1
  },
  {
    id: "mod_joins",
    num: "07",
    title: "Relational Multi-Table Joins (FA / DA / BA)",
    icon: "🔗",
    tagline: "INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF, NON-EQUI & Physical Plans",
    caseSection: "Section 8: Relational Joins & Financial Data Modeling",
    mcqKeywords: [
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "FULL OUTER JOIN",
      "CROSS JOIN",
      "ANTI-JOIN",
      "SEMI-JOIN",
      "SELF-JOIN",
      "NON-EQUI JOIN",
      "JOIN ALGORITHMS"
    ],
    studySectionId: "sec_joins",
    labTrackId: "track04",
    trapsModuleId: "mod_joins",
    caseCount: 390,
    mcqCount: 350,
    trapsCount: 4,
    tipsCount: 2,
    interviewCount: 2
  },
  {
    id: "mod_architecture",
    num: "08",
    title: "Database Architecture & Physical Storage",
    icon: "🏛️",
    tagline: "ACID, B-Tree Indexes, OLTP vs OLAP, Buffer Pools & Normalization",
    caseSection: "Section 1: Database Theory & Architecture",
    mcqKeywords: ["SELECT", "FROM"],
    studySectionId: "sec_theory_architecture",
    labTrackId: "track01",
    trapsModuleId: "mod_architecture",
    caseCount: 100,
    mcqCount: 200,
    trapsCount: 2,
    tipsCount: 1,
    interviewCount: 1
  },
  {
    id: "mod_intermediate_joins",
    num: "09",
    title: "Intermediate Joins, Chains & Set Operations",
    icon: "🔀",
    tagline: "BETWEEN non-equi joins, 4-table chains, Self-Joins & UNION/EXCEPT",
    caseSection: "Section 8: Relational Joins & Financial Data Modeling",
    mcqKeywords: ["JOINS"],
    studySectionId: "sec_intermediate_joins",
    labTrackId: "track04",
    trapsModuleId: "mod_joins",
    caseCount: 390,
    mcqCount: 100,
    trapsCount: 2,
    tipsCount: 1,
    interviewCount: 1
  },
  {
    id: "mod_subqueries",
    num: "10",
    title: "Subqueries, Derived Tables & Correlated Logic",
    icon: "🎯",
    tagline: "Scalar, Derived in FROM, Correlated loops, EXISTS vs IN & Semi-Joins",
    caseSection: "Section 3: Filtering, Predicates & Three-Valued Logic",
    mcqKeywords: ["WHERE", "SELECT"],
    studySectionId: "sec_subqueries",
    labTrackId: "track01",
    trapsModuleId: "mod_foundations",
    caseCount: 100,
    mcqCount: 100,
    trapsCount: 2,
    tipsCount: 1,
    interviewCount: 1
  },
  {
    id: "mod_ctes",
    num: "11",
    title: "Common Table Expressions (CTEs) & Recursion",
    icon: "🌲",
    tagline: "WITH pipelines, Inlining vs Materialization, WITH RECURSIVE & Date Trees",
    caseSection: "Section 2: Physical Query Execution Order & Projections",
    mcqKeywords: ["SELECT", "FROM"],
    studySectionId: "sec_ctes",
    labTrackId: "track01",
    trapsModuleId: "mod_foundations",
    caseCount: 100,
    mcqCount: 100,
    trapsCount: 2,
    tipsCount: 1,
    interviewCount: 1
  }
];

let currentPathwayModuleId = 'mod_foundations';
let currentPathwayStage = 1;
let pathwayCaseViewMode = 'compact';
let pathwayCaseDiffFilter = 'all';
let currentPathwayMcqIndex = 0;
let pathwayMcqAnsweredState = {};

function renderTopicPathways() {
  const navContainer = document.getElementById('pathwayModulesNav');
  if (!navContainer) return;

  // 1. Render Module Selection Cards
  let navHtml = '';
  TOPIC_PATHWAY_MODULES.forEach(mod => {
    const isActive = mod.id === currentPathwayModuleId;
    navHtml += `
      <button class="pathway-mod-card ${isActive ? 'active' : ''}" onclick="selectPathwayModule('${mod.id}')">
        <div class="pathway-mod-top">
          <span class="pathway-mod-icon">${mod.icon}</span>
          <span class="pathway-mod-badge">MOD ${mod.num}</span>
        </div>
        <div class="pathway-mod-title">${mod.title}</div>
        <div class="pathway-mod-meta">
          <span>💼 ${mod.caseCount} Cases</span>
          <span>&bull;</span>
          <span>🧠 ${mod.mcqCount} Qs</span>
        </div>
      </button>
    `;
  });
  navContainer.innerHTML = navHtml;

  // 2. Synchronize Stepper UI
  document.querySelectorAll('.pathway-stage-btn').forEach(btn => {
    const s = parseInt(btn.dataset.stage, 10);
    if (s === currentPathwayStage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 3. Show Active Stage Panel
  for (let i = 1; i <= 4; i++) {
    const panel = document.getElementById(`pathwayStagePanel_${i}`);
    if (panel) {
      panel.classList.toggle('active', i === currentPathwayStage);
    }
  }

  // 4. Render Active Stage Content
  if (currentPathwayStage === 1) renderPathwayMasterclass();
  if (currentPathwayStage === 2) renderPathwayTrapsAndSecrets();
  if (currentPathwayStage === 3) renderPathwayMcqs();
  if (currentPathwayStage === 4) renderPathwayCaseStudies();
}

function selectPathwayModule(moduleId) {
  currentPathwayModuleId = moduleId;
  currentPathwayMcqIndex = 0;
  if (window.soundFX) window.soundFX.playPop();
  renderTopicPathways();
}

function selectPathwayStage(stageNum) {
  currentPathwayStage = stageNum;
  if (window.soundFX) window.soundFX.playPop();
  renderTopicPathways();
}

// -----------------------------------------------------------------------------
// STAGE 1: 📖 VISUAL MASTERCLASS
// -----------------------------------------------------------------------------
function renderPathwayMasterclass() {
  const container = document.getElementById('pathwayMasterclassContent');
  if (!container) return;

  const currentMod = TOPIC_PATHWAY_MODULES.find(m => m.id === currentPathwayModuleId) || TOPIC_PATHWAY_MODULES[0];

  // Pull textbook study material from STUDY_LIBRARY
  const studyItem = window.STUDY_LIBRARY ? window.STUDY_LIBRARY.find(s => s.id === currentMod.studySectionId) : null;
  if (!studyItem) {
    container.innerHTML = `
      <div class="card" style="border: 3px solid #000; box-shadow: 5px 5px 0px #000; border-radius: 16px; padding: 24px; background: var(--bg-card);">
        <p style="font-weight: 700; color: var(--text-secondary);">Masterclass content loading for ${currentMod.title}...</p>
      </div>
    `;
    return;
  }

  // If Joins module, embed an interactive lab launcher card banner
  let joinsLabBanner = '';
  if (currentMod.id === 'mod_joins') {
    joinsLabBanner = `
      <div style="background: #fdf4ff; border: 3px solid #000; box-shadow: 4px 4px 0px #000; border-radius: 14px; padding: 18px 20px; margin-bottom: 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="max-width: 650px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span style="background: #c084fc; color: #000; font-size: 10.5px; font-weight: 900; padding: 3px 8px; border: 2px solid #000; border-radius: 6px; box-shadow: 2px 2px 0px #000; text-transform: uppercase;">HANDS-ON SIMULATION</span>
            <span style="background: #fef08a; color: #000; font-size: 10.5px; font-weight: 900; padding: 3px 8px; border: 2px solid #000; border-radius: 6px; box-shadow: 2px 2px 0px #000;">8-STEP DUAL-TABLE LAB</span>
          </div>
          <h3 style="font-size: 16px; font-weight: 900; color: #000; margin: 0 0 4px 0;">Interactive Relational Joins Visualizer &amp; Linker</h3>
          <p style="font-size: 12.5px; color: #374151; margin: 0; line-height: 1.45; font-weight: 600;">
            Step through physical dual-table joins (INNER, LEFT, ANTI, FULL OUTER) row-by-row with live pointer evaluation and corporate schema projections.
          </p>
        </div>
        <button class="action-btn action-btn-primary" onclick="switchNavTab('viewGuidedLab'); if (window.switchGuidedTrack) window.switchGuidedTrack('track04');" style="background: #a855f7; color: #ffffff; font-weight: 900; border: 2.5px solid #000; box-shadow: 3px 3px 0px #000; border-radius: 8px; padding: 9px 18px; font-size: 13px; cursor: pointer; text-decoration: none;">
          🚀 Open Interactive Joins Lab &rarr;
        </button>
      </div>
    `;
  }

  let sectionsHtml = '';
  if (studyItem.sections && studyItem.sections.length > 0) {
    studyItem.sections.forEach((sec, idx) => {
      let formattedContent = sec.content
        .replace(/```sql([\s\S]*?)```/g, '<div class="study-code-snippet" style="background: #080c14; color: #f8fafc; border: 2px solid #000; border-radius: 8px; padding: 12px 14px; margin: 12px 0; font-family: var(--font-mono); font-size: 12px; line-height: 1.5; overflow-x: auto; box-shadow: 2px 2px 0px #000;">$1</div>')
        .replace(/`([^`]+)`/g, '<code style="background: #fef08a; color: #000000; padding: 2px 6px; border: 1.5px solid #000; border-radius: 4px; font-weight: 800; font-size: 0.9em; box-shadow: 1px 1px 0px #000;">$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #ffffff; font-weight: 800;">$1</strong>')
        .replace(/\n\n/g, '</p><p style="margin-top: 10px;">')
        .replace(/\n- /g, '<br>&bull; ')
        .replace(/\n\d+\. /g, (m) => `<br><strong>${m.trim()}</strong> `);

      const sectionPills = ['#38bdf8', '#34d399', '#fbbf24', '#f472b6', '#a78bfa'];
      const pillColor = sectionPills[idx % sectionPills.length];

      sectionsHtml += `
        <div class="study-section-block" style="margin-bottom: 18px; background: #121218; border: 2.5px solid #000; border-radius: 12px; padding: 18px 20px; box-shadow: 3px 3px 0px #000;">
          <h3 class="study-section-heading" style="font-size: 15.5px; font-weight: 900; color: #ffffff; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
            <span style="background: ${pillColor}; color: #000; font-size: 11px; font-weight: 900; padding: 2px 8px; border: 2px solid #000; border-radius: 5px; box-shadow: 1.5px 1.5px 0px #000;">PART ${idx + 1}</span>
            ${sec.heading}
          </h3>
          <div class="study-section-content" style="font-size: 13px; color: #d4d4d8; line-height: 1.65;">
            <p style="margin: 0;">${formattedContent}</p>
          </div>
        </div>
      `;
    });
  }

  // Interview Gotchas / MCQ traps block
  let gotchasHtml = '';
  if (studyItem.interviewGotchas && studyItem.interviewGotchas.length > 0) {
    let gotchaCards = studyItem.interviewGotchas.map(g => `
      <div style="margin-top: 10px; padding: 12px 14px; background: #ffffff; border: 2.5px solid #000; border-radius: 9px; box-shadow: 3px 3px 0px #000;">
        <div style="font-weight: 900; color: #b91c1c; font-size: 13px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          <span>⚠️</span> <span>${g.title}</span>
        </div>
        <div style="color: #1e293b; font-size: 12.5px; line-height: 1.5; font-weight: 600;">
          ${g.trap}
        </div>
      </div>
    `).join('');

    gotchasHtml = `
      <div style="margin-top: 22px; padding: 18px; background: #fff1f2; border: 3px solid #000; border-radius: 14px; box-shadow: 4px 4px 0px #000;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #f43f5e; color: #ffffff; font-size: 11px; font-weight: 900; padding: 3px 8px; border: 2px solid #000; border-radius: 6px; box-shadow: 2px 2px 0px #000; text-transform: uppercase;">
              CRITICAL TRAPS VAULT
            </span>
            <strong style="color: #000000; font-size: 14.5px; font-weight: 900;">Directly Tested in MCQs &amp; Case Studies</strong>
          </div>
          <span style="font-size: 11px; font-family: var(--font-mono); color: #881337; font-weight: 800;">
            ${studyItem.interviewGotchas.length} INTERVIEW GOTCHAS
          </span>
        </div>
        <p style="font-size: 12.5px; color: #475569; margin: 0 0 10px 0; font-weight: 600;">
          Master these exact high-stakes edge cases before starting the 1,200 Technical MCQs and 1,040 Real-World Case Studies.
        </p>
        ${gotchaCards}
      </div>
    `;
  }

  let svgHtml = studyItem.svgDiagram ? `
    <div style="margin: 20px 0; background: #000000; border: 3px solid #000000; border-radius: 14px; padding: 10px; overflow-x: auto; box-shadow: 4px 4px 0px #000000;">
      ${studyItem.svgDiagram}
    </div>
  ` : '';

  container.innerHTML = `
    <div class="card" style="border: 3px solid #000000 !important; border-radius: 18px !important; box-shadow: 5px 5px 0px #000000 !important; background: var(--bg-card); margin-bottom: 24px; padding: 24px;">
      <div class="card-header" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span style="background: #fef08a; color: #000; font-size: 11px; font-weight: 900; padding: 3px 8px; border: 2px solid #000; border-radius: 6px; box-shadow: 2px 2px 0px #000; text-transform: uppercase;">
              STAGE 1: VISUAL MASTERCLASS
            </span>
            <span style="background: #e0e7ff; color: #3730a3; font-size: 11px; font-weight: 800; padding: 3px 8px; border: 2px solid #000; border-radius: 6px; box-shadow: 2px 2px 0px #000;">
              ${studyItem.readTime || '12 min read'}
            </span>
          </div>
          <h2 style="font-size: 20px; color: #ffffff; font-weight: 900; margin: 0; letter-spacing: -0.3px;">${studyItem.title}</h2>
        </div>
        <button class="action-btn action-btn-primary" onclick="selectPathwayStage(2)" style="background: #22c55e !important; color: #000000 !important; font-weight: 900; border: 2.5px solid #000 !important; box-shadow: 3px 3px 0px #000 !important; border-radius: 8px; padding: 8px 18px; font-size: 13px; cursor: pointer;">
          Stage 2: Traps &amp; Secrets &rarr;
        </button>
      </div>
      <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.55; margin: 0 0 16px 0; font-weight: 500;">
        ${studyItem.summary}
      </p>
      ${joinsLabBanner}
      ${svgHtml}
      ${sectionsHtml}
      ${gotchasHtml}
    </div>
  `;
}

// -----------------------------------------------------------------------------
// HELPER: FORMAT & SYNTAX-HIGHLIGHT SQL QUERIES WITH MULTI-LINE INDENTATION
// -----------------------------------------------------------------------------
function formatAndHighlightSQL(sql, isBad) {
  if (!sql) return '';
  let formattedSql = sql.trim();
  // If query is on one line but contains major SQL clauses, insert newlines before clauses for clean formatting
  if (!formattedSql.includes('\n')) {
    formattedSql = formattedSql.replace(/\s+(FROM|WHERE|INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|FULL\s+JOIN|CROSS\s+JOIN|GROUP\s+BY|HAVING|ORDER\s+BY|LIMIT|OFFSET)\b/gi, '\n$1');
  }
  const lines = formattedSql.split('\n');
  const processed = [];
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();
    if (!trimmed) {
      processed.push('');
      continue;
    }
    if (trimmed.startsWith('--') || trimmed.startsWith('/*')) {
      const commentColor = isBad ? '#fca5a5' : '#86efac';
      processed.push(`<span class="sql-token-comment" style="color: ${commentColor}; font-style: italic; font-weight: 600;">${escapeHtml(raw)}</span>`);
    } else {
      const inlineCommentIdx = raw.indexOf('--');
      if (inlineCommentIdx > 0) {
        const codePart = raw.slice(0, inlineCommentIdx);
        const commentPart = raw.slice(inlineCommentIdx);
        const highlightedCode = (window.CASE_DOSSIER_ENGINE && window.CASE_DOSSIER_ENGINE.highlightSQL)
          ? window.CASE_DOSSIER_ENGINE.highlightSQL(codePart)
          : escapeHtml(codePart);
        const commentColor = isBad ? '#fca5a5' : '#86efac';
        processed.push(`${highlightedCode}<span class="sql-token-comment" style="color: ${commentColor}; font-style: italic; font-weight: 600;">${escapeHtml(commentPart)}</span>`);
      } else {
        if (window.CASE_DOSSIER_ENGINE && window.CASE_DOSSIER_ENGINE.highlightSQL) {
          processed.push(window.CASE_DOSSIER_ENGINE.highlightSQL(raw));
        } else {
          processed.push(escapeHtml(raw));
        }
      }
    }
  }
  return processed.join('\n');
}

// -----------------------------------------------------------------------------
// STAGE 2: ⚠️ TRAPS, GOTCHAS & INTERVIEW SECRETS
// -----------------------------------------------------------------------------
function renderPathwayTrapsAndSecrets() {
  const container = document.getElementById('pathwayTrapsContent');
  if (!container || !window.TRAPS_INTERVIEW_SECRETS) return;

  const currentMod = TOPIC_PATHWAY_MODULES.find(m => m.id === currentPathwayModuleId) || TOPIC_PATHWAY_MODULES[0];
  const trapsData = window.TRAPS_INTERVIEW_SECRETS.modules.find(m => m.moduleId === currentMod.trapsModuleId);

  if (!trapsData) {
    container.innerHTML = `<div class="card"><p>Traps &amp; Interview secrets for this module will be compiled shortly.</p></div>`;
    return;
  }

  // 1. Traps Deck
  let trapsHtml = '';
  trapsData.traps.forEach(trap => {
    const badgeClass = trap.severity === 'FATAL' ? 'trap-badge-fatal' : 'trap-badge-critical';
    trapsHtml += `
      <div class="trap-card">
        <div class="trap-card-header">
          <div class="trap-card-title">${escapeHtml(trap.title)}</div>
          <span class="${badgeClass}">${trap.severity}</span>
        </div>

        <div class="trap-diff-grid">
          <div class="trap-code-box bad">
            <div class="trap-box-header">
              <span>❌ Buggy Anti-Pattern</span>
              <div class="trap-terminal-dots">
                <span class="dot-r"></span>
                <span class="dot-y"></span>
                <span class="dot-g"></span>
              </div>
            </div>
            <pre class="trap-code-content"><code>${formatAndHighlightSQL(trap.badSql, true)}</code></pre>
          </div>
          <div class="trap-code-box good">
            <div class="trap-box-header">
              <span>✅ Production Fix</span>
              <div class="trap-terminal-dots">
                <span class="dot-r"></span>
                <span class="dot-y"></span>
                <span class="dot-g"></span>
              </div>
            </div>
            <pre class="trap-code-content"><code>${formatAndHighlightSQL(trap.goodSql, false)}</code></pre>
          </div>
        </div>

        <div class="trap-explanation-box">
          <strong style="color: var(--text-primary);">⚙️ Why It Breaks:</strong> ${trap.whyItBreaks}
        </div>

        <div class="trap-impact-callout">
          <strong style="color: #f43f5e;">🚨 Corporate Impact:</strong> ${trap.corporateImpact}
        </div>
      </div>
    `;
  });

  // 2. Tips & Tricks Deck
  let tipsHtml = '';
  trapsData.tipsAndTricks.forEach(tip => {
    tipsHtml += `
      <div class="tip-card">
        <div class="tip-card-header">
          <div class="tip-card-title">${escapeHtml(tip.title)}</div>
          <span class="tip-concept-pill">${escapeHtml(tip.concept)}</span>
        </div>
        <div class="tip-code-block">
          <div class="trap-box-header" style="background: rgba(16, 185, 129, 0.15); color: #86efac; border-bottom: 1px solid rgba(16, 185, 129, 0.35);">
            <span>⚡ Tactical Code &amp; Execution Blueprint</span>
            <div class="trap-terminal-dots">
              <span class="dot-r"></span>
              <span class="dot-y"></span>
              <span class="dot-g"></span>
            </div>
          </div>
          <pre class="trap-code-content"><code>${formatAndHighlightSQL(tip.codeSnippet, false)}</code></pre>
        </div>
        <div style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.55;">
          ${tip.explanation}
        </div>
        <div class="tip-analyst-value">
          <strong style="color: #0284c7;">💡 Analyst Value:</strong> ${tip.analystValue}
        </div>
      </div>
    `;
  });

  // 3. Spoken-Word Interview Questions
  let interviewHtml = '';
  trapsData.interviewQuestions.forEach(item => {
    interviewHtml += `
      <div class="interview-flashcard">
        <div class="interview-card-meta">
          <span class="interview-diff-pill">${escapeHtml(item.difficulty)}</span>
          <span class="clause-pill pill-where" style="font-size: 10px; font-weight: 800;">${escapeHtml(item.testedConcept)}</span>
        </div>
        <div class="interview-question-text">
          "${escapeHtml(item.question)}"
        </div>
        <div class="interview-intent-box">
          <strong style="color: #d97706;">🎯 What the Interviewer is REALLY Testing:</strong><br>${escapeHtml(item.interviewerIntent)}
        </div>
        <div class="interview-spoken-answer-box">
          <span class="interview-spoken-label">🎙️ Exact Spoken-Word Model Answer:</span>
          <div class="interview-spoken-text">"${escapeHtml(item.spokenAnswer)}"</div>
        </div>
        ${item.sqlSnippet ? `
          <div class="tip-code-block" style="margin-top: 6px; border-color: #8b5cf6; box-shadow: 3px 3px 0px rgba(139, 92, 246, 0.35);">
            <div class="trap-box-header" style="background: rgba(139, 92, 246, 0.15); color: #c4b5fd; border-bottom: 1px solid rgba(139, 92, 246, 0.35);">
              <span>💡 SQL Query Pattern</span>
              <div class="trap-terminal-dots">
                <span class="dot-r"></span>
                <span class="dot-y"></span>
                <span class="dot-g"></span>
              </div>
            </div>
            <pre class="trap-code-content"><code>${formatAndHighlightSQL(item.sqlSnippet, false)}</code></pre>
          </div>
        ` : ''}
      </div>
    `;
  });

  container.innerHTML = `
    <div class="traps-deck-container">
      <!-- Section A: Lethal Traps -->
      <div class="traps-section-block">
        <div class="traps-section-banner">
          <h3 class="traps-section-heading">
            <span>🛑 Deadly Production Traps &amp; Silent Corruption Bugs</span>
          </h3>
          <span class="status-pill" style="color: #f43f5e; border-color: rgba(244, 63, 94, 0.3); font-weight: 800;">${trapsData.traps.length} Lethal Pitfalls</span>
        </div>
        <div class="traps-grid">
          ${trapsHtml}
        </div>
      </div>

      <!-- Section B: Senior Analyst Tips & Tricks -->
      <div class="traps-section-block">
        <div class="traps-section-banner">
          <h3 class="traps-section-heading">
            <span>💡 Senior Analyst Tips &amp; SQL Intricacies</span>
          </h3>
          <span class="status-pill" style="color: #10b981; border-color: rgba(16, 185, 129, 0.3); font-weight: 800;">${trapsData.tipsAndTricks.length} Tactical Tricks</span>
        </div>
        <div class="traps-grid">
          ${tipsHtml}
        </div>
      </div>

      <!-- Section C: Corporate Technical Interview Flashcards -->
      <div class="traps-section-block">
        <div class="traps-section-banner">
          <h3 class="traps-section-heading">
            <span>🎙️ Spoken-Word Corporate Technical Interview Questions</span>
          </h3>
          <span class="status-pill" style="color: #8b5cf6; border-color: rgba(139, 92, 246, 0.3); font-weight: 800;">${trapsData.interviewQuestions.length} Model Answers</span>
        </div>
        <div class="traps-grid">
          ${interviewHtml}
        </div>
      </div>

      <!-- Footer CTA to proceed to MCQs -->
      <div style="display: flex; justify-content: flex-end; padding-top: 10px;">
        <button class="action-btn action-btn-primary" onclick="selectPathwayStage(3)" style="padding: 10px 20px; font-size: 13px; font-weight: 800; border: 2px solid #000; box-shadow: 2px 2px 0px #000;">
          Mastered Traps! Test Knowledge in Stage 3: MCQs &rarr;
        </button>
      </div>
    </div>
  `;
}

// -----------------------------------------------------------------------------
// STAGE 3: 🧠 TOPIC MCQS
// -----------------------------------------------------------------------------
function getPathwayTopicMcqs() {
  const currentMod = TOPIC_PATHWAY_MODULES.find(m => m.id === currentPathwayModuleId) || TOPIC_PATHWAY_MODULES[0];
  const targetKeywords = currentMod.mcqKeywords || (currentMod.mcqKeyword ? [currentMod.mcqKeyword] : ['SELECT']);
  return (window.MCQS_VAULT_500 || []).filter(m => targetKeywords.includes(m.keyword));
}

function renderPathwayMcqs() {
  const container = document.getElementById('pathwayMcqsContent');
  if (!container || !window.MCQS_VAULT_500) return;

  const allTopicMcqs = getPathwayTopicMcqs();

  if (allTopicMcqs.length === 0) {
    container.innerHTML = `<div class="card"><p>No MCQs mapped for this module.</p></div>`;
    return;
  }

  if (currentPathwayMcqIndex >= allTopicMcqs.length) {
    currentPathwayMcqIndex = 0;
  }

  const q = allTopicMcqs[currentPathwayMcqIndex];
  const ansState = pathwayMcqAnsweredState[q.id];

  let optionsHtml = '';
  q.options.forEach((opt, idx) => {
    let stateClass = '';
    let disabledAttr = '';
    let statusBadge = '';

    if (ansState) {
      disabledAttr = 'disabled';
      if (idx === q.correctIndex) {
        stateClass = 'neo-opt-correct';
        statusBadge = `<span class="neo-opt-status-pill correct">✓ Correct Answer</span>`;
      } else if (idx === ansState.selectedIndex && !ansState.isCorrect) {
        stateClass = 'neo-opt-wrong';
        statusBadge = `<span class="neo-opt-status-pill wrong">✗ Your Pick (Incorrect)</span>`;
      } else {
        stateClass = 'neo-opt-disabled';
      }
    }

    optionsHtml += `
      <button class="study-quiz-option-btn ${stateClass}" ${disabledAttr} onclick="handlePathwayMcqAnswer('${q.id}', ${idx})">
        <span class="mcq-opt-letter">${String.fromCharCode(65 + idx)}</span>
        <span class="mcq-opt-text">${escapeHtml(opt)}</span>
        ${statusBadge}
      </button>
    `;
  });

  let explanationHtml = '';
  if (ansState) {
    const isWin = ansState.isCorrect;
    explanationHtml = `
      <div class="neo-explanation-card ${isWin ? 'neo-exp-correct' : 'neo-exp-wrong'}">
        <div class="neo-exp-banner">
          <div class="neo-exp-badge">${isWin ? '🎉 EXCELLENT! CORRECT ANSWER' : '⚠️ BUSTED! DEEP BREAKDOWN'}</div>
          <span class="neo-exp-tag">ANSI SQL PROTOCOL</span>
        </div>
        <div class="neo-exp-body">
          ${escapeHtml(q.explanation)}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="card pathway-mcq-main-card">
      <div class="card-header" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="neo-tag-badge cyan">${q.keyword}</span>
          <span class="neo-tag-badge yellow">Question ${currentPathwayMcqIndex + 1} of ${allTopicMcqs.length}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <button class="neo-btn-sm pink" onclick="switchMainView('viewMcqs'); if(window.renderMcqs) window.renderMcqs('${q.keyword}');">
            🔍 Open All 100 in Vault &rarr;
          </button>
          <select class="neo-select-dropdown" onchange="jumpToPathwayMcq(this.value)">
            ${allTopicMcqs.map((_, i) => `<option value="${i}" ${i === currentPathwayMcqIndex ? 'selected' : ''}>Q${i + 1}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="neo-mcq-question-text">
        ${q.question}
      </div>

      <div class="study-quiz-options-grid" style="display: flex; flex-direction: column; gap: 12px;">
        ${optionsHtml}
      </div>

      ${explanationHtml}

      <div class="neo-mcq-footer-nav">
        <button class="neo-btn-nav" onclick="prevPathwayMcq()" ${currentPathwayMcqIndex === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
          &larr; Previous Question
        </button>

        <div style="display: flex; gap: 12px; align-items: center;">
          <button class="neo-btn-primary" onclick="nextPathwayMcq()">
            Next Question &rarr;
          </button>
          <button class="neo-btn-nav" onclick="selectPathwayStage(4)">
            Stage 4: Cases ➔
          </button>
        </div>
      </div>
    </div>
  `;
}

function handlePathwayMcqAnswer(qId, selectedIdx) {
  const q = (window.MCQS_VAULT_500 || []).find(m => m.id === qId);
  if (!q) return;

  const isCorrect = selectedIdx === q.correctIndex;
  pathwayMcqAnsweredState[qId] = { selectedIndex: selectedIdx, isCorrect };

  try {
    if (window.soundFX) {
      if (isCorrect) {
        if (typeof window.soundFX.playCorrect === 'function') window.soundFX.playCorrect();
        else if (typeof window.soundFX.playSuccess === 'function') window.soundFX.playSuccess();
        if (typeof window.soundFX.addXP === 'function') window.soundFX.addXP(10, 'MCQ Correct!');
      } else {
        if (typeof window.soundFX.playWrong === 'function') window.soundFX.playWrong();
        else if (typeof window.soundFX.playError === 'function') window.soundFX.playError();
      }
    }
  } catch (err) {
    console.warn('soundFX error caught:', err);
  }

  renderPathwayMcqs();
}

function nextPathwayMcq() {
  const allTopicMcqs = getPathwayTopicMcqs();
  if (currentPathwayMcqIndex < allTopicMcqs.length - 1) {
    currentPathwayMcqIndex++;
    if (window.soundFX) window.soundFX.playPop();
    renderPathwayMcqs();
  }
}

function prevPathwayMcq() {
  if (currentPathwayMcqIndex > 0) {
    currentPathwayMcqIndex--;
    if (window.soundFX) window.soundFX.playPop();
    renderPathwayMcqs();
  }
}

function jumpToPathwayMcq(idx) {
  currentPathwayMcqIndex = parseInt(idx, 10);
  if (window.soundFX) window.soundFX.playPop();
  renderPathwayMcqs();
}

// -----------------------------------------------------------------------------
// STAGE 4: 🛠️ CORPORATE CASE STUDIES (HIGH-DENSITY COMPACT TABLE & CARDS)
// -----------------------------------------------------------------------------
function renderPathwayCaseStudies() {
  const container = document.getElementById('pathwayCasesContent');
  if (!container || !window.ALL_1040_CASE_STUDIES) return;

  const currentMod = TOPIC_PATHWAY_MODULES.find(m => m.id === currentPathwayModuleId) || TOPIC_PATHWAY_MODULES[0];
  let allSectionCases = window.ALL_1040_CASE_STUDIES.filter(cs => cs.section && cs.section.includes(currentMod.caseSection));

  // If filter is active
  let displayCases = allSectionCases;
  if (pathwayCaseDiffFilter !== 'all') {
    displayCases = allSectionCases.filter(cs => cs.difficulty && cs.difficulty.toLowerCase() === pathwayCaseDiffFilter.toLowerCase());
  }

  // Count by difficulty
  const countEasy = allSectionCases.filter(cs => cs.difficulty === 'Easy').length;
  const countMed = allSectionCases.filter(cs => cs.difficulty === 'Medium').length;
  const countHard = allSectionCases.filter(cs => cs.difficulty === 'Hard').length;

  let bodyHtml = '';

  if (pathwayCaseViewMode === 'compact') {
    // High-Density Compact Table View
    let rowsHtml = '';
    displayCases.forEach(cs => {
      let diffClass = cs.difficulty === 'Easy' ? 'compact-diff-easy' : (cs.difficulty === 'Medium' ? 'compact-diff-medium' : 'compact-diff-hard');
      rowsHtml += `
        <tr class="compact-case-row" onclick="openCaseDrawer(${cs.id})" style="cursor: pointer;">
          <td class="compact-case-id">#${cs.id < 10 ? '00' + cs.id : (cs.id < 100 ? '0' + cs.id : cs.id)}</td>
          <td>
            <div class="compact-case-title">
              <span>${escapeHtml(cs.title)}</span>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 450px;">
              ${escapeHtml(cs.scenario)}
            </div>
          </td>
          <td><span class="case-industry-pill" style="font-size: 10px;">${cs.industry}</span></td>
          <td><span class="${diffClass}">${cs.difficulty}</span></td>
          <td><code class="case-code-pill" style="font-size: 10.5px;">${cs.table}</code></td>
          <td style="text-align: right;">
            <button class="compact-btn-solve" onclick="event.stopPropagation(); openCaseDrawer(${cs.id})">
              Solve &rarr;
            </button>
          </td>
        </tr>
      `;
    });

    bodyHtml = `
      <div class="compact-table-wrap">
        <table class="compact-case-table">
          <thead>
            <tr>
              <th style="width: 70px;">ID</th>
              <th>Scenario Title &amp; Business Context</th>
              <th style="width: 120px;">Industry</th>
              <th style="width: 90px;">Difficulty</th>
              <th style="width: 140px;">Table</th>
              <th style="width: 90px; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  } else {
    // Full Card View
    bodyHtml = `
      <div style="margin-top: 10px;">
        <button class="action-btn" onclick="switchNavTab('viewCases');" style="background: var(--bg-card); border: 1px solid var(--border-default); color: var(--text-primary); margin-bottom: 12px; font-size: 12px; padding: 6px 14px;">
          Open in Full Master Case Grid &rarr;
        </button>
      </div>
    `;
  }

  container.innerHTML = `
    <div>
      <div class="pathway-cases-toolbar">
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <span style="font-size: 13px; font-weight: 700; color: #fff;">
            ${currentMod.title}: <strong>${allSectionCases.length} Cases</strong>
          </span>
          <div class="case-diff-pills-row" style="display: flex; gap: 6px;">
            <button class="case-diff-filter-btn ${pathwayCaseDiffFilter === 'all' ? 'active' : ''}" onclick="filterPathwayCasesByDiff('all')">
              All (${allSectionCases.length})
            </button>
            <button class="case-diff-filter-btn case-diff-easy ${pathwayCaseDiffFilter === 'Easy' ? 'active' : ''}" onclick="filterPathwayCasesByDiff('Easy')">
              🟢 Easy (${countEasy})
            </button>
            <button class="case-diff-filter-btn case-diff-medium ${pathwayCaseDiffFilter === 'Medium' ? 'active' : ''}" onclick="filterPathwayCasesByDiff('Medium')">
              🟡 Medium (${countMed})
            </button>
            <button class="case-diff-filter-btn case-diff-hard ${pathwayCaseDiffFilter === 'Hard' ? 'active' : ''}" onclick="filterPathwayCasesByDiff('Hard')">
              🔴 Hard (${countHard})
            </button>
          </div>
        </div>

        <div class="pathway-view-toggle-wrap">
          <button class="pathway-view-toggle-btn ${pathwayCaseViewMode === 'compact' ? 'active' : ''}" onclick="togglePathwayCaseView('compact')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            Compact List
          </button>
          <button class="pathway-view-toggle-btn ${pathwayCaseViewMode === 'cards' ? 'active' : ''}" onclick="togglePathwayCaseView('cards')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Card Grid
          </button>
        </div>
      </div>

      ${bodyHtml}
    </div>
  `;
}

function filterPathwayCasesByDiff(diff) {
  pathwayCaseDiffFilter = diff;
  if (window.soundFX) window.soundFX.playPop();
  renderPathwayCaseStudies();
}

function togglePathwayCaseView(mode) {
  pathwayCaseViewMode = mode;
  if (window.soundFX) window.soundFX.playPop();
  renderPathwayCaseStudies();
}

// -----------------------------------------------------------------------------
// SLIDE-OUT CASE DOSSIER DRAWER (INTERACTIVE TOKEN PUZZLE WITH JUMBLED WORDS)
// -----------------------------------------------------------------------------
let activeDrawerCaseId = 1;

function navigateDrawerCase(step) {
  const allCases = window.ALL_1040_CASE_STUDIES || [];
  const currentMod = TOPIC_PATHWAY_MODULES.find(m => m.id === currentPathwayModuleId);
  let scopeCases = allCases;
  if (currentMod && currentMod.caseSection) {
    const modCases = allCases.filter(cs => cs.section && cs.section.includes(currentMod.caseSection));
    if (modCases.length > 0) scopeCases = modCases;
  }
  const currentIdx = scopeCases.findIndex(c => c.id === activeDrawerCaseId);
  let nextIdx = currentIdx + step;
  if (nextIdx < 0) nextIdx = scopeCases.length - 1;
  if (nextIdx >= scopeCases.length) nextIdx = 0;
  if (scopeCases[nextIdx]) {
    openCaseDrawer(scopeCases[nextIdx].id);
  }
}

function openCaseDrawer(caseId) {
  const allCases = window.ALL_1040_CASE_STUDIES || [];
  const cs = allCases.find(c => c.id === caseId);
  if (!cs) return;

  activeDrawerCaseId = caseId;

  const backdrop = document.getElementById('caseDrawerBackdrop');
  const badgeId = document.getElementById('drawerCaseIdBadge');
  const titleEl = document.getElementById('drawerCaseTitle');
  const body = document.getElementById('caseDrawerBody');

  if (!backdrop || !body) return;

  if (window.soundFX) window.soundFX.playPop();

  if (badgeId) badgeId.textContent = `#${cs.id < 10 ? '00' + cs.id : (cs.id < 100 ? '0' + cs.id : cs.id)}`;
  if (titleEl) titleEl.textContent = cs.title;

  const isSolved = window.CASE_BLANKS_ENGINE && window.CASE_BLANKS_ENGINE.isSolved(cs.id);
  const challenge = window.CASE_BLANKS_ENGINE ? window.CASE_BLANKS_ENGINE.createChallenge(cs) : null;
  const activeState = window.CASE_BLANKS_ENGINE ? window.CASE_BLANKS_ENGINE.getCaseState(cs.id) : { slots: {}, usedTokens: new Set() };
  const highlightedSolution = window.CASE_DOSSIER_ENGINE ? window.CASE_DOSSIER_ENGINE.highlightSQL(cs.targetQuery) : escapeHtml(cs.targetQuery);

  let queryBlockHtml = '';
  if (!challenge) {
    queryBlockHtml = `
      <div class="case-terminal-box">
        <div class="case-terminal-header">
          <span class="terminal-title">MySQL 8.0 &bull; Reference Query</span>
          <button class="study-sandbox-btn-sm" onclick="toggleCaseSolution(${cs.id})">👁️ Reveal Answer</button>
        </div>
        <div class="case-solution-shield" id="solution_${cs.id}" style="display: none; padding: 12px 14px; background: #0b0f17; border-radius: 8px;">
          <code>${highlightedSolution}</code>
        </div>
      </div>
    `;
  } else {
    // Challenge / Jumbled Token Bank Puzzle Mode
    let renderedMasked = escapeHtml(challenge.maskedQuery);
    for (const [slotId, slotInfo] of Object.entries(challenge.slots)) {
      const placedVal = activeState.slots[slotId] || '';
      const isFilled = Boolean(placedVal);
      const slotSpan = `
        <span class="query-slot-target ${isFilled ? 'filled' : ''}" 
              id="target_${cs.id}_${slotId}"
              data-case-id="${cs.id}" 
              data-slot-id="${slotId}" 
              onclick="handleSlotEject(${cs.id}, '${slotId}')"
              ondragover="handleSlotDragOver(event)"
              ondragleave="handleSlotDragLeave(event)"
              ondrop="handleSlotDrop(event, ${cs.id}, '${slotId}')"
              title="${isFilled ? 'Click to remove token' : 'Click a token below or drag here'}">
          ${isFilled ? `${escapeHtml(placedVal)} <span class="slot-eject-icon">✕</span>` : `[ ${slotId.toUpperCase()} ]`}
        </span>
      `;
      renderedMasked = renderedMasked.replace(`[[${slotId}]]`, slotSpan);
    }

    queryBlockHtml = `
      <div class="case-terminal-box">
        <div class="case-terminal-header">
          <div class="terminal-dots">
            <span class="terminal-dot dot-red"></span>
            <span class="terminal-dot dot-yellow"></span>
            <span class="terminal-dot dot-green"></span>
          </div>
          <span class="terminal-title">Interactive Canvas &bull; Fill the Missing Clauses</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            ${isSolved ? '<span class="status-pill terminal-solved-pill">✓ Solved (+15 XP)</span>' : '<span class="terminal-hint-pill">Click or drag chips into slots</span>'}
            <button class="study-sandbox-btn-sm" onclick="toggleCaseSolution(${cs.id})">👁️ Reveal Answer</button>
          </div>
        </div>
        <div class="case-terminal-code" id="canvas_code_${cs.id}">
          ${renderedMasked}
        </div>
      </div>

      <!-- Jumbled Token Bank Dock -->
      <div class="token-bank-dock" id="dock_${cs.id}">
        <div class="token-bank-header">
          <span>🏷️ <strong>Jumbled Keyword Bank:</strong> Click or drag into blanks</span>
          <div style="display: flex; gap: 6px;">
            <button class="token-bank-reset-btn" onclick="handleResetCase(${cs.id})">↺ Reset Slots</button>
            <button class="action-btn action-btn-primary" style="padding: 3px 10px; font-size: 11px;" onclick="handleVerifyCase(${cs.id})">✓ Check Query</button>
          </div>
        </div>
        <div class="token-chips-grid" id="chips_grid_${cs.id}">
          ${challenge.tokenBank.map(tok => {
            const isPlaced = activeState.usedTokens && activeState.usedTokens.has(tok.id);
            return `
              <button class="token-chip ${isPlaced ? 'placed' : ''}" 
                      id="chip_${tok.id}"
                      draggable="${!isPlaced}"
                      data-case-id="${cs.id}"
                      data-token-id="${tok.id}"
                      data-token-text="${escapeHtml(tok.text)}"
                      onclick="handleTokenClick(${cs.id}, '${tok.id}', '${escapeHtml(tok.text)}')"
                      ondragstart="handleTokenDragStart(event, ${cs.id}, '${tok.id}', '${escapeHtml(tok.text)}')">
                ${escapeHtml(tok.text)}
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Real-time Verification Feedback -->
      <div class="case-feedback-banner" id="feedback_${cs.id}" style="display: none;"></div>

      <!-- Collapsible Official Solution Shield (Hidden until Reveal Answer is clicked) -->
      <div class="case-solution-shield" id="solution_${cs.id}" style="display: none; margin-top: 10px;">
        <div class="solution-shield-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 11px; font-weight: 700; color: #10b981;">💡 Official Syntax-Highlighted Solution:</span>
          <button class="btn-case-action" style="padding: 2px 8px; font-size: 10px;" onclick="toggleCaseSolution(${cs.id})">Hide Solution</button>
        </div>
        <div class="case-terminal-code" style="padding: 12px 14px; background: #0b0f17; border-radius: 8px;">
          <code>${highlightedSolution}</code>
        </div>
      </div>
    `;
  }

  body.innerHTML = `
    <!-- Top Metadata -->
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="case-diff-filter-btn case-diff-${cs.difficulty.toLowerCase()} active">${cs.difficulty}</span>
        <span class="case-industry-pill">${cs.industry}</span>
        <span class="case-section-pill">${cs.section ? cs.section.split(':')[0] : 'Section'}</span>
      </div>
      <button class="action-btn" onclick="openCaseDossier(${cs.id})" style="font-size: 11px; padding: 4px 10px; background: var(--bg-card); border: 1px solid var(--border-default); color: #818cf8;">
        📖 Open Full Dossier &rarr;
      </button>
    </div>

    <!-- Scenario Brief -->
    <div style="background: var(--bg-card); border: 1px solid var(--border-muted); border-radius: var(--radius-md); padding: 14px 16px;">
      <div style="font-size: 10.5px; font-family: var(--font-mono); color: #818cf8; text-transform: uppercase; margin-bottom: 4px;">BUSINESS CONTEXT</div>
      <p style="font-size: 13px; color: var(--text-primary); line-height: 1.5; margin: 0 0 10px 0;">${escapeHtml(cs.scenario)}</p>
      <div style="font-size: 12px; color: #a5b4fc; background: rgba(99, 102, 241, 0.08); padding: 8px 12px; border-radius: var(--radius-xs); border-left: 3px solid #6366f1;">
        <strong>🎯 Objective:</strong> ${escapeHtml(cs.businessObjective)}
      </div>
    </div>

    <!-- Schema Snippet -->
    <div style="background: var(--bg-card); border: 1px solid var(--border-muted); border-radius: var(--radius-sm); padding: 10px 14px; font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary);">
      🗄️ <strong>Table:</strong> <code style="color: #60a5fa;">${cs.table}</code> &bull; Schema: <code>${cs.schemaSnippet}</code>
    </div>

    <!-- Interactive Blank or Target Query -->
    ${queryBlockHtml}

    <!-- Simulator & Studio Buttons -->
    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
      <button class="action-btn action-btn-primary" onclick="toggleCaseSim(${cs.id})" style="font-size: 12px; padding: 7px 14px;">
        📊 Run In-Card Simulator
      </button>
      <button class="action-btn" onclick="switchToStudioWithQuery(decodeURIComponent('${encodeURIComponent(cs.targetQuery)}'), '${cs.table}')" style="background: var(--bg-card); border: 1px solid var(--border-default); color: var(--text-primary); font-size: 12px; padding: 7px 14px;">
        ⚡ Test in Query Studio
      </button>
    </div>

    <div class="live-sim-drawer" id="sim_drawer_${cs.id}" style="display: none; margin-top: 10px;"></div>

    <!-- Drawer Footer Navigation -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border-default);">
      <button class="card-nav-btn" onclick="navigateDrawerCase(-1)" style="padding: 7px 14px; font-size: 12px;">
        &larr; Previous Case Study
      </button>
      <button class="action-btn action-btn-primary" onclick="navigateDrawerCase(1)" style="padding: 7px 16px; font-size: 12px;">
        Next Case Study &rarr;
      </button>
    </div>
  `;

  backdrop.classList.add('open');
}

function closeCaseDrawer(e) {
  if (e && e.target && e.target.closest('.case-drawer-panel') && !e.target.classList.contains('btn-drawer-close')) {
    return;
  }
  const backdrop = document.getElementById('caseDrawerBackdrop');
  if (backdrop) backdrop.classList.remove('open');
}

window.renderTopicPathways = renderTopicPathways;
window.selectPathwayModule = selectPathwayModule;
window.selectPathwayStage = selectPathwayStage;
window.renderPathwayMasterclass = renderPathwayMasterclass;
window.renderPathwayTrapsAndSecrets = renderPathwayTrapsAndSecrets;
window.renderPathwayMcqs = renderPathwayMcqs;
window.handlePathwayMcqAnswer = handlePathwayMcqAnswer;
window.nextPathwayMcq = nextPathwayMcq;
window.prevPathwayMcq = prevPathwayMcq;
window.jumpToPathwayMcq = jumpToPathwayMcq;
window.renderPathwayCaseStudies = renderPathwayCaseStudies;
window.filterPathwayCasesByDiff = filterPathwayCasesByDiff;
window.togglePathwayCaseView = togglePathwayCaseView;
window.openCaseDrawer = openCaseDrawer;
window.closeCaseDrawer = closeCaseDrawer;
window.navigateDrawerCase = navigateDrawerCase;

// =============================================================================
// BOOTSTRAP APPLICATION INITIALIZATION
// =============================================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisualizerApp);
} else {
  initVisualizerApp();
}
