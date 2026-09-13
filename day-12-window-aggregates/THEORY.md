# 🧠 Day 12: Theory — Window Functions: Value Offsets, Running Aggregates & Frame Physics

---

## 1. Physical Window Frames: The Sliding Aperture Concept

In Day 11, we treated partitions as static rooms of rows. With **Window Frames**, we introduce a **dynamic physical aperture** that slides row-by-row as the database scans through the partition.

```
Row 1: [$100]  <-- Window Frame captures: [$100]           ──► Sum = $100
Row 2: [$200]  <-- Window Frame captures: [$100, $200]     ──► Sum = $300
Row 3: [$150]  <-- Window Frame captures: [$100, $200, $150] ──► Sum = $450
```

### The Standard Frame Clause Syntax:
```sql
{ ROWS | RANGE } BETWEEN <frame_start> AND <frame_end>
```

Where `<frame_start>` and `<frame_end>` can be:
- `UNBOUNDED PRECEDING`: The very first row of the partition.
- `n PRECEDING`: Exactly $n$ physical rows (or logical units) prior to current row.
- `CURRENT ROW`: The row currently being evaluated.
- `n FOLLOWING`: Exactly $n$ physical rows (or logical units) after current row.
- `UNBOUNDED FOLLOWING`: The very last row of the partition.

---

## 2. The Deadly Trap: `ROWS` vs. `RANGE`

When an `ORDER BY` is added to a window function without an explicit frame clause, ANSI SQL mandates a silent default:
$$\text{DEFAULT FRAME: } \mathbf{RANGE\ BETWEEN\ UNBOUNDED\ PRECEDING\ AND\ CURRENT\ ROW}$$

Notice the keyword **`RANGE`**, not **`ROWS`**!

### The Difference:
- **`ROWS`** operates on **physical row counts**, regardless of duplicate values.
- **`RANGE`** operates on **logical value ranges**. If multiple rows share the **exact same value** in the `ORDER BY` column, `RANGE` treats all tied rows as belonging to the "current row" simultaneously!

### The "Tied Date" Cumulative Inflation Trap:
Consider two bank deposits occurring on the exact same date `2026-03-01`:

| Row ID | Date | Amount | `SUM(...) ROWS` | `SUM(...) RANGE` (Default!) | What Happened? |
|:---:|:---:|:---:|:---:|:---:|:---|
| **1** | `2026-03-01` | \$100 | **\$100** | **\$300** ⚠️ | Default `RANGE` lumped Row 1 and Row 2 together! |
| **2** | `2026-03-01` | \$200 | **\$300** | **\$300** | Both rows evaluated as tied! |
| **3** | `2026-03-02` | \$50 | **\$350** | **\$350** | Normal accumulation resumes. |

> [!CAUTION]
> **The Golden Rule**: Never rely on default `RANGE` for running totals. Always explicitly write:
> `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`

---

## 3. The Value Offset Navigation Functions (`LAG` & `LEAD`)

Before window functions, accessing a value from a previous or subsequent row required an expensive $O(N^2)$ self-join on `t1.id = t2.id - 1`. 

Window offset functions solve this in a single scan:

### 1. `LAG(expression [, offset [, default]])`
- Peeks backward by `offset` rows within the current partition.
- `offset` defaults to `1` if omitted.
- `default` specifies what to return when looking before the start of the partition (defaults to `NULL`).

### 2. `LEAD(expression [, offset [, default]])`
- Peeks forward by `offset` rows within the current partition.
- Returns `default` (or `NULL`) when peeking beyond the end of the partition.

### The Canonical Formula: Month-over-Month (MoM) Growth
$$\text{MoM Growth \%} = \frac{\text{Current Month Revenue} - \text{LAG}(\text{Revenue}, 1)}{\text{LAG}(\text{Revenue}, 1)} \times 100$$

```sql
WITH MonthlySales AS (
    SELECT DATE_FORMAT(order_date, '%Y-%m-01') AS sales_month,
           SUM(amount) AS total_revenue
    FROM Orders
    GROUP BY 1
)
SELECT sales_month, total_revenue,
       LAG(total_revenue, 1) OVER (ORDER BY sales_month) AS prior_month_revenue,
       ROUND(
           (total_revenue - LAG(total_revenue, 1) OVER (ORDER BY sales_month)) 
           / NULLIF(LAG(total_revenue, 1) OVER (ORDER BY sales_month), 0) * 100.0, 
           2
       ) AS mom_growth_pct
FROM MonthlySales;
```
*Note the defensive use of `NULLIF(..., 0)` to prevent division-by-zero crashes on months following zero revenue.*

---

## 4. The `LAST_VALUE()` Frame Gotcha (Senior Interview Classic)

A universal senior interview gotcha is asking a candidate to write a query finding the **final order status** using `LAST_VALUE()`:

```sql
-- ❌ DISASTROUS MISTAKE (Does NOT return the last value of the partition!):
SELECT order_id, status,
       LAST_VALUE(status) OVER (PARTITION BY order_id ORDER BY updated_at) AS final_status
FROM OrderStatusHistory;
```

### Why This Returns the Current Row's Status:
Because an `ORDER BY` was provided without a frame, the database applies the default frame:
`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`
The window frame **stops at the CURRENT ROW**! Therefore, the "last value" in a frame that ends at the current row is... the **current row**!

### The Correct Implementation:
To truly capture the final value in the partition, you must expand the frame to the end of the partition:
```sql
-- ✅ CORRECT:
LAST_VALUE(status) OVER (
    PARTITION BY order_id 
    ORDER BY updated_at
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
) AS final_status
```
*(Or alternatively, reverse the sort and use `FIRST_VALUE(status) OVER (... ORDER BY updated_at DESC)`).*

---

## 5. Moving Averages & Smoothing Physics

Real-world operational telemetry (daily website signups, credit card fraud spikes, CPU usage) fluctuates wildly between weekdays and weekends. A raw daily chart is too noisy for executives.

### The 7-Day Smoothed Moving Average:
```sql
AVG(daily_signups) OVER (
    ORDER BY signup_date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
) AS moving_avg_7d
```
- For any given day, the engine takes the **current day** plus the **prior 6 days** ($1 + 6 = 7$ total days), sums them, and divides by the count of available rows.
- **Edge Case (First 6 Days)**: On Day 1, the frame has 1 row (divides by 1). On Day 2, 2 rows (divides by 2). By Day 7, it reaches the steady-state 7-day denominator.
