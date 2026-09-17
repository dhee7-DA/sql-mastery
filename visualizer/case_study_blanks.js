// =============================================================================
// INTERACTIVE CASE STUDY "JUMBLED TOKEN PUZZLE & BLANKS" ENGINE v2
// High-yield active retrieval: Masks key clauses, builds randomized token banks
// with realistic interview trap distractors, and supports click/drag-and-drop.
// =============================================================================

if (typeof window === 'undefined') {
  global.window = global;
}

window.CASE_BLANKS_ENGINE = (() => {
  // Comprehensive interview distractors dictionary for core & advanced SQL keywords
  const DISTRACTORS = {
    'WHERE': ['WHERE', 'HAVING', 'FILTER', 'WHEN'],
    'HAVING': ['HAVING', 'WHERE', 'FILTER', 'QUALIFY'],
    'GROUP BY': ['GROUP BY', 'ORDER BY', 'PARTITION BY', 'CLUSTER BY'],
    'ORDER BY': ['ORDER BY', 'SORT BY', 'GROUP BY', 'RANK BY'],
    'IS NULL': ['IS NULL', '= NULL', '== NULL', 'IS EMPTY'],
    'IS NOT NULL': ['IS NOT NULL', '!= NULL', '<> NULL', 'NOT NULL'],
    'DESC': ['DESC', 'ASC', 'DOWN', 'REVERSE'],
    'ASC': ['ASC', 'DESC', 'UP', 'FORWARD'],
    'LIMIT': ['LIMIT', 'TOP', 'FETCH', 'TAKE'],
    'OFFSET': ['OFFSET', 'SKIP', 'PAGE', 'JUMP'],
    'LIKE': ['LIKE', 'CONTAINS', 'MATCHES', 'SIMILAR'],
    'REGEXP': ['REGEXP', 'LIKE', 'EXPR', 'REGEX'],
    'DISTINCT': ['DISTINCT', 'UNIQUE', 'DIFFERENT', 'DEDUPE'],
    'COALESCE': ['COALESCE', 'IFNULL', 'NVL', 'FALLBACK'],
    'BETWEEN': ['BETWEEN', 'RANGE', 'WITHIN', 'FROM'],
    'IN': ['IN', 'CONTAINS', 'WITHIN', 'EXISTS'],
    'NOT IN': ['NOT IN', 'EXCLUDE', 'WITHOUT', 'NOT LIKE'],
    'AND': ['AND', 'OR', 'THEN', 'WITH'],
    'OR': ['OR', 'AND', 'EITHER', 'ELSE'],
    'ROUND': ['ROUND', 'TRUNCATE', 'APPROX', 'FLOOR'],
    'TRUNCATE': ['TRUNCATE', 'ROUND', 'CHOP', 'FLOOR'],
    'ABS': ['ABS', 'MAGNITUDE', 'NEG', 'VAL'],
    'SQRT': ['SQRT', 'ROOT', 'POW', 'SQR'],
    'POW': ['POW', 'EXP', 'POWER', 'SQRT'],
    'FLOOR': ['FLOOR', 'CEIL', 'ROUND', 'TRUNCATE'],
    'CEIL': ['CEIL', 'FLOOR', 'ROUND', 'HIGH'],
    'OVER': ['OVER', 'PARTITION', 'WINDOW', 'FRAME'],
    'ROW_NUMBER': ['ROW_NUMBER', 'RANK', 'DENSE_RANK', 'INDEX'],
    'WITH': ['WITH', 'CTE', 'TEMP', 'DEFINE'],
    'LENGTH': ['LENGTH', 'LEN', 'SIZE', 'COUNT'],
    'RIGHT': ['RIGHT', 'LEFT', 'TAIL', 'SUFFIX'],
    'LEFT': ['LEFT', 'RIGHT', 'HEAD', 'PREFIX'],
    'SUBSTRING': ['SUBSTRING', 'SLICE', 'EXTRACT', 'SPLIT'],
    'SELECT': ['SELECT', 'EXTRACT', 'GET', 'PROHIBIT'],
    'FROM': ['FROM', 'INTO', 'SOURCE', 'TABLE'],
    'AS': ['AS', 'NAME', 'ALIAS', 'LABEL'],
    'NOT': ['NOT', 'NEVER', 'EXCLUDE', 'DROP'],
    'COUNT': ['COUNT', 'SUM', 'TOTAL', 'NUM'],
    'SUM': ['SUM', 'COUNT', 'TOTAL', 'ADD'],
    'AVG': ['AVG', 'MEAN', 'MEDIAN', 'SUM'],
    'MIN': ['MIN', 'LOWEST', 'LEAST', 'FLOOR'],
    'MAX': ['MAX', 'HIGHEST', 'GREATEST', 'CEIL'],
    'JOIN': ['JOIN', 'MERGE', 'CONNECT', 'COMBINE'],
    'INNER JOIN': ['INNER JOIN', 'LEFT JOIN', 'FULL JOIN', 'CROSS JOIN'],
    'LEFT JOIN': ['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'OUTER JOIN'],
    'RIGHT JOIN': ['RIGHT JOIN', 'LEFT JOIN', 'INNER JOIN', 'CROSS JOIN'],
    'CROSS JOIN': ['CROSS JOIN', 'INNER JOIN', 'FULL JOIN', 'LEFT JOIN'],
    'ON': ['ON', 'WHERE', 'USING', 'MATCHING'],
    'SELECT': ['SELECT', 'EXTRACT', 'GET', 'CHOOSE'],
    'FROM': ['FROM', 'INTO', 'SOURCE', 'IN'],
    'AS': ['AS', 'ALIAS', 'NAME', 'LABEL'],
    'CONCAT': ['CONCAT', 'COMBINE', 'APPEND', 'MERGE'],
    'UPPER': ['UPPER', 'UCASE', 'CAPITAL', 'BIG'],
    'LOWER': ['LOWER', 'LCASE', 'SMALL', 'DOWN'],
    'YEAR': ['YEAR', 'DATE_YEAR', 'EXTRACT_YEAR', 'YR'],
    'MONTH': ['MONTH', 'DATE_MONTH', 'EXTRACT_MONTH', 'MO'],
    'DAY': ['DAY', 'DATE_DAY', 'EXTRACT_DAY', 'DY'],
    'CURRENT_DATE': ['CURRENT_DATE', 'TODAY', 'NOW()', 'CURDATE()']
  };

  // Keywords ranked by educational / interview trap value
  const KEYWORD_PRIORITY = [
    'ROW_NUMBER',
    'TRUNCATE',
    'ROUND',
    'SQRT',
    'POW',
    'ABS',
    'FLOOR',
    'CEIL',
    'OVER',
    'WITH',
    'INNER JOIN',
    'LEFT JOIN',
    'RIGHT JOIN',
    'CROSS JOIN',
    'JOIN',
    'ON',
    'IS NOT NULL',
    'IS NULL',
    'COALESCE',
    'HAVING',
    'GROUP BY',
    'BETWEEN',
    'NOT IN',
    'IN',
    'REGEXP',
    'LIKE',
    'WHERE',
    'ORDER BY',
    'DESC',
    'ASC',
    'LIMIT',
    'OFFSET',
    'DISTINCT',
    'LENGTH',
    'RIGHT',
    'LEFT',
    'SUBSTRING',
    'AND',
    'OR',
    'NOT',
    'SELECT',
    'FROM',
    'AS',
    'CONCAT',
    'UPPER',
    'LOWER',
    'YEAR',
    'MONTH',
    'DAY',
    'CURRENT_DATE',
    'COUNT',
    'SUM',
    'AVG',
    'MIN',
    'MAX'
  ];

  // Utility: Shuffle an array in place
  function shuffle(arr) {
    const res = [...arr];
    for (let i = res.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
  }

  // Solved state storage in localStorage
  const STORAGE_KEY = 'sql_mastery_solved_case_challenges_v2';
  function getSolvedSet() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('sql_mastery_solved_case_challenges_v1');
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch (e) {
      return new Set();
    }
  }

  function markSolved(caseId) {
    try {
      const set = getSolvedSet();
      set.add(caseId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
    } catch (e) {}
  }

  // Active in-memory state tracking placed tokens per case
  // Shape: { [caseId]: { slots: { slot_1: 'WHERE' }, usedTokens: ['tok_1'] } }
  const CASE_ACTIVE_STATE = {};

  function getCaseState(caseId) {
    if (!CASE_ACTIVE_STATE[caseId]) {
      CASE_ACTIVE_STATE[caseId] = {
        slots: {},
        usedTokens: new Set()
      };
    }
    return CASE_ACTIVE_STATE[caseId];
  }

  function clearCaseState(caseId) {
    CASE_ACTIVE_STATE[caseId] = {
      slots: {},
      usedTokens: new Set()
    };
  }

  // Generate Challenge for any Case Study
  function createChallenge(caseStudy) {
    if (!caseStudy || !caseStudy.targetQuery) return null;

    const query = caseStudy.targetQuery;
    const detected = [];

    // Search for keywords in priority order
    for (const kw of KEYWORD_PRIORITY) {
      const regex = new RegExp(`\\b${kw.replace(' ', '\\s+')}\\b`, 'gi');
      let match;
      while ((match = regex.exec(query)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        const hasOverlap = detected.some(d => (start >= d.start && start < d.end) || (end > d.start && end <= d.end));
        if (!hasOverlap) {
          detected.push({
            keyword: kw,
            originalText: match[0],
            start: start,
            end: end
          });
        }
      }
    }

    // Sort by start index in the query
    detected.sort((a, b) => a.start - b.start);

    // Pick 2 to 3 slots to mask
    let selected = detected;
    if (detected.length > 3) {
      const uniqueKeywords = [];
      const filtered = [];
      for (const item of detected) {
        if (!uniqueKeywords.includes(item.keyword) && filtered.length < 3) {
          uniqueKeywords.push(item.keyword);
          filtered.push(item);
        }
      }
      selected = filtered.length >= 2 ? filtered : detected.slice(0, 3);
    } else if (detected.length === 0) {
      return null;
    }

    selected.sort((a, b) => a.start - b.start);

    // Build masked query string, slots map, and collect correct keywords
    let maskedQuery = '';
    let lastIdx = 0;
    const slots = {};
    const correctKeywords = [];

    selected.forEach((item, slotIdx) => {
      const slotId = `slot_${slotIdx + 1}`;
      maskedQuery += query.slice(lastIdx, item.start);
      maskedQuery += `[[${slotId}]]`;
      lastIdx = item.end;

      const correctVal = item.keyword.toUpperCase();
      correctKeywords.push(correctVal);

      slots[slotId] = {
        slotId: slotId,
        correct: correctVal,
        originalText: item.originalText
      };
    });

    maskedQuery += query.slice(lastIdx);

    // Build jumbled token bank (Correct tokens + 2 to 3 smart distractors)
    const tokenSet = new Set(correctKeywords);
    const distractorCandidates = [];

    correctKeywords.forEach(kw => {
      const options = DISTRACTORS[kw] || [];
      options.forEach(opt => {
        if (!tokenSet.has(opt) && !distractorCandidates.includes(opt)) {
          distractorCandidates.push(opt);
        }
      });
    });

    // Add up to 3 distractors
    const shuffledDistractors = shuffle(distractorCandidates).slice(0, Math.min(3, Math.max(2, 5 - correctKeywords.length)));
    shuffledDistractors.forEach(d => tokenSet.add(d));

    const caseId = caseStudy.id || (caseStudy.drillNumber ? `gym_${caseStudy.drillNumber}` : '');

    // Convert to jumbled token objects
    const jumbledList = shuffle([...tokenSet]);
    const tokenBank = jumbledList.map((text, idx) => ({
      id: `tok_${caseId}_${idx}`,
      text: text
    }));

    return {
      caseId: caseId,
      title: caseStudy.title,
      maskedQuery: maskedQuery,
      slots: slots,
      tokenBank: tokenBank,
      isSolved: getSolvedSet().has(caseId)
    };
  }

  // Validate user selections
  function verifyChallenge(caseStudy, userAnswers) {
    const challenge = createChallenge(caseStudy);
    if (!challenge) return { isCorrect: true, feedback: "Valid query" };

    const caseId = caseStudy.id || (caseStudy.drillNumber ? `gym_${caseStudy.drillNumber}` : '');
    const results = {};
    let allCorrect = true;

    for (const [slotId, slotData] of Object.entries(challenge.slots)) {
      const userChoice = (userAnswers[slotId] || '').trim().toUpperCase();
      const isSlotCorrect = userChoice === slotData.correct.toUpperCase();
      results[slotId] = {
        chosen: userChoice,
        correct: slotData.correct,
        isCorrect: isSlotCorrect
      };
      if (!isSlotCorrect) {
        allCorrect = false;
      }
    }

    if (allCorrect) {
      markSolved(caseId);
      if (window.soundFX && typeof window.soundFX.playSuccess === 'function') {
        window.soundFX.playSuccess();
      }
      if (typeof window.awardExperiencePoints === 'function') {
        window.awardExperiencePoints(15, `Solved Case Challenge #${caseId}`);
      }
    } else {
      if (window.soundFX && typeof window.soundFX.playError === 'function') {
        window.soundFX.playError();
      }
    }

    return {
      isCorrect: allCorrect,
      results: results,
      explanation: generatePostMortem(caseStudy, results, allCorrect)
    };
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

  // Diagnostic Knowledge Graph: Precise cognitive breakdown of why SQL keywords conflict
  const DIAGNOSTIC_REASONS = {
    'WHERE->HAVING': "You placed <code>WHERE</code> where <code>HAVING</code> is required! Simple row filters go in <code>WHERE</code> (evaluated BEFORE grouping), but aggregate expressions like <code>COUNT(*)</code>, <code>AVG()</code>, or <code>SUM()</code> can ONLY be filtered using <code>HAVING</code> (evaluated AFTER groups are formed).",
    'HAVING->WHERE': "You placed <code>HAVING</code> where <code>WHERE</code> is required! Row-level conditions on raw columns should always be filtered early in <code>WHERE</code> to minimize row volume before grouping.",
    'ORDER BY->GROUP BY': "You placed <code>ORDER BY</code> where <code>GROUP BY</code> is required! <code>GROUP BY</code> aggregates rows into summary groups, while <code>ORDER BY</code> merely sorts the final output presentation.",
    'GROUP BY->ORDER BY': "You placed <code>GROUP BY</code> where <code>ORDER BY</code> is required! Sorting results chronologically or by magnitude requires <code>ORDER BY</code> (with <code>ASC</code> or <code>DESC</code>).",
    '= NULL->IS NULL': "You placed <code>= NULL</code>! In ANSI SQL three-valued logic (3VL), comparing with <code>= NULL</code> always evaluates to UNKNOWN, never TRUE. You must use <code>IS NULL</code> or <code>IS NOT NULL</code>.",
    '== NULL->IS NULL': "You placed <code>== NULL</code>! SQL does not have a double-equal operator. For missing or unknown values, use <code>IS NULL</code>.",
    'NULL->IS NULL': "You placed <code>NULL</code> directly! Checking for missing or unknown values requires the <code>IS NULL</code> predicate.",
    'NOT NULL->IS NOT NULL': "You placed <code>NOT NULL</code>! In query filters, the correct predicate syntax is <code>IS NOT NULL</code>.",
    'INNER JOIN->LEFT JOIN': "You placed <code>INNER JOIN</code>! An inner join silently drops rows from the primary table that have no matching foreign keys. To preserve all primary records (e.g. users with 0 orders), use <code>LEFT JOIN</code>.",
    'LEFT JOIN->INNER JOIN': "You placed <code>LEFT JOIN</code>! An outer join retains un-matched rows filled with NULLs. If the specification strictly requires active, bidirectional relationships with matches on both sides, use <code>INNER JOIN</code>.",
    'CROSS JOIN->INNER JOIN': "You placed <code>CROSS JOIN</code>! A cross join produces a Cartesian product (M × N rows). Joining related tables via foreign keys requires <code>INNER JOIN ... ON</code>.",
    'UNION->UNION ALL': "You placed <code>UNION</code>! <code>UNION</code> performs an expensive de-duplication sort across all projected columns. When duplicates are either impossible or desired, <code>UNION ALL</code> is significantly faster and preserves all rows.",
    'UNION ALL->UNION': "You placed <code>UNION ALL</code>! If the specification requires unique, distinct records across both branches, use <code>UNION</code> to deduplicate the combined sets.",
    'RANK->DENSE_RANK': "You placed <code>RANK()</code>! <code>RANK()</code> introduces gaps in ranking sequence after ties (e.g. 1st, 2nd, 2nd, 4th). If you need contiguous rankings with no skipped numbers, use <code>DENSE_RANK()</code>.",
    'DENSE_RANK->RANK': "You placed <code>DENSE_RANK()</code>! If the business rules require standard Olympic podium ranking where tied ranks consume ordinal positions, use <code>RANK()</code>.",
    'LEAD->LAG': "You placed <code>LEAD()</code>! <code>LEAD()</code> looks forward into future rows (+1). To compare with the previous period or prior event, use <code>LAG()</code>.",
    'LAG->LEAD': "You placed <code>LAG()</code>! <code>LAG()</code> looks backward into prior rows (-1). To calculate velocity toward the next future timestamp, use <code>LEAD()</code>.",
    'RANGE->ROWS': "You placed <code>RANGE</code>! <code>RANGE</code> evaluates logical value duplicates and treats ties as a single group. For exact physical row counts (e.g. previous 3 transactions), use <code>ROWS BETWEEN</code>.",
    'WHERE->ON': "You placed <code>WHERE</code> inside the join condition! Join tables must be connected using the <code>ON</code> predicate before row filtering takes place in <code>WHERE</code>.",
    'ON->WHERE': "You placed <code>ON</code>! <code>ON</code> is used exclusively for join linkage. Post-join row filtering requires <code>WHERE</code>.",
    'AND->OR': "You placed <code>OR</code>! <code>OR</code> requires only one condition to match. If all criteria must be simultaneously met, use <code>AND</code>.",
    'OR->AND': "You placed <code>AND</code>! <code>AND</code> requires all conditions to hold. When matching any one of several alternatives, use <code>OR</code>.",
    'ASC->DESC': "You placed <code>ASC</code>! Ascending order sorts lowest-first. For top-performers or latest dates, use <code>DESC</code>.",
    'DESC->ASC': "You placed <code>DESC</code>! Descending order sorts highest-first. For lowest costs, earliest dates, or alphabetical order, use <code>ASC</code>."
  };

  // Generate Executive Post-Mortem Explanation with Diagnostic Intelligence
  function generatePostMortem(caseStudy, results, allCorrect) {
    const caseId = caseStudy.id || (caseStudy.drillNumber ? `gym_${caseStudy.drillNumber}` : '');

    if (allCorrect) {
      return `
        <div class="feedback-content-success">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-size: 13.5px; font-weight: 900; color: #000;">🎯 Flawless Query Execution!</span>
            <span style="font-size: 11px; padding: 2px 8px; border-radius: 9999px; background: rgba(0,0,0,0.15); font-weight: 900; color: #000;">+15 XP</span>
          </div>
          <div style="font-size: 12px; font-weight: 700; line-height: 1.45; color: #000; opacity: 0.95;">
            All SQL clauses and keywords are logically and physically valid for <em>${escapeHtml(caseStudy.title)}</em>. The database engine executes the predicates in proper sequence without throwing syntax errors or trap violations.
          </div>
        </div>
      `;
    }

    let mistakesHtml = [];
    for (const [slotId, res] of Object.entries(results)) {
      if (!res.isCorrect) {
        const keyPair = `${(res.chosen || '').trim().toUpperCase()}->${(res.correct || '').trim().toUpperCase()}`;
        const diagnostic = DIAGNOSTIC_REASONS[keyPair] || null;

        mistakesHtml.push(`
          <div class="diagnostic-mistake-card" style="background: rgba(0, 0, 0, 0.35); border: 1.5px solid rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 10px 12px; margin-bottom: 6px;">
            <div style="font-size: 12px; font-weight: 800; margin-bottom: 4px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span style="background: #000; color: #fff; padding: 1px 7px; border-radius: 4px; font-family: var(--font-mono); font-size: 10.5px;">SLOT ${slotId.toUpperCase()}</span>
              <span>Placed: <code style="background: rgba(239, 68, 68, 0.3); color: #fecaca; border: 1px solid #ef4444; padding: 1px 6px; border-radius: 4px;">${escapeHtml(res.chosen || 'EMPTY')}</code></span>
              <span style="opacity: 0.7;">&rarr;</span>
              <span>Required: <code style="background: rgba(34, 197, 94, 0.3); color: #bbf7d0; border: 1px solid #22c55e; padding: 1px 6px; border-radius: 4px;">${escapeHtml(res.correct)}</code></span>
            </div>
            ${diagnostic ? `
              <div style="font-size: 11.5px; line-height: 1.45; color: #fef08a; margin-top: 5px; border-left: 3px solid #facc15; padding-left: 8px;">
                💡 <strong>Why this failed:</strong> ${diagnostic}
              </div>
            ` : `
              <div style="font-size: 11.5px; line-height: 1.4; opacity: 0.92; margin-top: 3px; color: #f1f5f9;">
                In SQL execution order, this position specifically requires <code>${escapeHtml(res.correct)}</code> to construct a valid statement.
              </div>
            `}
          </div>
        `);
      }
    }

    let extraPedagogy = '';
    if (caseStudy.syntaxTrap) {
      extraPedagogy += `
        <div style="margin-top: 8px; padding: 8px 10px; border-radius: 6px; background: rgba(0, 0, 0, 0.35); border-left: 3px solid #f59e0b; font-size: 11.5px; line-height: 1.4; color: #fef08a;">
          <strong>⚠️ Master Gotcha:</strong> ${escapeHtml(caseStudy.syntaxTrap)}
        </div>
      `;
    }
    if (caseStudy.syntaxRule) {
      extraPedagogy += `
        <div style="margin-top: 6px; padding: 8px 10px; border-radius: 6px; background: rgba(0, 0, 0, 0.25); border-left: 3px solid #38bdf8; font-size: 11.5px; line-height: 1.4; color: #e0f2fe;">
          <strong>📖 Core Rule:</strong> ${escapeHtml(caseStudy.syntaxRule)}
        </div>
      `;
    }

    return `
      <div class="feedback-content-error">
        <div style="font-size: 13.5px; font-weight: 900; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; color: #ffffff;">
          <span>⚠️ Syntax Trap Triggered</span>
        </div>
        ${mistakesHtml.join('')}
        ${extraPedagogy}
        <div style="margin-top: 10px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button class="micro-text-btn" style="background: #000000; color: #ffffff; padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: 800; border: 1.5px solid rgba(255,255,255,0.3); cursor: pointer;" onclick="handleResetCase('${caseId}')">↺ Clear Slots &amp; Retry</button>
          <button class="micro-text-btn" style="background: rgba(0,0,0,0.5); color: #ffffff; padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; border: 1.5px solid rgba(255,255,255,0.2); cursor: pointer;" onclick="toggleCaseSolution('${caseId}')">👁️ Peek Solution</button>
        </div>
      </div>
    `;
  }

  return {
    createChallenge,
    verifyChallenge,
    getCaseState,
    clearCaseState,
    getSolvedCount: () => getSolvedSet().size,
    isSolved: (id) => getSolvedSet().has(id),
    markSolved
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CASE_BLANKS_ENGINE: window.CASE_BLANKS_ENGINE };
}
