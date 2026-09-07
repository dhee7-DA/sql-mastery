const fs = require('fs');

// =============================================================================
// 1. GENERATE 50 MASTER MCQS FOR "MATH & MEDIANS"
// =============================================================================

const mathQuestions = [
  {
    q: "Why is there no universal MEDIAN() aggregate function in standard ANSI SQL or MySQL 8.0?",
    ans: "Calculating exact median requires sorting the entire dataset, which does not fit cleanly into single-pass streaming aggregation (like SUM or COUNT)",
    distractors: [
      "The ANSI SQL standards committee deprecated MEDIAN() in 1999 due to floating point security bugs",
      "MEDIAN can only be calculated on prime numbers, so databases reject it",
      "SQL engines can only compute linear algebraic operations, not statistical percentiles"
    ],
    explanation: "Stream aggregates like SUM() and COUNT() maintain state in O(1) memory during a single scan. In contrast, finding the exact median requires global ordering or rank indexing (O(N log N) or two passes), so ANSI SQL left percentiles to window functions (PERCENTILE_CONT) or dialect-specific implementations."
  },
  {
    q: "What is the key functional difference between ROUND(123.456, 2) and TRUNCATE(123.456, 2) in MySQL?",
    ans: "ROUND rounds up to 123.46 based on the next digit; TRUNCATE chops off trailing decimals to 123.45 without rounding",
    distractors: [
      "ROUND converts to floating point while TRUNCATE converts to an integer string",
      "TRUNCATE deletes the table column while ROUND formats display only",
      "There is no difference; both produce 123.46"
    ],
    explanation: "ROUND(n, d) performs mathematical half-up rounding on digit d+1. TRUNCATE(n, d) simply discards any decimal places beyond position d without altering earlier digits."
  },
  {
    q: "In MySQL, what is the return value of ROUND(2.5) vs ROUND(3.5)?",
    ans: "3 and 4 (MySQL performs round-half-up for exact numeric types, moving away from zero)",
    distractors: [
      "2 and 4 (banker's rounding to nearest even number)",
      "2 and 3 (floor rounding)",
      "3 and 3 (nearest odd number)"
    ],
    explanation: "For exact-value numeric types (DECIMAL/INT), MySQL uses 'round half away from zero': 2.5 rounds to 3, and -2.5 rounds to -3. Note that Python 3 and IEEE-754 floating-point use banker's rounding (round to even)."
  },
  {
    q: "In 2D grid coordinates (x1, y1) and (x2, y2), what is the Manhattan (Taxicab / L1 Norm) Distance formula in SQL?",
    ans: "ABS(x1 - x2) + ABS(y1 - y2)",
    distractors: [
      "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
      "(x1 - x2) * (y1 - y2)",
      "POW(ABS(x1 - x2), 2) + POW(ABS(y1 - y2), 2)"
    ],
    explanation: "Manhattan Distance measures distance along orthogonal axes (city blocks). The formula is |x1 - x2| + |y1 - y2|, implemented in SQL as ABS(x1 - x2) + ABS(y1 - y2)."
  },
  {
    q: "When calculating Manhattan Distance between P1(MIN(LAT_N), MIN(LONG_W)) and P2(MAX(LAT_N), MAX(LONG_W)), why can ABS() be safely omitted?",
    ans: "Because MAX is mathematically guaranteed to be greater than or equal to MIN, so (MAX - MIN) is always >= 0",
    distractors: [
      "Because SQL automatically inverts negative numbers in SELECT clauses",
      "Because coordinates cannot be negative numbers in GPS systems",
      "Because the query optimizer replaces MIN and MAX with absolute magnitudes"
    ],
    explanation: "Since by definition MAX(col) >= MIN(col) for any non-empty set, (MAX(col) - MIN(col)) is inherently non-negative. Thus |MAX - MIN| = MAX - MIN."
  },
  {
    q: "What is the Euclidean (L2 Norm / Straight-Line) Distance formula in MySQL between (x1, y1) and (x2, y2)?",
    ans: "SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))",
    distractors: [
      "POW(SQRT(x1 - x2), 2) + POW(SQRT(y1 - y2), 2)",
      "ABS(x1 - x2) + ABS(y1 - y2)",
      "SQRT(ABS(x1 - x2) + ABS(y1 - y2))"
    ],
    explanation: "Euclidean distance is the straight-line hypotenuse derived from the Pythagorean theorem: sqrt((Δx)² + (Δy)²). In MySQL, this is computed via SQRT(POW(x1 - x2, 2) + POW(y1 - y2, 2))."
  },
  {
    q: "To query Western Longitude (LONG_W) corresponding to the LARGEST Northern Latitude (LAT_N) under 137.2345, which query is most performant?",
    ans: "SELECT LONG_W FROM STATION WHERE LAT_N < 137.2345 ORDER BY LAT_N DESC LIMIT 1;",
    distractors: [
      "SELECT LONG_W FROM STATION WHERE LAT_N = (SELECT MAX(LAT_N) FROM STATION WHERE LAT_N < 137.2345);",
      "SELECT MAX(LONG_W) FROM STATION WHERE LAT_N < 137.2345;",
      "SELECT LONG_W, MAX(LAT_N) FROM STATION GROUP BY LONG_W HAVING LAT_N < 137.2345;"
    ],
    explanation: "ORDER BY LAT_N DESC LIMIT 1 scans an index on LAT_N in reverse and halts after retrieving the first matching row (O(log N) with index or single top-1 heap pass). The subquery approach requires two passes over the table."
  },
  {
    q: "Why is 'SELECT LONG_W, MAX(LAT_N) FROM STATION WHERE LAT_N < 137.2345;' invalid in standard SQL?",
    ans: "LONG_W is not in a GROUP BY clause and is not an aggregated column, violating SQL-92 / ONLY_FULL_GROUP_BY",
    distractors: [
      "STATION cannot contain both numbers and strings",
      "WHERE clauses cannot contain decimal values",
      "MAX() cannot be called inside a SELECT statement that has two columns"
    ],
    explanation: "Under ONLY_FULL_GROUP_BY, projecting an unaggregated column (LONG_W) alongside an aggregate (MAX(LAT_N)) without GROUP BY is rejected because the engine cannot know which row's LONG_W to return."
  },
  {
    q: "In an odd-sized dataset of N = 499 rows sorted by value, which row number represents the exact median?",
    ans: "Row 250 (calculated as (N + 1) / 2)",
    distractors: [
      "Row 249",
      "Row 251",
      "The average of Row 249 and Row 250"
    ],
    explanation: "For an odd number of elements N, the median is the single middle element at position (N + 1) / 2. For N = 499, (499 + 1) / 2 = 250."
  },
  {
    q: "In an even-sized dataset of N = 500 rows sorted by value, how is the median mathematically computed?",
    ans: "The arithmetic mean (average) of elements at positions N/2 (row 250) and (N/2) + 1 (row 251)",
    distractors: [
      "Only row 250 is chosen by dropping the upper half",
      "Only row 251 is chosen by ceiling",
      "The sum of row 250 and row 251 without dividing by 2"
    ],
    explanation: "For an even count N, there is no single middle element. The median is defined as (Value[N/2] + Value[N/2 + 1]) / 2. For N = 500, that is (Row[250] + Row[251]) / 2."
  },
  {
    q: "Why does the condition 'row_num IN (FLOOR((total + 1) / 2.0), CEIL((total + 1) / 2.0))' work universally for both odd and even counts?",
    ans: "For odd N, FLOOR and CEIL evaluate to the same row (returning 1 row); for even N, they evaluate to N/2 and N/2 + 1 (returning the 2 middle rows)",
    distractors: [
      "Because FLOOR always converts floats to integers and CEIL deletes NULLs",
      "Because IN requires exactly two arguments in MySQL",
      "Because SQL window functions cannot evaluate fractions"
    ],
    explanation: "If N=5 (odd), (5+1)/2 = 3.0: FLOOR(3.0)=3, CEIL(3.0)=3 -> IN (3, 3) picks row 3. If N=6 (even), (6+1)/2 = 3.5: FLOOR(3.5)=3, CEIL(3.5)=4 -> IN (3, 4) picks rows 3 and 4. Wrapping in AVG() returns the exact median in both cases!"
  },
  {
    q: "When using user variables in MySQL 5.7 to assign row numbers, why is '@r := -1' initialized to -1 instead of 0 for zero-indexed median targeting?",
    ans: "Because the first increment '@r := @r + 1' turns -1 into 0, ensuring row indexes start cleanly at 0",
    distractors: [
      "MySQL user variables cannot store positive numbers",
      "To prevent buffer overflow in MySQL memory tables",
      "Because SQL arrays are 1-indexed so -1 offsets to 1"
    ],
    explanation: "Initializing @r := -1 means the first row evaluated gets @r := -1 + 1 = 0. This creates 0-based indexing [0, 1, ..., N-1], where the total count ends up stored in @r, simplifying zero-based median lookups."
  },
  {
    q: "What is the danger of relying on '@r := @r + 1' user variables inside SELECT statements in MySQL 8.0+?",
    ans: "Evaluation order of user variables is explicitly undefined in MySQL 8.0 and deprecated, potentially causing non-deterministic results",
    distractors: [
      "User variables cause the database disk to be wiped",
      "User variables lock all tables for write access indefinitely",
      "User variables cannot be used in subqueries"
    ],
    explanation: "The MySQL manual explicitly warns that order of evaluation of expressions involving user variables is undefined and may change between releases. Window functions (ROW_NUMBER) should always be used in MySQL 8.0+."
  },
  {
    q: "Which window function generates the exact fractional relative rank (from 0.0 to 1.0) of a row within a partition?",
    ans: "PERCENT_RANK()",
    distractors: [
      "DENSE_RANK()",
      "ROW_NUMBER()",
      "NTILE(100)"
    ],
    explanation: "PERCENT_RANK() calculates (rank - 1) / (total_rows - 1), producing values between 0.0 and 1.0. The median can be located where PERCENT_RANK() is closest to 0.5."
  },
  {
    q: "What does the SQL mathematical function ABS(-42.75) return?",
    ans: "42.75",
    distractors: [
      "-42.75",
      "42",
      "-42"
    ],
    explanation: "ABS(x) returns the absolute (positive) magnitude of x, stripping the negative sign."
  },
  {
    q: "In MySQL, what does POW(4, 0.5) evaluate to?",
    ans: "2.0 (equivalent to SQRT(4))",
    distractors: [
      "16.0",
      "2.5",
      "8.0"
    ],
    explanation: "Raising a number to the power of 0.5 is mathematically identical to taking its square root: POW(x, 0.5) == SQRT(x)."
  },
  {
    q: "What is the result of 'SELECT SQRT(-16);' in MySQL?",
    ans: "NULL (along with a domain error warning, since real square roots of negative numbers are undefined)",
    distractors: [
      "4",
      "-4",
      "4i"
    ],
    explanation: "In MySQL, SQRT(x) for x < 0 returns NULL and issues a 'numeric value out of range' warning because standard SQL math does not support imaginary/complex numbers."
  },
  {
    q: "What does 'SELECT FLOOR(7.89), CEIL(7.12);' return?",
    ans: "7, 8",
    distractors: [
      "8, 7",
      "7, 7",
      "8, 8"
    ],
    explanation: "FLOOR(x) returns the largest integer <= x (7.89 -> 7). CEIL(x) or CEILING(x) returns the smallest integer >= x (7.12 -> 8)."
  },
  {
    q: "What is the return value of FLOOR(-3.2) in SQL?",
    ans: "-4",
    distractors: [
      "-3",
      "-3.0",
      "3"
    ],
    explanation: "FLOOR moves toward negative infinity. The largest integer less than or equal to -3.2 is -4 (since -4 < -3.2 < -3)."
  },
  {
    q: "When rounding currency values, why is 'DECIMAL(12, 2)' preferred over 'FLOAT' or 'DOUBLE'?",
    ans: "DECIMAL is an exact fixed-point representation; FLOAT and DOUBLE are approximate binary floating-point numbers subject to rounding errors",
    distractors: [
      "DECIMAL consumes 0 bytes of disk storage",
      "FLOAT cannot store numbers greater than 100",
      "DOUBLE cannot be used in arithmetic operations like SUM"
    ],
    explanation: "FLOAT and DOUBLE use IEEE-754 binary floating-point, where numbers like 0.1 cannot be stored exactly, accumulating drift (e.g. 0.10000000000000000555). Financial ledgers require DECIMAL for exact decimal accuracy."
  },
  {
    q: "What does 'SELECT ROUND(12345.67, -2);' return in MySQL?",
    ans: "12300 (rounding to the hundreds place)",
    distractors: [
      "12345.00",
      "12345.67",
      "NULL"
    ],
    explanation: "A negative precision in ROUND(x, -d) rounds to digits to the left of the decimal point: -1 rounds to tens, -2 rounds to hundreds (12345.67 -> 12300)."
  },
  {
    q: "How does 'MOD(17, 5)' behave in MySQL?",
    ans: "Returns 2 (the remainder after integer division 17 / 5)",
    distractors: [
      "Returns 3 (the quotient)",
      "Returns 3.4",
      "Returns 0.4"
    ],
    explanation: "MOD(N, M) or N % M returns the remainder of N divided by M. 17 = (5 * 3) + 2, so the remainder is 2."
  },
  {
    q: "What does 'MOD(-17, 5)' return in MySQL vs PostgreSQL?",
    ans: "In MySQL: -2; the result takes the sign of the numerator (dividend)",
    distractors: [
      "In MySQL: 3 (always positive modulo)",
      "In MySQL: NULL",
      "In MySQL: 2"
    ],
    explanation: "In MySQL and C/C++, MOD(N, M) uses truncated division: -17 = (5 * -3) + (-2). The remainder carries the sign of the first argument (-17)."
  },
  {
    q: "When calculating Euclidean distance between two GPS points on Earth over long distances (>100 km), why is Euclidean distance inaccurate?",
    ans: "Earth is an oblate spheroid with spherical curvature; Euclidean distance assumes a flat 2D plane",
    distractors: [
      "GPS satellites do not use Cartesian coordinates",
      "The Pythagorean theorem is mathematically disproven for distances greater than 50 miles",
      "Latitude lines are diagonal rather than parallel"
    ],
    explanation: "Euclidean distance assumes flat 2D Euclidean geometry. For planetary distances, the Haversine formula or Great-Circle Distance (accounting for spherical curvature) is required."
  },
  {
    q: "In MySQL 8.0, which built-in spatial function calculates true spherical distance between two geometry points on an ellipsoid?",
    ans: "ST_Distance_Sphere(point1, point2)",
    distractors: [
      "GEODISTANCE(lat1, lon1, lat2, lon2)",
      "SPHERE_METRIC(p1, p2)",
      "CALC_HAVERSINE(p1, p2)"
    ],
    explanation: "MySQL provides spatial GIS functions including ST_Distance_Sphere(p1, p2) to compute the great-circle distance between two geometries on an earth sphere in meters."
  },
  {
    q: "Suppose an e-commerce platform has 10,000 orders where 9,990 orders are $20 and 10 orders are $1,000,000. Why is MEDIAN order value preferred over AVG?",
    ans: "The mean (AVG) is heavily skewed by extreme outliers ($1M whale orders), while the median accurately reflects typical customer spend ($20)",
    distractors: [
      "AVG() throws an overflow error on sets larger than 5,000 rows",
      "MEDIAN runs in O(1) time while AVG runs in O(N^2)",
      "Financial auditors prohibit the use of AVG() under GAAP accounting"
    ],
    explanation: "Mean is sensitive to extreme outliers, skewing the reported average to ~$1,020. The median remains $20, reflecting true central tendency without outlier distortion."
  },
  {
    q: "In a table of 100,000 rows, how can you quickly approximate the median without sorting all 100,000 rows in modern data warehouses (BigQuery/Snowflake)?",
    ans: "APPROX_QUANTILES(column, 100)[OFFSET(50)] or APPROX_PERCENTILE(column, 0.5)",
    distractors: [
      "SELECT MEDIAN(column) WITH NO SORT;",
      "SAMPLE 1 ROW FROM table;",
      "AVG(MIN(column) + MAX(column))"
    ],
    explanation: "Cloud analytical engines use streaming sketch algorithms (like T-Digest or HyperLogLog) via APPROX_QUANTILES or APPROX_PERCENTILE to compute percentiles within 1% error in O(N) single-pass without memory-intensive sorting."
  },
  {
    q: "In MySQL, what is the effect of 'SELECT SIGN(-150.5), SIGN(0), SIGN(42);'?",
    ans: "-1, 0, 1",
    distractors: [
      "'-', '0', '+'",
      "-150, 0, 42",
      "FALSE, NULL, TRUE"
    ],
    explanation: "SIGN(x) returns -1 if x < 0, 0 if x = 0, and 1 if x > 0."
  },
  {
    q: "Given coordinates X and Y, what does the expression 'SQRT(POW(X, 2) + POW(Y, 2))' represent geometrically?",
    ans: "The distance from the origin (0, 0) to point (X, Y)",
    distractors: [
      "The perimeter of the bounding box",
      "The slope of the line passing through (X, Y)",
      "The area of the triangle formed by X and Y"
    ],
    explanation: "By the Pythagorean theorem, the distance from (0, 0) to (X, Y) is sqrt((X - 0)² + (Y - 0)²) = sqrt(X² + Y²)."
  },
  {
    q: "When finding the maximum value under a ceiling (e.g. LAT_N < 137.2345), what happens if NO rows satisfy the predicate?",
    ans: "SELECT MAX(LAT_N) returns NULL",
    distractors: [
      "Returns 0",
      "Throws an EmptyResultSetException error",
      "Returns 137.2345"
    ],
    explanation: "Aggregate functions (except COUNT) return NULL when evaluated on an empty set or when all evaluated values are NULL."
  },
  {
    q: "What does 'SELECT ROUND(NULL, 4);' return in SQL?",
    ans: "NULL",
    distractors: [
      "0.0000",
      "0",
      "An error: NullPointerException"
    ],
    explanation: "Standard scalar mathematical functions in SQL return NULL whenever any operand is NULL."
  },
  {
    q: "Why is 'WHERE LAT_N > 38.7880 AND LAT_N < 137.2345' NOT equivalent to 'WHERE LAT_N BETWEEN 38.7880 AND 137.2345'?",
    ans: "BETWEEN is inclusive (>= and <=), whereas the first condition is strictly exclusive (> and <)",
    distractors: [
      "BETWEEN only works on integers, not floating point numbers",
      "BETWEEN evaluates in reverse descending order",
      "There is no difference; they are strictly identical"
    ],
    explanation: "In SQL, 'x BETWEEN a AND b' is syntactic sugar for 'x >= a AND x <= b'. If LAT_N equals exactly 38.7880, BETWEEN includes it, while '>' excludes it."
  },
  {
    q: "What is the time complexity of computing the exact median of N unsorted rows in a standard database engine?",
    ans: "O(N log N) because all rows must be sorted by the target attribute",
    distractors: [
      "O(1)",
      "O(N)",
      "O(N^2)"
    ],
    explanation: "Exact median requires determining the middle rank, which requires sorting all N elements (O(N log N)) or using a Quickselect-like partitioning algorithm."
  },
  {
    q: "If an index exists on LAT_N (B-Tree), what is the time complexity of 'SELECT LAT_N FROM STATION ORDER BY LAT_N LIMIT 1'?",
    ans: "O(1) or O(log N) to traverse to the leftmost leaf of the B-Tree index",
    distractors: [
      "O(N log N)",
      "O(N^2)",
      "O(N)"
    ],
    explanation: "A B-Tree index keeps keys pre-sorted on disk. Finding the minimum is as simple as reading the very first entry on the leftmost leaf node."
  },
  {
    q: "In MySQL, what is the output of 'SELECT CEIL(-4.2);'?",
    ans: "-4 (the smallest integer greater than or equal to -4.2)",
    distractors: [
      "-5",
      "-4.0",
      "4"
    ],
    explanation: "CEIL moves toward positive infinity on the number line. The smallest integer >= -4.2 is -4 (since -4 > -4.2)."
  },
  {
    q: "Which SQL operator calculates the remainder of division?",
    ans: "% or MOD()",
    distractors: [
      "REM",
      "//",
      "^"
    ],
    explanation: "Both the modulo operator (%) and the MOD(a, b) function calculate the remainder of division in ANSI SQL and MySQL."
  },
  {
    q: "What is the value of 'SELECT POW(2, 3);' in MySQL?",
    ans: "8",
    distractors: [
      "6",
      "9",
      "5"
    ],
    explanation: "POW(x, y) computes x raised to the power y: 2³ = 2 * 2 * 2 = 8."
  },
  {
    q: "What is the difference between NTILE(2) and computing the median directly?",
    ans: "NTILE(2) buckets rows into two halves (bucket 1 and bucket 2) but does not return the singular midpoint scalar value",
    distractors: [
      "NTILE(2) only works on tables with exactly 2 rows",
      "NTILE(2) calculates the mean of every pair of rows",
      "NTILE(2) is deprecated in SQL:2003"
    ],
    explanation: "NTILE(k) assigns an integer bucket from 1 to k to every row. While NTILE(2) divides rows into two halves, extracting the exact single median value still requires additional filtering and averaging."
  },
  {
    q: "What is the result of 'SELECT EXP(0);' in MySQL?",
    ans: "1 (any non-zero number raised to the power 0 is 1)",
    distractors: [
      "0",
      "2.71828",
      "NULL"
    ],
    explanation: "EXP(x) calculates e^x (Euler's constant raised to power x). For x = 0, e^0 = 1."
  },
  {
    q: "What does 'SELECT LN(1);' return in MySQL?",
    ans: "0 (the natural logarithm of 1 is 0)",
    distractors: [
      "1",
      "2.71828",
      "NULL"
    ],
    explanation: "The natural log of 1 is 0 because e^0 = 1. LN(x) computes log base e."
  },
  {
    q: "What is the return value of 'SELECT RADIANS(180);' in MySQL?",
    ans: "3.141592653589793 (Pi radians)",
    distractors: [
      "180",
      "1.0",
      "360"
    ],
    explanation: "RADIANS(degrees) converts degrees to radians via (degrees * π / 180). 180 degrees equals π radians."
  },
  {
    q: "What is the return value of 'SELECT DEGREES(PI());' in MySQL?",
    ans: "180",
    distractors: [
      "360",
      "90",
      "3.14159"
    ],
    explanation: "DEGREES(radians) converts radians back into degrees via (radians * 180 / π). PI() radians equals 180 degrees."
  },
  {
    q: "In high-frequency trading database systems, why is median latency (p50) tracked alongside 99th percentile latency (p99)?",
    ans: "p50 tracks the typical trader experience, while p99 catches extreme tail latency spikes that breach Service Level Agreements (SLAs)",
    distractors: [
      "p50 and p99 always return the same number",
      "p99 is only used for tax accounting",
      "p50 measures throughput while p99 measures storage size"
    ],
    explanation: "Tail latency (p99/p99.9) captures worst-case outliers (garbage collection pauses, network jitter) that median (p50) completely hides."
  },
  {
    q: "When calculating Taxicab distance across multiple delivery drivers to find the closest driver, what is the best query structure?",
    ans: "SELECT driver_id, ABS(lat - target_lat) + ABS(lon - target_lon) AS distance FROM Drivers WHERE status = 'AVAILABLE' ORDER BY distance ASC LIMIT 1;",
    distractors: [
      "SELECT MIN(driver_id) FROM Drivers GROUP BY status HAVING status = 'AVAILABLE';",
      "SELECT driver_id FROM Drivers WHERE distance = (SELECT MIN(lat + lon) FROM Drivers);",
      "SELECT driver_id, MAX(lat) - MIN(lat) FROM Drivers;"
    ],
    explanation: "Computing the scalar distance expression for each candidate driver and sorting with 'ORDER BY distance ASC LIMIT 1' immediately yields the closest driver."
  },
  {
    q: "What is the result of 'SELECT ROUND(5.555, 2);' in MySQL?",
    ans: "5.56",
    distractors: [
      "5.55",
      "5.60",
      "5.5"
    ],
    explanation: "The third decimal digit is 5, so half-up rounding increases the second digit from 5 to 6, returning 5.56."
  },
  {
    q: "What does 'SELECT TRUNCATE(5.559, 2);' return in MySQL?",
    ans: "5.55",
    distractors: [
      "5.56",
      "5.60",
      "5.00"
    ],
    explanation: "TRUNCATE discards all digits after position 2 without rounding, returning 5.55."
  },
  {
    q: "In MySQL, can a window function like ROW_NUMBER() be used directly inside a WHERE clause without a subquery or CTE?",
    ans: "No, window functions are evaluated in the SELECT phase, which executes AFTER the WHERE clause; a CTE or derived table is required",
    distractors: [
      "Yes, as long as it has an OVER (ORDER BY) clause",
      "Yes, if placed inside parenthesis",
      "Yes, in MySQL 8.0 but not in MySQL 5.7"
    ],
    explanation: "SQL execution order is FROM -> WHERE -> GROUP BY -> HAVING -> WINDOW/SELECT -> ORDER BY -> LIMIT. Because WHERE runs before window functions exist, filtering on ROW_NUMBER() requires wrapping it in a CTE or subquery."
  },
  {
    q: "What is the return value of 'SELECT ABS(10 - 25);'?",
    ans: "15",
    distractors: [
      "-15",
      "35",
      "NULL"
    ],
    explanation: "10 - 25 = -15. The absolute value ABS(-15) is 15."
  },
  {
    q: "What happens if you run 'SELECT POW(2, -1);' in MySQL?",
    ans: "0.5 (since 2^(-1) = 1/2 = 0.5)",
    distractors: [
      "-2",
      "-0.5",
      "NULL"
    ],
    explanation: "A negative exponent represents the reciprocal: x^(-y) = 1 / (x^y). Thus 2^(-1) = 1/2 = 0.5."
  },
  {
    q: "Which SQL clause determines the final number of rows returned after all sorting and filtering is finished?",
    ans: "LIMIT (or FETCH FIRST n ROWS ONLY in ANSI SQL)",
    distractors: [
      "WHERE",
      "HAVING",
      "GROUP BY"
    ],
    explanation: "LIMIT (or FETCH FIRST) is the very last step in physical execution, restricting the final transmitted rows to the client."
  }
];

const tags = ['🍡 Quick Snack', '⚡ Gotcha Trap', '🐱 Brain Bender', '🎯 Core Concept', '🏆 Senior Staff'];

const formattedMcqs = mathQuestions.map((item, idx) => {
  const targetCorrectIndex = idx % 4; // Cycles cleanly across 0, 1, 2, 3 (A, B, C, D) for perfect 25% balance!
  const options = [];
  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === targetCorrectIndex) {
      options.push(item.ans);
    } else {
      options.push(item.distractors[dIdx++]);
    }
  }

  return {
    id: `mcq_math_${idx + 1}`,
    keyword: 'MATH & MEDIANS',
    tag: tags[idx % tags.length],
    question: `[MATH & MEDIANS #${idx + 1}] ${item.q}`,
    options: options,
    correctIndex: targetCorrectIndex,
    explanation: item.explanation
  };
});

console.log(`Generated ${formattedMcqs.length} new MATH & MEDIANS MCQs.`);

// =============================================================================
// 2. GENERATE 50 ENTERPRISE CASE STUDIES FOR SECTION 7
// =============================================================================

const industries = [
  "Ride-Hailing & Logistics",
  "Cloud & Infrastructure",
  "Fintech",
  "E-Commerce & Retail",
  "IoT & Weather Telemetry",
  "Maritime & Supply Chain",
  "Healthcare Analytics",
  "Streaming Media",
  "Cybersecurity",
  "Real Estate Tech"
];

const difficulties = ["Easy", "Medium", "Hard"];

const caseTemplates = [
  // 1-5 Ride Hailing & Logistics
  {
    title: "Uber Dispatch: Driver-to-Rider Manhattan Taxicab Distance",
    industry: "Ride-Hailing & Logistics",
    difficulty: "Medium",
    scenario: "Computing Manhattan distance |lat1 - lat2| + |lon1 - lon2| to find the closest available driver in a dense urban street grid.",
    schemaSnippet: "`DriverFleet (driver_id INT PRIMARY KEY, driver_name VARCHAR(64), lat DECIMAL(9,6), lon DECIMAL(9,6), status VARCHAR(20))`",
    businessObjective: "Filter available drivers and calculate orthogonal grid distance to the passenger pickup location (37.774929, -122.419416), returning the nearest driver.",
    targetQuery: `SELECT driver_id, driver_name,
       ROUND(ABS(lat - 37.774929) + ABS(lon - (-122.419416)), 4) AS manhattan_dist
FROM DriverFleet
WHERE status = 'AVAILABLE'
ORDER BY manhattan_dist ASC
LIMIT 1;`,
    table: "DriverFleet"
  },
  {
    title: "DoorDash Courier Dispatch: Euclidean Drone Delivery Radius",
    industry: "Ride-Hailing & Logistics",
    difficulty: "Hard",
    scenario: "Calculating straight-line Euclidean distance sqrt((x1-x2)^2 + (y1-y2)^2) for autonomous aerial drone delivery routing.",
    schemaSnippet: "`DronePads (drone_id INT PRIMARY KEY, base_station VARCHAR(32), lat DECIMAL(9,6), lon DECIMAL(9,6), battery_pct INT)`",
    businessObjective: "Identify the closest operational drone with >= 50% battery to drop coordinates (40.712776, -74.005974) using Pythagorean distance.",
    targetQuery: `SELECT drone_id, base_station,
       ROUND(SQRT(POW(lat - 40.712776, 2) + POW(lon - (-74.005974), 2)), 4) AS euclidean_dist
FROM DronePads
WHERE battery_pct >= 50
ORDER BY euclidean_dist ASC
LIMIT 1;`,
    table: "DronePads"
  },
  {
    title: "Lyft Surge Pricing: Bounded Geographic Fare Multiplier Grid",
    industry: "Ride-Hailing & Logistics",
    difficulty: "Easy",
    scenario: "Summing and averaging trip fares within a strictly bounded latitude and longitude airport geofence.",
    schemaSnippet: "`AirportRides (ride_id BIGINT PRIMARY KEY, fare_usd DECIMAL(10,2), pickup_lat DECIMAL(9,6), pickup_lon DECIMAL(9,6))`",
    businessObjective: "Aggregate total ride volume and mean fare strictly inside airport boundaries (lat between 33.9400 and 33.9500, lon between -118.4100 and -118.4000).",
    targetQuery: `SELECT COUNT(*) AS total_rides,
       ROUND(SUM(fare_usd), 2) AS total_revenue,
       ROUND(AVG(fare_usd), 2) AS mean_fare
FROM AirportRides
WHERE pickup_lat > 33.9400 AND pickup_lat < 33.9500
  AND pickup_lon > -118.4100 AND pickup_lon < -118.4000;`,
    table: "AirportRides"
  },
  {
    title: "Instacart Delivery: Peak Distance Warehouse Cross-Lookup",
    industry: "Ride-Hailing & Logistics",
    difficulty: "Medium",
    scenario: "Retrieving the warehouse address corresponding to the maximum delivery radius using single-pass index ordering.",
    schemaSnippet: "`FulfillmentHubs (hub_id INT PRIMARY KEY, hub_name VARCHAR(64), max_service_radius_miles DECIMAL(6,2), city VARCHAR(32))`",
    businessObjective: "Find the hub name and city that maintains the largest service radius under 50.00 miles.",
    targetQuery: `SELECT hub_name, city, max_service_radius_miles
FROM FulfillmentHubs
WHERE max_service_radius_miles < 50.00
ORDER BY max_service_radius_miles DESC
LIMIT 1;`,
    table: "FulfillmentHubs"
  },
  {
    title: "FedEx Freight Hub: Northernmost Sorting Terminal Longitude Lookup",
    industry: "Ride-Hailing & Logistics",
    difficulty: "Easy",
    scenario: "Cross-attribute lookup finding the western longitude of the most northern sorting facility under a given latitude boundary.",
    schemaSnippet: "`FreightTerminals (terminal_id INT PRIMARY KEY, facility_code VARCHAR(16), lat DECIMAL(9,4), lon DECIMAL(9,4))`",
    businessObjective: "Query longitude rounded to 4 decimals for the terminal with the greatest latitude below 45.0000.",
    targetQuery: `SELECT ROUND(lon, 4) AS terminal_lon
FROM FreightTerminals
WHERE lat < 45.0000
ORDER BY lat DESC
LIMIT 1;`,
    table: "FreightTerminals"
  },

  // 6-10 Cloud & Infrastructure
  {
    title: "Cloudflare Edge: Median (P50) API Round-Trip Latency",
    industry: "Cloud & Infrastructure",
    difficulty: "Hard",
    scenario: "Calculating the exact 50th percentile (median) response time across millions of global edge requests without built-in MEDIAN().",
    schemaSnippet: "`EdgeRequests (request_id BIGINT PRIMARY KEY, edge_colo VARCHAR(16), duration_ms DECIMAL(10,3), status_code INT)`",
    businessObjective: "Calculate true median duration_ms using CTE window ranking, handling both odd and even sample sizes cleanly.",
    targetQuery: `WITH RankedRequests AS (
    SELECT duration_ms,
           ROW_NUMBER() OVER (ORDER BY duration_ms ASC) AS r_idx,
           COUNT(*) OVER () AS total_n
    FROM EdgeRequests
    WHERE status_code = 200
)
SELECT ROUND(AVG(duration_ms), 3) AS p50_median_latency
FROM RankedRequests
WHERE r_idx IN (FLOOR((total_n + 1) / 2.0), CEIL((total_n + 1) / 2.0));`,
    table: "EdgeRequests"
  },
  {
    title: "Datadog Host Monitor: Highest CPU Utilization Node Cross-Lookup",
    industry: "Cloud & Infrastructure",
    difficulty: "Medium",
    scenario: "Identifying the IP address and node ID that reached maximum CPU load below emergency throttle threshold (95.0%).",
    schemaSnippet: "`NodeTelemetry (node_id VARCHAR(32) PRIMARY KEY, ip_address VARCHAR(45), cpu_utilization_pct DECIMAL(5,2), cluster_name VARCHAR(32))`",
    businessObjective: "Select ip_address and cpu_utilization_pct for the top utilized node strictly under 95.00% without subquery overhead.",
    targetQuery: `SELECT ip_address, cpu_utilization_pct
FROM NodeTelemetry
WHERE cpu_utilization_pct < 95.00
ORDER BY cpu_utilization_pct DESC
LIMIT 1;`,
    table: "NodeTelemetry"
  },
  {
    title: "AWS EC2 Spot Fleet: Minimum Bidding Floor Server Lookup",
    industry: "Cloud & Infrastructure",
    difficulty: "Easy",
    scenario: "Finding the instance type with the lowest spot price exceeding the minimum floor price ($0.05/hr).",
    schemaSnippet: "`SpotPrices (instance_type VARCHAR(32) PRIMARY KEY, hourly_cost_usd DECIMAL(8,4), region VARCHAR(24))`",
    businessObjective: "Retrieve the instance type with the minimum hourly_cost_usd above 0.0500.",
    targetQuery: `SELECT instance_type, ROUND(hourly_cost_usd, 4) AS lowest_price
FROM SpotPrices
WHERE hourly_cost_usd > 0.0500
ORDER BY hourly_cost_usd ASC
LIMIT 1;`,
    table: "SpotPrices"
  },
  {
    title: "Kubernetes Pod Memory: Spread Range (Peak - Floor)",
    industry: "Cloud & Infrastructure",
    difficulty: "Easy",
    scenario: "Computing memory volatility spread MAX(mem) - MIN(mem) across microservice replica pods.",
    schemaSnippet: "`PodMetrics (pod_id VARCHAR(64) PRIMARY KEY, service_name VARCHAR(32), memory_mb DECIMAL(10,2))`",
    businessObjective: "Measure peak-to-trough memory spread and average allocation across all running pods in the billing service.",
    targetQuery: `SELECT service_name,
       ROUND(MAX(memory_mb) - MIN(memory_mb), 2) AS memory_spread,
       ROUND(AVG(memory_mb), 2) AS avg_memory
FROM PodMetrics
WHERE service_name = 'billing-service'
GROUP BY service_name;`,
    table: "PodMetrics"
  },
  {
    title: "Snowflake Storage Engine: Micro-Partition Centroid Bounding Box",
    industry: "Cloud & Infrastructure",
    difficulty: "Hard",
    scenario: "Calculating Manhattan bounding box dimension of partition key min/max ranges for query pruning efficiency.",
    schemaSnippet: "`PartitionMetadata (partition_id BIGINT PRIMARY KEY, min_key INT, max_key INT, min_timestamp INT, max_timestamp INT)`",
    businessObjective: "Compute Manhattan bounding range (max_key - min_key) + (max_timestamp - min_timestamp) to flag bloated partitions.",
    targetQuery: `SELECT partition_id,
       (max_key - min_key) + (max_timestamp - min_timestamp) AS bounding_spread
FROM PartitionMetadata
ORDER BY bounding_spread DESC
LIMIT 10;`,
    table: "PartitionMetadata"
  },

  // 11-15 Fintech
  {
    title: "Stripe Currency Settlement: Banker's Precision Rounding & Truncation",
    industry: "Fintech",
    difficulty: "Medium",
    scenario: "Auditing currency conversion rounding discrepancies between ROUND() and TRUNCATE() on cross-border fees.",
    schemaSnippet: "`CurrencyConversions (tx_id VARCHAR(64) PRIMARY KEY, raw_fee_usd DECIMAL(12,6), currency VARCHAR(3))`",
    businessObjective: "Compare rounded fee vs truncated fee to quantify residual fractional cent slippage.",
    targetQuery: `SELECT tx_id,
       ROUND(raw_fee_usd, 2) AS rounded_fee,
       TRUNCATE(raw_fee_usd, 2) AS truncated_fee,
       ROUND(raw_fee_usd, 2) - TRUNCATE(raw_fee_usd, 2) AS fractional_slippage
FROM CurrencyConversions
WHERE raw_fee_usd > 100.00
ORDER BY fractional_slippage DESC;`,
    table: "CurrencyConversions"
  },
  {
    title: "Robinhood HFT Order Flow: Median Trade Execution Time",
    industry: "Fintech",
    difficulty: "Hard",
    scenario: "Computing p50 median execution microsecond latency for SEC Rule 606 regulatory transparency reporting.",
    schemaSnippet: "`OrderFills (fill_id BIGINT PRIMARY KEY, symbol VARCHAR(10), latency_micros INT, filled_at TIMESTAMP)`",
    businessObjective: "Calculate exact median latency for AAPL orders using window function ranking.",
    targetQuery: `WITH RankedOrders AS (
    SELECT latency_micros,
           ROW_NUMBER() OVER (ORDER BY latency_micros ASC) AS rnk,
           COUNT(*) OVER () AS total_fills
    FROM OrderFills
    WHERE symbol = 'AAPL'
)
SELECT ROUND(AVG(latency_micros), 2) AS median_latency_micros
FROM RankedOrders
WHERE rnk IN (FLOOR((total_fills + 1) / 2.0), CEIL((total_fills + 1) / 2.0));`,
    table: "OrderFills"
  },
  {
    title: "Coinbase Crypto Arbitrage: Max Spread Pair Cross-Lookup",
    industry: "Fintech",
    difficulty: "Medium",
    scenario: "Finding the order book exchange identifier that offered the tightest bid-ask spread above zero.",
    schemaSnippet: "`OrderBooks (book_id INT PRIMARY KEY, exchange_code VARCHAR(16), bid_usd DECIMAL(10,4), ask_usd DECIMAL(10,4))`",
    businessObjective: "Retrieve the exchange code with the smallest positive bid-ask spread (ask - bid) above 0.0010.",
    targetQuery: `SELECT exchange_code,
       ROUND(ask_usd - bid_usd, 4) AS spread
FROM OrderBooks
WHERE (ask_usd - bid_usd) > 0.0010
ORDER BY spread ASC
LIMIT 1;`,
    table: "OrderBooks"
  },
  {
    title: "Square Cash Card: Negative Balance Floor & Absolute Deficit",
    industry: "Fintech",
    difficulty: "Easy",
    scenario: "Calculating total negative balance exposure and maximum deficit magnitude using ABS().",
    schemaSnippet: "`UserAccounts (account_id VARCHAR(32) PRIMARY KEY, balance_usd DECIMAL(12,2))`",
    businessObjective: "Find the user account with the single largest negative balance magnitude.",
    targetQuery: `SELECT account_id,
       balance_usd,
       ABS(balance_usd) AS deficit_amount
FROM UserAccounts
WHERE balance_usd < 0.00
ORDER BY deficit_amount DESC
LIMIT 1;`,
    table: "UserAccounts"
  },
  {
    title: "Goldman Sachs FX Desk: Volatility Magnitude & Distance",
    industry: "Fintech",
    difficulty: "Hard",
    scenario: "Measuring Cartesian volatility vector distance between EUR/USD and GBP/USD price shifts.",
    schemaSnippet: "`FxTickData (tick_id BIGINT PRIMARY KEY, eur_shift DECIMAL(8,5), gbp_shift DECIMAL(8,5), tick_time TIMESTAMP)`",
    businessObjective: "Compute Euclidean norm of combined FX shifts sqrt(eur_shift^2 + gbp_shift^2) to flag flash crashes.",
    targetQuery: `SELECT tick_id,
       ROUND(SQRT(POW(eur_shift, 2) + POW(gbp_shift, 2)), 5) AS volatility_vector
FROM FxTickData
ORDER BY volatility_vector DESC
LIMIT 5;`,
    table: "FxTickData"
  },

  // 16-20 E-Commerce
  {
    title: "Amazon Prime Now: Median Order Basket Value",
    industry: "E-Commerce & Retail",
    difficulty: "Hard",
    scenario: "Calculating median customer order amount to evaluate standard cart size without high-value bulk corporate distortion.",
    schemaSnippet: "`CustomerOrders (order_id BIGINT PRIMARY KEY, customer_id INT, cart_total_usd DECIMAL(10,2))`",
    businessObjective: "Compute exact 50th percentile cart_total_usd across all retail customers.",
    targetQuery: `WITH RankedCarts AS (
    SELECT cart_total_usd,
           ROW_NUMBER() OVER (ORDER BY cart_total_usd ASC) AS pos,
           COUNT(*) OVER () AS n_orders
    FROM CustomerOrders
)
SELECT ROUND(AVG(cart_total_usd), 2) AS median_order_value
FROM RankedCarts
WHERE pos IN (FLOOR((n_orders + 1) / 2.0), CEIL((n_orders + 1) / 2.0));`,
    table: "CustomerOrders"
  },
  {
    title: "Shopify Merchant Radius: Geocoded Customer Cluster Distance",
    industry: "E-Commerce & Retail",
    difficulty: "Medium",
    scenario: "Calculating Manhattan distance from regional storefront to remote buyer coordinates for local delivery eligibility.",
    schemaSnippet: "`BuyerProfiles (buyer_id INT PRIMARY KEY, lat DECIMAL(9,6), lon DECIMAL(9,6), active_orders INT)`",
    businessObjective: "Filter buyers with active orders and query the buyer furthest from central retail hub (41.878113, -87.629799).",
    targetQuery: `SELECT buyer_id,
       ROUND(ABS(lat - 41.878113) + ABS(lon - (-87.629799)), 4) AS dist_from_hub
FROM BuyerProfiles
WHERE active_orders > 0
ORDER BY dist_from_hub DESC
LIMIT 1;`,
    table: "BuyerProfiles"
  },
  {
    title: "Target Inventory: Highest Markup Item Cross-Lookup",
    industry: "E-Commerce & Retail",
    difficulty: "Easy",
    scenario: "Finding the product SKU corresponding to maximum retail price under $200.00.",
    schemaSnippet: "`ProductCatalog (sku VARCHAR(32) PRIMARY KEY, product_name VARCHAR(100), price_usd DECIMAL(10,2))`",
    businessObjective: "Select product_name and price_usd for the most expensive item strictly under 200.00.",
    targetQuery: `SELECT product_name, price_usd
FROM ProductCatalog
WHERE price_usd < 200.00
ORDER BY price_usd DESC
LIMIT 1;`,
    table: "ProductCatalog"
  },
  {
    title: "Walmart Logistics: Distribution Center Centroid Calculation",
    industry: "E-Commerce & Retail",
    difficulty: "Medium",
    scenario: "Calculating the arithmetic mean center coordinates of all supply depots in a state.",
    schemaSnippet: "`Depots (depot_id INT PRIMARY KEY, state VARCHAR(2), lat DECIMAL(9,4), lon DECIMAL(9,4))`",
    businessObjective: "Compute geographic center point (mean lat, mean lon) rounded to 4 decimals for state 'TX'.",
    targetQuery: `SELECT state,
       ROUND(AVG(lat), 4) AS centroid_lat,
       ROUND(AVG(lon), 4) AS centroid_lon
FROM Depots
WHERE state = 'TX'
GROUP BY state;`,
    table: "Depots"
  },
  {
    title: "Etsy Shipping Calculator: Weight Truncation & Overweight Surcharge",
    industry: "E-Commerce & Retail",
    difficulty: "Easy",
    scenario: "Truncating package weights to integer pounds for billing brackets and calculating residual ounces.",
    schemaSnippet: "`Parcels (parcel_id BIGINT PRIMARY KEY, weight_lbs DECIMAL(6,2))`",
    businessObjective: "Return parcel ID, integer weight via FLOOR(), and residual fractional weight.",
    targetQuery: `SELECT parcel_id,
       weight_lbs,
       FLOOR(weight_lbs) AS billable_lbs,
       ROUND(weight_lbs - FLOOR(weight_lbs), 2) AS excess_lbs
FROM Parcels
WHERE weight_lbs > 5.00
ORDER BY excess_lbs DESC;`,
    table: "Parcels"
  },

  // 21-25 IoT & Weather
  {
    title: "National Weather Service: Maximum Diurnal Temperature Swing",
    industry: "IoT & Weather Telemetry",
    difficulty: "Easy",
    scenario: "Calculating daily temperature spread MAX(temp) - MIN(temp) across high-altitude sensors.",
    schemaSnippet: "`WeatherSensors (sensor_id INT PRIMARY KEY, station_code VARCHAR(16), temp_celsius DECIMAL(5,2))`",
    businessObjective: "Query station code and total temperature spread across 24 hours.",
    targetQuery: `SELECT station_code,
       ROUND(MAX(temp_celsius) - MIN(temp_celsius), 2) AS temp_swing
FROM WeatherSensors
GROUP BY station_code
ORDER BY temp_swing DESC
LIMIT 5;`,
    table: "WeatherSensors"
  },
  {
    title: "NOAA Buoy Network: Deepest Ocean Sensor Longitude Lookup",
    industry: "IoT & Weather Telemetry",
    difficulty: "Medium",
    scenario: "Finding the longitude of the buoy deployed at the deepest ocean trench depth below 5000 meters.",
    schemaSnippet: "`OceanBuoys (buoy_id INT PRIMARY KEY, ocean_name VARCHAR(32), depth_m DECIMAL(8,2), lat DECIMAL(9,4), lon DECIMAL(9,4))`",
    businessObjective: "Retrieve buoy_id and lon rounded to 4 decimals for the deepest ocean buoy under 11000m.",
    targetQuery: `SELECT buoy_id, ROUND(lon, 4) AS ocean_lon, depth_m
FROM OceanBuoys
WHERE depth_m < 11000.00
ORDER BY depth_m DESC
LIMIT 1;`,
    table: "OceanBuoys"
  },
  {
    title: "Smart Grid Power Meter: Median Megawatt Consumption",
    industry: "IoT & Weather Telemetry",
    difficulty: "Hard",
    scenario: "Determining the median household power usage to detect baseline grid demand without peak air conditioning spikes.",
    schemaSnippet: "`GridTelemetry (meter_id BIGINT PRIMARY KEY, kw_consumption DECIMAL(8,3), timestamp TIMESTAMP)`",
    businessObjective: "Compute median kw_consumption across the municipal substation feeder.",
    targetQuery: `WITH RankedMeters AS (
    SELECT kw_consumption,
           ROW_NUMBER() OVER (ORDER BY kw_consumption ASC) AS row_n,
           COUNT(*) OVER () AS total_meters
    FROM GridTelemetry
)
SELECT ROUND(AVG(kw_consumption), 3) AS median_kw_load
FROM RankedMeters
WHERE row_n IN (FLOOR((total_meters + 1) / 2.0), CEIL((total_meters + 1) / 2.0));`,
    table: "GridTelemetry"
  },
  {
    title: "Tesla Supercharger: Closest Station Euclidean Vector",
    industry: "IoT & Weather Telemetry",
    difficulty: "Medium",
    scenario: "Finding the closest charging kiosk with available stalls using straight-line Euclidean distance.",
    schemaSnippet: "`SuperchargerStations (station_id INT PRIMARY KEY, lat DECIMAL(9,6), lon DECIMAL(9,6), open_stalls INT)`",
    businessObjective: "Select station_id and distance to vehicle coordinates (34.052235, -118.243683) where open_stalls > 0.",
    targetQuery: `SELECT station_id,
       ROUND(SQRT(POW(lat - 34.052235, 2) + POW(lon - (-118.243683), 2)), 4) AS dist
FROM SuperchargerStations
WHERE open_stalls > 0
ORDER BY dist ASC
LIMIT 1;`,
    table: "SuperchargerStations"
  },
  {
    title: "Wildfire Perimeter Tracker: Northernmost Flame Front Coordinate",
    industry: "IoT & Weather Telemetry",
    difficulty: "Easy",
    scenario: "Locating the exact longitude of the active fire front's maximum northern latitude excursion.",
    schemaSnippet: "`ThermalSensors (sensor_id INT PRIMARY KEY, fire_id VARCHAR(32), lat DECIMAL(9,4), lon DECIMAL(9,4), temp_k INT)`",
    businessObjective: "Find western longitude of the thermal sensor recording temp > 500K with the greatest latitude.",
    targetQuery: `SELECT ROUND(lon, 4) AS front_lon
FROM ThermalSensors
WHERE temp_k > 500
ORDER BY lat DESC
LIMIT 1;`,
    table: "ThermalSensors"
  },

  // 26-30 Maritime & Supply Chain
  {
    title: "Maersk Container Fleet: Great-Circle Nautical Waypoint Bounds",
    industry: "Maritime & Supply Chain",
    difficulty: "Easy",
    scenario: "Filtering container ships within strict Panama Canal approach coordinate gates.",
    schemaSnippet: "`VesselAisPositions (mmsi INT PRIMARY KEY, vessel_name VARCHAR(64), lat DECIMAL(8,4), lon DECIMAL(8,4))`",
    businessObjective: "Count vessels and calculate mean latitude strictly inside canal transit coordinates (lat between 8.5000 and 9.5000).",
    targetQuery: `SELECT COUNT(*) AS vessel_count,
       ROUND(AVG(lat), 4) AS mean_latitude
FROM VesselAisPositions
WHERE lat > 8.5000 AND lat < 9.5000;`,
    table: "VesselAisPositions"
  },
  {
    title: "Port of Rotterdam: Median Container Dwell Time",
    industry: "Maritime & Supply Chain",
    difficulty: "Hard",
    scenario: "Calculating median days containers remain in terminal staging yards to detect supply chain congestion.",
    schemaSnippet: "`TerminalContainers (container_id VARCHAR(16) PRIMARY KEY, dwell_hours INT, shipping_line VARCHAR(32))`",
    businessObjective: "Calculate median dwell_hours across MSC container inventory.",
    targetQuery: `WITH RankedDwell AS (
    SELECT dwell_hours,
           ROW_NUMBER() OVER (ORDER BY dwell_hours ASC) AS r,
           COUNT(*) OVER () AS total_c
    FROM TerminalContainers
    WHERE shipping_line = 'MSC'
)
SELECT ROUND(AVG(dwell_hours), 2) AS median_dwell_hours
FROM RankedDwell
WHERE r IN (FLOOR((total_c + 1) / 2.0), CEIL((total_c + 1) / 2.0));`,
    table: "TerminalContainers"
  },
  {
    title: "Flexport Air Freight: Fuel Burn Volatility Spread",
    industry: "Maritime & Supply Chain",
    difficulty: "Medium",
    scenario: "Calculating fuel consumption range MAX(fuel) - MIN(fuel) on transpacific cargo flights.",
    schemaSnippet: "`CargoFlights (flight_no VARCHAR(10) PRIMARY KEY, fuel_kg DECIMAL(10,2), origin VARCHAR(3))`",
    businessObjective: "Query origin airport and spread between peak and minimum fuel consumption.",
    targetQuery: `SELECT origin,
       ROUND(MAX(fuel_kg) - MIN(fuel_kg), 2) AS fuel_spread
FROM CargoFlights
GROUP BY origin
HAVING COUNT(*) >= 10
ORDER BY fuel_spread DESC;`,
    table: "CargoFlights"
  },
  {
    title: "BNSF Rail Network: Lowest Altitude Mountain Pass Track Lookup",
    industry: "Maritime & Supply Chain",
    difficulty: "Medium",
    scenario: "Finding the track waypoint with minimum elevation exceeding sea level (100 meters).",
    schemaSnippet: "`RailTrackWaypoints (waypoint_id INT PRIMARY KEY, track_code VARCHAR(16), elevation_m DECIMAL(7,2), lon DECIMAL(9,4))`",
    businessObjective: "Select track_code and lon for the lowest track waypoint strictly above 100.00 meters.",
    targetQuery: `SELECT track_code, ROUND(lon, 4) AS track_lon, elevation_m
FROM RailTrackWaypoints
WHERE elevation_m > 100.00
ORDER BY elevation_m ASC
LIMIT 1;`,
    table: "RailTrackWaypoints"
  },
  {
    title: "Cold Chain Logistics: Absolute Temperature Deviation Flag",
    industry: "Maritime & Supply Chain",
    difficulty: "Easy",
    scenario: "Using ABS() to measure deviation from strict 4.00 degree Celsius vaccine refrigeration target.",
    schemaSnippet: "`ReeferTelemetry (sensor_id BIGINT PRIMARY KEY, temp_c DECIMAL(5,2), container_id VARCHAR(16))`",
    businessObjective: "Find reefers with the greatest absolute temperature deviation from target 4.0 degrees.",
    targetQuery: `SELECT container_id,
       temp_c,
       ROUND(ABS(temp_c - 4.00), 2) AS temp_deviation
FROM ReeferTelemetry
ORDER BY temp_deviation DESC
LIMIT 5;`,
    table: "ReeferTelemetry"
  },

  // 31-35 Healthcare Analytics
  {
    title: "Mayo Clinic Emergency Room: Median Triage-to-Doctor Wait Time",
    industry: "Healthcare Analytics",
    difficulty: "Hard",
    scenario: "Computing 50th percentile patient wait minutes to comply with trauma center quality certifications.",
    schemaSnippet: "`ErEncounters (encounter_id BIGINT PRIMARY KEY, triage_acuity INT, wait_minutes INT)`",
    businessObjective: "Determine median wait_minutes for Level 3 triage patients using window functions.",
    targetQuery: `WITH RankedPatients AS (
    SELECT wait_minutes,
           ROW_NUMBER() OVER (ORDER BY wait_minutes ASC) AS seq,
           COUNT(*) OVER () AS total_patients
    FROM ErEncounters
    WHERE triage_acuity = 3
)
SELECT ROUND(AVG(wait_minutes), 1) AS median_wait_mins
FROM RankedPatients
WHERE seq IN (FLOOR((total_patients + 1) / 2.0), CEIL((total_patients + 1) / 2.0));`,
    table: "ErEncounters"
  },
  {
    title: "Pfizer Clinical Trials: Outlier Blood Pressure Diastolic Extremum",
    industry: "Healthcare Analytics",
    difficulty: "Medium",
    scenario: "Finding the patient ID corresponding to maximum diastolic pressure below hypertensive crisis threshold (120 mmHg).",
    schemaSnippet: "`TrialVitals (patient_id VARCHAR(32) PRIMARY KEY, systolic INT, diastolic INT)`",
    businessObjective: "Retrieve patient_id and diastolic value for the highest diastolic reading strictly under 120.",
    targetQuery: `SELECT patient_id, diastolic
FROM TrialVitals
WHERE diastolic < 120
ORDER BY diastolic DESC
LIMIT 1;`,
    table: "TrialVitals"
  },
  {
    title: "Epic Systems EHR: Pediatric Dosage Truncation & Safety Guard",
    industry: "Healthcare Analytics",
    difficulty: "Easy",
    scenario: "Applying FLOOR() and ROUND() to prevent pediatric liquid medication over-dosage rounding errors.",
    schemaSnippet: "`MedicationOrders (order_id BIGINT PRIMARY KEY, raw_dose_mg DECIMAL(8,4))`",
    businessObjective: "Compute truncated dose in integer milligrams and exact rounded tenths.",
    targetQuery: `SELECT order_id,
       raw_dose_mg,
       FLOOR(raw_dose_mg) AS base_mg,
       ROUND(raw_dose_mg, 1) AS rounded_tenth_mg
FROM MedicationOrders
WHERE raw_dose_mg > 0;`,
    table: "MedicationOrders"
  },
  {
    title: "Genomic Sequencing Lab: Base Pair Distance Discrepancy",
    industry: "Healthcare Analytics",
    difficulty: "Easy",
    scenario: "Calculating absolute difference between predicted and observed chromosomal variant positions.",
    schemaSnippet: "`GeneVariants (variant_id VARCHAR(32) PRIMARY KEY, predicted_pos BIGINT, observed_pos BIGINT)`",
    businessObjective: "Measure ABS(predicted_pos - observed_pos) and query largest discrepancies.",
    targetQuery: `SELECT variant_id,
       ABS(predicted_pos - observed_pos) AS distance_bp
FROM GeneVariants
ORDER BY distance_bp DESC
LIMIT 10;`,
    table: "GeneVariants"
  },
  {
    title: "Surgical Robot Telemetry: Cartesian Tip Coordinate Deviation",
    industry: "Healthcare Analytics",
    difficulty: "Hard",
    scenario: "Calculating 3D Euclidean distance sqrt(dx^2 + dy^2 + dz^2) from planned incision path.",
    schemaSnippet: "`RobotToolPositions (sample_id BIGINT PRIMARY KEY, dx DECIMAL(6,3), dy DECIMAL(6,3), dz DECIMAL(6,3))`",
    businessObjective: "Compute 3D Euclidean error magnitude rounded to 3 decimals.",
    targetQuery: `SELECT sample_id,
       ROUND(SQRT(POW(dx, 2) + POW(dy, 2) + POW(dz, 2)), 3) AS total_error_mm
FROM RobotToolPositions
ORDER BY total_error_mm DESC
LIMIT 5;`,
    table: "RobotToolPositions"
  },

  // 36-40 Streaming Media
  {
    title: "Netflix Video Delivery: Median Buffer Underrun Delay",
    industry: "Streaming Media",
    difficulty: "Hard",
    scenario: "Evaluating typical buffering duration across low-bandwidth cellular mobile subscribers.",
    schemaSnippet: "`PlaybackSessions (session_id VARCHAR(64) PRIMARY KEY, buffer_delay_ms INT, connection_type VARCHAR(16))`",
    businessObjective: "Calculate true median buffer delay for cellular clients.",
    targetQuery: `WITH RankedBuffers AS (
    SELECT buffer_delay_ms,
           ROW_NUMBER() OVER (ORDER BY buffer_delay_ms ASC) AS r,
           COUNT(*) OVER () AS total_sessions
    FROM PlaybackSessions
    WHERE connection_type = 'CELLULAR'
)
SELECT ROUND(AVG(buffer_delay_ms), 2) AS median_buffer_ms
FROM RankedBuffers
WHERE r IN (FLOOR((total_sessions + 1) / 2.0), CEIL((total_sessions + 1) / 2.0));`,
    table: "PlaybackSessions"
  },
  {
    title: "Spotify Audio Transcoding: Peak Bitrate Track Cross-Lookup",
    industry: "Streaming Media",
    difficulty: "Medium",
    scenario: "Finding the track identifier that achieved maximum compression bitrate under 320 kbps.",
    schemaSnippet: "`AudioTracks (track_id VARCHAR(32) PRIMARY KEY, track_title VARCHAR(100), bitrate_kbps DECIMAL(6,2))`",
    businessObjective: "Query track_title and bitrate for the highest fidelity track strictly below 320.00.",
    targetQuery: `SELECT track_title, bitrate_kbps
FROM AudioTracks
WHERE bitrate_kbps < 320.00
ORDER BY bitrate_kbps DESC
LIMIT 1;`,
    table: "AudioTracks"
  },
  {
    title: "YouTube CDN: Nearest Video Ingest Cache Server Distance",
    industry: "Streaming Media",
    difficulty: "Medium",
    scenario: "Computing Manhattan distance to route live streaming upload to closest edge point of presence.",
    schemaSnippet: "`IngestEdges (edge_id VARCHAR(16) PRIMARY KEY, lat DECIMAL(8,4), lon DECIMAL(8,4), load_pct INT)`",
    businessObjective: "Find the closest ingest edge with load < 80% to broadcast coordinates (51.507351, -0.127758).",
    targetQuery: `SELECT edge_id,
       ROUND(ABS(lat - 51.507351) + ABS(lon - (-0.127758)), 4) AS dist
FROM IngestEdges
WHERE load_pct < 80
ORDER BY dist ASC
LIMIT 1;`,
    table: "IngestEdges"
  },
  {
    title: "Twitch Live Chat: Message Rate Volatility Spread",
    industry: "Streaming Media",
    difficulty: "Easy",
    scenario: "Computing chat messages per second spread MAX(mps) - MIN(mps) during e-sports finals.",
    schemaSnippet: "`ChatTelemetry (channel_id VARCHAR(32) PRIMARY KEY, max_mps INT, min_mps INT)`",
    businessObjective: "Find channels with the highest chat message per second surge spread.",
    targetQuery: `SELECT channel_id,
       (max_mps - min_mps) AS mps_surge
FROM ChatTelemetry
ORDER BY mps_surge DESC
LIMIT 5;`,
    table: "ChatTelemetry"
  },
  {
    title: "Disney+ Subscriber Churn: Days to Cancelation Median",
    industry: "Streaming Media",
    difficulty: "Hard",
    scenario: "Calculating the median subscription lifespan before churn among trial signups.",
    schemaSnippet: "`CanceledUsers (user_id INT PRIMARY KEY, days_subscribed INT)`",
    businessObjective: "Find median days_subscribed to pinpoint trial cliff drop-off.",
    targetQuery: `WITH RankedLife AS (
    SELECT days_subscribed,
           ROW_NUMBER() OVER (ORDER BY days_subscribed ASC) AS idx,
           COUNT(*) OVER () AS n
    FROM CanceledUsers
)
SELECT ROUND(AVG(days_subscribed), 1) AS median_days_to_churn
FROM RankedLife
WHERE idx IN (FLOOR((n + 1) / 2.0), CEIL((n + 1) / 2.0));`,
    table: "CanceledUsers"
  },

  // 41-45 Cybersecurity
  {
    title: "CrowdStrike Falcon: Anomaly Vector Coordinate Distance",
    industry: "Cybersecurity",
    difficulty: "Hard",
    scenario: "Measuring Euclidean behavioral vector distance sqrt(cpu^2 + net^2) to detect zero-day rootkit execution.",
    schemaSnippet: "`ProcessBehaviors (pid INT PRIMARY KEY, process_name VARCHAR(64), delta_cpu DECIMAL(6,2), delta_net DECIMAL(6,2))`",
    businessObjective: "Calculate threat vector magnitude and flag top outlier processes.",
    targetQuery: `SELECT process_name,
       ROUND(SQRT(POW(delta_cpu, 2) + POW(delta_net, 2)), 3) AS threat_distance
FROM ProcessBehaviors
ORDER BY threat_distance DESC
LIMIT 5;`,
    table: "ProcessBehaviors"
  },
  {
    title: "Palo Alto Networks Firewall: Highest Packet Rate Under DDoS Ceiling",
    industry: "Cybersecurity",
    difficulty: "Medium",
    scenario: "Identifying the IP address with the maximum packet burst rate under the blackhole drop ceiling (1,000,000 pps).",
    schemaSnippet: "`FlowMetrics (flow_id BIGINT PRIMARY KEY, source_ip VARCHAR(45), packets_per_sec INT)`",
    businessObjective: "Query source_ip and packets_per_sec for the highest volume traffic flow strictly below 1,000,000 pps.",
    targetQuery: `SELECT source_ip, packets_per_sec
FROM FlowMetrics
WHERE packets_per_sec < 1000000
ORDER BY packets_per_sec DESC
LIMIT 1;`,
    table: "FlowMetrics"
  },
  {
    title: "Okta Identity Cloud: Impossible Travel Velocity Distance",
    industry: "Cybersecurity",
    difficulty: "Medium",
    scenario: "Calculating Manhattan distance between consecutive user logins to flag physical impossibility.",
    schemaSnippet: "`LoginEvents (login_id BIGINT PRIMARY KEY, user_id VARCHAR(32), prev_lat DECIMAL(8,4), prev_lon DECIMAL(8,4), curr_lat DECIMAL(8,4), curr_lon DECIMAL(8,4))`",
    businessObjective: "Compute Manhattan displacement between login events.",
    targetQuery: `SELECT user_id,
       ROUND(ABS(curr_lat - prev_lat) + ABS(curr_lon - prev_lon), 4) AS geo_delta
FROM LoginEvents
ORDER BY geo_delta DESC
LIMIT 10;`,
    table: "LoginEvents"
  },
  {
    title: "Splunk SIEM: Median SOC Incident Resolution Time",
    industry: "Cybersecurity",
    difficulty: "Hard",
    scenario: "Computing 50th percentile Mean Time to Remediate (MTTR) in minutes across Security Operations Center alerts.",
    schemaSnippet: "`SocIncidents (incident_id VARCHAR(32) PRIMARY KEY, severity VARCHAR(16), resolution_mins INT)`",
    businessObjective: "Calculate exact median resolution_mins for High severity tickets.",
    targetQuery: `WITH RankedAlerts AS (
    SELECT resolution_mins,
           ROW_NUMBER() OVER (ORDER BY resolution_mins ASC) AS rnk,
           COUNT(*) OVER () AS total_incidents
    FROM SocIncidents
    WHERE severity = 'HIGH'
)
SELECT ROUND(AVG(resolution_mins), 2) AS median_mttr_mins
FROM RankedAlerts
WHERE rnk IN (FLOOR((total_incidents + 1) / 2.0), CEIL((total_incidents + 1) / 2.0));`,
    table: "SocIncidents"
  },
  {
    title: "AWS GuardDuty: GeoIP Geofence Coordinate Bounds",
    industry: "Cybersecurity",
    difficulty: "Easy",
    scenario: "Validating that admin SSH connections originate strictly within authorized regional boundaries.",
    schemaSnippet: "`AdminLogins (session_id BIGINT PRIMARY KEY, admin_user VARCHAR(32), lat DECIMAL(8,4), lon DECIMAL(8,4))`",
    businessObjective: "Filter connections outside approved coordinate boundary box.",
    targetQuery: `SELECT admin_user, lat, lon
FROM AdminLogins
WHERE lat < 25.0000 OR lat > 49.0000
   OR lon < -125.0000 OR lon > -66.0000;`,
    table: "AdminLogins"
  },

  // 46-50 Real Estate Tech
  {
    title: "Zillow Home Valuation: Median Zip Code Sale Price",
    industry: "Real Estate Tech",
    difficulty: "Hard",
    scenario: "Calculating median sale price across home transactions to prevent multi-million mansion skewing typical neighborhood comps.",
    schemaSnippet: "`PropertySales (sale_id BIGINT PRIMARY KEY, zip_code VARCHAR(5), sale_price_usd DECIMAL(12,2))`",
    businessObjective: "Compute exact 50th percentile sale_price_usd for zip_code '94107'.",
    targetQuery: `WITH RankedHomes AS (
    SELECT sale_price_usd,
           ROW_NUMBER() OVER (ORDER BY sale_price_usd ASC) AS pos,
           COUNT(*) OVER () AS total_sales
    FROM PropertySales
    WHERE zip_code = '94107'
)
SELECT ROUND(AVG(sale_price_usd), 2) AS median_home_price
FROM RankedHomes
WHERE pos IN (FLOOR((total_sales + 1) / 2.0), CEIL((total_sales + 1) / 2.0));`,
    table: "PropertySales"
  },
  {
    title: "Redfin Agent Match: Closest Broker Manhattan Distance",
    industry: "Real Estate Tech",
    difficulty: "Medium",
    scenario: "Finding the nearest licensed broker to a prospective home listing coordinate in Manhattan.",
    schemaSnippet: "`RealtyAgents (agent_id INT PRIMARY KEY, agent_name VARCHAR(64), lat DECIMAL(9,6), lon DECIMAL(9,6), active_listings INT)`",
    businessObjective: "Query agent_id and Manhattan distance to property location (40.758896, -73.985130).",
    targetQuery: `SELECT agent_id, agent_name,
       ROUND(ABS(lat - 40.758896) + ABS(lon - (-73.985130)), 4) AS dist
FROM RealtyAgents
WHERE active_listings < 10
ORDER BY dist ASC
LIMIT 1;`,
    table: "RealtyAgents"
  },
  {
    title: "Opendoor Pricing Algorithm: Outlier Lot Size Extremum Cross-Lookup",
    industry: "Real Estate Tech",
    difficulty: "Easy",
    scenario: "Finding the property address for the largest parcel size strictly under 5.00 acres.",
    schemaSnippet: "`LandParcels (parcel_id VARCHAR(32) PRIMARY KEY, address VARCHAR(100), lot_size_acres DECIMAL(6,2))`",
    businessObjective: "Query address and lot size for the top parcel below 5.00 acres.",
    targetQuery: `SELECT address, lot_size_acres
FROM LandParcels
WHERE lot_size_acres < 5.00
ORDER BY lot_size_acres DESC
LIMIT 1;`,
    table: "LandParcels"
  },
  {
    title: "Commercial PropTech: HVAC Square Footage Rounding & Truncation",
    industry: "Real Estate Tech",
    difficulty: "Easy",
    scenario: "Calculating billable office lease square footage rounded to hundreds and thousands.",
    schemaSnippet: "`OfficeSuites (suite_id INT PRIMARY KEY, building_code VARCHAR(16), rentable_sqft DECIMAL(10,2))`",
    businessObjective: "Compute raw square footage, nearest hundred via ROUND(sqft, -2), and floor.",
    targetQuery: `SELECT suite_id,
       rentable_sqft,
       ROUND(rentable_sqft, -2) AS rounded_hundreds,
       FLOOR(rentable_sqft) AS floor_sqft
FROM OfficeSuites
WHERE rentable_sqft > 1000.00;`,
    table: "OfficeSuites"
  },
  {
    title: "Airbnb Host Analytics: Superhost Search Radius Euclidean Filter",
    industry: "Real Estate Tech",
    difficulty: "Hard",
    scenario: "Calculating straight-line distance from city center landmarks to superhost listings.",
    schemaSnippet: "`Listings (listing_id BIGINT PRIMARY KEY, is_superhost BOOLEAN, lat DECIMAL(9,6), lon DECIMAL(9,6), nightly_rate DECIMAL(8,2))`",
    businessObjective: "Find superhost listings within 0.05 coordinate degrees of downtown (36.162664, -86.781602) sorted by price.",
    targetQuery: `SELECT listing_id, nightly_rate,
       ROUND(SQRT(POW(lat - 36.162664, 2) + POW(lon - (-86.781602), 2)), 4) AS dist_to_downtown
FROM Listings
WHERE is_superhost = TRUE
  AND SQRT(POW(lat - 36.162664, 2) + POW(lon - (-86.781602), 2)) < 0.0500
ORDER BY nightly_rate ASC
LIMIT 10;`,
    table: "Listings"
  }
];

const formattedCases = caseTemplates.map((t, i) => {
  return {
    id: 601 + i,
    section: "Section 7: Spatial Coordinates, Math Functions & Medians",
    title: t.title,
    industry: t.industry,
    difficulty: t.difficulty,
    scenario: t.scenario,
    schemaSnippet: t.schemaSnippet,
    businessObjective: t.businessObjective,
    targetQuery: t.targetQuery,
    table: t.table
  };
});

console.log(`Generated ${formattedCases.length} new Section 7 Case Studies.`);

// =============================================================================
// 3. MERGE INTO mcqs_vault_500.js
// =============================================================================

const mcqFilePath = 'visualizer/mcqs_vault_500.js';
let mcqFileContent = fs.readFileSync(mcqFilePath, 'utf8');

// Parse existing MCQs
const existingMcqs = eval(mcqFileContent.replace(/window\.MCQS_VAULT_500\s*=/, 'let v =').replace(/if\s*\(typeof module[\s\S]*$/, '; v;'));
console.log(`Existing MCQs: ${existingMcqs.length}`);

// Remove any prior math questions if rerun
const cleanMcqs = existingMcqs.filter(m => m.keyword !== 'MATH & MEDIANS');
const mergedMcqs = [...cleanMcqs, ...formattedMcqs];
console.log(`New total MCQs: ${mergedMcqs.length}`);

const newMcqFileContent = `// =============================================================================
// THE 550 MASTER MCQ VAULT: INSTITUTIONAL-GRADE TECHNICAL QUESTIONS
// Foundational SQL, Aggregations, Spatial Coordinates & Statistical Medians
// =============================================================================

window.MCQS_VAULT_500 = ${JSON.stringify(mergedMcqs, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MCQS_VAULT_500: window.MCQS_VAULT_500 };
}
`;

fs.writeFileSync(mcqFilePath, newMcqFileContent, 'utf8');
console.log(`Successfully written to ${mcqFilePath}`);

// =============================================================================
// 4. MERGE INTO case_studies_500.js
// =============================================================================

const caseFilePath = 'visualizer/case_studies_500.js';
let caseFileContent = fs.readFileSync(caseFilePath, 'utf8');

const existingCases = eval(caseFileContent.replace(/window\.ALL_500_CASE_STUDIES\s*=/, 'let v =').replace(/if\s*\(typeof window[\s\S]*$/, '; v;'));
console.log(`Existing Cases: ${existingCases.length}`);

const cleanCases = existingCases.filter(c => c.section !== "Section 7: Spatial Coordinates, Math Functions & Medians");
const mergedCases = [...cleanCases, ...formattedCases];
console.log(`New total Cases: ${mergedCases.length}`);

const newCaseFileContent = `// =============================================================================
// THE 650 ENTERPRISE PRODUCTION CASE STUDIES MASTER VAULT
// 7 Sections x Up to 100 Cases Each across 10 Global Industries
// =============================================================================

window.ALL_500_CASE_STUDIES = ${JSON.stringify(mergedCases, null, 2)};

if (typeof window !== 'undefined') {
  window.ALL_600_CASE_STUDIES = window.ALL_500_CASE_STUDIES;
  window.ALL_650_CASE_STUDIES = window.ALL_500_CASE_STUDIES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALL_500_CASE_STUDIES: window.ALL_500_CASE_STUDIES, ALL_600_CASE_STUDIES: window.ALL_500_CASE_STUDIES, ALL_650_CASE_STUDIES: window.ALL_500_CASE_STUDIES };
}
`;

fs.writeFileSync(caseFilePath, newCaseFileContent, 'utf8');
console.log(`Successfully written to ${caseFilePath}`);
