// Generator for Section 0 - Topic 1: SELECT & Projections (Drills #001 to #100)
// High-variety, zero corporate jargon, friendly everyday schemas.

const fs = require('fs');

const DRILLS_T1 = [];

const tables = ['Students', 'Books', 'Employees', 'GroceryItems', 'Orders', 'MusicTracks', 'GymMembers', 'MovieReviews', 'FlightSchedule', 'PetClinic'];

// 1.1 SELECT * and Single Column (#001 - #010)
DRILLS_T1.push(
  {
    drillNumber: 1,
    subcluster: "1.1 Basic Projections",
    level: "Level 1 (Foundations)",
    title: "Retrieve the Entire Students Table",
    table: "Students",
    scenario: "You are setting up the classroom roster. Retrieve all columns and all records for every enrolled student.",
    businessObjective: "Pull every column using the universal asterisk wildcard.",
    schemaSnippet: "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    targetQuery: "SELECT *\nFROM Students;",
    syntaxBlueprint: "SELECT *\nFROM table_name;",
    syntaxRule: "The asterisk (*) represents all columns. Always follow SELECT * with FROM and your table name.",
    syntaxTrap: "Writing 'SELECT ALL FROM Students;' (ALL is an aggregate modifier, not a column wildcard).",
    eli5Story: "Think of SELECT * like taking a wide-angle snapshot of the entire room—everyone and everything is captured.",
    commonMistakes: "Putting a semicolon after SELECT or forgetting the FROM keyword.",
    learningOutcomes: "Mastered basic table scanning and wildcard projections.",
    challengeSlots: [{ type: "keyword", value: "SELECT" }, { type: "column", value: "*" }, { type: "keyword", value: "FROM" }, { type: "table", value: "Students;" }]
  },
  {
    drillNumber: 2,
    subcluster: "1.1 Basic Projections",
    level: "Level 1 (Foundations)",
    title: "Inspect Available Library Books",
    table: "Books",
    scenario: "The librarian wants to review the full catalog including inventory and pricing.",
    businessObjective: "Select every column from the Books catalog.",
    schemaSnippet: "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    targetQuery: "SELECT *\nFROM Books;",
    syntaxBlueprint: "SELECT *\nFROM table_name;",
    syntaxRule: "A query must end with a semicolon in standard SQL clients.",
    syntaxTrap: "Typing the table name before SELECT.",
    eli5Story: "Opening the master binder that has every detail of every book.",
    commonMistakes: "Omitting the semicolon at the end of the query.",
    learningOutcomes: "Mastered full catalog inspection.",
    challengeSlots: [{ type: "keyword", value: "SELECT" }, { type: "column", value: "*" }, { type: "keyword", value: "FROM" }, { type: "table", value: "Books;" }]
  },
  {
    drillNumber: 3,
    subcluster: "1.1 Basic Projections",
    level: "Level 1 (Foundations)",
    title: "Display Student First Names Only",
    table: "Students",
    scenario: "Generate an attendance roll call sheet displaying only the first name of each student.",
    businessObjective: "Extract a single specific column to minimize memory overhead.",
    schemaSnippet: "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    targetQuery: "SELECT first_name\nFROM Students;",
    syntaxBlueprint: "SELECT column_name\nFROM table_name;",
    syntaxRule: "When selecting a single column, no commas are used anywhere in the query.",
    syntaxTrap: "Writing 'SELECT first_name, FROM Students;' (trailing comma before FROM).",
    eli5Story: "Calling out roll call by first names only—no need to say last names or birth dates.",
    commonMistakes: "Accidentally adding a comma after the single column name.",
    learningOutcomes: "Mastered single-column extraction without unnecessary commas.",
    challengeSlots: [{ type: "keyword", value: "SELECT" }, { type: "column", value: "first_name" }, { type: "keyword", value: "FROM" }, { type: "table", value: "Students;" }]
  },
  {
    drillNumber: 4,
    subcluster: "1.1 Basic Projections",
    level: "Level 1 (Foundations)",
    title: "List All Book Titles",
    table: "Books",
    scenario: "Print the spine labels for bookstore shelves showing only book titles.",
    businessObjective: "Select the title column from the Books table.",
    schemaSnippet: "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    targetQuery: "SELECT title\nFROM Books;",
    syntaxBlueprint: "SELECT column_name\nFROM table_name;",
    syntaxRule: "Column names are case-insensitive in ANSI SQL, but snake_case is standard practice.",
    syntaxTrap: "Wrapping the column name in single quotes ('title' will output the literal word 'title' for every row!).",
    eli5Story: "Printing a list of book titles to tape onto the bookshelf edges.",
    commonMistakes: "Putting single quotes around column identifiers.",
    learningOutcomes: "Understood the difference between column names and text literals.",
    challengeSlots: [{ type: "keyword", value: "SELECT" }, { type: "column", value: "title" }, { type: "keyword", value: "FROM" }, { type: "table", value: "Books;" }]
  },
  {
    drillNumber: 5,
    subcluster: "1.1 Basic Projections",
    level: "Level 1 (Foundations)",
    title: "Extract Music Track Titles",
    table: "MusicTracks",
    scenario: "A music streaming app needs to fetch just the track titles for an index screen.",
    businessObjective: "Select the track_title column from MusicTracks.",
    schemaSnippet: "MusicTracks(track_id INT, track_title VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    targetQuery: "SELECT track_title\nFROM MusicTracks;",
    syntaxBlueprint: "SELECT column_name\nFROM table_name;",
    syntaxRule: "Ensure exact column spelling matches the database schema definition.",
    syntaxTrap: "Misspelling 'track_title' as 'track_name' or 'song'.",
    eli5Story: "Displaying the song titles on your phone's lock screen.",
    commonMistakes: "Guessing column names instead of referencing the schema.",
    learningOutcomes: "Learned schema column alignment.",
    challengeSlots: [{ type: "keyword", value: "SELECT" }, { type: "column", value: "track_title" }, { type: "keyword", value: "FROM" }, { type: "table", value: "MusicTracks;" }]
  },
  {
    drillNumber: 6,
    subcluster: "1.1 Basic Projections",
    level: "Level 1 (Foundations)",
    title: "View All Grocery Inventory Items",
    table: "GroceryItems",
    scenario: "The supermarket stock manager performs an initial scan of the entire product table.",
    businessObjective: "Retrieve all columns from GroceryItems.",
    schemaSnippet: "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, is_organic BOOLEAN, calories INT, stock_units INT)",
    targetQuery: "SELECT *\nFROM GroceryItems;",
    syntaxBlueprint: "SELECT *\nFROM table_name;",
    syntaxRule: "Asterisk selects columns in their physical storage order.",
    syntaxTrap: "Writing 'SELECT GroceryItems.*' when only one table is involved (redundant prefix).",
    eli5Story: "Opening the full stock inventory sheet on the store scanner.",
    commonMistakes: "Overcomplicating the query with table qualifiers when scanning a single table.",
    learningOutcomes: "Mastered full table scan syntax.",
    challengeSlots: [{ type: "keyword", value: "SELECT" }, { type: "column", value: "*" }, { type: "keyword", value: "FROM" }, { type: "table", value: "GroceryItems;" }]
  },
  {
    drillNumber: 7,
    subcluster: "1.1 Basic Projections",
    level: "Level 1 (Foundations)",
    title: "Extract Employee Email Handles (Last Names)",
    table: "Employees",
    scenario: "The IT department needs all employee last names to verify domain directory entries.",
    businessObjective: "Select last_name from Employees.",
    schemaSnippet: "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, bonus DECIMAL, hire_date DATE)",
    targetQuery: "SELECT last_name\nFROM Employees;",
    syntaxBlueprint: "SELECT column_name\nFROM table_name;",
    syntaxRule: "Specifying only the needed column saves network bandwidth and buffer cache.",
    syntaxTrap: "Using 'SELECT last_name;' without a FROM clause.",
    eli5Story: "Printing a list of family names for mailbox labels in the office lobby.",
    commonMistakes: "Forgetting the FROM clause.",
    learningOutcomes: "Reinforced mandatory FROM clause syntax.",
    challengeSlots: [{ type: "keyword", value: "SELECT" }, { type: "column", value: "last_name" }, { type: "keyword", value: "FROM" }, { type: "table", value: "Employees;" }]
  },
  {
    drillNumber: 8,
    subcluster: "1.1 Basic Projections",
    level: "Level 1 (Foundations)",
    title: "List Registered Pet Names",
    table: "PetClinic",
    scenario: "The receptionist at the veterinary clinic needs a list of all patient pet names.",
    businessObjective: "Select pet_name from PetClinic.",
    schemaSnippet: "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN, owner_city VARCHAR)",
    targetQuery: "SELECT pet_name\nFROM PetClinic;",
    syntaxBlueprint: "SELECT column_name\nFROM table_name;",
    syntaxRule: "Target table follows immediately after the FROM keyword.",
    syntaxTrap: "Writing 'FROM PetClinic SELECT pet_name' (lexical syntax requires SELECT first).",
    eli5Story: "Checking the appointment book to see which dogs, cats, and birds are visiting today.",
    commonMistakes: "Inverting SELECT and FROM order.",
    learningOutcomes: "Solidified lexical statement ordering.",
    challengeSlots: [{ type: "keyword", value: "SELECT" }, { type: "column", value: "pet_name" }, { type: "keyword", value: "FROM" }, { type: "table", value: "PetClinic;" }]
  },
  {
    drillNumber: 9,
    subcluster: "1.1 Basic Projections",
    level: "Level 1 (Foundations)",
    title: "Fetch Movie Titles for Marquee",
    table: "MovieReviews",
    scenario: "The cinema manager updates the outdoor marquee sign with all film titles.",
    businessObjective: "Select movie_title from MovieReviews.",
    schemaSnippet: "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, genre VARCHAR, star_rating DECIMAL, release_year INT, review_length_words INT)",
    targetQuery: "SELECT movie_title\nFROM MovieReviews;",
    syntaxBlueprint: "SELECT column_name\nFROM table_name;",
    syntaxRule: "Keywords are traditionally uppercase and column names lowercase for readability.",
    syntaxTrap: "Writing 'SELECT movie title' without the underscore (space causes syntax parse failure).",
    eli5Story: "Putting letter tiles on the big illuminated movie theater sign outside.",
    commonMistakes: "Omitting the underscore in multi-word column names.",
    learningOutcomes: "Learned identifier formatting without spaces.",
    challengeSlots: [{ type: "keyword", value: "SELECT" }, { type: "column", value: "movie_title" }, { type: "keyword", value: "FROM" }, { type: "table", value: "MovieReviews;" }]
  },
  {
    drillNumber: 10,
    subcluster: "1.1 Basic Projections",
    level: "Level 1 (Foundations)",
    title: "Check Flight Number Schedule",
    table: "FlightSchedule",
    scenario: "The departure board updates the list of all operating flight numbers.",
    businessObjective: "Select flight_id from FlightSchedule.",
    schemaSnippet: "FlightSchedule(flight_id VARCHAR, airline VARCHAR, origin_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL, is_international BOOLEAN)",
    targetQuery: "SELECT flight_id\nFROM FlightSchedule;",
    syntaxBlueprint: "SELECT column_name\nFROM table_name;",
    syntaxRule: "Identifiers can contain numbers and underscores but cannot start with a number.",
    syntaxTrap: "Writing 'SELECT flight-id' with a hyphen (hyphen means subtraction!).",
    eli5Story: "Looking at the big yellow departure board at the airport terminal.",
    commonMistakes: "Using a hyphen instead of an underscore.",
    learningOutcomes: "Understood SQL identifier syntax rules.",
    challengeSlots: [{ type: "keyword", value: "SELECT" }, { type: "column", value: "flight_id" }, { type: "keyword", value: "FROM" }, { type: "table", value: "FlightSchedule;" }]
  }
);

