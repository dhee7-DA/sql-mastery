'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TopicPhase } from '@/data/masteryCourseData';

interface TopicRailProps {
  topics: TopicPhase[];
  activeTopicId: string;
  onSelectTopic: (id: string) => void;
  completedTopics: Set<string>;
}

export function TopicRail({ topics, activeTopicId, onSelectTopic, completedTopics }: TopicRailProps) {
  return (
    <div className="relative w-full rounded-xl border border-border/80 bg-muted-surface p-1.5 shadow-panel">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {topics.map((topic) => {
          const isActive = topic.id === activeTopicId;
          const isDone = completedTopics.has(topic.id);

          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={`group relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-surface text-foreground font-bold shadow-xs border border-border/90'
                  : isDone
                  ? 'text-emerald-700 hover:text-emerald-800'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {/* Sequence badge */}
              <span
                className={`flex size-4.5 items-center justify-center rounded text-[10px] font-mono font-bold ${
                  isActive
                    ? 'bg-foreground text-background'
                    : isDone
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-border/60 text-muted-foreground'
                }`}
              >
                {isDone ? <Check className="size-2.5 stroke-[3]" /> : topic.seq}
              </span>

              <span className="font-sans">{topic.shortName || topic.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
