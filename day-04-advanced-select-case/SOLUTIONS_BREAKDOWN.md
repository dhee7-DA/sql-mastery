# 🛠️ Day 04 Solutions & Technical Breakdowns

---

## 📌 Problem 01: Type of Triangle
- **SQL Concept**: Multi-branch `CASE WHEN` with Triangle Inequality Priority
- **Query**:
  ```sql
  SELECT 
      CASE
          WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'
          WHEN A = B AND B = C THEN 'Equilateral'
          WHEN A = B OR B = C OR A = C THEN 'Isosceles'
          ELSE 'Scalene'
      END
  FROM TRIANGLES;
  ```
- **Evaluation Order Logic**:
  1. `WHEN A + B <= C OR A + C <= B OR B + C <= A`: Rejects non-triangles first.
  2. `WHEN A = B AND B = C`: Rejects 3-equal-sided equilateral triangles.
  3. `WHEN A = B OR B = C OR A = C`: Captures 2-equal-sided isosceles triangles.
  4. `ELSE 'Scalene'`: All remaining valid triangles have 3 unequal sides.
