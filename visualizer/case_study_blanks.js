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
    'ON': ['ON', 'WHERE', 'USING', 'MATCHING']
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
    'NOT'
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

    // Convert to jumbled token objects
    const jumbledList = shuffle([...tokenSet]);
    const tokenBank = jumbledList.map((text, idx) => ({
      id: `tok_${caseStudy.id}_${idx}`,
      text: text
    }));

    return {
      caseId: caseStudy.id,
      title: caseStudy.title,
      maskedQuery: maskedQuery,
      slots: slots,
      tokenBank: tokenBank,
      isSolved: getSolvedSet().has(caseStudy.id)
    };
  }

  // Validate user selections
  function verifyChallenge(caseStudy, userAnswers) {
    const challenge = createChallenge(caseStudy);
    if (!challenge) return { isCorrect: true, feedback: "Valid query" };

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
      markSolved(caseStudy.id);
      if (window.soundFX && typeof window.soundFX.playSuccess === 'function') {
        window.soundFX.playSuccess();
      }
      if (typeof window.awardExperiencePoints === 'function') {
        window.awardExperiencePoints(15, `Solved Case Challenge #${caseStudy.id}`);
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

  // Generate Executive Post-Mortem Explanation
  function generatePostMortem(caseStudy, results, allCorrect) {
    if (allCorrect) {
      return `<strong>🎯 Flawless Query Execution!</strong><br>All SQL clauses and keywords are logically and physically valid for <em>${caseStudy.title}</em>. The database engine executes the predicates in proper sequence without throwing syntax errors or trap violations.`;
    }

    let mistakes = [];
    for (const [slotId, res] of Object.entries(results)) {
      if (!res.isCorrect) {
        mistakes.push(`For slot <strong>${slotId.toUpperCase()}</strong>: You placed <code>${res.chosen || 'EMPTY'}</code>, but this position requires <code>${res.correct}</code>.`);
      }
    }

    return `<strong>⚠️ Trap Triggered:</strong><br>${mistakes.join('<br>')}<br><br><em>Remember:</em> In SQL, clause evaluation order strictly dictates keyword placement.`;
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
