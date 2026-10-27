'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';
import { TOPIC_PHASES, TopicPhase } from '@/data/masteryCourseData';
import { TopicRail } from '@/components/course/TopicRail';
import { ActiveTopicHero } from '@/components/course/ActiveTopicHero';
import { BentoTheoryStage } from '@/components/course/BentoTheoryStage';
import { StepQuiz } from '@/components/course/StepQuiz';
import { StepCase } from '@/components/course/StepCase';
import { StepStudio } from '@/components/course/StepStudio';
import confetti from 'canvas-confetti';

export function KobbeSectionCurriculum() {
  const [activeTopicId, setActiveTopicId] = useState<string>('topic_01_select_from');
  const [activeStep, setActiveStep] = useState<string>('theory');
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const activeTopic = TOPIC_PHASES.find((t) => t.id === activeTopicId) || TOPIC_PHASES[0];

  const handleToggleComplete = () => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(activeTopic.id)) {
        next.delete(activeTopic.id);
      } else {
        next.add(activeTopic.id);
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
      }
      return next;
    });
  };

  return (
    <section id="section-curriculum" className="py-20 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-12">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-2">
          <span className="text-foreground font-medium block mb-1">
            Complete Curriculum,
          </span>
          ten foundational phases and thirty production challenges without fluff.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Everything you need for SQL mastery, plus the parts others charge extra for
            </h2>
            <p className="text-base text-muted-foreground max-w-lg leading-relaxed text-pretty">
              Every phase includes an everyday metaphor, deep technical chapter, high-yield traps with corporate impact, FAANG spoken interview defense script, interactive quiz, real incident case study, and a 3-tier coding studio.
            </p>
          </div>
        </div>

        {/* Full-width Curriculum Workspace Container */}
        <div className="flex flex-col gap-6">
          {/* Topic Rail */}
          <TopicRail
            topics={TOPIC_PHASES}
            activeTopicId={activeTopicId}
            onSelectTopic={(id) => setActiveTopicId(id)}
            completedTopics={completedTopics}
          />

          {/* Active Topic Hero with 4 Step Tabs */}
          <ActiveTopicHero
            topic={activeTopic}
            activeStep={activeStep}
            onSelectStep={(step) => setActiveStep(step)}
            completedCount={completedTopics.size}
            totalTopics={TOPIC_PHASES.length}
          />

          {/* Active Step Workspace */}
          <div className="rounded-xl border border-border/80 bg-muted-surface p-4 sm:p-7 shadow-panel">
            {activeStep === 'theory' && <BentoTheoryStage topic={activeTopic} />}
            {activeStep === 'quiz' && (
              <StepQuiz
                mcqs={activeTopic.mcqs}
                topicName={activeTopic.title}
                onComplete={() => handleToggleComplete()}
              />
            )}
            {activeStep === 'case' && (
              <StepCase
                caseStudy={activeTopic.caseStudy}
                onOpenStudio={() => setActiveStep('studio')}
              />
            )}
            {activeStep === 'studio' && (
              <StepStudio
                topic={activeTopic}
                onCompleteTier={() => handleToggleComplete()}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
