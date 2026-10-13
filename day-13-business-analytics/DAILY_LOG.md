# 📝 Day 13: Daily Deliberate Practice Log

**Date**: 2026-10-14  
**Module**: Day 13 — Advanced Business Analytics & Retention Cohorts  
**Focus**: Cohort Triangle Matrices, SaaS Churn Modeling, Net Revenue Retention (NRR), and Cumulative LTV Trajectories  
**Dialect**: MySQL 8.0+ / ANSI SQL  

---

## 🎯 Daily Session Highlights
- Mastered the transition from individual query mechanics to **Executive Decision-Making Analytics** (Unit Economics, CAC Payback, LTV, and Churn).
- Solved the **Sparse Data Problem** in churn analysis: why cancellation events do not generate rows in raw invoice tables, and how to construct a deterministic **User-Month Grid Spine** via `CROSS JOIN`.
- Constructed the classic **Cohort Retention Triangle Matrix** using a 4-stage CTE pipeline: Acquisition Anchor $\rightarrow$ Period Offsets $\rightarrow$ Aggregation $\rightarrow$ Conditional Pivoting (`MAX(CASE WHEN ...)`).
- Deconstructed Monthly Recurring Revenue (MRR) into the gold-standard CFO **Revenue Waterfall Bridge**: Beginning MRR + New + Expansion - Contraction - Churn = Ending MRR.

---

## 💡 Key Architectural Takeaways

### 1. The Month Boundary Calculation Trap
- **Rookie Approach**: Subtracting raw Julian days and dividing by 30 (`DATEDIFF(d2, d1) / 30`).
- **Failure Mode**: Over 6 to 12 months, 28-day Februaries and 31-day months cause dates to slip into wrong cohort buckets (e.g. Day 91 ends up labeled Month 3 instead of Month 2).
- **Production Standard**: Always normalize dates to the 1st of the month (`DATE_FORMAT(d, '%Y-%m-01')`) and calculate intervals with `TIMESTAMPDIFF(MONTH, cohort_month, activity_month)`.

### 2. The Churn Denominator Standard
- In corporate finance, **Logo Churn Rate** must always be calculated against the **beginning subscriber count of the period**, NOT the ending count:
  $$\text{Logo Churn Rate} = \frac{\text{Churned Customers in Month } t}{\text{Active Customers at Start of Month } t} \times 100$$
- Dividing by the ending count creates a distorted, mathematically flawed churn rate when new user acquisitions surge.

### 3. Safe Floating-Point Arithmetic
- Always wrap denominator variables with `NULLIF(..., 0)` to guarantee database immunity against division-by-zero crashes when cohorts have zero initial active users.

---

## ⏱️ Performance & Problem Scorecard

| # | Challenge | Complexity | Status | Verification Notes |
|:---:|:---|:---:|:---:|:---|
| 1 | **Monthly Retention Cohort Matrix** | $O(N \log N)$ | ✅ Verified | Pinned Month 0 at 100.0%; accurately tracks M1 through M3 drop-off. |
| 2 | **Subscription Churn State Machine** | $O(M \times U)$ | ✅ Verified | Correctly categorizes NEW, RETAINED, EXPANDED, CONTRACTED, CHURNED, and RESURRECTED. |
| 3 | **Cohort Cumulative LTV Curves** | $O(N)$ | ✅ Verified | Proves Referral channels yield 2.4x higher LTV than Paid Search. |
| 4 | **Revenue Waterfall Bridge** | $O(N)$ | ✅ Verified | Verified exact mathematical balance: Beginning MRR + Deltas == Ending MRR. |
