# 📚 Day 16 Deep-Dive Theory: Query Execution Plans, Cost Models & B+Tree Index Physics

---

## 🏛️ 1. The Relational Query Planner Pipeline

When an SQL statement is submitted to PostgreSQL or MySQL InnoDB, it undergoes a four-stage transformation:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               THE QUERY PLANNER PIPELINE                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ Raw SQL Query ] ──► [ SQL Parser ] ──► [ Query Rewriter / View Expander ]          │
│                                                                                        │
│                                           │                                            │
│                                           ▼                                            │
│                       [ Query Optimizer / Cost Estimator ]                             │
│                         ├── System Catalogs (pg_statistic, histograms)                 │
│                         ├── Cost Model: Disk I/O vs CPU evaluation                     │
│                         └── Join Ordering (Dynamic Programming / Genetic Query Opt)    │
│                                           │                                            │
│                                           ▼                                            │
│                             [ Physical Execution Plan ]                                │
│                                           │                                            │
│                                           ▼                                            │
│                             [ Storage Engine Execution ]                               │
│                         (Buffer Pool / Table Heap / Index Pages)                       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔬 2. PostgreSQL Cost Model Mathematics

PostgreSQL expresses plan costs in arbitrary units normalized against `seq_page_cost` (default: `1.0`, the cost of sequentially reading a single 8KB disk page).

$$ \text{Total Cost} = (N_{\text{pages}} \times \text{page\_cost}) + (N_{\text{tuples}} \times \text{cpu\_tuple\_cost}) + (N_{\text{operators}} \times \text{cpu\_operator\_cost}) $$

| Parameter | Default Value | Description |
| :--- | :---: | :--- |
| `seq_page_cost` | `1.0` | Cost of reading a sequential disk page from disk. |
| `random_page_cost` | `4.0` *(SSD: `1.1`)* | Cost of reading a non-sequential disk page (seeks). |
| `cpu_tuple_cost` | `0.01` | CPU cost of processing a single row in memory. |
| `cpu_index_tuple_cost`| `0.005` | CPU cost of scanning an index entry. |
| `cpu_operator_cost` | `0.0025` | CPU cost of evaluating an operator or function (e.g. `+`, `AND`). |

> **Production Tip**: On modern NVMe SSDs, `random_page_cost` should be lowered from `4.0` down to `1.1` or `1.25`. A high random page cost incorrectly biases the planner against index scans on SSD hardware!

---

## 🌳 3. B+Tree Storage Physics & Leaf Page Layout

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        B+TREE INDEX ROOT & BRANCHES                    │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                              [ Root Node ]                             │
│                               /         \                             │
│                    [ Branch Node ]    [ Branch Node ]                  │
│                      /        \          /         \                  │
│               [ Leaf 1 ] ◄──► [ Leaf 2 ] ◄──► [ Leaf 3 ]               │
│                   │               │               │                    │
│                   ▼               ▼               ▼                    │
│             [ Heap Tuple ]  [ Heap Tuple ]  [ Heap Tuple ]             │
│              (ctid: 0, 1)    (ctid: 0, 2)    (ctid: 0, 3)              │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Physical Properties:
1. **Balanced Depth**: Every leaf node resides at the exact same depth from the root ($O(\log N)$ seeks).
2. **Doubly-Linked Leaves**: All leaf pages are linked sequentially (`next_page`, `prev_page`), enabling ultra-fast range scans (`BETWEEN a AND b`) without re-traversing the root!
3. **Clustered vs. Non-Clustered**:
   - In **MySQL InnoDB**, the table *is* a clustered B+Tree keyed on the `PRIMARY KEY`. Leaf nodes contain the full row data.
   - In **PostgreSQL**, tables are unordered **Heaps**. Indexes store `(key, ctid)` pointers where `ctid = (page_number, tuple_offset)`.

---

## ⚡ 4. The 4 Scan Operators: From Worst to Best

1. **Sequential Scan (`Seq Scan`)**: Reads every 8KB block of the table heap sequentially. Best for fetching $> 20\%$ of the table or small tables.
2. **Index Scan (`Index Scan`)**: Traverses B+Tree to find matching leaf nodes, then performs random I/O seeks into the table heap to retrieve non-indexed columns.
3. **Bitmap Index Scan (`Bitmap Index Scan -> Bitmap Heap Scan`)**:
   - Stage 1: Traverses index and creates an in-memory TID bitmap of physical pages containing matching tuples.
   - Stage 2: Visits the table heap in sequential page order, converting random I/O into sequential disk access!
4. **Index Only Scan (`Index Only Scan`)**:
   - The holy grail of relational speed! All requested columns are present directly inside the index leaf nodes.
   - If the heap page is marked clean in the **Visibility Map**, the engine performs zero reads on the table heap!
