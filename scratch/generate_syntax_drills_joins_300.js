// Generator for Section 0: The SQL Syntax Gym — 300 Relational Join Micro-Drills
// Topics 7, 8, & 9 (Drills #601 to #900) across 10 everyday relatable schemas.

const fs = require('fs');

const tables = ['Students', 'Books', 'Employees', 'GroceryItems', 'Orders', 'MusicTracks', 'GymMembers', 'MovieReviews', 'FlightSchedule', 'PetClinic'];

function makeSlots(query) {
  return query.split(/\s+/).filter(Boolean).map(tok => {
    let type = "column";
    const clean = tok.toUpperCase().replace(/[(),;]/g, '');
    if (["SELECT", "FROM", "WHERE", "GROUP", "BY", "HAVING", "ORDER", "ASC", "DESC", "LIMIT", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "OUTER", "CROSS", "ON", "AS", "AND", "OR", "NOT", "IS", "NULL", "COUNT", "SUM", "AVG", "MIN", "MAX", "DISTINCT", "BETWEEN", "UNION", "ALL", "CASE", "WHEN", "THEN", "ELSE", "END"].includes(clean)) {
      type = "keyword";
    } else if (tables.some(t => tok.includes(t)) || ["COURSES", "AUTHORS", "DEPARTMENTS", "SUPPLIERS", "CUSTOMERS", "ORDERITEMS", "ALBUMS", "TRAINERS", "MOVIES", "AIRLINES", "OWNERS", "CLASSES", "GRADES", "SALARYGRADES"].includes(clean)) {
      type = "table";
    }
    return { type, value: tok };
  });
}

