// =============================================================================
// CASE STUDY DEEP-DIVE DOSSIER ENGINE
// Synthesizes exhaustive technical context, executive incident stories,
// line-by-line SQL clause deconstructions, and interview traps with cognitive color theory.
// =============================================================================

window.CASE_DOSSIER_ENGINE = (() => {

  // Generate line-by-line SQL breakdown
  function deconstructQuery(sql) {
    if (!sql) return [];
    const lines = sql.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const breakdown = [];

    lines.forEach(line => {
      let clauseType = 'OTHER';
      let tagColor = '#94a3b8';
      let explanation = '';

      if (/^SELECT\b/i.test(line)) {
        clauseType = 'SELECT';
        tagColor = '#38bdf8'; // Cyan
        explanation = 'Projection Phase: Defines the exact scalar columns or computed expressions to return in the client buffer, avoiding wasteful I/O overhead.';
      } else if (/^FROM\b/i.test(line)) {
        clauseType = 'FROM';
        tagColor = '#a855f7'; // Electric Violet
        explanation = 'Table Allocation: Identifies the root relational entity and loads the raw disk pages into the working memory buffer.';
      } else if (/^WHERE\b/i.test(line)) {
        clauseType = 'WHERE';
        tagColor = '#22c55e'; // Emerald Green
        explanation = 'Row-Level Filter Gatekeeper: Evaluates boolean predicates for each tuple before any grouping or projection occurs. Only TRUE evaluations survive.';
      } else if (/^(AND|OR)\b/i.test(line)) {
        clauseType = line.startsWith('AND') ? 'AND' : 'OR';
        tagColor = line.startsWith('AND') ? '#10b981' : '#f59e0b'; // Emerald or Warm Gold
        explanation = line.startsWith('AND')
          ? 'Conjunction Filter: Requires both preceding and subsequent conditions to evaluate to TRUE simultaneously.'
          : 'Disjunction Filter: Satisfied if either the left or right predicate evaluates to TRUE. Watch out for AND/OR precedence traps!';
      } else if (/^ORDER\s+BY\b/i.test(line)) {
        clauseType = 'ORDER BY';
        tagColor = '#f59e0b'; // Sunset Gold
        explanation = 'Sort Stage: Orders the surviving row buffer in ascending (ASC) or descending (DESC) sequence, executing after projection.';
      } else if (/^LIMIT\b/i.test(line)) {
        clauseType = 'LIMIT';
        tagColor = '#ec4899'; // Hot Pink
        explanation = 'Window Boundary: Slices the final sorted row buffer to return strictly the requested count, terminating processing early.';
      } else {
        explanation = 'Relational Expression: Secondary column comparison, wildcard matching, or range boundary.';
      }

      breakdown.push({
        line: line,
        type: clauseType,
        tagColor: tagColor,
        explanation: explanation
      });
    });

    return breakdown;
  }

  // Generate Interview Pitfalls & Mnemonic Traps based on keywords
  function generateInterviewPitfalls(cs) {
    const q = (cs.targetQuery || '').toUpperCase();
    const traps = [];

    if (q.includes('NULL') || q.includes('COALESCE') || q.includes('IS NULL')) {
      traps.push({
        title: '⚠️ The 3-Valued Logic (3VL) Trap',
        rule: 'In ANSI SQL, NULL is not a value; it is an unknown state. Expressions like `col = NULL` or `col != NULL` evaluate to UNKNOWN, not FALSE or TRUE, silently dropping all rows! Always use `IS NULL` or `IS NOT NULL`.',
        color: '#ef4444'
      });
    }

    if (q.includes('AND') && q.includes('OR')) {
      traps.push({
        title: '⚠️ Operator Precedence: AND evaluates before OR',
        rule: 'SQL gives `AND` higher precedence than `OR` (similar to multiplication over addition). Writing `WHERE A AND B OR C` means `(A AND B) OR C`, NOT `A AND (B OR C)`. Always use explicit parentheses in compound conditions!',
        color: '#f97316'
      });
    }

    if (q.includes('LIKE') || q.includes('REGEXP')) {
      traps.push({
        title: '⚠️ SARGability & Index Invalidation with Wildcards',
        rule: 'Using a leading wildcard like `LIKE \'%keyword\'` forces an expensive Full Table Scan because B-Trees cannot search suffixes. Only trailing wildcards like `LIKE \'prefix%\'` can utilize range scans on indexed columns.',
        color: '#f59e0b'
      });
    }

    if (q.includes('ORDER BY') && !q.includes('LIMIT')) {
      traps.push({
        title: '⚠️ Non-Deterministic Sorting without Primary Key Ties',
        rule: 'If duplicate values exist in the sort column, the engine returns them in arbitrary physical storage order. In production pagination, always add a secondary unique column (e.g. `ORDER BY score DESC, id ASC`) to ensure deterministic output.',
        color: '#38bdf8'
      });
    }

    // Default senior interview trap
    if (traps.length === 0) {
      traps.push({
        title: '⚠️ SARGability (Search Argument Ability) Trap',
        rule: 'Wrapping a column in a function (e.g. `WHERE UPPER(status) = \'ACTIVE\'` or `YEAR(created_at) = 2026`) prevents the optimizer from using B-Tree indexes, degrading sub-millisecond lookups into O(N) disk scans.',
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

    // Contextual Executive Incident Story
    const industry = cs.industry || 'Fintech';
    const difficulty = cs.difficulty || 'Easy';

    const diffColors = {
      'Easy': { badge: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: '#10b981', label: '🟢 Easy &bull; Foundations' },
      'Medium': { badge: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: '#f59e0b', label: '🟡 Medium &bull; Production Standard' },
      'Hard': { badge: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)', border: '#ef4444', label: '🔴 Hard &bull; Senior Edge Cases' }
    };

    const diffMeta = diffColors[difficulty] || diffColors['Easy'];

    // Incident narrative generator
    const incidentStory = `
      During high-velocity operations at ${cs.title.split(':')[0] || 'Enterprise Corp'}, monitoring telemetry identified an anomaly affecting ${cs.businessObjective.toLowerCase()}. 
      The data platform engineering team was paged to diagnose data integrity in the <code>${cs.table}</code> table. 
      Writing an inefficient or semantically flawed query here could lead to false-positive alerts, degraded client SLA response times, or incorrect financial reconciliation.
    `;

    return {
      case: cs,
      diffMeta: diffMeta,
      incidentStory: incidentStory,
      queryBreakdown: queryBreakdown,
      pitfalls: pitfalls,
      table: cs.table,
      schemaSnippet: cs.schemaSnippet
    };
  }

  return {
    getDossier,
    deconstructQuery,
    generateInterviewPitfalls
  };
})();
