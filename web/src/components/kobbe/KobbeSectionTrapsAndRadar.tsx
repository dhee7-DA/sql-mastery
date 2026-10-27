'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCw, CheckCircle2, ShieldAlert, Award, Sparkles } from 'lucide-react';

interface Flashcard {
  id: number;
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'SENIOR';
  title: string;
  trapCode: string;
  trapExplanation: string;
  corporateImpact: string;
  productionFix: string;
}

const TRAP_CARDS: Flashcard[] = [
  {
    id: 1,
    category: 'THREE-VALUED LOGIC',
    severity: 'CRITICAL',
    title: 'NOT IN with NULL in Subquery',
    trapCode: `SELECT * FROM Customers\nWHERE id NOT IN (\n  SELECT customer_id FROM Orders\n); -- If ANY order has NULL, 0 rows return!`,
    trapExplanation: 'In SQL, val = NULL is UNKNOWN. NOT (UNKNOWN) is still UNKNOWN. The entire WHERE clause fails to be TRUE.',
    corporateImpact: 'Silently dropped $420,000 of inactive customer reactivation emails.',
    productionFix: `SELECT * FROM Customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM Orders o\n  WHERE o.customer_id = c.id\n);`,
  },
  {
    id: 2,
    category: 'EXECUTION ORDER',
    severity: 'CRITICAL',
    title: 'Filtering on SELECT Aliases in WHERE',
    trapCode: `SELECT first_name, salary * 1.15 AS adjusted_pay\nFROM Employees\nWHERE adjusted_pay > 100000; -- Syntax Error!`,
    trapExplanation: 'WHERE evaluates at Stage 2. SELECT evaluates at Stage 5. adjusted_pay does not exist in memory when WHERE runs.',
    corporateImpact: 'Query fails to parse at production deploy time with: column does not exist.',
    productionFix: `SELECT first_name, salary * 1.15 AS adjusted_pay\nFROM Employees\nWHERE salary * 1.15 > 100000; -- Or wrap in a CTE`,
  },
  {
    id: 3,
    category: 'AGGREGATION SEMANTICS',
    severity: 'HIGH',
    title: 'COUNT(*) vs COUNT(column)',
    trapCode: `SELECT COUNT(*) AS total_rows,\n       COUNT(bonus) AS bonus_count\nFROM Employees; -- bonus_count ignores NULLs!`,
    trapExplanation: 'COUNT(*) counts physical tuples entering the stage. COUNT(col) evaluates non-NULL values only.',
    corporateImpact: 'Financial reports understated eligible bonus participants by 14%.',
    productionFix: `SELECT COUNT(*) AS total_employees,\n       COUNT(COALESCE(bonus, 0)) AS explicit_count\nFROM Employees;`,
  },
  {
    id: 4,
    category: 'JOIN EXPLOSION',
    severity: 'CRITICAL',
    title: 'Unintended Duplicate Key Cartesian Explosion',
    trapCode: `SELECT SUM(o.total_amount)\nFROM Customers c\nJOIN Orders o ON c.id = o.customer_id\nJOIN Subscriptions s ON c.id = s.customer_id;`,
    trapExplanation: 'Joining multiple 1-to-many child tables multiplies tuples (N x M) before SUM aggregates them.',
    corporateImpact: 'Quarterly revenue metric reported 340% higher than GAAP actuals.',
    productionFix: `WITH OrderTotals AS (\n  SELECT customer_id, SUM(total_amount) AS total_orders\n  FROM Orders GROUP BY customer_id\n)\nSELECT SUM(total_orders) FROM OrderTotals;`,
  },
];

