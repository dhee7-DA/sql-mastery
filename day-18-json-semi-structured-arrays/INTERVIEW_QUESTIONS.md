# 💼 Day 18 Senior & Staff Engineer Interview Questions: Semi-Structured Data

---

### Q1: Why is `jsonb_path_ops` faster and smaller than `jsonb_ops`, and when should you choose one over the other?
**Target Level**: Staff Database Infrastructure Engineer (Stripe, Uber)

- **`jsonb_ops`**: Creates separate GIN index entries for every key, every array element, and every scalar value.
  - Supports all operators: `@>`, `?` (key exists), `?|` (any key exists), `?&` (all keys exist).
  - High storage footprint and slower index updates on writes.
- **`jsonb_path_ops`**: Does not index individual keys in isolation. It generates a single 32-bit hash for the entire root-to-leaf path (e.g. `hash(user -> address -> city: London)`).
  - Index size is typically $40\%-60\%$ smaller.
  - Read queries using `@>` are noticeably faster because fewer posting lists must be intersected.
  - **Trade-off**: Cannot support key-existence checks (`WHERE payload ? 'email'`).

---

### Q2: What is a `LATERAL` join, and why can't standard `JOIN` be used to unnest a JSON array column?
**Target Level**: Senior Backend Engineer (Amazon, DoorDash)

In standard SQL, join subqueries are evaluated **independently** of the outer table:
```sql
-- ❌ SYNTAX ERROR IN STANDARD SQL:
SELECT * FROM orders o JOIN jsonb_array_elements(o.items) ON TRUE; 
-- Error: column "o.items" does not exist in the context of the join clause!
```
The table alias `o` is out of scope inside the join target.
With `CROSS JOIN LATERAL jsonb_array_elements(o.items)`:
`LATERAL` explicitly instructs the query planner to evaluate the function **once for every single row returned by `orders`**, passing the current row's `o.items` as a dynamic parameter!
