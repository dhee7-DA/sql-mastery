# 🧠 Day 13: Theory — Advanced Business Analytics, Cohorts, Churn & LTV

---

## 1. The Anatomy of Cohort Retention Analysis

A **cohort** is a group of users who share a common characteristic or experienced a key life-cycle milestone during the same time period. In business analytics, the most important cohort definition is **Acquisition Cohort**: users grouped by the calendar month of their first activity (signup or first purchase).

### The Classical Retention Triangle
Because time moves forward, older cohorts have been observed for more months than newer cohorts. When plotted in a matrix, this naturally forms a **Retention Triangle**:

```
Acquisition   Cohort   Month 0   Month 1   Month 2   Month 3   Month 4   Month 5
Cohort        Size      (100%)    (M+1)     (M+2)     (M+3)     (M+4)     (M+5)
─────────────────────────────────────────────────────────────────────────────
2025-01       1,000     100.0%    38.4%     29.1%     24.2%     21.0%     19.5%
2025-02       1,200     100.0%    41.2%     31.0%     26.5%     22.8%      --
2025-03         950     100.0%    36.8%     27.4%     23.1%      --        --
2025-04       1,400     100.0%    43.5%     33.2%      --        --        --
2025-05       1,150     100.0%    39.1%      --        --        --        --
2025-06       1,300     100.0%     --        --        --        --        --
```

---

## 2. The 4-Stage SQL Assembly Pipeline for Retention

To build an executive retention matrix from raw transactional or login logs, we follow a standardized 4-stage Common Table Expression (CTE) pipeline:

```
[ Stage 1: User Cohort Anchor ] 
       │  (Find MIN(activity_date) per user)
       ▼
[ Stage 2: Activity Period Indexing ]
       │  (Calculate TIMESTAMPDIFF in months between activity and cohort anchor)
       ▼
[ Stage 3: Cohort Aggregate Counts ]
       │  (COUNT(DISTINCT user_id) per (cohort_month, period_number))
       ▼
[ Stage 4: Matrix Pivoting & Percentage Normalization ]
          (Divide by Month 0 count and pivot with CASE WHEN)
```

### Stage 1: Anchor Each User to Cohort $M_0$
```sql
WITH UserCohorts AS (
    SELECT user_id,
           DATE_FORMAT(MIN(order_date), '%Y-%m-01') AS cohort_month
    FROM Orders
    GROUP BY user_id
)
```

### Stage 2: Calculate Relative Month Offsets
Never calculate dates using raw day subtraction (`order_date - cohort_date`), because months have variable lengths (28, 30, 31 days). Always use `TIMESTAMPDIFF(MONTH, ...)` or `PERIOD_DIFF`:

```sql
UserActivities AS (
    SELECT o.user_id,
           c.cohort_month,
           DATE_FORMAT(o.order_date, '%Y-%m-01') AS activity_month,
           TIMESTAMPDIFF(MONTH, c.cohort_month, DATE_FORMAT(o.order_date, '%Y-%m-01')) AS month_number
    FROM Orders o
    JOIN UserCohorts c ON o.user_id = c.user_id
)
```

### Stage 3: Calculate Cohort Sizes and Monthly Active Users
```sql
CohortSizes AS (
    SELECT cohort_month, COUNT(DISTINCT user_id) AS cohort_size
    FROM UserCohorts
    GROUP BY cohort_month
),
RetentionCounts AS (
    SELECT a.cohort_month,
           a.month_number,
           COUNT(DISTINCT a.user_id) AS active_users
    FROM UserActivities a
    GROUP BY a.cohort_month, a.month_number
)
```

### Stage 4: Conditional Aggregation Pivoting
```sql
SELECT r.cohort_month,
       s.cohort_size,
       ROUND(MAX(CASE WHEN r.month_number = 0 THEN r.active_users END) * 100.0 / s.cohort_size, 1) AS m0_pct,
       ROUND(MAX(CASE WHEN r.month_number = 1 THEN r.active_users END) * 100.0 / s.cohort_size, 1) AS m1_pct,
       ROUND(MAX(CASE WHEN r.month_number = 2 THEN r.active_users END) * 100.0 / s.cohort_size, 1) AS m2_pct,
       ROUND(MAX(CASE WHEN r.month_number = 3 THEN r.active_users END) * 100.0 / s.cohort_size, 1) AS m3_pct
FROM RetentionCounts r
JOIN CohortSizes s ON r.cohort_month = s.cohort_month
GROUP BY r.cohort_month, s.cohort_size
ORDER BY r.cohort_month ASC;
```

