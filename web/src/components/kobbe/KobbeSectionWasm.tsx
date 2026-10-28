'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Play,
  Database,
  Copy,
  Check,
  AlertCircle,
  Layers,
  Sparkles,
  GitBranch,
  Terminal,
} from 'lucide-react';
import { useSqlWasm, QueryPlanAnalysis, TableSchema } from '@/lib/useSqlWasm';
import { KobbeSchemaExplorer } from './KobbeSchemaExplorer';
import { KobbeQueryPlanVisualizer } from './KobbeQueryPlanVisualizer';

const QUERY_PRESETS = [
  {
    label: 'INDEX SEEK (O(log N))',
    sql: `SELECT id, first_name, department, salary\nFROM Employees\nWHERE department = 'Engineering';`,
    desc: 'Uses B-Tree index idx_emp_dept for fast binary search',
  },
  {
    label: 'TABLE SCAN (O(N))',
    sql: `SELECT department, COUNT(*) as headcount, ROUND(AVG(salary), 2) as avg_comp\nFROM Employees\nWHERE salary > 80000\nGROUP BY department\nHAVING COUNT(*) >= 1\nORDER BY avg_comp DESC;`,
    desc: 'Sequential table scan with memory B-Tree sort',
  },
  {
    label: 'RELATIONAL JOIN',
    sql: `SELECT c.first_name, c.country, o.order_id, o.amount, o.status\nFROM Customers c\nJOIN Orders o ON c.customer_id = o.customer_id\nWHERE o.amount > 200\nORDER BY o.amount DESC;`,
    desc: 'Indexed foreign key join between Customers & Orders',
  },
  {
    label: 'CORRELATED SUBQUERY',
    sql: `SELECT first_name, department, salary\nFROM Employees e1\nWHERE salary > (\n  SELECT AVG(salary) FROM Employees e2 WHERE e2.department = e1.department\n);`,
    desc: 'Evaluates subquery plan stream per department',
  },
];

