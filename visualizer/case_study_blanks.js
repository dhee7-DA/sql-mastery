// =============================================================================
// INTERACTIVE CASE STUDY "SLOT-PICKER / MISSING KEYWORD" ENGINE
// Masks key SQL keywords into interactive blanks with interview trap distractors
// =============================================================================

window.CASE_BLANKS_ENGINE = (() => {
  // Common interview distractors dictionary for core SQL keywords
  const DISTRACTORS = {
    'WHERE': ['WHERE', 'HAVING', 'FILTER', 'WHEN'],
    'IS NULL': ['IS NULL', '= NULL', '== NULL', 'IS EMPTY'],
    'IS NOT NULL': ['IS NOT NULL', '!= NULL', '<> NULL', 'NOT NULL'],
    'ORDER BY': ['ORDER BY', 'SORT BY', 'GROUP BY', 'RANK BY'],
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
    'ROUND': ['ROUND', 'TRUNC', 'APPROX', 'CEIL'],
    'LENGTH': ['LENGTH', 'LEN', 'SIZE', 'COUNT'],
    'RIGHT': ['RIGHT', 'LEFT', 'TAIL', 'SUFFIX'],
    'LEFT': ['LEFT', 'RIGHT', 'HEAD', 'PREFIX'],
    'SUBSTRING': ['SUBSTRING', 'SLICE', 'EXTRACT', 'SPLIT'],
    'SELECT': ['SELECT', 'EXTRACT', 'GET', 'PROHIBIT'],
    'FROM': ['FROM', 'INTO', 'SOURCE', 'TABLE'],
    'AS': ['AS', 'NAME', 'ALIAS', 'LABEL'],
    'NOT': ['NOT', 'NEVER', 'EXCLUDE', 'DROP']
  };

  // Keywords ranked by educational / interview trap value
  const KEYWORD_PRIORITY = [
    'IS NOT NULL',
    'IS NULL',
    'COALESCE',
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
    'ROUND',
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
  const STORAGE_KEY = 'sql_mastery_solved_case_challenges_v1';
  function getSolvedSet() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
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

  // Generate Challenge for any Case Study
  function createChallenge(caseStudy) {
    if (!caseStudy || !caseStudy.targetQuery) return null;

    const query = caseStudy.targetQuery;
    const detected = [];

    // Search for keywords in priority order
    for (const kw of KEYWORD_PRIORITY) {
      // Regex boundary match
      const regex = new RegExp(`\\b${kw.replace(' ', '\\s+')}\\b`, 'gi');
      let match;
      while ((match = regex.exec(query)) !== null) {
        // Prevent overlapping spans
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

    // Sort by start index
    detected.sort((a, b) => a.start - b.start);

    // Pick 2 to 3 slots to mask
    let selected = detected;
    if (detected.length > 3) {
      // Pick 2 or 3 distinct high-priority keywords
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
      // Fallback: search for SELECT / FROM
      return null;
    }

    // Re-sort chosen slots by appearance
    selected.sort((a, b) => a.start - b.start);

    // Build masked query string & slots map
    let maskedQuery = '';
    let lastIdx = 0;
    const slots = {};

    selected.forEach((item, slotIdx) => {
      const slotId = `slot_${slotIdx + 1}`;
      maskedQuery += query.slice(lastIdx, item.start);
      maskedQuery += `[[${slotId}]]`;
      lastIdx = item.end;

      const correctVal = item.keyword.toUpperCase();
      const optionsPool = DISTRACTORS[correctVal] || [correctVal, 'INVALID_1', 'INVALID_2', 'INVALID_3'];
      
      slots[slotId] = {
        slotId: slotId,
        correct: correctVal,
        options: shuffle(optionsPool),
        placeholder: `[ ___ ]`
      };
    });

    maskedQuery += query.slice(lastIdx);

    return {
      caseId: caseStudy.id,
      title: caseStudy.title,
      maskedQuery: maskedQuery,
      slots: slots,
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
      // Trigger sound & XP if audio engine available
      if (window.AUDIO_FX && typeof window.AUDIO_FX.playSuccess === 'function') {
        window.AUDIO_FX.playSuccess();
      }
      // Add XP
      if (typeof window.awardExperiencePoints === 'function') {
        window.awardExperiencePoints(15, `Solved Case Challenge #${caseStudy.id}`);
      }
    } else {
      if (window.AUDIO_FX && typeof window.AUDIO_FX.playError === 'function') {
        window.AUDIO_FX.playError();
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
      return `<strong>🎯 Flawless Query Execution!</strong><br>All SQL clauses and keywords are logically and physically valid for <em>${caseStudy.title}</em>. The database engine executes the predicates in proper sequence without throwing column alias errors or null-evaluation traps.`;
    }

    let mistakes = [];
    for (const [slotId, res] of Object.entries(results)) {
      if (!res.isCorrect) {
        mistakes.push(`For slot <strong>${slotId.toUpperCase()}</strong>: You chose <code>${res.chosen || 'EMPTY'}</code>, but the query requires <code>${res.correct}</code>.`);
      }
    }

    return `<strong>⚠️ Trap Triggered:</strong><br>${mistakes.join('<br>')}<br><br><em>Remember:</em> In SQL, clause evaluation order and Three-Valued Logic strictly dictate keyword placement.`;
  }

  return {
    createChallenge,
    verifyChallenge,
    getSolvedCount: () => getSolvedSet().size,
    isSolved: (id) => getSolvedSet().has(id)
  };
})();
