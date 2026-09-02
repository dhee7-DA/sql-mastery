-- =============================================================================
-- DAY 03: SORTING, ORDERING & SUBSTRINGS
-- Subdomain: Basic Select (Final 3 Challenges)
-- Dialect: MySQL 8.0+
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Problem 01: Higher Than 75 Marks
-- Table: STUDENTS
-- Query the Name of any student in STUDENTS who scored higher than 75 Marks.
-- Order your output by the LAST THREE CHARACTERS of each name. If two or more
-- students both have names ending in the same last 3 characters, secondary sort by ascending ID.
-- Link: https://www.hackerrank.com/challenges/more-than-75-marks/problem
-- -----------------------------------------------------------------------------

-- Write your query below:
SELECT Name
FROM STUDENTS
WHERE Marks > 75
ORDER BY RIGHT(Name, 3) ASC, ID ASC;
-- -----------------------------------------------------------------------------
-- Problem 02: Employee Names
-- Table: Employee
-- Write a query that prints a list of employee names from the Employee table
-- in alphabetical order.
-- Link: https://www.hackerrank.com/challenges/name-of-employees/problem
-- -----------------------------------------------------------------------------

-- Write your query below:
SELECT name
FROM Employee
ORDER BY name ASC;
-- -----------------------------------------------------------------------------
-- Problem 03: Employee Salaries
-- Table: Employee
-- Write a query that prints a list of employee names for employees in Employee
-- having a salary greater than $2000 per month who have been employees for less
-- than 10 months. Sort your result by ascending employee_id.
-- Link: https://www.hackerrank.com/challenges/salary-of-employees/problem
-- -----------------------------------------------------------------------------

-- Write your query below:
SELECT name
FROM Employee
WHERE salary > 2000 
  AND months < 10
ORDER BY employee_id ASC;
