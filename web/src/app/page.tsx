'use client';

import React, { useState, useEffect } from 'react';
import { KobbeNavbar } from '@/components/kobbe/KobbeNavbar';
import { KobbeHero } from '@/components/kobbe/KobbeHero';
import { KobbeSectionExecution } from '@/components/kobbe/KobbeSectionExecution';
import { KobbeSectionDiff } from '@/components/kobbe/KobbeSectionDiff';
import { KobbeSectionWasm } from '@/components/kobbe/KobbeSectionWasm';
import { KobbeSectionStack } from '@/components/kobbe/KobbeSectionStack';
import { KobbeSectionCurriculum } from '@/components/kobbe/KobbeSectionCurriculum';
import { KobbeSectionTrapsAndRadar } from '@/components/kobbe/KobbeSectionTrapsAndRadar';
import { KobbeSectionAnalytics } from '@/components/kobbe/KobbeSectionAnalytics';
import { KobbeSectionFaq } from '@/components/kobbe/KobbeSectionFaq';
import { KobbeFooter } from '@/components/kobbe/KobbeFooter';
import { KobbeCommandPalette } from '@/components/kobbe/KobbeCommandPalette';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('course');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Initialize theme from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sql_foundry_theme');
      if (saved === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        if (next) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('sql_foundry_theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('sql_foundry_theme', 'light');
        }
      } catch (e) {}
      return next;
    });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'course') scrollTo('section-curriculum');
    if (tab === 'pipeline') scrollTo('section-pipeline');
    if (tab === 'diff') scrollTo('section-diff');
    if (tab === 'traps') scrollTo('section-traps');
    if (tab === 'studio') scrollTo('section-studio');
    if (tab === 'faq') scrollTo('section-faq');
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col font-sans selection:bg-foreground/10 transition-colors duration-200">
      {/* Global Command Palette (Cmd + K) */}
      <KobbeCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTopic={(topicId) => {
          scrollTo('section-curriculum');
        }}
        onNavigateSection={(secId) => scrollTo(secId)}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Kobbe Navbar with Theme Toggle & Hotkeys Button */}
      <KobbeNavbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenHotkeys={() => setIsCommandPaletteOpen(true)}
        onOpenAnalytics={() => scrollTo('section-analytics')}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 flex flex-col">
        {/* Section 0: Kobbe Hero with Live Pipeline Stepper */}
        <KobbeHero
          onStartCourse={() => scrollTo('section-curriculum')}
          onOpenStudio={() => scrollTo('section-studio')}
        />

        {/* Section 1: Execution Pipeline Reordering Challenge & Tuple Simulator */}
        <KobbeSectionExecution />

        {/* Section 2: 3-Way Relational Visual Diff */}
        <KobbeSectionDiff />

        {/* Section 3: In-Browser Real SQLite WASM Compiler */}
        <KobbeSectionWasm />

        {/* Section 4: Dialects, LeetCode 323 & FAANG Stack */}
        <KobbeSectionStack />

        {/* Section 5: The Full 10-Topic Interactive Curriculum */}
        <KobbeSectionCurriculum />

        {/* Section 6: FAANG Trap Flashcards & Relational Competency Radar */}
        <KobbeSectionTrapsAndRadar />

        {/* Section 7: Proof-of-Work Metrics & 1200x630 Credential */}
        <KobbeSectionAnalytics />

        {/* Section 8: Questions, answered plainly (FAQ) */}
        <KobbeSectionFaq />
      </main>

      <KobbeFooter />
    </div>
  );
}
