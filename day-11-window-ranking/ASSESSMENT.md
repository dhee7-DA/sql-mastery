# 🎯 Day 11: Mastery Assessment & Skill Verification

---

## 🏆 Concept Competency Scorecard

| Skill Category | Target Objective | Status | Evidence / Artifact |
|:---|:---|:---:|:---|
| **Lexical vs. Physical Pipeline** | Explain why window functions cannot appear in `WHERE`/`HAVING` and describe the `QUALIFY` alternative. | 🟢 Mastered | [`THEORY.md`](./THEORY.md#2-the-physical-execution-pipeline-the-order-of-operations) |
| **Ranking Disambiguation** | Articulate exact behavioral divergence between `ROW_NUMBER`, `RANK`, and `DENSE_RANK` on tied keys. | 🟢 Mastered | [`THEORY.md`](./THEORY.md#3-the-big-4-ranking-functions-deep-mathematical-dissection) & [`queries.sql`](./queries.sql) |
| **Quantile Segmentation** | Calculate remainder distribution logic for `NTILE(k)` across odd row counts. | 🟢 Mastered | [`SOLUTIONS_BREAKDOWN.md`](./SOLUTIONS_BREAKDOWN.md#challenge-3-customer-revenue-deciles--quartiles-ntile) |
| **Deduplication Engineering** | Write deterministic deduplication queries with secondary tie-breakers. | 🟢 Mastered | [`queries.sql`](./queries.sql#challenge-2-latest-state-deduplication-canonical-pipeline-pattern) |
| **Gaps-and-Islands Math** | Formulate date-arithmetic streak clustering using monotonic sequence subtraction. | 🟢 Mastered | [`THEORY.md`](./THEORY.md#5-advanced-algebraic-pattern-gaps-and-islands-via-rownumber-offset) |

---

## 🔬 Self-Evaluation Rubric

### 1. Conceptual Rigor (Score: 5/5)
- Understood that window functions preserve row cardinality ($N \to N$) unlike `GROUP BY` ($N \to 1$).
- Mastered the difference between competition ranking (`RANK()`) and compact level ranking (`DENSE_RANK()`).

### 2. Syntactic Precision (Score: 5/5)
- Seamlessly deployed `OVER (PARTITION BY ... ORDER BY ...)` syntax within CTEs.
- Correctly handled `NULLIF(col, 0)` in calculated ratios before windowing.

### 3. Edge-Case Preparedness (Score: 5/5)
- Prevented non-deterministic sorting in deduplication by adding unique secondary keys.
- Guaranteed distinct dates before applying gaps-and-islands sequence offsets.

---

## 🚀 Sign-off & Advancement
Day 11 is formally certified complete. Ready to proceed to **Day 12: Window Functions — Aggregates, Value Offsets (LAG/LEAD) & Rolling Frames**.
