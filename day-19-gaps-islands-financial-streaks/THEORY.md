# 📚 Day 19 Deep-Dive Theory: Gaps & Islands Physics, Sessionization & Continuous Ledger Balances

---

## 🏛️ 1. The Gaps and Islands Problem Formally Defined

In temporal and sequential datasets, a **Gap** represents missing sequence numbers or inactive time intervals, while an **Island** represents a contiguous streak of consecutive occurrences.

```text
Sequence:  1, 2, 3,    7, 8,    12, 13, 14, 15
Islands:  [ 1 - 3 ]   [ 7 - 8 ]   [ 12 - 15 ]
Gaps:              [4-6]       [9-11]
```

Relational databases do not have a native `GROUP BY IS_CONTIGUOUS` keyword. We must mathematically construct a grouping invariant!

---

## 🔬 2. Technique 1: The Row-Number Difference (`rn_diff`)

Consider a set of login dates: `2026-10-01, 2026-10-02, 2026-10-03, 2026-10-07, 2026-10-08`.

| Date ($D$) | `ROW_NUMBER()` ($R$) | Difference ($D - R \text{ days}$) | Island Group Identifier |
| :---: | :---: | :---: | :---: |
| `2026-10-01` | 1 | `2026-09-30` | **Island A** |
| `2026-10-02` | 2 | `2026-09-30` | **Island A** |
| `2026-10-03` | 3 | `2026-09-30` | **Island A** |
| `2026-10-07` | 4 | `2026-10-03` | **Island B** |
| `2026-10-08` | 5 | `2026-10-03` | **Island B** |

### Mathematical Invariant:
When dates are contiguous, both the date value and the row number increase by exactly $+1$ for each step.
Therefore, their difference $(Date - RowNum)$ remains **strictly constant**!
When a gap occurs, the date jumps forward by $> 1$, while row number advances by only $+1$, instantly shifting the difference to a new constant value.

```sql
WITH Sequenced AS (
    SELECT 
        user_id,
        login_date,
        login_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date))::INT AS grp
    FROM user_logins
)
SELECT 
    user_id,
    MIN(login_date) AS streak_start,
    MAX(login_date) AS streak_end,
    COUNT(*) AS streak_length_days
FROM Sequenced
GROUP BY user_id, grp;
```

---

## ⚡ 3. Technique 2: The Step-Transition Cumulative Sum (Sessionization)

When tracking web events or trading ticks, sessions are defined by an **inactivity threshold** (e.g. 30 minutes of silence starts a new session). The dates are non-integer timestamps, so the Row-Number difference cannot apply.

### The Cumulative Flag Algorithm:
1. Use `LAG(event_time)` to inspect the preceding event.
2. If `event_time - prev_time > INTERVAL '30 minutes'` (or if `prev_time IS NULL`), emit flag `1` (new session). Else emit `0`.
3. Compute a running cumulative sum: `SUM(flag) OVER (ORDER BY event_time)`.
4. The cumulative sum produces a monotonically increasing integer that uniquely labels each session island!
