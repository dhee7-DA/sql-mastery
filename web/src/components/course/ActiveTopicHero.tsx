'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Briefcase, Terminal } from 'lucide-react';
import { TopicPhase } from '@/data/masteryCourseData';

interface ActiveTopicHeroProps {
  topic: TopicPhase;
  activeStep: string;
  onSelectStep: (step: string) => void;
  completedCount: number;
  totalTopics: number;
}

export function ActiveTopicHero({
  topic,
  activeStep,
  onSelectStep,
  completedCount,
  totalTopics,
}: ActiveTopicHeroProps) {
  const progressPct = Math.round((completedCount / totalTopics) * 100);

  const steps = [
    { id: 'theory', label: '1. Learn & Visualize', icon: BookOpen },
    { id: 'quiz', label: '2. Concept Check', icon: Brain, badge: topic.mcqs.length.toString() },
    { id: 'case', label: '3. Incident Dossier', icon: Briefcase, badge: topic.caseStudy.company },
    { id: 'studio', label: '4. Relational Studio', icon: Terminal, badge: topic.problem.difficulty },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-panel">
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left: Topic Title & Meta */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted-surface text-2xl shadow-xs text-foreground">
            {topic.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-dark-background px-2.5 py-0.5 text-[10px] font-mono font-medium text-white">
                TOPIC {topic.seq}
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                {topic.execRank}
              </span>
            </div>
            <h1 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
              {topic.title}
            </h1>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {topic.summary}
            </p>
          </div>
        </div>

        {/* Right: Progress Meter */}
        <div className="shrink-0 flex flex-col items-start md:items-end gap-1.5 border-t border-border pt-3 md:border-0 md:pt-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-muted-foreground">Progress:</span>
            <span className="text-xs font-mono font-semibold text-foreground">
              {completedCount} / {totalTopics} Mastered ({progressPct}%)
            </span>
          </div>
          <div className="h-2 w-48 rounded-full bg-muted-surface border border-border overflow-hidden p-[1px]">
            <motion.div
              className="h-full rounded-full bg-dark-background"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* 4-Step Navigation Tabs with Framer Motion Sliding Pill */}
      <div className="relative z-10 mt-6 flex items-center gap-1.5 rounded-xl border border-border bg-muted-surface p-1.5 overflow-x-auto scrollbar-none">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeStepHeroPill"
                  className="absolute inset-0 rounded-lg bg-surface border border-border shadow-panel"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <Icon className={`h-3.5 w-3.5 relative z-10 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`} />
              <span className="relative z-10 font-sans">{step.label}</span>
              {step.badge && (
                <span className={`relative z-10 rounded-full px-2 py-0.5 text-[9px] font-mono ${
                  isActive ? 'bg-muted-surface text-foreground border border-border' : 'bg-surface/80 text-muted-foreground border border-border'
                }`}>
                  {step.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
