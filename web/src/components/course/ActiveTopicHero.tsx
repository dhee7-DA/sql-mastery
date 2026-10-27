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
    { id: 'quiz', label: '2. Quick Quiz', icon: Brain, badge: topic.mcqs.length.toString() },
    { id: 'case', label: '3. Real Case', icon: Briefcase, badge: topic.caseStudy.company },
    { id: 'studio', label: '4. Query Studio', icon: Terminal, badge: topic.problem.difficulty },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0f1424]/90 to-[#090c14]/90 p-5 sm:p-6 backdrop-blur-xl shadow-bento">
      {/* Ambient background glow spot */}
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left: Topic Title & Meta */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500/20 to-indigo-500/20 border border-white/10 text-2xl shadow-sm">
            {topic.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-400">
                TOPIC {topic.seq}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {topic.execRank}
              </span>
            </div>
            <h1 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              {topic.title}
            </h1>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed">
              {topic.summary}
            </p>
          </div>
        </div>

        {/* Right: Progress Meter */}
        <div className="shrink-0 flex flex-col items-start md:items-end gap-1.5 border-t border-white/[0.08] pt-3 md:border-0 md:pt-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-slate-400">Curriculum Progress:</span>
            <span className="text-xs font-mono font-bold text-rose-400">
              {completedCount} / {totalTopics} Mastered ({progressPct}%)
            </span>
          </div>
          <div className="h-2 w-48 rounded-full bg-white/[0.06] overflow-hidden p-[1px]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-indigo-500 shadow-glow-rose"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* 4-Step Navigation Tabs with Framer Motion Sliding Pill */}
      <div className="relative z-10 mt-6 flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#07090e]/80 p-1.5 backdrop-blur-md overflow-x-auto scrollbar-none">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${
                isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeStepHeroPill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/[0.12] to-white/[0.06] border border-white/[0.18] shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <Icon className={`h-3.5 w-3.5 relative z-10 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
              <span className="relative z-10 font-sans">{step.label}</span>
              {step.badge && (
                <span className="relative z-10 rounded-full bg-white/[0.08] px-2 py-0.5 text-[9px] font-mono text-slate-300">
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
