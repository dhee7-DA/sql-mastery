// =============================================================================
// SECTION 01: FOUNDATIONS & PROJECTIONS (100 INTERACTIVE DUOLINGO-STYLE QUESTS)
// Generated from Section 0 Syntax Gym Drills #001 through #100
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
    "task": "Pull every column using the universal asterisk wildcard.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT *\nFROM Students;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " *\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
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
          "CHOOSE",
          "EXTRACT",
          "SELECT",
          "GET"
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
      }
    },
    "explanation": "The asterisk (*) represents all columns. Always follow SELECT * with FROM and your table name. 💡 Pro-Tip / Trap: Writing 'SELECT ALL FROM Students;' (ALL is an aggregate modifier, not a column wildcard).",
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
    "task": "Select every column from the Books catalog.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT *\nFROM Books;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " *\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
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
          "GET",
          "EXTRACT",
          "CHOOSE",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "SOURCE",
          "FROM"
        ]
      }
    },
    "explanation": "A query must end with a semicolon in standard SQL clients. 💡 Pro-Tip / Trap: Typing the table name before SELECT.",
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
    "task": "Extract a single specific column to minimize memory overhead.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT first_name\nFROM Students;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " first_name\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
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
          "GET",
          "CHOOSE",
          "SELECT",
          "EXTRACT"
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
      }
    },
    "explanation": "When selecting a single column, no commas are used anywhere in the query. 💡 Pro-Tip / Trap: Writing 'SELECT first_name, FROM Students;' (trailing comma before FROM).",
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
    "task": "Select the title column from the Books table.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title\nFROM Books;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " title\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
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
        "correct": "FROM",
        "options": [
          "SOURCE",
          "INTO",
          "FROM",
          "TABLE"
        ]
      }
    },
    "explanation": "Column names are case-insensitive in ANSI SQL, but snake_case is standard practice. 💡 Pro-Tip / Trap: Wrapping the column name in single quotes ('title' will output the literal word 'title' for every row!).",
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
    "task": "Select the track_title column from MusicTracks.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, track_title VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title\nFROM MusicTracks;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " track_title\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
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
        "correct": "FROM",
        "options": [
          "INTO",
          "SOURCE",
          "TABLE",
          "FROM"
        ]
      }
    },
    "explanation": "Ensure exact column spelling matches the database schema definition. 💡 Pro-Tip / Trap: Misspelling 'track_title' as 'track_name' or 'song'.",
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
    "task": "Retrieve all columns from GroceryItems.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, is_organic BOOLEAN, calories INT, stock_units INT)",
    "targetQuery": "SELECT *\nFROM GroceryItems;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " *\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
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
          "GET",
          "SELECT",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "FROM",
          "SOURCE"
        ]
      }
    },
    "explanation": "Asterisk selects columns in their physical storage order. 💡 Pro-Tip / Trap: Writing 'SELECT GroceryItems.*' when only one table is involved (redundant prefix).",
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
    "task": "Select last_name from Employees.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, bonus DECIMAL, hire_date DATE)",
    "targetQuery": "SELECT last_name\nFROM Employees;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " last_name\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees;",
        "isBlank": false
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
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "SOURCE",
          "FROM"
        ]
      }
    },
    "explanation": "Specifying only the needed column saves network bandwidth and buffer cache. 💡 Pro-Tip / Trap: Using 'SELECT last_name;' without a FROM clause.",
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
    "task": "Select pet_name from PetClinic.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN, owner_city VARCHAR)",
    "targetQuery": "SELECT pet_name\nFROM PetClinic;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " pet_name\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic;",
        "isBlank": false
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
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "INTO",
          "SOURCE"
        ]
      }
    },
    "explanation": "Target table follows immediately after the FROM keyword. 💡 Pro-Tip / Trap: Writing 'FROM PetClinic SELECT pet_name' (lexical syntax requires SELECT first).",
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
    "task": "Select movie_title from MovieReviews.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, genre VARCHAR, star_rating DECIMAL, release_year INT, review_length_words INT)",
    "targetQuery": "SELECT movie_title\nFROM MovieReviews;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " movie_title\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MovieReviews;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "CHOOSE",
          "GET",
          "EXTRACT"
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
      }
    },
    "explanation": "Keywords are traditionally uppercase and column names lowercase for readability. 💡 Pro-Tip / Trap: Writing 'SELECT movie title' without the underscore (space causes syntax parse failure).",
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
    "task": "Select flight_id from FlightSchedule.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id VARCHAR, airline VARCHAR, origin_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL, is_international BOOLEAN)",
    "targetQuery": "SELECT flight_id\nFROM FlightSchedule;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " flight_id\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " FlightSchedule;",
        "isBlank": false
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
        "correct": "FROM",
        "options": [
          "INTO",
          "SOURCE",
          "TABLE",
          "FROM"
        ]
      }
    },
    "explanation": "Identifiers can contain numbers and underscores but cannot start with a number. 💡 Pro-Tip / Trap: Writing 'SELECT flight-id' with a hyphen (hyphen means subtraction!).",
    "commonMistakes": "Using a hyphen instead of an underscore."
  },
  {
    "id": 11,
    "levelDisplay": "Level 11",
    "title": "Level 11: Select the first name, last name, and GPA for all students",
    "subtitle": "Select the first name, last name, and GPA for all students.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "task": "Select the first name, last name, and GPA for all students.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT first_name, last_name, gpa\nFROM Students;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " first_name, last_name, gpa\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
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
          "SELECT",
          "CHOOSE",
          "GET",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "INTO",
          "FROM"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 12,
    "levelDisplay": "Level 12",
    "title": "Level 12: Display book title, author, and price for a book fair cat...",
    "subtitle": "Display book title, author, and price for a book fair catalog.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "task": "Display book title, author, and price for a book fair catalog.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, author, price\nFROM Books;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " title, author, price\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
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
          "CHOOSE",
          "EXTRACT",
          "GET",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "SOURCE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 13,
    "levelDisplay": "Level 13",
    "title": "Level 13: Extract first name, department, and salary for the monthl...",
    "subtitle": "Extract first name, department, and salary for the monthly compensation review.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "task": "Extract first name, department, and salary for the monthly compensation review.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, department, salary\nFROM Employees;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " first_name, department, salary\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "GET",
          "SELECT",
          "EXTRACT",
          "CHOOSE"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 14,
    "levelDisplay": "Level 14",
    "title": "Level 14: List grocery item name, its category, and unit price for ...",
    "subtitle": "List grocery item name, its category, and unit price for shelf price tags.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "task": "List grocery item name, its category, and unit price for shelf price tags.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, category, unit_price\nFROM GroceryItems;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " item_name, category, unit_price\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
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
          "GET",
          "SELECT"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 15,
    "levelDisplay": "Level 15",
    "title": "Level 15: View customer name, purchased product, and ordered quanti...",
    "subtitle": "View customer name, purchased product, and ordered quantity on packing slips.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "task": "View customer name, purchased product, and ordered quantity on packing slips.",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT customer_name, product_name, quantity\nFROM Orders;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " customer_name, product_name, quantity\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Orders;",
        "isBlank": false
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
        "correct": "FROM",
        "options": [
          "TABLE",
          "FROM",
          "INTO",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 16,
    "levelDisplay": "Level 16",
    "title": "Level 16: Show track title, artist name, and duration in seconds fo...",
    "subtitle": "Show track title, artist name, and duration in seconds for the media player.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "task": "Show track title, artist name, and duration in seconds for the media player.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT title, artist, duration_seconds\nFROM MusicTracks;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " title, artist, duration_seconds\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
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
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "SOURCE",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 17,
    "levelDisplay": "Level 17",
    "title": "Level 17: Fetch gym member name, plan type, and monthly fee for bil...",
    "subtitle": "Fetch gym member name, plan type, and monthly fee for billing.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "task": "Fetch gym member name, plan type, and monthly fee for billing.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, membership_plan, monthly_fee\nFROM GymMembers;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " member_name, membership_plan, monthly_fee\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GymMembers;",
        "isBlank": false
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
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "FROM",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 18,
    "levelDisplay": "Level 18",
    "title": "Level 18: Output movie title, director, and star rating for a film ...",
    "subtitle": "Output movie title, director, and star rating for a film review website.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "task": "Output movie title, director, and star rating for a film review website.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, director, star_rating\nFROM MovieReviews;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " movie_title, director, star_rating\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MovieReviews;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "GET",
          "SELECT",
          "EXTRACT"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 19,
    "levelDisplay": "Level 19",
    "title": "Level 19: Display flight ID, airline, origin airport, and destinati...",
    "subtitle": "Display flight ID, airline, origin airport, and destination airport for the flight gate monitor.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "task": "Display flight ID, airline, origin airport, and destination airport for the flight gate monitor.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, airline, origin_airport, destination_airport\nFROM FlightSchedule;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " flight_id, airline, origin_airport, destination_airport\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " FlightSchedule;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "SELECT",
          "EXTRACT",
          "GET"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 20,
    "levelDisplay": "Level 20",
    "title": "Level 20: Retrieve pet name, species, age in years, and weight in k...",
    "subtitle": "Retrieve pet name, species, age in years, and weight in kg for veterinary patient intake.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.2 Multi-Column & Commas",
    "task": "Retrieve pet name, species, age in years, and weight in kg for veterinary patient intake.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, species, age_years, weight_kg\nFROM PetClinic;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " pet_name, species, age_years, weight_kg\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic;",
        "isBlank": false
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
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "SOURCE",
          "FROM"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 21,
    "levelDisplay": "Level 21",
    "title": "Level 21: Rename full_name to student_name and gpa to academic_gpa",
    "subtitle": "Rename full_name to student_name and gpa to academic_gpa.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "task": "Rename full_name to student_name and gpa to academic_gpa.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name AS student_name, gpa AS academic_gpa\nFROM Students;",
    "template": [
      {
        "text": "SELECT full_name ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " student_name, gpa AS academic_gpa\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Students;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "NAME",
          "AS",
          "LABEL"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "SOURCE",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 22,
    "levelDisplay": "Level 22",
    "title": "Level 22: Rename title to book_title and price to retail_price_usd",
    "subtitle": "Rename title to book_title and price to retail_price_usd.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "task": "Rename title to book_title and price to retail_price_usd.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title AS book_title, price AS retail_price_usd\nFROM Books;",
    "template": [
      {
        "text": "SELECT title ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " book_title, price AS retail_price_usd\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Books;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "NAME",
          "ALIAS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "FROM",
          "INTO",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 23,
    "levelDisplay": "Level 23",
    "title": "Level 23: Alias first_name as employee and salary as base_compensation",
    "subtitle": "Alias first_name as employee and salary as base_compensation.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "task": "Alias first_name as employee and salary as base_compensation.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name AS employee, salary AS base_compensation\nFROM Employees;",
    "template": [
      {
        "text": "SELECT first_name ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " employee, salary AS base_compensation\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "ALIAS",
          "NAME"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 24,
    "levelDisplay": "Level 24",
    "title": "Level 24: Alias item_name to product and unit_price to cost_per_unit",
    "subtitle": "Alias item_name to product and unit_price to cost_per_unit.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "task": "Alias item_name to product and unit_price to cost_per_unit.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name AS product, unit_price AS cost_per_unit\nFROM GroceryItems;",
    "template": [
      {
        "text": "SELECT item_name ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " product, unit_price AS cost_per_unit\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GroceryItems;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "ALIAS",
          "AS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "FROM",
          "INTO",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 25,
    "levelDisplay": "Level 25",
    "title": "Level 25: Rename customer_name to buyer and quantity to units_ordered",
    "subtitle": "Rename customer_name to buyer and quantity to units_ordered.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "task": "Rename customer_name to buyer and quantity to units_ordered.",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT customer_name AS buyer, quantity AS units_ordered\nFROM Orders;",
    "template": [
      {
        "text": "SELECT customer_name ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " buyer, quantity AS units_ordered\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Orders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "AS",
          "ALIAS",
          "NAME"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
    "task": "Alias track_title as song and artist_name as musician.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title AS song, artist_name AS musician\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT track_title ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " song, artist_name AS musician\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "NAME",
          "LABEL",
          "ALIAS",
          "AS"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
    "task": "Rename member_name to client and monthly_fee to rate.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name AS client, monthly_fee AS rate\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT member_name ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " client, monthly_fee AS rate\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "NAME",
          "ALIAS",
          "LABEL",
          "AS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "SOURCE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
    "task": "Alias movie_title to film and star_rating to score.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title AS film, star_rating AS score\nFROM MovieReviews;",
    "template": [
      {
        "text": "SELECT movie_title ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " film, star_rating AS score\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MovieReviews;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "NAME",
          "AS",
          "LABEL"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 29,
    "levelDisplay": "Level 29",
    "title": "Level 29: Rename flight_id to flight_code and ticket_price to fare_usd",
    "subtitle": "Rename flight_id to flight_code and ticket_price to fare_usd.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "task": "Rename flight_id to flight_code and ticket_price to fare_usd.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id AS flight_code, ticket_price AS fare_usd\nFROM FlightSchedule;",
    "template": [
      {
        "text": "SELECT flight_id ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " flight_code, ticket_price AS fare_usd\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " FlightSchedule;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "NAME",
          "ALIAS",
          "AS",
          "LABEL"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 30,
    "levelDisplay": "Level 30",
    "title": "Level 30: Alias pet_name to patient_name and age_years to patient_age",
    "subtitle": "Alias pet_name to patient_name and age_years to patient_age.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.3 Column Aliases (AS)",
    "task": "Alias pet_name to patient_name and age_years to patient_age.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name AS patient_name, age_years AS patient_age\nFROM PetClinic;",
    "template": [
      {
        "text": "SELECT pet_name ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " patient_name, age_years AS patient_age\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "LABEL",
          "NAME",
          "AS"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 31,
    "levelDisplay": "Level 31",
    "title": "Level 31: Select full_name alongside a static text label 'Active' a...",
    "subtitle": "Select full_name alongside a static text label 'Active' as enrollment_status.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "task": "Select full_name alongside a static text label 'Active' as enrollment_status.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, 'Active' AS enrollment_status\nFROM Students;",
    "template": [
      {
        "text": "SELECT full_name, 'Active' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " enrollment_status\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Students;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "NAME",
          "AS",
          "LABEL",
          "ALIAS"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 32,
    "levelDisplay": "Level 32",
    "title": "Level 32: Select book title and a fixed location string 'Central Li...",
    "subtitle": "Select book title and a fixed location string 'Central Library' as branch_location.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "task": "Select book title and a fixed location string 'Central Library' as branch_location.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, 'Central Library' AS branch_location\nFROM Books;",
    "template": [
      {
        "text": "SELECT title, 'Central Library' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " branch_location\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Books;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "NAME",
          "LABEL",
          "AS",
          "ALIAS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "FROM",
          "INTO",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 33,
    "levelDisplay": "Level 33",
    "title": "Level 33: Select employee first_name alongside a fixed numerical ye...",
    "subtitle": "Select employee first_name alongside a fixed numerical year 2026 as review_year.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "task": "Select employee first_name alongside a fixed numerical year 2026 as review_year.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, 2026 AS review_year\nFROM Employees;",
    "template": [
      {
        "text": "SELECT first_name, 2026 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " review_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "AS",
          "NAME",
          "ALIAS"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 34,
    "levelDisplay": "Level 34",
    "title": "Level 34: Display item_name with a constant string 'In Stock' as av...",
    "subtitle": "Display item_name with a constant string 'In Stock' as availability.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "task": "Display item_name with a constant string 'In Stock' as availability.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, 'In Stock' AS availability\nFROM GroceryItems;",
    "template": [
      {
        "text": "SELECT item_name, 'In Stock' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " availability\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GroceryItems;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "AS",
          "NAME",
          "ALIAS"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 35,
    "levelDisplay": "Level 35",
    "title": "Level 35: Select order_id with a boolean literal TRUE as is_verified",
    "subtitle": "Select order_id with a boolean literal TRUE as is_verified.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "task": "Select order_id with a boolean literal TRUE as is_verified.",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, TRUE AS is_verified\nFROM Orders;",
    "template": [
      {
        "text": "SELECT order_id, TRUE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " is_verified\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Orders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "ALIAS",
          "AS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "FROM",
          "SOURCE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 36,
    "levelDisplay": "Level 36",
    "title": "Level 36: Select track_title with constant text 'HQ Audio' as forma...",
    "subtitle": "Select track_title with constant text 'HQ Audio' as format_type.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "task": "Select track_title with constant text 'HQ Audio' as format_type.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, 'HQ Audio' AS format_type\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT track_title, 'HQ Audio' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " format_type\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "ALIAS",
          "AS",
          "NAME"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 37,
    "levelDisplay": "Level 37",
    "title": "Level 37: Display member_name with a constant integer 30 as grace_p...",
    "subtitle": "Display member_name with a constant integer 30 as grace_period_days.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "task": "Display member_name with a constant integer 30 as grace_period_days.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, 30 AS grace_period_days\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT member_name, 30 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " grace_period_days\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "ALIAS",
          "AS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "FROM",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 38,
    "levelDisplay": "Level 38",
    "title": "Level 38: Select movie_title with a decimal constant 5.0 as max_pos...",
    "subtitle": "Select movie_title with a decimal constant 5.0 as max_possible_rating.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "task": "Select movie_title with a decimal constant 5.0 as max_possible_rating.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, 5.0 AS max_possible_rating\nFROM MovieReviews;",
    "template": [
      {
        "text": "SELECT movie_title, 5.0 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " max_possible_rating\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MovieReviews;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "AS",
          "ALIAS"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 39,
    "levelDisplay": "Level 39",
    "title": "Level 39: Select flight_id with a static string 'Terminal 2' as ass...",
    "subtitle": "Select flight_id with a static string 'Terminal 2' as assigned_terminal.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "task": "Select flight_id with a static string 'Terminal 2' as assigned_terminal.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, 'Terminal 2' AS assigned_terminal\nFROM FlightSchedule;",
    "template": [
      {
        "text": "SELECT flight_id, 'Terminal 2' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " assigned_terminal\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " FlightSchedule;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "NAME",
          "AS",
          "LABEL"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 40,
    "levelDisplay": "Level 40",
    "title": "Level 40: Display pet_name with fixed text 'Downtown Vet' as clinic...",
    "subtitle": "Display pet_name with fixed text 'Downtown Vet' as clinic_name.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.4 Constant Literals",
    "task": "Display pet_name with fixed text 'Downtown Vet' as clinic_name.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, 'Downtown Vet' AS clinic_name\nFROM PetClinic;",
    "template": [
      {
        "text": "SELECT pet_name, 'Downtown Vet' ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " clinic_name\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "ALIAS",
          "NAME"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 41,
    "levelDisplay": "Level 41",
    "title": "Level 41: Calculate the total inventory value by multiplying price ...",
    "subtitle": "Calculate the total inventory value by multiplying price by stock_qty.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "task": "Calculate the total inventory value by multiplying price by stock_qty.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price, (price * stock_qty) AS total_inventory_value\nFROM Books;",
    "template": [
      {
        "text": "SELECT title, price, (price * stock_qty) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " total_inventory_value\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Books;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "ALIAS",
          "AS",
          "NAME"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "FROM",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 42,
    "levelDisplay": "Level 42",
    "title": "Level 42: Compute order subtotal by multiplying unit_price by quantity",
    "subtitle": "Compute order subtotal by multiplying unit_price by quantity.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "task": "Compute order subtotal by multiplying unit_price by quantity.",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, (unit_price * quantity) AS subtotal\nFROM Orders;",
    "template": [
      {
        "text": "SELECT order_id, (unit_price * quantity) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " subtotal\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Orders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "ALIAS",
          "NAME"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 43,
    "levelDisplay": "Level 43",
    "title": "Level 43: Calculate a 10% raise amount and the resulting projected ...",
    "subtitle": "Calculate a 10% raise amount and the resulting projected salary.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "task": "Calculate a 10% raise amount and the resulting projected salary.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary, (salary * 0.10) AS raise_amount, (salary * 1.10) AS projected_salary\nFROM Employees;",
    "template": [
      {
        "text": "SELECT first_name, salary, (salary * 0.10) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " raise_amount, (salary * 1.10) AS projected_salary\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "AS",
          "LABEL",
          "NAME"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 44,
    "levelDisplay": "Level 44",
    "title": "Level 44: Convert a 4.0 GPA to an approximate 100-point scale by mu...",
    "subtitle": "Convert a 4.0 GPA to an approximate 100-point scale by multiplying by 25.0.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "task": "Convert a 4.0 GPA to an approximate 100-point scale by multiplying by 25.0.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, gpa, (gpa * 25.0) AS gpa_percentage\nFROM Students;",
    "template": [
      {
        "text": "SELECT full_name, gpa, (gpa * 25.0) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " gpa_percentage\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Students;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "NAME",
          "AS",
          "ALIAS",
          "LABEL"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "INTO",
          "FROM"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 45,
    "levelDisplay": "Level 45",
    "title": "Level 45: Calculate the item price including an 8% sales tax (unit_...",
    "subtitle": "Calculate the item price including an 8% sales tax (unit_price * 1.08).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "task": "Calculate the item price including an 8% sales tax (unit_price * 1.08).",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price, (unit_price * 1.08) AS price_with_tax\nFROM GroceryItems;",
    "template": [
      {
        "text": "SELECT item_name, unit_price, (unit_price * 1.08) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " price_with_tax\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GroceryItems;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "NAME",
          "ALIAS",
          "AS",
          "LABEL"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 46,
    "levelDisplay": "Level 46",
    "title": "Level 46: Convert duration in seconds into fractional minutes by di...",
    "subtitle": "Convert duration in seconds into fractional minutes by dividing by 60.0.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "task": "Convert duration in seconds into fractional minutes by dividing by 60.0.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, duration_seconds, (duration_seconds / 60.0) AS duration_minutes\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT track_title, duration_seconds, (duration_seconds / 60.0) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " duration_minutes\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "AS",
          "NAME",
          "ALIAS"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 47,
    "levelDisplay": "Level 47",
    "title": "Level 47: Compute the total annual membership cost by multiplying m...",
    "subtitle": "Compute the total annual membership cost by multiplying monthly_fee by 12.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "task": "Compute the total annual membership cost by multiplying monthly_fee by 12.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, monthly_fee, (monthly_fee * 12) AS annual_cost\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT member_name, monthly_fee, (monthly_fee * 12) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " annual_cost\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "NAME",
          "ALIAS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "FROM",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
    "task": "Add a $35 standard checked bag fee to ticket_price.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, ticket_price, (ticket_price + 35.00) AS price_with_baggage\nFROM FlightSchedule;",
    "template": [
      {
        "text": "SELECT flight_id, ticket_price, (ticket_price + 35.00) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " price_with_baggage\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " FlightSchedule;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "AS",
          "NAME",
          "ALIAS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "FROM",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 49,
    "levelDisplay": "Level 49",
    "title": "Level 49: Convert pet weight from kilograms to pounds by multiplyin...",
    "subtitle": "Convert pet weight from kilograms to pounds by multiplying by 2.20462.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "task": "Convert pet weight from kilograms to pounds by multiplying by 2.20462.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, weight_kg, (weight_kg * 2.20462) AS weight_lbs\nFROM PetClinic;",
    "template": [
      {
        "text": "SELECT pet_name, weight_kg, (weight_kg * 2.20462) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " weight_lbs\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "ALIAS",
          "AS"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 50,
    "levelDisplay": "Level 50",
    "title": "Level 50: Calculate the final discounted total: subtotal times (1 -...",
    "subtitle": "Calculate the final discounted total: subtotal times (1 - discount_pct).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.5 Arithmetic Operators",
    "task": "Calculate the final discounted total: subtotal times (1 - discount_pct).",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, unit_price, quantity, ((unit_price * quantity) * (1 - discount_pct)) AS final_charged_amount\nFROM Orders;",
    "template": [
      {
        "text": "SELECT order_id, unit_price, quantity, ((unit_price * quantity) * (1 - discount_pct)) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " final_charged_amount\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Orders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "ALIAS",
          "NAME"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "INTO",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 51,
    "levelDisplay": "Level 51",
    "title": "Level 51: Round calculated price with 8.25% sales tax to 2 decimal ...",
    "subtitle": "Round calculated price with 8.25% sales tax to 2 decimal places using ROUND().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
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
        "text": "(unit_price * 1.0825, 2) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " rounded_tax_price\nFROM GroceryItems;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND",
        "options": [
          "FIXED",
          "APPROX",
          "TRUNC",
          "ROUND"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "AS",
          "ALIAS"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
        "text": "(gpa, 1) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " rounded_gpa\nFROM Students;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND",
        "options": [
          "APPROX",
          "TRUNC",
          "ROUND",
          "FIXED"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 53,
    "levelDisplay": "Level 53",
    "title": "Level 53: Extract whole minutes of track duration using FLOOR(durat...",
    "subtitle": "Extract whole minutes of track duration using FLOOR(duration_seconds / 60).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "task": "Extract whole minutes of track duration using FLOOR(duration_seconds / 60).",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, FLOOR(duration_seconds / 60) AS whole_minutes\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT track_title, FLOOR(duration_seconds / 60) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " whole_minutes\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "AS",
          "NAME",
          "LABEL"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 54,
    "levelDisplay": "Level 54",
    "title": "Level 54: Round monthly fee up to the nearest whole integer using C...",
    "subtitle": "Round monthly fee up to the nearest whole integer using CEIL().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "task": "Round monthly fee up to the nearest whole integer using CEIL().",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, CEIL(monthly_fee) AS rounded_up_fee\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT member_name, CEIL(monthly_fee) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " rounded_up_fee\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "NAME",
          "LABEL",
          "AS",
          "ALIAS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "SOURCE",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 55,
    "levelDisplay": "Level 55",
    "title": "Level 55: Calculate and round exact discount savings to 2 decimal p...",
    "subtitle": "Calculate and round exact discount savings to 2 decimal places.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
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
        "text": "((unit_price * quantity) * discount_pct, 2) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " discount_savings\nFROM Orders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND",
        "options": [
          "FIXED",
          "TRUNC",
          "ROUND",
          "APPROX"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "AS",
          "ALIAS"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
        "text": "(ticket_price / 1.15, 2) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " base_fare_before_tax\nFROM FlightSchedule;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND",
        "options": [
          "FIXED",
          "APPROX",
          "TRUNC",
          "ROUND"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
        "text": "(weight_kg * 2.20462, 1) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " rounded_lbs\nFROM PetClinic;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND",
        "options": [
          "ROUND",
          "FIXED",
          "APPROX",
          "TRUNC"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 58,
    "levelDisplay": "Level 58",
    "title": "Level 58: Calculate the absolute deviation from target inventory le...",
    "subtitle": "Calculate the absolute deviation from target inventory level (10) using ABS().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
    "task": "Calculate the absolute deviation from target inventory level (10) using ABS().",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, ABS(stock_qty - 10) AS distance_from_target_stock\nFROM Books;",
    "template": [
      {
        "text": "SELECT title, ABS(stock_qty - 10) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " distance_from_target_stock\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Books;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "NAME",
          "ALIAS",
          "AS",
          "LABEL"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "FROM",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 59,
    "levelDisplay": "Level 59",
    "title": "Level 59: Calculate biweekly paycheck by dividing annual salary by ...",
    "subtitle": "Calculate biweekly paycheck by dividing annual salary by 26 pay periods and rounding to 2 decimals.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
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
        "text": "(salary / 26.0, 2) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " biweekly_paycheck\nFROM Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND",
        "options": [
          "APPROX",
          "FIXED",
          "ROUND",
          "TRUNC"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 60,
    "levelDisplay": "Level 60",
    "title": "Level 60: Round star ratings to the nearest whole star using ROUND(...",
    "subtitle": "Round star ratings to the nearest whole star using ROUND(star_rating, 0).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.6 Math & Rounding Functions",
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
        "text": "(star_rating, 0) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " rounded_star_rating\nFROM MovieReviews;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "ROUND",
        "options": [
          "ROUND",
          "TRUNC",
          "APPROX",
          "FIXED"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 61,
    "levelDisplay": "Level 61",
    "title": "Level 61: Glue first_name and last_name together with a space using...",
    "subtitle": "Glue first_name and last_name together with a space using CONCAT().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
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
        "text": "(first_name, ' ', last_name) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " full_student_name\nFROM Students;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CONCAT",
        "options": [
          "GLUE",
          "CONCAT",
          "COMBINE",
          "JOIN_STR"
        ]
      },
      "slot2": {
        "correct": "AS",
        "options": [
          "AS",
          "NAME",
          "ALIAS",
          "LABEL"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
    "task": "Transform title to uppercase and genre to lowercase.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT UPPER(title) AS uppercase_title, LOWER(genre) AS lowercase_genre\nFROM Books;",
    "template": [
      {
        "text": "SELECT UPPER(title) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " uppercase_title, LOWER(genre) AS lowercase_genre\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Books;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "LABEL",
          "NAME",
          "AS",
          "ALIAS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "INTO",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 63,
    "levelDisplay": "Level 63",
    "title": "Level 63: Format employee name as 'LastName, FirstName' using CONCAT()",
    "subtitle": "Format employee name as 'LastName, FirstName' using CONCAT().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
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
        "text": "(last_name, ', ', first_name) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " formal_directory_name\nFROM Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CONCAT",
        "options": [
          "JOIN_STR",
          "CONCAT",
          "GLUE",
          "COMBINE"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 64,
    "levelDisplay": "Level 64",
    "title": "Level 64: Count the number of characters in track_title using LENGTH()",
    "subtitle": "Count the number of characters in track_title using LENGTH().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "task": "Count the number of characters in track_title using LENGTH().",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, LENGTH(track_title) AS title_char_count\nFROM MusicTracks;",
    "template": [
      {
        "text": "SELECT track_title, LENGTH(track_title) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " title_char_count\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "ALIAS",
          "NAME"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "SOURCE",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 65,
    "levelDisplay": "Level 65",
    "title": "Level 65: Convert item_name to all capital letters for shelf printing",
    "subtitle": "Convert item_name to all capital letters for shelf printing.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "task": "Convert item_name to all capital letters for shelf printing.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT UPPER(item_name) AS label_name\nFROM GroceryItems;",
    "template": [
      {
        "text": "SELECT UPPER(item_name) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " label_name\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GroceryItems;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "LABEL",
          "NAME",
          "AS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "FROM",
          "TABLE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 66,
    "levelDisplay": "Level 66",
    "title": "Level 66: Combine origin and destination into a route string like '...",
    "subtitle": "Combine origin and destination into a route string like 'ORD -> LAX'.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "task": "Combine origin and destination into a route string like 'ORD -> LAX'.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, CONCAT(origin_airport, ' -> ', dest_airport) AS route\nFROM FlightSchedule;",
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
        "text": "(origin_airport, ' -> ', dest_airport) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " route\nFROM FlightSchedule;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CONCAT",
        "options": [
          "GLUE",
          "CONCAT",
          "JOIN_STR",
          "COMBINE"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 67,
    "levelDisplay": "Level 67",
    "title": "Level 67: Extract the first 3 letters of species using LEFT(species...",
    "subtitle": "Extract the first 3 letters of species using LEFT(species, 3).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "task": "Extract the first 3 letters of species using LEFT(species, 3).",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, LEFT(species, 3) AS species_short_code\nFROM PetClinic;",
    "template": [
      {
        "text": "SELECT pet_name, LEFT(species, 3) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " species_short_code\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "AS",
          "ALIAS",
          "NAME",
          "LABEL"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "TABLE",
          "FROM",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 68,
    "levelDisplay": "Level 68",
    "title": "Level 68: Extract the last 4 characters of movie_title using RIGHT()",
    "subtitle": "Extract the last 4 characters of movie_title using RIGHT().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "task": "Extract the last 4 characters of movie_title using RIGHT().",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, RIGHT(movie_title, 4) AS title_suffix\nFROM MovieReviews;",
    "template": [
      {
        "text": "SELECT movie_title, RIGHT(movie_title, 4) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " title_suffix\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MovieReviews;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "AS",
          "NAME",
          "LABEL"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 69,
    "levelDisplay": "Level 69",
    "title": "Level 69: Convert membership plan to uppercase for keycard printing",
    "subtitle": "Convert membership plan to uppercase for keycard printing.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
    "task": "Convert membership plan to uppercase for keycard printing.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT UPPER(membership_plan) AS plan_badge\nFROM GymMembers;",
    "template": [
      {
        "text": "SELECT UPPER(membership_plan) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " plan_badge\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "AS",
          "LABEL",
          "NAME",
          "ALIAS"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 70,
    "levelDisplay": "Level 70",
    "title": "Level 70: Format an order label like 'Zoe Hart (Order #5001)' using...",
    "subtitle": "Format an order label like 'Zoe Hart (Order #5001)' using CONCAT().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.7 String Functions",
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
        "text": "(customer_name, ' (Order #', order_id, ')') ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " order_summary\nFROM Orders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CONCAT",
        "options": [
          "GLUE",
          "CONCAT",
          "COMBINE",
          "JOIN_STR"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
        "text": "(hire_date) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " hire_year\nFROM Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "YEAR",
        "options": [
          "YEAR",
          "GET_YEAR",
          "EXTRACT_YE",
          "DATE_YEAR"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 72,
    "levelDisplay": "Level 72",
    "title": "Level 72: Extract the numerical month from hire_date using MONTH()",
    "subtitle": "Extract the numerical month from hire_date using MONTH().",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
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
        "text": "(hire_date) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " hire_month\nFROM Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "MONTH",
        "options": [
          "GET_MONTH",
          "MONTH",
          "DATE_MONTH",
          "EXTRACT_MO"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 73,
    "levelDisplay": "Level 73",
    "title": "Level 73: Calculate how many years a student has been in school rel...",
    "subtitle": "Calculate how many years a student has been in school relative to 2026.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "task": "Calculate how many years a student has been in school relative to 2026.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, enrolled_year, (2026 - enrolled_year) AS years_in_school\nFROM Students;",
    "template": [
      {
        "text": "SELECT full_name, enrolled_year, (2026 - enrolled_year) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " years_in_school\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Students;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "NAME",
          "LABEL",
          "AS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "INTO",
          "SOURCE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
        "text": "(join_date) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " joined_year\nFROM GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "YEAR",
        "options": [
          "DATE_YEAR",
          "YEAR",
          "GET_YEAR",
          "EXTRACT_YE"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
    "task": "Calculate the age of a book in years relative to 2026.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, published_year, (2026 - published_year) AS book_age_years\nFROM Books;",
    "template": [
      {
        "text": "SELECT title, published_year, (2026 - published_year) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " book_age_years\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Books;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "NAME",
          "LABEL",
          "AS"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "SOURCE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
    "task": "Compute how many years ago a movie was released.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, release_year, (2026 - release_year) AS film_age\nFROM MovieReviews;",
    "template": [
      {
        "text": "SELECT movie_title, release_year, (2026 - release_year) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " film_age\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MovieReviews;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "NAME",
          "AS",
          "LABEL",
          "ALIAS"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 77,
    "levelDisplay": "Level 77",
    "title": "Level 77: Project the system's current calendar date using CURRENT_...",
    "subtitle": "Project the system's current calendar date using CURRENT_DATE.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "task": "Project the system's current calendar date using CURRENT_DATE.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, CURRENT_DATE AS report_generated_on\nFROM Employees;",
    "template": [
      {
        "text": "SELECT first_name, CURRENT_DATE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " report_generated_on\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "ALIAS",
          "AS",
          "LABEL",
          "NAME"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
        "text": "(join_date) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " anniversary_month\nFROM GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "MONTH",
        "options": [
          "DATE_MONTH",
          "MONTH",
          "GET_MONTH",
          "EXTRACT_MO"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 79,
    "levelDisplay": "Level 79",
    "title": "Level 79: Extract the specific day of the month (1-31) when the emp...",
    "subtitle": "Extract the specific day of the month (1-31) when the employee was hired.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
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
        "text": "(hire_date) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " hire_day_of_month\nFROM Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DAY",
        "options": [
          "GET_DAY",
          "EXTRACT_DA",
          "DAY",
          "DATE_DAY"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 80,
    "levelDisplay": "Level 80",
    "title": "Level 80: Project expected graduation year by adding 4 to enrolled_...",
    "subtitle": "Project expected graduation year by adding 4 to enrolled_year.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.8 Date Projections",
    "task": "Project expected graduation year by adding 4 to enrolled_year.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, enrolled_year, CONCAT('Class of ', (enrolled_year + 4)) AS expected_graduation\nFROM Students;",
    "template": [
      {
        "text": "SELECT full_name, enrolled_year, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "('Class of ', (enrolled_year + 4)) ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " expected_graduation\nFROM Students;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "CONCAT",
        "options": [
          "CONCAT",
          "JOIN_STR",
          "GLUE",
          "COMBINE"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 81,
    "levelDisplay": "Level 81",
    "title": "Level 81: Find all unique home cities where enrolled students live ...",
    "subtitle": "Find all unique home cities where enrolled students live without duplicates.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "task": "Find all unique home cities where enrolled students live without duplicates.",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT DISTINCT city\nFROM Students;",
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
        "text": " city\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Students;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DISTINCT",
        "options": [
          "DISTINCT",
          "SOLO",
          "DIFFERENT",
          "UNIQUE"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 82,
    "levelDisplay": "Level 82",
    "title": "Level 82: List all distinct literary genres available in the bookst...",
    "subtitle": "List all distinct literary genres available in the bookstore catalog.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "task": "List all distinct literary genres available in the bookstore catalog.",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT DISTINCT genre\nFROM Books;",
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
        "text": " genre\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Books;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DISTINCT",
        "options": [
          "DIFFERENT",
          "SOLO",
          "DISTINCT",
          "UNIQUE"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 83,
    "levelDisplay": "Level 83",
    "title": "Level 83: Retrieve the list of distinct company departments without...",
    "subtitle": "Retrieve the list of distinct company departments without duplicate rows.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "task": "Retrieve the list of distinct company departments without duplicate rows.",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT DISTINCT department\nFROM Employees;",
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
        "text": " department\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DISTINCT",
        "options": [
          "SOLO",
          "DISTINCT",
          "DIFFERENT",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "SOURCE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
    "task": "Display all unique grocery product categories.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT DISTINCT category\nFROM GroceryItems;",
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
        "text": " category\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GroceryItems;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DISTINCT",
        "options": [
          "DISTINCT",
          "DIFFERENT",
          "SOLO",
          "UNIQUE"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 85,
    "levelDisplay": "Level 85",
    "title": "Level 85: List all unique musical genres featured in the streaming ...",
    "subtitle": "List all unique musical genres featured in the streaming library.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "task": "List all unique musical genres featured in the streaming library.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT DISTINCT genre\nFROM MusicTracks;",
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
        "text": " genre\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DISTINCT",
        "options": [
          "DISTINCT",
          "DIFFERENT",
          "SOLO",
          "UNIQUE"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
    "task": "Extract all distinct membership plan tiers.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT DISTINCT membership_plan\nFROM GymMembers;",
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
        "text": " membership_plan\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DISTINCT",
        "options": [
          "DISTINCT",
          "DIFFERENT",
          "UNIQUE",
          "SOLO"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 87,
    "levelDisplay": "Level 87",
    "title": "Level 87: Find all unique movie directors who have reviews recorded",
    "subtitle": "Find all unique movie directors who have reviews recorded.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "task": "Find all unique movie directors who have reviews recorded.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT DISTINCT director\nFROM MovieReviews;",
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
        "text": " director\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MovieReviews;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DISTINCT",
        "options": [
          "SOLO",
          "UNIQUE",
          "DIFFERENT",
          "DISTINCT"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
    "task": "List all unique origin departure airports.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT DISTINCT origin_airport\nFROM FlightSchedule;",
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
        "text": " origin_airport\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " FlightSchedule;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DISTINCT",
        "options": [
          "UNIQUE",
          "DIFFERENT",
          "DISTINCT",
          "SOLO"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
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
    "task": "Find all distinct animal species treated at the clinic.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT DISTINCT species\nFROM PetClinic;",
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
        "text": " species\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DISTINCT",
        "options": [
          "SOLO",
          "DISTINCT",
          "UNIQUE",
          "DIFFERENT"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 90,
    "levelDisplay": "Level 90",
    "title": "Level 90: Find distinct combinations of customer name and shipping ...",
    "subtitle": "Find distinct combinations of customer name and shipping city (multi-column DISTINCT).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.9 DISTINCT Deduplication",
    "task": "Find distinct combinations of customer name and shipping city (multi-column DISTINCT).",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT DISTINCT customer_name, shipping_city\nFROM Orders;",
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
        "text": " customer_name, shipping_city\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Orders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "DISTINCT",
        "options": [
          "DISTINCT",
          "SOLO",
          "UNIQUE",
          "DIFFERENT"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "FROM",
          "INTO",
          "TABLE"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 91,
    "levelDisplay": "Level 91",
    "title": "Level 91: Fix the trailing comma bug: 'SELECT full_name, city, FROM...",
    "subtitle": "Fix the trailing comma bug: 'SELECT full_name, city, FROM Students;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "task": "Fix the trailing comma bug: 'SELECT full_name, city, FROM Students;'",
    "table": "Students",
    "schemaSnippet": "Students schema",
    "targetQuery": "SELECT full_name, city\nFROM Students;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " full_name, city\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
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
          "SELECT",
          "GET",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "FROM",
          "TABLE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 92,
    "levelDisplay": "Level 92",
    "title": "Level 92: Fix the unquoted column alias containing spaces: 'SELECT ...",
    "subtitle": "Fix the unquoted column alias containing spaces: 'SELECT title, price AS Retail Price FROM Books;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "task": "Fix the unquoted column alias containing spaces: 'SELECT title, price AS Retail Price FROM Books;'",
    "table": "Books",
    "schemaSnippet": "Books schema",
    "targetQuery": "SELECT title, price\nFROM Books;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " title, price\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
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
          "SELECT",
          "EXTRACT",
          "CHOOSE",
          "GET"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 93,
    "levelDisplay": "Level 93",
    "title": "Level 93: Fix the misplaced DISTINCT keyword: 'SELECT first_name, D...",
    "subtitle": "Fix the misplaced DISTINCT keyword: 'SELECT first_name, DISTINCT department FROM Employees;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "task": "Fix the misplaced DISTINCT keyword: 'SELECT first_name, DISTINCT department FROM Employees;'",
    "table": "Employees",
    "schemaSnippet": "Employees schema",
    "targetQuery": "SELECT first_name, salary\nFROM Employees;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " first_name, salary\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees;",
        "isBlank": false
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
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "INTO",
          "FROM"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 94,
    "levelDisplay": "Level 94",
    "title": "Level 94: Fix the single-quoted column name: \"SELECT 'item_name' FR...",
    "subtitle": "Fix the single-quoted column name: \"SELECT 'item_name' FROM GroceryItems;\" (outputs literal string instead of column).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "task": "Fix the single-quoted column name: \"SELECT 'item_name' FROM GroceryItems;\" (outputs literal string instead of column).",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems schema",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " item_name, unit_price\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
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
          "GET",
          "SELECT",
          "CHOOSE"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 95,
    "levelDisplay": "Level 95",
    "title": "Level 95: Fix missing comma between calculated expression and next ...",
    "subtitle": "Fix missing comma between calculated expression and next column.",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "task": "Fix missing comma between calculated expression and next column.",
    "table": "Orders",
    "schemaSnippet": "Orders schema",
    "targetQuery": "SELECT order_id, quantity * unit_price AS subtotal\nFROM Orders;",
    "template": [
      {
        "text": "SELECT order_id, quantity * unit_price ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " subtotal\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Orders;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "AS",
        "options": [
          "NAME",
          "ALIAS",
          "AS",
          "LABEL"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 96,
    "levelDisplay": "Level 96",
    "title": "Level 96: Fix misspelled column identifier: 'SELECT song_title FROM...",
    "subtitle": "Fix misspelled column identifier: 'SELECT song_title FROM MusicTracks;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "task": "Fix misspelled column identifier: 'SELECT song_title FROM MusicTracks;'",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks schema",
    "targetQuery": "SELECT track_title, artist_name\nFROM MusicTracks;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " track_title, artist_name\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MusicTracks;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "SELECT",
          "EXTRACT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "FROM",
          "SOURCE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 97,
    "levelDisplay": "Level 97",
    "title": "Level 97: Fix table name typo: 'SELECT member_name FROM GymMember;'...",
    "subtitle": "Fix table name typo: 'SELECT member_name FROM GymMember;' (singular vs plural).",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "task": "Fix table name typo: 'SELECT member_name FROM GymMember;' (singular vs plural).",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers schema",
    "targetQuery": "SELECT member_name, monthly_fee\nFROM GymMembers;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " member_name, monthly_fee\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GymMembers;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "SELECT",
          "EXTRACT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "SOURCE",
          "FROM",
          "TABLE",
          "INTO"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 98,
    "levelDisplay": "Level 98",
    "title": "Level 98: Fix hyphen used in column alias: 'SELECT movie_title AS m...",
    "subtitle": "Fix hyphen used in column alias: 'SELECT movie_title AS movie-name FROM MovieReviews;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "task": "Fix hyphen used in column alias: 'SELECT movie_title AS movie-name FROM MovieReviews;'",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews schema",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " movie_title, star_rating\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " MovieReviews;",
        "isBlank": false
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
        "correct": "FROM",
        "options": [
          "SOURCE",
          "TABLE",
          "INTO",
          "FROM"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 99,
    "levelDisplay": "Level 99",
    "title": "Level 99: Fix missing FROM keyword: 'SELECT flight_id, origin_airpo...",
    "subtitle": "Fix missing FROM keyword: 'SELECT flight_id, origin_airport FlightSchedule;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "task": "Fix missing FROM keyword: 'SELECT flight_id, origin_airport FlightSchedule;'",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule schema",
    "targetQuery": "SELECT flight_id, origin_airport, dest_airport\nFROM FlightSchedule;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " flight_id, origin_airport, dest_airport\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " FlightSchedule;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "GET",
          "EXTRACT",
          "CHOOSE",
          "SELECT"
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
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  },
  {
    "id": 100,
    "levelDisplay": "Level 100",
    "title": "Level 100: Fix premature semicolon: 'SELECT pet_name; FROM PetClinic;'",
    "subtitle": "Fix premature semicolon: 'SELECT pet_name; FROM PetClinic;'",
    "type": "fill_blank",
    "category": "Section 01: Foundations & Projections",
    "subcluster": "1.10 Bug Hunts & Edge Cases",
    "task": "Fix premature semicolon: 'SELECT pet_name; FROM PetClinic;'",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic schema",
    "targetQuery": "SELECT pet_name, age_years\nFROM PetClinic;",
    "template": [
      {
        "text": "",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " pet_name, age_years\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "SELECT",
        "options": [
          "SELECT",
          "EXTRACT",
          "CHOOSE",
          "GET"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "INTO",
          "FROM"
        ]
      }
    },
    "explanation": "Keywords are SELECT, FROM, AS, DISTINCT. Keep commas between columns only. 💡 Pro-Tip / Trap: Do not add trailing commas before FROM or quote column identifiers.",
    "commonMistakes": "Punctuation errors, trailing commas, or quotes around column names."
  }
];
