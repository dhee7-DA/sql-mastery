# 💼 Day 16 Senior & Staff Engineer Interview Questions: Query Optimization

---

### Q1: What does `EXPLAIN (ANALYZE, BUFFERS)` do, and why should you never run `EXPLAIN ANALYZE` blindly in production?
**Target Level**: Staff Database Infrastructure Engineer (Meta, Stripe)

`EXPLAIN` alone generates the query execution plan based on statistical estimates without running the query.
`EXPLAIN (ANALYZE, BUFFERS)` physically executes the query to completion, measuring actual elapsed wall-clock time per plan node and logging the exact count of 8KB buffer pool pages hit, read from disk, dirtied, and written.

**Production Danger**: Because `EXPLAIN ANALYZE` actually executes the query:
1. Executing an `EXPLAIN ANALYZE DELETE FROM users WHERE ...` or an unoptimized update will permanently mutate or delete production data!
2. A catastrophic runaway query will consume $100\%$ CPU and disk I/O, starving the production database.

---

### Q2: What is the "Leading Column Rule" in composite B+Tree indexes?
**Target Level**: Senior Backend Engineer (Amazon, Uber)

In a composite index on columns `(A, B, C)`:
- The B+Tree is sorted first by `A`. For ties in `A`, it is sorted by `B`. For ties in `B`, it is sorted by `C`.
- The index can be used for queries filtering on:
  - `(A)`
  - `(A, B)`
  - `(A, B, C)`
- However, a query filtering solely on `(B)` or `(C)` **cannot** perform a direct B+Tree root-to-leaf binary search because the tree is not globally sorted by `B`! The engine must either perform an `Index Skip Scan` or fallback to a full table `Seq Scan`.
