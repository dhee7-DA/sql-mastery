'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { TopicRail } from '@/components/course/TopicRail';
import { ActiveTopicHero } from '@/components/course/ActiveTopicHero';
import { BentoTheoryStage } from '@/components/course/BentoTheoryStage';
import { StepQuiz } from '@/components/course/StepQuiz';
import { StepCase } from '@/components/course/StepCase';
import { StepStudio } from '@/components/course/StepStudio';
import { TOPIC_PHASES } from '@/data/masteryCourseData';
import { ArrowLeft, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [activeView, setActiveView] = useState<string>('course');
  const [activeTopicId, setActiveTopicId] = useState<string>('topic_01_select_from');
  const [activeStep, setActiveStep] = useState<string>('theory');
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  // Load completed topics safely on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sql_foundry_web_completed_topics');
      if (saved) {
        setCompletedTopics(new Set(JSON.parse(saved)));
      }
    } catch (e) {
      console.warn('Failed to load completed topics', e);
    }
  }, []);

  const activeTopic = TOPIC_PHASES.find((t) => t.id === activeTopicId) || TOPIC_PHASES[0];
  const activeTopicIndex = TOPIC_PHASES.findIndex((t) => t.id === activeTopic.id);

  const toggleTopicCompleted = () => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(activeTopic.id)) {
        next.delete(activeTopic.id);
      } else {
        next.add(activeTopic.id);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      try {
        localStorage.setItem('sql_foundry_web_completed_topics', JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
  };

  const handlePrevTopic = () => {
    if (activeTopicIndex > 0) {
      setActiveTopicId(TOPIC_PHASES[activeTopicIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextTopic = () => {
    if (activeTopicIndex < TOPIC_PHASES.length - 1) {
      setActiveTopicId(TOPIC_PHASES[activeTopicIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col font-sans selection:bg-rose-500/30">
      {/* 1. Global Navigation Dock */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Container */}
      <main className="relative flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Ambient Radial Mesh Glows (Cluster / Bugster style) */}
        <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-rose-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-36 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

        {/* 2. Topic Navigation Rail */}
        <section className="relative z-10">
          <TopicRail
            topics={TOPIC_PHASES}
            activeTopicId={activeTopicId}
            onSelectTopic={(id) => setActiveTopicId(id)}
            completedTopics={completedTopics}
          />
        </section>

        {/* 3. Active Topic Hero Card with Sliding Step Tabs */}
        <section className="relative z-10">
          <ActiveTopicHero
            topic={activeTopic}
            activeStep={activeStep}
            onSelectStep={(step) => setActiveStep(step)}
            completedCount={completedTopics.size}
            totalTopics={TOPIC_PHASES.length}
          />
        </section>

        {/* 4. Active Step Content Container */}
        <section className="relative z-10">
          {activeStep === 'theory' && <BentoTheoryStage topic={activeTopic} />}
          {activeStep === 'quiz' && <StepQuiz mcqs={activeTopic.mcqs} />}
          {activeStep === 'case' && (
            <StepCase
              caseStudy={activeTopic.caseStudy}
              onOpenStudio={() => setActiveStep('studio')}
            />
          )}
          {activeStep === 'studio' && (
            <StepStudio
              topic={activeTopic}
              onCompleteTier={() => {
                if (!completedTopics.has(activeTopic.id)) {
                  toggleTopicCompleted();
                }
              }}
            />
          )}
        </section>

        {/* 5. Bottom Navigation Bar */}
        <footer className="relative z-10 mt-6 flex items-center justify-between border-t border-white/[0.08] pt-6 pb-12">
          <button
            onClick={handlePrevTopic}
            disabled={activeTopicIndex === 0}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous Topic</span>
          </button>

          <button
            onClick={toggleTopicCompleted}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition-all shadow-sm ${
              completedTopics.has(activeTopic.id)
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                : 'border-rose-500/50 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>
              {completedTopics.has(activeTopic.id)
                ? '✓ Topic Mastered'
                : 'Mark Topic Complete'}
            </span>
          </button>

          <button
            onClick={handleNextTopic}
            disabled={activeTopicIndex === TOPIC_PHASES.length - 1}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
          >
            <span>Next Topic</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </footer>
      </main>
    </div>
  );
}
