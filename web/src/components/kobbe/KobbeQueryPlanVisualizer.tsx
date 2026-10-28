'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitCommit,
  Zap,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowDown,
  Layers,
  Sparkles,
  Info,
  Clock,
  Code2,
} from 'lucide-react';
import { QueryPlanAnalysis, QueryPlanNode } from '@/lib/useSqlWasm';

interface KobbeQueryPlanVisualizerProps {
  plan: QueryPlanAnalysis;
}

export function KobbeQueryPlanVisualizer({ plan }: KobbeQueryPlanVisualizerProps) {
  const [viewMode, setViewMode] = useState<'visual' | 'raw'>('visual');

  const getEfficiencyBadge = (eff: QueryPlanNode['efficiency']) => {
    switch (eff) {
      case 'optimal':
        return {
          bg: 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
          label: 'Optimal',
          icon: Zap,
        };
      case 'sub-optimal':
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
          label: 'Sequential Scan',
          icon: AlertTriangle,
        };
      default:
        return {
          bg: 'bg-sky-50 text-sky-900 border-sky-300 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
          label: 'Acceptable',
          icon: Info,
        };
    }
  };

  const getCategoryStyles = (cat: QueryPlanNode['category']) => {
    switch (cat) {
      case 'index-seek':
        return {
          border: 'border-emerald-500/50',
          bg: 'bg-emerald-500/5',
          text: 'text-emerald-700 dark:text-emerald-400',
          badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
          icon: Zap,
          title: 'B-Tree Index Seek',
        };
      case 'table-scan':
        return {
          border: 'border-amber-500/50',
          bg: 'bg-amber-500/5',
          text: 'text-amber-700 dark:text-amber-400',
          badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
          icon: AlertTriangle,
          title: 'Sequential Table Scan',
        };
      case 'temp-sort':
        return {
          border: 'border-purple-500/50',
          bg: 'bg-purple-500/5',
          text: 'text-purple-700 dark:text-purple-400',
          badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
          icon: GitCommit,
          title: 'In-Memory B-Tree Sort',
        };
      case 'temp-group':
        return {
          border: 'border-sky-500/50',
          bg: 'bg-sky-500/5',
          text: 'text-sky-700 dark:text-sky-400',
          badge: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200',
          icon: Layers,
          title: 'Grouping Aggregator',
        };
      case 'subquery':
        return {
          border: 'border-indigo-500/50',
          bg: 'bg-indigo-500/5',
          text: 'text-indigo-700 dark:text-indigo-400',
          badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200',
          icon: Code2,
          title: 'Subquery Stream',
        };
      default:
        return {
          border: 'border-border',
          bg: 'bg-muted-surface/40',
          text: 'text-foreground',
          badge: 'bg-border text-foreground',
          icon: HelpCircle,
          title: 'Relational Step',
        };
    }
  };

  const overall = getEfficiencyBadge(plan.overallRating);
  const OverallIcon = overall.icon;

  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface overflow-hidden shadow-panel">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border bg-muted-surface px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-mono font-bold ${overall.bg}`}>
            <OverallIcon className="size-3" />
            <span>{plan.summary}</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
            <Clock className="size-3" />
            {plan.latencyMs}ms plan time
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-0.5 shadow-2xs">
          <button
            onClick={() => setViewMode('visual')}
            className={`rounded px-2.5 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
              viewMode === 'visual'
                ? 'bg-dark-background text-surface font-semibold shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Visual Plan Tree
          </button>
          <button
            onClick={() => setViewMode('raw')}
            className={`rounded px-2.5 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
              viewMode === 'raw'
                ? 'bg-dark-background text-surface font-semibold shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Raw SQLite Plan
          </button>
        </div>
      </div>

      {/* Recommendations Banner */}
      {plan.recommendations && plan.recommendations.length > 0 && (
        <div className="border-b border-border/80 bg-muted-surface/40 px-3.5 py-2 text-xs font-mono flex items-start gap-2">
          <Sparkles className="size-3.5 text-foreground shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-foreground text-[10px] uppercase tracking-wider">
              Planner Optimization Diagnostics:
            </span>
            {plan.recommendations.map((rec, i) => (
              <p key={i} className="text-muted-foreground text-[11px] leading-relaxed">
                {rec}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Body */}
      {viewMode === 'visual' ? (
        <div className="p-3.5 sm:p-5 flex flex-col gap-3 max-h-[420px] overflow-y-auto">
          {plan.nodes.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-muted-foreground">
              No query plan available. Execute a query to inspect its physical B-Tree execution plan.
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {/* Query Result Sink (Top Node) */}
              <div className="w-full max-w-md rounded-lg border border-border bg-muted-surface p-2.5 flex items-center justify-between text-xs font-mono shadow-2xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-3.5 text-emerald-600" />
                  <span className="font-bold text-foreground">OUTPUT STREAM (CLIENT BUFFER)</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">Tuple Sink</span>
              </div>

              {/* Connecting Tree Nodes */}
              {plan.nodes.map((node, index) => {
                const styles = getCategoryStyles(node.category);
                const Icon = styles.icon;

                return (
                  <React.Fragment key={node.id}>
                    {/* Visual Connector Arrow */}
                    <div className="flex items-center justify-center my-0.5">
                      <ArrowDown className="size-3.5 text-muted-foreground/60 animate-bounce" />
                    </div>

                    {/* Step Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: index * 0.05 }}
                      className={`w-full max-w-md rounded-xl border ${styles.border} ${styles.bg} p-3 sm:p-3.5 flex flex-col gap-2 shadow-panel transition-all`}
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Icon className={`size-3.5 ${styles.text}`} />
                          <span className={`text-xs font-mono font-bold ${styles.text}`}>
                            {styles.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="rounded bg-surface border border-border px-1.5 py-0.2 text-[9px] font-mono font-bold text-foreground">
                            {node.complexity}
                          </span>
                          <span className={`rounded px-1.5 py-0.2 text-[9px] font-mono font-semibold ${styles.badge}`}>
                            Step {node.id}
                          </span>
                        </div>
                      </div>

                      {/* Detail String */}
                      <div className="rounded-md border border-border/80 bg-surface px-2.5 py-1.5 font-mono text-xs text-foreground">
                        <code>{node.detail}</code>
                      </div>

                      {/* Metadata tags */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                        {node.table && (
                          <span className="rounded bg-muted-surface border border-border px-1.5 py-0.2 text-foreground">
                            Table: <strong>{node.table}</strong>
                          </span>
                        )}
                        {node.indexName && (
                          <span className="rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300">
                            Index: <strong>{node.indexName}</strong>
                          </span>
                        )}
                      </div>

                      {/* Engine Tip */}
                      {node.tip && (
                        <p className="text-[11px] font-sans text-muted-foreground leading-normal border-t border-border/50 pt-1.5">
                          {node.tip}
                        </p>
                      )}
                    </motion.div>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Raw SQLite Plan Table */
        <div className="overflow-x-auto p-3.5 max-h-[380px]">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead className="bg-muted-surface text-muted-foreground text-[10px]">
              <tr className="border-b border-border">
                <th className="py-1.5 px-2.5">ID</th>
                <th className="py-1.5 px-2.5">PARENT</th>
                <th className="py-1.5 px-2.5">NOTUSED</th>
                <th className="py-1.5 px-2.5">DETAIL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface">
              {plan.raw.map((r, i) => (
                <tr key={i} className="hover:bg-muted-surface/40 transition-colors">
                  <td className="py-1.5 px-2.5 text-foreground font-bold">{r[0]}</td>
                  <td className="py-1.5 px-2.5 text-muted-foreground">{r[1]}</td>
                  <td className="py-1.5 px-2.5 text-muted-foreground">{r[2]}</td>
                  <td className="py-1.5 px-2.5 text-foreground font-mono text-[11px]">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
