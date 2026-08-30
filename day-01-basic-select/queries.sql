-- =============================================================================
-- DAY 01: BASIC SELECT & ROW FILTERING
-- Dialect: MySQL / MS SQL Server / Oracle
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Problem 01: Revising the Select Query I
-- Table: CITY
-- Query all columns for all American cities in the CITY table with populations
-- larger than 100,000. The CountryCode for America is USA.
-- Link: https://www.hackerrank.com/challenges/revising-the-select-query/problem
-- -----------------------------------------------------------------------------

-- Write your query below:
SELECT *
FROM CITY
WHERE COUNTRYCODE = 'USA' AND POPULATION > 100000;
-- -----------------------------------------------------------------------------
-- Problem 02: Revising the Select Query II
-- Table: CITY
-- Query the NAME field for all American cities in the CITY table with
-- populations larger than 120,000. The CountryCode for America is USA.
-- Link: https://www.hackerrank.com/challenges/revising-the-select-query-2/problem
-- -----------------------------------------------------------------------------

-- Write your query below:
SELECT NAME
FROM CITY
WHERE COUNTRYCODE = 'USA' AND POPULATION > 120000;
-- -----------------------------------------------------------------------------
-- Problem 03: Select All
-- Table: CITY
-- Query all columns (attributes) for every row in the CITY table.
-- Link: https://www.hackerrank.com/challenges/select-all-sql/problem
-- -----------------------------------------------------------------------------

-- Write your query below:



-- -----------------------------------------------------------------------------
-- Problem 04: Select By ID
-- Table: CITY
-- Query all columns for a city in CITY with the ID 1661.
-- Link: https://www.hackerrank.com/challenges/select-by-id/problem
-- -----------------------------------------------------------------------------

-- Write your query below:
SELECT *
FROM CITY
WHERE ID = 1661;
-- -----------------------------------------------------------------------------
-- Problem 05: Japanese Cities' Attributes
-- Table: CITY
-- Query all attributes of every Japanese city in the CITY table.
-- The COUNTRYCODE for Japan is JPN.
-- Link: https://www.hackerrank.com/challenges/japanese-cities-attributes/problem
-- -----------------------------------------------------------------------------

-- Write your query below:
SELECT *
FROM CITY
WHERE COUNTRYCODE = 'JPN';
-- -----------------------------------------------------------------------------
-- Problem 06: Japanese Cities' Names
-- Table: CITY
-- Query the names of all the Japanese cities in the CITY table.
-- The COUNTRYCODE for Japan is JPN.
-- Link: https://www.hackerrank.com/challenges/japanese-cities-name/problem
-- -----------------------------------------------------------------------------

-- Write your query below:
SELECT NAME
FROM CITY
WHERE COUNTRYCODE = 'JPN';
-- -----------------------------------------------------------------------------
-- Problem 07: Weather Observation Station 1
-- Table: STATION
-- Query a list of CITY and STATE from the STATION table.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-1/problem
-- -----------------------------------------------------------------------------

-- Write your query below:



-- -----------------------------------------------------------------------------
-- Problem 08: Weather Observation Station 3
-- Table: STATION
-- Query a list of CITY names from STATION for cities that have an even ID number.
-- Print the results in any order, but exclude duplicates from the answer.
-- Link: https://www.hackerrank.com/challenges/weather-observation-station-3/problem
-- -----------------------------------------------------------------------------

-- Write your query below:


