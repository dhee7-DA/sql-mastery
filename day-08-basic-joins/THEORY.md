# 📘 Day 08 — Relational Algebra & Basic Joins Architecture

> **Focus**: Relational theory, `INNER JOIN`, `LEFT OUTER JOIN`, `RIGHT OUTER JOIN`, `FULL OUTER JOIN` simulation, and the infamous `ON` vs `WHERE` predicate evaluation trap.

---

## 1. The Relational Model: Why We Join Tables

In a normalized relational database (3NF / Boyce-Codd Normal Form), data is decomposed into discrete, specialized tables to eliminate redundancy and update anomalies:
- An `Orders` table records financial transactions.
- A `Customers` table records identity and billing profiles.
- A `Products` table records SKU inventories.

A **JOIN** is the relational operator that reconstructs multi-entity relationships at query runtime using **Keys**:
- **Primary Key (PK)**: Uniquely identifies each row in the parent table.
- **Foreign Key (FK)**: A reference column in the child table pointing to the parent's PK.

```
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│           CUSTOMERS             │           │             ORDERS              │
├─────────────────────────────────┤           ├─────────────────────────────────┤
│ customer_id (PK)                │◄────┐     │ order_id (PK)                   │
│ name                            │     └─────┤ customer_id (FK)                │
│ email                           │           │ order_amount                    │
└─────────────────────────────────┘           └─────────────────────────────────┘
```

---

## 2. Logical Mechanics: How the SQL Engine Joins

Every join operation conceptually proceeds through three physical/logical phases:

### Phase 1: Cartesian Product (CROSS PRODUCT)
The engine considers every possible combination of rows between Table $A$ (size $M$) and Table $B$ (size $N$).
$$\text{Cardinality} = M \times N$$

### Phase 2: `ON` Predicate Evaluation
The engine evaluates the join condition (e.g., `A.id = B.customer_id`). Rows that evaluate to `TRUE` are preserved. Rows that evaluate to `FALSE` or `UNKNOWN` (due to `NULL`) are discarded from the inner set.

### Phase 3: Outer Row Preservation (For OUTER JOINs only)
- In a **`LEFT JOIN`**, any row from Table $A$ that found **zero matches** in Table $B$ during Phase 2 is forcibly added back to the result set, with all Table $B$ columns populated as `NULL`.
- In a **`RIGHT JOIN`**, unmatched rows from Table $B$ are preserved with Table $A$ columns as `NULL`.

---

## 3. The Core Join Spectrum

### 1. `INNER JOIN` (The Exact Match Intersection)
Returns rows only where the join predicate evaluates to `TRUE` in **both** tables.

```sql
SELECT c.name, o.order_amount
FROM customers c
INNER JOIN orders o
  ON c.customer_id = o.customer_id;
```
*Venn Diagram*: The shared overlapping lens between $A$ and $B$. Unmatched customers (no orders) and orphaned orders (deleted customers) are completely excluded.

---

### 2. `LEFT OUTER JOIN` (Left Table Preservation)
Returns **all** rows from the left table ($A$), plus matched rows from the right table ($B$). If no match exists, columns from $B$ are returned as `NULL`.

```sql
SELECT c.name, o.order_id, o.order_amount
FROM customers c
LEFT JOIN orders o
  ON c.customer_id = o.customer_id;
```
*Rule of Thumb*: Use `LEFT JOIN` whenever you want a report of "ALL entities, whether or not they have activity" (e.g., all sales reps and their revenue, including reps with 0 sales).

---

### 3. `RIGHT OUTER JOIN`
Mirror opposite of `LEFT JOIN`. Preserves all rows from the right table.
> 💡 **Production Best Practice**: Almost all professional style guides (Google, GitLab, dbt) forbid `RIGHT JOIN`. Standardize on `LEFT JOIN` by flipping the table order. It preserves the natural Western reading direction (left-to-right, top-to-bottom).

---

### 4. `FULL OUTER JOIN` (Complete Union)
Returns all rows when there is a match in either left or right table. 
*MySQL 8.0 Simulation*: MySQL does not support `FULL OUTER JOIN` syntax natively. We simulate it using `UNION`:

```sql
SELECT c.customer_id, c.name, o.order_id, o.order_amount
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
UNION
SELECT c.customer_id, c.name, o.order_id, o.order_amount
FROM customers c
RIGHT JOIN orders o ON c.customer_id = o.customer_id;
```

---

## 4. 🚨 The #1 Senior SQL Interview Trap: `ON` vs `WHERE`

What is the difference between filtering in the `ON` clause versus the `WHERE` clause in a `LEFT JOIN`?

### Scenario: Find all customers and their 'COMPLETED' orders

#### Approach A (Filter in `ON` clause):
```sql
SELECT c.name, o.order_id, o.status
FROM customers c
LEFT JOIN orders o
  ON c.customer_id = o.customer_id
 AND o.status = 'COMPLETED';
```
- **Behavior**: The predicate `o.status = 'COMPLETED'` acts as a qualification rule **during the join matching phase**.
- **Result**: ALL customers are preserved! If a customer has only 'PENDING' orders, they still appear in the output with `order_id = NULL` and `status = NULL`.

#### Approach B (Filter in `WHERE` clause) — *The Accidental Inner Join*:
```sql
SELECT c.name, o.order_id, o.status
FROM customers c
LEFT JOIN orders o
  ON c.customer_id = o.customer_id
WHERE o.status = 'COMPLETED';
```
- **Behavior**: The `WHERE` clause executes **after** the outer join has completed.
- For customers with no completed orders, `o.status` was padded as `NULL`.
- When `WHERE NULL = 'COMPLETED'` is evaluated, it evaluates to `UNKNOWN` and the row is **discarded**!
- **Catastrophic Consequence**: The `LEFT JOIN` has been silently converted into an `INNER JOIN`! Customers with 0 orders are completely lost.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE PREDICATE RULE                              │
├────────────────────────────────────────────────────────────────────────┤
│ • In a LEFT JOIN, predicates on the RIGHT table belong in the ON       │
│   clause if you wish to preserve unmatched left rows.                  │
│ • If you put a right-table predicate in the WHERE clause, you MUST     │
│   explicitly allow NULLs: `WHERE o.status = 'COMPLETED' OR o.id IS NULL`│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. The Left Anti-Join Pattern (Orphan Finding)

How do you find records in Table $A$ that have **no corresponding records** in Table $B$?
Example: Customers who have never placed an order.

```sql
SELECT c.customer_id, c.name
FROM customers c
LEFT JOIN orders o
  ON c.customer_id = o.customer_id
WHERE o.customer_id IS NULL;  -- Targets the padded PK of the right table
```
Why is this faster than `WHERE customer_id NOT IN (...)`?
1. `NOT IN` fails completely if the subquery returns even a single `NULL` value (Three-Valued Logic trap).
2. The query planner optimizes a `LEFT JOIN ... WHERE IS NULL` as an optimized `ANTI-JOIN` scan using indexes.

---

## 6. HackerRank Schema Context: `CITY` & `COUNTRY`

In the HackerRank relational track, all challenges revolve around the World database:

```
┌───────────────────────────────┐           ┌───────────────────────────────┐
│             CITY              │           │            COUNTRY            │
├───────────────────────────────┤           ├───────────────────────────────┤
│ ID           INT (PK)         │           │ Code          VARCHAR(3) (PK) │
│ Name         VARCHAR(17)      │           │ Name          VARCHAR(44)     │
│ CountryCode  VARCHAR(3) (FK)  │◄─────────┤ Continent     VARCHAR(13)     │
│ District     VARCHAR(20)      │           │ Region        VARCHAR(25)     │
│ Population   INT              │           │ Population    INT             │
└───────────────────────────────┘           └───────────────────────────────┘
```

The join predicate connecting these two entities is:
```sql
FROM CITY ci
INNER JOIN COUNTRY co
  ON ci.CountryCode = co.Code
```
Notice: The foreign key in `CITY` is `CountryCode`, matching the primary key `Code` in `COUNTRY`.
