# 📚 Day 03 Theory: Substring Extraction & Multi-Column Sorting

---

## ✂️ 1. Substring Extraction Functions: `RIGHT()`, `LEFT()`, and `SUBSTRING()`

In SQL, manipulating and sorting by specific parts of a string is a daily data analysis requirement (e.g. extracting area codes, domain names, file extensions, or name suffixes).

```text
┌──────────────────────────────┬──────────────────────────────────────────────────────────┬────────────────────────┐
│ Function                     │ Definition & Mechanics                                   │ Example & Result       │
├──────────────────────────────┼──────────────────────────────────────────────────────────┼────────────────────────┤
│ 1. RIGHT(str, N)             │ Extracts the last N characters from the right end        │ RIGHT('Kristeen', 3)   │
│                              │ of the string.                                           │ ➡️ 'een'               │
├──────────────────────────────┼──────────────────────────────────────────────────────────┼────────────────────────┤
│ 2. LEFT(str, N)              │ Extracts the first N characters from the left start      │ LEFT('Kristeen', 4)    │
│                              │ of the string.                                           │ ➡️ 'Kris'              │
├──────────────────────────────┼──────────────────────────────────────────────────────────┼────────────────────────┤
│ 3. SUBSTRING(str, start, len)│ Extracts len characters starting at position start       │ SUBSTR('Kristeen', 5, 4│
│                              │ (1-indexed in SQL).                                      │ ➡️ 'teen'              │
└──────────────────────────────┴──────────────────────────────────────────────────────────┴────────────────────────┘
```

---

## 🎯 2. Sorting by Substrings & Secondary Tie-Breakers (Problem 01)

Look at the requirement from **Higher Than 75 Marks**:
> *"Sort the students by the **last three characters** of their name. If two or more students have names ending with the same 3 characters, **sort them by ascending ID**."*

### Translating to SQL:
- Primary Sort: `RIGHT(Name, 3) ASC`
- Secondary Tie-Breaker: `, ID ASC`

```sql
ORDER BY RIGHT(Name, 3) ASC, ID ASC;
```

---

## 🏢 3. Compound Boolean Filtering on Employee Records (Problem 03)

In corporate data analytics, filtering high-earning recent hires or low-tenure employees is common:
> *"Employees who have a salary greater than $2000 per month and have been employees for less than 10 months."*

```sql
WHERE salary > 2000 
  AND months < 10
ORDER BY employee_id ASC;
```
