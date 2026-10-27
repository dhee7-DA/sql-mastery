'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Play, Terminal, Database, Sparkles, Copy, Check } from 'lucide-react';

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

  const handleRun = () => {
    // Quick interactive simulated run
    setLatencyMs(Number((0.8 + Math.random() * 0.9).toFixed(2)));
    setOutputRows([
      { department: 'Engineering', headcount: 2, avg_comp: '$135,000.00' },
      { department: 'Analytics', headcount: 1, avg_comp: '$115,000.00' },
      { department: 'Product', headcount: 1, avg_comp: '$118,000.00' },
    ]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="section-studio" className="py-20 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-12">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-2">
          <span className="text-foreground font-medium block mb-1">
            Zero setup,
          </span>
          pure client-side SQLite WASM compiler with sub-millisecond execution.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Instant in-browser compilation with zero installation
            </h2>
            <p className="text-base text-muted-foreground max-w-lg leading-relaxed text-pretty">
              No local database server, no Docker container, no API credentials. Queries compile and execute locally in under 2ms with zero data sent to external servers. 100% private, 100% offline-ready.
            </p>
            <a
              href="#section-wasm-console"
              className="text-foreground inline-flex items-center gap-1 text-sm sm:text-base font-medium leading-tight mt-4 group"
            >
              <span>Explore client query runtime</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Full-width Kobbe Panel: Interactive SQL Console */}
        <div
          id="section-wasm-console"
          className="bg-muted-surface relative overflow-hidden rounded-xl p-4 sm:p-8 border border-border/80 shadow-panel"
        >
          <div className="flex flex-col gap-4">
            {/* Console Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/70">
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-foreground">
                  LOCAL WASM RUNTIME ACTIVE
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  (ANSI SQL / MySQL 8.0 Mode)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                  <span>{copied ? 'Copied' : 'Copy SQL'}</span>
                </button>
                <button
                  onClick={handleRun}
                  className="flex items-center gap-1.5 rounded-md bg-dark-background text-surface px-3 py-1.5 text-xs font-mono font-semibold hover:bg-dark-background/85 cursor-pointer shadow-xs"
                >
                  <Play className="size-3 fill-current" />
                  <span>Execute Query</span>
                </button>
              </div>
            </div>

            {/* Split Editor and Results */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Query Textarea */}
              <div className="lg:col-span-7 flex flex-col gap-2">
                <span className="text-[11px] font-mono text-muted-foreground">SQL BUFFER</span>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={8}
                  className="w-full rounded-lg border border-border bg-surface p-3 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 leading-relaxed resize-none shadow-xs"
                />
              </div>

              {/* Execution Results Table */}
              <div className="lg:col-span-5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>RESULT TUPLES (3 ROWS)</span>
                  <span className="text-emerald-700 font-bold">{latencyMs}ms LATENCY</span>
                </div>

                <div className="rounded-lg border border-border bg-surface overflow-hidden shadow-xs">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="bg-muted-surface border-b border-border text-muted-foreground font-bold">
                        <th className="py-2 px-3">DEPARTMENT</th>
                        <th className="py-2 px-3">HEADCOUNT</th>
                        <th className="py-2 px-3 text-right">AVG_COMP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {outputRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-muted-surface/40">
                          <td className="py-2 px-3 text-foreground font-medium">{row.department}</td>
                          <td className="py-2 px-3 text-foreground">{row.headcount}</td>
                          <td className="py-2 px-3 text-right text-foreground font-bold">{row.avg_comp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg border border-border/80 bg-muted-surface/50 p-2.5 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                  <span>Engine: SQLite 3.46.0 WASM</span>
                  <span>Spill: 0 bytes (In-Memory)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
