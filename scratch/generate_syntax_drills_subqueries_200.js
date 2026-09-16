// Generator for Section 0: The SQL Syntax Gym — 200 Subquery & CTE Micro-Drills
// Topics 11 & 12 (Drills #1001 to #1200) across 10 everyday relatable schemas.

const fs = require('fs');

const tables = ['Students', 'Books', 'Employees', 'GroceryItems', 'Orders', 'MusicTracks', 'GymMembers', 'MovieReviews', 'FlightSchedule', 'PetClinic'];

function makeSlots(query) {
  return query.split(/\s+/).filter(Boolean).map(tok => {
    let type = "column";
    const clean = tok.toUpperCase().replace(/[(),;]/g, '');
    if ([
      "SELECT", "FROM", "WHERE", "GROUP", "BY", "HAVING", "ORDER", "ASC", "DESC", "LIMIT",
      "AS", "AND", "OR", "NOT", "IS", "NULL", "COUNT", "SUM", "AVG", "MIN", "MAX",
      "IN", "EXISTS", "ALL", "ANY", "SOME", "WITH", "RECURSIVE", "UNION", "BETWEEN",
      "CASE", "WHEN", "THEN", "ELSE", "END", "JOIN", "INNER", "LEFT", "ON"
    ].includes(clean)) {
      type = "keyword";
    } else if (tables.some(t => tok.includes(t)) || ["COURSES", "AUTHORS", "DEPARTMENTS", "SUPPLIERS", "CUSTOMERS", "ALBUMS", "TRAINERS", "MOVIES", "AIRLINES", "OWNERS", "SEQ", "HIERARCHY"].includes(clean)) {
      type = "table";
    }
    return { type, value: tok };
  });
}

