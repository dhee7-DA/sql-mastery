/**
 * SQL FOUNDRY: TIMED FAANG & WALL STREET MOCK INTERVIEW DATA VAULT
 * 5 Comprehensive Company Interview Tracks (45-Minute Technical Screens)
 * - Citadel Securities (HFT & Quantitative Risk)
 * - Meta / Instagram (Product Analytics & Social Graph)
 * - Stripe (Core Ledgers & FinTech Payments)
 * - Snowflake (Cloud Infrastructure & Multi-Tenant Compute)
 * - Google / YouTube (Streaming Media & User Sessionization)
 */

window.MOCK_INTERVIEW_DATA = {
  tracks: [
    // =========================================================================
    // TRACK 1: CITADEL SECURITIES (QUANTITATIVE FINANCE & HFT)
    // =========================================================================
    {
      id: "track_citadel",
      company: "Citadel Securities",
      role: "Quantitative Data Engineer (Core Trading Systems)",
      badge: "Wall Street / HFT",
      icon: "🏛️",
      difficulty: "Hard",
      timeLimitMinutes: 45,
      compensationRange: "$350,000 – $520,000",
      description: "Fast-paced market microstructure screen testing high-frequency trade blotters, volume-weighted pricing, crossing spreads, and portfolio drawdown recovery.",
      interviewer: {
        name: "Marcus Vance",
        title: "Head of Quantitative Data Infrastructure",
        avatar: "🎩"
      },
      seedSql: `
DROP TABLE IF EXISTS market_trades;
CREATE TABLE IF NOT EXISTS market_trades (
  trade_id TEXT PRIMARY KEY,
  ticker TEXT NOT NULL,
  side TEXT NOT NULL,
  price REAL NOT NULL,
  shares INTEGER NOT NULL,
  trade_time TEXT NOT NULL
);

INSERT INTO market_trades VALUES
  ('T-01', 'NVDA', 'BUY', 120.00, 500, '2026-10-15 09:30:01'),
  ('T-02', 'NVDA', 'BUY', 120.50, 1000, '2026-10-15 09:30:03'),
  ('T-03', 'NVDA', 'SELL', 121.00, 1500, '2026-10-15 09:30:05'),
  ('T-04', 'NVDA', 'BUY', 120.25, 2000, '2026-10-15 09:30:09'),
  ('T-05', 'AAPL', 'BUY', 225.00, 800, '2026-10-15 09:30:02'),
  ('T-06', 'AAPL', 'SELL', 224.50, 1200, '2026-10-15 09:30:06'),
  ('T-07', 'AAPL', 'BUY', 225.50, 500, '2026-10-15 09:30:10');

DROP TABLE IF EXISTS quote_ticks;
CREATE TABLE IF NOT EXISTS quote_ticks (
  tick_id INTEGER PRIMARY KEY,
  ticker TEXT NOT NULL,
  bid_price REAL NOT NULL,
  ask_price REAL NOT NULL,
  tick_time TEXT NOT NULL
);

INSERT INTO quote_ticks VALUES
  (1, 'NVDA', 120.00, 120.10, '09:30:01'),
  (2, 'NVDA', 120.15, 120.25, '09:30:02'),
  (3, 'NVDA', 120.30, 120.20, '09:30:03'), -- INVERTED / CROSSED (Bid > Ask)
  (4, 'NVDA', 120.10, 120.20, '09:30:04'),
  (5, 'NVDA', 120.40, 120.35, '09:30:05'), -- INVERTED / CROSSED
  (6, 'AAPL', 225.00, 225.10, '09:30:01'),
  (7, 'AAPL', 225.20, 225.15, '09:30:02'); -- INVERTED / CROSSED

DROP TABLE IF EXISTS portfolio_snapshots;
CREATE TABLE IF NOT EXISTS portfolio_snapshots (
  day_id INTEGER PRIMARY KEY,
  trading_day TEXT NOT NULL,
  portfolio_nav REAL NOT NULL
);

INSERT INTO portfolio_snapshots VALUES
  (1, '2026-10-01', 100000000.00),
  (2, '2026-10-02', 103000000.00), -- Peak 1 (103M)
  (3, '2026-10-03', 101000000.00), -- Drawdown
  (4, '2026-10-04', 98000000.00),  -- Deep Drawdown
  (5, '2026-10-05', 102500000.00), -- Recovery
  (6, '2026-10-06', 104000000.00), -- New Peak (104M)
  (7, '2026-10-07', 103500000.00);
`,
      rounds: [
        {
          roundNum: 1,
          timeBudgetMinutes: 10,
          title: "Round 1: Volume-Weighted Average Price (VWAP) Engine",
          difficulty: "Warmup / Medium",
          prompt: `Write a query to calculate the **Volume-Weighted Average Price (VWAP)** for each ticker from the \`market_trades\` table.
          
**Formula:**
$$\\text{VWAP} = \\frac{\\sum(\\text{price} \\times \\text{shares})}{\\sum(\\text{shares})}$$

**Requirements:**
- Return columns: \`ticker\`, \`total_shares\`, \`total_notional\`, \`vwap\`.
- Round \`total_notional\` and \`vwap\` to 2 decimal places.
- Order by \`total_notional\` DESC.`,
          starterSql: `-- Citadel Round 1: Calculate VWAP per Ticker
SELECT
  ticker,
  -- Your code here
FROM market_trades
GROUP BY ticker;`,
          solutionSql: `SELECT
  ticker,
  SUM(shares) AS total_shares,
  ROUND(SUM(price * shares), 2) AS total_notional,
  ROUND(SUM(price * shares) * 1.0 / SUM(shares), 2) AS vwap
FROM market_trades
GROUP BY ticker
ORDER BY total_notional DESC;`,
          hints: [
            "Use SUM(price * shares) to compute the total dollar notional traded.",
            "Make sure to multiply by 1.0 or use CAST to prevent integer division before rounding."
          ],
          expectedColumns: ["ticker", "total_shares", "total_notional", "vwap"],
          expectedRowCount: 2,
          bloopGreeting: "Welcome to Citadel! We process 8 billion orders daily. Let's start with a clean VWAP calculation across execution blotters."
        },
        {
          roundNum: 2,
          timeBudgetMinutes: 15,
          title: "Round 2: Crossed & Inverted Market Ticks Detection",
          difficulty: "Intermediate",
          prompt: `In liquid equity markets, the Ask price is strictly higher than the Bid price ($\\text{Ask} > \\text{Bid}$). An inverted quote where $\\text{Bid} > \\text{Ask}$ signals an execution crossing break or stale quote latch.

**Requirements:**
- Identify all crossed ticks where \`bid_price > ask_price\`.
- For each crossed tick, compute the crossing spread: \`ROUND(bid_price - ask_price, 4)\` as \`crossed_spread\`.
- Also use a window function to look up the prior tick's \`bid_price\` as \`prev_bid\` for that ticker.
- Return: \`ticker\`, \`tick_time\`, \`bid_price\`, \`ask_price\`, \`crossed_spread\`, \`prev_bid\`.
- Order by \`ticker\`, \`tick_time\` ASC.`,
          starterSql: `-- Citadel Round 2: Detect Crossed Market Ticks
SELECT
  ticker,
  tick_time,
  bid_price,
  ask_price,
  -- Calculate crossed_spread and prev_bid
FROM quote_ticks
-- Add WHERE condition
ORDER BY ticker, tick_time ASC;`,
          solutionSql: `WITH CrossedQuotes AS (
  SELECT
    ticker,
    tick_time,
    bid_price,
    ask_price,
    ROUND(bid_price - ask_price, 4) AS crossed_spread,
    LAG(bid_price, 1) OVER (PARTITION BY ticker ORDER BY tick_time) AS prev_bid
  FROM quote_ticks
)
SELECT
  ticker,
  tick_time,
  bid_price,
  ask_price,
  crossed_spread,
  prev_bid
FROM CrossedQuotes
WHERE crossed_spread > 0
ORDER BY ticker, tick_time ASC;`,
          hints: [
            "Compute LAG(bid_price, 1) OVER (PARTITION BY ticker ORDER BY tick_time) in a CTE or subquery first.",
            "Filter for bid_price > ask_price (or crossed_spread > 0) in the outer query."
          ],
          expectedColumns: ["ticker", "tick_time", "bid_price", "ask_price", "crossed_spread", "prev_bid"],
          expectedRowCount: 3,
          bloopGreeting: "Solid work on VWAP! Now let's test market micro-structure. Spot inverted crossed quotes in our high-frequency tick stream."
        },
        {
          roundNum: 3,
          timeBudgetMinutes: 20,
          title: "Round 3: Cumulative High-Water Mark & Peak Drawdown",
          difficulty: "Staff / Advanced",
          prompt: `Citadel's risk committee monitors portfolio drawdown from the all-time peak (High-Water Mark).
          
**Requirements:**
- For each \`trading_day\` in \`portfolio_snapshots\`:
  1. Compute the cumulative \`high_water_mark\` (the maximum NAV observed up to and including the current day).
  2. Compute the current \`drawdown_pct\`:
     $$\\text{drawdown\\_pct} = \\text{ROUND}\\left(\\frac{\\text{portfolio\\_nav} - \\text{high\\_water\\_mark}}{\\text{high\\_water\\_mark}} \\times 100, 2\\right)$$
  3. Classify \`status\`:
     - If $\\text{drawdown\\_pct} = 0$, assign \`'NEW_PEAK'\`.
     - If $\\text{drawdown\\_pct} \\le -3.00$, assign \`'CRITICAL_DRAWDOWN'\`.
     - Otherwise, assign \`'NORMAL_FLUCTUATION'\`.
- Return columns: \`trading_day\`, \`portfolio_nav\`, \`high_water_mark\`, \`drawdown_pct\`, \`status\`.
- Order by \`trading_day\` ASC.`,
          starterSql: `-- Citadel Round 3: High-Water Mark & Drawdown Calculation
SELECT
  trading_day,
  portfolio_nav,
  -- Calculate high_water_mark, drawdown_pct, status
FROM portfolio_snapshots
ORDER BY trading_day ASC;`,
          solutionSql: `WITH HwmSeries AS (
  SELECT
    trading_day,
    portfolio_nav,
    MAX(portfolio_nav) OVER (
      ORDER BY trading_day 
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS high_water_mark
  FROM portfolio_snapshots
)
SELECT
  trading_day,
  portfolio_nav,
  high_water_mark,
  ROUND((portfolio_nav - high_water_mark) * 100.0 / high_water_mark, 2) AS drawdown_pct,
  CASE
    WHEN portfolio_nav = high_water_mark THEN 'NEW_PEAK'
    WHEN ((portfolio_nav - high_water_mark) * 100.0 / high_water_mark) <= -3.00 THEN 'CRITICAL_DRAWDOWN'
    ELSE 'NORMAL_FLUCTUATION'
  END AS status
FROM HwmSeries
ORDER BY trading_day ASC;`,
          hints: [
            "Use MAX(portfolio_nav) OVER (ORDER BY trading_day ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) to compute cumulative peak.",
            "Calculate drawdown_pct in a second SELECT layer or wrap in a CTE to make CASE statements clean and DRY."
          ],
          expectedColumns: ["trading_day", "portfolio_nav", "high_water_mark", "drawdown_pct", "status"],
          expectedRowCount: 7,
          bloopGreeting: "Final question! This is the exact problem we give Staff Quantitative Engineers. Show me how you compute dynamic high-water mark drawdowns."
        }
      ]
    },

    // =========================================================================
    // TRACK 2: META / INSTAGRAM (PRODUCT ANALYTICS & SOCIAL GRAPH)
    // =========================================================================
    {
      id: "track_meta",
      company: "Meta",
      role: "Senior Data Engineer (Instagram Growth & Engagement)",
      badge: "Big Tech / FAANG",
      icon: "🌐",
      difficulty: "Hard",
      timeLimitMinutes: 45,
      compensationRange: "$240,000 – $380,000",
      description: "Core engagement screen assessing active user cohorts, rolling 3-day video watch time trajectories, and mutual connection triangles.",
      interviewer: {
        name: "Chloe Zhang",
        title: "Staff Data Engineer, Growth Analytics",
        avatar: "👩‍💻"
      },
      seedSql: `
DROP TABLE IF EXISTS user_logins;
CREATE TABLE IF NOT EXISTS user_logins (
  login_id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  login_date TEXT NOT NULL
);

INSERT INTO user_logins VALUES
  (1, 101, '2026-10-10'), (2, 101, '2026-10-11'), (3, 101, '2026-10-12'),
  (4, 102, '2026-10-10'), (5, 102, '2026-10-12'),
  (6, 103, '2026-10-10'),
  (7, 104, '2026-10-11'), (8, 104, '2026-10-12'),
  (9, 105, '2026-10-12');

DROP TABLE IF EXISTS user_video_views;
CREATE TABLE IF NOT EXISTS user_video_views (
  view_id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  view_date TEXT NOT NULL,
  watch_seconds INTEGER NOT NULL
);

INSERT INTO user_video_views VALUES
  (1, 101, '2026-10-01', 300),
  (2, 101, '2026-10-02', 450),
  (3, 101, '2026-10-03', 600),
  (4, 101, '2026-10-04', 200),
  (5, 102, '2026-10-01', 120),
  (6, 102, '2026-10-02', 150),
  (7, 102, '2026-10-03', 80);

DROP TABLE IF EXISTS friendships;
CREATE TABLE IF NOT EXISTS friendships (
  user_id1 INTEGER NOT NULL,
  user_id2 INTEGER NOT NULL,
  PRIMARY KEY (user_id1, user_id2)
);

INSERT INTO friendships VALUES
  (1, 2), (2, 1),
  (2, 3), (3, 2),
  (1, 3), (3, 1), -- Triangle: 1, 2, 3
  (3, 4), (4, 3);
`,
      rounds: [
        {
          roundNum: 1,
          timeBudgetMinutes: 10,
          title: "Round 1: Daily Active Users (DAU) & User Frequency",
          difficulty: "Warmup / Medium",
          prompt: `Calculate the **Total Distinct Active Days** for each user between \`2026-10-10\` and \`2026-10-12\` from \`user_logins\`.
          
**Requirements:**
- Return: \`user_id\`, \`active_days\`, \`cohort_tier\`.
- \`cohort_tier\` rules:
  - If \`active_days = 3\`, assign \`'DAILY_POWER_USER'\`.
  - If \`active_days = 2\`, assign \`'REGULAR_USER'\`.
  - Otherwise, assign \`'OCCASIONAL_USER'\`.
- Order by \`active_days\` DESC, \`user_id\` ASC.`,
          starterSql: `-- Meta Round 1: DAU & Cohort Frequency
SELECT
  user_id,
  -- Calculate active_days and cohort_tier
FROM user_logins
GROUP BY user_id;`,
          solutionSql: `SELECT
  user_id,
  COUNT(DISTINCT login_date) AS active_days,
  CASE
    WHEN COUNT(DISTINCT login_date) = 3 THEN 'DAILY_POWER_USER'
    WHEN COUNT(DISTINCT login_date) = 2 THEN 'REGULAR_USER'
    ELSE 'OCCASIONAL_USER'
  END AS cohort_tier
FROM user_logins
GROUP BY user_id
ORDER BY active_days DESC, user_id ASC;`,
          hints: [
            "Use COUNT(DISTINCT login_date) to prevent counting multiple logins on the same day twice.",
            "Use a CASE WHEN expression evaluated against the count."
          ],
          expectedColumns: ["user_id", "active_days", "cohort_tier"],
          expectedRowCount: 5,
          bloopGreeting: "Hi! I'm Chloe from Instagram Growth. We track hundreds of millions of daily cohort transitions. Let's start with active user segmentation."
        },
        {
          roundNum: 2,
          timeBudgetMinutes: 15,
          title: "Round 2: Rolling 3-Day Video Watch Time Window",
          difficulty: "Intermediate",
          prompt: `To detect binge-watching streaks on Instagram Reels, compute a **Rolling 3-Day Moving Average** of video watch time for each user.
          
**Requirements:**
- For each record in \`user_video_views\`:
  - Compute \`rolling_3d_watch_seconds\`: the sum of \`watch_seconds\` over the current row and the preceding 2 days (up to 3 rows).
  - Compute \`rolling_avg_seconds\`: the average \`watch_seconds\` over this 3-day frame, rounded to 1 decimal place.
- Return: \`user_id\`, \`view_date\`, \`watch_seconds\`, \`rolling_3d_watch_seconds\`, \`rolling_avg_seconds\`.
- Order by \`user_id\`, \`view_date\` ASC.`,
          starterSql: `-- Meta Round 2: Rolling 3-Day Video Watch Time
SELECT
  user_id,
  view_date,
  watch_seconds,
  -- Calculate rolling window sums and averages
FROM user_video_views
ORDER BY user_id, view_date ASC;`,
          solutionSql: `SELECT
  user_id,
  view_date,
  watch_seconds,
  SUM(watch_seconds) OVER (
    PARTITION BY user_id
    ORDER BY view_date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS rolling_3d_watch_seconds,
  ROUND(AVG(watch_seconds) OVER (
    PARTITION BY user_id
    ORDER BY view_date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 1) AS rolling_avg_seconds
FROM user_video_views
ORDER BY user_id, view_date ASC;`,
          hints: [
            "Use ROWS BETWEEN 2 PRECEDING AND CURRENT ROW inside your OVER clause.",
            "Remember to PARTITION BY user_id so users' streams do not mix."
          ],
          expectedColumns: ["user_id", "view_date", "watch_seconds", "rolling_3d_watch_seconds", "rolling_avg_seconds"],
          expectedRowCount: 7,
          bloopGreeting: "Great job on the cohorts! Now let's calculate sliding window moving averages for Reels engagement."
        },
        {
          roundNum: 3,
          timeBudgetMinutes: 20,
          title: "Round 3: Mutual Connection Triangles (Social Graph)",
          difficulty: "Staff / Advanced",
          prompt: `Meta's "People You May Know" algorithm relies heavily on closed friend triangles. A mutual triangle exists between 3 distinct users $(A < B < C)$ if:
- $A$ is friends with $B$
- $B$ is friends with $C$
- $A$ is friends with $C$

**Requirements:**
- Query the bidirectional \`friendships\` table.
- Identify all unique triangles $(user_a < user_b < user_c)$.
- Return columns: \`user_a\`, \`user_b\`, \`user_c\`.
- Order by \`user_a\`, \`user_b\`, \`user_c\` ASC.`,
          starterSql: `-- Meta Round 3: Mutual Connection Triangles
SELECT
  -- Identify user_a, user_b, user_c forming a closed triangle
FROM friendships f1
-- Join to detect triangle
ORDER BY user_a, user_b, user_c;`,
          solutionSql: `SELECT
  f1.user_id1 AS user_a,
  f1.user_id2 AS user_b,
  f2.user_id2 AS user_c
FROM friendships f1
JOIN friendships f2
  ON f1.user_id2 = f2.user_id1
JOIN friendships f3
  ON f2.user_id2 = f3.user_id1
 AND f3.user_id2 = f1.user_id1
WHERE f1.user_id1 < f1.user_id2
  AND f1.user_id2 < f2.user_id2
ORDER BY user_a, user_b, user_c ASC;`,
          hints: [
            "Join friendships three times to complete the cycle: f1 (A->B), f2 (B->C), f3 (C->A).",
            "Enforce A < B AND B < C in the WHERE clause to eliminate duplicates and directional permutations."
          ],
          expectedColumns: ["user_a", "user_b", "user_c"],
          expectedRowCount: 1,
          bloopGreeting: "This is our signature graph problem. How do you find closed 3-node triangles without generating factorial Cartesian explosions?"
        }
      ]
    },

    // =========================================================================
    // TRACK 3: STRIPE (CORE LEDGERS & FINTECH PAYMENTS)
    // =========================================================================
    {
      id: "track_stripe",
      company: "Stripe",
      role: "Staff Database Engineer (Core Payments & Settlement)",
      badge: "FinTech / Payments",
      icon: "💳",
      difficulty: "Hard",
      timeLimitMinutes: 45,
      compensationRange: "$280,000 – $440,000",
      description: "Financial integrity screen testing transaction net margins, circular money-laundering rings, and running ledger discrepancies.",
      interviewer: {
        name: "Siddharth Rao",
        title: "Principal Engineer, Treasury & Settlements",
        avatar: "⚡"
      },
      seedSql: `
DROP TABLE IF EXISTS stripe_charges;
CREATE TABLE IF NOT EXISTS stripe_charges (
  charge_id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  amount_usd REAL NOT NULL,
  fee_fixed REAL NOT NULL,
  fee_variable_pct REAL NOT NULL,
  charge_status TEXT NOT NULL
);

INSERT INTO stripe_charges VALUES
  ('CH-01', 'MERCH-A', 100.00, 0.30, 0.029, 'SUCCEEDED'),
  ('CH-02', 'MERCH-A', 250.00, 0.30, 0.029, 'SUCCEEDED'),
  ('CH-03', 'MERCH-A', 50.00, 0.30, 0.029, 'REFUNDED'),
  ('CH-04', 'MERCH-B', 1200.00, 0.30, 0.029, 'SUCCEEDED'),
  ('CH-05', 'MERCH-B', 80.00, 0.30, 0.029, 'DISPUTED'),
  ('CH-06', 'MERCH-C', 5000.00, 0.30, 0.025, 'SUCCEEDED');

DROP TABLE IF EXISTS ledger_entries;
CREATE TABLE IF NOT EXISTS ledger_entries (
  entry_id INTEGER PRIMARY KEY,
  account_id TEXT NOT NULL,
  entry_type TEXT NOT NULL, -- CREDIT or DEBIT
  amount REAL NOT NULL,
  entry_timestamp TEXT NOT NULL
);

INSERT INTO ledger_entries VALUES
  (1, 'ACC-99', 'CREDIT', 1000.00, '2026-10-01 10:00:00'),
  (2, 'ACC-99', 'DEBIT', 250.00, '2026-10-01 11:30:00'),
  (3, 'ACC-99', 'DEBIT', 150.00, '2026-10-01 14:00:00'),
  (4, 'ACC-99', 'CREDIT', 500.00, '2026-10-01 18:00:00'),
  (5, 'ACC-88', 'CREDIT', 3000.00, '2026-10-01 09:00:00'),
  (6, 'ACC-88', 'DEBIT', 1200.00, '2026-10-01 12:00:00');
`,
      rounds: [
        {
          roundNum: 1,
          timeBudgetMinutes: 10,
          title: "Round 1: Payment Processing Fee & Net Merchant Payout",
          difficulty: "Warmup / Medium",
          prompt: `For all successful charges (\`charge_status = 'SUCCEEDED'\`), calculate Stripe's fee revenue and the merchant's net payout.
          
**Formulas:**
$$\\text{stripe\\_fee} = \\text{fee\\_fixed} + (\\text{amount\\_usd} \\times \\text{fee\\_variable\\_pct})$$
$$\\text{merchant\\_net} = \\text{amount\\_usd} - \\text{stripe\\_fee}$$

**Requirements:**
- Group by \`merchant_id\`.
- Return: \`merchant_id\`, \`successful_charges\`, \`gross_volume\`, \`total_fees\`, \`total_net_payout\`.
- Round \`gross_volume\`, \`total_fees\`, and \`total_net_payout\` to 2 decimal places.
- Order by \`gross_volume\` DESC.`,
          starterSql: `-- Stripe Round 1: Net Merchant Payouts & Stripe Take Rate
SELECT
  merchant_id,
  -- Calculate charges, gross_volume, total_fees, total_net_payout
FROM stripe_charges
WHERE charge_status = 'SUCCEEDED'
GROUP BY merchant_id;`,
          solutionSql: `SELECT
  merchant_id,
  COUNT(*) AS successful_charges,
  ROUND(SUM(amount_usd), 2) AS gross_volume,
  ROUND(SUM(fee_fixed + (amount_usd * fee_variable_pct)), 2) AS total_fees,
  ROUND(SUM(amount_usd - (fee_fixed + (amount_usd * fee_variable_pct))), 2) AS total_net_payout
FROM stripe_charges
WHERE charge_status = 'SUCCEEDED'
GROUP BY merchant_id
ORDER BY gross_volume DESC;`,
          hints: [
            "Filter for charge_status = 'SUCCEEDED' before grouping.",
            "Use ROUND(..., 2) on all monetary aggregations."
          ],
          expectedColumns: ["merchant_id", "successful_charges", "gross_volume", "total_fees", "total_net_payout"],
          expectedRowCount: 3,
          bloopGreeting: "Welcome to Stripe! At our scale, fractional cent rounding errors can cost millions. Let's calculate fee take rates and merchant settlement balances."
        },
        {
          roundNum: 2,
          timeBudgetMinutes: 15,
          title: "Round 2: Running Balance Double-Entry Ledger",
          difficulty: "Intermediate",
          prompt: `In Stripe's core ledger, every account has credits and debits. Compute a **Cumulative Running Balance** for each account chronologically.
          
**Rules:**
- A \`'CREDIT'\` increases the balance ($+\\text{amount}$).
- A \`'DEBIT'\` decreases the balance ($-\\text{amount}$).

**Requirements:**
- Return: \`entry_id\`, \`account_id\`, \`entry_timestamp\`, \`entry_type\`, \`amount\`, \`running_balance\`.
- \`running_balance\` must be computed using an analytical window function partitioned by \`account_id\` and ordered by \`entry_timestamp\` ASC.
- Order result by \`account_id\`, \`entry_timestamp\` ASC.`,
          starterSql: `-- Stripe Round 2: Cumulative Running Ledger Balance
SELECT
  entry_id,
  account_id,
  entry_timestamp,
  entry_type,
  amount,
  -- Compute running balance
FROM ledger_entries
ORDER BY account_id, entry_timestamp ASC;`,
          solutionSql: `SELECT
  entry_id,
  account_id,
  entry_timestamp,
  entry_type,
  amount,
  SUM(
    CASE 
      WHEN entry_type = 'CREDIT' THEN amount 
      ELSE -amount 
    END
  ) OVER (
    PARTITION BY account_id
    ORDER BY entry_timestamp
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_balance
FROM ledger_entries
ORDER BY account_id, entry_timestamp ASC;`,
          hints: [
            "Use a CASE WHEN inside SUM() to make credits positive and debits negative.",
            "Order by entry_timestamp with ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW."
          ],
          expectedColumns: ["entry_id", "account_id", "entry_timestamp", "entry_type", "amount", "running_balance"],
          expectedRowCount: 6,
          bloopGreeting: "Clean fee calculation! Now for Stripe's backbone: the immutable double-entry ledger. Build the running balance vector."
        },
        {
          roundNum: 3,
          timeBudgetMinutes: 20,
          title: "Round 3: High-Risk Chargeback Rate & Merchant Freeze Trigger",
          difficulty: "Staff / Advanced",
          prompt: `Stripe's Risk team automatically freezes merchants whose chargeback volume exceeds 1.0% of their total gross volume.
          
**Requirements:**
- Query \`stripe_charges\` across ALL merchants.
- Calculate:
  - \`total_charges_count\`: count of all charges.
  - \`total_gross_volume\`: sum of all \`amount_usd\`.
  - \`chargeback_volume\`: sum of \`amount_usd\` for charges with \`charge_status = 'DISPUTED'\` (use 0 if none).
  - \`chargeback_pct\`: $\\text{ROUND}\\left(\\frac{\\text{chargeback\\_volume}}{\\text{total\\_gross\\_volume}} \\times 100, 2\\right)$.
  - \`risk_verdict\`:
    - If $\\text{chargeback\\_pct} \\ge 1.00$, assign \`'FREEZE_PAYOUTS'\`.
    - Otherwise, assign \`'HEALTHY'\`.
- Return: \`merchant_id\`, \`total_gross_volume\`, \`chargeback_volume\`, \`chargeback_pct\`, \`risk_verdict\`.
- Order by \`chargeback_pct\` DESC.`,
          starterSql: `-- Stripe Round 3: Merchant Risk & Payout Freeze Trigger
SELECT
  merchant_id,
  -- Calculate volumes, chargeback rate, and risk verdict
FROM stripe_charges
GROUP BY merchant_id;`,
          solutionSql: `SELECT
  merchant_id,
  ROUND(SUM(amount_usd), 2) AS total_gross_volume,
  ROUND(SUM(CASE WHEN charge_status = 'DISPUTED' THEN amount_usd ELSE 0 END), 2) AS chargeback_volume,
  ROUND(
    SUM(CASE WHEN charge_status = 'DISPUTED' THEN amount_usd ELSE 0 END) * 100.0 / 
    NULLIF(SUM(amount_usd), 0), 2
  ) AS chargeback_pct,
  CASE
    WHEN (SUM(CASE WHEN charge_status = 'DISPUTED' THEN amount_usd ELSE 0 END) * 100.0 / NULLIF(SUM(amount_usd), 0)) >= 1.00 
    THEN 'FREEZE_PAYOUTS'
    ELSE 'HEALTHY'
  END AS risk_verdict
FROM stripe_charges
GROUP BY merchant_id
ORDER BY chargeback_pct DESC;`,
          hints: [
            "Use conditional aggregation SUM(CASE WHEN charge_status = 'DISPUTED' THEN amount_usd ELSE 0 END).",
            "Use NULLIF(SUM(amount_usd), 0) to safeguard against division by zero."
          ],
          expectedColumns: ["merchant_id", "total_gross_volume", "chargeback_volume", "chargeback_pct", "risk_verdict"],
          expectedRowCount: 3,
          bloopGreeting: "Final question for the Staff level! Design Stripe's automated risk trigger to catch card fraud and freeze high-risk merchants."
        }
      ]
    },
    // =========================================================================
    // TRACK 4: NETFLIX (STREAMING MEDIA & CONTENT ALGORITHMS)
    // =========================================================================
    {
      id: "track_netflix",
      company: "Netflix",
      role: "Senior Streaming & Personalization Data Engineer",
      badge: "FAANG / Media",
      icon: "🍿",
      difficulty: "Medium – Hard",
      timeLimitMinutes: 45,
      compensationRange: "$320,000 – $480,000",
      description: "Personalization and telemetry screen: evaluate completion funnels, sessionize continuous binge viewing via Islands & Gaps, and forecast 30-day subscriber churn risk.",
      interviewer: {
        name: "Elena Rostova",
        title: "Principal Streaming Architect",
        avatar: "🎬"
      },
      seedSql: `
DROP TABLE IF EXISTS netflix_streams;
CREATE TABLE netflix_streams (
  stream_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title_id TEXT NOT NULL,
  title_name TEXT NOT NULL,
  content_type TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  watched_seconds INTEGER NOT NULL,
  stream_date TEXT NOT NULL,
  country TEXT NOT NULL
);

INSERT INTO netflix_streams VALUES
  ('S-01', 'U-101', 'T-501', 'Stranger Things S5', 'SERIES', 3600, 3550, '2026-10-10 19:00:00', 'USA'),
  ('S-02', 'U-101', 'T-502', 'Stranger Things S5', 'SERIES', 3600, 3600, '2026-10-10 20:05:00', 'USA'),
  ('S-03', 'U-101', 'T-503', 'Stranger Things S5', 'SERIES', 3600, 3400, '2026-10-10 21:10:00', 'USA'),
  ('S-04', 'U-102', 'T-501', 'Stranger Things S5', 'SERIES', 3600, 250, '2026-10-10 19:30:00', 'GBR'),
  ('S-05', 'U-103', 'T-701', 'Glass Onion 2', 'MOVIE', 7200, 7100, '2026-10-11 20:00:00', 'USA'),
  ('S-06', 'U-104', 'T-701', 'Glass Onion 2', 'MOVIE', 7200, 900, '2026-10-11 21:00:00', 'CAN'),
  ('S-07', 'U-105', 'T-701', 'Glass Onion 2', 'MOVIE', 7200, 45, '2026-10-11 22:00:00', 'USA'),
  ('S-08', 'U-106', 'T-801', 'Chef Table France', 'SERIES', 2400, 2300, '2026-10-12 18:00:00', 'FRA'),
  ('S-09', 'U-107', 'T-801', 'Chef Table France', 'SERIES', 2400, 2200, '2026-10-12 19:00:00', 'FRA');

DROP TABLE IF EXISTS netflix_user_history;
CREATE TABLE netflix_user_history (
  history_id INTEGER PRIMARY KEY,
  user_id TEXT NOT NULL,
  event_time TEXT NOT NULL,
  title_name TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL
);

INSERT INTO netflix_user_history VALUES
  (1, 'U-201', '2026-10-12 18:00:00', 'Black Mirror Ep 1', 60),
  (2, 'U-201', '2026-10-12 19:05:00', 'Black Mirror Ep 2', 60),
  (3, 'U-201', '2026-10-12 20:15:00', 'Black Mirror Ep 3', 55),
  (4, 'U-201', '2026-10-12 23:45:00', 'The Crown Ep 1', 60),
  (5, 'U-202', '2026-10-12 14:00:00', 'Wednesday Ep 1', 50),
  (6, 'U-202', '2026-10-12 17:30:00', 'Wednesday Ep 2', 50);

DROP TABLE IF EXISTS netflix_subscribers;
CREATE TABLE netflix_subscribers (
  user_id TEXT PRIMARY KEY,
  tier TEXT NOT NULL,
  recent_7d_hours REAL NOT NULL,
  prior_21d_hours REAL NOT NULL
);

INSERT INTO netflix_subscribers VALUES
  ('U-301', 'PREMIUM', 4.0, 36.0),
  ('U-302', 'STANDARD', 18.0, 20.0),
  ('U-303', 'STANDARD', 2.5, 24.0),
  ('U-304', 'PREMIUM', 22.0, 25.0),
  ('U-305', 'BASIC', 0.5, 12.0);
`,
      rounds: [
        {
          roundNum: 1,
          timeBudgetMinutes: 10,
          title: "Round 1: Video Completion Rate & Abandonment Ratio",
          difficulty: "Warmup",
          prompt: `In Netflix's content evaluation platform, raw view counts are misleading without completion telemetry.
          
**Requirements:**
- Query \`netflix_streams\`.
- Filter out accidental preview clicks where \`watched_seconds < 60\`.
- For each \`title_name\` and \`content_type\`, compute:
  - \`total_streams\`: Total valid playback sessions.
  - \`avg_completion_pct\`: Average percentage of title watched: \`ROUND(AVG(watched_seconds * 100.0 / NULLIF(duration_seconds, 0)), 1)\`.
  - \`abandonment_rate_pct\`: Percentage of valid streams abandoned early (\`watched_seconds < 0.2 * duration_seconds\`), rounded to 1 decimal place.
- Return: \`title_name\`, \`content_type\`, \`total_streams\`, \`avg_completion_pct\`, \`abandonment_rate_pct\`.
- Order by \`total_streams\` DESC, \`avg_completion_pct\` DESC.`,
          starterSql: `-- Netflix Round 1: Video Completion & Abandonment Ratio
SELECT
  title_name,
  content_type,
  -- Calculate stream counts, avg completion %, and early abandonment %
FROM netflix_streams
WHERE watched_seconds >= 60
GROUP BY title_name, content_type
ORDER BY total_streams DESC;`,
          solutionSql: `SELECT
  title_name,
  content_type,
  COUNT(*) AS total_streams,
  ROUND(AVG(watched_seconds * 100.0 / NULLIF(duration_seconds, 0)), 1) AS avg_completion_pct,
  ROUND(SUM(CASE WHEN watched_seconds < (0.2 * duration_seconds) THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(*), 1) AS abandonment_rate_pct
FROM netflix_streams
WHERE watched_seconds >= 60
GROUP BY title_name, content_type
ORDER BY total_streams DESC, avg_completion_pct DESC;`,
          hints: [
            "Filter for watched_seconds >= 60 in the WHERE clause.",
            "Use NULLIF(duration_seconds, 0) inside AVG() to protect against zero division.",
            "Calculate abandonment rate using SUM(CASE WHEN watched_seconds < 0.2 * duration_seconds THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(*)."
          ],
          expectedColumns: ["title_name", "content_type", "total_streams", "avg_completion_pct", "abandonment_rate_pct"],
          expectedRowCount: 3,
          bloopGreeting: "Welcome to Netflix! We care intensely about engagement depth. Let's calculate completion funnels and early drop-off ratios."
        },
        {
          roundNum: 2,
          timeBudgetMinutes: 15,
          title: "Round 2: Binge-Watching Sessionization (Islands & Gaps)",
          difficulty: "Intermediate",
          prompt: `Netflix defines a **Binge-Watching Session** as a continuous sequence of video plays by a user where the gap between the end of one stream and the start of the next stream does NOT exceed 30 minutes.

**Rules:**
- If the idle pause between previous stream end and next stream start is > 30 minutes, a **new session** begins.
- The first stream for any user always starts session \`1\`.

**Requirements:**
- Query \`netflix_user_history\`.
- Detect session boundaries using \`LAG()\` and assign a sequential integer \`session_id\` per user using cumulative summing.
- Aggregate at the \`(user_id, session_id)\` level and return:
  - \`user_id\`, \`session_id\`, \`titles_watched\`, \`total_watch_minutes\`, \`session_start\`, \`session_end\`.
- Order by \`user_id\` ASC, \`session_id\` ASC.`,
          starterSql: `-- Netflix Round 2: Binge Sessionization (Islands & Gaps)
WITH stream_lags AS (
  SELECT
    user_id,
    event_time,
    title_name,
    duration_minutes,
    -- Compute prior stream end time
  FROM netflix_user_history
)
-- Build session markers and cumulative session_id
SELECT * FROM stream_lags;`,
          solutionSql: `WITH stream_lags AS (
  SELECT
    user_id,
    event_time,
    title_name,
    duration_minutes,
    LAG(event_time) OVER (PARTITION BY user_id ORDER BY event_time) AS prev_event_time,
    LAG(duration_minutes) OVER (PARTITION BY user_id ORDER BY event_time) AS prev_duration
  FROM netflix_user_history
),
session_markers AS (
  SELECT
    user_id,
    event_time,
    title_name,
    duration_minutes,
    CASE
      WHEN prev_event_time IS NULL THEN 1
      WHEN (strftime('%s', event_time) - (strftime('%s', prev_event_time) + (prev_duration * 60))) > (30 * 60) THEN 1
      ELSE 0
    END AS is_new_session
  FROM stream_lags
),
session_grouped AS (
  SELECT
    user_id,
    event_time,
    title_name,
    duration_minutes,
    SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY event_time) AS session_id
  FROM session_markers
)
SELECT
  user_id,
  session_id,
  COUNT(*) AS titles_watched,
  SUM(duration_minutes) AS total_watch_minutes,
  MIN(event_time) AS session_start,
  MAX(event_time) AS session_end
FROM session_grouped
GROUP BY user_id, session_id
ORDER BY user_id, session_id;`,
          hints: [
            "Use LAG(event_time) and LAG(duration_minutes) to determine when the prior stream finished.",
            "Compute idle gap in seconds: strftime('%s', event_time) - (strftime('%s', prev_event_time) + prev_duration * 60).",
            "Assign session_id with SUM(is_new_session) OVER (PARTITION BY user_id ORDER BY event_time)."
          ],
          expectedColumns: ["user_id", "session_id", "titles_watched", "total_watch_minutes", "session_start", "session_end"],
          expectedRowCount: 4,
          bloopGreeting: "Superb warmup! Now for a classic FAANG favorite: the Islands & Gaps sessionization pattern. Group consecutive streams into single binge sessions."
        },
        {
          roundNum: 3,
          timeBudgetMinutes: 20,
          title: "Round 3: 30-Day Churn Leading Indicator & Cohort Risk",
          difficulty: "Staff / Advanced",
          prompt: `Predicting subscriber cancellation before it occurs is critical for Netflix retention teams. An early warning metric is **Viewing Velocity Decay**.
          
**Requirements:**
- Query \`netflix_subscribers\`.
- \`recent_7d_hours\` is the total hours viewed over the last 7 days.
- \`prior_21d_hours\` is the total hours viewed in the preceding 3 weeks (21 days).
- Compute:
  - \`baseline_weekly_hours\`: Average weekly consumption across the prior 21 days: \`ROUND(prior_21d_hours / 3.0, 1)\`.
  - \`velocity_pct_change\`: Percentage shift in weekly consumption:
    $$\\text{ROUND}\\left(\\frac{\\text{recent\\_7d\\_hours} - \\text{baseline\\_weekly\\_hours}}{\\text{baseline\\_weekly\\_hours}} \\times 100, 1\\right)$$
  - \`risk_tier\`:
    - If velocity dropped by $\\ge 50\\%$ (\`velocity_pct_change <= -50.0\`), assign \`'CRITICAL_CHURN_RISK'\`.
    - If velocity dropped between $0\\%$ and $50\\%$, assign \`'DECLINING'\`.
    - Otherwise, assign \`'HEALTHY'\`.
- Return: \`user_id\`, \`tier\`, \`recent_7d_hours\`, \`baseline_weekly_hours\`, \`velocity_pct_change\`, \`risk_tier\`.
- Order by \`velocity_pct_change\` ASC (highest risk first).`,
          starterSql: `-- Netflix Round 3: Churn Velocity & Account Risk Scoring
SELECT
  user_id,
  tier,
  recent_7d_hours,
  -- Calculate weekly baseline, velocity % delta, and risk classification
FROM netflix_subscribers
ORDER BY user_id;`,
          solutionSql: `SELECT
  user_id,
  tier,
  recent_7d_hours,
  ROUND(prior_21d_hours / 3.0, 1) AS baseline_weekly_hours,
  ROUND(
    ((recent_7d_hours - (prior_21d_hours / 3.0)) / NULLIF(prior_21d_hours / 3.0, 0)) * 100.0,
    1
  ) AS velocity_pct_change,
  CASE
    WHEN ((recent_7d_hours - (prior_21d_hours / 3.0)) / NULLIF(prior_21d_hours / 3.0, 0)) <= -0.50 THEN 'CRITICAL_CHURN_RISK'
    WHEN ((recent_7d_hours - (prior_21d_hours / 3.0)) / NULLIF(prior_21d_hours / 3.0, 0)) < 0.0 THEN 'DECLINING'
    ELSE 'HEALTHY'
  END AS risk_tier
FROM netflix_subscribers
ORDER BY velocity_pct_change ASC;`,
          hints: [
            "Divide prior_21d_hours by 3.0 to normalize to a 7-day weekly baseline.",
            "Use NULLIF(prior_21d_hours / 3.0, 0) to prevent division by zero.",
            "Evaluate risk_tier with CASE WHEN percentage drop is <= -50.0."
          ],
          expectedColumns: ["user_id", "tier", "recent_7d_hours", "baseline_weekly_hours", "velocity_pct_change", "risk_tier"],
          expectedRowCount: 5,
          bloopGreeting: "Final question for the Staff level! Build the analytical churn leading indicator that alerts growth teams before users click cancel."
        }
      ]
    },

    // =========================================================================
    // TRACK 5: UBER / DOORDASH (LOGISTICS & MARKETPLACE DISPATCH)
    // =========================================================================
    {
      id: "track_uber",
      company: "Uber / DoorDash",
      role: "Staff Logistics & Marketplace Algorithms Engineer",
      badge: "Marketplace / Logistics",
      icon: "🚗",
      difficulty: "Hard",
      timeLimitMinutes: 45,
      compensationRange: "$340,000 – $490,000",
      description: "High-throughput marketplace dispatch screen: evaluate zone delivery SLAs, compute 15-minute rolling surge multipliers, and analyze driver shift deadhead transit ratios.",
      interviewer: {
        name: "Darius Thorne",
        title: "Staff Marketplace Optimization Engineer",
        avatar: "🗺️"
      },
      seedSql: `
DROP TABLE IF EXISTS uber_deliveries;
CREATE TABLE uber_deliveries (
  delivery_id TEXT PRIMARY KEY,
  zone_id TEXT NOT NULL,
  zone_name TEXT NOT NULL,
  order_time TEXT NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  actual_minutes INTEGER NOT NULL,
  delivery_status TEXT NOT NULL
);

INSERT INTO uber_deliveries VALUES
  ('D-001', 'Z-MAN', 'Manhattan Core', '2026-10-15 18:00:00', 30, 28, 'COMPLETED'),
  ('D-002', 'Z-MAN', 'Manhattan Core', '2026-10-15 18:05:00', 35, 42, 'COMPLETED'),
  ('D-003', 'Z-MAN', 'Manhattan Core', '2026-10-15 18:10:00', 25, 24, 'COMPLETED'),
  ('D-004', 'Z-MAN', 'Manhattan Core', '2026-10-15 18:15:00', 40, 55, 'COMPLETED'),
  ('D-005', 'Z-BK', 'Brooklyn North', '2026-10-15 18:02:00', 30, 48, 'COMPLETED'),
  ('D-006', 'Z-BK', 'Brooklyn North', '2026-10-15 18:12:00', 30, 45, 'COMPLETED'),
  ('D-007', 'Z-BK', 'Brooklyn North', '2026-10-15 18:20:00', 30, 32, 'COMPLETED'),
  ('D-008', 'Z-QNS', 'Queens West', '2026-10-15 18:00:00', 25, 23, 'COMPLETED'),
  ('D-009', 'Z-QNS', 'Queens West', '2026-10-15 18:30:00', 25, 26, 'COMPLETED');

DROP TABLE IF EXISTS uber_zone_snapshots;
CREATE TABLE uber_zone_snapshots (
  snapshot_id INTEGER PRIMARY KEY,
  zone_name TEXT NOT NULL,
  snapshot_time TEXT NOT NULL,
  ride_requests INTEGER NOT NULL,
  available_drivers INTEGER NOT NULL
);

INSERT INTO uber_zone_snapshots VALUES
  (1, 'Downtown Financial', '2026-10-15 17:00:00', 120, 100),
  (2, 'Downtown Financial', '2026-10-15 17:15:00', 180, 90),
  (3, 'Downtown Financial', '2026-10-15 17:30:00', 250, 80),
  (4, 'Airport JFK', '2026-10-15 17:00:00', 200, 180),
  (5, 'Airport JFK', '2026-10-15 17:15:00', 320, 120),
  (6, 'Airport JFK', '2026-10-15 17:30:00', 400, 100),
  (7, 'Suburbs North', '2026-10-15 17:00:00', 30, 50),
  (8, 'Suburbs North', '2026-10-15 17:15:00', 35, 45);

DROP TABLE IF EXISTS uber_driver_shifts;
CREATE TABLE uber_driver_shifts (
  trip_id TEXT PRIMARY KEY,
  driver_id TEXT NOT NULL,
  pickup_time TEXT NOT NULL,
  dropoff_time TEXT NOT NULL,
  paid_miles REAL NOT NULL,
  pickup_deadhead_miles REAL NOT NULL
);

INSERT INTO uber_driver_shifts VALUES
  ('TR-101', 'DRV-1', '2026-10-15 08:00:00', '2026-10-15 08:25:00', 8.5, 2.0),
  ('TR-102', 'DRV-1', '2026-10-15 08:40:00', '2026-10-15 09:10:00', 12.0, 3.5),
  ('TR-103', 'DRV-1', '2026-10-15 09:25:00', '2026-10-15 10:00:00', 14.5, 1.5),
  ('TR-201', 'DRV-2', '2026-10-15 08:15:00', '2026-10-15 08:45:00', 6.0, 4.0),
  ('TR-202', 'DRV-2', '2026-10-15 09:30:00', '2026-10-15 10:15:00', 9.0, 6.5);
`,
      rounds: [
        {
          roundNum: 1,
          timeBudgetMinutes: 10,
          title: "Round 1: Delivery SLA Breach Rate & Zone Performance",
          difficulty: "Warmup",
          prompt: `In Uber Eats / DoorDash dispatch, delivery latency directly causes customer churn and cold food refunds.
          
**Requirements:**
- Query \`uber_deliveries\`.
- A delivery breaches SLA if \`actual_minutes > estimated_minutes\`.
- For each \`zone_name\`, calculate:
  - \`total_deliveries\`: Total delivery count.
  - \`breached_sla_count\`: Number of late deliveries.
  - \`breach_rate_pct\`: Percentage of deliveries that breached SLA, rounded to 1 decimal place.
  - \`avg_delay_minutes\`: Average overrun (\`actual_minutes - estimated_minutes\`) across all deliveries in that zone, rounded to 1 decimal place.
- Return: \`zone_name\`, \`total_deliveries\`, \`breached_sla_count\`, \`breach_rate_pct\`, \`avg_delay_minutes\`.
- Order by \`breach_rate_pct\` DESC, \`total_deliveries\` DESC.`,
          starterSql: `-- Uber Round 1: Zone SLA Breach Analysis
SELECT
  zone_name,
  -- Compute delivery totals, late counts, breach %, and average delay
FROM uber_deliveries
GROUP BY zone_name
ORDER BY breach_rate_pct DESC;`,
          solutionSql: `SELECT
  zone_name,
  COUNT(*) AS total_deliveries,
  SUM(CASE WHEN actual_minutes > estimated_minutes THEN 1 ELSE 0 END) AS breached_sla_count,
  ROUND(
    SUM(CASE WHEN actual_minutes > estimated_minutes THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(*),
    1
  ) AS breach_rate_pct,
  ROUND(AVG(actual_minutes - estimated_minutes), 1) AS avg_delay_minutes
FROM uber_deliveries
GROUP BY zone_name
ORDER BY breach_rate_pct DESC, total_deliveries DESC;`,
          hints: [
            "Use CASE WHEN actual_minutes > estimated_minutes THEN 1 ELSE 0 END to count breaches.",
            "Multiply by 100.0 for floating point percentage division before ROUND(..., 1).",
            "Calculate average delay with AVG(actual_minutes - estimated_minutes)."
          ],
          expectedColumns: ["zone_name", "total_deliveries", "breached_sla_count", "breach_rate_pct", "avg_delay_minutes"],
          expectedRowCount: 3,
          bloopGreeting: "Welcome to Uber! In real-time logistics, every minute of latency matters. Let's calculate zone SLA compliance and delivery overruns."
        },
        {
          roundNum: 2,
          timeBudgetMinutes: 15,
          title: "Round 2: 15-Minute Dynamic Surge Pricing Multiplier",
          difficulty: "Intermediate",
          prompt: `Uber balances supply and demand dynamically by adjusting pricing multipliers based on unfulfilled trip requests versus available nearby drivers.

**Surge Rules:**
$$\\text{demand\\_supply\\_ratio} = \\frac{\\text{ride\\_requests}}{\\text{available\\_drivers}}$$
- If $\\text{ratio} \\ge 3.0$, surge multiplier is \`2.5\`.
- If $\\text{ratio} \\ge 2.0$, surge multiplier is \`2.0\`.
- If $\\text{ratio} \\ge 1.5$, surge multiplier is \`1.5\`.
- Otherwise, surge multiplier is \`1.0\` (base rate).

**Requirements:**
- Query \`uber_zone_snapshots\`.
- Calculate \`demand_supply_ratio\` rounded to 2 decimal places.
- Determine the \`surge_multiplier\`.
- Return: \`zone_name\`, \`snapshot_time\`, \`ride_requests\`, \`available_drivers\`, \`demand_supply_ratio\`, \`surge_multiplier\`.
- Order by \`demand_supply_ratio\` DESC.`,
          starterSql: `-- Uber Round 2: Dynamic Surge Pricing Engine
SELECT
  zone_name,
  snapshot_time,
  ride_requests,
  available_drivers,
  -- Calculate ratio and assign surge tier
FROM uber_zone_snapshots
ORDER BY demand_supply_ratio DESC;`,
          solutionSql: `SELECT
  zone_name,
  snapshot_time,
  ride_requests,
  available_drivers,
  ROUND(ride_requests * 1.0 / NULLIF(available_drivers, 0), 2) AS demand_supply_ratio,
  CASE
    WHEN (ride_requests * 1.0 / NULLIF(available_drivers, 0)) >= 3.0 THEN 2.5
    WHEN (ride_requests * 1.0 / NULLIF(available_drivers, 0)) >= 2.0 THEN 2.0
    WHEN (ride_requests * 1.0 / NULLIF(available_drivers, 0)) >= 1.5 THEN 1.5
    ELSE 1.0
  END AS surge_multiplier
FROM uber_zone_snapshots
ORDER BY demand_supply_ratio DESC;`,
          hints: [
            "Use NULLIF(available_drivers, 0) to guard against division by zero in empty zones.",
            "Round demand_supply_ratio to 2 decimal places.",
            "Use CASE WHEN with descending thresholds (>= 3.0, >= 2.0, >= 1.5)."
          ],
          expectedColumns: ["zone_name", "snapshot_time", "ride_requests", "available_drivers", "demand_supply_ratio", "surge_multiplier"],
          expectedRowCount: 8,
          bloopGreeting: "Great work on SLAs! Now let's implement Uber's signature mechanism: real-time algorithmic surge pricing based on local supply/demand density."
        },
        {
          roundNum: 3,
          timeBudgetMinutes: 20,
          title: "Round 3: Driver Deadhead Mileage vs Paid Trip Efficiency",
          difficulty: "Staff / Advanced",
          prompt: `Driver retention and unit economics depend heavily on minimizing "deadhead" miles—unpaid distance spent driving to pick up a passenger versus actual paid trip miles.

**Requirements:**
- Query \`uber_driver_shifts\`.
- For each \`driver_id\`, calculate:
  - \`completed_trips\`: Count of trips completed.
  - \`total_paid_miles\`: Sum of \`paid_miles\`, rounded to 1 decimal place.
  - \`total_deadhead_miles\`: Sum of \`pickup_deadhead_miles\`, rounded to 1 decimal place.
  - \`total_shift_miles\`: Sum of \`paid_miles + pickup_deadhead_miles\`, rounded to 1 decimal place.
  - \`paid_efficiency_pct\`: Percentage of total driven miles that were revenue-generating:
    $$\\text{ROUND}\\left(\\frac{\\text{total\\_paid\\_miles}}{\\text{total\\_shift\\_miles}} \\times 100, 1\\right)$$
- Return: \`driver_id\`, \`completed_trips\`, \`total_paid_miles\`, \`total_deadhead_miles\`, \`total_shift_miles\`, \`paid_efficiency_pct\`.
- Order by \`paid_efficiency_pct\` DESC.`,
          starterSql: `-- Uber Round 3: Driver Deadhead Mileage & Shift Efficiency
SELECT
  driver_id,
  -- Calculate paid vs deadhead miles and overall driver efficiency ratio
FROM uber_driver_shifts
GROUP BY driver_id;`,
          solutionSql: `SELECT
  driver_id,
  COUNT(*) AS completed_trips,
  ROUND(SUM(paid_miles), 1) AS total_paid_miles,
  ROUND(SUM(pickup_deadhead_miles), 1) AS total_deadhead_miles,
  ROUND(SUM(paid_miles + pickup_deadhead_miles), 1) AS total_shift_miles,
  ROUND(
    (SUM(paid_miles) * 100.0) / NULLIF(SUM(paid_miles + pickup_deadhead_miles), 0),
    1
  ) AS paid_efficiency_pct
FROM uber_driver_shifts
GROUP BY driver_id
ORDER BY paid_efficiency_pct DESC;`,
          hints: [
            "Sum both paid_miles and pickup_deadhead_miles per driver.",
            "Calculate efficiency ratio as (SUM(paid_miles) * 100.0) / NULLIF(SUM(paid_miles + pickup_deadhead_miles), 0).",
            "Round all mile aggregates to 1 decimal place."
          ],
          expectedColumns: ["driver_id", "completed_trips", "total_paid_miles", "total_deadhead_miles", "total_shift_miles", "paid_efficiency_pct"],
          expectedRowCount: 2,
          bloopGreeting: "Final question for the Staff level! Optimize marketplace driver economics by analyzing unpaid deadhead miles vs revenue-generating passenger trips."
        }
      ]
    },

    // =========================================================================
    // TRACK 6: GOOGLE / YOUTUBE (ADTECH & AUCTION CLEARING)
    // =========================================================================
    {
      id: "track_google",
      company: "Google / YouTube",
      role: "Staff Ads Infrastructure & Auction Systems Engineer",
      badge: "FAANG / AdTech",
      icon: "🔍",
      difficulty: "Hard",
      timeLimitMinutes: 45,
      compensationRange: "$360,000 – $510,000",
      description: "Search auction and click-stream telemetry screen: evaluate advertiser eCPM, clear live Generalized Second-Price (GSP) ad auctions, and detect automated click fraud bursts.",
      interviewer: {
        name: "Dr. Sanjay Patel",
        title: "Distinguished Search Ads Architect",
        avatar: "🔬"
      },
      seedSql: `
DROP TABLE IF EXISTS google_ad_campaigns;
CREATE TABLE google_ad_campaigns (
  campaign_id TEXT PRIMARY KEY,
  advertiser_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  impressions INTEGER NOT NULL,
  clicks INTEGER NOT NULL,
  spend_usd REAL NOT NULL
);

INSERT INTO google_ad_campaigns VALUES
  ('CMP-01', 'Nike Athletic', 'Retail', 150000, 3200, 4800.00),
  ('CMP-02', 'Adidas Running', 'Retail', 120000, 2400, 3120.00),
  ('CMP-03', 'Geico Direct', 'Insurance', 80000, 4100, 16400.00),
  ('CMP-04', 'Progressive Auto', 'Insurance', 95000, 4600, 20700.00),
  ('CMP-05', 'Shopify Growth', 'SaaS', 200000, 5000, 12500.00);

DROP TABLE IF EXISTS google_ad_auctions;
CREATE TABLE google_ad_auctions (
  auction_id TEXT NOT NULL,
  keyword TEXT NOT NULL,
  advertiser_name TEXT NOT NULL,
  bid_amount REAL NOT NULL,
  quality_score INTEGER NOT NULL
);

INSERT INTO google_ad_auctions VALUES
  ('AUC-101', 'best running shoes', 'Nike Athletic', 2.50, 9),
  ('AUC-101', 'best running shoes', 'Adidas Running', 3.00, 7),
  ('AUC-101', 'best running shoes', 'Puma Speed', 2.00, 6),
  ('AUC-101', 'best running shoes', 'Generic Shoe Store', 3.50, 4),
  ('AUC-102', 'car insurance quote', 'Geico Direct', 15.00, 9),
  ('AUC-102', 'car insurance quote', 'Progressive Auto', 16.00, 8),
  ('AUC-102', 'car insurance quote', 'State Farm Agent', 14.00, 8);

DROP TABLE IF EXISTS google_ad_clicks;
CREATE TABLE google_ad_clicks (
  click_id INTEGER PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  user_ip TEXT NOT NULL,
  click_time TEXT NOT NULL
);

INSERT INTO google_ad_clicks VALUES
  (1, 'CMP-01', '192.168.1.50', '2026-10-15 12:00:01'),
  (2, 'CMP-01', '192.168.1.50', '2026-10-15 12:00:03'),
  (3, 'CMP-01', '192.168.1.50', '2026-10-15 12:00:05'),
  (4, 'CMP-01', '192.168.1.50', '2026-10-15 12:00:07'),
  (5, 'CMP-01', '192.168.1.50', '2026-10-15 12:00:09'),
  (6, 'CMP-01', '10.0.0.99', '2026-10-15 12:00:02'),
  (7, 'CMP-02', '172.16.0.4', '2026-10-15 12:01:00'),
  (8, 'CMP-03', '8.8.8.8', '2026-10-15 12:02:00');
`,
      rounds: [
        {
          roundNum: 1,
          timeBudgetMinutes: 10,
          title: "Round 1: Advertiser Effective CPM & Cost Efficiency",
          difficulty: "Warmup",
          prompt: `In Google AdSense and YouTube Ads, monetization performance is compared across advertisers via Cost-Per-Mille (eCPM) and Click-Through-Rate (CTR).

**Formulas:**
$$\\text{ctr\\_pct} = \\frac{\\text{clicks}}{\\text{impressions}} \\times 100$$
$$\\text{ecpm\\_usd} = \\frac{\\text{spend\\_usd}}{\\text{impressions}} \\times 1000$$
$$\\text{cpc\\_usd} = \\frac{\\text{spend\\_usd}}{\\text{clicks}}$$

**Requirements:**
- Query \`google_ad_campaigns\`.
- Compute \`ctr_pct\` (rounded to 2 decimals), \`ecpm_usd\` (rounded to 2 decimals), and \`cpc_usd\` (rounded to 2 decimals).
- Return: \`industry\`, \`advertiser_name\`, \`impressions\`, \`clicks\`, \`ctr_pct\`, \`ecpm_usd\`, \`cpc_usd\`.
- Order by \`ecpm_usd\` DESC.`,
          starterSql: `-- Google Round 1: Advertiser Ad Monetization Metrics
SELECT
  industry,
  advertiser_name,
  impressions,
  clicks,
  -- Compute CTR %, eCPM ($ per 1,000 impressions), and average CPC
FROM google_ad_campaigns
ORDER BY spend_usd DESC;`,
          solutionSql: `SELECT
  industry,
  advertiser_name,
  impressions,
  clicks,
  ROUND((clicks * 100.0) / NULLIF(impressions, 0), 2) AS ctr_pct,
  ROUND((spend_usd * 1000.0) / NULLIF(impressions, 0), 2) AS ecpm_usd,
  ROUND(spend_usd / NULLIF(clicks, 0), 2) AS cpc_usd
FROM google_ad_campaigns
ORDER BY ecpm_usd DESC;`,
          hints: [
            "Use NULLIF(impressions, 0) and NULLIF(clicks, 0) to prevent divide-by-zero errors.",
            "eCPM formula is (spend_usd * 1000.0) / impressions.",
            "Round all monetary and percentage results to 2 decimal places."
          ],
          expectedColumns: ["industry", "advertiser_name", "impressions", "clicks", "ctr_pct", "ecpm_usd", "cpc_usd"],
          expectedRowCount: 5,
          bloopGreeting: "Welcome to Google! We power billions of ad auctions every single day. Let's start with foundational eCPM and auction performance metrics."
        },
        {
          roundNum: 2,
          timeBudgetMinutes: 15,
          title: "Round 2: Generalized Second-Price (GSP) Auction Clearing",
          difficulty: "Intermediate",
          prompt: `Google's search ads run on a **Generalized Second-Price (GSP)** auction mechanism.
          
**Auction Mechanics:**
1. Each advertiser's **Ad Rank** is calculated as:
   $$\\text{ad\\_rank} = \\text{bid\\_amount} \\times \\text{quality\\_score}$$
2. The advertiser with the highest Ad Rank wins the top ad slot (\`rank_pos = 1\`).
3. Under GSP rules, the winner does NOT pay their own bid. Instead, they pay the minimum price needed to beat the second-highest bidder's Ad Rank:
   $$\\text{clearing\\_price\\_cpc} = \\text{ROUND}\\left(\\frac{\\text{next\\_ad\\_rank}}{\\text{winner\\_quality\\_score}} + 0.01, 2\\right)$$

**Requirements:**
- Query \`google_ad_auctions\`.
- For each \`auction_id\`, identify the winning advertiser (\`rank_pos = 1\`).
- Return: \`auction_id\`, \`keyword\`, \`winning_advertiser\`, \`original_bid\`, \`quality_score\`, \`ad_rank\`, \`clearing_price_cpc\`.
- Order by \`auction_id\` ASC.`,
          starterSql: `-- Google Round 2: Generalized Second-Price (GSP) Auction Clearing
WITH ranked_bids AS (
  SELECT
    auction_id,
    keyword,
    advertiser_name,
    bid_amount,
    quality_score,
    -- Compute Ad Rank and determine next highest rank
  FROM google_ad_auctions
)
SELECT * FROM ranked_bids;`,
          solutionSql: `WITH ranked_bids AS (
  SELECT
    auction_id,
    keyword,
    advertiser_name,
    bid_amount,
    quality_score,
    ROUND(bid_amount * quality_score, 2) AS ad_rank,
    ROW_NUMBER() OVER (PARTITION BY auction_id ORDER BY (bid_amount * quality_score) DESC) AS rank_pos,
    LEAD(ROUND(bid_amount * quality_score, 2)) OVER (PARTITION BY auction_id ORDER BY (bid_amount * quality_score) DESC) AS next_ad_rank
  FROM google_ad_auctions
)
SELECT
  auction_id,
  keyword,
  advertiser_name AS winning_advertiser,
  bid_amount AS original_bid,
  quality_score,
  ad_rank,
  ROUND((COALESCE(next_ad_rank, 0.0) / quality_score) + 0.01, 2) AS clearing_price_cpc
FROM ranked_bids
WHERE rank_pos = 1
ORDER BY auction_id;`,
          hints: [
            "Compute ad_rank as bid_amount * quality_score.",
            "Use ROW_NUMBER() OVER (PARTITION BY auction_id ORDER BY ad_rank DESC) to find the winner.",
            "Use LEAD(ad_rank) OVER (PARTITION BY auction_id ORDER BY ad_rank DESC) to fetch the 2nd place rank.",
            "Calculate clearing price as (next_ad_rank / quality_score) + 0.01."
          ],
          expectedColumns: ["auction_id", "keyword", "winning_advertiser", "original_bid", "quality_score", "ad_rank", "clearing_price_cpc"],
          expectedRowCount: 2,
          bloopGreeting: "Excellent metrics understanding! Now implement Google's core revenue engine: the Generalized Second-Price auction clearing algorithm."
        },
        {
          roundNum: 3,
          timeBudgetMinutes: 20,
          title: "Round 3: High-Frequency IP Click Burst Fraud Detector",
          difficulty: "Staff / Advanced",
          prompt: `Ad fraud networks deploy automated click-bots to drain competitor ad budgets. Google's Click Quality team detects rapid click bursts originating from the same IP address.

**Detection Rule:**
- Flag any \`user_ip\` generating $\\ge 5$ clicks within a **10-second rolling window** (\`RANGE BETWEEN 9 PRECEDING AND CURRENT ROW\` on timestamp seconds).

**Requirements:**
- Query \`google_ad_clicks\`.
- Order clicks chronologically by timestamp in seconds: \`CAST(strftime('%s', click_time) AS INTEGER)\`.
- Compute the rolling 10-second click count per \`user_ip\`.
- Return: \`user_ip\`, \`campaign_id\`, \`peak_burst_count\` (the maximum burst observed), and assign \`fraud_action = 'MALICIOUS_BOT_FRAUD'\`.
- Group by \`user_ip\`, \`campaign_id\` where rolling clicks reached at least 5.`,
          starterSql: `-- Google Round 3: High-Frequency Click Burst Fraud Detector
WITH click_bursts AS (
  SELECT
    user_ip,
    campaign_id,
    click_time,
    -- Compute rolling 10-second click count using RANGE
  FROM google_ad_clicks
)
SELECT * FROM click_bursts;`,
          solutionSql: `WITH click_bursts AS (
  SELECT
    user_ip,
    campaign_id,
    click_time,
    COUNT(*) OVER (
      PARTITION BY user_ip 
      ORDER BY CAST(strftime('%s', click_time) AS INTEGER)
      RANGE BETWEEN 9 PRECEDING AND CURRENT ROW
    ) AS rolling_10s_clicks
  FROM google_ad_clicks
)
SELECT
  user_ip,
  campaign_id,
  MAX(rolling_10s_clicks) AS peak_burst_count,
  'MALICIOUS_BOT_FRAUD' AS fraud_action
FROM click_bursts
WHERE rolling_10s_clicks >= 5
GROUP BY user_ip, campaign_id;`,
          hints: [
            "Cast strftime('%s', click_time) to INTEGER so RANGE operates on numeric seconds.",
            "Use RANGE BETWEEN 9 PRECEDING AND CURRENT ROW partitioned by user_ip.",
            "Filter for rolling_10s_clicks >= 5 in the outer query."
          ],
          expectedColumns: ["user_ip", "campaign_id", "peak_burst_count", "fraud_action"],
          expectedRowCount: 1,
          bloopGreeting: "Final question for the Staff level! Protect billions of advertiser dollars by building Google's real-time click fraud burst detector."
        }
      ]
    },

    // =========================================================================
    // TRACK 7: AMAZON / AWS (CLOUD INFRASTRUCTURE & SUPPLY CHAIN)
    // =========================================================================
    {
      id: "track_amazon",
      company: "Amazon / AWS",
      role: "Principal AWS Spot & Supply Chain Systems Engineer",
      badge: "FAANG / Cloud & Supply Chain",
      icon: "📦",
      difficulty: "Hard",
      timeLimitMinutes: 45,
      compensationRange: "$350,000 – $500,000",
      description: "Scale infrastructure screen: audit fulfillment center pick-to-pack SLA throughput, analyze Prime Day checkout drop-off funnels, and clear AWS Spot Instance cloud capacity.",
      interviewer: {
        name: "Rachel Chen",
        title: "Director of AWS Spot Optimization & Fulfillment",
        avatar: "⚡"
      },
      seedSql: `
DROP TABLE IF EXISTS amazon_fulfillment_orders;
CREATE TABLE amazon_fulfillment_orders (
  order_id TEXT PRIMARY KEY,
  fc_code TEXT NOT NULL,
  city TEXT NOT NULL,
  order_time TEXT NOT NULL,
  ship_time TEXT NOT NULL,
  target_sla_minutes INTEGER NOT NULL
);

INSERT INTO amazon_fulfillment_orders VALUES
  ('ORD-01', 'JFK8', 'Staten Island', '2026-10-15 08:00:00', '2026-10-15 09:45:00', 120),
  ('ORD-02', 'JFK8', 'Staten Island', '2026-10-15 08:15:00', '2026-10-15 11:00:00', 120),
  ('ORD-03', 'JFK8', 'Staten Island', '2026-10-15 08:30:00', '2026-10-15 10:15:00', 120),
  ('ORD-04', 'BFI4', 'Kent', '2026-10-15 09:00:00', '2026-10-15 10:30:00', 120),
  ('ORD-05', 'BFI4', 'Kent', '2026-10-15 09:30:00', '2026-10-15 12:45:00', 120),
  ('ORD-06', 'OAK4', 'Tracy', '2026-10-15 08:00:00', '2026-10-15 09:30:00', 120),
  ('ORD-07', 'OAK4', 'Tracy', '2026-10-15 08:30:00', '2026-10-15 09:50:00', 120);

DROP TABLE IF EXISTS amazon_cart_funnel;
CREATE TABLE amazon_cart_funnel (
  session_id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  cart_value_usd REAL NOT NULL,
  added_to_cart INTEGER NOT NULL,
  checkout_started INTEGER NOT NULL,
  payment_confirmed INTEGER NOT NULL
);

INSERT INTO amazon_cart_funnel VALUES
  ('SESS-01', 'Consumer Electronics', 250.00, 1, 1, 1),
  ('SESS-02', 'Consumer Electronics', 400.00, 1, 1, 0),
  ('SESS-03', 'Consumer Electronics', 150.00, 1, 0, 0),
  ('SESS-04', 'Consumer Electronics', 320.00, 1, 1, 1),
  ('SESS-05', 'Home & Kitchen', 60.00, 1, 1, 1),
  ('SESS-06', 'Home & Kitchen', 45.00, 1, 1, 1),
  ('SESS-07', 'Home & Kitchen', 90.00, 1, 1, 0),
  ('SESS-08', 'Apparel & Shoes', 120.00, 1, 0, 0),
  ('SESS-09', 'Apparel & Shoes', 85.00, 1, 1, 0);

DROP TABLE IF EXISTS aws_spot_market;
CREATE TABLE aws_spot_market (
  bid_id TEXT PRIMARY KEY,
  instance_type TEXT NOT NULL,
  az_id TEXT NOT NULL,
  bid_price_usd REAL NOT NULL,
  requested_units INTEGER NOT NULL
);

INSERT INTO aws_spot_market VALUES
  ('BID-01', 'c6g.4xlarge', 'us-east-1a', 0.85, 20),
  ('BID-02', 'c6g.4xlarge', 'us-east-1a', 0.72, 30),
  ('BID-03', 'c6g.4xlarge', 'us-east-1a', 0.65, 40),
  ('BID-04', 'c6g.4xlarge', 'us-east-1a', 0.50, 50),
  ('BID-05', 'c6g.4xlarge', 'us-east-1a', 0.40, 25);
`,
      rounds: [
        {
          roundNum: 1,
          timeBudgetMinutes: 10,
          title: "Round 1: Fulfillment Center Pick-to-Ship SLA Delays",
          difficulty: "Warmup",
          prompt: `In Amazon Robotics and Fulfillment Centers, maintaining same-day package dispatch promises requires strict tracking of pick-to-ship latency.

**Requirements:**
- Query \`amazon_fulfillment_orders\`.
- Order duration in minutes is computed as:
  $$\\frac{\\text{strftime('%s', ship\\_time)} - \\text{strftime('%s', order\\_time)}}{60}$$
- A package is delayed if its duration exceeds \`target_sla_minutes\`.
- For each fulfillment center (\`fc_code\`, \`city\`), calculate:
  - \`total_orders\`: Count of all processed orders.
  - \`delayed_orders\`: Count of orders exceeding target SLA.
  - \`delay_rate_pct\`: Percentage of orders delayed, rounded to 1 decimal place.
  - \`avg_duration_minutes\`: Average fulfillment duration across all orders, rounded to 1 decimal place.
- Return: \`fc_code\`, \`city\`, \`total_orders\`, \`delayed_orders\`, \`delay_rate_pct\`, \`avg_duration_minutes\`.
- Order by \`delay_rate_pct\` DESC, \`total_orders\` DESC.`,
          starterSql: `-- Amazon Round 1: Fulfillment Center SLA Delays
SELECT
  fc_code,
  city,
  -- Compute order count, delayed shipments, delay rate %, and avg fulfillment duration
FROM amazon_fulfillment_orders
GROUP BY fc_code, city
ORDER BY delay_rate_pct DESC;`,
          solutionSql: `SELECT
  fc_code,
  city,
  COUNT(*) AS total_orders,
  SUM(CASE WHEN (strftime('%s', ship_time) - strftime('%s', order_time)) / 60 > target_sla_minutes THEN 1 ELSE 0 END) AS delayed_orders,
  ROUND(
    SUM(CASE WHEN (strftime('%s', ship_time) - strftime('%s', order_time)) / 60 > target_sla_minutes THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(*),
    1
  ) AS delay_rate_pct,
  ROUND(AVG((strftime('%s', ship_time) - strftime('%s', order_time)) / 60.0), 1) AS avg_duration_minutes
FROM amazon_fulfillment_orders
GROUP BY fc_code, city
ORDER BY delay_rate_pct DESC, total_orders DESC;`,
          hints: [
            "Use (strftime('%s', ship_time) - strftime('%s', order_time)) / 60 to calculate minutes.",
            "Compare the duration against target_sla_minutes in a CASE WHEN statement.",
            "Round delay percentage and average duration to 1 decimal place."
          ],
          expectedColumns: ["fc_code", "city", "total_orders", "delayed_orders", "delay_rate_pct", "avg_duration_minutes"],
          expectedRowCount: 3,
          bloopGreeting: "Welcome to Amazon! With millions of Prime orders moving daily, logistics bottlenecks are immediately costly. Let's audit FC dispatch delays."
        },
        {
          roundNum: 2,
          timeBudgetMinutes: 15,
          title: "Round 2: Prime Day Cart Abandonment Velocity & Drop-off",
          difficulty: "Intermediate",
          prompt: `During Prime Day, Amazon tracks checkout drop-offs across product categories to optimize friction points.

**Conversion Stages:**
- Stage 1: Added to Cart (\`added_to_cart = 1\`)
- Stage 2: Checkout Started (\`checkout_started = 1\`)
- Stage 3: Payment Confirmed (\`payment_confirmed = 1\`)

**Requirements:**
- Query \`amazon_cart_funnel\`.
- For each product \`category\`, calculate:
  - \`total_carts\`: Total sessions that added to cart.
  - \`checkouts_started\`: Count of sessions that started checkout.
  - \`payments_confirmed\`: Count of sessions that completed purchase.
  - \`cart_to_checkout_drop_pct\`: Percentage of cart sessions that abandoned before checkout:
    $$\\text{ROUND}\\left(\\frac{\\text{total\\_carts} - \\text{checkouts\\_started}}{\\text{total\\_carts}} \\times 100, 1\\right)$$
  - \`checkout_to_paid_drop_pct\`: Percentage of checkout sessions that abandoned at payment:
    $$\\text{ROUND}\\left(\\frac{\\text{checkouts\\_started} - \\text{payments\\_confirmed}}{\\text{checkouts\\_started}} \\times 100, 1\\right)$$
  - \`total_converted_revenue\`: Sum of \`cart_value_usd\` for confirmed purchases (\`payment_confirmed = 1\`), rounded to 2 decimal places.
- Return: \`category\`, \`total_carts\`, \`checkouts_started\`, \`payments_confirmed\`, \`cart_to_checkout_drop_pct\`, \`checkout_to_paid_drop_pct\`, \`total_converted_revenue\`.
- Order by \`total_converted_revenue\` DESC.`,
          starterSql: `-- Amazon Round 2: Prime Day Funnel Abandonment
SELECT
  category,
  -- Calculate stage drop-off rates and total converted revenue
FROM amazon_cart_funnel
GROUP BY category
ORDER BY total_converted_revenue DESC;`,
          solutionSql: `SELECT
  category,
  COUNT(*) AS total_carts,
  SUM(checkout_started) AS checkouts_started,
  SUM(payment_confirmed) AS payments_confirmed,
  ROUND(
    ((COUNT(*) - SUM(checkout_started)) * 100.0) / COUNT(*),
    1
  ) AS cart_to_checkout_drop_pct,
  ROUND(
    ((SUM(checkout_started) - SUM(payment_confirmed)) * 100.0) / NULLIF(SUM(checkout_started), 0),
    1
  ) AS checkout_to_paid_drop_pct,
  ROUND(SUM(CASE WHEN payment_confirmed = 1 THEN cart_value_usd ELSE 0 END), 2) AS total_converted_revenue
FROM amazon_cart_funnel
GROUP BY category
ORDER BY total_converted_revenue DESC;`,
          hints: [
            "Use SUM(checkout_started) and SUM(payment_confirmed) for stage counts.",
            "Use NULLIF(SUM(checkout_started), 0) to safeguard drop-off calculation.",
            "Only sum cart_value_usd when payment_confirmed = 1."
          ],
          expectedColumns: ["category", "total_carts", "checkouts_started", "payments_confirmed", "cart_to_checkout_drop_pct", "checkout_to_paid_drop_pct", "total_converted_revenue"],
          expectedRowCount: 3,
          bloopGreeting: "Sharp analysis on warehouse SLAs! Now examine Amazon's core e-commerce engine: multi-stage cart drop-off velocity during Prime Day traffic peaks."
        },
        {
          roundNum: 3,
          timeBudgetMinutes: 20,
          title: "Round 3: Multi-AZ AWS Spot Instance Capacity Clearing Price",
          difficulty: "Staff / Advanced",
          prompt: `AWS EC2 Spot Instances allow customers to bid on unused cloud compute capacity. When aggregate customer demand exceeds available capacity, the spot market clears at the marginal bid price.

**Spot Rules:**
- In availability zone \`'us-east-1a'\`, AWS has **75 available compute units** of \`'c6g.4xlarge'\`.
- Bids are ordered by highest \`bid_price_usd\` first (tiebreaker: \`bid_id\` ASC).
- Running cumulative demand is calculated across bids.
- The **Marginal Clearing Bid** is the first bid where cumulative requested units reaches or exceeds the 75-unit capacity threshold.
- The clearing price is set to that marginal bid's price, and all higher bids clear at this uniform clearing price.

**Requirements:**
- Query \`aws_spot_market\`.
- Compute cumulative demand ordered by \`bid_price_usd\` DESC, \`bid_id\` ASC.
- Filter for the marginal clearing bid (where \`cumulative_demand >= 75\` with highest price).
- Return: \`instance_type\`, \`az_id\`, \`marginal_bid_id\`, \`spot_clearing_price\`, \`allocated_units\` (cumulative demand at clearing), and \`allocation_status = 'MARGINAL_CLEARING'\`.
- Output exactly the 1 marginal clearing record.`,
          starterSql: `-- Amazon Round 3: AWS Spot Market Capacity Clearing Engine
WITH sorted_bids AS (
  SELECT
    bid_id,
    instance_type,
    az_id,
    bid_price_usd,
    requested_units,
    -- Compute cumulative demand
  FROM aws_spot_market
)
SELECT * FROM sorted_bids;`,
          solutionSql: `WITH sorted_bids AS (
  SELECT
    bid_id,
    instance_type,
    az_id,
    bid_price_usd,
    requested_units,
    SUM(requested_units) OVER (
      PARTITION BY instance_type, az_id 
      ORDER BY bid_price_usd DESC, bid_id ASC
    ) AS cumulative_demand
  FROM aws_spot_market
)
SELECT
  instance_type,
  az_id,
  bid_id AS marginal_bid_id,
  bid_price_usd AS spot_clearing_price,
  cumulative_demand AS allocated_units,
  CASE 
    WHEN cumulative_demand <= 75 THEN 'FULLY_ALLOCATED'
    ELSE 'MARGINAL_CLEARING'
  END AS allocation_status
FROM sorted_bids
WHERE cumulative_demand >= 75
ORDER BY bid_price_usd DESC
LIMIT 1;`,
          hints: [
            "Use SUM(requested_units) OVER (PARTITION BY instance_type, az_id ORDER BY bid_price_usd DESC, bid_id ASC).",
            "Filter for cumulative_demand >= 75 and take the highest price (LIMIT 1).",
            "Output marginal_bid_id and spot_clearing_price."
          ],
          expectedColumns: ["instance_type", "az_id", "marginal_bid_id", "spot_clearing_price", "allocated_units", "allocation_status"],
          expectedRowCount: 1,
          bloopGreeting: "Final question for the Staff level! Design the AWS Spot Market clearing price engine that allocates millions of spare cloud compute instances."
        }
      ]
    }

  ]
};
