# 💼 Day 20 Senior & Staff Engineer Interview Questions: Principal Architect Defense

---

### Q1: You are designing the core transactional and analytical ledger for a global neo-bank operating in 40 countries. Present your complete end-to-end SQL architecture.
**Target Level**: Principal Architect / CTO (Revolut, Stripe, Wise)

#### Core Architecture Defense:
1. **Double-Entry Invariant**: Every monetary movement consists of two balance records (`debit` and `credit`) inside a single atomic ACID transaction. Total balance sum must equal zero ($\sum \Delta = 0$).
2. **Pessimistic Deterministic Row Locks**: Inter-account transfers sort account IDs ascending prior to `FOR UPDATE` to guarantee zero deadlocks.
3. **Partitioning & Sharding**: Shard transaction tables by `tenant_id` / `account_id` hash partitions for linear scale-out.
4. **Analytical Replication**: Stream changes via Debezium CDC into Apache Kafka $\to$ ingest into Snowflake/ClickHouse columnar storage for real-time risk dashboards with sub-second response times.