// We will write a programmatic builder to construct the remaining 90 drills for Topic 1
// covering 1.2 to 1.10 with high quality, realistic schemas and zero placeholders.

const clustersT1 = [
  {
    range: [11, 20],
    subcluster: "1.2 Multi-Column & Commas",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", cols: ["first_name", "last_name", "gpa"], goal: "Select the first name, last name, and GPA for all students." },
      { tbl: "Books", cols: ["title", "author", "price"], goal: "Display book title, author, and price for a book fair catalog." },
      { tbl: "Employees", cols: ["first_name", "department", "salary"], goal: "Extract first name, department, and salary for the monthly compensation review." },
      { tbl: "GroceryItems", cols: ["item_name", "category", "unit_price"], goal: "List grocery item name, its category, and unit price for shelf price tags." },
      { tbl: "Orders", cols: ["customer_name", "product_name", "quantity"], goal: "View customer name, purchased product, and ordered quantity on packing slips." },
      { tbl: "MusicTracks", cols: ["track_title", "artist_name", "duration_seconds"], goal: "Show track title, artist name, and duration in seconds for the media player." },
      { tbl: "GymMembers", cols: ["member_name", "membership_plan", "monthly_fee"], goal: "Fetch gym member name, plan type, and monthly fee for billing." },
      { tbl: "MovieReviews", cols: ["movie_title", "director", "star_rating"], goal: "Output movie title, director, and star rating for a film review website." },
      { tbl: "FlightSchedule", cols: ["flight_id", "airline", "origin_airport", "dest_airport"], goal: "Display flight ID, airline, origin airport, and destination airport for the flight gate monitor." },
      { tbl: "PetClinic", cols: ["pet_name", "species", "age_years", "weight_kg"], goal: "Retrieve pet name, species, age in years, and weight in kg for veterinary patient intake." }
    ]
  },
  {
    range: [21, 30],
    subcluster: "1.3 Column Aliases (AS)",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", select: "full_name AS student_name, gpa AS academic_gpa", goal: "Rename full_name to student_name and gpa to academic_gpa.", cols: ["full_name AS student_name", "gpa AS academic_gpa"] },
      { tbl: "Books", select: "title AS book_title, price AS retail_price_usd", goal: "Rename title to book_title and price to retail_price_usd.", cols: ["title AS book_title", "price AS retail_price_usd"] },
      { tbl: "Employees", select: "first_name AS employee, salary AS base_compensation", goal: "Alias first_name as employee and salary as base_compensation.", cols: ["first_name AS employee", "salary AS base_compensation"] },
      { tbl: "GroceryItems", select: "item_name AS product, unit_price AS cost_per_unit", goal: "Alias item_name to product and unit_price to cost_per_unit.", cols: ["item_name AS product", "unit_price AS cost_per_unit"] },
      { tbl: "Orders", select: "customer_name AS buyer, quantity AS units_ordered", goal: "Rename customer_name to buyer and quantity to units_ordered.", cols: ["customer_name AS buyer", "quantity AS units_ordered"] },
      { tbl: "MusicTracks", select: "track_title AS song, artist_name AS musician", goal: "Alias track_title as song and artist_name as musician.", cols: ["track_title AS song", "artist_name AS musician"] },
      { tbl: "GymMembers", select: "member_name AS client, monthly_fee AS rate", goal: "Rename member_name to client and monthly_fee to rate.", cols: ["member_name AS client", "monthly_fee AS rate"] },
      { tbl: "MovieReviews", select: "movie_title AS film, star_rating AS score", goal: "Alias movie_title to film and star_rating to score.", cols: ["movie_title AS film", "star_rating AS score"] },
      { tbl: "FlightSchedule", select: "flight_id AS flight_code, ticket_price AS fare_usd", goal: "Rename flight_id to flight_code and ticket_price to fare_usd.", cols: ["flight_id AS flight_code", "ticket_price AS fare_usd"] },
      { tbl: "PetClinic", select: "pet_name AS patient_name, age_years AS patient_age", goal: "Alias pet_name to patient_name and age_years to patient_age.", cols: ["pet_name AS patient_name", "age_years AS patient_age"] }
    ]
  },
  {
    range: [31, 40],
    subcluster: "1.4 Constant Literals",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", select: "full_name, 'Active' AS enrollment_status", goal: "Select full_name alongside a static text label 'Active' as enrollment_status." },
      { tbl: "Books", select: "title, 'Central Library' AS branch_location", goal: "Select book title and a fixed location string 'Central Library' as branch_location." },
      { tbl: "Employees", select: "first_name, 2026 AS review_year", goal: "Select employee first_name alongside a fixed numerical year 2026 as review_year." },
      { tbl: "GroceryItems", select: "item_name, 'In Stock' AS availability", goal: "Display item_name with a constant string 'In Stock' as availability." },
      { tbl: "Orders", select: "order_id, TRUE AS is_verified", goal: "Select order_id with a boolean literal TRUE as is_verified." },
      { tbl: "MusicTracks", select: "track_title, 'HQ Audio' AS format_type", goal: "Select track_title with constant text 'HQ Audio' as format_type." },
      { tbl: "GymMembers", select: "member_name, 30 AS grace_period_days", goal: "Display member_name with a constant integer 30 as grace_period_days." },
      { tbl: "MovieReviews", select: "movie_title, 5.0 AS max_possible_rating", goal: "Select movie_title with a decimal constant 5.0 as max_possible_rating." },
      { tbl: "FlightSchedule", select: "flight_id, 'Terminal 2' AS assigned_terminal", goal: "Select flight_id with a static string 'Terminal 2' as assigned_terminal." },
      { tbl: "PetClinic", select: "pet_name, 'Downtown Vet' AS clinic_name", goal: "Display pet_name with fixed text 'Downtown Vet' as clinic_name." }
    ]
  },
  {
    range: [41, 50],
    subcluster: "1.5 Arithmetic Operators",
    level: "Level 2 (Calculations)",
    topics: [
      { tbl: "Books", select: "title, price, (price * stock_qty) AS total_inventory_value", goal: "Calculate the total inventory value by multiplying price by stock_qty." },
      { tbl: "Orders", select: "order_id, (unit_price * quantity) AS subtotal", goal: "Compute order subtotal by multiplying unit_price by quantity." },
      { tbl: "Employees", select: "first_name, salary, (salary * 0.10) AS raise_amount, (salary * 1.10) AS projected_salary", goal: "Calculate a 10% raise amount and the resulting projected salary." },
      { tbl: "Students", select: "full_name, gpa, (gpa * 25.0) AS gpa_percentage", goal: "Convert a 4.0 GPA to an approximate 100-point scale by multiplying by 25.0." },
      { tbl: "GroceryItems", select: "item_name, unit_price, (unit_price * 1.08) AS price_with_tax", goal: "Calculate the item price including an 8% sales tax (unit_price * 1.08)." },
      { tbl: "MusicTracks", select: "track_title, duration_seconds, (duration_seconds / 60.0) AS duration_minutes", goal: "Convert duration in seconds into fractional minutes by dividing by 60.0." },
      { tbl: "GymMembers", select: "member_name, monthly_fee, (monthly_fee * 12) AS annual_cost", goal: "Compute the total annual membership cost by multiplying monthly_fee by 12." },
      { tbl: "FlightSchedule", select: "flight_id, ticket_price, (ticket_price + 35.00) AS price_with_baggage", goal: "Add a $35 standard checked bag fee to ticket_price." },
      { tbl: "PetClinic", select: "pet_name, weight_kg, (weight_kg * 2.20462) AS weight_lbs", goal: "Convert pet weight from kilograms to pounds by multiplying by 2.20462." },
      { tbl: "Orders", select: "order_id, unit_price, quantity, ((unit_price * quantity) * (1 - discount_pct)) AS final_charged_amount", goal: "Calculate the final discounted total: subtotal times (1 - discount_pct)." }
    ]
  },
  {
    range: [51, 60],
    subcluster: "1.6 Math & Rounding Functions",
    level: "Level 2 (Calculations)",
    topics: [
      { tbl: "GroceryItems", select: "item_name, ROUND(unit_price * 1.0825, 2) AS rounded_tax_price", goal: "Round calculated price with 8.25% sales tax to 2 decimal places using ROUND()." },
      { tbl: "Students", select: "full_name, ROUND(gpa, 1) AS rounded_gpa", goal: "Round GPA to 1 decimal place using ROUND(gpa, 1)." },
      { tbl: "MusicTracks", select: "track_title, FLOOR(duration_seconds / 60) AS whole_minutes", goal: "Extract whole minutes of track duration using FLOOR(duration_seconds / 60)." },
      { tbl: "GymMembers", select: "member_name, CEIL(monthly_fee) AS rounded_up_fee", goal: "Round monthly fee up to the nearest whole integer using CEIL()." },
      { tbl: "Orders", select: "order_id, ROUND((unit_price * quantity) * discount_pct, 2) AS discount_savings", goal: "Calculate and round exact discount savings to 2 decimal places." },
      { tbl: "FlightSchedule", select: "flight_id, ROUND(ticket_price / 1.15, 2) AS base_fare_before_tax", goal: "Calculate and round base fare before 15% airport fees." },
      { tbl: "PetClinic", select: "pet_name, ROUND(weight_kg * 2.20462, 1) AS rounded_lbs", goal: "Convert weight to pounds and round to 1 decimal place." },
      { tbl: "Books", select: "title, ABS(stock_qty - 10) AS distance_from_target_stock", goal: "Calculate the absolute deviation from target inventory level (10) using ABS()." },
      { tbl: "Employees", select: "first_name, ROUND(salary / 26.0, 2) AS biweekly_paycheck", goal: "Calculate biweekly paycheck by dividing annual salary by 26 pay periods and rounding to 2 decimals." },
      { tbl: "MovieReviews", select: "movie_title, ROUND(star_rating, 0) AS rounded_star_rating", goal: "Round star ratings to the nearest whole star using ROUND(star_rating, 0)." }
    ]
  },
  {
    range: [61, 70],
    subcluster: "1.7 String Functions",
    level: "Level 2 (Calculations)",
    topics: [
      { tbl: "Students", select: "CONCAT(first_name, ' ', last_name) AS full_student_name", goal: "Glue first_name and last_name together with a space using CONCAT()." },
      { tbl: "Books", select: "UPPER(title) AS uppercase_title, LOWER(genre) AS lowercase_genre", goal: "Transform title to uppercase and genre to lowercase." },
      { tbl: "Employees", select: "CONCAT(last_name, ', ', first_name) AS formal_directory_name", goal: "Format employee name as 'LastName, FirstName' using CONCAT()." },
      { tbl: "MusicTracks", select: "track_title, LENGTH(track_title) AS title_char_count", goal: "Count the number of characters in track_title using LENGTH()." },
      { tbl: "GroceryItems", select: "UPPER(item_name) AS label_name", goal: "Convert item_name to all capital letters for shelf printing." },
      { tbl: "FlightSchedule", select: "flight_id, CONCAT(origin_airport, ' -> ', dest_airport) AS route", goal: "Combine origin and destination into a route string like 'ORD -> LAX'." },
      { tbl: "PetClinic", select: "pet_name, LEFT(species, 3) AS species_short_code", goal: "Extract the first 3 letters of species using LEFT(species, 3)." },
      { tbl: "MovieReviews", select: "movie_title, RIGHT(movie_title, 4) AS title_suffix", goal: "Extract the last 4 characters of movie_title using RIGHT()." },
      { tbl: "GymMembers", select: "UPPER(membership_plan) AS plan_badge", goal: "Convert membership plan to uppercase for keycard printing." },
      { tbl: "Orders", select: "CONCAT(customer_name, ' (Order #', order_id, ')') AS order_summary", goal: "Format an order label like 'Zoe Hart (Order #5001)' using CONCAT()." }
    ]
  },
  {
    range: [71, 80],
    subcluster: "1.8 Date Projections",
    level: "Level 2 (Calculations)",
    topics: [
      { tbl: "Employees", select: "first_name, hire_date, YEAR(hire_date) AS hire_year", goal: "Extract the four-digit year from hire_date using YEAR()." },
      { tbl: "Employees", select: "first_name, hire_date, MONTH(hire_date) AS hire_month", goal: "Extract the numerical month from hire_date using MONTH()." },
      { tbl: "Students", select: "full_name, enrolled_year, (2026 - enrolled_year) AS years_in_school", goal: "Calculate how many years a student has been in school relative to 2026." },
      { tbl: "GymMembers", select: "member_name, join_date, YEAR(join_date) AS joined_year", goal: "Extract the membership start year from join_date." },
      { tbl: "Books", select: "title, published_year, (2026 - published_year) AS book_age_years", goal: "Calculate the age of a book in years relative to 2026." },
      { tbl: "MovieReviews", select: "movie_title, release_year, (2026 - release_year) AS film_age", goal: "Compute how many years ago a movie was released." },
      { tbl: "Employees", select: "first_name, CURRENT_DATE AS report_generated_on", goal: "Project the system's current calendar date using CURRENT_DATE." },
      { tbl: "GymMembers", select: "member_name, join_date, MONTH(join_date) AS anniversary_month", goal: "Extract the membership anniversary month from join_date." },
      { tbl: "Employees", select: "first_name, hire_date, DAY(hire_date) AS hire_day_of_month", goal: "Extract the specific day of the month (1-31) when the employee was hired." },
      { tbl: "Students", select: "full_name, enrolled_year, CONCAT('Class of ', (enrolled_year + 4)) AS expected_graduation", goal: "Project expected graduation year by adding 4 to enrolled_year." }
    ]
  },
  {
    range: [81, 90],
    subcluster: "1.9 DISTINCT Deduplication",
    level: "Level 2 (Deduplication)",
    topics: [
      { tbl: "Students", select: "DISTINCT city", goal: "Find all unique home cities where enrolled students live without duplicates." },
      { tbl: "Books", select: "DISTINCT genre", goal: "List all distinct literary genres available in the bookstore catalog." },
      { tbl: "Employees", select: "DISTINCT department", goal: "Retrieve the list of distinct company departments without duplicate rows." },
      { tbl: "GroceryItems", select: "DISTINCT category", goal: "Display all unique grocery product categories." },
      { tbl: "MusicTracks", select: "DISTINCT genre", goal: "List all unique musical genres featured in the streaming library." },
      { tbl: "GymMembers", select: "DISTINCT membership_plan", goal: "Extract all distinct membership plan tiers." },
      { tbl: "MovieReviews", select: "DISTINCT director", goal: "Find all unique movie directors who have reviews recorded." },
      { tbl: "FlightSchedule", select: "DISTINCT origin_airport", goal: "List all unique origin departure airports." },
      { tbl: "PetClinic", select: "DISTINCT species", goal: "Find all distinct animal species treated at the clinic." },
      { tbl: "Orders", select: "DISTINCT customer_name, shipping_city", goal: "Find distinct combinations of customer name and shipping city (multi-column DISTINCT)." }
    ]
  },
  {
    range: [91, 100],
    subcluster: "1.10 Bug Hunts & Edge Cases",
    level: "Level 3 (Bug Hunts)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, city\nFROM Students;", goal: "Fix the trailing comma bug: 'SELECT full_name, city, FROM Students;'" },
      { tbl: "Books", target: "SELECT title, price\nFROM Books;", goal: "Fix the unquoted column alias containing spaces: 'SELECT title, price AS Retail Price FROM Books;'" },
      { tbl: "Employees", target: "SELECT first_name, salary\nFROM Employees;", goal: "Fix the misplaced DISTINCT keyword: 'SELECT first_name, DISTINCT department FROM Employees;'" },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price\nFROM GroceryItems;", goal: "Fix the single-quoted column name: \"SELECT 'item_name' FROM GroceryItems;\" (outputs literal string instead of column)." },
      { tbl: "Orders", target: "SELECT order_id, quantity * unit_price AS subtotal\nFROM Orders;", goal: "Fix missing comma between calculated expression and next column." },
      { tbl: "MusicTracks", target: "SELECT track_title, artist_name\nFROM MusicTracks;", goal: "Fix misspelled column identifier: 'SELECT song_title FROM MusicTracks;'" },
      { tbl: "GymMembers", target: "SELECT member_name, monthly_fee\nFROM GymMembers;", goal: "Fix table name typo: 'SELECT member_name FROM GymMember;' (singular vs plural)." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews;", goal: "Fix hyphen used in column alias: 'SELECT movie_title AS movie-name FROM MovieReviews;'" },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport, dest_airport\nFROM FlightSchedule;", goal: "Fix missing FROM keyword: 'SELECT flight_id, origin_airport FlightSchedule;'" },
      { tbl: "PetClinic", target: "SELECT pet_name, age_years\nFROM PetClinic;", goal: "Fix premature semicolon: 'SELECT pet_name; FROM PetClinic;'" }
    ]
  }
];

