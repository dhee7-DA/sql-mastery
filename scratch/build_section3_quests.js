const fs = require('fs');

// Read syntax_gym_data.js
let code = fs.readFileSync('visualizer/syntax_gym_data.js', 'utf8');
code = code.replace('const SYNTAX_GYM_DRILLS = [', 'global.SYNTAX_GYM_DRILLS = [');
eval(code);

// Drills 200 to 299 represent Section 03 (100 drills)
const drills = global.SYNTAX_GYM_DRILLS.slice(200, 300);

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
    cols: ['track_id', 'title', 'track_title', 'artist', 'artist_name', 'genre', 'duration_seconds', 'play_count', 'release_year'],
    snippet: 'MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)'
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

function getColumnDistractors(table, correctCol) {
  const schema = SCHEMAS[table] || SCHEMAS.Students;
  const pool = schema.cols.filter(c => c.toLowerCase() !== correctCol.toLowerCase());
  const sh = shuffle(pool);
  const distractors = sh.slice(0, 3);
  while (distractors.length < 3) {
    distractors.push('id_' + (distractors.length + 1));
  }
  return shuffle([correctCol, ...distractors]);
}

function getTableDistractors(correctTable) {
  const pool = ALL_TABLES.filter(t => t.toLowerCase() !== correctTable.toLowerCase());
  const sh = shuffle(pool);
  return shuffle([correctTable, ...sh.slice(0, 3)]);
}

function ensureFourUniqueOptions(correct, existingOptions) {
  const unique = [correct];
  for (const opt of existingOptions) {
    if (opt !== correct && !unique.includes(opt) && unique.length < 4) {
      unique.push(opt);
    }
  }
  // Fillers if needed
  let counter = 1;
  while (unique.length < 4) {
    const filler = `${correct}_${counter++}`;
    if (!unique.includes(filler)) unique.push(filler);
  }
  return shuffle(unique);
}

