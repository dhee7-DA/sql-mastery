# 💼 Day 13: Interview Questions — Real-World Senior Analytics Scenarios

---

## Scenario 1: Stripe — Silent Merchant Churn vs. Seasonal Inactivity

### The Scenario:
At Stripe, tens of thousands of merchants process payments daily. However, a merchant doesn't necessarily send a formal "cancellation request" when they stop using Stripe—they simply stop routing API traffic to the payment gateway. 

**The Question**:
> Write an SQL query to identify "Silent Churn" merchants: accounts that processed active transaction volume in Month $t-1$, but processed \$0 in Month $t$. Exclude seasonal merchants who had zero transactions in the same calendar month of the prior year.

### The Production Query:
```sql
WITH MonthlyMerchantVolume AS (
    SELECT merchant_id,
           DATE_FORMAT(charge_created_at, '%Y-%m-01') AS volume_month,
           SUM(amount_usd) AS monthly_volume
    FROM Charges
    WHERE status = 'succeeded'
    GROUP BY merchant_id, volume_month
),
MerchantActivitySpine AS (
    SELECT m.merchant_id,
           s.month_date,
           COALESCE(v.monthly_volume, 0.00) AS current_volume,
           LAG(COALESCE(v.monthly_volume, 0.00), 1, 0.00) OVER (
               PARTITION BY m.merchant_id ORDER BY s.month_date ASC
           ) AS prior_month_volume,
           LAG(COALESCE(v.monthly_volume, 0.00), 12, 0.00) OVER (
               PARTITION BY m.merchant_id ORDER BY s.month_date ASC
           ) AS prior_year_same_month_volume
    FROM Merchants m
    CROSS JOIN CalendarMonths s
    LEFT JOIN MonthlyMerchantVolume v 
        ON m.merchant_id = v.merchant_id AND s.month_date = v.volume_month
)
SELECT merchant_id,
       month_date AS churn_month,
       prior_month_volume AS last_active_volume
FROM MerchantActivitySpine
WHERE current_volume = 0
  AND prior_month_volume > 0
  -- Exclude historical seasonal dips (if they also did $0 exactly 12 months ago)
  AND prior_year_same_month_volume > 0;
```

---

## Scenario 2: Netflix — Usage Drop-Off as a Leading Indicator of Churn

### The Scenario:
Product executives at Netflix know that subscribers rarely cancel on a whim. Churn is almost always preceded by a steep decline in viewing hours in the 30 days prior to billing renewal.

**The Question**:
> Write an SQL query to identify active subscribers whose average daily streaming minutes in the last 7 days dropped by more than 50% compared to their 30-day baseline average.

### The Production Query:
```sql
WITH DailyStreaming AS (
    SELECT user_id,
           session_date,
           SUM(duration_minutes) AS daily_minutes
    FROM ViewingSessions
    GROUP BY user_id, session_date
),
RollingAverages AS (
    SELECT user_id,
           session_date,
           daily_minutes,
           -- 7-day rolling average
           AVG(daily_minutes) OVER (
               PARTITION BY user_id 
               ORDER BY session_date ASC
               ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
           ) AS avg_7d_minutes,
           -- 30-day rolling baseline average
           AVG(daily_minutes) OVER (
               PARTITION BY user_id 
               ORDER BY session_date ASC
               ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
           ) AS avg_30d_minutes
    FROM DailyStreaming
)
SELECT user_id,
       session_date,
       ROUND(avg_7d_minutes, 1) AS recent_7d_avg,
       ROUND(avg_30d_minutes, 1) AS baseline_30d_avg,
       ROUND((avg_7d_minutes - avg_30d_minutes) * 100.0 / NULLIF(avg_30d_minutes, 0), 1) AS dropoff_pct
FROM RollingAverages
WHERE session_date = CURRENT_DATE - INTERVAL 1 DAY
  AND avg_30d_minutes >= 30.0 -- Filter for established regular viewers
  AND avg_7d_minutes < (avg_30d_minutes * 0.50);
```

---

## Scenario 3: Spotify — Free-to-Premium Cumulative Conversion Lag

### The Scenario:
Growth marketers want to know how quickly free-tier listeners convert to paid Spotify Premium. Is conversion driven by day-1 onboarding promotions, or do users listen for 3+ months before subscribing?

**The Question**:
> For each monthly signup cohort, calculate the percentage of users who converted to Premium within $\le 7$ days, $\le 30$ days, $\le 60$ days, and $\le 90$ days.

