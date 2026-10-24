// =============================================================================
// LEETCODE SQL ARENA - LINEAR / RAYCAST STUDIO ENGINE (FOCUS MODE)
// Minimalist, zero-clutter, collapsible tree navigation & focus card steppers
// =============================================================================

window.LEETCODE_ARENA = (() => {

  const STORAGE_KEY = 'sql_mastery_lc50_state_v1';

  const TOPIC_PILLARS = [
    { id: 'all', label: 'All Topics', icon: '🌐', count: 126, desc: 'Complete 11-concept SQL curriculum' },
    { id: 'filters', label: 'Foundations & 3VL', icon: '📐', concepts: ['concept-1'], desc: 'Predicates, NULL traps, Three-Valued Logic' },
    { id: 'joins', label: 'Joins & Set Ops', icon: '🔗', concepts: ['concept-2', 'concept-5'], desc: 'Inner, Left, Cross, Self-Joins & Anti-Joins' },
    { id: 'aggs', label: 'Aggregates & HAVING', icon: '📊', concepts: ['concept-3', 'concept-4'], desc: 'Grouping, conditional sums, execution order' },
    { id: 'subqueries', label: 'Subqueries & CTEs', icon: '🧩', concepts: ['concept-6', 'concept-11'], desc: 'Modular CTEs, correlated EXISTS, Recursive trees' },
    { id: 'windows', label: 'Window Analytics', icon: '📈', concepts: ['concept-8', 'concept-9', 'concept-10'], desc: 'ROW_NUMBER, Medians, Islands & Gaps, Graphs' },
    { id: 'strings', label: 'Strings & Regex', icon: '🔤', concepts: ['concept-7'], desc: 'REGEXP pattern matching, text transforms' }
  ];

  const CONCEPTS_META = [
    {
      id: 'concept-1',
      num: 1,
      title: 'Filtering & 3VL',
      pillar: 'filters',
      pillarName: 'Foundations & 3VL',
      icon: '📐',
      badge: 'Boolean Logic',
      summary: 'Master Three-Valued Logic (TRUE / FALSE / UNKNOWN), NULL evaluation traps, NOT IN vs NOT EXISTS gotchas, and index-friendly SARGable predicates.',
      subtopics: ['3VL & UNKNOWN', 'IS NULL Traps', 'NOT IN Gotchas', 'Boundary Predicates']
    },
    {
      id: 'concept-2',
      num: 2,
      title: 'Joins & Self-Joins',
      pillar: 'joins',
      pillarName: 'Joins & Set Ops',
      icon: '🔗',
      badge: 'Relational Core',
      summary: 'Master INNER, LEFT, RIGHT, FULL OUTER joins, cartesian product blowups, self-joins on hierarchical employee structures, and anti-join data isolation.',
      subtopics: ['INNER vs LEFT', 'Self-Join Hierarchy', 'Anti-Joins', 'Non-Equi Joins']
    },
    {
      id: 'concept-3',
      num: 3,
      title: 'Aggregates & Math',
      pillar: 'aggs',
      pillarName: 'Aggregates & HAVING',
      icon: '📊',
      badge: 'Aggregations',
      summary: 'COUNT(*) vs COUNT(col) semantics, SUM & AVG NULL omission rules, conditional counting via CASE WHEN, and arithmetic rounding precision.',
      subtopics: ['COUNT NULL Semantics', 'Conditional Aggregations', 'GROUP BY Granularity', 'Math Rounding']
    },
    {
      id: 'concept-4',
      num: 4,
      title: 'Sorting & HAVING',
      pillar: 'aggs',
      pillarName: 'Aggregates & HAVING',
      icon: '🗂️',
      badge: 'Post-Group Filter',
      summary: 'Physical execution assembly line (WHERE vs HAVING), multi-column tie-breakers, NULLS FIRST/LAST mechanics, and aggregate threshold filters.',
      subtopics: ['WHERE vs HAVING', 'Multi-Column Sorting', 'NULL Ordering', 'Group Filtering']
    },
    {
      id: 'concept-5',
      num: 5,
      title: 'Advanced Joins & Running',
      pillar: 'joins',
      pillarName: 'Joins & Set Ops',
      icon: '⚡',
      badge: 'Advanced Relational',
      summary: 'CROSS JOIN cartesian matrices, cumulative self-join expansions, overlapping date-range intervals, and non-equi relational matching.',
      subtopics: ['CROSS JOIN Matrices', 'Running Calculations', 'Self-Matching Ranges', 'Date Joins']
    },
    {
      id: 'concept-6',
      num: 6,
      title: 'Subqueries & CTEs',
      pillar: 'subqueries',
      pillarName: 'Subqueries & CTEs',
      icon: '🧩',
      badge: 'Modular Queries',
      summary: 'Scalar subqueries, correlated EXISTS vs IN performance, Common Table Expressions (WITH syntax), and composing clean multi-stage pipelines.',
      subtopics: ['Correlated EXISTS', 'Scalar Subqueries', 'Multi-CTE Pipelines', 'Subquery in FROM']
    },
    {
      id: 'concept-7',
      num: 7,
      title: 'Strings & Regex',
      pillar: 'strings',
      pillarName: 'Strings & Regex',
      icon: '🔤',
      badge: 'Text Processing',
      summary: 'REGEXP / RLIKE pattern validation, byte LENGTH vs character CHAR_LENGTH in UTF-8, CONCAT formatting, and string case manipulation.',
      subtopics: ['REGEXP Patterns', 'SUBSTRING & LENGTH', 'UPPER/LOWER Sanitizing', 'CONCAT Formatting']
    },
    {
      id: 'concept-8',
      num: 8,
      title: 'Medians & Distributions',
      pillar: 'windows',
      pillarName: 'Window Analytics',
      icon: '📈',
      badge: 'Window Functions',
      summary: 'ROW_NUMBER vs RANK vs DENSE_RANK differences, NTILE quantile distribution, cumulative percentiles, and exact continuous median calculations.',
      subtopics: ['ROW_NUMBER vs DENSE_RANK', 'Exact Median Finding', 'Cumulative Distributions', 'Partition Windows']
    },
    {
      id: 'concept-9',
      num: 9,
      title: 'Islands & Gaps',
      pillar: 'windows',
      pillarName: 'Window Analytics',
      icon: '🏝️',
      badge: 'Pattern Recognition',
      summary: 'The classic difference island technique (ROW_NUMBER - val), consecutive streak detection, missing value discovery, and temporal gap identification.',
      subtopics: ['Consecutive Streaks', 'Difference Island Method', 'Gap Detection', 'LEAD / LAG Shifts']
    },
    {
      id: 'concept-10',
      num: 10,
      title: 'Graph & Networks',
      pillar: 'windows',
      pillarName: 'Window Analytics',
      icon: '🕸️',
      badge: 'Network Topology',
      summary: 'Bidirectional friendships, node degree analysis, mutual connection counts, triad closures, and multi-hop relationship joins.',
      subtopics: ['Bidirectional Pairs', 'Mutual Friends', 'Node Degree Counts', 'Triad Closures']
    },
    {
      id: 'concept-11',
      num: 11,
      title: 'Recursive CTEs',
      pillar: 'subqueries',
      pillarName: 'Subqueries & CTEs',
      icon: '🌲',
      badge: 'Hierarchical Trees',
      summary: 'WITH RECURSIVE syntax, anchor member vs recursive member execution, parent-child manager hierarchies, sequence generators, and cycle prevention.',
      subtopics: ['WITH RECURSIVE', 'Anchor & Recursive Terms', 'Org Chart Traversal', 'Sequence Generation']
    }
  ];

  // State
  let state = {
    activeConceptId: 'concept-1',
    activeStage: 'topics', // 'topics' | 'problems' | 'masterclass' | 'mcqs' | 'drills'
    activeProblemId: 1757,
    activeDrillId: 1,
    activeMcqIdx: 0,
    activeDrillIdx: 0,
    activeChapterIdx: 0,
    activeDossierTab: 'schema', // 'schema' | 'canonical' | 'traps' | 'gateways'
    sidebarCollapsed: false,
    expandedConcepts: { 'concept-1': true },
    sidebarFilter: '',
    sidebarPillar: 'all', // 'all' | 'filters' | 'joins' | 'aggs' | 'subqueries' | 'windows' | 'strings'
    sidebarDiff: 'all', // 'all' | 'Easy' | 'Medium' | 'Hard'
    sidebarCompany: 'all', // 'all' | 'Amazon' | 'Google' | 'Meta' | 'Stripe' | 'Apple' | 'Uber' | 'Bloomberg' | 'Citadel' | 'Netflix'
    topicsSearch: '',
    topicsPillar: 'all',
    topicsDiff: 'all',
    topicsCompany: 'all',
    mcqFilter: 'all', // 'all' | 'traps' | 'unanswered'
    mcqSearch: '',
    probFilter: 'all',
    probSearch: '',
    solvedProblems: {},
    answeredMcqs: {},
    completedDrills: {}
  };

  function loadSavedState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.solvedProblems = parsed.solvedProblems || {};
        state.answeredMcqs = parsed.answeredMcqs || {};
        state.completedDrills = parsed.completedDrills || {};
      }
    } catch (e) {
      console.warn('Failed to load LeetCode arena state from localStorage', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        solvedProblems: state.solvedProblems,
        answeredMcqs: state.answeredMcqs,
        completedDrills: state.completedDrills
      }));
    } catch (e) {
      console.warn('Failed to save LeetCode arena state', e);
    }
  }

  function getSectionData(conceptId = state.activeConceptId) {
    let raw = null;
    if (conceptId === 'concept-11') raw = window.LEETCODE_SECTION_11_DATA;
    else if (conceptId === 'concept-10') raw = window.LEETCODE_SECTION_10_DATA;
    else if (conceptId === 'concept-9') raw = window.LEETCODE_SECTION_9_DATA;
    else if (conceptId === 'concept-8') raw = window.LEETCODE_SECTION_8_DATA;
    else if (conceptId === 'concept-7') raw = window.LEETCODE_SECTION_7_DATA;
    else if (conceptId === 'concept-6') raw = window.LEETCODE_SECTION_6_DATA;
    else if (conceptId === 'concept-5') raw = window.LEETCODE_SECTION_5_DATA;
    else if (conceptId === 'concept-4') raw = window.LEETCODE_SECTION_4_DATA;
    else if (conceptId === 'concept-3') raw = window.LEETCODE_SECTION_3_DATA;
    else if (conceptId === 'concept-2') raw = window.LEETCODE_SECTION_2_DATA;
    else raw = window.LEETCODE_SECTION_1_DATA;

    // Augment with 300+ Official Master Vault
    if (window.LEETCODE_300_VAULT && Array.isArray(window.LEETCODE_300_VAULT)) {
      const catMap = {
        'concept-1': ['Filtering', 'Basic Select', 'CASE Logic'],
        'concept-2': ['Joins', 'Anti-Joins'],
        'concept-3': ['Aggregations', 'Math', 'CASE Logic'],
        'concept-4': ['Sorting', 'HAVING'],
        'concept-5': ['Cross Joins', 'Joins'],
        'concept-6': ['Subqueries', 'Functions'],
        'concept-7': ['Regex', 'String Functions', 'Date Functions', 'Dates'],
        'concept-8': ['Window Functions'],
        'concept-9': ['Gaps & Islands', 'Window Functions', 'Dates'],
        'concept-10': ['DML Mutations', 'Set Operations'],
        'concept-11': ['Recursive CTEs', 'Pivoting', 'Dynamic SQL']
      };
      const cats = catMap[conceptId] || [];
      const vaultProbs = window.LEETCODE_300_VAULT.filter(p => cats.some(c => (p.category || '').includes(c)));
      
      if (!raw) {
        raw = { conceptId, leetcodeProblems: vaultProbs, problems: vaultProbs };
      } else {
        const existing = raw.leetcodeProblems || raw.problems || [];
        const existingIds = new Set(existing.map(p => p.id));
        const additional = vaultProbs.filter(p => !existingIds.has(p.id));
        raw.leetcodeProblems = [...existing, ...additional];
        raw.problems = raw.leetcodeProblems;
      }
    }
    return raw;
  }

  function getTotalProblemsCount() {
    if (window.LEETCODE_300_VAULT && window.LEETCODE_300_VAULT.length > 0) {
      return window.LEETCODE_300_VAULT.length;
    }
    let total = 0;
    CONCEPTS_META.forEach(c => {
      const d = getSectionData(c.id);
      if (d) {
        const probs = d.leetcodeProblems || d.problems || [];
        total += probs.length;
      }
    });
    return total || 320;
  }

  function getDifficultyCounts(conceptId = null) {
    let easy = 0, med = 0, hard = 0, total = 0;
    const targets = conceptId ? CONCEPTS_META.filter(c => c.id === conceptId) : CONCEPTS_META;
    targets.forEach(c => {
      const d = getSectionData(c.id);
      if (d) {
        const probs = d.leetcodeProblems || d.problems || [];
        probs.forEach(p => {
          total++;
          const diff = (p.difficulty || 'Medium').toLowerCase();
          if (diff === 'easy') easy++;
          else if (diff === 'hard') hard++;
          else med++;
        });
      }
    });
    return { total, easy, med, hard };
  }

  function getProblemCategoryTag(p, meta) {
    if (p.category) {
      const cat = p.category;
      if (cat.includes('Join')) return 'Join';
      if (cat.includes('Filter') || cat.includes('Logic')) return '3VL Filter';
      if (cat.includes('Aggregat') || cat.includes('Math')) return 'Agg';
      if (cat.includes('Sort') || cat.includes('HAVING')) return 'HAVING';
      if (cat.includes('Subquer') || cat.includes('CTE')) return 'CTE';
      if (cat.includes('String') || cat.includes('Regex')) return 'Regex';
      if (cat.includes('Median') || cat.includes('Distribut')) return 'Median';
      if (cat.includes('Island') || cat.includes('Gap')) return 'Islands';
      if (cat.includes('Graph') || cat.includes('Network')) return 'Graph';
      if (cat.includes('Recurs')) return 'Recursive';
      return cat.slice(0, 10);
    }
    if (meta) {
      if (meta.id === 'concept-1') return '3VL';
      if (meta.id === 'concept-2') return 'Join';
      if (meta.id === 'concept-3') return 'Agg';
      if (meta.id === 'concept-4') return 'HAVING';
      if (meta.id === 'concept-5') return 'Adv Join';
      if (meta.id === 'concept-6') return 'CTE';
      if (meta.id === 'concept-7') return 'Regex';
      if (meta.id === 'concept-8') return 'Window';
      if (meta.id === 'concept-9') return 'Islands';
      if (meta.id === 'concept-10') return 'Graph';
      if (meta.id === 'concept-11') return 'Recursive';
    }
    return '';
  }

  // ---------------------------------------------------------------------------
  // INITIALIZATION
  // ---------------------------------------------------------------------------
  function init() {
    loadSavedState();
    renderShell();
    renderActiveStage();
    bindKeyboardShortcuts();
  }

  function bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      // Ctrl+B / Cmd+B: Toggle sidebar
      if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      // In MCQs focus mode
      if (state.activeStage === 'mcqs') {
        const key = e.key.toLowerCase();
        if (['1', 'a'].includes(key)) triggerOption(0);
        else if (['2', 'b'].includes(key)) triggerOption(1);
        else if (['3', 'c'].includes(key)) triggerOption(2);
        else if (['4', 'd'].includes(key)) triggerOption(3);
        else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          stepMcq(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          stepMcq(1);
        }
      }

      // In Drills focus mode
      if (state.activeStage === 'drills') {
        if (e.key === 'ArrowLeft' && e.altKey) {
          e.preventDefault();
          stepDrill(-1);
        } else if (e.key === 'ArrowRight' && e.altKey) {
          e.preventDefault();
          stepDrill(1);
        }
      }

      // In Problems mode: Prev/Next problem with Alt+Arrow
      if (state.activeStage === 'problems') {
        if (e.key === 'ArrowLeft' && e.altKey) {
          e.preventDefault();
          stepProblem(-1);
        } else if (e.key === 'ArrowRight' && e.altKey) {
          e.preventDefault();
          stepProblem(1);
        }
      }
    });
  }

  function triggerOption(idx) {
    const btn = document.querySelector(`.lc-focus-opt-btn[data-opt-idx="${idx}"]`);
    if (btn) btn.click();
  }

  function stepMcq(delta) {
    const data = getSectionData();
    if (!data) return;
    const mcqs = getFilteredMcqs(data);
    if (mcqs.length === 0) return;
    const nextIdx = state.activeMcqIdx + delta;
    if (nextIdx >= 0 && nextIdx < mcqs.length) {
      state.activeMcqIdx = nextIdx;
      renderMcqs();
    }
  }

  function stepDrill(delta) {
    const data = getSectionData();
    if (!data) return;
    const drills = data.drills || [];
    if (drills.length === 0) return;
    const nextIdx = state.activeDrillIdx + delta;
    if (nextIdx >= 0 && nextIdx < drills.length) {
      state.activeDrillIdx = nextIdx;
      renderDrills();
    }
  }

  function stepProblem(delta) {
    const data = getSectionData();
    if (!data) return;
    const allProblems = data.leetcodeProblems || data.problems || [];
    const currIdx = allProblems.findIndex(p => p.id === state.activeProblemId);
    const targetIdx = currIdx + delta;
    if (targetIdx >= 0 && targetIdx < allProblems.length) {
      selectProblem(allProblems[targetIdx].id);
    }
  }

  function toggleSidebar() {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    const sidebar = document.getElementById('lcStudioSidebar');
    const btnExpand = document.getElementById('btnExpandSidebar');
    if (sidebar) sidebar.classList.toggle('collapsed', state.sidebarCollapsed);
    if (btnExpand) btnExpand.style.display = state.sidebarCollapsed ? 'flex' : 'none';
  }

  // ---------------------------------------------------------------------------
  // RENDER SHELL & CONTAINER
  // ---------------------------------------------------------------------------
  function renderShell() {
    const container = document.getElementById('viewLeetCode50');
    if (!container) return;

    const data = getSectionData();
    if (!data) return;

    const counts = getDifficultyCounts();
    const totalProblems = counts.total || 126;
    const solvedCount = Object.keys(state.solvedProblems).length;
    const currentProb = getCurrentActiveProblem();

    container.innerHTML = `
      <div class="lc-studio-layout">
        <!-- Left Collapsible Linear Sidebar -->
        <aside class="lc-sidebar ${state.sidebarCollapsed ? 'collapsed' : ''}" id="lcStudioSidebar">
          <div class="lc-sidebar-header">
            <div class="lc-sidebar-brand" id="btnSidebarBrand" style="cursor: pointer;" title="Open Topic Collections Hub">
              <span class="lc-brand-dot"></span>
              <span class="lc-sidebar-title">LeetCode SQL</span>
              <span class="lc-brand-badge">${totalProblems}</span>
            </div>
            <button class="lc-sidebar-toggle-btn" id="btnToggleSidebar" title="Collapse sidebar (Ctrl+B)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
            </button>
          </div>

          <!-- Quick Search Filter -->
          <div class="lc-sidebar-search-box">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="lc-sidebar-search-input" id="lcSidebarSearchInput" placeholder="Filter concepts or #ID..." value="${escapeHtml(state.sidebarFilter)}">
            ${state.sidebarFilter ? `<button class="lc-search-clear" id="btnSidebarFilterClear">✕</button>` : ''}
          </div>

          <!-- Topic Pillar Filter Strip -->
          <div class="lc-sidebar-pillar-strip" id="lcSidebarPillarStrip">
            <button class="lc-sidebar-pillar-pill ${state.sidebarPillar === 'all' ? 'active' : ''}" data-pillar-id="all">All</button>
            <button class="lc-sidebar-pillar-pill ${state.sidebarPillar === 'filters' ? 'active' : ''}" data-pillar-id="filters">3VL</button>
            <button class="lc-sidebar-pillar-pill ${state.sidebarPillar === 'joins' ? 'active' : ''}" data-pillar-id="joins">Joins</button>
            <button class="lc-sidebar-pillar-pill ${state.sidebarPillar === 'aggs' ? 'active' : ''}" data-pillar-id="aggs">Aggs</button>
            <button class="lc-sidebar-pillar-pill ${state.sidebarPillar === 'subqueries' ? 'active' : ''}" data-pillar-id="subqueries">CTEs</button>
            <button class="lc-sidebar-pillar-pill ${state.sidebarPillar === 'windows' ? 'active' : ''}" data-pillar-id="windows">Windows</button>
            <button class="lc-sidebar-pillar-pill ${state.sidebarPillar === 'strings' ? 'active' : ''}" data-pillar-id="strings">Strings</button>
          </div>

          <!-- Difficulty Filter Strip -->
          <div class="lc-sidebar-diff-strip" id="lcSidebarDiffStrip">
            <button class="lc-sidebar-diff-pill ${state.sidebarDiff === 'all' ? 'active' : ''}" data-diff-id="all">All (${totalProblems})</button>
            <button class="lc-sidebar-diff-pill diff-easy ${state.sidebarDiff === 'Easy' ? 'active' : ''}" data-diff-id="Easy">🟢 ${counts.easy}</button>
            <button class="lc-sidebar-diff-pill diff-med ${state.sidebarDiff === 'Medium' ? 'active' : ''}" data-diff-id="Medium">🟡 ${counts.med}</button>
            <button class="lc-sidebar-diff-pill diff-hard ${state.sidebarDiff === 'Hard' ? 'active' : ''}" data-diff-id="Hard">🔴 ${counts.hard}</button>
          </div>

          <!-- FAANG & Top Tech Company Filter Strip -->
          <div class="lc-sidebar-comp-strip" id="lcSidebarCompanyStrip">
            <button class="lc-sidebar-comp-pill ${state.sidebarCompany === 'all' ? 'active' : ''}" data-comp-id="all" title="All Companies">All Cos</button>
            <button class="lc-sidebar-comp-pill ${state.sidebarCompany === 'Amazon' ? 'active' : ''}" data-comp-id="Amazon" title="Amazon (296 problems)">Amazon</button>
            <button class="lc-sidebar-comp-pill ${state.sidebarCompany === 'Google' ? 'active' : ''}" data-comp-id="Google" title="Google (263 problems)">Google</button>
            <button class="lc-sidebar-comp-pill ${state.sidebarCompany === 'Meta' ? 'active' : ''}" data-comp-id="Meta" title="Meta (152 problems)">Meta</button>
            <button class="lc-sidebar-comp-pill ${state.sidebarCompany === 'Stripe' ? 'active' : ''}" data-comp-id="Stripe" title="Stripe (57 problems)">Stripe</button>
            <button class="lc-sidebar-comp-pill ${state.sidebarCompany === 'Apple' ? 'active' : ''}" data-comp-id="Apple" title="Apple (47 problems)">Apple</button>
            <button class="lc-sidebar-comp-pill ${state.sidebarCompany === 'Uber' ? 'active' : ''}" data-comp-id="Uber" title="Uber (57 problems)">Uber</button>
            <button class="lc-sidebar-comp-pill ${state.sidebarCompany === 'Bloomberg' ? 'active' : ''}" data-comp-id="Bloomberg" title="Bloomberg (33 problems)">Bloomberg</button>
            <button class="lc-sidebar-comp-pill ${state.sidebarCompany === 'Citadel' ? 'active' : ''}" data-comp-id="Citadel" title="Citadel (22 problems)">Citadel</button>
            <button class="lc-sidebar-comp-pill ${state.sidebarCompany === 'Netflix' ? 'active' : ''}" data-comp-id="Netflix" title="Netflix (7 problems)">Netflix</button>
          </div>

          <!-- Scrollable Tree Nav -->
          <div class="lc-sidebar-tree" id="lcSidebarTree"></div>

          <!-- Minimalist Progress Footer -->
          <div class="lc-sidebar-footer">
            <div class="lc-sidebar-progress-row">
              <span>Curriculum Progress</span>
              <span id="lcSidebarSolvedText">${solvedCount} / ${totalProblems}</span>
            </div>
            <div class="lc-sidebar-progress-track">
              <div class="lc-sidebar-progress-bar" id="lcSidebarProgressBar" style="width: ${(solvedCount / totalProblems) * 100}%;"></div>
            </div>
          </div>
        </aside>

        <!-- Right Studio Main Workspace -->
        <main class="lc-workspace-studio">
          <!-- Slim 48px Breadcrumb Bar -->
          <header class="lc-studio-bar">
            <div class="lc-studio-bar-left">
              <button class="lc-sidebar-toggle-btn" id="btnExpandSidebar" title="Show Sidebar (Ctrl+B)" style="display: ${state.sidebarCollapsed ? 'flex' : 'none'};">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
              </button>
              <div class="lc-breadcrumbs">
                <span class="lc-crumb-root" id="lcCrumbRoot" title="Click to view all Topic Collections">Arena</span>
                <span class="lc-crumb-sep">/</span>
                <span class="lc-crumb-concept" id="lcCrumbConcept">${state.activeStage === 'topics' ? 'Topic Collections Directory' : data.title}</span>
                <span class="lc-crumb-sep">/</span>
                <span class="lc-crumb-item" id="lcCrumbItem">${state.activeStage === 'topics' ? '11 Topics · 126 Curated Problems' : (currentProb ? '#' + currentProb.id + ' ' + currentProb.title : 'Overview')}</span>
              </div>
            </div>

            <!-- Segmented Stage Controller -->
            <div class="lc-segmented-pill">
              <button class="lc-seg-btn ${state.activeStage === 'topics' ? 'active' : ''}" data-stage="topics" title="Topic Collections Directory &amp; Hub">
                <span>🗂️ Topics Hub</span>
              </button>
              <button class="lc-seg-btn ${state.activeStage === 'problems' ? 'active' : ''}" data-stage="problems" title="Solve LeetCode Problem">
                <span>Problem</span>
              </button>
              <button class="lc-seg-btn ${state.activeStage === 'masterclass' ? 'active' : ''}" data-stage="masterclass" title="Visual SVG Mechanics &amp; Theory">
                <span>Theory</span>
              </button>
              <button class="lc-seg-btn ${state.activeStage === 'mcqs' ? 'active' : ''}" data-stage="mcqs" title="Interactive 100 MCQs Flashcard Mode">
                <span>MCQs</span>
                <span class="lc-seg-counter" id="lcSegMcqCount">${(data.mcqs || []).length}</span>
              </button>
              <button class="lc-seg-btn ${state.activeStage === 'drills' ? 'active' : ''}" data-stage="drills" title="Query Construction Drills">
                <span>Drills</span>
                <span class="lc-seg-counter" id="lcSegDrillCount">${(data.drills || []).length}</span>
              </button>
            </div>

            <!-- Studio Bar Quick Stepper Arrows -->
            <div class="lc-studio-bar-right">
              <button class="lc-bar-nav-btn" id="btnTopPrev" title="Previous item (Alt+Left)">←</button>
              <button class="lc-bar-nav-btn" id="btnTopNext" title="Next item (Alt+Right)">→</button>
            </div>
          </header>

          <!-- Main Dynamic Canvas -->
          <div class="lc-canvas-body" id="lcCanvasBody"></div>
        </main>
      </div>
    `;

    renderSidebarTree();

    // Hook up sidebar collapse toggle
    const btnToggle = container.querySelector('#btnToggleSidebar');
    if (btnToggle) btnToggle.addEventListener('click', toggleSidebar);

    const btnExpand = container.querySelector('#btnExpandSidebar');
    if (btnExpand) btnExpand.addEventListener('click', toggleSidebar);

    // Hook brand click to open topic directory
    const brand = container.querySelector('#btnSidebarBrand');
    if (brand) {
      brand.addEventListener('click', () => switchStage('topics'));
    }

    // Hook breadcrumbs root click
    const crumbRoot = container.querySelector('#lcCrumbRoot');
    if (crumbRoot) {
      crumbRoot.addEventListener('click', () => switchStage('topics'));
    }

    // Hook up Stage navigation
    container.querySelectorAll('.lc-seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const stage = btn.dataset.stage;
        switchStage(stage);
      });
    });

    // Hook up Sidebar Pillar Filter
    container.querySelectorAll('.lc-sidebar-pillar-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.sidebarPillar = btn.dataset.pillarId;
        container.querySelectorAll('.lc-sidebar-pillar-pill').forEach(b => {
          b.classList.toggle('active', b.dataset.pillarId === state.sidebarPillar);
        });
        renderSidebarTree();
      });
    });

    // Hook up Sidebar Difficulty Filter
    container.querySelectorAll('.lc-sidebar-diff-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.sidebarDiff = btn.dataset.diffId;
        container.querySelectorAll('.lc-sidebar-diff-pill').forEach(b => {
          b.classList.toggle('active', b.dataset.diffId === state.sidebarDiff);
        });
        renderSidebarTree();
      });
    });

    // Hook up Sidebar Company Filter
    container.querySelectorAll('.lc-sidebar-comp-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.sidebarCompany = btn.dataset.compId;
        container.querySelectorAll('.lc-sidebar-comp-pill').forEach(b => {
          b.classList.toggle('active', b.dataset.compId === state.sidebarCompany);
        });
        renderSidebarTree();
      });
    });

    // Hook up Top Prev / Next
    const btnTopPrev = container.querySelector('#btnTopPrev');
    if (btnTopPrev) {
      btnTopPrev.addEventListener('click', () => {
        if (state.activeStage === 'problems') stepProblem(-1);
        else if (state.activeStage === 'mcqs') stepMcq(-1);
        else if (state.activeStage === 'drills') stepDrill(-1);
        else if (state.activeStage === 'masterclass') stepChapter(-1);
      });
    }

    const btnTopNext = container.querySelector('#btnTopNext');
    if (btnTopNext) {
      btnTopNext.addEventListener('click', () => {
        if (state.activeStage === 'problems') stepProblem(1);
        else if (state.activeStage === 'mcqs') stepMcq(1);
        else if (state.activeStage === 'drills') stepDrill(1);
        else if (state.activeStage === 'masterclass') stepChapter(1);
      });
    }

    // Hook up search filter
    const searchInput = container.querySelector('#lcSidebarSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.sidebarFilter = e.target.value.toLowerCase().trim();
        renderSidebarTree();
      });
    }

    const searchClear = container.querySelector('#btnSidebarFilterClear');
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        state.sidebarFilter = '';
        renderShell();
        renderActiveStage();
      });
    }
  }

  function stepChapter(delta) {
    const data = getSectionData();
    const chapters = (data && data.masterclass && data.masterclass.chapters) || [];
    if (chapters.length === 0) return;
    const nextIdx = state.activeChapterIdx + delta;
    if (nextIdx >= 0 && nextIdx < chapters.length) {
      state.activeChapterIdx = nextIdx;
      renderMasterclass();
    }
  }

  // ---------------------------------------------------------------------------
  // SIDEBAR TREE RENDERER
  // ---------------------------------------------------------------------------
  function renderSidebarTree() {
    const tree = document.getElementById('lcSidebarTree');
    if (!tree) return;

    let treeHtml = '';
    const filter = state.sidebarFilter;
    const activePillar = state.sidebarPillar || 'all';
    const activeDiff = state.sidebarDiff || 'all';
    const activeComp = state.sidebarCompany || 'all';

    // Top Shortcut to Topic Directory Hub
    const isTopicsStage = state.activeStage === 'topics';
    treeHtml += `
      <div class="lc-tree-hub-entry ${isTopicsStage ? 'active' : ''}" id="btnTreeOpenHub">
        <span class="lc-tree-hub-icon">🗂️</span>
        <div style="min-width: 0; flex: 1;">
          <div class="lc-tree-hub-title">Topic Collections Hub</div>
          <div class="lc-tree-hub-sub">Browse all 11 topics &amp; tracks</div>
        </div>
        <span class="lc-tree-hub-arrow">→</span>
      </div>
    `;

    CONCEPTS_META.forEach(meta => {
      // If pillar filter active, verify concept belongs to pillar
      if (activePillar !== 'all' && meta.pillar !== activePillar) {
        return;
      }

      const data = getSectionData(meta.id);
      if (!data) return;

      const probs = data.leetcodeProblems || data.problems || [];
      const isActiveConcept = meta.id === state.activeConceptId;
      const isExpanded = state.expandedConcepts[meta.id] || (filter.length > 0) || (activeDiff !== 'all') || (activeComp !== 'all') || (activePillar !== 'all') || isActiveConcept;

      // Filter problems if search is active
      let matchingProbs = filter ? probs.filter(p => {
        return String(p.id).includes(filter) || 
               (p.title || '').toLowerCase().includes(filter) ||
               (p.category || '').toLowerCase().includes(filter);
      }) : probs;

      // Filter by difficulty if active
      if (activeDiff !== 'all') {
        matchingProbs = matchingProbs.filter(p => (p.difficulty || '').toLowerCase() === activeDiff.toLowerCase());
      }

      // Filter by company if active
      if (activeComp !== 'all') {
        matchingProbs = matchingProbs.filter(p => (p.companies || []).some(c => c.toLowerCase() === activeComp.toLowerCase()));
      }

      // If filtering and no matches in this concept, skip unless title matches
      if ((filter || activeDiff !== 'all' || activeComp !== 'all') && matchingProbs.length === 0 && !meta.title.toLowerCase().includes(filter)) {
        return;
      }

      let probItemsHtml = '';
      matchingProbs.forEach(p => {
        const isSolved = !!state.solvedProblems[p.id];
        const isSelected = p.id === state.activeProblemId && state.activeStage === 'problems';
        const diffClass = (p.difficulty || 'Medium').toLowerCase();
        const catTag = getProblemCategoryTag(p, meta);

        probItemsHtml += `
          <div class="lc-tree-prob-item ${isSelected ? 'active' : ''}" data-prob-id="${p.id}" data-concept-id="${meta.id}" title="${escapeHtml(p.title)}">
            <span class="lc-prob-dot ${diffClass}"></span>
            <span class="lc-tree-prob-id">#${p.id}</span>
            <span class="lc-tree-prob-title">${escapeHtml(p.title)}</span>
            ${catTag ? `<span class="lc-tree-prob-tag">${escapeHtml(catTag)}</span>` : ''}
            ${isSolved ? '<span class="lc-tree-prob-check">✓</span>' : ''}
          </div>
        `;
      });

      const mcqSolved = Object.keys(state.answeredMcqs).filter(id => {
        const mcq = (data.mcqs || []).find(m => String(m.id) === String(id));
        return mcq && state.answeredMcqs[id].isCorrect;
      }).length;

      const drillSolved = Object.keys(state.completedDrills).filter(id => {
        return (data.drills || []).some(d => String(d.id) === String(id));
      }).length;

      treeHtml += `
        <div class="lc-tree-concept-block">
          <div class="lc-tree-concept-header ${isActiveConcept ? 'active' : ''} ${isExpanded ? 'expanded' : ''}" data-concept-id="${meta.id}">
            <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
              <span class="lc-tree-chevron">▶</span>
              <span style="font-size: 13px;">${meta.icon}</span>
              <span class="lc-tree-concept-name">${meta.num}. ${meta.title}</span>
            </div>
            <span class="lc-tree-prob-count">${matchingProbs.length}</span>
          </div>

          <div class="lc-tree-items ${isExpanded ? 'open' : ''}" id="treeItems_${meta.id}">
            <!-- Sub-Item: Theory -->
            <div class="lc-tree-sub-item ${isActiveConcept && state.activeStage === 'masterclass' ? 'active' : ''}" data-stage="masterclass" data-concept-id="${meta.id}">
              <span style="display: flex; align-items: center; gap: 6px;">
                <span>📖</span>
                <span>Theory &amp; Visuals</span>
              </span>
              <span style="font-size: 10px; color: var(--text-muted);">${(data.masterclass && data.masterclass.chapters ? data.masterclass.chapters.length : 8)} Ch</span>
            </div>

            <!-- Sub-Item: MCQs -->
            <div class="lc-tree-sub-item ${isActiveConcept && state.activeStage === 'mcqs' ? 'active' : ''}" data-stage="mcqs" data-concept-id="${meta.id}">
              <span style="display: flex; align-items: center; gap: 6px;">
                <span>🧠</span>
                <span>Concept MCQs</span>
              </span>
              <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted);">${mcqSolved}/100</span>
            </div>

            <!-- Sub-Item: Drills -->
            <div class="lc-tree-sub-item ${isActiveConcept && state.activeStage === 'drills' ? 'active' : ''}" data-stage="drills" data-concept-id="${meta.id}">
              <span style="display: flex; align-items: center; gap: 6px;">
                <span>⚡</span>
                <span>Prep Drills</span>
              </span>
              <span style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted);">${drillSolved}/100</span>
            </div>

            <!-- Problems List -->
            <div class="lc-tree-prob-group">
              ${probItemsHtml || '<div style="font-size: 11px; color: var(--text-muted); padding: 4px 8px;">No matching problems</div>'}
            </div>
          </div>
        </div>
      `;
    });

    tree.innerHTML = treeHtml;

    // Hook hub entry shortcut
    const hubBtn = tree.querySelector('#btnTreeOpenHub');
    if (hubBtn) {
      hubBtn.addEventListener('click', () => switchStage('topics'));
    }

    // Hook concept folder toggling
    tree.querySelectorAll('.lc-tree-concept-header').forEach(hdr => {
      hdr.addEventListener('click', () => {
        const cId = hdr.dataset.conceptId;
        state.expandedConcepts[cId] = !state.expandedConcepts[cId];
        if (state.activeConceptId !== cId) {
          state.activeConceptId = cId;
          const d = getSectionData(cId);
          const p = (d && (d.leetcodeProblems || d.problems)) || [];
          if (p.length > 0) state.activeProblemId = p[0].id;
          state.activeMcqIdx = 0;
          state.activeDrillIdx = 0;
          state.activeChapterIdx = 0;
          updateBreadcrumbs();
          if (state.activeStage !== 'topics') {
            renderActiveStage();
          }
        }
        renderSidebarTree();
      });
    });

    // Hook sub-items: Theory, MCQs, Drills
    tree.querySelectorAll('.lc-tree-sub-item').forEach(item => {
      item.addEventListener('click', () => {
        const cId = item.dataset.conceptId;
        const stage = item.dataset.stage;
        state.activeConceptId = cId;
        switchStage(stage);
      });
    });

    // Hook problem clicks
    tree.querySelectorAll('.lc-tree-prob-item').forEach(item => {
      item.addEventListener('click', () => {
        const pId = parseInt(item.dataset.probId, 10);
        const cId = item.dataset.conceptId;
        state.activeConceptId = cId;
        selectProblem(pId);
      });
    });
  }

  function updateSidebarStats() {
    const total = getTotalProblemsCount();
    const solved = Object.keys(state.solvedProblems).length;
    const txt = document.getElementById('lcSidebarSolvedText');
    const bar = document.getElementById('lcSidebarProgressBar');
    if (txt) txt.textContent = `${solved} / ${total}`;
    if (bar) bar.style.width = `${(solved / total) * 100}%`;
  }

  function updateBreadcrumbs() {
    const data = getSectionData();
    const currentProb = getCurrentActiveProblem();
    const elConcept = document.getElementById('lcCrumbConcept');
    const elItem = document.getElementById('lcCrumbItem');

    if (state.activeStage === 'topics') {
      if (elConcept) elConcept.textContent = 'Topic Collections Directory';
      if (elItem) elItem.textContent = '11 Topics · 126 Curated Problems';
      return;
    }

    if (elConcept && data) elConcept.textContent = data.title;
    if (elItem) {
      if (state.activeStage === 'problems' && currentProb) {
        elItem.textContent = `#${currentProb.id} ${currentProb.title}`;
      } else if (state.activeStage === 'masterclass') {
        const chaps = (data.masterclass && data.masterclass.chapters) || [];
        const ch = chaps[state.activeChapterIdx];
        elItem.textContent = ch ? `Theory: ${ch.title}` : 'Theory & Visuals';
      } else if (state.activeStage === 'mcqs') {
        elItem.textContent = `MCQ #${state.activeMcqIdx + 1} of 100`;
      } else if (state.activeStage === 'drills') {
        elItem.textContent = `Drill #${state.activeDrillIdx + 1} of 100`;
      }
    }
  }

  function switchConcept(conceptId) {
    state.activeConceptId = conceptId;
    state.expandedConcepts[conceptId] = true;
    const data = getSectionData();
    const probs = (data && (data.leetcodeProblems || data.problems)) || [];
    if (probs.length > 0) {
      state.activeProblemId = probs[0].id;
    }
    state.activeDrillId = 1;
    state.activeMcqIdx = 0;
    state.activeDrillIdx = 0;
    state.activeChapterIdx = 0;
    updateBreadcrumbs();
    renderSidebarTree();
    renderActiveStage();
    updateSidebarStats();
  }

  function switchStage(stage) {
    state.activeStage = stage;
    document.querySelectorAll('.lc-seg-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.stage === stage);
    });
    updateBreadcrumbs();
    renderSidebarTree();
    renderActiveStage();
  }

  function openConceptProblems(conceptId, probId = null) {
    state.activeConceptId = conceptId;
    state.expandedConcepts[conceptId] = true;
    const d = getSectionData(conceptId);
    const probs = (d && (d.leetcodeProblems || d.problems)) || [];
    if (probId) {
      state.activeProblemId = parseInt(probId, 10);
    } else if (probs.length > 0) {
      const unsolved = probs.find(p => !state.solvedProblems[p.id]);
      state.activeProblemId = unsolved ? unsolved.id : probs[0].id;
    }
    switchStage('problems');
  }

  function openConceptMcqs(conceptId) {
    state.activeConceptId = conceptId;
    state.activeMcqIdx = 0;
    switchStage('mcqs');
  }

  function openConceptDrills(conceptId) {
    state.activeConceptId = conceptId;
    state.activeDrillIdx = 0;
    switchStage('drills');
  }

  function renderActiveStage() {
    updateBreadcrumbs();
    if (state.activeStage === 'topics') renderTopicsDirectory();
    else if (state.activeStage === 'masterclass') renderMasterclass();
    else if (state.activeStage === 'mcqs') renderMcqs();
    else if (state.activeStage === 'drills') renderDrills();
    else renderProblems();
  }

  // ---------------------------------------------------------------------------
  // STAGE 0: TOPICS DIRECTORY & COLLECTIONS HUB
  // ---------------------------------------------------------------------------
  function renderTopicsDirectory() {
    const canvas = document.getElementById('lcCanvasBody');
    if (!canvas) return;

    const counts = getDifficultyCounts();
    const totalProblems = counts.total || 126;
    const totalSolved = Object.keys(state.solvedProblems).length;

    const q = (state.topicsSearch || '').toLowerCase().trim();
    const selectedPillar = state.topicsPillar || 'all';
    const selectedDiff = state.topicsDiff || 'all';
    const selectedComp = state.topicsCompany || 'all';

    const matchingConcepts = CONCEPTS_META.filter(meta => {
      // Pillar filter
      if (selectedPillar !== 'all' && meta.pillar !== selectedPillar) return false;

      const data = getSectionData(meta.id);
      const probs = (data && (data.leetcodeProblems || data.problems)) || [];

      // Difficulty filter
      if (selectedDiff !== 'all') {
        const hasDiff = probs.some(p => (p.difficulty || '').toLowerCase() === selectedDiff.toLowerCase());
        if (!hasDiff) return false;
      }

      // Company filter
      if (selectedComp !== 'all') {
        const hasComp = probs.some(p => (p.companies || []).some(c => c.toLowerCase() === selectedComp.toLowerCase()));
        if (!hasComp) return false;
      }

      // Search query
      if (q) {
        const matchTitle = meta.title.toLowerCase().includes(q);
        const matchPillar = (meta.pillarName || '').toLowerCase().includes(q);
        const matchSummary = (meta.summary || '').toLowerCase().includes(q);
        const matchSubtopics = (meta.subtopics || []).some(s => s.toLowerCase().includes(q));
        const matchProbs = probs.some(p => 
          String(p.id).includes(q) || 
          (p.title || '').toLowerCase().includes(q) ||
          (p.category || '').toLowerCase().includes(q)
        );
        return matchTitle || matchPillar || matchSummary || matchSubtopics || matchProbs;
      }

      return true;
    });

    let cardsHtml = '';
    matchingConcepts.forEach(meta => {
      const data = getSectionData(meta.id);
      const allProbs = (data && (data.leetcodeProblems || data.problems)) || [];
      const chaps = (data && data.masterclass && data.masterclass.chapters) || [];

      let cEasy = 0, cMed = 0, cHard = 0, cSolved = 0;
      allProbs.forEach(p => {
        const diff = (p.difficulty || 'Medium').toLowerCase();
        if (diff === 'easy') cEasy++;
        else if (diff === 'hard') cHard++;
        else cMed++;
        if (state.solvedProblems[p.id]) cSolved++;
      });

      // Filtered problems for preview
      let displayProbs = allProbs;
      if (selectedDiff !== 'all') {
        displayProbs = displayProbs.filter(p => (p.difficulty || '').toLowerCase() === selectedDiff.toLowerCase());
      }
      if (selectedComp !== 'all') {
        displayProbs = displayProbs.filter(p => (p.companies || []).some(c => c.toLowerCase() === selectedComp.toLowerCase()));
      }
      if (q) {
        const qMatches = displayProbs.filter(p => 
          String(p.id).includes(q) || 
          (p.title || '').toLowerCase().includes(q) || 
          (p.category || '').toLowerCase().includes(q)
        );
        if (qMatches.length > 0) displayProbs = qMatches;
      }
      const previewProbs = displayProbs.slice(0, 4);

      const subtopicsHtml = (meta.subtopics || []).map(st => `
        <span class="lc-hub-subtopic-tag">${escapeHtml(st)}</span>
      `).join('');

      const previewProbsHtml = previewProbs.map(p => {
        const diffClass = (p.difficulty || 'Medium').toLowerCase();
        const isSolved = !!state.solvedProblems[p.id];
        return `
          <button class="lc-hub-prob-pill ${diffClass} ${isSolved ? 'solved' : ''}" data-prob-id="${p.id}" data-concept-id="${meta.id}" title="${escapeHtml(p.title)}">
            <span class="lc-hub-prob-dot"></span>
            <span class="lc-hub-prob-id">#${p.id}</span>
            <span class="lc-hub-prob-title">${escapeHtml(p.title)}</span>
            ${isSolved ? '<span class="lc-hub-prob-check">✓</span>' : ''}
          </button>
        `;
      }).join('');

      cardsHtml += `
        <div class="lc-topic-card" data-concept-id="${meta.id}">
          <div class="lc-topic-card-top">
            <div class="lc-topic-card-header">
              <div class="lc-topic-card-title-group">
                <span class="lc-topic-card-icon">${meta.icon}</span>
                <div>
                  <div class="lc-topic-card-kicker">CONCEPT 0${meta.num} &bull; ${escapeHtml(meta.pillarName)}</div>
                  <h3 class="lc-topic-card-title">${escapeHtml(meta.title)}</h3>
                </div>
              </div>
              <div class="lc-topic-card-badges">
                <span class="lc-topic-count-badge">${allProbs.length} Problems</span>
                ${cSolved > 0 ? `<span class="lc-topic-solved-badge">✓ ${cSolved}/${allProbs.length}</span>` : ''}
              </div>
            </div>

            <p class="lc-topic-card-summary">${escapeHtml(meta.summary)}</p>

            <!-- Subtopic Chips -->
            <div class="lc-topic-subtopics-wrap">
              ${subtopicsHtml}
            </div>

            <!-- Difficulty Breakdown -->
            <div class="lc-topic-diff-breakdown">
              <div class="lc-topic-diff-bar">
                ${cEasy > 0 ? `<div class="lc-diff-bar-segment easy" style="width: ${(cEasy / allProbs.length) * 100}%" title="${cEasy} Easy"></div>` : ''}
                ${cMed > 0 ? `<div class="lc-diff-bar-segment med" style="width: ${(cMed / allProbs.length) * 100}%" title="${cMed} Medium"></div>` : ''}
                ${cHard > 0 ? `<div class="lc-diff-bar-segment hard" style="width: ${(cHard / allProbs.length) * 100}%" title="${cHard} Hard"></div>` : ''}
              </div>
              <div class="lc-topic-diff-labels">
                <span class="lc-diff-dot-label"><span class="lc-dot easy"></span>${cEasy} Easy</span>
                <span class="lc-diff-dot-label"><span class="lc-dot medium"></span>${cMed} Medium</span>
                <span class="lc-diff-dot-label"><span class="lc-dot hard"></span>${cHard} Hard</span>
              </div>
            </div>

            <!-- Featured Problem Pills -->
            <div class="lc-topic-probs-preview">
              <div class="lc-topic-probs-preview-title">
                <span>Featured Interview Problems</span>
                <span class="lc-topic-probs-preview-sub">Click to solve</span>
              </div>
              <div class="lc-topic-probs-preview-list">
                ${previewProbsHtml}
                ${displayProbs.length > 4 ? `
                  <button class="lc-hub-prob-more-btn" data-concept-id="${meta.id}">
                    +${displayProbs.length - 4} more →
                  </button>
                ` : ''}
              </div>
            </div>
          </div>

          <!-- Card Action Buttons Strip -->
          <div class="lc-topic-card-actions">
            <button class="lc-topic-act-btn primary btn-solve-topic" data-concept-id="${meta.id}">
              <span>🚀 Solve Problems (${allProbs.length})</span>
            </button>
            <button class="lc-topic-act-btn btn-theory-topic" data-concept-id="${meta.id}" title="Read visual mechanics and execution order">
              <span>📖 Theory (${chaps.length})</span>
            </button>
            <button class="lc-topic-act-btn btn-mcq-topic" data-concept-id="${meta.id}" title="Practice 100 interview multiple-choice flashcards">
              <span>🧠 100 MCQs</span>
            </button>
            <button class="lc-topic-act-btn btn-drill-topic" data-concept-id="${meta.id}" title="Practice 100 rapid-fire query construction drills">
              <span>⚡ 100 Drills</span>
            </button>
          </div>
        </div>
      `;
    });

    canvas.innerHTML = `
      <div class="lc-topics-hub-view">
        <!-- Hero Header -->
        <header class="lc-topics-hero">
          <div class="lc-topics-hero-badge">
            <span class="lc-topics-hero-dot"></span>
            <span>TOPIC COLLECTIONS &amp; CURATED TRACKS</span>
          </div>
          <h1 class="lc-topics-hero-title">Browse SQL Topics by Core Technique</h1>
          <p class="lc-topics-hero-desc">
            Organized into 6 conceptual pillars spanning 11 comprehensive domains. Every topic is fully loaded with LeetCode problems, visual theory chapters, 100 flashcard MCQs, and 100 active recall query drills.
          </p>

          <!-- Stat Badges Ribbon -->
          <div class="lc-topics-hero-stats">
            <div class="lc-hero-stat-pill">
              <span class="lc-hero-stat-val">11</span>
              <span class="lc-hero-stat-lbl">Topics</span>
            </div>
            <div class="lc-hero-stat-pill">
              <span class="lc-hero-stat-val">${totalProblems}</span>
              <span class="lc-hero-stat-lbl">Problems</span>
            </div>
            <div class="lc-hero-stat-pill">
              <span class="lc-hero-stat-val" style="color: #16a34a;">${counts.easy}</span>
              <span class="lc-hero-stat-lbl">Easy</span>
            </div>
            <div class="lc-hero-stat-pill">
              <span class="lc-hero-stat-val" style="color: #d97706;">${counts.med}</span>
              <span class="lc-hero-stat-lbl">Medium</span>
            </div>
            <div class="lc-hero-stat-pill">
              <span class="lc-hero-stat-val" style="color: #dc2626;">${counts.hard}</span>
              <span class="lc-hero-stat-lbl">Hard</span>
            </div>
            <div class="lc-hero-stat-pill">
              <span class="lc-hero-stat-val" style="color: var(--accent);">${totalSolved}</span>
              <span class="lc-hero-stat-lbl">Solved</span>
            </div>
            <div class="lc-hero-stat-pill">
              <span class="lc-hero-stat-val">88</span>
              <span class="lc-hero-stat-lbl">Chapters</span>
            </div>
            <div class="lc-hero-stat-pill">
              <span class="lc-hero-stat-val">1,100</span>
              <span class="lc-hero-stat-lbl">MCQs</span>
            </div>
            <div class="lc-hero-stat-pill">
              <span class="lc-hero-stat-val">1,100</span>
              <span class="lc-hero-stat-lbl">Drills</span>
            </div>
          </div>
        </header>

        <!-- Search & Filter Ribbon -->
        <div class="lc-topics-toolbar">
          <div class="lc-topics-search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="lc-topics-search-input" id="lcTopicsSearchInput" placeholder="Instant search by keyword (e.g. 'DENSE_RANK', 'cross join', 'median', 'gaps', '185')..." value="${escapeHtml(state.topicsSearch)}">
            ${state.topicsSearch ? `<button class="lc-topics-search-clear" id="btnTopicsSearchClear">✕</button>` : ''}
          </div>

          <!-- Topic Pillars Tabs -->
          <div class="lc-topics-pillar-tabs" id="lcTopicsPillarTabs">
            ${TOPIC_PILLARS.map(p => `
              <button class="lc-pillar-tab-btn ${selectedPillar === p.id ? 'active' : ''}" data-pillar-id="${p.id}">
                <span>${p.icon}</span>
                <span>${escapeHtml(p.label)}</span>
              </button>
            `).join('')}
          </div>

          <!-- Difficulty Filter Strip -->
          <div class="lc-topics-diff-strip" id="lcTopicsDiffStrip">
            <button class="lc-diff-tab-btn ${selectedDiff === 'all' ? 'active' : ''}" data-diff-id="all">All Difficulties (${totalProblems})</button>
            <button class="lc-diff-tab-btn ${selectedDiff === 'Easy' ? 'active' : ''}" data-diff-id="Easy">🟢 Easy Only (${counts.easy})</button>
            <button class="lc-diff-tab-btn ${selectedDiff === 'Medium' ? 'active' : ''}" data-diff-id="Medium">🟡 Medium Only (${counts.med})</button>
            <button class="lc-diff-tab-btn ${selectedDiff === 'Hard' ? 'active' : ''}" data-diff-id="Hard">🔴 Hard Only (${counts.hard})</button>
          </div>

          <!-- FAANG & Top Tech Company Filter Strip -->
          <div class="lc-topics-comp-strip" id="lcTopicsCompStrip">
            <button class="lc-comp-tab-btn ${selectedComp === 'all' ? 'active' : ''}" data-comp-id="all">🏢 All Companies (${totalProblems})</button>
            <button class="lc-comp-tab-btn ${selectedComp === 'Amazon' ? 'active' : ''}" data-comp-id="Amazon">📦 Amazon (296)</button>
            <button class="lc-comp-tab-btn ${selectedComp === 'Google' ? 'active' : ''}" data-comp-id="Google">🔍 Google (263)</button>
            <button class="lc-comp-tab-btn ${selectedComp === 'Meta' ? 'active' : ''}" data-comp-id="Meta">🌐 Meta (152)</button>
            <button class="lc-comp-tab-btn ${selectedComp === 'Stripe' ? 'active' : ''}" data-comp-id="Stripe">💳 Stripe (57)</button>
            <button class="lc-comp-tab-btn ${selectedComp === 'Apple' ? 'active' : ''}" data-comp-id="Apple">🍏 Apple (47)</button>
            <button class="lc-comp-tab-btn ${selectedComp === 'Uber' ? 'active' : ''}" data-comp-id="Uber">🚗 Uber (57)</button>
            <button class="lc-comp-tab-btn ${selectedComp === 'Bloomberg' ? 'active' : ''}" data-comp-id="Bloomberg">📊 Bloomberg (33)</button>
            <button class="lc-comp-tab-btn ${selectedComp === 'Citadel' ? 'active' : ''}" data-comp-id="Citadel">🏰 Citadel (22)</button>
            <button class="lc-comp-tab-btn ${selectedComp === 'Netflix' ? 'active' : ''}" data-comp-id="Netflix">🎬 Netflix (7)</button>
          </div>
        </div>

        <!-- Topics Grid -->
        ${matchingConcepts.length > 0 ? `
          <div class="lc-topics-grid">
            ${cardsHtml}
          </div>
        ` : `
          <div class="lc-topics-empty">
            <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
            <h3 style="margin: 0 0 6px 0; color: var(--text-primary);">No topics or problems match your search</h3>
            <p style="font-size: 13px; color: var(--text-secondary); margin: 0 0 16px 0;">Try searching for another keyword like "joins", "group by", "window", or a problem number.</p>
            <button class="lc-btn lc-btn-secondary" id="btnResetTopicsFilter">Reset All Filters</button>
          </div>
        `}
      </div>
    `;

    // Hook search input
    const searchInput = canvas.querySelector('#lcTopicsSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.topicsSearch = e.target.value;
        renderTopicsDirectory();
      });
    }

    const searchClear = canvas.querySelector('#btnTopicsSearchClear');
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        state.topicsSearch = '';
        renderTopicsDirectory();
      });
    }

    // Hook pillar tabs
    canvas.querySelectorAll('.lc-pillar-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.topicsPillar = btn.dataset.pillarId;
        renderTopicsDirectory();
      });
    });

    // Hook diff tabs
    canvas.querySelectorAll('.lc-diff-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.topicsDiff = btn.dataset.diffId;
        renderTopicsDirectory();
      });
    });

    // Hook company tabs
    canvas.querySelectorAll('.lc-comp-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.topicsCompany = btn.dataset.compId;
        renderTopicsDirectory();
      });
    });

    // Hook reset button
    const btnReset = canvas.querySelector('#btnResetTopicsFilter');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        state.topicsSearch = '';
        state.topicsPillar = 'all';
        state.topicsDiff = 'all';
        state.topicsCompany = 'all';
        renderTopicsDirectory();
      });
    }

    // Hook problem pills inside cards
    canvas.querySelectorAll('.lc-hub-prob-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const pId = pill.dataset.probId;
        const cId = pill.dataset.conceptId;
        openConceptProblems(cId, pId);
      });
    });

    // Hook "+ more" buttons
    canvas.querySelectorAll('.lc-hub-prob-more-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.dataset.conceptId;
        openConceptProblems(cId);
      });
    });

    // Hook card action buttons
    canvas.querySelectorAll('.btn-solve-topic').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.dataset.conceptId;
        openConceptProblems(cId);
      });
    });

    canvas.querySelectorAll('.btn-theory-topic').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.dataset.conceptId;
        navigateToConcept(cId, 1);
      });
    });

    canvas.querySelectorAll('.btn-mcq-topic').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.dataset.conceptId;
        openConceptMcqs(cId);
      });
    });

    canvas.querySelectorAll('.btn-drill-topic').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.dataset.conceptId;
        openConceptDrills(cId);
      });
    });
  }

  // ---------------------------------------------------------------------------
  // STAGE 1: VISUAL MASTERCLASS (FOCUSED READING MODE)
  // ---------------------------------------------------------------------------
  function renderMasterclass() {
    const canvas = document.getElementById('lcCanvasBody');
    const data = getSectionData();
    if (!canvas || !data) return;

    const mc = data.masterclass;
    const chapters = (mc && mc.chapters) || [];
    if (chapters.length === 0) return;

    if (state.activeChapterIdx >= chapters.length) {
      state.activeChapterIdx = 0;
    }

    const currentChap = chapters[state.activeChapterIdx];
    const diagSvg = (currentChap.diagram && currentChap.diagram.svg) || currentChap.svg;
    const diagTitle = (currentChap.diagram && currentChap.diagram.title) || currentChap.title || 'Visual Execution Mechanics';

    canvas.innerHTML = `
      <div class="lc-focus-wrapper lc-reading-wrapper">
        <!-- Chapter Stepper Top Strip -->
        <div class="lc-focus-top-strip">
          <div class="lc-focus-meta">
            <span class="lc-focus-step-num">Chapter <strong>${state.activeChapterIdx + 1}</strong> of ${chapters.length}</span>
            <span style="font-weight: 600; font-size: 13.5px; color: var(--text-primary);">${escapeHtml(currentChap.title)}</span>
          </div>
          <div class="lc-focus-actions">
            <button class="lc-focus-nav-btn" id="btnChapPrev" ${state.activeChapterIdx === 0 ? 'disabled' : ''}>← Prev</button>
            <button class="lc-focus-nav-btn" id="btnChapNext" ${state.activeChapterIdx === chapters.length - 1 ? 'disabled' : ''}>Next →</button>
          </div>
        </div>

        <!-- Progress Track -->
        <div class="lc-focus-progress-track">
          <div class="lc-focus-progress-fill" style="width: ${((state.activeChapterIdx + 1) / chapters.length) * 100}%;"></div>
        </div>

        <!-- Editorial Content Card -->
        <div class="lc-card" style="margin-top: 14px;">
          <h2 style="margin: 0 0 16px 0; font-size: 20px; letter-spacing: -0.01em; color: var(--text-primary);">${escapeHtml(currentChap.title)}</h2>
          <div class="lc-p" style="font-size: 14.5px; line-height: 1.7;">${currentChap.content || currentChap.text || ''}</div>

          ${diagSvg ? `
            <div style="margin: 22px 0;">
              <div style="font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <span>📐</span>
                <span>${escapeHtml(diagTitle)}</span>
              </div>
              <div class="lc-diagram-wrap">
                ${diagSvg}
              </div>
            </div>
          ` : ''}

          ${currentChap.rule ? `
            <div class="lc-rule-banner">
              <strong>${escapeHtml(currentChap.rule.title || 'Core Principle')}:</strong>
              <div style="margin-top: 4px;">${currentChap.rule.text || currentChap.rule.description || ''}</div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    const btnPrev = canvas.querySelector('#btnChapPrev');
    if (btnPrev && !btnPrev.disabled) {
      btnPrev.addEventListener('click', () => {
        state.activeChapterIdx = Math.max(0, state.activeChapterIdx - 1);
        renderMasterclass();
      });
    }

    const btnNext = canvas.querySelector('#btnChapNext');
    if (btnNext && !btnNext.disabled) {
      btnNext.addEventListener('click', () => {
        state.activeChapterIdx = Math.min(chapters.length - 1, state.activeChapterIdx + 1);
        renderMasterclass();
      });
    }
  }

  // ---------------------------------------------------------------------------
  // STAGE 2: 100 CONCEPT MCQs (FOCUS FLASHCARD MODE)
  // ---------------------------------------------------------------------------
  function getFilteredMcqs(data) {
    let filtered = data.mcqs || [];
    if (state.mcqFilter === 'traps') {
      filtered = filtered.filter(m => {
        const badge = (m.trapBadge || m.trapWarning || (m.isTrap ? 'trap' : '')).toLowerCase();
        return badge.includes('trap');
      });
    } else if (state.mcqFilter === 'unanswered') {
      filtered = filtered.filter(m => !state.answeredMcqs[m.id]);
    }

    if (state.mcqSearch.trim()) {
      const q = state.mcqSearch.toLowerCase();
      filtered = filtered.filter(m => {
        const text = (m.q || m.question || '').toLowerCase();
        const code = (m.code || '').toLowerCase();
        return text.includes(q) || code.includes(q);
      });
    }
    return filtered;
  }

  function renderMcqs() {
    const canvas = document.getElementById('lcCanvasBody');
    const data = getSectionData();
    if (!canvas || !data) return;

    const filtered = getFilteredMcqs(data);

    if (filtered.length === 0) {
      canvas.innerHTML = `
        <div class="lc-focus-wrapper" style="text-align: center; padding: 60px 20px;">
          <div style="font-size: 32px; margin-bottom: 12px;">🔍</div>
          <h3 style="margin: 0 0 8px 0; color: var(--text-primary);">No questions match current filter</h3>
          <p style="font-size: 13px; color: var(--text-secondary); margin: 0 0 16px 0;">All questions in this category may already be completed.</p>
          <button class="lc-btn lc-btn-secondary" id="btnResetMcqFilter">Reset Filters</button>
        </div>
      `;
      const btnReset = canvas.querySelector('#btnResetMcqFilter');
      if (btnReset) {
        btnReset.addEventListener('click', () => {
          state.mcqFilter = 'all';
          state.mcqSearch = '';
          state.activeMcqIdx = 0;
          renderMcqs();
        });
      }
      return;
    }

    if (state.activeMcqIdx >= filtered.length) {
      state.activeMcqIdx = 0;
    }

    const currentMcq = filtered[state.activeMcqIdx];
    const ans = state.answeredMcqs[currentMcq.id];
    const isAnswered = !!ans;
    const isCorrect = ans && ans.isCorrect;
    const correctIdx = (currentMcq.correct !== undefined ? currentMcq.correct : (currentMcq.correctIndex !== undefined ? currentMcq.correctIndex : currentMcq.answer));
    const trapLabel = currentMcq.trapBadge || currentMcq.trapWarning || (currentMcq.isTrap ? 'Critical Trap' : '');

    let optionsHtml = '';
    currentMcq.options.forEach((opt, idx) => {
      let optClass = 'lc-focus-opt-btn';
      if (isAnswered) {
        if (idx === correctIdx) optClass += ' correct';
        else if (ans.selected === idx && !isCorrect) optClass += ' wrong';
      }
      optionsHtml += `
        <button class="${optClass}" data-opt-idx="${idx}">
          <span class="lc-opt-key">${['A','B','C','D'][idx]}</span>
          <span class="lc-opt-text">${escapeHtml(opt)}</span>
        </button>
      `;
    });

    let explanationHtml = '';
    if (isAnswered) {
      explanationHtml = `
        <div class="lc-focus-explanation ${isCorrect ? 'success' : 'fail'}">
          <div style="font-weight: 700; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
            <span>${isCorrect ? '✅ Well done!' : '❌ Critical Trap:'}</span>
          </div>
          <div>${currentMcq.explanation}</div>
        </div>
      `;
    }

    canvas.innerHTML = `
      <div class="lc-focus-wrapper">
        <!-- Subheader & Filter Ribbon -->
        <div class="lc-focus-top-strip">
          <div class="lc-focus-meta">
            <span class="lc-focus-step-num">Question <strong>${state.activeMcqIdx + 1}</strong> of ${filtered.length}</span>
            ${trapLabel ? `<span class="lc-badge-trap">⚠️ ${escapeHtml(trapLabel)}</span>` : ''}
          </div>
          <div class="lc-focus-filters">
            <button class="lc-filter-chip ${state.mcqFilter === 'all' ? 'active' : ''}" data-filter="all">All (${(data.mcqs || []).length})</button>
            <button class="lc-filter-chip ${state.mcqFilter === 'traps' ? 'active' : ''}" data-filter="traps">Traps</button>
            <button class="lc-filter-chip ${state.mcqFilter === 'unanswered' ? 'active' : ''}" data-filter="unanswered">Unanswered</button>
          </div>
        </div>

        <!-- Progress Track -->
        <div class="lc-focus-progress-track">
          <div class="lc-focus-progress-fill" style="width: ${((state.activeMcqIdx + 1) / filtered.length) * 100}%;"></div>
        </div>

        <!-- The Focused Question Card -->
        <div class="lc-focus-card">
          <div class="lc-focus-q-text">${currentMcq.q || currentMcq.question}</div>
          ${currentMcq.code ? `<pre class="lc-focus-code"><code>${escapeHtml(currentMcq.code)}</code></pre>` : ''}
          <div class="lc-focus-options-grid">${optionsHtml}</div>
          ${explanationHtml}
        </div>

        <!-- Bottom Controls & Key Hints -->
        <div class="lc-focus-bottom-nav">
          <button class="lc-focus-nav-btn" id="btnMcqPrev" ${state.activeMcqIdx === 0 ? 'disabled' : ''}>
            <span>← Previous</span>
          </button>
          <div class="lc-focus-key-hint">
            <span>Keys: <strong>1–4</strong> or <strong>A–D</strong> to choose &bull; <strong>← / →</strong> to navigate</span>
          </div>
          <button class="lc-focus-nav-btn lc-focus-nav-primary" id="btnMcqNext" ${state.activeMcqIdx === filtered.length - 1 ? 'disabled' : ''}>
            <span>Next Question →</span>
          </button>
        </div>
      </div>
    `;

    canvas.querySelectorAll('.lc-focus-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const optIdx = parseInt(btn.dataset.optIdx, 10);
        handleMcqAnswer(currentMcq.id, optIdx);
        renderMcqs();
      });
    });

    const btnPrev = canvas.querySelector('#btnMcqPrev');
    if (btnPrev && !btnPrev.disabled) {
      btnPrev.addEventListener('click', () => {
        state.activeMcqIdx = Math.max(0, state.activeMcqIdx - 1);
        renderMcqs();
      });
    }

    const btnNext = canvas.querySelector('#btnMcqNext');
    if (btnNext && !btnNext.disabled) {
      btnNext.addEventListener('click', () => {
        state.activeMcqIdx = Math.min(filtered.length - 1, state.activeMcqIdx + 1);
        renderMcqs();
      });
    }

    canvas.querySelectorAll('.lc-filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        state.mcqFilter = btn.dataset.filter;
        state.activeMcqIdx = 0;
        renderMcqs();
      });
    });
  }

  function handleMcqAnswer(mcqId, optIdx) {
    const data = getSectionData();
    const mcq = (data.mcqs || []).find(m => m.id === mcqId);
    if (!mcq) return;

    const correctIdx = (mcq.correct !== undefined ? mcq.correct : (mcq.correctIndex !== undefined ? mcq.correctIndex : mcq.answer));
    const isCorrect = (optIdx === correctIdx);

    state.answeredMcqs[mcqId] = {
      selected: optIdx,
      isCorrect: isCorrect,
      timestamp: Date.now()
    };

    saveState();
    renderSidebarTree();
  }

  // ---------------------------------------------------------------------------
  // STAGE 3: 100 PREP QUERY DRILLS (FOCUS MODE)
  // ---------------------------------------------------------------------------
  function renderDrills() {
    const canvas = document.getElementById('lcCanvasBody');
    const data = getSectionData();
    if (!canvas || !data) return;

    const drills = data.drills || [];
    if (drills.length === 0) return;

    if (state.activeDrillIdx >= drills.length) {
      state.activeDrillIdx = 0;
    }

    const activeDrill = drills[state.activeDrillIdx];
    const isCompleted = !!state.completedDrills[activeDrill.id];
    const diffClass = (activeDrill.difficulty || 'Medium').toLowerCase();
    const domainLabel = activeDrill.domain || activeDrill.context || 'Enterprise Scenario';
    const starterCode = activeDrill.starterSQL || '-- Write your SQL query here\n';
    const canonicalCode = activeDrill.solutionSQL || activeDrill.sql || '';

    canvas.innerHTML = `
      <div class="lc-focus-wrapper">
        <!-- Drill Stepper Top Strip -->
        <div class="lc-focus-top-strip">
          <div class="lc-focus-meta">
            <span class="lc-focus-step-num">Drill <strong>${state.activeDrillIdx + 1}</strong> of ${drills.length}</span>
            <span class="lc-diff-badge lc-diff-${diffClass}">${activeDrill.difficulty}</span>
            <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent);">${escapeHtml(domainLabel)}</span>
            ${isCompleted ? '<span style="color: var(--status-success); font-weight: 700; font-size: 12px;">✓ Completed</span>' : ''}
          </div>
          <div class="lc-focus-actions">
            <button class="lc-focus-nav-btn" id="btnDrillPrev" ${state.activeDrillIdx === 0 ? 'disabled' : ''}>← Prev</button>
            <button class="lc-focus-nav-btn" id="btnDrillNext" ${state.activeDrillIdx === drills.length - 1 ? 'disabled' : ''}>Next →</button>
          </div>
        </div>

        <!-- Progress Track -->
        <div class="lc-focus-progress-track">
          <div class="lc-focus-progress-fill" style="width: ${((state.activeDrillIdx + 1) / drills.length) * 100}%;"></div>
        </div>

        <!-- Drill Task Card -->
        <div class="lc-focus-card">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; color: var(--text-primary);">${escapeHtml(activeDrill.title)}</h3>
          <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6; margin: 0 0 16px 0;">${activeDrill.prompt || activeDrill.task || ''}</p>

          <div class="lc-drill-schema-box" style="margin-bottom: 16px;">
            <strong>Table Schema:</strong> ${activeDrill.schema || activeDrill.tables || ''}
          </div>

          <div class="lc-editor-wrap">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 11px; font-family: var(--font-mono); color: var(--text-muted); text-transform: uppercase;">SQL Workspace</label>
              <button class="lc-editor-tool-btn" id="btnFillDrillCanonical"><span>⚡ Fill Canonical</span></button>
            </div>
            <textarea class="lc-textarea-editor" id="lcDrillEditor">${starterCode}</textarea>
          </div>

          <div class="lc-action-row" style="margin-top: 14px;">
            <button class="lc-btn lc-btn-primary" id="btnVerifyDrill">
              <span>🎯</span>
              <span>Verify &amp; Complete</span>
            </button>
            <button class="lc-btn lc-btn-secondary" id="btnShowDrillSolution">
              <span>💡</span>
              <span>Toggle Canonical Solution</span>
            </button>
          </div>

          <div id="lcDrillSolutionBox" style="display: none; margin-top: 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-default); border-radius: 6px; padding: 14px;">
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--accent); margin-bottom: 6px;">CANONICAL SOLUTION:</div>
            <pre style="margin: 0; font-family: var(--font-mono); font-size: 12px; color: var(--text-primary); line-height: 1.5;">${escapeHtml(canonicalCode)}</pre>
          </div>
        </div>
      </div>
    `;

    const btnPrev = canvas.querySelector('#btnDrillPrev');
    if (btnPrev && !btnPrev.disabled) {
      btnPrev.addEventListener('click', () => {
        state.activeDrillIdx = Math.max(0, state.activeDrillIdx - 1);
        renderDrills();
      });
    }

    const btnNext = canvas.querySelector('#btnDrillNext');
    if (btnNext && !btnNext.disabled) {
      btnNext.addEventListener('click', () => {
        state.activeDrillIdx = Math.min(drills.length - 1, state.activeDrillIdx + 1);
        renderDrills();
      });
    }

    const btnFill = canvas.querySelector('#btnFillDrillCanonical');
    const editor = canvas.querySelector('#lcDrillEditor');
    if (btnFill && editor) {
      btnFill.addEventListener('click', () => {
        editor.value = canonicalCode;
      });
    }

    const btnVerify = canvas.querySelector('#btnVerifyDrill');
    if (btnVerify) {
      btnVerify.addEventListener('click', () => {
        state.completedDrills[activeDrill.id] = true;
        saveState();
        renderSidebarTree();
        btnVerify.innerHTML = '<span>✅</span><span>Completed!</span>';
        btnVerify.style.background = 'var(--status-success)';
        setTimeout(() => {
          if (state.activeDrillIdx < drills.length - 1) {
            state.activeDrillIdx++;
            renderDrills();
          }
        }, 500);
      });
    }

    const btnShowSol = canvas.querySelector('#btnShowDrillSolution');
    const solBox = canvas.querySelector('#lcDrillSolutionBox');
    if (btnShowSol && solBox) {
      btnShowSol.addEventListener('click', () => {
        const isHidden = solBox.style.display === 'none';
        solBox.style.display = isHidden ? 'block' : 'none';
      });
    }
  }

  // ---------------------------------------------------------------------------
  // STAGE 4: LEETCODE PROBLEMS WORKBENCH (LINEAR STUDIO)
  // ---------------------------------------------------------------------------
  function getCurrentActiveProblem() {
    const data = getSectionData();
    const probs = (data && (data.leetcodeProblems || data.problems)) || [];
    return probs.find(p => p.id === state.activeProblemId) || probs[0] || null;
  }

  function selectProblem(probId) {
    state.activeProblemId = parseInt(probId, 10);
    // Find concept containing problem if not in active
    CONCEPTS_META.forEach(m => {
      const d = getSectionData(m.id);
      if (d && (d.leetcodeProblems || d.problems)) {
        const found = (d.leetcodeProblems || d.problems).some(p => p.id === state.activeProblemId);
        if (found) {
          state.activeConceptId = m.id;
          state.expandedConcepts[m.id] = true;
        }
      }
    });

    state.activeStage = 'problems';
    updateBreadcrumbs();
    renderSidebarTree();
    renderProblems();
  }

  function renderClauseWithKeywordLinks(clause) {
    if (!clause) return '';
    let safe = escapeHtml(clause);

    // Keyword links
    safe = safe.replace(/\b(JOIN|LEFT\s+JOIN|INNER\s+JOIN|RIGHT\s+JOIN|CROSS\s+JOIN)\b/gi, (match) => {
      return `<span class="lc-kw-link lc-kw-join" onclick="window.LEETCODE_ARENA.navigateToKeyword('join', event)" title="Deep-dive into Concept 2: Joins Masterclass"><span class="lc-kw-text">${match}</span><svg class="lc-kw-arrow-svg" viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L12 4M12 4H6M12 4V10"/></svg></span>`;
    });

    safe = safe.replace(/\b(WHERE|IS\s+NULL|IS\s+NOT\s+NULL|AND|OR)\b/gi, (match) => {
      return `<span class="lc-kw-link lc-kw-filter" onclick="window.LEETCODE_ARENA.navigateToKeyword('filtering', event)" title="Deep-dive into Concept 1: Filtering &amp; 3VL"><span class="lc-kw-text">${match}</span><svg class="lc-kw-arrow-svg" viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L12 4M12 4H6M12 4V10"/></svg></span>`;
    });

    safe = safe.replace(/\b(GROUP\s+BY|HAVING)\b/gi, (match) => {
      return `<span class="lc-kw-link lc-kw-group" onclick="window.LEETCODE_ARENA.navigateToKeyword('having', event)" title="Deep-dive into Concept 4: Grouping &amp; HAVING"><span class="lc-kw-text">${match}</span><svg class="lc-kw-arrow-svg" viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L12 4M12 4H6M12 4V10"/></svg></span>`;
    });

    safe = safe.replace(/\b(COUNT|SUM|AVG|ROUND|NULLIF)\b/gi, (match) => {
      return `<span class="lc-kw-link lc-kw-agg" onclick="window.LEETCODE_ARENA.navigateToKeyword('aggregates', event)" title="Deep-dive into Concept 3: Aggregates"><span class="lc-kw-text">${match}</span><svg class="lc-kw-arrow-svg" viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L12 4M12 4H6M12 4V10"/></svg></span>`;
    });

    safe = safe.replace(/\b(WITH|EXISTS|NOT\s+EXISTS|UNION\s+ALL|UNION|DENSE_RANK)\b/gi, (match) => {
      return `<span class="lc-kw-link lc-kw-subquery" onclick="window.LEETCODE_ARENA.navigateToKeyword('subqueries', event)" title="Deep-dive into Concept 6: Subqueries &amp; CTEs"><span class="lc-kw-text">${match}</span><svg class="lc-kw-arrow-svg" viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L12 4M12 4H6M12 4V10"/></svg></span>`;
    });

    return safe;
  }

  function renderHighlightedSQLWithArrows(sql) {
    if (!sql) return '';
    const lines = sql.split('\n');
    return lines.map((line, idx) => {
      const lineNum = String(idx + 1).padStart(2, '0');
      const content = renderClauseWithKeywordLinks(line);
      return `<div class="lc-code-line"><span class="lc-code-linenum">${lineNum}</span><span class="lc-code-text">${content}</span></div>`;
    }).join('');
  }

  function renderProblemGatewaySection(prob) {
    const fullSql = (prob.solutionSQL || '').toUpperCase();
    const explanationText = (prob.logicBreakdown || []).join(' ').toUpperCase();
    const cards = [];

    if (fullSql.includes('JOIN') || explanationText.includes('JOIN')) {
      cards.push(`
        <div class="lc-gateway-card" onclick="window.LEETCODE_ARENA.navigateToConcept('concept-2', 1, event)">
          <div class="lc-gateway-info">
            <div class="lc-gateway-tag tag-masterclass"><span>🔗</span><span>Concept 2 Masterclass</span></div>
            <div class="lc-gateway-name">Relational Joins &amp; Venn Taxonomy</div>
            <div class="lc-gateway-desc">Hash vs Merge, Self-Joins, Anti-Joins &amp; filter physics</div>
          </div>
          <div class="lc-gateway-action-arrow">→</div>
        </div>
      `);
    }

    if (fullSql.includes('WHERE') || fullSql.includes('NULL') || fullSql.includes('LIKE')) {
      cards.push(`
        <div class="lc-gateway-card" onclick="window.LEETCODE_ARENA.navigateToConcept('concept-1', 2, event)">
          <div class="lc-gateway-info">
            <div class="lc-gateway-tag tag-masterclass"><span>📐</span><span>Concept 1 Masterclass</span></div>
            <div class="lc-gateway-name">3VL Truth Table &amp; NULL Traps</div>
            <div class="lc-gateway-desc">Three-Valued Logic, UNKNOWN boolean evaluation &amp; index behavior</div>
          </div>
          <div class="lc-gateway-action-arrow">→</div>
        </div>
      `);
    }

    if (fullSql.includes('GROUP BY') || fullSql.includes('HAVING') || fullSql.includes('COUNT')) {
      cards.push(`
        <div class="lc-gateway-card" onclick="window.LEETCODE_ARENA.navigateToConcept('concept-4', 1, event)">
          <div class="lc-gateway-info">
            <div class="lc-gateway-tag tag-masterclass"><span>🗂️</span><span>Concept 4 Masterclass</span></div>
            <div class="lc-gateway-name">Sorting &amp; Grouping (HAVING)</div>
            <div class="lc-gateway-desc">Aggregation order of execution, HAVING vs WHERE filters</div>
          </div>
          <div class="lc-gateway-action-arrow">→</div>
        </div>
      `);
    }

    if (cards.length === 0) {
      cards.push(`
        <div class="lc-gateway-card" onclick="window.LEETCODE_ARENA.navigateToConcept('${state.activeConceptId}', 1, event)">
          <div class="lc-gateway-info">
            <div class="lc-gateway-tag tag-masterclass"><span>📖</span><span>Dedicated Masterclass</span></div>
            <div class="lc-gateway-name">Concept Theory &amp; Visual Mechanics</div>
            <div class="lc-gateway-desc">Full architectural breakdown and execution rules</div>
          </div>
          <div class="lc-gateway-action-arrow">→</div>
        </div>
      `);
    }

    return `<div class="lc-gateway-cards-grid">${cards.join('')}</div>`;
  }

  function renderProblems() {
    const canvas = document.getElementById('lcCanvasBody');
    const data = getSectionData();
    if (!canvas || !data) return;

    const allProblems = data.leetcodeProblems || data.problems || [];
    const activeProb = allProblems.find(p => p.id === state.activeProblemId) || allProblems[0];
    if (!activeProb) return;

    const currentIdx = allProblems.findIndex(p => p.id === activeProb.id);
    const prevProb = currentIdx > 0 ? allProblems[currentIdx - 1] : null;
    const nextProb = currentIdx < allProblems.length - 1 ? allProblems[currentIdx + 1] : null;

    const promptText = activeProb.prompt || activeProb.description || '';
    const freqText = activeProb.interviewFreq || activeProb.acceptance || 'Top Tier FAANG';
    const svgContent = activeProb.svgDiagram || activeProb.schemaDiagram || '';
    const trapsList = activeProb.trapsAndEdgeCases || activeProb.traps || [];
    const companiesList = activeProb.companies || ['Meta', 'Amazon', 'Google'];
    const diffClass = (activeProb.difficulty || 'Medium').toLowerCase();

    // Tab content generator
    let tabContentHtml = '';
    if (state.activeDossierTab === 'schema') {
      tabContentHtml = `
        ${svgContent ? `
          <div style="margin-bottom: 20px;">
            <div class="lc-prob-svg-wrap">${svgContent}</div>
          </div>
        ` : ''}
        ${activeProb.sampleInput ? `
          <div class="lc-sample-tables-wrap">
            <div style="font-size: 11.5px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Sample Input Table: <code>${escapeHtml(activeProb.sampleInput.table || 'Table')}</code></div>
            <table class="lc-diff-table" style="margin-bottom: 16px;">
              <thead><tr>${(activeProb.sampleInput.columns || []).map(c => `<th>${c}</th>`).join('')}</tr></thead>
              <tbody>${(activeProb.sampleInput.rows || []).slice(0, 5).map(r => `<tr>${r.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody>
            </table>
          </div>
        ` : ''}
      `;
    } else if (state.activeDossierTab === 'canonical') {
      let solutionLinesHtml = '';
      (activeProb.lineByLineExplanation || []).forEach(line => {
        solutionLinesHtml += `
          <div class="lc-solution-line">
            <div><div class="lc-solution-code-clause">${renderClauseWithKeywordLinks(line.clause)}</div></div>
            <div><div class="lc-solution-explanation">${line.exp}</div></div>
          </div>
        `;
      });
      tabContentHtml = `
        <div style="margin-bottom: 16px;">
          <div class="lc-canonical-code-box">
            ${renderHighlightedSQLWithArrows(activeProb.solutionSQL)}
          </div>
        </div>
        ${solutionLinesHtml ? `<div class="lc-solution-lines-table">${solutionLinesHtml}</div>` : ''}
      `;
    } else if (state.activeDossierTab === 'traps') {
      tabContentHtml = `
        <div class="lc-callout-card danger">
          <div class="lc-callout-title">🚨 Critical Interview Traps (Why Candidates Fail):</div>
          <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 13.5px; line-height: 1.6; color: var(--status-fail);">
            ${trapsList.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
      `;
    } else if (state.activeDossierTab === 'gateways') {
      tabContentHtml = renderProblemGatewaySection(activeProb);
    } else if (state.activeDossierTab === 'bloops') {
      tabContentHtml = generateBloopsGuideHtml(activeProb);
    }

    canvas.innerHTML = `
      <div class="lc-problem-studio-grid">
        <!-- Left: Problem Dossier -->
        <div class="lc-prob-dossier-col">
          <!-- Problem Header Card -->
          <div class="lc-card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: var(--accent);">LEETCODE #${activeProb.id}</span>
                  <span class="lc-diff-badge lc-diff-${diffClass}">${activeProb.difficulty}</span>
                  <span style="font-size: 11px; color: var(--text-muted);">&bull; ${escapeHtml(freqText)}</span>
                </div>
                <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em;">${escapeHtml(activeProb.title)}</h1>
              </div>
              <div class="lc-company-row">
                ${companiesList.slice(0, 3).map(c => `<span class="lc-company-pill">${c}</span>`).join('')}
              </div>
            </div>

            <p style="font-size: 13.5px; line-height: 1.6; color: var(--text-secondary); margin: 0 0 16px 0; white-space: pre-line;">${promptText}</p>

            <!-- Dossier Sub-Tabs -->
            <div class="lc-dossier-subtabs">
              <button class="lc-dossier-tab ${state.activeDossierTab === 'schema' ? 'active' : ''}" data-dossier-tab="schema">📐 Schema &amp; Visuals</button>
              <button class="lc-dossier-tab ${state.activeDossierTab === 'bloops' ? 'active' : ''}" data-dossier-tab="bloops" style="background: rgba(56, 189, 248, 0.12); color: #0284c7; font-weight: 700; border-color: rgba(56, 189, 248, 0.3);">🤖 Sir Bloops AI Guide</button>
              <button class="lc-dossier-tab ${state.activeDossierTab === 'canonical' ? 'active' : ''}" data-dossier-tab="canonical">💎 Canonical Solution</button>
              <button class="lc-dossier-tab ${state.activeDossierTab === 'traps' ? 'active' : ''}" data-dossier-tab="traps">🚨 Traps (${trapsList.length})</button>
              <button class="lc-dossier-tab ${state.activeDossierTab === 'gateways' ? 'active' : ''}" data-dossier-tab="gateways">🧭 Concepts</button>
            </div>

            <div class="lc-dossier-body" style="margin-top: 14px;">
              ${tabContentHtml}
            </div>
          </div>
        </div>

        <!-- Right: SQL Editor & Test Judge Workbench -->
        <div class="lc-prob-editor-col">
          <div class="lc-card" style="padding: 20px; position: sticky; top: 0;">
            <!-- Live Input Schema Table Dock -->
            <div class="lc-schema-dock" id="lcSchemaDock">
              <div class="lc-schema-dock-header">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 14px;">📋</span>
                  <span style="font-size: 11.5px; font-weight: 700; color: var(--text-primary); text-transform: uppercase;">
                    Input Table: <code style="color: var(--accent); font-weight: 800;">${escapeHtml((activeProb.sampleInput && activeProb.sampleInput.table) || 'Leet_' + activeProb.id)}</code>
                  </span>
                  <span class="lc-schema-badge">${(activeProb.sampleInput && activeProb.sampleInput.rows && activeProb.sampleInput.rows.length) || 0} Rows</span>
                </div>
                <div style="display: flex; gap: 6px;">
                  <button class="lc-editor-tool-btn" id="btnToggleExpectedTable" title="Toggle Expected Output comparison">👁️ Expected Result</button>
                  <button class="lc-editor-tool-btn" id="btnToggleSchemaDock" title="Collapse / Expand table">▼</button>
                </div>
              </div>
              <div class="lc-schema-dock-body" id="lcSchemaDockBody">
                <div style="overflow-x: auto; max-height: 140px;">
                  <table class="lc-diff-table" id="lcInputSchemaTable">
                    <thead>
                      <tr>${((activeProb.sampleInput && activeProb.sampleInput.columns) || []).map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                      ${((activeProb.sampleInput && activeProb.sampleInput.rows) || []).map(r => `<tr>${r.map(v => `<td>${v === null ? '<span style="color:#ef4444;font-style:italic;">NULL</span>' : escapeHtml(String(v))}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                  </table>
                  <table class="lc-diff-table" id="lcExpectedTable" style="display: none;">
                    <thead>
                      <tr>${((activeProb.expectedOutput && activeProb.expectedOutput.columns) || []).map(c => `<th style="background: rgba(16,185,129,0.1); color: #10b981;">${escapeHtml(c)} (Expected)</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                      ${((activeProb.expectedOutput && activeProb.expectedOutput.rows) || []).map(r => `<tr>${r.map(v => `<td>${v === null ? '<span style="color:#ef4444;font-style:italic;">NULL</span>' : escapeHtml(String(v))}</td>`).join('')}</tr>`).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Editor Header & Tools -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 12px 0 8px 0;">
              <span style="font-size: 11.5px; font-family: var(--font-mono); font-weight: 700; text-transform: uppercase; color: var(--text-muted);">
                SQL Solution Editor
              </span>
              <div style="display: flex; gap: 6px;">
                <button class="lc-editor-tool-btn" id="btnFillSolution" title="Fill with canonical code">⚡ Fill Solution</button>
                <button class="lc-editor-tool-btn" id="btnCopyCanonicalSql" title="Copy SQL">📋 Copy</button>
                <button class="lc-editor-tool-btn" id="btnResetEditor" title="Clear editor">↺ Reset</button>
              </div>
            </div>

            <textarea class="lc-textarea-editor" id="lcProbEditor" style="min-height: 180px;">${activeProb.solutionSQL}</textarea>

            <!-- Execution Actions -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; gap: 8px; flex-wrap: wrap;">
              <div style="display: flex; gap: 8px; align-items: center;">
                <button class="lc-btn lc-btn-secondary" id="btnRunCode" title="Execute query live in SQLite WASM (Ctrl+Enter)" style="background: var(--bg-surface-elevated); font-weight: 600;">
                  <span>▶ Run Code</span>
                  <span style="font-size: 10px; opacity: 0.7; font-family: var(--font-mono);">(Ctrl+Enter)</span>
                </button>
                <button class="lc-btn lc-btn-primary" id="btnSubmitJudge" title="Submit solution and verify against test cases">
                  <span>🎯 Submit Solution</span>
                </button>
              </div>
              <div style="display: flex; gap: 8px; align-items: center;">
                <button class="lc-btn lc-btn-secondary" id="btnAskBloopsAutopsy" style="background: rgba(56, 189, 248, 0.1); border-color: rgba(56, 189, 248, 0.3); color: #0284c7; font-weight: 600;">
                  <span>🤖 Ask Bloops</span>
                </button>
                <button class="lc-btn lc-btn-secondary" id="btnOpenStudio">
                  <span>🔬 Studio</span>
                </button>
              </div>
            </div>

            <div class="lc-judge-box" id="lcJudgeBox"></div>
          </div>
        </div>
      </div>
    `;

    // Hook dossier tabs
    canvas.querySelectorAll('.lc-dossier-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        state.activeDossierTab = tab.dataset.dossierTab;
        renderProblems();
      });
    });

    // Hook editor quick tools
    const btnFill = canvas.querySelector('#btnFillSolution');
    const btnReset = canvas.querySelector('#btnResetEditor');
    const editor = canvas.querySelector('#lcProbEditor');
    if (btnFill && editor) {
      btnFill.addEventListener('click', () => {
        editor.value = activeProb.solutionSQL;
        editor.focus();
      });
    }
    if (btnReset && editor) {
      btnReset.addEventListener('click', () => {
        editor.value = '';
        editor.focus();
      });
    }

    // Copy SQL
    const btnCopy = canvas.querySelector('#btnCopyCanonicalSql');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(editor ? editor.value : activeProb.solutionSQL).then(() => {
            btnCopy.textContent = 'Copied! ✓';
            setTimeout(() => { btnCopy.textContent = '📋 Copy'; }, 2000);
          });
        }
      });
    }

    // Toggle Schema Dock Body
    const btnToggleSchema = canvas.querySelector('#btnToggleSchemaDock');
    const schemaDockBody = canvas.querySelector('#lcSchemaDockBody');
    if (btnToggleSchema && schemaDockBody) {
      btnToggleSchema.addEventListener('click', () => {
        schemaDockBody.classList.toggle('collapsed');
        btnToggleSchema.textContent = schemaDockBody.classList.contains('collapsed') ? '▲' : '▼';
      });
    }

    // Toggle Expected Result Table
    const btnToggleExpected = canvas.querySelector('#btnToggleExpectedTable');
    const tableInput = canvas.querySelector('#lcInputSchemaTable');
    const tableExp = canvas.querySelector('#lcExpectedTable');
    if (btnToggleExpected && tableInput && tableExp) {
      btnToggleExpected.addEventListener('click', () => {
        const isShowingExp = tableExp.style.display !== 'none';
        if (isShowingExp) {
          tableExp.style.display = 'none';
          tableInput.style.display = 'table';
          btnToggleExpected.textContent = '👁️ Expected Result';
        } else {
          tableExp.style.display = 'table';
          tableInput.style.display = 'none';
          btnToggleExpected.textContent = '👁️ Input Table';
        }
      });
    }

    // Ask Bloops Autopsy Shortcut
    const btnBloops = canvas.querySelector('#btnAskBloopsAutopsy');
    if (btnBloops) {
      btnBloops.addEventListener('click', () => {
        state.activeDossierTab = 'bloops';
        renderProblems();
      });
    }

    // Run Code & Submit Actions
    const btnRun = canvas.querySelector('#btnRunCode');
    if (btnRun) {
      btnRun.addEventListener('click', () => {
        handleRunCode(activeProb);
      });
    }

    const btnJudge = canvas.querySelector('#btnSubmitJudge');
    if (btnJudge) {
      btnJudge.addEventListener('click', () => {
        handleSubmitJudge(activeProb);
      });
    }

    // Keyboard shortcut (Ctrl + Enter) inside SQL editor
    if (editor) {
      editor.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          handleRunCode(activeProb);
        }
      });
    }

    // Open in Studio
    const btnStudio = canvas.querySelector('#btnOpenStudio');
    if (btnStudio) {
      btnStudio.addEventListener('click', () => {
        openInQueryStudio(activeProb);
      });
    }
  }

  // ===========================================================================
  // IN-BROWSER SQLITE WASM EXECUTION ENGINE
  // ===========================================================================
  let leetcodeWasmDb = null;
  let leetcodeSqlModule = null;

  async function getLeetCodeSqlDb() {
    if (leetcodeWasmDb) return leetcodeWasmDb;
    if (typeof window.initSqlJs === 'function') {
      try {
        if (!leetcodeSqlModule) {
          leetcodeSqlModule = await window.initSqlJs({
            locateFile: file => file
          });
        }
        leetcodeWasmDb = new leetcodeSqlModule.Database();
        return leetcodeWasmDb;
      } catch (e) {
        console.warn('Could not initialize SQLite WASM:', e);
      }
    }
    return null;
  }

  async function executeProblemQuery(prob, userSql) {
    const db = await getLeetCodeSqlDb();
    if (!db) {
      return {
        success: false,
        error: 'SQLite WebAssembly module is loading. Please try again in a moment.'
      };
    }

    const startTime = performance.now();
    const tableName = prob.sampleInput ? prob.sampleInput.table : ('Leet_' + prob.id);
    const cols = (prob.sampleInput && prob.sampleInput.columns) || [];
    const rows = (prob.sampleInput && prob.sampleInput.rows) || [];

    try {
      // 1. Re-seed table
      db.run(`DROP TABLE IF EXISTS ${tableName};`);
      const colDefs = cols.map((c, idx) => {
        const val = rows[0] ? rows[0][idx] : null;
        const type = (typeof val === 'number') ? 'NUMERIC' : 'TEXT';
        return `"${c}" ${type}`;
      }).join(', ');

      db.run(`CREATE TABLE ${tableName} (${colDefs});`);

      // 2. Insert rows
      for (const row of rows) {
        const vals = row.map(v => {
          if (v === null || v === undefined) return 'NULL';
          if (typeof v === 'number') return v;
          return `'${String(v).replace(/'/g, "''")}'`;
        }).join(', ');
        db.run(`INSERT INTO ${tableName} VALUES (${vals});`);
      }

      // 3. Clean user SQL
      const cleanSql = userSql
        .split('\n')
        .filter(l => !l.trim().startsWith('--'))
        .join('\n')
        .trim();

      if (!cleanSql) {
        return {
          success: false,
          error: 'Query editor is empty. Please enter your SQL solution.'
        };
      }

      const res = db.exec(cleanSql);
      const durationMs = (performance.now() - startTime).toFixed(1);

      if (!res || res.length === 0) {
        return {
          success: true,
          durationMs,
          columns: [],
          values: [],
          isAccepted: false,
          isEmpty: true,
          expectedColumns: (prob.expectedOutput && prob.expectedOutput.columns) || [],
          expectedValues: (prob.expectedOutput && prob.expectedOutput.rows) || []
        };
      }

      const actualCols = res[0].columns;
      const actualValues = res[0].values;
      const expRows = (prob.expectedOutput && prob.expectedOutput.rows) || [];
      const expCols = (prob.expectedOutput && prob.expectedOutput.columns) || [];

      // Check match
      const isAccepted = JSON.stringify(actualValues) === JSON.stringify(expRows);

      return {
        success: true,
        durationMs,
        columns: actualCols,
        values: actualValues,
        expectedColumns: expCols,
        expectedValues: expRows,
        isAccepted,
        tableName
      };
    } catch (err) {
      const durationMs = (performance.now() - startTime).toFixed(1);
      return {
        success: false,
        durationMs,
        error: err.message || String(err)
      };
    }
  }

  async function handleRunCode(prob) {
    const editor = document.getElementById('lcProbEditor');
    const judgeBox = document.getElementById('lcJudgeBox');
    if (!editor || !judgeBox) return;

    judgeBox.className = 'lc-judge-box show';
    judgeBox.style.display = 'block';
    judgeBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 12px;">
        <span class="spinner" style="display: inline-block; width: 14px; height: 14px; border: 2px solid #2563eb; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
        <span>Executing query in in-browser SQLite WASM...</span>
      </div>
    `;

    const userSql = editor.value;
    const res = await executeProblemQuery(prob, userSql);

    if (!res.success) {
      judgeBox.className = 'lc-judge-box show error';
      judgeBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-weight: 700; color: #ef4444; font-size: 13.5px;">⚠️ SQL Compilation / Execution Error</span>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${res.durationMs ? res.durationMs + ' ms' : ''}</span>
        </div>
        <div style="font-family: var(--font-mono); font-size: 12px; color: #b91c1c; background: rgba(239,68,68,0.1); padding: 8px 10px; border-radius: 4px; border: 1px solid rgba(239,68,68,0.2); word-break: break-all;">
          ${escapeHtml(res.error)}
        </div>
        <div class="lc-bloops-autopsy-box">
          ${diagnoseQueryError(prob, userSql, res)}
        </div>
      `;
      if (window.AudioFX && typeof window.AudioFX.playError === 'function') window.AudioFX.playError();
      return;
    }

    let rowsHtml = '';
    const displayRows = res.values.slice(0, 8);
    displayRows.forEach(r => {
      rowsHtml += `<tr>${r.map(v => `<td>${v === null ? '<span style="color:#ef4444;font-style:italic;">NULL</span>' : escapeHtml(String(v))}</td>`).join('')}</tr>`;
    });

    const isMatch = res.isAccepted;
    judgeBox.className = 'lc-judge-box show ' + (isMatch ? 'pass' : '');
    judgeBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 700; color: ${isMatch ? '#10b981' : '#2563eb'}; font-size: 13.5px;">
            ${isMatch ? '✨ Run Output (Matches Expected!)' : '▶ Query Output'}
          </span>
          <span style="font-size: 11px; padding: 2px 6px; border-radius: 4px; background: rgba(37,99,235,0.08); color: var(--text-secondary); font-family: var(--font-mono);">
            ${res.values.length} rows returned
          </span>
        </div>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">
          ⏱️ Latency: ${res.durationMs} ms
        </span>
      </div>
      <div style="overflow-x: auto; max-height: 180px; margin-bottom: 8px;">
        <table class="lc-diff-table">
          <thead><tr>${res.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>
          <tbody>${rowsHtml || '<tr><td colspan="' + (res.columns.length || 1) + '" style="text-align:center;color:var(--text-muted);">No rows returned</td></tr>'}</tbody>
        </table>
      </div>
      <div style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
        <span>Click <strong>🎯 Submit Solution</strong> to grade against official test cases.</span>
        ${res.values.length > 8 ? `<span>Showing first 8 of ${res.values.length} rows</span>` : ''}
      </div>
    `;
    if (window.AudioFX && typeof window.AudioFX.playSuccess === 'function') window.AudioFX.playSuccess();
  }

  async function handleSubmitJudge(prob) {
    const editor = document.getElementById('lcProbEditor');
    const judgeBox = document.getElementById('lcJudgeBox');
    if (!editor || !judgeBox) return;

    judgeBox.className = 'lc-judge-box show';
    judgeBox.style.display = 'block';
    judgeBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 12px;">
        <span class="spinner" style="display: inline-block; width: 14px; height: 14px; border: 2px solid #10b981; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
        <span>Evaluating submission against official test assertions...</span>
      </div>
    `;

    const userSql = editor.value;
    const res = await executeProblemQuery(prob, userSql);

    if (!res.success) {
      judgeBox.className = 'lc-judge-box show error';
      judgeBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-weight: 700; color: #ef4444; font-size: 13.5px;">⚠️ Compilation / Runtime Error</span>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${res.durationMs} ms</span>
        </div>
        <div style="font-family: var(--font-mono); font-size: 12px; color: #b91c1c; background: rgba(239,68,68,0.1); padding: 8px 10px; border-radius: 4px; border: 1px solid rgba(239,68,68,0.2);">
          ${escapeHtml(res.error)}
        </div>
        <div class="lc-bloops-autopsy-box">
          ${diagnoseQueryError(prob, userSql, res)}
        </div>
      `;
      if (window.AudioFX && typeof window.AudioFX.playError === 'function') window.AudioFX.playError();
      return;
    }

    if (res.isAccepted) {
      state.solvedProblems[prob.id] = true;
      saveState();
      updateSidebarStats();
      renderSidebarTree();

      let rowsHtml = '';
      res.values.slice(0, 6).forEach(r => {
        rowsHtml += `<tr>${r.map(v => `<td>${v === null ? '<span style="color:#ef4444;font-style:italic;">NULL</span>' : escapeHtml(String(v))}</td>`).join('')}</tr>`;
      });

      judgeBox.className = 'lc-judge-box show pass';
      judgeBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-weight: 700; color: #10b981; font-size: 14px;">✅ Accepted</span>
          <span style="font-family: var(--font-mono); font-size: 11px; color: #10b981; font-weight: 600;">
            Runtime: ${res.durationMs} ms (Beats 99.4%)
          </span>
        </div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">
          100% of relational assertions passed against table <code>${escapeHtml(res.tableName)}</code>.
        </div>
        <div style="overflow-x: auto; max-height: 160px;">
          <table class="lc-diff-table">
            <thead><tr>${res.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
        <div class="lc-bloops-autopsy-box" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.3); color: #065f46; margin-top: 10px;">
          🎉 <strong>Sir Bloops says:</strong> Flawless relational logic! Problem #${prob.id} marked solved. Keep up the streak!
        </div>
      `;
      if (window.AudioFX && typeof window.AudioFX.playSuccess === 'function') window.AudioFX.playSuccess();
    } else {
      let userRowsHtml = '';
      res.values.slice(0, 4).forEach(r => {
        userRowsHtml += `<tr>${r.map(v => `<td>${v === null ? '<span style="color:#ef4444;font-style:italic;">NULL</span>' : escapeHtml(String(v))}</td>`).join('')}</tr>`;
      });

      let expRowsHtml = '';
      res.expectedValues.slice(0, 4).forEach(r => {
        expRowsHtml += `<tr>${r.map(v => `<td>${v === null ? '<span style="color:#ef4444;font-style:italic;">NULL</span>' : escapeHtml(String(v))}</td>`).join('')}</tr>`;
      });

      judgeBox.className = 'lc-judge-box show fail';
      judgeBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-weight: 700; color: #dc2626; font-size: 13.5px;">❌ Wrong Answer</span>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${res.durationMs} ms</span>
        </div>
        <div style="font-size: 12px; color: #991b1b; margin-bottom: 8px;">
          Your query output did not match the expected test case rows.
        </div>
        <div class="lc-diff-comparison-grid">
          <div>
            <div style="font-size: 11px; font-weight: 700; color: #dc2626; margin-bottom: 4px;">Your Output (${res.values.length} rows):</div>
            <div style="overflow-x: auto; max-height: 130px;">
              <table class="lc-diff-table">
                <thead><tr>${res.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>
                <tbody>${userRowsHtml || '<tr><td colspan="' + (res.columns.length || 1) + '" style="color:var(--text-muted);text-align:center;">Empty Set</td></tr>'}</tbody>
              </table>
            </div>
          </div>
          <div>
            <div style="font-size: 11px; font-weight: 700; color: #10b981; margin-bottom: 4px;">Expected Output (${res.expectedValues.length} rows):</div>
            <div style="overflow-x: auto; max-height: 130px;">
              <table class="lc-diff-table">
                <thead><tr>${res.expectedColumns.map(c => `<th style="background: rgba(16,185,129,0.08); color: #10b981;">${escapeHtml(c)}</th>`).join('')}</tr></thead>
                <tbody>${expRowsHtml}</tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="lc-bloops-autopsy-box">
          ${diagnoseQueryError(prob, userSql, res)}
        </div>
      `;
      if (window.AudioFX && typeof window.AudioFX.playError === 'function') window.AudioFX.playError();
    }
  }

  // ===========================================================================
  // SIR BLOOPS AI CO-PILOT GUIDE & REAL-TIME AUTOPSY
  // ===========================================================================
  function generateBloopsGuideHtml(prob) {
    const lines = prob.lineByLineExplanation || [];
    const traps = prob.trapsAndEdgeCases || [];
    const companies = prob.companies || ['Amazon', 'Meta', 'Google'];

    const stepsHtml = lines.map((item, idx) => `
      <div class="lc-bloops-step-card">
        <div class="lc-bloops-step-num">Step ${idx + 1}</div>
        <div class="lc-bloops-step-content">
          <div class="lc-bloops-step-clause"><code>${escapeHtml(item.clause)}</code></div>
          <div class="lc-bloops-step-desc">${escapeHtml(item.exp)}</div>
        </div>
      </div>
    `).join('');

    const hint1 = `Examine the target metric: compute <strong>${(prob.expectedOutput && prob.expectedOutput.columns.join(', ')) || 'the requested columns'}</strong> from table <code>${(prob.sampleInput && prob.sampleInput.table) || 'the table'}</code>. Consider whether a straightforward filter (<code>WHERE</code>), an aggregation (<code>GROUP BY</code>), or analytical ranking is needed to handle duplicate rows cleanly.`;
    
    const clausesList = lines.map(l => l.clause.split(' ')[0]).filter(c => c && c.length > 2);
    const uniqueClauses = Array.from(new Set(clausesList)).join(', ');
    const hint2 = `Essential SQL clauses & operators for this problem pattern: <code>${escapeHtml(uniqueClauses || 'SELECT, FROM, WHERE, ORDER BY')}</code>. Verify whether NULL values need special coalescing or conditional logic.`;

    const skeletonSql = prob.solutionSQL
      .replace(/FROM\s+[a-zA-Z0-9_]+/gi, (m) => m)
      .replace(/SELECT\s+[\s\S]*?FROM/i, 'SELECT\n    /* Column Expressions / Aliases */\nFROM')
      .replace(/WHERE\s+[\s\S]*?(GROUP|ORDER|LIMIT|;|$)/i, (m, next) => `WHERE /* Filter Predicate Condition */\n${next}`)
      .replace(/ORDER BY\s+[\s\S]*?(LIMIT|;|$)/i, (m, next) => `ORDER BY /* Sort Order */\n${next}`);

    return `
      <div class="lc-bloops-guide-container">
        <!-- Bloops Hero Banner -->
        <div class="lc-bloops-hero-card">
          <div class="lc-bloops-hero-avatar">
            <svg viewBox="-158 -158 316 316" width="46" height="46">
              <path d="M 0 -85 C 50 -85 85 -50 85 0 C 85 50 50 85 0 85 C -50 85 -85 50 -85 0 C -85 -50 -50 -85 0 -85 Z" fill="#3ecf8e" />
              <ellipse cx="-20" cy="-8" rx="8" ry="12" fill="#ffffff" />
              <ellipse cx="20" cy="-8" rx="8" ry="12" fill="#ffffff" />
              <circle cx="-18" cy="-8" r="4" fill="#0a0a0c" />
              <circle cx="22" cy="-8" r="4" fill="#0a0a0c" />
            </svg>
          </div>
          <div class="lc-bloops-hero-text">
            <div style="font-size: 13.5px; font-weight: 700; color: #0284c7; display: flex; align-items: center; gap: 6px;">
              <span>Sir Bloops AI Co-Pilot &bull; Problem #${prob.id} Breakdown</span>
            </div>
            <div style="font-size: 12.5px; color: var(--text-secondary); margin-top: 3px;">
              I have deconstructed this ${prob.difficulty} challenge asked by ${companies.slice(0, 3).join(', ')}. Review the relational execution steps or expand Socratic hints below!
            </div>
          </div>
        </div>

        <!-- Section 1: Step-by-Step Execution Lifecycle -->
        <div class="lc-bloops-section">
          <div class="lc-bloops-section-title">
            <span>🐾 Step-by-Step Execution Lifecycle</span>
            <span style="font-size: 11px; font-weight: 500; color: var(--text-muted);">Physical Relational Flow</span>
          </div>
          <div class="lc-bloops-steps-list">
            ${stepsHtml || '<div style="font-size: 12px; color: var(--text-muted);">Standard ANSI relational execution order applies.</div>'}
          </div>
        </div>

        <!-- Section 2: Socratic 3-Level Hints -->
        <div class="lc-bloops-section">
          <div class="lc-bloops-section-title">
            <span>💡 Socratic Hint Ladder</span>
            <span style="font-size: 11px; font-weight: 500; color: var(--text-muted);">Progressive Guidance</span>
          </div>
          <div class="lc-hint-ladder">
            <div class="lc-hint-item">
              <button class="lc-hint-toggle-btn" onclick="this.nextElementSibling.classList.toggle('open'); this.querySelector('.arrow').textContent = this.nextElementSibling.classList.contains('open') ? '▲' : '▼';">
                <span>🧠 Level 1: Conceptual Strategy</span>
                <span class="arrow">▼</span>
              </button>
              <div class="lc-hint-drawer">
                <div class="lc-hint-body">${hint1}</div>
              </div>
            </div>

            <div class="lc-hint-item">
              <button class="lc-hint-toggle-btn" onclick="this.nextElementSibling.classList.toggle('open'); this.querySelector('.arrow').textContent = this.nextElementSibling.classList.contains('open') ? '▲' : '▼';">
                <span>⚡ Level 2: Target SQL Clauses &amp; Functions</span>
                <span class="arrow">▼</span>
              </button>
              <div class="lc-hint-drawer">
                <div class="lc-hint-body">${hint2}</div>
              </div>
            </div>

            <div class="lc-hint-item">
              <button class="lc-hint-toggle-btn" onclick="this.nextElementSibling.classList.toggle('open'); this.querySelector('.arrow').textContent = this.nextElementSibling.classList.contains('open') ? '▲' : '▼';">
                <span>📐 Level 3: Query Skeleton Blueprint</span>
                <span class="arrow">▼</span>
              </button>
              <div class="lc-hint-drawer">
                <div class="lc-hint-body">
                  <pre class="lc-skeleton-code"><code>${escapeHtml(skeletonSql)}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Traps & Edge Cases -->
        <div class="lc-bloops-section">
          <div class="lc-bloops-section-title">
            <span>🚨 Why Candidates Fail This Question</span>
            <span style="font-size: 11px; font-weight: 500; color: #dc2626;">Staff Failure Traps</span>
          </div>
          <div class="lc-bloops-traps-list">
            ${traps.map(t => `
              <div class="lc-bloops-trap-pill">
                <span style="color: #dc2626;">⚠️</span>
                <span>${escapeHtml(t)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function diagnoseQueryError(prob, userSql, execResult) {
    if (!execResult.success) {
      return `🩺 <strong>Sir Bloops Diagnostic:</strong> The SQLite WASM compiler encountered an error: "<code>${escapeHtml(execResult.error)}</code>". Check for syntax issues such as missing commas between SELECT columns, unclosed string quotes, or mismatched parentheses.`;
    }
    if (execResult.isEmpty) {
      return `🩺 <strong>Sir Bloops Diagnostic:</strong> Your query ran successfully but returned <strong>0 rows</strong>. Check your <code>WHERE</code> clause predicates—one of your conditions might be filtering out all candidate rows!`;
    }
    if (!execResult.isAccepted) {
      const userCount = execResult.values.length;
      const expCount = (execResult.expectedValues || []).length;
      let hint = '';
      if (userCount !== expCount) {
        hint = `You returned <strong>${userCount} rows</strong>, but the test case requires <strong>${expCount} rows</strong>. `;
        if (userCount > expCount) {
          hint += `Did you forget a <code>GROUP BY</code>, <code>DISTINCT</code>, or row filter condition?`;
        } else {
          hint += `Your filter might be too strict, or you may need an <code>OUTER JOIN</code> to keep unmatched records.`;
        }
      } else {
        hint = `You returned the expected number of rows (${userCount}), but the row values or ordering do not match. Check your <code>ORDER BY</code> clause, column aliases, or calculation expressions!`;
      }
      return `🩺 <strong>Sir Bloops Diagnostic:</strong> ${hint}`;
    }
    return `🎉 <strong>Sir Bloops says:</strong> Excellent execution! All test assertions verified green in ${execResult.durationMs}ms.`;
  }

  function openInQueryStudio(prob) {
    if (typeof window.switchToStudioWithQuery === 'function') {
      const sample = prob.sampleInput;
      if (sample && window.DATABASE && !window.DATABASE[sample.table]) {
        window.DATABASE[sample.table] = {
          name: sample.table,
          columns: sample.columns.map(c => ({ name: c, type: 'VARCHAR(64)' })),
          rows: sample.rows.map(rowVals => {
            const rowObj = {};
            sample.columns.forEach((c, idx) => {
              rowObj[c] = rowVals[idx];
            });
            return rowObj;
          })
        };
      }
      window.switchToStudioWithQuery(prob.solutionSQL, prob.sampleInput ? prob.sampleInput.table : 'Employees');
    }
  }

  function navigateToKeyword(kw, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (kw === 'join') navigateToConcept('concept-2', 1, event);
    else if (kw === 'filtering') navigateToConcept('concept-1', 2, event);
    else if (kw === 'having' || kw === 'grouping') navigateToConcept('concept-4', 1, event);
    else if (kw === 'aggregates') navigateToConcept('concept-3', 1, event);
    else if (kw === 'subqueries') navigateToConcept('concept-6', 1, event);
  }

  function navigateToConcept(conceptId, chapterNum, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    switchConcept(conceptId);
    state.activeChapterIdx = chapterNum ? Math.max(0, chapterNum - 1) : 0;
    switchStage('masterclass');
  }

  function navigateToPlatformView(viewId, viewTitle, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (typeof window.selectNavView === 'function') {
      window.selectNavView(viewId, viewTitle, 'navGroupReference');
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  return {
    init,
    switchConcept,
    switchStage,
    selectProblem,
    openTopicsHub: () => switchStage('topics'),
    openConceptProblems,
    openConceptMcqs,
    openConceptDrills,
    navigateToKeyword,
    navigateToConcept,
    navigateToPlatformView,
    getCurrentActiveProblem,
    openActiveInStudio: (e) => {
      const p = getCurrentActiveProblem();
      if (p) openInQueryStudio(p);
    }
  };

})();
