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

---

## 🏛️ Comprehensive Relational JOINs Master Reference (Section 05 Vault)

> *See also the dedicated compendium in [`docs/IMPORTANT_MATERIALS_RELATIONAL_JOINS.md`](../docs/IMPORTANT_MATERIALS_RELATIONAL_JOINS.md).*

### Master Decision Matrix & Silent Trap Focus

| Join Discipline | Symbol | Primary Concept & Engine Behavior | Real-World Data & Finance Scenarios | Trap Focus / Silent Corruption Gotcha |
| :--- | :---: | :--- | :--- | :--- |
| **`INNER JOIN`** | `⋈` | Strict key intersection; keeps only rows where the join predicate evaluates to `TRUE`. Drops unmatched keys and `NULL`s. | • Matching executed trades to clearing accounts<br>• Settled invoices paired with bank payments<br>• KYC-approved customer orders | **Silent Data Eviction & Cartesian Fan-Out**: Unmatched or `NULL` foreign keys disappear silently from reports. Non-unique join keys cause silent multiplicative row explosion. |
| **`LEFT JOIN`** | `⟕` | Preserves all rows from the left table; fills missing right table attributes with `NULL`. Retains the primary domain entity. | • Identifying churned / inactive accounts (`WHERE right.id IS NULL`)<br>• Customer lifetime spend audit<br>• Unfunded loan applications | **WHERE Clause Predicate Demotion**: Placing a filter on the right table inside `WHERE` (e.g., `WHERE payments.status = 'COMPLETED'`) converts the query into an `INNER JOIN`, dropping non-matching left rows! |
| **`RIGHT JOIN`** | `⟖` | Preserves all rows from the right table; mirrors `LEFT JOIN`. Used when right table represents the master taxonomy or dimension. | • Auditing product master catalogs vs actual sales<br>• Regulatory fee schedule compliance<br>• Merchant tier coverage | **Legibility & Direction Inversion**: Most query optimizers and developers read left-to-right. Using `RIGHT JOIN` across complex chains often leads to subtle operator precedence bugs. |
| **`FULL OUTER JOIN`** | `⟗` | Preserves all rows from both tables; fills missing attributes on either side with `NULL`. Full symmetric reconciliation. | • Inter-bank reconciliation breaks (Internal Ledger vs Swift feeds)<br>• Merged corporate entity customer migration audit<br>• Multi-broker settlement balance check | **Missing COALESCE on Dimension Keys**: Selecting `a.account_id` directly will yield `NULL` for right-only unmatched rows. You must project `COALESCE(a.account_id, b.account_id)`. |
| **`CROSS JOIN`** | `✕` | Unconditional Cartesian product ($M \times N$ rows); pairs every row from Table A with every row in Table B. | • Generating daily FX currency pair matrices ($N \times N$)<br>• Date spine calendar grids for zero-fill analytics<br>• Risk scenario stress-testing combinations | **Unintended OOM & Spilling**: Running a Cartesian join without tight pre-filtering causes massive memory spill and exponential disk bloat ($10^6 \times 10^6 = 10^{12}$ rows). |
| **`SELF JOIN`** | `⟲` | Joining a table to itself using distinct aliases (`e1` and `e2`) to evaluate relationships within the same entity domain. | • Organizational hierarchy & management reporting lines<br>• Consecutive trading day price movement analysis<br>• Detecting concurrent user sessions on the same IP | **Circular Self-Reference & Infinite Loop**: Forgetting to qualify aliases identically or omitting terminal predicates (`WHERE m.manager_id IS NOT NULL`) causes duplicate and inverted pair duplication. |
| **`NON-EQUI JOIN`** | `≶` | Joining on inequality operators (`>`, `<`, `BETWEEN .. AND`, `>=`) rather than direct equality (`=`). | • Progressive income tax brackets & fee tier mapping<br>• Point-in-time SCD Type-2 historical price as-of joins<br>• Rolling 30-day trailing risk exposure windows | **Overlapping Interval Fan-Out**: Overlapping bracket bounds (e.g. `val BETWEEN min AND max` with ambiguous endpoints) cause a single transaction to match multiple fee tiers. |

---

### The 420 Join Problems Breakdown (7 Disciplines × 60 Problems Each)

Every discipline contains **exactly 60 problems** divided into **20 Easy**, **20 Medium**, and **20 Hard** (all active in `visualizer/quests_section5_data.js`):

