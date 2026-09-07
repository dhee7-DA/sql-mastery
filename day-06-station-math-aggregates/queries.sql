-- =============================================================================
-- SQL MASTERY INTENSIVE: DAY 06 PRODUCTION QUERIES
-- TOPIC: Station Math, Coordinate Distances & Calculating Medians
-- DIALECT: MySQL 8.0+ / ANSI SQL
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Weather Observation Station 2
-- Goal: Query the sum of all values in LAT_N and LONG_W rounded to 2 decimal places.
-- -----------------------------------------------------------------------------
SELECT 
    ROUND(SUM(LAT_N), 2) AS lat,
    ROUND(SUM(LONG_W), 2) AS lon
FROM STATION;

-- -----------------------------------------------------------------------------
-- 2. Weather Observation Station 13
-- Goal: Query the sum of LAT_N for values between 38.7880 and 137.2345 (exclusive).
-- Round output to 4 decimal places.
-- -----------------------------------------------------------------------------
SELECT 
    ROUND(SUM(LAT_N), 4)
FROM STATION
WHERE LAT_N > 38.7880 
  AND LAT_N < 137.2345;

-- -----------------------------------------------------------------------------
-- 3. Weather Observation Station 14
-- Goal: Query the greatest value of LAT_N less than 137.2345, rounded to 4 decimals.
-- -----------------------------------------------------------------------------
SELECT 
    ROUND(MAX(LAT_N), 4)
FROM STATION
WHERE LAT_N < 137.2345;

-- -----------------------------------------------------------------------------
-- 4. Weather Observation Station 15
-- Goal: Query LONG_W for the largest LAT_N less than 137.2345, rounded to 4 decimals.
-- Pattern: Cross-attribute lookup using ORDER BY ... LIMIT 1
-- -----------------------------------------------------------------------------
SELECT 
    ROUND(LONG_W, 4)
FROM STATION
WHERE LAT_N < 137.2345
ORDER BY LAT_N DESC
LIMIT 1;

-- -----------------------------------------------------------------------------
-- 5. Weather Observation Station 16
-- Goal: Query the smallest LAT_N greater than 38.7780, rounded to 4 decimals.
-- -----------------------------------------------------------------------------
SELECT 
    ROUND(MIN(LAT_N), 4)
FROM STATION
WHERE LAT_N > 38.7780;

-- -----------------------------------------------------------------------------
-- 6. Weather Observation Station 17
-- Goal: Query LONG_W for the smallest LAT_N greater than 38.7780, rounded to 4 decimals.
-- Pattern: Cross-attribute lookup using ORDER BY ... LIMIT 1
-- -----------------------------------------------------------------------------
SELECT 
    ROUND(LONG_W, 4)
FROM STATION
WHERE LAT_N > 38.7780
ORDER BY LAT_N ASC
LIMIT 1;

-- -----------------------------------------------------------------------------
-- 7. Weather Observation Station 18
-- Goal: Calculate Manhattan Distance between P1(min LAT, min LONG) and P2(max LAT, max LONG)
-- Formula: |a - c| + |b - d| = (MAX(LAT_N) - MIN(LAT_N)) + (MAX(LONG_W) - MIN(LONG_W))
-- -----------------------------------------------------------------------------
SELECT 
    ROUND(
        (MAX(LAT_N) - MIN(LAT_N)) + (MAX(LONG_W) - MIN(LONG_W)), 
        4
    ) AS manhattan_distance
FROM STATION;

-- -----------------------------------------------------------------------------
-- 8. Weather Observation Station 19
-- Goal: Calculate Euclidean Distance between P1(min LAT, min LONG) and P2(max LAT, max LONG)
-- Formula: SQRT((c - a)^2 + (d - b)^2)
-- -----------------------------------------------------------------------------
SELECT 
    ROUND(
        SQRT(
            POW(MAX(LAT_N) - MIN(LAT_N), 2) + 
            POW(MAX(LONG_W) - MIN(LONG_W), 2)
        ), 
        4
    ) AS euclidean_distance
FROM STATION;

-- -----------------------------------------------------------------------------
-- 9. Weather Observation Station 20
-- Goal: Query the Median of Northern Latitudes (LAT_N), rounded to 4 decimal places.
-- -----------------------------------------------------------------------------

-- Method A: MySQL 8.0 Window Functions (CTE & ROW_NUMBER) - Production Standard
WITH RankedStations AS (
    SELECT 
        LAT_N,
        ROW_NUMBER() OVER (ORDER BY LAT_N) AS r_asc,
        COUNT(*) OVER () AS total_count
    FROM STATION
)
SELECT 
    ROUND(AVG(LAT_N), 4) AS median_lat
FROM RankedStations
WHERE r_asc IN (FLOOR((total_count + 1) / 2), CEIL((total_count + 1) / 2));

-- Method B: MySQL 5.7 User Variables (HackerRank Compatible)
SET @r := -1;

SELECT 
    ROUND(AVG(sub.LAT_N), 4)
FROM (
    SELECT 
        @r := @r + 1 AS r_idx, 
        LAT_N
    FROM STATION
    ORDER BY LAT_N ASC
) AS sub
WHERE sub.r_idx IN (FLOOR(@r / 2), CEIL(@r / 2));
