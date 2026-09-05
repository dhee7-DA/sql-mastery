// =============================================================================
// CASE STUDY DEEP-DIVE DOSSIER ENGINE (BEGINNER-FRIENDLY & FULL-SPECTRUM COLOR)
// Features:
// 1. Full-Spectrum SQL Syntax Highlighter: EVERY token (Columns, Tables, Keywords,
//    Strings, Numbers, Aliases, Booleans, Operators, Punctuation) is color-coded.
//    ZERO PLAIN WHITE TEXT.
// 2. Interactive hover tooltips & click-to-open glossary flashcards for every term.
// 3. ELI5 (Explain Like I'm 5) everyday real-world analogies.
// =============================================================================

window.CASE_DOSSIER_ENGINE = (() => {

  // Dictionary of SQL keywords with beginner-friendly meanings and colors
  const SQL_KEYWORDS = {
    'SELECT': { color: '#38bdf8', meaning: 'Projection [Pick which columns to show on your screen]' },
    'FROM': { color: '#c084fc', meaning: 'Table Source [Which database table to open]' },
    'WHERE': { color: '#34d399', meaning: 'Filter Rule [The bouncer: only keep rows where this is TRUE]' },
    'AND': { color: '#10b981', meaning: 'Conjunction [BOTH conditions must be true together]' },
    'OR': { color: '#fb923c', meaning: 'Disjunction [At least ONE condition must be true]' },
    'ORDER BY': { color: '#fbbf24', meaning: 'Sort Rule [Put rows in sequence: A-Z or high-to-low]' },
    'ORDER': { color: '#fbbf24', meaning: 'Sort Rule [Put rows in sequence]' },
    'BY': { color: '#fbbf24', meaning: 'By column identifier' },
    'LIMIT': { color: '#f472b6', meaning: 'Row Cap [Stop after N rows to save time and memory]' },
    'ASC': { color: '#fde047', meaning: 'Ascending [Lowest to highest: 1, 2, 3... or A to Z]' },
    'DESC': { color: '#fde047', meaning: 'Descending [Highest to lowest: largest numbers or Z to A]' },
    'LIKE': { color: '#fb7185', meaning: 'Pattern Match [Search text with % wildcards]' },
    'NOT': { color: '#f87171', meaning: 'Negation [Invert: true becomes false, false becomes true]' },
    'IS': { color: '#818cf8', meaning: 'Identity check [Used exclusively with NULL or NOT NULL]' },
    'NULL': { color: '#f87171', meaning: 'Missing / Unknown value [NOT zero and NOT empty text]' },
    'DISTINCT': { color: '#2dd4bf', meaning: 'De-duplicate [Remove identical duplicate rows]' },
    'CASE': { color: '#c084fc', meaning: 'Conditional logic [Like an IF-THEN statement in Excel]' },
    'WHEN': { color: '#c084fc', meaning: 'When condition [If this specific test is true]' },
    'THEN': { color: '#c084fc', meaning: 'Then value [Return this result if the test passed]' },
    'ELSE': { color: '#c084fc', meaning: 'Fallback value [What to return if no WHEN conditions matched]' },
    'END': { color: '#c084fc', meaning: 'End of CASE statement' },
    'IN': { color: '#fb7185', meaning: 'List match [True if the column matches any item in the list]' },
    'BETWEEN': { color: '#fb7185', meaning: 'Range check [True if value is between low and high numbers]' },
    'REGEXP': { color: '#fb7185', meaning: 'Regular Expression [Advanced pattern matching with regex]' },
    'COALESCE': { color: '#38bdf8', meaning: 'Fallback helper [Returns the first non-NULL value found]' },
    'AS': { color: '#38bdf8', meaning: 'Alias Keyword [Renames this column in the final report]' },
    'JOIN': { color: '#c084fc', meaning: 'Table Join [Connect rows from two tables together]' },
    'INNER': { color: '#c084fc', meaning: 'Inner Join [Keep only matching rows from both tables]' },
    'LEFT': { color: '#c084fc', meaning: 'Left Join [Keep all left rows even if right is missing]' },
    'RIGHT': { color: '#c084fc', meaning: 'Right Join [Keep all right rows even if left is missing]' },
    'ON': { color: '#34d399', meaning: 'Join Condition [Which columns must match]' }
  };

  // Interactive Glossary Dictionary for Click-to-Learn Flashcards
  const GLOSSARY = {
    'primary_key': {
      term: 'Primary Key (PK)',
      plainMeaning: 'The permanent, unique badge number of a row. No two rows can ever have the same PK.',
      analogy: 'Like your Passport Number, Social Security Number, or Fingerprint. It uniquely identifies you out of 8 billion people.',
      gotcha: 'Never store information that can change (like an email or phone number) as your primary key, because updating it breaks all linked tables!'
    },
    'foreign_key': {
      term: 'Foreign Key (FK)',
      plainMeaning: 'A column in one table that points directly to the Primary Key of another table.',
      analogy: 'Like a coat check ticket stub. The ticket in your pocket (FK) points to the exact hanger (PK) where your jacket is stored.',
      gotcha: 'If you try to insert an order with a customer_id that does not exist in the Customers table, the database throws a Foreign Key constraint error!'
    },
    'predicate': {
      term: 'Predicate [Filtering Rule]',
      plainMeaning: 'The test inside the WHERE clause that checks if a row should stay or be thrown away.',
      analogy: 'Like a club bouncer checking IDs at the door: "Is age >= 21?". If YES, enter; if NO, walk away.',
      gotcha: 'A predicate evaluates to TRUE, FALSE, or NULL. Rows only survive if the predicate evaluates to TRUE!'
    },
    'projection': {
      term: 'Projection [Pick Columns]',
      plainMeaning: 'Telling the database which specific columns you want in your final report.',
      analogy: 'Like ordering at a restaurant: you only want the burger and fries, not the whole kitchen inventory list.',
      gotcha: 'Writing "SELECT *" projects every single column on disk. In big companies, this can transfer gigabytes of useless data across the network!'
    },
    'tuple': {
      term: 'Tuple [Single Row]',
      plainMeaning: 'One horizontal line of data across all columns in a table.',
      analogy: 'One individual contact card in your phone’s address book containing name, number, and address.',
      gotcha: 'Relational databases do NOT store tuples in any guaranteed order on disk unless you explicitly use ORDER BY.'
    },
    'deterministic': {
      term: 'Deterministic Sorting [Predictable Order]',
      plainMeaning: 'A sort query that ALWAYS returns the exact same row order every single time it runs.',
      analogy: 'If two students both have a score of 95, alphabetical ordering by their last name breaks the tie so the teacher never gets confused.',
      gotcha: 'If you paginate with LIMIT 10 OFFSET 10 without sorting by a unique column like ID, rows can shift and appear twice!'
    },
    'sargable': {
      term: 'SARGable [Search-Argument-Able]',
      plainMeaning: 'A WHERE condition written so the database can zoom directly to the answer using an index instead of reading every row.',
      analogy: 'Looking up "Smith" in the white pages phone book alphabetically (fast) vs reading all 500,000 names from page 1 to find people whose name contains "ith" (slow).',
      gotcha: 'Writing "WHERE YEAR(order_date) = 2026" ruins the index! Write "WHERE order_date >= \'2026-01-01\' AND order_date < \'2027-01-01\'" instead.'
    },
    'null': {
      term: 'NULL [Unknown / Missing Value]',
      plainMeaning: 'Represents the total absence of data. It is NOT zero, and it is NOT empty text "".',
      analogy: 'An empty blank space on a paper form where someone skipped the question.',
      gotcha: 'NULL = NULL is FALSE! You must always write "IS NULL" or "IS NOT NULL" to check for missing values.'
    },
    'btree': {
      term: 'B-Tree Index [Quick-Search Tree]',
      plainMeaning: 'An on-disk tree structure that lets the database find 1 row out of 100,000,000 rows in just 3 disk hops.',
      analogy: 'The alphabetical index at the very back of a 1,000-page textbook.',
      gotcha: 'Indexes make SELECT queries lightning fast, but every INSERT or UPDATE must also update the index, making heavy writes slightly slower.'
    },
    'cardinality': {
      term: 'Cardinality [Relationship Multiplicity]',
      plainMeaning: 'The counting rule between two tables: One-to-One (1:1), One-to-Many (1:N), or Many-to-Many (N:N).',
      analogy: 'One mother can have many children (1 : N). Each child has one birth mother (N : 1).',
      gotcha: 'Joining two tables with a 1 : N relationship duplicates the parent rows for every child record found!'
    }
  };

  // FULL-SPECTRUM SQL TOKENIZER & HIGHLIGHTER (ZERO PLAIN WHITE TEXT, ZERO CORRUPTION)
  function highlightSQL(sql) {
    if (!sql) return '';

    const KEYWORD_COLORS = {
      'SELECT': { color: '#38bdf8', meaning: 'SELECT [Choose Columns]' },
      'FROM': { color: '#c084fc', meaning: 'FROM [Table Source]' },
      'WHERE': { color: '#34d399', meaning: 'WHERE [Row Filter]' },
      'JOIN': { color: '#f472b6', meaning: 'JOIN [Combine Tables]' },
      'INNER JOIN': { color: '#f472b6', meaning: 'INNER JOIN [Matching Rows Only]' },
      'LEFT JOIN': { color: '#f472b6', meaning: 'LEFT JOIN [Keep All Left Rows]' },
      'RIGHT JOIN': { color: '#f472b6', meaning: 'RIGHT JOIN [Keep All Right Rows]' },
      'FULL JOIN': { color: '#f472b6', meaning: 'FULL JOIN [Keep All Rows from Both]' },
      'CROSS JOIN': { color: '#f472b6', meaning: 'CROSS JOIN [Cartesian Product]' },
      'ON': { color: '#c084fc', meaning: 'ON [Join Condition]' },
      'AND': { color: '#a78bfa', meaning: 'AND [Both Must Be True]' },
      'OR': { color: '#f59e0b', meaning: 'OR [Either Can Be True]' },
      'NOT': { color: '#f87171', meaning: 'NOT [Invert Condition]' },
      'IN': { color: '#a78bfa', meaning: 'IN [Value in Set List]' },
      'LIKE': { color: '#fb7185', meaning: 'LIKE [Pattern Match]' },
      'BETWEEN': { color: '#a78bfa', meaning: 'BETWEEN [Range Check: Low AND High]' },
      'IS': { color: '#a78bfa', meaning: 'IS [Null State Check]' },
      'NULL': { color: '#f87171', meaning: 'NULL [Missing / Unknown Value]' },
      'ORDER BY': { color: '#fbbf24', meaning: 'ORDER BY [Sort Sequence]' },
      'ORDER': { color: '#fbbf24', meaning: 'ORDER [Sort Sequence]' },
      'BY': { color: '#fbbf24', meaning: 'BY [Sort Specifier]' },
      'GROUP BY': { color: '#fbbf24', meaning: 'GROUP BY [Aggregate Buckets]' },
      'GROUP': { color: '#fbbf24', meaning: 'GROUP [Bucket Key]' },
      'HAVING': { color: '#f59e0b', meaning: 'HAVING [Group Aggregation Filter]' },
      'LIMIT': { color: '#38bdf8', meaning: 'LIMIT [Slice First N Rows]' },
      'OFFSET': { color: '#38bdf8', meaning: 'OFFSET [Skip First N Rows]' },
      'CASE': { color: '#fbbf24', meaning: 'CASE [Conditional Expression]' },
      'WHEN': { color: '#38bdf8', meaning: 'WHEN [Condition Branch]' },
      'THEN': { color: '#34d399', meaning: 'THEN [Result if True]' },
      'ELSE': { color: '#f87171', meaning: 'ELSE [Fallback Value]' },
      'END': { color: '#fbbf24', meaning: 'END [Close CASE Expression]' },
      'AS': { color: '#38bdf8', meaning: 'AS [Rename Output Column]' },
      'DISTINCT': { color: '#38bdf8', meaning: 'DISTINCT [Deduplicate Identical Rows]' },
      'ASC': { color: '#a3e635', meaning: 'ASC [Ascending: Small to Large / A-Z]' },
      'DESC': { color: '#fb7185', meaning: 'DESC [Descending: Large to Small / Z-A]' },
      'COUNT': { color: '#38bdf8', meaning: 'COUNT [Count Number of Rows]' },
      'SUM': { color: '#38bdf8', meaning: 'SUM [Add Column Numbers]' },
      'AVG': { color: '#38bdf8', meaning: 'AVG [Average Mean Value]' },
      'MIN': { color: '#38bdf8', meaning: 'MIN [Smallest Value]' },
      'MAX': { color: '#38bdf8', meaning: 'MAX [Largest Value]' },
      'LENGTH': { color: '#38bdf8', meaning: 'LENGTH [Count Characters]' },
      'RIGHT': { color: '#38bdf8', meaning: 'RIGHT [Extract Suffix Characters]' },
      'LEFT': { color: '#38bdf8', meaning: 'LEFT [Extract Prefix Characters]' },
      'SUBSTRING': { color: '#38bdf8', meaning: 'SUBSTRING [Extract Substring Slice]' },
      'CONCAT': { color: '#38bdf8', meaning: 'CONCAT [Combine Text Strings]' },
      'REGEXP': { color: '#fb7185', meaning: 'REGEXP [Regular Expression]' },
      'OVER': { color: '#c084fc', meaning: 'OVER [Window Function Boundary]' },
      'PARTITION': { color: '#c084fc', meaning: 'PARTITION BY [Window Buckets]' },
      'ROW_NUMBER': { color: '#38bdf8', meaning: 'ROW_NUMBER [Unique 1..N Row Rank]' },
      'DENSE_RANK': { color: '#38bdf8', meaning: 'DENSE_RANK [Rank Without Gaps]' },
      'RANK': { color: '#38bdf8', meaning: 'RANK [Rank with Tied Gaps]' },
      'TRUE': { color: '#10b981', meaning: 'Boolean TRUE (1)' },
      'FALSE': { color: '#ef4444', meaning: 'Boolean FALSE (0)' }
    };

    function esc(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    const tokenRegex = /('(?:[^'\\]|\\.)*')|(\b(?:ORDER\s+BY|GROUP\s+BY|IS\s+NOT\s+NULL|IS\s+NULL)\b)|([a-zA-Z_][a-zA-Z0-9_]*)|(\d+(?:\.\d+)?)|(>=|<=|!=|<>|=|>|<|\+|-|\*|\/)|([,;()])/gi;

    let lastIndex = 0;
    let result = '';
    let match;
    let lastKeyword = '';

    while ((match = tokenRegex.exec(sql)) !== null) {
      if (match.index > lastIndex) {
        result += esc(sql.slice(lastIndex, match.index));
      }
      lastIndex = tokenRegex.lastIndex;

      const [raw, strVal, multiKwVal, wordVal, numVal, opVal, punctVal] = match;

      if (strVal !== undefined) {
        result += `<span class="sql-token-str" style="color: #fde68a; font-weight: 600;" title="Text String Literal">${esc(strVal)}</span>`;
      } else if (multiKwVal !== undefined) {
        const kwNorm = multiKwVal.replace(/\s+/g, ' ').toUpperCase();
        const kwInfo = KEYWORD_COLORS[kwNorm] || { color: '#fbbf24', meaning: kwNorm };
        result += `<span class="sql-token-kw" style="color: ${kwInfo.color}; font-weight: 800; cursor: help; text-decoration: underline dotted;" title="${esc(kwInfo.meaning)}">${esc(multiKwVal.toUpperCase())}</span>`;
        lastKeyword = kwNorm;
      } else if (wordVal !== undefined) {
        const wUpper = wordVal.toUpperCase();
        if (KEYWORD_COLORS[wUpper]) {
          const kwInfo = KEYWORD_COLORS[wUpper];
          result += `<span class="sql-token-kw" style="color: ${kwInfo.color}; font-weight: 800; cursor: help; text-decoration: underline dotted;" title="${esc(kwInfo.meaning)}">${wUpper}</span>`;
          lastKeyword = wUpper;
        } else if (lastKeyword === 'FROM' || lastKeyword === 'JOIN') {
          result += `<span class="sql-token-table" style="color: #f472b6; font-weight: 700; text-shadow: 0 0 8px rgba(244,114,182,0.25);" title="Table Name [File on disk storing records]">🏷️ ${esc(wordVal)}</span>`;
          lastKeyword = '';
        } else if (lastKeyword === 'AS') {
          result += `<span class="sql-token-alias" style="color: #2dd4bf; font-weight: 700; text-decoration: underline wavy #2dd4bf;" title="Column Alias [Renamed field]">✨ ${esc(wordVal)}</span>`;
          lastKeyword = '';
        } else {
          result += `<span class="sql-token-col" style="color: #67e8f9; font-weight: 600;" title="Column [Field in table]">${esc(wordVal)}</span>`;
        }
      } else if (numVal !== undefined) {
        result += `<span class="sql-token-num" style="color: #a3e635; font-weight: 700;" title="Numeric Value">${esc(numVal)}</span>`;
      } else if (opVal !== undefined) {
        result += `<span class="sql-token-op" style="color: #fb7185; font-weight: 700;" title="Operator [Comparison or Math]">${esc(opVal)}</span>`;
      } else if (punctVal !== undefined) {
        result += `<span class="sql-token-punct" style="color: #94a3b8; font-weight: 600;">${esc(punctVal)}</span>`;
      }
    }

    if (lastIndex < sql.length) {
      result += esc(sql.slice(lastIndex));
    }

    return result;
  }

  // ELI5 Story Metaphors for every case study
  function getEli5Story(cs) {
    if (!cs) return '';

    const industryStories = {
      'Fintech': `💳 <strong>Shopping Checkout Bouncer:</strong> Imagine you are at a grocery store checkout tapping your debit card. In less than 10 milliseconds, the card machine must look up your record in <code>${cs.table}</code> to check: <em>"Is this card frozen?"</em> and <em>"Did this purchase exceed your daily limit?"</em> If the check passes, the register beeps and you take your groceries home!`,
      'SaaS': `☁️ <strong>Office Keycard Scanner:</strong> Imagine you swipe your badge at a corporate office door. The computer looks up <code>${cs.table}</code> to check if your department paid for your active user seat. If active, the door unlocks; if not, access is denied.`,
      'Retail': `🛒 <strong>Supermarket Warehouse Conveyor:</strong> When you press "Buy Now" on an online order, a robotic conveyor in <code>${cs.table}</code> rolls down the aisle to verify items are in stock and marks the order as ready to pack into cardboard boxes.`,
      'Healthcare': `🏥 <strong>Doctor's Prescription Pad:</strong> Before a nurse gives medicine to a hospital bed, they scan the patient's bracelet. The computer checks <code>${cs.table}</code> to verify the doctor's dosage so the patient gets the exact safe amount.`,
      'Logistics': `🚚 <strong>Airport Baggage Barcode:</strong> When you drop your luggage at check-in, a laser scanner logs the bag in <code>${cs.table}</code> so cargo handlers load it onto the correct airplane without losing it.`,
      'Media': `🎬 <strong>Netflix Play Button:</strong> When you press Play on a movie, the streaming server reads <code>${cs.table}</code> to resume playback from the exact second you stopped watching last night.`,
      'Security': `🛡️ <strong>Airport Metal Detector:</strong> Every login attempt from a laptop or phone is inspected in <code>${cs.table}</code>. If someone tries the wrong password 5 times from another country, the firewall locks the account immediately.`,
      'Hardware': `⚡ <strong>Smart Car Dashboard Alert:</strong> Every 5 seconds, sensors inside a smart vehicle send temperature and battery readings into <code>${cs.table}</code>. If the battery overheats, an alert flashes on the dashboard.`,
      'HR': `👔 <strong>Payday Direct Deposit:</strong> On the 1st of every month, the accounting department scans <code>${cs.table}</code> to calculate salary checks, subtract taxes, and deposit cash directly into employee bank accounts.`,
      'Platforms': `🚗 <strong>Ride Hailing Matchmaker:</strong> When you request an Uber ride, the app searches <code>${cs.table}</code> to find nearby available drivers with high star ratings and sends the closest driver to your pickup location.`
    };

    return industryStories[cs.industry] || `🏢 <strong>Real-World Story:</strong> The team at ${cs.industry} queries <code>${cs.table}</code> to answer: <em>"${cs.businessObjective}"</em> so their production systems stay fast and reliable.`;
  }

  // Deconstruct query into plain-English line-by-line breakdown
  function deconstructQuery(sql) {
    if (!sql) return [];
    const lines = sql.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const breakdown = [];

    lines.forEach(line => {
      let clauseType = 'EXPRESSION';
      let plainMeaning = '';

      if (line.toUpperCase().startsWith('SELECT')) {
        clauseType = 'Projection [Pick Columns]';
        plainMeaning = 'Tells the database engine exactly which columns to pluck out of memory and show on your screen.';
      } else if (line.toUpperCase().startsWith('FROM')) {
        clauseType = 'Data Source [Table Location]';
        plainMeaning = 'Points to the physical table on disk where the raw rows are stored.';
      } else if (line.toUpperCase().startsWith('WHERE')) {
        clauseType = 'Filter Gate [Row Predicate]';
        plainMeaning = 'The bouncer: tests every row one-by-one. If the test evaluates to TRUE, the row stays. If FALSE or NULL, it is dropped.';
      } else if (line.toUpperCase().startsWith('AND')) {
        clauseType = 'Strict Conjunction [AND Rule]';
        plainMeaning = 'BOTH conditions must be true together. If either side fails, the whole row is rejected.';
      } else if (line.toUpperCase().startsWith('OR')) {
        clauseType = 'Flexible Disjunction [OR Rule]';
        plainMeaning = 'Row survives if AT LEAST ONE of the conditions is true.';
      } else if (line.toUpperCase().startsWith('ORDER BY')) {
        clauseType = 'Sort Sequence [Ordering]';
        plainMeaning = 'Re-arranges the surviving rows into predictable sequence (e.g. highest dollar amount first, or A to Z).';
      } else if (line.toUpperCase().startsWith('LIMIT')) {
        clauseType = 'Row Cap [Stop Condition]';
        plainMeaning = 'Tells the database engine to immediately stop scanning and return after reaching this exact row count.';
      } else {
        clauseType = 'Filter / Expression';
        plainMeaning = 'Column selection or condition filter expression.';
      }

      breakdown.push({
        rawLine: line,
        highlightedLine: highlightSQL(line),
        clauseType: clauseType,
        plainMeaning: plainMeaning
      });
    });

    return breakdown;
  }

  // Generate plain-English interview pitfalls
  function generateInterviewPitfalls(cs) {
    const query = cs.targetQuery || '';
    const pitfalls = [];

    if (query.includes('NULL') || query.includes('is_') || query.includes('status')) {
      pitfalls.push({
        title: '⚠️ The NULL Trap [Unknown Value, Not Zero]',
        explanation: 'In SQL, NULL means "I do not know the answer". It is NOT zero and NOT empty text. If you write <code>WHERE column = NULL</code>, it will ALWAYS return 0 rows because nothing equals an unknown! You MUST use <code>IS NULL</code> or <code>IS NOT NULL</code>.'
      });
    }

    if (query.includes('AND') && query.includes('OR')) {
      pitfalls.push({
        title: '⚠️ The AND vs OR Trap [Order of Operations / Precedence]',
        explanation: 'SQL evaluates <code>AND</code> before <code>OR</code>, just like multiplication runs before addition in math! If you do not wrap your OR conditions in parentheses <code>(status = \'A\' OR status = \'B\') AND amount > 100</code>, you will leak rows you did not intend to see.'
      });
    }

    if (query.includes('LIKE')) {
      pitfalls.push({
        title: '⚠️ The Wildcard Trap [Fast Index vs Slow Full Scan]',
        explanation: 'Writing <code>LIKE \'%text\'</code> forces the database to read every single row in the whole table because it cannot use an alphabetical index starting from the middle! Always prefer prefix searches <code>LIKE \'text%\'</code> when speed matters.'
      });
    }

    if (query.includes('ORDER BY')) {
      pitfalls.push({
        title: '⚠️ Sorting Ties [Deterministic / Predictable Order]',
        explanation: 'If two rows have the same value (e.g. two customers with equal $500 balance), the database orders them randomly on ties! In production, always add a secondary unique column like <code>ORDER BY balance DESC, customer_id ASC</code> so pagination never scrambles.'
      });
    }

    // Default pitfall if none triggered
    if (pitfalls.length === 0) {
      pitfalls.push({
        title: '⚠️ SARGability [Search-Friendly Filtering]',
        explanation: 'Never wrap column names inside functions in your WHERE clause (like <code>WHERE UPPER(name) = \'ALICE\'</code>), because it blinds the database index and turns a 1-millisecond search into a 10-second full table scan.'
      });
    }

    return pitfalls;
  }

  function getDossier(caseIdOrCs) {
    const caseId = (caseIdOrCs && typeof caseIdOrCs === 'object') ? caseIdOrCs.id : caseIdOrCs;
    const allCases = window.ALL_500_CASE_STUDIES || window.ALL_300_CASE_STUDIES || [];
    const cs = (caseIdOrCs && typeof caseIdOrCs === 'object') ? caseIdOrCs : (allCases.find(c => c.id === caseId) || allCases[0]);
    if (!cs) return null;

    const queryBreakdown = deconstructQuery(cs.targetQuery);
    const pitfalls = generateInterviewPitfalls(cs);
    const eli5Story = getEli5Story(cs);

    const difficulty = cs.difficulty || 'Easy';
    const diffColors = {
      'Easy': { badge: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: '#10b981', label: '🟢 Easy &bull; Foundations' },
      'Medium': { badge: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: '#f59e0b', label: '🟡 Medium &bull; Production Standard' },
      'Hard': { badge: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)', border: '#ef4444', label: '🔴 Hard &bull; Senior Edge Cases' }
    };
    const diffMeta = diffColors[difficulty] || diffColors['Easy'];

    return {
      case: cs,
      diffMeta: diffMeta,
      eli5Story: eli5Story,
      queryBreakdown: queryBreakdown,
      pitfalls: pitfalls,
      table: cs.table,
      schemaSnippet: cs.schemaSnippet,
      highlightedQuery: highlightSQL(cs.targetQuery)
    };
  }

  // Open Word Glossary Flashcard Modal
  function openGlossaryFlashcard(termKey) {
    const item = GLOSSARY[termKey];
    const modal = document.getElementById('glossaryModal');
    const content = document.getElementById('glossaryContent');
    if (!modal || !content || !item) return;

    content.innerHTML = `
      <div class="glossary-card-inner">
        <div class="glossary-card-header">
          <span style="font-size: 20px;">🎓</span>
          <h3 style="font-size: 18px; font-weight: 700; color: #38bdf8; margin: 0;">${escapeHtml(item.term)}</h3>
          <button class="dossier-close-btn" onclick="CASE_DOSSIER_ENGINE.closeGlossaryFlashcard()">&times;</button>
        </div>
        
        <div class="glossary-section">
          <div class="glossary-label">📖 Plain-English Meaning:</div>
          <p class="glossary-text">${escapeHtml(item.plainMeaning)}</p>
        </div>

        <div class="glossary-section" style="background: rgba(56, 189, 248, 0.08); border-left: 3px solid #38bdf8; padding: 10px 14px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
          <div class="glossary-label" style="color: #38bdf8;">💡 Real-World Metaphor:</div>
          <p class="glossary-text" style="color: #e0f2fe; margin: 0;">${escapeHtml(item.analogy)}</p>
        </div>

        <div class="glossary-section" style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 10px 14px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
          <div class="glossary-label" style="color: #f87171;">⚠️ FAANG Interview Gotcha / Common Trap:</div>
          <p class="glossary-text" style="color: #fee2e2; margin: 0;">${escapeHtml(item.gotcha)}</p>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
  }

  function closeGlossaryFlashcard() {
    const modal = document.getElementById('glossaryModal');
    if (modal) modal.style.display = 'none';
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

  return {
    highlightSQL,
    getDossier,
    getEli5Story,
    deconstructQuery,
    generateInterviewPitfalls,
    openGlossaryFlashcard,
    closeGlossaryFlashcard,
    GLOSSARY,
    SQL_KEYWORDS
  };

})();
