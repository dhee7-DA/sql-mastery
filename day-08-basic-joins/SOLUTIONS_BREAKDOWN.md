# 🔍 Day 08 — Step-by-Step Solutions & Engine Lifecycle Breakdown

---

## 1. Challenge 1: Asian Population

### SQL Solution:
```sql
SELECT SUM(ci.Population) AS TotalAsianCityPopulation
FROM CITY ci
INNER JOIN COUNTRY co
  ON ci.CountryCode = co.Code
WHERE co.Continent = 'Asia';
```

### Physical Lifecycle Trace:
1. **`FROM CITY ci`**: The storage engine opens the `CITY` table (left relation).
2. **`INNER JOIN COUNTRY co ON ci.CountryCode = co.Code`**:
   - For every city record, the database matches `ci.CountryCode` against the indexed primary key `co.Code` in `COUNTRY`.
   - Rows where the foreign key matches the primary key are joined into an intermediate combined row.
   - Example:
     - `('Tokyo', 'JPN', 7980230)` matches `('JPN', 'Japan', 'Asia')` ➡️ Preserved.
     - `('Amsterdam', 'NLD', 731200)` matches `('NLD', 'Netherlands', 'Europe')` ➡️ Preserved.
3. **`WHERE co.Continent = 'Asia'`**:
   - Evaluates the continent filter.
   - Amsterdam (`Europe`) and Lagos (`Africa`) are discarded.
   - Kabul (`1,780,000`), Tokyo (`7,980,230`), Mumbai (`10,500,000`), and Delhi (`7,206,704`) evaluate to `TRUE` and survive.
4. **`SELECT SUM(ci.Population)`**:
   - Aggregates the population values of the surviving Asian city rows:
   $$1,780,000 + 7,980,230 + 10,500,000 + 7,206,704 = 27,466,934$$

---

## 2. Challenge 2: African Cities

### SQL Solution:
```sql
SELECT ci.Name
FROM CITY ci
INNER JOIN COUNTRY co
  ON ci.CountryCode = co.Code
WHERE co.Continent = 'Africa';
```

### Key Architectural Detail:
- **Disambiguation**: Both `CITY` and `COUNTRY` possess a column called `Name`. 
- Writing `SELECT Name` triggers an `ERROR 1052 (23000): Column 'Name' in field list is ambiguous`.
- Prefixing `ci.Name` explicitly tells the query parser to project the city's name from the left table rather than the country's name.

---

## 3. Challenge 3: Average Population of Each Continent

### SQL Solution:
```sql
SELECT 
    co.Continent,
    FLOOR(AVG(ci.Population)) AS AvgCityPopulation
FROM CITY ci
INNER JOIN COUNTRY co
  ON ci.CountryCode = co.Code
GROUP BY co.Continent;
```

### Physical Lifecycle Trace:
1. **`FROM` & `JOIN`**: Assembles the paired (City, Country) rows.
2. **`GROUP BY co.Continent`**:
   - The query executor partitions all matched rows into hash buckets by continent (`Asia`, `Africa`, `Europe`, `North America`).
3. **`AVG(ci.Population)`**:
   - Calculates the arithmetic mean within each continent's bucket.
4. **`FLOOR(...)`**:
   - Truncates the floating-point average down to the nearest mathematical integer (e.g., `450231.89` ➡️ `450231`).
   - Notice: The problem specifically states *"rounded down to the nearest integer"*, which requires `FLOOR()`, not `ROUND()`!

---

## 4. Enterprise Scenario: Left Anti-Join (Unmatched Record Extraction)

### SQL Solution:
```sql
SELECT 
    c.customer_id,
    c.name,
    c.email
FROM Customers c
LEFT JOIN Orders o
  ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
```

### Visual Execution Table:

| `c.customer_id` | `c.name` | `o.order_id` (Post-Join) | `WHERE o.order_id IS NULL` | Final Result |
|---|---|---|---|---|
| `101` | Alice Vance | `5001`, `5002` | `FALSE` | Discarded |
| `102` | **Bob Stone** | `NULL` | **`TRUE`** | **Preserved ✅** |
| `103` | Charlie Day | `5003` | `FALSE` | Discarded |
| `104` | **Diana Prince**| `NULL` | **`TRUE`** | **Preserved ✅** |

### Why Target `o.order_id` in the `WHERE` Clause?
In the right table (`Orders`), `order_id` is defined as `PRIMARY KEY` (which implicitly guarantees `NOT NULL`).
Therefore, the **only possible reason** `o.order_id` can be `NULL` in the outer join output is because **no matching row existed in the Orders table**.
