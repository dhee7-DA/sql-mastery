'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { McqOption } from '@/data/masteryCourseData';
import { SqlKeywordText } from '@/components/common/SqlKeywordText';
import confetti from 'canvas-confetti';

interface StepQuizProps {
  mcqs: McqOption[];
  onCompleteTopic?: () => void;
  onComplete?: () => void;
  topicName?: string;
}

export function StepQuiz({ mcqs, onCompleteTopic, onComplete, topicName }: StepQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const handleSelectOption = (qIdx: number, optIdx: number, correctIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    if (optIdx === correctIdx) {
      confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = mcqs.filter((q, idx) => selectedAnswers[idx] === q.correct).length;
  const isAllAnswered = answeredCount === mcqs.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Quiz Header Bar (Compact) */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-3.5 sm:p-4 shadow-panel">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-muted-surface text-foreground shadow-2xs">
            <Brain className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground font-sans">
              Quick Concept Check &amp; Edge Case Quiz
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Test your intuition on high-frequency interview traps before writing queries.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono font-medium text-foreground">
            Score: <strong className="font-bold">{correctCount}</strong> / {mcqs.length} Correct
          </span>
          <button
            onClick={() => setSelectedAnswers({})}
            className="flex items-center gap-1 rounded-md border border-border bg-muted-surface px-2 py-1 text-xs font-medium text-foreground hover:bg-surface active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="size-3" /> Reset
          </button>
        </div>
      </div>

      {/* MCQs List (Compact & Tactile) */}
      <div className="flex flex-col gap-3">
        {mcqs.map((q, qIdx) => {
          const userAns = selectedAnswers[qIdx];
          const isAnswered = userAns !== undefined;
          const isCorrect = userAns === q.correct;

          return (
            <motion.div
              key={qIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: qIdx * 0.04 }}
              className={`rounded-xl border p-3.5 sm:p-4 transition-all shadow-panel ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-600/30 bg-emerald-50/30'
                    : 'border-rose-600/30 bg-rose-50/30'
                  : 'border-border bg-surface'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted-surface border border-border font-mono text-[10px] font-bold text-foreground">
                  {qIdx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground font-sans leading-relaxed">
                    {q.question}
                  </h4>

                  {/* Options */}
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = userAns === optIdx;
                      const isOptionCorrect = optIdx === q.correct;

                      let btnStyle = 'border-border bg-muted-surface text-foreground hover:bg-surface hover:border-foreground/20';
                      if (isAnswered) {
                        if (isOptionCorrect) {
                          btnStyle = 'border-emerald-600 bg-emerald-100/70 text-emerald-950 font-semibold';
                        } else if (isOptionSelected) {
                          btnStyle = 'border-rose-600 bg-rose-100/70 text-rose-950 line-through';
                        } else {
                          btnStyle = 'opacity-40 border-border bg-muted-surface/50 text-muted-foreground';
                        }
                      }

                      return (
                        <motion.button
                          key={optIdx}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleSelectOption(qIdx, optIdx, q.correct)}
                          className={`flex items-center justify-between rounded-lg border p-2 text-left text-xs font-medium transition-colors cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex size-4.5 items-center justify-center rounded border border-border bg-surface font-mono text-[9px] font-bold text-foreground">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="font-mono text-[11px]">{opt}</span>
                          </div>
                          {isAnswered && isOptionCorrect && (
                            <CheckCircle className="size-3.5 text-emerald-700 shrink-0" />
                          )}
                          {isAnswered && isOptionSelected && !isOptionCorrect && (
                            <XCircle className="size-3.5 text-rose-700 shrink-0" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explanation Callout with Smooth Entrance */}
                  <AnimatePresence>
                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2.5 rounded-lg border border-border bg-surface p-2.5 text-xs leading-relaxed text-foreground overflow-hidden"
                      >
                        <strong className="font-mono text-[10px] uppercase tracking-wider text-foreground">
                          [EXPLAINER]
                        </strong>{' '}
                        <span className="text-muted-foreground text-xs">
                          <SqlKeywordText text={q.explanation} />
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
