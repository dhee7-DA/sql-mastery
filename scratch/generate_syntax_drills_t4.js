// Generator for Section 0 - Topic 4: Aggregations & GROUP BY (Drills #301 to #400)
// High-yield active retrieval, zero corporate jargon, friendly everyday schemas.

const fs = require('fs');

const DRILLS_T4 = [];

const tables = ['Students', 'Books', 'Employees', 'GroceryItems', 'Orders', 'MusicTracks', 'GymMembers', 'MovieReviews', 'FlightSchedule', 'PetClinic'];

const clustersT4 = [
  {
    range: [301, 310],
    subcluster: "4.1 Basic COUNT & Non-Null Values",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", select: "COUNT(*) AS total_students", goal: "Count the total number of enrolled students across all majors." },
      { tbl: "Books", select: "COUNT(book_id) AS total_titles", goal: "Count total book titles available in the inventory." },
      { tbl: "Employees", select: "COUNT(*) AS total_staff", goal: "Compute the total headcount of all employees in the directory." },
      { tbl: "GroceryItems", select: "COUNT(item_id) AS total_products", goal: "Calculate the total count of grocery items stocked in the store." },
      { tbl: "Orders", select: "COUNT(*) AS total_placed_orders", goal: "Count the total number of orders placed by customers." },
      { tbl: "MusicTracks", select: "COUNT(track_id) AS track_count", goal: "Count the total number of tracks in the music library." },
      { tbl: "GymMembers", select: "COUNT(*) AS total_memberships", goal: "Count total active and inactive gym member registrations." },
      { tbl: "MovieReviews", select: "COUNT(review_id) AS total_reviews_logged", goal: "Calculate the total number of movie reviews submitted." },
      { tbl: "FlightSchedule", select: "COUNT(*) AS scheduled_flights", goal: "Count the total number of scheduled flights on the board." },
      { tbl: "PetClinic", select: "COUNT(pet_id) AS patient_count", goal: "Count total veterinary patients registered at the clinic." }
    ]
  },
  {
    range: [311, 320],
    subcluster: "4.2 Basic SUM & Total Accumulation",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Employees", select: "SUM(salary) AS total_payroll", goal: "Calculate the total payroll expenditure across all employees." },
      { tbl: "GroceryItems", select: "SUM(stock_units) AS total_inventory_units", goal: "Sum the total number of physical units currently in stock." },
      { tbl: "Orders", select: "SUM(quantity) AS total_items_sold", goal: "Calculate the overall sum of item quantities purchased across all orders." },
      { tbl: "Orders", select: "SUM(quantity * unit_price) AS gross_revenue", goal: "Compute total gross revenue by summing the line item totals (quantity * unit_price)." },
      { tbl: "MusicTracks", select: "SUM(duration_seconds) AS total_audio_seconds", goal: "Calculate the grand total duration of all tracks combined in seconds." },
      { tbl: "GymMembers", select: "SUM(monthly_fee) AS total_monthly_dues", goal: "Sum the total monthly membership fee dues collected by the gym." },
      { tbl: "GymMembers", select: "SUM(visits_this_month) AS aggregate_visits", goal: "Calculate total visits logged across all members this month." },
      { tbl: "FlightSchedule", select: "SUM(seats_available) AS total_empty_seats", goal: "Compute the total number of unbooked seats across all departures." },
      { tbl: "PetClinic", select: "SUM(weight_kg) AS combined_patient_weight", goal: "Sum the total collective weight in kilograms of all clinic patients." },
      { tbl: "Books", select: "SUM(stock_count) AS total_books_in_warehouse", goal: "Sum the total physical copies in warehouse stock across all titles." }
    ]
  },
  {
    range: [321, 330],
    subcluster: "4.3 AVG & Statistical Means",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", select: "ROUND(AVG(gpa), 2) AS average_gpa", goal: "Calculate the average GPA across all students rounded to 2 decimal places." },
      { tbl: "Books", select: "ROUND(AVG(price), 2) AS average_book_price", goal: "Compute the average retail price of books in the catalog." },
      { tbl: "Employees", select: "ROUND(AVG(salary), 2) AS mean_company_salary", goal: "Calculate the overall average employee salary." },
      { tbl: "GroceryItems", select: "ROUND(AVG(unit_price), 2) AS average_item_cost", goal: "Find the average price per unit across all grocery items." },
      { tbl: "Orders", select: "ROUND(AVG(quantity), 1) AS avg_items_per_order", goal: "Calculate the average order quantity per transaction rounded to 1 decimal place." },
      { tbl: "MusicTracks", select: "ROUND(AVG(duration_seconds), 0) AS avg_track_length", goal: "Calculate the mean track length in seconds across the playlist." },
      { tbl: "GymMembers", select: "ROUND(AVG(visits_this_month), 1) AS avg_member_attendance", goal: "Determine the average monthly visit frequency per member." },
      { tbl: "MovieReviews", select: "ROUND(AVG(star_rating), 2) AS platform_avg_rating", goal: "Compute the universal average star rating across all reviews." },
      { tbl: "FlightSchedule", select: "ROUND(AVG(ticket_price), 2) AS average_fare", goal: "Calculate the average ticket price across all scheduled flights." },
      { tbl: "PetClinic", select: "ROUND(AVG(age_years), 1) AS average_patient_age", goal: "Calculate the mean age of clinic patients in years." }
    ]
  },
  {
    range: [331, 340],
    subcluster: "4.4 MIN & MAX Extrema Discovery",
    level: "Level 1 (Extrema)",
    topics: [
      { tbl: "Students", select: "MIN(gpa) AS lowest_gpa, MAX(gpa) AS highest_gpa", goal: "Find both the minimum and maximum GPA in the student body." },
      { tbl: "Books", select: "MIN(price) AS cheapest_book, MAX(price) AS priciest_book", goal: "Discover the lowest and highest book prices in the store." },
      { tbl: "Employees", select: "MIN(salary) AS entry_salary, MAX(salary) AS executive_salary", goal: "Identify the minimum and maximum salaries paid in the company." },
      { tbl: "GroceryItems", select: "MIN(unit_price) AS min_price, MAX(stock_units) AS peak_stock", goal: "Find the lowest grocery unit price and the highest stock count." },
      { tbl: "Orders", select: "MIN(order_date) AS earliest_order, MAX(order_date) AS latest_order", goal: "Identify the earliest and most recent order dates in history." },
      { tbl: "MusicTracks", select: "MIN(play_count) AS least_played, MAX(play_count) AS top_streamed", goal: "Find the lowest and highest play counts across all songs." },
      { tbl: "GymMembers", select: "MIN(join_date) AS oldest_member_date, MAX(join_date) AS newest_join_date", goal: "Find the earliest and latest member join dates." },
      { tbl: "MovieReviews", select: "MIN(star_rating) AS lowest_score, MAX(star_rating) AS highest_score", goal: "Find the lowest and highest star ratings logged by viewers." },
      { tbl: "FlightSchedule", select: "MIN(ticket_price) AS bargain_fare, MAX(ticket_price) AS premium_fare", goal: "Find the cheapest and most expensive flight ticket prices." },
      { tbl: "PetClinic", select: "MIN(weight_kg) AS lightest_pet, MAX(weight_kg) AS heaviest_pet", goal: "Find the minimum and maximum pet weights recorded in kilograms." }
    ]
  },
  {
    range: [341, 350],
    subcluster: "4.5 COUNT(DISTINCT) Cardinality",
    level: "Level 2 (Cardinality)",
    topics: [
      { tbl: "Students", select: "COUNT(DISTINCT city) AS unique_hometowns", goal: "Count the number of distinct cities where students reside." },
      { tbl: "Books", select: "COUNT(DISTINCT author) AS unique_authors", goal: "Count how many unique authors are represented in the catalog." },
      { tbl: "Employees", select: "COUNT(DISTINCT department) AS active_departments", goal: "Count the number of unique departments operating in the firm." },
      { tbl: "GroceryItems", select: "COUNT(DISTINCT category) AS category_count", goal: "Count how many distinct grocery categories exist in inventory." },
      { tbl: "Orders", select: "COUNT(DISTINCT customer_name) AS unique_buyers", goal: "Count the total number of distinct customers who placed orders." },
      { tbl: "MusicTracks", select: "COUNT(DISTINCT genre) AS distinct_genres", goal: "Count the number of unique musical genres in the catalog." },
      { tbl: "GymMembers", select: "COUNT(DISTINCT membership_plan) AS plan_tiers_offered", goal: "Count the number of distinct membership plan tiers available." },
      { tbl: "MovieReviews", select: "COUNT(DISTINCT movie_title) AS unique_movies_reviewed", goal: "Count how many different movies have received at least one review." },
      { tbl: "FlightSchedule", select: "COUNT(DISTINCT origin_airport) AS unique_origins", goal: "Count how many distinct origin airports have outbound departures." },
      { tbl: "PetClinic", select: "COUNT(DISTINCT species) AS species_treated", goal: "Count the number of unique animal species treated at the clinic." }
    ]
  },
  {
    range: [351, 360],
    subcluster: "4.6 Single-Column GROUP BY",
    level: "Level 2 (Grouping)",
    topics: [
      { tbl: "Students", group: "major", select: "major, COUNT(*) AS student_count", goal: "Group students by major and count how many students are enrolled in each." },
      { tbl: "Books", group: "genre", select: "genre, COUNT(*) AS title_count", goal: "Group books by genre and count total titles per category." },
      { tbl: "Employees", group: "department", select: "department, COUNT(*) AS headcount", goal: "Group employees by department and count staff headcount per department." },
      { tbl: "GroceryItems", group: "category", select: "category, COUNT(*) AS product_count", goal: "Group grocery items by category and display count of products per category." },
      { tbl: "Orders", group: "order_status", select: "order_status, COUNT(*) AS order_count", goal: "Group orders by status (Pending, Shipped, Delivered) and count each." },
      { tbl: "MusicTracks", group: "genre", select: "genre, COUNT(*) AS track_count", goal: "Group music tracks by genre and count total songs in each genre." },
      { tbl: "GymMembers", group: "membership_plan", select: "membership_plan, COUNT(*) AS member_count", goal: "Group members by membership plan tier and count subscriptions in each." },
      { tbl: "MovieReviews", group: "genre", select: "genre, COUNT(*) AS review_count", goal: "Group movie reviews by genre and count total reviews per genre." },
      { tbl: "FlightSchedule", group: "origin_airport", select: "origin_airport, COUNT(*) AS departures_count", goal: "Group flights by origin airport and count departures originating from each." },
      { tbl: "PetClinic", group: "species", select: "species, COUNT(*) AS patient_count", goal: "Group veterinary patients by species and count patients per animal type." }
    ]
  },
  {
    range: [361, 370],
    subcluster: "4.7 Multi-Metric GROUP BY Rollups",
    level: "Level 2 (Multi-Metric)",
    topics: [
      { tbl: "Students", group: "major", select: "major, COUNT(*) AS total_students, ROUND(AVG(gpa), 2) AS avg_gpa", goal: "Compute student count and average GPA per major." },
      { tbl: "Books", group: "genre", select: "genre, COUNT(*) AS titles, ROUND(AVG(price), 2) AS avg_price, MAX(price) AS max_price", goal: "Calculate title count, average price, and highest price per genre." },
      { tbl: "Employees", group: "department", select: "department, COUNT(*) AS staff, SUM(salary) AS payroll, ROUND(AVG(salary), 2) AS avg_salary", goal: "Calculate staff count, total payroll, and average salary for each department." },
      { tbl: "GroceryItems", group: "category", select: "category, COUNT(*) AS items, SUM(stock_units) AS total_units, ROUND(AVG(unit_price), 2) AS avg_cost", goal: "Report item count, total inventory units, and average price per category." },
      { tbl: "Orders", group: "shipping_city", select: "shipping_city, COUNT(*) AS order_vol, SUM(quantity * unit_price) AS city_revenue", goal: "Compute order volume and total revenue generated per shipping destination city." },
      { tbl: "MusicTracks", group: "genre", select: "genre, COUNT(*) AS song_count, SUM(play_count) AS total_plays, ROUND(AVG(duration_seconds), 0) AS avg_sec", goal: "Report song count, total stream plays, and average length per music genre." },
      { tbl: "GymMembers", group: "membership_plan", select: "membership_plan, COUNT(*) AS members, ROUND(AVG(visits_this_month), 1) AS avg_attendance", goal: "Calculate membership count and average monthly visits per plan tier." },
      { tbl: "MovieReviews", group: "release_year", select: "release_year, COUNT(*) AS films_reviewed, ROUND(AVG(star_rating), 2) AS year_avg_rating", goal: "Analyze films reviewed and average star rating per release year." },
      { tbl: "FlightSchedule", group: "destination_airport", select: "destination_airport, COUNT(*) AS flights, ROUND(AVG(ticket_price), 2) AS avg_fare", goal: "Calculate flight count and average fare per destination airport." },
      { tbl: "PetClinic", group: "species", select: "species, COUNT(*) AS patients, ROUND(AVG(weight_kg), 1) AS avg_weight, MAX(age_years) AS oldest_age", goal: "Determine patient count, average weight, and oldest age per animal species." }
    ]
  },
  {
    range: [371, 380],
    subcluster: "4.8 Multi-Column GROUP BY",
    level: "Level 3 (Multi-Column Grouping)",
    topics: [
      { tbl: "Students", group: "city, major", select: "city, major, COUNT(*) AS student_count", goal: "Group students by both city and major to see geographical major distribution." },
      { tbl: "Books", group: "genre, publish_year", select: "genre, publish_year, COUNT(*) AS book_count", goal: "Count published books grouped by both genre and publication year." },
      { tbl: "Employees", group: "department, city", select: "department, city, COUNT(*) AS office_headcount", goal: "Count employees grouped by department and office city." },
      { tbl: "GroceryItems", group: "category, is_organic", select: "category, is_organic, COUNT(*) AS product_count, ROUND(AVG(unit_price), 2) AS avg_price", goal: "Group grocery items by category and organic status (0 or 1), computing count and avg price." },
      { tbl: "Orders", group: "shipping_city, order_status", select: "shipping_city, order_status, COUNT(*) AS order_count", goal: "Track order counts partitioned by both shipping city and order status." },
      { tbl: "MusicTracks", group: "genre, release_year", select: "genre, release_year, COUNT(*) AS tracks, SUM(play_count) AS yearly_plays", goal: "Analyze track count and total plays grouped by genre and release year." },
      { tbl: "GymMembers", group: "membership_plan, is_active", select: "membership_plan, is_active, COUNT(*) AS member_count", goal: "Segment gym members by plan tier and active membership status." },
      { tbl: "MovieReviews", group: "genre, release_year", select: "genre, release_year, COUNT(*) AS total_reviews, ROUND(AVG(star_rating), 2) AS avg_rating", goal: "Group film reviews by genre and release year, analyzing count and average score." },
      { tbl: "FlightSchedule", group: "origin_airport, destination_airport", select: "origin_airport, destination_airport, COUNT(*) AS route_flights", goal: "Count scheduled flights for every distinct origin-to-destination flight route." },
      { tbl: "PetClinic", group: "species, breed", select: "species, breed, COUNT(*) AS pet_count", goal: "Count registered pets grouped by species and specific breed." }
    ]
  },
  {
    range: [381, 390],
    subcluster: "4.9 Filtering Groups with HAVING",
    level: "Level 3 (HAVING Clauses)",
    topics: [
      { tbl: "Students", group: "major", having: "COUNT(*) >= 2", select: "major, COUNT(*) AS student_count", goal: "Find majors that have 2 or more enrolled students using HAVING." },
      { tbl: "Books", group: "genre", having: "AVG(price) > 15.00", select: "genre, ROUND(AVG(price), 2) AS avg_price", goal: "Identify book genres where the average price exceeds $15.00." },
      { tbl: "Employees", group: "department", having: "AVG(salary) >= 80000", select: "department, ROUND(AVG(salary), 2) AS avg_salary", goal: "List departments whose average employee salary is at least $80,000." },
      { tbl: "GroceryItems", group: "category", having: "SUM(stock_units) > 100", select: "category, SUM(stock_units) AS total_units", goal: "Find grocery categories with over 100 total units in warehouse stock." },
      { tbl: "Orders", group: "shipping_city", having: "COUNT(*) >= 2", select: "shipping_city, COUNT(*) AS order_volume", goal: "Show cities that have received 2 or more total orders." },
      { tbl: "MusicTracks", group: "genre", having: "SUM(play_count) > 1000000", select: "genre, SUM(play_count) AS total_plays", goal: "Identify music genres with over 1,000,000 collective play streams." },
      { tbl: "GymMembers", group: "membership_plan", having: "AVG(visits_this_month) >= 8.0", select: "membership_plan, ROUND(AVG(visits_this_month), 1) AS avg_visits", goal: "Find membership tiers where members average 8 or more visits per month." },
      { tbl: "MovieReviews", group: "genre", having: "AVG(star_rating) >= 4.0", select: "genre, ROUND(AVG(star_rating), 2) AS avg_rating", goal: "List movie genres maintaining a stellar average rating of 4.0 or higher." },
      { tbl: "FlightSchedule", group: "origin_airport", having: "COUNT(*) >= 3", select: "origin_airport, COUNT(*) AS flight_count", goal: "Find origin airports operating 3 or more outgoing flights." },
      { tbl: "PetClinic", group: "species", having: "AVG(weight_kg) > 10.0", select: "species, ROUND(AVG(weight_kg), 1) AS avg_weight", goal: "Find species whose average patient weight exceeds 10.0 kilograms." }
    ]
  },
  {
    range: [391, 400],
    subcluster: "4.10 Full Lifecycle SQL & Bug Hunts",
    level: "Level 3 (Bug Hunts & Full Pipelines)",
    topics: [
      { tbl: "Employees", target: "SELECT department, COUNT(*) AS staff_count\nFROM Employees\nWHERE salary > 50000\nGROUP BY department\nHAVING COUNT(*) >= 2\nORDER BY staff_count DESC;", goal: "Full lifecycle query: filter by salary > 50000, group by department, keep groups with >= 2 staff, and order descending." },
      { tbl: "Students", target: "SELECT major, ROUND(AVG(gpa), 2) AS avg_gpa\nFROM Students\nWHERE enrolled_year >= 2023\nGROUP BY major\nHAVING AVG(gpa) >= 3.5\nORDER BY avg_gpa DESC\nLIMIT 3;", goal: "Filter recent students (>= 2023), group by major, filter high-GPA majors (>= 3.5), and sort top 3." },
      { tbl: "Books", target: "SELECT genre, COUNT(*) AS title_count\nFROM Books\nGROUP BY genre\nHAVING COUNT(*) >= 2\nORDER BY title_count DESC;", goal: "Fix the WHERE vs HAVING trap: replace 'WHERE COUNT(*) >= 2' with 'HAVING COUNT(*) >= 2' (aggregates cannot be in WHERE)." },
      { tbl: "GroceryItems", target: "SELECT category, ROUND(AVG(unit_price), 2) AS avg_price\nFROM GroceryItems\nWHERE stock_units > 10\nGROUP BY category\nHAVING AVG(unit_price) > 3.00\nORDER BY avg_price ASC;", goal: "Properly combine row filtering in WHERE (stock_units > 10) with group filtering in HAVING (avg_price > 3.00)." },
      { tbl: "Orders", target: "SELECT shipping_city, SUM(quantity * unit_price) AS total_revenue\nFROM Orders\nWHERE order_status = 'Delivered'\nGROUP BY shipping_city\nHAVING SUM(quantity * unit_price) > 500\nORDER BY total_revenue DESC;", goal: "Full lifecycle sales pipeline: filter delivered orders, group by city, filter revenue > 500, order by top revenue." },
      { tbl: "MusicTracks", target: "SELECT genre, COUNT(*) AS track_count\nFROM MusicTracks\nGROUP BY genre\nORDER BY track_count DESC\nLIMIT 5;", goal: "Fix the missing GROUP BY error: 'SELECT genre, COUNT(*) FROM MusicTracks ORDER BY 2 DESC;' (must GROUP BY genre)." },
      { tbl: "GymMembers", target: "SELECT membership_plan, COUNT(*) AS active_count\nFROM GymMembers\nWHERE is_active = 1\nGROUP BY membership_plan\nHAVING COUNT(*) >= 2\nORDER BY active_count DESC;", goal: "Filter active gym members, group by plan, enforce active_count >= 2 with HAVING, and order descending." },
      { tbl: "MovieReviews", target: "SELECT release_year, ROUND(AVG(star_rating), 2) AS avg_rating\nFROM MovieReviews\nWHERE star_rating >= 3.0\nGROUP BY release_year\nHAVING COUNT(*) >= 2\nORDER BY release_year ASC;", goal: "Filter reviews >= 3.0 stars, group by release year, filter years with >= 2 reviews, and sort chronologically." },
      { tbl: "FlightSchedule", target: "SELECT destination_airport, COUNT(*) AS flight_count\nFROM FlightSchedule\nWHERE status = 'On Time'\nGROUP BY destination_airport\nHAVING COUNT(*) >= 2\nORDER BY flight_count DESC\nLIMIT 3;", goal: "Analyze popular destinations: filter on-time flights, group by destination, filter count >= 2, return top 3." },
      { tbl: "PetClinic", target: "SELECT species, ROUND(AVG(weight_kg), 1) AS avg_weight\nFROM PetClinic\nWHERE age_years >= 1\nGROUP BY species\nHAVING AVG(weight_kg) > 5.0\nORDER BY avg_weight DESC;", goal: "Fix clause order trap: ensure WHERE comes before GROUP BY and HAVING comes after GROUP BY." }
    ]
  }
];

