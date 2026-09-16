// Generator for Section 0 - Topic 5: CASE WHEN & Conditional Logic (Drills #401 to #500)
// 100 progressive micro-drills across 10 everyday schemas.

const fs = require('fs');

const DRILLS_T5 = [];
const tables = ['Students', 'Books', 'Employees', 'GroceryItems', 'Orders', 'MusicTracks', 'GymMembers', 'MovieReviews', 'FlightSchedule', 'PetClinic'];

const clustersT5 = [
  {
    range: [401, 410],
    subcluster: "5.1 Simple Two-Branch CASE WHEN",
    level: "Level 1 (Foundations)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa,\n  CASE WHEN gpa >= 3.5 THEN 'Honor Roll' ELSE 'Standard' END AS academic_status\nFROM Students;", goal: "Tag students with GPA >= 3.5 as 'Honor Roll' and all others as 'Standard'." },
      { tbl: "Books", target: "SELECT title, price,\n  CASE WHEN price > 20.00 THEN 'Premium' ELSE 'Affordable' END AS price_tier\nFROM Books;", goal: "Classify books over $20.00 as 'Premium' and all others as 'Affordable'." },
      { tbl: "Employees", target: "SELECT first_name, salary,\n  CASE WHEN salary >= 80000 THEN 'Senior Band' ELSE 'Associate Band' END AS pay_bracket\nFROM Employees;", goal: "Label employees earning $80,000+ as 'Senior Band' and others as 'Associate Band'." },
      { tbl: "GroceryItems", target: "SELECT item_name, is_organic,\n  CASE WHEN is_organic = 1 THEN 'Organic Certified' ELSE 'Conventional' END AS product_type\nFROM GroceryItems;", goal: "Map binary organic flag (1/0) to descriptive labels 'Organic Certified' vs 'Conventional'." },
      { tbl: "Orders", target: "SELECT order_id, order_status,\n  CASE WHEN order_status = 'Delivered' THEN 'Completed' ELSE 'In Progress' END AS fulfillment_state\nFROM Orders;", goal: "Categorize orders as 'Completed' if status is 'Delivered', else 'In Progress'." },
      { tbl: "MusicTracks", target: "SELECT track_title, duration_seconds,\n  CASE WHEN duration_seconds > 240 THEN 'Long Track' ELSE 'Standard Length' END AS length_category\nFROM MusicTracks;", goal: "Flag music tracks over 240 seconds as 'Long Track', otherwise 'Standard Length'." },
      { tbl: "GymMembers", target: "SELECT member_name, is_active,\n  CASE WHEN is_active = 1 THEN 'Current Member' ELSE 'Lapsed Member' END AS member_status\nFROM GymMembers;", goal: "Transform is_active flag into readable 'Current Member' or 'Lapsed Member' status." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  CASE WHEN star_rating >= 4.0 THEN 'Recommended' ELSE 'Mixed' END AS recommendation\nFROM MovieReviews;", goal: "Tag films with 4.0+ star ratings as 'Recommended' and others as 'Mixed'." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, seats_available,\n  CASE WHEN seats_available > 20 THEN 'Available' ELSE 'Almost Full' END AS booking_status\nFROM FlightSchedule;", goal: "Label flights with over 20 seats as 'Available', else 'Almost Full'." },
      { tbl: "PetClinic", target: "SELECT pet_name, age_years,\n  CASE WHEN age_years >= 7 THEN 'Senior' ELSE 'Young/Adult' END AS life_stage\nFROM PetClinic;", goal: "Categorize pets aged 7+ years as 'Senior', otherwise 'Young/Adult'." }
    ]
  },
  {
    range: [411, 420],
    subcluster: "5.2 Multi-Branch Categorization",
    level: "Level 1 (Multi-Branch)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa,\n  CASE\n    WHEN gpa >= 3.8 THEN 'Summa'\n    WHEN gpa >= 3.5 THEN 'Magna'\n    WHEN gpa >= 3.0 THEN 'Cum Laude'\n    ELSE 'Good Standing'\n  END AS honors_rank\nFROM Students;", goal: "Classify students into 4 distinct honors ranks based on descending GPA thresholds." },
      { tbl: "Books", target: "SELECT title, price,\n  CASE\n    WHEN price < 10.00 THEN 'Budget'\n    WHEN price <= 25.00 THEN 'Mid-Tier'\n    ELSE 'Collector'\n  END AS price_category\nFROM Books;", goal: "Categorize book catalog into 'Budget', 'Mid-Tier', and 'Collector' price ranges." },
      { tbl: "Employees", target: "SELECT first_name, salary,\n  CASE\n    WHEN salary >= 100000 THEN 'Executive'\n    WHEN salary >= 70000 THEN 'Senior'\n    WHEN salary >= 50000 THEN 'Mid-Level'\n    ELSE 'Junior'\n  END AS compensation_tier\nFROM Employees;", goal: "Assign employees to 4 compensation tiers based on annual salary cutoffs." },
      { tbl: "GroceryItems", target: "SELECT item_name, stock_units,\n  CASE\n    WHEN stock_units = 0 THEN 'Out of Stock'\n    WHEN stock_units < 20 THEN 'Low Stock Alert'\n    ELSE 'Well Stocked'\n  END AS inventory_health\nFROM GroceryItems;", goal: "Flag inventory health as 'Out of Stock', 'Low Stock Alert', or 'Well Stocked'." },
      { tbl: "Orders", target: "SELECT order_id, quantity,\n  CASE\n    WHEN quantity >= 10 THEN 'Bulk Order'\n    WHEN quantity >= 5 THEN 'Wholesale Order'\n    ELSE 'Retail Single'\n  END AS order_scale\nFROM Orders;", goal: "Classify customer orders by volume scale: 'Bulk Order', 'Wholesale Order', or 'Retail Single'." },
      { tbl: "MusicTracks", target: "SELECT track_title, play_count,\n  CASE\n    WHEN play_count >= 1000000 THEN 'Superhit'\n    WHEN play_count >= 250000 THEN 'Popular'\n    ELSE 'Indie Gem'\n  END AS popularity_rank\nFROM MusicTracks;", goal: "Rank songs into 'Superhit', 'Popular', or 'Indie Gem' based on stream counts." },
      { tbl: "GymMembers", target: "SELECT member_name, visits_this_month,\n  CASE\n    WHEN visits_this_month >= 15 THEN 'Gym Fanatic'\n    WHEN visits_this_month >= 8 THEN 'Regular'\n    WHEN visits_this_month >= 1 THEN 'Occasional'\n    ELSE 'Inactive'\n  END AS engagement_level\nFROM GymMembers;", goal: "Segment members into 4 engagement tiers based on monthly visit attendance." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  CASE\n    WHEN star_rating >= 4.5 THEN 'Masterpiece'\n    WHEN star_rating >= 3.5 THEN 'Good'\n    WHEN star_rating >= 2.5 THEN 'Average'\n    ELSE 'Poor'\n  END AS review_grade\nFROM MovieReviews;", goal: "Translate numerical star ratings into critical grades ('Masterpiece' to 'Poor')." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, ticket_price,\n  CASE\n    WHEN ticket_price >= 400 THEN 'First Class'\n    WHEN ticket_price >= 200 THEN 'Business'\n    ELSE 'Economy'\n  END AS cabin_tier\nFROM FlightSchedule;", goal: "Categorize flights into fare tiers ('First Class', 'Business', 'Economy')." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg,\n  CASE\n    WHEN weight_kg > 30 THEN 'Large Breed'\n    WHEN weight_kg >= 10 THEN 'Medium Breed'\n    ELSE 'Small Breed'\n  END AS size_category\nFROM PetClinic;", goal: "Classify veterinary patient weight into 'Small Breed', 'Medium Breed', and 'Large Breed'." }
    ]
  },
  {
    range: [421, 430],
    subcluster: "5.3 CASE with Mathematical Transformations",
    level: "Level 2 (Calculations)",
    topics: [
      { tbl: "Employees", target: "SELECT first_name, salary,\n  ROUND(salary * (\n    CASE\n      WHEN salary < 60000 THEN 0.15\n      WHEN salary < 90000 THEN 0.10\n      ELSE 0.05\n    END\n  ), 2) AS annual_bonus\nFROM Employees;", goal: "Compute variable annual bonuses (15%, 10%, 5%) dynamically based on salary brackets." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  ROUND(unit_price * (\n    CASE\n      WHEN is_organic = 1 THEN 0.90\n      ELSE 0.95\n    END\n  ), 2) AS discounted_price\nFROM GroceryItems;", goal: "Apply a 10% discount to organic items and 5% to non-organic items using CASE in math." },
      { tbl: "Orders", target: "SELECT order_id, quantity, unit_price,\n  ROUND((quantity * unit_price) * (\n    CASE\n      WHEN quantity >= 10 THEN 0.85\n      WHEN quantity >= 5 THEN 0.90\n      ELSE 1.00\n    END\n  ), 2) AS final_invoice_total\nFROM Orders;", goal: "Calculate final invoice total with tiered volume discounts (15%, 10%, 0%)." },
      { tbl: "GymMembers", target: "SELECT member_name, monthly_fee,\n  ROUND(monthly_fee * (\n    CASE\n      WHEN membership_plan = 'Annual' THEN 0.80\n      WHEN membership_plan = 'Student' THEN 0.70\n      ELSE 1.00\n    END\n  ), 2) AS adjusted_dues\nFROM GymMembers;", goal: "Calculate discounted monthly gym fee based on membership contract type." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, ticket_price,\n  ROUND(ticket_price * (\n    CASE\n      WHEN seats_available < 5 THEN 1.30\n      WHEN seats_available < 15 THEN 1.15\n      ELSE 1.00\n    END\n  ), 2) AS surge_price\nFROM FlightSchedule;", goal: "Simulate dynamic surge pricing (30% or 15% increase) when seat inventory runs low." },
      { tbl: "Books", target: "SELECT title, price, publish_year,\n  ROUND(price * (\n    CASE\n      WHEN publish_year < 2020 THEN 0.75\n      ELSE 1.00\n    END\n  ), 2) AS clearance_price\nFROM Books;", goal: "Apply a 25% clearance discount to books published before 2020." },
      { tbl: "PetClinic", target: "SELECT pet_name, weight_kg,\n  ROUND(CASE\n    WHEN weight_kg > 25 THEN weight_kg * 1.5\n    ELSE weight_kg * 1.0\n  END, 1) AS recommended_dosage_mg\nFROM PetClinic;", goal: "Calculate medication dosage in milligrams based on patient body mass thresholds." },
      { tbl: "MusicTracks", target: "SELECT track_title, play_count,\n  ROUND(play_count * (\n    CASE\n      WHEN release_year >= 2024 THEN 0.005\n      ELSE 0.003\n    END\n  ), 2) AS royalty_payout_usd\nFROM MusicTracks;", goal: "Compute artist royalty payout using differentiated per-stream rates for new vs catalog releases." },
      { tbl: "Students", target: "SELECT full_name, gpa,\n  CASE\n    WHEN gpa >= 3.9 THEN 5000\n    WHEN gpa >= 3.7 THEN 2500\n    WHEN gpa >= 3.5 THEN 1000\n    ELSE 0\n  END AS scholarship_award\nFROM Students;", goal: "Determine merit scholarship award grant amounts ($5000, $2500, $1000, $0) based on GPA." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  ROUND(star_rating * (\n    CASE\n      WHEN genre = 'Documentary' THEN 1.1\n      ELSE 1.0\n    END\n  ), 2) AS weighted_rating\nFROM MovieReviews;", goal: "Calculate a weighted critic score applying a 10% bonus boost for documentary films." }
    ]
  },
  {
    range: [431, 440],
    subcluster: "5.4 NULL Value Handling with CASE WHEN",
    level: "Level 2 (NULL Handling)",
    topics: [
      { tbl: "Students", target: "SELECT full_name,\n  CASE\n    WHEN city IS NULL THEN 'Address Not Disclosed'\n    ELSE city\n  END AS residence_city\nFROM Students;", goal: "Replace missing NULL student cities with 'Address Not Disclosed'." },
      { tbl: "Employees", target: "SELECT first_name,\n  CASE\n    WHEN department IS NULL THEN 'Unassigned Staff'\n    ELSE department\n  END AS department_assigned\nFROM Employees;", goal: "Identify unassigned employees by replacing NULL departments with 'Unassigned Staff'." },
      { tbl: "Books", target: "SELECT title,\n  CASE\n    WHEN rating IS NULL THEN 'Unrated Title'\n    ELSE CAST(rating AS CHAR)\n  END AS display_rating\nFROM Books;", goal: "Safely display book ratings, rendering 'Unrated Title' if rating is NULL." },
      { tbl: "GroceryItems", target: "SELECT item_name,\n  CASE\n    WHEN category IS NULL THEN 'Miscellaneous'\n    ELSE category\n  END AS safe_category\nFROM GroceryItems;", goal: "Fallback NULL grocery categories to 'Miscellaneous'." },
      { tbl: "Orders", target: "SELECT order_id,\n  CASE\n    WHEN shipping_city IS NULL THEN 'Store Pickup'\n    ELSE shipping_city\n  END AS delivery_destination\nFROM Orders;", goal: "Display 'Store Pickup' whenever the order shipping city is NULL." },
      { tbl: "MusicTracks", target: "SELECT track_title,\n  CASE\n    WHEN genre IS NULL THEN 'Unclassified'\n    ELSE genre\n  END AS musical_style\nFROM MusicTracks;", goal: "Default unassigned music genres to 'Unclassified'." },
      { tbl: "GymMembers", target: "SELECT member_name,\n  CASE\n    WHEN monthly_fee IS NULL THEN 0.00\n    ELSE monthly_fee\n  END AS billed_fee\nFROM GymMembers;", goal: "Replace NULL monthly gym fees with 0.00 to ensure financial calculation safety." },
      { tbl: "MovieReviews", target: "SELECT movie_title,\n  CASE\n    WHEN reviewer_name IS NULL THEN 'Anonymous Reviewer'\n    ELSE reviewer_name\n  END AS author_credit\nFROM MovieReviews;", goal: "Credit missing reviewer names as 'Anonymous Reviewer'." },
      { tbl: "FlightSchedule", target: "SELECT flight_id,\n  CASE\n    WHEN status IS NULL THEN 'Scheduled'\n    ELSE status\n  END AS flight_status_clean\nFROM FlightSchedule;", goal: "Default NULL flight flight statuses to 'Scheduled'." },
      { tbl: "PetClinic", target: "SELECT pet_name,\n  CASE\n    WHEN breed IS NULL THEN 'Mixed/Unknown'\n    ELSE breed\n  END AS breed_description\nFROM PetClinic;", goal: "Show 'Mixed/Unknown' whenever the pet breed column contains NULL." }
    ]
  },
  {
    range: [441, 450],
    subcluster: "5.5 The COALESCE Function (Quick Fallbacks)",
    level: "Level 1 (COALESCE Shortcut)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, COALESCE(city, 'Unknown City') AS student_city\nFROM Students;", goal: "Use COALESCE to provide a clean fallback of 'Unknown City' for NULL values." },
      { tbl: "Books", target: "SELECT title, COALESCE(author, 'Various Authors') AS author_name\nFROM Books;", goal: "Use COALESCE to fallback missing book authors to 'Various Authors'." },
      { tbl: "Employees", target: "SELECT first_name, COALESCE(city, 'Remote / HQ') AS work_location\nFROM Employees;", goal: "Provide 'Remote / HQ' fallback for NULL employee city locations using COALESCE." },
      { tbl: "GroceryItems", target: "SELECT item_name, COALESCE(stock_units, 0) AS units_on_hand\nFROM GroceryItems;", goal: "Replace NULL stock units with integer 0 using COALESCE." },
      { tbl: "Orders", target: "SELECT order_id, COALESCE(shipping_city, 'Local Depot') AS ship_to\nFROM Orders;", goal: "Substitute missing shipping cities with 'Local Depot' via COALESCE." },
      { tbl: "MusicTracks", target: "SELECT track_title, COALESCE(artist_name, 'Unknown Artist') AS performer\nFROM MusicTracks;", goal: "Return 'Unknown Artist' when artist_name is NULL using COALESCE." },
      { tbl: "GymMembers", target: "SELECT member_name, COALESCE(visits_this_month, 0) AS total_visits\nFROM GymMembers;", goal: "Safely default NULL member monthly attendance visits to 0 with COALESCE." },
      { tbl: "MovieReviews", target: "SELECT movie_title, COALESCE(star_rating, 0.0) AS final_stars\nFROM MovieReviews;", goal: "Convert NULL movie ratings to 0.0 via COALESCE." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, COALESCE(seats_available, 0) AS open_seats\nFROM FlightSchedule;", goal: "Default NULL available seat counts to 0 using COALESCE." },
      { tbl: "PetClinic", target: "SELECT pet_name, COALESCE(owner_name, 'Shelter Rescue') AS guardian\nFROM PetClinic;", goal: "Return 'Shelter Rescue' if patient owner_name is NULL via COALESCE." }
    ]
  },
  {
    range: [451, 460],
    subcluster: "5.6 NULLIF Function (Zero-Division & Suppressions)",
    level: "Level 2 (NULLIF Precision)",
    topics: [
      { tbl: "Orders", target: "SELECT order_id, quantity,\n  ROUND(100.0 / NULLIF(quantity, 0), 2) AS units_ratio\nFROM Orders;", goal: "Use NULLIF(quantity, 0) to guard against fatal divide-by-zero errors." },
      { tbl: "GymMembers", target: "SELECT member_name,\n  NULLIF(membership_plan, 'Trial') AS paid_membership_plan\nFROM GymMembers;", goal: "Convert 'Trial' memberships into NULL using NULLIF to isolate paying subscribers." },
      { tbl: "Employees", target: "SELECT first_name,\n  NULLIF(department, 'Temporary') AS official_department\nFROM Employees;", goal: "Use NULLIF to suppress 'Temporary' assignments into NULL for official reporting." },
      { tbl: "GroceryItems", target: "SELECT item_name,\n  ROUND(100.0 / NULLIF(stock_units, 0), 2) AS turnover_metric\nFROM GroceryItems;", goal: "Protect turnover calculation against zero stock division using NULLIF(stock_units, 0)." },
      { tbl: "Students", target: "SELECT full_name,\n  NULLIF(city, 'Undisclosed') AS standardized_city\nFROM Students;", goal: "Convert placeholder string 'Undisclosed' into true database NULL using NULLIF." },
      { tbl: "Books", target: "SELECT title,\n  NULLIF(price, 0.00) AS non_zero_price\nFROM Books;", goal: "Suppress free promotional items ($0.00 price) into NULL using NULLIF." },
      { tbl: "MusicTracks", target: "SELECT track_title,\n  ROUND(duration_seconds / NULLIF(play_count, 0), 2) AS sec_per_play\nFROM MusicTracks;", goal: "Guard division by play_count using NULLIF(play_count, 0) to prevent runtime crashes." },
      { tbl: "MovieReviews", target: "SELECT movie_title,\n  NULLIF(reviewer_name, 'admin') AS public_reviewer_name\nFROM MovieReviews;", goal: "Conceal internal testing 'admin' usernames into NULL using NULLIF." },
      { tbl: "FlightSchedule", target: "SELECT flight_id,\n  NULLIF(status, 'Cancelled') AS active_flight_status\nFROM FlightSchedule;", goal: "Nullify 'Cancelled' flights using NULLIF to focus queries strictly on active statuses." },
      { tbl: "PetClinic", target: "SELECT pet_name,\n  ROUND(weight_kg / NULLIF(age_years, 0), 2) AS growth_index\nFROM PetClinic;", goal: "Calculate growth index (weight / age) while preventing zero-division on newborn pets using NULLIF." }
    ]
  },
  {
    range: [461, 470],
    subcluster: "5.7 Boolean Flagging & Binary Indicators (0/1)",
    level: "Level 2 (Binary Flags)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa,\n  CASE WHEN gpa >= 3.5 THEN 1 ELSE 0 END AS is_dean_list\nFROM Students;", goal: "Create a binary 1/0 indicator column 'is_dean_list' for students with GPA >= 3.5." },
      { tbl: "Books", target: "SELECT title, publish_year,\n  CASE WHEN publish_year >= 2020 THEN 1 ELSE 0 END AS is_recent_release\nFROM Books;", goal: "Flag books published in 2020 or later as binary 1, otherwise 0." },
      { tbl: "Employees", target: "SELECT first_name, salary,\n  CASE WHEN salary >= 80000 THEN 1 ELSE 0 END AS is_high_earner\nFROM Employees;", goal: "Generate an 'is_high_earner' binary flag for salaries $80,000 and higher." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  CASE WHEN unit_price < 5.00 THEN 1 ELSE 0 END AS is_bargain_item\nFROM GroceryItems;", goal: "Flag budget grocery items priced under $5.00 with binary 1, else 0." },
      { tbl: "Orders", target: "SELECT order_id, order_status,\n  CASE WHEN order_status = 'Delivered' THEN 1 ELSE 0 END AS is_fulfilled\nFROM Orders;", goal: "Create a binary 1/0 'is_fulfilled' indicator for delivered customer orders." },
      { tbl: "MusicTracks", target: "SELECT track_title, play_count,\n  CASE WHEN play_count > 500000 THEN 1 ELSE 0 END AS is_viral_hit\nFROM MusicTracks;", goal: "Tag music tracks with over 500,000 streams with binary flag 1, else 0." },
      { tbl: "GymMembers", target: "SELECT member_name, visits_this_month,\n  CASE WHEN visits_this_month >= 10 THEN 1 ELSE 0 END AS is_frequent_user\nFROM GymMembers;", goal: "Create binary flag 'is_frequent_user' for members visiting 10+ times this month." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  CASE WHEN star_rating >= 4.0 THEN 1 ELSE 0 END AS is_certified_fresh\nFROM MovieReviews;", goal: "Tag highly rated movies (4.0+ stars) with binary indicator 1, else 0." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, seats_available,\n  CASE WHEN seats_available = 0 THEN 1 ELSE 0 END AS is_sold_out\nFROM FlightSchedule;", goal: "Create binary flag 'is_sold_out' identifying flights with 0 open seats." },
      { tbl: "PetClinic", target: "SELECT pet_name, age_years,\n  CASE WHEN age_years < 1 THEN 1 ELSE 0 END AS is_puppy_or_kitten\nFROM PetClinic;", goal: "Flag young patients under 1 year old as binary 1 ('is_puppy_or_kitten'), else 0." }
    ]
  },
  {
    range: [471, 480],
    subcluster: "5.8 Custom Sorting via CASE in ORDER BY",
    level: "Level 3 (Custom Ordering)",
    topics: [
      { tbl: "GymMembers", target: "SELECT member_name, membership_plan\nFROM GymMembers\nORDER BY\n  CASE membership_plan\n    WHEN 'Platinum' THEN 1\n    WHEN 'Gold' THEN 2\n    WHEN 'Silver' THEN 3\n    ELSE 4\n  END ASC;", goal: "Order gym members by custom tier hierarchy: Platinum first, then Gold, Silver, Bronze." },
      { tbl: "Orders", target: "SELECT order_id, order_status\nFROM Orders\nORDER BY\n  CASE order_status\n    WHEN 'Pending' THEN 1\n    WHEN 'Processing' THEN 2\n    WHEN 'Shipped' THEN 3\n    WHEN 'Delivered' THEN 4\n    ELSE 5\n  END ASC;", goal: "Sort order status in workflow priority sequence: Pending -> Processing -> Shipped -> Delivered." },
      { tbl: "Students", target: "SELECT full_name, major\nFROM Students\nORDER BY\n  CASE\n    WHEN major = 'Computer Science' THEN 1\n    WHEN major = 'Mathematics' THEN 2\n    ELSE 3\n  END ASC, full_name ASC;", goal: "Pin CS and Math students at the top of the roster, sorting all others alphabetically." },
      { tbl: "Employees", target: "SELECT first_name, department\nFROM Employees\nORDER BY\n  CASE department\n    WHEN 'Executive' THEN 1\n    WHEN 'Engineering' THEN 2\n    WHEN 'Sales' THEN 3\n    ELSE 4\n  END ASC, first_name ASC;", goal: "Prioritize department display order: Executive, Engineering, Sales, and then all other departments." },
      { tbl: "Books", target: "SELECT title, genre\nFROM Books\nORDER BY\n  CASE genre\n    WHEN 'Sci-Fi' THEN 1\n    WHEN 'Fantasy' THEN 2\n    ELSE 3\n  END ASC, title ASC;", goal: "Display Sci-Fi and Fantasy books before other genres using custom CASE sorting." },
      { tbl: "GroceryItems", target: "SELECT item_name, is_organic\nFROM GroceryItems\nORDER BY\n  CASE WHEN is_organic = 1 THEN 0 ELSE 1 END ASC, item_name ASC;", goal: "Force all organic certified items to the top of the price catalog." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY\n  CASE\n    WHEN star_rating IS NULL THEN 1\n    ELSE 0\n  END ASC, star_rating DESC;", goal: "Sort movies with ratings highest first, while pushing unrated NULLs to the bottom." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, status\nFROM FlightSchedule\nORDER BY\n  CASE status\n    WHEN 'Delayed' THEN 1\n    WHEN 'Boarding' THEN 2\n    WHEN 'On Time' THEN 3\n    ELSE 4\n  END ASC;", goal: "Pin urgent flight alerts at top of departures board (Delayed -> Boarding -> On Time)." },
      { tbl: "PetClinic", target: "SELECT pet_name, species\nFROM PetClinic\nORDER BY\n  CASE species\n    WHEN 'Dog' THEN 1\n    WHEN 'Cat' THEN 2\n    WHEN 'Bird' THEN 3\n    ELSE 4\n  END ASC, pet_name ASC;", goal: "Order veterinary patient list by species priority: Dog, Cat, Bird, and others." },
      { tbl: "MusicTracks", target: "SELECT track_title, genre\nFROM MusicTracks\nORDER BY\n  CASE genre\n    WHEN 'Rock' THEN 1\n    WHEN 'Electronic' THEN 2\n    ELSE 3\n  END ASC, track_title ASC;", goal: "Sort playlist featuring Rock and Electronic tracks first, followed by remaining genres." }
    ]
  },
  {
    range: [481, 490],
    subcluster: "5.9 Conditional Aggregation (SUM/COUNT with CASE)",
    level: "Level 3 (Conditional Aggregation)",
    topics: [
      { tbl: "Students", target: "SELECT\n  COUNT(*) AS total_students,\n  SUM(CASE WHEN gpa >= 3.5 THEN 1 ELSE 0 END) AS honor_students,\n  SUM(CASE WHEN gpa < 3.0 THEN 1 ELSE 0 END) AS struggling_students\nFROM Students;", goal: "Count total students, honor students (GPA >= 3.5), and struggling students in a single query." },
      { tbl: "Employees", target: "SELECT department,\n  COUNT(*) AS staff_count,\n  SUM(CASE WHEN salary >= 80000 THEN 1 ELSE 0 END) AS high_earners\nFROM Employees\nGROUP BY department;", goal: "Report total staff and count of high earners (salary >= 80,000) per department." },
      { tbl: "GroceryItems", target: "SELECT category,\n  COUNT(*) AS total_items,\n  SUM(CASE WHEN is_organic = 1 THEN 1 ELSE 0 END) AS organic_count\nFROM GroceryItems\nGROUP BY category;", goal: "Count total products and organic products per grocery category in one rollup." },
      { tbl: "Orders", target: "SELECT shipping_city,\n  COUNT(*) AS total_orders,\n  SUM(CASE WHEN order_status = 'Delivered' THEN 1 ELSE 0 END) AS delivered_count\nFROM Orders\nGROUP BY shipping_city;", goal: "Calculate total orders and delivered orders count per destination city." },
      { tbl: "Books", target: "SELECT genre,\n  COUNT(*) AS total_titles,\n  ROUND(AVG(CASE WHEN price > 15.00 THEN price END), 2) AS avg_premium_price\nFROM Books\nGROUP BY genre;", goal: "Calculate total titles and average price of books priced over $15 per genre." },
      { tbl: "MusicTracks", target: "SELECT genre,\n  COUNT(*) AS total_tracks,\n  SUM(CASE WHEN release_year >= 2023 THEN 1 ELSE 0 END) AS new_tracks\nFROM MusicTracks\nGROUP BY genre;", goal: "Tally total songs and recent releases (2023+) per musical genre." },
      { tbl: "GymMembers", target: "SELECT membership_plan,\n  COUNT(*) AS total_members,\n  SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active_members\nFROM GymMembers\nGROUP BY membership_plan;", goal: "Compute total registrations and active members per membership plan." },
      { tbl: "MovieReviews", target: "SELECT genre,\n  COUNT(*) AS total_reviews,\n  SUM(CASE WHEN star_rating >= 4.0 THEN 1 ELSE 0 END) AS positive_reviews\nFROM MovieReviews\nGROUP BY genre;", goal: "Calculate positive review counts (star rating >= 4.0) alongside total reviews per genre." },
      { tbl: "FlightSchedule", target: "SELECT origin_airport,\n  COUNT(*) AS total_flights,\n  SUM(CASE WHEN status = 'On Time' THEN 1 ELSE 0 END) AS on_time_flights\nFROM FlightSchedule\nGROUP BY origin_airport;", goal: "Track on-time flight counts alongside total departures originating from each airport." },
      { tbl: "PetClinic", target: "SELECT species,\n  COUNT(*) AS patient_count,\n  SUM(CASE WHEN age_years >= 7 THEN 1 ELSE 0 END) AS senior_patient_count\nFROM PetClinic\nGROUP BY species;", goal: "Count total patients and senior patients (age >= 7) grouped by animal species." }
    ]
  },
  {
    range: [491, 500],
    subcluster: "5.10 Full Lifecycle Conditional Queries & Bug Hunts",
    level: "Level 3 (Bug Hunts & Complex Pipelines)",
    topics: [
      { tbl: "Students", target: "SELECT full_name, gpa,\n  CASE WHEN gpa >= 3.5 THEN 'Honor' ELSE 'Standard' END AS status\nFROM Students\nWHERE major = 'Computer Science'\nORDER BY gpa DESC;", goal: "Fix missing END keyword in CASE expression: 'CASE WHEN gpa >= 3.5 THEN 'Honor' ELSE 'Standard'' (every CASE must close with END)." },
      { tbl: "Books", target: "SELECT title, price,\n  CASE\n    WHEN price > 20 THEN 'High'\n    WHEN price > 10 THEN 'Medium'\n    ELSE 'Low'\n  END AS cost_band\nFROM Books\nORDER BY price DESC;", goal: "Fix branch ordering bug: ensure higher thresholds are evaluated before lower thresholds in descending WHEN checks." },
      { tbl: "Employees", target: "SELECT department,\n  ROUND(AVG(CASE WHEN salary >= 60000 THEN salary END), 2) AS avg_mid_senior_salary\nFROM Employees\nGROUP BY department\nHAVING COUNT(*) >= 2;", goal: "Combine conditional aggregation with GROUP BY and HAVING filters in a complete department pipeline." },
      { tbl: "GroceryItems", target: "SELECT item_name, unit_price,\n  CASE WHEN unit_price > 5.00 THEN 'Expensive' ELSE 'Cheap' END AS price_tag\nFROM GroceryItems\nWHERE category = 'Produce';", goal: "Fix misplaced comma before CASE keyword: 'SELECT item_name, unit_price, CASE ...' (ensure clean syntax)." },
      { tbl: "Orders", target: "SELECT order_id,\n  COALESCE(shipping_city, 'Store Pickup') AS ship_destination,\n  CASE WHEN quantity * unit_price >= 100 THEN 'VIP Order' ELSE 'Standard Order' END AS tier\nFROM Orders\nORDER BY order_id ASC;", goal: "Combine COALESCE with CASE WHEN to clean destination and label high-value orders simultaneously." },
      { tbl: "MusicTracks", target: "SELECT genre,\n  COUNT(*) AS total_songs,\n  ROUND(100.0 * SUM(CASE WHEN play_count > 100000 THEN 1 ELSE 0 END) / COUNT(*), 1) AS hit_percentage\nFROM MusicTracks\nGROUP BY genre\nHAVING COUNT(*) >= 2;", goal: "Calculate hit track percentage per genre using conditional SUM divided by total count." },
      { tbl: "GymMembers", target: "SELECT member_name,\n  CASE\n    WHEN visits_this_month = 0 THEN 'Zero Attendance'\n    WHEN visits_this_month < 5 THEN 'Low Attendance'\n    ELSE 'Active Attendance'\n  END AS attendance_status\nFROM GymMembers\nWHERE is_active = 1;", goal: "Filter active gym members and classify attendance into 3 clean descriptive tiers." },
      { tbl: "MovieReviews", target: "SELECT movie_title, star_rating,\n  CASE WHEN star_rating IS NOT NULL THEN 'Reviewed' ELSE 'Pending Review' END AS review_state\nFROM MovieReviews\nORDER BY review_state ASC, star_rating DESC;", goal: "Sort reviews segregating reviewed films from pending reviews using CASE expression." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, origin_airport, destination_airport,\n  CASE WHEN origin_airport = destination_airport THEN 'Invalid Route' ELSE 'Valid Route' END AS route_validity\nFROM FlightSchedule;", goal: "Detect route validation anomalies by flagging flights where origin equals destination." },
      { tbl: "PetClinic", target: "SELECT pet_name, species, weight_kg,\n  CASE\n    WHEN species = 'Dog' AND weight_kg > 25 THEN 'Large Canine'\n    WHEN species = 'Dog' THEN 'Standard Canine'\n    WHEN species = 'Cat' THEN 'Feline Patient'\n    ELSE 'Other Species'\n  END AS patient_classification\nFROM PetClinic\nORDER BY patient_classification ASC;", goal: "Multi-condition compound predicates inside CASE WHEN: evaluate species AND weight simultaneously." }
    ]
  }
];

function makeSlots(query) {
  return query.split(/\s+/).map(tok => {
    let type = "column";
    const kw = tok.toUpperCase().replace(/[(),;]/g, '');
    if (["SELECT", "FROM", "WHERE", "GROUP", "BY", "HAVING", "ORDER", "ASC", "DESC", "LIMIT", "CASE", "WHEN", "THEN", "ELSE", "END", "COALESCE", "NULLIF", "AS", "IS", "NULL", "NOT", "AND", "OR", "COUNT", "SUM", "AVG", "ROUND"].includes(kw)) {
      type = "keyword";
    }
    if (tables.some(t => tok.includes(t))) type = "table";
    return { type, value: tok };
  });
}

clustersT5.forEach(c => {
  c.topics.forEach((t, i) => {
    const drillNum = c.range[0] + i;
    const q = t.target;
    DRILLS_T5.push({
      drillNumber: drillNum,
      subcluster: c.subcluster,
      level: c.level,
      title: `Syntax #${String(drillNum).padStart(3, '0')}: ${t.goal.replace(/\.$/, '')}`,
      table: t.tbl,
      scenario: t.goal,
      businessObjective: t.goal,
      schemaSnippet: `${t.tbl} schema`,
      targetQuery: q,
      syntaxBlueprint: `SELECT col_name,\n  CASE WHEN condition THEN 'Val 1' ELSE 'Val 2' END AS alias_name\nFROM ${t.tbl};`,
      syntaxRule: "A CASE expression starts with CASE, tests conditions with WHEN...THEN, optionally falls back with ELSE, and MUST end with END. Every branch should return compatible data types.",
      syntaxTrap: "Forgetting the closing END keyword, or putting a comma between WHEN branches (branches must NOT be separated by commas).",
      eli5Story: `Conditional decision making on ${t.tbl}: ${t.goal}`,
      commonMistakes: "Omitting the END keyword, forgetting the ELSE fallback (defaults to NULL), or misordering WHEN thresholds.",
      learningOutcomes: `Mastered ${c.subcluster} on ${t.tbl}.`,
      challengeSlots: makeSlots(q)
    });
  });
});

console.log('Total Topic 5 drills generated:', DRILLS_T5.length);
fs.writeFileSync('scratch/syntax_drills_t5.json', JSON.stringify(DRILLS_T5, null, 2));
