'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Database, Terminal, Layers, Award, Moon, Sun, BookOpen, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { TOPIC_PHASES } from '@/data/masteryCourseData';

interface KobbeCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topicId: string) => void;
  onNavigateSection: (sectionId: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

interface CommandItem {
  id: string;
  category: 'topics' | 'pipeline' | 'actions' | 'tools';
  title: string;
  subtitle?: string;
  icon: any;
  action: () => void;
}

export function KobbeCommandPalette({
  isOpen,
  onClose,
  onSelectTopic,
  onNavigateSection,
  isDarkMode,
  onToggleTheme,
}: KobbeCommandPaletteProps) {
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keydown listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Command items catalog
  const items: CommandItem[] = [
    // Theme toggle
    {
      id: 'theme-toggle',
      category: 'actions',
      title: isDarkMode ? 'Switch to Nordic Bone (Light Paper)' : 'Switch to Nordic Charcoal (Dark Paper)',
      subtitle: 'Toggle platform aesthetic',
      icon: isDarkMode ? Sun : Moon,
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    // Sections navigation
    {
      id: 'nav-curriculum',
      category: 'tools',
      title: 'Course Curriculum & 30 Challenges',
      subtitle: 'Jump to the 10 topics',
      icon: BookOpen,
      action: () => {
        onNavigateSection('section-curriculum');
        onClose();
      },
    },
    {
      id: 'nav-pipeline',
      category: 'pipeline',
      title: '7-Stage Physical Query Pipeline',
      subtitle: 'Engine memory simulator',
      icon: Layers,
      action: () => {
        onNavigateSection('section-pipeline');
        onClose();
      },
    },
    {
      id: 'nav-diff',
      category: 'tools',
      title: '3-Way Relational Visual Diff',
      subtitle: 'Inspect matched & missing tuples',
      icon: Sparkles,
      action: () => {
        onNavigateSection('section-diff');
        onClose();
      },
    },
    {
      id: 'nav-wasm',
      category: 'tools',
      title: 'In-Browser SQLite WASM Compiler',
      subtitle: 'Zero-latency local SQL console',
      icon: Terminal,
      action: () => {
        onNavigateSection('section-studio');
        onClose();
      },
    },
    {
      id: 'nav-explain',
      category: 'tools',
      title: 'Physical EXPLAIN QUERY PLAN Tree',
      subtitle: 'Inspect B-Tree index seeks vs table scans',
      icon: Layers,
      action: () => {
        onNavigateSection('section-studio');
        onClose();
      },
    },
    {
      id: 'nav-schema',
      category: 'tools',
      title: 'Relational Schema Explorer',
      subtitle: 'Browse tables, columns, indexes & sample data',
      icon: Database,
      action: () => {
        onNavigateSection('section-studio');
        onClose();
      },
    },
    {
      id: 'nav-analytics',
      category: 'tools',
      title: 'Verified Proof-of-Work Credential',
      subtitle: '1200x630 HTML5 Canvas certificate',
      icon: Award,
      action: () => {
        onNavigateSection('section-analytics');
        onClose();
      },
    },
    // Topics items
    ...TOPIC_PHASES.map((t) => ({
      id: `topic-${t.id}`,
      category: 'topics' as const,
      title: `Topic 0${t.seq}: ${t.title}`,
      subtitle: `${t.execRank} • ${t.caseStudy.company} Incident`,
      icon: Database,
      action: () => {
        onSelectTopic(t.id);
        onNavigateSection('section-curriculum');
        onClose();
      },
    })),
  ];

  // Filter items
  const filtered = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q))
    );
  });

  // Handle arrow navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className="relative w-full max-w-lg bg-surface border border-border shadow-2xl rounded-xl overflow-hidden z-10 flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-border bg-muted-surface/50">
              <Search className="size-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search topics, execution stages, SQL traps, tools..."
                className="w-full bg-transparent text-xs sm:text-sm font-sans text-foreground placeholder-muted-foreground outline-none"
              />
              <kbd className="hidden sm:inline-flex rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-1.5 flex flex-col gap-0.5 scrollbar-none">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground font-mono">
                  No matching commands or topics found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-muted-surface text-foreground font-medium'
                          : 'text-foreground/80 hover:bg-muted-surface/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`flex size-6 shrink-0 items-center justify-center rounded border ${
                          isSelected ? 'border-foreground/30 bg-surface' : 'border-border bg-muted-surface'
                        }`}>
                          <Icon className="size-3 text-foreground" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-sans font-medium text-foreground truncate">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="text-[10px] text-muted-foreground font-mono truncate">
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <ArrowRight className="size-3 text-muted-foreground shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hotkeys Hint */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-border bg-muted-surface/70 text-[10px] font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>↑↓ Navigate</span>
                <span>•</span>
                <span>↵ Select</span>
              </div>
              <span>SQL Foundry Speedrunner</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
