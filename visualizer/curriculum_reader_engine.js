// =============================================================================
// SQL FOUNDRY — IN-APP CURRICULUM THEORY & INTERVIEW DEFENSE READER ENGINE
// High-Fidelity Markdown & Code Renderer for Days 01–15
// =============================================================================

(function() {
  let activeDayNum = 1;
  let activeSubTab = 'theory'; // 'theory' | 'interview' | 'dailyLog' | 'solutions'

  function init() {
    // Ensure modal container exists in DOM
    if (!document.getElementById('curriculumReaderModal')) {
      const modalHtml = `
        <div id="curriculumReaderModal" class="custom-modal-overlay" style="display: none; z-index: 99999;">
          <div class="custom-modal-box curriculum-reader-box" style="max-width: 1060px; width: 95%; height: 90vh; display: flex; flex-direction: column; padding: 0; overflow: hidden; background: var(--bg-surface, #ffffff); border: 1px solid var(--border-default, #d4d4d8); box-shadow: 0 25px 60px rgba(0,0,0,0.35); border-radius: 16px;">
            <!-- Modal Header -->
            <div class="reader-modal-header" style="display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-bottom: 1px solid var(--border-subtle, #e4e4e7); background: var(--bg-surface-elevated, #f4f4f5);">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span id="readerDayIcon" style="font-size: 26px;">🏛️</span>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span id="readerDayBadge" class="status-pill pill-from" style="font-size: 11px; font-weight: 800; padding: 2px 8px;">DAY 01</span>
                    <h3 id="readerDayTitle" style="margin: 0; font-size: 17px; font-weight: 800; color: var(--text-primary, #18181b);">Basic SELECT &amp; Projections</h3>
                  </div>
                  <div style="font-size: 12px; color: var(--text-muted, #71717a); margin-top: 2px;">SQL Mastery Production Compendium &bull; Days 01&ndash;20 Complete</div>
                </div>
              </div>
              <button class="btn-drawer-close" onclick="window.CurriculumReaderEngine.close()" title="Close Reader" style="background: none; border: none; font-size: 24px; cursor: pointer; color: var(--text-muted);">&times;</button>
            </div>

            <!-- Day Selector Pills Bar -->
            <div class="reader-days-bar" id="readerDaysBar" style="display: flex; gap: 6px; padding: 10px 24px; overflow-x: auto; background: var(--bg-surface, #ffffff); border-bottom: 1px solid var(--border-subtle, #e4e4e7); scrollbar-width: thin;">
              <!-- Dynamically populated day pills 01 to 15 -->
            </div>

            <!-- Sub-tab Navigation Bar -->
            <div class="reader-subtabs-bar" style="display: flex; gap: 8px; padding: 10px 24px; background: var(--bg-surface, #ffffff); border-bottom: 1px solid var(--border-subtle, #e4e4e7);">
              <button class="card-nav-btn reader-tab-btn active" id="btnReaderTabTheory" onclick="window.CurriculumReaderEngine.switchSubTab('theory')">📖 Theory &amp; Architecture</button>
              <button class="card-nav-btn reader-tab-btn" id="btnReaderTabInterview" onclick="window.CurriculumReaderEngine.switchSubTab('interview')">🎯 Interview Defense</button>
              <button class="card-nav-btn reader-tab-btn" id="btnReaderTabDailyLog" onclick="window.CurriculumReaderEngine.switchSubTab('dailyLog')">📝 Daily Log &amp; Objectives</button>
              <button class="card-nav-btn reader-tab-btn" id="btnReaderTabSolutions" onclick="window.CurriculumReaderEngine.switchSubTab('solutions')">💡 Solution Walkthroughs</button>
            </div>

            <!-- Reader Scrollable Content Body -->
            <div id="readerContentBody" class="reader-content-body" style="flex: 1; overflow-y: auto; padding: 28px 32px; font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif); line-height: 1.65; color: var(--text-primary, #18181b);">
              <!-- Rendered Markdown Content -->
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
  }

  function openDay(dayIdentifier, initialTab = 'theory') {
    init();
    if (!window.CURRICULUM_COMPENDIUM || window.CURRICULUM_COMPENDIUM.length === 0) {
      console.warn('CURRICULUM_COMPENDIUM not loaded');
      return;
    }

    let target = null;
    if (typeof dayIdentifier === 'number') {
      target = window.CURRICULUM_COMPENDIUM.find(d => d.num === dayIdentifier);
    } else if (typeof dayIdentifier === 'string') {
      target = window.CURRICULUM_COMPENDIUM.find(d => d.id === dayIdentifier || d.folder === dayIdentifier);
    }
    if (!target) target = window.CURRICULUM_COMPENDIUM[0];

    activeDayNum = target.num;
    activeSubTab = initialTab;

    const modal = document.getElementById('curriculumReaderModal');
    if (modal) {
      modal.style.display = 'flex';
      renderDaySelector();
      renderContent();
    }
    if (window.soundFX) window.soundFX.playPop();
  }

  function close() {
    const modal = document.getElementById('curriculumReaderModal');
    if (modal) modal.style.display = 'none';
  }

  function switchDay(num) {
    activeDayNum = num;
    if (window.soundFX) window.soundFX.playPop();
    renderDaySelector();
    renderContent();
  }

  function switchSubTab(tabName) {
    activeSubTab = tabName;
    if (window.soundFX) window.soundFX.playPop();
    
    document.querySelectorAll('.reader-tab-btn').forEach(btn => btn.classList.remove('active'));
    if (tabName === 'theory') document.getElementById('btnReaderTabTheory')?.classList.add('active');
    if (tabName === 'interview') document.getElementById('btnReaderTabInterview')?.classList.add('active');
    if (tabName === 'dailyLog') document.getElementById('btnReaderTabDailyLog')?.classList.add('active');
    if (tabName === 'solutions') document.getElementById('btnReaderTabSolutions')?.classList.add('active');

    renderContent();
  }

  function renderDaySelector() {
    const bar = document.getElementById('readerDaysBar');
    if (!bar || !window.CURRICULUM_COMPENDIUM) return;

    let html = '';
    window.CURRICULUM_COMPENDIUM.forEach(d => {
      const isSelected = d.num === activeDayNum;
      html += `
        <button class="reader-day-pill ${isSelected ? 'active' : ''}" onclick="window.CurriculumReaderEngine.switchDay(${d.num})" style="padding: 4px 10px; font-size: 12px; font-weight: 700; border-radius: 6px; cursor: pointer; border: 1px solid ${isSelected ? 'var(--accent, #c2410c)' : 'var(--border-default, #d4d4d8)'}; background: ${isSelected ? 'var(--accent, #c2410c)' : 'var(--bg-card, #ffffff)'}; color: ${isSelected ? '#ffffff' : 'var(--text-primary, #18181b)'}; white-space: nowrap; transition: all 0.15s ease;">
          ${d.icon} Day ${String(d.num).padStart(2, '0')}
        </button>
      `;
    });
    bar.innerHTML = html;
  }

  function renderContent() {
    const body = document.getElementById('readerContentBody');
    if (!body || !window.CURRICULUM_COMPENDIUM) return;

    const currentDay = window.CURRICULUM_COMPENDIUM.find(d => d.num === activeDayNum) || window.CURRICULUM_COMPENDIUM[0];

    // Header info
    document.getElementById('readerDayIcon').textContent = currentDay.icon;
    document.getElementById('readerDayBadge').textContent = `DAY ${String(currentDay.num).padStart(2, '0')}`;
    document.getElementById('readerDayTitle').textContent = currentDay.title;

    let rawMarkdown = '';
    if (activeSubTab === 'theory') rawMarkdown = currentDay.theoryMarkdown;
    else if (activeSubTab === 'interview') rawMarkdown = currentDay.interviewMarkdown;
    else if (activeSubTab === 'dailyLog') rawMarkdown = currentDay.dailyLogMarkdown;
    else if (activeSubTab === 'solutions') rawMarkdown = currentDay.solutionsMarkdown;

    if (!rawMarkdown || rawMarkdown.trim().length === 0) {
      body.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 40px; margin-bottom: 12px;">📂</div>
          <div style="font-size: 16px; font-weight: 700;">No ${activeSubTab} content available for Day ${currentDay.num}.</div>
          <p style="font-size: 13px;">Check the other sub-tabs above for full theory and architectural principles.</p>
        </div>
      `;
      return;
    }

    body.innerHTML = renderMarkdownToHtml(rawMarkdown);
    body.scrollTop = 0;
  }

  // Lightweight, robust Markdown to HTML converter
  function renderMarkdownToHtml(md) {
    if (!md) return '';

    let html = md;

    // Normalize newlines
    html = html.replace(/\r\n/g, '\n');

    // Code blocks with syntax highlighting
    html = html.replace(/```(sql|javascript|python|bash|json|diff|text|)\n([\s\S]*?)```/g, function(match, lang, code) {
      const cleanCode = code.trim();
      const escaped = escapeHtml(cleanCode);
      const isSql = lang === 'sql' || cleanCode.toUpperCase().includes('SELECT ') || cleanCode.toUpperCase().includes('CREATE TABLE');
      
      const copyBtn = `<button class="code-copy-btn" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(cleanCode)}')); this.textContent = 'Copied!'; setTimeout(() => this.textContent = 'Copy', 2000);" style="position: absolute; right: 10px; top: 10px; padding: 2px 8px; font-size: 11px; font-weight: 700; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: #fff; cursor: pointer;">Copy</button>`;
      
      const testStudioBtn = isSql ? `<button class="code-test-btn" onclick="window.CurriculumReaderEngine.close(); window.switchToStudioWithQuery(decodeURIComponent('${encodeURIComponent(cleanCode)}'));" style="position: absolute; right: 65px; top: 10px; padding: 2px 8px; font-size: 11px; font-weight: 700; border-radius: 4px; border: 1px solid rgba(194, 65, 12, 0.4); background: rgba(194, 65, 12, 0.2); color: #f97316; cursor: pointer;">▶ Test in Studio</button>` : '';

      return `<div class="reader-code-wrapper" style="position: relative; margin: 16px 0; border-radius: 10px; overflow: hidden; background: #0f172a; border: 1px solid rgba(255,255,255,0.1);">
        <div style="background: rgba(0,0,0,0.3); padding: 6px 14px; font-size: 11px; font-family: monospace; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.06); text-transform: uppercase;">${lang || 'code'}</div>
        ${testStudioBtn}
        ${copyBtn}
        <pre style="margin: 0; padding: 14px 16px; overflow-x: auto; font-family: monospace; font-size: 13px; line-height: 1.5; color: #e2e8f0;"><code>${escaped}</code></pre>
      </div>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code style="font-family: monospace; font-size: 0.9em; padding: 2px 5px; border-radius: 4px; background: rgba(194, 65, 12, 0.08); color: var(--accent, #c2410c); border: 1px solid rgba(194, 65, 12, 0.2);">$1</code>');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h4 style="margin: 22px 0 10px; font-size: 16px; font-weight: 800; color: var(--text-primary);">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 style="margin: 28px 0 12px; font-size: 19px; font-weight: 800; color: var(--text-primary); border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 style="margin: 0 0 16px; font-size: 22px; font-weight: 900; color: var(--accent, #c2410c);">$1</h2>');

    // Blockquotes & Alerts
    html = html.replace(/^\> \[\!NOTE\]\s*(.*$)/gim, '<div class="alert-box note" style="padding: 12px 16px; margin: 14px 0; border-left: 4px solid #3b82f6; background: rgba(59, 130, 246, 0.08); border-radius: 0 8px 8px 0; font-size: 13.5px;"><strong style="color: #3b82f6;">ℹ️ NOTE:</strong> $1</div>');
    html = html.replace(/^\> \[\!TIP\]\s*(.*$)/gim, '<div class="alert-box tip" style="padding: 12px 16px; margin: 14px 0; border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.08); border-radius: 0 8px 8px 0; font-size: 13.5px;"><strong style="color: #10b981;">💡 PRO-TIP:</strong> $1</div>');
    html = html.replace(/^\> \[\!WARNING\]\s*(.*$)/gim, '<div class="alert-box warning" style="padding: 12px 16px; margin: 14px 0; border-left: 4px solid #f59e0b; background: rgba(245, 158, 11, 0.08); border-radius: 0 8px 8px 0; font-size: 13.5px;"><strong style="color: #f59e0b;">⚠️ WARNING:</strong> $1</div>');
    html = html.replace(/^\> (.*$)/gim, '<blockquote style="margin: 14px 0; padding: 10px 16px; border-left: 4px solid var(--accent); background: rgba(194,65,12,0.05); font-style: italic; color: var(--text-secondary);">$1</blockquote>');

    // Bold & Italics
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: var(--text-primary); font-weight: 700;">$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Lists
    html = html.replace(/^\s*[\-\*]\s+(.*$)/gim, '<li style="margin-bottom: 4px;">$1</li>');
    html = html.replace(/(<li[\s\S]*?<\/li>)/gim, '<ul style="padding-left: 20px; margin: 10px 0;">$1</ul>');
    // Deduplicate nested ul tags
    html = html.replace(/<\/ul>\s*<ul[^>]*>/gim, '');

    // Paragraph line breaks
    html = html.replace(/\n\n+/g, '<p style="margin: 12px 0;"></p>');

    return html;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Expose global interface
  window.CurriculumReaderEngine = {
    init,
    openDay,
    close,
    switchDay,
    switchSubTab
  };

  window.openCurriculumReader = openDay;
})();