// =============================================================================
// TOPIC 7: RELATIONAL JOINS CORE (Drills #601 to #700)
// =============================================================================
const clustersT7 = [
  {
    range: [601, 610],
    subcluster: "7.1 Basic INNER JOIN with Key Equality",
    level: "Level 1 (Inner Join)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nINNER JOIN TableB b ON a.key = b.key;",
    rule: "INNER JOIN returns only rows that have matching values in both tables based on the ON predicate.",
    trap: "Forgetting the ON clause entirely, which results in an unintended Cartesian CROSS JOIN.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id;", goal: "Match enrolled students with their registered courses using an INNER JOIN." },
      { tbl: "Books", target: "SELECT b.title, a.author_name\nFROM Books b\nINNER JOIN Authors a ON b.author_id = a.author_id;", goal: "Join books with authors on author_id to view titles and creator names." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name\nFROM Employees e\nINNER JOIN Departments d ON e.department_id = d.department_id;", goal: "Match employees to their assigned department name via department_id." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name\nFROM GroceryItems g\nINNER JOIN Suppliers s ON g.supplier_id = s.supplier_id;", goal: "Pair inventory grocery items with their official supplier company." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name\nFROM Orders o\nINNER JOIN Customers c ON o.customer_id = c.customer_id;", goal: "Match customer orders with registered buyer names on customer_id." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title\nFROM MusicTracks t\nINNER JOIN Albums a ON t.album_id = a.album_id;", goal: "Pair music tracks with their parent album title on album_id." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name\nFROM GymMembers m\nINNER JOIN Trainers tr ON m.trainer_id = tr.trainer_id;", goal: "Match gym members with their assigned personal fitness trainer." },
      { tbl: "MovieReviews", target: "SELECT r.review_text, m.movie_title\nFROM MovieReviews r\nINNER JOIN Movies m ON r.movie_id = m.movie_id;", goal: "Join review comments with movie titles using movie_id." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name\nFROM FlightSchedule f\nINNER JOIN Airlines al ON f.airline_id = al.airline_id;", goal: "Match scheduled flight records with operating airline carrier names." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name\nFROM PetClinic p\nINNER JOIN Owners o ON p.owner_id = o.owner_id;", goal: "Pair clinic veterinary patients with their registered pet owner names." }
    ]
  },
  {
    range: [611, 620],
    subcluster: "7.2 Concise Table Aliasing Practice",
    level: "Level 1 (Table Aliases)",
    blueprint: "SELECT alias1.col, alias2.col\nFROM TableA alias1\nJOIN TableB alias2 ON alias1.id = alias2.a_id;",
    rule: "Assign short table aliases in the FROM and JOIN clauses to keep multi-table references compact and readable.",
    trap: "Using an alias in the SELECT clause before defining it in FROM or JOIN will trigger an 'Unknown table alias' error.",
    topics: [
      { tbl: "Students", target: "SELECT stu.student_id, stu.full_name, crs.course_name\nFROM Students stu\nJOIN Courses crs ON stu.student_id = crs.student_id;", goal: "Practice clean multi-character aliasing ('stu' and 'crs') joining students and courses." },
      { tbl: "Books", target: "SELECT bk.isbn, bk.title, aut.country\nFROM Books bk\nJOIN Authors aut ON bk.author_id = aut.author_id;", goal: "Alias books as 'bk' and authors as 'aut' to retrieve ISBN, title, and country." },
      { tbl: "Employees", target: "SELECT emp.emp_id, emp.first_name, dep.budget\nFROM Employees emp\nJOIN Departments dep ON emp.department_id = dep.department_id;", goal: "Use aliases 'emp' and 'dep' to project staff ID and department budget." },
      { tbl: "GroceryItems", target: "SELECT itm.item_name, sup.contact_phone\nFROM GroceryItems itm\nJOIN Suppliers sup ON itm.supplier_id = sup.supplier_id;", goal: "Alias grocery items as 'itm' and suppliers as 'sup' to fetch supplier phone numbers." },
      { tbl: "Orders", target: "SELECT ord.order_id, ord.order_date, cust.email\nFROM Orders ord\nJOIN Customers cust ON ord.customer_id = cust.customer_id;", goal: "Use descriptive aliases 'ord' and 'cust' to retrieve order date and customer email." },
      { tbl: "MusicTracks", target: "SELECT trk.track_title, alb.release_year\nFROM MusicTracks trk\nJOIN Albums alb ON trk.album_id = alb.album_id;", goal: "Alias tracks as 'trk' and albums as 'alb' to inspect release years." },
      { tbl: "GymMembers", target: "SELECT mem.member_name, trn.specialty\nFROM GymMembers mem\nJOIN Trainers trn ON mem.trainer_id = trn.trainer_id;", goal: "Alias members as 'mem' and trainers as 'trn' to review trainer certifications." },
      { tbl: "MovieReviews", target: "SELECT rev.star_rating, mov.director\nFROM MovieReviews rev\nJOIN Movies mov ON rev.movie_id = mov.movie_id;", goal: "Alias reviews as 'rev' and movies as 'mov' to correlate star ratings with directors." },
      { tbl: "FlightSchedule", target: "SELECT flt.flight_id, air.callsign\nFROM FlightSchedule flt\nJOIN Airlines air ON flt.airline_id = air.airline_id;", goal: "Alias flights as 'flt' and airlines as 'air' to retrieve radio callsigns." },
      { tbl: "PetClinic", target: "SELECT pet.pet_name, own.emergency_phone\nFROM PetClinic pet\nJOIN Owners own ON pet.owner_id = own.owner_id;", goal: "Use aliases 'pet' and 'own' to display pet names with emergency contact numbers." }
    ]
  },
  {
    range: [621, 630],
    subcluster: "7.3 Column Qualification & Disambiguation",
    level: "Level 1 (Column Ambiguity)",
    blueprint: "SELECT a.common_id, a.col1, b.col2\nFROM TableA a\nJOIN TableB b ON a.common_id = b.common_id;",
    rule: "When two joined tables share identical column names (e.g. id, name, created_at), you MUST prefix the column with the table alias to prevent 'column ambiguously defined' errors.",
    trap: "Selecting 'id' without a table prefix when both tables have an 'id' column.",
    topics: [
      { tbl: "Students", target: "SELECT s.student_id, s.full_name, c.created_at\nFROM Students s\nJOIN Courses c ON s.student_id = c.student_id;", goal: "Disambiguate the shared 'created_at' timestamp by explicitly prefixing 'c.created_at'." },
      { tbl: "Books", target: "SELECT b.book_id, b.title, a.author_id\nFROM Books b\nJOIN Authors a ON b.author_id = a.author_id;", goal: "Explicitly qualify 'b.book_id' and 'a.author_id' to prevent ambiguous identifier conflicts." },
      { tbl: "Employees", target: "SELECT e.employee_id, e.first_name, d.department_id, d.name AS dept_name\nFROM Employees e\nJOIN Departments d ON e.department_id = d.department_id;", goal: "Disambiguate department_id by qualifying table origin on both sides." },
      { tbl: "GroceryItems", target: "SELECT g.item_id, g.item_name, s.supplier_id\nFROM GroceryItems g\nJOIN Suppliers s ON g.supplier_id = s.supplier_id;", goal: "Qualify primary and foreign keys with table prefixes to guarantee unambiguous queries." },
      { tbl: "Orders", target: "SELECT o.order_id, o.status, c.customer_id, c.city\nFROM Orders o\nJOIN Customers c ON o.customer_id = c.customer_id;", goal: "Disambiguate status and location columns across orders and customers." },
      { tbl: "MusicTracks", target: "SELECT t.track_id, t.track_title, a.album_id, a.genre\nFROM MusicTracks t\nJOIN Albums a ON t.album_id = a.album_id;", goal: "Qualify track and album identifiers explicitly with table abbreviations." },
      { tbl: "GymMembers", target: "SELECT m.member_id, m.member_name, tr.trainer_id\nFROM GymMembers m\nJOIN Trainers tr ON m.trainer_id = tr.trainer_id;", goal: "Disambiguate member and trainer primary keys with 'm.' and 'tr.' prefixes." },
      { tbl: "MovieReviews", target: "SELECT r.review_id, r.star_rating, m.movie_id, m.release_year\nFROM MovieReviews r\nJOIN Movies m ON r.movie_id = m.movie_id;", goal: "Select explicit qualified identifiers from both MovieReviews and Movies." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, f.departure_time, al.airline_id\nFROM FlightSchedule f\nJOIN Airlines al ON f.airline_id = al.airline_id;", goal: "Qualify flight and airline identifiers to prevent query engine ambiguity." },
      { tbl: "PetClinic", target: "SELECT p.pet_id, p.pet_name, o.owner_id, o.city\nFROM PetClinic p\nJOIN Owners o ON p.owner_id = o.owner_id;", goal: "Disambiguate pet and owner identification numbers with qualified aliases." }
    ]
  },
  {
    range: [631, 640],
    subcluster: "7.4 LEFT JOIN (Preserving Unmatched Left Rows)",
    level: "Level 2 (Left Outer Join)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nLEFT JOIN TableB b ON a.id = b.a_id;",
    rule: "LEFT JOIN returns ALL records from the left table, and the matched records from the right table. If no match exists, NULLs are returned for right-table columns.",
    trap: "Assuming LEFT JOIN filters out records with no match. It keeps all left rows intact.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name\nFROM Students s\nLEFT JOIN Courses c ON s.student_id = c.student_id;", goal: "Show all enrolled students, including those not yet registered for any courses (returns NULL for course_name)." },
      { tbl: "Books", target: "SELECT b.title, a.author_name\nFROM Books b\nLEFT JOIN Authors a ON b.author_id = a.author_id;", goal: "List all catalog books, preserving anonymous or missing author records." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name\nFROM Employees e\nLEFT JOIN Departments d ON e.department_id = d.department_id;", goal: "List all employees, including new hires without an assigned department." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name\nFROM GroceryItems g\nLEFT JOIN Suppliers s ON g.supplier_id = s.supplier_id;", goal: "Retrieve all grocery inventory items, showing NULL for unassigned suppliers." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name\nFROM Orders o\nLEFT JOIN Customers c ON o.customer_id = c.customer_id;", goal: "List all orders, preserving guest checkouts where customer_id has no registered account." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title\nFROM MusicTracks t\nLEFT JOIN Albums a ON t.album_id = a.album_id;", goal: "List all music tracks, including standalone promotional singles without an album." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name\nFROM GymMembers m\nLEFT JOIN Trainers tr ON m.trainer_id = tr.trainer_id;", goal: "Display all gym members, displaying NULL for members who train independently." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, r.review_text\nFROM Movies m\nLEFT JOIN MovieReviews r ON m.movie_id = r.movie_id;", goal: "Show all movies, including newly released films that have zero reviews yet." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name\nFROM FlightSchedule f\nLEFT JOIN Airlines al ON f.airline_id = al.airline_id;", goal: "List all scheduled flight legs, including chartered flights without commercial airline codes." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name\nFROM PetClinic p\nLEFT JOIN Owners o ON p.owner_id = o.owner_id;", goal: "Display all clinic animals, preserving rescue strays that do not have a registered owner." }
    ]
  },
  {
    range: [641, 650],
    subcluster: "7.5 RIGHT JOIN Mechanics & Directional Awareness",
    level: "Level 2 (Right Outer Join)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nRIGHT JOIN TableB b ON a.id = b.a_id;",
    rule: "RIGHT JOIN returns ALL records from the right table, and matching records from the left table. Any unmatched left rows are filled with NULLs.",
    trap: "RIGHT JOIN is conceptually identical to reversing the table order in a LEFT JOIN; industry standard prefers LEFT JOIN for mental readability.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name\nFROM Students s\nRIGHT JOIN Courses c ON s.student_id = c.student_id;", goal: "Retrieve all courses using RIGHT JOIN, ensuring courses with zero enrolled students are still displayed." },
      { tbl: "Books", target: "SELECT b.title, a.author_name\nFROM Books b\nRIGHT JOIN Authors a ON b.author_id = a.author_id;", goal: "List all authors via RIGHT JOIN, including contracted writers who haven't published a book yet." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name\nFROM Employees e\nRIGHT JOIN Departments d ON e.department_id = d.department_id;", goal: "List all corporate departments via RIGHT JOIN, highlighting departments with zero assigned staff." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name\nFROM GroceryItems g\nRIGHT JOIN Suppliers s ON g.supplier_id = s.supplier_id;", goal: "Show all suppliers using RIGHT JOIN, including newly contracted vendors with no stock items yet." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name\nFROM Orders o\nRIGHT JOIN Customers c ON o.customer_id = c.customer_id;", goal: "List all registered customers using RIGHT JOIN to view accounts with zero purchases." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title\nFROM MusicTracks t\nRIGHT JOIN Albums a ON t.album_id = a.album_id;", goal: "Display all studio albums using RIGHT JOIN, including unreleased albums with no tracklist." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name\nFROM GymMembers m\nRIGHT JOIN Trainers tr ON m.trainer_id = tr.trainer_id;", goal: "Show all gym trainers via RIGHT JOIN, identifying coaches who currently have no active clients." },
      { tbl: "MovieReviews", target: "SELECT r.star_rating, m.movie_title\nFROM MovieReviews r\nRIGHT JOIN Movies m ON r.movie_id = m.movie_id;", goal: "Preserve all movie titles using RIGHT JOIN to inspect unreviewed releases." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name\nFROM FlightSchedule f\nRIGHT JOIN Airlines al ON f.airline_id = al.airline_id;", goal: "List all airline partners using RIGHT JOIN, including regional carriers with no flights today." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name\nFROM PetClinic p\nRIGHT JOIN Owners o ON p.owner_id = o.owner_id;", goal: "Display all registered pet owners using RIGHT JOIN, identifying clients whose pets are not in the clinic." }
    ]
  },
  {
    range: [651, 660],
    subcluster: "7.6 Joining with Row-Level WHERE Filtering",
    level: "Level 2 (Joined WHERE Filters)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nJOIN TableB b ON a.id = b.a_id\nWHERE a.status = 'active' AND b.metric > 100;",
    rule: "The WHERE clause executes AFTER the JOIN matches rows, allowing you to filter the combined result set on columns from either table.",
    trap: "Placing a WHERE filter on a LEFT JOIN's right table (e.g. WHERE b.status = 'active') inadvertently converts it to an INNER JOIN because NULLs are excluded.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id\nWHERE s.gpa >= 3.5;", goal: "Find honor students (GPA >= 3.5) and their enrolled courses using an INNER JOIN with WHERE." },
      { tbl: "Books", target: "SELECT b.title, a.author_name\nFROM Books b\nINNER JOIN Authors a ON b.author_id = a.author_id\nWHERE a.country = 'UK';", goal: "Filter books written exclusively by British authors using a joined WHERE filter." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name\nFROM Employees e\nINNER JOIN Departments d ON e.department_id = d.department_id\nWHERE e.salary > 75000;", goal: "Identify high-earning staff members making over $75,000 and their departments." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name\nFROM GroceryItems g\nINNER JOIN Suppliers s ON g.supplier_id = s.supplier_id\nWHERE g.unit_price < 5.00;", goal: "Retrieve budget grocery items priced under $5.00 along with their suppliers." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name, o.shipping_city\nFROM Orders o\nINNER JOIN Customers c ON o.customer_id = c.customer_id\nWHERE o.shipping_city = 'Chicago';", goal: "Filter joined customer orders destined specifically for Chicago." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title\nFROM MusicTracks t\nINNER JOIN Albums a ON t.album_id = a.album_id\nWHERE a.release_year >= 2020;", goal: "Find music tracks belonging to modern albums released in 2020 or later." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name\nFROM GymMembers m\nINNER JOIN Trainers tr ON m.trainer_id = tr.trainer_id\nWHERE m.membership_plan = 'VIP';", goal: "Show VIP gym members and their dedicated personal trainers." },
      { tbl: "MovieReviews", target: "SELECT r.review_text, m.movie_title\nFROM MovieReviews r\nINNER JOIN Movies m ON r.movie_id = m.movie_id\nWHERE r.star_rating = 5;", goal: "Retrieve perfect 5-star movie reviews paired with film titles." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name\nFROM FlightSchedule f\nINNER JOIN Airlines al ON f.airline_id = al.airline_id\nWHERE f.status = 'Delayed';", goal: "Identify all currently delayed flights along with the operating airline carrier." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name\nFROM PetClinic p\nINNER JOIN Owners o ON p.owner_id = o.owner_id\nWHERE p.species = 'Canine';", goal: "Filter clinic records for canine patients and their registered owners." }
    ]
  },
  {
    range: [661, 670],
    subcluster: "7.7 Sorting Joined Data Across Both Tables (ORDER BY)",
    level: "Level 2 (Joined Ordering)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nJOIN TableB b ON a.id = b.a_id\nORDER BY a.name ASC, b.metric DESC;",
    rule: "In joined queries, ORDER BY can sort by columns from table A, table B, or any combination of both.",
    trap: "Sorting by an unqualified column name that exists in both tables will throw an ambiguity error.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id\nORDER BY s.full_name ASC, c.course_name ASC;", goal: "Order enrolled students alphabetically by student name, then by course name." },
      { tbl: "Books", target: "SELECT b.title, a.author_name\nFROM Books b\nINNER JOIN Authors a ON b.author_id = a.author_id\nORDER BY a.author_name ASC, b.title ASC;", goal: "Sort library catalog primarily by author name, then by book title." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name, e.salary\nFROM Employees e\nINNER JOIN Departments d ON e.department_id = d.department_id\nORDER BY d.department_name ASC, e.salary DESC;", goal: "List employees grouped by department name and sorted by highest salary first." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name, g.unit_price\nFROM GroceryItems g\nINNER JOIN Suppliers s ON g.supplier_id = s.supplier_id\nORDER BY s.supplier_name ASC, g.unit_price ASC;", goal: "Sort grocery inventory by supplier name, then by cheapest item first." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name, o.order_id\nFROM Orders o\nINNER JOIN Customers c ON o.customer_id = c.customer_id\nORDER BY c.customer_name ASC, o.order_id DESC;", goal: "Order customer orders alphabetically by customer name, then by newest order ID." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title, t.duration_seconds\nFROM MusicTracks t\nINNER JOIN Albums a ON t.album_id = a.album_id\nORDER BY a.album_title ASC, t.duration_seconds DESC;", goal: "Sort music tracks by album title, then by longest track duration." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name, m.join_date\nFROM GymMembers m\nINNER JOIN Trainers tr ON m.trainer_id = tr.trainer_id\nORDER BY tr.trainer_name ASC, m.join_date ASC;", goal: "Order members by trainer name, then by most veteran membership join date." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, r.star_rating\nFROM MovieReviews r\nINNER JOIN Movies m ON r.movie_id = m.movie_id\nORDER BY m.movie_title ASC, r.star_rating DESC;", goal: "Order reviews alphabetically by film title, then by highest star rating first." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name, f.departure_time\nFROM FlightSchedule f\nINNER JOIN Airlines al ON f.airline_id = al.airline_id\nORDER BY al.airline_name ASC, f.departure_time ASC;", goal: "Sort flight schedule by airline name, then chronologically by departure time." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name, p.weight_kg\nFROM PetClinic p\nINNER JOIN Owners o ON p.owner_id = o.owner_id\nORDER BY o.owner_name ASC, p.weight_kg DESC;", goal: "Sort veterinary patients by owner name, then by heaviest pet first." }
    ]
  },
  {
    range: [671, 680],
    subcluster: "7.8 Slicing Joined Results with LIMIT",
    level: "Level 2 (Joined Slicing)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nJOIN TableB b ON a.id = b.a_id\nORDER BY b.ranking DESC\nLIMIT 5;",
    rule: "LIMIT restricts the final row count of the joined output after all ON matching, WHERE filtering, and ORDER BY sorting are applied.",
    trap: "Using LIMIT without ORDER BY returns non-deterministic results.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id\nORDER BY s.student_id ASC\nLIMIT 5;", goal: "Retrieve the first 5 joined student enrollment records." },
      { tbl: "Books", target: "SELECT b.title, a.author_name\nFROM Books b\nINNER JOIN Authors a ON b.author_id = a.author_id\nORDER BY b.published_year DESC\nLIMIT 3;", goal: "Find the 3 most recently published books along with their author names." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name, e.salary\nFROM Employees e\nINNER JOIN Departments d ON e.department_id = d.department_id\nORDER BY e.salary DESC\nLIMIT 5;", goal: "Identify the top 5 highest-paid employees across all corporate departments." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name, g.unit_price\nFROM GroceryItems g\nINNER JOIN Suppliers s ON g.supplier_id = s.supplier_id\nORDER BY g.unit_price DESC\nLIMIT 10;", goal: "Find the 10 most expensive inventory items and their supplying vendors." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name\nFROM Orders o\nINNER JOIN Customers c ON o.customer_id = c.customer_id\nORDER BY o.order_id DESC\nLIMIT 5;", goal: "Display the 5 most recent customer orders with buyer details." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title, t.duration_seconds\nFROM MusicTracks t\nINNER JOIN Albums a ON t.album_id = a.album_id\nORDER BY t.duration_seconds DESC\nLIMIT 3;", goal: "Find the 3 longest music tracks and their corresponding album titles." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name, m.join_date\nFROM GymMembers m\nINNER JOIN Trainers tr ON m.trainer_id = tr.trainer_id\nORDER BY m.join_date DESC\nLIMIT 5;", goal: "Retrieve the 5 newest gym members and their assigned fitness trainers." },
      { tbl: "MovieReviews", target: "SELECT r.review_text, m.movie_title, r.star_rating\nFROM MovieReviews r\nINNER JOIN Movies m ON r.movie_id = m.movie_id\nORDER BY r.star_rating DESC\nLIMIT 5;", goal: "Find the top 5 highest-rated film reviews in the cinema database." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name, f.departure_time\nFROM FlightSchedule f\nINNER JOIN Airlines al ON f.airline_id = al.airline_id\nORDER BY f.departure_time ASC\nLIMIT 10;", goal: "List the next 10 upcoming flight departures with carrier names." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name, p.age_years\nFROM PetClinic p\nINNER JOIN Owners o ON p.owner_id = o.owner_id\nORDER BY p.age_years DESC\nLIMIT 3;", goal: "Find the 3 oldest pet patients registered in the veterinary clinic." }
    ]
  },
  {
    range: [681, 690],
    subcluster: "7.9 NULL Checks on Outer Joins",
    level: "Level 2 (Outer Join NULL Checking)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nLEFT JOIN TableB b ON a.id = b.a_id\nWHERE b.a_id IS NOT NULL;",
    rule: "Evaluating IS NULL or IS NOT NULL on joined columns allows you to test for presence or absence of related relational data.",
    trap: "Using '= NULL' instead of 'IS NULL' will always evaluate to UNKNOWN and return zero rows.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name\nFROM Students s\nLEFT JOIN Courses c ON s.student_id = c.student_id\nWHERE c.course_name IS NOT NULL;", goal: "Verify students with confirmed active course registrations using IS NOT NULL." },
      { tbl: "Books", target: "SELECT b.title, a.author_name\nFROM Books b\nLEFT JOIN Authors a ON b.author_id = a.author_id\nWHERE a.author_name IS NOT NULL;", goal: "Filter catalog books that have a confirmed verified author record." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name\nFROM Employees e\nLEFT JOIN Departments d ON e.department_id = d.department_id\nWHERE d.department_name IS NOT NULL;", goal: "List employees who are successfully assigned to an active department." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name\nFROM GroceryItems g\nLEFT JOIN Suppliers s ON g.supplier_id = s.supplier_id\nWHERE s.supplier_name IS NOT NULL;", goal: "Retrieve grocery items that have a verified supplier contact registered." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name\nFROM Orders o\nLEFT JOIN Customers c ON o.customer_id = c.customer_id\nWHERE c.customer_name IS NOT NULL;", goal: "Find orders placed by registered verified customers (excluding guest checkouts)." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title\nFROM MusicTracks t\nLEFT JOIN Albums a ON t.album_id = a.album_id\nWHERE a.album_title IS NOT NULL;", goal: "Filter music tracks that belong to a known official album release." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name\nFROM GymMembers m\nLEFT JOIN Trainers tr ON m.trainer_id = tr.trainer_id\nWHERE tr.trainer_name IS NOT NULL;", goal: "Find gym members who are actively assigned to a personal fitness trainer." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, r.review_text\nFROM Movies m\nLEFT JOIN MovieReviews r ON m.movie_id = r.movie_id\nWHERE r.review_text IS NOT NULL;", goal: "List movies that have at least one written review in the archive." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name\nFROM FlightSchedule f\nLEFT JOIN Airlines al ON f.airline_id = al.airline_id\nWHERE al.airline_name IS NOT NULL;", goal: "Filter scheduled flights operating under a certified commercial airline." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name\nFROM PetClinic p\nLEFT JOIN Owners o ON p.owner_id = o.owner_id\nWHERE o.owner_name IS NOT NULL;", goal: "Find clinic animal records that have a verified pet owner on file." }
    ]
  },
  {
    range: [691, 700],
    subcluster: "7.10 Two-Table Lifecycle Production Queries",
    level: "Level 2 (Comprehensive 2-Table Queries)",
    blueprint: "SELECT a.col1, b.col2\nFROM TableA a\nJOIN TableB b ON a.id = b.a_id\nWHERE a.filter = 'val'\nORDER BY b.val DESC\nLIMIT 5;",
    rule: "Combine projection, aliasing, join key equality, predicate filtering, ordering, and slicing into a full production query.",
    trap: "Mismatched join keys (e.g. joining on name instead of ID) causing incorrect data pairing.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name, c.credits\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id\nWHERE c.credits >= 3\nORDER BY s.full_name ASC\nLIMIT 10;", goal: "Retrieve up to 10 students enrolled in courses with 3 or more credits." },
      { tbl: "Books", target: "SELECT b.title, a.author_name, b.price\nFROM Books b\nINNER JOIN Authors a ON b.author_id = a.author_id\nWHERE b.price < 20.00\nORDER BY b.price ASC\nLIMIT 5;", goal: "Find the 5 most affordable books under $20.00 with their author names." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name, e.salary\nFROM Employees e\nINNER JOIN Departments d ON e.department_id = d.department_id\nWHERE d.department_name = 'Engineering'\nORDER BY e.salary DESC\nLIMIT 3;", goal: "Find the top 3 highest earners in the Engineering department." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name, g.stock_qty\nFROM GroceryItems g\nINNER JOIN Suppliers s ON g.supplier_id = s.supplier_id\nWHERE g.stock_qty < 15\nORDER BY g.stock_qty ASC\nLIMIT 5;", goal: "Identify the 5 lowest-stock grocery items needing urgent replenishment." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name, o.total_amount\nFROM Orders o\nINNER JOIN Customers c ON o.customer_id = c.customer_id\nWHERE o.status = 'Completed'\nORDER BY o.total_amount DESC\nLIMIT 5;", goal: "Find the top 5 highest-value completed customer orders." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title, t.genre\nFROM MusicTracks t\nINNER JOIN Albums a ON t.album_id = a.album_id\nWHERE t.genre = 'Rock'\nORDER BY t.track_title ASC\nLIMIT 10;", goal: "Retrieve the first 10 Rock music tracks and their album titles." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name, m.membership_plan\nFROM GymMembers m\nINNER JOIN Trainers tr ON m.trainer_id = tr.trainer_id\nWHERE m.membership_plan = 'Gold'\nORDER BY m.member_name ASC\nLIMIT 5;", goal: "List the first 5 Gold gym members and their dedicated personal trainers." },
      { tbl: "MovieReviews", target: "SELECT r.review_text, m.movie_title, r.star_rating\nFROM MovieReviews r\nINNER JOIN Movies m ON r.movie_id = m.movie_id\nWHERE r.star_rating >= 4\nORDER BY r.star_rating DESC\nLIMIT 5;", goal: "Retrieve 5 top-rated reviews with 4 or more stars." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name, f.origin_airport\nFROM FlightSchedule f\nINNER JOIN Airlines al ON f.airline_id = al.airline_id\nWHERE f.origin_airport = 'JFK'\nORDER BY f.flight_id ASC\nLIMIT 5;", goal: "Find the first 5 scheduled flight departures from airport 'JFK'." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name, p.species\nFROM PetClinic p\nINNER JOIN Owners o ON p.owner_id = o.owner_id\nWHERE p.species = 'Feline'\nORDER BY p.pet_name ASC\nLIMIT 5;", goal: "Retrieve the first 5 feline patient records along with their owner names." }
    ]
  }
];

