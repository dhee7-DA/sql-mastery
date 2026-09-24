const fs = require('fs');

// Read syntax_gym_data.js
let code = fs.readFileSync('visualizer/syntax_gym_data.js', 'utf8');
code = code.replace('const SYNTAX_GYM_DRILLS = [', 'global.SYNTAX_GYM_DRILLS = [');
eval(code);

// Drills 100 to 199 represent Section 02 (100 drills)
const drills = global.SYNTAX_GYM_DRILLS.slice(100, 200);

const SCHEMAS = {
  Students: {
    cols: ['student_id', 'first_name', 'last_name', 'full_name', 'age', 'major', 'gpa', 'city', 'enrolled_year'],
    snippet: 'Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)'
  },
  Books: {
    cols: ['book_id', 'title', 'author', 'genre', 'price', 'stock_qty', 'published_year', 'is_hardcover'],
    snippet: 'Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)'
  },
  Employees: {
    cols: ['emp_id', 'first_name', 'last_name', 'department', 'salary', 'hire_date', 'bonus'],
    snippet: 'Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)'
  },
  GroceryItems: {
    cols: ['item_id', 'item_name', 'category', 'unit_price', 'stock_qty', 'calories', 'is_organic'],
    snippet: 'GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)'
  },
  Orders: {
    cols: ['order_id', 'customer_name', 'product_name', 'quantity', 'unit_price', 'discount_pct', 'order_status', 'shipping_city'],
    snippet: 'Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)'
  },
  MusicTracks: {
    cols: ['track_id', 'title', 'track_title', 'artist', 'genre', 'duration_seconds', 'play_count', 'release_year'],
    snippet: 'MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)'
  },
  GymMembers: {
    cols: ['member_id', 'member_name', 'membership_plan', 'monthly_fee', 'joined_date', 'visits_this_month', 'has_trainer'],
    snippet: 'GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)'
  },
  MovieReviews: {
    cols: ['review_id', 'movie_title', 'director', 'star_rating', 'review_count', 'release_year', 'genre'],
    snippet: 'MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)'
  },
  FlightSchedule: {
    cols: ['flight_id', 'airline', 'origin_airport', 'destination_airport', 'dest_airport', 'departure_time', 'delay_minutes', 'ticket_price'],
    snippet: 'FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)'
  },
  PetClinic: {
    cols: ['pet_id', 'pet_name', 'species', 'breed', 'age_years', 'weight_kg', 'is_vaccinated'],
    snippet: 'PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)'
  }
};

const ALL_TABLES = Object.keys(SCHEMAS);

