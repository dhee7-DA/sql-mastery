// Generator for Section 0 - Topic 2: WHERE & Predicate Filtering (Drills #101 to #200)
// High-variety, zero corporate jargon, friendly everyday schemas.

const fs = require('fs');

const DRILLS_T2 = [];

const tables = ['Students', 'Books', 'Employees', 'GroceryItems', 'Orders', 'MusicTracks', 'GymMembers', 'MovieReviews', 'FlightSchedule', 'PetClinic'];

const clustersT2 = [
  {
    range: [101, 110],
    subcluster: "2.1 Exact Equality & Inequality",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", select: "full_name, city", where: "city = 'Seattle'", goal: "Find all students who live in the city of Seattle." },
      { tbl: "Books", select: "title, author, genre", where: "genre = 'Sci-Fi'", goal: "Select all books that belong to the 'Sci-Fi' genre." },
      { tbl: "Employees", select: "first_name, department, salary", where: "department = 'Engineering'", goal: "Retrieve all employees in the Engineering department." },
      { tbl: "GroceryItems", select: "item_name, unit_price", where: "is_organic = TRUE", goal: "Find all grocery items where is_organic is TRUE." },
      { tbl: "Orders", select: "order_id, customer_name, order_status", where: "order_status = 'Shipped'", goal: "Display all orders where order_status is 'Shipped'." },
      { tbl: "MusicTracks", select: "track_title, artist_name", where: "artist_name = 'Luna Waves'", goal: "Find all tracks performed by the artist 'Luna Waves'." },
      { tbl: "GymMembers", select: "member_name, membership_plan", where: "membership_plan = 'Gold'", goal: "List all members enrolled in the 'Gold' plan." },
      { tbl: "MovieReviews", select: "movie_title, director", where: "director = 'Christopher Nolan'", goal: "Find all films directed by 'Christopher Nolan'." },
      { tbl: "FlightSchedule", select: "flight_id, dest_airport", where: "dest_airport = 'LAX'", goal: "Find all flights with destination airport equal to 'LAX'." },
      { tbl: "PetClinic", select: "pet_name, species", where: "species != 'Dog'", goal: "Find all pets whose species is NOT 'Dog' using != operator." }
    ]
  },
  {
    range: [111, 120],
    subcluster: "2.2 Numeric Comparisons",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", select: "full_name, gpa", where: "gpa >= 3.50", goal: "Select students with a GPA greater than or equal to 3.50 (Honors list)." },
      { tbl: "Books", select: "title, price", where: "price < 20.00", goal: "Find all budget books with a price strictly under $20.00." },
      { tbl: "Employees", select: "first_name, salary", where: "salary > 80000.00", goal: "Retrieve employees earning a salary greater than $80,000." },
      { tbl: "GroceryItems", select: "item_name, calories", where: "calories <= 100", goal: "Find all low-calorie grocery items with 100 or fewer calories." },
      { tbl: "Orders", select: "order_id, quantity", where: "quantity >= 3", goal: "Find bulk orders where quantity is 3 or more." },
      { tbl: "MusicTracks", select: "track_title, play_count", where: "play_count > 100000", goal: "Select viral tracks with over 100,000 plays." },
      { tbl: "GymMembers", select: "member_name, visits_this_month", where: "visits_this_month > 10", goal: "Find active gym members who visited more than 10 times this month." },
      { tbl: "MovieReviews", select: "movie_title, star_rating", where: "star_rating >= 4.5", goal: "Select critically acclaimed movies with a star rating of 4.5 or higher." },
      { tbl: "FlightSchedule", select: "flight_id, delay_minutes", where: "delay_minutes > 30", goal: "List all significantly delayed flights with more than 30 minutes of delay." },
      { tbl: "PetClinic", select: "pet_name, weight_kg", where: "weight_kg > 20.0", goal: "Find large animal patients weighing over 20 kilograms." }
    ]
  },
  {
    range: [121, 130],
    subcluster: "2.3 Range Bounds (BETWEEN)",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", select: "full_name, age", where: "age BETWEEN 18 AND 22", goal: "Select students whose age is between 18 and 22 inclusive." },
      { tbl: "Books", select: "title, price", where: "price BETWEEN 15.00 AND 30.00", goal: "Find books with prices between $15.00 and $30.00 inclusive." },
      { tbl: "Employees", select: "first_name, salary", where: "salary BETWEEN 60000.00 AND 90000.00", goal: "Retrieve employees in the mid-career salary band between $60,000 and $90,000." },
      { tbl: "GroceryItems", select: "item_name, unit_price", where: "unit_price BETWEEN 2.00 AND 5.00", goal: "Find grocery items priced between $2.00 and $5.00." },
      { tbl: "Orders", select: "order_id, unit_price", where: "unit_price BETWEEN 25.00 AND 100.00", goal: "Find orders where the unit price is between $25.00 and $100.00." },
      { tbl: "MusicTracks", select: "track_title, duration_seconds", where: "duration_seconds BETWEEN 180 AND 240", goal: "Find tracks between 3 and 4 minutes long (180 to 240 seconds)." },
      { tbl: "GymMembers", select: "member_name, monthly_fee", where: "monthly_fee BETWEEN 25.00 AND 75.00", goal: "List gym members with monthly dues between $25.00 and $75.00." },
      { tbl: "MovieReviews", select: "movie_title, release_year", where: "release_year BETWEEN 2020 AND 2023", goal: "Find films released in the four-year span between 2020 and 2023 inclusive." },
      { tbl: "FlightSchedule", select: "flight_id, ticket_price", where: "ticket_price BETWEEN 200.00 AND 400.00", goal: "Find flights with economy ticket prices between $200 and $400." },
      { tbl: "PetClinic", select: "pet_name, age_years", where: "age_years NOT BETWEEN 3 AND 8", goal: "Find very young or senior pets whose age is NOT between 3 and 8 years." }
    ]
  },
  {
    range: [131, 140],
    subcluster: "2.4 List Membership (IN & NOT IN)",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", select: "full_name, city", where: "city IN ('Seattle', 'Chicago', 'Austin')", goal: "Select students who live in Seattle, Chicago, or Austin." },
      { tbl: "Books", select: "title, genre", where: "genre IN ('Mystery', 'Sci-Fi', 'Thriller')", goal: "Find books belonging to Mystery, Sci-Fi, or Thriller genres." },
      { tbl: "Employees", select: "first_name, department", where: "department IN ('Engineering', 'Design')", goal: "Retrieve employees working in either Engineering or Design." },
      { tbl: "GroceryItems", select: "item_name, category", where: "category IN ('Produce', 'Bakery')", goal: "List grocery items in either the Produce or Bakery category." },
      { tbl: "Orders", select: "order_id, order_status", where: "order_status IN ('Shipped', 'Delivered')", goal: "Find all fulfilled orders with status Shipped or Delivered." },
      { tbl: "MusicTracks", select: "track_title, genre", where: "genre IN ('Rock', 'Synthwave')", goal: "Filter music tracks to only Rock or Synthwave." },
      { tbl: "GymMembers", select: "member_name, membership_plan", where: "membership_plan IN ('Gold', 'Platinum')", goal: "List premium members with either Gold or Platinum plans." },
      { tbl: "MovieReviews", select: "movie_title, genre", where: "genre NOT IN ('Horror', 'Action')", goal: "Select movies whose genre is neither Horror nor Action." },
      { tbl: "FlightSchedule", select: "flight_id, origin_airport", where: "origin_airport IN ('ORD', 'SFO', 'JFK')", goal: "Find flights departing from major hubs ORD, SFO, or JFK." },
      { tbl: "PetClinic", select: "pet_name, species", where: "species IN ('Dog', 'Cat')", goal: "Filter patient records to standard household pets: Dog or Cat." }
    ]
  },
  {
    range: [141, 150],
    subcluster: "2.5 Pattern Matching (LIKE)",
    level: "Level 2 (Wildcards)",
    topics: [
      { tbl: "Students", select: "full_name", where: "full_name LIKE 'A%'", goal: "Find all students whose first name starts with the capital letter 'A'." },
      { tbl: "Books", select: "title, author", where: "author LIKE '%King%'", goal: "Find all books written by an author with 'King' anywhere in their name." },
      { tbl: "Employees", select: "first_name, last_name", where: "last_name LIKE '%son'", goal: "Select all employees whose family name ends with 'son' (e.g. Johnson, Wilson)." },
      { tbl: "GroceryItems", select: "item_name", where: "item_name LIKE '%Organic%'", goal: "Find all grocery items with 'Organic' anywhere in the item name." },
      { tbl: "Orders", select: "order_id, customer_name", where: "customer_name LIKE 'Z%'", goal: "Find orders placed by customers whose name begins with 'Z'." },
      { tbl: "MusicTracks", select: "track_title", where: "track_title LIKE '%Rain%'", goal: "Find all tracks that have 'Rain' in the title." },
      { tbl: "GymMembers", select: "member_name", where: "member_name LIKE '_a%'", goal: "Find members whose name has 'a' as the second character (e.g. Sam, Dan)." },
      { tbl: "MovieReviews", select: "movie_title", where: "movie_title LIKE '%The %'", goal: "Find movies that contain the word 'The ' in their title." },
      { tbl: "FlightSchedule", select: "flight_id", where: "flight_id LIKE 'AA-%'", goal: "Find all American Airlines flights starting with flight code 'AA-'." },
      { tbl: "PetClinic", select: "pet_name, breed", where: "breed LIKE '%Retriever%'", goal: "Find all dogs whose breed includes 'Retriever' (Golden, Labrador, etc.)." }
    ]
  },
  {
    range: [151, 160],
    subcluster: "2.6 Inverse & Strict Wildcards",
    level: "Level 2 (Wildcards)",
    topics: [
      { tbl: "Books", select: "title", where: "title NOT LIKE '%The%'", goal: "Find books whose title does NOT contain the word 'The'." },
      { tbl: "Students", select: "full_name, city", where: "city NOT LIKE 'S%'", goal: "Select students who live in cities that do NOT start with 'S'." },
      { tbl: "Employees", select: "first_name, department", where: "department NOT LIKE '%ing'", goal: "Find employees whose department name does not end with 'ing'." },
      { tbl: "GroceryItems", select: "item_name", where: "item_name NOT LIKE '%Milk%'", goal: "Find grocery items that do not contain the word 'Milk'." },
      { tbl: "Orders", select: "order_id, order_status", where: "order_status NOT LIKE '%Cancel%'", goal: "Find all active orders that are not cancelled." },
      { tbl: "MusicTracks", select: "track_title", where: "track_title NOT LIKE '%Love%'", goal: "Find music tracks that do not have 'Love' in the title." },
      { tbl: "GymMembers", select: "member_name", where: "member_name NOT LIKE 'J%'", goal: "List gym members whose names do not start with the letter 'J'." },
      { tbl: "MovieReviews", select: "movie_title", where: "movie_title LIKE '___'", goal: "Find movies whose title consists of exactly 3 characters." },
      { tbl: "FlightSchedule", select: "flight_id", where: "flight_id NOT LIKE 'DL-%'", goal: "Find non-Delta flights that do not start with 'DL-'." },
      { tbl: "PetClinic", select: "pet_name", where: "pet_name LIKE '____'", goal: "Find pets with names that are exactly 4 letters long (e.g. Milo, Luna)." }
    ]
  },
  {
    range: [161, 170],
    subcluster: "2.7 Compound AND Logic",
    level: "Level 2 (Compound Logic)",
    topics: [
      { tbl: "Students", select: "full_name, city, gpa", where: "city = 'Seattle' AND gpa > 3.50", goal: "Find students who live in Seattle AND maintain a GPA higher than 3.50." },
      { tbl: "Books", select: "title, price, stock_qty", where: "genre = 'Sci-Fi' AND price < 25.00", goal: "Find Sci-Fi books that are priced under $25.00." },
      { tbl: "Employees", select: "first_name, department, salary", where: "department = 'Engineering' AND salary >= 90000.00", goal: "Find Engineering employees earning $90,000 or more." },
      { tbl: "GroceryItems", select: "item_name, unit_price, is_organic", where: "is_organic = TRUE AND unit_price < 4.00", goal: "Find organic grocery items that cost less than $4.00." },
      { tbl: "Orders", select: "order_id, quantity, discount_pct", where: "quantity >= 2 AND discount_pct > 0.05", goal: "Find orders with at least 2 items and a discount greater than 5%." },
      { tbl: "MusicTracks", select: "track_title, genre, release_year", where: "genre = 'Synthwave' AND release_year = 2024", goal: "Find Synthwave tracks released specifically in the year 2024." },
      { tbl: "GymMembers", select: "member_name, membership_plan, visits_this_month", where: "membership_plan = 'Gold' AND visits_this_month >= 15", goal: "Find Gold members who have visited at least 15 times this month." },
      { tbl: "MovieReviews", select: "movie_title, genre, star_rating", where: "genre = 'Sci-Fi' AND star_rating >= 4.5", goal: "Find top-tier Sci-Fi movies with a star rating of 4.5 or higher." },
      { tbl: "FlightSchedule", select: "flight_id, airline, delay_minutes", where: "airline = 'United Airlines' AND delay_minutes = 0", goal: "Find on-time United Airlines flights with 0 minutes delay." },
      { tbl: "PetClinic", select: "pet_name, species, is_vaccinated", where: "species = 'Dog' AND is_vaccinated = TRUE", goal: "Find dogs that are confirmed vaccinated." }
    ]
  },
  {
    range: [171, 180],
    subcluster: "2.8 Compound OR & Precedence",
    level: "Level 2 (Compound Logic)",
    topics: [
      { tbl: "Students", select: "full_name, city", where: "city = 'Chicago' OR city = 'Austin'", goal: "Find students who live in either Chicago OR Austin." },
      { tbl: "Books", select: "title, genre, price", where: "(genre = 'Sci-Fi' OR genre = 'Mystery') AND price < 20.00", goal: "Find Sci-Fi OR Mystery books that are priced under $20 (parentheses mandatory!)." },
      { tbl: "Employees", select: "first_name, department, salary", where: "(department = 'Engineering' OR department = 'Marketing') AND salary > 70000.00", goal: "Find Engineering OR Marketing employees who earn over $70,000." },
      { tbl: "GroceryItems", select: "item_name, category, unit_price", where: "(category = 'Produce' OR category = 'Bakery') AND unit_price <= 5.00", goal: "Find Produce OR Bakery items that cost $5.00 or less." },
      { tbl: "Orders", select: "order_id, order_status, shipping_city", where: "(order_status = 'Processing' OR order_status = 'Pending') AND shipping_city = 'Denver'", goal: "Find unfulfilled orders destined for Denver." },
      { tbl: "MusicTracks", select: "track_title, genre, play_count", where: "(genre = 'Rock' OR genre = 'Synthwave') AND play_count > 50000", goal: "Find Rock or Synthwave tracks with over 50,000 plays." },
      { tbl: "GymMembers", select: "member_name, membership_plan, has_trainer", where: "(membership_plan = 'Gold' OR membership_plan = 'Platinum') AND has_trainer = TRUE", goal: "Find premium members (Gold or Platinum) who have a dedicated trainer." },
      { tbl: "MovieReviews", select: "movie_title, director, star_rating", where: "(director = 'Greta Gerwig' OR director = 'Sofia Coppola') AND star_rating >= 4.0", goal: "Find top films by either Gerwig or Coppola with 4.0+ stars." },
      { tbl: "FlightSchedule", select: "flight_id, origin_airport, dest_airport", where: "(origin_airport = 'ORD' OR origin_airport = 'MDW') AND dest_airport = 'LAX'", goal: "Find Chicago flights (ORD or MDW) flying to Los Angeles (LAX)." },
      { tbl: "PetClinic", select: "pet_name, species, age_years", where: "(species = 'Dog' OR species = 'Cat') AND age_years < 2", goal: "Find young puppies or kittens under 2 years of age." }
    ]
  },
  {
    range: [181, 190],
    subcluster: "2.9 3VL & NULL Handling",
    level: "Level 2 (3-Valued Logic)",
    topics: [
      { tbl: "Employees", select: "first_name, bonus", where: "bonus IS NULL", goal: "Find all employees who did not receive an annual bonus (bonus IS NULL)." },
      { tbl: "Employees", select: "first_name, bonus", where: "bonus IS NOT NULL", goal: "Find all employees who have a recorded bonus." },
      { tbl: "Books", select: "title, stock_qty", where: "stock_qty IS NOT NULL AND stock_qty > 0", goal: "Find in-stock books where inventory quantity is verified not null and positive." },
      { tbl: "Students", select: "full_name, gpa", where: "gpa IS NOT NULL", goal: "Find students who have completed their coursework and have a recorded GPA." },
      { tbl: "Orders", select: "order_id, discount_pct", where: "discount_pct IS NULL OR discount_pct = 0.00", goal: "Find orders that received no discount." },
      { tbl: "PetClinic", select: "pet_name, breed", where: "breed IS NOT NULL", goal: "Find pet records where the specific breed is documented." },
      { tbl: "FlightSchedule", select: "flight_id, delay_minutes", where: "delay_minutes IS NOT NULL AND delay_minutes = 0", goal: "Find flights confirmed on-time." },
      { tbl: "GymMembers", select: "member_name, visits_this_month", where: "visits_this_month IS NOT NULL AND visits_this_month = 0", goal: "Find inactive members with zero visits logged." },
      { tbl: "GroceryItems", select: "item_name, unit_price", where: "unit_price IS NOT NULL AND unit_price > 0.00", goal: "Verify items with valid non-null prices." },
      { tbl: "MusicTracks", select: "track_title, play_count", where: "play_count IS NOT NULL AND play_count >= 0", goal: "Select tracks with verified play metrics." }
    ]
  },
  {
    range: [191, 200],
    subcluster: "2.10 Multi-Condition Bug Hunts",
    level: "Level 3 (Bug Hunts)",
    topics: [
      { tbl: "Employees", target: "SELECT first_name, bonus\nFROM Employees\nWHERE bonus IS NULL;", goal: "Fix the illegal NULL comparison: 'WHERE bonus = NULL;' (evaluates to UNKNOWN and returns 0 rows)." },
      { tbl: "Students", target: "SELECT full_name, city, gpa\nFROM Students\nWHERE (city = 'Chicago' OR city = 'Seattle') AND gpa > 3.50;", goal: "Fix operator precedence bug by adding parentheses around OR conditions." },
      { tbl: "Books", target: "SELECT title, price\nFROM Books\nWHERE price BETWEEN 10.00 AND 25.00;", goal: "Fix incorrect range syntax: 'WHERE price BETWEEN 10.00, 25.00;' (BETWEEN uses AND, not comma)." },
      { tbl: "GroceryItems", target: "SELECT item_name, category\nFROM GroceryItems\nWHERE category IN ('Produce', 'Bakery');", goal: "Fix syntax error: 'WHERE category IN Produce, Bakery;' (values in IN must be wrapped in parentheses)." },
      { tbl: "Orders", target: "SELECT order_id, shipping_city\nFROM Orders\nWHERE shipping_city = 'Denver';", goal: "Fix unquoted string identifier: \"WHERE shipping_city = Denver;\" (looks for column named Denver instead of text)." },
      { tbl: "MusicTracks", target: "SELECT track_title, genre\nFROM MusicTracks\nWHERE genre LIKE 'Rock%';", goal: "Fix assignment syntax: 'WHERE genre = Rock%' (pattern matching requires LIKE, not =)." },
      { tbl: "GymMembers", target: "SELECT member_name, monthly_fee\nFROM GymMembers\nWHERE monthly_fee >= 30.00 AND monthly_fee <= 70.00;", goal: "Fix missing second column comparison: 'WHERE monthly_fee >= 30.00 AND <= 70.00;'." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE star_rating > 4.0;", goal: "Fix quoted numeric literal: \"WHERE star_rating > '4.0';\" (numeric comparisons should avoid string quotes)." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nWHERE delay_minutes != 0;", goal: "Fix exclamation mark placement: 'WHERE delay_minutes =! 0;' (must be != or <>)." },
      { tbl: "PetClinic", target: "SELECT pet_name, species\nFROM PetClinic\nWHERE species = 'Cat' OR species = 'Dog';", goal: "Fix shorthand OR trap: \"WHERE species = 'Cat' OR 'Dog';\" (each side of OR requires a full boolean test)." }
    ]
  }
];

