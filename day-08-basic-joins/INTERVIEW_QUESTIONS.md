# 💼 Day 08 — Tier-1 & FAANG SQL Interview Questions: Relational Joins

---

### Question 1: What is the exact difference between putting a filter in the `ON` clause versus the `WHERE` clause of a `LEFT JOIN`?

**Senior Interview Answer**:
> "In a `LEFT JOIN`, the `ON` clause dictates **join qualification**, whereas the `WHERE` clause dictates **post-join row filtering**.
>
> If a predicate on the right table is placed in the `ON` clause, unmatched left-table rows are still preserved and padded with `NULL`. 
>
> If that same predicate is placed in the `WHERE` clause, any unmatched row that was padded with `NULL` will evaluate to `UNKNOWN` when compared against the filter value (e.g., `NULL = 'ACTIVE'` ➡️ `UNKNOWN`). Because the `WHERE` clause requires a `TRUE` truth value to retain a row, all unmatched left-table rows are discarded, **silently converting the `LEFT JOIN` into an `INNER JOIN`**."

---

### Question 2: What happens when you join two tables on a column that contains `NULL` values?

**Code Example**:
```sql
-- Table A has rows: (1), (NULL), (2)
-- Table B has rows: (1), (NULL), (3)
SELECT * 
FROM TableA a 
INNER JOIN TableB b ON a.id = b.id;
```
**Expected Output**:
> Only row `(1, 1)` is returned!
> 
> **Theoretical Reason**: Under SQL's Three-Valued Logic (3VL), `NULL = NULL` yields `UNKNOWN`, not `TRUE`. Because the `ON` join predicate only matches when the condition evaluates to `TRUE`, `NULL` never matches with another `NULL`.
>
> 💡 *Pro Tip*: If you ever need `NULL` values to match each other in a join, use the null-safe equality operator `<=>` in MySQL:
> ```sql
> ON a.id <=> b.id  -- Evaluates to TRUE if both are NULL
> ```

---

### Question 3: Compare the 3 ways to find unmatched rows (Anti-Joins): `LEFT JOIN ... WHERE IS NULL`, `NOT IN`, and `NOT EXISTS`. Which should you use in production?

| Method | Syntax | Null Safety Trap? | Optimizer Preference |
|---|---|---|---|
| **`LEFT JOIN ... WHERE IS NULL`** | `FROM A LEFT JOIN B ON A.id = B.id WHERE B.id IS NULL` | **Safe** | Highly optimized via indexed lookups. |
| **`NOT EXISTS`** | `WHERE NOT EXISTS (SELECT 1 FROM B WHERE B.id = A.id)` | **Safe** | Preferred in modern engines; stops scanning immediately upon first match (short-circuit). |
| **`NOT IN`** | `WHERE A.id NOT IN (SELECT id FROM B)` | **🚨 DANGEROUS!** | If `B.id` contains even a **single NULL**, `NOT IN` returns **0 rows** for the entire query! |

> **Verdict**: Use `NOT EXISTS` or `LEFT JOIN ... WHERE IS NULL`. Avoid `NOT IN` on nullable columns.

---

### Question 4: What is a "Cardinality Explosion" (Cartesian Fanout) in a One-to-Many Join?

**Senior Interview Scenario**:
> "You join `Customers` to `Orders` to calculate total spend, then join `Customers` to `SupportTickets` to count open complaints. Why is the total spend calculation wildly inflated?"

**Root Cause**:
> If a customer has 3 orders and 4 support tickets, joining both tables directly to `Customers` produces $1 \times 3 \times 4 = 12$ rows for that single customer!
> 
> Every order amount is duplicated 4 times across each ticket row. Summing `order_amount` will compute $4\times$ the actual revenue!
>
> **Production Remedy**: Pre-aggregate each child table independently in a Common Table Expression (CTE) or subquery before joining to the parent:
> ```sql
> WITH customer_spend AS (
>     SELECT customer_id, SUM(total_amount) AS total_spend FROM Orders GROUP BY customer_id
> ),
> customer_tickets AS (
>     SELECT customer_id, COUNT(*) AS ticket_count FROM SupportTickets GROUP BY customer_id
> )
> SELECT c.name, cs.total_spend, ct.ticket_count
> FROM Customers c
> LEFT JOIN customer_spend cs ON c.customer_id = cs.customer_id
> LEFT JOIN customer_tickets ct ON c.customer_id = ct.customer_id;
> ```
