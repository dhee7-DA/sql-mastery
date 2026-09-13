# 🧠 Day 07b Theory: Set Operations, Multi-Dimensional Grouping & Indexing Physics

---

## 1. Set Operations: Relational Algebra & Vertical Stacking

While relational joins combine relations **horizontally** (expanding column attributes based on foreign key match predicates), Set Operations combine relations **vertically** (stacking tuples along common relational schemas).

```text
       HORIZONTAL (JOIN)                           VERTICAL (SET OPERATION)
Table A (3 cols)  Table B (2 cols)           Table A (3 cols)        Table B (3 cols)
┌───┬───┬───┐     ┌───┬───┐                 ┌───┬───┬───┐           ┌───┬───┬───┐
│ID │Col│Col│  +  │ID │Val│                 │ID │Col│Val│     +     │ID │Col│Val│
└───┴───┴───┘     └───┴───┘                 └───┴───┴───┘           └───┴───┴───┘
         │                                                │
         ▼                                                ▼
┌───┬───┬───┬───┬───┐                       ┌───┬───┬───┐
│ID │Col│Col│ID │Val│ (5 cols)              │ID │Col│Val│
└───┴───┴───┴───┴───┘                       ├───┼───┼───┤
                                            │ID │Col│Val│ (3 cols, stacked rows)
                                            └───┴───┴───┘
```

### 1.1 The Invariant Rules of Set Operations
1. **Column Cardinality Invariant**: Every `SELECT` query in the compound statement must project the **exact same number of columns**.
2. **Datatype Compatibility**: Corresponding columns from left to right must have compatible or implicitly castable datatypes (e.g., `INT` with `BIGINT`, or `VARCHAR(20)` with `VARCHAR(50)`).
3. **Column Alias Precedence**: The final result set's column names are determined **strictly by the first `SELECT` statement**. Column aliases in subsequent queries are completely ignored.
4. **Global `ORDER BY` Rule**: Individual component queries cannot have independent `ORDER BY` clauses (unless wrapped in parentheses or derived tables). A single `ORDER BY` may appear at the very end to sort the entire unioned dataset.

---

## 2. Memory & Physical Execution: `UNION` vs. `UNION ALL`

| Dimension | `UNION ALL` | `UNION` |
|:---|:---|:---|
| **Mathematical Concept** | Multiset Bag Union ($A \uplus B$) | Pure Mathematical Set Union ($A \cup B$) |
| **Duplicates** | Preserved exactly as they appear | Completely purged / deduplicated |
| **Physical Algorithm** | Direct stream pipeline | Stream $\implies$ In-Memory Hash Table / External Sort $\implies$ Unique Filter |
| **Memory Allocation** | Minimal buffer $\mathcal{O}(1)$ | Hash table / Temp table proportional to row count $\mathcal{O}(N)$ |
| **Spill to Disk Risk** | Zero | High if combined dataset exceeds `work_mem` / `tmp_table_size` |
| **Engineering Rule** | **Default to `UNION ALL`** unless de-duplication is explicitly required by business logic. |

---

## 3. `INTERSECT` and `EXCEPT` / `MINUS`

- **`INTERSECT`**: Returns only tuples that exist in **both** query $A$ and query $B$. Purges duplicates.
- **`EXCEPT`** (PostgreSQL/SQL Server/ANSI) / **`MINUS`** (Oracle): Returns tuples that exist in query $A$ **excluding** any tuples that appear in query $B$.

### Simulating Set Operators in Older Engines (e.g. MySQL < 8.0.31)
- **`INTERSECT` Simulation**:
  ```sql
  -- Equivalent to: SELECT id FROM A INTERSECT SELECT id FROM B;
  SELECT DISTINCT a.id 
  FROM table_a AS a
  INNER JOIN table_b AS b ON a.id = b.id;
  ```
- **`EXCEPT` Simulation**:
  ```sql
  -- Equivalent to: SELECT id FROM A EXCEPT SELECT id FROM B;
  SELECT DISTINCT a.id 
  FROM table_a AS a
  WHERE NOT EXISTS (
      SELECT 1 FROM table_b AS b WHERE b.id = a.id
  );
  ```

---

## 4. Multi-Dimensional Grouping: `GROUPING SETS`, `ROLLUP`, and `CUBE`

In standard SQL, computing metrics at multiple dimensional aggregations (e.g., store total, region total, and national total) traditionally required writing 3 separate queries and gluing them together with `UNION ALL`. This forced the database to perform **3 separate full table scans**.

