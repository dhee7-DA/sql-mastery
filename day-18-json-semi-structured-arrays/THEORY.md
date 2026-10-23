# 📚 Day 18 Deep-Dive Theory: JSONB Binary Physics, LATERAL Subqueries & GIN Index Internals

---

## 🏛️ 1. `JSON` vs. `JSONB`: Physical Storage Engine Layout

PostgreSQL provides two distinct JSON data types:

| Feature | `JSON` (Textual) | `JSONB` (Decomposed Binary) |
| :--- | :--- | :--- |
| **Physical Storage** | Exact raw text copy (preserves whitespace & key duplicates). | Binary parsed format with integer offsets and sorted keys. |
| **Ingestion Speed** | Fast ($O(1)$ raw text write). | Slower ($O(N \log N)$ token parsing and key sorting). |
| **Query Speed** | Slow ($O(N)$ text scanning on every query). | Blazing Fast ($O(\log K)$ binary search per key). |
| **Indexing Support**| Functional expression indexes only. | Native GIN (Generalized Inverted Index) support! |

### The `JSONB` Binary Memory Header:
A `JSONB` document begins with a 4-byte header:
```text
┌────────────────────────────────────────────────────────────────────────┐
│                        JSONB BINARY DISK LAYOUT                        │
├────────────────────────────────────────────────────────────────────────┤
│  [ 32-bit Container Header: JENTRY Array Length + Type Flags ]         │
│  [ JENTRY 0: Key 1 offset & length ] [ JENTRY 1: Val 1 offset & length]│
│  [ JENTRY 2: Key 2 offset & length ] [ JENTRY 2: Val 2 offset & length]│
│  [ Raw Payload: "customer_id", 42, "status", "PAID" ]                  │
└────────────────────────────────────────────────────────────────────────┘
```
Because keys are pre-sorted lexicographically, extracting `payload->'status'` does not parse text: it performs a **binary search over the JENTRY array in microseconds**!

---

## 🔍 2. Generalized Inverted Indexes (GIN) Physics

A B+Tree index cannot index an arbitrary nested JSON document because B+Trees require a single scalar comparison order ($A < B$).
A **GIN Index** inverts the document into a search engine index:

```text
Document 1: {"tier": "GOLD", "tags": ["vip", "early_adopter"]}
Document 2: {"tier": "SILVER", "tags": ["early_adopter"]}

GIN POSTING TREE:
"tier" ──► "GOLD"   ──► [ Doc 1 ]
"tier" ──► "SILVER" ──► [ Doc 2 ]
"tags" ──► "vip"    ──► [ Doc 1 ]
"tags" ──► "early_adopter" ──► [ Doc 1, Doc 2 ]
```

### `jsonb_ops` vs. `jsonb_path_ops`:
- **`jsonb_ops` (Default)**: Indexes every key, every path, and every value independently. Supports all operators (`?`, `?|`, `?&`, `@>`). Larger index size.
- **`jsonb_path_ops`**: Hashes the entire root-to-leaf path (`hash("tags" -> "vip")`). Supports only containment (`@>`). Up to $60\%$ smaller and $3\times$ faster!

---

## ⚡ 3. The `LATERAL` Join: The `for-each` Loop of SQL

In standard SQL, a join subquery cannot reference columns from preceding tables in the `FROM` list.
A `LEFT JOIN LATERAL` acts as an inner loop, allowing the subquery to evaluate dynamically for each outer row:

```sql
SELECT c.customer_name, i.item_name, i.price
FROM customers c
CROSS JOIN LATERAL jsonb_to_recordset(c.metadata->'orders') 
     AS i(item_name TEXT, price NUMERIC);
```
`LATERAL` is the fundamental tool for unnesting nested JSON arrays, calculating Top-N per category dynamically, and evaluating sliding subqueries!
