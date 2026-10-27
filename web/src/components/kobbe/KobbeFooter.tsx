'use client';

import React from 'react';
import { Database, ArrowUpRight } from 'lucide-react';

export function KobbeFooter() {
  return (
    <footer className="relative border-t border-border/60 bg-muted-surface/40 pt-16 pb-12 overflow-hidden">
      <div className="progressive-blur-bottom" aria-hidden="true" />
      <div className="mx-auto max-w-320 px-4 sm:px-8 flex flex-col gap-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="bg-surface flex size-8 items-center justify-center rounded-lg border border-border shadow-xs">
                <Database className="size-4 text-foreground" />
              </div>
              <span className="font-bold text-base text-foreground font-sans tracking-tight">
                SQL Foundry
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Cookieless, zero-latency physical SQL query execution simulator and relational mastery platform. Inspired by Kobbe.io.
            </p>
          </div>

          {/* Curriculum */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-2">
            <span className="text-xs font-semibold text-foreground font-mono">Curriculum</span>
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <li><a href="#section-curriculum" className="hover:text-foreground">01. SELECT &amp; FROM</a></li>
              <li><a href="#section-curriculum" className="hover:text-foreground">02. WHERE Filtering</a></li>
              <li><a href="#section-curriculum" className="hover:text-foreground">05. GROUP BY &amp; HAVING</a></li>
              <li><a href="#section-curriculum" className="hover:text-foreground">06. INNER &amp; LEFT JOIN</a></li>
              <li><a href="#section-curriculum" className="hover:text-foreground">10. Window Functions</a></li>
            </ul>
          </div>

          {/* Platform */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-2">
            <span className="text-xs font-semibold text-foreground font-mono">Platform</span>
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <li><a href="#section-pipeline" className="hover:text-foreground">Execution Pipeline</a></li>
              <li><a href="#section-diff" className="hover:text-foreground">Relational Diff</a></li>
              <li><a href="#section-studio" className="hover:text-foreground">SQLite WASM Engine</a></li>
              <li><a href="#section-analytics" className="hover:text-foreground">Proof-of-Work Card</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-2">
            <span className="text-xs font-semibold text-foreground font-mono">Resources</span>
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <li><a href="#section-faq" className="hover:text-foreground">Plain-English FAQ</a></li>
              <li><a href="http://localhost:8000/visualizer/index.html" target="_blank" className="hover:text-foreground flex items-center gap-1">Visualizer Studio <ArrowUpRight className="size-3" /></a></li>
              <li><a href="https://kobbe.io" target="_blank" rel="noopener noreferrer" className="hover:text-foreground flex items-center gap-1">Kobbe.io Reference <ArrowUpRight className="size-3" /></a></li>
            </ul>
          </div>

          {/* Privacy */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-2">
            <span className="text-xs font-semibold text-foreground font-mono">Privacy</span>
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <li><span className="text-emerald-700 font-semibold font-mono">100% Cookieless</span></li>
              <li><span className="text-muted-foreground">Zero Analytics</span></li>
              <li><span className="text-muted-foreground">Local SQLite WASM</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
          <span>&copy; 2026 SQL Foundry. All rights reserved.</span>
          <span>Crafted with Nordic minimalist precision inspired by Kobbe.io.</span>
        </div>
      </div>
    </footer>
  );
}
