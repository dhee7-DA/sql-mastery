'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lightbulb, AlertTriangle, Mic, ArrowRight, Play, CheckCircle2, RotateCcw } from 'lucide-react';
import { TopicPhase } from '@/data/masteryCourseData';
import { SQL_CLAUSES, SqlClause } from '@/data/sqlClausesData';
import { SqlKeywordText } from '@/components/common/SqlKeywordText';
import confetti from 'canvas-confetti';

interface BentoTheoryStageProps {
  topic: TopicPhase;
}

export function BentoTheoryStage({ topic }: BentoTheoryStageProps) {
  // Sequencer state
  const [orderMode, setOrderMode] = useState<'logical' | 'lexical' | 'puzzle'>('logical');
  const [activeClauseId, setActiveClauseId] = useState<string>('from');
  const [puzzleOrder, setPuzzleOrder] = useState<string[]>([
    'select', 'from', 'where', 'group_by', 'having', 'order_by', 'limit'
  ]);
  const [puzzleSubmitted, setPuzzleSubmitted] = useState<boolean>(false);
  const [puzzleCorrect, setPuzzleCorrect] = useState<boolean>(false);

  // Active clause details
  const activeClause = SQL_CLAUSES.find((c) => c.id === activeClauseId) || SQL_CLAUSES[0];

  const sortedClauses = [...SQL_CLAUSES].sort((a, b) =>
    orderMode === 'logical' ? a.logicalPos - b.logicalPos : a.lexicalPos - b.lexicalPos
  );

  const movePuzzleItem = (idx: number, delta: number) => {
    const list = [...puzzleOrder];
    const targetIdx = idx + delta;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    setPuzzleOrder(list);
    setPuzzleSubmitted(false);
  };

  const handleVerifyPuzzle = () => {
    const correctSeq = ['from', 'where', 'group_by', 'having', 'select', 'order_by', 'limit'];
    const isMatch = puzzleOrder.every((id, idx) => id === correctSeq[idx]);
    setPuzzleSubmitted(true);
    setPuzzleCorrect(isMatch);
    if (isMatch) {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleResetPuzzle = () => {
    setPuzzleOrder(['select', 'from', 'where', 'group_by', 'having', 'order_by', 'limit']);
    setPuzzleSubmitted(false);
    setPuzzleCorrect(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Top Bento Grid: Architecture Preview & Everyday Analogy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bento Card 1: Interactive Architecture / Concept Explainer (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-panel">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Sparkles className="size-3.5 text-foreground" />
                <h3 className="text-[11px] font-mono font-semibold text-foreground uppercase tracking-wider">
                  RELATIONAL ARCHITECTURE &amp; EXECUTION ENGINE
                </h3>
              </div>
              <span className="rounded-full bg-muted-surface border border-border px-2 py-0.5 text-[9px] font-mono font-medium text-muted-foreground">
                ACTIVE PIPELINE
              </span>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <h4 className="text-sm sm:text-base font-semibold text-foreground font-sans">
                {topic.name}
              </h4>
              <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                {(topic.deepTheory && topic.deepTheory[0]?.body) || topic.summary}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-muted-surface p-2.5">
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded bg-dark-background text-white text-[9px] font-mono font-semibold">
                SQL
              </span>
              <span className="text-xs text-foreground font-mono">
                <SqlKeywordText text="SELECT * FROM Employees WHERE salary > 100000;" />
              </span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground font-medium flex items-center gap-1">
              <Play className="size-2.5 fill-current" /> Live AST
            </span>
          </div>
        </div>

        {/* Bento Card 2: Everyday Analogy (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-panel">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Lightbulb className="size-3.5 text-foreground" />
              <h3 className="text-[11px] font-mono font-semibold text-foreground uppercase tracking-wider">
                EVERYDAY METAPHOR
              </h3>
            </div>

            <div className="mt-3">
              <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                {topic.analogy.metaphor}
              </h4>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed italic">
                &ldquo;{topic.analogy.story}&rdquo;
              </p>
            </div>
          </div>

          {topic.analogy.takeaway && (
            <div className="mt-3 rounded-lg border border-border bg-muted-surface p-2.5 text-xs text-foreground leading-relaxed">
              <strong className="font-mono text-[10px] uppercase tracking-wider text-foreground">[ENGINE PRINCIPLE]</strong>{' '}
              <SqlKeywordText text={topic.analogy.takeaway} />
            </div>
          )}
        </div>
      </div>

      {/* 2. Bento Card 3: Interactive Execution Sequencer (Logical vs Lexical) */}
      <div className="rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-panel">
        {/* Header with Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="flex size-4.5 items-center justify-center rounded bg-dark-background text-white text-[9px] font-mono font-bold">
                07
              </span>
              <h3 className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
                SQL ENGINE EXECUTION ORDER (LOGICAL VS. LEXICAL)
              </h3>
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              What you write (lexical) is NOT how the engine computes it (logical).
            </p>
          </div>

          <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted-surface p-0.5 shadow-2xs">
            <button
              onClick={() => setOrderMode('logical')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                orderMode === 'logical'
                  ? 'bg-dark-background text-white shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Logical (Engine)
            </button>
            <button
              onClick={() => setOrderMode('lexical')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                orderMode === 'lexical'
                  ? 'bg-dark-background text-white shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Lexical (Syntax)
            </button>
            <button
              onClick={() => setOrderMode('puzzle')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                orderMode === 'puzzle'
                  ? 'bg-dark-background text-white shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Puzzle Mode
            </button>
          </div>
        </div>

        {/* Content depending on mode */}
        {orderMode === 'puzzle' ? (
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs text-muted-foreground">
                Arrange the 7 clauses below in the <strong>exact order</strong> the relational engine evaluates them:
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleVerifyPuzzle}
                  className="rounded-md bg-dark-background hover:bg-neutral-800 active:scale-95 px-2.5 py-1 text-xs font-medium text-white transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <CheckCircle2 className="size-3" /> Verify
                </button>
                <button
                  onClick={handleResetPuzzle}
                  className="rounded-md border border-border bg-surface hover:bg-muted-surface active:scale-95 px-2.5 py-1 text-xs font-medium text-foreground transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="size-3" /> Reset
                </button>
              </div>
            </div>

            {puzzleSubmitted && (
              <div
                className={`rounded-lg border p-2.5 text-xs font-medium ${
                  puzzleCorrect
                    ? 'border-emerald-600/30 bg-emerald-50 text-emerald-900'
                    : 'border-rose-600/30 bg-rose-50 text-rose-900'
                }`}
              >
                {puzzleCorrect
                  ? '✓ VERIFIED: Relational pipeline order accurately matched.'
                  : '✕ MISMATCH: Relational engines process FROM before WHERE, and GROUP BY before HAVING.'}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {puzzleOrder.map((id, idx) => {
                const clause = SQL_CLAUSES.find((c) => c.id === id)!;
                return (
                  <motion.div
                    key={id}
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted-surface p-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-foreground text-[10px]">#{idx + 1}</span>
                      <span className="font-mono font-semibold text-foreground">{clause.keyword}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => movePuzzleItem(idx, -1)}
                        className="rounded border border-border bg-surface size-5 flex items-center justify-center text-[10px] text-foreground hover:bg-muted-surface disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer active:scale-90 transition-all"
                      >
                        ▲
                      </button>
                      <button
                        disabled={idx === puzzleOrder.length - 1}
                        onClick={() => movePuzzleItem(idx, 1)}
                        className="rounded border border-border bg-surface size-5 flex items-center justify-center text-[10px] text-foreground hover:bg-muted-surface disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer active:scale-90 transition-all"
                      >
                        ▼
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-3.5">
            {/* Pipeline Rail */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {sortedClauses.map((clause, idx) => {
                const isSelected = clause.id === activeClause.id;
                const stepNum = orderMode === 'logical' ? clause.logicalPos : clause.lexicalPos;
                return (
                  <React.Fragment key={clause.id}>
                    <button
                      onClick={() => setActiveClauseId(clause.id)}
                      className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-dark-background text-white shadow-xs font-semibold'
                          : 'border border-border bg-muted-surface text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className={`flex size-3.5 items-center justify-center rounded-full text-[8px] font-mono font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-surface text-foreground border border-border'
                      }`}>
                        {stepNum}
                      </span>
                      <span className="font-mono">{clause.keyword}</span>
                    </button>
                    {idx < sortedClauses.length - 1 && (
                      <ArrowRight className="size-3 text-muted-foreground/40 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Selected Clause Deep Dive with Cross-fade */}
            <div className="rounded-lg border border-border bg-muted-surface p-3.5 sm:p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClause.id}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-dark-background px-2 py-0.5 text-[9px] font-mono font-medium text-white">
                        STAGE {orderMode === 'logical' ? activeClause.logicalPos : activeClause.lexicalPos} OF 7
                      </span>
                      <h4 className="font-semibold text-foreground font-mono text-xs sm:text-sm">
                        <SqlKeywordText text={activeClause.keyword} />{' '}
                        <span className="font-sans text-muted-foreground text-xs font-normal">({activeClause.role})</span>
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-mono font-medium text-muted-foreground uppercase tracking-wider text-[9px]">
                        ENGINE ACTION:
                      </span>
                      <p className="mt-0.5 text-foreground leading-relaxed text-xs">
                        {activeClause.action}
                      </p>
                      <p className="mt-1 text-muted-foreground leading-relaxed text-xs">
                        {activeClause.whyItMatters}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="rounded-md border border-border bg-surface p-2.5 shadow-2xs">
                        <span className="font-mono font-semibold text-foreground uppercase tracking-wider text-[9px]">
                          [FAANG SCREENING DEFENSE]
                        </span>
                        <p className="mt-0.5 text-muted-foreground leading-relaxed italic text-xs">
                          &ldquo;{activeClause.interviewTip}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Bento Grid: FAANG Screening Script & Gotchas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bento Card 4: FAANG Screening Script (6 cols) */}
        {topic.interviewDefense && (
          <div className="lg:col-span-6 rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-panel flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Mic className="size-3.5 text-foreground" />
                  <h3 className="text-[11px] font-mono font-semibold text-foreground uppercase tracking-wider">
                    FAANG SCREENING SCRIPT
                  </h3>
                </div>
                <span className="rounded-full bg-muted-surface border border-border px-2 py-0.5 text-[9px] font-mono font-medium text-foreground">
                  {topic.interviewDefense.difficulty}
                </span>
              </div>

              <div className="mt-3">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                  &ldquo;{topic.interviewDefense.question}&rdquo;
                </h4>
                <div className="mt-2 rounded-lg border border-border bg-muted-surface p-2.5 text-xs text-foreground/90 leading-relaxed italic">
                  &ldquo;{topic.interviewDefense.spokenAnswer}&rdquo;
                </div>
              </div>
            </div>

            {topic.interviewDefense.powerKeywords && (
              <div className="mt-3 flex flex-wrap items-center gap-1">
                <span className="text-[9px] font-mono text-muted-foreground">KEYWORDS:</span>
                {topic.interviewDefense.powerKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-border bg-muted-surface px-2 py-0.2 text-[9px] font-mono text-foreground"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bento Card 5: High-Yield Traps & Corporate Gotchas (6 cols) */}
        {topic.traps && topic.traps.length > 0 && (
          <div className="lg:col-span-6 rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-panel flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-3.5 text-foreground" />
                  <h3 className="text-[11px] font-mono font-semibold text-foreground uppercase tracking-wider">
                    HIGH-YIELD GOTCHA &amp; TRAP
                  </h3>
                </div>
                <span className="rounded-full bg-muted-surface border border-border px-2 py-0.5 text-[9px] font-mono font-medium text-foreground">
                  {topic.traps[0].severity}
                </span>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                  {topic.traps[0].title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {topic.traps[0].whyItBreaks}
                </p>
                <div className="rounded-md border border-border bg-muted-surface p-2 text-[11px] text-foreground">
                  <strong className="font-mono text-[10px] uppercase tracking-wider text-foreground">[CORPORATE IMPACT]</strong>{' '}
                  {topic.traps[0].corporateImpact}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-border bg-muted-surface p-2.5 font-mono text-[11px]">
              <span className="text-foreground font-semibold">[PRODUCTION STANDARD]</span>
              <pre className="mt-1 text-muted-foreground overflow-x-auto text-[10px]">
                <SqlKeywordText text={topic.traps[0].goodSql} />
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