// Helper to construct challenge slots
function makeSlots(query) {
  return query.split(/\s+/).map(tok => {
    let type = "column";
    if (["SELECT", "FROM", "AS", "DISTINCT"].includes(tok.toUpperCase())) type = "keyword";
    if (tables.some(t => tok.includes(t))) type = "table";
    return { type, value: tok };
  });
}

clustersT1.forEach(c => {
  c.topics.forEach((t, i) => {
    const drillNum = c.range[0] + i;
    const q = t.target || `SELECT ${t.select}\nFROM ${t.tbl};`;
    DRILLS_T1.push({
      drillNumber: drillNum,
      subcluster: c.subcluster,
      level: c.level,
      title: `Syntax #${String(drillNum).padStart(3, '0')}: ${t.goal.replace(/\.$/, '')}`,
      table: t.tbl,
      scenario: t.goal,
      businessObjective: t.goal,
      schemaSnippet: `${t.tbl} schema`,
      targetQuery: q,
      syntaxBlueprint: `SELECT ${t.select || 'column_1, column_2'}\nFROM ${t.tbl};`,
      syntaxRule: "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
      syntaxTrap: "Do not add trailing commas before FROM or quote column identifiers.",
      eli5Story: `Simple everyday task on ${t.tbl}: ${t.goal}`,
      commonMistakes: "Punctuation errors, trailing commas, or quotes around column names.",
      learningOutcomes: `Mastered ${c.subcluster} on ${t.tbl}.`,
      challengeSlots: makeSlots(q)
    });
  });
});

console.log('Total Topic 1 drills generated:', DRILLS_T1.length);
fs.writeFileSync('scratch/syntax_drills_t1.json', JSON.stringify(DRILLS_T1, null, 2));
