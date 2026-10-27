'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Terminal, Sparkles } from 'lucide-react';
import { SQL_CLAUSES } from '@/data/sqlClausesData';

interface KobbeHeroProps {
  onStartCourse: () => void;
  onOpenStudio: () => void;
}

export function KobbeHero({ onStartCourse, onOpenStudio }: KobbeHeroProps) {
  const [selectedClauseId, setSelectedClauseId] = useState<number>(1);
  const activeClause = SQL_CLAUSES.find((c) => c.logicalPos === selectedClauseId) || SQL_CLAUSES[0];

  return (
    <section className="flex min-h-[calc(100svh-4rem)] flex-col justify-between overflow-hidden">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-8 hero-statement pt-10 lg:pt-14">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm text-muted-foreground max-w-64 leading-relaxed text-pretty lg:col-span-4 lg:mt-1.5"
        >
          <span className="text-foreground font-medium block mb-1">
            For top engineers & candidates,
          </span>
          see what the engine filters, how tuples group in memory, and what breaks under load.
        </motion.p>

        {/* Right Column (Kobbe 8-col Heading & Buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="flex min-w-0 flex-col gap-5 lg:col-span-8"
        >
          <div className="flex flex-col gap-2.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Physical execution order that counts memory, not syntax
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed text-pretty">
              See which clauses allocate memory first, and practice FAANG-tested problems. No cookies, no local setup, zero-latency in-browser compilation. One clear visual engine.
            </p>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartCourse}
              className="inline-flex cursor-pointer items-center gap-1.5 font-medium transition-colors w-fit rounded-lg px-3.5 py-2 text-xs sm:text-sm bg-dark-background text-surface hover:bg-dark-background/85 shadow-xs"
            >
              <span>Start Mastery Course</span>
              <ArrowUpRight className="size-3.5" />
            </motion.button>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenStudio}
              className="inline-flex cursor-pointer items-center gap-1.5 font-medium transition-colors w-fit rounded-lg px-3.5 py-2 text-xs sm:text-sm bg-surface text-foreground hover:bg-muted-surface border border-border/80 shadow-xs"
            >
              <Terminal className="size-3.5 text-muted-foreground" />
              <span>Live SQL Studio</span>
              <ArrowUpRight className="size-3.5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Full-width Kobbe Panel: Compact Interactive SQL Pipeline Preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="bg-muted-surface relative overflow-hidden rounded-xl p-3.5 sm:p-5 border border-border/80 shadow-panel"
        >
          <div className="flex flex-col gap-3.5">
            {/* Top Bar of the Panel */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-border/70">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-mono font-medium bg-surface border border-border text-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  PHYSICAL QUERY PIPELINE
                </span>
                <span className="text-[11px] text-muted-foreground font-mono hidden sm:inline">
                  7 Internal ANSI Stages
                </span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                Click any step to inspect tuple memory allocation
              </span>
            </div>

            {/* The 7 Clause Stepper Tiles (Compact & Tactile) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
              {SQL_CLAUSES.map((clause) => {
                const isSelected = clause.logicalPos === selectedClauseId;
                return (
                  <motion.button
                    key={clause.id}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedClauseId(clause.logicalPos)}
                    className={`relative flex flex-col items-start gap-0.5 p-2 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-surface border-foreground/30 shadow-xs ring-1 ring-foreground/10'
                        : 'bg-surface/60 border-border/70 hover:bg-surface hover:border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[9px] font-mono font-bold text-muted-foreground">
                        0{clause.logicalPos}
                      </span>
                      {isSelected && (
                        <span className="size-1.5 rounded-full bg-dark-background" />
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-foreground">
                      {clause.keyword}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate w-full">
                      {clause.role}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Active Clause Inspection Card with Smooth Animated Cross-fade */}
            <div className="bg-surface rounded-lg p-3.5 sm:p-4 border border-border/70">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClause.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5"
                >
                  <div className="flex flex-col gap-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-foreground bg-muted-surface border border-border rounded px-1.5 py-0.5">
                        Stage 0{activeClause.logicalPos}: {activeClause.keyword}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-medium">
                        ({activeClause.role})
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed mt-0.5">
                      <strong className="font-semibold">Engine Action:</strong> {activeClause.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>💡 Rule:</strong> {activeClause.whyItMatters}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-0.5 shrink-0 pt-2 md:pt-0 border-t md:border-0 border-border w-full md:w-auto">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      Syntax vs Engine
                    </span>
                    <span className="text-xs font-mono font-medium text-foreground bg-muted-surface px-2 py-0.5 rounded border border-border">
                      Written #{activeClause.lexicalPos} ➔ Executed #{activeClause.logicalPos}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Spacing */}
      <div className="py-4" />
    </section>
  );
}