### The Production Query:
```sql
WITH UserSignups AS (
    SELECT user_id,
           signup_date,
           DATE_FORMAT(signup_date, '%Y-%m-01') AS cohort_month
    FROM Users
),
FirstPremiumConversion AS (
    SELECT user_id,
           MIN(subscription_start_date) AS premium_converted_date
    FROM Subscriptions
    WHERE plan_type IN ('Premium', 'Family', 'Student')
    GROUP BY user_id
),
CohortConversionDeltas AS (
    SELECT u.cohort_month,
           u.user_id,
           DATEDIFF(p.premium_converted_date, u.signup_date) AS days_to_conversion
    FROM UserSignups u
    LEFT JOIN FirstPremiumConversion p ON u.user_id = p.user_id
)
SELECT 
    cohort_month,
    COUNT(user_id) AS total_cohort_signups,
    ROUND(SUM(CASE WHEN days_to_conversion <= 7 THEN 1 ELSE 0 END) * 100.0 / COUNT(user_id), 2) AS converted_7d_pct,
    ROUND(SUM(CASE WHEN days_to_conversion <= 30 THEN 1 ELSE 0 END) * 100.0 / COUNT(user_id), 2) AS converted_30d_pct,
    ROUND(SUM(CASE WHEN days_to_conversion <= 60 THEN 1 ELSE 0 END) * 100.0 / COUNT(user_id), 2) AS converted_60d_pct,
    ROUND(SUM(CASE WHEN days_to_conversion <= 90 THEN 1 ELSE 0 END) * 100.0 / COUNT(user_id), 2) AS converted_90d_pct
FROM CohortConversionDeltas
GROUP BY cohort_month
ORDER BY cohort_month ASC;
```

---

## Scenario 4: Uber — Driver-Partner Weekly Retention Curves

### The Scenario:
Uber runs extensive onboarding guarantees for newly activated drivers. Operations teams monitor Driver Retention across Week 1, Week 2, Week 3, and Week 4 after passing background checks.

**The Question**:
> Group drivers by activation week and report the weekly retention rate: what % of activated drivers completed at least 1 trip in Week $0$, Week $1$, Week $2$, Week $3$, and Week $4$?

### The Production Query:
```sql
WITH DriverActivation AS (
    SELECT driver_id,
           DATE_SUB(activation_date, INTERVAL WEEKDAY(activation_date) DAY) AS cohort_week
    FROM Drivers
    WHERE status = 'activated'
),
DriverTrips AS (
    SELECT t.driver_id,
           a.cohort_week,
           FLOOR(DATEDIFF(t.trip_completed_at, a.cohort_week) / 7) AS week_number
    FROM Trips t
    JOIN DriverActivation a ON t.driver_id = a.driver_id
    WHERE t.status = 'completed'
),
DriverActiveWeeks AS (
    SELECT cohort_week,
           driver_id,
           week_number
    FROM DriverTrips
    WHERE week_number BETWEEN 0 AND 4
    GROUP BY cohort_week, driver_id, week_number
),
CohortTotals AS (
    SELECT cohort_week, COUNT(DISTINCT driver_id) AS total_drivers
    FROM DriverActivation
    GROUP BY cohort_week
)
SELECT 
    c.cohort_week,
    c.total_drivers,
    ROUND(COUNT(DISTINCT CASE WHEN w.week_number = 0 THEN w.driver_id END) * 100.0 / c.total_drivers, 1) AS w0_active_pct,
    ROUND(COUNT(DISTINCT CASE WHEN w.week_number = 1 THEN w.driver_id END) * 100.0 / c.total_drivers, 1) AS w1_active_pct,
    ROUND(COUNT(DISTINCT CASE WHEN w.week_number = 2 THEN w.driver_id END) * 100.0 / c.total_drivers, 1) AS w2_active_pct,
    ROUND(COUNT(DISTINCT CASE WHEN w.week_number = 3 THEN w.driver_id END) * 100.0 / c.total_drivers, 1) AS w3_active_pct,
    ROUND(COUNT(DISTINCT CASE WHEN w.week_number = 4 THEN w.driver_id END) * 100.0 / c.total_drivers, 1) AS w4_active_pct
FROM CohortTotals c
LEFT JOIN DriverActiveWeeks w ON c.cohort_week = w.cohort_week
GROUP BY c.cohort_week, c.total_drivers
ORDER BY c.cohort_week ASC;
```
