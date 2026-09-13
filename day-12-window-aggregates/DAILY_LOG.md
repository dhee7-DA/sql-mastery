# 📝 Day 12: Daily Sprint Log & Execution Audit

---

## 📅 Session Metadata
- **Date**: Day 12 / 14-Day Intensive
- **Focus Area**: Window Functions Part 2 — Aggregates, Offsets (`LAG`/`LEAD`) & Sliding Window Frames (`ROWS BETWEEN ...`)
- **Status**: ✅ Completed (All 4 Core Benchmark Challenges + 3 Production Scenarios Solved)
- **Engine Verified**: MySQL 8.0.33+ / PostgreSQL 15+ / Snowflake Compatible

---

## ⏱️ Execution & Problem Metrics

| Challenge # | Problem Focus | Complexity | First-Pass Success | Key Pitfall Encountered |
|:---:|:---|:---:|:---|:---|
| 1 | **SaaS MoM Revenue Growth** | Medium | Yes | Shielding MoM calculation with `NULLIF(LAG(), 0)` to prevent division-by-zero crashes. |
| 2 | **Bank Running Balance Ledger** | Medium | Yes | Forcing `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` to stop tied timestamp spikes. |
| 3 | **7-Day Smoothed Moving Average** | Hard | Yes | Framing `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` ($1 + 6 = 7$ total days). |
| 4 | **User Clickstream Inactivity Gap** | Hard | Yes | Handled final session boundary row where `LEAD()` returns `NULL`. |

---

## 🛠️ Key Technical Gotchas Debugged

### 1. The Default `RANGE` Running Total Trap
- **Error**: Silent inflation of bank balances when two deposits occurred at the same second.
- **Root Cause**: Omitting `ROWS BETWEEN ...` causes SQL engines to default to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. Under `RANGE`, tied order keys are evaluated concurrently, causing intermediate row balances to jump.
- **Resolution**: Explicitly specify physical row frame: `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.

### 2. The `LAST_VALUE()` Frame Ceiling Trap
- **Problem**: Writing `LAST_VALUE(col) OVER (PARTITION BY id ORDER BY date)` returned the current row's value rather than the last value of the partition.
- **Root Cause**: The default frame stops at `CURRENT ROW`.
- **Resolution**: Expanded frame to `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` (or inverted sort and used `FIRST_VALUE()`).

### 3. The 7-Day Window Denominator Math
- **Problem**: Querying `ROWS BETWEEN 7 PRECEDING AND CURRENT ROW` produced an 8-day moving average.
- **Resolution**: Corrected frame to `6 PRECEDING AND CURRENT ROW` ($6 + 1 = 7$).

---

## 📈 Next Up: Day 13
**Focus**: Real-World Business Analytics & SaaS Retention Cohorts
- Cohort Retention Matrix (Month 0, Month 1, Month 2 retention heatmaps).
- Customer Churn Rate & Customer Lifetime Value (LTV) formulas.
- User Lifecycle Classification (New, Active, Resurrected, Churned).
