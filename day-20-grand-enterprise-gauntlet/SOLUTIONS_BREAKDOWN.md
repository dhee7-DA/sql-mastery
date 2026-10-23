# 🔬 Day 20 Solutions Breakdown: Grand Gauntlet Autopsies

---

## Boss Challenge 1: Wash Trading Autopsy
### Mechanical Integrity:
- Detects market manipulation patterns where a bad actor rapidly buys and sells the same asset within a 5-second window to inflate trading volume.
- Uses `LAG()` partitioned strictly by `(trader_id, symbol)` to preserve local cache locality.
- Bounded timestamp difference checks avoid combinatorial Cartesian self-joins.
- Runs in $O(N \log N)$ single-pass time.