function shuffle(arr) {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

function ensureFourUniqueOptions(correctVal, rawOptions, fallbackGenerator) {
  const set = new Set();
  set.add(correctVal);
  (rawOptions || []).forEach(o => {
    if (o && typeof o === 'string' && o.trim().length > 0) {
      set.add(o.trim());
    }
  });

  if (typeof fallbackGenerator === 'function') {
    const fallbacks = fallbackGenerator();
    for (const fb of fallbacks) {
      if (set.size >= 4) break;
      if (fb && typeof fb === 'string' && fb.trim().length > 0) {
        set.add(fb.trim());
      }
    }
  }

  const staticFallbacks = ['NULL', '0', "'Default'", 'TRUE', 'FALSE'];
  for (const sf of staticFallbacks) {
    if (set.size >= 4) break;
    set.add(sf);
  }

  return shuffle(Array.from(set).slice(0, 4));
}

function getColumnDistractors(tableName, correctCol) {
  const cols = (SCHEMAS[tableName] && SCHEMAS[tableName].cols) || SCHEMAS.Students.cols;
  const filtered = cols.filter(c => c !== correctCol);
  const shuffled = shuffle(filtered);
  return ensureFourUniqueOptions(correctCol, [correctCol, shuffled[0], shuffled[1], shuffled[2]], () => ['id', 'status', 'name']);
}

function getTableDistractors(correctTable) {
  const cleanTable = correctTable.replace(/;$/, '');
  const filtered = ALL_TABLES.filter(t => t !== cleanTable);
  const shuffled = shuffle(filtered);
  const hasSemi = correctTable.endsWith(';');
  const appendSemi = (s) => hasSemi ? s + ';' : s;
  return ensureFourUniqueOptions(correctTable, [
    correctTable,
    appendSemi(shuffled[0] || 'Metadata'),
    appendSemi(shuffled[1] || 'AuditLog'),
    appendSemi(shuffled[2] || 'Archive')
  ], () => [appendSemi('Catalog'), appendSemi('History')]);
}

function getOperatorDistractors(op) {
  const pool = ['=', '!=', '<>', '>', '<', '>=', '<=', 'LIKE', 'IN', 'BETWEEN', 'IS'];
  const filtered = pool.filter(o => o !== op);
  const shuffled = shuffle(filtered);
  return ensureFourUniqueOptions(op, [op, shuffled[0], shuffled[1], shuffled[2]]);
}

function getLiteralDistractors(literal, typeHint) {
  let raw = [literal];
  if (literal.startsWith("'") && literal.endsWith("'")) {
    const inner = literal.slice(1, -1);
    if (inner.includes('%') || inner.includes('_')) {
      raw.push(
        `'${inner.replace(/[%_]/g, '')}'`,
        `'%${inner}%'`,
        `'${inner}%'`,
        `'%${inner}'`
      );
    } else {
      raw.push(`'${inner}s'`, `'Non-${inner}'`, `'Pre-${inner}'`, `'All'`);
    }
  } else if (!isNaN(Number(literal))) {
    const num = Number(literal);
    const isDec = literal.includes('.');
    const d1 = isDec ? (num + 5.0).toFixed(2) : String(num + 5);
    const d2 = isDec ? Math.max(0, num - 5.0).toFixed(2) : String(Math.max(0, num - 5));
    const d3 = isDec ? (num * 1.5).toFixed(2) : String(num * 2);
    raw.push(d1, d2, d3);
  } else if (literal === 'TRUE' || literal === 'FALSE') {
    raw.push(literal === 'TRUE' ? 'FALSE' : 'TRUE', 'NULL', 'UNKNOWN');
  } else if (literal.startsWith("('") || literal.startsWith("(")) {
    raw.push(
      literal.replace(/,/g, ' OR'),
      literal.slice(1, -1),
      `['${literal.slice(2, -2)}']`
    );
  }
  return ensureFourUniqueOptions(literal, raw, () => ["'Sample'", '100', 'NULL', 'TRUE']);
}

const section2Quests = drills.map((d, idx) => {
  const levelNum = idx + 1;
  const pad = levelNum < 10 ? '0' + levelNum : '' + levelNum;
  let cleanTitle = d.title.replace(/^Syntax #\d+:\s*/i, '');
  if (cleanTitle.length > 58) cleanTitle = cleanTitle.slice(0, 55) + '...';

  // Tier classification
  let tier = 'Apprentice';
  let tierColor = '#38bdf8';
  let difficulty = 'Easy';
  if (levelNum > 75) {
    tier = 'Master (FAANG-Ready)';
    tierColor = '#ec4899';
    difficulty = 'Hard';
  } else if (levelNum > 45) {
    tier = 'Specialist';
    tierColor = '#f59e0b';
    difficulty = 'Medium';
  } else if (levelNum > 20) {
    tier = 'Practitioner';
    tierColor = '#10b981';
    difficulty = 'Medium';
  }

  const q = d.targetQuery;
  const tblName = d.table || 'Students';
  const schemaInfo = SCHEMAS[tblName] || SCHEMAS.Students;

  let template = [];
  let slots = {};

  // Parse query components
  // Typical: SELECT <cols> \n FROM <tbl> \n WHERE <predicate>;
  const selectIdx = q.indexOf('SELECT');
  const fromIdx = q.indexOf('FROM');
  const whereIdx = q.indexOf('WHERE');

  const selectCols = q.slice(selectIdx + 6, fromIdx).trim();
  const fromTable = q.slice(fromIdx + 4, whereIdx).trim();
  const whereClauseWithSemi = q.slice(whereIdx + 5).trim();
  const whereClause = whereClauseWithSemi.replace(/;$/, '').trim();

  // ---------------------------------------------------------------------------
  // TIER 1: Levels 01–20 (3 Blanks)
  // ---------------------------------------------------------------------------
  if (levelNum <= 20) {
    // Pattern: SELECT col1, col2 \n FROM table \n [WHERE] [col] [op val;]
    // Or: [SELECT] col1, col2 \n [FROM] table \n [WHERE] predicate;
    const tokens = whereClause.split(/\s+/);
    const filterCol = tokens[0];
    const op = tokens[1];
    const valWithSemi = tokens.slice(2).join(' ') + ';';

    template = [
      { text: `SELECT ${selectCols}\nFROM ${fromTable}\n`, isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: ' ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
    ];

    slots = {
      slot1: { correct: 'WHERE', options: shuffle(['WHERE', 'HAVING', 'FILTER', 'WHEN']) },
      slot2: { correct: filterCol, options: getColumnDistractors(tblName, filterCol) },
      slot3: { correct: `${op} ${valWithSemi}`, options: shuffle([
        `${op} ${valWithSemi}`,
        `= ${valWithSemi}`,
        `!= ${valWithSemi}`,
        `LIKE ${valWithSemi}`
      ]) }
    };
  }
  // ---------------------------------------------------------------------------
  // TIER 2: Levels 21–45 (3 to 4 Blanks)
  // ---------------------------------------------------------------------------
  else if (levelNum <= 45) {
    if (whereClause.includes('BETWEEN')) {
      // col BETWEEN v1 AND v2
      // 4 blanks: [WHERE] [col] [BETWEEN] v1 [AND] v2;
      const bParts = whereClause.split(/\s+BETWEEN\s+/i);
      const filterCol = bParts[0].trim();
      const rangeParts = bParts[1].split(/\s+AND\s+/i);
      const v1 = rangeParts[0].trim();
      const v2WithSemi = rangeParts[1].trim() + ';';

      template = [
        { text: `SELECT ${selectCols}\nFROM ${fromTable}\n`, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ` ${v1} `, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' },
        { text: ` ${v2WithSemi}`, isBlank: false }
      ];

      slots = {
        slot1: { correct: 'WHERE', options: shuffle(['WHERE', 'HAVING', 'ON', 'WHEN']) },
        slot2: { correct: filterCol, options: getColumnDistractors(tblName, filterCol) },
        slot3: { correct: 'BETWEEN', options: shuffle(['BETWEEN', 'IN', 'WITHIN', 'RANGE']) },
        slot4: { correct: 'AND', options: shuffle(['AND', 'TO', 'THROUGH', 'OR']) }
      };
    } else if (whereClause.includes(' IN ') || whereClause.includes(' NOT IN ')) {
      // col IN (...) or col NOT IN (...)
      const isIn = whereClause.includes(' IN ');
      const inKeyword = isIn ? 'IN' : 'NOT IN';
      const parts = whereClause.split(new RegExp(`\\s+${inKeyword}\\s+`, 'i'));
      const filterCol = parts[0].trim();
      const listVal = parts[1].trim() + ';';

      template = [
        { text: `SELECT ${selectCols}\nFROM ${fromTable}\n`, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];

      slots = {
        slot1: { correct: 'WHERE', options: shuffle(['WHERE', 'HAVING', 'FILTER', 'CASE']) },
        slot2: { correct: filterCol, options: getColumnDistractors(tblName, filterCol) },
        slot3: { correct: inKeyword, options: shuffle(['IN', 'NOT IN', 'CONTAINS', '= ANY']) },
        slot4: { correct: listVal, options: getLiteralDistractors(listVal) }
      };
    } else {
      // LIKE patterns (Levels 41-45)
      const parts = whereClause.split(/\s+LIKE\s+/i);
      const filterCol = parts[0].trim();
      const patternVal = parts[1].trim() + ';';

      template = [
        { text: `SELECT ${selectCols}\nFROM ${fromTable}\n`, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];

      slots = {
        slot1: { correct: 'WHERE', options: shuffle(['WHERE', 'HAVING', 'FILTER', 'ON']) },
        slot2: { correct: filterCol, options: getColumnDistractors(tblName, filterCol) },
        slot3: { correct: 'LIKE', options: shuffle(['LIKE', '=', 'MATCHES', 'CONTAINS']) },
        slot4: { correct: patternVal, options: getLiteralDistractors(patternVal) }
      };
    }
  }
  // ---------------------------------------------------------------------------
  // TIER 3: Levels 46–75 (4 Blanks)
  // ---------------------------------------------------------------------------
  else if (levelNum <= 75) {
    if (whereClause.includes('NOT LIKE')) {
      const parts = whereClause.split(/\s+NOT LIKE\s+/i);
      const filterCol = parts[0].trim();
      const pat = parts[1].trim() + ';';

      template = [
        { text: `SELECT ${selectCols}\nFROM ${fromTable}\n`, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];

      slots = {
        slot1: { correct: 'WHERE', options: shuffle(['WHERE', 'HAVING', 'FILTER', 'ON']) },
        slot2: { correct: filterCol, options: getColumnDistractors(tblName, filterCol) },
        slot3: { correct: 'NOT LIKE', options: shuffle(['NOT LIKE', '!=', 'UNLIKE', 'NOT MATCH']) },
        slot4: { correct: pat, options: getLiteralDistractors(pat) }
      };
    } else if (whereClause.includes(' AND ')) {
      // Compound AND: pred1 AND pred2
      const andParts = whereClause.split(/\s+AND\s+/i);
      const p1 = andParts[0].trim();
      const p2WithSemi = andParts[1].trim() + ';';

      const p1Tokens = p1.split(/\s+/);
      const col1 = p1Tokens[0];
      const op1 = p1Tokens[1];
      const val1 = p1Tokens.slice(2).join(' ');

      template = [
        { text: `SELECT ${selectCols}\nFROM ${fromTable}\nWHERE `, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ` ${op1} ${val1} `, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];

      const p2Tokens = p2WithSemi.replace(/;$/, '').split(/\s+/);
      const col2 = p2Tokens[0];
      const op2AndVal = p2Tokens.slice(1).join(' ') + ';';

      slots = {
        slot1: { correct: col1, options: getColumnDistractors(tblName, col1) },
        slot2: { correct: 'AND', options: shuffle(['AND', 'OR', 'THEN', 'PLUS']) },
        slot3: { correct: col2, options: getColumnDistractors(tblName, col2) },
        slot4: { correct: op2AndVal, options: shuffle([
          op2AndVal,
          `= ${p2Tokens.slice(2).join(' ') || '0'};`,
          `!= ${p2Tokens.slice(2).join(' ') || '0'};`,
          `LIKE ${p2Tokens.slice(2).join(' ') || "'%'"};`
        ]) }
      };
    } else if (whereClause.includes(' OR ')) {
      // Compound OR: pred1 OR pred2
      const orParts = whereClause.split(/\s+OR\s+/i);
      const p1 = orParts[0].trim();
      const p2WithSemi = orParts[1].trim() + ';';

      const p1Tokens = p1.split(/\s+/);
      const col1 = p1Tokens[0];
      const op1 = p1Tokens[1];
      const val1 = p1Tokens.slice(2).join(' ');

      template = [
        { text: `SELECT ${selectCols}\nFROM ${fromTable}\nWHERE `, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ` ${op1} ${val1} `, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];

      const p2Tokens = p2WithSemi.replace(/;$/, '').split(/\s+/);
      const col2 = p2Tokens[0];
      const op2AndVal = p2Tokens.slice(1).join(' ') + ';';

      slots = {
        slot1: { correct: col1, options: getColumnDistractors(tblName, col1) },
        slot2: { correct: 'OR', options: shuffle(['OR', 'AND', 'XOR', 'ELSE']) },
        slot3: { correct: col2, options: getColumnDistractors(tblName, col2) },
        slot4: { correct: op2AndVal, options: shuffle([
          op2AndVal,
          `= ${p2Tokens.slice(2).join(' ') || '0'};`,
          `!= ${p2Tokens.slice(2).join(' ') || '0'};`,
          `IS NOT NULL;`
        ]) }
      };
    } else {
      // 4-blank general filter
      template = [
        { text: 'SELECT ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ` ${fromTable}\n`, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];

      slots = {
        slot1: { correct: selectCols, options: shuffle([selectCols, '*', selectCols.replace(/,/g, ' AND'), `DISTINCT ${selectCols}`]) },
        slot2: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'JOIN']) },
        slot3: { correct: 'WHERE', options: shuffle(['WHERE', 'HAVING', 'FILTER', 'WHEN']) },
        slot4: { correct: whereClauseWithSemi, options: shuffle([
          whereClauseWithSemi,
          whereClauseWithSemi.replace(/=/g, '!='),
          whereClauseWithSemi.replace(/>/g, '<'),
          whereClauseWithSemi + ' AND 1=1'
        ]) }
      };
    }
  }
  // ---------------------------------------------------------------------------
  // TIER 4: Levels 76–100 (4 to 5 Blanks) - Master (FAANG-Ready)
  // ---------------------------------------------------------------------------
  else {
    if (whereClause.includes('IS NULL') || whereClause.includes('IS NOT NULL')) {
      const isNull = whereClause.includes('IS NULL');
      const nullOp = isNull ? 'IS NULL' : 'IS NOT NULL';
      const parts = whereClause.split(new RegExp(`\\s+${nullOp}`, 'i'));
      const col = parts[0].trim();
      const rest = parts[1] ? parts[1].trim() : '';

      if (rest.length > 0) {
        // e.g. stock_qty IS NOT NULL AND stock_qty > 0;
        // 5 Blanks!
        template = [
          { text: `SELECT ${selectCols}\nFROM ${fromTable}\n`, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot5', placeholder: '[ ___ ]' }
        ];

        const restTokens = (rest + ';').split(/\s+/);
        const conj = restTokens[0]; // AND / OR
        const restPred = restTokens.slice(1).join(' ');

        slots = {
          slot1: { correct: 'WHERE', options: shuffle(['WHERE', 'HAVING', 'FILTER', 'CASE']) },
          slot2: { correct: col, options: getColumnDistractors(tblName, col) },
          slot3: { correct: nullOp, options: shuffle(['IS NULL', 'IS NOT NULL', '= NULL', '!= NULL']) },
          slot4: { correct: conj, options: shuffle(['AND', 'OR', 'THEN', 'ELSE']) },
          slot5: { correct: restPred, options: shuffle([restPred, `= 0;`, `> 100;`, `IS NULL;`]) }
        };
      } else {
        // Just col IS NULL; -> 4 Blanks
        template = [
          { text: `SELECT ${selectCols}\n`, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ` ${fromTable}\n`, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];

        slots = {
          slot1: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE']) },
          slot2: { correct: 'WHERE', options: shuffle(['WHERE', 'HAVING', 'ON', 'WHEN']) },
          slot3: { correct: col, options: getColumnDistractors(tblName, col) },
          slot4: { correct: `${nullOp};`, options: shuffle([`${nullOp};`, isNull ? 'IS NOT NULL;' : 'IS NULL;', '= NULL;', '!= NULL;']) }
        };
      }
    } else if (whereClause.includes('(') && whereClause.includes(')')) {
      // Mixed precedence query: (cond1 OR cond2) AND cond3;
      // 5 Blanks!
      const parenMatch = whereClause.match(/\((.*?)\)\s+(AND|OR)\s+(.*)/i);
      if (parenMatch) {
        const inner = parenMatch[1].trim(); // e.g. genre = 'Rock' OR genre = 'Synthwave'
        const outerConj = parenMatch[2].trim(); // AND
        const outerCondWithSemi = parenMatch[3].trim() + ';';

        const innerConj = inner.includes(' OR ') ? 'OR' : 'AND';
        const innerParts = inner.split(new RegExp(`\\s+${innerConj}\\s+`, 'i'));
        const innerCond1 = innerParts[0].trim();
        const innerCond2 = innerParts[1].trim();

        template = [
          { text: `SELECT ${selectCols}\nFROM ${fromTable}\n`, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ` (${innerCond1} `, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ') ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot5', placeholder: '[ ___ ]' }
        ];

        slots = {
          slot1: { correct: 'WHERE', options: shuffle(['WHERE', 'HAVING', 'FILTER', 'CASE']) },
          slot2: { correct: innerConj, options: shuffle(['OR', 'AND', 'XOR', 'NOR']) },
          slot3: { correct: innerCond2, options: shuffle([
            innerCond2,
            innerCond1,
            innerCond2.replace(/=/g, '!='),
            innerCond2.replace(/'/g, '')
          ]) },
          slot4: { correct: outerConj, options: shuffle(['AND', 'OR', 'THEN', 'PLUS']) },
          slot5: { correct: outerCondWithSemi, options: shuffle([
            outerCondWithSemi,
            outerCondWithSemi.replace(/>/g, '<'),
            outerCondWithSemi.replace(/=/g, '!='),
            `status = 'ACTIVE';`
          ]) }
        };
      } else {
        // Fallback 4 blanks
        template = [
          { text: `SELECT ${selectCols}\n`, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ` ${fromTable}\n`, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];
        slots = {
          slot1: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE']) },
          slot2: { correct: 'WHERE', options: shuffle(['WHERE', 'HAVING', 'FILTER', 'WHEN']) },
          slot3: { correct: `(${whereClause.slice(1, whereClause.indexOf(')'))})`, options: shuffle([
            `(${whereClause.slice(1, whereClause.indexOf(')'))})`,
            `(1=1)`,
            `(true)`,
            `(id > 0)`
          ]) },
          slot4: { correct: whereClauseWithSemi, options: shuffle([whereClauseWithSemi, 'WHERE 1=1;', 'HAVING count(*) > 0;', 'ORDER BY id;']) }
        };
      }
    } else {
      // 4-5 blanks for advanced synthesis
      template = [
        { text: `SELECT ${selectCols}\n`, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];

      slots = {
        slot1: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE']) },
        slot2: { correct: fromTable, options: getTableDistractors(fromTable) },
        slot3: { correct: 'WHERE', options: shuffle(['WHERE', 'HAVING', 'FILTER', 'WHEN']) },
        slot4: { correct: whereClauseWithSemi, options: shuffle([
          whereClauseWithSemi,
          whereClauseWithSemi.replace(/=/g, '!='),
          whereClauseWithSemi.replace(/AND/g, 'OR'),
          whereClauseWithSemi.replace(/'/g, '"')
        ]) }
      };
    }
  }

  // Double check all slots have exactly 4 unique options including correct
  for (const sId of Object.keys(slots)) {
    const sl = slots[sId];
    sl.options = ensureFourUniqueOptions(sl.correct, sl.options);
  }

  return {
    id: 100 + levelNum,
    levelDisplay: `Level ${pad}`,
    title: `Level ${pad}: ${cleanTitle}`,
    subtitle: d.scenario || d.businessObjective || cleanTitle,
    type: 'fill_blank',
    category: 'Section 02: WHERE Predicates & Filtering',
    subcluster: d.subcluster || '2.1 WHERE Logic',
    tier: tier,
    tierColor: tierColor,
    difficulty: difficulty,
    task: d.scenario || cleanTitle,
    table: tblName,
    schemaSnippet: schemaInfo.snippet,
    targetQuery: q,
    template: template,
    slots: slots,
    syntaxRule: d.syntaxRule || 'WHERE filters rows before aggregation. Null checks require IS NULL.',
    syntaxTrap: d.syntaxTrap || 'Never write col = NULL or omit parentheses in mixed AND/OR logic.',
    eli5Story: d.eli5Story || `Filtering ${tblName} with exact row-level precision.`,
    commonMistakes: d.commonMistakes || 'Unquoted strings, missing parentheses around OR, or using = instead of LIKE.',
    learningOutcomes: d.learningOutcomes || `Mastered ${d.subcluster} on ${tblName}.`
  };
});

const output = `// =============================================================================
// SECTION 02: WHERE PREDICATES & FILTERING (100 INTERACTIVE MULTI-BLANK QUESTS)
// Progressive 3-to-5 Blank Challenge Engine with Tiered Difficulty
// =============================================================================

window.QUESTS_SECTION_2 = ${JSON.stringify(section2Quests, null, 2)};
`;

fs.writeFileSync('visualizer/quests_section2_data.js', output, 'utf8');
console.log('✅ Generated visualizer/quests_section2_data.js with', section2Quests.length, 'quests!');
