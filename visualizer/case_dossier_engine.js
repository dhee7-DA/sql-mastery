// =============================================================================
// CASE STUDY DEEP-DIVE DOSSIER ENGINE (BEGINNER-FRIENDLY EDITION)
// Features:
// 1. SQL Syntax Highlighter with vibrant, contrasting keyword tokens & hover definitions.
// 2. Plain-English translations with bracketed meanings next to all technical terms.
// 3. Beginner Mnemonic glossary & interview traps explained without scary jargon.
// =============================================================================

window.CASE_DOSSIER_ENGINE = (() => {

  // Dictionary of SQL keywords with beginner-friendly meanings
  const SQL_KEYWORDS = {
    'SELECT': { color: '#38bdf8', meaning: 'Projection [Pick which columns to show on your screen]' },
    'FROM': { color: '#c084fc', meaning: 'Table Source [Which table to open]' },
    'WHERE': { color: '#34d399', meaning: 'Filter Rule [Only keep rows where this condition is TRUE]' },
    'AND': { color: '#10b981', meaning: 'Conjunction [BOTH conditions must be true together]' },
    'OR': { color: '#fb923c', meaning: 'Disjunction [At least ONE condition must be true]' },
    'ORDER BY': { color: '#fbbf24', meaning: 'Sort Rule [Put rows in sequence: A-Z or high-to-low]' },
    'ORDER': { color: '#fbbf24', meaning: 'Sort Rule [Put rows in sequence]' },
    'BY': { color: '#fbbf24', meaning: 'By column identifier' },
    'LIMIT': { color: '#f472b6', meaning: 'Row Cap [Stop after N rows to save memory and time]' },
    'ASC': { color: '#fde047', meaning: 'Ascending [Lowest to highest: 1, 2, 3... or A to Z]' },
    'DESC': { color: '#fde047', meaning: 'Descending [Highest to lowest: largest numbers or Z to A]' },
    'LIKE': { color: '#fb7185', meaning: 'Pattern Match [Search text with % wildcards]' },
    'NOT': { color: '#f87171', meaning: 'Negation [Invert: true becomes false, false becomes true]' },
    'IS': { color: '#818cf8', meaning: 'Identity check [Used exclusively with NULL or NOT NULL]' },
    'NULL': { color: '#f87171', meaning: 'Missing / Unknown value [NOT zero and NOT empty text]' },
    'DISTINCT': { color: '#2dd4bf', meaning: 'De-duplicate [Remove identical duplicate rows]' },
    'CASE': { color: '#c084fc', meaning: 'Conditional logic [Like an IF-THEN statement in Excel or code]' },
    'WHEN': { color: '#c084fc', meaning: 'When condition [If this specific test is true]' },
    'THEN': { color: '#c084fc', meaning: 'Then value [Return this result if the test passed]' },
    'ELSE': { color: '#c084fc', meaning: 'Fallback value [What to return if no WHEN conditions matched]' },
    'END': { color: '#c084fc', meaning: 'End of CASE statement' },
    'IN': { color: '#fb7185', meaning: 'List match [True if the column matches any item in the list]' },
    'BETWEEN': { color: '#fb7185', meaning: 'Range check [True if value is between low and high numbers]' },
    'REGEXP': { color: '#fb7185', meaning: 'Regular Expression [Advanced pattern matching with regex]' },
    'COALESCE': { color: '#38bdf8', meaning: 'Fallback helper [Returns the first non-NULL value found]' }
  };

  // Syntax highlight any raw SQL query with colorful, interactive tokens
  function highlightSQL(sql) {
    if (!sql) return '';

    // Tokenize strings, numbers, keywords, operators
    // 1. Replace strings temporarily with placeholders to protect their content
    const strings = [];
    let processed = sql.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, (match) => {
      strings.push(match);
      return `___STR_${strings.length - 1}___`;
    });

    // 2. Escape HTML entities
    processed = processed
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 3. Highlight Operators
    processed = processed.replace(/(&gt;=|&lt;=|!=|&lt;&gt;|=|&gt;|&lt;|\+|-|\*|\/)/g, match => {
      return `<span class="sql-token-op" style="color: #fb7185; font-weight: 700;">${match}</span>`;
    });

    // 4. Highlight Numbers
    processed = processed.replace(/\b(\d+(\.\d+)?)\b/g, match => {
      return `<span class="sql-token-num" style="color: #a3e635; font-weight: 600;">${match}</span>`;
    });

    // 5. Highlight multi-word keywords first (e.g. ORDER BY, IS NULL, IS NOT NULL)
    processed = processed.replace(/\bIS\s+NOT\s+NULL\b/gi, match => {
      return `<span class="sql-token-kw" title="IS NOT NULL: Column must have a real value (not missing)" style="color: #818cf8; font-weight: 800; cursor: help; text-decoration: underline dotted;">${match}</span>`;
    });
    processed = processed.replace(/\bIS\s+NULL\b/gi, match => {
      return `<span class="sql-token-kw" title="IS NULL: Checks for missing or unknown values" style="color: #f87171; font-weight: 800; cursor: help; text-decoration: underline dotted;">${match}</span>`;
    });
    processed = processed.replace(/\bORDER\s+BY\b/gi, match => {
      return `<span class="sql-token-kw" title="ORDER BY [Sort rows in sequence]" style="color: #fbbf24; font-weight: 800; cursor: help; text-decoration: underline dotted;">${match}</span>`;
    });

    // 6. Highlight individual keywords
    Object.keys(SQL_KEYWORDS).forEach(kw => {
      if (kw === 'ORDER BY' || kw === 'ORDER' || kw === 'BY') return;
      const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
      const info = SQL_KEYWORDS[kw];
      processed = processed.replace(regex, match => {
        return `<span class="sql-token-kw" title="${escapeHtml(info.meaning)}" style="color: ${info.color}; font-weight: 800; cursor: help; text-decoration: underline dotted;">${match.toUpperCase()}</span>`;
      });
    });

    // Handle ORDER and BY separately if still present
    processed = processed.replace(/\b(ORDER)\b/gi, match => `<span class="sql-token-kw" style="color: #fbbf24; font-weight: 800;">${match.toUpperCase()}</span>`);
    processed = processed.replace(/\b(BY)\b/gi, match => `<span class="sql-token-kw" style="color: #fbbf24; font-weight: 800;">${match.toUpperCase()}</span>`);

    // 7. Restore Strings with warm golden color
    strings.forEach((str, idx) => {
      const escapedStr = escapeHtml(str);
      const replacement = `<span class="sql-token-str" style="color: #fde68a; font-weight: 500;">${escapedStr}</span>`;
      processed = processed.replace(`___STR_${idx}___`, replacement);
    });

    return processed;
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

  // Deconstruct query into plain-English line-by-line breakdown
  function deconstructQuery(sql) {
    if (!sql) return [];
    const lines = sql.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const breakdown = [];

    lines.forEach(line => {
      let clauseType = 'EXPRESSION';
      let tagColor = '#94a3b8';
      let plainMeaning = '';
      let beginnerExplanation = '';

      if (/^SELECT\b/i.test(line)) {
        clauseType = 'SELECT';
        tagColor = '#38bdf8'; // Cyan
        plainMeaning = 'Projection [Pick Columns]';
        beginnerExplanation = 'Tells the database: "Show me only these specific columns on my screen" (like Name and Salary), instead of cluttering your screen with everything.';
      } else if (/^FROM\b/i.test(line)) {
        clauseType = 'FROM';
        tagColor = '#c084fc'; // Violet
        plainMeaning = 'Source Table [Which Table]';
        beginnerExplanation = 'Tells the database: "Look inside this specific table" to find the records you want to read.';
      } else if (/^WHERE\b/i.test(line)) {
        clauseType = 'WHERE';
        tagColor = '#34d399'; // Emerald
        plainMeaning = 'Filter Rule [Predicate / Condition]';
        beginnerExplanation = 'The gatekeeper rule: checks every row one by one. Only rows where this rule is TRUE are kept; any row that fails is immediately thrown out.';
      } else if (/^AND\b/i.test(line)) {
        clauseType = 'AND';
        tagColor = '#10b981'; // Mint Green
        plainMeaning = 'Conjunction [Both Rules Must Pass]';
        beginnerExplanation = 'Adds a mandatory second condition: BOTH the first rule AND this rule must be true at the same time for the row to survive.';
      } else if (/^OR\b/i.test(line)) {
        clauseType = 'OR';
        tagColor = '#fb923c'; // Warm Orange
        plainMeaning = 'Disjunction [Either Rule Can Pass]';
        beginnerExplanation = 'Adds a flexible choice: if EITHER the first rule OR this rule is true, the row survives and is included.';
      } else if (/^ORDER\s+BY\b/i.test(line)) {
        clauseType = 'ORDER BY';
        tagColor = '#fbbf24'; // Sunset Amber
        plainMeaning = 'Sort Sequence [Row Order]';
        beginnerExplanation = 'Puts your final results in order from top to bottom. DESC puts the largest/highest first; ASC puts smallest/A-to-Z first.';
      } else if (/^LIMIT\b/i.test(line)) {
        clauseType = 'LIMIT';
        tagColor = '#f472b6'; // Hot Pink
        plainMeaning = 'Row Cap [Stop After N Rows]';
        beginnerExplanation = 'Cuts off the results: stops reading and returns only the top N rows (e.g. LIMIT 5 means show only the top 5).';
      } else {
        plainMeaning = 'Condition Expression [Rule Details]';
        beginnerExplanation = 'Specific comparison test checking values, text matching, or numerical ranges.';
      }

      breakdown.push({
        line: line,
        highlightedLine: highlightSQL(line),
        type: clauseType,
        tagColor: tagColor,
        plainMeaning: plainMeaning,
        explanation: beginnerExplanation
      });
    });

    return breakdown;
  }

  // Generate Interview Pitfalls with Bracketed Beginner Meanings
  function generateInterviewPitfalls(cs) {
    const q = (cs.targetQuery || '').toUpperCase();
    const traps = [];

    if (q.includes('NULL') || q.includes('COALESCE') || q.includes('IS NULL')) {
      traps.push({
        title: '⚠️ The NULL Trap [Unknown Value, Not Zero]',
        badge: '3-Valued Logic (3VL)',
        rule: 'In SQL, NULL means "Unknown" or "Missing", NOT zero and NOT an empty text string. Because NULL is unknown, writing `column = NULL` will NEVER work (it results in UNKNOWN, not TRUE), so SQL quietly drops your row! You must always write `IS NULL` or `IS NOT NULL` to check for missing data.',
        color: '#ef4444'
      });
    }

    if (q.includes('AND') && q.includes('OR')) {
      traps.push({
        title: '⚠️ The AND vs OR Trap [Order of Operations / Precedence]',
        badge: 'Operator Precedence',
        rule: 'SQL always checks AND conditions before OR conditions (just like multiplication comes before addition in math: 2 + 3 * 4). If you write: `WHERE country = "USA" OR country = "CAN" AND age > 21`, SQL accidentally groups CAN and age together! Always use round brackets: `WHERE (country = "USA" OR country = "CAN") AND age > 21` so the computer knows your exact intent.',
        color: '#fb923c'
      });
    }

    if (q.includes('LIKE') || q.includes('REGEXP')) {
      traps.push({
        title: '⚠️ The Wildcard Trap [Fast Index Search vs Slow Full Scan]',
        badge: 'SARGable (Search-Friendly)',
        rule: 'When searching text with LIKE, placing the percent sign at the end: `LIKE "apple%"` is super fast because the database uses an index (like looking up words in an alphabetical dictionary). But placing the percent sign first: `LIKE "%apple"` forces the database to read every single word on disk from start to finish (Full Table Scan), which is slow on big databases.',
        color: '#f59e0b'
      });
    }

    if (q.includes('ORDER BY') && !q.includes('LIMIT')) {
      traps.push({
        title: '⚠️ Sorting Ties [Deterministic / Predictable Order]',
        badge: 'Tie-Breaker Rule',
        rule: 'If multiple rows have the exact same salary or score, SQL does not guarantee which one appears first unless you tell it how to break ties! In real apps, always add a unique column as a second sort rule (e.g. `ORDER BY salary DESC, employee_id ASC`) so results stay in the exact same order every time.',
        color: '#38bdf8'
      });
    }

    // Default senior interview trap
    if (traps.length === 0) {
      traps.push({
        title: '⚠️ SARGable Rule [Search Argument Able: Fast Index Lookups]',
        badge: 'Index Optimization',
        rule: 'Avoid wrapping table columns in functions inside your WHERE rule (e.g. avoid writing `WHERE UPPER(status) = "ACTIVE"` or `YEAR(created_at) = 2026`). When you wrap a column in a function, the database can no longer use its fast index, forcing it to inspect every row one by one.',
        color: '#ef4444'
      });
    }

    return traps;
  }

  // Generate complete dossier metadata for a case study
  function getDossier(cs) {
    if (!cs) return null;

    const queryBreakdown = deconstructQuery(cs.targetQuery);
    const pitfalls = generateInterviewPitfalls(cs);

    const difficulty = cs.difficulty || 'Easy';
    const diffColors = {
      'Easy': { badge: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: '#10b981', label: '🟢 Easy &bull; Foundations' },
      'Medium': { badge: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: '#f59e0b', label: '🟡 Medium &bull; Production Standard' },
      'Hard': { badge: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)', border: '#ef4444', label: '🔴 Hard &bull; Senior Edge Cases' }
    };
    const diffMeta = diffColors[difficulty] || diffColors['Easy'];

    // Beginner-friendly incident narrative with brackets
    const companyName = cs.title.split(':')[0] || 'The Company';
    const incidentStory = `
      At <strong>${companyName}</strong>, the engineering team needed to solve a specific data problem: <em>"${cs.businessObjective}"</em>.
      To answer this, they had to query [ask a question to] the <code>${cs.table}</code> table in their database.
      If this query is written incorrectly, the company could send wrong emails to users, report inaccurate revenue numbers, or make slow searches that frustrate customers.
    `;

    return {
      case: cs,
      diffMeta: diffMeta,
      incidentStory: incidentStory,
      queryBreakdown: queryBreakdown,
      pitfalls: pitfalls,
      table: cs.table,
      schemaSnippet: cs.schemaSnippet,
      highlightedQuery: highlightSQL(cs.targetQuery)
    };
  }

  return {
    highlightSQL,
    getDossier,
    deconstructQuery,
    generateInterviewPitfalls,
    SQL_KEYWORDS
  };
})();
