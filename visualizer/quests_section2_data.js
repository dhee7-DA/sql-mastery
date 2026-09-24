// =============================================================================
// SECTION 02: WHERE PREDICATES & FILTERING (100 INTERACTIVE MULTI-BLANK QUESTS)
// Progressive 3-to-5 Blank Challenge Engine with Tiered Difficulty
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
        "text": "SELECT full_name, city\nFROM Students\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "city",
        "options": [
          "full_name",
          "first_name",
          "last_name",
          "city"
        ]
      },
      "slot3": {
        "correct": "= 'Seattle';",
        "options": [
          "NULL",
          "= 'Seattle';",
          "LIKE 'Seattle';",
          "!= 'Seattle';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT title, author, genre\nFROM Books\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "HAVING",
          "WHEN",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "genre",
        "options": [
          "is_hardcover",
          "title",
          "book_id",
          "genre"
        ]
      },
      "slot3": {
        "correct": "= 'Sci-Fi';",
        "options": [
          "NULL",
          "!= 'Sci-Fi';",
          "= 'Sci-Fi';",
          "LIKE 'Sci-Fi';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT first_name, department, salary\nFROM Employees\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "department",
        "options": [
          "last_name",
          "bonus",
          "salary",
          "department"
        ]
      },
      "slot3": {
        "correct": "= 'Engineering';",
        "options": [
          "LIKE 'Engineering';",
          "NULL",
          "!= 'Engineering';",
          "= 'Engineering';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT item_name, unit_price\nFROM GroceryItems\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "HAVING",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "is_organic",
        "options": [
          "item_name",
          "unit_price",
          "is_organic",
          "calories"
        ]
      },
      "slot3": {
        "correct": "= TRUE;",
        "options": [
          "= TRUE;",
          "!= TRUE;",
          "NULL",
          "LIKE TRUE;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT order_id, customer_name, order_status\nFROM Orders\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "FILTER",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "order_status",
        "options": [
          "product_name",
          "customer_name",
          "unit_price",
          "order_status"
        ]
      },
      "slot3": {
        "correct": "= 'Shipped';",
        "options": [
          "LIKE 'Shipped';",
          "= 'Shipped';",
          "NULL",
          "!= 'Shipped';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, artist_name\nFROM MusicTracks\nWHERE artist_name = 'Luna Waves';",
    "template": [
      {
        "text": "SELECT track_title, artist_name\nFROM MusicTracks\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "artist_name",
        "options": [
          "artist_name",
          "genre",
          "track_title",
          "track_id"
        ]
      },
      "slot3": {
        "correct": "= 'Luna Waves';",
        "options": [
          "= 'Luna Waves';",
          "LIKE 'Luna Waves';",
          "!= 'Luna Waves';",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT member_name, membership_plan\nFROM GymMembers\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "HAVING",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "membership_plan",
        "options": [
          "membership_plan",
          "member_id",
          "monthly_fee",
          "joined_date"
        ]
      },
      "slot3": {
        "correct": "= 'Gold';",
        "options": [
          "!= 'Gold';",
          "NULL",
          "LIKE 'Gold';",
          "= 'Gold';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT movie_title, director\nFROM MovieReviews\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "WHERE",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "director",
        "options": [
          "genre",
          "director",
          "movie_title",
          "review_id"
        ]
      },
      "slot3": {
        "correct": "= 'Christopher Nolan';",
        "options": [
          "LIKE 'Christopher Nolan';",
          "NULL",
          "= 'Christopher Nolan';",
          "!= 'Christopher Nolan';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT flight_id, dest_airport\nFROM FlightSchedule\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "WHEN",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "dest_airport",
        "options": [
          "flight_id",
          "dest_airport",
          "airline",
          "departure_time"
        ]
      },
      "slot3": {
        "correct": "= 'LAX';",
        "options": [
          "NULL",
          "LIKE 'LAX';",
          "!= 'LAX';",
          "= 'LAX';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT pet_name, species\nFROM PetClinic\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "FILTER",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "species",
        "options": [
          "pet_id",
          "pet_name",
          "breed",
          "species"
        ]
      },
      "slot3": {
        "correct": "!= 'Dog';",
        "options": [
          "LIKE 'Dog';",
          "!= 'Dog';",
          "NULL",
          "= 'Dog';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT full_name, gpa\nFROM Students\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "gpa",
        "options": [
          "enrolled_year",
          "city",
          "age",
          "gpa"
        ]
      },
      "slot3": {
        "correct": ">= 3.50;",
        "options": [
          "LIKE 3.50;",
          "!= 3.50;",
          "= 3.50;",
          ">= 3.50;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT title, price\nFROM Books\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "HAVING",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "price",
        "options": [
          "book_id",
          "price",
          "genre",
          "author"
        ]
      },
      "slot3": {
        "correct": "< 20.00;",
        "options": [
          "!= 20.00;",
          "< 20.00;",
          "= 20.00;",
          "LIKE 20.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT first_name, salary\nFROM Employees\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHEN",
          "HAVING",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "salary",
        "options": [
          "salary",
          "hire_date",
          "emp_id",
          "first_name"
        ]
      },
      "slot3": {
        "correct": "> 80000.00;",
        "options": [
          "> 80000.00;",
          "LIKE 80000.00;",
          "!= 80000.00;",
          "= 80000.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT item_name, calories\nFROM GroceryItems\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "WHEN",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "calories",
        "options": [
          "calories",
          "is_organic",
          "item_name",
          "category"
        ]
      },
      "slot3": {
        "correct": "<= 100;",
        "options": [
          "!= 100;",
          "LIKE 100;",
          "<= 100;",
          "= 100;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT order_id, quantity\nFROM Orders\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "quantity",
        "options": [
          "quantity",
          "product_name",
          "order_status",
          "order_id"
        ]
      },
      "slot3": {
        "correct": ">= 3;",
        "options": [
          ">= 3;",
          "LIKE 3;",
          "!= 3;",
          "= 3;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, play_count\nFROM MusicTracks\nWHERE play_count > 100000;",
    "template": [
      {
        "text": "SELECT track_title, play_count\nFROM MusicTracks\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "FILTER",
          "HAVING",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "play_count",
        "options": [
          "play_count",
          "duration_seconds",
          "artist",
          "track_id"
        ]
      },
      "slot3": {
        "correct": "> 100000;",
        "options": [
          "= 100000;",
          "> 100000;",
          "LIKE 100000;",
          "!= 100000;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT member_name, visits_this_month\nFROM GymMembers\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "visits_this_month",
        "options": [
          "visits_this_month",
          "member_name",
          "has_trainer",
          "member_id"
        ]
      },
      "slot3": {
        "correct": "> 10;",
        "options": [
          "!= 10;",
          "> 10;",
          "= 10;",
          "LIKE 10;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT movie_title, star_rating\nFROM MovieReviews\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "FILTER",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "star_rating",
        "options": [
          "genre",
          "movie_title",
          "star_rating",
          "review_count"
        ]
      },
      "slot3": {
        "correct": ">= 4.5;",
        "options": [
          "!= 4.5;",
          "LIKE 4.5;",
          ">= 4.5;",
          "= 4.5;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "FILTER",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "delay_minutes",
        "options": [
          "airline",
          "flight_id",
          "dest_airport",
          "delay_minutes"
        ]
      },
      "slot3": {
        "correct": "> 30;",
        "options": [
          "LIKE 30;",
          "> 30;",
          "!= 30;",
          "= 30;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT pet_name, weight_kg\nFROM PetClinic\n",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHEN",
          "WHERE",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "weight_kg",
        "options": [
          "species",
          "age_years",
          "weight_kg",
          "is_vaccinated"
        ]
      },
      "slot3": {
        "correct": "> 20.0;",
        "options": [
          "= 20.0;",
          "!= 20.0;",
          "LIKE 20.0;",
          "> 20.0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT full_name, age\nFROM Students\n",
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
        "text": " 18 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " 22;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "ON",
          "WHERE",
          "WHEN",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "age",
        "options": [
          "last_name",
          "age",
          "full_name",
          "city"
        ]
      },
      "slot3": {
        "correct": "BETWEEN",
        "options": [
          "WITHIN",
          "IN",
          "BETWEEN",
          "RANGE"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "THROUGH",
          "AND",
          "OR",
          "TO"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT title, price\nFROM Books\n",
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
        "text": " 15.00 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " 30.00;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "ON",
          "WHEN",
          "HAVING",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "price",
        "options": [
          "genre",
          "is_hardcover",
          "stock_qty",
          "price"
        ]
      },
      "slot3": {
        "correct": "BETWEEN",
        "options": [
          "RANGE",
          "IN",
          "WITHIN",
          "BETWEEN"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "OR",
          "THROUGH",
          "AND",
          "TO"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT first_name, salary\nFROM Employees\n",
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
        "text": " 60000.00 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " 90000.00;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "ON",
          "HAVING",
          "WHERE",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "salary",
        "options": [
          "last_name",
          "hire_date",
          "salary",
          "department"
        ]
      },
      "slot3": {
        "correct": "BETWEEN",
        "options": [
          "BETWEEN",
          "WITHIN",
          "IN",
          "RANGE"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "THROUGH",
          "TO",
          "OR",
          "AND"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT item_name, unit_price\nFROM GroceryItems\n",
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
        "text": " 2.00 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " 5.00;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "ON",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "unit_price",
        "options": [
          "stock_qty",
          "category",
          "unit_price",
          "item_name"
        ]
      },
      "slot3": {
        "correct": "BETWEEN",
        "options": [
          "RANGE",
          "WITHIN",
          "BETWEEN",
          "IN"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "OR",
          "TO",
          "THROUGH",
          "AND"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT order_id, unit_price\nFROM Orders\n",
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
        "text": " 25.00 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " 100.00;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "ON",
          "WHERE",
          "WHEN",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "unit_price",
        "options": [
          "order_status",
          "unit_price",
          "customer_name",
          "product_name"
        ]
      },
      "slot3": {
        "correct": "BETWEEN",
        "options": [
          "IN",
          "RANGE",
          "BETWEEN",
          "WITHIN"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "AND",
          "THROUGH",
          "OR",
          "TO"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, duration_seconds\nFROM MusicTracks\nWHERE duration_seconds BETWEEN 180 AND 240;",
    "template": [
      {
        "text": "SELECT track_title, duration_seconds\nFROM MusicTracks\n",
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
        "text": " 180 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " 240;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "WHERE",
          "ON",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "duration_seconds",
        "options": [
          "track_title",
          "artist",
          "play_count",
          "duration_seconds"
        ]
      },
      "slot3": {
        "correct": "BETWEEN",
        "options": [
          "IN",
          "RANGE",
          "WITHIN",
          "BETWEEN"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "OR",
          "AND",
          "THROUGH",
          "TO"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT member_name, monthly_fee\nFROM GymMembers\n",
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
        "text": " 25.00 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " 75.00;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "ON",
          "WHEN"
        ]
      },
      "slot2": {
        "correct": "monthly_fee",
        "options": [
          "member_name",
          "member_id",
          "membership_plan",
          "monthly_fee"
        ]
      },
      "slot3": {
        "correct": "BETWEEN",
        "options": [
          "WITHIN",
          "BETWEEN",
          "RANGE",
          "IN"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "OR",
          "TO",
          "AND",
          "THROUGH"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT movie_title, release_year\nFROM MovieReviews\n",
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
        "text": " 2020 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " 2023;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "ON",
          "WHERE",
          "WHEN",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "release_year",
        "options": [
          "review_count",
          "star_rating",
          "release_year",
          "genre"
        ]
      },
      "slot3": {
        "correct": "BETWEEN",
        "options": [
          "BETWEEN",
          "RANGE",
          "IN",
          "WITHIN"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "AND",
          "TO",
          "OR",
          "THROUGH"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT flight_id, ticket_price\nFROM FlightSchedule\n",
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
        "text": " 200.00 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " 400.00;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "ON",
          "WHEN",
          "HAVING",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "ticket_price",
        "options": [
          "airline",
          "dest_airport",
          "delay_minutes",
          "ticket_price"
        ]
      },
      "slot3": {
        "correct": "BETWEEN",
        "options": [
          "RANGE",
          "IN",
          "WITHIN",
          "BETWEEN"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "OR",
          "AND",
          "THROUGH",
          "TO"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT pet_name, age_years\nFROM PetClinic\n",
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
        "text": " 3 ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " 8;",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "WHERE",
        "options": [
          "WHEN",
          "HAVING",
          "WHERE",
          "ON"
        ]
      },
      "slot2": {
        "correct": "age_years NOT",
        "options": [
          "pet_id",
          "species",
          "age_years NOT",
          "breed"
        ]
      },
      "slot3": {
        "correct": "BETWEEN",
        "options": [
          "RANGE",
          "WITHIN",
          "IN",
          "BETWEEN"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "OR",
          "TO",
          "THROUGH",
          "AND"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT full_name, city\nFROM Students\n",
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
        "correct": "WHERE",
        "options": [
          "CASE",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "city",
        "options": [
          "city",
          "major",
          "enrolled_year",
          "age"
        ]
      },
      "slot3": {
        "correct": "IN",
        "options": [
          "CONTAINS",
          "= ANY",
          "IN",
          "NOT IN"
        ]
      },
      "slot4": {
        "correct": "('Seattle', 'Chicago', 'Austin');",
        "options": [
          "'Seattle', 'Chicago', 'Austin')",
          "('Seattle', 'Chicago', 'Austin');",
          "['Seattle', 'Chicago', 'Austin'']",
          "('Seattle' OR 'Chicago' OR 'Austin');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT title, genre\nFROM Books\n",
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
        "correct": "WHERE",
        "options": [
          "CASE",
          "HAVING",
          "FILTER",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "genre",
        "options": [
          "stock_qty",
          "author",
          "title",
          "genre"
        ]
      },
      "slot3": {
        "correct": "IN",
        "options": [
          "CONTAINS",
          "= ANY",
          "IN",
          "NOT IN"
        ]
      },
      "slot4": {
        "correct": "('Mystery', 'Sci-Fi', 'Thriller');",
        "options": [
          "('Mystery' OR 'Sci-Fi' OR 'Thriller');",
          "['Mystery', 'Sci-Fi', 'Thriller'']",
          "('Mystery', 'Sci-Fi', 'Thriller');",
          "'Mystery', 'Sci-Fi', 'Thriller')"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT first_name, department\nFROM Employees\n",
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
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "HAVING",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "department",
        "options": [
          "bonus",
          "department",
          "salary",
          "hire_date"
        ]
      },
      "slot3": {
        "correct": "IN",
        "options": [
          "IN",
          "CONTAINS",
          "= ANY",
          "NOT IN"
        ]
      },
      "slot4": {
        "correct": "('Engineering', 'Design');",
        "options": [
          "'Engineering', 'Design')",
          "('Engineering', 'Design');",
          "['Engineering', 'Design'']",
          "('Engineering' OR 'Design');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT item_name, category\nFROM GroceryItems\n",
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
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "category",
        "options": [
          "category",
          "unit_price",
          "item_name",
          "calories"
        ]
      },
      "slot3": {
        "correct": "IN",
        "options": [
          "CONTAINS",
          "NOT IN",
          "= ANY",
          "IN"
        ]
      },
      "slot4": {
        "correct": "('Produce', 'Bakery');",
        "options": [
          "('Produce', 'Bakery');",
          "('Produce' OR 'Bakery');",
          "'Produce', 'Bakery')",
          "['Produce', 'Bakery'']"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT order_id, order_status\nFROM Orders\n",
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
        "correct": "WHERE",
        "options": [
          "CASE",
          "FILTER",
          "HAVING",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "order_status",
        "options": [
          "order_status",
          "discount_pct",
          "unit_price",
          "product_name"
        ]
      },
      "slot3": {
        "correct": "IN",
        "options": [
          "IN",
          "NOT IN",
          "CONTAINS",
          "= ANY"
        ]
      },
      "slot4": {
        "correct": "('Shipped', 'Delivered');",
        "options": [
          "['Shipped', 'Delivered'']",
          "('Shipped' OR 'Delivered');",
          "('Shipped', 'Delivered');",
          "'Shipped', 'Delivered')"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, genre\nFROM MusicTracks\nWHERE genre IN ('Rock', 'Synthwave');",
    "template": [
      {
        "text": "SELECT track_title, genre\nFROM MusicTracks\n",
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
        "correct": "WHERE",
        "options": [
          "WHERE",
          "CASE",
          "HAVING",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "genre",
        "options": [
          "genre",
          "play_count",
          "artist",
          "track_id"
        ]
      },
      "slot3": {
        "correct": "IN",
        "options": [
          "CONTAINS",
          "NOT IN",
          "IN",
          "= ANY"
        ]
      },
      "slot4": {
        "correct": "('Rock', 'Synthwave');",
        "options": [
          "'Rock', 'Synthwave')",
          "('Rock' OR 'Synthwave');",
          "['Rock', 'Synthwave'']",
          "('Rock', 'Synthwave');"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT member_name, membership_plan\nFROM GymMembers\n",
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
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "WHERE",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "membership_plan",
        "options": [
          "member_id",
          "membership_plan",
          "has_trainer",
          "monthly_fee"
        ]
      },
      "slot3": {
        "correct": "IN",
        "options": [
          "IN",
          "CONTAINS",
          "= ANY",
          "NOT IN"
        ]
      },
      "slot4": {
        "correct": "('Gold', 'Platinum');",
        "options": [
          "('Gold' OR 'Platinum');",
          "('Gold', 'Platinum');",
          "['Gold', 'Platinum'']",
          "'Gold', 'Platinum')"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT movie_title, genre\nFROM MovieReviews\n",
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
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "CASE",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "genre NOT",
        "options": [
          "release_year",
          "review_id",
          "star_rating",
          "genre NOT"
        ]
      },
      "slot3": {
        "correct": "IN",
        "options": [
          "NOT IN",
          "CONTAINS",
          "IN",
          "= ANY"
        ]
      },
      "slot4": {
        "correct": "('Horror', 'Action');",
        "options": [
          "'Horror', 'Action')",
          "('Horror' OR 'Action');",
          "('Horror', 'Action');",
          "['Horror', 'Action'']"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT flight_id, origin_airport\nFROM FlightSchedule\n",
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
        "correct": "WHERE",
        "options": [
          "HAVING",
          "CASE",
          "FILTER",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "origin_airport",
        "options": [
          "origin_airport",
          "ticket_price",
          "destination_airport",
          "flight_id"
        ]
      },
      "slot3": {
        "correct": "IN",
        "options": [
          "NOT IN",
          "IN",
          "CONTAINS",
          "= ANY"
        ]
      },
      "slot4": {
        "correct": "('ORD', 'SFO', 'JFK');",
        "options": [
          "'ORD', 'SFO', 'JFK')",
          "('ORD', 'SFO', 'JFK');",
          "('ORD' OR 'SFO' OR 'JFK');",
          "['ORD', 'SFO', 'JFK'']"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT pet_name, species\nFROM PetClinic\n",
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
        "correct": "WHERE",
        "options": [
          "CASE",
          "FILTER",
          "HAVING",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "species",
        "options": [
          "weight_kg",
          "breed",
          "species",
          "pet_id"
        ]
      },
      "slot3": {
        "correct": "IN",
        "options": [
          "= ANY",
          "CONTAINS",
          "NOT IN",
          "IN"
        ]
      },
      "slot4": {
        "correct": "('Dog', 'Cat');",
        "options": [
          "('Dog' OR 'Cat');",
          "['Dog', 'Cat'']",
          "('Dog', 'Cat');",
          "'Dog', 'Cat')"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT full_name\nFROM Students\n",
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
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "ON",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "full_name",
        "options": [
          "age",
          "student_id",
          "full_name",
          "last_name"
        ]
      },
      "slot3": {
        "correct": "LIKE",
        "options": [
          "CONTAINS",
          "LIKE",
          "=",
          "MATCHES"
        ]
      },
      "slot4": {
        "correct": "'A%';",
        "options": [
          "100",
          "'A%';",
          "NULL",
          "'Sample'"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT title, author\nFROM Books\n",
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
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "HAVING",
          "ON"
        ]
      },
      "slot2": {
        "correct": "author",
        "options": [
          "genre",
          "title",
          "book_id",
          "author"
        ]
      },
      "slot3": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "MATCHES",
          "=",
          "CONTAINS"
        ]
      },
      "slot4": {
        "correct": "'%King%';",
        "options": [
          "'%King%';",
          "NULL",
          "'Sample'",
          "100"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT first_name, last_name\nFROM Employees\n",
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
        "correct": "WHERE",
        "options": [
          "ON",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "last_name",
        "options": [
          "department",
          "last_name",
          "bonus",
          "emp_id"
        ]
      },
      "slot3": {
        "correct": "LIKE",
        "options": [
          "=",
          "LIKE",
          "CONTAINS",
          "MATCHES"
        ]
      },
      "slot4": {
        "correct": "'%son';",
        "options": [
          "100",
          "'%son';",
          "NULL",
          "'Sample'"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT item_name\nFROM GroceryItems\n",
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
        "correct": "WHERE",
        "options": [
          "WHERE",
          "ON",
          "FILTER",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "item_name",
        "options": [
          "stock_qty",
          "item_name",
          "is_organic",
          "item_id"
        ]
      },
      "slot3": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "CONTAINS",
          "=",
          "MATCHES"
        ]
      },
      "slot4": {
        "correct": "'%Organic%';",
        "options": [
          "'Sample'",
          "NULL",
          "'%Organic%';",
          "100"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT order_id, customer_name\nFROM Orders\n",
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
        "correct": "WHERE",
        "options": [
          "FILTER",
          "ON",
          "WHERE",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "customer_name",
        "options": [
          "order_status",
          "customer_name",
          "order_id",
          "discount_pct"
        ]
      },
      "slot3": {
        "correct": "LIKE",
        "options": [
          "LIKE",
          "=",
          "CONTAINS",
          "MATCHES"
        ]
      },
      "slot4": {
        "correct": "'Z%';",
        "options": [
          "'Z%';",
          "NULL",
          "'Sample'",
          "100"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title\nFROM MusicTracks\nWHERE track_title LIKE '%Rain%';",
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
        "text": " MusicTracks\n",
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
          "*",
          "track_title",
          "NULL",
          "DISTINCT track_title"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "JOIN",
          "FROM"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "WHEN",
          "HAVING"
        ]
      },
      "slot4": {
        "correct": "track_title LIKE '%Rain%';",
        "options": [
          "NULL",
          "0",
          "track_title LIKE '%Rain%'; AND 1=1",
          "track_title LIKE '%Rain%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": " GymMembers\n",
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
          "*",
          "NULL",
          "member_name",
          "DISTINCT member_name"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "JOIN",
          "FROM"
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
        "correct": "member_name LIKE '_a%';",
        "options": [
          "NULL",
          "0",
          "member_name LIKE '_a%'; AND 1=1",
          "member_name LIKE '_a%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": " MovieReviews\n",
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
          "DISTINCT movie_title",
          "NULL",
          "*",
          "movie_title"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "JOIN",
          "TABLE"
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
        "correct": "movie_title LIKE '%The %';",
        "options": [
          "NULL",
          "movie_title LIKE '%The %'; AND 1=1",
          "0",
          "movie_title LIKE '%The %';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": " FlightSchedule\n",
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
          "flight_id",
          "*",
          "DISTINCT flight_id",
          "NULL"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "JOIN",
          "INTO"
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
        "correct": "flight_id LIKE 'AA-%';",
        "options": [
          "NULL",
          "flight_id LIKE 'AA-%';",
          "flight_id LIKE 'AA-%'; AND 1=1",
          "0"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": " PetClinic\n",
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
        "correct": "pet_name, breed",
        "options": [
          "DISTINCT pet_name, breed",
          "pet_name, breed",
          "pet_name AND breed",
          "*"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "JOIN",
          "INTO",
          "TABLE"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "WHEN"
        ]
      },
      "slot4": {
        "correct": "breed LIKE '%Retriever%';",
        "options": [
          "NULL",
          "breed LIKE '%Retriever%'; AND 1=1",
          "0",
          "breed LIKE '%Retriever%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT title\nFROM Books\n",
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
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "ON",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "title",
        "options": [
          "author",
          "price",
          "title",
          "published_year"
        ]
      },
      "slot3": {
        "correct": "NOT LIKE",
        "options": [
          "UNLIKE",
          "NOT LIKE",
          "NOT MATCH",
          "!="
        ]
      },
      "slot4": {
        "correct": "'%The%';",
        "options": [
          "'%The%';",
          "100",
          "'Sample'",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT full_name, city\nFROM Students\n",
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
        "correct": "WHERE",
        "options": [
          "WHERE",
          "ON",
          "HAVING",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "city",
        "options": [
          "gpa",
          "city",
          "last_name",
          "full_name"
        ]
      },
      "slot3": {
        "correct": "NOT LIKE",
        "options": [
          "NOT LIKE",
          "UNLIKE",
          "NOT MATCH",
          "!="
        ]
      },
      "slot4": {
        "correct": "'S%';",
        "options": [
          "'Sample'",
          "NULL",
          "100",
          "'S%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT first_name, department\nFROM Employees\n",
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
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "HAVING",
          "ON"
        ]
      },
      "slot2": {
        "correct": "department",
        "options": [
          "department",
          "salary",
          "hire_date",
          "last_name"
        ]
      },
      "slot3": {
        "correct": "NOT LIKE",
        "options": [
          "UNLIKE",
          "NOT LIKE",
          "NOT MATCH",
          "!="
        ]
      },
      "slot4": {
        "correct": "'%ing';",
        "options": [
          "NULL",
          "'Sample'",
          "'%ing';",
          "100"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT item_name\nFROM GroceryItems\n",
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
        "correct": "WHERE",
        "options": [
          "HAVING",
          "ON",
          "FILTER",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "item_name",
        "options": [
          "unit_price",
          "item_name",
          "stock_qty",
          "calories"
        ]
      },
      "slot3": {
        "correct": "NOT LIKE",
        "options": [
          "!=",
          "NOT LIKE",
          "NOT MATCH",
          "UNLIKE"
        ]
      },
      "slot4": {
        "correct": "'%Milk%';",
        "options": [
          "NULL",
          "100",
          "'Sample'",
          "'%Milk%';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT order_id, order_status\nFROM Orders\n",
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
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "ON",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "order_status",
        "options": [
          "quantity",
          "order_id",
          "customer_name",
          "order_status"
        ]
      },
      "slot3": {
        "correct": "NOT LIKE",
        "options": [
          "!=",
          "UNLIKE",
          "NOT MATCH",
          "NOT LIKE"
        ]
      },
      "slot4": {
        "correct": "'%Cancel%';",
        "options": [
          "'Sample'",
          "'%Cancel%';",
          "100",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title\nFROM MusicTracks\nWHERE track_title NOT LIKE '%Love%';",
    "template": [
      {
        "text": "SELECT track_title\nFROM MusicTracks\n",
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
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "HAVING",
          "ON"
        ]
      },
      "slot2": {
        "correct": "track_title",
        "options": [
          "genre",
          "track_title",
          "artist",
          "play_count"
        ]
      },
      "slot3": {
        "correct": "NOT LIKE",
        "options": [
          "UNLIKE",
          "NOT MATCH",
          "NOT LIKE",
          "!="
        ]
      },
      "slot4": {
        "correct": "'%Love%';",
        "options": [
          "'%Love%';",
          "NULL",
          "100",
          "'Sample'"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT member_name\nFROM GymMembers\n",
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
        "correct": "WHERE",
        "options": [
          "ON",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "member_name",
        "options": [
          "member_name",
          "member_id",
          "has_trainer",
          "monthly_fee"
        ]
      },
      "slot3": {
        "correct": "NOT LIKE",
        "options": [
          "!=",
          "NOT MATCH",
          "UNLIKE",
          "NOT LIKE"
        ]
      },
      "slot4": {
        "correct": "'J%';",
        "options": [
          "'J%';",
          "'Sample'",
          "NULL",
          "100"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": " MovieReviews\n",
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
          "*",
          "NULL",
          "DISTINCT movie_title",
          "movie_title"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "FROM",
          "JOIN"
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
        "correct": "movie_title LIKE '___';",
        "options": [
          "0",
          "movie_title LIKE '___';",
          "NULL",
          "movie_title LIKE '___'; AND 1=1"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT flight_id\nFROM FlightSchedule\n",
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
        "correct": "WHERE",
        "options": [
          "WHERE",
          "ON",
          "HAVING",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "flight_id",
        "options": [
          "flight_id",
          "origin_airport",
          "airline",
          "dest_airport"
        ]
      },
      "slot3": {
        "correct": "NOT LIKE",
        "options": [
          "UNLIKE",
          "NOT LIKE",
          "NOT MATCH",
          "!="
        ]
      },
      "slot4": {
        "correct": "'DL-%';",
        "options": [
          "NULL",
          "100",
          "'DL-%';",
          "'Sample'"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": " PetClinic\n",
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
          "NULL",
          "*",
          "DISTINCT pet_name",
          "pet_name"
        ]
      },
      "slot2": {
        "correct": "FROM",
        "options": [
          "FROM",
          "JOIN",
          "INTO",
          "TABLE"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "WHEN",
          "HAVING"
        ]
      },
      "slot4": {
        "correct": "pet_name LIKE '____';",
        "options": [
          "NULL",
          "0",
          "pet_name LIKE '____'; AND 1=1",
          "pet_name LIKE '____';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT full_name, city, gpa\nFROM Students\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Seattle' ",
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
        "correct": "city",
        "options": [
          "city",
          "gpa",
          "age",
          "full_name"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "THEN",
          "AND",
          "OR",
          "PLUS"
        ]
      },
      "slot3": {
        "correct": "gpa",
        "options": [
          "first_name",
          "gpa",
          "enrolled_year",
          "student_id"
        ]
      },
      "slot4": {
        "correct": "> 3.50;",
        "options": [
          "> 3.50;",
          "= 3.50;",
          "LIKE 3.50;",
          "!= 3.50;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT title, price, stock_qty\nFROM Books\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Sci-Fi' ",
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
        "correct": "genre",
        "options": [
          "author",
          "title",
          "genre",
          "published_year"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "OR",
          "AND",
          "PLUS",
          "THEN"
        ]
      },
      "slot3": {
        "correct": "price",
        "options": [
          "book_id",
          "title",
          "price",
          "stock_qty"
        ]
      },
      "slot4": {
        "correct": "< 25.00;",
        "options": [
          "LIKE 25.00;",
          "= 25.00;",
          "< 25.00;",
          "!= 25.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT first_name, department, salary\nFROM Employees\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Engineering' ",
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
        "correct": "department",
        "options": [
          "last_name",
          "salary",
          "department",
          "hire_date"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "PLUS",
          "AND",
          "OR",
          "THEN"
        ]
      },
      "slot3": {
        "correct": "salary",
        "options": [
          "salary",
          "hire_date",
          "last_name",
          "bonus"
        ]
      },
      "slot4": {
        "correct": ">= 90000.00;",
        "options": [
          "= 90000.00;",
          ">= 90000.00;",
          "LIKE 90000.00;",
          "!= 90000.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT item_name, unit_price, is_organic\nFROM GroceryItems\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = TRUE ",
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
        "correct": "is_organic",
        "options": [
          "is_organic",
          "unit_price",
          "stock_qty",
          "item_name"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "PLUS",
          "OR",
          "THEN"
        ]
      },
      "slot3": {
        "correct": "unit_price",
        "options": [
          "is_organic",
          "category",
          "unit_price",
          "calories"
        ]
      },
      "slot4": {
        "correct": "< 4.00;",
        "options": [
          "!= 4.00;",
          "< 4.00;",
          "= 4.00;",
          "LIKE 4.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT order_id, quantity, discount_pct\nFROM Orders\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " >= 2 ",
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
        "correct": "quantity",
        "options": [
          "product_name",
          "unit_price",
          "customer_name",
          "quantity"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "PLUS",
          "AND",
          "THEN",
          "OR"
        ]
      },
      "slot3": {
        "correct": "discount_pct",
        "options": [
          "quantity",
          "discount_pct",
          "shipping_city",
          "order_status"
        ]
      },
      "slot4": {
        "correct": "> 0.05;",
        "options": [
          "> 0.05;",
          "!= 0.05;",
          "= 0.05;",
          "LIKE 0.05;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, genre, release_year\nFROM MusicTracks\nWHERE genre = 'Synthwave' AND release_year = 2024;",
    "template": [
      {
        "text": "SELECT track_title, genre, release_year\nFROM MusicTracks\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Synthwave' ",
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
        "correct": "genre",
        "options": [
          "title",
          "genre",
          "track_id",
          "artist"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "OR",
          "THEN",
          "PLUS"
        ]
      },
      "slot3": {
        "correct": "release_year",
        "options": [
          "release_year",
          "title",
          "genre",
          "track_title"
        ]
      },
      "slot4": {
        "correct": "= 2024;",
        "options": [
          "!= 2024;",
          "LIKE 2024;",
          "NULL",
          "= 2024;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT member_name, membership_plan, visits_this_month\nFROM GymMembers\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Gold' ",
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
        "correct": "membership_plan",
        "options": [
          "visits_this_month",
          "membership_plan",
          "member_name",
          "member_id"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "THEN",
          "OR",
          "PLUS"
        ]
      },
      "slot3": {
        "correct": "visits_this_month",
        "options": [
          "visits_this_month",
          "joined_date",
          "has_trainer",
          "member_name"
        ]
      },
      "slot4": {
        "correct": ">= 15;",
        "options": [
          "= 15;",
          "LIKE 15;",
          ">= 15;",
          "!= 15;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT movie_title, genre, star_rating\nFROM MovieReviews\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Sci-Fi' ",
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
        "correct": "genre",
        "options": [
          "review_count",
          "director",
          "genre",
          "movie_title"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "OR",
          "THEN",
          "PLUS"
        ]
      },
      "slot3": {
        "correct": "star_rating",
        "options": [
          "star_rating",
          "release_year",
          "review_id",
          "director"
        ]
      },
      "slot4": {
        "correct": ">= 4.5;",
        "options": [
          "LIKE 4.5;",
          "= 4.5;",
          ">= 4.5;",
          "!= 4.5;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT flight_id, airline, delay_minutes\nFROM FlightSchedule\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'United Airlines' ",
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
        "correct": "airline",
        "options": [
          "ticket_price",
          "flight_id",
          "departure_time",
          "airline"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "PLUS",
          "AND",
          "OR",
          "THEN"
        ]
      },
      "slot3": {
        "correct": "delay_minutes",
        "options": [
          "destination_airport",
          "airline",
          "flight_id",
          "delay_minutes"
        ]
      },
      "slot4": {
        "correct": "= 0;",
        "options": [
          "NULL",
          "= 0;",
          "!= 0;",
          "LIKE 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT pet_name, species, is_vaccinated\nFROM PetClinic\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Dog' ",
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
        "correct": "species",
        "options": [
          "breed",
          "pet_name",
          "species",
          "is_vaccinated"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "OR",
          "PLUS",
          "THEN",
          "AND"
        ]
      },
      "slot3": {
        "correct": "is_vaccinated",
        "options": [
          "pet_name",
          "breed",
          "is_vaccinated",
          "species"
        ]
      },
      "slot4": {
        "correct": "= TRUE;",
        "options": [
          "= TRUE;",
          "NULL",
          "!= TRUE;",
          "LIKE TRUE;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT full_name, city\nFROM Students\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Chicago' ",
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
        "correct": "city",
        "options": [
          "student_id",
          "enrolled_year",
          "full_name",
          "city"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND",
          "OR",
          "ELSE",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "city",
        "options": [
          "full_name",
          "gpa",
          "city",
          "major"
        ]
      },
      "slot4": {
        "correct": "= 'Austin';",
        "options": [
          "!= 'Austin';",
          "IS NOT NULL;",
          "NULL",
          "= 'Austin';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT title, genre, price\nFROM Books\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Sci-Fi' OR genre = 'Mystery') ",
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
        "correct": "(genre",
        "options": [
          "is_hardcover",
          "stock_qty",
          "genre",
          "(genre"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "THEN",
          "OR",
          "PLUS"
        ]
      },
      "slot3": {
        "correct": "price",
        "options": [
          "is_hardcover",
          "stock_qty",
          "price",
          "published_year"
        ]
      },
      "slot4": {
        "correct": "< 20.00;",
        "options": [
          "< 20.00;",
          "= 20.00;",
          "!= 20.00;",
          "LIKE 20.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT first_name, department, salary\nFROM Employees\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Engineering' OR department = 'Marketing') ",
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
        "correct": "(department",
        "options": [
          "bonus",
          "(department",
          "department",
          "hire_date"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "THEN",
          "OR",
          "AND",
          "PLUS"
        ]
      },
      "slot3": {
        "correct": "salary",
        "options": [
          "emp_id",
          "hire_date",
          "salary",
          "bonus"
        ]
      },
      "slot4": {
        "correct": "> 70000.00;",
        "options": [
          "LIKE 70000.00;",
          "= 70000.00;",
          "> 70000.00;",
          "!= 70000.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT item_name, category, unit_price\nFROM GroceryItems\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Produce' OR category = 'Bakery') ",
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
        "correct": "(category",
        "options": [
          "category",
          "calories",
          "unit_price",
          "(category"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "AND",
          "THEN",
          "PLUS",
          "OR"
        ]
      },
      "slot3": {
        "correct": "unit_price",
        "options": [
          "unit_price",
          "item_id",
          "stock_qty",
          "item_name"
        ]
      },
      "slot4": {
        "correct": "<= 5.00;",
        "options": [
          "= 5.00;",
          "LIKE 5.00;",
          "<= 5.00;",
          "!= 5.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT order_id, order_status, shipping_city\nFROM Orders\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " = 'Processing' OR order_status = 'Pending') ",
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
        "correct": "(order_status",
        "options": [
          "discount_pct",
          "order_status",
          "(order_status",
          "order_id"
        ]
      },
      "slot2": {
        "correct": "AND",
        "options": [
          "OR",
          "AND",
          "THEN",
          "PLUS"
        ]
      },
      "slot3": {
        "correct": "shipping_city",
        "options": [
          "shipping_city",
          "discount_pct",
          "customer_name",
          "order_status"
        ]
      },
      "slot4": {
        "correct": "= 'Denver';",
        "options": [
          "!= 'Denver';",
          "= 'Denver';",
          "NULL",
          "LIKE 'Denver';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, genre, play_count\nFROM MusicTracks\nWHERE (genre = 'Rock' OR genre = 'Synthwave') AND play_count > 50000;",
    "template": [
      {
        "text": "SELECT track_title, genre, play_count\nFROM MusicTracks\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " (genre = 'Rock' ",
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
        "text": ") ",
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
        "correct": "WHERE",
        "options": [
          "FILTER",
          "HAVING",
          "CASE",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "NOR",
          "AND",
          "XOR",
          "OR"
        ]
      },
      "slot3": {
        "correct": "genre = 'Synthwave'",
        "options": [
          "genre = 'Synthwave'",
          "genre = Synthwave",
          "genre != 'Synthwave'",
          "genre = 'Rock'"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "OR",
          "THEN",
          "PLUS",
          "AND"
        ]
      },
      "slot5": {
        "correct": "play_count > 50000;",
        "options": [
          "play_count > 50000;",
          "status = 'ACTIVE';",
          "NULL",
          "play_count < 50000;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT member_name, membership_plan, has_trainer\nFROM GymMembers\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " (membership_plan = 'Gold' ",
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
        "text": ") ",
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
        "correct": "WHERE",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "NOR",
          "OR",
          "AND",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "membership_plan = 'Platinum'",
        "options": [
          "membership_plan = 'Gold'",
          "membership_plan != 'Platinum'",
          "membership_plan = Platinum",
          "membership_plan = 'Platinum'"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "OR",
          "PLUS",
          "THEN",
          "AND"
        ]
      },
      "slot5": {
        "correct": "has_trainer = TRUE;",
        "options": [
          "NULL",
          "has_trainer != TRUE;",
          "has_trainer = TRUE;",
          "status = 'ACTIVE';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT movie_title, director, star_rating\nFROM MovieReviews\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " (director = 'Greta Gerwig' ",
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
        "text": ") ",
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
        "correct": "WHERE",
        "options": [
          "HAVING",
          "CASE",
          "FILTER",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "OR",
          "AND",
          "NOR",
          "XOR"
        ]
      },
      "slot3": {
        "correct": "director = 'Sofia Coppola'",
        "options": [
          "director != 'Sofia Coppola'",
          "director = Sofia Coppola",
          "director = 'Sofia Coppola'",
          "director = 'Greta Gerwig'"
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
        "correct": "star_rating >= 4.0;",
        "options": [
          "star_rating <= 4.0;",
          "star_rating >= 4.0;",
          "star_rating >!= 4.0;",
          "status = 'ACTIVE';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT flight_id, origin_airport, dest_airport\nFROM FlightSchedule\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " (origin_airport = 'ORD' ",
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
        "text": ") ",
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
        "correct": "WHERE",
        "options": [
          "CASE",
          "HAVING",
          "FILTER",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "NOR",
          "OR",
          "XOR",
          "AND"
        ]
      },
      "slot3": {
        "correct": "origin_airport = 'MDW'",
        "options": [
          "origin_airport = MDW",
          "origin_airport = 'ORD'",
          "origin_airport = 'MDW'",
          "origin_airport != 'MDW'"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "OR",
          "PLUS",
          "THEN",
          "AND"
        ]
      },
      "slot5": {
        "correct": "dest_airport = 'LAX';",
        "options": [
          "NULL",
          "dest_airport = 'LAX';",
          "status = 'ACTIVE';",
          "dest_airport != 'LAX';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT pet_name, species, age_years\nFROM PetClinic\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " (species = 'Dog' ",
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
        "text": ") ",
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
        "correct": "WHERE",
        "options": [
          "CASE",
          "HAVING",
          "FILTER",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "AND",
          "NOR",
          "XOR",
          "OR"
        ]
      },
      "slot3": {
        "correct": "species = 'Cat'",
        "options": [
          "species != 'Cat'",
          "species = 'Dog'",
          "species = 'Cat'",
          "species = Cat"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "AND",
          "OR",
          "PLUS",
          "THEN"
        ]
      },
      "slot5": {
        "correct": "age_years < 2;",
        "options": [
          "status = 'ACTIVE';",
          "0",
          "age_years < 2;",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT first_name, bonus\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees\n",
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
        "correct": "FROM",
        "options": [
          "TABLE",
          "FROM",
          "SOURCE",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "WHEN",
          "ON",
          "HAVING"
        ]
      },
      "slot3": {
        "correct": "bonus",
        "options": [
          "bonus",
          "hire_date",
          "first_name",
          "salary"
        ]
      },
      "slot4": {
        "correct": "IS NULL;",
        "options": [
          "IS NOT NULL;",
          "IS NULL;",
          "= NULL;",
          "!= NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT first_name, bonus\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees\n",
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
        "correct": "FROM",
        "options": [
          "TABLE",
          "SOURCE",
          "FROM",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "ON",
          "HAVING",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "bonus",
        "options": [
          "bonus",
          "last_name",
          "salary",
          "hire_date"
        ]
      },
      "slot4": {
        "correct": "IS NOT NULL;",
        "options": [
          "IS NOT NULL;",
          "= NULL;",
          "IS NULL;",
          "!= NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT title, stock_qty\nFROM Books\n",
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
        "correct": "WHERE",
        "options": [
          "FILTER",
          "HAVING",
          "WHERE",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "stock_qty",
        "options": [
          "is_hardcover",
          "genre",
          "stock_qty",
          "price"
        ]
      },
      "slot3": {
        "correct": "IS NOT NULL",
        "options": [
          "= NULL",
          "IS NULL",
          "IS NOT NULL",
          "!= NULL"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "AND",
          "OR",
          "ELSE",
          "THEN"
        ]
      },
      "slot5": {
        "correct": "stock_qty > 0;",
        "options": [
          "= 0;",
          "IS NULL;",
          "> 100;",
          "stock_qty > 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT full_name, gpa\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Students\n",
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
        "correct": "FROM",
        "options": [
          "FROM",
          "TABLE",
          "INTO",
          "SOURCE"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHEN",
          "WHERE",
          "ON"
        ]
      },
      "slot3": {
        "correct": "gpa",
        "options": [
          "city",
          "gpa",
          "student_id",
          "age"
        ]
      },
      "slot4": {
        "correct": "IS NOT NULL;",
        "options": [
          "!= NULL;",
          "IS NOT NULL;",
          "IS NULL;",
          "= NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT order_id, discount_pct\nFROM Orders\n",
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
        "correct": "WHERE",
        "options": [
          "CASE",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "discount_pct",
        "options": [
          "order_status",
          "quantity",
          "order_id",
          "discount_pct"
        ]
      },
      "slot3": {
        "correct": "IS NULL",
        "options": [
          "!= NULL",
          "= NULL",
          "IS NULL",
          "IS NOT NULL"
        ]
      },
      "slot4": {
        "correct": "OR",
        "options": [
          "THEN",
          "AND",
          "ELSE",
          "OR"
        ]
      },
      "slot5": {
        "correct": "discount_pct = 0.00;",
        "options": [
          "> 100;",
          "IS NULL;",
          "= 0;",
          "discount_pct = 0.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT pet_name, breed\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " PetClinic\n",
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
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "SOURCE",
          "FROM"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "WHEN",
          "ON"
        ]
      },
      "slot3": {
        "correct": "breed",
        "options": [
          "pet_name",
          "breed",
          "is_vaccinated",
          "weight_kg"
        ]
      },
      "slot4": {
        "correct": "IS NOT NULL;",
        "options": [
          "IS NULL;",
          "IS NOT NULL;",
          "!= NULL;",
          "= NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\n",
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
        "correct": "WHERE",
        "options": [
          "WHERE",
          "FILTER",
          "HAVING",
          "CASE"
        ]
      },
      "slot2": {
        "correct": "delay_minutes",
        "options": [
          "dest_airport",
          "destination_airport",
          "ticket_price",
          "delay_minutes"
        ]
      },
      "slot3": {
        "correct": "IS NOT NULL",
        "options": [
          "= NULL",
          "!= NULL",
          "IS NOT NULL",
          "IS NULL"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "THEN",
          "OR",
          "AND",
          "ELSE"
        ]
      },
      "slot5": {
        "correct": "delay_minutes = 0;",
        "options": [
          "= 0;",
          "> 100;",
          "delay_minutes = 0;",
          "IS NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT member_name, visits_this_month\nFROM GymMembers\n",
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
        "correct": "WHERE",
        "options": [
          "FILTER",
          "CASE",
          "WHERE",
          "HAVING"
        ]
      },
      "slot2": {
        "correct": "visits_this_month",
        "options": [
          "membership_plan",
          "visits_this_month",
          "member_name",
          "joined_date"
        ]
      },
      "slot3": {
        "correct": "IS NOT NULL",
        "options": [
          "IS NOT NULL",
          "= NULL",
          "IS NULL",
          "!= NULL"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "AND",
          "THEN",
          "ELSE",
          "OR"
        ]
      },
      "slot5": {
        "correct": "visits_this_month = 0;",
        "options": [
          "IS NULL;",
          "= 0;",
          "> 100;",
          "visits_this_month = 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT item_name, unit_price\nFROM GroceryItems\n",
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
        "correct": "WHERE",
        "options": [
          "HAVING",
          "CASE",
          "WHERE",
          "FILTER"
        ]
      },
      "slot2": {
        "correct": "unit_price",
        "options": [
          "item_id",
          "calories",
          "unit_price",
          "stock_qty"
        ]
      },
      "slot3": {
        "correct": "IS NOT NULL",
        "options": [
          "IS NULL",
          "!= NULL",
          "= NULL",
          "IS NOT NULL"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "THEN",
          "AND",
          "ELSE",
          "OR"
        ]
      },
      "slot5": {
        "correct": "unit_price > 0.00;",
        "options": [
          "> 100;",
          "unit_price > 0.00;",
          "= 0;",
          "IS NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, play_count\nFROM MusicTracks\nWHERE play_count IS NOT NULL AND play_count >= 0;",
    "template": [
      {
        "text": "SELECT track_title, play_count\nFROM MusicTracks\n",
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
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "CASE",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "play_count",
        "options": [
          "track_title",
          "play_count",
          "artist",
          "title"
        ]
      },
      "slot3": {
        "correct": "IS NOT NULL",
        "options": [
          "IS NOT NULL",
          "IS NULL",
          "= NULL",
          "!= NULL"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "AND",
          "ELSE",
          "OR",
          "THEN"
        ]
      },
      "slot5": {
        "correct": "play_count >= 0;",
        "options": [
          "= 0;",
          "> 100;",
          "IS NULL;",
          "play_count >= 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT first_name, bonus\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " Employees\n",
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
        "correct": "FROM",
        "options": [
          "FROM",
          "SOURCE",
          "TABLE",
          "INTO"
        ]
      },
      "slot2": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "WHERE",
          "ON",
          "WHEN"
        ]
      },
      "slot3": {
        "correct": "bonus",
        "options": [
          "department",
          "last_name",
          "emp_id",
          "bonus"
        ]
      },
      "slot4": {
        "correct": "IS NULL;",
        "options": [
          "!= NULL;",
          "IS NOT NULL;",
          "IS NULL;",
          "= NULL;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT full_name, city, gpa\nFROM Students\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " (city = 'Chicago' ",
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
        "text": ") ",
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
        "correct": "WHERE",
        "options": [
          "FILTER",
          "CASE",
          "HAVING",
          "WHERE"
        ]
      },
      "slot2": {
        "correct": "OR",
        "options": [
          "NOR",
          "OR",
          "XOR",
          "AND"
        ]
      },
      "slot3": {
        "correct": "city = 'Seattle'",
        "options": [
          "city = Seattle",
          "city = 'Seattle'",
          "city != 'Seattle'",
          "city = 'Chicago'"
        ]
      },
      "slot4": {
        "correct": "AND",
        "options": [
          "AND",
          "OR",
          "THEN",
          "PLUS"
        ]
      },
      "slot5": {
        "correct": "gpa > 3.50;",
        "options": [
          "NULL",
          "status = 'ACTIVE';",
          "gpa < 3.50;",
          "gpa > 3.50;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT title, price\n",
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
        "correct": "FROM",
        "options": [
          "FROM",
          "INTO",
          "SOURCE",
          "TABLE"
        ]
      },
      "slot2": {
        "correct": "Books",
        "options": [
          "GroceryItems",
          "GymMembers",
          "PetClinic",
          "Books"
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
        "correct": "price BETWEEN 10.00 AND 25.00;",
        "options": [
          "price BETWEEN 10.00 AND 25.00;",
          "NULL",
          "0",
          "price BETWEEN 10.00 OR 25.00;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT item_name, category\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " GroceryItems\n",
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
        "correct": "FROM",
        "options": [
          "FROM",
          "SOURCE",
          "TABLE",
          "INTO"
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
        "correct": "(ategory IN ('Produce', 'Bakery')",
        "options": [
          "(ategory IN ('Produce', 'Bakery')",
          "(id > 0)",
          "(true)",
          "(1=1)"
        ]
      },
      "slot4": {
        "correct": "category IN ('Produce', 'Bakery');",
        "options": [
          "category IN ('Produce', 'Bakery');",
          "WHERE 1=1;",
          "ORDER BY id;",
          "HAVING count(*) > 0;"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT order_id, shipping_city\n",
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
        "correct": "FROM",
        "options": [
          "TABLE",
          "INTO",
          "FROM",
          "SOURCE"
        ]
      },
      "slot2": {
        "correct": "Orders",
        "options": [
          "Books",
          "MovieReviews",
          "PetClinic",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "HAVING",
          "FILTER",
          "WHERE",
          "WHEN"
        ]
      },
      "slot4": {
        "correct": "shipping_city = 'Denver';",
        "options": [
          "NULL",
          "shipping_city != 'Denver';",
          "shipping_city = \"Denver\";",
          "shipping_city = 'Denver';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, genre\nFROM MusicTracks\nWHERE genre LIKE 'Rock%';",
    "template": [
      {
        "text": "SELECT track_title, genre\n",
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
        "correct": "FROM",
        "options": [
          "INTO",
          "TABLE",
          "SOURCE",
          "FROM"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "MusicTracks",
          "MovieReviews",
          "Students",
          "GymMembers"
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
        "correct": "genre LIKE 'Rock%';",
        "options": [
          "genre LIKE 'Rock%';",
          "0",
          "genre LIKE \"Rock%\";",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT member_name, monthly_fee\n",
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
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "TABLE",
          "SOURCE"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "PetClinic",
          "GroceryItems",
          "Students",
          "GymMembers"
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
        "correct": "monthly_fee >= 30.00 AND monthly_fee <= 70.00;",
        "options": [
          "monthly_fee >!= 30.00 AND monthly_fee <!= 70.00;",
          "monthly_fee >= 30.00 OR monthly_fee <= 70.00;",
          "monthly_fee >= 30.00 AND monthly_fee <= 70.00;",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT movie_title, star_rating\n",
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
        "correct": "FROM",
        "options": [
          "SOURCE",
          "INTO",
          "TABLE",
          "FROM"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "GroceryItems",
          "MovieReviews",
          "Students",
          "GymMembers"
        ]
      },
      "slot3": {
        "correct": "WHERE",
        "options": [
          "WHERE",
          "HAVING",
          "WHEN",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "star_rating > 4.0;",
        "options": [
          "0",
          "NULL",
          "star_rating > 4.0;",
          "'Default'"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT flight_id, delay_minutes\n",
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
        "correct": "FROM",
        "options": [
          "FROM",
          "SOURCE",
          "INTO",
          "TABLE"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "Students",
          "MovieReviews",
          "FlightSchedule",
          "Employees"
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
        "correct": "delay_minutes != 0;",
        "options": [
          "0",
          "delay_minutes != 0;",
          "delay_minutes !!= 0;",
          "NULL"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
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
        "text": "SELECT pet_name, species\n",
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
        "correct": "FROM",
        "options": [
          "INTO",
          "FROM",
          "SOURCE",
          "TABLE"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "Books",
          "GroceryItems",
          "MovieReviews",
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
        "correct": "species = 'Cat' OR species = 'Dog';",
        "options": [
          "species = \"Cat\" OR species = \"Dog\";",
          "NULL",
          "species = 'Cat' OR species = 'Dog';",
          "species != 'Cat' OR species != 'Dog';"
        ]
      }
    },
    "syntaxRule": "Strings use single quotes, numbers do not. AND precedes OR unless parentheses are used. NULL requires IS NULL.",
    "syntaxTrap": "Never write col = NULL or omit parentheses in mixed AND/OR statements.",
    "eli5Story": "Filter check on PetClinic: Fix shorthand OR trap: \"WHERE species = 'Cat' OR 'Dog';\" (each side of OR requires a full boolean test).",
    "commonMistakes": "Unquoted strings, missing parentheses around OR, or using = instead of LIKE.",
    "learningOutcomes": "Mastered 2.10 Multi-Condition Bug Hunts on PetClinic."
  }
];
