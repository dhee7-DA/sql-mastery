# 💼 Day 07: High-Frequency Technical Interview Questions

---

### Question 1: The 3VL Null Trap & Semi-Join Optimization (Meta / Data Infrastructure)
**Interviewer**: *"Look at this query written by a junior data engineer:"*
```sql
SELECT user_id FROM users
WHERE user_id NOT IN (
    SELECT banned_user_id FROM audit_log
);
```
*"In staging with 1,000,000 users and 50 banned users, this query unexpectedly returned 0 rows. What caused this? How would you fix it, and what does the optimizer do under the hood?"*

#### The Candidate Answer:
1. **Root Cause (3-Valued Logic)**:
   - In SQL, `val NOT IN (A, B, C)` expands to `(val != A AND val != B AND val != C)`.
   - If the `audit_log` table contains even a single record where `banned_user_id IS NULL`, the expression expands to include `AND val != NULL`.
   - In 3VL, any comparison with `NULL` evaluates to `UNKNOWN`.
   - Because `TRUE AND UNKNOWN` yields `UNKNOWN`, and a `WHERE` clause filters out anything not strictly `TRUE`, **every single candidate row evaluates to UNKNOWN and is dropped**.
2. **Production Fix**:
   - Rewrite using `NOT EXISTS`:
   ```sql
   SELECT u.user_id FROM users AS u
   WHERE NOT EXISTS (
       SELECT 1 FROM audit_log AS a
       WHERE a.banned_user_id = u.user_id
   );
   ```
3. **Optimizer Mechanics**:
   - Modern query planners (MySQL 8.0+, PostgreSQL, Presto) recognize `NOT EXISTS` as an **Anti-Semi-Join**.
   - Instead of running a nested loop for each user, the engine builds a hash table of all non-null `banned_user_id` values and probes it in $\mathcal{O}(1)$ time per outer row, short-circuiting immediately.

---

### Question 2: Subquery vs. CTE vs. Temp Table (Google / Staff Data Engineer)
**Interviewer**: *"When should you choose a Correlated Subquery vs. an inline CTE vs. a physical Temp Table (`#temp` / `CREATE TEMPORARY TABLE`)?"*

#### The Candidate Answer:
| Feature | Correlated Subquery | CTE (`WITH`) | Physical Temp Table |
|:---|:---|:---|:---|
| **Scope** | Single clause | Single statement | Current session / connection |
| **Materialization** | Inlined row-by-row | Inlined or ephemeral worktable | Materialized on disk/tempdb buffer |
| **Statistics & Indexes**| Relies on base table stats | No direct indexes can be added | Can have primary keys & B-Tree indexes |
| **Best Used For** | Targeted scalar thresholds | Modular, readable multi-step transformations | Massive datasets referenced repeatedly across multiple analytical passes |

- **Rule of Thumb**: Use CTEs for readability and standard analytical pipelines. If the intermediate dataset is $> 10\text{M}$ rows and must be joined across 5 subsequent complex queries, materialize into a Temp Table and index the join keys to avoid redundant recompilation.

---

### Question 3: Traversing Recursive Hierarchies with Cycles (Stripe / Risk Infrastructure)
**Interviewer**: *"Suppose we have a peer-to-peer money transfer table `transfers(sender_id, receiver_id)`. Write a query to find all users within 3 hops of a known fraudster (User 999). What happens if there is a cycle (User A sends to B, B sends to C, C sends back to A)?"*

#### The Candidate Answer:
```sql
WITH RECURSIVE fraud_network (user_id, hop_level, path) AS (
    -- Anchor: The known fraudster
    SELECT 
        receiver_id AS user_id, 
        1 AS hop_level,
        CAST(CONCAT('999->', receiver_id) AS CHAR(500)) AS path
    FROM transfers
    WHERE sender_id = 999

    UNION ALL

    -- Recursive Step: Next hop up to 3 hops
    SELECT 
        t.receiver_id,
        fn.hop_level + 1,
        CONCAT(fn.path, '->', t.receiver_id)
    FROM transfers AS t
    INNER JOIN fraud_network AS fn ON t.sender_id = fn.user_id
    WHERE fn.hop_level < 3
      -- Cycle Prevention: Ensure we don't revisit any node already in our path!
      AND fn.path NOT LIKE CONCAT('%->', t.receiver_id, '->%')
      AND fn.path NOT LIKE CONCAT('%->', t.receiver_id)
)
SELECT DISTINCT user_id, MIN(hop_level) AS shortest_hop
FROM fraud_network
GROUP BY user_id
ORDER BY shortest_hop ASC;
```
- **Cycle Prevention**: Without the cycle check, cyclic transfers create an infinite loop, eventually causing the query engine to abort with `ERROR 3636: Recursive query aborted after 1001 iterations`.

---

### Question 4: The Non-Window Top-N Idiom (Amazon / BI Engineer)
**Interviewer**: *"How do you find the 2nd highest salary in an employee table without using `LIMIT`, `TOP`, or Window Functions?"*

#### The Candidate Answer:
```sql
-- Approach: Correlated Subquery where count of higher salaries is exactly 1
SELECT MAX(salary) AS second_highest_salary
FROM employees AS e1
WHERE 1 = (
    SELECT COUNT(DISTINCT e2.salary)
    FROM employees AS e2
    WHERE e2.salary > e1.salary
);
```
- **Why this is powerful**: This proves mastery of set relationships. The $K$-th distinct value is mathematically defined as the value for which exactly $K-1$ distinct values are strictly greater.

---

### Question 5: Correlated Subquery vs Window Function Performance (Snowflake / Architecture)
**Interviewer**: *"If you can solve Top-N using both a Window Function (`DENSE_RANK() OVER (...)`) and a Correlated Subquery (`COUNT(*) < N`), why do cloud data warehouses strongly prefer Window Functions?"*

#### The Candidate Answer:
1. **Window Functions**: Sort the partition once ($\mathcal{O}(N \log N)$), stream rows through a single-pass window frame buffer ($\mathcal{O}(N)$), and assign rankings deterministically.
2. **Correlated Subqueries**: Require a nested self-join loop ($\mathcal{O}(N^2)$ without optimal index). In a distributed warehouse (Snowflake, BigQuery, Redshift), correlated subqueries cause expensive data shuffles (broadcasts) across worker nodes, generating massive network I/O bottlenecks.
