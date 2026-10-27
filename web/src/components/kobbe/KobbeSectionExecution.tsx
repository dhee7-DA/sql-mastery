'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export function KobbeSectionExecution() {
  const initialShuffled = [
    'SELECT',
    'ORDER BY',
    'WHERE',
    'FROM / JOIN',
    'HAVING',
    'GROUP BY',
    'LIMIT / OFFSET',
  ];

  const correctOrder = [
    'FROM / JOIN',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'SELECT',
    'ORDER BY',
    'LIMIT / OFFSET',
  ];

  const [puzzleOrder, setPuzzleOrder] = useState<string[]>(initialShuffled);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'correct' | 'incorrect'; msg: string }>({
    status: 'idle',
    msg: '',
  });

  const moveClause = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === puzzleOrder.length - 1)) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const next = [...puzzleOrder];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    setPuzzleOrder(next);
    setFeedback({ status: 'idle', msg: '' });
  };

  const handleVerify = () => {
    const isExact = puzzleOrder.every((clause, idx) => clause === correctOrder[idx]);
    if (isExact) {
      setFeedback({
        status: 'correct',
        msg: '✓ Perfect! You reconstructed the physical internal execution order of an ANSI SQL relational engine.',
      });
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    } else {
      setFeedback({
        status: 'incorrect',
        msg: 'Not quite. Remember: FROM locates relations first, WHERE filters before GROUP BY, and SELECT projects columns near the end.',
      });
    }
  };

  const handleReset = () => {
    setPuzzleOrder(initialShuffled);
    setFeedback({ status: 'idle', msg: '' });
  };

  return (
    <section id="section-pipeline" className="py-14 sm:py-18 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-8">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-xs sm:text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-1.5">
          <span className="text-foreground font-medium block mb-1">
            Execution Pipeline,
          </span>
          seven physical checks on every query before tuples ever reach your screen.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Written syntax starts with SELECT. The database engine starts with FROM.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed text-pretty">
              WHERE filters tuples out before aggregation happens. Aliases declared in SELECT are not yet allocated in memory when WHERE evaluates. Learn the physical reality beneath the syntax.
            </p>
            <a
              href="#section-pipeline-puzzle"
              className="text-foreground inline-flex items-center gap-1 text-xs sm:text-sm font-medium leading-tight mt-2 group"
            >
              <span>Test yourself with the pipeline reordering challenge</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Full-width Kobbe Panel: Compact Interactive Reordering Puzzle */}
        <div
          id="section-pipeline-puzzle"
          className="bg-muted-surface relative overflow-hidden rounded-xl p-3.5 sm:p-5 border border-border/80 shadow-panel"
        >
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-border/70">
              <div>
                <h3 className="text-xs font-mono font-bold text-foreground">
                  INTERACTIVE REORDERING CHALLENGE
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Reorder the clauses below from 1st executed to last executed.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono font-medium text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleVerify}
                  className="flex items-center gap-1 rounded-md bg-dark-background text-surface px-3 py-1 text-xs font-mono font-medium hover:bg-dark-background/85 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="size-3" />
                  <span>Verify Pipeline</span>
                </button>
              </div>
            </div>

            {/* Puzzle Items List with Smooth Framer Motion Layout Reordering */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {puzzleOrder.map((clause, idx) => (
                <motion.div
                  key={clause}
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="flex items-center justify-between p-2 sm:p-2.5 rounded-lg border border-border bg-surface shadow-xs hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded bg-muted-surface border border-border text-[10px] font-mono font-bold text-muted-foreground">
                      {idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-foreground">
                      {clause}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveClause(idx, 'up')}
                      disabled={idx === 0}
                      className="size-5.5 flex items-center justify-center rounded border border-border bg-muted-surface text-[10px] text-muted-foreground hover:text-foreground hover:bg-surface disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer active:scale-90 transition-all"
                      title="Move up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveClause(idx, 'down')}
                      disabled={idx === puzzleOrder.length - 1}
                      className="size-5.5 flex items-center justify-center rounded border border-border bg-muted-surface text-[10px] text-muted-foreground hover:text-foreground hover:bg-surface disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer active:scale-90 transition-all"
                      title="Move down"
                    >
                      ▼
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Verification Feedback Banner */}
            <AnimatePresence>
              {feedback.status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-2.5 rounded-lg border text-xs leading-relaxed flex items-center gap-2 overflow-hidden ${
                    feedback.status === 'correct'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  {feedback.status === 'correct' ? (
                    <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="size-3.5 shrink-0 text-amber-600" />
                  )}
                  <span>{feedback.msg}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
