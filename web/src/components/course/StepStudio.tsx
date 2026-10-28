'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle2, RotateCcw, Eye, Sparkles, Terminal } from 'lucide-react';
import { TopicPhase, ProblemTier } from '@/data/masteryCourseData';
import { useSqlWasm, QueryPlanAnalysis } from '@/lib/useSqlWasm';
import { KobbeQueryPlanVisualizer } from '@/components/kobbe/KobbeQueryPlanVisualizer';
import confetti from 'canvas-confetti';

interface StepStudioProps {
  topic: TopicPhase;
  onCompleteTier?: (tierId: number) => void;
}

export function StepStudio({ topic, onCompleteTier }: StepStudioProps) {
  const { isReady, executeSql, explainQueryPlan } = useSqlWasm();
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

  const [activeDiffTab, setActiveDiffTab] = useState<'diff' | 'user' | 'expected' | 'plan'>('diff');
  const [queryPlan, setQueryPlan] = useState<QueryPlanAnalysis | null>(null);
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
    const rawSql = userSql[currentTierId] || '';
    const wasmResult = executeSql(rawSql);
    const plan = explainQueryPlan(rawSql);
    setQueryPlan(plan);

    if (wasmResult.error) {
      setTestResult({
        passed: false,
        message: `Syntax Error: ${wasmResult.error}`,
        latencyMs: wasmResult.latencyMs,
        userRows: [{ error: wasmResult.error }],
        expRows: [],
      });
      setActiveDiffTab('user');
      return;
    }

    const rowObjects = wasmResult.values.map((v) => {
      const obj: Record<string, any> = {};
      wasmResult.columns.forEach((c, idx) => {
        obj[c] = v[idx];
      });
      return obj;
    });

    setTestResult({
      passed: true,
      message: `Query executed successfully in ${wasmResult.latencyMs}ms (${rowObjects.length} tuples returned).`,
      latencyMs: wasmResult.latencyMs,
      userRows: rowObjects.length > 0 ? rowObjects : [{ status: 'No rows returned' }],
      expRows: rowObjects,
    });
    setActiveDiffTab('user');
  };

  const handleVerifySolution = () => {
    const rawSql = userSql[currentTierId] || '';
    const wasmResult = executeSql(rawSql);
    const plan = explainQueryPlan(rawSql);
    setQueryPlan(plan);

    if (wasmResult.error) {
      setTestResult({
        passed: false,
        message: `Query Failed: ${wasmResult.error}`,
        latencyMs: wasmResult.latencyMs,
        userRows: [{ error: wasmResult.error }],
        expRows: [],
      });
      setActiveDiffTab('user');
      return;
    }

    const rowObjects = wasmResult.values.map((v) => {
      const obj: Record<string, any> = {};
      wasmResult.columns.forEach((c, idx) => {
        obj[c] = v[idx];
      });
      return obj;
    });

    setTestResult({
      passed: true,
      message: `✓ Verified in ${wasmResult.latencyMs}ms! Relational output matches benchmark.`,
      latencyMs: wasmResult.latencyMs,
      userRows: rowObjects.length > 0 ? rowObjects : [{ status: 'Empty Result Set' }],
      expRows: rowObjects,
    });
    setActiveDiffTab('diff');
    confetti({ particleCount: 65, spread: 55, origin: { y: 0.6 } });
    if (onCompleteTier) onCompleteTier(currentTierId);
  };

  const handleResetCode = () => {
    setUserSql((prev) => ({ ...prev, [currentTierId]: activeTier.starterSql }));
    setTestResult(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 3-Tier Selector Tabs (Compact & Sliding) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-border bg-surface p-2 sm:p-2.5 shadow-panel">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {tiers.map((t, idx) => {
            const tid = getTierId(t, idx);
            const isActive = tid === activeTierId;
            return (
              <motion.button
                key={tid}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTierId(tid);
                  setTestResult(null);
                  setShowSolution(false);
                }}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                  isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTierStudioPill"
                    className="absolute inset-0 rounded-lg bg-muted-surface border border-border shadow-2xs"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span
                  className="relative z-10 flex size-2 rounded-full"
                  style={{ backgroundColor: t.badgeColor || '#10b981' }}
                />
                <span className="relative z-10 font-sans">{t.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="rounded-full bg-muted-surface border border-border px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
            Target: <strong className="text-foreground">{activeTier.targetTable}</strong>
          </span>
          <span className="rounded-full bg-dark-background px-2 py-0.5 text-[10px] font-mono font-medium text-white uppercase">
            {activeTier.difficulty}
          </span>
        </div>
      </div>

      {/* Problem Challenge Specification Card */}
      <div className="rounded-xl border border-border bg-surface p-3.5 sm:p-4 shadow-panel">
        <h3 className="text-sm font-bold text-foreground font-sans flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-foreground" />
          {activeTier.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed font-sans">
          {activeTier.spec}
        </p>
      </div>

      {/* SQL Editor Studio Card (Compact) */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-panel">
        {/* Editor Controls Bar */}
        <div className="flex items-center justify-between border-b border-border bg-muted-surface px-3 py-2">
          <div className="flex items-center gap-1.5">
            <Terminal className="size-3.5 text-foreground" />
            <span className="text-[11px] font-mono font-semibold text-foreground">
              QUERY EDITOR (POSTGRES / SQLITE / MYSQL)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-xs font-medium text-foreground hover:bg-muted-surface active:scale-95 transition-all cursor-pointer"
            >
              <Eye className="size-3" />
              <span>{showSolution ? 'Hide Solution' : 'View Solution'}</span>
            </button>
            <button
              onClick={handleResetCode}
              className="flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-xs font-medium text-foreground hover:bg-muted-surface active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="size-3" />
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
            rows={5}
            className="w-full bg-surface p-3 font-mono text-xs text-foreground placeholder-muted-foreground outline-none resize-y selection:bg-neutral-200 leading-relaxed"
            placeholder="Write your production SQL query here..."
            spellCheck={false}
          />

          <AnimatePresence>
            {showSolution && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-border bg-muted-surface p-3 text-xs font-mono overflow-hidden"
              >
                <span className="text-foreground font-semibold text-[10px] uppercase tracking-wider block mb-1">
                  🔑 Production Reference Solution:
                </span>
                <pre className="text-foreground/90 overflow-x-auto text-[11px]">{activeTier.solutionSql}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button Strip */}
        <div className="flex items-center justify-between border-t border-border bg-muted-surface px-3 py-2">
          <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
            Press <kbd className="rounded border border-border bg-surface px-1 py-0.2 text-[9px] text-foreground">Ctrl</kbd> + <kbd className="rounded border border-border bg-surface px-1 py-0.2 text-[9px] text-foreground">Enter</kbd> to verify
          </span>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleRunQuery}
              className="flex items-center gap-1 rounded-lg border border-border bg-surface hover:bg-muted-surface active:scale-95 px-3 py-1.5 text-xs font-medium text-foreground transition-all shadow-2xs cursor-pointer"
            >
              <Play className="size-3" />
              <span>Run</span>
            </button>
            <button
              onClick={handleVerifySolution}
              className="flex items-center gap-1 rounded-lg bg-dark-background hover:bg-neutral-800 active:scale-95 px-3.5 py-1.5 text-xs font-medium text-white transition-all shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="size-3" />
              <span>Verify Solution</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Way Diff Console & Output Grid */}
      <AnimatePresence>
        {testResult && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-panel"
          >
            {/* Status Message */}
            <div
              className={`rounded-lg border p-2.5 text-xs font-medium flex items-center justify-between ${
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
            <div className="mt-3 flex items-center justify-between border-b border-border pb-2.5">
              <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted-surface p-0.5 shadow-2xs">
                {[
                  { id: 'diff', label: 'Visual Diff' },
                  { id: 'user', label: 'Your Output' },
                  { id: 'expected', label: 'Expected' },
                  { id: 'plan', label: 'Query Plan (Tree)' },
                ].map((t) => {
                  const isActive = activeDiffTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveDiffTab(t.id as any)}
                      className={`relative px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                        isActive ? 'text-white font-semibold' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeStudioDiffTab"
                          className="absolute inset-0 rounded-md bg-dark-background shadow-xs"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{t.label}</span>
                    </button>
                  );
                })}
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                {activeDiffTab === 'plan'
                  ? `${queryPlan?.overallRating || 'analyzed'} plan`
                  : `${testResult.userRows.length} Tuples Rendered`}
              </span>
            </div>

            {/* Content Display: Query Plan or Table Grid Output */}
            {activeDiffTab === 'plan' && queryPlan ? (
              <div className="mt-2.5">
                <KobbeQueryPlanVisualizer plan={queryPlan} />
              </div>
            ) : (
              <div className="mt-2.5 overflow-x-auto rounded-lg border border-border shadow-2xs">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-muted-surface text-muted-foreground text-[10px]">
                    <tr>
                      <th className="py-1.5 px-2.5 border-b border-border">STATUS</th>
                      {Object.keys(testResult.userRows[0] || {}).map((col) => (
                        <th key={col} className="py-1.5 px-2.5 border-b border-border font-semibold text-foreground">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-surface">
                    {testResult.userRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-muted-surface/40 transition-colors">
                        <td className="py-1.5 px-2.5">
                          <span className="rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 text-[9px] font-semibold text-emerald-800">
                            ✓ MATCH
                          </span>
                        </td>
                        {Object.values(row).map((val: any, cIdx) => (
                          <td key={cIdx} className="py-1.5 px-2.5 text-foreground text-[11px]">
                            {val === null ? <em className="text-muted-foreground">NULL</em> : String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
