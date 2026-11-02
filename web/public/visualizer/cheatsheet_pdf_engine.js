/**
 * =============================================================================
 * SQL FOUNDRY: CHEATSHEET & ENCYCLOPEDIA PDF COMPILER ENGINE
 * =============================================================================
 * Generates standalone, publication-quality 6-page printable PDF reference
 * chapters with tactile vector SVGs, Amazon/JPMorgan schemas, code progressions,
 * engine EXPLAIN trees, cross-dialect matrices, LeetCode solvers, and 8 MCQs.
 * =============================================================================
 */

(function() {
  'use strict';

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Topic ID to Keyword ID mapping across 10 curriculum phases
  const TOPIC_TO_KEYWORD_MAP = {
    'topic_01_select_from': 'select',
    'topic_02_where': 'where',
    'topic_03_order_limit': 'order-by',
    'topic_04_aggregates': 'group-by',
    'topic_05_groupby_having': 'having',
    'topic_06_joins': 'joins',
    'topic_07_adv_joins_union': 'union',
    'topic_08_case_when': 'casewhen',
    'topic_09_ctes': 'cte',
    'topic_10_window_functions': 'window-functions'
  };

  /**
   * Generates the tactile End-of-Section Cheatsheet Download Banner
   */
  function renderDownloadBanner(topicOrKeywordId) {
    const keywordId = TOPIC_TO_KEYWORD_MAP[topicOrKeywordId] || topicOrKeywordId || 'select';
    const kw = (window.KeywordEncyclopedia && window.KeywordEncyclopedia.getKeyword(keywordId)) || {
      id: keywordId,
      keyword: keywordId.toUpperCase(),
      title: 'Architectural Cheatsheet & Chapter Dossier',
      tagline: 'Complete 6-Page Reference Manual with ANSI Semantics, Schemas & MCQs'
    };

    const previewCode = (kw.codePatterns && kw.codePatterns.foundational && kw.codePatterns.foundational.sql) || 
      `SELECT col FROM table WHERE condition;`;

    return `
      <div class="cheatsheet-download-banner avoid-break" id="cheatsheet-banner-${escapeHtml(kw.id)}">
        <div class="cheatsheet-banner-left">
          <div class="cheatsheet-banner-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span>OFFICIAL REFERENCE &bull; 13-PILLAR MASTER DOSSIER</span>
          </div>
          <h4 class="cheatsheet-banner-title">Download ${escapeHtml(kw.keyword)} Reference Manual (PDF)</h4>
          <p class="cheatsheet-banner-desc">
            Complete high-resolution 6-page companion book chapter containing ANSI grammar, relational algebra &amp; 3VL, database engine internals &amp; EXPLAIN plan, vector SVG diagram, Amazon &amp; JPMorgan DDL, 4-tier query progression, 6-dialect matrix, LeetCode algorithmic solvers, FAANG technical interview defenses, and 8 conceptual certification MCQs.
          </p>
          <div class="cheatsheet-banner-actions">
            <button class="cheatsheet-dl-btn primary" onclick="window.CheatsheetPdfEngine.downloadPdf('${escapeHtml(kw.id)}', 'dark')" title="Download High-Contrast Screen-Optimized PDF">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download Chapter (Midnight Dark)</span>
            </button>
            <button class="cheatsheet-dl-btn secondary" onclick="window.CheatsheetPdfEngine.downloadPdf('${escapeHtml(kw.id)}', 'print')" title="Download High-DPI Ink-Efficient White Paper PDF">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><path d="M6 14h12v8H6z"></path></svg>
              <span>Print Paper Edition</span>
            </button>
          </div>
        </div>

        <div class="cheatsheet-banner-preview">
          <div class="cheatsheet-mini-card">
            <div class="mini-card-header">${escapeHtml(kw.keyword)} // ANSI SPEC</div>
            <div class="mini-card-body">${escapeHtml(previewCode.split('\n').slice(0, 4).join('\n'))}</div>
            <div class="mini-card-footer">6-PAGE BOOK &bull; VECTOR SVG &bull; 8 MCQS</div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Generates the complete HTML markup for a 6-Page Keyword Master Reference Book Chapter
   */
  function generateCheatsheetHtml(kw, edition) {
    const isDark = edition !== 'print';
    const diagType = kw.svgDiagramType || 'projection';
    
    // Render SVG if engine is available
    let svgHtml = '';
    try {
      if (window.MasterySvgEngine && typeof window.MasterySvgEngine.render === 'function') {
        svgHtml = window.MasterySvgEngine.render({ svgDiagram: { type: diagType } }, 0);
      }
    } catch (e) {
      console.warn('Could not generate SVG for cheatsheet:', e);
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SQL Foundry Master Reference - ${escapeHtml(kw.keyword)}</title>
  <link rel="stylesheet" href="cheatsheet_book.css">
  <style>
    body {
      margin: 0;
      padding: 0;
      background: ${isDark ? '#09090b' : '#ffffff'};
      color: ${isDark ? '#f4f4f5' : '#09090b'};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
  </style>
</head>
<body>
  <div class="cheatsheet-pdf-document ${isDark ? 'edition-dark' : 'edition-print'}">
    
    <!-- =========================================================================
         PAGE 1: FOUNDATIONS, GRAMMAR & ENGINE MECHANICS
         ========================================================================= -->
    <div class="cheatsheet-page">
      <div class="pdf-header-strip">
        <div>
          <div class="pdf-keyword-badge">${escapeHtml(kw.keyword)}</div>
          <div style="font-size: 13px; font-weight: 600; margin-top: 2px;">${escapeHtml(kw.title)}</div>
        </div>
        <div class="pdf-header-meta">
          <div>SQL FOUNDRY // RELATIONAL OPERATING SYSTEM</div>
          <div>${escapeHtml(kw.executionPhase)}</div>
          <div>MODULE: ${escapeHtml(kw.module.toUpperCase())} &bull; PAGE 1 OF 6</div>
        </div>
      </div>

      <!-- Pillar 1: ANSI Syntax & Grammar Specification -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">1. ANSI Syntax &amp; Formal Grammar Specification (EBNF)</div>
        <pre class="pdf-code-box">${escapeHtml(kw.ansiSyntax)}</pre>
        <div class="pdf-pillar-body">${escapeHtml(kw.summary)}</div>
      </div>

      <!-- Pillar 2: Formal Relational Algebra & 3VL Truth Semantics -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">2. Relational Algebra Formulation &amp; 3-Valued Logic (3VL)</div>
        <div class="pdf-math-box">
          <div style="font-weight: 700; margin-bottom: 2px;">Relational Operator: ${escapeHtml(kw.relationalAlgebra.operator)}</div>
          <div style="font-size: 11px; margin-bottom: 4px;"><code>${escapeHtml(kw.relationalAlgebra.formula)}</code></div>
        </div>
        <div class="pdf-pillar-body">
          <p style="margin: 0 0 4px 0;"><strong>Multiset (Bag) Semantics:</strong> ${escapeHtml(kw.relationalAlgebra.bagSemantics)}</p>
          <p style="margin: 0;"><strong>Kleene's 3-Valued Logic:</strong> ${escapeHtml(kw.relationalAlgebra.threeValuedLogic)}</p>
        </div>
      </div>

      <!-- Pillar 3: Database Engine Internals & Storage Footprint -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">3. Database Engine Internals &amp; Storage Footprint</div>
        <div class="pdf-pillar-body">
          <p style="margin: 0 0 3px 0;"><strong>Physical Operator:</strong> ${escapeHtml(kw.engineInternals.operatorType)}</p>
          <p style="margin: 0 0 3px 0;"><strong>Memory Footprint:</strong> ${escapeHtml(kw.engineInternals.memoryFootprint)}</p>
          <p style="margin: 0 0 3px 0;"><strong>Disk Spill Risk:</strong> ${escapeHtml(kw.engineInternals.diskSpillRisk)}</p>
          <p style="margin: 0 0 3px 0;"><strong>Index SARGability:</strong> ${escapeHtml(kw.engineInternals.indexInteraction)}</p>
          <p style="margin: 0 0 5px 0;"><strong>Buffer Allocation:</strong> ${escapeHtml(kw.engineInternals.bufferConfig)}</p>
        </div>
        <div style="font-size: 10px; font-weight: 700; color: #a1a1aa; margin-top: 4px;">Physical EXPLAIN FORMAT=TREE Plan:</div>
        <pre class="pdf-explain-tree">${escapeHtml(kw.engineInternals.explainTree)}</pre>
      </div>
    </div>

    <!-- =========================================================================
         PAGE 2: VECTOR ARCHITECTURE DIAGRAM & DUAL-TRACK DDL SCHEMAS
         ========================================================================= -->
    <div class="cheatsheet-page">
      <div class="pdf-header-strip">
        <div>
          <div class="pdf-keyword-badge" style="font-size: 20px;">${escapeHtml(kw.keyword)} // TUPLE LIFECYCLE &amp; SCHEMAS</div>
        </div>
        <div class="pdf-header-meta">
          <div>VECTOR TOPOLOGY &bull; DUAL-TRACK DDL</div>
          <div>PAGE 2 OF 6</div>
        </div>
      </div>

      <!-- Pillar 4: Tactile Architectural Vector SVG Explainer Diagram -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">4. Relational Architecture Diagram (Topological Tuple Flow)</div>
        <div style="width: 100%; overflow: hidden; border-radius: 6px; margin: 4px 0 0 0;">
          ${svgHtml}
        </div>
      </div>

      <!-- Pillar 5: Dual-Track Production DDL & Schemas -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">5. Dual-Track Production DDL (Amazon SCOT &amp; JPMorgan CIB)</div>
        <pre class="pdf-code-box" style="font-size: 9px; max-height: 125px; overflow-y: auto;">${escapeHtml(kw.schemas.ddl)}</pre>
        
        <!-- Input & Output Tables -->
        <div class="pdf-schema-grid">
          <div>
            <p style="margin: 0 0 3px 0; font-size: 9.5px; font-weight: 700;">Input: ${escapeHtml(kw.schemas.inputTable.name)}</p>
            <table class="pdf-table">
              <thead>
                <tr>${kw.schemas.inputTable.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${kw.schemas.inputTable.sampleRows.slice(0, 4).map(r => `<tr>${r.map(v => `<td>${escapeHtml(v)}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div>
            <p style="margin: 0 0 3px 0; font-size: 9.5px; font-weight: 700;">Emitted Output: ${escapeHtml(kw.schemas.outputTable.name)}</p>
            <table class="pdf-table">
              <thead>
                <tr>${kw.schemas.outputTable.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${kw.schemas.outputTable.sampleRows.slice(0, 4).map(r => `<tr>${r.map(v => `<td>${escapeHtml(v)}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Column Dictionary -->
        <div style="font-size: 9.5px; font-weight: 700; color: #a1a1aa; margin: 6px 0 2px 0;">Relational Attribute Dictionary:</div>
        <div style="font-size: 9.5px; color: ${isDark ? '#d4d4d8' : '#334155'}; line-height: 1.45;">
          ${kw.schemas.columnDictionary.map(cd => `
            <div><strong>${escapeHtml(cd.column)}</strong> (${escapeHtml(cd.type)}): ${escapeHtml(cd.desc)}</div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- =========================================================================
         PAGE 3: 4-TIER QUERY PROGRESSION & SCALE BENCHMARKS
         ========================================================================= -->
    <div class="cheatsheet-page">
      <div class="pdf-header-strip">
        <div>
          <div class="pdf-keyword-badge" style="font-size: 20px;">${escapeHtml(kw.keyword)} // QUERY PATTERNS &amp; BENCHMARKS</div>
        </div>
        <div class="pdf-header-meta">
          <div>PROGRESSIVE CODING &bull; EXPLAIN COMPARISON</div>
          <div>PAGE 3 OF 6</div>
        </div>
      </div>

      <!-- Pillar 6: 4-Tier Progressive Query Patterns -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">6. 4-Tier Progressive Query Implementations</div>
        
        <p style="margin: 3px 0; font-size: 10px; font-weight: 700;">Level 1 (Foundational): ${escapeHtml(kw.codePatterns.foundational.title)}</p>
        <pre class="pdf-code-box" style="font-size: 9.5px;">${escapeHtml(kw.codePatterns.foundational.sql)}</pre>

        <p style="margin: 6px 0 3px 0; font-size: 10px; font-weight: 700;">Level 2 (Defensive Intermediate): ${escapeHtml(kw.codePatterns.intermediate.title)}</p>
        <pre class="pdf-code-box" style="font-size: 9.5px;">${escapeHtml(kw.codePatterns.intermediate.sql)}</pre>

        <p style="margin: 6px 0 3px 0; font-size: 10px; font-weight: 700;">Level 3 (Advanced CTE Composition): ${escapeHtml(kw.codePatterns.advanced.title)}</p>
        <pre class="pdf-code-box" style="font-size: 9.5px;">${escapeHtml(kw.codePatterns.advanced.sql)}</pre>

        <p style="margin: 6px 0 3px 0; font-size: 10px; font-weight: 700;">Level 4 (Scale Optimization): ${escapeHtml(kw.codePatterns.scaleOptimization.title)}</p>
        <pre class="pdf-code-box" style="font-size: 9.5px;">${escapeHtml(kw.codePatterns.scaleOptimization.sql)}</pre>
      </div>

      <!-- Pillar 7: High-Volume Scale Optimization & Side-by-Side Benchmarks -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">7. High-Volume Scale Optimization &amp; EXPLAIN Benchmark</div>
        <div class="pdf-compare-grid">
          <div class="pdf-compare-col bad">
            <div style="font-size: 10px; font-weight: 700; color: #f43f5e; margin-bottom: 3px;">Anti-Pattern Implementation</div>
            <pre class="pdf-code-box" style="font-size: 9px;">${escapeHtml(kw.optimizationComparison.antiPatternSql)}</pre>
            <div style="font-size: 9.5px; color: ${isDark ? '#d4d4d8' : '#475569'}; line-height: 1.4;">${escapeHtml(kw.optimizationComparison.antiPatternExplain)}</div>
          </div>
          <div class="pdf-compare-col good">
            <div style="font-size: 10px; font-weight: 700; color: #10b981; margin-bottom: 3px;">Index-Optimized Pattern</div>
            <pre class="pdf-code-box" style="font-size: 9px;">${escapeHtml(kw.optimizationComparison.optimizedSql)}</pre>
            <div style="font-size: 9.5px; color: ${isDark ? '#d4d4d8' : '#475569'}; line-height: 1.4;">${escapeHtml(kw.optimizationComparison.optimizedExplain)}</div>
          </div>
        </div>
        <div style="margin-top: 6px; padding: 6px 10px; border-radius: 4px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); font-size: 10px; color: #34d399; font-weight: 600;">
          Measured Speedup: ${escapeHtml(kw.optimizationComparison.speedupFactor)}
        </div>
      </div>
    </div>

    <!-- =========================================================================
         PAGE 4: 6-DIALECT MATRIX & REAL-WORLD POST-MORTEM
         ========================================================================= -->
    <div class="cheatsheet-page">
      <div class="pdf-header-strip">
        <div>
          <div class="pdf-keyword-badge" style="font-size: 20px;">${escapeHtml(kw.keyword)} // CROSS-DIALECT &amp; POST-MORTEM</div>
        </div>
        <div class="pdf-header-meta">
          <div>6 ENGINES &bull; PRODUCTION INCIDENT RCA</div>
          <div>PAGE 4 OF 6</div>
        </div>
      </div>

      <!-- Pillar 8: 6-Database Cross-Dialect Matrix -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">8. 6-Database Engine Cross-Dialect Compatibility Matrix</div>
        <table class="pdf-dialect-table">
          <thead>
            <tr>
              <th style="width: 28%;">Database Engine / Dialect</th>
              <th style="width: 72%;">Engine Behavior, Dialect Nuances &amp; Optimizer Support</th>
            </tr>
          </thead>
          <tbody>
            ${kw.crossDialect.map(d => `
              <tr>
                <td><strong>${escapeHtml(d.dialect)}</strong></td>
                <td>${escapeHtml(d.behavior)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Pillar 9: Production Enterprise Incident Post-Mortem -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">9. Production Enterprise Incident Post-Mortem (Root Cause Analysis)</div>
        <div class="pdf-pillar-body">
          <p style="margin: 0 0 5px 0;"><strong>Engineering Organization:</strong> ${escapeHtml(kw.caseStudy.company)}</p>
          <p style="margin: 0 0 5px 0;"><strong>Incident Scenario:</strong> ${escapeHtml(kw.caseStudy.scenario)}</p>
          <p style="margin: 0 0 6px 0;"><strong>Bottleneck &amp; Root Cause:</strong> ${escapeHtml(kw.caseStudy.bottleneck)}</p>
          <div style="font-size: 9.5px; font-weight: 700; color: #a1a1aa; margin-bottom: 2px;">Remediated Production Query:</div>
          <pre class="pdf-code-box" style="font-size: 9.5px;">${escapeHtml(kw.caseStudy.solutionSql)}</pre>
          <div style="margin-top: 4px; padding: 6px 10px; border-radius: 4px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.25); font-size: 10px; color: #60a5fa;">
            <strong>Quantified Impact:</strong> ${escapeHtml(kw.caseStudy.impact)}
          </div>
        </div>
      </div>
    </div>

    <!-- =========================================================================
         PAGE 5: LEETCODE SOLVERS & SENIOR INTERVIEW DEFENSES
         ========================================================================= -->
    <div class="cheatsheet-page">
      <div class="pdf-header-strip">
        <div>
          <div class="pdf-keyword-badge" style="font-size: 20px;">${escapeHtml(kw.keyword)} // LEETCODE &amp; INTERVIEW DEFENSE</div>
        </div>
        <div class="pdf-header-meta">
          <div>ALGORITHMIC SQL &bull; STAFF-LEVEL Q&amp;A</div>
          <div>PAGE 5 OF 6</div>
        </div>
      </div>

      <!-- Pillar 10: Curated LeetCode Algorithmic Solvers -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">10. Curated LeetCode Algorithmic Solvers</div>
        ${kw.leetCodeProblems.map(lp => `
          <div class="pdf-leetcode-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <div>
                <strong style="font-size:11px;">LeetCode #${escapeHtml(lp.number)}: ${escapeHtml(lp.title)}</strong>
              </div>
              <span class="pdf-lc-badge ${lp.difficulty.toLowerCase()}">${escapeHtml(lp.difficulty)}</span>
            </div>
            <div style="font-size:9.5px; color:${isDark ? '#a1a1aa' : '#475569'}; margin-bottom:4px; line-height:1.4;">
              ${escapeHtml(lp.prompt)}
            </div>
            <pre class="pdf-code-box" style="font-size:9.5px;">${escapeHtml(lp.solutionSql)}</pre>
            <div style="font-size:9px; color:#10b981; font-family:'JetBrains Mono', monospace;">
              Proof: ${escapeHtml(lp.complexityProof)}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Pillar 11: FAANG & Wall Street Senior/Staff Technical Interview Defense -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">11. FAANG &amp; Wall Street Senior/Staff Technical Interview Defense</div>
        ${kw.interviewQuestions.map((q, idx) => `
          <div style="margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.08);">
            <div style="font-size: 10px; font-weight: 700; color: #a1a1aa; margin-bottom: 2px;">
              [${escapeHtml(q.company)}] Question ${idx + 1}:
            </div>
            <div style="font-size: 10.5px; font-weight: 600; margin-bottom: 3px;">${escapeHtml(q.question)}</div>
            <div style="font-size: 10px; color: ${isDark ? '#d4d4d8' : '#334155'}; line-height: 1.45;">
              <strong>Model Answer:</strong> ${escapeHtml(q.answer)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- =========================================================================
         PAGE 6: TRAPS, PITFALLS & 8 CERTIFICATION MCQS
         ========================================================================= -->
    <div class="cheatsheet-page">
      <div class="pdf-header-strip">
        <div>
          <div class="pdf-keyword-badge" style="font-size: 20px;">${escapeHtml(kw.keyword)} // TRAPS &amp; CERTIFICATION AUDIT</div>
        </div>
        <div class="pdf-header-meta">
          <div>HIGH-YIELD BUGS &bull; 8 RIGOROUS MCQS</div>
          <div>PAGE 6 OF 6</div>
        </div>
      </div>

      <!-- Pillar 12: High-Yield Corporate Pitfalls & Anti-Patterns -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">12. High-Yield Corporate Pitfalls &amp; Anti-Patterns</div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          ${kw.pitfalls.map(p => `
            <div style="background: ${isDark ? '#141418' : '#f8fafc'}; border: 1px solid rgba(255,255,255,0.08); border-radius: 5px; padding: 8px;">
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:3px;">
                <span style="font-size:8.5px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(225,29,72,0.15); color:#f43f5e;">${escapeHtml(p.severity)}</span>
                <strong style="font-size: 10px;">${escapeHtml(p.title)}</strong>
              </div>
              <div style="font-size: 9.5px; color: ${isDark ? '#a1a1aa' : '#475569'}; line-height: 1.4;">${escapeHtml(p.description)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Pillar 13: Comprehensive Conceptual Examination (8 Rigorous MCQs) -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">13. Certification &amp; Conceptual Mastery Examination (8 Rigorous MCQs)</div>
        <div class="pdf-mcq-grid">
          ${kw.mcqs.map((m, i) => `
            <div class="pdf-mcq-item">
              <div class="pdf-mcq-question">${i + 1}. ${escapeHtml(m.question)}</div>
              ${m.options.map(opt => `<div class="pdf-mcq-option">${escapeHtml(opt)}</div>`).join('')}
              <div class="pdf-mcq-answer">
                <strong>Correct: ${escapeHtml(m.correct)}</strong> &bull; <em>${escapeHtml(m.rationale)}</em>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

  </div>
</body>
</html>`;
  }

  /**
   * Client-side trigger to compile or download the standalone PDF
   */
  function downloadPdf(topicOrKeywordId, edition) {
    const keywordId = TOPIC_TO_KEYWORD_MAP[topicOrKeywordId] || topicOrKeywordId || 'select';
    const editionMode = edition === 'print' ? 'PRINT' : 'DARK';
    const pdfUrl = `/pdf/cheatsheets/SQL_Cheatsheet_${keywordId.toUpperCase()}_${editionMode}.pdf`;

    // Try downloading the pre-compiled static PDF first
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `SQL_Foundry_${keywordId.toUpperCase()}_Reference_${editionMode}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Export engine
  window.CheatsheetPdfEngine = {
    renderDownloadBanner: renderDownloadBanner,
    generateCheatsheetHtml: generateCheatsheetHtml,
    downloadPdf: downloadPdf,
    TOPIC_TO_KEYWORD_MAP: TOPIC_TO_KEYWORD_MAP
  };

})();
