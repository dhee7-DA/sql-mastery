/**
 * SQL FOUNDRY - FRIENDLY ERROR DOCTOR & AUTO-FIX ENGINE
 * Converts cryptic database parser and execution errors into plain-English beginner guides
 * with 1-click automatic query repair.
 */

(function() {
  'use strict';

  // Table and column schemas across all scenarios for intelligent typo correction
  const SCHEMAS = {
    amazon: {
      tables: ['amazon_prime_orders'],
      columns: ['order_id', 'customer_id', 'purchase_date', 'product_id']
    },
    netflix: {
      tables: ['playback_telemetry_events'],
      columns: ['event_id', 'isp_asn', 'ttff_ms', 'rebuffer_seconds', 'play_duration_sec']
    },
    uber: {
      tables: ['uber_ride_requests', 'uber_driver_telemetry'],
      columns: ['request_id', 'h3_index', 'requested_at', 'drivers']
    },
    airbnb: {
      tables: ['airbnb_reservations'],
      columns: ['reservation_id', 'listing_id', 'check_in_date', 'check_out_date', 'status']
    },
    spotify: {
      tables: ['stream_events'],
      columns: ['event_id', 'track_id', 'artist_id', 'territory', 'duration_seconds']
    },
    jpmorgan: {
      tables: ['general_ledger_entries'],
      columns: ['entry_id', 'bank_branch', 'account_name', 'entry_type', 'amount_usd']
    },
    stripe: {
      tables: ['card_authorization_events'],
      columns: ['auth_id', 'card_number_masked', 'ip_location', 'amount_usd', 'charge_time']
    }
  };

  /**
   * Calculate simple Levenshtein distance between two strings
   */
  function levenshtein(a, b) {
    if (!a || !b) return (a || '').length + (b || '').length;
    const s1 = a.toLowerCase();
    const s2 = b.toLowerCase();
    const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
    for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
    for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;
    for (let j = 1; j <= s2.length; j += 1) {
      for (let i = 1; i <= s1.length; i += 1) {
        const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1,
          track[j - 1][i] + 1,
          track[j - 1][i - 1] + indicator
        );
      }
    }
    return track[s2.length][s1.length];
  }

  /**
   * Find closest column name in schema
   */
  function findClosestColumn(badCol, validCols) {
    if (!badCol || !validCols || validCols.length === 0) return null;
    const lowerBad = badCol.toLowerCase();
    let best = null;
    let minD = 99;

    for (const c of validCols) {
      const lowerC = c.toLowerCase();
      // exact substring match boost
      if (lowerC.includes(lowerBad) || lowerBad.includes(lowerC)) {
        return c;
      }
      const d = levenshtein(lowerBad, lowerC);
      if (d < minD && d <= 3) {
        minD = d;
        best = c;
      }
    }
    return best;
  }

  /**
   * Helper to locate which line in SQL the error/snippet is on
   */
  function findLineNumber(sql, patternOrString) {
    if (!sql || !patternOrString) return 1;
    const lines = sql.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (typeof patternOrString === 'string') {
        if (lines[i].toLowerCase().includes(patternOrString.toLowerCase())) {
          return i + 1;
        }
      } else if (patternOrString.test(lines[i])) {
        return i + 1;
      }
    }
    return 1;
  }

  /**
   * Core Diagnosis Function
   */
  function diagnose(sql, rawError, context) {
    const rawStr = String(rawError || '').trim();
    const query = String(sql || '').trim();
    context = context || {};

    const availableCols = context.columns || [];
    const availableTables = context.tables || [];

    // 1. Extra Trailing Comma before FROM
    // e.g. "SELECT customer_id, purchase_date, FROM amazon_prime_orders"
    const trailMatch = query.match(/,\s*FROM\b/i);
    if (trailMatch || (rawStr.includes('syntax error') && /,\s*FROM\b/i.test(query))) {
      const fixedSql = query.replace(/,(\s*FROM\b)/i, '$1');
      const lineNum = findLineNumber(query, /,\s*FROM\b/i);
      return {
        hasError: true,
        type: 'TRAILING_COMMA',
        friendlyTitle: 'Extra Comma Before FROM',
        explanation: 'You have a trailing comma (<code>,</code>) right before the <code>FROM</code> keyword. In SQL, commas are only used to separate columns, so the final column before <code>FROM</code> must not end with a comma.',
        beginnerRule: 'Never put a comma after the final column in your SELECT list.',
        problemSnippet: '... column, FROM ...',
        fixedSnippet: '... column FROM ...',
        fixedSql: fixedSql,
        fixedLineNumber: lineNum,
        autoFixAvailable: true,
        rawErrorText: rawStr
      };
    }

    // 2. Double Equals (==) used instead of Single Equals (=)
    // Common Python/JS beginner habit
    if (query.includes('==')) {
      const fixedSql = query.replace(/==/g, '=');
      const lineNum = findLineNumber(query, '==');
      return {
        hasError: true,
        type: 'DOUBLE_EQUALS',
        friendlyTitle: 'Double Equals (==) Instead of Single Equals (=)',
        explanation: 'In SQL, checking if two values are equal uses a single equals sign (<code>=</code>). Double equals (<code>==</code>) is standard in JavaScript and Python, but causes syntax errors in standard SQL databases.',
        beginnerRule: 'In SQL, equality is always single = (e.g. WHERE status = \'active\').',
        problemSnippet: 'WHERE column == value',
        fixedSnippet: 'WHERE column = value',
        fixedSql: fixedSql,
        fixedLineNumber: lineNum,
        autoFixAvailable: true,
        rawErrorText: rawStr
      };
    }

    
    // 2b. Comparing NULL with Equals (= NULL, == NULL, != NULL, <> NULL)
    // Common SQL beginner trap: NULL cannot be compared with equality operators
    const nullEqMatch = query.match(/\b([a-zA-Z0-9_\.]+)\s*(=|==)\s*NULL\b/i);
    const nullNeqMatch = query.match(/\b([a-zA-Z0-9_\.]+)\s*(!=|<>)\s*NULL\b/i);
    if (nullEqMatch) {
      const col = nullEqMatch[1];
      const badExpr = nullEqMatch[0];
      const goodExpr = col + ' IS NULL';
      const fixedSql = query.replace(badExpr, goodExpr);
      const lineNum = findLineNumber(query, badExpr);
      return {
        hasError: true,
        type: 'NULL_EQUALS',
        friendlyTitle: 'Comparing NULL with Equals (=)',
        explanation: 'You wrote <code>' + badExpr + '</code>. In SQL, <code>NULL</code> represents unknown or missing data. Because unknown data can never equal anything (even itself), <code>= NULL</code> always evaluates to UNKNOWN and returns 0 rows! You must use <code>IS NULL</code> instead.',
        beginnerRule: 'Never compare NULL with =. Always use IS NULL or IS NOT NULL.',
        problemSnippet: badExpr,
        fixedSnippet: goodExpr,
        fixedSql: fixedSql,
        fixedLineNumber: lineNum,
        autoFixAvailable: true,
        rawErrorText: rawStr
      };
    }
    if (nullNeqMatch) {
      const col = nullNeqMatch[1];
      const badExpr = nullNeqMatch[0];
      const goodExpr = col + ' IS NOT NULL';
      const fixedSql = query.replace(badExpr, goodExpr);
      const lineNum = findLineNumber(query, badExpr);
      return {
        hasError: true,
        type: 'NULL_NOT_EQUALS',
        friendlyTitle: 'Comparing NULL with Not-Equals (!=)',
        explanation: 'You wrote <code>' + badExpr + '</code>. In SQL, testing for non-null values requires <code>IS NOT NULL</code> instead of <code>!= NULL</code>.',
        beginnerRule: 'Always use IS NOT NULL instead of != NULL or <> NULL.',
        problemSnippet: badExpr,
        fixedSnippet: goodExpr,
        fixedSql: fixedSql,
        fixedLineNumber: lineNum,
        autoFixAvailable: true,
        rawErrorText: rawStr
      };
    }

    // 3. Unquoted String Literal or Typo in Column
    // e.g. rawStr is "no such column: Electronics" or "no such column: PROD_KINDLE"
    const colMatch = rawStr.match(/no such column:\s*([a-zA-Z0-9_]+)/i);
    if (colMatch) {
      const badIdent = colMatch[1];
      const isKnownCol = availableCols.map(c => c.toLowerCase()).includes(badIdent.toLowerCase());

      // Check if badIdent is being compared in an equality / IN / inequality expression
      const compRegex = new RegExp(`(=|!=|<>|LIKE|IN\\s*\\()\\s*(\\b${badIdent}\\b)`, 'i');
      const isComparison = compRegex.test(query);

      if (!isKnownCol && (isComparison || badIdent.startsWith('PROD_') || badIdent.startsWith('ORD_') || badIdent.startsWith('CUST_') || badIdent === badIdent.toUpperCase())) {
        // Missing quotes around string literal!
        const fixedSql = query.replace(new RegExp(`(\\b${badIdent}\\b)`, 'g'), `'${badIdent}'`);
        const lineNum = findLineNumber(query, badIdent);
        return {
          hasError: true,
          type: 'UNQUOTED_STRING',
          friendlyTitle: `Missing Quotes Around Text Value '${badIdent}'`,
          explanation: `You wrote <code>${badIdent}</code> without quotes. In SQL, any bare word without quotes is assumed to be a table column! Because your table does not have a column called <code>${badIdent}</code>, the database threw an error. Words and text values must always be wrapped in single quotes.`,
          beginnerRule: `Wrap all text/strings in single quotes: '${badIdent}'. Column names stay unquoted.`,
          problemSnippet: `... = ${badIdent}`,
          fixedSnippet: `... = '${badIdent}'`,
          fixedSql: fixedSql,
          fixedLineNumber: lineNum,
          autoFixAvailable: true,
          rawErrorText: rawStr
        };
      }

      // Check for typo in column name
      const closest = findClosestColumn(badIdent, availableCols);
      if (closest) {
        const fixedSql = query.replace(new RegExp(`\\b${badIdent}\\b`, 'g'), closest);
        const lineNum = findLineNumber(query, badIdent);
        return {
          hasError: true,
          type: 'COLUMN_TYPO',
          friendlyTitle: `Typo in Column Name '${badIdent}'`,
          explanation: `The table does not contain a column called <code>${badIdent}</code>. Looking at the table schema, did you mean <code>${closest}</code>?`,
          beginnerRule: `Check spelling against the schema. Available columns: ${availableCols.slice(0, 4).join(', ')}.`,
          problemSnippet: badIdent,
          fixedSnippet: closest,
          fixedSql: fixedSql,
          fixedLineNumber: lineNum,
          autoFixAvailable: true,
          rawErrorText: rawStr
        };
      }
    }

    // 4. Clause Order Violation: WHERE placed after ORDER BY or GROUP BY
    const orderIdx = query.toUpperCase().indexOf('ORDER BY');
    const groupIdx = query.toUpperCase().indexOf('GROUP BY');
    const whereIdx = query.toUpperCase().indexOf('WHERE');

    if (whereIdx !== -1 && orderIdx !== -1 && whereIdx > orderIdx) {
      // Re-arrange WHERE before ORDER BY
      const whereMatch = query.match(/\bWHERE\b[\s\S]*?(?=\bORDER BY\b|\bLIMIT\b|$)/i);
      const orderMatch = query.match(/\bORDER BY\b[\s\S]*?(?=\bWHERE\b|\bLIMIT\b|$)/i);

      if (whereMatch && orderMatch) {
        const whereClause = whereMatch[0].trim();
        const orderClause = orderMatch[0].trim();
        let fixedSql = query.replace(whereClause, '').replace(orderClause, '').trim();
        fixedSql = `${fixedSql}\n${whereClause}\n${orderClause};`.replace(/;+$/, ';');
        const lineNum = findLineNumber(query, 'WHERE');
        return {
          hasError: true,
          type: 'CLAUSE_ORDER',
          friendlyTitle: 'WHERE Clause Placed After ORDER BY',
          explanation: 'In SQL, clauses must follow a strict order of execution. The <code>WHERE</code> filter must come <strong>before</strong> <code>ORDER BY</code> because the database filters the rows first, and only sorts the remaining rows at the very end.',
          beginnerRule: 'Execution Order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.',
          problemSnippet: '... ORDER BY ... WHERE ...',
          fixedSnippet: '... WHERE ... ORDER BY ...',
          fixedSql: fixedSql,
          fixedLineNumber: lineNum,
          autoFixAvailable: true,
          rawErrorText: rawStr
        };
      }
    }

    // 5. Aggregate Function in WHERE Clause
    // e.g. "WHERE COUNT(*) > 5" or SQLite error "misuse of aggregate function"
    if (/\bWHERE\b[\s\S]*?\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(query) || rawStr.toLowerCase().includes('misuse of aggregate')) {
      const fixedSql = query.replace(/\bWHERE\b([\s\S]*?\b(?:COUNT|SUM|AVG|MIN|MAX)\s*\([^)]*\)\s*(?:[><=!]+\s*\d+))/i, 'HAVING $1');
      const lineNum = findLineNumber(query, /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i);
      return {
        hasError: true,
        type: 'AGG_IN_WHERE',
        friendlyTitle: 'Aggregate Function Inside WHERE Clause',
        explanation: 'You used an aggregate summary function (like <code>COUNT</code>, <code>SUM</code>, or <code>AVG</code>) inside a <code>WHERE</code> clause. <code>WHERE</code> filters individual rows <em>before</em> grouping. To filter groups or totals, SQL requires the <code>HAVING</code> clause.',
        beginnerRule: 'WHERE filters rows before aggregation. HAVING filters calculated totals after GROUP BY.',
        problemSnippet: 'WHERE COUNT(...) > ...',
        fixedSnippet: 'HAVING COUNT(...) > ...',
        fixedSql: fixedSql,
        fixedLineNumber: lineNum,
        autoFixAvailable: true,
        rawErrorText: rawStr
      };
    }

    // 6. Misspelled Core Keyword (SEELCT, FORM, WHER, etc.)
    const keywordTypos = [
      { pattern: /\bSEELCT\b/i, correct: 'SELECT' },
      { pattern: /\bSELCT\b/i, correct: 'SELECT' },
      { pattern: /\bFORM\b(?=\s+[a-zA-Z_])/i, correct: 'FROM' },
      { pattern: /\bWHER\b/i, correct: 'WHERE' },
      { pattern: /\bGRUP BY\b/i, correct: 'GROUP BY' },
      { pattern: /\bORDR BY\b/i, correct: 'ORDER BY' },
      { pattern: /\bLIMT\b/i, correct: 'LIMIT' }
    ];

    for (const kw of keywordTypos) {
      if (kw.pattern.test(query)) {
        const fixedSql = query.replace(kw.pattern, kw.correct);
        const lineNum = findLineNumber(query, kw.pattern);
        return {
          hasError: true,
          type: 'KEYWORD_TYPO',
          friendlyTitle: `Typo in Keyword: Did you mean '${kw.correct}'?`,
          explanation: `A core SQL keyword appears to be misspelled. SQL grammar requires exact spelling for keywords like <code>${kw.correct}</code>.`,
          beginnerRule: 'Key SQL keywords to remember: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.',
          problemSnippet: `... ${kw.correct.toLowerCase()} ...`,
          fixedSnippet: `... ${kw.correct} ...`,
          fixedSql: fixedSql,
          fixedLineNumber: lineNum,
          autoFixAvailable: true,
          rawErrorText: rawStr
        };
      }
    }

    // 7. Unclosed Single Quote
    const singleQuotes = (query.match(/'/g) || []).length;
    if (singleQuotes % 2 !== 0 || rawStr.includes('unrecognized token') || rawStr.includes('unclosed quote')) {
      const fixedSql = query + "';";
      const lineNum = findLineNumber(query, "'");
      return {
        hasError: true,
        type: 'UNCLOSED_QUOTE',
        friendlyTitle: 'Unclosed Single Quote (\')',
        explanation: 'There is an uneven number of single quotes in your query. Every opening quote (<code>\'</code>) must have a matching closing quote (<code>\'</code>) around the text.',
        beginnerRule: 'Quotes always come in pairs: \'text here\'. Check for missing closing quotes.',
        problemSnippet: "'text without ending quote",
        fixedSnippet: "'text with quote'",
        fixedSql: fixedSql,
        fixedLineNumber: lineNum,
        autoFixAvailable: true,
        rawErrorText: rawStr
      };
    }

    // 8. Typo in Table Name
    const tblMatch = rawStr.match(/no such table:\s*([a-zA-Z0-9_]+)/i);
    if (tblMatch) {
      const badTbl = tblMatch[1];
      let bestTbl = null;
      if (availableTables.length > 0) {
        let minD = 99;
        for (const t of availableTables) {
          const d = levenshtein(badTbl, t);
          if (d < minD) { minD = d; bestTbl = t; }
        }
      }
      if (bestTbl) {
        const fixedSql = query.replace(new RegExp(`\\b${badTbl}\\b`, 'g'), bestTbl);
        const lineNum = findLineNumber(query, badTbl);
        return {
          hasError: true,
          type: 'TABLE_TYPO',
          friendlyTitle: `Table '${badTbl}' Not Found`,
          explanation: `The database cannot find a table named <code>${badTbl}</code>. Did you mean <code>${bestTbl}</code>?`,
          beginnerRule: `Double check the table name spelling in the FROM clause. Expected: ${bestTbl}.`,
          problemSnippet: `FROM ${badTbl}`,
          fixedSnippet: `FROM ${bestTbl}`,
          fixedSql: fixedSql,
          fixedLineNumber: lineNum,
          autoFixAvailable: true,
          rawErrorText: rawStr
        };
      }
    }

    // 9. Missing FROM clause
    if (/\bSELECT\b/i.test(query) && !/\bFROM\b/i.test(query) && availableTables.length > 0) {
      const defaultTable = availableTables[0];
      const fixedSql = `${query.replace(/;*$/, '')}\nFROM ${defaultTable};`;
      const lineNum = findLineNumber(query, 'SELECT');
      return {
        hasError: true,
        type: 'MISSING_FROM',
        friendlyTitle: 'Missing FROM Clause',
        explanation: 'Your query selects columns, but never tells the database which table to read them from! Every SQL query querying data needs a <code>FROM table_name</code> clause.',
        beginnerRule: 'A query always needs both: SELECT (which columns) and FROM (which table).',
        problemSnippet: 'SELECT ... (missing FROM)',
        fixedSnippet: `SELECT ... FROM ${defaultTable}`,
        fixedSql: fixedSql,
        fixedLineNumber: lineNum,
        autoFixAvailable: true,
        rawErrorText: rawStr
      };
    }

    
    // =========================================================================
    // ARCHETYPE-AWARE AST & LOGIC TRAP DETECTORS (Patterns 01, 02, 07, 08, 09)
    // =========================================================================

    // 10.1 Anti-Join Logic Trap (Pattern 01)
    // Filter on right table in WHERE clause destroys outer join nullability
    const leftJoinMatch = query.match(/LEFT\s+(?:OUTER\s+)?JOIN\s+([a-zA-Z0-9_]+)(?:\s+(?:AS\s+)?([a-zA-Z0-9_]+))?\s+ON\s+([^WHERE;]+)/i);
    const whereMatch = query.match(/\bWHERE\b\s+([^;]+)/i);
    if (leftJoinMatch && whereMatch) {
      const rightAlias = leftJoinMatch[2] || leftJoinMatch[1];
      const whereBody = whereMatch[1];
      const badRightColMatch = whereBody.match(new RegExp('\\b' + rightAlias + '\\.([a-zA-Z0-9_]+)\\s*(=|!=|<>|>|<|LIKE|IN)\\s*([^\\s;]+)', 'i'));
      if (badRightColMatch && !/\bIS\s+(?:NOT\s+)?NULL\b/i.test(badRightColMatch[0])) {
        const badCondition = badRightColMatch[0].trim();
        const lineNum = findLineNumber(query, badCondition);
        const fixedOnClause = `${leftJoinMatch[0].trim()} AND ${badCondition}`;
        let fixedWhere = whereBody.replace(badCondition, '').replace(/\bAND\s+AND\b/gi, 'AND').replace(/^\s*AND\s+/i, '').replace(/\s+AND\s*$/i, '').trim();
        if (!fixedWhere || fixedWhere === ';') {
          fixedWhere = `${rightAlias}.order_id IS NULL`;
        }
        const fixedSql = query.replace(leftJoinMatch[0], fixedOnClause).replace(whereMatch[0], `WHERE ${fixedWhere}`);
        return {
          hasError: true,
          type: 'ARCHETYPE_TRAP_ANTI_JOIN_FILTER',
          friendlyTitle: 'Anti-Join Trap: Right-Table WHERE Filter Converts to INNER JOIN',
          explanation: `You wrote <code>${badCondition}</code> inside the <code>WHERE</code> clause. In a <code>LEFT JOIN</code>, unmatched rows have <code>NULL</code> in all right-table columns. Testing for a non-NULL value in <code>WHERE</code> wipes out every unmatched row you were trying to preserve, silently converting your query into an <code>INNER JOIN</code>!`,
          beginnerRule: 'In Anti-Joins, only check IS NULL on the right table in WHERE. Move all other right-table filter criteria up into the ON clause.',
          problemSnippet: `WHERE ${badCondition} -- Discards NULL holes!`,
          fixedSnippet: `ON ... AND ${badCondition} \nWHERE ${rightAlias}.id IS NULL`,
          fixedSql: fixedSql,
          fixedLineNumber: lineNum,
          autoFixAvailable: true,
          rawErrorText: rawStr || 'Logic Error: Right-table WHERE filter eliminates outer join preserved rows'
        };
      }
    }

    // 10.2 Window Function in WHERE Clause Trap (Pattern 02 & Pattern 07)
    const winInWhereMatch = query.match(/\bWHERE\b[\s\S]*?\b(ROW_NUMBER|RANK|DENSE_RANK|LAG|LEAD|SUM|AVG)\s*\([^)]*\)\s*OVER\b/i);
    if (winInWhereMatch || (rawStr.includes('window function') && /\bWHERE\b/i.test(query))) {
      const lineNum = findLineNumber(query, /OVER\s*\(/i);
      const fixedSql = `WITH ranked AS (\n  ${query.replace(/\bWHERE\b[\s\S]*$/i, '').trim()}\n)\nSELECT *\nFROM ranked\nWHERE rn <= 3;`;
      return {
        hasError: true,
        type: 'ARCHETYPE_TRAP_WINDOW_IN_WHERE',
        friendlyTitle: 'Top N Ranking Trap: Window Function Inside WHERE Clause',
        explanation: 'SQL evaluates the <code>WHERE</code> clause before calculating window functions (<code>OVER</code> clauses). The database cannot filter by <code>ROW_NUMBER()</code> or <code>RANK()</code> inside <code>WHERE</code> because those ranks do not exist yet when <code>WHERE</code> executes!',
        beginnerRule: 'Calculate your window ranking inside a CTE (WITH ranked AS (...)) or subquery first, then filter the resulting alias in the outer WHERE clause.',
        problemSnippet: 'WHERE ROW_NUMBER() OVER (...) <= 3',
        fixedSnippet: 'WITH ranked AS (...) SELECT * FROM ranked WHERE rn <= 3',
        fixedSql: fixedSql,
        fixedLineNumber: lineNum,
        autoFixAvailable: true,
        rawErrorText: rawStr || 'misuse of window function inside WHERE clause'
      };
    }

    // 10.3 Gaps & Islands Duplicate Dates Trap (Pattern 08)
    const hasGapsFormula = /DATE\s*\([^)]*-\s*[^)]*ROW_NUMBER/i.test(query) || (query.includes('ROW_NUMBER') && /-\s*\(?\s*rn\b/i.test(query));
    if (hasGapsFormula && !/\bDISTINCT\b/i.test(query)) {
      const lineNum = findLineNumber(query, /ROW_NUMBER/i);
      const fixedSql = query.replace(/\bSELECT\b/i, 'SELECT DISTINCT');
      return {
        hasError: true,
        type: 'ARCHETYPE_TRAP_GAPS_ISLANDS_DUPLICATES',
        friendlyTitle: 'Gaps & Islands Trap: Duplicate Dates Corrupt Invariant Anchors',
        explanation: 'If a user logs in multiple times on the same date, <code>ROW_NUMBER()</code> increments while the calendar date stays identical. This causes the invariant calculation (<code>date - ROW_NUMBER()</code>) to drift by -1 day for every duplicate, splitting a single streak into false islands!',
        beginnerRule: 'Always deduplicate user activity by day (SELECT DISTINCT user_id, activity_date) before calculating the date - ROW_NUMBER() invariant anchor.',
        problemSnippet: 'SELECT user_id, login_date ... (Duplicates present)',
        fixedSnippet: 'SELECT DISTINCT user_id, login_date ...',
        fixedSql: fixedSql,
        fixedLineNumber: lineNum,
        autoFixAvailable: true,
        rawErrorText: rawStr || 'Potential Data Anomaly: Duplicate partition dates skew streak islands'
      };
    }

    // 10.4 Recursive CTE Bare UNION Trap (Pattern 09)
    if (/\bWITH\s+RECURSIVE\b/i.test(query) && /\bUNION\b(?!\s+ALL\b)/i.test(query)) {
      const lineNum = findLineNumber(query, /\bUNION\b(?!\s+ALL\b)/i);
      const fixedSql = query.replace(/\bUNION\b(?!\s+ALL\b)/gi, 'UNION ALL');
      return {
        hasError: true,
        type: 'ARCHETYPE_TRAP_RECURSIVE_CTE_UNION',
        friendlyTitle: 'Recursive CTE Trap: UNION Causes Massive Recursion Overhead',
        explanation: 'Using bare <code>UNION</code> in a recursive query forces the database to run an expensive global hash deduplication across the entire accumulated working table on every single recursion step. In enterprise systems, this causes memory exhaustion and query timeouts.',
        beginnerRule: 'Always use UNION ALL in the recursive member of a CTE unless graph loop prevention specifically requires row deduplication.',
        problemSnippet: 'SELECT ... UNION SELECT ...',
        fixedSnippet: 'SELECT ... UNION ALL SELECT ...',
        fixedSql: fixedSql,
        fixedLineNumber: lineNum,
        autoFixAvailable: true,
        rawErrorText: rawStr || 'Performance Warning: Recursive CTE with set-deduplicating UNION'
      };
    }

        // 10.5 Frankenstein Record Trap (Pattern 07: Deduplication & Latest State)
    // GROUP BY with MAX(date) selecting unaggregated non-grouped columns
    const hasGroupBy = /\bGROUP\s+BY\b/i.test(query);
    const hasMaxOrMin = /\b(MAX|MIN)\s*\([a-zA-Z0-9_.]*(?:date|time|stamp|created|updated)[a-zA-Z0-9_.]*\)/i.test(query);
    if (hasGroupBy && hasMaxOrMin && !/\bROW_NUMBER\s*\(/i.test(query)) {
      const selectMatch = query.match(/\bSELECT\b([\s\S]*?)\bFROM\b/i);
      const groupMatch = query.match(/\bGROUP\s+BY\b([\s\S]*?)(?:\bORDER\b|\bHAVING\b|\bLIMIT\b|;|$)/i);
      if (selectMatch && groupMatch) {
        const selectCols = selectMatch[1].split(',').map(c => c.trim()).filter(c => !/\b(MAX|MIN|SUM|AVG|COUNT)\s*\(/i.test(c));
        const groupCols = groupMatch[1].split(',').map(c => c.trim());
        const unaggregated = selectCols.filter(sc => {
          const colClean = sc.replace(/.*\bas\s+/i, '').replace(/.*\./, '').trim();
          return !groupCols.some(gc => gc.includes(colClean));
        });
        if (unaggregated.length > 0) {
          const lineNum = findLineNumber(query, /\bGROUP\s+BY\b/i);
          const problemCol = unaggregated[0];
          return {
            hasError: true,
            type: 'ARCHETYPE_TRAP_FRANKENSTEIN_RECORD',
            friendlyTitle: 'Deduplication Trap: Frankenstein Record via Partial GROUP BY',
            explanation: `You selected <code>${problemCol}</code> while grouping by only a subset of columns with <code>MAX()</code>. The database returns the maximum timestamp from one row, but pairs it with an arbitrary <code>${problemCol}</code> value from a completely different row! This creates an invalid hybrid record that never existed.`,
            beginnerRule: 'Never use GROUP BY with MAX(date) to fetch the latest state of an entity. Instead, use ROW_NUMBER() OVER (PARTITION BY entity_id ORDER BY date DESC) in a CTE, then filter WHERE rn = 1.',
            problemSnippet: `SELECT user_id, ${problemCol}, MAX(login_time) ... GROUP BY user_id`,
            fixedSnippet: 'WITH ranked AS (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_time DESC) AS rn FROM logs\n) SELECT * FROM ranked WHERE rn = 1',
            fixedSql: `WITH ranked_latest AS (\n  SELECT *,\n    ROW_NUMBER() OVER (PARTITION BY ${groupCols[0] || 'entity_id'} ORDER BY created_at DESC) AS ranking_order\n  FROM (${query.replace(/\bGROUP\s+BY[\s\S]*$/i, '').trim()})\n)\nSELECT *\nFROM ranked_latest\nWHERE ranking_order = 1;`,
            fixedLineNumber: lineNum,
            autoFixAvailable: true,
            rawErrorText: rawStr || 'Semantic Logic Flaw: Arbitrary non-aggregate columns paired with extreme timestamp'
          };
        }
      }
    }

    // 10. General / Fallback Error
    return {
      hasError: true,
      type: 'GENERAL_ERROR',
      friendlyTitle: 'SQL Query Check',
      explanation: 'The database encountered an error executing this query. Check your clause order, table and column names, and make sure all text values are wrapped in single quotes.',
      beginnerRule: 'Every SQL query follows: SELECT (columns) FROM (table) WHERE (filters) ORDER BY (sorting) LIMIT (count).',
      problemSnippet: rawStr || 'Syntax error',
      fixedSnippet: 'Review your SQL clauses and commas',
      fixedSql: query,
      fixedLineNumber: 1,
      autoFixAvailable: false,
      rawErrorText: rawStr
    };
  }

  /**
   * Render the clean, dark Koma-style Friendly Doctor Card HTML
   */
  function renderDoctorCardHtml(diag, options) {
    options = options || {};
    const engineName = options.engineName || 'LANDING_PAGE_ENGINE';
    const autoFixMethod = options.autoFixMethod || `window.${engineName}.applyDoctorAutoFix()`;
    const resetMethod = options.resetMethod || `window.${engineName}.resetActiveQuery()`;

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    return `
      <div class="koma-doctor-card">
        <!-- Header -->
        <div class="koma-doctor-header">
          <div class="koma-doctor-badge-row">
            <span class="koma-doctor-badge">SQL Error Doctor</span>
            <span class="koma-doctor-type-tag">Plain-English Diagnosis</span>
          </div>
          <div class="koma-doctor-line-tag">Line ${diag.fixedLineNumber || 1}</div>
        </div>

        <!-- Body -->
        <div class="koma-doctor-body">
          <h3 class="koma-doctor-title">${diag.friendlyTitle}</h3>
          <p class="koma-doctor-explanation">${diag.explanation}</p>

          <!-- Beginner Mental Rule -->
          <div class="koma-doctor-rule-box">
            
            <div class="koma-doctor-rule-text">
              <strong>Beginner Rule:</strong> ${diag.beginnerRule}
            </div>
          </div>

          <!-- Code Diff Comparison -->
          <div class="koma-doctor-diff-box">
            <div class="koma-doctor-diff-row diff-bad">
              <span class="diff-icon">❌ You wrote:</span>
              <code>${escapeHtml(diag.problemSnippet)}</code>
            </div>
            <div class="koma-doctor-diff-row diff-good">
              <span class="diff-icon">✅ Fix:</span>
              <code>${escapeHtml(diag.fixedSnippet)}</code>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="koma-doctor-actions">
            ${diag.autoFixAvailable ? `
              <button class="koma-doctor-btn-autofix" onclick="${autoFixMethod}">
                <span>🪄 Auto-Fix Query</span>
              </button>
            ` : ''}
            <button class="koma-doctor-btn-reset" onclick="${resetMethod}">
              ↺ Reset to Working Query
            </button>
          </div>

          <!-- Collapsible Database Engine Error -->
          <details class="koma-doctor-tech-details">
            <summary>▾ Show technical database engine error</summary>
            <pre><code>${escapeHtml(diag.rawErrorText || 'Engine syntax error')}</code></pre>
          </details>
        </div>
      </div>
    `;
  }

  /**
   * Helper to fetch schema for a scenario
   */
  function getSchema(scenarioId) {
    if (SCHEMAS[scenarioId]) {
      return SCHEMAS[scenarioId];
    }
    return {
      tables: ['amazon_prime_orders'],
      columns: ['order_id', 'customer_id', 'purchase_date', 'product_id']
    };
  }

  // Export to window
  window.SQL_ERROR_DOCTOR = {
    diagnose: diagnose,
    renderDoctorCardHtml: renderDoctorCardHtml,
    getSchema: getSchema,
    SCHEMAS: SCHEMAS
  };

})();
