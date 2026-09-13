# 🚀 Day 12: Window Functions — Aggregates, Value Offsets & Rolling Frames

Welcome to **Day 12** of the **14-Day SQL Intensive**. Today we conquer the second half of the analytical SQL superpower: **Value Navigation (`LAG` / `LEAD`)** and **Physical Rolling Frames (`ROWS BETWEEN ...`)**. 

While Day 11 mastered row ranking and partitioning, Day 12 transforms SQL into a full-fledged financial, quantitative, and time-series analytics engine.

---

## 🎯 Sprint Objectives
1. **Master Inter-Row Navigation Without Self-Joins**:
   - `LAG(column, offset, default)`: Looking backward across partitions (previous order date, prior subscription tier).
   - `LEAD(column, offset, default)`: Looking forward across partitions (next user click, time-to-conversion).
   - `FIRST_VALUE()` & `LAST_VALUE()`: Cohort anchoring and baseline metrics.
2. **Master the Physical Anatomy of Window Frames**:
   - Internalize the dangerous difference between `ROWS` (physical count) and `RANGE` (logical values/ties).
   - `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`: The canonical cumulative running total.
   - `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`: The 7-day smoothed moving average.
   - `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING`: Centered 3-point rolling smoothing.
3. **Build Real-World Executive Business KPIs**:
   - **Month-over-Month (MoM) & Year-over-Year (YoY) Revenue Growth Rates**.
   - **Running Cash Flow Ledgers & Cumulative Burn Rates**.
   - **User Session Inactivity Timeouts & Abandonment Latency**.
   - **High-Water Mark (All-Time Peak) Financial Asset Tracking**.
4. **Conquer 4 Premier Production Benchmark Challenges**:
   - [x] **Monthly Revenue & MoM Growth Acceleration** (Canonical SaaS Financial Analytics Rep).
   - [x] **Bank Account Running Balance & Overdraft Risk Audit** (Fintech Ledger Reconciliation).
   - [x] **7-Day Smoothed Moving Average of User Signups** (E-Commerce / Growth Marketing).
   - [x] **Session Duration & User Drop-Off Latency** (Product Analytics Telemetry).

---

## 🗺️ Problem Matrix

| # | Problem Name | Difficulty | Key Window Concepts Tested | Industry Archetype | Status |
|:---:|:---|:---:|:---|:---|:---:|
| 1 | **SaaS MoM Revenue Growth** | Medium | `LAG(revenue, 1) OVER (ORDER BY month)`, Division-by-zero protection (`NULLIF`) | SaaS / Corporate Finance | ✅ Solved |
| 2 | **Running Cash Flow Balance** | Medium | `SUM(amount) OVER (PARTITION BY account_id ORDER BY txn_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` | Fintech / Banking Operations | ✅ Solved |
| 3 | **7-Day Smoothed Moving Average** | Hard | `AVG(signups) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`, Window frame bounds | Growth Marketing / Telemetry | ✅ Solved |
| 4 | **User Event Inactivity Gap** | Hard | `LEAD(event_time, 1) OVER (PARTITION BY session_id ORDER BY event_time)`, Sessionization | Product Analytics / Web Logs | ✅ Solved |

---

## 📊 Window Frame Specification Cheat Sheet

```
┌────────────────────────────────────────────────────────────────────────┐
│               ANATOMY OF A SLIDING WINDOW FRAME                        │
│                                                                        │
│  AGG_FUNC() OVER (                                                     │
│      PARTITION BY account_id                                           │
│      ORDER BY transaction_date ASC                                     │
│      ROWS BETWEEN [FRAME_START] AND [FRAME_END]                        │
│  )                                                                     │
└────────────────────────────────────────────────────────────────────────┘
```

| Frame Syntax | What It Captures | Primary Use Case |
|:---|:---|:---|
| `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` | All rows from the start of partition up to current row. | **Cumulative Running Totals**, YTD Revenue, Ledger Balances. |
| `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` | Exactly 7 rows: current row + 6 prior rows. | **7-Day Moving Averages**, Weekly Velocity. |
| `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` | Exactly 3 rows: prior, current, and next row. | **Centered Moving Average**, Smoothing noisy sensor spikes. |
| `ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING` | Current row to the end of partition. | **Remaining Inventory**, Pipeline Backlog Drawdown. |

---

## 📂 File Architecture
- [`THEORY.md`](./THEORY.md): Deep architectural mechanics of sliding frames, `ROWS` vs `RANGE`, memory buffer management, and `LAG`/`LEAD` internals.
- [`queries.sql`](./queries.sql): Clean, executable ANSI / MySQL 8.0+ query suite with full DDL and seed datasets.
- [`SOLUTIONS_BREAKDOWN.md`](./SOLUTIONS_BREAKDOWN.md): Line-by-line breakdown, edge cases, and performance optimizations.
- [`INTERVIEW_QUESTIONS.md`](./INTERVIEW_QUESTIONS.md): Real-world FAANG scenarios from Stripe, Netflix, and Amazon.
- [`DAILY_LOG.md`](./DAILY_LOG.md): Sprint metrics and debugging notes.
- [`ASSESSMENT.md`](./ASSESSMENT.md): Objective skill verification scorecard.