---

## 3. Subscription Churn & The SaaS State Machine

In subscription and recurring revenue businesses (SaaS, Netflix, Spotify), customers transition between **six mutually exclusive lifecycle states** every single month:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     THE 6 SUBSCRIPTION LIFECYCLE STATES                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. NEW:         First-ever subscription bill in month t.                   │
│  2. RETAINED:    Active in month t-1 and active in month t with same MRR.   │
│  3. EXPANSION:   Active in month t-1 and active in month t with HIGHER MRR. │
│  4. CONTRACTION: Active in month t-1 and active in month t with LOWER MRR.  │
│  5. CHURNED:     Active in month t-1 but NO subscription in month t.        │
│  6. RESURRECTED: Inactive in month t-1, but had subscription prior, and     │
│                  re-activated in month t.                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Deadly "Silent Churn" Trap (Sparse Activity Data)
In transactional databases, when a user churns, **NO row is written to the table** for the subsequent month!
- If Alice pays in January and February, but stops in March, there is **no March row** for Alice in the `Invoices` table.
- A naive `GROUP BY month` will completely miss Alice's churn in March!

### The Architectural Fix: The Calendar Date Spine
To properly detect churn, we must cross join every customer with a **Calendar Date Spine** to ensure every active account has a record in every month of its lifecycle:

```sql
WITH RECURSIVE MonthSpine AS (
    SELECT DATE('2025-01-01') AS m_date
    UNION ALL
    SELECT DATE_ADD(m_date, INTERVAL 1 MONTH)
    FROM MonthSpine
    WHERE m_date < DATE('2025-12-01')
)
```

---

## 4. Net Revenue Retention (NRR) vs. Gross Revenue Retention (GRR)

Institutional venture capital and public markets evaluate SaaS companies primarily on **NRR**:

$$\text{Net Revenue Retention (NRR)} = \frac{\text{Beginning MRR} + \text{Expansion} - \text{Contraction} - \text{Churn}}{\text{Beginning MRR}} \times 100\%$$

$$\text{Gross Revenue Retention (GRR)} = \frac{\text{Beginning MRR} - \text{Contraction} - \text{Churn}}{\text{Beginning MRR}} \times 100\%$$

### Key Insights:
1. **GRR can never exceed 100%**: It only measures loss. Best-in-class enterprise SaaS has GRR $> 90\%$.
2. **NRR can exceed 100% (Negative Net Churn)**: If existing customers expand their usage (upgrades, additional seats) faster than customers cancel, NRR exceeds 100% (Snowflake: 158%, Datadog: 130%). The business grows even if sales signs zero new customers!

---

## 5. Customer Lifetime Value (LTV) & Cumulative Monetization

Customer Lifetime Value represents the total cumulative net profit or revenue generated by a customer over their entire relationship with the company.

### Cumulative Cohort LTV Formula:
$$\text{Cumulative LTV}(k) = \frac{\sum_{i=0}^{k} \text{Total Revenue generated by cohort in Month } i}{\text{Total Customers Acquired in Month 0}}$$

```sql
WITH CohortMonthlyRevenue AS (
    SELECT c.cohort_month,
           TIMESTAMPDIFF(MONTH, c.cohort_month, DATE_FORMAT(o.order_date, '%Y-%m-01')) AS month_number,
           SUM(o.amount) AS period_revenue
    FROM Orders o
    JOIN UserCohorts c ON o.user_id = c.user_id
    GROUP BY 1, 2
)
SELECT cohort_month,
       month_number,
       period_revenue,
       SUM(period_revenue) OVER (
           PARTITION BY cohort_month 
           ORDER BY month_number ASC
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS cumulative_cohort_revenue
FROM CohortMonthlyRevenue;
```

### The CAC Payback Crossover
When the `Cumulative LTV(k)` curve crosses above the **Customer Acquisition Cost (CAC)** line, the cohort has achieved **CAC Payback**:
- Prior to crossover: Company is net-negative on cash flow invested in growth.
- After crossover: Every additional dollar is pure gross profit margin.
