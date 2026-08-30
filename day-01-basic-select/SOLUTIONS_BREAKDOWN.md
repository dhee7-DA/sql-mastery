# 💡 Day 01 Solutions Breakdown & Interview Playbook

Detailed breakdowns for all 8 HackerRank Basic Select problems, explaining the logic, intuition, solutions, and real-world interview context.

---

## 📌 Problem 01: Revising the Select Query I
- **Platform**: HackerRank
- **Link**: [Revising the Select Query I](https://www.hackerrank.com/challenges/revising-the-select-query/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (The absolute baseline test of SQL syntax)

### 📋 The Question
> Query all columns for all American cities in the **CITY** table with populations larger than `100,000`. The `COUNTRYCODE` for America is `'USA'`.

### 🎯 What are they testing?
1. Can you extract entire rows using wildcard `*`?
2. Can you apply multiple simultaneous conditions using the `AND` operator?
3. Do you understand data types (string `'USA'` with quotes vs integer `100000` without quotes)?

### 💻 Solution (MySQL)
```sql
SELECT *
FROM CITY
WHERE COUNTRYCODE = 'USA' AND POPULATION > 100000;
```

### 🔍 Step-by-Step Breakdown
1. `FROM CITY`: Loads the `CITY` dataset.
2. `WHERE COUNTRYCODE = 'USA' AND POPULATION > 100000`: Scans each row. Only rows satisfying **both** conditions are passed forward.
3. `SELECT *`: Returns all 5 attributes (`ID`, `NAME`, `COUNTRYCODE`, `DISTRICT`, `POPULATION`) for the filtered rows.

### 💼 Interview & Real-World Tips
- **Performance Tip**: In production analytics on billion-row tables (e.g., Snowflake/BigQuery), `SELECT *` is considered an anti-pattern because it triggers an expensive full-column scan. In interviews, explain: *"I am using `SELECT *` here as requested by the prompt, but in production, I would only project the columns needed for downstream dashboards."*

---

## 📌 Problem 02: Revising the Select Query II
- **Platform**: HackerRank
- **Link**: [Revising the Select Query II](https://www.hackerrank.com/challenges/revising-the-select-query-2/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (Column projection vs row scanning)

### 📋 The Question
> Query the **NAME** field for all American cities in the **CITY** table with populations larger than `120,000`. The `COUNTRYCODE` for America is `'USA'`.

### 🎯 What are they testing?
1. Difference between selecting all columns (`*`) vs projecting a single specific attribute (`NAME`).
2. Numerical comparison with a threshold (`> 120000`).

### 💻 Solution (MySQL)
```sql
SELECT NAME
FROM CITY
WHERE COUNTRYCODE = 'USA' AND POPULATION > 120000;
```

### 🔍 Step-by-Step Breakdown
1. `FROM CITY`: Accesses the `CITY` table.
2. `WHERE COUNTRYCODE = 'USA' AND POPULATION > 120000`: Filters out all non-US cities and cities with 120,000 or fewer people.
3. `SELECT NAME`: Only the `NAME` column is returned in the final result set.

---

## 📌 Problem 03: Select All
- **Platform**: HackerRank
- **Link**: [Select All](https://www.hackerrank.com/challenges/select-all-sql/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐☆ (Foundational table scan)

### 📋 The Question
> Query all columns (attributes) for every row in the **CITY** table.

### 🎯 What are they testing?
- Basic unrestricted table extraction (`SELECT * FROM table;`).

### 💻 Solution (MySQL)
```sql
SELECT *
FROM CITY;
```

---

## 📌 Problem 04: Select By ID
- **Platform**: HackerRank
- **Link**: [Select By ID](https://www.hackerrank.com/challenges/select-by-id/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (Primary Key single-row lookup)

### 📋 The Question
> Query all columns for a city in **CITY** with the **ID** `1661`.

### 🎯 What are they testing?
- Exact point-lookup matching on a numeric unique identifier (`ID = 1661`).

### 💻 Solution (MySQL)
```sql
SELECT *
FROM CITY
WHERE ID = 1661;
```

---

## 📌 Problem 05: Japanese Cities' Attributes
- **Platform**: HackerRank
- **Link**: [Japanese Cities' Attributes](https://www.hackerrank.com/challenges/japanese-cities-attributes/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐☆ (Single string attribute filter)

### 📋 The Question
> Query all attributes of every Japanese city in the **CITY** table. The `COUNTRYCODE` for Japan is `'JPN'`.

### 🎯 What are they testing?
- Filtering categorical string data with single quotes (`'JPN'`).

### 💻 Solution (MySQL)
```sql
SELECT *
FROM CITY
WHERE COUNTRYCODE = 'JPN';
```

---

## 📌 Problem 06: Japanese Cities' Names
- **Platform**: HackerRank
- **Link**: [Japanese Cities' Names](https://www.hackerrank.com/challenges/japanese-cities-name/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐☆ (Specific column projection with filter)

### 📋 The Question
> Query the names of all the Japanese cities in the **CITY** table. The `COUNTRYCODE` for Japan is `'JPN'`.

### 🎯 What are they testing?
- Selecting a specific target column (`NAME`) instead of `*` under a categorical condition.

### 💻 Solution (MySQL)
```sql
SELECT NAME
FROM CITY
WHERE COUNTRYCODE = 'JPN';
```

---

## 📌 Problem 07: Weather Observation Station 1
- **Platform**: HackerRank
- **Link**: [Weather Observation Station 1](https://www.hackerrank.com/challenges/weather-observation-station-1/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐☆ (Multi-column projection)

### 📋 The Question
> Query a list of **CITY** and **STATE** from the **STATION** table.

### 🎯 What are they testing?
- Selecting multiple specific columns separated by commas (`SELECT CITY, STATE`).

### 💻 Solution (MySQL)
```sql
SELECT CITY, STATE
FROM STATION;
```

---

## 📌 Problem 08: Weather Observation Station 3
- **Platform**: HackerRank
- **Link**: [Weather Observation Station 3](https://www.hackerrank.com/challenges/weather-observation-station-3/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (Deduplication + Modulo arithmetic)

### 📋 The Question
> Query a list of **CITY** names from **STATION** for cities that have an even **ID** number. Print the results in any order, but exclude duplicates from the answer.

### 🎯 What are they testing?
1. **Deduplication**: Using `DISTINCT` to guarantee unique city names.
2. **Modulo operator**: Checking for even IDs (`MOD(ID, 2) = 0` or `ID % 2 = 0`).

### 💻 Solution (MySQL)
```sql
SELECT DISTINCT CITY
FROM STATION
WHERE MOD(ID, 2) = 0;
```
*(Alternative valid syntax in MySQL: `WHERE ID % 2 = 0`)*

### 🔍 Step-by-Step Breakdown
1. `FROM STATION`: Reads the station records.
2. `WHERE MOD(ID, 2) = 0`: Divides `ID` by 2 and checks if remainder is `0` (even numbers).
3. `SELECT DISTINCT CITY`: Picks the city name and strips out all duplicate occurrences.