function makeSlots(query) {
  return query.split(/\s+/).map(tok => {
    let type = "column";
    const kw = tok.toUpperCase().replace(/[(),;]/g, '');
    if (["SELECT", "FROM", "WHERE", "GROUP", "BY", "HAVING", "ORDER", "ASC", "DESC", "LIMIT", "OFFSET", "COUNT", "SUM", "AVG", "MIN", "MAX", "ROUND", "DISTINCT", "AS"].includes(kw)) {
      type = "keyword";
    }
    if (tables.some(t => tok.includes(t))) type = "table";
    return { type, value: tok };
  });
}

clustersT4.forEach(c => {
  c.topics.forEach((t, i) => {
    const drillNum = c.range[0] + i;
    let q = t.target;
    if (!q) {
      q = `SELECT ${t.select}\nFROM ${t.tbl}`;
      if (t.group) q += `\nGROUP BY ${t.group}`;
      if (t.having) q += `\nHAVING ${t.having}`;
      q += ';';
    }
    DRILLS_T4.push({
      drillNumber: drillNum,
      subcluster: c.subcluster,
      level: c.level,
      title: `Syntax #${String(drillNum).padStart(3, '0')}: ${t.goal.replace(/\.$/, '')}`,
      table: t.tbl,
      scenario: t.goal,
      businessObjective: t.goal,
      schemaSnippet: `${t.tbl} schema`,
      targetQuery: q,
      syntaxBlueprint: t.group 
        ? `SELECT ${t.select}\nFROM ${t.tbl}\nGROUP BY ${t.group}${t.having ? `\nHAVING ${t.having}` : ''};`
        : `SELECT ${t.select}\nFROM ${t.tbl};`,
      syntaxRule: "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
      syntaxTrap: "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
      eli5Story: `Grouping and aggregating data on ${t.tbl}: ${t.goal}`,
      commonMistakes: "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
      learningOutcomes: `Mastered ${c.subcluster} on ${t.tbl}.`,
      challengeSlots: makeSlots(q)
    });
  });
});

console.log('Total Topic 4 drills generated:', DRILLS_T4.length);
fs.writeFileSync('scratch/syntax_drills_t4.json', JSON.stringify(DRILLS_T4, null, 2));
