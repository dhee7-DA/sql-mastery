# 🔍 Day 16: Query Performance, EXPLAIN ANALYZE & Index Tuning

## 🎯 Executive Overview
Day 16 marks the transition from *logical SQL syntax* to *physical database engine engineering*. Knowing how to write a query is insufficient; Senior and Staff Engineers must know how the query planner converts declarative ASTs (Abstract Syntax Trees) into physical execution operator trees, how B+Trees structure disk blocks, and how to calibrate indexes to eliminate sequential scans on multi-terabyte datasets.

---

## 🛠️ Curriculum File Structure
```
day-16-explain-analyze-indexing/
├── README.md               # Architecture roadmap and sprint guide
├── THEORY.md               # Cost formulas, B+Tree physics, scan operator mechanics
├── queries.sql             # 6 production benchmark queries with EXPLAIN profiles
├── SOLUTIONS_BREAKDOWN.md  # Mechanical execution autopsy & buffer page analysis
├── INTERVIEW_QUESTIONS.md  # 10 Staff/Principal DBA interview defense questions
├── ASSESSMENT.md           # 5 Performance tuning challenges & rubric
└── DAILY_LOG.md            # Sprint benchmarks and mental models
```

---

## 📋 Production Schema Context
```sql
CREATE TABLE trading_orders (
    order_id BIGSERIAL PRIMARY KEY,
    account_id INT NOT NULL,
    symbol VARCHAR(12) NOT NULL,
    order_type VARCHAR(10) NOT NULL, -- 'LIMIT', 'MARKET', 'STOP'
    order_status VARCHAR(15) NOT NULL, -- 'FILLED', 'CANCELLED', 'PENDING'
    quantity NUMERIC(14, 4) NOT NULL,
    price NUMERIC(14, 4) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    filled_at TIMESTAMPTZ
);

CREATE INDEX idx_orders_acct_created ON trading_orders(account_id, created_at DESC);
CREATE INDEX idx_orders_symbol_status ON trading_orders(symbol, order_status) INCLUDE (price, quantity);
CREATE INDEX idx_orders_active_pending ON trading_orders(created_at) WHERE order_status = 'PENDING';
```
