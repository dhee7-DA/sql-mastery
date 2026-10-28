// =============================================================================
// SECTION 02: WHERE PREDICATES & FILTERING (100 INTERACTIVE MULTI-BLANK QUESTS)
// Progressive Cumulative 3-to-5 Blank Challenge Engine Interleaving Foundations & Filtering
// =============================================================================

window.QUESTS_SECTION_2 = [
  {
    "id": 101,
    "levelDisplay": "Level 01",
    "title": "Level 01: Find all students who live in the city of Seattle",
    "subtitle": "Find all students who live in the city of Seattle.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.1 Exact Equality & Inequality",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Find all students who live in the city of Seattle.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, city\nFROM Students\nWHERE city = 'Seattle';",
    "template": [
      {
        "text": "SELECT full_name, city\nFROM ",
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
        "correct": "Students",
        "options": [
          "FlightSchedule",
          "PetClinic",
          "Students",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHEN",
          "HAVING",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "city = 'Seattle';",
        "options": [
          "NULL",
          "city = 'Seattle';",
          "city LIKE 'Seattle';",
          "city != 'Seattle';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Find all students who live in the city of Seattle.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on Students."
  },
  {
    "id": 102,
    "levelDisplay": "Level 02",
    "title": "Level 02: Select all books that belong to the 'Sci-Fi' genre",
    "subtitle": "Select all books that belong to the 'Sci-Fi' genre.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.1 Exact Equality & Inequality",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select all books that belong to the 'Sci-Fi' genre.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, author, genre\nFROM Books\nWHERE genre = 'Sci-Fi';",
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
        "text": ", author, genre\nFROM Books\nWHERE ",
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
          "title",
          "genre",
          "stock_qty",
          "author"
        ]
      },
      "slot2": {
        "correct": "genre",
        "options": [
          "book_id",
          "is_hardcover",
          "price",
          "genre"
        ]
      },
      "slot3": {
        "correct": "= 'Sci-Fi';",
        "options": [
          "!= 'Sci-Fi';",
          "LIKE 'Sci-Fi';",
          "NULL",
          "= 'Sci-Fi';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Select all books that belong to the 'Sci-Fi' genre.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on Books."
  },
  {
    "id": 103,
    "levelDisplay": "Level 03",
    "title": "Level 03: Retrieve all employees in the Engineering department",
    "subtitle": "Retrieve all employees in the Engineering department.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.1 Exact Equality & Inequality",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Retrieve all employees in the Engineering department.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, department, salary\nFROM Employees\nWHERE department = 'Engineering';",
    "template": [
      {
        "text": "SELECT first_name, department, salary\nFROM ",
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
        "correct": "Employees",
        "options": [
          "FlightSchedule",
          "GroceryItems",
          "Employees",
          "MusicTracks"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "WHERE",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "department = 'Engineering';",
        "options": [
          "department = 'Engineering';",
          "department != 'Engineering';",
          "NULL",
          "department LIKE 'Engineering';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Retrieve all employees in the Engineering department.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on Employees."
  },
  {
    "id": 104,
    "levelDisplay": "Level 04",
    "title": "Level 04: Find all grocery items where is_organic is TRUE",
    "subtitle": "Find all grocery items where is_organic is TRUE.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.1 Exact Equality & Inequality",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Find all grocery items where is_organic is TRUE.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE is_organic = TRUE;",
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
        "text": ", unit_price\nFROM GroceryItems\nWHERE ",
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
        "correct": "item_name",
        "options": [
          "stock_qty",
          "item_name",
          "item_id",
          "unit_price"
        ]
      },
      "slot2": {
        "correct": "is_organic",
        "options": [
          "calories",
          "is_organic",
          "item_id",
          "stock_qty"
        ]
      },
      "slot3": {
        "correct": "= TRUE;",
        "options": [
          "= TRUE;",
          "NULL",
          "LIKE TRUE;",
          "!= TRUE;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find all grocery items where is_organic is TRUE.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on GroceryItems."
  },
  {
    "id": 105,
    "levelDisplay": "Level 05",
    "title": "Level 05: Display all orders where order_status is 'Shipped'",
    "subtitle": "Display all orders where order_status is 'Shipped'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.1 Exact Equality & Inequality",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Display all orders where order_status is 'Shipped'.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, customer_name, order_status\nFROM Orders\nWHERE order_status = 'Shipped';",
    "template": [
      {
        "text": "SELECT order_id, customer_name, order_status\nFROM ",
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
        "correct": "Orders",
        "options": [
          "Orders",
          "GroceryItems",
          "FlightSchedule",
          "Employees"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "order_status = 'Shipped';",
        "options": [
          "order_status LIKE 'Shipped';",
          "order_status = 'Shipped';",
          "NULL",
          "order_status != 'Shipped';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Display all orders where order_status is 'Shipped'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on Orders."
  },
  {
    "id": 106,
    "levelDisplay": "Level 06",
    "title": "Level 06: Find all tracks performed by the artist 'Luna Waves'",
    "subtitle": "Find all tracks performed by the artist 'Luna Waves'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.1 Exact Equality & Inequality",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Find all tracks performed by the artist 'Luna Waves'.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, artist_name\nFROM MusicTracks\nWHERE artist_name = 'Luna Waves';",
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
        "text": ", artist_name\nFROM MusicTracks\nWHERE ",
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
          "artist",
          "track_id",
          "track_title",
          "release_year"
        ]
      },
      "slot2": {
        "correct": "artist_name",
        "options": [
          "track_id",
          "track_title",
          "artist_name",
          "play_count"
        ]
      },
      "slot3": {
        "correct": "= 'Luna Waves';",
        "options": [
          "= 'Luna Waves';",
          "NULL",
          "!= 'Luna Waves';",
          "LIKE 'Luna Waves';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find all tracks performed by the artist 'Luna Waves'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on MusicTracks."
  },
  {
    "id": 107,
    "levelDisplay": "Level 07",
    "title": "Level 07: List all members enrolled in the 'Gold' plan",
    "subtitle": "List all members enrolled in the 'Gold' plan.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.1 Exact Equality & Inequality",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "List all members enrolled in the 'Gold' plan.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE membership_plan = 'Gold';",
    "template": [
      {
        "text": "SELECT member_name, membership_plan\nFROM ",
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
        "correct": "GymMembers",
        "options": [
          "FlightSchedule",
          "Books",
          "MovieReviews",
          "GymMembers"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "membership_plan = 'Gold';",
        "options": [
          "NULL",
          "membership_plan LIKE 'Gold';",
          "membership_plan = 'Gold';",
          "membership_plan != 'Gold';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: List all members enrolled in the 'Gold' plan.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on GymMembers."
  },
  {
    "id": 108,
    "levelDisplay": "Level 08",
    "title": "Level 08: Find all films directed by 'Christopher Nolan'",
    "subtitle": "Find all films directed by 'Christopher Nolan'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.1 Exact Equality & Inequality",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Find all films directed by 'Christopher Nolan'.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, director\nFROM MovieReviews\nWHERE director = 'Christopher Nolan';",
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
        "text": ", director\nFROM MovieReviews\nWHERE ",
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
          "star_rating",
          "review_count",
          "director",
          "movie_title"
        ]
      },
      "slot2": {
        "correct": "director",
        "options": [
          "director",
          "review_count",
          "review_id",
          "genre"
        ]
      },
      "slot3": {
        "correct": "= 'Christopher Nolan';",
        "options": [
          "= 'Christopher Nolan';",
          "LIKE 'Christopher Nolan';",
          "!= 'Christopher Nolan';",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find all films directed by 'Christopher Nolan'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on MovieReviews."
  },
  {
    "id": 109,
    "levelDisplay": "Level 09",
    "title": "Level 09: Find all flights with destination airport equal to 'LAX'",
    "subtitle": "Find all flights with destination airport equal to 'LAX'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.1 Exact Equality & Inequality",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Find all flights with destination airport equal to 'LAX'.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, dest_airport\nFROM FlightSchedule\nWHERE dest_airport = 'LAX';",
    "template": [
      {
        "text": "SELECT flight_id, dest_airport\nFROM ",
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
        "correct": "FlightSchedule",
        "options": [
          "MusicTracks",
          "Orders",
          "MovieReviews",
          "FlightSchedule"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "dest_airport = 'LAX';",
        "options": [
          "NULL",
          "dest_airport LIKE 'LAX';",
          "dest_airport = 'LAX';",
          "dest_airport != 'LAX';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find all flights with destination airport equal to 'LAX'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on FlightSchedule."
  },
  {
    "id": 110,
    "levelDisplay": "Level 10",
    "title": "Level 10: Find all pets whose species is NOT 'Dog' using != operator",
    "subtitle": "Find all pets whose species is NOT 'Dog' using != operator.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.1 Exact Equality & Inequality",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Find all pets whose species is NOT 'Dog' using != operator.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, species\nFROM PetClinic\nWHERE species != 'Dog';",
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
        "text": ", species\nFROM PetClinic\nWHERE ",
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
          "species",
          "is_vaccinated",
          "pet_name",
          "pet_id"
        ]
      },
      "slot2": {
        "correct": "species",
        "options": [
          "species",
          "pet_name",
          "age_years",
          "is_vaccinated"
        ]
      },
      "slot3": {
        "correct": "!= 'Dog';",
        "options": [
          "NULL",
          "!= 'Dog';",
          "LIKE 'Dog';",
          "= 'Dog';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find all pets whose species is NOT 'Dog' using != operator.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.1 Exact Equality & Inequality on PetClinic."
  },
  {
    "id": 111,
    "levelDisplay": "Level 11",
    "title": "Level 11: Select students with a GPA greater than or equal to 3.5...",
    "subtitle": "Select students with a GPA greater than or equal to 3.50 (Honors list).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.2 Numeric Comparisons",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select students with a GPA greater than or equal to 3.50 (Honors list).",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nWHERE gpa >= 3.50;",
    "template": [
      {
        "text": "SELECT full_name, gpa\nFROM ",
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
        "correct": "Students",
        "options": [
          "GymMembers",
          "FlightSchedule",
          "Employees",
          "Students"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "FILTER",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "gpa >= 3.50;",
        "options": [
          "gpa >= 3.50;",
          "gpa != 3.50;",
          "gpa LIKE 3.50;",
          "gpa = 3.50;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Select students with a GPA greater than or equal to 3.50 (Honors list).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on Students."
  },
  {
    "id": 112,
    "levelDisplay": "Level 12",
    "title": "Level 12: Find all budget books with a price strictly under $20.00",
    "subtitle": "Find all budget books with a price strictly under $20.00.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.2 Numeric Comparisons",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Find all budget books with a price strictly under $20.00.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, price\nFROM Books\nWHERE price < 20.00;",
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
        "text": ", price\nFROM Books\nWHERE ",
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
          "published_year",
          "author",
          "title",
          "stock_qty"
        ]
      },
      "slot2": {
        "correct": "price",
        "options": [
          "stock_qty",
          "price",
          "author",
          "published_year"
        ]
      },
      "slot3": {
        "correct": "< 20.00;",
        "options": [
          "!= 20.00;",
          "LIKE 20.00;",
          "< 20.00;",
          "= 20.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find all budget books with a price strictly under $20.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on Books."
  },
  {
    "id": 113,
    "levelDisplay": "Level 13",
    "title": "Level 13: Retrieve employees earning a salary greater than $80,000",
    "subtitle": "Retrieve employees earning a salary greater than $80,000.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.2 Numeric Comparisons",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Retrieve employees earning a salary greater than $80,000.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, salary\nFROM Employees\nWHERE salary > 80000.00;",
    "template": [
      {
        "text": "SELECT first_name, salary\nFROM ",
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
        "correct": "Employees",
        "options": [
          "GroceryItems",
          "Students",
          "MusicTracks",
          "Employees"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "salary > 80000.00;",
        "options": [
          "salary != 80000.00;",
          "salary LIKE 80000.00;",
          "salary > 80000.00;",
          "salary = 80000.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Retrieve employees earning a salary greater than $80,000.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on Employees."
  },
  {
    "id": 114,
    "levelDisplay": "Level 14",
    "title": "Level 14: Find all low-calorie grocery items with 100 or fewer ca...",
    "subtitle": "Find all low-calorie grocery items with 100 or fewer calories.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.2 Numeric Comparisons",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Find all low-calorie grocery items with 100 or fewer calories.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, calories\nFROM GroceryItems\nWHERE calories <= 100;",
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
        "text": ", calories\nFROM GroceryItems\nWHERE ",
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
        "correct": "item_name",
        "options": [
          "item_name",
          "category",
          "stock_qty",
          "is_organic"
        ]
      },
      "slot2": {
        "correct": "calories",
        "options": [
          "item_name",
          "unit_price",
          "calories",
          "item_id"
        ]
      },
      "slot3": {
        "correct": "<= 100;",
        "options": [
          "= 100;",
          "!= 100;",
          "LIKE 100;",
          "<= 100;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find all low-calorie grocery items with 100 or fewer calories.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on GroceryItems."
  },
  {
    "id": 115,
    "levelDisplay": "Level 15",
    "title": "Level 15: Find bulk orders where quantity is 3 or more",
    "subtitle": "Find bulk orders where quantity is 3 or more.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.2 Numeric Comparisons",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Find bulk orders where quantity is 3 or more.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, quantity\nFROM Orders\nWHERE quantity >= 3;",
    "template": [
      {
        "text": "SELECT order_id, quantity\nFROM ",
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
        "correct": "Orders",
        "options": [
          "GymMembers",
          "MovieReviews",
          "Students",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "HAVING",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "quantity >= 3;",
        "options": [
          "quantity LIKE 3;",
          "quantity = 3;",
          "quantity >= 3;",
          "quantity != 3;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find bulk orders where quantity is 3 or more.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on Orders."
  },
  {
    "id": 116,
    "levelDisplay": "Level 16",
    "title": "Level 16: Select viral tracks with over 100,000 plays",
    "subtitle": "Select viral tracks with over 100,000 plays.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.2 Numeric Comparisons",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select viral tracks with over 100,000 plays.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, play_count\nFROM MusicTracks\nWHERE play_count > 100000;",
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
        "text": ", play_count\nFROM MusicTracks\nWHERE ",
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
          "play_count",
          "track_title",
          "track_id"
        ]
      },
      "slot2": {
        "correct": "play_count",
        "options": [
          "release_year",
          "track_title",
          "track_id",
          "play_count"
        ]
      },
      "slot3": {
        "correct": "> 100000;",
        "options": [
          "!= 100000;",
          "LIKE 100000;",
          "> 100000;",
          "= 100000;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Select viral tracks with over 100,000 plays.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on MusicTracks."
  },
  {
    "id": 117,
    "levelDisplay": "Level 17",
    "title": "Level 17: Find active gym members who visited more than 10 times ...",
    "subtitle": "Find active gym members who visited more than 10 times this month.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.2 Numeric Comparisons",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Find active gym members who visited more than 10 times this month.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, visits_this_month\nFROM GymMembers\nWHERE visits_this_month > 10;",
    "template": [
      {
        "text": "SELECT member_name, visits_this_month\nFROM ",
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
        "correct": "GymMembers",
        "options": [
          "Books",
          "GymMembers",
          "FlightSchedule",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "visits_this_month > 10;",
        "options": [
          "visits_this_month > 10;",
          "visits_this_month != 10;",
          "visits_this_month = 10;",
          "visits_this_month LIKE 10;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Find active gym members who visited more than 10 times this month.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on GymMembers."
  },
  {
    "id": 118,
    "levelDisplay": "Level 18",
    "title": "Level 18: Select critically acclaimed movies with a star rating o...",
    "subtitle": "Select critically acclaimed movies with a star rating of 4.5 or higher.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.2 Numeric Comparisons",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Select critically acclaimed movies with a star rating of 4.5 or higher.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE star_rating >= 4.5;",
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
        "text": ", star_rating\nFROM MovieReviews\nWHERE ",
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
          "genre",
          "release_year",
          "director",
          "movie_title"
        ]
      },
      "slot2": {
        "correct": "star_rating",
        "options": [
          "review_id",
          "movie_title",
          "review_count",
          "star_rating"
        ]
      },
      "slot3": {
        "correct": ">= 4.5;",
        "options": [
          ">= 4.5;",
          "= 4.5;",
          "!= 4.5;",
          "LIKE 4.5;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Select critically acclaimed movies with a star rating of 4.5 or higher.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on MovieReviews."
  },
  {
    "id": 119,
    "levelDisplay": "Level 19",
    "title": "Level 19: List all significantly delayed flights with more than 3...",
    "subtitle": "List all significantly delayed flights with more than 30 minutes of delay.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.2 Numeric Comparisons",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "List all significantly delayed flights with more than 30 minutes of delay.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nWHERE delay_minutes > 30;",
    "template": [
      {
        "text": "SELECT flight_id, delay_minutes\nFROM ",
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
        "correct": "FlightSchedule",
        "options": [
          "FlightSchedule",
          "GroceryItems",
          "Students",
          "MusicTracks"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "FILTER",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "delay_minutes > 30;",
        "options": [
          "delay_minutes = 30;",
          "delay_minutes != 30;",
          "delay_minutes > 30;",
          "delay_minutes LIKE 30;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: List all significantly delayed flights with more than 30 minutes of delay.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on FlightSchedule."
  },
  {
    "id": 120,
    "levelDisplay": "Level 20",
    "title": "Level 20: Find large animal patients weighing over 20 kilograms",
    "subtitle": "Find large animal patients weighing over 20 kilograms.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.2 Numeric Comparisons",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Easy",
    "task": "Find large animal patients weighing over 20 kilograms.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, weight_kg\nFROM PetClinic\nWHERE weight_kg > 20.0;",
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
        "text": ", weight_kg\nFROM PetClinic\nWHERE ",
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
          "breed",
          "pet_name",
          "is_vaccinated",
          "pet_id"
        ]
      },
      "slot2": {
        "correct": "weight_kg",
        "options": [
          "pet_name",
          "age_years",
          "weight_kg",
          "is_vaccinated"
        ]
      },
      "slot3": {
        "correct": "> 20.0;",
        "options": [
          "!= 20.0;",
          "LIKE 20.0;",
          "> 20.0;",
          "= 20.0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find large animal patients weighing over 20 kilograms.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.2 Numeric Comparisons on PetClinic."
  },
  {
    "id": 121,
    "levelDisplay": "Level 21",
    "title": "Level 21: Select students whose age is between 18 and 22 inclusive",
    "subtitle": "Select students whose age is between 18 and 22 inclusive.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Select students whose age is between 18 and 22 inclusive.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, age\nFROM Students\nWHERE age BETWEEN 18 AND 22;",
    "template": [
      {
        "text": "SELECT full_name, age\nFROM ",
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
        "correct": "Students",
        "options": [
          "Orders",
          "GroceryItems",
          "Students",
          "GymMembers"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "HAVING",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "age",
        "options": [
          "major",
          "age",
          "student_id",
          "city"
        ]
      },
      "slot4": {
        "correct": "BETWEEN 18 AND 22;",
        "options": [
          "BETWEEN 18 AND 22;",
          "= 18;",
          ">= 18;",
          "IN (18, 22);"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Select students whose age is between 18 and 22 inclusive.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on Students."
  },
  {
    "id": 122,
    "levelDisplay": "Level 22",
    "title": "Level 22: Find books with prices between $15.00 and $30.00 inclusive",
    "subtitle": "Find books with prices between $15.00 and $30.00 inclusive.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find books with prices between $15.00 and $30.00 inclusive.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, price\nFROM Books\nWHERE price BETWEEN 15.00 AND 30.00;",
    "template": [
      {
        "text": "SELECT title, price\nFROM ",
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
        "correct": "Books",
        "options": [
          "Students",
          "PetClinic",
          "GroceryItems",
          "Books"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "HAVING",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "price",
        "options": [
          "author",
          "published_year",
          "genre",
          "price"
        ]
      },
      "slot4": {
        "correct": "BETWEEN 15.00 AND 30.00;",
        "options": [
          "BETWEEN 15.00 AND 30.00;",
          "= 15.00;",
          "IN (15.00, 30.00);",
          ">= 15.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find books with prices between $15.00 and $30.00 inclusive.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on Books."
  },
  {
    "id": 123,
    "levelDisplay": "Level 23",
    "title": "Level 23: Retrieve employees in the mid-career salary band betwee...",
    "subtitle": "Retrieve employees in the mid-career salary band between $60,000 and $90,000.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Retrieve employees in the mid-career salary band between $60,000 and $90,000.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, salary\nFROM Employees\nWHERE salary BETWEEN 60000.00 AND 90000.00;",
    "template": [
      {
        "text": "SELECT first_name, salary\nFROM ",
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
        "correct": "Employees",
        "options": [
          "Orders",
          "MusicTracks",
          "Employees",
          "Students"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "salary",
        "options": [
          "salary",
          "emp_id",
          "hire_date",
          "department"
        ]
      },
      "slot4": {
        "correct": "BETWEEN 60000.00 AND 90000.00;",
        "options": [
          "= 60000.00;",
          ">= 60000.00;",
          "IN (60000.00, 90000.00);",
          "BETWEEN 60000.00 AND 90000.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Retrieve employees in the mid-career salary band between $60,000 and $90,000.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on Employees."
  },
  {
    "id": 124,
    "levelDisplay": "Level 24",
    "title": "Level 24: Find grocery items priced between $2.00 and $5.00",
    "subtitle": "Find grocery items priced between $2.00 and $5.00.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find grocery items priced between $2.00 and $5.00.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE unit_price BETWEEN 2.00 AND 5.00;",
    "template": [
      {
        "text": "SELECT item_name, unit_price\nFROM ",
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
        "correct": "GroceryItems",
        "options": [
          "MovieReviews",
          "MusicTracks",
          "PetClinic",
          "GroceryItems"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "FILTER",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "unit_price",
        "options": [
          "calories",
          "stock_qty",
          "category",
          "unit_price"
        ]
      },
      "slot4": {
        "correct": "BETWEEN 2.00 AND 5.00;",
        "options": [
          "BETWEEN 2.00 AND 5.00;",
          "IN (2.00, 5.00);",
          "= 2.00;",
          ">= 2.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find grocery items priced between $2.00 and $5.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on GroceryItems."
  },
  {
    "id": 125,
    "levelDisplay": "Level 25",
    "title": "Level 25: Find orders where the unit price is between $25.00 and ...",
    "subtitle": "Find orders where the unit price is between $25.00 and $100.00.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find orders where the unit price is between $25.00 and $100.00.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, unit_price\nFROM Orders\nWHERE unit_price BETWEEN 25.00 AND 100.00;",
    "template": [
      {
        "text": "SELECT order_id, unit_price\nFROM ",
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
        "correct": "Orders",
        "options": [
          "Students",
          "Orders",
          "PetClinic",
          "MusicTracks"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "HAVING",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "unit_price",
        "options": [
          "order_status",
          "order_id",
          "unit_price",
          "product_name"
        ]
      },
      "slot4": {
        "correct": "BETWEEN 25.00 AND 100.00;",
        "options": [
          "BETWEEN 25.00 AND 100.00;",
          ">= 25.00;",
          "= 25.00;",
          "IN (25.00, 100.00);"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find orders where the unit price is between $25.00 and $100.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on Orders."
  },
  {
    "id": 126,
    "levelDisplay": "Level 26",
    "title": "Level 26: Find tracks between 3 and 4 minutes long (180 to 240 se...",
    "subtitle": "Find tracks between 3 and 4 minutes long (180 to 240 seconds).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find tracks between 3 and 4 minutes long (180 to 240 seconds).",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, duration_seconds\nFROM MusicTracks\nWHERE duration_seconds BETWEEN 180 AND 240;",
    "template": [
      {
        "text": "SELECT track_title, duration_seconds\nFROM ",
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
        "correct": "MusicTracks",
        "options": [
          "MusicTracks",
          "GymMembers",
          "MovieReviews",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "WHEN",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "duration_seconds",
        "options": [
          "track_title",
          "title",
          "track_id",
          "duration_seconds"
        ]
      },
      "slot4": {
        "correct": "BETWEEN 180 AND 240;",
        "options": [
          "BETWEEN 180 AND 240;",
          "IN (180, 240);",
          "= 180;",
          ">= 180;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find tracks between 3 and 4 minutes long (180 to 240 seconds).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on MusicTracks."
  },
  {
    "id": 127,
    "levelDisplay": "Level 27",
    "title": "Level 27: List gym members with monthly dues between $25.00 and $...",
    "subtitle": "List gym members with monthly dues between $25.00 and $75.00.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "List gym members with monthly dues between $25.00 and $75.00.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, monthly_fee\nFROM GymMembers\nWHERE monthly_fee BETWEEN 25.00 AND 75.00;",
    "template": [
      {
        "text": "SELECT member_name, monthly_fee\nFROM ",
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
        "correct": "GymMembers",
        "options": [
          "Employees",
          "GymMembers",
          "PetClinic",
          "Students"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "monthly_fee",
        "options": [
          "visits_this_month",
          "joined_date",
          "member_name",
          "monthly_fee"
        ]
      },
      "slot4": {
        "correct": "BETWEEN 25.00 AND 75.00;",
        "options": [
          "IN (25.00, 75.00);",
          ">= 25.00;",
          "= 25.00;",
          "BETWEEN 25.00 AND 75.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: List gym members with monthly dues between $25.00 and $75.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on GymMembers."
  },
  {
    "id": 128,
    "levelDisplay": "Level 28",
    "title": "Level 28: Find films released in the four-year span between 2020 ...",
    "subtitle": "Find films released in the four-year span between 2020 and 2023 inclusive.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find films released in the four-year span between 2020 and 2023 inclusive.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, release_year\nFROM MovieReviews\nWHERE release_year BETWEEN 2020 AND 2023;",
    "template": [
      {
        "text": "SELECT movie_title, release_year\nFROM ",
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
        "correct": "MovieReviews",
        "options": [
          "Orders",
          "MovieReviews",
          "Books",
          "PetClinic"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "release_year",
        "options": [
          "genre",
          "movie_title",
          "review_count",
          "release_year"
        ]
      },
      "slot4": {
        "correct": "BETWEEN 2020 AND 2023;",
        "options": [
          "IN (2020, 2023);",
          "= 2020;",
          ">= 2020;",
          "BETWEEN 2020 AND 2023;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find films released in the four-year span between 2020 and 2023 inclusive.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on MovieReviews."
  },
  {
    "id": 129,
    "levelDisplay": "Level 29",
    "title": "Level 29: Find flights with economy ticket prices between $200 an...",
    "subtitle": "Find flights with economy ticket prices between $200 and $400.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find flights with economy ticket prices between $200 and $400.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, ticket_price\nFROM FlightSchedule\nWHERE ticket_price BETWEEN 200.00 AND 400.00;",
    "template": [
      {
        "text": "SELECT flight_id, ticket_price\nFROM ",
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
        "correct": "FlightSchedule",
        "options": [
          "Orders",
          "GroceryItems",
          "FlightSchedule",
          "Books"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "WHEN",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "ticket_price",
        "options": [
          "flight_id",
          "departure_time",
          "ticket_price",
          "airline"
        ]
      },
      "slot4": {
        "correct": "BETWEEN 200.00 AND 400.00;",
        "options": [
          "= 200.00;",
          "BETWEEN 200.00 AND 400.00;",
          "IN (200.00, 400.00);",
          ">= 200.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find flights with economy ticket prices between $200 and $400.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on FlightSchedule."
  },
  {
    "id": 130,
    "levelDisplay": "Level 30",
    "title": "Level 30: Find very young or senior pets whose age is NOT between...",
    "subtitle": "Find very young or senior pets whose age is NOT between 3 and 8 years.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.3 Range Bounds (BETWEEN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find very young or senior pets whose age is NOT between 3 and 8 years.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, age_years\nFROM PetClinic\nWHERE age_years NOT BETWEEN 3 AND 8;",
    "template": [
      {
        "text": "SELECT pet_name, age_years\nFROM ",
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
        "correct": "PetClinic",
        "options": [
          "PetClinic",
          "GymMembers",
          "MusicTracks",
          "Students"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "age_years NOT",
        "options": [
          "weight_kg",
          "is_vaccinated",
          "age_years NOT",
          "breed"
        ]
      },
      "slot4": {
        "correct": "BETWEEN 3 AND 8;",
        "options": [
          "IN (3, 8);",
          "= 3;",
          ">= 3;",
          "BETWEEN 3 AND 8;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find very young or senior pets whose age is NOT between 3 and 8 years.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.3 Range Bounds (BETWEEN) on PetClinic."
  },
  {
    "id": 131,
    "levelDisplay": "Level 31",
    "title": "Level 31: Select students who live in Seattle, Chicago, or Austin",
    "subtitle": "Select students who live in Seattle, Chicago, or Austin.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Select students who live in Seattle, Chicago, or Austin.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, city\nFROM Students\nWHERE city IN ('Seattle', 'Chicago', 'Austin');",
    "template": [
      {
        "text": "SELECT full_name, city\nFROM ",
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
        "correct": "Students",
        "options": [
          "GymMembers",
          "Books",
          "Students",
          "GroceryItems"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "WHEN",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "city",
        "options": [
          "student_id",
          "gpa",
          "first_name",
          "city"
        ]
      },
      "slot4": {
        "correct": "IN ('Seattle', 'Chicago', 'Austin');",
        "options": [
          "IN ('Seattle', 'Chicago', 'Austin');",
          "= ('Seattle', 'Chicago', 'Austin');",
          "LIKE ('Seattle', 'Chicago', 'Austin');",
          "NOT IN ('Seattle', 'Chicago', 'Austin');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Select students who live in Seattle, Chicago, or Austin.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on Students."
  },
  {
    "id": 132,
    "levelDisplay": "Level 32",
    "title": "Level 32: Find books belonging to Mystery, Sci-Fi, or Thriller ge...",
    "subtitle": "Find books belonging to Mystery, Sci-Fi, or Thriller genres.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find books belonging to Mystery, Sci-Fi, or Thriller genres.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, genre\nFROM Books\nWHERE genre IN ('Mystery', 'Sci-Fi', 'Thriller');",
    "template": [
      {
        "text": "SELECT title, genre\nFROM ",
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
        "correct": "Books",
        "options": [
          "FlightSchedule",
          "Orders",
          "GymMembers",
          "Books"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "genre",
        "options": [
          "stock_qty",
          "genre",
          "price",
          "is_hardcover"
        ]
      },
      "slot4": {
        "correct": "IN ('Mystery', 'Sci-Fi', 'Thriller');",
        "options": [
          "= ('Mystery', 'Sci-Fi', 'Thriller');",
          "LIKE ('Mystery', 'Sci-Fi', 'Thriller');",
          "IN ('Mystery', 'Sci-Fi', 'Thriller');",
          "NOT IN ('Mystery', 'Sci-Fi', 'Thriller');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find books belonging to Mystery, Sci-Fi, or Thriller genres.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on Books."
  },
  {
    "id": 133,
    "levelDisplay": "Level 33",
    "title": "Level 33: Retrieve employees working in either Engineering or Design",
    "subtitle": "Retrieve employees working in either Engineering or Design.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Retrieve employees working in either Engineering or Design.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, department\nFROM Employees\nWHERE department IN ('Engineering', 'Design');",
    "template": [
      {
        "text": "SELECT first_name, department\nFROM ",
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
        "correct": "Employees",
        "options": [
          "GroceryItems",
          "MovieReviews",
          "Employees",
          "GymMembers"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "FILTER",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "department",
        "options": [
          "department",
          "hire_date",
          "emp_id",
          "salary"
        ]
      },
      "slot4": {
        "correct": "IN ('Engineering', 'Design');",
        "options": [
          "NOT IN ('Engineering', 'Design');",
          "LIKE ('Engineering', 'Design');",
          "IN ('Engineering', 'Design');",
          "= ('Engineering', 'Design');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Retrieve employees working in either Engineering or Design.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on Employees."
  },
  {
    "id": 134,
    "levelDisplay": "Level 34",
    "title": "Level 34: List grocery items in either the Produce or Bakery cate...",
    "subtitle": "List grocery items in either the Produce or Bakery category.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "List grocery items in either the Produce or Bakery category.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, category\nFROM GroceryItems\nWHERE category IN ('Produce', 'Bakery');",
    "template": [
      {
        "text": "SELECT item_name, category\nFROM ",
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
        "correct": "GroceryItems",
        "options": [
          "GroceryItems",
          "Orders",
          "Employees",
          "FlightSchedule"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "category",
        "options": [
          "item_id",
          "category",
          "calories",
          "item_name"
        ]
      },
      "slot4": {
        "correct": "IN ('Produce', 'Bakery');",
        "options": [
          "IN ('Produce', 'Bakery');",
          "= ('Produce', 'Bakery');",
          "NOT IN ('Produce', 'Bakery');",
          "LIKE ('Produce', 'Bakery');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: List grocery items in either the Produce or Bakery category.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on GroceryItems."
  },
  {
    "id": 135,
    "levelDisplay": "Level 35",
    "title": "Level 35: Find all fulfilled orders with status Shipped or Delivered",
    "subtitle": "Find all fulfilled orders with status Shipped or Delivered.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find all fulfilled orders with status Shipped or Delivered.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, order_status\nFROM Orders\nWHERE order_status IN ('Shipped', 'Delivered');",
    "template": [
      {
        "text": "SELECT order_id, order_status\nFROM ",
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
        "correct": "Orders",
        "options": [
          "GymMembers",
          "GroceryItems",
          "MusicTracks",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "order_status",
        "options": [
          "product_name",
          "quantity",
          "order_status",
          "shipping_city"
        ]
      },
      "slot4": {
        "correct": "IN ('Shipped', 'Delivered');",
        "options": [
          "= ('Shipped', 'Delivered');",
          "NOT IN ('Shipped', 'Delivered');",
          "IN ('Shipped', 'Delivered');",
          "LIKE ('Shipped', 'Delivered');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find all fulfilled orders with status Shipped or Delivered.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on Orders."
  },
  {
    "id": 136,
    "levelDisplay": "Level 36",
    "title": "Level 36: Filter music tracks to only Rock or Synthwave",
    "subtitle": "Filter music tracks to only Rock or Synthwave.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Filter music tracks to only Rock or Synthwave.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, genre\nFROM MusicTracks\nWHERE genre IN ('Rock', 'Synthwave');",
    "template": [
      {
        "text": "SELECT track_title, genre\nFROM ",
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
        "correct": "MusicTracks",
        "options": [
          "MusicTracks",
          "GroceryItems",
          "Orders",
          "Students"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "genre",
        "options": [
          "title",
          "genre",
          "artist_name",
          "artist"
        ]
      },
      "slot4": {
        "correct": "IN ('Rock', 'Synthwave');",
        "options": [
          "LIKE ('Rock', 'Synthwave');",
          "NOT IN ('Rock', 'Synthwave');",
          "IN ('Rock', 'Synthwave');",
          "= ('Rock', 'Synthwave');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Filter music tracks to only Rock or Synthwave.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on MusicTracks."
  },
  {
    "id": 137,
    "levelDisplay": "Level 37",
    "title": "Level 37: List premium members with either Gold or Platinum plans",
    "subtitle": "List premium members with either Gold or Platinum plans.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "List premium members with either Gold or Platinum plans.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, membership_plan\nFROM GymMembers\nWHERE membership_plan IN ('Gold', 'Platinum');",
    "template": [
      {
        "text": "SELECT member_name, membership_plan\nFROM ",
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
        "correct": "GymMembers",
        "options": [
          "GymMembers",
          "Books",
          "FlightSchedule",
          "MusicTracks"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "FILTER",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "membership_plan",
        "options": [
          "joined_date",
          "member_name",
          "membership_plan",
          "has_trainer"
        ]
      },
      "slot4": {
        "correct": "IN ('Gold', 'Platinum');",
        "options": [
          "LIKE ('Gold', 'Platinum');",
          "IN ('Gold', 'Platinum');",
          "NOT IN ('Gold', 'Platinum');",
          "= ('Gold', 'Platinum');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: List premium members with either Gold or Platinum plans.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on GymMembers."
  },
  {
    "id": 138,
    "levelDisplay": "Level 38",
    "title": "Level 38: Select movies whose genre is neither Horror nor Action",
    "subtitle": "Select movies whose genre is neither Horror nor Action.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Select movies whose genre is neither Horror nor Action.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, genre\nFROM MovieReviews\nWHERE genre NOT IN ('Horror', 'Action');",
    "template": [
      {
        "text": "SELECT movie_title, genre\nFROM ",
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
        "correct": "MovieReviews",
        "options": [
          "GroceryItems",
          "MusicTracks",
          "MovieReviews",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "genre NOT",
        "options": [
          "movie_title",
          "star_rating",
          "genre NOT",
          "director"
        ]
      },
      "slot4": {
        "correct": "IN ('Horror', 'Action');",
        "options": [
          "LIKE ('Horror', 'Action');",
          "IN ('Horror', 'Action');",
          "NOT IN ('Horror', 'Action');",
          "= ('Horror', 'Action');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Select movies whose genre is neither Horror nor Action.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on MovieReviews."
  },
  {
    "id": 139,
    "levelDisplay": "Level 39",
    "title": "Level 39: Find flights departing from major hubs ORD, SFO, or JFK",
    "subtitle": "Find flights departing from major hubs ORD, SFO, or JFK.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find flights departing from major hubs ORD, SFO, or JFK.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, origin_airport\nFROM FlightSchedule\nWHERE origin_airport IN ('ORD', 'SFO', 'JFK');",
    "template": [
      {
        "text": "SELECT flight_id, origin_airport\nFROM ",
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
        "correct": "FlightSchedule",
        "options": [
          "MusicTracks",
          "PetClinic",
          "GymMembers",
          "FlightSchedule"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "HAVING",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "origin_airport",
        "options": [
          "airline",
          "destination_airport",
          "flight_id",
          "origin_airport"
        ]
      },
      "slot4": {
        "correct": "IN ('ORD', 'SFO', 'JFK');",
        "options": [
          "= ('ORD', 'SFO', 'JFK');",
          "LIKE ('ORD', 'SFO', 'JFK');",
          "IN ('ORD', 'SFO', 'JFK');",
          "NOT IN ('ORD', 'SFO', 'JFK');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find flights departing from major hubs ORD, SFO, or JFK.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on FlightSchedule."
  },
  {
    "id": 140,
    "levelDisplay": "Level 40",
    "title": "Level 40: Filter patient records to standard household pets: Dog ...",
    "subtitle": "Filter patient records to standard household pets: Dog or Cat.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.4 List Membership (IN & NOT IN)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Filter patient records to standard household pets: Dog or Cat.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, species\nFROM PetClinic\nWHERE species IN ('Dog', 'Cat');",
    "template": [
      {
        "text": "SELECT pet_name, species\nFROM ",
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
        "correct": "PetClinic",
        "options": [
          "MovieReviews",
          "MusicTracks",
          "PetClinic",
          "Employees"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "species",
        "options": [
          "pet_name",
          "species",
          "breed",
          "is_vaccinated"
        ]
      },
      "slot4": {
        "correct": "IN ('Dog', 'Cat');",
        "options": [
          "NOT IN ('Dog', 'Cat');",
          "= ('Dog', 'Cat');",
          "LIKE ('Dog', 'Cat');",
          "IN ('Dog', 'Cat');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Filter patient records to standard household pets: Dog or Cat.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.4 List Membership (IN & NOT IN) on PetClinic."
  },
  {
    "id": 141,
    "levelDisplay": "Level 41",
    "title": "Level 41: Find all students whose first name starts with the capi...",
    "subtitle": "Find all students whose first name starts with the capital letter 'A'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find all students whose first name starts with the capital letter 'A'.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name\nFROM Students\nWHERE full_name LIKE 'A%';",
    "template": [
      {
        "text": "SELECT full_name\nFROM ",
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
      },
      {
        "text": " LIKE ",
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
        "correct": "Students",
        "options": [
          "FlightSchedule",
          "Students",
          "Books",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "FILTER",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "full_name",
        "options": [
          "last_name",
          "full_name",
          "enrolled_year",
          "age"
        ]
      },
      "slot4": {
        "correct": "'A%';",
        "options": [
          "'Pre-A%'",
          "'A%s'",
          "'Non-A%'",
          "'A%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Find all students whose first name starts with the capital letter 'A'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on Students."
  },
  {
    "id": 142,
    "levelDisplay": "Level 42",
    "title": "Level 42: Find all books written by an author with 'King' anywher...",
    "subtitle": "Find all books written by an author with 'King' anywhere in their name.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find all books written by an author with 'King' anywhere in their name.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, author\nFROM Books\nWHERE author LIKE '%King%';",
    "template": [
      {
        "text": "SELECT title, author\nFROM ",
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
      },
      {
        "text": " LIKE ",
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
        "correct": "Books",
        "options": [
          "MusicTracks",
          "GroceryItems",
          "Books",
          "FlightSchedule"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "WHEN",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "author",
        "options": [
          "author",
          "stock_qty",
          "genre",
          "book_id"
        ]
      },
      "slot4": {
        "correct": "'%King%';",
        "options": [
          "'Pre-%King%'",
          "'%King%';",
          "'%King%s'",
          "'%King%'"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find all books written by an author with 'King' anywhere in their name.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on Books."
  },
  {
    "id": 143,
    "levelDisplay": "Level 43",
    "title": "Level 43: Select all employees whose family name ends with 'son' ...",
    "subtitle": "Select all employees whose family name ends with 'son' (e.g. Johnson, Wilson).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Select all employees whose family name ends with 'son' (e.g. Johnson, Wilson).",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, last_name\nFROM Employees\nWHERE last_name LIKE '%son';",
    "template": [
      {
        "text": "SELECT first_name, last_name\nFROM ",
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
      },
      {
        "text": " LIKE ",
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
        "correct": "Employees",
        "options": [
          "Employees",
          "Books",
          "PetClinic",
          "GymMembers"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "WHERE",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "last_name",
        "options": [
          "hire_date",
          "salary",
          "last_name",
          "bonus"
        ]
      },
      "slot4": {
        "correct": "'%son';",
        "options": [
          "'%son';",
          "'%son'",
          "'%sons'",
          "'Non-%son'"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Select all employees whose family name ends with 'son' (e.g. Johnson, Wilson).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on Employees."
  },
  {
    "id": 144,
    "levelDisplay": "Level 44",
    "title": "Level 44: Find all grocery items with 'Organic' anywhere in the i...",
    "subtitle": "Find all grocery items with 'Organic' anywhere in the item name.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find all grocery items with 'Organic' anywhere in the item name.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name\nFROM GroceryItems\nWHERE item_name LIKE '%Organic%';",
    "template": [
      {
        "text": "SELECT item_name\nFROM ",
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
      },
      {
        "text": " LIKE ",
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
        "correct": "GroceryItems",
        "options": [
          "GroceryItems",
          "Books",
          "GymMembers",
          "FlightSchedule"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "WHEN",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "item_name",
        "options": [
          "stock_qty",
          "unit_price",
          "item_name",
          "calories"
        ]
      },
      "slot4": {
        "correct": "'%Organic%';",
        "options": [
          "'%Organic%'",
          "'Non-%Organic%'",
          "'%Organic%s'",
          "'%Organic%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find all grocery items with 'Organic' anywhere in the item name.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on GroceryItems."
  },
  {
    "id": 145,
    "levelDisplay": "Level 45",
    "title": "Level 45: Find orders placed by customers whose name begins with 'Z'",
    "subtitle": "Find orders placed by customers whose name begins with 'Z'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Medium",
    "task": "Find orders placed by customers whose name begins with 'Z'.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, customer_name\nFROM Orders\nWHERE customer_name LIKE 'Z%';",
    "template": [
      {
        "text": "SELECT order_id, customer_name\nFROM ",
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
      },
      {
        "text": " LIKE ",
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
        "correct": "Orders",
        "options": [
          "Students",
          "Orders",
          "Books",
          "MusicTracks"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "customer_name",
        "options": [
          "quantity",
          "unit_price",
          "shipping_city",
          "customer_name"
        ]
      },
      "slot4": {
        "correct": "'Z%';",
        "options": [
          "'Non-Z%'",
          "'Z%';",
          "'Z%s'",
          "'Pre-Z%'"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find orders placed by customers whose name begins with 'Z'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on Orders."
  },
  {
    "id": 146,
    "levelDisplay": "Level 46",
    "title": "Level 46: Find all tracks that have 'Rain' in the title",
    "subtitle": "Find all tracks that have 'Rain' in the title.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find all tracks that have 'Rain' in the title.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title\nFROM MusicTracks\nWHERE track_title LIKE '%Rain%';",
    "template": [
      {
        "text": "SELECT track_title\nFROM ",
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
        "correct": "MusicTracks",
        "options": [
          "GymMembers",
          "MusicTracks",
          "Employees",
          "MovieReviews"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "HAVING",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "track_title",
        "options": [
          "release_year",
          "play_count",
          "track_title",
          "duration_seconds"
        ]
      },
      "slot4": {
        "correct": "LIKE '%Rain%';",
        "options": [
          "> 0;",
          "IS NOT NULL;",
          "= 'Active';",
          "LIKE '%Rain%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find all tracks that have 'Rain' in the title.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on MusicTracks."
  },
  {
    "id": 147,
    "levelDisplay": "Level 47",
    "title": "Level 47: Find members whose name has 'a' as the second character...",
    "subtitle": "Find members whose name has 'a' as the second character (e.g. Sam, Dan).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find members whose name has 'a' as the second character (e.g. Sam, Dan).",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name\nFROM GymMembers\nWHERE member_name LIKE '_a%';",
    "template": [
      {
        "text": "SELECT member_name\nFROM ",
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
        "correct": "GymMembers",
        "options": [
          "PetClinic",
          "GymMembers",
          "Employees",
          "MovieReviews"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "HAVING",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "member_name",
        "options": [
          "membership_plan",
          "member_id",
          "has_trainer",
          "member_name"
        ]
      },
      "slot4": {
        "correct": "LIKE '_a%';",
        "options": [
          "IS NOT NULL;",
          "LIKE '_a%';",
          "= 'Active';",
          "> 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Find members whose name has 'a' as the second character (e.g. Sam, Dan).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on GymMembers."
  },
  {
    "id": 148,
    "levelDisplay": "Level 48",
    "title": "Level 48: Find movies that contain the word 'The ' in their title",
    "subtitle": "Find movies that contain the word 'The ' in their title.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find movies that contain the word 'The ' in their title.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title\nFROM MovieReviews\nWHERE movie_title LIKE '%The %';",
    "template": [
      {
        "text": "SELECT movie_title\nFROM ",
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
        "correct": "MovieReviews",
        "options": [
          "Books",
          "PetClinic",
          "MovieReviews",
          "GymMembers"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "movie_title",
        "options": [
          "movie_title",
          "director",
          "review_id",
          "release_year"
        ]
      },
      "slot4": {
        "correct": "LIKE '%The %';",
        "options": [
          "> 0;",
          "IS NOT NULL;",
          "= 'Active';",
          "LIKE '%The %';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find movies that contain the word 'The ' in their title.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on MovieReviews."
  },
  {
    "id": 149,
    "levelDisplay": "Level 49",
    "title": "Level 49: Find all American Airlines flights starting with flight...",
    "subtitle": "Find all American Airlines flights starting with flight code 'AA-'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find all American Airlines flights starting with flight code 'AA-'.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id\nFROM FlightSchedule\nWHERE flight_id LIKE 'AA-%';",
    "template": [
      {
        "text": "SELECT flight_id\nFROM ",
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
        "correct": "FlightSchedule",
        "options": [
          "FlightSchedule",
          "PetClinic",
          "GroceryItems",
          "GymMembers"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "flight_id",
        "options": [
          "destination_airport",
          "flight_id",
          "dest_airport",
          "ticket_price"
        ]
      },
      "slot4": {
        "correct": "LIKE 'AA-%';",
        "options": [
          "= 'Active';",
          "LIKE 'AA-%';",
          "> 0;",
          "IS NOT NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find all American Airlines flights starting with flight code 'AA-'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on FlightSchedule."
  },
  {
    "id": 150,
    "levelDisplay": "Level 50",
    "title": "Level 50: Find all dogs whose breed includes 'Retriever' (Golden,...",
    "subtitle": "Find all dogs whose breed includes 'Retriever' (Golden, Labrador, etc.).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.5 Pattern Matching (LIKE)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find all dogs whose breed includes 'Retriever' (Golden, Labrador, etc.).",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, breed\nFROM PetClinic\nWHERE breed LIKE '%Retriever%';",
    "template": [
      {
        "text": "SELECT pet_name, breed\nFROM ",
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
        "correct": "PetClinic",
        "options": [
          "PetClinic",
          "MovieReviews",
          "Books",
          "GymMembers"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "breed",
        "options": [
          "age_years",
          "is_vaccinated",
          "pet_name",
          "breed"
        ]
      },
      "slot4": {
        "correct": "LIKE '%Retriever%';",
        "options": [
          "LIKE '%Retriever%';",
          "> 0;",
          "IS NOT NULL;",
          "= 'Active';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find all dogs whose breed includes 'Retriever' (Golden, Labrador, etc.).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.5 Pattern Matching (LIKE) on PetClinic."
  },
  {
    "id": 151,
    "levelDisplay": "Level 51",
    "title": "Level 51: Find books whose title does NOT contain the word 'The'",
    "subtitle": "Find books whose title does NOT contain the word 'The'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find books whose title does NOT contain the word 'The'.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title\nFROM Books\nWHERE title NOT LIKE '%The%';",
    "template": [
      {
        "text": "SELECT title\nFROM ",
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
        "correct": "Books",
        "options": [
          "MovieReviews",
          "FlightSchedule",
          "Books",
          "Students"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "FILTER",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "title",
        "options": [
          "title",
          "stock_qty",
          "is_hardcover",
          "published_year"
        ]
      },
      "slot4": {
        "correct": "NOT LIKE '%The%';",
        "options": [
          "NOT LIKE '%The%';",
          "> 0;",
          "= 'Active';",
          "IS NOT NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find books whose title does NOT contain the word 'The'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on Books."
  },
  {
    "id": 152,
    "levelDisplay": "Level 52",
    "title": "Level 52: Select students who live in cities that do NOT start wi...",
    "subtitle": "Select students who live in cities that do NOT start with 'S'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Select students who live in cities that do NOT start with 'S'.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, city\nFROM Students\nWHERE city NOT LIKE 'S%';",
    "template": [
      {
        "text": "SELECT full_name, city\nFROM ",
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
        "correct": "Students",
        "options": [
          "Orders",
          "Books",
          "Students",
          "GroceryItems"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "FILTER",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "city",
        "options": [
          "full_name",
          "gpa",
          "student_id",
          "city"
        ]
      },
      "slot4": {
        "correct": "NOT LIKE 'S%';",
        "options": [
          "= 'Active';",
          "> 0;",
          "NOT LIKE 'S%';",
          "IS NOT NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Select students who live in cities that do NOT start with 'S'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on Students."
  },
  {
    "id": 153,
    "levelDisplay": "Level 53",
    "title": "Level 53: Find employees whose department name does not end with ...",
    "subtitle": "Find employees whose department name does not end with 'ing'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find employees whose department name does not end with 'ing'.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, department\nFROM Employees\nWHERE department NOT LIKE '%ing';",
    "template": [
      {
        "text": "SELECT first_name, department\nFROM ",
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
        "correct": "Employees",
        "options": [
          "FlightSchedule",
          "Employees",
          "PetClinic",
          "MovieReviews"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "department",
        "options": [
          "emp_id",
          "salary",
          "bonus",
          "department"
        ]
      },
      "slot4": {
        "correct": "NOT LIKE '%ing';",
        "options": [
          "IS NOT NULL;",
          "= 'Active';",
          "NOT LIKE '%ing';",
          "> 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Find employees whose department name does not end with 'ing'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on Employees."
  },
  {
    "id": 154,
    "levelDisplay": "Level 54",
    "title": "Level 54: Find grocery items that do not contain the word 'Milk'",
    "subtitle": "Find grocery items that do not contain the word 'Milk'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find grocery items that do not contain the word 'Milk'.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name\nFROM GroceryItems\nWHERE item_name NOT LIKE '%Milk%';",
    "template": [
      {
        "text": "SELECT item_name\nFROM ",
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
        "correct": "GroceryItems",
        "options": [
          "PetClinic",
          "Books",
          "Orders",
          "GroceryItems"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "WHEN",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "item_name",
        "options": [
          "item_name",
          "unit_price",
          "calories",
          "category"
        ]
      },
      "slot4": {
        "correct": "NOT LIKE '%Milk%';",
        "options": [
          "NOT LIKE '%Milk%';",
          "= 'Active';",
          "> 0;",
          "IS NOT NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find grocery items that do not contain the word 'Milk'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on GroceryItems."
  },
  {
    "id": 155,
    "levelDisplay": "Level 55",
    "title": "Level 55: Find all active orders that are not cancelled",
    "subtitle": "Find all active orders that are not cancelled.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find all active orders that are not cancelled.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, order_status\nFROM Orders\nWHERE order_status NOT LIKE '%Cancel%';",
    "template": [
      {
        "text": "SELECT order_id, order_status\nFROM ",
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
        "correct": "Orders",
        "options": [
          "Books",
          "FlightSchedule",
          "GymMembers",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "order_status",
        "options": [
          "order_status",
          "discount_pct",
          "order_id",
          "product_name"
        ]
      },
      "slot4": {
        "correct": "NOT LIKE '%Cancel%';",
        "options": [
          "IS NOT NULL;",
          "> 0;",
          "= 'Active';",
          "NOT LIKE '%Cancel%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find all active orders that are not cancelled.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on Orders."
  },
  {
    "id": 156,
    "levelDisplay": "Level 56",
    "title": "Level 56: Find music tracks that do not have 'Love' in the title",
    "subtitle": "Find music tracks that do not have 'Love' in the title.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find music tracks that do not have 'Love' in the title.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title\nFROM MusicTracks\nWHERE track_title NOT LIKE '%Love%';",
    "template": [
      {
        "text": "SELECT track_title\nFROM ",
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
        "correct": "MusicTracks",
        "options": [
          "Orders",
          "Employees",
          "MusicTracks",
          "GymMembers"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "HAVING",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "track_title",
        "options": [
          "title",
          "track_title",
          "duration_seconds",
          "release_year"
        ]
      },
      "slot4": {
        "correct": "NOT LIKE '%Love%';",
        "options": [
          "= 'Active';",
          "NOT LIKE '%Love%';",
          "> 0;",
          "IS NOT NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find music tracks that do not have 'Love' in the title.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on MusicTracks."
  },
  {
    "id": 157,
    "levelDisplay": "Level 57",
    "title": "Level 57: List gym members whose names do not start with the lett...",
    "subtitle": "List gym members whose names do not start with the letter 'J'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "List gym members whose names do not start with the letter 'J'.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name\nFROM GymMembers\nWHERE member_name NOT LIKE 'J%';",
    "template": [
      {
        "text": "SELECT member_name\nFROM ",
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
        "correct": "GymMembers",
        "options": [
          "Books",
          "Students",
          "GymMembers",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "FILTER",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "member_name",
        "options": [
          "member_name",
          "monthly_fee",
          "has_trainer",
          "visits_this_month"
        ]
      },
      "slot4": {
        "correct": "NOT LIKE 'J%';",
        "options": [
          "= 'Active';",
          "IS NOT NULL;",
          "> 0;",
          "NOT LIKE 'J%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: List gym members whose names do not start with the letter 'J'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on GymMembers."
  },
  {
    "id": 158,
    "levelDisplay": "Level 58",
    "title": "Level 58: Find movies whose title consists of exactly 3 characters",
    "subtitle": "Find movies whose title consists of exactly 3 characters.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find movies whose title consists of exactly 3 characters.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title\nFROM MovieReviews\nWHERE movie_title LIKE '___';",
    "template": [
      {
        "text": "SELECT movie_title\nFROM ",
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
        "correct": "MovieReviews",
        "options": [
          "GymMembers",
          "MovieReviews",
          "Employees",
          "PetClinic"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "movie_title",
        "options": [
          "movie_title",
          "star_rating",
          "director",
          "genre"
        ]
      },
      "slot4": {
        "correct": "LIKE '___';",
        "options": [
          "IS NOT NULL;",
          "LIKE '___';",
          "= 'Active';",
          "> 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find movies whose title consists of exactly 3 characters.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on MovieReviews."
  },
  {
    "id": 159,
    "levelDisplay": "Level 59",
    "title": "Level 59: Find non-Delta flights that do not start with 'DL-'",
    "subtitle": "Find non-Delta flights that do not start with 'DL-'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find non-Delta flights that do not start with 'DL-'.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id\nFROM FlightSchedule\nWHERE flight_id NOT LIKE 'DL-%';",
    "template": [
      {
        "text": "SELECT flight_id\nFROM ",
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
        "correct": "FlightSchedule",
        "options": [
          "MusicTracks",
          "MovieReviews",
          "FlightSchedule",
          "Books"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "HAVING",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "flight_id",
        "options": [
          "flight_id",
          "delay_minutes",
          "origin_airport",
          "destination_airport"
        ]
      },
      "slot4": {
        "correct": "NOT LIKE 'DL-%';",
        "options": [
          "= 'Active';",
          "> 0;",
          "IS NOT NULL;",
          "NOT LIKE 'DL-%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find non-Delta flights that do not start with 'DL-'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on FlightSchedule."
  },
  {
    "id": 160,
    "levelDisplay": "Level 60",
    "title": "Level 60: Find pets with names that are exactly 4 letters long (e...",
    "subtitle": "Find pets with names that are exactly 4 letters long (e.g. Milo, Luna).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.6 Inverse & Strict Wildcards",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find pets with names that are exactly 4 letters long (e.g. Milo, Luna).",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name\nFROM PetClinic\nWHERE pet_name LIKE '____';",
    "template": [
      {
        "text": "SELECT pet_name\nFROM ",
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
        "correct": "PetClinic",
        "options": [
          "PetClinic",
          "FlightSchedule",
          "Orders",
          "MovieReviews"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "pet_name",
        "options": [
          "breed",
          "weight_kg",
          "pet_id",
          "pet_name"
        ]
      },
      "slot4": {
        "correct": "LIKE '____';",
        "options": [
          "LIKE '____';",
          "= 'Active';",
          "IS NOT NULL;",
          "> 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find pets with names that are exactly 4 letters long (e.g. Milo, Luna).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.6 Inverse & Strict Wildcards on PetClinic."
  },
  {
    "id": 161,
    "levelDisplay": "Level 61",
    "title": "Level 61: Find students who live in Seattle AND maintain a GPA hi...",
    "subtitle": "Find students who live in Seattle AND maintain a GPA higher than 3.50.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.7 Compound AND Logic",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find students who live in Seattle AND maintain a GPA higher than 3.50.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, city, gpa\nFROM Students\nWHERE city = 'Seattle' AND gpa > 3.50;",
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
        "text": ", city, gpa\nFROM Students\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " city = 'Seattle' ",
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
        "correct": "full_name",
        "options": [
          "full_name",
          "age",
          "city",
          "major"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "HAVING",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "PLUS",
          "OR",
          "AND",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "gpa > 3.50;",
        "options": [
          "gpa > 3.50;",
          "NULL",
          "gpa < 3.50;",
          "status = 'ACTIVE';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Find students who live in Seattle AND maintain a GPA higher than 3.50.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on Students."
  },
  {
    "id": 162,
    "levelDisplay": "Level 62",
    "title": "Level 62: Find Sci-Fi books that are priced under $25.00",
    "subtitle": "Find Sci-Fi books that are priced under $25.00.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.7 Compound AND Logic",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find Sci-Fi books that are priced under $25.00.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, price, stock_qty\nFROM Books\nWHERE genre = 'Sci-Fi' AND price < 25.00;",
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
        "text": ", price, stock_qty\nFROM Books\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " genre = 'Sci-Fi' ",
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
        "correct": "title",
        "options": [
          "genre",
          "title",
          "price",
          "stock_qty"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "PLUS",
          "OR",
          "AND",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "price < 25.00;",
        "options": [
          "status = 'ACTIVE';",
          "0",
          "NULL",
          "price < 25.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find Sci-Fi books that are priced under $25.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on Books."
  },
  {
    "id": 163,
    "levelDisplay": "Level 63",
    "title": "Level 63: Find Engineering employees earning $90,000 or more",
    "subtitle": "Find Engineering employees earning $90,000 or more.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.7 Compound AND Logic",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find Engineering employees earning $90,000 or more.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, department, salary\nFROM Employees\nWHERE department = 'Engineering' AND salary >= 90000.00;",
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
        "text": ", department, salary\nFROM Employees\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " department = 'Engineering' ",
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
        "correct": "first_name",
        "options": [
          "first_name",
          "bonus",
          "emp_id",
          "hire_date"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "HAVING",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "THEN",
          "AND",
          "PLUS",
          "OR"
        ]
      },
      "slot4": {
        "correct": "salary >= 90000.00;",
        "options": [
          "status = 'ACTIVE';",
          "salary <= 90000.00;",
          "salary >!= 90000.00;",
          "salary >= 90000.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Find Engineering employees earning $90,000 or more.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on Employees."
  },
  {
    "id": 164,
    "levelDisplay": "Level 64",
    "title": "Level 64: Find organic grocery items that cost less than $4.00",
    "subtitle": "Find organic grocery items that cost less than $4.00.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.7 Compound AND Logic",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find organic grocery items that cost less than $4.00.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, unit_price, is_organic\nFROM GroceryItems\nWHERE is_organic = TRUE AND unit_price < 4.00;",
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
        "text": ", unit_price, is_organic\nFROM GroceryItems\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " is_organic = TRUE ",
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
        "correct": "item_name",
        "options": [
          "item_id",
          "calories",
          "stock_qty",
          "item_name"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "THEN",
          "AND",
          "PLUS",
          "OR"
        ]
      },
      "slot4": {
        "correct": "unit_price < 4.00;",
        "options": [
          "unit_price < 4.00;",
          "0",
          "NULL",
          "status = 'ACTIVE';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find organic grocery items that cost less than $4.00.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on GroceryItems."
  },
  {
    "id": 165,
    "levelDisplay": "Level 65",
    "title": "Level 65: Find orders with at least 2 items and a discount greate...",
    "subtitle": "Find orders with at least 2 items and a discount greater than 5%.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.7 Compound AND Logic",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find orders with at least 2 items and a discount greater than 5%.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, quantity, discount_pct\nFROM Orders\nWHERE quantity >= 2 AND discount_pct > 0.05;",
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
        "text": ", quantity, discount_pct\nFROM Orders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " quantity >= 2 ",
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
        "correct": "order_id",
        "options": [
          "discount_pct",
          "quantity",
          "order_id",
          "order_status"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "WHEN",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "THEN",
          "OR",
          "AND",
          "PLUS"
        ]
      },
      "slot4": {
        "correct": "discount_pct > 0.05;",
        "options": [
          "discount_pct > 0.05;",
          "status = 'ACTIVE';",
          "discount_pct < 0.05;",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find orders with at least 2 items and a discount greater than 5%.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on Orders."
  },
  {
    "id": 166,
    "levelDisplay": "Level 66",
    "title": "Level 66: Find Synthwave tracks released specifically in the year...",
    "subtitle": "Find Synthwave tracks released specifically in the year 2024.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.7 Compound AND Logic",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find Synthwave tracks released specifically in the year 2024.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, genre, release_year\nFROM MusicTracks\nWHERE genre = 'Synthwave' AND release_year = 2024;",
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
        "text": ", genre, release_year\nFROM MusicTracks\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " genre = 'Synthwave' ",
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
        "correct": "track_title",
        "options": [
          "play_count",
          "genre",
          "track_title",
          "release_year"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "WHERE",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "OR",
          "AND",
          "THEN",
          "PLUS"
        ]
      },
      "slot4": {
        "correct": "release_year = 2024;",
        "options": [
          "release_year = 2024;",
          "NULL",
          "status = 'ACTIVE';",
          "release_year != 2024;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find Synthwave tracks released specifically in the year 2024.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on MusicTracks."
  },
  {
    "id": 167,
    "levelDisplay": "Level 67",
    "title": "Level 67: Find Gold members who have visited at least 15 times th...",
    "subtitle": "Find Gold members who have visited at least 15 times this month.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.7 Compound AND Logic",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find Gold members who have visited at least 15 times this month.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, membership_plan, visits_this_month\nFROM GymMembers\nWHERE membership_plan = 'Gold' AND visits_this_month >= 15;",
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
        "text": ", membership_plan, visits_this_month\nFROM GymMembers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " membership_plan = 'Gold' ",
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
        "correct": "member_name",
        "options": [
          "visits_this_month",
          "joined_date",
          "membership_plan",
          "member_name"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "WHEN",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "THEN",
          "PLUS",
          "AND",
          "OR"
        ]
      },
      "slot4": {
        "correct": "visits_this_month >= 15;",
        "options": [
          "visits_this_month >!= 15;",
          "visits_this_month >= 15;",
          "visits_this_month <= 15;",
          "status = 'ACTIVE';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Find Gold members who have visited at least 15 times this month.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on GymMembers."
  },
  {
    "id": 168,
    "levelDisplay": "Level 68",
    "title": "Level 68: Find top-tier Sci-Fi movies with a star rating of 4.5 o...",
    "subtitle": "Find top-tier Sci-Fi movies with a star rating of 4.5 or higher.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.7 Compound AND Logic",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find top-tier Sci-Fi movies with a star rating of 4.5 or higher.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, genre, star_rating\nFROM MovieReviews\nWHERE genre = 'Sci-Fi' AND star_rating >= 4.5;",
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
        "text": ", genre, star_rating\nFROM MovieReviews\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " genre = 'Sci-Fi' ",
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
        "correct": "movie_title",
        "options": [
          "review_count",
          "director",
          "movie_title",
          "review_id"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "FILTER",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "THEN",
          "OR",
          "PLUS",
          "AND"
        ]
      },
      "slot4": {
        "correct": "star_rating >= 4.5;",
        "options": [
          "star_rating >!= 4.5;",
          "star_rating >= 4.5;",
          "status = 'ACTIVE';",
          "star_rating <= 4.5;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find top-tier Sci-Fi movies with a star rating of 4.5 or higher.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on MovieReviews."
  },
  {
    "id": 169,
    "levelDisplay": "Level 69",
    "title": "Level 69: Find on-time United Airlines flights with 0 minutes delay",
    "subtitle": "Find on-time United Airlines flights with 0 minutes delay.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.7 Compound AND Logic",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find on-time United Airlines flights with 0 minutes delay.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, airline, delay_minutes\nFROM FlightSchedule\nWHERE airline = 'United Airlines' AND delay_minutes = 0;",
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
        "text": ", airline, delay_minutes\nFROM FlightSchedule\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " airline = 'United Airlines' ",
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
        "correct": "flight_id",
        "options": [
          "airline",
          "flight_id",
          "departure_time",
          "ticket_price"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "PLUS",
          "THEN",
          "OR",
          "AND"
        ]
      },
      "slot4": {
        "correct": "delay_minutes = 0;",
        "options": [
          "status = 'ACTIVE';",
          "NULL",
          "delay_minutes != 0;",
          "delay_minutes = 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find on-time United Airlines flights with 0 minutes delay.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on FlightSchedule."
  },
  {
    "id": 170,
    "levelDisplay": "Level 70",
    "title": "Level 70: Find dogs that are confirmed vaccinated",
    "subtitle": "Find dogs that are confirmed vaccinated.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.7 Compound AND Logic",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find dogs that are confirmed vaccinated.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, species, is_vaccinated\nFROM PetClinic\nWHERE species = 'Dog' AND is_vaccinated = TRUE;",
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
        "text": ", species, is_vaccinated\nFROM PetClinic\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " species = 'Dog' ",
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
        "correct": "pet_name",
        "options": [
          "pet_name",
          "is_vaccinated",
          "species",
          "age_years"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "HAVING",
          "WHERE",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "PLUS",
          "THEN",
          "AND",
          "OR"
        ]
      },
      "slot4": {
        "correct": "is_vaccinated = TRUE;",
        "options": [
          "is_vaccinated = TRUE;",
          "NULL",
          "status = 'ACTIVE';",
          "is_vaccinated != TRUE;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find dogs that are confirmed vaccinated.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.7 Compound AND Logic on PetClinic."
  },
  {
    "id": 171,
    "levelDisplay": "Level 71",
    "title": "Level 71: Find students who live in either Chicago OR Austin",
    "subtitle": "Find students who live in either Chicago OR Austin.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.8 Compound OR & Precedence",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find students who live in either Chicago OR Austin.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, city\nFROM Students\nWHERE city = 'Chicago' OR city = 'Austin';",
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
        "text": ", city\nFROM Students\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " city = 'Chicago' ",
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
        "correct": "full_name",
        "options": [
          "gpa",
          "city",
          "full_name",
          "enrolled_year"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "WHEN",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "OR",
        "options": [
          "OR",
          "XOR",
          "AND",
          "NOR"
        ]
      },
      "slot4": {
        "correct": "city = 'Austin';",
        "options": [
          "city = 'Austin';",
          "city != 'Austin';",
          "status = 'ARCHIVED';",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Find students who live in either Chicago OR Austin.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on Students."
  },
  {
    "id": 172,
    "levelDisplay": "Level 72",
    "title": "Level 72: Find Sci-Fi OR Mystery books that are priced under $20 ...",
    "subtitle": "Find Sci-Fi OR Mystery books that are priced under $20 (parentheses mandatory!).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.8 Compound OR & Precedence",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find Sci-Fi OR Mystery books that are priced under $20 (parentheses mandatory!).",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, genre, price\nFROM Books\nWHERE (genre = 'Sci-Fi' OR genre = 'Mystery') AND price < 20.00;",
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
        "text": ", genre, price\nFROM Books\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " (genre = 'Sci-Fi' OR genre = 'Mystery') ",
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
        "correct": "title",
        "options": [
          "author",
          "stock_qty",
          "book_id",
          "title"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "WHERE",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "THEN",
          "AND",
          "OR",
          "PLUS"
        ]
      },
      "slot4": {
        "correct": "price < 20.00;",
        "options": [
          "status = 'ACTIVE';",
          "price < 20.00;",
          "NULL",
          "0"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find Sci-Fi OR Mystery books that are priced under $20 (parentheses mandatory!).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on Books."
  },
  {
    "id": 173,
    "levelDisplay": "Level 73",
    "title": "Level 73: Find Engineering OR Marketing employees who earn over $...",
    "subtitle": "Find Engineering OR Marketing employees who earn over $70,000.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.8 Compound OR & Precedence",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find Engineering OR Marketing employees who earn over $70,000.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, department, salary\nFROM Employees\nWHERE (department = 'Engineering' OR department = 'Marketing') AND salary > 70000.00;",
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
        "text": ", department, salary\nFROM Employees\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " (department = 'Engineering' OR department = 'Marketing') ",
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
        "correct": "first_name",
        "options": [
          "hire_date",
          "department",
          "first_name",
          "last_name"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "WHERE",
          "FILTER"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "OR",
          "THEN",
          "AND",
          "PLUS"
        ]
      },
      "slot4": {
        "correct": "salary > 70000.00;",
        "options": [
          "status = 'ACTIVE';",
          "salary < 70000.00;",
          "NULL",
          "salary > 70000.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Find Engineering OR Marketing employees who earn over $70,000.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on Employees."
  },
  {
    "id": 174,
    "levelDisplay": "Level 74",
    "title": "Level 74: Find Produce OR Bakery items that cost $5.00 or less",
    "subtitle": "Find Produce OR Bakery items that cost $5.00 or less.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.8 Compound OR & Precedence",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find Produce OR Bakery items that cost $5.00 or less.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, category, unit_price\nFROM GroceryItems\nWHERE (category = 'Produce' OR category = 'Bakery') AND unit_price <= 5.00;",
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
        "text": ", category, unit_price\nFROM GroceryItems\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " (category = 'Produce' OR category = 'Bakery') ",
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
        "correct": "item_name",
        "options": [
          "calories",
          "is_organic",
          "item_name",
          "category"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "AND",
          "OR",
          "PLUS",
          "THEN"
        ]
      },
      "slot4": {
        "correct": "unit_price <= 5.00;",
        "options": [
          "status = 'ACTIVE';",
          "unit_price <!= 5.00;",
          "NULL",
          "unit_price <= 5.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Find Produce OR Bakery items that cost $5.00 or less.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on GroceryItems."
  },
  {
    "id": 175,
    "levelDisplay": "Level 75",
    "title": "Level 75: Find unfulfilled orders destined for Denver",
    "subtitle": "Find unfulfilled orders destined for Denver.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.8 Compound OR & Precedence",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Medium",
    "task": "Find unfulfilled orders destined for Denver.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, order_status, shipping_city\nFROM Orders\nWHERE (order_status = 'Processing' OR order_status = 'Pending') AND shipping_city = 'Denver';",
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
        "text": ", order_status, shipping_city\nFROM Orders\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " (order_status = 'Processing' OR order_status = 'Pending') ",
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
        "correct": "order_id",
        "options": [
          "unit_price",
          "order_status",
          "order_id",
          "quantity"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot3": {
        "correct": "AND",
        "options": [
          "OR",
          "THEN",
          "AND",
          "PLUS"
        ]
      },
      "slot4": {
        "correct": "shipping_city = 'Denver';",
        "options": [
          "shipping_city = 'Denver';",
          "status = 'ACTIVE';",
          "shipping_city != 'Denver';",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find unfulfilled orders destined for Denver.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on Orders."
  },
  {
    "id": 176,
    "levelDisplay": "Level 76",
    "title": "Level 76: Find Rock or Synthwave tracks with over 50,000 plays",
    "subtitle": "Find Rock or Synthwave tracks with over 50,000 plays.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.8 Compound OR & Precedence",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find Rock or Synthwave tracks with over 50,000 plays.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, genre, play_count\nFROM MusicTracks\nWHERE (genre = 'Rock' OR genre = 'Synthwave') AND play_count > 50000;",
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
        "text": ", genre, play_count\nFROM ",
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
        "text": " (genre = 'Rock' OR genre = 'Synthwave') ",
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
        "correct": "track_title",
        "options": [
          "track_title",
          "title",
          "duration_seconds",
          "artist_name"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "Employees",
          "FlightSchedule",
          "MusicTracks",
          "Books"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "CASE",
          "FILTER",
          "HAVING",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "PLUS",
          "AND",
          "THEN",
          "OR"
        ]
      },
      "slot5": {
        "correct": "play_count > 50000;",
        "options": [
          "play_count > 50000;",
          "play_count < 50000;",
          "NULL",
          "status = 'ACTIVE';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Find Rock or Synthwave tracks with over 50,000 plays.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on MusicTracks."
  },
  {
    "id": 177,
    "levelDisplay": "Level 77",
    "title": "Level 77: Find premium members (Gold or Platinum) who have a dedi...",
    "subtitle": "Find premium members (Gold or Platinum) who have a dedicated trainer.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.8 Compound OR & Precedence",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find premium members (Gold or Platinum) who have a dedicated trainer.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, membership_plan, has_trainer\nFROM GymMembers\nWHERE (membership_plan = 'Gold' OR membership_plan = 'Platinum') AND has_trainer = TRUE;",
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
        "text": ", membership_plan, has_trainer\nFROM ",
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
        "text": " (membership_plan = 'Gold' OR membership_plan = 'Platinum') ",
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
        "correct": "member_name",
        "options": [
          "has_trainer",
          "monthly_fee",
          "joined_date",
          "member_name"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "GymMembers",
          "PetClinic",
          "GroceryItems",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "CASE",
          "WHERE",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "AND",
          "PLUS",
          "THEN",
          "OR"
        ]
      },
      "slot5": {
        "correct": "has_trainer = TRUE;",
        "options": [
          "status = 'ACTIVE';",
          "NULL",
          "has_trainer = TRUE;",
          "has_trainer != TRUE;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Find premium members (Gold or Platinum) who have a dedicated trainer.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on GymMembers."
  },
  {
    "id": 178,
    "levelDisplay": "Level 78",
    "title": "Level 78: Find top films by either Gerwig or Coppola with 4.0+ stars",
    "subtitle": "Find top films by either Gerwig or Coppola with 4.0+ stars.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.8 Compound OR & Precedence",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find top films by either Gerwig or Coppola with 4.0+ stars.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, director, star_rating\nFROM MovieReviews\nWHERE (director = 'Greta Gerwig' OR director = 'Sofia Coppola') AND star_rating >= 4.0;",
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
        "text": ", director, star_rating\nFROM ",
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
        "text": " (director = 'Greta Gerwig' OR director = 'Sofia Coppola') ",
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
        "correct": "movie_title",
        "options": [
          "genre",
          "director",
          "review_count",
          "movie_title"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "MovieReviews",
          "FlightSchedule",
          "GymMembers",
          "Books"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "CASE"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "PLUS",
          "AND",
          "OR",
          "THEN"
        ]
      },
      "slot5": {
        "correct": "star_rating >= 4.0;",
        "options": [
          "star_rating >= 4.0;",
          "star_rating >!= 4.0;",
          "star_rating <= 4.0;",
          "status = 'ACTIVE';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Find top films by either Gerwig or Coppola with 4.0+ stars.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on MovieReviews."
  },
  {
    "id": 179,
    "levelDisplay": "Level 79",
    "title": "Level 79: Find Chicago flights (ORD or MDW) flying to Los Angeles...",
    "subtitle": "Find Chicago flights (ORD or MDW) flying to Los Angeles (LAX).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.8 Compound OR & Precedence",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find Chicago flights (ORD or MDW) flying to Los Angeles (LAX).",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, origin_airport, dest_airport\nFROM FlightSchedule\nWHERE (origin_airport = 'ORD' OR origin_airport = 'MDW') AND dest_airport = 'LAX';",
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
        "text": ", origin_airport, dest_airport\nFROM ",
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
        "text": " (origin_airport = 'ORD' OR origin_airport = 'MDW') ",
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
        "correct": "flight_id",
        "options": [
          "flight_id",
          "destination_airport",
          "airline",
          "delay_minutes"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "Employees",
          "Orders",
          "GymMembers",
          "FlightSchedule"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "CASE",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "PLUS",
          "AND",
          "THEN",
          "OR"
        ]
      },
      "slot5": {
        "correct": "dest_airport = 'LAX';",
        "options": [
          "status = 'ACTIVE';",
          "dest_airport = 'LAX';",
          "dest_airport != 'LAX';",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find Chicago flights (ORD or MDW) flying to Los Angeles (LAX).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on FlightSchedule."
  },
  {
    "id": 180,
    "levelDisplay": "Level 80",
    "title": "Level 80: Find young puppies or kittens under 2 years of age",
    "subtitle": "Find young puppies or kittens under 2 years of age.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.8 Compound OR & Precedence",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find young puppies or kittens under 2 years of age.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, species, age_years\nFROM PetClinic\nWHERE (species = 'Dog' OR species = 'Cat') AND age_years < 2;",
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
        "text": ", species, age_years\nFROM ",
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
        "text": " (species = 'Dog' OR species = 'Cat') ",
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
        "correct": "pet_name",
        "options": [
          "pet_id",
          "breed",
          "is_vaccinated",
          "pet_name"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "Orders",
          "PetClinic",
          "Students",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "HAVING",
          "WHERE",
          "CASE"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "AND",
          "PLUS",
          "OR",
          "THEN"
        ]
      },
      "slot5": {
        "correct": "age_years < 2;",
        "options": [
          "0",
          "NULL",
          "status = 'ACTIVE';",
          "age_years < 2;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find young puppies or kittens under 2 years of age.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.8 Compound OR & Precedence on PetClinic."
  },
  {
    "id": 181,
    "levelDisplay": "Level 81",
    "title": "Level 81: Find all employees who did not receive an annual bonus ...",
    "subtitle": "Find all employees who did not receive an annual bonus (bonus IS NULL).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.9 3VL & NULL Handling",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find all employees who did not receive an annual bonus (bonus IS NULL).",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, bonus\nFROM Employees\nWHERE bonus IS NULL;",
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
        "text": ", bonus\nFROM ",
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
        "correct": "first_name",
        "options": [
          "salary",
          "first_name",
          "emp_id",
          "hire_date"
        ]
      },
      "slot2": {
        "correct": "Employees",
        "options": [
          "Employees",
          "MovieReviews",
          "Orders",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "WHEN"
        ]
      },
      "slot4": {
        "correct": "bonus IS NULL;",
        "options": [
          "status = 'ACTIVE';",
          "id > 0;",
          "gpa >= 3.0;",
          "bonus IS NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Find all employees who did not receive an annual bonus (bonus IS NULL).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on Employees."
  },
  {
    "id": 182,
    "levelDisplay": "Level 82",
    "title": "Level 82: Find all employees who have a recorded bonus",
    "subtitle": "Find all employees who have a recorded bonus.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.9 3VL & NULL Handling",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find all employees who have a recorded bonus.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, bonus\nFROM Employees\nWHERE bonus IS NOT NULL;",
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
        "text": ", bonus\nFROM ",
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
        "correct": "first_name",
        "options": [
          "salary",
          "bonus",
          "first_name",
          "emp_id"
        ]
      },
      "slot2": {
        "correct": "Employees",
        "options": [
          "Students",
          "PetClinic",
          "Books",
          "Employees"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "bonus IS NOT NULL;",
        "options": [
          "gpa >= 3.0;",
          "status = 'ACTIVE';",
          "id > 0;",
          "bonus IS NOT NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Find all employees who have a recorded bonus.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on Employees."
  },
  {
    "id": 183,
    "levelDisplay": "Level 83",
    "title": "Level 83: Find in-stock books where inventory quantity is verifie...",
    "subtitle": "Find in-stock books where inventory quantity is verified not null and positive.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.9 3VL & NULL Handling",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find in-stock books where inventory quantity is verified not null and positive.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, stock_qty\nFROM Books\nWHERE stock_qty IS NOT NULL AND stock_qty > 0;",
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
        "text": ", stock_qty\nFROM ",
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
      },
      {
        "text": " AND ",
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
        "correct": "title",
        "options": [
          "published_year",
          "title",
          "price",
          "author"
        ]
      },
      "slot2": {
        "correct": "Books",
        "options": [
          "Students",
          "MusicTracks",
          "PetClinic",
          "Books"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot4": {
        "correct": "stock_qty IS NOT NULL",
        "options": [
          "NULL",
          "id > 0",
          "stock_qty IS NOT NULL",
          "0"
        ]
      },
      "slot5": {
        "correct": "stock_qty > 0;",
        "options": [
          "NULL",
          "1=1;",
          "status = 'ACTIVE';",
          "stock_qty > 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Find in-stock books where inventory quantity is verified not null and positive.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on Books."
  },
  {
    "id": 184,
    "levelDisplay": "Level 84",
    "title": "Level 84: Find students who have completed their coursework and h...",
    "subtitle": "Find students who have completed their coursework and have a recorded GPA.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.9 3VL & NULL Handling",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find students who have completed their coursework and have a recorded GPA.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nWHERE gpa IS NOT NULL;",
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
        "text": ", gpa\nFROM ",
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
        "correct": "full_name",
        "options": [
          "first_name",
          "full_name",
          "age",
          "city"
        ]
      },
      "slot2": {
        "correct": "Students",
        "options": [
          "Students",
          "GroceryItems",
          "Employees",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "FILTER",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "gpa IS NOT NULL;",
        "options": [
          "gpa >= 3.0;",
          "id > 0;",
          "status = 'ACTIVE';",
          "gpa IS NOT NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Find students who have completed their coursework and have a recorded GPA.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on Students."
  },
  {
    "id": 185,
    "levelDisplay": "Level 85",
    "title": "Level 85: Find orders that received no discount",
    "subtitle": "Find orders that received no discount.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.9 3VL & NULL Handling",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find orders that received no discount.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, discount_pct\nFROM Orders\nWHERE discount_pct IS NULL OR discount_pct = 0.00;",
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
        "text": ", discount_pct\nFROM ",
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
      },
      {
        "text": " OR ",
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
        "correct": "order_id",
        "options": [
          "product_name",
          "shipping_city",
          "order_id",
          "unit_price"
        ]
      },
      "slot2": {
        "correct": "Orders",
        "options": [
          "GroceryItems",
          "Orders",
          "Students",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "WHERE",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "discount_pct IS NULL",
        "options": [
          "id > 0",
          "NULL",
          "discount_pct IS NULL",
          "0"
        ]
      },
      "slot5": {
        "correct": "discount_pct = 0.00;",
        "options": [
          "discount_pct = 0.00;",
          "1=1;",
          "status = 'ACTIVE';",
          "discount_pct != 0.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Find orders that received no discount.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on Orders."
  },
  {
    "id": 186,
    "levelDisplay": "Level 86",
    "title": "Level 86: Find pet records where the specific breed is documented",
    "subtitle": "Find pet records where the specific breed is documented.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.9 3VL & NULL Handling",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find pet records where the specific breed is documented.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, breed\nFROM PetClinic\nWHERE breed IS NOT NULL;",
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
        "text": ", breed\nFROM ",
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
        "correct": "pet_name",
        "options": [
          "breed",
          "pet_name",
          "weight_kg",
          "species"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "FlightSchedule",
          "Orders",
          "GymMembers",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "FILTER",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "breed IS NOT NULL;",
        "options": [
          "breed IS NOT NULL;",
          "status = 'ACTIVE';",
          "gpa >= 3.0;",
          "id > 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Find pet records where the specific breed is documented.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on PetClinic."
  },
  {
    "id": 187,
    "levelDisplay": "Level 87",
    "title": "Level 87: Find flights confirmed on-time",
    "subtitle": "Find flights confirmed on-time.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.9 3VL & NULL Handling",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find flights confirmed on-time.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nWHERE delay_minutes IS NOT NULL AND delay_minutes = 0;",
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
        "text": ", delay_minutes\nFROM ",
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
      },
      {
        "text": " AND ",
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
        "correct": "flight_id",
        "options": [
          "airline",
          "origin_airport",
          "flight_id",
          "dest_airport"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "MusicTracks",
          "FlightSchedule",
          "Books",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "HAVING",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "delay_minutes IS NOT NULL",
        "options": [
          "0",
          "id > 0",
          "delay_minutes IS NOT NULL",
          "NULL"
        ]
      },
      "slot5": {
        "correct": "delay_minutes = 0;",
        "options": [
          "status = 'ACTIVE';",
          "delay_minutes = 0;",
          "1=1;",
          "delay_minutes != 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Find flights confirmed on-time.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on FlightSchedule."
  },
  {
    "id": 188,
    "levelDisplay": "Level 88",
    "title": "Level 88: Find inactive members with zero visits logged",
    "subtitle": "Find inactive members with zero visits logged.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.9 3VL & NULL Handling",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Find inactive members with zero visits logged.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, visits_this_month\nFROM GymMembers\nWHERE visits_this_month IS NOT NULL AND visits_this_month = 0;",
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
        "text": ", visits_this_month\nFROM ",
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
      },
      {
        "text": " AND ",
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
        "correct": "member_name",
        "options": [
          "member_id",
          "has_trainer",
          "member_name",
          "membership_plan"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "MovieReviews",
          "GymMembers",
          "FlightSchedule",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "HAVING",
          "WHEN",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "visits_this_month IS NOT NULL",
        "options": [
          "id > 0",
          "visits_this_month IS NOT NULL",
          "NULL",
          "0"
        ]
      },
      "slot5": {
        "correct": "visits_this_month = 0;",
        "options": [
          "1=1;",
          "status = 'ACTIVE';",
          "visits_this_month != 0;",
          "visits_this_month = 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Find inactive members with zero visits logged.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on GymMembers."
  },
  {
    "id": 189,
    "levelDisplay": "Level 89",
    "title": "Level 89: Verify items with valid non-null prices",
    "subtitle": "Verify items with valid non-null prices.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.9 3VL & NULL Handling",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Verify items with valid non-null prices.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nWHERE unit_price IS NOT NULL AND unit_price > 0.00;",
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
        "text": ", unit_price\nFROM ",
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
      },
      {
        "text": " AND ",
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
        "correct": "item_name",
        "options": [
          "category",
          "item_id",
          "item_name",
          "unit_price"
        ]
      },
      "slot2": {
        "correct": "GroceryItems",
        "options": [
          "GymMembers",
          "GroceryItems",
          "Orders",
          "Books"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "FILTER",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "unit_price IS NOT NULL",
        "options": [
          "id > 0",
          "NULL",
          "0",
          "unit_price IS NOT NULL"
        ]
      },
      "slot5": {
        "correct": "unit_price > 0.00;",
        "options": [
          "1=1;",
          "unit_price > 0.00;",
          "status = 'ACTIVE';",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Verify items with valid non-null prices.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on GroceryItems."
  },
  {
    "id": 190,
    "levelDisplay": "Level 90",
    "title": "Level 90: Select tracks with verified play metrics",
    "subtitle": "Select tracks with verified play metrics.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.9 3VL & NULL Handling",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Select tracks with verified play metrics.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, play_count\nFROM MusicTracks\nWHERE play_count IS NOT NULL AND play_count >= 0;",
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
        "text": ", play_count\nFROM ",
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
      },
      {
        "text": " AND ",
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
        "correct": "track_title",
        "options": [
          "title",
          "release_year",
          "track_title",
          "duration_seconds"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "MusicTracks",
          "Orders",
          "MovieReviews",
          "Books"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "HAVING"
        ]
      },
      "slot4": {
        "correct": "play_count IS NOT NULL",
        "options": [
          "NULL",
          "id > 0",
          "play_count IS NOT NULL",
          "0"
        ]
      },
      "slot5": {
        "correct": "play_count >= 0;",
        "options": [
          "1=1;",
          "play_count >= 0;",
          "play_count >!= 0;",
          "status = 'ACTIVE';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Select tracks with verified play metrics.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.9 3VL & NULL Handling on MusicTracks."
  },
  {
    "id": 191,
    "levelDisplay": "Level 91",
    "title": "Level 91: Fix the illegal NULL comparison: 'WHERE bonus = NULL;' ...",
    "subtitle": "Fix the illegal NULL comparison: 'WHERE bonus = NULL;' (evaluates to UNKNOWN and returns 0 rows).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix the illegal NULL comparison: 'WHERE bonus = NULL;' (evaluates to UNKNOWN and returns 0 rows).",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, bonus\nFROM Employees\nWHERE bonus IS NULL;",
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
        "text": ", bonus\nFROM ",
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
        "correct": "first_name",
        "options": [
          "first_name",
          "hire_date",
          "bonus",
          "last_name"
        ]
      },
      "slot2": {
        "correct": "Employees",
        "options": [
          "Students",
          "GroceryItems",
          "Employees",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "WHERE",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "bonus IS NULL;",
        "options": [
          "gpa >= 3.0;",
          "bonus IS NULL;",
          "status = 'ACTIVE';",
          "id > 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Employees: Fix the illegal NULL comparison: 'WHERE bonus = NULL;' (evaluates to UNKNOWN and returns 0 rows).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on Employees."
  },
  {
    "id": 192,
    "levelDisplay": "Level 92",
    "title": "Level 92: Fix operator precedence bug by adding parentheses aroun...",
    "subtitle": "Fix operator precedence bug by adding parentheses around OR conditions.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix operator precedence bug by adding parentheses around OR conditions.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, city, gpa\nFROM Students\nWHERE (city = 'Chicago' OR city = 'Seattle') AND gpa > 3.50;",
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
        "text": ", city, gpa\nFROM ",
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
        "text": " (city = 'Chicago' OR city = 'Seattle') ",
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
        "correct": "full_name",
        "options": [
          "full_name",
          "last_name",
          "first_name",
          "major"
        ]
      },
      "slot2": {
        "correct": "Students",
        "options": [
          "Employees",
          "Books",
          "Students",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "FILTER",
          "CASE"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "THEN",
          "OR",
          "AND",
          "PLUS"
        ]
      },
      "slot5": {
        "correct": "gpa > 3.50;",
        "options": [
          "gpa < 3.50;",
          "gpa > 3.50;",
          "NULL",
          "status = 'ACTIVE';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Students: Fix operator precedence bug by adding parentheses around OR conditions.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on Students."
  },
  {
    "id": 193,
    "levelDisplay": "Level 93",
    "title": "Level 93: Fix incorrect range syntax: 'WHERE price BETWEEN 10.00,...",
    "subtitle": "Fix incorrect range syntax: 'WHERE price BETWEEN 10.00, 25.00;' (BETWEEN uses AND, not comma).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix incorrect range syntax: 'WHERE price BETWEEN 10.00, 25.00;' (BETWEEN uses AND, not comma).",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, price\nFROM Books\nWHERE price BETWEEN 10.00 AND 25.00;",
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
        "text": ", price\nFROM ",
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
      },
      {
        "text": " AND ",
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
        "correct": "title",
        "options": [
          "price",
          "author",
          "title",
          "is_hardcover"
        ]
      },
      "slot2": {
        "correct": "Books",
        "options": [
          "PetClinic",
          "GroceryItems",
          "Employees",
          "Books"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "WHEN",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "price BETWEEN 10.00",
        "options": [
          "price BETWEEN 10.00",
          "NULL",
          "0",
          "id > 0"
        ]
      },
      "slot5": {
        "correct": "25.00;",
        "options": [
          "status = 'ACTIVE';",
          "NULL",
          "25.00;",
          "1=1;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Books: Fix incorrect range syntax: 'WHERE price BETWEEN 10.00, 25.00;' (BETWEEN uses AND, not comma).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on Books."
  },
  {
    "id": 194,
    "levelDisplay": "Level 94",
    "title": "Level 94: Fix syntax error: 'WHERE category IN Produce, Bakery;' ...",
    "subtitle": "Fix syntax error: 'WHERE category IN Produce, Bakery;' (values in IN must be wrapped in parentheses).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix syntax error: 'WHERE category IN Produce, Bakery;' (values in IN must be wrapped in parentheses).",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, category\nFROM GroceryItems\nWHERE category IN ('Produce', 'Bakery');",
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
        "text": ", category\nFROM ",
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
        "correct": "item_name",
        "options": [
          "is_organic",
          "item_id",
          "item_name",
          "category"
        ]
      },
      "slot2": {
        "correct": "GroceryItems",
        "options": [
          "GroceryItems",
          "Employees",
          "MusicTracks",
          "GymMembers"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "WHEN",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "category",
        "options": [
          "item_id",
          "calories",
          "category",
          "unit_price"
        ]
      },
      "slot5": {
        "correct": "IN ('Produce', 'Bakery');",
        "options": [
          "IN ('Produce', 'Bakery');",
          "= 'Active';",
          "> 100;",
          "IS NOT NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GroceryItems: Fix syntax error: 'WHERE category IN Produce, Bakery;' (values in IN must be wrapped in parentheses).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on GroceryItems."
  },
  {
    "id": 195,
    "levelDisplay": "Level 95",
    "title": "Level 95: Fix unquoted string identifier: \"WHERE shipping_city = ...",
    "subtitle": "Fix unquoted string identifier: \"WHERE shipping_city = Denver;\" (looks for column named Denver instead of text).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix unquoted string identifier: \"WHERE shipping_city = Denver;\" (looks for column named Denver instead of text).",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, shipping_city\nFROM Orders\nWHERE shipping_city = 'Denver';",
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
        "text": ", shipping_city\nFROM ",
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
        "correct": "order_id",
        "options": [
          "unit_price",
          "quantity",
          "order_id",
          "product_name"
        ]
      },
      "slot2": {
        "correct": "Orders",
        "options": [
          "Orders",
          "GymMembers",
          "Students",
          "Employees"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHEN",
          "HAVING",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "shipping_city = 'Denver';",
        "options": [
          "id > 0;",
          "shipping_city = 'Denver';",
          "gpa >= 3.0;",
          "status = 'ACTIVE';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on Orders: Fix unquoted string identifier: \"WHERE shipping_city = Denver;\" (looks for column named Denver instead of text).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on Orders."
  },
  {
    "id": 196,
    "levelDisplay": "Level 96",
    "title": "Level 96: Fix assignment syntax: 'WHERE genre = Rock%' (pattern m...",
    "subtitle": "Fix assignment syntax: 'WHERE genre = Rock%' (pattern matching requires LIKE, not =).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix assignment syntax: 'WHERE genre = Rock%' (pattern matching requires LIKE, not =).",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, genre\nFROM MusicTracks\nWHERE genre LIKE 'Rock%';",
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
        "text": ", genre\nFROM ",
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
        "correct": "track_title",
        "options": [
          "track_title",
          "release_year",
          "track_id",
          "genre"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "GroceryItems",
          "GymMembers",
          "MusicTracks",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "WHERE",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "genre LIKE 'Rock%';",
        "options": [
          "gpa >= 3.0;",
          "id > 0;",
          "status = 'ACTIVE';",
          "genre LIKE 'Rock%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MusicTracks: Fix assignment syntax: 'WHERE genre = Rock%' (pattern matching requires LIKE, not =).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on MusicTracks."
  },
  {
    "id": 197,
    "levelDisplay": "Level 97",
    "title": "Level 97: Fix missing second column comparison: 'WHERE monthly_fe...",
    "subtitle": "Fix missing second column comparison: 'WHERE monthly_fee >= 30.00 AND <= 70.00;'.",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix missing second column comparison: 'WHERE monthly_fee >= 30.00 AND <= 70.00;'.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, monthly_fee\nFROM GymMembers\nWHERE monthly_fee >= 30.00 AND monthly_fee <= 70.00;",
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
        "text": ", monthly_fee\nFROM ",
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
      },
      {
        "text": " AND ",
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
        "correct": "member_name",
        "options": [
          "monthly_fee",
          "member_id",
          "member_name",
          "membership_plan"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "Employees",
          "PetClinic",
          "GymMembers",
          "GroceryItems"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "monthly_fee >= 30.00",
        "options": [
          "monthly_fee <= 30.00",
          "monthly_fee >= 30.00",
          "id > 0",
          "monthly_fee >!= 30.00"
        ]
      },
      "slot5": {
        "correct": "monthly_fee <= 70.00;",
        "options": [
          "monthly_fee <!= 70.00;",
          "monthly_fee <= 70.00;",
          "status = 'ACTIVE';",
          "1=1;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on GymMembers: Fix missing second column comparison: 'WHERE monthly_fee >= 30.00 AND <= 70.00;'.",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on GymMembers."
  },
  {
    "id": 198,
    "levelDisplay": "Level 98",
    "title": "Level 98: Fix quoted numeric literal: \"WHERE star_rating > '4.0';...",
    "subtitle": "Fix quoted numeric literal: \"WHERE star_rating > '4.0';\" (numeric comparisons should avoid string quotes).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix quoted numeric literal: \"WHERE star_rating > '4.0';\" (numeric comparisons should avoid string quotes).",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nWHERE star_rating > 4.0;",
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
        "text": ", star_rating\nFROM ",
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
        "correct": "movie_title",
        "options": [
          "review_count",
          "director",
          "genre",
          "movie_title"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "MusicTracks",
          "GroceryItems",
          "GymMembers",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "WHERE",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "star_rating > 4.0;",
        "options": [
          "star_rating > 4.0;",
          "status = 'ACTIVE';",
          "id > 0;",
          "gpa >= 3.0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on MovieReviews: Fix quoted numeric literal: \"WHERE star_rating > '4.0';\" (numeric comparisons should avoid string quotes).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on MovieReviews."
  },
  {
    "id": 199,
    "levelDisplay": "Level 99",
    "title": "Level 99: Fix exclamation mark placement: 'WHERE delay_minutes =!...",
    "subtitle": "Fix exclamation mark placement: 'WHERE delay_minutes =! 0;' (must be != or <>).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix exclamation mark placement: 'WHERE delay_minutes =! 0;' (must be != or <>).",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nWHERE delay_minutes != 0;",
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
        "text": ", delay_minutes\nFROM ",
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
        "correct": "flight_id",
        "options": [
          "delay_minutes",
          "departure_time",
          "destination_airport",
          "flight_id"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "Students",
          "FlightSchedule",
          "Employees",
          "Books"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "FILTER",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "delay_minutes != 0;",
        "options": [
          "delay_minutes != 0;",
          "id > 0;",
          "status = 'ACTIVE';",
          "gpa >= 3.0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on FlightSchedule: Fix exclamation mark placement: 'WHERE delay_minutes =! 0;' (must be != or <>).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on FlightSchedule."
  },
  {
    "id": 200,
    "levelDisplay": "Level 100",
    "title": "Level 100: Fix shorthand OR trap: \"WHERE species = 'Cat' OR 'Dog';...",
    "subtitle": "Fix shorthand OR trap: \"WHERE species = 'Cat' OR 'Dog';\" (each side of OR requires a full boolean test).",
    "type": "fill_blank",
    "category": "Section 02: WHERE Predicates & Filtering",
    "subcluster": "2.10 Multi-Condition Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Hard",
    "task": "Fix shorthand OR trap: \"WHERE species = 'Cat' OR 'Dog';\" (each side of OR requires a full boolean test).",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, species\nFROM PetClinic\nWHERE species = 'Cat' OR species = 'Dog';",
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
        "text": ", species\nFROM ",
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
      },
      {
        "text": " OR ",
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
        "correct": "pet_name",
        "options": [
          "species",
          "is_vaccinated",
          "pet_id",
          "pet_name"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "Orders",
          "Students",
          "MovieReviews",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "species = 'Cat'",
        "options": [
          "id > 0",
          "species != 'Cat'",
          "NULL",
          "species = 'Cat'"
        ]
      },
      "slot5": {
        "correct": "species = 'Dog';",
        "options": [
          "status = 'ACTIVE';",
          "species != 'Dog';",
          "1=1;",
          "species = 'Dog';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "explanation": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL. 💡 Trap to avoid: Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Fix shorthand OR trap: \"WHERE species = 'Cat' OR 'Dog';\" (each side of OR requires a full boolean test).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on PetClinic."
  }
];
