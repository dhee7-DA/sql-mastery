// Generator for Section 0 - Topic 10: Date, Time & Temporal Arithmetic (Drills #901 to #1000)
// 100 progressive micro-drills across 10 everyday schemas.

const fs = require('fs');

const tables = ['Students', 'Books', 'Employees', 'GroceryItems', 'Orders', 'MusicTracks', 'GymMembers', 'MovieReviews', 'FlightSchedule', 'PetClinic'];

function makeSlots(query) {
  return query.split(/\s+/).filter(Boolean).map(tok => {
    let type = "column";
    const clean = tok.toUpperCase().replace(/[(),;]/g, '');
    if ([
      "SELECT", "FROM", "WHERE", "GROUP", "BY", "HAVING", "ORDER", "ASC", "DESC", "LIMIT",
      "AS", "AND", "OR", "NOT", "IS", "NULL", "COUNT", "SUM", "AVG", "MIN", "MAX",
      "CURRENT_DATE", "CURRENT_TIMESTAMP", "NOW", "YEAR", "MONTH", "DAY", "QUARTER",
      "DAYOFWEEK", "DAYNAME", "DATEDIFF", "DATE_ADD", "DATE_SUB", "INTERVAL", "DATE_FORMAT",
      "HOUR", "MINUTE", "SECOND", "TIMEDIFF", "BETWEEN", "CASE", "WHEN", "THEN", "ELSE", "END"
    ].includes(clean)) {
      type = "keyword";
    } else if (tables.some(t => tok.includes(t))) {
      type = "table";
    }
    return { type, value: tok };
  });
}

