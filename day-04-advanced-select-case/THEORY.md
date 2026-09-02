# 📚 Day 04 Theory: Conditional Branching with `CASE WHEN`

---

## 🧠 1. What is `CASE WHEN`?

In SQL, `CASE WHEN` is the **IF-THEN-ELSE** engine. It lets you create new categorized columns, tag customer segments, calculate conditional discounts, or classify geometric shapes.

### 🏛️ The Universal `CASE WHEN` Syntax:
```sql
CASE
    WHEN condition_1 THEN 'Output 1'
    WHEN condition_2 THEN 'Output 2'
    WHEN condition_3 THEN 'Output 3'
    ELSE 'Default Output'
END
```

---

## 🔍 2. The Golden Rule of `CASE WHEN`: Sequential Evaluation

> **CRITICAL RULE**: SQL evaluates `WHEN` conditions **from top to bottom** and stops at the **FIRST TRUE MATCH**.

Look at this finance example:
```sql
CASE
    WHEN credit_score >= 800 THEN 'Tier 1: Excellent'
    WHEN credit_score >= 700 THEN 'Tier 2: Good'
    WHEN credit_score >= 600 THEN 'Tier 3: Fair'
    ELSE 'Tier 4: Subprime'
END AS credit_tier
```
If a customer has a credit score of `850`, SQL checks line 1 (`>= 800` is TRUE), assigns `'Tier 1'`, and **skips all other lines**!

---

## 📐 3. Deconstructing "Type of Triangle" (The Trap!)

In geometry, three side lengths $A$, $B$, $C$ form shapes according to these rules:

1. **Not A Triangle (The Triangle Inequality Theorem)**:
   - For 3 sides to form a triangle, the sum of **any two sides MUST be greater than the third side**.
   - If $A + B \le C$ OR $A + C \le B$ OR $B + C \le A$, it is **`Not A Triangle`**!
   - ⚠️ **TRAP**: You **MUST check this FIRST** in your `CASE` statement! If you don't, a shape with sides `20, 20, 40` might mistakenly get labeled as `Isosceles` because $A = B$, even though $20 + 20 = 40$ means it cannot physically close into a triangle!

2. **Equilateral**:
   - All 3 sides are equal: `A = B AND B = C` (which automatically implies $A = C$).

3. **Isosceles**:
   - Any 2 sides are equal: `A = B OR B = C OR A = C`.

4. **Scalene**:
   - All 3 sides are different: `ELSE 'Scalene'`.
