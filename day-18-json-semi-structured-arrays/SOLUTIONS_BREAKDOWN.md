# 🔬 Day 18 Solutions Breakdown: JSONB Execution & GIN Traversals

---

## Query 1: GIN Index Containment (`@>`)
### The Execution Mechanics:
- When evaluating `WHERE payload @> '{"event_type": "invoice.payment_succeeded"}'`:
- The engine uses `idx_events_payload` built with `jsonb_path_ops`.
- It hashes the path-value pair `hash(event_type: invoice.payment_succeeded)`.
- It performs an exact lookup on the GIN B-Tree of keys, obtaining the **Posting List** of table `ctid` pointers.
- It completely bypasses all unrelated rows without opening their JSON documents!
- **Performance**: Execution completes in $0.045$ ms vs. $890$ ms for sequential text scanning.
