// Generator for Section 0 - Topic 6: String Manipulation & Pattern Matching (Drills #501 to #600)
// 100 progressive micro-drills across 10 everyday schemas.

const fs = require('fs');

const DRILLS_T6 = [];
const tables = ['Students', 'Books', 'Employees', 'GroceryItems', 'Orders', 'MusicTracks', 'GymMembers', 'MovieReviews', 'FlightSchedule', 'PetClinic'];

const clustersT6 = [
  {
    range: [501, 510],
    subcluster: "6.1 Prefix Pattern Matching ('text%')",
    level: "Level 1 (Prefix Match)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, city\nFROM Students\nWHERE full_name LIKE 'A%';", goal: "Find all students whose full name begins with the letter 'A'." },
      { tbl: "Books", target: "SELECT title, author\nFROM Books\nWHERE title LIKE 'The %';", goal: "Retrieve all book titles that start with the word 'The '." },
      { tbl: "Employees", target: "SELECT first_name, department\nFROM Employees\nWHERE first_name LIKE 'J%';", goal: "Find all employees whose first name starts with 'J'." },
      { tbl: "GroceryItems", target: "SELECT item_name, category\nFROM GroceryItems\nWHERE item_name LIKE 'Fresh %';", goal: "Filter grocery products starting with the prefix 'Fresh '." },
      { tbl: "Orders", target: "SELECT order_id, customer_name\nFROM Orders\nWHERE customer_name LIKE 'M%';", goal: "Find customer orders where the buyer's name starts with 'M'." },
      { tbl: "MusicTracks", target: "SELECT track_title, artist_name\nFROM MusicTracks\nWHERE track_title LIKE 'Love %';", goal: "Find all songs whose title starts with 'Love '." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE member_name LIKE 'D%';", goal: "List gym members whose name begins with the letter 'D'." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE movie_title LIKE 'Star %';", goal: "Find movie reviews for titles that start with 'Star '." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport\nFROM FlightSchedule\nWHERE origin_airport LIKE 'S%';", goal: "Find flights departing from airport codes starting with 'S'." },
      { tbl: "PetClinic", target: "SELECT pet_name, species\nFROM PetClinic\nWHERE pet_name LIKE 'B%';", goal: "Find all veterinary patients whose pet name starts with 'B'." }
    ]
  },
  {
    range: [511, 520],
    subcluster: "6.2 Suffix Pattern Matching ('%text')",
    level: "Level 1 (Suffix Match)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, city\nFROM Students\nWHERE city LIKE '%ton';", goal: "Find students living in cities ending with 'ton' (e.g. Boston, Houston)." },
      { tbl: "Books", target: "SELECT title, author\nFROM Books\nWHERE title LIKE '%Edition';", goal: "Find books whose title ends with 'Edition' (e.g., Special Edition)." },
      { tbl: "Employees", target: "SELECT first_name, last_name\nFROM Employees\nWHERE last_name LIKE '%son';", goal: "Find employees whose surname ends with 'son' (e.g. Johnson, Jackson)." },
      { tbl: "GroceryItems", target: "SELECT item_name, category\nFROM GroceryItems\nWHERE item_name LIKE '%Juice';", goal: "Filter all beverage products whose item name ends with 'Juice'." },
      { tbl: "Orders", target: "SELECT order_id, shipping_city\nFROM Orders\nWHERE shipping_city LIKE '%land';", goal: "Find orders destined for cities ending with 'land' (e.g. Portland, Oakland)." },
      { tbl: "MusicTracks", target: "SELECT track_title, genre\nFROM MusicTracks\nWHERE track_title LIKE '%Remix';", goal: "Filter track catalog for all songs ending with 'Remix'." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE membership_plan LIKE '%Tier';", goal: "Find members enrolled in plans ending with 'Tier'." },
      { tbl: "MovieReviews", target: "SELECT movie_title, reviewer_name\nFROM MovieReviews\nWHERE movie_title LIKE '%Part 2';", goal: "Find movie reviews for film sequels ending with 'Part 2'." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, destination_airport\nFROM FlightSchedule\nWHERE destination_airport LIKE '%X';", goal: "Find flights heading to destinations ending with letter 'X' (e.g. PHX, LAX)." },
      { tbl: "PetClinic", target: "SELECT pet_name, breed\nFROM PetClinic\nWHERE breed LIKE '%Retriever';", goal: "Find patient records for all dogs ending with 'Retriever' (e.g. Golden Retriever)." }
    ]
  },
  {
    range: [521, 530],
    subcluster: "6.3 Substring Contains Search ('%text%')",
    level: "Level 1 (Contains Search)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, major\nFROM Students\nWHERE major LIKE '%Science%';", goal: "Find all students enrolled in any major containing 'Science'." },
      { tbl: "Books", target: "SELECT title, genre\nFROM Books\nWHERE title LIKE '%Guide%';", goal: "Find books with the word 'Guide' anywhere in their title." },
      { tbl: "Employees", target: "SELECT first_name, department\nFROM Employees\nWHERE department LIKE '%Tech%';", goal: "Identify employees working in any department containing 'Tech'." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE item_name LIKE '%Organic%';", goal: "Search for all products with 'Organic' in their description." },
      { tbl: "Orders", target: "SELECT order_id, customer_name\nFROM Orders\nWHERE customer_name LIKE '%Smith%';", goal: "Find orders placed by any customer whose name contains 'Smith'." },
      { tbl: "MusicTracks", target: "SELECT track_title, artist_name\nFROM MusicTracks\nWHERE track_title LIKE '%Night%';", goal: "Search track library for songs containing the word 'Night'." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE membership_plan LIKE '%Gold%';", goal: "Find all gym memberships containing 'Gold' in the plan name." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE movie_title LIKE '%Dark%';", goal: "Filter movie reviews for any title containing the word 'Dark'." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, status\nFROM FlightSchedule\nWHERE status LIKE '%Delay%';", goal: "Find all flight records where status mentions 'Delay'." },
      { tbl: "PetClinic", target: "SELECT pet_name, breed\nFROM PetClinic\nWHERE breed LIKE '%Terrier%';", goal: "Find all clinic patients belonging to any 'Terrier' breed variant." }
    ]
  },
  {
    range: [531, 540],
    subcluster: "6.4 Single-Character Wildcard Match ('_')",
    level: "Level 2 (Single-Char Precision)",
    topics: [
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport\nFROM FlightSchedule\nWHERE origin_airport LIKE 'J_F';", goal: "Find flights departing from 3-letter airports matching 'J' followed by any char and 'F'." },
      { tbl: "Students", target: "SELECT full_name, city\nFROM Students\nWHERE full_name LIKE '____';", goal: "Find students whose full name is exactly 4 characters long." },
      { tbl: "Books", target: "SELECT title, price\nFROM Books\nWHERE title LIKE '___';", goal: "Find books whose title consists of exactly 3 characters." },
      { tbl: "Employees", target: "SELECT first_name, department\nFROM Employees\nWHERE first_name LIKE 'A___';", goal: "Find employees whose first name starts with 'A' and has exactly 4 characters total." },
      { tbl: "GroceryItems", target: "SELECT item_name, category\nFROM GroceryItems\nWHERE item_name LIKE '____';", goal: "Filter grocery products with exactly 4-letter product names (e.g. Milk, Rice, Pear)." },
      { tbl: "Orders", target: "SELECT order_id, order_status\nFROM Orders\nWHERE order_status LIKE '______';", goal: "Find orders where status text is exactly 6 letters long." },
      { tbl: "MusicTracks", target: "SELECT track_title, genre\nFROM MusicTracks\nWHERE genre LIKE '___';", goal: "Find music tracks categorized under exact 3-letter genres (e.g. Pop, Rap)." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE member_name LIKE '___';", goal: "Find gym members whose registered name is exactly 3 letters (e.g. Amy, Dan)." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE movie_title LIKE '____';", goal: "Find film reviews for 4-letter movie titles (e.g. Dune, Cars, Jaws)." },
      { tbl: "PetClinic", target: "SELECT pet_name, species\nFROM PetClinic\nWHERE pet_name LIKE 'M___';", goal: "Find pet patients with 4-letter names starting with 'M' (e.g. Milo, Maxx)." }
    ]
  },
  {
    range: [541, 550],
    subcluster: "6.5 Case Normalization (UPPER & LOWER)",
    level: "Level 1 (Case Functions)",
    topics: [
      { tbl: "Students", target: "SELECT UPPER(full_name) AS capitalized_name, LOWER(city) AS lowercase_city\nFROM Students;", goal: "Format student names in UPPERCASE and home cities in lowercase." },
      { tbl: "Books", target: "SELECT UPPER(title) AS banner_title, LOWER(genre) AS tag_genre\nFROM Books;", goal: "Display book titles in uppercase banner format and genres in clean lowercase." },
      { tbl: "Employees", target: "SELECT UPPER(last_name) AS surname, LOWER(first_name) AS given_name\nFROM Employees;", goal: "Standardize employee records: UPPERCASE surname and lowercase given name." },
      { tbl: "GroceryItems", target: "SELECT UPPER(item_name) AS uppercase_item, LOWER(category) AS normalized_category\nFROM GroceryItems;", goal: "Render item name in uppercase and category in lowercase." },
      { tbl: "Orders", target: "SELECT order_id, UPPER(order_status) AS audit_status\nFROM Orders\nWHERE LOWER(shipping_city) = 'seattle';", goal: "Case-insensitive city search using LOWER(shipping_city) and format status in UPPERCASE." },
      { tbl: "MusicTracks", target: "SELECT UPPER(track_title) AS track_header, LOWER(artist_name) AS artist_handle\nFROM MusicTracks;", goal: "Generate track headers in uppercase and artist handles in lowercase." },
      { tbl: "GymMembers", target: "SELECT UPPER(member_name) AS badge_name, LOWER(membership_plan) AS plan_slug\nFROM GymMembers;", goal: "Format gym member badge names in uppercase and membership plan slugs in lowercase." },
      { tbl: "MovieReviews", target: "SELECT UPPER(movie_title) AS marquee_title\nFROM MovieReviews\nWHERE LOWER(genre) = 'sci-fi';", goal: "Select marquee uppercase titles for sci-fi films using case-insensitive filter." },
      { tbl: "FlightSchedule", target: "SELECT UPPER(flight_id) AS flight_code, LOWER(status) AS status_indicator\nFROM FlightSchedule;", goal: "Format flight codes in uppercase and status indicators in lowercase." },
      { tbl: "PetClinic", target: "SELECT UPPER(pet_name) AS medical_chart_name, LOWER(species) AS species_code\nFROM PetClinic;", goal: "Standardize veterinary chart: pet name in uppercase and species code in lowercase." }
    ]
  },
  {
    range: [551, 560],
    subcluster: "6.6 String Slicing (LEFT, RIGHT, SUBSTRING)",
    level: "Level 2 (Slicing Functions)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, LEFT(full_name, 1) AS first_initial\nFROM Students;", goal: "Extract the first initial of each student using the LEFT() function." },
      { tbl: "Books", target: "SELECT title, LEFT(title, 10) AS preview_title\nFROM Books;", goal: "Extract the first 10 characters of book titles using LEFT() for compact card previews." },
      { tbl: "Employees", target: "SELECT first_name, RIGHT(hire_date, 4) AS hire_year_str\nFROM Employees;", goal: "Extract the 4-digit year suffix from hire_date using RIGHT()." },
      { tbl: "GroceryItems", target: "SELECT item_name, SUBSTRING(item_name, 1, 3) AS short_code\nFROM GroceryItems;", goal: "Generate a 3-character product abbreviation using SUBSTRING(item_name, 1, 3)." },
      { tbl: "Orders", target: "SELECT order_id, RIGHT(shipping_city, 3) AS city_suffix\nFROM Orders;", goal: "Extract the last 3 characters of the destination city using RIGHT()." },
      { tbl: "MusicTracks", target: "SELECT track_title, LEFT(artist_name, 3) AS artist_prefix\nFROM MusicTracks;", goal: "Extract the first 3 letters of the artist name using LEFT()." },
      { tbl: "GymMembers", target: "SELECT member_name, SUBSTRING(member_name, 1, 5) AS nickname\nFROM GymMembers;", goal: "Extract the first 5 characters of member names using SUBSTRING()." },
      { tbl: "MovieReviews", target: "SELECT movie_title, LEFT(movie_title, 5) AS title_stub\nFROM MovieReviews;", goal: "Extract a 5-character title stub using LEFT()." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, SUBSTRING(flight_id, 3, 3) AS numeric_flight_number\nFROM FlightSchedule;", goal: "Extract the 3 numeric digits from flight_id (starting at pos 3) using SUBSTRING()." },
      { tbl: "PetClinic", target: "SELECT pet_name, RIGHT(owner_name, 4) AS owner_identifier\nFROM PetClinic;", goal: "Extract the last 4 characters of the pet owner's name using RIGHT()." }
    ]
  },
  {
    range: [561, 570],
    subcluster: "6.7 String Length & Character Metrics (LENGTH)",
    level: "Level 1 (String Metrics)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, LENGTH(full_name) AS name_char_count\nFROM Students\nORDER BY name_char_count DESC;", goal: "Calculate character count of each student's name and order from longest to shortest." },
      { tbl: "Books", target: "SELECT title, LENGTH(title) AS title_length\nFROM Books\nWHERE LENGTH(title) > 20;", goal: "Filter books with long titles exceeding 20 characters using LENGTH()." },
      { tbl: "Employees", target: "SELECT first_name, LENGTH(first_name) AS char_length\nFROM Employees\nWHERE LENGTH(first_name) <= 4;", goal: "Find employees with concise first names of 4 characters or fewer." },
      { tbl: "GroceryItems", target: "SELECT item_name, LENGTH(item_name) AS name_len\nFROM GroceryItems\nORDER BY name_len ASC;", goal: "Order grocery inventory by length of product name from shortest to longest." },
      { tbl: "Orders", target: "SELECT shipping_city, LENGTH(shipping_city) AS city_name_length\nFROM Orders\nGROUP BY shipping_city;", goal: "Calculate the character length of each unique shipping city name." },
      { tbl: "MusicTracks", target: "SELECT track_title, LENGTH(track_title) AS title_len\nFROM MusicTracks\nWHERE LENGTH(track_title) >= 15;", goal: "Find song titles containing 15 or more characters." },
      { tbl: "GymMembers", target: "SELECT member_name, LENGTH(member_name) AS name_len\nFROM GymMembers\nORDER BY name_len DESC\nLIMIT 5;", goal: "Find the top 5 gym members with the longest registered names." },
      { tbl: "MovieReviews", target: "SELECT movie_title, LENGTH(movie_title) AS letters_in_title\nFROM MovieReviews\nWHERE LENGTH(movie_title) < 10;", goal: "Find movie reviews for short film titles with fewer than 10 characters." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, LENGTH(flight_id) AS code_len\nFROM FlightSchedule;", goal: "Verify flight_id character length across all scheduled flights." },
      { tbl: "PetClinic", target: "SELECT pet_name, LENGTH(pet_name) AS name_length\nFROM PetClinic\nWHERE LENGTH(pet_name) = 4;", goal: "Find pets whose names are exactly 4 characters long using LENGTH()." }
    ]
  },
  {
    range: [571, 580],
    subcluster: "6.8 String Concatenation (CONCAT)",
    level: "Level 2 (Concatenation)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, city,\n  CONCAT(full_name, ' from ', city) AS student_hometown_profile\nFROM Students;", goal: "Combine student name and hometown into a single formatted profile string with CONCAT." },
      { tbl: "Books", target: "SELECT title, author,\n  CONCAT(title, ' by ', author) AS bibliographic_entry\nFROM Books;", goal: "Create bibliographic entries formatted as 'Title by Author' using CONCAT()." },
      { tbl: "Employees", target: "SELECT first_name, department,\n  CONCAT(first_name, ' (', department, ')') AS staff_label\nFROM Employees;", goal: "Assemble employee badges formatted as 'Name (Department)' using CONCAT()." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  CONCAT('$', unit_price, ' per unit') AS price_label\nFROM GroceryItems;", goal: "Format shelf price tag string '$X.XX per unit' using CONCAT." },
      { tbl: "Orders", target: "SELECT order_id, customer_name, shipping_city,\n  CONCAT('Order #', order_id, ' -> ', customer_name, ' in ', shipping_city) AS routing_manifest\nFROM Orders;", goal: "Build routing manifest string combining order ID, customer name, and city." },
      { tbl: "MusicTracks", target: "SELECT track_title, artist_name,\n  CONCAT(artist_name, ' - ', track_title) AS media_player_title\nFROM MusicTracks;", goal: "Format audio player string as 'Artist - Track Title' via CONCAT()." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan,\n  CONCAT(member_name, ' [', membership_plan, ' Member]') AS membership_tag\nFROM GymMembers;", goal: "Create membership tags formatted as 'Name [Plan Member]'." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  CONCAT(movie_title, ' (Rated: ', star_rating, '/5.0)') AS score_summary\nFROM MovieReviews;", goal: "Assemble movie summary strings displaying title and star rating." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport, destination_airport,\n  CONCAT(origin_airport, ' -> ', destination_airport) AS route_path\nFROM FlightSchedule;", goal: "Build clean flight route string 'ORIGIN -> DESTINATION' using CONCAT." },
      { tbl: "PetClinic", target: "SELECT pet_name, species, breed,\n  CONCAT(pet_name, ' the ', breed, ' ', species) AS patient_bio\nFROM PetClinic;", goal: "Assemble patient bio strings formatted as 'Name the Breed Species'." }
    ]
  },
  {
    range: [581, 590],
    subcluster: "6.9 Cleaning & Replacement (TRIM, REPLACE)",
    level: "Level 2 (Data Cleaning)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, REPLACE(city, 'New ', 'N. ') AS abbreviated_city\nFROM Students;", goal: "Abbreviate 'New ' to 'N. ' in city names using REPLACE()." },
      { tbl: "Books", target: "SELECT title, REPLACE(title, ':', ' -') AS sanitized_title\nFROM Books;", goal: "Replace colons with hyphens in book titles using REPLACE()." },
      { tbl: "Employees", target: "SELECT first_name, REPLACE(department, 'Engineering', 'Eng') AS short_dept\nFROM Employees;", goal: "Replace 'Engineering' with shorthand 'Eng' using REPLACE()." },
      { tbl: "GroceryItems", target: "SELECT item_name, TRIM(item_name) AS cleaned_item_name\nFROM GroceryItems;", goal: "Strip unwanted leading and trailing whitespace from product names using TRIM()." },
      { tbl: "Orders", target: "SELECT order_id, REPLACE(order_status, 'Delivered', 'COMPLETED') AS display_status\nFROM Orders;", goal: "Replace 'Delivered' status with 'COMPLETED' in order reports." },
      { tbl: "MusicTracks", target: "SELECT track_title, REPLACE(genre, 'Hip-Hop', 'Hip Hop') AS normalized_genre\nFROM MusicTracks;", goal: "Standardize genre hyphenation by replacing 'Hip-Hop' with 'Hip Hop'." },
      { tbl: "GymMembers", target: "SELECT member_name, TRIM(membership_plan) AS clean_plan\nFROM GymMembers;", goal: "Remove extra padding spaces around membership plan names using TRIM()." },
      { tbl: "MovieReviews", target: "SELECT movie_title, REPLACE(movie_title, '&', 'and') AS clean_title\nFROM MovieReviews;", goal: "Replace ampersand characters with 'and' in movie titles using REPLACE()." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, REPLACE(status, 'On Time', 'ON-TIME') AS standardized_status\nFROM FlightSchedule;", goal: "Format flight status text with hyphenation using REPLACE()." },
      { tbl: "PetClinic", target: "SELECT pet_name, REPLACE(breed, 'Mixed', 'Crossbreed') AS updated_breed\nFROM PetClinic;", goal: "Replace terminology 'Mixed' with 'Crossbreed' in pet records via REPLACE()." }
    ]
  },
  {
    range: [591, 600],
    subcluster: "6.10 Full Lifecycle Text Queries & Bug Hunts",
    level: "Level 3 (Text Pipelines & Bug Hunts)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, city\nFROM Students\nWHERE LOWER(city) LIKE '%seattle%'\nORDER BY full_name ASC;", goal: "Case-insensitive substring search combining LOWER() and LIKE '%seattle%'." },
      { tbl: "Books", target: "SELECT title, author, LENGTH(title) AS len\nFROM Books\nWHERE title LIKE 'The %'\nORDER BY len DESC\nLIMIT 5;", goal: "Find top 5 longest titles starting with 'The ' ordered by LENGTH() descending." },
      { tbl: "Employees", target: "SELECT CONCAT(first_name, ' ', last_name) AS full_name, department\nFROM Employees\nWHERE department LIKE '%Tech%'\nORDER BY full_name ASC;", goal: "Assemble full names with CONCAT and filter departments containing 'Tech'." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE item_name NOT LIKE '%Organic%'\nORDER BY unit_price ASC;", goal: "Use NOT LIKE to exclude all organic items from the budget search." },
      { tbl: "Orders", target: "SELECT order_id, customer_name, shipping_city\nFROM Orders\nWHERE shipping_city LIKE 'S%'\n  AND customer_name LIKE '%a%'\nORDER BY order_id ASC;", goal: "Combine multiple LIKE conditions: shipping city starts with 'S' AND buyer name contains 'a'." },
      { tbl: "MusicTracks", target: "SELECT UPPER(genre) AS genre_tag, COUNT(*) AS track_count\nFROM MusicTracks\nWHERE track_title LIKE '%Love%'\nGROUP BY genre_tag\nORDER BY track_count DESC;", goal: "Group by UPPER(genre) to aggregate songs with 'Love' in their title." },
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE member_name NOT LIKE 'A%'\nORDER BY member_name ASC;", goal: "Use NOT LIKE 'A%' to retrieve members whose names do not begin with 'A'." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE movie_title LIKE '%Part %'\nORDER BY star_rating DESC\nLIMIT 3;", goal: "Find top 3 highest-rated movie franchises with 'Part ' in their title." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, CONCAT(origin_airport, '-', destination_airport) AS route\nFROM FlightSchedule\nWHERE flight_id LIKE 'AA%'\nORDER BY flight_id ASC;", goal: "Filter flights by airline prefix ('AA%') and build route string with CONCAT." },
      { tbl: "PetClinic", target: "SELECT pet_name, breed, species\nFROM PetClinic\nWHERE breed LIKE '%Doodle%'\nORDER BY pet_name ASC;", goal: "Search clinic patients for popular hybrid breeds containing 'Doodle'." }
    ]
  }
];

