// =============================================================================
// SECTION 03: ORDER BY & LIMIT SLICING (100 INTERACTIVE MULTI-BLANK QUESTS)
// Progressive Cumulative 3-to-5 Blank Challenge Engine Interleaving Foundations & Slicing
// =============================================================================

window.QUESTS_SECTION_3 = [
  {
    "id": 201,
    "levelDisplay": "Level 01",
    "title": "Level 01: Syntax #201: Sort students by GPA in ascending order (lowest to highest score)",
    "subtitle": "Sort students by GPA in ascending order (lowest to highest score).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Sort students by GPA in ascending order (lowest to highest score).",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nORDER BY gpa ASC;",
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
          "GroceryItems",
          "Students",
          "GymMembers",
          "MusicTracks"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "ARRANGE BY",
          "SORT BY",
          "GROUP BY"
        ]
      },
      "slot3": {
        "correct": "gpa ASC;",
        "options": [
          "gpa NULLS;",
          "gpa ASC;",
          "gpa DESC;",
          "gpa;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Sort students by GPA in ascending order (lowest to highest score).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on Students."
  },
  {
    "id": 202,
    "levelDisplay": "Level 02",
    "title": "Level 02: Syntax #202: Display books ordered by price from cheapest to most expensive",
    "subtitle": "Display books ordered by price from cheapest to most expensive.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Display books ordered by price from cheapest to most expensive.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, price\nFROM Books\nORDER BY price ASC;",
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
        "text": ", price\nFROM Books\nORDER BY ",
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
          "price",
          "title",
          "author"
        ]
      },
      "slot2": {
        "correct": "price",
        "options": [
          "is_hardcover",
          "price",
          "title",
          "author"
        ]
      },
      "slot3": {
        "correct": "ASC;",
        "options": [
          "ASC;",
          "AUTO;",
          "DESC;",
          "NULLS FIRST;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Display books ordered by price from cheapest to most expensive.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on Books."
  },
  {
    "id": 203,
    "levelDisplay": "Level 03",
    "title": "Level 03: Syntax #203: List employees ordered chronologically by hire_date (most senior first)",
    "subtitle": "List employees ordered chronologically by hire_date (most senior first).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "List employees ordered chronologically by hire_date (most senior first).",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, hire_date\nFROM Employees\nORDER BY hire_date ASC;",
    "template": [
      {
        "text": "SELECT first_name, hire_date\nFROM ",
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
          "Employees",
          "GymMembers",
          "Students",
          "PetClinic"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "ORDER BY",
          "ARRANGE BY",
          "GROUP BY"
        ]
      },
      "slot3": {
        "correct": "hire_date ASC;",
        "options": [
          "hire_date DESC;",
          "hire_date ASC;",
          "hire_date NULLS;",
          "hire_date;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: List employees ordered chronologically by hire_date (most senior first).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on Employees."
  },
  {
    "id": 204,
    "levelDisplay": "Level 04",
    "title": "Level 04: Syntax #204: Order grocery items by unit price ascending",
    "subtitle": "Order grocery items by unit price ascending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Order grocery items by unit price ascending.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY unit_price ASC;",
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
        "text": ", unit_price\nFROM GroceryItems\nORDER BY ",
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
          "item_id",
          "unit_price",
          "calories",
          "item_name"
        ]
      },
      "slot2": {
        "correct": "unit_price",
        "options": [
          "is_organic",
          "unit_price",
          "item_id",
          "category"
        ]
      },
      "slot3": {
        "correct": "ASC;",
        "options": [
          "DESC;",
          "ASC;",
          "NULLS FIRST;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Order grocery items by unit price ascending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on GroceryItems."
  },
  {
    "id": 205,
    "levelDisplay": "Level 05",
    "title": "Level 05: Syntax #205: Sort customer orders from smallest to largest quantity",
    "subtitle": "Sort customer orders from smallest to largest quantity.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Sort customer orders from smallest to largest quantity.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, quantity\nFROM Orders\nORDER BY quantity ASC;",
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
          "PetClinic",
          "GroceryItems",
          "Students",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "ARRANGE BY",
          "SORT BY"
        ]
      },
      "slot3": {
        "correct": "quantity ASC;",
        "options": [
          "quantity ASC;",
          "quantity;",
          "quantity DESC;",
          "quantity NULLS;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Sort customer orders from smallest to largest quantity.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on Orders."
  },
  {
    "id": 206,
    "levelDisplay": "Level 06",
    "title": "Level 06: Syntax #206: Order music tracks from shortest to longest duration",
    "subtitle": "Order music tracks from shortest to longest duration.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Order music tracks from shortest to longest duration.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, duration_seconds\nFROM MusicTracks\nORDER BY duration_seconds ASC;",
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
        "text": ", duration_seconds\nFROM MusicTracks\nORDER BY ",
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
          "play_count"
        ]
      },
      "slot2": {
        "correct": "duration_seconds",
        "options": [
          "play_count",
          "track_title",
          "duration_seconds",
          "genre"
        ]
      },
      "slot3": {
        "correct": "ASC;",
        "options": [
          "AUTO;",
          "DESC;",
          "ASC;",
          "NULLS FIRST;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Order music tracks from shortest to longest duration.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on MusicTracks."
  },
  {
    "id": 207,
    "levelDisplay": "Level 07",
    "title": "Level 07: Syntax #207: List gym members by join date from earliest to latest",
    "subtitle": "List gym members by join date from earliest to latest.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "List gym members by join date from earliest to latest.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, join_date\nFROM GymMembers\nORDER BY join_date ASC;",
    "template": [
      {
        "text": "SELECT member_name, join_date\nFROM ",
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
          "PetClinic",
          "GymMembers",
          "GroceryItems",
          "FlightSchedule"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "ARRANGE BY",
          "GROUP BY",
          "SORT BY"
        ]
      },
      "slot3": {
        "correct": "join_date ASC;",
        "options": [
          "join_date NULLS;",
          "join_date ASC;",
          "join_date;",
          "join_date DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: List gym members by join date from earliest to latest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on GymMembers."
  },
  {
    "id": 208,
    "levelDisplay": "Level 08",
    "title": "Level 08: Syntax #208: Order movies chronologically by release year from oldest to newest",
    "subtitle": "Order movies chronologically by release year from oldest to newest.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Order movies chronologically by release year from oldest to newest.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, release_year\nFROM MovieReviews\nORDER BY release_year ASC;",
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
        "text": ", release_year\nFROM MovieReviews\nORDER BY ",
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
          "release_year",
          "movie_title"
        ]
      },
      "slot2": {
        "correct": "release_year",
        "options": [
          "director",
          "genre",
          "release_year",
          "review_count"
        ]
      },
      "slot3": {
        "correct": "ASC;",
        "options": [
          "AUTO;",
          "NULLS FIRST;",
          "ASC;",
          "DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Order movies chronologically by release year from oldest to newest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on MovieReviews."
  },
  {
    "id": 209,
    "levelDisplay": "Level 09",
    "title": "Level 09: Syntax #209: Display flights ordered by departure time from earliest morning to latest night",
    "subtitle": "Display flights ordered by departure time from earliest morning to latest night.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Display flights ordered by departure time from earliest morning to latest night.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, departure_time\nFROM FlightSchedule\nORDER BY departure_time ASC;",
    "template": [
      {
        "text": "SELECT flight_id, departure_time\nFROM ",
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
          "MusicTracks",
          "MovieReviews",
          "PetClinic"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ARRANGE BY",
          "ORDER BY",
          "SORT BY",
          "GROUP BY"
        ]
      },
      "slot3": {
        "correct": "departure_time ASC;",
        "options": [
          "departure_time NULLS;",
          "departure_time;",
          "departure_time ASC;",
          "departure_time DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Display flights ordered by departure time from earliest morning to latest night.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on FlightSchedule."
  },
  {
    "id": 210,
    "levelDisplay": "Level 10",
    "title": "Level 10: Syntax #210: Sort veterinary patients by age from youngest to oldest",
    "subtitle": "Sort veterinary patients by age from youngest to oldest.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.1 Single Column Ascending (ASC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Sort veterinary patients by age from youngest to oldest.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, age_years\nFROM PetClinic\nORDER BY age_years ASC;",
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
        "text": ", age_years\nFROM PetClinic\nORDER BY ",
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
          "species",
          "pet_id",
          "pet_name"
        ]
      },
      "slot2": {
        "correct": "age_years",
        "options": [
          "pet_name",
          "is_vaccinated",
          "age_years",
          "species"
        ]
      },
      "slot3": {
        "correct": "ASC;",
        "options": [
          "NULLS FIRST;",
          "AUTO;",
          "DESC;",
          "ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort veterinary patients by age from youngest to oldest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.1 Single Column Ascending (ASC) on PetClinic."
  },
  {
    "id": 211,
    "levelDisplay": "Level 11",
    "title": "Level 11: Syntax #211: Rank students by GPA descending (highest academic score first)",
    "subtitle": "Rank students by GPA descending (highest academic score first).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.2 Single Column Descending (DESC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Rank students by GPA descending (highest academic score first).",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nORDER BY gpa DESC;",
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
          "FlightSchedule",
          "Orders",
          "MusicTracks",
          "Students"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ARRANGE BY",
          "GROUP BY",
          "SORT BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "gpa DESC;",
        "options": [
          "gpa ASC;",
          "gpa NULLS;",
          "gpa;",
          "gpa DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Rank students by GPA descending (highest academic score first).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on Students."
  },
  {
    "id": 212,
    "levelDisplay": "Level 12",
    "title": "Level 12: Syntax #212: List books ordered from highest to lowest price",
    "subtitle": "List books ordered from highest to lowest price.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.2 Single Column Descending (DESC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "List books ordered from highest to lowest price.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, price\nFROM Books\nORDER BY price DESC;",
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
        "text": ", price\nFROM Books\nORDER BY ",
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
          "author",
          "stock_qty"
        ]
      },
      "slot2": {
        "correct": "price",
        "options": [
          "genre",
          "title",
          "book_id",
          "price"
        ]
      },
      "slot3": {
        "correct": "DESC;",
        "options": [
          "ASC;",
          "DESC;",
          "NULLS FIRST;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: List books ordered from highest to lowest price.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on Books."
  },
  {
    "id": 213,
    "levelDisplay": "Level 13",
    "title": "Level 13: Syntax #213: Order employees by annual salary from highest earner to lowest",
    "subtitle": "Order employees by annual salary from highest earner to lowest.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.2 Single Column Descending (DESC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Order employees by annual salary from highest earner to lowest.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, salary\nFROM Employees\nORDER BY salary DESC;",
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
          "PetClinic",
          "GroceryItems",
          "Orders",
          "Employees"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ARRANGE BY",
          "GROUP BY",
          "SORT BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "salary DESC;",
        "options": [
          "salary;",
          "salary NULLS;",
          "salary DESC;",
          "salary ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Order employees by annual salary from highest earner to lowest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on Employees."
  },
  {
    "id": 214,
    "levelDisplay": "Level 14",
    "title": "Level 14: Syntax #214: View grocery items sorted by stock units from most abundant to least",
    "subtitle": "View grocery items sorted by stock units from most abundant to least.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.2 Single Column Descending (DESC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "View grocery items sorted by stock units from most abundant to least.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, stock_units\nFROM GroceryItems\nORDER BY stock_units DESC;",
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
        "text": ", stock_units\nFROM GroceryItems\nORDER BY ",
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
          "unit_price",
          "item_name",
          "category",
          "is_organic"
        ]
      },
      "slot2": {
        "correct": "stock_units",
        "options": [
          "category",
          "unit_price",
          "stock_units",
          "item_id"
        ]
      },
      "slot3": {
        "correct": "DESC;",
        "options": [
          "NULLS FIRST;",
          "ASC;",
          "AUTO;",
          "DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: View grocery items sorted by stock units from most abundant to least.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on GroceryItems."
  },
  {
    "id": 215,
    "levelDisplay": "Level 15",
    "title": "Level 15: Syntax #215: Order customer purchases by unit price descending",
    "subtitle": "Order customer purchases by unit price descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.2 Single Column Descending (DESC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Order customer purchases by unit price descending.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, unit_price\nFROM Orders\nORDER BY unit_price DESC;",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "Orders",
        "options": [
          "Employees",
          "MovieReviews",
          "Students",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ARRANGE BY",
          "SORT BY",
          "GROUP BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "unit_price DESC;",
        "options": [
          "unit_price;",
          "unit_price NULLS;",
          "unit_price ASC;",
          "unit_price DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Order customer purchases by unit price descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on Orders."
  },
  {
    "id": 216,
    "levelDisplay": "Level 16",
    "title": "Level 16: Syntax #216: Sort playlist by play count descending to find top hits",
    "subtitle": "Sort playlist by play count descending to find top hits.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.2 Single Column Descending (DESC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Sort playlist by play count descending to find top hits.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, play_count\nFROM MusicTracks\nORDER BY play_count DESC;",
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
        "text": ", play_count\nFROM MusicTracks\nORDER BY ",
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
          "track_id",
          "track_title",
          "artist",
          "genre"
        ]
      },
      "slot2": {
        "correct": "play_count",
        "options": [
          "play_count",
          "title",
          "artist_name",
          "genre"
        ]
      },
      "slot3": {
        "correct": "DESC;",
        "options": [
          "NULLS FIRST;",
          "ASC;",
          "DESC;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Sort playlist by play count descending to find top hits.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on MusicTracks."
  },
  {
    "id": 217,
    "levelDisplay": "Level 17",
    "title": "Level 17: Syntax #217: Rank gym members by monthly attendance from highest to lowest",
    "subtitle": "Rank gym members by monthly attendance from highest to lowest.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.2 Single Column Descending (DESC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Rank gym members by monthly attendance from highest to lowest.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, visits_this_month\nFROM GymMembers\nORDER BY visits_this_month DESC;",
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
          "MovieReviews",
          "GymMembers",
          "Books",
          "GroceryItems"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "ARRANGE BY"
        ]
      },
      "slot3": {
        "correct": "visits_this_month DESC;",
        "options": [
          "visits_this_month;",
          "visits_this_month ASC;",
          "visits_this_month NULLS;",
          "visits_this_month DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Rank gym members by monthly attendance from highest to lowest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on GymMembers."
  },
  {
    "id": 218,
    "levelDisplay": "Level 18",
    "title": "Level 18: Syntax #218: Sort movie reviews by star rating descending (best reviewed films first)",
    "subtitle": "Sort movie reviews by star rating descending (best reviewed films first).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.2 Single Column Descending (DESC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Sort movie reviews by star rating descending (best reviewed films first).",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY star_rating DESC;",
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
        "text": ", star_rating\nFROM MovieReviews\nORDER BY ",
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
          "director",
          "movie_title",
          "star_rating",
          "review_id"
        ]
      },
      "slot2": {
        "correct": "star_rating",
        "options": [
          "genre",
          "star_rating",
          "review_count",
          "release_year"
        ]
      },
      "slot3": {
        "correct": "DESC;",
        "options": [
          "NULLS FIRST;",
          "AUTO;",
          "ASC;",
          "DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Sort movie reviews by star rating descending (best reviewed films first).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on MovieReviews."
  },
  {
    "id": 219,
    "levelDisplay": "Level 19",
    "title": "Level 19: Syntax #219: Order flight schedule by ticket price descending",
    "subtitle": "Order flight schedule by ticket price descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.2 Single Column Descending (DESC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Order flight schedule by ticket price descending.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, ticket_price\nFROM FlightSchedule\nORDER BY ticket_price DESC;",
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
      }
    ],
    "slots": {
      "slot1": {
        "correct": "FlightSchedule",
        "options": [
          "GroceryItems",
          "Books",
          "FlightSchedule",
          "GymMembers"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "ARRANGE BY",
          "GROUP BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "ticket_price DESC;",
        "options": [
          "ticket_price DESC;",
          "ticket_price;",
          "ticket_price ASC;",
          "ticket_price NULLS;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Order flight schedule by ticket price descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on FlightSchedule."
  },
  {
    "id": 220,
    "levelDisplay": "Level 20",
    "title": "Level 20: Syntax #220: Sort clinic patients by weight in kilograms descending",
    "subtitle": "Sort clinic patients by weight in kilograms descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.2 Single Column Descending (DESC)",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Sort clinic patients by weight in kilograms descending.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, weight_kg\nFROM PetClinic\nORDER BY weight_kg DESC;",
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
        "text": ", weight_kg\nFROM PetClinic\nORDER BY ",
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
          "pet_id",
          "pet_name"
        ]
      },
      "slot2": {
        "correct": "weight_kg",
        "options": [
          "pet_id",
          "pet_name",
          "species",
          "weight_kg"
        ]
      },
      "slot3": {
        "correct": "DESC;",
        "options": [
          "ASC;",
          "DESC;",
          "NULLS FIRST;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort clinic patients by weight in kilograms descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.2 Single Column Descending (DESC) on PetClinic."
  },
  {
    "id": 221,
    "levelDisplay": "Level 21",
    "title": "Level 21: Syntax #221: Sort students first by city alphabetically, and within each city by GPA descending",
    "subtitle": "Sort students first by city alphabetically, and within each city by GPA descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.3 Multi-Column Sorting",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort students first by city alphabetically, and within each city by GPA descending.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT city, full_name, gpa\nFROM Students\nORDER BY city ASC, gpa DESC;",
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
        "text": ", full_name, gpa\nFROM Students\n",
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
        "correct": "city",
        "options": [
          "city",
          "major",
          "student_id",
          "full_name"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "ARRANGE BY",
          "INDEX BY",
          "SORT BY"
        ]
      },
      "slot3": {
        "correct": "city ASC, gpa DESC;",
        "options": [
          "city ASC, gpa DESC;",
          "city DESC, gpa DESC;",
          "city ASC AND gpa DESC;",
          "city ASC, gpa ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Sort students first by city alphabetically, and within each city by GPA descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on Students."
  },
  {
    "id": 222,
    "levelDisplay": "Level 22",
    "title": "Level 22: Syntax #222: Sort books by genre alphabetically, and then by price ascending",
    "subtitle": "Sort books by genre alphabetically, and then by price ascending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.3 Multi-Column Sorting",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort books by genre alphabetically, and then by price ascending.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT genre, title, price\nFROM Books\nORDER BY genre ASC, price ASC;",
    "template": [
      {
        "text": "SELECT genre, title, price\nFROM ",
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
        "text": ", ",
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
          "PetClinic",
          "Books",
          "GymMembers",
          "GroceryItems"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "RANK BY",
          "ORDER BY",
          "GROUP BY",
          "SORT BY"
        ]
      },
      "slot3": {
        "correct": "genre ASC",
        "options": [
          "genre ASC_1",
          "genre DESC",
          "genre ASC",
          "1"
        ]
      },
      "slot4": {
        "correct": "price ASC;",
        "options": [
          "price ASC;_1",
          "price DESC;",
          "price ASC;",
          "price ASC FIRST;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Sort books by genre alphabetically, and then by price ascending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on Books."
  },
  {
    "id": 223,
    "levelDisplay": "Level 23",
    "title": "Level 23: Syntax #223: Group output by department alphabetically, then sort by highest salary descending",
    "subtitle": "Group output by department alphabetically, then sort by highest salary descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.3 Multi-Column Sorting",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Group output by department alphabetically, then sort by highest salary descending.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT department, salary, first_name\nFROM Employees\nORDER BY department ASC, salary DESC;",
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
        "text": ", salary, first_name\nFROM Employees\n",
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
        "correct": "department",
        "options": [
          "hire_date",
          "emp_id",
          "department",
          "salary"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ARRANGE BY",
          "SORT BY",
          "INDEX BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "department ASC, salary DESC;",
        "options": [
          "department ASC, salary DESC;",
          "department ASC, salary ASC;",
          "department ASC AND salary DESC;",
          "department DESC, salary DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Group output by department alphabetically, then sort by highest salary descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on Employees."
  },
  {
    "id": 224,
    "levelDisplay": "Level 24",
    "title": "Level 24: Syntax #224: Order grocery items by category alphabetically, then by price cheapest first",
    "subtitle": "Order grocery items by category alphabetically, then by price cheapest first.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.3 Multi-Column Sorting",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Order grocery items by category alphabetically, then by price cheapest first.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT category, item_name, unit_price\nFROM GroceryItems\nORDER BY category ASC, unit_price ASC;",
    "template": [
      {
        "text": "SELECT category, item_name, unit_price\nFROM ",
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
        "text": ", ",
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
          "FlightSchedule",
          "PetClinic",
          "Students"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "GROUP BY",
          "SORT BY",
          "ORDER BY",
          "RANK BY"
        ]
      },
      "slot3": {
        "correct": "category ASC",
        "options": [
          "category ASC_1",
          "1",
          "category DESC",
          "category ASC"
        ]
      },
      "slot4": {
        "correct": "unit_price ASC;",
        "options": [
          "unit_price ASC;",
          "unit_price DESC;",
          "unit_price ASC;_1",
          "unit_price ASC FIRST;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Order grocery items by category alphabetically, then by price cheapest first.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on GroceryItems."
  },
  {
    "id": 225,
    "levelDisplay": "Level 25",
    "title": "Level 25: Syntax #225: Sort orders primarily by shipping city, secondarily by order status",
    "subtitle": "Sort orders primarily by shipping city, secondarily by order status.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.3 Multi-Column Sorting",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort orders primarily by shipping city, secondarily by order status.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT shipping_city, order_status, order_id\nFROM Orders\nORDER BY shipping_city ASC, order_status ASC;",
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
        "text": ", order_status, order_id\nFROM Orders\n",
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
        "correct": "shipping_city",
        "options": [
          "unit_price",
          "discount_pct",
          "order_status",
          "shipping_city"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ARRANGE BY",
          "SORT BY",
          "ORDER BY",
          "INDEX BY"
        ]
      },
      "slot3": {
        "correct": "shipping_city ASC, order_status ASC;",
        "options": [
          "shipping_city ASC AND order_status ASC;",
          "shipping_city ASC, order_status ASC;_1",
          "shipping_city DESC, order_status DESC;",
          "shipping_city ASC, order_status ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Sort orders primarily by shipping city, secondarily by order status.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on Orders."
  },
  {
    "id": 226,
    "levelDisplay": "Level 26",
    "title": "Level 26: Syntax #226: Sort tracks by genre alphabetically, then by play count descending",
    "subtitle": "Sort tracks by genre alphabetically, then by play count descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.3 Multi-Column Sorting",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort tracks by genre alphabetically, then by play count descending.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT genre, play_count, track_title\nFROM MusicTracks\nORDER BY genre ASC, play_count DESC;",
    "template": [
      {
        "text": "SELECT genre, play_count, track_title\nFROM ",
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
        "text": ", ",
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
          "GroceryItems",
          "Books",
          "MusicTracks",
          "PetClinic"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "RANK BY",
          "ORDER BY",
          "SORT BY",
          "GROUP BY"
        ]
      },
      "slot3": {
        "correct": "genre ASC",
        "options": [
          "genre ASC_1",
          "genre ASC",
          "1",
          "genre DESC"
        ]
      },
      "slot4": {
        "correct": "play_count DESC;",
        "options": [
          "play_count DESC FIRST;",
          "play_count ASC;",
          "play_count DESC;",
          "play_count DESC;_1"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Sort tracks by genre alphabetically, then by play count descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on MusicTracks."
  },
  {
    "id": 227,
    "levelDisplay": "Level 27",
    "title": "Level 27: Syntax #227: Sort gym members by plan tier, then by monthly visits descending",
    "subtitle": "Sort gym members by plan tier, then by monthly visits descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.3 Multi-Column Sorting",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort gym members by plan tier, then by monthly visits descending.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT membership_plan, visits_this_month, member_name\nFROM GymMembers\nORDER BY membership_plan ASC, visits_this_month DESC;",
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
        "text": ", visits_this_month, member_name\nFROM GymMembers\n",
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
        "correct": "membership_plan",
        "options": [
          "member_name",
          "membership_plan",
          "joined_date",
          "visits_this_month"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "ARRANGE BY",
          "ORDER BY",
          "INDEX BY"
        ]
      },
      "slot3": {
        "correct": "membership_plan ASC, visits_this_month DESC;",
        "options": [
          "membership_plan ASC, visits_this_month ASC;",
          "membership_plan DESC, visits_this_month DESC;",
          "membership_plan ASC AND visits_this_month DESC;",
          "membership_plan ASC, visits_this_month DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Sort gym members by plan tier, then by monthly visits descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on GymMembers."
  },
  {
    "id": 228,
    "levelDisplay": "Level 28",
    "title": "Level 28: Syntax #228: Sort movie reviews by genre, then by star rating highest first",
    "subtitle": "Sort movie reviews by genre, then by star rating highest first.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.3 Multi-Column Sorting",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort movie reviews by genre, then by star rating highest first.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT genre, star_rating, movie_title\nFROM MovieReviews\nORDER BY genre ASC, star_rating DESC;",
    "template": [
      {
        "text": "SELECT genre, star_rating, movie_title\nFROM ",
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
        "text": ", ",
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
          "FlightSchedule",
          "Books",
          "MovieReviews"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "ORDER BY",
          "GROUP BY",
          "RANK BY"
        ]
      },
      "slot3": {
        "correct": "genre ASC",
        "options": [
          "genre DESC",
          "1",
          "genre ASC_1",
          "genre ASC"
        ]
      },
      "slot4": {
        "correct": "star_rating DESC;",
        "options": [
          "star_rating DESC;_1",
          "star_rating DESC FIRST;",
          "star_rating DESC;",
          "star_rating ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Sort movie reviews by genre, then by star rating highest first.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on MovieReviews."
  },
  {
    "id": 229,
    "levelDisplay": "Level 29",
    "title": "Level 29: Syntax #229: Order flights by origin airport, then chronologically by departure time",
    "subtitle": "Order flights by origin airport, then chronologically by departure time.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.3 Multi-Column Sorting",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Order flights by origin airport, then chronologically by departure time.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT origin_airport, departure_time, flight_id\nFROM FlightSchedule\nORDER BY origin_airport ASC, departure_time ASC;",
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
        "text": ", departure_time, flight_id\nFROM FlightSchedule\n",
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
        "correct": "origin_airport",
        "options": [
          "flight_id",
          "dest_airport",
          "departure_time",
          "origin_airport"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "INDEX BY",
          "ORDER BY",
          "ARRANGE BY",
          "SORT BY"
        ]
      },
      "slot3": {
        "correct": "origin_airport ASC, departure_time ASC;",
        "options": [
          "origin_airport ASC AND departure_time ASC;",
          "origin_airport ASC, departure_time ASC;_1",
          "origin_airport DESC, departure_time DESC;",
          "origin_airport ASC, departure_time ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Order flights by origin airport, then chronologically by departure time.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on FlightSchedule."
  },
  {
    "id": 230,
    "levelDisplay": "Level 30",
    "title": "Level 30: Syntax #230: Sort clinic patients by species, then by weight from heaviest to lightest",
    "subtitle": "Sort clinic patients by species, then by weight from heaviest to lightest.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.3 Multi-Column Sorting",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort clinic patients by species, then by weight from heaviest to lightest.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT species, weight_kg, pet_name\nFROM PetClinic\nORDER BY species ASC, weight_kg DESC;",
    "template": [
      {
        "text": "SELECT species, weight_kg, pet_name\nFROM ",
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
        "text": ", ",
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
          "MusicTracks",
          "Students",
          "MovieReviews"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "GROUP BY",
          "SORT BY",
          "RANK BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "species ASC",
        "options": [
          "species ASC",
          "species DESC",
          "1",
          "species ASC_1"
        ]
      },
      "slot4": {
        "correct": "weight_kg DESC;",
        "options": [
          "weight_kg DESC FIRST;",
          "weight_kg DESC;_1",
          "weight_kg DESC;",
          "weight_kg ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort clinic patients by species, then by weight from heaviest to lightest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.3 Multi-Column Sorting on PetClinic."
  },
  {
    "id": 231,
    "levelDisplay": "Level 31",
    "title": "Level 31: Syntax #231: Sort by city with student_id as a deterministic primary key tie-breaker",
    "subtitle": "Sort by city with student_id as a deterministic primary key tie-breaker.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort by city with student_id as a deterministic primary key tie-breaker.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT city, student_id, full_name\nFROM Students\nORDER BY city ASC, student_id ASC;",
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
        "text": ", student_id, full_name\nFROM Students\n",
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
        "correct": "city",
        "options": [
          "major",
          "city",
          "full_name",
          "last_name"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ARRANGE BY",
          "SORT BY",
          "ORDER BY",
          "INDEX BY"
        ]
      },
      "slot3": {
        "correct": "city ASC, student_id ASC;",
        "options": [
          "city ASC, student_id ASC;",
          "city DESC, student_id DESC;",
          "city ASC AND student_id ASC;",
          "city ASC, student_id ASC;_1"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Sort by city with student_id as a deterministic primary key tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on Students."
  },
  {
    "id": 232,
    "levelDisplay": "Level 32",
    "title": "Level 32: Syntax #232: Sort books by genre with book_id tie-breaker to prevent row-hopping",
    "subtitle": "Sort books by genre with book_id tie-breaker to prevent row-hopping.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort books by genre with book_id tie-breaker to prevent row-hopping.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT genre, book_id, title\nFROM Books\nORDER BY genre ASC, book_id ASC;",
    "template": [
      {
        "text": "SELECT genre, book_id, title\nFROM ",
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
        "text": ", ",
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
          "Employees",
          "Books",
          "FlightSchedule",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "GROUP BY",
          "SORT BY",
          "RANK BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "genre ASC",
        "options": [
          "genre ASC_1",
          "genre DESC",
          "genre ASC",
          "1"
        ]
      },
      "slot4": {
        "correct": "book_id ASC;",
        "options": [
          "book_id ASC;_1",
          "book_id ASC;",
          "book_id DESC;",
          "book_id ASC FIRST;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Sort books by genre with book_id tie-breaker to prevent row-hopping.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on Books."
  },
  {
    "id": 233,
    "levelDisplay": "Level 33",
    "title": "Level 33: Syntax #233: Order by department with emp_id tie-breaker",
    "subtitle": "Order by department with emp_id tie-breaker.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Order by department with emp_id tie-breaker.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT department, emp_id, first_name\nFROM Employees\nORDER BY department ASC, emp_id ASC;",
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
        "text": ", emp_id, first_name\nFROM Employees\n",
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
        "correct": "department",
        "options": [
          "bonus",
          "department",
          "hire_date",
          "emp_id"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "ARRANGE BY",
          "INDEX BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "department ASC, emp_id ASC;",
        "options": [
          "department DESC, emp_id DESC;",
          "department ASC, emp_id ASC;_1",
          "department ASC AND emp_id ASC;",
          "department ASC, emp_id ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Order by department with emp_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on Employees."
  },
  {
    "id": 234,
    "levelDisplay": "Level 34",
    "title": "Level 34: Syntax #234: Sort grocery items by category with unique item_id tie-breaker",
    "subtitle": "Sort grocery items by category with unique item_id tie-breaker.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort grocery items by category with unique item_id tie-breaker.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT category, item_id, item_name\nFROM GroceryItems\nORDER BY category ASC, item_id ASC;",
    "template": [
      {
        "text": "SELECT category, item_id, item_name\nFROM ",
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
        "text": ", ",
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
          "Students",
          "GroceryItems",
          "MusicTracks"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "RANK BY",
          "GROUP BY",
          "ORDER BY",
          "SORT BY"
        ]
      },
      "slot3": {
        "correct": "category ASC",
        "options": [
          "category ASC_1",
          "category DESC",
          "category ASC",
          "1"
        ]
      },
      "slot4": {
        "correct": "item_id ASC;",
        "options": [
          "item_id ASC;",
          "item_id ASC;_1",
          "item_id DESC;",
          "item_id ASC FIRST;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Sort grocery items by category with unique item_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on GroceryItems."
  },
  {
    "id": 235,
    "levelDisplay": "Level 35",
    "title": "Level 35: Syntax #235: Order by status with order_id tie-breaker",
    "subtitle": "Order by status with order_id tie-breaker.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Order by status with order_id tie-breaker.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_status, order_id, customer_name\nFROM Orders\nORDER BY order_status ASC, order_id ASC;",
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
        "text": ", order_id, customer_name\nFROM Orders\n",
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
        "correct": "order_status",
        "options": [
          "shipping_city",
          "order_status",
          "customer_name",
          "unit_price"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "ORDER BY",
          "INDEX BY",
          "ARRANGE BY"
        ]
      },
      "slot3": {
        "correct": "order_status ASC, order_id ASC;",
        "options": [
          "order_status ASC AND order_id ASC;",
          "order_status DESC, order_id DESC;",
          "order_status ASC, order_id ASC;",
          "order_status ASC, order_id ASC;_1"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Order by status with order_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on Orders."
  },
  {
    "id": 236,
    "levelDisplay": "Level 36",
    "title": "Level 36: Syntax #236: Sort by artist name with track_id tie-breaker",
    "subtitle": "Sort by artist name with track_id tie-breaker.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort by artist name with track_id tie-breaker.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT artist_name, track_id, track_title\nFROM MusicTracks\nORDER BY artist_name ASC, track_id ASC;",
    "template": [
      {
        "text": "SELECT artist_name, track_id, track_title\nFROM ",
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
        "text": ", ",
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
          "MusicTracks",
          "Students",
          "GymMembers"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "GROUP BY",
          "ORDER BY",
          "RANK BY"
        ]
      },
      "slot3": {
        "correct": "artist_name ASC",
        "options": [
          "1",
          "artist_name ASC",
          "artist_name ASC_1",
          "artist_name DESC"
        ]
      },
      "slot4": {
        "correct": "track_id ASC;",
        "options": [
          "track_id ASC FIRST;",
          "track_id DESC;",
          "track_id ASC;",
          "track_id ASC;_1"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Sort by artist name with track_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on MusicTracks."
  },
  {
    "id": 237,
    "levelDisplay": "Level 37",
    "title": "Level 37: Syntax #237: Sort by membership plan with member_id tie-breaker",
    "subtitle": "Sort by membership plan with member_id tie-breaker.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort by membership plan with member_id tie-breaker.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT membership_plan, member_id, member_name\nFROM GymMembers\nORDER BY membership_plan ASC, member_id ASC;",
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
        "text": ", member_id, member_name\nFROM GymMembers\n",
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
        "correct": "membership_plan",
        "options": [
          "membership_plan",
          "joined_date",
          "member_id",
          "member_name"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "INDEX BY",
          "ARRANGE BY",
          "SORT BY"
        ]
      },
      "slot3": {
        "correct": "membership_plan ASC, member_id ASC;",
        "options": [
          "membership_plan ASC AND member_id ASC;",
          "membership_plan ASC, member_id ASC;_1",
          "membership_plan ASC, member_id ASC;",
          "membership_plan DESC, member_id DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Sort by membership plan with member_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on GymMembers."
  },
  {
    "id": 238,
    "levelDisplay": "Level 38",
    "title": "Level 38: Syntax #238: Sort by director with review_id tie-breaker",
    "subtitle": "Sort by director with review_id tie-breaker.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort by director with review_id tie-breaker.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT director, review_id, movie_title\nFROM MovieReviews\nORDER BY director ASC, review_id ASC;",
    "template": [
      {
        "text": "SELECT director, review_id, movie_title\nFROM ",
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
        "text": ", ",
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
          "MusicTracks",
          "Students",
          "FlightSchedule",
          "MovieReviews"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "RANK BY"
        ]
      },
      "slot3": {
        "correct": "director ASC",
        "options": [
          "director ASC",
          "director ASC_1",
          "director DESC",
          "1"
        ]
      },
      "slot4": {
        "correct": "review_id ASC;",
        "options": [
          "review_id ASC;_1",
          "review_id ASC;",
          "review_id DESC;",
          "review_id ASC FIRST;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Sort by director with review_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on MovieReviews."
  },
  {
    "id": 239,
    "levelDisplay": "Level 39",
    "title": "Level 39: Syntax #239: Sort by airline with flight_id tie-breaker",
    "subtitle": "Sort by airline with flight_id tie-breaker.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort by airline with flight_id tie-breaker.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT airline, flight_id\nFROM FlightSchedule\nORDER BY airline ASC, flight_id ASC;",
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
        "text": ", flight_id\nFROM FlightSchedule\n",
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
        "correct": "airline",
        "options": [
          "departure_time",
          "flight_id",
          "airline",
          "ticket_price"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "ARRANGE BY",
          "INDEX BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "airline ASC, flight_id ASC;",
        "options": [
          "airline ASC, flight_id ASC;",
          "airline DESC, flight_id DESC;",
          "airline ASC AND flight_id ASC;",
          "airline ASC, flight_id ASC;_1"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Sort by airline with flight_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on FlightSchedule."
  },
  {
    "id": 240,
    "levelDisplay": "Level 40",
    "title": "Level 40: Syntax #240: Sort by owner city with pet_id tie-breaker",
    "subtitle": "Sort by owner city with pet_id tie-breaker.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.4 Deterministic Tie-Breakers",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Sort by owner city with pet_id tie-breaker.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT owner_city, pet_id, pet_name\nFROM PetClinic\nORDER BY owner_city ASC, pet_id ASC;",
    "template": [
      {
        "text": "SELECT owner_city, pet_id, pet_name\nFROM ",
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
        "text": ", ",
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
          "Employees",
          "GroceryItems"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "RANK BY"
        ]
      },
      "slot3": {
        "correct": "owner_city ASC",
        "options": [
          "owner_city ASC_1",
          "1",
          "owner_city DESC",
          "owner_city ASC"
        ]
      },
      "slot4": {
        "correct": "pet_id ASC;",
        "options": [
          "pet_id ASC;_1",
          "pet_id ASC FIRST;",
          "pet_id ASC;",
          "pet_id DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort by owner city with pet_id tie-breaker.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.4 Deterministic Tie-Breakers on PetClinic."
  },
  {
    "id": 241,
    "levelDisplay": "Level 41",
    "title": "Level 41: Syntax #241: Calculate inventory value and sort by the alias inventory_val descending",
    "subtitle": "Calculate inventory value and sort by the alias inventory_val descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Calculate inventory value and sort by the alias inventory_val descending.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, price, stock_qty, (price * stock_qty) AS inventory_val\nFROM Books\nORDER BY inventory_val DESC;",
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
        "text": ", price, stock_qty, (price * stock_qty) AS inventory_val\nFROM Books\n",
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
          "published_year",
          "book_id",
          "genre"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "ARRANGE BY",
          "INDEX BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "inventory_val DESC;",
        "options": [
          "inventory_val DESC;_1",
          "inventory_val ASC;",
          "inventory_val DESC;_2",
          "inventory_val DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Calculate inventory value and sort by the alias inventory_val descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on Books."
  },
  {
    "id": 242,
    "levelDisplay": "Level 42",
    "title": "Level 42: Syntax #242: Compute order subtotal and sort by the alias subtotal descending",
    "subtitle": "Compute order subtotal and sort by the alias subtotal descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Compute order subtotal and sort by the alias subtotal descending.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, unit_price, quantity, (unit_price * quantity) AS subtotal\nFROM Orders\nORDER BY subtotal DESC;",
    "template": [
      {
        "text": "SELECT order_id, unit_price, quantity, (unit_price * quantity) AS subtotal\nFROM ",
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
        "text": ", ",
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
          "FlightSchedule",
          "Orders",
          "Students",
          "Books"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "GROUP BY",
          "RANK BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "subtotal DESC",
        "options": [
          "subtotal ASC",
          "subtotal DESC_1",
          "subtotal DESC",
          "1"
        ]
      },
      "slot4": {
        "correct": "2 ASC;",
        "options": [
          "2 ASC;",
          "2 ASC;_1",
          "2 DESC;",
          "2 ASC FIRST;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Compute order subtotal and sort by the alias subtotal descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on Orders."
  },
  {
    "id": 243,
    "levelDisplay": "Level 43",
    "title": "Level 43: Syntax #243: Compute total compensation (salary + bonus) and sort by total_comp descending",
    "subtitle": "Compute total compensation (salary + bonus) and sort by total_comp descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Compute total compensation (salary + bonus) and sort by total_comp descending.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, salary, bonus, (salary + COALESCE(bonus, 0)) AS total_comp\nFROM Employees\nORDER BY total_comp DESC;",
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
        "text": ", salary, bonus, (salary + COALESCE(bonus, 0)) AS total_comp\nFROM Employees\n",
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
          "first_name",
          "hire_date",
          "bonus",
          "department"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ARRANGE BY",
          "ORDER BY",
          "INDEX BY",
          "SORT BY"
        ]
      },
      "slot3": {
        "correct": "total_comp DESC;",
        "options": [
          "total_comp DESC;_1",
          "total_comp DESC;_2",
          "total_comp DESC;",
          "total_comp ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Compute total compensation (salary + bonus) and sort by total_comp descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on Employees."
  },
  {
    "id": 244,
    "levelDisplay": "Level 44",
    "title": "Level 44: Syntax #244: Calculate tax_price and sort by the alias tax_price ascending",
    "subtitle": "Calculate tax_price and sort by the alias tax_price ascending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Calculate tax_price and sort by the alias tax_price ascending.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, unit_price, (unit_price * 1.08) AS tax_price\nFROM GroceryItems\nORDER BY tax_price ASC;",
    "template": [
      {
        "text": "SELECT item_name, unit_price, (unit_price * 1.08) AS tax_price\nFROM ",
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
        "text": ", ",
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
          "Students",
          "Books",
          "FlightSchedule",
          "GroceryItems"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "GROUP BY",
          "RANK BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "tax_price ASC",
        "options": [
          "1",
          "tax_price ASC_1",
          "tax_price ASC",
          "tax_price DESC"
        ]
      },
      "slot4": {
        "correct": "2 ASC;",
        "options": [
          "2 ASC;",
          "2 ASC;_1",
          "2 ASC FIRST;",
          "2 DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Calculate tax_price and sort by the alias tax_price ascending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on GroceryItems."
  },
  {
    "id": 245,
    "levelDisplay": "Level 45",
    "title": "Level 45: Syntax #245: Compute pct_score and sort by pct_score descending",
    "subtitle": "Compute pct_score and sort by pct_score descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Intermediate",
    "task": "Compute pct_score and sort by pct_score descending.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, gpa, (gpa * 25.0) AS pct_score\nFROM Students\nORDER BY pct_score DESC;",
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
        "text": ", gpa, (gpa * 25.0) AS pct_score\nFROM Students\n",
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
        "correct": "full_name",
        "options": [
          "major",
          "enrolled_year",
          "full_name",
          "city"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "INDEX BY",
          "ARRANGE BY",
          "SORT BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "pct_score DESC;",
        "options": [
          "pct_score DESC;_1",
          "pct_score DESC;_2",
          "pct_score DESC;",
          "pct_score ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Compute pct_score and sort by pct_score descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on Students."
  },
  {
    "id": 246,
    "levelDisplay": "Level 46",
    "title": "Level 46: Syntax #246: Convert to minutes and sort by the alias mins descending",
    "subtitle": "Convert to minutes and sort by the alias mins descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Convert to minutes and sort by the alias mins descending.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, duration_seconds, (duration_seconds / 60.0) AS mins\nFROM MusicTracks\nORDER BY mins DESC;",
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
        "text": ", duration_seconds, (duration_seconds / 60.0) AS mins\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "artist",
          "track_title",
          "track_id",
          "genre"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "FlightSchedule",
          "MusicTracks",
          "PetClinic",
          "Books"
        ]
      },
      "slot3": {
        "correct": "mins",
        "options": [
          "mins",
          "1",
          "LENGTH(mins)",
          "2"
        ]
      },
      "slot4": {
        "correct": "DESC;",
        "options": [
          "ASC;",
          "DESC;_1",
          "AUTO;",
          "DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Convert to minutes and sort by the alias mins descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on MusicTracks."
  },
  {
    "id": 247,
    "levelDisplay": "Level 47",
    "title": "Level 47: Syntax #247: Compute annual dues and sort by annual_dues ascending",
    "subtitle": "Compute annual dues and sort by annual_dues ascending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Compute annual dues and sort by annual_dues ascending.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, monthly_fee, (monthly_fee * 12) AS annual_dues\nFROM GymMembers\nORDER BY annual_dues ASC;",
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
        "text": ", monthly_fee, (monthly_fee * 12) AS annual_dues\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "monthly_fee",
          "visits_this_month",
          "member_name",
          "member_id"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "MusicTracks",
          "GroceryItems",
          "GymMembers",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "annual_dues",
        "options": [
          "LENGTH(annual_dues)",
          "1",
          "annual_dues",
          "2"
        ]
      },
      "slot4": {
        "correct": "ASC;",
        "options": [
          "ASC;",
          "ASC;_1",
          "DESC;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Compute annual dues and sort by annual_dues ascending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on GymMembers."
  },
  {
    "id": 248,
    "levelDisplay": "Level 48",
    "title": "Level 48: Syntax #248: Add baggage fee to ticket price and sort by total_fare ascending",
    "subtitle": "Add baggage fee to ticket price and sort by total_fare ascending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Add baggage fee to ticket price and sort by total_fare ascending.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, ticket_price, (ticket_price + 35.00) AS total_fare\nFROM FlightSchedule\nORDER BY total_fare ASC;",
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
        "text": ", ticket_price, (ticket_price + 35.00) AS total_fare\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "departure_time",
          "dest_airport",
          "flight_id",
          "airline"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "MusicTracks",
          "Students",
          "FlightSchedule",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "total_fare",
        "options": [
          "total_fare",
          "1",
          "2",
          "LENGTH(total_fare)"
        ]
      },
      "slot4": {
        "correct": "ASC;",
        "options": [
          "ASC;",
          "DESC;",
          "ASC;_1",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Add baggage fee to ticket price and sort by total_fare ascending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on FlightSchedule."
  },
  {
    "id": 249,
    "levelDisplay": "Level 49",
    "title": "Level 49: Syntax #249: Convert weight to lbs and sort by lbs descending",
    "subtitle": "Convert weight to lbs and sort by lbs descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Convert weight to lbs and sort by lbs descending.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, weight_kg, (weight_kg * 2.20462) AS lbs\nFROM PetClinic\nORDER BY lbs DESC;",
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
        "text": ", weight_kg, (weight_kg * 2.20462) AS lbs\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "is_vaccinated",
          "species",
          "pet_name",
          "weight_kg"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "MovieReviews",
          "PetClinic",
          "Students",
          "Employees"
        ]
      },
      "slot3": {
        "correct": "lbs",
        "options": [
          "2",
          "LENGTH(lbs)",
          "lbs",
          "1"
        ]
      },
      "slot4": {
        "correct": "DESC;",
        "options": [
          "DESC;_1",
          "AUTO;",
          "ASC;",
          "DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Convert weight to lbs and sort by lbs descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on PetClinic."
  },
  {
    "id": 250,
    "levelDisplay": "Level 50",
    "title": "Level 50: Syntax #250: Compute movie age and sort by age ascending (newest films first)",
    "subtitle": "Compute movie age and sort by age ascending (newest films first).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.5 Sorting by Aliases & Calculations",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Compute movie age and sort by age ascending (newest films first).",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, release_year, (2026 - release_year) AS age\nFROM MovieReviews\nORDER BY age ASC;",
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
        "text": ", release_year, (2026 - release_year) AS age\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "movie_title",
          "release_year",
          "star_rating"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "GymMembers",
          "Employees",
          "MusicTracks",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "age",
        "options": [
          "2",
          "1",
          "LENGTH(age)",
          "age"
        ]
      },
      "slot4": {
        "correct": "ASC;",
        "options": [
          "ASC;",
          "DESC;",
          "ASC;_1",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Compute movie age and sort by age ascending (newest films first).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.5 Sorting by Aliases & Calculations on MovieReviews."
  },
  {
    "id": 251,
    "levelDisplay": "Level 51",
    "title": "Level 51: Syntax #251: Sort students by the character length of their full name from longest to shortest",
    "subtitle": "Sort students by the character length of their full name from longest to shortest.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.6 Sorting by Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort students by the character length of their full name from longest to shortest.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name\nFROM Students\nORDER BY LENGTH(full_name) DESC;",
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
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "enrolled_year",
          "major",
          "first_name",
          "full_name"
        ]
      },
      "slot2": {
        "correct": "Students",
        "options": [
          "GroceryItems",
          "GymMembers",
          "Employees",
          "Students"
        ]
      },
      "slot3": {
        "correct": "LENGTH(full_name)",
        "options": [
          "LENGTH(LENGTH(full_name))",
          "1",
          "LENGTH(full_name)",
          "2"
        ]
      },
      "slot4": {
        "correct": "DESC;",
        "options": [
          "DESC;_1",
          "AUTO;",
          "DESC;",
          "ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Sort students by the character length of their full name from longest to shortest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on Students."
  },
  {
    "id": 252,
    "levelDisplay": "Level 52",
    "title": "Level 52: Syntax #252: Sort book titles by character length from shortest to longest",
    "subtitle": "Sort book titles by character length from shortest to longest.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.6 Sorting by Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort book titles by character length from shortest to longest.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title\nFROM Books\nORDER BY LENGTH(title) ASC;",
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
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "title",
          "author",
          "published_year",
          "genre"
        ]
      },
      "slot2": {
        "correct": "Books",
        "options": [
          "Students",
          "GymMembers",
          "MusicTracks",
          "Books"
        ]
      },
      "slot3": {
        "correct": "LENGTH(title)",
        "options": [
          "1",
          "2",
          "LENGTH(LENGTH(title))",
          "LENGTH(title)"
        ]
      },
      "slot4": {
        "correct": "ASC;",
        "options": [
          "ASC;_1",
          "DESC;",
          "ASC;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Sort book titles by character length from shortest to longest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on Books."
  },
  {
    "id": 253,
    "levelDisplay": "Level 53",
    "title": "Level 53: Syntax #253: Order employees by hire year descending, then hire month descending",
    "subtitle": "Order employees by hire year descending, then hire month descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.6 Sorting by Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Order employees by hire year descending, then hire month descending.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, hire_date\nFROM Employees\nORDER BY YEAR(hire_date) DESC, MONTH(hire_date) DESC;",
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
        "text": ", hire_date\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "last_name",
          "bonus",
          "first_name"
        ]
      },
      "slot2": {
        "correct": "Employees",
        "options": [
          "GymMembers",
          "Students",
          "Employees",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "YEAR(hire_date)",
        "options": [
          "2",
          "YEAR(hire_date)",
          "LENGTH(YEAR(hire_date))",
          "1"
        ]
      },
      "slot4": {
        "correct": "DESC, MONTH(hire_date) DESC;",
        "options": [
          "AUTO;",
          "DESC, MONTH(hire_date) DESC;",
          "DESC;",
          "ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Order employees by hire year descending, then hire month descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on Employees."
  },
  {
    "id": 254,
    "levelDisplay": "Level 54",
    "title": "Level 54: Syntax #254: Sort grocery items by their rounded whole-dollar unit price descending",
    "subtitle": "Sort grocery items by their rounded whole-dollar unit price descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.6 Sorting by Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort grocery items by their rounded whole-dollar unit price descending.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY ROUND(unit_price) DESC;",
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
        "text": "\nORDER BY ",
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
          "item_name",
          "stock_qty",
          "unit_price"
        ]
      },
      "slot2": {
        "correct": "GroceryItems",
        "options": [
          "Employees",
          "PetClinic",
          "MovieReviews",
          "GroceryItems"
        ]
      },
      "slot3": {
        "correct": "ROUND(unit_price)",
        "options": [
          "LENGTH(ROUND(unit_price))",
          "ROUND(unit_price)",
          "1",
          "2"
        ]
      },
      "slot4": {
        "correct": "DESC;",
        "options": [
          "DESC;",
          "ASC;",
          "AUTO;",
          "DESC;_1"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Sort grocery items by their rounded whole-dollar unit price descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on GroceryItems."
  },
  {
    "id": 255,
    "levelDisplay": "Level 55",
    "title": "Level 55: Syntax #255: Sort customer names in case-insensitive alphabetical order using LOWER()",
    "subtitle": "Sort customer names in case-insensitive alphabetical order using LOWER().",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.6 Sorting by Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort customer names in case-insensitive alphabetical order using LOWER().",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT customer_name\nFROM Orders\nORDER BY LOWER(customer_name) ASC;",
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
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
        "correct": "customer_name",
        "options": [
          "unit_price",
          "order_status",
          "discount_pct",
          "customer_name"
        ]
      },
      "slot2": {
        "correct": "Orders",
        "options": [
          "GroceryItems",
          "Books",
          "PetClinic",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "LOWER(customer_name)",
        "options": [
          "2",
          "1",
          "LENGTH(LOWER(customer_name))",
          "LOWER(customer_name)"
        ]
      },
      "slot4": {
        "correct": "ASC;",
        "options": [
          "DESC;",
          "ASC;",
          "AUTO;",
          "ASC;_1"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Sort customer names in case-insensitive alphabetical order using LOWER().",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on Orders."
  },
  {
    "id": 256,
    "levelDisplay": "Level 56",
    "title": "Level 56: Syntax #256: Sort song titles by character count from longest to shortest",
    "subtitle": "Sort song titles by character count from longest to shortest.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.6 Sorting by Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort song titles by character count from longest to shortest.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title\nFROM MusicTracks\nORDER BY LENGTH(track_title) DESC;",
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
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "release_year",
          "artist",
          "track_id",
          "track_title"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "MusicTracks",
          "GymMembers",
          "GroceryItems",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "LENGTH(track_title)",
        "options": [
          "1",
          "2",
          "LENGTH(LENGTH(track_title))",
          "LENGTH(track_title)"
        ]
      },
      "slot4": {
        "correct": "DESC;",
        "options": [
          "DESC;_1",
          "DESC;",
          "AUTO;",
          "ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Sort song titles by character count from longest to shortest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on MusicTracks."
  },
  {
    "id": 257,
    "levelDisplay": "Level 57",
    "title": "Level 57: Syntax #257: Order gym members chronologically by the year they joined",
    "subtitle": "Order gym members chronologically by the year they joined.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.6 Sorting by Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Order gym members chronologically by the year they joined.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, join_date\nFROM GymMembers\nORDER BY YEAR(join_date) ASC;",
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
        "text": ", join_date\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "monthly_fee",
          "member_id",
          "visits_this_month",
          "member_name"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "GymMembers",
          "Employees",
          "MusicTracks",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "YEAR(join_date)",
        "options": [
          "LENGTH(YEAR(join_date))",
          "2",
          "1",
          "YEAR(join_date)"
        ]
      },
      "slot4": {
        "correct": "ASC;",
        "options": [
          "DESC;",
          "ASC;_1",
          "ASC;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Order gym members chronologically by the year they joined.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on GymMembers."
  },
  {
    "id": 258,
    "levelDisplay": "Level 58",
    "title": "Level 58: Syntax #258: Sort movie reviews by rounded star rating descending",
    "subtitle": "Sort movie reviews by rounded star rating descending.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.6 Sorting by Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort movie reviews by rounded star rating descending.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY ROUND(star_rating) DESC;",
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
        "text": "\nORDER BY ",
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
          "release_year",
          "director",
          "movie_title",
          "review_count"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "Orders",
          "GroceryItems",
          "MovieReviews",
          "Employees"
        ]
      },
      "slot3": {
        "correct": "ROUND(star_rating)",
        "options": [
          "2",
          "1",
          "ROUND(star_rating)",
          "LENGTH(ROUND(star_rating))"
        ]
      },
      "slot4": {
        "correct": "DESC;",
        "options": [
          "DESC;_1",
          "DESC;",
          "ASC;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Sort movie reviews by rounded star rating descending.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on MovieReviews."
  },
  {
    "id": 259,
    "levelDisplay": "Level 59",
    "title": "Level 59: Syntax #259: Sort origin airport codes alphabetically using UPPER()",
    "subtitle": "Sort origin airport codes alphabetically using UPPER().",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.6 Sorting by Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort origin airport codes alphabetically using UPPER().",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, origin_airport\nFROM FlightSchedule\nORDER BY UPPER(origin_airport) ASC;",
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
        "text": ", origin_airport\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "destination_airport",
          "origin_airport",
          "flight_id",
          "departure_time"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "GymMembers",
          "FlightSchedule",
          "Books",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "UPPER(origin_airport)",
        "options": [
          "LENGTH(UPPER(origin_airport))",
          "2",
          "1",
          "UPPER(origin_airport)"
        ]
      },
      "slot4": {
        "correct": "ASC;",
        "options": [
          "DESC;",
          "AUTO;",
          "ASC;",
          "ASC;_1"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Sort origin airport codes alphabetically using UPPER().",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on FlightSchedule."
  },
  {
    "id": 260,
    "levelDisplay": "Level 60",
    "title": "Level 60: Syntax #260: Sort pet names by length from shortest to longest",
    "subtitle": "Sort pet names by length from shortest to longest.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.6 Sorting by Functions",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort pet names by length from shortest to longest.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name\nFROM PetClinic\nORDER BY LENGTH(pet_name) ASC;",
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
        "text": "\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "breed",
          "is_vaccinated",
          "weight_kg"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "MusicTracks",
          "GymMembers",
          "Students",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "LENGTH(pet_name)",
        "options": [
          "LENGTH(pet_name)",
          "2",
          "LENGTH(LENGTH(pet_name))",
          "1"
        ]
      },
      "slot4": {
        "correct": "ASC;",
        "options": [
          "ASC;_1",
          "ASC;",
          "DESC;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort pet names by length from shortest to longest.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.6 Sorting by Functions on PetClinic."
  },
  {
    "id": 261,
    "levelDisplay": "Level 61",
    "title": "Level 61: Syntax #261: Sort by column position: 1st column (city) ASC, 2nd column (full_name) ASC",
    "subtitle": "Sort by column position: 1st column (city) ASC, 2nd column (full_name) ASC.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort by column position: 1st column (city) ASC, 2nd column (full_name) ASC.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT city, full_name\nFROM Students\nORDER BY 1 ASC, 2 ASC;",
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
        "text": ", full_name\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "major",
          "last_name",
          "full_name",
          "city"
        ]
      },
      "slot2": {
        "correct": "Students",
        "options": [
          "GroceryItems",
          "FlightSchedule",
          "GymMembers",
          "Students"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "2",
          "LENGTH(1)",
          "1_1"
        ]
      },
      "slot4": {
        "correct": "ASC, 2 ASC;",
        "options": [
          "ASC, 2 ASC;",
          "DESC;",
          "ASC;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Sort by column position: 1st column (city) ASC, 2nd column (full_name) ASC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on Students."
  },
  {
    "id": 262,
    "levelDisplay": "Level 62",
    "title": "Level 62: Syntax #262: Sort by position: 1st column (genre) ASC, 2nd column (price) DESC",
    "subtitle": "Sort by position: 1st column (genre) ASC, 2nd column (price) DESC.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort by position: 1st column (genre) ASC, 2nd column (price) DESC.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT genre, price\nFROM Books\nORDER BY 1 ASC, 2 DESC;",
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
        "text": "\nORDER BY ",
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
          "genre",
          "stock_qty",
          "author",
          "published_year"
        ]
      },
      "slot2": {
        "correct": "Books",
        "options": [
          "Books",
          "MovieReviews",
          "Employees",
          "Students"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1_1",
          "LENGTH(1)",
          "1",
          "2"
        ]
      },
      "slot4": {
        "correct": "ASC, 2 DESC;",
        "options": [
          "ASC, 2 DESC;",
          "ASC;",
          "DESC;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Sort by position: 1st column (genre) ASC, 2nd column (price) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on Books."
  },
  {
    "id": 263,
    "levelDisplay": "Level 63",
    "title": "Level 63: Syntax #263: Sort by position: 1st column (department) ASC, 2nd column (salary) DESC",
    "subtitle": "Sort by position: 1st column (department) ASC, 2nd column (salary) DESC.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort by position: 1st column (department) ASC, 2nd column (salary) DESC.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT department, salary\nFROM Employees\nORDER BY 1 ASC, 2 DESC;",
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
        "text": ", salary\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "department",
          "bonus",
          "last_name",
          "emp_id"
        ]
      },
      "slot2": {
        "correct": "Employees",
        "options": [
          "FlightSchedule",
          "Books",
          "Employees",
          "GymMembers"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "LENGTH(1)",
          "2",
          "1_1"
        ]
      },
      "slot4": {
        "correct": "ASC, 2 DESC;",
        "options": [
          "ASC, 2 DESC;",
          "AUTO;",
          "DESC;",
          "ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Sort by position: 1st column (department) ASC, 2nd column (salary) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on Employees."
  },
  {
    "id": 264,
    "levelDisplay": "Level 64",
    "title": "Level 64: Syntax #264: Sort by position: 1st column (category) ASC, 2nd column (item_name) ASC",
    "subtitle": "Sort by position: 1st column (category) ASC, 2nd column (item_name) ASC.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort by position: 1st column (category) ASC, 2nd column (item_name) ASC.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT category, item_name\nFROM GroceryItems\nORDER BY 1 ASC, 2 ASC;",
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
        "text": ", item_name\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
        "correct": "category",
        "options": [
          "category",
          "stock_qty",
          "is_organic",
          "calories"
        ]
      },
      "slot2": {
        "correct": "GroceryItems",
        "options": [
          "GroceryItems",
          "Employees",
          "FlightSchedule",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "1_1",
          "2",
          "LENGTH(1)"
        ]
      },
      "slot4": {
        "correct": "ASC, 2 ASC;",
        "options": [
          "DESC;",
          "ASC;",
          "AUTO;",
          "ASC, 2 ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Sort by position: 1st column (category) ASC, 2nd column (item_name) ASC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on GroceryItems."
  },
  {
    "id": 265,
    "levelDisplay": "Level 65",
    "title": "Level 65: Syntax #265: Sort by position: 1st column (shipping_city) ASC, 2nd column (unit_price) DESC",
    "subtitle": "Sort by position: 1st column (shipping_city) ASC, 2nd column (unit_price) DESC.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort by position: 1st column (shipping_city) ASC, 2nd column (unit_price) DESC.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT shipping_city, unit_price\nFROM Orders\nORDER BY 1 ASC, 2 DESC;",
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
        "text": "\nORDER BY ",
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
        "correct": "shipping_city",
        "options": [
          "unit_price",
          "order_status",
          "shipping_city",
          "customer_name"
        ]
      },
      "slot2": {
        "correct": "Orders",
        "options": [
          "PetClinic",
          "MovieReviews",
          "Orders",
          "GroceryItems"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "LENGTH(1)",
          "2",
          "1",
          "1_1"
        ]
      },
      "slot4": {
        "correct": "ASC, 2 DESC;",
        "options": [
          "DESC;",
          "AUTO;",
          "ASC;",
          "ASC, 2 DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Sort by position: 1st column (shipping_city) ASC, 2nd column (unit_price) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on Orders."
  },
  {
    "id": 266,
    "levelDisplay": "Level 66",
    "title": "Level 66: Syntax #266: Sort by position: 1st column (genre) ASC, 2nd column (play_count) DESC",
    "subtitle": "Sort by position: 1st column (genre) ASC, 2nd column (play_count) DESC.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort by position: 1st column (genre) ASC, 2nd column (play_count) DESC.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT genre, play_count\nFROM MusicTracks\nORDER BY 1 ASC, 2 DESC;",
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
        "text": "\nORDER BY ",
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
          "genre",
          "track_title",
          "artist_name",
          "duration_seconds"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "GroceryItems",
          "MovieReviews",
          "MusicTracks",
          "Students"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1_1",
          "LENGTH(1)",
          "2",
          "1"
        ]
      },
      "slot4": {
        "correct": "ASC, 2 DESC;",
        "options": [
          "DESC;",
          "ASC;",
          "ASC, 2 DESC;",
          "AUTO;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Sort by position: 1st column (genre) ASC, 2nd column (play_count) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on MusicTracks."
  },
  {
    "id": 267,
    "levelDisplay": "Level 67",
    "title": "Level 67: Syntax #267: Sort by position: 1st column (plan) ASC, 2nd column (fee) ASC",
    "subtitle": "Sort by position: 1st column (plan) ASC, 2nd column (fee) ASC.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort by position: 1st column (plan) ASC, 2nd column (fee) ASC.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT membership_plan, monthly_fee\nFROM GymMembers\nORDER BY 1 ASC, 2 ASC;",
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
        "text": "\nORDER BY ",
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
          "membership_plan",
          "visits_this_month",
          "has_trainer",
          "member_name"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "GymMembers",
          "GroceryItems",
          "Employees",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "2",
          "1",
          "LENGTH(1)",
          "1_1"
        ]
      },
      "slot4": {
        "correct": "ASC, 2 ASC;",
        "options": [
          "ASC;",
          "AUTO;",
          "DESC;",
          "ASC, 2 ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Sort by position: 1st column (plan) ASC, 2nd column (fee) ASC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on GymMembers."
  },
  {
    "id": 268,
    "levelDisplay": "Level 68",
    "title": "Level 68: Syntax #268: Sort by position: 1st column (genre) ASC, 2nd column (star_rating) DESC",
    "subtitle": "Sort by position: 1st column (genre) ASC, 2nd column (star_rating) DESC.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort by position: 1st column (genre) ASC, 2nd column (star_rating) DESC.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT genre, star_rating\nFROM MovieReviews\nORDER BY 1 ASC, 2 DESC;",
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
        "text": "\nORDER BY ",
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
          "star_rating",
          "genre",
          "review_id",
          "release_year"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "MovieReviews",
          "Students",
          "Orders",
          "Books"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "2",
          "1_1",
          "LENGTH(1)",
          "1"
        ]
      },
      "slot4": {
        "correct": "ASC, 2 DESC;",
        "options": [
          "AUTO;",
          "DESC;",
          "ASC, 2 DESC;",
          "ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Sort by position: 1st column (genre) ASC, 2nd column (star_rating) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on MovieReviews."
  },
  {
    "id": 269,
    "levelDisplay": "Level 69",
    "title": "Level 69: Syntax #269: Sort by position: 1st column (origin) ASC, 2nd column (dest) ASC",
    "subtitle": "Sort by position: 1st column (origin) ASC, 2nd column (dest) ASC.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort by position: 1st column (origin) ASC, 2nd column (dest) ASC.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT origin_airport, dest_airport\nFROM FlightSchedule\nORDER BY 1 ASC, 2 ASC;",
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
        "text": ", dest_airport\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
        "correct": "origin_airport",
        "options": [
          "airline",
          "origin_airport",
          "ticket_price",
          "departure_time"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "Employees",
          "FlightSchedule",
          "Students",
          "GymMembers"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "2",
          "LENGTH(1)",
          "1_1"
        ]
      },
      "slot4": {
        "correct": "ASC, 2 ASC;",
        "options": [
          "AUTO;",
          "DESC;",
          "ASC, 2 ASC;",
          "ASC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Sort by position: 1st column (origin) ASC, 2nd column (dest) ASC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on FlightSchedule."
  },
  {
    "id": 270,
    "levelDisplay": "Level 70",
    "title": "Level 70: Syntax #270: Sort by position: 1st column (species) ASC, 2nd column (weight) DESC",
    "subtitle": "Sort by position: 1st column (species) ASC, 2nd column (weight) DESC.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.7 Positional Sorting (ORDER BY 1, 2)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Sort by position: 1st column (species) ASC, 2nd column (weight) DESC.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT species, weight_kg\nFROM PetClinic\nORDER BY 1 ASC, 2 DESC;",
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
        "text": ", weight_kg\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nORDER BY ",
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
          "species",
          "pet_id",
          "age_years",
          "weight_kg"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "PetClinic",
          "MusicTracks",
          "Books",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "1",
        "options": [
          "1",
          "LENGTH(1)",
          "2",
          "1_1"
        ]
      },
      "slot4": {
        "correct": "ASC, 2 DESC;",
        "options": [
          "AUTO;",
          "ASC, 2 DESC;",
          "ASC;",
          "DESC;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Sort by position: 1st column (species) ASC, 2nd column (weight) DESC.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.7 Positional Sorting (ORDER BY 1, 2) on PetClinic."
  },
  {
    "id": 271,
    "levelDisplay": "Level 71",
    "title": "Level 71: Syntax #271: Find the single top-scoring student (Valedictorian) using ORDER BY gpa DESC LIMIT 1",
    "subtitle": "Find the single top-scoring student (Valedictorian) using ORDER BY gpa DESC LIMIT 1.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Find the single top-scoring student (Valedictorian) using ORDER BY gpa DESC LIMIT 1.",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nORDER BY gpa DESC\nLIMIT 1;",
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
        "text": " gpa DESC\n",
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
          "MovieReviews",
          "GroceryItems",
          "Students",
          "FlightSchedule"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "FILTER BY",
          "SORT BY",
          "ORDER BY",
          "LIMIT BY"
        ]
      },
      "slot3": {
        "correct": "LIMIT",
        "options": [
          "FETCH",
          "LIMIT",
          "MAX",
          "TOP"
        ]
      },
      "slot4": {
        "correct": "1;",
        "options": [
          "1;_1",
          "1;",
          "100;",
          "6;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Find the single top-scoring student (Valedictorian) using ORDER BY gpa DESC LIMIT 1.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on Students."
  },
  {
    "id": 272,
    "levelDisplay": "Level 72",
    "title": "Level 72: Syntax #272: Find the Top 3 most expensive books in the bookstore",
    "subtitle": "Find the Top 3 most expensive books in the bookstore.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Find the Top 3 most expensive books in the bookstore.",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, price\nFROM Books\nORDER BY price DESC\nLIMIT 3;",
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
        "text": " price DESC\n",
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
          "GroceryItems",
          "Students",
          "Employees",
          "Books"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "SORT BY",
          "FILTER BY",
          "LIMIT BY"
        ]
      },
      "slot3": {
        "correct": "LIMIT",
        "options": [
          "MAX",
          "FETCH",
          "TOP",
          "LIMIT"
        ]
      },
      "slot4": {
        "correct": "3;",
        "options": [
          "100;",
          "3;",
          "1;",
          "8;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Find the Top 3 most expensive books in the bookstore.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on Books."
  },
  {
    "id": 273,
    "levelDisplay": "Level 73",
    "title": "Level 73: Syntax #273: Retrieve the Top 5 highest-paid employees in the company",
    "subtitle": "Retrieve the Top 5 highest-paid employees in the company.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Retrieve the Top 5 highest-paid employees in the company.",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, salary\nFROM Employees\nORDER BY salary DESC\nLIMIT 5;",
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
        "text": " salary DESC\n",
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
          "Employees",
          "FlightSchedule",
          "Students",
          "GymMembers"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "FILTER BY",
          "LIMIT BY",
          "SORT BY",
          "ORDER BY"
        ]
      },
      "slot3": {
        "correct": "LIMIT",
        "options": [
          "LIMIT",
          "FETCH",
          "MAX",
          "TOP"
        ]
      },
      "slot4": {
        "correct": "5;",
        "options": [
          "1;",
          "5;",
          "100;",
          "10;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Retrieve the Top 5 highest-paid employees in the company.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on Employees."
  },
  {
    "id": 274,
    "levelDisplay": "Level 74",
    "title": "Level 74: Syntax #274: Find the 3 cheapest grocery items in the store",
    "subtitle": "Find the 3 cheapest grocery items in the store.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Find the 3 cheapest grocery items in the store.",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY unit_price ASC\nLIMIT 3;",
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
        "text": " unit_price ASC\n",
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
          "Books",
          "Students",
          "MovieReviews"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "ORDER BY",
          "LIMIT BY",
          "FILTER BY"
        ]
      },
      "slot3": {
        "correct": "LIMIT",
        "options": [
          "LIMIT",
          "FETCH",
          "MAX",
          "TOP"
        ]
      },
      "slot4": {
        "correct": "3;",
        "options": [
          "3;",
          "100;",
          "1;",
          "8;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Find the 3 cheapest grocery items in the store.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on GroceryItems."
  },
  {
    "id": 275,
    "levelDisplay": "Level 75",
    "title": "Level 75: Syntax #275: Find the 5 largest customer orders by quantity",
    "subtitle": "Find the 5 largest customer orders by quantity.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Advanced",
    "task": "Find the 5 largest customer orders by quantity.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, quantity\nFROM Orders\nORDER BY quantity DESC\nLIMIT 5;",
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
        "text": " quantity DESC\n",
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
          "GroceryItems",
          "FlightSchedule",
          "Orders"
        ]
      },
      "slot2": {
        "correct": "ORDER BY",
        "options": [
          "FILTER BY",
          "ORDER BY",
          "SORT BY",
          "LIMIT BY"
        ]
      },
      "slot3": {
        "correct": "LIMIT",
        "options": [
          "LIMIT",
          "FETCH",
          "MAX",
          "TOP"
        ]
      },
      "slot4": {
        "correct": "5;",
        "options": [
          "100;",
          "10;",
          "5;",
          "1;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Find the 5 largest customer orders by quantity.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on Orders."
  },
  {
    "id": 276,
    "levelDisplay": "Level 76",
    "title": "Level 76: Syntax #276: Fetch the Top 10 most played tracks for the streaming leaderboard",
    "subtitle": "Fetch the Top 10 most played tracks for the streaming leaderboard.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fetch the Top 10 most played tracks for the streaming leaderboard.",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, play_count\nFROM MusicTracks\nORDER BY play_count DESC\nLIMIT 10;",
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
        "text": "\n",
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
          "track_id",
          "artist",
          "genre"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "MusicTracks",
          "Employees",
          "GroceryItems",
          "Students"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "RANK BY",
          "GROUP BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "play_count DESC",
        "options": [
          "play_count ASC",
          "play_count DESC_1",
          "play_count DESC",
          "1 ASC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 10;",
        "options": [
          "LIMIT 10;",
          "TOP 10;",
          "LIMIT 1;",
          "FETCH 10;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Fetch the Top 10 most played tracks for the streaming leaderboard.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on MusicTracks."
  },
  {
    "id": 277,
    "levelDisplay": "Level 77",
    "title": "Level 77: Syntax #277: Identify the Top 3 most active gym members of the month",
    "subtitle": "Identify the Top 3 most active gym members of the month.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Identify the Top 3 most active gym members of the month.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, visits_this_month\nFROM GymMembers\nORDER BY visits_this_month DESC\nLIMIT 3;",
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
        "text": "\n",
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
          "joined_date",
          "monthly_fee",
          "member_id",
          "member_name"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "MusicTracks",
          "Students",
          "GymMembers",
          "Books"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "ORDER BY",
          "GROUP BY",
          "RANK BY"
        ]
      },
      "slot4": {
        "correct": "visits_this_month DESC",
        "options": [
          "visits_this_month ASC",
          "1 ASC",
          "visits_this_month DESC_1",
          "visits_this_month DESC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 3;",
        "options": [
          "FETCH 3;",
          "LIMIT 3;",
          "LIMIT 1;",
          "TOP 3;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Identify the Top 3 most active gym members of the month.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on GymMembers."
  },
  {
    "id": 278,
    "levelDisplay": "Level 78",
    "title": "Level 78: Syntax #278: Display the Top 5 highest-rated movies of all time",
    "subtitle": "Display the Top 5 highest-rated movies of all time.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Display the Top 5 highest-rated movies of all time.",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY star_rating DESC\nLIMIT 5;",
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
      },
      {
        "text": "\n",
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
          "director",
          "review_id",
          "star_rating",
          "movie_title"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "FlightSchedule",
          "Orders",
          "MovieReviews",
          "GroceryItems"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "SORT BY",
          "GROUP BY",
          "RANK BY"
        ]
      },
      "slot4": {
        "correct": "star_rating DESC",
        "options": [
          "star_rating DESC",
          "star_rating DESC_1",
          "star_rating ASC",
          "1 ASC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 5;",
        "options": [
          "TOP 5;",
          "LIMIT 5;",
          "FETCH 5;",
          "LIMIT 1;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Display the Top 5 highest-rated movies of all time.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on MovieReviews."
  },
  {
    "id": 279,
    "levelDisplay": "Level 79",
    "title": "Level 79: Syntax #279: Find the 3 flights with the worst arrival delays",
    "subtitle": "Find the 3 flights with the worst arrival delays.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Find the 3 flights with the worst arrival delays.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, delay_minutes\nFROM FlightSchedule\nORDER BY delay_minutes DESC\nLIMIT 3;",
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
        "text": "\n",
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
          "destination_airport",
          "dest_airport",
          "flight_id",
          "ticket_price"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "Orders",
          "MovieReviews",
          "PetClinic",
          "FlightSchedule"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "ORDER BY",
          "RANK BY",
          "GROUP BY"
        ]
      },
      "slot4": {
        "correct": "delay_minutes DESC",
        "options": [
          "delay_minutes DESC_1",
          "delay_minutes ASC",
          "delay_minutes DESC",
          "1 ASC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 3;",
        "options": [
          "LIMIT 1;",
          "LIMIT 3;",
          "TOP 3;",
          "FETCH 3;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Find the 3 flights with the worst arrival delays.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on FlightSchedule."
  },
  {
    "id": 280,
    "levelDisplay": "Level 80",
    "title": "Level 80: Syntax #280: Find the single heaviest animal patient registered at the clinic",
    "subtitle": "Find the single heaviest animal patient registered at the clinic.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.8 Truncation & Top-N (LIMIT)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Find the single heaviest animal patient registered at the clinic.",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, weight_kg\nFROM PetClinic\nORDER BY weight_kg DESC\nLIMIT 1;",
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
        "text": ", weight_kg\nFROM ",
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
        "text": "\n",
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
          "pet_id",
          "pet_name",
          "breed"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "PetClinic",
          "FlightSchedule",
          "Employees",
          "Students"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "RANK BY",
          "ORDER BY",
          "GROUP BY",
          "SORT BY"
        ]
      },
      "slot4": {
        "correct": "weight_kg DESC",
        "options": [
          "weight_kg ASC",
          "weight_kg DESC_1",
          "1 ASC",
          "weight_kg DESC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 1;",
        "options": [
          "LIMIT 1;_1",
          "FETCH 1;",
          "LIMIT 1;",
          "TOP 1;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Find the single heaviest animal patient registered at the clinic.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.8 Truncation & Top-N (LIMIT) on PetClinic."
  },
  {
    "id": 281,
    "levelDisplay": "Level 81",
    "title": "Level 81: Syntax #281: Fetch Page 1 of the student directory (5 rows, skip 0)",
    "subtitle": "Fetch Page 1 of the student directory (5 rows, skip 0).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fetch Page 1 of the student directory (5 rows, skip 0).",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT student_id, full_name\nFROM Students\nORDER BY student_id ASC\nLIMIT 5 OFFSET 0;",
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
        "text": ", full_name\nFROM ",
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
        "text": " student_id ASC\n",
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
        "correct": "student_id",
        "options": [
          "city",
          "full_name",
          "student_id",
          "last_name"
        ]
      },
      "slot2": {
        "correct": "Students",
        "options": [
          "Employees",
          "Students",
          "Books",
          "FlightSchedule"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "PAGINATE BY",
          "SORT BY",
          "GROUP BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 5",
        "options": [
          "TOP 5",
          "ROWS 5",
          "LIMIT 5",
          "LIMIT 5_1"
        ]
      },
      "slot5": {
        "correct": "OFFSET 0;",
        "options": [
          "OFFSET 0;",
          "SKIP 0;",
          "PAGE 1;",
          "OFFSET 10;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Fetch Page 1 of the student directory (5 rows, skip 0).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Students."
  },
  {
    "id": 282,
    "levelDisplay": "Level 82",
    "title": "Level 82: Syntax #282: Fetch Page 2 of the student directory (5 rows, skip 5)",
    "subtitle": "Fetch Page 2 of the student directory (5 rows, skip 5).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fetch Page 2 of the student directory (5 rows, skip 5).",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT student_id, full_name\nFROM Students\nORDER BY student_id ASC\nLIMIT 5 OFFSET 5;",
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
        "text": ", full_name\nFROM ",
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
        "text": " student_id ASC\n",
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
        "correct": "student_id",
        "options": [
          "enrolled_year",
          "age",
          "student_id",
          "major"
        ]
      },
      "slot2": {
        "correct": "Students",
        "options": [
          "Students",
          "Books",
          "Orders",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "PAGINATE BY",
          "SORT BY",
          "ORDER BY",
          "GROUP BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 5",
        "options": [
          "ROWS 5",
          "LIMIT 5_1",
          "TOP 5",
          "LIMIT 5"
        ]
      },
      "slot5": {
        "correct": "OFFSET 5;",
        "options": [
          "OFFSET 5;",
          "OFFSET 15;",
          "PAGE 1;",
          "SKIP 5;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Fetch Page 2 of the student directory (5 rows, skip 5).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Students."
  },
  {
    "id": 283,
    "levelDisplay": "Level 83",
    "title": "Level 83: Syntax #283: Fetch Page 1 of the book catalog (5 rows, skip 0)",
    "subtitle": "Fetch Page 1 of the book catalog (5 rows, skip 0).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fetch Page 1 of the book catalog (5 rows, skip 0).",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT book_id, title\nFROM Books\nORDER BY book_id ASC\nLIMIT 5 OFFSET 0;",
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
        "text": ", title\nFROM ",
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
        "text": " book_id ASC\n",
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
        "correct": "book_id",
        "options": [
          "genre",
          "published_year",
          "price",
          "book_id"
        ]
      },
      "slot2": {
        "correct": "Books",
        "options": [
          "MusicTracks",
          "GymMembers",
          "MovieReviews",
          "Books"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "SORT BY",
          "GROUP BY",
          "PAGINATE BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 5",
        "options": [
          "ROWS 5",
          "TOP 5",
          "LIMIT 5",
          "LIMIT 5_1"
        ]
      },
      "slot5": {
        "correct": "OFFSET 0;",
        "options": [
          "SKIP 0;",
          "OFFSET 0;",
          "OFFSET 10;",
          "PAGE 1;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Fetch Page 1 of the book catalog (5 rows, skip 0).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Books."
  },
  {
    "id": 284,
    "levelDisplay": "Level 84",
    "title": "Level 84: Syntax #284: Fetch Page 2 of the book catalog (5 rows, skip 5)",
    "subtitle": "Fetch Page 2 of the book catalog (5 rows, skip 5).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fetch Page 2 of the book catalog (5 rows, skip 5).",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT book_id, title\nFROM Books\nORDER BY book_id ASC\nLIMIT 5 OFFSET 5;",
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
        "text": ", title\nFROM ",
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
        "text": " book_id ASC\n",
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
        "correct": "book_id",
        "options": [
          "book_id",
          "stock_qty",
          "price",
          "published_year"
        ]
      },
      "slot2": {
        "correct": "Books",
        "options": [
          "Students",
          "FlightSchedule",
          "GroceryItems",
          "Books"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "PAGINATE BY",
          "GROUP BY",
          "ORDER BY",
          "SORT BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 5",
        "options": [
          "LIMIT 5",
          "LIMIT 5_1",
          "TOP 5",
          "ROWS 5"
        ]
      },
      "slot5": {
        "correct": "OFFSET 5;",
        "options": [
          "OFFSET 15;",
          "OFFSET 5;",
          "SKIP 5;",
          "PAGE 1;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Fetch Page 2 of the book catalog (5 rows, skip 5).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Books."
  },
  {
    "id": 285,
    "levelDisplay": "Level 85",
    "title": "Level 85: Syntax #285: Fetch Page 2 of the employee roster (page size 4, offset 4)",
    "subtitle": "Fetch Page 2 of the employee roster (page size 4, offset 4).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fetch Page 2 of the employee roster (page size 4, offset 4).",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT emp_id, first_name\nFROM Employees\nORDER BY emp_id ASC\nLIMIT 4 OFFSET 4;",
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
        "text": ", first_name\nFROM ",
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
        "text": " emp_id ASC\n",
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
        "correct": "emp_id",
        "options": [
          "first_name",
          "last_name",
          "salary",
          "emp_id"
        ]
      },
      "slot2": {
        "correct": "Employees",
        "options": [
          "FlightSchedule",
          "GymMembers",
          "Employees",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "PAGINATE BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 4",
        "options": [
          "ROWS 4",
          "LIMIT 5",
          "TOP 4",
          "LIMIT 4"
        ]
      },
      "slot5": {
        "correct": "OFFSET 4;",
        "options": [
          "OFFSET 4;",
          "OFFSET 14;",
          "SKIP 4;",
          "PAGE 1;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Fetch Page 2 of the employee roster (page size 4, offset 4).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Employees."
  },
  {
    "id": 286,
    "levelDisplay": "Level 86",
    "title": "Level 86: Syntax #286: Fetch Page 3 of the grocery items list (page size 5, offset 10)",
    "subtitle": "Fetch Page 3 of the grocery items list (page size 5, offset 10).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fetch Page 3 of the grocery items list (page size 5, offset 10).",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_id, item_name\nFROM GroceryItems\nORDER BY item_id ASC\nLIMIT 5 OFFSET 10;",
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
        "text": ", item_name\nFROM ",
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
        "text": " item_id ASC\n",
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
        "correct": "item_id",
        "options": [
          "is_organic",
          "item_name",
          "category",
          "item_id"
        ]
      },
      "slot2": {
        "correct": "GroceryItems",
        "options": [
          "Books",
          "GroceryItems",
          "PetClinic",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "PAGINATE BY",
          "SORT BY",
          "GROUP BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 5",
        "options": [
          "ROWS 5",
          "LIMIT 5_1",
          "TOP 5",
          "LIMIT 5"
        ]
      },
      "slot5": {
        "correct": "OFFSET 10;",
        "options": [
          "SKIP 10;",
          "OFFSET 10;",
          "OFFSET 20;",
          "PAGE 1;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Fetch Page 3 of the grocery items list (page size 5, offset 10).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on GroceryItems."
  },
  {
    "id": 287,
    "levelDisplay": "Level 87",
    "title": "Level 87: Syntax #287: Fetch Page 2 of the track list (page size 5, skip 5)",
    "subtitle": "Fetch Page 2 of the track list (page size 5, skip 5).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fetch Page 2 of the track list (page size 5, skip 5).",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_id, track_title\nFROM MusicTracks\nORDER BY track_id ASC\nLIMIT 5 OFFSET 5;",
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
        "text": ", track_title\nFROM ",
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
        "text": " track_id ASC\n",
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
        "correct": "track_id",
        "options": [
          "title",
          "release_year",
          "track_id",
          "track_title"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "FlightSchedule",
          "Orders",
          "Students",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "PAGINATE BY",
          "SORT BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 5",
        "options": [
          "ROWS 5",
          "LIMIT 5",
          "LIMIT 5_1",
          "TOP 5"
        ]
      },
      "slot5": {
        "correct": "OFFSET 5;",
        "options": [
          "OFFSET 15;",
          "SKIP 5;",
          "OFFSET 5;",
          "PAGE 1;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Fetch Page 2 of the track list (page size 5, skip 5).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on MusicTracks."
  },
  {
    "id": 288,
    "levelDisplay": "Level 88",
    "title": "Level 88: Syntax #288: Fetch Page 3 of order history (page size 3, skip 6)",
    "subtitle": "Fetch Page 3 of order history (page size 3, skip 6).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fetch Page 3 of order history (page size 3, skip 6).",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, customer_name\nFROM Orders\nORDER BY order_id ASC\nLIMIT 3 OFFSET 6;",
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
        "text": ", customer_name\nFROM ",
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
        "text": " order_id ASC\n",
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
        "correct": "order_id",
        "options": [
          "order_id",
          "product_name",
          "unit_price",
          "quantity"
        ]
      },
      "slot2": {
        "correct": "Orders",
        "options": [
          "Orders",
          "MusicTracks",
          "FlightSchedule",
          "GymMembers"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "PAGINATE BY",
          "GROUP BY",
          "SORT BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 3",
        "options": [
          "ROWS 3",
          "LIMIT 3",
          "LIMIT 5",
          "TOP 3"
        ]
      },
      "slot5": {
        "correct": "OFFSET 6;",
        "options": [
          "PAGE 1;",
          "SKIP 6;",
          "OFFSET 6;",
          "OFFSET 16;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Fetch Page 3 of order history (page size 3, skip 6).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on Orders."
  },
  {
    "id": 289,
    "levelDisplay": "Level 89",
    "title": "Level 89: Syntax #289: Fetch Page 1 of gym memberships (page size 4, skip 0)",
    "subtitle": "Fetch Page 1 of gym memberships (page size 4, skip 0).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fetch Page 1 of gym memberships (page size 4, skip 0).",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_id, member_name\nFROM GymMembers\nORDER BY member_id ASC\nLIMIT 4 OFFSET 0;",
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
        "text": ", member_name\nFROM ",
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
        "text": " member_id ASC\n",
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
        "correct": "member_id",
        "options": [
          "joined_date",
          "visits_this_month",
          "monthly_fee",
          "member_id"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "GymMembers",
          "Students",
          "FlightSchedule",
          "GroceryItems"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "PAGINATE BY",
          "GROUP BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 4",
        "options": [
          "LIMIT 5",
          "LIMIT 4",
          "TOP 4",
          "ROWS 4"
        ]
      },
      "slot5": {
        "correct": "OFFSET 0;",
        "options": [
          "PAGE 1;",
          "OFFSET 0;",
          "SKIP 0;",
          "OFFSET 10;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Fetch Page 1 of gym memberships (page size 4, skip 0).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on GymMembers."
  },
  {
    "id": 290,
    "levelDisplay": "Level 90",
    "title": "Level 90: Syntax #290: Fetch Page 2 of clinic patient records (page size 5, skip 5)",
    "subtitle": "Fetch Page 2 of clinic patient records (page size 5, skip 5).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.9 Pagination Slices (LIMIT & OFFSET)",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fetch Page 2 of clinic patient records (page size 5, skip 5).",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_id, pet_name\nFROM PetClinic\nORDER BY pet_id ASC\nLIMIT 5 OFFSET 5;",
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
        "text": ", pet_name\nFROM ",
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
        "text": " pet_id ASC\n",
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
        "correct": "pet_id",
        "options": [
          "is_vaccinated",
          "age_years",
          "pet_id",
          "pet_name"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "MovieReviews",
          "Books",
          "PetClinic",
          "Students"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "PAGINATE BY",
          "GROUP BY",
          "SORT BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 5",
        "options": [
          "LIMIT 5_1",
          "TOP 5",
          "LIMIT 5",
          "ROWS 5"
        ]
      },
      "slot5": {
        "correct": "OFFSET 5;",
        "options": [
          "SKIP 5;",
          "OFFSET 5;",
          "PAGE 1;",
          "OFFSET 15;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Fetch Page 2 of clinic patient records (page size 5, skip 5).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.9 Pagination Slices (LIMIT & OFFSET) on PetClinic."
  },
  {
    "id": 291,
    "levelDisplay": "Level 91",
    "title": "Level 91: Syntax #291: Fix the clause sequence error: 'LIMIT 5 ORDER BY price DESC;' (ORDER BY must precede LIMIT)",
    "subtitle": "Fix the clause sequence error: 'LIMIT 5 ORDER BY price DESC;' (ORDER BY must precede LIMIT).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fix the clause sequence error: 'LIMIT 5 ORDER BY price DESC;' (ORDER BY must precede LIMIT).",
    "table": "Books",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT title, price\nFROM Books\nORDER BY price DESC\nLIMIT 5;",
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
        "text": "\n",
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
          "title",
          "published_year",
          "genre",
          "is_hardcover"
        ]
      },
      "slot2": {
        "correct": "Books",
        "options": [
          "PetClinic",
          "Orders",
          "Books",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "SORT BY",
          "RANK BY"
        ]
      },
      "slot4": {
        "correct": "price DESC",
        "options": [
          "price DESC",
          "1 ASC",
          "price ASC",
          "price DESC_1"
        ]
      },
      "slot5": {
        "correct": "LIMIT 5;",
        "options": [
          "LIMIT 5;",
          "LIMIT 1;",
          "TOP 5;",
          "FETCH 5;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Books: Fix the clause sequence error: 'LIMIT 5 ORDER BY price DESC;' (ORDER BY must precede LIMIT).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on Books."
  },
  {
    "id": 292,
    "levelDisplay": "Level 92",
    "title": "Level 92: Syntax #292: Fix the misspelled sort order keyword: 'ORDER BY gpa DESENDING;' (must be DESC)",
    "subtitle": "Fix the misspelled sort order keyword: 'ORDER BY gpa DESENDING;' (must be DESC).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fix the misspelled sort order keyword: 'ORDER BY gpa DESENDING;' (must be DESC).",
    "table": "Students",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT full_name, gpa\nFROM Students\nORDER BY gpa DESC;",
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
      },
      {
        "text": "\n",
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
          "enrolled_year",
          "major",
          "gpa",
          "full_name"
        ]
      },
      "slot2": {
        "correct": "Students",
        "options": [
          "Books",
          "Students",
          "Orders",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "SORT BY",
          "RANK BY"
        ]
      },
      "slot4": {
        "correct": "gpa DESC",
        "options": [
          "gpa DESC",
          "gpa DESC_1",
          "1 ASC",
          "gpa ASC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 10;",
        "options": [
          "LIMIT 1;",
          "TOP 10;",
          "LIMIT 10;",
          "FETCH 10;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Students: Fix the misspelled sort order keyword: 'ORDER BY gpa DESENDING;' (must be DESC).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on Students."
  },
  {
    "id": 293,
    "levelDisplay": "Level 93",
    "title": "Level 93: Syntax #293: Fix missing ORDER BY when requesting top record: 'SELECT first_name, salary FROM Employees LIMIT 1;' (produces arbitrary row without ORDER BY)",
    "subtitle": "Fix missing ORDER BY when requesting top record: 'SELECT first_name, salary FROM Employees LIMIT 1;' (produces arbitrary row without ORDER BY).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fix missing ORDER BY when requesting top record: 'SELECT first_name, salary FROM Employees LIMIT 1;' (produces arbitrary row without ORDER BY).",
    "table": "Employees",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT first_name, salary\nFROM Employees\nORDER BY salary DESC\nLIMIT 1;",
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
        "text": ", salary\nFROM ",
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
        "text": "\n",
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
        "correct": "first_name",
        "options": [
          "emp_id",
          "bonus",
          "first_name",
          "hire_date"
        ]
      },
      "slot2": {
        "correct": "Employees",
        "options": [
          "MusicTracks",
          "Orders",
          "Employees",
          "GroceryItems"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "RANK BY",
          "SORT BY",
          "GROUP BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "salary DESC",
        "options": [
          "salary ASC",
          "salary DESC_1",
          "1 ASC",
          "salary DESC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 1;",
        "options": [
          "TOP 1;",
          "LIMIT 1;_1",
          "LIMIT 1;",
          "FETCH 1;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Employees: Fix missing ORDER BY when requesting top record: 'SELECT first_name, salary FROM Employees LIMIT 1;' (produces arbitrary row without ORDER BY).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on Employees."
  },
  {
    "id": 294,
    "levelDisplay": "Level 94",
    "title": "Level 94: Syntax #294: Fix missing BY keyword: 'ORDER unit_price ASC;' (must be ORDER BY)",
    "subtitle": "Fix missing BY keyword: 'ORDER unit_price ASC;' (must be ORDER BY).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fix missing BY keyword: 'ORDER unit_price ASC;' (must be ORDER BY).",
    "table": "GroceryItems",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT item_name, unit_price\nFROM GroceryItems\nORDER BY unit_price ASC;",
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
        "text": "\n",
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
          "item_name",
          "category",
          "stock_qty"
        ]
      },
      "slot2": {
        "correct": "GroceryItems",
        "options": [
          "MovieReviews",
          "Employees",
          "GroceryItems",
          "FlightSchedule"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "RANK BY",
          "ORDER BY",
          "SORT BY",
          "GROUP BY"
        ]
      },
      "slot4": {
        "correct": "unit_price ASC",
        "options": [
          "unit_price DESC",
          "unit_price ASC",
          "unit_price ASC_1",
          "1 ASC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 10;",
        "options": [
          "FETCH 10;",
          "TOP 10;",
          "LIMIT 10;",
          "LIMIT 1;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GroceryItems: Fix missing BY keyword: 'ORDER unit_price ASC;' (must be ORDER BY).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on GroceryItems."
  },
  {
    "id": 295,
    "levelDisplay": "Level 95",
    "title": "Level 95: Syntax #295: Fix syntax error sorting by computed expression: ensure total alias is recognized in ORDER BY",
    "subtitle": "Fix syntax error sorting by computed expression: ensure total alias is recognized in ORDER BY.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fix syntax error sorting by computed expression: ensure total alias is recognized in ORDER BY.",
    "table": "Orders",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_id, quantity * unit_price AS total\nFROM Orders\nORDER BY total DESC;",
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
        "text": ", quantity * unit_price AS total\nFROM ",
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
        "text": "\n",
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
          "order_status",
          "quantity",
          "order_id",
          "customer_name"
        ]
      },
      "slot2": {
        "correct": "Orders",
        "options": [
          "PetClinic",
          "Employees",
          "MovieReviews",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "ORDER BY",
          "SORT BY",
          "GROUP BY",
          "RANK BY"
        ]
      },
      "slot4": {
        "correct": "total DESC",
        "options": [
          "total DESC",
          "total DESC_1",
          "1 ASC",
          "total ASC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 10;",
        "options": [
          "FETCH 10;",
          "LIMIT 1;",
          "TOP 10;",
          "LIMIT 10;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on Orders: Fix syntax error sorting by computed expression: ensure total alias is recognized in ORDER BY.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on Orders."
  },
  {
    "id": 296,
    "levelDisplay": "Level 96",
    "title": "Level 96: Syntax #296: Fix comma used in OFFSET syntax: 'LIMIT 10, OFFSET 0;' (no comma before OFFSET)",
    "subtitle": "Fix comma used in OFFSET syntax: 'LIMIT 10, OFFSET 0;' (no comma before OFFSET).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fix comma used in OFFSET syntax: 'LIMIT 10, OFFSET 0;' (no comma before OFFSET).",
    "table": "MusicTracks",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT track_title, duration_seconds\nFROM MusicTracks\nORDER BY duration_seconds ASC\nLIMIT 10 OFFSET 0;",
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
        "text": ", duration_seconds\nFROM ",
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
        "text": " duration_seconds ASC\n",
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
          "play_count",
          "artist_name",
          "track_title",
          "title"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "MusicTracks",
          "Students",
          "FlightSchedule",
          "Books"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "GROUP BY",
          "SORT BY",
          "ORDER BY",
          "PAGINATE BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 10",
        "options": [
          "LIMIT 5",
          "ROWS 10",
          "TOP 10",
          "LIMIT 10"
        ]
      },
      "slot5": {
        "correct": "OFFSET 0;",
        "options": [
          "OFFSET 0;",
          "SKIP 0;",
          "OFFSET 10;",
          "PAGE 1;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MusicTracks: Fix comma used in OFFSET syntax: 'LIMIT 10, OFFSET 0;' (no comma before OFFSET).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on MusicTracks."
  },
  {
    "id": 297,
    "levelDisplay": "Level 97",
    "title": "Level 97: Syntax #297: Fix missing comma between multiple sort columns: 'ORDER BY membership_plan ASC visits_this_month DESC;'",
    "subtitle": "Fix missing comma between multiple sort columns: 'ORDER BY membership_plan ASC visits_this_month DESC;'.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fix missing comma between multiple sort columns: 'ORDER BY membership_plan ASC visits_this_month DESC;'.",
    "table": "GymMembers",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT member_name, membership_plan, visits_this_month\nFROM GymMembers\nORDER BY membership_plan ASC, visits_this_month DESC;",
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
        "text": ", membership_plan, visits_this_month\nFROM ",
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
        "text": "\n",
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
          "joined_date",
          "visits_this_month",
          "member_name"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "GroceryItems",
          "MusicTracks",
          "Orders",
          "GymMembers"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "SORT BY",
          "GROUP BY",
          "RANK BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "membership_plan ASC, visits_this_month DESC",
        "options": [
          "membership_plan ASC, visits_this_month ASC",
          "membership_plan DESC, visits_this_month DESC",
          "1 ASC",
          "membership_plan ASC, visits_this_month DESC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 10;",
        "options": [
          "LIMIT 10;",
          "FETCH 10;",
          "LIMIT 1;",
          "TOP 10;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on GymMembers: Fix missing comma between multiple sort columns: 'ORDER BY membership_plan ASC visits_this_month DESC;'.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on GymMembers."
  },
  {
    "id": 298,
    "levelDisplay": "Level 98",
    "title": "Level 98: Syntax #298: Fix invalid position number in ORDER BY: 'ORDER BY 0 DESC;' (column positions are 1-indexed)",
    "subtitle": "Fix invalid position number in ORDER BY: 'ORDER BY 0 DESC;' (column positions are 1-indexed).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fix invalid position number in ORDER BY: 'ORDER BY 0 DESC;' (column positions are 1-indexed).",
    "table": "MovieReviews",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT movie_title, star_rating\nFROM MovieReviews\nORDER BY star_rating DESC\nLIMIT 3;",
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
      },
      {
        "text": "\n",
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
          "review_count",
          "director",
          "review_id",
          "movie_title"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "PetClinic",
          "MusicTracks",
          "Orders",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "RANK BY",
          "ORDER BY",
          "GROUP BY",
          "SORT BY"
        ]
      },
      "slot4": {
        "correct": "star_rating DESC",
        "options": [
          "star_rating DESC_1",
          "1 ASC",
          "star_rating DESC",
          "star_rating ASC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 3;",
        "options": [
          "LIMIT 3;",
          "LIMIT 1;",
          "FETCH 3;",
          "TOP 3;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on MovieReviews: Fix invalid position number in ORDER BY: 'ORDER BY 0 DESC;' (column positions are 1-indexed).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on MovieReviews."
  },
  {
    "id": 299,
    "levelDisplay": "Level 99",
    "title": "Level 99: Syntax #299: Fix semicolon placed before ORDER BY: 'FROM FlightSchedule; ORDER BY departure_time ASC;'",
    "subtitle": "Fix semicolon placed before ORDER BY: 'FROM FlightSchedule; ORDER BY departure_time ASC;'.",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fix semicolon placed before ORDER BY: 'FROM FlightSchedule; ORDER BY departure_time ASC;'.",
    "table": "FlightSchedule",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT flight_id, departure_time\nFROM FlightSchedule\nORDER BY departure_time ASC;",
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
        "text": ", departure_time\nFROM ",
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
        "text": "\n",
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
          "departure_time",
          "flight_id",
          "ticket_price",
          "airline"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "MovieReviews",
          "Orders",
          "FlightSchedule",
          "Employees"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "RANK BY",
          "SORT BY"
        ]
      },
      "slot4": {
        "correct": "departure_time ASC",
        "options": [
          "departure_time DESC",
          "departure_time ASC_1",
          "1 ASC",
          "departure_time ASC"
        ]
      },
      "slot5": {
        "correct": "LIMIT 10;",
        "options": [
          "TOP 10;",
          "LIMIT 10;",
          "LIMIT 1;",
          "FETCH 10;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on FlightSchedule: Fix semicolon placed before ORDER BY: 'FROM FlightSchedule; ORDER BY departure_time ASC;'.",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on FlightSchedule."
  },
  {
    "id": 300,
    "levelDisplay": "Level 100",
    "title": "Level 100: Syntax #300: Fix reversed LIMIT and OFFSET order: 'OFFSET 10 LIMIT 5;' (LIMIT must precede OFFSET in standard SQL)",
    "subtitle": "Fix reversed LIMIT and OFFSET order: 'OFFSET 10 LIMIT 5;' (LIMIT must precede OFFSET in standard SQL).",
    "type": "fill_blank",
    "category": "Section 03: ORDER BY & LIMIT Slicing",
    "subcluster": "3.10 Sorting & Slicing Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master",
    "task": "Fix reversed LIMIT and OFFSET order: 'OFFSET 10 LIMIT 5;' (LIMIT must precede OFFSET in standard SQL).",
    "table": "PetClinic",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT pet_name, weight_kg\nFROM PetClinic\nORDER BY weight_kg DESC\nLIMIT 5 OFFSET 10;",
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
        "text": ", weight_kg\nFROM ",
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
        "text": " weight_kg DESC\n",
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
          "is_vaccinated",
          "pet_name",
          "weight_kg",
          "pet_id"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "GroceryItems",
          "GymMembers",
          "PetClinic",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "ORDER BY",
        "options": [
          "PAGINATE BY",
          "GROUP BY",
          "ORDER BY",
          "SORT BY"
        ]
      },
      "slot4": {
        "correct": "LIMIT 5",
        "options": [
          "ROWS 5",
          "LIMIT 5_1",
          "TOP 5",
          "LIMIT 5"
        ]
      },
      "slot5": {
        "correct": "OFFSET 10;",
        "options": [
          "SKIP 10;",
          "PAGE 1;",
          "OFFSET 20;",
          "OFFSET 10;"
        ]
      }
    },
    "syntaxRule": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending.",
    "syntaxTrap": "Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "explanation": "ORDER BY comes after WHERE, and LIMIT comes after ORDER BY. ASC is default, DESC is descending. 💡 Trap to avoid: Never place LIMIT before ORDER BY, and always add a unique tie-breaker to prevent row-hopping.",
    "eli5Story": "Sorting and slicing on PetClinic: Fix reversed LIMIT and OFFSET order: 'OFFSET 10 LIMIT 5;' (LIMIT must precede OFFSET in standard SQL).",
    "commonMistakes": "Putting semicolon before ORDER BY, reversing LIMIT and OFFSET, or misplacing DESC.",
    "learningOutcomes": "Mastered 3.10 Sorting & Slicing Bug Hunts on PetClinic."
  }
];
