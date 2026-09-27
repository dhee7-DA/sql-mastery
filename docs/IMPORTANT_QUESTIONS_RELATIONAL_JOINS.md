# 💼 Important Interview & Technical Questions: Relational JOINs Master Vault

> **Direct Reference**: This document serves as the high-priority index for the **Relational JOINs Master Vault (420 Production Scenarios across 7 Disciplines)**.
> For the exhaustive problem-by-problem inventory and implementation templates, see:
> 👉 [`docs/IMPORTANT_MATERIALS_RELATIONAL_JOINS.md`](./IMPORTANT_MATERIALS_RELATIONAL_JOINS.md)
> 👉 [`day-08-basic-joins/INTERVIEW_QUESTIONS.md`](../day-08-basic-joins/INTERVIEW_QUESTIONS.md)

---

## 🎯 Top Tier-1 & FAANG Interview Questions on Relational Joins

### Q1: The `ON` vs `WHERE` Predicate Placement Trap in Outer Joins
* **Question**: Why does filtering a `LEFT JOIN`'s right table in the `WHERE` clause silently convert it into an `INNER JOIN`?
* **Answer**: The `ON` clause acts as the **join qualification filter**; if a row fails the `ON` condition, the left row is still retained with right-table columns padded with `NULL`. In contrast, the `WHERE` clause executes **post-join**; any predicate like `WHERE right_table.status = 'ACTIVE'` evaluates against `NULL = 'ACTIVE'`, which yields `UNKNOWN` in SQL's Three-Valued Logic (3VL). Because `WHERE` requires `TRUE` to keep a row, all unmatched left rows are discarded.

---

### Q2: Cardinality Multiplicative Fan-Out (Cartesian Duplication)
* **Question**: What causes revenue figures to inflate by 300%–1000% when joining orders and support tickets to a customer table simultaneously?
* **Answer**: If a customer has 3 orders and 4 support tickets, a naive multi-join produces $1 \times 3 \times 4 = 12$ rows. Every order amount is multiplied across each ticket row.
* **Production Fix**: Pre-aggregate child tables in independent CTEs before joining to the parent dimension.

---

### Q3: The Missing `COALESCE` Bug in `FULL OUTER JOIN`
* **Question**: Why does selecting `SELECT a.account_id, ... FROM a FULL OUTER JOIN b ON a.account_id = b.account_id` introduce unexpected `NULL`s in reporting?
* **Answer**: When a record exists in Table B but not in Table A, `a.account_id` is evaluated as `NULL`. In any full outer join, dimension keys must always be projected with `COALESCE(a.account_id, b.account_id)`.

---

### Q4: Non-Equi Joins & As-Of Point-in-Time Integrity
* **Question**: How do you join trade executions to the prevailing bid/ask quote when quotes change irregularly throughout the trading day?
* **Answer**: Use a non-equi join on half-open intervals:
  ```sql
  FROM trades t
  JOIN quote_ticks q
    ON t.symbol = q.symbol
   AND t.execution_time >= q.valid_from
   AND (q.valid_to IS NULL OR t.execution_time < q.valid_to)
  ```
  This prevents duplicate matching on timestamp boundary collisions.

---

## 📊 Summary Matrix: Which Join Solves Which Business Requirement?

| Join Discipline | Symbol | Primary Production Requirement | Trap Focus / Silent Gotcha |
| :--- | :---: | :--- | :--- |
| **`INNER JOIN`** | `⋈` | Strict 2-sided entity match (e.g. Cleared trades, Paid invoices) | Silent data eviction of unmatched/null keys; Cartesian fan-out |
| **`LEFT JOIN`** | `⟕` | Preserve primary domain entity (e.g. Churn audit, Dormant accounts) | Downstream `WHERE` predicate converts query to `INNER JOIN` |
| **`RIGHT JOIN`** | `⟖` | Master taxonomy / regulatory coverage audit | Direction inversion and optimizer readability bugs |
| **`FULL OUTER JOIN`** | `⟗` | Dual-sided bank vs ledger reconciliation | Uncoalesced keys returning `NULL` for right-only breaks |
| **`CROSS JOIN`** | `✕` | Date spines, FX matrices ($N \times N$), sensitivity stress-tests | Unfiltered Cartesian explosion causing OOM / disk spills |
| **`SELF JOIN`** | `⟲` | Management hierarchy trees, consecutive-day price changes | Circular self-reference loops and duplicate mirror pairs |
| **`NON-EQUI JOIN`** | `≶` | Tax brackets, fee tiers, SCD Type-2 point-in-time as-of joins | Ambiguous boundary overlap causing multi-tier duplicate matches |

---

## 🗺️ Problem Inventory by Discipline (60 Questions Each)

1. **`INNER JOIN`**: 20 Easy (Lvl 1–20), 20 Medium (Lvl 21–40), 20 Hard (Lvl 41–60)
2. **`LEFT JOIN`**: 20 Easy (Lvl 1–20), 20 Medium (Lvl 21–40), 20 Hard (Lvl 41–60)
3. **`RIGHT JOIN`**: 20 Easy (Lvl 1–20), 20 Medium (Lvl 21–40), 20 Hard (Lvl 41–60)
4. **`FULL OUTER JOIN`**: 20 Easy (Lvl 1–20), 20 Medium (Lvl 21–40), 20 Hard (Lvl 41–60)
5. **`CROSS JOIN`**: 20 Easy (Lvl 1–20), 20 Medium (Lvl 21–40), 20 Hard (Lvl 41–60)
6. **`SELF JOIN`**: 20 Easy (Lvl 1–20), 20 Medium (Lvl 21–40), 20 Hard (Lvl 41–60)
7. **`NON-EQUI JOIN`**: 20 Easy (Lvl 1–20), 20 Medium (Lvl 21–40), 20 Hard (Lvl 41–60)

*All 420 problems are live in the interactive browser visualizer at `http://localhost:8000/visualizer/index.html` (Section 05).*