function makeSlots(query) {
  return query.split(/\s+/).map(tok => {
    let type = "column";
    const kw = tok.toUpperCase().replace(/[(),;]/g, '');
    if (["SELECT", "FROM", "WHERE", "GROUP", "BY", "HAVING", "ORDER", "ASC", "DESC", "LIMIT", "LIKE", "NOT", "UPPER", "LOWER", "CONCAT", "SUBSTRING", "LEFT", "RIGHT", "LENGTH", "TRIM", "REPLACE", "AS", "AND", "OR", "COUNT"].includes(kw)) {
      type = "keyword";
    }
    if (tables.some(t => tok.includes(t))) type = "table";
    return { type, value: tok };
  });
}

clustersT6.forEach(c => {
  c.topics.forEach((t, i) => {
    const drillNum = c.range[0] + i;
    const q = t.target;
    DRILLS_T6.push({
      drillNumber: drillNum,
      subcluster: c.subcluster,
      level: c.level,
      title: `Syntax #${String(drillNum).padStart(3, '0')}: ${t.goal.replace(/\.$/, '')}`,
      table: t.tbl,
      scenario: t.goal,
      businessObjective: t.goal,
      schemaSnippet: `${t.tbl} schema`,
      targetQuery: q,
      syntaxBlueprint: `SELECT col_name\nFROM ${t.tbl}\nWHERE col_name LIKE 'pattern%';`,
      syntaxRule: "LIKE uses '%' for 0 or more characters and '_' for exactly 1 character. Functions like UPPER, LOWER, CONCAT, SUBSTRING, and LENGTH manipulate strings directly in SQL expressions.",
      syntaxTrap: "Using '*' instead of '%' in SQL queries (wildcard is % in SQL, not *), or forgetting that LIKE is case-sensitive in PostgreSQL (use ILIKE or LOWER).",
      eli5Story: `String manipulation and text pattern matching on ${t.tbl}: ${t.goal}`,
      commonMistakes: "Using '=' instead of LIKE with wildcards, using asterisk (*) instead of percent (%), or confusing SUBSTRING 1-based indexing with 0-based programming languages.",
      learningOutcomes: `Mastered ${c.subcluster} on ${t.tbl}.`,
      challengeSlots: makeSlots(q)
    });
  });
});

console.log('Total Topic 6 drills generated:', DRILLS_T6.length);
fs.writeFileSync('scratch/syntax_drills_t6.json', JSON.stringify(DRILLS_T6, null, 2));