const clustersT10 = [
  {
    range: [901, 910],
    subcluster: "10.1 Current Date & Time Anchors (CURRENT_DATE, NOW)",
    level: "Level 1 (Current Anchors)",
    blueprint: "SELECT col, CURRENT_DATE, NOW()\nFROM table_name;",
    rule: "CURRENT_DATE returns today's calendar date ('YYYY-MM-DD'). NOW() returns the active timestamp ('YYYY-MM-DD HH:MM:SS'). Both serve as real-time anchors.",
    trap: "CURRENT_DATE has no parentheses in standard SQL; writing CURRENT_DATE() is engine-specific (valid in MySQL, invalid in PostgreSQL).",
    topics: [
      { tbl: "Students", target: "SELECT full_name, enrolled_date, CURRENT_DATE AS today_date\nFROM Students;", goal: "Display student enrollment dates alongside the current calendar date." },
      { tbl: "Books", target: "SELECT title, published_date, CURRENT_DATE AS audit_date\nFROM Books;", goal: "Project book publication dates with today's audit date using CURRENT_DATE." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, NOW() AS evaluation_timestamp\nFROM Employees;", goal: "Fetch employee hire dates alongside the exact real-time evaluation timestamp using NOW()." },
      { tbl: "GroceryItems", target: "SELECT item_name, expiry_date, CURRENT_DATE AS check_date\nFROM GroceryItems;", goal: "Compare grocery expiration dates against today's date." },
      { tbl: "Orders", target: "SELECT order_id, order_date, NOW() AS processed_at\nFROM Orders;", goal: "Timestamp customer order records with the active server time using NOW()." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date, CURRENT_DATE AS catalog_as_of\nFROM MusicTracks;", goal: "Project track release dates anchored against today's date." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date, CURRENT_DATE AS active_membership_date\nFROM GymMembers;", goal: "Anchor gym member registration dates against the current date." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, NOW() AS fetch_time\nFROM MovieReviews;", goal: "Fetch movie review dates paired with current query execution time." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time, NOW() AS radar_timestamp\nFROM FlightSchedule;", goal: "Display flight departure times against active radar system time." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, CURRENT_DATE AS clinic_today\nFROM PetClinic;", goal: "Anchor veterinary patient appointment dates with today's calendar date." }
    ]
  },
  {
    range: [911, 920],
    subcluster: "10.2 Date Component Extraction (YEAR, MONTH, DAY)",
    level: "Level 1 (Component Extraction)",
    blueprint: "SELECT col, YEAR(date_col), MONTH(date_col), DAY(date_col)\nFROM table_name;",
    rule: "Use YEAR(), MONTH(), and DAY() to extract discrete integer parts of a calendar date for seasonal, monthly, or annual filtering.",
    trap: "MONTH() returns 1 to 12 as an integer, not the month name. For names, use MONTHNAME() or DATE_FORMAT().",
    topics: [
      { tbl: "Students", target: "SELECT full_name, YEAR(enrolled_date) AS enroll_year\nFROM Students\nWHERE YEAR(enrolled_date) = 2024;", goal: "Find all students who enrolled in the year 2024 using YEAR()." },
      { tbl: "Books", target: "SELECT title, YEAR(published_date) AS pub_year, MONTH(published_date) AS pub_month\nFROM Books\nWHERE YEAR(published_date) >= 2020;", goal: "Extract publication year and month for books published in 2020 or later." },
      { tbl: "Employees", target: "SELECT first_name, YEAR(hire_date) AS hire_year, MONTH(hire_date) AS hire_month\nFROM Employees\nWHERE MONTH(hire_date) = 1;", goal: "Find employees hired in January (month 1) across any year." },
      { tbl: "GroceryItems", target: "SELECT item_name, MONTH(expiry_date) AS exp_month, DAY(expiry_date) AS exp_day\nFROM GroceryItems\nWHERE YEAR(expiry_date) = 2026;", goal: "Inspect expiration month and day for grocery items expiring in 2026." },
      { tbl: "Orders", target: "SELECT order_id, YEAR(order_date) AS ord_year, MONTH(order_date) AS ord_month\nFROM Orders\nWHERE YEAR(order_date) = 2025 AND MONTH(order_date) = 12;", goal: "Filter holiday orders placed specifically in December 2025." },
      { tbl: "MusicTracks", target: "SELECT track_title, YEAR(release_date) AS release_year\nFROM MusicTracks\nWHERE YEAR(release_date) < 2000;", goal: "Identify retro music tracks released before the year 2000." },
      { tbl: "GymMembers", target: "SELECT member_name, YEAR(join_date) AS join_year, DAY(join_date) AS join_day\nFROM GymMembers\nWHERE YEAR(join_date) = 2023;", goal: "Extract registration year and day of month for gym members who joined in 2023." },
      { tbl: "MovieReviews", target: "SELECT movie_title, YEAR(review_date) AS rev_year, MONTH(review_date) AS rev_month\nFROM MovieReviews\nWHERE MONTH(review_date) = 7;", goal: "Retrieve movie reviews submitted during the summer month of July (month 7)." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, DAY(departure_time) AS departure_day, MONTH(departure_time) AS departure_month\nFROM FlightSchedule\nWHERE MONTH(departure_time) = 6;", goal: "Extract departure day and month for flights scheduled in June." },
      { tbl: "PetClinic", target: "SELECT pet_name, YEAR(visit_date) AS visit_year, MONTH(visit_date) AS visit_month\nFROM PetClinic\nWHERE YEAR(visit_date) = 2024;", goal: "Extract visit year and month for clinic patients seen in 2024." }
    ]
  },
  {
    range: [921, 930],
    subcluster: "10.3 Quarters & Day of Week (QUARTER, DAYOFWEEK, DAYNAME)",
    level: "Level 1 (Calendar Metrics)",
    blueprint: "SELECT col, QUARTER(date_col), DAYOFWEEK(date_col), DAYNAME(date_col)\nFROM table_name;",
    rule: "QUARTER() maps dates to financial quarters (1 to 4). DAYNAME() returns day names ('Monday', 'Friday'). DAYOFWEEK() returns 1 (Sunday) to 7 (Saturday).",
    trap: "DAYOFWEEK starts on Sunday (1 = Sunday) in standard SQL/MySQL, unlike ISO week day standards.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, QUARTER(enrolled_date) AS enroll_quarter\nFROM Students\nWHERE QUARTER(enrolled_date) = 1;", goal: "Identify students enrolled during Q1 (Quarter 1) of the academic calendar." },
      { tbl: "Books", target: "SELECT title, QUARTER(published_date) AS release_quarter\nFROM Books\nWHERE QUARTER(published_date) = 4;", goal: "Find holiday catalog books published in Q4." },
      { tbl: "Employees", target: "SELECT first_name, DAYNAME(hire_date) AS hire_day_name\nFROM Employees\nWHERE DAYOFWEEK(hire_date) = 2;", goal: "Identify employees whose first day of work was a Monday (DAYOFWEEK = 2)." },
      { tbl: "GroceryItems", target: "SELECT item_name, DAYNAME(expiry_date) AS expiry_day\nFROM GroceryItems\nWHERE DAYNAME(expiry_date) = 'Sunday';", goal: "Find grocery items expiring on a Sunday using DAYNAME()." },
      { tbl: "Orders", target: "SELECT order_id, DAYNAME(order_date) AS purchase_day, total_amount\nFROM Orders\nWHERE DAYNAME(order_date) IN ('Saturday', 'Sunday');", goal: "Filter weekend customer orders placed on Saturday or Sunday." },
      { tbl: "MusicTracks", target: "SELECT track_title, DAYNAME(release_date) AS release_day\nFROM MusicTracks\nWHERE DAYNAME(release_date) = 'Friday';", goal: "Identify new music releases dropped on traditional New Music Friday." },
      { tbl: "GymMembers", target: "SELECT member_name, DAYNAME(join_date) AS signup_day\nFROM GymMembers\nWHERE DAYNAME(join_date) = 'Monday';", goal: "Find fitness enthusiasts who started their gym membership on a Monday." },
      { tbl: "MovieReviews", target: "SELECT movie_title, QUARTER(review_date) AS review_quarter\nFROM MovieReviews\nWHERE QUARTER(review_date) = 2;", goal: "Retrieve film reviews published during Q2 (April to June)." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, DAYNAME(departure_time) AS flight_day\nFROM FlightSchedule\nWHERE DAYNAME(departure_time) = 'Friday';", goal: "Find all flights scheduled for high-traffic Friday departures." },
      { tbl: "PetClinic", target: "SELECT pet_name, DAYNAME(visit_date) AS appointment_day\nFROM PetClinic\nWHERE DAYNAME(visit_date) = 'Saturday';", goal: "Identify veterinary patients booked for weekend Saturday appointments." }
    ]
  },
  {
    range: [931, 940],
    subcluster: "10.4 Date Differences & Elapsed Spans (DATEDIFF)",
    level: "Level 2 (Date Spans)",
    blueprint: "SELECT col, DATEDIFF(end_date, start_date) AS days_elapsed\nFROM table_name;",
    rule: "DATEDIFF(date1, date2) computes (date1 - date2) in days. If date1 is after date2, the result is positive.",
    trap: "Passing the start date first in DATEDIFF(start, end) produces negative day counts. Always write DATEDIFF(later_date, earlier_date).",
    topics: [
      { tbl: "Students", target: "SELECT full_name, DATEDIFF(CURRENT_DATE, enrolled_date) AS days_enrolled\nFROM Students\nORDER BY days_enrolled DESC;", goal: "Calculate the exact number of days each student has been enrolled relative to today." },
      { tbl: "Books", target: "SELECT title, DATEDIFF(CURRENT_DATE, published_date) AS days_since_publication\nFROM Books\nWHERE DATEDIFF(CURRENT_DATE, published_date) > 365;", goal: "Find books published over 365 days ago using DATEDIFF." },
      { tbl: "Employees", target: "SELECT first_name, DATEDIFF(CURRENT_DATE, hire_date) AS tenure_days\nFROM Employees\nWHERE DATEDIFF(CURRENT_DATE, hire_date) >= 1825;", goal: "Identify 5-year veteran employees whose company tenure exceeds 1,825 days." },
      { tbl: "GroceryItems", target: "SELECT item_name, DATEDIFF(expiry_date, CURRENT_DATE) AS days_until_expiry\nFROM GroceryItems\nWHERE DATEDIFF(expiry_date, CURRENT_DATE) <= 7;", goal: "Identify perishable grocery stock expiring within the next 7 days." },
      { tbl: "Orders", target: "SELECT order_id, DATEDIFF(shipped_date, order_date) AS fulfillment_days\nFROM Orders\nORDER BY fulfillment_days DESC;", goal: "Calculate warehouse fulfillment speed in days between order date and shipped date." },
      { tbl: "MusicTracks", target: "SELECT track_title, DATEDIFF(CURRENT_DATE, release_date) AS days_on_market\nFROM MusicTracks\nORDER BY days_on_market ASC;", goal: "Calculate how many days each music track has been available on the market." },
      { tbl: "GymMembers", target: "SELECT member_name, DATEDIFF(CURRENT_DATE, join_date) AS membership_longevity_days\nFROM GymMembers\nORDER BY membership_longevity_days DESC\nLIMIT 10;", goal: "Find the 10 longest-standing gym members by days elapsed since joining." },
      { tbl: "MovieReviews", target: "SELECT movie_title, DATEDIFF(CURRENT_DATE, review_date) AS days_ago\nFROM MovieReviews\nWHERE DATEDIFF(CURRENT_DATE, review_date) <= 30;", goal: "Filter fresh reviews published in the last 30 days using DATEDIFF." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, DATEDIFF(arrival_time, departure_time) AS overnight_flight_days\nFROM FlightSchedule\nWHERE DATEDIFF(arrival_time, departure_time) >= 1;", goal: "Identify overnight long-haul flights where arrival day is after departure day." },
      { tbl: "PetClinic", target: "SELECT pet_name, DATEDIFF(CURRENT_DATE, visit_date) AS days_since_last_checkup\nFROM PetClinic\nWHERE DATEDIFF(CURRENT_DATE, visit_date) > 180;", goal: "Identify pets whose last clinic checkup was more than 180 days ago." }
    ]
  },
  {
    range: [941, 950],
    subcluster: "10.5 Forward Date Addition (DATE_ADD & INTERVAL)",
    level: "Level 2 (Date Addition)",
    blueprint: "SELECT col, DATE_ADD(date_col, INTERVAL n unit) AS future_date\nFROM table_name;",
    rule: "DATE_ADD(date, INTERVAL n UNIT) projects future dates by adding a specified duration (DAY, MONTH, YEAR). Alternatively, write 'date + INTERVAL n UNIT'.",
    trap: "Specifying plural units like 'INTERVAL 5 DAYS' (standard SQL requires singular DAY, MONTH, YEAR).",
    topics: [
      { tbl: "Students", target: "SELECT full_name, enrolled_date, DATE_ADD(enrolled_date, INTERVAL 4 YEAR) AS expected_graduation_date\nFROM Students;", goal: "Project expected graduation date by adding 4 years to enrollment date." },
      { tbl: "Books", target: "SELECT title, published_date, DATE_ADD(published_date, INTERVAL 1 YEAR) AS paperback_release_date\nFROM Books;", goal: "Schedule paperback edition releases 1 year after the initial publication date." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, DATE_ADD(hire_date, INTERVAL 90 DAY) AS probation_end_date\nFROM Employees;", goal: "Calculate the exact completion date of an employee's 90-day probationary period." },
      { tbl: "GroceryItems", target: "SELECT item_name, received_date, DATE_ADD(received_date, INTERVAL 14 DAY) AS sell_by_date\nFROM GroceryItems;", goal: "Calculate 14-day sell-by shelf dates from the receiving date using DATE_ADD." },
      { tbl: "Orders", target: "SELECT order_id, order_date, DATE_ADD(order_date, INTERVAL 3 DAY) AS estimated_delivery_date\nFROM Orders;", goal: "Estimate 3-day delivery arrival dates from the original order date." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date, DATE_ADD(release_date, INTERVAL 6 MONTH) AS deluxe_edition_date\nFROM MusicTracks;", goal: "Schedule deluxe edition drops 6 months after the initial release date." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date, DATE_ADD(join_date, INTERVAL 1 YEAR) AS annual_renewal_date\nFROM GymMembers;", goal: "Calculate annual membership renewal dates exactly 1 year after joining." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, DATE_ADD(review_date, INTERVAL 30 DAY) AS editorial_lock_date\nFROM MovieReviews;", goal: "Lock review edits 30 days after initial submission date." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time, DATE_ADD(departure_time, INTERVAL 2 HOUR) AS expected_landing_time\nFROM FlightSchedule;", goal: "Calculate landing time by adding a 2-hour flight interval to departure time." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, DATE_ADD(visit_date, INTERVAL 6 MONTH) AS next_annual_booster_date\nFROM PetClinic;", goal: "Schedule upcoming vaccination boosters 6 months after the visit date." }
    ]
  },
  {
    range: [951, 960],
    subcluster: "10.6 Backward Date Subtraction (DATE_SUB & Negative INTERVAL)",
    level: "Level 2 (Date Subtraction)",
    blueprint: "SELECT col, DATE_SUB(date_col, INTERVAL n unit) AS past_date\nFROM table_name;",
    rule: "DATE_SUB(date, INTERVAL n UNIT) or 'date - INTERVAL n UNIT' walks backward in time to establish historical benchmarks.",
    trap: "Confusing DATE_SUB with DATEDIFF: DATE_SUB returns a modified DATE, while DATEDIFF returns an integer COUNT of days.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, enrolled_date, DATE_SUB(enrolled_date, INTERVAL 30 DAY) AS application_deadline\nFROM Students;", goal: "Determine when applications closed: calculate 30 days prior to enrollment date." },
      { tbl: "Books", target: "SELECT title, published_date, DATE_SUB(published_date, INTERVAL 6 MONTH) AS manuscript_submission_date\nFROM Books;", goal: "Calculate manuscript deadlines 6 months before book publication." },
      { tbl: "Employees", target: "SELECT first_name, hire_date, DATE_SUB(hire_date, INTERVAL 14 DAY) AS offer_letter_date\nFROM Employees;", goal: "Trace hiring timeline: calculate offer letter dates 14 days before start date." },
      { tbl: "GroceryItems", target: "SELECT item_name, expiry_date, DATE_SUB(expiry_date, INTERVAL 3 DAY) AS markdown_clearance_date\nFROM GroceryItems;", goal: "Mark down grocery prices 3 days before expiration date." },
      { tbl: "Orders", target: "SELECT order_id, order_date, DATE_SUB(order_date, INTERVAL 1 HOUR) AS cart_created_time\nFROM Orders;", goal: "Trace checkout velocity: calculate shopping cart creation time 1 hour before order." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date, DATE_SUB(release_date, INTERVAL 1 MONTH) AS teaser_campaign_date\nFROM MusicTracks;", goal: "Launch teaser promotional campaigns 1 month before track release date." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date, DATE_SUB(join_date, INTERVAL 7 DAY) AS guest_pass_activated\nFROM GymMembers;", goal: "Audit trial passes activated 7 days prior to membership sign-up." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, DATE_SUB(review_date, INTERVAL 1 DAY) AS advance_screening_date\nFROM MovieReviews;", goal: "Calculate advance press screening dates 1 day before review publication." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time, DATE_SUB(departure_time, INTERVAL 45 MINUTE) AS boarding_commences\nFROM FlightSchedule;", goal: "Calculate passenger boarding time 45 minutes prior to scheduled departure." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date, DATE_SUB(visit_date, INTERVAL 24 HOUR) AS reminder_sms_sent\nFROM PetClinic;", goal: "Trigger automated appointment reminder text messages 24 hours in advance." }
    ]
  },
  {
    range: [961, 970],
    subcluster: "10.7 Rolling Time Window Filtering (CURRENT_DATE - INTERVAL)",
    level: "Level 2 (Rolling Windows)",
    blueprint: "SELECT col\nFROM table_name\nWHERE date_col >= CURRENT_DATE - INTERVAL 30 DAY;",
    rule: "Filter dynamic, rolling historical windows by comparing a date column against 'CURRENT_DATE - INTERVAL n UNIT'. This keeps queries evergreen without hardcoded dates.",
    trap: "Hardcoding 'WHERE date_col >= '2024-01-01'' instead of relative rolling windows means reports become stale every week.",
    topics: [
      { tbl: "Students", target: "SELECT full_name, enrolled_date\nFROM Students\nWHERE enrolled_date >= CURRENT_DATE - INTERVAL 90 DAY;", goal: "Find new students who enrolled within the rolling last 90 days." },
      { tbl: "Books", target: "SELECT title, published_date\nFROM Books\nWHERE published_date >= CURRENT_DATE - INTERVAL 1 YEAR;", goal: "Filter new releases published within the rolling past 1 year." },
      { tbl: "Employees", target: "SELECT first_name, hire_date\nFROM Employees\nWHERE hire_date >= CURRENT_DATE - INTERVAL 6 MONTH;", goal: "Identify newly onboarded employees hired within the last 6 months." },
      { tbl: "GroceryItems", target: "SELECT item_name, expiry_date\nFROM GroceryItems\nWHERE expiry_date <= CURRENT_DATE + INTERVAL 3 DAY;", goal: "Find all grocery inventory expiring within the next rolling 3 days." },
      { tbl: "Orders", target: "SELECT order_id, customer_name, order_date, total_amount\nFROM Orders\nWHERE order_date >= CURRENT_DATE - INTERVAL 7 DAY;", goal: "Retrieve recent customer orders placed within the rolling past 7 days." },
      { tbl: "MusicTracks", target: "SELECT track_title, release_date\nFROM MusicTracks\nWHERE release_date >= CURRENT_DATE - INTERVAL 30 DAY;", goal: "Filter new music tracks released within the rolling past 30 days." },
      { tbl: "GymMembers", target: "SELECT member_name, join_date\nFROM GymMembers\nWHERE join_date >= CURRENT_DATE - INTERVAL 14 DAY;", goal: "List newly registered gym members who joined in the last 14 days." },
      { tbl: "MovieReviews", target: "SELECT movie_title, review_date, star_rating\nFROM MovieReviews\nWHERE review_date >= CURRENT_DATE - INTERVAL 60 DAY;", goal: "Filter movie reviews published within the rolling past 60 days." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, departure_time\nFROM FlightSchedule\nWHERE departure_time >= NOW() - INTERVAL 2 HOUR;", goal: "Find flights departing within the active 2-hour departure gate window." },
      { tbl: "PetClinic", target: "SELECT pet_name, visit_date\nFROM PetClinic\nWHERE visit_date >= CURRENT_DATE - INTERVAL 30 DAY;", goal: "Retrieve clinic patients seen for checkups within the last 30 days." }
    ]
  },
  {
    range: [971, 980],
    subcluster: "10.8 Date Formatting & Cohort Month Strings (DATE_FORMAT)",
    level: "Level 2 (Date Formatting)",
    blueprint: "SELECT col, DATE_FORMAT(date_col, '%Y-%m') AS cohort_month\nFROM table_name;",
    rule: "DATE_FORMAT(date, format_string) transforms dates into human-readable strings or monthly cohort keys. '%Y-%m' is the industry standard for monthly cohort bucketing.",
    trap: "'%y' (lowercase) produces a 2-digit year ('24'), while '%Y' (uppercase) produces the required 4-digit year ('2024').",
    topics: [
      { tbl: "Students", target: "SELECT full_name, DATE_FORMAT(enrolled_date, '%Y-%m') AS cohort_month\nFROM Students;", goal: "Format enrollment dates into monthly cohort tags ('YYYY-MM') via DATE_FORMAT." },
      { tbl: "Books", target: "SELECT title, DATE_FORMAT(published_date, '%M %Y') AS readable_pub_date\nFROM Books;", goal: "Format publication dates into readable 'Month Year' strings (e.g. 'October 2023')." },
      { tbl: "Employees", target: "SELECT first_name, DATE_FORMAT(hire_date, '%Y-%m') AS hire_cohort\nFROM Employees;", goal: "Assign employees to hiring cohort months ('YYYY-MM') using DATE_FORMAT." },
      { tbl: "GroceryItems", target: "SELECT item_name, DATE_FORMAT(expiry_date, '%d/%m/%Y') AS shelf_tag_date\nFROM GroceryItems;", goal: "Format expiration dates into European shelf-tag format 'DD/MM/YYYY'." },
      { tbl: "Orders", target: "SELECT order_id, DATE_FORMAT(order_date, '%Y-%m') AS order_month, total_amount\nFROM Orders;", goal: "Format order dates into monthly financial reporting periods ('YYYY-MM')." },
      { tbl: "MusicTracks", target: "SELECT track_title, DATE_FORMAT(release_date, '%b %d, %Y') AS display_release\nFROM MusicTracks;", goal: "Format release dates into album sleeve format 'Mon DD, YYYY'." },
      { tbl: "GymMembers", target: "SELECT member_name, DATE_FORMAT(join_date, '%Y-%m') AS join_cohort\nFROM GymMembers;", goal: "Bucket gym members into monthly registration cohorts." },
      { tbl: "MovieReviews", target: "SELECT movie_title, DATE_FORMAT(review_date, '%W, %M %e, %Y') AS full_review_date\nFROM MovieReviews;", goal: "Format review publication dates with full weekday and month names." },
      { tbl: "FlightSchedule", target: "SELECT flight_id, DATE_FORMAT(departure_time, '%H:%i') AS boarding_time_str\nFROM FlightSchedule;", goal: "Format flight departure timestamps into 24-hour boarding time strings 'HH:MM'." },
      { tbl: "PetClinic", target: "SELECT pet_name, DATE_FORMAT(visit_date, '%Y-%m') AS billing_month\nFROM PetClinic;", goal: "Bucket veterinary patient visits into monthly billing periods ('YYYY-MM')." }
    ]
  },
  {
    range: [981, 990],
    subcluster: "10.9 Temporal Grouping & Aggregations (GROUP BY YEAR, MONTH)",
    level: "Level 2 (Temporal Aggregation)",
    blueprint: "SELECT YEAR(date_col) AS yr, MONTH(date_col) AS mo, COUNT(*) AS count_metric\nFROM table_name\nGROUP BY YEAR(date_col), MONTH(date_col)\nORDER BY yr ASC, mo ASC;",
    rule: "Aggregate metrics across time by grouping by calendar components (YEAR, MONTH, QUARTER) and ordering chronologically.",
    trap: "Grouping only by MONTH(date_col) merges January 2023 with January 2024! Always group by both YEAR and MONTH for time series.",
    topics: [
      { tbl: "Students", target: "SELECT YEAR(enrolled_date) AS enroll_year, COUNT(*) AS new_students_count\nFROM Students\nGROUP BY YEAR(enrolled_date)\nORDER BY enroll_year ASC;", goal: "Aggregate annual student enrollment volume grouped by year." },
      { tbl: "Books", target: "SELECT YEAR(published_date) AS pub_year, COUNT(*) AS books_published\nFROM Books\nGROUP BY YEAR(published_date)\nORDER BY pub_year DESC;", goal: "Calculate the annual volume of published books grouped by year." },
      { tbl: "Employees", target: "SELECT YEAR(hire_date) AS hire_year, COUNT(*) AS headcount_hired, AVG(salary) AS avg_starting_salary\nFROM Employees\nGROUP BY YEAR(hire_date)\nORDER BY hire_year ASC;", goal: "Track annual hiring volume and average starting salary by hire year." },
      { tbl: "GroceryItems", target: "SELECT YEAR(expiry_date) AS exp_year, MONTH(expiry_date) AS exp_month, COUNT(*) AS expiring_item_count\nFROM GroceryItems\nGROUP BY YEAR(expiry_date), MONTH(expiry_date)\nORDER BY exp_year ASC, exp_month ASC;", goal: "Aggregate expiring grocery items by year and month to anticipate inventory shrinkage." },
      { tbl: "Orders", target: "SELECT DATE_FORMAT(order_date, '%Y-%m') AS order_month, COUNT(*) AS total_orders, SUM(total_amount) AS monthly_revenue\nFROM Orders\nGROUP BY DATE_FORMAT(order_date, '%Y-%m')\nORDER BY order_month ASC;", goal: "Compute monthly order counts and total revenue grouped by 'YYYY-MM'." },
      { tbl: "MusicTracks", target: "SELECT YEAR(release_date) AS release_year, COUNT(*) AS tracks_released\nFROM MusicTracks\nGROUP BY YEAR(release_date)\nORDER BY release_year DESC;", goal: "Count annual music release volume grouped by release year." },
      { tbl: "GymMembers", target: "SELECT DATE_FORMAT(join_date, '%Y-%m') AS signup_month, COUNT(*) AS new_member_signups\nFROM GymMembers\nGROUP BY DATE_FORMAT(join_date, '%Y-%m')\nORDER BY signup_month ASC;", goal: "Analyze month-over-month gym membership signups grouped by 'YYYY-MM'." },
      { tbl: "MovieReviews", target: "SELECT YEAR(review_date) AS rev_year, AVG(star_rating) AS annual_avg_rating\nFROM MovieReviews\nGROUP BY YEAR(review_date)\nORDER BY rev_year ASC;", goal: "Calculate average film rating score grouped by review year." },
      { tbl: "FlightSchedule", target: "SELECT DATE(departure_time) AS flight_day, COUNT(*) AS daily_departures\nFROM FlightSchedule\nGROUP BY DATE(departure_time)\nORDER BY flight_day ASC;", goal: "Compute daily flight departure volume grouped by date." },
      { tbl: "PetClinic", target: "SELECT DATE_FORMAT(visit_date, '%Y-%m') AS visit_month, COUNT(*) AS monthly_patient_visits\nFROM PetClinic\nGROUP BY DATE_FORMAT(visit_date, '%Y-%m')\nORDER BY visit_month ASC;", goal: "Tally monthly veterinary clinic visit volume grouped by month." }
    ]
  },
  {
    range: [991, 1000],
    subcluster: "10.10 Lifecycle Time-Series Analytics & Temporal Traps",
    level: "Level 3 (Time-Series Master)",
    blueprint: "SELECT col1, DATE_FORMAT(date_col, '%Y-%m') AS period, SUM(metric) AS total\nFROM table_name\nWHERE date_col >= CURRENT_DATE - INTERVAL 1 YEAR\nGROUP BY col1, period\nHAVING total > 1000\nORDER BY period DESC, total DESC;",
    rule: "Combine temporal filtering, cohort formatting, multi-column grouping, and HAVING thresholds into complete time-series reporting pipelines.",
    trap: "Using string comparison ('2024-05-01' > '2024-04-30') works for ISO dates, but fails completely on non-standard date formats like '05/01/2024'.",
    topics: [
      { tbl: "Students", target: "SELECT city, YEAR(enrolled_date) AS enroll_year, COUNT(*) AS student_count\nFROM Students\nWHERE enrolled_date >= '2020-01-01'\nGROUP BY city, enroll_year\nHAVING COUNT(*) >= 2\nORDER BY enroll_year DESC, student_count DESC;", goal: "Time-series pipeline: Regional student enrollment trends by city and year since 2020." },
      { tbl: "Books", target: "SELECT author, YEAR(published_date) AS pub_year, COUNT(*) AS book_count\nFROM Books\nWHERE published_date >= '2015-01-01'\nGROUP BY author, pub_year\nORDER BY pub_year DESC, book_count DESC\nLIMIT 5;", goal: "Time-series pipeline: Top author productivity by year over the past decade." },
      { tbl: "Employees", target: "SELECT department, YEAR(hire_date) AS cohort_year, COUNT(*) AS hires, AVG(salary) AS avg_sal\nFROM Employees\nWHERE hire_date >= CURRENT_DATE - INTERVAL 3 YEAR\nGROUP BY department, cohort_year\nORDER BY cohort_year DESC, hires DESC;", goal: "Time-series pipeline: 3-year rolling departmental hiring and salary trends." },
      { tbl: "GroceryItems", target: "SELECT category, DATE_FORMAT(expiry_date, '%Y-%m') AS exp_month, COUNT(*) AS expiring_units\nFROM GroceryItems\nWHERE expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL 30 DAY\nGROUP BY category, exp_month\nORDER BY expiring_units DESC;", goal: "Time-series pipeline: 30-day inventory expiration forecast grouped by category and month." },
      { tbl: "Orders", target: "SELECT shipping_city, DATE_FORMAT(order_date, '%Y-%m') AS sales_month, SUM(total_amount) AS revenue\nFROM Orders\nWHERE order_date >= CURRENT_DATE - INTERVAL 6 MONTH\nGROUP BY shipping_city, sales_month\nHAVING SUM(total_amount) >= 500.00\nORDER BY sales_month DESC, revenue DESC;", goal: "Time-series pipeline: 6-month rolling city revenue exceeding $500." },
      { tbl: "MusicTracks", target: "SELECT genre, YEAR(release_date) AS release_year, COUNT(*) AS total_songs\nFROM MusicTracks\nWHERE release_date >= '2010-01-01'\nGROUP BY genre, release_year\nHAVING COUNT(*) >= 2\nORDER BY release_year DESC, total_songs DESC;", goal: "Time-series pipeline: Genre popularity trends by release year since 2010." },
      { tbl: "GymMembers", target: "SELECT membership_plan, DATE_FORMAT(join_date, '%Y-%m') AS signup_cohort, COUNT(*) AS member_count\nFROM GymMembers\nWHERE join_date >= CURRENT_DATE - INTERVAL 1 YEAR\nGROUP BY membership_plan, signup_cohort\nORDER BY signup_cohort DESC, member_count DESC;", goal: "Time-series pipeline: 1-year rolling membership signups by plan and cohort month." },
      { tbl: "MovieReviews", target: "SELECT genre, YEAR(review_date) AS rev_year, AVG(star_rating) AS avg_rating\nFROM MovieReviews\nWHERE review_date >= CURRENT_DATE - INTERVAL 2 YEAR\nGROUP BY genre, rev_year\nHAVING COUNT(*) >= 2\nORDER BY rev_year DESC, avg_rating DESC;", goal: "Time-series pipeline: 2-year rolling genre critical rating trends." },
      { tbl: "FlightSchedule", target: "SELECT origin_airport, DATE_FORMAT(departure_time, '%Y-%m') AS departure_month, COUNT(*) AS flight_count\nFROM FlightSchedule\nWHERE departure_time >= CURRENT_DATE - INTERVAL 90 DAY\nGROUP BY origin_airport, departure_month\nORDER BY flight_count DESC\nLIMIT 5;", goal: "Time-series pipeline: Top 5 busiest airport departure months in the past 90 days." },
      { tbl: "PetClinic", target: "SELECT species, DATE_FORMAT(visit_date, '%Y-%m') AS visit_period, COUNT(*) AS patient_count\nFROM PetClinic\nWHERE visit_date >= CURRENT_DATE - INTERVAL 6 MONTH\nGROUP BY species, visit_period\nORDER BY visit_period DESC, patient_count DESC;", goal: "Time-series pipeline: 6-month rolling veterinary patient trends by species." }
    ]
  }
];

const DRILLS_T10 = [];

clustersT10.forEach(c => {
  c.topics.forEach((t, i) => {
    const drillNum = c.range[0] + i;
    const q = t.target;
    DRILLS_T10.push({
      drillNumber: drillNum,
      subcluster: c.subcluster,
      level: c.level,
      title: `Syntax #${String(drillNum).padStart(3, '0')}: ${t.goal.replace(/\.$/, '')}`,
      table: t.tbl,
      scenario: t.goal,
      businessObjective: t.goal,
      schemaSnippet: `${t.tbl} temporal schema`,
      targetQuery: q,
      syntaxBlueprint: c.blueprint,
      syntaxRule: c.rule,
      syntaxTrap: c.trap,
      eli5Story: `Date, Time & Temporal Arithmetic on ${t.tbl}: ${t.goal}`,
      commonMistakes: "Passing parameters in wrong order in DATEDIFF, hardcoding static dates instead of relative rolling intervals, or forgetting to group by both YEAR and MONTH for time series.",
      learningOutcomes: `Mastered ${c.subcluster} on ${t.tbl}.`,
      challengeSlots: makeSlots(q)
    });
  });
});

console.log('Total Topic 10 drills generated:', DRILLS_T10.length);
fs.writeFileSync('scratch/syntax_drills_t10.json', JSON.stringify(DRILLS_T10, null, 2));
