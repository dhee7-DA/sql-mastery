/**
 * SQL FOUNDRY - LOGICAL VS LEXICAL EXECUTION ORDER DATA
 */

export interface SqlClause {
  id: string;
  keyword: string;
  lexicalPos: number;
  logicalPos: number;
  role: string;
  action: string;
  whyItMatters: string;
  interviewTip: string;
}

export const SQL_CLAUSES: SqlClause[] = [
  {
    id: 'from',
    keyword: 'FROM & JOIN',
    lexicalPos: 2,
    logicalPos: 1,
    role: 'Source & Cartography',
    action: 'Loads candidate tables into memory and builds the Cartesian product / join graph with ON predicates.',
    whyItMatters: 'Tables must exist before anything can be evaluated. If a table is missing or filtered out here, no later clause can resurrect it.',
    interviewTip: 'Senior engineers know JOIN filters in ON vs WHERE behave differently in OUTER joins: ON filters prior to join, WHERE filters after.'
  },
  {
    id: 'where',
    keyword: 'WHERE',
    lexicalPos: 3,
    logicalPos: 2,
    role: 'Row-Level Gatekeeper',
    action: 'Filters individual rows BEFORE any grouping or aggregation takes place.',
    whyItMatters: 'CRITICAL INTERVIEW TRAP: You CANNOT use column aliases defined in SELECT here, because SELECT has not executed yet!',
    interviewTip: 'Always filter early in WHERE to reduce the row count before costly GROUP BY hash tables are built.'
  },
  {
    id: 'group_by',
    keyword: 'GROUP BY',
    lexicalPos: 4,
    logicalPos: 3,
    role: 'Bucket Aggregator',
    action: 'Collapses rows sharing identical group keys into single summary buckets.',
    whyItMatters: 'Once grouped, individual non-aggregated columns cannot be projected unless they are part of the GROUP BY key.',
    interviewTip: 'Under the hood, DB engines construct either a Hash Aggregate or Sort Aggregate depending on index presence.'
  },
  {
    id: 'having',
    keyword: 'HAVING',
    lexicalPos: 5,
    logicalPos: 4,
    role: 'Group-Level Filter',
    action: 'Evaluates conditions against aggregated bucket values (e.g., COUNT(*) > 5, SUM(revenue) > 100k).',
    whyItMatters: 'Unlike WHERE, HAVING has access to aggregate function results. Never put raw row conditions in HAVING that belong in WHERE.',
    interviewTip: 'Interviewer question: "Can you use HAVING without GROUP BY?" Answer: "Yes, the entire table is treated as one single implicit group."'
  },
  {
    id: 'select',
    keyword: 'SELECT & WINDOW',
    lexicalPos: 1,
    logicalPos: 5,
    role: 'Projection & Expression',
    action: 'Evaluates mathematical formulas, column aliases, CASE statements, and Window Functions (OVER).',
    whyItMatters: 'Aliases are born here! Window functions run here after WHERE/GROUP BY, which is why window functions cannot be filtered directly in WHERE.',
    interviewTip: 'To filter on a Window Function result (e.g. ROW_NUMBER() = 1), you MUST wrap the query in a CTE or subquery.'
  },
  {
    id: 'order_by',
    keyword: 'ORDER BY',
    lexicalPos: 6,
    logicalPos: 6,
    role: 'Final Sorting',
    action: 'Sorts the final projected result set (ASC or DESC, NULLS FIRST/LAST).',
    whyItMatters: 'Because ORDER BY runs AFTER SELECT, you CAN safely reference SELECT column aliases and expressions here!',
    interviewTip: 'Sorting is computationally expensive (O(N log N) or external disk merge sort). Combine with LIMIT to allow Top-N heap optimization.'
  },
  {
    id: 'limit',
    keyword: 'LIMIT / OFFSET',
    lexicalPos: 7,
    logicalPos: 7,
    role: 'Window Slicing',
    action: 'Truncates the sorted stream to return only the first N rows (optionally skipping OFFSET).',
    whyItMatters: 'LIMIT without ORDER BY produces non-deterministic, flaky results between database runs.',
    interviewTip: 'High-offset pagination (OFFSET 1000000) causes full-table scans. Use keyset/cursor pagination for enterprise scale.'
  }
];