// =============================================================================
// TOPIC 11: SUBQUERIES & DERIVED TABLES (Drills #1001 to #1100)
// =============================================================================
const clustersT11 = [
  {
    range: [1001, 1010],
    subcluster: "11.1 Scalar Subqueries in WHERE (Above/Below Benchmark)",
    level: "Level 2 (Scalar Subquery)",
    blueprint: "SELECT col1, col2\nFROM table_name\nWHERE metric > (SELECT AVG(metric) FROM table_name);",
    rule: "A scalar subquery returns exactly one value (1 row, 1 column). It can be used anywhere an atomic literal is expected, such as in WHERE comparisons.",
    trap: "If the subquery returns multiple rows, standard comparison operators (=, >, <) will fail with a 'Subquery returns more than 1 row' runtime error.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa\nFROM Students\nWHERE gpa > (SELECT AVG(gpa) FROM Students);", goal: "Find all students whose GPA is strictly above the campus-wide average." },
      { tbl: "Books", target: "SELECT title, price\nFROM Books\nWHERE price > (SELECT AVG(price) FROM Books);", goal: "Filter books priced higher than the average catalog book price." },
      { tbl: "Employees", target: "SELECT first_name, salary\nFROM Employees\nWHERE salary > (SELECT AVG(salary) FROM Employees);", goal: "Find employees earning more than the company-wide average salary." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE unit_price < (SELECT AVG(unit_price) FROM GroceryItems);", goal: "Find bargain grocery products priced below the store average." },
      { tbl: "Orders", target: "SELECT order_id, total_amount\nFROM Orders\nWHERE total_amount > (SELECT AVG(total_amount) FROM Orders);", goal: "Filter high-value orders that exceed the overall average order amount." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds\nFROM MusicTracks\nWHERE duration_seconds > (SELECT AVG(duration_seconds) FROM MusicTracks);", goal: "Identify long music tracks whose duration exceeds the catalog average." },
      { tbl: "GymMembers", target: "SELECT member_name, attendance_days\nFROM GymMembers\nWHERE attendance_days > (SELECT AVG(attendance_days) FROM GymMembers);", goal: "Find gym members who work out more frequently than the average member." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE star_rating > (SELECT AVG(star_rating) FROM MovieReviews);", goal: "Filter reviews with star ratings strictly higher than the overall review average." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, distance_miles\nFROM FlightSchedule\nWHERE distance_miles > (SELECT AVG(distance_miles) FROM FlightSchedule);", goal: "Find flights whose route distance is greater than the fleet-wide average." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg\nFROM PetClinic\nWHERE weight_kg > (SELECT AVG(weight_kg) FROM PetClinic);", goal: "Find clinic patients whose body weight exceeds the patient average." }
    ]
  },
  {
    range: [1011, 1020],
    subcluster: "11.2 Scalar Subqueries in SELECT (Projections & Baselines)",
    level: "Level 2 (Projected Scalar Subquery)",
    blueprint: "SELECT col1, (SELECT AVG(metric) FROM table_name) AS overall_avg\nFROM table_name;",
    rule: "Placing a scalar subquery in the SELECT clause attaches a global benchmark or single calculated value to every projected row.",
    trap: "Placing an uncorrelated subquery in SELECT evaluates once in modern optimizers, but if written sloppily it can trigger N-times re-evaluations.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa, (SELECT MAX(gpa) FROM Students) AS top_gpa\nFROM Students;", goal: "Project each student's GPA alongside the school-wide maximum GPA." },
      { tbl: "Books", target: "SELECT title, price, (SELECT MAX(price) FROM Books) AS highest_price\nFROM Books;", goal: "Show book prices alongside the highest priced book in the bookstore." },
      { tbl: "Employees", target: "SELECT first_name, salary, (SELECT AVG(salary) FROM Employees) AS company_avg_sal\nFROM Employees;", goal: "Display employee salary with company average salary for direct comparison." },
      { tbl: "GroceryItems", target: "SELECT item_name, stock_qty, (SELECT MIN(stock_qty) FROM GroceryItems) AS min_inventory\nFROM GroceryItems;", goal: "Project grocery inventory quantities alongside the lowest stock quantity." },
      { tbl: "Orders", target: "SELECT order_id, total_amount, (SELECT MAX(total_amount) FROM Orders) AS biggest_order\nFROM Orders;", goal: "Show order amount alongside the largest order recorded in company history." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds, (SELECT MAX(duration_seconds) FROM MusicTracks) AS max_duration\nFROM MusicTracks;", goal: "Compare track length against the longest song in the catalog." },
      { tbl: "GymMembers", target: "SELECT member_name, monthly_fee, (SELECT AVG(monthly_fee) FROM GymMembers) AS avg_fee\nFROM GymMembers;", goal: "Show individual membership dues next to the average gym membership price." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating, (SELECT AVG(star_rating) FROM MovieReviews) AS global_avg_rating\nFROM MovieReviews;", goal: "Display individual review ratings alongside the global review baseline." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, distance_miles, (SELECT MAX(distance_miles) FROM FlightSchedule) AS longest_flight\nFROM FlightSchedule;", goal: "Project flight route distance alongside the longest flight in the network." },
      { tbl: "PetClinic", target: "SELECT pet_name, age_years, (SELECT MAX(age_years) FROM PetClinic) AS oldest_pet_age\nFROM PetClinic;", goal: "Display pet age alongside the maximum pet age registered in the clinic." }
    ]
  },
  {
    range: [1021, 1030],
    subcluster: "11.3 Set Membership with IN (Subquery Lists)",
    level: "Level 2 (IN Subquery)",
    blueprint: "SELECT col1, col2\nFROM table_name\nWHERE key_col IN (SELECT fk_col FROM other_table WHERE condition);",
    rule: "The IN subquery checks whether a row's column value exists in the dynamic list of values returned by the subquery.",
    trap: "Selecting multiple columns in the IN subquery (e.g. IN (SELECT id, name ...)) will throw an operand error. IN requires exactly 1 column.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, city\nFROM Students\nWHERE student_id IN (SELECT student_id FROM Courses WHERE credits >= 4);", goal: "Find students enrolled in rigorous 4+ credit courses using an IN subquery." },
      { tbl: "Books", target: "SELECT title, author\nFROM Books\nWHERE author_id IN (SELECT author_id FROM Authors WHERE country = 'Japan');", goal: "Find books written by Japanese authors using an IN subquery." },
      { tbl: "Employees", target: "SELECT first_name, department\nFROM Employees\nWHERE department_id IN (SELECT department_id FROM Departments WHERE budget > 500000);", goal: "Find staff working in departments with budgets exceeding $500,000." },
      { tbl: "GroceryItems", target: "SELECT item_name, category\nFROM GroceryItems\nWHERE supplier_id IN (SELECT supplier_id FROM Suppliers WHERE country = 'Canada');", goal: "Filter grocery items provided by Canadian suppliers via IN." },
      { tbl: "Orders", target: "SELECT order_id, total_amount\nFROM Orders\nWHERE customer_id IN (SELECT customer_id FROM Customers WHERE city = 'New York');", goal: "Retrieve orders placed by customers residing in New York using an IN subquery." },
      { tbl: "MusicTracks", target: "SELECT track_title, genre\nFROM MusicTracks\nWHERE album_id IN (SELECT album_id FROM Albums WHERE release_year >= 2024);", goal: "Find music tracks from albums released in 2024 or later." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE trainer_id IN (SELECT trainer_id FROM Trainers WHERE specialty = 'Strength');", goal: "Find gym members whose trainer specializes in Strength coaching." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE movie_id IN (SELECT movie_id FROM Movies WHERE release_year = 2023);", goal: "Retrieve reviews written for films released in the year 2023." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport\nFROM FlightSchedule\nWHERE airline_id IN (SELECT airline_id FROM Airlines WHERE country = 'USA');", goal: "Find scheduled flights operated by US-headquartered airlines." },
      { tbl: "PetClinic", target: "SELECT pet_name, species\nFROM PetClinic\nWHERE owner_id IN (SELECT owner_id FROM Owners WHERE city = 'Chicago');", goal: "Filter clinic pets belonging to owners located in Chicago." }
    ]
  },
  {
    range: [1031, 1040],
    subcluster: "11.4 Negative Membership with NOT IN & The NULL Trap",
    level: "Level 2 (NOT IN Subquery)",
    blueprint: "SELECT col1, col2\nFROM table_name\nWHERE key_col NOT IN (SELECT fk_col FROM other_table WHERE fk_col IS NOT NULL);",
    rule: "NOT IN excludes rows matching any value in the subquery result. You must ensure the subquery does not return any NULL values.",
    trap: "THE NOT IN NULL TRAP: If a NOT IN subquery contains even a single NULL value, the entire query returns ZERO rows! Always filter 'WHERE col IS NOT NULL' inside.",
    topics: [
      { tbl: "Students", target: "SELECT full_name\nFROM Students\nWHERE student_id NOT IN (SELECT student_id FROM Courses WHERE student_id IS NOT NULL);", goal: "Find students with zero registered courses using NOT IN (with NULL protection)." },
      { tbl: "Books", target: "SELECT title\nFROM Books\nWHERE book_id NOT IN (SELECT book_id FROM BorrowRecords WHERE book_id IS NOT NULL);", goal: "Identify books that have never been checked out from the library via NOT IN." },
      { tbl: "Employees", target: "SELECT first_name, last_name\nFROM Employees\nWHERE employee_id NOT IN (SELECT manager_id FROM Employees WHERE manager_id IS NOT NULL);", goal: "Find non-manager individual contributor employees using NOT IN." },
      { tbl: "GroceryItems", target: "SELECT item_name\nFROM GroceryItems\nWHERE item_id NOT IN (SELECT item_id FROM OrderItems WHERE item_id IS NOT NULL);", goal: "Find grocery items that have zero purchase history using NOT IN." },
      { tbl: "Orders", target: "SELECT customer_id, customer_name\nFROM Customers\nWHERE customer_id NOT IN (SELECT customer_id FROM Orders WHERE customer_id IS NOT NULL);", goal: "Identify inactive customer accounts that have never placed an order." },
      { tbl: "MusicTracks", target: "SELECT track_title\nFROM MusicTracks\nWHERE track_id NOT IN (SELECT track_id FROM Playlists WHERE track_id IS NOT NULL);", goal: "Find music tracks that do not appear in any curated playlist." },
      { tbl: "GymMembers", target: "SELECT member_name\nFROM GymMembers\nWHERE member_id NOT IN (SELECT member_id FROM ClassBookings WHERE member_id IS NOT NULL);", goal: "Find gym members who have never booked a group fitness class." },
      { tbl: "MovieReviews", target: "SELECT movie_title\nFROM Movies\nWHERE movie_id NOT IN (SELECT movie_id FROM MovieReviews WHERE movie_id IS NOT NULL);", goal: "Identify movies in the cinema registry that have zero reviews." },
      { tbl: "FlightSchedule", target: "SELECT airline_name\nFROM Airlines\nWHERE airline_id NOT IN (SELECT airline_id FROM FlightSchedule WHERE airline_id IS NOT NULL);", goal: "Find partner airlines that currently have zero scheduled flight legs." },
      { tbl: "PetClinic", target: "SELECT owner_name\nFROM Owners\nWHERE owner_id NOT IN (SELECT owner_id FROM PetClinic WHERE owner_id IS NOT NULL);", goal: "Find registered pet owners who currently have zero pets in the clinic registry." }
    ]
  },
  {
    range: [1041, 1050],
    subcluster: "11.5 Correlated Subqueries (Row-by-Row Context)",
    level: "Level 3 (Correlated Subquery)",
    blueprint: "SELECT e.name, e.salary\nFROM Employees e\nWHERE e.salary > (SELECT AVG(sub.salary) FROM Employees sub WHERE sub.department_id = e.department_id);",
    rule: "A correlated subquery references columns from the outer query table, executing dynamically for each row evaluated in the outer query.",
    trap: "Correlated subqueries can be slow on large unindexed tables because they execute once per outer row.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, s.gpa, s.major\nFROM Students s\nWHERE s.gpa > (SELECT AVG(sub.gpa) FROM Students sub WHERE sub.major = s.major);", goal: "Find students whose GPA is higher than the average for their specific academic major." },
      { tbl: "Books", target: "SELECT b.title, b.price, b.genre\nFROM Books b\nWHERE b.price > (SELECT AVG(sub.price) FROM Books sub WHERE sub.genre = b.genre);", goal: "Find books priced above the average price of their respective literary genre." },
      { tbl: "Employees", target: "SELECT e.first_name, e.salary, e.department\nFROM Employees e\nWHERE e.salary > (SELECT AVG(sub.salary) FROM Employees sub WHERE sub.department = e.department);", goal: "Identify employees earning above their own department's average salary." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, g.unit_price, g.category\nFROM GroceryItems g\nWHERE g.unit_price > (SELECT AVG(sub.unit_price) FROM GroceryItems sub WHERE sub.category = g.category);", goal: "Find grocery items priced higher than the average product in their grocery category." },
      { tbl: "Orders", target: "SELECT o.order_id, o.customer_id, o.total_amount\nFROM Orders o\nWHERE o.total_amount > (SELECT AVG(sub.total_amount) FROM Orders sub WHERE sub.customer_id = o.customer_id);", goal: "Identify orders that exceed the customer's personal average order value." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, t.duration_seconds, t.genre\nFROM MusicTracks t\nWHERE t.duration_seconds > (SELECT AVG(sub.duration_seconds) FROM MusicTracks sub WHERE sub.genre = t.genre);", goal: "Find music tracks longer than the average track duration for that genre." },
      { tbl: "GymMembers", target: "SELECT m.member_name, m.attendance_days, m.membership_plan\nFROM GymMembers m\nWHERE m.attendance_days > (SELECT AVG(sub.attendance_days) FROM GymMembers sub WHERE sub.membership_plan = m.membership_plan);", goal: "Find members attending gym more often than their plan tier's average." },
      { tbl: "MovieReviews", target: "SELECT r.movie_title, r.star_rating, r.genre\nFROM MovieReviews r\nWHERE r.star_rating > (SELECT AVG(sub.star_rating) FROM MovieReviews sub WHERE sub.genre = r.genre);", goal: "Find movie reviews scoring higher than the genre average." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, f.ticket_price, f.origin_airport\nFROM FlightSchedule f\nWHERE f.ticket_price > (SELECT AVG(sub.ticket_price) FROM FlightSchedule sub WHERE sub.origin_airport = f.origin_airport);", goal: "Find flights priced higher than the average departure flight from that airport." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, p.weight_kg, p.species\nFROM PetClinic p\nWHERE p.weight_kg > (SELECT AVG(sub.weight_kg) FROM PetClinic sub WHERE sub.species = p.species);", goal: "Find clinic animal patients weighing more than their species average." }
    ]
  },
  {
    range: [1051, 1060],
    subcluster: "11.6 Existence Checking with EXISTS",
    level: "Level 2 (EXISTS Subquery)",
    blueprint: "SELECT a.col1, a.col2\nFROM TableA a\nWHERE EXISTS (SELECT 1 FROM TableB b WHERE b.a_id = a.id AND b.condition);",
    rule: "EXISTS tests for the presence of ANY matching row. It short-circuits to TRUE as soon as the first match is found, making it extremely fast.",
    trap: "Writing SELECT * inside EXISTS instead of SELECT 1. Modern engines optimize both identically, but 'SELECT 1' is standard clean convention.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name\nFROM Students s\nWHERE EXISTS (SELECT 1 FROM Courses c WHERE c.student_id = s.student_id AND c.credits >= 3);", goal: "Find students enrolled in at least one 3+ credit course using EXISTS." },
      { tbl: "Books", target: "SELECT a.author_name\nFROM Authors a\nWHERE EXISTS (SELECT 1 FROM Books b WHERE b.author_id = a.author_id AND b.price > 25.00);", goal: "Find authors who have published at least one premium book over $25.00 via EXISTS." },
      { tbl: "Employees", target: "SELECT d.department_name\nFROM Departments d\nWHERE EXISTS (SELECT 1 FROM Employees e WHERE e.department_id = d.department_id AND e.salary >= 100000);", goal: "Find departments employing at least one executive earning $100k+." },
      { tbl: "GroceryItems", target: "SELECT s.supplier_name\nFROM Suppliers s\nWHERE EXISTS (SELECT 1 FROM GroceryItems g WHERE g.supplier_id = s.supplier_id AND g.stock_qty < 5);", goal: "Identify suppliers who have at least one critical low-stock product (<5 units)." },
      { tbl: "Orders", target: "SELECT c.customer_name\nFROM Customers c\nWHERE EXISTS (SELECT 1 FROM Orders o WHERE o.customer_id = c.customer_id AND o.total_amount >= 500);", goal: "Find customers who have placed at least one high-value order of $500+ using EXISTS." },
      { tbl: "MusicTracks", target: "SELECT a.album_title\nFROM Albums a\nWHERE EXISTS (SELECT 1 FROM MusicTracks t WHERE t.album_id = a.album_id AND t.duration_seconds > 300);", goal: "Find albums featuring at least one extended track longer than 5 minutes." },
      { tbl: "GymMembers", target: "SELECT tr.trainer_name\nFROM Trainers tr\nWHERE EXISTS (SELECT 1 FROM GymMembers m WHERE m.trainer_id = tr.trainer_id AND m.membership_plan = 'VIP');", goal: "Find trainers coaching at least one VIP gym client using EXISTS." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title\nFROM Movies m\nWHERE EXISTS (SELECT 1 FROM MovieReviews r WHERE r.movie_id = m.movie_id AND r.star_rating = 5);", goal: "Find movie titles that have received at least one perfect 5-star review." },
      { tbl: "FlightSchedule", target: "SELECT al.airline_name\nFROM Airlines al\nWHERE EXISTS (SELECT 1 FROM FlightSchedule f WHERE f.airline_id = al.airline_id AND f.status = 'Delayed');", goal: "Identify airlines currently experiencing at least one delayed flight." },
      { tbl: "PetClinic", target: "SELECT o.owner_name\nFROM Owners o\nWHERE EXISTS (SELECT 1 FROM PetClinic p WHERE p.owner_id = o.owner_id AND p.species = 'Canine');", goal: "Find pet owners who care for at least one dog patient using EXISTS." }
    ]
  },
  {
    range: [1061, 1070],
    subcluster: "11.7 Safe Anti-Matching with NOT EXISTS",
    level: "Level 2 (NOT EXISTS Anti-Match)",
    blueprint: "SELECT a.col1, a.col2\nFROM TableA a\nWHERE NOT EXISTS (SELECT 1 FROM TableB b WHERE b.a_id = a.id);",
    rule: "NOT EXISTS is the safest, most performant way to find records with ZERO related records. Unlike NOT IN, it handles NULL values safely without silent failure.",
    trap: "Forgetting the correlation condition inside NOT EXISTS (e.g. omitting b.a_id = a.id) evaluates the subquery as global and returns 0 rows.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name\nFROM Students s\nWHERE NOT EXISTS (SELECT 1 FROM Courses c WHERE c.student_id = s.student_id);", goal: "Find students with zero registered courses safely using NOT EXISTS." },
      { tbl: "Books", target: "SELECT b.title\nFROM Books b\nWHERE NOT EXISTS (SELECT 1 FROM BorrowRecords r WHERE r.book_id = b.book_id);", goal: "Identify catalog books that have never been borrowed using NOT EXISTS." },
      { tbl: "Employees", target: "SELECT e.first_name, e.department\nFROM Employees e\nWHERE NOT EXISTS (SELECT 1 FROM Projects p WHERE p.lead_employee_id = e.employee_id);", goal: "Find staff members who are not leading any corporate project." },
      { tbl: "GroceryItems", target: "SELECT g.item_name\nFROM GroceryItems g\nWHERE NOT EXISTS (SELECT 1 FROM OrderItems oi WHERE oi.item_id = g.item_id);", goal: "Identify grocery inventory items that have never been ordered using NOT EXISTS." },
      { tbl: "Orders", target: "SELECT c.customer_name\nFROM Customers c\nWHERE NOT EXISTS (SELECT 1 FROM Orders o WHERE o.customer_id = c.customer_id);", goal: "Find prospective customers who have never placed an order using NOT EXISTS." },
      { tbl: "MusicTracks", target: "SELECT t.track_title\nFROM MusicTracks t\nWHERE NOT EXISTS (SELECT 1 FROM PlaylistItems p WHERE p.track_id = t.track_id);", goal: "Find music tracks that have never been included in any playlist." },
      { tbl: "GymMembers", target: "SELECT m.member_name\nFROM GymMembers m\nWHERE NOT EXISTS (SELECT 1 FROM ClassBookings cb WHERE cb.member_id = m.member_id);", goal: "Identify gym members who have never attended a group fitness class." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title\nFROM Movies m\nWHERE NOT EXISTS (SELECT 1 FROM MovieReviews r WHERE r.movie_id = m.movie_id);", goal: "Identify released films that have zero reviews in the archive." },
      { tbl: "FlightSchedule", target: "SELECT al.airline_name\nFROM Airlines al\nWHERE NOT EXISTS (SELECT 1 FROM FlightSchedule f WHERE f.airline_id = al.airline_id);", goal: "Find partner airlines with zero scheduled flights today using NOT EXISTS." },
      { tbl: "PetClinic", target: "SELECT o.owner_name\nFROM Owners o\nWHERE NOT EXISTS (SELECT 1 FROM PetClinic p WHERE p.owner_id = o.owner_id);", goal: "Identify registered client accounts that have no active pets in the clinic." }
    ]
  },
  {
    range: [1071, 1080],
    subcluster: "11.8 Quantified Subqueries with ALL",
    level: "Level 3 (ALL Operator)",
    blueprint: "SELECT col1, col2\nFROM table_name\nWHERE metric > ALL (SELECT metric FROM other_table WHERE condition);",
    rule: "'> ALL (subquery)' requires the outer column to be strictly greater than EVERY single value returned by the subquery (equivalent to > MAX).",
    trap: "If the subquery returns an empty set, ALL evaluates to TRUE for every row.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa\nFROM Students\nWHERE gpa > ALL (SELECT gpa FROM Students WHERE enrolled_year = 2021);", goal: "Find students whose GPA is higher than EVERY student who enrolled in 2021." },
      { tbl: "Books", target: "SELECT title, price\nFROM Books\nWHERE price > ALL (SELECT price FROM Books WHERE genre = 'Paperback');", goal: "Find hardcover books priced higher than all paperback books." },
      { tbl: "Employees", target: "SELECT first_name, salary\nFROM Employees\nWHERE salary > ALL (SELECT salary FROM Employees WHERE department = 'Sales');", goal: "Find employees who earn more than every single worker in the Sales department." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE unit_price > ALL (SELECT unit_price FROM GroceryItems WHERE category = 'Produce');", goal: "Find specialty items priced higher than all produce products." },
      { tbl: "Orders", target: "SELECT order_id, total_amount\nFROM Orders\nWHERE total_amount > ALL (SELECT total_amount FROM Orders WHERE shipping_city = 'Dallas');", goal: "Find orders larger than every order shipped to Dallas using > ALL." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds\nFROM MusicTracks\nWHERE duration_seconds > ALL (SELECT duration_seconds FROM MusicTracks WHERE genre = 'Punk');", goal: "Find tracks longer than every single punk rock track in the library." },
      { tbl: "GymMembers", target: "SELECT member_name, attendance_days\nFROM GymMembers\nWHERE attendance_days > ALL (SELECT attendance_days FROM GymMembers WHERE membership_plan = 'Bronze');", goal: "Find active members attending more days than all Bronze plan members." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE star_rating > ALL (SELECT star_rating FROM MovieReviews WHERE reviewer_name = 'Critic X');", goal: "Find movies rated higher than every film reviewed by Critic X." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, distance_miles\nFROM FlightSchedule\nWHERE distance_miles > ALL (SELECT distance_miles FROM FlightSchedule WHERE origin_airport = 'BOS');", goal: "Find flights longer than all flight routes departing from Boston (BOS)." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg\nFROM PetClinic\nWHERE weight_kg > ALL (SELECT weight_kg FROM PetClinic WHERE species = 'Feline');", goal: "Find animal patients that weigh more than every cat in the veterinary clinic." }
    ]
  },
  {
    range: [1081, 1090],
    subcluster: "11.9 Quantified Subqueries with ANY / SOME",
    level: "Level 3 (ANY Operator)",
    blueprint: "SELECT col1, col2\nFROM table_name\nWHERE metric > ANY (SELECT metric FROM other_table WHERE condition);",
    rule: "'> ANY (subquery)' requires the outer column to be greater than AT LEAST ONE value returned by the subquery (equivalent to > MIN).",
    trap: "'= ANY' is functionally identical to the 'IN' operator.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa\nFROM Students\nWHERE gpa > ANY (SELECT gpa FROM Students WHERE major = 'Art');", goal: "Find students with a GPA higher than at least one Art major student." },
      { tbl: "Books", target: "SELECT title, price\nFROM Books\nWHERE price < ANY (SELECT price FROM Books WHERE genre = 'Textbook');", goal: "Find books cheaper than at least one textbook in the catalog." },
      { tbl: "Employees", target: "SELECT first_name, salary\nFROM Employees\nWHERE salary > ANY (SELECT salary FROM Employees WHERE department = 'Engineering');", goal: "Find employees earning more than at least one member of Engineering." },
      { tbl: "GroceryItems", target: "SELECT item_name, stock_qty\nFROM GroceryItems\nWHERE stock_qty < ANY (SELECT stock_qty FROM GroceryItems WHERE category = 'Dairy');", goal: "Find items with stock lower than at least one dairy item." },
      { tbl: "Orders", target: "SELECT order_id, total_amount\nFROM Orders\nWHERE total_amount > ANY (SELECT total_amount FROM Orders WHERE customer_name = 'VIP Corp');", goal: "Find orders larger than at least one order placed by VIP Corp." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds\nFROM MusicTracks\nWHERE duration_seconds < ANY (SELECT duration_seconds FROM MusicTracks WHERE genre = 'Classical');", goal: "Find music tracks shorter than at least one classical recording." },
      { tbl: "GymMembers", target: "SELECT member_name, monthly_fee\nFROM GymMembers\nWHERE monthly_fee < ANY (SELECT monthly_fee FROM GymMembers WHERE membership_plan = 'Gold');", goal: "Find members paying less than at least one Gold plan member." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE star_rating > ANY (SELECT star_rating FROM MovieReviews WHERE genre = 'Horror');", goal: "Find movie reviews rated higher than at least one horror film." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, ticket_price\nFROM FlightSchedule\nWHERE ticket_price < ANY (SELECT ticket_price FROM FlightSchedule WHERE origin_airport = 'JFK');", goal: "Find flights cheaper than at least one flight departing from JFK." },
      { tbl: "PetClinic", target: "SELECT pet_name, age_years\nFROM PetClinic\nWHERE age_years > ANY (SELECT age_years FROM PetClinic WHERE species = 'Canine');", goal: "Find clinic animals older than at least one canine patient." }
    ]
  },
  {
    range: [1091, 1100],
    subcluster: "11.10 Derived Tables in FROM with Mandatory Aliases",
    level: "Level 3 (FROM Derived Table)",
    blueprint: "SELECT dt.category, dt.avg_metric\nFROM (SELECT category, AVG(metric) AS avg_metric FROM table_name GROUP BY category) AS dt\nWHERE dt.avg_metric > 50;",
    rule: "A subquery in the FROM clause acts as a temporary in-line table (derived table). Every derived table MUST have an alias in SQL standard.",
    trap: "Omitting the alias after the closing parenthesis in FROM (e.g. 'FROM (SELECT ...) WHERE') will immediately throw a syntax error.",
    topics: [
      { tbl: "Students", target: "SELECT dt.major, dt.avg_gpa\nFROM (SELECT major, AVG(gpa) AS avg_gpa FROM Students GROUP BY major) AS dt\nWHERE dt.avg_gpa >= 3.5;", goal: "Select majors with average GPA >= 3.5 using a derived table in the FROM clause." },
      { tbl: "Books", target: "SELECT dt.author, dt.book_count\nFROM (SELECT author, COUNT(*) AS book_count FROM Books GROUP BY author) AS dt\nWHERE dt.book_count >= 3;", goal: "Find authors with 3+ books using a derived table in FROM with mandatory alias." },
      { tbl: "Employees", target: "SELECT dt.department, dt.total_payroll\nFROM (SELECT department, SUM(salary) AS total_payroll FROM Employees GROUP BY department) AS dt\nWHERE dt.total_payroll > 200000;", goal: "Filter departments with payroll > $200k using a FROM derived table." },
      { tbl: "GroceryItems", target: "SELECT dt.category, dt.total_stock\nFROM (SELECT category, SUM(stock_qty) AS total_stock FROM GroceryItems GROUP BY category) AS dt\nWHERE dt.total_stock < 100;", goal: "Identify understocked categories using a derived table in FROM." },
      { tbl: "Orders", target: "SELECT dt.shipping_city, dt.city_revenue\nFROM (SELECT shipping_city, SUM(total_amount) AS city_revenue FROM Orders GROUP BY shipping_city) AS dt\nWHERE dt.city_revenue >= 1000.00;", goal: "Filter high-revenue cities using an aliased derived table." },
      { tbl: "MusicTracks", target: "SELECT dt.genre, dt.song_count\nFROM (SELECT genre, COUNT(*) AS song_count FROM MusicTracks GROUP BY genre) AS dt\nWHERE dt.song_count >= 10;", goal: "Find genres with 10+ tracks via a derived table in FROM." },
      { tbl: "GymMembers", target: "SELECT dt.membership_plan, dt.member_total\nFROM (SELECT membership_plan, COUNT(*) AS member_total FROM GymMembers GROUP BY membership_plan) AS dt\nWHERE dt.member_total >= 5;", goal: "Filter popular membership plans using an aliased derived table." },
      { tbl: "MovieReviews", target: "SELECT dt.genre, dt.avg_rating\nFROM (SELECT genre, AVG(star_rating) AS avg_rating FROM MovieReviews GROUP BY genre) AS dt\nWHERE dt.avg_rating >= 4.0;", goal: "Identify top-performing movie genres using a derived table in FROM." },
      { tbl: "FlightSchedule", target: "SELECT dt.origin_airport, dt.daily_flights\nFROM (SELECT origin_airport, COUNT(*) AS daily_flights FROM FlightSchedule GROUP BY origin_airport) AS dt\nWHERE dt.daily_flights >= 5;", goal: "Find high-frequency airport hubs using an aliased derived table." },
      { tbl: "PetClinic", target: "SELECT dt.species, dt.patient_count\nFROM (SELECT species, COUNT(*) AS patient_count FROM PetClinic GROUP BY species) AS dt\nWHERE dt.patient_count >= 10;", goal: "Find top clinic species categories using a derived table in FROM." }
    ]
  }
];

