const fs = require('fs');

// Read syntax_gym_data.js
let code = fs.readFileSync('visualizer/syntax_gym_data.js', 'utf8');
code = code.replace('const SYNTAX_GYM_DRILLS = [', 'global.SYNTAX_GYM_DRILLS = [');
eval(code);

const drills = global.SYNTAX_GYM_DRILLS.slice(0, 100);

const SCHEMAS = {
  Students: ['student_id', 'first_name', 'last_name', 'age', 'major', 'gpa', 'city', 'enrolled_year'],
  Books: ['book_id', 'title', 'author', 'genre', 'price', 'stock_qty', 'published_year', 'is_hardcover'],
  Employees: ['emp_id', 'first_name', 'last_name', 'department', 'salary', 'hire_date'],
  GroceryItems: ['item_id', 'item_name', 'category', 'unit_price', 'stock_qty'],
  Orders: ['order_id', 'customer_name', 'product_name', 'quantity', 'unit_price', 'discount_pct'],
  MusicTracks: ['track_id', 'title', 'artist', 'genre', 'duration_seconds'],
  GymMembers: ['member_id', 'member_name', 'membership_plan', 'monthly_fee', 'joined_date'],
  MovieReviews: ['review_id', 'movie_title', 'director', 'star_rating', 'review_count'],
  FlightSchedule: ['flight_id', 'airline', 'origin_airport', 'destination_airport', 'departure_time'],
  PetClinic: ['pet_id', 'pet_name', 'species', 'age_years', 'weight_kg']
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

  const staticFallbacks = [
    `${correctVal}_alt`,
    `calc_${correctVal}`,
    `${correctVal}2`,
    `val_${correctVal}`,
    'NULL',
    "'Default'"
  ];
  for (const sf of staticFallbacks) {
    if (set.size >= 4) break;
    set.add(sf);
  }

  const arr = Array.from(set).slice(0, 4);
  return shuffle(arr);
}

function getColumnDistractors(tableName, correctCol) {
  const cols = SCHEMAS[tableName] || SCHEMAS.Students;
  const filtered = cols.filter(c => c !== correctCol);
  const shuffled = shuffle(filtered);
  const raw = [correctCol, shuffled[0], shuffled[1], shuffled[2]];
  return ensureFourUniqueOptions(correctCol, raw, () => ['col_a', 'col_b', 'col_c']);
}

function getTableDistractors(correctTable) {
  const cleanTable = correctTable.replace(/;$/, '');
  const filtered = ALL_TABLES.filter(t => t !== cleanTable);
  const shuffled = shuffle(filtered);
  const hasSemi = correctTable.endsWith(';');
  const appendSemi = (s) => hasSemi ? s + ';' : s;
  const raw = [
    correctTable,
    appendSemi(shuffled[0] || 'Metadata'),
    appendSemi(shuffled[1] || 'AuditLog'),
    appendSemi(shuffled[2] || 'Archive')
  ];
  return ensureFourUniqueOptions(correctTable, raw, () => [appendSemi('TempStore'), appendSemi('Analytics')]);
}