function makeSlots(query) {
  return query.split(/\s+/).map(tok => {
    let type = "column";
    if (["SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "IN", "BETWEEN", "LIKE", "IS", "NULL"].includes(tok.toUpperCase())) type = "keyword";
    if (tables.some(t => tok.includes(t))) type = "table";
    return { type, value: tok };
  });
}

clustersT2.forEach(c => {
  c.topics.forEach((t, i) => {
    const drillNum = c.range[0] + i;
    const q = t.target || `SELECT ${t.select}\nFROM ${t.tbl}\nWHERE ${t.where};`;
    DRILLS_T2.push({
      drillNumber: drillNum,
      subcluster: c.subcluster,
      level: c.level,
      title: `Syntax #${String(drillNum).padStart(3, '0')}: ${t.goal.replace(/\.$/, '')}`,
      table: t.tbl,
      scenario: t.goal,
      businessObjective: t.goal,
      schemaSnippet: `${t.tbl} schema`,
      targetQuery: q,
      syntaxBlueprint: `SELECT ${t.select || 'col_1, col_2'}\nFROM ${t.tbl}\nWHERE ${t.where || 'condition'};`,
      syntaxRule: "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
      syntaxTrap: "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
      eli5Story: `Filter check on ${t.tbl}: ${t.goal}`,
      commonMistakes: "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
      learningOutcomes: `Mastered ${c.subcluster} on ${t.tbl}.`,
      challengeSlots: makeSlots(q)
    });
  });
});

console.log('Total Topic 2 drills generated:', DRILLS_T2.length);
fs.writeFileSync('scratch/syntax_drills_t2.json', JSON.stringify(DRILLS_T2, null, 2));
