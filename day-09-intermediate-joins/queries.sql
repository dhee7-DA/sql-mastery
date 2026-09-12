-- =============================================================================
-- DAY 09: INTERMEDIATE RELATIONAL JOINS, RANGE SLICING & MULTI-TABLE CHAINS
-- Dialect: MySQL 8.0+ / ANSI SQL
-- HackerRank Problems: The Report, Top Competitors, Ollivander's Inventory
-- =============================================================================

-- -----------------------------------------------------------------------------
-- PROBLEM 1: THE REPORT (HackerRank Medium)
-- Objective: Generate a report containing Name, Grade and Mark.
--            Ketty doesn't want names of students with Grade < 8 (show 'NULL').
--            Order by Grade DESC.
--            For Grades 8-10: If tie on Grade, sort alphabetically by Name ASC.
--            For Grades 1-7: Show 'NULL' as name, sort by Grade DESC, then Mark ASC.
-- -----------------------------------------------------------------------------

SELECT 
    CASE 
        WHEN g.Grade >= 8 THEN s.Name 
        ELSE NULL 
    END AS Name,
    g.Grade,
    s.Marks
FROM Students s
JOIN Grades g 
  ON s.Marks BETWEEN g.Min_Mark AND g.Max_Mark
ORDER BY 
    g.Grade DESC,
    CASE 
        WHEN g.Grade >= 8 THEN s.Name 
        ELSE NULL 
    END ASC,
    s.Marks ASC;

-- Alternative idiomatic syntax using IF():
/*
SELECT 
    IF(g.Grade >= 8, s.Name, 'NULL') AS Name,
    g.Grade,
    s.Marks
FROM Students s
JOIN Grades g 
  ON s.Marks BETWEEN g.Min_Mark AND g.Max_Mark
ORDER BY 
    g.Grade DESC,
    IF(g.Grade >= 8, s.Name, s.Marks) ASC,
    s.Marks ASC;
*/


-- -----------------------------------------------------------------------------
-- PROBLEM 2: TOP COMPETITORS (HackerRank Medium)
-- Objective: Print hacker_id and name of hackers who achieved full scores
--            for more than one challenge.
--            Order by total full-score challenges DESC, then hacker_id ASC.
-- Schema:
--   Hackers (hacker_id, name)
--   Difficulty (difficulty_level, score)
--   Challenges (challenge_id, hacker_id, difficulty_level)
--   Submissions (submission_id, hacker_id, challenge_id, score)
-- -----------------------------------------------------------------------------

SELECT 
    h.hacker_id,
    h.name
FROM Submissions s
JOIN Challenges c  ON s.challenge_id = c.challenge_id
JOIN Difficulty d  ON c.difficulty_level = d.difficulty_level
JOIN Hackers h     ON s.hacker_id = h.hacker_id
WHERE s.score = d.score  -- Full score condition: submission score matches max challenge score!
GROUP BY 
    h.hacker_id, 
    h.name
HAVING 
    COUNT(s.submission_id) > 1  -- Only hackers who aced >1 challenge!
ORDER BY 
    COUNT(s.submission_id) DESC, 
    h.hacker_id ASC;


-- -----------------------------------------------------------------------------
-- PROBLEM 3: OLLIVANDER'S INVENTORY (HackerRank Medium)
-- Objective: Determine minimum gold galleons needed to buy each high-power wand
--            of non-evil craft.
--            Print id, age, coins_needed, and power.
--            Sort in order of descending power, then descending age.
-- Schema:
--   Wands (id, code, coins_needed, power)
--   Wands_Property (code, age, is_evil)
-- -----------------------------------------------------------------------------

SELECT 
    w.id,
    wp.age,
    w.coins_needed,
    w.power
FROM Wands w
JOIN Wands_Property wp ON w.code = wp.code
WHERE wp.is_evil = 0
  AND w.coins_needed = (
      -- Correlated subquery: finds minimum coins for this exact (age, power) pair
      SELECT MIN(w2.coins_needed)
      FROM Wands w2
      JOIN Wands_Property wp2 ON w2.code = wp2.code
      WHERE wp2.is_evil = 0
        AND w2.power = w.power
        AND wp2.age = wp.age
  )
ORDER BY 
    w.power DESC, 
    wp.age DESC;

-- Alternative Modern Approach using Window Functions (MySQL 8.0+):
/*
WITH RankedWands AS (
    SELECT 
        w.id,
        wp.age,
        w.coins_needed,
        w.power,
        DENSE_RANK() OVER (
            PARTITION BY w.power, wp.age 
            ORDER BY w.coins_needed ASC
        ) AS cost_rank
    FROM Wands w
    JOIN Wands_Property wp ON w.code = wp.code
    WHERE wp.is_evil = 0
)
SELECT id, age, coins_needed, power
FROM RankedWands
WHERE cost_rank = 1
ORDER BY power DESC, age DESC;
*/
