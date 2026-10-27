'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Terminal, Building2, Flame, Search, Command } from 'lucide-react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenCommandPalette?: () => void;
}

export function Navbar({ activeView, setActiveView, onOpenCommandPalette }: NavbarProps) {
  const navItems = [
    { id: 'course', label: 'Mastery Track', icon: Database, tag: '10 Topics' },
    { id: 'arena', label: 'LeetCode 323', icon: Terminal, tag: '323 Qs' },
    { id: 'companies', label: 'Company Hub', icon: Building2, tag: '70+ Orgs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07080c]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-rose-500 via-indigo-500 to-cyan-400 p-[1px] shadow-glow-rose">
            <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#07080c]">
              <Database className="h-4 w-4 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white font-mono text-sm">SQL FOUNDRY</span>
              <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-400">
                PRO
              </span>
            </div>
          </div>
        </div>

        {/* Center: Sliding Pill Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbarSlidingPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/20 via-indigo-500/20 to-cyan-500/20 border border-white/[0.15] shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`h-3.5 w-3.5 relative z-10 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                <span className="relative z-10">{item.label}</span>
                <span className="relative z-10 rounded-full bg-white/[0.08] px-1.5 py-0.5 text-[9px] font-mono text-slate-300">
                  {item.tag}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: Telemetry & Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search / Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:border-white/20 hover:text-white transition-all shadow-sm"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search curriculum...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>

          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400 shadow-sm">
            <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span>12 Day Streak</span>
          </div>
        </div>
      </div>
    </header>
  );
}
