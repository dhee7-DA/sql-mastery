'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, AlertTriangle, Layers, Database } from 'lucide-react';

export function KobbeSectionDiff() {
  const [activeTab, setActiveDiffTab] = useState<'diff' | 'user' | 'expected'>('diff');

  const benchmarkRows = [
    { id: 101, name: 'Ashley V.', department: 'Analytics', salary: '$115,000', status: 'MATCH' },
    { id: 102, name: 'David K.', department: 'Engineering', salary: '$125,000', status: 'MATCH' },
    { id: 105, name: 'Samantha P.', department: 'Engineering', salary: '$145,000', status: 'MATCH' },
    { id: 108, name: 'Marcus L.', department: 'Product', salary: '$118,000', status: 'MISSING' },
  ];

  const candidateRows = [
    { id: 101, name: 'Ashley V.', department: 'Analytics', salary: '$115,000' },
    { id: 102, name: 'David K.', department: 'Engineering', salary: '$125,000' },
    { id: 105, name: 'Samantha P.', department: 'Engineering', salary: '$145,000' },
    { id: 110, name: 'Intern (Dev)', department: 'QA', salary: '$45,000' }, // Extra row
  ];

  return (
    <section id="section-diff" className="py-20 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-12">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-2">
          <span className="text-foreground font-medium block mb-1">
            Tuple telemetry,
          </span>
          exact relational diff from disk scan to projected result set.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              See what every query filters, matches, and misses
            </h2>
            <p className="text-base text-muted-foreground max-w-lg leading-relaxed text-pretty">
              Color-coded tuple-level diffing between candidate output and benchmark ground truth. Instantly isolate extra duplicate records, missing rows, and column type mismatches with zero guesswork.
            </p>
            <a
              href="#section-diff-panel"
              className="text-foreground inline-flex items-center gap-1 text-sm sm:text-base font-medium leading-tight mt-4 group"
            >
              <span>Explore relational diff inspector</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Full-width Kobbe Panel: 3-Way Relational Diff Grid */}
        <div
          id="section-diff-panel"
          className="bg-muted-surface relative overflow-hidden rounded-xl p-4 sm:p-8 border border-border/80 shadow-panel"
        >
          <div className="flex flex-col gap-4">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/70">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-foreground">
                  3-WAY RELATIONAL DIFF INSPECTOR
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  Query: SELECT * FROM Employees WHERE salary &gt; 100000
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-surface p-1 rounded-lg border border-border">
                {[
                  { id: 'diff', label: '📊 Visual Diff' },
                  { id: 'user', label: '👤 Candidate Output' },
                  { id: 'expected', label: '🎯 Benchmark Output' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDiffTab(tab.id as any)}
                    className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-muted-surface text-foreground font-bold shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabular Relational View */}
            <div className="bg-surface rounded-lg border border-border overflow-hidden">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-muted-surface border-b border-border text-muted-foreground font-bold">
                    <th className="py-2.5 px-4">EMP_ID</th>
                    <th className="py-2.5 px-4">FULL_NAME</th>
                    <th className="py-2.5 px-4">DEPARTMENT</th>
                    <th className="py-2.5 px-4">COMPENSATION</th>
                    <th className="py-2.5 px-4 text-right">RELATIONAL STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {activeTab === 'diff' && (
                    <>
                      {benchmarkRows.map((row) => (
                        <tr
                          key={row.id}
                          className={
                            row.status === 'MATCH'
                              ? 'hover:bg-muted-surface/40'
                              : 'bg-amber-50/60 hover:bg-amber-50'
                          }
                        >
                          <td className="py-2 px-4 text-foreground font-semibold">{row.id}</td>
                          <td className="py-2 px-4 text-foreground">{row.name}</td>
                          <td className="py-2 px-4 text-muted-foreground">{row.department}</td>
                          <td className="py-2 px-4 text-foreground">{row.salary}</td>
                          <td className="py-2 px-4 text-right">
                            {row.status === 'MATCH' ? (
                              <span className="inline-flex items-center gap-1 rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                                <Check className="size-3" /> MATCH
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-bold">
                                <AlertTriangle className="size-3" /> MISSING IN CANDIDATE
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-rose-50/60 hover:bg-rose-50">
                        <td className="py-2 px-4 text-foreground font-semibold">110</td>
                        <td className="py-2 px-4 text-foreground">Intern (Dev)</td>
                        <td className="py-2 px-4 text-muted-foreground">QA</td>
                        <td className="py-2 px-4 text-foreground">$45,000</td>
                        <td className="py-2 px-4 text-right">
                          <span className="inline-flex items-center gap-1 rounded bg-rose-100 text-rose-800 px-2 py-0.5 text-[10px] font-bold">
                            + EXTRA TUPLE (FAILED WHERE)
                          </span>
                        </td>
                      </tr>
                    </>
                  )}

                  {activeTab === 'user' &&
                    candidateRows.map((row) => (
                      <tr key={row.id} className="hover:bg-muted-surface/40">
                        <td className="py-2 px-4 text-foreground font-semibold">{row.id}</td>
                        <td className="py-2 px-4 text-foreground">{row.name}</td>
                        <td className="py-2 px-4 text-muted-foreground">{row.department}</td>
                        <td className="py-2 px-4 text-foreground">{row.salary}</td>
                        <td className="py-2 px-4 text-right text-muted-foreground">Candidate Tuple</td>
                      </tr>
                    ))}

                  {activeTab === 'expected' &&
                    benchmarkRows.map((row) => (
                      <tr key={row.id} className="hover:bg-muted-surface/40">
                        <td className="py-2 px-4 text-foreground font-semibold">{row.id}</td>
                        <td className="py-2 px-4 text-foreground">{row.name}</td>
                        <td className="py-2 px-4 text-muted-foreground">{row.department}</td>
                        <td className="py-2 px-4 text-foreground">{row.salary}</td>
                        <td className="py-2 px-4 text-right text-emerald-600 font-semibold">Benchmark Truth</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Explanation Note */}
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
              <span>Benchmark target: 4 tuples required. Candidate produced 4 tuples with 1 spurious and 1 missing.</span>
              <span className="text-emerald-700 font-semibold">Diff Resolution: Add WHERE salary &gt; 100000 AND status != &apos;Intern&apos;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