export function KobbeSectionTrapsAndRadar() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Radar chart points for 6 competencies
  // Center is (150, 150), Radius is 100
  const categories = [
    { name: 'Row Filtering', score: 0.95 },
    { name: 'Relational Joins', score: 0.88 },
    { name: 'Aggregation', score: 0.92 },
    { name: 'Window Analytics', score: 0.85 },
    { name: 'Set Logic', score: 0.90 },
    { name: 'Execution Mechanics', score: 0.98 },
  ];

  const center = 150;
  const radius = 95;

  const getCoordinates = (index: number, total: number, score: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const x = center + radius * score * Math.cos(angle);
    const y = center + radius * score * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = categories
    .map((c, i) => {
      const pt = getCoordinates(i, categories.length, c.score);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  const gridCircles = [0.25, 0.5, 0.75, 1.0];

  return (
    <section id="section-traps" className="py-14 sm:py-18 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-8">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-xs sm:text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-1.5">
          <span className="text-foreground font-medium block mb-1">
            Traps & Competencies,
          </span>
          corporate postmortems and your relational architecture readiness radar.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Master the edge cases that trigger production postmortems
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed text-pretty">
              90% of candidates fail technical SQL screens not on basic syntax, but on subtle relational semantics like three-valued logic, Cartesian joins, and execution boundaries.
            </p>
          </div>
        </div>

        {/* 2-Column Showcase: 3D Flip Flashcards (Left) & Radar Chart (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: 4 Interactive 3D Flip Flashcards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-mono font-bold text-foreground">
                HIGH-YIELD FAANG GOTCHA FLASHCARDS
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                Click any card to flip solution
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRAP_CARDS.map((card) => {
                const isFlipped = !!flippedCards[card.id];

                return (
                  <div
                    key={card.id}
                    onClick={() => toggleFlip(card.id)}
                    className="relative h-56 cursor-pointer perspective-1000 select-none group"
                  >
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full transform-style-3d rounded-xl shadow-panel border border-border"
                    >
                      {/* FRONT OF CARD */}
                      <div className="absolute inset-0 backface-hidden rounded-xl bg-surface p-3.5 flex flex-col justify-between overflow-hidden">
                        <div>
                          <div className="flex items-center justify-between pb-2 border-b border-border/70">
                            <span className="text-[9px] font-mono font-bold text-muted-foreground uppercase">
                              {card.category}
                            </span>
                            <span className="rounded bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 px-1.5 py-0.2 text-[9px] font-mono font-bold">
                              {card.severity}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-foreground mt-2 leading-snug">
                            {card.title}
                          </h4>

                          <pre className="mt-2 rounded bg-muted-surface p-2 text-[10px] font-mono text-rose-600 dark:text-rose-400 overflow-x-auto leading-relaxed">
                            {card.trapCode}
                          </pre>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border/70 text-[10px] font-mono text-muted-foreground">
                          <span>⚠️ Flip to see bug & fix</span>
                          <RotateCw className="size-3 group-hover:rotate-45 transition-transform" />
                        </div>
                      </div>

                      {/* BACK OF CARD */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-muted-surface p-3.5 flex flex-col justify-between overflow-hidden">
                        <div>
                          <div className="flex items-center justify-between pb-2 border-b border-border/70">
                            <span className="text-[9px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                              ✓ SENIOR PRODUCTION FIX
                            </span>
                            <span className="text-[9px] font-mono text-muted-foreground">FLIPPED</span>
                          </div>

                          <p className="text-[11px] text-foreground font-semibold mt-1.5 leading-snug">
                            {card.corporateImpact}
                          </p>

                          <pre className="mt-2 rounded bg-surface border border-border p-2 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 overflow-x-auto leading-relaxed">
                            {card.productionFix}
                          </pre>
                        </div>

                        <div className="pt-2 border-t border-border/70 text-[10px] font-mono text-muted-foreground flex items-center justify-between">
                          <span>Click to return</span>
                          <CheckCircle2 className="size-3 text-emerald-600" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Relational Competency Radar Chart (5 cols) */}
          <div className="lg:col-span-5 flex flex-col rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-panel justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Award className="size-4 text-foreground" />
                  <h3 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                    COMPETENCY RADAR PROFILE
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 text-[9px] font-mono font-bold">
                  92.3% OVERALL
                </span>
              </div>

              {/* Radar Graphic */}
              <div className="my-2 flex items-center justify-center">
                <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
                  {/* Concentric Polygons */}
                  {gridCircles.map((fraction, idx) => {
                    const pts = categories
                      .map((_, i) => {
                        const pt = getCoordinates(i, categories.length, fraction);
                        return `${pt.x},${pt.y}`;
                      })
                      .join(' ');
                    return (
                      <polygon
                        key={idx}
                        points={pts}
                        fill="none"
                        stroke="currentColor"
                        className="text-border"
                        strokeWidth="1"
                        strokeDasharray={idx < 3 ? '2 2' : 'none'}
                      />
                    );
                  })}

                  {/* Axis Spokes */}
                  {categories.map((_, i) => {
                    const pt = getCoordinates(i, categories.length, 1.0);
                    return (
                      <line
                        key={i}
                        x1={center}
                        y1={center}
                        x2={pt.x}
                        y2={pt.y}
                        stroke="currentColor"
                        className="text-border"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Filled Value Polygon */}
                  <polygon
                    points={polygonPoints}
                    fill="currentColor"
                    className="text-emerald-500/20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {/* Value Vertices */}
                  {categories.map((c, i) => {
                    const pt = getCoordinates(i, categories.length, c.score);
                    return (
                      <circle
                        key={i}
                        cx={pt.x}
                        cy={pt.y}
                        r="3.5"
                        fill="currentColor"
                        className="text-dark-background"
                      />
                    );
                  })}

                  {/* Labels */}
                  {categories.map((c, i) => {
                    const labelPt = getCoordinates(i, categories.length, 1.18);
                    return (
                      <text
                        key={i}
                        x={labelPt.x}
                        y={labelPt.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[9px] font-mono font-medium fill-muted-foreground"
                      >
                        {c.name} ({Math.round(c.score * 100)}%)
                      </text>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>Benchmark: Senior Staff Level</span>
              <span className="text-foreground font-semibold">0 Diagnostic Gaps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
