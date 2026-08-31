# 🎯 Day 02 Real-World Interview Questions & Company Case Studies

A curated collection of technical screening questions and interview scenarios asked by top tech firms (Spotify, Airbnb, Amazon, Uber) on **ORDER BY, LIMIT, LIKE, and Multi-Column Sorting**.

---

## 🏢 1. Spotify | Content & Artist Analytics

### 📌 Scenario: Top 5 Most Streamed Tracks (Top-N Extraction)
> **Question**: "Write a SQL query to extract the top 5 most streamed songs released in 2024. Return the track name, artist name, and total stream count, ordered from most streamed to least streamed. If two tracks have identical stream counts, break the tie by track name alphabetically."

#### 📋 Table Schema: `tracks`
| Column | Type | Description |
|---|---|---|
| `track_id` | INT | Primary key |
| `track_name` | VARCHAR(100) | Song title |
| `artist_name` | VARCHAR(100) | Performer name |
| `stream_count` | BIGINT | Total streams |
| `release_year` | INT | Year of release |

#### 💻 Expected SQL Query:
```sql
SELECT track_name, artist_name, stream_count
FROM tracks
WHERE release_year = 2024
ORDER BY stream_count DESC, track_name ASC
LIMIT 5;
```

#### 💼 Interview Discussion Points:
- **Why Multi-Column Sort is Crucial**: Without `track_name ASC` as the secondary sort, databases produce nondeterministic ordering when `stream_count` is identical across rows.
- **Dialect Portability**: In MS SQL Server / Oracle, `LIMIT 5` is written as `SELECT TOP 5 ...` or `FETCH FIRST 5 ROWS ONLY`.

---

## 🏢 2. Airbnb | Search & Marketplace Operations

### 📌 Scenario: Keyword Search for Destination Filters
> **Question**: "Our marketing team wants to target listings that mention scenic waterfront keywords. Write a query to find all active listings in California (`state = 'CA'`) where the listing title contains the words `'Beach'`, `'Lake'`, or `'Ocean'` (case-insensitive). Return unique listing IDs, titles, and nightly prices."

#### 📋 Table Schema: `listings`
| Column | Type | Description |
|---|---|---|
| `listing_id` | BIGINT | Unique listing ID |
| `title` | VARCHAR(255) | Property title description |
| `state` | VARCHAR(2) | State code |
| `price_per_night` | DECIMAL(8,2) | Nightly price in USD |
| `is_active` | BOOLEAN | Status flag |

#### 💻 Expected SQL Query:
```sql
SELECT DISTINCT listing_id, title, price_per_night
FROM listings
WHERE state = 'CA'
  AND is_active = TRUE
  AND (
       LOWER(title) LIKE '%beach%'
    OR LOWER(title) LIKE '%lake%'
    OR LOWER(title) LIKE '%ocean%'
  );
```

#### 💼 Key Interview Tip:
- Always use `LOWER(column)` or `UPPER(column)` when searching text if the database collation is case-sensitive, ensuring `'BEACH'`, `'beach'`, and `'Beach'` are all caught.

---

## 🏢 3. Uber | Driver Operations

### 📌 Scenario: VIP Driver Leaderboard
> **Question**: "Write a query to produce a leaderboard of the Top 10 drivers in London (`city_id = 44`) who have completed at least 500 lifetime trips. Rank them by average customer rating (highest first). If ratings are tied, sort by total completed trips (highest first)."

#### 📋 Table Schema: `drivers`
| Column | Type | Description |
|---|---|---|
| `driver_id` | INT | Driver ID |
| `driver_name` | VARCHAR(100) | Full name |
| `city_id` | INT | City ID |
| `rating` | DECIMAL(3,2) | Average rating (1.00 to 5.00) |
| `completed_trips` | INT | Total completed trips |

#### 💻 Expected SQL Query:
```sql
SELECT driver_id, driver_name, rating, completed_trips
FROM drivers
WHERE city_id = 44
  AND completed_trips >= 500
ORDER BY rating DESC, completed_trips DESC
LIMIT 10;
```

---

## 🏢 4. Amazon | Fraud & Risk Intelligence

### 📌 Scenario: Internal Corporate Email Verification
> **Question**: "Extract all transaction records where the buyer used an internal Amazon employee email address (`@amazon.com`) with a transaction amount exceeding `$1,000.00`. Order the results from newest transaction to oldest."

#### 📋 Table Schema: `transactions`
| Column | Type | Description |
|---|---|---|
| `transaction_id` | BIGINT | Transaction ID |
| `buyer_email` | VARCHAR(120) | Buyer email |
| `amount` | DECIMAL(10,2) | Transaction amount |
| `transaction_date` | TIMESTAMP | Time of transaction |

#### 💻 Expected SQL Query:
```sql
SELECT transaction_id, buyer_email, amount, transaction_date
FROM transactions
WHERE buyer_email LIKE '%@amazon.com'
  AND amount > 1000.00
ORDER BY transaction_date DESC;
```

#### 💼 Key Interview Tip:
- Using `LIKE '%@amazon.com'` guarantees that the email strictly ends with the domain `@amazon.com` (preventing matches like `amazon.com.fake.org`).