Advanced grouping constructs evaluate all required grouping dimensional sets in a **single sequential pass**.

### 4.1 `ROLLUP` (Hierarchical Aggregation)
Generates hierarchical subtotals along a specified dimensional path:
$$\text{ROLLUP}(A, B, C) \implies \{(A, B, C), (A, B), (A), ()\}$$
For $N$ columns, `ROLLUP` produces exactly **$N + 1$ grouping levels**.
- Ideal for natural containment hierarchies: `Year -> Quarter -> Month` or `Region -> Country -> Store`.

### 4.2 `CUBE` (Combinatorial Cross-Tabulation)
Generates every possible mathematical subset of the specified dimensions (the power set):
$$\text{CUBE}(A, B) \implies \{(A, B), (A), (B), ()\}$$
For $N$ columns, `CUBE` produces **$2^N$ grouping levels**.
- Ideal for multi-factor OLAP reporting (e.g., cross-tabulating `ProductCategory`, `SalesChannel`, and `CustomerSegment`).

### 4.3 `GROUPING SETS` (Custom Dimensions)
Allows the engineer to specify an exact, custom list of aggregation tuples without generating unneeded combinations:
```sql
GROUP BY GROUPING SETS (
    (region, store_id),
    (region),
    ()
);
```

### 4.4 The `GROUPING()` Indicator Function
When an engine rolls up a dimension, it sets the rolled-up column's value to `NULL`.
**The Critical Ambiguity**: If a row in your base data legitimately has a `NULL` region, how do you differentiate a real `NULL` from a generated grand-total `NULL`?
- `GROUPING(col)` returns `1` if the column is currently aggregated away (rolled up into a subtotal).
- `GROUPING(col)` returns `0` if the column value represents a genuine row value.

```sql
SELECT 
    CASE WHEN GROUPING(region) = 1 THEN 'All Regions (Grand Total)' ELSE region END AS region_label,
    SUM(revenue) AS total_revenue
FROM sales
GROUP BY ROLLUP(region);
```

---

## 5. B-Tree Indexing Architecture & Sargability

### 5.1 B-Tree Physical Layout
A B-Tree (Balanced Tree) index stores keys in sorted order across 8KB / 16KB disk pages:
1. **Root Page**: Entry point for binary search.
2. **Branch (Internal) Pages**: Pointers guiding navigation down the tree.
3. **Leaf Pages**: Doubly-linked list of actual index keys.
   - **Clustered Index**: Leaf pages contain the **actual table data rows** (in MySQL InnoDB, the Primary Key is always the Clustered Index).
   - **Secondary (Non-Clustered) Index**: Leaf pages contain the indexed columns plus the **Clustered Index Key** (pointer). Looking up unindexed columns requires a secondary "Key Lookup" / "Bookmark Lookup".

### 5.2 The 3 Core Access Paths
1. **Index Seek (Const / Ref / Range)**: Logarithmic binary traversal directly to the exact target leaf page ($\mathcal{O}(\log N)$). Blazingly fast.
2. **Index Scan (Index Full Scan)**: Scans every leaf page of the index sequentially ($\mathcal{O}(N)$). Fast if index is much narrower than the base table.
3. **Table Scan (ALL / Seq Scan)**: Reads every page of the physical table from disk ($\mathcal{O}(N)$). Slowest access path for targeted queries.

### 5.3 Sargability (Search Argument Able)
A query predicate is **sargable** if the database engine can utilize an index seek directly rather than evaluating a function on every row.

| Anti-Pattern (Non-Sargable / Kills Index ❌) | Sargable Refactoring (Fast Index Seek ⚡) |
|:---|:---|
| `WHERE YEAR(created_at) = 2026` | `WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'` |
| `WHERE SUBSTRING(phone, 1, 3) = '415'` | `WHERE phone LIKE '415%'` |
| `WHERE amount * 1.08 > 100` | `WHERE amount > 100 / 1.08` |
| `WHERE UPPER(email) = 'ALICE@CORP.COM'` | Store normalized lowercase or use functional index |

---

## 6. Reading `EXPLAIN` and `EXPLAIN ANALYZE`

- `EXPLAIN`: Shows the optimizer's **estimated execution plan** based on table statistics (cardinality, cost, join order).
- `EXPLAIN ANALYZE`: Actually **executes** the query and reports both the optimizer's estimates AND the real runtime metrics (actual time to first row, total time, actual row count, loop iterations).
