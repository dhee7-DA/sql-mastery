# 💬 Day 01 Daily Q&A & Debugging Log

A running record of user queries, questions asked to the instructor, errors encountered, and dialect comparisons.

---

## ❓ Question 1: "How am I gonna solve it without understanding the concepts?"
- **Context**: Felt overwhelmed looking at an empty SQL editor.
- **Instructor Resolution**:
  - Grounded the concept in an intuitive Excel spreadsheet analogy.
  - Deconstructed queries into 3 natural questions:
    1. `FROM` = Which table / spreadsheet tab?
    2. `WHERE` = Which rows to keep (filtering)?
    3. `SELECT` = Which columns to display on screen?
  - Illustrated with concrete side-by-side examples.

---

## ❓ Question 2: "Which server to choose? DB2 gave wrong answer, but MySQL said correct."
- **Context**: Selected IBM DB2 on HackerRank and received a failure on Problem 1.
- **Instructor Resolution**:
  - **Issue**: DB2 uses legacy fixed-width character padding and output formatting quirks that trip up HackerRank's string comparison grader.
  - **Decision**: Standardize on **MySQL 8.0+** for all 14 days on HackerRank.

---

## ❓ Question 3: "If I practice MySQL, will it be problematic to use PostgreSQL later? Or is the difference minor?"
- **Context**: Career anxiety regarding dialect lock-in and employer requirements.
- **Instructor Resolution**:
  - **The 95% Rule**: All core SQL concepts (`SELECT`, `WHERE`, `JOIN`, `GROUP BY`, `HAVING`, CTEs, Window Functions) follow the ANSI SQL standard and are 100% portable.
  - **Minor differences**: Limited to syntactic sugar (e.g., `CONCAT()` vs `||`, date math functions).
  - **Industry Reality**: Data Analysts frequently switch between PostgreSQL, BigQuery, Snowflake, Databricks, and MySQL. Employers test analytical logic and data problem-solving, not engine-specific memorization.

---

## ❓ Question 4: "I tried selecting the DISTRICT column but it says it's wrong... I was getting confused that NAME is the name of a person"
- **Context**: Problem 06 (*Japanese Cities' Names*). Selected `DISTRICT` instead of `NAME`.
- **Instructor Resolution & Core Learning**:
  - **Table Grain & Entity Semantics**: In Data Analysis, you must always identify what **one row represents** (the *grain* of the table).
  - In a `CITY` table, each row is a city. Therefore, the `NAME` column represents the *City's name*, not a person. `DISTRICT` represents the region / prefecture.
  - **Action**: Corrected projection to `SELECT NAME FROM CITY WHERE COUNTRYCODE = 'JPN';`.

---

## ❓ Question 5: "So we use MOD with WHERE clause and after it. Tell me more about MOD and interview cases."
- **Context**: Solved Problem 08 (*Weather Observation Station 3*). Wanted deep architectural understanding of `MOD` and company interview applications.
- **Instructor Resolution & Additions**:
  - Replaced raw LaTeX math formulas with clean Unicode division boxes and tables.
  - Documented the 4 primary business use cases: Even/Odd parity, Systematic Data Sampling (every 10th row), A/B Test Cohort Splitting (3-way splits), and Time duration conversion.
  - Created a dedicated [`INTERVIEW_QUESTIONS.md`](./INTERVIEW_QUESTIONS.md) containing actual interview scenarios from Amazon, Meta, Uber, and Netflix.

---

## 🛠️ Errors & Blockers Tracked Today
| # | Issue / Blocker | Root Cause | Fix Applied |
|---|---|---|---|
| 1 | Grader failure on DB2 | Dialect whitespace / formatting mismatch | Switched HackerRank dropdown to MySQL |
| 2 | Theoretical gap on execution order | Assuming SQL runs top-to-bottom | Documented 8-stage logical execution lifecycle in `THEORY.md` |
| 3 | Schema misinterpretation (`DISTRICT` vs `NAME`) | Assumed `NAME` referred to a person rather than the city entity | Checked entity grain of table (`CITY` row = city) and selected `NAME` |
| 4 | Raw LaTeX unrendered math | Markdown viewers lacking mathjax parsing | Standardized all equations to clean Unicode ASCII visuals |
