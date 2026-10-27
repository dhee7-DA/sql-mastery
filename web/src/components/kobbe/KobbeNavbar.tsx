'use client';

import React from 'react';
import { Database, ArrowUpRight, Zap, Award, HelpCircle } from 'lucide-react';

interface KobbeNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenHotkeys?: () => void;
  onOpenAnalytics?: () => void;
}

export function KobbeNavbar({ activeTab, setActiveTab, onOpenHotkeys, onOpenAnalytics }: KobbeNavbarProps) {
  return (
    <header className="sticky top-0 z-50 py-3 transition-all">
      <div className="progressive-blur-top" aria-hidden="true" />
      <div className="mx-auto max-w-320 px-4 sm:px-8 relative flex items-center justify-between">
        {/* Left: Brand Icon & Pill Menu */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="bg-surface flex size-9 items-center justify-center rounded-lg border border-border shadow-xs hover:border-foreground/30 transition-colors"
            aria-label="SQL Foundry Home"
          >
            <Database className="size-4.5 text-foreground" />
          </a>

          <nav className="bg-muted-surface flex items-center gap-1 rounded-lg p-1 text-xs sm:text-sm font-medium border border-border/60">
            {[
              { id: 'course', label: 'Course' },
              { id: 'pipeline', label: 'Execution Order' },
              { id: 'diff', label: 'Visual Diff' },
              { id: 'studio', label: 'Query Studio' },
              { id: 'faq', label: 'FAQ' },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`rounded-md px-3 py-1.5 transition-all text-xs font-medium cursor-pointer ${
                    isActive
                      ? 'bg-surface text-foreground shadow-xs border border-border/80 font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {onOpenHotkeys && (
            <button
              onClick={onOpenHotkeys}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-mono font-medium text-muted-foreground hover:text-foreground bg-muted-surface border border-border/60 transition-colors"
              title="Hotkeys HUD (?)"
            >
              <HelpCircle className="size-3.5" />
              <span>[?]</span>
            </button>
          )}

          {onOpenAnalytics && (
            <button
              onClick={onOpenAnalytics}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-mono font-medium text-muted-foreground hover:text-foreground bg-muted-surface border border-border/60 transition-colors"
              title="Progress & Proof-of-Work"
            >
              <Award className="size-3.5" />
              <span>Progress</span>
            </button>
          )}

          <button
            onClick={() => {
              setActiveTab('course');
              const el = document.getElementById('section-curriculum');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 font-medium transition-colors w-fit rounded-lg px-3.5 py-2 text-xs sm:text-sm bg-dark-background text-surface hover:bg-dark-background/85 shadow-xs"
          >
            <span>Start Course</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
