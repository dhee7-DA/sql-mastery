# 🎯 Day 01 Real-World Interview Questions & Company Case Studies

A curated repository of actual technical screening questions and interview scenarios asked by top tech firms (Amazon, Meta, Uber, Netflix, Spotify, Stripe) based on **SELECT, WHERE, DISTINCT, and Modulo**.

---

## 🏢 1. Amazon | Business Intelligence & Data Analyst

### 📌 Scenario: Active Customer Order Filtering
> **Question**: "Write a SQL query to retrieve the customer IDs, shipping countries, and order amounts for all orders placed from `'US'` or `'CA'` where the total order value exceeds `$250.00` and the order status is `'COMPLETED'`. Do not include duplicate customer IDs in the final summary."

#### 📋 Table Schema: `customer_orders`
| Column | Type | Description |
|---|---|---|
| `order_id` | INT | Primary key |
| `customer_id` | INT | Customer identifier |
| `shipping_country` | VARCHAR(10) | 2-letter ISO country code |
| `order_amount` | DECIMAL(10,2) | Total order value in USD |
| `order_status` | VARCHAR(20) | Order state ('PENDING', 'COMPLETED', 'CANCELLED') |

#### 💻 Expected SQL Query:
```sql
SELECT DISTINCT customer_id, shipping_country, order_amount
FROM customer_orders
WHERE (shipping_country = 'US' OR shipping_country = 'CA')
  AND order_amount > 250.00
  AND order_status = 'COMPLETED';
```
*(Alternative syntax using `IN`: `WHERE shipping_country IN ('US', 'CA')`)*

#### 💼 Interviewer Evaluation Criteria:
1. **Operator Precedence**: Did the candidate use parentheses around `(shipping_country = 'US' OR shipping_country = 'CA')`? Without parentheses, `AND` takes precedence over `OR`, which would produce incorrect data!
2. **String vs Numeric Formatting**: Are `'US'`, `'CA'`, and `'COMPLETED'` quoted, while `250.00` is unquoted?

---

## 🏢 2. Meta (Facebook) | Product Analytics / Data Science

### 📌 Scenario: 50/50 Experiment Traffic Allocation
> **Question**: "We are rolling out a new Reels algorithm to 50% of our user base. Even user IDs will receive the control algorithm (Version A), while odd user IDs receive the treatment algorithm (Version B). Write a query to fetch the unique user IDs and email addresses for all verified users assigned to Version B."

#### 📋 Table Schema: `users`
| Column | Type | Description |
|---|---|---|
| `user_id` | BIGINT | Unique numerical user ID |
| `email` | VARCHAR(100) | User email address |
| `is_verified` | BOOLEAN | Account verification flag |
| `country` | VARCHAR(50) | User resident country |

#### 💻 Expected SQL Query:
```sql
SELECT DISTINCT user_id, email
FROM users
WHERE MOD(user_id, 2) = 1
  AND is_verified = TRUE;
```

#### 💼 Interviewer Follow-Up Question:
- **Interviewer**: *"What if we wanted to split users into 4 equal 25% test groups?"*
- **Candidate Answer**: *"We would use `MOD(user_id, 4)` which yields four possible remainders: `0`, `1`, `2`, and `3`. Each group receives exactly 25% of the deterministic traffic."*

---

## 🏢 3. Uber | Operations & Logistics Data Analyst

### 📌 Scenario: Quality Audit & Systematic Sampling
> **Question**: "The safety team wants to audit every 10th completed ride in New York City (`city_id = 101`) to inspect driver ratings and dispute claims. Write a query to pull all ride records that qualify for this audit."

#### 📋 Table Schema: `trips`
| Column | Type | Description |
|---|---|---|
| `trip_id` | BIGINT | Incremental trip ID |
| `driver_id` | INT | Driver identifier |
| `rider_id` | INT | Rider identifier |
| `city_id` | INT | City code |
| `status` | VARCHAR(20) | 'COMPLETED', 'DROPPED', 'CANCELLED' |
| `fare_amount` | DECIMAL(8,2) | Total fare |

#### 💻 Expected SQL Query:
```sql
SELECT *
FROM trips
WHERE city_id = 101
  AND status = 'COMPLETED'
  AND MOD(trip_id, 10) = 0;
```

#### 💼 Key Interview Takeaway:
- Using `MOD(trip_id, 10) = 0` is the standard deterministic way to generate an exact **10% random systematic sample** across high-throughput transactional datasets without requiring expensive external randomization libraries.

---

## 🏢 4. Netflix | Content Analytics

### 📌 Scenario: Unique Catalog Title Exploration
> **Question**: "The marketing team needs a clean list of all unique genre and content maturity rating combinations available in our production catalog for titles released in 2024 or later."

#### 📋 Table Schema: `titles`
| Column | Type | Description |
|---|---|---|
| `title_id` | INT | Unique show/movie ID |
| `title_name` | VARCHAR(100) | Content title |
| `genre` | VARCHAR(50) | Primary genre (e.g. 'Sci-Fi', 'Drama') |
| `rating` | VARCHAR(10) | Maturity rating (e.g. 'PG-13', 'TV-MA') |
| `release_year` | INT | Year of release |

#### 💻 Expected SQL Query:
```sql
SELECT DISTINCT genre, rating
FROM titles
WHERE release_year >= 2024;
```

#### 💼 Interviewer Concept Check:
- *"Does `DISTINCT` check uniqueness on only `genre`, or on the pair `(genre, rating)`?"*
- **Candidate Answer**: *"It checks the entire tuple `(genre, rating)`. A genre like `'Sci-Fi'` will appear multiple times if paired with different ratings like `'PG-13'` and `'TV-MA'`, but exact duplicate pairs will be removed."*

---

## 🧠 Master Cheat Sheet: The 3 Golden Rules for Technical Interviews

1. **`SELECT *` is an Anti-Pattern in Production**: Always mention: *"I will select only the required fields to minimize I/O and optimize memory bandwidth."*
2. **Beware of Operator Precedence**: Whenever combining `AND` with `OR`, always wrap the `OR` conditions inside parentheses `(Condition A OR Condition B) AND Condition C`.
3. **`DISTINCT` Performance Cost**: In massive databases, `DISTINCT` requires the database to sort or build an in-memory hash table of all surviving rows to find duplicates. Use it deliberately when unique sets are required.