function getExpressionDistractors(expr, tableName) {
  const raw = [expr];
  if (expr.includes('*')) {
    raw.push(expr.replace(/\*/g, '+'), expr.replace(/\*/g, '-'), expr.replace(/\*/g, '/'));
  } else if (expr.includes('/')) {
    raw.push(expr.replace(/\//g, '*'), expr.replace(/\//g, '-'), expr.replace(/\//g, '+'));
  } else if (expr.includes('+')) {
    raw.push(expr.replace(/\+/g, '-'), expr.replace(/\+/g, '*'), expr.replace(/\+/g, '/'));
  } else if (expr.includes('-')) {
    raw.push(expr.replace(/-/g, '+'), expr.replace(/-/g, '*'), expr.replace(/-/g, '/'));
  }

  const fnMatch = expr.match(/^([A-Z_]+)\((.*)\)$/);
  if (fnMatch) {
    const fn = fnMatch[1];
    const inner = fnMatch[2];
    raw.push(`${fn.toLowerCase()}_fn(${inner})`, `CALC_${fn}(${inner})`, `GET_${fn}(${inner})`, `TRY_${fn}(${inner})`);
  }

  if (expr.startsWith('(') && expr.endsWith(')')) {
    raw.push(expr.slice(1, -1));
  } else if (!expr.includes('(')) {
    raw.push(`(${expr})`);
  }

  const cols = SCHEMAS[tableName] || SCHEMAS.Students;
  return ensureFourUniqueOptions(expr, raw, () => [
    `${cols[0] || 'val'} * 1.05`,
    `${cols[1] || 'item'} + 10`,
    `ROUND(${cols[0] || 'cost'}, 2)`,
    `(${cols[1] || 'qty'} * 2)`
  ]);
}

const quests = drills.map((d, idx) => {
  const levelNum = idx + 1;
  const pad = levelNum < 10 ? '0' + levelNum : '' + levelNum;
  let cleanTitle = d.title.replace(/^Syntax #\d+:\s*/i, '');
  if (cleanTitle.length > 55) cleanTitle = cleanTitle.slice(0, 52) + '...';

  // Tier classification
  let tier = 'Apprentice';
  let tierColor = '#38bdf8';
  let difficulty = 'Easy';
  if (levelNum > 70) {
    tier = 'Master (FAANG-Ready)';
    tierColor = '#ec4899';
    difficulty = 'Hard';
  } else if (levelNum > 40) {
    tier = 'Specialist';
    tierColor = '#f59e0b';
    difficulty = 'Medium';
  } else if (levelNum > 15) {
    tier = 'Practitioner';
    tierColor = '#10b981';
    difficulty = 'Medium';
  }

  const q = d.targetQuery;
  const tblName = d.table || 'Students';
  let template = [];
  let slots = {};

  // ---------------------------------------------------------------------------
  // TIER 1 (Levels 1–15: 2 to 3 Blanks)
  // ---------------------------------------------------------------------------
  if (levelNum <= 15) {
    if (q.includes('*')) {
      // SELECT * FROM table; -> 3 blanks: SELECT, *, FROM
      const fromParts = q.split('FROM');
      const tblPart = fromParts[1].trim();
      template = [
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ' + tblPart, isBlank: false }
      ];
      slots = {
        slot1: { correct: 'SELECT', options: shuffle(['SELECT', 'EXTRACT', 'GET', 'CHOOSE']) },
        slot2: { correct: '*', options: shuffle(['*', 'ALL', '%', 'EVERY']) },
        slot3: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE']) }
      };
    } else {
      // Multi-column or single column projection -> 3 blanks: col, FROM, table
      const pSelect = q.indexOf('SELECT');
      const pFrom = q.indexOf('FROM');
      const colPart = q.slice(pSelect + 6, pFrom).trim();
      const afterFrom = q.slice(pFrom + 4).trim();

      template = [
        { text: 'SELECT ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
      ];

      const colDistractors = colPart.includes(',')
        ? shuffle([colPart, colPart.replace(/,/g, ' AND'), `(${colPart})`, colPart.replace(/,/g, ' +')])
        : getColumnDistractors(tblName, colPart);

      slots = {
        slot1: { correct: colPart, options: colDistractors },
        slot2: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE']) },
        slot3: { correct: afterFrom, options: getTableDistractors(afterFrom) }
      };
    }
  }

  // ---------------------------------------------------------------------------
  // TIER 2 (Levels 16–40: 3 to 4 Blanks: Columns, Constants, AS Aliasing, Tables)
  // ---------------------------------------------------------------------------
  else if (levelNum <= 40) {
    if (q.includes(' AS ')) {
      // SELECT col AS alias, col2 AS alias2 FROM tbl;
      const pSelect = q.indexOf('SELECT');
      const pAs = q.indexOf(' AS ');
      const pFrom = q.indexOf('FROM');
      const colBeforeAs = q.slice(pSelect + 6, pAs).trim();
      const aliasAndRest = q.slice(pAs + 4, pFrom).trim();
      const afterFrom = q.slice(pFrom + 4).trim();

      // Check if there is a second column or just one alias
      const firstAlias = aliasAndRest.split(',')[0].trim();
      const remainingCols = aliasAndRest.includes(',') ? aliasAndRest.slice(aliasAndRest.indexOf(',') + 1).trim() : '';

      if (remainingCols) {
        // 4 blanks: colBeforeAs, AS, firstAlias, FROM
        template = [
          { text: 'SELECT ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ', ' + remainingCols + '\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' },
          { text: ' ' + afterFrom, isBlank: false }
        ];
        slots = {
          slot1: {
            correct: colBeforeAs,
            options: colBeforeAs.includes("'")
              ? shuffle([colBeforeAs, colBeforeAs.replace(/'/g, '"'), colBeforeAs.replace(/'/g, ''), "'Pending'"])
              : getColumnDistractors(tblName, colBeforeAs)
          },
          slot2: { correct: 'AS', options: shuffle(['AS', 'ALIAS', 'NAME', 'LABEL']) },
          slot3: { correct: firstAlias, options: shuffle([firstAlias, firstAlias + '_val', 'col_' + firstAlias, firstAlias.toUpperCase()]) },
          slot4: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE']) }
        };
      } else {
        // 4 blanks: colBeforeAs, AS, alias, table
        template = [
          { text: 'SELECT ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: ' ' + firstAlias + '\nFROM ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
        ];
        slots = {
          slot1: {
            correct: colBeforeAs,
            options: colBeforeAs.includes("'")
              ? shuffle([colBeforeAs, colBeforeAs.replace(/'/g, '"'), colBeforeAs.replace(/'/g, ''), "'Inactive'"])
              : getColumnDistractors(tblName, colBeforeAs)
          },
          slot2: { correct: 'AS', options: shuffle(['AS', 'ALIAS', 'NAME', 'LABEL']) },
          slot3: { correct: afterFrom, options: getTableDistractors(afterFrom) }
        };
      }
    } else {
      // Multi-column list -> 3 blanks: col1, col2, FROM
      const pSelect = q.indexOf('SELECT');
      const pFrom = q.indexOf('FROM');
      const cols = q.slice(pSelect + 6, pFrom).trim().split(',');
      const c1 = cols[0].trim();
      const c2 = cols[1] ? cols[1].trim() : (cols[0] + '_alt');
      const cRest = cols.slice(2).join(',');
      const afterFrom = q.slice(pFrom + 4).trim();

      template = [
        { text: 'SELECT ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ', ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: (cRest ? ', ' + cRest : '') + '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ' + afterFrom, isBlank: false }
      ];
      slots = {
        slot1: { correct: c1, options: getColumnDistractors(tblName, c1) },
        slot2: { correct: c2, options: getColumnDistractors(tblName, c2) },
        slot3: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE']) }
      };
    }
  }

  // ---------------------------------------------------------------------------
  // TIER 3 (Levels 41–70: 4 Blanks: Math Expressions, Functions, Aliases, Tables)
  // ---------------------------------------------------------------------------
  else if (levelNum <= 70) {
    const pFrom = q.indexOf('FROM');
    const afterFrom = q.slice(pFrom + 4).trim();

    if (q.includes('CONCAT')) {
      // SELECT CONCAT(...) AS alias FROM table; -> 4 blanks: CONCAT, formula, AS, table
      const p1 = q.indexOf('CONCAT');
      const pAs = q.indexOf(' AS ');
      const concatExpr = q.slice(p1, pAs).trim();
      const aliasName = q.slice(pAs + 4, pFrom).trim();

      template = [
        { text: 'SELECT ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: '\nFROM ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];
      slots = {
        slot1: {
          correct: concatExpr,
          options: getExpressionDistractors(concatExpr, tblName)
        },
        slot2: { correct: 'AS', options: shuffle(['AS', 'ALIAS', 'NAME', 'LABEL']) },
        slot3: { correct: aliasName, options: shuffle([aliasName, aliasName + '_val', 'str_' + aliasName, aliasName.toUpperCase()]) },
        slot4: { correct: afterFrom, options: getTableDistractors(afterFrom) }
      };
    } else if (q.includes('ROUND(') || q.includes('FLOOR(') || q.includes('CEIL(')) {
      // 4 blanks: function expression, AS, alias, FROM
      const fnName = q.includes('ROUND(') ? 'ROUND' : (q.includes('FLOOR(') ? 'FLOOR' : 'CEIL');
      const pFn = q.indexOf(fnName);
      const pAs = q.indexOf(' AS ');
      const beforeFn = q.slice(6, pFn).trim();
      const fnExpr = q.slice(pFn, pAs).trim();
      const aliasName = q.slice(pAs + 4, pFrom).trim();

      template = [
        { text: 'SELECT ' + (beforeFn ? beforeFn + ' ' : ''), isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' },
        { text: ' ' + afterFrom, isBlank: false }
      ];
      slots = {
        slot1: {
          correct: fnExpr,
          options: getExpressionDistractors(fnExpr, tblName)
        },
        slot2: { correct: 'AS', options: shuffle(['AS', 'ALIAS', 'NAME', 'LABEL']) },
        slot3: { correct: aliasName, options: shuffle([aliasName, aliasName + '_num', 'computed_' + aliasName, aliasName.toUpperCase()]) },
        slot4: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE']) }
      };
    } else {
      // Arithmetic expression e.g. (price * stock_qty) AS total -> 4 blanks: col1, formula, AS, table
      const pSelect = q.indexOf('SELECT');
      const pAs = q.indexOf(' AS ');
      const exprBeforeAs = q.slice(pSelect + 6, pAs).trim();
      const aliasName = q.slice(pAs + 4, pFrom).trim();

      // Find the expression vs prefix columns
      const lastComma = exprBeforeAs.lastIndexOf(',');
      let prefixCols = '';
      let mathExpr = exprBeforeAs;
      if (lastComma !== -1) {
        prefixCols = exprBeforeAs.slice(0, lastComma + 1).trim();
        mathExpr = exprBeforeAs.slice(lastComma + 1).trim();
      }

      template = [
        { text: 'SELECT ' + (prefixCols ? prefixCols + ' ' : ''), isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: '\nFROM ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];
      slots = {
        slot1: {
          correct: mathExpr,
          options: getExpressionDistractors(mathExpr, tblName)
        },
        slot2: { correct: 'AS', options: shuffle(['AS', 'ALIAS', 'NAME', 'LABEL']) },
        slot3: { correct: aliasName, options: shuffle([aliasName, aliasName + '_val', 'calc_' + aliasName, aliasName.toUpperCase()]) },
        slot4: { correct: afterFrom, options: getTableDistractors(afterFrom) }
      };
    }
  }

  // ---------------------------------------------------------------------------
  // TIER 4 (Levels 71–100: 4 to 5 Blanks: Date Extraction, DISTINCT, Traps)
  // ---------------------------------------------------------------------------
  else {
    const pFrom = q.indexOf('FROM');
    const afterFrom = q.slice(pFrom + 4).trim();

    if (q.includes('DISTINCT')) {
      // 5 blanks: SELECT, DISTINCT, column, FROM, table
      const pSelect = q.indexOf('SELECT');
      const pDistinct = q.indexOf('DISTINCT');
      const targetCol = q.slice(pDistinct + 8, pFrom).trim();

      template = [
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot5', placeholder: '[ ___ ]' }
      ];
      slots = {
        slot1: { correct: 'SELECT', options: shuffle(['SELECT', 'EXTRACT', 'GET', 'CHOOSE']) },
        slot2: { correct: 'DISTINCT', options: shuffle(['DISTINCT', 'UNIQUE', 'DIFFERENT', 'SOLO']) },
        slot3: { correct: targetCol, options: getColumnDistractors(tblName, targetCol) },
        slot4: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE']) },
        slot5: { correct: afterFrom, options: getTableDistractors(afterFrom) }
      };
    } else if (q.includes('YEAR(') || q.includes('MONTH(') || q.includes('DAY(')) {
      // 4 blanks: date function, AS, alias, table
      const fnName = q.includes('YEAR(') ? 'YEAR' : (q.includes('MONTH(') ? 'MONTH' : 'DAY');
      const pFn = q.indexOf(fnName);
      const pAs = q.indexOf(' AS ');
      const beforeFn = q.slice(6, pFn).trim();
      const fnExpr = q.slice(pFn, pAs).trim();
      const aliasName = q.slice(pAs + 4, pFrom).trim();

      template = [
        { text: 'SELECT ' + (beforeFn ? beforeFn + ' ' : ''), isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: '\nFROM ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];
      slots = {
        slot1: {
          correct: fnExpr,
          options: shuffle([
            fnExpr,
            fnExpr.replace(fnName, 'DATE_' + fnName),
            fnExpr.replace(fnName, 'GET_' + fnName),
            fnExpr.replace(fnName, 'EXTRACT_' + fnName.slice(0, 2))
          ])
        },
        slot2: { correct: 'AS', options: shuffle(['AS', 'ALIAS', 'NAME', 'LABEL']) },
        slot3: { correct: aliasName, options: shuffle([aliasName, aliasName + '_num', 'extracted_' + aliasName, aliasName.toUpperCase()]) },
        slot4: { correct: afterFrom, options: getTableDistractors(afterFrom) }
      };
    } else {
      // Trap spotting & syntax debugging: 4 blanks
      const pSelect = q.indexOf('SELECT');
      const cols = q.slice(pSelect + 6, pFrom).trim();

      template = [
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];
      slots = {
        slot1: { correct: 'SELECT', options: shuffle(['SELECT', 'EXTRACT', 'GET', 'CHOOSE']) },
        slot2: {
          correct: cols,
          options: shuffle([
            cols,
            cols + ',', // Trailing comma trap!
            cols.replace(/,/g, ' AND'),
            cols + ';' // Premature semicolon trap!
          ])
        },
        slot3: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE']) },
        slot4: { correct: afterFrom, options: getTableDistractors(afterFrom) }
      };
    }
  }

  return {
    id: levelNum,
    levelDisplay: `Level ${pad}`,
    title: `Level ${pad}: ${cleanTitle}`,
    subtitle: d.scenario,
    type: 'fill_blank',
    category: 'Section 01: Foundations & Projections',
    subcluster: d.subcluster || '1.1 Basic Projections',
    tier,
    tierColor,
    difficulty,
    task: d.businessObjective,
    table: d.table,
    schemaSnippet: d.schemaSnippet,
    targetQuery: d.targetQuery,
    template,
    slots,
    explanation: `${d.syntaxRule} 💡 Trap to avoid: ${d.syntaxTrap}`,
    commonMistakes: d.commonMistakes
  };
});

const output = `// =============================================================================
// SECTION 01: FOUNDATIONS & PROJECTIONS (100 INTERACTIVE MULTI-BLANK QUESTS)
// Progressive 2-to-5 Blank Challenge Engine with Tiered Difficulty
// =============================================================================

window.QUESTS_SECTION_1 = ${JSON.stringify(quests, null, 2)};
`;

fs.writeFileSync('visualizer/quests_section1_data.js', output, 'utf8');
console.log('Successfully written visualizer/quests_section1_data.js with 100 multi-blank quests!');

// Inspect sample distribution
const blankCounts = quests.map(q => Object.keys(q.slots).length);
console.log('Blank count distribution:');
console.log('2 Blanks:', blankCounts.filter(c => c === 2).length);
console.log('3 Blanks:', blankCounts.filter(c => c === 3).length);
console.log('4 Blanks:', blankCounts.filter(c => c === 4).length);
console.log('5 Blanks:', blankCounts.filter(c => c === 5).length);
console.log('Min blanks:', Math.min(...blankCounts), 'Max blanks:', Math.max(...blankCounts));
