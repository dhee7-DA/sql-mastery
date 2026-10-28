'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Cpu, HardDrive, Layers, Sparkles } from 'lucide-react';
import { SqlKeywordText } from '@/components/common/SqlKeywordText';

interface StageData {
  step: number;
  clause: string;
  role: string;
  heapBytes: string;
  activeCount: number;
  engineRule: string;
  description: string;
  tuples: {
    id: number;
    name: string;
    department: string;
    salary: number;
    active: number;
    status: 'retained' | 'filtered' | 'grouped' | 'projected';
    note?: string;
  }[];
}

const STAGES: StageData[] = [
  {
    step: 1,
    clause: 'FROM & JOIN',
    role: 'Relation Cartography & Disk Heap Scan',
    heapBytes: '2.56 KB',
    activeCount: 8,
    engineRule: 'Tables must exist before any filter or projection can happen.',
    description: 'The engine scans the Employees table from disk or buffer pool and builds the raw tuple working set.',
    tuples: [
      { id: 101, name: 'Ashley', department: 'Analytics', salary: 115000, active: 1, status: 'retained' },
      { id: 102, name: 'David', department: 'Engineering', salary: 125000, active: 1, status: 'retained' },
      { id: 103, name: 'Elena', department: 'Analytics', salary: 95000, active: 1, status: 'retained' },
      { id: 104, name: 'Marcus', department: 'Product', salary: 118000, active: 1, status: 'retained' },
      { id: 105, name: 'Samantha', department: 'Engineering', salary: 145000, active: 1, status: 'retained' },
      { id: 106, name: 'Brian', department: 'QA', salary: 75000, active: 1, status: 'retained' },
      { id: 107, name: 'Chloe', department: 'Design', salary: 72000, active: 0, status: 'retained' },
      { id: 108, name: 'Intern', department: 'Engineering', salary: 45000, active: 0, status: 'retained' },
    ],
  },
  {
    step: 2,
    clause: 'WHERE',
    role: 'Row-Level Gatekeeper',
    heapBytes: '1.60 KB',
    activeCount: 5,
    engineRule: 'Filters individual tuples BEFORE any grouping. Aliases in SELECT do not exist yet!',
    description: 'Evaluates predicate: active = 1 AND salary > 80000. Low salary and inactive employees are discarded from memory.',
    tuples: [
      { id: 101, name: 'Ashley', department: 'Analytics', salary: 115000, active: 1, status: 'retained' },
      { id: 102, name: 'David', department: 'Engineering', salary: 125000, active: 1, status: 'retained' },
      { id: 103, name: 'Elena', department: 'Analytics', salary: 95000, active: 1, status: 'retained' },
      { id: 104, name: 'Marcus', department: 'Product', salary: 118000, active: 1, status: 'retained' },
      { id: 105, name: 'Samantha', department: 'Engineering', salary: 145000, active: 1, status: 'retained' },
      { id: 106, name: 'Brian', department: 'QA', salary: 75000, active: 1, status: 'filtered', note: 'Salary <= 80k' },
      { id: 107, name: 'Chloe', department: 'Design', salary: 72000, active: 0, status: 'filtered', note: 'Inactive' },
      { id: 108, name: 'Intern', department: 'Engineering', salary: 45000, active: 0, status: 'filtered', note: 'Inactive & low' },
    ],
  },
  {
    step: 3,
    clause: 'GROUP BY',
    role: 'Memory Bucket Aggregator',
    heapBytes: '1.12 KB',
    activeCount: 3,
    engineRule: 'Individual non-aggregate columns disappear from row visibility unless included in the GROUP BY key.',
    description: 'The surviving 5 tuples are hash-partitioned into 3 department buckets: Analytics (2), Engineering (2), Product (1).',
    tuples: [
      { id: 101, name: 'Ashley & Elena', department: 'Analytics', salary: 105000, active: 1, status: 'grouped', note: '2 tuples in bucket' },
      { id: 102, name: 'David & Samantha', department: 'Engineering', salary: 135000, active: 1, status: 'grouped', note: '2 tuples in bucket' },
      { id: 104, name: 'Marcus', department: 'Product', salary: 118000, active: 1, status: 'grouped', note: '1 tuple in bucket' },
    ],
  },
  {
    step: 4,
    clause: 'HAVING',
    role: 'Group-Level Gatekeeper',
    heapBytes: '0.74 KB',
    activeCount: 2,
    engineRule: 'Evaluates aggregate filters on the buckets formed by GROUP BY.',
    description: 'Evaluates group predicate: COUNT(*) >= 2. The Product bucket (1 member) is discarded.',
    tuples: [
      { id: 101, name: 'Ashley & Elena', department: 'Analytics', salary: 105000, active: 1, status: 'retained', note: 'Count: 2 >= 2 ✓' },
      { id: 102, name: 'David & Samantha', department: 'Engineering', salary: 135000, active: 1, status: 'retained', note: 'Count: 2 >= 2 ✓' },
      { id: 104, name: 'Marcus', department: 'Product', salary: 118000, active: 1, status: 'filtered', note: 'Count: 1 < 2 ✗' },
    ],
  },
  {
    step: 5,
    clause: 'SELECT',
    role: 'Column Projection & Scalar Mathematics',
    heapBytes: '0.48 KB',
    activeCount: 2,
    engineRule: 'Computes expressions, column aliases, and window calculations for surviving tuples.',
    description: 'Evaluates department, COUNT(*) AS headcount, ROUND(AVG(salary), 2) AS avg_comp. Column aliases now exist.',
    tuples: [
      { id: 101, name: 'Analytics', department: 'Analytics', salary: 105000, active: 1, status: 'projected', note: 'headcount: 2, avg: $105k' },
      { id: 102, name: 'Engineering', department: 'Engineering', salary: 135000, active: 1, status: 'projected', note: 'headcount: 2, avg: $135k' },
    ],
  },
  {
    step: 6,
    clause: 'ORDER BY',
    role: 'In-Memory Sort or Index Walk',
    heapBytes: '0.48 KB',
    activeCount: 2,
    engineRule: 'Can use column aliases created in SELECT because SELECT has already evaluated!',
    description: 'Sorts surviving projected tuples by avg_comp DESC. Engineering ($135k) ranks #1, Analytics ($105k) ranks #2.',
    tuples: [
      { id: 102, name: 'Engineering', department: 'Engineering', salary: 135000, active: 1, status: 'projected', note: 'Rank 1 ($135,000)' },
      { id: 101, name: 'Analytics', department: 'Analytics', salary: 105000, active: 1, status: 'projected', note: 'Rank 2 ($105,000)' },
    ],
  },
  {
    step: 7,
    clause: 'LIMIT / OFFSET',
    role: 'Final Output Slicing',
    heapBytes: '0.24 KB',
    activeCount: 1,
    engineRule: 'Executes dead last. Slices the ordered array to return exactly N tuples.',
    description: 'Slices output array to LIMIT 1. Only the top-earning department tuple is serialized and delivered to the client.',
    tuples: [
      { id: 102, name: 'Engineering', department: 'Engineering', salary: 135000, active: 1, status: 'projected', note: 'Top 1 Tuple Transmitted' },
    ],
  },
];