const section3Quests = drills.map((d, index) => {
  const levelNum = index + 1;
  const pad = levelNum < 10 ? `0${levelNum}` : `${levelNum}`;
  const cleanTitle = (d.title || d.subcluster || `Level ${pad}`)
    .replace(/^Day \d+.*?:\s*/i, '')
    .replace(/^Drill \d+:\s*/i, '')
    .trim();

  let tier = 'Apprentice';
  let tierColor = '#38bdf8';
  let difficulty = 'Apprentice';

  if (levelNum > 75) {
    tier = 'Master (FAANG-Ready)';
    tierColor = '#ec4899';
    difficulty = 'Master';
  } else if (levelNum > 45) {
    tier = 'Specialist';
    tierColor = '#f59e0b';
    difficulty = 'Advanced';
  } else if (levelNum > 20) {
    tier = 'Practitioner';
    tierColor = '#10b981';
    difficulty = 'Intermediate';
  }

  // Parse SQL query
  const q = d.targetQuery.trim();
  const selectMatch = q.match(/SELECT\s+([\s\S]+?)\s+FROM/i);
  const fromMatch = q.match(/FROM\s+([A-Za-z0-9_]+)/i);

  const selectCols = selectMatch ? selectMatch[1].trim() : '*';
  const fromTable = fromMatch ? fromMatch[1].trim() : (d.table || 'Students');
  const tblName = SCHEMAS[fromTable] ? fromTable : 'Students';
  const schemaInfo = SCHEMAS[tblName] || SCHEMAS.Students;

  // Extract ORDER BY clause, LIMIT, OFFSET, etc.
  const orderMatch = q.match(/ORDER\s+BY\s+([\s\S]+?)(?:\s+LIMIT|\s*;|$)/i);
  const limitMatch = q.match(/LIMIT\s+(\d+)/i);
  const offsetMatch = q.match(/OFFSET\s+(\d+)/i);

  let template = [];
  let slots = {};

  // ---------------------------------------------------------------------------
  // TIER 1: Levels 01–20 (Strictly 3 Blanks) - Apprentice
  // Focus: Single column ASC / DESC sorting
  // ---------------------------------------------------------------------------
  if (levelNum <= 20) {
    const isDesc = /DESC/i.test(q);
    const dir = isDesc ? 'DESC' : 'ASC';
    const altDir = isDesc ? 'ASC' : 'DESC';

    // Extract sort column
    let sortCol = 'id';
    if (orderMatch) {
      const parts = orderMatch[1].trim().split(/\s+/);
      sortCol = parts[0].replace(/;$/, '');
    }

    // 3 Blanks: FROM table, ORDER BY, sortCol + dir
    template = [
      { text: `SELECT ${selectCols}\nFROM `, isBlank: false },
      { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
      { text: '\n', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
      { text: ' ', isBlank: false },
      { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
    ];

    slots = {
      slot1: { correct: fromTable, options: getTableDistractors(fromTable) },
      slot2: { correct: 'ORDER BY', options: shuffle(['ORDER BY', 'SORT BY', 'GROUP BY', 'ARRANGE BY']) },
      slot3: { correct: `${sortCol} ${dir};`, options: shuffle([
        `${sortCol} ${dir};`,
        `${sortCol} ${altDir};`,
        `${sortCol};`,
        `${sortCol} NULLS;`
      ]) }
    };
  }
  // ---------------------------------------------------------------------------
  // TIER 2: Levels 21–45 (3 to 4 Blanks) - Practitioner
  // Focus: Multi-column sorting, aliases, expressions
  // ---------------------------------------------------------------------------
  else if (levelNum <= 45) {
    if (levelNum % 2 === 0) {
      // 4 Blanks: SELECT cols, FROM table, ORDER BY, multi-column criteria
      const rawOrder = orderMatch ? orderMatch[1].trim().replace(/;$/, '') : 'salary DESC, emp_id ASC';
      const orderParts = rawOrder.split(',').map(s => s.trim());
      const firstSort = orderParts[0] || '1 ASC';
      const secondSort = (orderParts[1] || '2 ASC') + ';';

      template = [
        { text: `SELECT ${selectCols}\nFROM `, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ', ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];

      slots = {
        slot1: { correct: fromTable, options: getTableDistractors(fromTable) },
        slot2: { correct: 'ORDER BY', options: shuffle(['ORDER BY', 'SORT BY', 'RANK BY', 'GROUP BY']) },
        slot3: { correct: firstSort, options: shuffle([firstSort, firstSort.replace(/ASC/i, 'DESC'), firstSort.replace(/DESC/i, 'ASC'), '1']) },
        slot4: { correct: secondSort, options: shuffle([
          secondSort,
          secondSort.replace(/ASC/i, 'DESC'),
          secondSort.replace(/DESC/i, 'ASC'),
          secondSort.replace(/;$/, '') + ' FIRST;'
        ]) }
      };
    } else {
      // 3 Blanks: FROM, ORDER BY, full order clause with semi
      const fullOrder = (orderMatch ? orderMatch[1].trim().replace(/;$/, '') : 'salary DESC') + ';';
      template = [
        { text: `SELECT ${selectCols}\n`, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ` ${fromTable}\n`, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
      ];

      slots = {
        slot1: { correct: 'FROM', options: shuffle(['FROM', 'INTO', 'TABLE', 'SOURCE']) },
        slot2: { correct: 'ORDER BY', options: shuffle(['ORDER BY', 'SORT BY', 'ARRANGE BY', 'INDEX BY']) },
        slot3: { correct: fullOrder, options: shuffle([
          fullOrder,
          fullOrder.replace(/ASC/g, 'DESC'),
          fullOrder.replace(/DESC/g, 'ASC'),
          fullOrder.replace(/,/g, ' AND')
        ]) }
      };
    }
  }
  // ---------------------------------------------------------------------------
  // TIER 3: Levels 46–75 (Strictly 4 Blanks) - Specialist
  // Focus: Functions in ORDER BY, Positional 1, 2, and LIMIT N
  // ---------------------------------------------------------------------------
  else if (levelNum <= 75) {
    const rawOrder = orderMatch ? orderMatch[1].trim().replace(/;$/, '') : '1 ASC';
    const limitVal = limitMatch ? limitMatch[1] : '5';

    if (q.includes('LIMIT')) {
      // 4 Blanks with LIMIT
      template = [
        { text: `SELECT ${selectCols}\nFROM ${fromTable}\n`, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];

      slots = {
        slot1: { correct: 'ORDER BY', options: shuffle(['ORDER BY', 'SORT BY', 'LIMIT BY', 'FILTER BY']) },
        slot2: { correct: rawOrder, options: shuffle([rawOrder, rawOrder.replace(/ASC/g, 'DESC'), rawOrder.replace(/DESC/g, 'ASC'), '1']) },
        slot3: { correct: 'LIMIT', options: shuffle(['LIMIT', 'TOP', 'FETCH', 'MAX']) },
        slot4: { correct: `${limitVal};`, options: shuffle([`${limitVal};`, `${parseInt(limitVal, 10) + 5};`, `1;`, `100;`]) }
      };
    } else {
      // 4 Blanks with positional or expression sorting
      const orderTokens = rawOrder.split(/\s+/);
      const sortField = orderTokens[0] || '1';
      const sortDir = (orderTokens.slice(1).join(' ') || 'ASC') + ';';

      template = [
        { text: `SELECT ${selectCols}\n`, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: '\nORDER BY ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];

      slots = {
        slot1: { correct: 'FROM', options: shuffle(['FROM', 'TABLE', 'INTO', 'SOURCE']) },
        slot2: { correct: fromTable, options: getTableDistractors(fromTable) },
        slot3: { correct: sortField, options: shuffle([sortField, '1', '2', 'LENGTH(' + sortField + ')']) },
        slot4: { correct: sortDir, options: shuffle([sortDir, 'ASC;', 'DESC;', 'AUTO;']) }
      };
    }
  }
  // ---------------------------------------------------------------------------
  // TIER 4: Levels 76–100 (4 to 5 Blanks) - Master (FAANG-Ready)
  // Focus: LIMIT & OFFSET Pagination, deterministic ties, bug hunt synthesis
  // ---------------------------------------------------------------------------
  else {
    const rawOrder = orderMatch ? orderMatch[1].trim().replace(/;$/, '') : 'student_id ASC';
    const limitVal = limitMatch ? limitMatch[1] : '10';
    const offsetVal = offsetMatch ? offsetMatch[1] : '0';

    if (q.includes('OFFSET')) {
      // 5 Blanks: ORDER BY, sort clause, LIMIT, limitVal, OFFSET offsetVal;
      template = [
        { text: `SELECT ${selectCols}\nFROM ${fromTable}\n`, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot5', placeholder: '[ ___ ]' }
      ];

      slots = {
        slot1: { correct: 'ORDER BY', options: shuffle(['ORDER BY', 'SORT BY', 'PAGINATE BY', 'GROUP BY']) },
        slot2: { correct: rawOrder, options: shuffle([rawOrder, rawOrder.replace(/ASC/g, 'DESC'), '1, 2', 'id']) },
        slot3: { correct: 'LIMIT', options: shuffle(['LIMIT', 'TOP', 'ROWS', 'FIRST']) },
        slot4: { correct: limitVal, options: shuffle([limitVal, '5', '20', '50']) },
        slot5: { correct: `OFFSET ${offsetVal};`, options: shuffle([
          `OFFSET ${offsetVal};`,
          `OFFSET ${parseInt(offsetVal, 10) + 10};`,
          `SKIP ${offsetVal};`,
          `PAGE 1;`
        ]) }
      };
    } else {
      // 4 Blanks advanced synthesis
      template = [
        { text: `SELECT ${selectCols}\nFROM `, isBlank: false },
        { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
        { text: ' ', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
        { text: '\n', isBlank: false },
        { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
      ];

      slots = {
        slot1: { correct: fromTable, options: getTableDistractors(fromTable) },
        slot2: { correct: 'ORDER BY', options: shuffle(['ORDER BY', 'SORT BY', 'RANK BY', 'GROUP BY']) },
        slot3: { correct: rawOrder, options: shuffle([rawOrder, rawOrder.replace(/ASC/g, 'DESC'), rawOrder.replace(/DESC/g, 'ASC'), '1 ASC']) },
        slot4: { correct: `LIMIT ${limitVal};`, options: shuffle([`LIMIT ${limitVal};`, `LIMIT 1;`, `TOP ${limitVal};`, `FETCH ${limitVal};`]) }
      };
    }
  }

  // Ensure all slots have exactly 4 unique options including correct
  for (const sId of Object.keys(slots)) {
    const sl = slots[sId];
    sl.options = ensureFourUniqueOptions(sl.correct, sl.options);
  }

  const syntaxRule = d.syntaxRule || 'ORDER BY sorts rows ascending (ASC) by default. LIMIT restricts result count, and OFFSET skips initial rows.';
  const syntaxTrap = d.syntaxTrap || 'Never write LIMIT before ORDER BY or use commas instead of OFFSET for standard ANSI pagination.';

  return {
    id: 200 + levelNum,
    levelDisplay: `Level ${pad}`,
    title: `Level ${pad}: ${cleanTitle}`,
    subtitle: d.scenario || d.businessObjective || cleanTitle,
    type: 'fill_blank',
    category: 'Section 03: ORDER BY & LIMIT Slicing',
    subcluster: d.subcluster || '3.1 ORDER BY & Slicing',
    tier: tier,
    tierColor: tierColor,
    difficulty: difficulty,
    task: d.scenario || cleanTitle,
    table: tblName,
    schemaSnippet: schemaInfo.snippet,
    targetQuery: q,
    template: template,
    slots: slots,
    syntaxRule: syntaxRule,
    syntaxTrap: syntaxTrap,
    explanation: `${syntaxRule} 💡 Trap to avoid: ${syntaxTrap}`,
    eli5Story: d.eli5Story || `Ordering and slicing ${tblName} with exact row-level determinism.`,
    commonMistakes: d.commonMistakes || 'Confusing ASC and DESC, putting LIMIT before ORDER BY, or using 1-based vs 0-based offset assumptions.',
    learningOutcomes: d.learningOutcomes || `Mastered ${d.subcluster} on ${tblName}.`
  };
});

const output = `// =============================================================================
// SECTION 03: ORDER BY & LIMIT SLICING (100 INTERACTIVE MULTI-BLANK QUESTS)
// Progressive 3-to-5 Blank Challenge Engine with Tiered Difficulty
// =============================================================================

window.QUESTS_SECTION_3 = ${JSON.stringify(section3Quests, null, 2)};
`;

fs.writeFileSync('visualizer/quests_section3_data.js', output, 'utf8');
console.log('✅ Generated visualizer/quests_section3_data.js with', section3Quests.length, 'quests!');
