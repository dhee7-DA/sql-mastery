// =============================================================================
// SECTION 01: FOUNDATIONS & PROJECTIONS (100 INTERACTIVE MULTI-BLANK QUESTS)
// Progressive 2-to-5 Blank Challenge Engine with Tiered Difficulty
// =============================================================================

window.QUESTS_SECTION_1 = [
  {
    "id": 1,
    "levelDisplay": "Level 01",
    "title": "Level 01: Retrieve the Entire Students Table",
    "subtitle": "You are setting up the classroom roster. Retrieve all columns and all records for every enrolled student.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.1 Basic Projections",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Pull every column using the universal asterisk wildcard.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT *\nFROM Students;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Students;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "CHOOSE",
          "GET",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "*",
        "options": [
          "*",
          "ALL",
          "EVERY",
          "%"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "FROM",
          "SOURCE",
          "INTO",
          "TABLE"
        ]
      }
    },
    "explanation": "The asterisk (*) represents all columns. Always follow SELECT * with FROM and your table name. 💡 Trap to avoid: Writing 'SELECT ALL FROM Students;' (ALL is an aggregate modifier, not a column wildcard).",
    "commonMistakes": "Putting a semicolon after SELECT or forgetting the FROM keyword."
  },
  {
    "id": 2,
    "levelDisplay": "Level 02",
    "title": "Level 02: Inspect Available Library Books",
    "subtitle": "The librarian wants to review the full catalog including inventory and pricing.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.1 Basic Projections",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select every column from the Books catalog.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT *\nFROM Books;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Books;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "SELECT",
          "GET",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "*",
        "options": [
          "ALL",
          "*",
          "EVERY",
          "%"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "SOURCE",
          "FROM"
        ]
      }
    },
    "explanation": "A query must end with a semicolon in standard SQL clients. 💡 Trap to avoid: Typing the table name before SELECT.",
    "commonMistakes": "Omitting the semicolon at the end of the query."
  },
  {
    "id": 3,
    "levelDisplay": "Level 03",
    "title": "Level 03: Display Student First Names Only",
    "subtitle": "Generate an attendance roll call sheet displaying only the first name of each student.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.1 Basic Projections",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Extract a single specific column to minimize memory overhead.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT first_name\nFROM Students;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "first_name",
        "options": [
          "last_name",
          "first_name",
          "student_id",
          "enrolled_year"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "SOURCE",
          "TABLE",
          "FROM"
        ]
      },
      "slot3": {
        "correct": "Students;",
        "options": [
          "MusicTracks;",
          "FlightSchedule;",
          "Students;",
          "Employees;"
        ]
      }
    },
    "explanation": "When selecting a single column, no commas are used anywhere in the query. 💡 Trap to avoid: Writing 'SELECT first_name, FROM Students;' (trailing comma before FROM).",
    "commonMistakes": "Accidentally adding a comma after the single column name."
  },
  {
    "id": 4,
    "levelDisplay": "Level 04",
    "title": "Level 04: List All Book Titles",
    "subtitle": "Print the spine labels for bookstore shelves showing only book titles.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.1 Basic Projections",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select the title column from the Books table.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title\nFROM Books;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "title",
        "options": [
          "stock_qty",
          "price",
          "published_year",
          "title"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "SOURCE",
          "TABLE",
          "INTO"
        ]
      },
      "slot3": {
        "correct": "Books;",
        "options": [
          "MovieReviews;",
          "Students;",
          "Books;",
          "GroceryItems;"
        ]
      }
    },
    "explanation": "Column names are case-insensitive in ANSI SQL, but snake_case is standard practice. 💡 Trap to avoid: Wrapping the column name in single quotes ('title' will output the literal word 'title' for every row!).",
    "commonMistakes": "Putting single quotes around column identifiers."
  },
  {
    "id": 5,
    "levelDisplay": "Level 05",
    "title": "Level 05: Extract Music Track Titles",
    "subtitle": "A music streaming app needs to fetch just the track titles for an index screen.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.1 Basic Projections",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select the track_title column from MusicTracks.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, track_title VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "track_title",
        "options": [
          "genre",
          "artist",
          "track_title",
          "track_id"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "SOURCE",
          "TABLE"
        ]
      },
      "slot3": {
        "correct": "MusicTracks;",
        "options": [
          "MusicTracks;",
          "PetClinic;",
          "Books;",
          "Orders;"
        ]
      }
    },
    "explanation": "Ensure exact column spelling matches the database schema definition. 💡 Trap to avoid: Misspelling 'track_title' as 'track_name' or 'song'.",
    "commonMistakes": "Guessing column names instead of referencing the schema."
  },
  {
    "id": 6,
    "levelDisplay": "Level 06",
    "title": "Level 06: View All Grocery Inventory Items",
    "subtitle": "The supermarket stock manager performs an initial scan of the entire product table.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.1 Basic Projections",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Retrieve all columns from GroceryItems.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, is_organic BOOLEAN, calories INT, stock_units INT)",
    "targetQuery": "SELECT *\nFROM GroceryItems;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GroceryItems;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "CHOOSE",
          "SELECT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "*",
        "options": [
          "%",
          "*",
          "EVERY",
          "ALL"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "TABLE",
          "SOURCE"
        ]
      }
    },
    "explanation": "Asterisk selects columns in their physical storage order. 💡 Trap to avoid: Writing 'SELECT GroceryItems.*' when only one table is involved (redundant prefix).",
    "commonMistakes": "Overcomplicating the query with table qualifiers when scanning a single table."
  },
  {
    "id": 7,
    "levelDisplay": "Level 07",
    "title": "Level 07: Extract Employee Email Handles (Last Names)",
    "subtitle": "The IT department needs all employee last names to verify domain directory entries.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.1 Basic Projections",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select last_name from Employees.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, bonus DECIMAL, hire_date DATE)",
    "targetQuery": "SELECT last_name\nFROM Employees;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "last_name",
        "options": [
          "first_name",
          "salary",
          "last_name",
          "department"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "SOURCE",
          "FROM",
          "TABLE"
        ]
      },
      "slot3": {
        "correct": "Employees;",
        "options": [
          "MusicTracks;",
          "Orders;",
          "Employees;",
          "GroceryItems;"
        ]
      }
    },
    "explanation": "Specifying only the needed column saves network bandwidth and buffer cache. 💡 Trap to avoid: Using 'SELECT last_name;' without a FROM clause.",
    "commonMistakes": "Forgetting the FROM clause."
  },
  {
    "id": 8,
    "levelDisplay": "Level 08",
    "title": "Level 08: List Registered Pet Names",
    "subtitle": "The receptionist at the veterinary clinic needs a list of all patient pet names.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.1 Basic Projections",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select pet_name from PetClinic.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN, owner_city VARCHAR)",
    "targetQuery": "SELECT pet_name\nFROM PetClinic;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "pet_name",
        "options": [
          "weight_kg",
          "species",
          "age_years",
          "pet_name"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "INTO",
          "FROM",
          "TABLE"
        ]
      },
      "slot3": {
        "correct": "PetClinic;",
        "options": [
          "Orders;",
          "Students;",
          "PetClinic;",
          "Employees;"
        ]
      }
    },
    "explanation": "Target table follows immediately after the FROM keyword. 💡 Trap to avoid: Writing 'FROM PetClinic SELECT pet_name' (lexical syntax requires SELECT first).",
    "commonMistakes": "Inverting SELECT and FROM order."
  },
  {
    "id": 9,
    "levelDisplay": "Level 09",
    "title": "Level 09: Fetch Movie Titles for Marquee",
    "subtitle": "The cinema manager updates the outdoor marquee sign with all film titles.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.1 Basic Projections",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select movie_title from MovieReviews.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, genre VARCHAR, star_rating DECIMAL, release_year INT, review_length_words INT)",
    "targetQuery": "SELECT movie_title\nFROM MovieReviews;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "movie_title",
        "options": [
          "review_id",
          "star_rating",
          "movie_title",
          "director"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "FROM",
          "INTO"
        ]
      },
      "slot3": {
        "correct": "MovieReviews;",
        "options": [
          "Employees;",
          "Orders;",
          "MovieReviews;",
          "Students;"
        ]
      }
    },
    "explanation": "Keywords are traditionally uppercase and column names lowercase for readability. 💡 Trap to avoid: Writing 'SELECT movie title' without the underscore (space causes syntax parse failure).",
    "commonMistakes": "Omitting the underscore in multi-word column names."
  },
  {
    "id": 10,
    "levelDisplay": "Level 10",
    "title": "Level 10: Check Flight Number Schedule",
    "subtitle": "The departure board updates the list of all operating flight numbers.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.1 Basic Projections",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select flight_id from FlightSchedule.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id VARCHAR, airline VARCHAR, origin_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL, is_international BOOLEAN)",
    "targetQuery": "SELECT flight_id\nFROM FlightSchedule;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "flight_id",
        "options": [
          "flight_id",
          "destination_airport",
          "origin_airport",
          "departure_time"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "TABLE",
          "SOURCE"
        ]
      },
      "slot3": {
        "correct": "FlightSchedule;",
        "options": [
          "FlightSchedule;",
          "GymMembers;",
          "Books;",
          "Students;"
        ]
      }
    },
    "explanation": "Identifiers can contain numbers and underscores but cannot start with a number. 💡 Trap to avoid: Writing 'SELECT flight-id' with a hyphen (hyphen means subtraction!).",
    "commonMistakes": "Using a hyphen instead of an underscore."
  },
  {
    "id": 11,
    "levelDisplay": "Level 11",
    "title": "Level 11: Select the first name, last name, and GPA for all st...",
    "subtitle": "Select the first name, last name, and GPA for all students.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select the first name, last name, and GPA for all students.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT first_name, last_name, gpa\nFROM Students;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "first_name, last_name, gpa",
        "options": [
          "first_name + last_name + gpa",
          "first_name, last_name, gpa",
          "first_name AND last_name AND gpa",
          "(first_name, last_name, gpa)"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "TABLE",
          "SOURCE"
        ]
      },
      "slot3": {
        "correct": "Students;",
        "options": [
          "Students;",
          "GroceryItems;",
          "Employees;",
          "MusicTracks;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 12,
    "levelDisplay": "Level 12",
    "title": "Level 12: Display book title, author, and price for a book fai...",
    "subtitle": "Display book title, author, and price for a book fair catalog.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Display book title, author, and price for a book fair catalog.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, author, price\nFROM Books;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "title, author, price",
        "options": [
          "title AND author AND price",
          "title + author + price",
          "title, author, price",
          "(title, author, price)"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "INTO",
          "TABLE",
          "FROM"
        ]
      },
      "slot3": {
        "correct": "Books;",
        "options": [
          "Books;",
          "MovieReviews;",
          "GymMembers;",
          "GroceryItems;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 13,
    "levelDisplay": "Level 13",
    "title": "Level 13: Extract first name, department, and salary for the m...",
    "subtitle": "Extract first name, department, and salary for the monthly compensation review.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Extract first name, department, and salary for the monthly compensation review.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, department, salary\nFROM Employees;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "first_name, department, salary",
        "options": [
          "(first_name, department, salary)",
          "first_name AND department AND salary",
          "first_name + department + salary",
          "first_name, department, salary"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "SOURCE",
          "INTO",
          "TABLE"
        ]
      },
      "slot3": {
        "correct": "Employees;",
        "options": [
          "MusicTracks;",
          "Students;",
          "GroceryItems;",
          "Employees;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 14,
    "levelDisplay": "Level 14",
    "title": "Level 14: List grocery item name, its category, and unit price...",
    "subtitle": "List grocery item name, its category, and unit price for shelf price tags.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "List grocery item name, its category, and unit price for shelf price tags.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, category, unit_price\nFROM GroceryItems;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "item_name, category, unit_price",
        "options": [
          "item_name + category + unit_price",
          "item_name, category, unit_price",
          "item_name AND category AND unit_price",
          "(item_name, category, unit_price)"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "TABLE",
          "INTO",
          "FROM"
        ]
      },
      "slot3": {
        "correct": "GroceryItems;",
        "options": [
          "MusicTracks;",
          "GroceryItems;",
          "GymMembers;",
          "MovieReviews;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 15,
    "levelDisplay": "Level 15",
    "title": "Level 15: View customer name, purchased product, and ordered q...",
    "subtitle": "View customer name, purchased product, and ordered quantity on packing slips.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "View customer name, purchased product, and ordered quantity on packing slips.",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT customer_name, product_name, quantity\nFROM Orders;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "customer_name, product_name, quantity",
        "options": [
          "customer_name + product_name + quantity",
          "(customer_name, product_name, quantity)",
          "customer_name, product_name, quantity",
          "customer_name AND product_name AND quantity"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "SOURCE",
          "FROM"
        ]
      },
      "slot3": {
        "correct": "Orders;",
        "options": [
          "PetClinic;",
          "GymMembers;",
          "Orders;",
          "Employees;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 16,
    "levelDisplay": "Level 16",
    "title": "Level 16: Show track title, artist name, and duration in secon...",
    "subtitle": "Show track title, artist name, and duration in seconds for the media player.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Show track title, artist name, and duration in seconds for the media player.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT title, artist, duration_seconds\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ",  duration_seconds\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "title",
        "options": [
          "title",
          "genre",
          "artist",
          "track_id"
        ]
      },
      "slot2": {
        "correct": "artist",
        "options": [
          "duration_seconds",
          "artist",
          "title",
          "track_id"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "SOURCE",
          "FROM"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 17,
    "levelDisplay": "Level 17",
    "title": "Level 17: Fetch gym member name, plan type, and monthly fee fo...",
    "subtitle": "Fetch gym member name, plan type, and monthly fee for billing.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Fetch gym member name, plan type, and monthly fee for billing.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, membership_plan, monthly_fee\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ",  monthly_fee\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "member_name",
        "options": [
          "membership_plan",
          "member_name",
          "joined_date",
          "monthly_fee"
        ]
      },
      "slot2": {
        "correct": "membership_plan",
        "options": [
          "member_id",
          "membership_plan",
          "monthly_fee",
          "joined_date"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "INTO",
          "FROM",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 18,
    "levelDisplay": "Level 18",
    "title": "Level 18: Output movie title, director, and star rating for a ...",
    "subtitle": "Output movie title, director, and star rating for a film review website.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Output movie title, director, and star rating for a film review website.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, director, star_rating\nFROM MovieReviews;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ",  star_rating\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MovieReviews;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "movie_title",
        "options": [
          "review_id",
          "director",
          "movie_title",
          "review_count"
        ]
      },
      "slot2": {
        "correct": "director",
        "options": [
          "review_count",
          "star_rating",
          "movie_title",
          "director"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "SOURCE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 19,
    "levelDisplay": "Level 19",
    "title": "Level 19: Display flight ID, airline, origin airport, and dest...",
    "subtitle": "Display flight ID, airline, origin airport, and destination airport for the flight gate monitor.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Display flight ID, airline, origin airport, and destination airport for the flight gate monitor.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, airline, origin_airport, destination_airport\nFROM FlightSchedule;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ",  origin_airport, destination_airport\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " FlightSchedule;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "flight_id",
        "options": [
          "flight_id",
          "origin_airport",
          "destination_airport",
          "airline"
        ]
      },
      "slot2": {
        "correct": "airline",
        "options": [
          "airline",
          "destination_airport",
          "departure_time",
          "flight_id"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "INTO",
          "SOURCE",
          "FROM",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 20,
    "levelDisplay": "Level 20",
    "title": "Level 20: Retrieve pet name, species, age in years, and weight...",
    "subtitle": "Retrieve pet name, species, age in years, and weight in kg for veterinary patient intake.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Retrieve pet name, species, age in years, and weight in kg for veterinary patient intake.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, species, age_years, weight_kg\nFROM PetClinic;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ",  age_years, weight_kg\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "pet_name",
        "options": [
          "pet_id",
          "pet_name",
          "weight_kg",
          "species"
        ]
      },
      "slot2": {
        "correct": "species",
        "options": [
          "pet_name",
          "pet_id",
          "species",
          "weight_kg"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "INTO",
          "FROM",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 21,
    "levelDisplay": "Level 21",
    "title": "Level 21: Rename full_name to student_name and gpa to academic...",
    "subtitle": "Rename full_name to student_name and gpa to academic_gpa.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Rename full_name to student_name and gpa to academic_gpa.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name AS student_name, gpa AS academic_gpa\nFROM Students;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", gpa AS academic_gpa\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Students;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "full_name",
        "options": [
          "student_id",
          "major",
          "gpa",
          "full_name"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "LABEL",
          "NAME",
          "AS"
        ]
      },
      "slot3": {
        "correct": "student_name",
        "options": [
          "STUDENT_NAME",
          "col_student_name",
          "student_name_val",
          "student_name"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "INTO",
          "FROM",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 22,
    "levelDisplay": "Level 22",
    "title": "Level 22: Rename title to book_title and price to retail_price...",
    "subtitle": "Rename title to book_title and price to retail_price_usd.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Rename title to book_title and price to retail_price_usd.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title AS book_title, price AS retail_price_usd\nFROM Books;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", price AS retail_price_usd\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Books;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "title",
        "options": [
          "stock_qty",
          "title",
          "genre",
          "published_year"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "ALIAS",
          "NAME",
          "LABEL"
        ]
      },
      "slot3": {
        "correct": "book_title",
        "options": [
          "col_book_title",
          "BOOK_TITLE",
          "book_title_val",
          "book_title"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "INTO",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 23,
    "levelDisplay": "Level 23",
    "title": "Level 23: Alias first_name as employee and salary as base_comp...",
    "subtitle": "Alias first_name as employee and salary as base_compensation.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Alias first_name as employee and salary as base_compensation.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name AS employee, salary AS base_compensation\nFROM Employees;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", salary AS base_compensation\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "first_name",
        "options": [
          "department",
          "salary",
          "hire_date",
          "first_name"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "NAME",
          "LABEL",
          "ALIAS",
          "AS"
        ]
      },
      "slot3": {
        "correct": "employee",
        "options": [
          "employee_val",
          "EMPLOYEE",
          "employee",
          "col_employee"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "FROM",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 24,
    "levelDisplay": "Level 24",
    "title": "Level 24: Alias item_name to product and unit_price to cost_pe...",
    "subtitle": "Alias item_name to product and unit_price to cost_per_unit.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Alias item_name to product and unit_price to cost_per_unit.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name AS product, unit_price AS cost_per_unit\nFROM GroceryItems;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", unit_price AS cost_per_unit\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GroceryItems;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "item_name",
        "options": [
          "item_name",
          "category",
          "item_id",
          "stock_qty"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "NAME",
          "LABEL",
          "ALIAS"
        ]
      },
      "slot3": {
        "correct": "product",
        "options": [
          "PRODUCT",
          "product_val",
          "col_product",
          "product"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "INTO",
          "SOURCE",
          "FROM",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 25,
    "levelDisplay": "Level 25",
    "title": "Level 25: Rename customer_name to buyer and quantity to units_...",
    "subtitle": "Rename customer_name to buyer and quantity to units_ordered.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Rename customer_name to buyer and quantity to units_ordered.",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT customer_name AS buyer, quantity AS units_ordered\nFROM Orders;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", quantity AS units_ordered\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Orders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "customer_name",
        "options": [
          "product_name",
          "order_id",
          "quantity",
          "customer_name"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "AS",
          "NAME",
          "ALIAS"
        ]
      },
      "slot3": {
        "correct": "buyer",
        "options": [
          "buyer_val",
          "col_buyer",
          "BUYER",
          "buyer"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "FROM",
          "SOURCE",
          "INTO",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 26,
    "levelDisplay": "Level 26",
    "title": "Level 26: Alias track_title as song and artist_name as musician",
    "subtitle": "Alias track_title as song and artist_name as musician.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Alias track_title as song and artist_name as musician.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title AS song, artist_name AS musician\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", artist_name AS musician\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "track_title",
        "options": [
          "genre",
          "track_title",
          "track_id",
          "title"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "AS",
          "LABEL",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "song",
        "options": [
          "song_val",
          "col_song",
          "song",
          "SONG"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "FROM",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 27,
    "levelDisplay": "Level 27",
    "title": "Level 27: Rename member_name to client and monthly_fee to rate",
    "subtitle": "Rename member_name to client and monthly_fee to rate.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Rename member_name to client and monthly_fee to rate.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name AS client, monthly_fee AS rate\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", monthly_fee AS rate\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "member_name",
        "options": [
          "member_id",
          "monthly_fee",
          "joined_date",
          "member_name"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "LABEL",
          "AS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "client",
        "options": [
          "CLIENT",
          "client",
          "col_client",
          "client_val"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "FROM",
          "TABLE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 28,
    "levelDisplay": "Level 28",
    "title": "Level 28: Alias movie_title to film and star_rating to score",
    "subtitle": "Alias movie_title to film and star_rating to score.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Alias movie_title to film and star_rating to score.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title AS film, star_rating AS score\nFROM MovieReviews;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", star_rating AS score\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MovieReviews;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "movie_title",
        "options": [
          "star_rating",
          "director",
          "review_count",
          "movie_title"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "LABEL",
          "AS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "film",
        "options": [
          "FILM",
          "film",
          "film_val",
          "col_film"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "FROM",
          "SOURCE",
          "INTO",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 29,
    "levelDisplay": "Level 29",
    "title": "Level 29: Rename flight_id to flight_code and ticket_price to ...",
    "subtitle": "Rename flight_id to flight_code and ticket_price to fare_usd.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Rename flight_id to flight_code and ticket_price to fare_usd.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id AS flight_code, ticket_price AS fare_usd\nFROM FlightSchedule;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", ticket_price AS fare_usd\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " FlightSchedule;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "flight_id",
        "options": [
          "flight_id",
          "airline",
          "origin_airport",
          "departure_time"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "NAME",
          "LABEL",
          "ALIAS"
        ]
      },
      "slot3": {
        "correct": "flight_code",
        "options": [
          "col_flight_code",
          "flight_code",
          "flight_code_val",
          "FLIGHT_CODE"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "TABLE",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 30,
    "levelDisplay": "Level 30",
    "title": "Level 30: Alias pet_name to patient_name and age_years to pati...",
    "subtitle": "Alias pet_name to patient_name and age_years to patient_age.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Alias pet_name to patient_name and age_years to patient_age.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name AS patient_name, age_years AS patient_age\nFROM PetClinic;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", age_years AS patient_age\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "pet_name",
        "options": [
          "pet_id",
          "age_years",
          "weight_kg",
          "pet_name"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "ALIAS",
          "AS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "patient_name",
        "options": [
          "PATIENT_NAME",
          "patient_name",
          "col_patient_name",
          "patient_name_val"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "INTO",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 31,
    "levelDisplay": "Level 31",
    "title": "Level 31: Select full_name alongside a static text label 'Acti...",
    "subtitle": "Select full_name alongside a static text label 'Active' as enrollment_status.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Select full_name alongside a static text label 'Active' as enrollment_status.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, 'Active' AS enrollment_status\nFROM Students;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " enrollment_status\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "full_name, 'Active'",
        "options": [
          "full_name, 'Active'",
          "full_name, Active",
          "full_name, \"Active\"",
          "'Inactive'"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "NAME",
          "AS",
          "LABEL"
        ]
      },
      "slot3": {
        "correct": "Students;",
        "options": [
          "GymMembers;",
          "Orders;",
          "Students;",
          "Books;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 32,
    "levelDisplay": "Level 32",
    "title": "Level 32: Select book title and a fixed location string 'Centr...",
    "subtitle": "Select book title and a fixed location string 'Central Library' as branch_location.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Select book title and a fixed location string 'Central Library' as branch_location.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, 'Central Library' AS branch_location\nFROM Books;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " branch_location\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "title, 'Central Library'",
        "options": [
          "'Inactive'",
          "title, \"Central Library\"",
          "title, Central Library",
          "title, 'Central Library'"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "NAME",
          "LABEL",
          "ALIAS",
          "AS"
        ]
      },
      "slot3": {
        "correct": "Books;",
        "options": [
          "Books;",
          "MovieReviews;",
          "PetClinic;",
          "FlightSchedule;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 33,
    "levelDisplay": "Level 33",
    "title": "Level 33: Select employee first_name alongside a fixed numeric...",
    "subtitle": "Select employee first_name alongside a fixed numerical year 2026 as review_year.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Select employee first_name alongside a fixed numerical year 2026 as review_year.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, 2026 AS review_year\nFROM Employees;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " review_year\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "first_name, 2026",
        "options": [
          "department",
          "emp_id",
          "first_name, 2026",
          "first_name"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "ALIAS",
          "AS"
        ]
      },
      "slot3": {
        "correct": "Employees;",
        "options": [
          "Books;",
          "Employees;",
          "PetClinic;",
          "FlightSchedule;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 34,
    "levelDisplay": "Level 34",
    "title": "Level 34: Display item_name with a constant string 'In Stock' ...",
    "subtitle": "Display item_name with a constant string 'In Stock' as availability.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Display item_name with a constant string 'In Stock' as availability.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, 'In Stock' AS availability\nFROM GroceryItems;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " availability\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "item_name, 'In Stock'",
        "options": [
          "item_name, 'In Stock'",
          "item_name, \"In Stock\"",
          "'Inactive'",
          "item_name, In Stock"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "NAME",
          "LABEL",
          "ALIAS"
        ]
      },
      "slot3": {
        "correct": "GroceryItems;",
        "options": [
          "GroceryItems;",
          "GymMembers;",
          "MovieReviews;",
          "Orders;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 35,
    "levelDisplay": "Level 35",
    "title": "Level 35: Select order_id with a boolean literal TRUE as is_ve...",
    "subtitle": "Select order_id with a boolean literal TRUE as is_verified.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Select order_id with a boolean literal TRUE as is_verified.",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, TRUE AS is_verified\nFROM Orders;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " is_verified\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "order_id, TRUE",
        "options": [
          "order_id, TRUE",
          "customer_name",
          "order_id",
          "quantity"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "ALIAS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "Orders;",
        "options": [
          "Students;",
          "Orders;",
          "Employees;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 36,
    "levelDisplay": "Level 36",
    "title": "Level 36: Select track_title with constant text 'HQ Audio' as ...",
    "subtitle": "Select track_title with constant text 'HQ Audio' as format_type.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Select track_title with constant text 'HQ Audio' as format_type.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, 'HQ Audio' AS format_type\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " format_type\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "track_title, 'HQ Audio'",
        "options": [
          "'Inactive'",
          "track_title, 'HQ Audio'",
          "track_title, HQ Audio",
          "track_title, \"HQ Audio\""
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "NAME",
          "AS",
          "LABEL",
          "ALIAS"
        ]
      },
      "slot3": {
        "correct": "MusicTracks;",
        "options": [
          "GroceryItems;",
          "MusicTracks;",
          "MovieReviews;",
          "Employees;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 37,
    "levelDisplay": "Level 37",
    "title": "Level 37: Display member_name with a constant integer 30 as gr...",
    "subtitle": "Display member_name with a constant integer 30 as grace_period_days.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Display member_name with a constant integer 30 as grace_period_days.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, 30 AS grace_period_days\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " grace_period_days\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "member_name, 30",
        "options": [
          "joined_date",
          "member_name, 30",
          "member_name",
          "membership_plan"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "NAME",
          "AS",
          "ALIAS",
          "LABEL"
        ]
      },
      "slot3": {
        "correct": "GymMembers;",
        "options": [
          "Orders;",
          "Students;",
          "GymMembers;",
          "GroceryItems;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 38,
    "levelDisplay": "Level 38",
    "title": "Level 38: Select movie_title with a decimal constant 5.0 as ma...",
    "subtitle": "Select movie_title with a decimal constant 5.0 as max_possible_rating.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Select movie_title with a decimal constant 5.0 as max_possible_rating.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, 5.0 AS max_possible_rating\nFROM MovieReviews;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " max_possible_rating\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "movie_title, 5.0",
        "options": [
          "review_id",
          "star_rating",
          "review_count",
          "movie_title, 5.0"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "NAME",
          "ALIAS",
          "LABEL",
          "AS"
        ]
      },
      "slot3": {
        "correct": "MovieReviews;",
        "options": [
          "Books;",
          "MovieReviews;",
          "Employees;",
          "GymMembers;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 39,
    "levelDisplay": "Level 39",
    "title": "Level 39: Select flight_id with a static string 'Terminal 2' a...",
    "subtitle": "Select flight_id with a static string 'Terminal 2' as assigned_terminal.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Select flight_id with a static string 'Terminal 2' as assigned_terminal.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, 'Terminal 2' AS assigned_terminal\nFROM FlightSchedule;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " assigned_terminal\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "flight_id, 'Terminal 2'",
        "options": [
          "flight_id, Terminal 2",
          "flight_id, \"Terminal 2\"",
          "'Inactive'",
          "flight_id, 'Terminal 2'"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "NAME",
          "LABEL",
          "AS",
          "ALIAS"
        ]
      },
      "slot3": {
        "correct": "FlightSchedule;",
        "options": [
          "FlightSchedule;",
          "MovieReviews;",
          "Employees;",
          "GroceryItems;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 40,
    "levelDisplay": "Level 40",
    "title": "Level 40: Display pet_name with fixed text 'Downtown Vet' as c...",
    "subtitle": "Display pet_name with fixed text 'Downtown Vet' as clinic_name.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Display pet_name with fixed text 'Downtown Vet' as clinic_name.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, 'Downtown Vet' AS clinic_name\nFROM PetClinic;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " clinic_name\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "pet_name, 'Downtown Vet'",
        "options": [
          "pet_name, 'Downtown Vet'",
          "pet_name, \"Downtown Vet\"",
          "'Inactive'",
          "pet_name, Downtown Vet"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "ALIAS",
          "AS"
        ]
      },
      "slot3": {
        "correct": "PetClinic;",
        "options": [
          "GroceryItems;",
          "Orders;",
          "PetClinic;",
          "FlightSchedule;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 41,
    "levelDisplay": "Level 41",
    "title": "Level 41: Calculate the total inventory value by multiplying p...",
    "subtitle": "Calculate the total inventory value by multiplying price by stock_qty.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Calculate the total inventory value by multiplying price by stock_qty.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price, (price * stock_qty) AS total_inventory_value\nFROM Books;",
    "template": [
      {
        "text": "SELECT title, price, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "(price * stock_qty)",
        "options": [
          "(price - stock_qty)",
          "(price / stock_qty)",
          "(price * stock_qty)",
          "(price + stock_qty)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "NAME",
          "LABEL",
          "ALIAS",
          "AS"
        ]
      },
      "slot3": {
        "correct": "total_inventory_value",
        "options": [
          "calc_total_inventory_value",
          "TOTAL_INVENTORY_VALUE",
          "total_inventory_value_val",
          "total_inventory_value"
        ]
      },
      "slot4": {
        "correct": "Books;",
        "options": [
          "Employees;",
          "Books;",
          "FlightSchedule;",
          "MusicTracks;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 42,
    "levelDisplay": "Level 42",
    "title": "Level 42: Compute order subtotal by multiplying unit_price by ...",
    "subtitle": "Compute order subtotal by multiplying unit_price by quantity.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Compute order subtotal by multiplying unit_price by quantity.",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, (unit_price * quantity) AS subtotal\nFROM Orders;",
    "template": [
      {
        "text": "SELECT order_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "(unit_price * quantity)",
        "options": [
          "(unit_price / quantity)",
          "(unit_price - quantity)",
          "(unit_price * quantity)",
          "(unit_price + quantity)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "NAME",
          "LABEL",
          "AS"
        ]
      },
      "slot3": {
        "correct": "subtotal",
        "options": [
          "subtotal_val",
          "calc_subtotal",
          "subtotal",
          "SUBTOTAL"
        ]
      },
      "slot4": {
        "correct": "Orders;",
        "options": [
          "MovieReviews;",
          "FlightSchedule;",
          "Orders;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 43,
    "levelDisplay": "Level 43",
    "title": "Level 43: Calculate a 10% raise amount and the resulting proje...",
    "subtitle": "Calculate a 10% raise amount and the resulting projected salary.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Calculate a 10% raise amount and the resulting projected salary.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary, (salary * 0.10) AS raise_amount, (salary * 1.10) AS projected_salary\nFROM Employees;",
    "template": [
      {
        "text": "SELECT first_name, salary, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "(salary * 0.10)",
        "options": [
          "(salary + 0.10)",
          "(salary - 0.10)",
          "(salary / 0.10)",
          "(salary * 0.10)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "ALIAS",
          "LABEL",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "raise_amount, (salary * 1.10) AS projected_salary",
        "options": [
          "raise_amount, (salary * 1.10) AS projected_salary_val",
          "calc_raise_amount, (salary * 1.10) AS projected_salary",
          "raise_amount, (salary * 1.10) AS projected_salary",
          "RAISE_AMOUNT, (SALARY * 1.10) AS PROJECTED_SALARY"
        ]
      },
      "slot4": {
        "correct": "Employees;",
        "options": [
          "Orders;",
          "Books;",
          "Employees;",
          "GroceryItems;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 44,
    "levelDisplay": "Level 44",
    "title": "Level 44: Convert a 4.0 GPA to an approximate 100-point scale ...",
    "subtitle": "Convert a 4.0 GPA to an approximate 100-point scale by multiplying by 25.0.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Convert a 4.0 GPA to an approximate 100-point scale by multiplying by 25.0.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, gpa, (gpa * 25.0) AS gpa_percentage\nFROM Students;",
    "template": [
      {
        "text": "SELECT full_name, gpa, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "(gpa * 25.0)",
        "options": [
          "(gpa / 25.0)",
          "(gpa + 25.0)",
          "(gpa * 25.0)",
          "(gpa - 25.0)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "LABEL",
          "NAME",
          "AS"
        ]
      },
      "slot3": {
        "correct": "gpa_percentage",
        "options": [
          "gpa_percentage",
          "GPA_PERCENTAGE",
          "calc_gpa_percentage",
          "gpa_percentage_val"
        ]
      },
      "slot4": {
        "correct": "Students;",
        "options": [
          "Orders;",
          "MovieReviews;",
          "Students;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 45,
    "levelDisplay": "Level 45",
    "title": "Level 45: Calculate the item price including an 8% sales tax (...",
    "subtitle": "Calculate the item price including an 8% sales tax (unit_price * 1.08).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Calculate the item price including an 8% sales tax (unit_price * 1.08).",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price, (unit_price * 1.08) AS price_with_tax\nFROM GroceryItems;",
    "template": [
      {
        "text": "SELECT item_name, unit_price, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "(unit_price * 1.08)",
        "options": [
          "(unit_price * 1.08)",
          "(unit_price - 1.08)",
          "(unit_price / 1.08)",
          "(unit_price + 1.08)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "AS",
          "LABEL",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "price_with_tax",
        "options": [
          "price_with_tax_val",
          "calc_price_with_tax",
          "price_with_tax",
          "PRICE_WITH_TAX"
        ]
      },
      "slot4": {
        "correct": "GroceryItems;",
        "options": [
          "FlightSchedule;",
          "GymMembers;",
          "MusicTracks;",
          "GroceryItems;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 46,
    "levelDisplay": "Level 46",
    "title": "Level 46: Convert duration in seconds into fractional minutes ...",
    "subtitle": "Convert duration in seconds into fractional minutes by dividing by 60.0.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Convert duration in seconds into fractional minutes by dividing by 60.0.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, duration_seconds, (duration_seconds / 60.0) AS duration_minutes\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT track_title, duration_seconds, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "(duration_seconds / 60.0)",
        "options": [
          "(duration_seconds + 60.0)",
          "(duration_seconds - 60.0)",
          "(duration_seconds / 60.0)",
          "(duration_seconds * 60.0)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "ALIAS",
          "AS"
        ]
      },
      "slot3": {
        "correct": "duration_minutes",
        "options": [
          "duration_minutes",
          "DURATION_MINUTES",
          "duration_minutes_val",
          "calc_duration_minutes"
        ]
      },
      "slot4": {
        "correct": "MusicTracks;",
        "options": [
          "PetClinic;",
          "MovieReviews;",
          "Students;",
          "MusicTracks;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 47,
    "levelDisplay": "Level 47",
    "title": "Level 47: Compute the total annual membership cost by multiply...",
    "subtitle": "Compute the total annual membership cost by multiplying monthly_fee by 12.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Compute the total annual membership cost by multiplying monthly_fee by 12.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, monthly_fee, (monthly_fee * 12) AS annual_cost\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT member_name, monthly_fee, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "(monthly_fee * 12)",
        "options": [
          "(monthly_fee / 12)",
          "(monthly_fee - 12)",
          "(monthly_fee * 12)",
          "(monthly_fee + 12)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "ALIAS",
          "NAME",
          "LABEL"
        ]
      },
      "slot3": {
        "correct": "annual_cost",
        "options": [
          "calc_annual_cost",
          "annual_cost_val",
          "ANNUAL_COST",
          "annual_cost"
        ]
      },
      "slot4": {
        "correct": "GymMembers;",
        "options": [
          "GymMembers;",
          "Orders;",
          "MovieReviews;",
          "Employees;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 48,
    "levelDisplay": "Level 48",
    "title": "Level 48: Add a $35 standard checked bag fee to ticket_price",
    "subtitle": "Add a $35 standard checked bag fee to ticket_price.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Add a $35 standard checked bag fee to ticket_price.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, ticket_price, (ticket_price + 35.00) AS price_with_baggage\nFROM FlightSchedule;",
    "template": [
      {
        "text": "SELECT flight_id, ticket_price, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "(ticket_price + 35.00)",
        "options": [
          "(ticket_price / 35.00)",
          "(ticket_price + 35.00)",
          "(ticket_price * 35.00)",
          "(ticket_price - 35.00)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "NAME",
          "LABEL",
          "AS"
        ]
      },
      "slot3": {
        "correct": "price_with_baggage",
        "options": [
          "PRICE_WITH_BAGGAGE",
          "calc_price_with_baggage",
          "price_with_baggage",
          "price_with_baggage_val"
        ]
      },
      "slot4": {
        "correct": "FlightSchedule;",
        "options": [
          "PetClinic;",
          "GroceryItems;",
          "MovieReviews;",
          "FlightSchedule;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 49,
    "levelDisplay": "Level 49",
    "title": "Level 49: Convert pet weight from kilograms to pounds by multi...",
    "subtitle": "Convert pet weight from kilograms to pounds by multiplying by 2.20462.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Convert pet weight from kilograms to pounds by multiplying by 2.20462.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, weight_kg, (weight_kg * 2.20462) AS weight_lbs\nFROM PetClinic;",
    "template": [
      {
        "text": "SELECT pet_name, weight_kg, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "(weight_kg * 2.20462)",
        "options": [
          "(weight_kg + 2.20462)",
          "(weight_kg * 2.20462)",
          "(weight_kg / 2.20462)",
          "(weight_kg - 2.20462)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "NAME",
          "LABEL",
          "ALIAS",
          "AS"
        ]
      },
      "slot3": {
        "correct": "weight_lbs",
        "options": [
          "weight_lbs_val",
          "calc_weight_lbs",
          "WEIGHT_LBS",
          "weight_lbs"
        ]
      },
      "slot4": {
        "correct": "PetClinic;",
        "options": [
          "GroceryItems;",
          "Orders;",
          "FlightSchedule;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 50,
    "levelDisplay": "Level 50",
    "title": "Level 50: Calculate the final discounted total: subtotal times...",
    "subtitle": "Calculate the final discounted total: subtotal times (1 - discount_pct).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Calculate the final discounted total: subtotal times (1 - discount_pct).",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, unit_price, quantity, ((unit_price * quantity) * (1 - discount_pct)) AS final_charged_amount\nFROM Orders;",
    "template": [
      {
        "text": "SELECT order_id, unit_price, quantity, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "((unit_price * quantity) * (1 - discount_pct))",
        "options": [
          "((unit_price - quantity) - (1 - discount_pct))",
          "((unit_price * quantity) * (1 - discount_pct))",
          "((unit_price / quantity) / (1 - discount_pct))",
          "((unit_price + quantity) + (1 - discount_pct))"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "ALIAS",
          "LABEL",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "final_charged_amount",
        "options": [
          "final_charged_amount_val",
          "final_charged_amount",
          "calc_final_charged_amount",
          "FINAL_CHARGED_AMOUNT"
        ]
      },
      "slot4": {
        "correct": "Orders;",
        "options": [
          "FlightSchedule;",
          "GroceryItems;",
          "Students;",
          "Orders;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 51,
    "levelDisplay": "Level 51",
    "title": "Level 51: Round calculated price with 8.25% sales tax to 2 dec...",
    "subtitle": "Round calculated price with 8.25% sales tax to 2 decimal places using ROUND().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Round calculated price with 8.25% sales tax to 2 decimal places using ROUND().",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, ROUND(unit_price * 1.0825, 2) AS rounded_tax_price\nFROM GroceryItems;",
    "template": [
      {
        "text": "SELECT item_name, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GroceryItems;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND(unit_price * 1.0825, 2)",
        "options": [
          "ROUND(unit_price - 1.0825, 2)",
          "ROUND(unit_price * 1.0825, 2)",
          "ROUND(unit_price + 1.0825, 2)",
          "ROUND(unit_price / 1.0825, 2)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "NAME",
          "ALIAS"
        ]
      },
      "slot3": {
        "correct": "rounded_tax_price",
        "options": [
          "rounded_tax_price",
          "computed_rounded_tax_price",
          "ROUNDED_TAX_PRICE",
          "rounded_tax_price_num"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "TABLE",
          "FROM",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 52,
    "levelDisplay": "Level 52",
    "title": "Level 52: Round GPA to 1 decimal place using ROUND(gpa, 1)",
    "subtitle": "Round GPA to 1 decimal place using ROUND(gpa, 1).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Round GPA to 1 decimal place using ROUND(gpa, 1).",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, ROUND(gpa, 1) AS rounded_gpa\nFROM Students;",
    "template": [
      {
        "text": "SELECT full_name, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Students;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND(gpa, 1)",
        "options": [
          "round_fn(gpa, 1)",
          "CALC_ROUND(gpa, 1)",
          "ROUND(gpa, 1)",
          "GET_ROUND(gpa, 1)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "LABEL",
          "AS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "rounded_gpa",
        "options": [
          "rounded_gpa_num",
          "ROUNDED_GPA",
          "rounded_gpa",
          "computed_rounded_gpa"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "TABLE",
          "FROM",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 53,
    "levelDisplay": "Level 53",
    "title": "Level 53: Extract whole minutes of track duration using FLOOR(...",
    "subtitle": "Extract whole minutes of track duration using FLOOR(duration_seconds / 60).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Extract whole minutes of track duration using FLOOR(duration_seconds / 60).",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, FLOOR(duration_seconds / 60) AS whole_minutes\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT track_title, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FLOOR(duration_seconds / 60)",
        "options": [
          "FLOOR(duration_seconds * 60)",
          "FLOOR(duration_seconds + 60)",
          "FLOOR(duration_seconds / 60)",
          "FLOOR(duration_seconds - 60)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "AS",
          "ALIAS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "whole_minutes",
        "options": [
          "whole_minutes",
          "whole_minutes_num",
          "WHOLE_MINUTES",
          "computed_whole_minutes"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "SOURCE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 54,
    "levelDisplay": "Level 54",
    "title": "Level 54: Round monthly fee up to the nearest whole integer us...",
    "subtitle": "Round monthly fee up to the nearest whole integer using CEIL().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Round monthly fee up to the nearest whole integer using CEIL().",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, CEIL(monthly_fee) AS rounded_up_fee\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT member_name, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CEIL(monthly_fee)",
        "options": [
          "CALC_CEIL(monthly_fee)",
          "ceil_fn(monthly_fee)",
          "CEIL(monthly_fee)",
          "GET_CEIL(monthly_fee)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "ALIAS",
          "AS"
        ]
      },
      "slot3": {
        "correct": "rounded_up_fee",
        "options": [
          "computed_rounded_up_fee",
          "ROUNDED_UP_FEE",
          "rounded_up_fee",
          "rounded_up_fee_num"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "SOURCE",
          "FROM"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 55,
    "levelDisplay": "Level 55",
    "title": "Level 55: Calculate and round exact discount savings to 2 deci...",
    "subtitle": "Calculate and round exact discount savings to 2 decimal places.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Calculate and round exact discount savings to 2 decimal places.",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, ROUND((unit_price * quantity) * discount_pct, 2) AS discount_savings\nFROM Orders;",
    "template": [
      {
        "text": "SELECT order_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Orders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND((unit_price * quantity) * discount_pct, 2)",
        "options": [
          "ROUND((unit_price / quantity) / discount_pct, 2)",
          "ROUND((unit_price + quantity) + discount_pct, 2)",
          "ROUND((unit_price - quantity) - discount_pct, 2)",
          "ROUND((unit_price * quantity) * discount_pct, 2)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "ALIAS",
          "AS"
        ]
      },
      "slot3": {
        "correct": "discount_savings",
        "options": [
          "DISCOUNT_SAVINGS",
          "discount_savings_num",
          "discount_savings",
          "computed_discount_savings"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "INTO",
          "FROM"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 56,
    "levelDisplay": "Level 56",
    "title": "Level 56: Calculate and round base fare before 15% airport fees",
    "subtitle": "Calculate and round base fare before 15% airport fees.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Calculate and round base fare before 15% airport fees.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, ROUND(ticket_price / 1.15, 2) AS base_fare_before_tax\nFROM FlightSchedule;",
    "template": [
      {
        "text": "SELECT flight_id, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " FlightSchedule;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND(ticket_price / 1.15, 2)",
        "options": [
          "ROUND(ticket_price / 1.15, 2)",
          "ROUND(ticket_price * 1.15, 2)",
          "ROUND(ticket_price - 1.15, 2)",
          "ROUND(ticket_price + 1.15, 2)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "AS",
          "ALIAS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "base_fare_before_tax",
        "options": [
          "computed_base_fare_before_tax",
          "base_fare_before_tax",
          "BASE_FARE_BEFORE_TAX",
          "base_fare_before_tax_num"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "INTO",
          "SOURCE",
          "TABLE",
          "FROM"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 57,
    "levelDisplay": "Level 57",
    "title": "Level 57: Convert weight to pounds and round to 1 decimal place",
    "subtitle": "Convert weight to pounds and round to 1 decimal place.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Convert weight to pounds and round to 1 decimal place.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, ROUND(weight_kg * 2.20462, 1) AS rounded_lbs\nFROM PetClinic;",
    "template": [
      {
        "text": "SELECT pet_name, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND(weight_kg * 2.20462, 1)",
        "options": [
          "ROUND(weight_kg / 2.20462, 1)",
          "ROUND(weight_kg * 2.20462, 1)",
          "ROUND(weight_kg - 2.20462, 1)",
          "ROUND(weight_kg + 2.20462, 1)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "LABEL",
          "AS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "rounded_lbs",
        "options": [
          "ROUNDED_LBS",
          "computed_rounded_lbs",
          "rounded_lbs_num",
          "rounded_lbs"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "INTO",
          "TABLE",
          "FROM"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 58,
    "levelDisplay": "Level 58",
    "title": "Level 58: Calculate the absolute deviation from target invento...",
    "subtitle": "Calculate the absolute deviation from target inventory level (10) using ABS().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Calculate the absolute deviation from target inventory level (10) using ABS().",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, ABS(stock_qty - 10) AS distance_from_target_stock\nFROM Books;",
    "template": [
      {
        "text": "SELECT title, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ABS(stock_qty - 10)",
        "options": [
          "ABS(stock_qty - 10)",
          "ABS(stock_qty * 10)",
          "ABS(stock_qty + 10)",
          "ABS(stock_qty / 10)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "NAME",
          "ALIAS",
          "LABEL",
          "AS"
        ]
      },
      "slot3": {
        "correct": "distance_from_target_stock",
        "options": [
          "distance_from_target_stock_val",
          "calc_distance_from_target_stock",
          "distance_from_target_stock",
          "DISTANCE_FROM_TARGET_STOCK"
        ]
      },
      "slot4": {
        "correct": "Books;",
        "options": [
          "Orders;",
          "GymMembers;",
          "Books;",
          "Students;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 59,
    "levelDisplay": "Level 59",
    "title": "Level 59: Calculate biweekly paycheck by dividing annual salar...",
    "subtitle": "Calculate biweekly paycheck by dividing annual salary by 26 pay periods and rounding to 2 decimals.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Calculate biweekly paycheck by dividing annual salary by 26 pay periods and rounding to 2 decimals.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, ROUND(salary / 26.0, 2) AS biweekly_paycheck\nFROM Employees;",
    "template": [
      {
        "text": "SELECT first_name, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND(salary / 26.0, 2)",
        "options": [
          "ROUND(salary + 26.0, 2)",
          "ROUND(salary - 26.0, 2)",
          "ROUND(salary * 26.0, 2)",
          "ROUND(salary / 26.0, 2)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "AS",
          "NAME",
          "LABEL"
        ]
      },
      "slot3": {
        "correct": "biweekly_paycheck",
        "options": [
          "BIWEEKLY_PAYCHECK",
          "computed_biweekly_paycheck",
          "biweekly_paycheck_num",
          "biweekly_paycheck"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "FROM",
          "SOURCE",
          "TABLE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 60,
    "levelDisplay": "Level 60",
    "title": "Level 60: Round star ratings to the nearest whole star using R...",
    "subtitle": "Round star ratings to the nearest whole star using ROUND(star_rating, 0).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Round star ratings to the nearest whole star using ROUND(star_rating, 0).",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, ROUND(star_rating, 0) AS rounded_star_rating\nFROM MovieReviews;",
    "template": [
      {
        "text": "SELECT movie_title, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MovieReviews;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND(star_rating, 0)",
        "options": [
          "CALC_ROUND(star_rating, 0)",
          "ROUND(star_rating, 0)",
          "GET_ROUND(star_rating, 0)",
          "round_fn(star_rating, 0)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "NAME",
          "ALIAS",
          "AS",
          "LABEL"
        ]
      },
      "slot3": {
        "correct": "rounded_star_rating",
        "options": [
          "ROUNDED_STAR_RATING",
          "rounded_star_rating_num",
          "rounded_star_rating",
          "computed_rounded_star_rating"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "FROM",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 61,
    "levelDisplay": "Level 61",
    "title": "Level 61: Glue first_name and last_name together with a space ...",
    "subtitle": "Glue first_name and last_name together with a space using CONCAT().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Glue first_name and last_name together with a space using CONCAT().",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT CONCAT(first_name, ' ', last_name) AS full_student_name\nFROM Students;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CONCAT(first_name, ' ', last_name)",
        "options": [
          "concat_fn(first_name, ' ', last_name)",
          "GET_CONCAT(first_name, ' ', last_name)",
          "CALC_CONCAT(first_name, ' ', last_name)",
          "CONCAT(first_name, ' ', last_name)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "ALIAS",
          "AS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "full_student_name",
        "options": [
          "str_full_student_name",
          "FULL_STUDENT_NAME",
          "full_student_name",
          "full_student_name_val"
        ]
      },
      "slot4": {
        "correct": "Students;",
        "options": [
          "Students;",
          "Orders;",
          "Books;",
          "Employees;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 62,
    "levelDisplay": "Level 62",
    "title": "Level 62: Transform title to uppercase and genre to lowercase",
    "subtitle": "Transform title to uppercase and genre to lowercase.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Transform title to uppercase and genre to lowercase.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT UPPER(title) AS uppercase_title, LOWER(genre) AS lowercase_genre\nFROM Books;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UPPER(title)",
        "options": [
          "UPPER(title)",
          "GET_UPPER(title)",
          "CALC_UPPER(title)",
          "upper_fn(title)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "NAME",
          "ALIAS",
          "AS",
          "LABEL"
        ]
      },
      "slot3": {
        "correct": "uppercase_title, LOWER(genre) AS lowercase_genre",
        "options": [
          "uppercase_title, LOWER(genre) AS lowercase_genre_val",
          "uppercase_title, LOWER(genre) AS lowercase_genre",
          "calc_uppercase_title, LOWER(genre) AS lowercase_genre",
          "UPPERCASE_TITLE, LOWER(GENRE) AS LOWERCASE_GENRE"
        ]
      },
      "slot4": {
        "correct": "Books;",
        "options": [
          "GroceryItems;",
          "MovieReviews;",
          "Books;",
          "GymMembers;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 63,
    "levelDisplay": "Level 63",
    "title": "Level 63: Format employee name as 'LastName, FirstName' using ...",
    "subtitle": "Format employee name as 'LastName, FirstName' using CONCAT().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Format employee name as 'LastName, FirstName' using CONCAT().",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT CONCAT(last_name, ', ', first_name) AS formal_directory_name\nFROM Employees;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CONCAT(last_name, ', ', first_name)",
        "options": [
          "GET_CONCAT(last_name, ', ', first_name)",
          "CONCAT(last_name, ', ', first_name)",
          "CALC_CONCAT(last_name, ', ', first_name)",
          "concat_fn(last_name, ', ', first_name)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "AS",
          "NAME",
          "ALIAS"
        ]
      },
      "slot3": {
        "correct": "formal_directory_name",
        "options": [
          "formal_directory_name",
          "FORMAL_DIRECTORY_NAME",
          "str_formal_directory_name",
          "formal_directory_name_val"
        ]
      },
      "slot4": {
        "correct": "Employees;",
        "options": [
          "Employees;",
          "GymMembers;",
          "Books;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 64,
    "levelDisplay": "Level 64",
    "title": "Level 64: Count the number of characters in track_title using ...",
    "subtitle": "Count the number of characters in track_title using LENGTH().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Count the number of characters in track_title using LENGTH().",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, LENGTH(track_title) AS title_char_count\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT track_title, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "LENGTH(track_title)",
        "options": [
          "CALC_LENGTH(track_title)",
          "length_fn(track_title)",
          "LENGTH(track_title)",
          "GET_LENGTH(track_title)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "ALIAS",
          "AS"
        ]
      },
      "slot3": {
        "correct": "title_char_count",
        "options": [
          "calc_title_char_count",
          "title_char_count",
          "title_char_count_val",
          "TITLE_CHAR_COUNT"
        ]
      },
      "slot4": {
        "correct": "MusicTracks;",
        "options": [
          "Students;",
          "Employees;",
          "Orders;",
          "MusicTracks;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 65,
    "levelDisplay": "Level 65",
    "title": "Level 65: Convert item_name to all capital letters for shelf p...",
    "subtitle": "Convert item_name to all capital letters for shelf printing.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Convert item_name to all capital letters for shelf printing.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT UPPER(item_name) AS label_name\nFROM GroceryItems;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UPPER(item_name)",
        "options": [
          "upper_fn(item_name)",
          "UPPER(item_name)",
          "CALC_UPPER(item_name)",
          "GET_UPPER(item_name)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "ALIAS",
          "LABEL",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "label_name",
        "options": [
          "label_name",
          "LABEL_NAME",
          "calc_label_name",
          "label_name_val"
        ]
      },
      "slot4": {
        "correct": "GroceryItems;",
        "options": [
          "Employees;",
          "FlightSchedule;",
          "MovieReviews;",
          "GroceryItems;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 66,
    "levelDisplay": "Level 66",
    "title": "Level 66: Combine origin and destination into a route string l...",
    "subtitle": "Combine origin and destination into a route string like 'ORD -> LAX'.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Combine origin and destination into a route string like 'ORD -> LAX'.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, CONCAT(origin_airport, ' -> ', dest_airport) AS route\nFROM FlightSchedule;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CONCAT(origin_airport, ' -> ', dest_airport)",
        "options": [
          "CONCAT(origin_airport, ' -> ', dest_airport)",
          "CONCAT(origin_airport, ' /> ', dest_airport)",
          "CONCAT(origin_airport, ' +> ', dest_airport)",
          "CONCAT(origin_airport, ' *> ', dest_airport)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "LABEL",
          "NAME",
          "AS"
        ]
      },
      "slot3": {
        "correct": "route",
        "options": [
          "route",
          "ROUTE",
          "route_val",
          "str_route"
        ]
      },
      "slot4": {
        "correct": "FlightSchedule;",
        "options": [
          "MusicTracks;",
          "GroceryItems;",
          "Orders;",
          "FlightSchedule;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 67,
    "levelDisplay": "Level 67",
    "title": "Level 67: Extract the first 3 letters of species using LEFT(sp...",
    "subtitle": "Extract the first 3 letters of species using LEFT(species, 3).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Extract the first 3 letters of species using LEFT(species, 3).",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, LEFT(species, 3) AS species_short_code\nFROM PetClinic;",
    "template": [
      {
        "text": "SELECT pet_name, LEFT(species, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "3)",
        "options": [
          "3)",
          "pet_name + 10",
          "pet_id * 1.05",
          "(3))"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "ALIAS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "species_short_code",
        "options": [
          "SPECIES_SHORT_CODE",
          "species_short_code_val",
          "species_short_code",
          "calc_species_short_code"
        ]
      },
      "slot4": {
        "correct": "PetClinic;",
        "options": [
          "MovieReviews;",
          "FlightSchedule;",
          "GymMembers;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 68,
    "levelDisplay": "Level 68",
    "title": "Level 68: Extract the last 4 characters of movie_title using R...",
    "subtitle": "Extract the last 4 characters of movie_title using RIGHT().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Extract the last 4 characters of movie_title using RIGHT().",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, RIGHT(movie_title, 4) AS title_suffix\nFROM MovieReviews;",
    "template": [
      {
        "text": "SELECT movie_title, RIGHT(movie_title, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "4)",
        "options": [
          "(4))",
          "movie_title + 10",
          "4)",
          "review_id * 1.05"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "NAME",
          "ALIAS"
        ]
      },
      "slot3": {
        "correct": "title_suffix",
        "options": [
          "title_suffix",
          "title_suffix_val",
          "TITLE_SUFFIX",
          "calc_title_suffix"
        ]
      },
      "slot4": {
        "correct": "MovieReviews;",
        "options": [
          "GymMembers;",
          "MovieReviews;",
          "MusicTracks;",
          "Orders;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 69,
    "levelDisplay": "Level 69",
    "title": "Level 69: Convert membership plan to uppercase for keycard pri...",
    "subtitle": "Convert membership plan to uppercase for keycard printing.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Convert membership plan to uppercase for keycard printing.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT UPPER(membership_plan) AS plan_badge\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "UPPER(membership_plan)",
        "options": [
          "upper_fn(membership_plan)",
          "CALC_UPPER(membership_plan)",
          "GET_UPPER(membership_plan)",
          "UPPER(membership_plan)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "ALIAS",
          "NAME",
          "LABEL"
        ]
      },
      "slot3": {
        "correct": "plan_badge",
        "options": [
          "plan_badge",
          "calc_plan_badge",
          "plan_badge_val",
          "PLAN_BADGE"
        ]
      },
      "slot4": {
        "correct": "GymMembers;",
        "options": [
          "Books;",
          "MusicTracks;",
          "GymMembers;",
          "FlightSchedule;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 70,
    "levelDisplay": "Level 70",
    "title": "Level 70: Format an order label like 'Zoe Hart (Order #5001)' ...",
    "subtitle": "Format an order label like 'Zoe Hart (Order #5001)' using CONCAT().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Format an order label like 'Zoe Hart (Order #5001)' using CONCAT().",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT CONCAT(customer_name, ' (Order #', order_id, ')') AS order_summary\nFROM Orders;",
    "template": [
      {
        "text": "SELECT ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CONCAT(customer_name, ' (Order #', order_id, ')')",
        "options": [
          "GET_CONCAT(customer_name, ' (Order #', order_id, ')')",
          "CALC_CONCAT(customer_name, ' (Order #', order_id, ')')",
          "CONCAT(customer_name, ' (Order #', order_id, ')')",
          "concat_fn(customer_name, ' (Order #', order_id, ')')"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "NAME",
          "ALIAS"
        ]
      },
      "slot3": {
        "correct": "order_summary",
        "options": [
          "str_order_summary",
          "order_summary_val",
          "ORDER_SUMMARY",
          "order_summary"
        ]
      },
      "slot4": {
        "correct": "Orders;",
        "options": [
          "GroceryItems;",
          "PetClinic;",
          "Books;",
          "Orders;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 71,
    "levelDisplay": "Level 71",
    "title": "Level 71: Extract the four-digit year from hire_date using YEAR()",
    "subtitle": "Extract the four-digit year from hire_date using YEAR().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Extract the four-digit year from hire_date using YEAR().",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, hire_date, YEAR(hire_date) AS hire_year\nFROM Employees;",
    "template": [
      {
        "text": "SELECT first_name, hire_date, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "YEAR(hire_date)",
        "options": [
          "GET_YEAR(hire_date)",
          "EXTRACT_YE(hire_date)",
          "YEAR(hire_date)",
          "DATE_YEAR(hire_date)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "ALIAS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "hire_year",
        "options": [
          "extracted_hire_year",
          "hire_year_num",
          "hire_year",
          "HIRE_YEAR"
        ]
      },
      "slot4": {
        "correct": "Employees;",
        "options": [
          "MovieReviews;",
          "Employees;",
          "GroceryItems;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 72,
    "levelDisplay": "Level 72",
    "title": "Level 72: Extract the numerical month from hire_date using MON...",
    "subtitle": "Extract the numerical month from hire_date using MONTH().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Extract the numerical month from hire_date using MONTH().",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, hire_date, MONTH(hire_date) AS hire_month\nFROM Employees;",
    "template": [
      {
        "text": "SELECT first_name, hire_date, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "MONTH(hire_date)",
        "options": [
          "EXTRACT_MO(hire_date)",
          "GET_MONTH(hire_date)",
          "MONTH(hire_date)",
          "DATE_MONTH(hire_date)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "AS",
          "LABEL",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "hire_month",
        "options": [
          "hire_month",
          "extracted_hire_month",
          "hire_month_num",
          "HIRE_MONTH"
        ]
      },
      "slot4": {
        "correct": "Employees;",
        "options": [
          "Employees;",
          "GroceryItems;",
          "Students;",
          "Books;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 73,
    "levelDisplay": "Level 73",
    "title": "Level 73: Calculate how many years a student has been in schoo...",
    "subtitle": "Calculate how many years a student has been in school relative to 2026.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Calculate how many years a student has been in school relative to 2026.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, enrolled_year, (2026 - enrolled_year) AS years_in_school\nFROM Students;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "GET",
          "CHOOSE",
          "EXTRACT",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "full_name, enrolled_year, (2026 - enrolled_year) AS years_in_school",
        "options": [
          "full_name, enrolled_year, (2026 - enrolled_year) AS years_in_school;",
          "full_name, enrolled_year, (2026 - enrolled_year) AS years_in_school",
          "full_name AND enrolled_year AND (2026 - enrolled_year) AS years_in_school",
          "full_name, enrolled_year, (2026 - enrolled_year) AS years_in_school,"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "FROM",
          "TABLE",
          "INTO"
        ]
      },
      "slot4": {
        "correct": "Students;",
        "options": [
          "PetClinic;",
          "Students;",
          "FlightSchedule;",
          "Orders;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 74,
    "levelDisplay": "Level 74",
    "title": "Level 74: Extract the membership start year from join_date",
    "subtitle": "Extract the membership start year from join_date.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Extract the membership start year from join_date.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, join_date, YEAR(join_date) AS joined_year\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT member_name, join_date, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "YEAR(join_date)",
        "options": [
          "DATE_YEAR(join_date)",
          "EXTRACT_YE(join_date)",
          "GET_YEAR(join_date)",
          "YEAR(join_date)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "AS",
          "ALIAS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "joined_year",
        "options": [
          "JOINED_YEAR",
          "joined_year_num",
          "joined_year",
          "extracted_joined_year"
        ]
      },
      "slot4": {
        "correct": "GymMembers;",
        "options": [
          "Books;",
          "GroceryItems;",
          "Orders;",
          "GymMembers;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 75,
    "levelDisplay": "Level 75",
    "title": "Level 75: Calculate the age of a book in years relative to 2026",
    "subtitle": "Calculate the age of a book in years relative to 2026.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Calculate the age of a book in years relative to 2026.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, published_year, (2026 - published_year) AS book_age_years\nFROM Books;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "CHOOSE",
          "SELECT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "title, published_year, (2026 - published_year) AS book_age_years",
        "options": [
          "title, published_year, (2026 - published_year) AS book_age_years,",
          "title AND published_year AND (2026 - published_year) AS book_age_years",
          "title, published_year, (2026 - published_year) AS book_age_years",
          "title, published_year, (2026 - published_year) AS book_age_years;"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "SOURCE",
          "INTO"
        ]
      },
      "slot4": {
        "correct": "Books;",
        "options": [
          "GymMembers;",
          "Books;",
          "FlightSchedule;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 76,
    "levelDisplay": "Level 76",
    "title": "Level 76: Compute how many years ago a movie was released",
    "subtitle": "Compute how many years ago a movie was released.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Compute how many years ago a movie was released.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, release_year, (2026 - release_year) AS film_age\nFROM MovieReviews;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "SELECT",
          "GET",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "movie_title, release_year, (2026 - release_year) AS film_age",
        "options": [
          "movie_title, release_year, (2026 - release_year) AS film_age;",
          "movie_title, release_year, (2026 - release_year) AS film_age,",
          "movie_title AND release_year AND (2026 - release_year) AS film_age",
          "movie_title, release_year, (2026 - release_year) AS film_age"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "INTO",
          "SOURCE"
        ]
      },
      "slot4": {
        "correct": "MovieReviews;",
        "options": [
          "Books;",
          "GroceryItems;",
          "GymMembers;",
          "MovieReviews;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 77,
    "levelDisplay": "Level 77",
    "title": "Level 77: Project the system's current calendar date using CUR...",
    "subtitle": "Project the system's current calendar date using CURRENT_DATE.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Project the system's current calendar date using CURRENT_DATE.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, CURRENT_DATE AS report_generated_on\nFROM Employees;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "GET",
          "EXTRACT",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "first_name, CURRENT_DATE AS report_generated_on",
        "options": [
          "first_name AND CURRENT_DATE AS report_generated_on",
          "first_name, CURRENT_DATE AS report_generated_on;",
          "first_name, CURRENT_DATE AS report_generated_on",
          "first_name, CURRENT_DATE AS report_generated_on,"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "INTO",
          "FROM"
        ]
      },
      "slot4": {
        "correct": "Employees;",
        "options": [
          "Books;",
          "GymMembers;",
          "Employees;",
          "FlightSchedule;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 78,
    "levelDisplay": "Level 78",
    "title": "Level 78: Extract the membership anniversary month from join_date",
    "subtitle": "Extract the membership anniversary month from join_date.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Extract the membership anniversary month from join_date.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, join_date, MONTH(join_date) AS anniversary_month\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT member_name, join_date, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "MONTH(join_date)",
        "options": [
          "DATE_MONTH(join_date)",
          "EXTRACT_MO(join_date)",
          "MONTH(join_date)",
          "GET_MONTH(join_date)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "ALIAS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "anniversary_month",
        "options": [
          "ANNIVERSARY_MONTH",
          "extracted_anniversary_month",
          "anniversary_month_num",
          "anniversary_month"
        ]
      },
      "slot4": {
        "correct": "GymMembers;",
        "options": [
          "GroceryItems;",
          "PetClinic;",
          "GymMembers;",
          "Orders;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 79,
    "levelDisplay": "Level 79",
    "title": "Level 79: Extract the specific day of the month (1-31) when th...",
    "subtitle": "Extract the specific day of the month (1-31) when the employee was hired.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Extract the specific day of the month (1-31) when the employee was hired.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, hire_date, DAY(hire_date) AS hire_day_of_month\nFROM Employees;",
    "template": [
      {
        "text": "SELECT first_name, hire_date, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DAY(hire_date)",
        "options": [
          "EXTRACT_DA(hire_date)",
          "GET_DAY(hire_date)",
          "DATE_DAY(hire_date)",
          "DAY(hire_date)"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "ALIAS",
          "AS",
          "NAME"
        ]
      },
      "slot3": {
        "correct": "hire_day_of_month",
        "options": [
          "HIRE_DAY_OF_MONTH",
          "extracted_hire_day_of_month",
          "hire_day_of_month",
          "hire_day_of_month_num"
        ]
      },
      "slot4": {
        "correct": "Employees;",
        "options": [
          "Orders;",
          "FlightSchedule;",
          "GymMembers;",
          "Employees;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 80,
    "levelDisplay": "Level 80",
    "title": "Level 80: Project expected graduation year by adding 4 to enro...",
    "subtitle": "Project expected graduation year by adding 4 to enrolled_year.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Project expected graduation year by adding 4 to enrolled_year.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, enrolled_year, CONCAT('Class of ', (enrolled_year + 4)) AS expected_graduation\nFROM Students;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "GET",
          "SELECT",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "full_name, enrolled_year, CONCAT('Class of ', (enrolled_year + 4)) AS expected_graduation",
        "options": [
          "full_name, enrolled_year, CONCAT('Class of ', (enrolled_year + 4)) AS expected_graduation;",
          "full_name, enrolled_year, CONCAT('Class of ', (enrolled_year + 4)) AS expected_graduation",
          "full_name, enrolled_year, CONCAT('Class of ', (enrolled_year + 4)) AS expected_graduation,",
          "full_name AND enrolled_year AND CONCAT('Class of ' AND (enrolled_year + 4)) AS expected_graduation"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "TABLE",
          "SOURCE"
        ]
      },
      "slot4": {
        "correct": "Students;",
        "options": [
          "Students;",
          "MusicTracks;",
          "FlightSchedule;",
          "GymMembers;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 81,
    "levelDisplay": "Level 81",
    "title": "Level 81: Find all unique home cities where enrolled students ...",
    "subtitle": "Find all unique home cities where enrolled students live without duplicates.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find all unique home cities where enrolled students live without duplicates.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT DISTINCT city\nFROM Students;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot5",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "GET",
          "SELECT",
          "CHOOSE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "DISTINCT",
        "options": [
          "DISTINCT",
          "UNIQUE",
          "SOLO",
          "DIFFERENT"
        ]
      },
      "slot3": {
        "correct": "city",
        "options": [
          "gpa",
          "major",
          "last_name",
          "city"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "TABLE",
          "SOURCE"
        ]
      },
      "slot5": {
        "correct": "Students;",
        "options": [
          "FlightSchedule;",
          "GroceryItems;",
          "PetClinic;",
          "Students;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 82,
    "levelDisplay": "Level 82",
    "title": "Level 82: List all distinct literary genres available in the b...",
    "subtitle": "List all distinct literary genres available in the bookstore catalog.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "List all distinct literary genres available in the bookstore catalog.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT DISTINCT genre\nFROM Books;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot5",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "CHOOSE",
          "GET",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "DISTINCT",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "SOLO",
          "DIFFERENT"
        ]
      },
      "slot3": {
        "correct": "genre",
        "options": [
          "author",
          "is_hardcover",
          "genre",
          "book_id"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "FROM",
          "TABLE",
          "INTO"
        ]
      },
      "slot5": {
        "correct": "Books;",
        "options": [
          "PetClinic;",
          "MusicTracks;",
          "GymMembers;",
          "Books;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 83,
    "levelDisplay": "Level 83",
    "title": "Level 83: Retrieve the list of distinct company departments wi...",
    "subtitle": "Retrieve the list of distinct company departments without duplicate rows.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Retrieve the list of distinct company departments without duplicate rows.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT DISTINCT department\nFROM Employees;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot5",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "CHOOSE",
          "EXTRACT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "DISTINCT",
        "options": [
          "UNIQUE",
          "SOLO",
          "DISTINCT",
          "DIFFERENT"
        ]
      },
      "slot3": {
        "correct": "department",
        "options": [
          "first_name",
          "last_name",
          "emp_id",
          "department"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "FROM",
          "SOURCE",
          "INTO"
        ]
      },
      "slot5": {
        "correct": "Employees;",
        "options": [
          "Employees;",
          "PetClinic;",
          "Orders;",
          "Students;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 84,
    "levelDisplay": "Level 84",
    "title": "Level 84: Display all unique grocery product categories",
    "subtitle": "Display all unique grocery product categories.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Display all unique grocery product categories.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT DISTINCT category\nFROM GroceryItems;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot5",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "SELECT",
          "CHOOSE",
          "GET"
        ]
      },
      "slot2": {
        "correct": "DISTINCT",
        "options": [
          "DIFFERENT",
          "DISTINCT",
          "UNIQUE",
          "SOLO"
        ]
      },
      "slot3": {
        "correct": "category",
        "options": [
          "category",
          "unit_price",
          "stock_qty",
          "item_name"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "FROM",
          "SOURCE"
        ]
      },
      "slot5": {
        "correct": "GroceryItems;",
        "options": [
          "MusicTracks;",
          "GymMembers;",
          "FlightSchedule;",
          "GroceryItems;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 85,
    "levelDisplay": "Level 85",
    "title": "Level 85: List all unique musical genres featured in the strea...",
    "subtitle": "List all unique musical genres featured in the streaming library.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "List all unique musical genres featured in the streaming library.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT DISTINCT genre\nFROM MusicTracks;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot5",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "CHOOSE",
          "EXTRACT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "DISTINCT",
        "options": [
          "UNIQUE",
          "DIFFERENT",
          "SOLO",
          "DISTINCT"
        ]
      },
      "slot3": {
        "correct": "genre",
        "options": [
          "title",
          "genre",
          "track_id",
          "artist"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "TABLE",
          "SOURCE"
        ]
      },
      "slot5": {
        "correct": "MusicTracks;",
        "options": [
          "MusicTracks;",
          "GroceryItems;",
          "Orders;",
          "MovieReviews;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 86,
    "levelDisplay": "Level 86",
    "title": "Level 86: Extract all distinct membership plan tiers",
    "subtitle": "Extract all distinct membership plan tiers.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Extract all distinct membership plan tiers.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT DISTINCT membership_plan\nFROM GymMembers;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot5",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "CHOOSE",
          "SELECT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "DISTINCT",
        "options": [
          "DISTINCT",
          "UNIQUE",
          "SOLO",
          "DIFFERENT"
        ]
      },
      "slot3": {
        "correct": "membership_plan",
        "options": [
          "member_id",
          "monthly_fee",
          "member_name",
          "membership_plan"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "INTO",
          "SOURCE",
          "TABLE",
          "FROM"
        ]
      },
      "slot5": {
        "correct": "GymMembers;",
        "options": [
          "FlightSchedule;",
          "Students;",
          "GymMembers;",
          "Orders;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 87,
    "levelDisplay": "Level 87",
    "title": "Level 87: Find all unique movie directors who have reviews rec...",
    "subtitle": "Find all unique movie directors who have reviews recorded.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find all unique movie directors who have reviews recorded.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT DISTINCT director\nFROM MovieReviews;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot5",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "SELECT",
          "CHOOSE",
          "GET"
        ]
      },
      "slot2": {
        "correct": "DISTINCT",
        "options": [
          "DISTINCT",
          "DIFFERENT",
          "UNIQUE",
          "SOLO"
        ]
      },
      "slot3": {
        "correct": "director",
        "options": [
          "review_id",
          "director",
          "review_count",
          "movie_title"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "TABLE",
          "SOURCE"
        ]
      },
      "slot5": {
        "correct": "MovieReviews;",
        "options": [
          "MusicTracks;",
          "MovieReviews;",
          "GymMembers;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 88,
    "levelDisplay": "Level 88",
    "title": "Level 88: List all unique origin departure airports",
    "subtitle": "List all unique origin departure airports.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "List all unique origin departure airports.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT DISTINCT origin_airport\nFROM FlightSchedule;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot5",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "CHOOSE",
          "EXTRACT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "DISTINCT",
        "options": [
          "SOLO",
          "DISTINCT",
          "DIFFERENT",
          "UNIQUE"
        ]
      },
      "slot3": {
        "correct": "origin_airport",
        "options": [
          "airline",
          "origin_airport",
          "destination_airport",
          "flight_id"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "FROM",
          "TABLE",
          "INTO"
        ]
      },
      "slot5": {
        "correct": "FlightSchedule;",
        "options": [
          "PetClinic;",
          "Orders;",
          "Students;",
          "FlightSchedule;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 89,
    "levelDisplay": "Level 89",
    "title": "Level 89: Find all distinct animal species treated at the clinic",
    "subtitle": "Find all distinct animal species treated at the clinic.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find all distinct animal species treated at the clinic.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT DISTINCT species\nFROM PetClinic;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot5",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "GET",
          "CHOOSE",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "DISTINCT",
        "options": [
          "DISTINCT",
          "SOLO",
          "DIFFERENT",
          "UNIQUE"
        ]
      },
      "slot3": {
        "correct": "species",
        "options": [
          "pet_id",
          "age_years",
          "pet_name",
          "species"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "FROM",
          "SOURCE"
        ]
      },
      "slot5": {
        "correct": "PetClinic;",
        "options": [
          "MovieReviews;",
          "Students;",
          "FlightSchedule;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 90,
    "levelDisplay": "Level 90",
    "title": "Level 90: Find distinct combinations of customer name and ship...",
    "subtitle": "Find distinct combinations of customer name and shipping city (multi-column DISTINCT).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find distinct combinations of customer name and shipping city (multi-column DISTINCT).",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT DISTINCT customer_name, shipping_city\nFROM Orders;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot5",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "GET",
          "EXTRACT",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "DISTINCT",
        "options": [
          "SOLO",
          "DISTINCT",
          "UNIQUE",
          "DIFFERENT"
        ]
      },
      "slot3": {
        "correct": "customer_name, shipping_city",
        "options": [
          "product_name",
          "customer_name, shipping_city",
          "order_id",
          "discount_pct"
        ]
      },
      "slot4": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "FROM",
          "SOURCE",
          "INTO"
        ]
      },
      "slot5": {
        "correct": "Orders;",
        "options": [
          "Students;",
          "GymMembers;",
          "Orders;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 91,
    "levelDisplay": "Level 91",
    "title": "Level 91: Fix the trailing comma bug: 'SELECT full_name, city,...",
    "subtitle": "Fix the trailing comma bug: 'SELECT full_name, city, FROM Students;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix the trailing comma bug: 'SELECT full_name, city, FROM Students;'",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, city\nFROM Students;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "SELECT",
          "GET",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "full_name, city",
        "options": [
          "full_name AND city",
          "full_name, city",
          "full_name, city,",
          "full_name, city;"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "FROM",
          "INTO"
        ]
      },
      "slot4": {
        "correct": "Students;",
        "options": [
          "Students;",
          "MovieReviews;",
          "Employees;",
          "GroceryItems;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 92,
    "levelDisplay": "Level 92",
    "title": "Level 92: Fix the unquoted column alias containing spaces: 'SE...",
    "subtitle": "Fix the unquoted column alias containing spaces: 'SELECT title, price AS Retail Price FROM Books;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix the unquoted column alias containing spaces: 'SELECT title, price AS Retail Price FROM Books;'",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price\nFROM Books;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "CHOOSE",
          "GET",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "title, price",
        "options": [
          "title AND price",
          "title, price",
          "title, price;",
          "title, price,"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "FROM",
          "TABLE",
          "INTO"
        ]
      },
      "slot4": {
        "correct": "Books;",
        "options": [
          "Books;",
          "Orders;",
          "MovieReviews;",
          "FlightSchedule;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 93,
    "levelDisplay": "Level 93",
    "title": "Level 93: Fix the misplaced DISTINCT keyword: 'SELECT first_na...",
    "subtitle": "Fix the misplaced DISTINCT keyword: 'SELECT first_name, DISTINCT department FROM Employees;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix the misplaced DISTINCT keyword: 'SELECT first_name, DISTINCT department FROM Employees;'",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary\nFROM Employees;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "EXTRACT",
          "SELECT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "first_name, salary",
        "options": [
          "first_name AND salary",
          "first_name, salary;",
          "first_name, salary,",
          "first_name, salary"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "FROM",
          "SOURCE",
          "INTO"
        ]
      },
      "slot4": {
        "correct": "Employees;",
        "options": [
          "Employees;",
          "Books;",
          "Orders;",
          "MusicTracks;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 94,
    "levelDisplay": "Level 94",
    "title": "Level 94: Fix the single-quoted column name: \"SELECT 'item_nam...",
    "subtitle": "Fix the single-quoted column name: \"SELECT 'item_name' FROM GroceryItems;\" (outputs literal string instead of column).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix the single-quoted column name: \"SELECT 'item_name' FROM GroceryItems;\" (outputs literal string instead of column).",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "CHOOSE",
          "SELECT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "item_name, unit_price",
        "options": [
          "item_name, unit_price",
          "item_name, unit_price;",
          "item_name AND unit_price",
          "item_name, unit_price,"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "TABLE",
          "SOURCE"
        ]
      },
      "slot4": {
        "correct": "GroceryItems;",
        "options": [
          "MovieReviews;",
          "GroceryItems;",
          "Students;",
          "Orders;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 95,
    "levelDisplay": "Level 95",
    "title": "Level 95: Fix missing comma between calculated expression and ...",
    "subtitle": "Fix missing comma between calculated expression and next column.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix missing comma between calculated expression and next column.",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, quantity * unit_price AS subtotal\nFROM Orders;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "EXTRACT",
          "SELECT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "order_id, quantity * unit_price AS subtotal",
        "options": [
          "order_id, quantity * unit_price AS subtotal,",
          "order_id, quantity * unit_price AS subtotal",
          "order_id AND quantity * unit_price AS subtotal",
          "order_id, quantity * unit_price AS subtotal;"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "SOURCE",
          "TABLE"
        ]
      },
      "slot4": {
        "correct": "Orders;",
        "options": [
          "GroceryItems;",
          "Orders;",
          "GymMembers;",
          "PetClinic;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 96,
    "levelDisplay": "Level 96",
    "title": "Level 96: Fix misspelled column identifier: 'SELECT song_title...",
    "subtitle": "Fix misspelled column identifier: 'SELECT song_title FROM MusicTracks;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix misspelled column identifier: 'SELECT song_title FROM MusicTracks;'",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, artist_name\nFROM MusicTracks;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "SELECT",
          "GET",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "track_title, artist_name",
        "options": [
          "track_title, artist_name",
          "track_title AND artist_name",
          "track_title, artist_name;",
          "track_title, artist_name,"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "FROM",
          "INTO"
        ]
      },
      "slot4": {
        "correct": "MusicTracks;",
        "options": [
          "GroceryItems;",
          "Books;",
          "MovieReviews;",
          "MusicTracks;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 97,
    "levelDisplay": "Level 97",
    "title": "Level 97: Fix table name typo: 'SELECT member_name FROM GymMem...",
    "subtitle": "Fix table name typo: 'SELECT member_name FROM GymMember;' (singular vs plural).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix table name typo: 'SELECT member_name FROM GymMember;' (singular vs plural).",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, monthly_fee\nFROM GymMembers;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "GET",
          "EXTRACT",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "member_name, monthly_fee",
        "options": [
          "member_name AND monthly_fee",
          "member_name, monthly_fee;",
          "member_name, monthly_fee",
          "member_name, monthly_fee,"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "INTO",
          "FROM"
        ]
      },
      "slot4": {
        "correct": "GymMembers;",
        "options": [
          "Employees;",
          "Students;",
          "GymMembers;",
          "GroceryItems;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 98,
    "levelDisplay": "Level 98",
    "title": "Level 98: Fix hyphen used in column alias: 'SELECT movie_title...",
    "subtitle": "Fix hyphen used in column alias: 'SELECT movie_title AS movie-name FROM MovieReviews;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix hyphen used in column alias: 'SELECT movie_title AS movie-name FROM MovieReviews;'",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "GET",
          "CHOOSE",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "movie_title, star_rating",
        "options": [
          "movie_title AND star_rating",
          "movie_title, star_rating,",
          "movie_title, star_rating;",
          "movie_title, star_rating"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "FROM",
          "INTO"
        ]
      },
      "slot4": {
        "correct": "MovieReviews;",
        "options": [
          "MovieReviews;",
          "Orders;",
          "FlightSchedule;",
          "Employees;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 99,
    "levelDisplay": "Level 99",
    "title": "Level 99: Fix missing FROM keyword: 'SELECT flight_id, origin_...",
    "subtitle": "Fix missing FROM keyword: 'SELECT flight_id, origin_airport FlightSchedule;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix missing FROM keyword: 'SELECT flight_id, origin_airport FlightSchedule;'",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, origin_airport, dest_airport\nFROM FlightSchedule;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "GET",
          "EXTRACT",
          "SELECT",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "flight_id, origin_airport, dest_airport",
        "options": [
          "flight_id, origin_airport, dest_airport;",
          "flight_id, origin_airport, dest_airport",
          "flight_id AND origin_airport AND dest_airport",
          "flight_id, origin_airport, dest_airport,"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "SOURCE",
          "TABLE"
        ]
      },
      "slot4": {
        "correct": "FlightSchedule;",
        "options": [
          "FlightSchedule;",
          "GymMembers;",
          "MusicTracks;",
          "Books;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 100,
    "levelDisplay": "Level 100",
    "title": "Level 100: Fix premature semicolon: 'SELECT pet_name; FROM PetC...",
    "subtitle": "Fix premature semicolon: 'SELECT pet_name; FROM PetClinic;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix premature semicolon: 'SELECT pet_name; FROM PetClinic;'",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, age_years\nFROM PetClinic;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "GET",
          "CHOOSE",
          "EXTRACT",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "pet_name, age_years",
        "options": [
          "pet_name, age_years;",
          "pet_name, age_years",
          "pet_name, age_years,",
          "pet_name AND age_years"
        ]
      },
      "slot3": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "TABLE",
          "FROM",
          "INTO"
        ]
      },
      "slot4": {
        "correct": "PetClinic;",
        "options": [
          "GroceryItems;",
          "PetClinic;",
          "Students;",
          "MusicTracks;"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Trap to avoid: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  }
];
