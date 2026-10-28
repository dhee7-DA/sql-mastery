/**
 * SQL MASTERY VISUALIZER - FAANG MOCK INTERVIEW SCREEN ENGINE (FEATURE #2)
 * ------------------------------------------------------------------------
 * Simulates real-world Staff / Senior engineering follow-up interviews
 * from Tier-1 tech giants (Meta, Google, Netflix, Uber, Stripe).
 * 
 * Tests whether candidates understand distributed scale-ups, memory limits,
 * 3-valued logic edge cases, concurrency deadlocks, and B+Tree cursor mechanics.
 */

(function(window) {
  'use strict';

  const STORAGE_KEY = 'sql_mastery_faang_evals';

  function loadSavedEvaluations() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveEvaluation(caseId, optionKey, score) {
    try {
      const evals = loadSavedEvaluations();
      evals[caseId] = {
        selected: optionKey,
        score: score,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(evals));
    } catch (e) {
      console.warn('Failed to save FAANG evaluation to localStorage', e);
    }
  }

  /**
   * Archetype questions mapping based on query characteristics and clauses.
   */
  function generateFollowUpScenario(caseId, targetQuery, table, context) {
    const q = (targetQuery || '').trim();
    const cleanTable = table || 'records';
    
    const hasWindow = /\bOVER\s*\(/i.test(q) || /\b(RANK|DENSE_RANK|ROW_NUMBER|LEAD|LAG|NTILE)\b/i.test(q);
    const hasAgg = /\bGROUP\s+BY\b/i.test(q) || /\bCOUNT\s*\(\s*DISTINCT\b/i.test(q);
    const hasNullOr3VL = /\bNOT\s+IN\b/i.test(q) || /!=|<>/i.test(q) || /\bIS\s+(NOT\s+)?NULL\b/i.test(q);
    const hasJoin = /\bJOIN\b/i.test(q);

    // 1. WINDOW FUNCTION OVERFLOW & TIE COLLISION (Meta E6)
    if (hasWindow) {
      return {
        type: 'WINDOW_PARTITION_OOM',
        companyTag: 'Meta E6 Staff Systems',
        avatar: '👨‍💻',
        title: 'Staff Scale-Up: 250M Records Window Partition OOM & Tie Invariance',
        interviewerQuote: `Great work on getting the window framing query functionally correct for our staging dataset. Now imagine this runs against our production table (${cleanTable}) containing 250,000,000 rows. A single high-volume tenant has 35,000,000 rows in their partition. During the window sort pass, the query crashes with: 'Out of memory while allocating sort buffer'. Furthermore, two events share identical millisecond timestamps. How do you re-architect this query and schema for zero memory spills and deterministic idempotency?`,
        options: [
          {
            key: 'A',
            badge: 'L4 Pitfall',
            verdict: 'REJECTED',
            gradeClass: 'verdict-rejected',
            title: 'Increase Sort Buffer RAM & Rely on Non-Deterministic Tie-Break',
            description: `Instruct DBA to increase 'sort_buffer_size' or 'windowing_buffer_size' to 16GB globally across all database nodes, letting MySQL/Postgres handle the large partition in RAM.`,
            critique: `❌ <strong>Rejected (L4 Junior Pitfall):</strong> Increasing global sort buffer causes severe memory amplification. If 20 concurrent requests hit the database, the engine attempts to allocate 20 × 16GB = 320GB RAM, immediately triggering the Linux OOM Killer and hard-crashing the primary database. Furthermore, without a secondary unique tie-breaker (like UUID or monotonic ID), rows with matching timestamps produce non-deterministic ranks across page requests, corrupting downstream pagination.`,
            xp: 0
          },
          {
            key: 'B',
            badge: 'L6 Staff Pass',
            verdict: 'STAFF ACCEPTED',
            gradeClass: 'verdict-accepted',
            title: 'Bounded Keyset Partitioning + Composite Monotonic Tie-Breaker',
            description: `Introduce a deterministic secondary tie-breaker in the ORDER BY clause ((ORDER BY event_time DESC, event_id DESC)). Partition data physically into time-bounded buckets (e.g. daily shards) and stream top-N results via bounded window scans.`,
            critique: `✅ <strong>Accepted (L6 Staff Grade):</strong> Flawless systems architecture. Adding 'event_id DESC' guarantees mathematical determinism across all replica nodes regardless of storage engine sorting stability. Time-bucket sharding restricts the working set of each partition to L3 cache / buffer pool limits, ensuring zero temp-table disk spills with O(log N) B+Tree index traversal.`,
            codeSnippet: `-- Production-grade Deterministic Window Partition\nSELECT \n  tenant_id, event_id, event_time, payload,\n  ROW_NUMBER() OVER (\n    PARTITION BY tenant_id, date_bucket \n    ORDER BY event_time DESC, event_id DESC\n  ) AS deterministic_rank\nFROM ${cleanTable}\nWHERE date_bucket = CURRENT_DATE\nLIMIT 100;`,
            xp: 100
          },
          {
            key: 'C',
            badge: 'E5 Trade-off',
            verdict: 'SUB-OPTIMAL',
            gradeClass: 'verdict-warning',
            title: 'Client-Side In-Memory Ranking in Backend Microservice',
            description: `Remove the window function from SQL entirely. Fetch all 35M rows unranked over network stream into Node.js/Go and sort in application heap memory.`,
            critique: `⚠️ <strong>Sub-optimal (E5 Inefficient Trade-off):</strong> While this protects the database sort buffer, streaming 35,000,000 rows saturates the network switch (10Gbps egress bottleneck) and exhausts V8 heap memory (causing Node.js heap out of memory). Application-layer sorting should only be done on pre-filtered small result sets (< 50,000 rows).`,
            xp: 45
          }
        ]
      };
    }

    // 2. DATA SKEW & DISTRIBUTED AGGREGATION HOTSPOT (Uber Staff Systems)
    if (hasAgg) {
      return {
        type: 'SKEW_HOTSPOT_AGGREGATION',
        companyTag: 'Uber Staff Data Platform',
        avatar: '🏎️',
        title: 'Staff Scale-Up: Distributed Hash-Aggregate Hotspot & Zipfian Skew',
        interviewerQuote: `Your aggregate query works cleanly on uniform synthetic data. But in real-time dispatch, 85% of all rides occur in 3 mega-cities (NYC, London, SF). When this GROUP BY runs across our distributed cluster (Trino / Citus / Vitess), the 3 worker nodes responsible for those 3 city keys redline at 100% CPU and run out of memory, while the other 60 worker nodes sit idle. How do you solve this severe distributed data skew?`,
        options: [
          {
            key: 'A',
            badge: 'L4 Pitfall',
            verdict: 'REJECTED',
            gradeClass: 'verdict-rejected',
            title: 'Over-Provision Worker Node Hardware (Vertical Scaling)',
            description: `Upgrade all 64 worker nodes in the cluster to AWS memory-optimized instances (128 vCPUs, 512GB RAM) so that even the skewed node does not run out of memory.`,
            critique: `❌ <strong>Rejected (L4 Cloud Anti-pattern):</strong> This inflates AWS cloud infrastructure costs by 800% ($25,000+/mo) while doing zero to address the algorithmic flaw. The job's total latency remains throttled by the slowest single worker (Amdahl's Law), leaving 95% of cluster capacity idle.`,
            xp: 0
          },
          {
            key: 'B',
            badge: 'L6 Staff Pass',
            verdict: 'STAFF ACCEPTED',
            gradeClass: 'verdict-accepted',
            title: 'Two-Stage Salted Aggregation (MapReduce Parallel Scatter-Gather)',
            description: `Salting: Append a synthetic pseudo-random modulus salt (e.g. MOD(id, 16)) to the group key in Phase 1 to disperse data evenly across all 64 workers, then run a lightweight secondary roll-up aggregation without the salt.`,
            critique: `✅ <strong>Accepted (L6 Staff Grade):</strong> The industry standard distributed system pattern for breaking Zipfian distribution skew. Phase 1 parallelizes the heavy heavy-hitter keys across all workers uniformly. Phase 2 receives only 16 pre-aggregated intermediate rows per city, executing in sub-5ms with zero memory pressure.`,
            codeSnippet: `-- Two-Stage Salted Aggregation for Zero Skew\nWITH phase1_salted AS (\n  SELECT \n    city_id,\n    MOD(driver_id, 16) AS salt_shard,\n    COUNT(*) AS partial_rides,\n    SUM(fare_amount) AS partial_revenue\n  FROM ${cleanTable}\n  GROUP BY city_id, MOD(driver_id, 16)\n)\nSELECT \n  city_id,\n  SUM(partial_rides) AS total_rides,\n  SUM(partial_revenue) AS total_revenue\nFROM phase1_salted\nGROUP BY city_id;`,
            xp: 100
          },
          {
            key: 'C',
            badge: 'E5 Trade-off',
            verdict: 'SUB-OPTIMAL',
            gradeClass: 'verdict-warning',
            title: 'Split into Two Hardcoded Queries (Skewed vs Normal)',
            description: `Maintain an explicit whitelist of skewed cities. Execute one query for the top 3 cities with custom limits, and a separate query for all other cities, combining them with UNION ALL.`,
            critique: `⚠️ <strong>Sub-optimal (E5 Fragile Trade-off):</strong> Introduces technical debt and fragile domain assumptions. If a new city experiences sudden demand surge (e.g. World Cup in Miami), your hardcoded whitelist fails silently, bringing the cluster back down. Code must handle dynamic skew natively.`,
            xp: 50
          }
        ]
      };
    }

    // 3. THREE-VALUED LOGIC & NULL SEMANTIC TRAP (Stripe L5 Staff Ledger)
    if (hasNullOr3VL) {
      return {
        type: 'THREE_VALUED_LOGIC_NULL_TRAP',
        companyTag: 'Stripe L5 Staff Ledger Infra',
        avatar: '💳',
        title: 'Staff Trap: Three-Valued Logic, NOT IN Traps & Silent Ledger Corruptions',
        interviewerQuote: `In financial ledgers, precision and correctness are paramount. Suppose someone alters a subquery to: 'WHERE account_id NOT IN (SELECT account_id FROM suspended_merchants)'. If 'suspended_merchants' contains even a single record where 'account_id IS NULL', what is the exact boolean evaluation behavior under ANSI SQL, and what catastrophic bug occurs in production?`,
        options: [
          {
            key: 'A',
            badge: 'L4 Pitfall',
            verdict: 'REJECTED',
            gradeClass: 'verdict-rejected',
            title: 'SQL Automatically Skips NULLs; Only Matches Valid IDs',
            description: `Under ANSI SQL, NULL values are treated as false and discarded, so the NOT IN clause safely checks all valid merchant IDs without issue.`,
            critique: `❌ <strong>Rejected (L4 Catastrophic Misconception):</strong> Under ANSI SQL Three-Valued Logic (3VL), comparing ANY value to NULL via equality yields UNKNOWN. Since NOT IN expands to: '(id != 1) AND (id != 2) AND (id != NULL)', the condition evaluates to: 'TRUE AND TRUE AND UNKNOWN = UNKNOWN'. In a WHERE clause, UNKNOWN is treated as FALSE. Consequently, the query returns ZERO rows! All merchant payouts in the company freeze silently!`,
            xp: 0
          },
          {
            key: 'B',
            badge: 'L6 Staff Pass',
            verdict: 'STAFF ACCEPTED',
            gradeClass: 'verdict-accepted',
            title: 'Refactor to NOT EXISTS with 2-Valued Boolean Semi-Anti Join',
            description: `Replace NOT IN with NOT EXISTS (or explicitly enforce IS NOT NULL in the subquery). NOT EXISTS uses two-valued boolean logic and short-circuits on the first match.`,
            critique: `✅ <strong>Accepted (L6 Staff Grade):</strong> Rock-solid production engineering. NOT EXISTS evaluates subquery row existence using 2VL (either a matching row exists or it does not), completely immune to NULL contamination. Furthermore, query optimizers convert NOT EXISTS into a high-performance Anti-Join, leveraging covering B+Tree index seeks.`,
            codeSnippet: `-- NULL-Safe Production Anti-Join\nSELECT a.account_id, a.balance\nFROM ${cleanTable} a\nWHERE NOT EXISTS (\n  SELECT 1 \n  FROM suspended_merchants s \n  WHERE s.account_id = a.account_id\n);`,
            xp: 100
          },
          {
            key: 'C',
            badge: 'E5 Trade-off',
            verdict: 'SUB-OPTIMAL',
            gradeClass: 'verdict-warning',
            title: 'Wrap Subquery in COALESCE(account_id, 0) Dummy Fallback',
            description: `Keep the NOT IN clause, but sanitize nulls using COALESCE(account_id, 0) or -1 so that no literal NULL ever enters the set.`,
            critique: `⚠️ <strong>Sub-optimal (E5 Index Invalidation):</strong> While functionally preventing the 3VL empty-set bug, wrapping columns in functions (or relying on magic sentinel numbers like 0 or -1) invalidates standard B+Tree indexes unless a functional expression index is explicitly created. It also risks collision if 0 is ever a valid account identifier.`,
            xp: 50
          }
        ]
      };
    }

    // 4. HIGH CONCURRENCY JOIN CONTENTION & DEADLOCKS (Google L6 Systems)
    if (hasJoin) {
      return {
        type: 'JOIN_DEADLOCK_CONCURRENCY',
        companyTag: 'Google L6 Database Systems',
        avatar: '🔍',
        title: 'Staff Scale-Up: 50,000 QPS Join Lock Contention & Read-Replica Lag',
        interviewerQuote: `This relational join executes 50,000 times per second across our microservices. Simultaneously, an event ingestion stream executes thousands of concurrent UPDATEs and INSERTs on the child table. Under REPEATABLE READ isolation, what physical database locking issues will this query cause, and how do you design an architecture for sub-10ms latency with zero write blocking?`,
        options: [
          {
            key: 'A',
            badge: 'L4 Pitfall',
            verdict: 'REJECTED',
            gradeClass: 'verdict-rejected',
            title: 'Add SELECT ... FOR UPDATE Lock Hints Across Joined Tables',
            description: `Ensure complete data consistency by acquiring exclusive row and gap locks on both parent and child tables during the join query execution.`,
            critique: `❌ <strong>Rejected (L4 System Halting Defect):</strong> In a high-throughput system (50k QPS), acquiring exclusive write locks during read queries causes catastrophic deadlock cascades, halts all concurrent ingestion streams, and exhausts the database connection pool in seconds.`,
            xp: 0
          },
          {
            key: 'B',
            badge: 'L6 Staff Pass',
            verdict: 'STAFF ACCEPTED',
            gradeClass: 'verdict-accepted',
            title: 'MVCC Read-Replica Routing + Covering B+Tree Hash Join Projections',
            description: `Route high-frequency analytical reads to auto-scaled Read Replicas using MVCC non-blocking snapshot isolation. Add covering composite indexes on foreign keys to satisfy query purely from RAM index leaf pages.`,
            critique: `✅ <strong>Accepted (L6 Staff Grade):</strong> Elite systems design. Offloading to read replicas completely decouples transactional ingestion from read latency. With covering indexes (Index-Only Scan), the engine reads directly from the buffer pool without secondary table page lookups, completely eliminating row lock contention.`,
            codeSnippet: `-- Covering Index for Lock-Free High-Throughput Join\n-- Index satisfies join condition AND projection columns directly\nCREATE INDEX idx_${cleanTable}_join_cover \nON ${cleanTable} (foreign_key_id, created_at) \nINCLUDE (status, amount);`,
            xp: 100
          },
          {
            key: 'C',
            badge: 'E5 Trade-off',
            verdict: 'SUB-OPTIMAL',
            gradeClass: 'verdict-warning',
            title: 'Lower Isolation Level to READ UNCOMMITTED Globally',
            description: `Change the global transaction isolation level to READ UNCOMMITTED (Dirty Reads) so that no shared locks or gap locks are ever taken.`,
            critique: `⚠️ <strong>Sub-optimal (E5 Dangerous Trade-off):</strong> While eliminating lock wait time, READ UNCOMMITTED exposes application clients to dirty reads, phantom reads, and uncommitted rolled-back writes, leading to financial discrepancies and ghost records in customer dashboards.`,
            xp: 40
          }
        ]
      };
    }

    // 5. DEEP OFFSET FILESORT VS KEYSET CURSOR (Netflix Principal Data Engine)
    return {
      type: 'DEEP_OFFSET_KEYSET_SCALE',
      companyTag: 'Netflix Principal Data Platform',
      avatar: '🎬',
      title: 'Staff Scale-Up: 500M Row Deep Offset Filesort vs Keyset Seek Pagination',
      interviewerQuote: `In our streaming catalog table (${cleanTable}) with 500,000,000 records, mobile users scroll through paginated feeds. When a client requests page 25,000 (e.g. 'OFFSET 500000 LIMIT 20'), query latency shoots from 4ms to 11.2 seconds, pegging disk IOPS at 100%. Explain the internal engine mechanics of why OFFSET degrades linearly (O(N)), and present the Staff-level production architecture.`,
      options: [
        {
          key: 'A',
          badge: 'L4 Pitfall',
          verdict: 'REJECTED',
          gradeClass: 'verdict-rejected',
          title: 'Increase Temporary Table & Sort Buffer Sizes in MySQL Config',
          description: `Tune server parameters 'tmp_table_size' and 'max_heap_table_size' to 4GB so the 500,000 offset rows are sorted entirely in memory instead of disk.`,
          critique: `❌ <strong>Rejected (L4 Superficial Fix):</strong> This does not change the algorithmic complexity. The storage engine still must traverse and inspect 500,020 B+Tree index entries and discard the first 500,000. Under concurrent user scrolling, the server runs out of memory rapidly while p99 latency continues to deteriorate as offset depth increases.`,
          xp: 0
        },
        {
          key: 'B',
          badge: 'L6 Staff Pass',
          verdict: 'STAFF ACCEPTED',
          gradeClass: 'verdict-accepted',
          title: 'Keyset / Cursor Pagination (Seek Method via Composite Index)',
          description: `Replace OFFSET with cursor seek: 'WHERE (created_at, id) < (:last_created_at, :last_id) ORDER BY created_at DESC, id DESC LIMIT 20'. The engine jumps directly to the exact B+Tree leaf page in O(log N) constant time.`,
          critique: `✅ <strong>Accepted (L6 Staff Grade):</strong> The gold standard for production web scale pagination. By using a composite index on '(created_at, id)', the storage engine performs a single B+Tree point seek to the exact boundary cursor and scans only the 20 requested rows, guaranteeing flat <5ms p99 latency whether fetching page 1 or page 1,000,000.`,
          codeSnippet: `-- Keyset (Seek Method) Cursor Pagination\n-- O(log N) constant time seek, zero rows discarded\nSELECT id, created_at, title\nFROM ${cleanTable}\nWHERE (created_at, id) < (:cursor_created_at, :cursor_id)\nORDER BY created_at DESC, id DESC\nLIMIT 20;`,
          xp: 100
        },
        {
          key: 'C',
          badge: 'E5 Trade-off',
          verdict: 'SUB-OPTIMAL',
          gradeClass: 'verdict-warning',
          title: 'Pre-Generate & Cache First 10,000 Pages in Redis Cluster',
          description: `Run a periodic background worker that pre-queries all pages and saves serialized JSON chunks into Redis keys with a 15-minute TTL.`,
          critique: `⚠️ <strong>Sub-optimal (E5 Cache Invalidation Nightmare):</strong> High write amplification. Every single INSERT or UPDATE to the catalog invalidates the cached pages, causing cache stampedes (thundering herd) and high memory costs on Redis. Real-time updates become sluggish or out of sync.`,
          xp: 45
        }
      ]
    };
  }

  /**
   * Renders the FAANG Mock Interview drawer HTML.
   */
  function renderFaangDrawerHtml(caseId, targetQuery, table, context) {
    const scenario = generateFollowUpScenario(caseId, targetQuery, table, context);
    const evals = loadSavedEvaluations();
    const saved = evals[caseId] || null;

    return `
      <div class="gym-faang-drawer" id="faang_drawer_${caseId}" style="display: none;">
        <!-- Header Persona Bar -->
        <div class="faang-drawer-header">
          <div class="faang-interviewer-profile">
            <div class="faang-avatar-badge">${scenario.avatar}</div>
            <div>
              <div class="faang-company-pill">${escapeHtml(scenario.companyTag)}</div>
              <div class="faang-challenge-title">${escapeHtml(scenario.title)}</div>
            </div>
          </div>
          <div class="faang-status-badge" id="faang_status_${caseId}">
            ${saved ? (saved.score === 100 ? '⭐ L6 STAFF CLEARED' : '⚠️ ATTEMPTED') : '🎯 100 XP REWARD'}
          </div>
        </div>

        <!-- Dialogue Box -->
        <div class="faang-dialogue-card">
          <div class="faang-dialogue-avatar">🎙️</div>
          <div class="faang-dialogue-content">
            <div class="faang-dialogue-name">Senior Staff Interviewer:</div>
            <div class="faang-dialogue-text">"${escapeHtml(scenario.interviewerQuote)}"</div>
          </div>
        </div>

        <!-- Architectural Choices (3 Trade-offs) -->
        <div class="faang-options-container">
          <div class="faang-options-heading">
            <span>Choose Your Architectural Trade-off:</span>
            <span style="font-size: 11px; color: #94a3b8;">Click an option to submit to the interview panel</span>
          </div>

          <div class="faang-options-grid" id="faang_grid_${caseId}">
            ${scenario.options.map((opt, idx) => {
              const isSelected = saved && saved.selected === opt.key;
              return `
                <div class="faang-option-card ${isSelected ? 'selected' : ''}" 
                     id="opt_${caseId}_${opt.key}"
                     onclick="window.GYM_FAANG_INTERVIEWER && window.GYM_FAANG_INTERVIEWER.selectOption('${caseId}', '${opt.key}')">
                  <div class="option-header-row">
                    <span class="option-key-badge">${opt.key}</span>
                    <span class="option-badge-type">${opt.badge}</span>
                  </div>
                  <div class="option-title">${escapeHtml(opt.title)}</div>
                  <div class="option-desc">${escapeHtml(opt.description)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Evaluation Feedback Reveal Box -->
        <div class="faang-critique-panel" id="faang_critique_${caseId}" style="${saved ? 'display: block;' : 'display: none;'}">
          ${saved ? renderCritiqueHtml(scenario, saved.selected) : ''}
        </div>
      </div>
    `;
  }

  /**
   * Generates the critique and deep-dive HTML when an option is selected.
   */
  function renderCritiqueHtml(scenario, selectedKey) {
    const opt = scenario.options.find(o => o.key === selectedKey);
    if (!opt) return '';

    return `
      <div class="critique-result-card ${opt.gradeClass}">
        <div class="critique-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;">${opt.score === 100 ? '🏆' : (opt.score > 0 ? '⚠️' : '🚫')}</span>
            <span class="critique-verdict">${opt.verdict}</span>
          </div>
          <span class="critique-score-tag">+${opt.xp} XP</span>
        </div>
        <div class="critique-body">
          ${opt.critique}
        </div>
        ${opt.codeSnippet ? `
          <div class="critique-code-box">
            <div class="critique-code-header">
              <span>💎 Staff Architectural Blueprint</span>
              <button class="btn-copy-blueprint" onclick="navigator.clipboard.writeText(\`${escapeHtml(opt.codeSnippet)}\`); if(window.soundFX) window.soundFX.playClick(); alert('Blueprint copied to clipboard!');">📋 Copy SQL</button>
            </div>
            <pre><code>${escapeHtml(opt.codeSnippet)}</code></pre>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Handles user selection of an architectural option.
   */
  function selectOption(caseId, optionKey) {
    const cardEl = document.getElementById(`case_card_${caseId}`) || document.getElementById(`dock_${caseId}`)?.closest('.case-study-card');
    const targetQuery = cardEl ? (cardEl.dataset.targetQuery || '') : '';
    const table = cardEl ? (cardEl.dataset.table || 'records') : 'records';

    const scenario = generateFollowUpScenario(caseId, targetQuery, table);
    const opt = scenario.options.find(o => o.key === optionKey);
    if (!opt) return;

    // Highlight selected card visually
    ['A', 'B', 'C'].forEach(k => {
      const el = document.getElementById(`opt_${caseId}_${k}`);
      if (el) {
        if (k === optionKey) el.classList.add('selected');
        else el.classList.remove('selected');
      }
    });

    // Save evaluation
    saveEvaluation(caseId, optionKey, opt.xp);

    // Update status badge
    const statusEl = document.getElementById(`faang_status_${caseId}`);
    if (statusEl) {
      statusEl.textContent = opt.score === 100 ? '⭐ L6 STAFF CLEARED' : '⚠️ ATTEMPTED';
      statusEl.style.color = opt.score === 100 ? '#10b981' : '#f59e0b';
    }

    // Render Critique Panel
    const critiquePanel = document.getElementById(`faang_critique_${caseId}`);
    if (critiquePanel) {
      critiquePanel.innerHTML = renderCritiqueHtml(scenario, optionKey);
      critiquePanel.style.display = 'block';
    }

    // Sound FX & celebratory trigger
    if (window.soundFX) {
      if (opt.score === 100) window.soundFX.playSuccess();
      else if (opt.score > 0) window.soundFX.playClick();
      else window.soundFX.playError();
    }
  }

  /**
   * Toggles display of the FAANG Interview drawer.
   */
  function toggleInterview(caseId) {
    const el = document.getElementById(`faang_drawer_${caseId}`);
    if (!el) return;
    const isShowing = el.style.display === 'block';
    el.style.display = isShowing ? 'none' : 'block';

    if (window.soundFX) {
      if (!isShowing) window.soundFX.playWhoosh();
      else window.soundFX.playClick();
    }
  }

  /**
   * Callback fired when a drill is verified/solved in handleVerifyCase.
   * Badges the FAANG Screen button to notify user of unlocked follow-up.
   */
  function onDrillSolved(caseId) {
    const btn = document.getElementById(`btn_faang_${caseId}`);
    if (btn) {
      btn.innerHTML = '🎙️ FAANG Screen <span class="unlocked-pulse">🔥 L6 READY</span>';
      btn.classList.add('btn-faang-unlocked');
    }
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

  window.GYM_FAANG_INTERVIEWER = {
    renderFaangDrawerHtml,
    toggleInterview,
    selectOption,
    onDrillSolved,
    generateFollowUpScenario
  };

})(window);
