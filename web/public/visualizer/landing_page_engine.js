/**
 * SQL FOUNDRY - PLAIN-ENGLISH QUERY EXPLAINER
 * Translates any SQL query into clear, conversational, human language.
 * Designed for complete beginners to verify their understanding of SQL logic.
 */

(function(window) {
  'use strict';

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function friendlyName(name) {
    if (!name) return 'the table';
    return name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  function parseAndExplainSql(sql) {
    sql = String(sql || '').trim();
    const cleanSql = sql.replace(/--.*$/gm, '').trim();

    if (!cleanSql) {
      


  return {
        summary: 'The editor is empty. Type any SQL query above and click 💬 Explain Query to see what it does in plain English.',
        chips: {
          Status: 'Empty Query'
        }
      };
    }

    // 1. Table
    const fromMatch = cleanSql.match(/\bFROM\s+([a-zA-Z0-9_]+)/i);
    const table = fromMatch ? fromMatch[1] : 'the table';
    const tableFriendly = friendlyName(table);

    // 2. Join
    const joinMatch = cleanSql.match(/\b(LEFT|RIGHT|INNER|FULL)?\s*JOIN\s+([a-zA-Z0-9_]+)/i);
    const joinType = joinMatch && joinMatch[1] ? joinMatch[1].toUpperCase() : (joinMatch ? 'INNER' : null);
    const joinTable = joinMatch ? joinMatch[2] : null;

    // 3. Projections / Columns
    const selectMatch = cleanSql.match(/\bSELECT\s+(DISTINCT\s+)?([\s\S]*?)\bFROM\b/i);
    const isDistinct = Boolean(selectMatch && selectMatch[1]);
    const rawCols = selectMatch ? selectMatch[2].trim() : '*';

    let colsSummary = 'all columns';
    if (rawCols !== '*') {
      const colList = rawCols.split(',').map(c => c.trim()).filter(Boolean);
      const cleanCols = colList.map(c => c.split(/\s+AS\s+|\s+/i)[0].replace(/^[a-zA-Z0-9_]+\./, ''));
      colsSummary = cleanCols.join(', ');
    }

    // 4. Filters (WHERE)
    const whereMatch = cleanSql.match(/\bWHERE\s+([\s\S]*?)(?=\bGROUP BY\b|\bORDER BY\b|\bHAVING\b|\bLIMIT\b|;|$)/i);
    const rawWhere = whereMatch ? whereMatch[1].trim() : null;

    let filterDesc = null;
    if (rawWhere) {
      let w = rawWhere.replace(/\s+/g, ' ');
      w = w.replace(/\bIS NULL\b/gi, 'is empty or unassigned');
      w = w.replace(/\bIS NOT NULL\b/gi, 'has a valid value');
      w = w.replace(/!=|<>/g, 'is not equal to');
      w = w.replace(/==/g, 'equals');
      w = w.replace(/=/g, 'equals');
      w = w.replace(/>=/g, 'is greater than or equal to');
      w = w.replace(/<=/g, 'is less than or equal to');
      w = w.replace(/>/g, 'is greater than');
      w = w.replace(/</g, 'is less than');
      w = w.replace(/\bAND\b/gi, 'and');
      w = w.replace(/\bOR\b/gi, 'or');
      filterDesc = w;
    }

    // 5. Grouping & Having
    const groupMatch = cleanSql.match(/\bGROUP BY\s+([\s\S]*?)(?=\bHAVING\b|\bORDER BY\b|\bLIMIT\b|;|$)/i);
    const groupDesc = groupMatch ? groupMatch[1].trim() : null;

    const havingMatch = cleanSql.match(/\bHAVING\s+([\s\S]*?)(?=\bORDER BY\b|\bLIMIT\b|;|$)/i);
    const havingDesc = havingMatch ? havingMatch[1].trim() : null;

    // 6. Sorting (ORDER BY)
    const orderMatch = cleanSql.match(/\bORDER BY\s+([\s\S]*?)(?=\bLIMIT\b|;|$)/i);
    const rawOrder = orderMatch ? orderMatch[1].trim() : null;
    let orderDesc = null;
    if (rawOrder) {
      const isDesc = /DESC/i.test(rawOrder);
      const col = rawOrder.replace(/\s+(ASC|DESC)/i, '').trim().replace(/^[a-zA-Z0-9_]+\./, '');
      orderDesc = `${col} (${isDesc ? 'highest to lowest' : 'lowest to highest'})`;
    }

    // 7. Limit
    const limitMatch = cleanSql.match(/\bLIMIT\s+(\d+)/i);
    const limitDesc = limitMatch ? `Top ${limitMatch[1]} rows` : null;

    // Compose cohesive plain-English sentences
    const parts = [];

    // Sentence 1: Data source
    if (joinTable) {
      if (joinTable === table) {
        parts.append ? parts.append() : parts.push(`This query checks the <strong>${tableFriendly}</strong> table against itself (self-join) to find related subsequent activity.`);
      } else {
        const jFriendly = friendlyName(joinTable);
        parts.push(`This query opens the <strong>${tableFriendly}</strong> table and connects it with <strong>${jFriendly}</strong> records.`);
      }
    } else {
      parts.push(`This query opens the <strong>${tableFriendly}</strong> table.`);
    }

    // Sentence 2: Filtering / Grouping
    if (filterDesc) {
      parts.push(`It looks specifically for rows where <em>${filterDesc}</em>.`);
    } else if (groupDesc) {
      parts.push(`It groups the rows together by <code>${groupDesc}</code> to calculate summary totals.`);
    } else {
      parts.push(`It inspects all records without filtering any rows out.`);
    }

    // Sentence 3: Output columns, sorting & bounds
    const outPhrase = isDistinct ? `unique values for <code>${colsSummary}</code>` : `<code>${colsSummary}</code>`;
    if (orderDesc && limitDesc) {
      parts.push(`Finally, it displays ${outPhrase}, sorted by ${orderDesc}, and limits the output to the ${limitDesc.toLowerCase()}.`);
    } else if (orderDesc) {
      parts.push(`Finally, it displays ${outPhrase}, sorted by ${orderDesc}.`);
    } else if (limitDesc) {
      parts.push(`Finally, it displays ${outPhrase}, stopping after the ${limitDesc.toLowerCase()}.`);
    } else {
      parts.push(`Finally, it outputs ${outPhrase}.`);
    }

    const chips = {
      '📂 Table': table,
      '📋 Output': colsSummary,
      '🔍 Filter': filterDesc ? rawWhere : 'None (All rows)',
      '⇅ Sorting': orderDesc || 'Default physical order',
      '🛑 Limit': limitDesc || 'All matching rows'
    };

    if (joinTable) chips['🔗 Link'] = `${joinType || 'LEFT'} JOIN on ${joinTable}`;
    if (groupDesc) chips['📦 Grouping'] = groupDesc;

    return {
      summary: parts.join(' '),
      chips: chips
    };
  }

  function renderExplainerCardHtml(result) {
    const summary = result.summary;
    const chips = result.chips || {};

    const chipKeys = Object.keys(chips);

    return `
      <div class="koma-explainer-card">
        <div class="koma-explainer-header">
          <div class="koma-explainer-badge-row">
            <span class="koma-explainer-badge">💬 Plain-English Translation</span>
            <span class="koma-explainer-sub">How SQL translates to human thoughts</span>
          </div>
          <button class="koma-explainer-close-btn" onclick="window.LANDING_PAGE_ENGINE.toggleQueryExplainer()" title="Close explanation">✕</button>
        </div>

        <div class="koma-explainer-body">
          <p class="koma-explainer-text">${summary}</p>
          <div class="koma-explainer-chips-row">
            ${chipKeys.map(k => `
              <div class="koma-explainer-chip">
                <span class="chip-label">${escapeHtml(k)}:</span>
                <span class="chip-val">${escapeHtml(chips[k])}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  window.SQL_EXPLAINER = {
    explain: parseAndExplainSql,
    renderExplainerCardHtml: renderExplainerCardHtml
  };

})(window);


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
        "transform": {
          "stat": "4 sample rows loaded · 0 filtered out",
          "headers": ["Status", "customer_id", "purchase_date", "product_id"],
          "rows": [
            { "status": "KEPT", "cells": ["CUST_88201", "2026-09-01", "PROD_KINDLE_PAPERWHITE"] },
            { "status": "KEPT", "cells": ["CUST_88245", "2026-09-01", "PROD_ECHO_DOT_5TH_GEN"] },
            { "status": "KEPT", "cells": ["CUST_89104", "2026-09-02", "PROD_FIRE_TV_STICK_4K"] },
            { "status": "KEPT", "cells": ["CUST_89311", "2026-09-03", "PROD_RING_VIDEO_DOORBELL"] }
          ]
        },
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
        "transform": {
          "stat": "Matched members against their future orders",
          "headers": ["Status", "customer_id", "initial_date", "future_order_id"],
          "rows": [
            { "status": "KEPT", "cells": ["CUST_88201", "2026-09-01", "ORD_103 (Sept 15)"] },
            { "status": "KEPT", "cells": ["CUST_88245", "2026-09-01", "NULL (No orders)"] },
            { "status": "KEPT", "cells": ["CUST_89104", "2026-09-02", "ORD_106 (Sept 10)"] },
            { "status": "KEPT", "cells": ["CUST_89311", "2026-09-03", "ORD_108 (Sept 22)"] }
          ]
        },
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
        "transform": {
          "stat": "4 inactive members kept · active members eliminated",
          "headers": ["Filter Status", "customer_id", "future_order", "reason"],
          "rows": [
            { "status": "DISCARDED", "cells": ["CUST_88201", "ORD_103", "Has future order (Active)"] },
            { "status": "KEPT", "cells": ["CUST_88245", "NULL", "Zero future orders! (Target found)"] },
            { "status": "DISCARDED", "cells": ["CUST_89104", "ORD_106", "Has future order (Active)"] },
            { "status": "DISCARDED", "cells": ["CUST_89311", "ORD_108", "Has future order (Active)"] }
          ]
        },
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
        "transform": {
          "stat": "3 requested columns kept · internal join ID discarded",
          "headers": ["Action", "customer_id", "purchase_date", "product_id"],
          "rows": [
            { "status": "OUTPUT", "cells": ["CUST_88245", "2026-09-01", "PROD_ECHO_DOT_5TH_GEN"] }
          ]
        },
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
  let isExplainerOpen = false;
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

    function renderStepTableTransformation(cur, st, stepIdx) {
    if (!st.transform) return '';
    const tf = st.transform;
    return `
      <div class="koma-step-transform-box">
        <div class="koma-step-transform-header">
          <div class="koma-transform-label">
            <span>📊 LIVE DATA TRANSFORMATION (WATCH ROWS SHRINK)</span>
          </div>
          <span class="koma-transform-pill">${escapeHtml(tf.stat)}</span>
        </div>
        <table class="koma-transform-table">
          <thead>
            <tr>
              ${tf.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${tf.rows.map(r => {
              let rCls = 'transform-row-kept';
              let badgeCls = 'status-kept';
              let badgeText = '✓ KEPT';
              if (String(r.status).toLowerCase() === 'discarded' || String(r.status).toLowerCase() === 'filtered') {
                rCls = 'transform-row-discarded';
                badgeCls = 'status-discarded';
                badgeText = '✕ FILTERED';
              } else if (String(r.status).toLowerCase() === 'output') {
                rCls = 'transform-row-output';
                badgeCls = 'status-output';
                badgeText = '★ OUTPUT';
              }
              return `
                <tr class="${rCls}">
                  <td><span class="transform-status-badge ${badgeCls}">${badgeText}</span></td>
                  ${r.cells.map(c => `<td>${escapeHtml(c)}</td>`).join('')}
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }


  /**
 * SQL FOUNDRY - 80/20 UNIVERSAL PATTERN ACADEMY
 * Master the vital 20% of SQL archetypes that solve 80% of company database questions.
 * Deep subtopic stepping stones, visual mental models, and handcrafted dark-theme SVGs.
 */

(function(window) {
  'use strict';

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ===========================================================================
  // SVG DIAGRAM GENERATORS (Handcrafted with dark Koma.run styling)
  // ===========================================================================

  const SVG_LIBRARY = {
    // 1.1: INNER JOIN vs LEFT JOIN
    joinComparison: function() {
      return `
        <svg viewBox="0 0 680 230" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#0284c7" stop-opacity="0.1"/>
            </linearGradient>
            <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#34d399" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#059669" stop-opacity="0.1"/>
            </linearGradient>
            <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f87171" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#dc2626" stop-opacity="0.1"/>
            </linearGradient>
          </defs>

          <!-- Background Card -->
          <rect x="0" y="0" width="680" height="230" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <!-- LEFT SIDE: INNER JOIN -->
          <g transform="translate(20, 20)">
            <text x="140" y="22" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="700" letter-spacing="0.05em">INNER JOIN (ONLY MATCHES)</text>
            
            <!-- Table A -->
            <rect x="20" y="40" width="110" height="130" rx="6" fill="#18181b" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="2 2"/>
            <text x="75" y="58" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="600">USERS (3)</text>
            <rect x="30" y="68" width="90" height="24" rx="4" fill="#27272a"/>
            <text x="75" y="84" text-anchor="middle" fill="#e4e4e7" font-size="10">User #1</text>
            <rect x="30" y="98" width="90" height="24" rx="4" fill="#27272a"/>
            <text x="75" y="114" text-anchor="middle" fill="#e4e4e7" font-size="10">User #2</text>
            <rect x="30" y="128" width="90" height="24" rx="4" fill="url(#gradRed)" stroke="#f87171" stroke-width="1" stroke-dasharray="3 3"/>
            <text x="75" y="144" text-anchor="middle" fill="#f87171" font-size="10">User #3 (No buy)</text>

            <!-- Table B -->
            <rect x="160" y="40" width="110" height="130" rx="6" fill="#18181b" stroke="#34d399" stroke-width="1.5" stroke-dasharray="2 2"/>
            <text x="215" y="58" text-anchor="middle" fill="#34d399" font-size="11" font-weight="600">ORDERS (2)</text>
            <rect x="170" y="68" width="90" height="24" rx="4" fill="#27272a"/>
            <text x="215" y="84" text-anchor="middle" fill="#e4e4e7" font-size="10">Order #101</text>
            <rect x="170" y="98" width="90" height="24" rx="4" fill="#27272a"/>
            <text x="215" y="114" text-anchor="middle" fill="#e4e4e7" font-size="10">Order #102</text>

            <text x="140" y="190" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="600">💥 User #3 ERASED from results!</text>
          </g>

          <!-- Divider -->
          <line x1="340" y1="20" x2="340" y2="210" stroke="#26262b" stroke-width="1" stroke-dasharray="4 4"/>

          <!-- RIGHT SIDE: LEFT JOIN -->
          <g transform="translate(360, 20)">
            <text x="140" y="22" text-anchor="middle" fill="#34d399" font-size="12" font-weight="700" letter-spacing="0.05em">LEFT JOIN (KEEPS HOLES AS NULL)</text>
            
            <!-- Table A -->
            <rect x="20" y="40" width="110" height="130" rx="6" fill="#18181b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="75" y="58" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="600">USERS (3)</text>
            <rect x="30" y="68" width="90" height="24" rx="4" fill="#27272a"/>
            <text x="75" y="84" text-anchor="middle" fill="#e4e4e7" font-size="10">User #1</text>
            <rect x="30" y="98" width="90" height="24" rx="4" fill="#27272a"/>
            <text x="75" y="114" text-anchor="middle" fill="#e4e4e7" font-size="10">User #2</text>
            <rect x="30" y="128" width="90" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
            <text x="75" y="144" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="600">User #3 ★</text>

            <!-- Table B -->
            <rect x="160" y="40" width="110" height="130" rx="6" fill="#18181b" stroke="#34d399" stroke-width="1.5"/>
            <text x="215" y="58" text-anchor="middle" fill="#34d399" font-size="11" font-weight="600">MATCHED</text>
            <rect x="170" y="68" width="90" height="24" rx="4" fill="#27272a"/>
            <text x="215" y="84" text-anchor="middle" fill="#e4e4e7" font-size="10">Order #101</text>
            <rect x="170" y="98" width="90" height="24" rx="4" fill="#27272a"/>
            <text x="215" y="114" text-anchor="middle" fill="#e4e4e7" font-size="10">Order #102</text>
            <rect x="170" y="128" width="90" height="24" rx="4" fill="#3f2e10" stroke="#f59e0b" stroke-width="1" stroke-dasharray="2 2"/>
            <text x="215" y="144" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="700">NULL (Target!)</text>

            <text x="140" y="190" text-anchor="middle" fill="#34d399" font-size="11" font-weight="600">🎯 User #3 SURVIVES with NULL slot</text>
          </g>
        </svg>
      `;
    },

    // 1.2: The Anti-Join Filter (WHERE right_table.id IS NULL)
    antiJoinFilter: function() {
      return `
        <svg viewBox="0 0 680 180" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="180" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>
          
          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#e4e4e7" font-size="13" font-weight="700">THE 3-STAGE "HOLE HUNTER" PIPELINE</text>

            <!-- Stage 1 -->
            <rect x="10" y="45" width="170" height="90" rx="6" fill="#18181b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="95" y="68" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">1. LEFT JOIN</text>
            <text x="95" y="88" text-anchor="middle" fill="#94a3b8" font-size="10">Attaches orders</text>
            <text x="95" y="104" text-anchor="middle" fill="#94a3b8" font-size="10">Creates NULL holes</text>
            <text x="95" y="122" text-anchor="middle" fill="#38bdf8" font-size="9" font-family="monospace">All Users Kept</text>

            <!-- Arrow 1 -->
            <path d="M 195 90 L 225 90" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrowCyan)"/>

            <!-- Stage 2 -->
            <rect x="235" y="45" width="180" height="90" rx="6" fill="#271c10" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="325" y="68" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">2. WHERE order_id IS NULL</text>
            <text x="325" y="88" text-anchor="middle" fill="#d4d4d8" font-size="10">The Filter Sieve</text>
            <text x="325" y="104" text-anchor="middle" fill="#a1a1aa" font-size="10">Discards all matching rows</text>
            <text x="325" y="122" text-anchor="middle" fill="#fbbf24" font-size="9" font-family="monospace">Holes Isolated</text>

            <!-- Arrow 2 -->
            <path d="M 430 90 L 460 90" stroke="#34d399" stroke-width="2"/>

            <!-- Stage 3 -->
            <rect x="470" y="45" width="160" height="90" rx="6" fill="#062e20" stroke="#34d399" stroke-width="1.5"/>
            <text x="550" y="68" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">3. CHURNED OUTPUT</text>
            <text x="550" y="88" text-anchor="middle" fill="#6ee7b7" font-size="10">Exact Dormant Users</text>
            <text x="550" y="104" text-anchor="middle" fill="#a7f3d0" font-size="10">Ready for Marketing</text>
            <text x="550" y="122" text-anchor="middle" fill="#34d399" font-size="9" font-family="monospace">Zero Inactive Dropped</text>
          </g>
        </svg>
      `;
    },

    // 2.1: GROUP BY vs PARTITION BY
    partitionVsGroupBy: function() {
      return `
        <svg viewBox="0 0 680 230" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="230" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <!-- GROUP BY side -->
          <g transform="translate(25, 20)">
            <text x="140" y="20" text-anchor="middle" fill="#f87171" font-size="12" font-weight="700">GROUP BY (SQUASHES ROWS)</text>
            
            <rect x="20" y="40" width="240" height="130" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="50" y="65" fill="#a1a1aa" font-size="10">6 Raw Rows</text>
            <rect x="40" y="75" width="80" height="18" rx="3" fill="#27272a"/>
            <text x="80" y="88" text-anchor="middle" fill="#71717a" font-size="9">Shoes #1 ($80)</text>
            <rect x="40" y="98" width="80" height="18" rx="3" fill="#27272a"/>
            <text x="80" y="111" text-anchor="middle" fill="#71717a" font-size="9">Shoes #2 ($120)</text>
            <rect x="40" y="121" width="80" height="18" rx="3" fill="#27272a"/>
            <text x="80" y="134" text-anchor="middle" fill="#71717a" font-size="9">Shoes #3 ($45)</text>

            <path d="M 130 107 L 160 107" stroke="#f87171" stroke-width="1.5"/>

            <rect x="170" y="75" width="75" height="64" rx="4" fill="#3f1212" stroke="#ef4444" stroke-width="1"/>
            <text x="207" y="95" text-anchor="middle" fill="#fca5a5" font-size="9" font-weight="700">Only 1 Summary</text>
            <text x="207" y="115" text-anchor="middle" fill="#ffffff" font-size="9">SUM = $245</text>

            <text x="140" y="190" text-anchor="middle" fill="#ef4444" font-size="10">⚠️ Individual items destroyed!</text>
          </g>

          <line x1="335" y1="20" x2="335" y2="210" stroke="#26262b" stroke-width="1" stroke-dasharray="4 4"/>

          <!-- PARTITION BY side -->
          <g transform="translate(350, 20)">
            <text x="150" y="20" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">PARTITION BY (KEEPS ROWS + ADDS RANK)</text>
            
            <rect x="15" y="40" width="280" height="130" rx="6" fill="#18181b" stroke="#0284c7" stroke-width="1"/>
            
            <!-- Table Header -->
            <text x="45" y="60" fill="#94a3b8" font-size="10" font-weight="600">Department</text>
            <text x="140" y="60" fill="#94a3b8" font-size="10" font-weight="600">Product</text>
            <text x="245" y="60" fill="#38bdf8" font-size="10" font-weight="700">ROW_NUMBER</text>

            <line x1="25" y1="68" x2="285" y2="68" stroke="#27272a" stroke-width="1"/>

            <!-- Row 1 -->
            <text x="45" y="86" fill="#e4e4e7" font-size="9">Shoes</text>
            <text x="140" y="86" fill="#e4e4e7" font-size="9">Nike Air ($120)</text>
            <rect x="235" y="74" width="40" height="16" rx="3" fill="#047857"/>
            <text x="255" y="86" text-anchor="middle" fill="#a7f3d0" font-size="9" font-weight="700">#1 🥇</text>

            <!-- Row 2 -->
            <text x="45" y="110" fill="#e4e4e7" font-size="9">Shoes</text>
            <text x="140" y="110" fill="#e4e4e7" font-size="9">Adidas ($80)</text>
            <rect x="235" y="98" width="40" height="16" rx="3" fill="#1d4ed8"/>
            <text x="255" y="110" text-anchor="middle" fill="#bfdbfe" font-size="9" font-weight="700">#2 🥈</text>

            <!-- Row 3 -->
            <text x="45" y="134" fill="#e4e4e7" font-size="9">Shoes</text>
            <text x="140" y="134" fill="#e4e4e7" font-size="9">Puma ($45)</text>
            <rect x="235" y="122" width="40" height="16" rx="3" fill="#374151"/>
            <text x="255" y="134" text-anchor="middle" fill="#d1d5db" font-size="9" font-weight="700">#3 🥉</text>

            <text x="150" y="190" text-anchor="middle" fill="#38bdf8" font-size="10">✨ Every row survives with an exact rank sticker!</text>
          </g>
        </svg>
      `;
    },

    // 2.2: The 3-Way Tie Race: ROW_NUMBER vs RANK vs DENSE_RANK
    rankComparison: function() {
      return `
        <svg viewBox="0 0 680 190" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="190" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#e4e4e7" font-size="13" font-weight="700">THE 3-WAY TIE RACE: WHICH FUNCTION FOR WHICH GOAL?</text>
            
            <!-- Context: Scores are 100, 100, 90 -->
            <rect x="20" y="45" width="160" height="110" rx="6" fill="#18181b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="100" y="68" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">ROW_NUMBER()</text>
            <text x="100" y="88" text-anchor="middle" fill="#e4e4e7" font-size="10">Alex (100) → <tspan fill="#38bdf8" font-weight="700">1</tspan></text>
            <text x="100" y="106" text-anchor="middle" fill="#e4e4e7" font-size="10">Bob (100) → <tspan fill="#38bdf8" font-weight="700">2</tspan></text>
            <text x="100" y="124" text-anchor="middle" fill="#e4e4e7" font-size="10">Chad (90) → <tspan fill="#38bdf8" font-weight="700">3</tspan></text>
            <text x="100" y="145" text-anchor="middle" fill="#94a3b8" font-size="9">Guarantees NO duplicates</text>

            <!-- RANK() -->
            <rect x="225" y="45" width="160" height="110" rx="6" fill="#18181b" stroke="#fbbf24" stroke-width="1.5"/>
            <text x="305" y="68" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">RANK()</text>
            <text x="305" y="88" text-anchor="middle" fill="#e4e4e7" font-size="10">Alex (100) → <tspan fill="#fbbf24" font-weight="700">1</tspan></text>
            <text x="305" y="106" text-anchor="middle" fill="#e4e4e7" font-size="10">Bob (100) → <tspan fill="#fbbf24" font-weight="700">1</tspan></text>
            <text x="305" y="124" text-anchor="middle" fill="#e4e4e7" font-size="10">Chad (90) → <tspan fill="#ef4444" font-weight="700">3 (Gap!)</tspan></text>
            <text x="305" y="145" text-anchor="middle" fill="#fbbf24" font-size="9">Skips 2 due to 2-way tie</text>

            <!-- DENSE_RANK() -->
            <rect x="430" y="45" width="160" height="110" rx="6" fill="#18181b" stroke="#34d399" stroke-width="1.5"/>
            <text x="510" y="68" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">DENSE_RANK()</text>
            <text x="510" y="88" text-anchor="middle" fill="#e4e4e7" font-size="10">Alex (100) → <tspan fill="#34d399" font-weight="700">1</tspan></text>
            <text x="510" y="106" text-anchor="middle" fill="#e4e4e7" font-size="10">Bob (100) → <tspan fill="#34d399" font-weight="700">1</tspan></text>
            <text x="510" y="124" text-anchor="middle" fill="#e4e4e7" font-size="10">Chad (90) → <tspan fill="#34d399" font-weight="700">2 (No Gap)</tspan></text>
            <text x="510" y="145" text-anchor="middle" fill="#34d399" font-size="9">Always continuous (Top 3)</text>
          </g>
        </svg>
      `;
    },

    // 3.1: The Timeline of WHERE vs HAVING
    timelineWhereHaving: function() {
      return `
        <svg viewBox="0 0 680 180" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="180" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <g transform="translate(25, 20)">
            <text x="315" y="18" text-anchor="middle" fill="#e4e4e7" font-size="12" font-weight="700" letter-spacing="0.05em">THE EXECUTION TIMELINE: WHERE vs. HAVING</text>

            <!-- Step 1: FROM -->
            <rect x="15" y="42" width="125" height="85" rx="5" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="77" y="62" text-anchor="middle" fill="#e4e4e7" font-size="11" font-weight="700">1. FROM</text>
            <text x="77" y="80" text-anchor="middle" fill="#a1a1aa" font-size="10">Raw Data</text>
            <text x="77" y="98" text-anchor="middle" fill="#71717a" font-size="9">10,000 Rows</text>
            <text x="77" y="112" text-anchor="middle" fill="#71717a" font-size="9">Transactions</text>

            <line x1="147" y1="84" x2="167" y2="84" stroke="#52525b" stroke-width="1.5"/>

            <!-- Step 2: WHERE -->
            <rect x="175" y="42" width="135" height="85" rx="5" fill="#0c2333" stroke="#0284c7" stroke-width="1.5"/>
            <text x="242" y="62" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">2. WHERE</text>
            <text x="242" y="80" text-anchor="middle" fill="#93c5fd" font-size="10">Filters Individual Rows</text>
            <text x="242" y="98" text-anchor="middle" fill="#7dd3fc" font-size="9" font-family="monospace">status = 'active'</text>
            <text x="242" y="112" text-anchor="middle" fill="#38bdf8" font-size="9">Leaves 4,000 Rows</text>

            <line x1="317" y1="84" x2="337" y2="84" stroke="#52525b" stroke-width="1.5"/>

            <!-- Step 3: GROUP BY -->
            <rect x="345" y="42" width="130" height="85" rx="5" fill="#1f152e" stroke="#8b5cf6" stroke-width="1.5"/>
            <text x="410" y="62" text-anchor="middle" fill="#c084fc" font-size="11" font-weight="700">3. GROUP BY</text>
            <text x="410" y="80" text-anchor="middle" fill="#e9d5ff" font-size="10">Piles by Merchant</text>
            <text x="410" y="98" text-anchor="middle" fill="#d8b4fe" font-size="9">500 Merchants</text>
            <text x="410" y="112" text-anchor="middle" fill="#c084fc" font-size="9">Calculates Counts</text>

            <line x1="482" y1="84" x2="502" y2="84" stroke="#52525b" stroke-width="1.5"/>

            <!-- Step 4: HAVING -->
            <rect x="510" y="42" width="125" height="85" rx="5" fill="#042718" stroke="#059669" stroke-width="1.5"/>
            <text x="572" y="62" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">4. HAVING</text>
            <text x="572" y="80" text-anchor="middle" fill="#a7f3d0" font-size="10">Filters Summary Piles</text>
            <text x="572" y="98" text-anchor="middle" fill="#6ee7b7" font-size="9" font-family="monospace">COUNT(*) &gt;= 5</text>
            <text x="572" y="112" text-anchor="middle" fill="#34d399" font-size="9" font-weight="700">Final 12 Outliers</text>

            <!-- Alert footer -->
            <text x="315" y="150" text-anchor="middle" fill="#f87171" font-size="10" font-weight="600">⚠️ TRAP: You cannot put COUNT(*) in step #2 (WHERE), because the groups do not exist yet!</text>
          </g>
        </svg>
      `;
    },

    // 4.1: LAG() Conveyor Belt Diagram
    lagConveyor: function() {
      return `
        <svg viewBox="0 0 680 230" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrowCyanLag" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8"/>
            </marker>
            <marker id="arrowAmberLag" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24"/>
            </marker>
          </defs>
          <rect x="0" y="0" width="680" height="230" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#e4e4e7" font-size="13" font-weight="700">LAG() CONVEYOR BELT: PEEK BACKWARDS WITHOUT SQUASHING ROWS</text>

            <!-- Month 1: Jan -->
            <rect x="20" y="65" width="160" height="90" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
            <text x="100" y="88" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="700">JANUARY 2026</text>
            <text x="100" y="110" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800">$100,000</text>
            <rect x="35" y="122" width="130" height="20" rx="4" fill="#27272a"/>
            <text x="100" y="136" text-anchor="middle" fill="#71717a" font-size="9" font-family="monospace">LAG() = NULL</text>

            <!-- Month 2: Feb -->
            <rect x="230" y="65" width="160" height="90" rx="6" fill="#082f49" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="310" y="88" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="700">FEBRUARY 2026</text>
            <text x="310" y="110" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800">$150,000</text>
            <rect x="245" y="122" width="130" height="20" rx="4" fill="#0369a1"/>
            <text x="310" y="136" text-anchor="middle" fill="#e0f2fe" font-size="9" font-weight="700">+ $50,000 (+50.0%)</text>

            <!-- Backward Arrow 1: Feb reaches back to Jan -->
            <path d="M 230 100 C 195 50, 185 50, 180 75" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrowCyanLag)"/>
            <text x="200" y="42" text-anchor="middle" fill="#38bdf8" font-size="9" font-weight="700">LAG(sales, 1)</text>

            <!-- Month 3: Mar -->
            <rect x="440" y="65" width="160" height="90" rx="6" fill="#381e04" stroke="#fbbf24" stroke-width="1.5"/>
            <text x="520" y="88" text-anchor="middle" fill="#fde68a" font-size="11" font-weight="700">MARCH 2026</text>
            <text x="520" y="110" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800">$120,000</text>
            <rect x="455" y="122" width="130" height="20" rx="4" fill="#b45309"/>
            <text x="520" y="136" text-anchor="middle" fill="#fef3c7" font-size="9" font-weight="700">- $30,000 (-20.0%)</text>

            <!-- Backward Arrow 2: Mar reaches back to Feb -->
            <path d="M 440 100 C 405 50, 395 50, 390 75" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrowAmberLag)"/>
            <text x="410" y="42" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="700">LAG(sales, 1)</text>

            <!-- Footnote -->
            <text x="310" y="188" text-anchor="middle" fill="#94a3b8" font-size="10">✨ Zero self-joins required. Every monthly row survives side-by-side with its historical baseline.</text>
          </g>
        </svg>
      `;
    },

    // 4.2: Division By Zero Safety (NULLIF)
    divisionByZeroSafety: function() {
      return `
        <svg viewBox="0 0 680 190" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="190" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#e4e4e7" font-size="13" font-weight="700">PRODUCTION TRAP: WHY NAIVE GROWTH PERCENTAGES CRASH</text>

            <!-- Dangerous formula -->
            <rect x="20" y="45" width="260" height="100" rx="6" fill="#2d1215" stroke="#ef4444" stroke-width="1.5"/>
            <text x="150" y="68" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="700">❌ NAIVE CALCULATION</text>
            <text x="150" y="90" text-anchor="middle" fill="#f87171" font-size="11" font-family="monospace">(sales - prev) / prev</text>
            <rect x="35" y="105" width="230" height="26" rx="4" fill="#450a0a"/>
            <text x="150" y="122" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700">💥 If prev = 0: "Division by zero" crash!</text>

            <!-- Divider -->
            <line x1="310" y1="45" x2="310" y2="145" stroke="#27272a" stroke-width="1" stroke-dasharray="3 3"/>

            <!-- Bulletproof formula -->
            <rect x="340" y="45" width="260" height="100" rx="6" fill="#042f1f" stroke="#10b981" stroke-width="1.5"/>
            <text x="470" y="68" text-anchor="middle" fill="#a7f3d0" font-size="11" font-weight="700">✅ PRODUCTION SAFEGUARD</text>
            <text x="470" y="90" text-anchor="middle" fill="#34d399" font-size="10" font-family="monospace">(sales - prev) / NULLIF(prev, 0)</text>
            <rect x="355" y="105" width="230" height="26" rx="4" fill="#064e3b"/>
            <text x="470" y="122" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="700">🛡️ If prev = 0: returns clean NULL</text>

            <text x="310" y="170" text-anchor="middle" fill="#a1a1aa" font-size="10">NULLIF(val, 0) turns zeros into NULLs, preventing SQL engine exceptions on brand new launches.</text>
          </g>
        </svg>
      `;
    },

    // 5.1: Cumulative Windows & Running Totals (Snowball)
    runningTotalSnowball: function() {
      return `
        <svg viewBox="0 0 680 230" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="230" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#e4e4e7" font-size="13" font-weight="700">THE SNOWBALL EFFECT: CUMULATIVE RUNNING TOTALS</text>

            <!-- Day 1 -->
            <rect x="20" y="55" width="165" height="105" rx="6" fill="#18181b" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="102" y="78" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">DAY 1: ORDER #101</text>
            <text x="102" y="98" text-anchor="middle" fill="#94a3b8" font-size="10">Daily Amount: $100</text>
            <rect x="35" y="112" width="135" height="32" rx="4" fill="#0c4a6e"/>
            <text x="102" y="127" text-anchor="middle" fill="#e0f2fe" font-size="9">CUMULATIVE YTD</text>
            <text x="102" y="139" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="800">$100</text>

            <!-- Arrow 1 to 2 -->
            <path d="M 190 108 L 220 108" stroke="#38bdf8" stroke-width="2"/>

            <!-- Day 2 -->
            <rect x="225" y="55" width="170" height="105" rx="6" fill="#18181b" stroke="#818cf8" stroke-width="1.5"/>
            <text x="310" y="78" text-anchor="middle" fill="#818cf8" font-size="11" font-weight="700">DAY 2: ORDER #102</text>
            <text x="310" y="98" text-anchor="middle" fill="#94a3b8" font-size="10">Daily Amount: $200</text>
            <rect x="240" y="112" width="140" height="32" rx="4" fill="#312e81"/>
            <text x="310" y="127" text-anchor="middle" fill="#e0e7ff" font-size="9">$100 + $200</text>
            <text x="310" y="139" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="800">$300</text>

            <!-- Arrow 2 to 3 -->
            <path d="M 400 108 L 430 108" stroke="#818cf8" stroke-width="2"/>

            <!-- Day 3 -->
            <rect x="435" y="55" width="165" height="105" rx="6" fill="#18181b" stroke="#34d399" stroke-width="1.5"/>
            <text x="517" y="78" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">DAY 3: ORDER #103</text>
            <text x="517" y="98" text-anchor="middle" fill="#94a3b8" font-size="10">Daily Amount: $150</text>
            <rect x="450" y="112" width="135" height="32" rx="4" fill="#064e3b"/>
            <text x="517" y="127" text-anchor="middle" fill="#d1fae5" font-size="9">$300 + $150</text>
            <text x="517" y="139" text-anchor="middle" fill="#34d399" font-size="11" font-weight="800">$450</text>

            <!-- Bottom Frame Bar -->
            <rect x="20" y="172" width="580" height="24" rx="4" fill="#27272a"/>
            <text x="310" y="188" text-anchor="middle" fill="#e4e4e7" font-size="10" font-family="monospace">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</text>
          </g>
        </svg>
      `;
    },

    // 5.2: 7-Day Rolling Moving Window Frame
    rollingWindowSliding: function() {
      return `
        <svg viewBox="0 0 680 210" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="210" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#e4e4e7" font-size="13" font-weight="700">7-DAY SLIDING WINDOW: FILTERING OUT WEEKEND NOISE</text>

            <!-- Daily bars -->
            <!-- D1 --> <rect x="30" y="110" width="28" height="40" rx="3" fill="#3f3f46"/>
            <!-- D2 --> <rect x="75" y="115" width="28" height="35" rx="3" fill="#3f3f46"/>
            <!-- D3 --> <rect x="120" y="105" width="28" height="45" rx="3" fill="#3f3f46"/>
            <!-- D4 --> <rect x="165" y="100" width="28" height="50" rx="3" fill="#3f3f46"/>
            <!-- D5 --> <rect x="210" y="90" width="28" height="60" rx="3" fill="#3f3f46"/>
            <!-- D6 (Sat) --> <rect x="255" y="60" width="28" height="90" rx="3" fill="#ef4444"/>
            <!-- D7 (Sun) --> <rect x="300" y="65" width="28" height="85" rx="3" fill="#ef4444"/>
            
            <!-- Sliding Frame Bracket around D1..D7 -->
            <rect x="22" y="45" width="315" height="115" rx="6" fill="#10b981" fill-opacity="0.1" stroke="#34d399" stroke-width="2" stroke-dasharray="4 4"/>
            <text x="180" y="40" text-anchor="middle" fill="#34d399" font-size="10" font-weight="700">SLIDING WINDOW: 6 PRECEDING .. CURRENT ROW</text>

            <!-- Rolling Average Trendline Dot -->
            <circle cx="314" cy="95" r="5" fill="#34d399"/>
            <rect x="360" y="70" width="230" height="55" rx="6" fill="#18181b" stroke="#34d399" stroke-width="1.5"/>
            <text x="475" y="92" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">7-DAY ROLLING AVERAGE: $59.2</text>
            <text x="475" y="110" text-anchor="middle" fill="#94a3b8" font-size="9">Smooths Saturday surge into true trend</text>

            <!-- Day 8, 9, 10 future bars -->
            <rect x="345" y="115" width="28" height="35" rx="3" fill="#27272a"/>
            <rect x="390" y="110" width="28" height="40" rx="3" fill="#27272a"/>

            <text x="310" y="180" text-anchor="middle" fill="#a1a1aa" font-size="10">AVG(val) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</text>
          </g>
        </svg>
      `;
    },

    // 6.1: Conditional Aggregation (CASE inside SUM)
    conditionalAggregationMatrix: function() {
      return `
        <svg viewBox="0 0 680 200" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="200" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <g transform="translate(25, 20)">
            <text x="315" y="20" text-anchor="middle" fill="#e4e4e7" font-size="13" font-weight="700">CONDITIONAL AGGREGATION: SINGLE-PASS ROW PIVOT</text>

            <!-- Left: Vertical Event Stream -->
            <rect x="20" y="45" width="180" height="105" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
            <text x="110" y="65" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="700">RAW VERTICAL LOGS</text>
            <rect x="30" y="74" width="160" height="18" rx="3" fill="#27272a"/>
            <text x="110" y="86" text-anchor="middle" fill="#e4e4e7" font-size="9">User #882 | 'view_item'</text>
            <rect x="30" y="96" width="160" height="18" rx="3" fill="#27272a"/>
            <text x="110" y="108" text-anchor="middle" fill="#38bdf8" font-size="9">User #882 | 'add_to_cart'</text>
            <rect x="30" y="118" width="160" height="18" rx="3" fill="#27272a"/>
            <text x="110" y="130" text-anchor="middle" fill="#34d399" font-size="9">User #882 | 'checkout'</text>

            <!-- Center Transformation Arrow -->
            <g transform="translate(215, 80)">
              <path d="M 0 15 L 50 15" stroke="#c084fc" stroke-width="2"/>
              <text x="25" y="5" text-anchor="middle" fill="#c084fc" font-size="9" font-family="monospace">SUM(CASE...)</text>
            </g>

            <!-- Right: Pivoted Horizontal Summary -->
            <rect x="280" y="45" width="330" height="105" rx="6" fill="#1e1330" stroke="#a855f7" stroke-width="1.5"/>
            <text x="445" y="65" text-anchor="middle" fill="#d8b4fe" font-size="10" font-weight="700">ONE CLEAN EXECUTIVE SUMMARY ROW</text>
            
            <rect x="295" y="80" width="70" height="45" rx="4" fill="#2e1065"/>
            <text x="330" y="97" text-anchor="middle" fill="#e9d5ff" font-size="9">user_id</text>
            <text x="330" y="114" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">#882</text>

            <rect x="375" y="80" width="70" height="45" rx="4" fill="#0c4a6e"/>
            <text x="410" y="97" text-anchor="middle" fill="#bae6fd" font-size="9">views</text>
            <text x="410" y="114" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">1</text>

            <rect x="455" y="80" width="70" height="45" rx="4" fill="#064e3b"/>
            <text x="490" y="97" text-anchor="middle" fill="#a7f3d0" font-size="9">carts</text>
            <text x="490" y="114" text-anchor="middle" fill="#34d399" font-size="11" font-weight="700">1</text>

            <rect x="535" y="80" width="65" height="45" rx="4" fill="#701a75"/>
            <text x="567" y="97" text-anchor="middle" fill="#f5d0fe" font-size="9">buys</text>
            <text x="567" y="114" text-anchor="middle" fill="#f472b6" font-size="11" font-weight="700">1</text>

            <text x="315" y="172" text-anchor="middle" fill="#a1a1aa" font-size="10">Pivots millions of events in 1 database scan without multiple expensive subqueries.</text>
          </g>
        </svg>
      `;
    },

    // 6.2: Multi-Stage Conversion Funnel Sieve
    funnelConversion: function() {
      return `
        <svg viewBox="0 0 680 230" class="koma-pattern-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="680" height="230" rx="8" fill="#131316" stroke="#26262b" stroke-width="1"/>

          <g transform="translate(30, 20)">
            <text x="310" y="20" text-anchor="middle" fill="#e4e4e7" font-size="13" font-weight="700">THE CONVERSION FUNNEL: PINPOINTING PIPELINE LEAKS</text>

            <!-- Stage 1 -->
            <rect x="40" y="42" width="400" height="26" rx="4" fill="#0284c7"/>
            <text x="55" y="59" fill="#ffffff" font-size="11" font-weight="700">1. Landing Page Visitors</text>
            <text x="380" y="59" text-anchor="end" fill="#e0f2fe" font-size="11" font-weight="800">10,000 (100%)</text>

            <!-- Drop 1 -->
            <rect x="460" y="42" width="130" height="26" rx="4" fill="#27272a"/>
            <text x="525" y="59" text-anchor="middle" fill="#94a3b8" font-size="10">Baseline</text>

            <!-- Stage 2 -->
            <rect x="70" y="74" width="340" height="26" rx="4" fill="#059669"/>
            <text x="85" y="91" fill="#ffffff" font-size="11" font-weight="700">2. Added Item to Cart</text>
            <text x="380" y="91" text-anchor="end" fill="#d1fae5" font-size="11" font-weight="800">3,200 (32.0%)</text>

            <!-- Drop 2 -->
            <rect x="460" y="74" width="130" height="26" rx="4" fill="#3f1212"/>
            <text x="525" y="91" text-anchor="middle" fill="#f87171" font-size="10" font-weight="700">-68.0% Drop</text>

            <!-- Stage 3 -->
            <rect x="100" y="106" width="280" height="26" rx="4" fill="#7c3aed"/>
            <text x="115" y="123" fill="#ffffff" font-size="11" font-weight="700">3. Began Checkout</text>
            <text x="360" y="123" text-anchor="end" fill="#ede9fe" font-size="11" font-weight="800">1,400 (14.0%)</text>

            <!-- Drop 3 -->
            <rect x="460" y="106" width="130" height="26" rx="4" fill="#451a03"/>
            <text x="525" y="123" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="700">-56.2% Drop</text>

            <!-- Stage 4 -->
            <rect x="130" y="138" width="220" height="26" rx="4" fill="#db2777"/>
            <text x="145" y="155" fill="#ffffff" font-size="11" font-weight="700">4. Order Completed</text>
            <text x="330" y="155" text-anchor="end" fill="#fce7f3" font-size="11" font-weight="800">420 (4.2%)</text>

            <!-- Drop 4 -->
            <rect x="460" y="138" width="130" height="26" rx="4" fill="#4c0519"/>
            <text x="525" y="155" text-anchor="middle" fill="#fb7185" font-size="10" font-weight="700">-70.0% Drop 🔥</text>

            <text x="310" y="188" text-anchor="middle" fill="#f43f5e" font-size="10" font-weight="700">🚨 CHOKEPOINT DETECTED: Stage 3 to 4 loses 70% of high-intent buyers during payment entry.</text>
          </g>
        </svg>
      `;
    }
  };

  // ===========================================================================
  // THE 6 CORE SQL 80/20 PATTERNS
  // ===========================================================================

  const PATTERNS = [
    // -------------------------------------------------------------------------
    // PATTERN 1: The Missing Match (Anti-Join)
    // -------------------------------------------------------------------------
    {
      id: 'anti_join',
      tier: 1,
      title: '01. The Missing Match (Anti-Join)',
      tag: 'CHURN & DORMANT USERS',
      tagline: 'Identify customers, accounts, or items that have zero recorded activity',
      businessProblem: `At every tech company, leaders constantly ask: "Who signed up but never made a purchase?", "Which rides got canceled?", or "Which products have zero sales?" This is the single most common question in analytics because finding inactive users allows marketing to send targeted re-engagement emails.`,
      mentalModel: `Imagine Table A is a list of 100 registered users. Table B is a stack of 80 shopping receipts. When you connect them using a LEFT JOIN, the 80 users who bought items get paired with their receipt. The 20 users who never bought anything have a blank hole on the right: receipt_id IS NULL. All SQL does is filter for those exact holes!`,
      steppingStones: [
        {
          num: '1.1',
          title: 'The Stepping Stone: INNER JOIN vs. LEFT JOIN',
          summary: 'Why standard INNER JOIN erases inactive users, and how LEFT JOIN keeps them alive with NULL placeholders.',
          svg: 'joinComparison'
        },
        {
          num: '1.2',
          title: 'The Stepping Stone: Hunting the NULL Holes',
          summary: 'How adding WHERE right_table.primary_key IS NULL transforms a join into a surgical churn detector.',
          svg: 'antiJoinFilter'
        },
        {
          num: '1.3',
          title: 'The Stepping Stone: LEFT JOIN vs. NOT EXISTS vs. NOT IN',
          summary: 'Why NOT IN (subquery) breaks on NULL values and ruins interviews, while LEFT JOIN IS NULL is fast and immune to NULL traps.',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Identify the Master List: Which table has EVERY entity? (Users, Products, Drivers). Put this table immediately after FROM.',
        '2. Identify the Event Stream: Which table logs transactions or actions? (Orders, Rides, StreamEvents). Attach it via LEFT JOIN.',
        '3. Establish Primary Keys: Join on the shared key (e.g. ON u.user_id = o.user_id).',
        '4. Hunt for Holes: Add WHERE o.order_id IS NULL. If an entity never took action, its right-side columns are guaranteed NULL.'
      ],
      gotchas: [
        '1. Checking the wrong table: Writing WHERE u.user_id IS NULL instead of WHERE o.order_id IS NULL will return 0 rows!',
        '2. The NOT IN Trap: If subquery returns even a single NULL value, NOT IN evaluates to UNKNOWN and drops all results. Anti-Join is immune to this.',
        '3. Accidental INNER JOIN: Putting a condition like AND o.order_date > "2026-01-01" in the WHERE clause silently turns your LEFT JOIN back into an INNER JOIN!'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Prime',
          question: 'Find Prime members who joined on Day 1 but placed 0 orders in their first 30 days.',
          sql: `-- Amazon: Prime members with 0 orders in first 30 days
SELECT DISTINCT 
  o1.customer_id, 
  o1.purchase_date, 
  o1.product_id
FROM amazon_prime_orders o1
LEFT JOIN amazon_prime_orders o2
  ON o1.customer_id = o2.customer_id
  AND o2.purchase_date > o1.purchase_date
  AND o2.purchase_date <= DATE(o1.purchase_date, '+30 days')
WHERE o2.order_id IS NULL;`
        },
        netflix: {
          name: 'Netflix Streaming',
          question: 'Find subscribers who signed up for Premium but watched 0 hours of video this month.',
          sql: `-- Netflix: Identify dormant subscribers for re-activation email campaign
SELECT 
  s.customer_id,
  s.purchase_date AS signup_date
FROM amazon_prime_orders s
LEFT JOIN playback_telemetry_events p
  ON s.customer_id = p.event_id
WHERE p.event_id IS NULL;`
        },
        uber: {
          name: 'Uber Mobility',
          question: 'Find geographic areas where riders opened the app but 0 drivers were available.',
          sql: `-- Uber: Unfulfilled ride demand areas (0 active drivers)
SELECT 
  r.h3_index AS area_id,
  r.request_id,
  r.requested_at
FROM uber_ride_requests r
LEFT JOIN uber_driver_telemetry d
  ON r.h3_index = d.h3_index
WHERE d.h3_index IS NULL;`
        },
        stripe: {
          name: 'Stripe Payments',
          question: 'Find merchant accounts created this quarter that have processed 0 successful payments.',
          sql: `-- Stripe: Onboarded merchants with zero processed transactions
SELECT 
  c.card_number_masked,
  c.ip_location
FROM card_authorization_events c
LEFT JOIN card_authorization_events settled
  ON c.card_number_masked = settled.card_number_masked
  AND settled.amount_usd > 10.0
WHERE settled.auth_id IS NULL;`
        }
      }
    },

    // -------------------------------------------------------------------------
    // PATTERN 2: Top N Per Group (Category Leaders)
    // -------------------------------------------------------------------------
    {
      id: 'top_n_ranking',
      tier: 1,
      title: '02. Top N Per Group (Category Leaders)',
      tag: 'LEADERBOARDS & RANKINGS',
      tagline: 'Rank items within each category and slice out only the top 1, 2, or 3 winners',
      businessProblem: `Businesses love leaderboards: "What are the top 3 best-selling products in each department?", "Who is the highest-spending customer per country?", or "Top 5 most-watched TV shows per region."`,
      mentalModel: `Think of organizing a school sports day. Instead of one single race with 1,000 students, you divide students into classes (PARTITION BY). Within each class, students race and you stamp gold, silver, and bronze ribbons (#1, #2, #3). Finally, you take only the ribbon winners.`,
      steppingStones: [
        {
          num: '2.1',
          title: 'The Stepping Stone: GROUP BY vs. PARTITION BY',
          summary: 'Why GROUP BY collapses your raw rows, while PARTITION BY preserves every row and stamps a calculated rank tag.',
          svg: 'partitionVsGroupBy'
        },
        {
          num: '2.2',
          title: 'The Stepping Stone: ROW_NUMBER vs. RANK vs. DENSE_RANK',
          summary: 'How ties are resolved in Olympic medals vs. e-commerce catalogs, and when to pick which window function.',
          svg: 'rankComparison'
        },
        {
          num: '2.3',
          title: 'The Stepping Stone: The Subquery / CTE Wrap Trap',
          summary: 'Why you cannot write WHERE ROW_NUMBER() <= 3 directly in the main query and how a CTE solves it cleanly.',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Define the buckets: Which column divides your data into separate groups? (e.g. department, genre, country) → PARTITION BY department.',
        '2. Define the metric of success: What constitutes "winning"? (Revenue, streams, rating) → ORDER BY revenue DESC.',
        '3. Stamp the rank sticker: Use ROW_NUMBER() OVER (PARTITION BY group ORDER BY score DESC) AS rnk inside a CTE.',
        '4. Filter the podium: In the outer query, simply filter WHERE rnk <= 3.'
      ],
      gotchas: [
        '1. WHERE clause rejection: Writing WHERE ROW_NUMBER() <= 3 directly will fail with "Window functions not allowed in WHERE". Window functions execute AFTER WHERE!',
        '2. Tie handling: If two products have the exact same revenue of $500, ROW_NUMBER() randomly picks one for #1 and one for #2. If you want both to share #1, use DENSE_RANK().',
        '3. Missing ORDER BY: Forgetting ORDER BY inside the OVER() clause results in random unranked order.'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Retail',
          question: 'Find the latest order placed by each customer in the marketplace.',
          sql: `-- Amazon: Most recent purchase per customer using ROW_NUMBER()
WITH ranked_orders AS (
  SELECT 
    customer_id,
    purchase_date,
    product_id,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id 
      ORDER BY purchase_date DESC
    ) AS purchase_rank
  FROM amazon_prime_orders
)
SELECT customer_id, purchase_date, product_id
FROM ranked_orders
WHERE purchase_rank = 1;`
        },
        netflix: {
          name: 'Netflix Content',
          question: 'Find the top 2 highest bandwidth streaming events per ISP.',
          sql: `-- Netflix: Top telemetry events per ISP network
WITH ranked_telemetry AS (
  SELECT 
    isp_asn,
    event_id,
    ttff_ms,
    DENSE_RANK() OVER (
      PARTITION BY isp_asn 
      ORDER BY ttff_ms ASC
    ) AS latency_rank
  FROM playback_telemetry_events
)
SELECT isp_asn, event_id, ttff_ms, latency_rank
FROM ranked_telemetry
WHERE latency_rank <= 2;`
        },
        uber: {
          name: 'Uber Dispatch',
          question: 'Find the most recent ride requested in each geographic area.',
          sql: `-- Uber: Latest requested trip per H3 geographic cell
WITH recent_requests AS (
  SELECT 
    h3_index AS area_id,
    request_id,
    requested_at,
    ROW_NUMBER() OVER (
      PARTITION BY h3_index 
      ORDER BY requested_at DESC
    ) AS rnk
  FROM uber_ride_requests
)
SELECT area_id, request_id, requested_at
FROM recent_requests
WHERE rnk = 1;`
        },
        stripe: {
          name: 'Stripe Risk',
          question: 'Find the largest dollar transaction attempted by each payment card.',
          sql: `-- Stripe: Peak authorization dollar attempt per card
WITH ranked_auths AS (
  SELECT 
    card_number_masked,
    amount_usd,
    charge_time,
    ROW_NUMBER() OVER (
      PARTITION BY card_number_masked 
      ORDER BY amount_usd DESC
    ) AS spend_rank
  FROM card_authorization_events
)
SELECT card_number_masked, amount_usd, charge_time
FROM ranked_auths
WHERE spend_rank = 1;`
        }
      }
    },

    // -------------------------------------------------------------------------
    // PATTERN 3: Outliers & Thresholds (GROUP BY + HAVING)
    // -------------------------------------------------------------------------
    {
      id: 'outliers_having',
      tier: 1,
      title: '03. Outliers & Thresholds (GROUP BY + HAVING)',
      tag: 'FRAUD & ANOMALY DETECTION',
      tagline: 'Aggregate millions of events and isolate only the suspicious groups that cross a critical benchmark',
      businessProblem: `Fraud and security teams need to detect anomalies in real time: "Which merchant has more than 10 chargebacks this week?", "Which user had > 5 failed passwords?", or "Which ISPs have an average buffer time over 2 seconds?"`,
      mentalModel: `Imagine sorting letters into mailboxes for 500 different recipients (GROUP BY). Then you place each mailbox on a weight scale. Instead of reading every letter, you only inspect the mailboxes that weigh more than 10 pounds (HAVING).`,
      steppingStones: [
        {
          num: '3.1',
          title: 'The Stepping Stone: The Timeline of WHERE vs. HAVING',
          summary: 'WHERE filters individual raw rows BEFORE aggregation; HAVING filters group summaries AFTER aggregation.',
          svg: 'timelineWhereHaving'
        },
        {
          num: '3.2',
          title: 'The Stepping Stone: Combining WHERE and HAVING in One Query',
          summary: 'Filter raw noise with WHERE (e.g. status = "failed") to keep group sizes lean, then benchmark with HAVING (COUNT >= 5).',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Pre-filter individual rows: Use WHERE to drop irrelevant raw records before grouping (e.g. WHERE amount < 1.00).',
        '2. Bundle into buckets: Choose your grouping dimension with GROUP BY (e.g. GROUP BY card_number_masked).',
        '3. Calculate summary metrics: Choose aggregate functions like COUNT(*), SUM(amount), AVG(latency).',
        '4. Enforce group threshold: Add HAVING COUNT(*) >= 5 to filter out ordinary normal groups.'
      ],
      gotchas: [
        '1. The WHERE COUNT(*) mistake: Writing WHERE COUNT(*) > 5 triggers a syntax error because WHERE executes before rows are grouped!',
        '2. Filtering non-aggregate columns in HAVING: Putting HAVING status = "active" works in some dialects but wastes performance; move non-aggregates to WHERE!',
        '3. Integer division in AVG: In SQL engines, AVG(5 / 2) might round down to 2 unless cast to float.'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Prime',
          question: 'Find repeat buyers who placed 2 or more orders across the month.',
          sql: `-- Amazon: Loyal repeat buyers with 2+ purchases
SELECT 
  customer_id,
  COUNT(*) AS total_purchases
FROM amazon_prime_orders
GROUP BY customer_id
HAVING COUNT(*) >= 2
ORDER BY total_purchases DESC;`
        },
        netflix: {
          name: 'Netflix Telemetry',
          question: 'Find ISPs with more than 1 high-latency event where TTFF exceeded 500ms.',
          sql: `-- Netflix: Problem ISPs with excessive rebuffering events
SELECT 
  isp_asn,
  COUNT(*) AS slow_stream_count,
  ROUND(AVG(ttff_ms), 1) AS avg_ttff_latency
FROM playback_telemetry_events
WHERE ttff_ms > 500
GROUP BY isp_asn
HAVING COUNT(*) >= 1
ORDER BY avg_ttff_latency DESC;`
        },
        uber: {
          name: 'Uber Operations',
          question: 'Find geographic areas with 2 or more ride requests generated.',
          sql: `-- Uber: High demand ride request clusters
SELECT 
  h3_index AS area_id,
  COUNT(*) AS ride_count
FROM uber_ride_requests
GROUP BY h3_index
HAVING COUNT(*) >= 2
ORDER BY ride_count DESC;`
        },
        stripe: {
          name: 'Stripe Risk & Fraud',
          question: 'Detect credit cards attempting 5 or more rapid micro-charges under $1.00.',
          sql: `-- Stripe: Fraud risk accounts with rapid card testing attacks
SELECT 
  card_number_masked,
  ip_location,
  COUNT(*) AS attempt_count,
  ROUND(SUM(amount_usd), 2) AS total_tested_amount
FROM card_authorization_events
WHERE amount_usd < 1.00
GROUP BY card_number_masked, ip_location
HAVING COUNT(*) >= 5;`
        }
      }
    },

    // -------------------------------------------------------------------------
    // PATTERN 4: Period-over-Period Deltas (LAG / LEAD)
    // -------------------------------------------------------------------------
    {
      id: 'period_deltas',
      tier: 2,
      title: '04. Period-over-Period Deltas (LAG)',
      tag: 'GROWTH & MOM',
      tagline: 'Calculate month-over-month growth, pace metrics, and detect sudden metric swings',
      businessProblem: `Every executive asks: "Are sales growing or shrinking month-over-month?", "How does this week compare to last week?", "What was the time between a customer's first and second purchase?" Instead of comparing records by hand, companies use time-series window functions.`,
      mentalModel: `Picture a row of runners on a track. Each runner looks over their shoulder at the runner directly behind them (LAG) to see how many yards ahead or behind they are. Nobody gets crushed into a summary; every single runner keeps their place on the track.`,
      steppingStones: [
        {
          num: '4.1',
          title: 'The Stepping Stone: The LAG() Conveyor Belt',
          summary: 'Why self-joins on date - 1 are slow and brittle, and how LAG() looks back with zero performance overhead.',
          svg: 'lagConveyor'
        },
        {
          num: '4.2',
          title: 'The Stepping Stone: Safe Growth Percentage without Crashing',
          summary: 'Using NULLIF(prev_metric, 0) so queries never crash when a startup or product launched with zero sales.',
          svg: 'divisionByZeroSafety'
        },
        {
          num: '4.3',
          title: 'The Stepping Stone: Default Offsets & Lookaheads (LEAD)',
          summary: 'How LAG(col, 1, 0) handles the first period gracefully, and when LEAD() is used for churn forecasting.',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Establish chronological order: Wrap the metric with ORDER BY date ASC so SQL knows what "yesterday" or "last month" means.',
        '2. Grab the predecessor: Call LAG(metric, 1, 0) OVER (PARTITION BY entity ORDER BY date).',
        '3. Compute difference: current - previous for absolute change, or (current - prev) * 100.0 / NULLIF(prev, 0) for percentage.',
        '4. Handle first row: Remember the very first period has no previous data, so it produces NULL (or your chosen default).'
      ],
      gotchas: [
        '1. Missing dates: If an e-commerce store had 0 sales in February, LAG() on March will look back to January! (Always ensure continuous dates via a calendar table or CTE).',
        '2. Division by zero: Naive (curr - prev) / prev crashes SQL engines with "division by zero" if prev is 0. Always wrap with NULLIF(prev, 0).',
        '3. Forgetting PARTITION BY: If calculating MoM growth for 10 different products, forgetting PARTITION BY product_id will compare Product B\'s January sales to Product A\'s December sales!'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Retail',
          question: 'Track order velocity per customer across time to spot accelerating buyers.',
          sql: `-- Amazon: Track purchase intervals and order progression per customer
SELECT 
  customer_id,
  order_id,
  purchase_date,
  LAG(purchase_date, 1) OVER (
    PARTITION BY customer_id 
    ORDER BY purchase_date
  ) AS prev_purchase_date
FROM amazon_prime_orders
ORDER BY customer_id, purchase_date;`
        },
        netflix: {
          name: 'Netflix Telemetry',
          question: 'Compare TTFF latency against previous telemetry event to detect network degradation.',
          sql: `-- Netflix: Compare TTFF latency against prior event per ISP
SELECT 
  isp_asn,
  event_id,
  ttff_ms,
  LAG(ttff_ms, 1) OVER (
    PARTITION BY isp_asn 
    ORDER BY ttff_ms
  ) AS prev_ttff_ms,
  ROUND(ttff_ms - LAG(ttff_ms, 1) OVER (
    PARTITION BY isp_asn 
    ORDER BY ttff_ms
  ), 1) AS latency_delta_ms
FROM playback_telemetry_events
ORDER BY isp_asn, ttff_ms;`
        },
        uber: {
          name: 'Uber Operations',
          question: 'Track time interval between consecutive ride requests in each geographic zone.',
          sql: `-- Uber: Time gap between consecutive ride requests
SELECT 
  request_id,
  h3_index AS area_id,
  requested_at,
  LAG(requested_at, 1) OVER (
    PARTITION BY h3_index 
    ORDER BY requested_at
  ) AS prev_request_time
FROM uber_ride_requests
ORDER BY area_id, requested_at;`
        },
        stripe: {
          name: 'Stripe Risk',
          question: 'Calculate elapsed time between rapid charge attempts on the same card.',
          sql: `-- Stripe: Velocity check - elapsed time between charge attempts
SELECT 
  auth_id,
  card_number_masked,
  amount_usd,
  charge_time,
  LAG(charge_time, 1) OVER (
    PARTITION BY card_number_masked 
    ORDER BY charge_time
  ) AS prev_charge_time
FROM card_authorization_events
ORDER BY card_number_masked, charge_time;`
        }
      }
    },

    // -------------------------------------------------------------------------
    // PATTERN 5: Cumulative Windows & Rolling Averages
    // -------------------------------------------------------------------------
    {
      id: 'running_totals',
      tier: 2,
      title: '05. Cumulative Windows & Rolling Averages',
      tag: 'RUNNING TOTALS',
      tagline: 'Calculate Year-to-Date (YTD) running totals and 7-day smoothed trendlines',
      businessProblem: `Finance teams need to know: "What is our cumulative revenue pacing toward the $10M annual goal?", "What is our 7-day rolling average active users to eliminate Saturday/Sunday noise?", "At what point in the quarter did we break even?"`,
      mentalModel: `Picture a snowball rolling down a snow-covered hill. As it rolls from Jan 1 down toward Dec 31, every day adds another layer of snow to the ball. The ball keeps growing continuously until New Year's Day, where a PARTITION BY year melts it back down to start fresh.`,
      steppingStones: [
        {
          num: '5.1',
          title: 'The Stepping Stone: Cumulative Windows (The Snowball)',
          summary: 'How SUM(amount) OVER (ORDER BY date) keeps an ongoing running tally without collapsing rows.',
          svg: 'runningTotalSnowball'
        },
        {
          num: '5.2',
          title: 'The Stepping Stone: The 7-Day Rolling Moving Window',
          summary: 'Using ROWS BETWEEN 6 PRECEDING AND CURRENT ROW to smooth out volatile weekday vs weekend swings.',
          svg: 'rollingWindowSliding'
        },
        {
          num: '5.3',
          title: 'The Stepping Stone: ROWS vs. RANGE Nuance',
          summary: 'Why physical row counts (ROWS) are safer and more predictable than logical value boundaries (RANGE) when timestamps contain duplicates.',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Establish chronological order: ORDER BY date ASC so the accumulation rolls forward.',
        '2. Define partitions: Add PARTITION BY customer_id or PARTITION BY year if running totals should reset per entity.',
        '3. Specify the window frame: Use ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW for running totals, or ROWS BETWEEN N PRECEDING AND CURRENT ROW for rolling averages.',
        '4. Verify duplicate timestamps: If multiple rows share the same date, include a secondary ordering key (ORDER BY date, transaction_id).'
      ],
      gotchas: [
        '1. Duplicate timestamp grouping: In default SQL RANGE mode, rows with identical timestamps get lumped together, jumping the sum abruptly instead of stepping through.',
        '2. Window frame boundaries: Forgetting ROWS BETWEEN in an AVG() function can calculate the average over all preceding rows rather than just the last 7 days!',
        '3. Performance on big data: Running cumulative sums across 500 million rows requires massive memory; in production warehouses, partition by day or month.'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Retail',
          question: 'Track cumulative orders placed across the month to monitor fulfillment pacing.',
          sql: `-- Amazon: Cumulative order volume running total
SELECT 
  purchase_date,
  product_id,
  customer_id,
  COUNT(*) OVER (
    ORDER BY purchase_date, order_id 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_orders_placed
FROM amazon_prime_orders
ORDER BY purchase_date, order_id;`
        },
        netflix: {
          name: 'Netflix Telemetry',
          question: 'Compute 2-event rolling average load time per ISP to smooth network jitter.',
          sql: `-- Netflix: 2-event moving average TTFF per ISP
SELECT 
  event_id,
  isp_asn,
  ttff_ms,
  ROUND(AVG(ttff_ms) OVER (
    PARTITION BY isp_asn 
    ORDER BY event_id 
    ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
  ), 1) AS rolling_avg_ttff
FROM playback_telemetry_events
ORDER BY isp_asn, event_id;`
        },
        uber: {
          name: 'Uber Operations',
          question: 'Track cumulative ride demand pacing within each metro zone.',
          sql: `-- Uber: Cumulative ride request accumulation per area
SELECT 
  request_id,
  h3_index AS area_id,
  requested_at,
  COUNT(*) OVER (
    PARTITION BY h3_index 
    ORDER BY requested_at 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_requests_in_area
FROM uber_ride_requests
ORDER BY area_id, requested_at;`
        },
        stripe: {
          name: 'Stripe Risk',
          question: 'Calculate cumulative dollar exposure per card during suspected card testing attacks.',
          sql: `-- Stripe: Cumulative dollar exposure per payment card
SELECT 
  auth_id,
  card_number_masked,
  amount_usd,
  charge_time,
  ROUND(SUM(amount_usd) OVER (
    PARTITION BY card_number_masked 
    ORDER BY charge_time 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2) AS cumulative_exposure_usd
FROM card_authorization_events
ORDER BY card_number_masked, charge_time;`
        }
      }
    },

    // -------------------------------------------------------------------------
    // PATTERN 6: Multi-Step Funnel Milestones
    // -------------------------------------------------------------------------
    {
      id: 'funnel_milestones',
      tier: 2,
      title: '06. Multi-Step Funnel Milestones',
      tag: 'CONVERSIONS',
      tagline: 'Track user conversion across sequential funnel steps and isolate the biggest drop-offs',
      businessProblem: `Growth and product teams exist to optimize funnels: "What % of users who land on the homepage end up buying?", "Are users dropping off at the credit card entry screen or the shipping fee screen?", "Which marketing channel yields the highest end-to-end checkout rate?"`,
      mentalModel: `Picture a water pipeline with 4 filters. 10,000 gallons enter at the top. Some spills out at filter #1, more at filter #2. Your job in SQL is to measure the flow at each tap so engineers know exactly which pipe is leaking.`,
      steppingStones: [
        {
          num: '6.1',
          title: 'The Stepping Stone: Conditional Aggregation (Single-Pass Pivot)',
          summary: 'The super-power pattern SUM(CASE WHEN step = "cart" THEN 1 ELSE 0 END) that pivots thousands of event rows in a single pass.',
          svg: 'conditionalAggregationMatrix'
        },
        {
          num: '6.2',
          title: 'The Stepping Stone: Measuring Drop-Off Sieve Ratios',
          summary: 'Turning raw milestone counts into actionable conversion ratios across stages to pinpoint bottlenecks.',
          svg: 'funnelConversion'
        },
        {
          num: '6.3',
          title: 'The Stepping Stone: COUNT(DISTINCT user_id) vs. Event Count',
          summary: 'Preventing one hyper-active user who clicks "Refresh" 20 times from corrupting your funnel rates.',
          svg: null
        }
      ],
      thinkingProcess: [
        '1. Identify key milestone events: e.g. "view_item", "add_to_cart", "start_checkout", "purchase".',
        '2. Pivot with CASE WHEN: Wrap each milestone in SUM(CASE WHEN event_name = "..." THEN 1 ELSE 0 END) or COUNT(DISTINCT CASE...).',
        '3. Compute conversion percentages: Divide Stage N by Stage 1 (overall conversion) and Stage N by Stage N-1 (step retention).',
        '4. Segment by dimensions: Group by marketing channel, device type, or country to see where conversion thrives or fails.'
      ],
      gotchas: [
        '1. Counting clicks instead of users: If a user clicks "Add to Cart" 6 times, SUM(CASE ...) counts 6 actions, but only 1 converted user. Always use COUNT(DISTINCT user_id).',
        '2. Chronological sequence: Ensuring the purchase happened AFTER the cart addition, not before (e.g., re-order shortcuts).',
        '3. Integer division truncation: 450 / 1000 evaluates to 0 in many SQL dialects without 100.0 *.'
      ],
      companyVariants: {
        amazon: {
          name: 'Amazon Retail',
          question: 'Pivot customer purchases into product category baskets in a single table scan.',
          sql: `-- Amazon: Single-pass product category basket conversion
SELECT 
  customer_id,
  COUNT(*) AS total_orders,
  SUM(CASE WHEN product_id LIKE '%KINDLE%' THEN 1 ELSE 0 END) AS kindle_orders,
  SUM(CASE WHEN product_id LIKE '%ECHO%' THEN 1 ELSE 0 END) AS echo_orders,
  SUM(CASE WHEN product_id LIKE '%MACBOOK%' OR product_id LIKE '%KEYBOARD%' THEN 1 ELSE 0 END) AS tech_accessories
FROM amazon_prime_orders
GROUP BY customer_id
ORDER BY total_orders DESC;`
        },
        netflix: {
          name: 'Netflix Telemetry',
          question: 'Segment stream playback events into fast, medium, and severe latency tiers per ISP.',
          sql: `-- Netflix: Quality-of-experience latency tiers per ISP
SELECT 
  isp_asn,
  COUNT(*) AS total_streams,
  SUM(CASE WHEN ttff_ms < 300 THEN 1 ELSE 0 END) AS fast_starts,
  SUM(CASE WHEN ttff_ms BETWEEN 300 AND 800 THEN 1 ELSE 0 END) AS medium_starts,
  SUM(CASE WHEN ttff_ms > 800 THEN 1 ELSE 0 END) AS severe_buffer_starts,
  ROUND(100.0 * SUM(CASE WHEN ttff_ms < 300 THEN 1 ELSE 0 END) / COUNT(*), 1) AS fast_start_pct
FROM playback_telemetry_events
GROUP BY isp_asn
ORDER BY fast_start_pct DESC;`
        },
        uber: {
          name: 'Uber Operations',
          question: 'Break down ride demand across early vs late dispatch windows.',
          sql: `-- Uber: Demand distribution across dispatch time windows
SELECT 
  h3_index AS area_id,
  COUNT(*) AS total_requests,
  SUM(CASE WHEN requested_at <= '2026-11-07 16:02:00' THEN 1 ELSE 0 END) AS early_requests,
  SUM(CASE WHEN requested_at > '2026-11-07 16:02:00' THEN 1 ELSE 0 END) AS late_requests,
  ROUND(100.0 * SUM(CASE WHEN requested_at > '2026-11-07 16:02:00' THEN 1 ELSE 0 END) / COUNT(*), 1) AS late_surge_pct
FROM uber_ride_requests
GROUP BY h3_index
ORDER BY total_requests DESC;`
        },
        stripe: {
          name: 'Stripe Risk & Fraud',
          question: 'Classify micro-charge card testing vs normal dollar authorizations.',
          sql: `-- Stripe: Micro-charge card testing attack classifier
SELECT 
  card_number_masked,
  ip_location,
  COUNT(*) AS total_attempts,
  SUM(CASE WHEN amount_usd < 0.60 THEN 1 ELSE 0 END) AS micro_probe_charges,
  SUM(CASE WHEN amount_usd >= 0.60 THEN 1 ELSE 0 END) AS standard_charges,
  ROUND(100.0 * SUM(CASE WHEN amount_usd < 0.60 THEN 1 ELSE 0 END) / COUNT(*), 1) AS card_testing_risk_pct
FROM card_authorization_events
GROUP BY card_number_masked, ip_location
ORDER BY total_attempts DESC;`
        }
      }
    }
  ];

  // ===========================================================================
  // PATTERN HUB STATE & ENGINE
  // ===========================================================================

  let activePatternId = 'anti_join';
  let activeCompanyMap = {
    anti_join: 'amazon',
    top_n_ranking: 'amazon',
    outliers_having: 'amazon',
    period_deltas: 'amazon',
    running_totals: 'amazon',
    funnel_milestones: 'amazon'
  };

  function getActivePattern() {
    return PATTERNS.find(p => p.id === activePatternId) || PATTERNS[0];
  }

  function renderPatternHubHtml() {
    const p = getActivePattern();
    const curCompany = activeCompanyMap[p.id] || 'amazon';
    const variant = p.companyVariants[curCompany] || p.companyVariants.amazon;

    return `
      <div class="koma-pattern-hub-overlay" id="komaPatternHubModal">
        <div class="koma-pattern-hub-modal">
          
          <!-- Top Bar -->
          <div class="koma-hub-topbar">
            <div class="koma-hub-branding">
              <span class="koma-hub-dna-icon">🧬</span>
              <div>
                <h2 class="koma-hub-title">80/20 Universal SQL Pattern Academy</h2>
                <p class="koma-hub-subtitle">Master the 6 vital archetypes that solve 80% of company database questions</p>
              </div>
            </div>
            <button class="koma-hub-close-btn" onclick="window.SQL_PATTERN_HUB.close()" title="Close Pattern Academy">✕</button>
          </div>

          <!-- Main Layout -->
          <div class="koma-hub-body">
            
            <!-- Left Sidebar: Pattern Index -->
            <div class="koma-hub-sidebar">
              <div class="koma-hub-tier-label">🟢 TIER 1: EVERYDAY ESSENTIALS</div>
              ${PATTERNS.filter(x => x.tier === 1).map(item => `
                <button class="koma-hub-nav-item ${item.id === activePatternId ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectPattern('${item.id}')">
                  <div class="koma-hub-nav-title">${escapeHtml(item.title)}</div>
                  <span class="koma-hub-nav-tag">${escapeHtml(item.tag)}</span>
                </button>
              `).join('')}

              <div class="koma-hub-tier-label" style="margin-top:16px;">🟡 TIER 2: BUSINESS GROWTH</div>
              ${PATTERNS.filter(x => x.tier === 2).map(item => `
                <button class="koma-hub-nav-item ${item.id === activePatternId ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectPattern('${item.id}')">
                  <div class="koma-hub-nav-title">${escapeHtml(item.title)}</div>
                  <span class="koma-hub-nav-tag">${escapeHtml(item.tag)}</span>
                </button>
              `).join('')}

              <div class="koma-hub-tier-label" style="margin-top:16px;">🔴 TIER 3: BIG TECH ARSENAL</div>
              <div class="koma-hub-nav-item locked">
                <div class="koma-hub-nav-title">07. Deduplication & Latest State</div>
                <span class="koma-hub-nav-tag">CLEAN DATA</span>
              </div>
              <div class="koma-hub-nav-item locked">
                <div class="koma-hub-nav-title">08. Consecutive Streaks (Gaps & Islands)</div>
                <span class="koma-hub-nav-tag">ENGAGEMENT</span>
              </div>
            </div>

            <!-- Right Content Area -->
            <div class="koma-hub-content">
              
              <!-- Pattern Header Banner -->
              <div class="koma-hub-header-banner">
                <div class="koma-hub-tier-pill">Tier ${p.tier}: ${p.tier === 1 ? 'Everyday Essentials' : 'Business Growth'}</div>
                <div class="koma-hub-tag-pill">${escapeHtml(p.tag)}</div>
                <h1 class="koma-hub-header-title">${escapeHtml(p.title)}</h1>
                <p class="koma-hub-tagline">${escapeHtml(p.tagline)}</p>
              </div>

              <!-- Section 1: Business Context -->
              <div class="koma-hub-section">
                <div class="koma-hub-section-title">
                  <span>🎯</span> 1. The Real Business Problem
                </div>
                <div class="koma-hub-quote-card">
                  ${escapeHtml(p.businessProblem)}
                </div>
              </div>

              <!-- Section 2: Visual Mental Model -->
              <div class="koma-hub-section">
                <div class="koma-hub-section-title">
                  <span>🧠</span> 2. The Visual Mental Model (How To Picture It)
                </div>
                <div class="koma-hub-mental-card">
                  <p>${escapeHtml(p.mentalModel)}</p>
                </div>
              </div>

              <!-- Section 3: Subtopics & Stepping Stones (WITH HANDCRAFTED SVGs) -->
              <div class="koma-hub-section">
                <div class="koma-hub-section-title">
                  <span>🪜</span> 3. Stepping Stones: Concepts Needed to Master This
                </div>
                <div class="koma-subtopics-list">
                  ${p.steppingStones.map(st => `
                    <div class="koma-subtopic-card">
                      <div class="koma-subtopic-header">
                        <span class="koma-subtopic-badge">${st.num}</span>
                        <div class="koma-subtopic-title">${escapeHtml(st.title)}</div>
                      </div>
                      <p class="koma-subtopic-desc">${escapeHtml(st.summary)}</p>
                      ${st.svg && SVG_LIBRARY[st.svg] ? `
                        <div class="koma-svg-viewport">
                          ${SVG_LIBRARY[st.svg]()}
                        </div>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Section 4: 4-Step Thinking Process -->
              <div class="koma-hub-section">
                <div class="koma-hub-section-title">
                  <span>🧭</span> 4. The 4-Step Thinking Process
                </div>
                <div class="koma-hub-steps-card">
                  ${p.thinkingProcess.map(step => `
                    <div class="koma-hub-step-item">
                      <div class="koma-step-dot"></div>
                      <div class="koma-step-text">${escapeHtml(step)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Section 5: Common Traps & Gotchas -->
              <div class="koma-hub-section">
                <div class="koma-hub-section-title">
                  <span>⚠️</span> 5. Interview Traps & Production Gotchas
                </div>
                <div class="koma-hub-gotchas-card">
                  ${p.gotchas.map(g => `
                    <div class="koma-gotcha-row">
                      <span class="koma-gotcha-icon">⚡</span>
                      <div class="koma-gotcha-text">${escapeHtml(g)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Section 6: Cross-Company Chameleon Practice -->
              <div class="koma-hub-section">
                <div class="koma-hub-section-title">
                  <span>🏢</span> 6. Cross-Company Chameleon: See the Exact Same Pattern Everywhere
                </div>
                <p class="koma-chameleon-intro">
                  Notice how Amazon, Netflix, Uber, and Stripe ask the exact same fundamental question, only swapping the table names:
                </p>

                <!-- Company Selector Pills -->
                <div class="koma-company-pills">
                  <button class="koma-company-pill ${curCompany === 'amazon' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('amazon')">
                    🛒 Amazon
                  </button>
                  <button class="koma-company-pill ${curCompany === 'netflix' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('netflix')">
                    🎬 Netflix
                  </button>
                  <button class="koma-company-pill ${curCompany === 'uber' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('uber')">
                    🚗 Uber
                  </button>
                  <button class="koma-company-pill ${curCompany === 'stripe' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('stripe')">
                    💳 Stripe
                  </button>
                </div>

                <!-- Company Drill Card -->
                <div class="koma-company-drill-box">
                  <div class="koma-drill-head">
                    <div class="koma-drill-co-name">${escapeHtml(variant.name)} Case Study</div>
                    <button class="koma-load-editor-btn" onclick="window.SQL_PATTERN_HUB.loadAndRun('${p.id}', '${curCompany}')">
                      ⚡ 1-Click Load into Editor & Run
                    </button>
                  </div>
                  <div class="koma-drill-prompt">
                    <strong>Challenge:</strong> ${escapeHtml(variant.question)}
                  </div>
                  <pre class="koma-drill-sql"><code>${escapeHtml(variant.sql)}</code></pre>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // PUBLIC API & CONTROLLER
  // ===========================================================================

  // ===========================================================================
  // DEDICATED FULL-PAGE VIEW RENDERER
  // ===========================================================================

  function renderFullPageViewHtml() {
    const p = getActivePattern();
    const curCompany = activeCompanyMap[p.id] || 'amazon';
    const variant = p.companyVariants[curCompany] || p.companyVariants.amazon;

    return `
      <div class="view-pattern-academy-page">
        <!-- Top Bar -->
        <div class="view-pattern-topbar">
          <div class="view-pattern-title-wrap">
            <div class="view-pattern-logo-icon">🧬</div>
            <div>
              <h1 class="view-pattern-main-heading">80/20 Universal SQL Pattern Academy</h1>
              <p class="view-pattern-subtitle">Master the 6 foundational archetypes that solve 80% of data &amp; finance query interviews</p>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:12px;">
            <button class="koma-pafb-btn" onclick="try{window.location.hash='#home';}catch(e){} selectNavView('viewLandingPage', 'Home', null);" style="background:#27272a; border:1px solid #3f3f46; box-shadow:none; padding:8px 16px; font-size:12px; cursor:pointer;">
              &larr; Back to SQL Studio
            </button>
          </div>
        </div>

        <!-- Layout: 2 Columns (Sidebar + Full Canvas) -->
        <div class="view-pattern-layout">
          <!-- Left Pattern Nav -->
          <div class="koma-hub-sidebar" style="background:#141416; border:1px solid #27272a; border-radius:8px; padding:16px;">
            <div class="koma-hub-tier-label">🟢 TIER 1: EVERYDAY ESSENTIALS</div>
            ${PATTERNS.filter(x => x.tier === 1).map(item => `
              <button class="koma-hub-nav-item ${item.id === activePatternId ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectPattern('${item.id}', true)">
                <div class="koma-hub-nav-title">${escapeHtml(item.title)}</div>
                <span class="koma-hub-nav-tag">${escapeHtml(item.tag)}</span>
              </button>
            `).join('')}

            <div class="koma-hub-tier-label" style="margin-top:16px;">🟡 TIER 2: BUSINESS GROWTH</div>
            ${PATTERNS.filter(x => x.tier === 2).map(item => `
              <button class="koma-hub-nav-item ${item.id === activePatternId ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectPattern('${item.id}', true)">
                <div class="koma-hub-nav-title">${escapeHtml(item.title)}</div>
                <span class="koma-hub-nav-tag">${escapeHtml(item.tag)}</span>
              </button>
            `).join('')}

            <div class="koma-hub-tier-label" style="margin-top:16px;">🔴 TIER 3: BIG TECH ARSENAL</div>
            <div class="koma-hub-nav-item locked">
              <div class="koma-hub-nav-title">07. Deduplication &amp; Latest State</div>
              <span class="koma-hub-nav-tag">CLEAN DATA</span>
            </div>
            <div class="koma-hub-nav-item locked">
              <div class="koma-hub-nav-title">08. Consecutive Streaks (Gaps &amp; Islands)</div>
              <span class="koma-hub-nav-tag">ENGAGEMENT</span>
            </div>
          </div>

          <!-- Right Pattern Content Canvas -->
          <div class="koma-hub-content" style="background:#141416; border:1px solid #27272a; border-radius:8px; padding:28px;">
            <!-- Pattern Header Banner -->
            <div class="koma-hub-header-banner">
              <div class="koma-hub-tier-pill">Tier ${p.tier}: ${p.tier === 1 ? 'Everyday Essentials' : 'Business Growth'}</div>
              <div class="koma-hub-tag-pill">${escapeHtml(p.tag)}</div>
              <h1 class="koma-hub-header-title">${escapeHtml(p.title)}</h1>
              <p class="koma-hub-tagline">${escapeHtml(p.tagline)}</p>
            </div>

            <!-- Section 1: Business Context -->
            <div class="koma-hub-section">
              <div class="koma-hub-section-title"><span>🎯</span> 1. The Real Business Problem</div>
              <div class="koma-hub-quote-card">${escapeHtml(p.businessProblem)}</div>
            </div>

            <!-- Section 2: Visual Mental Model -->
            <div class="koma-hub-section">
              <div class="koma-hub-section-title"><span>🧠</span> 2. The Visual Mental Model (How To Picture It)</div>
              <div class="koma-hub-mental-card"><p>${escapeHtml(p.mentalModel)}</p></div>
            </div>

            <!-- Section 3: Subtopics & Stepping Stones (WITH HANDCRAFTED SVGs) -->
            <div class="koma-hub-section">
              <div class="koma-hub-section-title"><span>🪜</span> 3. Stepping Stones: Concepts Needed to Master This</div>
              <div class="koma-subtopics-list">
                ${p.steppingStones.map(st => `
                  <div class="koma-subtopic-card">
                    <div class="koma-subtopic-header">
                      <span class="koma-subtopic-badge">${st.num}</span>
                      <div class="koma-subtopic-title">${escapeHtml(st.title)}</div>
                    </div>
                    <p class="koma-subtopic-desc">${escapeHtml(st.summary)}</p>
                    ${st.svg && SVG_LIBRARY[st.svg] ? `
                      <div class="koma-svg-viewport">
                        ${SVG_LIBRARY[st.svg]()}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Section 4: 4-Step Thinking Process -->
            <div class="koma-hub-section">
              <div class="koma-hub-section-title"><span>🧭</span> 4. The 4-Step Thinking Process</div>
              <div class="koma-hub-steps-card">
                ${p.thinkingProcess.map(step => `
                  <div class="koma-hub-step-item">
                    <div class="koma-step-dot"></div>
                    <div class="koma-step-text">${escapeHtml(step)}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Section 5: Common Traps & Gotchas -->
            <div class="koma-hub-section">
              <div class="koma-hub-section-title"><span>⚠️</span> 5. Interview Traps &amp; Production Gotchas</div>
              <div class="koma-hub-gotchas-card">
                ${p.gotchas.map(g => `
                  <div class="koma-gotcha-row">
                    <span class="koma-gotcha-icon">⚡</span>
                    <div class="koma-gotcha-text">${escapeHtml(g)}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Section 6: Cross-Company Chameleon Practice -->
            <div class="koma-hub-section">
              <div class="koma-hub-section-title"><span>🏢</span> 6. Cross-Company Chameleon: See the Exact Same Pattern Everywhere</div>
              <p class="koma-chameleon-intro">
                Notice how Amazon, Netflix, Uber, and Stripe ask the exact same fundamental question, only swapping the table names:
              </p>

              <!-- Company Selector Pills -->
              <div class="koma-company-pills">
                <button class="koma-company-pill ${curCompany === 'amazon' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('amazon', true)">🛒 Amazon</button>
                <button class="koma-company-pill ${curCompany === 'netflix' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('netflix', true)">🎬 Netflix</button>
                <button class="koma-company-pill ${curCompany === 'uber' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('uber', true)">🚗 Uber</button>
                <button class="koma-company-pill ${curCompany === 'stripe' ? 'active' : ''}" onclick="window.SQL_PATTERN_HUB.selectCompany('stripe', true)">💳 Stripe</button>
              </div>

              <!-- Company Drill Card with 1-Click Load & Run -->
              <div class="koma-company-drill-box">
                <div class="koma-drill-head">
                  <div class="koma-drill-co-name">${escapeHtml(variant.name)} Case Study</div>
                  <button class="koma-load-editor-btn" onclick="window.SQL_PATTERN_HUB.loadAndRun('${p.id}', '${curCompany}')">
                    ⚡ Load into Live Studio &amp; Run Query
                  </button>
                </div>
                <div class="koma-drill-prompt">
                  <strong>Challenge:</strong> ${escapeHtml(variant.question)}
                </div>
                <pre class="koma-drill-sql"><code>${escapeHtml(variant.sql)}</code></pre>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // PUBLIC API & CONTROLLER
  // ===========================================================================

  window.SQL_PATTERN_HUB = {
    mountView: function(elementId) {
      const targetId = elementId || 'viewPatternAcademy';
      const el = document.getElementById(targetId);
      if (!el) return;
      el.innerHTML = renderFullPageViewHtml();
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e) {}
    },

    open: function(patternId) {
      if (patternId && PATTERNS.some(p => p.id === patternId)) {
        activePatternId = patternId;
      }
      let modal = document.getElementById('komaPatternHubMount');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'komaPatternHubMount';
        document.body.appendChild(modal);
      }
      modal.innerHTML = renderPatternHubHtml();
      document.body.style.overflow = 'hidden';
      if (window.soundFX && typeof window.soundFX.playPop === 'function') {
        try { window.soundFX.playPop(); } catch(e) {}
      }
    },

    close: function() {
      const modal = document.getElementById('komaPatternHubMount');
      if (modal) modal.innerHTML = '';
      document.body.style.overflow = '';
    },

    selectPattern: function(patternId, isFullPage) {
      activePatternId = patternId;
      const fullView = document.getElementById('viewPatternAcademy');
      if (isFullPage || (fullView && fullView.classList.contains('active'))) {
        this.mountView('viewPatternAcademy');
      } else {
        const modal = document.getElementById('komaPatternHubMount');
        if (modal) modal.innerHTML = renderPatternHubHtml();
      }
      if (window.soundFX && typeof window.soundFX.playClick === 'function') {
        try { window.soundFX.playClick(); } catch(e) {}
      }
    },

    selectCompany: function(companyKey, isFullPage) {
      activeCompanyMap[activePatternId] = companyKey;
      const fullView = document.getElementById('viewPatternAcademy');
      if (isFullPage || (fullView && fullView.classList.contains('active'))) {
        this.mountView('viewPatternAcademy');
      } else {
        const modal = document.getElementById('komaPatternHubMount');
        if (modal) modal.innerHTML = renderPatternHubHtml();
      }
      if (window.soundFX && typeof window.soundFX.playClick === 'function') {
        try { window.soundFX.playClick(); } catch(e) {}
      }
    },

    loadAndRun: function(patternId, companyKey) {
      const p = PATTERNS.find(x => x.id === patternId);
      if (!p) return;
      const variant = p.companyVariants[companyKey] || p.companyVariants.amazon;
      if (!variant) return;

      this.close();

      // If user is inside the full page view, transition back to home
      const fullView = document.getElementById('viewPatternAcademy');
      if (fullView && fullView.classList.contains('active')) {
        try {
          window.location.hash = '#home';
          if (typeof selectNavView === 'function') selectNavView('viewLandingPage', 'Home', null);
        } catch(e) {}
      }

      setTimeout(() => {
        const textarea = document.getElementById('komaSqlEditor');
        if (textarea && window.LANDING_PAGE_ENGINE) {
          if (companyKey && typeof window.LANDING_PAGE_ENGINE.switchCompany === 'function') {
            try { window.LANDING_PAGE_ENGINE.switchCompany(companyKey); } catch(e) {}
          }

          textarea.value = variant.sql;
          window.LANDING_PAGE_ENGINE.runActiveQuery();

          const editorContainer = document.getElementById('komaInteractiveEditor') || textarea;
          if (editorContainer) {
            editorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 50);
    },

    detectPattern: function(sql) {
      if (!sql) return null;
      const s = sql.toUpperCase();
      if ((s.includes('LEFT JOIN') || s.includes('LEFT OUTER JOIN')) && (s.includes('IS NULL') || s.includes('NOT EXISTS'))) {
        return { id: 'anti_join', title: 'The Missing Match (Anti-Join)' };
      }
      if (s.includes('ROW_NUMBER(') || s.includes('DENSE_RANK(') || (s.includes('RANK(') && s.includes('OVER'))) {
        return { id: 'top_n_ranking', title: 'Top N Per Group (Ranking)' };
      }
      if (s.includes('GROUP BY') && s.includes('HAVING')) {
        return { id: 'outliers_having', title: 'Outliers & Thresholds (HAVING)' };
      }
      if (s.includes('LAG(') || s.includes('LEAD(')) {
        return { id: 'period_deltas', title: 'Period-over-Period Deltas (LAG)' };
      }
      if ((s.includes('SUM(') || s.includes('AVG(')) && s.includes('OVER') && (s.includes('ROWS BETWEEN') || s.includes('UNBOUNDED PRECEDING'))) {
        return { id: 'running_totals', title: 'Cumulative & Rolling Windows' };
      }
      if (s.includes('CASE WHEN') && (s.includes('SUM(') || s.includes('COUNT('))) {
        return { id: 'funnel_milestones', title: 'Multi-Step Funnel Milestones' };
      }
      return null;
    }
  };

})(window);

    const LandingPageEngine = {
    renderLandingPage: function() {
      this.init();
    },

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
      if (isExplainerOpen) this.updateQueryExplainer();
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
            this.dismissAutofixBanner();
            this.updateClauseRibbon(query, cols);
            }

            if (tableWrapper) {
              tableWrapper.innerHTML = `
                <div id="komaTableHighlightMount"></div>
                <table class="koma-table" id="komaResultsTable">
                  <thead>
                    <tr>
                      ${cols.map(c => `<th data-col="${escapeHtml(c).toLowerCase()}" onmouseenter="window.LANDING_PAGE_ENGINE.highlightColumnFromTable('${escapeHtml(c)}')" onmouseleave="window.LANDING_PAGE_ENGINE.clearClauseHighlight()" title="Hover to isolate column '${escapeHtml(c)}'">${escapeHtml(c)}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${rows.map(row => `
                      <tr>
                        ${row.map((cell, cIdx) => `<td data-col="${escapeHtml(cols[cIdx]).toLowerCase()}">${escapeHtml(cell !== null ? cell : 'NULL')}</td>`).join('')}
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

          if (diag && diag.autoFixAvailable) {
            this.showAutofixBanner(diag);
          } else {
            this.dismissAutofixBanner();
          }

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
              <button class="btn-koma-secondary" onclick="window.SQL_PATTERN_HUB &amp;&amp; window.SQL_PATTERN_HUB.open()" style="border-color:#7c3aed; color:#c084fc;">
                🧬 80/20 SQL Patterns
              </button>
            </div>

            <div class="koma-platform-subtext">
              Beginner-friendly &bull; MySQL &bull; PostgreSQL &bull; SQLite in browser &bull; Real datasets
            </div>

          </section>

          
            <!-- STANDALONE 80/20 PATTERN ACADEMY FEATURE BANNER -->
            <div class="koma-pattern-academy-feature-banner" onclick="try{window.location.hash='#patterns';}catch(e){} selectNavView('viewPatternAcademy', '80/20 Patterns', null); if(window.SQL_PATTERN_HUB) window.SQL_PATTERN_HUB.mountView('viewPatternAcademy');" title="Open 80/20 Universal SQL Pattern Academy">
              <div class="koma-pafb-left">
                <div class="koma-pafb-badge">
                  <span class="koma-pafb-sparkle">🧬</span>
                  <span>THE 80/20 UNIVERSAL SQL PATTERN ACADEMY</span>
                  <span class="nav-item-tag accent" style="background:#2e1065; color:#c084fc; border:1px solid #7c3aed; font-size:9px; padding:1px 4px; border-radius:3px; margin-left:4px;">6 ARCHETYPES</span>
                </div>
                <h2 class="koma-pafb-heading">Master the 20% of Patterns That Solve 80% of All Tech &amp; Finance SQL Interviews</h2>
                <p class="koma-pafb-sub">Stop memorizing hundreds of random queries. Master the 6 core blueprints (Anti-Joins, Category Rankings, Outlier Detection, MoM Deltas, Rolling Accumulators, and Funnel Sieves) with 11 handcrafted visual SVGs and cross-company drills across Amazon, Netflix, Uber, and Stripe.</p>
                <div class="koma-pafb-cta-row">
                  <button class="koma-pafb-btn">
                    <span>🚀 Launch 80/20 Pattern Academy</span>
                    <span class="koma-pafb-arrow">&rarr;</span>
                  </button>
                  <div class="koma-pafb-metrics">
                    <span><strong>6</strong> Archetypes</span> &bull; 
                    <span><strong>11</strong> Visual SVGs</span> &bull; 
                    <span><strong>24</strong> Company Drills</span>
                  </div>
                </div>
              </div>
              <div class="koma-pafb-right">
                <div class="koma-pafb-preview-card">
                  <div class="koma-pafb-preview-header">
                    <span class="koma-pafb-dot green"></span>
                    <span>01. The Missing Match (Anti-Join)</span>
                  </div>
                  <div class="koma-pafb-preview-code">LEFT JOIN orders ON ... WHERE o.id IS NULL</div>
                </div>
                <div class="koma-pafb-preview-card">
                  <div class="koma-pafb-preview-header">
                    <span class="koma-pafb-dot cyan"></span>
                    <span>02. Top N Per Group (Ranking)</span>
                  </div>
                  <div class="koma-pafb-preview-code">ROW_NUMBER() OVER (PARTITION BY cat ORDER BY val)</div>
                </div>
                <div class="koma-pafb-preview-card">
                  <div class="koma-pafb-preview-header">
                    <span class="koma-pafb-dot purple"></span>
                    <span>04. Period-over-Period Deltas (LAG)</span>
                  </div>
                  <div class="koma-pafb-preview-code">LAG(metric, 1) OVER (PARTITION BY id ORDER BY date)</div>
                </div>
              </div>
            </div>

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
                          <button class="koma-btn-toolbar" onclick="window.LANDING_PAGE_ENGINE.toggleQueryExplainer()" title="Explain this query in plain English" style="color:#38bdf8;">
                            <span>💬 Explain Query</span>
                          </button>
                          <button class="koma-btn-toolbar ${currentSinkMode === 'stepper' ? 'active-stepper-btn' : ''}" id="komaBtnStepThrough" onclick="window.LANDING_PAGE_ENGINE.toggleStepThrough()" title="Interactive Step-by-Step SQL Guide">
                            <span>🚶 Step-by-Step</span>
                          </button>
                          <button class="koma-btn-toolbar-pattern" onclick="window.SQL_PATTERN_HUB && window.SQL_PATTERN_HUB.open()" title="Open 80/20 Universal SQL Pattern Academy">
                            <span>🧬 80/20 Patterns</span>
                          </button>
                          <button id="komaBtnToolbarFix" class="koma-btn-toolbar-fix" onclick="window.LANDING_PAGE_ENGINE.applyDoctorAutoFix()" title="Apply 1-Click Fix to Editor" style="display:none;">
                            <span>⚡ Click to Fix</span>
                          </button>
                        </div>
                        <div class="koma-editor-toolbar-right">
                          <span><span class="koma-editor-pulse"></span>Live Editor Ready</span>
                        </div>
                      </div>

                      <!-- In-Editor 1-Click Autofix Banner (Option 3) -->
                      <div id="komaAutofixBanner" class="koma-autofix-banner" style="display:none;">
                        <div class="koma-autofix-content">
                          <span class="koma-autofix-icon">🪄</span>
                          <div class="koma-autofix-details">
                            <span class="koma-autofix-title" id="komaAutofixTitle">Fix detected</span>
                            <span class="koma-autofix-diff" id="komaAutofixDiff">Line 1: ...</span>
                          </div>
                        </div>
                        <div class="koma-autofix-actions">
                          <button class="koma-btn-autofix-apply" onclick="window.LANDING_PAGE_ENGINE.applyDoctorAutoFix()" title="Apply fix and re-run query">
                            <span>⚡ Click to Fix</span>
                          </button>
                          <button class="koma-btn-autofix-dismiss" onclick="window.LANDING_PAGE_ENGINE.dismissAutofixBanner()" title="Dismiss fix notification">✕</button>
                        </div>
                      </div>

                      <!-- Editor Textarea with Line Numbers -->
                      <div class="koma-editor-body">
                        <div id="komaEditorGutter" class="koma-editor-gutter"></div>
                        <textarea id="komaSqlEditor" class="koma-code-textarea" spellcheck="false" wrap="off" placeholder="Write SQL query here...">${escapeHtml(activeQuerySql)}</textarea>
                      </div>

                      <!-- Interactive Clause Explorer Ribbon (Option 4) -->
                      <div id="komaClauseRibbon" class="koma-clause-ribbon">
                        <span class="koma-clause-ribbon-label"><span>🔍</span> Clauses:</span>
                        <div id="komaClauseChips" class="koma-clause-chips"></div>
                      </div>

                    </div>

                    <!-- Live Query Results & Interactive Stepper Column -->
                    <div class="koma-sink-column">
                      
                      <!-- Explainer Mount Point -->
                      <div id="komaExplainerMount">${isExplainerOpen && window.SQL_EXPLAINER ? window.SQL_EXPLAINER.renderExplainerCardHtml(window.SQL_EXPLAINER.explain(userSqlMap[activeScenarioId] || cur.rawSql)) : ''}</div>

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

                                <!-- Live Table Transformation -->
                                ${renderStepTableTransformation(cur, st, stepIdx)}
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

    
    dismissAutofixBanner: function() {
      const banner = document.getElementById('komaAutofixBanner');
      const toolbarFix = document.getElementById('komaBtnToolbarFix');
      if (banner) {
        banner.style.display = 'none';
        banner.classList.remove('success-mode');
      }
      if (toolbarFix) {
        toolbarFix.style.display = 'none';
      }
    },

    showAutofixBanner: function(diag) {
      if (!diag || !diag.autoFixAvailable) {
        this.dismissAutofixBanner();
        return;
      }
      const banner = document.getElementById('komaAutofixBanner');
      const title = document.getElementById('komaAutofixTitle');
      const diff = document.getElementById('komaAutofixDiff');
      const toolbarFix = document.getElementById('komaBtnToolbarFix');

      if (title) title.innerText = diag.friendlyTitle || '1-Click Fix Available';
      if (diff) {
        diff.innerHTML = 'Line ' + (diag.fixedLineNumber || 1) + ': <code>' + escapeHtml(diag.problemSnippet) + '</code> → <code>' + escapeHtml(diag.fixedSnippet) + '</code>';
      }
      if (banner) {
        banner.classList.remove('success-mode');
        banner.style.display = 'flex';
      }
      if (toolbarFix) {
        toolbarFix.style.display = 'inline-flex';
      }
    },

    updateClauseRibbon: function(sql, activeCols) {
      const container = document.getElementById('komaClauseChips');
      if (!container) return;
      sql = String(sql || '').replace(/--.*$/gm, '').trim();
      if (!sql) {
        container.innerHTML = '<span style="color:#71717a;">No query</span>';
        return;
      }

      // Parse main clauses
      const fromMatch = sql.match(/\bFROM\s+([a-zA-Z0-9_]+)/i);
      const fromTable = fromMatch ? fromMatch[1] : '';

      const whereMatch = sql.match(/\bWHERE\s+([\s\S]*?)(?=\bGROUP\s+BY\b|\bORDER\s+BY\b|\bLIMIT\b|;|$)/i);
      const whereCond = whereMatch ? whereMatch[1].trim() : '';

      const orderMatch = sql.match(/\bORDER\s+BY\s+([\s\S]*?)(?=\bLIMIT\b|;|$)/i);
      const orderCond = orderMatch ? orderMatch[1].trim() : '';

      const limitMatch = sql.match(/\bLIMIT\s+(\d+)/i);
      const limitVal = limitMatch ? limitMatch[1] : '';

      const chipsHtml = [];

      // Pattern DNA badge
      if (window.SQL_PATTERN_HUB && typeof window.SQL_PATTERN_HUB.detectPattern === 'function') {
        const detected = window.SQL_PATTERN_HUB.detectPattern(sql);
        if (detected) {
          chipsHtml.push(
            '<button class="koma-clause-chip" style="background:rgba(168,85,247,0.18); border-color:#a855f7; color:#e9d5ff;" onclick="window.SQL_PATTERN_HUB.open(\'' + detected.id + '\')" title="Click to open full Pattern Mastery guide">' +
            '<span class="chip-kw" style="color:#c084fc;">🧬 ' + escapeHtml(detected.title) + '</span>' +
            '</button>'
          );
        }
      }

      // SELECT chip
      chipsHtml.push(
        '<button class="koma-clause-chip chip-select" onmouseenter="window.LANDING_PAGE_ENGINE.highlightClause(\'SELECT\')" onmouseleave="window.LANDING_PAGE_ENGINE.clearClauseHighlight()" title="Hover to highlight selected columns">' +
        '<span class="chip-kw">SELECT</span>' +
        '<span style="color:#38bdf8;">' + (activeCols ? activeCols.length : '') + ' cols</span>' +
        '</button>'
      );

      // Column chips
      if (activeCols && activeCols.length) {
        activeCols.slice(0, 5).forEach(c => {
          chipsHtml.push(
            '<button class="koma-clause-chip chip-col" data-col-chip="' + escapeHtml(c).toLowerCase() + '" onmouseenter="window.LANDING_PAGE_ENGINE.highlightColumn(\'' + escapeHtml(c) + '\')" onmouseleave="window.LANDING_PAGE_ENGINE.clearClauseHighlight()" title="Hover to isolate column \'' + escapeHtml(c) + '\'">' +
            '<span class="chip-col-name">' + escapeHtml(c) + '</span>' +
            '</button>'
          );
        });
      }

      // FROM chip
      if (fromTable) {
        chipsHtml.push(
          '<button class="koma-clause-chip chip-from" onmouseenter="window.LANDING_PAGE_ENGINE.highlightClause(\'FROM\', \'' + escapeHtml(fromTable) + '\')" onmouseleave="window.LANDING_PAGE_ENGINE.clearClauseHighlight()" title="Hover to view source table">' +
          '<span class="chip-kw">FROM</span>' +
          '<span style="color:#fbbf24;">' + escapeHtml(fromTable) + '</span>' +
          '</button>'
        );
      }

      // WHERE chip
      if (whereCond) {
        const cleanWhere = escapeHtml(whereCond).replace(/'/g, "\\'");
        chipsHtml.push(
          '<button class="koma-clause-chip chip-where" onmouseenter="window.LANDING_PAGE_ENGINE.highlightClause(\'WHERE\', \'' + cleanWhere + '\')" onmouseleave="window.LANDING_PAGE_ENGINE.clearClauseHighlight()" title="Hover to highlight matching rows">' +
          '<span class="chip-kw">WHERE</span>' +
          '<span style="color:#34d399;">' + escapeHtml(whereCond).substring(0, 24) + (whereCond.length > 24 ? '...' : '') + '</span>' +
          '</button>'
        );
      }

      // ORDER BY chip
      if (orderCond) {
        chipsHtml.push(
          '<button class="koma-clause-chip chip-order" onmouseenter="window.LANDING_PAGE_ENGINE.highlightClause(\'ORDER_BY\')" onmouseleave="window.LANDING_PAGE_ENGINE.clearClauseHighlight()" title="Hover to view sorting">' +
          '<span class="chip-kw">ORDER BY</span>' +
          '<span style="color:#a78bfa;">' + escapeHtml(orderCond).substring(0, 18) + '</span>' +
          '</button>'
        );
      }

      // LIMIT chip
      if (limitVal) {
        chipsHtml.push(
          '<button class="koma-clause-chip chip-limit" onmouseenter="window.LANDING_PAGE_ENGINE.highlightClause(\'LIMIT\')" onmouseleave="window.LANDING_PAGE_ENGINE.clearClauseHighlight()" title="Hover to view limit cutoff">' +
          '<span class="chip-kw">LIMIT</span>' +
          '<span style="color:#f87171;">' + escapeHtml(limitVal) + '</span>' +
          '</button>'
        );
      }

      container.innerHTML = chipsHtml.join('');
    },

    highlightColumn: function(colName) {
      const table = document.getElementById('komaResultsTable');
      const mount = document.getElementById('komaTableHighlightMount');
      if (!table) return;

      const lower = String(colName || '').toLowerCase();
      table.classList.add('has-highlight');

      const cells = table.querySelectorAll('[data-col="' + lower + '"]');
      cells.forEach(el => el.classList.add('col-active'));

      if (mount) {
        mount.innerHTML = '<div class="koma-table-highlight-banner highlight-banner-select"><span>✨ Column Isolated: <strong>' + escapeHtml(colName) + '</strong> (Selected in SELECT list)</span></div>';
      }
    },

    highlightColumnFromTable: function(colName) {
      this.highlightColumn(colName);
      const lower = String(colName || '').toLowerCase();
      const chip = document.querySelector('[data-col-chip="' + lower + '"]');
      if (chip) chip.classList.add('active');
    },

    highlightClause: function(type, arg) {
      const table = document.getElementById('komaResultsTable');
      const mount = document.getElementById('komaTableHighlightMount');
      if (!table) return;

      if (type === 'SELECT') {
        table.classList.add('has-highlight');
        table.querySelectorAll('th, td').forEach(el => el.classList.add('col-active'));
        if (mount) {
          mount.innerHTML = '<div class="koma-table-highlight-banner highlight-banner-select"><span>✨ Highlighting all columns chosen in SELECT clause</span></div>';
        }
      } else if (type === 'WHERE') {
        table.querySelectorAll('tbody tr').forEach(tr => tr.classList.add('row-active-where'));
        if (mount) {
          mount.innerHTML = '<div class="koma-table-highlight-banner highlight-banner-where"><span>🔍 Highlighting Rows: All returned rows satisfy WHERE ' + (arg ? '(' + escapeHtml(arg) + ')' : 'filter') + '</span></div>';
        }
      } else if (type === 'FROM') {
        if (mount) {
          mount.innerHTML = '<div class="koma-table-highlight-banner highlight-banner-from"><span>📁 Data sourced from table: <strong>' + escapeHtml(arg || 'current table') + '</strong></span></div>';
        }
      } else if (type === 'ORDER_BY') {
        if (mount) {
          mount.innerHTML = '<div class="koma-table-highlight-banner highlight-banner-select"><span>⇅ Rows sorted in deterministic order by ORDER BY</span></div>';
        }
      } else if (type === 'LIMIT') {
        if (mount) {
          mount.innerHTML = '<div class="koma-table-highlight-banner highlight-banner-where"><span>🛑 Row count bounded and capped by LIMIT</span></div>';
        }
      }
    },

    clearClauseHighlight: function() {
      const table = document.getElementById('komaResultsTable');
      const mount = document.getElementById('komaTableHighlightMount');
      if (table) {
        table.classList.remove('has-highlight');
        table.querySelectorAll('.col-active').forEach(el => el.classList.remove('col-active'));
        table.querySelectorAll('.row-active-where').forEach(el => el.classList.remove('row-active-where'));
      }
      document.querySelectorAll('.koma-clause-chip.active').forEach(el => el.classList.remove('active'));
      if (mount) {
        mount.innerHTML = '';
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

          if (diag && diag.autoFixAvailable) {
            this.showAutofixBanner(diag);
          } else {
            this.dismissAutofixBanner();
          }
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

    toggleQueryExplainer: function() {
      isExplainerOpen = !isExplainerOpen;
      if (isExplainerOpen) {
        this.updateQueryExplainer();
        if (window.soundFX && typeof window.soundFX.playPop === 'function') {
          try { window.soundFX.playPop(); } catch(e) {}
        }
      } else {
        const box = document.getElementById('komaExplainerMount');
        if (box) box.innerHTML = '';
      }
    },

    updateQueryExplainer: function() {
      const box = document.getElementById('komaExplainerMount');
      const textarea = document.getElementById('komaSqlEditor');
      if (!box || !textarea) return;

      if (!isExplainerOpen) {
        box.innerHTML = '';
        return;
      }

      const query = textarea.value;
      if (window.SQL_EXPLAINER) {
        const res = window.SQL_EXPLAINER.explain(query);
        box.innerHTML = window.SQL_EXPLAINER.renderExplainerCardHtml(res);
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
