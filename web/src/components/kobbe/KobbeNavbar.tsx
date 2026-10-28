'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, ArrowUpRight, Award, HelpCircle, Moon, Sun } from 'lucide-react';

interface KobbeNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenHotkeys?: () => void;
  onOpenAnalytics?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export function KobbeNavbar({
  activeTab,
  setActiveTab,
  onOpenHotkeys,
  onOpenAnalytics,
  isDarkMode = false,
  onToggleTheme,
}: KobbeNavbarProps) {
  const navItems = [
    { id: 'course', label: 'Course' },
    { id: 'pipeline', label: 'Execution Order' },
    { id: 'diff', label: 'Visual Diff' },
    { id: 'traps', label: 'Traps & Radar' },
    { id: 'studio', label: 'Section Studio' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-40 py-2.5 transition-all">
      <div className="progressive-blur-top" aria-hidden="true" />
      <div className="mx-auto max-w-320 px-4 sm:px-8 relative flex items-center justify-between">
        {/* Left: Brand Icon & Pill Menu */}
        <div className="flex items-center gap-2.5">
          <a
            href="/"
            className="bg-surface flex size-8 items-center justify-center rounded-lg border border-border shadow-xs hover:border-foreground/30 active:scale-95 transition-all"
            aria-label="SQL Foundry Home"
          >
            <Database className="size-4 text-foreground" />
          </a>

          <nav className="bg-muted-surface flex items-center gap-0.5 rounded-lg p-0.5 text-xs font-medium border border-border/70 shadow-2xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative rounded-md px-2.5 py-1 transition-colors duration-150 text-xs font-medium cursor-pointer ${
                    isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbarActivePill"
                      className="absolute inset-0 rounded-md bg-surface border border-border shadow-xs"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Day / Night Theme Toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="flex items-center justify-center size-7.5 rounded-lg border border-border/70 bg-muted-surface hover:bg-surface text-foreground active:scale-95 transition-all cursor-pointer shadow-2xs"
              title={isDarkMode ? 'Switch to Nordic Bone (Light)' : 'Switch to Nordic Charcoal (Dark)'}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="size-3.5 text-amber-400" />
              ) : (
                <Moon className="size-3.5 text-muted-foreground" />
              )}
            </button>
          )}

          {/* Command Palette Trigger */}
          {onOpenHotkeys && (
            <button
              onClick={onOpenHotkeys}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono font-medium text-muted-foreground hover:text-foreground bg-muted-surface border border-border/70 hover:bg-surface active:scale-95 transition-all cursor-pointer"
              title="Command Palette & Hotkeys (Cmd+K)"
            >
              <HelpCircle className="size-3.5" />
              <span>⌘K</span>
            </button>
          )}

          {onOpenAnalytics && (
            <button
              onClick={onOpenAnalytics}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono font-medium text-muted-foreground hover:text-foreground bg-muted-surface border border-border/70 hover:bg-surface active:scale-95 transition-all cursor-pointer"
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
            className="inline-flex cursor-pointer items-center gap-1.5 font-medium transition-all w-fit rounded-lg px-3 py-1.5 text-xs bg-dark-background text-cta-text hover:bg-dark-background/85 active:scale-95 shadow-xs"
          >
            <span>Start Course</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
