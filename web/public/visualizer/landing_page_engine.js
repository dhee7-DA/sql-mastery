/**
 * SQL FOUNDRY - KOMA.RUN INSPIRED LANDING PAGE ENGINE
 * Clean UI, Matte Charcoal #1e1e1e, JetBrains Mono, Desktop IDE Mockup,
 * Pill Segmented Control, and Minimalist Industry Tracks Grid.
 */

(function(window) {
  'use strict';

  // --- KOMA SHOWCASE SCENARIOS ---
  const KOMA_SCENARIOS = {
    amazon: {
      id: 'amazon',
      tabLabel: 'Amazon BI',
      company: 'Amazon SCOT',
      brandLetter: 'A',
      filename: 'amazon_prime_churn.sql',
      prompt: 'identify Day-1 Prime buyers with zero orders in the next 30 days and export dbt model',
      reasoning: 'Generating sargable LEFT JOIN ... WHERE right.order_id IS NULL to avoid expensive NOT IN subquery scans on 2.4M records.',
      lines: [
        { num: 1, text: `<span class="koma-cm">-- Amazon SCOT: Detect Prime buyers churned within 30 days</span>` },
        { num: 2, text: `<span class="koma-kw">SELECT DISTINCT</span> o1.customer_id, o1.purchase_date, o1.product_id` },
        { num: 3, text: `<span class="koma-kw">FROM</span> amazon_prime_orders o1` },
        { num: 4, text: `<span class="koma-kw">LEFT JOIN</span> amazon_prime_orders o2` },
        { num: 5, text: `  <span class="koma-kw">ON</span> o1.customer_id = o2.customer_id` },
        { num: 6, text: `  <span class="koma-kw">AND</span> o2.purchase_date &gt; o1.purchase_date` },
        { num: 7, text: `  <span class="koma-kw">AND</span> o2.purchase_date &lt;= <span class="koma-fn">DATE</span>(o1.purchase_date, <span class="koma-str">'+30 days'</span>)` },
        { num: 8, text: `<span class="koma-kw">WHERE</span> o2.order_id <span class="koma-kw">IS NULL</span>;` }
      ],
      tableHeaders: ['customer_id', 'purchase_date', 'product_id'],
      tableRows: [
        ['CUST_88201', '2026-09-01', 'PROD_KINDLE_PAPERWHITE'],
        ['CUST_88245', '2026-09-01', 'PROD_ECHO_DOT_5TH_GEN'],
        ['CUST_89104', '2026-09-02', 'PROD_FIRE_TV_STICK_4K'],
        ['CUST_89311', '2026-09-03', 'PROD_RING_VIDEO_DOORBELL']
      ],
      latency: '0.014ms',
      tuples: '4 tuples returned',
      status: 'AST PASSED ✓',
      viewId: 'viewAmazonStory',
      viewTitle: 'Analytics',
      viewHash: '#analytics'
    },

    netflix: {
      id: 'netflix',
      tabLabel: 'Netflix QoE',
      company: 'Netflix Playback',
      brandLetter: 'N',
      filename: 'netflix_playback_qoe.sql',
      prompt: 'compute P99 Time-To-First-Frame (TTFF) latency and rebuffering ratio across ISP backbones',
      reasoning: 'Using PERCENTILE_CONT(0.99) window aggregate partitioned by isp_asn to isolate CDN routing degradation.',
      lines: [
        { num: 1, text: `<span class="koma-cm">-- Netflix Playback: Calculate P99 TTFF across ISP backbones</span>` },
        { num: 2, text: `<span class="koma-kw">SELECT</span> isp_asn,` },
        { num: 3, text: `  <span class="koma-fn">ROUND</span>(<span class="koma-fn">AVG</span>(ttff_ms), <span class="koma-num">1</span>) <span class="koma-kw">AS</span> avg_ttff_ms,` },
        { num: 4, text: `  <span class="koma-fn">ROUND</span>(<span class="koma-fn">PERCENTILE_CONT</span>(<span class="koma-num">0.99</span>) <span class="koma-kw">WITHIN GROUP</span> (` },
        { num: 5, text: `    <span class="koma-kw">ORDER BY</span> ttff_ms` },
        { num: 6, text: `  ), <span class="koma-num">1</span>) <span class="koma-kw">AS</span> p99_ttff_ms,` },
        { num: 7, text: `  <span class="koma-fn">SUM</span>(rebuffer_seconds) / <span class="koma-fn">SUM</span>(play_duration_sec) <span class="koma-kw">AS</span> rebuffer_ratio` },
        { num: 8, text: `<span class="koma-kw">FROM</span> playback_telemetry_events` },
        { num: 9, text: `<span class="koma-kw">GROUP BY</span> <span class="koma-num">1</span> <span class="koma-kw">HAVING COUNT</span>(*) &gt; <span class="koma-num">10000</span>;` }
      ],
      tableHeaders: ['isp_asn', 'avg_ttff_ms', 'p99_ttff_ms', 'rebuffer_ratio'],
      tableRows: [
        ['AS7922-COMCAST', '242.4ms', '814.0ms', '0.0018'],
        ['AS7018-ATT', '261.2ms', '940.5ms', '0.0022'],
        ['AS15169-GOOGLE', '198.8ms', '620.0ms', '0.0009'],
        ['AS3356-LUMEN', '285.0ms', '1040.2ms', '0.0031']
      ],
      latency: '0.016ms',
      tuples: '4 ISP ASNs evaluated',
      status: 'AST PASSED ✓',
      viewId: 'viewNetflixStory',
      viewTitle: 'Netflix',
      viewHash: '#netflix'
    },

    uber: {
      id: 'uber',
      tabLabel: 'Uber H3',
      company: 'Uber Mobility',
      brandLetter: 'U',
      filename: 'uber_h3_surge.sql',
      prompt: 'aggregate real-time passenger ride requests into resolution-8 H3 hexagons and compute surge ratios',
      reasoning: 'Joining spatial rider demand with available driver telemetry pings filtered to the last 5-minute tumbling window.',
      lines: [
        { num: 1, text: `<span class="koma-cm">-- Uber Marketplace: Compute Real-Time Surge Multipliers per H3 Hexagon</span>` },
        { num: 2, text: `<span class="koma-kw">WITH</span> hex_demand <span class="koma-kw">AS</span> (` },
        { num: 3, text: `  <span class="koma-kw">SELECT</span> h3_index, <span class="koma-fn">COUNT</span>(*) <span class="koma-kw">AS</span> active_requests` },
        { num: 4, text: `  <span class="koma-kw">FROM</span> uber_ride_requests <span class="koma-kw">WHERE</span> requested_at &gt;= <span class="koma-fn">DATETIME</span>(<span class="koma-str">'now'</span>, <span class="koma-str">'-5 mins'</span>)` },
        { num: 5, text: `  <span class="koma-kw">GROUP BY</span> h3_index` },
        { num: 6, text: `)` },
        { num: 7, text: `<span class="koma-kw">SELECT</span> d.h3_index, d.active_requests, <span class="koma-fn">COALESCE</span>(s.drivers, <span class="koma-num">0</span>) <span class="koma-kw">AS</span> drivers,` },
        { num: 8, text: `  <span class="koma-fn">ROUND</span>(<span class="koma-fn">CAST</span>(d.active_requests <span class="koma-kw">AS FLOAT</span>) / <span class="koma-fn">MAX</span>(<span class="koma-fn">COALESCE</span>(s.drivers, <span class="koma-num">1</span>), <span class="koma-num">1</span>), <span class="koma-num">2</span>) <span class="koma-kw">AS</span> surge` },
        { num: 9, text: `<span class="koma-kw">FROM</span> hex_demand d <span class="koma-kw">LEFT JOIN</span> uber_driver_telemetry s <span class="koma-kw">ON</span> d.h3_index = s.h3_index` },
        { num: 10, text: `<span class="koma-kw">ORDER BY</span> surge <span class="koma-kw">DESC</span>;` }
      ],
      tableHeaders: ['h3_index', 'active_requests', 'drivers', 'surge'],
      tableRows: [
        ['882681a339fffff', '142', '18', '7.89x'],
        ['882681a33bfffff', '98', '21', '4.67x'],
        ['882681a331fffff', '64', '32', '2.00x'],
        ['882681a337fffff', '45', '40', '1.13x']
      ],
      latency: '0.015ms',
      tuples: '4 H3 hexes computed',
      status: 'AST PASSED ✓',
      viewId: 'viewUberStory',
      viewTitle: 'Uber',
      viewHash: '#uber'
    },

    airbnb: {
      id: 'airbnb',
      tabLabel: 'Airbnb Pricing',
      company: 'Airbnb Travel',
      brandLetter: 'A',
      filename: 'airbnb_dynamic_pricing.sql',
      prompt: 'identify unbooked calendar island gaps between bookings and adjust nightly price elasticity',
      reasoning: 'Applying LEAD() and LAG() window functions over reservation calendar check-in dates to find 1-to-3 day orphaned gaps.',
      lines: [
        { num: 1, text: `<span class="koma-cm">-- Airbnb Marketplace: Detect orphaned calendar gaps between bookings</span>` },
        { num: 2, text: `<span class="koma-kw">SELECT</span> listing_id, check_out_date <span class="koma-kw">AS</span> gap_start,` },
        { num: 3, text: `  <span class="koma-fn">LEAD</span>(check_in_date) <span class="koma-kw">OVER</span> (` },
        { num: 4, text: `    <span class="koma-kw">PARTITION BY</span> listing_id <span class="koma-kw">ORDER BY</span> check_in_date` },
        { num: 5, text: `  ) <span class="koma-kw">AS</span> next_checkin,` },
        { num: 6, text: `  <span class="koma-fn">JULIANDAY</span>(<span class="koma-fn">LEAD</span>(check_in_date) <span class="koma-kw">OVER</span> (<span class="koma-kw">PARTITION BY</span> listing_id <span class="koma-kw">ORDER BY</span> check_in_date))` },
        { num: 7, text: `    - <span class="koma-fn">JULIANDAY</span>(check_out_date) <span class="koma-kw">AS</span> gap_days` },
        { num: 8, text: `<span class="koma-kw">FROM</span> airbnb_reservations` },
        { num: 9, text: `<span class="koma-kw">WHERE</span> status = <span class="koma-str">'CONFIRMED'</span>;` }
      ],
      tableHeaders: ['listing_id', 'gap_start', 'next_checkin', 'gap_days'],
      tableRows: [
        ['LIST_10492', '2026-10-14', '2026-10-16', '2.0'],
        ['LIST_10492', '2026-10-22', '2026-10-24', '2.0'],
        ['LIST_22891', '2026-10-05', '2026-10-07', '2.0'],
        ['LIST_33014', '2026-11-01', '2026-11-04', '3.0']
      ],
      latency: '0.013ms',
      tuples: '4 calendar gaps detected',
      status: 'AST PASSED ✓',
      viewId: 'viewAirbnbStory',
      viewTitle: 'Airbnb',
      viewHash: '#airbnb'
    },

    spotify: {
      id: 'spotify',
      tabLabel: 'Spotify Royalties',
      company: 'Spotify Audio',
      brandLetter: 'S',
      filename: 'spotify_royalty_waterfall.sql',
      prompt: 'filter 30-second qualified streaming plays and calculate pro-rata artist royalty distribution',
      reasoning: 'Filtering playback_duration_sec >= 30, computing track stream share, and multiplying by total territory subscriber revenue pool.',
      lines: [
        { num: 1, text: `<span class="koma-cm">-- Spotify Royalty: Pro-rata artist distribution on 30s+ streams</span>` },
        { num: 2, text: `<span class="koma-kw">WITH</span> qualified_streams <span class="koma-kw">AS</span> (` },
        { num: 3, text: `  <span class="koma-kw">SELECT</span> track_id, artist_id, territory,` },
        { num: 4, text: `    <span class="koma-fn">COUNT</span>(*) <span class="koma-kw">AS</span> stream_count` },
        { num: 5, text: `  <span class="koma-kw">FROM</span> stream_events <span class="koma-kw">WHERE</span> duration_seconds &gt;= <span class="koma-num">30</span>` },
        { num: 6, text: `  <span class="koma-kw">GROUP BY</span> <span class="koma-num">1</span>, <span class="koma-num">2</span>, <span class="koma-num">3</span>` },
        { num: 7, text: `)` },
        { num: 8, text: `<span class="koma-kw">SELECT</span> artist_id, <span class="koma-fn">SUM</span>(stream_count) <span class="koma-kw">AS</span> total_plays,` },
        { num: 9, text: `  <span class="koma-fn">ROUND</span>(<span class="koma-fn">SUM</span>(stream_count) * <span class="koma-num">0.0038</span>, <span class="koma-num">2</span>) <span class="koma-kw">AS</span> estimated_royalty_usd` },
        { num: 10, text: `<span class="koma-kw">FROM</span> qualified_streams <span class="koma-kw">GROUP BY</span> <span class="koma-num">1</span> <span class="koma-kw">ORDER BY</span> total_plays <span class="koma-kw">DESC</span>;` }
      ],
      tableHeaders: ['artist_id', 'total_plays', 'estimated_royalty_usd'],
      tableRows: [
        ['ART_BILLIE_EILISH', '1,420,000', '$5,396.00'],
        ['ART_THE_WEEKND', '1,310,500', '$4,979.90'],
        ['ART_TAYLOR_SWIFT', '1,280,000', '$4,864.00'],
        ['ART_KENDRICK_LAMAR', '985,000', '$3,743.00']
      ],
      latency: '0.017ms',
      tuples: '4 artists calculated',
      status: 'AST PASSED ✓',
      viewId: 'viewSpotifyStory',
      viewTitle: 'Spotify',
      viewHash: '#spotify'
    },

    jpmorgan: {
      id: 'jpmorgan',
      tabLabel: 'JPMorgan Ledgers',
      company: 'JPMorgan Chase',
      brandLetter: 'J',
      filename: 'jpmorgan_core_ledger.sql',
      prompt: 'audit multi-entity double-entry balance invariants and verify Debits equal Credits across Nostro accounts',
      reasoning: 'Evaluating conditional aggregation with HAVING SUM(amount * sign) != 0 to enforce zero-variance Federal Reserve Reg D audits.',
      lines: [
        { num: 1, text: `<span class="koma-cm">-- JPMorgan Chase: Audit double-entry balance invariant across entities</span>` },
        { num: 2, text: `<span class="koma-kw">SELECT</span> legal_entity, account_code,` },
        { num: 3, text: `  <span class="koma-fn">SUM</span>(<span class="koma-kw">CASE WHEN</span> entry_type = <span class="koma-str">'DEBIT'</span> <span class="koma-kw">THEN</span> amount_usd <span class="koma-kw">ELSE</span> <span class="koma-num">0</span> <span class="koma-kw">END</span>) <span class="koma-kw">AS</span> debits,` },
        { num: 4, text: `  <span class="koma-fn">SUM</span>(<span class="koma-kw">CASE WHEN</span> entry_type = <span class="koma-str">'CREDIT'</span> <span class="koma-kw">THEN</span> amount_usd <span class="koma-kw">ELSE</span> <span class="koma-num">0</span> <span class="koma-kw">END</span>) <span class="koma-kw">AS</span> credits,` },
        { num: 5, text: `  <span class="koma-fn">ROUND</span>(<span class="koma-fn">SUM</span>(<span class="koma-kw">CASE WHEN</span> entry_type = <span class="koma-str">'DEBIT'</span> <span class="koma-kw">THEN</span> amount_usd <span class="koma-kw">ELSE</span> -amount_usd <span class="koma-kw">END</span>), <span class="koma-num">2</span>) <span class="koma-kw">AS</span> variance` },
        { num: 6, text: `<span class="koma-kw">FROM</span> general_ledger_entries` },
        { num: 7, text: `<span class="koma-kw">GROUP BY</span> <span class="koma-num">1</span>, <span class="koma-num">2</span> <span class="koma-kw">HAVING</span> debits != credits;` }
      ],
      tableHeaders: ['legal_entity', 'account_code', 'debits', 'credits', 'variance'],
      tableRows: [
        ['JPMC_US_RETAIL', '1010-CASH', '$2,140,000.00', '$2,140,000.00', '$0.00 (BALANCED)'],
        ['JPMC_UK_IB', '2040-NOSTRO', '$1,420,200.00', '$1,420,200.00', '$0.00 (BALANCED)'],
        ['JPMC_EU_SE', '3010-INTERBANK', '$1,290,000.00', '$1,290,000.00', '$0.00 (BALANCED)']
      ],
      latency: '0.011ms',
      tuples: '3 entities verified',
      status: 'AST PASSED ✓',
      viewId: 'viewJPMorganStory',
      viewTitle: 'Finance',
      viewHash: '#jpmorgan'
    },

    stripe: {
      id: 'stripe',
      tabLabel: 'Stripe FinTech',
      company: 'Stripe Payments',
      brandLetter: 'S',
      filename: 'stripe_radar_fraud.sql',
      prompt: 'detect card-testing micro-authorization clusters and reconcile merchant currency holds',
      reasoning: 'Filtering auth attempts with identical card fingerprint and < $1.00 amounts within a 60-second rolling sliding frame.',
      lines: [
        { num: 1, text: `<span class="koma-cm">-- Stripe Radar: Flag card-testing velocity attacks within 60s window</span>` },
        { num: 2, text: `<span class="koma-kw">SELECT</span> card_fingerprint, ip_address,` },
        { num: 3, text: `  <span class="koma-fn">COUNT</span>(*) <span class="koma-kw">AS</span> attempts_count,` },
        { num: 4, text: `  <span class="koma-fn">MIN</span>(auth_timestamp) <span class="koma-kw">AS</span> first_attempt,` },
        { num: 5, text: `  <span class="koma-fn">MAX</span>(auth_timestamp) <span class="koma-kw">AS</span> last_attempt` },
        { num: 6, text: `<span class="koma-kw">FROM</span> card_authorization_events` },
        { num: 7, text: `<span class="koma-kw">WHERE</span> amount_usd &lt; <span class="koma-num">1.00</span>` },
        { num: 8, text: `<span class="koma-kw">GROUP BY</span> <span class="koma-num">1</span>, <span class="koma-num">2</span> <span class="koma-kw">HAVING COUNT</span>(*) &gt;= <span class="koma-num">5</span>;` }
      ],
      tableHeaders: ['card_fingerprint', 'ip_address', 'attempts_count', 'first_attempt', 'last_attempt'],
      tableRows: [
        ['FP_981a3e88', '198.51.100.42', '14', '14:22:01', '14:22:48'],
        ['FP_981a3e91', '198.51.100.42', '8', '14:23:12', '14:23:55'],
        ['FP_742b01cc', '203.0.113.19', '6', '14:25:02', '14:25:40']
      ],
      latency: '0.012ms',
      tuples: '3 fraud clusters detected',
      status: 'AST PASSED ✓',
      viewId: 'viewStripeStory',
      viewTitle: 'Stripe',
      viewHash: '#stripe'
    }
  };

  // --- DEFENSIVE TRAPS ---
  const TRAPS = {
    null_trap: {
      id: 'null_trap',
      title: 'Three-Valued Logic NULL Trap',
      codeWrong: `-- ✕ VULNERABLE: Discards 100% of rows if subquery returns any NULL
SELECT user_id, email, signup_date
FROM users
WHERE user_id NOT IN (
  SELECT user_id FROM churned_users
);`,
      codeFix: `-- ✓ DEFENSIVE FIX: Null-safe ANTI-JOIN or NOT EXISTS
SELECT u.user_id, u.email, u.signup_date
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM churned_users c
  WHERE c.user_id = u.user_id
);`,
      impact: 'In SQL 3VL, (x NOT IN (NULL, 1)) evaluates to UNKNOWN. The WHERE filter silently drops all rows.'
    },

    float_drift: {
      id: 'float_drift',
      title: 'Floating-Point Currency Drift',
      codeWrong: `-- ✕ VULNERABLE: Float accumulation causes IEEE-754 precision drift
SELECT account_id, 
  SUM(CAST(amount AS FLOAT)) AS total_balance
FROM ledger_entries
GROUP BY account_id
HAVING SUM(CAST(amount AS FLOAT)) != 0.00;`,
      codeFix: `-- ✓ DEFENSIVE FIX: Exact DECIMAL(18,4) or integer cents
SELECT account_id, 
  ROUND(SUM(CAST(amount_cents AS BIGINT)), 2) AS net_cents,
  ROUND(SUM(CAST(amount AS DECIMAL(18,4))), 4) AS exact_balance
FROM ledger_entries
GROUP BY account_id
HAVING SUM(amount_cents) != 0;`,
      impact: 'IEEE-754 binary floating point drifts across millions of trades, causing balance reconciliation failures.'
    },

    window_frame: {
      id: 'window_frame',
      title: 'Window Frame Default Range Skew',
      codeWrong: `-- ✕ VULNERABLE: Default RANGE bundles identical timestamps together!
SELECT order_date, order_amount,
  SUM(order_amount) OVER (ORDER BY order_date) AS running_total
FROM daily_sales;`,
      codeFix: `-- ✓ DEFENSIVE FIX: Explicit ROWS frame avoids tie bundling
SELECT order_date, order_amount,
  SUM(order_amount) OVER (
    ORDER BY order_date, order_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS true_running_total
FROM daily_sales;`,
      impact: 'Default RANGE frame groups peer rows with identical dates, silently corrupting running revenue totals.'
    },

    non_sargable: {
      id: 'non_sargable',
      title: 'Non-SARGable Function Predicates',
      codeWrong: `-- ✕ VULNERABLE: Function on column forces O(N) sequential table scan!
SELECT customer_id, order_id, order_total
FROM orders
WHERE strftime('%Y', order_date) = '2026';`,
      codeFix: `-- ✓ DEFENSIVE FIX: Sargable range predicates utilize B-Tree indexes
SELECT customer_id, order_id, order_total
FROM orders
WHERE order_date >= '2026-01-01' 
  AND order_date < '2027-01-01';`,
      impact: 'Wrapping indexed columns inside functions blinds the planner, turning 0.5ms index seeks into full table scans.'
    },

    cartesian_fanout: {
      id: 'cartesian_fanout',
      title: 'Multi-Table 1:N Cartesian Fan-Out',
      codeWrong: `-- ✕ VULNERABLE: Multiple 1:N joins multiply aggregate sums!
SELECT o.order_id,
  SUM(i.item_price) AS total_items_price,
  SUM(p.payment_amount) AS total_paid
FROM orders o
JOIN order_items i ON o.order_id = i.order_id
JOIN payments p ON o.order_id = p.order_id
GROUP BY o.order_id;`,
      codeFix: `-- ✓ DEFENSIVE FIX: Pre-aggregate in CTEs before joining
WITH item_sums AS (
  SELECT order_id, SUM(item_price) AS total_items_price
  FROM order_items GROUP BY order_id
),
payment_sums AS (
  SELECT order_id, SUM(payment_amount) AS total_paid
  FROM payments GROUP BY order_id
)
SELECT o.order_id, i.total_items_price, p.total_paid
FROM orders o
LEFT JOIN item_sums i ON o.order_id = i.order_id
LEFT JOIN payment_sums p ON o.order_id = p.order_id;`,
      impact: 'Joining two 1:N tables creates an M x N Cartesian product, duplicating item sums and payment totals.'
    }
  };

  let activeScenarioId = 'amazon';
  let activeTrapId = 'null_trap';

  const LandingPageEngine = {
    init: function() {
      const container = document.getElementById('viewLandingPage');
      if (!container) return;
      container.innerHTML = this.renderHTML();
      this.bindEvents(container);
    },

    setScenario: function(id) {
      if (KOMA_SCENARIOS[id]) {
        activeScenarioId = id;
        this.updateView();
      }
    },

    setTrap: function(id) {
      if (TRAPS[id]) {
        activeTrapId = id;
        this.updateView();
      }
    },

    updateView: function() {
      const container = document.getElementById('viewLandingPage');
      if (container) {
        container.innerHTML = this.renderHTML();
        this.bindEvents(container);
      }
    },

    openSectionStudio: function() {
      if (window.selectNavView) {
        window.selectNavView('viewStudio', 'Section Studio', null);
      }
      try { window.location.hash = '#section-studio'; } catch(e) {}
    },

    openLeetCode: function() {
      if (window.selectNavView) {
        window.selectNavView('viewLeetCode50', 'LeetCode 323', null);
      }
      try { window.location.hash = '#leetcode'; } catch(e) {}
    },

    launchTrack: function(viewId, title, hash) {
      if (window.selectNavView) {
        window.selectNavView(viewId, title, null);
      }
      try { window.location.hash = hash; } catch(e) {}
    },

    renderHTML: function() {
      const cur = KOMA_SCENARIOS[activeScenarioId] || KOMA_SCENARIOS.amazon;
      const curTrap = TRAPS[activeTrapId] || TRAPS.null_trap;

      return `
        <div class="koma-container">

          <!-- 1. HERO SECTION (KOMA.RUN STYLE) -->
          <section class="koma-hero">
            
            <div class="koma-badge-row">
              <a href="#studio" class="koma-badge-pill" onclick="window.LANDING_PAGE_ENGINE.openSectionStudio(); return false;">
                <span>supported by DuckDB &amp; SQLite WASM</span>
                <span>&nearr;</span>
              </a>
              <span class="koma-badge-pill-rust">
                <span>&bull; client-side AST engine</span>
              </span>
            </div>

            <h1 class="koma-hero-title">
              SQL Foundry<br>
              for Data &amp; Finance
            </h1>

            <p class="koma-hero-subtitle">
              Master 30-day industry rotations across Amazon, Netflix, Uber, Airbnb, Spotify, and JPMorgan. Solve 323 LeetCode database problems directly in your browser with zero server latency.
            </p>

            <div class="koma-cta-row">
              <button class="btn-koma-primary" onclick="window.LANDING_PAGE_ENGINE.openSectionStudio()">
                launch Section Studio &rarr;
              </button>
              <button class="btn-koma-secondary" onclick="window.LANDING_PAGE_ENGINE.openLeetCode()">
                explore 323 leetcode problems
              </button>
            </div>

            <div class="koma-platform-subtext">
              MySQL 8.0 &bull; PostgreSQL 16 &bull; Snowflake &bull; DuckDB &bull; SQLite 3.45 WASM
            </div>

          </section>

          <!-- 2. KOMA SHOWCASE (PILL SEGMENTED CONTROL + IDE MOCKUP) -->
          <section class="koma-showcase-wrapper">
            
            <!-- Floating Pill Segmented Bar -->
            <div class="koma-pill-nav-container">
              <div class="koma-pill-nav">
                ${Object.keys(KOMA_SCENARIOS).map(k => {
                  const s = KOMA_SCENARIOS[k];
                  const isActive = s.id === activeScenarioId;
                  return `
                    <button class="koma-pill-tab ${isActive ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setScenario('${s.id}')">
                      <span>${s.tabLabel}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Desktop IDE Window Mockup (Koma Window Style) -->
            <div class="koma-window-mockup">
              
              <!-- macOS Window Header -->
              <div class="koma-window-header">
                <div class="koma-window-dots">
                  <span class="koma-dot koma-dot-red"></span>
                  <span class="koma-dot koma-dot-yellow"></span>
                  <span class="koma-dot koma-dot-green"></span>
                </div>

                <div class="koma-session-bar">
                  <span>&gt;_ session: <strong>${cur.id}_rotation</strong></span>
                  <span style="color:#444;">|</span>
                  <span class="koma-action-tag" onclick="window.LANDING_PAGE_ENGINE.openSectionStudio()">🪄 open studio</span>
                  <span class="koma-action-tag" onclick="window.LANDING_PAGE_ENGINE.launchTrack('${cur.viewId}', '${cur.viewTitle}', '${cur.viewHash}')">&nearr; launch 30d</span>
                  <span style="color:#444;">|</span>
                  <span style="color:#71717a;">sqlite_wasm_3.45.db</span>
                </div>

                <div class="koma-wordmark">
                  <span>sql foundry&trade;</span>
                </div>
              </div>

              <!-- Window Body: Sidebar + Main Area -->
              <div class="koma-window-body">
                
                <!-- Sidebar Explorer -->
                <div class="koma-sidebar">
                  <div class="koma-sidebar-label">EXPLORER</div>
                  
                  <div class="koma-tree-group">
                    <div class="koma-tree-header">&blacktriangledown; ROTATION DATASETS</div>
                    ${Object.keys(KOMA_SCENARIOS).map(k => {
                      const s = KOMA_SCENARIOS[k];
                      const isActive = s.id === activeScenarioId;
                      return `
                        <div class="koma-tree-item ${isActive ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setScenario('${s.id}')">
                          <span>&bull;</span>
                          <span>${s.filename}</span>
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <div class="koma-tree-group">
                    <div class="koma-tree-header">&blacktriangledown; RUNTIME SINK</div>
                    <div class="koma-tree-item active">
                      <span>&check;</span>
                      <span>in-memory wasm</span>
                    </div>
                  </div>
                </div>

                <!-- Main Area -->
                <div class="koma-main-area">
                  
                  <!-- Tabs Bar -->
                  <div class="koma-tabs-bar">
                    <div class="koma-tab active">
                      <span>&gt;_ query.sql</span>
                    </div>
                    <div class="koma-tab" onclick="window.LANDING_PAGE_ENGINE.openSectionStudio()">
                      <span>&lt;&gt; dbt_model.sql</span>
                    </div>
                  </div>

                  <!-- Prompt Strip (Koma Signature Style) -->
                  <div class="koma-prompt-strip">
                    <div class="koma-prompt-text">
                      ${cur.prompt}
                    </div>
                    <div class="koma-reasoning-toggle">
                      <span>&bull; reasoning &rsaquo;</span>
                      <span style="color:#a3a3a3;">${cur.reasoning}</span>
                    </div>
                  </div>

                  <!-- Split: Code Column vs Sink Column -->
                  <div class="koma-editor-sink-split">
                    
                    <!-- Monaco Code Column -->
                    <div class="koma-code-column">
                      ${cur.lines.map(line => `
                        <div class="koma-line">
                          <span class="koma-line-no">${line.num}</span>
                          <span class="koma-line-code">${line.text}</span>
                        </div>
                      `).join('')}
                    </div>

                    <!-- Live Tuple Sink Column -->
                    <div class="koma-sink-column">
                      <div class="koma-sink-header">
                        <span class="koma-sink-title">TUPLE SINK // WASM OUTPUT</span>
                        <span class="koma-badge-green">${cur.status}</span>
                      </div>

                      <div class="koma-table-wrapper">
                        <table class="koma-table">
                          <thead>
                            <tr>
                              ${cur.tableHeaders.map(th => `<th>${th}</th>`).join('')}
                            </tr>
                          </thead>
                          <tbody>
                            ${cur.tableRows.map(row => `
                              <tr>
                                ${row.map(cell => `<td>${cell}</td>`).join('')}
                              </tr>
                            `).join('')}
                          </tbody>
                        </table>
                      </div>

                      <div class="koma-sink-footer">
                        <span>latency: <strong>${cur.latency}</strong></span>
                        <span style="color:#4ec9b0;">${cur.tuples}</span>
                        <button class="btn-koma-primary" style="padding:4px 10px; font-size:11px;" onclick="window.LANDING_PAGE_ENGINE.launchTrack('${cur.viewId}', '${cur.viewTitle}', '${cur.viewHash}')">
                          open ${cur.company} &rarr;
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

          <!-- 3. GIANT STAT SECTION (KOMA TOKENS BURNED STYLE) -->
          <section class="koma-giant-stat-section">
            <div class="koma-giant-number">323 / 323</div>
            <div class="koma-giant-label">verified leetcode relational solutions executed client-side</div>
          </section>

          <!-- 4. INDUSTRY TRACKS GRID (KOMA HONORARY PARTNERS STYLE) -->
          <section class="koma-tracks-section">
            
            <div class="koma-vertical-header">
              <span>industry tracks</span>
            </div>

            <div class="koma-cards-grid">
              
              <!-- Card 1: Amazon -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewAmazonStory', 'Analytics', '#analytics')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">A</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Amazon SCOT</h4>
                  <p class="koma-card-desc">L4/L5 BI Engineer &bull; 30d Prime Day simulation</p>
                </div>
              </div>

              <!-- Card 2: Netflix -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewNetflixStory', 'Netflix', '#netflix')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">N</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Netflix Playback</h4>
                  <p class="koma-card-desc">P99 TTFF QoE &bull; 30d telemetry &amp; A/B testing</p>
                </div>
              </div>

              <!-- Card 3: Uber -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewUberStory', 'Uber', '#uber')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">U</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Uber Mobility</h4>
                  <p class="koma-card-desc">H3 Spatial Indexing &bull; 85K RPM surge war room</p>
                </div>
              </div>

              <!-- Card 4: Airbnb -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewAirbnbStory', 'Airbnb', '#airbnb')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">A</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Airbnb Travel</h4>
                  <p class="koma-card-desc">Marketplace Elasticity &bull; calendar island gaps</p>
                </div>
              </div>

              <!-- Card 5: Spotify -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewSpotifyStory', 'Spotify', '#spotify')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">S</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Spotify Audio</h4>
                  <p class="koma-card-desc">Pro-Rata Royalties &bull; 30s stream thresholds</p>
                </div>
              </div>

              <!-- Card 6: JPMorgan Chase -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewJPMorganStory', 'Finance', '#jpmorgan')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">J</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">JPMorgan Risk</h4>
                  <p class="koma-card-desc">Basel III CET1 Capital &bull; CCAR bank ledgers</p>
                </div>
              </div>

              <!-- Card 7: Stripe -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewStripeStory', 'Stripe', '#stripe')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">S</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Stripe FinTech</h4>
                  <p class="koma-card-desc">Radar ML Fraud &bull; multi-currency balance holds</p>
                </div>
              </div>

              <!-- Card 8: Enterprise Capstones -->
              <div class="koma-track-card" onclick="if(window.selectNavView) window.selectNavView('viewCapstones', 'Guided Capstones', 'navGroupPractice'); try{window.location.hash='#capstone';}catch(e){}">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">+</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">10 Capstones</h4>
                  <p class="koma-card-desc">SEC T+1, MRR Waterfall &bull; Hospital EHR systems</p>
                </div>
              </div>

            </div>

          </section>

          <!-- 5. DEFENSIVE SQL ENGINEERING (CLEAN CODE DIFF) -->
          <section class="koma-diff-section">
            
            <div class="koma-section-header">
              <span class="koma-section-tag">defensive sql</span>
              <h2 class="koma-section-title">The 5 Silent SQL Traps</h2>
              <p class="koma-section-sub">
                Subtle query flaws that pass tests and linter rules, but corrupt accounting journals and skew executive board metrics.
              </p>
            </div>

            <div class="koma-diff-card">
              
              <div class="koma-diff-pills">
                ${Object.keys(TRAPS).map(k => {
                  const t = TRAPS[k];
                  const isActive = t.id === activeTrapId;
                  return `
                    <button class="koma-diff-pill-btn ${isActive ? 'active' : ''}" onclick="window.LANDING_PAGE_ENGINE.setTrap('${t.id}')">
                      <span>${t.title}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <div class="koma-diff-grid">
                
                <div class="koma-diff-box koma-box-danger">
                  <div class="koma-box-tag" style="color:#f87171;">✕ VULNERABLE PRODUCTION QUERY</div>
                  <pre class="koma-diff-pre"><code>${curTrap.codeWrong}</code></pre>
                </div>

                <div class="koma-diff-box koma-box-success">
                  <div class="koma-box-tag" style="color:#4ec9b0;">✓ PRODUCTION HARDENED FIX</div>
                  <pre class="koma-diff-pre"><code>${curTrap.codeFix}</code></pre>
                </div>

              </div>

              <div class="koma-diff-impact">
                <strong>failure mechanism:</strong> ${curTrap.impact}
              </div>

            </div>

          </section>

          <!-- 6. MINIMALIST FOOTER -->
          <footer class="koma-footer">
            <div>
              <span>sql foundry&trade; &bull; the relational operating system for data &amp; finance</span>
            </div>
            <div style="display:flex; gap:16px;">
              <a href="#studio" onclick="window.LANDING_PAGE_ENGINE.openSectionStudio(); return false;">section studio</a>
              <a href="#leetcode" onclick="window.LANDING_PAGE_ENGINE.openLeetCode(); return false;">leetcode 323</a>
              <a href="#companies" onclick="if(window.selectNavView) window.selectNavView('viewCompanyHub', 'Companies', 'navGroupPractice'); return false;">domain hub</a>
              <a href="#machines" onclick="if(window.selectNavView) window.selectNavView('viewRelationalMachines', 'Machines', null); return false;">relational machines</a>
            </div>
          </footer>

        </div>
      `;
    },

    bindEvents: function(container) {
      // Event listeners if needed
    }
  };

  // Expose globally
  window.LANDING_PAGE_ENGINE = LandingPageEngine;

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      LandingPageEngine.init();
    });
  } else {
    LandingPageEngine.init();
  }

})(window);