// =============================================================================
// TOPIC 8: ADVANCED JOINS & STRUCTURAL PATTERNS (Drills #701 to #800)
// =============================================================================
const clustersT8 = [
  {
    range: [701, 710],
    subcluster: "8.1 CROSS JOIN (Cartesian Matrices)",
    level: "Level 2 (Cartesian Join)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nCROSS JOIN TableB b;",
    rule: "CROSS JOIN pairs every single row in Table A with every row in Table B, generating N x M combinations without requiring an ON clause.",
    trap: "Running CROSS JOIN on large tables can accidentally generate millions of rows and crash the database memory.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name\nFROM Students s\nCROSS JOIN Courses c;", goal: "Generate a complete curriculum matrix pairing every student with every available course." },
      { tbl: "Books", target: "SELECT b.title, a.country\nFROM Books b\nCROSS JOIN Authors a;", goal: "Create a matrix of all book titles paired with every author origin country." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name\nFROM Employees e\nCROSS JOIN Departments d;", goal: "Generate an exploratory matrix of every employee paired with every department." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name\nFROM GroceryItems g\nCROSS JOIN Suppliers s;", goal: "Map every inventory item against every potential supplier in the vendor directory." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name\nFROM Orders o\nCROSS JOIN Customers c\nLIMIT 20;", goal: "Generate sample pairing combinations between orders and customer accounts." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title\nFROM MusicTracks t\nCROSS JOIN Albums a\nLIMIT 25;", goal: "Form a combinatorial grid of music tracks and album concepts." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name\nFROM GymMembers m\nCROSS JOIN Trainers tr;", goal: "Produce a roster pairing every member with every available gym trainer for workshop scheduling." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, r.reviewer_name\nFROM Movies m\nCROSS JOIN MovieReviews r\nLIMIT 20;", goal: "Generate potential film-to-critic assignment pairings via CROSS JOIN." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name\nFROM FlightSchedule f\nCROSS JOIN Airlines al\nLIMIT 20;", goal: "Map flight route numbers against all potential codeshare airline partners." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, v.vet_name\nFROM PetClinic p\nCROSS JOIN Vets v;", goal: "Generate a consultation matrix pairing every clinic pet with every staff veterinarian." }
    ]
  },
  {
    range: [711, 720],
    subcluster: "8.2 SELF JOIN for Hierarchies (Manager-Employee)",
    level: "Level 3 (Hierarchical Self Join)",
    blueprint: "SELECT e.first_name AS employee, m.first_name AS manager\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.employee_id;",
    rule: "A table can be joined to itself by using two distinct aliases to navigate parent-child or manager-employee hierarchical structures.",
    trap: "Using an INNER JOIN for self-joins on hierarchies will silently discard the top-level CEO/Director because their manager_id is NULL.",
    topics: [
      { tbl: "Employees", target: "SELECT e.first_name AS employee_name, m.first_name AS manager_name\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.employee_id;", goal: "Pair each employee with their direct manager's name using a hierarchical SELF JOIN." },
      { tbl: "Students", target: "SELECT s.full_name AS student_name, m.full_name AS mentor_name\nFROM Students s\nLEFT JOIN Students m ON s.mentor_id = m.student_id;", goal: "Match students with their senior peer mentor using a SELF JOIN on mentor_id." },
      { tbl: "Books", target: "SELECT b.title AS sequel_title, orig.title AS original_title\nFROM Books b\nLEFT JOIN Books orig ON b.prequel_book_id = orig.book_id;", goal: "Match book sequels with their original prequel titles using a SELF JOIN." },
      { tbl: "GroceryItems", target: "SELECT item.item_name AS bundle_item, base.item_name AS base_product\nFROM GroceryItems item\nLEFT JOIN GroceryItems base ON item.parent_item_id = base.item_id;", goal: "Link grocery bundle packs to their individual base products using a SELF JOIN." },
      { tbl: "Orders", target: "SELECT curr.order_id AS reorder_id, prev.order_id AS initial_order_id\nFROM Orders curr\nLEFT JOIN Orders prev ON curr.parent_order_id = prev.order_id;", goal: "Connect recurring subscription orders back to the initial checkout order." },
      { tbl: "MusicTracks", target: "SELECT t.track_title AS remix_title, orig.track_title AS original_song\nFROM MusicTracks t\nLEFT JOIN MusicTracks orig ON t.original_track_id = orig.track_id;", goal: "Pair remix tracks with their original studio recordings using a SELF JOIN." },
      { tbl: "GymMembers", target: "SELECT m.member_name AS referred_member, ref.member_name AS referring_sponsor\nFROM GymMembers m\nLEFT JOIN GymMembers ref ON m.referred_by_id = ref.member_id;", goal: "Trace referral bonuses by joining gym members with their referring friend." },
      { tbl: "MovieReviews", target: "SELECT f.movie_title AS sequel_name, p.movie_title AS predecessor_name\nFROM Movies f\nLEFT JOIN Movies p ON f.predecessor_id = p.movie_id;", goal: "Connect movie sequels to their franchise predecessors via SELF JOIN." },
      { tbl: "FlightSchedule", target: "SELECT leg2.flight_id AS connecting_flight, leg1.flight_id AS inbound_flight\nFROM FlightSchedule leg2\nLEFT JOIN FlightSchedule leg1 ON leg2.inbound_flight_id = leg1.flight_id;", goal: "Trace connecting flight legs back to inbound arrival flights via SELF JOIN." },
      { tbl: "PetClinic", target: "SELECT puppy.pet_name AS offspring, mother.pet_name AS mother_name\nFROM PetClinic puppy\nLEFT JOIN PetClinic mother ON puppy.mother_pet_id = mother.pet_id;", goal: "Trace animal pedigree by matching clinic offspring with registered mother pets." }
    ]
  },
  {
    range: [721, 730],
    subcluster: "8.3 SELF JOIN for Peer Pairing & Comparison",
    level: "Level 3 (Peer Self Join)",
    blueprint: "SELECT a.name, b.name, a.department\nFROM Employees a\nJOIN Employees b ON a.department = b.department AND a.id < b.id;",
    rule: "Join a table to itself on a shared attribute while enforcing 'a.id < b.id' to pair distinct peers without duplicate reverse pairs (A-B vs B-A) or self-matching (A-A).",
    trap: "Using 'a.id != b.id' pairs rows twice (Alice-Bob and Bob-Alice). Use '<' to generate unique combinations.",
    topics: [
      { tbl: "Students", target: "SELECT s1.full_name AS student_1, s2.full_name AS student_2, s1.major\nFROM Students s1\nJOIN Students s2 ON s1.major = s2.major AND s1.student_id < s2.student_id;", goal: "Find unique pairs of students who share the exact same major using 's1.student_id < s2.student_id'." },
      { tbl: "Books", target: "SELECT b1.title AS book_1, b2.title AS book_2, b1.author_id\nFROM Books b1\nJOIN Books b2 ON b1.author_id = b2.author_id AND b1.book_id < b2.book_id;", goal: "Pair books written by the same author to recommend companion reads." },
      { tbl: "Employees", target: "SELECT e1.first_name AS staff_1, e2.first_name AS staff_2, e1.department_id\nFROM Employees e1\nJOIN Employees e2 ON e1.department_id = e2.department_id AND e1.employee_id < e2.employee_id;", goal: "Form unique peer buddy pairs of employees working in the same department." },
      { tbl: "GroceryItems", target: "SELECT g1.item_name AS item_1, g2.item_name AS item_2, g1.category\nFROM GroceryItems g1\nJOIN GroceryItems g2 ON g1.category = g2.category AND g1.item_id < g2.item_id;", goal: "Pair grocery items belonging to the same category for comparative price audits." },
      { tbl: "Orders", target: "SELECT o1.order_id AS order_1, o2.order_id AS order_2, o1.customer_id\nFROM Orders o1\nJOIN Orders o2 ON o1.customer_id = o2.customer_id AND o1.order_id < o2.order_id;", goal: "Identify repeat buyers by pairing multiple orders placed by the same customer." },
      { tbl: "MusicTracks", target: "SELECT t1.track_title AS track_1, t2.track_title AS track_2, t1.album_id\nFROM MusicTracks t1\nJOIN MusicTracks t2 ON t1.album_id = t2.album_id AND t1.track_id < t2.track_id;", goal: "Pair songs appearing on the same music album." },
      { tbl: "GymMembers", target: "SELECT m1.member_name AS member_1, m2.member_name AS member_2, m1.membership_plan\nFROM GymMembers m1\nJOIN GymMembers m2 ON m1.membership_plan = m2.membership_plan AND m1.member_id < m2.member_id;", goal: "Form peer accountability pairs of gym members on the same membership plan." },
      { tbl: "MovieReviews", target: "SELECT r1.review_id AS rev_1, r2.review_id AS rev_2, r1.movie_id\nFROM MovieReviews r1\nJOIN MovieReviews r2 ON r1.movie_id = r2.movie_id AND r1.review_id < r2.review_id;", goal: "Pair distinct reviews submitted for the same movie." },
      { tbl: "FlightSchedule", target: "SELECT f1.flight_id AS flight_1, f2.flight_id AS flight_2, f1.origin_airport\nFROM FlightSchedule f1\nJOIN FlightSchedule f2 ON f1.origin_airport = f2.origin_airport AND f1.flight_id < f2.flight_id;", goal: "Pair flights sharing the same origin departure airport." },
      { tbl: "PetClinic", target: "SELECT p1.pet_name AS pet_1, p2.pet_name AS pet_2, p1.owner_id\nFROM PetClinic p1\nJOIN PetClinic p2 ON p1.owner_id = p2.owner_id AND p1.pet_id < p2.pet_id;", goal: "Identify multi-pet households by pairing pets belonging to the same owner." }
    ]
  },
  {
    range: [731, 740],
    subcluster: "8.4 Anti-Join Pattern (Left Join with IS NULL)",
    level: "Level 2 (Anti-Join)",
    blueprint: "SELECT a.col\nFROM TableA a\nLEFT JOIN TableB b ON a.id = b.a_id\nWHERE b.a_id IS NULL;",
    rule: "The Anti-Join pattern retrieves rows from the left table that have ZERO matching records in the right table by checking 'WHERE right_key IS NULL'.",
    trap: "Selecting a column from the right table that is naturally NULLable instead of the primary/foreign key used in the join.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name\nFROM Students s\nLEFT JOIN Courses c ON s.student_id = c.student_id\nWHERE c.student_id IS NULL;", goal: "Find students who have not enrolled in any courses using an anti-join ('WHERE c.student_id IS NULL')." },
      { tbl: "Books", target: "SELECT b.title\nFROM Books b\nLEFT JOIN BorrowRecords r ON b.book_id = r.book_id\nWHERE r.book_id IS NULL;", goal: "Identify books that have never been borrowed from the library using an anti-join." },
      { tbl: "Employees", target: "SELECT e.first_name, e.last_name\nFROM Employees e\nLEFT JOIN Departments d ON e.department_id = d.department_id\nWHERE d.department_id IS NULL;", goal: "Find unassigned employees who do not belong to any valid department." },
      { tbl: "GroceryItems", target: "SELECT g.item_name\nFROM GroceryItems g\nLEFT JOIN Suppliers s ON g.supplier_id = s.supplier_id\nWHERE s.supplier_id IS NULL;", goal: "Detect orphan inventory items that do not have an active supplier on file." },
      { tbl: "Orders", target: "SELECT c.customer_name\nFROM Customers c\nLEFT JOIN Orders o ON c.customer_id = o.customer_id\nWHERE o.customer_id IS NULL;", goal: "Find registered customers who have never placed an order using an anti-join." },
      { tbl: "MusicTracks", target: "SELECT t.track_title\nFROM MusicTracks t\nLEFT JOIN Playlists p ON t.track_id = p.track_id\nWHERE p.track_id IS NULL;", goal: "Identify neglected music tracks that have never been added to any playlist." },
      { tbl: "GymMembers", target: "SELECT m.member_name\nFROM GymMembers m\nLEFT JOIN Attendance a ON m.member_id = a.member_id\nWHERE a.member_id IS NULL;", goal: "Find gym members who have registered but have zero logged workout visits." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title\nFROM Movies m\nLEFT JOIN MovieReviews r ON m.movie_id = r.movie_id\nWHERE r.movie_id IS NULL;", goal: "Identify films in the cinema database that have received zero reviews." },
      { tbl: "FlightSchedule", target: "SELECT al.airline_name\nFROM Airlines al\nLEFT JOIN FlightSchedule f ON al.airline_id = f.airline_id\nWHERE f.airline_id IS NULL;", goal: "Find airlines in the registry that currently have no flights scheduled." },
      { tbl: "PetClinic", target: "SELECT o.owner_name\nFROM Owners o\nLEFT JOIN PetClinic p ON o.owner_id = p.owner_id\nWHERE p.owner_id IS NULL;", goal: "Find registered pet owners who have zero animals currently in the clinic system." }
    ]
  },
  {
    range: [741, 750],
    subcluster: "8.5 Non-Equi Joins with Inequality (<, >)",
    level: "Level 3 (Inequality Non-Equi Join)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nJOIN TableB b ON a.metric > b.metric;",
    rule: "Non-equi joins use comparison operators other than '=' (such as <, >, <=, >=) to compare relative magnitudes between tables.",
    trap: "Non-equi joins without limiting bounds can produce massive result sets similar to cross joins.",
    topics: [
      { tbl: "Students", target: "SELECT s1.full_name AS senior_student, s2.full_name AS junior_student\nFROM Students s1\nJOIN Students s2 ON s1.enrolled_year < s2.enrolled_year\nLIMIT 20;", goal: "Pair senior students with more recently enrolled junior students using '<'." },
      { tbl: "Books", target: "SELECT b1.title AS newer_book, b2.title AS older_book\nFROM Books b1\nJOIN Books b2 ON b1.published_year > b2.published_year\nLIMIT 20;", goal: "Pair books where book 1 was published after book 2." },
      { tbl: "Employees", target: "SELECT e1.first_name AS higher_earner, e2.first_name AS lower_earner\nFROM Employees e1\nJOIN Employees e2 ON e1.salary > e2.salary AND e1.department_id = e2.department_id\nLIMIT 20;", goal: "Compare salaries within the same department: pair higher earners with lower earners." },
      { tbl: "GroceryItems", target: "SELECT g1.item_name AS premium_item, g2.item_name AS budget_item\nFROM GroceryItems g1\nJOIN GroceryItems g2 ON g1.unit_price > g2.unit_price * 2\nLIMIT 20;", goal: "Find pairs where item 1 is more than double the price of item 2." },
      { tbl: "Orders", target: "SELECT o1.order_id AS bigger_order, o2.order_id AS smaller_order\nFROM Orders o1\nJOIN Orders o2 ON o1.total_amount > o2.total_amount AND o1.customer_id = o2.customer_id\nLIMIT 20;", goal: "Compare order amounts for the same customer: pair larger orders with smaller orders." },
      { tbl: "MusicTracks", target: "SELECT t1.track_title AS longer_song, t2.track_title AS shorter_song\nFROM MusicTracks t1\nJOIN MusicTracks t2 ON t1.duration_seconds > t2.duration_seconds + 120\nLIMIT 20;", goal: "Find song pairs where track 1 is at least 2 minutes longer than track 2." },
      { tbl: "GymMembers", target: "SELECT m1.member_name AS veteran, m2.member_name AS newcomer\nFROM GymMembers m1\nJOIN GymMembers m2 ON m1.join_date < m2.join_date\nLIMIT 20;", goal: "Pair veteran gym members with newcomers who joined after them." },
      { tbl: "MovieReviews", target: "SELECT r1.review_id AS better_rev, r2.review_id AS worse_rev\nFROM MovieReviews r1\nJOIN MovieReviews r2 ON r1.star_rating > r2.star_rating AND r1.movie_id = r2.movie_id\nLIMIT 20;", goal: "Compare reviews for the same movie where review 1 gave higher stars than review 2." },
      { tbl: "FlightSchedule", target: "SELECT f1.flight_id AS morning_flight, f2.flight_id AS later_flight\nFROM FlightSchedule f1\nJOIN FlightSchedule f2 ON f1.departure_time < f2.departure_time AND f1.origin_airport = f2.origin_airport\nLIMIT 20;", goal: "Sequence flights departing from the same airport where flight 1 departs before flight 2." },
      { tbl: "PetClinic", target: "SELECT p1.pet_name AS larger_pet, p2.pet_name AS smaller_pet\nFROM PetClinic p1\nJOIN PetClinic p2 ON p1.weight_kg > p2.weight_kg * 3\nLIMIT 20;", goal: "Pair clinic pets where pet 1 is over 3 times the weight of pet 2." }
    ]
  },
  {
    range: [751, 760],
    subcluster: "8.6 Non-Equi Joins with BETWEEN (Tier & Bracket Mapping)",
    level: "Level 3 (Range Non-Equi Join)",
    blueprint: "SELECT e.name, b.band_name\nFROM Employees e\nJOIN SalaryGrades b ON e.salary BETWEEN b.min_salary AND b.max_salary;",
    rule: "Join a factual entity to a lookup dimension using 'BETWEEN min_val AND max_val' to categorize continuous metrics into discrete tiers without hardcoded CASE statements.",
    trap: "BETWEEN is inclusive. Ensure lookup table boundaries don't overlap (e.g. 0-50 and 50-100 will double-count 50).",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, s.gpa, g.grade_label\nFROM Students s\nJOIN GradeTiers g ON s.gpa BETWEEN g.min_gpa AND g.max_gpa;", goal: "Map student GPAs to academic honors tiers using a non-equi BETWEEN join." },
      { tbl: "Books", target: "SELECT b.title, b.price, t.price_tier\nFROM Books b\nJOIN PriceBrackets t ON b.price BETWEEN t.min_price AND t.max_price;", goal: "Classify book prices into retail market brackets via BETWEEN join." },
      { tbl: "Employees", target: "SELECT e.first_name, e.salary, g.grade_level\nFROM Employees e\nJOIN SalaryGrades g ON e.salary BETWEEN g.min_salary AND g.max_salary;", goal: "Map employee salaries to corporate compensation grade levels using BETWEEN." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, g.stock_qty, t.status_tier\nFROM GroceryItems g\nJOIN InventoryTiers t ON g.stock_qty BETWEEN t.min_stock AND t.max_stock;", goal: "Map inventory quantities to stock health tiers (Critical, Low, Healthy, Overstocked)." },
      { tbl: "Orders", target: "SELECT o.order_id, o.total_amount, r.reward_tier\nFROM Orders o\nJOIN RewardBrackets r ON o.total_amount BETWEEN r.min_spend AND r.max_spend;", goal: "Assign customer order values to loyalty points reward tiers using BETWEEN." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, t.duration_seconds, b.length_bracket\nFROM MusicTracks t\nJOIN TrackBrackets b ON t.duration_seconds BETWEEN b.min_sec AND b.max_sec;", goal: "Categorize music track duration into radio programming categories (Short, Standard, Epic)." },
      { tbl: "GymMembers", target: "SELECT m.member_name, m.attendance_days, b.loyalty_tier\nFROM GymMembers m\nJOIN LoyaltyBrackets b ON m.attendance_days BETWEEN b.min_days AND b.max_days;", goal: "Map member workout frequency to gym loyalty tiers via BETWEEN." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, m.box_office, b.revenue_tier\nFROM Movies m\nJOIN BoxOfficeTiers b ON m.box_office BETWEEN b.min_gross AND b.max_gross;", goal: "Map film box office totals to commercial performance tiers." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, f.distance_miles, d.haul_type\nFROM FlightSchedule f\nJOIN DistanceTiers d ON f.distance_miles BETWEEN d.min_miles AND d.max_miles;", goal: "Classify flight distances into aviation tiers (Short-haul, Medium-haul, Long-haul)." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, p.weight_kg, b.size_category\nFROM PetClinic p\nJOIN SizeBrackets b ON p.weight_kg BETWEEN b.min_kg AND b.max_kg;", goal: "Classify veterinary patient weights into medical dosage size categories." }
    ]
  },
  {
    range: [761, 770],
    subcluster: "8.7 Compound Multi-Column Join Keys (ON a.k1 = b.k1 AND a.k2 = b.k2)",
    level: "Level 3 (Compound Join Keys)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nJOIN TableB b ON a.key1 = b.key1 AND a.key2 = b.key2;",
    rule: "When tables use composite primary or foreign keys, combine multiple key equality checks inside the ON clause using AND.",
    trap: "Omitting one part of a composite key causes a partial Cartesian product, multiplying matching rows.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, e.grade\nFROM Students s\nJOIN Enrolments e ON s.student_id = e.student_id AND s.enrolled_year = e.academic_year;", goal: "Join students and enrollments matching both student_id AND academic_year." },
      { tbl: "Books", target: "SELECT b.title, inv.shelf_location\nFROM Books b\nJOIN Inventory inv ON b.isbn = inv.isbn AND b.edition = inv.edition;", goal: "Join books to library inventory matching both ISBN and edition number." },
      { tbl: "Employees", target: "SELECT e.first_name, p.project_name\nFROM Employees e\nJOIN Assignments p ON e.employee_id = p.employee_id AND e.department_id = p.dept_id;", goal: "Match employee project assignments on both employee_id AND department_id." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.lead_time_days\nFROM GroceryItems g\nJOIN VendorCatalog s ON g.sku = s.sku AND g.supplier_id = s.supplier_id;", goal: "Match grocery products to vendor catalogs using compound SKU and supplier_id keys." },
      { tbl: "Orders", target: "SELECT o.order_id, oi.item_name, oi.unit_price\nFROM Orders o\nJOIN OrderItems oi ON o.order_id = oi.order_id AND o.store_id = oi.store_id;", goal: "Join orders to line items matching on both order_id AND store_id." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, rel.release_territory\nFROM MusicTracks t\nJOIN TrackReleases rel ON t.isrc_code = rel.isrc_code AND t.album_id = rel.album_id;", goal: "Match track releases matching both ISRC code AND album_id." },
      { tbl: "GymMembers", target: "SELECT m.member_name, b.booking_time\nFROM GymMembers m\nJOIN ClassBookings b ON m.member_id = b.member_id AND m.branch_id = b.branch_id;", goal: "Match gym class bookings verifying both member_id AND branch_id." },
      { tbl: "MovieReviews", target: "SELECT r.review_text, m.movie_title\nFROM MovieReviews r\nJOIN Movies m ON r.movie_id = m.movie_id AND r.region_code = m.region_code;", goal: "Match movie reviews to films on both movie_id AND region_code." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, g.gate_number\nFROM FlightSchedule f\nJOIN GateAssignments g ON f.flight_id = g.flight_id AND f.flight_date = g.flight_date;", goal: "Match airport gate assignments matching both flight_id AND flight_date." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, v.vaccine_name\nFROM PetClinic p\nJOIN Vaccinations v ON p.pet_id = v.pet_id AND p.species = v.species_target;", goal: "Match veterinary vaccine records verifying both pet_id AND target species." }
    ]
  },
  {
    range: [771, 780],
    subcluster: "8.8 Joins with String Matching & Pattern Predicates in ON",
    level: "Level 3 (Pattern Join)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nJOIN TableB b ON a.code LIKE CONCAT(b.prefix, '%');",
    rule: "The ON clause is not restricted to exact '=' equality—it can evaluate LIKE expressions to pair data by shared prefixes, suffixes, or codes.",
    trap: "Pattern joins cannot utilize standard B-tree index lookups and require nested loop scans.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.college_name\nFROM Students s\nJOIN Colleges c ON s.student_id LIKE CONCAT(c.college_code, '%');", goal: "Match student ID codes to college faculties using a LIKE prefix join in ON." },
      { tbl: "Books", target: "SELECT b.title, p.publisher_name\nFROM Books b\nJOIN Publishers p ON b.isbn LIKE CONCAT(p.isbn_prefix, '%');", goal: "Match book ISBNs to publishing houses by publisher prefix pattern." },
      { tbl: "Employees", target: "SELECT e.first_name, b.branch_city\nFROM Employees e\nJOIN OfficeBranches b ON e.badge_code LIKE CONCAT(b.branch_code, '%');", goal: "Match employee badges to office branch locations by badge prefix in ON." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, cat.department\nFROM GroceryItems g\nJOIN CategoryLookup cat ON g.sku LIKE CONCAT(cat.sku_prefix, '%');", goal: "Pair inventory SKUs with store departments using prefix matching in ON." },
      { tbl: "Orders", target: "SELECT o.order_id, r.region_name\nFROM Orders o\nJOIN PostalRegions r ON o.shipping_zip LIKE CONCAT(r.zip_prefix, '%');", goal: "Map order delivery zip codes to logistics regions via LIKE join." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, lbl.label_name\nFROM MusicTracks t\nJOIN RecordLabels lbl ON t.catalog_number LIKE CONCAT(lbl.label_code, '%');", goal: "Pair track catalog numbers with record labels by prefix pattern." },
      { tbl: "GymMembers", target: "SELECT m.member_name, p.tier_name\nFROM GymMembers m\nJOIN PlanTiers p ON m.membership_id LIKE CONCAT(p.tier_code, '%');", goal: "Match gym membership IDs to plan tiers using a LIKE join in ON." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, c.classification\nFROM Movies m\nJOIN ContentCodes c ON m.mpaa_rating LIKE CONCAT(c.code, '%');", goal: "Match film ratings to parental advisory classifications via pattern join." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, a.airline_name\nFROM FlightSchedule f\nJOIN Airlines a ON f.flight_id LIKE CONCAT(a.iata_code, '%');", goal: "Identify operating airlines by matching flight number prefix to carrier IATA code." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, b.breed_group\nFROM PetClinic p\nJOIN BreedRegistry b ON p.breed LIKE CONCAT('%', b.group_keyword, '%');", goal: "Classify clinic animals by matching breed names against breed group keywords." }
    ]
  },
  {
    range: [781, 790],
    subcluster: "8.9 Emulating FULL OUTER JOIN (LEFT JOIN UNION RIGHT JOIN)",
    level: "Level 3 (Full Outer Join Emulation)",
    blueprint: "SELECT a.col, b.col FROM TableA a LEFT JOIN TableB b ON a.id = b.a_id\nUNION\nSELECT a.col, b.col FROM TableA a RIGHT JOIN TableB b ON a.id = b.a_id;",
    rule: "FULL OUTER JOIN returns all rows from both tables, filling NULLs where there is no match. In MySQL, simulate FULL OUTER JOIN by unioning a LEFT JOIN and a RIGHT JOIN.",
    trap: "Using UNION ALL instead of UNION will duplicate the matched intersection rows.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name\nFROM Students s\nLEFT JOIN Courses c ON s.student_id = c.student_id\nUNION\nSELECT s.full_name, c.course_name\nFROM Students s\nRIGHT JOIN Courses c ON s.student_id = c.student_id;", goal: "Emulate a FULL OUTER JOIN between students and courses to see unmatched students and empty courses." },
      { tbl: "Books", target: "SELECT b.title, a.author_name\nFROM Books b\nLEFT JOIN Authors a ON b.author_id = a.author_id\nUNION\nSELECT b.title, a.author_name\nFROM Books b\nRIGHT JOIN Authors a ON b.author_id = a.author_id;", goal: "Emulate a FULL OUTER JOIN combining all books and all authors." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name\nFROM Employees e\nLEFT JOIN Departments d ON e.department_id = d.department_id\nUNION\nSELECT e.first_name, d.department_name\nFROM Employees e\nRIGHT JOIN Departments d ON e.department_id = d.department_id;", goal: "Emulate a FULL OUTER JOIN showing unassigned staff and vacant departments." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name\nFROM GroceryItems g\nLEFT JOIN Suppliers s ON g.supplier_id = s.supplier_id\nUNION\nSELECT g.item_name, s.supplier_name\nFROM GroceryItems g\nRIGHT JOIN Suppliers s ON g.supplier_id = s.supplier_id;", goal: "Emulate a FULL OUTER JOIN of grocery inventory and supplier partners." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name\nFROM Orders o\nLEFT JOIN Customers c ON o.customer_id = c.customer_id\nUNION\nSELECT o.order_id, c.customer_name\nFROM Orders o\nRIGHT JOIN Customers c ON o.customer_id = c.customer_id;", goal: "Emulate a FULL OUTER JOIN showing guest orders and inactive customer accounts." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title\nFROM MusicTracks t\nLEFT JOIN Albums a ON t.album_id = a.album_id\nUNION\nSELECT t.track_title, a.album_title\nFROM MusicTracks t\nRIGHT JOIN Albums a ON t.album_id = a.album_id;", goal: "Emulate a FULL OUTER JOIN showing album-less tracks and trackless albums." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name\nFROM GymMembers m\nLEFT JOIN Trainers tr ON m.trainer_id = tr.trainer_id\nUNION\nSELECT m.member_name, tr.trainer_name\nFROM GymMembers m\nRIGHT JOIN Trainers tr ON m.trainer_id = tr.trainer_id;", goal: "Emulate a FULL OUTER JOIN showing uncoached members and unbooked trainers." },
      { tbl: "MovieReviews", target: "SELECT r.star_rating, m.movie_title\nFROM MovieReviews r\nLEFT JOIN Movies m ON r.movie_id = m.movie_id\nUNION\nSELECT r.star_rating, m.movie_title\nFROM MovieReviews r\nRIGHT JOIN Movies m ON r.movie_id = m.movie_id;", goal: "Emulate a FULL OUTER JOIN showing orphaned reviews and unreviewed movies." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name\nFROM FlightSchedule f\nLEFT JOIN Airlines al ON f.airline_id = al.airline_id\nUNION\nSELECT f.flight_id, al.airline_name\nFROM FlightSchedule f\nRIGHT JOIN Airlines al ON f.airline_id = al.airline_id;", goal: "Emulate a FULL OUTER JOIN showing chartered flights and grounded airlines." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name\nFROM PetClinic p\nLEFT JOIN Owners o ON p.owner_id = o.owner_id\nUNION\nSELECT p.pet_name, o.owner_name\nFROM PetClinic p\nRIGHT JOIN Owners o ON p.owner_id = o.owner_id;", goal: "Emulate a FULL OUTER JOIN displaying shelter rescue animals and pet-less owners." }
    ]
  },
  {
    range: [791, 800],
    subcluster: "8.10 Structural Join Bug Hunts & Traps",
    level: "Level 3 (Join Debugging)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nJOIN TableB b ON a.correct_fk = b.correct_pk;",
    rule: "Always verify that the ON clause pairs the exact corresponding foreign key and primary key columns rather than unrelated or inverted attributes.",
    trap: "Joining on names or text columns instead of primary keys, leading to false matches on duplicate names.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id\nWHERE s.enrolled_year = 2024;", goal: "Fix the missing join key bug: ensure 'ON s.student_id = c.student_id' is explicitly specified." },
      { tbl: "Books", target: "SELECT b.title, a.author_name\nFROM Books b\nLEFT JOIN Authors a ON b.author_id = a.author_id\nWHERE a.author_name IS NOT NULL;", goal: "Fix the outer join trap where a WHERE filter accidentally negates a LEFT JOIN." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name\nFROM Employees e\nINNER JOIN Departments d ON e.department_id = d.department_id\nORDER BY e.salary DESC;", goal: "Fix inverted join keys: ensure employee foreign key matches department primary key." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name\nFROM GroceryItems g\nINNER JOIN Suppliers s ON g.supplier_id = s.supplier_id\nWHERE g.unit_price > 1.00;", goal: "Fix accidental cross join: replace comma-separated tables with explicit INNER JOIN ON." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name\nFROM Orders o\nLEFT JOIN Customers c ON o.customer_id = c.customer_id;", goal: "Fix ambiguous column error by explicitly qualifying order_id and customer_name." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title\nFROM MusicTracks t\nINNER JOIN Albums a ON t.album_id = a.album_id\nORDER BY t.track_title ASC;", goal: "Fix accidental cartesian product by supplying the missing ON condition on album_id." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name\nFROM GymMembers m\nLEFT JOIN Trainers tr ON m.trainer_id = tr.trainer_id\nWHERE m.membership_plan = 'Platinum';", goal: "Fix predicate placement: preserve outer join while filtering left table attributes." },
      { tbl: "MovieReviews", target: "SELECT r.review_text, m.movie_title\nFROM MovieReviews r\nINNER JOIN Movies m ON r.movie_id = m.movie_id\nWHERE m.release_year >= 2000;", goal: "Fix incorrect join key: connect on movie_id rather than movie title text." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name\nFROM FlightSchedule f\nINNER JOIN Airlines al ON f.airline_id = al.airline_id\nWHERE f.status != 'Cancelled';", goal: "Fix duplicate row explosion by joining on unique airline_id instead of airline name." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name\nFROM PetClinic p\nLEFT JOIN Owners o ON p.owner_id = o.owner_id\nWHERE p.species = 'Canine';", goal: "Fix outer join filtering: ensure left table filtering does not discard intended NULL matches." }
    ]
  }
];

