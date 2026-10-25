/**
 * SQL FOUNDRY - COMMAND PALETTE (CTRL+K / CMD+K)
 * Desktop-grade instant keyboard navigation modal across:
 * - 323 LeetCode SQL Problems
 * - 70+ Target Companies & 10 Domains
 * - 16+ System Tools, Views & Workspaces
 * - Instant Quick Actions (Run, Theme, Audio, Sir Bloops)
 */
(function() {
  'use strict';

  let isOpen = false;
  let activeIndex = 0;
  let currentFilter = 'all'; // 'all', 'problems', 'companies', 'views', 'actions'
  let cachedItems = null;
  let filteredItems = [];

  const SYSTEM_VIEWS = [
    { id: 'viewLeetCode50', title: 'LeetCode 323 SQL Arena', category: 'views', icon: '⚡', desc: 'Solve official curated LeetCode SQL problems with instant judge' },
    { id: 'viewStudio', title: 'Query Execution Studio', category: 'views', icon: '💻', desc: 'Multi-table query workspace with live AST visualization & schema browser' },
    { id: 'viewCompanyHub', title: 'Domain & Company Mastery Hub', category: 'views', icon: '🏛️', desc: '10 industry domains and 70+ premier target employer blueprints' },
    { id: 'viewMockInterview', title: 'FAANG & Wall Street Mock Screen', category: 'views', icon: '🎯', desc: '45-minute timed technical interview simulation with strict Rubric' },
    { id: 'viewWindowMatrix', title: 'Window Cockpit', category: 'views', icon: '🪟', desc: 'Partitioning, Ranking Matrix, Sliding Frames & Offsets' },
    { id: 'viewNullToxicity', title: '3VL Null Toxicity Lab', category: 'views', icon: '🧪', desc: 'Three-valued boolean logic, truth tables & silent filter drops' },
    { id: 'viewExecutionFlow', title: 'Relational Execution Pipeline', category: 'views', icon: '🔄', desc: 'Phase-by-phase execution order: FROM to LIMIT' },
    { id: 'viewSetTheory', title: 'Set Theory & Venn Operator Lab', category: 'views', icon: '⭕', desc: 'UNION, INTERSECT, EXCEPT mechanics and duplicate row rules' },
    { id: 'viewSqlTerminal', title: 'SQL Terminal (WASM SQLite)', category: 'views', icon: '🖥️', desc: 'In-browser SQLite sandbox loaded with production relational data' },
    { id: 'viewMcqs', title: 'MCQs Vault (2,100+ Traps)', category: 'views', icon: '🧠', desc: 'High-frequency interview traps, edge cases & riddle drills' },
    { id: 'viewSyntaxGym', title: 'Syntax Muscle Memory Gym', category: 'views', icon: '⚡', desc: 'Rapid query construction typing drills against the clock' },
    { id: 'viewQuests', title: 'Interactive Quests & Token Tray', category: 'views', icon: '🎮', desc: 'Token assembly trays, fill-in-the-blanks & logic bug fixer' },
    { id: 'viewTactileEngine', title: 'Tactile Relational Machine', category: 'views', icon: '⚙️', desc: 'Hand-inked physical relational machine & query washer' },
    { id: 'viewExplainer', title: 'Study Docs & AST Diffs', category: 'views', icon: '📚', desc: 'Under-the-hood engine theory, gotchas & AST diffs' },
    { id: 'viewDeconstructor', title: 'Query Deconstructor', category: 'views', icon: '🔍', desc: 'Clause-by-clause query isolator and semantic breakdown' },
    { id: 'viewFlashcards', title: 'SuperMemo-2 Flashcard Vault', category: 'views', icon: '🗂️', desc: 'Spaced repetition flashcards with optimal forgetting curves' }
  ];

  const QUICK_ACTIONS = [
    {
      id: 'action_run_query',
      title: 'Run Query',
      subtitle: 'Execute SQL query currently in editor (Ctrl+Enter)',
      category: 'actions',
      icon: '▶️',
      action: () => {
        const btn = document.getElementById('btnRunQuery');
        if (btn) btn.click();
      }
    },
    {
      id: 'action_toggle_bloops',
      title: 'Toggle Sir Bloops Companion',
      subtitle: 'Park or summon the animated SQL helper',
      category: 'actions',
      icon: '🐙',
      action: () => {
        if (window.SQL_BUDDY && typeof window.SQL_BUDDY.toggleMinimize === 'function') {
          window.SQL_BUDDY.toggleMinimize();
        }
      }
    },
    {
      id: 'action_bloops_customizer',
      title: 'Sir Bloops Customizer & Skins',
      subtitle: 'Change companion color palette, shape, and sound FX',
      category: 'actions',
      icon: '🎨',
      action: () => {
        if (window.SQL_BUDDY && typeof window.SQL_BUDDY.toggleCustomizer === 'function') {
          window.SQL_BUDDY.toggleCustomizer();
        }
      }
    },
    {
      id: 'action_theme_active_builders',
      title: 'Switch Theme: Active Builders Light',
      subtitle: 'Clean paper white, hairline zinc borders, terracotta accents',
      category: 'actions',
      icon: '☀️',
      action: () => setTheme('active-builders')
    },
    {
      id: 'action_theme_cursor_dark',
      title: 'Switch Theme: Cursor Dark',
      subtitle: 'High contrast engineering dark theme with amber highlights',
      category: 'actions',
      icon: '🌙',
      action: () => setTheme('cursor-dark')
    },
    {
      id: 'action_theme_zinc_pitch',
      title: 'Switch Theme: Active Builders Dark',
      subtitle: 'Minimalist deep zinc dark theme',
      category: 'actions',
      icon: '🌑',
      action: () => setTheme('active-builders-dark')
    },
    {
      id: 'action_open_streak',
      title: 'Daily Streak Calendar',
      subtitle: 'View your 112-day activity heatmap and milestone badges',
      category: 'actions',
      icon: '🔥',
      action: () => {
        if (window.dailyStreak && typeof window.dailyStreak.open === 'function') {
          window.dailyStreak.open();
        }
      }
    }
  ];

  function setTheme(themeName) {
    const sel = document.getElementById('themeSelect');
    if (sel) {
      sel.value = themeName;
      sel.dispatchEvent(new Event('change'));
    }
  }

  function getSearchItems() {
    if (cachedItems) return cachedItems;

    const items = [];

    // 1. Views
    SYSTEM_VIEWS.forEach(v => {
      items.push({
        id: 'view_' + v.id,
        category: 'views',
        icon: v.icon,
        title: v.title,
        subtitle: v.desc,
        badge: 'View',
        badgeClass: 'badge-view',
        action: () => {
          if (window.selectNavView) window.selectNavView(v.id, v.title, null);
        }
      });
    });

    // 2. Actions
    QUICK_ACTIONS.forEach(a => {
      items.push({
        id: a.id,
        category: 'actions',
        icon: a.icon,
        title: a.title,
        subtitle: a.subtitle,
        badge: 'Action',
        badgeClass: 'badge-action',
        action: a.action
      });
    });

    // 3. Companies & Domains from CompanyMasteryEngine
    if (window.CompanyMasteryEngine && window.CompanyMasteryEngine.COMPANY_PROFILES) {
      const profiles = window.CompanyMasteryEngine.COMPANY_PROFILES;
      Object.keys(profiles).forEach(key => {
        if (key === 'all') return;
        const p = profiles[key];
        items.push({
          id: 'comp_' + key,
          category: 'companies',
          icon: p.icon || '🏛️',
          title: p.name,
          subtitle: `${p.domain ? p.domain.toUpperCase() : 'Tech'} · ${p.coreFocus || 'SQL Interview Preparation'}`,
          badge: p.domain || 'Company',
          badgeClass: 'badge-company',
          action: () => {
            if (window.selectNavView) window.selectNavView('viewCompanyHub', 'Companies & Domains', null);
            if (window.CompanyMasteryEngine && typeof window.CompanyMasteryEngine.setCompany === 'function') {
              window.CompanyMasteryEngine.setCompany(key);
            }
          }
        });
      });
    }

    // 4. Domains
    if (window.CompanyMasteryEngine && window.CompanyMasteryEngine.DOMAIN_CATALOG) {
      const domains = window.CompanyMasteryEngine.DOMAIN_CATALOG;
      domains.forEach(d => {
        if (d.id === 'all') return;
        items.push({
          id: 'dom_' + d.id,
          category: 'companies',
          icon: d.icon || '🌐',
          title: `${d.name} Domain`,
          subtitle: `${d.tagline} · Top tier employer interview tracks`,
          badge: 'Domain',
          badgeClass: 'badge-domain',
          action: () => {
            if (window.selectNavView) window.selectNavView('viewCompanyHub', 'Companies & Domains', null);
            if (window.CompanyMasteryEngine && typeof window.CompanyMasteryEngine.setDomain === 'function') {
              window.CompanyMasteryEngine.setDomain(d.id);
            }
          }
        });
      });
    }

    // 5. LeetCode 323 Problems
    const vault = window.LEETCODE_300_VAULT;
    if (Array.isArray(vault)) {
      vault.forEach(p => {
        const diff = p.difficulty || 'Medium';
        const cos = (p.companies || []).slice(0, 3).join(', ');
        items.push({
          id: 'prob_' + p.id,
          category: 'problems',
          icon: diff === 'Easy' ? '🟢' : (diff === 'Hard' ? '🔴' : '🟡'),
          title: `#${p.id} ${p.title}`,
          subtitle: `${p.pillar ? p.pillar.toUpperCase() : 'SQL'} · ${cos ? cos + ' · ' : ''}${diff}`,
          badge: `#${p.id}`,
          badgeClass: diff.toLowerCase(),
          probId: p.id,
          action: () => {
            if (window.selectNavView) window.selectNavView('viewLeetCode50', 'LeetCode 323', null);
            if (window.LeetCodeArenaEngine && typeof window.LeetCodeArenaEngine.selectProblem === 'function') {
              window.LeetCodeArenaEngine.selectProblem(p.id);
              if (typeof window.LeetCodeArenaEngine.switchStage === 'function') {
                window.LeetCodeArenaEngine.switchStage('problems');
              }
            }
          }
        });
      });
    }

    cachedItems = items;
    return items;
  }

  function invalidateCache() {
    cachedItems = null;
  }

  function mountDOM() {
    if (document.getElementById('sqlCmdPaletteOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'sqlCmdPaletteOverlay';
    overlay.className = 'cmd-palette-overlay';
    overlay.style.display = 'none';

    overlay.innerHTML = `
      <div class="cmd-palette-container" onclick="event.stopPropagation()">
        <div class="cmd-palette-search-row">
          <svg class="cmd-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="cmdPaletteInput" class="cmd-palette-input" placeholder="Type a problem (#175, Employee), company (Stripe), view, or command..." autocomplete="off" spellcheck="false">
          <div class="cmd-palette-esc-hint">
            <kbd>ESC</kbd>
          </div>
        </div>

        <div class="cmd-palette-filter-strip">
          <button class="cmd-filter-pill active" data-filter="all">All</button>
          <button class="cmd-filter-pill" data-filter="problems">Problems (323)</button>
          <button class="cmd-filter-pill" data-filter="companies">Companies (70+)</button>
          <button class="cmd-filter-pill" data-filter="views">Views</button>
          <button class="cmd-filter-pill" data-filter="actions">Actions</button>
        </div>

        <div class="cmd-palette-results" id="cmdPaletteResults"></div>

        <div class="cmd-palette-footer">
          <div class="cmd-footer-keys">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>esc</kbd> Dismiss</span>
          </div>
          <div class="cmd-footer-meta" id="cmdFooterMeta">320+ items available</div>
        </div>
      </div>
    `;

    overlay.addEventListener('click', () => close());
    document.body.appendChild(overlay);

    const input = document.getElementById('cmdPaletteInput');
    if (input) {
      input.addEventListener('input', () => {
        activeIndex = 0;
        renderResults();
      });
      input.addEventListener('keydown', onKeyDown);
    }

    const filterBtns = overlay.querySelectorAll('.cmd-filter-pill');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.toggle('active', b === btn));
        activeIndex = 0;
        renderResults();
        if (input) input.focus();
      });
    });
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredItems.length === 0) return;
      activeIndex = (activeIndex + 1) % filteredItems.length;
      updateActiveItem();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredItems.length === 0) return;
      activeIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
      updateActiveItem();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        executeItem(filteredItems[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }

  function updateActiveItem() {
    const listEl = document.getElementById('cmdPaletteResults');
    if (!listEl) return;
    const items = listEl.querySelectorAll('.cmd-result-item');
    items.forEach((el, idx) => {
      el.classList.toggle('selected', idx === activeIndex);
      if (idx === activeIndex) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function executeItem(item) {
    if (!item) return;
    close();
    try {
      item.action();
    } catch (err) {
      console.error('[CommandPalette] Error executing item:', err);
    }
  }

  function renderResults() {
    const input = document.getElementById('cmdPaletteInput');
    const query = input ? input.value.trim().toLowerCase() : '';
    const resultsEl = document.getElementById('cmdPaletteResults');
    const metaEl = document.getElementById('cmdFooterMeta');
    if (!resultsEl) return;

    const all = getSearchItems();

    filteredItems = all.filter(item => {
      if (currentFilter !== 'all' && item.category !== currentFilter) {
        return false;
      }
      if (!query) return true;

      // Smart match ID, title, subtitle, or badge
      const q = query.replace(/^#/, '');
      if (item.probId && String(item.probId) === q) return true;
      if (item.title.toLowerCase().includes(query)) return true;
      if (item.subtitle && item.subtitle.toLowerCase().includes(query)) return true;
      if (item.badge && item.badge.toLowerCase().includes(query)) return true;
      return false;
    });

    // Limit to top 50 items for snappy rendering
    const displayList = filteredItems.slice(0, 50);

    if (displayList.length === 0) {
      resultsEl.innerHTML = `
        <div class="cmd-palette-empty">
          <div class="cmd-empty-icon">🔍</div>
          <div class="cmd-empty-title">No matching results</div>
          <div class="cmd-empty-desc">No problem, company, or tool matching "<strong>${escapeHtml(query)}</strong>". Try searching for <em>#175</em>, <em>Amazon</em>, <em>Window</em>, or <em>Join</em>.</div>
        </div>
      `;
      if (metaEl) metaEl.textContent = '0 matches';
      return;
    }

    if (activeIndex >= displayList.length) activeIndex = 0;

    let html = '';
    displayList.forEach((item, idx) => {
      const isSelected = idx === activeIndex;
      html += `
        <div class="cmd-result-item ${isSelected ? 'selected' : ''}" data-idx="${idx}" onclick="window.SQL_CMD_PALETTE.selectByIndex(${idx})">
          <div class="cmd-item-icon">${item.icon}</div>
          <div class="cmd-item-content">
            <div class="cmd-item-title">${highlightMatch(item.title, query)}</div>
            <div class="cmd-item-sub">${escapeHtml(item.subtitle || '')}</div>
          </div>
          ${item.badge ? `<span class="cmd-item-badge ${item.badgeClass || ''}">${escapeHtml(item.badge)}</span>` : ''}
          <span class="cmd-item-action-hint">↵</span>
        </div>
      `;
    });

    resultsEl.innerHTML = html;
    if (metaEl) {
      metaEl.textContent = `${filteredItems.length} result${filteredItems.length === 1 ? '' : 's'}`;
    }
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const reg = new RegExp('(' + escapeRegex(query) + ')', 'gi');
    return escaped.replace(reg, '<mark class="cmd-mark">$1</mark>');
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function open(initialQuery = '') {
    mountDOM();
    const overlay = document.getElementById('sqlCmdPaletteOverlay');
    const input = document.getElementById('cmdPaletteInput');
    if (!overlay) return;

    isOpen = true;
    overlay.style.display = 'flex';
    document.body.classList.add('cmd-palette-open');

    if (input) {
      input.value = initialQuery;
      activeIndex = 0;
      setTimeout(() => input.focus(), 50);
    }

    renderResults();
  }

  function close() {
    const overlay = document.getElementById('sqlCmdPaletteOverlay');
    if (overlay) overlay.style.display = 'none';
    document.body.classList.remove('cmd-palette-open');
    isOpen = false;
  }

  function toggle() {
    if (isOpen) close();
    else open();
  }

  function init() {
    mountDOM();

    // Global Key Listener for Ctrl+K, Cmd+K, and '/'
    window.addEventListener('keydown', (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K');
      const isSlash = e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);

      if (isCmdK || isSlash) {
        e.preventDefault();
        toggle();
      }
    });

    // Invalidate search cache when vaults finish loading
    window.addEventListener('DOMContentLoaded', () => invalidateCache());
    setTimeout(() => invalidateCache(), 1500);
  }

  // Public Interface
  window.SQL_CMD_PALETTE = {
    init,
    open,
    close,
    toggle,
    invalidateCache,
    selectByIndex: (idx) => {
      if (filteredItems[idx]) {
        executeItem(filteredItems[idx]);
      }
    }
  };

  // Auto initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
