'use client';

import React, { useState } from 'react';
import { KobbeNavbar } from '@/components/kobbe/KobbeNavbar';
import { KobbeHero } from '@/components/kobbe/KobbeHero';
import { KobbeSectionExecution } from '@/components/kobbe/KobbeSectionExecution';
import { KobbeSectionDiff } from '@/components/kobbe/KobbeSectionDiff';
import { KobbeSectionWasm } from '@/components/kobbe/KobbeSectionWasm';
import { KobbeSectionStack } from '@/components/kobbe/KobbeSectionStack';
import { KobbeSectionCurriculum } from '@/components/kobbe/KobbeSectionCurriculum';
import { KobbeSectionAnalytics } from '@/components/kobbe/KobbeSectionAnalytics';
import { KobbeSectionFaq } from '@/components/kobbe/KobbeSectionFaq';
import { KobbeFooter } from '@/components/kobbe/KobbeFooter';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('course');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'course') scrollTo('section-curriculum');
    if (tab === 'pipeline') scrollTo('section-pipeline');
    if (tab === 'diff') scrollTo('section-diff');
    if (tab === 'studio') scrollTo('section-studio');
    if (tab === 'faq') scrollTo('section-faq');
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col font-sans selection:bg-foreground/10">
      <KobbeNavbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenHotkeys={() => scrollTo('section-curriculum')}
        onOpenAnalytics={() => scrollTo('section-analytics')}
      />

      <main className="flex-1 flex flex-col">
        {/* Section 0: Kobbe Hero with Live Pipeline Stepper */}
        <KobbeHero
          onStartCourse={() => scrollTo('section-curriculum')}
          onOpenStudio={() => scrollTo('section-studio')}
        />

        {/* Section 1: Execution Pipeline Reordering Challenge */}
        <KobbeSectionExecution />

        {/* Section 2: 3-Way Relational Visual Diff */}
        <KobbeSectionDiff />

        {/* Section 3: In-Browser SQLite WASM Compiler */}
        <KobbeSectionWasm />

        {/* Section 4: Dialects, LeetCode 323 & FAANG Stack */}
        <KobbeSectionStack />

        {/* Section 5: The Full 10-Topic Interactive Curriculum */}
        <KobbeSectionCurriculum />

        {/* Section 6: Proof-of-Work Metrics & 1200x630 Credential */}
        <KobbeSectionAnalytics />

        {/* Section 7: Questions, answered plainly (FAQ) */}
        <KobbeSectionFaq />
      </main>

      <KobbeFooter />
    </div>
  );
}
