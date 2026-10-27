'use client';

import React, { useState } from 'react';
import { Brain, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { McqOption } from '@/data/masteryCourseData';
import confetti from 'canvas-confetti';

interface StepQuizProps {
  mcqs: McqOption[];
  onCompleteTopic?: () => void;
}

export function StepQuiz({ mcqs, onCompleteTopic }: StepQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const handleSelectOption = (qIdx: number, optIdx: number, correctIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    if (optIdx === correctIdx) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = mcqs.filter((q, idx) => selectedAnswers[idx] === q.correct).length;
  const isAllAnswered = answeredCount === mcqs.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Quiz Header Bar */}
      <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#0c101b]/80 p-5 backdrop-blur-xl shadow-bento">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-sans">
              Quick Concept Check &amp; Edge Case Quiz
            </h3>
            <p className="text-xs text-slate-400">
              Test your intuition on high-frequency interview traps before writing queries.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-300">
            Score: <span className="text-emerald-400">{correctCount}</span> / {mcqs.length} Correct
          </span>
          <button
            onClick={() => setSelectedAnswers({})}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      {/* MCQs List */}
      <div className="flex flex-col gap-4">
        {mcqs.map((q, qIdx) => {
          const userAns = selectedAnswers[qIdx];
          const isAnswered = userAns !== undefined;
          const isCorrect = userAns === q.correct;

          return (
            <div
              key={qIdx}
              className={`rounded-2xl border p-5 backdrop-blur-xl transition-all shadow-bento ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-500/30 bg-[#0c131d]/85'
                    : 'border-rose-500/30 bg-[#160d13]/85'
                  : 'border-white/[0.08] bg-[#0c101b]/80'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-xs font-bold text-slate-300">
                  {qIdx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white font-sans leading-relaxed">
                    {q.question}
                  </h4>

                  {/* Options */}
                  <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = userAns === optIdx;
                      const isOptionCorrect = optIdx === q.correct;

                      let btnStyle = 'border-white/[0.08] bg-black/40 text-slate-300 hover:border-white/20 hover:text-white';
                      if (isAnswered) {
                        if (isOptionCorrect) {
                          btnStyle = 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200 font-bold';
                        } else if (isOptionSelected) {
                          btnStyle = 'border-rose-500/60 bg-rose-500/15 text-rose-200 line-through';
                        } else {
                          btnStyle = 'opacity-40 border-white/[0.04] bg-black/20 text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, optIdx, q.correct)}
                          className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-medium transition-all ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 font-mono text-[10px] font-bold">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="font-mono">{opt}</span>
                          </div>
                          {isAnswered && isOptionCorrect && (
                            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                          )}
                          {isAnswered && isOptionSelected && !isOptionCorrect && (
                            <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Callout */}
                  {isAnswered && (
                    <div className="mt-3.5 rounded-xl border border-white/[0.06] bg-black/50 p-3 text-xs leading-relaxed text-slate-300">
                      <strong className="text-indigo-400 font-mono text-[11px] uppercase tracking-wider">
                        💡 Explainer:
                      </strong>{' '}
                      {q.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
