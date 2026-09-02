# 🛠️ Day 03 Solutions & Technical Breakdowns

---

## 📌 Problem 01: Higher Than 75 Marks
- **SQL Concept**: `RIGHT(str, len)` + Compound `ORDER BY`
- **Query**:
  ```sql
  SELECT Name
  FROM STUDENTS
  WHERE Marks > 75
  ORDER BY RIGHT(Name, 3) ASC, ID ASC;
  ```
- **Execution Breakdown**:
  1. `FROM STUDENTS`: Scans student records.
  2. `WHERE Marks > 75`: Filters for high-scoring students.
  3. `ORDER BY RIGHT(Name, 3) ASC`: Extracts last 3 letters of each name (e.g. `Bobby` ➡️ `bby`, `Ashley` ➡️ `ley`) and sorts alphabetically.
  4. `, ID ASC`: If two names have identical last 3 characters, sorts by ID ascending.
  5. `SELECT Name`: Outputs only the student names.

---

## 📌 Problem 02: Employee Names
- **SQL Concept**: Alphabetical Sort
- **Query**:
  ```sql
  SELECT name
  FROM Employee
  ORDER BY name ASC;
  ```

---

## 📌 Problem 03: Employee Salaries
- **SQL Concept**: Compound `AND` Predicate + Primary Key Sorting
- **Query**:
  ```sql
  SELECT name
  FROM Employee
  WHERE salary > 2000 
    AND months < 10
  ORDER BY employee_id ASC;
  ```
