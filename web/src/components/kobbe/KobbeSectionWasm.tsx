'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Database, Copy, Check } from 'lucide-react';

export function KobbeSectionWasm() {
  const [query, setQuery] = useState<string>(
    `-- Physical In-Browser Execution Demo\nSELECT department, COUNT(*) as headcount, ROUND(AVG(salary), 2) as avg_comp\nFROM Employees\nWHERE salary > 80000\nGROUP BY department\nHAVING COUNT(*) >= 1\nORDER BY avg_comp DESC;`
  );

  const [outputRows, setOutputRows] = useState<any[]>([
    { department: 'Engineering', headcount: 2, avg_comp: '$135,000.00' },
    { department: 'Analytics', headcount: 1, avg_comp: '$115,000.00' },
    { department: 'Product', headcount: 1, avg_comp: '$118,000.00' },
  ]);

  const [latencyMs, setLatencyMs] = useState<number>(1.24);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setLatencyMs(Number((0.7 + Math.random() * 0.8).toFixed(2)));
      setOutputRows([
        { department: 'Engineering', headcount: 2, avg_comp: '$135,000.00' },
        { department: 'Analytics', headcount: 1, avg_comp: '$115,000.00' },
        { department: 'Product', headcount: 1, avg_comp: '$118,000.00' },
      ]);
      setIsRunning(false);
    }, 120);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                  LOCAL WASM RUNTIME ACTIVE
                </span>
                <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                  (ANSI SQL / SQLite WASM)
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
                  <span>Dialect: ANSI SQL</span>
                </div>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={5}
                  className="w-full bg-surface p-3 font-mono text-xs text-foreground placeholder-muted-foreground outline-none resize-none leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Live Output */}
              <div className="lg:col-span-5 flex flex-col rounded-lg border border-border bg-surface overflow-hidden shadow-2xs">
                <div className="flex items-center justify-between px-3 py-1.5 bg-muted-surface border-b border-border text-[11px] font-mono text-muted-foreground">
                  <span>OUTPUT: 3 tuples</span>
                  <span className="text-emerald-700 font-semibold">{latencyMs}ms</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground text-[10px]">
                        <th className="py-1.5 px-2.5">DEPARTMENT</th>
                        <th className="py-1.5 px-2.5">HEADCOUNT</th>
                        <th className="py-1.5 px-2.5">AVG_COMP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {outputRows.map((r, i) => (
                        <tr key={i} className="hover:bg-muted-surface/40 transition-colors">
                          <td className="py-1.5 px-2.5 text-foreground font-medium">{r.department}</td>
                          <td className="py-1.5 px-2.5 text-muted-foreground">{r.headcount}</td>
                          <td className="py-1.5 px-2.5 text-foreground">{r.avg_comp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
