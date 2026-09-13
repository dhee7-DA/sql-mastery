# 🎯 Day 12: Mastery Assessment & Skill Verification

---

## 🏆 Concept Competency Scorecard

| Skill Category | Target Objective | Status | Evidence / Artifact |
|:---|:---|:---:|:---|
| **Inter-Row Navigation** | Deploy `LAG()` and `LEAD()` with explicit offset counts and default fallbacks. | 🟢 Mastered | [`THEORY.md`](./THEORY.md#3-the-value-offset-navigation-functions-lag--lead) & [`queries.sql`](./queries.sql) |
| **Physical Frame Physics** | Articulate exact behavioral difference between `ROWS` and `RANGE` on tied sort keys. | 🟢 Mastered | [`THEORY.md`](./THEORY.md#2-the-deadly-trap-rows-vs-range) |
| **Growth Rate Modeling** | Compute MoM and YoY revenue percentage growth with division-by-zero protection. | 🟢 Mastered | [`SOLUTIONS_BREAKDOWN.md`](./SOLUTIONS_BREAKDOWN.md#challenge-1-saas-monthly-revenue--mom-growth-acceleration) |
| **Moving Averages** | Construct trailing $n$-day smoothed moving averages using `ROWS BETWEEN n-1 PRECEDING`. | 🟢 Mastered | [`queries.sql`](./queries.sql#challenge-3-7-day-smoothed-moving-average-of-user-signups) |
| **Frame Boundary Traps** | Avoid the `LAST_VALUE()` current-row truncation trap. | 🟢 Mastered | [`THEORY.md`](./THEORY.md#4-the-lastvalue-frame-gotcha-senior-interview-classic) |

---

## 🔬 Self-Evaluation Rubric

### 1. Conceptual Rigor (Score: 5/5)
- Fully mastered the concept of sliding aperture frames across continuous partitions.
- Internalized why default `RANGE` causes silent balance inflation in financial ledgers.

### 2. Syntactic Precision (Score: 5/5)
- Written clean, readable ANSI SQL with standard `ROWS BETWEEN ...` syntax.
- Protected financial division using `NULLIF(LAG(), 0)`.

### 3. Production Readiness (Score: 5/5)
- Handled boundary `NULL` conditions on first/last rows without breaking analytical dashboards.
- Applied secondary deterministic sort keys (`ORDER BY date ASC, id ASC`) across all queries.

---

## 🚀 Sign-off & Advancement
Day 12 is formally certified complete. Both halves of the Window Functions track (Ranking & Aggregates) are **100% conquered**. Ready to proceed to **Day 13: Business Analytics & Retention Cohorts**.
