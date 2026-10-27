'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Database, Copy, Check, AlertCircle } from 'lucide-react';
import { useSqlWasm } from '@/lib/useSqlWasm';

export function KobbeSectionWasm() {
  const { isReady, executeSql } = useSqlWasm();

  const [query, setQuery] = useState<string>(
    `SELECT department, COUNT(*) as headcount, ROUND(AVG(salary), 2) as avg_comp\nFROM Employees\nWHERE salary > 80000\nGROUP BY department\nHAVING COUNT(*) >= 1\nORDER BY avg_comp DESC;`
  );

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

  const handleRun = () => {
    setIsRunning(true);
    setError(null);
    try {
      const res = executeSql(query);
      setLatencyMs(res.latencyMs);
      if (res.error) {
        setError(res.error);
      } else {
        setColumns(res.columns);
        setRows(res.values);
      }
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

  // Run on initial ready
  useEffect(() => {
    if (isReady) {
      handleRun();
    }
  }, [isReady]);

  return (
    <section id="section-studio" className="py-14 sm:py-18 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-8">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-xs sm:text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-1.5">
          <span className="text-foreground font-medium block mb-1">
            Zero setup,
          </span>
          pure client-side SQLite WASM compiler with sub-millisecond execution.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Instant in-browser compilation with zero installation
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed text-pretty">
              No local database server, no Docker container, no API credentials. Queries compile and execute locally in under 2ms with zero data sent to external servers. 100% private, 100% offline-ready.
            </p>
            <a
              href="#section-wasm-console"
              className="text-foreground inline-flex items-center gap-1 text-xs sm:text-sm font-medium leading-tight mt-2 group"
            >
              <span>Explore client query runtime</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Full-width Kobbe Panel: Compact Interactive SQL Console */}
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
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono font-medium text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
                >
                  {copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 rounded-md bg-dark-background text-surface px-3 py-1 text-xs font-mono font-medium hover:bg-dark-background/85 active:scale-95 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Play className={`size-3 fill-current ${isRunning ? 'animate-spin' : ''}`} />
                  <span>Execute</span>
                </button>
              </div>
            </div>

            {/* Split Screen: Editor & Result */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
              {/* Query Editor */}
              <div className="lg:col-span-7 flex flex-col rounded-lg border border-border bg-surface overflow-hidden shadow-2xs">
                <div className="flex items-center justify-between px-3 py-1.5 bg-muted-surface border-b border-border text-[11px] font-mono text-muted-foreground">
                  <span>INPUT: query.sql</span>
                  <span>Dialect: SQLite / ANSI</span>
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
                  rows={5}
                  className="w-full bg-surface p-3 font-mono text-xs text-foreground placeholder-muted-foreground outline-none resize-none leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Live Output */}
              <div className="lg:col-span-5 flex flex-col rounded-lg border border-border bg-surface overflow-hidden shadow-2xs">
                <div className="flex items-center justify-between px-3 py-1.5 bg-muted-surface border-b border-border text-[11px] font-mono text-muted-foreground">
                  <span>OUTPUT: {rows.length} tuples</span>
                  <span className="text-emerald-700 font-semibold">{latencyMs}ms</span>
                </div>
                <div className="overflow-x-auto min-h-24">
                  {error ? (
                    <div className="p-3 text-xs font-mono text-rose-600 flex items-start gap-1.5 bg-rose-50/50">
                      <AlertCircle className="size-3.5 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  ) : (
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground text-[10px]">
                          {columns.map((col) => (
                            <th key={col} className="py-1.5 px-2.5">{col.toUpperCase()}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {rows.map((r, i) => (
                          <tr key={i} className="hover:bg-muted-surface/40 transition-colors">
                            {r.map((val: any, cIdx: number) => (
                              <td key={cIdx} className="py-1.5 px-2.5 text-foreground text-[11px]">
                                {val === null ? <em className="text-muted-foreground">NULL</em> : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
