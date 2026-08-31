# 💬 Day 02 Daily Q&A & Debugging Log

A running record of user queries, questions asked to the instructor, errors encountered, and pattern matching insights.

---

## ❓ Question 1: "Is this the right way to study concepts? Make the curriculum match HackerRank subdomains and difficulty."
- **Student Inquiry**: Checked whether the 14-day intensive directly maps to HackerRank's entire curriculum and difficulty tiers.
- **Instructor Resolution**:
  - Validated that HackerRank contains exactly **58 SQL problems** across 6 subdomains:
    1. Basic Select (20 Easy)
    2. Advanced Select (1 Easy, 4 Medium)
    3. Aggregation (15 Easy, 2 Medium)
    4. Basic Join (3 Easy, 5 Medium)
    5. Advanced Join (2 Medium, 3 Hard)
    6. Alternative Queries (1 Easy, 2 Medium)
  - Restructured the 14-Day Syllabus in `README.md` to directly mirror the 6 subdomains and mapped Days 1–10 to finish 100% of the 58 problems, with Days 11–14 bridging the critical modern industry gaps (Window Functions & Portfolio Business Metrics).

---

## ❓ Question 2: "Explain the question to me — how should I read and create logic of it?"
- **Context**: Problem 01 (*Weather Observation Station 4*).
- **Instructor Resolution & Analytical Method**:
  - Introduced the **4-Step Problem Deconstruction Framework**:
    1. `FROM`: Identify data source (`FROM STATION`).
    2. `Part A`: Translate "total number of CITY entries" to `COUNT(CITY)`.
    3. `Part B`: Translate "number of distinct CITY entries" to `COUNT(DISTINCT CITY)`.
    4. `Relationship`: Translate "the difference between" to math subtraction `COUNT(CITY) - COUNT(DISTINCT CITY)`.
  - Student simplified into core essence: *"Find difference between total city and unique city"*.
  - Query executed and passed on first attempt!

---

## 🛠️ Errors & Blockers Tracked Today
| # | Issue / Blocker | Root Cause | Fix Applied |
|---|---|---|---|
| 1 | Problem deconstruction hesitation | Translating English business questions into SQL mathematical logic | Applied 4-Step Analytical Framework |
