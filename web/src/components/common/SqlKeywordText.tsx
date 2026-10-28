'use client';

import React from 'react';

// Compound keywords ordered first so they match before individual words
const SQL_KEYWORDS = [
  'FULL OUTER JOIN',
  'INNER JOIN',
  'LEFT JOIN',
  'RIGHT JOIN',
  'UNION ALL',
  'PARTITION BY',
  'GROUP BY',
  'ORDER BY',
  'QUERY PLAN',
  'IS NOT NULL',
  'IS NULL',
  'PRIMARY KEY',
  'FOREIGN KEY',
  'SELECT',
  'FROM',
  'WHERE',
  'HAVING',
  'LIMIT',
  'OFFSET',
  'JOIN',
  'ON',
  'CASE',
  'WHEN',
  'THEN',
  'ELSE',
  'END',
  'WITH',
  'OVER',
  'UNION',
  'DISTINCT',
  'AND',
  'OR',
  'NOT',
  'IN',
  'LIKE',
  'IS',
  'NULL',
  'AS',
  'DESC',
  'ASC',
  'EXPLAIN',
];

const SQL_FUNCTIONS = [
  'COUNT',
  'ROUND',
  'AVG',
  'SUM',
  'MIN',
  'MAX',
  'COALESCE',
  'LAG',
  'LEAD',
  'DENSE_RANK',
  'ROW_NUMBER',
  'RANK',
];

// Regex matching keywords, functions, string literals, and numbers
const TOKEN_REGEX = new RegExp(
  `('(?:''|[^'])*')|\\b(${SQL_KEYWORDS.join('|')})\\b|\\b(${SQL_FUNCTIONS.join('|')})\\b`,
  'gi'
);

interface SqlKeywordTextProps {
  text?: string;
  className?: string;
}

export function SqlKeywordText({ text = '', className = '' }: SqlKeywordTextProps) {
  if (!text) return null;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Reset regex index
  TOKEN_REGEX.lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchText = match[0];

    // Push preceding non-matched text
    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }

    if (match[1]) {
      // String literal e.g. 'Engineering'
      parts.push(
        <span key={matchIndex} className="text-sql-string font-mono font-medium">
          {matchText}
        </span>
      );
    } else if (match[2]) {
      // SQL Keyword e.g. SELECT, FROM, WHERE, GROUP BY
      parts.push(
        <span key={matchIndex} className="text-sql-keyword font-mono font-bold tracking-tight">
          {matchText.toUpperCase()}
        </span>
      );
    } else if (match[3]) {
      // SQL Function e.g. COUNT, AVG, ROUND
      parts.push(
        <span key={matchIndex} className="text-sql-function font-mono font-bold tracking-tight">
          {matchText.toUpperCase()}
        </span>
      );
    } else {
      parts.push(matchText);
    }

    lastIndex = matchIndex + matchText.length;
  }

  // Push trailing text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <span className={className}>{parts}</span>;
}
