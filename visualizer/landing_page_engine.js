/**
 * SQL FOUNDRY - SIMPLE, BEGINNER-FRIENDLY LANDING PAGE & LIVE RUNNER
 * Easy language, clear explanations, no complex jargon.
 * Client-side in-browser SQL practice.
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

  // --- BEGINNER-FRIENDLY COMPANY SCENARIOS ---
  const KOMA_SCENARIOS = {
    amazon: {
      id: 'amazon',
      tabLabel: 'Amazon Orders',
      company: 'Amazon',
      brandLetter: 'A',
      filename: 'amazon_orders.sql',
      prompt: 'Find new customers who signed up for Prime on Day 1 but placed no orders in their first 30 days.',
      reasoning: 'We check customer orders to see who hasn\'t bought anything again in 30 days so marketing can send a welcome reminder.',
      rawSql: `-- Amazon: Find new Prime members with no orders in 30 days
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
      tuples: '4 rows found',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewAmazonStory',
      viewTitle: 'Analytics',
      viewHash: '#analytics'
    },

    netflix: {
      id: 'netflix',
      tabLabel: 'Netflix Video',
      company: 'Netflix',
      brandLetter: 'N',
      filename: 'netflix_speeds.sql',
      prompt: 'Compare video loading speed and buffering percentage across different internet providers.',
      reasoning: 'We calculate the average load time and buffering percentage for each internet provider to spot slow connections.',
      rawSql: `-- Netflix: Compare video speed across internet providers
SELECT isp_asn,
  ROUND(AVG(ttff_ms), 1) AS avg_load_ms,
  ROUND(MAX(ttff_ms), 1) AS max_load_ms,
  ROUND(SUM(rebuffer_seconds) / SUM(play_duration_sec), 4) AS buffer_ratio
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
      tableHeaders: ['isp_asn', 'avg_load_ms', 'max_load_ms', 'buffer_ratio'],
      tableRows: [
        ['AS7922-COMCAST', '528.2', '814.0', '0.0008'],
        ['AS7018-ATT', '300.9', '940.5', '0.0012'],
        ['AS15169-GOOGLE', '409.4', '620.0', '0.0004'],
        ['AS3356-LUMEN', '662.6', '1040.2', '0.0016']
      ],
      latency: '0.016ms',
      tuples: '4 providers compared',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewNetflixStory',
      viewTitle: 'Netflix',
      viewHash: '#netflix'
    },

    uber: {
      id: 'uber',
      tabLabel: 'Uber Rides',
      company: 'Uber',
      brandLetter: 'U',
      filename: 'uber_rides.sql',
      prompt: 'Compare passenger ride requests to available drivers to calculate busy-area surge pricing.',
      reasoning: 'When there are many ride requests but few drivers in an area, the surge multiplier goes up.',
      rawSql: `-- Uber: Calculate busy-area surge multiplier based on demand
WITH area_demand AS (
  SELECT h3_index AS area_id, COUNT(*) AS ride_requests
  FROM uber_ride_requests
  WHERE requested_at >= '2026-11-07 16:00:00'
  GROUP BY area_id
)
SELECT d.area_id, d.ride_requests, COALESCE(s.drivers, 0) AS drivers,
  ROUND(CAST(d.ride_requests AS FLOAT) / MAX(COALESCE(s.drivers, 1), 1), 2) AS surge_price
FROM area_demand d
LEFT JOIN uber_driver_telemetry s ON d.area_id = s.h3_index
ORDER BY surge_price DESC;`,
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
          ('REQ_1', 'Downtown_Area', '2026-11-07 16:00:00'),
          ('REQ_2', 'Downtown_Area', '2026-11-07 16:02:00'),
          ('REQ_3', 'Downtown_Area', '2026-11-07 16:03:00'),
          ('REQ_4', 'Airport_Terminal', '2026-11-07 16:01:00'),
          ('REQ_5', 'Airport_Terminal', '2026-11-07 16:04:00'),
          ('REQ_6', 'Midtown_Mall', '2026-11-07 16:02:30'),
          ('REQ_7', 'Suburbs_North', '2026-11-07 16:01:15');
        INSERT INTO uber_driver_telemetry VALUES
          ('Downtown_Area', 18),
          ('Airport_Terminal', 21),
          ('Midtown_Mall', 32),
          ('Suburbs_North', 40);
      `,
      tableHeaders: ['area_id', 'ride_requests', 'drivers', 'surge_price'],
      tableRows: [
        ['Downtown_Area', '3', '18', '0.17x'],
        ['Airport_Terminal', '2', '21', '0.10x'],
        ['Midtown_Mall', '1', '32', '0.03x'],
        ['Suburbs_North', '1', '40', '0.03x']
      ],
      latency: '0.015ms',
      tuples: '4 areas computed',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewUberStory',
      viewTitle: 'Uber',
      viewHash: '#uber'
    },

    airbnb: {
      id: 'airbnb',
      tabLabel: 'Airbnb Stays',
      company: 'Airbnb',
      brandLetter: 'A',
      filename: 'airbnb_calendar.sql',
      prompt: 'Find empty calendar days between guest bookings so hosts can offer a discount.',
      reasoning: 'We look at booking check-out dates and the next check-in dates to find 1 to 3 empty days.',
      rawSql: `-- Airbnb: Find unbooked calendar gaps between guest stays
SELECT listing_id, check_out_date AS stay_ended,
  LEAD(check_in_date) OVER (
    PARTITION BY listing_id ORDER BY check_in_date
  ) AS next_guest_arrives,
  ROUND(JULIANDAY(LEAD(check_in_date) OVER (PARTITION BY listing_id ORDER BY check_in_date))
    - JULIANDAY(check_out_date), 1) AS empty_gap_days
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
          ('RES_1', 'Apartment_101', '2026-10-10', '2026-10-14', 'CONFIRMED'),
          ('RES_2', 'Apartment_101', '2026-10-16', '2026-10-22', 'CONFIRMED'),
          ('RES_3', 'Apartment_101', '2026-10-24', '2026-10-30', 'CONFIRMED'),
          ('RES_4', 'Beach_House_202', '2026-10-01', '2026-10-05', 'CONFIRMED'),
          ('RES_5', 'Beach_House_202', '2026-10-07', '2026-10-12', 'CONFIRMED'),
          ('RES_6', 'Mountain_Cabin_303', '2026-10-28', '2026-11-01', 'CONFIRMED'),
          ('RES_7', 'Mountain_Cabin_303', '2026-11-04', '2026-11-10', 'CONFIRMED');
      `,
      tableHeaders: ['listing_id', 'stay_ended', 'next_guest_arrives', 'empty_gap_days'],
      tableRows: [
        ['Apartment_101', '2026-10-14', '2026-10-16', '2.0 days'],
        ['Apartment_101', '2026-10-22', '2026-10-24', '2.0 days'],
        ['Apartment_101', '2026-10-30', null, null],
        ['Beach_House_202', '2026-10-05', '2026-10-07', '2.0 days'],
        ['Beach_House_202', '2026-10-12', null, null]
      ],
      latency: '0.013ms',
      tuples: '7 bookings checked',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewAirbnbStory',
      viewTitle: 'Airbnb',
      viewHash: '#airbnb'
    },

    spotify: {
      id: 'spotify',
      tabLabel: 'Spotify Music',
      company: 'Spotify',
      brandLetter: 'S',
      filename: 'spotify_earnings.sql',
      prompt: 'Count song plays of 30 seconds or longer to calculate how much money artists earned.',
      reasoning: 'Plays under 30 seconds are skipped and not paid. We calculate total valid plays multiplied by the payment rate.',
      rawSql: `-- Spotify: Calculate artist earnings for plays over 30 seconds
WITH valid_plays AS (
  SELECT artist_id, COUNT(*) AS stream_count
  FROM stream_events
  WHERE duration_seconds >= 30
  GROUP BY artist_id
)
SELECT artist_id, stream_count AS total_plays,
  ROUND(stream_count * 0.0038, 4) AS earnings_usd
FROM valid_plays
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
          ('S_1', 'Song_1', 'Billie Eilish', 'US', 210),
          ('S_2', 'Song_2', 'Billie Eilish', 'GB', 210),
          ('S_3', 'Song_3', 'The Weeknd', 'US', 200),
          ('S_4', 'Song_4', 'Taylor Swift', 'US', 178),
          ('S_5', 'Song_5', 'Kendrick Lamar', 'US', 274),
          ('S_6', 'Song_6', 'Skipped User', 'US', 12);
      `,
      tableHeaders: ['artist_id', 'total_plays', 'earnings_usd'],
      tableRows: [
        ['Billie Eilish', '2', '$0.0076'],
        ['Kendrick Lamar', '1', '$0.0038'],
        ['Taylor Swift', '1', '$0.0038'],
        ['The Weeknd', '1', '$0.0038']
      ],
      latency: '0.017ms',
      tuples: '4 artists calculated',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewSpotifyStory',
      viewTitle: 'Spotify',
      viewHash: '#spotify'
    },

    jpmorgan: {
      id: 'jpmorgan',
      tabLabel: 'JPMorgan Banking',
      company: 'JPMorgan Chase',
      brandLetter: 'J',
      filename: 'jpmorgan_balance.sql',
      prompt: 'Check bank accounts to make sure money coming in (Debits) matches money going out (Credits).',
      reasoning: 'Every bank account must balance to zero. We add up debits and credits to ensure the difference is $0.00.',
      rawSql: `-- JPMorgan: Check that debits and credits balance to zero
SELECT bank_branch, account_name,
  ROUND(SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE 0 END), 2) AS total_in,
  ROUND(SUM(CASE WHEN entry_type = 'CREDIT' THEN amount_usd ELSE 0 END), 2) AS total_out,
  ROUND(SUM(CASE WHEN entry_type = 'DEBIT' THEN amount_usd ELSE -amount_usd END), 2) AS difference
FROM general_ledger_entries
GROUP BY 1, 2;`,
      seedSql: `
        CREATE TABLE general_ledger_entries (
          entry_id TEXT PRIMARY KEY,
          bank_branch TEXT,
          account_name TEXT,
          entry_type TEXT,
          amount_usd REAL
        );
        INSERT INTO general_ledger_entries VALUES
          ('E_1', 'New York Branch', 'Checking Accounts', 'DEBIT', 2140000.00),
          ('E_2', 'New York Branch', 'Checking Accounts', 'CREDIT', 2140000.00),
          ('E_3', 'London Branch', 'Savings Accounts', 'DEBIT', 1420200.00),
          ('E_4', 'London Branch', 'Savings Accounts', 'CREDIT', 1420200.00),
          ('E_5', 'Tokyo Branch', 'Interbank Reserve', 'DEBIT', 1290000.00),
          ('E_6', 'Tokyo Branch', 'Interbank Reserve', 'CREDIT', 1290000.00);
      `,
      tableHeaders: ['bank_branch', 'account_name', 'total_in', 'total_out', 'difference'],
      tableRows: [
        ['London Branch', 'Savings Accounts', '$1,420,200', '$1,420,200', '$0.00 (Balanced)'],
        ['New York Branch', 'Checking Accounts', '$2,140,000', '$2,140,000', '$0.00 (Balanced)'],
        ['Tokyo Branch', 'Interbank Reserve', '$1,290,000', '$1,290,000', '$0.00 (Balanced)']
      ],
      latency: '0.011ms',
      tuples: '3 accounts checked',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewJPMorganStory',
      viewTitle: 'Finance',
      viewHash: '#jpmorgan'
    },

    stripe: {
      id: 'stripe',
      tabLabel: 'Stripe Payments',
      company: 'Stripe',
      brandLetter: 'S',
      filename: 'stripe_fraud.sql',
      prompt: 'Spot potential card fraud by finding multiple test charges under $1 on the same card.',
      reasoning: 'Fraudsters often test stolen cards with tiny amounts. We flag any card with 5 or more rapid attempts.',
      rawSql: `-- Stripe: Flag suspicious tiny test payments under $1.00
SELECT card_number_masked, ip_location,
  COUNT(*) AS charge_attempts,
  MIN(charge_time) AS first_charge,
  MAX(charge_time) AS last_charge
FROM card_authorization_events
WHERE amount_usd < 1.00
GROUP BY 1, 2
HAVING COUNT(*) >= 5;`,
      seedSql: `
        CREATE TABLE card_authorization_events (
          auth_id TEXT PRIMARY KEY,
          card_number_masked TEXT,
          ip_location TEXT,
          amount_usd REAL,
          charge_time TEXT
        );
        INSERT INTO card_authorization_events VALUES
          ('A_1', '•••• 4242', '198.51.100.42', 0.50, '14:22:01'),
          ('A_2', '•••• 4242', '198.51.100.42', 0.50, '14:22:12'),
          ('A_3', '•••• 4242', '198.51.100.42', 0.50, '14:22:25'),
          ('A_4', '•••• 4242', '198.51.100.42', 0.50, '14:22:35'),
          ('A_5', '•••• 4242', '198.51.100.42', 0.50, '14:22:48'),
          ('A_6', '•••• 9191', '198.51.100.42', 0.75, '14:23:12'),
          ('A_7', '•••• 9191', '198.51.100.42', 0.75, '14:23:20'),
          ('A_8', '•••• 9191', '198.51.100.42', 0.75, '14:23:30'),
          ('A_9', '•••• 9191', '198.51.100.42', 0.75, '14:23:42'),
          ('A_10', '•••• 9191', '198.51.100.42', 0.75, '14:23:55');
      `,
      tableHeaders: ['card_number_masked', 'ip_location', 'charge_attempts', 'first_charge', 'last_charge'],
      tableRows: [
        ['•••• 4242', '198.51.100.42', '5', '14:22:01', '14:22:48'],
        ['•••• 9191', '198.51.100.42', '5', '14:23:12', '14:23:55']
      ],
      latency: '0.012ms',
      tuples: '2 cards flagged',
      status: 'QUERY SUCCESS ✓',
      viewId: 'viewStripeStory',
      viewTitle: 'Stripe',
      viewHash: '#stripe'
    }
  };

  // --- 5 COMMON BEGINNER MISTAKES ---
  const TRAPS = {
    null_trap: {
      id: 'null_trap',
      title: '1. Forgetting Missing Values (NULL)',
      codeWrong: `-- ✕ MISTAKE: If churned_users has any empty (NULL) value, this returns 0 rows!
SELECT user_id, email, signup_date
FROM users
WHERE user_id NOT IN (
  SELECT user_id FROM churned_users
);`,
      codeFix: `-- ✓ CLEAN FIX: Safe check using NOT EXISTS
SELECT u.user_id, u.email, u.signup_date
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM churned_users c
  WHERE c.user_id = u.user_id
);`,
      impact: 'In SQL, checking if something is NOT IN a list that has missing (NULL) values cancels out the whole query. Always use NOT EXISTS or WHERE IS NOT NULL.'
    },

    float_drift: {
      id: 'float_drift',
      title: '2. Money Rounding Errors with Decimals',
      codeWrong: `-- ✕ MISTAKE: Standard numbers (FLOAT) can lose pennies due to computer rounding!
SELECT account_id, 
  SUM(CAST(amount AS FLOAT)) AS total_balance
FROM ledger_entries
GROUP BY account_id
HAVING SUM(CAST(amount AS FLOAT)) != 0.00;`,
      codeFix: `-- ✓ CLEAN FIX: Use exact cents or fixed decimals
SELECT account_id, 
  ROUND(SUM(CAST(amount_cents AS BIGINT)), 2) AS net_cents,
  ROUND(SUM(CAST(amount AS DECIMAL(18,4))), 4) AS exact_balance
FROM ledger_entries
GROUP BY account_id
HAVING SUM(amount_cents) != 0;`,
      impact: 'Computer floating-point numbers can turn $10.00 into $9.999999. In finance and ecommerce, always store money as exact cents or fixed decimals.'
    },

    window_frame: {
      id: 'window_frame',
      title: '3. Running Totals on the Same Date',
      codeWrong: `-- ✕ MISTAKE: If two orders happen on the same day, this lumps them together!
SELECT order_date, order_amount,
  SUM(order_amount) OVER (ORDER BY order_date) AS running_total
FROM daily_sales;`,
      codeFix: `-- ✓ CLEAN FIX: Specify row-by-row order so each order is separate
SELECT order_date, order_amount,
  SUM(order_amount) OVER (
    ORDER BY order_date, order_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS true_running_total
FROM daily_sales;`,
      impact: 'By default, SQL window sums can bundle rows that share the exact same date. Adding row-by-row ordering keeps your running balance accurate.'
    },

    non_sargable: {
      id: 'non_sargable',
      title: '4. Slow Date Filtering in Large Tables',
      codeWrong: `-- ✕ MISTAKE: Putting a function on a date makes the database check every row!
SELECT customer_id, order_id, order_total
FROM orders
WHERE strftime('%Y', order_date) = '2026';`,
      codeFix: `-- ✓ CLEAN FIX: Use a simple date range (>= and <) which runs 100x faster
SELECT customer_id, order_id, order_total
FROM orders
WHERE order_date >= '2026-01-01' 
  AND order_date < '2027-01-01';`,
      impact: 'Wrapping table columns inside functions stops the database from using its fast indexes. Clean comparisons using >= and < make queries fly.'
    },

    cartesian_fanout: {
      id: 'cartesian_fanout',
      title: '5. Accidental Duplicate Rows When Joining',
      codeWrong: `-- ✕ MISTAKE: Joining items and payments directly multiplies rows and inflates sums!
SELECT o.order_id,
  SUM(i.item_price) AS total_items_price,
  SUM(p.payment_amount) AS total_paid
FROM orders o
JOIN order_items i ON o.order_id = i.order_id
JOIN payments p ON o.order_id = p.order_id
GROUP BY o.order_id;`,
      codeFix: `-- ✓ CLEAN FIX: Calculate subtotals first before joining them
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
      impact: 'Joining two lists of items for the same order multiplies rows together (e.g. 3 items x 2 payments = 6 rows), giving inflated totals. Calculate subtotals first.'
    }
  };

  let activeScenarioId = 'amazon';
  let activeTrapId = 'null_trap';
  let userSqlMap = {};

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
        console.warn('WASM notice:', e);
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

      setTimeout(() => {
        this.runActiveQuery();
      }, 50);
    },

    setScenario: function(id) {
      if (KOMA_SCENARIOS[id]) {
        const textarea = document.getElementById('komaSqlEditor');
        if (textarea) {
          userSqlMap[activeScenarioId] = textarea.value;
        }

        activeScenarioId = id;
        this.updateView();

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
          tableWrapper.innerHTML = '<div class="koma-sink-empty">Type any SQL query above and click ▶ Run Query.</div>';
        }
        return;
      }

      if (badge) {
        badge.className = 'koma-badge-yellow';
        badge.innerText = 'RUNNING...';
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
            badge.innerText = 'QUERY SUCCESS ✓';
          }

          if (latencyElem) {
            latencyElem.innerHTML = `speed: <strong>${latencyMs}</strong>`;
          }

          if (results && results.length > 0 && results[0].columns) {
            const cols = results[0].columns;
            const rows = results[0].values || [];

            if (tuplesElem) {
              tuplesElem.innerText = `${rows.length} rows found`;
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
            if (tuplesElem) {
              tuplesElem.innerText = '0 rows found';
            }
            if (tableWrapper) {
              tableWrapper.innerHTML = `
                <div class="koma-sink-empty">
                  0 rows found (Empty result). Query finished in ${latencyMs}.
                </div>
              `;
            }
          }

        } catch (err) {
          if (badge) {
            badge.className = 'koma-badge-red';
            badge.innerText = 'SYNTAX ERROR ✕';
          }
          if (latencyElem) {
            latencyElem.innerHTML = `status: <strong style="color:#ef4444;">error</strong>`;
          }
          if (tuplesElem) {
            tuplesElem.innerText = '0 rows';
          }
          if (tableWrapper) {
            tableWrapper.innerHTML = `
              <div class="koma-sink-error-box">
                <div class="koma-sink-error-title">
                  <span>✕ SQL Syntax Error</span>
                </div>
                <div class="koma-sink-error-message">${escapeHtml(err.message || String(err))}</div>
                <div class="koma-sink-error-hint">
                  Tip: Check your column and table names, or click <strong>↺ Reset</strong> to restore the working query!
                </div>
              </div>
            `;
          }
        }
      } else {
        const cur = KOMA_SCENARIOS[activeScenarioId];
        if (badge) {
          badge.className = 'koma-badge-green';
          badge.innerText = cur.status;
        }
        if (latencyElem) {
          latencyElem.innerHTML = `speed: <strong>${cur.latency}</strong>`;
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

    resetActiveQuery: function() {
      const cur = KOMA_SCENARIOS[activeScenarioId];
      if (!cur) return;
      userSqlMap[activeScenarioId] = null;

      const textarea = document.getElementById('komaSqlEditor');
      if (textarea) {
        textarea.value = cur.rawSql;
        this.updateEditorGutter();
      }

      if (activeDb && sqlModuleInstance && cur.seedSql) {
        try { activeDb.close(); } catch(e) {}
        activeDb = new sqlModuleInstance.Database();
        activeDb.run(cur.seedSql);
        activeDbScenarioId = activeScenarioId;
      }

      this.runActiveQuery();
    },

    formatActiveQuery: function() {
      const textarea = document.getElementById('komaSqlEditor');
      if (!textarea) return;

      let sql = textarea.value;
      const keywords = [
        'select', 'distinct', 'from', 'where', 'and', 'or', 'not', 'in', 'is', 'null',
        'join', 'left join', 'right join', 'inner join', 'group by', 'order by',
        'having', 'limit', 'offset', 'as', 'with', 'case', 'when', 'then', 'else',
        'end', 'over', 'partition by', 'asc', 'desc'
      ];

      keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        sql = sql.replace(regex, match => match.toUpperCase());
      });

      textarea.value = sql;
      userSqlMap[activeScenarioId] = sql;
      this.updateEditorGutter();
    },

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

          <!-- 1. HERO SECTION (BEGINNER FRIENDLY) -->
          <section class="koma-hero">
            
            <div class="koma-badge-row">
              <span class="koma-badge-pill">
                <span>Interactive SQL Learning &bull; Zero Installation Required</span>
              </span>
            </div>

            <h1 class="koma-hero-title">
              SQL Foundry<br>
              for Data &amp; Finance
            </h1>

            <p class="koma-hero-subtitle">
              Learn SQL step-by-step with simple, real-world examples from companies like Amazon, Netflix, and Spotify. Designed for complete beginners to practice and run real queries directly in your browser.
            </p>

            <div class="koma-cta-row">
              <button class="btn-koma-primary" onclick="window.LANDING_PAGE_ENGINE.openSectionStudio()">
                Start Learning SQL &rarr;
              </button>
              <button class="btn-koma-secondary" onclick="window.LANDING_PAGE_ENGINE.openLeetCode()">
                Browse Practice Problems
              </button>
            </div>

            <div class="koma-platform-subtext">
              Beginner-friendly &bull; MySQL &bull; PostgreSQL &bull; SQLite in browser &bull; Real datasets
            </div>

          </section>

          <!-- 2. KOMA SHOWCASE (PILL TABS + IDE RUNNER) -->
          <section class="koma-showcase-wrapper">
            
            <!-- Company Selection Tabs -->
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

            <!-- Desktop IDE Window Mockup -->
            <div class="koma-window-mockup">
              
              <!-- Window Header -->
              <div class="koma-window-header">
                <div class="koma-window-dots">
                  <span class="koma-dot koma-dot-red"></span>
                  <span class="koma-dot koma-dot-yellow"></span>
                  <span class="koma-dot koma-dot-green"></span>
                </div>

                <div class="koma-session-bar">
                  <span>practice: <strong>${cur.company} Dataset</strong></span>
                  <span style="color:#444;">|</span>
                  <span class="koma-action-tag" onclick="window.LANDING_PAGE_ENGINE.openSectionStudio()">Open Studio</span>
                  <span style="color:#444;">|</span>
                  <span style="color:#71717a;">In-Browser SQL Engine</span>
                </div>

                <div class="koma-wordmark">
                  <span>sql foundry</span>
                </div>
              </div>

              <!-- Window Body: Sidebar + Main Area -->
              <div class="koma-window-body">
                
                <!-- Sidebar Explorer -->
                <div class="koma-sidebar">
                  <div class="koma-sidebar-label">PRACTICE EXAMPLES</div>
                  
                  <div class="koma-tree-group">
                    <div class="koma-tree-header">&blacktriangledown; COMPANY TABLES</div>
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
                    <div class="koma-tree-header">&blacktriangledown; ENGINE STATUS</div>
                    <div class="koma-tree-item active">
                      <span>&check;</span>
                      <span>Ready to run</span>
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
                  </div>

                  <!-- Prompt Strip -->
                  <div class="koma-prompt-strip">
                    <div class="koma-prompt-text">
                      ${cur.prompt}
                    </div>
                    <div class="koma-reasoning-toggle">
                      <span>&bull; Simple Explanation &rsaquo;</span>
                      <span style="color:#a3a3a3;">${cur.reasoning}</span>
                    </div>
                  </div>

                  <!-- Split: Code Editor vs Results -->
                  <div class="koma-editor-sink-split">
                    
                    <!-- Code Editor Column -->
                    <div class="koma-code-column">
                      
                      <!-- Editor Toolbar -->
                      <div class="koma-editor-toolbar">
                        <div class="koma-editor-toolbar-left">
                          <button class="koma-btn-run" onclick="window.LANDING_PAGE_ENGINE.runActiveQuery()" title="Run SQL (Ctrl+Enter)">
                            <span>▶ Run Query</span>
                            <span class="koma-kbd">Ctrl+↵</span>
                          </button>
                          <button class="koma-btn-toolbar" onclick="window.LANDING_PAGE_ENGINE.resetActiveQuery()" title="Reset to original query">
                            <span>↺ Reset</span>
                          </button>
                          <button class="koma-btn-toolbar" onclick="window.LANDING_PAGE_ENGINE.formatActiveQuery()" title="Uppercase keywords">
                            <span>⚡ Format</span>
                          </button>
                        </div>
                        <div class="koma-editor-toolbar-right">
                          <span><span class="koma-editor-pulse"></span>Live Editor Ready</span>
                        </div>
                      </div>

                      <!-- Editor Textarea with Line Numbers -->
                      <div class="koma-editor-body">
                        <div id="komaEditorGutter" class="koma-editor-gutter"></div>
                        <textarea id="komaSqlEditor" class="koma-code-textarea" spellcheck="false" wrap="off" placeholder="Write SQL query here...">${escapeHtml(activeQuerySql)}</textarea>
                      </div>

                    </div>

                    <!-- Live Query Results Column -->
                    <div class="koma-sink-column">
                      <div class="koma-sink-header">
                        <span class="koma-sink-title">QUERY RESULTS</span>
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
                        <span id="komaSinkLatency">speed: <strong>${cur.latency}</strong></span>
                        <span id="komaSinkTuples" style="color:#4ec9b0;">${cur.tuples}</span>
                        <button class="btn-koma-primary" style="padding:4px 10px; font-size:11px;" onclick="window.LANDING_PAGE_ENGINE.launchTrack('${cur.viewId}', '${cur.viewTitle}', '${cur.viewHash}')">
                          Practice ${cur.company} &rarr;
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

          <!-- 3. PRACTICE PROBLEMS COUNTER -->
          <section class="koma-giant-stat-section">
            <div class="koma-giant-number">323 / 323</div>
            <div class="koma-giant-label">practice problems solved step-by-step directly in your browser</div>
          </section>

          <!-- 4. REAL-WORLD PRACTICE TRACKS -->
          <section class="koma-tracks-section">
            
            <div class="koma-vertical-header">
              <span>real-world examples</span>
            </div>

            <div class="koma-cards-grid">
              
              <!-- Card 1: Amazon -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewAmazonStory', 'Analytics', '#analytics')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">A</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Amazon Store</h4>
                  <p class="koma-card-desc">Customer retention &bull; 30-day Prime orders practice</p>
                </div>
              </div>

              <!-- Card 2: Netflix -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewNetflixStory', 'Netflix', '#netflix')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">N</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Netflix Video</h4>
                  <p class="koma-card-desc">Video loading speed &bull; buffering data analysis</p>
                </div>
              </div>

              <!-- Card 3: Uber -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewUberStory', 'Uber', '#uber')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">U</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Uber Rides</h4>
                  <p class="koma-card-desc">Passenger ride demand &bull; busy-area surge pricing</p>
                </div>
              </div>

              <!-- Card 4: Airbnb -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewAirbnbStory', 'Airbnb', '#airbnb')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">A</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Airbnb Stays</h4>
                  <p class="koma-card-desc">Calendar gap days &bull; smart price discounts</p>
                </div>
              </div>

              <!-- Card 5: Spotify -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewSpotifyStory', 'Spotify', '#spotify')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">S</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Spotify Music</h4>
                  <p class="koma-card-desc">Song play counts &bull; artist royalty payouts</p>
                </div>
              </div>

              <!-- Card 6: JPMorgan Chase -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewJPMorganStory', 'Finance', '#jpmorgan')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">J</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">JPMorgan Banking</h4>
                  <p class="koma-card-desc">Balancing bank accounts &bull; debits and credits check</p>
                </div>
              </div>

              <!-- Card 7: Stripe -->
              <div class="koma-track-card" onclick="window.LANDING_PAGE_ENGINE.launchTrack('viewStripeStory', 'Stripe', '#stripe')">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">S</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">Stripe Payments</h4>
                  <p class="koma-card-desc">Credit card safety &bull; detecting tiny test charges</p>
                </div>
              </div>

              <!-- Card 8: Guided Capstones -->
              <div class="koma-track-card" onclick="if(window.selectNavView) window.selectNavView('viewCapstones', 'Guided Capstones', 'navGroupPractice'); try{window.location.hash='#capstone';}catch(e){}">
                <div class="koma-card-top">
                  <div class="koma-brand-icon">+</div>
                  <span class="koma-card-arrow">&nearr;</span>
                </div>
                <div>
                  <h4 class="koma-card-title">10 Guided Projects</h4>
                  <p class="koma-card-desc">Healthcare, Ecommerce &bull; End-to-end beginner projects</p>
                </div>
              </div>

            </div>

          </section>

          <!-- 5. 5 COMMON BEGINNER MISTAKES (CLEAN EXPLANATION) -->
          <section class="koma-diff-section">
            
            <div class="koma-section-header">
              <span class="koma-section-tag">beginner guide</span>
              <h2 class="koma-section-title">5 Common SQL Mistakes (And How to Fix Them)</h2>
              <p class="koma-section-sub">
                Simple query mistakes that beginners run into, why they happen, and the clean way to write them.
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
                  <div class="koma-box-tag" style="color:#f87171;">✕ COMMON BEGINNER MISTAKE</div>
                  <pre class="koma-diff-pre"><code>${curTrap.codeWrong}</code></pre>
                </div>

                <div class="koma-diff-box koma-box-success">
                  <div class="koma-box-tag" style="color:#4ec9b0;">✓ CLEAN WORKING FIX</div>
                  <pre class="koma-diff-pre"><code>${curTrap.codeFix}</code></pre>
                </div>

              </div>

              <div class="koma-diff-impact">
                <strong>Why this matters:</strong> ${curTrap.impact}
              </div>

            </div>

          </section>

          <!-- 6. FOOTER -->
          <footer class="koma-footer">
            <div>
              <span>sql foundry &bull; interactive sql learning platform for beginners</span>
            </div>
            <div style="display:flex; gap:16px;">
              <a href="#studio" onclick="window.LANDING_PAGE_ENGINE.openSectionStudio(); return false;">interactive studio</a>
              <a href="#leetcode" onclick="window.LANDING_PAGE_ENGINE.openLeetCode(); return false;">practice problems</a>
              <a href="#companies" onclick="if(window.selectNavView) window.selectNavView('viewCompanyHub', 'Companies', 'navGroupPractice'); return false;">company tracks</a>
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

        textarea.addEventListener('scroll', function() {
          gutter.scrollTop = textarea.scrollTop;
        });

        textarea.addEventListener('input', () => {
          userSqlMap[activeScenarioId] = textarea.value;
          this.updateEditorGutter();
        });

        textarea.addEventListener('keydown', (e) => {
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

          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            this.runActiveQuery();
          }
        });
      }
    }
  };

  window.LANDING_PAGE_ENGINE = LandingPageEngine;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      LandingPageEngine.init();
    });
  } else {
    LandingPageEngine.init();
  }

})(window);
