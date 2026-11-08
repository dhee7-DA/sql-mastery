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
            <span class="koma-doctor-badge">🩺 SQL Error Doctor</span>
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
            <span class="koma-doctor-rule-icon">💡</span>
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


/**
 * SQL FOUNDRY - SIMPLE, BEGINNER-FRIENDLY LANDING PAGE & LIVE RUNNER
 * Easy language, clear explanations, no complex jargon.
 * Client-side in-browser SQL practice.
 */

(function(window) {
  'use strict';

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // --- BEGINNER-FRIENDLY COMPANY SCENARIOS ---
  const KOMA_SCENARIOS = {
    amazon: {
      id: 'amazon',
      tabLabel: 'Amazon Orders',
      company: 'Amazon',
      brandLetter: 'A',
      filename: 'amazon_orders.sql',
      prompt: 'Find new customers who signed up for Prime on Day 1 but placed no orders in their first 30 days.',
      reasoning: 'We check customer orders to see who hasn\'t bought anything again in 30 days so marketing can send a welcome reminder.',
      rawSql: `-- Amazon: Find new Prime members with no orders in 30 days
SELECT DISTINCT o1.customer_id, o1.purchase_date, o1.product_id
FROM amazon_prime_orders o1
LEFT JOIN amazon_prime_orders o2
  ON o1.customer_id = o2.customer_id
  AND o2.purchase_date > o1.purchase_date
  AND o2.purchase_date <= DATE(o1.purchase_date, '+30 days')
WHERE o2.order_id IS NULL;`,
      seedSql: `
        CREATE TABLE amazon_prime_orders (
          order_id TEXT PRIMARY KEY,
          customer_id TEXT,
          purchase_date TEXT,
          product_id TEXT
        );
        INSERT INTO amazon_prime_orders VALUES
          ('ORD_101', 'CUST_88201', '2026-09-01', 'PROD_KINDLE_PAPERWHITE'),
          ('ORD_102', 'CUST_88245', '2026-09-01', 'PROD_ECHO_DOT_5TH_GEN'),
          ('ORD_103', 'CUST_89104', '2026-09-02', 'PROD_FIRE_TV_STICK_4K'),
          ('ORD_104', 'CUST_89311', '2026-09-03', 'PROD_RING_VIDEO_DOORBELL'),
          ('ORD_105', 'CUST_77100', '2026-09-01', 'PROD_AIRPODS_PRO'),
          ('ORD_106', 'CUST_77100', '2026-09-15', 'PROD_MACBOOK_CHARGER'),
          ('ORD_107', 'CUST_77200', '2026-09-02', 'PROD_LOGITECH_MOUSE'),
          ('ORD_108', 'CUST_77200', '2026-09-20', 'PROD_KEYBOARD_MECH');
      `,
      tableHeaders: ['customer_id', 'purchase_date', 'product_id'],
      tableRows: [
        ['CUST_88201', '2026-09-01', 'PROD_KINDLE_PAPERWHITE'],
        ['CUST_88245', '2026-09-01', 'PROD_ECHO_DOT_5TH_GEN'],
        ['CUST_89104', '2026-09-02', 'PROD_FIRE_TV_STICK_4K'],
        ['CUST_89311', '2026-09-03', 'PROD_RING_VIDEO_DOORBELL']
      ],
            steps: [
        {
                "clause": "FROM",
                "title": "1. Read Initial Orders Table",
                "explanation": "SQL begins by loading the amazon_prime_orders table where all customer signups and initial purchases are stored.",
                "mentalRule": "SQL always starts with FROM. It cannot filter or select columns without first opening the table.",
                "rowImpact": "8 total orders loaded into memory",
                "lineNumbers": [
                        2
                ],
                "codeSlice": "FROM amazon_prime_orders o1"
        },
        {
                "clause": "LEFT JOIN",
                "title": "2. Match With Any Follow-Up Orders",
                "explanation": "We connect each order with any other purchases that same member made within their next 30 days. Inactive members will have blank (NULL) follow-up data.",
                "mentalRule": "LEFT JOIN keeps all original members even if they placed zero future orders.",
                "rowImpact": "Evaluated 30-day window for each member",
                "lineNumbers": [
                        3,
                        4,
                        5,
                        6
                ],
                "codeSlice": "LEFT JOIN amazon_prime_orders o2\n  ON o1.customer_id = o2.customer_id\n  AND o2.purchase_date > o1.purchase_date\n  AND o2.purchase_date <= DATE(o1.purchase_date, '+30 days')"
        },
        {
                "clause": "WHERE",
                "title": "3. Filter to Zero Follow-Up Purchases",
                "explanation": "We filter for rows where o2.order_id IS NULL. This instantly isolates the inactive members who bought nothing else.",
                "mentalRule": "WHERE IS NULL is the industry standard pattern to find missing or non-occurring events.",
                "rowImpact": "Filtered down to 4 inactive members",
                "lineNumbers": [
                        7
                ],
                "codeSlice": "WHERE o2.order_id IS NULL;"
        },
        {
                "clause": "SELECT",
                "title": "4. Pick Customer Details & Deduplicate",
                "explanation": "Finally, SQL selects just the customer ID, signup date, and product purchased, removing duplicate rows with DISTINCT.",
                "mentalRule": "SELECT runs after WHERE. The database filters rows first, and picks columns last.",
                "rowImpact": "4 clean rows ready for marketing outreach",
                "lineNumbers": [
                        1
                ],
                "codeSlice": "SELECT DISTINCT o1.customer_id, o1.purchase_date, o1.product_id"
        }
],
      latency: '0.014ms',
      tuples: '4 rows found',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewAmazonStory',
      viewTitle: 'Analytics',
      viewHash: '#analytics'
    },

    netflix: {
      id: 'netflix',
      tabLabel: 'Netflix Video',
      company: 'Netflix',
      brandLetter: 'N',
      filename: 'netflix_speeds.sql',
      prompt: 'Compare video loading speed and buffering percentage across different internet providers.',
      reasoning: 'We calculate the average load time and buffering percentage for each internet provider to spot slow connections.',
      rawSql: `-- Netflix: Compare video speed across internet providers
SELECT isp_asn,
  ROUND(AVG(ttff_ms), 1) AS avg_load_ms,
  ROUND(MAX(ttff_ms), 1) AS max_load_ms,
  ROUND(SUM(rebuffer_seconds) / SUM(play_duration_sec), 4) AS buffer_ratio
FROM playback_telemetry_events
GROUP BY isp_asn
HAVING COUNT(*) >= 2;`,
      seedSql: `
        CREATE TABLE playback_telemetry_events (
          event_id TEXT PRIMARY KEY,
          isp_asn TEXT,
          ttff_ms REAL,
          rebuffer_seconds REAL,
          play_duration_sec REAL
        );
        INSERT INTO playback_telemetry_events VALUES
          ('EVT_1', 'AS7922-COMCAST', 242.4, 1.8, 1000.0),
          ('EVT_2', 'AS7922-COMCAST', 814.0, 0.0, 1200.0),
          ('EVT_3', 'AS7018-ATT', 261.2, 2.2, 1000.0),
          ('EVT_4', 'AS7018-ATT', 940.5, 0.0, 800.0),
          ('EVT_5', 'AS15169-GOOGLE', 198.8, 0.9, 1000.0),
          ('EVT_6', 'AS15169-GOOGLE', 620.0, 0.0, 1500.0),
          ('EVT_7', 'AS3356-LUMEN', 285.0, 3.1, 1000.0),
          ('EVT_8', 'AS3356-LUMEN', 1040.2, 0.0, 900.0);
      `,
      tableHeaders: ['isp_asn', 'avg_load_ms', 'max_load_ms', 'buffer_ratio'],
      tableRows: [
        ['AS7922-COMCAST', '528.2', '814.0', '0.0008'],
        ['AS7018-ATT', '300.9', '940.5', '0.0012'],
        ['AS15169-GOOGLE', '409.4', '620.0', '0.0004'],
        ['AS3356-LUMEN', '662.6', '1040.2', '0.0016']
      ],
            steps: [
        {
                "clause": "FROM",
                "title": "1. Load Video Playback Telemetry",
                "explanation": "SQL loads the raw streaming session logs recording buffer duration and startup time for every viewer.",
                "mentalRule": "FROM loads the raw event log before any averages or summaries are calculated.",
                "rowImpact": "8 streaming test sessions loaded",
                "lineNumbers": [
                        6
                ],
                "codeSlice": "FROM playback_telemetry_events"
        },
        {
                "clause": "GROUP BY",
                "title": "2. Group by Internet Provider",
                "explanation": "SQL organizes all 8 test sessions into buckets by their internet provider (Comcast, AT&T, Google Fiber, Lumen).",
                "mentalRule": "GROUP BY collapses individual viewer sessions into summary buckets by provider.",
                "rowImpact": "Grouped into 4 provider buckets",
                "lineNumbers": [
                        7
                ],
                "codeSlice": "GROUP BY isp_asn"
        },
        {
                "clause": "HAVING",
                "title": "3. Filter Out Low Sample Sizes",
                "explanation": "HAVING checks each provider bucket and keeps only those with at least 2 test sessions to prevent misleading results.",
                "mentalRule": "WHERE filters rows BEFORE grouping. HAVING filters buckets AFTER grouping.",
                "rowImpact": "All 4 providers meet sample criteria (>= 2 sessions)",
                "lineNumbers": [
                        8
                ],
                "codeSlice": "HAVING COUNT(*) >= 2;"
        },
        {
                "clause": "SELECT",
                "title": "4. Calculate Speed & Buffering Ratios",
                "explanation": "Finally, SQL calculates average load time (AVG), max delay (MAX), and total buffering percentage for each provider.",
                "mentalRule": "Aggregate calculations (AVG, SUM, MAX) run inside the SELECT step on grouped data.",
                "rowImpact": "4 clean performance summaries computed",
                "lineNumbers": [
                        1,
                        2,
                        3,
                        4
                ],
                "codeSlice": "SELECT isp_asn,\n  ROUND(AVG(ttff_ms), 1) AS avg_load_ms,\n  ROUND(MAX(ttff_ms), 1) AS max_load_ms,\n  ROUND(SUM(rebuffer_seconds) / SUM(play_duration_sec), 4) AS buffer_ratio"
        }
],
      latency: '0.016ms',
      tuples: '4 providers compared',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewNetflixStory',
      viewTitle: 'Netflix',
      viewHash: '#netflix'
    },

    uber: {
      id: 'uber',
      tabLabel: 'Uber Rides',
      company: 'Uber',
      brandLetter: 'U',
      filename: 'uber_rides.sql',
      prompt: 'Compare passenger ride requests to available drivers to calculate busy-area surge pricing.',
      reasoning: 'When there are many ride requests but few drivers in an area, the surge multiplier goes up.',
      rawSql: `-- Uber: Calculate busy-area surge multiplier based on demand
WITH area_demand AS (
  SELECT h3_index AS area_id, COUNT(*) AS ride_requests
  FROM uber_ride_requests
  WHERE requested_at >= '2026-11-07 16:00:00'
  GROUP BY area_id
)
SELECT d.area_id, d.ride_requests, COALESCE(s.drivers, 0) AS drivers,
  ROUND(CAST(d.ride_requests AS FLOAT) / MAX(COALESCE(s.drivers, 1), 1), 2) AS surge_price
FROM area_demand d
LEFT JOIN uber_driver_telemetry s ON d.area_id = s.h3_index
ORDER BY surge_price DESC;`,
      seedSql: `
        CREATE TABLE uber_ride_requests (
          request_id TEXT PRIMARY KEY,
          h3_index TEXT,
          requested_at TEXT
        );
        CREATE TABLE uber_driver_telemetry (
          h3_index TEXT PRIMARY KEY,
          drivers INT
        );
        INSERT INTO uber_ride_requests VALUES
          ('REQ_1', 'Downtown_Area', '2026-11-07 16:00:00'),
          ('REQ_2', 'Downtown_Area', '2026-11-07 16:02:00'),
          ('REQ_3', 'Downtown_Area', '2026-11-07 16:03:00'),
          ('REQ_4', 'Airport_Terminal', '2026-11-07 16:01:00'),
          ('REQ_5', 'Airport_Terminal', '2026-11-07 16:04:00'),
          ('REQ_6', 'Midtown_Mall', '2026-11-07 16:02:30'),
          ('REQ_7', 'Suburbs_North', '2026-11-07 16:01:15');
        INSERT INTO uber_driver_telemetry VALUES
          ('Downtown_Area', 18),
          ('Airport_Terminal', 21),
          ('Midtown_Mall', 32),
          ('Suburbs_North', 40);
      `,
      tableHeaders: ['area_id', 'ride_requests', 'drivers', 'surge_price'],
      tableRows: [
        ['Downtown_Area', '3', '18', '0.17x'],
        ['Airport_Terminal', '2', '21', '0.10x'],
        ['Midtown_Mall', '1', '32', '0.03x'],
        ['Suburbs_North', '1', '40', '0.03x']
      ],
            steps: [
        {
                "clause": "WITH (CTE)",
                "title": "1. Count Rider Requests Per Area",
                "explanation": "SQL calculates rider demand in a temporary named table (area_demand) by counting ride requests placed after 4:00 PM.",
                "mentalRule": "Common Table Expressions (WITH) act like temporary scratchpads to break big problems into small steps.",
                "rowImpact": "Summarized into ride request counts per zone",
                "lineNumbers": [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6
                ],
                "codeSlice": "WITH area_demand AS (\n  SELECT h3_index AS area_id, COUNT(*) AS ride_requests\n  FROM uber_ride_requests\n  WHERE requested_at >= '2026-11-07 16:00:00'\n  GROUP BY area_id\n)"
        },
        {
                "clause": "FROM & JOIN",
                "title": "2. Match Area Demand With Active Drivers",
                "explanation": "We connect each zone's ride requests with the real-time driver count in that zone.",
                "mentalRule": "Matching demand with supply lets algorithms spot driver shortages instantly.",
                "rowImpact": "4 active geographic zones matched",
                "lineNumbers": [
                        9,
                        10
                ],
                "codeSlice": "FROM area_demand d\nLEFT JOIN uber_driver_telemetry s ON d.area_id = s.h3_index"
        },
        {
                "clause": "SELECT",
                "title": "3. Calculate Dynamic Surge Multiplier",
                "explanation": "SQL divides ride requests by available drivers to compute the surge multiplier. If drivers are zero, COALESCE handles it safely.",
                "mentalRule": "Math formulas in SELECT transform raw counts into business KPIs like pricing multipliers.",
                "rowImpact": "Calculated surge multipliers for all zones",
                "lineNumbers": [
                        7,
                        8
                ],
                "codeSlice": "SELECT d.area_id, d.ride_requests, COALESCE(s.drivers, 0) AS drivers,\n  ROUND(CAST(d.ride_requests AS FLOAT) / MAX(COALESCE(s.drivers, 1), 1), 2) AS surge_price"
        },
        {
                "clause": "ORDER BY",
                "title": "4. Sort Highest Shortage to the Top",
                "explanation": "SQL sorts the final list in descending order (DESC) so dispatchers immediately see which neighborhood needs drivers most.",
                "mentalRule": "ORDER BY is almost always the final step executed by the database.",
                "rowImpact": "Ranked from highest surge to lowest",
                "lineNumbers": [
                        11
                ],
                "codeSlice": "ORDER BY surge_price DESC;"
        }
],
      latency: '0.015ms',
      tuples: '4 areas computed',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewUberStory',
      viewTitle: 'Uber',
      viewHash: '#uber'
    },

    airbnb: {
      id: 'airbnb',
      tabLabel: 'Airbnb Stays',
      company: 'Airbnb',
      brandLetter: 'A',
      filename: 'airbnb_calendar.sql',
      prompt: 'Find empty calendar days between guest bookings so hosts can offer a discount.',
      reasoning: 'We look at booking check-out dates and the next check-in dates to find 1 to 3 empty days.',
      rawSql: `-- Airbnb: Find unbooked calendar gaps between guest stays
SELECT listing_id, check_out_date AS stay_ended,
  LEAD(check_in_date) OVER (
    PARTITION BY listing_id ORDER BY check_in_date
  ) AS next_guest_arrives,
  ROUND(JULIANDAY(LEAD(check_in_date) OVER (PARTITION BY listing_id ORDER BY check_in_date))
    - JULIANDAY(check_out_date), 1) AS empty_gap_days
FROM airbnb_reservations
WHERE status = 'CONFIRMED';`,
      seedSql: `
        CREATE TABLE airbnb_reservations (
          reservation_id TEXT PRIMARY KEY,
          listing_id TEXT,
          check_in_date TEXT,
          check_out_date TEXT,
          status TEXT
        );
        INSERT INTO airbnb_reservations VALUES
          ('RES_1', 'Apartment_101', '2026-10-10', '2026-10-14', 'CONFIRMED'),
          ('RES_2', 'Apartment_101', '2026-10-16', '2026-10-22', 'CONFIRMED'),
          ('RES_3', 'Apartment_101', '2026-10-24', '2026-10-30', 'CONFIRMED'),
          ('RES_4', 'Beach_House_202', '2026-10-01', '2026-10-05', 'CONFIRMED'),
          ('RES_5', 'Beach_House_202', '2026-10-07', '2026-10-12', 'CONFIRMED'),
          ('RES_6', 'Mountain_Cabin_303', '2026-10-28', '2026-11-01', 'CONFIRMED'),
          ('RES_7', 'Mountain_Cabin_303', '2026-11-04', '2026-11-10', 'CONFIRMED');
      `,
      tableHeaders: ['listing_id', 'stay_ended', 'next_guest_arrives', 'empty_gap_days'],
      tableRows: [
        ['Apartment_101', '2026-10-14', '2026-10-16', '2.0 days'],
        ['Apartment_101', '2026-10-22', '2026-10-24', '2.0 days'],
        ['Apartment_101', '2026-10-30', null, null],
        ['Beach_House_202', '2026-10-05', '2026-10-07', '2.0 days'],
        ['Beach_House_202', '2026-10-12', null, null]
      ],
            steps: [
        {
                "clause": "FROM",
                "title": "1. Load Confirmed Bookings",
                "explanation": "SQL loads the calendar reservations table containing guest check-in and check-out dates.",
                "mentalRule": "FROM loads the raw stay dates for all listings in the system.",
                "rowImpact": "6 total guest reservations loaded",
                "lineNumbers": [
                        7
                ],
                "codeSlice": "FROM airbnb_reservations"
        },
        {
                "clause": "WHERE",
                "title": "2. Keep Only Confirmed Stays",
                "explanation": "SQL removes cancelled, disputed, or pending requests so unbooked gaps are calculated only between real stays.",
                "mentalRule": "Filtering early with WHERE prevents inaccurate dates from polluting later calculations.",
                "rowImpact": "Filtered to confirmed bookings only",
                "lineNumbers": [
                        8
                ],
                "codeSlice": "WHERE status = 'CONFIRMED';"
        },
        {
                "clause": "LEAD() OVER",
                "title": "3. Look Ahead to Next Guest Check-in",
                "explanation": "The LEAD() window function looks at the chronological next check-in date for the same listing without grouping rows.",
                "mentalRule": "Window functions like LEAD() allow looking ahead to the next row while keeping individual rows intact.",
                "rowImpact": "Calculated next arrival date for each stay",
                "lineNumbers": [
                        2,
                        3,
                        4
                ],
                "codeSlice": "LEAD(check_in_date) OVER (\n  PARTITION BY listing_id ORDER BY check_in_date\n) AS next_guest_arrives"
        },
        {
                "clause": "SELECT",
                "title": "4. Calculate Empty Gap Days",
                "explanation": "SQL calculates the difference between when guest 1 leaves and guest 2 arrives to highlight unbooked vacancies.",
                "mentalRule": "Date math inside SELECT calculates how many days a property sits empty and earns zero income.",
                "rowImpact": "3 unbooked calendar gaps identified",
                "lineNumbers": [
                        1,
                        5,
                        6
                ],
                "codeSlice": "SELECT listing_id, check_out_date AS stay_ended,\n  ROUND(JULIANDAY(LEAD(...)) - JULIANDAY(check_out_date), 1) AS empty_gap_days"
        }
],
      latency: '0.013ms',
      tuples: '7 bookings checked',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewAirbnbStory',
      viewTitle: 'Airbnb',
      viewHash: '#airbnb'
    },

    spotify: {
      id: 'spotify',
      tabLabel: 'Spotify Music',
      company: 'Spotify',
      brandLetter: 'S',
      filename: 'spotify_earnings.sql',
      prompt: 'Count song plays of 30 seconds or longer to calculate how much money artists earned.',
      reasoning: 'Plays under 30 seconds are skipped and not paid. We calculate total valid plays multiplied by the payment rate.',
      rawSql: `-- Spotify: Calculate artist earnings for plays over 30 seconds
WITH valid_plays AS (
  SELECT artist_id, COUNT(*) AS stream_count
  FROM stream_events
  WHERE duration_seconds >= 30
  GROUP BY artist_id
)
SELECT artist_id, stream_count AS total_plays,
  ROUND(stream_count * 0.0038, 4) AS earnings_usd
FROM valid_plays
ORDER BY total_plays DESC;`,
      seedSql: `
        CREATE TABLE stream_events (
          event_id TEXT PRIMARY KEY,
          track_id TEXT,
          artist_id TEXT,
          territory TEXT,
          duration_seconds INT
        );
        INSERT INTO stream_events VALUES
          ('S_1', 'Song_1', 'Billie Eilish', 'US', 210),
          ('S_2', 'Song_2', 'Billie Eilish', 'GB', 210),
          ('S_3', 'Song_3', 'The Weeknd', 'US', 200),
          ('S_4', 'Song_4', 'Taylor Swift', 'US', 178),
          ('S_5', 'Song_5', 'Kendrick Lamar', 'US', 274),
          ('S_6', 'Song_6', 'Skipped User', 'US', 12);
      `,
      tableHeaders: ['artist_id', 'total_plays', 'earnings_usd'],
      tableRows: [
        ['Billie Eilish', '2', '$0.0076'],
        ['Kendrick Lamar', '1', '$0.0038'],
        ['Taylor Swift', '1', '$0.0038'],
        ['The Weeknd', '1', '$0.0038']
      ],
            steps: [
        {
                "clause": "FROM & WHERE",
                "title": "1. Filter for Qualified 30s Streams",
                "explanation": "SQL scans song stream events and keeps only plays that lasted 30 seconds or longer (the legal threshold for royalty payout).",
                "mentalRule": "Under industry contracts, song plays under 30 seconds earn zero royalties.",
                "rowImpact": "8 stream events filtered down to 6 valid plays",
                "lineNumbers": [
                        3,
                        4
                ],
                "codeSlice": "FROM stream_events\nWHERE duration_seconds >= 30"
        },
        {
                "clause": "GROUP BY",
                "title": "2. Group Streams by Artist (CTE)",
                "explanation": "SQL groups the valid plays by artist into a temporary table called valid_plays and counts the streams.",
                "mentalRule": "GROUP BY condenses multiple plays into a single stream count per artist.",
                "rowImpact": "Grouped into 3 artist buckets",
                "lineNumbers": [
                        2,
                        5
                ],
                "codeSlice": "SELECT artist_id, COUNT(*) AS stream_count ...\nGROUP BY artist_id"
        },
        {
                "clause": "SELECT",
                "title": "3. Multiply by Payout Rate",
                "explanation": "SQL multiplies total play count by the $0.0038 per-stream royalty rate to compute each artist's earnings in USD.",
                "mentalRule": "Simple arithmetic in SELECT turns technical play counts into financial paychecks.",
                "rowImpact": "Calculated earnings for all qualifying artists",
                "lineNumbers": [
                        7,
                        8
                ],
                "codeSlice": "SELECT artist_id, stream_count AS total_plays,\n  ROUND(stream_count * 0.0038, 4) AS earnings_usd"
        },
        {
                "clause": "ORDER BY",
                "title": "4. Rank Highest Earners First",
                "explanation": "SQL sorts descending (DESC) by total plays so top-streamed artists appear at the top of the payout report.",
                "mentalRule": "ORDER BY DESC is standard for financial leaderboards and royalty reports.",
                "rowImpact": "Ranked artists by highest earnings",
                "lineNumbers": [
                        10
                ],
                "codeSlice": "ORDER BY total_plays DESC;"
        }
],
      latency: '0.017ms',
      tuples: '4 artists calculated',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewSpotifyStory',
      viewTitle: 'Spotify',
      viewHash: '#spotify'
    },

    jpmorgan: {
      id: 'jpmorgan',
      tabLabel: 'JPMorgan Banking',
      company: 'JPMorgan Chase',
      brandLetter: 'J',
      filename: 'jpmorgan_balance.sql',
      prompt: 'Check bank accounts to make sure money coming in (Debits) matches money going out (Credits).',
      reasoning: 'Every bank account must balance to zero. We add up debits and credits to ensure the difference is $0.00.',
      rawSql: `-- JPMorgan: Check that debits and credits balance to zero
SELECT bank_branch, account_name,
  ROUND(SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE 0 END), 2) AS total_in,
  ROUND(SUM(CASE WHEN entry_type = 'CREDIT' THEN amount_usd ELSE 0 END), 2) AS total_out,
  ROUND(SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE -amount_usd END), 2) AS difference
FROM general_ledger_entries
GROUP BY 1, 2;`,
      seedSql: `
        CREATE TABLE general_ledger_entries (
          entry_id TEXT PRIMARY KEY,
          bank_branch TEXT,
          account_name TEXT,
          entry_type TEXT,
          amount_usd REAL
        );
        INSERT INTO general_ledger_entries VALUES
          ('E_1', 'New York Branch', 'Checking Accounts', 'DEBIT', 2140000.00),
          ('E_2', 'New York Branch', 'Checking Accounts', 'CREDIT', 2140000.00),
          ('E_3', 'London Branch', 'Savings Accounts', 'DEBIT', 1420200.00),
          ('E_4', 'London Branch', 'Savings Accounts', 'CREDIT', 1420200.00),
          ('E_5', 'Tokyo Branch', 'Interbank Reserve', 'DEBIT', 1290000.00),
          ('E_6', 'Tokyo Branch', 'Interbank Reserve', 'CREDIT', 1290000.00);
      `,
      tableHeaders: ['bank_branch', 'account_name', 'total_in', 'total_out', 'difference'],
      tableRows: [
        ['London Branch', 'Savings Accounts', '$1,420,200', '$1,420,200', '$0.00 (Balanced)'],
        ['New York Branch', 'Checking Accounts', '$2,140,000', '$2,140,000', '$0.00 (Balanced)'],
        ['Tokyo Branch', 'Interbank Reserve', '$1,290,000', '$1,290,000', '$0.00 (Balanced)']
      ],
            steps: [
        {
                "clause": "FROM",
                "title": "1. Load General Ledger Journal Lines",
                "explanation": "SQL loads the banking journal entries containing debit and credit transaction amounts.",
                "mentalRule": "In banking, every financial movement has an offsetting debit and credit entry.",
                "rowImpact": "8 ledger journal entries loaded",
                "lineNumbers": [
                        5
                ],
                "codeSlice": "FROM general_ledger_entries"
        },
        {
                "clause": "GROUP BY",
                "title": "2. Group by Branch & Account",
                "explanation": "SQL collapses ledger entries into buckets based on the branch and specific account name.",
                "mentalRule": "GROUP BY 1, 2 refers to the first two columns (bank_branch and account_name).",
                "rowImpact": "Collapsing 8 entries into 3 branch accounts",
                "lineNumbers": [
                        6
                ],
                "codeSlice": "GROUP BY 1, 2;"
        },
        {
                "clause": "SELECT & CASE",
                "title": "3. Total Inflows (Debits) vs Outflows (Credits)",
                "explanation": "SQL uses CASE WHEN inside SUM to add up money in (Debits) and money out (Credits) into separate summary columns.",
                "mentalRule": "SUM(CASE WHEN ...) is the most famous pattern in financial analytics for conditional totals.",
                "rowImpact": "Computed total in and total out per account",
                "lineNumbers": [
                        2,
                        3
                ],
                "codeSlice": "ROUND(SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE 0 END), 2) AS total_in,\nROUND(SUM(CASE WHEN entry_type = 'CREDIT' THEN amount_usd ELSE 0 END), 2) AS total_out"
        },
        {
                "clause": "DIFFERENCE",
                "title": "4. Reconcile Balance to Zero",
                "explanation": "Finally, SQL subtracts total out from total in. A balanced ledger has a difference of exactly $0.00.",
                "mentalRule": "Auditors look for any account where difference is NOT 0.00 to catch missing wire transfers.",
                "rowImpact": "3 accounts reconciled to zero balance",
                "lineNumbers": [
                        4
                ],
                "codeSlice": "ROUND(SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE -amount_usd END), 2) AS difference"
        }
],
      latency: '0.011ms',
      tuples: '3 accounts checked',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewJPMorganStory',
      viewTitle: 'Finance',
      viewHash: '#jpmorgan'
    },

    stripe: {
      id: 'stripe',
      tabLabel: 'Stripe Payments',
      company: 'Stripe',
      brandLetter: 'S',
      filename: 'stripe_fraud.sql',
      prompt: 'Spot potential card fraud by finding multiple test charges under $1 on the same card.',
      reasoning: 'Fraudsters often test stolen cards with tiny amounts. We flag any card with 5 or more rapid attempts.',
      rawSql: `-- Stripe: Flag suspicious tiny test payments under $1.00
SELECT card_number_masked, ip_location,
  COUNT(*) AS charge_attempts,
  MIN(charge_time) AS first_charge,
  MAX(charge_time) AS last_charge
FROM card_authorization_events
WHERE amount_usd < 1.00
GROUP BY 1, 2
HAVING COUNT(*) >= 5;`,
      seedSql: `
        CREATE TABLE card_authorization_events (
          auth_id TEXT PRIMARY KEY,
          card_number_masked TEXT,
          ip_location TEXT,
          amount_usd REAL,
          charge_time TEXT
        );
        INSERT INTO card_authorization_events VALUES
          ('A_1', '•••• 4242', '198.51.100.42', 0.50, '14:22:01'),
          ('A_2', '•••• 4242', '198.51.100.42', 0.50, '14:22:12'),
          ('A_3', '•••• 4242', '198.51.100.42', 0.50, '14:22:25'),
          ('A_4', '•••• 4242', '198.51.100.42', 0.50, '14:22:35'),
          ('A_5', '•••• 4242', '198.51.100.42', 0.50, '14:22:48'),
          ('A_6', '•••• 9191', '198.51.100.42', 0.75, '14:23:12'),
          ('A_7', '•••• 9191', '198.51.100.42', 0.75, '14:23:20'),
          ('A_8', '•••• 9191', '198.51.100.42', 0.75, '14:23:30'),
          ('A_9', '•••• 9191', '198.51.100.42', 0.75, '14:23:42'),
          ('A_10', '•••• 9191', '198.51.100.42', 0.75, '14:23:55');
      `,
      tableHeaders: ['card_number_masked', 'ip_location', 'charge_attempts', 'first_charge', 'last_charge'],
      tableRows: [
        ['•••• 4242', '198.51.100.42', '5', '14:22:01', '14:22:48'],
        ['•••• 9191', '198.51.100.42', '5', '14:23:12', '14:23:55']
      ],
            steps: [
        {
                "clause": "FROM",
                "title": "1. Load Card Authorization Events",
                "explanation": "SQL reads credit card charge attempts streamed in real time from the payment gateway.",
                "mentalRule": "FROM loads incoming payment records before fraud filters evaluate them.",
                "rowImpact": "8 card payment attempts loaded",
                "lineNumbers": [
                        5
                ],
                "codeSlice": "FROM card_authorization_events"
        },
        {
                "clause": "WHERE",
                "title": "2. Filter for Micro Test Charges (< $1.00)",
                "explanation": "Card-testing fraudsters test stolen card numbers by making tiny transactions (e.g. $0.50). SQL filters for amounts under $1.00.",
                "mentalRule": "WHERE runs before grouping. It throws away normal large purchases so we focus on micro charges.",
                "rowImpact": "Filtered down to 6 micro payment attempts",
                "lineNumbers": [
                        6
                ],
                "codeSlice": "WHERE amount_usd < 1.00"
        },
        {
                "clause": "GROUP BY",
                "title": "3. Group by Card Number & IP Address",
                "explanation": "SQL groups the micro charge attempts by card number and originating IP location.",
                "mentalRule": "Fraud patterns stand out when grouped by the card and IP executing the attempts.",
                "rowImpact": "Grouped into 2 card testing candidates",
                "lineNumbers": [
                        7
                ],
                "codeSlice": "GROUP BY 1, 2"
        },
        {
                "clause": "HAVING",
                "title": "4. Flag Rapid-Fire Velocity (>= 5 Attempts)",
                "explanation": "HAVING checks the count of attempts in each group. Any card tried 5 or more times in minutes is flagged for immediate card block.",
                "mentalRule": "HAVING COUNT(*) >= 5 catches automated bots trying card variations.",
                "rowImpact": "1 suspicious bot attack isolated with 5 attempts",
                "lineNumbers": [
                        8
                ],
                "codeSlice": "HAVING COUNT(*) >= 5;"
        },
        {
                "clause": "SELECT",
                "title": "5. Output Security Alert Details",
                "explanation": "SQL outputs the card number, IP location, attempt count, and timestamps of first and last charges for security investigation.",
                "mentalRule": "SELECT formats the final fraud alert card for the risk operations team.",
                "rowImpact": "1 high-risk security alert dispatched",
                "lineNumbers": [
                        1,
                        2,
                        3,
                        4
                ],
                "codeSlice": "SELECT card_number_masked, ip_location,\n  COUNT(*) AS charge_attempts,\n  MIN(charge_time) AS first_charge,\n  MAX(charge_time) AS last_charge"
        }
],
      latency: '0.012ms',
      tuples: '2 cards flagged',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewStripeStory',
      viewTitle: 'Stripe',
      viewHash: '#stripe'
    }
  };

  // --- 5 COMMON BEGINNER MISTAKES ---
  const TRAPS = {
    null_trap: {
      id: 'null_trap',
      title: '1. Forgetting Missing Values (NULL)',
      codeWrong: `-- ✕ MISTAKE: If churned_users has any empty (NULL) value, this returns 0 rows!
SELECT user_id, email, signup_date
FROM users
WHERE user_id NOT IN (
  SELECT user_id FROM churned_users
);`,
      codeFix: `-- ✓ CLEAN FIX: Safe check using NOT EXISTS
SELECT u.user_id, u.email, u.signup_date
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM churned_users c
  WHERE c.user_id = u.user_id
);`,
      impact: 'In SQL, checking if something is NOT IN a list that has missing (NULL) values cancels out the whole query. Always use NOT EXISTS or WHERE IS NOT NULL.'
    },

    float_drift: {
      id: 'float_drift',
      title: '2. Money Rounding Errors with Decimals',
      codeWrong: `-- ✕ MISTAKE: Standard numbers (FLOAT) can lose pennies due to computer rounding!
SELECT account_id, 
  SUM(CAST(amount AS FLOAT)) AS total_balance
FROM ledger_entries
GROUP BY account_id
HAVING SUM(CAST(amount AS FLOAT)) != 0.00;`,
      codeFix: `-- ✓ CLEAN FIX: Use exact cents or fixed decimals
SELECT account_id, 
  ROUND(SUM(CAST(amount_cents AS BIGINT)), 2) AS net_cents,
  ROUND(SUM(CAST(amount AS DECIMAL(18,4))), 4) AS exact_balance
FROM ledger_entries
GROUP BY account_id
HAVING SUM(amount_cents) != 0;`,
      impact: 'Computer floating-point numbers can turn $10.00 into $9.999999. In finance and ecommerce, always store money as exact cents or fixed decimals.'
    },

    window_frame: {
      id: 'window_frame',
      title: '3. Running Totals on the Same Date',
      codeWrong: `-- ✕ MISTAKE: If two orders happen on the same day, this lumps them together!
SELECT order_date, order_amount,
  SUM(order_amount) OVER (ORDER BY order_date) AS running_total
FROM daily_sales;`,
      codeFix: `-- ✓ CLEAN FIX: Specify row-by-row order so each order is separate
SELECT order_date, order_amount,
  SUM(order_amount) OVER (
    ORDER BY order_date, order_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS true_running_total
FROM daily_sales;`,
      impact: 'By default, SQL window sums can bundle rows that share the exact same date. Adding row-by-row ordering keeps your running balance accurate.'
    },

    non_sargable: {
      id: 'non_sargable',
      title: '4. Slow Date Filtering in Large Tables',
      codeWrong: `-- ✕ MISTAKE: Putting a function on a date makes the database check every row!
SELECT customer_id, order_id, order_total
FROM orders
WHERE strftime('%Y', order_date) = '2026';`,
      codeFix: `-- ✓ CLEAN FIX: Use a simple date range (>= and <) which runs 100x faster
SELECT customer_id, order_id, order_total
FROM orders
WHERE order_date >= '2026-01-01' 
  AND order_date < '2027-01-01';`,
      impact: 'Wrapping table columns inside functions stops the database from using its fast indexes. Clean comparisons using >= and < make queries fly.'
    },

    cartesian_fanout: {
      id: 'cartesian_fanout',
      title: '5. Accidental Duplicate Rows When Joining',
      codeWrong: `-- ✕ MISTAKE: Joining items and payments directly multiplies rows and inflates sums!
SELECT o.order_id,
  SUM(i.item_price) AS total_items_price,
  SUM(p.payment_amount) AS total_paid
FROM orders o
JOIN order_items i ON o.order_id = i.order_id
JOIN payments p ON o.order_id = p.order_id
GROUP BY o.order_id;`,
      codeFix: `-- ✓ CLEAN FIX: Calculate subtotals first before joining them
WITH item_sums AS (
  SELECT order_id, SUM(item_price) AS total_items_price
  FROM order_items GROUP BY order_id
),
payment_sums AS (
  SELECT order_id, SUM(payment_amount) AS total_paid
  FROM payments GROUP BY order_id
)
SELECT o.order_id, i.total_items_price, p.total_paid
FROM orders o
LEFT JOIN item_sums i ON o.order_id = i.order_id
LEFT JOIN payment_sums p ON o.order_id = p.order_id;`,
      impact: 'Joining two lists of items for the same order multiplies rows together (e.g. 3 items x 2 payments = 6 rows), giving inflated totals. Calculate subtotals first.'
    }
  };

  let activeScenarioId = 'amazon';
  let activeTrapId = 'null_trap';
  let userSqlMap = {};

  // Friendly SQL Error Doctor State
  let lastDoctorDiagnosis = null;
  let activeErrorLine = null;
  let activeSuccessLine = null;
  // Interactive Step-by-Step State
  let currentSinkMode = 'results'; // 'results' | 'stepper'
  let activeStepMap = {
    amazon: 0,
    netflix: 0,
    uber: 0,
    airbnb: 0,
    spotify: 0,
    jpmorgan: 0,
    stripe: 0
  };


  let sqlModuleInstance = null;
  let activeDb = null;
  let activeDbScenarioId = null;

  async function getWasmDb(scenarioId) {
    if (!sqlModuleInstance && typeof window.initSqlJs === 'function') {
      try {
        sqlModuleInstance = await window.initSqlJs({
          locateFile: file => {
            if (file.endsWith('.wasm')) {
              return window.location.pathname.includes('/visualizer') ? 'sql-wasm.wasm' : '/visualizer/sql-wasm.wasm';
            }
            return file;
          }
        });
      } catch (e) {
        console.warn('WASM notice:', e);
      }
    }

    if (sqlModuleInstance) {
      if (!activeDb || activeDbScenarioId !== scenarioId) {
        if (activeDb) {
          try { activeDb.close(); } catch(e) {}
        }
        activeDb = new sqlModuleInstance.Database();
        const sc = KOMA_SCENARIOS[scenarioId];
        if (sc && sc.seedSql) {
          activeDb.run(sc.seedSql);
        }
        activeDbScenarioId = scenarioId;
      }
      return activeDb;
    }
    return null;
  }

  const LandingPageEngine = {
    init: function() {
      const container = document.getElementById('viewLandingPage');
      if (!container) return;
      container.innerHTML = this.renderHTML();
      this.bindEvents(container);

      setTimeout(() => {
        this.runActiveQuery();
      }, 50);
    },

    setScenario: function(id) {
      if (KOMA_SCENARIOS[id]) {
        const textarea = document.getElementById('komaSqlEditor');
        if (textarea) {
          userSqlMap[activeScenarioId] = textarea.value;
        }

        activeScenarioId = id;
        this.updateView();

        setTimeout(() => {
          this.runActiveQuery();
        }, 30);
      }
    },

    setTrap: function(id) {
      if (TRAPS[id]) {
        activeTrapId = id;
        this.updateView();
      }
    },

    render: function() { this.updateView(); },
    updateView: function() {
      const container = document.getElementById('viewLandingPage');
      if (container) {
        container.innerHTML = this.renderHTML();
        this.bindEvents(container);
      }
    },

    openSectionStudio: function() {
      if (window.selectNavView) {
        window.selectNavView('viewStudio', 'Section Studio', null);
      }
      try { window.location.hash = '#section-studio'; } catch(e) {}
    },

    openLeetCode: function() {
      if (window.selectNavView) {
        window.selectNavView('viewLeetCode50', 'LeetCode 323', null);
      }
      try { window.location.hash = '#leetcode'; } catch(e) {}
    },

    launchTrack: function(viewId, title, hash) {
      if (window.selectNavView) {
        window.selectNavView(viewId, title, null);
      }
      try { window.location.hash = hash; } catch(e) {}
    },

    runActiveQuery: async function() {
      const textarea = document.getElementById('komaSqlEditor');
      if (!textarea) return;
      const query = textarea.value.trim();

      const badge = document.getElementById('komaSinkBadge');
      const tableWrapper = document.getElementById('komaTableWrapper');
      const latencyElem = document.getElementById('komaSinkLatency');
      const tuplesElem = document.getElementById('komaSinkTuples');

      if (!query) {
        if (badge) {
          badge.className = 'koma-badge-yellow';
          badge.innerText = 'EMPTY QUERY ⚠';
        }
        if (tableWrapper) {
          tableWrapper.innerHTML = '<div class="koma-sink-empty">Type any SQL query above and click ▶ Run Query.</div>';
        }
        return;
      }

      if (badge) {
        badge.className = 'koma-badge-yellow';
        badge.innerText = 'RUNNING...';
      }

      const db = await getWasmDb(activeScenarioId);

      if (db) {
        try {
          const t0 = performance.now();
          const results = db.exec(query);
          const t1 = performance.now();
          const latencyMs = Math.max(0.008, (t1 - t0)).toFixed(3) + 'ms';

          activeErrorLine = null;
          lastDoctorDiagnosis = null;
          this.updateEditorGutter();

          if (badge) {
            badge.className = 'koma-badge-green';
            badge.innerText = 'QUERY SUCCESS ✓';
          }

          if (latencyElem) {
            latencyElem.innerHTML = `speed: <strong>${latencyMs}</strong>`;
          }

          if (results && results.length > 0 && results[0].columns) {
            const cols = results[0].columns;
            const rows = results[0].values || [];

            if (tuplesElem) {
              tuplesElem.innerText = `${rows.length} rows found`;
            }

            if (tableWrapper) {
              tableWrapper.innerHTML = `
                <table class="koma-table">
                  <thead>
                    <tr>
                      ${cols.map(c => `<th>${escapeHtml(c)}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${rows.map(row => `
                      <tr>
                        ${row.map(cell => `<td>${escapeHtml(cell !== null ? cell : 'NULL')}</td>`).join('')}
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `;
            }
          } else {
            if (tuplesElem) {
              tuplesElem.innerText = '0 rows found';
            }
            if (tableWrapper) {
              tableWrapper.innerHTML = `
                <div class="koma-sink-empty">
                  0 rows found (Empty result). Query finished in ${latencyMs}.
                </div>
              `;
            }
          }

        } catch (err) {
          const rawMsg = err.message || String(err);
          const schema = window.SQL_ERROR_DOCTOR ? window.SQL_ERROR_DOCTOR.getSchema(activeScenarioId) : null;
          const diag = window.SQL_ERROR_DOCTOR ? window.SQL_ERROR_DOCTOR.diagnose(query, rawMsg, schema) : null;
          lastDoctorDiagnosis = diag;

          if (badge) {
            badge.className = 'koma-badge-red';
            badge.innerText = (diag && diag.autoFixAvailable) ? 'DIAGNOSED 🩺' : 'SYNTAX ERROR ✕';
          }
          if (latencyElem) {
            latencyElem.innerHTML = `status: <strong style="color:#ef4444;">error</strong>`;
          }
          if (tuplesElem) {
            tuplesElem.innerText = '0 rows';
          }

          if (diag && diag.fixedLineNumber) {
            activeErrorLine = diag.fixedLineNumber;
            this.updateEditorGutter();
          }

          // Ensure we are viewing results sink mode so user sees the Doctor card
          if (currentSinkMode !== 'results') {
            currentSinkMode = 'results';
            const tabRes = document.getElementById('komaTabResults');
            const tabStp = document.getElementById('komaTabStepper');
            const sinkRes = document.getElementById('komaSinkResultsView');
            const sinkStp = document.getElementById('komaSinkStepperView');
            if (tabRes) tabRes.classList.add('active');
            if (tabStp) tabStp.classList.remove('active');
            if (sinkRes) sinkRes.style.display = 'block';
            if (sinkStp) sinkStp.style.display = 'none';
          }

          if (tableWrapper) {
            if (diag && window.SQL_ERROR_DOCTOR) {
              tableWrapper.innerHTML = window.SQL_ERROR_DOCTOR.renderDoctorCardHtml(diag, {
                scenarioId: activeScenarioId,
                engineName: 'LANDING_PAGE_ENGINE'
              });
            } else {
              tableWrapper.innerHTML = `
                <div class="koma-sink-error-box">
                  <div class="koma-sink-error-title">
                    <span>✕ SQL Syntax Error</span>
                  </div>
                  <div class="koma-sink-error-message">${escapeHtml(rawMsg)}</div>
                </div>
              `;
            }
          }
        }
      } else {
        const cur = KOMA_SCENARIOS[activeScenarioId];
        if (badge) {
          badge.className = 'koma-badge-green';
          badge.innerText = cur.status;
        }
        if (latencyElem) {
          latencyElem.innerHTML = `speed: <strong>${cur.latency}</strong>`;
        }
        if (tuplesElem) {
          tuplesElem.innerText = cur.tuples;
        }
        if (tableWrapper) {
          tableWrapper.innerHTML = `
            <table class="koma-table">
              <thead>
                <tr>${cur.tableHeaders.map(th => `<th>${escapeHtml(th)}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${cur.tableRows.map(row => `
                  <tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>
                `).join('')}
              </tbody>
            </table>
          `;
        }
      }
    },

    resetActiveQuery: function() {
      activeErrorLine = null;
      activeSuccessLine = null;
      lastDoctorDiagnosis = null;
      const cur = KOMA_SCENARIOS[activeScenarioId];
      if (!cur) return;
      userSqlMap[activeScenarioId] = null;

      const textarea = document.getElementById('komaSqlEditor');
      if (textarea) {
        textarea.value = cur.rawSql;
        this.updateEditorGutter();
      }

      if (activeDb && sqlModuleInstance && cur.seedSql) {
        try { activeDb.close(); } catch(e) {}
        activeDb = new sqlModuleInstance.Database();
        activeDb.run(cur.seedSql);
        activeDbScenarioId = activeScenarioId;
      }

      this.runActiveQuery();
    },

    formatActiveQuery: function() {
      const textarea = document.getElementById('komaSqlEditor');
      if (!textarea) return;

      let sql = textarea.value;
      const keywords = [
        'select', 'distinct', 'from', 'where', 'and', 'or', 'not', 'in', 'is', 'null',
        'join', 'left join', 'right join', 'inner join', 'group by', 'order by',
        'having', 'limit', 'offset', 'as', 'with', 'case', 'when', 'then', 'else',
        'end', 'over', 'partition by', 'asc', 'desc'
      ];

      keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        sql = sql.replace(regex, match => match.toUpperCase());
      });

      textarea.value = sql;
      userSqlMap[activeScenarioId] = sql;
      this.updateEditorGutter();
    },

    updateEditorGutter: function() {
      const textarea = document.getElementById('komaSqlEditor');
      const gutter = document.getElementById('komaEditorGutter');
      if (!textarea || !gutter) return;

      const lines = (textarea.value || '').split('\n').length;
      let nums = [];
      const total = Math.max(lines, 8);
      
      const cur = KOMA_SCENARIOS[activeScenarioId] || KOMA_SCENARIOS.amazon;
      const curStepIdx = activeStepMap[activeScenarioId] || 0;
      const curStep = (cur && cur.steps && cur.steps[curStepIdx]) || null;
      const highlightedLines = (currentSinkMode === 'stepper' && curStep && curStep.lineNumbers) ? curStep.lineNumbers : [];

      for (let i = 1; i <= total; i++) {
        const isHl = highlightedLines.includes(i);
        const isErr = (activeErrorLine === i);
        const isSuccess = (activeSuccessLine === i);
        if (isErr) {
          nums.push(`<span class="koma-gutter-num error-step-line" title="Error on this line">✕ ${i}</span>`);
        } else if (isSuccess) {
          nums.push(`<span class="koma-gutter-num autofix-success-line" title="Auto-Fixed line">✓ ${i}</span>`);
        } else if (isHl) {
          nums.push(`<span class="koma-gutter-num active-step-line" title="Active Step Line">${i}</span>`);
        } else {
          nums.push(`<span class="koma-gutter-num">${i}</span>`);
        }
      }
      gutter.innerHTML = nums.join('<br>');
    },

    renderHTML: function() {
      const cur = KOMA_SCENARIOS[activeScenarioId] || KOMA_SCENARIOS.amazon;
      const curTrap = TRAPS[activeTrapId] || TRAPS.null_trap;
      const activeQuerySql = userSqlMap[activeScenarioId] || cur.rawSql;

      return `
        <div class="koma-container">

          <!-- 1. HERO SECTION (BEGINNER FRIENDLY) -->
          <section class="koma-hero">
            
            <div class="koma-badge-row">
              <span class="koma-badge-pill">
                <span>Interactive SQL Learning &bull; Zero Installation Required</span>
              </span>
            </div>

            <h1 class="koma-hero-title">
              SQL Foundry<br>
              for Data &amp; Finance
            </h1>

            <p class="koma-hero-subtitle">
              Learn SQL step-by-step with simple, real-world examples from companies like Amazon, Netflix, and Spotify. Designed for complete beginners to practice and run real queries directly in your browser.
            </p>

            <div class="koma-cta-row">
              <button class="btn-koma-primary" onclick="window.LANDING_PAGE_ENGINE.openSectionStudio()">
                Start Learning SQL &rarr;
              </button>
              <button class="btn-koma-secondary" onclick="window.LANDING_PAGE_ENGINE.openLeetCode()">
                Browse Practice Problems
              </button>
            </div>

            <div class="koma-platform-subtext">
              Beginner-friendly &bull; MySQL &bull; PostgreSQL &bull; SQLite in browser &bull; Real datasets
            </div>

          </section>

          <!-- 2. KOMA SHOWCASE (PILL TABS + IDE RUNNER) -->
          <section class="koma-showcase-wrapper">
            
            <!-- Company Selection Tabs -->
            <div class="koma-pill-nav-container">
              <div class="koma-pill-nav">
                ${Object.keys(KOMA_SCENARIOS).map(k => {
                  const s = KOMA_SCENARIOS[k];
                  const isActive = s.id === activeScenarioId;
                  return `
                    <button class="koma-pill-tab ${isActive ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setScenario('${s.id}')">
                      <span>${s.tabLabel}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Desktop IDE Window Mockup -->
            <div class="koma-window-mockup">
              
              <!-- Window Header -->
              <div class="koma-window-header">
                <div class="koma-window-dots">
                  <span class="koma-dot koma-dot-red"></span>
                  <span class="koma-dot koma-dot-yellow"></span>
                  <span class="koma-dot koma-dot-green"></span>
                </div>

                <div class="koma-session-bar">
                  <span>practice: <strong>${cur.company} Dataset</strong></span>
                  <span style="color:#444;">|</span>
                  <span class="koma-action-tag" onclick="window.LANDING_PAGE_ENGINE.openSectionStudio()">Open Studio</span>
                  <span style="color:#444;">|</span>
                  <span style="color:#71717a;">In-Browser SQL Engine</span>
                </div>

                <div class="koma-wordmark">
                  <span>sql foundry</span>
                </div>
              </div>

              <!-- Window Body: Sidebar + Main Area -->
              <div class="koma-window-body">
                
                <!-- Sidebar Explorer -->
                <div class="koma-sidebar">
                  <div class="koma-sidebar-label">PRACTICE EXAMPLES</div>
                  
                  <div class="koma-tree-group">
                    <div class="koma-tree-header">&blacktriangledown; COMPANY TABLES</div>
                    ${Object.keys(KOMA_SCENARIOS).map(k => {
                      const s = KOMA_SCENARIOS[k];
                      const isActive = s.id === activeScenarioId;
                      return `
                        <div class="koma-tree-item ${isActive ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setScenario('${s.id}')">
                          <span>&bull;</span>
                          <span>${s.filename}</span>
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <div class="koma-tree-group">
                    <div class="koma-tree-header">&blacktriangledown; ENGINE STATUS</div>
                    <div class="koma-tree-item active">
                      <span>&check;</span>
                      <span>Ready to run</span>
                    </div>
                  </div>
                </div>

                <!-- Main Area -->
                <div class="koma-main-area">
                  
                  <!-- Tabs Bar -->
                  <div class="koma-tabs-bar">
                    <div class="koma-tab active">
                      <span>&gt;_ ${cur.filename}</span>
                    </div>
                  </div>

                  <!-- Prompt Strip -->
                  <div class="koma-prompt-strip">
                    <div class="koma-prompt-text">
                      ${cur.prompt}
                    </div>
                    <div class="koma-reasoning-toggle">
                      <span>&bull; Simple Explanation &rsaquo;</span>
                      <span style="color:#a3a3a3;">${cur.reasoning}</span>
                    </div>
                  </div>

                  <!-- Split: Code Editor vs Results -->
                  <div class="koma-editor-sink-split">
                    
                    <!-- Code Editor Column -->
                    <div class="koma-code-column">
                      
                      <!-- Editor Toolbar -->
                      <div class="koma-editor-toolbar">
                        <div class="koma-editor-toolbar-left">
                          <button class="koma-btn-run" onclick="window.LANDING_PAGE_ENGINE.runActiveQuery()" title="Run SQL (Ctrl+Enter)">
                            <span>▶ Run Query</span>
                            <span class="koma-kbd">Ctrl+↵</span>
                          </button>
                          <button class="koma-btn-toolbar" onclick="window.LANDING_PAGE_ENGINE.resetActiveQuery()" title="Reset to original query">
                            <span>↺ Reset</span>
                          </button>
                          <button class="koma-btn-toolbar" onclick="window.LANDING_PAGE_ENGINE.formatActiveQuery()" title="Uppercase keywords">
                            <span>⚡ Format</span>
                          </button>
                          <button class="koma-btn-toolbar" onclick="window.LANDING_PAGE_ENGINE.checkQueryHealth()" title="Check query with Friendly Error Doctor" style="color:#f87171;">
                            <span>🩺 Error Doctor</span>
                          </button>
                          <button class="koma-btn-toolbar ${currentSinkMode === 'stepper' ? 'active-stepper-btn' : ''}" id="komaBtnStepThrough" onclick="window.LANDING_PAGE_ENGINE.toggleStepThrough()" title="Interactive Step-by-Step SQL Guide">
                            <span>🚶 Step-by-Step</span>
                          </button>
                        </div>
                        <div class="koma-editor-toolbar-right">
                          <span><span class="koma-editor-pulse"></span>Live Editor Ready</span>
                        </div>
                      </div>

                      <!-- Editor Textarea with Line Numbers -->
                      <div class="koma-editor-body">
                        <div id="komaEditorGutter" class="koma-editor-gutter"></div>
                        <textarea id="komaSqlEditor" class="koma-code-textarea" spellcheck="false" wrap="off" placeholder="Write SQL query here...">${escapeHtml(activeQuerySql)}</textarea>
                      </div>

                    </div>

                    <!-- Live Query Results & Interactive Stepper Column -->
                    <div class="koma-sink-column">
                      
                      <!-- Sink Tab Switcher Header -->
                      <div class="koma-sink-header">
                        <div class="koma-sink-tab-group">
                          <button class="koma-sink-tab-btn ${currentSinkMode === 'results' ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.switchSinkView('results')">
                            📋 Query Results
                          </button>
                          <button class="koma-sink-tab-btn ${currentSinkMode === 'stepper' ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.switchSinkView('stepper')">
                            🚶 Step-by-Step Guide ${(cur.steps && cur.steps.length) ? `<span class="koma-sink-tab-pill">${cur.steps.length} Steps</span>` : ''}
                          </button>
                        </div>
                        <span id="komaSinkBadge" class="koma-badge-green">${cur.status}</span>
                      </div>

                      ${currentSinkMode === 'stepper' && cur.steps && cur.steps.length ? `
                        <!-- INTERACTIVE STEP-BY-STEP VIEW -->
                        ${(() => {
                          const stepIdx = activeStepMap[activeScenarioId] || 0;
                          const st = cur.steps[stepIdx] || cur.steps[0];
                          const total = cur.steps.length;
                          return `
                            <div class="koma-stepper-view" id="komaStepperView">
                              
                              <!-- Stepper Top Bar -->
                              <div class="koma-stepper-nav-bar">
                                <div class="koma-step-counter">
                                  <span class="koma-step-pill">STEP ${stepIdx + 1} OF ${total}</span>
                                  <span class="koma-step-clause-badge">${escapeHtml(st.clause)}</span>
                                </div>
                                <div class="koma-step-nav-buttons">
                                  <button class="koma-step-nav-btn" onclick="window.LANDING_PAGE_ENGINE.prevStep()" ${stepIdx === 0 ? 'disabled' : ''} title="Previous Step">◀ Back</button>
                                  <button class="koma-step-nav-btn primary" onclick="window.LANDING_PAGE_ENGINE.nextStep()" ${stepIdx === total - 1 ? 'disabled' : ''} title="Next Step">Next Step ▶</button>
                                </div>
                              </div>

                              <!-- Interactive Step Track -->
                              <div class="koma-stepper-track">
                                ${cur.steps.map((s, i) => `
                                  <div class="koma-step-track-node ${i === stepIdx ? 'active' : (i < stepIdx ? 'done' : '')}" onclick="window.LANDING_PAGE_ENGINE.setStep(${i})" title="${escapeHtml(s.clause)}: ${escapeHtml(s.title)}">
                                    <span class="koma-step-num">${i + 1}</span>
                                    <span class="koma-step-name">${escapeHtml(s.clause)}</span>
                                  </div>
                                  ${i < cur.steps.length - 1 ? `<div class="koma-step-track-line ${i < stepIdx ? 'done' : ''}"></div>` : ''}
                                `).join('')}
                              </div>

                              <!-- Step Card Details -->
                              <div class="koma-step-card">
                                <div class="koma-step-card-header">
                                  <h3 class="koma-step-title">${escapeHtml(st.title)}</h3>
                                  <span class="koma-step-impact-pill">${escapeHtml(st.rowImpact)}</span>
                                </div>
                                
                                <div class="koma-step-explanation-text">
                                  ${escapeHtml(st.explanation)}
                                </div>

                                <!-- Beginner Rule Box -->
                                <div class="koma-step-rule-box">
                                  <span class="koma-rule-icon">💡</span>
                                  <div class="koma-rule-text">
                                    <strong>Beginner Mental Rule:</strong> ${escapeHtml(st.mentalRule)}
                                  </div>
                                </div>

                                <!-- Code Slice for This Step -->
                                <div class="koma-step-code-slice">
                                  <div class="koma-slice-label">SQL Executed in this Step (Line ${st.lineNumbers.join(', ')}):</div>
                                  <pre class="koma-slice-code"><code>${escapeHtml(st.codeSlice)}</code></pre>
                                </div>
                              </div>

                              <!-- Stepper Footer -->
                              <div class="koma-stepper-footer">
                                <button class="koma-btn-subtle" onclick="window.LANDING_PAGE_ENGINE.switchSinkView('results')">
                                  📋 View Output Table (${escapeHtml(cur.tuples)})
                                </button>
                                <button class="btn-koma-primary" style="padding:4px 12px; font-size:11px;" onclick="window.LANDING_PAGE_ENGINE.launchTrack('${cur.viewId}', '${cur.viewTitle}', '${cur.viewHash}')">
                                  Practice ${escapeHtml(cur.company)} Track &rarr;
                                </button>
                              </div>

                            </div>
                          `;
                        })()}
                      ` : `
                        <!-- QUERY RESULTS TABLE VIEW -->
                        <div id="komaTableWrapper" class="koma-table-wrapper">
                          <table class="koma-table">
                            <thead>
                              <tr>
                                ${cur.tableHeaders.map(th => `<th>${escapeHtml(th)}</th>`).join('')}
                              </tr>
                            </thead>
                            <tbody>
                              ${cur.tableRows.map(row => `
                                <tr>
                                  ${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}
                                </tr>
                              `).join('')}
                            </tbody>
                          </table>
                        </div>

                        <div class="koma-sink-footer">
                          <span id="komaSinkLatency">speed: <strong>${cur.latency}</strong></span>
                          <span id="komaSinkTuples" style="color:#4ec9b0;">${cur.tuples}</span>
                          <button class="btn-koma-primary" style="padding:4px 10px; font-size:11px;" onclick="window.LANDING_PAGE_ENGINE.launchTrack('${cur.viewId}', '${cur.viewTitle}', '${cur.viewHash}')">
                            Practice ${cur.company} &rarr;
                          </button>
                        </div>
                      `}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

          <!-- 3. PRACTICE PROBLEMS COUNTER -->
          <section class="koma-giant-stat-section">
            <div class="koma-giant-number">323 / 323</div>
            <div class="koma-giant-label">practice problems solved step-by-step directly in your browser</div>
          </section>

          <!-- 4. REAL-WORLD PRACTICE TRACKS -->
          <section class="koma-tracks-section">
            
            <div class="koma-vertical-header">
              <span>real-world examples</span>
            </div>

            <div class="koma-cards-grid">
              
              <!-- Card 1: Amazon -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewAmazonStory', 'Analytics', '#analytics')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">A</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Amazon Store</h4>
                  <p class="koma-card-desc">Customer retention &bull; 30-day Prime orders practice</p>
                </div>
              </div>

              <!-- Card 2: Netflix -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewNetflixStory', 'Netflix', '#netflix')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">N</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Netflix Video</h4>
                  <p class="koma-card-desc">Video loading speed &bull; buffering data analysis</p>
                </div>
              </div>

              <!-- Card 3: Uber -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewUberStory', 'Uber', '#uber')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">U</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Uber Rides</h4>
                  <p class="koma-card-desc">Passenger ride demand &bull; busy-area surge pricing</p>
                </div>
              </div>

              <!-- Card 4: Airbnb -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewAirbnbStory', 'Airbnb', '#airbnb')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">A</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Airbnb Stays</h4>
                  <p class="koma-card-desc">Calendar gap days &bull; smart price discounts</p>
                </div>
              </div>

              <!-- Card 5: Spotify -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewSpotifyStory', 'Spotify', '#spotify')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">S</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Spotify Music</h4>
                  <p class="koma-card-desc">Song play counts &bull; artist royalty payouts</p>
                </div>
              </div>

              <!-- Card 6: JPMorgan Chase -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewJPMorganStory', 'Finance', '#jpmorgan')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">J</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">JPMorgan Banking</h4>
                  <p class="koma-card-desc">Balancing bank accounts &bull; debits and credits check</p>
                </div>
              </div>

              <!-- Card 7: Stripe -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewStripeStory', 'Stripe', '#stripe')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">S</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Stripe Payments</h4>
                  <p class="koma-card-desc">Credit card safety &bull; detecting tiny test charges</p>
                </div>
              </div>

              <!-- Card 8: Guided Capstones -->
              <div class="koma-track-card" onclick="if(window.selectNavView) window.selectNavView('viewCapstones', 'Guided Capstones', 'navGroupPractice'); try{window.location.hash='#capstone';}catch(e){}">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">+</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">10 Guided Projects</h4>
                  <p class="koma-card-desc">Healthcare, Ecommerce &bull; End-to-end beginner projects</p>
                </div>
              </div>

            </div>

          </section>

          <!-- 5. 5 COMMON BEGINNER MISTAKES (CLEAN EXPLANATION) -->
          <section class="koma-diff-section">
            
            <div class="koma-section-header">
              <span class="koma-section-tag">beginner guide</span>
              <h2 class="koma-section-title">5 Common SQL Mistakes (And How to Fix Them)</h2>
              <p class="koma-section-sub">
                Simple query mistakes that beginners run into, why they happen, and the clean way to write them.
              </p>
            </div>

            <div class="koma-diff-card">
              
              <div class="koma-diff-pills">
                ${Object.keys(TRAPS).map(k => {
                  const t = TRAPS[k];
                  const isActive = t.id === activeTrapId;
                  return `
                    <button class="koma-diff-pill-btn ${isActive ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setTrap('${t.id}')">
                      <span>${t.title}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <div class="koma-diff-grid">
                
                <div class="koma-diff-box koma-box-danger">
                  <div class="koma-box-tag" style="color:#f87171;">✕ COMMON BEGINNER MISTAKE</div>
                  <pre class="koma-diff-pre"><code>${curTrap.codeWrong}</code></pre>
                </div>

                <div class="koma-diff-box koma-box-success">
                  <div class="koma-box-tag" style="color:#4ec9b0;">✓ CLEAN WORKING FIX</div>
                  <pre class="koma-diff-pre"><code>${curTrap.codeFix}</code></pre>
                </div>

              </div>

              <div class="koma-diff-impact">
                <strong>Why this matters:</strong> ${curTrap.impact}
              </div>

            </div>

          </section>

          <!-- 6. FOOTER -->
          <footer class="koma-footer">
            <div>
              <span>sql foundry &bull; interactive sql learning platform for beginners</span>
            </div>
            <div style="display:flex; gap:16px;">
              <a href="#studio" onclick="window.LANDING_PAGE_ENGINE.openSectionStudio(); return false;">interactive studio</a>
              <a href="#leetcode" onclick="window.LANDING_PAGE_ENGINE.openLeetCode(); return false;">practice problems</a>
              <a href="#companies" onclick="if(window.selectNavView) window.selectNavView('viewCompanyHub', 'Companies', 'navGroupPractice'); return false;">company tracks</a>
            </div>
          </footer>

        </div>
      `;
    },


    toggleStepThrough: function(force) {
      if (force !== undefined) {
        currentSinkMode = force ? 'stepper' : 'results';
      } else {
        currentSinkMode = (currentSinkMode === 'stepper') ? 'results' : 'stepper';
      }
      this.updateView();
      setTimeout(() => this.updateEditorGutter(), 30);
    },

    switchSinkView: function(mode) {
      currentSinkMode = mode;
      this.updateView();
      setTimeout(() => this.updateEditorGutter(), 30);
    },

    prevStep: function() {
      const cur = KOMA_SCENARIOS[activeScenarioId] || KOMA_SCENARIOS.amazon;
      const current = activeStepMap[activeScenarioId] || 0;
      if (current > 0) {
        activeStepMap[activeScenarioId] = current - 1;
        this.updateView();
        setTimeout(() => this.updateEditorGutter(), 30);
      }
    },

    nextStep: function() {
      const cur = KOMA_SCENARIOS[activeScenarioId] || KOMA_SCENARIOS.amazon;
      const total = (cur && cur.steps && cur.steps.length) || 1;
      const current = activeStepMap[activeScenarioId] || 0;
      if (current < total - 1) {
        activeStepMap[activeScenarioId] = current + 1;
        this.updateView();
        setTimeout(() => this.updateEditorGutter(), 30);
      }
    },

    setStep: function(idx) {
      const cur = KOMA_SCENARIOS[activeScenarioId] || KOMA_SCENARIOS.amazon;
      const total = (cur && cur.steps && cur.steps.length) || 1;
      if (idx >= 0 && idx < total) {
        activeStepMap[activeScenarioId] = idx;
        this.updateView();
        setTimeout(() => this.updateEditorGutter(), 30);
      }
    },


    toggleStepThrough: function(force) {
      if (force !== undefined) {
        currentSinkMode = force ? 'stepper' : 'results';
      } else {
        currentSinkMode = (currentSinkMode === 'stepper') ? 'results' : 'stepper';
      }
      this.updateView();
      setTimeout(() => this.updateEditorGutter(), 30);
    },

    switchSinkView: function(mode) {
      currentSinkMode = mode;
      this.updateView();
      setTimeout(() => this.updateEditorGutter(), 30);
    },

    prevStep: function() {
      const cur = KOMA_SCENARIOS[activeScenarioId] || KOMA_SCENARIOS.amazon;
      const current = activeStepMap[activeScenarioId] || 0;
      if (current > 0) {
        activeStepMap[activeScenarioId] = current - 1;
        this.updateView();
        setTimeout(() => this.updateEditorGutter(), 30);
      }
    },

    nextStep: function() {
      const cur = KOMA_SCENARIOS[activeScenarioId] || KOMA_SCENARIOS.amazon;
      const total = (cur && cur.steps && cur.steps.length) || 1;
      const current = activeStepMap[activeScenarioId] || 0;
      if (current < total - 1) {
        activeStepMap[activeScenarioId] = current + 1;
        this.updateView();
        setTimeout(() => this.updateEditorGutter(), 30);
      }
    },

    setStep: function(idx) {
      const cur = KOMA_SCENARIOS[activeScenarioId] || KOMA_SCENARIOS.amazon;
      const total = (cur && cur.steps && cur.steps.length) || 1;
      if (idx >= 0 && idx < total) {
        activeStepMap[activeScenarioId] = idx;
        this.updateView();
        setTimeout(() => this.updateEditorGutter(), 30);
      }
    },

    applyDoctorAutoFix: function() {
      if (!lastDoctorDiagnosis || !lastDoctorDiagnosis.fixedSql) return;
      const textarea = document.getElementById('komaSqlEditor');
      if (!textarea) return;

      const fixedSql = lastDoctorDiagnosis.fixedSql;
      const fixedLine = lastDoctorDiagnosis.fixedLineNumber || 1;

      textarea.value = fixedSql;
      userSqlMap[activeScenarioId] = fixedSql;

      activeErrorLine = null;
      activeSuccessLine = fixedLine;
      this.updateEditorGutter();

      setTimeout(() => {
        activeSuccessLine = null;
        this.updateEditorGutter();
      }, 1500);

      if (window.soundFX && typeof window.soundFX.playSuccess === 'function') {
        try { window.soundFX.playSuccess(); } catch(e) {}
      }

      this.runActiveQuery();

      setTimeout(() => {
        const badge = document.getElementById('komaSinkBadge');
        if (badge) {
          badge.className = 'koma-badge-green';
          badge.innerText = 'AUTO-FIXED ✨';
        }
      }, 60);
    },

    checkQueryHealth: function() {
      const textarea = document.getElementById('komaSqlEditor');
      if (!textarea) return;
      const query = textarea.value.trim();
      const schema = window.SQL_ERROR_DOCTOR ? window.SQL_ERROR_DOCTOR.getSchema(activeScenarioId) : null;
      
      const diag = window.SQL_ERROR_DOCTOR ? window.SQL_ERROR_DOCTOR.diagnose(query, '', schema) : null;

      if (diag && diag.type !== 'GENERAL_ERROR') {
        lastDoctorDiagnosis = diag;
        activeErrorLine = diag.fixedLineNumber;
        this.updateEditorGutter();
        this.switchSinkView('results');

        const tableWrapper = document.getElementById('komaTableWrapper');
        const badge = document.getElementById('komaSinkBadge');
        if (badge) {
          badge.className = 'koma-badge-red';
          badge.innerText = 'ISSUE FOUND 🩺';
        }
        if (tableWrapper && window.SQL_ERROR_DOCTOR) {
          tableWrapper.innerHTML = window.SQL_ERROR_DOCTOR.renderDoctorCardHtml(diag, {
            scenarioId: activeScenarioId,
            engineName: 'LANDING_PAGE_ENGINE'
          });
        }
      } else {
        this.runActiveQuery();
      }
    },

    bindEvents: function(container) {
      const textarea = document.getElementById('komaSqlEditor');
      const gutter = document.getElementById('komaEditorGutter');

      if (textarea && gutter) {
        this.updateEditorGutter();

        textarea.addEventListener('scroll', function() {
          gutter.scrollTop = textarea.scrollTop;
        });

        textarea.addEventListener('input', () => {
          userSqlMap[activeScenarioId] = textarea.value;
          this.updateEditorGutter();
        });

        textarea.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            e.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 2;
            userSqlMap[activeScenarioId] = textarea.value;
            this.updateEditorGutter();
            return;
          }

          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            this.runActiveQuery();
          }
        });
      }
    }
  };

  window.LANDING_PAGE_ENGINE = LandingPageEngine;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      LandingPageEngine.init();
    });
  } else {
    LandingPageEngine.init();
  }

})(window);
