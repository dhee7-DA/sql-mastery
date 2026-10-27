'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Copy, Check, Terminal } from 'lucide-react';
import { CaseStudy } from '@/data/masteryCourseData';

interface StepCaseProps {
  caseStudy: CaseStudy;
  onOpenStudio?: (query: string) => void;
}

export function StepCase({ caseStudy, onOpenStudio }: StepCaseProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const solutionSql = caseStudy.expectedSql || caseStudy.recommendedQuery || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(solutionSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Hero Banner (Compact) */}
      <div className="rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-panel">
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-muted-surface text-foreground shadow-2xs">
              <Briefcase className="size-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-dark-background px-2 py-0.5 text-[9px] font-mono font-medium text-white">
                  {caseStudy.company.toUpperCase()}
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">
                  {caseStudy.role}
                </span>
              </div>
              <h2 className="mt-0.5 text-base font-bold text-foreground font-sans">
                {caseStudy.title}
              </h2>
            </div>
          </div>

          <span className="rounded-full border border-border bg-muted-surface px-2.5 py-0.5 text-[11px] font-mono font-medium text-foreground">
            INCIDENT DOSSIER #2540
          </span>
        </div>

        {/* Business Scenario Description */}
        <div className="mt-3.5 flex flex-col gap-1.5">
          <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
            🚨 Incident Context &amp; Challenge:
          </span>
          <p className="text-xs sm:text-[13px] text-foreground/90 leading-relaxed">
            {caseStudy.scenario}
          </p>
        </div>

        {/* Target Schema */}
        <div className="mt-3 rounded-lg border border-border bg-muted-surface p-2.5">
          <span className="text-[9px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
            RELATIONAL SCHEMA:
          </span>
          <code className="mt-0.5 block font-mono text-[11px] text-foreground">
            {caseStudy.schema}
          </code>
        </div>
      </div>

      {/* Recommended Production Query (Compact) */}
      <div className="rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-panel">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
            RECOMMENDED PRODUCTION SQL SOLUTION:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-md border border-border bg-muted-surface px-2.5 py-1 text-xs font-medium text-foreground hover:bg-surface active:scale-95 transition-all shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="size-3 text-emerald-700" /> : <Copy className="size-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            {onOpenStudio && (
              <button
                onClick={() => onOpenStudio(solutionSql)}
                className="flex items-center gap-1 rounded-md bg-dark-background hover:bg-neutral-800 active:scale-95 px-3 py-1 text-xs font-medium text-white transition-all shadow-xs cursor-pointer"
              >
                <Terminal className="size-3" />
                <span>Test in Studio</span>
              </button>
            )}
          </div>
        </div>

        <pre className="mt-3 rounded-lg border border-border bg-muted-surface p-3 font-mono text-[11px] text-foreground overflow-x-auto leading-relaxed">
          {solutionSql}
        </pre>
      </div>
    </div>
  );
}
