'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Play,
  Database,
  Copy,
  Check,
  AlertCircle,
  RotateCcw,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  FileCode2,
  BookOpen
} from 'lucide-react';
import { useSqlWasm, QueryPlanAnalysis, TableSchema } from '@/lib/useSqlWasm';
import { TOPIC_PHASES } from '@/data/masteryCourseData';
import { KobbeSchemaExplorer } from './KobbeSchemaExplorer';
import { KobbeQueryPlanVisualizer } from './KobbeQueryPlanVisualizer';
import { EditorialDiagramSvg } from './EditorialDiagramSvg';

interface FlatProblem {
  id: string;
  topicSeq: string;
  topicTitle: string;
  topicShortName: string;
  tierId: number;
  tierName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  targetTable: string;
  spec: string;
  starterSql: string;
  expectedSolutionSql: string;
  expectedRowCount?: number;
}

export function KobbeSectionWasm() {
  const { isReady, executeSql, explainQueryPlan, getSchema, getTablePreview } = useSqlWasm();

  // Extract all 30 problems organized strictly by topic (01-10 in order)
  const allProblems = useMemo<FlatProblem[]>(() => {
    const list: FlatProblem[] = [];
    TOPIC_PHASES.forEach((phase) => {
      const seq = phase.seq || '01';
      const title = phase.title || ('Topic ' + seq);
      const shortName = phase.shortName || (seq + '. ' + title);
      const problems = phase.problems || (phase.problem ? [phase.problem] : []);

      problems.forEach((p, pIdx) => {
        const tierId = Number(p.tierId) || (pIdx + 1);
        const diff = (p.difficulty || 'easy').toLowerCase() as 'easy' | 'medium' | 'hard';
        list.push({
          id: `${seq}_${tierId}`,
          topicSeq: seq,
          topicTitle: title,
          topicShortName: shortName,
          tierId,
          tierName: p.tierName || `Tier ${tierId}`,
          difficulty: diff,
          title: p.title || `Problem ${seq}.${tierId}`,
          targetTable: p.targetTable || 'Employees',
          spec: p.spec || '',
          starterSql: p.starterSql || `SELECT * FROM ${p.targetTable || 'Employees'};`,
          expectedSolutionSql: p.expectedSolutionSql || p.starterSql || `SELECT * FROM ${p.targetTable || 'Employees'};`,
          expectedRowCount: p.expectedRowCount,
        });
      });
    });
    return list;
  }, []);

  // State
  const [selectedTopicSeq, setSelectedTopicSeq] = useState<string>('01');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [selectedProblemId, setSelectedProblemId] = useState<string>('01_1');
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Active problem object
  const activeProblem = useMemo<FlatProblem>(() => {
    return allProblems.find((p) => p.id === selectedProblemId) || allProblems[0];
  }, [allProblems, selectedProblemId]);

  // Unique topics list
  const topicList = useMemo(() => {
    const map = new Map<string, { seq: string; title: string; shortName: string }>();
    allProblems.forEach((p) => {
      if (!map.has(p.topicSeq)) {
        map.set(p.topicSeq, { seq: p.topicSeq, title: p.topicTitle, shortName: p.topicShortName });
      }
    });
    return Array.from(map.values());
  }, [allProblems]);

  // Filtered problems list based on selected topic and difficulty
  const filteredProblems = useMemo(() => {
    return allProblems.filter((p) => {
      const matchTopic = selectedDifficulty === 'all' ? p.topicSeq === selectedTopicSeq : true;
      const matchDiff = selectedDifficulty === 'all' ? true : p.difficulty === selectedDifficulty;
      return matchTopic && matchDiff;
    });
  }, [allProblems, selectedTopicSeq, selectedDifficulty]);

  // Editor and runtime state
  const [query, setQuery] = useState<string>(activeProblem?.starterSql || '');
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<any[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [latencyMs, setLatencyMs] = useState<number>(0.85);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Verification diff state
  const [testResult, setTestResult] = useState<{
    passed: boolean;
    diffRows: { status: 'match' | 'extra' | 'missing'; badge: string; values: any[] }[];
    matchCount: number;
    extraCount: number;
    missingCount: number;
    latencyMs: number;
  } | null>(null);

  // Tabs: diagram | output | diff | plan | schema
  const [activeTab, setActiveTab] = useState<'diagram' | 'output' | 'diff' | 'plan' | 'schema'>('diagram');
  const [queryPlan, setQueryPlan] = useState<QueryPlanAnalysis | null>(null);
  const [schemas, setSchemas] = useState<TableSchema[]>([]);
  const [previewData, setPreviewData] = useState<{ table: string; columns: string[]; values: any[][] } | null>(null);

  // Sync starter SQL when problem changes
  useEffect(() => {
    if (activeProblem) {
      setQuery(activeProblem.starterSql);
      setTestResult(null);
      setShowSolution(false);
      if (isReady) {
        handleRun(activeProblem.starterSql);
      }
    }
  }, [activeProblem?.id, isReady]);

  // Load schemas when runtime is ready
  useEffect(() => {
    if (isReady) {
      const s = getSchema();
      setSchemas(s);
      if (!rows.length && activeProblem) {
        handleRun(activeProblem.starterSql);
      }
    }
  }, [isReady]);

  const handleRun = (customSql?: string) => {
    const sqlToRun = customSql !== undefined ? customSql : query;
    setIsRunning(true);
    setError(null);
    try {
      const res = executeSql(sqlToRun);
      setLatencyMs(res.latencyMs);

      if (res.error) {
        setError(res.error);
      } else {
        setColumns(res.columns);
        setRows(res.values);
      }

      // Generate EXPLAIN QUERY PLAN
      const planRes = explainQueryPlan(sqlToRun);
      setQueryPlan(planRes);
    } catch (e: any) {
      setError(e.message || 'Execution error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleVerify = () => {
    if (!activeProblem) return;
    setIsRunning(true);
    setError(null);

    try {
      const userRes = executeSql(query);
      const expRes = executeSql(activeProblem.expectedSolutionSql);

      if (userRes.error) {
        setError(userRes.error);
        setActiveTab('output');
        return;
      }

      // Compute diff
      const uRows = userRes.values || [];
      const eRows = expRes.values || [];
      const norm = (v: any) => (v === null || v === undefined ? 'NULL' : String(v).trim());

      const expMap = new Map<string, number>();
      eRows.forEach((r) => {
        const fp = r.map(norm).join('|||');
        expMap.set(fp, (expMap.get(fp) || 0) + 1);
      });

      const diffRows: { status: 'match' | 'extra' | 'missing'; badge: string; values: any[] }[] = [];
      let matchCount = 0;
      let extraCount = 0;

      uRows.forEach((r) => {
        const fp = r.map(norm).join('|||');
        if (expMap.has(fp) && expMap.get(fp)! > 0) {
          expMap.set(fp, expMap.get(fp)! - 1);
          matchCount++;
          diffRows.push({ status: 'match', badge: '✓ MATCH', values: r });
        } else {
          extraCount++;
          diffRows.push({ status: 'extra', badge: '+ EXTRA', values: r });
        }
      });

      let missingCount = 0;
      eRows.forEach((r) => {
        const fp = r.map(norm).join('|||');
        if (expMap.has(fp) && expMap.get(fp)! > 0) {
          expMap.set(fp, expMap.get(fp)! - 1);
          missingCount++;
          diffRows.push({ status: 'missing', badge: '- MISSING', values: r });
        }
      });

      const passed = extraCount === 0 && missingCount === 0 && uRows.length === eRows.length;

      setTestResult({
        passed,
        diffRows,
        matchCount,
        extraCount,
        missingCount,
        latencyMs: userRes.latencyMs,
      });

      setColumns(userRes.columns.length ? userRes.columns : expRes.columns);
      setRows(userRes.values);
      setActiveTab('diff');
    } catch (e: any) {
      setError(e.message || 'Verification error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectProblem = (probId: string) => {
    setSelectedProblemId(probId);
    const p = allProblems.find((item) => item.id === probId);
    if (p) {
      setSelectedTopicSeq(p.topicSeq);
      setQuery(p.starterSql);
      setTestResult(null);
      setShowSolution(false);
      handleRun(p.starterSql);
    }
  };

  const handleSelectTableQuery = (sql: string) => {
    setQuery(sql);
    setActiveTab('output');
    handleRun(sql);
  };

  const handlePreviewTable = (tableName: string) => {
    const data = getTablePreview(tableName, 8);
    setPreviewData({
      table: tableName,
      columns: data.columns,
      values: data.values,
    });
  };

  const insertColumn = (colName: string) => {
    setQuery((prev) => `${prev} ${colName}`);
  };

  // Find active table schema
  const activeTableSchema = schemas.find(
    (s) => s.name.toLowerCase() === (activeProblem?.targetTable || '').toLowerCase()
  );

  return (
    <section id="section-studio" className="py-14 sm:py-18 border-t border-border/60 scroll-mt-20">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-8">
        
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-xs sm:text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-1.5">
          <span className="text-foreground font-medium block mb-1">
            Section Studio &amp; Problem Arena,
          </span>
          30 graded problems across 10 curriculum topics in order, with live SQLite WASM execution, relational output diff &amp; execution plan trees.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-dark-background text-surface px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider">
                SECTION STUDIO · 30 GRADED PROBLEMS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Master SQL with real schema tables, graded problem tiers &amp; output diffs
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed text-pretty">
              Pick any topic from 01 to 10 in sequential order. Explore target table schemas, inspect column types, execute in-browser SQLite WASM, and verify with automated visual diffs.
            </p>
          </div>
        </div>

        {/* Full-width Kobbe Panel: Problem Arena & Studio Workbench */}
        <div
          id="section-wasm-console"
          className="bg-muted-surface relative overflow-hidden rounded-xl p-3.5 sm:p-5 border border-border/80 shadow-panel flex flex-col gap-4"
        >
          {/* 1. Problem Hub & Topic Rail (Sequential Topics 01-10) */}
          <div className="flex flex-col gap-2.5 pb-3 border-b border-border/70">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-foreground">
                  CURRICULUM TOPICS (01 TO 10 IN ORDER)
                </span>
                <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                  • 30 Graded Problems Total
                </span>
              </div>

              {/* Difficulty Filter Tabs */}
              <div className="flex items-center gap-1 bg-surface p-0.5 rounded-lg border border-border text-xs font-mono">
                {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2 py-0.8 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                      selectedDifficulty === diff
                        ? 'bg-dark-background text-surface shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {diff === 'all' ? 'All (30)' : diff.toUpperCase() + ' (10)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Selector Sequential Rail */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
              {topicList.map((t) => {
                const isActive = t.seq === selectedTopicSeq;
                return (
                  <button
                    key={t.seq}
                    onClick={() => {
                      setSelectedTopicSeq(t.seq);
                      const firstInTopic = allProblems.find((p) => p.topicSeq === t.seq);
                      if (firstInTopic) handleSelectProblem(firstInTopic.id);
                    }}
                    className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-dark-background text-surface border-dark-background shadow-xs font-semibold'
                        : 'border-border bg-surface text-muted-foreground hover:text-foreground hover:bg-muted-surface'
                    }`}
                  >
                    <span className="font-bold opacity-80">{t.seq}</span>
                    <span>{t.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Problem Cards Carousel Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {filteredProblems.map((p) => {
                const isSelected = p.id === selectedProblemId;
                const diffColor =
                  p.difficulty === 'easy'
                    ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                    : p.difficulty === 'medium'
                    ? 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
                    : 'text-rose-700 bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800';

                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProblem(p.id)}
                    className={`flex flex-col text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-foreground bg-surface shadow-xs ring-1 ring-foreground/20'
                        : 'border-border bg-surface/70 hover:bg-surface hover:border-foreground/40'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[10px] font-mono text-muted-foreground font-semibold">
                        Topic {p.topicSeq} • Tier {p.tierId}
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${diffColor}`}>
                        {p.difficulty.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-foreground line-clamp-1 mb-1">
                      {p.title}
                    </span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mt-auto">
                      <span>Table: <strong className="text-foreground">{p.targetTable}</strong></span>
                      {p.expectedRowCount !== undefined && (
                        <span>{p.expectedRowCount} rows</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Active Problem Dossier & Spec Strip */}
          {activeProblem && (
            <div className="rounded-lg border border-border bg-surface p-3 sm:p-4 shadow-2xs flex flex-col gap-2.5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                    <span className="rounded bg-muted-surface px-2 py-0.5 font-bold text-foreground border border-border">
                      Topic {activeProblem.topicSeq}: {activeProblem.topicTitle}
                    </span>
                    <span className="rounded bg-foreground/5 px-2 py-0.5 text-foreground font-semibold border border-border">
                      {activeProblem.tierName}
                    </span>
                    <span className="rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 border border-emerald-300 px-2 py-0.5 font-bold">
                      Target: {activeProblem.targetTable}
                    </span>
                    {activeProblem.expectedRowCount !== undefined && (
                      <span className="text-muted-foreground">
                        Expected: {activeProblem.expectedRowCount} tuples
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground">
                    {activeProblem.title}
                  </h3>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowSolution((prev) => !prev)}
                    className="flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono font-medium text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
                  >
                    {showSolution ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                    <span>{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuery(activeProblem.starterSql);
                      setTestResult(null);
                    }}
                    className="flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono font-medium text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
                    title="Reset to starter SQL"
                  >
                    <RotateCcw className="size-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Problem Task Description */}
              <div className="text-xs text-muted-foreground leading-relaxed bg-muted-surface/70 p-2.5 rounded border border-border/60">
                <strong className="text-foreground">Task: </strong>
                {activeProblem.spec}
              </div>

              {/* Solution Preview Dropdown */}
              {showSolution && (
                <div className="p-2.5 rounded bg-foreground/5 border border-foreground/15 text-xs font-mono flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                    <span className="font-bold text-foreground uppercase tracking-wider">Canonical Expected SQL:</span>
                    <button
                      onClick={() => setQuery(activeProblem.expectedSolutionSql)}
                      className="text-foreground hover:underline font-semibold cursor-pointer"
                    >
                      Copy to Editor &rarr;
                    </button>
                  </div>
                  <pre className="text-foreground whitespace-pre-wrap font-mono text-[11px] overflow-x-auto">
                    {activeProblem.expectedSolutionSql}
                  </pre>
                </div>
              )}

              {/* Target Table Schema Strip with Quick Column Chips */}
              {activeTableSchema && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/50 text-[11px] font-mono">
                  <span className="text-muted-foreground font-sans text-[10px] uppercase font-bold tracking-wider">
                    Insert Column:
                  </span>
                  {activeTableSchema.columns.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => insertColumn(c.name)}
                      className="rounded border border-border bg-muted-surface px-1.5 py-0.5 text-foreground hover:bg-surface hover:border-foreground/50 transition-colors cursor-pointer"
                      title={`Insert ${c.name} (${c.type})`}
                    >
                      + {c.name} <span className="text-[9px] text-muted-foreground">({c.type})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. Editor & Execution Visualizer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            
            {/* Left: SQL Code Editor */}
            <div className="lg:col-span-6 flex flex-col rounded-lg border border-border bg-surface overflow-hidden shadow-2xs">
              <div className="flex items-center justify-between px-3 py-1.5 bg-muted-surface border-b border-border text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1 text-foreground font-semibold">
                  <FileCode2 className="size-3.5" />
                  <span>query.sql</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline">Ctrl + Enter to Run</span>
                  <button
                    onClick={handleCopy}
                    className="hover:text-foreground transition-colors cursor-pointer"
                    title="Copy SQL"
                  >
                    {copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                  </button>
                </div>
              </div>

              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    handleRun();
                  }
                }}
                rows={9}
                className="w-full bg-surface p-3 font-mono text-xs text-foreground placeholder-muted-foreground outline-none resize-none leading-relaxed"
                spellCheck={false}
              />

              {/* Action Toolbar */}
              <div className="flex items-center justify-between px-3 py-2 bg-muted-surface/50 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleRun()}
                    disabled={isRunning}
                    className="flex items-center gap-1 rounded-md bg-dark-background text-surface px-3 py-1 text-xs font-mono font-medium hover:bg-dark-background/85 active:scale-95 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Play className={`size-3 fill-current ${isRunning ? 'animate-spin' : ''}`} />
                    <span>Run Query</span>
                  </button>

                  <button
                    onClick={handleVerify}
                    disabled={isRunning}
                    className="flex items-center gap-1 rounded-md bg-emerald-600 text-white px-3 py-1 text-xs font-mono font-medium hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <CheckCircle2 className="size-3" />
                    <span>Verify Solution</span>
                  </button>
                </div>

                <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                  {latencyMs}ms latency
                </span>
              </div>
            </div>

            {/* Right: Dynamic Output, Diff & Plan Panels */}
            <div className="lg:col-span-6 flex flex-col rounded-lg border border-border bg-surface overflow-hidden shadow-2xs">
              
              {/* Tab Navigation */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-muted-surface border-b border-border text-[11px] font-mono">
                <div className="flex items-center gap-1">
                  {[
                    { id: 'diagram', label: 'Editorial Diagram (SVG)' },
                    { id: 'output', label: `Output (${rows.length})` },
                    {
                      id: 'diff',
                      label: testResult ? (testResult.passed ? 'Diff (Passed)' : 'Diff (Mismatch)') : 'Visual Diff',
                      badge: testResult ? (testResult.passed ? '✓' : '!') : undefined
                    },
                    { id: 'plan', label: `Execution Plan (${queryPlan?.overallRating || 'Tree'})` },
                    { id: 'schema', label: `Schema (${schemas.length})` },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`relative rounded px-2 py-0.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-dark-background text-surface font-semibold shadow-xs'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Panels */}
              <div className="min-h-56">
                
                {/* 0. Editorial Architecture Diagram (Cathryn Lavery SVG) */}
                {activeTab === 'diagram' && (
                  <div className="p-2">
                    <EditorialDiagramSvg
                      topicSeq={activeProblem?.topicSeq || '01'}
                      problemTitle={activeProblem?.title || ''}
                      tierName={activeProblem?.tierName || 'Standard'}
                      targetTable={activeProblem?.targetTable || 'CITY'}
                      expectedRowCount={activeProblem?.expectedRowCount}
                    />
                  </div>
                )}
                
                {/* 1. Raw Output Grid */}
                {activeTab === 'output' && (
                  <div className="overflow-x-auto max-h-72">
                    {error ? (
                      <div className="p-3 text-xs font-mono text-rose-600 flex items-start gap-1.5 bg-rose-50/50">
                        <AlertCircle className="size-3.5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    ) : (
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-border text-muted-foreground text-[10px] bg-muted-surface/40">
                            {columns.map((col) => (
                              <th key={col} className="py-1.5 px-2.5 font-bold">{col.toUpperCase()}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {rows.length === 0 ? (
                            <tr>
                              <td colSpan={columns.length || 1} className="p-4 text-center text-xs text-muted-foreground">
                                Query executed successfully. 0 rows returned.
                              </td>
                            </tr>
                          ) : (
                            rows.map((r, i) => (
                              <tr key={i} className="hover:bg-muted-surface/40 transition-colors">
                                {r.map((val: any, cIdx: number) => (
                                  <td key={cIdx} className="py-1.5 px-2.5 text-foreground text-[11px]">
                                    {val === null ? <em className="text-muted-foreground">NULL</em> : String(val)}
                                  </td>
                                ))}
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* 2. Visual Output Diff (✓ MATCH / + EXTRA / - MISSING) */}
                {activeTab === 'diff' && (
                  <div className="overflow-x-auto max-h-72 p-3">
                    {!testResult ? (
                      <div className="py-8 text-center text-xs text-muted-foreground">
                        Click <strong>'Verify Solution'</strong> to run differential evaluation against canonical expected output.
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2.5">
                        <div className={`p-2.5 rounded border text-xs font-mono font-semibold flex items-center justify-between ${
                          testResult.passed
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40'
                            : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40'
                        }`}>
                          <span>{testResult.passed ? '✓ Test Passed: Output matches canonical solution!' : '✕ Solution Diff Mismatch'}</span>
                          <span>Match: {testResult.matchCount} · Extra: {testResult.extraCount} · Missing: {testResult.missingCount}</span>
                        </div>

                        <table className="w-full text-left font-mono text-xs border-collapse border border-border">
                          <thead>
                            <tr className="border-b border-border text-muted-foreground text-[10px] bg-muted-surface">
                              <th className="py-1 px-2">STATUS</th>
                              {columns.map((c) => (
                                <th key={c} className="py-1 px-2 font-bold">{c.toUpperCase()}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {testResult.diffRows.map((dr, idx) => (
                              <tr
                                key={idx}
                                className={
                                  dr.status === 'match'
                                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20'
                                    : dr.status === 'extra'
                                    ? 'bg-amber-50/60 dark:bg-amber-950/30'
                                    : 'bg-rose-50/60 dark:bg-rose-950/30'
                                }
                              >
                                <td className="py-1 px-2 font-bold text-[10px]">
                                  <span
                                    className={`px-1.5 py-0.2 rounded ${
                                      dr.status === 'match'
                                        ? 'bg-emerald-600 text-white'
                                        : dr.status === 'extra'
                                        ? 'bg-amber-600 text-white'
                                        : 'bg-rose-600 text-white'
                                    }`}
                                  >
                                    {dr.badge}
                                  </span>
                                </td>
                                {dr.values.map((v, cIdx) => (
                                  <td key={cIdx} className="py-1 px-2 text-[11px] text-foreground">
                                    {v === null ? <em className="text-muted-foreground">NULL</em> : String(v)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Visual Execution Plan Tree */}
                {activeTab === 'plan' && queryPlan && (
                  <div className="p-2 max-h-80 overflow-y-auto">
                    <KobbeQueryPlanVisualizer plan={queryPlan} />
                  </div>
                )}

                {/* 4. Interactive Database Schema Explorer */}
                {activeTab === 'schema' && (
                  <div className="p-2 max-h-80 overflow-y-auto">
                    <KobbeSchemaExplorer
                      schemas={schemas}
                      onSelectQuery={handleSelectTableQuery}
                      onPreviewTable={handlePreviewTable}
                      previewData={previewData}
                      onClosePreview={() => setPreviewData(null)}
                    />
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
