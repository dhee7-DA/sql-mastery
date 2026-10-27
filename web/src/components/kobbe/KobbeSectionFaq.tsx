'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function KobbeSectionFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why does SQL execute FROM before SELECT?',
      a: 'Written SQL begins with SELECT for human readability, but a relational database engine must locate the relation in memory (FROM) and filter irrelevant records (WHERE) before it can project columns (SELECT). Because column aliases are created during the SELECT phase, they do not exist when WHERE evaluates.',
    },
    {
      q: 'Will this help me pass a FAANG technical SQL interview?',
      a: 'Yes. Technical interviews at Amazon, Google, Meta, and Netflix specifically test whether candidates understand why queries fail (e.g., using a WHERE clause on a column alias, or misuse of HAVING vs WHERE). Our curriculum includes verbatim spoken defense scripts for each topic.',
    },
    {
      q: 'How does the in-browser execution engine work?',
      a: 'SQL Foundry bundles a zero-latency SQLite WASM runtime compiled to run directly in your browser tab. Your queries execute locally against in-memory benchmark tables with zero server roundtrips, zero latency, and 100% privacy.',
    },
    {
      q: 'Do I need to create an account or provide a credit card?',
      a: 'No. The entire platform is 100% free and cookieless. There are no tracking scripts, no login walls, and no paywalls. Your progress is stored locally in your browser storage.',
    },
    {
      q: 'Can I export my progress or transfer it to another computer?',
      a: 'Yes. Under the Progress tab, you can click "Export JSON Backup" to download a lightweight JSON snapshot of all completed phases, quiz attempts, and solutions, and restore it on any device.',
    },
  ];

  return (
    <section id="section-faq" className="py-14 sm:py-18 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-8">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-xs sm:text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-1.5">
          <span className="text-foreground font-medium block mb-1">
            FAQ,
          </span>
          execution order, privacy, and technical screen preparation.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Questions, answered plainly
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed text-pretty">
              Everything about how queries execute, how data stays private, and why understanding execution order matters for senior software and data engineering roles.
            </p>
          </div>
        </div>

        {/* FAQ Accordion List (Kobbe Editorial Style with Smooth Height Animation) */}
        <div className="flex flex-col divide-y divide-border/70 border-y border-border/70">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-3.5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-left font-medium text-sm sm:text-base text-foreground hover:text-foreground/80 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground shrink-0 transition-transform duration-250 ease-out ${
                      isOpen ? 'rotate-180 text-foreground' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
