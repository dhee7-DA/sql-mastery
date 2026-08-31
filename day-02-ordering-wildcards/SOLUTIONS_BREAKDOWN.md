# 💡 Day 02 Solutions Breakdown & Interview Playbook

Detailed breakdowns for HackerRank Station 4 and Station 6–12 series covering aggregate subtraction, character class pattern matching, and negation.

---

## 📌 Problem 01: Weather Observation Station 4
- **Platform**: HackerRank
- **Link**: [Weather Observation Station 4](https://www.hackerrank.com/challenges/weather-observation-station-4/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (Data Quality Audit — Counting duplicate rows)

### 📋 The Question
> Find the difference between the total number of **`CITY`** entries in the table and the number of distinct **`CITY`** entries in the table.

### 🎯 What are they testing?
- `COUNT(CITY)` (total records) minus `COUNT(DISTINCT CITY)` (unique values).

### 💻 Solution (MySQL)
```sql
SELECT COUNT(CITY) - COUNT(DISTINCT CITY)
FROM STATION;
```

---

## 📌 Problem 02: Weather Observation Station 6
- **Platform**: HackerRank
- **Link**: [Weather Observation Station 6](https://www.hackerrank.com/challenges/weather-observation-station-6/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (Prefix pattern matching & deduplication)

### 📋 The Question
> Query the list of **`CITY`** names starting with vowels (`a, e, i, o, u`) from **`STATION`**. Your result cannot contain duplicates.

### 💻 Solution (MySQL)
```sql
SELECT DISTINCT CITY
FROM STATION
WHERE CITY REGEXP '^[aeiou]';
```

---

## 📌 Problem 03: Weather Observation Station 7
- **Platform**: HackerRank
- **Link**: [Weather Observation Station 7](https://www.hackerrank.com/challenges/weather-observation-station-7/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (Suffix pattern matching)

### 📋 The Question
> Query the list of **`CITY`** names ending with vowels (`a, e, i, o, u`) from **`STATION`**. Your result cannot contain duplicates.

### 💻 Solution (MySQL)
```sql
SELECT DISTINCT CITY
FROM STATION
WHERE CITY REGEXP '[aeiou]$';
```

---

## 📌 Problem 04: Weather Observation Station 8
- **Platform**: HackerRank
- **Link**: [Weather Observation Station 8](https://www.hackerrank.com/challenges/weather-observation-station-8/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (Compound AND matching)

### 📋 The Question
> Query the list of **`CITY`** names from **`STATION`** which have vowels as **both** their first AND their last characters. Exclude duplicates.

### 💻 Solution (MySQL)
```sql
SELECT DISTINCT CITY
FROM STATION
WHERE CITY REGEXP '^[aeiou]' 
  AND CITY REGEXP '[aeiou]$';
```

---

## 📌 Problem 05: Weather Observation Station 9
- **Platform**: HackerRank
- **Link**: [Weather Observation Station 9](https://www.hackerrank.com/challenges/weather-observation-station-9/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (Negated prefix matching)

### 📋 The Question
> Query the list of **`CITY`** names from **`STATION`** that do **NOT** start with vowels. Exclude duplicates.

### 💻 Solution (MySQL)
```sql
SELECT DISTINCT CITY
FROM STATION
WHERE CITY NOT REGEXP '^[aeiou]';
```

---

## 📌 Problem 06: Weather Observation Station 10
- **Platform**: HackerRank
- **Link**: [Weather Observation Station 10](https://www.hackerrank.com/challenges/weather-observation-station-10/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (Negated suffix matching)

### 📋 The Question
> Query the list of **`CITY`** names from **`STATION`** that do **NOT** end with vowels. Exclude duplicates.

### 💻 Solution (MySQL)
```sql
SELECT DISTINCT CITY
FROM STATION
WHERE CITY NOT REGEXP '[aeiou]$';
```

---

## 📌 Problem 07: Weather Observation Station 11
- **Platform**: HackerRank
- **Link**: [Weather Observation Station 11](https://www.hackerrank.com/challenges/weather-observation-station-11/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (Negated OR condition)

### 📋 The Question
> Query the list of **`CITY`** names from **`STATION`** that either do **NOT** start with vowels OR do **NOT** end with vowels. Exclude duplicates.

### 💻 Solution (MySQL)
```sql
SELECT DISTINCT CITY
FROM STATION
WHERE CITY NOT REGEXP '^[aeiou]' 
   OR CITY NOT REGEXP '[aeiou]$';
```

---

## 📌 Problem 08: Weather Observation Station 12
- **Platform**: HackerRank
- **Link**: [Weather Observation Station 12](https://www.hackerrank.com/challenges/weather-observation-station-12/problem)
- **Importance for Interviews**: ⭐⭐⭐⭐⭐ (Neither NOR / Negated AND condition)

### 📋 The Question
> Query the list of **`CITY`** names from **`STATION`** that do **NOT** start with vowels AND do **NOT** end with vowels. Exclude duplicates.

### 💻 Solution (MySQL)
```sql
SELECT DISTINCT CITY
FROM STATION
WHERE CITY NOT REGEXP '^[aeiou]' 
  AND CITY NOT REGEXP '[aeiou]$';
```
