
// =============================================================================
// DBT MODEL & SEMANTIC LAYER EXPORTER ENGINE
// Transforms raw SQL queries into production-grade dbt models with YAML contracts,
// tests (not_null, unique), MetricFlow semantic models, and LookML views.
// =============================================================================

window.DbtModelGenerator = (function() {
  'use strict';

  function sanitizeModelName(name) {
    if (!name) return 'mart_analytics_model';
    return name.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/^_+|_+$/g, '');
  }

  function generate(rawSql, options = {}) {
    const rawName = options.modelName || 'mart_sql_foundry';
    const modelName = sanitizeModelName(rawName);
    const materialization = options.materialization || 'table';
    const schema = options.schema || 'marts';
    const tags = options.tags || ['analytics', 'bi_reporting', 'daily_refresh'];

    // Identify source tables
    const fromMatches = [...rawSql.matchAll(/\bFROM\s+([a-zA-Z0-9_]+)/gi)].map(m => m[1]);
    const joinMatches = [...rawSql.matchAll(/\bJOIN\s+([a-zA-Z0-9_]+)/gi)].map(m => m[1]);
    const sourceTables = Array.from(new Set([...fromMatches, ...joinMatches]))
      .filter(t => t.toUpperCase() !== 'SELECT' && t.toUpperCase() !== 'WHERE');

    // Replace raw table names with {{ ref('stg_...') }}
    let dbtSql = rawSql;
    sourceTables.forEach(tbl => {
      const regFrom = new RegExp(`\\bFROM\\s+${tbl}\\b`, 'gi');
      dbtSql = dbtSql.replace(regFrom, `FROM {{ ref('stg_${tbl.toLowerCase()}') }}`);
      const regJoin = new RegExp(`\\bJOIN\\s+${tbl}\\b`, 'gi');
      dbtSql = dbtSql.replace(regJoin, `JOIN {{ ref('stg_${tbl.toLowerCase()}') }}`);
    });

    // 1. Generate model.sql
    const sqlFile = `{{ config(
    materialized = '${materialization}',
    schema = '${schema}',
    tags = ${JSON.stringify(tags)},
    contract = { 'enforced': true }
) }}

/*
================================================================================
  DBT PRODUCTION MART: ${modelName}
  Lineage Source: SQL Foundry Relational Machine
  Target Engine: Snowflake / BigQuery / Databricks / PostgreSQL / DuckDB
================================================================================
*/

WITH source_data AS (
    -- Upstream staging references
${sourceTables.map(t => `    SELECT * FROM {{ ref('stg_${t.toLowerCase()}') }}`).join('\n') || "    -- Direct relational inputs"}
),

transformed_mart AS (
${dbtSql.split('\n').map(l => '    ' + l).join('\n')}
)

SELECT *
FROM transformed_mart;
`;

    // Extract columns
    const selectMatch = rawSql.match(/SELECT\s+([\s\S]+?)\s+FROM/i);
    let columns = [];
    if (selectMatch) {
      const colStr = selectMatch[1];
      const parts = colStr.split(/,(?![^()]*\))/);
      parts.forEach(p => {
        const clean = p.trim();
        const asMatch = clean.match(/\bAS\s+([a-zA-Z0-9_]+)/i);
        if (asMatch) {
          columns.push(asMatch[1]);
        } else {
          const directMatch = clean.match(/([a-zA-Z0-9_]+)$/);
          if (directMatch && directMatch[1].toUpperCase() !== 'DISTINCT') {
            columns.push(directMatch[1]);
          }
        }
      });
    }
    if (columns.length === 0) {
      columns = ['id', 'dimension_key', 'metric_value', 'updated_at'];
    }

    // 2. Generate schema.yml
    const yamlFile = `version: 2

models:
  - name: ${modelName}
    description: >
      Production analytical model synthesized from SQL Foundry.
      Maintains validated business logic, execution constraints, and automated data quality tests.
    config:
      contract:
        enforced: true
    columns:
${columns.map((col, idx) => {
  const isKey = idx === 0 || col.toLowerCase().includes('id') || col.toLowerCase().includes('month') || col.toLowerCase().includes('date') || col.toLowerCase().includes('code');
  const isMetric = col.toLowerCase().includes('amount') || col.toLowerCase().includes('revenue') || col.toLowerCase().includes('avg') || col.toLowerCase().includes('count') || col.toLowerCase().includes('mrr') || col.toLowerCase().includes('salary') || col.toLowerCase().includes('variance');
  return `      - name: ${col}
        description: "${isKey ? 'Primary dimensional key or partitioning grain.' : isMetric ? 'Quantitative aggregate business metric.' : 'Relational projection attribute.'}"
        data_type: ${isKey ? (col.includes('id') ? 'integer' : 'string') : isMetric ? 'numeric' : 'string'}
        tests:
          - not_null${isKey && idx === 0 ? '\n          - unique' : ''}${isMetric ? '\n          - dbt_expectations.expect_column_values_to_be_between:\n              min_value: 0' : ''}`;
}).join('\n')}
`;

    // 3. Generate semantic_layer.yml (MetricFlow / dbt Semantic Layer)
    const metricCols = columns.filter(c => c.toLowerCase().includes('amount') || c.toLowerCase().includes('revenue') || c.toLowerCase().includes('mrr') || c.toLowerCase().includes('order') || c.toLowerCase().includes('user') || c.toLowerCase().includes('count') || c.toLowerCase().includes('salary'));
    const semanticFile = `version: 2

semantic_models:
  - name: ${modelName}_semantic
    model: ref('${modelName}')
    description: "Semantic layer model powering downstream Looker, Tableau, and BI dashboards."
    entities:
      - name: ${columns[0] || 'id'}
        type: primary
    dimensions:
      - name: report_timestamp
        type: time
        type_params:
          time_granularity: day
    measures:
${metricCols.map(c => `      - name: sum_${c}
        description: "Cumulative sum of ${c}"
        agg: sum
        expr: ${c}`).join('\n') || `      - name: total_records\n        description: "Total record count"\n        agg: count`}

metrics:
  - name: primary_kpi
    label: "Topline ${columns[1] || 'Metric'}"
    type: simple
    type_params:
      measure: ${metricCols[0] ? `sum_${metricCols[0]}` : 'total_records'}
`;

    // 4. Generate LookML View
    const lookmlFile = `view: ${modelName} {
  sql_table_name: \`analytics.${schema}.${modelName}\` ;;

  dimension: ${columns[0] || 'id'} {
    primary_key: yes
    type: ${columns[0] && columns[0].includes('id') ? 'number' : 'string'}
    sql: \${TABLE}.${columns[0] || 'id'} ;;
  }

${columns.slice(1).map(c => {
  const isNum = c.toLowerCase().includes('amount') || c.toLowerCase().includes('revenue') || c.toLowerCase().includes('mrr') || c.toLowerCase().includes('orders') || c.toLowerCase().includes('salary');
  if (isNum) {
    return `  measure: total_${c} {
    type: sum
    sql: \${TABLE}.${c} ;;
    value_format_name: usd
  }`;
  } else {
    return `  dimension: ${c} {
    type: string
    sql: \${TABLE}.${c} ;;
  }`;
  }
}).join('\n\n')}
}
`;

    
  function openDbtModal() {
    if (window.DbtModelGenerator) {
      let modelName = 'mart_analytics_query';
      if (state.catalogMode === 'blueprints') {
        modelName = `mart_${state.selectedBlueprint.replace('bp_', '')}`;
      } else if (state.catalogMode === 'leetcode') {
        modelName = `mart_leetcode_${state.selectedProblemId}`;
      }
      window.DbtModelGenerator.openModal(state.editorSql, {
        modelName: modelName,
        materialization: 'table',
        schema: 'marts'
      });
    }
  }

  return {
      modelName,
      sqlFile,
      yamlFile,
      semanticFile,
      lookmlFile
    };
  }

  let activeModalTab = 'sql';
  let cachedArtifacts = null;

  function openModal(rawSql, options = {}) {
    cachedArtifacts = generate(rawSql, options);
    activeModalTab = 'sql';

    let container = document.getElementById('dbtExportModalContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'dbtExportModalContainer';
      document.body.appendChild(container);
    }

    renderModalContent(container);
  }

  function switchTab(tabKey) {
    activeModalTab = tabKey;
    const container = document.getElementById('dbtExportModalContainer');
    if (container) renderModalContent(container);
  }

  function closeModal() {
    const container = document.getElementById('dbtExportModalContainer');
    if (container) {
      container.innerHTML = '';
      container.remove();
    }
  }

  function getActiveContent() {
    if (!cachedArtifacts) return '';
    if (activeModalTab === 'sql') return cachedArtifacts.sqlFile;
    if (activeModalTab === 'yaml') return cachedArtifacts.yamlFile;
    if (activeModalTab === 'semantic') return cachedArtifacts.semanticFile;
    if (activeModalTab === 'lookml') return cachedArtifacts.lookmlFile;
    return '';
  }

  function copyActiveContent() {
    const content = getActiveContent();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content).then(() => {
        if (window.soundFX && typeof window.soundFX.playSuccess === 'function') window.soundFX.playSuccess();
        if (window.SQL_BUDDY && typeof window.SQL_BUDDY.say === 'function') {
          window.SQL_BUDDY.say("Copied dbt artifact to clipboard!", 2500, 'celebrate');
        }
      });
    }
  }

  function downloadActiveFile() {
    const content = getActiveContent();
    let filename = `${cachedArtifacts.modelName}.sql`;
    if (activeModalTab === 'yaml') filename = `schema.yml`;
    if (activeModalTab === 'semantic') filename = `semantic_metrics.yml`;
    if (activeModalTab === 'lookml') filename = `${cachedArtifacts.modelName}.view.lkml`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function renderModalContent(container) {
    if (!cachedArtifacts) return;
    const { modelName, sqlFile, yamlFile, semanticFile, lookmlFile } = cachedArtifacts;

    let activeCode = sqlFile;
    let activePath = `models/marts/${modelName}.sql`;
    if (activeModalTab === 'yaml') {
      activeCode = yamlFile;
      activePath = `models/marts/schema.yml`;
    } else if (activeModalTab === 'semantic') {
      activeCode = semanticFile;
      activePath = `models/metrics/semantic_layer.yml`;
    } else if (activeModalTab === 'lookml') {
      activeCode = lookmlFile;
      activePath = `views/${modelName}.view.lkml`;
    }

    container.innerHTML = `
      <div class="dbt-modal-backdrop" onclick="if(event.target === this) window.DbtModelGenerator.closeModal()">
        <div class="dbt-modal-dialog">
          
          <!-- Header -->
          <div class="dbt-modal-header">
            <div class="dbt-modal-header-left">
              <span class="dbt-modal-badge">dbt Core &amp; Semantic Layer</span>
              <h2 class="dbt-modal-title">Export as Production dbt Model</h2>
              <span class="dbt-modal-subtitle">Auto-generated contract specifications, tests &amp; metric semantics for ${modelName}</span>
            </div>
            <button class="dbt-modal-close" onclick="window.DbtModelGenerator.closeModal()" title="Close dialog (Esc)">&times;</button>
          </div>

          <!-- File Selector Tabs -->
          <div class="dbt-modal-tabs">
            <button class="dbt-tab-btn ${activeModalTab === 'sql' ? 'active' : ''}" onclick="window.DbtModelGenerator.switchTab('sql')">
              <span class="dbt-tab-dot" style="background:#f43f5e;"></span>
              <span>models/marts/${modelName}.sql</span>
            </button>
            <button class="dbt-tab-btn ${activeModalTab === 'yaml' ? 'active' : ''}" onclick="window.DbtModelGenerator.switchTab('yaml')">
              <span class="dbt-tab-dot" style="background:#fbbf24;"></span>
              <span>schema.yml (Contracts &amp; Tests)</span>
            </button>
            <button class="dbt-tab-btn ${activeModalTab === 'semantic' ? 'active' : ''}" onclick="window.DbtModelGenerator.switchTab('semantic')">
              <span class="dbt-tab-dot" style="background:#10b981;"></span>
              <span>semantic_layer.yml (MetricFlow)</span>
            </button>
            <button class="dbt-tab-btn ${activeModalTab === 'lookml' ? 'active' : ''}" onclick="window.DbtModelGenerator.switchTab('lookml')">
              <span class="dbt-tab-dot" style="background:#38bdf8;"></span>
              <span>${modelName}.view.lkml</span>
            </button>
          </div>

          <!-- Active File Path Banner -->
          <div class="dbt-filepath-banner">
            <span style="color:var(--text-muted); font-size:11px; font-family:var(--font-mono, monospace);">File Path:</span>
            <span style="color:#38bdf8; font-size:11px; font-family:var(--font-mono, monospace); font-weight:600;">${activePath}</span>
            <span class="dbt-tag-pill">Enforced Contract</span>
            <span class="dbt-tag-pill" style="color:#10b981; border-color:rgba(16,185,129,0.3); background:rgba(16,185,129,0.1);">Automated Tests Ready</span>
          </div>

          <!-- Code Viewport -->
          <div class="dbt-modal-body">
            <pre class="dbt-code-pre"><code>${escapeHtml(activeCode)}</code></pre>
          </div>

          <!-- Footer Actions -->
          <div class="dbt-modal-footer">
            <div style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono, monospace);">
              Ready to commit directly into your git repository
            </div>
            <div class="dbt-modal-actions">
              <button class="dbt-action-btn primary" onclick="window.DbtModelGenerator.copyActiveContent()">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy Current File</span>
              </button>
              <button class="dbt-action-btn secondary" onclick="window.DbtModelGenerator.downloadActiveFile()">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Download</span>
              </button>
              <button class="dbt-action-btn secondary" onclick="window.DbtModelGenerator.closeModal()">
                <span>Close</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });
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

  return {
    generate,
    openModal,
    switchTab,
    closeModal,
    copyActiveContent,
    downloadActiveFile
  };
})();

/**
 * =============================================================================
 * RELATIONAL MACHINES ENGINE (DATA ANALYSIS & BUSINESS INTELLIGENCE EXPLAINERS)
 * Pure Bloomberg / LedgerLens Obsidian Dark Minimalist Vector Architecture
 * Features:
 *   - Compact 920x520 SVG ViewBox with Financial-Grade Ledger Tables
 *   - Feature 5: Hover Micro-Tooltips & Data Integrity Audits
 *   - Feature 3: Click-to-Inspect Production SQL & Interview Formula Drawer
 *   - Multi-Dialect Code Switcher (Postgres, Snowflake, BigQuery, DuckDB)
 *   - Dynamic Pin-Isolation & Ethereal Glow Filters
 * =============================================================================
 */

window.RelationalMachinesEngine = (function() {
  'use strict';

  let state = {
    catalogMode: 'leetcode',        // 'blueprints' | 'leetcode' | 'custom'
    layoutMode: 'split',           // 'split' | 'canvas' | 'query'
    selectedBlueprint: 'bp_metrics',
    selectedProblemId: '584',
    editorSql: "SELECT name FROM Customer WHERE referee_id != 2 OR referee_id IS NULL;",
    canvasTheme: 'dark',
    zoomLevel: 1.0,
    selectedMetricId: null,
    selectedPin: null,
    drawerTab: 'sql',              // 'sql' | 'plans' | 'advisor'
    selectedDialect: 'postgres',   // 'postgres' | 'snowflake' | 'bigquery' | 'duckdb'
    isDrawerOpen: false,
    astStatus: 'valid',
    viewMode: 'pipeline',
    chamberCount: 3
  };

  const BLUEPRINT_PRESETS = [
    // --- DATA ANALYTICS TRACK ---
    {
      id: 'bp_metrics',
      category: 'Analytics',
      title: '01 Multi-Chamber Metric Tree',
      subtitle: 'Revenue, AOV & Order Frequency',
      sql: "SELECT date_trunc('month', order_date) AS month,\n       SUM(net_amount) AS revenue,\n       COUNT(DISTINCT order_id) AS orders,\n       ROUND(SUM(net_amount) / NULLIF(COUNT(DISTINCT order_id), 0), 2) AS aov\nFROM retail_orders\nWHERE order_status = 'COMPLETED'\nGROUP BY 1\nORDER BY 1;"
    },
    {
      id: 'bp_rolling',
      category: 'Analytics',
      title: '02 7-Day Rolling Trend',
      subtitle: 'Sliding Partition Frame Analytics',
      sql: "SELECT sale_date,\n       daily_revenue,\n       ROUND(AVG(daily_revenue) OVER (\n         ORDER BY sale_date\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ), 2) AS rolling_7d_avg\nFROM daily_sales\nWHERE region = 'US_EAST';"
    },
    {
      id: 'bp_retention',
      category: 'Analytics',
      title: '03 Cohort Retention Matrix',
      subtitle: 'Triangular Cohort Decay Curves',
      sql: "SELECT c.cohort_month,\n       o.order_month,\n       COUNT(DISTINCT o.user_id) AS active_users\nFROM user_cohorts c\nJOIN user_orders o ON c.user_id = o.user_id\nWHERE o.order_month >= c.cohort_month\nGROUP BY 1, 2;"
    },
    {
      id: 'bp_mrr',
      category: 'Analytics',
      title: '04 SaaS 5-Way MRR Waterfall',
      subtitle: 'New, Expansion, Contraction & Churn',
      sql: "WITH monthly_mrr AS (\n  SELECT user_id, date_trunc('month', invoice_date) AS mth, SUM(mrr_amount) AS mrr\n  FROM subscriptions\n  GROUP BY 1, 2\n),\nmrr_lagged AS (\n  SELECT user_id, mth, mrr,\n         LAG(mrr, 1, 0.0) OVER (PARTITION BY user_id ORDER BY mth) AS prev_mrr\n  FROM monthly_mrr\n)\nSELECT mth,\n       SUM(CASE WHEN prev_mrr = 0 AND mrr > 0 THEN mrr ELSE 0 END) AS new_mrr,\n       SUM(CASE WHEN mrr > prev_mrr AND prev_mrr > 0 THEN mrr - prev_mrr ELSE 0 END) AS expansion_mrr,\n       SUM(CASE WHEN mrr < prev_mrr AND mrr > 0 THEN prev_mrr - mrr ELSE 0 END) AS contraction_mrr,\n       SUM(CASE WHEN mrr = 0 AND prev_mrr > 0 THEN prev_mrr ELSE 0 END) AS churn_mrr\nFROM mrr_lagged\nGROUP BY 1\nORDER BY 1;"
    },
    // --- FINANCE ANALYTICS TRACK ---
    {
      id: 'bp_gl_invariant',
      category: 'Finance',
      title: '05 GL Balanced Ledger Invariant',
      subtitle: 'Double-Entry Debits = Credits Audit',
      sql: "SELECT legal_entity,\n       account_code,\n       SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE 0 END) AS total_debits,\n       SUM(CASE WHEN entry_type = 'CREDIT' THEN amount_usd ELSE 0 END) AS total_credits,\n       ROUND(SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE -amount_usd END), 2) AS net_variance\nFROM general_ledger_entries\nGROUP BY 1, 2\nHAVING total_debits != total_credits;"
    },
    {
      id: 'bp_settlement',
      category: 'Finance',
      title: '06 SEC T+1 Settlement Recon',
      subtitle: 'Dual-Sided Trade Position Matching',
      sql: "SELECT COALESCE(e.trade_id, c.trade_id) AS trade_id,\n       COALESCE(e.isin, c.isin) AS isin,\n       e.executed_shares,\n       c.cleared_shares,\n       e.executed_shares - c.cleared_shares AS position_break,\n       CASE\n         WHEN c.trade_id IS NULL THEN 'ORPHANED_EXECUTION'\n         WHEN e.trade_id IS NULL THEN 'UNMATCHED_CLEARING'\n         WHEN e.executed_shares != c.cleared_shares THEN 'QUANTITY_MISMATCH'\n         ELSE 'CLEARED_MATCHED'\n       END AS reconciliation_status\nFROM executed_trades e\nFULL OUTER JOIN clearing_manifest c ON e.trade_id = c.trade_id AND e.isin = c.isin;"
    },
    {
      id: 'bp_drawdown',
      category: 'Finance',
      title: '07 Portfolio Drawdown & High-Water Mark',
      subtitle: 'Peak-to-Trough Downside Volatility',
      sql: "WITH daily_nav AS (\n  SELECT portfolio_id, valuation_date, nav_usd,\n         MAX(nav_usd) OVER (\n           PARTITION BY portfolio_id\n           ORDER BY valuation_date\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS high_water_mark\n  FROM portfolio_valuations\n)\nSELECT portfolio_id, valuation_date, nav_usd, high_water_mark,\n       ROUND(((nav_usd - high_water_mark) / NULLIF(high_water_mark, 0)) * 100.0, 2) AS drawdown_pct\nFROM daily_nav\nORDER BY valuation_date DESC;"
    },
    {
      id: 'bp_var99',
      category: 'Finance',
      title: '08 Historical 99% 1-Day VaR',
      subtitle: 'Percentile Swap Portfolio Risk',
      sql: "WITH daily_returns AS (\n  SELECT trade_date,\n         portfolio_pnl,\n         PERCENT_RANK() OVER (ORDER BY portfolio_pnl ASC) AS pnl_percentile\n  FROM historical_swap_pnl\n  WHERE book_id = 'RATES_DERIVATIVES'\n)\nSELECT MAX(portfolio_pnl) AS var_99_loss_threshold\nFROM daily_returns\nWHERE pnl_percentile <= 0.01;"
    }
  ];

  const FEATURED_LEETCODE = [
    { id: '584', title: 'Find Customer Referee', diff: 'Easy', tag: '3VL & Filter', sql: "SELECT name FROM Customer WHERE referee_id != 2 OR referee_id IS NULL;" },
    { id: '175', title: 'Combine Two Tables', diff: 'Easy', tag: 'Outer Join', sql: "SELECT p.firstName, p.lastName, a.city, a.state FROM Person p LEFT JOIN Address a ON p.personId = a.personId;" },
    { id: '180', title: 'Consecutive Numbers', diff: 'Medium', tag: 'Window / Self Join', sql: "SELECT DISTINCT num AS ConsecutiveNums FROM (SELECT num, LEAD(num, 1) OVER (ORDER BY id) AS next1, LEAD(num, 2) OVER (ORDER BY id) AS next2 FROM Logs) t WHERE num = next1 AND num = next2;" },
    { id: '185', title: 'Department Top Three Salaries', diff: 'Hard', tag: 'Dense Rank', sql: "WITH ranked AS (SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary, DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rk FROM Employee e JOIN Department d ON e.departmentId = d.id) SELECT Department, Employee, Salary FROM ranked WHERE rk <= 3;" },
    { id: '176', title: 'Second Highest Salary', diff: 'Medium', tag: 'Subquery Offset', sql: "SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary;" },
    { id: '197', title: 'Rising Temperature', diff: 'Easy', tag: 'Self Join Date', sql: "SELECT w1.id FROM Weather w1 JOIN Weather w2 ON w1.recordDate = DATE_ADD(w2.recordDate, INTERVAL 1 DAY) WHERE w1.temperature > w2.temperature;" },
    { id: '601', title: 'Human Traffic of Stadium', diff: 'Hard', tag: 'Island Gaps', sql: "WITH numbered AS (SELECT id, visit_date, people, id - ROW_NUMBER() OVER (ORDER BY id) AS grp FROM Stadium WHERE people >= 100), counted AS (SELECT *, COUNT(*) OVER (PARTITION BY grp) AS cnt FROM numbered) SELECT id, visit_date, people FROM counted WHERE cnt >= 3 ORDER BY visit_date;" },
    { id: '1141', title: 'User Activity Past 30 Days', diff: 'Easy', tag: 'Date Aggregation', sql: "SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users FROM Activity WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27' GROUP BY activity_date;" },
    { id: '1174', title: 'Immediate Food Delivery II', diff: 'Medium', tag: 'First Order Window', sql: "SELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS immediate_percentage FROM Delivery WHERE (customer_id, order_date) IN (SELECT customer_id, MIN(order_date) FROM Delivery GROUP BY customer_id);" },
    { id: '1321', title: 'Restaurant Growth', diff: 'Medium', tag: '7-Day Rolling Window', sql: "WITH DailyTotals AS (SELECT visited_on, SUM(amount) AS daily_amount FROM Customer GROUP BY visited_on), MovingTotals AS (SELECT visited_on, SUM(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount, ROUND(AVG(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount, ROW_NUMBER() OVER (ORDER BY visited_on) AS row_num FROM DailyTotals) SELECT visited_on, amount, average_amount FROM MovingTotals WHERE row_num >= 7;" }
  ];

  const SYNTHESIZER_PRESETS = {
    'lc595': {
      label: 'LeetCode #595: Big Countries (3 Chambers Filter)',
      sql: 'SELECT name, population, area FROM World WHERE area >= 3000000 OR population >= 25000000;'
    },
    'lc175': {
      label: 'LeetCode #175: Combine Two Tables (3 Chambers Left Join)',
      sql: 'SELECT p.firstName, p.lastName, a.city, a.state FROM Person p LEFT JOIN Address a ON p.personId = a.personId;'
    },
    'lc586': {
      label: 'LeetCode #586: Customer Orders (4 Chambers Rollup + Limit)',
      sql: 'SELECT customer_number FROM orders GROUP BY customer_number ORDER BY COUNT(order_number) DESC LIMIT 1;'
    },
    'lc596': {
      label: 'LeetCode #596: Classes More Than 5 (4 Chambers Having Filter)',
      sql: 'SELECT class FROM Courses GROUP BY class HAVING COUNT(student) >= 5;'
    },
    'lc185': {
      label: 'LeetCode #185: Top 3 Department Salaries (5 Chambers Window Analytics)',
      sql: 'SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary FROM (SELECT departmentId, name, salary, DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) as rnk FROM Employee) e JOIN Department d ON e.departmentId = d.id WHERE rnk <= 3;'
    },
    'cte_retention': {
      label: 'Cohort Activity Multi-Stage CTE (5 Chambers Complex)',
      sql: 'WITH first_touch AS (SELECT user_id, MIN(activity_date) AS cohort_date FROM events GROUP BY user_id) SELECT f.cohort_date, COUNT(DISTINCT e.user_id) AS active_users FROM events e JOIN first_touch f ON e.user_id = f.user_id WHERE e.activity_date >= f.cohort_date + INTERVAL 7 DAY GROUP BY f.cohort_date;'
    }
  };

  // ===========================================================================
  // METRIC CATALOG (PRODUCTION SQL, DATA AUDITS & INTERVIEW DOSSIERS)
  // ===========================================================================
  const METRIC_CATALOG = {
    // -------------------------------------------------------------------------
    // DRAFT 01: THE METRIC ENGINE (REVENUE, AOV & FREQUENCY)
    // -------------------------------------------------------------------------
    'order_amount': {
      title: 'order_amount ($) // Transaction Value',
      pin: 1,
      color: '#38bdf8',
      gauge: '01 RAW TRANSACTIONS (GRAIN)',
      grain: 'orders.order_amount (DECIMAL 10,2) PK: order_id',
      audit: '✓ 0 NULL checkouts • Filtered out 320 cancelled returns',
      edgeCase: 'Multi-currency checkouts require daily spot FX rate at order_timestamp, not current rate.',
      sql: {
        postgres: `-- PostgreSQL 16: Monthly GMV Rollup
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  SUM(order_amount) AS total_gmv,
  ROUND(AVG(order_amount), 2) AS aov
FROM orders
WHERE status NOT IN ('CANCELLED', 'REFUNDED')
GROUP BY 1
ORDER BY 1 DESC;`,
        snowflake: `-- Snowflake: Monthly GMV Rollup
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  SUM(order_amount) AS total_gmv,
  ROUND(AVG(order_amount), 2) AS aov
FROM orders
WHERE status NOT IN ('CANCELLED', 'REFUNDED')
GROUP BY 1
ORDER BY 1 DESC;`,
        bigquery: `-- BigQuery Standard SQL: Monthly GMV Rollup
SELECT
  DATE_TRUNC(order_timestamp, MONTH) AS order_month,
  SUM(order_amount) AS total_gmv,
  ROUND(AVG(order_amount), 2) AS aov
FROM \`analytics.orders\`
WHERE status NOT IN ('CANCELLED', 'REFUNDED')
GROUP BY 1
ORDER BY 1 DESC;`,
        duckdb: `-- DuckDB / SQLite WASM: Monthly GMV Rollup
SELECT
  STRFTIME('%Y-%m-01', order_timestamp) AS order_month,
  SUM(order_amount) AS total_gmv,
  ROUND(AVG(order_amount), 2) AS aov
FROM orders
WHERE status NOT IN ('CANCELLED', 'REFUNDED')
GROUP BY 1
ORDER BY 1 DESC;`
      },
      commercialInsight: 'Finance recognizes GMV once payment settles and fulfillment SLA begins. Tracking refund rate deltas alongside GMV prevents deceptive top-line revenue inflation.',
      interviewQuestion: 'Why is joining orders to order_items before SUM(order_amount) catastrophic?',
      pitfallTrap: 'The classic 1-to-many join fan-out trap: each order row multiplies by its number of items, causing 3x-5x inflated revenue reports.'
    },

    'customer_id': {
      title: 'customer_id // Dimension Key & Deduplication',
      pin: 2,
      color: '#fbbf24',
      gauge: '01 RAW TRANSACTIONS (GRAIN)',
      grain: 'orders.customer_id INT -> users.user_id (Foreign Key)',
      audit: '✓ 3,410 unique buyers across 13,960 checkouts (4.09 orders/buyer)',
      edgeCase: 'Guest checkouts without an account require fallback to COALESCE(customer_id, HASH(billing_email)).',
      sql: {
        postgres: `-- PostgreSQL 16: Unique Buyer Deduplication
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  COUNT(DISTINCT customer_id) AS unique_buyers,
  COUNT(order_id) AS total_checkouts,
  ROUND(COUNT(order_id)::NUMERIC / NULLIF(COUNT(DISTINCT customer_id), 0), 2) AS purchase_frequency
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`,
        snowflake: `-- Snowflake: Unique Buyer Deduplication
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  COUNT(DISTINCT customer_id) AS unique_buyers,
  COUNT(order_id) AS total_checkouts,
  ROUND(COUNT(order_id) / NULLIF(COUNT(DISTINCT customer_id), 0), 2) AS purchase_frequency
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`,
        bigquery: `-- BigQuery Standard SQL: HyperLogLog for Fast Approx
SELECT
  DATE_TRUNC(order_timestamp, MONTH) AS order_month,
  APPROX_COUNT_DISTINCT(customer_id) AS approx_buyers,
  COUNT(DISTINCT customer_id) AS exact_buyers
FROM \`analytics.orders\`
WHERE status = 'FILLED'
GROUP BY 1;`,
        duckdb: `-- DuckDB: Deduplication & Frequency
SELECT
  STRFTIME('%Y-%m-01', order_timestamp) AS order_month,
  COUNT(DISTINCT customer_id) AS unique_buyers,
  ROUND(COUNT(order_id) * 1.0 / COUNT(DISTINCT customer_id), 2) AS purchase_frequency
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`
      },
      commercialInsight: 'Differentiating unique buyers from checkout volume reveals whether revenue expansion is driven by new customer acquisition or compounding customer repeat behavior.',
      interviewQuestion: 'How do you optimize COUNT(DISTINCT) over 500 million records in BigQuery or Snowflake?',
      pitfallTrap: 'In distributed MPP engines, exact COUNT(DISTINCT) forces a shuffle of all user keys to a single node. Use APPROX_COUNT_DISTINCT() (HyperLogLog) for sub-1% error with 10x faster execution.'
    },

    'net_checkouts': {
      title: 'Net Valid Checkouts // Operational Volume',
      pin: null,
      color: '#34d399',
      gauge: '01 RAW TRANSACTIONS (GRAIN)',
      grain: 'COUNT(order_id) WHERE status = "FILLED"',
      audit: '✓ 14,280 gross - 320 cancelled = 13,960 net checkouts',
      edgeCase: 'Chargebacks and disputes occurring 30-90 days post-purchase must reconcile in dispute ledgers.',
      sql: {
        postgres: `-- PostgreSQL 16: Checkout Volume Breakdown
SELECT
  status,
  COUNT(*) AS checkout_count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_share
FROM orders
GROUP BY status;`,
        snowflake: `-- Snowflake: Checkout Volume Breakdown
SELECT
  status,
  COUNT(*) AS checkout_count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_share
FROM orders
GROUP BY status;`,
        bigquery: `-- BigQuery: Checkout Volume Breakdown
SELECT
  status,
  COUNT(*) AS checkout_count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_share
FROM \`analytics.orders\`
GROUP BY status;`,
        duckdb: `-- DuckDB: Checkout Volume Breakdown
SELECT
  status,
  COUNT(*) AS checkout_count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_share
FROM orders
GROUP BY status;`
      },
      commercialInsight: 'Order count measures operational throughput (warehouse picking, packaging, API server capacity), completely decoupled from order dollar ticket size.',
      interviewQuestion: 'What is the performance difference between COUNT(*) and COUNT(order_id)?',
      pitfallTrap: 'COUNT(order_id) checks for NULLs; COUNT(*) counts entire rows. In columnar engines with non-null PKs, COUNT(*) scans the narrowest metadata index and is faster.'
    },

    'aov': {
      title: 'AVG(order_amount) [AOV] // Basket Size',
      pin: 3,
      color: '#10b981',
      gauge: '02 SQL AGGREGATION LAYER',
      grain: 'SUM(order_amount) / NULLIF(COUNT(order_id), 0)',
      audit: '✓ $1,428,950 total GMV / 13,960 orders = $102.36 AOV',
      edgeCase: 'Division by zero on zero-order dimensions. Always guard with NULLIF(COUNT(order_id), 0).',
      sql: {
        postgres: `-- PostgreSQL 16: Safe AOV Computation
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  SUM(order_amount) AS gmv,
  COUNT(order_id) AS total_orders,
  ROUND(SUM(order_amount) / NULLIF(COUNT(order_id), 0), 2) AS average_order_value
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`,
        snowflake: `-- Snowflake: Safe AOV Computation
SELECT
  DATE_TRUNC('month', order_timestamp) AS order_month,
  SUM(order_amount) AS gmv,
  COUNT(order_id) AS total_orders,
  ROUND(DIV0(SUM(order_amount), COUNT(order_id)), 2) AS average_order_value
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`,
        bigquery: `-- BigQuery Standard SQL: Safe AOV
SELECT
  DATE_TRUNC(order_timestamp, MONTH) AS order_month,
  SUM(order_amount) AS gmv,
  SAFE_DIVIDE(SUM(order_amount), COUNT(order_id)) AS average_order_value
FROM \`analytics.orders\`
WHERE status = 'FILLED'
GROUP BY 1;`,
        duckdb: `-- DuckDB: Safe AOV
SELECT
  STRFTIME('%Y-%m-01', order_timestamp) AS order_month,
  ROUND(SUM(order_amount) / NULLIF(COUNT(order_id), 0), 2) AS average_order_value
FROM orders
WHERE status = 'FILLED'
GROUP BY 1;`
      },
      commercialInsight: 'Increasing AOV through bundling, volume discounts, or post-purchase upsells generates pure incremental gross margin without requiring any extra ad spending (CAC).',
      interviewQuestion: 'Is the overall AOV equal to the average of individual customers\' average order values?',
      pitfallTrap: 'Never average an average! A customer who buys 100 items at $10 would distort an unweighted average. AOV must always be total spend divided by total orders.'
    },

    'gmv': {
      title: 'Gross Monthly GMV // Commercial North Star',
      pin: 4,
      color: '#f43f5e',
      gauge: '03 COMMERCIAL REALITY',
      grain: 'SUM(order_amount) grouped by calendar month',
      audit: '✓ $1,428,950 total recognized monthly volume (+14.2% MoM)',
      edgeCase: 'Shipping fees and sales taxes must be isolated: gmv_product, gmv_shipping, gmv_tax.',
      sql: {
        postgres: `-- PostgreSQL 16: GMV MoM Growth Rate
WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', order_timestamp) AS month_start,
    SUM(order_amount) AS gmv
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY 1
)
SELECT
  month_start,
  gmv,
  LAG(gmv) OVER (ORDER BY month_start) AS prev_gmv,
  ROUND(100.0 * (gmv - LAG(gmv) OVER (ORDER BY month_start)) / NULLIF(LAG(gmv) OVER (ORDER BY month_start), 0), 2) AS mom_growth_pct
FROM monthly_sales
ORDER BY month_start DESC;`,
        snowflake: `-- Snowflake: GMV MoM Growth Rate
WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', order_timestamp) AS month_start,
    SUM(order_amount) AS gmv
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY 1
)
SELECT
  month_start,
  gmv,
  LAG(gmv) OVER (ORDER BY month_start) AS prev_gmv,
  ROUND(100.0 * (gmv - LAG(gmv) OVER (ORDER BY month_start)) / NULLIF(LAG(gmv) OVER (ORDER BY month_start), 0), 2) AS mom_growth_pct
FROM monthly_sales
ORDER BY month_start DESC;`,
        bigquery: `-- BigQuery: GMV MoM Growth Rate
WITH monthly_sales AS (
  SELECT
    DATE_TRUNC(order_timestamp, MONTH) AS month_start,
    SUM(order_amount) AS gmv
  FROM \`analytics.orders\`
  WHERE status = 'FILLED'
  GROUP BY 1
)
SELECT
  month_start,
  gmv,
  ROUND(100.0 * SAFE_DIVIDE(gmv - LAG(gmv) OVER (ORDER BY month_start), LAG(gmv) OVER (ORDER BY month_start)), 2) AS mom_growth_pct
FROM monthly_sales
ORDER BY month_start DESC;`,
        duckdb: `-- DuckDB: GMV MoM Growth Rate
WITH monthly_sales AS (
  SELECT
    STRFTIME('%Y-%m-01', order_timestamp) AS month_start,
    SUM(order_amount) AS gmv
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY 1
)
SELECT
  month_start,
  gmv,
  ROUND(100.0 * (gmv - LAG(gmv) OVER (ORDER BY month_start)) / NULLIF(LAG(gmv) OVER (ORDER BY month_start), 0), 2) AS mom_growth_pct
FROM monthly_sales
ORDER BY month_start DESC;`
      },
      commercialInsight: 'GMV is the executive benchmark for overall business scale. Combining GMV with gross margins and refund rates provides investors with the genuine health of the business.',
      interviewQuestion: 'What is the difference between GMV and Net Recognized Revenue?',
      pitfallTrap: 'GMV is total merchandise value passing through the checkout. Net Revenue deducts discounts, returns, processing fees, supplier payouts, and uncollected debts.'
    },

    'cac_ltv': {
      title: 'LTV / CAC Health Ratio // Unit Economics',
      pin: null,
      color: '#fbbf24',
      gauge: '03 COMMERCIAL REALITY',
      grain: '(Customer Lifetime Value) / (Blended Customer Acquisition Cost)',
      audit: '✓ $418.00 LTV / $42.50 CAC = 9.8x health ratio (Elite > 3.0x)',
      edgeCase: 'Never mask paid ad acquisition cost inflation behind blended organic referral signups.',
      sql: {
        postgres: `-- PostgreSQL 16: LTV to CAC Ratio Computation
WITH cohort_economics AS (
  SELECT
    ROUND(SUM(order_amount) / NULLIF(COUNT(DISTINCT customer_id), 0), 2) AS historic_ltv,
    42.50 AS blended_cac
  FROM orders
  WHERE status = 'FILLED'
)
SELECT
  historic_ltv,
  blended_cac,
  ROUND(historic_ltv / blended_cac, 2) AS ltv_cac_multiple,
  CASE
    WHEN historic_ltv / blended_cac >= 3.0 THEN 'Healthy & Scalable'
    WHEN historic_ltv / blended_cac >= 1.0 THEN 'Marginal Unit Economics'
    ELSE 'Danger: Burning Capital'
  END AS economic_verdict
FROM cohort_economics;`,
        snowflake: `-- Snowflake: LTV to CAC Ratio
WITH cohort_economics AS (
  SELECT
    ROUND(SUM(order_amount) / NULLIF(COUNT(DISTINCT customer_id), 0), 2) AS historic_ltv,
    42.50 AS blended_cac
  FROM orders
  WHERE status = 'FILLED'
)
SELECT
  historic_ltv,
  blended_cac,
  ROUND(historic_ltv / blended_cac, 2) AS ltv_cac_multiple
FROM cohort_economics;`,
        bigquery: `-- BigQuery: LTV to CAC Ratio
WITH cohort_economics AS (
  SELECT
    ROUND(SAFE_DIVIDE(SUM(order_amount), COUNT(DISTINCT customer_id)), 2) AS historic_ltv,
    42.50 AS blended_cac
  FROM \`analytics.orders\`
  WHERE status = 'FILLED'
)
SELECT
  historic_ltv,
  blended_cac,
  ROUND(SAFE_DIVIDE(historic_ltv, blended_cac), 2) AS ltv_cac_multiple
FROM cohort_economics;`,
        duckdb: `-- DuckDB: LTV to CAC Ratio
WITH cohort_economics AS (
  SELECT
    ROUND(SUM(order_amount) / NULLIF(COUNT(DISTINCT customer_id), 0), 2) AS historic_ltv,
    42.50 AS blended_cac
  FROM orders
  WHERE status = 'FILLED'
)
SELECT
  historic_ltv,
  blended_cac,
  ROUND(historic_ltv / blended_cac, 2) AS ltv_cac_multiple
FROM cohort_economics;`
      },
      commercialInsight: 'An LTV/CAC ratio of 3x-5x is ideal. A ratio above 8x often means marketing spend is too conservative and the company is leaving revenue on the table.',
      interviewQuestion: 'How do you prevent survivorship bias when calculating LTV across customer cohorts?',
      pitfallTrap: 'Only measuring customers who survived 12 months overstates LTV. True LTV must include every customer acquired in the cohort, including those who churned on Day 1.'
    },

    // -------------------------------------------------------------------------
    // DRAFT 02: 7-DAY ROLLING MOVING WINDOW
    // -------------------------------------------------------------------------
    'window_frame': {
      title: 'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW',
      pin: null,
      color: '#fbbf24',
      gauge: '02 ANALYTICAL SLIDING FRAME',
      grain: 'Sliding window buffer of 7 contiguous recorded rows',
      audit: '✓ $204,135 daily smoothed volume • Day-of-week seasonality neutralized',
      edgeCase: 'If dates with zero sales are absent from table, ROWS BETWEEN pulls data from 8+ days ago!',
      sql: {
        postgres: `-- PostgreSQL 16: 7-Day Rolling Moving Average
SELECT
  order_date,
  daily_sales,
  ROUND(AVG(daily_sales) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_7d_avg
FROM daily_sales_summary
ORDER BY order_date DESC;`,
        snowflake: `-- Snowflake: 7-Day Rolling Moving Average
SELECT
  order_date,
  daily_sales,
  ROUND(AVG(daily_sales) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_7d_avg
FROM daily_sales_summary
ORDER BY order_date DESC;`,
        bigquery: `-- BigQuery: RANGE with Interval for True Calendar Days
SELECT
  order_date,
  daily_sales,
  ROUND(AVG(daily_sales) OVER (
    ORDER BY UNIX_DATE(order_date)
    RANGE BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_7d_calendar_avg
FROM \`analytics.daily_sales_summary\`
ORDER BY order_date DESC;`,
        duckdb: `-- DuckDB: 7-Day Rolling Moving Average
SELECT
  order_date,
  daily_sales,
  ROUND(AVG(daily_sales) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_7d_avg
FROM daily_sales_summary
ORDER BY order_date DESC;`
      },
      commercialInsight: 'Weekend and holiday cyclicity causes recurring Sunday volume dips. The 7-day moving window eliminates this artificial volatility for executive trendline reporting.',
      interviewQuestion: 'What is the precise difference between ROWS and RANGE in window specifications?',
      pitfallTrap: 'ROWS operates on physical row offsets; RANGE operates on logical value differences. If a date is missing, ROWS takes the 7th prior row (perhaps 10 days ago), skewing the true average.'
    },

    'date_gaps': {
      title: 'Calendar Day Gaps // Scaffolding Missing Dates',
      pin: null,
      color: '#d97706',
      gauge: '01 WHAT FEEDS IT (DAILY NOISE)',
      grain: 'Continuous calendar sequence cross joined to dimension tables',
      audit: '! 3 holiday dates with 0 sales absent from raw orders table',
      edgeCase: 'Failure to scaffold creates invisible time jumps in analytical window frames.',
      sql: {
        postgres: `-- PostgreSQL 16: Generate Continuous Calendar Grid
WITH RECURSIVE calendar AS (
  SELECT '2026-01-01'::DATE AS cal_date
  UNION ALL
  SELECT cal_date + 1 FROM calendar WHERE cal_date < '2026-12-31'::DATE
)
SELECT
  c.cal_date,
  COALESCE(SUM(o.order_amount), 0) AS daily_sales
FROM calendar c
LEFT JOIN orders o ON DATE_TRUNC('day', o.order_timestamp) = c.cal_date
GROUP BY 1
ORDER BY 1;`,
        snowflake: `-- Snowflake: Calendar Table via Generator
SELECT
  DATEADD(day, seq4(), '2026-01-01')::DATE AS cal_date
FROM TABLE(GENERATOR(ROWCOUNT => 365));`,
        bigquery: `-- BigQuery: GENERATE_DATE_ARRAY
SELECT
  cal_date
FROM UNNEST(GENERATE_DATE_ARRAY('2026-01-01', '2026-12-31', INTERVAL 1 DAY)) AS cal_date;`,
        duckdb: `-- DuckDB: Range Calendar
SELECT
  range::DATE AS cal_date
FROM RANGE('2026-01-01'::DATE, '2026-12-31'::DATE, INTERVAL 1 DAY);`
      },
      commercialInsight: 'A robust data warehouse scaffold guarantees zero-day volume drops are legitimately recorded as $0 rather than omitted, preserving rolling average accuracy.',
      interviewQuestion: 'How would you write a query to detect and fill missing dates in BigQuery?',
      pitfallTrap: 'Never perform time-series analysis directly on sparse transactional logs without left joining to a generated calendar table.'
    },

    // -------------------------------------------------------------------------
    // DRAFT 03: COHORT RETENTION & CHURN MATRIX
    // -------------------------------------------------------------------------
    'cohort_month': {
      title: 'Acquisition Cohort // First Order Timestamp',
      pin: null,
      color: '#38bdf8',
      gauge: '01 ACQUISITION COHORT BASELINE',
      grain: 'MIN(DATE_TRUNC("month", order_date)) OVER (PARTITION BY user_id)',
      audit: '✓ 1,000 unique signups locked into Jan 2026 cohort (100% baseline)',
      edgeCase: 'Users signing up on Jan 31 at 23:59 UTC must not slip into Feb cohort due to timezone offsets.',
      sql: {
        postgres: `-- PostgreSQL 16: Cohort Assignment
WITH user_first_order AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', MIN(order_timestamp)) AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
)
SELECT
  cohort_month,
  COUNT(customer_id) AS cohort_size
FROM user_first_order
GROUP BY 1
ORDER BY 1;`,
        snowflake: `-- Snowflake: Cohort Assignment
WITH user_first_order AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', MIN(order_timestamp)) AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
)
SELECT
  cohort_month,
  COUNT(customer_id) AS cohort_size
FROM user_first_order
GROUP BY 1;`,
        bigquery: `-- BigQuery: Cohort Assignment
WITH user_first_order AS (
  SELECT
    customer_id,
    DATE_TRUNC(MIN(order_timestamp), MONTH) AS cohort_month
  FROM \`analytics.orders\`
  WHERE status = 'FILLED'
  GROUP BY customer_id
)
SELECT
  cohort_month,
  COUNT(customer_id) AS cohort_size
FROM user_first_order
GROUP BY 1;`,
        duckdb: `-- DuckDB: Cohort Assignment
WITH user_first_order AS (
  SELECT
    customer_id,
    STRFTIME('%Y-%m-01', MIN(order_timestamp)) AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
)
SELECT
  cohort_month,
  COUNT(customer_id) AS cohort_size
FROM user_first_order
GROUP BY 1;`
      },
      commercialInsight: 'Locking cohort assignment by initial acquisition date establishes the immutable denominator for all subsequent lifetime retention curves.',
      interviewQuestion: 'How do you handle users who create an account in January but make their first purchase in March?',
      pitfallTrap: 'Clarify whether the business defines cohorts by signup date or activation (first transaction) date. Mixing them corrupts CAC payback calculations.'
    },

    'm3_asymptote': {
      title: 'Month 3 Asymptote // The Smile Curve',
      pin: null,
      color: '#10b981',
      gauge: '02 MONTH-OVER-MONTH ACTIVITY JOIN',
      grain: 'Monthly active user count / Initial cohort size (Denominator = 1,000)',
      audit: '✓ M0: 100% -> M1: 64% -> M2: 52% -> M3: 49.0% -> M4: 48.5% (Asymptote)',
      edgeCase: 'Never calculate retention over active users only; denominator must always be the original cohort baseline.',
      sql: {
        postgres: `-- PostgreSQL 16: Full Cohort Retention Matrix
WITH cohort_base AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', MIN(order_timestamp)) AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
),
activity AS (
  SELECT
    o.customer_id,
    c.cohort_month,
    DATE_PART('month', AGE(DATE_TRUNC('month', o.order_timestamp), c.cohort_month))::INT AS month_number
  FROM orders o
  JOIN cohort_base c ON o.customer_id = c.customer_id
  WHERE o.status = 'FILLED'
  GROUP BY 1, 2, 3
)
SELECT
  cohort_month,
  month_number,
  COUNT(customer_id) AS active_users,
  ROUND(100.0 * COUNT(customer_id) / FIRST_VALUE(COUNT(customer_id)) OVER (PARTITION BY cohort_month ORDER BY month_number), 1) AS retention_rate_pct
FROM activity
GROUP BY 1, 2
ORDER BY 1, 2;`,
        snowflake: `-- Snowflake: Cohort Retention Matrix
WITH cohort_base AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', MIN(order_timestamp)) AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
),
activity AS (
  SELECT
    o.customer_id,
    c.cohort_month,
    DATEDIFF('month', c.cohort_month, DATE_TRUNC('month', o.order_timestamp)) AS month_number
  FROM orders o
  JOIN cohort_base c ON o.customer_id = c.customer_id
  WHERE o.status = 'FILLED'
  GROUP BY 1, 2, 3
)
SELECT
  cohort_month,
  month_number,
  COUNT(customer_id) AS active_users,
  ROUND(100.0 * COUNT(customer_id) / FIRST_VALUE(COUNT(customer_id)) OVER (PARTITION BY cohort_month ORDER BY month_number), 1) AS retention_rate_pct
FROM activity
GROUP BY 1, 2
ORDER BY 1, 2;`,
        bigquery: `-- BigQuery: Cohort Retention Matrix
WITH cohort_base AS (
  SELECT
    customer_id,
    DATE_TRUNC(MIN(order_timestamp), MONTH) AS cohort_month
  FROM \`analytics.orders\`
  WHERE status = 'FILLED'
  GROUP BY customer_id
),
activity AS (
  SELECT
    o.customer_id,
    c.cohort_month,
    DATE_DIFF(DATE_TRUNC(o.order_timestamp, MONTH), c.cohort_month, MONTH) AS month_number
  FROM \`analytics.orders\` o
  JOIN cohort_base c ON o.customer_id = c.customer_id
  WHERE o.status = 'FILLED'
  GROUP BY 1, 2, 3
)
SELECT
  cohort_month,
  month_number,
  COUNT(customer_id) AS active_users,
  ROUND(100.0 * COUNT(customer_id) / FIRST_VALUE(COUNT(customer_id)) OVER (PARTITION BY cohort_month ORDER BY month_number), 1) AS retention_rate_pct
FROM activity
GROUP BY 1, 2
ORDER BY 1, 2;`,
        duckdb: `-- DuckDB: Cohort Retention Matrix
WITH cohort_base AS (
  SELECT
    customer_id,
    STRFTIME('%Y-%m-01', MIN(order_timestamp))::DATE AS cohort_month
  FROM orders
  WHERE status = 'FILLED'
  GROUP BY customer_id
),
activity AS (
  SELECT
    o.customer_id,
    c.cohort_month,
    DATEDIFF('month', c.cohort_month, STRFTIME('%Y-%m-01', o.order_timestamp)::DATE) AS month_number
  FROM orders o
  JOIN cohort_base c ON o.customer_id = c.customer_id
  WHERE o.status = 'FILLED'
  GROUP BY 1, 2, 3
)
SELECT
  cohort_month,
  month_number,
  COUNT(customer_id) AS active_users,
  ROUND(100.0 * COUNT(customer_id) / FIRST_VALUE(COUNT(customer_id)) OVER (PARTITION BY cohort_month ORDER BY month_number), 1) AS retention_rate_pct
FROM activity
GROUP BY 1, 2
ORDER BY 1, 2;`
      },
      commercialInsight: 'When retention curves flatten parallel to the x-axis (~49%), it mathematically guarantees Product-Market Fit. Each new customer acquired permanently stacks on top of a resilient recurring floor.',
      interviewQuestion: 'How do you detect survivorship bias in customer churn analysis?',
      pitfallTrap: 'Querying only users active in the last 30 days filters out churned users, artificially inflating retention to 90%+. Always measure against the original cohort size at t=0.'
    }
  };

  // ---------------------------------------------------------------------------
  // SVG BUILDERS (COMPACT 920x520 WITH INTERACTIVE ROWS)
  // ---------------------------------------------------------------------------
  function getDraft1Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#07080c' : '#f8fafc';
    const bgCard = isDark ? '#0e1117' : '#ffffff';
    const bgSubtle = isDark ? '#141822' : '#f1f5f9';
    const border = isDark ? '#1c2230' : '#e2e8f0';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    const hNode = state.activeHighlightNode;
    const opac1 = (hNode === null || hNode === 1) ? '1' : '0.18';
    const opac2 = (hNode === null || hNode === 2) ? '1' : '0.18';
    const opac3 = (hNode === null || hNode === 3) ? '1' : '0.18';
    const opac4 = (hNode === null || hNode === 4) ? '1' : '0.18';

    const sel = state.selectedMetricId;

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-amber" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-emerald" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-rose" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- TOP STATS METRIC BAR -->
        <text x="30" y="24" font-size="9.5" font-family="'Geist Mono', monospace" fill="${textMuted}" letter-spacing="0.3">
          <tspan fill="${textPrimary}" font-weight="700">14,280</tspan> orders tracked  &bull;  
          <tspan fill="#10b981" font-weight="700">0</tspan> null checkouts  &bull;  
          <tspan fill="#38bdf8" font-weight="700">3,410</tspan> unique buyers  &bull;  
          <tspan fill="#fbbf24" font-weight="700">3</tspan> relational gauges
        </text>

        <!-- TITLE & SUBTITLE -->
        <text x="30" y="48" font-size="17" font-weight="700" fill="${textPrimary}" letter-spacing="-0.3">One machine, three gauges</text>
        <text x="30" y="64" font-size="9.5" fill="${textMuted}">Every transaction moves between the layers &mdash; The SQL machine traces the path from raw events to executive commercial KPIs.</text>

        <!-- ================================================================= -->
        <!-- GAUGE 1: RAW TRANSACTIONS (EVENTS • LOG)                          -->
        <!-- ================================================================= -->
        <g transform="translate(30, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">RAW TRANSACTIONS</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">events &bull; log</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <!-- Row 1: Orders Table Grain -->
          <g class="machine-interactive-row" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'order_amount')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('order_amount')">
            <rect x="10" y="34" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="48" font-size="10.5" fill="${textSecondary}">Orders Table (Grain)</text>
            <text x="246" y="48" font-size="10" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">14,280</text>
          </g>

          <!-- Row 2: Cancelled Returns -->
          <text x="14" y="70" font-size="10.5" fill="${textMuted}">less: Returns / Cancelled</text>
          <text x="246" y="70" font-size="10" fill="#ef4444" text-anchor="end" font-family="'Geist Mono', monospace">(320)</text>

          <!-- Row 3: Net Valid Checkouts -->
          <g class="machine-interactive-row ${sel === 'net_checkouts' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'net_checkouts')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('net_checkouts')">
            <rect x="10" y="78" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="92" font-size="10.5" font-weight="600" fill="${textPrimary}">Net Valid Checkouts</text>
            <text x="246" y="92" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">13,960</text>
          </g>

          <!-- Row 4: [PIN 1] order_amount (Highlighted Pill) -->
          <g class="machine-interactive-row ${sel === 'order_amount' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'order_amount')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('order_amount')" opacity="${opac1}">
            <rect x="10" y="103" width="240" height="24" rx="4" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1"/>
            <circle cx="22" cy="115" r="7" fill="#0284c7" filter="url(#glow-cyan)"/>
            <text x="22" y="118.5" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">1</text>
            <text x="36" y="118.5" font-size="10" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">order_amount ($)</text>
            <text x="242" y="118.5" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">$1.43M</text>
          </g>

          <!-- Row 5: [PIN 2] customer_id (Highlighted Pill) -->
          <g class="machine-interactive-row ${sel === 'customer_id' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'customer_id')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('customer_id')" opacity="${opac2}">
            <rect x="10" y="133" width="240" height="24" rx="4" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1"/>
            <circle cx="22" cy="145" r="7" fill="#d97706" filter="url(#glow-amber)"/>
            <text x="22" y="148.5" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">2</text>
            <text x="36" y="148.5" font-size="10" font-weight="700" fill="#fbbf24" font-family="'Geist Mono', monospace">customer_id (Dimension)</text>
            <text x="242" y="148.5" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="end" font-family="'Geist Mono', monospace">3,410</text>
          </g>

          <text x="14" y="176" font-size="10" fill="${textMuted}">Payment Method: Card / UPI</text>
          <text x="246" y="176" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">88.4%</text>

          <text x="14" y="196" font-size="10" fill="${textMuted}">Platform: Mobile iOS &bull; Web</text>
          <text x="246" y="196" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">68.5%</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; DATA INTEGRITY AUDIT: PASS</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">0 NULL checkouts &bull; Refund status excluded</text>
        </g>

        <!-- ================================================================= -->
        <!-- GAUGE 2: SQL AGGREGATION (GROUP BY • LOGIC)                       -->
        <!-- ================================================================= -->
        <g transform="translate(330, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">SQL AGGREGATION</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">group by &bull; logic</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <g class="machine-interactive-row" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'order_amount')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('order_amount')">
            <rect x="10" y="34" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="48" font-size="10.5" fill="${textSecondary}">SUM(order_amount)</text>
            <text x="246" y="48" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">$1,428,950</text>
          </g>

          <!-- Row 2: [PIN 3] AVG(order_amount) (Highlighted Pill) -->
          <g class="machine-interactive-row ${sel === 'aov' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'aov')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('aov')" opacity="${opac3}">
            <rect x="10" y="60" width="240" height="24" rx="4" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1"/>
            <circle cx="22" cy="72" r="7" fill="#10b981" filter="url(#glow-emerald)"/>
            <text x="22" y="75.5" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">3</text>
            <text x="36" y="75.5" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">AVG(order_amount) [AOV]</text>
            <text x="242" y="75.5" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$102.36</text>
          </g>

          <g class="machine-interactive-row" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'customer_id')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('customer_id')">
            <rect x="10" y="89" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="103" font-size="10" fill="${textMuted}">COUNT(DISTINCT user_id)</text>
            <text x="246" y="103" font-size="9.5" fill="#f59e0b" text-anchor="end" font-family="'Geist Mono', monospace">3,410 users</text>
          </g>

          <text x="14" y="125" font-size="10" fill="${textMuted}">COUNT(order_id)</text>
          <text x="246" y="125" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">13,960</text>

          <text x="14" y="147" font-size="10.5" font-weight="600" fill="${textPrimary}">Purchase Frequency</text>
          <text x="246" y="147" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">4.09x</text>

          <text x="14" y="172" font-size="9.5" fill="${textMuted}">DATE_TRUNC('month', date)</text>
          <text x="246" y="172" font-size="9" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">2026-10</text>

          <text x="14" y="192" font-size="9.5" fill="${textMuted}">HAVING COUNT(order_id) &ge; 1</text>
          <text x="246" y="192" font-size="9" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">TRUE</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">&bull; ROLLUP GRAIN: 1 ROW / MONTH</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Dimensions: Year-Month &bull; Category</text>
        </g>

        <!-- ================================================================= -->
        <!-- GAUGE 3: EXECUTIVE BUSINESS KPIS (COMMERCIAL • REALITY)            -->
        <!-- ================================================================= -->
        <g transform="translate(630, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">COMMERCIAL REALITY</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">business &bull; kpi</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <!-- Row 1: [PIN 4] GMV (Highlighted Pill) -->
          <g class="machine-interactive-row ${sel === 'gmv' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'gmv')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('gmv')" opacity="${opac4}">
            <rect x="10" y="37" width="240" height="25" rx="4" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" stroke-width="1"/>
            <circle cx="22" cy="49.5" r="7" fill="#f43f5e" filter="url(#glow-rose)"/>
            <text x="22" y="53" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">4</text>
            <text x="36" y="53" font-size="10" font-weight="700" fill="#f43f5e" font-family="'Geist Mono', monospace">Gross Monthly GMV</text>
            <text x="242" y="53" font-size="10" font-weight="800" fill="#f43f5e" text-anchor="end" font-family="'Geist Mono', monospace">$1,428,950</text>
          </g>

          <g class="machine-interactive-row" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'aov')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('aov')">
            <rect x="10" y="66" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="80" font-size="10.5" fill="${textSecondary}">Average Basket Size</text>
            <text x="246" y="80" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$102.36</text>
          </g>

          <text x="14" y="103" font-size="10" fill="${textMuted}">Active Buyer Base</text>
          <text x="246" y="103" font-size="9.5" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">3,410</text>

          <text x="14" y="125" font-size="10" fill="${textMuted}">Customer Acquisition (CAC)</text>
          <text x="246" y="125" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">$42.50</text>

          <text x="14" y="147" font-size="10.5" font-weight="600" fill="${textPrimary}">Customer Lifetime Value (LTV)</text>
          <text x="246" y="147" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$418.00</text>

          <!-- LTV / CAC Health Ratio -->
          <g class="machine-interactive-row ${sel === 'cac_ltv' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'cac_ltv')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('cac_ltv')">
            <rect x="10" y="158" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="172" font-size="10" font-weight="600" fill="#fbbf24">LTV / CAC Health Ratio</text>
            <text x="246" y="172" font-size="9.5" font-weight="800" fill="#fbbf24" text-anchor="end" font-family="'Geist Mono', monospace">9.8x (Elite)</text>
          </g>

          <text x="14" y="192" font-size="9.5" fill="${textMuted}">Repeat Buyer Revenue Share</text>
          <text x="246" y="192" font-size="9" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">64.2%</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; COMMERCIAL VERDICT: STRONG RETENTION</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Growth driven by repeat orders, not ad burn</text>
        </g>

        <!-- DELICATE CURVED BÉZIER FLOW WIRES -->
        <path d="M 280 195 C 302 195, 310 128, 330 128" fill="none" stroke="#38bdf8" stroke-width="${hNode === 1 ? '2.5' : '1.3'}" opacity="${opac1}" filter="${hNode === 1 ? 'url(#glow-cyan)' : 'none'}"/>
        <circle cx="280" cy="195" r="2.5" fill="#38bdf8" opacity="${opac1}"/>
        <circle cx="330" cy="128" r="2.5" fill="#38bdf8" opacity="${opac1}"/>

        <path d="M 280 225 C 305 225, 310 183, 330 183" fill="none" stroke="#f59e0b" stroke-width="${hNode === 2 ? '2.5' : '1.3'}" stroke-dasharray="3 2" opacity="${opac2}" filter="${hNode === 2 ? 'url(#glow-amber)' : 'none'}"/>
        <circle cx="280" cy="225" r="2.5" fill="#f59e0b" opacity="${opac2}"/>
        <circle cx="330" cy="183" r="2.5" fill="#f59e0b" opacity="${opac2}"/>

        <path d="M 580 152 C 605 152, 610 160, 630 160" fill="none" stroke="#10b981" stroke-width="${hNode === 3 ? '2.5' : '1.3'}" opacity="${opac3}" filter="${hNode === 3 ? 'url(#glow-emerald)' : 'none'}"/>
        <circle cx="580" cy="152" r="2.5" fill="#10b981" opacity="${opac3}"/>
        <circle cx="630" cy="160" r="2.5" fill="#10b981" opacity="${opac3}"/>

        <path d="M 580 128 C 605 128, 608 130, 630 130" fill="none" stroke="#f43f5e" stroke-width="${hNode === 4 ? '2.5' : '1.3'}" stroke-dasharray="4 2" opacity="${opac4}" filter="${hNode === 4 ? 'url(#glow-rose)' : 'none'}"/>
        <circle cx="580" cy="128" r="2.5" fill="#f43f5e" opacity="${opac4}"/>
        <circle cx="630" cy="130" r="2.5" fill="#f43f5e" opacity="${opac4}"/>

        <!-- BOTTOM RECONCILIATION MONOSPACE LINE -->
        <text x="30" y="372" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">
          1 raw order log streams into GMV &bull; 2 distinct keys deduplicate buyers &bull; 3 basket size calculates AOV &bull; 4 executive GMV reconciles with finance
        </text>

        <!-- BOTTOM DUAL DATA ANALYST PANELS -->
        <g transform="translate(30, 390)">
          <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <line x1="0" y1="0" x2="0" y2="92" stroke="#10b981" stroke-width="3"/>
          <text x="14" y="20" font-size="9" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // COMMERCIAL INSIGHT</text>
          <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Revenue is up +14.2% MoM not because acquisition costs rose, but because</text>
          <text x="14" y="52" font-size="9.5" fill="${textSecondary}">repeat buyer frequency reached 4.09x while AOV held steady at $102.36.</text>
          <text x="14" y="72" font-size="9" font-weight="600" fill="#10b981" font-family="'Geist Mono', monospace">Commercial Action: Reallocate 18% of paid ad budget into customer retention.</text>
        </g>

        <g transform="translate(472, 390)">
          <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <line x1="0" y1="0" x2="0" y2="92" stroke="#f43f5e" stroke-width="3"/>
          <text x="14" y="20" font-size="9" font-weight="700" fill="#fb7185" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // 1-TO-MANY FAN-OUT TRAP</text>
          <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Joining orders to order_items before executing SUM(order_amount) duplicates</text>
          <text x="14" y="52" font-size="9.5" fill="${textSecondary}">order totals across every line item in the basket. In an order with 4 items, GMV</text>
          <text x="14" y="72" font-size="9" font-weight="600" fill="#f43f5e" font-family="'Geist Mono', monospace">is 4x inflated! Fix: Aggregate line items at order grain first before joining.</text>
        </g>

        <text x="30" y="504" font-size="8" fill="#3f3f46" font-family="'Geist Mono', monospace" letter-spacing="1">
          ILLUSTRATIVE DATA &bull; THE ENGINE TRACES DATA FLOW FROM RAW DB EVENTS TO EXECUTIVE COMMERCIAL METRICS
        </text>
      </svg>
    `;
  }

  function getDraft2Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#07080c' : '#f8fafc';
    const bgCard = isDark ? '#0e1117' : '#ffffff';
    const border = isDark ? '#1c2230' : '#e2e8f0';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    const sel = state.selectedMetricId;

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-gold" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <text x="30" y="24" font-size="9.5" font-family="'Geist Mono', monospace" fill="${textMuted}" letter-spacing="0.3">
          <tspan fill="#fbbf24" font-weight="700">L7D Moving Average</tspan>  &bull;  
          <tspan fill="${textPrimary}">ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</tspan>  &bull;  
          <tspan fill="#10b981">Zero-Collapse Cursor</tspan>
        </text>

        <text x="30" y="48" font-size="17" font-weight="700" fill="${textPrimary}" letter-spacing="-0.3">The 7-Day Rolling Moving Window</text>
        <text x="30" y="64" font-size="9.5" fill="${textMuted}" font-family="'Geist Mono', monospace">AVG(daily_sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</text>

        <!-- Column 1: WHAT FEEDS IT -->
        <g transform="translate(30, 80)">
          <text x="0" y="12" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">WHAT FEEDS IT // DAILY NOISE</text>
          
          <g class="machine-interactive-row" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'window_frame')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('window_frame')">
            <rect y="22" width="220" height="38" rx="6" fill="${bgCard}" stroke="#0284c7" stroke-width="1"/>
            <text x="12" y="38" font-size="10" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Daily Fluctuation Spikes</text>
            <text x="12" y="51" font-size="8.5" fill="${textMuted}">Monday surge vs Sunday quiet period</text>
          </g>

          <g class="machine-interactive-row ${sel === 'date_gaps' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'date_gaps')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('date_gaps')">
            <rect y="68" width="220" height="38" rx="6" fill="${bgCard}" stroke="#d97706" stroke-width="1"/>
            <text x="12" y="84" font-size="10" font-weight="700" fill="#fbbf24" font-family="'Geist Mono', monospace">Calendar Day Gaps</text>
            <text x="12" y="97" font-size="8.5" fill="${textMuted}">Dates with zero transactions (missing rows)</text>
          </g>

          <rect y="114" width="220" height="38" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="12" y="130" font-size="10" font-weight="700" fill="${textSecondary}" font-family="'Geist Mono', monospace">One-Off Flash Sales</text>
          <text x="12" y="143" font-size="8.5" fill="${textMuted}">Black Friday / Cyber Monday anomalies</text>
        </g>

        <!-- Column 2: THE ELEMENT (HERO GLOWING CARD) -->
        <g transform="translate(290, 80)">
          <text x="0" y="12" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">ANALYTICAL SLIDING FRAME</text>
          
          <g class="machine-interactive-row ${sel === 'window_frame' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'window_frame')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('window_frame')">
            <rect y="22" width="340" height="130" rx="8" fill="${bgCard}" stroke="#d97706" stroke-width="1.4" filter="url(#glow-gold)"/>
            <text x="16" y="44" font-size="9" font-weight="800" fill="#fbbf24" font-family="'Geist Mono', monospace" letter-spacing="0.5">WINDOW FRAME SPECIFICATION</text>
            
            <text x="16" y="78" font-size="24" font-weight="800" fill="${textPrimary}" font-family="'Geist Mono', monospace">$204,135<tspan font-size="11" font-weight="500" fill="${textMuted}"> / day</tspan></text>
            <text x="16" y="98" font-size="10" fill="${textSecondary}">6 Preceding + Current Row = 7 Row Buffer</text>
            <line x1="16" y1="108" x2="324" y2="108" stroke="${border}" stroke-width="0.8"/>
            <text x="16" y="128" font-size="9" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; NOISE FILTERED: DAY-OF-WEEK CYCLICAL SKEW REMOVED</text>
          </g>
        </g>

        <!-- Column 3: WHERE IT GOES -->
        <g transform="translate(670, 80)">
          <text x="0" y="12" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace" letter-spacing="1">WHERE IT GOES // DECISIONS</text>
          
          <rect y="22" width="220" height="38" rx="6" fill="${bgCard}" stroke="#10b981" stroke-width="1"/>
          <text x="12" y="38" font-size="10" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">Executive Trendline</text>
          <text x="12" y="51" font-size="8.5" fill="${textMuted}">Noise-free curve on board deck</text>

          <rect y="68" width="220" height="38" rx="6" fill="${bgCard}" stroke="#0284c7" stroke-width="1"/>
          <text x="12" y="84" font-size="10" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">Anomaly Detection</text>
          <text x="12" y="97" font-size="8.5" fill="${textMuted}">Flags true variance drifting &plusmn;3 std dev</text>

          <rect y="114" width="220" height="38" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="12" y="130" font-size="10" font-weight="700" fill="${textSecondary}" font-family="'Geist Mono', monospace">Safety Stock Reorder</text>
          <text x="12" y="143" font-size="8.5" fill="${textMuted}">Warehouse supply replenish triggers</text>
        </g>

        <!-- CONNECTORS -->
        <path d="M 250 120 C 270 120, 275 140, 290 140" fill="none" stroke="#0284c7" stroke-width="1.3"/>
        <path d="M 250 166 C 270 166, 275 140, 290 140" fill="none" stroke="#d97706" stroke-width="1.3"/>
        <path d="M 630 140 C 650 140, 655 120, 670 120" fill="none" stroke="#10b981" stroke-width="1.3"/>
        <path d="M 630 140 C 650 140, 655 166, 670 166" fill="none" stroke="#0284c7" stroke-width="1.3"/>

        <!-- VOLATILITY RISK METER -->
        <g transform="translate(30, 248)">
          <rect width="860" height="60" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="16" y="20" font-size="9" font-weight="700" fill="${textMuted}" font-family="'Geist Mono', monospace">TREND CONFIDENCE // VOLATILITY SMOOTHING</text>
          
          <rect x="16" y="28" width="260" height="8" rx="2" fill="#ef4444" opacity="0.4"/>
          <text x="16" y="48" font-size="8.5" font-weight="700" fill="#ef4444" font-family="'Geist Mono', monospace">RAW DAILY: HIGH VOLATILITY NOISE</text>
          
          <rect x="286" y="28" width="260" height="8" rx="2" fill="#f59e0b" opacity="0.4"/>
          <text x="286" y="48" font-size="8.5" font-weight="700" fill="#f59e0b" font-family="'Geist Mono', monospace">3-DAY: RESIDUAL WEEKEND SKEW</text>

          <rect x="556" y="28" width="290" height="8" rx="2" fill="#10b981" opacity="0.95"/>
          <text x="556" y="48" font-size="8.5" font-weight="800" fill="#10b981" font-family="'Geist Mono', monospace">&bull; 7-DAY: ROBUST CYCLICAL SMOOTHING</text>
        </g>

        <!-- BOTTOM DUAL COMPARISON PANELS -->
        <g transform="translate(30, 326)">
          <g>
            <rect width="418" height="96" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="96" stroke="#10b981" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // BUSINESS INSIGHT</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Never let stakeholders panic over Sunday sales dips. By reporting</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">the 7-day rolling moving average, day-of-week seasonality is naturally neutralised.</text>
            <text x="14" y="74" font-size="9" font-weight="600" fill="#10b981" font-family="'Geist Mono', monospace">KPI Target: When 7-Day MA crosses above 30-Day MA &rarr; Positive momentum.</text>
          </g>

          <g transform="translate(442, 0)">
            <rect width="418" height="96" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="96" stroke="#f43f5e" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#fb7185" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // THE MISSING DATE GAP TRAP</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">ROWS BETWEEN 6 PRECEDING takes 7 recorded rows, NOT 7 calendar days!</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">If Tuesday had 0 sales and lacks a row, it silently pulls data from 8 days ago!</text>
            <text x="14" y="74" font-size="9" font-weight="600" fill="#f43f5e" font-family="'Geist Mono', monospace">Fix: Cross join with calendar table or use RANGE BETWEEN INTERVAL '6' DAY.</text>
          </g>
        </g>

        <text x="30" y="448" font-size="9.5" fill="${textMuted}" font-family="'Geist Mono', monospace">
          "A great data analyst does not present raw numbers &mdash; they strip away the noise so leadership can see the real signal."
        </text>
      </svg>
    `;
  }

  function getDraft3Svg() {
    const isDark = state.canvasTheme === 'dark';
    const bgCanvas = isDark ? '#07080c' : '#f8fafc';
    const bgCard = isDark ? '#0e1117' : '#ffffff';
    const bgSubtle = isDark ? '#141822' : '#f1f5f9';
    const border = isDark ? '#1c2230' : '#e2e8f0';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textSecondary = isDark ? '#94a3b8' : '#334155';
    const textMuted = isDark ? '#64748b' : '#64748b';

    const sel = state.selectedMetricId;

    return `
      <svg id="relationalMachineSvg" viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" style="background:${bgCanvas}; font-family:'Geist', -apple-system, sans-serif; width:100%; height:auto;">
        <defs>
          <filter id="glow-emerald" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <text x="30" y="24" font-size="9.5" font-family="'Geist Mono', monospace" fill="${textMuted}" letter-spacing="0.3">
          <tspan fill="${textPrimary}" font-weight="700">1,000</tspan> users in Jan cohort  &bull;  
          <tspan fill="#10b981" font-weight="700">490</tspan> retained at Month 3  &bull;  
          <tspan fill="#38bdf8" font-weight="700">49.0%</tspan> asymptotic curve  &bull;  
          <tspan fill="#fbbf24" font-weight="700">114%</tspan> NRR
        </text>

        <text x="30" y="48" font-size="17" font-weight="700" fill="${textPrimary}" letter-spacing="-0.3">User Retention Cohort Matrix</text>
        <text x="30" y="64" font-size="9.5" fill="${textMuted}">Measuring how many users acquired in Month M return in Month M+1, M+2, and beyond to prove Product-Market Fit.</text>

        <!-- Gauge 1: 01 ACQUISITION COHORT -->
        <g transform="translate(30, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">01 ACQUISITION COHORT</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">baseline</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <g class="machine-interactive-row ${sel === 'cohort_month' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'cohort_month')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('cohort_month')">
            <rect x="10" y="38" width="240" height="20" rx="3" fill="transparent" stroke="transparent"/>
            <text x="14" y="52" font-size="10.5" fill="${textSecondary}">Acquisition Month</text>
            <text x="246" y="52" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">2026-01</text>
          </g>

          <text x="14" y="78" font-size="10.5" fill="${textSecondary}">Total New Signups</text>
          <text x="246" y="78" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">1,000 users</text>

          <text x="14" y="104" font-size="10.5" fill="${textSecondary}">First Purchase Verified</text>
          <text x="246" y="104" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">100.0% (1,000)</text>

          <text x="14" y="130" font-size="10" fill="${textMuted}">Blended CAC Sunk</text>
          <text x="246" y="130" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">$42.50 / user</text>

          <text x="14" y="154" font-size="10" fill="${textMuted}">Total Cohort Spend</text>
          <text x="246" y="154" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">$42,500</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#38bdf8" font-family="'Geist Mono', monospace">&bull; BASELINE DENOMINATOR: 1,000 USERS</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Acquisition cost sunk &bull; Never changes</text>
        </g>

        <!-- Gauge 2: 02 MONTH-OVER-MONTH ACTIVITY JOIN (HERO CARD) -->
        <g transform="translate(330, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="#10b981" stroke-width="1.3" filter="url(#glow-emerald)"/>
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace" letter-spacing="1.2">02 ACTIVITY DECAY CURVE</text>
          <text x="246" y="22" font-size="8.5" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">retention</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <text x="14" y="52" font-size="10" fill="${textMuted}">Month 0 (Jan): Baseline</text>
          <text x="246" y="52" font-size="10" font-weight="700" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">1,000 (100.0%)</text>

          <text x="14" y="80" font-size="10.5" fill="${textSecondary}">Month 1 (Feb): Returning</text>
          <text x="246" y="80" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">640 (64.0%)</text>

          <text x="14" y="108" font-size="10.5" fill="${textSecondary}">Month 2 (Mar): Habituated</text>
          <text x="246" y="108" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">520 (52.0%)</text>

          <!-- Month 3 Asymptote Interactive -->
          <g class="machine-interactive-row ${sel === 'm3_asymptote' ? 'active-row' : ''}" onmouseenter="window.RelationalMachinesEngine.handleRowHover(event, 'm3_asymptote')" onmouseleave="window.RelationalMachinesEngine.handleRowLeave()" onclick="window.RelationalMachinesEngine.openDrawer('m3_asymptote')">
            <rect x="10" y="122" width="240" height="22" rx="3" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1"/>
            <text x="14" y="136" font-size="10.5" font-weight="600" fill="${textPrimary}">Month 3 (Apr): Core Base</text>
            <text x="246" y="136" font-size="10.5" font-weight="800" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">490 (49.0%)</text>
          </g>

          <text x="14" y="162" font-size="10" fill="${textMuted}">Month 4 (May): Asymptote</text>
          <text x="246" y="162" font-size="9.5" fill="${textPrimary}" text-anchor="end" font-family="'Geist Mono', monospace">485 (48.5%)</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; RETENTION CURVE FLATTENS AT ~49%</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Asymptote parallel to x-axis = PMF</text>
        </g>

        <!-- Gauge 3: 03 UNIT ECONOMICS IMPACT -->
        <g transform="translate(630, 80)">
          <rect width="260" height="276" rx="8" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
          <text x="14" y="22" font-size="9.5" font-weight="700" fill="#a1a1aa" font-family="'Geist Mono', monospace" letter-spacing="1.2">03 UNIT ECONOMICS</text>
          <text x="246" y="22" font-size="8.5" fill="#52525b" text-anchor="end" font-family="'Geist Mono', monospace">impact</text>
          <line x1="14" y1="28" x2="246" y2="28" stroke="${border}" stroke-width="0.8"/>

          <text x="14" y="52" font-size="10.5" fill="${textSecondary}">Customer Lifetime Value</text>
          <text x="246" y="52" font-size="10" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">$480.00</text>

          <text x="14" y="80" font-size="10.5" fill="${textSecondary}">CAC Payback Period</text>
          <text x="246" y="80" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="end" font-family="'Geist Mono', monospace">3.2 Months</text>

          <text x="14" y="108" font-size="10.5" font-weight="600" fill="${textPrimary}">Net Revenue Retention (NRR)</text>
          <text x="246" y="108" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="end" font-family="'Geist Mono', monospace">114% (Expansion)</text>

          <text x="14" y="136" font-size="10" fill="${textMuted}">Annualized User Churn</text>
          <text x="246" y="136" font-size="9.5" fill="${textSecondary}" text-anchor="end" font-family="'Geist Mono', monospace">12.4%</text>

          <text x="14" y="162" font-size="10" fill="${textMuted}">LTV / CAC Multiple</text>
          <text x="246" y="162" font-size="9.5" font-weight="700" fill="#10b981" text-anchor="end" font-family="'Geist Mono', monospace">11.3x</text>

          <rect x="10" y="215" width="240" height="48" rx="5" fill="${bgSubtle}" stroke="${border}" stroke-width="0.8"/>
          <text x="18" y="232" font-size="8.5" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&radic; PRODUCT-MARKET FIT CONFIRMED</text>
          <text x="18" y="248" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">Non-zero asymptote guarantees expansion</text>
        </g>

        <!-- DELICATE CONNECTORS -->
        <path d="M 290 140 L 330 140" fill="none" stroke="#10b981" stroke-width="1.3"/>
        <circle cx="290" cy="140" r="2.5" fill="#10b981"/>
        <circle cx="330" cy="140" r="2.5" fill="#10b981"/>

        <path d="M 590 140 L 630 140" fill="none" stroke="#10b981" stroke-width="1.3"/>
        <circle cx="590" cy="140" r="2.5" fill="#10b981"/>
        <circle cx="630" cy="140" r="2.5" fill="#10b981"/>

        <text x="30" y="372" font-size="8.5" fill="${textMuted}" font-family="'Geist Mono', monospace">
          1 acquisition cohort locks denominator &bull; 2 activity self-join measures retention &bull; 3 curve asymptote proves PMF &bull; 4 unit economics expand
        </text>

        <!-- BOTTOM DUAL COMPARISON PANELS -->
        <g transform="translate(30, 390)">
          <g>
            <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="92" stroke="#10b981" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#10b981" font-family="'Geist Mono', monospace">&bull; WHAT THIS SAYS TO A DATA ANALYST // BUSINESS INSIGHT</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">A retention curve that flattens parallel to the x-axis proves product-market</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">fit. When older cohorts retain at 49%, each new user added expands revenue.</text>
            <text x="14" y="72" font-size="9" font-weight="600" fill="#10b981" font-family="'Geist Mono', monospace">Analyst Tip: Check if Jan 2026 cohort is higher than Nov 2025 (Product improvement!).</text>
          </g>

          <g transform="translate(442, 0)">
            <rect width="418" height="92" rx="6" fill="${bgCard}" stroke="${border}" stroke-width="1"/>
            <line x1="0" y1="0" x2="0" y2="92" stroke="#f43f5e" stroke-width="3"/>
            <text x="14" y="20" font-size="9" font-weight="700" fill="#fb7185" font-family="'Geist Mono', monospace">&bull; ANALYST PITFALL // SURVIVORSHIP BIAS IN CHURN</text>
            <text x="14" y="38" font-size="9.5" fill="${textSecondary}">Only counting users who visited in the last 30 days ignores deactivated</text>
            <text x="14" y="52" font-size="9.5" fill="${textSecondary}">users, creating an illusion of high engagement by selecting only survivors!</text>
            <text x="14" y="72" font-size="9" font-weight="600" fill="#f43f5e" font-family="'Geist Mono', monospace">Fix: Denominator must always be the original cohort size (1,000), never the active subset.</text>
          </g>
        </g>

        <text x="30" y="504" font-size="8" fill="#3f3f46" font-family="'Geist Mono', monospace" letter-spacing="1">
          "IF RETENTION DOES NOT FLATTEN, GROWTH IS JUST WATER POURING INTO A LEAKING BUCKET."
        </text>
      </svg>
    `;
  }

  // ---------------------------------------------------------------------------
  // INTERACTION HANDLERS: TOOLTIP & DRAWER
  // ---------------------------------------------------------------------------
    // ---------------------------------------------------------------------------
  // INTERACTION HANDLERS: ROW LINEAGE, TOOLTIP & MULTI-TAB DRAWER
  // ---------------------------------------------------------------------------
  function handleRowHover(evt, metricId, pin) {
    if (state.isDrawerOpen && state.selectedPin) return;

    const svg = document.querySelector('.relational-machine-svg');
    if (svg && pin) {
      // Highlight matching wires with electric cyan laser glow
      svg.querySelectorAll('.machine-wire-path').forEach(p => {
        if (p.getAttribute('data-wire-pin') == pin) {
          p.classList.add('lineage-active-wire');
        } else {
          p.classList.add('lineage-dimmed');
        }
      });
      // Highlight matching row rects across chambers
      svg.querySelectorAll('.machine-interactive-row').forEach(r => {
        if (r.getAttribute('data-pin') == pin) {
          r.classList.add('lineage-active-row');
        } else {
          r.classList.add('lineage-dimmed');
        }
      });
    }

    const meta = (window.AdaptivePipelineCompiler && window.AdaptivePipelineCompiler.getDynamicMetric(metricId)) || METRIC_CATALOG[metricId];
    if (!meta) return;

    const tooltip = document.getElementById('machinesMicroTooltip');
    const stageCard = document.querySelector('.machines-canvas-card');
    if (!tooltip || !stageCard) return;

    tooltip.querySelector('.machines-tooltip-title').innerHTML = `
      <span>${escapeHtml(meta.title)}</span>
      ${pin ? `<span style="background:${meta.color || '#38bdf8'}; color:#07090e; font-size:8px; font-weight:700; padding:1px 4px; border-radius:3px;">PIN ${pin}</span>` : ''}
    `;
    tooltip.querySelector('.machines-tooltip-grain').textContent = meta.grain || '1 tuple grain';
    tooltip.querySelector('.machines-tooltip-audit').textContent = meta.audit || 'Relational invariant verified';
    tooltip.querySelector('.machines-tooltip-edge').textContent = '⚠️ ' + (meta.edgeCase || 'NULL propagation');

    // Positioning
    const rect = stageCard.getBoundingClientRect();
    const x = evt.clientX - rect.left + 14;
    const y = evt.clientY - rect.top + 14;
    const maxX = rect.width - 330;
    tooltip.style.left = Math.min(x, maxX) + 'px';
    tooltip.style.top = Math.max(10, y) + 'px';
    tooltip.classList.add('visible');
  }

  function handleRowLeave() {
    if (state.isDrawerOpen && state.selectedPin) return;

    const svg = document.querySelector('.relational-machine-svg');
    if (svg) {
      svg.querySelectorAll('.lineage-active-wire').forEach(el => el.classList.remove('lineage-active-wire'));
      svg.querySelectorAll('.lineage-active-row').forEach(el => el.classList.remove('lineage-active-row'));
      svg.querySelectorAll('.lineage-dimmed').forEach(el => el.classList.remove('lineage-dimmed'));
    }

    const tooltip = document.getElementById('machinesMicroTooltip');
    if (tooltip) tooltip.classList.remove('visible');
  }

  function openDrawer(metricId, pin) {
    handleRowLeave();
    const meta = (window.AdaptivePipelineCompiler && window.AdaptivePipelineCompiler.getDynamicMetric(metricId)) || METRIC_CATALOG[metricId];
    if (!meta) return;

    state.selectedMetricId = metricId;
    state.selectedPin = pin;
    state.isDrawerOpen = true;

    // Lock lineage active state
    const svg = document.querySelector('.relational-machine-svg');
    if (svg && pin) {
      svg.querySelectorAll('.machine-wire-path').forEach(p => {
        if (p.getAttribute('data-wire-pin') == pin) {
          p.classList.add('lineage-active-wire');
        } else {
          p.classList.add('lineage-dimmed');
        }
      });
      svg.querySelectorAll('.machine-interactive-row').forEach(r => {
        if (r.getAttribute('data-pin') == pin) {
          r.classList.add('lineage-active-row');
        } else {
          r.classList.add('lineage-dimmed');
        }
      });
    }

    renderDrawerContent();
    const drawer = document.getElementById('machinesInspectorDrawer');
    if (drawer) drawer.classList.add('open');
  }

  function closeDrawer() {
    state.isDrawerOpen = false;
    state.selectedMetricId = null;
    state.selectedPin = null;

    const drawer = document.getElementById('machinesInspectorDrawer');
    if (drawer) drawer.classList.remove('open');

    // Unlock lineage
    handleRowLeave();
  }

  function switchDrawerTab(tab) {
    state.drawerTab = tab;
    renderDrawerContent();
  }

  function switchDialect(dialect) {
    state.selectedDialect = dialect;
    renderDrawerContent();
  }

  function renderDrawerContent() {
    const drawer = document.getElementById('machinesInspectorDrawer');
    if (!drawer || !state.selectedMetricId) return;

    const meta = (window.AdaptivePipelineCompiler && window.AdaptivePipelineCompiler.getDynamicMetric(state.selectedMetricId)) || METRIC_CATALOG[state.selectedMetricId];
    if (!meta) return;

    const dialect = state.selectedDialect || 'postgres';
    const sqlCode = (meta.sql && meta.sql[dialect]) || (meta.sql && meta.sql['postgres']) || `-- SQL Query:\n${state.editorSql}`;
    const explainPlans = meta.explainPlans || {
      mysql: `-> Filter: (Customer.referee_id <> 2 or Customer.referee_id is null)  (cost=0.65 rows=3)\n    -> Table scan on Customer  (cost=0.65 rows=6)`,
      postgres: `Seq Scan on Customer  (cost=0.00..1.08 rows=3 width=36)\n  Filter: ((referee_id <> 2) OR (referee_id IS NULL))\n  Rows Removed by Filter: 3`,
      duckdb: `┌───────────────────────────┐\n│         PROJECTION        │\n└─────────────┬─────────────┘\n┌─────────────┴─────────────┐\n│           FILTER          │\n└─────────────┬─────────────┘\n┌─────────────┴─────────────┐\n│          SEQ_SCAN         │\n└───────────────────────────┘`
    };
    const indexAdvice = meta.indexAdvice || {
      statement: `CREATE INDEX idx_customer_referee ON Customer(referee_id, name);`,
      estimatedSpeedup: '8.4x faster on >100k rows',
      reason: 'Covering B-Tree index satisfies filtering predicates and projections directly from leaf pages, converting a sequential O(N) table scan into an O(log N) index seek.'
    };

    drawer.innerHTML = `
      <!-- Header -->
      <div class="machines-drawer-header">
        <div class="machines-drawer-title-col">
          <div class="machines-drawer-title-row">
            ${state.selectedPin ? `<span class="machines-drawer-pin" style="background:${meta.color || '#38bdf8'}; color:#07090e; font-weight:700;">PIN ${state.selectedPin}</span>` : ''}
            <h3 class="machines-drawer-title">${escapeHtml(meta.title)}</h3>
          </div>
          <span class="machines-drawer-subtitle">${escapeHtml(meta.gauge || 'RELATIONAL EXECUTION NODE')}</span>
        </div>
        <button class="machines-drawer-close-btn" onclick="window.RelationalMachinesEngine.closeDrawer()" title="Close Inspector (Esc)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Drawer Multi-Tab Navigation Bar -->
      <div class="machines-drawer-nav">
        <button class="machines-drawer-nav-btn ${state.drawerTab === 'sql' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDrawerTab('sql')">
          <span>Production SQL</span>
        </button>
        <button class="machines-drawer-nav-btn ${state.drawerTab === 'plans' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDrawerTab('plans')">
          <span>Engine Plans</span>
        </button>
        <button class="machines-drawer-nav-btn ${state.drawerTab === 'advisor' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDrawerTab('advisor')">
          <span>Index Advisor</span>
        </button>
      </div>

      <!-- Body -->
      <div class="machines-drawer-body">
        
        ${state.drawerTab === 'sql' ? `
          <!-- Dialect Selector Tabs -->
          <div class="machines-dialect-tabs">
            <button class="machines-dialect-tab ${dialect === 'postgres' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDialect('postgres')">PostgreSQL 16</button>
            <button class="machines-dialect-tab ${dialect === 'snowflake' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDialect('snowflake')">Snowflake</button>
            <button class="machines-dialect-tab ${dialect === 'bigquery' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDialect('bigquery')">BigQuery</button>
            <button class="machines-dialect-tab ${dialect === 'duckdb' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchDialect('duckdb')">DuckDB / SQLite</button>
          </div>

          <!-- SQL Code Block Card -->
          <div class="machines-code-card">
            <div class="machines-code-toolbar">
              <span>SYNTHESIZED PRODUCTION CODE</span>
              <button class="machines-copy-code-btn" onclick="window.RelationalMachinesEngine.copyDrawerSql()">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
            <pre class="machines-code-pre"><code>${escapeHtml(sqlCode)}</code></pre>
          </div>
        ` : ''}

        ${state.drawerTab === 'plans' ? `
          <!-- Physical Engine Execution Plans -->
          <div class="machines-dossier-card">
            <div class="machines-dossier-label" style="color:#10b981;">MYSQL 8.0 PHYSICAL EXECUTION PLAN (EXPLAIN FORMAT=TREE)</div>
            <pre class="machines-code-pre" style="font-size:10.5px; background:#07090e; padding:10px; border-radius:6px; color:#34d399;"><code>${escapeHtml(explainPlans.mysql)}</code></pre>
          </div>

          <div class="machines-dossier-card" style="margin-top:12px;">
            <div class="machines-dossier-label" style="color:#38bdf8;">POSTGRESQL 16 PLAN (EXPLAIN ANALYZE, BUFFERS)</div>
            <pre class="machines-code-pre" style="font-size:10.5px; background:#07090e; padding:10px; border-radius:6px; color:#7dd3fc;"><code>${escapeHtml(explainPlans.postgres)}</code></pre>
          </div>

          <div class="machines-dossier-card" style="margin-top:12px;">
            <div class="machines-dossier-label" style="color:#a855f7;">DUCKDB VECTORIZED PIPELINE</div>
            <pre class="machines-code-pre" style="font-size:10px; background:#07090e; padding:10px; border-radius:6px; color:#c084fc;"><code>${escapeHtml(explainPlans.duckdb)}</code></pre>
          </div>
        ` : ''}

        ${state.drawerTab === 'advisor' ? `
          <!-- Staff Index Advisor -->
          <div class="machines-dossier-card accent-insight">
            <div class="machines-dossier-label">RECOMMENDED COVERING B-TREE INDEX</div>
            <pre class="machines-code-pre" style="background:#07090e; color:#fbbf24; font-size:11px; padding:10px; border-radius:6px;"><code>${escapeHtml(indexAdvice.statement)}</code></pre>
            <div style="font-size:11px; font-weight:600; color:#10b981; margin-top:8px;">Estimated Impact: ${escapeHtml(indexAdvice.estimatedSpeedup)}</div>
            <p class="machines-dossier-text" style="margin-top:6px; font-size:11.5px; line-height:1.6; color:#cbd5e1;">${escapeHtml(indexAdvice.reason)}</p>
          </div>
        ` : ''}

        <!-- Structured Metadata Cards -->
        <div class="machines-dossier-card">
          <div class="machines-dossier-label">RELATIONAL GRAIN &amp; INVARIANTS</div>
          <p class="machines-dossier-text">${escapeHtml(meta.grain || '1 tuple grain')}</p>
          <p class="machines-dossier-text" style="margin-top:4px; color:#94a3b8;">${escapeHtml(meta.audit || 'Invariants verified')}</p>
        </div>

        <div class="machines-dossier-card accent-pitfall">
          <div class="machines-dossier-label">THREE-VALUED LOGIC &amp; EDGE TRAPS</div>
          <p class="machines-dossier-text">${escapeHtml(meta.edgeCase || 'NULL propagation in predicates')}</p>
        </div>

        <div class="machines-dossier-card accent-interview">
          <div class="machines-dossier-label">STAFF ARCHITECT TALKING POINT</div>
          <p class="machines-dossier-text">${escapeHtml(meta.interviewQuestion || 'Explain the trade-offs between Hash Join and Nested Loop execution.')}</p>
        </div>

      </div>
    `;
  }

  function copyDrawerSql() {
    const meta = (window.AdaptivePipelineCompiler && window.AdaptivePipelineCompiler.getDynamicMetric(state.selectedMetricId)) || METRIC_CATALOG[state.selectedMetricId];
    if (!meta) return;
    const sqlCode = (meta.sql && meta.sql[state.selectedDialect]) || (meta.sql && meta.sql['postgres']) || state.editorSql;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(sqlCode).then(() => {
        if (window.SQL_BUDDY) window.SQL_BUDDY.say("Copied SQL query to clipboard!", 2500, 'happy');
      });
    }
  }

  // ---------------------------------------------------------------------------
  // MAIN STUDIO VIEW RENDERER (Split Studio, Curated Blueprints, LeetCode 323)
  // ---------------------------------------------------------------------------
  let compileDebounceTimer = null;

  
  function setViewMode(mode) {
    state.viewMode = mode;
    renderView();
  }

  function setZoom(level) {
    if (level === 1.0) state.zoomLevel = 1.0;
    else state.zoomLevel = Math.max(0.6, Math.min(1.8, state.zoomLevel * level));
    renderView();
  }

  // ===========================================================================
  // ANALYTICAL MICRO-CHART & VISUAL RESULT GENERATOR (BI LAYER)
  // Provides interactive SVG/HTML charts for Cohorts, MRR Waterfalls, Rolling Trends,
  // E-Commerce Metric Trees, and Financial Ledger Balance Gauges.
  // ===========================================================================

  function renderAnalyticalChart(st) {
    const bp = st.selectedBlueprint;
    const sql = (st.editorSql || '').toLowerCase();

    if (bp === 'bp_retention' || sql.includes('cohort') || sql.includes('user_cohorts')) {
      return renderCohortRetentionChart();
    } else if (bp === 'bp_mrr' || sql.includes('mrr') || sql.includes('waterfall')) {
      return renderMrrWaterfallChart();
    } else if (bp === 'bp_rolling' || sql.includes('rolling') || sql.includes('rows between')) {
      return renderRollingTrendChart();
    } else if (bp === 'bp_metrics' || sql.includes('aov') || sql.includes('order_frequency') || sql.includes('retail_orders')) {
      return renderMetricTreeChart();
    } else if (bp === 'bp_gl_invariant' || sql.includes('debit') || sql.includes('general_ledger')) {
      return renderGlBalanceChart();
    } else if (bp === 'bp_settlement' || sql.includes('clearing') || sql.includes('executed_trades')) {
      return renderSettlementReconChart();
    } else if (bp === 'bp_drawdown' || bp === 'bp_var99' || sql.includes('high_water_mark') || sql.includes('drawdown')) {
      return renderPortfolioRiskChart();
    } else {
      return renderGenericAnalyticsChart(st);
    }
  }

  function renderCohortRetentionChart() {
    const cohorts = [
      { m: '2024-01', size: '12,450', rates: [100.0, 78.4, 66.2, 55.8, 49.3, 45.1] },
      { m: '2024-02', size: '14,100', rates: [100.0, 77.1, 64.9, 54.2, 48.0, null] },
      { m: '2024-03', size: '15,820', rates: [100.0, 76.5, 63.8, 53.9, null, null] },
      { m: '2024-04', size: '18,200', rates: [100.0, 75.8, 62.4, null, null, null] },
      { m: '2024-05', size: '21,400', rates: [100.0, 74.9, null, null, null, null] },
      { m: '2024-06', size: '23,800', rates: [100.0, null, null, null, null, null] }
    ];

    function getCellColor(pct) {
      if (pct === null) return 'transparent';
      const alpha = 0.15 + (pct / 100.0) * 0.65;
      return `rgba(16, 185, 129, ${alpha.toFixed(2)})`;
    }

    return `
      <div class="analytics-chart-container">
        <div class="analytics-chart-header">
          <div class="analytics-chart-title-group">
            <span class="analytics-chart-badge">SaaS Growth &amp; Retention Analytics</span>
            <h3 class="analytics-chart-title">Vintage Cohort Retention Triangular Matrix</h3>
            <p class="analytics-chart-desc">Tracks monthly active user retention across subsequent billing cycles (M+0 to M+5)</p>
          </div>
          <div class="analytics-kpi-row">
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Month 1 Retention</span>
              <span class="kpi-val text-emerald">77.1%</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">M+5 Baseline</span>
              <span class="kpi-val text-cyan">45.1%</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Net Dollar Retention</span>
              <span class="kpi-val text-indigo">119.4%</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">LTV / CAC Payback</span>
              <span class="kpi-val text-amber">5.8 Months</span>
            </div>
          </div>
        </div>

        <div class="cohort-heatmap-wrapper">
          <table class="cohort-heatmap-table">
            <thead>
              <tr>
                <th>Cohort Month</th>
                <th>Users</th>
                <th>M+0</th>
                <th>M+1</th>
                <th>M+2</th>
                <th>M+3</th>
                <th>M+4</th>
                <th>M+5</th>
              </tr>
            </thead>
            <tbody>
              ${cohorts.map(c => `
                <tr>
                  <td>${c.m}</td>
                  <td>${c.size}</td>
                  ${c.rates.map((r, idx) => `
                    <td class="cohort-cell ${r === null ? 'cohort-empty' : ''}" 
                        style="background: ${getCellColor(r)};"
                        title="${r !== null ? `Cohort ${c.m} | Month ${idx}: ${r.toFixed(1)}% retained` : ''}">
                      ${r !== null ? `${r.toFixed(1)}%` : '&mdash;'}
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="chart-legend-row">
          <span style="font-weight:600; color:var(--text-primary);">Decay Insight:</span>
          <span>Retention curve reaches steady-state asymptopic plateau at M+4 (48.0%), validating strong product-market fit.</span>
          <span style="margin-left:auto; font-size:10px; color:#10b981;">● Emerald scale corresponds to retention intensity</span>
        </div>
      </div>
    `;
  }

  function renderMrrWaterfallChart() {
    return `
      <div class="analytics-chart-container">
        <div class="analytics-chart-header">
          <div class="analytics-chart-title-group">
            <span class="analytics-chart-badge" style="color:#0ea5e9; background:rgba(14,165,233,0.12); border-color:rgba(14,165,233,0.3);">Financial SaaS Engine</span>
            <h3 class="analytics-chart-title">5-Way Monthly Recurring Revenue (MRR) Waterfall</h3>
            <p class="analytics-chart-desc">Decomposes revenue growth into New, Expansion, Contraction, and Churn components</p>
          </div>
          <div class="analytics-kpi-row">
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Ending MRR</span>
              <span class="kpi-val text-emerald">$412,300</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Net New MRR</span>
              <span class="kpi-val text-cyan">+$58,500/mo</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">SaaS Quick Ratio</span>
              <span class="kpi-val text-indigo">4.1x</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Gross Margin</span>
              <span class="kpi-val text-amber">82.4%</span>
            </div>
          </div>
        </div>

        <div class="waterfall-chart-wrap">
          <svg viewBox="0 0 800 240" style="width:100%; height:auto; display:block;">
            <defs>
              <linearGradient id="gradEmerald" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#10b981" stop-opacity="0.9"/><stop offset="100%" stop-color="#059669" stop-opacity="0.7"/></linearGradient>
              <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/><stop offset="100%" stop-color="#0284c7" stop-opacity="0.7"/></linearGradient>
              <linearGradient id="gradAmber" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f59e0b" stop-opacity="0.9"/><stop offset="100%" stop-color="#d97706" stop-opacity="0.7"/></linearGradient>
              <linearGradient id="gradRose" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f43f5e" stop-opacity="0.9"/><stop offset="100%" stop-color="#e11d48" stop-opacity="0.7"/></linearGradient>
            </defs>
            <!-- Zero Axis -->
            <line x1="40" y1="140" x2="760" y2="140" stroke="rgba(255,255,255,0.15)" stroke-dasharray="4,4"/>
            <text x="35" y="143" fill="#64748b" font-size="9" font-family="monospace" text-anchor="end">$0</text>
            <text x="35" y="60" fill="#64748b" font-size="9" font-family="monospace" text-anchor="end">+$60k</text>
            <text x="35" y="210" fill="#64748b" font-size="9" font-family="monospace" text-anchor="end">-$20k</text>

            <!-- Jan -->
            <g transform="translate(80, 0)">
              <rect x="0" y="80" width="32" height="60" rx="3" fill="url(#gradEmerald)"/>
              <rect x="36" y="115" width="22" height="25" rx="3" fill="url(#gradCyan)"/>
              <rect x="62" y="140" width="18" height="12" rx="3" fill="url(#gradAmber)"/>
              <rect x="84" y="140" width="18" height="20" rx="3" fill="url(#gradRose)"/>
              <text x="52" y="230" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Jan</text>
            </g>

            <!-- Feb -->
            <g transform="translate(220, 0)">
              <rect x="0" y="70" width="32" height="70" rx="3" fill="url(#gradEmerald)"/>
              <rect x="36" y="105" width="22" height="35" rx="3" fill="url(#gradCyan)"/>
              <rect x="62" y="140" width="18" height="14" rx="3" fill="url(#gradAmber)"/>
              <rect x="84" y="140" width="18" height="22" rx="3" fill="url(#gradRose)"/>
              <text x="52" y="230" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Feb</text>
            </g>

            <!-- Mar -->
            <g transform="translate(360, 0)">
              <rect x="0" y="62" width="32" height="78" rx="3" fill="url(#gradEmerald)"/>
              <rect x="36" y="98" width="22" height="42" rx="3" fill="url(#gradCyan)"/>
              <rect x="62" y="140" width="18" height="15" rx="3" fill="url(#gradAmber)"/>
              <rect x="84" y="140" width="18" height="21" rx="3" fill="url(#gradRose)"/>
              <text x="52" y="230" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Mar</text>
            </g>

            <!-- Apr -->
            <g transform="translate(500, 0)">
              <rect x="0" y="55" width="32" height="85" rx="3" fill="url(#gradEmerald)"/>
              <rect x="36" y="90" width="22" height="50" rx="3" fill="url(#gradCyan)"/>
              <rect x="62" y="140" width="18" height="18" rx="3" fill="url(#gradAmber)"/>
              <rect x="84" y="140" width="18" height="25" rx="3" fill="url(#gradRose)"/>
              <text x="52" y="230" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Apr</text>
            </g>

            <!-- May -->
            <g transform="translate(640, 0)">
              <rect x="0" y="46" width="32" height="94" rx="3" fill="url(#gradEmerald)"/>
              <rect x="36" y="82" width="22" height="58" rx="3" fill="url(#gradCyan)"/>
              <rect x="62" y="140" width="18" height="20" rx="3" fill="url(#gradAmber)"/>
              <rect x="84" y="140" width="18" height="26" rx="3" fill="url(#gradRose)"/>
              <text x="52" y="230" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">May</text>
            </g>

            <!-- Net Trajectory Line -->
            <polyline points="132,95 272,82 412,70 552,58 692,44" fill="none" stroke="#f8fafc" stroke-width="2" stroke-dasharray="3,3"/>
            <circle cx="692" cy="44" r="4" fill="#38bdf8"/>
          </svg>
        </div>

        <div class="chart-legend-row">
          <div class="legend-item"><span class="legend-swatch" style="background:#10b981;"></span><span>+New MRR</span></div>
          <div class="legend-item"><span class="legend-swatch" style="background:#38bdf8;"></span><span>+Expansion</span></div>
          <div class="legend-item"><span class="legend-swatch" style="background:#f59e0b;"></span><span>-Contraction</span></div>
          <div class="legend-item"><span class="legend-swatch" style="background:#f43f5e;"></span><span>-Churn</span></div>
          <div class="legend-item" style="margin-left:auto;"><span style="color:#f8fafc; font-weight:700;">-- Net New MRR Path</span></div>
        </div>
      </div>
    `;
  }

  function renderRollingTrendChart() {
    return `
      <div class="analytics-chart-container">
        <div class="analytics-chart-header">
          <div class="analytics-chart-title-group">
            <span class="analytics-chart-badge">Sliding Frame Windowing</span>
            <h3 class="analytics-chart-title">7-Day Rolling Revenue Average &amp; Volatility</h3>
            <p class="analytics-chart-desc">Eliminates day-of-week seasonality via ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</p>
          </div>
          <div class="analytics-kpi-row">
            <div class="analytics-kpi-chip">
              <span class="kpi-label">7D Rolling Velocity</span>
              <span class="kpi-val text-cyan">$42,650/day</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Weekly Volatility</span>
              <span class="kpi-val text-amber">&plusmn;$3,120</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">MoM Trend</span>
              <span class="kpi-val text-emerald">+18.2%</span>
            </div>
          </div>
        </div>

        <div class="trend-sparkline-wrap">
          <svg viewBox="0 0 800 220" style="width:100%; height:auto; display:block;">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <!-- Background Grid -->
            <line x1="50" y1="40" x2="770" y2="40" stroke="rgba(255,255,255,0.06)"/>
            <line x1="50" y1="90" x2="770" y2="90" stroke="rgba(255,255,255,0.06)"/>
            <line x1="50" y1="140" x2="770" y2="140" stroke="rgba(255,255,255,0.06)"/>
            <line x1="50" y1="190" x2="770" y2="190" stroke="rgba(255,255,255,0.12)"/>

            <!-- Raw Daily Bars Silhouette -->
            <rect x="70" y="110" width="12" height="80" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="110" y="130" width="12" height="60" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="150" y="80" width="12" height="110" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="190" y="100" width="12" height="90" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="230" y="60" width="12" height="130" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="270" y="140" width="12" height="50" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="310" y="90" width="12" height="100" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="350" y="70" width="12" height="120" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="390" y="85" width="12" height="105" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="430" y="55" width="12" height="135" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="470" y="65" width="12" height="125" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="510" y="45" width="12" height="145" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="550" y="75" width="12" height="115" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="590" y="50" width="12" height="140" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="630" y="40" width="12" height="150" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="670" y="60" width="12" height="130" rx="2" fill="rgba(255,255,255,0.06)"/>
            <rect x="710" y="35" width="12" height="155" rx="2" fill="rgba(255,255,255,0.06)"/>

            <!-- Area Path -->
            <path d="M76,120 C150,110 230,85 316,92 C400,98 480,68 560,62 C640,55 700,40 716,38 L716,190 L76,190 Z" fill="url(#areaGradient)"/>

            <!-- 7-Day Rolling Moving Average Line -->
            <path d="M76,120 C150,110 230,85 316,92 C400,98 480,68 560,62 C640,55 700,40 716,38" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>

            <!-- Data Point -->
            <circle cx="716" cy="38" r="4.5" fill="#38bdf8" stroke="#06070a" stroke-width="2"/>
            <text x="716" y="24" fill="#38bdf8" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle">$42,650</text>
          </svg>
        </div>

        <div class="chart-legend-row">
          <div class="legend-item"><span class="legend-swatch" style="background:#38bdf8;"></span><span>7-Day Smoothed Moving Average (AVG() OVER ROWS BETWEEN 6 PRECEDING)</span></div>
          <div class="legend-item"><span class="legend-swatch" style="background:rgba(255,255,255,0.15);"></span><span>Raw Daily Revenue Scans</span></div>
        </div>
      </div>
    `;
  }

  function renderMetricTreeChart() {
    return `
      <div class="analytics-chart-container">
        <div class="analytics-chart-header">
          <div class="analytics-chart-title-group">
            <span class="analytics-chart-badge" style="color:#10b981; background:rgba(16,185,129,0.12); border-color:rgba(16,185,129,0.3);">Enterprise Metric Tree</span>
            <h3 class="analytics-chart-title">E-Commerce Topline Revenue Decomposition</h3>
            <p class="analytics-chart-desc">Hierarchical breakdown: Revenue = Orders &times; AOV = Customers &times; Frequency &times; AOV</p>
          </div>
          <div class="analytics-kpi-row">
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Gross Revenue</span>
              <span class="kpi-val text-emerald">$1,248,500</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Total Orders</span>
              <span class="kpi-val text-cyan">14,250</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Average Order Value</span>
              <span class="kpi-val text-indigo">$87.61</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Order Frequency</span>
              <span class="kpi-val text-amber">1.51x</span>
            </div>
          </div>
        </div>

        <div class="metric-tree-wrap">
          <svg viewBox="0 0 800 240" style="width:100%; height:auto; display:block;">
            <!-- Tree Connectors -->
            <path d="M180,120 C240,120 240,65 320,65" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.8"/>
            <path d="M180,120 C240,120 240,175 320,175" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.8"/>
            <path d="M480,65 C540,65 540,35 600,35" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.8"/>
            <path d="M480,65 C540,65 540,95 600,95" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.8"/>

            <!-- Root Node: Gross Revenue -->
            <g transform="translate(40, 90)">
              <rect width="140" height="60" rx="8" fill="#111827" stroke="#10b981" stroke-width="1.5"/>
              <text x="14" y="24" fill="#9ca3af" font-size="9" font-family="monospace">TOPLINE REVENUE</text>
              <text x="14" y="46" fill="#10b981" font-size="16" font-family="monospace" font-weight="700">$1,248,500</text>
            </g>

            <!-- Branch Node 1: Orders -->
            <g transform="translate(320, 35)">
              <rect width="160" height="60" rx="8" fill="#111827" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="14" y="24" fill="#9ca3af" font-size="9" font-family="monospace">TOTAL ORDERS (COUNT)</text>
              <text x="14" y="46" fill="#38bdf8" font-size="16" font-family="monospace" font-weight="700">14,250</text>
            </g>

            <!-- Branch Node 2: AOV -->
            <g transform="translate(320, 145)">
              <rect width="160" height="60" rx="8" fill="#111827" stroke="#818cf8" stroke-width="1.5"/>
              <text x="14" y="24" fill="#9ca3af" font-size="9" font-family="monospace">AVG ORDER VALUE (AOV)</text>
              <text x="14" y="46" fill="#818cf8" font-size="16" font-family="monospace" font-weight="700">$87.61</text>
            </g>

            <!-- Sub Node 1a: Unique Customers -->
            <g transform="translate(600, 5)">
              <rect width="160" height="55" rx="8" fill="#111827" stroke="rgba(255,255,255,0.15)"/>
              <text x="14" y="22" fill="#9ca3af" font-size="9" font-family="monospace">UNIQUE CUSTOMERS</text>
              <text x="14" y="42" fill="#f8fafc" font-size="14" font-family="monospace" font-weight="700">9,410</text>
            </g>

            <!-- Sub Node 1b: Frequency -->
            <g transform="translate(600, 70)">
              <rect width="160" height="55" rx="8" fill="#111827" stroke="rgba(255,255,255,0.15)"/>
              <text x="14" y="22" fill="#9ca3af" font-size="9" font-family="monospace">PURCHASE FREQUENCY</text>
              <text x="14" y="42" fill="#fbbf24" font-size="14" font-family="monospace" font-weight="700">1.51x</text>
            </g>
          </svg>
        </div>

        <div class="chart-legend-row">
          <span style="font-weight:600; color:var(--text-primary);">Mathematical Multiplier:</span>
          <span>A +5% lift in AOV directly generates <strong>+$62,425 incremental margin</strong> with zero extra customer acquisition expenditure.</span>
        </div>
      </div>
    `;
  }

  function renderGlBalanceChart() {
    return `
      <div class="analytics-chart-container">
        <div class="analytics-chart-header">
          <div class="analytics-chart-title-group">
            <span class="analytics-chart-badge" style="color:#fbbf24; background:rgba(251,191,36,0.12); border-color:rgba(251,191,36,0.3);">JPMorgan Core Banking</span>
            <h3 class="analytics-chart-title">Double-Entry General Ledger Balance Audit</h3>
            <p class="analytics-chart-desc">Enforces mathematical accounting invariant: Total Debits must exactly equal Total Credits</p>
          </div>
          <div class="analytics-kpi-row">
            <div class="balance-status-badge">
              <span>&#10003;</span>
              <span>LEDGER PERFECTLY BALANCED</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Net Variance</span>
              <span class="kpi-val text-emerald">$0.00</span>
            </div>
          </div>
        </div>

        <div class="balance-scale-hero">
          <div class="balance-side">
            <span class="balance-side-label">Total Debits (USD)</span>
            <span class="balance-side-val text-emerald">$4,850,200.00</span>
          </div>
          <div class="balance-fulcrum-icon">&#9878;</div>
          <div class="balance-side">
            <span class="balance-side-label">Total Credits (USD)</span>
            <span class="balance-side-val text-cyan">$4,850,200.00</span>
          </div>
        </div>

        <div class="cohort-heatmap-wrapper">
          <table class="cohort-heatmap-table">
            <thead>
              <tr>
                <th>Legal Entity</th>
                <th>Account Code</th>
                <th>Total Debits</th>
                <th>Total Credits</th>
                <th>Net Variance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>JPMC_US_RETAIL</td>
                <td>1010-CASH-DEP</td>
                <td>$2,140,000.00</td>
                <td>$2,140,000.00</td>
                <td style="color:#10b981;">$0.00</td>
                <td><span style="color:#10b981; font-weight:700;">&#10003; BALANCED</span></td>
              </tr>
              <tr>
                <td>JPMC_UK_IB</td>
                <td>2040-NOSTRO-GBP</td>
                <td>$1,420,200.00</td>
                <td>$1,420,200.00</td>
                <td style="color:#10b981;">$0.00</td>
                <td><span style="color:#10b981; font-weight:700;">&#10003; BALANCED</span></td>
              </tr>
              <tr>
                <td>JPMC_EU_SE</td>
                <td>3010-INTERBANK-EUR</td>
                <td>$1,290,000.00</td>
                <td>$1,290,000.00</td>
                <td style="color:#10b981;">$0.00</td>
                <td><span style="color:#10b981; font-weight:700;">&#10003; BALANCED</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="chart-legend-row">
          <span style="font-weight:600; color:var(--text-primary);">Regulatory Mandate:</span>
          <span>Federal Reserve Regulation D &amp; SOX &sect;404 require zero intraday ledger discrepancy tolerance.</span>
        </div>
      </div>
    `;
  }

  function renderSettlementReconChart() {
    return `
      <div class="analytics-chart-container">
        <div class="analytics-chart-header">
          <div class="analytics-chart-title-group">
            <span class="analytics-chart-badge" style="color:#fbbf24; background:rgba(251,191,36,0.12); border-color:rgba(251,191,36,0.3);">Prime Brokerage &amp; Custody</span>
            <h3 class="analytics-chart-title">SEC T+1 Trade Settlement &amp; Custody Reconciliation</h3>
            <p class="analytics-chart-desc">Dual-sided pairing between Executed Blotter and Clearing Broker manifest</p>
          </div>
          <div class="analytics-kpi-row">
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Executed Shares</span>
              <span class="kpi-val text-cyan">4,500,000</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Cleared Shares</span>
              <span class="kpi-val text-emerald">4,482,000</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Match Rate</span>
              <span class="kpi-val text-emerald">98.2%</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Capital at Risk</span>
              <span class="kpi-val text-rose">$142,500</span>
            </div>
          </div>
        </div>

        <div class="waterfall-chart-wrap">
          <div style="display:flex; gap:16px; align-items:center; flex-wrap:wrap;">
            <div style="flex:1; min-width:240px;">
              <div style="font-size:11px; font-family:monospace; margin-bottom:6px; color:#94a3b8;">SETTLEMENT BREAK CLASSIFICATION</div>
              <div style="height:12px; display:flex; border-radius:6px; overflow:hidden; background:#1e293b;">
                <div style="width:98.2%; background:#10b981;" title="CLEARED_MATCHED: 98.2%"></div>
                <div style="width:1.4%; background:#f59e0b;" title="QUANTITY_MISMATCH: 1.4%"></div>
                <div style="width:0.4%; background:#f43f5e;" title="ORPHANED_EXECUTION: 0.4%"></div>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:10px; font-family:monospace; margin-top:6px; color:#94a3b8;">
                <span style="color:#10b981;">&#9632; Matched (4.48M)</span>
                <span style="color:#f59e0b;">&#9632; Quantity Break (14.2k)</span>
                <span style="color:#f43f5e;">&#9632; Orphaned (3.8k)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPortfolioRiskChart() {
    return `
      <div class="analytics-chart-container">
        <div class="analytics-chart-header">
          <div class="analytics-chart-title-group">
            <span class="analytics-chart-badge" style="color:#f43f5e; background:rgba(244,63,94,0.12); border-color:rgba(244,63,94,0.3);">Quantitative Asset Management</span>
            <h3 class="analytics-chart-title">Portfolio Drawdown &amp; 99% Value-at-Risk (VaR)</h3>
            <p class="analytics-chart-desc">Peak-to-trough downside volatility and tail loss percentile threshold</p>
          </div>
          <div class="analytics-kpi-row">
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Peak NAV</span>
              <span class="kpi-val text-emerald">$128.5M</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Max Drawdown</span>
              <span class="kpi-val text-rose">-14.2%</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">99% 1-Day VaR</span>
              <span class="kpi-val text-amber">-$1.85M</span>
            </div>
          </div>
        </div>

        <div class="trend-sparkline-wrap">
          <svg viewBox="0 0 800 180" style="width:100%; height:auto; display:block;">
            <defs>
              <linearGradient id="drawdownGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.0"/>
                <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.35"/>
              </linearGradient>
            </defs>
            <line x1="40" y1="30" x2="760" y2="30" stroke="rgba(255,255,255,0.2)" stroke-dasharray="3,3"/>
            <text x="35" y="34" fill="#10b981" font-size="9" font-family="monospace" text-anchor="end">Peak (0%)</text>
            <text x="35" y="160" fill="#f43f5e" font-size="9" font-family="monospace" text-anchor="end">-15%</text>

            <!-- Drawdown Underwater Curve -->
            <path d="M40,30 C120,30 160,85 240,110 C320,135 360,150 440,120 C520,90 600,45 680,48 C720,50 760,35 760,35 L760,30 L40,30 Z" fill="url(#drawdownGrad)"/>
            <path d="M40,30 C120,30 160,85 240,110 C320,135 360,150 440,120 C520,90 600,45 680,48 C720,50 760,35 760,35" fill="none" stroke="#f43f5e" stroke-width="2.2"/>
            <circle cx="360" cy="150" r="4.5" fill="#f43f5e" stroke="#06070a" stroke-width="2"/>
            <text x="360" y="172" fill="#f43f5e" font-size="10" font-family="monospace" font-weight="700" text-anchor="middle">Max Drawdown: -14.2%</text>
          </svg>
        </div>
      </div>
    `;
  }

  function renderGenericAnalyticsChart(st) {
    return `
      <div class="analytics-chart-container">
        <div class="analytics-chart-header">
          <div class="analytics-chart-title-group">
            <span class="analytics-chart-badge">Query Execution Profiler</span>
            <h3 class="analytics-chart-title">Relational Execution Profile &amp; Cardinality Sinks</h3>
            <p class="analytics-chart-desc">Compiled from reactive AST with zero memory leaks</p>
          </div>
          <div class="analytics-kpi-row">
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Pipeline Chambers</span>
              <span class="kpi-val text-cyan">${st.chamberCount || 3} Chambers</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Dialect Portability</span>
              <span class="kpi-val text-emerald">100% ANSI</span>
            </div>
            <div class="analytics-kpi-chip">
              <span class="kpi-label">Volcano Iterator</span>
              <span class="kpi-val text-indigo">Active Stream</span>
            </div>
          </div>
        </div>

        <div class="cohort-heatmap-wrapper" style="padding:16px;">
          <div style="font-size:12px; font-family:monospace; line-height:1.6; color:#94a3b8;">
            <div style="color:#f8fafc; font-weight:700; margin-bottom:8px;">EXECUTION DIAGNOSTICS:</div>
            <div>&bull; Physical Source Scan: In-Memory Volcano Table Iterator</div>
            <div>&bull; Predicate Pushdown: SARGable index filters verified</div>
            <div>&bull; Projection Sink: Clean tuple emission to client stream</div>
            <div style="margin-top:14px;">
              <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.setViewMode('pipeline')" style="display:inline-flex; align-items:center; gap:6px;">
                <span>&larr; Switch back to ⬡ Relational Flow (SVG)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

function renderView() {
    const container = document.getElementById('viewRelationalMachines');
    if (!container) return;

    // Compile SVG for current query
    let machineSvg = '';
    let chamberCount = 3;
    let isError = false;

    if (state.catalogMode === 'blueprints' && state.selectedBlueprint === 'bp_metrics') {
      machineSvg = getDraft1Svg();
    } else if (state.catalogMode === 'blueprints' && state.selectedBlueprint === 'bp_rolling') {
      machineSvg = getDraft2Svg();
    } else if (state.catalogMode === 'blueprints' && state.selectedBlueprint === 'bp_retention') {
      machineSvg = getDraft3Svg();
    } else {
      if (window.AdaptivePipelineCompiler) {
        const compiled = window.AdaptivePipelineCompiler.compileAndRender(state.editorSql);
        if (compiled) {
          machineSvg = compiled.svg;
          chamberCount = compiled.chamberCount;
          state.chamberCount = chamberCount;
          state.astStatus = 'valid';
        } else {
          machineSvg = '<div style="padding:60px 20px; text-align:center; color:#f43f5e; font-family:monospace; font-size:12px;">Syntax Notice: Complete SELECT and FROM clauses to render pipeline</div>';
          state.astStatus = 'error';
          isError = true;
        }
      }
    }

    container.innerHTML = `
      <div class="machines-studio-wrapper ${state.canvasTheme === 'dark' ? 'theme-dark' : 'theme-light'}">
        
        <!-- Topbar Header -->
        <header class="machines-topbar">
          <div class="machines-topbar-left">
            <div class="machines-brand">
              <span class="machines-brand-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
              </span>
              <div>
                <h2 class="machines-title">Relational Machines</h2>
                <span class="machines-subtitle">Interactive Topological SQL Studio</span>
              </div>
            </div>

            <!-- Mode Selector: Blueprints vs LeetCode vs Custom -->
            <div class="machines-catalog-tabs">
              <button class="machines-cat-btn ${state.catalogMode === 'blueprints' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchCatalogMode('blueprints')">
                <span>Blueprints</span>
              </button>
              <button class="machines-cat-btn ${state.catalogMode === 'leetcode' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchCatalogMode('leetcode')">
                <span>LeetCode 323</span>
              </button>
              <button class="machines-cat-btn ${state.catalogMode === 'custom' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.switchCatalogMode('custom')">
                <span>Custom Playground</span>
              </button>
            </div>
          </div>

          <div class="machines-topbar-right">
            <!-- Layout Switcher: Split vs Canvas vs Query -->
            <div class="machines-layout-pills">
              <button class="machines-layout-btn ${state.layoutMode === 'split' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.setLayoutMode('split')" title="Split View: Editor + Machine">
                <span>◧ Split</span>
              </button>
              <button class="machines-layout-btn ${state.layoutMode === 'canvas' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.setLayoutMode('canvas')" title="Canvas Focus: Full Width Diagram">
                <span>⬡ Canvas</span>
              </button>
              <button class="machines-layout-btn ${state.layoutMode === 'query' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.setLayoutMode('query')" title="Code Focus: Query Editor Only">
                <span>◨ Code</span>
              </button>
            </div>

            <!-- Export Tools -->
            <div class="machines-tools-group" style="display:flex; align-items:center; gap:6px;">
              <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.openDbtModal()" title="Export as dbt Model, Tests & Semantic YAML">
                <span>dbt Export</span>
              </button>
              <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.downloadSvg()" title="Download Standalone SVG">
                <span>SVG</span>
              </button>
              <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.exportRetinaPng()" title="Export 2x Retina PNG for docs & slides">
                <span>PNG (2x)</span>
              </button>
              <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.copySvgCode()" title="Copy Raw SVG XML">
                <span>Copy</span>
              </button>
            </div>
          </div>
        </header>

        <!-- Secondary Selector Sub-Bar -->
        <div class="machines-catalog-subbar">
          ${state.catalogMode === 'blueprints' ? `
            <div class="machines-preset-chips">
              ${BLUEPRINT_PRESETS.map(bp => `
                <button class="machines-preset-chip ${state.selectedBlueprint === bp.id ? 'active' : ''}" onclick="window.RelationalMachinesEngine.selectBlueprint('${bp.id}')">
                  ${escapeHtml(bp.title)}
                </button>
              `).join('')}
            </div>
          ` : ''}

          ${state.catalogMode === 'leetcode' ? `
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; width:100%;">
              <span style="font-size:11px; font-weight:600; color:var(--text-secondary);">Select Problem:</span>
              <select class="machines-problem-selector" onchange="window.RelationalMachinesEngine.selectLeetCodeProblem(this.value)">
                ${FEATURED_LEETCODE.map(p => `
                  <option value="${p.id}" ${state.selectedProblemId === p.id ? 'selected' : ''}>#${p.id}: ${p.title} (${p.diff} - ${p.tag})</option>
                `).join('')}
              </select>
              <div class="machines-preset-chips" style="margin-left:auto;">
                ${FEATURED_LEETCODE.slice(0, 4).map(p => `
                  <button class="machines-preset-chip ${state.selectedProblemId === p.id ? 'active' : ''}" onclick="window.RelationalMachinesEngine.selectLeetCodeProblem('${p.id}')">
                    #${p.id} ${escapeHtml(p.title)}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${state.catalogMode === 'custom' ? `
            <div style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:8px;">
              <span style="font-size:11px; color:var(--text-secondary); font-family:var(--font-mono, monospace);">CUSTOM RELATIONAL PLAYGROUND &bull; 3 TO 6 CHAMBERS ADAPTIVE</span>
              <div class="machines-snippet-pills">
                <button class="machines-snippet-pill" onclick="window.RelationalMachinesEngine.insertSqlSnippet('where')">+ WHERE Filter</button>
                <button class="machines-snippet-pill" onclick="window.RelationalMachinesEngine.insertSqlSnippet('join')">+ JOIN</button>
                <button class="machines-snippet-pill" onclick="window.RelationalMachinesEngine.insertSqlSnippet('group')">+ GROUP BY</button>
                <button class="machines-snippet-pill" onclick="window.RelationalMachinesEngine.insertSqlSnippet('window')">+ WINDOW Rank</button>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Main Workspace (Split Grid) -->
        <div class="machines-split-grid mode-${state.layoutMode}">
          
          <!-- Left: Reactive SQL Editor -->
          <div class="machines-editor-pane">
            <div class="machines-editor-header">
              <span class="machines-editor-title">SQLITE / ANSI QUERY EDITOR</span>
              <span class="machines-ast-badge ${isError ? 'error' : ''}">
                ${isError ? '● SYNTAX NOTICE' : `● ${state.chamberCount || 3} CHAMBERS LIVE`}
              </span>
            </div>
            <textarea id="machinesEditorTextarea" class="machines-sql-textarea" spellcheck="false" 
                      oninput="window.RelationalMachinesEngine.handleEditorInput(this.value)">${escapeHtml(state.editorSql)}</textarea>
            <div class="machines-editor-footer">
              <span style="font-size:10px; color:var(--text-muted); font-family:var(--font-mono, monospace);">Auto-compiles on keystroke</span>
              <div class="machines-editor-actions">
                <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.formatSql()" title="Format SQL query">Format</button>
                <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.copyEditorSql()" title="Copy SQL query">Copy SQL</button>
              </div>
            </div>
          </div>

          <!-- Right: Topological Machine Canvas -->
          <div class="machines-canvas-pane">
            <main class="machines-canvas-card">
              <div class="machines-canvas-toolbar">
                <div class="machines-viewmode-pills">
                  <button class="machines-viewmode-btn ${state.viewMode !== 'chart' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.setViewMode('pipeline')" title="View Topological Execution Chambers">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 8 8 12 12 16 16 12 12 8"></polygon></svg>
                    <span>Relational Flow</span>
                  </button>
                  <button class="machines-viewmode-btn ${state.viewMode === 'chart' ? 'active' : ''}" onclick="window.RelationalMachinesEngine.setViewMode('chart')" title="View Interactive Analytical Micro-Chart (BI Mode)">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"></path><rect x="7" y="10" width="3" height="8"></rect><rect x="14" y="5" width="3" height="13"></rect></svg>
                    <span>Analytical Chart (BI)</span>
                  </button>
                </div>
                <div class="machines-zoom-controls">
                  <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.setZoom(0.85)" title="Zoom Out">-</button>
                  <span style="font-size:11px; font-family:var(--font-mono, monospace); color:var(--text-secondary); min-width:32px; text-align:center;">${Math.round(state.zoomLevel * 100)}%</span>
                  <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.setZoom(1.15)" title="Zoom In">+</button>
                  <button class="machine-action-btn" onclick="window.RelationalMachinesEngine.setZoom(1.0)" title="Reset Zoom">1:1</button>
                </div>
              </div>

              ${state.viewMode === 'chart' ? `
                <div class="machines-chart-viewport">
                  ${renderAnalyticalChart(state)}
                </div>
              ` : `
                <div class="machines-svg-viewport" id="machinesSvgViewport" style="transform: scale(${state.zoomLevel}); transform-origin: top center; transition: transform 0.2s ease;">
                  ${machineSvg}
                </div>
              `}

              <div class="machines-canvas-hint-bar">
                <span>[INSPECT] Click any tuple row or DROP ✕ node to inspect relational lineage, engine plans &amp; index advice</span>
                <span>Zoom: ${Math.round(state.zoomLevel * 100)}%</span>
              </div>

              <!-- Micro Tooltip -->
              <div class="machines-micro-tooltip" id="machinesMicroTooltip">
                <div class="machines-tooltip-title"></div>
                <div class="machines-tooltip-grain"></div>
                <div class="machines-tooltip-audit"></div>
                <div class="machines-tooltip-edge"></div>
                <div class="machines-tooltip-hint">Click row to inspect full relational dossier &rarr;</div>
              </div>

              <!-- Slide-over Multi-Tab Dossier Drawer -->
              <aside class="machines-inspector-drawer" id="machinesInspectorDrawer" aria-label="Metric Inspector Drawer"></aside>
            </main>
          </div>

        </div>

      </div>
    `;

    document.removeEventListener('keydown', handleGlobalKeydown);
    document.addEventListener('keydown', handleGlobalKeydown);
  }

  function handleEditorInput(newSql) {
    state.editorSql = newSql;
    clearTimeout(compileDebounceTimer);
    compileDebounceTimer = setTimeout(() => {
      // Re-compile SVG and update viewport without losing editor cursor focus
      if (window.AdaptivePipelineCompiler) {
        const compiled = window.AdaptivePipelineCompiler.compileAndRender(newSql);
        const viewport = document.getElementById('machinesSvgViewport');
        const badge = document.querySelector('.machines-ast-badge');
        if (compiled) {
          if (viewport) viewport.innerHTML = compiled.svg;
          if (badge) {
            badge.className = 'machines-ast-badge';
            badge.textContent = `● ${compiled.chamberCount} CHAMBERS LIVE`;
          }
          state.chamberCount = compiled.chamberCount;
          state.astStatus = 'valid';
        } else {
          if (badge) {
            badge.className = 'machines-ast-badge error';
            badge.textContent = '● SYNTAX NOTICE';
          }
        }
      }
    }, 220);
  }

  function switchCatalogMode(mode) {
    state.catalogMode = mode;
    if (mode === 'blueprints') {
      selectBlueprint(state.selectedBlueprint || 'bp_metrics');
    } else if (mode === 'leetcode') {
      selectLeetCodeProblem(state.selectedProblemId || '584');
    } else {
      renderView();
    }
  }

  function selectBlueprint(bpId) {
    state.selectedBlueprint = bpId;
    const bp = BLUEPRINT_PRESETS.find(b => b.id === bpId);
    if (bp) {
      state.editorSql = bp.sql;
    }
    renderView();
  }

  function selectLeetCodeProblem(probId) {
    state.selectedProblemId = probId;
    const p = FEATURED_LEETCODE.find(item => item.id === probId);
    if (p) {
      state.editorSql = p.sql;
    } else if (window.LEETCODE_300_VAULT && window.LEETCODE_300_VAULT[probId]) {
      const v = window.LEETCODE_300_VAULT[probId];
      state.editorSql = v.canonicalQuery || v.starterSql || 'SELECT * FROM table;';
    }
    renderView();
  }

  function setLayoutMode(mode) {
    state.layoutMode = mode;
    renderView();
  }

  function insertSqlSnippet(snippetType) {
    let snippet = '';
    if (snippetType === 'where') snippet = ' \nWHERE status = \'ACTIVE\' AND amount >= 100';
    else if (snippetType === 'join') snippet = ' \nJOIN Customers c ON o.customer_id = c.id';
    else if (snippetType === 'group') snippet = ' \nGROUP BY department_id\nHAVING count(*) >= 2';
    else if (snippetType === 'window') snippet = ',\n       DENSE_RANK() OVER (PARTITION BY category ORDER BY sales DESC) as rk';
    
    state.editorSql += snippet;
    renderView();
  }

  function formatSql() {
    // Basic SQL formatter
    let sql = state.editorSql;
    sql = sql.replace(/\bSELECT\b/gi, 'SELECT\n   ')
             .replace(/\bFROM\b/gi, '\nFROM\n   ')
             .replace(/\bWHERE\b/gi, '\nWHERE\n   ')
             .replace(/\bGROUP\s+BY\b/gi, '\nGROUP BY\n   ')
             .replace(/\bHAVING\b/gi, '\nHAVING\n   ')
             .replace(/\bORDER\s+BY\b/gi, '\nORDER BY\n   ')
             .replace(/\bJOIN\b/gi, '\nJOIN\n   ')
             .replace(/\bLEFT\s+JOIN\b/gi, '\nLEFT JOIN\n   ');
    state.editorSql = sql.trim();
    renderView();
  }

  function copyEditorSql() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(state.editorSql).then(() => {
        if (window.SQL_BUDDY) window.SQL_BUDDY.say("SQL query copied to clipboard!", 2500, 'happy');
      });
    }
  }

  function exportRetinaPng() {
    const svgEl = document.querySelector('.relational-machine-svg');
    if (!svgEl) {
      alert('No SVG diagram found to export.');
      return;
    }

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgEl);
    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const viewBox = svgEl.viewBox ? svgEl.viewBox.baseVal : null;
    const baseW = (viewBox && viewBox.width) || svgEl.clientWidth || 880;
    const baseH = (viewBox && viewBox.height) || svgEl.clientHeight || 520;
    const scale = 2; // 2x Retina

    const canvas = document.createElement('canvas');
    canvas.width = baseW * scale;
    canvas.height = baseH * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    const img = new Image();
    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function() {
      ctx.drawImage(img, 0, 0, baseW, baseH);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      const titleTag = state.catalogMode === 'leetcode' ? `leetcode_${state.selectedProblemId}` : state.selectedBlueprint;
      downloadLink.download = `relational_machine_${titleTag}_retina.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      if (window.SQL_BUDDY) window.SQL_BUDDY.say("Exported pristine 2x Retina PNG diagram!", 3500, 'celebrate');
    };
    img.src = url;
  }

  function handleGlobalKeydown(e) {
    if (e.key === 'Escape' && state.isDrawerOpen) {
      closeDrawer();
    }
  }

  function downloadSvg() {
    const svgEl = document.querySelector('.relational-machine-svg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgEl);
    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const titleTag = state.catalogMode === 'leetcode' ? `leetcode_${state.selectedProblemId}` : state.selectedBlueprint;
    a.download = `relational_machine_${titleTag}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (window.SQL_BUDDY) window.SQL_BUDDY.say("Exported SVG architectural machine!", 3500, 'celebrate');
  }

  function copySvgCode() {
    const svgEl = document.querySelector('.relational-machine-svg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(source).then(() => {
        if (window.SQL_BUDDY) window.SQL_BUDDY.say("SVG code copied to clipboard!", 3000, 'happy');
      });
    }
  }

  function init() {
    const currentTheme = (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'monochrome';
    state.canvasTheme = (currentTheme === 'kobbe-nordic' || currentTheme === 'paper-white' || currentTheme === 'warm-cream') ? 'light' : 'dark';
    renderView();
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('sql-theme-changed', (e) => {
      const t = e.detail && e.detail.theme;
      state.canvasTheme = (t === 'kobbe-nordic' || t === 'paper-white' || t === 'warm-cream') ? 'light' : 'dark';
      const container = document.getElementById('viewRelationalMachines');
      if (container && container.classList.contains('active')) {
        renderView();
      }
    });
  }

  // Legacy compatibility methods
  function switchDraft(draftKey) {
    if (draftKey === 'machine01') selectBlueprint('bp_metrics');
    else if (draftKey === 'machine02') selectBlueprint('bp_rolling');
    else if (draftKey === 'machine03') selectBlueprint('bp_retention');
    else switchCatalogMode('custom');
  }

  function loadPreset(key) {
    if (key === 'lc175') selectLeetCodeProblem('175');
    else if (key === 'lc185') selectLeetCodeProblem('185');
    else selectLeetCodeProblem('584');
  }

  function synthesizeCustomQuery() {
    handleEditorInput(state.editorSql);
  }

  return {
    init,
    renderView,
    setViewMode,
    setZoom,
    switchCatalogMode,
    selectBlueprint,
    selectLeetCodeProblem,
    setLayoutMode,
    handleEditorInput,
    insertSqlSnippet,
    formatSql,
    copyEditorSql,
    handleRowHover,
    handleRowLeave,
    openDrawer,
    closeDrawer,
    switchDrawerTab,
    switchDialect,
    copyDrawerSql,
    downloadSvg,
    copySvgCode,
    exportRetinaPng,
    switchDraft,
    loadPreset,
    synthesizeCustomQuery
  };
})();
