-- =============================================================================
-- DAY 05: BASIC AGGREGATIONS (COUNT, SUM, AVG, MIN, MAX)
-- Subdomain: Basic Aggregation
-- Dialect: MySQL 8.0+
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Problem 01: Revising Aggregations - The Count Function
-- Table: CITY
-- Query a count of the number of cities in CITY having a Population larger than 100,000.
-- Link: https://www.hackerrank.com/challenges/revising-aggregations-the-count-function/problem
-- -----------------------------------------------------------------------------
SELECT COUNT(*) 
FROM CITY 
WHERE POPULATION > 100000;


-- -----------------------------------------------------------------------------
-- Problem 02: Revising Aggregations - The Sum Function
-- Table: CITY
-- Query the total population of all cities in CITY where District is 'California'.
-- Link: https://www.hackerrank.com/challenges/revising-aggregations-the-sum-function/problem
-- -----------------------------------------------------------------------------
SELECT SUM(POPULATION) 
FROM CITY 
WHERE DISTRICT = 'California';


-- -----------------------------------------------------------------------------
-- Problem 03: Revising Aggregations - Averages
-- Table: CITY
-- Query the average population of all cities in CITY where District is 'California'.
-- Link: https://www.hackerrank.com/challenges/revising-aggregations-the-average-function/problem
-- -----------------------------------------------------------------------------
SELECT AVG(POPULATION) 
FROM CITY 
WHERE DISTRICT = 'California';


-- -----------------------------------------------------------------------------
-- Problem 04: Average Population
-- Table: CITY
-- Query the average population for all cities in CITY, rounded down to the nearest integer.
-- Link: https://www.hackerrank.com/challenges/average-population/problem
-- -----------------------------------------------------------------------------
SELECT FLOOR(AVG(POPULATION)) 
FROM CITY;


-- -----------------------------------------------------------------------------
-- Problem 05: Japan Population
-- Table: CITY
-- Query the sum of the populations for all Japanese cities in CITY. The COUNTRYCODE for Japan is JPN.
-- Link: https://www.hackerrank.com/challenges/japan-population/problem
-- -----------------------------------------------------------------------------
SELECT SUM(POPULATION) 
FROM CITY 
WHERE COUNTRYCODE = 'JPN';


-- -----------------------------------------------------------------------------
-- Problem 06: Population Density Difference
-- Table: CITY
-- Query the difference between the maximum and minimum populations in CITY.
-- Link: https://www.hackerrank.com/challenges/population-density-difference/problem
-- -----------------------------------------------------------------------------
SELECT MAX(POPULATION) - MIN(POPULATION) 
FROM CITY;


-- -----------------------------------------------------------------------------
-- Problem 07: The Blunder
-- Table: EMPLOYEES
-- Samantha was tasked with calculating the average monthly salaries for all employees
-- in the EMPLOYEES table, but did not realize her keyboard's '0' key was broken until
-- after completing the calculation. She wants your help finding the difference between
-- her miscalculation (using salaries with zeros removed), and the actual average salary.
-- Write a query calculating the amount of error (i.e.: actual - miscalculated average salaries),
-- and round it up to the next integer.
-- Link: https://www.hackerrank.com/challenges/the-blunder/problem
-- -----------------------------------------------------------------------------
SELECT CEIL(AVG(SALARY) - AVG(CAST(REPLACE(CAST(SALARY AS CHAR), '0', '') AS DECIMAL(10, 2))))
FROM EMPLOYEES;


-- -----------------------------------------------------------------------------
-- Problem 08: Top Earners
-- Table: Employee
-- We define an employee's total earnings to be their monthly (salary * months) worked,
-- and the maximum total earnings to be the maximum total earnings for any employee in the Employee table.
-- Write a query to find the maximum total earnings for all employees as well as the total number of employees
-- who have maximum total earnings. Then print these values as 2 space-separated integers.
-- Link: https://www.hackerrank.com/challenges/earnings-of-employees/problem
-- -----------------------------------------------------------------------------
SELECT (months * salary) AS total_earnings, COUNT(*)
FROM Employee
GROUP BY total_earnings
ORDER BY total_earnings DESC
LIMIT 1;


-- -----------------------------------------------------------------------------
-- Problem 09: Weather Observation Station 2
-- Table: STATION
-- Query the following two values from the STATION table:
-- 1. The sum of all values in LAT_N rounded to a scale of 2 decimal places.
-- 2. The sum of all values in LONG_W rounded to a scale of 2 decimal places.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-2/problem
-- -----------------------------------------------------------------------------
SELECT ROUND(SUM(LAT_N), 2), ROUND(SUM(LONG_W), 2)
FROM STATION;


-- -----------------------------------------------------------------------------
-- Problem 10: Weather Observation Station 13
-- Table: STATION
-- Query the sum of Northern Latitudes (LAT_N) from STATION having values greater than 38.7880
-- and less than 137.2345. Truncate your answer to 4 decimal places.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-13/problem
-- -----------------------------------------------------------------------------
SELECT ROUND(SUM(LAT_N), 4)
FROM STATION
WHERE LAT_N > 38.7880 AND LAT_N < 137.2345;
