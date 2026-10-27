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
      <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0c121e]/90 to-[#070a12]/90 p-6 backdrop-blur-xl shadow-bento">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500/20 to-amber-500/20 border border-white/10 text-rose-400">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-400">
                  {caseStudy.company.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {caseStudy.role}
                </span>
              </div>
              <h2 className="mt-1 text-lg font-bold text-white font-sans">
                {caseStudy.title}
              </h2>
            </div>
          </div>

          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-bold text-emerald-400">
            INCIDENT DOSSIER #2540
          </span>
        </div>

        {/* Business Scenario Description */}
        <div className="mt-5 flex flex-col gap-3">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            🚨 Production Incident Context &amp; Challenge:
          </span>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {caseStudy.scenario}
          </p>
        </div>

        {/* Target Schema */}
        <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/50 p-3.5">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            RELATIONAL DATA SCHEMA:
          </span>
          <code className="mt-1 block font-mono text-xs text-indigo-300">
            {caseStudy.schema}
          </code>
        </div>
      </div>

      {/* Recommended Production Query */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0c101b]/80 p-6 backdrop-blur-xl shadow-bento">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            RECOMMENDED PRODUCTION SQL SOLUTION:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Query'}</span>
            </button>
            {onOpenStudio && (
              <button
                onClick={() => onOpenStudio(solutionSql)}
                className="flex items-center gap-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 px-3 py-1.5 text-xs font-bold text-white transition-all shadow-glow-rose"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Test in Studio</span>
              </button>
            )}
          </div>
        </div>

        <pre className="mt-4 rounded-xl border border-white/[0.08] bg-black/60 p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
          {solutionSql}
        </pre>
      </div>
    </div>
  );
}
