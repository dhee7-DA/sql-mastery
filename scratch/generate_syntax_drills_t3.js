// Generator for Section 0 - Topic 3: ORDER BY, Determinism & LIMIT/OFFSET (Drills #201 to #300)
// High-variety, zero corporate jargon, friendly everyday schemas.

const fs = require('fs');

const DRILLS_T3 = [];

const tables = ['Students', 'Books', 'Employees', 'GroceryItems', 'Orders', 'MusicTracks', 'GymMembers', 'MovieReviews', 'FlightSchedule', 'PetClinic'];

const clustersT3 = [
  {
    range: [201, 210],
    subcluster: "3.1 Single Column Ascending (ASC)",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", select: "full_name, gpa", order: "gpa ASC", goal: "Sort students by GPA in ascending order (lowest to highest score)." },
      { tbl: "Books", select: "title, price", order: "price ASC", goal: "Display books ordered by price from cheapest to most expensive." },
      { tbl: "Employees", select: "first_name, hire_date", order: "hire_date ASC", goal: "List employees ordered chronologically by hire_date (most senior first)." },
      { tbl: "GroceryItems", select: "item_name, unit_price", order: "unit_price ASC", goal: "Order grocery items by unit price ascending." },
      { tbl: "Orders", select: "order_id, quantity", order: "quantity ASC", goal: "Sort customer orders from smallest to largest quantity." },
      { tbl: "MusicTracks", select: "track_title, duration_seconds", order: "duration_seconds ASC", goal: "Order music tracks from shortest to longest duration." },
      { tbl: "GymMembers", select: "member_name, join_date", order: "join_date ASC", goal: "List gym members by join date from earliest to latest." },
      { tbl: "MovieReviews", select: "movie_title, release_year", order: "release_year ASC", goal: "Order movies chronologically by release year from oldest to newest." },
      { tbl: "FlightSchedule", select: "flight_id, departure_time", order: "departure_time ASC", goal: "Display flights ordered by departure time from earliest morning to latest night." },
      { tbl: "PetClinic", select: "pet_name, age_years", order: "age_years ASC", goal: "Sort veterinary patients by age from youngest to oldest." }
    ]
  },
  {
    range: [211, 220],
    subcluster: "3.2 Single Column Descending (DESC)",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", select: "full_name, gpa", order: "gpa DESC", goal: "Rank students by GPA descending (highest academic score first)." },
      { tbl: "Books", select: "title, price", order: "price DESC", goal: "List books ordered from highest to lowest price." },
      { tbl: "Employees", select: "first_name, salary", order: "salary DESC", goal: "Order employees by annual salary from highest earner to lowest." },
      { tbl: "GroceryItems", select: "item_name, stock_units", order: "stock_units DESC", goal: "View grocery items sorted by stock units from most abundant to least." },
      { tbl: "Orders", select: "order_id, unit_price", order: "unit_price DESC", goal: "Order customer purchases by unit price descending." },
      { tbl: "MusicTracks", select: "track_title, play_count", order: "play_count DESC", goal: "Sort playlist by play count descending to find top hits." },
      { tbl: "GymMembers", select: "member_name, visits_this_month", order: "visits_this_month DESC", goal: "Rank gym members by monthly attendance from highest to lowest." },
      { tbl: "MovieReviews", select: "movie_title, star_rating", order: "star_rating DESC", goal: "Sort movie reviews by star rating descending (best reviewed films first)." },
      { tbl: "FlightSchedule", select: "flight_id, ticket_price", order: "ticket_price DESC", goal: "Order flight schedule by ticket price descending." },
      { tbl: "PetClinic", select: "pet_name, weight_kg", order: "weight_kg DESC", goal: "Sort clinic patients by weight in kilograms descending." }
    ]
  },
  {
    range: [221, 230],
    subcluster: "3.3 Multi-Column Sorting",
    level: "Level 2 (Multi-Key Sorting)",
    topics: [
      { tbl: "Students", select: "city, full_name, gpa", order: "city ASC, gpa DESC", goal: "Sort students first by city alphabetically, and within each city by GPA descending." },
      { tbl: "Books", select: "genre, title, price", order: "genre ASC, price ASC", goal: "Sort books by genre alphabetically, and then by price ascending." },
      { tbl: "Employees", select: "department, salary, first_name", order: "department ASC, salary DESC", goal: "Group output by department alphabetically, then sort by highest salary descending." },
      { tbl: "GroceryItems", select: "category, item_name, unit_price", order: "category ASC, unit_price ASC", goal: "Order grocery items by category alphabetically, then by price cheapest first." },
      { tbl: "Orders", select: "shipping_city, order_status, order_id", order: "shipping_city ASC, order_status ASC", goal: "Sort orders primarily by shipping city, secondarily by order status." },
      { tbl: "MusicTracks", select: "genre, play_count, track_title", order: "genre ASC, play_count DESC", goal: "Sort tracks by genre alphabetically, then by play count descending." },
      { tbl: "GymMembers", select: "membership_plan, visits_this_month, member_name", order: "membership_plan ASC, visits_this_month DESC", goal: "Sort gym members by plan tier, then by monthly visits descending." },
      { tbl: "MovieReviews", select: "genre, star_rating, movie_title", order: "genre ASC, star_rating DESC", goal: "Sort movie reviews by genre, then by star rating highest first." },
      { tbl: "FlightSchedule", select: "origin_airport, departure_time, flight_id", order: "origin_airport ASC, departure_time ASC", goal: "Order flights by origin airport, then chronologically by departure time." },
      { tbl: "PetClinic", select: "species, weight_kg, pet_name", order: "species ASC, weight_kg DESC", goal: "Sort clinic patients by species, then by weight from heaviest to lightest." }
    ]
  },
  {
    range: [231, 240],
    subcluster: "3.4 Deterministic Tie-Breakers",
    level: "Level 2 (Determinism)",
    topics: [
      { tbl: "Students", select: "city, student_id, full_name", order: "city ASC, student_id ASC", goal: "Sort by city with student_id as a deterministic primary key tie-breaker." },
      { tbl: "Books", select: "genre, book_id, title", order: "genre ASC, book_id ASC", goal: "Sort books by genre with book_id tie-breaker to prevent row-hopping." },
      { tbl: "Employees", select: "department, emp_id, first_name", order: "department ASC, emp_id ASC", goal: "Order by department with emp_id tie-breaker." },
      { tbl: "GroceryItems", select: "category, item_id, item_name", order: "category ASC, item_id ASC", goal: "Sort grocery items by category with unique item_id tie-breaker." },
      { tbl: "Orders", select: "order_status, order_id, customer_name", order: "order_status ASC, order_id ASC", goal: "Order by status with order_id tie-breaker." },
      { tbl: "MusicTracks", select: "artist_name, track_id, track_title", order: "artist_name ASC, track_id ASC", goal: "Sort by artist name with track_id tie-breaker." },
      { tbl: "GymMembers", select: "membership_plan, member_id, member_name", order: "membership_plan ASC, member_id ASC", goal: "Sort by membership plan with member_id tie-breaker." },
      { tbl: "MovieReviews", select: "director, review_id, movie_title", order: "director ASC, review_id ASC", goal: "Sort by director with review_id tie-breaker." },
      { tbl: "FlightSchedule", select: "airline, flight_id", order: "airline ASC, flight_id ASC", goal: "Sort by airline with flight_id tie-breaker." },
      { tbl: "PetClinic", select: "owner_city, pet_id, pet_name", order: "owner_city ASC, pet_id ASC", goal: "Sort by owner city with pet_id tie-breaker." }
    ]
  },
  {
    range: [241, 250],
    subcluster: "3.5 Sorting by Aliases & Calculations",
    level: "Level 2 (Aliases & Calculations)",
    topics: [
      { tbl: "Books", select: "title, price, stock_qty, (price * stock_qty) AS inventory_val", order: "inventory_val DESC", goal: "Calculate inventory value and sort by the alias inventory_val descending." },
      { tbl: "Orders", select: "order_id, unit_price, quantity, (unit_price * quantity) AS subtotal", order: "subtotal DESC", goal: "Compute order subtotal and sort by the alias subtotal descending." },
      { tbl: "Employees", select: "first_name, salary, bonus, (salary + COALESCE(bonus, 0)) AS total_comp", order: "total_comp DESC", goal: "Compute total compensation (salary + bonus) and sort by total_comp descending." },
      { tbl: "GroceryItems", select: "item_name, unit_price, (unit_price * 1.08) AS tax_price", order: "tax_price ASC", goal: "Calculate tax_price and sort by the alias tax_price ascending." },
      { tbl: "Students", select: "full_name, gpa, (gpa * 25.0) AS pct_score", order: "pct_score DESC", goal: "Compute pct_score and sort by pct_score descending." },
      { tbl: "MusicTracks", select: "track_title, duration_seconds, (duration_seconds / 60.0) AS mins", order: "mins DESC", goal: "Convert to minutes and sort by the alias mins descending." },
      { tbl: "GymMembers", select: "member_name, monthly_fee, (monthly_fee * 12) AS annual_dues", order: "annual_dues ASC", goal: "Compute annual dues and sort by annual_dues ascending." },
      { tbl: "FlightSchedule", select: "flight_id, ticket_price, (ticket_price + 35.00) AS total_fare", order: "total_fare ASC", goal: "Add baggage fee to ticket price and sort by total_fare ascending." },
      { tbl: "PetClinic", select: "pet_name, weight_kg, (weight_kg * 2.20462) AS lbs", order: "lbs DESC", goal: "Convert weight to lbs and sort by lbs descending." },
      { tbl: "MovieReviews", select: "movie_title, release_year, (2026 - release_year) AS age", order: "age ASC", goal: "Compute movie age and sort by age ascending (newest films first)." }
    ]
  },
  {
    range: [251, 260],
    subcluster: "3.6 Sorting by Functions",
    level: "Level 2 (Functions)",
    topics: [
      { tbl: "Students", select: "full_name", order: "LENGTH(full_name) DESC", goal: "Sort students by the character length of their full name from longest to shortest." },
      { tbl: "Books", select: "title", order: "LENGTH(title) ASC", goal: "Sort book titles by character length from shortest to longest." },
      { tbl: "Employees", select: "first_name, hire_date", order: "YEAR(hire_date) DESC, MONTH(hire_date) DESC", goal: "Order employees by hire year descending, then hire month descending." },
      { tbl: "GroceryItems", select: "item_name, unit_price", order: "ROUND(unit_price) DESC", goal: "Sort grocery items by their rounded whole-dollar unit price descending." },
      { tbl: "Orders", select: "customer_name", order: "LOWER(customer_name) ASC", goal: "Sort customer names in case-insensitive alphabetical order using LOWER()." },
      { tbl: "MusicTracks", select: "track_title", order: "LENGTH(track_title) DESC", goal: "Sort song titles by character count from longest to shortest." },
      { tbl: "GymMembers", select: "member_name, join_date", order: "YEAR(join_date) ASC", goal: "Order gym members chronologically by the year they joined." },
      { tbl: "MovieReviews", select: "movie_title, star_rating", order: "ROUND(star_rating) DESC", goal: "Sort movie reviews by rounded star rating descending." },
      { tbl: "FlightSchedule", select: "flight_id, origin_airport", order: "UPPER(origin_airport) ASC", goal: "Sort origin airport codes alphabetically using UPPER()." },
      { tbl: "PetClinic", select: "pet_name", order: "LENGTH(pet_name) ASC", goal: "Sort pet names by length from shortest to longest." }
    ]
  },
  {
    range: [261, 270],
    subcluster: "3.7 Positional Sorting (ORDER BY 1, 2)",
    level: "Level 2 (Positional)",
    topics: [
      { tbl: "Students", select: "city, full_name", order: "1 ASC, 2 ASC", goal: "Sort by column position: 1st column (city) ASC, 2nd column (full_name) ASC." },
      { tbl: "Books", select: "genre, price", order: "1 ASC, 2 DESC", goal: "Sort by position: 1st column (genre) ASC, 2nd column (price) DESC." },
      { tbl: "Employees", select: "department, salary", order: "1 ASC, 2 DESC", goal: "Sort by position: 1st column (department) ASC, 2nd column (salary) DESC." },
      { tbl: "GroceryItems", select: "category, item_name", order: "1 ASC, 2 ASC", goal: "Sort by position: 1st column (category) ASC, 2nd column (item_name) ASC." },
      { tbl: "Orders", select: "shipping_city, unit_price", order: "1 ASC, 2 DESC", goal: "Sort by position: 1st column (shipping_city) ASC, 2nd column (unit_price) DESC." },
      { tbl: "MusicTracks", select: "genre, play_count", order: "1 ASC, 2 DESC", goal: "Sort by position: 1st column (genre) ASC, 2nd column (play_count) DESC." },
      { tbl: "GymMembers", select: "membership_plan, monthly_fee", order: "1 ASC, 2 ASC", goal: "Sort by position: 1st column (plan) ASC, 2nd column (fee) ASC." },
      { tbl: "MovieReviews", select: "genre, star_rating", order: "1 ASC, 2 DESC", goal: "Sort by position: 1st column (genre) ASC, 2nd column (star_rating) DESC." },
      { tbl: "FlightSchedule", select: "origin_airport, dest_airport", order: "1 ASC, 2 ASC", goal: "Sort by position: 1st column (origin) ASC, 2nd column (dest) ASC." },
      { tbl: "PetClinic", select: "species, weight_kg", order: "1 ASC, 2 DESC", goal: "Sort by position: 1st column (species) ASC, 2nd column (weight) DESC." }
    ]
  },
  {
    range: [271, 280],
    subcluster: "3.8 Truncation & Top-N (LIMIT)",
    level: "Level 2 (Top-N)",
    topics: [
      { tbl: "Students", select: "full_name, gpa", order: "gpa DESC", limit: "1", goal: "Find the single top-scoring student (Valedictorian) using ORDER BY gpa DESC LIMIT 1." },
      { tbl: "Books", select: "title, price", order: "price DESC", limit: "3", goal: "Find the Top 3 most expensive books in the bookstore." },
      { tbl: "Employees", select: "first_name, salary", order: "salary DESC", limit: "5", goal: "Retrieve the Top 5 highest-paid employees in the company." },
      { tbl: "GroceryItems", select: "item_name, unit_price", order: "unit_price ASC", limit: "3", goal: "Find the 3 cheapest grocery items in the store." },
      { tbl: "Orders", select: "order_id, quantity", order: "quantity DESC", limit: "5", goal: "Find the 5 largest customer orders by quantity." },
      { tbl: "MusicTracks", select: "track_title, play_count", order: "play_count DESC", limit: "10", goal: "Fetch the Top 10 most played tracks for the streaming leaderboard." },
      { tbl: "GymMembers", select: "member_name, visits_this_month", order: "visits_this_month DESC", limit: "3", goal: "Identify the Top 3 most active gym members of the month." },
      { tbl: "MovieReviews", select: "movie_title, star_rating", order: "star_rating DESC", limit: "5", goal: "Display the Top 5 highest-rated movies of all time." },
      { tbl: "FlightSchedule", select: "flight_id, delay_minutes", order: "delay_minutes DESC", limit: "3", goal: "Find the 3 flights with the worst arrival delays." },
      { tbl: "PetClinic", select: "pet_name, weight_kg", order: "weight_kg DESC", limit: "1", goal: "Find the single heaviest animal patient registered at the clinic." }
    ]
  },
  {
    range: [281, 290],
    subcluster: "3.9 Pagination Slices (LIMIT & OFFSET)",
    level: "Level 2 (Pagination)",
    topics: [
      { tbl: "Students", select: "student_id, full_name", order: "student_id ASC", limit: "5 OFFSET 0", goal: "Fetch Page 1 of the student directory (5 rows, skip 0)." },
      { tbl: "Students", select: "student_id, full_name", order: "student_id ASC", limit: "5 OFFSET 5", goal: "Fetch Page 2 of the student directory (5 rows, skip 5)." },
      { tbl: "Books", select: "book_id, title", order: "book_id ASC", limit: "5 OFFSET 0", goal: "Fetch Page 1 of the book catalog (5 rows, skip 0)." },
      { tbl: "Books", select: "book_id, title", order: "book_id ASC", limit: "5 OFFSET 5", goal: "Fetch Page 2 of the book catalog (5 rows, skip 5)." },
      { tbl: "Employees", select: "emp_id, first_name", order: "emp_id ASC", limit: "4 OFFSET 4", goal: "Fetch Page 2 of the employee roster (page size 4, offset 4)." },
      { tbl: "GroceryItems", select: "item_id, item_name", order: "item_id ASC", limit: "5 OFFSET 10", goal: "Fetch Page 3 of the grocery items list (page size 5, offset 10)." },
      { tbl: "MusicTracks", select: "track_id, track_title", order: "track_id ASC", limit: "5 OFFSET 5", goal: "Fetch Page 2 of the track list (page size 5, skip 5)." },
      { tbl: "Orders", select: "order_id, customer_name", order: "order_id ASC", limit: "3 OFFSET 6", goal: "Fetch Page 3 of order history (page size 3, skip 6)." },
      { tbl: "GymMembers", select: "member_id, member_name", order: "member_id ASC", limit: "4 OFFSET 0", goal: "Fetch Page 1 of gym memberships (page size 4, skip 0)." },
      { tbl: "PetClinic", select: "pet_id, pet_name", order: "pet_id ASC", limit: "5 OFFSET 5", goal: "Fetch Page 2 of clinic patient records (page size 5, skip 5)." }
    ]
  },
  {
    range: [291, 300],
    subcluster: "3.10 Sorting & Slicing Bug Hunts",
    level: "Level 3 (Bug Hunts)",
    topics: [
      { tbl: "Books", target: "SELECT title, price\nFROM Books\nORDER BY price DESC\nLIMIT 5;", goal: "Fix the clause sequence error: 'LIMIT 5 ORDER BY price DESC;' (ORDER BY must precede LIMIT)." },
      { tbl: "Students", target: "SELECT full_name, gpa\nFROM Students\nORDER BY gpa DESC;", goal: "Fix the misspelled sort order keyword: 'ORDER BY gpa DESENDING;' (must be DESC)." },
      { tbl: "Employees", target: "SELECT first_name, salary\nFROM Employees\nORDER BY salary DESC\nLIMIT 1;", goal: "Fix missing ORDER BY when requesting top record: 'SELECT first_name, salary FROM Employees LIMIT 1;' (produces arbitrary row without ORDER BY)." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY unit_price ASC;", goal: "Fix missing BY keyword: 'ORDER unit_price ASC;' (must be ORDER BY)." },
      { tbl: "Orders", target: "SELECT order_id, quantity * unit_price AS total\nFROM Orders\nORDER BY total DESC;", goal: "Fix syntax error sorting by computed expression: ensure total alias is recognized in ORDER BY." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds\nFROM MusicTracks\nORDER BY duration_seconds ASC\nLIMIT 10 OFFSET 0;", goal: "Fix comma used in OFFSET syntax: 'LIMIT 10, OFFSET 0;' (no comma before OFFSET)." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan, visits_this_month\nFROM GymMembers\nORDER BY membership_plan ASC, visits_this_month DESC;", goal: "Fix missing comma between multiple sort columns: 'ORDER BY membership_plan ASC visits_this_month DESC;'." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY star_rating DESC\nLIMIT 3;", goal: "Fix invalid position number in ORDER BY: 'ORDER BY 0 DESC;' (column positions are 1-indexed)." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time\nFROM FlightSchedule\nORDER BY departure_time ASC;", goal: "Fix semicolon placed before ORDER BY: 'FROM FlightSchedule; ORDER BY departure_time ASC;'." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg\nFROM PetClinic\nORDER BY weight_kg DESC\nLIMIT 5 OFFSET 10;", goal: "Fix reversed LIMIT and OFFSET order: 'OFFSET 10 LIMIT 5;' (LIMIT must precede OFFSET in standard SQL)." }
    ]
  }
];

function makeSlots(query) {
  return query.split(/\s+/).map(tok => {
    let type = "column";
    if (["SELECT", "FROM", "WHERE", "ORDER", "BY", "ASC", "DESC", "LIMIT", "OFFSET"].includes(tok.toUpperCase())) type = "keyword";
    if (tables.some(t => tok.includes(t))) type = "table";
    return { type, value: tok };
  });
}

clustersT3.forEach(c => {
  c.topics.forEach((t, i) => {
    const drillNum = c.range[0] + i;
    let q = t.target;
    if (!q) {
      q = `SELECT ${t.select}\nFROM ${t.tbl}\nORDER BY ${t.order}`;
      if (t.limit) q += `\nLIMIT ${t.limit}`;
      q += ';';
    }
    DRILLS_T3.push({
      drillNumber: drillNum,
      subcluster: c.subcluster,
      level: c.level,
      title: `Syntax #${String(drillNum).padStart(3, '0')}: ${t.goal.replace(/\.$/, '')}`,
      table: t.tbl,
      scenario: t.goal,
      businessObjective: t.goal,
      schemaSnippet: `${t.tbl} schema`,
      targetQuery: q,
      syntaxBlueprint: `SELECT ${t.select || 'col_1, col_2'}\nFROM ${t.tbl}\nORDER BY ${t.order || 'col_1 ASC'}${t.limit ? `\nLIMIT ${t.limit}` : ''};`,
      syntaxRule: "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
      syntaxTrap: "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
      eli5Story: `Sorting and slicing on ${t.tbl}: ${t.goal}`,
      commonMistakes: "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
      learningOutcomes: `Mastered ${c.subcluster} on ${t.tbl}.`,
      challengeSlots: makeSlots(q)
    });
  });
});

console.log('Total Topic 3 drills generated:', DRILLS_T3.length);
fs.writeFileSync('scratch/syntax_drills_t3.json', JSON.stringify(DRILLS_T3, null, 2));