export function KobbeSectionWasm() {
  const { isReady, executeSql, explainQueryPlan, getSchema, getTablePreview } = useSqlWasm();

  const [query, setQuery] = useState<string>(QUERY_PRESETS[1].sql);
  const [columns, setColumns] = useState<string[]>(['department', 'headcount', 'avg_comp']);
  const [rows, setRows] = useState<any[][]>([
    ['Engineering', 3, 133333.33],
    ['Product', 1, 118000.0],
    ['Analytics', 3, 106000.0],
    ['Design', 1, 92000.0],
  ]);
  const [error, setError] = useState<string | null>(null);
  const [latencyMs, setLatencyMs] = useState<number>(0.92);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Flagship Option 1 states
  const [activeTab, setActiveTab] = useState<'output' | 'plan' | 'schema'>('output');
  const [queryPlan, setQueryPlan] = useState<QueryPlanAnalysis | null>(null);
  const [schemas, setSchemas] = useState<TableSchema[]>([]);
  const [previewData, setPreviewData] = useState<{ table: string; columns: string[]; values: any[][] } | null>(null);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectTableQuery = (sql: string) => {
    setQuery(sql);
    setActiveTab('output');
    handleRun(sql);
  };

  const handlePreviewTable = (tableName: string) => {
    const data = getTablePreview(tableName, 6);
    setPreviewData({
      table: tableName,
      columns: data.columns,
      values: data.values,
    });
  };

  // Run on initial ready & load schema
  useEffect(() => {
    if (isReady) {
      handleRun();
      const s = getSchema();
      setSchemas(s);
    }
  }, [isReady]);

  return (
    <section id="section-studio" className="py-14 sm:py-18 border-t border-border/60 scroll-mt-20">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-8">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-xs sm:text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-1.5">
          <span className="text-foreground font-medium block mb-1">
            Visual EXPLAIN &amp; Schema Explorer,
          </span>
          real client-side SQLite WASM compiler with execution plan tree &amp; database schema inspection.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-dark-background text-surface px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider">
                QUERY STUDIO
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Physical query plans, B-Tree indexes &amp; schema inspection
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed text-pretty">
              Inspect behind the scenes of relational engines. Visualize whether your query performs an $O(\log N)$ B-Tree index seek or an $O(N)$ sequential table scan. Explore tables, inspect columns, and get direct query optimizer diagnostics.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <a
                href="#section-wasm-console"
                className="text-foreground inline-flex items-center gap-1 text-xs sm:text-sm font-medium leading-tight group"
              >
                <span>Launch execution analyzer</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button
                onClick={() => setActiveTab('schema')}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-mono transition-colors cursor-pointer"
              >
                <Database className="size-3" />
                <span>Browse {schemas.length} In-Memory Tables</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full-width Kobbe Panel: Compact Interactive SQL Console & Plan Visualizer */}
        <div
          id="section-wasm-console"
          className="bg-muted-surface relative overflow-hidden rounded-xl p-3.5 sm:p-5 border border-border/80 shadow-panel"
        >
          <div className="flex flex-col gap-3.5">
            {/* Console Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-border/70">
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-foreground">
                  LOCAL WASM RUNTIME {isReady ? 'ACTIVE' : 'INITIALIZING'}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                  (SQLite 3.45.2 WASM • Client Memory)
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab(activeTab === 'schema' ? 'output' : 'schema')}
                  className={`flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-mono font-medium active:scale-95 transition-all cursor-pointer ${
                    activeTab === 'schema'
                      ? 'bg-dark-background text-surface'
                      : 'bg-surface text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Database className="size-3" />
                  <span>Schema ({schemas.length})</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono font-medium text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
                >
                  {copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => handleRun()}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 rounded-md bg-dark-background text-surface px-3 py-1 text-xs font-mono font-medium hover:bg-dark-background/85 active:scale-95 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Play className={`size-3 fill-current ${isRunning ? 'animate-spin' : ''}`} />
                  <span>Execute</span>
                </button>
              </div>
            </div>

            {/* Query Presets Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
              <span className="text-[10px] text-muted-foreground shrink-0 uppercase tracking-wider font-sans">
                Presets:
              </span>
              {QUERY_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(preset.sql);
                    handleRun(preset.sql);
                  }}
                  className="rounded-md border border-border bg-surface px-2 py-0.8 text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted-surface active:scale-95 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                  title={preset.desc}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Split Screen: Editor & Result Tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
              {/* Query Editor */}
              <div className="lg:col-span-6 flex flex-col rounded-lg border border-border bg-surface overflow-hidden shadow-2xs">
                <div className="flex items-center justify-between px-3 py-1.5 bg-muted-surface border-b border-border text-[11px] font-mono text-muted-foreground">
                  <span>INPUT: query.sql</span>
                  <span className="hidden sm:inline">Ctrl + Enter to Execute</span>
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
              </div>

              {/* Dynamic View Panels (Output / Plan / Schema) */}
              <div className="lg:col-span-6 flex flex-col rounded-lg border border-border bg-surface overflow-hidden shadow-2xs">
                {/* Result Tabs Navigation */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-muted-surface border-b border-border text-[11px] font-mono">
                  <div className="flex items-center gap-1">
                    {[
                      { id: 'output', label: `Output (${rows.length})` },
                      {
                        id: 'plan',
                        label: `Query Plan (${queryPlan?.overallRating || 'Tree'})`,
                      },
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
                  <span className="text-emerald-700 font-semibold">{latencyMs}ms</span>
                </div>

                {/* Tab Content Display */}
                <div className="min-h-56">
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
                                <th key={col} className="py-1.5 px-2.5">{col.toUpperCase()}</th>
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

                  {activeTab === 'plan' && queryPlan && (
                    <div className="p-2 max-h-80 overflow-y-auto">
                      <KobbeQueryPlanVisualizer plan={queryPlan} />
                    </div>
                  )}

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
      </div>
    </section>
  );
}