export function KobbeTuplePipelineSimulator() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const stage = STAGES[currentStep - 1];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev >= 7 ? 1 : prev + 1));
      }, 2200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-surface rounded-xl border border-border shadow-panel p-4 sm:p-5 flex flex-col gap-4">
      {/* Top Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg border border-border bg-muted-surface text-foreground shadow-2xs">
            <Cpu className="size-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-foreground">
                TUPLE MEMORY LIFECYCLE SIMULATOR
              </span>
              <span className="rounded-full bg-dark-background px-2 py-0.2 text-[9px] font-mono font-medium text-cta-text">
                STAGE 0{stage.step} / 07
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Watch tuples physically allocate, filter, cluster, and prune through the 7 ANSI engine stages.
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
            disabled={currentStep === 1}
            className="size-7 flex items-center justify-center rounded-md border border-border bg-muted-surface text-foreground hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95 transition-all"
            title="Previous Stage"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 rounded-md bg-dark-background text-cta-text px-2.5 py-1 text-xs font-mono font-medium hover:bg-dark-background/85 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            {isPlaying ? <Pause className="size-3 fill-current" /> : <Play className="size-3 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>
          <button
            onClick={() => setCurrentStep((p) => Math.min(7, p + 1))}
            disabled={currentStep === 7}
            className="size-7 flex items-center justify-center rounded-md border border-border bg-muted-surface text-foreground hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95 transition-all"
            title="Next Stage"
          >
            <ChevronRight className="size-3.5" />
          </button>
          <button
            onClick={() => {
              setCurrentStep(1);
              setIsPlaying(false);
            }}
            className="size-7 flex items-center justify-center rounded-md border border-border bg-muted-surface text-muted-foreground hover:text-foreground cursor-pointer active:scale-95 transition-all"
            title="Reset"
          >
            <RotateCcw className="size-3" />
          </button>
        </div>
      </div>

      {/* 7 Stepper Progress Bar (Clickable) */}
      <div className="grid grid-cols-7 gap-1">
        {STAGES.map((s) => {
          const isCurrent = s.step === currentStep;
          const isPassed = s.step < currentStep;
          return (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStep(s.step);
                setIsPlaying(false);
              }}
              className={`flex flex-col items-start p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-muted-surface border-foreground/30 shadow-2xs'
                  : isPassed
                  ? 'bg-muted-surface/50 border-border opacity-85'
                  : 'bg-surface border-border/60 hover:bg-muted-surface/40'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] font-mono font-bold text-muted-foreground">0{s.step}</span>
                {isCurrent && <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />}
              </div>
              <span className="text-[11px] font-mono font-semibold text-foreground truncate w-full">
                <SqlKeywordText text={s.clause} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage Telemetry Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="rounded-lg border border-border bg-muted-surface p-3 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
        >
          <div className="flex flex-col gap-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-foreground">
                STAGE {stage.step}: <SqlKeywordText text={stage.clause} />
              </span>
              <span className="text-[11px] text-muted-foreground">({stage.role})</span>
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed">
              {stage.description}
            </p>
            <p className="text-[11px] text-muted-foreground">
              <strong className="font-mono text-[10px] uppercase tracking-wider text-foreground">[ENGINE RULE]</strong>{' '}
              {stage.engineRule}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-0 border-border w-full md:w-auto">
            <div className="flex flex-col items-start md:items-end">
              <span className="text-[9px] font-mono text-muted-foreground uppercase">Heap Footprint</span>
              <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1">
                <HardDrive className="size-3 text-muted-foreground" />
                {stage.heapBytes}
              </span>
            </div>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <div className="flex flex-col items-start md:items-end">
              <span className="text-[9px] font-mono text-muted-foreground uppercase">Surviving Tuples</span>
              <span className="text-xs font-mono font-bold text-emerald-700">
                {stage.activeCount} Records
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Animated Tuples Table */}
      <div className="rounded-lg border border-border overflow-hidden shadow-2xs bg-surface">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="bg-muted-surface border-b border-border text-muted-foreground text-[10px]">
              <th className="py-1.5 px-3">TUPLE ID</th>
              <th className="py-1.5 px-3">ENTITY / NAME</th>
              <th className="py-1.5 px-3">DEPARTMENT</th>
              <th className="py-1.5 px-3">SALARY</th>
              <th className="py-1.5 px-3 text-right">LIFECYCLE STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <AnimatePresence>
              {stage.tuples.map((t) => {
                const isFiltered = t.status === 'filtered';
                const isGrouped = t.status === 'grouped';
                const isProjected = t.status === 'projected';

                return (
                  <motion.tr
                    key={t.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isFiltered ? 0.35 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`transition-colors ${
                      isFiltered
                        ? 'bg-rose-50/40 dark:bg-rose-950/20'
                        : isGrouped
                        ? 'bg-indigo-50/30 dark:bg-indigo-950/20'
                        : isProjected
                        ? 'bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'hover:bg-muted-surface/40'
                    }`}
                  >
                    <td className={`py-1.5 px-3 font-semibold ${isFiltered ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      #{t.id}
                    </td>
                    <td className={`py-1.5 px-3 ${isFiltered ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {t.name}
                    </td>
                    <td className="py-1.5 px-3 text-muted-foreground">
                      {t.department}
                    </td>
                    <td className={`py-1.5 px-3 font-medium ${isFiltered ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      ${t.salary.toLocaleString()}
                    </td>
                    <td className="py-1.5 px-3 text-right">
                      {isFiltered ? (
                        <span className="inline-flex items-center gap-1 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 px-1.5 py-0.2 text-[9px] font-semibold">
                          ✗ DISCARDED ({t.note})
                        </span>
                      ) : isGrouped ? (
                        <span className="inline-flex items-center gap-1 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 px-1.5 py-0.2 text-[9px] font-semibold">
                          ✦ {t.note}
                        </span>
                      ) : isProjected ? (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 px-1.5 py-0.2 text-[9px] font-semibold">
                          ✓ {t.note}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-muted-surface border border-border px-1.5 py-0.2 text-[9px] font-medium text-foreground">
                          ● IN HEAP
                        </span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
