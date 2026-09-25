const fs = require('fs');

// Read syntax_gym_data.js
let code = fs.readFileSync('visualizer/syntax_gym_data.js', 'utf8');
code = code.replace('const SYNTAX_GYM_DRILLS = [', 'global.SYNTAX_GYM_DRILLS = [');
eval(code);

// Drills 300 to 399 represent Section 04 (100 drills)
const drills = global.SYNTAX_GYM_DRILLS.slice(300, 400);

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
  const cleanCol = correctCol.replace(/[;,]/g, '').trim();
  const pool = schema.cols.filter(c => c.toLowerCase() !== cleanCol.toLowerCase());
  const sh = shuffle(pool);
  const distractors = sh.slice(0, 3).map(c => correctCol.endsWith(';') ? c + ';' : (correctCol.endsWith(',') ? c + ',' : c));
  while (distractors.length < 3) {
    const fallback = 'col_' + (distractors.length + 1) + (correctCol.endsWith(';') ? ';' : (correctCol.endsWith(',') ? ',' : ''));
    distractors.push(fallback);
  }
  return shuffle([correctCol, ...distractors]);
}

function getTableDistractors(correctTable) {
  const cleanTable = correctTable.replace(/;$/, '').trim();
  const hasSemi = correctTable.endsWith(';');
  const pool = ALL_TABLES.filter(t => t.toLowerCase() !== cleanTable.toLowerCase());
  const sh = shuffle(pool).slice(0, 3).map(t => hasSemi ? t + ';' : t);
  return shuffle([correctTable, ...sh]);
}

