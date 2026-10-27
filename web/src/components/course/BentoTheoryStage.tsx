'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, AlertTriangle, Mic, ArrowRight, Play, CheckCircle2, RotateCcw } from 'lucide-react';
import { TopicPhase } from '@/data/masteryCourseData';
import { SQL_CLAUSES, SqlClause } from '@/data/sqlClausesData';
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
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleResetPuzzle = () => {
    setPuzzleOrder(['select', 'from', 'where', 'group_by', 'having', 'order_by', 'limit']);
    setPuzzleSubmitted(false);
    setPuzzleCorrect(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Top Bento Grid: Architecture Preview & Everyday Analogy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bento Card 1: Interactive Architecture / Concept Explainer (8 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0c101b]/80 p-6 backdrop-blur-xl shadow-bento">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  RELATIONAL ARCHITECTURE &amp; EXECUTION ENGINE
                </h3>
              </div>
              <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-indigo-400">
                ACTIVE PIPELINE
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <h4 className="text-base font-bold text-slate-100 font-sans">
                {topic.name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {(topic.deepTheory && topic.deepTheory[0]?.body) || topic.summary}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/40 p-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                SQL
              </span>
              <span className="text-xs text-slate-300 font-mono">
                SELECT * FROM Employees WHERE salary &gt; 100000;
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
              <Play className="h-3 w-3 fill-emerald-400" /> Live AST
            </span>
          </div>
        </div>

        {/* Bento Card 2: Everyday Analogy (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0c101b]/80 p-6 backdrop-blur-xl shadow-bento">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-white/[0.08]">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                EVERYDAY METAPHOR
              </h3>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-bold text-amber-300">
                {topic.analogy.metaphor}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                &ldquo;{topic.analogy.story}&rdquo;
              </p>
            </div>
          </div>

          {topic.analogy.takeaway && (
            <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-200/90 leading-relaxed">
              <strong>💡 Golden Takeaway:</strong> {topic.analogy.takeaway}
            </div>
          )}
        </div>
      </div>

      {/* 2. Bento Card 3: Interactive Execution Sequencer (Logical vs Lexical) */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0c101b]/80 p-6 backdrop-blur-xl shadow-bento">
        {/* Header with Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold">
                ⚡
              </span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                SQL ENGINE EXECUTION ORDER (LOGICAL VS. LEXICAL)
              </h3>
            </div>
            <p className="mt-0.5 text-xs text-slate-400">
              What you write (lexical) is NOT how the engine computes it (logical).
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-black/40 p-1">
            <button
              onClick={() => setOrderMode('logical')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                orderMode === 'logical'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🔍 Logical (Engine)
            </button>
            <button
              onClick={() => setOrderMode('lexical')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                orderMode === 'lexical'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ✍️ Lexical (Syntax)
            </button>
            <button
              onClick={() => setOrderMode('puzzle')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                orderMode === 'puzzle'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🧩 Puzzle Mode
            </button>
          </div>
        </div>

        {/* Content depending on mode */}
        {orderMode === 'puzzle' ? (
          <div className="mt-5 flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs text-slate-300">
                Arrange the 7 clauses below in the <strong>exact order</strong> the engine processes them:
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleVerifyPuzzle}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white transition-all shadow-sm flex items-center gap-1"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verify Sequence
                </button>
                <button
                  onClick={handleResetPuzzle}
                  className="rounded-lg border border-white/10 hover:border-white/20 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center gap-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
            </div>

            {puzzleSubmitted && (
              <div
                className={`rounded-xl border p-3.5 text-xs font-medium ${
                  puzzleCorrect
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                }`}
              >
                {puzzleCorrect
                  ? '🎉 100% CORRECT! You understand the internal relational engine pipeline better than 90% of candidates!'
                  : '⚠️ Not quite in execution order! Remember: FROM gathers the data before WHERE filters rows, and GROUP BY executes before HAVING.'}
              </div>
            )}

            <div className="flex flex-col gap-2">
              {puzzleOrder.map((id, idx) => {
                const clause = SQL_CLAUSES.find((c) => c.id === id)!;
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-black/40 px-4 py-2.5 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-rose-400">#{idx + 1}</span>
                      <span className="font-mono font-bold text-white">{clause.keyword}</span>
                      <span className="text-slate-400 font-sans">({clause.role})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => movePuzzleItem(idx, -1)}
                        className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ▲
                      </button>
                      <button
                        disabled={idx === puzzleOrder.length - 1}
                        onClick={() => movePuzzleItem(idx, 1)}
                        className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-5">
            {/* Pipeline Rail */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {sortedClauses.map((clause, idx) => {
                const isSelected = clause.id === activeClause.id;
                const stepNum = orderMode === 'logical' ? clause.logicalPos : clause.lexicalPos;
                return (
                  <React.Fragment key={clause.id}>
                    <button
                      onClick={() => setActiveClauseId(clause.id)}
                      className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                        isSelected
                          ? 'bg-rose-500 text-white shadow-glow-rose font-bold'
                          : 'border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/30 text-[9px] font-mono font-bold">
                        {stepNum}
                      </span>
                      <span className="font-mono">{clause.keyword}</span>
                    </button>
                    {idx < sortedClauses.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-slate-600 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Selected Clause Deep Dive */}
            <div className="rounded-xl border border-white/[0.08] bg-black/30 p-4.5">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-400">
                    STAGE {orderMode === 'logical' ? activeClause.logicalPos : activeClause.lexicalPos} OF 7
                  </span>
                  <h4 className="font-bold text-white font-mono text-sm">
                    {activeClause.keyword} <span className="font-sans text-slate-400 text-xs">({activeClause.role})</span>
                  </h4>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-mono font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    ⚙️ ENGINE ACTION:
                  </span>
                  <p className="mt-1 text-slate-300 leading-relaxed">
                    {activeClause.action}
                  </p>
                  <p className="mt-2 text-slate-400 leading-relaxed">
                    {activeClause.whyItMatters}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
                    <span className="font-mono font-bold text-indigo-400 uppercase tracking-wider text-[10px]">
                      🎙️ FAANG INTERVIEW DEFENSE:
                    </span>
                    <p className="mt-1 text-slate-300 leading-relaxed italic">
                      &ldquo;{activeClause.interviewTip}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Bento Grid: FAANG Screening Script & Gotchas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bento Card 4: FAANG Screening Script (6 cols) */}
        {topic.interviewDefense && (
          <div className="lg:col-span-6 rounded-2xl border border-white/[0.08] bg-[#0c101b]/80 p-6 backdrop-blur-xl shadow-bento flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-rose-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    FAANG SCREENING SCRIPT
                  </h3>
                </div>
                <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-400">
                  {topic.interviewDefense.difficulty}
                </span>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-bold text-white">
                  &ldquo;{topic.interviewDefense.question}&rdquo;
                </h4>
                <div className="mt-3 rounded-xl border border-white/[0.08] bg-black/40 p-3.5 text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{topic.interviewDefense.spokenAnswer}&rdquo;
                </div>
              </div>
            </div>

            {topic.interviewDefense.powerKeywords && (
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-slate-400">KEYWORDS:</span>
                {topic.interviewDefense.powerKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-indigo-500/25 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-mono text-indigo-300"
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
          <div className="lg:col-span-6 rounded-2xl border border-white/[0.08] bg-[#0c101b]/80 p-6 backdrop-blur-xl shadow-bento flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    HIGH-YIELD GOTCHA &amp; TRAP
                  </h3>
                </div>
                <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-400">
                  {topic.traps[0].severity}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <h4 className="text-sm font-bold text-amber-300">
                  {topic.traps[0].title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {topic.traps[0].whyItBreaks}
                </p>
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-2.5 text-[11px] text-red-300">
                  <strong>🚨 Corporate Impact:</strong> {topic.traps[0].corporateImpact}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/40 p-3 font-mono text-[11px]">
              <span className="text-emerald-400">✓ Production Standard:</span>
              <pre className="mt-1 text-slate-200 overflow-x-auto">{topic.traps[0].goodSql}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
