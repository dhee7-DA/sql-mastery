/**
 * =============================================================================
 * SQL FOUNDRY: CHEATSHEET & ENCYCLOPEDIA PDF COMPILER ENGINE
 * =============================================================================
 * Generates standalone, publication-quality printable PDF cheatsheets and
 * master reference manuals with tactile vector SVGs, Amazon/JPMorgan schemas,
 * code progressions, and conceptual MCQs.
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

  // Topic ID to Keyword ID mapping
  const TOPIC_TO_KEYWORD_MAP = {
    'topic_01_select_from': 'select',
    'topic_02_where': 'where',
    'topic_03_order_limit': 'order-by',
    'topic_04_aggregates': 'group-by',
    'topic_05_groupby_having': 'having',
    'topic_06_joins': 'joins',
    'topic_07_adv_joins_union': 'joins',
    'topic_08_case_when': 'case-when',
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
      title: 'Architectural Cheatsheet & Dossier',
      tagline: 'Complete 4-Page Reference Manual with ANSI Semantics & SVGs'
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
            <span>OFFICIAL CHEATSHEET &bull; 9-PILLAR ARCHITECTURAL DOSSIER</span>
          </div>
          <h4 class="cheatsheet-banner-title">Download ${escapeHtml(kw.keyword)} Reference Cheatsheet (PDF)</h4>
          <p class="cheatsheet-banner-desc">
            Complete high-resolution companion PDF containing formal ANSI semantics, database engine internals, tactile vector SVG diagram, Amazon &amp; JPMorgan schemas, 5 conceptual MCQs, and FAANG interview solutions.
          </p>
          <div class="cheatsheet-banner-actions">
            <button class="cheatsheet-dl-btn primary" onclick="window.CheatsheetPdfEngine.downloadPdf('${escapeHtml(kw.id)}', 'dark')" title="Download High-Contrast Screen-Optimized PDF">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download Cheatsheet (Midnight Dark)</span>
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
            <div class="mini-card-body">${escapeHtml(previewCode.split('\\n').slice(0, 4).join('\\n'))}</div>
            <div class="mini-card-footer">4-PAGE PDF &bull; VECTOR SVG &bull; 5 MCQS</div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Generates the complete HTML markup for a standalone Keyword PDF Cheatsheet
   */
  function generateCheatsheetHtml(kw, edition) {
    const isDark = edition !== 'print';
    const diagType = kw.svgDiagramType || 'projection';
    
    // Render SVG if engine is available
    let svgHtml = '';
    try {
      if (window.MasterySvgEngine && typeof window.MasterySvgEngine.render === 'function') {
        svgHtml = window.MasterySvgEngine.render(diagType, 0);
      }
    } catch (e) {
      console.warn('Could not generate SVG for cheatsheet:', e);
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SQL Foundry Cheatsheet - ${escapeHtml(kw.keyword)}</title>
  <link rel="stylesheet" href="cheatsheet_book.css">
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: ${isDark ? '#09090b' : '#ffffff'};
      color: ${isDark ? '#f4f4f5' : '#09090b'};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
  </style>
</head>
<body>
  <div class="cheatsheet-pdf-document ${isDark ? 'edition-dark' : 'edition-print'}">
    
    <!-- PAGE 1: SYNTAX, ENGINE MECHANICS & ARCHITECTURAL SVG -->
    <div class="cheatsheet-page">
      <div class="pdf-header-strip">
        <div>
          <div class="pdf-keyword-badge">${escapeHtml(kw.keyword)}</div>
          <div style="font-size: 13px; font-weight: 600; margin-top: 2px;">${escapeHtml(kw.title)}</div>
        </div>
        <div class="pdf-header-meta">
          <div>SQL FOUNDRY // ARCHITECTURE MANUAL</div>
          <div>${escapeHtml(kw.executionPhase)}</div>
          <div>Complexity: ${escapeHtml(kw.engineInternals.complexity || 'O(N)')}</div>
        </div>
      </div>

      <!-- ANSI Syntax -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">1. ANSI Syntax &amp; Grammar Specification</div>
        <pre class="pdf-code-box">${escapeHtml(kw.ansiSyntax)}</pre>
        <div class="pdf-pillar-body">${escapeHtml(kw.summary)}</div>
      </div>

      <!-- Database Engine Internals -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">2. Database Engine Internals &amp; Storage Footprint</div>
        <div class="pdf-pillar-body">
          <p style="margin: 0 0 4px 0;"><strong>Physical Operator:</strong> ${escapeHtml(kw.engineInternals.operatorType)}</p>
          <p style="margin: 0 0 4px 0;"><strong>Memory Footprint:</strong> ${escapeHtml(kw.engineInternals.memoryFootprint)}</p>
          <p style="margin: 0 0 4px 0;"><strong>Disk Spill Risk:</strong> ${escapeHtml(kw.engineInternals.diskSpillRisk)}</p>
          <p style="margin: 0;"><strong>Index SARGability:</strong> ${escapeHtml(kw.engineInternals.indexInteraction)}</p>
        </div>
      </div>

      <!-- Tactile Architectural SVG Diagram -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">3. Relational Architecture Diagram (Tuple Lifecycle)</div>
        <div style="width: 100%; overflow: hidden; border-radius: 6px; margin-top: 6px;">
          ${svgHtml}
        </div>
      </div>
    </div>

    <!-- PAGE 2: CODE PROGRESSIONS & PRODUCTION SCHEMAS -->
    <div class="cheatsheet-page">
      <div class="pdf-header-strip">
        <div>
          <div class="pdf-keyword-badge" style="font-size: 18px;">${escapeHtml(kw.keyword)} // IMPLEMENTATION PATTERNS</div>
        </div>
        <div class="pdf-header-meta">
          <div>MODULE: ${escapeHtml(kw.module.toUpperCase())}</div>
          <div>PAGE 2 OF 4</div>
        </div>
      </div>

      <!-- Canonical Query Patterns -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">4. Canonical Query Code Progression</div>
        
        <p style="margin: 4px 0; font-size: 10.5px; font-weight: 700;">Pattern A: ${escapeHtml(kw.codePatterns.foundational.title)}</p>
        <pre class="pdf-code-box">${escapeHtml(kw.codePatterns.foundational.sql)}</pre>

        <p style="margin: 8px 0 4px 0; font-size: 10.5px; font-weight: 700;">Pattern B: ${escapeHtml(kw.codePatterns.intermediate.title)}</p>
        <pre class="pdf-code-box">${escapeHtml(kw.codePatterns.intermediate.sql)}</pre>

        <p style="margin: 8px 0 4px 0; font-size: 10.5px; font-weight: 700;">Pattern C: ${escapeHtml(kw.codePatterns.advanced.title)}</p>
        <pre class="pdf-code-box">${escapeHtml(kw.codePatterns.advanced.sql)}</pre>
      </div>

      <!-- Production Schemas & Input/Output Tables -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">5. Production Schemas &amp; Input/Output Relational Tables</div>
        <div class="pdf-schema-grid">
          <div>
            <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 700;">Input: ${escapeHtml(kw.schemas.inputTable.name)}</p>
            <table class="pdf-table">
              <thead>
                <tr>${kw.schemas.inputTable.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${kw.schemas.inputTable.sampleRows.map(r => `<tr>${r.map(v => `<td>${escapeHtml(v)}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div>
            <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 700;">Emitted Output Table</p>
            <table class="pdf-table">
              <thead>
                <tr>${kw.schemas.outputTable.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${kw.schemas.outputTable.sampleRows.map(r => `<tr>${r.map(v => `<td>${escapeHtml(v)}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- PAGE 3: PRODUCTION CASE STUDY & FAANG INTERVIEW PRACTICE -->
    <div class="cheatsheet-page">
      <div class="pdf-header-strip">
        <div>
          <div class="pdf-keyword-badge" style="font-size: 18px;">${escapeHtml(kw.keyword)} // INDUSTRY APPLICATION</div>
        </div>
        <div class="pdf-header-meta">
          <div>COMPANY APPLICATION &bull; INTERVIEW RIGOR</div>
          <div>PAGE 3 OF 4</div>
        </div>
      </div>

      <!-- Enterprise Case Study -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">6. Production Enterprise Case Study</div>
        <div class="pdf-pillar-body">
          <p style="margin: 0 0 6px 0;"><strong>Company / Team:</strong> ${escapeHtml(kw.caseStudy.company)}</p>
          <p style="margin: 0 0 6px 0;"><strong>Operational Scenario:</strong> ${escapeHtml(kw.caseStudy.scenario)}</p>
          <pre class="pdf-code-box">${escapeHtml(kw.caseStudy.solutionSql)}</pre>
          <p style="margin: 0;"><strong>Business &amp; Infrastructure Impact:</strong> ${escapeHtml(kw.caseStudy.impact)}</p>
        </div>
      </div>

      <!-- Curated FAANG & Wall Street Interview Practice -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">7. FAANG &amp; Wall Street Technical Interview Defense</div>
        ${kw.interviewQuestions.map((q, idx) => `
          <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed rgba(255,255,255,0.1);">
            <div style="font-size: 10.5px; font-weight: 700; color: #a1a1aa; margin-bottom: 3px;">
              [${escapeHtml(q.company)}] Question ${idx + 1}:
            </div>
            <div style="font-size: 11px; font-weight: 600; margin-bottom: 4px;">${escapeHtml(q.question)}</div>
            <div style="font-size: 10.5px; color: ${isDark ? '#d4d4d8' : '#334155'}; line-height: 1.45;">
              <strong>Model Answer:</strong> ${escapeHtml(q.answer)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- PAGE 4: TRAPS, PITFALLS & 5 CONCEPTUAL MCQS -->
    <div class="cheatsheet-page">
      <div class="pdf-header-strip">
        <div>
          <div class="pdf-keyword-badge" style="font-size: 18px;">${escapeHtml(kw.keyword)} // DEFENSE AUDIT &amp; MCQS</div>
        </div>
        <div class="pdf-header-meta">
          <div>3VL TRAPS &bull; CERTIFICATION AUDIT</div>
          <div>PAGE 4 OF 4</div>
        </div>
      </div>

      <!-- Traps & Pitfalls -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">8. High-Yield Pitfalls &amp; Corporate Production Bugs</div>
        ${kw.pitfalls.map(p => `
          <div style="margin-bottom: 8px;">
            <span style="display:inline-block; font-size:9.5px; font-weight:700; padding:2px 6px; border-radius:3px; background:rgba(225,29,72,0.15); color:#f43f5e; margin-right:6px;">${escapeHtml(p.severity)}</span>
            <strong style="font-size: 11px;">${escapeHtml(p.title)}:</strong>
            <span style="font-size: 10.5px; color: ${isDark ? '#d4d4d8' : '#334155'};"> ${escapeHtml(p.description)}</span>
          </div>
        `).join('')}
      </div>

      <!-- 5 Conceptual MCQs -->
      <div class="pdf-pillar-card avoid-break">
        <div class="pdf-pillar-title">9. Certification &amp; Conceptual Mastery Examination (5 MCQs)</div>
        ${kw.mcqs.map((m, i) => `
          <div class="pdf-mcq-item">
            <div class="pdf-mcq-question">${i + 1}. ${escapeHtml(m.question)}</div>
            ${m.options.map(opt => `<div class="pdf-mcq-option">${escapeHtml(opt)}</div>`).join('')}
            <div class="pdf-mcq-answer">
              <strong>Correct Answer: ${escapeHtml(m.correct)}</strong> &bull; <em>${escapeHtml(m.rationale)}</em>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

  </div>

  <script>
    // Trigger browser print dialog automatically when loaded
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 400);
    };
  </script>
</body>
</html>`;
  }

  /**
   * Opens the printable window and triggers PDF download
   */
  function downloadPdf(keywordId, edition) {
    if (!window.KeywordEncyclopedia) {
      alert('Keyword Encyclopedia data core is loading. Please try again in a moment.');
      return;
    }

    const kw = window.KeywordEncyclopedia.getKeyword(keywordId) || window.KeywordEncyclopedia.getAllKeywords()[0];
    if (!kw) {
      alert('Keyword data not found for ' + keywordId);
      return;
    }

    const html = generateCheatsheetHtml(kw, edition || 'dark');
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to open the PDF printable cheatsheet.');
      return;
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }

  // Expose globally
  window.CheatsheetPdfEngine = {
    renderDownloadBanner,
    generateCheatsheetHtml,
    downloadPdf
  };

  console.log('✅ SQL Foundry Cheatsheet PDF Engine initialized.');
})();
