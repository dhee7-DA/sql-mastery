'use client';

import React from 'react';

interface EditorialDiagramSvgProps {
  topicSeq: string;
  problemTitle: string;
  tierName?: string;
  targetTable: string;
  expectedRowCount?: number;
}

export function EditorialDiagramSvg({
  topicSeq = '01',
  problemTitle,
  tierName = 'Standard',
  targetTable = 'CITY',
  expectedRowCount = 5,
}: EditorialDiagramSvgProps) {
  const accentColor =
    topicSeq === '01' ? '#2563eb' :
    topicSeq === '02' ? '#dc2626' :
    topicSeq === '03' ? '#d97706' :
    topicSeq === '04' ? '#7c3aed' :
    topicSeq === '05' ? '#0284c7' :
    topicSeq === '06' ? '#059669' :
    topicSeq === '07' ? '#4f46e5' :
    topicSeq === '08' ? '#ea580c' :
    topicSeq === '09' ? '#0891b2' : '#9333ea';

  const footerNote =
    topicSeq === '01' ? 'Physical projection isolates required column vectors directly into CPU registers, pruning unreferenced fields to eliminate disk/bus bandwidth overhead.' :
    topicSeq === '02' ? 'SARGable predicates enable B-Tree index traversal (O(log N)), cutting off full heap scans before memory allocation.' :
    topicSeq === '03' ? 'Top-N heap optimization maintains a bounded in-memory priority queue of size K, avoiding expensive disk-based external merge sorts.' :
    topicSeq === '04' ? 'Vector aggregators condense N relational tuples down to 1 scalar summary row in a single sequential pass over columnar memory.' :
    topicSeq === '05' ? 'GROUP BY constructs in-memory hash buckets; HAVING executes post-aggregation filtering on bucket aggregates before emission.' :
    topicSeq === '06' ? 'Hash joins hash the smaller relation into an in-memory hash table, then probe it with the outer relation in linear O(N + M) time.' :
    topicSeq === '07' ? 'Self-joins project a table against itself; directional inequality predicates (A.id < B.id) eliminate duplicate symmetric permutations.' :
    topicSeq === '08' ? 'CASE expressions evaluate conditions in strict sequential order; the first branch evaluating to TRUE short-circuits remaining evaluations.' :
    topicSeq === '09' ? 'Common Table Expressions provide clean modular DAG composition, materialized in ephemeral memory buffers or inlined by modern cost-based optimizers.' :
    'Window functions calculate peer aggregations over defined row frames without collapsing the underlying relational tuples.';

  return (
    <div className="w-full flex flex-col bg-surface border border-border/80 rounded-lg overflow-hidden shadow-xs">
      {/* Editorial Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border bg-muted-surface/40">
        <div className="flex items-center gap-2">
          <span
            style={{ color: accentColor }}
            className="font-mono text-[10px] font-bold uppercase tracking-wider"
          >
            TOPIC {topicSeq} ARCHITECTURE // {tierName.toUpperCase()}
          </span>
          <span className="text-muted-foreground/60">&bull;</span>
          <span className="text-xs font-semibold text-foreground truncate max-w-sm">
            {problemTitle}
          </span>
        </div>
        <span className="text-[9.5px] font-mono text-muted-foreground uppercase hidden sm:inline">
          CATHRYN LAVERY EDITORIAL DESIGN SYSTEM
        </span>
      </div>

      {/* Inline Responsive SVG */}
      <div className="p-3 flex items-center justify-center min-h-[300px] overflow-x-auto">
        <svg
          viewBox="0 0 740 330"
          className="w-full h-auto max-h-[360px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="arrowHeadReact" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={accentColor} />
            </marker>
            <marker id="arrowGreenReact" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
            </marker>
            <marker id="arrowRedReact" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626" />
            </marker>
            <pattern id="diagGridDotsReact" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#e4e4e7" opacity="0.6" />
            </pattern>
          </defs>

          {/* Grid Backdrop */}
          <rect width="740" height="330" fill="url(#diagGridDotsReact)" rx="6" />

          {/* Topic-specific visual primitives */}
          {topicSeq === '01' && (
            <g>
              <g transform="translate(24, 28)">
                <rect width="200" height="274" rx="6" fill="#ffffff" stroke="#d4d4d8" strokeWidth="1.2" />
                <rect width="200" height="30" rx="6" fill="#f4f4f5" />
                <text x="12" y="20" fontFamily="system-ui, sans-serif" fontSize="10.5" fontWeight="700" fill="#18181b">TABLE: {targetTable}</text>
                <text x="12" y="48" fontFamily="ui-monospace, monospace" fontSize="9" fill="#71717a">COLUMN SCAN // DISK</text>
                <rect x="12" y="62" width="176" height="28" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />
                <text x="20" y="80" fontFamily="ui-monospace, monospace" fontSize="9.5" fill="#18181b">ID (PK)</text>
                <rect x="12" y="98" width="176" height="28" rx="4" fill="rgba(37,99,235,0.06)" stroke={accentColor} strokeWidth="1.4" />
                <text x="20" y="116" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="700" fill={accentColor}>NAME ★</text>
                <rect x="12" y="134" width="176" height="28" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />
                <text x="20" y="152" fontFamily="ui-monospace, monospace" fontSize="9.5" fill="#18181b">COUNTRYCODE</text>
                <rect x="12" y="170" width="176" height="28" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />
                <text x="20" y="188" fontFamily="ui-monospace, monospace" fontSize="9.5" fill="#18181b">DISTRICT</text>
                <rect x="12" y="206" width="176" height="28" rx="4" fill="rgba(37,99,235,0.06)" stroke={accentColor} strokeWidth="1.4" />
                <text x="20" y="224" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="700" fill={accentColor}>POPULATION ★</text>
                <text x="100" y="260" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#71717a">5 Column Vectors In-Memory</text>
              </g>
              <path d="M 224 112 H 264" fill="none" stroke={accentColor} strokeWidth="1.6" markerEnd="url(#arrowHeadReact)" />
              <path d="M 224 220 H 264" fill="none" stroke={accentColor} strokeWidth="1.6" markerEnd="url(#arrowHeadReact)" />
              <g transform="translate(268, 48)">
                <rect width="192" height="234" rx="6" fill="#ffffff" stroke={accentColor} strokeWidth="1.5" />
                <rect width="192" height="30" rx="6" fill={accentColor} />
                <text x="96" y="20" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10.5" fontWeight="700" fill="#ffffff">PROJECTION FUNNEL</text>
                <text x="14" y="52" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={accentColor}>SELECT CLAUSE FILTER</text>
                <rect x="12" y="62" width="168" height="46" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />
                <text x="20" y="80" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="700" fill="#18181b">ACTIVE REGISTERS</text>
                <text x="20" y="96" fontFamily="ui-monospace, monospace" fontSize="8.5" fill={accentColor}>NAME, POPULATION</text>
                <rect x="12" y="118" width="168" height="46" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />
                <text x="20" y="136" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="700" fill="#71717a">PRUNED COLUMNS</text>
                <text x="20" y="152" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#a1a1aa">Bypassed (Zero CPU Copy)</text>
                <rect x="12" y="176" width="168" height="36" rx="4" fill="rgba(37,99,235,0.06)" />
                <text x="96" y="198" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={accentColor}>FAST-PATH EMISSION</text>
              </g>
              <path d="M 460 165 H 496" fill="none" stroke={accentColor} strokeWidth="1.6" markerEnd="url(#arrowHeadReact)" />
              <g transform="translate(500, 28)">
                <rect width="216" height="274" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1.4" />
                <rect width="216" height="30" rx="6" fill="rgba(16,185,129,0.12)" />
                <text x="12" y="20" fontFamily="system-ui, sans-serif" fontSize="10.5" fontWeight="700" fill="#047857">RESULT SET (EMITTED)</text>
                <text x="12" y="48" fontFamily="ui-monospace, monospace" fontSize="9" fill="#059669">{expectedRowCount} TUPLES PROJECTED</text>
                <rect x="12" y="62" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <text x="20" y="79" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="600" fill="#047857">1 &bull; Scottsdale | 202,705</text>
                <rect x="12" y="96" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <text x="20" y="113" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="600" fill="#047857">2 &bull; Corona | 124,966</text>
                <rect x="12" y="130" width="192" height="26" rx="4" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <text x="20" y="147" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="600" fill="#047857">3 &bull; Concord | 121,780</text>
                <rect x="12" y="234" width="192" height="28" rx="4" fill="#f4f4f5" />
                <text x="108" y="252" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="700" fill="#059669">✓ 100% RELATIONAL MATCH</text>
              </g>
            </g>
          )}

          {topicSeq === '02' && (
            <g>
              <g transform="translate(24, 28)">
                <rect width="190" height="274" rx="6" fill="#ffffff" stroke="#d4d4d8" strokeWidth="1.2" />
                <rect width="190" height="30" rx="6" fill="#f4f4f5" />
                <text x="12" y="20" fontFamily="system-ui, sans-serif" fontSize="10.5" fontWeight="700" fill="#18181b">INPUT TUPLE STREAM</text>
                <rect x="10" y="62" width="170" height="34" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />
                <text x="18" y="78" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="600" fill="#18181b">Tuple 1: 202,705</text>
                <text x="18" y="90" fontFamily="ui-monospace, monospace" fontSize="8" fill="#059669">Satisfies &gt; 100k</text>
                <rect x="10" y="106" width="170" height="34" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />
                <text x="18" y="122" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="600" fill="#18181b">Tuple 2: 85,000</text>
                <text x="18" y="134" fontFamily="ui-monospace, monospace" fontSize="8" fill="#dc2626">Fails Predicate</text>
                <text x="95" y="260" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#71717a">Unfiltered Tuple Buffer</text>
              </g>
              <path d="M 214 165 H 244" fill="none" stroke={accentColor} strokeWidth="1.6" markerEnd="url(#arrowHeadReact)" />
              <g transform="translate(248, 28)">
                <rect width="216" height="274" rx="6" fill="#ffffff" stroke={accentColor} strokeWidth="1.5" />
                <rect width="216" height="30" rx="6" fill={accentColor} />
                <text x="108" y="20" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10.5" fontWeight="700" fill="#ffffff">WHERE PREDICATE GATE</text>
                <rect x="12" y="62" width="192" height="42" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />
                <text x="20" y="78" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="700" fill="#18181b">SARGABLE CONDITION</text>
                <text x="20" y="94" fontFamily="ui-monospace, monospace" fontSize="8.5" fill={accentColor}>POPULATION &gt; 100,000</text>
                <rect x="12" y="114" width="192" height="64" rx="4" fill="rgba(5,150,105,0.06)" stroke="rgba(5,150,105,0.3)" strokeWidth="1" />
                <text x="20" y="132" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="700" fill="#047857">TRUE CHANNEL &rarr; PASS</text>
                <text x="20" y="148" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#059669">Streamed to Output Buffer</text>
                <rect x="12" y="188" width="192" height="52" rx="4" fill="rgba(220,38,38,0.06)" stroke="rgba(220,38,38,0.3)" strokeWidth="1" />
                <text x="20" y="206" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="700" fill="#dc2626">FALSE/NULL &rarr; SINK</text>
              </g>
              <path d="M 464 146 H 496" fill="none" stroke="#059669" strokeWidth="1.8" markerEnd="url(#arrowGreenReact)" />
              <path d="M 464 214 H 496" fill="none" stroke="#dc2626" strokeWidth="1.8" markerEnd="url(#arrowRedReact)" />
              <g transform="translate(500, 28)">
                <rect width="216" height="136" rx="6" fill="#ffffff" stroke="#059669" strokeWidth="1.4" />
                <rect width="216" height="28" rx="6" fill="rgba(5,150,105,0.12)" />
                <text x="12" y="19" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="700" fill="#047857">QUALIFYING BUFFER</text>
                <text x="108" y="122" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8.5" fontWeight="700" fill="#059669">✓ 100% SELECTIVITY MATCH</text>
              </g>
              <g transform="translate(500, 176)">
                <rect width="216" height="126" rx="6" fill="#ffffff" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 3" />
                <rect width="216" height="28" rx="6" fill="rgba(220,38,38,0.08)" />
                <text x="12" y="19" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="700" fill="#dc2626">DISCARDED SINK</text>
                <text x="108" y="106" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8.5" fontWeight="600" fill="#dc2626">PRUNED FROM PIPELINE</text>
              </g>
            </g>
          )}

          {/* Fallback diagram for Topics 03-10 */}
          {topicSeq !== '01' && topicSeq !== '02' && (
            <g>
              <g transform="translate(24, 28)">
                <rect width="190" height="274" rx="6" fill="#ffffff" stroke="#d4d4d8" strokeWidth="1.2" />
                <rect width="190" height="30" rx="6" fill="#f4f4f5" />
                <text x="12" y="20" fontFamily="system-ui, sans-serif" fontSize="10.5" fontWeight="700" fill="#18181b">INPUT PIPELINE</text>
                <text x="12" y="48" fontFamily="ui-monospace, monospace" fontSize="9" fill="#71717a">TUPLE MEMORY STREAM</text>
                <rect x="10" y="62" width="170" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />
                <text x="18" y="79" fontFamily="ui-monospace, monospace" fontSize="9" fill="#18181b">Partition Buffer 1</text>
                <rect x="10" y="94" width="170" height="26" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />
                <text x="18" y="111" fontFamily="ui-monospace, monospace" fontSize="9" fill="#18181b">Partition Buffer 2</text>
                <text x="95" y="260" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#71717a">Relational Source</text>
              </g>
              <path d="M 214 165 H 244" fill="none" stroke={accentColor} strokeWidth="1.6" markerEnd="url(#arrowHeadReact)" />
              <g transform="translate(248, 28)">
                <rect width="216" height="274" rx="6" fill="#ffffff" stroke={accentColor} strokeWidth="1.5" />
                <rect width="216" height="30" rx="6" fill={accentColor} />
                <text x="108" y="20" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10.5" fontWeight="700" fill="#ffffff">TRANSFORMATION KERNEL</text>
                <rect x="12" y="62" width="192" height="42" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1" />
                <text x="20" y="78" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="700" fill="#18181b">OPERATOR NODE</text>
                <text x="20" y="94" fontFamily="ui-monospace, monospace" fontSize="8.5" fill={accentColor}>TOPIC {topicSeq} LOGIC</text>
                <rect x="12" y="114" width="192" height="64" rx="4" fill="rgba(37,99,235,0.06)" />
                <text x="108" y="145" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={accentColor}>PHYSICAL EXECUTION</text>
                <rect x="12" y="188" width="192" height="42" rx="4" fill="#f4f4f5" />
                <text x="108" y="212" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8.5" fontWeight="600" fill="#18181b">ZERO DISK SPILL</text>
              </g>
              <path d="M 464 165 H 496" fill="none" stroke={accentColor} strokeWidth="1.6" markerEnd="url(#arrowHeadReact)" />
              <g transform="translate(500, 28)">
                <rect width="216" height="274" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1.4" />
                <rect width="216" height="30" rx="6" fill="rgba(16,185,129,0.12)" />
                <text x="12" y="20" fontFamily="system-ui, sans-serif" fontSize="10.5" fontWeight="700" fill="#047857">MATERIALIZED RESULT</text>
                <text x="12" y="48" fontFamily="ui-monospace, monospace" fontSize="9" fill="#059669">{expectedRowCount || 5} TUPLES EMITTED</text>
                <rect x="10" y="62" width="196" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
                <text x="18" y="79" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="#047857">1 &bull; Verified Tuple</text>
                <rect x="10" y="94" width="196" height="26" rx="4" fill="rgba(16,185,129,0.05)" />
                <text x="18" y="111" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="#047857">2 &bull; Verified Tuple</text>
                <rect x="10" y="230" width="196" height="28" rx="4" fill="#f4f4f5" />
                <text x="108" y="248" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="#059669">✓ 100% RELATIONAL EMISSION</text>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Editorial Caption Footer */}
      <div className="px-3.5 py-2 border-t border-border bg-muted-surface/40 text-xs text-muted-foreground flex items-center justify-between">
        <span className="truncate max-w-xl">
          <strong className="text-foreground">Physical Execution:</strong> {footerNote}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground shrink-0">
          LATENCY ~0.8ms
        </span>
      </div>
    </div>
  );
}
