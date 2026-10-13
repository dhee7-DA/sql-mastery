# 🔬 Day 13: Solutions Breakdown — Advanced Business Analytics

---

## Challenge 1: Monthly User Retention Cohort Matrix (Triangle)

### 1. What is Being Tested?
- Constructing multi-stage CTE data modeling pipelines.
- Calculating dynamic month offsets between an acquisition event and subsequent activity.
- Pivoting longitudinal time-series data into a standardized executive matrix format using conditional aggregation (`MAX(CASE WHEN ...)`).

### 2. Architectural Blueprint
```
[Invoices]
    │
    ├──► [UserAcquisition] : GROUP BY user_id ──► MIN(invoice_date) = cohort_month
    │
    ├──► [UserActivityMonths] : Join to find TIMESTAMPDIFF(MONTH, cohort_month, invoice_date)
    │
    ├──► [CohortSizes] : Count total unique users acquired per cohort_month
    │
    └──► [Final Pivot] : MAX(CASE WHEN month_offset = k THEN active_users) / cohort_size * 100
```

### 3. Key Technical Details
1. **Normalizing to First-of-Month (`DATE_FORMAT(..., '%Y-%m-01')`)**:
   Users purchase on arbitrary days (e.g., Jan 14 vs Feb 2). Converting dates to the first of the calendar month ensures clean monthly grouping.
2. **`TIMESTAMPDIFF(MONTH, start_date, end_date)`**:
   Unlike subtracting raw Julian days and dividing by 30 (which leads to catastrophic drift over 6+ months due to 28-day Februaries and 31-day months), `TIMESTAMPDIFF(MONTH, ...)` calculates exact calendar month boundaries.
3. **Why `MAX(CASE WHEN ...)` instead of `SUM(CASE WHEN ...)`?**:
   In the final query, we group by `cohort_month`. Since there is only one row per `(cohort_month, month_offset)` from the previous aggregate, `MAX()` acts as a clean value-extractor that ignores `NULL`s, pivoting the column effortlessly.

---

## Challenge 2: Subscription Churn & Active Subscriber Census

### 1. What is Being Tested?
- Solving the **Sparse Activity Data Problem** where cancellations write zero rows.
- Generating a complete **User-Month Grid (Date Spine)** using `CROSS JOIN`.
- Implementing a full business state machine (`NEW`, `RETAINED`, `RESURRECTED`, `CHURNED`).

### 2. The Core Gotcha: The Missing Row Problem
In real relational databases:
- When a customer purchases a subscription, an invoice row is created.
- When a customer cancels or does not renew, **no transaction row is generated for the subsequent month**.
- A naive `GROUP BY billing_month` will show active customers, but **cannot count churned customers**, because churn is defined by the *absence* of a row!

### 3. The Date Spine Solution
```sql
UserMonthSpine AS (
    SELECT m.billing_month, u.user_id
    FROM DistinctMonths m
    CROSS JOIN DistinctUsers u
)
```
By generating the cartesian product of every observed month and every customer, and `LEFT JOIN`ing back to `Subscriptions`, inactive months produce explicit `NULL` records.

### 4. Detecting State Transitions with `LAG()`
```sql
-- Check if active now:
CASE WHEN sub.sub_id IS NOT NULL THEN 1 ELSE 0 END AS is_active_now,
-- Check if active last month:
LAG(CASE WHEN sub.sub_id IS NOT NULL THEN 1 ELSE 0 END, 1, 0) OVER (
    PARTITION BY s.user_id ORDER BY s.billing_month ASC
) AS was_active_prev
```
- If `was_active_prev = 1` and `is_active_now = 0` $\implies$ **CHURNED**.
- If `was_active_prev = 0` and `is_active_now = 1` and `had_prior_activity = 1` $\implies$ **RESURRECTED**.
- If `was_active_prev = 0` and `is_active_now = 1` and `had_prior_activity = 0` $\implies$ **NEW**.
- If `was_active_prev = 1` and `is_active_now = 1` $\implies$ **RETAINED**.

---

## Challenge 3: Cohort Cumulative Lifetime Value (LTV) & Channel Efficiency

### 1. What is Being Tested?
- Computing cumulative monetization trajectories over time using rolling window frames.
- Normalizing total dollar amounts by the initial cohort size ($M_0$).
- Comparing Customer Acquisition Cost (CAC) vs. LTV curves across marketing channels.

### 2. The Running Total Window Function
```sql
SUM(m.period_spend) OVER (
    PARTITION BY s.cohort_month, s.acquisition_channel 
    ORDER BY m.month_offset ASC
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
) AS cumulative_channel_spend
```
- By specifying `PARTITION BY s.cohort_month, s.acquisition_channel`, each channel cohort tracks its own financial accumulation independently.
- Dividing `cumulative_channel_spend` by `s.cohort_size` gives the **Average Cumulative Revenue Generated Per User**.

### 3. Executive Interpretation
- **Organic**: Low initial spend, but steady growth with zero CAC.
- **Paid Search**: High initial conversion, but steep churn; if Cumulative LTV after 12 months (\$150) is less than CAC (\$180), the channel is destroying enterprise value!
- **Referral**: Highest retention and expansion; LTV curves hockey-stick over time.

---

## Challenge 4: Executive Revenue Waterfall Bridge (MoM Decomposition)

### 1. What is Being Tested?
- Constructing the gold-standard SaaS CFO revenue bridge:
  $$\text{Beginning MRR} + \text{New MRR} + \text{Expansion MRR} - \text{Contraction MRR} - \text{Churn MRR} = \text{Ending MRR}$$
- Tracking dollar movements at the account level and aggregating to the corporate level.
- Calculating Net Revenue Retention (NRR).

### 2. The Delta Classification Logic
For each account in each month:
1. **`new_mrr`**: If `billing_month == first_bill_month`, the entire revenue is categorized as New.
2. **`expansion_mrr`**: If `current_mrr > prior_mrr` and `prior_mrr > 0`, the delta `(current_mrr - prior_mrr)` is Expansion. If `prior_mrr = 0` but user had prior activity, it is classified as Resurrected Expansion.
3. **`contraction_mrr`**: If `current_mrr < prior_mrr` and `current_mrr > 0`, the decrease `(prior_mrr - current_mrr)` is Contraction.
4. **`churn_mrr`**: If `current_mrr == 0` and `prior_mrr > 0`, the entire `prior_mrr` is Churn.

### 3. Verification Identity
A proper revenue bridge must satisfy the mathematical identity:
$$\text{Ending MRR} - \text{Beginning MRR} = \text{New} + \text{Expansion} - \text{Contraction} - \text{Churn}$$
Our SQL query guarantees this identity holds row-by-row and across the entire enterprise portfolio.
