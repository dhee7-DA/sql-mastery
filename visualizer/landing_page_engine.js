/**
 * SQL FOUNDRY - KOMA.RUN INSPIRED LANDING PAGE ENGINE
 * Clean UI, Matte Charcoal #1e1e1e, JetBrains Mono, Desktop IDE Mockup,
 * Live-Editable SQLite WASM Runner, Instant Tuple Sink, and Minimalist Industry Tracks Grid.
 */

(function(window) {
  'use strict';

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

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
      rawSql: `-- Amazon SCOT: Detect Prime buyers churned within 30 days
SELECT DISTINCT o1.customer_id, o1.purchase_date, o1.product_id
FROM amazon_prime_orders o1
LEFT JOIN amazon_prime_orders o2
  ON o1.customer_id = o2.customer_id
  AND o2.purchase_date > o1.purchase_date
  AND o2.purchase_date <= DATE(o1.purchase_date, '+30 days')
WHERE o2.order_id IS NULL;`,
      seedSql: `
        CREATE TABLE amazon_prime_orders (
          order_id TEXT PRIMARY KEY,
          customer_id TEXT,
          purchase_date TEXT,
          product_id TEXT
        );
        INSERT INTO amazon_prime_orders VALUES
          ('ORD_101', 'CUST_88201', '2026-09-01', 'PROD_KINDLE_PAPERWHITE'),
          ('ORD_102', 'CUST_88245', '2026-09-01', 'PROD_ECHO_DOT_5TH_GEN'),
          ('ORD_103', 'CUST_89104', '2026-09-02', 'PROD_FIRE_TV_STICK_4K'),
          ('ORD_104', 'CUST_89311', '2026-09-03', 'PROD_RING_VIDEO_DOORBELL'),
          ('ORD_105', 'CUST_77100', '2026-09-01', 'PROD_AIRPODS_PRO'),
          ('ORD_106', 'CUST_77100', '2026-09-15', 'PROD_MACBOOK_CHARGER'),
          ('ORD_107', 'CUST_77200', '2026-09-02', 'PROD_LOGITECH_MOUSE'),
          ('ORD_108', 'CUST_77200', '2026-09-20', 'PROD_KEYBOARD_MECH');
      `,
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
      reasoning: 'Aggregating playback metrics grouped by isp_asn to isolate CDN routing degradation.',
      rawSql: `-- Netflix Playback: Calculate P99 TTFF across ISP backbones
SELECT isp_asn,
  ROUND(AVG(ttff_ms), 1) AS avg_ttff_ms,
  ROUND(MAX(ttff_ms), 1) AS p99_ttff_ms,
  ROUND(SUM(rebuffer_seconds) / SUM(play_duration_sec), 4) AS rebuffer_ratio
FROM playback_telemetry_events
GROUP BY isp_asn
HAVING COUNT(*) >= 2;`,
      seedSql: `
        CREATE TABLE playback_telemetry_events (
          event_id TEXT PRIMARY KEY,
          isp_asn TEXT,
          ttff_ms REAL,
          rebuffer_seconds REAL,
          play_duration_sec REAL
        );
        INSERT INTO playback_telemetry_events VALUES
          ('EVT_1', 'AS7922-COMCAST', 242.4, 1.8, 1000.0),
          ('EVT_2', 'AS7922-COMCAST', 814.0, 0.0, 1200.0),
          ('EVT_3', 'AS7018-ATT', 261.2, 2.2, 1000.0),
          ('EVT_4', 'AS7018-ATT', 940.5, 0.0, 800.0),
          ('EVT_5', 'AS15169-GOOGLE', 198.8, 0.9, 1000.0),
          ('EVT_6', 'AS15169-GOOGLE', 620.0, 0.0, 1500.0),
          ('EVT_7', 'AS3356-LUMEN', 285.0, 3.1, 1000.0),
          ('EVT_8', 'AS3356-LUMEN', 1040.2, 0.0, 900.0);
      `,
      tableHeaders: ['isp_asn', 'avg_ttff_ms', 'p99_ttff_ms', 'rebuffer_ratio'],
      tableRows: [
        ['AS7922-COMCAST', '528.2', '814.0', '0.0008'],
        ['AS7018-ATT', '300.9', '940.5', '0.0012'],
        ['AS15169-GOOGLE', '409.4', '620.0', '0.0004'],
        ['AS3356-LUMEN', '662.6', '1040.2', '0.0016']
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
      reasoning: 'Joining spatial rider demand with available driver telemetry pings filtered to the tumbling window.',
      rawSql: `-- Uber Marketplace: Compute Real-Time Surge Multipliers per H3 Hexagon
WITH hex_demand AS (
  SELECT h3_index, COUNT(*) AS active_requests
  FROM uber_ride_requests
  WHERE requested_at >= '2026-11-07 16:00:00'
  GROUP BY h3_index
)
SELECT d.h3_index, d.active_requests, COALESCE(s.drivers, 0) AS drivers,
  ROUND(CAST(d.active_requests AS FLOAT) / MAX(COALESCE(s.drivers, 1), 1), 2) AS surge
FROM hex_demand d
LEFT JOIN uber_driver_telemetry s ON d.h3_index = s.h3_index
ORDER BY surge DESC;`,
      seedSql: `
        CREATE TABLE uber_ride_requests (
          request_id TEXT PRIMARY KEY,
          h3_index TEXT,
          requested_at TEXT
        );
        CREATE TABLE uber_driver_telemetry (
          h3_index TEXT PRIMARY KEY,
          drivers INT
        );
        INSERT INTO uber_ride_requests VALUES
          ('REQ_1', '882681a339fffff', '2026-11-07 16:00:00'),
          ('REQ_2', '882681a339fffff', '2026-11-07 16:02:00'),
          ('REQ_3', '882681a339fffff', '2026-11-07 16:03:00'),
          ('REQ_4', '882681a33bfffff', '2026-11-07 16:01:00'),
          ('REQ_5', '882681a33bfffff', '2026-11-07 16:04:00'),
          ('REQ_6', '882681a331fffff', '2026-11-07 16:02:30'),
          ('REQ_7', '882681a337fffff', '2026-11-07 16:01:15');
        INSERT INTO uber_driver_telemetry VALUES
          ('882681a339fffff', 18),
          ('882681a33bfffff', 21),
          ('882681a331fffff', 32),
          ('882681a337fffff', 40);
      `,
      tableHeaders: ['h3_index', 'active_requests', 'drivers', 'surge'],
      tableRows: [
        ['882681a339fffff', '3', '18', '0.17'],
        ['882681a33bfffff', '2', '21', '0.1'],
        ['882681a331fffff', '1', '32', '0.03'],
        ['882681a337fffff', '1', '40', '0.03']
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
      reasoning: 'Applying LEAD() window functions over reservation calendar check-in dates to find orphaned gaps.',
      rawSql: `-- Airbnb Marketplace: Detect orphaned calendar gaps between bookings
SELECT listing_id, check_out_date AS gap_start,
  LEAD(check_in_date) OVER (
    PARTITION BY listing_id ORDER BY check_in_date
  ) AS next_checkin,
  ROUND(JULIANDAY(LEAD(check_in_date) OVER (PARTITION BY listing_id ORDER BY check_in_date))
    - JULIANDAY(check_out_date), 1) AS gap_days
FROM airbnb_reservations
WHERE status = 'CONFIRMED';`,
      seedSql: `
        CREATE TABLE airbnb_reservations (
          reservation_id TEXT PRIMARY KEY,
          listing_id TEXT,
          check_in_date TEXT,
          check_out_date TEXT,
          status TEXT
        );
        INSERT INTO airbnb_reservations VALUES
          ('RES_1', 'LIST_10492', '2026-10-10', '2026-10-14', 'CONFIRMED'),
          ('RES_2', 'LIST_10492', '2026-10-16', '2026-10-22', 'CONFIRMED'),
          ('RES_3', 'LIST_10492', '2026-10-24', '2026-10-30', 'CONFIRMED'),
          ('RES_4', 'LIST_22891', '2026-10-01', '2026-10-05', 'CONFIRMED'),
          ('RES_5', 'LIST_22891', '2026-10-07', '2026-10-12', 'CONFIRMED'),
          ('RES_6', 'LIST_33014', '2026-10-28', '2026-11-01', 'CONFIRMED'),
          ('RES_7', 'LIST_33014', '2026-11-04', '2026-11-10', 'CONFIRMED');
      `,
      tableHeaders: ['listing_id', 'gap_start', 'next_checkin', 'gap_days'],
      tableRows: [
        ['LIST_10492', '2026-10-14', '2026-10-16', '2.0'],
        ['LIST_10492', '2026-10-22', '2026-10-24', '2.0'],
        ['LIST_10492', '2026-10-30', null, null],
        ['LIST_22891', '2026-10-05', '2026-10-07', '2.0'],
        ['LIST_22891', '2026-10-12', null, null]
      ],
      latency: '0.013ms',
      tuples: '7 calendar rows evaluated',
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
      reasoning: 'Filtering playback_duration_sec >= 30, computing track stream share, and calculating royalty payouts.',
      rawSql: `-- Spotify Royalty: Pro-rata artist distribution on 30s+ streams
WITH qualified_streams AS (
  SELECT track_id, artist_id, territory,
    COUNT(*) AS stream_count
  FROM stream_events
  WHERE duration_seconds >= 30
  GROUP BY 1, 2, 3
)
SELECT artist_id, SUM(stream_count) AS total_plays,
  ROUND(SUM(stream_count) * 0.0038, 4) AS estimated_royalty_usd
FROM qualified_streams
GROUP BY 1
ORDER BY total_plays DESC;`,
      seedSql: `
        CREATE TABLE stream_events (
          event_id TEXT PRIMARY KEY,
          track_id TEXT,
          artist_id TEXT,
          territory TEXT,
          duration_seconds INT
        );
        INSERT INTO stream_events VALUES
          ('S_1', 'TRK_BIRDS_OF_FEATHER', 'ART_BILLIE_EILISH', 'US', 210),
          ('S_2', 'TRK_BIRDS_OF_FEATHER', 'ART_BILLIE_EILISH', 'GB', 210),
          ('S_3', 'TRK_BLINDING_LIGHTS', 'ART_THE_WEEKND', 'US', 200),
          ('S_4', 'TRK_CRUEL_SUMMER', 'ART_TAYLOR_SWIFT', 'US', 178),
          ('S_5', 'TRK_NOT_LIKE_US', 'ART_KENDRICK_LAMAR', 'US', 274),
          ('S_6', 'TRK_SKIP', 'ART_SKIP_USER', 'US', 12);
      `,
      tableHeaders: ['artist_id', 'total_plays', 'estimated_royalty_usd'],
      tableRows: [
        ['ART_BILLIE_EILISH', '2', '0.0076'],
        ['ART_KENDRICK_LAMAR', '1', '0.0038'],
        ['ART_TAYLOR_SWIFT', '1', '0.0038'],
        ['ART_THE_WEEKND', '1', '0.0038']
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
      reasoning: 'Evaluating conditional aggregation to audit double-entry ledger equilibrium across corporate entities.',
      rawSql: `-- JPMorgan Chase: Audit double-entry balance invariant across entities
SELECT legal_entity, account_code,
  ROUND(SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE 0 END), 2) AS debits,
  ROUND(SUM(CASE WHEN entry_type = 'CREDIT' THEN amount_usd ELSE 0 END), 2) AS credits,
  ROUND(SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE -amount_usd END), 2) AS variance
FROM general_ledger_entries
GROUP BY 1, 2;`,
      seedSql: `
        CREATE TABLE general_ledger_entries (
          entry_id TEXT PRIMARY KEY,
          legal_entity TEXT,
          account_code TEXT,
          entry_type TEXT,
          amount_usd REAL
        );
        INSERT INTO general_ledger_entries VALUES
          ('E_1', 'JPMC_US_RETAIL', '1010-CASH', 'DEBIT', 2140000.00),
          ('E_2', 'JPMC_US_RETAIL', '1010-CASH', 'CREDIT', 2140000.00),
          ('E_3', 'JPMC_UK_IB', '2040-NOSTRO', 'DEBIT', 1420200.00),
          ('E_4', 'JPMC_UK_IB', '2040-NOSTRO', 'CREDIT', 1420200.00),
          ('E_5', 'JPMC_EU_SE', '3010-INTERBANK', 'DEBIT', 1290000.00),
          ('E_6', 'JPMC_EU_SE', '3010-INTERBANK', 'CREDIT', 1290000.00);
      `,
      tableHeaders: ['legal_entity', 'account_code', 'debits', 'credits', 'variance'],
      tableRows: [
        ['JPMC_EU_SE', '3010-INTERBANK', '1290000', '1290000', '0'],
        ['JPMC_UK_IB', '2040-NOSTRO', '1420200', '1420200', '0'],
        ['JPMC_US_RETAIL', '1010-CASH', '2140000', '2140000', '0']
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
      reasoning: 'Filtering auth attempts with identical card fingerprint and < $1.00 amounts with velocity thresholding.',
      rawSql: `-- Stripe Radar: Flag card-testing velocity attacks within 60s window
SELECT card_fingerprint, ip_address,
  COUNT(*) AS attempts_count,
  MIN(auth_timestamp) AS first_attempt,
  MAX(auth_timestamp) AS last_attempt
FROM card_authorization_events
WHERE amount_usd < 1.00
GROUP BY 1, 2
HAVING COUNT(*) >= 5;`,
      seedSql: `
        CREATE TABLE card_authorization_events (
          auth_id TEXT PRIMARY KEY,
          card_fingerprint TEXT,
          ip_address TEXT,
          amount_usd REAL,
          auth_timestamp TEXT
        );
        INSERT INTO card_authorization_events VALUES
          ('A_1', 'FP_981a3e88', '198.51.100.42', 0.50, '14:22:01'),
          ('A_2', 'FP_981a3e88', '198.51.100.42', 0.50, '14:22:12'),
          ('A_3', 'FP_981a3e88', '198.51.100.42', 0.50, '14:22:25'),
          ('A_4', 'FP_981a3e88', '198.51.100.42', 0.50, '14:22:35'),
          ('A_5', 'FP_981a3e88', '198.51.100.42', 0.50, '14:22:48'),
          ('A_6', 'FP_981a3e91', '198.51.100.42', 0.75, '14:23:12'),
          ('A_7', 'FP_981a3e91', '198.51.100.42', 0.75, '14:23:20'),
          ('A_8', 'FP_981a3e91', '198.51.100.42', 0.75, '14:23:30'),
          ('A_9', 'FP_981a3e91', '198.51.100.42', 0.75, '14:23:42'),
          ('A_10', 'FP_981a3e91', '198.51.100.42', 0.75, '14:23:55');
      `,
      tableHeaders: ['card_fingerprint', 'ip_address', 'attempts_count', 'first_attempt', 'last_attempt'],
      tableRows: [
        ['FP_981a3e88', '198.51.100.42', '5', '14:22:01', '14:22:48'],
        ['FP_981a3e91', '198.51.100.42', '5', '14:23:12', '14:23:55']
      ],
      latency: '0.012ms',
      tuples: '2 fraud clusters detected',
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
  let userSqlMap = {}; // scenarioId -> string (persists user changes during session)

  // SQLite WASM Database instance management
  let sqlModuleInstance = null;
  let activeDb = null;
  let activeDbScenarioId = null;

  async function getWasmDb(scenarioId) {
    if (!sqlModuleInstance && typeof window.initSqlJs === 'function') {
      try {
        sqlModuleInstance = await window.initSqlJs({
          locateFile: file => {
            if (file.endsWith('.wasm')) {
              return window.location.pathname.includes('/visualizer') ? 'sql-wasm.wasm' : '/visualizer/sql-wasm.wasm';
            }
            return file;
          }
        });
      } catch (e) {
        console.warn('WASM initialization notice:', e);
      }
    }

    if (sqlModuleInstance) {
      if (!activeDb || activeDbScenarioId !== scenarioId) {
        if (activeDb) {
          try { activeDb.close(); } catch(e) {}
        }
        activeDb = new sqlModuleInstance.Database();
        const sc = KOMA_SCENARIOS[scenarioId];
        if (sc && sc.seedSql) {
          activeDb.run(sc.seedSql);
        }
        activeDbScenarioId = scenarioId;
      }
      return activeDb;
    }
    return null;
  }

  const LandingPageEngine = {
    init: function() {
      const container = document.getElementById('viewLandingPage');
      if (!container) return;
      container.innerHTML = this.renderHTML();
      this.bindEvents(container);

      // Trigger first execution on WASM DB
      setTimeout(() => {
        this.runActiveQuery();
      }, 50);
    },

    setScenario: function(id) {
      if (KOMA_SCENARIOS[id]) {
        // Save current editor state before leaving
        const textarea = document.getElementById('komaSqlEditor');
        if (textarea) {
          userSqlMap[activeScenarioId] = textarea.value;
        }

        activeScenarioId = id;
        this.updateView();

        // Run query for the newly selected scenario
        setTimeout(() => {
          this.runActiveQuery();
        }, 30);
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

    /**
     * Run the current active query against client-side SQLite WASM
     */
    runActiveQuery: async function() {
      const textarea = document.getElementById('komaSqlEditor');
      if (!textarea) return;
      const query = textarea.value.trim();

      const badge = document.getElementById('komaSinkBadge');
      const tableWrapper = document.getElementById('komaTableWrapper');
      const latencyElem = document.getElementById('komaSinkLatency');
      const tuplesElem = document.getElementById('komaSinkTuples');

      if (!query) {
        if (badge) {
          badge.className = 'koma-badge-yellow';
          badge.innerText = 'EMPTY QUERY ⚠';
        }
        if (tableWrapper) {
          tableWrapper.innerHTML = '<div class="koma-sink-empty">Please enter a valid SQL query to execute.</div>';
        }
        return;
      }

      if (badge) {
        badge.className = 'koma-badge-yellow';
        badge.innerText = 'EXECUTING...';
      }

      const db = await getWasmDb(activeScenarioId);

      if (db) {
        try {
          const t0 = performance.now();
          const results = db.exec(query);
          const t1 = performance.now();
          const latencyMs = Math.max(0.008, (t1 - t0)).toFixed(3) + 'ms';

          if (badge) {
            badge.className = 'koma-badge-green';
            badge.innerText = 'AST PASSED ✓';
          }

          if (latencyElem) {
            latencyElem.innerHTML = `latency: <strong>${latencyMs}</strong>`;
          }

          if (results && results.length > 0 && results[0].columns) {
            const cols = results[0].columns;
            const rows = results[0].values || [];

            if (tuplesElem) {
              tuplesElem.innerText = `${rows.length} tuples returned`;
            }

            if (tableWrapper) {
              tableWrapper.innerHTML = `
                <table class="koma-table">
                  <thead>
                    <tr>
                      ${cols.map(c => `<th>${escapeHtml(c)}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${rows.map(row => `
                      <tr>
                        ${row.map(cell => `<td>${escapeHtml(cell !== null ? cell : 'NULL')}</td>`).join('')}
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `;
            }
          } else {
            // Valid query, but zero result rows (or DDL/DML)
            if (tuplesElem) {
              tuplesElem.innerText = '0 tuples returned';
            }
            if (tableWrapper) {
              tableWrapper.innerHTML = `
                <div class="koma-sink-empty">
                  0 tuples returned (Empty set). Execution latency: ${latencyMs}
                </div>
              `;
            }
          }

        } catch (err) {
          // SQL execution or parsing error
          if (badge) {
            badge.className = 'koma-badge-red';
            badge.innerText = 'SYNTAX ERROR ✕';
          }
          if (latencyElem) {
            latencyElem.innerHTML = `latency: <strong style="color:#ef4444;">error</strong>`;
          }
          if (tuplesElem) {
            tuplesElem.innerText = '0 tuples';
          }
          if (tableWrapper) {
            tableWrapper.innerHTML = `
              <div class="koma-sink-error-box">
                <div class="koma-sink-error-title">
                  <span>✕ SQLite Engine Execution Error</span>
                </div>
                <div class="koma-sink-error-message">${escapeHtml(err.message || String(err))}</div>
                <div class="koma-sink-error-hint">
                  Tip: Press <strong>↺ Reset</strong> to restore working baseline query, or check table and column aliases.
                </div>
              </div>
            `;
          }
        }
      } else {
        // Fallback if WASM is still downloading over slow network
        const cur = KOMA_SCENARIOS[activeScenarioId];
        if (badge) {
          badge.className = 'koma-badge-green';
          badge.innerText = cur.status;
        }
        if (latencyElem) {
          latencyElem.innerHTML = `latency: <strong>${cur.latency}</strong>`;
        }
        if (tuplesElem) {
          tuplesElem.innerText = cur.tuples;
        }
        if (tableWrapper) {
          tableWrapper.innerHTML = `
            <table class="koma-table">
              <thead>
                <tr>${cur.tableHeaders.map(th => `<th>${escapeHtml(th)}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${cur.tableRows.map(row => `
                  <tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>
                `).join('')}
              </tbody>
            </table>
          `;
        }
      }
    },

    /**
     * Reset editor to default scenario query and re-seed database
     */
    resetActiveQuery: function() {
      const cur = KOMA_SCENARIOS[activeScenarioId];
      if (!cur) return;
      userSqlMap[activeScenarioId] = null;

      const textarea = document.getElementById('komaSqlEditor');
      if (textarea) {
        textarea.value = cur.rawSql;
        this.updateEditorGutter();
      }

      // Re-seed DB to clean slate
      if (activeDb && sqlModuleInstance && cur.seedSql) {
        try { activeDb.close(); } catch(e) {}
        activeDb = new sqlModuleInstance.Database();
        activeDb.run(cur.seedSql);
        activeDbScenarioId = activeScenarioId;
      }

      this.runActiveQuery();
    },

    /**
     * Simple SQL formatter to uppercase standard SQL keywords
     */
    formatActiveQuery: function() {
      const textarea = document.getElementById('komaSqlEditor');
      if (!textarea) return;

      let sql = textarea.value;
      const keywords = [
        'select', 'distinct', 'from', 'where', 'and', 'or', 'not', 'in', 'is', 'null',
        'join', 'left join', 'right join', 'inner join', 'outer join', 'cross join',
        'group by', 'order by', 'having', 'limit', 'offset', 'as', 'with', 'case',
        'when', 'then', 'else', 'end', 'over', 'partition by', 'asc', 'desc',
        'union', 'union all', 'insert into', 'values', 'create table', 'drop table'
      ];

      keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        sql = sql.replace(regex, match => match.toUpperCase());
      });

      textarea.value = sql;
      userSqlMap[activeScenarioId] = sql;
      this.updateEditorGutter();
    },

    /**
     * Update line numbers gutter to match textarea line count
     */
    updateEditorGutter: function() {
      const textarea = document.getElementById('komaSqlEditor');
      const gutter = document.getElementById('komaEditorGutter');
      if (!textarea || !gutter) return;

      const lines = (textarea.value || '').split('\n').length;
      let nums = [];
      const total = Math.max(lines, 8);
      for (let i = 1; i <= total; i++) {
        nums.push(i);
      }
      gutter.innerHTML = nums.join('<br>');
    },

    renderHTML: function() {
      const cur = KOMA_SCENARIOS[activeScenarioId] || KOMA_SCENARIOS.amazon;
      const curTrap = TRAPS[activeTrapId] || TRAPS.null_trap;
      const activeQuerySql = userSqlMap[activeScenarioId] || cur.rawSql;

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
                      <span>&gt;_ ${cur.filename}</span>
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
                    
                    <!-- Monaco / Interactive Code Column -->
                    <div class="koma-code-column">
                      
                      <!-- Editor Toolbar -->
                      <div class="koma-editor-toolbar">
                        <div class="koma-editor-toolbar-left">
                          <button class="koma-btn-run" onclick="window.LANDING_PAGE_ENGINE.runActiveQuery()" title="Execute SQL (Ctrl+Enter)">
                            <span>▶ Run Query</span>
                            <span class="koma-kbd">Ctrl+↵</span>
                          </button>
                          <button class="koma-btn-toolbar" onclick="window.LANDING_PAGE_ENGINE.resetActiveQuery()" title="Revert to original scenario query">
                            <span>↺ Reset</span>
                          </button>
                          <button class="koma-btn-toolbar" onclick="window.LANDING_PAGE_ENGINE.formatActiveQuery()" title="Format SQL keywords">
                            <span>⚡ Format</span>
                          </button>
                        </div>
                        <div class="koma-editor-toolbar-right">
                          <span><span class="koma-editor-pulse"></span>SQLite 3.45 WASM</span>
                        </div>
                      </div>

                      <!-- Editor Textarea with Gutter -->
                      <div class="koma-editor-body">
                        <div id="komaEditorGutter" class="koma-editor-gutter"></div>
                        <textarea id="komaSqlEditor" class="koma-code-textarea" spellcheck="false" wrap="off" placeholder="Write SQL query here...">${escapeHtml(activeQuerySql)}</textarea>
                      </div>

                    </div>

                    <!-- Live Tuple Sink Column -->
                    <div class="koma-sink-column">
                      <div class="koma-sink-header">
                        <span class="koma-sink-title">TUPLE SINK // WASM OUTPUT</span>
                        <span id="komaSinkBadge" class="koma-badge-green">${cur.status}</span>
                      </div>

                      <div id="komaTableWrapper" class="koma-table-wrapper">
                        <table class="koma-table">
                          <thead>
                            <tr>
                              ${cur.tableHeaders.map(th => `<th>${escapeHtml(th)}</th>`).join('')}
                            </tr>
                          </thead>
                          <tbody>
                            ${cur.tableRows.map(row => `
                              <tr>
                                ${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}
                              </tr>
                            `).join('')}
                          </tbody>
                        </table>
                      </div>

                      <div class="koma-sink-footer">
                        <span id="komaSinkLatency">latency: <strong>${cur.latency}</strong></span>
                        <span id="komaSinkTuples" style="color:#4ec9b0;">${cur.tuples}</span>
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
      const textarea = document.getElementById('komaSqlEditor');
      const gutter = document.getElementById('komaEditorGutter');

      if (textarea && gutter) {
        this.updateEditorGutter();

        // Sync scroll between textarea and line gutter
        textarea.addEventListener('scroll', function() {
          gutter.scrollTop = textarea.scrollTop;
        });

        // Update line gutter on input
        textarea.addEventListener('input', () => {
          userSqlMap[activeScenarioId] = textarea.value;
          this.updateEditorGutter();
        });

        // Keyboard navigation and shortcut handling
        textarea.addEventListener('keydown', (e) => {
          // Tab key: Insert 2 spaces
          if (e.key === 'Tab') {
            e.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 2;
            userSqlMap[activeScenarioId] = textarea.value;
            this.updateEditorGutter();
            return;
          }

          // Ctrl+Enter or Cmd+Enter: Execute query immediately
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            this.runActiveQuery();
          }
        });
      }
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
