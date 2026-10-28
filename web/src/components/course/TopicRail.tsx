'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TopicPhase } from '@/data/masteryCourseData';
import { SqlKeywordText } from '@/components/common/SqlKeywordText';

interface TopicRailProps {
  topics: TopicPhase[];
  activeTopicId: string;
  onSelectTopic: (id: string) => void;
  completedTopics: Set<string>;
}

export function TopicRail({ topics, activeTopicId, onSelectTopic, completedTopics }: TopicRailProps) {
  return (
    <div className="relative w-full rounded-xl border border-border/80 bg-muted-surface p-1 shadow-panel">
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
        {topics.map((topic) => {
          const isActive = topic.id === activeTopicId;
          const isDone = completedTopics.has(topic.id);

          return (
            <motion.button
              key={topic.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTopic(topic.id)}
              className={`relative flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                isActive
                  ? 'text-foreground font-semibold'
                  : isDone
                  ? 'text-emerald-700 hover:text-emerald-800'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTopicRailPill"
                  className="absolute inset-0 rounded-lg bg-surface border border-border shadow-xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}

              {/* Sequence badge */}
              <span
                className={`relative z-10 flex size-4 items-center justify-center rounded text-[9px] font-mono font-bold ${
                  isActive
                    ? 'bg-foreground text-background'
                    : isDone
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-border/60 text-muted-foreground'
                }`}
              >
                {isDone ? <Check className="size-2.5 stroke-[3]" /> : topic.seq}
              </span>

              <span className="relative z-10 font-sans text-xs">
                <SqlKeywordText text={topic.title} />
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
