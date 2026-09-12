-- ==============================================================================
-- 📁 Day 10: Advanced Relational Joins, Pre-Aggregation & Coordinate Symmetry
-- 🛠️ Dialect: MySQL 8.0+ / ANSI SQL
-- 🎯 Challenges:
--    1. Contest Leaderboard (Medium)
--    2. Placements (Medium)
--    3. Symmetric Pairs (Medium)
-- ==============================================================================

-- ==============================================================================
-- 1. Contest Leaderboard
-- Problem: Calculate each hacker's total score as the SUM of their MAXIMUM scores 
-- across all challenges. Exclude hackers with a total score of 0.
-- Sort: total_score DESC, hacker_id ASC.
-- ==============================================================================

-- Solution A: Derived Table Pre-Aggregation (ANSI / Universal SQL)
SELECT 
    h.hacker_id, 
    h.name, 
    SUM(m.max_score) AS total_score
FROM Hackers h
INNER JOIN (
    SELECT hacker_id, challenge_id, MAX(score) AS max_score
    FROM Submissions
    GROUP BY hacker_id, challenge_id
) m ON h.hacker_id = m.hacker_id
GROUP BY h.hacker_id, h.name
HAVING total_score > 0
ORDER BY total_score DESC, h.hacker_id ASC;

-- Solution B: Modern CTE (Common Table Expression) Architecture
WITH MaxScoresPerChallenge AS (
    SELECT 
        hacker_id, 
        challenge_id, 
        MAX(score) AS max_score
    FROM Submissions
    GROUP BY hacker_id, challenge_id
),
HackerTotalScores AS (
    SELECT 
        hacker_id, 
        SUM(max_score) AS total_score
    FROM MaxScoresPerChallenge
    GROUP BY hacker_id
    HAVING SUM(max_score) > 0
)
SELECT 
    h.hacker_id, 
    h.name, 
    hts.total_score
FROM HackerTotalScores hts
INNER JOIN Hackers h ON hts.hacker_id = h.hacker_id
ORDER BY hts.total_score DESC, h.hacker_id ASC;


-- ==============================================================================
-- 2. Placements
-- Problem: Output the names of students whose best friends received higher salary 
-- offers than they did.
-- Sort: Friend's salary ASC.
-- Tables: Students (ID, Name), Friends (ID, Friend_ID), Packages (ID, Salary)
-- ==============================================================================

SELECT s.Name
FROM Students s
INNER JOIN Friends f   ON s.ID = f.ID
INNER JOIN Packages sp ON s.ID = sp.ID        -- Student's package
INNER JOIN Packages fp ON f.Friend_ID = fp.ID -- Best friend's package
WHERE fp.Salary > sp.Salary
ORDER BY fp.Salary ASC;


-- ==============================================================================
-- 3. Symmetric Pairs
-- Problem: Output all symmetric coordinate pairs (X, Y) such that X <= Y, 
-- ordered by X ascending. (X1 = Y2 AND Y1 = X2)
-- Note: When X = Y, the pair is only symmetric if it appears 2 or more times.
-- ==============================================================================

-- Solution A: Bifurcated Mathematical UNION (Disjoint Subsets)
-- Subset 1: Identical coordinates (X = Y) appearing at least twice
SELECT X, Y
FROM Functions
WHERE X = Y
GROUP BY X, Y
HAVING COUNT(*) > 1

UNION

-- Subset 2: Distinct coordinates (X < Y) with matching inverted pairs
SELECT f1.X, f1.Y
FROM Functions f1
INNER JOIN Functions f2 
    ON f1.X = f2.Y 
   AND f1.Y = f2.X
WHERE f1.X < f1.Y

ORDER BY X ASC;

-- Solution B: Single-Pass Self-Join using ROW_NUMBER() Synthetic Primary Key
WITH NumberedFunctions AS (
    SELECT 
        X, 
        Y, 
        ROW_NUMBER() OVER() AS row_id
    FROM Functions
)
SELECT DISTINCT f1.X, f1.Y
FROM NumberedFunctions f1
INNER JOIN NumberedFunctions f2 
    ON f1.X = f2.Y 
   AND f1.Y = f2.X 
   AND f1.row_id != f2.row_id -- Guarantees distinct physical records
WHERE f1.X <= f1.Y
ORDER BY f1.X ASC;
