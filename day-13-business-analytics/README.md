# 🚀 Day 13: Advanced Business Analytics — Churn, Cohorts, MoM & LTV

Welcome to **Day 13** of the **14-Day SQL Intensive**. Today we transition from query mechanics to **Executive Business Analytics & Unit Economics**. We assemble all previous superpowers—Window Functions, CTE Pipelines, Date Arithmetic, and Self-Joins—to answer the core questions asked by CEOs, CFOs, and Growth Leads.

---

## 🎯 Sprint Objectives
1. **Master Retention Cohort Analysis (The Classic Triangle Matrix)**:
   - Identify user acquisition month (Cohort $M_0$) using `MIN(order_date)`.
   - Calculate period-offset intervals (`PERIOD_DIFF`, `TIMESTAMPDIFF(MONTH, ...)`).
   - Compute cohort retention percentage across Month 0 to Month 12 ($M_0, M_1, M_2, \dots$).
   - Pivot data into the executive cohort retention triangle matrix using conditional aggregation (`CASE WHEN`).
2. **Deconstruct Subscription Churn & Net Revenue Retention (NRR)**:
   - Model the monthly subscription state machine: *New, Retained, Resurrected, Churned, Expanded, Contracted*.
   - Calculate **Logo Churn Rate**:
     $$\text{Logo Churn Rate} = \frac{\text{Customers Churned in Month } t}{\text{Active Customers at Start of Month } t} \times 100$$
   - Calculate **Net Revenue Retention (NRR)** and **Gross Revenue Retention (GRR)**:
     $$\text{NRR} = \frac{\text{Beginning MRR} + \text{Expansion} - \text{Contraction} - \text{Churned MRR}}{\text{Beginning MRR}} \times 100$$
3. **Calculate Customer Lifetime Value (LTV) & Cumulative Monetization Curves**:
   - Compute cumulative revenue contribution per user across lifetime months.
   - Calculate Average Revenue Per User (**ARPU**) and Average Revenue Per Paying User (**ARPPU**).
   - Compare cohort monetization curves across acquisition channels (*Paid Search, Organic, Viral Referral*).
4. **Decompose Month-over-Month (MoM) & Year-over-Year (YoY) Revenue Bridges**:
   - Construct the classic CFO "Revenue Waterfall Bridge":
     $$\text{Ending MRR} = \text{Beginning MRR} + \text{New} + \text{Expansion} - \text{Contraction} - \text{Churn}$$
   - Calculate Trailing 12-Month (**TTM**) Revenue and Compound Monthly Growth Rate (**CMGR**).

---

## 🗺️ Problem Matrix

| # | Benchmark Problem Name | Difficulty | Core SQL Concepts Tested | Business Archetype | Status |
|:---:|:---|:---:|:---|:---|:---:|
| 1 | **Monthly User Retention Cohort Matrix** | Hard | Multi-CTE Pipeline, `MIN() OVER (PARTITION BY user_id)`, `TIMESTAMPDIFF`, Conditional Pivoting | SaaS / Consumer App | ✅ Solved |
| 2 | **SaaS Subscription Churn & Active Subscriber Census** | Hard | Full Outer / Union Date Spining, `LAG()`, Churn Classification, State Machine | B2B Subscription | ✅ Solved |
| 3 | **Cohort Cumulative Lifetime Value (LTV) & Payback** | Hard | Running Totals (`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`), Cohort Normalization, CAC Payback | E-Commerce / D2C | ✅ Solved |
| 4 | **Executive Revenue Waterfall Bridge (MoM Decomposition)** | Hard | Revenue Delta Attribution (New vs Expand vs Churn), Window Offsets, Financial Modeling | Corporate Finance / CFO Office | ✅ Solved |

---

## 📊 Business Analytics Metrics Cheat Sheet

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                    THE CORE REVENUE & RETENTION FORMULAS                      │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  1. COHORT RETENTION RATE (Month k):                                          │
│     Retention % = [ Active Users in Month k ] / [ Cohort Size in Month 0 ]    │
│                                                                               │
│  2. LOGO CHURN RATE:                                                          │
│     Logo Churn % = [ Cancelled Users in Month t ] / [ Start Users in Month t] │
│                                                                               │
│  3. NET REVENUE RETENTION (NRR):                                              │
│     NRR % = (Beginning MRR + Expansion - Contraction - Churn) / Beginning MRR │
│                                                                               │
│  4. CUSTOMER LIFETIME VALUE (LTV):                                            │
│     LTV = ARPU × (1 / Gross Churn Rate) × Gross Margin %                      │
│                                                                               │
│  5. CAC PAYBACK PERIOD (Months):                                              │
│     Payback = Customer Acquisition Cost / (ARPU × Gross Margin %)             │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 File Architecture
- [`THEORY.md`](./THEORY.md): Deep theoretical mechanics of cohort indexing, calendar date spines, state machine modeling, and defensive arithmetic.
- [`queries.sql`](./queries.sql): Clean, executable ANSI / MySQL 8.0+ query bank with complete DDL schemas, realistic transaction seed data, and verified answers.
- [`SOLUTIONS_BREAKDOWN.md`](./SOLUTIONS_BREAKDOWN.md): Step-by-step architectural breakdown, CTE blueprints, and performance considerations.
- [`INTERVIEW_QUESTIONS.md`](./INTERVIEW_QUESTIONS.md): Real-world senior product and business intelligence interview scenarios from Stripe, Netflix, Spotify, and Uber.
- [`DAILY_LOG.md`](./DAILY_LOG.md): Sprint metrics, Q&A log, blockers debugged, and engine optimization notes.
- [`ASSESSMENT.md`](./ASSESSMENT.md): Objective skill verification scorecard and rubric audit.
