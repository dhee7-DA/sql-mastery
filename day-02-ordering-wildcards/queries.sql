-- =============================================================================
-- DAY 02: COUNT ARITHMETIC & VOWEL PATTERN MATCHING (STATION 4, 6-12)
-- Dialect: MySQL 8.0+
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Problem 01: Weather Observation Station 4
-- Table: STATION
-- Find the difference between the total number of CITY entries in the table
-- and the number of distinct CITY entries in the table.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-4/problem
-- -----------------------------------------------------------------------------

-- Write your query below:
SELECT COUNT(CITY) - COUNT(DISTINCT CITY)
FROM STATION;
-- -----------------------------------------------------------------------------
-- Problem 02: Weather Observation Station 6
-- Table: STATION
-- Query the list of CITY names starting with vowels (i.e., a, e, i, o, or u)
-- from STATION. Your result cannot contain duplicates.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-6/problem
-- -----------------------------------------------------------------------------

-- Write your query below:



-- -----------------------------------------------------------------------------
-- Problem 03: Weather Observation Station 7
-- Table: STATION
-- Query the list of CITY names ending with vowels (a, e, i, o, u) from STATION.
-- Your result cannot contain duplicates.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-7/problem
-- -----------------------------------------------------------------------------

-- Write your query below:



-- -----------------------------------------------------------------------------
-- Problem 04: Weather Observation Station 8
-- Table: STATION
-- Query the list of CITY names from STATION which have vowels (i.e., a, e, i, o,
-- and u) as both their first AND their last characters. Exclude duplicates.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-8/problem
-- -----------------------------------------------------------------------------

-- Write your query below:



-- -----------------------------------------------------------------------------
-- Problem 05: Weather Observation Station 9
-- Table: STATION
-- Query the list of CITY names from STATION that do NOT start with vowels.
-- Your result cannot contain duplicates.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-9/problem
-- -----------------------------------------------------------------------------

-- Write your query below:



-- -----------------------------------------------------------------------------
-- Problem 06: Weather Observation Station 10
-- Table: STATION
-- Query the list of CITY names from STATION that do NOT end with vowels.
-- Your result cannot contain duplicates.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-10/problem
-- -----------------------------------------------------------------------------

-- Write your query below:



-- -----------------------------------------------------------------------------
-- Problem 07: Weather Observation Station 11
-- Table: STATION
-- Query the list of CITY names from STATION that either do NOT start with vowels
-- OR do NOT end with vowels. Your result cannot contain duplicates.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-11/problem
-- -----------------------------------------------------------------------------

-- Write your query below:



-- -----------------------------------------------------------------------------
-- Problem 08: Weather Observation Station 12
-- Table: STATION
-- Query the list of CITY names from STATION that do NOT start with vowels
-- AND do NOT end with vowels. Your result cannot contain duplicates.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-12/problem
-- -----------------------------------------------------------------------------

-- Write your query below:


