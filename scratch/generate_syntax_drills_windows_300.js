// Generator for Section 0: The SQL Syntax Gym — 300 Analytical Window Function Micro-Drills
// Topics 13, 14, & 15 (Drills #1201 to #1500) across 10 everyday relatable schemas.

const fs = require('fs');

const tables = ['Students', 'Books', 'Employees', 'GroceryItems', 'Orders', 'MusicTracks', 'GymMembers', 'MovieReviews', 'FlightSchedule', 'PetClinic'];

function makeSlots(query) {
  return query.split(/\s+/).filter(Boolean).map(tok => {
    let type = "column";
    const clean = tok.toUpperCase().replace(/[(),;]/g, '');
    if ([
      "SELECT", "FROM", "WHERE", "GROUP", "BY", "HAVING", "ORDER", "ASC", "DESC", "LIMIT",
      "AS", "AND", "OR", "NOT", "IS", "NULL", "COUNT", "SUM", "AVG", "MIN", "MAX",
      "OVER", "PARTITION", "ROW_NUMBER", "RANK", "DENSE_RANK", "NTILE", "CUME_DIST", "PERCENT_RANK",
      "LAG", "LEAD", "ROWS", "RANGE", "BETWEEN", "PRECEDING", "FOLLOWING", "CURRENT", "ROW", "UNBOUNDED",
      "FIRST_VALUE", "LAST_VALUE", "WITH", "CASE", "WHEN", "THEN", "ELSE", "END"
    ].includes(clean)) {
      type = "keyword";
    } else if (tables.some(t => tok.includes(t)) || ["RANKED", "DELTAS", "BALANCES", "CTE"].includes(clean)) {
      type = "table";
    }
    return { type, value: tok };
  });
}

// =============================================================================
// TOPIC 13: WINDOW RANKING & PERCENTILES (Drills #1201 to #1300)
// =============================================================================
const clustersT13 = [
  {
    range: [1201, 1210],
    subcluster: "13.1 Global ROW_NUMBER() OVER (ORDER BY col)",
    level: "Level 2 (Global Row Number)",
    blueprint: "SELECT col1, col2,\n  ROW_NUMBER() OVER (ORDER BY metric DESC) AS global_rank\nFROM table_name;",
    rule: "ROW_NUMBER() assigns a unique, sequential integer (1, 2, 3...) to each row ordered by the specified expression in the OVER clause.",
    trap: "ROW_NUMBER() never produces ties. If two rows have identical metric values, the tie-breaker is arbitrary unless a deterministic secondary sort column is provided.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa,\n  ROW_NUMBER() OVER (ORDER BY gpa DESC) AS academic_rank\nFROM Students;", goal: "Assign a unique sequential academic rank to every student ordered by GPA descending." },
      { tbl: "Books", target: "SELECT title, price,\n  ROW_NUMBER() OVER (ORDER BY price DESC) AS price_rank\nFROM Books;", goal: "Rank catalog books from most expensive to cheapest using ROW_NUMBER()." },
      { tbl: "Employees", target: "SELECT first_name, salary,\n  ROW_NUMBER() OVER (ORDER BY salary DESC) AS compensation_rank\nFROM Employees;", goal: "Assign a global compensation rank to all corporate employees." },
      { tbl: "GroceryItems", target: "SELECT item_name, stock_qty,\n  ROW_NUMBER() OVER (ORDER BY stock_qty ASC) AS restock_priority\nFROM GroceryItems;", goal: "Rank grocery items by lowest stock to establish restock priority numbers." },
      { tbl: "Orders", target: "SELECT order_id, total_amount,\n  ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS order_size_rank\nFROM Orders;", goal: "Rank customer orders from largest dollar value to smallest via ROW_NUMBER()." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds,\n  ROW_NUMBER() OVER (ORDER BY duration_seconds DESC) AS length_rank\nFROM MusicTracks;", goal: "Rank music tracks from longest to shortest using ROW_NUMBER()." },
      { tbl: "GymMembers", target: "SELECT member_name, attendance_days,\n  ROW_NUMBER() OVER (ORDER BY attendance_days DESC) AS attendance_rank\nFROM GymMembers;", goal: "Rank gym members by workout consistency from most active to least." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  ROW_NUMBER() OVER (ORDER BY star_rating DESC) AS critical_rank\nFROM MovieReviews;", goal: "Assign a critical standing rank to movie reviews based on star rating." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, distance_miles,\n  ROW_NUMBER() OVER (ORDER BY distance_miles DESC) AS distance_rank\nFROM FlightSchedule;", goal: "Rank scheduled flights by route distance from longest to shortest." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg,\n  ROW_NUMBER() OVER (ORDER BY weight_kg DESC) AS weight_rank\nFROM PetClinic;", goal: "Assign a weight rank to veterinary patients from heaviest to lightest." }
    ]
  },
  {
    range: [1211, 1220],
    subcluster: "13.2 Partitioned ROW_NUMBER() (Rank per Category)",
    level: "Level 2 (Partitioned Row Number)",
    blueprint: "SELECT col1, category, metric,\n  ROW_NUMBER() OVER (PARTITION BY category ORDER BY metric DESC) AS category_rank\nFROM table_name;",
    rule: "Adding PARTITION BY restarts the row numbering sequence at 1 for each distinct partition group.",
    trap: "Confusing PARTITION BY with GROUP BY. PARTITION BY does not collapse rows—every row retains its identity.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, major, gpa,\n  ROW_NUMBER() OVER (PARTITION BY major ORDER BY gpa DESC) AS major_rank\nFROM Students;", goal: "Rank students within their respective academic majors based on GPA." },
      { tbl: "Books", target: "SELECT title, genre, price,\n  ROW_NUMBER() OVER (PARTITION BY genre ORDER BY price DESC) AS genre_price_rank\nFROM Books;", goal: "Rank books by price within each literary genre." },
      { tbl: "Employees", target: "SELECT first_name, department, salary,\n  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_salary_rank\nFROM Employees;", goal: "Rank employees by salary within each corporate department." },
      { tbl: "GroceryItems", target: "SELECT item_name, category, unit_price,\n  ROW_NUMBER() OVER (PARTITION BY category ORDER BY unit_price DESC) AS category_price_rank\nFROM GroceryItems;", goal: "Rank grocery products from highest to lowest price within each aisle category." },
      { tbl: "Orders", target: "SELECT order_id, customer_name, total_amount,\n  ROW_NUMBER() OVER (PARTITION BY customer_name ORDER BY total_amount DESC) AS customer_order_rank\nFROM Orders;", goal: "Rank orders from highest to lowest amount for each individual customer." },
      { tbl: "MusicTracks", target: "SELECT track_title, genre, duration_seconds,\n  ROW_NUMBER() OVER (PARTITION BY genre ORDER BY duration_seconds DESC) AS genre_duration_rank\nFROM MusicTracks;", goal: "Rank music tracks by duration within each musical genre." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan, attendance_days,\n  ROW_NUMBER() OVER (PARTITION BY membership_plan ORDER BY attendance_days DESC) AS plan_attendance_rank\nFROM GymMembers;", goal: "Rank gym members by attendance within each membership plan tier." },
      { tbl: "MovieReviews", target: "SELECT movie_title, genre, star_rating,\n  ROW_NUMBER() OVER (PARTITION BY genre ORDER BY star_rating DESC) AS genre_rating_rank\nFROM MovieReviews;", goal: "Rank film reviews by star rating within each film genre." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport, distance_miles,\n  ROW_NUMBER() OVER (PARTITION BY origin_airport ORDER BY distance_miles DESC) AS airport_distance_rank\nFROM FlightSchedule;", goal: "Rank flights by route distance departing from each airport hub." },
      { tbl: "PetClinic", target: "SELECT pet_name, species, weight_kg,\n  ROW_NUMBER() OVER (PARTITION BY species ORDER BY weight_kg DESC) AS species_weight_rank\nFROM PetClinic;", goal: "Rank veterinary patients by weight within each animal species." }
    ]
  },
  {
    range: [1221, 1230],
    subcluster: "13.3 RANK() OVER (...) with Gaps for Ties",
    level: "Level 2 (Olympic Rank)",
    blueprint: "SELECT col1, metric,\n  RANK() OVER (ORDER BY metric DESC) AS olympic_rank\nFROM table_name;",
    rule: "RANK() assigns identical ranks to rows with equal values, but skips subsequent rank numbers (Olympic style: 1, 2, 2, 4).",
    trap: "Using RANK() when you need sequential ranking without gaps. Use DENSE_RANK() instead.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa,\n  RANK() OVER (ORDER BY gpa DESC) AS gpa_rank\nFROM Students;", goal: "Assign Olympic-style ranks to students by GPA where ties share a rank with gaps following." },
      { tbl: "Books", target: "SELECT title, price,\n  RANK() OVER (ORDER BY price DESC) AS book_rank\nFROM Books;", goal: "Rank book catalog prices using RANK() to handle identical prices." },
      { tbl: "Employees", target: "SELECT first_name, salary,\n  RANK() OVER (ORDER BY salary DESC) AS salary_rank\nFROM Employees;", goal: "Rank employee salaries where identical salaries receive tied ranks with gaps." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  RANK() OVER (ORDER BY unit_price ASC) AS budget_rank\nFROM GroceryItems;", goal: "Rank grocery products by cheapest price handling price ties with RANK()." },
      { tbl: "Orders", target: "SELECT order_id, total_amount,\n  RANK() OVER (ORDER BY total_amount DESC) AS spend_rank\nFROM Orders;", goal: "Rank customer orders by total dollar amount using RANK()." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds,\n  RANK() OVER (ORDER BY duration_seconds DESC) AS runtime_rank\nFROM MusicTracks;", goal: "Rank track runtimes allowing ties for identical durations." },
      { tbl: "GymMembers", target: "SELECT member_name, attendance_days,\n  RANK() OVER (ORDER BY attendance_days DESC) AS visit_rank\nFROM GymMembers;", goal: "Rank gym members by attendance frequency with Olympic tie handling." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  RANK() OVER (ORDER BY star_rating DESC) AS star_rank\nFROM MovieReviews;", goal: "Rank film reviews by star rating handling tied scores with RANK()." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, distance_miles,\n  RANK() OVER (ORDER BY distance_miles DESC) AS route_rank\nFROM FlightSchedule;", goal: "Rank flight routes by distance using standard tie-skipping RANK()." },
      { tbl: "PetClinic", target: "SELECT pet_name, age_years,\n  RANK() OVER (ORDER BY age_years DESC) AS age_rank\nFROM PetClinic;", goal: "Rank veterinary patients by age in years handling tied ages via RANK()." }
    ]
  },
  {
    range: [1231, 1240],
    subcluster: "13.4 DENSE_RANK() OVER (...) without Gaps",
    level: "Level 2 (Dense Rank)",
    blueprint: "SELECT col1, metric,\n  DENSE_RANK() OVER (ORDER BY metric DESC) AS dense_rank_val\nFROM table_name;",
    rule: "DENSE_RANK() assigns identical ranks to tied values, but does NOT skip any numbers (1, 2, 2, 3, 4).",
    trap: "Using DENSE_RANK() to find the 'Top 3' might return more than 3 rows if there are ties, but guaranteed to cover the 3 highest distinct values.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa,\n  DENSE_RANK() OVER (ORDER BY gpa DESC) AS dense_gpa_rank\nFROM Students;", goal: "Assign continuous ranks to student GPAs without gaps (1, 2, 2, 3) using DENSE_RANK()." },
      { tbl: "Books", target: "SELECT title, price,\n  DENSE_RANK() OVER (ORDER BY price DESC) AS dense_price_rank\nFROM Books;", goal: "Rank book prices continuously using DENSE_RANK()." },
      { tbl: "Employees", target: "SELECT first_name, salary,\n  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_salary_rank\nFROM Employees;", goal: "Rank employee salaries without rank gaps to establish distinct compensation levels." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  DENSE_RANK() OVER (ORDER BY unit_price DESC) AS dense_price_tier\nFROM GroceryItems;", goal: "Assign continuous price tiers to grocery products using DENSE_RANK()." },
      { tbl: "Orders", target: "SELECT order_id, total_amount,\n  DENSE_RANK() OVER (ORDER BY total_amount DESC) AS dense_order_rank\nFROM Orders;", goal: "Rank orders continuously by dollar value without skipping numbers." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds,\n  DENSE_RANK() OVER (ORDER BY duration_seconds DESC) AS dense_length_rank\nFROM MusicTracks;", goal: "Rank track durations continuously using DENSE_RANK()." },
      { tbl: "GymMembers", target: "SELECT member_name, attendance_days,\n  DENSE_RANK() OVER (ORDER BY attendance_days DESC) AS dense_attendance_rank\nFROM GymMembers;", goal: "Rank member attendance frequency with gap-free ranks." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  DENSE_RANK() OVER (ORDER BY star_rating DESC) AS dense_star_rank\nFROM MovieReviews;", goal: "Rank film ratings without skipping numbers via DENSE_RANK()." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, distance_miles,\n  DENSE_RANK() OVER (ORDER BY distance_miles DESC) AS dense_distance_rank\nFROM FlightSchedule;", goal: "Rank flight distances continuously without rank gaps." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg,\n  DENSE_RANK() OVER (ORDER BY weight_kg DESC) AS dense_weight_rank\nFROM PetClinic;", goal: "Rank clinic animal weights continuously using DENSE_RANK()." }
    ]
  },
  {
    range: [1241, 1250],
    subcluster: "13.5 Top-N per Group via CTE Filter (The Gold Standard Pattern)",
    level: "Level 3 (Top-N Partitioned Filter)",
    blueprint: "WITH Ranked AS (\n  SELECT col1, category, metric,\n    DENSE_RANK() OVER (PARTITION BY category ORDER BY metric DESC) AS rnk\n  FROM table_name\n)\nSELECT *\nFROM Ranked\nWHERE rnk <= 3;",
    rule: "You cannot filter window functions directly in WHERE (due to logical execution order). Wrap the window function in a CTE, then filter 'WHERE rnk <= N'.",
    trap: "Writing 'WHERE ROW_NUMBER() OVER (...) <= 3' in the same query; window functions evaluate AFTER the WHERE clause.",
    topics: [
      { tbl: "Students", target: "WITH RankedStudents AS (\n  SELECT full_name, major, gpa,\n    DENSE_RANK() OVER (PARTITION BY major ORDER BY gpa DESC) AS rnk\n  FROM Students\n)\nSELECT full_name, major, gpa\nFROM RankedStudents\nWHERE rnk <= 2;", goal: "Find the top 2 highest-GPA students within each academic major using a CTE wrapper." },
      { tbl: "Books", target: "WITH RankedBooks AS (\n  SELECT title, genre, price,\n    DENSE_RANK() OVER (PARTITION BY genre ORDER BY price DESC) AS rnk\n  FROM Books\n)\nSELECT title, genre, price\nFROM RankedBooks\nWHERE rnk <= 2;", goal: "Retrieve the top 2 most expensive books within each literary genre." },
      { tbl: "Employees", target: "WITH RankedStaff AS (\n  SELECT first_name, department, salary,\n    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk\n  FROM Employees\n)\nSELECT first_name, department, salary\nFROM RankedStaff\nWHERE rnk <= 3;", goal: "Identify the top 3 highest-paid employees in each corporate department." },
      { tbl: "GroceryItems", target: "WITH RankedGrocery AS (\n  SELECT item_name, category, unit_price,\n    DENSE_RANK() OVER (PARTITION BY category ORDER BY unit_price DESC) AS rnk\n  FROM GroceryItems\n)\nSELECT item_name, category, unit_price\nFROM RankedGrocery\nWHERE rnk <= 2;", goal: "Find the top 2 highest priced products within each grocery category." },
      { tbl: "Orders", target: "WITH RankedOrders AS (\n  SELECT order_id, customer_name, total_amount,\n    ROW_NUMBER() OVER (PARTITION BY customer_name ORDER BY total_amount DESC) AS rnk\n  FROM Orders\n)\nSELECT order_id, customer_name, total_amount\nFROM RankedOrders\nWHERE rnk = 1;", goal: "Find each customer's single largest historical order using 'WHERE rnk = 1'." },
      { tbl: "MusicTracks", target: "WITH RankedTracks AS (\n  SELECT track_title, genre, duration_seconds,\n    DENSE_RANK() OVER (PARTITION BY genre ORDER BY duration_seconds DESC) AS rnk\n  FROM MusicTracks\n)\nSELECT track_title, genre, duration_seconds\nFROM RankedTracks\nWHERE rnk <= 2;", goal: "Find the 2 longest songs within each musical genre." },
      { tbl: "GymMembers", target: "WITH RankedMembers AS (\n  SELECT member_name, membership_plan, attendance_days,\n    DENSE_RANK() OVER (PARTITION BY membership_plan ORDER BY attendance_days DESC) AS rnk\n  FROM GymMembers\n)\nSELECT member_name, membership_plan, attendance_days\nFROM RankedMembers\nWHERE rnk <= 3;", goal: "Find the top 3 most dedicated members within each gym membership tier." },
      { tbl: "MovieReviews", target: "WITH RankedReviews AS (\n  SELECT movie_title, genre, star_rating,\n    DENSE_RANK() OVER (PARTITION BY genre ORDER BY star_rating DESC) AS rnk\n  FROM MovieReviews\n)\nSELECT movie_title, genre, star_rating\nFROM RankedReviews\nWHERE rnk <= 2;", goal: "Retrieve the top 2 highest rated reviews within each film genre." },
      { tbl: "FlightSchedule", target: "WITH RankedFlights AS (\n  SELECT flight_id, origin_airport, distance_miles,\n    ROW_NUMBER() OVER (PARTITION BY origin_airport ORDER BY distance_miles DESC) AS rnk\n  FROM FlightSchedule\n)\nSELECT flight_id, origin_airport, distance_miles\nFROM RankedFlights\nWHERE rnk = 1;", goal: "Identify the single longest flight route departing from each airport hub." },
      { tbl: "PetClinic", target: "WITH RankedPatients AS (\n  SELECT pet_name, species, weight_kg,\n    DENSE_RANK() OVER (PARTITION BY species ORDER BY weight_kg DESC) AS rnk\n  FROM PetClinic\n)\nSELECT pet_name, species, weight_kg\nFROM RankedPatients\nWHERE rnk <= 2;", goal: "Find the 2 heaviest animal patients within each species category." }
    ]
  },
  {
    range: [1251, 1260],
    subcluster: "13.6 Bottom-N per Group (Ascending Ranks)",
    level: "Level 3 (Bottom-N Partitioned Filter)",
    blueprint: "WITH LowestRanked AS (\n  SELECT col1, category, metric,\n    ROW_NUMBER() OVER (PARTITION BY category ORDER BY metric ASC) AS rnk\n  FROM table_name\n)\nSELECT *\nFROM LowestRanked\nWHERE rnk = 1;",
    rule: "Order by ASC inside the window function to identify the lowest, cheapest, or earliest records within each partition.",
    trap: "Using DESC when searching for minimum or earliest values.",
    topics: [
      { tbl: "Students", target: "WITH EarliestEnrolled AS (\n  SELECT full_name, major, enrolled_year,\n    ROW_NUMBER() OVER (PARTITION BY major ORDER BY enrolled_year ASC) AS rnk\n  FROM Students\n)\nSELECT full_name, major, enrolled_year\nFROM EarliestEnrolled\nWHERE rnk = 1;", goal: "Find the earliest enrolled student within each major using ascending ROW_NUMBER." },
      { tbl: "Books", target: "WITH CheapestBooks AS (\n  SELECT title, genre, price,\n    ROW_NUMBER() OVER (PARTITION BY genre ORDER BY price ASC) AS rnk\n  FROM Books\n)\nSELECT title, genre, price\nFROM CheapestBooks\nWHERE rnk = 1;", goal: "Find the single most affordable book within each literary genre." },
      { tbl: "Employees", target: "WITH EarliestHires AS (\n  SELECT first_name, department, hire_date,\n    ROW_NUMBER() OVER (PARTITION BY department ORDER BY hire_date ASC) AS rnk\n  FROM Employees\n)\nSELECT first_name, department, hire_date\nFROM EarliestHires\nWHERE rnk = 1;", goal: "Find the most veteran employee (earliest hire date) in each department." },
      { tbl: "GroceryItems", target: "WITH LowestStockItems AS (\n  SELECT item_name, category, stock_qty,\n    ROW_NUMBER() OVER (PARTITION BY category ORDER BY stock_qty ASC) AS rnk\n  FROM GroceryItems\n)\nSELECT item_name, category, stock_qty\nFROM LowestStockItems\nWHERE rnk = 1;", goal: "Identify the single lowest-inventory product in each grocery department." },
      { tbl: "Orders", target: "WITH EarliestOrders AS (\n  SELECT order_id, customer_name, order_date,\n    ROW_NUMBER() OVER (PARTITION BY customer_name ORDER BY order_date ASC) AS rnk\n  FROM Orders\n)\nSELECT order_id, customer_name, order_date\nFROM EarliestOrders\nWHERE rnk = 1;", goal: "Retrieve each customer's inaugural first order using 'WHERE rnk = 1'." },
      { tbl: "MusicTracks", target: "WITH ShortestTracks AS (\n  SELECT track_title, genre, duration_seconds,\n    ROW_NUMBER() OVER (PARTITION BY genre ORDER BY duration_seconds ASC) AS rnk\n  FROM MusicTracks\n)\nSELECT track_title, genre, duration_seconds\nFROM ShortestTracks\nWHERE rnk = 1;", goal: "Find the shortest music track within each musical genre." },
      { tbl: "GymMembers", target: "WITH EarliestMembers AS (\n  SELECT member_name, membership_plan, join_date,\n    ROW_NUMBER() OVER (PARTITION BY membership_plan ORDER BY join_date ASC) AS rnk\n  FROM GymMembers\n)\nSELECT member_name, membership_plan, join_date\nFROM EarliestMembers\nWHERE rnk = 1;", goal: "Find the founding member of each gym membership plan tier." },
      { tbl: "MovieReviews", target: "WITH CriticalOutliers AS (\n  SELECT movie_title, genre, star_rating,\n    ROW_NUMBER() OVER (PARTITION BY genre ORDER BY star_rating ASC) AS rnk\n  FROM MovieReviews\n)\nSELECT movie_title, genre, star_rating\nFROM CriticalOutliers\nWHERE rnk = 1;", goal: "Find the lowest-rated review within each film genre." },
      { tbl: "FlightSchedule", target: "WITH ShortestRoutes AS (\n  SELECT flight_id, origin_airport, distance_miles,\n    ROW_NUMBER() OVER (PARTITION BY origin_airport ORDER BY distance_miles ASC) AS rnk\n  FROM FlightSchedule\n)\nSELECT flight_id, origin_airport, distance_miles\nFROM ShortestRoutes\nWHERE rnk = 1;", goal: "Find the shortest flight route departing from each airport hub." },
      { tbl: "PetClinic", target: "WITH SmallestPatients AS (\n  SELECT pet_name, species, weight_kg,\n    ROW_NUMBER() OVER (PARTITION BY species ORDER BY weight_kg ASC) AS rnk\n  FROM PetClinic\n)\nSELECT pet_name, species, weight_kg\nFROM SmallestPatients\nWHERE rnk = 1;", goal: "Find the lightest patient within each animal species category." }
    ]
  },
  {
    range: [1261, 1270],
    subcluster: "13.7 NTILE(4) Quartile Bucketing",
    level: "Level 2 (Quartiles)",
    blueprint: "SELECT col1, metric,\n  NTILE(4) OVER (ORDER BY metric DESC) AS quartile\nFROM table_name;",
    rule: "NTILE(n) divides ordered rows into 'n' roughly equal buckets, assigning bucket integers from 1 to n (e.g. 1 = Top 25%).",
    trap: "If the row count is not evenly divisible by n, NTILE places the extra rows in the earliest buckets.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa,\n  NTILE(4) OVER (ORDER BY gpa DESC) AS gpa_quartile\nFROM Students;", goal: "Segment students into 4 academic quartiles (Q1 = Top 25% GPA)." },
      { tbl: "Books", target: "SELECT title, price,\n  NTILE(4) OVER (ORDER BY price DESC) AS price_quartile\nFROM Books;", goal: "Bucket books into 4 price quartiles from high-end to budget." },
      { tbl: "Employees", target: "SELECT first_name, salary,\n  NTILE(4) OVER (ORDER BY salary DESC) AS salary_quartile\nFROM Employees;", goal: "Divide employees into 4 compensation quartiles using NTILE(4)." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  NTILE(4) OVER (ORDER BY unit_price DESC) AS price_bracket\nFROM GroceryItems;", goal: "Segment grocery products into 4 pricing brackets." },
      { tbl: "Orders", target: "SELECT order_id, total_amount,\n  NTILE(4) OVER (ORDER BY total_amount DESC) AS order_quartile\nFROM Orders;", goal: "Divide customer orders into 4 transaction value quartiles." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds,\n  NTILE(4) OVER (ORDER BY duration_seconds DESC) AS length_quartile\nFROM MusicTracks;", goal: "Segment music tracks into 4 runtime duration quartiles." },
      { tbl: "GymMembers", target: "SELECT member_name, attendance_days,\n  NTILE(4) OVER (ORDER BY attendance_days DESC) AS activity_quartile\nFROM GymMembers;", goal: "Segment gym members into 4 workout activity quartiles." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  NTILE(4) OVER (ORDER BY star_rating DESC) AS rating_quartile\nFROM MovieReviews;", goal: "Bucket movie reviews into 4 rating tiers via NTILE(4)." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, distance_miles,\n  NTILE(4) OVER (ORDER BY distance_miles DESC) AS distance_tier\nFROM FlightSchedule;", goal: "Segment flight distances into 4 flight length tiers." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg,\n  NTILE(4) OVER (ORDER BY weight_kg DESC) AS weight_quartile\nFROM PetClinic;", goal: "Divide veterinary patients into 4 weight quartiles." }
    ]
  },
  {
    range: [1271, 1280],
    subcluster: "13.8 NTILE(10) Decile Segmentation (Top 10%)",
    level: "Level 2 (Deciles)",
    blueprint: "SELECT col1, metric,\n  NTILE(10) OVER (ORDER BY metric DESC) AS decile\nFROM table_name;",
    rule: "NTILE(10) divides a population into 10 deciles (1 = Top 10%, 10 = Bottom 10%), commonly used in marketing and credit risk scoring.",
    trap: "Using NTILE on tables with very few rows (e.g. 5 rows with NTILE(10) will only populate buckets 1 to 5).",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa,\n  NTILE(10) OVER (ORDER BY gpa DESC) AS academic_decile\nFROM Students;", goal: "Identify top 10% academic scholars using NTILE(10)." },
      { tbl: "Books", target: "SELECT title, price,\n  NTILE(10) OVER (ORDER BY price DESC) AS pricing_decile\nFROM Books;", goal: "Divide bookstore catalog into 10 pricing deciles." },
      { tbl: "Employees", target: "SELECT first_name, salary,\n  NTILE(10) OVER (ORDER BY salary DESC) AS compensation_decile\nFROM Employees;", goal: "Segment employee salaries into 10 compensation deciles." },
      { tbl: "GroceryItems", target: "SELECT item_name, stock_qty,\n  NTILE(10) OVER (ORDER BY stock_qty DESC) AS inventory_decile\nFROM GroceryItems;", goal: "Segment inventory stock levels into 10 deciles." },
      { tbl: "Orders", target: "SELECT order_id, total_amount,\n  NTILE(10) OVER (ORDER BY total_amount DESC) AS revenue_decile\nFROM Orders;", goal: "Segment orders into 10 revenue deciles to identify top 10% VIP transactions." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds,\n  NTILE(10) OVER (ORDER BY duration_seconds DESC) AS duration_decile\nFROM MusicTracks;", goal: "Divide track lengths into 10 duration deciles." },
      { tbl: "GymMembers", target: "SELECT member_name, attendance_days,\n  NTILE(10) OVER (ORDER BY attendance_days DESC) AS loyalty_decile\nFROM GymMembers;", goal: "Segment gym members into 10 dedication deciles." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  NTILE(10) OVER (ORDER BY star_rating DESC) AS quality_decile\nFROM MovieReviews;", goal: "Bucket film ratings into 10 deciles via NTILE(10)." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, distance_miles,\n  NTILE(10) OVER (ORDER BY distance_miles DESC) AS flight_decile\nFROM FlightSchedule;", goal: "Divide flight route distances into 10 decile bands." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg,\n  NTILE(10) OVER (ORDER BY weight_kg DESC) AS weight_decile\nFROM PetClinic;", goal: "Segment clinic animal weights into 10 deciles." }
    ]
  },
  {
    range: [1281, 1290],
    subcluster: "13.9 Cumulative Distribution (CUME_DIST)",
    level: "Level 3 (Cumulative Distribution)",
    blueprint: "SELECT col1, metric,\n  CUME_DIST() OVER (ORDER BY metric ASC) AS cumulative_pct\nFROM table_name;",
    rule: "CUME_DIST() computes the relative position of a value: (number of rows with values <= current row) / (total rows). Returns a decimal between 0 and 1.0.",
    trap: "Tied values receive the exact same cumulative distribution score (the highest value among the ties).",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa,\n  CUME_DIST() OVER (ORDER BY gpa ASC) AS gpa_percentile\nFROM Students;", goal: "Compute the exact cumulative distribution percentile for student GPAs." },
      { tbl: "Books", target: "SELECT title, price,\n  CUME_DIST() OVER (ORDER BY price ASC) AS price_percentile\nFROM Books;", goal: "Compute the cumulative distribution of book prices." },
      { tbl: "Employees", target: "SELECT first_name, salary,\n  CUME_DIST() OVER (ORDER BY salary ASC) AS salary_cume_dist\nFROM Employees;", goal: "Calculate the exact cumulative salary distribution for compensation benchmarking." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  CUME_DIST() OVER (ORDER BY unit_price ASC) AS cost_distribution\nFROM GroceryItems;", goal: "Compute the cumulative price distribution across grocery inventory." },
      { tbl: "Orders", target: "SELECT order_id, total_amount,\n  CUME_DIST() OVER (ORDER BY total_amount ASC) AS spend_distribution\nFROM Orders;", goal: "Calculate the cumulative distribution of customer order values." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds,\n  CUME_DIST() OVER (ORDER BY duration_seconds ASC) AS duration_distribution\nFROM MusicTracks;", goal: "Compute the cumulative duration distribution of music tracks." },
      { tbl: "GymMembers", target: "SELECT member_name, attendance_days,\n  CUME_DIST() OVER (ORDER BY attendance_days ASC) AS attendance_distribution\nFROM GymMembers;", goal: "Compute the cumulative distribution of member gym attendance." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  CUME_DIST() OVER (ORDER BY star_rating ASC) AS rating_distribution\nFROM MovieReviews;", goal: "Calculate cumulative distribution of movie star ratings." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, distance_miles,\n  CUME_DIST() OVER (ORDER BY distance_miles ASC) AS distance_distribution\nFROM FlightSchedule;", goal: "Compute cumulative distribution of scheduled flight distances." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg,\n  CUME_DIST() OVER (ORDER BY weight_kg ASC) AS weight_distribution\nFROM PetClinic;", goal: "Compute cumulative distribution of animal patient weights." }
    ]
  },
  {
    range: [1291, 1300],
    subcluster: "13.10 Relative Percentile Rank (PERCENT_RANK)",
    level: "Level 3 (Relative Percent Rank)",
    blueprint: "SELECT col1, metric,\n  PERCENT_RANK() OVER (ORDER BY metric ASC) AS pct_rank\nFROM table_name;",
    rule: "PERCENT_RANK() evaluates (rank - 1) / (total_rows - 1). The first row always returns 0.0, and the highest row returns 1.0.",
    trap: "PERCENT_RANK() is strictly 0.0-based, whereas CUME_DIST() is never 0.0.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa,\n  PERCENT_RANK() OVER (ORDER BY gpa ASC) AS gpa_rank_ratio\nFROM Students;", goal: "Calculate relative percentile rank (0.0 to 1.0) for student GPAs." },
      { tbl: "Books", target: "SELECT title, price,\n  PERCENT_RANK() OVER (ORDER BY price ASC) AS relative_price_rank\nFROM Books;", goal: "Compute relative price percentile ranks for library books." },
      { tbl: "Employees", target: "SELECT first_name, salary,\n  PERCENT_RANK() OVER (ORDER BY salary ASC) AS comp_percent_rank\nFROM Employees;", goal: "Calculate relative salary rank percentiles across corporate staff." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  PERCENT_RANK() OVER (ORDER BY unit_price ASC) AS price_percent_rank\nFROM GroceryItems;", goal: "Compute relative price rank percentiles across grocery inventory." },
      { tbl: "Orders", target: "SELECT order_id, total_amount,\n  PERCENT_RANK() OVER (ORDER BY total_amount ASC) AS order_percent_rank\nFROM Orders;", goal: "Calculate relative percentile rank for customer order values." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds,\n  PERCENT_RANK() OVER (ORDER BY duration_seconds ASC) AS duration_pct_rank\nFROM MusicTracks;", goal: "Calculate track duration relative rank percentiles via PERCENT_RANK." },
      { tbl: "GymMembers", target: "SELECT member_name, attendance_days,\n  PERCENT_RANK() OVER (ORDER BY attendance_days ASC) AS activity_percent_rank\nFROM GymMembers;", goal: "Compute relative activity rank percentiles for gym members." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  PERCENT_RANK() OVER (ORDER BY star_rating ASC) AS rating_percent_rank\nFROM MovieReviews;", goal: "Calculate relative star rating percentiles for movie reviews." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, distance_miles,\n  PERCENT_RANK() OVER (ORDER BY distance_miles ASC) AS distance_pct_rank\nFROM FlightSchedule;", goal: "Compute flight distance relative rank percentiles." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg,\n  PERCENT_RANK() OVER (ORDER BY weight_kg ASC) AS weight_pct_rank\nFROM PetClinic;", goal: "Calculate patient weight relative rank percentiles in the veterinary clinic." }
    ]
  }
];

// =============================================================================
// TOPIC 14: VALUE OFFSETS & TIME-SERIES DELTAS (Drills #1301 to #1400)
// =============================================================================
const clustersT14 = [
  {
    range: [1301, 1310],
    subcluster: "14.1 Previous Value Lookup (LAG(col, 1))",
    level: "Level 2 (Basic LAG)",
    blueprint: "SELECT col1, date_col, metric,\n  LAG(metric, 1) OVER (ORDER BY date_col ASC) AS prev_metric\nFROM table_name;",
    rule: "LAG(col, 1) accesses data from the preceding row without performing a self-join. The first row always returns NULL.",
    trap: "Forgetting the ORDER BY clause inside OVER(); LAG requires a strict deterministic ordering to know what 'previous' means.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, order_date, total_amount,\n  LAG(total_amount, 1) OVER (ORDER BY order_date ASC) AS prev_order_amount\nFROM Orders;", goal: "Look up the previous order amount chronologically using LAG(total_amount, 1)." },
      { tbl: "Students", target: "SELECT student_id, enrolled_year, gpa,\n  LAG(gpa, 1) OVER (ORDER BY enrolled_year ASC) AS prev_student_gpa\nFROM Students;", goal: "Project preceding student GPA along the enrollment timeline." },
      { tbl: "Books", target: "SELECT book_id, published_date, price,\n  LAG(price, 1) OVER (ORDER BY published_date ASC) AS prev_book_price\nFROM Books;", goal: "Inspect previous book publication price chronologically." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, salary,\n  LAG(salary, 1) OVER (ORDER BY hire_date ASC) AS prev_hire_salary\nFROM Employees;", goal: "Inspect the salary of the previously hired employee." },
      { tbl: "GroceryItems", target: "SELECT item_name, expiry_date, unit_price,\n  LAG(unit_price, 1) OVER (ORDER BY expiry_date ASC) AS prev_item_price\nFROM GroceryItems;", goal: "Inspect the price of the previously expiring grocery product." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date, duration_seconds,\n  LAG(duration_seconds, 1) OVER (ORDER BY release_date ASC) AS prev_track_duration\nFROM MusicTracks;", goal: "Retrieve the duration of the previously released track." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date, monthly_fee,\n  LAG(monthly_fee, 1) OVER (ORDER BY join_date ASC) AS prev_member_fee\nFROM GymMembers;", goal: "Inspect the membership fee of the previously registered gym member." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, star_rating,\n  LAG(star_rating, 1) OVER (ORDER BY review_date ASC) AS prev_review_stars\nFROM MovieReviews;", goal: "Inspect the star rating of the previously published film review." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time, ticket_price,\n  LAG(ticket_price, 1) OVER (ORDER BY departure_time ASC) AS prev_flight_price\nFROM FlightSchedule;", goal: "Look up the ticket price of the previously scheduled flight departure." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, weight_kg,\n  LAG(weight_kg, 1) OVER (ORDER BY visit_date ASC) AS prev_patient_weight\nFROM PetClinic;", goal: "Look up the weight of the previously seen clinic animal patient." }
    ]
  },
  {
    range: [1311, 1320],
    subcluster: "14.2 Partitioned LAG() by Entity Group",
    level: "Level 2 (Partitioned LAG)",
    blueprint: "SELECT entity_id, date_col, metric,\n  LAG(metric, 1) OVER (PARTITION BY entity_id ORDER BY date_col ASC) AS prev_entity_val\nFROM table_name;",
    rule: "Combining LAG() with PARTITION BY guarantees that the offset only references the previous row FOR THAT SPECIFIC ENTITY (e.g. same customer).",
    trap: "Omitting PARTITION BY will accidentally bleed the previous customer's last order into the new customer's first order.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, customer_name, order_date, total_amount,\n  LAG(total_amount, 1) OVER (PARTITION BY customer_name ORDER BY order_date ASC) AS prev_customer_order\nFROM Orders;", goal: "Retrieve each customer's previous order amount partitioned by customer name." },
      { tbl: "Students", target: "SELECT full_name, major, enrolled_year, gpa,\n  LAG(gpa, 1) OVER (PARTITION BY major ORDER BY enrolled_year ASC) AS prev_major_gpa\nFROM Students;", goal: "Retrieve the GPA of the previous student who enrolled in the same major." },
      { tbl: "Books", target: "SELECT title, author, published_date, price,\n  LAG(price, 1) OVER (PARTITION BY author ORDER BY published_date ASC) AS prev_author_book_price\nFROM Books;", goal: "Look up the price of the author's previous book release." },
      { tbl: "Employees", target: "SELECT first_name, department, hire_date, salary,\n  LAG(salary, 1) OVER (PARTITION BY department ORDER BY hire_date ASC) AS prev_dept_hire_salary\nFROM Employees;", goal: "Look up the salary of the previous employee hired within the same department." },
      { tbl: "GroceryItems", target: "SELECT item_name, category, expiry_date, unit_price,\n  LAG(unit_price, 1) OVER (PARTITION BY category ORDER BY expiry_date ASC) AS prev_category_item_price\nFROM GroceryItems;", goal: "Look up the price of the previous item in the same category." },
      { tbl: "MusicTracks", target: "SELECT track_title, artist_name, release_date, duration_seconds,\n  LAG(duration_seconds, 1) OVER (PARTITION BY artist_name ORDER BY release_date ASC) AS prev_artist_track_len\nFROM MusicTracks;", goal: "Look up the runtime duration of the artist's previous song release." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan, join_date, monthly_fee,\n  LAG(monthly_fee, 1) OVER (PARTITION BY membership_plan ORDER BY join_date ASC) AS prev_plan_signup_fee\nFROM GymMembers;", goal: "Look up the previous signup fee within the same membership plan." },
      { tbl: "MovieReviews", target: "SELECT movie_title, reviewer_name, review_date, star_rating,\n  LAG(star_rating, 1) OVER (PARTITION BY reviewer_name ORDER BY review_date ASC) AS prev_critic_score\nFROM MovieReviews;", goal: "Retrieve the star rating given by the same critic in their previous review." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, airline_id, departure_time, ticket_price,\n  LAG(ticket_price, 1) OVER (PARTITION BY airline_id ORDER BY departure_time ASC) AS prev_airline_fare\nFROM FlightSchedule;", goal: "Look up the previous flight fare charged by the same airline carrier." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, weight_kg,\n  LAG(weight_kg, 1) OVER (PARTITION BY pet_name ORDER BY visit_date ASC) AS prev_visit_weight\nFROM PetClinic;", goal: "Track patient weight history: look up the pet's weight on their previous clinic visit." }
    ]
  },
  {
    range: [1321, 1330],
    subcluster: "14.3 Future Value Lookup (LEAD(col, 1))",
    level: "Level 2 (Basic LEAD)",
    blueprint: "SELECT col1, date_col, metric,\n  LEAD(metric, 1) OVER (ORDER BY date_col ASC) AS next_metric\nFROM table_name;",
    rule: "LEAD(col, 1) looks forward to the next row in the partition. The final row always returns NULL.",
    trap: "Using LEAD() when you intended to look backward; LEAD is for next events, LAG is for past events.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, customer_name, order_date,\n  LEAD(order_date, 1) OVER (PARTITION BY customer_name ORDER BY order_date ASC) AS next_order_date\nFROM Orders;", goal: "Look ahead to identify each customer's next subsequent purchase date." },
      { tbl: "Students", target: "SELECT full_name, enrolled_year,\n  LEAD(enrolled_year, 1) OVER (ORDER BY enrolled_year ASC) AS next_enroll_year\nFROM Students;", goal: "Inspect the enrollment year of the next chronological student." },
      { tbl: "Books", target: "SELECT title, published_date,\n  LEAD(published_date, 1) OVER (PARTITION BY author ORDER BY published_date ASC) AS next_book_date\nFROM Books;", goal: "Find the release date of the author's next book in sequence." },
      { tbl: "Employees", target: "SELECT first_name, hire_date,\n  LEAD(hire_date, 1) OVER (ORDER BY hire_date ASC) AS next_company_hire_date\nFROM Employees;", goal: "Identify when the next employee was onboarded after this employee." },
      { tbl: "GroceryItems", target: "SELECT item_name, expiry_date,\n  LEAD(expiry_date, 1) OVER (PARTITION BY category ORDER BY expiry_date ASC) AS next_expiring_date\nFROM GroceryItems;", goal: "Look ahead to the next scheduled product expiration in the category." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date,\n  LEAD(release_date, 1) OVER (PARTITION BY artist_name ORDER BY release_date ASC) AS next_release_date\nFROM MusicTracks;", goal: "Identify when the artist released their next music single." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date,\n  LEAD(join_date, 1) OVER (ORDER BY join_date ASC) AS next_member_join_date\nFROM GymMembers;", goal: "Look ahead to the registration date of the next gym member." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date,\n  LEAD(review_date, 1) OVER (PARTITION BY reviewer_name ORDER BY review_date ASC) AS next_review_date\nFROM MovieReviews;", goal: "Look ahead to the critic's next review submission date." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport, departure_time,\n  LEAD(departure_time, 1) OVER (PARTITION BY origin_airport ORDER BY departure_time ASC) AS next_departure_time\nFROM FlightSchedule;", goal: "Identify the departure time of the next scheduled flight from the same airport." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date,\n  LEAD(visit_date, 1) OVER (PARTITION BY pet_name ORDER BY visit_date ASC) AS next_appointment_date\nFROM PetClinic;", goal: "Identify the date of the pet's subsequent clinic follow-up visit." }
    ]
  },
  {
    range: [1331, 1340],
    subcluster: "14.4 LAG() with Fallback Defaults (LAG(col, 1, default))",
    level: "Level 2 (LAG with Default)",
    blueprint: "SELECT col1, metric,\n  LAG(metric, 1, 0) OVER (ORDER BY date_col ASC) AS prev_metric_safe\nFROM table_name;",
    rule: "LAG accepts a 3rd parameter: LAG(col, offset, default_val). This prevents NULL values on the first row by supplying a safe numeric or text fallback.",
    trap: "The default value must match the data type of the column being evaluated (e.g. 0 for integers, 'N/A' for strings).",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, order_date, total_amount,\n  LAG(total_amount, 1, 0.00) OVER (ORDER BY order_date ASC) AS prev_amount_safe\nFROM Orders;", goal: "Retrieve previous order amount using 0.00 as safe fallback default for initial order." },
      { tbl: "Students", target: "SELECT full_name, enrolled_year, gpa,\n  LAG(gpa, 1, 0.00) OVER (ORDER BY enrolled_year ASC) AS prev_gpa_safe\nFROM Students;", goal: "Provide a 0.00 default fallback for the first student's previous GPA." },
      { tbl: "Books", target: "SELECT title, published_date, price,\n  LAG(price, 1, 0.00) OVER (ORDER BY published_date ASC) AS prev_price_safe\nFROM Books;", goal: "Use 0.00 default fallback for previous book price." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, salary,\n  LAG(salary, 1, 0.00) OVER (ORDER BY hire_date ASC) AS prev_salary_safe\nFROM Employees;", goal: "Supply 0.00 as default fallback for previous hire salary." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  LAG(unit_price, 1, 0.00) OVER (ORDER BY item_id ASC) AS prev_unit_price_safe\nFROM GroceryItems;", goal: "Provide 0.00 default fallback for previous grocery product price." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds,\n  LAG(duration_seconds, 1, 0) OVER (ORDER BY track_id ASC) AS prev_duration_safe\nFROM MusicTracks;", goal: "Use 0 seconds as default fallback for previous track duration." },
      { tbl: "GymMembers", target: "SELECT member_name, attendance_days,\n  LAG(attendance_days, 1, 0) OVER (ORDER BY member_id ASC) AS prev_attendance_safe\nFROM GymMembers;", goal: "Supply 0 as default fallback for previous member attendance count." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  LAG(star_rating, 1, 0) OVER (ORDER BY review_id ASC) AS prev_stars_safe\nFROM MovieReviews;", goal: "Provide 0 as default fallback for previous review star rating." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, ticket_price,\n  LAG(ticket_price, 1, 0.00) OVER (ORDER BY flight_id ASC) AS prev_fare_safe\nFROM FlightSchedule;", goal: "Use 0.00 as fallback default for previous flight ticket price." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg,\n  LAG(weight_kg, 1, 0.0) OVER (ORDER BY pet_id ASC) AS prev_weight_safe\nFROM PetClinic;", goal: "Supply 0.0 as default fallback for previous veterinary patient weight." }
    ]
  },
  {
    range: [1341, 1350],
    subcluster: "14.5 Absolute Delta Calculations (val - LAG(val))",
    level: "Level 3 (Absolute Delta)",
    blueprint: "SELECT col1, metric,\n  metric - LAG(metric, 1) OVER (ORDER BY date_col ASC) AS absolute_change\nFROM table_name;",
    rule: "Subtract the lagged value from the current row value to compute the net dollar, point, or volume change between consecutive events.",
    trap: "Arithmetic on NULL returns NULL. The first row in any delta query will naturally return NULL unless a default is used.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, order_date, total_amount,\n  total_amount - LAG(total_amount, 1) OVER (ORDER BY order_date ASC) AS order_dollar_delta\nFROM Orders;", goal: "Calculate the net dollar change between each customer order and the previous order." },
      { tbl: "Students", target: "SELECT full_name, enrolled_year, gpa,\n  gpa - LAG(gpa, 1) OVER (ORDER BY enrolled_year ASC) AS gpa_trend_delta\nFROM Students;", goal: "Calculate the GPA delta between consecutive enrolled students." },
      { tbl: "Books", target: "SELECT title, published_date, price,\n  price - LAG(price, 1) OVER (PARTITION BY author ORDER BY published_date ASC) AS author_price_delta\nFROM Books;", goal: "Measure book price changes across an author's successive publications." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, salary,\n  salary - LAG(salary, 1) OVER (PARTITION BY department ORDER BY hire_date ASC) AS dept_hiring_salary_delta\nFROM Employees;", goal: "Calculate salary difference between consecutive hires in the same department." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  unit_price - LAG(unit_price, 1) OVER (ORDER BY unit_price ASC) AS step_price_diff\nFROM GroceryItems;", goal: "Calculate step-price differences between consecutive sorted inventory items." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date, duration_seconds,\n  duration_seconds - LAG(duration_seconds, 1) OVER (PARTITION BY artist_name ORDER BY release_date ASC) AS song_length_delta\nFROM MusicTracks;", goal: "Calculate track length delta across an artist's sequential singles." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date, monthly_fee,\n  monthly_fee - LAG(monthly_fee, 1) OVER (ORDER BY join_date ASC) AS membership_price_hike\nFROM GymMembers;", goal: "Calculate fee differences between consecutive gym membership signups." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, star_rating,\n  star_rating - LAG(star_rating, 1) OVER (ORDER BY review_date ASC) AS star_delta\nFROM MovieReviews;", goal: "Calculate star rating delta between consecutive movie reviews." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time, ticket_price,\n  ticket_price - LAG(ticket_price, 1) OVER (PARTITION BY origin_airport ORDER BY departure_time ASC) AS fare_change\nFROM FlightSchedule;", goal: "Calculate fare price fluctuations between consecutive airport departures." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, weight_kg,\n  weight_kg - LAG(weight_kg, 1) OVER (PARTITION BY pet_name ORDER BY visit_date ASC) AS patient_weight_change\nFROM PetClinic;", goal: "Calculate weight gain or loss (delta) between consecutive veterinary visits for the same pet." }
    ]
  },
  {
    range: [1351, 1360],
    subcluster: "14.6 Percentage Growth Rates ((val - LAG) / LAG * 100)",
    level: "Level 3 (Percentage Growth)",
    blueprint: "SELECT date_col, metric,\n  ROUND((metric - LAG(metric, 1) OVER (ORDER BY date_col ASC)) / LAG(metric, 1) OVER (ORDER BY date_col ASC) * 100, 2) AS growth_pct\nFROM table_name;",
    rule: "Period-over-Period growth rate formula: ((current - previous) / previous) * 100. Always round to 2 decimal places.",
    trap: "Division by zero if the lagged value is 0. Use NULLIF(LAG(...), 0) in production.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, order_date, total_amount,\n  ROUND((total_amount - LAG(total_amount, 1) OVER (ORDER BY order_date ASC)) / LAG(total_amount, 1) OVER (ORDER BY order_date ASC) * 100, 2) AS order_growth_pct\nFROM Orders;", goal: "Calculate the percentage growth rate between consecutive customer orders." },
      { tbl: "Students", target: "SELECT full_name, enrolled_year, gpa,\n  ROUND((gpa - LAG(gpa, 1) OVER (ORDER BY enrolled_year ASC)) / LAG(gpa, 1) OVER (ORDER BY enrolled_year ASC) * 100, 2) AS gpa_growth_pct\nFROM Students;", goal: "Calculate percentage change in student GPAs along the enrollment timeline." },
      { tbl: "Books", target: "SELECT title, published_date, price,\n  ROUND((price - LAG(price, 1) OVER (PARTITION BY author ORDER BY published_date ASC)) / LAG(price, 1) OVER (PARTITION BY author ORDER BY published_date ASC) * 100, 2) AS author_price_growth_pct\nFROM Books;", goal: "Compute percentage price growth between an author's successive publications." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, salary,\n  ROUND((salary - LAG(salary, 1) OVER (PARTITION BY department ORDER BY hire_date ASC)) / LAG(salary, 1) OVER (PARTITION BY department ORDER BY hire_date ASC) * 100, 2) AS salary_hiring_growth_pct\nFROM Employees;", goal: "Calculate percentage increase in hiring salary within a department." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  ROUND((unit_price - LAG(unit_price, 1) OVER (ORDER BY unit_price ASC)) / LAG(unit_price, 1) OVER (ORDER BY unit_price ASC) * 100, 2) AS price_step_pct\nFROM GroceryItems;", goal: "Calculate percentage step increase between consecutive item prices." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date, duration_seconds,\n  ROUND((duration_seconds - LAG(duration_seconds, 1) OVER (PARTITION BY artist_name ORDER BY release_date ASC)) / LAG(duration_seconds, 1) OVER (PARTITION BY artist_name ORDER BY release_date ASC) * 100, 2) AS track_duration_change_pct\nFROM MusicTracks;", goal: "Compute percentage duration change across an artist's sequential singles." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date, monthly_fee,\n  ROUND((monthly_fee - LAG(monthly_fee, 1) OVER (ORDER BY join_date ASC)) / LAG(monthly_fee, 1) OVER (ORDER BY join_date ASC) * 100, 2) AS fee_inflation_pct\nFROM GymMembers;", goal: "Measure percentage fee inflation between consecutive gym signups." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, star_rating,\n  ROUND((star_rating - LAG(star_rating, 1) OVER (ORDER BY review_date ASC)) / LAG(star_rating, 1) OVER (ORDER BY review_date ASC) * 100, 2) AS rating_delta_pct\nFROM MovieReviews;", goal: "Calculate percentage rating fluctuation between consecutive reviews." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time, ticket_price,\n  ROUND((ticket_price - LAG(ticket_price, 1) OVER (PARTITION BY origin_airport ORDER BY departure_time ASC)) / LAG(ticket_price, 1) OVER (PARTITION BY origin_airport ORDER BY departure_time ASC) * 100, 2) AS fare_surge_pct\nFROM FlightSchedule;", goal: "Compute percentage fare surge between consecutive airport departures." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, weight_kg,\n  ROUND((weight_kg - LAG(weight_kg, 1) OVER (PARTITION BY pet_name ORDER BY visit_date ASC)) / LAG(weight_kg, 1) OVER (PARTITION BY pet_name ORDER BY visit_date ASC) * 100, 2) AS weight_gain_pct\nFROM PetClinic;", goal: "Calculate percentage weight change between veterinary checkups for the same pet." }
    ]
  },
  {
    range: [1361, 1370],
    subcluster: "14.7 Multi-Row Lookups (LAG(col, 2) & LAG(col, 7))",
    level: "Level 3 (Multi-Row Offsets)",
    blueprint: "SELECT col1, date_col, metric,\n  LAG(metric, 2) OVER (ORDER BY date_col ASC) AS two_events_prior\nFROM table_name;",
    rule: "The second parameter of LAG specifies the step offset (e.g. LAG(metric, 2) skips 2 rows back, LAG(metric, 7) skips 7 rows back for week-over-week comparisons).",
    trap: "Requesting an offset larger than the table row count returns NULL for all rows.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, order_date, total_amount,\n  LAG(total_amount, 2) OVER (ORDER BY order_date ASC) AS two_orders_prior_amount\nFROM Orders;", goal: "Look up the transaction amount from 2 orders prior using LAG(total_amount, 2)." },
      { tbl: "Students", target: "SELECT full_name, enrolled_year, gpa,\n  LAG(gpa, 2) OVER (ORDER BY enrolled_year ASC) AS two_students_prior_gpa\nFROM Students;", goal: "Retrieve the GPA from 2 students prior in enrollment sequence." },
      { tbl: "Books", target: "SELECT title, published_date, price,\n  LAG(price, 2) OVER (PARTITION BY author ORDER BY published_date ASC) AS two_books_prior_price\nFROM Books;", goal: "Look up the price from 2 publications prior for the same author." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, salary,\n  LAG(salary, 2) OVER (ORDER BY hire_date ASC) AS two_hires_prior_salary\nFROM Employees;", goal: "Inspect the salary of the worker hired 2 spots prior." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  LAG(unit_price, 2) OVER (ORDER BY item_id ASC) AS two_items_prior_price\nFROM GroceryItems;", goal: "Inspect the price from 2 inventory items prior." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date,\n  LAG(release_date, 2) OVER (PARTITION BY artist_name ORDER BY release_date ASC) AS two_singles_prior_date\nFROM MusicTracks;", goal: "Identify the release date from 2 singles prior for the same artist." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date,\n  LAG(join_date, 2) OVER (ORDER BY join_date ASC) AS two_members_prior_join_date\nFROM GymMembers;", goal: "Look up the join date from 2 gym members prior." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, star_rating,\n  LAG(star_rating, 2) OVER (ORDER BY review_date ASC) AS two_reviews_prior_score\nFROM MovieReviews;", goal: "Retrieve the star rating from 2 reviews prior." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time,\n  LAG(departure_time, 2) OVER (PARTITION BY origin_airport ORDER BY departure_time ASC) AS two_flights_prior_departure\nFROM FlightSchedule;", goal: "Look up the departure timestamp from 2 flights prior at the same airport." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, weight_kg,\n  LAG(weight_kg, 2) OVER (PARTITION BY pet_name ORDER BY visit_date ASC) AS two_visits_prior_weight\nFROM PetClinic;", goal: "Compare current patient weight with their weight from 2 visits prior." }
    ]
  },
  {
    range: [1371, 1380],
    subcluster: "14.8 Inactivity & Time Gaps (DATEDIFF(date, LAG(date)))",
    level: "Level 3 (Time Gap Detection)",
    blueprint: "SELECT user_id, event_date,\n  DATEDIFF(event_date, LAG(event_date, 1) OVER (PARTITION BY user_id ORDER BY event_date ASC)) AS days_since_last_event\nFROM table_name;",
    rule: "Combine DATEDIFF with LAG to calculate the exact number of days elapsed between consecutive interactions for each user (crucial for churn & lapse detection).",
    trap: "Passing arguments to DATEDIFF in wrong order; always write DATEDIFF(current_date, LAG(event_date)).",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, customer_name, order_date,\n  DATEDIFF(order_date, LAG(order_date, 1) OVER (PARTITION BY customer_name ORDER BY order_date ASC)) AS days_between_orders\nFROM Orders;", goal: "Calculate the exact number of days elapsed between successive purchases for each customer." },
      { tbl: "Students", target: "SELECT student_id, enrolled_date,\n  DATEDIFF(enrolled_date, LAG(enrolled_date, 1) OVER (ORDER BY enrolled_date ASC)) AS days_between_enrollments\nFROM Students;", goal: "Measure days elapsed between consecutive student enrollment events." },
      { tbl: "Books", target: "SELECT title, author, published_date,\n  DATEDIFF(published_date, LAG(published_date, 1) OVER (PARTITION BY author ORDER BY published_date ASC)) AS days_between_books\nFROM Books;", goal: "Calculate the publishing hiatus in days between an author's consecutive releases." },
      { tbl: "Employees", target: "SELECT first_name, department, hire_date,\n  DATEDIFF(hire_date, LAG(hire_date, 1) OVER (PARTITION BY department ORDER BY hire_date ASC)) AS days_between_dept_hires\nFROM Employees;", goal: "Measure hiring velocity: calculate days elapsed between successive department hires." },
      { tbl: "GroceryItems", target: "SELECT item_name, expiry_date,\n  DATEDIFF(expiry_date, LAG(expiry_date, 1) OVER (PARTITION BY category ORDER BY expiry_date ASC)) AS days_between_expirations\nFROM GroceryItems;", goal: "Calculate gap in days between successive product expiration dates in each category." },
      { tbl: "MusicTracks", target: "SELECT track_title, artist_name, release_date,\n  DATEDIFF(release_date, LAG(release_date, 1) OVER (PARTITION BY artist_name ORDER BY release_date ASC)) AS days_between_releases\nFROM MusicTracks;", goal: "Measure release gap in days between an artist's consecutive track drops." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date,\n  DATEDIFF(join_date, LAG(join_date, 1) OVER (ORDER BY join_date ASC)) AS days_between_member_signups\nFROM GymMembers;", goal: "Measure acquisition pacing: days elapsed between consecutive gym member signups." },
      { tbl: "MovieReviews", target: "SELECT movie_title, reviewer_name, review_date,\n  DATEDIFF(review_date, LAG(review_date, 1) OVER (PARTITION BY reviewer_name ORDER BY review_date ASC)) AS days_between_reviews\nFROM MovieReviews;", goal: "Measure critic turnaround time: days between successive reviews by the same critic." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport, departure_time,\n  DATEDIFF(departure_time, LAG(departure_time, 1) OVER (PARTITION BY origin_airport ORDER BY departure_time ASC)) AS days_between_flights\nFROM FlightSchedule;", goal: "Calculate gap in days between scheduled flights from the same airport." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date,\n  DATEDIFF(visit_date, LAG(visit_date, 1) OVER (PARTITION BY pet_name ORDER BY visit_date ASC)) AS days_between_vet_visits\nFROM PetClinic;", goal: "Calculate the number of days elapsed between consecutive clinic visits for each patient." }
    ]
  },
  {
    range: [1381, 1390],
    subcluster: "14.9 Churn & Status Transition Flagging (CASE with LAG)",
    level: "Level 3 (State Transition Flagging)",
    blueprint: "SELECT user_id, status,\n  CASE WHEN LAG(status, 1) OVER (PARTITION BY user_id ORDER BY date_col) != status THEN 1 ELSE 0 END AS has_status_changed\nFROM table_name;",
    rule: "Embed LAG inside a CASE WHEN expression to detect state changes, plan upgrades, or sudden price spikes between consecutive records.",
    trap: "Comparing against LAG on the first row evaluates to NULL (neither TRUE nor FALSE); handle the initial row explicitly.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, customer_name, total_amount,\n  CASE WHEN total_amount > LAG(total_amount, 1, total_amount) OVER (PARTITION BY customer_name ORDER BY order_date ASC) THEN 'Upsell' ELSE 'Flat/Down' END AS order_trend\nFROM Orders;", goal: "Flag customer order trends: categorize as 'Upsell' if amount increased over their previous purchase." },
      { tbl: "Students", target: "SELECT full_name, enrolled_year, gpa,\n  CASE WHEN gpa > LAG(gpa, 1, gpa) OVER (ORDER BY enrolled_year ASC) THEN 'Improving' ELSE 'Steady/Drop' END AS gpa_direction\nFROM Students;", goal: "Flag GPA trajectory comparing each student to previous enrollment." },
      { tbl: "Books", target: "SELECT title, author, price,\n  CASE WHEN price > LAG(price, 1, price) OVER (PARTITION BY author ORDER BY published_date ASC) THEN 'Price Hike' ELSE 'Same/Lower' END AS price_trend\nFROM Books;", goal: "Flag author price hikes comparing each book to their previous release." },
      { tbl: "Employees", target: "SELECT first_name, department, salary,\n  CASE WHEN salary > LAG(salary, 1, salary) OVER (PARTITION BY department ORDER BY hire_date ASC) THEN 'Higher Than Prev Hire' ELSE 'Lower/Equal' END AS hire_comp_trend\nFROM Employees;", goal: "Flag hiring compensation trends within departments." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  CASE WHEN unit_price > LAG(unit_price, 1, unit_price) OVER (ORDER BY item_id ASC) THEN 'Cost Increase' ELSE 'Stable' END AS cost_flag\nFROM GroceryItems;", goal: "Flag cost increases across sorted grocery catalog items." },
      { tbl: "MusicTracks", target: "SELECT track_title, artist_name, duration_seconds,\n  CASE WHEN duration_seconds > LAG(duration_seconds, 1, duration_seconds) OVER (PARTITION BY artist_name ORDER BY release_date ASC) THEN 'Longer Single' ELSE 'Shorter/Equal' END AS duration_trend\nFROM MusicTracks;", goal: "Flag single duration trends for music artists." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan,\n  CASE WHEN membership_plan != LAG(membership_plan, 1, membership_plan) OVER (PARTITION BY member_name ORDER BY join_date ASC) THEN 'Plan Modified' ELSE 'Unchanged' END AS plan_status_flag\nFROM GymMembers;", goal: "Detect gym membership plan modifications over time." },
      { tbl: "MovieReviews", target: "SELECT movie_title, reviewer_name, star_rating,\n  CASE WHEN star_rating > LAG(star_rating, 1, star_rating) OVER (PARTITION BY reviewer_name ORDER BY review_date ASC) THEN 'More Favorable' ELSE 'Less/Equal' END AS sentiment_shift\nFROM MovieReviews;", goal: "Detect sentiment shifts in critic reviews over time." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, status,\n  CASE WHEN status != LAG(status, 1, status) OVER (PARTITION BY flight_id ORDER BY departure_time ASC) THEN 'Status Update' ELSE 'Static' END AS schedule_change_flag\nFROM FlightSchedule;", goal: "Flag schedule status changes between consecutive updates." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, weight_kg,\n  CASE WHEN weight_kg > LAG(weight_kg, 1, weight_kg) OVER (PARTITION BY pet_name ORDER BY visit_date ASC) THEN 'Weight Gained' ELSE 'Weight Lost/Maintained' END AS health_trend\nFROM PetClinic;", goal: "Flag patient weight gain vs loss between consecutive veterinary visits." }
    ]
  },
  {
    range: [1391, 1400],
    subcluster: "14.10 Offset Analytics Pipelines & Gotchas",
    level: "Level 3 (Offset Analytics Master)",
    blueprint: "WITH StageDeltas AS (\n  SELECT col1, date_col, metric,\n    LAG(metric, 1) OVER (PARTITION BY col1 ORDER BY date_col ASC) AS prev_val\n  FROM table_name\n)\nSELECT col1, date_col, metric, prev_val,\n  metric - prev_val AS net_delta\nFROM StageDeltas\nWHERE prev_val IS NOT NULL\nORDER BY net_delta DESC\nLIMIT 5;",
    rule: "Combine partitioned offsets, delta calculations, and NULL-row filtering in a clean multi-stage reporting query.",
    trap: "Attempting to filter 'WHERE prev_val IS NOT NULL' without a CTE wrapper; window functions cannot be filtered in the query where they are defined.",
    topics: [
      { tbl: "Orders", target: "WITH OrderDeltas AS (\n  SELECT order_id, customer_name, order_date, total_amount,\n    LAG(total_amount, 1) OVER (PARTITION BY customer_name ORDER BY order_date ASC) AS prev_amount\n  FROM Orders\n)\nSELECT order_id, customer_name, total_amount, prev_amount,\n  total_amount - prev_amount AS expansion_revenue\nFROM OrderDeltas\nWHERE prev_amount IS NOT NULL AND total_amount > prev_amount\nORDER BY expansion_revenue DESC\nLIMIT 5;", goal: "Analytics Pipeline: Find top 5 largest expansion upsells where customer order value increased." },
      { tbl: "Students", target: "WITH StudentGPADeltas AS (\n  SELECT full_name, major, enrolled_year, gpa,\n    LAG(gpa, 1) OVER (PARTITION BY major ORDER BY enrolled_year ASC) AS prev_gpa\n  FROM Students\n)\nSELECT full_name, major, gpa, prev_gpa,\n  gpa - prev_gpa AS gpa_delta\nFROM StudentGPADeltas\nWHERE prev_gpa IS NOT NULL\nORDER BY gpa_delta DESC\nLIMIT 5;", goal: "Analytics Pipeline: Find top 5 positive GPA leaps within academic majors." },
      { tbl: "Books", target: "WITH BookPriceDeltas AS (\n  SELECT title, author, price,\n    LAG(price, 1) OVER (PARTITION BY author ORDER BY published_date ASC) AS prev_price\n  FROM Books\n)\nSELECT title, author, price, prev_price,\n  price - prev_price AS price_increase\nFROM BookPriceDeltas\nWHERE prev_price IS NOT NULL\nORDER BY price_increase DESC\nLIMIT 5;", goal: "Analytics Pipeline: Top 5 biggest book price jumps across author publications." },
      { tbl: "Employees", target: "WITH SalarySteps AS (\n  SELECT first_name, department, salary,\n    LAG(salary, 1) OVER (PARTITION BY department ORDER BY hire_date ASC) AS prev_salary\n  FROM Employees\n)\nSELECT first_name, department, salary, prev_salary,\n  salary - prev_salary AS compensation_jump\nFROM SalarySteps\nWHERE prev_salary IS NOT NULL\nORDER BY compensation_jump DESC\nLIMIT 5;", goal: "Analytics Pipeline: Top 5 departmental salary jumps between successive hires." },
      { tbl: "GroceryItems", target: "WITH CategoryPriceDeltas AS (\n  SELECT item_name, category, unit_price,\n    LAG(unit_price, 1) OVER (PARTITION BY category ORDER BY unit_price ASC) AS prev_price\n  FROM GroceryItems\n)\nSELECT item_name, category, unit_price, prev_price,\n  unit_price - prev_price AS price_gap\nFROM CategoryPriceDeltas\nWHERE prev_price IS NOT NULL\nORDER BY price_gap DESC\nLIMIT 5;", goal: "Analytics Pipeline: Top 5 largest price tier gaps within grocery categories." },
      { tbl: "MusicTracks", target: "WITH TrackLengthDeltas AS (\n  SELECT track_title, artist_name, duration_seconds,\n    LAG(duration_seconds, 1) OVER (PARTITION BY artist_name ORDER BY release_date ASC) AS prev_duration\n  FROM MusicTracks\n)\nSELECT track_title, artist_name, duration_seconds, prev_duration,\n  duration_seconds - prev_duration AS runtime_jump\nFROM TrackLengthDeltas\nWHERE prev_duration IS NOT NULL\nORDER BY runtime_jump DESC\nLIMIT 5;", goal: "Analytics Pipeline: Top 5 largest song runtime expansions by an artist." },
      { tbl: "GymMembers", target: "WITH MembershipFeeDeltas AS (\n  SELECT member_name, membership_plan, monthly_fee,\n    LAG(monthly_fee, 1) OVER (PARTITION BY membership_plan ORDER BY join_date ASC) AS prev_fee\n  FROM GymMembers\n)\nSELECT member_name, membership_plan, monthly_fee, prev_fee,\n  monthly_fee - prev_fee AS fee_difference\nFROM MembershipFeeDeltas\nWHERE prev_fee IS NOT NULL\nORDER BY fee_difference DESC\nLIMIT 5;", goal: "Analytics Pipeline: Track top 5 gym plan fee increases over time." },
      { tbl: "MovieReviews", target: "WITH ReviewDeltas AS (\n  SELECT movie_title, reviewer_name, star_rating,\n    LAG(star_rating, 1) OVER (PARTITION BY reviewer_name ORDER BY review_date ASC) AS prev_rating\n  FROM MovieReviews\n)\nSELECT movie_title, reviewer_name, star_rating, prev_rating,\n  star_rating - prev_rating AS rating_swing\nFROM ReviewDeltas\nWHERE prev_rating IS NOT NULL\nORDER BY rating_swing DESC\nLIMIT 5;", goal: "Analytics Pipeline: Top 5 largest positive critical rating swings by individual critics." },
      { tbl: "FlightSchedule", target: "WITH FlightFareDeltas AS (\n  SELECT flight_id, origin_airport, ticket_price,\n    LAG(ticket_price, 1) OVER (PARTITION BY origin_airport ORDER BY departure_time ASC) AS prev_fare\n  FROM FlightSchedule\n)\nSELECT flight_id, origin_airport, ticket_price, prev_fare,\n  ticket_price - prev_fare AS fare_increase\nFROM FlightFareDeltas\nWHERE prev_fare IS NOT NULL\nORDER BY fare_increase DESC\nLIMIT 5;", goal: "Analytics Pipeline: Top 5 largest flight fare increases departing from same hub." },
      { tbl: "PetClinic", target: "WITH PatientWeightDeltas AS (\n  SELECT pet_name, visit_date, weight_kg,\n    LAG(weight_kg, 1) OVER (PARTITION BY pet_name ORDER BY visit_date ASC) AS prev_weight\n  FROM PetClinic\n)\nSELECT pet_name, visit_date, weight_kg, prev_weight,\n  weight_kg - prev_weight AS weight_gain\nFROM PatientWeightDeltas\nWHERE prev_weight IS NOT NULL\nORDER BY weight_gain DESC\nLIMIT 5;", goal: "Analytics Pipeline: Identify top 5 patient weight gains across consecutive clinic visits." }
    ]
  }
];

// =============================================================================
// TOPIC 15: RUNNING BALANCES & SLIDING FRAME PHYSICS (Drills #1401 to #1500)
// =============================================================================
const clustersT15 = [
  {
    range: [1401, 1410],
    subcluster: "15.1 Global Running Total (SUM() OVER (ORDER BY col))",
    level: "Level 2 (Global Running Total)",
    blueprint: "SELECT col1, date_col, metric,\n  SUM(metric) OVER (ORDER BY date_col ASC) AS running_total\nFROM table_name;",
    rule: "When ORDER BY is present in an OVER clause, the default frame is 'RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW', producing an accumulative running sum.",
    trap: "Omitting ORDER BY turns the window into the entire table, giving the grand total on every row rather than a running sum.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, order_date, total_amount,\n  SUM(total_amount) OVER (ORDER BY order_date ASC) AS cumulative_sales\nFROM Orders;", goal: "Calculate the cumulative running revenue from the first order to the latest." },
      { tbl: "Students", target: "SELECT student_id, enrolled_year,\n  COUNT(*) OVER (ORDER BY enrolled_year ASC) AS cumulative_enrollment_count\nFROM Students;", goal: "Calculate the running cumulative count of enrolled students over time." },
      { tbl: "Books", target: "SELECT book_id, published_date, price,\n  SUM(price) OVER (ORDER BY published_date ASC) AS cumulative_catalog_value\nFROM Books;", goal: "Compute the cumulative dollar value of catalog books as they were published." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, salary,\n  SUM(salary) OVER (ORDER BY hire_date ASC) AS cumulative_payroll_liability\nFROM Employees;", goal: "Calculate cumulative payroll expansion as employees were hired chronologically." },
      { tbl: "GroceryItems", target: "SELECT item_name, stock_qty,\n  SUM(stock_qty) OVER (ORDER BY item_id ASC) AS running_inventory_units\nFROM GroceryItems;", goal: "Compute a running total of warehouse inventory units across item IDs." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date, duration_seconds,\n  SUM(duration_seconds) OVER (ORDER BY release_date ASC) AS cumulative_catalog_seconds\nFROM MusicTracks;", goal: "Calculate the cumulative runtime seconds of the music catalog over time." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date, monthly_fee,\n  SUM(monthly_fee) OVER (ORDER BY join_date ASC) AS cumulative_mrr\nFROM GymMembers;", goal: "Compute running monthly recurring revenue (MRR) as new gym members joined." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date,\n  COUNT(*) OVER (ORDER BY review_date ASC) AS cumulative_review_volume\nFROM MovieReviews;", goal: "Calculate cumulative review volume published over time." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time, distance_miles,\n  SUM(distance_miles) OVER (ORDER BY departure_time ASC) AS cumulative_network_miles\nFROM FlightSchedule;", goal: "Calculate cumulative flight miles flown across scheduled departures." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date,\n  COUNT(*) OVER (ORDER BY visit_date ASC) AS cumulative_patient_visits\nFROM PetClinic;", goal: "Track cumulative veterinary clinic patient visits chronologically." }
    ]
  },
  {
    range: [1411, 1420],
    subcluster: "15.2 Partitioned Cumulative Ledger (Running Balance per Entity)",
    level: "Level 3 (Partitioned Running Ledger)",
    blueprint: "SELECT entity_id, date_col, amount,\n  SUM(amount) OVER (PARTITION BY entity_id ORDER BY date_col ASC) AS running_balance\nFROM table_name;",
    rule: "Combining SUM() with PARTITION BY and ORDER BY computes the ledger balance per customer or account, restarting from 0 for each new entity.",
    trap: "The core financial ledger pattern. Never forget both PARTITION BY (who) AND ORDER BY (when).",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, customer_name, order_date, total_amount,\n  SUM(total_amount) OVER (PARTITION BY customer_name ORDER BY order_date ASC) AS customer_cumulative_spend\nFROM Orders;", goal: "Compute running cumulative spend per customer across their order history." },
      { tbl: "Students", target: "SELECT full_name, major, enrolled_year,\n  COUNT(*) OVER (PARTITION BY major ORDER BY enrolled_year ASC) AS major_cumulative_headcount\nFROM Students;", goal: "Track running cumulative student enrollment headcount within each major." },
      { tbl: "Books", target: "SELECT title, author, published_date, price,\n  SUM(price) OVER (PARTITION BY author ORDER BY published_date ASC) AS author_running_catalog_val\nFROM Books;", goal: "Calculate running cumulative catalog value per author over time." },
      { tbl: "Employees", target: "SELECT first_name, department, hire_date, salary,\n  SUM(salary) OVER (PARTITION BY department ORDER BY hire_date ASC) AS dept_running_payroll\nFROM Employees;", goal: "Calculate running payroll accumulation within each corporate department." },
      { tbl: "GroceryItems", target: "SELECT item_name, category, stock_qty,\n  SUM(stock_qty) OVER (PARTITION BY category ORDER BY item_id ASC) AS category_running_stock\nFROM GroceryItems;", goal: "Track running inventory stock within each grocery category." },
      { tbl: "MusicTracks", target: "SELECT track_title, artist_name, duration_seconds,\n  SUM(duration_seconds) OVER (PARTITION BY artist_name ORDER BY release_date ASC) AS artist_running_runtime\nFROM MusicTracks;", goal: "Calculate running discography runtime in seconds for each music artist." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan, join_date, monthly_fee,\n  SUM(monthly_fee) OVER (PARTITION BY membership_plan ORDER BY join_date ASC) AS plan_running_revenue\nFROM GymMembers;", goal: "Calculate running monthly revenue accumulation per membership plan." },
      { tbl: "MovieReviews", target: "SELECT movie_title, reviewer_name, review_date,\n  COUNT(*) OVER (PARTITION BY reviewer_name ORDER BY review_date ASC) AS reviewer_cumulative_count\nFROM MovieReviews;", goal: "Track cumulative review count per critic over time." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport, departure_time, distance_miles,\n  SUM(distance_miles) OVER (PARTITION BY origin_airport ORDER BY departure_time ASC) AS hub_running_miles\nFROM FlightSchedule;", goal: "Calculate cumulative flight miles departed per airport hub." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date,\n  COUNT(*) OVER (PARTITION BY pet_name ORDER BY visit_date ASC) AS pet_cumulative_visits\nFROM PetClinic;", goal: "Track cumulative visit count per individual pet patient over time." }
    ]
  },
  {
    range: [1421, 1430],
    subcluster: "15.3 Running Averages (Expanding Mean)",
    level: "Level 2 (Running Average)",
    blueprint: "SELECT col1, date_col, metric,\n  ROUND(AVG(metric) OVER (ORDER BY date_col ASC), 2) AS running_avg\nFROM table_name;",
    rule: "AVG() with an expanding window calculates the progressive historical average from the first record up to the current row.",
    trap: "Always round running averages to 2 decimal places to avoid floating-point noise.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, order_date, total_amount,\n  ROUND(AVG(total_amount) OVER (ORDER BY order_date ASC), 2) AS running_avg_order_value\nFROM Orders;", goal: "Calculate the progressive running average order value (AOV) over time." },
      { tbl: "Students", target: "SELECT full_name, enrolled_year, gpa,\n  ROUND(AVG(gpa) OVER (ORDER BY enrolled_year ASC), 2) AS progressive_campus_gpa\nFROM Students;", goal: "Track progressive cumulative GPA average across enrollment years." },
      { tbl: "Books", target: "SELECT title, published_date, price,\n  ROUND(AVG(price) OVER (ORDER BY published_date ASC), 2) AS running_avg_book_price\nFROM Books;", goal: "Calculate the progressive running average price of published books." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, salary,\n  ROUND(AVG(salary) OVER (ORDER BY hire_date ASC), 2) AS progressive_avg_hiring_sal\nFROM Employees;", goal: "Track progressive average salary of hired employees over time." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  ROUND(AVG(unit_price) OVER (ORDER BY item_id ASC), 2) AS running_avg_item_price\nFROM GroceryItems;", goal: "Compute the progressive running average unit price of grocery inventory." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date, duration_seconds,\n  ROUND(AVG(duration_seconds) OVER (ORDER BY release_date ASC), 2) AS running_avg_song_length\nFROM MusicTracks;", goal: "Track progressive running average track length in seconds." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date, monthly_fee,\n  ROUND(AVG(monthly_fee) OVER (ORDER BY join_date ASC), 2) AS running_avg_dues\nFROM GymMembers;", goal: "Calculate running average membership dues as new members join." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, star_rating,\n  ROUND(AVG(star_rating) OVER (ORDER BY review_date ASC), 2) AS running_avg_stars\nFROM MovieReviews;", goal: "Track progressive running average star rating over time." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time, distance_miles,\n  ROUND(AVG(distance_miles) OVER (ORDER BY departure_time ASC), 2) AS running_avg_flight_dist\nFROM FlightSchedule;", goal: "Calculate progressive average route distance flown over scheduled departures." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, weight_kg,\n  ROUND(AVG(weight_kg) OVER (ORDER BY visit_date ASC), 2) AS running_avg_patient_weight\nFROM PetClinic;", goal: "Compute progressive running average weight of clinic animal patients." }
    ]
  },
  {
    range: [1431, 1440],
    subcluster: "15.4 Running Counts & Cumulative Event Frequency",
    level: "Level 2 (Running Count)",
    blueprint: "SELECT col1, date_col,\n  COUNT(*) OVER (ORDER BY date_col ASC) AS running_event_count\nFROM table_name;",
    rule: "COUNT(*) with an ORDER BY clause numbers events cumulatively as they happen in sequence.",
    trap: "COUNT(col) skips NULLs, whereas COUNT(*) counts every physical row.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, customer_name, order_date,\n  COUNT(*) OVER (PARTITION BY customer_name ORDER BY order_date ASC) AS customer_order_sequence_number\nFROM Orders;", goal: "Number each customer's successive orders sequentially (1st purchase, 2nd, 3rd...)." },
      { tbl: "Students", target: "SELECT full_name, major, enrolled_year,\n  COUNT(*) OVER (PARTITION BY major ORDER BY enrolled_year ASC) AS major_seniority_number\nFROM Students;", goal: "Assign cumulative student seniority numbers within each academic major." },
      { tbl: "Books", target: "SELECT title, author, published_date,\n  COUNT(*) OVER (PARTITION BY author ORDER BY published_date ASC) AS author_book_number\nFROM Books;", goal: "Number each author's books in order of publication (Book #1, #2, #3...)." },
      { tbl: "Employees", target: "SELECT first_name, department, hire_date,\n  COUNT(*) OVER (PARTITION BY department ORDER BY hire_date ASC) AS dept_staff_badge_number\nFROM Employees;", goal: "Assign sequential badge numbers to departmental staff based on hire order." },
      { tbl: "GroceryItems", target: "SELECT item_name, category,\n  COUNT(*) OVER (PARTITION BY category ORDER BY item_id ASC) AS category_item_index\nFROM GroceryItems;", goal: "Index grocery items sequentially within their respective categories." },
      { tbl: "MusicTracks", target: "SELECT track_title, artist_name, release_date,\n  COUNT(*) OVER (PARTITION BY artist_name ORDER BY release_date ASC) AS artist_discography_track_num\nFROM MusicTracks;", goal: "Number songs chronologically across an artist's discography." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan, join_date,\n  COUNT(*) OVER (PARTITION BY membership_plan ORDER BY join_date ASC) AS plan_enrollment_index\nFROM GymMembers;", goal: "Index members chronologically within their membership plan." },
      { tbl: "MovieReviews", target: "SELECT movie_title, reviewer_name, review_date,\n  COUNT(*) OVER (PARTITION BY reviewer_name ORDER BY review_date ASC) AS critic_review_career_index\nFROM MovieReviews;", goal: "Number each critic's career reviews in chronological order." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport, departure_time,\n  COUNT(*) OVER (PARTITION BY origin_airport ORDER BY departure_time ASC) AS daily_hub_departure_slot\nFROM FlightSchedule;", goal: "Number departure slots sequentially for flights leaving each airport hub." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date,\n  COUNT(*) OVER (PARTITION BY pet_name ORDER BY visit_date ASC) AS pet_lifetime_visit_number\nFROM PetClinic;", goal: "Number lifetime clinic checkups for each animal patient (Visit #1, #2...)." }
    ]
  },
  {
    range: [1441, 1450],
    subcluster: "15.5 Sliding Moving Averages (ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)",
    level: "Level 3 (3-Point Moving Average)",
    blueprint: "SELECT col1, date_col, metric,\n  ROUND(AVG(metric) OVER (ORDER BY date_col ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS mavg_3_point\nFROM table_name;",
    rule: "'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW' restricts the aggregation window to exactly 3 rows (the current row plus the 2 rows immediately prior).",
    trap: "Using RANGE instead of ROWS: RANGE groups duplicate order values into one frame; ROWS counts physical rows.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, order_date, total_amount,\n  ROUND(AVG(total_amount) OVER (ORDER BY order_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS mavg_3_orders\nFROM Orders;", goal: "Compute a 3-order rolling moving average to smooth short-term sales volatility." },
      { tbl: "Students", target: "SELECT full_name, enrolled_year, gpa,\n  ROUND(AVG(gpa) OVER (ORDER BY enrolled_year ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS mavg_3_student_gpa\nFROM Students;", goal: "Calculate a 3-student moving average GPA along the enrollment timeline." },
      { tbl: "Books", target: "SELECT title, published_date, price,\n  ROUND(AVG(price) OVER (ORDER BY published_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS mavg_3_book_price\nFROM Books;", goal: "Compute a 3-book rolling moving average of publication prices." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, salary,\n  ROUND(AVG(salary) OVER (ORDER BY hire_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS mavg_3_hire_salary\nFROM Employees;", goal: "Calculate a 3-hire rolling average salary to track recent compensation trends." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  ROUND(AVG(unit_price) OVER (ORDER BY item_id ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS mavg_3_item_price\nFROM GroceryItems;", goal: "Calculate a 3-item moving average unit price across grocery inventory." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date, duration_seconds,\n  ROUND(AVG(duration_seconds) OVER (ORDER BY release_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS mavg_3_song_duration\nFROM MusicTracks;", goal: "Compute a 3-track rolling moving average of song duration." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date, monthly_fee,\n  ROUND(AVG(monthly_fee) OVER (ORDER BY join_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS mavg_3_signup_fees\nFROM GymMembers;", goal: "Calculate a 3-signup moving average of gym membership dues." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, star_rating,\n  ROUND(AVG(star_rating) OVER (ORDER BY review_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS mavg_3_star_ratings\nFROM MovieReviews;", goal: "Calculate a 3-review moving average of critic star ratings." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time, ticket_price,\n  ROUND(AVG(ticket_price) OVER (ORDER BY departure_time ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS mavg_3_flight_fares\nFROM FlightSchedule;", goal: "Compute a 3-flight rolling moving average of ticket fares." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, weight_kg,\n  ROUND(AVG(weight_kg) OVER (PARTITION BY pet_name ORDER BY visit_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS mavg_3_patient_weight\nFROM PetClinic;", goal: "Compute a 3-visit rolling moving average weight for each veterinary patient." }
    ]
  },
  {
    range: [1451, 1460],
    subcluster: "15.6 Centered Moving Averages (ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)",
    level: "Level 3 (Centered Moving Average)",
    blueprint: "SELECT col1, date_col, metric,\n  ROUND(AVG(metric) OVER (ORDER BY date_col ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_avg\nFROM table_name;",
    rule: "'ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING' looks 1 row behind AND 1 row ahead, producing a symmetrical, centered moving average.",
    trap: "Centered moving averages cannot be computed in real-time streaming because future rows haven't arrived yet; they are strictly historical analytics tools.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, order_date, total_amount,\n  ROUND(AVG(total_amount) OVER (ORDER BY order_date ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_3_order_avg\nFROM Orders;", goal: "Calculate a centered 3-order moving average of transaction values." },
      { tbl: "Students", target: "SELECT full_name, enrolled_year, gpa,\n  ROUND(AVG(gpa) OVER (ORDER BY enrolled_year ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_gpa_avg\nFROM Students;", goal: "Compute a centered 3-student moving average GPA." },
      { tbl: "Books", target: "SELECT title, published_date, price,\n  ROUND(AVG(price) OVER (ORDER BY published_date ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_price_avg\nFROM Books;", goal: "Calculate a centered moving average price across published books." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, salary,\n  ROUND(AVG(salary) OVER (ORDER BY hire_date ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_salary_avg\nFROM Employees;", goal: "Compute a centered 3-hire moving average salary." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  ROUND(AVG(unit_price) OVER (ORDER BY item_id ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_item_price_avg\nFROM GroceryItems;", goal: "Compute a centered moving average of unit prices across inventory." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date, duration_seconds,\n  ROUND(AVG(duration_seconds) OVER (ORDER BY release_date ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_track_len_avg\nFROM MusicTracks;", goal: "Compute a centered moving average of music track durations." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date, monthly_fee,\n  ROUND(AVG(monthly_fee) OVER (ORDER BY join_date ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_dues_avg\nFROM GymMembers;", goal: "Calculate a centered moving average of gym membership fees." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, star_rating,\n  ROUND(AVG(star_rating) OVER (ORDER BY review_date ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_star_avg\nFROM MovieReviews;", goal: "Compute a centered moving average of movie star ratings." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time, ticket_price,\n  ROUND(AVG(ticket_price) OVER (ORDER BY departure_time ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_fare_avg\nFROM FlightSchedule;", goal: "Calculate a centered moving average of flight ticket fares." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, weight_kg,\n  ROUND(AVG(weight_kg) OVER (PARTITION BY pet_name ORDER BY visit_date ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING), 2) AS centered_weight_avg\nFROM PetClinic;", goal: "Calculate a centered moving average weight across veterinary visits for each pet." }
    ]
  },
  {
    range: [1461, 1470],
    subcluster: "15.7 Unbounded Total as Denominator (Percentage of Total)",
    level: "Level 2 (Ratio of Total)",
    blueprint: "SELECT col1, metric,\n  ROUND(metric / SUM(metric) OVER () * 100, 2) AS pct_of_global_total\nFROM table_name;",
    rule: "'SUM(col) OVER ()' without PARTITION BY or ORDER BY returns the grand total of the entire table on every single row, enabling instant ratio-to-total math.",
    trap: "If you add ORDER BY inside OVER(), it turns into a running sum instead of the grand total!",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, total_amount,\n  ROUND(total_amount / SUM(total_amount) OVER () * 100, 2) AS pct_of_total_revenue\nFROM Orders;", goal: "Calculate each order's percentage contribution to the company's total revenue." },
      { tbl: "Books", target: "SELECT title, price,\n  ROUND(price / SUM(price) OVER () * 100, 2) AS pct_of_catalog_value\nFROM Books;", goal: "Calculate what percentage of total catalog inventory value each book represents." },
      { tbl: "Employees", target: "SELECT first_name, salary,\n  ROUND(salary / SUM(salary) OVER () * 100, 2) AS pct_of_total_payroll\nFROM Employees;", goal: "Calculate each employee's salary as a percentage of total corporate payroll." },
      { tbl: "GroceryItems", target: "SELECT item_name, stock_qty,\n  ROUND(stock_qty / SUM(stock_qty) OVER () * 100, 2) AS pct_of_total_stock\nFROM GroceryItems;", goal: "Calculate each item's share of total warehouse inventory stock units." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds,\n  ROUND(duration_seconds / SUM(duration_seconds) OVER () * 100, 2) AS pct_of_total_library_runtime\nFROM MusicTracks;", goal: "Calculate each track's percentage share of the total library audio runtime." },
      { tbl: "GymMembers", target: "SELECT member_name, monthly_fee,\n  ROUND(monthly_fee / SUM(monthly_fee) OVER () * 100, 2) AS pct_of_total_mrr\nFROM GymMembers;", goal: "Calculate each member's percentage contribution to monthly recurring revenue." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  ROUND(star_rating / SUM(star_rating) OVER () * 100, 2) AS pct_of_total_stars\nFROM MovieReviews;", goal: "Calculate each film review's percentage share of all stars awarded." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, distance_miles,\n  ROUND(distance_miles / SUM(distance_miles) OVER () * 100, 2) AS pct_of_total_network_distance\nFROM FlightSchedule;", goal: "Calculate each flight's percentage share of total airline network miles." },
      { tbl: "Students", target: "SELECT full_name, gpa,\n  ROUND(gpa / SUM(gpa) OVER () * 100, 2) AS pct_of_total_gpa_points\nFROM Students;", goal: "Calculate each student's share of total cumulative academic GPA points." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg,\n  ROUND(weight_kg / SUM(weight_kg) OVER () * 100, 2) AS pct_of_total_biomass\nFROM PetClinic;", goal: "Calculate each patient's percentage share of total clinic animal patient weight." }
    ]
  },
  {
    range: [1471, 1480],
    subcluster: "15.8 Category Ratio Denominator (Percentage of Category Total)",
    level: "Level 2 (Ratio of Partition)",
    blueprint: "SELECT col1, category, metric,\n  ROUND(metric / SUM(metric) OVER (PARTITION BY category) * 100, 2) AS pct_of_category_total\nFROM table_name;",
    rule: "'SUM(col) OVER (PARTITION BY category)' calculates the group total on every row, enabling percentage-of-department or percentage-of-category calculations.",
    trap: "Including an ORDER BY inside OVER turns the denominator into a running sum! Keep OVER(PARTITION BY ...) without ORDER BY for totals.",
    topics: [
      { tbl: "Employees", target: "SELECT first_name, department, salary,\n  ROUND(salary / SUM(salary) OVER (PARTITION BY department) * 100, 2) AS pct_of_dept_payroll\nFROM Employees;", goal: "Calculate each employee's salary as a percentage of their department's total payroll." },
      { tbl: "Books", target: "SELECT title, genre, price,\n  ROUND(price / SUM(price) OVER (PARTITION BY genre) * 100, 2) AS pct_of_genre_value\nFROM Books;", goal: "Calculate what percentage of a genre's total catalog value each book represents." },
      { tbl: "GroceryItems", target: "SELECT item_name, category, stock_qty,\n  ROUND(stock_qty / SUM(stock_qty) OVER (PARTITION BY category) * 100, 2) AS pct_of_category_inventory\nFROM GroceryItems;", goal: "Calculate each product's share of inventory units within its grocery category." },
      { tbl: "Orders", target: "SELECT order_id, shipping_city, total_amount,\n  ROUND(total_amount / SUM(total_amount) OVER (PARTITION BY shipping_city) * 100, 2) AS pct_of_city_sales\nFROM Orders;", goal: "Calculate each order's percentage contribution to its destination city's revenue." },
      { tbl: "MusicTracks", target: "SELECT track_title, genre, duration_seconds,\n  ROUND(duration_seconds / SUM(duration_seconds) OVER (PARTITION BY genre) * 100, 2) AS pct_of_genre_duration\nFROM MusicTracks;", goal: "Calculate each track's percentage share of its genre's total duration." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan, monthly_fee,\n  ROUND(monthly_fee / SUM(monthly_fee) OVER (PARTITION BY membership_plan) * 100, 2) AS pct_of_plan_revenue\nFROM GymMembers;", goal: "Calculate member contribution as a percentage of their plan tier's revenue." },
      { tbl: "MovieReviews", target: "SELECT movie_title, genre, star_rating,\n  ROUND(star_rating / SUM(star_rating) OVER (PARTITION BY genre) * 100, 2) AS pct_of_genre_stars\nFROM MovieReviews;", goal: "Calculate review share of total stars awarded in that genre." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport, distance_miles,\n  ROUND(distance_miles / SUM(distance_miles) OVER (PARTITION BY origin_airport) * 100, 2) AS pct_of_hub_miles\nFROM FlightSchedule;", goal: "Calculate flight share of total miles departing from that airport hub." },
      { tbl: "Students", target: "SELECT full_name, major, gpa,\n  ROUND(gpa / SUM(gpa) OVER (PARTITION BY major) * 100, 2) AS pct_of_major_gpa\nFROM Students;", goal: "Calculate student share of total GPA points within their academic major." },
      { tbl: "PetClinic", target: "SELECT pet_name, species, weight_kg,\n  ROUND(weight_kg / SUM(weight_kg) OVER (PARTITION BY species) * 100, 2) AS pct_of_species_weight\nFROM PetClinic;", goal: "Calculate patient weight as a percentage of that species' total clinic weight." }
    ]
  },
  {
    range: [1481, 1490],
    subcluster: "15.9 Boundary Extremes (FIRST_VALUE & LAST_VALUE)",
    level: "Level 3 (Boundary Framing)",
    blueprint: "SELECT col1, date_col, metric,\n  FIRST_VALUE(metric) OVER (ORDER BY date_col ASC) AS initial_baseline,\n  LAST_VALUE(metric) OVER (ORDER BY date_col ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS final_closing_val\nFROM table_name;",
    rule: "FIRST_VALUE() pulls the opening value. LAST_VALUE() requires 'ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING' to reach the true end of the window.",
    trap: "THE LAST_VALUE TRAP: Without explicit UNBOUNDED FOLLOWING framing, LAST_VALUE() stops at the CURRENT ROW, effectively returning the current row's own value!",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, order_date, total_amount,\n  FIRST_VALUE(total_amount) OVER (ORDER BY order_date ASC) AS inaugural_order_val,\n  LAST_VALUE(total_amount) OVER (ORDER BY order_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS latest_order_val\nFROM Orders;", goal: "Project opening order value alongside final closing order value using boundary window functions." },
      { tbl: "Students", target: "SELECT full_name, enrolled_year, gpa,\n  FIRST_VALUE(gpa) OVER (ORDER BY enrolled_year ASC) AS founding_class_gpa\nFROM Students;", goal: "Compare student GPAs against the founding class baseline using FIRST_VALUE." },
      { tbl: "Books", target: "SELECT title, author, published_date, price,\n  FIRST_VALUE(price) OVER (PARTITION BY author ORDER BY published_date ASC) AS author_debut_price\nFROM Books;", goal: "Compare book prices against the author's debut book price using FIRST_VALUE." },
      { tbl: "Employees", target: "SELECT first_name, department, hire_date, salary,\n  FIRST_VALUE(salary) OVER (PARTITION BY department ORDER BY hire_date ASC) AS founding_dept_salary\nFROM Employees;", goal: "Compare employee salaries to the department founder's starting salary." },
      { tbl: "GroceryItems", target: "SELECT item_name, category, unit_price,\n  FIRST_VALUE(unit_price) OVER (PARTITION BY category ORDER BY item_id ASC) AS category_baseline_price\nFROM GroceryItems;", goal: "Retrieve the first registered item's price within each category via FIRST_VALUE." },
      { tbl: "MusicTracks", target: "SELECT track_title, artist_name, release_date, duration_seconds,\n  FIRST_VALUE(duration_seconds) OVER (PARTITION BY artist_name ORDER BY release_date ASC) AS debut_single_duration\nFROM MusicTracks;", goal: "Compare track length against an artist's debut single duration." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan, join_date, monthly_fee,\n  FIRST_VALUE(monthly_fee) OVER (PARTITION BY membership_plan ORDER BY join_date ASC) AS initial_plan_rate\nFROM GymMembers;", goal: "Compare membership fees against the initial founding plan rate." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, star_rating,\n  FIRST_VALUE(star_rating) OVER (ORDER BY review_date ASC) AS opening_review_stars\nFROM MovieReviews;", goal: "Compare movie reviews against the opening premiere review score." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport, departure_time, ticket_price,\n  FIRST_VALUE(ticket_price) OVER (PARTITION BY origin_airport ORDER BY departure_time ASC) AS first_flight_fare\nFROM FlightSchedule;", goal: "Compare flight fares against the opening morning flight fare." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, weight_kg,\n  FIRST_VALUE(weight_kg) OVER (PARTITION BY pet_name ORDER BY visit_date ASC) AS initial_baseline_weight\nFROM PetClinic;", goal: "Compare current patient weight against their inaugural checkup weight using FIRST_VALUE." }
    ]
  },
  {
    range: [1491, 1500],
    subcluster: "15.10 Full Production Financial Waterfalls & Peak Highs",
    level: "Level 3 (Financial Waterfall Master)",
    blueprint: "SELECT date_col, balance,\n  MAX(balance) OVER (ORDER BY date_col ASC) AS peak_balance,\n  balance - MAX(balance) OVER (ORDER BY date_col ASC) AS drawdown\nFROM table_name;",
    rule: "Use 'MAX(col) OVER (ORDER BY date)' to track all-time peak portfolio values, then subtract the peak to calculate maximum financial drawdown.",
    trap: "Forgetting ORDER BY inside MAX() turns it into the global maximum rather than the running peak.",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, order_date, total_amount,\n  MAX(total_amount) OVER (ORDER BY order_date ASC) AS peak_order_to_date,\n  total_amount - MAX(total_amount) OVER (ORDER BY order_date ASC) AS delta_from_peak\nFROM Orders;", goal: "Financial waterfall: Track peak order value to date and distance from peak for each order." },
      { tbl: "Students", target: "SELECT full_name, enrolled_year, gpa,\n  MAX(gpa) OVER (ORDER BY enrolled_year ASC) AS running_record_gpa\nFROM Students;", goal: "Track the all-time record student GPA as it was achieved over time." },
      { tbl: "Books", target: "SELECT title, published_date, price,\n  MAX(price) OVER (ORDER BY published_date ASC) AS running_max_catalog_price\nFROM Books;", goal: "Track the highest book price ceiling established in bookstore history." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, salary,\n  MAX(salary) OVER (PARTITION BY department ORDER BY hire_date ASC) AS dept_peak_salary_to_date\nFROM Employees;", goal: "Track the running peak compensation ceiling established within each department." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  MAX(unit_price) OVER (PARTITION BY category ORDER BY item_id ASC) AS running_max_category_price\nFROM GroceryItems;", goal: "Track running maximum item price ceilings within grocery categories." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date, duration_seconds,\n  MAX(duration_seconds) OVER (PARTITION BY artist_name ORDER BY release_date ASC) AS artist_record_length\nFROM MusicTracks;", goal: "Track an artist's personal record for longest song as their career unfolded." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date, monthly_fee,\n  MAX(monthly_fee) OVER (ORDER BY join_date ASC) AS peak_fee_collected\nFROM GymMembers;", goal: "Track running peak membership fee records over gym signups." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, star_rating,\n  MAX(star_rating) OVER (ORDER BY review_date ASC) AS peak_rating_to_date\nFROM MovieReviews;", goal: "Track historical peak movie rating milestones chronologically." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time, distance_miles,\n  MAX(distance_miles) OVER (ORDER BY departure_time ASC) AS peak_flight_distance\nFROM FlightSchedule;", goal: "Track the airline's longest flight record as new routes opened." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, weight_kg,\n  MAX(weight_kg) OVER (PARTITION BY pet_name ORDER BY visit_date ASC) AS patient_peak_lifetime_weight\nFROM PetClinic;", goal: "Track all-time peak lifetime body weight for each veterinary patient." }
    ]
  }
];

function processClusters(clusters, topicNum) {
  const drills = [];
  clusters.forEach(c => {
    c.topics.forEach((t, i) => {
      const drillNum = c.range[0] + i;
      const q = t.target;
      drills.push({
        drillNumber: drillNum,
        subcluster: c.subcluster,
        level: c.level,
        title: `Syntax #${String(drillNum).padStart(4, '0')}: ${t.goal.replace(/\.$/, '')}`,
        table: t.tbl,
        scenario: t.goal,
        businessObjective: t.goal,
        schemaSnippet: `${t.tbl} analytical schema`,
        targetQuery: q,
        syntaxBlueprint: c.blueprint,
        syntaxRule: c.rule,
        syntaxTrap: c.trap,
        eli5Story: `Analytical Window Functions on ${t.tbl}: ${t.goal}`,
        commonMistakes: "Omitting ORDER BY inside OVER() for running totals, confusing PARTITION BY with GROUP BY, or attempting to filter window functions in WHERE without a CTE wrapper.",
        learningOutcomes: `Mastered ${c.subcluster} on ${t.tbl}.`,
        challengeSlots: makeSlots(q)
      });
    });
  });
  console.log(`Topic ${topicNum}: Generated ${drills.length} drills (Drill #${drills[0].drillNumber} to #${drills[drills.length - 1].drillNumber})`);
  return drills;
}

const drillsT13 = processClusters(clustersT13, 13);
const drillsT14 = processClusters(clustersT14, 14);
const drillsT15 = processClusters(clustersT15, 15);

fs.writeFileSync('scratch/syntax_drills_t13.json', JSON.stringify(drillsT13, null, 2));
fs.writeFileSync('scratch/syntax_drills_t14.json', JSON.stringify(drillsT14, null, 2));
fs.writeFileSync('scratch/syntax_drills_t15.json', JSON.stringify(drillsT15, null, 2));

console.log('Successfully generated all 300 Analytical Window Function drills!');
