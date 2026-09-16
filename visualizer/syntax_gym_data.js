// =============================================================================
// SECTION 0: THE SQL SYNTAX GYM (400 Progressive In-Depth Micro-Drills)
// Topics 1, 2, 3, & 4: SELECT, WHERE, ORDER BY & LIMIT, Aggregations & GROUP BY
// =============================================================================

const SYNTAX_GYM_DRILLS = [
  {
    "drillNumber": 1,
    "subcluster": "1.1 Basic Projections",
    "level": "Level 1 (Foundations)",
    "title": "Retrieve the Entire Students Table",
    "table": "Students",
    "scenario": "You are setting up the classroom roster. Retrieve all columns and all records for every enrolled student.",
    "businessObjective": "Pull every column using the universal asterisk wildcard.",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT *\nFROM Students;",
    "syntaxBlueprint": "SELECT *\nFROM table_name;",
    "syntaxRule": "The asterisk (*) represents all columns. Always follow SELECT * with FROM and your table name.",
    "syntaxTrap": "Writing 'SELECT ALL FROM Students;' (ALL is an aggregate modifier, not a column wildcard).",
    "eli5Story": "Think of SELECT * like taking a wide-angle snapshot of the entire room—everyone and everything is captured.",
    "commonMistakes": "Putting a semicolon after SELECT or forgetting the FROM keyword.",
    "learningOutcomes": "Mastered basic table scanning and wildcard projections.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 2,
    "subcluster": "1.1 Basic Projections",
    "level": "Level 1 (Foundations)",
    "title": "Inspect Available Library Books",
    "table": "Books",
    "scenario": "The librarian wants to review the full catalog including inventory and pricing.",
    "businessObjective": "Select every column from the Books catalog.",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT *\nFROM Books;",
    "syntaxBlueprint": "SELECT *\nFROM table_name;",
    "syntaxRule": "A query must end with a semicolon in standard SQL clients.",
    "syntaxTrap": "Typing the table name before SELECT.",
    "eli5Story": "Opening the master binder that has every detail of every book.",
    "commonMistakes": "Omitting the semicolon at the end of the query.",
    "learningOutcomes": "Mastered full catalog inspection.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 3,
    "subcluster": "1.1 Basic Projections",
    "level": "Level 1 (Foundations)",
    "title": "Display Student First Names Only",
    "table": "Students",
    "scenario": "Generate an attendance roll call sheet displaying only the first name of each student.",
    "businessObjective": "Extract a single specific column to minimize memory overhead.",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT first_name\nFROM Students;",
    "syntaxBlueprint": "SELECT column_name\nFROM table_name;",
    "syntaxRule": "When selecting a single column, no commas are used anywhere in the query.",
    "syntaxTrap": "Writing 'SELECT first_name, FROM Students;' (trailing comma before FROM).",
    "eli5Story": "Calling out roll call by first names only—no need to say last names or birth dates.",
    "commonMistakes": "Accidentally adding a comma after the single column name.",
    "learningOutcomes": "Mastered single-column extraction without unnecessary commas.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 4,
    "subcluster": "1.1 Basic Projections",
    "level": "Level 1 (Foundations)",
    "title": "List All Book Titles",
    "table": "Books",
    "scenario": "Print the spine labels for bookstore shelves showing only book titles.",
    "businessObjective": "Select the title column from the Books table.",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title\nFROM Books;",
    "syntaxBlueprint": "SELECT column_name\nFROM table_name;",
    "syntaxRule": "Column names are case-insensitive in ANSI SQL, but snake_case is standard practice.",
    "syntaxTrap": "Wrapping the column name in single quotes ('title' will output the literal word 'title' for every row!).",
    "eli5Story": "Printing a list of book titles to tape onto the bookshelf edges.",
    "commonMistakes": "Putting single quotes around column identifiers.",
    "learningOutcomes": "Understood the difference between column names and text literals.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 5,
    "subcluster": "1.1 Basic Projections",
    "level": "Level 1 (Foundations)",
    "title": "Extract Music Track Titles",
    "table": "MusicTracks",
    "scenario": "A music streaming app needs to fetch just the track titles for an index screen.",
    "businessObjective": "Select the track_title column from MusicTracks.",
    "schemaSnippet": "MusicTracks(track_id INT, track_title VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT column_name\nFROM table_name;",
    "syntaxRule": "Ensure exact column spelling matches the database schema definition.",
    "syntaxTrap": "Misspelling 'track_title' as 'track_name' or 'song'.",
    "eli5Story": "Displaying the song titles on your phone's lock screen.",
    "commonMistakes": "Guessing column names instead of referencing the schema.",
    "learningOutcomes": "Learned schema column alignment.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 6,
    "subcluster": "1.1 Basic Projections",
    "level": "Level 1 (Foundations)",
    "title": "View All Grocery Inventory Items",
    "table": "GroceryItems",
    "scenario": "The supermarket stock manager performs an initial scan of the entire product table.",
    "businessObjective": "Retrieve all columns from GroceryItems.",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, is_organic BOOLEAN, calories INT, stock_units INT)",
    "targetQuery": "SELECT *\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT *\nFROM table_name;",
    "syntaxRule": "Asterisk selects columns in their physical storage order.",
    "syntaxTrap": "Writing 'SELECT GroceryItems.*' when only one table is involved (redundant prefix).",
    "eli5Story": "Opening the full stock inventory sheet on the store scanner.",
    "commonMistakes": "Overcomplicating the query with table qualifiers when scanning a single table.",
    "learningOutcomes": "Mastered full table scan syntax.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 7,
    "subcluster": "1.1 Basic Projections",
    "level": "Level 1 (Foundations)",
    "title": "Extract Employee Email Handles (Last Names)",
    "table": "Employees",
    "scenario": "The IT department needs all employee last names to verify domain directory entries.",
    "businessObjective": "Select last_name from Employees.",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, bonus DECIMAL, hire_date DATE)",
    "targetQuery": "SELECT last_name\nFROM Employees;",
    "syntaxBlueprint": "SELECT column_name\nFROM table_name;",
    "syntaxRule": "Specifying only the needed column saves network bandwidth and buffer cache.",
    "syntaxTrap": "Using 'SELECT last_name;' without a FROM clause.",
    "eli5Story": "Printing a list of family names for mailbox labels in the office lobby.",
    "commonMistakes": "Forgetting the FROM clause.",
    "learningOutcomes": "Reinforced mandatory FROM clause syntax.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "last_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 8,
    "subcluster": "1.1 Basic Projections",
    "level": "Level 1 (Foundations)",
    "title": "List Registered Pet Names",
    "table": "PetClinic",
    "scenario": "The receptionist at the veterinary clinic needs a list of all patient pet names.",
    "businessObjective": "Select pet_name from PetClinic.",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN, owner_city VARCHAR)",
    "targetQuery": "SELECT pet_name\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT column_name\nFROM table_name;",
    "syntaxRule": "Target table follows immediately after the FROM keyword.",
    "syntaxTrap": "Writing 'FROM PetClinic SELECT pet_name' (lexical syntax requires SELECT first).",
    "eli5Story": "Checking the appointment book to see which dogs, cats, and birds are visiting today.",
    "commonMistakes": "Inverting SELECT and FROM order.",
    "learningOutcomes": "Solidified lexical statement ordering.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 9,
    "subcluster": "1.1 Basic Projections",
    "level": "Level 1 (Foundations)",
    "title": "Fetch Movie Titles for Marquee",
    "table": "MovieReviews",
    "scenario": "The cinema manager updates the outdoor marquee sign with all film titles.",
    "businessObjective": "Select movie_title from MovieReviews.",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, genre VARCHAR, star_rating DECIMAL, release_year INT, review_length_words INT)",
    "targetQuery": "SELECT movie_title\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT column_name\nFROM table_name;",
    "syntaxRule": "Keywords are traditionally uppercase and column names lowercase for readability.",
    "syntaxTrap": "Writing 'SELECT movie title' without the underscore (space causes syntax parse failure).",
    "eli5Story": "Putting letter tiles on the big illuminated movie theater sign outside.",
    "commonMistakes": "Omitting the underscore in multi-word column names.",
    "learningOutcomes": "Learned identifier formatting without spaces.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 10,
    "subcluster": "1.1 Basic Projections",
    "level": "Level 1 (Foundations)",
    "title": "Check Flight Number Schedule",
    "table": "FlightSchedule",
    "scenario": "The departure board updates the list of all operating flight numbers.",
    "businessObjective": "Select flight_id from FlightSchedule.",
    "schemaSnippet": "FlightSchedule(flight_id VARCHAR, airline VARCHAR, origin_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL, is_international BOOLEAN)",
    "targetQuery": "SELECT flight_id\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT column_name\nFROM table_name;",
    "syntaxRule": "Identifiers can contain numbers and underscores but cannot start with a number.",
    "syntaxTrap": "Writing 'SELECT flight-id' with a hyphen (hyphen means subtraction!).",
    "eli5Story": "Looking at the big yellow departure board at the airport terminal.",
    "commonMistakes": "Using a hyphen instead of an underscore.",
    "learningOutcomes": "Understood SQL identifier syntax rules.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 11,
    "subcluster": "1.2 Multi-Column & Commas",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #011: Select the first name, last name, and GPA for all students",
    "table": "Students",
    "scenario": "Select the first name, last name, and GPA for all students.",
    "businessObjective": "Select the first name, last name, and GPA for all students.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT undefined\nFROM Students;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM Students;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Students: Select the first name, last name, and GPA for all students.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.2 Multi-Column & Commas on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "undefined"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 12,
    "subcluster": "1.2 Multi-Column & Commas",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #012: Display book title, author, and price for a book fair catalog",
    "table": "Books",
    "scenario": "Display book title, author, and price for a book fair catalog.",
    "businessObjective": "Display book title, author, and price for a book fair catalog.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT undefined\nFROM Books;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM Books;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Books: Display book title, author, and price for a book fair catalog.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.2 Multi-Column & Commas on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "undefined"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 13,
    "subcluster": "1.2 Multi-Column & Commas",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #013: Extract first name, department, and salary for the monthly compensation review",
    "table": "Employees",
    "scenario": "Extract first name, department, and salary for the monthly compensation review.",
    "businessObjective": "Extract first name, department, and salary for the monthly compensation review.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT undefined\nFROM Employees;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Extract first name, department, and salary for the monthly compensation review.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.2 Multi-Column & Commas on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "undefined"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 14,
    "subcluster": "1.2 Multi-Column & Commas",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #014: List grocery item name, its category, and unit price for shelf price tags",
    "table": "GroceryItems",
    "scenario": "List grocery item name, its category, and unit price for shelf price tags.",
    "businessObjective": "List grocery item name, its category, and unit price for shelf price tags.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT undefined\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM GroceryItems;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GroceryItems: List grocery item name, its category, and unit price for shelf price tags.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.2 Multi-Column & Commas on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "undefined"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 15,
    "subcluster": "1.2 Multi-Column & Commas",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #015: View customer name, purchased product, and ordered quantity on packing slips",
    "table": "Orders",
    "scenario": "View customer name, purchased product, and ordered quantity on packing slips.",
    "businessObjective": "View customer name, purchased product, and ordered quantity on packing slips.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT undefined\nFROM Orders;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM Orders;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Orders: View customer name, purchased product, and ordered quantity on packing slips.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.2 Multi-Column & Commas on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "undefined"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 16,
    "subcluster": "1.2 Multi-Column & Commas",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #016: Show track title, artist name, and duration in seconds for the media player",
    "table": "MusicTracks",
    "scenario": "Show track title, artist name, and duration in seconds for the media player.",
    "businessObjective": "Show track title, artist name, and duration in seconds for the media player.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT undefined\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM MusicTracks;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MusicTracks: Show track title, artist name, and duration in seconds for the media player.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.2 Multi-Column & Commas on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "undefined"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 17,
    "subcluster": "1.2 Multi-Column & Commas",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #017: Fetch gym member name, plan type, and monthly fee for billing",
    "table": "GymMembers",
    "scenario": "Fetch gym member name, plan type, and monthly fee for billing.",
    "businessObjective": "Fetch gym member name, plan type, and monthly fee for billing.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT undefined\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM GymMembers;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GymMembers: Fetch gym member name, plan type, and monthly fee for billing.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.2 Multi-Column & Commas on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "undefined"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 18,
    "subcluster": "1.2 Multi-Column & Commas",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #018: Output movie title, director, and star rating for a film review website",
    "table": "MovieReviews",
    "scenario": "Output movie title, director, and star rating for a film review website.",
    "businessObjective": "Output movie title, director, and star rating for a film review website.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT undefined\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM MovieReviews;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MovieReviews: Output movie title, director, and star rating for a film review website.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.2 Multi-Column & Commas on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "undefined"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 19,
    "subcluster": "1.2 Multi-Column & Commas",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #019: Display flight ID, airline, origin airport, and destination airport for the flight gate monitor",
    "table": "FlightSchedule",
    "scenario": "Display flight ID, airline, origin airport, and destination airport for the flight gate monitor.",
    "businessObjective": "Display flight ID, airline, origin airport, and destination airport for the flight gate monitor.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT undefined\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM FlightSchedule;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on FlightSchedule: Display flight ID, airline, origin airport, and destination airport for the flight gate monitor.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.2 Multi-Column & Commas on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "undefined"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 20,
    "subcluster": "1.2 Multi-Column & Commas",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #020: Retrieve pet name, species, age in years, and weight in kg for veterinary patient intake",
    "table": "PetClinic",
    "scenario": "Retrieve pet name, species, age in years, and weight in kg for veterinary patient intake.",
    "businessObjective": "Retrieve pet name, species, age in years, and weight in kg for veterinary patient intake.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT undefined\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM PetClinic;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on PetClinic: Retrieve pet name, species, age in years, and weight in kg for veterinary patient intake.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.2 Multi-Column & Commas on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "undefined"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 21,
    "subcluster": "1.3 Column Aliases (AS)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #021: Rename full_name to student_name and gpa to academic_gpa",
    "table": "Students",
    "scenario": "Rename full_name to student_name and gpa to academic_gpa.",
    "businessObjective": "Rename full_name to student_name and gpa to academic_gpa.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name AS student_name, gpa AS academic_gpa\nFROM Students;",
    "syntaxBlueprint": "SELECT full_name AS student_name, gpa AS academic_gpa\nFROM Students;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Students: Rename full_name to student_name and gpa to academic_gpa.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.3 Column Aliases (AS) on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "student_name,"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "academic_gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 22,
    "subcluster": "1.3 Column Aliases (AS)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #022: Rename title to book_title and price to retail_price_usd",
    "table": "Books",
    "scenario": "Rename title to book_title and price to retail_price_usd.",
    "businessObjective": "Rename title to book_title and price to retail_price_usd.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title AS book_title, price AS retail_price_usd\nFROM Books;",
    "syntaxBlueprint": "SELECT title AS book_title, price AS retail_price_usd\nFROM Books;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Books: Rename title to book_title and price to retail_price_usd.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.3 Column Aliases (AS) on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "book_title,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "retail_price_usd"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 23,
    "subcluster": "1.3 Column Aliases (AS)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #023: Alias first_name as employee and salary as base_compensation",
    "table": "Employees",
    "scenario": "Alias first_name as employee and salary as base_compensation.",
    "businessObjective": "Alias first_name as employee and salary as base_compensation.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name AS employee, salary AS base_compensation\nFROM Employees;",
    "syntaxBlueprint": "SELECT first_name AS employee, salary AS base_compensation\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Alias first_name as employee and salary as base_compensation.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.3 Column Aliases (AS) on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "employee,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "base_compensation"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 24,
    "subcluster": "1.3 Column Aliases (AS)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #024: Alias item_name to product and unit_price to cost_per_unit",
    "table": "GroceryItems",
    "scenario": "Alias item_name to product and unit_price to cost_per_unit.",
    "businessObjective": "Alias item_name to product and unit_price to cost_per_unit.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name AS product, unit_price AS cost_per_unit\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT item_name AS product, unit_price AS cost_per_unit\nFROM GroceryItems;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GroceryItems: Alias item_name to product and unit_price to cost_per_unit.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.3 Column Aliases (AS) on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "product,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "cost_per_unit"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 25,
    "subcluster": "1.3 Column Aliases (AS)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #025: Rename customer_name to buyer and quantity to units_ordered",
    "table": "Orders",
    "scenario": "Rename customer_name to buyer and quantity to units_ordered.",
    "businessObjective": "Rename customer_name to buyer and quantity to units_ordered.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT customer_name AS buyer, quantity AS units_ordered\nFROM Orders;",
    "syntaxBlueprint": "SELECT customer_name AS buyer, quantity AS units_ordered\nFROM Orders;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Orders: Rename customer_name to buyer and quantity to units_ordered.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.3 Column Aliases (AS) on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "customer_name"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "buyer,"
      },
      {
        "type": "column",
        "value": "quantity"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "units_ordered"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 26,
    "subcluster": "1.3 Column Aliases (AS)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #026: Alias track_title as song and artist_name as musician",
    "table": "MusicTracks",
    "scenario": "Alias track_title as song and artist_name as musician.",
    "businessObjective": "Alias track_title as song and artist_name as musician.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title AS song, artist_name AS musician\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT track_title AS song, artist_name AS musician\nFROM MusicTracks;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MusicTracks: Alias track_title as song and artist_name as musician.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.3 Column Aliases (AS) on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "song,"
      },
      {
        "type": "column",
        "value": "artist_name"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "musician"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 27,
    "subcluster": "1.3 Column Aliases (AS)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #027: Rename member_name to client and monthly_fee to rate",
    "table": "GymMembers",
    "scenario": "Rename member_name to client and monthly_fee to rate.",
    "businessObjective": "Rename member_name to client and monthly_fee to rate.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name AS client, monthly_fee AS rate\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT member_name AS client, monthly_fee AS rate\nFROM GymMembers;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GymMembers: Rename member_name to client and monthly_fee to rate.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.3 Column Aliases (AS) on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "client,"
      },
      {
        "type": "column",
        "value": "monthly_fee"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "rate"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 28,
    "subcluster": "1.3 Column Aliases (AS)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #028: Alias movie_title to film and star_rating to score",
    "table": "MovieReviews",
    "scenario": "Alias movie_title to film and star_rating to score.",
    "businessObjective": "Alias movie_title to film and star_rating to score.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title AS film, star_rating AS score\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT movie_title AS film, star_rating AS score\nFROM MovieReviews;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MovieReviews: Alias movie_title to film and star_rating to score.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.3 Column Aliases (AS) on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "film,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "score"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 29,
    "subcluster": "1.3 Column Aliases (AS)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #029: Rename flight_id to flight_code and ticket_price to fare_usd",
    "table": "FlightSchedule",
    "scenario": "Rename flight_id to flight_code and ticket_price to fare_usd.",
    "businessObjective": "Rename flight_id to flight_code and ticket_price to fare_usd.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id AS flight_code, ticket_price AS fare_usd\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT flight_id AS flight_code, ticket_price AS fare_usd\nFROM FlightSchedule;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on FlightSchedule: Rename flight_id to flight_code and ticket_price to fare_usd.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.3 Column Aliases (AS) on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "flight_code,"
      },
      {
        "type": "column",
        "value": "ticket_price"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "fare_usd"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 30,
    "subcluster": "1.3 Column Aliases (AS)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #030: Alias pet_name to patient_name and age_years to patient_age",
    "table": "PetClinic",
    "scenario": "Alias pet_name to patient_name and age_years to patient_age.",
    "businessObjective": "Alias pet_name to patient_name and age_years to patient_age.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name AS patient_name, age_years AS patient_age\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT pet_name AS patient_name, age_years AS patient_age\nFROM PetClinic;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on PetClinic: Alias pet_name to patient_name and age_years to patient_age.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.3 Column Aliases (AS) on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "patient_name,"
      },
      {
        "type": "column",
        "value": "age_years"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "patient_age"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 31,
    "subcluster": "1.4 Constant Literals",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #031: Select full_name alongside a static text label 'Active' as enrollment_status",
    "table": "Students",
    "scenario": "Select full_name alongside a static text label 'Active' as enrollment_status.",
    "businessObjective": "Select full_name alongside a static text label 'Active' as enrollment_status.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, 'Active' AS enrollment_status\nFROM Students;",
    "syntaxBlueprint": "SELECT full_name, 'Active' AS enrollment_status\nFROM Students;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Students: Select full_name alongside a static text label 'Active' as enrollment_status.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.4 Constant Literals on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "'Active'"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "enrollment_status"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 32,
    "subcluster": "1.4 Constant Literals",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #032: Select book title and a fixed location string 'Central Library' as branch_location",
    "table": "Books",
    "scenario": "Select book title and a fixed location string 'Central Library' as branch_location.",
    "businessObjective": "Select book title and a fixed location string 'Central Library' as branch_location.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, 'Central Library' AS branch_location\nFROM Books;",
    "syntaxBlueprint": "SELECT title, 'Central Library' AS branch_location\nFROM Books;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Books: Select book title and a fixed location string 'Central Library' as branch_location.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.4 Constant Literals on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "'Central"
      },
      {
        "type": "column",
        "value": "Library'"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "branch_location"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 33,
    "subcluster": "1.4 Constant Literals",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #033: Select employee first_name alongside a fixed numerical year 2026 as review_year",
    "table": "Employees",
    "scenario": "Select employee first_name alongside a fixed numerical year 2026 as review_year.",
    "businessObjective": "Select employee first_name alongside a fixed numerical year 2026 as review_year.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, 2026 AS review_year\nFROM Employees;",
    "syntaxBlueprint": "SELECT first_name, 2026 AS review_year\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Select employee first_name alongside a fixed numerical year 2026 as review_year.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.4 Constant Literals on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "2026"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "review_year"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 34,
    "subcluster": "1.4 Constant Literals",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #034: Display item_name with a constant string 'In Stock' as availability",
    "table": "GroceryItems",
    "scenario": "Display item_name with a constant string 'In Stock' as availability.",
    "businessObjective": "Display item_name with a constant string 'In Stock' as availability.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, 'In Stock' AS availability\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT item_name, 'In Stock' AS availability\nFROM GroceryItems;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GroceryItems: Display item_name with a constant string 'In Stock' as availability.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.4 Constant Literals on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "'In"
      },
      {
        "type": "column",
        "value": "Stock'"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "availability"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 35,
    "subcluster": "1.4 Constant Literals",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #035: Select order_id with a boolean literal TRUE as is_verified",
    "table": "Orders",
    "scenario": "Select order_id with a boolean literal TRUE as is_verified.",
    "businessObjective": "Select order_id with a boolean literal TRUE as is_verified.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, TRUE AS is_verified\nFROM Orders;",
    "syntaxBlueprint": "SELECT order_id, TRUE AS is_verified\nFROM Orders;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Orders: Select order_id with a boolean literal TRUE as is_verified.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.4 Constant Literals on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "TRUE"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "is_verified"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 36,
    "subcluster": "1.4 Constant Literals",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #036: Select track_title with constant text 'HQ Audio' as format_type",
    "table": "MusicTracks",
    "scenario": "Select track_title with constant text 'HQ Audio' as format_type.",
    "businessObjective": "Select track_title with constant text 'HQ Audio' as format_type.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, 'HQ Audio' AS format_type\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT track_title, 'HQ Audio' AS format_type\nFROM MusicTracks;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MusicTracks: Select track_title with constant text 'HQ Audio' as format_type.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.4 Constant Literals on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "'HQ"
      },
      {
        "type": "column",
        "value": "Audio'"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "format_type"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 37,
    "subcluster": "1.4 Constant Literals",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #037: Display member_name with a constant integer 30 as grace_period_days",
    "table": "GymMembers",
    "scenario": "Display member_name with a constant integer 30 as grace_period_days.",
    "businessObjective": "Display member_name with a constant integer 30 as grace_period_days.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, 30 AS grace_period_days\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT member_name, 30 AS grace_period_days\nFROM GymMembers;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GymMembers: Display member_name with a constant integer 30 as grace_period_days.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.4 Constant Literals on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "30"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "grace_period_days"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 38,
    "subcluster": "1.4 Constant Literals",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #038: Select movie_title with a decimal constant 5.0 as max_possible_rating",
    "table": "MovieReviews",
    "scenario": "Select movie_title with a decimal constant 5.0 as max_possible_rating.",
    "businessObjective": "Select movie_title with a decimal constant 5.0 as max_possible_rating.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, 5.0 AS max_possible_rating\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT movie_title, 5.0 AS max_possible_rating\nFROM MovieReviews;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MovieReviews: Select movie_title with a decimal constant 5.0 as max_possible_rating.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.4 Constant Literals on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "5.0"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "max_possible_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 39,
    "subcluster": "1.4 Constant Literals",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #039: Select flight_id with a static string 'Terminal 2' as assigned_terminal",
    "table": "FlightSchedule",
    "scenario": "Select flight_id with a static string 'Terminal 2' as assigned_terminal.",
    "businessObjective": "Select flight_id with a static string 'Terminal 2' as assigned_terminal.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, 'Terminal 2' AS assigned_terminal\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT flight_id, 'Terminal 2' AS assigned_terminal\nFROM FlightSchedule;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on FlightSchedule: Select flight_id with a static string 'Terminal 2' as assigned_terminal.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.4 Constant Literals on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "'Terminal"
      },
      {
        "type": "column",
        "value": "2'"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "assigned_terminal"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 40,
    "subcluster": "1.4 Constant Literals",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #040: Display pet_name with fixed text 'Downtown Vet' as clinic_name",
    "table": "PetClinic",
    "scenario": "Display pet_name with fixed text 'Downtown Vet' as clinic_name.",
    "businessObjective": "Display pet_name with fixed text 'Downtown Vet' as clinic_name.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, 'Downtown Vet' AS clinic_name\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT pet_name, 'Downtown Vet' AS clinic_name\nFROM PetClinic;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on PetClinic: Display pet_name with fixed text 'Downtown Vet' as clinic_name.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.4 Constant Literals on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "'Downtown"
      },
      {
        "type": "column",
        "value": "Vet'"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "clinic_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 41,
    "subcluster": "1.5 Arithmetic Operators",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #041: Calculate the total inventory value by multiplying price by stock_qty",
    "table": "Books",
    "scenario": "Calculate the total inventory value by multiplying price by stock_qty.",
    "businessObjective": "Calculate the total inventory value by multiplying price by stock_qty.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price, (price * stock_qty) AS total_inventory_value\nFROM Books;",
    "syntaxBlueprint": "SELECT title, price, (price * stock_qty) AS total_inventory_value\nFROM Books;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Books: Calculate the total inventory value by multiplying price by stock_qty.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.5 Arithmetic Operators on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price,"
      },
      {
        "type": "column",
        "value": "(price"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "stock_qty)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_inventory_value"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 42,
    "subcluster": "1.5 Arithmetic Operators",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #042: Compute order subtotal by multiplying unit_price by quantity",
    "table": "Orders",
    "scenario": "Compute order subtotal by multiplying unit_price by quantity.",
    "businessObjective": "Compute order subtotal by multiplying unit_price by quantity.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, (unit_price * quantity) AS subtotal\nFROM Orders;",
    "syntaxBlueprint": "SELECT order_id, (unit_price * quantity) AS subtotal\nFROM Orders;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Orders: Compute order subtotal by multiplying unit_price by quantity.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.5 Arithmetic Operators on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "(unit_price"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "quantity)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "subtotal"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 43,
    "subcluster": "1.5 Arithmetic Operators",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #043: Calculate a 10% raise amount and the resulting projected salary",
    "table": "Employees",
    "scenario": "Calculate a 10% raise amount and the resulting projected salary.",
    "businessObjective": "Calculate a 10% raise amount and the resulting projected salary.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary, (salary * 0.10) AS raise_amount, (salary * 1.10) AS projected_salary\nFROM Employees;",
    "syntaxBlueprint": "SELECT first_name, salary, (salary * 0.10) AS raise_amount, (salary * 1.10) AS projected_salary\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Calculate a 10% raise amount and the resulting projected salary.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.5 Arithmetic Operators on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "salary,"
      },
      {
        "type": "column",
        "value": "(salary"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "0.10)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "raise_amount,"
      },
      {
        "type": "column",
        "value": "(salary"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "1.10)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "projected_salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 44,
    "subcluster": "1.5 Arithmetic Operators",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #044: Convert a 4.0 GPA to an approximate 100-point scale by multiplying by 25.0",
    "table": "Students",
    "scenario": "Convert a 4.0 GPA to an approximate 100-point scale by multiplying by 25.0.",
    "businessObjective": "Convert a 4.0 GPA to an approximate 100-point scale by multiplying by 25.0.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, gpa, (gpa * 25.0) AS gpa_percentage\nFROM Students;",
    "syntaxBlueprint": "SELECT full_name, gpa, (gpa * 25.0) AS gpa_percentage\nFROM Students;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Students: Convert a 4.0 GPA to an approximate 100-point scale by multiplying by 25.0.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.5 Arithmetic Operators on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "gpa,"
      },
      {
        "type": "column",
        "value": "(gpa"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "25.0)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "gpa_percentage"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 45,
    "subcluster": "1.5 Arithmetic Operators",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #045: Calculate the item price including an 8% sales tax (unit_price * 1.08)",
    "table": "GroceryItems",
    "scenario": "Calculate the item price including an 8% sales tax (unit_price * 1.08).",
    "businessObjective": "Calculate the item price including an 8% sales tax (unit_price * 1.08).",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price, (unit_price * 1.08) AS price_with_tax\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT item_name, unit_price, (unit_price * 1.08) AS price_with_tax\nFROM GroceryItems;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GroceryItems: Calculate the item price including an 8% sales tax (unit_price * 1.08).",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.5 Arithmetic Operators on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price,"
      },
      {
        "type": "column",
        "value": "(unit_price"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "1.08)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "price_with_tax"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 46,
    "subcluster": "1.5 Arithmetic Operators",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #046: Convert duration in seconds into fractional minutes by dividing by 60.0",
    "table": "MusicTracks",
    "scenario": "Convert duration in seconds into fractional minutes by dividing by 60.0.",
    "businessObjective": "Convert duration in seconds into fractional minutes by dividing by 60.0.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, duration_seconds, (duration_seconds / 60.0) AS duration_minutes\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT track_title, duration_seconds, (duration_seconds / 60.0) AS duration_minutes\nFROM MusicTracks;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MusicTracks: Convert duration in seconds into fractional minutes by dividing by 60.0.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.5 Arithmetic Operators on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "duration_seconds,"
      },
      {
        "type": "column",
        "value": "(duration_seconds"
      },
      {
        "type": "column",
        "value": "/"
      },
      {
        "type": "column",
        "value": "60.0)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "duration_minutes"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 47,
    "subcluster": "1.5 Arithmetic Operators",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #047: Compute the total annual membership cost by multiplying monthly_fee by 12",
    "table": "GymMembers",
    "scenario": "Compute the total annual membership cost by multiplying monthly_fee by 12.",
    "businessObjective": "Compute the total annual membership cost by multiplying monthly_fee by 12.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, monthly_fee, (monthly_fee * 12) AS annual_cost\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT member_name, monthly_fee, (monthly_fee * 12) AS annual_cost\nFROM GymMembers;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GymMembers: Compute the total annual membership cost by multiplying monthly_fee by 12.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.5 Arithmetic Operators on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "monthly_fee,"
      },
      {
        "type": "column",
        "value": "(monthly_fee"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "12)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "annual_cost"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 48,
    "subcluster": "1.5 Arithmetic Operators",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #048: Add a $35 standard checked bag fee to ticket_price",
    "table": "FlightSchedule",
    "scenario": "Add a $35 standard checked bag fee to ticket_price.",
    "businessObjective": "Add a $35 standard checked bag fee to ticket_price.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, ticket_price, (ticket_price + 35.00) AS price_with_baggage\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT flight_id, ticket_price, (ticket_price + 35.00) AS price_with_baggage\nFROM FlightSchedule;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on FlightSchedule: Add a $35 standard checked bag fee to ticket_price.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.5 Arithmetic Operators on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "ticket_price,"
      },
      {
        "type": "column",
        "value": "(ticket_price"
      },
      {
        "type": "column",
        "value": "+"
      },
      {
        "type": "column",
        "value": "35.00)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "price_with_baggage"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 49,
    "subcluster": "1.5 Arithmetic Operators",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #049: Convert pet weight from kilograms to pounds by multiplying by 2.20462",
    "table": "PetClinic",
    "scenario": "Convert pet weight from kilograms to pounds by multiplying by 2.20462.",
    "businessObjective": "Convert pet weight from kilograms to pounds by multiplying by 2.20462.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, weight_kg, (weight_kg * 2.20462) AS weight_lbs\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT pet_name, weight_kg, (weight_kg * 2.20462) AS weight_lbs\nFROM PetClinic;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on PetClinic: Convert pet weight from kilograms to pounds by multiplying by 2.20462.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.5 Arithmetic Operators on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "weight_kg,"
      },
      {
        "type": "column",
        "value": "(weight_kg"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "2.20462)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "weight_lbs"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 50,
    "subcluster": "1.5 Arithmetic Operators",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #050: Calculate the final discounted total: subtotal times (1 - discount_pct)",
    "table": "Orders",
    "scenario": "Calculate the final discounted total: subtotal times (1 - discount_pct).",
    "businessObjective": "Calculate the final discounted total: subtotal times (1 - discount_pct).",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, unit_price, quantity, ((unit_price * quantity) * (1 - discount_pct)) AS final_charged_amount\nFROM Orders;",
    "syntaxBlueprint": "SELECT order_id, unit_price, quantity, ((unit_price * quantity) * (1 - discount_pct)) AS final_charged_amount\nFROM Orders;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Orders: Calculate the final discounted total: subtotal times (1 - discount_pct).",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.5 Arithmetic Operators on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "unit_price,"
      },
      {
        "type": "column",
        "value": "quantity,"
      },
      {
        "type": "column",
        "value": "((unit_price"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "quantity)"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "(1"
      },
      {
        "type": "column",
        "value": "-"
      },
      {
        "type": "column",
        "value": "discount_pct))"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "final_charged_amount"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 51,
    "subcluster": "1.6 Math & Rounding Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #051: Round calculated price with 8.25% sales tax to 2 decimal places using ROUND()",
    "table": "GroceryItems",
    "scenario": "Round calculated price with 8.25% sales tax to 2 decimal places using ROUND().",
    "businessObjective": "Round calculated price with 8.25% sales tax to 2 decimal places using ROUND().",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, ROUND(unit_price * 1.0825, 2) AS rounded_tax_price\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT item_name, ROUND(unit_price * 1.0825, 2) AS rounded_tax_price\nFROM GroceryItems;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GroceryItems: Round calculated price with 8.25% sales tax to 2 decimal places using ROUND().",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.6 Math & Rounding Functions on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "ROUND(unit_price"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "1.0825,"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "rounded_tax_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 52,
    "subcluster": "1.6 Math & Rounding Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #052: Round GPA to 1 decimal place using ROUND(gpa, 1)",
    "table": "Students",
    "scenario": "Round GPA to 1 decimal place using ROUND(gpa, 1).",
    "businessObjective": "Round GPA to 1 decimal place using ROUND(gpa, 1).",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, ROUND(gpa, 1) AS rounded_gpa\nFROM Students;",
    "syntaxBlueprint": "SELECT full_name, ROUND(gpa, 1) AS rounded_gpa\nFROM Students;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Students: Round GPA to 1 decimal place using ROUND(gpa, 1).",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.6 Math & Rounding Functions on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "ROUND(gpa,"
      },
      {
        "type": "column",
        "value": "1)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "rounded_gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 53,
    "subcluster": "1.6 Math & Rounding Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #053: Extract whole minutes of track duration using FLOOR(duration_seconds / 60)",
    "table": "MusicTracks",
    "scenario": "Extract whole minutes of track duration using FLOOR(duration_seconds / 60).",
    "businessObjective": "Extract whole minutes of track duration using FLOOR(duration_seconds / 60).",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, FLOOR(duration_seconds / 60) AS whole_minutes\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT track_title, FLOOR(duration_seconds / 60) AS whole_minutes\nFROM MusicTracks;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MusicTracks: Extract whole minutes of track duration using FLOOR(duration_seconds / 60).",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.6 Math & Rounding Functions on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "FLOOR(duration_seconds"
      },
      {
        "type": "column",
        "value": "/"
      },
      {
        "type": "column",
        "value": "60)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "whole_minutes"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 54,
    "subcluster": "1.6 Math & Rounding Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #054: Round monthly fee up to the nearest whole integer using CEIL()",
    "table": "GymMembers",
    "scenario": "Round monthly fee up to the nearest whole integer using CEIL().",
    "businessObjective": "Round monthly fee up to the nearest whole integer using CEIL().",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, CEIL(monthly_fee) AS rounded_up_fee\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT member_name, CEIL(monthly_fee) AS rounded_up_fee\nFROM GymMembers;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GymMembers: Round monthly fee up to the nearest whole integer using CEIL().",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.6 Math & Rounding Functions on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "CEIL(monthly_fee)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "rounded_up_fee"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 55,
    "subcluster": "1.6 Math & Rounding Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #055: Calculate and round exact discount savings to 2 decimal places",
    "table": "Orders",
    "scenario": "Calculate and round exact discount savings to 2 decimal places.",
    "businessObjective": "Calculate and round exact discount savings to 2 decimal places.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, ROUND((unit_price * quantity) * discount_pct, 2) AS discount_savings\nFROM Orders;",
    "syntaxBlueprint": "SELECT order_id, ROUND((unit_price * quantity) * discount_pct, 2) AS discount_savings\nFROM Orders;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Orders: Calculate and round exact discount savings to 2 decimal places.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.6 Math & Rounding Functions on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "ROUND((unit_price"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "quantity)"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "discount_pct,"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "discount_savings"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 56,
    "subcluster": "1.6 Math & Rounding Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #056: Calculate and round base fare before 15% airport fees",
    "table": "FlightSchedule",
    "scenario": "Calculate and round base fare before 15% airport fees.",
    "businessObjective": "Calculate and round base fare before 15% airport fees.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, ROUND(ticket_price / 1.15, 2) AS base_fare_before_tax\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT flight_id, ROUND(ticket_price / 1.15, 2) AS base_fare_before_tax\nFROM FlightSchedule;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on FlightSchedule: Calculate and round base fare before 15% airport fees.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.6 Math & Rounding Functions on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "ROUND(ticket_price"
      },
      {
        "type": "column",
        "value": "/"
      },
      {
        "type": "column",
        "value": "1.15,"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "base_fare_before_tax"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 57,
    "subcluster": "1.6 Math & Rounding Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #057: Convert weight to pounds and round to 1 decimal place",
    "table": "PetClinic",
    "scenario": "Convert weight to pounds and round to 1 decimal place.",
    "businessObjective": "Convert weight to pounds and round to 1 decimal place.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, ROUND(weight_kg * 2.20462, 1) AS rounded_lbs\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT pet_name, ROUND(weight_kg * 2.20462, 1) AS rounded_lbs\nFROM PetClinic;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on PetClinic: Convert weight to pounds and round to 1 decimal place.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.6 Math & Rounding Functions on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "ROUND(weight_kg"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "2.20462,"
      },
      {
        "type": "column",
        "value": "1)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "rounded_lbs"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 58,
    "subcluster": "1.6 Math & Rounding Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #058: Calculate the absolute deviation from target inventory level (10) using ABS()",
    "table": "Books",
    "scenario": "Calculate the absolute deviation from target inventory level (10) using ABS().",
    "businessObjective": "Calculate the absolute deviation from target inventory level (10) using ABS().",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, ABS(stock_qty - 10) AS distance_from_target_stock\nFROM Books;",
    "syntaxBlueprint": "SELECT title, ABS(stock_qty - 10) AS distance_from_target_stock\nFROM Books;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Books: Calculate the absolute deviation from target inventory level (10) using ABS().",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.6 Math & Rounding Functions on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "ABS(stock_qty"
      },
      {
        "type": "column",
        "value": "-"
      },
      {
        "type": "column",
        "value": "10)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "distance_from_target_stock"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 59,
    "subcluster": "1.6 Math & Rounding Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #059: Calculate biweekly paycheck by dividing annual salary by 26 pay periods and rounding to 2 decimals",
    "table": "Employees",
    "scenario": "Calculate biweekly paycheck by dividing annual salary by 26 pay periods and rounding to 2 decimals.",
    "businessObjective": "Calculate biweekly paycheck by dividing annual salary by 26 pay periods and rounding to 2 decimals.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, ROUND(salary / 26.0, 2) AS biweekly_paycheck\nFROM Employees;",
    "syntaxBlueprint": "SELECT first_name, ROUND(salary / 26.0, 2) AS biweekly_paycheck\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Calculate biweekly paycheck by dividing annual salary by 26 pay periods and rounding to 2 decimals.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.6 Math & Rounding Functions on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "ROUND(salary"
      },
      {
        "type": "column",
        "value": "/"
      },
      {
        "type": "column",
        "value": "26.0,"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "biweekly_paycheck"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 60,
    "subcluster": "1.6 Math & Rounding Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #060: Round star ratings to the nearest whole star using ROUND(star_rating, 0)",
    "table": "MovieReviews",
    "scenario": "Round star ratings to the nearest whole star using ROUND(star_rating, 0).",
    "businessObjective": "Round star ratings to the nearest whole star using ROUND(star_rating, 0).",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, ROUND(star_rating, 0) AS rounded_star_rating\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT movie_title, ROUND(star_rating, 0) AS rounded_star_rating\nFROM MovieReviews;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MovieReviews: Round star ratings to the nearest whole star using ROUND(star_rating, 0).",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.6 Math & Rounding Functions on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "ROUND(star_rating,"
      },
      {
        "type": "column",
        "value": "0)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "rounded_star_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 61,
    "subcluster": "1.7 String Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #061: Glue first_name and last_name together with a space using CONCAT()",
    "table": "Students",
    "scenario": "Glue first_name and last_name together with a space using CONCAT().",
    "businessObjective": "Glue first_name and last_name together with a space using CONCAT().",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT CONCAT(first_name, ' ', last_name) AS full_student_name\nFROM Students;",
    "syntaxBlueprint": "SELECT CONCAT(first_name, ' ', last_name) AS full_student_name\nFROM Students;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Students: Glue first_name and last_name together with a space using CONCAT().",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.7 String Functions on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "CONCAT(first_name,"
      },
      {
        "type": "column",
        "value": "'"
      },
      {
        "type": "column",
        "value": "',"
      },
      {
        "type": "column",
        "value": "last_name)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "full_student_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 62,
    "subcluster": "1.7 String Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #062: Transform title to uppercase and genre to lowercase",
    "table": "Books",
    "scenario": "Transform title to uppercase and genre to lowercase.",
    "businessObjective": "Transform title to uppercase and genre to lowercase.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT UPPER(title) AS uppercase_title, LOWER(genre) AS lowercase_genre\nFROM Books;",
    "syntaxBlueprint": "SELECT UPPER(title) AS uppercase_title, LOWER(genre) AS lowercase_genre\nFROM Books;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Books: Transform title to uppercase and genre to lowercase.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.7 String Functions on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "UPPER(title)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "uppercase_title,"
      },
      {
        "type": "column",
        "value": "LOWER(genre)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "lowercase_genre"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 63,
    "subcluster": "1.7 String Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #063: Format employee name as 'LastName, FirstName' using CONCAT()",
    "table": "Employees",
    "scenario": "Format employee name as 'LastName, FirstName' using CONCAT().",
    "businessObjective": "Format employee name as 'LastName, FirstName' using CONCAT().",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT CONCAT(last_name, ', ', first_name) AS formal_directory_name\nFROM Employees;",
    "syntaxBlueprint": "SELECT CONCAT(last_name, ', ', first_name) AS formal_directory_name\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Format employee name as 'LastName, FirstName' using CONCAT().",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.7 String Functions on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "CONCAT(last_name,"
      },
      {
        "type": "column",
        "value": "',"
      },
      {
        "type": "column",
        "value": "',"
      },
      {
        "type": "column",
        "value": "first_name)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "formal_directory_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 64,
    "subcluster": "1.7 String Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #064: Count the number of characters in track_title using LENGTH()",
    "table": "MusicTracks",
    "scenario": "Count the number of characters in track_title using LENGTH().",
    "businessObjective": "Count the number of characters in track_title using LENGTH().",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, LENGTH(track_title) AS title_char_count\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT track_title, LENGTH(track_title) AS title_char_count\nFROM MusicTracks;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MusicTracks: Count the number of characters in track_title using LENGTH().",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.7 String Functions on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "LENGTH(track_title)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "title_char_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 65,
    "subcluster": "1.7 String Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #065: Convert item_name to all capital letters for shelf printing",
    "table": "GroceryItems",
    "scenario": "Convert item_name to all capital letters for shelf printing.",
    "businessObjective": "Convert item_name to all capital letters for shelf printing.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT UPPER(item_name) AS label_name\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT UPPER(item_name) AS label_name\nFROM GroceryItems;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GroceryItems: Convert item_name to all capital letters for shelf printing.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.7 String Functions on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "UPPER(item_name)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "label_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 66,
    "subcluster": "1.7 String Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #066: Combine origin and destination into a route string like 'ORD -> LAX'",
    "table": "FlightSchedule",
    "scenario": "Combine origin and destination into a route string like 'ORD -> LAX'.",
    "businessObjective": "Combine origin and destination into a route string like 'ORD -> LAX'.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, CONCAT(origin_airport, ' -> ', dest_airport) AS route\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT flight_id, CONCAT(origin_airport, ' -> ', dest_airport) AS route\nFROM FlightSchedule;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on FlightSchedule: Combine origin and destination into a route string like 'ORD -> LAX'.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.7 String Functions on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "CONCAT(origin_airport,"
      },
      {
        "type": "column",
        "value": "'"
      },
      {
        "type": "column",
        "value": "->"
      },
      {
        "type": "column",
        "value": "',"
      },
      {
        "type": "column",
        "value": "dest_airport)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "route"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 67,
    "subcluster": "1.7 String Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #067: Extract the first 3 letters of species using LEFT(species, 3)",
    "table": "PetClinic",
    "scenario": "Extract the first 3 letters of species using LEFT(species, 3).",
    "businessObjective": "Extract the first 3 letters of species using LEFT(species, 3).",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, LEFT(species, 3) AS species_short_code\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT pet_name, LEFT(species, 3) AS species_short_code\nFROM PetClinic;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on PetClinic: Extract the first 3 letters of species using LEFT(species, 3).",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.7 String Functions on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "LEFT(species,"
      },
      {
        "type": "column",
        "value": "3)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "species_short_code"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 68,
    "subcluster": "1.7 String Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #068: Extract the last 4 characters of movie_title using RIGHT()",
    "table": "MovieReviews",
    "scenario": "Extract the last 4 characters of movie_title using RIGHT().",
    "businessObjective": "Extract the last 4 characters of movie_title using RIGHT().",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, RIGHT(movie_title, 4) AS title_suffix\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT movie_title, RIGHT(movie_title, 4) AS title_suffix\nFROM MovieReviews;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MovieReviews: Extract the last 4 characters of movie_title using RIGHT().",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.7 String Functions on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "RIGHT(movie_title,"
      },
      {
        "type": "column",
        "value": "4)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "title_suffix"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 69,
    "subcluster": "1.7 String Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #069: Convert membership plan to uppercase for keycard printing",
    "table": "GymMembers",
    "scenario": "Convert membership plan to uppercase for keycard printing.",
    "businessObjective": "Convert membership plan to uppercase for keycard printing.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT UPPER(membership_plan) AS plan_badge\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT UPPER(membership_plan) AS plan_badge\nFROM GymMembers;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GymMembers: Convert membership plan to uppercase for keycard printing.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.7 String Functions on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "UPPER(membership_plan)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "plan_badge"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 70,
    "subcluster": "1.7 String Functions",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #070: Format an order label like 'Zoe Hart (Order #5001)' using CONCAT()",
    "table": "Orders",
    "scenario": "Format an order label like 'Zoe Hart (Order #5001)' using CONCAT().",
    "businessObjective": "Format an order label like 'Zoe Hart (Order #5001)' using CONCAT().",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT CONCAT(customer_name, ' (Order #', order_id, ')') AS order_summary\nFROM Orders;",
    "syntaxBlueprint": "SELECT CONCAT(customer_name, ' (Order #', order_id, ')') AS order_summary\nFROM Orders;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Orders: Format an order label like 'Zoe Hart (Order #5001)' using CONCAT().",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.7 String Functions on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "CONCAT(customer_name,"
      },
      {
        "type": "column",
        "value": "'"
      },
      {
        "type": "column",
        "value": "(Order"
      },
      {
        "type": "column",
        "value": "#',"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "')')"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "order_summary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 71,
    "subcluster": "1.8 Date Projections",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #071: Extract the four-digit year from hire_date using YEAR()",
    "table": "Employees",
    "scenario": "Extract the four-digit year from hire_date using YEAR().",
    "businessObjective": "Extract the four-digit year from hire_date using YEAR().",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, hire_date, YEAR(hire_date) AS hire_year\nFROM Employees;",
    "syntaxBlueprint": "SELECT first_name, hire_date, YEAR(hire_date) AS hire_year\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Extract the four-digit year from hire_date using YEAR().",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.8 Date Projections on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "hire_date,"
      },
      {
        "type": "column",
        "value": "YEAR(hire_date)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "hire_year"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 72,
    "subcluster": "1.8 Date Projections",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #072: Extract the numerical month from hire_date using MONTH()",
    "table": "Employees",
    "scenario": "Extract the numerical month from hire_date using MONTH().",
    "businessObjective": "Extract the numerical month from hire_date using MONTH().",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, hire_date, MONTH(hire_date) AS hire_month\nFROM Employees;",
    "syntaxBlueprint": "SELECT first_name, hire_date, MONTH(hire_date) AS hire_month\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Extract the numerical month from hire_date using MONTH().",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.8 Date Projections on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "hire_date,"
      },
      {
        "type": "column",
        "value": "MONTH(hire_date)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "hire_month"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 73,
    "subcluster": "1.8 Date Projections",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #073: Calculate how many years a student has been in school relative to 2026",
    "table": "Students",
    "scenario": "Calculate how many years a student has been in school relative to 2026.",
    "businessObjective": "Calculate how many years a student has been in school relative to 2026.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, enrolled_year, (2026 - enrolled_year) AS years_in_school\nFROM Students;",
    "syntaxBlueprint": "SELECT full_name, enrolled_year, (2026 - enrolled_year) AS years_in_school\nFROM Students;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Students: Calculate how many years a student has been in school relative to 2026.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.8 Date Projections on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "enrolled_year,"
      },
      {
        "type": "column",
        "value": "(2026"
      },
      {
        "type": "column",
        "value": "-"
      },
      {
        "type": "column",
        "value": "enrolled_year)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "years_in_school"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 74,
    "subcluster": "1.8 Date Projections",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #074: Extract the membership start year from join_date",
    "table": "GymMembers",
    "scenario": "Extract the membership start year from join_date.",
    "businessObjective": "Extract the membership start year from join_date.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, join_date, YEAR(join_date) AS joined_year\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT member_name, join_date, YEAR(join_date) AS joined_year\nFROM GymMembers;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GymMembers: Extract the membership start year from join_date.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.8 Date Projections on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "join_date,"
      },
      {
        "type": "column",
        "value": "YEAR(join_date)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "joined_year"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 75,
    "subcluster": "1.8 Date Projections",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #075: Calculate the age of a book in years relative to 2026",
    "table": "Books",
    "scenario": "Calculate the age of a book in years relative to 2026.",
    "businessObjective": "Calculate the age of a book in years relative to 2026.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, published_year, (2026 - published_year) AS book_age_years\nFROM Books;",
    "syntaxBlueprint": "SELECT title, published_year, (2026 - published_year) AS book_age_years\nFROM Books;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Books: Calculate the age of a book in years relative to 2026.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.8 Date Projections on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "published_year,"
      },
      {
        "type": "column",
        "value": "(2026"
      },
      {
        "type": "column",
        "value": "-"
      },
      {
        "type": "column",
        "value": "published_year)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "book_age_years"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 76,
    "subcluster": "1.8 Date Projections",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #076: Compute how many years ago a movie was released",
    "table": "MovieReviews",
    "scenario": "Compute how many years ago a movie was released.",
    "businessObjective": "Compute how many years ago a movie was released.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, release_year, (2026 - release_year) AS film_age\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT movie_title, release_year, (2026 - release_year) AS film_age\nFROM MovieReviews;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MovieReviews: Compute how many years ago a movie was released.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.8 Date Projections on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "release_year,"
      },
      {
        "type": "column",
        "value": "(2026"
      },
      {
        "type": "column",
        "value": "-"
      },
      {
        "type": "column",
        "value": "release_year)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "film_age"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 77,
    "subcluster": "1.8 Date Projections",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #077: Project the system's current calendar date using CURRENT_DATE",
    "table": "Employees",
    "scenario": "Project the system's current calendar date using CURRENT_DATE.",
    "businessObjective": "Project the system's current calendar date using CURRENT_DATE.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, CURRENT_DATE AS report_generated_on\nFROM Employees;",
    "syntaxBlueprint": "SELECT first_name, CURRENT_DATE AS report_generated_on\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Project the system's current calendar date using CURRENT_DATE.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.8 Date Projections on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "CURRENT_DATE"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "report_generated_on"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 78,
    "subcluster": "1.8 Date Projections",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #078: Extract the membership anniversary month from join_date",
    "table": "GymMembers",
    "scenario": "Extract the membership anniversary month from join_date.",
    "businessObjective": "Extract the membership anniversary month from join_date.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, join_date, MONTH(join_date) AS anniversary_month\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT member_name, join_date, MONTH(join_date) AS anniversary_month\nFROM GymMembers;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GymMembers: Extract the membership anniversary month from join_date.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.8 Date Projections on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "join_date,"
      },
      {
        "type": "column",
        "value": "MONTH(join_date)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "anniversary_month"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 79,
    "subcluster": "1.8 Date Projections",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #079: Extract the specific day of the month (1-31) when the employee was hired",
    "table": "Employees",
    "scenario": "Extract the specific day of the month (1-31) when the employee was hired.",
    "businessObjective": "Extract the specific day of the month (1-31) when the employee was hired.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, hire_date, DAY(hire_date) AS hire_day_of_month\nFROM Employees;",
    "syntaxBlueprint": "SELECT first_name, hire_date, DAY(hire_date) AS hire_day_of_month\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Extract the specific day of the month (1-31) when the employee was hired.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.8 Date Projections on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "hire_date,"
      },
      {
        "type": "column",
        "value": "DAY(hire_date)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "hire_day_of_month"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 80,
    "subcluster": "1.8 Date Projections",
    "level": "Level 2 (Calculations)",
    "title": "Syntax #080: Project expected graduation year by adding 4 to enrolled_year",
    "table": "Students",
    "scenario": "Project expected graduation year by adding 4 to enrolled_year.",
    "businessObjective": "Project expected graduation year by adding 4 to enrolled_year.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, enrolled_year, CONCAT('Class of ', (enrolled_year + 4)) AS expected_graduation\nFROM Students;",
    "syntaxBlueprint": "SELECT full_name, enrolled_year, CONCAT('Class of ', (enrolled_year + 4)) AS expected_graduation\nFROM Students;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Students: Project expected graduation year by adding 4 to enrolled_year.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.8 Date Projections on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "enrolled_year,"
      },
      {
        "type": "column",
        "value": "CONCAT('Class"
      },
      {
        "type": "column",
        "value": "of"
      },
      {
        "type": "column",
        "value": "',"
      },
      {
        "type": "column",
        "value": "(enrolled_year"
      },
      {
        "type": "column",
        "value": "+"
      },
      {
        "type": "column",
        "value": "4))"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "expected_graduation"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 81,
    "subcluster": "1.9 DISTINCT Deduplication",
    "level": "Level 2 (Deduplication)",
    "title": "Syntax #081: Find all unique home cities where enrolled students live without duplicates",
    "table": "Students",
    "scenario": "Find all unique home cities where enrolled students live without duplicates.",
    "businessObjective": "Find all unique home cities where enrolled students live without duplicates.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT DISTINCT city\nFROM Students;",
    "syntaxBlueprint": "SELECT DISTINCT city\nFROM Students;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Students: Find all unique home cities where enrolled students live without duplicates.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.9 DISTINCT Deduplication on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "keyword",
        "value": "DISTINCT"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 82,
    "subcluster": "1.9 DISTINCT Deduplication",
    "level": "Level 2 (Deduplication)",
    "title": "Syntax #082: List all distinct literary genres available in the bookstore catalog",
    "table": "Books",
    "scenario": "List all distinct literary genres available in the bookstore catalog.",
    "businessObjective": "List all distinct literary genres available in the bookstore catalog.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT DISTINCT genre\nFROM Books;",
    "syntaxBlueprint": "SELECT DISTINCT genre\nFROM Books;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Books: List all distinct literary genres available in the bookstore catalog.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.9 DISTINCT Deduplication on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "keyword",
        "value": "DISTINCT"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 83,
    "subcluster": "1.9 DISTINCT Deduplication",
    "level": "Level 2 (Deduplication)",
    "title": "Syntax #083: Retrieve the list of distinct company departments without duplicate rows",
    "table": "Employees",
    "scenario": "Retrieve the list of distinct company departments without duplicate rows.",
    "businessObjective": "Retrieve the list of distinct company departments without duplicate rows.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT DISTINCT department\nFROM Employees;",
    "syntaxBlueprint": "SELECT DISTINCT department\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Retrieve the list of distinct company departments without duplicate rows.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.9 DISTINCT Deduplication on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "keyword",
        "value": "DISTINCT"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 84,
    "subcluster": "1.9 DISTINCT Deduplication",
    "level": "Level 2 (Deduplication)",
    "title": "Syntax #084: Display all unique grocery product categories",
    "table": "GroceryItems",
    "scenario": "Display all unique grocery product categories.",
    "businessObjective": "Display all unique grocery product categories.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT DISTINCT category\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT DISTINCT category\nFROM GroceryItems;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GroceryItems: Display all unique grocery product categories.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.9 DISTINCT Deduplication on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "keyword",
        "value": "DISTINCT"
      },
      {
        "type": "column",
        "value": "category"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 85,
    "subcluster": "1.9 DISTINCT Deduplication",
    "level": "Level 2 (Deduplication)",
    "title": "Syntax #085: List all unique musical genres featured in the streaming library",
    "table": "MusicTracks",
    "scenario": "List all unique musical genres featured in the streaming library.",
    "businessObjective": "List all unique musical genres featured in the streaming library.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT DISTINCT genre\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT DISTINCT genre\nFROM MusicTracks;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MusicTracks: List all unique musical genres featured in the streaming library.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.9 DISTINCT Deduplication on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "keyword",
        "value": "DISTINCT"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 86,
    "subcluster": "1.9 DISTINCT Deduplication",
    "level": "Level 2 (Deduplication)",
    "title": "Syntax #086: Extract all distinct membership plan tiers",
    "table": "GymMembers",
    "scenario": "Extract all distinct membership plan tiers.",
    "businessObjective": "Extract all distinct membership plan tiers.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT DISTINCT membership_plan\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT DISTINCT membership_plan\nFROM GymMembers;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GymMembers: Extract all distinct membership plan tiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.9 DISTINCT Deduplication on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "keyword",
        "value": "DISTINCT"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 87,
    "subcluster": "1.9 DISTINCT Deduplication",
    "level": "Level 2 (Deduplication)",
    "title": "Syntax #087: Find all unique movie directors who have reviews recorded",
    "table": "MovieReviews",
    "scenario": "Find all unique movie directors who have reviews recorded.",
    "businessObjective": "Find all unique movie directors who have reviews recorded.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT DISTINCT director\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT DISTINCT director\nFROM MovieReviews;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MovieReviews: Find all unique movie directors who have reviews recorded.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.9 DISTINCT Deduplication on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "keyword",
        "value": "DISTINCT"
      },
      {
        "type": "column",
        "value": "director"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 88,
    "subcluster": "1.9 DISTINCT Deduplication",
    "level": "Level 2 (Deduplication)",
    "title": "Syntax #088: List all unique origin departure airports",
    "table": "FlightSchedule",
    "scenario": "List all unique origin departure airports.",
    "businessObjective": "List all unique origin departure airports.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT DISTINCT origin_airport\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT DISTINCT origin_airport\nFROM FlightSchedule;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on FlightSchedule: List all unique origin departure airports.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.9 DISTINCT Deduplication on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "keyword",
        "value": "DISTINCT"
      },
      {
        "type": "column",
        "value": "origin_airport"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 89,
    "subcluster": "1.9 DISTINCT Deduplication",
    "level": "Level 2 (Deduplication)",
    "title": "Syntax #089: Find all distinct animal species treated at the clinic",
    "table": "PetClinic",
    "scenario": "Find all distinct animal species treated at the clinic.",
    "businessObjective": "Find all distinct animal species treated at the clinic.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT DISTINCT species\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT DISTINCT species\nFROM PetClinic;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on PetClinic: Find all distinct animal species treated at the clinic.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.9 DISTINCT Deduplication on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "keyword",
        "value": "DISTINCT"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 90,
    "subcluster": "1.9 DISTINCT Deduplication",
    "level": "Level 2 (Deduplication)",
    "title": "Syntax #090: Find distinct combinations of customer name and shipping city (multi-column DISTINCT)",
    "table": "Orders",
    "scenario": "Find distinct combinations of customer name and shipping city (multi-column DISTINCT).",
    "businessObjective": "Find distinct combinations of customer name and shipping city (multi-column DISTINCT).",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT DISTINCT customer_name, shipping_city\nFROM Orders;",
    "syntaxBlueprint": "SELECT DISTINCT customer_name, shipping_city\nFROM Orders;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Orders: Find distinct combinations of customer name and shipping city (multi-column DISTINCT).",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.9 DISTINCT Deduplication on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "keyword",
        "value": "DISTINCT"
      },
      {
        "type": "column",
        "value": "customer_name,"
      },
      {
        "type": "column",
        "value": "shipping_city"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 91,
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #091: Fix the trailing comma bug: 'SELECT full_name, city, FROM Students;'",
    "table": "Students",
    "scenario": "Fix the trailing comma bug: 'SELECT full_name, city, FROM Students;'",
    "businessObjective": "Fix the trailing comma bug: 'SELECT full_name, city, FROM Students;'",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, city\nFROM Students;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM Students;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Students: Fix the trailing comma bug: 'SELECT full_name, city, FROM Students;'",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.10 Bug Hunts & Edge Cases on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 92,
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #092: Fix the unquoted column alias containing spaces: 'SELECT title, price AS Retail Price FROM Books;'",
    "table": "Books",
    "scenario": "Fix the unquoted column alias containing spaces: 'SELECT title, price AS Retail Price FROM Books;'",
    "businessObjective": "Fix the unquoted column alias containing spaces: 'SELECT title, price AS Retail Price FROM Books;'",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price\nFROM Books;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM Books;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Books: Fix the unquoted column alias containing spaces: 'SELECT title, price AS Retail Price FROM Books;'",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.10 Bug Hunts & Edge Cases on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 93,
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #093: Fix the misplaced DISTINCT keyword: 'SELECT first_name, DISTINCT department FROM Employees;'",
    "table": "Employees",
    "scenario": "Fix the misplaced DISTINCT keyword: 'SELECT first_name, DISTINCT department FROM Employees;'",
    "businessObjective": "Fix the misplaced DISTINCT keyword: 'SELECT first_name, DISTINCT department FROM Employees;'",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary\nFROM Employees;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM Employees;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Employees: Fix the misplaced DISTINCT keyword: 'SELECT first_name, DISTINCT department FROM Employees;'",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.10 Bug Hunts & Edge Cases on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 94,
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #094: Fix the single-quoted column name: \"SELECT 'item_name' FROM GroceryItems;\" (outputs literal string instead of column)",
    "table": "GroceryItems",
    "scenario": "Fix the single-quoted column name: \"SELECT 'item_name' FROM GroceryItems;\" (outputs literal string instead of column).",
    "businessObjective": "Fix the single-quoted column name: \"SELECT 'item_name' FROM GroceryItems;\" (outputs literal string instead of column).",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM GroceryItems;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GroceryItems: Fix the single-quoted column name: \"SELECT 'item_name' FROM GroceryItems;\" (outputs literal string instead of column).",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.10 Bug Hunts & Edge Cases on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 95,
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #095: Fix missing comma between calculated expression and next column",
    "table": "Orders",
    "scenario": "Fix missing comma between calculated expression and next column.",
    "businessObjective": "Fix missing comma between calculated expression and next column.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, quantity * unit_price AS subtotal\nFROM Orders;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM Orders;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on Orders: Fix missing comma between calculated expression and next column.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.10 Bug Hunts & Edge Cases on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "quantity"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "subtotal"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 96,
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #096: Fix misspelled column identifier: 'SELECT song_title FROM MusicTracks;'",
    "table": "MusicTracks",
    "scenario": "Fix misspelled column identifier: 'SELECT song_title FROM MusicTracks;'",
    "businessObjective": "Fix misspelled column identifier: 'SELECT song_title FROM MusicTracks;'",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, artist_name\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM MusicTracks;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MusicTracks: Fix misspelled column identifier: 'SELECT song_title FROM MusicTracks;'",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.10 Bug Hunts & Edge Cases on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "artist_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 97,
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #097: Fix table name typo: 'SELECT member_name FROM GymMember;' (singular vs plural)",
    "table": "GymMembers",
    "scenario": "Fix table name typo: 'SELECT member_name FROM GymMember;' (singular vs plural).",
    "businessObjective": "Fix table name typo: 'SELECT member_name FROM GymMember;' (singular vs plural).",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, monthly_fee\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM GymMembers;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on GymMembers: Fix table name typo: 'SELECT member_name FROM GymMember;' (singular vs plural).",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.10 Bug Hunts & Edge Cases on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "monthly_fee"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 98,
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #098: Fix hyphen used in column alias: 'SELECT movie_title AS movie-name FROM MovieReviews;'",
    "table": "MovieReviews",
    "scenario": "Fix hyphen used in column alias: 'SELECT movie_title AS movie-name FROM MovieReviews;'",
    "businessObjective": "Fix hyphen used in column alias: 'SELECT movie_title AS movie-name FROM MovieReviews;'",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM MovieReviews;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on MovieReviews: Fix hyphen used in column alias: 'SELECT movie_title AS movie-name FROM MovieReviews;'",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.10 Bug Hunts & Edge Cases on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 99,
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #099: Fix missing FROM keyword: 'SELECT flight_id, origin_airport FlightSchedule;'",
    "table": "FlightSchedule",
    "scenario": "Fix missing FROM keyword: 'SELECT flight_id, origin_airport FlightSchedule;'",
    "businessObjective": "Fix missing FROM keyword: 'SELECT flight_id, origin_airport FlightSchedule;'",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, origin_airport, dest_airport\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM FlightSchedule;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on FlightSchedule: Fix missing FROM keyword: 'SELECT flight_id, origin_airport FlightSchedule;'",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.10 Bug Hunts & Edge Cases on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "origin_airport,"
      },
      {
        "type": "column",
        "value": "dest_airport"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 100,
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #100: Fix premature semicolon: 'SELECT pet_name; FROM PetClinic;'",
    "table": "PetClinic",
    "scenario": "Fix premature semicolon: 'SELECT pet_name; FROM PetClinic;'",
    "businessObjective": "Fix premature semicolon: 'SELECT pet_name; FROM PetClinic;'",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, age_years\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT column_1, column_2\nFROM PetClinic;",
    "syntaxRule": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only.",
    "syntaxTrap": "Do not add trailing commas before FROM or quote column identifiers.",
    "eli5Story": "Simple everyday task on PetClinic: Fix premature semicolon: 'SELECT pet_name; FROM PetClinic;'",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names.",
    "learningOutcomes": "Mastered 1.10 Bug Hunts & Edge Cases on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "age_years"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 101,
    "subcluster": "2.1 Exact Equality & Inequality",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #101: Find all students who live in the city of Seattle",
    "table": "Students",
    "scenario": "Find all students who live in the city of Seattle.",
    "businessObjective": "Find all students who live in the city of Seattle.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, city\nFROM Students\nWHERE city = 'Seattle';",
    "syntaxBlueprint": "SELECT full_name, city\nFROM Students\nWHERE city = 'Seattle';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Find all students who live in the city of Seattle.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Seattle';"
      }
    ]
  },
  {
    "drillNumber": 102,
    "subcluster": "2.1 Exact Equality & Inequality",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #102: Select all books that belong to the 'Sci-Fi' genre",
    "table": "Books",
    "scenario": "Select all books that belong to the 'Sci-Fi' genre.",
    "businessObjective": "Select all books that belong to the 'Sci-Fi' genre.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, author, genre\nFROM Books\nWHERE genre = 'Sci-Fi';",
    "syntaxBlueprint": "SELECT title, author, genre\nFROM Books\nWHERE genre = 'Sci-Fi';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Select all books that belong to the 'Sci-Fi' genre.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "author,"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Sci-Fi';"
      }
    ]
  },
  {
    "drillNumber": 103,
    "subcluster": "2.1 Exact Equality & Inequality",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #103: Retrieve all employees in the Engineering department",
    "table": "Employees",
    "scenario": "Retrieve all employees in the Engineering department.",
    "businessObjective": "Retrieve all employees in the Engineering department.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, department, salary\nFROM Employees\nWHERE department = 'Engineering';",
    "syntaxBlueprint": "SELECT first_name, department, salary\nFROM Employees\nWHERE department = 'Engineering';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Retrieve all employees in the Engineering department.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Engineering';"
      }
    ]
  },
  {
    "drillNumber": 104,
    "subcluster": "2.1 Exact Equality & Inequality",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #104: Find all grocery items where is_organic is TRUE",
    "table": "GroceryItems",
    "scenario": "Find all grocery items where is_organic is TRUE.",
    "businessObjective": "Find all grocery items where is_organic is TRUE.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE is_organic = TRUE;",
    "syntaxBlueprint": "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE is_organic = TRUE;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find all grocery items where is_organic is TRUE.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "is_organic"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "TRUE;"
      }
    ]
  },
  {
    "drillNumber": 105,
    "subcluster": "2.1 Exact Equality & Inequality",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #105: Display all orders where order_status is 'Shipped'",
    "table": "Orders",
    "scenario": "Display all orders where order_status is 'Shipped'.",
    "businessObjective": "Display all orders where order_status is 'Shipped'.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, customer_name, order_status\nFROM Orders\nWHERE order_status = 'Shipped';",
    "syntaxBlueprint": "SELECT order_id, customer_name, order_status\nFROM Orders\nWHERE order_status = 'Shipped';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Display all orders where order_status is 'Shipped'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "customer_name,"
      },
      {
        "type": "column",
        "value": "order_status"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "order_status"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Shipped';"
      }
    ]
  },
  {
    "drillNumber": 106,
    "subcluster": "2.1 Exact Equality & Inequality",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #106: Find all tracks performed by the artist 'Luna Waves'",
    "table": "MusicTracks",
    "scenario": "Find all tracks performed by the artist 'Luna Waves'.",
    "businessObjective": "Find all tracks performed by the artist 'Luna Waves'.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, artist_name\nFROM MusicTracks\nWHERE artist_name = 'Luna Waves';",
    "syntaxBlueprint": "SELECT track_title, artist_name\nFROM MusicTracks\nWHERE artist_name = 'Luna Waves';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find all tracks performed by the artist 'Luna Waves'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "artist_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "artist_name"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Luna"
      },
      {
        "type": "column",
        "value": "Waves';"
      }
    ]
  },
  {
    "drillNumber": 107,
    "subcluster": "2.1 Exact Equality & Inequality",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #107: List all members enrolled in the 'Gold' plan",
    "table": "GymMembers",
    "scenario": "List all members enrolled in the 'Gold' plan.",
    "businessObjective": "List all members enrolled in the 'Gold' plan.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE membership_plan = 'Gold';",
    "syntaxBlueprint": "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE membership_plan = 'Gold';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: List all members enrolled in the 'Gold' plan.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Gold';"
      }
    ]
  },
  {
    "drillNumber": 108,
    "subcluster": "2.1 Exact Equality & Inequality",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #108: Find all films directed by 'Christopher Nolan'",
    "table": "MovieReviews",
    "scenario": "Find all films directed by 'Christopher Nolan'.",
    "businessObjective": "Find all films directed by 'Christopher Nolan'.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, director\nFROM MovieReviews\nWHERE director = 'Christopher Nolan';",
    "syntaxBlueprint": "SELECT movie_title, director\nFROM MovieReviews\nWHERE director = 'Christopher Nolan';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find all films directed by 'Christopher Nolan'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "director"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "director"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Christopher"
      },
      {
        "type": "column",
        "value": "Nolan';"
      }
    ]
  },
  {
    "drillNumber": 109,
    "subcluster": "2.1 Exact Equality & Inequality",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #109: Find all flights with destination airport equal to 'LAX'",
    "table": "FlightSchedule",
    "scenario": "Find all flights with destination airport equal to 'LAX'.",
    "businessObjective": "Find all flights with destination airport equal to 'LAX'.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, dest_airport\nFROM FlightSchedule\nWHERE dest_airport = 'LAX';",
    "syntaxBlueprint": "SELECT flight_id, dest_airport\nFROM FlightSchedule\nWHERE dest_airport = 'LAX';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find all flights with destination airport equal to 'LAX'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "dest_airport"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "dest_airport"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'LAX';"
      }
    ]
  },
  {
    "drillNumber": 110,
    "subcluster": "2.1 Exact Equality & Inequality",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #110: Find all pets whose species is NOT 'Dog' using != operator",
    "table": "PetClinic",
    "scenario": "Find all pets whose species is NOT 'Dog' using != operator.",
    "businessObjective": "Find all pets whose species is NOT 'Dog' using != operator.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, species\nFROM PetClinic\nWHERE species != 'Dog';",
    "syntaxBlueprint": "SELECT pet_name, species\nFROM PetClinic\nWHERE species != 'Dog';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find all pets whose species is NOT 'Dog' using != operator.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "column",
        "value": "!="
      },
      {
        "type": "column",
        "value": "'Dog';"
      }
    ]
  },
  {
    "drillNumber": 111,
    "subcluster": "2.2 Numeric Comparisons",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #111: Select students with a GPA greater than or equal to 3.50 (Honors list)",
    "table": "Students",
    "scenario": "Select students with a GPA greater than or equal to 3.50 (Honors list).",
    "businessObjective": "Select students with a GPA greater than or equal to 3.50 (Honors list).",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nWHERE gpa >= 3.50;",
    "syntaxBlueprint": "SELECT full_name, gpa\nFROM Students\nWHERE gpa >= 3.50;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Select students with a GPA greater than or equal to 3.50 (Honors list).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "3.50;"
      }
    ]
  },
  {
    "drillNumber": 112,
    "subcluster": "2.2 Numeric Comparisons",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #112: Find all budget books with a price strictly under $20.00",
    "table": "Books",
    "scenario": "Find all budget books with a price strictly under $20.00.",
    "businessObjective": "Find all budget books with a price strictly under $20.00.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price\nFROM Books\nWHERE price < 20.00;",
    "syntaxBlueprint": "SELECT title, price\nFROM Books\nWHERE price < 20.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find all budget books with a price strictly under $20.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "column",
        "value": "<"
      },
      {
        "type": "column",
        "value": "20.00;"
      }
    ]
  },
  {
    "drillNumber": 113,
    "subcluster": "2.2 Numeric Comparisons",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #113: Retrieve employees earning a salary greater than $80,000",
    "table": "Employees",
    "scenario": "Retrieve employees earning a salary greater than $80,000.",
    "businessObjective": "Retrieve employees earning a salary greater than $80,000.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary\nFROM Employees\nWHERE salary > 80000.00;",
    "syntaxBlueprint": "SELECT first_name, salary\nFROM Employees\nWHERE salary > 80000.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Retrieve employees earning a salary greater than $80,000.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "80000.00;"
      }
    ]
  },
  {
    "drillNumber": 114,
    "subcluster": "2.2 Numeric Comparisons",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #114: Find all low-calorie grocery items with 100 or fewer calories",
    "table": "GroceryItems",
    "scenario": "Find all low-calorie grocery items with 100 or fewer calories.",
    "businessObjective": "Find all low-calorie grocery items with 100 or fewer calories.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, calories\nFROM GroceryItems\nWHERE calories <= 100;",
    "syntaxBlueprint": "SELECT item_name, calories\nFROM GroceryItems\nWHERE calories <= 100;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find all low-calorie grocery items with 100 or fewer calories.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "calories"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "calories"
      },
      {
        "type": "column",
        "value": "<="
      },
      {
        "type": "column",
        "value": "100;"
      }
    ]
  },
  {
    "drillNumber": 115,
    "subcluster": "2.2 Numeric Comparisons",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #115: Find bulk orders where quantity is 3 or more",
    "table": "Orders",
    "scenario": "Find bulk orders where quantity is 3 or more.",
    "businessObjective": "Find bulk orders where quantity is 3 or more.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, quantity\nFROM Orders\nWHERE quantity >= 3;",
    "syntaxBlueprint": "SELECT order_id, quantity\nFROM Orders\nWHERE quantity >= 3;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find bulk orders where quantity is 3 or more.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "quantity"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "quantity"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "3;"
      }
    ]
  },
  {
    "drillNumber": 116,
    "subcluster": "2.2 Numeric Comparisons",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #116: Select viral tracks with over 100,000 plays",
    "table": "MusicTracks",
    "scenario": "Select viral tracks with over 100,000 plays.",
    "businessObjective": "Select viral tracks with over 100,000 plays.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, play_count\nFROM MusicTracks\nWHERE play_count > 100000;",
    "syntaxBlueprint": "SELECT track_title, play_count\nFROM MusicTracks\nWHERE play_count > 100000;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Select viral tracks with over 100,000 plays.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "100000;"
      }
    ]
  },
  {
    "drillNumber": 117,
    "subcluster": "2.2 Numeric Comparisons",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #117: Find active gym members who visited more than 10 times this month",
    "table": "GymMembers",
    "scenario": "Find active gym members who visited more than 10 times this month.",
    "businessObjective": "Find active gym members who visited more than 10 times this month.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, visits_this_month\nFROM GymMembers\nWHERE visits_this_month > 10;",
    "syntaxBlueprint": "SELECT member_name, visits_this_month\nFROM GymMembers\nWHERE visits_this_month > 10;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Find active gym members who visited more than 10 times this month.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "10;"
      }
    ]
  },
  {
    "drillNumber": 118,
    "subcluster": "2.2 Numeric Comparisons",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #118: Select critically acclaimed movies with a star rating of 4.5 or higher",
    "table": "MovieReviews",
    "scenario": "Select critically acclaimed movies with a star rating of 4.5 or higher.",
    "businessObjective": "Select critically acclaimed movies with a star rating of 4.5 or higher.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE star_rating >= 4.5;",
    "syntaxBlueprint": "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE star_rating >= 4.5;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Select critically acclaimed movies with a star rating of 4.5 or higher.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "4.5;"
      }
    ]
  },
  {
    "drillNumber": 119,
    "subcluster": "2.2 Numeric Comparisons",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #119: List all significantly delayed flights with more than 30 minutes of delay",
    "table": "FlightSchedule",
    "scenario": "List all significantly delayed flights with more than 30 minutes of delay.",
    "businessObjective": "List all significantly delayed flights with more than 30 minutes of delay.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nWHERE delay_minutes > 30;",
    "syntaxBlueprint": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nWHERE delay_minutes > 30;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: List all significantly delayed flights with more than 30 minutes of delay.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "delay_minutes"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "delay_minutes"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "30;"
      }
    ]
  },
  {
    "drillNumber": 120,
    "subcluster": "2.2 Numeric Comparisons",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #120: Find large animal patients weighing over 20 kilograms",
    "table": "PetClinic",
    "scenario": "Find large animal patients weighing over 20 kilograms.",
    "businessObjective": "Find large animal patients weighing over 20 kilograms.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, weight_kg\nFROM PetClinic\nWHERE weight_kg > 20.0;",
    "syntaxBlueprint": "SELECT pet_name, weight_kg\nFROM PetClinic\nWHERE weight_kg > 20.0;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find large animal patients weighing over 20 kilograms.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "weight_kg"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "weight_kg"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "20.0;"
      }
    ]
  },
  {
    "drillNumber": 121,
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #121: Select students whose age is between 18 and 22 inclusive",
    "table": "Students",
    "scenario": "Select students whose age is between 18 and 22 inclusive.",
    "businessObjective": "Select students whose age is between 18 and 22 inclusive.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, age\nFROM Students\nWHERE age BETWEEN 18 AND 22;",
    "syntaxBlueprint": "SELECT full_name, age\nFROM Students\nWHERE age BETWEEN 18 AND 22;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Select students whose age is between 18 and 22 inclusive.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "age"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "age"
      },
      {
        "type": "keyword",
        "value": "BETWEEN"
      },
      {
        "type": "column",
        "value": "18"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "22;"
      }
    ]
  },
  {
    "drillNumber": 122,
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #122: Find books with prices between $15.00 and $30.00 inclusive",
    "table": "Books",
    "scenario": "Find books with prices between $15.00 and $30.00 inclusive.",
    "businessObjective": "Find books with prices between $15.00 and $30.00 inclusive.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price\nFROM Books\nWHERE price BETWEEN 15.00 AND 30.00;",
    "syntaxBlueprint": "SELECT title, price\nFROM Books\nWHERE price BETWEEN 15.00 AND 30.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find books with prices between $15.00 and $30.00 inclusive.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "BETWEEN"
      },
      {
        "type": "column",
        "value": "15.00"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "30.00;"
      }
    ]
  },
  {
    "drillNumber": 123,
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #123: Retrieve employees in the mid-career salary band between $60,000 and $90,000",
    "table": "Employees",
    "scenario": "Retrieve employees in the mid-career salary band between $60,000 and $90,000.",
    "businessObjective": "Retrieve employees in the mid-career salary band between $60,000 and $90,000.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary\nFROM Employees\nWHERE salary BETWEEN 60000.00 AND 90000.00;",
    "syntaxBlueprint": "SELECT first_name, salary\nFROM Employees\nWHERE salary BETWEEN 60000.00 AND 90000.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Retrieve employees in the mid-career salary band between $60,000 and $90,000.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "BETWEEN"
      },
      {
        "type": "column",
        "value": "60000.00"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "90000.00;"
      }
    ]
  },
  {
    "drillNumber": 124,
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #124: Find grocery items priced between $2.00 and $5.00",
    "table": "GroceryItems",
    "scenario": "Find grocery items priced between $2.00 and $5.00.",
    "businessObjective": "Find grocery items priced between $2.00 and $5.00.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE unit_price BETWEEN 2.00 AND 5.00;",
    "syntaxBlueprint": "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE unit_price BETWEEN 2.00 AND 5.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find grocery items priced between $2.00 and $5.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "BETWEEN"
      },
      {
        "type": "column",
        "value": "2.00"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "5.00;"
      }
    ]
  },
  {
    "drillNumber": 125,
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #125: Find orders where the unit price is between $25.00 and $100.00",
    "table": "Orders",
    "scenario": "Find orders where the unit price is between $25.00 and $100.00.",
    "businessObjective": "Find orders where the unit price is between $25.00 and $100.00.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, unit_price\nFROM Orders\nWHERE unit_price BETWEEN 25.00 AND 100.00;",
    "syntaxBlueprint": "SELECT order_id, unit_price\nFROM Orders\nWHERE unit_price BETWEEN 25.00 AND 100.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find orders where the unit price is between $25.00 and $100.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "BETWEEN"
      },
      {
        "type": "column",
        "value": "25.00"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "100.00;"
      }
    ]
  },
  {
    "drillNumber": 126,
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #126: Find tracks between 3 and 4 minutes long (180 to 240 seconds)",
    "table": "MusicTracks",
    "scenario": "Find tracks between 3 and 4 minutes long (180 to 240 seconds).",
    "businessObjective": "Find tracks between 3 and 4 minutes long (180 to 240 seconds).",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, duration_seconds\nFROM MusicTracks\nWHERE duration_seconds BETWEEN 180 AND 240;",
    "syntaxBlueprint": "SELECT track_title, duration_seconds\nFROM MusicTracks\nWHERE duration_seconds BETWEEN 180 AND 240;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find tracks between 3 and 4 minutes long (180 to 240 seconds).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "duration_seconds"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "duration_seconds"
      },
      {
        "type": "keyword",
        "value": "BETWEEN"
      },
      {
        "type": "column",
        "value": "180"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "240;"
      }
    ]
  },
  {
    "drillNumber": 127,
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #127: List gym members with monthly dues between $25.00 and $75.00",
    "table": "GymMembers",
    "scenario": "List gym members with monthly dues between $25.00 and $75.00.",
    "businessObjective": "List gym members with monthly dues between $25.00 and $75.00.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, monthly_fee\nFROM GymMembers\nWHERE monthly_fee BETWEEN 25.00 AND 75.00;",
    "syntaxBlueprint": "SELECT member_name, monthly_fee\nFROM GymMembers\nWHERE monthly_fee BETWEEN 25.00 AND 75.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: List gym members with monthly dues between $25.00 and $75.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "monthly_fee"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "monthly_fee"
      },
      {
        "type": "keyword",
        "value": "BETWEEN"
      },
      {
        "type": "column",
        "value": "25.00"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "75.00;"
      }
    ]
  },
  {
    "drillNumber": 128,
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #128: Find films released in the four-year span between 2020 and 2023 inclusive",
    "table": "MovieReviews",
    "scenario": "Find films released in the four-year span between 2020 and 2023 inclusive.",
    "businessObjective": "Find films released in the four-year span between 2020 and 2023 inclusive.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, release_year\nFROM MovieReviews\nWHERE release_year BETWEEN 2020 AND 2023;",
    "syntaxBlueprint": "SELECT movie_title, release_year\nFROM MovieReviews\nWHERE release_year BETWEEN 2020 AND 2023;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find films released in the four-year span between 2020 and 2023 inclusive.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "release_year"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "release_year"
      },
      {
        "type": "keyword",
        "value": "BETWEEN"
      },
      {
        "type": "column",
        "value": "2020"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "2023;"
      }
    ]
  },
  {
    "drillNumber": 129,
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #129: Find flights with economy ticket prices between $200 and $400",
    "table": "FlightSchedule",
    "scenario": "Find flights with economy ticket prices between $200 and $400.",
    "businessObjective": "Find flights with economy ticket prices between $200 and $400.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, ticket_price\nFROM FlightSchedule\nWHERE ticket_price BETWEEN 200.00 AND 400.00;",
    "syntaxBlueprint": "SELECT flight_id, ticket_price\nFROM FlightSchedule\nWHERE ticket_price BETWEEN 200.00 AND 400.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find flights with economy ticket prices between $200 and $400.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "ticket_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "ticket_price"
      },
      {
        "type": "keyword",
        "value": "BETWEEN"
      },
      {
        "type": "column",
        "value": "200.00"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "400.00;"
      }
    ]
  },
  {
    "drillNumber": 130,
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #130: Find very young or senior pets whose age is NOT between 3 and 8 years",
    "table": "PetClinic",
    "scenario": "Find very young or senior pets whose age is NOT between 3 and 8 years.",
    "businessObjective": "Find very young or senior pets whose age is NOT between 3 and 8 years.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, age_years\nFROM PetClinic\nWHERE age_years NOT BETWEEN 3 AND 8;",
    "syntaxBlueprint": "SELECT pet_name, age_years\nFROM PetClinic\nWHERE age_years NOT BETWEEN 3 AND 8;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find very young or senior pets whose age is NOT between 3 and 8 years.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "age_years"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "age_years"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "BETWEEN"
      },
      {
        "type": "column",
        "value": "3"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "8;"
      }
    ]
  },
  {
    "drillNumber": 131,
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #131: Select students who live in Seattle, Chicago, or Austin",
    "table": "Students",
    "scenario": "Select students who live in Seattle, Chicago, or Austin.",
    "businessObjective": "Select students who live in Seattle, Chicago, or Austin.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, city\nFROM Students\nWHERE city IN ('Seattle', 'Chicago', 'Austin');",
    "syntaxBlueprint": "SELECT full_name, city\nFROM Students\nWHERE city IN ('Seattle', 'Chicago', 'Austin');",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Select students who live in Seattle, Chicago, or Austin.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "keyword",
        "value": "IN"
      },
      {
        "type": "column",
        "value": "('Seattle',"
      },
      {
        "type": "column",
        "value": "'Chicago',"
      },
      {
        "type": "column",
        "value": "'Austin');"
      }
    ]
  },
  {
    "drillNumber": 132,
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #132: Find books belonging to Mystery, Sci-Fi, or Thriller genres",
    "table": "Books",
    "scenario": "Find books belonging to Mystery, Sci-Fi, or Thriller genres.",
    "businessObjective": "Find books belonging to Mystery, Sci-Fi, or Thriller genres.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, genre\nFROM Books\nWHERE genre IN ('Mystery', 'Sci-Fi', 'Thriller');",
    "syntaxBlueprint": "SELECT title, genre\nFROM Books\nWHERE genre IN ('Mystery', 'Sci-Fi', 'Thriller');",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find books belonging to Mystery, Sci-Fi, or Thriller genres.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "IN"
      },
      {
        "type": "column",
        "value": "('Mystery',"
      },
      {
        "type": "column",
        "value": "'Sci-Fi',"
      },
      {
        "type": "column",
        "value": "'Thriller');"
      }
    ]
  },
  {
    "drillNumber": 133,
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #133: Retrieve employees working in either Engineering or Design",
    "table": "Employees",
    "scenario": "Retrieve employees working in either Engineering or Design.",
    "businessObjective": "Retrieve employees working in either Engineering or Design.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, department\nFROM Employees\nWHERE department IN ('Engineering', 'Design');",
    "syntaxBlueprint": "SELECT first_name, department\nFROM Employees\nWHERE department IN ('Engineering', 'Design');",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Retrieve employees working in either Engineering or Design.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "keyword",
        "value": "IN"
      },
      {
        "type": "column",
        "value": "('Engineering',"
      },
      {
        "type": "column",
        "value": "'Design');"
      }
    ]
  },
  {
    "drillNumber": 134,
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #134: List grocery items in either the Produce or Bakery category",
    "table": "GroceryItems",
    "scenario": "List grocery items in either the Produce or Bakery category.",
    "businessObjective": "List grocery items in either the Produce or Bakery category.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, category\nFROM GroceryItems\nWHERE category IN ('Produce', 'Bakery');",
    "syntaxBlueprint": "SELECT item_name, category\nFROM GroceryItems\nWHERE category IN ('Produce', 'Bakery');",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: List grocery items in either the Produce or Bakery category.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "category"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "category"
      },
      {
        "type": "keyword",
        "value": "IN"
      },
      {
        "type": "column",
        "value": "('Produce',"
      },
      {
        "type": "column",
        "value": "'Bakery');"
      }
    ]
  },
  {
    "drillNumber": 135,
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #135: Find all fulfilled orders with status Shipped or Delivered",
    "table": "Orders",
    "scenario": "Find all fulfilled orders with status Shipped or Delivered.",
    "businessObjective": "Find all fulfilled orders with status Shipped or Delivered.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, order_status\nFROM Orders\nWHERE order_status IN ('Shipped', 'Delivered');",
    "syntaxBlueprint": "SELECT order_id, order_status\nFROM Orders\nWHERE order_status IN ('Shipped', 'Delivered');",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find all fulfilled orders with status Shipped or Delivered.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "order_status"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "order_status"
      },
      {
        "type": "keyword",
        "value": "IN"
      },
      {
        "type": "column",
        "value": "('Shipped',"
      },
      {
        "type": "column",
        "value": "'Delivered');"
      }
    ]
  },
  {
    "drillNumber": 136,
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #136: Filter music tracks to only Rock or Synthwave",
    "table": "MusicTracks",
    "scenario": "Filter music tracks to only Rock or Synthwave.",
    "businessObjective": "Filter music tracks to only Rock or Synthwave.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, genre\nFROM MusicTracks\nWHERE genre IN ('Rock', 'Synthwave');",
    "syntaxBlueprint": "SELECT track_title, genre\nFROM MusicTracks\nWHERE genre IN ('Rock', 'Synthwave');",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Filter music tracks to only Rock or Synthwave.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "IN"
      },
      {
        "type": "column",
        "value": "('Rock',"
      },
      {
        "type": "column",
        "value": "'Synthwave');"
      }
    ]
  },
  {
    "drillNumber": 137,
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #137: List premium members with either Gold or Platinum plans",
    "table": "GymMembers",
    "scenario": "List premium members with either Gold or Platinum plans.",
    "businessObjective": "List premium members with either Gold or Platinum plans.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE membership_plan IN ('Gold', 'Platinum');",
    "syntaxBlueprint": "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE membership_plan IN ('Gold', 'Platinum');",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: List premium members with either Gold or Platinum plans.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "keyword",
        "value": "IN"
      },
      {
        "type": "column",
        "value": "('Gold',"
      },
      {
        "type": "column",
        "value": "'Platinum');"
      }
    ]
  },
  {
    "drillNumber": 138,
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #138: Select movies whose genre is neither Horror nor Action",
    "table": "MovieReviews",
    "scenario": "Select movies whose genre is neither Horror nor Action.",
    "businessObjective": "Select movies whose genre is neither Horror nor Action.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, genre\nFROM MovieReviews\nWHERE genre NOT IN ('Horror', 'Action');",
    "syntaxBlueprint": "SELECT movie_title, genre\nFROM MovieReviews\nWHERE genre NOT IN ('Horror', 'Action');",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Select movies whose genre is neither Horror nor Action.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "IN"
      },
      {
        "type": "column",
        "value": "('Horror',"
      },
      {
        "type": "column",
        "value": "'Action');"
      }
    ]
  },
  {
    "drillNumber": 139,
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #139: Find flights departing from major hubs ORD, SFO, or JFK",
    "table": "FlightSchedule",
    "scenario": "Find flights departing from major hubs ORD, SFO, or JFK.",
    "businessObjective": "Find flights departing from major hubs ORD, SFO, or JFK.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, origin_airport\nFROM FlightSchedule\nWHERE origin_airport IN ('ORD', 'SFO', 'JFK');",
    "syntaxBlueprint": "SELECT flight_id, origin_airport\nFROM FlightSchedule\nWHERE origin_airport IN ('ORD', 'SFO', 'JFK');",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find flights departing from major hubs ORD, SFO, or JFK.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "origin_airport"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "origin_airport"
      },
      {
        "type": "keyword",
        "value": "IN"
      },
      {
        "type": "column",
        "value": "('ORD',"
      },
      {
        "type": "column",
        "value": "'SFO',"
      },
      {
        "type": "column",
        "value": "'JFK');"
      }
    ]
  },
  {
    "drillNumber": 140,
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #140: Filter patient records to standard household pets: Dog or Cat",
    "table": "PetClinic",
    "scenario": "Filter patient records to standard household pets: Dog or Cat.",
    "businessObjective": "Filter patient records to standard household pets: Dog or Cat.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, species\nFROM PetClinic\nWHERE species IN ('Dog', 'Cat');",
    "syntaxBlueprint": "SELECT pet_name, species\nFROM PetClinic\nWHERE species IN ('Dog', 'Cat');",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Filter patient records to standard household pets: Dog or Cat.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "keyword",
        "value": "IN"
      },
      {
        "type": "column",
        "value": "('Dog',"
      },
      {
        "type": "column",
        "value": "'Cat');"
      }
    ]
  },
  {
    "drillNumber": 141,
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #141: Find all students whose first name starts with the capital letter 'A'",
    "table": "Students",
    "scenario": "Find all students whose first name starts with the capital letter 'A'.",
    "businessObjective": "Find all students whose first name starts with the capital letter 'A'.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name\nFROM Students\nWHERE full_name LIKE 'A%';",
    "syntaxBlueprint": "SELECT full_name\nFROM Students\nWHERE full_name LIKE 'A%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Find all students whose first name starts with the capital letter 'A'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "full_name"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'A%';"
      }
    ]
  },
  {
    "drillNumber": 142,
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #142: Find all books written by an author with 'King' anywhere in their name",
    "table": "Books",
    "scenario": "Find all books written by an author with 'King' anywhere in their name.",
    "businessObjective": "Find all books written by an author with 'King' anywhere in their name.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, author\nFROM Books\nWHERE author LIKE '%King%';",
    "syntaxBlueprint": "SELECT title, author\nFROM Books\nWHERE author LIKE '%King%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find all books written by an author with 'King' anywhere in their name.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "author"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "author"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'%King%';"
      }
    ]
  },
  {
    "drillNumber": 143,
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #143: Select all employees whose family name ends with 'son' (e.g. Johnson, Wilson)",
    "table": "Employees",
    "scenario": "Select all employees whose family name ends with 'son' (e.g. Johnson, Wilson).",
    "businessObjective": "Select all employees whose family name ends with 'son' (e.g. Johnson, Wilson).",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, last_name\nFROM Employees\nWHERE last_name LIKE '%son';",
    "syntaxBlueprint": "SELECT first_name, last_name\nFROM Employees\nWHERE last_name LIKE '%son';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Select all employees whose family name ends with 'son' (e.g. Johnson, Wilson).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "last_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "last_name"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'%son';"
      }
    ]
  },
  {
    "drillNumber": 144,
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #144: Find all grocery items with 'Organic' anywhere in the item name",
    "table": "GroceryItems",
    "scenario": "Find all grocery items with 'Organic' anywhere in the item name.",
    "businessObjective": "Find all grocery items with 'Organic' anywhere in the item name.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name\nFROM GroceryItems\nWHERE item_name LIKE '%Organic%';",
    "syntaxBlueprint": "SELECT item_name\nFROM GroceryItems\nWHERE item_name LIKE '%Organic%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find all grocery items with 'Organic' anywhere in the item name.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "item_name"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'%Organic%';"
      }
    ]
  },
  {
    "drillNumber": 145,
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #145: Find orders placed by customers whose name begins with 'Z'",
    "table": "Orders",
    "scenario": "Find orders placed by customers whose name begins with 'Z'.",
    "businessObjective": "Find orders placed by customers whose name begins with 'Z'.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, customer_name\nFROM Orders\nWHERE customer_name LIKE 'Z%';",
    "syntaxBlueprint": "SELECT order_id, customer_name\nFROM Orders\nWHERE customer_name LIKE 'Z%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find orders placed by customers whose name begins with 'Z'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "customer_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "customer_name"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'Z%';"
      }
    ]
  },
  {
    "drillNumber": 146,
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #146: Find all tracks that have 'Rain' in the title",
    "table": "MusicTracks",
    "scenario": "Find all tracks that have 'Rain' in the title.",
    "businessObjective": "Find all tracks that have 'Rain' in the title.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title\nFROM MusicTracks\nWHERE track_title LIKE '%Rain%';",
    "syntaxBlueprint": "SELECT track_title\nFROM MusicTracks\nWHERE track_title LIKE '%Rain%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find all tracks that have 'Rain' in the title.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "track_title"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'%Rain%';"
      }
    ]
  },
  {
    "drillNumber": 147,
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #147: Find members whose name has 'a' as the second character (e.g. Sam, Dan)",
    "table": "GymMembers",
    "scenario": "Find members whose name has 'a' as the second character (e.g. Sam, Dan).",
    "businessObjective": "Find members whose name has 'a' as the second character (e.g. Sam, Dan).",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name\nFROM GymMembers\nWHERE member_name LIKE '_a%';",
    "syntaxBlueprint": "SELECT member_name\nFROM GymMembers\nWHERE member_name LIKE '_a%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Find members whose name has 'a' as the second character (e.g. Sam, Dan).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "member_name"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'_a%';"
      }
    ]
  },
  {
    "drillNumber": 148,
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #148: Find movies that contain the word 'The ' in their title",
    "table": "MovieReviews",
    "scenario": "Find movies that contain the word 'The ' in their title.",
    "businessObjective": "Find movies that contain the word 'The ' in their title.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title\nFROM MovieReviews\nWHERE movie_title LIKE '%The %';",
    "syntaxBlueprint": "SELECT movie_title\nFROM MovieReviews\nWHERE movie_title LIKE '%The %';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find movies that contain the word 'The ' in their title.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "movie_title"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'%The"
      },
      {
        "type": "column",
        "value": "%';"
      }
    ]
  },
  {
    "drillNumber": 149,
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #149: Find all American Airlines flights starting with flight code 'AA-'",
    "table": "FlightSchedule",
    "scenario": "Find all American Airlines flights starting with flight code 'AA-'.",
    "businessObjective": "Find all American Airlines flights starting with flight code 'AA-'.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id\nFROM FlightSchedule\nWHERE flight_id LIKE 'AA-%';",
    "syntaxBlueprint": "SELECT flight_id\nFROM FlightSchedule\nWHERE flight_id LIKE 'AA-%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find all American Airlines flights starting with flight code 'AA-'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "flight_id"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'AA-%';"
      }
    ]
  },
  {
    "drillNumber": 150,
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #150: Find all dogs whose breed includes 'Retriever' (Golden, Labrador, etc.)",
    "table": "PetClinic",
    "scenario": "Find all dogs whose breed includes 'Retriever' (Golden, Labrador, etc.).",
    "businessObjective": "Find all dogs whose breed includes 'Retriever' (Golden, Labrador, etc.).",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, breed\nFROM PetClinic\nWHERE breed LIKE '%Retriever%';",
    "syntaxBlueprint": "SELECT pet_name, breed\nFROM PetClinic\nWHERE breed LIKE '%Retriever%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find all dogs whose breed includes 'Retriever' (Golden, Labrador, etc.).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "breed"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "breed"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'%Retriever%';"
      }
    ]
  },
  {
    "drillNumber": 151,
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #151: Find books whose title does NOT contain the word 'The'",
    "table": "Books",
    "scenario": "Find books whose title does NOT contain the word 'The'.",
    "businessObjective": "Find books whose title does NOT contain the word 'The'.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title\nFROM Books\nWHERE title NOT LIKE '%The%';",
    "syntaxBlueprint": "SELECT title\nFROM Books\nWHERE title NOT LIKE '%The%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find books whose title does NOT contain the word 'The'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "title"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'%The%';"
      }
    ]
  },
  {
    "drillNumber": 152,
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #152: Select students who live in cities that do NOT start with 'S'",
    "table": "Students",
    "scenario": "Select students who live in cities that do NOT start with 'S'.",
    "businessObjective": "Select students who live in cities that do NOT start with 'S'.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, city\nFROM Students\nWHERE city NOT LIKE 'S%';",
    "syntaxBlueprint": "SELECT full_name, city\nFROM Students\nWHERE city NOT LIKE 'S%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Select students who live in cities that do NOT start with 'S'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'S%';"
      }
    ]
  },
  {
    "drillNumber": 153,
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #153: Find employees whose department name does not end with 'ing'",
    "table": "Employees",
    "scenario": "Find employees whose department name does not end with 'ing'.",
    "businessObjective": "Find employees whose department name does not end with 'ing'.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, department\nFROM Employees\nWHERE department NOT LIKE '%ing';",
    "syntaxBlueprint": "SELECT first_name, department\nFROM Employees\nWHERE department NOT LIKE '%ing';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Find employees whose department name does not end with 'ing'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'%ing';"
      }
    ]
  },
  {
    "drillNumber": 154,
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #154: Find grocery items that do not contain the word 'Milk'",
    "table": "GroceryItems",
    "scenario": "Find grocery items that do not contain the word 'Milk'.",
    "businessObjective": "Find grocery items that do not contain the word 'Milk'.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name\nFROM GroceryItems\nWHERE item_name NOT LIKE '%Milk%';",
    "syntaxBlueprint": "SELECT item_name\nFROM GroceryItems\nWHERE item_name NOT LIKE '%Milk%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find grocery items that do not contain the word 'Milk'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "item_name"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'%Milk%';"
      }
    ]
  },
  {
    "drillNumber": 155,
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #155: Find all active orders that are not cancelled",
    "table": "Orders",
    "scenario": "Find all active orders that are not cancelled.",
    "businessObjective": "Find all active orders that are not cancelled.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, order_status\nFROM Orders\nWHERE order_status NOT LIKE '%Cancel%';",
    "syntaxBlueprint": "SELECT order_id, order_status\nFROM Orders\nWHERE order_status NOT LIKE '%Cancel%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find all active orders that are not cancelled.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "order_status"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "order_status"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'%Cancel%';"
      }
    ]
  },
  {
    "drillNumber": 156,
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #156: Find music tracks that do not have 'Love' in the title",
    "table": "MusicTracks",
    "scenario": "Find music tracks that do not have 'Love' in the title.",
    "businessObjective": "Find music tracks that do not have 'Love' in the title.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title\nFROM MusicTracks\nWHERE track_title NOT LIKE '%Love%';",
    "syntaxBlueprint": "SELECT track_title\nFROM MusicTracks\nWHERE track_title NOT LIKE '%Love%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find music tracks that do not have 'Love' in the title.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "track_title"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'%Love%';"
      }
    ]
  },
  {
    "drillNumber": 157,
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #157: List gym members whose names do not start with the letter 'J'",
    "table": "GymMembers",
    "scenario": "List gym members whose names do not start with the letter 'J'.",
    "businessObjective": "List gym members whose names do not start with the letter 'J'.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name\nFROM GymMembers\nWHERE member_name NOT LIKE 'J%';",
    "syntaxBlueprint": "SELECT member_name\nFROM GymMembers\nWHERE member_name NOT LIKE 'J%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: List gym members whose names do not start with the letter 'J'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "member_name"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'J%';"
      }
    ]
  },
  {
    "drillNumber": 158,
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #158: Find movies whose title consists of exactly 3 characters",
    "table": "MovieReviews",
    "scenario": "Find movies whose title consists of exactly 3 characters.",
    "businessObjective": "Find movies whose title consists of exactly 3 characters.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title\nFROM MovieReviews\nWHERE movie_title LIKE '___';",
    "syntaxBlueprint": "SELECT movie_title\nFROM MovieReviews\nWHERE movie_title LIKE '___';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find movies whose title consists of exactly 3 characters.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "movie_title"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'___';"
      }
    ]
  },
  {
    "drillNumber": 159,
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #159: Find non-Delta flights that do not start with 'DL-'",
    "table": "FlightSchedule",
    "scenario": "Find non-Delta flights that do not start with 'DL-'.",
    "businessObjective": "Find non-Delta flights that do not start with 'DL-'.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id\nFROM FlightSchedule\nWHERE flight_id NOT LIKE 'DL-%';",
    "syntaxBlueprint": "SELECT flight_id\nFROM FlightSchedule\nWHERE flight_id NOT LIKE 'DL-%';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find non-Delta flights that do not start with 'DL-'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "flight_id"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'DL-%';"
      }
    ]
  },
  {
    "drillNumber": 160,
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "level": "Level 2 (Wildcards)",
    "title": "Syntax #160: Find pets with names that are exactly 4 letters long (e.g. Milo, Luna)",
    "table": "PetClinic",
    "scenario": "Find pets with names that are exactly 4 letters long (e.g. Milo, Luna).",
    "businessObjective": "Find pets with names that are exactly 4 letters long (e.g. Milo, Luna).",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name\nFROM PetClinic\nWHERE pet_name LIKE '____';",
    "syntaxBlueprint": "SELECT pet_name\nFROM PetClinic\nWHERE pet_name LIKE '____';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find pets with names that are exactly 4 letters long (e.g. Milo, Luna).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "pet_name"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'____';"
      }
    ]
  },
  {
    "drillNumber": 161,
    "subcluster": "2.7 Compound AND Logic",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #161: Find students who live in Seattle AND maintain a GPA higher than 3.50",
    "table": "Students",
    "scenario": "Find students who live in Seattle AND maintain a GPA higher than 3.50.",
    "businessObjective": "Find students who live in Seattle AND maintain a GPA higher than 3.50.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, city, gpa\nFROM Students\nWHERE city = 'Seattle' AND gpa > 3.50;",
    "syntaxBlueprint": "SELECT full_name, city, gpa\nFROM Students\nWHERE city = 'Seattle' AND gpa > 3.50;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Find students who live in Seattle AND maintain a GPA higher than 3.50.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "city,"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Seattle'"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "3.50;"
      }
    ]
  },
  {
    "drillNumber": 162,
    "subcluster": "2.7 Compound AND Logic",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #162: Find Sci-Fi books that are priced under $25.00",
    "table": "Books",
    "scenario": "Find Sci-Fi books that are priced under $25.00.",
    "businessObjective": "Find Sci-Fi books that are priced under $25.00.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price, stock_qty\nFROM Books\nWHERE genre = 'Sci-Fi' AND price < 25.00;",
    "syntaxBlueprint": "SELECT title, price, stock_qty\nFROM Books\nWHERE genre = 'Sci-Fi' AND price < 25.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find Sci-Fi books that are priced under $25.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price,"
      },
      {
        "type": "column",
        "value": "stock_qty"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Sci-Fi'"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "column",
        "value": "<"
      },
      {
        "type": "column",
        "value": "25.00;"
      }
    ]
  },
  {
    "drillNumber": 163,
    "subcluster": "2.7 Compound AND Logic",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #163: Find Engineering employees earning $90,000 or more",
    "table": "Employees",
    "scenario": "Find Engineering employees earning $90,000 or more.",
    "businessObjective": "Find Engineering employees earning $90,000 or more.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, department, salary\nFROM Employees\nWHERE department = 'Engineering' AND salary >= 90000.00;",
    "syntaxBlueprint": "SELECT first_name, department, salary\nFROM Employees\nWHERE department = 'Engineering' AND salary >= 90000.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Find Engineering employees earning $90,000 or more.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Engineering'"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "90000.00;"
      }
    ]
  },
  {
    "drillNumber": 164,
    "subcluster": "2.7 Compound AND Logic",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #164: Find organic grocery items that cost less than $4.00",
    "table": "GroceryItems",
    "scenario": "Find organic grocery items that cost less than $4.00.",
    "businessObjective": "Find organic grocery items that cost less than $4.00.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price, is_organic\nFROM GroceryItems\nWHERE is_organic = TRUE AND unit_price < 4.00;",
    "syntaxBlueprint": "SELECT item_name, unit_price, is_organic\nFROM GroceryItems\nWHERE is_organic = TRUE AND unit_price < 4.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find organic grocery items that cost less than $4.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price,"
      },
      {
        "type": "column",
        "value": "is_organic"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "is_organic"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "TRUE"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "column",
        "value": "<"
      },
      {
        "type": "column",
        "value": "4.00;"
      }
    ]
  },
  {
    "drillNumber": 165,
    "subcluster": "2.7 Compound AND Logic",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #165: Find orders with at least 2 items and a discount greater than 5%",
    "table": "Orders",
    "scenario": "Find orders with at least 2 items and a discount greater than 5%.",
    "businessObjective": "Find orders with at least 2 items and a discount greater than 5%.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, quantity, discount_pct\nFROM Orders\nWHERE quantity >= 2 AND discount_pct > 0.05;",
    "syntaxBlueprint": "SELECT order_id, quantity, discount_pct\nFROM Orders\nWHERE quantity >= 2 AND discount_pct > 0.05;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find orders with at least 2 items and a discount greater than 5%.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "quantity,"
      },
      {
        "type": "column",
        "value": "discount_pct"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "quantity"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "discount_pct"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "0.05;"
      }
    ]
  },
  {
    "drillNumber": 166,
    "subcluster": "2.7 Compound AND Logic",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #166: Find Synthwave tracks released specifically in the year 2024",
    "table": "MusicTracks",
    "scenario": "Find Synthwave tracks released specifically in the year 2024.",
    "businessObjective": "Find Synthwave tracks released specifically in the year 2024.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, genre, release_year\nFROM MusicTracks\nWHERE genre = 'Synthwave' AND release_year = 2024;",
    "syntaxBlueprint": "SELECT track_title, genre, release_year\nFROM MusicTracks\nWHERE genre = 'Synthwave' AND release_year = 2024;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find Synthwave tracks released specifically in the year 2024.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "release_year"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Synthwave'"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "release_year"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "2024;"
      }
    ]
  },
  {
    "drillNumber": 167,
    "subcluster": "2.7 Compound AND Logic",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #167: Find Gold members who have visited at least 15 times this month",
    "table": "GymMembers",
    "scenario": "Find Gold members who have visited at least 15 times this month.",
    "businessObjective": "Find Gold members who have visited at least 15 times this month.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, membership_plan, visits_this_month\nFROM GymMembers\nWHERE membership_plan = 'Gold' AND visits_this_month >= 15;",
    "syntaxBlueprint": "SELECT member_name, membership_plan, visits_this_month\nFROM GymMembers\nWHERE membership_plan = 'Gold' AND visits_this_month >= 15;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Find Gold members who have visited at least 15 times this month.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Gold'"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "15;"
      }
    ]
  },
  {
    "drillNumber": 168,
    "subcluster": "2.7 Compound AND Logic",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #168: Find top-tier Sci-Fi movies with a star rating of 4.5 or higher",
    "table": "MovieReviews",
    "scenario": "Find top-tier Sci-Fi movies with a star rating of 4.5 or higher.",
    "businessObjective": "Find top-tier Sci-Fi movies with a star rating of 4.5 or higher.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, genre, star_rating\nFROM MovieReviews\nWHERE genre = 'Sci-Fi' AND star_rating >= 4.5;",
    "syntaxBlueprint": "SELECT movie_title, genre, star_rating\nFROM MovieReviews\nWHERE genre = 'Sci-Fi' AND star_rating >= 4.5;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find top-tier Sci-Fi movies with a star rating of 4.5 or higher.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Sci-Fi'"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "4.5;"
      }
    ]
  },
  {
    "drillNumber": 169,
    "subcluster": "2.7 Compound AND Logic",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #169: Find on-time United Airlines flights with 0 minutes delay",
    "table": "FlightSchedule",
    "scenario": "Find on-time United Airlines flights with 0 minutes delay.",
    "businessObjective": "Find on-time United Airlines flights with 0 minutes delay.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, airline, delay_minutes\nFROM FlightSchedule\nWHERE airline = 'United Airlines' AND delay_minutes = 0;",
    "syntaxBlueprint": "SELECT flight_id, airline, delay_minutes\nFROM FlightSchedule\nWHERE airline = 'United Airlines' AND delay_minutes = 0;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find on-time United Airlines flights with 0 minutes delay.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "airline,"
      },
      {
        "type": "column",
        "value": "delay_minutes"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "airline"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'United"
      },
      {
        "type": "column",
        "value": "Airlines'"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "delay_minutes"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "0;"
      }
    ]
  },
  {
    "drillNumber": 170,
    "subcluster": "2.7 Compound AND Logic",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #170: Find dogs that are confirmed vaccinated",
    "table": "PetClinic",
    "scenario": "Find dogs that are confirmed vaccinated.",
    "businessObjective": "Find dogs that are confirmed vaccinated.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, species, is_vaccinated\nFROM PetClinic\nWHERE species = 'Dog' AND is_vaccinated = TRUE;",
    "syntaxBlueprint": "SELECT pet_name, species, is_vaccinated\nFROM PetClinic\nWHERE species = 'Dog' AND is_vaccinated = TRUE;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find dogs that are confirmed vaccinated.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "species,"
      },
      {
        "type": "column",
        "value": "is_vaccinated"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Dog'"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "is_vaccinated"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "TRUE;"
      }
    ]
  },
  {
    "drillNumber": 171,
    "subcluster": "2.8 Compound OR & Precedence",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #171: Find students who live in either Chicago OR Austin",
    "table": "Students",
    "scenario": "Find students who live in either Chicago OR Austin.",
    "businessObjective": "Find students who live in either Chicago OR Austin.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, city\nFROM Students\nWHERE city = 'Chicago' OR city = 'Austin';",
    "syntaxBlueprint": "SELECT full_name, city\nFROM Students\nWHERE city = 'Chicago' OR city = 'Austin';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Find students who live in either Chicago OR Austin.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Chicago'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Austin';"
      }
    ]
  },
  {
    "drillNumber": 172,
    "subcluster": "2.8 Compound OR & Precedence",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #172: Find Sci-Fi OR Mystery books that are priced under $20 (parentheses mandatory!)",
    "table": "Books",
    "scenario": "Find Sci-Fi OR Mystery books that are priced under $20 (parentheses mandatory!).",
    "businessObjective": "Find Sci-Fi OR Mystery books that are priced under $20 (parentheses mandatory!).",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, genre, price\nFROM Books\nWHERE (genre = 'Sci-Fi' OR genre = 'Mystery') AND price < 20.00;",
    "syntaxBlueprint": "SELECT title, genre, price\nFROM Books\nWHERE (genre = 'Sci-Fi' OR genre = 'Mystery') AND price < 20.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find Sci-Fi OR Mystery books that are priced under $20 (parentheses mandatory!).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "(genre"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Sci-Fi'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Mystery')"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "column",
        "value": "<"
      },
      {
        "type": "column",
        "value": "20.00;"
      }
    ]
  },
  {
    "drillNumber": 173,
    "subcluster": "2.8 Compound OR & Precedence",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #173: Find Engineering OR Marketing employees who earn over $70,000",
    "table": "Employees",
    "scenario": "Find Engineering OR Marketing employees who earn over $70,000.",
    "businessObjective": "Find Engineering OR Marketing employees who earn over $70,000.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, department, salary\nFROM Employees\nWHERE (department = 'Engineering' OR department = 'Marketing') AND salary > 70000.00;",
    "syntaxBlueprint": "SELECT first_name, department, salary\nFROM Employees\nWHERE (department = 'Engineering' OR department = 'Marketing') AND salary > 70000.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Find Engineering OR Marketing employees who earn over $70,000.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "(department"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Engineering'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Marketing')"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "70000.00;"
      }
    ]
  },
  {
    "drillNumber": 174,
    "subcluster": "2.8 Compound OR & Precedence",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #174: Find Produce OR Bakery items that cost $5.00 or less",
    "table": "GroceryItems",
    "scenario": "Find Produce OR Bakery items that cost $5.00 or less.",
    "businessObjective": "Find Produce OR Bakery items that cost $5.00 or less.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, category, unit_price\nFROM GroceryItems\nWHERE (category = 'Produce' OR category = 'Bakery') AND unit_price <= 5.00;",
    "syntaxBlueprint": "SELECT item_name, category, unit_price\nFROM GroceryItems\nWHERE (category = 'Produce' OR category = 'Bakery') AND unit_price <= 5.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find Produce OR Bakery items that cost $5.00 or less.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "category,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "(category"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Produce'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "category"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Bakery')"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "column",
        "value": "<="
      },
      {
        "type": "column",
        "value": "5.00;"
      }
    ]
  },
  {
    "drillNumber": 175,
    "subcluster": "2.8 Compound OR & Precedence",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #175: Find unfulfilled orders destined for Denver",
    "table": "Orders",
    "scenario": "Find unfulfilled orders destined for Denver.",
    "businessObjective": "Find unfulfilled orders destined for Denver.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, order_status, shipping_city\nFROM Orders\nWHERE (order_status = 'Processing' OR order_status = 'Pending') AND shipping_city = 'Denver';",
    "syntaxBlueprint": "SELECT order_id, order_status, shipping_city\nFROM Orders\nWHERE (order_status = 'Processing' OR order_status = 'Pending') AND shipping_city = 'Denver';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find unfulfilled orders destined for Denver.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "order_status,"
      },
      {
        "type": "column",
        "value": "shipping_city"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "(order_status"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Processing'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "order_status"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Pending')"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "shipping_city"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Denver';"
      }
    ]
  },
  {
    "drillNumber": 176,
    "subcluster": "2.8 Compound OR & Precedence",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #176: Find Rock or Synthwave tracks with over 50,000 plays",
    "table": "MusicTracks",
    "scenario": "Find Rock or Synthwave tracks with over 50,000 plays.",
    "businessObjective": "Find Rock or Synthwave tracks with over 50,000 plays.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, genre, play_count\nFROM MusicTracks\nWHERE (genre = 'Rock' OR genre = 'Synthwave') AND play_count > 50000;",
    "syntaxBlueprint": "SELECT track_title, genre, play_count\nFROM MusicTracks\nWHERE (genre = 'Rock' OR genre = 'Synthwave') AND play_count > 50000;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find Rock or Synthwave tracks with over 50,000 plays.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "(genre"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Rock'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Synthwave')"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "50000;"
      }
    ]
  },
  {
    "drillNumber": 177,
    "subcluster": "2.8 Compound OR & Precedence",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #177: Find premium members (Gold or Platinum) who have a dedicated trainer",
    "table": "GymMembers",
    "scenario": "Find premium members (Gold or Platinum) who have a dedicated trainer.",
    "businessObjective": "Find premium members (Gold or Platinum) who have a dedicated trainer.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, membership_plan, has_trainer\nFROM GymMembers\nWHERE (membership_plan = 'Gold' OR membership_plan = 'Platinum') AND has_trainer = TRUE;",
    "syntaxBlueprint": "SELECT member_name, membership_plan, has_trainer\nFROM GymMembers\nWHERE (membership_plan = 'Gold' OR membership_plan = 'Platinum') AND has_trainer = TRUE;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Find premium members (Gold or Platinum) who have a dedicated trainer.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "has_trainer"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "(membership_plan"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Gold'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Platinum')"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "has_trainer"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "TRUE;"
      }
    ]
  },
  {
    "drillNumber": 178,
    "subcluster": "2.8 Compound OR & Precedence",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #178: Find top films by either Gerwig or Coppola with 4.0+ stars",
    "table": "MovieReviews",
    "scenario": "Find top films by either Gerwig or Coppola with 4.0+ stars.",
    "businessObjective": "Find top films by either Gerwig or Coppola with 4.0+ stars.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, director, star_rating\nFROM MovieReviews\nWHERE (director = 'Greta Gerwig' OR director = 'Sofia Coppola') AND star_rating >= 4.0;",
    "syntaxBlueprint": "SELECT movie_title, director, star_rating\nFROM MovieReviews\nWHERE (director = 'Greta Gerwig' OR director = 'Sofia Coppola') AND star_rating >= 4.0;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find top films by either Gerwig or Coppola with 4.0+ stars.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "director,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "(director"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Greta"
      },
      {
        "type": "column",
        "value": "Gerwig'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "director"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Sofia"
      },
      {
        "type": "column",
        "value": "Coppola')"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "4.0;"
      }
    ]
  },
  {
    "drillNumber": 179,
    "subcluster": "2.8 Compound OR & Precedence",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #179: Find Chicago flights (ORD or MDW) flying to Los Angeles (LAX)",
    "table": "FlightSchedule",
    "scenario": "Find Chicago flights (ORD or MDW) flying to Los Angeles (LAX).",
    "businessObjective": "Find Chicago flights (ORD or MDW) flying to Los Angeles (LAX).",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, origin_airport, dest_airport\nFROM FlightSchedule\nWHERE (origin_airport = 'ORD' OR origin_airport = 'MDW') AND dest_airport = 'LAX';",
    "syntaxBlueprint": "SELECT flight_id, origin_airport, dest_airport\nFROM FlightSchedule\nWHERE (origin_airport = 'ORD' OR origin_airport = 'MDW') AND dest_airport = 'LAX';",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find Chicago flights (ORD or MDW) flying to Los Angeles (LAX).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "origin_airport,"
      },
      {
        "type": "column",
        "value": "dest_airport"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "(origin_airport"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'ORD'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "origin_airport"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'MDW')"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "dest_airport"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'LAX';"
      }
    ]
  },
  {
    "drillNumber": 180,
    "subcluster": "2.8 Compound OR & Precedence",
    "level": "Level 2 (Compound Logic)",
    "title": "Syntax #180: Find young puppies or kittens under 2 years of age",
    "table": "PetClinic",
    "scenario": "Find young puppies or kittens under 2 years of age.",
    "businessObjective": "Find young puppies or kittens under 2 years of age.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, species, age_years\nFROM PetClinic\nWHERE (species = 'Dog' OR species = 'Cat') AND age_years < 2;",
    "syntaxBlueprint": "SELECT pet_name, species, age_years\nFROM PetClinic\nWHERE (species = 'Dog' OR species = 'Cat') AND age_years < 2;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find young puppies or kittens under 2 years of age.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "species,"
      },
      {
        "type": "column",
        "value": "age_years"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "(species"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Dog'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Cat')"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "age_years"
      },
      {
        "type": "column",
        "value": "<"
      },
      {
        "type": "column",
        "value": "2;"
      }
    ]
  },
  {
    "drillNumber": 181,
    "subcluster": "2.9 3VL & NULL Handling",
    "level": "Level 2 (3-Valued Logic)",
    "title": "Syntax #181: Find all employees who did not receive an annual bonus (bonus IS NULL)",
    "table": "Employees",
    "scenario": "Find all employees who did not receive an annual bonus (bonus IS NULL).",
    "businessObjective": "Find all employees who did not receive an annual bonus (bonus IS NULL).",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, bonus\nFROM Employees\nWHERE bonus IS NULL;",
    "syntaxBlueprint": "SELECT first_name, bonus\nFROM Employees\nWHERE bonus IS NULL;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Find all employees who did not receive an annual bonus (bonus IS NULL).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "bonus"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "bonus"
      },
      {
        "type": "keyword",
        "value": "IS"
      },
      {
        "type": "column",
        "value": "NULL;"
      }
    ]
  },
  {
    "drillNumber": 182,
    "subcluster": "2.9 3VL & NULL Handling",
    "level": "Level 2 (3-Valued Logic)",
    "title": "Syntax #182: Find all employees who have a recorded bonus",
    "table": "Employees",
    "scenario": "Find all employees who have a recorded bonus.",
    "businessObjective": "Find all employees who have a recorded bonus.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, bonus\nFROM Employees\nWHERE bonus IS NOT NULL;",
    "syntaxBlueprint": "SELECT first_name, bonus\nFROM Employees\nWHERE bonus IS NOT NULL;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Find all employees who have a recorded bonus.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "bonus"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "bonus"
      },
      {
        "type": "keyword",
        "value": "IS"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "column",
        "value": "NULL;"
      }
    ]
  },
  {
    "drillNumber": 183,
    "subcluster": "2.9 3VL & NULL Handling",
    "level": "Level 2 (3-Valued Logic)",
    "title": "Syntax #183: Find in-stock books where inventory quantity is verified not null and positive",
    "table": "Books",
    "scenario": "Find in-stock books where inventory quantity is verified not null and positive.",
    "businessObjective": "Find in-stock books where inventory quantity is verified not null and positive.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, stock_qty\nFROM Books\nWHERE stock_qty IS NOT NULL AND stock_qty > 0;",
    "syntaxBlueprint": "SELECT title, stock_qty\nFROM Books\nWHERE stock_qty IS NOT NULL AND stock_qty > 0;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find in-stock books where inventory quantity is verified not null and positive.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "stock_qty"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "stock_qty"
      },
      {
        "type": "keyword",
        "value": "IS"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "NULL"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "stock_qty"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "0;"
      }
    ]
  },
  {
    "drillNumber": 184,
    "subcluster": "2.9 3VL & NULL Handling",
    "level": "Level 2 (3-Valued Logic)",
    "title": "Syntax #184: Find students who have completed their coursework and have a recorded GPA",
    "table": "Students",
    "scenario": "Find students who have completed their coursework and have a recorded GPA.",
    "businessObjective": "Find students who have completed their coursework and have a recorded GPA.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nWHERE gpa IS NOT NULL;",
    "syntaxBlueprint": "SELECT full_name, gpa\nFROM Students\nWHERE gpa IS NOT NULL;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Find students who have completed their coursework and have a recorded GPA.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "IS"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "column",
        "value": "NULL;"
      }
    ]
  },
  {
    "drillNumber": 185,
    "subcluster": "2.9 3VL & NULL Handling",
    "level": "Level 2 (3-Valued Logic)",
    "title": "Syntax #185: Find orders that received no discount",
    "table": "Orders",
    "scenario": "Find orders that received no discount.",
    "businessObjective": "Find orders that received no discount.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, discount_pct\nFROM Orders\nWHERE discount_pct IS NULL OR discount_pct = 0.00;",
    "syntaxBlueprint": "SELECT order_id, discount_pct\nFROM Orders\nWHERE discount_pct IS NULL OR discount_pct = 0.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find orders that received no discount.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "discount_pct"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "discount_pct"
      },
      {
        "type": "keyword",
        "value": "IS"
      },
      {
        "type": "keyword",
        "value": "NULL"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "discount_pct"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "0.00;"
      }
    ]
  },
  {
    "drillNumber": 186,
    "subcluster": "2.9 3VL & NULL Handling",
    "level": "Level 2 (3-Valued Logic)",
    "title": "Syntax #186: Find pet records where the specific breed is documented",
    "table": "PetClinic",
    "scenario": "Find pet records where the specific breed is documented.",
    "businessObjective": "Find pet records where the specific breed is documented.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, breed\nFROM PetClinic\nWHERE breed IS NOT NULL;",
    "syntaxBlueprint": "SELECT pet_name, breed\nFROM PetClinic\nWHERE breed IS NOT NULL;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find pet records where the specific breed is documented.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "breed"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "breed"
      },
      {
        "type": "keyword",
        "value": "IS"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "column",
        "value": "NULL;"
      }
    ]
  },
  {
    "drillNumber": 187,
    "subcluster": "2.9 3VL & NULL Handling",
    "level": "Level 2 (3-Valued Logic)",
    "title": "Syntax #187: Find flights confirmed on-time",
    "table": "FlightSchedule",
    "scenario": "Find flights confirmed on-time.",
    "businessObjective": "Find flights confirmed on-time.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nWHERE delay_minutes IS NOT NULL AND delay_minutes = 0;",
    "syntaxBlueprint": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nWHERE delay_minutes IS NOT NULL AND delay_minutes = 0;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find flights confirmed on-time.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "delay_minutes"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "delay_minutes"
      },
      {
        "type": "keyword",
        "value": "IS"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "NULL"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "delay_minutes"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "0;"
      }
    ]
  },
  {
    "drillNumber": 188,
    "subcluster": "2.9 3VL & NULL Handling",
    "level": "Level 2 (3-Valued Logic)",
    "title": "Syntax #188: Find inactive members with zero visits logged",
    "table": "GymMembers",
    "scenario": "Find inactive members with zero visits logged.",
    "businessObjective": "Find inactive members with zero visits logged.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, visits_this_month\nFROM GymMembers\nWHERE visits_this_month IS NOT NULL AND visits_this_month = 0;",
    "syntaxBlueprint": "SELECT member_name, visits_this_month\nFROM GymMembers\nWHERE visits_this_month IS NOT NULL AND visits_this_month = 0;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Find inactive members with zero visits logged.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "keyword",
        "value": "IS"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "NULL"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "0;"
      }
    ]
  },
  {
    "drillNumber": 189,
    "subcluster": "2.9 3VL & NULL Handling",
    "level": "Level 2 (3-Valued Logic)",
    "title": "Syntax #189: Verify items with valid non-null prices",
    "table": "GroceryItems",
    "scenario": "Verify items with valid non-null prices.",
    "businessObjective": "Verify items with valid non-null prices.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE unit_price IS NOT NULL AND unit_price > 0.00;",
    "syntaxBlueprint": "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE unit_price IS NOT NULL AND unit_price > 0.00;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Verify items with valid non-null prices.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "IS"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "NULL"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "0.00;"
      }
    ]
  },
  {
    "drillNumber": 190,
    "subcluster": "2.9 3VL & NULL Handling",
    "level": "Level 2 (3-Valued Logic)",
    "title": "Syntax #190: Select tracks with verified play metrics",
    "table": "MusicTracks",
    "scenario": "Select tracks with verified play metrics.",
    "businessObjective": "Select tracks with verified play metrics.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, play_count\nFROM MusicTracks\nWHERE play_count IS NOT NULL AND play_count >= 0;",
    "syntaxBlueprint": "SELECT track_title, play_count\nFROM MusicTracks\nWHERE play_count IS NOT NULL AND play_count >= 0;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Select tracks with verified play metrics.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "keyword",
        "value": "IS"
      },
      {
        "type": "keyword",
        "value": "NOT"
      },
      {
        "type": "keyword",
        "value": "NULL"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "0;"
      }
    ]
  },
  {
    "drillNumber": 191,
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #191: Fix the illegal NULL comparison: 'WHERE bonus = NULL;' (evaluates to UNKNOWN and returns 0 rows)",
    "table": "Employees",
    "scenario": "Fix the illegal NULL comparison: 'WHERE bonus = NULL;' (evaluates to UNKNOWN and returns 0 rows).",
    "businessObjective": "Fix the illegal NULL comparison: 'WHERE bonus = NULL;' (evaluates to UNKNOWN and returns 0 rows).",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, bonus\nFROM Employees\nWHERE bonus IS NULL;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM Employees\nWHERE condition;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Fix the illegal NULL comparison: 'WHERE bonus = NULL;' (evaluates to UNKNOWN and returns 0 rows).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "bonus"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "bonus"
      },
      {
        "type": "keyword",
        "value": "IS"
      },
      {
        "type": "column",
        "value": "NULL;"
      }
    ]
  },
  {
    "drillNumber": 192,
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #192: Fix operator precedence bug by adding parentheses around OR conditions",
    "table": "Students",
    "scenario": "Fix operator precedence bug by adding parentheses around OR conditions.",
    "businessObjective": "Fix operator precedence bug by adding parentheses around OR conditions.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, city, gpa\nFROM Students\nWHERE (city = 'Chicago' OR city = 'Seattle') AND gpa > 3.50;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM Students\nWHERE condition;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Fix operator precedence bug by adding parentheses around OR conditions.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "city,"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "(city"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Chicago'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Seattle')"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "3.50;"
      }
    ]
  },
  {
    "drillNumber": 193,
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #193: Fix incorrect range syntax: 'WHERE price BETWEEN 10.00, 25.00;' (BETWEEN uses AND, not comma)",
    "table": "Books",
    "scenario": "Fix incorrect range syntax: 'WHERE price BETWEEN 10.00, 25.00;' (BETWEEN uses AND, not comma).",
    "businessObjective": "Fix incorrect range syntax: 'WHERE price BETWEEN 10.00, 25.00;' (BETWEEN uses AND, not comma).",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price\nFROM Books\nWHERE price BETWEEN 10.00 AND 25.00;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM Books\nWHERE condition;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Fix incorrect range syntax: 'WHERE price BETWEEN 10.00, 25.00;' (BETWEEN uses AND, not comma).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "BETWEEN"
      },
      {
        "type": "column",
        "value": "10.00"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "25.00;"
      }
    ]
  },
  {
    "drillNumber": 194,
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #194: Fix syntax error: 'WHERE category IN Produce, Bakery;' (values in IN must be wrapped in parentheses)",
    "table": "GroceryItems",
    "scenario": "Fix syntax error: 'WHERE category IN Produce, Bakery;' (values in IN must be wrapped in parentheses).",
    "businessObjective": "Fix syntax error: 'WHERE category IN Produce, Bakery;' (values in IN must be wrapped in parentheses).",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, category\nFROM GroceryItems\nWHERE category IN ('Produce', 'Bakery');",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM GroceryItems\nWHERE condition;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Fix syntax error: 'WHERE category IN Produce, Bakery;' (values in IN must be wrapped in parentheses).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "category"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "category"
      },
      {
        "type": "keyword",
        "value": "IN"
      },
      {
        "type": "column",
        "value": "('Produce',"
      },
      {
        "type": "column",
        "value": "'Bakery');"
      }
    ]
  },
  {
    "drillNumber": 195,
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #195: Fix unquoted string identifier: \"WHERE shipping_city = Denver;\" (looks for column named Denver instead of text)",
    "table": "Orders",
    "scenario": "Fix unquoted string identifier: \"WHERE shipping_city = Denver;\" (looks for column named Denver instead of text).",
    "businessObjective": "Fix unquoted string identifier: \"WHERE shipping_city = Denver;\" (looks for column named Denver instead of text).",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, shipping_city\nFROM Orders\nWHERE shipping_city = 'Denver';",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM Orders\nWHERE condition;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Fix unquoted string identifier: \"WHERE shipping_city = Denver;\" (looks for column named Denver instead of text).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "shipping_city"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "shipping_city"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Denver';"
      }
    ]
  },
  {
    "drillNumber": 196,
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #196: Fix assignment syntax: 'WHERE genre = Rock%' (pattern matching requires LIKE, not =)",
    "table": "MusicTracks",
    "scenario": "Fix assignment syntax: 'WHERE genre = Rock%' (pattern matching requires LIKE, not =).",
    "businessObjective": "Fix assignment syntax: 'WHERE genre = Rock%' (pattern matching requires LIKE, not =).",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, genre\nFROM MusicTracks\nWHERE genre LIKE 'Rock%';",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM MusicTracks\nWHERE condition;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Fix assignment syntax: 'WHERE genre = Rock%' (pattern matching requires LIKE, not =).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "LIKE"
      },
      {
        "type": "column",
        "value": "'Rock%';"
      }
    ]
  },
  {
    "drillNumber": 197,
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #197: Fix missing second column comparison: 'WHERE monthly_fee >= 30.00 AND <= 70.00;'",
    "table": "GymMembers",
    "scenario": "Fix missing second column comparison: 'WHERE monthly_fee >= 30.00 AND <= 70.00;'.",
    "businessObjective": "Fix missing second column comparison: 'WHERE monthly_fee >= 30.00 AND <= 70.00;'.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, monthly_fee\nFROM GymMembers\nWHERE monthly_fee >= 30.00 AND monthly_fee <= 70.00;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM GymMembers\nWHERE condition;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Fix missing second column comparison: 'WHERE monthly_fee >= 30.00 AND <= 70.00;'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "monthly_fee"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "monthly_fee"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "30.00"
      },
      {
        "type": "keyword",
        "value": "AND"
      },
      {
        "type": "column",
        "value": "monthly_fee"
      },
      {
        "type": "column",
        "value": "<="
      },
      {
        "type": "column",
        "value": "70.00;"
      }
    ]
  },
  {
    "drillNumber": 198,
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #198: Fix quoted numeric literal: \"WHERE star_rating > '4.0';\" (numeric comparisons should avoid string quotes)",
    "table": "MovieReviews",
    "scenario": "Fix quoted numeric literal: \"WHERE star_rating > '4.0';\" (numeric comparisons should avoid string quotes).",
    "businessObjective": "Fix quoted numeric literal: \"WHERE star_rating > '4.0';\" (numeric comparisons should avoid string quotes).",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE star_rating > 4.0;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM MovieReviews\nWHERE condition;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Fix quoted numeric literal: \"WHERE star_rating > '4.0';\" (numeric comparisons should avoid string quotes).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "4.0;"
      }
    ]
  },
  {
    "drillNumber": 199,
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #199: Fix exclamation mark placement: 'WHERE delay_minutes =! 0;' (must be != or <>)",
    "table": "FlightSchedule",
    "scenario": "Fix exclamation mark placement: 'WHERE delay_minutes =! 0;' (must be != or <>).",
    "businessObjective": "Fix exclamation mark placement: 'WHERE delay_minutes =! 0;' (must be != or <>).",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nWHERE delay_minutes != 0;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM FlightSchedule\nWHERE condition;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Fix exclamation mark placement: 'WHERE delay_minutes =! 0;' (must be != or <>).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "delay_minutes"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "delay_minutes"
      },
      {
        "type": "column",
        "value": "!="
      },
      {
        "type": "column",
        "value": "0;"
      }
    ]
  },
  {
    "drillNumber": 200,
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #200: Fix shorthand OR trap: \"WHERE species = 'Cat' OR 'Dog';\" (each side of OR requires a full boolean test)",
    "table": "PetClinic",
    "scenario": "Fix shorthand OR trap: \"WHERE species = 'Cat' OR 'Dog';\" (each side of OR requires a full boolean test).",
    "businessObjective": "Fix shorthand OR trap: \"WHERE species = 'Cat' OR 'Dog';\" (each side of OR requires a full boolean test).",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, species\nFROM PetClinic\nWHERE species = 'Cat' OR species = 'Dog';",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM PetClinic\nWHERE condition;",
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Fix shorthand OR trap: \"WHERE species = 'Cat' OR 'Dog';\" (each side of OR requires a full boolean test).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Cat'"
      },
      {
        "type": "keyword",
        "value": "OR"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Dog';"
      }
    ]
  },
  {
    "drillNumber": 201,
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #201: Sort students by GPA in ascending order (lowest to highest score)",
    "table": "Students",
    "scenario": "Sort students by GPA in ascending order (lowest to highest score).",
    "businessObjective": "Sort students by GPA in ascending order (lowest to highest score).",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nORDER BY gpa ASC;",
    "syntaxBlueprint": "SELECT full_name, gpa\nFROM Students\nORDER BY gpa ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Sort students by GPA in ascending order (lowest to highest score).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 202,
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #202: Display books ordered by price from cheapest to most expensive",
    "table": "Books",
    "scenario": "Display books ordered by price from cheapest to most expensive.",
    "businessObjective": "Display books ordered by price from cheapest to most expensive.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price\nFROM Books\nORDER BY price ASC;",
    "syntaxBlueprint": "SELECT title, price\nFROM Books\nORDER BY price ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Display books ordered by price from cheapest to most expensive.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 203,
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #203: List employees ordered chronologically by hire_date (most senior first)",
    "table": "Employees",
    "scenario": "List employees ordered chronologically by hire_date (most senior first).",
    "businessObjective": "List employees ordered chronologically by hire_date (most senior first).",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, hire_date\nFROM Employees\nORDER BY hire_date ASC;",
    "syntaxBlueprint": "SELECT first_name, hire_date\nFROM Employees\nORDER BY hire_date ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: List employees ordered chronologically by hire_date (most senior first).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "hire_date"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "hire_date"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 204,
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #204: Order grocery items by unit price ascending",
    "table": "GroceryItems",
    "scenario": "Order grocery items by unit price ascending.",
    "businessObjective": "Order grocery items by unit price ascending.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY unit_price ASC;",
    "syntaxBlueprint": "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY unit_price ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Order grocery items by unit price ascending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 205,
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #205: Sort customer orders from smallest to largest quantity",
    "table": "Orders",
    "scenario": "Sort customer orders from smallest to largest quantity.",
    "businessObjective": "Sort customer orders from smallest to largest quantity.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, quantity\nFROM Orders\nORDER BY quantity ASC;",
    "syntaxBlueprint": "SELECT order_id, quantity\nFROM Orders\nORDER BY quantity ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Sort customer orders from smallest to largest quantity.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "quantity"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "quantity"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 206,
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #206: Order music tracks from shortest to longest duration",
    "table": "MusicTracks",
    "scenario": "Order music tracks from shortest to longest duration.",
    "businessObjective": "Order music tracks from shortest to longest duration.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, duration_seconds\nFROM MusicTracks\nORDER BY duration_seconds ASC;",
    "syntaxBlueprint": "SELECT track_title, duration_seconds\nFROM MusicTracks\nORDER BY duration_seconds ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Order music tracks from shortest to longest duration.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "duration_seconds"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "duration_seconds"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 207,
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #207: List gym members by join date from earliest to latest",
    "table": "GymMembers",
    "scenario": "List gym members by join date from earliest to latest.",
    "businessObjective": "List gym members by join date from earliest to latest.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, join_date\nFROM GymMembers\nORDER BY join_date ASC;",
    "syntaxBlueprint": "SELECT member_name, join_date\nFROM GymMembers\nORDER BY join_date ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: List gym members by join date from earliest to latest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "join_date"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "join_date"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 208,
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #208: Order movies chronologically by release year from oldest to newest",
    "table": "MovieReviews",
    "scenario": "Order movies chronologically by release year from oldest to newest.",
    "businessObjective": "Order movies chronologically by release year from oldest to newest.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, release_year\nFROM MovieReviews\nORDER BY release_year ASC;",
    "syntaxBlueprint": "SELECT movie_title, release_year\nFROM MovieReviews\nORDER BY release_year ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Order movies chronologically by release year from oldest to newest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "release_year"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "release_year"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 209,
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #209: Display flights ordered by departure time from earliest morning to latest night",
    "table": "FlightSchedule",
    "scenario": "Display flights ordered by departure time from earliest morning to latest night.",
    "businessObjective": "Display flights ordered by departure time from earliest morning to latest night.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, departure_time\nFROM FlightSchedule\nORDER BY departure_time ASC;",
    "syntaxBlueprint": "SELECT flight_id, departure_time\nFROM FlightSchedule\nORDER BY departure_time ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Display flights ordered by departure time from earliest morning to latest night.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "departure_time"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "departure_time"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 210,
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #210: Sort veterinary patients by age from youngest to oldest",
    "table": "PetClinic",
    "scenario": "Sort veterinary patients by age from youngest to oldest.",
    "businessObjective": "Sort veterinary patients by age from youngest to oldest.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, age_years\nFROM PetClinic\nORDER BY age_years ASC;",
    "syntaxBlueprint": "SELECT pet_name, age_years\nFROM PetClinic\nORDER BY age_years ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort veterinary patients by age from youngest to oldest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "age_years"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "age_years"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 211,
    "subcluster": "3.2 Single Column Descending (DESC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #211: Rank students by GPA descending (highest academic score first)",
    "table": "Students",
    "scenario": "Rank students by GPA descending (highest academic score first).",
    "businessObjective": "Rank students by GPA descending (highest academic score first).",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nORDER BY gpa DESC;",
    "syntaxBlueprint": "SELECT full_name, gpa\nFROM Students\nORDER BY gpa DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Rank students by GPA descending (highest academic score first).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 212,
    "subcluster": "3.2 Single Column Descending (DESC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #212: List books ordered from highest to lowest price",
    "table": "Books",
    "scenario": "List books ordered from highest to lowest price.",
    "businessObjective": "List books ordered from highest to lowest price.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price\nFROM Books\nORDER BY price DESC;",
    "syntaxBlueprint": "SELECT title, price\nFROM Books\nORDER BY price DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: List books ordered from highest to lowest price.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 213,
    "subcluster": "3.2 Single Column Descending (DESC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #213: Order employees by annual salary from highest earner to lowest",
    "table": "Employees",
    "scenario": "Order employees by annual salary from highest earner to lowest.",
    "businessObjective": "Order employees by annual salary from highest earner to lowest.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary\nFROM Employees\nORDER BY salary DESC;",
    "syntaxBlueprint": "SELECT first_name, salary\nFROM Employees\nORDER BY salary DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Order employees by annual salary from highest earner to lowest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 214,
    "subcluster": "3.2 Single Column Descending (DESC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #214: View grocery items sorted by stock units from most abundant to least",
    "table": "GroceryItems",
    "scenario": "View grocery items sorted by stock units from most abundant to least.",
    "businessObjective": "View grocery items sorted by stock units from most abundant to least.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, stock_units\nFROM GroceryItems\nORDER BY stock_units DESC;",
    "syntaxBlueprint": "SELECT item_name, stock_units\nFROM GroceryItems\nORDER BY stock_units DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: View grocery items sorted by stock units from most abundant to least.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "stock_units"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "stock_units"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 215,
    "subcluster": "3.2 Single Column Descending (DESC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #215: Order customer purchases by unit price descending",
    "table": "Orders",
    "scenario": "Order customer purchases by unit price descending.",
    "businessObjective": "Order customer purchases by unit price descending.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, unit_price\nFROM Orders\nORDER BY unit_price DESC;",
    "syntaxBlueprint": "SELECT order_id, unit_price\nFROM Orders\nORDER BY unit_price DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Order customer purchases by unit price descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 216,
    "subcluster": "3.2 Single Column Descending (DESC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #216: Sort playlist by play count descending to find top hits",
    "table": "MusicTracks",
    "scenario": "Sort playlist by play count descending to find top hits.",
    "businessObjective": "Sort playlist by play count descending to find top hits.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, play_count\nFROM MusicTracks\nORDER BY play_count DESC;",
    "syntaxBlueprint": "SELECT track_title, play_count\nFROM MusicTracks\nORDER BY play_count DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Sort playlist by play count descending to find top hits.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 217,
    "subcluster": "3.2 Single Column Descending (DESC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #217: Rank gym members by monthly attendance from highest to lowest",
    "table": "GymMembers",
    "scenario": "Rank gym members by monthly attendance from highest to lowest.",
    "businessObjective": "Rank gym members by monthly attendance from highest to lowest.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, visits_this_month\nFROM GymMembers\nORDER BY visits_this_month DESC;",
    "syntaxBlueprint": "SELECT member_name, visits_this_month\nFROM GymMembers\nORDER BY visits_this_month DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Rank gym members by monthly attendance from highest to lowest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 218,
    "subcluster": "3.2 Single Column Descending (DESC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #218: Sort movie reviews by star rating descending (best reviewed films first)",
    "table": "MovieReviews",
    "scenario": "Sort movie reviews by star rating descending (best reviewed films first).",
    "businessObjective": "Sort movie reviews by star rating descending (best reviewed films first).",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY star_rating DESC;",
    "syntaxBlueprint": "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY star_rating DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Sort movie reviews by star rating descending (best reviewed films first).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 219,
    "subcluster": "3.2 Single Column Descending (DESC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #219: Order flight schedule by ticket price descending",
    "table": "FlightSchedule",
    "scenario": "Order flight schedule by ticket price descending.",
    "businessObjective": "Order flight schedule by ticket price descending.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, ticket_price\nFROM FlightSchedule\nORDER BY ticket_price DESC;",
    "syntaxBlueprint": "SELECT flight_id, ticket_price\nFROM FlightSchedule\nORDER BY ticket_price DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Order flight schedule by ticket price descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "ticket_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "ticket_price"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 220,
    "subcluster": "3.2 Single Column Descending (DESC)",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #220: Sort clinic patients by weight in kilograms descending",
    "table": "PetClinic",
    "scenario": "Sort clinic patients by weight in kilograms descending.",
    "businessObjective": "Sort clinic patients by weight in kilograms descending.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, weight_kg\nFROM PetClinic\nORDER BY weight_kg DESC;",
    "syntaxBlueprint": "SELECT pet_name, weight_kg\nFROM PetClinic\nORDER BY weight_kg DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort clinic patients by weight in kilograms descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "weight_kg"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "weight_kg"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 221,
    "subcluster": "3.3 Multi-Column Sorting",
    "level": "Level 2 (Multi-Key Sorting)",
    "title": "Syntax #221: Sort students first by city alphabetically, and within each city by GPA descending",
    "table": "Students",
    "scenario": "Sort students first by city alphabetically, and within each city by GPA descending.",
    "businessObjective": "Sort students first by city alphabetically, and within each city by GPA descending.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT city, full_name, gpa\nFROM Students\nORDER BY city ASC, gpa DESC;",
    "syntaxBlueprint": "SELECT city, full_name, gpa\nFROM Students\nORDER BY city ASC, gpa DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Sort students first by city alphabetically, and within each city by GPA descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "city,"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 222,
    "subcluster": "3.3 Multi-Column Sorting",
    "level": "Level 2 (Multi-Key Sorting)",
    "title": "Syntax #222: Sort books by genre alphabetically, and then by price ascending",
    "table": "Books",
    "scenario": "Sort books by genre alphabetically, and then by price ascending.",
    "businessObjective": "Sort books by genre alphabetically, and then by price ascending.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT genre, title, price\nFROM Books\nORDER BY genre ASC, price ASC;",
    "syntaxBlueprint": "SELECT genre, title, price\nFROM Books\nORDER BY genre ASC, price ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Sort books by genre alphabetically, and then by price ascending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 223,
    "subcluster": "3.3 Multi-Column Sorting",
    "level": "Level 2 (Multi-Key Sorting)",
    "title": "Syntax #223: Group output by department alphabetically, then sort by highest salary descending",
    "table": "Employees",
    "scenario": "Group output by department alphabetically, then sort by highest salary descending.",
    "businessObjective": "Group output by department alphabetically, then sort by highest salary descending.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT department, salary, first_name\nFROM Employees\nORDER BY department ASC, salary DESC;",
    "syntaxBlueprint": "SELECT department, salary, first_name\nFROM Employees\nORDER BY department ASC, salary DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Group output by department alphabetically, then sort by highest salary descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "salary,"
      },
      {
        "type": "column",
        "value": "first_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 224,
    "subcluster": "3.3 Multi-Column Sorting",
    "level": "Level 2 (Multi-Key Sorting)",
    "title": "Syntax #224: Order grocery items by category alphabetically, then by price cheapest first",
    "table": "GroceryItems",
    "scenario": "Order grocery items by category alphabetically, then by price cheapest first.",
    "businessObjective": "Order grocery items by category alphabetically, then by price cheapest first.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT category, item_name, unit_price\nFROM GroceryItems\nORDER BY category ASC, unit_price ASC;",
    "syntaxBlueprint": "SELECT category, item_name, unit_price\nFROM GroceryItems\nORDER BY category ASC, unit_price ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Order grocery items by category alphabetically, then by price cheapest first.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "category,"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "category"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 225,
    "subcluster": "3.3 Multi-Column Sorting",
    "level": "Level 2 (Multi-Key Sorting)",
    "title": "Syntax #225: Sort orders primarily by shipping city, secondarily by order status",
    "table": "Orders",
    "scenario": "Sort orders primarily by shipping city, secondarily by order status.",
    "businessObjective": "Sort orders primarily by shipping city, secondarily by order status.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT shipping_city, order_status, order_id\nFROM Orders\nORDER BY shipping_city ASC, order_status ASC;",
    "syntaxBlueprint": "SELECT shipping_city, order_status, order_id\nFROM Orders\nORDER BY shipping_city ASC, order_status ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Sort orders primarily by shipping city, secondarily by order status.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "shipping_city,"
      },
      {
        "type": "column",
        "value": "order_status,"
      },
      {
        "type": "column",
        "value": "order_id"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "shipping_city"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "order_status"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 226,
    "subcluster": "3.3 Multi-Column Sorting",
    "level": "Level 2 (Multi-Key Sorting)",
    "title": "Syntax #226: Sort tracks by genre alphabetically, then by play count descending",
    "table": "MusicTracks",
    "scenario": "Sort tracks by genre alphabetically, then by play count descending.",
    "businessObjective": "Sort tracks by genre alphabetically, then by play count descending.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT genre, play_count, track_title\nFROM MusicTracks\nORDER BY genre ASC, play_count DESC;",
    "syntaxBlueprint": "SELECT genre, play_count, track_title\nFROM MusicTracks\nORDER BY genre ASC, play_count DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Sort tracks by genre alphabetically, then by play count descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "play_count,"
      },
      {
        "type": "column",
        "value": "track_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 227,
    "subcluster": "3.3 Multi-Column Sorting",
    "level": "Level 2 (Multi-Key Sorting)",
    "title": "Syntax #227: Sort gym members by plan tier, then by monthly visits descending",
    "table": "GymMembers",
    "scenario": "Sort gym members by plan tier, then by monthly visits descending.",
    "businessObjective": "Sort gym members by plan tier, then by monthly visits descending.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT membership_plan, visits_this_month, member_name\nFROM GymMembers\nORDER BY membership_plan ASC, visits_this_month DESC;",
    "syntaxBlueprint": "SELECT membership_plan, visits_this_month, member_name\nFROM GymMembers\nORDER BY membership_plan ASC, visits_this_month DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Sort gym members by plan tier, then by monthly visits descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "visits_this_month,"
      },
      {
        "type": "column",
        "value": "member_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 228,
    "subcluster": "3.3 Multi-Column Sorting",
    "level": "Level 2 (Multi-Key Sorting)",
    "title": "Syntax #228: Sort movie reviews by genre, then by star rating highest first",
    "table": "MovieReviews",
    "scenario": "Sort movie reviews by genre, then by star rating highest first.",
    "businessObjective": "Sort movie reviews by genre, then by star rating highest first.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT genre, star_rating, movie_title\nFROM MovieReviews\nORDER BY genre ASC, star_rating DESC;",
    "syntaxBlueprint": "SELECT genre, star_rating, movie_title\nFROM MovieReviews\nORDER BY genre ASC, star_rating DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Sort movie reviews by genre, then by star rating highest first.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "star_rating,"
      },
      {
        "type": "column",
        "value": "movie_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 229,
    "subcluster": "3.3 Multi-Column Sorting",
    "level": "Level 2 (Multi-Key Sorting)",
    "title": "Syntax #229: Order flights by origin airport, then chronologically by departure time",
    "table": "FlightSchedule",
    "scenario": "Order flights by origin airport, then chronologically by departure time.",
    "businessObjective": "Order flights by origin airport, then chronologically by departure time.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT origin_airport, departure_time, flight_id\nFROM FlightSchedule\nORDER BY origin_airport ASC, departure_time ASC;",
    "syntaxBlueprint": "SELECT origin_airport, departure_time, flight_id\nFROM FlightSchedule\nORDER BY origin_airport ASC, departure_time ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Order flights by origin airport, then chronologically by departure time.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "origin_airport,"
      },
      {
        "type": "column",
        "value": "departure_time,"
      },
      {
        "type": "column",
        "value": "flight_id"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "origin_airport"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "departure_time"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 230,
    "subcluster": "3.3 Multi-Column Sorting",
    "level": "Level 2 (Multi-Key Sorting)",
    "title": "Syntax #230: Sort clinic patients by species, then by weight from heaviest to lightest",
    "table": "PetClinic",
    "scenario": "Sort clinic patients by species, then by weight from heaviest to lightest.",
    "businessObjective": "Sort clinic patients by species, then by weight from heaviest to lightest.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT species, weight_kg, pet_name\nFROM PetClinic\nORDER BY species ASC, weight_kg DESC;",
    "syntaxBlueprint": "SELECT species, weight_kg, pet_name\nFROM PetClinic\nORDER BY species ASC, weight_kg DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort clinic patients by species, then by weight from heaviest to lightest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "species,"
      },
      {
        "type": "column",
        "value": "weight_kg,"
      },
      {
        "type": "column",
        "value": "pet_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "weight_kg"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 231,
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "level": "Level 2 (Determinism)",
    "title": "Syntax #231: Sort by city with student_id as a deterministic primary key tie-breaker",
    "table": "Students",
    "scenario": "Sort by city with student_id as a deterministic primary key tie-breaker.",
    "businessObjective": "Sort by city with student_id as a deterministic primary key tie-breaker.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT city, student_id, full_name\nFROM Students\nORDER BY city ASC, student_id ASC;",
    "syntaxBlueprint": "SELECT city, student_id, full_name\nFROM Students\nORDER BY city ASC, student_id ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Sort by city with student_id as a deterministic primary key tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "city,"
      },
      {
        "type": "column",
        "value": "student_id,"
      },
      {
        "type": "column",
        "value": "full_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "city"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "student_id"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 232,
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "level": "Level 2 (Determinism)",
    "title": "Syntax #232: Sort books by genre with book_id tie-breaker to prevent row-hopping",
    "table": "Books",
    "scenario": "Sort books by genre with book_id tie-breaker to prevent row-hopping.",
    "businessObjective": "Sort books by genre with book_id tie-breaker to prevent row-hopping.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT genre, book_id, title\nFROM Books\nORDER BY genre ASC, book_id ASC;",
    "syntaxBlueprint": "SELECT genre, book_id, title\nFROM Books\nORDER BY genre ASC, book_id ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Sort books by genre with book_id tie-breaker to prevent row-hopping.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "book_id,"
      },
      {
        "type": "column",
        "value": "title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "book_id"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 233,
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "level": "Level 2 (Determinism)",
    "title": "Syntax #233: Order by department with emp_id tie-breaker",
    "table": "Employees",
    "scenario": "Order by department with emp_id tie-breaker.",
    "businessObjective": "Order by department with emp_id tie-breaker.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT department, emp_id, first_name\nFROM Employees\nORDER BY department ASC, emp_id ASC;",
    "syntaxBlueprint": "SELECT department, emp_id, first_name\nFROM Employees\nORDER BY department ASC, emp_id ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Order by department with emp_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "emp_id,"
      },
      {
        "type": "column",
        "value": "first_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "emp_id"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 234,
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "level": "Level 2 (Determinism)",
    "title": "Syntax #234: Sort grocery items by category with unique item_id tie-breaker",
    "table": "GroceryItems",
    "scenario": "Sort grocery items by category with unique item_id tie-breaker.",
    "businessObjective": "Sort grocery items by category with unique item_id tie-breaker.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT category, item_id, item_name\nFROM GroceryItems\nORDER BY category ASC, item_id ASC;",
    "syntaxBlueprint": "SELECT category, item_id, item_name\nFROM GroceryItems\nORDER BY category ASC, item_id ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Sort grocery items by category with unique item_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "category,"
      },
      {
        "type": "column",
        "value": "item_id,"
      },
      {
        "type": "column",
        "value": "item_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "category"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "item_id"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 235,
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "level": "Level 2 (Determinism)",
    "title": "Syntax #235: Order by status with order_id tie-breaker",
    "table": "Orders",
    "scenario": "Order by status with order_id tie-breaker.",
    "businessObjective": "Order by status with order_id tie-breaker.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_status, order_id, customer_name\nFROM Orders\nORDER BY order_status ASC, order_id ASC;",
    "syntaxBlueprint": "SELECT order_status, order_id, customer_name\nFROM Orders\nORDER BY order_status ASC, order_id ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Order by status with order_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_status,"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "customer_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "order_status"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "order_id"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 236,
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "level": "Level 2 (Determinism)",
    "title": "Syntax #236: Sort by artist name with track_id tie-breaker",
    "table": "MusicTracks",
    "scenario": "Sort by artist name with track_id tie-breaker.",
    "businessObjective": "Sort by artist name with track_id tie-breaker.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT artist_name, track_id, track_title\nFROM MusicTracks\nORDER BY artist_name ASC, track_id ASC;",
    "syntaxBlueprint": "SELECT artist_name, track_id, track_title\nFROM MusicTracks\nORDER BY artist_name ASC, track_id ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Sort by artist name with track_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "artist_name,"
      },
      {
        "type": "column",
        "value": "track_id,"
      },
      {
        "type": "column",
        "value": "track_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "artist_name"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "track_id"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 237,
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "level": "Level 2 (Determinism)",
    "title": "Syntax #237: Sort by membership plan with member_id tie-breaker",
    "table": "GymMembers",
    "scenario": "Sort by membership plan with member_id tie-breaker.",
    "businessObjective": "Sort by membership plan with member_id tie-breaker.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT membership_plan, member_id, member_name\nFROM GymMembers\nORDER BY membership_plan ASC, member_id ASC;",
    "syntaxBlueprint": "SELECT membership_plan, member_id, member_name\nFROM GymMembers\nORDER BY membership_plan ASC, member_id ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Sort by membership plan with member_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "member_id,"
      },
      {
        "type": "column",
        "value": "member_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "member_id"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 238,
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "level": "Level 2 (Determinism)",
    "title": "Syntax #238: Sort by director with review_id tie-breaker",
    "table": "MovieReviews",
    "scenario": "Sort by director with review_id tie-breaker.",
    "businessObjective": "Sort by director with review_id tie-breaker.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT director, review_id, movie_title\nFROM MovieReviews\nORDER BY director ASC, review_id ASC;",
    "syntaxBlueprint": "SELECT director, review_id, movie_title\nFROM MovieReviews\nORDER BY director ASC, review_id ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Sort by director with review_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "director,"
      },
      {
        "type": "column",
        "value": "review_id,"
      },
      {
        "type": "column",
        "value": "movie_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "director"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "review_id"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 239,
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "level": "Level 2 (Determinism)",
    "title": "Syntax #239: Sort by airline with flight_id tie-breaker",
    "table": "FlightSchedule",
    "scenario": "Sort by airline with flight_id tie-breaker.",
    "businessObjective": "Sort by airline with flight_id tie-breaker.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT airline, flight_id\nFROM FlightSchedule\nORDER BY airline ASC, flight_id ASC;",
    "syntaxBlueprint": "SELECT airline, flight_id\nFROM FlightSchedule\nORDER BY airline ASC, flight_id ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Sort by airline with flight_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "airline,"
      },
      {
        "type": "column",
        "value": "flight_id"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "airline"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "flight_id"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 240,
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "level": "Level 2 (Determinism)",
    "title": "Syntax #240: Sort by owner city with pet_id tie-breaker",
    "table": "PetClinic",
    "scenario": "Sort by owner city with pet_id tie-breaker.",
    "businessObjective": "Sort by owner city with pet_id tie-breaker.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT owner_city, pet_id, pet_name\nFROM PetClinic\nORDER BY owner_city ASC, pet_id ASC;",
    "syntaxBlueprint": "SELECT owner_city, pet_id, pet_name\nFROM PetClinic\nORDER BY owner_city ASC, pet_id ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort by owner city with pet_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "owner_city,"
      },
      {
        "type": "column",
        "value": "pet_id,"
      },
      {
        "type": "column",
        "value": "pet_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "owner_city"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "pet_id"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 241,
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "level": "Level 2 (Aliases & Calculations)",
    "title": "Syntax #241: Calculate inventory value and sort by the alias inventory_val descending",
    "table": "Books",
    "scenario": "Calculate inventory value and sort by the alias inventory_val descending.",
    "businessObjective": "Calculate inventory value and sort by the alias inventory_val descending.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price, stock_qty, (price * stock_qty) AS inventory_val\nFROM Books\nORDER BY inventory_val DESC;",
    "syntaxBlueprint": "SELECT title, price, stock_qty, (price * stock_qty) AS inventory_val\nFROM Books\nORDER BY inventory_val DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Calculate inventory value and sort by the alias inventory_val descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price,"
      },
      {
        "type": "column",
        "value": "stock_qty,"
      },
      {
        "type": "column",
        "value": "(price"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "stock_qty)"
      },
      {
        "type": "column",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "inventory_val"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "inventory_val"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 242,
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "level": "Level 2 (Aliases & Calculations)",
    "title": "Syntax #242: Compute order subtotal and sort by the alias subtotal descending",
    "table": "Orders",
    "scenario": "Compute order subtotal and sort by the alias subtotal descending.",
    "businessObjective": "Compute order subtotal and sort by the alias subtotal descending.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, unit_price, quantity, (unit_price * quantity) AS subtotal\nFROM Orders\nORDER BY subtotal DESC;",
    "syntaxBlueprint": "SELECT order_id, unit_price, quantity, (unit_price * quantity) AS subtotal\nFROM Orders\nORDER BY subtotal DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Compute order subtotal and sort by the alias subtotal descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "unit_price,"
      },
      {
        "type": "column",
        "value": "quantity,"
      },
      {
        "type": "column",
        "value": "(unit_price"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "quantity)"
      },
      {
        "type": "column",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "subtotal"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "subtotal"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 243,
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "level": "Level 2 (Aliases & Calculations)",
    "title": "Syntax #243: Compute total compensation (salary + bonus) and sort by total_comp descending",
    "table": "Employees",
    "scenario": "Compute total compensation (salary + bonus) and sort by total_comp descending.",
    "businessObjective": "Compute total compensation (salary + bonus) and sort by total_comp descending.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary, bonus, (salary + COALESCE(bonus, 0)) AS total_comp\nFROM Employees\nORDER BY total_comp DESC;",
    "syntaxBlueprint": "SELECT first_name, salary, bonus, (salary + COALESCE(bonus, 0)) AS total_comp\nFROM Employees\nORDER BY total_comp DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Compute total compensation (salary + bonus) and sort by total_comp descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "salary,"
      },
      {
        "type": "column",
        "value": "bonus,"
      },
      {
        "type": "column",
        "value": "(salary"
      },
      {
        "type": "column",
        "value": "+"
      },
      {
        "type": "column",
        "value": "COALESCE(bonus,"
      },
      {
        "type": "column",
        "value": "0))"
      },
      {
        "type": "column",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_comp"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "total_comp"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 244,
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "level": "Level 2 (Aliases & Calculations)",
    "title": "Syntax #244: Calculate tax_price and sort by the alias tax_price ascending",
    "table": "GroceryItems",
    "scenario": "Calculate tax_price and sort by the alias tax_price ascending.",
    "businessObjective": "Calculate tax_price and sort by the alias tax_price ascending.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price, (unit_price * 1.08) AS tax_price\nFROM GroceryItems\nORDER BY tax_price ASC;",
    "syntaxBlueprint": "SELECT item_name, unit_price, (unit_price * 1.08) AS tax_price\nFROM GroceryItems\nORDER BY tax_price ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Calculate tax_price and sort by the alias tax_price ascending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price,"
      },
      {
        "type": "column",
        "value": "(unit_price"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "1.08)"
      },
      {
        "type": "column",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "tax_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "tax_price"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 245,
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "level": "Level 2 (Aliases & Calculations)",
    "title": "Syntax #245: Compute pct_score and sort by pct_score descending",
    "table": "Students",
    "scenario": "Compute pct_score and sort by pct_score descending.",
    "businessObjective": "Compute pct_score and sort by pct_score descending.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, gpa, (gpa * 25.0) AS pct_score\nFROM Students\nORDER BY pct_score DESC;",
    "syntaxBlueprint": "SELECT full_name, gpa, (gpa * 25.0) AS pct_score\nFROM Students\nORDER BY pct_score DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Compute pct_score and sort by pct_score descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "gpa,"
      },
      {
        "type": "column",
        "value": "(gpa"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "25.0)"
      },
      {
        "type": "column",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "pct_score"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "pct_score"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 246,
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "level": "Level 2 (Aliases & Calculations)",
    "title": "Syntax #246: Convert to minutes and sort by the alias mins descending",
    "table": "MusicTracks",
    "scenario": "Convert to minutes and sort by the alias mins descending.",
    "businessObjective": "Convert to minutes and sort by the alias mins descending.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, duration_seconds, (duration_seconds / 60.0) AS mins\nFROM MusicTracks\nORDER BY mins DESC;",
    "syntaxBlueprint": "SELECT track_title, duration_seconds, (duration_seconds / 60.0) AS mins\nFROM MusicTracks\nORDER BY mins DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Convert to minutes and sort by the alias mins descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "duration_seconds,"
      },
      {
        "type": "column",
        "value": "(duration_seconds"
      },
      {
        "type": "column",
        "value": "/"
      },
      {
        "type": "column",
        "value": "60.0)"
      },
      {
        "type": "column",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "mins"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "mins"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 247,
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "level": "Level 2 (Aliases & Calculations)",
    "title": "Syntax #247: Compute annual dues and sort by annual_dues ascending",
    "table": "GymMembers",
    "scenario": "Compute annual dues and sort by annual_dues ascending.",
    "businessObjective": "Compute annual dues and sort by annual_dues ascending.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, monthly_fee, (monthly_fee * 12) AS annual_dues\nFROM GymMembers\nORDER BY annual_dues ASC;",
    "syntaxBlueprint": "SELECT member_name, monthly_fee, (monthly_fee * 12) AS annual_dues\nFROM GymMembers\nORDER BY annual_dues ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Compute annual dues and sort by annual_dues ascending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "monthly_fee,"
      },
      {
        "type": "column",
        "value": "(monthly_fee"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "12)"
      },
      {
        "type": "column",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "annual_dues"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "annual_dues"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 248,
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "level": "Level 2 (Aliases & Calculations)",
    "title": "Syntax #248: Add baggage fee to ticket price and sort by total_fare ascending",
    "table": "FlightSchedule",
    "scenario": "Add baggage fee to ticket price and sort by total_fare ascending.",
    "businessObjective": "Add baggage fee to ticket price and sort by total_fare ascending.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, ticket_price, (ticket_price + 35.00) AS total_fare\nFROM FlightSchedule\nORDER BY total_fare ASC;",
    "syntaxBlueprint": "SELECT flight_id, ticket_price, (ticket_price + 35.00) AS total_fare\nFROM FlightSchedule\nORDER BY total_fare ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Add baggage fee to ticket price and sort by total_fare ascending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "ticket_price,"
      },
      {
        "type": "column",
        "value": "(ticket_price"
      },
      {
        "type": "column",
        "value": "+"
      },
      {
        "type": "column",
        "value": "35.00)"
      },
      {
        "type": "column",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_fare"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "total_fare"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 249,
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "level": "Level 2 (Aliases & Calculations)",
    "title": "Syntax #249: Convert weight to lbs and sort by lbs descending",
    "table": "PetClinic",
    "scenario": "Convert weight to lbs and sort by lbs descending.",
    "businessObjective": "Convert weight to lbs and sort by lbs descending.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, weight_kg, (weight_kg * 2.20462) AS lbs\nFROM PetClinic\nORDER BY lbs DESC;",
    "syntaxBlueprint": "SELECT pet_name, weight_kg, (weight_kg * 2.20462) AS lbs\nFROM PetClinic\nORDER BY lbs DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Convert weight to lbs and sort by lbs descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "weight_kg,"
      },
      {
        "type": "column",
        "value": "(weight_kg"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "2.20462)"
      },
      {
        "type": "column",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "lbs"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "lbs"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 250,
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "level": "Level 2 (Aliases & Calculations)",
    "title": "Syntax #250: Compute movie age and sort by age ascending (newest films first)",
    "table": "MovieReviews",
    "scenario": "Compute movie age and sort by age ascending (newest films first).",
    "businessObjective": "Compute movie age and sort by age ascending (newest films first).",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, release_year, (2026 - release_year) AS age\nFROM MovieReviews\nORDER BY age ASC;",
    "syntaxBlueprint": "SELECT movie_title, release_year, (2026 - release_year) AS age\nFROM MovieReviews\nORDER BY age ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Compute movie age and sort by age ascending (newest films first).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "release_year,"
      },
      {
        "type": "column",
        "value": "(2026"
      },
      {
        "type": "column",
        "value": "-"
      },
      {
        "type": "column",
        "value": "release_year)"
      },
      {
        "type": "column",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "age"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "age"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 251,
    "subcluster": "3.6 Sorting by Functions",
    "level": "Level 2 (Functions)",
    "title": "Syntax #251: Sort students by the character length of their full name from longest to shortest",
    "table": "Students",
    "scenario": "Sort students by the character length of their full name from longest to shortest.",
    "businessObjective": "Sort students by the character length of their full name from longest to shortest.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name\nFROM Students\nORDER BY LENGTH(full_name) DESC;",
    "syntaxBlueprint": "SELECT full_name\nFROM Students\nORDER BY LENGTH(full_name) DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Sort students by the character length of their full name from longest to shortest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "LENGTH(full_name)"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 252,
    "subcluster": "3.6 Sorting by Functions",
    "level": "Level 2 (Functions)",
    "title": "Syntax #252: Sort book titles by character length from shortest to longest",
    "table": "Books",
    "scenario": "Sort book titles by character length from shortest to longest.",
    "businessObjective": "Sort book titles by character length from shortest to longest.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title\nFROM Books\nORDER BY LENGTH(title) ASC;",
    "syntaxBlueprint": "SELECT title\nFROM Books\nORDER BY LENGTH(title) ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Sort book titles by character length from shortest to longest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "LENGTH(title)"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 253,
    "subcluster": "3.6 Sorting by Functions",
    "level": "Level 2 (Functions)",
    "title": "Syntax #253: Order employees by hire year descending, then hire month descending",
    "table": "Employees",
    "scenario": "Order employees by hire year descending, then hire month descending.",
    "businessObjective": "Order employees by hire year descending, then hire month descending.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, hire_date\nFROM Employees\nORDER BY YEAR(hire_date) DESC, MONTH(hire_date) DESC;",
    "syntaxBlueprint": "SELECT first_name, hire_date\nFROM Employees\nORDER BY YEAR(hire_date) DESC, MONTH(hire_date) DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Order employees by hire year descending, then hire month descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "hire_date"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "YEAR(hire_date)"
      },
      {
        "type": "column",
        "value": "DESC,"
      },
      {
        "type": "column",
        "value": "MONTH(hire_date)"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 254,
    "subcluster": "3.6 Sorting by Functions",
    "level": "Level 2 (Functions)",
    "title": "Syntax #254: Sort grocery items by their rounded whole-dollar unit price descending",
    "table": "GroceryItems",
    "scenario": "Sort grocery items by their rounded whole-dollar unit price descending.",
    "businessObjective": "Sort grocery items by their rounded whole-dollar unit price descending.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY ROUND(unit_price) DESC;",
    "syntaxBlueprint": "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY ROUND(unit_price) DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Sort grocery items by their rounded whole-dollar unit price descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "ROUND(unit_price)"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 255,
    "subcluster": "3.6 Sorting by Functions",
    "level": "Level 2 (Functions)",
    "title": "Syntax #255: Sort customer names in case-insensitive alphabetical order using LOWER()",
    "table": "Orders",
    "scenario": "Sort customer names in case-insensitive alphabetical order using LOWER().",
    "businessObjective": "Sort customer names in case-insensitive alphabetical order using LOWER().",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT customer_name\nFROM Orders\nORDER BY LOWER(customer_name) ASC;",
    "syntaxBlueprint": "SELECT customer_name\nFROM Orders\nORDER BY LOWER(customer_name) ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Sort customer names in case-insensitive alphabetical order using LOWER().",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "customer_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "LOWER(customer_name)"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 256,
    "subcluster": "3.6 Sorting by Functions",
    "level": "Level 2 (Functions)",
    "title": "Syntax #256: Sort song titles by character count from longest to shortest",
    "table": "MusicTracks",
    "scenario": "Sort song titles by character count from longest to shortest.",
    "businessObjective": "Sort song titles by character count from longest to shortest.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title\nFROM MusicTracks\nORDER BY LENGTH(track_title) DESC;",
    "syntaxBlueprint": "SELECT track_title\nFROM MusicTracks\nORDER BY LENGTH(track_title) DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Sort song titles by character count from longest to shortest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "LENGTH(track_title)"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 257,
    "subcluster": "3.6 Sorting by Functions",
    "level": "Level 2 (Functions)",
    "title": "Syntax #257: Order gym members chronologically by the year they joined",
    "table": "GymMembers",
    "scenario": "Order gym members chronologically by the year they joined.",
    "businessObjective": "Order gym members chronologically by the year they joined.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, join_date\nFROM GymMembers\nORDER BY YEAR(join_date) ASC;",
    "syntaxBlueprint": "SELECT member_name, join_date\nFROM GymMembers\nORDER BY YEAR(join_date) ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Order gym members chronologically by the year they joined.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "join_date"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "YEAR(join_date)"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 258,
    "subcluster": "3.6 Sorting by Functions",
    "level": "Level 2 (Functions)",
    "title": "Syntax #258: Sort movie reviews by rounded star rating descending",
    "table": "MovieReviews",
    "scenario": "Sort movie reviews by rounded star rating descending.",
    "businessObjective": "Sort movie reviews by rounded star rating descending.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY ROUND(star_rating) DESC;",
    "syntaxBlueprint": "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY ROUND(star_rating) DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Sort movie reviews by rounded star rating descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "ROUND(star_rating)"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 259,
    "subcluster": "3.6 Sorting by Functions",
    "level": "Level 2 (Functions)",
    "title": "Syntax #259: Sort origin airport codes alphabetically using UPPER()",
    "table": "FlightSchedule",
    "scenario": "Sort origin airport codes alphabetically using UPPER().",
    "businessObjective": "Sort origin airport codes alphabetically using UPPER().",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, origin_airport\nFROM FlightSchedule\nORDER BY UPPER(origin_airport) ASC;",
    "syntaxBlueprint": "SELECT flight_id, origin_airport\nFROM FlightSchedule\nORDER BY UPPER(origin_airport) ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Sort origin airport codes alphabetically using UPPER().",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "origin_airport"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "UPPER(origin_airport)"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 260,
    "subcluster": "3.6 Sorting by Functions",
    "level": "Level 2 (Functions)",
    "title": "Syntax #260: Sort pet names by length from shortest to longest",
    "table": "PetClinic",
    "scenario": "Sort pet names by length from shortest to longest.",
    "businessObjective": "Sort pet names by length from shortest to longest.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name\nFROM PetClinic\nORDER BY LENGTH(pet_name) ASC;",
    "syntaxBlueprint": "SELECT pet_name\nFROM PetClinic\nORDER BY LENGTH(pet_name) ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort pet names by length from shortest to longest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "LENGTH(pet_name)"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 261,
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "level": "Level 2 (Positional)",
    "title": "Syntax #261: Sort by column position: 1st column (city) ASC, 2nd column (full_name) ASC",
    "table": "Students",
    "scenario": "Sort by column position: 1st column (city) ASC, 2nd column (full_name) ASC.",
    "businessObjective": "Sort by column position: 1st column (city) ASC, 2nd column (full_name) ASC.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT city, full_name\nFROM Students\nORDER BY 1 ASC, 2 ASC;",
    "syntaxBlueprint": "SELECT city, full_name\nFROM Students\nORDER BY 1 ASC, 2 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Sort by column position: 1st column (city) ASC, 2nd column (full_name) ASC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "city,"
      },
      {
        "type": "column",
        "value": "full_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 262,
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "level": "Level 2 (Positional)",
    "title": "Syntax #262: Sort by position: 1st column (genre) ASC, 2nd column (price) DESC",
    "table": "Books",
    "scenario": "Sort by position: 1st column (genre) ASC, 2nd column (price) DESC.",
    "businessObjective": "Sort by position: 1st column (genre) ASC, 2nd column (price) DESC.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT genre, price\nFROM Books\nORDER BY 1 ASC, 2 DESC;",
    "syntaxBlueprint": "SELECT genre, price\nFROM Books\nORDER BY 1 ASC, 2 DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Sort by position: 1st column (genre) ASC, 2nd column (price) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 263,
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "level": "Level 2 (Positional)",
    "title": "Syntax #263: Sort by position: 1st column (department) ASC, 2nd column (salary) DESC",
    "table": "Employees",
    "scenario": "Sort by position: 1st column (department) ASC, 2nd column (salary) DESC.",
    "businessObjective": "Sort by position: 1st column (department) ASC, 2nd column (salary) DESC.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT department, salary\nFROM Employees\nORDER BY 1 ASC, 2 DESC;",
    "syntaxBlueprint": "SELECT department, salary\nFROM Employees\nORDER BY 1 ASC, 2 DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Sort by position: 1st column (department) ASC, 2nd column (salary) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 264,
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "level": "Level 2 (Positional)",
    "title": "Syntax #264: Sort by position: 1st column (category) ASC, 2nd column (item_name) ASC",
    "table": "GroceryItems",
    "scenario": "Sort by position: 1st column (category) ASC, 2nd column (item_name) ASC.",
    "businessObjective": "Sort by position: 1st column (category) ASC, 2nd column (item_name) ASC.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT category, item_name\nFROM GroceryItems\nORDER BY 1 ASC, 2 ASC;",
    "syntaxBlueprint": "SELECT category, item_name\nFROM GroceryItems\nORDER BY 1 ASC, 2 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Sort by position: 1st column (category) ASC, 2nd column (item_name) ASC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "category,"
      },
      {
        "type": "column",
        "value": "item_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 265,
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "level": "Level 2 (Positional)",
    "title": "Syntax #265: Sort by position: 1st column (shipping_city) ASC, 2nd column (unit_price) DESC",
    "table": "Orders",
    "scenario": "Sort by position: 1st column (shipping_city) ASC, 2nd column (unit_price) DESC.",
    "businessObjective": "Sort by position: 1st column (shipping_city) ASC, 2nd column (unit_price) DESC.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT shipping_city, unit_price\nFROM Orders\nORDER BY 1 ASC, 2 DESC;",
    "syntaxBlueprint": "SELECT shipping_city, unit_price\nFROM Orders\nORDER BY 1 ASC, 2 DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Sort by position: 1st column (shipping_city) ASC, 2nd column (unit_price) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "shipping_city,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 266,
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "level": "Level 2 (Positional)",
    "title": "Syntax #266: Sort by position: 1st column (genre) ASC, 2nd column (play_count) DESC",
    "table": "MusicTracks",
    "scenario": "Sort by position: 1st column (genre) ASC, 2nd column (play_count) DESC.",
    "businessObjective": "Sort by position: 1st column (genre) ASC, 2nd column (play_count) DESC.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT genre, play_count\nFROM MusicTracks\nORDER BY 1 ASC, 2 DESC;",
    "syntaxBlueprint": "SELECT genre, play_count\nFROM MusicTracks\nORDER BY 1 ASC, 2 DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Sort by position: 1st column (genre) ASC, 2nd column (play_count) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 267,
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "level": "Level 2 (Positional)",
    "title": "Syntax #267: Sort by position: 1st column (plan) ASC, 2nd column (fee) ASC",
    "table": "GymMembers",
    "scenario": "Sort by position: 1st column (plan) ASC, 2nd column (fee) ASC.",
    "businessObjective": "Sort by position: 1st column (plan) ASC, 2nd column (fee) ASC.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT membership_plan, monthly_fee\nFROM GymMembers\nORDER BY 1 ASC, 2 ASC;",
    "syntaxBlueprint": "SELECT membership_plan, monthly_fee\nFROM GymMembers\nORDER BY 1 ASC, 2 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Sort by position: 1st column (plan) ASC, 2nd column (fee) ASC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "monthly_fee"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 268,
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "level": "Level 2 (Positional)",
    "title": "Syntax #268: Sort by position: 1st column (genre) ASC, 2nd column (star_rating) DESC",
    "table": "MovieReviews",
    "scenario": "Sort by position: 1st column (genre) ASC, 2nd column (star_rating) DESC.",
    "businessObjective": "Sort by position: 1st column (genre) ASC, 2nd column (star_rating) DESC.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT genre, star_rating\nFROM MovieReviews\nORDER BY 1 ASC, 2 DESC;",
    "syntaxBlueprint": "SELECT genre, star_rating\nFROM MovieReviews\nORDER BY 1 ASC, 2 DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Sort by position: 1st column (genre) ASC, 2nd column (star_rating) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 269,
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "level": "Level 2 (Positional)",
    "title": "Syntax #269: Sort by position: 1st column (origin) ASC, 2nd column (dest) ASC",
    "table": "FlightSchedule",
    "scenario": "Sort by position: 1st column (origin) ASC, 2nd column (dest) ASC.",
    "businessObjective": "Sort by position: 1st column (origin) ASC, 2nd column (dest) ASC.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT origin_airport, dest_airport\nFROM FlightSchedule\nORDER BY 1 ASC, 2 ASC;",
    "syntaxBlueprint": "SELECT origin_airport, dest_airport\nFROM FlightSchedule\nORDER BY 1 ASC, 2 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Sort by position: 1st column (origin) ASC, 2nd column (dest) ASC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "origin_airport,"
      },
      {
        "type": "column",
        "value": "dest_airport"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 270,
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "level": "Level 2 (Positional)",
    "title": "Syntax #270: Sort by position: 1st column (species) ASC, 2nd column (weight) DESC",
    "table": "PetClinic",
    "scenario": "Sort by position: 1st column (species) ASC, 2nd column (weight) DESC.",
    "businessObjective": "Sort by position: 1st column (species) ASC, 2nd column (weight) DESC.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT species, weight_kg\nFROM PetClinic\nORDER BY 1 ASC, 2 DESC;",
    "syntaxBlueprint": "SELECT species, weight_kg\nFROM PetClinic\nORDER BY 1 ASC, 2 DESC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort by position: 1st column (species) ASC, 2nd column (weight) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "species,"
      },
      {
        "type": "column",
        "value": "weight_kg"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 271,
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "level": "Level 2 (Top-N)",
    "title": "Syntax #271: Find the single top-scoring student (Valedictorian) using ORDER BY gpa DESC LIMIT 1",
    "table": "Students",
    "scenario": "Find the single top-scoring student (Valedictorian) using ORDER BY gpa DESC LIMIT 1.",
    "businessObjective": "Find the single top-scoring student (Valedictorian) using ORDER BY gpa DESC LIMIT 1.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nORDER BY gpa DESC\nLIMIT 1;",
    "syntaxBlueprint": "SELECT full_name, gpa\nFROM Students\nORDER BY gpa DESC\nLIMIT 1;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Find the single top-scoring student (Valedictorian) using ORDER BY gpa DESC LIMIT 1.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "1;"
      }
    ]
  },
  {
    "drillNumber": 272,
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "level": "Level 2 (Top-N)",
    "title": "Syntax #272: Find the Top 3 most expensive books in the bookstore",
    "table": "Books",
    "scenario": "Find the Top 3 most expensive books in the bookstore.",
    "businessObjective": "Find the Top 3 most expensive books in the bookstore.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price\nFROM Books\nORDER BY price DESC\nLIMIT 3;",
    "syntaxBlueprint": "SELECT title, price\nFROM Books\nORDER BY price DESC\nLIMIT 3;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Find the Top 3 most expensive books in the bookstore.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "3;"
      }
    ]
  },
  {
    "drillNumber": 273,
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "level": "Level 2 (Top-N)",
    "title": "Syntax #273: Retrieve the Top 5 highest-paid employees in the company",
    "table": "Employees",
    "scenario": "Retrieve the Top 5 highest-paid employees in the company.",
    "businessObjective": "Retrieve the Top 5 highest-paid employees in the company.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary\nFROM Employees\nORDER BY salary DESC\nLIMIT 5;",
    "syntaxBlueprint": "SELECT first_name, salary\nFROM Employees\nORDER BY salary DESC\nLIMIT 5;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Retrieve the Top 5 highest-paid employees in the company.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5;"
      }
    ]
  },
  {
    "drillNumber": 274,
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "level": "Level 2 (Top-N)",
    "title": "Syntax #274: Find the 3 cheapest grocery items in the store",
    "table": "GroceryItems",
    "scenario": "Find the 3 cheapest grocery items in the store.",
    "businessObjective": "Find the 3 cheapest grocery items in the store.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY unit_price ASC\nLIMIT 3;",
    "syntaxBlueprint": "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY unit_price ASC\nLIMIT 3;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Find the 3 cheapest grocery items in the store.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "3;"
      }
    ]
  },
  {
    "drillNumber": 275,
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "level": "Level 2 (Top-N)",
    "title": "Syntax #275: Find the 5 largest customer orders by quantity",
    "table": "Orders",
    "scenario": "Find the 5 largest customer orders by quantity.",
    "businessObjective": "Find the 5 largest customer orders by quantity.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, quantity\nFROM Orders\nORDER BY quantity DESC\nLIMIT 5;",
    "syntaxBlueprint": "SELECT order_id, quantity\nFROM Orders\nORDER BY quantity DESC\nLIMIT 5;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Find the 5 largest customer orders by quantity.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "quantity"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "quantity"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5;"
      }
    ]
  },
  {
    "drillNumber": 276,
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "level": "Level 2 (Top-N)",
    "title": "Syntax #276: Fetch the Top 10 most played tracks for the streaming leaderboard",
    "table": "MusicTracks",
    "scenario": "Fetch the Top 10 most played tracks for the streaming leaderboard.",
    "businessObjective": "Fetch the Top 10 most played tracks for the streaming leaderboard.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, play_count\nFROM MusicTracks\nORDER BY play_count DESC\nLIMIT 10;",
    "syntaxBlueprint": "SELECT track_title, play_count\nFROM MusicTracks\nORDER BY play_count DESC\nLIMIT 10;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Fetch the Top 10 most played tracks for the streaming leaderboard.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "play_count"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "10;"
      }
    ]
  },
  {
    "drillNumber": 277,
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "level": "Level 2 (Top-N)",
    "title": "Syntax #277: Identify the Top 3 most active gym members of the month",
    "table": "GymMembers",
    "scenario": "Identify the Top 3 most active gym members of the month.",
    "businessObjective": "Identify the Top 3 most active gym members of the month.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, visits_this_month\nFROM GymMembers\nORDER BY visits_this_month DESC\nLIMIT 3;",
    "syntaxBlueprint": "SELECT member_name, visits_this_month\nFROM GymMembers\nORDER BY visits_this_month DESC\nLIMIT 3;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Identify the Top 3 most active gym members of the month.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "3;"
      }
    ]
  },
  {
    "drillNumber": 278,
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "level": "Level 2 (Top-N)",
    "title": "Syntax #278: Display the Top 5 highest-rated movies of all time",
    "table": "MovieReviews",
    "scenario": "Display the Top 5 highest-rated movies of all time.",
    "businessObjective": "Display the Top 5 highest-rated movies of all time.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY star_rating DESC\nLIMIT 5;",
    "syntaxBlueprint": "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY star_rating DESC\nLIMIT 5;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Display the Top 5 highest-rated movies of all time.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5;"
      }
    ]
  },
  {
    "drillNumber": 279,
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "level": "Level 2 (Top-N)",
    "title": "Syntax #279: Find the 3 flights with the worst arrival delays",
    "table": "FlightSchedule",
    "scenario": "Find the 3 flights with the worst arrival delays.",
    "businessObjective": "Find the 3 flights with the worst arrival delays.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nORDER BY delay_minutes DESC\nLIMIT 3;",
    "syntaxBlueprint": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nORDER BY delay_minutes DESC\nLIMIT 3;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Find the 3 flights with the worst arrival delays.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "delay_minutes"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "delay_minutes"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "3;"
      }
    ]
  },
  {
    "drillNumber": 280,
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "level": "Level 2 (Top-N)",
    "title": "Syntax #280: Find the single heaviest animal patient registered at the clinic",
    "table": "PetClinic",
    "scenario": "Find the single heaviest animal patient registered at the clinic.",
    "businessObjective": "Find the single heaviest animal patient registered at the clinic.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, weight_kg\nFROM PetClinic\nORDER BY weight_kg DESC\nLIMIT 1;",
    "syntaxBlueprint": "SELECT pet_name, weight_kg\nFROM PetClinic\nORDER BY weight_kg DESC\nLIMIT 1;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Find the single heaviest animal patient registered at the clinic.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "weight_kg"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "weight_kg"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "1;"
      }
    ]
  },
  {
    "drillNumber": 281,
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "level": "Level 2 (Pagination)",
    "title": "Syntax #281: Fetch Page 1 of the student directory (5 rows, skip 0)",
    "table": "Students",
    "scenario": "Fetch Page 1 of the student directory (5 rows, skip 0).",
    "businessObjective": "Fetch Page 1 of the student directory (5 rows, skip 0).",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT student_id, full_name\nFROM Students\nORDER BY student_id ASC\nLIMIT 5 OFFSET 0;",
    "syntaxBlueprint": "SELECT student_id, full_name\nFROM Students\nORDER BY student_id ASC\nLIMIT 5 OFFSET 0;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Fetch Page 1 of the student directory (5 rows, skip 0).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "student_id,"
      },
      {
        "type": "column",
        "value": "full_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "student_id"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "0;"
      }
    ]
  },
  {
    "drillNumber": 282,
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "level": "Level 2 (Pagination)",
    "title": "Syntax #282: Fetch Page 2 of the student directory (5 rows, skip 5)",
    "table": "Students",
    "scenario": "Fetch Page 2 of the student directory (5 rows, skip 5).",
    "businessObjective": "Fetch Page 2 of the student directory (5 rows, skip 5).",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT student_id, full_name\nFROM Students\nORDER BY student_id ASC\nLIMIT 5 OFFSET 5;",
    "syntaxBlueprint": "SELECT student_id, full_name\nFROM Students\nORDER BY student_id ASC\nLIMIT 5 OFFSET 5;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Fetch Page 2 of the student directory (5 rows, skip 5).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "student_id,"
      },
      {
        "type": "column",
        "value": "full_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "student_id"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "5;"
      }
    ]
  },
  {
    "drillNumber": 283,
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "level": "Level 2 (Pagination)",
    "title": "Syntax #283: Fetch Page 1 of the book catalog (5 rows, skip 0)",
    "table": "Books",
    "scenario": "Fetch Page 1 of the book catalog (5 rows, skip 0).",
    "businessObjective": "Fetch Page 1 of the book catalog (5 rows, skip 0).",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT book_id, title\nFROM Books\nORDER BY book_id ASC\nLIMIT 5 OFFSET 0;",
    "syntaxBlueprint": "SELECT book_id, title\nFROM Books\nORDER BY book_id ASC\nLIMIT 5 OFFSET 0;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Fetch Page 1 of the book catalog (5 rows, skip 0).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "book_id,"
      },
      {
        "type": "column",
        "value": "title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "book_id"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "0;"
      }
    ]
  },
  {
    "drillNumber": 284,
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "level": "Level 2 (Pagination)",
    "title": "Syntax #284: Fetch Page 2 of the book catalog (5 rows, skip 5)",
    "table": "Books",
    "scenario": "Fetch Page 2 of the book catalog (5 rows, skip 5).",
    "businessObjective": "Fetch Page 2 of the book catalog (5 rows, skip 5).",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT book_id, title\nFROM Books\nORDER BY book_id ASC\nLIMIT 5 OFFSET 5;",
    "syntaxBlueprint": "SELECT book_id, title\nFROM Books\nORDER BY book_id ASC\nLIMIT 5 OFFSET 5;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Fetch Page 2 of the book catalog (5 rows, skip 5).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "book_id,"
      },
      {
        "type": "column",
        "value": "title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "book_id"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "5;"
      }
    ]
  },
  {
    "drillNumber": 285,
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "level": "Level 2 (Pagination)",
    "title": "Syntax #285: Fetch Page 2 of the employee roster (page size 4, offset 4)",
    "table": "Employees",
    "scenario": "Fetch Page 2 of the employee roster (page size 4, offset 4).",
    "businessObjective": "Fetch Page 2 of the employee roster (page size 4, offset 4).",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT emp_id, first_name\nFROM Employees\nORDER BY emp_id ASC\nLIMIT 4 OFFSET 4;",
    "syntaxBlueprint": "SELECT emp_id, first_name\nFROM Employees\nORDER BY emp_id ASC\nLIMIT 4 OFFSET 4;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Fetch Page 2 of the employee roster (page size 4, offset 4).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "emp_id,"
      },
      {
        "type": "column",
        "value": "first_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "emp_id"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "4"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "4;"
      }
    ]
  },
  {
    "drillNumber": 286,
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "level": "Level 2 (Pagination)",
    "title": "Syntax #286: Fetch Page 3 of the grocery items list (page size 5, offset 10)",
    "table": "GroceryItems",
    "scenario": "Fetch Page 3 of the grocery items list (page size 5, offset 10).",
    "businessObjective": "Fetch Page 3 of the grocery items list (page size 5, offset 10).",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_id, item_name\nFROM GroceryItems\nORDER BY item_id ASC\nLIMIT 5 OFFSET 10;",
    "syntaxBlueprint": "SELECT item_id, item_name\nFROM GroceryItems\nORDER BY item_id ASC\nLIMIT 5 OFFSET 10;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Fetch Page 3 of the grocery items list (page size 5, offset 10).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_id,"
      },
      {
        "type": "column",
        "value": "item_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "item_id"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "10;"
      }
    ]
  },
  {
    "drillNumber": 287,
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "level": "Level 2 (Pagination)",
    "title": "Syntax #287: Fetch Page 2 of the track list (page size 5, skip 5)",
    "table": "MusicTracks",
    "scenario": "Fetch Page 2 of the track list (page size 5, skip 5).",
    "businessObjective": "Fetch Page 2 of the track list (page size 5, skip 5).",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_id, track_title\nFROM MusicTracks\nORDER BY track_id ASC\nLIMIT 5 OFFSET 5;",
    "syntaxBlueprint": "SELECT track_id, track_title\nFROM MusicTracks\nORDER BY track_id ASC\nLIMIT 5 OFFSET 5;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Fetch Page 2 of the track list (page size 5, skip 5).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_id,"
      },
      {
        "type": "column",
        "value": "track_title"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "track_id"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "5;"
      }
    ]
  },
  {
    "drillNumber": 288,
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "level": "Level 2 (Pagination)",
    "title": "Syntax #288: Fetch Page 3 of order history (page size 3, skip 6)",
    "table": "Orders",
    "scenario": "Fetch Page 3 of order history (page size 3, skip 6).",
    "businessObjective": "Fetch Page 3 of order history (page size 3, skip 6).",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, customer_name\nFROM Orders\nORDER BY order_id ASC\nLIMIT 3 OFFSET 6;",
    "syntaxBlueprint": "SELECT order_id, customer_name\nFROM Orders\nORDER BY order_id ASC\nLIMIT 3 OFFSET 6;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Fetch Page 3 of order history (page size 3, skip 6).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "customer_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "order_id"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "3"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "6;"
      }
    ]
  },
  {
    "drillNumber": 289,
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "level": "Level 2 (Pagination)",
    "title": "Syntax #289: Fetch Page 1 of gym memberships (page size 4, skip 0)",
    "table": "GymMembers",
    "scenario": "Fetch Page 1 of gym memberships (page size 4, skip 0).",
    "businessObjective": "Fetch Page 1 of gym memberships (page size 4, skip 0).",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_id, member_name\nFROM GymMembers\nORDER BY member_id ASC\nLIMIT 4 OFFSET 0;",
    "syntaxBlueprint": "SELECT member_id, member_name\nFROM GymMembers\nORDER BY member_id ASC\nLIMIT 4 OFFSET 0;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Fetch Page 1 of gym memberships (page size 4, skip 0).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_id,"
      },
      {
        "type": "column",
        "value": "member_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "member_id"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "4"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "0;"
      }
    ]
  },
  {
    "drillNumber": 290,
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "level": "Level 2 (Pagination)",
    "title": "Syntax #290: Fetch Page 2 of clinic patient records (page size 5, skip 5)",
    "table": "PetClinic",
    "scenario": "Fetch Page 2 of clinic patient records (page size 5, skip 5).",
    "businessObjective": "Fetch Page 2 of clinic patient records (page size 5, skip 5).",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_id, pet_name\nFROM PetClinic\nORDER BY pet_id ASC\nLIMIT 5 OFFSET 5;",
    "syntaxBlueprint": "SELECT pet_id, pet_name\nFROM PetClinic\nORDER BY pet_id ASC\nLIMIT 5 OFFSET 5;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Fetch Page 2 of clinic patient records (page size 5, skip 5).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_id,"
      },
      {
        "type": "column",
        "value": "pet_name"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "pet_id"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "5;"
      }
    ]
  },
  {
    "drillNumber": 291,
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #291: Fix the clause sequence error: 'LIMIT 5 ORDER BY price DESC;' (ORDER BY must precede LIMIT)",
    "table": "Books",
    "scenario": "Fix the clause sequence error: 'LIMIT 5 ORDER BY price DESC;' (ORDER BY must precede LIMIT).",
    "businessObjective": "Fix the clause sequence error: 'LIMIT 5 ORDER BY price DESC;' (ORDER BY must precede LIMIT).",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price\nFROM Books\nORDER BY price DESC\nLIMIT 5;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM Books\nORDER BY col_1 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Fix the clause sequence error: 'LIMIT 5 ORDER BY price DESC;' (ORDER BY must precede LIMIT).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "title,"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "price"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5;"
      }
    ]
  },
  {
    "drillNumber": 292,
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #292: Fix the misspelled sort order keyword: 'ORDER BY gpa DESENDING;' (must be DESC)",
    "table": "Students",
    "scenario": "Fix the misspelled sort order keyword: 'ORDER BY gpa DESENDING;' (must be DESC).",
    "businessObjective": "Fix the misspelled sort order keyword: 'ORDER BY gpa DESENDING;' (must be DESC).",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nORDER BY gpa DESC;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM Students\nORDER BY col_1 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Fix the misspelled sort order keyword: 'ORDER BY gpa DESENDING;' (must be DESC).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "full_name,"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "gpa"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 293,
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #293: Fix missing ORDER BY when requesting top record: 'SELECT first_name, salary FROM Employees LIMIT 1;' (produces arbitrary row without ORDER BY)",
    "table": "Employees",
    "scenario": "Fix missing ORDER BY when requesting top record: 'SELECT first_name, salary FROM Employees LIMIT 1;' (produces arbitrary row without ORDER BY).",
    "businessObjective": "Fix missing ORDER BY when requesting top record: 'SELECT first_name, salary FROM Employees LIMIT 1;' (produces arbitrary row without ORDER BY).",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary\nFROM Employees\nORDER BY salary DESC\nLIMIT 1;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM Employees\nORDER BY col_1 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Fix missing ORDER BY when requesting top record: 'SELECT first_name, salary FROM Employees LIMIT 1;' (produces arbitrary row without ORDER BY).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "first_name,"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "1;"
      }
    ]
  },
  {
    "drillNumber": 294,
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #294: Fix missing BY keyword: 'ORDER unit_price ASC;' (must be ORDER BY)",
    "table": "GroceryItems",
    "scenario": "Fix missing BY keyword: 'ORDER unit_price ASC;' (must be ORDER BY).",
    "businessObjective": "Fix missing BY keyword: 'ORDER unit_price ASC;' (must be ORDER BY).",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY unit_price ASC;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM GroceryItems\nORDER BY col_1 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Fix missing BY keyword: 'ORDER unit_price ASC;' (must be ORDER BY).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "item_name,"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 295,
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #295: Fix syntax error sorting by computed expression: ensure total alias is recognized in ORDER BY",
    "table": "Orders",
    "scenario": "Fix syntax error sorting by computed expression: ensure total alias is recognized in ORDER BY.",
    "businessObjective": "Fix syntax error sorting by computed expression: ensure total alias is recognized in ORDER BY.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, quantity * unit_price AS total\nFROM Orders\nORDER BY total DESC;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM Orders\nORDER BY col_1 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Fix syntax error sorting by computed expression: ensure total alias is recognized in ORDER BY.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_id,"
      },
      {
        "type": "column",
        "value": "quantity"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "unit_price"
      },
      {
        "type": "column",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "total"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 296,
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #296: Fix comma used in OFFSET syntax: 'LIMIT 10, OFFSET 0;' (no comma before OFFSET)",
    "table": "MusicTracks",
    "scenario": "Fix comma used in OFFSET syntax: 'LIMIT 10, OFFSET 0;' (no comma before OFFSET).",
    "businessObjective": "Fix comma used in OFFSET syntax: 'LIMIT 10, OFFSET 0;' (no comma before OFFSET).",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, duration_seconds\nFROM MusicTracks\nORDER BY duration_seconds ASC\nLIMIT 10 OFFSET 0;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM MusicTracks\nORDER BY col_1 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Fix comma used in OFFSET syntax: 'LIMIT 10, OFFSET 0;' (no comma before OFFSET).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "track_title,"
      },
      {
        "type": "column",
        "value": "duration_seconds"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "duration_seconds"
      },
      {
        "type": "keyword",
        "value": "ASC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "10"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "0;"
      }
    ]
  },
  {
    "drillNumber": 297,
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #297: Fix missing comma between multiple sort columns: 'ORDER BY membership_plan ASC visits_this_month DESC;'",
    "table": "GymMembers",
    "scenario": "Fix missing comma between multiple sort columns: 'ORDER BY membership_plan ASC visits_this_month DESC;'.",
    "businessObjective": "Fix missing comma between multiple sort columns: 'ORDER BY membership_plan ASC visits_this_month DESC;'.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, membership_plan, visits_this_month\nFROM GymMembers\nORDER BY membership_plan ASC, visits_this_month DESC;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM GymMembers\nORDER BY col_1 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Fix missing comma between multiple sort columns: 'ORDER BY membership_plan ASC visits_this_month DESC;'.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "member_name,"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "column",
        "value": "ASC,"
      },
      {
        "type": "column",
        "value": "visits_this_month"
      },
      {
        "type": "column",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 298,
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #298: Fix invalid position number in ORDER BY: 'ORDER BY 0 DESC;' (column positions are 1-indexed)",
    "table": "MovieReviews",
    "scenario": "Fix invalid position number in ORDER BY: 'ORDER BY 0 DESC;' (column positions are 1-indexed).",
    "businessObjective": "Fix invalid position number in ORDER BY: 'ORDER BY 0 DESC;' (column positions are 1-indexed).",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY star_rating DESC\nLIMIT 3;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM MovieReviews\nORDER BY col_1 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Fix invalid position number in ORDER BY: 'ORDER BY 0 DESC;' (column positions are 1-indexed).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "movie_title,"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "3;"
      }
    ]
  },
  {
    "drillNumber": 299,
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #299: Fix semicolon placed before ORDER BY: 'FROM FlightSchedule; ORDER BY departure_time ASC;'",
    "table": "FlightSchedule",
    "scenario": "Fix semicolon placed before ORDER BY: 'FROM FlightSchedule; ORDER BY departure_time ASC;'.",
    "businessObjective": "Fix semicolon placed before ORDER BY: 'FROM FlightSchedule; ORDER BY departure_time ASC;'.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, departure_time\nFROM FlightSchedule\nORDER BY departure_time ASC;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM FlightSchedule\nORDER BY col_1 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Fix semicolon placed before ORDER BY: 'FROM FlightSchedule; ORDER BY departure_time ASC;'.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "flight_id,"
      },
      {
        "type": "column",
        "value": "departure_time"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "departure_time"
      },
      {
        "type": "column",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 300,
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "level": "Level 3 (Bug Hunts)",
    "title": "Syntax #300: Fix reversed LIMIT and OFFSET order: 'OFFSET 10 LIMIT 5;' (LIMIT must precede OFFSET in standard SQL)",
    "table": "PetClinic",
    "scenario": "Fix reversed LIMIT and OFFSET order: 'OFFSET 10 LIMIT 5;' (LIMIT must precede OFFSET in standard SQL).",
    "businessObjective": "Fix reversed LIMIT and OFFSET order: 'OFFSET 10 LIMIT 5;' (LIMIT must precede OFFSET in standard SQL).",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, weight_kg\nFROM PetClinic\nORDER BY weight_kg DESC\nLIMIT 5 OFFSET 10;",
    "syntaxBlueprint": "SELECT col_1, col_2\nFROM PetClinic\nORDER BY col_1 ASC;",
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Fix reversed LIMIT and OFFSET order: 'OFFSET 10 LIMIT 5;' (LIMIT must precede OFFSET in standard SQL).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "pet_name,"
      },
      {
        "type": "column",
        "value": "weight_kg"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "weight_kg"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5"
      },
      {
        "type": "keyword",
        "value": "OFFSET"
      },
      {
        "type": "column",
        "value": "10;"
      }
    ]
  },
  {
    "drillNumber": 301,
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #301: Count the total number of enrolled students across all majors",
    "table": "Students",
    "scenario": "Count the total number of enrolled students across all majors.",
    "businessObjective": "Count the total number of enrolled students across all majors.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT COUNT(*) AS total_students\nFROM Students;",
    "syntaxBlueprint": "SELECT COUNT(*) AS total_students\nFROM Students;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Count the total number of enrolled students across all majors.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.1 Basic COUNT & Non-Null Values on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_students"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 302,
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #302: Count total book titles available in the inventory",
    "table": "Books",
    "scenario": "Count total book titles available in the inventory.",
    "businessObjective": "Count total book titles available in the inventory.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT COUNT(book_id) AS total_titles\nFROM Books;",
    "syntaxBlueprint": "SELECT COUNT(book_id) AS total_titles\nFROM Books;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Count total book titles available in the inventory.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.1 Basic COUNT & Non-Null Values on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(book_id)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_titles"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 303,
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #303: Compute the total headcount of all employees in the directory",
    "table": "Employees",
    "scenario": "Compute the total headcount of all employees in the directory.",
    "businessObjective": "Compute the total headcount of all employees in the directory.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT COUNT(*) AS total_staff\nFROM Employees;",
    "syntaxBlueprint": "SELECT COUNT(*) AS total_staff\nFROM Employees;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Compute the total headcount of all employees in the directory.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.1 Basic COUNT & Non-Null Values on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_staff"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 304,
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #304: Calculate the total count of grocery items stocked in the store",
    "table": "GroceryItems",
    "scenario": "Calculate the total count of grocery items stocked in the store.",
    "businessObjective": "Calculate the total count of grocery items stocked in the store.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT COUNT(item_id) AS total_products\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT COUNT(item_id) AS total_products\nFROM GroceryItems;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Calculate the total count of grocery items stocked in the store.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.1 Basic COUNT & Non-Null Values on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(item_id)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_products"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 305,
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #305: Count the total number of orders placed by customers",
    "table": "Orders",
    "scenario": "Count the total number of orders placed by customers.",
    "businessObjective": "Count the total number of orders placed by customers.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT COUNT(*) AS total_placed_orders\nFROM Orders;",
    "syntaxBlueprint": "SELECT COUNT(*) AS total_placed_orders\nFROM Orders;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Count the total number of orders placed by customers.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.1 Basic COUNT & Non-Null Values on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_placed_orders"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 306,
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #306: Count the total number of tracks in the music library",
    "table": "MusicTracks",
    "scenario": "Count the total number of tracks in the music library.",
    "businessObjective": "Count the total number of tracks in the music library.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT COUNT(track_id) AS track_count\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT COUNT(track_id) AS track_count\nFROM MusicTracks;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Count the total number of tracks in the music library.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.1 Basic COUNT & Non-Null Values on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(track_id)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "track_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 307,
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #307: Count total active and inactive gym member registrations",
    "table": "GymMembers",
    "scenario": "Count total active and inactive gym member registrations.",
    "businessObjective": "Count total active and inactive gym member registrations.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT COUNT(*) AS total_memberships\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT COUNT(*) AS total_memberships\nFROM GymMembers;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Count total active and inactive gym member registrations.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.1 Basic COUNT & Non-Null Values on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_memberships"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 308,
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #308: Calculate the total number of movie reviews submitted",
    "table": "MovieReviews",
    "scenario": "Calculate the total number of movie reviews submitted.",
    "businessObjective": "Calculate the total number of movie reviews submitted.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT COUNT(review_id) AS total_reviews_logged\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT COUNT(review_id) AS total_reviews_logged\nFROM MovieReviews;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Calculate the total number of movie reviews submitted.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.1 Basic COUNT & Non-Null Values on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(review_id)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_reviews_logged"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 309,
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #309: Count the total number of scheduled flights on the board",
    "table": "FlightSchedule",
    "scenario": "Count the total number of scheduled flights on the board.",
    "businessObjective": "Count the total number of scheduled flights on the board.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT COUNT(*) AS scheduled_flights\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT COUNT(*) AS scheduled_flights\nFROM FlightSchedule;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Count the total number of scheduled flights on the board.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.1 Basic COUNT & Non-Null Values on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "scheduled_flights"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 310,
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #310: Count total veterinary patients registered at the clinic",
    "table": "PetClinic",
    "scenario": "Count total veterinary patients registered at the clinic.",
    "businessObjective": "Count total veterinary patients registered at the clinic.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT COUNT(pet_id) AS patient_count\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT COUNT(pet_id) AS patient_count\nFROM PetClinic;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Count total veterinary patients registered at the clinic.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.1 Basic COUNT & Non-Null Values on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(pet_id)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "patient_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 311,
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #311: Calculate the total payroll expenditure across all employees",
    "table": "Employees",
    "scenario": "Calculate the total payroll expenditure across all employees.",
    "businessObjective": "Calculate the total payroll expenditure across all employees.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT SUM(salary) AS total_payroll\nFROM Employees;",
    "syntaxBlueprint": "SELECT SUM(salary) AS total_payroll\nFROM Employees;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Calculate the total payroll expenditure across all employees.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.2 Basic SUM & Total Accumulation on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "SUM(salary)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_payroll"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 312,
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #312: Sum the total number of physical units currently in stock",
    "table": "GroceryItems",
    "scenario": "Sum the total number of physical units currently in stock.",
    "businessObjective": "Sum the total number of physical units currently in stock.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT SUM(stock_units) AS total_inventory_units\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT SUM(stock_units) AS total_inventory_units\nFROM GroceryItems;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Sum the total number of physical units currently in stock.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.2 Basic SUM & Total Accumulation on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "SUM(stock_units)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_inventory_units"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 313,
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #313: Calculate the overall sum of item quantities purchased across all orders",
    "table": "Orders",
    "scenario": "Calculate the overall sum of item quantities purchased across all orders.",
    "businessObjective": "Calculate the overall sum of item quantities purchased across all orders.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT SUM(quantity) AS total_items_sold\nFROM Orders;",
    "syntaxBlueprint": "SELECT SUM(quantity) AS total_items_sold\nFROM Orders;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Calculate the overall sum of item quantities purchased across all orders.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.2 Basic SUM & Total Accumulation on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "SUM(quantity)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_items_sold"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 314,
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #314: Compute total gross revenue by summing the line item totals (quantity * unit_price)",
    "table": "Orders",
    "scenario": "Compute total gross revenue by summing the line item totals (quantity * unit_price).",
    "businessObjective": "Compute total gross revenue by summing the line item totals (quantity * unit_price).",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT SUM(quantity * unit_price) AS gross_revenue\nFROM Orders;",
    "syntaxBlueprint": "SELECT SUM(quantity * unit_price) AS gross_revenue\nFROM Orders;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Compute total gross revenue by summing the line item totals (quantity * unit_price).",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.2 Basic SUM & Total Accumulation on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "SUM(quantity"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "unit_price)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "gross_revenue"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 315,
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #315: Calculate the grand total duration of all tracks combined in seconds",
    "table": "MusicTracks",
    "scenario": "Calculate the grand total duration of all tracks combined in seconds.",
    "businessObjective": "Calculate the grand total duration of all tracks combined in seconds.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT SUM(duration_seconds) AS total_audio_seconds\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT SUM(duration_seconds) AS total_audio_seconds\nFROM MusicTracks;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Calculate the grand total duration of all tracks combined in seconds.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.2 Basic SUM & Total Accumulation on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "SUM(duration_seconds)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_audio_seconds"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 316,
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #316: Sum the total monthly membership fee dues collected by the gym",
    "table": "GymMembers",
    "scenario": "Sum the total monthly membership fee dues collected by the gym.",
    "businessObjective": "Sum the total monthly membership fee dues collected by the gym.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT SUM(monthly_fee) AS total_monthly_dues\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT SUM(monthly_fee) AS total_monthly_dues\nFROM GymMembers;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Sum the total monthly membership fee dues collected by the gym.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.2 Basic SUM & Total Accumulation on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "SUM(monthly_fee)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_monthly_dues"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 317,
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #317: Calculate total visits logged across all members this month",
    "table": "GymMembers",
    "scenario": "Calculate total visits logged across all members this month.",
    "businessObjective": "Calculate total visits logged across all members this month.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT SUM(visits_this_month) AS aggregate_visits\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT SUM(visits_this_month) AS aggregate_visits\nFROM GymMembers;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Calculate total visits logged across all members this month.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.2 Basic SUM & Total Accumulation on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "SUM(visits_this_month)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "aggregate_visits"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 318,
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #318: Compute the total number of unbooked seats across all departures",
    "table": "FlightSchedule",
    "scenario": "Compute the total number of unbooked seats across all departures.",
    "businessObjective": "Compute the total number of unbooked seats across all departures.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT SUM(seats_available) AS total_empty_seats\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT SUM(seats_available) AS total_empty_seats\nFROM FlightSchedule;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Compute the total number of unbooked seats across all departures.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.2 Basic SUM & Total Accumulation on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "SUM(seats_available)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_empty_seats"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 319,
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #319: Sum the total collective weight in kilograms of all clinic patients",
    "table": "PetClinic",
    "scenario": "Sum the total collective weight in kilograms of all clinic patients.",
    "businessObjective": "Sum the total collective weight in kilograms of all clinic patients.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT SUM(weight_kg) AS combined_patient_weight\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT SUM(weight_kg) AS combined_patient_weight\nFROM PetClinic;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Sum the total collective weight in kilograms of all clinic patients.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.2 Basic SUM & Total Accumulation on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "SUM(weight_kg)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "combined_patient_weight"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 320,
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #320: Sum the total physical copies in warehouse stock across all titles",
    "table": "Books",
    "scenario": "Sum the total physical copies in warehouse stock across all titles.",
    "businessObjective": "Sum the total physical copies in warehouse stock across all titles.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT SUM(stock_count) AS total_books_in_warehouse\nFROM Books;",
    "syntaxBlueprint": "SELECT SUM(stock_count) AS total_books_in_warehouse\nFROM Books;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Sum the total physical copies in warehouse stock across all titles.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.2 Basic SUM & Total Accumulation on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "SUM(stock_count)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_books_in_warehouse"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 321,
    "subcluster": "4.3 AVG & Statistical Means",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #321: Calculate the average GPA across all students rounded to 2 decimal places",
    "table": "Students",
    "scenario": "Calculate the average GPA across all students rounded to 2 decimal places.",
    "businessObjective": "Calculate the average GPA across all students rounded to 2 decimal places.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT ROUND(AVG(gpa), 2) AS average_gpa\nFROM Students;",
    "syntaxBlueprint": "SELECT ROUND(AVG(gpa), 2) AS average_gpa\nFROM Students;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Calculate the average GPA across all students rounded to 2 decimal places.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.3 AVG & Statistical Means on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(gpa),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "average_gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 322,
    "subcluster": "4.3 AVG & Statistical Means",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #322: Compute the average retail price of books in the catalog",
    "table": "Books",
    "scenario": "Compute the average retail price of books in the catalog.",
    "businessObjective": "Compute the average retail price of books in the catalog.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT ROUND(AVG(price), 2) AS average_book_price\nFROM Books;",
    "syntaxBlueprint": "SELECT ROUND(AVG(price), 2) AS average_book_price\nFROM Books;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Compute the average retail price of books in the catalog.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.3 AVG & Statistical Means on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(price),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "average_book_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 323,
    "subcluster": "4.3 AVG & Statistical Means",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #323: Calculate the overall average employee salary",
    "table": "Employees",
    "scenario": "Calculate the overall average employee salary.",
    "businessObjective": "Calculate the overall average employee salary.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT ROUND(AVG(salary), 2) AS mean_company_salary\nFROM Employees;",
    "syntaxBlueprint": "SELECT ROUND(AVG(salary), 2) AS mean_company_salary\nFROM Employees;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Calculate the overall average employee salary.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.3 AVG & Statistical Means on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(salary),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "mean_company_salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 324,
    "subcluster": "4.3 AVG & Statistical Means",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #324: Find the average price per unit across all grocery items",
    "table": "GroceryItems",
    "scenario": "Find the average price per unit across all grocery items.",
    "businessObjective": "Find the average price per unit across all grocery items.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT ROUND(AVG(unit_price), 2) AS average_item_cost\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT ROUND(AVG(unit_price), 2) AS average_item_cost\nFROM GroceryItems;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Find the average price per unit across all grocery items.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.3 AVG & Statistical Means on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(unit_price),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "average_item_cost"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 325,
    "subcluster": "4.3 AVG & Statistical Means",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #325: Calculate the average order quantity per transaction rounded to 1 decimal place",
    "table": "Orders",
    "scenario": "Calculate the average order quantity per transaction rounded to 1 decimal place.",
    "businessObjective": "Calculate the average order quantity per transaction rounded to 1 decimal place.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT ROUND(AVG(quantity), 1) AS avg_items_per_order\nFROM Orders;",
    "syntaxBlueprint": "SELECT ROUND(AVG(quantity), 1) AS avg_items_per_order\nFROM Orders;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Calculate the average order quantity per transaction rounded to 1 decimal place.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.3 AVG & Statistical Means on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(quantity),"
      },
      {
        "type": "column",
        "value": "1)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_items_per_order"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 326,
    "subcluster": "4.3 AVG & Statistical Means",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #326: Calculate the mean track length in seconds across the playlist",
    "table": "MusicTracks",
    "scenario": "Calculate the mean track length in seconds across the playlist.",
    "businessObjective": "Calculate the mean track length in seconds across the playlist.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT ROUND(AVG(duration_seconds), 0) AS avg_track_length\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT ROUND(AVG(duration_seconds), 0) AS avg_track_length\nFROM MusicTracks;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Calculate the mean track length in seconds across the playlist.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.3 AVG & Statistical Means on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(duration_seconds),"
      },
      {
        "type": "column",
        "value": "0)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_track_length"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 327,
    "subcluster": "4.3 AVG & Statistical Means",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #327: Determine the average monthly visit frequency per member",
    "table": "GymMembers",
    "scenario": "Determine the average monthly visit frequency per member.",
    "businessObjective": "Determine the average monthly visit frequency per member.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT ROUND(AVG(visits_this_month), 1) AS avg_member_attendance\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT ROUND(AVG(visits_this_month), 1) AS avg_member_attendance\nFROM GymMembers;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Determine the average monthly visit frequency per member.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.3 AVG & Statistical Means on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(visits_this_month),"
      },
      {
        "type": "column",
        "value": "1)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_member_attendance"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 328,
    "subcluster": "4.3 AVG & Statistical Means",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #328: Compute the universal average star rating across all reviews",
    "table": "MovieReviews",
    "scenario": "Compute the universal average star rating across all reviews.",
    "businessObjective": "Compute the universal average star rating across all reviews.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT ROUND(AVG(star_rating), 2) AS platform_avg_rating\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT ROUND(AVG(star_rating), 2) AS platform_avg_rating\nFROM MovieReviews;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Compute the universal average star rating across all reviews.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.3 AVG & Statistical Means on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(star_rating),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "platform_avg_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 329,
    "subcluster": "4.3 AVG & Statistical Means",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #329: Calculate the average ticket price across all scheduled flights",
    "table": "FlightSchedule",
    "scenario": "Calculate the average ticket price across all scheduled flights.",
    "businessObjective": "Calculate the average ticket price across all scheduled flights.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT ROUND(AVG(ticket_price), 2) AS average_fare\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT ROUND(AVG(ticket_price), 2) AS average_fare\nFROM FlightSchedule;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Calculate the average ticket price across all scheduled flights.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.3 AVG & Statistical Means on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(ticket_price),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "average_fare"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 330,
    "subcluster": "4.3 AVG & Statistical Means",
    "level": "Level 1 (Foundations)",
    "title": "Syntax #330: Calculate the mean age of clinic patients in years",
    "table": "PetClinic",
    "scenario": "Calculate the mean age of clinic patients in years.",
    "businessObjective": "Calculate the mean age of clinic patients in years.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT ROUND(AVG(age_years), 1) AS average_patient_age\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT ROUND(AVG(age_years), 1) AS average_patient_age\nFROM PetClinic;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Calculate the mean age of clinic patients in years.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.3 AVG & Statistical Means on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(age_years),"
      },
      {
        "type": "column",
        "value": "1)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "average_patient_age"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 331,
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "level": "Level 1 (Extrema)",
    "title": "Syntax #331: Find both the minimum and maximum GPA in the student body",
    "table": "Students",
    "scenario": "Find both the minimum and maximum GPA in the student body.",
    "businessObjective": "Find both the minimum and maximum GPA in the student body.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT MIN(gpa) AS lowest_gpa, MAX(gpa) AS highest_gpa\nFROM Students;",
    "syntaxBlueprint": "SELECT MIN(gpa) AS lowest_gpa, MAX(gpa) AS highest_gpa\nFROM Students;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Find both the minimum and maximum GPA in the student body.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.4 MIN & MAX Extrema Discovery on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "MIN(gpa)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "lowest_gpa,"
      },
      {
        "type": "column",
        "value": "MAX(gpa)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "highest_gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 332,
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "level": "Level 1 (Extrema)",
    "title": "Syntax #332: Discover the lowest and highest book prices in the store",
    "table": "Books",
    "scenario": "Discover the lowest and highest book prices in the store.",
    "businessObjective": "Discover the lowest and highest book prices in the store.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT MIN(price) AS cheapest_book, MAX(price) AS priciest_book\nFROM Books;",
    "syntaxBlueprint": "SELECT MIN(price) AS cheapest_book, MAX(price) AS priciest_book\nFROM Books;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Discover the lowest and highest book prices in the store.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.4 MIN & MAX Extrema Discovery on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "MIN(price)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "cheapest_book,"
      },
      {
        "type": "column",
        "value": "MAX(price)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "priciest_book"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 333,
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "level": "Level 1 (Extrema)",
    "title": "Syntax #333: Identify the minimum and maximum salaries paid in the company",
    "table": "Employees",
    "scenario": "Identify the minimum and maximum salaries paid in the company.",
    "businessObjective": "Identify the minimum and maximum salaries paid in the company.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT MIN(salary) AS entry_salary, MAX(salary) AS executive_salary\nFROM Employees;",
    "syntaxBlueprint": "SELECT MIN(salary) AS entry_salary, MAX(salary) AS executive_salary\nFROM Employees;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Identify the minimum and maximum salaries paid in the company.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.4 MIN & MAX Extrema Discovery on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "MIN(salary)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "entry_salary,"
      },
      {
        "type": "column",
        "value": "MAX(salary)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "executive_salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 334,
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "level": "Level 1 (Extrema)",
    "title": "Syntax #334: Find the lowest grocery unit price and the highest stock count",
    "table": "GroceryItems",
    "scenario": "Find the lowest grocery unit price and the highest stock count.",
    "businessObjective": "Find the lowest grocery unit price and the highest stock count.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT MIN(unit_price) AS min_price, MAX(stock_units) AS peak_stock\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT MIN(unit_price) AS min_price, MAX(stock_units) AS peak_stock\nFROM GroceryItems;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Find the lowest grocery unit price and the highest stock count.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.4 MIN & MAX Extrema Discovery on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "MIN(unit_price)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "min_price,"
      },
      {
        "type": "column",
        "value": "MAX(stock_units)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "peak_stock"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 335,
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "level": "Level 1 (Extrema)",
    "title": "Syntax #335: Identify the earliest and most recent order dates in history",
    "table": "Orders",
    "scenario": "Identify the earliest and most recent order dates in history.",
    "businessObjective": "Identify the earliest and most recent order dates in history.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT MIN(order_date) AS earliest_order, MAX(order_date) AS latest_order\nFROM Orders;",
    "syntaxBlueprint": "SELECT MIN(order_date) AS earliest_order, MAX(order_date) AS latest_order\nFROM Orders;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Identify the earliest and most recent order dates in history.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.4 MIN & MAX Extrema Discovery on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "MIN(order_date)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "earliest_order,"
      },
      {
        "type": "column",
        "value": "MAX(order_date)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "latest_order"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 336,
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "level": "Level 1 (Extrema)",
    "title": "Syntax #336: Find the lowest and highest play counts across all songs",
    "table": "MusicTracks",
    "scenario": "Find the lowest and highest play counts across all songs.",
    "businessObjective": "Find the lowest and highest play counts across all songs.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT MIN(play_count) AS least_played, MAX(play_count) AS top_streamed\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT MIN(play_count) AS least_played, MAX(play_count) AS top_streamed\nFROM MusicTracks;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Find the lowest and highest play counts across all songs.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.4 MIN & MAX Extrema Discovery on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "MIN(play_count)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "least_played,"
      },
      {
        "type": "column",
        "value": "MAX(play_count)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "top_streamed"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 337,
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "level": "Level 1 (Extrema)",
    "title": "Syntax #337: Find the earliest and latest member join dates",
    "table": "GymMembers",
    "scenario": "Find the earliest and latest member join dates.",
    "businessObjective": "Find the earliest and latest member join dates.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT MIN(join_date) AS oldest_member_date, MAX(join_date) AS newest_join_date\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT MIN(join_date) AS oldest_member_date, MAX(join_date) AS newest_join_date\nFROM GymMembers;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Find the earliest and latest member join dates.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.4 MIN & MAX Extrema Discovery on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "MIN(join_date)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "oldest_member_date,"
      },
      {
        "type": "column",
        "value": "MAX(join_date)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "newest_join_date"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 338,
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "level": "Level 1 (Extrema)",
    "title": "Syntax #338: Find the lowest and highest star ratings logged by viewers",
    "table": "MovieReviews",
    "scenario": "Find the lowest and highest star ratings logged by viewers.",
    "businessObjective": "Find the lowest and highest star ratings logged by viewers.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT MIN(star_rating) AS lowest_score, MAX(star_rating) AS highest_score\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT MIN(star_rating) AS lowest_score, MAX(star_rating) AS highest_score\nFROM MovieReviews;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Find the lowest and highest star ratings logged by viewers.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.4 MIN & MAX Extrema Discovery on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "MIN(star_rating)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "lowest_score,"
      },
      {
        "type": "column",
        "value": "MAX(star_rating)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "highest_score"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 339,
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "level": "Level 1 (Extrema)",
    "title": "Syntax #339: Find the cheapest and most expensive flight ticket prices",
    "table": "FlightSchedule",
    "scenario": "Find the cheapest and most expensive flight ticket prices.",
    "businessObjective": "Find the cheapest and most expensive flight ticket prices.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT MIN(ticket_price) AS bargain_fare, MAX(ticket_price) AS premium_fare\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT MIN(ticket_price) AS bargain_fare, MAX(ticket_price) AS premium_fare\nFROM FlightSchedule;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Find the cheapest and most expensive flight ticket prices.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.4 MIN & MAX Extrema Discovery on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "MIN(ticket_price)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "bargain_fare,"
      },
      {
        "type": "column",
        "value": "MAX(ticket_price)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "premium_fare"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 340,
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "level": "Level 1 (Extrema)",
    "title": "Syntax #340: Find the minimum and maximum pet weights recorded in kilograms",
    "table": "PetClinic",
    "scenario": "Find the minimum and maximum pet weights recorded in kilograms.",
    "businessObjective": "Find the minimum and maximum pet weights recorded in kilograms.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT MIN(weight_kg) AS lightest_pet, MAX(weight_kg) AS heaviest_pet\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT MIN(weight_kg) AS lightest_pet, MAX(weight_kg) AS heaviest_pet\nFROM PetClinic;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Find the minimum and maximum pet weights recorded in kilograms.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.4 MIN & MAX Extrema Discovery on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "MIN(weight_kg)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "lightest_pet,"
      },
      {
        "type": "column",
        "value": "MAX(weight_kg)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "heaviest_pet"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 341,
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "level": "Level 2 (Cardinality)",
    "title": "Syntax #341: Count the number of distinct cities where students reside",
    "table": "Students",
    "scenario": "Count the number of distinct cities where students reside.",
    "businessObjective": "Count the number of distinct cities where students reside.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT COUNT(DISTINCT city) AS unique_hometowns\nFROM Students;",
    "syntaxBlueprint": "SELECT COUNT(DISTINCT city) AS unique_hometowns\nFROM Students;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Count the number of distinct cities where students reside.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.5 COUNT(DISTINCT) Cardinality on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(DISTINCT"
      },
      {
        "type": "column",
        "value": "city)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "unique_hometowns"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students;"
      }
    ]
  },
  {
    "drillNumber": 342,
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "level": "Level 2 (Cardinality)",
    "title": "Syntax #342: Count how many unique authors are represented in the catalog",
    "table": "Books",
    "scenario": "Count how many unique authors are represented in the catalog.",
    "businessObjective": "Count how many unique authors are represented in the catalog.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT COUNT(DISTINCT author) AS unique_authors\nFROM Books;",
    "syntaxBlueprint": "SELECT COUNT(DISTINCT author) AS unique_authors\nFROM Books;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Count how many unique authors are represented in the catalog.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.5 COUNT(DISTINCT) Cardinality on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(DISTINCT"
      },
      {
        "type": "column",
        "value": "author)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "unique_authors"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books;"
      }
    ]
  },
  {
    "drillNumber": 343,
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "level": "Level 2 (Cardinality)",
    "title": "Syntax #343: Count the number of unique departments operating in the firm",
    "table": "Employees",
    "scenario": "Count the number of unique departments operating in the firm.",
    "businessObjective": "Count the number of unique departments operating in the firm.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT COUNT(DISTINCT department) AS active_departments\nFROM Employees;",
    "syntaxBlueprint": "SELECT COUNT(DISTINCT department) AS active_departments\nFROM Employees;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Count the number of unique departments operating in the firm.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.5 COUNT(DISTINCT) Cardinality on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(DISTINCT"
      },
      {
        "type": "column",
        "value": "department)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "active_departments"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees;"
      }
    ]
  },
  {
    "drillNumber": 344,
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "level": "Level 2 (Cardinality)",
    "title": "Syntax #344: Count how many distinct grocery categories exist in inventory",
    "table": "GroceryItems",
    "scenario": "Count how many distinct grocery categories exist in inventory.",
    "businessObjective": "Count how many distinct grocery categories exist in inventory.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT COUNT(DISTINCT category) AS category_count\nFROM GroceryItems;",
    "syntaxBlueprint": "SELECT COUNT(DISTINCT category) AS category_count\nFROM GroceryItems;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Count how many distinct grocery categories exist in inventory.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.5 COUNT(DISTINCT) Cardinality on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(DISTINCT"
      },
      {
        "type": "column",
        "value": "category)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "category_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems;"
      }
    ]
  },
  {
    "drillNumber": 345,
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "level": "Level 2 (Cardinality)",
    "title": "Syntax #345: Count the total number of distinct customers who placed orders",
    "table": "Orders",
    "scenario": "Count the total number of distinct customers who placed orders.",
    "businessObjective": "Count the total number of distinct customers who placed orders.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT COUNT(DISTINCT customer_name) AS unique_buyers\nFROM Orders;",
    "syntaxBlueprint": "SELECT COUNT(DISTINCT customer_name) AS unique_buyers\nFROM Orders;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Count the total number of distinct customers who placed orders.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.5 COUNT(DISTINCT) Cardinality on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(DISTINCT"
      },
      {
        "type": "column",
        "value": "customer_name)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "unique_buyers"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders;"
      }
    ]
  },
  {
    "drillNumber": 346,
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "level": "Level 2 (Cardinality)",
    "title": "Syntax #346: Count the number of unique musical genres in the catalog",
    "table": "MusicTracks",
    "scenario": "Count the number of unique musical genres in the catalog.",
    "businessObjective": "Count the number of unique musical genres in the catalog.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT COUNT(DISTINCT genre) AS distinct_genres\nFROM MusicTracks;",
    "syntaxBlueprint": "SELECT COUNT(DISTINCT genre) AS distinct_genres\nFROM MusicTracks;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Count the number of unique musical genres in the catalog.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.5 COUNT(DISTINCT) Cardinality on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(DISTINCT"
      },
      {
        "type": "column",
        "value": "genre)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "distinct_genres"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks;"
      }
    ]
  },
  {
    "drillNumber": 347,
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "level": "Level 2 (Cardinality)",
    "title": "Syntax #347: Count the number of distinct membership plan tiers available",
    "table": "GymMembers",
    "scenario": "Count the number of distinct membership plan tiers available.",
    "businessObjective": "Count the number of distinct membership plan tiers available.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT COUNT(DISTINCT membership_plan) AS plan_tiers_offered\nFROM GymMembers;",
    "syntaxBlueprint": "SELECT COUNT(DISTINCT membership_plan) AS plan_tiers_offered\nFROM GymMembers;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Count the number of distinct membership plan tiers available.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.5 COUNT(DISTINCT) Cardinality on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(DISTINCT"
      },
      {
        "type": "column",
        "value": "membership_plan)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "plan_tiers_offered"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers;"
      }
    ]
  },
  {
    "drillNumber": 348,
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "level": "Level 2 (Cardinality)",
    "title": "Syntax #348: Count how many different movies have received at least one review",
    "table": "MovieReviews",
    "scenario": "Count how many different movies have received at least one review.",
    "businessObjective": "Count how many different movies have received at least one review.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT COUNT(DISTINCT movie_title) AS unique_movies_reviewed\nFROM MovieReviews;",
    "syntaxBlueprint": "SELECT COUNT(DISTINCT movie_title) AS unique_movies_reviewed\nFROM MovieReviews;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Count how many different movies have received at least one review.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.5 COUNT(DISTINCT) Cardinality on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(DISTINCT"
      },
      {
        "type": "column",
        "value": "movie_title)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "unique_movies_reviewed"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews;"
      }
    ]
  },
  {
    "drillNumber": 349,
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "level": "Level 2 (Cardinality)",
    "title": "Syntax #349: Count how many distinct origin airports have outbound departures",
    "table": "FlightSchedule",
    "scenario": "Count how many distinct origin airports have outbound departures.",
    "businessObjective": "Count how many distinct origin airports have outbound departures.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT COUNT(DISTINCT origin_airport) AS unique_origins\nFROM FlightSchedule;",
    "syntaxBlueprint": "SELECT COUNT(DISTINCT origin_airport) AS unique_origins\nFROM FlightSchedule;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Count how many distinct origin airports have outbound departures.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.5 COUNT(DISTINCT) Cardinality on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(DISTINCT"
      },
      {
        "type": "column",
        "value": "origin_airport)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "unique_origins"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule;"
      }
    ]
  },
  {
    "drillNumber": 350,
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "level": "Level 2 (Cardinality)",
    "title": "Syntax #350: Count the number of unique animal species treated at the clinic",
    "table": "PetClinic",
    "scenario": "Count the number of unique animal species treated at the clinic.",
    "businessObjective": "Count the number of unique animal species treated at the clinic.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT COUNT(DISTINCT species) AS species_treated\nFROM PetClinic;",
    "syntaxBlueprint": "SELECT COUNT(DISTINCT species) AS species_treated\nFROM PetClinic;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Count the number of unique animal species treated at the clinic.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.5 COUNT(DISTINCT) Cardinality on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "COUNT(DISTINCT"
      },
      {
        "type": "column",
        "value": "species)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "species_treated"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic;"
      }
    ]
  },
  {
    "drillNumber": 351,
    "subcluster": "4.6 Single-Column GROUP BY",
    "level": "Level 2 (Grouping)",
    "title": "Syntax #351: Group students by major and count how many students are enrolled in each",
    "table": "Students",
    "scenario": "Group students by major and count how many students are enrolled in each.",
    "businessObjective": "Group students by major and count how many students are enrolled in each.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT major, COUNT(*) AS student_count\nFROM Students\nGROUP BY major;",
    "syntaxBlueprint": "SELECT major, COUNT(*) AS student_count\nFROM Students\nGROUP BY major;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Group students by major and count how many students are enrolled in each.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.6 Single-Column GROUP BY on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "major,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "student_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "major;"
      }
    ]
  },
  {
    "drillNumber": 352,
    "subcluster": "4.6 Single-Column GROUP BY",
    "level": "Level 2 (Grouping)",
    "title": "Syntax #352: Group books by genre and count total titles per category",
    "table": "Books",
    "scenario": "Group books by genre and count total titles per category.",
    "businessObjective": "Group books by genre and count total titles per category.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT genre, COUNT(*) AS title_count\nFROM Books\nGROUP BY genre;",
    "syntaxBlueprint": "SELECT genre, COUNT(*) AS title_count\nFROM Books\nGROUP BY genre;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Group books by genre and count total titles per category.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.6 Single-Column GROUP BY on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "title_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre;"
      }
    ]
  },
  {
    "drillNumber": 353,
    "subcluster": "4.6 Single-Column GROUP BY",
    "level": "Level 2 (Grouping)",
    "title": "Syntax #353: Group employees by department and count staff headcount per department",
    "table": "Employees",
    "scenario": "Group employees by department and count staff headcount per department.",
    "businessObjective": "Group employees by department and count staff headcount per department.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT department, COUNT(*) AS headcount\nFROM Employees\nGROUP BY department;",
    "syntaxBlueprint": "SELECT department, COUNT(*) AS headcount\nFROM Employees\nGROUP BY department;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Group employees by department and count staff headcount per department.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.6 Single-Column GROUP BY on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "headcount"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "department;"
      }
    ]
  },
  {
    "drillNumber": 354,
    "subcluster": "4.6 Single-Column GROUP BY",
    "level": "Level 2 (Grouping)",
    "title": "Syntax #354: Group grocery items by category and display count of products per category",
    "table": "GroceryItems",
    "scenario": "Group grocery items by category and display count of products per category.",
    "businessObjective": "Group grocery items by category and display count of products per category.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT category, COUNT(*) AS product_count\nFROM GroceryItems\nGROUP BY category;",
    "syntaxBlueprint": "SELECT category, COUNT(*) AS product_count\nFROM GroceryItems\nGROUP BY category;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Group grocery items by category and display count of products per category.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.6 Single-Column GROUP BY on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "category,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "product_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "category;"
      }
    ]
  },
  {
    "drillNumber": 355,
    "subcluster": "4.6 Single-Column GROUP BY",
    "level": "Level 2 (Grouping)",
    "title": "Syntax #355: Group orders by status (Pending, Shipped, Delivered) and count each",
    "table": "Orders",
    "scenario": "Group orders by status (Pending, Shipped, Delivered) and count each.",
    "businessObjective": "Group orders by status (Pending, Shipped, Delivered) and count each.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_status, COUNT(*) AS order_count\nFROM Orders\nGROUP BY order_status;",
    "syntaxBlueprint": "SELECT order_status, COUNT(*) AS order_count\nFROM Orders\nGROUP BY order_status;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Group orders by status (Pending, Shipped, Delivered) and count each.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.6 Single-Column GROUP BY on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "order_status,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "order_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "order_status;"
      }
    ]
  },
  {
    "drillNumber": 356,
    "subcluster": "4.6 Single-Column GROUP BY",
    "level": "Level 2 (Grouping)",
    "title": "Syntax #356: Group music tracks by genre and count total songs in each genre",
    "table": "MusicTracks",
    "scenario": "Group music tracks by genre and count total songs in each genre.",
    "businessObjective": "Group music tracks by genre and count total songs in each genre.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT genre, COUNT(*) AS track_count\nFROM MusicTracks\nGROUP BY genre;",
    "syntaxBlueprint": "SELECT genre, COUNT(*) AS track_count\nFROM MusicTracks\nGROUP BY genre;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Group music tracks by genre and count total songs in each genre.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.6 Single-Column GROUP BY on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "track_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre;"
      }
    ]
  },
  {
    "drillNumber": 357,
    "subcluster": "4.6 Single-Column GROUP BY",
    "level": "Level 2 (Grouping)",
    "title": "Syntax #357: Group members by membership plan tier and count subscriptions in each",
    "table": "GymMembers",
    "scenario": "Group members by membership plan tier and count subscriptions in each.",
    "businessObjective": "Group members by membership plan tier and count subscriptions in each.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT membership_plan, COUNT(*) AS member_count\nFROM GymMembers\nGROUP BY membership_plan;",
    "syntaxBlueprint": "SELECT membership_plan, COUNT(*) AS member_count\nFROM GymMembers\nGROUP BY membership_plan;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Group members by membership plan tier and count subscriptions in each.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.6 Single-Column GROUP BY on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "member_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "membership_plan;"
      }
    ]
  },
  {
    "drillNumber": 358,
    "subcluster": "4.6 Single-Column GROUP BY",
    "level": "Level 2 (Grouping)",
    "title": "Syntax #358: Group movie reviews by genre and count total reviews per genre",
    "table": "MovieReviews",
    "scenario": "Group movie reviews by genre and count total reviews per genre.",
    "businessObjective": "Group movie reviews by genre and count total reviews per genre.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT genre, COUNT(*) AS review_count\nFROM MovieReviews\nGROUP BY genre;",
    "syntaxBlueprint": "SELECT genre, COUNT(*) AS review_count\nFROM MovieReviews\nGROUP BY genre;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Group movie reviews by genre and count total reviews per genre.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.6 Single-Column GROUP BY on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "review_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre;"
      }
    ]
  },
  {
    "drillNumber": 359,
    "subcluster": "4.6 Single-Column GROUP BY",
    "level": "Level 2 (Grouping)",
    "title": "Syntax #359: Group flights by origin airport and count departures originating from each",
    "table": "FlightSchedule",
    "scenario": "Group flights by origin airport and count departures originating from each.",
    "businessObjective": "Group flights by origin airport and count departures originating from each.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT origin_airport, COUNT(*) AS departures_count\nFROM FlightSchedule\nGROUP BY origin_airport;",
    "syntaxBlueprint": "SELECT origin_airport, COUNT(*) AS departures_count\nFROM FlightSchedule\nGROUP BY origin_airport;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Group flights by origin airport and count departures originating from each.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.6 Single-Column GROUP BY on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "origin_airport,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "departures_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "origin_airport;"
      }
    ]
  },
  {
    "drillNumber": 360,
    "subcluster": "4.6 Single-Column GROUP BY",
    "level": "Level 2 (Grouping)",
    "title": "Syntax #360: Group veterinary patients by species and count patients per animal type",
    "table": "PetClinic",
    "scenario": "Group veterinary patients by species and count patients per animal type.",
    "businessObjective": "Group veterinary patients by species and count patients per animal type.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT species, COUNT(*) AS patient_count\nFROM PetClinic\nGROUP BY species;",
    "syntaxBlueprint": "SELECT species, COUNT(*) AS patient_count\nFROM PetClinic\nGROUP BY species;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Group veterinary patients by species and count patients per animal type.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.6 Single-Column GROUP BY on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "species,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "patient_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "species;"
      }
    ]
  },
  {
    "drillNumber": 361,
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "level": "Level 2 (Multi-Metric)",
    "title": "Syntax #361: Compute student count and average GPA per major",
    "table": "Students",
    "scenario": "Compute student count and average GPA per major.",
    "businessObjective": "Compute student count and average GPA per major.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT major, COUNT(*) AS total_students, ROUND(AVG(gpa), 2) AS avg_gpa\nFROM Students\nGROUP BY major;",
    "syntaxBlueprint": "SELECT major, COUNT(*) AS total_students, ROUND(AVG(gpa), 2) AS avg_gpa\nFROM Students\nGROUP BY major;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Compute student count and average GPA per major.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.7 Multi-Metric GROUP BY Rollups on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "major,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_students,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(gpa),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "major;"
      }
    ]
  },
  {
    "drillNumber": 362,
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "level": "Level 2 (Multi-Metric)",
    "title": "Syntax #362: Calculate title count, average price, and highest price per genre",
    "table": "Books",
    "scenario": "Calculate title count, average price, and highest price per genre.",
    "businessObjective": "Calculate title count, average price, and highest price per genre.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT genre, COUNT(*) AS titles, ROUND(AVG(price), 2) AS avg_price, MAX(price) AS max_price\nFROM Books\nGROUP BY genre;",
    "syntaxBlueprint": "SELECT genre, COUNT(*) AS titles, ROUND(AVG(price), 2) AS avg_price, MAX(price) AS max_price\nFROM Books\nGROUP BY genre;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Calculate title count, average price, and highest price per genre.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.7 Multi-Metric GROUP BY Rollups on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "titles,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(price),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_price,"
      },
      {
        "type": "column",
        "value": "MAX(price)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "max_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre;"
      }
    ]
  },
  {
    "drillNumber": 363,
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "level": "Level 2 (Multi-Metric)",
    "title": "Syntax #363: Calculate staff count, total payroll, and average salary for each department",
    "table": "Employees",
    "scenario": "Calculate staff count, total payroll, and average salary for each department.",
    "businessObjective": "Calculate staff count, total payroll, and average salary for each department.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT department, COUNT(*) AS staff, SUM(salary) AS payroll, ROUND(AVG(salary), 2) AS avg_salary\nFROM Employees\nGROUP BY department;",
    "syntaxBlueprint": "SELECT department, COUNT(*) AS staff, SUM(salary) AS payroll, ROUND(AVG(salary), 2) AS avg_salary\nFROM Employees\nGROUP BY department;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Calculate staff count, total payroll, and average salary for each department.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.7 Multi-Metric GROUP BY Rollups on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "staff,"
      },
      {
        "type": "column",
        "value": "SUM(salary)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "payroll,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(salary),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "department;"
      }
    ]
  },
  {
    "drillNumber": 364,
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "level": "Level 2 (Multi-Metric)",
    "title": "Syntax #364: Report item count, total inventory units, and average price per category",
    "table": "GroceryItems",
    "scenario": "Report item count, total inventory units, and average price per category.",
    "businessObjective": "Report item count, total inventory units, and average price per category.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT category, COUNT(*) AS items, SUM(stock_units) AS total_units, ROUND(AVG(unit_price), 2) AS avg_cost\nFROM GroceryItems\nGROUP BY category;",
    "syntaxBlueprint": "SELECT category, COUNT(*) AS items, SUM(stock_units) AS total_units, ROUND(AVG(unit_price), 2) AS avg_cost\nFROM GroceryItems\nGROUP BY category;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Report item count, total inventory units, and average price per category.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.7 Multi-Metric GROUP BY Rollups on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "category,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "items,"
      },
      {
        "type": "column",
        "value": "SUM(stock_units)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_units,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(unit_price),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_cost"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "category;"
      }
    ]
  },
  {
    "drillNumber": 365,
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "level": "Level 2 (Multi-Metric)",
    "title": "Syntax #365: Compute order volume and total revenue generated per shipping destination city",
    "table": "Orders",
    "scenario": "Compute order volume and total revenue generated per shipping destination city.",
    "businessObjective": "Compute order volume and total revenue generated per shipping destination city.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT shipping_city, COUNT(*) AS order_vol, SUM(quantity * unit_price) AS city_revenue\nFROM Orders\nGROUP BY shipping_city;",
    "syntaxBlueprint": "SELECT shipping_city, COUNT(*) AS order_vol, SUM(quantity * unit_price) AS city_revenue\nFROM Orders\nGROUP BY shipping_city;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Compute order volume and total revenue generated per shipping destination city.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.7 Multi-Metric GROUP BY Rollups on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "shipping_city,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "order_vol,"
      },
      {
        "type": "column",
        "value": "SUM(quantity"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "unit_price)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "city_revenue"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "shipping_city;"
      }
    ]
  },
  {
    "drillNumber": 366,
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "level": "Level 2 (Multi-Metric)",
    "title": "Syntax #366: Report song count, total stream plays, and average length per music genre",
    "table": "MusicTracks",
    "scenario": "Report song count, total stream plays, and average length per music genre.",
    "businessObjective": "Report song count, total stream plays, and average length per music genre.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT genre, COUNT(*) AS song_count, SUM(play_count) AS total_plays, ROUND(AVG(duration_seconds), 0) AS avg_sec\nFROM MusicTracks\nGROUP BY genre;",
    "syntaxBlueprint": "SELECT genre, COUNT(*) AS song_count, SUM(play_count) AS total_plays, ROUND(AVG(duration_seconds), 0) AS avg_sec\nFROM MusicTracks\nGROUP BY genre;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Report song count, total stream plays, and average length per music genre.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.7 Multi-Metric GROUP BY Rollups on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "song_count,"
      },
      {
        "type": "column",
        "value": "SUM(play_count)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_plays,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(duration_seconds),"
      },
      {
        "type": "column",
        "value": "0)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_sec"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre;"
      }
    ]
  },
  {
    "drillNumber": 367,
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "level": "Level 2 (Multi-Metric)",
    "title": "Syntax #367: Calculate membership count and average monthly visits per plan tier",
    "table": "GymMembers",
    "scenario": "Calculate membership count and average monthly visits per plan tier.",
    "businessObjective": "Calculate membership count and average monthly visits per plan tier.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT membership_plan, COUNT(*) AS members, ROUND(AVG(visits_this_month), 1) AS avg_attendance\nFROM GymMembers\nGROUP BY membership_plan;",
    "syntaxBlueprint": "SELECT membership_plan, COUNT(*) AS members, ROUND(AVG(visits_this_month), 1) AS avg_attendance\nFROM GymMembers\nGROUP BY membership_plan;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Calculate membership count and average monthly visits per plan tier.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.7 Multi-Metric GROUP BY Rollups on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "members,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(visits_this_month),"
      },
      {
        "type": "column",
        "value": "1)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_attendance"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "membership_plan;"
      }
    ]
  },
  {
    "drillNumber": 368,
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "level": "Level 2 (Multi-Metric)",
    "title": "Syntax #368: Analyze films reviewed and average star rating per release year",
    "table": "MovieReviews",
    "scenario": "Analyze films reviewed and average star rating per release year.",
    "businessObjective": "Analyze films reviewed and average star rating per release year.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT release_year, COUNT(*) AS films_reviewed, ROUND(AVG(star_rating), 2) AS year_avg_rating\nFROM MovieReviews\nGROUP BY release_year;",
    "syntaxBlueprint": "SELECT release_year, COUNT(*) AS films_reviewed, ROUND(AVG(star_rating), 2) AS year_avg_rating\nFROM MovieReviews\nGROUP BY release_year;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Analyze films reviewed and average star rating per release year.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.7 Multi-Metric GROUP BY Rollups on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "release_year,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "films_reviewed,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(star_rating),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "year_avg_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "release_year;"
      }
    ]
  },
  {
    "drillNumber": 369,
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "level": "Level 2 (Multi-Metric)",
    "title": "Syntax #369: Calculate flight count and average fare per destination airport",
    "table": "FlightSchedule",
    "scenario": "Calculate flight count and average fare per destination airport.",
    "businessObjective": "Calculate flight count and average fare per destination airport.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT destination_airport, COUNT(*) AS flights, ROUND(AVG(ticket_price), 2) AS avg_fare\nFROM FlightSchedule\nGROUP BY destination_airport;",
    "syntaxBlueprint": "SELECT destination_airport, COUNT(*) AS flights, ROUND(AVG(ticket_price), 2) AS avg_fare\nFROM FlightSchedule\nGROUP BY destination_airport;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Calculate flight count and average fare per destination airport.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.7 Multi-Metric GROUP BY Rollups on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "destination_airport,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "flights,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(ticket_price),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_fare"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "destination_airport;"
      }
    ]
  },
  {
    "drillNumber": 370,
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "level": "Level 2 (Multi-Metric)",
    "title": "Syntax #370: Determine patient count, average weight, and oldest age per animal species",
    "table": "PetClinic",
    "scenario": "Determine patient count, average weight, and oldest age per animal species.",
    "businessObjective": "Determine patient count, average weight, and oldest age per animal species.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT species, COUNT(*) AS patients, ROUND(AVG(weight_kg), 1) AS avg_weight, MAX(age_years) AS oldest_age\nFROM PetClinic\nGROUP BY species;",
    "syntaxBlueprint": "SELECT species, COUNT(*) AS patients, ROUND(AVG(weight_kg), 1) AS avg_weight, MAX(age_years) AS oldest_age\nFROM PetClinic\nGROUP BY species;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Determine patient count, average weight, and oldest age per animal species.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.7 Multi-Metric GROUP BY Rollups on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "species,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "patients,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(weight_kg),"
      },
      {
        "type": "column",
        "value": "1)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_weight,"
      },
      {
        "type": "column",
        "value": "MAX(age_years)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "oldest_age"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "species;"
      }
    ]
  },
  {
    "drillNumber": 371,
    "subcluster": "4.8 Multi-Column GROUP BY",
    "level": "Level 3 (Multi-Column Grouping)",
    "title": "Syntax #371: Group students by both city and major to see geographical major distribution",
    "table": "Students",
    "scenario": "Group students by both city and major to see geographical major distribution.",
    "businessObjective": "Group students by both city and major to see geographical major distribution.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT city, major, COUNT(*) AS student_count\nFROM Students\nGROUP BY city, major;",
    "syntaxBlueprint": "SELECT city, major, COUNT(*) AS student_count\nFROM Students\nGROUP BY city, major;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Group students by both city and major to see geographical major distribution.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.8 Multi-Column GROUP BY on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "city,"
      },
      {
        "type": "column",
        "value": "major,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "student_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "city,"
      },
      {
        "type": "column",
        "value": "major;"
      }
    ]
  },
  {
    "drillNumber": 372,
    "subcluster": "4.8 Multi-Column GROUP BY",
    "level": "Level 3 (Multi-Column Grouping)",
    "title": "Syntax #372: Count published books grouped by both genre and publication year",
    "table": "Books",
    "scenario": "Count published books grouped by both genre and publication year.",
    "businessObjective": "Count published books grouped by both genre and publication year.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT genre, publish_year, COUNT(*) AS book_count\nFROM Books\nGROUP BY genre, publish_year;",
    "syntaxBlueprint": "SELECT genre, publish_year, COUNT(*) AS book_count\nFROM Books\nGROUP BY genre, publish_year;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Count published books grouped by both genre and publication year.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.8 Multi-Column GROUP BY on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "publish_year,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "book_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "publish_year;"
      }
    ]
  },
  {
    "drillNumber": 373,
    "subcluster": "4.8 Multi-Column GROUP BY",
    "level": "Level 3 (Multi-Column Grouping)",
    "title": "Syntax #373: Count employees grouped by department and office city",
    "table": "Employees",
    "scenario": "Count employees grouped by department and office city.",
    "businessObjective": "Count employees grouped by department and office city.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT department, city, COUNT(*) AS office_headcount\nFROM Employees\nGROUP BY department, city;",
    "syntaxBlueprint": "SELECT department, city, COUNT(*) AS office_headcount\nFROM Employees\nGROUP BY department, city;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Count employees grouped by department and office city.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.8 Multi-Column GROUP BY on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "city,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "office_headcount"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "city;"
      }
    ]
  },
  {
    "drillNumber": 374,
    "subcluster": "4.8 Multi-Column GROUP BY",
    "level": "Level 3 (Multi-Column Grouping)",
    "title": "Syntax #374: Group grocery items by category and organic status (0 or 1), computing count and avg price",
    "table": "GroceryItems",
    "scenario": "Group grocery items by category and organic status (0 or 1), computing count and avg price.",
    "businessObjective": "Group grocery items by category and organic status (0 or 1), computing count and avg price.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT category, is_organic, COUNT(*) AS product_count, ROUND(AVG(unit_price), 2) AS avg_price\nFROM GroceryItems\nGROUP BY category, is_organic;",
    "syntaxBlueprint": "SELECT category, is_organic, COUNT(*) AS product_count, ROUND(AVG(unit_price), 2) AS avg_price\nFROM GroceryItems\nGROUP BY category, is_organic;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Group grocery items by category and organic status (0 or 1), computing count and avg price.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.8 Multi-Column GROUP BY on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "category,"
      },
      {
        "type": "column",
        "value": "is_organic,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "product_count,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(unit_price),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "category,"
      },
      {
        "type": "column",
        "value": "is_organic;"
      }
    ]
  },
  {
    "drillNumber": 375,
    "subcluster": "4.8 Multi-Column GROUP BY",
    "level": "Level 3 (Multi-Column Grouping)",
    "title": "Syntax #375: Track order counts partitioned by both shipping city and order status",
    "table": "Orders",
    "scenario": "Track order counts partitioned by both shipping city and order status.",
    "businessObjective": "Track order counts partitioned by both shipping city and order status.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT shipping_city, order_status, COUNT(*) AS order_count\nFROM Orders\nGROUP BY shipping_city, order_status;",
    "syntaxBlueprint": "SELECT shipping_city, order_status, COUNT(*) AS order_count\nFROM Orders\nGROUP BY shipping_city, order_status;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Track order counts partitioned by both shipping city and order status.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.8 Multi-Column GROUP BY on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "shipping_city,"
      },
      {
        "type": "column",
        "value": "order_status,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "order_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "shipping_city,"
      },
      {
        "type": "column",
        "value": "order_status;"
      }
    ]
  },
  {
    "drillNumber": 376,
    "subcluster": "4.8 Multi-Column GROUP BY",
    "level": "Level 3 (Multi-Column Grouping)",
    "title": "Syntax #376: Analyze track count and total plays grouped by genre and release year",
    "table": "MusicTracks",
    "scenario": "Analyze track count and total plays grouped by genre and release year.",
    "businessObjective": "Analyze track count and total plays grouped by genre and release year.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT genre, release_year, COUNT(*) AS tracks, SUM(play_count) AS yearly_plays\nFROM MusicTracks\nGROUP BY genre, release_year;",
    "syntaxBlueprint": "SELECT genre, release_year, COUNT(*) AS tracks, SUM(play_count) AS yearly_plays\nFROM MusicTracks\nGROUP BY genre, release_year;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Analyze track count and total plays grouped by genre and release year.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.8 Multi-Column GROUP BY on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "release_year,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "tracks,"
      },
      {
        "type": "column",
        "value": "SUM(play_count)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "yearly_plays"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "release_year;"
      }
    ]
  },
  {
    "drillNumber": 377,
    "subcluster": "4.8 Multi-Column GROUP BY",
    "level": "Level 3 (Multi-Column Grouping)",
    "title": "Syntax #377: Segment gym members by plan tier and active membership status",
    "table": "GymMembers",
    "scenario": "Segment gym members by plan tier and active membership status.",
    "businessObjective": "Segment gym members by plan tier and active membership status.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT membership_plan, is_active, COUNT(*) AS member_count\nFROM GymMembers\nGROUP BY membership_plan, is_active;",
    "syntaxBlueprint": "SELECT membership_plan, is_active, COUNT(*) AS member_count\nFROM GymMembers\nGROUP BY membership_plan, is_active;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Segment gym members by plan tier and active membership status.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.8 Multi-Column GROUP BY on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "is_active,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "member_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "is_active;"
      }
    ]
  },
  {
    "drillNumber": 378,
    "subcluster": "4.8 Multi-Column GROUP BY",
    "level": "Level 3 (Multi-Column Grouping)",
    "title": "Syntax #378: Group film reviews by genre and release year, analyzing count and average score",
    "table": "MovieReviews",
    "scenario": "Group film reviews by genre and release year, analyzing count and average score.",
    "businessObjective": "Group film reviews by genre and release year, analyzing count and average score.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT genre, release_year, COUNT(*) AS total_reviews, ROUND(AVG(star_rating), 2) AS avg_rating\nFROM MovieReviews\nGROUP BY genre, release_year;",
    "syntaxBlueprint": "SELECT genre, release_year, COUNT(*) AS total_reviews, ROUND(AVG(star_rating), 2) AS avg_rating\nFROM MovieReviews\nGROUP BY genre, release_year;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Group film reviews by genre and release year, analyzing count and average score.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.8 Multi-Column GROUP BY on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "release_year,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_reviews,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(star_rating),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "release_year;"
      }
    ]
  },
  {
    "drillNumber": 379,
    "subcluster": "4.8 Multi-Column GROUP BY",
    "level": "Level 3 (Multi-Column Grouping)",
    "title": "Syntax #379: Count scheduled flights for every distinct origin-to-destination flight route",
    "table": "FlightSchedule",
    "scenario": "Count scheduled flights for every distinct origin-to-destination flight route.",
    "businessObjective": "Count scheduled flights for every distinct origin-to-destination flight route.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT origin_airport, destination_airport, COUNT(*) AS route_flights\nFROM FlightSchedule\nGROUP BY origin_airport, destination_airport;",
    "syntaxBlueprint": "SELECT origin_airport, destination_airport, COUNT(*) AS route_flights\nFROM FlightSchedule\nGROUP BY origin_airport, destination_airport;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Count scheduled flights for every distinct origin-to-destination flight route.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.8 Multi-Column GROUP BY on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "origin_airport,"
      },
      {
        "type": "column",
        "value": "destination_airport,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "route_flights"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "origin_airport,"
      },
      {
        "type": "column",
        "value": "destination_airport;"
      }
    ]
  },
  {
    "drillNumber": 380,
    "subcluster": "4.8 Multi-Column GROUP BY",
    "level": "Level 3 (Multi-Column Grouping)",
    "title": "Syntax #380: Count registered pets grouped by species and specific breed",
    "table": "PetClinic",
    "scenario": "Count registered pets grouped by species and specific breed.",
    "businessObjective": "Count registered pets grouped by species and specific breed.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT species, breed, COUNT(*) AS pet_count\nFROM PetClinic\nGROUP BY species, breed;",
    "syntaxBlueprint": "SELECT species, breed, COUNT(*) AS pet_count\nFROM PetClinic\nGROUP BY species, breed;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Count registered pets grouped by species and specific breed.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.8 Multi-Column GROUP BY on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "species,"
      },
      {
        "type": "column",
        "value": "breed,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "pet_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "species,"
      },
      {
        "type": "column",
        "value": "breed;"
      }
    ]
  },
  {
    "drillNumber": 381,
    "subcluster": "4.9 Filtering Groups with HAVING",
    "level": "Level 3 (HAVING Clauses)",
    "title": "Syntax #381: Find majors that have 2 or more enrolled students using HAVING",
    "table": "Students",
    "scenario": "Find majors that have 2 or more enrolled students using HAVING.",
    "businessObjective": "Find majors that have 2 or more enrolled students using HAVING.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT major, COUNT(*) AS student_count\nFROM Students\nGROUP BY major\nHAVING COUNT(*) >= 2;",
    "syntaxBlueprint": "SELECT major, COUNT(*) AS student_count\nFROM Students\nGROUP BY major\nHAVING COUNT(*) >= 2;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Find majors that have 2 or more enrolled students using HAVING.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.9 Filtering Groups with HAVING on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "major,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "student_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "major"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "2;"
      }
    ]
  },
  {
    "drillNumber": 382,
    "subcluster": "4.9 Filtering Groups with HAVING",
    "level": "Level 3 (HAVING Clauses)",
    "title": "Syntax #382: Identify book genres where the average price exceeds $15.00",
    "table": "Books",
    "scenario": "Identify book genres where the average price exceeds $15.00.",
    "businessObjective": "Identify book genres where the average price exceeds $15.00.",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT genre, ROUND(AVG(price), 2) AS avg_price\nFROM Books\nGROUP BY genre\nHAVING AVG(price) > 15.00;",
    "syntaxBlueprint": "SELECT genre, ROUND(AVG(price), 2) AS avg_price\nFROM Books\nGROUP BY genre\nHAVING AVG(price) > 15.00;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Identify book genres where the average price exceeds $15.00.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.9 Filtering Groups with HAVING on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(price),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "AVG(price)"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "15.00;"
      }
    ]
  },
  {
    "drillNumber": 383,
    "subcluster": "4.9 Filtering Groups with HAVING",
    "level": "Level 3 (HAVING Clauses)",
    "title": "Syntax #383: List departments whose average employee salary is at least $80,000",
    "table": "Employees",
    "scenario": "List departments whose average employee salary is at least $80,000.",
    "businessObjective": "List departments whose average employee salary is at least $80,000.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT department, ROUND(AVG(salary), 2) AS avg_salary\nFROM Employees\nGROUP BY department\nHAVING AVG(salary) >= 80000;",
    "syntaxBlueprint": "SELECT department, ROUND(AVG(salary), 2) AS avg_salary\nFROM Employees\nGROUP BY department\nHAVING AVG(salary) >= 80000;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: List departments whose average employee salary is at least $80,000.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.9 Filtering Groups with HAVING on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(salary),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_salary"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "AVG(salary)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "80000;"
      }
    ]
  },
  {
    "drillNumber": 384,
    "subcluster": "4.9 Filtering Groups with HAVING",
    "level": "Level 3 (HAVING Clauses)",
    "title": "Syntax #384: Find grocery categories with over 100 total units in warehouse stock",
    "table": "GroceryItems",
    "scenario": "Find grocery categories with over 100 total units in warehouse stock.",
    "businessObjective": "Find grocery categories with over 100 total units in warehouse stock.",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT category, SUM(stock_units) AS total_units\nFROM GroceryItems\nGROUP BY category\nHAVING SUM(stock_units) > 100;",
    "syntaxBlueprint": "SELECT category, SUM(stock_units) AS total_units\nFROM GroceryItems\nGROUP BY category\nHAVING SUM(stock_units) > 100;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Find grocery categories with over 100 total units in warehouse stock.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.9 Filtering Groups with HAVING on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "category,"
      },
      {
        "type": "column",
        "value": "SUM(stock_units)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_units"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "category"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "SUM(stock_units)"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "100;"
      }
    ]
  },
  {
    "drillNumber": 385,
    "subcluster": "4.9 Filtering Groups with HAVING",
    "level": "Level 3 (HAVING Clauses)",
    "title": "Syntax #385: Show cities that have received 2 or more total orders",
    "table": "Orders",
    "scenario": "Show cities that have received 2 or more total orders.",
    "businessObjective": "Show cities that have received 2 or more total orders.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT shipping_city, COUNT(*) AS order_volume\nFROM Orders\nGROUP BY shipping_city\nHAVING COUNT(*) >= 2;",
    "syntaxBlueprint": "SELECT shipping_city, COUNT(*) AS order_volume\nFROM Orders\nGROUP BY shipping_city\nHAVING COUNT(*) >= 2;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Show cities that have received 2 or more total orders.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.9 Filtering Groups with HAVING on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "shipping_city,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "order_volume"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "shipping_city"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "2;"
      }
    ]
  },
  {
    "drillNumber": 386,
    "subcluster": "4.9 Filtering Groups with HAVING",
    "level": "Level 3 (HAVING Clauses)",
    "title": "Syntax #386: Identify music genres with over 1,000,000 collective play streams",
    "table": "MusicTracks",
    "scenario": "Identify music genres with over 1,000,000 collective play streams.",
    "businessObjective": "Identify music genres with over 1,000,000 collective play streams.",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT genre, SUM(play_count) AS total_plays\nFROM MusicTracks\nGROUP BY genre\nHAVING SUM(play_count) > 1000000;",
    "syntaxBlueprint": "SELECT genre, SUM(play_count) AS total_plays\nFROM MusicTracks\nGROUP BY genre\nHAVING SUM(play_count) > 1000000;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Identify music genres with over 1,000,000 collective play streams.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.9 Filtering Groups with HAVING on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "SUM(play_count)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_plays"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "SUM(play_count)"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "1000000;"
      }
    ]
  },
  {
    "drillNumber": 387,
    "subcluster": "4.9 Filtering Groups with HAVING",
    "level": "Level 3 (HAVING Clauses)",
    "title": "Syntax #387: Find membership tiers where members average 8 or more visits per month",
    "table": "GymMembers",
    "scenario": "Find membership tiers where members average 8 or more visits per month.",
    "businessObjective": "Find membership tiers where members average 8 or more visits per month.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT membership_plan, ROUND(AVG(visits_this_month), 1) AS avg_visits\nFROM GymMembers\nGROUP BY membership_plan\nHAVING AVG(visits_this_month) >= 8.0;",
    "syntaxBlueprint": "SELECT membership_plan, ROUND(AVG(visits_this_month), 1) AS avg_visits\nFROM GymMembers\nGROUP BY membership_plan\nHAVING AVG(visits_this_month) >= 8.0;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Find membership tiers where members average 8 or more visits per month.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.9 Filtering Groups with HAVING on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(visits_this_month),"
      },
      {
        "type": "column",
        "value": "1)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_visits"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "AVG(visits_this_month)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "8.0;"
      }
    ]
  },
  {
    "drillNumber": 388,
    "subcluster": "4.9 Filtering Groups with HAVING",
    "level": "Level 3 (HAVING Clauses)",
    "title": "Syntax #388: List movie genres maintaining a stellar average rating of 4.0 or higher",
    "table": "MovieReviews",
    "scenario": "List movie genres maintaining a stellar average rating of 4.0 or higher.",
    "businessObjective": "List movie genres maintaining a stellar average rating of 4.0 or higher.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT genre, ROUND(AVG(star_rating), 2) AS avg_rating\nFROM MovieReviews\nGROUP BY genre\nHAVING AVG(star_rating) >= 4.0;",
    "syntaxBlueprint": "SELECT genre, ROUND(AVG(star_rating), 2) AS avg_rating\nFROM MovieReviews\nGROUP BY genre\nHAVING AVG(star_rating) >= 4.0;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: List movie genres maintaining a stellar average rating of 4.0 or higher.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.9 Filtering Groups with HAVING on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(star_rating),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "AVG(star_rating)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "4.0;"
      }
    ]
  },
  {
    "drillNumber": 389,
    "subcluster": "4.9 Filtering Groups with HAVING",
    "level": "Level 3 (HAVING Clauses)",
    "title": "Syntax #389: Find origin airports operating 3 or more outgoing flights",
    "table": "FlightSchedule",
    "scenario": "Find origin airports operating 3 or more outgoing flights.",
    "businessObjective": "Find origin airports operating 3 or more outgoing flights.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT origin_airport, COUNT(*) AS flight_count\nFROM FlightSchedule\nGROUP BY origin_airport\nHAVING COUNT(*) >= 3;",
    "syntaxBlueprint": "SELECT origin_airport, COUNT(*) AS flight_count\nFROM FlightSchedule\nGROUP BY origin_airport\nHAVING COUNT(*) >= 3;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Find origin airports operating 3 or more outgoing flights.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.9 Filtering Groups with HAVING on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "origin_airport,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "flight_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "origin_airport"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "3;"
      }
    ]
  },
  {
    "drillNumber": 390,
    "subcluster": "4.9 Filtering Groups with HAVING",
    "level": "Level 3 (HAVING Clauses)",
    "title": "Syntax #390: Find species whose average patient weight exceeds 10.0 kilograms",
    "table": "PetClinic",
    "scenario": "Find species whose average patient weight exceeds 10.0 kilograms.",
    "businessObjective": "Find species whose average patient weight exceeds 10.0 kilograms.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT species, ROUND(AVG(weight_kg), 1) AS avg_weight\nFROM PetClinic\nGROUP BY species\nHAVING AVG(weight_kg) > 10.0;",
    "syntaxBlueprint": "SELECT species, ROUND(AVG(weight_kg), 1) AS avg_weight\nFROM PetClinic\nGROUP BY species\nHAVING AVG(weight_kg) > 10.0;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Find species whose average patient weight exceeds 10.0 kilograms.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.9 Filtering Groups with HAVING on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "species,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(weight_kg),"
      },
      {
        "type": "column",
        "value": "1)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_weight"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "AVG(weight_kg)"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "10.0;"
      }
    ]
  },
  {
    "drillNumber": 391,
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "level": "Level 3 (Bug Hunts & Full Pipelines)",
    "title": "Syntax #391: Full lifecycle query: filter by salary > 50000, group by department, keep groups with >= 2 staff, and order descending",
    "table": "Employees",
    "scenario": "Full lifecycle query: filter by salary > 50000, group by department, keep groups with >= 2 staff, and order descending.",
    "businessObjective": "Full lifecycle query: filter by salary > 50000, group by department, keep groups with >= 2 staff, and order descending.",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT department, COUNT(*) AS staff_count\nFROM Employees\nWHERE salary > 50000\nGROUP BY department\nHAVING COUNT(*) >= 2\nORDER BY staff_count DESC;",
    "syntaxBlueprint": "SELECT undefined\nFROM Employees;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Full lifecycle query: filter by salary > 50000, group by department, keep groups with >= 2 staff, and order descending.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.10 Full Lifecycle SQL & Bug Hunts on Employees.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "department,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "staff_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Employees"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "salary"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "50000"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "department"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "staff_count"
      },
      {
        "type": "keyword",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 392,
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "level": "Level 3 (Bug Hunts & Full Pipelines)",
    "title": "Syntax #392: Filter recent students (>= 2023), group by major, filter high-GPA majors (>= 3.5), and sort top 3",
    "table": "Students",
    "scenario": "Filter recent students (>= 2023), group by major, filter high-GPA majors (>= 3.5), and sort top 3.",
    "businessObjective": "Filter recent students (>= 2023), group by major, filter high-GPA majors (>= 3.5), and sort top 3.",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT major, ROUND(AVG(gpa), 2) AS avg_gpa\nFROM Students\nWHERE enrolled_year >= 2023\nGROUP BY major\nHAVING AVG(gpa) >= 3.5\nORDER BY avg_gpa DESC\nLIMIT 3;",
    "syntaxBlueprint": "SELECT undefined\nFROM Students;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Filter recent students (>= 2023), group by major, filter high-GPA majors (>= 3.5), and sort top 3.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.10 Full Lifecycle SQL & Bug Hunts on Students.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "major,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(gpa),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_gpa"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Students"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "enrolled_year"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "2023"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "major"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "AVG(gpa)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "3.5"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "avg_gpa"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "3;"
      }
    ]
  },
  {
    "drillNumber": 393,
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "level": "Level 3 (Bug Hunts & Full Pipelines)",
    "title": "Syntax #393: Fix the WHERE vs HAVING trap: replace 'WHERE COUNT(*) >= 2' with 'HAVING COUNT(*) >= 2' (aggregates cannot be in WHERE)",
    "table": "Books",
    "scenario": "Fix the WHERE vs HAVING trap: replace 'WHERE COUNT(*) >= 2' with 'HAVING COUNT(*) >= 2' (aggregates cannot be in WHERE).",
    "businessObjective": "Fix the WHERE vs HAVING trap: replace 'WHERE COUNT(*) >= 2' with 'HAVING COUNT(*) >= 2' (aggregates cannot be in WHERE).",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT genre, COUNT(*) AS title_count\nFROM Books\nGROUP BY genre\nHAVING COUNT(*) >= 2\nORDER BY title_count DESC;",
    "syntaxBlueprint": "SELECT undefined\nFROM Books;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Fix the WHERE vs HAVING trap: replace 'WHERE COUNT(*) >= 2' with 'HAVING COUNT(*) >= 2' (aggregates cannot be in WHERE).",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.10 Full Lifecycle SQL & Bug Hunts on Books.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "title_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Books"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "title_count"
      },
      {
        "type": "keyword",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 394,
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "level": "Level 3 (Bug Hunts & Full Pipelines)",
    "title": "Syntax #394: Properly combine row filtering in WHERE (stock_units > 10) with group filtering in HAVING (avg_price > 3.00)",
    "table": "GroceryItems",
    "scenario": "Properly combine row filtering in WHERE (stock_units > 10) with group filtering in HAVING (avg_price > 3.00).",
    "businessObjective": "Properly combine row filtering in WHERE (stock_units > 10) with group filtering in HAVING (avg_price > 3.00).",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT category, ROUND(AVG(unit_price), 2) AS avg_price\nFROM GroceryItems\nWHERE stock_units > 10\nGROUP BY category\nHAVING AVG(unit_price) > 3.00\nORDER BY avg_price ASC;",
    "syntaxBlueprint": "SELECT undefined\nFROM GroceryItems;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Properly combine row filtering in WHERE (stock_units > 10) with group filtering in HAVING (avg_price > 3.00).",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.10 Full Lifecycle SQL & Bug Hunts on GroceryItems.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "category,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(unit_price),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_price"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GroceryItems"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "stock_units"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "10"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "category"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "AVG(unit_price)"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "3.00"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "avg_price"
      },
      {
        "type": "keyword",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 395,
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "level": "Level 3 (Bug Hunts & Full Pipelines)",
    "title": "Syntax #395: Full lifecycle sales pipeline: filter delivered orders, group by city, filter revenue > 500, order by top revenue",
    "table": "Orders",
    "scenario": "Full lifecycle sales pipeline: filter delivered orders, group by city, filter revenue > 500, order by top revenue.",
    "businessObjective": "Full lifecycle sales pipeline: filter delivered orders, group by city, filter revenue > 500, order by top revenue.",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT shipping_city, SUM(quantity * unit_price) AS total_revenue\nFROM Orders\nWHERE order_status = 'Delivered'\nGROUP BY shipping_city\nHAVING SUM(quantity * unit_price) > 500\nORDER BY total_revenue DESC;",
    "syntaxBlueprint": "SELECT undefined\nFROM Orders;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Full lifecycle sales pipeline: filter delivered orders, group by city, filter revenue > 500, order by top revenue.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.10 Full Lifecycle SQL & Bug Hunts on Orders.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "shipping_city,"
      },
      {
        "type": "column",
        "value": "SUM(quantity"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "unit_price)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "total_revenue"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "Orders"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "order_status"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'Delivered'"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "shipping_city"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "SUM(quantity"
      },
      {
        "type": "column",
        "value": "*"
      },
      {
        "type": "column",
        "value": "unit_price)"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "500"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "total_revenue"
      },
      {
        "type": "keyword",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 396,
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "level": "Level 3 (Bug Hunts & Full Pipelines)",
    "title": "Syntax #396: Fix the missing GROUP BY error: 'SELECT genre, COUNT(*) FROM MusicTracks ORDER BY 2 DESC;' (must GROUP BY genre)",
    "table": "MusicTracks",
    "scenario": "Fix the missing GROUP BY error: 'SELECT genre, COUNT(*) FROM MusicTracks ORDER BY 2 DESC;' (must GROUP BY genre).",
    "businessObjective": "Fix the missing GROUP BY error: 'SELECT genre, COUNT(*) FROM MusicTracks ORDER BY 2 DESC;' (must GROUP BY genre).",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT genre, COUNT(*) AS track_count\nFROM MusicTracks\nGROUP BY genre\nORDER BY track_count DESC\nLIMIT 5;",
    "syntaxBlueprint": "SELECT undefined\nFROM MusicTracks;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Fix the missing GROUP BY error: 'SELECT genre, COUNT(*) FROM MusicTracks ORDER BY 2 DESC;' (must GROUP BY genre).",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.10 Full Lifecycle SQL & Bug Hunts on MusicTracks.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "genre,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "track_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MusicTracks"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "genre"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "track_count"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "5;"
      }
    ]
  },
  {
    "drillNumber": 397,
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "level": "Level 3 (Bug Hunts & Full Pipelines)",
    "title": "Syntax #397: Filter active gym members, group by plan, enforce active_count >= 2 with HAVING, and order descending",
    "table": "GymMembers",
    "scenario": "Filter active gym members, group by plan, enforce active_count >= 2 with HAVING, and order descending.",
    "businessObjective": "Filter active gym members, group by plan, enforce active_count >= 2 with HAVING, and order descending.",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT membership_plan, COUNT(*) AS active_count\nFROM GymMembers\nWHERE is_active = 1\nGROUP BY membership_plan\nHAVING COUNT(*) >= 2\nORDER BY active_count DESC;",
    "syntaxBlueprint": "SELECT undefined\nFROM GymMembers;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Filter active gym members, group by plan, enforce active_count >= 2 with HAVING, and order descending.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.10 Full Lifecycle SQL & Bug Hunts on GymMembers.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "membership_plan,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "active_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "GymMembers"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "is_active"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "membership_plan"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "active_count"
      },
      {
        "type": "keyword",
        "value": "DESC;"
      }
    ]
  },
  {
    "drillNumber": 398,
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "level": "Level 3 (Bug Hunts & Full Pipelines)",
    "title": "Syntax #398: Filter reviews >= 3.0 stars, group by release year, filter years with >= 2 reviews, and sort chronologically",
    "table": "MovieReviews",
    "scenario": "Filter reviews >= 3.0 stars, group by release year, filter years with >= 2 reviews, and sort chronologically.",
    "businessObjective": "Filter reviews >= 3.0 stars, group by release year, filter years with >= 2 reviews, and sort chronologically.",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT release_year, ROUND(AVG(star_rating), 2) AS avg_rating\nFROM MovieReviews\nWHERE star_rating >= 3.0\nGROUP BY release_year\nHAVING COUNT(*) >= 2\nORDER BY release_year ASC;",
    "syntaxBlueprint": "SELECT undefined\nFROM MovieReviews;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Filter reviews >= 3.0 stars, group by release year, filter years with >= 2 reviews, and sort chronologically.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.10 Full Lifecycle SQL & Bug Hunts on MovieReviews.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "release_year,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(star_rating),"
      },
      {
        "type": "column",
        "value": "2)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_rating"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "MovieReviews"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "star_rating"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "3.0"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "release_year"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "release_year"
      },
      {
        "type": "keyword",
        "value": "ASC;"
      }
    ]
  },
  {
    "drillNumber": 399,
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "level": "Level 3 (Bug Hunts & Full Pipelines)",
    "title": "Syntax #399: Analyze popular destinations: filter on-time flights, group by destination, filter count >= 2, return top 3",
    "table": "FlightSchedule",
    "scenario": "Analyze popular destinations: filter on-time flights, group by destination, filter count >= 2, return top 3.",
    "businessObjective": "Analyze popular destinations: filter on-time flights, group by destination, filter count >= 2, return top 3.",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT destination_airport, COUNT(*) AS flight_count\nFROM FlightSchedule\nWHERE status = 'On Time'\nGROUP BY destination_airport\nHAVING COUNT(*) >= 2\nORDER BY flight_count DESC\nLIMIT 3;",
    "syntaxBlueprint": "SELECT undefined\nFROM FlightSchedule;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Analyze popular destinations: filter on-time flights, group by destination, filter count >= 2, return top 3.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.10 Full Lifecycle SQL & Bug Hunts on FlightSchedule.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "destination_airport,"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "flight_count"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "FlightSchedule"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "status"
      },
      {
        "type": "column",
        "value": "="
      },
      {
        "type": "column",
        "value": "'On"
      },
      {
        "type": "column",
        "value": "Time'"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "destination_airport"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "COUNT(*)"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "2"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "flight_count"
      },
      {
        "type": "keyword",
        "value": "DESC"
      },
      {
        "type": "keyword",
        "value": "LIMIT"
      },
      {
        "type": "column",
        "value": "3;"
      }
    ]
  },
  {
    "drillNumber": 400,
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "level": "Level 3 (Bug Hunts & Full Pipelines)",
    "title": "Syntax #400: Fix clause order trap: ensure WHERE comes before GROUP BY and HAVING comes after GROUP BY",
    "table": "PetClinic",
    "scenario": "Fix clause order trap: ensure WHERE comes before GROUP BY and HAVING comes after GROUP BY.",
    "businessObjective": "Fix clause order trap: ensure WHERE comes before GROUP BY and HAVING comes after GROUP BY.",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT species, ROUND(AVG(weight_kg), 1) AS avg_weight\nFROM PetClinic\nWHERE age_years >= 1\nGROUP BY species\nHAVING AVG(weight_kg) > 5.0\nORDER BY avg_weight DESC;",
    "syntaxBlueprint": "SELECT undefined\nFROM PetClinic;",
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Fix clause order trap: ensure WHERE comes before GROUP BY and HAVING comes after GROUP BY.",
    "commonMistakes": "Using WHERE instead of HAVING for aggregate conditions, forgetting GROUP BY when projecting both raw columns and aggregates, or placing HAVING before GROUP BY.",
    "learningOutcomes": "Mastered 4.10 Full Lifecycle SQL & Bug Hunts on PetClinic.",
    "challengeSlots": [
      {
        "type": "keyword",
        "value": "SELECT"
      },
      {
        "type": "column",
        "value": "species,"
      },
      {
        "type": "column",
        "value": "ROUND(AVG(weight_kg),"
      },
      {
        "type": "column",
        "value": "1)"
      },
      {
        "type": "keyword",
        "value": "AS"
      },
      {
        "type": "column",
        "value": "avg_weight"
      },
      {
        "type": "keyword",
        "value": "FROM"
      },
      {
        "type": "table",
        "value": "PetClinic"
      },
      {
        "type": "keyword",
        "value": "WHERE"
      },
      {
        "type": "column",
        "value": "age_years"
      },
      {
        "type": "column",
        "value": ">="
      },
      {
        "type": "column",
        "value": "1"
      },
      {
        "type": "keyword",
        "value": "GROUP"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "species"
      },
      {
        "type": "keyword",
        "value": "HAVING"
      },
      {
        "type": "column",
        "value": "AVG(weight_kg)"
      },
      {
        "type": "column",
        "value": ">"
      },
      {
        "type": "column",
        "value": "5.0"
      },
      {
        "type": "keyword",
        "value": "ORDER"
      },
      {
        "type": "keyword",
        "value": "BY"
      },
      {
        "type": "column",
        "value": "avg_weight"
      },
      {
        "type": "keyword",
        "value": "DESC;"
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.SYNTAX_GYM_DRILLS = SYNTAX_GYM_DRILLS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SYNTAX_GYM_DRILLS };
}
