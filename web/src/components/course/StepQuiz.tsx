'use client';

import React, { useState } from 'react';
import { Brain, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { McqOption } from '@/data/masteryCourseData';
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
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = mcqs.filter((q, idx) => selectedAnswers[idx] === q.correct).length;
  const isAllAnswered = answeredCount === mcqs.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Quiz Header Bar */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-surface p-5 shadow-panel">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted-surface text-foreground shadow-xs">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground font-sans">
              Quick Concept Check &amp; Edge Case Quiz
            </h3>
            <p className="text-xs text-muted-foreground">
              Test your intuition on high-frequency interview traps before writing queries.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-medium text-foreground">
            Score: <strong className="font-bold">{correctCount}</strong> / {mcqs.length} Correct
          </span>
          <button
            onClick={() => setSelectedAnswers({})}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-muted-surface px-2.5 py-1 text-xs font-medium text-foreground hover:bg-surface transition-all"
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
              className={`rounded-2xl border p-5 transition-all shadow-panel ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-600/40 bg-emerald-50/40'
                    : 'border-rose-600/40 bg-rose-50/40'
                  : 'border-border bg-surface'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted-surface border border-border font-mono text-xs font-bold text-foreground">
                  {qIdx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground font-sans leading-relaxed">
                    {q.question}
                  </h4>

                  {/* Options */}
                  <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = userAns === optIdx;
                      const isOptionCorrect = optIdx === q.correct;

                      let btnStyle = 'border-border bg-muted-surface text-foreground hover:bg-surface';
                      if (isAnswered) {
                        if (isOptionCorrect) {
                          btnStyle = 'border-emerald-600 bg-emerald-100/70 text-emerald-950 font-semibold';
                        } else if (isOptionSelected) {
                          btnStyle = 'border-rose-600 bg-rose-100/70 text-rose-950 line-through';
                        } else {
                          btnStyle = 'opacity-50 border-border bg-muted-surface/50 text-muted-foreground';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, optIdx, q.correct)}
                          className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-medium transition-all ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-5 w-5 items-center justify-center rounded-md border border-border bg-surface font-mono text-[10px] font-bold text-foreground">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="font-mono">{opt}</span>
                          </div>
                          {isAnswered && isOptionCorrect && (
                            <CheckCircle className="h-4 w-4 text-emerald-700 shrink-0" />
                          )}
                          {isAnswered && isOptionSelected && !isOptionCorrect && (
                            <XCircle className="h-4 w-4 text-rose-700 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Callout */}
                  {isAnswered && (
                    <div className="mt-3.5 rounded-xl border border-border bg-surface p-3.5 text-xs leading-relaxed text-foreground">
                      <strong className="font-mono text-[11px] uppercase tracking-wider text-foreground">
                        💡 Explainer:
                      </strong>{' '}
                      <span className="text-muted-foreground">{q.explanation}</span>
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