// =============================================================================
// TOPIC 9: MULTI-TABLE CHAINING & JOINED AGGREGATIONS (Drills #801 to #900)
// =============================================================================
const clustersT9 = [
  {
    range: [801, 810],
    subcluster: "9.1 Three-Table Linear Chains (A -> B -> C)",
    level: "Level 3 (3-Table Joins)",
    blueprint: "SELECT a.col, b.col, c.col\nFROM TableA a\nJOIN TableB b ON a.id = b.a_id\nJOIN TableC c ON b.c_id = c.id;",
    rule: "Join sequentially along foreign key relationships: Table A connects to junction Table B, which connects to dimension Table C.",
    trap: "Trying to join Table A directly to Table C when no direct foreign key exists between them.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name, d.department_name\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id\nINNER JOIN Departments d ON c.dept_id = d.department_id;", goal: "Execute a 3-table join: Students -> Courses -> Departments." },
      { tbl: "Books", target: "SELECT b.title, a.author_name, p.publisher_name\nFROM Books b\nINNER JOIN Authors a ON b.author_id = a.author_id\nINNER JOIN Publishers p ON b.publisher_id = p.publisher_id;", goal: "Execute a 3-table join: Books -> Authors -> Publishers." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name, l.location_city\nFROM Employees e\nINNER JOIN Departments d ON e.department_id = d.department_id\nINNER JOIN Locations l ON d.location_id = l.location_id;", goal: "Execute a 3-table join: Employees -> Departments -> Locations." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name, c.country_name\nFROM GroceryItems g\nINNER JOIN Suppliers s ON g.supplier_id = s.supplier_id\nINNER JOIN Countries c ON s.country_id = c.country_id;", goal: "Execute a 3-table join: GroceryItems -> Suppliers -> Countries." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name, oi.item_name\nFROM Orders o\nINNER JOIN Customers c ON o.customer_id = c.customer_id\nINNER JOIN OrderItems oi ON o.order_id = oi.order_id;", goal: "Execute a 3-table join: Orders -> Customers -> OrderItems." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title, ar.artist_name\nFROM MusicTracks t\nINNER JOIN Albums a ON t.album_id = a.album_id\nINNER JOIN Artists ar ON a.artist_id = ar.artist_id;", goal: "Execute a 3-table join: MusicTracks -> Albums -> Artists." },
      { tbl: "GymMembers", target: "SELECT m.member_name, c.class_name, tr.trainer_name\nFROM GymMembers m\nINNER JOIN ClassBookings cb ON m.member_id = cb.member_id\nINNER JOIN Classes c ON cb.class_id = c.class_id;", goal: "Execute a 3-table join: GymMembers -> ClassBookings -> Classes." },
      { tbl: "MovieReviews", target: "SELECT r.review_text, m.movie_title, d.director_name\nFROM MovieReviews r\nINNER JOIN Movies m ON r.movie_id = m.movie_id\nINNER JOIN Directors d ON m.director_id = d.director_id;", goal: "Execute a 3-table join: MovieReviews -> Movies -> Directors." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name, ap.airport_name\nFROM FlightSchedule f\nINNER JOIN Airlines al ON f.airline_id = al.airline_id\nINNER JOIN Airports ap ON f.origin_airport = ap.airport_code;", goal: "Execute a 3-table join: FlightSchedule -> Airlines -> Airports." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name, v.vet_name\nFROM PetClinic p\nINNER JOIN Owners o ON p.owner_id = o.owner_id\nINNER JOIN Vets v ON p.vet_id = v.vet_id;", goal: "Execute a 3-table join: PetClinic -> Owners -> Vets." }
    ]
  },
  {
    range: [811, 820],
    subcluster: "9.2 Mixed Joins (Chaining INNER JOIN and LEFT JOIN)",
    level: "Level 3 (Mixed Outer/Inner Joins)",
    blueprint: "SELECT a.col, b.col, c.col\nFROM TableA a\nINNER JOIN TableB b ON a.id = b.a_id\nLEFT JOIN TableC c ON b.id = c.b_id;",
    rule: "You can combine INNER and LEFT joins in a single query to strictly match core relationships while optionally bringing in peripheral data.",
    trap: "Placing an INNER JOIN after a LEFT JOIN on the optional table will filter out the NULL rows, defeating the purpose of the LEFT JOIN.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name, g.grade_letter\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id\nLEFT JOIN Grades g ON c.course_id = g.course_id;", goal: "Strictly match enrolled courses (INNER), then optionally attach letter grades (LEFT)." },
      { tbl: "Books", target: "SELECT b.title, a.author_name, r.rating_score\nFROM Books b\nINNER JOIN Authors a ON b.author_id = a.author_id\nLEFT JOIN BookRatings r ON b.book_id = r.book_id;", goal: "Require an author (INNER), but keep books that have no rating yet (LEFT)." },
      { tbl: "Employees", target: "SELECT e.first_name, d.department_name, b.bonus_amount\nFROM Employees e\nINNER JOIN Departments d ON e.department_id = d.department_id\nLEFT JOIN AnnualBonuses b ON e.employee_id = b.employee_id;", goal: "Require a department assignment (INNER), while preserving staff without a bonus (LEFT)." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name, d.discount_pct\nFROM GroceryItems g\nINNER JOIN Suppliers s ON g.supplier_id = s.supplier_id\nLEFT JOIN SeasonalDiscounts d ON g.item_id = d.item_id;", goal: "Require a supplier (INNER), while allowing items without discounts (LEFT)." },
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name, p.promo_code\nFROM Orders o\nINNER JOIN Customers c ON o.customer_id = c.customer_id\nLEFT JOIN OrderPromotions p ON o.order_id = p.order_id;", goal: "Require a customer account (INNER), while keeping orders with no promo code (LEFT)." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, a.album_title, aw.award_name\nFROM MusicTracks t\nINNER JOIN Albums a ON t.album_id = a.album_id\nLEFT JOIN TrackAwards aw ON t.track_id = aw.track_id;", goal: "Require an album (INNER), while keeping tracks without music awards (LEFT)." },
      { tbl: "GymMembers", target: "SELECT m.member_name, tr.trainer_name, l.locker_number\nFROM GymMembers m\nINNER JOIN Trainers tr ON m.trainer_id = tr.trainer_id\nLEFT JOIN LockerRentals l ON m.member_id = l.member_id;", goal: "Require a trainer (INNER), while preserving members with no locker rental (LEFT)." },
      { tbl: "MovieReviews", target: "SELECT r.review_text, m.movie_title, osc.category\nFROM MovieReviews r\nINNER JOIN Movies m ON r.movie_id = m.movie_id\nLEFT JOIN OscarNominations osc ON m.movie_id = osc.movie_id;", goal: "Require a movie match (INNER), while allowing films with no Oscar nominations (LEFT)." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name, m.meal_type\nFROM FlightSchedule f\nINNER JOIN Airlines al ON f.airline_id = al.airline_id\nLEFT JOIN InflightMeals m ON f.flight_id = m.flight_id;", goal: "Require an airline carrier (INNER), while preserving flights without meal service (LEFT)." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, o.owner_name, ins.policy_number\nFROM PetClinic p\nINNER JOIN Owners o ON p.owner_id = o.owner_id\nLEFT JOIN PetInsurance ins ON p.pet_id = ins.pet_id;", goal: "Require a pet owner (INNER), while keeping patients without insurance (LEFT)." }
    ]
  },
  {
    range: [821, 830],
    subcluster: "9.3 Star-Schema Joining (1 Central Fact to 2 Dimensions)",
    level: "Level 3 (Star Schema Pattern)",
    blueprint: "SELECT f.fact_metric, d1.name, d2.title\nFROM FactTable f\nJOIN DimTable1 d1 ON f.dim1_id = d1.id\nJOIN DimTable2 d2 ON f.dim2_id = d2.id;",
    rule: "Join a central transaction/event table simultaneously to two independent dimension lookup tables.",
    trap: "Joining dimension 1 to dimension 2 instead of joining both to the central fact table.",
    topics: [
      { tbl: "Orders", target: "SELECT o.order_id, c.customer_name, p.product_name\nFROM Orders o\nINNER JOIN Customers c ON o.customer_id = c.customer_id\nINNER JOIN Products p ON o.product_id = p.product_id;", goal: "Star join: Order fact table connected to Customers dimension AND Products dimension." },
      { tbl: "Students", target: "SELECT e.enrolment_id, s.full_name, c.course_name\nFROM Enrolments e\nINNER JOIN Students s ON e.student_id = s.student_id\nINNER JOIN Courses c ON e.course_id = c.course_id;", goal: "Star join: Enrollment fact table connected to Students AND Courses." },
      { tbl: "Books", target: "SELECT b.book_id, a.author_name, pub.publisher_name\nFROM Books b\nINNER JOIN Authors a ON b.author_id = a.author_id\nINNER JOIN Publishers pub ON b.publisher_id = pub.publisher_id;", goal: "Star join: Books central table connected to Authors AND Publishers." },
      { tbl: "Employees", target: "SELECT e.employee_id, d.department_name, r.role_title\nFROM Employees e\nINNER JOIN Departments d ON e.department_id = d.department_id\nINNER JOIN JobRoles r ON e.role_id = r.role_id;", goal: "Star join: Employees connected to Departments dimension AND JobRoles dimension." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, s.supplier_name, a.aisle_number\nFROM GroceryItems g\nINNER JOIN Suppliers s ON g.supplier_id = s.supplier_id\nINNER JOIN Aisles a ON g.aisle_id = a.aisle_id;", goal: "Star join: Grocery inventory connected to Suppliers AND Aisles." },
      { tbl: "MusicTracks", target: "SELECT t.track_title, ar.artist_name, alb.album_title\nFROM MusicTracks t\nINNER JOIN Artists ar ON t.artist_id = ar.artist_id\nINNER JOIN Albums alb ON t.album_id = alb.album_id;", goal: "Star join: Tracks connected to Artists dimension AND Albums dimension." },
      { tbl: "GymMembers", target: "SELECT b.booking_id, m.member_name, c.class_name\nFROM ClassBookings b\nINNER JOIN GymMembers m ON b.member_id = m.member_id\nINNER JOIN Classes c ON b.class_id = c.class_id;", goal: "Star join: Booking events connected to GymMembers AND FitnessClasses." },
      { tbl: "MovieReviews", target: "SELECT r.review_id, m.movie_title, cr.critic_name\nFROM MovieReviews r\nINNER JOIN Movies m ON r.movie_id = m.movie_id\nINNER JOIN Critics cr ON r.critic_id = cr.critic_id;", goal: "Star join: Reviews connected to Movies AND Critics." },
      { tbl: "FlightSchedule", target: "SELECT f.flight_id, al.airline_name, ap.city_name\nFROM FlightSchedule f\nINNER JOIN Airlines al ON f.airline_id = al.airline_id\nINNER JOIN Airports ap ON f.origin_airport = ap.airport_code;", goal: "Star join: Flight events connected to Airlines AND Origin Airports." },
      { tbl: "PetClinic", target: "SELECT a.appointment_id, p.pet_name, v.vet_name\nFROM Appointments a\nINNER JOIN PetClinic p ON a.pet_id = p.pet_id\nINNER JOIN Vets v ON a.vet_id = v.vet_id;", goal: "Star join: Appointments connected to Pets AND Veterinarians." }
    ]
  },
  {
    range: [831, 840],
    subcluster: "9.4 Aggregations over Joins (COUNT per Parent Entity)",
    level: "Level 3 (Joined Grouping & Counting)",
    blueprint: "SELECT a.name, COUNT(b.id) AS total_count\nFROM TableA a\nLEFT JOIN TableB b ON a.id = b.a_id\nGROUP BY a.id, a.name;",
    rule: "When counting child records with a LEFT JOIN, always use 'COUNT(b.id)' rather than 'COUNT(*)' so parent records with 0 children count as 0 instead of 1.",
    trap: "Using COUNT(*) with a LEFT JOIN turns 0 children into 1 because the outer join produces a single row containing NULLs.",
    topics: [
      { tbl: "Students", target: "SELECT s.student_id, s.full_name, COUNT(c.course_id) AS enrolled_course_count\nFROM Students s\nLEFT JOIN Courses c ON s.student_id = c.student_id\nGROUP BY s.student_id, s.full_name;", goal: "Count the number of enrolled courses per student, showing 0 for students with no courses." },
      { tbl: "Books", target: "SELECT a.author_name, COUNT(b.book_id) AS published_book_count\nFROM Authors a\nLEFT JOIN Books b ON a.author_id = b.author_id\nGROUP BY a.author_id, a.author_name;", goal: "Count the total number of books written by each author using COUNT(b.book_id)." },
      { tbl: "Employees", target: "SELECT d.department_name, COUNT(e.employee_id) AS staff_headcount\nFROM Departments d\nLEFT JOIN Employees e ON d.department_id = e.department_id\nGROUP BY d.department_id, d.department_name;", goal: "Calculate the exact staff headcount for each corporate department." },
      { tbl: "GroceryItems", target: "SELECT s.supplier_name, COUNT(g.item_id) AS total_supplied_items\nFROM Suppliers s\nLEFT JOIN GroceryItems g ON s.supplier_id = g.supplier_id\nGROUP BY s.supplier_id, s.supplier_name;", goal: "Count the total number of catalog products supplied by each vendor." },
      { tbl: "Orders", target: "SELECT c.customer_name, COUNT(o.order_id) AS lifetime_orders\nFROM Customers c\nLEFT JOIN Orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.customer_name;", goal: "Count the lifetime order tally for every customer account." },
      { tbl: "MusicTracks", target: "SELECT a.album_title, COUNT(t.track_id) AS track_count\nFROM Albums a\nLEFT JOIN MusicTracks t ON a.album_id = t.album_id\nGROUP BY a.album_id, a.album_title;", goal: "Calculate the track count for each studio music album." },
      { tbl: "GymMembers", target: "SELECT tr.trainer_name, COUNT(m.member_id) AS assigned_client_count\nFROM Trainers tr\nLEFT JOIN GymMembers m ON tr.trainer_id = m.trainer_id\nGROUP BY tr.trainer_id, tr.trainer_name;", goal: "Count the total number of gym members coached by each trainer." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, COUNT(r.review_id) AS total_reviews\nFROM Movies m\nLEFT JOIN MovieReviews r ON m.movie_id = r.movie_id\nGROUP BY m.movie_id, m.movie_title;", goal: "Count the total number of written reviews submitted for each movie." },
      { tbl: "FlightSchedule", target: "SELECT al.airline_name, COUNT(f.flight_id) AS scheduled_flight_count\nFROM Airlines al\nLEFT JOIN FlightSchedule f ON al.airline_id = f.airline_id\nGROUP BY al.airline_id, al.airline_name;", goal: "Count total active flights operated by each airline." },
      { tbl: "PetClinic", target: "SELECT o.owner_name, COUNT(p.pet_id) AS registered_pet_count\nFROM Owners o\nLEFT JOIN PetClinic p ON o.owner_id = p.owner_id\nGROUP BY o.owner_id, o.owner_name;", goal: "Count the number of pets registered to each client owner." }
    ]
  },
  {
    range: [841, 850],
    subcluster: "9.5 Aggregations over Joins (SUM & AVG Financials/Metrics)",
    level: "Level 3 (Joined SUM & AVG)",
    blueprint: "SELECT a.name, SUM(b.amount) AS total_revenue, AVG(b.amount) AS avg_revenue\nFROM TableA a\nJOIN TableB b ON a.id = b.a_id\nGROUP BY a.id, a.name;",
    rule: "Calculate aggregate financial totals (SUM) and averages (AVG) across child rows grouped by parent entity.",
    trap: "Forgetting to include all non-aggregated columns in the GROUP BY clause.",
    topics: [
      { tbl: "Employees", target: "SELECT d.department_name, SUM(e.salary) AS total_payroll, AVG(e.salary) AS avg_salary\nFROM Departments d\nINNER JOIN Employees e ON d.department_id = e.department_id\nGROUP BY d.department_id, d.department_name;", goal: "Calculate total payroll expenditure and average salary per department." },
      { tbl: "Orders", target: "SELECT c.customer_name, SUM(o.total_amount) AS total_spend, AVG(o.total_amount) AS average_order_value\nFROM Customers c\nINNER JOIN Orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.customer_name;", goal: "Calculate total customer lifetime spend and average order value (AOV)." },
      { tbl: "Students", target: "SELECT s.full_name, AVG(c.credits) AS avg_course_credits, SUM(c.credits) AS total_credits\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id\nGROUP BY s.student_id, s.full_name;", goal: "Calculate average and total credits taken per enrolled student." },
      { tbl: "Books", target: "SELECT a.author_name, AVG(b.price) AS avg_book_price, SUM(b.price) AS total_catalog_value\nFROM Authors a\nINNER JOIN Books b ON a.author_id = b.author_id\nGROUP BY a.author_id, a.author_name;", goal: "Calculate the average book price and total catalog value per author." },
      { tbl: "GroceryItems", target: "SELECT s.supplier_name, SUM(g.stock_qty * g.unit_price) AS inventory_valuation\nFROM Suppliers s\nINNER JOIN GroceryItems g ON s.supplier_id = g.supplier_id\nGROUP BY s.supplier_id, s.supplier_name;", goal: "Calculate total inventory valuation (stock_qty * unit_price) supplied by each vendor." },
      { tbl: "MusicTracks", target: "SELECT a.album_title, SUM(t.duration_seconds) AS total_album_duration\nFROM Albums a\nINNER JOIN MusicTracks t ON a.album_id = t.album_id\nGROUP BY a.album_id, a.album_title;", goal: "Calculate total runtime duration in seconds for each music album." },
      { tbl: "GymMembers", target: "SELECT tr.trainer_name, SUM(m.monthly_fee) AS monthly_revenue_generated\nFROM Trainers tr\nINNER JOIN GymMembers m ON tr.trainer_id = m.trainer_id\nGROUP BY tr.trainer_id, tr.trainer_name;", goal: "Calculate monthly membership revenue generated per personal trainer." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, AVG(r.star_rating) AS average_star_score\nFROM Movies m\nINNER JOIN MovieReviews r ON m.movie_id = r.movie_id\nGROUP BY m.movie_id, m.movie_title;", goal: "Compute the average star rating score for each film." },
      { tbl: "FlightSchedule", target: "SELECT al.airline_name, AVG(f.distance_miles) AS avg_flight_distance\nFROM Airlines al\nINNER JOIN FlightSchedule f ON al.airline_id = f.airline_id\nGROUP BY al.airline_id, al.airline_name;", goal: "Calculate average route distance in miles for each airline." },
      { tbl: "PetClinic", target: "SELECT o.owner_name, AVG(p.weight_kg) AS avg_pet_weight\nFROM Owners o\nINNER JOIN PetClinic p ON o.owner_id = p.owner_id\nGROUP BY o.owner_id, o.owner_name;", goal: "Calculate the average weight of registered pets per household owner." }
    ]
  },
  {
    range: [851, 860],
    subcluster: "9.6 The Fan-Out Duplication Trap (COUNT(DISTINCT))",
    level: "Level 3 (Join Fan-Out Trap)",
    blueprint: "SELECT a.name, COUNT(DISTINCT b.id) AS unique_b, COUNT(DISTINCT c.id) AS unique_c\nFROM TableA a\nLEFT JOIN TableB b ON a.id = b.a_id\nLEFT JOIN TableC c ON a.id = c.a_id\nGROUP BY a.id, a.name;",
    rule: "When joining a parent table to multiple 1-to-many child tables, row multiplication causes standard COUNT() to explode. Use COUNT(DISTINCT col) to compute accurate counts.",
    trap: "Running multiple 1-to-many joins and using standard SUM() or COUNT() without DISTINCT multiplies numbers by the Cartesian cross of the children.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, COUNT(DISTINCT c.course_id) AS unique_courses, COUNT(DISTINCT cl.club_id) AS unique_clubs\nFROM Students s\nLEFT JOIN Courses c ON s.student_id = c.student_id\nLEFT JOIN StudentClubs cl ON s.student_id = cl.student_id\nGROUP BY s.student_id, s.full_name;", goal: "Prevent fan-out duplication: count unique courses AND unique clubs per student." },
      { tbl: "Books", target: "SELECT a.author_name, COUNT(DISTINCT b.book_id) AS distinct_books, COUNT(DISTINCT aw.award_id) AS distinct_awards\nFROM Authors a\nLEFT JOIN Books b ON a.author_id = b.author_id\nLEFT JOIN AuthorAwards aw ON a.author_id = aw.author_id\nGROUP BY a.author_id, a.author_name;", goal: "Count distinct books AND distinct awards per author without Cartesian explosion." },
      { tbl: "Employees", target: "SELECT d.department_name, COUNT(DISTINCT e.employee_id) AS distinct_staff, COUNT(DISTINCT p.project_id) AS distinct_projects\nFROM Departments d\nLEFT JOIN Employees e ON d.department_id = e.department_id\nLEFT JOIN DepartmentProjects p ON d.department_id = p.department_id\nGROUP BY d.department_id, d.department_name;", goal: "Calculate distinct staff count AND distinct project count per department." },
      { tbl: "GroceryItems", target: "SELECT s.supplier_name, COUNT(DISTINCT g.item_id) AS distinct_items, COUNT(DISTINCT o.order_id) AS distinct_shipments\nFROM Suppliers s\nLEFT JOIN GroceryItems g ON s.supplier_id = g.supplier_id\nLEFT JOIN SupplierShipments o ON s.supplier_id = o.supplier_id\nGROUP BY s.supplier_id, s.supplier_name;", goal: "Count distinct items supplied and distinct purchase shipments without row inflation." },
      { tbl: "Orders", target: "SELECT c.customer_name, COUNT(DISTINCT o.order_id) AS total_orders, COUNT(DISTINCT rev.review_id) AS total_reviews\nFROM Customers c\nLEFT JOIN Orders o ON c.customer_id = o.customer_id\nLEFT JOIN CustomerReviews rev ON c.customer_id = rev.customer_id\nGROUP BY c.customer_id, c.customer_name;", goal: "Accurately tally distinct orders AND distinct customer reviews per customer." },
      { tbl: "MusicTracks", target: "SELECT ar.artist_name, COUNT(DISTINCT a.album_id) AS album_count, COUNT(DISTINCT t.track_id) AS track_count\nFROM Artists ar\nLEFT JOIN Albums a ON ar.artist_id = a.artist_id\nLEFT JOIN MusicTracks t ON ar.artist_id = t.artist_id\nGROUP BY ar.artist_id, ar.artist_name;", goal: "Safely compute album count AND track count per artist using COUNT(DISTINCT)." },
      { tbl: "GymMembers", target: "SELECT m.member_name, COUNT(DISTINCT cb.class_id) AS classes_booked, COUNT(DISTINCT tr.trainer_id) AS trainers_consulted\nFROM GymMembers m\nLEFT JOIN ClassBookings cb ON m.member_id = cb.member_id\nLEFT JOIN TrainerSessions tr ON m.member_id = tr.member_id\nGROUP BY m.member_id, m.member_name;", goal: "Count distinct classes booked and distinct trainers consulted per member." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, COUNT(DISTINCT r.review_id) AS review_count, COUNT(DISTINCT a.actor_id) AS cast_count\nFROM Movies m\nLEFT JOIN MovieReviews r ON m.movie_id = r.movie_id\nLEFT JOIN MovieCast a ON m.movie_id = a.movie_id\nGROUP BY m.movie_id, m.movie_title;", goal: "Safely count reviews AND cast members per film without fan-out inflation." },
      { tbl: "FlightSchedule", target: "SELECT al.airline_name, COUNT(DISTINCT f.flight_id) AS distinct_flights, COUNT(DISTINCT ap.airport_code) AS distinct_destinations\nFROM Airlines al\nLEFT JOIN FlightSchedule f ON al.airline_id = f.airline_id\nLEFT JOIN AirlineDestinations ap ON al.airline_id = ap.airline_id\nGROUP BY al.airline_id, al.airline_name;", goal: "Count distinct flights AND distinct destination airports per airline." },
      { tbl: "PetClinic", target: "SELECT o.owner_name, COUNT(DISTINCT p.pet_id) AS pet_count, COUNT(DISTINCT a.appointment_id) AS visit_count\nFROM Owners o\nLEFT JOIN PetClinic p ON o.owner_id = p.owner_id\nLEFT JOIN Appointments a ON o.owner_id = a.owner_id\nGROUP BY o.owner_id, o.owner_name;", goal: "Accurately count distinct pets AND distinct clinic visits per owner." }
    ]
  },
  {
    range: [861, 870],
    subcluster: "9.7 ON vs WHERE Predicate Placement on Outer Joins",
    level: "Level 3 (ON vs WHERE Trap)",
    blueprint: "SELECT a.col, b.col\nFROM TableA a\nLEFT JOIN TableB b ON a.id = b.a_id AND b.status = 'active';",
    rule: "Filtering an outer join table in the ON clause filters which right rows are attached while preserving ALL left rows. Filtering in the WHERE clause discards non-matching left rows.",
    trap: "Putting a filter in WHERE instead of ON on a LEFT JOIN silently converts it into an INNER JOIN.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, c.course_name\nFROM Students s\nLEFT JOIN Courses c ON s.student_id = c.student_id AND c.semester = 'Fall 2024';", goal: "Filter course enrollment to 'Fall 2024' inside the ON clause to keep all students." },
      { tbl: "Books", target: "SELECT b.title, r.review_score\nFROM Books b\nLEFT JOIN BookReviews r ON b.book_id = r.book_id AND r.verified_buyer = 1;", goal: "Attach only verified reviews in the ON clause while preserving all books in the catalog." },
      { tbl: "Employees", target: "SELECT e.first_name, p.project_name\nFROM Employees e\nLEFT JOIN Projects p ON e.project_id = p.project_id AND p.status = 'Active';", goal: "Attach only active projects in the ON clause, ensuring staff on bench are not eliminated." },
      { tbl: "GroceryItems", target: "SELECT g.item_name, d.discount_pct\nFROM GroceryItems g\nLEFT JOIN Discounts d ON g.item_id = d.item_id AND d.is_active = 1;", goal: "Attach active discounts inside the ON clause to preserve non-discounted grocery items." },
      { tbl: "Orders", target: "SELECT c.customer_name, o.order_id\nFROM Customers c\nLEFT JOIN Orders o ON c.customer_id = o.customer_id AND o.status = 'Shipped';", goal: "Attach shipped orders in the ON clause so customers with no shipped orders still appear." },
      { tbl: "MusicTracks", target: "SELECT a.album_title, t.track_title\nFROM Albums a\nLEFT JOIN MusicTracks t ON a.album_id = t.album_id AND t.is_explicit = 0;", goal: "Attach clean tracks in the ON clause while displaying all albums." },
      { tbl: "GymMembers", target: "SELECT m.member_name, c.class_name\nFROM GymMembers m\nLEFT JOIN ClassBookings c ON m.member_id = c.member_id AND c.booking_status = 'Confirmed';", goal: "Attach confirmed class bookings in the ON clause to keep all registered gym members." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, r.review_text\nFROM Movies m\nLEFT JOIN MovieReviews r ON m.movie_id = r.movie_id AND r.star_rating = 5;", goal: "Attach 5-star reviews in the ON clause while preserving all catalog films." },
      { tbl: "FlightSchedule", target: "SELECT al.airline_name, f.flight_id\nFROM Airlines al\nLEFT JOIN FlightSchedule f ON al.airline_id = f.airline_id AND f.status = 'On-Time';", goal: "Attach on-time flights in the ON clause while listing all commercial airlines." },
      { tbl: "PetClinic", target: "SELECT p.pet_name, v.visit_date\nFROM PetClinic p\nLEFT JOIN ClinicVisits v ON p.pet_id = v.pet_id AND v.visit_type = 'Surgery';", goal: "Attach surgery visits in the ON clause while listing every clinic pet." }
    ]
  },
  {
    range: [871, 880],
    subcluster: "9.8 HAVING Filters on Joined Groups",
    level: "Level 3 (Joined HAVING)",
    blueprint: "SELECT a.name, COUNT(b.id) AS total_items\nFROM TableA a\nJOIN TableB b ON a.id = b.a_id\nGROUP BY a.id, a.name\nHAVING COUNT(b.id) >= 5;",
    rule: "Use HAVING to filter aggregated metrics computed across joined child tables after GROUP BY has processed.",
    trap: "Trying to filter an aggregate metric (like COUNT(b.id) >= 5) inside the WHERE clause instead of HAVING.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, COUNT(c.course_id) AS total_courses\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id\nGROUP BY s.student_id, s.full_name\nHAVING COUNT(c.course_id) >= 3;", goal: "Find ambitious students enrolled in 3 or more courses using HAVING." },
      { tbl: "Books", target: "SELECT a.author_name, COUNT(b.book_id) AS book_count\nFROM Authors a\nINNER JOIN Books b ON a.author_id = b.author_id\nGROUP BY a.author_id, a.author_name\nHAVING COUNT(b.book_id) >= 5;", goal: "Filter prolific authors who have published 5 or more books." },
      { tbl: "Employees", target: "SELECT d.department_name, COUNT(e.employee_id) AS staff_count\nFROM Departments d\nINNER JOIN Employees e ON d.department_id = e.department_id\nGROUP BY d.department_id, d.department_name\nHAVING COUNT(e.employee_id) > 10;", goal: "Find large departments that employ more than 10 staff members." },
      { tbl: "GroceryItems", target: "SELECT s.supplier_name, COUNT(g.item_id) AS item_count\nFROM Suppliers s\nINNER JOIN GroceryItems g ON s.supplier_id = g.supplier_id\nGROUP BY s.supplier_id, s.supplier_name\nHAVING COUNT(g.item_id) >= 8;", goal: "Identify major vendors supplying 8 or more inventory products." },
      { tbl: "Orders", target: "SELECT c.customer_name, SUM(o.total_amount) AS lifetime_spend\nFROM Customers c\nINNER JOIN Orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.customer_name\nHAVING SUM(o.total_amount) >= 1000.00;", goal: "Find VIP customers with a cumulative lifetime spend of $1,000 or more." },
      { tbl: "MusicTracks", target: "SELECT a.album_title, COUNT(t.track_id) AS track_count\nFROM Albums a\nINNER JOIN MusicTracks t ON a.album_id = t.album_id\nGROUP BY a.album_id, a.album_title\nHAVING COUNT(t.track_id) >= 12;", goal: "Find full-length music albums containing 12 or more songs." },
      { tbl: "GymMembers", target: "SELECT tr.trainer_name, COUNT(m.member_id) AS client_count\nFROM Trainers tr\nINNER JOIN GymMembers m ON tr.trainer_id = m.trainer_id\nGROUP BY tr.trainer_id, tr.trainer_name\nHAVING COUNT(m.member_id) >= 5;", goal: "Find popular gym trainers who coach 5 or more active clients." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, AVG(r.star_rating) AS avg_score\nFROM Movies m\nINNER JOIN MovieReviews r ON m.movie_id = r.movie_id\nGROUP BY m.movie_id, m.movie_title\nHAVING AVG(r.star_rating) >= 4.5;", goal: "Filter universally acclaimed movies with an average rating of 4.5 or higher." },
      { tbl: "FlightSchedule", target: "SELECT al.airline_name, COUNT(f.flight_id) AS flight_volume\nFROM Airlines al\nINNER JOIN FlightSchedule f ON al.airline_id = f.airline_id\nGROUP BY al.airline_id, al.airline_name\nHAVING COUNT(f.flight_id) >= 15;", goal: "Find high-volume airlines operating 15 or more scheduled flights." },
      { tbl: "PetClinic", target: "SELECT o.owner_name, COUNT(p.pet_id) AS pet_count\nFROM Owners o\nINNER JOIN PetClinic p ON o.owner_id = p.owner_id\nGROUP BY o.owner_id, o.owner_name\nHAVING COUNT(p.pet_id) >= 3;", goal: "Identify animal lover households owning 3 or more registered pets." }
    ]
  },
  {
    range: [881, 890],
    subcluster: "9.9 Conditional Aggregation over Joins (SUM & COUNT with CASE)",
    level: "Level 3 (Joined Conditional Aggregates)",
    blueprint: "SELECT a.name, SUM(CASE WHEN b.status = 'active' THEN 1 ELSE 0 END) AS active_b\nFROM TableA a\nJOIN TableB b ON a.id = b.a_id\nGROUP BY a.id, a.name;",
    rule: "Embed CASE WHEN statements inside aggregate functions to compute multi-category counts or financial sums in a single pass across joined tables.",
    trap: "Using COUNT(CASE WHEN condition THEN 0 END) — COUNT counts 0 as a valid non-null value! Use SUM() or omit the ELSE branch.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, SUM(CASE WHEN c.credits >= 4 THEN 1 ELSE 0 END) AS intensive_courses\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id\nGROUP BY s.student_id, s.full_name;", goal: "Count how many intensive courses (credits >= 4) each student is taking via conditional aggregation." },
      { tbl: "Books", target: "SELECT a.author_name, SUM(CASE WHEN b.price >= 20.00 THEN 1 ELSE 0 END) AS premium_books\nFROM Authors a\nINNER JOIN Books b ON a.author_id = b.author_id\nGROUP BY a.author_id, a.author_name;", goal: "Count premium books ($20+) published by each author using SUM(CASE...)." },
      { tbl: "Employees", target: "SELECT d.department_name, SUM(CASE WHEN e.salary >= 80000 THEN 1 ELSE 0 END) AS senior_staff_count\nFROM Departments d\nINNER JOIN Employees e ON d.department_id = e.department_id\nGROUP BY d.department_id, d.department_name;", goal: "Count how many senior employees ($80k+) work in each department." },
      { tbl: "GroceryItems", target: "SELECT s.supplier_name, SUM(CASE WHEN g.stock_qty < 10 THEN 1 ELSE 0 END) AS low_stock_alerts\nFROM Suppliers s\nINNER JOIN GroceryItems g ON s.supplier_id = g.supplier_id\nGROUP BY s.supplier_id, s.supplier_name;", goal: "Tally low-stock inventory alerts (<10 units) per supplier." },
      { tbl: "Orders", target: "SELECT c.customer_name, SUM(CASE WHEN o.status = 'Completed' THEN o.total_amount ELSE 0 END) AS completed_spend\nFROM Customers c\nINNER JOIN Orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.customer_name;", goal: "Calculate verified completed revenue per customer, ignoring cancelled orders." },
      { tbl: "MusicTracks", target: "SELECT a.album_title, SUM(CASE WHEN t.is_explicit = 1 THEN 1 ELSE 0 END) AS explicit_track_count\nFROM Albums a\nINNER JOIN MusicTracks t ON a.album_id = t.album_id\nGROUP BY a.album_id, a.album_title;", goal: "Tally explicit tracks per album using conditional SUM(CASE...)." },
      { tbl: "GymMembers", target: "SELECT tr.trainer_name, SUM(CASE WHEN m.membership_plan = 'VIP' THEN 1 ELSE 0 END) AS vip_clients\nFROM Trainers tr\nINNER JOIN GymMembers m ON tr.trainer_id = m.trainer_id\nGROUP BY tr.trainer_id, tr.trainer_name;", goal: "Count VIP clients assigned to each personal fitness trainer." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, SUM(CASE WHEN r.star_rating = 5 THEN 1 ELSE 0 END) AS perfect_score_count\nFROM Movies m\nINNER JOIN MovieReviews r ON m.movie_id = r.movie_id\nGROUP BY m.movie_id, m.movie_title;", goal: "Count how many 5-star reviews each film received." },
      { tbl: "FlightSchedule", target: "SELECT al.airline_name, SUM(CASE WHEN f.status = 'Delayed' THEN 1 ELSE 0 END) AS delayed_flight_count\nFROM Airlines al\nINNER JOIN FlightSchedule f ON al.airline_id = f.airline_id\nGROUP BY al.airline_id, al.airline_name;", goal: "Count delayed flights per airline using conditional aggregation." },
      { tbl: "PetClinic", target: "SELECT o.owner_name, SUM(CASE WHEN p.species = 'Canine' THEN 1 ELSE 0 END) AS dog_count\nFROM Owners o\nINNER JOIN PetClinic p ON o.owner_id = p.owner_id\nGROUP BY o.owner_id, o.owner_name;", goal: "Count dog patients per household owner via SUM(CASE WHEN species = 'Canine')." }
    ]
  },
  {
    range: [891, 900],
    subcluster: "9.10 End-to-End Multi-Table Analytics Pipelines",
    level: "Level 3 (Analytics Master Pipeline)",
    blueprint: "SELECT a.name, COUNT(b.id) AS total_b, SUM(c.revenue) AS total_rev\nFROM TableA a\nJOIN TableB b ON a.id = b.a_id\nJOIN TableC c ON b.c_id = c.id\nWHERE a.status = 'active'\nGROUP BY a.id, a.name\nHAVING total_rev > 500\nORDER BY total_rev DESC\nLIMIT 5;",
    rule: "Synthesize table aliasing, multiple join types, predicate filtering, multi-table aggregations, HAVING thresholds, and sorted LIMIT slicing.",
    trap: "Order of clauses: FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT.",
    topics: [
      { tbl: "Students", target: "SELECT s.full_name, COUNT(c.course_id) AS courses_taken, SUM(c.credits) AS total_credits\nFROM Students s\nINNER JOIN Courses c ON s.student_id = c.student_id\nWHERE s.gpa >= 3.0\nGROUP BY s.student_id, s.full_name\nHAVING SUM(c.credits) >= 6\nORDER BY total_credits DESC\nLIMIT 5;", goal: "Pipeline: Top 5 honor students taking 6+ credits sorted by total credits." },
      { tbl: "Books", target: "SELECT a.author_name, COUNT(b.book_id) AS catalog_size, AVG(b.price) AS avg_price\nFROM Authors a\nINNER JOIN Books b ON a.author_id = b.author_id\nWHERE a.country = 'USA'\nGROUP BY a.author_id, a.author_name\nHAVING COUNT(b.book_id) >= 2\nORDER BY avg_price DESC\nLIMIT 5;", goal: "Pipeline: Top 5 US authors with 2+ books sorted by highest average price." },
      { tbl: "Employees", target: "SELECT d.department_name, COUNT(e.employee_id) AS headcount, AVG(e.salary) AS avg_salary\nFROM Departments d\nINNER JOIN Employees e ON d.department_id = e.department_id\nWHERE e.salary >= 50000\nGROUP BY d.department_id, d.department_name\nHAVING COUNT(e.employee_id) >= 3\nORDER BY avg_salary DESC\nLIMIT 3;", goal: "Pipeline: Top 3 highest-paying departments with at least 3 qualifying employees." },
      { tbl: "GroceryItems", target: "SELECT s.supplier_name, COUNT(g.item_id) AS total_items, SUM(g.stock_qty * g.unit_price) AS total_value\nFROM Suppliers s\nINNER JOIN GroceryItems g ON s.supplier_id = g.supplier_id\nWHERE g.unit_price > 2.00\nGROUP BY s.supplier_id, s.supplier_name\nHAVING SUM(g.stock_qty * g.unit_price) > 500.00\nORDER BY total_value DESC\nLIMIT 5;", goal: "Pipeline: Top 5 grocery suppliers with inventory value over $500." },
      { tbl: "Orders", target: "SELECT c.customer_name, COUNT(o.order_id) AS order_count, SUM(o.total_amount) AS total_spent\nFROM Customers c\nINNER JOIN Orders o ON c.customer_id = o.customer_id\nWHERE o.status = 'Completed'\nGROUP BY c.customer_id, c.customer_name\nHAVING SUM(o.total_amount) >= 500.00\nORDER BY total_spent DESC\nLIMIT 5;", goal: "Pipeline: Top 5 VIP buyers with $500+ in completed purchases." },
      { tbl: "MusicTracks", target: "SELECT a.album_title, COUNT(t.track_id) AS song_count, SUM(t.duration_seconds) AS total_runtime\nFROM Albums a\nINNER JOIN MusicTracks t ON a.album_id = t.album_id\nWHERE a.release_year >= 2000\nGROUP BY a.album_id, a.album_title\nHAVING COUNT(t.track_id) >= 5\nORDER BY total_runtime DESC\nLIMIT 5;", goal: "Pipeline: Top 5 modern albums with 5+ tracks ordered by total duration." },
      { tbl: "GymMembers", target: "SELECT tr.trainer_name, COUNT(m.member_id) AS active_members, SUM(m.monthly_fee) AS total_monthly_revenue\nFROM Trainers tr\nINNER JOIN GymMembers m ON tr.trainer_id = m.trainer_id\nWHERE m.membership_plan IN ('Gold', 'VIP')\nGROUP BY tr.trainer_id, tr.trainer_name\nHAVING COUNT(m.member_id) >= 2\nORDER BY total_monthly_revenue DESC\nLIMIT 3;", goal: "Pipeline: Top 3 gym coaches generating highest revenue from premium members." },
      { tbl: "MovieReviews", target: "SELECT m.movie_title, COUNT(r.review_id) AS review_count, AVG(r.star_rating) AS average_score\nFROM Movies m\nINNER JOIN MovieReviews r ON m.movie_id = r.movie_id\nWHERE m.release_year >= 2010\nGROUP BY m.movie_id, m.movie_title\nHAVING COUNT(r.review_id) >= 3\nORDER BY average_score DESC\nLIMIT 5;", goal: "Pipeline: Top 5 modern films with 3+ reviews ordered by average rating." },
      { tbl: "FlightSchedule", target: "SELECT al.airline_name, COUNT(f.flight_id) AS route_count, AVG(f.distance_miles) AS avg_distance\nFROM Airlines al\nINNER JOIN FlightSchedule f ON al.airline_id = f.airline_id\nWHERE f.status != 'Cancelled'\nGROUP BY al.airline_id, al.airline_name\nHAVING COUNT(f.flight_id) >= 5\nORDER BY avg_distance DESC\nLIMIT 5;", goal: "Pipeline: Top 5 airlines with 5+ active routes ordered by longest average flight distance." },
      { tbl: "PetClinic", target: "SELECT o.owner_name, COUNT(p.pet_id) AS pet_count, AVG(p.weight_kg) AS avg_weight\nFROM Owners o\nINNER JOIN PetClinic p ON o.owner_id = p.owner_id\nWHERE p.age_years >= 1\nGROUP BY o.owner_id, o.owner_name\nHAVING COUNT(p.pet_id) >= 2\nORDER BY avg_weight DESC\nLIMIT 5;", goal: "Pipeline: Top 5 households with 2+ adult pets ordered by heaviest average pet." }
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
        title: `Syntax #${String(drillNum).padStart(3, '0')}: ${t.goal.replace(/\.$/, '')}`,
        table: t.tbl,
        scenario: t.goal,
        businessObjective: t.goal,
        schemaSnippet: `${t.tbl} relational schema`,
        targetQuery: q,
        syntaxBlueprint: c.blueprint,
        syntaxRule: c.rule,
        syntaxTrap: c.trap,
        eli5Story: `Relational Joins on ${t.tbl}: ${t.goal}`,
        commonMistakes: "Omitting the ON clause, forgetting table alias qualification on ambiguous columns, or accidentally converting LEFT JOIN to INNER JOIN via WHERE filters.",
        learningOutcomes: `Mastered ${c.subcluster} on ${t.tbl}.`,
        challengeSlots: makeSlots(q)
      });
    });
  });
  console.log(`Topic ${topicNum}: Generated ${drills.length} drills (Drill #${drills[0].drillNumber} to #${drills[drills.length - 1].drillNumber})`);
  return drills;
}

const drillsT7 = processClusters(clustersT7, 7);
const drillsT8 = processClusters(clustersT8, 8);
const drillsT9 = processClusters(clustersT9, 9);

fs.writeFileSync('scratch/syntax_drills_t7.json', JSON.stringify(drillsT7, null, 2));
fs.writeFileSync('scratch/syntax_drills_t8.json', JSON.stringify(drillsT8, null, 2));
fs.writeFileSync('scratch/syntax_drills_t9.json', JSON.stringify(drillsT9, null, 2));

console.log('Successfully generated all 300 Relational Join drills!');
