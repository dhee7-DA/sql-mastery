'use client';

import React, { useState } from 'react';
import { Briefcase, Copy, Check, Terminal, ShieldAlert } from 'lucide-react';
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
    <div className="flex flex-col gap-6">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-panel">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted-surface text-foreground shadow-xs">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-dark-background px-2.5 py-0.5 text-[10px] font-mono font-medium text-white">
                  {caseStudy.company.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {caseStudy.role}
                </span>
              </div>
              <h2 className="mt-1 text-lg font-bold text-foreground font-sans">
                {caseStudy.title}
              </h2>
            </div>
          </div>

          <span className="rounded-full border border-border bg-muted-surface px-3 py-1 text-xs font-mono font-medium text-foreground">
            INCIDENT DOSSIER #2540
          </span>
        </div>

        {/* Business Scenario Description */}
        <div className="mt-5 flex flex-col gap-2.5">
          <span className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
            🚨 Production Incident Context &amp; Challenge:
          </span>
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
            {caseStudy.scenario}
          </p>
        </div>

        {/* Target Schema */}
        <div className="mt-4 rounded-xl border border-border bg-muted-surface p-3.5">
          <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
            RELATIONAL DATA SCHEMA:
          </span>
          <code className="mt-1 block font-mono text-xs text-foreground">
            {caseStudy.schema}
          </code>
        </div>
      </div>

      {/* Recommended Production Query */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-panel">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
            RECOMMENDED PRODUCTION SQL SOLUTION:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-muted-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface transition-all shadow-xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-700" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Query'}</span>
            </button>
            {onOpenStudio && (
              <button
                onClick={() => onOpenStudio(solutionSql)}
                className="flex items-center gap-1.5 rounded-lg bg-dark-background hover:bg-neutral-800 px-3 py-1.5 text-xs font-medium text-white transition-all shadow-xs"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Test in Studio</span>
              </button>
            )}
          </div>
        </div>

        <pre className="mt-4 rounded-xl border border-border bg-muted-surface p-4 font-mono text-xs text-foreground overflow-x-auto leading-relaxed">
          {solutionSql}
        </pre>
      </div>
    </div>
  );
}