1. **`⋈ INNER JOIN` (60 Problems)**:
   - *Easy (1–20)*: 2-Table Entity Matching (Trades $\to$ Assets, Invoices $\to$ SKUs, Encounters $\to$ Doctors).
   - *Medium (21–40)*: Multi-Condition Joins & 3-Way Chains (Clearinghouse Trade Recon, 3-Way PO Matching, Options Assignments).
   - *Hard (41–60)*: High-Scale Ledgers & Multi-Entity Fan-Out Prevention (Double-Entry Balance Audit, AMM Liquidity Pools, CDO Cashflow Waterfalls).
2. **`⟕ LEFT JOIN` (60 Problems)**:
   - *Easy (1–20)*: Preserving Left Domain & Anti-Joins (Dormant Accounts, Zero-Sale Products, Unlinked Wallets).
   - *Medium (21–40)*: Left Joins with Aggregations & `ON` vs `WHERE` Traps (Customer Churn Audit, Sales Rep Targets, Delivery Driver Shifts).
   - *Hard (41–60)*: Comprehensive Financial Reconciliations (Trade Settlement Failures, Cross-Border VAT Reporting, Reinsurance Triangles).
3. **`⟖ RIGHT JOIN` (60 Problems)**:
   - *Easy (1–20)*: Auditing Master Taxonomies Against Operational Feeds (Product Catalogs vs Sales, SIC Codes vs Terminals).
   - *Medium (21–40)*: Taxonomy Audits & Inverted Hierarchies (Chart of Accounts Audit, Regulatory Reporting Taxonomy, Credit Scorecards).
   - *Hard (41–60)*: Regulatory Compliance Coverage (IFRS-9 Accounting Classifications, MiFID II Transaction Reporting, ISDA CSA Terms).
4. **`⟗ FULL OUTER JOIN` (60 Problems)**:
   - *Easy (1–20)*: 2-Sided Reconciliation & Discrepancies (Bank Statement vs Cash Ledger, Trade Blotter vs Custodian, Ticket Sales vs Gate Scans).
   - *Medium (21–40)*: Multi-Attribute Reconciliation & Tolerances (Inter-Bank Wire Reconciliation, M&A Database Consolidation, Options Trade Logs).
   - *Hard (41–60)*: Enterprise Settlement Reconciliation & Break Reporting (Continuous Linked Settlement FX Breaks, DTC Stock Sweep, Tri-Party Repo Cash True-Up).
5. **`✕ CROSS JOIN` (60 Problems)**:
   - *Easy (1–20)*: Generating Grid Combinations & Baseline Matrices (SKUs $\times$ Stores, Currencies $\times$ Currencies, Yield Maturities $\times$ Issuers).
   - *Medium (21–40)*: Date Spines, Zero-Filling & Scenario Sensitivity (Calendar Date Spines, FX Arbitrage Triangles, Stress Testing Rate Hikes).
   - *Hard (41–60)*: High-Dimensional Financial Simulation & Combinatorial Optimization (Monte Carlo VaR Simulation, ALM Cashflow Buckets, Multi-Factor Covariance).
6. **`⟲ SELF JOIN` (60 Problems)**:
   - *Easy (1–20)*: Parent-Child Hierarchies & Consecutive Day Comparisons (Employee $\to$ Manager, Price vs Prev Day Price, Consecutive ATM Withdrawals).
   - *Medium (21–40)*: Multi-Tier Hierarchies & Gaps-and-Islands (3-Level Org Trees, Consecutive Up-Days, Card Velocity Anti-Fraud >500mi in 10min).
   - *Hard (41–60)*: Recursive Hierarchy Traversal, Circular References & Graph Cycles (Circular Corporate Ownership Loops, AML Rapid Fund Layering, Bill of Materials Explosion).
7. **`≶ NON-EQUI JOIN` (60 Problems)**:
   - *Easy (1–20)*: Tier Lookups, Tax Brackets & Numeric Range Mapping (Salary Grade Bands, Progressive Income Tax, FICO Score Interest Rates).
   - *Medium (21–40)*: As-Of Point-in-Time Joins & Rolling Historical Windows (SCD Type 2 As-Of Customer Addresses, Trade As-Of Prevailing Quote, Dynamic Surge Pricing).
   - *Hard (41–60)*: Nanosecond As-Of Top-of-Book Matching, Overlapping Intervals & Risk Exposure (High-Frequency Order Book VWAP, Intraday Liquidity Stress Windows, CDS Auction Settlement).

