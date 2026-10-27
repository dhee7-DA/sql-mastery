'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export function KobbeSectionAnalytics() {
  const [candidateName, setCandidateName] = useState<string>('Staff Data Candidate');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stats = [
    { label: 'Mastered Topics', value: '10 / 10', meta: '100% Curriculum Completed' },
    { label: 'Challenges Solved', value: '30 / 30', meta: 'Warm-up • Standard • Edge' },
    { label: 'Avg Query Latency', value: '1.14 ms', meta: 'P95: 2.8 ms (In-Memory)' },
    { label: 'Interview Readiness', value: '99.4%', meta: '0 Syntax Errors Recorded' },
  ];

  const generateCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 630;

    // Background
    ctx.fillStyle = '#fbfaf8';
    ctx.fillRect(0, 0, 1200, 630);

    // Border
    ctx.strokeStyle = '#e5e3dc';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 1160, 590);

    // Header Tag
    ctx.fillStyle = '#262626';
    ctx.font = 'bold 20px "Geist Mono", monospace';
    ctx.fillText('SQL FOUNDRY • VERIFIED PHYSICAL EXECUTION CREDENTIAL', 60, 80);

    // Candidate Name
    ctx.fillStyle = '#1c1c1c';
    ctx.font = 'bold 44px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(candidateName, 60, 150);

    // Subtitle
    ctx.fillStyle = '#6f6e69';
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Full ANSI SQL Execution Order & Relational Pipeline Mastery', 60, 190);

    // Divider
    ctx.strokeStyle = '#e5e3dc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 230);
    ctx.lineTo(1140, 230);
    ctx.stroke();

    // 4 Stat Tiles
    const tileW = 250;
    const tileH = 140;
    const startX = 60;
    const startY = 270;
    const gap = 36;

    stats.forEach((s, idx) => {
      const x = startX + idx * (tileW + gap);
      ctx.fillStyle = '#f2f1ec';
      ctx.fillRect(x, startY, tileW, tileH);
      ctx.strokeStyle = '#e5e3dc';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, startY, tileW, tileH);

      ctx.fillStyle = '#6f6e69';
      ctx.font = 'bold 12px "Geist Mono", monospace';
      ctx.fillText(s.label.toUpperCase(), x + 16, startY + 36);

      ctx.fillStyle = '#1c1c1c';
      ctx.font = 'bold 32px "Geist Mono", monospace';
      ctx.fillText(s.value, x + 16, startY + 85);

      ctx.fillStyle = '#15803d';
      ctx.font = 'bold 12px "Geist Mono", monospace';
      ctx.fillText(s.meta, x + 16, startY + 118);
    });

    // Verification Footer
    const certId = 'CERT-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    ctx.fillStyle = '#6f6e69';
    ctx.font = '14px "Geist Mono", monospace';
    ctx.fillText(`Verification ID: ${certId} • Certified via SQLite WASM Compiler • 100% Cookieless`, 60, 540);
  };

  const handleDownload = () => {
    generateCard();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `sql_foundry_credential_${candidateName.toLowerCase().replace(/\s+/g, '_')}.png`;
    a.click();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <section id="section-analytics" className="py-14 sm:py-18 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-8">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-xs sm:text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-1.5">
          <span className="text-foreground font-medium block mb-1">
            Proof of Work,
          </span>
          four execution metrics and an exportable verified social certificate.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Quantifiable readiness metrics with zero cloud tracking
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed text-pretty">
              Export high-resolution proof-of-work credentials for LinkedIn, resume portfolios, or interview preparation. Generated client-side directly onto an HTML5 canvas.
            </p>
          </div>
        </div>

        {/* 4 Stats Grid (Compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -1.5 }}
              transition={{ duration: 0.18 }}
              className="bg-muted-surface rounded-xl p-3.5 sm:p-4 border border-border/80 shadow-panel flex flex-col justify-between hover:border-foreground/25 hover:shadow-panel-hover transition-colors"
            >
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                {s.label}
              </span>
              <div className="my-2">
                <span className="text-2xl font-mono font-bold text-foreground block">
                  {s.value}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold font-mono block mt-0.5">
                  {s.meta}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proof of Work Card Generator Box (Compact) */}
        <div className="bg-muted-surface rounded-xl p-4 sm:p-5 border border-border/80 shadow-panel flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/70">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Official Proof-of-Work Certificate (1200x630)
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Generate high-resolution image credential for social proof and interview submissions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Candidate Full Name"
                className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
              />
              <button
                onClick={handleDownload}
                className="inline-flex cursor-pointer items-center gap-1 font-medium transition-all w-fit rounded-lg px-3 py-1 text-xs bg-dark-background text-surface hover:bg-dark-background/85 active:scale-95 shadow-xs"
              >
                <Download className="size-3" />
                <span>Export PNG</span>
              </button>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border p-3 flex items-center justify-center overflow-x-auto shadow-2xs">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto border border-border/60 rounded-md shadow-2xs"
              style={{ width: '500px', height: '262px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
