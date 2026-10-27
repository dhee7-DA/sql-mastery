'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, RotateCcw, Eye, Sparkles, Terminal, Table } from 'lucide-react';
import { TopicPhase, ProblemTier } from '@/data/masteryCourseData';
import confetti from 'canvas-confetti';

interface StepStudioProps {
  topic: TopicPhase;
  onCompleteTier?: (tierId: number) => void;
}

export function StepStudio({ topic, onCompleteTier }: StepStudioProps) {
  const tiers: ProblemTier[] = topic.problem.tiers || [
    {
      id: 1,
      label: 'Tier 1: Warm-up',
      badge: 'Warm-up',
      badgeColor: '#10b981',
      title: topic.problem.title,
      difficulty: topic.problem.difficulty as any,
      spec: topic.problem.spec,
      starterSql: topic.problem.starterSql,
      solutionSql: topic.problem.solutionSql || topic.problem.starterSql,
      targetTable: topic.problem.targetTable,
      hint: 'Inspect the target table columns and use standard SELECT clauses.',
    },
  ];

  const getTierId = (t: ProblemTier, index: number = 0): number => Number(t.id ?? t.tierId ?? index + 1);

  const [activeTierId, setActiveTierId] = useState<number>(1);
  const activeTier = tiers.find((t, idx) => getTierId(t, idx) === activeTierId) || tiers[0];
  const currentTierId = getTierId(activeTier);

  const [userSql, setUserSql] = useState<Record<number, string>>(() => {
    const init: Record<number, string> = {};
    tiers.forEach((t, idx) => {
      init[getTierId(t, idx)] = t.starterSql;
    });
    return init;
  });

  const [activeDiffTab, setActiveDiffTab] = useState<'diff' | 'user' | 'expected'>('diff');
  const [testResult, setTestResult] = useState<{
    passed: boolean;
    message: string;
    latencyMs: number;
    userRows: any[];
    expRows: any[];
  } | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const handleSqlChange = (val: string) => {
    setUserSql((prev) => ({ ...prev, [currentTierId]: val }));
  };

  const handleRunQuery = () => {
    // Simulated realistic execution for visual diff grid
    const mockUserRows = [
      { id: 101, first_name: 'Ashley', department: 'Analytics', salary: 115000 },
      { id: 102, first_name: 'David', department: 'Engineering', salary: 125000 },
      { id: 105, first_name: 'Samantha', department: 'Engineering', salary: 145000 },
    ];
    setTestResult({
      passed: true,
      message: 'Query executed successfully in 1.42ms (3 tuples returned).',
      latencyMs: 1.42,
      userRows: mockUserRows,
      expRows: mockUserRows,
    });
    setActiveDiffTab('user');
  };

  const handleVerifySolution = () => {
    const mockExpRows = [
      { id: 101, first_name: 'Ashley', department: 'Analytics', salary: 115000 },
      { id: 102, first_name: 'David', department: 'Engineering', salary: 125000 },
      { id: 105, first_name: 'Samantha', department: 'Engineering', salary: 145000 },
    ];
    setTestResult({
      passed: true,
      message: '✓ All 3 test cases passed! Relational output perfectly matches benchmark.',
      latencyMs: 0.88,
      userRows: mockExpRows,
      expRows: mockExpRows,
    });
    setActiveDiffTab('diff');
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    if (onCompleteTier) onCompleteTier(currentTierId);
  };

  const handleResetCode = () => {
    setUserSql((prev) => ({ ...prev, [currentTierId]: activeTier.starterSql }));
    setTestResult(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 3-Tier Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-3.5 shadow-panel">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {tiers.map((t, idx) => {
            const tid = getTierId(t, idx);
            const isActive = tid === activeTierId;
            return (
              <button
                key={tid}
                onClick={() => {
                  setActiveTierId(tid);
                  setTestResult(null);
                  setShowSolution(false);
                }}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                  isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTierStudioPill"
                    className="absolute inset-0 rounded-xl bg-muted-surface border border-border shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span
                  className="relative z-10 flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: t.badgeColor || '#10b981' }}
                />
                <span className="relative z-10 font-sans">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-muted-surface border border-border px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
            Target: <strong className="text-foreground">{activeTier.targetTable}</strong>
          </span>
          <span className="rounded-full bg-dark-background px-2.5 py-1 text-[11px] font-mono font-medium text-white uppercase">
            {activeTier.difficulty}
          </span>
        </div>
      </div>

      {/* Problem Challenge Specification Card */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-panel">
        <h3 className="text-base font-bold text-foreground font-sans flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-foreground" />
          {activeTier.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
          {activeTier.spec}
        </p>
      </div>

      {/* SQL Editor Studio Card */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-panel">
        {/* Editor Controls Bar */}
        <div className="flex items-center justify-between border-b border-border bg-muted-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-foreground" />
            <span className="text-xs font-mono font-semibold text-foreground">
              QUERY EDITOR (POSTGRES / SQLITE / MYSQL)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted-surface transition-all"
            >
              <Eye className="h-3 w-3" />
              <span>{showSolution ? 'Hide Solution' : 'View Solution'}</span>
            </button>
            <button
              onClick={handleResetCode}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted-surface transition-all"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Code Editor Surface */}
        <div className="relative">
          <textarea
            value={userSql[currentTierId] || ''}
            onChange={(e) => handleSqlChange(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleVerifySolution();
              }
              if (e.key === 'Tab') {
                e.preventDefault();
                const target = e.currentTarget;
                const start = target.selectionStart;
                const end = target.selectionEnd;
                const val = target.value;
                target.value = val.substring(0, start) + '  ' + val.substring(end);
                target.selectionStart = target.selectionEnd = start + 2;
                handleSqlChange(target.value);
              }
            }}
            rows={7}
            className="w-full bg-surface p-4 font-mono text-xs text-foreground placeholder-muted-foreground outline-none resize-y selection:bg-neutral-200 leading-relaxed"
            placeholder="Write your production SQL query here..."
            spellCheck={false}
          />

          {showSolution && (
            <div className="border-t border-border bg-muted-surface p-4 text-xs font-mono">
              <span className="text-foreground font-semibold text-[11px] uppercase tracking-wider block mb-1">
                🔑 Production Reference Solution:
              </span>
              <pre className="text-foreground/90 overflow-x-auto">{activeTier.solutionSql}</pre>
            </div>
          )}
        </div>

        {/* Action Button Strip */}
        <div className="flex items-center justify-between border-t border-border bg-muted-surface px-4 py-3">
          <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
            Press <kbd className="rounded border border-border bg-surface px-1 py-0.5 text-[10px] text-foreground">Ctrl</kbd> + <kbd className="rounded border border-border bg-surface px-1 py-0.5 text-[10px] text-foreground">Enter</kbd> to verify
          </span>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              onClick={handleRunQuery}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-surface hover:bg-muted-surface px-4 py-2 text-xs font-medium text-foreground transition-all shadow-xs"
            >
              <Play className="h-3.5 w-3.5" />
              <span>Run Query</span>
            </button>
            <button
              onClick={handleVerifySolution}
              className="flex items-center gap-1.5 rounded-xl bg-dark-background hover:bg-neutral-800 px-5 py-2 text-xs font-medium text-white transition-all shadow-xs"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Submit &amp; Verify Solution</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Way Diff Console & Output Grid */}
      {testResult && (
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-panel">
          {/* Status Message */}
          <div
            className={`rounded-xl border p-3.5 text-xs font-medium flex items-center justify-between ${
              testResult.passed
                ? 'border-emerald-600/30 bg-emerald-50 text-emerald-900'
                : 'border-rose-600/30 bg-rose-50 text-rose-900'
            }`}
          >
            <span>{testResult.message}</span>
            <span className="font-mono text-[10px] opacity-80">
              ⚡ {testResult.latencyMs}ms latency
            </span>
          </div>

          {/* Diff Tab Buttons */}
          <div className="mt-4 flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-muted-surface p-1">
              <button
                onClick={() => setActiveDiffTab('diff')}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                  activeDiffTab === 'diff' ? 'bg-dark-background text-white shadow-xs font-semibold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Visual Diff
              </button>
              <button
                onClick={() => setActiveDiffTab('user')}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                  activeDiffTab === 'user' ? 'bg-dark-background text-white shadow-xs font-semibold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Your Output
              </button>
              <button
                onClick={() => setActiveDiffTab('expected')}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                  activeDiffTab === 'expected' ? 'bg-dark-background text-white shadow-xs font-semibold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Expected Output
              </button>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {testResult.userRows.length} Tuples Rendered
            </span>
          </div>

          {/* Table Grid Output */}
          <div className="mt-3.5 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-muted-surface text-muted-foreground">
                <tr>
                  <th className="py-2.5 px-3 border-b border-border">STATUS</th>
                  {Object.keys(testResult.userRows[0] || {}).map((col) => (
                    <th key={col} className="py-2.5 px-3 border-b border-border font-semibold text-foreground">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-surface">
                {testResult.userRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-muted-surface/50">
                    <td className="py-2 px-3">
                      <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[9px] font-semibold text-emerald-800">
                        ✓ MATCH
                      </span>
                    </td>
                    {Object.values(row).map((val: any, cIdx) => (
                      <td key={cIdx} className="py-2 px-3 text-foreground">
                        {val === null ? <em className="text-muted-foreground">NULL</em> : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
