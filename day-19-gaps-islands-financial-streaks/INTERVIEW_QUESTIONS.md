# 💼 Day 19 Senior & Staff Engineer Interview Questions: Advanced Analytics

---

### Q1: Compare the Row-Number Difference technique against the `LAG()` Step-Transition technique for solving Gaps and Islands.
**Target Level**: Staff Quantitative Engineer (Citadel, Two Sigma, Jane Street)

| Dimension | Row-Number Difference (`rn_diff`) | Step-Transition (`LAG + Cumulative SUM`) |
| :--- | :--- | :--- |
| **Applicability** | Only works for discrete sequences with uniform step size $+1$ (integers, contiguous calendar days). | Universal: works for arbitrary continuous timestamps, price step changes, threshold triggers. |
| **Pass Count** | Requires 1 window function pass: `date - ROW_NUMBER()`. | Requires 2 window function passes: `LAG()` in step 1, `SUM()` in step 2. |
| **Performance** | Extremely fast and memory light. | Slightly more memory intensive due to 2-stage window evaluation. |

---

### Q2: How do you identify the exact Start and End of missing gaps in an auto-incrementing invoice table?
**Target Level**: Senior FinTech Engineer (Stripe, Adyen)

```sql
WITH Sequences AS (
    SELECT 
        invoice_num AS current_num,
        LEAD(invoice_num) OVER (ORDER BY invoice_num) AS next_num
    FROM invoices
)
SELECT 
    current_num + 1 AS gap_start,
    next_num - 1 AS gap_end,
    (next_num - current_num - 1) AS missing_count
FROM Sequences
WHERE next_num > current_num + 1;
```
By projecting the subsequent invoice number with `LEAD()`, any row where `next_num > current_num + 1` indicates an unfulfilled sequence gap!
