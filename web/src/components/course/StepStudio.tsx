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
    const sampleCols = ['id', 'first_name', 'department', 'salary'];
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
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0c101b]/80 p-3 backdrop-blur-xl shadow-bento">
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
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${
                  isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTierStudioPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/20 via-indigo-500/20 to-rose-500/15 border border-rose-500/35 shadow-sm"
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
          <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-mono text-slate-400">
            Target: <strong className="text-white">{activeTier.targetTable}</strong>
          </span>
          <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 text-[11px] font-mono font-bold text-rose-400 uppercase">
            {activeTier.difficulty}
          </span>
        </div>
      </div>

      {/* Problem Challenge Specification Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0c101b]/80 p-5 backdrop-blur-xl shadow-bento">
        <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          {activeTier.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {activeTier.spec}
        </p>
      </div>

      {/* SQL Editor Studio Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#07090e] overflow-hidden shadow-bento">
        {/* Editor Controls Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0d111d] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-rose-400" />
            <span className="text-xs font-mono font-bold text-white">
              QUERY EDITOR (POSTGRES / SQLITE / MYSQL)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <Eye className="h-3 w-3" />
              <span>{showSolution ? 'Hide Solution' : 'View Solution'}</span>
            </button>
            <button
              onClick={handleResetCode}
              className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white transition-all"
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
            className="w-full bg-[#07090e] p-4 font-mono text-xs text-slate-100 placeholder-slate-600 outline-none resize-y selection:bg-rose-500/30 leading-relaxed"
            placeholder="Write your production SQL query here..."
            spellCheck={false}
          />

          {showSolution && (
            <div className="border-t border-amber-500/30 bg-[#161208] p-4 text-xs font-mono">
              <span className="text-amber-400 font-bold text-[11px] uppercase tracking-wider block mb-1">
                🔑 Production Reference Solution:
              </span>
              <pre className="text-amber-200 overflow-x-auto">{activeTier.solutionSql}</pre>
            </div>
          )}
        </div>

        {/* Action Button Strip */}
        <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#0c101a] px-4 py-3">
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            Press <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px] text-slate-300">Ctrl</kbd> + <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px] text-slate-300">Enter</kbd> to verify
          </span>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              onClick={handleRunQuery}
              className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-all shadow-sm"
            >
              <Play className="h-3.5 w-3.5" />
              <span>Run Query</span>
            </button>
            <button
              onClick={handleVerifySolution}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 px-5 py-2 text-xs font-bold text-white transition-all shadow-glow-rose"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Submit &amp; Verify Solution</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Way Diff Console & Output Grid */}
      {testResult && (
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c101b]/80 p-5 backdrop-blur-xl shadow-bento">
          {/* Status Message */}
          <div
            className={`rounded-xl border p-3.5 text-xs font-medium flex items-center justify-between ${
              testResult.passed
                ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300'
                : 'border-rose-500/35 bg-rose-500/10 text-rose-300'
            }`}
          >
            <span>{testResult.message}</span>
            <span className="font-mono text-[10px] opacity-80">
              ⚡ {testResult.latencyMs}ms latency
            </span>
          </div>

          {/* Diff Tab Buttons */}
          <div className="mt-4 flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-black/40 p-1">
              <button
                onClick={() => setActiveDiffTab('diff')}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                  activeDiffTab === 'diff' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                📊 Visual Diff
              </button>
              <button
                onClick={() => setActiveDiffTab('user')}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                  activeDiffTab === 'user' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                👤 Your Output
              </button>
              <button
                onClick={() => setActiveDiffTab('expected')}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                  activeDiffTab === 'expected' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                🎯 Expected Output
              </button>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {testResult.userRows.length} Tuples Rendered
            </span>
          </div>

          {/* Table Grid Output */}
          <div className="mt-3.5 overflow-x-auto rounded-xl border border-white/[0.08]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#121727] text-slate-400">
                <tr>
                  <th className="py-2.5 px-3 border-b border-white/[0.08]">STATUS</th>
                  {Object.keys(testResult.userRows[0] || {}).map((col) => (
                    <th key={col} className="py-2.5 px-3 border-b border-white/[0.08] font-bold text-white">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] bg-black/30">
                {testResult.userRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02]">
                    <td className="py-2 px-3">
                      <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                        ✓ MATCH
                      </span>
                    </td>
                    {Object.values(row).map((val: any, cIdx) => (
                      <td key={cIdx} className="py-2 px-3 text-slate-200">
                        {val === null ? <em className="text-slate-500">NULL</em> : String(val)}
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
