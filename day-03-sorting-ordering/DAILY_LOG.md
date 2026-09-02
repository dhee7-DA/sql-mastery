# 💬 Day 03 Daily Q&A & Debugging Log

A running record of user queries, questions asked to the instructor, errors encountered, and pattern matching insights for Day 03.

---

## ❓ Question 1: "I'm blank after `ORDER BY` — how to sort by the last 3 characters?"
- **Context**: Problem 01 (*Higher Than 75 Marks*).
- **Instructor Resolution**:
  - Introduced `RIGHT(str, N)`: Extracts $N$ characters from the right end of a word (e.g. `RIGHT('Ashley', 3)` ➡️ `'ley'`).
  - Added the secondary tie-breaker `, ID ASC` to break ties between names sharing the same last 3 characters.

---

## ❓ Question 2: "Are there other functions like `RIGHT()`? Maybe `LEFT()`?"
- **Student Deduction**: Student intuitively hypothesized the existence of `LEFT()` from the naming convention of `RIGHT()`.
- **Instructor Resolution**:
  - Validated and taught the entire SQL string-slicing trio:
    1. `LEFT(str, N)`: Prefix extraction from start (e.g. area codes).
    2. `RIGHT(str, N)`: Suffix extraction from end (e.g. file extensions, card numbers).
    3. `SUBSTRING(str, start, len)` / `SUBSTR`: Middle extraction (1-indexed).
  - Added permanently to [`PATTERNS.md`](../PATTERNS.md) Section 2.C and [`THEORY.md`](./THEORY.md).

---

## ❓ Question 3: "What will `ASC` do after the `RIGHT()` function and how will I know whether to use `ASC` or `DESC`?"
- **Context**: Understanding string sorting dynamics.
- **Instructor Resolution**:
  - Explained that `ASC` sorts the extracted 3-letter substrings alphabetically from A to Z (`'art'` before `'ley'` before `'lia'`).
  - Provided the Golden Rule: Default to `ASC` for standard/alphabetical sorting; use `DESC` only when prompt explicitly requests *"reverse alphabetical"* or *"highest/newest first"*.
  - Query executed and passed on first attempt (+15.00 pts, Total Score: 215 / 300 pts).

---

## 💡 Student Self-Debugging Milestone: Numeric Literals & Currency Symbols
- **Student Action & Reflection**: *"Earlier I wrote $ with salary and got an error, and then I removed it and got it success. I wrote the query all by myself."*
- **Instructor Analysis**:
  - **The Currency Symbol Gotcha**: Business prompts often write formatted text like *"salary greater than $2000"*, but SQL database columns are numeric (`INTEGER` / `DECIMAL`).
  - Numeric literals must **never include currency symbols (`$`, `€`, `₹`) or commas (`2,000`)** in SQL predicates (`WHERE salary > 2000`).
  - Student independently identified and resolved this without prompt assistance, demonstrating true developer maturity.
- **Milestone Achieved**: 🏆 **Phase 1 (Basic Select Subdomain) 100% CONQUERED (20 / 20 Problems Solved)!**
