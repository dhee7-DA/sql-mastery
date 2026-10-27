'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Play, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { SQL_CLAUSES, SqlClause } from '@/data/sqlClausesData';

interface KobbeHeroProps {
  onStartCourse: () => void;
  onOpenStudio: () => void;
}

export function KobbeHero({ onStartCourse, onOpenStudio }: KobbeHeroProps) {
  const [selectedClauseId, setSelectedClauseId] = useState<number>(1);
  const activeClause = SQL_CLAUSES.find((c) => c.logicalPos === selectedClauseId) || SQL_CLAUSES[0];

  return (
    <section className="flex min-h-[calc(100svh-4rem)] flex-col justify-between overflow-hidden">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-10 hero-statement pt-12 lg:pt-16">
        {/* Left Column (Kobbe.io Signature 4-col Label) */}
        <p className="text-sm text-muted-foreground max-w-64 leading-relaxed text-pretty lg:col-span-4 lg:mt-2">
          <span className="text-foreground font-medium block mb-1">
            For top engineers and candidates,
          </span>
          see what the engine filters, how tuples group in memory, and what breaks under load.
        </p>

        {/* Right Column (Kobbe.io Signature 8-col Heading & Buttons) */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Physical execution order that counts memory, not syntax
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed text-pretty">
              See which clauses allocate memory first, and practice FAANG-tested problems. No cookies, no local setup, zero-latency in-browser compilation. One clear visual engine.
            </p>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartCourse}
              className="inline-flex cursor-pointer items-center gap-2 font-medium transition-colors w-fit rounded-lg px-4 py-2.5 text-sm bg-dark-background text-surface hover:bg-dark-background/85 shadow-xs"
            >
              <span>Start Mastery Course</span>
              <ArrowUpRight className="size-4" />
            </button>
            <button
              onClick={onOpenStudio}
              className="inline-flex cursor-pointer items-center gap-2 font-medium transition-colors w-fit rounded-lg px-4 py-2.5 text-sm bg-muted-surface text-foreground hover:bg-border/60 border border-border/80"
            >
              <Terminal className="size-4 text-muted-foreground" />
              <span>Live SQL Studio</span>
              <ArrowUpRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Full-width Kobbe Panel: Interactive SQL Execution Order Preview */}
        <div className="bg-muted-surface relative overflow-hidden rounded-xl p-4 sm:p-7 border border-border/80 shadow-panel">
          <div className="flex flex-col gap-4">
            {/* Top Bar of the Panel */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/70">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium bg-surface border border-border text-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  PHYSICAL QUERY PIPELINE
                </span>
                <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
                  7 Internal ANSI Stages
                </span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                Click any clause to inspect tuple memory allocation
              </span>
            </div>

            {/* The 7 Clause Stepper Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {SQL_CLAUSES.map((clause) => {
                const isSelected = clause.logicalPos === selectedClauseId;
                return (
                  <button
                    key={clause.id}
                    onClick={() => setSelectedClauseId(clause.logicalPos)}
                    className={`flex flex-col items-start gap-1 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-surface border-foreground/30 shadow-xs ring-1 ring-foreground/10'
                        : 'bg-surface/60 border-border/70 hover:bg-surface hover:border-border'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-muted-foreground">
                      STEP 0{clause.logicalPos}
                    </span>
                    <span className="text-sm font-mono font-bold text-foreground">
                      {clause.keyword}
                    </span>
                    <span className="text-[11px] text-muted-foreground truncate w-full">
                      {clause.role}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Clause Inspection Card */}
            <div className="bg-surface rounded-lg p-4 sm:p-5 border border-border/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5">
                    Step 0{activeClause.logicalPos}: {activeClause.keyword}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {activeClause.role}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed mt-1">
                  <strong>Engine Action:</strong> {activeClause.action}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  <strong>💡 Golden Rule:</strong> {activeClause.whyItMatters}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Written vs Executed
                </span>
                <span className="text-xs font-mono font-bold text-foreground bg-muted-surface px-2.5 py-1 rounded border border-border">
                  Written #{activeClause.lexicalPos} ➔ Executed #{activeClause.logicalPos}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Spacing */}
      <div className="py-6" />
    </section>
  );
}
