/**
 * SQL MASTERY VISUALIZER - SYNTAX AUTOPSY ENGINE (BUG HUNT & DIAGNOSTIC REPAIR)
 * ----------------------------------------------------------------------------
 * Transforms standard drills into interactive code-review & autopsy challenges.
 * Learner must identify the insidious syntax/logic bug, diagnose the relational
 * violation, and select the exact physical query fix.
 */

(function(window) {
  'use strict';

  // Catalog of realistic interview-grade SQL syntax traps
  const AUTOPSY_MUTATIONS = [
    {
      id: 'null_equality',
      category: 'Predicates & Null Semantics',
      matches: (q) => q.includes('IS NULL') || q.includes('IS NOT NULL'),
      mutate: (q) => q.replace(/IS\s+NULL/gi, '= NULL').replace(/IS\s+NOT\s+NULL/gi, '!= NULL'),
      buggySnippet: '= NULL',
      diagnosis: "Three-Valued Logic (3VL) Violation: In SQL, NULL represents UNKNOWN, not a value. Comparing with '=' yields UNKNOWN (falsy), silently dropping all rows.",
      options: [
        { label: "Replace '= NULL' with ANSI 'IS NULL'", isCorrect: true },
        { label: "Replace '= NULL' with '== NULL'", isCorrect: false },
        { label: "Wrap in COALESCE(col, '= NULL')", isCorrect: false }
      ],
      verdict: "Rule: Always use IS NULL or IS NOT NULL for identity testing in ANSI SQL. Standard equality operators (=, !=, <>) always evaluate to NULL when paired with a NULL operand."
    },
    {
      id: 'aggregate_in_where',
      category: 'Aggregation & Pipeline Ordering',
      matches: (q) => q.includes('HAVING') || (q.includes('GROUP BY') && (q.includes('COUNT(') || q.includes('SUM(') || q.includes('AVG('))),
      mutate: (q) => {
        if (q.includes('HAVING')) {
          return q.replace(/HAVING\s+/gi, 'WHERE ');
        }
        return q.replace(/WHERE\s+([^;]+)\s+GROUP\s+BY/gi, 'WHERE $1 AND COUNT(*) > 1 GROUP BY');
      },
      buggySnippet: 'WHERE ... COUNT(*)',
      diagnosis: "Physical Execution Sequence Violation: The WHERE clause executes at Step 3 to filter raw storage rows BEFORE rows are grouped into buckets. Aggregates do not exist yet.",
      options: [
        { label: "Move the aggregate condition to the HAVING clause (Step 5)", isCorrect: true },
        { label: "Change COUNT(*) to SUM(*) inside WHERE", isCorrect: false },
        { label: "Enclose the WHERE clause in parentheses", isCorrect: false }
      ],
      verdict: "Rule: WHERE filters individual base table rows before aggregation. HAVING filters grouped rows after GROUP BY completes."
    },
    {
      id: 'window_in_where',
      category: 'Window Functions & Scoping',
      matches: (q) => q.includes('OVER (') || q.includes('OVER('),
      mutate: (q) => {
        return q + " WHERE ROW_NUMBER() OVER () = 1";
      },
      buggySnippet: 'WHERE ROW_NUMBER() OVER ...',
      diagnosis: "Window Function Placement Error: Window functions execute in Step 6 (SELECT phase) after WHERE (Step 3), GROUP BY (Step 4), and HAVING (Step 5). The database engine rejects window functions in WHERE.",
      options: [
        { label: "Wrap the query in a CTE or derived subquery and filter the alias in the outer WHERE", isCorrect: true },
        { label: "Replace ROW_NUMBER() with MAX()", isCorrect: false },
        { label: "Move the OVER() clause to the FROM block", isCorrect: false }
      ],
      verdict: "Rule: Window functions calculate across partitioned result sets and cannot be evaluated during the row-filtering WHERE stage. Use a Subquery, CTE, or QUALIFY (Snowflake/BigQuery)."
    },
    {
      id: 'limit_order_precedence',
      category: 'Slicing & Sorting Hierarchy',
      matches: (q) => q.includes('ORDER BY') && q.includes('LIMIT'),
      mutate: (q) => {
        // Swap ORDER BY and LIMIT
        const m = q.match(/ORDER\s+BY\s+([^;]+?)\s+(LIMIT\s+\d+)/i);
        if (m) {
          return q.replace(m[0], `${m[2]} ORDER BY ${m[1]}`);
        }
        return q;
      },
      buggySnippet: 'LIMIT before ORDER BY',
      diagnosis: "Syntax Grammar Violation: SQL grammars mandate that LIMIT/OFFSET must appear at the very end of the SELECT statement, after ORDER BY.",
      options: [
        { label: "Move the ORDER BY clause before the LIMIT clause", isCorrect: true },
        { label: "Replace LIMIT with TOP inside ORDER BY", isCorrect: false },
        { label: "Separate LIMIT and ORDER BY with a comma", isCorrect: false }
      ],
      verdict: "Rule: The engine must sort the complete dataset (ORDER BY) before it can slice off the top N rows (LIMIT). Grammatically, LIMIT is the terminal clause."
    },
    {
      id: 'case_missing_end',
      category: 'Conditional Branching',
      matches: (q) => q.includes('CASE') && q.includes('WHEN'),
      mutate: (q) => q.replace(/\s+END(\s+AS|\s*,|\s+FROM)/gi, '$1'),
      buggySnippet: 'Missing END in CASE',
      diagnosis: "Missing Closure Token: A CASE expression is an inline control block and must terminate with the 'END' keyword before its alias or comma.",
      options: [
        { label: "Add the terminating 'END' keyword before the column alias", isCorrect: true },
        { label: "Close the expression with a semicolon", isCorrect: false },
        { label: "Wrap the CASE statement in double quotes", isCorrect: false }
      ],
      verdict: "Rule: Every CASE structure in ANSI SQL must adhere to 'CASE WHEN ... THEN ... [ELSE ...] END [AS alias]'."
    },
    {
      id: 'left_join_where_null_wipe',
      category: 'Relational Joins & Outer Preservation',
      matches: (q) => q.includes('LEFT JOIN') && q.includes('WHERE'),
      mutate: (q) => {
        return q.replace(/LEFT\s+JOIN/gi, 'LEFT JOIN');
      },
      buggySnippet: 'LEFT JOIN with strict WHERE filter',
      diagnosis: "Outer Join Degradation Trap: Filtering right-table columns with a strict predicate in the WHERE clause silently converts the LEFT JOIN into an INNER JOIN, discarding unmatched outer rows.",
      options: [
        { label: "Move the right-table filter into the LEFT JOIN ... ON condition or add 'OR right.col IS NULL'", isCorrect: true },
        { label: "Change LEFT JOIN to FULL OUTER JOIN", isCorrect: false },
        { label: "Remove the ON condition completely", isCorrect: false }
      ],
      verdict: "Rule: WHERE executes after LEFT JOIN. If WHERE tests a right-table column for equality, all NULL-padded outer rows fail and are discarded, defeating the purpose of the LEFT JOIN."
    },
    {
      id: 'trailing_comma_syntax',
      category: 'Projection Hygiene',
      matches: (q) => q.includes('SELECT') && q.includes('FROM'),
      mutate: (q) => q.replace(/SELECT\s+(.+?)\s+FROM/is, (match, cols) => `SELECT ${cols.trim()}, FROM`),
      buggySnippet: 'Trailing comma before FROM',
      diagnosis: "Grammar Lexer Error: A trailing comma before the FROM keyword triggers a syntax error (unexpected FROM token) in MySQL and PostgreSQL.",
      options: [
        { label: "Remove the trailing comma after the last projection expression", isCorrect: true },
        { label: "Add an empty string '' after the comma", isCorrect: false },
        { label: "Wrap the last column in parentheses", isCorrect: false }
      ],
      verdict: "Rule: Projection columns in the SELECT clause must be strictly comma-delimited without a terminal trailing comma before the FROM clause."
    }
  ];

  // Map of active autopsy state per case
  const AUTOPSY_STATE = {};

  function getAutopsyForCase(caseStudy) {
    if (!caseStudy || !caseStudy.targetQuery) return null;
    const query = caseStudy.targetQuery;

    // Find first matching mutation rule
    let rule = AUTOPSY_MUTATIONS.find(m => m.matches(query));
    if (!rule) {
      // Fallback mutation: trailing comma or case closure
      rule = AUTOPSY_MUTATIONS[AUTOPSY_MUTATIONS.length - 1];
    }

    const mutatedQuery = rule.mutate(query);

    return {
      ruleId: rule.id,
      category: rule.category,
      originalQuery: query,
      mutatedQuery: mutatedQuery,
      buggySnippet: rule.buggySnippet,
      diagnosis: rule.diagnosis,
      options: rule.options,
      verdict: rule.verdict
    };
  }

  function toggleSyntaxAutopsy(caseId) {
    const cs = typeof window.getCaseStudyById === 'function' ? window.getCaseStudyById(caseId) : null;
    if (!cs) return;

    const drawer = document.getElementById(`autopsy_drawer_${caseId}`);
    const btn = document.getElementById(`btn_autopsy_${caseId}`);
    if (!drawer) return;

    if (drawer.style.display === 'block') {
      drawer.style.display = 'none';
      if (btn) btn.classList.remove('active');
      if (window.soundFX) window.soundFX.playClick();
      return;
    }

    // Initialize or retrieve autopsy challenge
    if (!AUTOPSY_STATE[caseId]) {
      AUTOPSY_STATE[caseId] = {
        challenge: getAutopsyForCase(cs),
        isSolved: false,
        selectedChoice: null
      };
    }

    renderAutopsyDrawerHtml(caseId, cs);
    drawer.style.display = 'block';
    if (btn) btn.classList.add('active');
    if (window.soundFX) window.soundFX.playPop();
  }

  function renderAutopsyDrawerHtml(caseId, cs) {
    const drawer = document.getElementById(`autopsy_drawer_${caseId}`);
    if (!drawer) return;

    const autopsyData = AUTOPSY_STATE[caseId];
    if (!autopsyData || !autopsyData.challenge) return;

    const ch = autopsyData.challenge;
    const isSolved = autopsyData.isSolved;

    const highlightedBuggy = window.CASE_DOSSIER_ENGINE 
      ? window.CASE_DOSSIER_ENGINE.highlightSQL(ch.mutatedQuery) 
      : escapeHtml(ch.mutatedQuery);

    drawer.innerHTML = `
      <div class="autopsy-inner-card">
        <div class="autopsy-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;">🔬</span>
            <div>
              <div style="font-weight: 900; font-size: 13px; color: #f43f5e; text-transform: uppercase; letter-spacing: 0.04em;">
                Syntax Autopsy: Code Review &amp; Bug Diagnosis
              </div>
              <div style="font-size: 11.5px; color: #94a3b8;">
                Category: <strong>${escapeHtml(ch.category)}</strong> &bull; Inspect the deliberate bug below and select the correct fix.
              </div>
            </div>
          </div>
          <button class="micro-text-btn" style="color: #94a3b8;" onclick="window.GYM_AUTOPSY_ENGINE.toggleSyntaxAutopsy('${caseId}')">✕ Close</button>
        </div>

        <!-- Buggy Query Canvas with Highlighted Error Zone -->
        <div class="autopsy-code-canvas">
          <div class="autopsy-code-tag">⚠️ Injected Syntax Trap:</div>
          <pre style="margin: 0; font-family: var(--font-mono); font-size: 12px; color: #fca5a5; line-height: 1.5; white-space: pre-wrap;"><code>${highlightedBuggy}</code></pre>
        </div>

        <!-- Autopsy Diagnostic Breakdown -->
        <div class="autopsy-diagnosis-strip">
          <div style="font-weight: 800; font-size: 11px; color: #ef4444; text-transform: uppercase; margin-bottom: 3px;">
            💥 Relational Engine Diagnostic:
          </div>
          <div style="font-size: 12px; color: #fecaca; line-height: 1.45;">
            ${escapeHtml(ch.diagnosis)}
          </div>
        </div>

        <!-- Solution Remediation Choices -->
        <div class="autopsy-remedy-section">
          <div style="font-size: 11.5px; font-weight: 800; color: #f8fafc; margin-bottom: 8px;">
            🛠️ Select the surgical remedy to repair this query:
          </div>
          <div class="autopsy-choices-grid">
            ${ch.options.map((opt, idx) => {
              let btnCls = 'autopsy-choice-btn';
              if (isSolved) {
                btnCls += opt.isCorrect ? ' choice-correct' : ' choice-disabled';
              } else if (autopsyData.selectedChoice === idx) {
                btnCls += opt.isCorrect ? ' choice-correct' : ' choice-wrong';
              }
              return `
                <button class="${btnCls}" 
                        onclick="window.GYM_AUTOPSY_ENGINE.selectRemedy('${caseId}', ${idx})"
                        ${isSolved ? 'disabled' : ''}>
                  <span class="choice-letter">${String.fromCharCode(65 + idx)}</span>
                  <span class="choice-text">${escapeHtml(opt.label)}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Verdict Banner upon Resolution -->
        <div id="autopsy_verdict_${caseId}" style="${isSolved ? 'display: block;' : 'display: none;'} margin-top: 12px;">
          <div class="autopsy-verdict-banner">
            <div style="font-weight: 900; font-size: 12px; color: #4ade80; margin-bottom: 4px;">
              ✅ AUTOPSY COMPLETE: Clean Compilation Verified (+20 Debugger XP)
            </div>
            <div style="font-size: 11.5px; color: #d1fae5; line-height: 1.45;">
              ${escapeHtml(ch.verdict)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function selectRemedy(caseId, choiceIdx) {
    const cs = typeof window.getCaseStudyById === 'function' ? window.getCaseStudyById(caseId) : null;
    if (!cs || !AUTOPSY_STATE[caseId]) return;

    const autopsyData = AUTOPSY_STATE[caseId];
    const ch = autopsyData.challenge;
    const chosen = ch.options[choiceIdx];
    if (!chosen) return;

    autopsyData.selectedChoice = choiceIdx;

    if (chosen.isCorrect) {
      autopsyData.isSolved = true;
      if (window.soundFX) {
        window.soundFX.playSuccess();
        window.soundFX.playChordChime();
        if (typeof window.soundFX.addXP === 'function') {
          window.soundFX.addXP(20, 'Syntax Autopsy Repaired!');
        }
      }
      renderAutopsyDrawerHtml(caseId, cs);
    } else {
      if (window.soundFX) window.soundFX.playError();
      renderAutopsyDrawerHtml(caseId, cs);
    }
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

  window.GYM_AUTOPSY_ENGINE = {
    getAutopsyForCase: getAutopsyForCase,
    toggleSyntaxAutopsy: toggleSyntaxAutopsy,
    selectRemedy: selectRemedy
  };

  window.toggleSyntaxAutopsy = toggleSyntaxAutopsy;

})(window);
