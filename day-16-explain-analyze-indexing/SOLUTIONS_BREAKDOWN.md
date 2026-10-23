# 🔬 Day 16 Solutions Breakdown: Execution Plan Autopsies

---

## Query 1: Eliminating the Sequential Scan
### The Problem:
`WHERE account_id = 90210 ORDER BY created_at DESC`
Without an index on `(account_id, created_at)`, the engine executes a `Seq Scan` scanning 10,000,000 rows, followed by a memory-heavy `Sort Method: external merge Disk`.

### The Optimization:
```sql
CREATE INDEX idx_orders_acct_created ON trading_orders(account_id, created_at DESC);
```
- **Operator Transformation**: `Seq Scan + Sort` $\to$ `Index Scan backward`.
- **Buffer Pool Savings**: Reduced buffer reads from `48,200 shared hit blocks` down to `4 shared hit blocks` ($99.99\%$ I/O reduction).
- **Execution Time**: Drops from `1,420 ms` to `0.082 ms`.

---

## Query 3: Achieving 100% Index-Only Scan with INCLUDE
### The Problem:
`SELECT symbol, SUM(price * quantity) WHERE symbol = 'AAPL' AND order_status = 'FILLED'`
Traditional composite index on `(symbol, order_status, price, quantity)` places `price` and `quantity` in the B+Tree key comparison structure, increasing index page bloat and maintenance overhead.

### The PostgreSQL `INCLUDE` Solution:
```sql
CREATE INDEX idx_orders_symbol_status ON trading_orders(symbol, order_status) INCLUDE (price, quantity);
```
- **B+Tree Mechanics**: Only `symbol` and `order_status` are sorted in intermediate B+Tree branch nodes. `price` and `quantity` are stored payload-only in leaf pages.
- **Result**: `Index Only Scan using idx_orders_symbol_status`. Zero heap reads!