function buildSection4Quests() {
  const quests = [];

  drills.forEach((d, idx) => {
    const levelNum = idx + 1;
    const q = d.targetQuery.trim();
    const tblName = d.table || 'Students';
    const schemaObj = SCHEMAS[tblName] || SCHEMAS.Students;

    let tier = 'Apprentice';
    let tierColor = '#38bdf8';
    if (levelNum > 20 && levelNum <= 45) {
      tier = 'Practitioner';
      tierColor = '#10b981';
    } else if (levelNum > 45 && levelNum <= 75) {
      tier = 'Specialist';
      tierColor = '#f59e0b';
    } else if (levelNum > 75) {
      tier = 'Master (FAANG-Ready)';
      tierColor = '#ec4899';
    }

    let template = [];
    let slots = {};

    // ---------------------------------------------------------------------------
    // TIER 1: Levels 1–20 (3 Blanks) - Basic Aggregates (COUNT, SUM)
    // Interleaving: FROM [table] (Foundations) + Aggregate Func + Alias
    // ---------------------------------------------------------------------------
    if (levelNum <= 20) {
      const selectMatch = q.match(/SELECT\s+(.*?)\s+FROM\s+(.*?);/is);
      const aggProj = selectMatch ? selectMatch[1].trim() : 'COUNT(*) AS total_count';
      const fromTbl = (selectMatch ? selectMatch[2].trim() : tblName) + ';';

      // Split aggProj into func and alias (e.g. "COUNT(*) AS total_students")
      const asParts = aggProj.split(/\s+AS\s+/i);
      const aggFunc = asParts[0].trim();
      const alias = asParts[1] ? asParts[1].trim() : 'total';

      if (levelNum % 2 !== 0) {
        // Odd: SELECT [aggFunc] AS [alias]\nFROM [fromTbl]
        template = [
          { text: 'SELECT ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ' AS ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: '\nFROM ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
        ];

        let aggDistractors = [];
        if (aggFunc.startsWith('COUNT')) {
          aggDistractors = ['TOTAL(*)', 'SUM(*)', 'COUNT(ALL)'];
        } else if (aggFunc.startsWith('SUM')) {
          const inner = aggFunc.match(/\((.*?)\)/) ? aggFunc.match(/\((.*?)\)/)[1] : 'val';
          aggDistractors = [`AVG(${inner})`, `TOTAL(${inner})`, `COUNT(${inner})`];
        } else {
          aggDistractors = ['CALC(*)', 'TOTAL(*)', 'AGG(*)'];
        }

        slots = {
          slot1: { correct: aggFunc, options: shuffle([aggFunc, ...aggDistractors]) },
          slot2: { correct: alias, options: shuffle([alias, alias + '_val', 'metric', 'stat_result']) },
          slot3: { correct: fromTbl, options: getTableDistractors(fromTbl) }
        };
      } else {
        // Even: [SELECT] aggFunc AS [alias]\nFROM [fromTbl]
        template = [
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ` ${aggFunc} AS `, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: '\nFROM ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' }
        ];

        slots = {
          slot1: { correct: 'SELECT', options: shuffle(['SELECT', 'EXTRACT', 'GET', 'CHOOSE']) },
          slot2: { correct: alias, options: shuffle([alias, alias + '_summary', 'calculated_num', 'result']) },
          slot3: { correct: fromTbl, options: getTableDistractors(fromTbl) }
        };
      }
    }
    // ---------------------------------------------------------------------------
    // TIER 2: Levels 21–45 (3–4 Blanks) - AVG, MIN/MAX, COUNT(DISTINCT)
    // ---------------------------------------------------------------------------
    else if (levelNum <= 45) {
      if (levelNum <= 30) {
        // ROUND(AVG(...), n) AS alias FROM table;
        const match = q.match(/SELECT\s+(.*?)\s+FROM\s+(.*?);/is);
        const expr = match ? match[1].trim() : 'ROUND(AVG(salary), 2) AS avg_sal';
        const fromTbl = (match ? match[2].trim() : tblName) + ';';

        const asParts = expr.split(/\s+AS\s+/i);
        const roundExpr = asParts[0].trim();
        const alias = asParts[1] ? asParts[1].trim() : 'avg_metric';

        // 4 Blanks: SELECT [ROUND] ( [AVG(col)] , 2 ) AS [alias] \nFROM [fromTbl]
        const innerAvg = roundExpr.match(/ROUND\((.*?),\s*(\d+)\)/is);
        const avgPart = innerAvg ? innerAvg[1].trim() : 'AVG(price)';
        const precision = innerAvg ? innerAvg[2].trim() : '2';

        template = [
          { text: 'SELECT ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: '(', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: `, ${precision}) AS `, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: '\nFROM ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];

        slots = {
          slot1: { correct: 'ROUND', options: shuffle(['ROUND', 'TRUNC', 'CEIL', 'FLOOR']) },
          slot2: { correct: avgPart, options: shuffle([avgPart, avgPart.replace(/AVG/i, 'MEAN'), avgPart.replace(/AVG/i, 'MEDIAN'), avgPart.replace(/AVG/i, 'SUM')]) },
          slot3: { correct: alias, options: shuffle([alias, alias + '_stat', 'avg_val', 'score']) },
          slot4: { correct: fromTbl, options: getTableDistractors(fromTbl) }
        };
      } else if (levelNum <= 40) {
        // MIN & MAX: SELECT MIN(col) AS min_a, MAX(col) AS max_b FROM table;
        const fromTbl = tblName + ';';
        // Extract MIN(x) and MAX(y)
        const minMatch = q.match(/MIN\((.*?)\)\s+AS\s+(\w+)/i);
        const maxMatch = q.match(/MAX\((.*?)\)\s+AS\s+(\w+)/i);
        const minCol = minMatch ? minMatch[1] : 'price';
        const minAlias = minMatch ? minMatch[2] : 'lowest';
        const maxAlias = maxMatch ? maxMatch[2] : 'highest';

        template = [
          { text: 'SELECT ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: `(${minCol}) AS ${minAlias}, `, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: `(${minCol}) AS `, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: '\nFROM ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];

        slots = {
          slot1: { correct: 'MIN', options: shuffle(['MIN', 'LOWEST', 'LEAST', 'SMALLEST']) },
          slot2: { correct: 'MAX', options: shuffle(['MAX', 'HIGHEST', 'GREATEST', 'TOP']) },
          slot3: { correct: maxAlias, options: shuffle([maxAlias, 'peak_value', 'upper_bound', 'high_val']) },
          slot4: { correct: fromTbl, options: getTableDistractors(fromTbl) }
        };
      } else {
        // COUNT(DISTINCT col) AS alias FROM table;
        const fromTbl = tblName + ';';
        const match = q.match(/COUNT\(DISTINCT\s+(.*?)\)\s+AS\s+(\w+)/i);
        const distCol = match ? match[1] : 'category';
        const distAlias = match ? match[2] : 'unique_count';

        template = [
          { text: 'SELECT COUNT(', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: ') AS ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: '\nFROM ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];

        slots = {
          slot1: { correct: 'DISTINCT', options: shuffle(['DISTINCT', 'UNIQUE', 'DIFFERENT', 'ISOLATED']) },
          slot2: { correct: distCol, options: getColumnDistractors(tblName, distCol) },
          slot3: { correct: distAlias, options: shuffle([distAlias, 'cardinality', 'distinct_total', 'unique_metric']) },
          slot4: { correct: fromTbl, options: getTableDistractors(fromTbl) }
        };
      }
    }
    // ---------------------------------------------------------------------------
    // TIER 3: Levels 46–75 (4 Blanks) - Single-Column & Multi-Column GROUP BY
    // ---------------------------------------------------------------------------
    else if (levelNum <= 75) {
      if (levelNum <= 60) {
        // SELECT col, COUNT(*) AS alias FROM table GROUP BY col;
        const groupMatch = q.match(/SELECT\s+(.*?),\s+(.*?)\s+FROM\s+(.*?)\s+GROUP BY\s+(.*?);/is);
        const groupCol = groupMatch ? groupMatch[1].trim() : 'department';
        const aggExpr = groupMatch ? groupMatch[2].trim() : 'COUNT(*) AS cnt';
        const fromTbl = groupMatch ? groupMatch[3].trim() : tblName;
        const byCol = (groupMatch ? groupMatch[4].trim() : groupCol) + ';';

        template = [
          { text: 'SELECT ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: `, ${aggExpr}\nFROM `, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: '\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];

        slots = {
          slot1: { correct: groupCol, options: getColumnDistractors(tblName, groupCol) },
          slot2: { correct: fromTbl, options: getTableDistractors(fromTbl) },
          slot3: { correct: 'GROUP BY', options: shuffle(['GROUP BY', 'ORDER BY', 'PARTITION BY', 'CLUSTER BY']) },
          slot4: { correct: byCol, options: shuffle([byCol, byCol.replace(/;$/, '') + ' ASC;', '1;', 'ALL;']) }
        };
      } else if (levelNum <= 70) {
        // Multi-metric rollups: SELECT col, COUNT(*) AS c, ROUND(AVG(x), 2) AS a FROM table GROUP BY col;
        const groupMatch = q.match(/SELECT\s+(.*?),\s+(.*?)\s+FROM\s+(.*?)\s+GROUP BY\s+(.*?);/is);
        const groupCol = groupMatch ? groupMatch[1].trim() : 'genre';
        const fromTbl = groupMatch ? groupMatch[3].trim() : tblName;
        const byCol = (groupMatch ? groupMatch[4].trim() : groupCol) + ';';

        template = [
          { text: 'SELECT ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: `, COUNT(*) AS total_records\nFROM `, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: '\n', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];

        slots = {
          slot1: { correct: groupCol, options: getColumnDistractors(tblName, groupCol) },
          slot2: { correct: fromTbl, options: getTableDistractors(fromTbl) },
          slot3: { correct: 'GROUP BY', options: shuffle(['GROUP BY', 'AGGREGATE BY', 'ORDER BY', 'BUCKET BY']) },
          slot4: { correct: byCol, options: shuffle([byCol, 'id;', 'status;', 'val;']) }
        };
      } else {
        // Multi-Column GROUP BY: SELECT col1, col2, COUNT(*) AS c FROM table GROUP BY col1, col2;
        const groupMatch = q.match(/SELECT\s+(.*?),\s+(.*?),\s+(.*?)\s+FROM\s+(.*?)\s+GROUP BY\s+(.*?);/is);
        const col1 = groupMatch ? groupMatch[1].trim() : 'city';
        const col2 = groupMatch ? groupMatch[2].trim() : 'major';
        const fromTbl = groupMatch ? groupMatch[4].trim() : tblName;
        const byCols = (groupMatch ? groupMatch[5].trim() : `${col1}, ${col2}`) + ';';

        template = [
          { text: 'SELECT ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: ', ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: `, COUNT(*) AS group_count\nFROM ${fromTbl}\n`, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];

        slots = {
          slot1: { correct: col1, options: getColumnDistractors(tblName, col1) },
          slot2: { correct: col2, options: getColumnDistractors(tblName, col2) },
          slot3: { correct: 'GROUP BY', options: shuffle(['GROUP BY', 'COMBINE BY', 'ORDER BY', 'SPLIT BY']) },
          slot4: { correct: byCols, options: shuffle([byCols, `${col2}, ${col1};`, `${col1};`, `${col2};`]) }
        };
      }
    }
    // ---------------------------------------------------------------------------
    // TIER 4: Levels 76–100 (4 to 5 Blanks) - HAVING & Full Lifecycle SQL
    // ---------------------------------------------------------------------------
    else {
      if (levelNum <= 90) {
        // HAVING filtering: SELECT col, agg FROM table GROUP BY col HAVING agg_condition;
        const m = q.match(/SELECT\s+(.*?),\s+(.*?)\s+FROM\s+(.*?)\s+GROUP BY\s+(.*?)\s+HAVING\s+(.*?);/is);
        const groupCol = m ? m[1].trim() : 'major';
        const aggExpr = m ? m[2].trim() : 'COUNT(*) AS cnt';
        const fromTbl = m ? m[3].trim() : tblName;
        const byCol = m ? m[4].trim() : groupCol;
        const havingCond = (m ? m[5].trim() : 'COUNT(*) >= 2') + ';';

        // 4 Blanks: SELECT [groupCol]... FROM [fromTbl] GROUP BY [byCol] [HAVING] [havingCond]
        template = [
          { text: `SELECT `, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: `, ${aggExpr}\nFROM `, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: `\nGROUP BY ${byCol}\n`, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ' ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' }
        ];

        slots = {
          slot1: { correct: groupCol, options: getColumnDistractors(tblName, groupCol) },
          slot2: { correct: fromTbl, options: getTableDistractors(fromTbl) },
          slot3: { correct: 'HAVING', options: shuffle(['HAVING', 'WHERE', 'FILTER', 'QUALIFY']) },
          slot4: { correct: havingCond, options: shuffle([
            havingCond,
            havingCond.replace(/>=/g, '<=').replace(/>/g, '<'),
            havingCond.replace(/\d+/, '100'),
            havingCond.replace(/COUNT/i, 'SUM')
          ]) }
        };
      } else {
        // Full Lifecycle SQL (5 Blanks!):
        // SELECT col, agg FROM table WHERE pred GROUP BY col HAVING cond ORDER BY col dir LIMIT n;
        // Example: SELECT department, COUNT(*) AS staff_count FROM Employees WHERE salary > 50000 GROUP BY department HAVING COUNT(*) >= 2 ORDER BY staff_count DESC;
        const fromTbl = tblName;
        const whereMatch = q.match(/WHERE\s+(.*?)\s+GROUP BY/is);
        const wherePred = whereMatch ? whereMatch[1].trim() : 'salary > 50000';
        const groupMatch = q.match(/GROUP BY\s+(.*?)\s+HAVING/is);
        const groupCol = groupMatch ? groupMatch[1].trim() : 'department';
        const havingMatch = q.match(/HAVING\s+(.*?)\s+ORDER BY/is);
        const havingCond = havingMatch ? havingMatch[1].trim() : 'COUNT(*) >= 2';
        const orderMatch = q.match(/ORDER BY\s+(.*?)(?:LIMIT|$)/is);
        const orderPart = orderMatch ? orderMatch[1].trim().replace(/;$/, '') : 'staff_count DESC';
        const hasLimit = /LIMIT\s+(\d+)/i.test(q);
        const limitVal = hasLimit ? q.match(/LIMIT\s+(\d+)/i)[1] : '3';

        template = [
          { text: `SELECT ${groupCol}, COUNT(*) AS total_metric\nFROM `, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot1', placeholder: '[ ___ ]' },
          { text: '\nWHERE ', isBlank: false },
          { text: '', isBlank: true, slotId: 'slot2', placeholder: '[ ___ ]' },
          { text: `\nGROUP BY ${groupCol}\n`, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot3', placeholder: '[ ___ ]' },
          { text: ` ${havingCond}\nORDER BY `, isBlank: false },
          { text: '', isBlank: true, slotId: 'slot4', placeholder: '[ ___ ]' },
          { text: hasLimit ? '\nLIMIT ' : ';', isBlank: false }
        ];

        if (hasLimit) {
          template.push({ text: '', isBlank: true, slotId: 'slot5', placeholder: '[ ___ ]' });
        }

        slots = {
          slot1: { correct: fromTbl, options: getTableDistractors(fromTbl) },
          slot2: { correct: wherePred, options: shuffle([wherePred, wherePred.replace(/>/g, '<'), wherePred.replace(/=/g, '!='), 'status IS NULL']) },
          slot3: { correct: 'HAVING', options: shuffle(['HAVING', 'WHERE', 'RESTRICT', 'CHECK']) },
          slot4: { correct: orderPart + (hasLimit ? '' : ';'), options: shuffle([
            orderPart + (hasLimit ? '' : ';'),
            orderPart.replace(/DESC/i, 'ASC').replace(/ASC/i, 'DESC') + (hasLimit ? '' : ';'),
            'id ASC' + (hasLimit ? '' : ';'),
            'total_metric ASC' + (hasLimit ? '' : ';')
          ]) }
        };

        if (hasLimit) {
          slots.slot5 = {
            correct: `${limitVal};`,
            options: shuffle([`${limitVal};`, '1;', '10;', '50;'])
          };
        }
      }
    }

    // Verify option uniqueness in slots
    for (const [sId, sData] of Object.entries(slots)) {
      const opts = sData.options;
      const uniq = [...new Set(opts)];
      if (uniq.length < 4) {
        // Pad out duplicates
        let padIdx = 1;
        while (uniq.length < 4) {
          const fake = sData.correct + '_' + padIdx++;
          if (!uniq.includes(fake)) uniq.push(fake);
        }
        sData.options = shuffle(uniq);
      }
    }

    const questObj = {
      id: 300 + levelNum,
      levelDisplay: `Level ${levelNum.toString().padStart(2, '0')}`,
      title: `Level ${levelNum.toString().padStart(2, '0')}: ${d.title}`,
      subtitle: d.scenario || d.businessObjective,
      type: "fill_blank",
      category: "Section 04: Aggregations & GROUP BY",
      subcluster: d.subcluster || '4.1 Basic Aggregations',
      tier: tier,
      tierColor: tierColor,
      difficulty: tier,
      task: d.scenario || d.businessObjective,
      xp: 20 + levelNum * 2,
      table: tblName,
      scenario: d.scenario || d.businessObjective,
      businessObjective: d.businessObjective || d.scenario,
      schemaSnippet: schemaObj.snippet,
      targetQuery: q,
      template: template,
      slots: slots,
      syntaxRule: d.syntaxRule || 'Aggregate functions summarize data. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.',
      syntaxTrap: d.syntaxTrap || "Writing an aggregate function in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from GROUP BY.",
      eli5Story: d.eli5Story || `Aggregating and grouping data on ${tblName}.`
    };

    quests.push(questObj);
  });

  return quests;
}

const quests = buildSection4Quests();
const fileContent = `// =============================================================================
// SECTION 04: AGGREGATIONS & GROUP BY (100 INTERACTIVE MULTI-BLANK QUESTS)
// Progressive Cumulative 3-to-5 Blank Challenge Engine Interleaving Foundations, Filters & Aggregates
// =============================================================================

window.QUESTS_SECTION_4 = ${JSON.stringify(quests, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SECTION4_QUESTS: window.QUESTS_SECTION_4 };
}
`;

fs.writeFileSync('visualizer/quests_section4_data.js', fileContent, 'utf8');
console.log(`Generated visualizer/quests_section4_data.js with ${quests.length} quests!`);
