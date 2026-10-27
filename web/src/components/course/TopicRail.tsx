'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { TopicPhase } from '@/data/masteryCourseData';

interface TopicRailProps {
  topics: TopicPhase[];
  activeTopicId: string;
  onSelectTopic: (id: string) => void;
  completedTopics: Set<string>;
}

export function TopicRail({ topics, activeTopicId, onSelectTopic, completedTopics }: TopicRailProps) {
  return (
    <div className="relative w-full rounded-2xl border border-white/[0.08] bg-[#0c101a]/70 p-2 backdrop-blur-xl shadow-bento">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {topics.map((topic, idx) => {
          const isActive = topic.id === activeTopicId;
          const isDone = completedTopics.has(topic.id);

          return (
            <React.Fragment key={topic.id}>
              <button
                onClick={() => onSelectTopic(topic.id)}
                className={`group relative flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? 'text-white font-bold'
                    : isDone
                    ? 'text-emerald-400/90 hover:text-emerald-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTopicRailPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/25 via-indigo-500/25 to-rose-500/20 border border-rose-500/40 shadow-glow-rose"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}

                {/* Sequence badge */}
                <span
                  className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-mono font-bold ${
                    isActive
                      ? 'bg-rose-500 text-white'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {isDone ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : topic.seq}
                </span>

                {/* Title */}
                <span className="relative z-10 font-sans">{topic.shortName}</span>

                {/* Star indicator for active */}
                {isActive && (
                  <Sparkles className="h-3 w-3 relative z-10 text-rose-400 animate-pulse" />
                )}
              </button>

              {idx < topics.length - 1 && (
                <span className="text-slate-600 text-xs select-none px-0.5">›</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
