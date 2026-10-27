'use client';

import React from 'react';
import { ArrowUpRight, Code2, Award, Terminal, ShieldCheck } from 'lucide-react';

export function KobbeSectionStack() {
  const cards = [
    {
      title: 'One dialect standard',
      description: 'ANSI SQL, MySQL 8.0, PostgreSQL, and SQLite. CTEs, Window Functions, and multi-relation joins execute identically.',
      meta: '4 Dialects Supported',
      icon: Code2,
      link: '#section-curriculum',
      linkText: 'Explore topics',
    },
    {
      title: '323 Curated Problems',
      description: 'Tiered challenges from foundational SELECT projections to advanced Window Function lead/lag offset ranking.',
      meta: 'Warm-up • Standard • Edge Cases',
      icon: Award,
      link: '#section-curriculum',
      linkText: 'View problem tiers',
    },
    {
      title: 'Real FAANG Screening Scripts',
      description: 'Word-for-word spoken defense scripts tested in L4–L6 technical screens at Amazon, Google, Meta, and Netflix.',
      meta: 'Spoken Scripts & Gotchas',
      icon: Terminal,
      link: '#section-curriculum',
      linkText: 'Read interview defenses',
    },
    {
      title: 'Cookieless & Local Sync',
      description: 'Zero tracking cookies, zero analytics beacons. Save your progress in offline JSON snapshots or restore with one click.',
      meta: '100% Client-Side Privacy',
      icon: ShieldCheck,
      link: '#section-curriculum',
      linkText: 'Learn about offline storage',
    },
  ];

  return (
    <section className="py-20 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-12">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-2">
          <span className="text-foreground font-medium block mb-1">
            Dialects & Standards,
          </span>
          works with MySQL 8.0, PostgreSQL, and the companies you are interviewing for.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Built for production queries and high-stakes technical screens
            </h2>
            <p className="text-base text-muted-foreground max-w-lg leading-relaxed text-pretty">
              Whether you are preparing for a Staff Data Engineer technical screen or verifying query execution plans, SQL Foundry provides the exact mental model needed.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid (Kobbe.io Asymmetric / Bento Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-muted-surface relative flex flex-col justify-between rounded-xl p-5 sm:p-6 border border-border/80 shadow-panel transition-all hover:border-foreground/30"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground shadow-xs">
                    <Icon className="size-4.5" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider block">
                      {card.meta}
                    </span>
                    <h3 className="text-base font-medium text-foreground mt-0.5">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <a
                  href={card.link}
                  className="text-foreground inline-flex items-center gap-1 text-xs font-medium leading-tight mt-6 group pt-3 border-t border-border/60"
                >
                  <span>{card.linkText}</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
