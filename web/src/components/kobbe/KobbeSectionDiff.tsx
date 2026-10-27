'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
    { id: 110, name: 'Intern (Dev)', department: 'QA', salary: '$45,000' },
  ];

  return (
    <section id="section-diff" className="py-14 sm:py-18 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-8">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-xs sm:text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-1.5">
          <span className="text-foreground font-medium block mb-1">
            Tuple telemetry,
          </span>
          exact relational diff from disk scan to projected result set.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              See what every query filters, matches, and misses
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed text-pretty">
              Color-coded tuple-level diffing between candidate output and benchmark ground truth. Instantly isolate extra duplicate records, missing rows, and column type mismatches with zero guesswork.
            </p>
            <a
              href="#section-diff-panel"
              className="text-foreground inline-flex items-center gap-1 text-xs sm:text-sm font-medium leading-tight mt-2 group"
            >
              <span>Explore relational diff inspector</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Full-width Kobbe Panel: Compact 3-Way Relational Diff Grid */}
        <div
          id="section-diff-panel"
          className="bg-muted-surface relative overflow-hidden rounded-xl p-3.5 sm:p-5 border border-border/80 shadow-panel"
        >
          <div className="flex flex-col gap-3.5">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-border/70">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-foreground">
                  3-WAY RELATIONAL DIFF INSPECTOR
                </span>
                <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                  Query: SELECT * FROM Employees WHERE salary &gt; 100000
                </span>
              </div>

              {/* Tabs with sliding indicator */}
              <div className="flex items-center gap-0.5 bg-surface p-0.5 rounded-lg border border-border shadow-2xs">
                {[
                  { id: 'diff', label: '📊 Visual Diff' },
                  { id: 'user', label: '👤 Candidate' },
                  { id: 'expected', label: '🎯 Benchmark' },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDiffTab(tab.id as any)}
                      className={`relative px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer ${
                        isActive ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="diffActiveTabPill"
                          className="absolute inset-0 rounded-md bg-muted-surface border border-border shadow-2xs"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tabular Relational View */}
            <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-2xs">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-muted-surface border-b border-border text-muted-foreground font-medium text-[11px]">
                    <th className="py-2 px-3">EMP_ID</th>
                    <th className="py-2 px-3">FULL_NAME</th>
                    <th className="py-2 px-3">DEPARTMENT</th>
                    <th className="py-2 px-3">COMPENSATION</th>
                    <th className="py-2 px-3 text-right">TUPLE VERDICT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <AnimatePresence mode="wait">
                    {activeTab === 'diff' && (
                      <>
                        {benchmarkRows.slice(0, 3).map((row) => (
                          <tr key={row.id} className="hover:bg-muted-surface/40 transition-colors">
                            <td className="py-1.5 px-3 text-foreground font-semibold">{row.id}</td>
                            <td className="py-1.5 px-3 text-foreground">{row.name}</td>
                            <td className="py-1.5 px-3 text-muted-foreground">{row.department}</td>
                            <td className="py-1.5 px-3 text-foreground">{row.salary}</td>
                            <td className="py-1.5 px-3 text-right">
                              <span className="inline-flex items-center gap-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-bold">
                                ✓ MATCH
                              </span>
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-rose-50/50 hover:bg-rose-50 transition-colors">
                          <td className="py-1.5 px-3 text-foreground font-semibold">110</td>
                          <td className="py-1.5 px-3 text-foreground">Intern (Dev)</td>
                          <td className="py-1.5 px-3 text-muted-foreground">QA</td>
                          <td className="py-1.5 px-3 text-foreground">$45,000</td>
                          <td className="py-1.5 px-3 text-right">
                            <span className="inline-flex items-center gap-1 rounded bg-rose-100 text-rose-800 border border-rose-200 px-1.5 py-0.5 text-[9px] font-bold">
                              + EXTRA (WHERE FAILED)
                            </span>
                          </td>
                        </tr>
                      </>
                    )}

                    {activeTab === 'user' &&
                      candidateRows.map((row) => (
                        <tr key={row.id} className="hover:bg-muted-surface/40 transition-colors">
                          <td className="py-1.5 px-3 text-foreground font-semibold">{row.id}</td>
                          <td className="py-1.5 px-3 text-foreground">{row.name}</td>
                          <td className="py-1.5 px-3 text-muted-foreground">{row.department}</td>
                          <td className="py-1.5 px-3 text-foreground">{row.salary}</td>
                          <td className="py-1.5 px-3 text-right text-muted-foreground text-[11px]">Candidate Tuple</td>
                        </tr>
                      ))}

                    {activeTab === 'expected' &&
                      benchmarkRows.map((row) => (
                        <tr key={row.id} className="hover:bg-muted-surface/40 transition-colors">
                          <td className="py-1.5 px-3 text-foreground font-semibold">{row.id}</td>
                          <td className="py-1.5 px-3 text-foreground">{row.name}</td>
                          <td className="py-1.5 px-3 text-muted-foreground">{row.department}</td>
                          <td className="py-1.5 px-3 text-foreground">{row.salary}</td>
                          <td className="py-1.5 px-3 text-right text-emerald-700 font-semibold text-[11px]">Benchmark Truth</td>
                        </tr>
                      ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Explanation Note */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-muted-foreground font-mono gap-1">
              <span>Benchmark target: 4 tuples required. Candidate produced 4 tuples with 1 spurious.</span>
              <span className="text-emerald-700 font-semibold">Diff Resolution: WHERE salary &gt; 100000 AND status != &apos;Intern&apos;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
