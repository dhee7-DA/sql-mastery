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
    }
  ]
};