// =============================================================================
// TOPIC 12: MODULAR CTES & MULTI-STEP PIPELINES (Drills #1101 to #1200)
// =============================================================================
const clustersT12 = [
  {
    range: [1101, 1110],
    subcluster: "12.1 Single-CTE Foundations (WITH clause)",
    level: "Level 2 (Basic CTE)",
    blueprint: "WITH cte_name AS (\n  SELECT col1, AVG(col2) AS avg_col\n  FROM table_name\n  GROUP BY col1\n)\nSELECT *\nFROM cte_name\nWHERE avg_col > 50;",
    rule: "A Common Table Expression (CTE) defines a named temporary result set at the top of a query using 'WITH cte_name AS (...)'.",
    trap: "Placing a semicolon inside the CTE parentheses or between the CTE definition and the main SELECT statement.",
    topics: [
      { tbl: "Students", target: "WITH HonorRoll AS (\n  SELECT student_id, full_name, gpa\n  FROM Students\n  WHERE gpa >= 3.8\n)\nSELECT full_name, gpa\nFROM HonorRoll\nORDER BY gpa DESC;", goal: "Construct a clean single-CTE query isolating Honor Roll students (GPA >= 3.8)." },
      { tbl: "Books", target: "WITH ExpensiveBooks AS (\n  SELECT title, author, price\n  FROM Books\n  WHERE price >= 30.00\n)\nSELECT title, price\nFROM ExpensiveBooks\nORDER BY price DESC;", goal: "Isolate expensive books ($30+) in a CTE before projecting final results." },
      { tbl: "Employees", target: "WITH HighEarners AS (\n  SELECT first_name, department, salary\n  FROM Employees\n  WHERE salary >= 80000\n)\nSELECT first_name, salary\nFROM HighEarners\nORDER BY salary DESC;", goal: "Define a HighEarners CTE to filter salaries >= $80k before sorting." },
      { tbl: "GroceryItems", target: "WITH CriticalStock AS (\n  SELECT item_name, category, stock_qty\n  FROM GroceryItems\n  WHERE stock_qty < 10\n)\nSELECT item_name, stock_qty\nFROM CriticalStock\nORDER BY stock_qty ASC;", goal: "Isolate critical stock grocery inventory in a CTE." },
      { tbl: "Orders", target: "WITH LargeOrders AS (\n  SELECT order_id, customer_name, total_amount\n  FROM Orders\n  WHERE total_amount >= 500.00\n)\nSELECT order_id, total_amount\nFROM LargeOrders\nORDER BY total_amount DESC;", goal: "Extract large orders ($500+) in a named CTE before sorting." },
      { tbl: "MusicTracks", target: "WITH LongTracks AS (\n  SELECT track_title, artist_name, duration_seconds\n  FROM MusicTracks\n  WHERE duration_seconds >= 300\n)\nSELECT track_title, duration_seconds\nFROM LongTracks\nORDER BY duration_seconds DESC;", goal: "Isolate 5+ minute music tracks in a modular CTE." },
      { tbl: "GymMembers", target: "WITH VIPMembers AS (\n  SELECT member_name, join_date, membership_plan\n  FROM GymMembers\n  WHERE membership_plan = 'VIP'\n)\nSELECT member_name, join_date\nFROM VIPMembers\nORDER BY join_date ASC;", goal: "Isolate VIP gym members in a CTE before chronological sorting." },
      { tbl: "MovieReviews", target: "WITH TopRatedMovies AS (\n  SELECT movie_title, star_rating, review_text\n  FROM MovieReviews\n  WHERE star_rating = 5\n)\nSELECT movie_title, review_text\nFROM TopRatedMovies\nLIMIT 5;", goal: "Isolate 5-star movie reviews in a CTE before fetching the first 5 records." },
      { tbl: "FlightSchedule", target: "WITH DelayedFlights AS (\n  SELECT flight_id, origin_airport, status\n  FROM FlightSchedule\n  WHERE status = 'Delayed'\n)\nSELECT flight_id, origin_airport\nFROM DelayedFlights\nORDER BY flight_id ASC;", goal: "Filter delayed flights in a CTE before ordering by flight ID." },
      { tbl: "PetClinic", target: "WITH HeavyPatients AS (\n  SELECT pet_name, species, weight_kg\n  FROM PetClinic\n  WHERE weight_kg >= 25.0\n)\nSELECT pet_name, weight_kg\nFROM HeavyPatients\nORDER BY weight_kg DESC;", goal: "Isolate large veterinary patients (25kg+) in a named CTE." }
    ]
  },
  {
    range: [1111, 1120],
    subcluster: "12.2 CTE Column Alias Renaming (Explicit Signatures)",
    level: "Level 2 (Explicit CTE Signatures)",
    blueprint: "WITH Summary(dept_name, staff_count, total_cost) AS (\n  SELECT department, COUNT(*), SUM(salary)\n  FROM Employees\n  GROUP BY department\n)\nSELECT dept_name, staff_count\nFROM Summary;",
    rule: "You can specify explicit column names in the CTE header signature 'WITH cte_name(c1, c2, c3) AS (...)', making the schema clear and concise.",
    trap: "The number of column names in the signature list MUST exactly match the number of expressions in the CTE SELECT statement.",
    topics: [
      { tbl: "Students", target: "WITH MajorStats(major_name, student_count, avg_score) AS (\n  SELECT major, COUNT(*), AVG(gpa)\n  FROM Students\n  GROUP BY major\n)\nSELECT major_name, avg_score\nFROM MajorStats\nORDER BY avg_score DESC;", goal: "Define explicit column signatures in a student major statistics CTE." },
      { tbl: "Books", target: "WITH GenreOverview(genre_name, total_titles, avg_cost) AS (\n  SELECT genre, COUNT(*), AVG(price)\n  FROM Books\n  GROUP BY genre\n)\nSELECT genre_name, total_titles\nFROM GenreOverview;", goal: "Assign explicit column aliases in the header of a genre overview CTE." },
      { tbl: "Employees", target: "WITH DeptPayroll(dept_title, headcount, payroll_sum) AS (\n  SELECT department, COUNT(*), SUM(salary)\n  FROM Employees\n  GROUP BY department\n)\nSELECT dept_title, payroll_sum\nFROM DeptPayroll\nORDER BY payroll_sum DESC;", goal: "Rename CTE projection columns explicitly in the header definition." },
      { tbl: "GroceryItems", target: "WITH CategoryHealth(cat_name, sku_count, total_units) AS (\n  SELECT category, COUNT(*), SUM(stock_qty)\n  FROM GroceryItems\n  GROUP BY category\n)\nSELECT cat_name, total_units\nFROM CategoryHealth;", goal: "Define category inventory metrics with explicit CTE column signatures." },
      { tbl: "Orders", target: "WITH CityRevenue(city, order_volume, gross_sales) AS (\n  SELECT shipping_city, COUNT(*), SUM(total_amount)\n  FROM Orders\n  GROUP BY shipping_city\n)\nSELECT city, gross_sales\nFROM CityRevenue\nORDER BY gross_sales DESC;", goal: "Rename city aggregation columns explicitly in a CTE header signature." },
      { tbl: "MusicTracks", target: "WITH GenreMetrics(music_genre, song_tally, total_seconds) AS (\n  SELECT genre, COUNT(*), SUM(duration_seconds)\n  FROM MusicTracks\n  GROUP BY genre\n)\nSELECT music_genre, song_tally\nFROM GenreMetrics;", goal: "Project music metrics using explicit CTE signature column renaming." },
      { tbl: "GymMembers", target: "WITH PlanRoster(plan_type, enrolled_count, dues_collected) AS (\n  SELECT membership_plan, COUNT(*), SUM(monthly_fee)\n  FROM GymMembers\n  GROUP BY membership_plan\n)\nSELECT plan_type, enrolled_count\nFROM PlanRoster;", goal: "Explicitly rename gym plan aggregation columns in the CTE signature." },
      { tbl: "MovieReviews", target: "WITH FilmGenreAverages(genre_tag, review_count, avg_stars) AS (\n  SELECT genre, COUNT(*), AVG(star_rating)\n  FROM MovieReviews\n  GROUP BY genre\n)\nSELECT genre_tag, avg_stars\nFROM FilmGenreAverages;", goal: "Assign clean column aliases in the header signature of a film genre CTE." },
      { tbl: "FlightSchedule", target: "WITH HubVolume(hub_airport, departures_count) AS (\n  SELECT origin_airport, COUNT(*)\n  FROM FlightSchedule\n  GROUP BY origin_airport\n)\nSELECT hub_airport, departures_count\nFROM HubVolume\nORDER BY departures_count DESC;", goal: "Define explicit column names in an airport departure hub CTE." },
      { tbl: "PetClinic", target: "WITH SpeciesCensus(animal_species, patient_total, avg_kg) AS (\n  SELECT species, COUNT(*), AVG(weight_kg)\n  FROM PetClinic\n  GROUP BY species\n)\nSELECT animal_species, patient_total\nFROM SpeciesCensus;", goal: "Define explicit column signatures in a veterinary species census CTE." }
    ]
  },
  {
    range: [1121, 1130],
    subcluster: "12.3 Filtering against CTE Aggregated Metrics",
    level: "Level 2 (Aggregated CTE Filters)",
    blueprint: "WITH DeptAvg AS (\n  SELECT department, AVG(salary) AS avg_sal\n  FROM Employees\n  GROUP BY department\n)\nSELECT department, avg_sal\nFROM DeptAvg\nWHERE avg_sal >= 70000;",
    rule: "Aggregating in a CTE allows you to filter calculated metrics in the outer WHERE clause cleanly without needing complex HAVING syntax.",
    trap: "Trying to filter an alias in WHERE inside the same SELECT statement that created it; CTEs solve this by materializing the alias first.",
    topics: [
      { tbl: "Students", target: "WITH MajorAvg AS (\n  SELECT major, AVG(gpa) AS avg_gpa\n  FROM Students\n  GROUP BY major\n)\nSELECT major, avg_gpa\nFROM MajorAvg\nWHERE avg_gpa >= 3.6;", goal: "Compute average major GPA in a CTE, then filter for majors >= 3.6 in WHERE." },
      { tbl: "Books", target: "WITH AuthorCatalog AS (\n  SELECT author, COUNT(*) AS book_count, AVG(price) AS avg_price\n  FROM Books\n  GROUP BY author\n)\nSELECT author, book_count\nFROM AuthorCatalog\nWHERE book_count >= 2 AND avg_price < 25.00;", goal: "Filter prolific affordable authors using metrics pre-aggregated in a CTE." },
      { tbl: "Employees", target: "WITH DeptPayroll AS (\n  SELECT department, SUM(salary) AS total_payroll\n  FROM Employees\n  GROUP BY department\n)\nSELECT department, total_payroll\nFROM DeptPayroll\nWHERE total_payroll >= 250000;", goal: "Filter departments with payroll >= $250k using a pre-calculated CTE." },
      { tbl: "GroceryItems", target: "WITH CategoryAverages AS (\n  SELECT category, AVG(unit_price) AS avg_price\n  FROM GroceryItems\n  GROUP BY category\n)\nSELECT category, avg_price\nFROM CategoryAverages\nWHERE avg_price <= 4.00;", goal: "Filter budget grocery categories where average price is $4.00 or less via CTE." },
      { tbl: "Orders", target: "WITH CustomerSpend AS (\n  SELECT customer_name, SUM(total_amount) AS lifetime_val\n  FROM Orders\n  GROUP BY customer_name\n)\nSELECT customer_name, lifetime_val\nFROM CustomerSpend\nWHERE lifetime_val >= 1000.00;", goal: "Filter high-value customers with lifetime spend >= $1,000 using a CTE." },
      { tbl: "MusicTracks", target: "WITH ArtistProductivity AS (\n  SELECT artist_name, COUNT(*) AS track_count\n  FROM MusicTracks\n  GROUP BY artist_name\n)\nSELECT artist_name, track_count\nFROM ArtistProductivity\nWHERE track_count >= 5;", goal: "Identify prolific artists with 5+ tracks using a CTE aggregation filter." },
      { tbl: "GymMembers", target: "WITH PlanRevenue AS (\n  SELECT membership_plan, SUM(monthly_fee) AS plan_revenue\n  FROM GymMembers\n  GROUP BY membership_plan\n)\nSELECT membership_plan, plan_revenue\nFROM PlanRevenue\nWHERE plan_revenue >= 500.00;", goal: "Filter gym membership plans generating $500+ in monthly revenue via CTE." },
      { tbl: "MovieReviews", target: "WITH MovieScores AS (\n  SELECT movie_title, AVG(star_rating) AS avg_stars\n  FROM MovieReviews\n  GROUP BY movie_title\n)\nSELECT movie_title, avg_stars\nFROM MovieScores\nWHERE avg_stars >= 4.5;", goal: "Filter top-rated movies with an average rating of 4.5+ using a CTE." },
      { tbl: "FlightSchedule", target: "WITH RouteAverages AS (\n  SELECT origin_airport, AVG(distance_miles) AS avg_dist\n  FROM FlightSchedule\n  GROUP BY origin_airport\n)\nSELECT origin_airport, avg_dist\nFROM RouteAverages\nWHERE avg_dist >= 1000.0;", goal: "Filter airport hubs with average flight distance >= 1,000 miles via CTE." },
      { tbl: "PetClinic", target: "WITH SpeciesWeights AS (\n  SELECT species, AVG(weight_kg) AS avg_weight\n  FROM PetClinic\n  GROUP BY species\n)\nSELECT species, avg_weight\nFROM SpeciesWeights\nWHERE avg_weight >= 15.0;", goal: "Filter species categories where average patient weight >= 15kg using a CTE." }
    ]
  },
  {
    range: [1131, 1140],
    subcluster: "12.4 Chaining Multiple CTEs (cte1, cte2 Pipelines)",
    level: "Level 3 (Multi-CTE Chaining)",
    blueprint: "WITH FirstCTE AS (\n  SELECT col1, metric FROM TableA WHERE condition\n),\nSecondCTE AS (\n  SELECT col1, AVG(metric) AS avg_m FROM FirstCTE GROUP BY col1\n)\nSELECT *\nFROM SecondCTE;",
    rule: "Chain multiple CTEs by separating them with a single comma: 'WITH cte1 AS (...), cte2 AS (...)'. Never repeat the 'WITH' keyword!",
    trap: "Writing 'WITH cte1 AS (...) WITH cte2 AS (...)'. The WITH keyword is written only once at the very top.",
    topics: [
      { tbl: "Students", target: "WITH ActiveStudents AS (\n  SELECT student_id, full_name, gpa, major\n  FROM Students\n  WHERE enrolled_year >= 2023\n),\nMajorAverages AS (\n  SELECT major, AVG(gpa) AS major_avg_gpa\n  FROM ActiveStudents\n  GROUP BY major\n)\nSELECT major, major_avg_gpa\nFROM MajorAverages\nWHERE major_avg_gpa >= 3.5;", goal: "Chain two CTEs: first filter active students, then compute major averages from the first CTE." },
      { tbl: "Books", target: "WITH RecentBooks AS (\n  SELECT title, author, price\n  FROM Books\n  WHERE published_date >= '2020-01-01'\n),\nAuthorPricing AS (\n  SELECT author, AVG(price) AS avg_author_price\n  FROM RecentBooks\n  GROUP BY author\n)\nSELECT author, avg_author_price\nFROM AuthorPricing\nORDER BY avg_author_price DESC;", goal: "Chain two CTEs: filter recent publications, then calculate author average prices." },
      { tbl: "Employees", target: "WITH TechStaff AS (\n  SELECT first_name, department, salary\n  FROM Employees\n  WHERE department = 'Engineering'\n),\nDeptStats AS (\n  SELECT AVG(salary) AS eng_avg_salary\n  FROM TechStaff\n)\nSELECT first_name, salary\nFROM TechStaff, DeptStats\nWHERE salary > eng_avg_salary;", goal: "Chain two CTEs to compare individual engineers against engineering's average salary." },
      { tbl: "GroceryItems", target: "WITH InStockItems AS (\n  SELECT item_name, category, unit_price, stock_qty\n  FROM GroceryItems\n  WHERE stock_qty > 0\n),\nCategoryValuation AS (\n  SELECT category, SUM(stock_qty * unit_price) AS total_val\n  FROM InStockItems\n  GROUP BY category\n)\nSELECT category, total_val\nFROM CategoryValuation\nWHERE total_val > 500;", goal: "Chain two CTEs: filter in-stock grocery items, then aggregate category valuations." },
      { tbl: "Orders", target: "WITH ValidOrders AS (\n  SELECT order_id, customer_name, total_amount\n  FROM Orders\n  WHERE status = 'Completed'\n),\nTopCustomers AS (\n  SELECT customer_name, SUM(total_amount) AS customer_rev\n  FROM ValidOrders\n  GROUP BY customer_name\n)\nSELECT customer_name, customer_rev\nFROM TopCustomers\nORDER BY customer_rev DESC\nLIMIT 5;", goal: "Chain two CTEs: filter completed orders, then rank top customers by revenue." },
      { tbl: "MusicTracks", target: "WITH ModernTracks AS (\n  SELECT track_title, genre, duration_seconds\n  FROM MusicTracks\n  WHERE release_date >= '2020-01-01'\n),\nGenreLengths AS (\n  SELECT genre, AVG(duration_seconds) AS avg_sec\n  FROM ModernTracks\n  GROUP BY genre\n)\nSELECT genre, avg_sec\nFROM GenreLengths\nWHERE avg_sec > 200;", goal: "Chain two CTEs: isolate modern music tracks, then calculate average genre duration." },
      { tbl: "GymMembers", target: "WITH ActiveMembers AS (\n  SELECT member_name, membership_plan, attendance_days\n  FROM GymMembers\n  WHERE attendance_days >= 10\n),\nPlanAverages AS (\n  SELECT membership_plan, AVG(attendance_days) AS avg_days\n  FROM ActiveMembers\n  GROUP BY membership_plan\n)\nSELECT membership_plan, avg_days\nFROM PlanAverages;", goal: "Chain two CTEs: isolate active gym members, then compute plan attendance averages." },
      { tbl: "MovieReviews", target: "WITH ValidReviews AS (\n  SELECT movie_title, star_rating, genre\n  FROM MovieReviews\n  WHERE star_rating IS NOT NULL\n),\nGenreRatings AS (\n  SELECT genre, AVG(star_rating) AS avg_rating\n  FROM ValidReviews\n  GROUP BY genre\n)\nSELECT genre, avg_rating\nFROM GenreRatings\nORDER BY avg_rating DESC;", goal: "Chain two CTEs: filter non-null reviews, then compute genre rating averages." },
      { tbl: "FlightSchedule", target: "WITH DomesticFlights AS (\n  SELECT flight_id, origin_airport, destination_airport, distance_miles\n  FROM FlightSchedule\n  WHERE distance_miles <= 1500\n),\nHubMetrics AS (\n  SELECT origin_airport, COUNT(*) AS short_haul_count\n  FROM DomesticFlights\n  GROUP BY origin_airport\n)\nSELECT origin_airport, short_haul_count\nFROM HubMetrics\nORDER BY short_haul_count DESC;", goal: "Chain two CTEs: filter short-haul flights, then count departures per airport hub." },
      { tbl: "PetClinic", target: "WITH AdultPets AS (\n  SELECT pet_name, species, weight_kg\n  FROM PetClinic\n  WHERE age_years >= 2\n),\nSpeciesStats AS (\n  SELECT species, AVG(weight_kg) AS avg_adult_weight\n  FROM AdultPets\n  GROUP BY species\n)\nSELECT species, avg_adult_weight\nFROM SpeciesStats;", goal: "Chain two CTEs: isolate adult clinic pets, then calculate species average weights." }
    ]
  },
  {
    range: [1141, 1150],
    subcluster: "12.5 Joining CTEs in the Main Query",
    level: "Level 3 (Joined CTEs)",
    blueprint: "WITH SummaryA AS (\n  SELECT id, metric FROM TableA\n),\nSummaryB AS (\n  SELECT a_id, other_metric FROM TableB\n)\nSELECT a.metric, b.other_metric\nFROM SummaryA a\nJOIN SummaryB b ON a.id = b.a_id;",
    rule: "CTEs act as first-class relational tables. You can join a CTE to base tables, or join two independent CTEs together in the final SELECT statement.",
    trap: "Using an alias in the final query without defining it in FROM or JOIN.",
    topics: [
      { tbl: "Students", target: "WITH StudentList AS (\n  SELECT student_id, full_name FROM Students\n),\nCourseTotals AS (\n  SELECT student_id, COUNT(*) AS courses_enrolled FROM Courses GROUP BY student_id\n)\nSELECT s.full_name, c.courses_enrolled\nFROM StudentList s\nJOIN CourseTotals c ON s.student_id = c.student_id;", goal: "Join a student dimension CTE to a course aggregation CTE on student_id." },
      { tbl: "Books", target: "WITH BookCatalog AS (\n  SELECT book_id, title, author_id FROM Books\n),\nAuthorRoster AS (\n  SELECT author_id, author_name FROM Authors\n)\nSELECT b.title, a.author_name\nFROM BookCatalog b\nJOIN AuthorRoster a ON b.author_id = a.author_id;", goal: "Join two CTEs: BookCatalog and AuthorRoster on author_id." },
      { tbl: "Employees", target: "WITH StaffList AS (\n  SELECT employee_id, first_name, department_id, salary FROM Employees\n),\nDeptBudgets AS (\n  SELECT department_id, department_name, budget FROM Departments\n)\nSELECT s.first_name, d.department_name, s.salary\nFROM StaffList s\nJOIN DeptBudgets d ON s.department_id = d.department_id;", goal: "Join an employee CTE with a department budget CTE on department_id." },
      { tbl: "GroceryItems", target: "WITH InventoryList AS (\n  SELECT item_id, item_name, supplier_id, unit_price FROM GroceryItems\n),\nVendorDirectory AS (\n  SELECT supplier_id, supplier_name FROM Suppliers\n)\nSELECT i.item_name, v.supplier_name, i.unit_price\nFROM InventoryList i\nJOIN VendorDirectory v ON i.supplier_id = v.supplier_id;", goal: "Join an inventory CTE with a vendor directory CTE on supplier_id." },
      { tbl: "Orders", target: "WITH OrderSummary AS (\n  SELECT order_id, customer_id, total_amount FROM Orders\n),\nCustomerDetails AS (\n  SELECT customer_id, customer_name, city FROM Customers\n)\nSELECT c.customer_name, o.order_id, o.total_amount\nFROM CustomerDetails c\nJOIN OrderSummary o ON c.customer_id = o.customer_id;", goal: "Join an order summary CTE to a customer details CTE on customer_id." },
      { tbl: "MusicTracks", target: "WITH SongList AS (\n  SELECT track_id, track_title, album_id FROM MusicTracks\n),\nAlbumCatalog AS (\n  SELECT album_id, album_title, release_year FROM Albums\n)\nSELECT s.track_title, a.album_title, a.release_year\nFROM SongList s\nJOIN AlbumCatalog a ON s.album_id = a.album_id;", goal: "Join a track CTE with an album catalog CTE on album_id." },
      { tbl: "GymMembers", target: "WITH MemberRoster AS (\n  SELECT member_id, member_name, trainer_id FROM GymMembers\n),\nCoachRoster AS (\n  SELECT trainer_id, trainer_name, specialty FROM Trainers\n)\nSELECT m.member_name, c.trainer_name, c.specialty\nFROM MemberRoster m\nJOIN CoachRoster c ON m.trainer_id = c.trainer_id;", goal: "Join a gym member CTE with a trainer CTE on trainer_id." },
      { tbl: "MovieReviews", target: "WITH ReviewList AS (\n  SELECT review_id, movie_id, star_rating FROM MovieReviews\n),\nFilmArchive AS (\n  SELECT movie_id, movie_title, director FROM Movies\n)\nSELECT f.movie_title, r.star_rating, f.director\nFROM FilmArchive f\nJOIN ReviewList r ON f.movie_id = r.movie_id;", goal: "Join a film archive CTE with a review CTE on movie_id." },
      { tbl: "FlightSchedule", target: "WITH FlightLegs AS (\n  SELECT flight_id, airline_id, origin_airport FROM FlightSchedule\n),\nAirlineDirectory AS (\n  SELECT airline_id, airline_name FROM Airlines\n)\nSELECT f.flight_id, a.airline_name, f.origin_airport\nFROM FlightLegs f\nJOIN AirlineDirectory a ON f.airline_id = a.airline_id;", goal: "Join a flight legs CTE to an airline directory CTE on airline_id." },
      { tbl: "PetClinic", target: "WITH PatientRoster AS (\n  SELECT pet_id, pet_name, owner_id FROM PetClinic\n),\nOwnerDirectory AS (\n  SELECT owner_id, owner_name, emergency_phone FROM Owners\n)\nSELECT p.pet_name, o.owner_name, o.emergency_phone\nFROM PatientRoster p\nJOIN OwnerDirectory o ON p.owner_id = o.owner_id;", goal: "Join a patient roster CTE with an owner directory CTE on owner_id." }
    ]
  },
  {
    range: [1151, 1160],
    subcluster: "12.6 CTEs with Internal Joins",
    level: "Level 3 (CTE Internal Join)",
    blueprint: "WITH JoinedData AS (\n  SELECT a.col1, b.col2\n  FROM TableA a\n  JOIN TableB b ON a.id = b.a_id\n)\nSELECT col1, col2\nFROM JoinedData\nWHERE col1 = 'val';",
    rule: "Perform multi-table relational joins INSIDE the CTE definition to prepare a unified, flattened dataset, keeping the main query remarkably clean.",
    trap: "Overcomplicating the outer query when the complexity should have been encapsulated inside the CTE.",
    topics: [
      { tbl: "Students", target: "WITH EnrolledStudentDetails AS (\n  SELECT s.student_id, s.full_name, c.course_name, c.credits\n  FROM Students s\n  INNER JOIN Courses c ON s.student_id = c.student_id\n)\nSELECT full_name, course_name\nFROM EnrolledStudentDetails\nWHERE credits >= 4;", goal: "Encapsulate a student-course INNER JOIN inside a CTE, then filter for 4-credit courses." },
      { tbl: "Books", target: "WITH BookAuthorPairs AS (\n  SELECT b.title, a.author_name, a.country, b.price\n  FROM Books b\n  INNER JOIN Authors a ON b.author_id = a.author_id\n)\nSELECT title, author_name\nFROM BookAuthorPairs\nWHERE country = 'UK' AND price < 20.00;", goal: "Join books and authors inside a CTE, then filter for affordable UK books." },
      { tbl: "Employees", target: "WITH StaffDepartments AS (\n  SELECT e.first_name, e.salary, d.department_name, d.budget\n  FROM Employees e\n  INNER JOIN Departments d ON e.department_id = d.department_id\n)\nSELECT first_name, department_name\nFROM StaffDepartments\nWHERE salary > 75000;", goal: "Join employees and departments inside a CTE, then filter high earners." },
      { tbl: "GroceryItems", target: "WITH InventorySuppliers AS (\n  SELECT g.item_name, g.unit_price, s.supplier_name, s.contact_phone\n  FROM GroceryItems g\n  INNER JOIN Suppliers s ON g.supplier_id = s.supplier_id\n)\nSELECT item_name, supplier_name\nFROM InventorySuppliers\nWHERE unit_price < 5.00;", goal: "Join grocery inventory and suppliers inside a CTE, then project budget products." },
      { tbl: "Orders", target: "WITH CustomerOrders AS (\n  SELECT o.order_id, c.customer_name, c.city, o.total_amount\n  FROM Orders o\n  INNER JOIN Customers c ON o.customer_id = c.customer_id\n)\nSELECT customer_name, order_id, total_amount\nFROM CustomerOrders\nWHERE city = 'Chicago';", goal: "Join orders and customers inside a CTE, then query Chicago orders." },
      { tbl: "MusicTracks", target: "WITH TrackAlbumDetails AS (\n  SELECT t.track_title, a.album_title, a.release_year, t.duration_seconds\n  FROM MusicTracks t\n  INNER JOIN Albums a ON t.album_id = a.album_id\n)\nSELECT track_title, album_title\nFROM TrackAlbumDetails\nWHERE release_year >= 2022;", goal: "Join tracks and albums inside a CTE, then filter modern releases." },
      { tbl: "GymMembers", target: "WITH MemberCoachSchedule AS (\n  SELECT m.member_name, tr.trainer_name, tr.specialty, m.membership_plan\n  FROM GymMembers m\n  INNER JOIN Trainers tr ON m.trainer_id = tr.trainer_id\n)\nSELECT member_name, trainer_name\nFROM MemberCoachSchedule\nWHERE membership_plan = 'VIP';", goal: "Join members and coaches inside a CTE, then filter VIP client assignments." },
      { tbl: "MovieReviews", target: "WITH FilmReviewProfiles AS (\n  SELECT m.movie_title, m.director, r.star_rating, r.review_text\n  FROM Movies m\n  INNER JOIN MovieReviews r ON m.movie_id = r.movie_id\n)\nSELECT movie_title, director, star_rating\nFROM FilmReviewProfiles\nWHERE star_rating >= 4;", goal: "Join movies and reviews inside a CTE, then query 4+ star films." },
      { tbl: "FlightSchedule", target: "WITH ActiveFlightCarriers AS (\n  SELECT f.flight_id, al.airline_name, f.origin_airport, f.status\n  FROM FlightSchedule f\n  INNER JOIN Airlines al ON f.airline_id = al.airline_id\n)\nSELECT flight_id, airline_name\nFROM ActiveFlightCarriers\nWHERE status = 'On-Time';", goal: "Join flights and airlines inside a CTE, then query on-time departures." },
      { tbl: "PetClinic", target: "WITH ClinicPatientProfiles AS (\n  SELECT p.pet_name, p.species, o.owner_name, o.emergency_phone\n  FROM PetClinic p\n  INNER JOIN Owners o ON p.owner_id = o.owner_id\n)\nSELECT pet_name, owner_name, emergency_phone\nFROM ClinicPatientProfiles\nWHERE species = 'Canine';", goal: "Join pets and owners inside a CTE, then query canine emergency contacts." }
    ]
  },
  {
    range: [1161, 1170],
    subcluster: "12.7 CTEs with CASE WHEN Categorization",
    level: "Level 3 (CTE with CASE Logic)",
    blueprint: "WITH Categorized AS (\n  SELECT col1,\n    CASE WHEN metric > 100 THEN 'High' ELSE 'Low' END AS tier\n  FROM table_name\n)\nSELECT tier, COUNT(*)\nFROM Categorized\nGROUP BY tier;",
    rule: "Assign descriptive categories using CASE WHEN inside a CTE, then cleanly group, count, or filter by those newly created category names in the outer query.",
    trap: "Trying to GROUP BY a CASE expression directly can get messy; encapsulating the CASE inside a CTE gives clean, legible grouping.",
    topics: [
      { tbl: "Students", target: "WITH AcademicTiers AS (\n  SELECT full_name, gpa,\n    CASE WHEN gpa >= 3.8 THEN 'High Honors' WHEN gpa >= 3.5 THEN 'Honors' ELSE 'Standard' END AS academic_standing\n  FROM Students\n)\nSELECT academic_standing, COUNT(*) AS student_count\nFROM AcademicTiers\nGROUP BY academic_standing;", goal: "Categorize students by GPA in a CTE, then aggregate headcounts per academic standing tier." },
      { tbl: "Books", target: "WITH PriceTiers AS (\n  SELECT title, price,\n    CASE WHEN price >= 30.00 THEN 'Premium' WHEN price >= 15.00 THEN 'Standard' ELSE 'Budget' END AS price_bracket\n  FROM Books\n)\nSELECT price_bracket, COUNT(*) AS title_count\nFROM PriceTiers\nGROUP BY price_bracket;", goal: "Segment book prices into brackets in a CTE, then count titles per bracket." },
      { tbl: "Employees", target: "WITH SalaryBands AS (\n  SELECT first_name, salary,\n    CASE WHEN salary >= 90000 THEN 'Senior Band' WHEN salary >= 60000 THEN 'Mid Band' ELSE 'Junior Band' END AS comp_tier\n  FROM Employees\n)\nSELECT comp_tier, COUNT(*) AS headcount, AVG(salary) AS band_avg\nFROM SalaryBands\nGROUP BY comp_tier;", goal: "Bucket employees into compensation bands inside a CTE and compute band stats." },
      { tbl: "GroceryItems", target: "WITH StockHealth AS (\n  SELECT item_name, stock_qty,\n    CASE WHEN stock_qty < 10 THEN 'Critical' WHEN stock_qty < 30 THEN 'Low' ELSE 'Adequate' END AS inventory_status\n  FROM GroceryItems\n)\nSELECT inventory_status, COUNT(*) AS sku_count\nFROM StockHealth\nGROUP BY inventory_status;", goal: "Segment inventory stock health inside a CTE and tally SKUs per status." },
      { tbl: "Orders", target: "WITH OrderTiers AS (\n  SELECT order_id, total_amount,\n    CASE WHEN total_amount >= 500.00 THEN 'High Value' WHEN total_amount >= 100.00 THEN 'Medium Value' ELSE 'Low Value' END AS value_tier\n  FROM Orders\n)\nSELECT value_tier, COUNT(*) AS order_volume, SUM(total_amount) AS tier_revenue\nFROM OrderTiers\nGROUP BY value_tier;", goal: "Bucket customer orders into value tiers in a CTE and compute tier revenues." },
      { tbl: "MusicTracks", target: "WITH TrackLengths AS (\n  SELECT track_title, duration_seconds,\n    CASE WHEN duration_seconds >= 300 THEN 'Epic' WHEN duration_seconds >= 180 THEN 'Standard' ELSE 'Short' END AS track_length_type\n  FROM MusicTracks\n)\nSELECT track_length_type, COUNT(*) AS song_count\nFROM TrackLengths\nGROUP BY track_length_type;", goal: "Categorize track lengths inside a CTE and compute song counts per length type." },
      { tbl: "GymMembers", target: "WITH CommitmentLevels AS (\n  SELECT member_name, attendance_days,\n    CASE WHEN attendance_days >= 20 THEN 'Dedicated' WHEN attendance_days >= 8 THEN 'Regular' ELSE 'Casual' END AS commitment_tier\n  FROM GymMembers\n)\nSELECT commitment_tier, COUNT(*) AS member_count\nFROM CommitmentLevels\nGROUP BY commitment_tier;", goal: "Classify member gym commitment in a CTE, then group by loyalty tier." },
      { tbl: "MovieReviews", target: "WITH ReviewSentiment AS (\n  SELECT movie_title, star_rating,\n    CASE WHEN star_rating >= 4 THEN 'Positive' WHEN star_rating = 3 THEN 'Mixed' ELSE 'Negative' END AS sentiment_label\n  FROM MovieReviews\n)\nSELECT sentiment_label, COUNT(*) AS review_count\nFROM ReviewSentiment\nGROUP BY sentiment_label;", goal: "Map review star ratings to sentiment labels in a CTE and tally review counts." },
      { tbl: "FlightSchedule", target: "WITH RouteHauls AS (\n  SELECT flight_id, distance_miles,\n    CASE WHEN distance_miles >= 2500 THEN 'Long Haul' WHEN distance_miles >= 800 THEN 'Medium Haul' ELSE 'Short Haul' END AS haul_category\n  FROM FlightSchedule\n)\nSELECT haul_category, COUNT(*) AS flight_count\nFROM RouteHauls\nGROUP BY haul_category;", goal: "Segment flight distances into haul categories inside a CTE and tally flights." },
      { tbl: "PetClinic", target: "WITH PatientSizeClass AS (\n  SELECT pet_name, weight_kg,\n    CASE WHEN weight_kg >= 30.0 THEN 'Large' WHEN weight_kg >= 10.0 THEN 'Medium' ELSE 'Small' END AS patient_size\n  FROM PetClinic\n)\nSELECT patient_size, COUNT(*) AS pet_count\nFROM PatientSizeClass\nGROUP BY patient_size;", goal: "Classify veterinary patient weights into size classes in a CTE and group counts." }
    ]
  },
  {
    range: [1171, 1180],
    subcluster: "12.8 Recursive CTE Foundations (Sequences & Counting)",
    level: "Level 3 (Recursive CTE Sequence)",
    blueprint: "WITH RECURSIVE NumberSeq AS (\n  SELECT 1 AS num\n  UNION ALL\n  SELECT num + 1 FROM NumberSeq WHERE num < 10\n)\nSELECT num FROM NumberSeq;",
    rule: "Recursive CTEs reference themselves to generate data iteratively. They consist of an Anchor member, a UNION ALL, and a Recursive member with a termination condition.",
    trap: "Forgetting the termination condition (e.g. 'WHERE num < 10') causes an infinite recursion loop and triggers max recursion errors.",
    topics: [
      { tbl: "Students", target: "WITH RECURSIVE SemesterSeq AS (\n  SELECT 1 AS semester_num\n  UNION ALL\n  SELECT semester_num + 1 FROM SemesterSeq WHERE semester_num < 8\n)\nSELECT semester_num FROM SemesterSeq;", goal: "Generate an 8-semester academic progression sequence (1 to 8) using a recursive CTE." },
      { tbl: "Books", target: "WITH RECURSIVE EditionNumbers AS (\n  SELECT 1 AS edition_num\n  UNION ALL\n  SELECT edition_num + 1 FROM EditionNumbers WHERE edition_num < 5\n)\nSELECT edition_num FROM EditionNumbers;", goal: "Generate edition volume numbers (1 to 5) via recursive CTE." },
      { tbl: "Employees", target: "WITH RECURSIVE PayLevels AS (\n  SELECT 1 AS pay_grade\n  UNION ALL\n  SELECT pay_grade + 1 FROM PayLevels WHERE pay_grade < 10\n)\nSELECT pay_grade FROM PayLevels;", goal: "Generate corporate salary pay grades 1 through 10 using a recursive CTE sequence." },
      { tbl: "GroceryItems", target: "WITH RECURSIVE AisleGenerator AS (\n  SELECT 1 AS aisle_number\n  UNION ALL\n  SELECT aisle_number + 1 FROM AisleGenerator WHERE aisle_number < 12\n)\nSELECT aisle_number FROM AisleGenerator;", goal: "Generate supermarket aisle numbers 1 through 12 using recursive SQL." },
      { tbl: "Orders", target: "WITH RECURSIVE DaysOfMonth AS (\n  SELECT 1 AS day_of_month\n  UNION ALL\n  SELECT day_of_month + 1 FROM DaysOfMonth WHERE day_of_month < 31\n)\nSELECT day_of_month FROM DaysOfMonth;", goal: "Generate a sequence of calendar days 1 to 31 for calendar date spine generation." },
      { tbl: "MusicTracks", target: "WITH RECURSIVE TrackTracklist AS (\n  SELECT 1 AS track_number\n  UNION ALL\n  SELECT track_number + 1 FROM TrackTracklist WHERE track_number < 15\n)\nSELECT track_number FROM TrackTracklist;", goal: "Generate an album tracklist sequence from track 1 to 15." },
      { tbl: "GymMembers", target: "WITH RECURSIVE WorkoutDays AS (\n  SELECT 1 AS workout_day\n  UNION ALL\n  SELECT workout_day + 1 FROM WorkoutDays WHERE workout_day < 30\n)\nSELECT workout_day FROM WorkoutDays;", goal: "Generate a 30-day fitness challenge calendar sequence using recursive CTE." },
      { tbl: "MovieReviews", target: "WITH RECURSIVE StarScale AS (\n  SELECT 1 AS rating_star\n  UNION ALL\n  SELECT rating_star + 1 FROM StarScale WHERE rating_star < 5\n)\nSELECT rating_star FROM StarScale;", goal: "Generate the 1-to-5 star rating scale using a recursive CTE sequence." },
      { tbl: "FlightSchedule", target: "WITH RECURSIVE TerminalGates AS (\n  SELECT 1 AS gate_number\n  UNION ALL\n  SELECT gate_number + 1 FROM TerminalGates WHERE gate_number < 20\n)\nSELECT gate_number FROM TerminalGates;", goal: "Generate airport terminal gate sequence numbers 1 to 20 via recursion." },
      { tbl: "PetClinic", target: "WITH RECURSIVE RecoveryDays AS (\n  SELECT 1 AS post_op_day\n  UNION ALL\n  SELECT post_op_day + 1 FROM RecoveryDays WHERE post_op_day < 14\n)\nSELECT post_op_day FROM RecoveryDays;", goal: "Generate a 14-day post-surgery veterinary recovery timeline sequence." }
    ]
  },
  {
    range: [1181, 1190],
    subcluster: "12.9 Recursive CTEs for Hierarchies (Tree Traversal)",
    level: "Level 3 (Recursive Hierarchy Tree)",
    blueprint: "WITH RECURSIVE OrgTree AS (\n  SELECT emp_id, manager_id, 1 AS depth\n  FROM Employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.emp_id, e.manager_id, t.depth + 1\n  FROM Employees e JOIN OrgTree t ON e.manager_id = t.emp_id\n)\nSELECT * FROM OrgTree;",
    rule: "Navigate organizational reporting hierarchies or category trees recursively, calculating reporting depth or lineage at each level.",
    trap: "Ensure the anchor member finds true root nodes (e.g. manager_id IS NULL) and the recursive join matches parent-to-child IDs correctly.",
    topics: [
      { tbl: "Employees", target: "WITH RECURSIVE OrgHierarchy AS (\n  SELECT employee_id, first_name, manager_id, 1 AS org_level\n  FROM Employees\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.employee_id, e.first_name, e.manager_id, o.org_level + 1\n  FROM Employees e\n  INNER JOIN OrgHierarchy o ON e.manager_id = o.employee_id\n)\nSELECT employee_id, first_name, org_level\nFROM OrgHierarchy\nORDER BY org_level ASC;", goal: "Traverse the corporate management hierarchy from CEO (level 1) downwards using a recursive CTE." },
      { tbl: "Students", target: "WITH RECURSIVE MentorshipTree AS (\n  SELECT student_id, full_name, mentor_id, 1 AS mentor_tier\n  FROM Students\n  WHERE mentor_id IS NULL\n  UNION ALL\n  SELECT s.student_id, s.full_name, s.mentor_id, m.mentor_tier + 1\n  FROM Students s\n  INNER JOIN MentorshipTree m ON s.mentor_id = m.student_id\n)\nSELECT student_id, full_name, mentor_tier\nFROM MentorshipTree;", goal: "Traverse student peer mentorship lineage from founding mentor downwards." },
      { tbl: "Books", target: "WITH RECURSIVE BookSeries AS (\n  SELECT book_id, title, prequel_book_id, 1 AS book_order\n  FROM Books\n  WHERE prequel_book_id IS NULL\n  UNION ALL\n  SELECT b.book_id, b.title, b.prequel_book_id, s.book_order + 1\n  FROM Books b\n  INNER JOIN BookSeries s ON b.prequel_book_id = s.book_id\n)\nSELECT title, book_order\nFROM BookSeries;", goal: "Trace literary book series chronology from volume 1 to sequels via recursive CTE." },
      { tbl: "GroceryItems", target: "WITH RECURSIVE CategoryTaxonomy AS (\n  SELECT category_id, category_name, parent_cat_id, 1 AS tree_depth\n  FROM Categories\n  WHERE parent_cat_id IS NULL\n  UNION ALL\n  SELECT c.category_id, c.category_name, c.parent_cat_id, t.tree_depth + 1\n  FROM Categories c\n  INNER JOIN CategoryTaxonomy t ON c.parent_cat_id = t.category_id\n)\nSELECT category_name, tree_depth\nFROM CategoryTaxonomy;", goal: "Traverse supermarket category taxonomy from top-level department downwards." },
      { tbl: "Orders", target: "WITH RECURSIVE OrderChain AS (\n  SELECT order_id, parent_order_id, 1 AS reorder_cycle\n  FROM Orders\n  WHERE parent_order_id IS NULL\n  UNION ALL\n  SELECT o.order_id, o.parent_order_id, c.reorder_cycle + 1\n  FROM Orders o\n  INNER JOIN OrderChain c ON o.parent_order_id = c.order_id\n)\nSELECT order_id, reorder_cycle\nFROM OrderChain;", goal: "Trace recurring subscription reorder chains from initial checkout via recursive CTE." },
      { tbl: "MusicTracks", target: "WITH RECURSIVE TrackRemixes AS (\n  SELECT track_id, track_title, original_track_id, 1 AS generation\n  FROM MusicTracks\n  WHERE original_track_id IS NULL\n  UNION ALL\n  SELECT t.track_id, t.track_title, t.original_track_id, r.generation + 1\n  FROM MusicTracks t\n  INNER JOIN TrackRemixes r ON t.original_track_id = r.track_id\n)\nSELECT track_title, generation\nFROM TrackRemixes;", goal: "Trace music track genealogy from original master recording through remix generations." },
      { tbl: "GymMembers", target: "WITH RECURSIVE ReferralTree AS (\n  SELECT member_id, member_name, referred_by_id, 1 AS referral_depth\n  FROM GymMembers\n  WHERE referred_by_id IS NULL\n  UNION ALL\n  SELECT m.member_id, m.member_name, m.referred_by_id, r.referral_depth + 1\n  FROM GymMembers m\n  INNER JOIN ReferralTree r ON m.referred_by_id = r.member_id\n)\nSELECT member_name, referral_depth\nFROM ReferralTree;", goal: "Trace member referral network depth from original founding member." },
      { tbl: "MovieReviews", target: "WITH RECURSIVE FranchiseTree AS (\n  SELECT movie_id, movie_title, predecessor_id, 1 AS franchise_entry\n  FROM Movies\n  WHERE predecessor_id IS NULL\n  UNION ALL\n  SELECT m.movie_id, m.movie_title, m.predecessor_id, f.franchise_entry + 1\n  FROM Movies m\n  INNER JOIN FranchiseTree f ON m.predecessor_id = f.movie_id\n)\nSELECT movie_title, franchise_entry\nFROM FranchiseTree;", goal: "Trace movie franchise release sequence from original classic through sequels." },
      { tbl: "FlightSchedule", target: "WITH RECURSIVE FlightItinerary AS (\n  SELECT flight_id, origin_airport, destination_airport, inbound_flight_id, 1 AS leg_num\n  FROM FlightSchedule\n  WHERE inbound_flight_id IS NULL\n  UNION ALL\n  SELECT f.flight_id, f.origin_airport, f.destination_airport, f.inbound_flight_id, i.leg_num + 1\n  FROM FlightSchedule f\n  INNER JOIN FlightItinerary i ON f.inbound_flight_id = i.flight_id\n)\nSELECT flight_id, origin_airport, destination_airport, leg_num\nFROM FlightItinerary;", goal: "Trace connecting flight itineraries leg by leg using a recursive CTE." },
      { tbl: "PetClinic", target: "WITH RECURSIVE PetPedigree AS (\n  SELECT pet_id, pet_name, mother_pet_id, 1 AS generation_level\n  FROM PetClinic\n  WHERE mother_pet_id IS NULL\n  UNION ALL\n  SELECT p.pet_id, p.pet_name, p.mother_pet_id, g.generation_level + 1\n  FROM PetClinic p\n  INNER JOIN PetPedigree g ON p.mother_pet_id = g.pet_id\n)\nSELECT pet_name, generation_level\nFROM PetPedigree;", goal: "Trace veterinary animal pedigree generations recursively." }
    ]
  },
  {
    range: [1191, 1200],
    subcluster: "12.10 End-to-End Enterprise CTE Analytics Pipelines",
    level: "Level 3 (CTE Analytics Master)",
    blueprint: "WITH Stage1 AS (\n  SELECT col1, col2, metric FROM TableA WHERE filter = 'val'\n),\nStage2 AS (\n  SELECT col1, COUNT(*) AS count_val, SUM(metric) AS sum_val\n  FROM Stage1 GROUP BY col1\n)\nSELECT col1, count_val, sum_val\nFROM Stage2\nWHERE sum_val > 500\nORDER BY sum_val DESC\nLIMIT 5;",
    rule: "Synthesize filtering, pre-aggregations, multi-CTE transformations, and final presentation sorting into professional enterprise analytics pipelines.",
    trap: "Putting everything in one massive unreadable query. Break complex business logic into clean modular stages using CTEs.",
    topics: [
      { tbl: "Students", target: "WITH HonorStudents AS (\n  SELECT student_id, full_name, gpa, major\n  FROM Students\n  WHERE gpa >= 3.5\n),\nMajorMetrics AS (\n  SELECT major, COUNT(*) AS honor_count, AVG(gpa) AS avg_honor_gpa\n  FROM HonorStudents\n  GROUP BY major\n)\nSELECT major, honor_count, avg_honor_gpa\nFROM MajorMetrics\nWHERE honor_count >= 2\nORDER BY avg_honor_gpa DESC\nLIMIT 5;", goal: "Multi-stage CTE pipeline: Identify top academic majors with 2+ honor students." },
      { tbl: "Books", target: "WITH RecentReleases AS (\n  SELECT book_id, title, author_id, price\n  FROM Books\n  WHERE published_date >= '2022-01-01'\n),\nAuthorRevenues AS (\n  SELECT author_id, COUNT(*) AS recent_titles, AVG(price) AS avg_price\n  FROM RecentReleases\n  GROUP BY author_id\n)\nSELECT a.author_name, r.recent_titles, r.avg_price\nFROM AuthorRevenues r\nJOIN Authors a ON r.author_id = a.author_id\nWHERE r.recent_titles >= 2\nORDER BY r.avg_price DESC\nLIMIT 5;", goal: "Multi-stage CTE pipeline: Rank prolific authors with multiple recent releases." },
      { tbl: "Employees", target: "WITH ActiveStaff AS (\n  SELECT employee_id, first_name, department_id, salary\n  FROM Employees\n  WHERE salary >= 60000\n),\nDeptAggregates AS (\n  SELECT department_id, COUNT(*) AS senior_count, AVG(salary) AS avg_senior_sal\n  FROM ActiveStaff\n  GROUP BY department_id\n)\nSELECT d.department_name, da.senior_count, da.avg_senior_sal\nFROM DeptAggregates da\nJOIN Departments d ON da.department_id = d.department_id\nWHERE da.senior_count >= 3\nORDER BY da.avg_senior_sal DESC\nLIMIT 3;", goal: "Multi-stage CTE pipeline: Analyze departments with 3+ senior employees." },
      { tbl: "GroceryItems", target: "WITH PerishableGoods AS (\n  SELECT item_id, item_name, supplier_id, stock_qty, unit_price\n  FROM GroceryItems\n  WHERE expiry_date <= CURRENT_DATE + INTERVAL 14 DAY\n),\nSupplierRisk AS (\n  SELECT supplier_id, COUNT(*) AS at_risk_items, SUM(stock_qty * unit_price) AS at_risk_value\n  FROM PerishableGoods\n  GROUP BY supplier_id\n)\nSELECT s.supplier_name, r.at_risk_items, r.at_risk_value\nFROM SupplierRisk r\nJOIN Suppliers s ON r.supplier_id = s.supplier_id\nWHERE r.at_risk_value > 200.00\nORDER BY r.at_risk_value DESC\nLIMIT 5;", goal: "Multi-stage CTE pipeline: Identify suppliers with >$200 in expiring inventory." },
      { tbl: "Orders", target: "WITH CompletedOrders AS (\n  SELECT order_id, customer_id, total_amount, order_date\n  FROM Orders\n  WHERE status = 'Completed'\n),\nCustomerLTV AS (\n  SELECT customer_id, COUNT(*) AS order_count, SUM(total_amount) AS ltv\n  FROM CompletedOrders\n  GROUP BY customer_id\n)\nSELECT c.customer_name, c.city, l.order_count, l.ltv\nFROM CustomerLTV l\nJOIN Customers c ON l.customer_id = c.customer_id\nWHERE l.ltv >= 1000.00\nORDER BY l.ltv DESC\nLIMIT 5;", goal: "Multi-stage CTE pipeline: Calculate Customer Lifetime Value (LTV >= $1,000) on completed orders." },
      { tbl: "MusicTracks", target: "WITH CatalogTracks AS (\n  SELECT track_id, track_title, album_id, duration_seconds\n  FROM MusicTracks\n  WHERE duration_seconds >= 180\n),\nAlbumRuntimes AS (\n  SELECT album_id, COUNT(*) AS qualifying_tracks, SUM(duration_seconds) AS total_sec\n  FROM CatalogTracks\n  GROUP BY album_id\n)\nSELECT a.album_title, a.genre, r.qualifying_tracks, r.total_sec\nFROM AlbumRuntimes r\nJOIN Albums a ON r.album_id = a.album_id\nWHERE r.qualifying_tracks >= 5\nORDER BY r.total_sec DESC\nLIMIT 5;", goal: "Multi-stage CTE pipeline: Find top albums with 5+ full-length tracks." },
      { tbl: "GymMembers", target: "WITH FrequentGymGoers AS (\n  SELECT member_id, member_name, trainer_id, attendance_days\n  FROM GymMembers\n  WHERE attendance_days >= 15\n),\nTrainerSuccess AS (\n  SELECT trainer_id, COUNT(*) AS dedicated_client_count\n  FROM FrequentGymGoers\n  GROUP BY trainer_id\n)\nSELECT tr.trainer_name, tr.specialty, ts.dedicated_client_count\nFROM TrainerSuccess ts\nJOIN Trainers tr ON ts.trainer_id = tr.trainer_id\nWHERE ts.dedicated_client_count >= 2\nORDER BY ts.dedicated_client_count DESC\nLIMIT 3;", goal: "Multi-stage CTE pipeline: Identify top coaches by dedicated client volume." },
      { tbl: "MovieReviews", target: "WITH AcclaimedReviews AS (\n  SELECT review_id, movie_id, star_rating\n  FROM MovieReviews\n  WHERE star_rating >= 4\n),\nMoviePerformance AS (\n  SELECT movie_id, COUNT(*) AS positive_reviews, AVG(star_rating) AS avg_stars\n  FROM AcclaimedReviews\n  GROUP BY movie_id\n)\nSELECT m.movie_title, m.director, p.positive_reviews, p.avg_stars\nFROM MoviePerformance p\nJOIN Movies m ON p.movie_id = m.movie_id\nWHERE p.positive_reviews >= 3\nORDER BY p.avg_stars DESC\nLIMIT 5;", goal: "Multi-stage CTE pipeline: Rank films with 3+ positive reviews by average stars." },
      { tbl: "FlightSchedule", target: "WITH OnTimeDepartures AS (\n  SELECT flight_id, airline_id, origin_airport, distance_miles\n  FROM FlightSchedule\n  WHERE status = 'On-Time'\n),\nAirlineReliability AS (\n  SELECT airline_id, COUNT(*) AS on_time_flights, AVG(distance_miles) AS avg_distance\n  FROM OnTimeDepartures\n  GROUP BY airline_id\n)\nSELECT al.airline_name, ar.on_time_flights, ar.avg_distance\nFROM AirlineReliability ar\nJOIN Airlines al ON ar.airline_id = al.airline_id\nWHERE ar.on_time_flights >= 5\nORDER BY ar.on_time_flights DESC\nLIMIT 5;", goal: "Multi-stage CTE pipeline: Rank most reliable airlines operating 5+ on-time flights." },
      { tbl: "PetClinic", target: "WITH SeniorPatients AS (\n  SELECT pet_id, pet_name, owner_id, species, weight_kg\n  FROM PetClinic\n  WHERE age_years >= 8\n),\nHouseholdCare AS (\n  SELECT owner_id, COUNT(*) AS senior_pet_count, AVG(weight_kg) AS avg_kg\n  FROM SeniorPatients\n  GROUP BY owner_id\n)\nSELECT o.owner_name, o.city, h.senior_pet_count, h.avg_kg\nFROM HouseholdCare h\nJOIN Owners o ON h.owner_id = o.owner_id\nWHERE h.senior_pet_count >= 2\nORDER BY h.senior_pet_count DESC\nLIMIT 5;", goal: "Multi-stage CTE pipeline: Identify households caring for multiple senior pets (8+ years)." }
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
        schemaSnippet: `${t.tbl} relational schema`,
        targetQuery: q,
        syntaxBlueprint: c.blueprint,
        syntaxRule: c.rule,
        syntaxTrap: c.trap,
        eli5Story: `Subqueries & CTEs on ${t.tbl}: ${t.goal}`,
        commonMistakes: "Forgetting to alias derived tables in FROM, writing multiple WITH keywords in multi-CTE pipelines, or suffering the NOT IN NULL trap.",
        learningOutcomes: `Mastered ${c.subcluster} on ${t.tbl}.`,
        challengeSlots: makeSlots(q)
      });
    });
  });
  console.log(`Topic ${topicNum}: Generated ${drills.length} drills (Drill #${drills[0].drillNumber} to #${drills[drills.length - 1].drillNumber})`);
  return drills;
}

const drillsT11 = processClusters(clustersT11, 11);
const drillsT12 = processClusters(clustersT12, 12);

fs.writeFileSync('scratch/syntax_drills_t11.json', JSON.stringify(drillsT11, null, 2));
fs.writeFileSync('scratch/syntax_drills_t12.json', JSON.stringify(drillsT12, null, 2));

console.log('Successfully generated all 200 Subquery & CTE drills!');
