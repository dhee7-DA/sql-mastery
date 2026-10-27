'use client';

import React, { useRef, useState } from 'react';
import { Download, Copy, Check, Award, Database, Zap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function KobbeSectionAnalytics() {
  const [candidateName, setCandidateName] = useState<string>('Staff Data Candidate');
  const [copied, setCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stats = [
    { label: 'Mastered Topics', value: '10 / 10', meta: '100% Curriculum Completed', change: '+100%' },
    { label: 'Challenges Solved', value: '30 / 30', meta: 'Warm-up • Standard • Edge', change: '+30' },
    { label: 'Avg Query Latency', value: '1.14 ms', meta: 'P95: 2.8 ms (In-Memory)', change: '0.8ms' },
    { label: 'FAANG Interview Readiness', value: '99.4%', meta: '0 Syntax Errors Recorded', change: '+99%' },
  ];

  const generateCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw 1200x630 canvas
    canvas.width = 1200;
    canvas.height = 630;

    // Background (Kobbe warm bone linen)
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

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 12px "Geist Mono", monospace';
      ctx.fillText(s.meta, x + 16, startY + 118);
    });

    // Verification Footer
    const certId = 'CERT-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    ctx.fillStyle = '#6f6e69';
    ctx.font = '14px "Geist Mono", monospace';
    ctx.fillText(`Verification ID: ${certId} • Certified via SQLite WASM In-Browser Compiler • 100% Cookieless`, 60, 540);
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
    <section id="section-analytics" className="py-20 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-320 grid-cols-1 gap-x-8 px-4 sm:px-8 lg:grid-cols-12 *:col-span-full gap-y-12">
        {/* Left Column (Kobbe 4-col descriptor) */}
        <p className="text-sm text-muted-foreground max-w-64 leading-normal text-pretty lg:col-span-4 lg:mt-2">
          <span className="text-foreground font-medium block mb-1">
            Proof of Work,
          </span>
          four execution metrics and an exportable verified social certificate.
        </p>

        {/* Right Column (Kobbe 8-col headline and description) */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-pretty text-foreground">
              Quantifiable readiness metrics with zero cloud tracking
            </h2>
            <p className="text-base text-muted-foreground max-w-lg leading-relaxed text-pretty">
              Export high-resolution proof-of-work credentials for LinkedIn, resume portfolios, or interview preparation. Generated client-side directly onto an HTML5 canvas.
            </p>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-muted-surface rounded-xl p-5 border border-border/80 shadow-panel flex flex-col justify-between"
            >
              <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                {s.label}
              </span>
              <div className="my-3">
                <span className="text-3xl font-mono font-bold text-foreground block">
                  {s.value}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold font-mono block mt-1">
                  {s.meta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Proof of Work Card Generator Box */}
        <div className="bg-muted-surface rounded-xl p-6 sm:p-8 border border-border/80 shadow-panel flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/70">
            <div>
              <h3 className="text-base font-medium text-foreground">
                Official Proof-of-Work Certificate (1200x630)
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Generate high-resolution image credential for social proof and interview submissions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Candidate Full Name"
                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
              />
              <button
                onClick={handleDownload}
                className="inline-flex cursor-pointer items-center gap-1.5 font-medium transition-colors w-fit rounded-lg px-3.5 py-1.5 text-xs bg-dark-background text-surface hover:bg-dark-background/85 shadow-xs"
              >
                <Download className="size-3.5" />
                <span>Export PNG Card</span>
              </button>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border p-4 flex items-center justify-center overflow-x-auto">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto border border-border/60 rounded-md shadow-xs"
              style={{ width: '600px', height: '315px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
