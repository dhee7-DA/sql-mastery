// =============================================================================
// SECTION 04: AGGREGATIONS & GROUP BY (100 INTERACTIVE MULTI-BLANK QUESTS)
// Progressive Cumulative 3-to-5 Blank Challenge Engine Interleaving Foundations, Filters & Aggregates
// =============================================================================

window.QUESTS_SECTION_4 = [
  {
    "id": 301,
    "levelDisplay": "Level 01",
    "title": "Level 01: Syntax #301: Count the total number of enrolled students across all majors",
    "subtitle": "Count the total number of enrolled students across all majors.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Count the total number of enrolled students across all majors.",
    "xp": 22,
    "table": "Students",
    "scenario": "Count the total number of enrolled students across all majors.",
    "businessObjective": "Count the total number of enrolled students across all majors.",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT COUNT(*) AS total_students\nFROM Students;",
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
        "text": " AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "COUNT(*)",
        "options": [
          "COUNT(*)",
          "SUM(*)",
          "TOTAL(*)",
          "COUNT(ALL)"
        ]
      },
      "slot2": {
        "correct": "total_students",
        "options": [
          "total_students_val",
          "stat_result",
          "total_students",
          "metric"
        ]
      },
      "slot3": {
        "correct": "Students;",
        "options": [
          "Students;",
          "MusicTracks;",
          "MovieReviews;",
          "Orders;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Count the total number of enrolled students across all majors."
  },
  {
    "id": 302,
    "levelDisplay": "Level 02",
    "title": "Level 02: Syntax #302: Count total book titles available in the inventory",
    "subtitle": "Count total book titles available in the inventory.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Count total book titles available in the inventory.",
    "xp": 24,
    "table": "Books",
    "scenario": "Count total book titles available in the inventory.",
    "businessObjective": "Count total book titles available in the inventory.",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT COUNT(book_id) AS total_titles\nFROM Books;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " COUNT(book_id) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SELECT",
        "options": [
          "GET",
          "SELECT",
          "CHOOSE",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "total_titles",
        "options": [
          "result",
          "calculated_num",
          "total_titles",
          "total_titles_summary"
        ]
      },
      "slot3": {
        "correct": "Books;",
        "options": [
          "Books;",
          "MusicTracks;",
          "MovieReviews;",
          "GymMembers;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Count total book titles available in the inventory."
  },
  {
    "id": 303,
    "levelDisplay": "Level 03",
    "title": "Level 03: Syntax #303: Compute the total headcount of all employees in the directory",
    "subtitle": "Compute the total headcount of all employees in the directory.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Compute the total headcount of all employees in the directory.",
    "xp": 26,
    "table": "Employees",
    "scenario": "Compute the total headcount of all employees in the directory.",
    "businessObjective": "Compute the total headcount of all employees in the directory.",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT COUNT(*) AS total_staff\nFROM Employees;",
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
        "text": " AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "COUNT(*)",
        "options": [
          "SUM(*)",
          "COUNT(*)",
          "COUNT(ALL)",
          "TOTAL(*)"
        ]
      },
      "slot2": {
        "correct": "total_staff",
        "options": [
          "stat_result",
          "metric",
          "total_staff",
          "total_staff_val"
        ]
      },
      "slot3": {
        "correct": "Employees;",
        "options": [
          "FlightSchedule;",
          "GroceryItems;",
          "MovieReviews;",
          "Employees;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Compute the total headcount of all employees in the directory."
  },
  {
    "id": 304,
    "levelDisplay": "Level 04",
    "title": "Level 04: Syntax #304: Calculate the total count of grocery items stocked in the store",
    "subtitle": "Calculate the total count of grocery items stocked in the store.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Calculate the total count of grocery items stocked in the store.",
    "xp": 28,
    "table": "GroceryItems",
    "scenario": "Calculate the total count of grocery items stocked in the store.",
    "businessObjective": "Calculate the total count of grocery items stocked in the store.",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT COUNT(item_id) AS total_products\nFROM GroceryItems;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " COUNT(item_id) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SELECT",
        "options": [
          "GET",
          "EXTRACT",
          "SELECT",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "total_products",
        "options": [
          "total_products_summary",
          "calculated_num",
          "result",
          "total_products"
        ]
      },
      "slot3": {
        "correct": "GroceryItems;",
        "options": [
          "GroceryItems;",
          "GymMembers;",
          "Orders;",
          "FlightSchedule;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Calculate the total count of grocery items stocked in the store."
  },
  {
    "id": 305,
    "levelDisplay": "Level 05",
    "title": "Level 05: Syntax #305: Count the total number of orders placed by customers",
    "subtitle": "Count the total number of orders placed by customers.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Count the total number of orders placed by customers.",
    "xp": 30,
    "table": "Orders",
    "scenario": "Count the total number of orders placed by customers.",
    "businessObjective": "Count the total number of orders placed by customers.",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT COUNT(*) AS total_placed_orders\nFROM Orders;",
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
        "text": " AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "COUNT(*)",
        "options": [
          "TOTAL(*)",
          "SUM(*)",
          "COUNT(ALL)",
          "COUNT(*)"
        ]
      },
      "slot2": {
        "correct": "total_placed_orders",
        "options": [
          "metric",
          "stat_result",
          "total_placed_orders_val",
          "total_placed_orders"
        ]
      },
      "slot3": {
        "correct": "Orders;",
        "options": [
          "MovieReviews;",
          "PetClinic;",
          "Orders;",
          "GroceryItems;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Count the total number of orders placed by customers."
  },
  {
    "id": 306,
    "levelDisplay": "Level 06",
    "title": "Level 06: Syntax #306: Count the total number of tracks in the music library",
    "subtitle": "Count the total number of tracks in the music library.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Count the total number of tracks in the music library.",
    "xp": 32,
    "table": "MusicTracks",
    "scenario": "Count the total number of tracks in the music library.",
    "businessObjective": "Count the total number of tracks in the music library.",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT COUNT(track_id) AS track_count\nFROM MusicTracks;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " COUNT(track_id) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SELECT",
        "options": [
          "GET",
          "CHOOSE",
          "EXTRACT",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "track_count",
        "options": [
          "track_count",
          "track_count_summary",
          "calculated_num",
          "result"
        ]
      },
      "slot3": {
        "correct": "MusicTracks;",
        "options": [
          "MusicTracks;",
          "MovieReviews;",
          "Employees;",
          "GymMembers;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Count the total number of tracks in the music library."
  },
  {
    "id": 307,
    "levelDisplay": "Level 07",
    "title": "Level 07: Syntax #307: Count total active and inactive gym member registrations",
    "subtitle": "Count total active and inactive gym member registrations.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Count total active and inactive gym member registrations.",
    "xp": 34,
    "table": "GymMembers",
    "scenario": "Count total active and inactive gym member registrations.",
    "businessObjective": "Count total active and inactive gym member registrations.",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT COUNT(*) AS total_memberships\nFROM GymMembers;",
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
        "text": " AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "COUNT(*)",
        "options": [
          "SUM(*)",
          "COUNT(*)",
          "TOTAL(*)",
          "COUNT(ALL)"
        ]
      },
      "slot2": {
        "correct": "total_memberships",
        "options": [
          "metric",
          "stat_result",
          "total_memberships_val",
          "total_memberships"
        ]
      },
      "slot3": {
        "correct": "GymMembers;",
        "options": [
          "Books;",
          "GymMembers;",
          "Students;",
          "Employees;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Count total active and inactive gym member registrations."
  },
  {
    "id": 308,
    "levelDisplay": "Level 08",
    "title": "Level 08: Syntax #308: Calculate the total number of movie reviews submitted",
    "subtitle": "Calculate the total number of movie reviews submitted.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Calculate the total number of movie reviews submitted.",
    "xp": 36,
    "table": "MovieReviews",
    "scenario": "Calculate the total number of movie reviews submitted.",
    "businessObjective": "Calculate the total number of movie reviews submitted.",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT COUNT(review_id) AS total_reviews_logged\nFROM MovieReviews;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " COUNT(review_id) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SELECT",
        "options": [
          "SELECT",
          "CHOOSE",
          "EXTRACT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "total_reviews_logged",
        "options": [
          "total_reviews_logged_summary",
          "total_reviews_logged",
          "result",
          "calculated_num"
        ]
      },
      "slot3": {
        "correct": "MovieReviews;",
        "options": [
          "MusicTracks;",
          "MovieReviews;",
          "Students;",
          "PetClinic;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Calculate the total number of movie reviews submitted."
  },
  {
    "id": 309,
    "levelDisplay": "Level 09",
    "title": "Level 09: Syntax #309: Count the total number of scheduled flights on the board",
    "subtitle": "Count the total number of scheduled flights on the board.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Count the total number of scheduled flights on the board.",
    "xp": 38,
    "table": "FlightSchedule",
    "scenario": "Count the total number of scheduled flights on the board.",
    "businessObjective": "Count the total number of scheduled flights on the board.",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT COUNT(*) AS scheduled_flights\nFROM FlightSchedule;",
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
        "text": " AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "COUNT(*)",
        "options": [
          "SUM(*)",
          "TOTAL(*)",
          "COUNT(ALL)",
          "COUNT(*)"
        ]
      },
      "slot2": {
        "correct": "scheduled_flights",
        "options": [
          "metric",
          "stat_result",
          "scheduled_flights",
          "scheduled_flights_val"
        ]
      },
      "slot3": {
        "correct": "FlightSchedule;",
        "options": [
          "MovieReviews;",
          "PetClinic;",
          "Students;",
          "FlightSchedule;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Count the total number of scheduled flights on the board."
  },
  {
    "id": 310,
    "levelDisplay": "Level 10",
    "title": "Level 10: Syntax #310: Count total veterinary patients registered at the clinic",
    "subtitle": "Count total veterinary patients registered at the clinic.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.1 Basic COUNT & Non-Null Values",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Count total veterinary patients registered at the clinic.",
    "xp": 40,
    "table": "PetClinic",
    "scenario": "Count total veterinary patients registered at the clinic.",
    "businessObjective": "Count total veterinary patients registered at the clinic.",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT COUNT(pet_id) AS patient_count\nFROM PetClinic;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " COUNT(pet_id) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SELECT",
        "options": [
          "SELECT",
          "CHOOSE",
          "GET",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "patient_count",
        "options": [
          "patient_count",
          "patient_count_summary",
          "calculated_num",
          "result"
        ]
      },
      "slot3": {
        "correct": "PetClinic;",
        "options": [
          "GymMembers;",
          "GroceryItems;",
          "PetClinic;",
          "MovieReviews;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Count total veterinary patients registered at the clinic."
  },
  {
    "id": 311,
    "levelDisplay": "Level 11",
    "title": "Level 11: Syntax #311: Calculate the total payroll expenditure across all employees",
    "subtitle": "Calculate the total payroll expenditure across all employees.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Calculate the total payroll expenditure across all employees.",
    "xp": 42,
    "table": "Employees",
    "scenario": "Calculate the total payroll expenditure across all employees.",
    "businessObjective": "Calculate the total payroll expenditure across all employees.",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT SUM(salary) AS total_payroll\nFROM Employees;",
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
        "text": " AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SUM(salary)",
        "options": [
          "AVG(salary)",
          "TOTAL(salary)",
          "COUNT(salary)",
          "SUM(salary)"
        ]
      },
      "slot2": {
        "correct": "total_payroll",
        "options": [
          "metric",
          "total_payroll",
          "total_payroll_val",
          "stat_result"
        ]
      },
      "slot3": {
        "correct": "Employees;",
        "options": [
          "GroceryItems;",
          "Employees;",
          "FlightSchedule;",
          "GymMembers;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Calculate the total payroll expenditure across all employees."
  },
  {
    "id": 312,
    "levelDisplay": "Level 12",
    "title": "Level 12: Syntax #312: Sum the total number of physical units currently in stock",
    "subtitle": "Sum the total number of physical units currently in stock.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Sum the total number of physical units currently in stock.",
    "xp": 44,
    "table": "GroceryItems",
    "scenario": "Sum the total number of physical units currently in stock.",
    "businessObjective": "Sum the total number of physical units currently in stock.",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT SUM(stock_units) AS total_inventory_units\nFROM GroceryItems;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " SUM(stock_units) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "EXTRACT",
          "GET",
          "SELECT"
        ]
      },
      "slot2": {
        "correct": "total_inventory_units",
        "options": [
          "total_inventory_units_summary",
          "result",
          "total_inventory_units",
          "calculated_num"
        ]
      },
      "slot3": {
        "correct": "GroceryItems;",
        "options": [
          "Orders;",
          "GroceryItems;",
          "Employees;",
          "Students;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Sum the total number of physical units currently in stock."
  },
  {
    "id": 313,
    "levelDisplay": "Level 13",
    "title": "Level 13: Syntax #313: Calculate the overall sum of item quantities purchased across all orders",
    "subtitle": "Calculate the overall sum of item quantities purchased across all orders.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Calculate the overall sum of item quantities purchased across all orders.",
    "xp": 46,
    "table": "Orders",
    "scenario": "Calculate the overall sum of item quantities purchased across all orders.",
    "businessObjective": "Calculate the overall sum of item quantities purchased across all orders.",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT SUM(quantity) AS total_items_sold\nFROM Orders;",
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
        "text": " AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SUM(quantity)",
        "options": [
          "TOTAL(quantity)",
          "AVG(quantity)",
          "COUNT(quantity)",
          "SUM(quantity)"
        ]
      },
      "slot2": {
        "correct": "total_items_sold",
        "options": [
          "stat_result",
          "total_items_sold_val",
          "metric",
          "total_items_sold"
        ]
      },
      "slot3": {
        "correct": "Orders;",
        "options": [
          "Orders;",
          "Students;",
          "MusicTracks;",
          "Books;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Calculate the overall sum of item quantities purchased across all orders."
  },
  {
    "id": 314,
    "levelDisplay": "Level 14",
    "title": "Level 14: Syntax #314: Compute total gross revenue by summing the line item totals (quantity * unit_price)",
    "subtitle": "Compute total gross revenue by summing the line item totals (quantity * unit_price).",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Compute total gross revenue by summing the line item totals (quantity * unit_price).",
    "xp": 48,
    "table": "Orders",
    "scenario": "Compute total gross revenue by summing the line item totals (quantity * unit_price).",
    "businessObjective": "Compute total gross revenue by summing the line item totals (quantity * unit_price).",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT SUM(quantity * unit_price) AS gross_revenue\nFROM Orders;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " SUM(quantity * unit_price) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SELECT",
        "options": [
          "EXTRACT",
          "GET",
          "SELECT",
          "CHOOSE"
        ]
      },
      "slot2": {
        "correct": "gross_revenue",
        "options": [
          "calculated_num",
          "gross_revenue_summary",
          "gross_revenue",
          "result"
        ]
      },
      "slot3": {
        "correct": "Orders;",
        "options": [
          "FlightSchedule;",
          "Orders;",
          "Students;",
          "GroceryItems;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Compute total gross revenue by summing the line item totals (quantity * unit_price)."
  },
  {
    "id": 315,
    "levelDisplay": "Level 15",
    "title": "Level 15: Syntax #315: Calculate the grand total duration of all tracks combined in seconds",
    "subtitle": "Calculate the grand total duration of all tracks combined in seconds.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Calculate the grand total duration of all tracks combined in seconds.",
    "xp": 50,
    "table": "MusicTracks",
    "scenario": "Calculate the grand total duration of all tracks combined in seconds.",
    "businessObjective": "Calculate the grand total duration of all tracks combined in seconds.",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT SUM(duration_seconds) AS total_audio_seconds\nFROM MusicTracks;",
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
        "text": " AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SUM(duration_seconds)",
        "options": [
          "TOTAL(duration_seconds)",
          "AVG(duration_seconds)",
          "COUNT(duration_seconds)",
          "SUM(duration_seconds)"
        ]
      },
      "slot2": {
        "correct": "total_audio_seconds",
        "options": [
          "total_audio_seconds",
          "metric",
          "stat_result",
          "total_audio_seconds_val"
        ]
      },
      "slot3": {
        "correct": "MusicTracks;",
        "options": [
          "MovieReviews;",
          "MusicTracks;",
          "Orders;",
          "Books;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Calculate the grand total duration of all tracks combined in seconds."
  },
  {
    "id": 316,
    "levelDisplay": "Level 16",
    "title": "Level 16: Syntax #316: Sum the total monthly membership fee dues collected by the gym",
    "subtitle": "Sum the total monthly membership fee dues collected by the gym.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Sum the total monthly membership fee dues collected by the gym.",
    "xp": 52,
    "table": "GymMembers",
    "scenario": "Sum the total monthly membership fee dues collected by the gym.",
    "businessObjective": "Sum the total monthly membership fee dues collected by the gym.",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT SUM(monthly_fee) AS total_monthly_dues\nFROM GymMembers;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " SUM(monthly_fee) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "GET",
          "SELECT",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "total_monthly_dues",
        "options": [
          "total_monthly_dues_summary",
          "calculated_num",
          "total_monthly_dues",
          "result"
        ]
      },
      "slot3": {
        "correct": "GymMembers;",
        "options": [
          "GymMembers;",
          "Orders;",
          "FlightSchedule;",
          "MusicTracks;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Sum the total monthly membership fee dues collected by the gym."
  },
  {
    "id": 317,
    "levelDisplay": "Level 17",
    "title": "Level 17: Syntax #317: Calculate total visits logged across all members this month",
    "subtitle": "Calculate total visits logged across all members this month.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Calculate total visits logged across all members this month.",
    "xp": 54,
    "table": "GymMembers",
    "scenario": "Calculate total visits logged across all members this month.",
    "businessObjective": "Calculate total visits logged across all members this month.",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT SUM(visits_this_month) AS aggregate_visits\nFROM GymMembers;",
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
        "text": " AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SUM(visits_this_month)",
        "options": [
          "TOTAL(visits_this_month)",
          "AVG(visits_this_month)",
          "COUNT(visits_this_month)",
          "SUM(visits_this_month)"
        ]
      },
      "slot2": {
        "correct": "aggregate_visits",
        "options": [
          "stat_result",
          "aggregate_visits_val",
          "aggregate_visits",
          "metric"
        ]
      },
      "slot3": {
        "correct": "GymMembers;",
        "options": [
          "GymMembers;",
          "MovieReviews;",
          "Employees;",
          "Students;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Calculate total visits logged across all members this month."
  },
  {
    "id": 318,
    "levelDisplay": "Level 18",
    "title": "Level 18: Syntax #318: Compute the total number of unbooked seats across all departures",
    "subtitle": "Compute the total number of unbooked seats across all departures.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Compute the total number of unbooked seats across all departures.",
    "xp": 56,
    "table": "FlightSchedule",
    "scenario": "Compute the total number of unbooked seats across all departures.",
    "businessObjective": "Compute the total number of unbooked seats across all departures.",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT SUM(seats_available) AS total_empty_seats\nFROM FlightSchedule;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " SUM(seats_available) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SELECT",
        "options": [
          "SELECT",
          "CHOOSE",
          "GET",
          "EXTRACT"
        ]
      },
      "slot2": {
        "correct": "total_empty_seats",
        "options": [
          "total_empty_seats",
          "total_empty_seats_summary",
          "result",
          "calculated_num"
        ]
      },
      "slot3": {
        "correct": "FlightSchedule;",
        "options": [
          "Orders;",
          "GroceryItems;",
          "MusicTracks;",
          "FlightSchedule;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Compute the total number of unbooked seats across all departures."
  },
  {
    "id": 319,
    "levelDisplay": "Level 19",
    "title": "Level 19: Syntax #319: Sum the total collective weight in kilograms of all clinic patients",
    "subtitle": "Sum the total collective weight in kilograms of all clinic patients.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Sum the total collective weight in kilograms of all clinic patients.",
    "xp": 58,
    "table": "PetClinic",
    "scenario": "Sum the total collective weight in kilograms of all clinic patients.",
    "businessObjective": "Sum the total collective weight in kilograms of all clinic patients.",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT SUM(weight_kg) AS combined_patient_weight\nFROM PetClinic;",
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
        "text": " AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SUM(weight_kg)",
        "options": [
          "COUNT(weight_kg)",
          "SUM(weight_kg)",
          "AVG(weight_kg)",
          "TOTAL(weight_kg)"
        ]
      },
      "slot2": {
        "correct": "combined_patient_weight",
        "options": [
          "combined_patient_weight",
          "metric",
          "stat_result",
          "combined_patient_weight_val"
        ]
      },
      "slot3": {
        "correct": "PetClinic;",
        "options": [
          "PetClinic;",
          "Students;",
          "MusicTracks;",
          "Books;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Sum the total collective weight in kilograms of all clinic patients."
  },
  {
    "id": 320,
    "levelDisplay": "Level 20",
    "title": "Level 20: Syntax #320: Sum the total physical copies in warehouse stock across all titles",
    "subtitle": "Sum the total physical copies in warehouse stock across all titles.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.2 Basic SUM & Total Accumulation",
    "tier": "Apprentice",
    "tierColor": "#38bdf8",
    "difficulty": "Apprentice",
    "task": "Sum the total physical copies in warehouse stock across all titles.",
    "xp": 60,
    "table": "Books",
    "scenario": "Sum the total physical copies in warehouse stock across all titles.",
    "businessObjective": "Sum the total physical copies in warehouse stock across all titles.",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT SUM(stock_count) AS total_books_in_warehouse\nFROM Books;",
    "template": [
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " SUM(stock_count) AS ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nFROM ",
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
        "correct": "SELECT",
        "options": [
          "CHOOSE",
          "EXTRACT",
          "SELECT",
          "GET"
        ]
      },
      "slot2": {
        "correct": "total_books_in_warehouse",
        "options": [
          "result",
          "calculated_num",
          "total_books_in_warehouse",
          "total_books_in_warehouse_summary"
        ]
      },
      "slot3": {
        "correct": "Books;",
        "options": [
          "Books;",
          "GymMembers;",
          "GroceryItems;",
          "MovieReviews;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Sum the total physical copies in warehouse stock across all titles."
  },
  {
    "id": 321,
    "levelDisplay": "Level 21",
    "title": "Level 21: Syntax #321: Calculate the average GPA across all students rounded to 2 decimal places",
    "subtitle": "Calculate the average GPA across all students rounded to 2 decimal places.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.3 AVG & Statistical Means",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Calculate the average GPA across all students rounded to 2 decimal places.",
    "xp": 62,
    "table": "Students",
    "scenario": "Calculate the average GPA across all students rounded to 2 decimal places.",
    "businessObjective": "Calculate the average GPA across all students rounded to 2 decimal places.",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT ROUND(AVG(gpa), 2) AS average_gpa\nFROM Students;",
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
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", 2) AS ",
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
        "correct": "ROUND",
        "options": [
          "ROUND",
          "FLOOR",
          "TRUNC",
          "CEIL"
        ]
      },
      "slot2": {
        "correct": "AVG(gpa)",
        "options": [
          "AVG(gpa)",
          "MEDIAN(gpa)",
          "SUM(gpa)",
          "MEAN(gpa)"
        ]
      },
      "slot3": {
        "correct": "average_gpa",
        "options": [
          "average_gpa",
          "avg_val",
          "score",
          "average_gpa_stat"
        ]
      },
      "slot4": {
        "correct": "Students;",
        "options": [
          "GroceryItems;",
          "MusicTracks;",
          "FlightSchedule;",
          "Students;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Calculate the average GPA across all students rounded to 2 decimal places."
  },
  {
    "id": 322,
    "levelDisplay": "Level 22",
    "title": "Level 22: Syntax #322: Compute the average retail price of books in the catalog",
    "subtitle": "Compute the average retail price of books in the catalog.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.3 AVG & Statistical Means",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Compute the average retail price of books in the catalog.",
    "xp": 64,
    "table": "Books",
    "scenario": "Compute the average retail price of books in the catalog.",
    "businessObjective": "Compute the average retail price of books in the catalog.",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT ROUND(AVG(price), 2) AS average_book_price\nFROM Books;",
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
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", 2) AS ",
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
        "correct": "ROUND",
        "options": [
          "TRUNC",
          "ROUND",
          "FLOOR",
          "CEIL"
        ]
      },
      "slot2": {
        "correct": "AVG(price)",
        "options": [
          "AVG(price)",
          "MEAN(price)",
          "SUM(price)",
          "MEDIAN(price)"
        ]
      },
      "slot3": {
        "correct": "average_book_price",
        "options": [
          "average_book_price_stat",
          "score",
          "avg_val",
          "average_book_price"
        ]
      },
      "slot4": {
        "correct": "Books;",
        "options": [
          "Orders;",
          "Books;",
          "GroceryItems;",
          "PetClinic;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Compute the average retail price of books in the catalog."
  },
  {
    "id": 323,
    "levelDisplay": "Level 23",
    "title": "Level 23: Syntax #323: Calculate the overall average employee salary",
    "subtitle": "Calculate the overall average employee salary.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.3 AVG & Statistical Means",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Calculate the overall average employee salary.",
    "xp": 66,
    "table": "Employees",
    "scenario": "Calculate the overall average employee salary.",
    "businessObjective": "Calculate the overall average employee salary.",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT ROUND(AVG(salary), 2) AS mean_company_salary\nFROM Employees;",
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
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", 2) AS ",
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
        "correct": "ROUND",
        "options": [
          "CEIL",
          "TRUNC",
          "ROUND",
          "FLOOR"
        ]
      },
      "slot2": {
        "correct": "AVG(salary)",
        "options": [
          "SUM(salary)",
          "MEAN(salary)",
          "MEDIAN(salary)",
          "AVG(salary)"
        ]
      },
      "slot3": {
        "correct": "mean_company_salary",
        "options": [
          "mean_company_salary_stat",
          "avg_val",
          "score",
          "mean_company_salary"
        ]
      },
      "slot4": {
        "correct": "Employees;",
        "options": [
          "MusicTracks;",
          "Books;",
          "FlightSchedule;",
          "Employees;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Calculate the overall average employee salary."
  },
  {
    "id": 324,
    "levelDisplay": "Level 24",
    "title": "Level 24: Syntax #324: Find the average price per unit across all grocery items",
    "subtitle": "Find the average price per unit across all grocery items.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.3 AVG & Statistical Means",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Find the average price per unit across all grocery items.",
    "xp": 68,
    "table": "GroceryItems",
    "scenario": "Find the average price per unit across all grocery items.",
    "businessObjective": "Find the average price per unit across all grocery items.",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT ROUND(AVG(unit_price), 2) AS average_item_cost\nFROM GroceryItems;",
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
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", 2) AS ",
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
        "correct": "ROUND",
        "options": [
          "FLOOR",
          "CEIL",
          "TRUNC",
          "ROUND"
        ]
      },
      "slot2": {
        "correct": "AVG(unit_price)",
        "options": [
          "AVG(unit_price)",
          "MEAN(unit_price)",
          "SUM(unit_price)",
          "MEDIAN(unit_price)"
        ]
      },
      "slot3": {
        "correct": "average_item_cost",
        "options": [
          "avg_val",
          "average_item_cost",
          "score",
          "average_item_cost_stat"
        ]
      },
      "slot4": {
        "correct": "GroceryItems;",
        "options": [
          "Books;",
          "FlightSchedule;",
          "MovieReviews;",
          "GroceryItems;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Find the average price per unit across all grocery items."
  },
  {
    "id": 325,
    "levelDisplay": "Level 25",
    "title": "Level 25: Syntax #325: Calculate the average order quantity per transaction rounded to 1 decimal place",
    "subtitle": "Calculate the average order quantity per transaction rounded to 1 decimal place.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.3 AVG & Statistical Means",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Calculate the average order quantity per transaction rounded to 1 decimal place.",
    "xp": 70,
    "table": "Orders",
    "scenario": "Calculate the average order quantity per transaction rounded to 1 decimal place.",
    "businessObjective": "Calculate the average order quantity per transaction rounded to 1 decimal place.",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT ROUND(AVG(quantity), 1) AS avg_items_per_order\nFROM Orders;",
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
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", 1) AS ",
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
        "correct": "ROUND",
        "options": [
          "TRUNC",
          "FLOOR",
          "CEIL",
          "ROUND"
        ]
      },
      "slot2": {
        "correct": "AVG(quantity)",
        "options": [
          "SUM(quantity)",
          "AVG(quantity)",
          "MEAN(quantity)",
          "MEDIAN(quantity)"
        ]
      },
      "slot3": {
        "correct": "avg_items_per_order",
        "options": [
          "avg_val",
          "avg_items_per_order",
          "avg_items_per_order_stat",
          "score"
        ]
      },
      "slot4": {
        "correct": "Orders;",
        "options": [
          "Orders;",
          "Students;",
          "Books;",
          "GymMembers;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Calculate the average order quantity per transaction rounded to 1 decimal place."
  },
  {
    "id": 326,
    "levelDisplay": "Level 26",
    "title": "Level 26: Syntax #326: Calculate the mean track length in seconds across the playlist",
    "subtitle": "Calculate the mean track length in seconds across the playlist.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.3 AVG & Statistical Means",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Calculate the mean track length in seconds across the playlist.",
    "xp": 72,
    "table": "MusicTracks",
    "scenario": "Calculate the mean track length in seconds across the playlist.",
    "businessObjective": "Calculate the mean track length in seconds across the playlist.",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT ROUND(AVG(duration_seconds), 0) AS avg_track_length\nFROM MusicTracks;",
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
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", 0) AS ",
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
        "correct": "ROUND",
        "options": [
          "TRUNC",
          "CEIL",
          "ROUND",
          "FLOOR"
        ]
      },
      "slot2": {
        "correct": "AVG(duration_seconds)",
        "options": [
          "MEDIAN(duration_seconds)",
          "AVG(duration_seconds)",
          "MEAN(duration_seconds)",
          "SUM(duration_seconds)"
        ]
      },
      "slot3": {
        "correct": "avg_track_length",
        "options": [
          "avg_track_length",
          "avg_val",
          "score",
          "avg_track_length_stat"
        ]
      },
      "slot4": {
        "correct": "MusicTracks;",
        "options": [
          "Students;",
          "FlightSchedule;",
          "MusicTracks;",
          "Employees;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Calculate the mean track length in seconds across the playlist."
  },
  {
    "id": 327,
    "levelDisplay": "Level 27",
    "title": "Level 27: Syntax #327: Determine the average monthly visit frequency per member",
    "subtitle": "Determine the average monthly visit frequency per member.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.3 AVG & Statistical Means",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Determine the average monthly visit frequency per member.",
    "xp": 74,
    "table": "GymMembers",
    "scenario": "Determine the average monthly visit frequency per member.",
    "businessObjective": "Determine the average monthly visit frequency per member.",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT ROUND(AVG(visits_this_month), 1) AS avg_member_attendance\nFROM GymMembers;",
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
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", 1) AS ",
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
        "correct": "ROUND",
        "options": [
          "ROUND",
          "FLOOR",
          "CEIL",
          "TRUNC"
        ]
      },
      "slot2": {
        "correct": "AVG(visits_this_month)",
        "options": [
          "MEAN(visits_this_month)",
          "SUM(visits_this_month)",
          "MEDIAN(visits_this_month)",
          "AVG(visits_this_month)"
        ]
      },
      "slot3": {
        "correct": "avg_member_attendance",
        "options": [
          "avg_member_attendance",
          "score",
          "avg_member_attendance_stat",
          "avg_val"
        ]
      },
      "slot4": {
        "correct": "GymMembers;",
        "options": [
          "GymMembers;",
          "Orders;",
          "Students;",
          "Books;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Determine the average monthly visit frequency per member."
  },
  {
    "id": 328,
    "levelDisplay": "Level 28",
    "title": "Level 28: Syntax #328: Compute the universal average star rating across all reviews",
    "subtitle": "Compute the universal average star rating across all reviews.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.3 AVG & Statistical Means",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Compute the universal average star rating across all reviews.",
    "xp": 76,
    "table": "MovieReviews",
    "scenario": "Compute the universal average star rating across all reviews.",
    "businessObjective": "Compute the universal average star rating across all reviews.",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT ROUND(AVG(star_rating), 2) AS platform_avg_rating\nFROM MovieReviews;",
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
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", 2) AS ",
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
        "correct": "ROUND",
        "options": [
          "FLOOR",
          "ROUND",
          "CEIL",
          "TRUNC"
        ]
      },
      "slot2": {
        "correct": "AVG(star_rating)",
        "options": [
          "MEAN(star_rating)",
          "MEDIAN(star_rating)",
          "SUM(star_rating)",
          "AVG(star_rating)"
        ]
      },
      "slot3": {
        "correct": "platform_avg_rating",
        "options": [
          "score",
          "platform_avg_rating_stat",
          "avg_val",
          "platform_avg_rating"
        ]
      },
      "slot4": {
        "correct": "MovieReviews;",
        "options": [
          "GymMembers;",
          "Students;",
          "MovieReviews;",
          "Books;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Compute the universal average star rating across all reviews."
  },
  {
    "id": 329,
    "levelDisplay": "Level 29",
    "title": "Level 29: Syntax #329: Calculate the average ticket price across all scheduled flights",
    "subtitle": "Calculate the average ticket price across all scheduled flights.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.3 AVG & Statistical Means",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Calculate the average ticket price across all scheduled flights.",
    "xp": 78,
    "table": "FlightSchedule",
    "scenario": "Calculate the average ticket price across all scheduled flights.",
    "businessObjective": "Calculate the average ticket price across all scheduled flights.",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT ROUND(AVG(ticket_price), 2) AS average_fare\nFROM FlightSchedule;",
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
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", 2) AS ",
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
        "correct": "ROUND",
        "options": [
          "TRUNC",
          "ROUND",
          "CEIL",
          "FLOOR"
        ]
      },
      "slot2": {
        "correct": "AVG(ticket_price)",
        "options": [
          "MEDIAN(ticket_price)",
          "AVG(ticket_price)",
          "MEAN(ticket_price)",
          "SUM(ticket_price)"
        ]
      },
      "slot3": {
        "correct": "average_fare",
        "options": [
          "average_fare_stat",
          "avg_val",
          "score",
          "average_fare"
        ]
      },
      "slot4": {
        "correct": "FlightSchedule;",
        "options": [
          "Students;",
          "FlightSchedule;",
          "PetClinic;",
          "MovieReviews;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Calculate the average ticket price across all scheduled flights."
  },
  {
    "id": 330,
    "levelDisplay": "Level 30",
    "title": "Level 30: Syntax #330: Calculate the mean age of clinic patients in years",
    "subtitle": "Calculate the mean age of clinic patients in years.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.3 AVG & Statistical Means",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Calculate the mean age of clinic patients in years.",
    "xp": 80,
    "table": "PetClinic",
    "scenario": "Calculate the mean age of clinic patients in years.",
    "businessObjective": "Calculate the mean age of clinic patients in years.",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT ROUND(AVG(age_years), 1) AS average_patient_age\nFROM PetClinic;",
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
        "text": "(",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ", 1) AS ",
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
        "correct": "ROUND",
        "options": [
          "CEIL",
          "FLOOR",
          "ROUND",
          "TRUNC"
        ]
      },
      "slot2": {
        "correct": "AVG(age_years)",
        "options": [
          "SUM(age_years)",
          "MEAN(age_years)",
          "MEDIAN(age_years)",
          "AVG(age_years)"
        ]
      },
      "slot3": {
        "correct": "average_patient_age",
        "options": [
          "score",
          "average_patient_age_stat",
          "avg_val",
          "average_patient_age"
        ]
      },
      "slot4": {
        "correct": "PetClinic;",
        "options": [
          "GymMembers;",
          "PetClinic;",
          "Employees;",
          "Orders;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Calculate the mean age of clinic patients in years."
  },
  {
    "id": 331,
    "levelDisplay": "Level 31",
    "title": "Level 31: Syntax #331: Find both the minimum and maximum GPA in the student body",
    "subtitle": "Find both the minimum and maximum GPA in the student body.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Find both the minimum and maximum GPA in the student body.",
    "xp": 82,
    "table": "Students",
    "scenario": "Find both the minimum and maximum GPA in the student body.",
    "businessObjective": "Find both the minimum and maximum GPA in the student body.",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT MIN(gpa) AS lowest_gpa, MAX(gpa) AS highest_gpa\nFROM Students;",
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
        "text": "(gpa) AS lowest_gpa, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "(gpa) AS ",
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
        "correct": "MIN",
        "options": [
          "MIN",
          "LOWEST",
          "SMALLEST",
          "LEAST"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "HIGHEST",
          "TOP",
          "GREATEST"
        ]
      },
      "slot3": {
        "correct": "highest_gpa",
        "options": [
          "highest_gpa",
          "upper_bound",
          "high_val",
          "peak_value"
        ]
      },
      "slot4": {
        "correct": "Students;",
        "options": [
          "PetClinic;",
          "GroceryItems;",
          "Books;",
          "Students;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Find both the minimum and maximum GPA in the student body."
  },
  {
    "id": 332,
    "levelDisplay": "Level 32",
    "title": "Level 32: Syntax #332: Discover the lowest and highest book prices in the store",
    "subtitle": "Discover the lowest and highest book prices in the store.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Discover the lowest and highest book prices in the store.",
    "xp": 84,
    "table": "Books",
    "scenario": "Discover the lowest and highest book prices in the store.",
    "businessObjective": "Discover the lowest and highest book prices in the store.",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT MIN(price) AS cheapest_book, MAX(price) AS priciest_book\nFROM Books;",
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
        "text": "(price) AS cheapest_book, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "(price) AS ",
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
        "correct": "MIN",
        "options": [
          "MIN",
          "SMALLEST",
          "LOWEST",
          "LEAST"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "GREATEST",
          "HIGHEST",
          "MAX",
          "TOP"
        ]
      },
      "slot3": {
        "correct": "priciest_book",
        "options": [
          "upper_bound",
          "priciest_book",
          "peak_value",
          "high_val"
        ]
      },
      "slot4": {
        "correct": "Books;",
        "options": [
          "MusicTracks;",
          "GroceryItems;",
          "Employees;",
          "Books;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Discover the lowest and highest book prices in the store."
  },
  {
    "id": 333,
    "levelDisplay": "Level 33",
    "title": "Level 33: Syntax #333: Identify the minimum and maximum salaries paid in the company",
    "subtitle": "Identify the minimum and maximum salaries paid in the company.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Identify the minimum and maximum salaries paid in the company.",
    "xp": 86,
    "table": "Employees",
    "scenario": "Identify the minimum and maximum salaries paid in the company.",
    "businessObjective": "Identify the minimum and maximum salaries paid in the company.",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT MIN(salary) AS entry_salary, MAX(salary) AS executive_salary\nFROM Employees;",
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
        "text": "(salary) AS entry_salary, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "(salary) AS ",
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
        "correct": "MIN",
        "options": [
          "SMALLEST",
          "LOWEST",
          "LEAST",
          "MIN"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "GREATEST",
          "HIGHEST",
          "MAX",
          "TOP"
        ]
      },
      "slot3": {
        "correct": "executive_salary",
        "options": [
          "executive_salary",
          "upper_bound",
          "peak_value",
          "high_val"
        ]
      },
      "slot4": {
        "correct": "Employees;",
        "options": [
          "Orders;",
          "GroceryItems;",
          "Employees;",
          "FlightSchedule;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Identify the minimum and maximum salaries paid in the company."
  },
  {
    "id": 334,
    "levelDisplay": "Level 34",
    "title": "Level 34: Syntax #334: Find the lowest grocery unit price and the highest stock count",
    "subtitle": "Find the lowest grocery unit price and the highest stock count.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Find the lowest grocery unit price and the highest stock count.",
    "xp": 88,
    "table": "GroceryItems",
    "scenario": "Find the lowest grocery unit price and the highest stock count.",
    "businessObjective": "Find the lowest grocery unit price and the highest stock count.",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT MIN(unit_price) AS min_price, MAX(stock_units) AS peak_stock\nFROM GroceryItems;",
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
        "text": "(unit_price) AS min_price, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "(unit_price) AS ",
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
        "correct": "MIN",
        "options": [
          "SMALLEST",
          "LOWEST",
          "LEAST",
          "MIN"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "HIGHEST",
          "TOP",
          "MAX",
          "GREATEST"
        ]
      },
      "slot3": {
        "correct": "peak_stock",
        "options": [
          "upper_bound",
          "peak_stock",
          "high_val",
          "peak_value"
        ]
      },
      "slot4": {
        "correct": "GroceryItems;",
        "options": [
          "Orders;",
          "Books;",
          "Employees;",
          "GroceryItems;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Find the lowest grocery unit price and the highest stock count."
  },
  {
    "id": 335,
    "levelDisplay": "Level 35",
    "title": "Level 35: Syntax #335: Identify the earliest and most recent order dates in history",
    "subtitle": "Identify the earliest and most recent order dates in history.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Identify the earliest and most recent order dates in history.",
    "xp": 90,
    "table": "Orders",
    "scenario": "Identify the earliest and most recent order dates in history.",
    "businessObjective": "Identify the earliest and most recent order dates in history.",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT MIN(order_date) AS earliest_order, MAX(order_date) AS latest_order\nFROM Orders;",
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
        "text": "(order_date) AS earliest_order, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "(order_date) AS ",
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
        "correct": "MIN",
        "options": [
          "SMALLEST",
          "LOWEST",
          "MIN",
          "LEAST"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "TOP",
          "HIGHEST",
          "GREATEST"
        ]
      },
      "slot3": {
        "correct": "latest_order",
        "options": [
          "latest_order",
          "high_val",
          "peak_value",
          "upper_bound"
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
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Identify the earliest and most recent order dates in history."
  },
  {
    "id": 336,
    "levelDisplay": "Level 36",
    "title": "Level 36: Syntax #336: Find the lowest and highest play counts across all songs",
    "subtitle": "Find the lowest and highest play counts across all songs.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Find the lowest and highest play counts across all songs.",
    "xp": 92,
    "table": "MusicTracks",
    "scenario": "Find the lowest and highest play counts across all songs.",
    "businessObjective": "Find the lowest and highest play counts across all songs.",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT MIN(play_count) AS least_played, MAX(play_count) AS top_streamed\nFROM MusicTracks;",
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
        "text": "(play_count) AS least_played, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "(play_count) AS ",
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
        "correct": "MIN",
        "options": [
          "LOWEST",
          "LEAST",
          "SMALLEST",
          "MIN"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "GREATEST",
          "TOP",
          "HIGHEST",
          "MAX"
        ]
      },
      "slot3": {
        "correct": "top_streamed",
        "options": [
          "peak_value",
          "high_val",
          "top_streamed",
          "upper_bound"
        ]
      },
      "slot4": {
        "correct": "MusicTracks;",
        "options": [
          "MusicTracks;",
          "MovieReviews;",
          "Employees;",
          "PetClinic;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Find the lowest and highest play counts across all songs."
  },
  {
    "id": 337,
    "levelDisplay": "Level 37",
    "title": "Level 37: Syntax #337: Find the earliest and latest member join dates",
    "subtitle": "Find the earliest and latest member join dates.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Find the earliest and latest member join dates.",
    "xp": 94,
    "table": "GymMembers",
    "scenario": "Find the earliest and latest member join dates.",
    "businessObjective": "Find the earliest and latest member join dates.",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT MIN(join_date) AS oldest_member_date, MAX(join_date) AS newest_join_date\nFROM GymMembers;",
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
        "text": "(join_date) AS oldest_member_date, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "(join_date) AS ",
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
        "correct": "MIN",
        "options": [
          "SMALLEST",
          "LEAST",
          "MIN",
          "LOWEST"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "HIGHEST",
          "GREATEST",
          "TOP"
        ]
      },
      "slot3": {
        "correct": "newest_join_date",
        "options": [
          "upper_bound",
          "peak_value",
          "high_val",
          "newest_join_date"
        ]
      },
      "slot4": {
        "correct": "GymMembers;",
        "options": [
          "PetClinic;",
          "GymMembers;",
          "MusicTracks;",
          "Books;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Find the earliest and latest member join dates."
  },
  {
    "id": 338,
    "levelDisplay": "Level 38",
    "title": "Level 38: Syntax #338: Find the lowest and highest star ratings logged by viewers",
    "subtitle": "Find the lowest and highest star ratings logged by viewers.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Find the lowest and highest star ratings logged by viewers.",
    "xp": 96,
    "table": "MovieReviews",
    "scenario": "Find the lowest and highest star ratings logged by viewers.",
    "businessObjective": "Find the lowest and highest star ratings logged by viewers.",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT MIN(star_rating) AS lowest_score, MAX(star_rating) AS highest_score\nFROM MovieReviews;",
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
        "text": "(star_rating) AS lowest_score, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "(star_rating) AS ",
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
        "correct": "MIN",
        "options": [
          "MIN",
          "LOWEST",
          "SMALLEST",
          "LEAST"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "HIGHEST",
          "MAX",
          "GREATEST",
          "TOP"
        ]
      },
      "slot3": {
        "correct": "highest_score",
        "options": [
          "peak_value",
          "upper_bound",
          "highest_score",
          "high_val"
        ]
      },
      "slot4": {
        "correct": "MovieReviews;",
        "options": [
          "Books;",
          "MovieReviews;",
          "MusicTracks;",
          "GroceryItems;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Find the lowest and highest star ratings logged by viewers."
  },
  {
    "id": 339,
    "levelDisplay": "Level 39",
    "title": "Level 39: Syntax #339: Find the cheapest and most expensive flight ticket prices",
    "subtitle": "Find the cheapest and most expensive flight ticket prices.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Find the cheapest and most expensive flight ticket prices.",
    "xp": 98,
    "table": "FlightSchedule",
    "scenario": "Find the cheapest and most expensive flight ticket prices.",
    "businessObjective": "Find the cheapest and most expensive flight ticket prices.",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT MIN(ticket_price) AS bargain_fare, MAX(ticket_price) AS premium_fare\nFROM FlightSchedule;",
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
        "text": "(ticket_price) AS bargain_fare, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "(ticket_price) AS ",
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
        "correct": "MIN",
        "options": [
          "LEAST",
          "MIN",
          "SMALLEST",
          "LOWEST"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "GREATEST",
          "TOP",
          "HIGHEST"
        ]
      },
      "slot3": {
        "correct": "premium_fare",
        "options": [
          "premium_fare",
          "high_val",
          "upper_bound",
          "peak_value"
        ]
      },
      "slot4": {
        "correct": "FlightSchedule;",
        "options": [
          "MusicTracks;",
          "Books;",
          "FlightSchedule;",
          "GroceryItems;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Find the cheapest and most expensive flight ticket prices."
  },
  {
    "id": 340,
    "levelDisplay": "Level 40",
    "title": "Level 40: Syntax #340: Find the minimum and maximum pet weights recorded in kilograms",
    "subtitle": "Find the minimum and maximum pet weights recorded in kilograms.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.4 MIN & MAX Extrema Discovery",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Find the minimum and maximum pet weights recorded in kilograms.",
    "xp": 100,
    "table": "PetClinic",
    "scenario": "Find the minimum and maximum pet weights recorded in kilograms.",
    "businessObjective": "Find the minimum and maximum pet weights recorded in kilograms.",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT MIN(weight_kg) AS lightest_pet, MAX(weight_kg) AS heaviest_pet\nFROM PetClinic;",
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
        "text": "(weight_kg) AS lightest_pet, ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "(weight_kg) AS ",
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
        "correct": "MIN",
        "options": [
          "MIN",
          "SMALLEST",
          "LEAST",
          "LOWEST"
        ]
      },
      "slot2": {
        "correct": "MAX",
        "options": [
          "MAX",
          "GREATEST",
          "HIGHEST",
          "TOP"
        ]
      },
      "slot3": {
        "correct": "heaviest_pet",
        "options": [
          "high_val",
          "heaviest_pet",
          "peak_value",
          "upper_bound"
        ]
      },
      "slot4": {
        "correct": "PetClinic;",
        "options": [
          "Orders;",
          "PetClinic;",
          "GymMembers;",
          "FlightSchedule;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Find the minimum and maximum pet weights recorded in kilograms."
  },
  {
    "id": 341,
    "levelDisplay": "Level 41",
    "title": "Level 41: Syntax #341: Count the number of distinct cities where students reside",
    "subtitle": "Count the number of distinct cities where students reside.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Count the number of distinct cities where students reside.",
    "xp": 102,
    "table": "Students",
    "scenario": "Count the number of distinct cities where students reside.",
    "businessObjective": "Count the number of distinct cities where students reside.",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT COUNT(DISTINCT city) AS unique_hometowns\nFROM Students;",
    "template": [
      {
        "text": "SELECT COUNT(",
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
        "text": ") AS ",
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
        "correct": "DISTINCT",
        "options": [
          "UNIQUE",
          "DIFFERENT",
          "DISTINCT",
          "ISOLATED"
        ]
      },
      "slot2": {
        "correct": "city",
        "options": [
          "major",
          "city",
          "enrolled_year",
          "full_name"
        ]
      },
      "slot3": {
        "correct": "unique_hometowns",
        "options": [
          "cardinality",
          "unique_metric",
          "distinct_total",
          "unique_hometowns"
        ]
      },
      "slot4": {
        "correct": "Students;",
        "options": [
          "PetClinic;",
          "MusicTracks;",
          "GymMembers;",
          "Students;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Count the number of distinct cities where students reside."
  },
  {
    "id": 342,
    "levelDisplay": "Level 42",
    "title": "Level 42: Syntax #342: Count how many unique authors are represented in the catalog",
    "subtitle": "Count how many unique authors are represented in the catalog.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Count how many unique authors are represented in the catalog.",
    "xp": 104,
    "table": "Books",
    "scenario": "Count how many unique authors are represented in the catalog.",
    "businessObjective": "Count how many unique authors are represented in the catalog.",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT COUNT(DISTINCT author) AS unique_authors\nFROM Books;",
    "template": [
      {
        "text": "SELECT COUNT(",
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
        "text": ") AS ",
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
        "correct": "DISTINCT",
        "options": [
          "DISTINCT",
          "UNIQUE",
          "DIFFERENT",
          "ISOLATED"
        ]
      },
      "slot2": {
        "correct": "author",
        "options": [
          "author",
          "book_id",
          "price",
          "title"
        ]
      },
      "slot3": {
        "correct": "unique_authors",
        "options": [
          "unique_authors",
          "unique_metric",
          "cardinality",
          "distinct_total"
        ]
      },
      "slot4": {
        "correct": "Books;",
        "options": [
          "FlightSchedule;",
          "Orders;",
          "GroceryItems;",
          "Books;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Count how many unique authors are represented in the catalog."
  },
  {
    "id": 343,
    "levelDisplay": "Level 43",
    "title": "Level 43: Syntax #343: Count the number of unique departments operating in the firm",
    "subtitle": "Count the number of unique departments operating in the firm.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Count the number of unique departments operating in the firm.",
    "xp": 106,
    "table": "Employees",
    "scenario": "Count the number of unique departments operating in the firm.",
    "businessObjective": "Count the number of unique departments operating in the firm.",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT COUNT(DISTINCT department) AS active_departments\nFROM Employees;",
    "template": [
      {
        "text": "SELECT COUNT(",
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
        "text": ") AS ",
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
        "correct": "DISTINCT",
        "options": [
          "UNIQUE",
          "DIFFERENT",
          "ISOLATED",
          "DISTINCT"
        ]
      },
      "slot2": {
        "correct": "department",
        "options": [
          "first_name",
          "last_name",
          "department",
          "salary"
        ]
      },
      "slot3": {
        "correct": "active_departments",
        "options": [
          "cardinality",
          "unique_metric",
          "active_departments",
          "distinct_total"
        ]
      },
      "slot4": {
        "correct": "Employees;",
        "options": [
          "FlightSchedule;",
          "MovieReviews;",
          "Employees;",
          "GroceryItems;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Count the number of unique departments operating in the firm."
  },
  {
    "id": 344,
    "levelDisplay": "Level 44",
    "title": "Level 44: Syntax #344: Count how many distinct grocery categories exist in inventory",
    "subtitle": "Count how many distinct grocery categories exist in inventory.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Count how many distinct grocery categories exist in inventory.",
    "xp": 108,
    "table": "GroceryItems",
    "scenario": "Count how many distinct grocery categories exist in inventory.",
    "businessObjective": "Count how many distinct grocery categories exist in inventory.",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT COUNT(DISTINCT category) AS category_count\nFROM GroceryItems;",
    "template": [
      {
        "text": "SELECT COUNT(",
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
        "text": ") AS ",
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
        "correct": "DISTINCT",
        "options": [
          "DISTINCT",
          "UNIQUE",
          "DIFFERENT",
          "ISOLATED"
        ]
      },
      "slot2": {
        "correct": "category",
        "options": [
          "category",
          "item_id",
          "item_name",
          "unit_price"
        ]
      },
      "slot3": {
        "correct": "category_count",
        "options": [
          "category_count",
          "unique_metric",
          "cardinality",
          "distinct_total"
        ]
      },
      "slot4": {
        "correct": "GroceryItems;",
        "options": [
          "FlightSchedule;",
          "MovieReviews;",
          "Students;",
          "GroceryItems;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Count how many distinct grocery categories exist in inventory."
  },
  {
    "id": 345,
    "levelDisplay": "Level 45",
    "title": "Level 45: Syntax #345: Count the total number of distinct customers who placed orders",
    "subtitle": "Count the total number of distinct customers who placed orders.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "tier": "Practitioner",
    "tierColor": "#10b981",
    "difficulty": "Practitioner",
    "task": "Count the total number of distinct customers who placed orders.",
    "xp": 110,
    "table": "Orders",
    "scenario": "Count the total number of distinct customers who placed orders.",
    "businessObjective": "Count the total number of distinct customers who placed orders.",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT COUNT(DISTINCT customer_name) AS unique_buyers\nFROM Orders;",
    "template": [
      {
        "text": "SELECT COUNT(",
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
        "text": ") AS ",
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
        "correct": "DISTINCT",
        "options": [
          "DIFFERENT",
          "DISTINCT",
          "ISOLATED",
          "UNIQUE"
        ]
      },
      "slot2": {
        "correct": "customer_name",
        "options": [
          "customer_name",
          "quantity",
          "shipping_city",
          "unit_price"
        ]
      },
      "slot3": {
        "correct": "unique_buyers",
        "options": [
          "unique_buyers",
          "distinct_total",
          "unique_metric",
          "cardinality"
        ]
      },
      "slot4": {
        "correct": "Orders;",
        "options": [
          "Orders;",
          "Books;",
          "PetClinic;",
          "Employees;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Count the total number of distinct customers who placed orders."
  },
  {
    "id": 346,
    "levelDisplay": "Level 46",
    "title": "Level 46: Syntax #346: Count the number of unique musical genres in the catalog",
    "subtitle": "Count the number of unique musical genres in the catalog.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Count the number of unique musical genres in the catalog.",
    "xp": 112,
    "table": "MusicTracks",
    "scenario": "Count the number of unique musical genres in the catalog.",
    "businessObjective": "Count the number of unique musical genres in the catalog.",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT COUNT(DISTINCT genre) AS distinct_genres\nFROM MusicTracks;",
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
        "text": ", COUNT(*) AS cnt\nFROM ",
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
        "correct": "department",
        "options": [
          "artist",
          "genre",
          "department",
          "play_count"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "Students",
          "MovieReviews",
          "Books",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      },
      "slot4": {
        "correct": "department;",
        "options": [
          "department ASC;",
          "1;",
          "ALL;",
          "department;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Count the number of unique musical genres in the catalog."
  },
  {
    "id": 347,
    "levelDisplay": "Level 47",
    "title": "Level 47: Syntax #347: Count the number of distinct membership plan tiers available",
    "subtitle": "Count the number of distinct membership plan tiers available.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Count the number of distinct membership plan tiers available.",
    "xp": 114,
    "table": "GymMembers",
    "scenario": "Count the number of distinct membership plan tiers available.",
    "businessObjective": "Count the number of distinct membership plan tiers available.",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT COUNT(DISTINCT membership_plan) AS plan_tiers_offered\nFROM GymMembers;",
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
        "text": ", COUNT(*) AS cnt\nFROM ",
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
        "correct": "department",
        "options": [
          "membership_plan",
          "member_id",
          "member_name",
          "department"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "Orders",
          "Books",
          "GymMembers",
          "Employees"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "CLUSTER BY",
          "PARTITION BY"
        ]
      },
      "slot4": {
        "correct": "department;",
        "options": [
          "ALL;",
          "department ASC;",
          "department;",
          "1;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Count the number of distinct membership plan tiers available."
  },
  {
    "id": 348,
    "levelDisplay": "Level 48",
    "title": "Level 48: Syntax #348: Count how many different movies have received at least one review",
    "subtitle": "Count how many different movies have received at least one review.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Count how many different movies have received at least one review.",
    "xp": 116,
    "table": "MovieReviews",
    "scenario": "Count how many different movies have received at least one review.",
    "businessObjective": "Count how many different movies have received at least one review.",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT COUNT(DISTINCT movie_title) AS unique_movies_reviewed\nFROM MovieReviews;",
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
        "text": ", COUNT(*) AS cnt\nFROM ",
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
        "correct": "department",
        "options": [
          "department",
          "genre",
          "release_year",
          "review_id"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "Employees",
          "Orders",
          "FlightSchedule",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "ORDER BY",
          "PARTITION BY",
          "CLUSTER BY"
        ]
      },
      "slot4": {
        "correct": "department;",
        "options": [
          "department ASC;",
          "1;",
          "ALL;",
          "department;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Count how many different movies have received at least one review."
  },
  {
    "id": 349,
    "levelDisplay": "Level 49",
    "title": "Level 49: Syntax #349: Count how many distinct origin airports have outbound departures",
    "subtitle": "Count how many distinct origin airports have outbound departures.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Count how many distinct origin airports have outbound departures.",
    "xp": 118,
    "table": "FlightSchedule",
    "scenario": "Count how many distinct origin airports have outbound departures.",
    "businessObjective": "Count how many distinct origin airports have outbound departures.",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT COUNT(DISTINCT origin_airport) AS unique_origins\nFROM FlightSchedule;",
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
        "text": ", COUNT(*) AS cnt\nFROM ",
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
        "correct": "department",
        "options": [
          "ticket_price",
          "flight_id",
          "department",
          "airline"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "PetClinic",
          "GroceryItems",
          "Orders",
          "FlightSchedule"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "CLUSTER BY",
          "PARTITION BY",
          "GROUP BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "department;",
        "options": [
          "ALL;",
          "department;",
          "1;",
          "department ASC;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Count how many distinct origin airports have outbound departures."
  },
  {
    "id": 350,
    "levelDisplay": "Level 50",
    "title": "Level 50: Syntax #350: Count the number of unique animal species treated at the clinic",
    "subtitle": "Count the number of unique animal species treated at the clinic.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.5 COUNT(DISTINCT) Cardinality",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Count the number of unique animal species treated at the clinic.",
    "xp": 120,
    "table": "PetClinic",
    "scenario": "Count the number of unique animal species treated at the clinic.",
    "businessObjective": "Count the number of unique animal species treated at the clinic.",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT COUNT(DISTINCT species) AS species_treated\nFROM PetClinic;",
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
        "text": ", COUNT(*) AS cnt\nFROM ",
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
        "correct": "department",
        "options": [
          "department",
          "weight_kg",
          "pet_id",
          "breed"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "FlightSchedule",
          "Orders",
          "GroceryItems",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "CLUSTER BY",
          "GROUP BY",
          "PARTITION BY"
        ]
      },
      "slot4": {
        "correct": "department;",
        "options": [
          "department;",
          "department ASC;",
          "1;",
          "ALL;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Count the number of unique animal species treated at the clinic."
  },
  {
    "id": 351,
    "levelDisplay": "Level 51",
    "title": "Level 51: Syntax #351: Group students by major and count how many students are enrolled in each",
    "subtitle": "Group students by major and count how many students are enrolled in each.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.6 Single-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group students by major and count how many students are enrolled in each.",
    "xp": 122,
    "table": "Students",
    "scenario": "Group students by major and count how many students are enrolled in each.",
    "businessObjective": "Group students by major and count how many students are enrolled in each.",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT major, COUNT(*) AS student_count\nFROM Students\nGROUP BY major;",
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
        "text": ", COUNT(*) AS student_count\nFROM ",
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
        "correct": "major",
        "options": [
          "major",
          "last_name",
          "enrolled_year",
          "gpa"
        ]
      },
      "slot2": {
        "correct": "Students",
        "options": [
          "Employees",
          "Students",
          "PetClinic",
          "FlightSchedule"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "CLUSTER BY",
          "ORDER BY",
          "PARTITION BY",
          "GROUP BY"
        ]
      },
      "slot4": {
        "correct": "major;",
        "options": [
          "1;",
          "ALL;",
          "major;",
          "major ASC;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Group students by major and count how many students are enrolled in each."
  },
  {
    "id": 352,
    "levelDisplay": "Level 52",
    "title": "Level 52: Syntax #352: Group books by genre and count total titles per category",
    "subtitle": "Group books by genre and count total titles per category.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.6 Single-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group books by genre and count total titles per category.",
    "xp": 124,
    "table": "Books",
    "scenario": "Group books by genre and count total titles per category.",
    "businessObjective": "Group books by genre and count total titles per category.",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT genre, COUNT(*) AS title_count\nFROM Books\nGROUP BY genre;",
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
        "text": ", COUNT(*) AS title_count\nFROM ",
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
        "correct": "genre",
        "options": [
          "genre",
          "title",
          "book_id",
          "published_year"
        ]
      },
      "slot2": {
        "correct": "Books",
        "options": [
          "Employees",
          "MovieReviews",
          "Books",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "CLUSTER BY",
          "PARTITION BY",
          "GROUP BY"
        ]
      },
      "slot4": {
        "correct": "genre;",
        "options": [
          "ALL;",
          "1;",
          "genre;",
          "genre ASC;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Group books by genre and count total titles per category."
  },
  {
    "id": 353,
    "levelDisplay": "Level 53",
    "title": "Level 53: Syntax #353: Group employees by department and count staff headcount per department",
    "subtitle": "Group employees by department and count staff headcount per department.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.6 Single-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group employees by department and count staff headcount per department.",
    "xp": 126,
    "table": "Employees",
    "scenario": "Group employees by department and count staff headcount per department.",
    "businessObjective": "Group employees by department and count staff headcount per department.",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT department, COUNT(*) AS headcount\nFROM Employees\nGROUP BY department;",
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
        "text": ", COUNT(*) AS headcount\nFROM ",
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
        "correct": "department",
        "options": [
          "department",
          "emp_id",
          "first_name",
          "last_name"
        ]
      },
      "slot2": {
        "correct": "Employees",
        "options": [
          "Employees",
          "GymMembers",
          "FlightSchedule",
          "Books"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "CLUSTER BY",
          "PARTITION BY"
        ]
      },
      "slot4": {
        "correct": "department;",
        "options": [
          "department ASC;",
          "1;",
          "department;",
          "ALL;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Group employees by department and count staff headcount per department."
  },
  {
    "id": 354,
    "levelDisplay": "Level 54",
    "title": "Level 54: Syntax #354: Group grocery items by category and display count of products per category",
    "subtitle": "Group grocery items by category and display count of products per category.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.6 Single-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group grocery items by category and display count of products per category.",
    "xp": 128,
    "table": "GroceryItems",
    "scenario": "Group grocery items by category and display count of products per category.",
    "businessObjective": "Group grocery items by category and display count of products per category.",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT category, COUNT(*) AS product_count\nFROM GroceryItems\nGROUP BY category;",
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
        "text": ", COUNT(*) AS product_count\nFROM ",
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
        "correct": "category",
        "options": [
          "item_id",
          "calories",
          "is_organic",
          "category"
        ]
      },
      "slot2": {
        "correct": "GroceryItems",
        "options": [
          "PetClinic",
          "Books",
          "GroceryItems",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "CLUSTER BY",
          "PARTITION BY",
          "GROUP BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "category;",
        "options": [
          "1;",
          "category ASC;",
          "ALL;",
          "category;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Group grocery items by category and display count of products per category."
  },
  {
    "id": 355,
    "levelDisplay": "Level 55",
    "title": "Level 55: Syntax #355: Group orders by status (Pending, Shipped, Delivered) and count each",
    "subtitle": "Group orders by status (Pending, Shipped, Delivered) and count each.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.6 Single-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group orders by status (Pending, Shipped, Delivered) and count each.",
    "xp": 130,
    "table": "Orders",
    "scenario": "Group orders by status (Pending, Shipped, Delivered) and count each.",
    "businessObjective": "Group orders by status (Pending, Shipped, Delivered) and count each.",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT order_status, COUNT(*) AS order_count\nFROM Orders\nGROUP BY order_status;",
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
        "text": ", COUNT(*) AS order_count\nFROM ",
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
        "correct": "order_status",
        "options": [
          "order_id",
          "order_status",
          "product_name",
          "customer_name"
        ]
      },
      "slot2": {
        "correct": "Orders",
        "options": [
          "GymMembers",
          "Orders",
          "Books",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "PARTITION BY",
          "GROUP BY",
          "CLUSTER BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "order_status;",
        "options": [
          "ALL;",
          "order_status ASC;",
          "order_status;",
          "1;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Group orders by status (Pending, Shipped, Delivered) and count each."
  },
  {
    "id": 356,
    "levelDisplay": "Level 56",
    "title": "Level 56: Syntax #356: Group music tracks by genre and count total songs in each genre",
    "subtitle": "Group music tracks by genre and count total songs in each genre.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.6 Single-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group music tracks by genre and count total songs in each genre.",
    "xp": 132,
    "table": "MusicTracks",
    "scenario": "Group music tracks by genre and count total songs in each genre.",
    "businessObjective": "Group music tracks by genre and count total songs in each genre.",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT genre, COUNT(*) AS track_count\nFROM MusicTracks\nGROUP BY genre;",
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
        "text": ", COUNT(*) AS track_count\nFROM ",
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
        "correct": "genre",
        "options": [
          "genre",
          "track_title",
          "play_count",
          "release_year"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "GroceryItems",
          "Students",
          "MusicTracks",
          "FlightSchedule"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "CLUSTER BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "genre;",
        "options": [
          "genre ASC;",
          "ALL;",
          "genre;",
          "1;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Group music tracks by genre and count total songs in each genre."
  },
  {
    "id": 357,
    "levelDisplay": "Level 57",
    "title": "Level 57: Syntax #357: Group members by membership plan tier and count subscriptions in each",
    "subtitle": "Group members by membership plan tier and count subscriptions in each.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.6 Single-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group members by membership plan tier and count subscriptions in each.",
    "xp": 134,
    "table": "GymMembers",
    "scenario": "Group members by membership plan tier and count subscriptions in each.",
    "businessObjective": "Group members by membership plan tier and count subscriptions in each.",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT membership_plan, COUNT(*) AS member_count\nFROM GymMembers\nGROUP BY membership_plan;",
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
        "text": ", COUNT(*) AS member_count\nFROM ",
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
        "correct": "membership_plan",
        "options": [
          "member_name",
          "member_id",
          "monthly_fee",
          "membership_plan"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "FlightSchedule",
          "GymMembers",
          "PetClinic",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "PARTITION BY",
          "ORDER BY",
          "GROUP BY",
          "CLUSTER BY"
        ]
      },
      "slot4": {
        "correct": "membership_plan;",
        "options": [
          "ALL;",
          "membership_plan ASC;",
          "1;",
          "membership_plan;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Group members by membership plan tier and count subscriptions in each."
  },
  {
    "id": 358,
    "levelDisplay": "Level 58",
    "title": "Level 58: Syntax #358: Group movie reviews by genre and count total reviews per genre",
    "subtitle": "Group movie reviews by genre and count total reviews per genre.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.6 Single-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group movie reviews by genre and count total reviews per genre.",
    "xp": 136,
    "table": "MovieReviews",
    "scenario": "Group movie reviews by genre and count total reviews per genre.",
    "businessObjective": "Group movie reviews by genre and count total reviews per genre.",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT genre, COUNT(*) AS review_count\nFROM MovieReviews\nGROUP BY genre;",
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
        "text": ", COUNT(*) AS review_count\nFROM ",
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
        "correct": "genre",
        "options": [
          "genre",
          "release_year",
          "movie_title",
          "director"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "MovieReviews",
          "GroceryItems",
          "GymMembers",
          "Employees"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "PARTITION BY",
          "CLUSTER BY"
        ]
      },
      "slot4": {
        "correct": "genre;",
        "options": [
          "ALL;",
          "1;",
          "genre ASC;",
          "genre;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Group movie reviews by genre and count total reviews per genre."
  },
  {
    "id": 359,
    "levelDisplay": "Level 59",
    "title": "Level 59: Syntax #359: Group flights by origin airport and count departures originating from each",
    "subtitle": "Group flights by origin airport and count departures originating from each.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.6 Single-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group flights by origin airport and count departures originating from each.",
    "xp": 138,
    "table": "FlightSchedule",
    "scenario": "Group flights by origin airport and count departures originating from each.",
    "businessObjective": "Group flights by origin airport and count departures originating from each.",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT origin_airport, COUNT(*) AS departures_count\nFROM FlightSchedule\nGROUP BY origin_airport;",
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
        "text": ", COUNT(*) AS departures_count\nFROM ",
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
        "correct": "origin_airport",
        "options": [
          "ticket_price",
          "origin_airport",
          "departure_time",
          "dest_airport"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "Students",
          "GymMembers",
          "FlightSchedule",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "CLUSTER BY",
          "PARTITION BY"
        ]
      },
      "slot4": {
        "correct": "origin_airport;",
        "options": [
          "1;",
          "origin_airport ASC;",
          "origin_airport;",
          "ALL;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Group flights by origin airport and count departures originating from each."
  },
  {
    "id": 360,
    "levelDisplay": "Level 60",
    "title": "Level 60: Syntax #360: Group veterinary patients by species and count patients per animal type",
    "subtitle": "Group veterinary patients by species and count patients per animal type.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.6 Single-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group veterinary patients by species and count patients per animal type.",
    "xp": 140,
    "table": "PetClinic",
    "scenario": "Group veterinary patients by species and count patients per animal type.",
    "businessObjective": "Group veterinary patients by species and count patients per animal type.",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT species, COUNT(*) AS patient_count\nFROM PetClinic\nGROUP BY species;",
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
        "text": ", COUNT(*) AS patient_count\nFROM ",
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
        "correct": "species",
        "options": [
          "breed",
          "pet_name",
          "species",
          "is_vaccinated"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "FlightSchedule",
          "Students",
          "PetClinic",
          "GroceryItems"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "PARTITION BY",
          "ORDER BY",
          "CLUSTER BY"
        ]
      },
      "slot4": {
        "correct": "species;",
        "options": [
          "1;",
          "ALL;",
          "species;",
          "species ASC;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Group veterinary patients by species and count patients per animal type."
  },
  {
    "id": 361,
    "levelDisplay": "Level 61",
    "title": "Level 61: Syntax #361: Compute student count and average GPA per major",
    "subtitle": "Compute student count and average GPA per major.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Compute student count and average GPA per major.",
    "xp": 142,
    "table": "Students",
    "scenario": "Compute student count and average GPA per major.",
    "businessObjective": "Compute student count and average GPA per major.",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT major, COUNT(*) AS total_students, ROUND(AVG(gpa), 2) AS avg_gpa\nFROM Students\nGROUP BY major;",
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
        "text": ", COUNT(*) AS total_records\nFROM ",
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
        "correct": "major",
        "options": [
          "major",
          "age",
          "student_id",
          "full_name"
        ]
      },
      "slot2": {
        "correct": "Students",
        "options": [
          "Students",
          "GymMembers",
          "GroceryItems",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "BUCKET BY",
          "AGGREGATE BY",
          "GROUP BY"
        ]
      },
      "slot4": {
        "correct": "major;",
        "options": [
          "major;",
          "val;",
          "status;",
          "id;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Compute student count and average GPA per major."
  },
  {
    "id": 362,
    "levelDisplay": "Level 62",
    "title": "Level 62: Syntax #362: Calculate title count, average price, and highest price per genre",
    "subtitle": "Calculate title count, average price, and highest price per genre.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Calculate title count, average price, and highest price per genre.",
    "xp": 144,
    "table": "Books",
    "scenario": "Calculate title count, average price, and highest price per genre.",
    "businessObjective": "Calculate title count, average price, and highest price per genre.",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT genre, COUNT(*) AS titles, ROUND(AVG(price), 2) AS avg_price, MAX(price) AS max_price\nFROM Books\nGROUP BY genre;",
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
        "text": ", COUNT(*) AS total_records\nFROM ",
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
        "correct": "genre",
        "options": [
          "book_id",
          "stock_qty",
          "author",
          "genre"
        ]
      },
      "slot2": {
        "correct": "Books",
        "options": [
          "PetClinic",
          "Books",
          "MusicTracks",
          "FlightSchedule"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "BUCKET BY",
          "AGGREGATE BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "genre;",
        "options": [
          "status;",
          "genre;",
          "val;",
          "id;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Calculate title count, average price, and highest price per genre."
  },
  {
    "id": 363,
    "levelDisplay": "Level 63",
    "title": "Level 63: Syntax #363: Calculate staff count, total payroll, and average salary for each department",
    "subtitle": "Calculate staff count, total payroll, and average salary for each department.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Calculate staff count, total payroll, and average salary for each department.",
    "xp": 146,
    "table": "Employees",
    "scenario": "Calculate staff count, total payroll, and average salary for each department.",
    "businessObjective": "Calculate staff count, total payroll, and average salary for each department.",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT department, COUNT(*) AS staff, SUM(salary) AS payroll, ROUND(AVG(salary), 2) AS avg_salary\nFROM Employees\nGROUP BY department;",
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
        "text": ", COUNT(*) AS total_records\nFROM ",
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
        "correct": "department",
        "options": [
          "salary",
          "department",
          "bonus",
          "first_name"
        ]
      },
      "slot2": {
        "correct": "Employees",
        "options": [
          "GroceryItems",
          "Orders",
          "Employees",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "BUCKET BY",
          "ORDER BY",
          "GROUP BY",
          "AGGREGATE BY"
        ]
      },
      "slot4": {
        "correct": "department;",
        "options": [
          "status;",
          "department;",
          "val;",
          "id;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Calculate staff count, total payroll, and average salary for each department."
  },
  {
    "id": 364,
    "levelDisplay": "Level 64",
    "title": "Level 64: Syntax #364: Report item count, total inventory units, and average price per category",
    "subtitle": "Report item count, total inventory units, and average price per category.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Report item count, total inventory units, and average price per category.",
    "xp": 148,
    "table": "GroceryItems",
    "scenario": "Report item count, total inventory units, and average price per category.",
    "businessObjective": "Report item count, total inventory units, and average price per category.",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT category, COUNT(*) AS items, SUM(stock_units) AS total_units, ROUND(AVG(unit_price), 2) AS avg_cost\nFROM GroceryItems\nGROUP BY category;",
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
        "text": ", COUNT(*) AS total_records\nFROM ",
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
        "correct": "category",
        "options": [
          "category",
          "item_id",
          "calories",
          "stock_qty"
        ]
      },
      "slot2": {
        "correct": "GroceryItems",
        "options": [
          "Orders",
          "MovieReviews",
          "Students",
          "GroceryItems"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "AGGREGATE BY",
          "ORDER BY",
          "GROUP BY",
          "BUCKET BY"
        ]
      },
      "slot4": {
        "correct": "category;",
        "options": [
          "id;",
          "category;",
          "status;",
          "val;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Report item count, total inventory units, and average price per category."
  },
  {
    "id": 365,
    "levelDisplay": "Level 65",
    "title": "Level 65: Syntax #365: Compute order volume and total revenue generated per shipping destination city",
    "subtitle": "Compute order volume and total revenue generated per shipping destination city.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Compute order volume and total revenue generated per shipping destination city.",
    "xp": 150,
    "table": "Orders",
    "scenario": "Compute order volume and total revenue generated per shipping destination city.",
    "businessObjective": "Compute order volume and total revenue generated per shipping destination city.",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT shipping_city, COUNT(*) AS order_vol, SUM(quantity * unit_price) AS city_revenue\nFROM Orders\nGROUP BY shipping_city;",
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
        "text": ", COUNT(*) AS total_records\nFROM ",
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
        "correct": "shipping_city",
        "options": [
          "customer_name",
          "shipping_city",
          "quantity",
          "product_name"
        ]
      },
      "slot2": {
        "correct": "Orders",
        "options": [
          "GroceryItems",
          "PetClinic",
          "GymMembers",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "AGGREGATE BY",
          "BUCKET BY",
          "GROUP BY"
        ]
      },
      "slot4": {
        "correct": "shipping_city;",
        "options": [
          "val;",
          "shipping_city;",
          "id;",
          "status;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Compute order volume and total revenue generated per shipping destination city."
  },
  {
    "id": 366,
    "levelDisplay": "Level 66",
    "title": "Level 66: Syntax #366: Report song count, total stream plays, and average length per music genre",
    "subtitle": "Report song count, total stream plays, and average length per music genre.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Report song count, total stream plays, and average length per music genre.",
    "xp": 152,
    "table": "MusicTracks",
    "scenario": "Report song count, total stream plays, and average length per music genre.",
    "businessObjective": "Report song count, total stream plays, and average length per music genre.",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT genre, COUNT(*) AS song_count, SUM(play_count) AS total_plays, ROUND(AVG(duration_seconds), 0) AS avg_sec\nFROM MusicTracks\nGROUP BY genre;",
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
        "text": ", COUNT(*) AS total_records\nFROM ",
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
        "correct": "genre",
        "options": [
          "play_count",
          "genre",
          "track_id",
          "title"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "PetClinic",
          "GroceryItems",
          "Employees",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "AGGREGATE BY",
          "BUCKET BY",
          "GROUP BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "genre;",
        "options": [
          "val;",
          "genre;",
          "id;",
          "status;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Report song count, total stream plays, and average length per music genre."
  },
  {
    "id": 367,
    "levelDisplay": "Level 67",
    "title": "Level 67: Syntax #367: Calculate membership count and average monthly visits per plan tier",
    "subtitle": "Calculate membership count and average monthly visits per plan tier.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Calculate membership count and average monthly visits per plan tier.",
    "xp": 154,
    "table": "GymMembers",
    "scenario": "Calculate membership count and average monthly visits per plan tier.",
    "businessObjective": "Calculate membership count and average monthly visits per plan tier.",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT membership_plan, COUNT(*) AS members, ROUND(AVG(visits_this_month), 1) AS avg_attendance\nFROM GymMembers\nGROUP BY membership_plan;",
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
        "text": ", COUNT(*) AS total_records\nFROM ",
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
        "correct": "membership_plan",
        "options": [
          "membership_plan",
          "has_trainer",
          "joined_date",
          "member_name"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "GroceryItems",
          "PetClinic",
          "MusicTracks",
          "GymMembers"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "BUCKET BY",
          "AGGREGATE BY",
          "ORDER BY",
          "GROUP BY"
        ]
      },
      "slot4": {
        "correct": "membership_plan;",
        "options": [
          "val;",
          "membership_plan;",
          "status;",
          "id;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Calculate membership count and average monthly visits per plan tier."
  },
  {
    "id": 368,
    "levelDisplay": "Level 68",
    "title": "Level 68: Syntax #368: Analyze films reviewed and average star rating per release year",
    "subtitle": "Analyze films reviewed and average star rating per release year.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Analyze films reviewed and average star rating per release year.",
    "xp": 156,
    "table": "MovieReviews",
    "scenario": "Analyze films reviewed and average star rating per release year.",
    "businessObjective": "Analyze films reviewed and average star rating per release year.",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT release_year, COUNT(*) AS films_reviewed, ROUND(AVG(star_rating), 2) AS year_avg_rating\nFROM MovieReviews\nGROUP BY release_year;",
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
        "text": ", COUNT(*) AS total_records\nFROM ",
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
        "correct": "release_year",
        "options": [
          "release_year",
          "genre",
          "movie_title",
          "director"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "GymMembers",
          "GroceryItems",
          "MusicTracks",
          "MovieReviews"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "AGGREGATE BY",
          "BUCKET BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "release_year;",
        "options": [
          "val;",
          "id;",
          "release_year;",
          "status;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Analyze films reviewed and average star rating per release year."
  },
  {
    "id": 369,
    "levelDisplay": "Level 69",
    "title": "Level 69: Syntax #369: Calculate flight count and average fare per destination airport",
    "subtitle": "Calculate flight count and average fare per destination airport.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Calculate flight count and average fare per destination airport.",
    "xp": 158,
    "table": "FlightSchedule",
    "scenario": "Calculate flight count and average fare per destination airport.",
    "businessObjective": "Calculate flight count and average fare per destination airport.",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT destination_airport, COUNT(*) AS flights, ROUND(AVG(ticket_price), 2) AS avg_fare\nFROM FlightSchedule\nGROUP BY destination_airport;",
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
        "text": ", COUNT(*) AS total_records\nFROM ",
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
        "correct": "destination_airport",
        "options": [
          "flight_id",
          "dest_airport",
          "airline",
          "destination_airport"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "FlightSchedule",
          "Books",
          "Employees",
          "GymMembers"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "BUCKET BY",
          "GROUP BY",
          "AGGREGATE BY"
        ]
      },
      "slot4": {
        "correct": "destination_airport;",
        "options": [
          "val;",
          "status;",
          "destination_airport;",
          "id;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Calculate flight count and average fare per destination airport."
  },
  {
    "id": 370,
    "levelDisplay": "Level 70",
    "title": "Level 70: Syntax #370: Determine patient count, average weight, and oldest age per animal species",
    "subtitle": "Determine patient count, average weight, and oldest age per animal species.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.7 Multi-Metric GROUP BY Rollups",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Determine patient count, average weight, and oldest age per animal species.",
    "xp": 160,
    "table": "PetClinic",
    "scenario": "Determine patient count, average weight, and oldest age per animal species.",
    "businessObjective": "Determine patient count, average weight, and oldest age per animal species.",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT species, COUNT(*) AS patients, ROUND(AVG(weight_kg), 1) AS avg_weight, MAX(age_years) AS oldest_age\nFROM PetClinic\nGROUP BY species;",
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
        "text": ", COUNT(*) AS total_records\nFROM ",
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
        "correct": "species",
        "options": [
          "species",
          "age_years",
          "is_vaccinated",
          "pet_name"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "Students",
          "FlightSchedule",
          "PetClinic",
          "Employees"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "AGGREGATE BY",
          "ORDER BY",
          "BUCKET BY"
        ]
      },
      "slot4": {
        "correct": "species;",
        "options": [
          "species;",
          "val;",
          "id;",
          "status;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Determine patient count, average weight, and oldest age per animal species."
  },
  {
    "id": 371,
    "levelDisplay": "Level 71",
    "title": "Level 71: Syntax #371: Group students by both city and major to see geographical major distribution",
    "subtitle": "Group students by both city and major to see geographical major distribution.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.8 Multi-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group students by both city and major to see geographical major distribution.",
    "xp": 162,
    "table": "Students",
    "scenario": "Group students by both city and major to see geographical major distribution.",
    "businessObjective": "Group students by both city and major to see geographical major distribution.",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT city, major, COUNT(*) AS student_count\nFROM Students\nGROUP BY city, major;",
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
        "text": ", COUNT(*) AS group_count\nFROM Students\n",
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
          "last_name",
          "enrolled_year"
        ]
      },
      "slot2": {
        "correct": "major",
        "options": [
          "enrolled_year",
          "age",
          "student_id",
          "major"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "COMBINE BY",
          "GROUP BY",
          "SPLIT BY"
        ]
      },
      "slot4": {
        "correct": "city, major;",
        "options": [
          "major;",
          "city;",
          "major, city;",
          "city, major;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Group students by both city and major to see geographical major distribution."
  },
  {
    "id": 372,
    "levelDisplay": "Level 72",
    "title": "Level 72: Syntax #372: Count published books grouped by both genre and publication year",
    "subtitle": "Count published books grouped by both genre and publication year.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.8 Multi-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Count published books grouped by both genre and publication year.",
    "xp": 164,
    "table": "Books",
    "scenario": "Count published books grouped by both genre and publication year.",
    "businessObjective": "Count published books grouped by both genre and publication year.",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT genre, publish_year, COUNT(*) AS book_count\nFROM Books\nGROUP BY genre, publish_year;",
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
        "text": ", COUNT(*) AS group_count\nFROM Books\n",
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
          "published_year",
          "author",
          "genre"
        ]
      },
      "slot2": {
        "correct": "publish_year",
        "options": [
          "publish_year",
          "published_year",
          "book_id",
          "genre"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "SPLIT BY",
          "COMBINE BY",
          "GROUP BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "genre, publish_year;",
        "options": [
          "genre;",
          "publish_year;",
          "genre, publish_year;",
          "publish_year, genre;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Count published books grouped by both genre and publication year."
  },
  {
    "id": 373,
    "levelDisplay": "Level 73",
    "title": "Level 73: Syntax #373: Count employees grouped by department and office city",
    "subtitle": "Count employees grouped by department and office city.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.8 Multi-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Count employees grouped by department and office city.",
    "xp": 166,
    "table": "Employees",
    "scenario": "Count employees grouped by department and office city.",
    "businessObjective": "Count employees grouped by department and office city.",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT department, city, COUNT(*) AS office_headcount\nFROM Employees\nGROUP BY department, city;",
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
        "text": ", COUNT(*) AS group_count\nFROM Employees\n",
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
          "bonus",
          "department",
          "salary",
          "first_name"
        ]
      },
      "slot2": {
        "correct": "city",
        "options": [
          "department",
          "city",
          "last_name",
          "bonus"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "ORDER BY",
          "GROUP BY",
          "COMBINE BY",
          "SPLIT BY"
        ]
      },
      "slot4": {
        "correct": "department, city;",
        "options": [
          "department, city;",
          "city;",
          "department;",
          "city, department;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Count employees grouped by department and office city."
  },
  {
    "id": 374,
    "levelDisplay": "Level 74",
    "title": "Level 74: Syntax #374: Group grocery items by category and organic status (0 or 1), computing count and avg price",
    "subtitle": "Group grocery items by category and organic status (0 or 1), computing count and avg price.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.8 Multi-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Group grocery items by category and organic status (0 or 1), computing count and avg price.",
    "xp": 168,
    "table": "GroceryItems",
    "scenario": "Group grocery items by category and organic status (0 or 1), computing count and avg price.",
    "businessObjective": "Group grocery items by category and organic status (0 or 1), computing count and avg price.",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT category, is_organic, COUNT(*) AS product_count, ROUND(AVG(unit_price), 2) AS avg_price\nFROM GroceryItems\nGROUP BY category, is_organic;",
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
        "text": ", COUNT(*) AS group_count\nFROM GroceryItems\n",
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
          "stock_qty",
          "category",
          "is_organic",
          "item_name"
        ]
      },
      "slot2": {
        "correct": "is_organic",
        "options": [
          "is_organic",
          "calories",
          "stock_qty",
          "item_id"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "SPLIT BY",
          "GROUP BY",
          "COMBINE BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "category, is_organic;",
        "options": [
          "category, is_organic;",
          "category;",
          "is_organic, category;",
          "is_organic;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Group grocery items by category and organic status (0 or 1), computing count and avg price."
  },
  {
    "id": 375,
    "levelDisplay": "Level 75",
    "title": "Level 75: Syntax #375: Track order counts partitioned by both shipping city and order status",
    "subtitle": "Track order counts partitioned by both shipping city and order status.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.8 Multi-Column GROUP BY",
    "tier": "Specialist",
    "tierColor": "#f59e0b",
    "difficulty": "Specialist",
    "task": "Track order counts partitioned by both shipping city and order status.",
    "xp": 170,
    "table": "Orders",
    "scenario": "Track order counts partitioned by both shipping city and order status.",
    "businessObjective": "Track order counts partitioned by both shipping city and order status.",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT shipping_city, order_status, COUNT(*) AS order_count\nFROM Orders\nGROUP BY shipping_city, order_status;",
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
        "text": ", COUNT(*) AS group_count\nFROM Orders\n",
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
          "order_status",
          "shipping_city",
          "discount_pct",
          "quantity"
        ]
      },
      "slot2": {
        "correct": "order_status",
        "options": [
          "discount_pct",
          "product_name",
          "customer_name",
          "order_status"
        ]
      },
      "slot3": {
        "correct": "GROUP BY",
        "options": [
          "GROUP BY",
          "COMBINE BY",
          "SPLIT BY",
          "ORDER BY"
        ]
      },
      "slot4": {
        "correct": "shipping_city, order_status;",
        "options": [
          "order_status, shipping_city;",
          "shipping_city;",
          "order_status;",
          "shipping_city, order_status;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Track order counts partitioned by both shipping city and order status."
  },
  {
    "id": 376,
    "levelDisplay": "Level 76",
    "title": "Level 76: Syntax #376: Analyze track count and total plays grouped by genre and release year",
    "subtitle": "Analyze track count and total plays grouped by genre and release year.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.8 Multi-Column GROUP BY",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Analyze track count and total plays grouped by genre and release year.",
    "xp": 172,
    "table": "MusicTracks",
    "scenario": "Analyze track count and total plays grouped by genre and release year.",
    "businessObjective": "Analyze track count and total plays grouped by genre and release year.",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT genre, release_year, COUNT(*) AS tracks, SUM(play_count) AS yearly_plays\nFROM MusicTracks\nGROUP BY genre, release_year;",
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
        "text": ", COUNT(*) AS cnt\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY major\n",
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
        "correct": "major",
        "options": [
          "genre",
          "artist",
          "major",
          "title"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "GymMembers",
          "Employees",
          "FlightSchedule",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "WHERE",
          "FILTER",
          "QUALIFY",
          "HAVING"
        ]
      },
      "slot4": {
        "correct": "COUNT(*) >= 2;",
        "options": [
          "COUNT(*) <= 2;",
          "SUM(*) >= 2;",
          "COUNT(*) >= 100;",
          "COUNT(*) >= 2;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Analyze track count and total plays grouped by genre and release year."
  },
  {
    "id": 377,
    "levelDisplay": "Level 77",
    "title": "Level 77: Syntax #377: Segment gym members by plan tier and active membership status",
    "subtitle": "Segment gym members by plan tier and active membership status.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.8 Multi-Column GROUP BY",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Segment gym members by plan tier and active membership status.",
    "xp": 174,
    "table": "GymMembers",
    "scenario": "Segment gym members by plan tier and active membership status.",
    "businessObjective": "Segment gym members by plan tier and active membership status.",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT membership_plan, is_active, COUNT(*) AS member_count\nFROM GymMembers\nGROUP BY membership_plan, is_active;",
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
        "text": ", COUNT(*) AS cnt\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY major\n",
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
        "correct": "major",
        "options": [
          "major",
          "member_name",
          "membership_plan",
          "visits_this_month"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "Students",
          "MusicTracks",
          "GymMembers",
          "Orders"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "FILTER",
          "HAVING",
          "WHERE",
          "QUALIFY"
        ]
      },
      "slot4": {
        "correct": "COUNT(*) >= 2;",
        "options": [
          "COUNT(*) >= 2;",
          "COUNT(*) >= 100;",
          "SUM(*) >= 2;",
          "COUNT(*) <= 2;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Segment gym members by plan tier and active membership status."
  },
  {
    "id": 378,
    "levelDisplay": "Level 78",
    "title": "Level 78: Syntax #378: Group film reviews by genre and release year, analyzing count and average score",
    "subtitle": "Group film reviews by genre and release year, analyzing count and average score.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.8 Multi-Column GROUP BY",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Group film reviews by genre and release year, analyzing count and average score.",
    "xp": 176,
    "table": "MovieReviews",
    "scenario": "Group film reviews by genre and release year, analyzing count and average score.",
    "businessObjective": "Group film reviews by genre and release year, analyzing count and average score.",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT genre, release_year, COUNT(*) AS total_reviews, ROUND(AVG(star_rating), 2) AS avg_rating\nFROM MovieReviews\nGROUP BY genre, release_year;",
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
        "text": ", COUNT(*) AS cnt\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY major\n",
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
        "correct": "major",
        "options": [
          "genre",
          "movie_title",
          "director",
          "major"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "FlightSchedule",
          "MovieReviews",
          "GroceryItems",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "QUALIFY",
          "WHERE",
          "HAVING",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "COUNT(*) >= 2;",
        "options": [
          "COUNT(*) >= 2;",
          "COUNT(*) <= 2;",
          "SUM(*) >= 2;",
          "COUNT(*) >= 100;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Group film reviews by genre and release year, analyzing count and average score."
  },
  {
    "id": 379,
    "levelDisplay": "Level 79",
    "title": "Level 79: Syntax #379: Count scheduled flights for every distinct origin-to-destination flight route",
    "subtitle": "Count scheduled flights for every distinct origin-to-destination flight route.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.8 Multi-Column GROUP BY",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Count scheduled flights for every distinct origin-to-destination flight route.",
    "xp": 178,
    "table": "FlightSchedule",
    "scenario": "Count scheduled flights for every distinct origin-to-destination flight route.",
    "businessObjective": "Count scheduled flights for every distinct origin-to-destination flight route.",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT origin_airport, destination_airport, COUNT(*) AS route_flights\nFROM FlightSchedule\nGROUP BY origin_airport, destination_airport;",
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
        "text": ", COUNT(*) AS cnt\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY major\n",
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
        "correct": "major",
        "options": [
          "delay_minutes",
          "dest_airport",
          "flight_id",
          "major"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "Employees",
          "MusicTracks",
          "Books",
          "FlightSchedule"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "QUALIFY"
        ]
      },
      "slot4": {
        "correct": "COUNT(*) >= 2;",
        "options": [
          "COUNT(*) >= 2;",
          "COUNT(*) >= 100;",
          "COUNT(*) <= 2;",
          "SUM(*) >= 2;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Count scheduled flights for every distinct origin-to-destination flight route."
  },
  {
    "id": 380,
    "levelDisplay": "Level 80",
    "title": "Level 80: Syntax #380: Count registered pets grouped by species and specific breed",
    "subtitle": "Count registered pets grouped by species and specific breed.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.8 Multi-Column GROUP BY",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Count registered pets grouped by species and specific breed.",
    "xp": 180,
    "table": "PetClinic",
    "scenario": "Count registered pets grouped by species and specific breed.",
    "businessObjective": "Count registered pets grouped by species and specific breed.",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT species, breed, COUNT(*) AS pet_count\nFROM PetClinic\nGROUP BY species, breed;",
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
        "text": ", COUNT(*) AS cnt\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY major\n",
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
        "correct": "major",
        "options": [
          "age_years",
          "weight_kg",
          "pet_id",
          "major"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "GroceryItems",
          "GymMembers",
          "PetClinic",
          "Books"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "HAVING",
          "FILTER",
          "QUALIFY",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "COUNT(*) >= 2;",
        "options": [
          "COUNT(*) <= 2;",
          "SUM(*) >= 2;",
          "COUNT(*) >= 100;",
          "COUNT(*) >= 2;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Count registered pets grouped by species and specific breed."
  },
  {
    "id": 381,
    "levelDisplay": "Level 81",
    "title": "Level 81: Syntax #381: Find majors that have 2 or more enrolled students using HAVING",
    "subtitle": "Find majors that have 2 or more enrolled students using HAVING.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.9 Filtering Groups with HAVING",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Find majors that have 2 or more enrolled students using HAVING.",
    "xp": 182,
    "table": "Students",
    "scenario": "Find majors that have 2 or more enrolled students using HAVING.",
    "businessObjective": "Find majors that have 2 or more enrolled students using HAVING.",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT major, COUNT(*) AS student_count\nFROM Students\nGROUP BY major\nHAVING COUNT(*) >= 2;",
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
        "text": ", COUNT(*) AS student_count\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY major\n",
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
        "correct": "major",
        "options": [
          "major",
          "enrolled_year",
          "student_id",
          "gpa"
        ]
      },
      "slot2": {
        "correct": "Students",
        "options": [
          "Students",
          "Orders",
          "MusicTracks",
          "GroceryItems"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "QUALIFY",
          "FILTER",
          "HAVING",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "COUNT(*) >= 2;",
        "options": [
          "COUNT(*) <= 2;",
          "COUNT(*) >= 2;",
          "COUNT(*) >= 100;",
          "SUM(*) >= 2;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Find majors that have 2 or more enrolled students using HAVING."
  },
  {
    "id": 382,
    "levelDisplay": "Level 82",
    "title": "Level 82: Syntax #382: Identify book genres where the average price exceeds $15.00",
    "subtitle": "Identify book genres where the average price exceeds $15.00.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.9 Filtering Groups with HAVING",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Identify book genres where the average price exceeds $15.00.",
    "xp": 184,
    "table": "Books",
    "scenario": "Identify book genres where the average price exceeds $15.00.",
    "businessObjective": "Identify book genres where the average price exceeds $15.00.",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT genre, ROUND(AVG(price), 2) AS avg_price\nFROM Books\nGROUP BY genre\nHAVING AVG(price) > 15.00;",
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
        "text": ", ROUND(AVG(price), 2) AS avg_price\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY genre\n",
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
          "book_id",
          "is_hardcover",
          "genre",
          "price"
        ]
      },
      "slot2": {
        "correct": "Books",
        "options": [
          "MusicTracks",
          "Orders",
          "Books",
          "FlightSchedule"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "WHERE",
          "HAVING",
          "QUALIFY",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "AVG(price) > 15.00;",
        "options": [
          "AVG(price) < 15.00;",
          "AVG(price) > 15.00;_1",
          "AVG(price) > 15.00;",
          "AVG(price) > 100.00;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Identify book genres where the average price exceeds $15.00."
  },
  {
    "id": 383,
    "levelDisplay": "Level 83",
    "title": "Level 83: Syntax #383: List departments whose average employee salary is at least $80,000",
    "subtitle": "List departments whose average employee salary is at least $80,000.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.9 Filtering Groups with HAVING",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "List departments whose average employee salary is at least $80,000.",
    "xp": 186,
    "table": "Employees",
    "scenario": "List departments whose average employee salary is at least $80,000.",
    "businessObjective": "List departments whose average employee salary is at least $80,000.",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT department, ROUND(AVG(salary), 2) AS avg_salary\nFROM Employees\nGROUP BY department\nHAVING AVG(salary) >= 80000;",
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
        "text": ", ROUND(AVG(salary), 2) AS avg_salary\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY department\n",
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
          "salary",
          "department",
          "bonus",
          "last_name"
        ]
      },
      "slot2": {
        "correct": "Employees",
        "options": [
          "Employees",
          "Orders",
          "MovieReviews",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "QUALIFY"
        ]
      },
      "slot4": {
        "correct": "AVG(salary) >= 80000;",
        "options": [
          "AVG(salary) >= 80000;_1",
          "AVG(salary) >= 80000;",
          "AVG(salary) >= 100;",
          "AVG(salary) <= 80000;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: List departments whose average employee salary is at least $80,000."
  },
  {
    "id": 384,
    "levelDisplay": "Level 84",
    "title": "Level 84: Syntax #384: Find grocery categories with over 100 total units in warehouse stock",
    "subtitle": "Find grocery categories with over 100 total units in warehouse stock.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.9 Filtering Groups with HAVING",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Find grocery categories with over 100 total units in warehouse stock.",
    "xp": 188,
    "table": "GroceryItems",
    "scenario": "Find grocery categories with over 100 total units in warehouse stock.",
    "businessObjective": "Find grocery categories with over 100 total units in warehouse stock.",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT category, SUM(stock_units) AS total_units\nFROM GroceryItems\nGROUP BY category\nHAVING SUM(stock_units) > 100;",
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
        "text": ", SUM(stock_units) AS total_units\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY category\n",
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
          "stock_qty",
          "calories",
          "item_name",
          "category"
        ]
      },
      "slot2": {
        "correct": "GroceryItems",
        "options": [
          "GroceryItems",
          "FlightSchedule",
          "Orders",
          "Books"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "FILTER",
          "QUALIFY",
          "HAVING",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "SUM(stock_units) > 100;",
        "options": [
          "SUM(stock_units) > 100;_1",
          "SUM(stock_units) > 100;",
          "SUM(stock_units) > 100;_2",
          "SUM(stock_units) < 100;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Find grocery categories with over 100 total units in warehouse stock."
  },
  {
    "id": 385,
    "levelDisplay": "Level 85",
    "title": "Level 85: Syntax #385: Show cities that have received 2 or more total orders",
    "subtitle": "Show cities that have received 2 or more total orders.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.9 Filtering Groups with HAVING",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Show cities that have received 2 or more total orders.",
    "xp": 190,
    "table": "Orders",
    "scenario": "Show cities that have received 2 or more total orders.",
    "businessObjective": "Show cities that have received 2 or more total orders.",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT shipping_city, COUNT(*) AS order_volume\nFROM Orders\nGROUP BY shipping_city\nHAVING COUNT(*) >= 2;",
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
        "text": ", COUNT(*) AS order_volume\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY shipping_city\n",
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
          "shipping_city",
          "order_id",
          "order_status",
          "unit_price"
        ]
      },
      "slot2": {
        "correct": "Orders",
        "options": [
          "Orders",
          "MovieReviews",
          "FlightSchedule",
          "GroceryItems"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "HAVING",
          "WHERE",
          "FILTER",
          "QUALIFY"
        ]
      },
      "slot4": {
        "correct": "COUNT(*) >= 2;",
        "options": [
          "COUNT(*) <= 2;",
          "COUNT(*) >= 100;",
          "SUM(*) >= 2;",
          "COUNT(*) >= 2;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Show cities that have received 2 or more total orders."
  },
  {
    "id": 386,
    "levelDisplay": "Level 86",
    "title": "Level 86: Syntax #386: Identify music genres with over 1,000,000 collective play streams",
    "subtitle": "Identify music genres with over 1,000,000 collective play streams.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.9 Filtering Groups with HAVING",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Identify music genres with over 1,000,000 collective play streams.",
    "xp": 192,
    "table": "MusicTracks",
    "scenario": "Identify music genres with over 1,000,000 collective play streams.",
    "businessObjective": "Identify music genres with over 1,000,000 collective play streams.",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT genre, SUM(play_count) AS total_plays\nFROM MusicTracks\nGROUP BY genre\nHAVING SUM(play_count) > 1000000;",
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
        "text": ", SUM(play_count) AS total_plays\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY genre\n",
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
          "track_id",
          "track_title",
          "duration_seconds"
        ]
      },
      "slot2": {
        "correct": "MusicTracks",
        "options": [
          "GymMembers",
          "Students",
          "PetClinic",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "WHERE",
          "HAVING",
          "FILTER",
          "QUALIFY"
        ]
      },
      "slot4": {
        "correct": "SUM(play_count) > 1000000;",
        "options": [
          "SUM(play_count) < 1000000;",
          "SUM(play_SUM) > 1000000;",
          "SUM(play_count) > 1000000;",
          "SUM(play_count) > 100;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Identify music genres with over 1,000,000 collective play streams."
  },
  {
    "id": 387,
    "levelDisplay": "Level 87",
    "title": "Level 87: Syntax #387: Find membership tiers where members average 8 or more visits per month",
    "subtitle": "Find membership tiers where members average 8 or more visits per month.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.9 Filtering Groups with HAVING",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Find membership tiers where members average 8 or more visits per month.",
    "xp": 194,
    "table": "GymMembers",
    "scenario": "Find membership tiers where members average 8 or more visits per month.",
    "businessObjective": "Find membership tiers where members average 8 or more visits per month.",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT membership_plan, ROUND(AVG(visits_this_month), 1) AS avg_visits\nFROM GymMembers\nGROUP BY membership_plan\nHAVING AVG(visits_this_month) >= 8.0;",
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
        "text": ", ROUND(AVG(visits_this_month), 1) AS avg_visits\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY membership_plan\n",
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
          "has_trainer",
          "monthly_fee",
          "membership_plan"
        ]
      },
      "slot2": {
        "correct": "GymMembers",
        "options": [
          "Employees",
          "Students",
          "GymMembers",
          "PetClinic"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "FILTER",
          "WHERE",
          "HAVING",
          "QUALIFY"
        ]
      },
      "slot4": {
        "correct": "AVG(visits_this_month) >= 8.0;",
        "options": [
          "AVG(visits_this_month) >= 8.0;_1",
          "AVG(visits_this_month) >= 100.0;",
          "AVG(visits_this_month) <= 8.0;",
          "AVG(visits_this_month) >= 8.0;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Find membership tiers where members average 8 or more visits per month."
  },
  {
    "id": 388,
    "levelDisplay": "Level 88",
    "title": "Level 88: Syntax #388: List movie genres maintaining a stellar average rating of 4.0 or higher",
    "subtitle": "List movie genres maintaining a stellar average rating of 4.0 or higher.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.9 Filtering Groups with HAVING",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "List movie genres maintaining a stellar average rating of 4.0 or higher.",
    "xp": 196,
    "table": "MovieReviews",
    "scenario": "List movie genres maintaining a stellar average rating of 4.0 or higher.",
    "businessObjective": "List movie genres maintaining a stellar average rating of 4.0 or higher.",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT genre, ROUND(AVG(star_rating), 2) AS avg_rating\nFROM MovieReviews\nGROUP BY genre\nHAVING AVG(star_rating) >= 4.0;",
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
        "text": ", ROUND(AVG(star_rating), 2) AS avg_rating\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY genre\n",
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
          "movie_title",
          "release_year",
          "star_rating",
          "genre"
        ]
      },
      "slot2": {
        "correct": "MovieReviews",
        "options": [
          "PetClinic",
          "GymMembers",
          "MovieReviews",
          "MusicTracks"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "FILTER",
          "HAVING",
          "QUALIFY",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "AVG(star_rating) >= 4.0;",
        "options": [
          "AVG(star_rating) >= 4.0;",
          "AVG(star_rating) >= 100.0;",
          "AVG(star_rating) <= 4.0;",
          "AVG(star_rating) >= 4.0;_1"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: List movie genres maintaining a stellar average rating of 4.0 or higher."
  },
  {
    "id": 389,
    "levelDisplay": "Level 89",
    "title": "Level 89: Syntax #389: Find origin airports operating 3 or more outgoing flights",
    "subtitle": "Find origin airports operating 3 or more outgoing flights.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.9 Filtering Groups with HAVING",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Find origin airports operating 3 or more outgoing flights.",
    "xp": 198,
    "table": "FlightSchedule",
    "scenario": "Find origin airports operating 3 or more outgoing flights.",
    "businessObjective": "Find origin airports operating 3 or more outgoing flights.",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT origin_airport, COUNT(*) AS flight_count\nFROM FlightSchedule\nGROUP BY origin_airport\nHAVING COUNT(*) >= 3;",
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
        "text": ", COUNT(*) AS flight_count\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY origin_airport\n",
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
          "ticket_price",
          "dest_airport",
          "origin_airport",
          "destination_airport"
        ]
      },
      "slot2": {
        "correct": "FlightSchedule",
        "options": [
          "GroceryItems",
          "FlightSchedule",
          "MovieReviews",
          "Books"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "WHERE",
          "HAVING",
          "QUALIFY",
          "FILTER"
        ]
      },
      "slot4": {
        "correct": "COUNT(*) >= 3;",
        "options": [
          "SUM(*) >= 3;",
          "COUNT(*) <= 3;",
          "COUNT(*) >= 3;",
          "COUNT(*) >= 100;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Find origin airports operating 3 or more outgoing flights."
  },
  {
    "id": 390,
    "levelDisplay": "Level 90",
    "title": "Level 90: Syntax #390: Find species whose average patient weight exceeds 10.0 kilograms",
    "subtitle": "Find species whose average patient weight exceeds 10.0 kilograms.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.9 Filtering Groups with HAVING",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Find species whose average patient weight exceeds 10.0 kilograms.",
    "xp": 200,
    "table": "PetClinic",
    "scenario": "Find species whose average patient weight exceeds 10.0 kilograms.",
    "businessObjective": "Find species whose average patient weight exceeds 10.0 kilograms.",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT species, ROUND(AVG(weight_kg), 1) AS avg_weight\nFROM PetClinic\nGROUP BY species\nHAVING AVG(weight_kg) > 10.0;",
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
        "text": ", ROUND(AVG(weight_kg), 1) AS avg_weight\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY species\n",
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
          "pet_id",
          "species",
          "breed",
          "age_years"
        ]
      },
      "slot2": {
        "correct": "PetClinic",
        "options": [
          "Books",
          "PetClinic",
          "Orders",
          "GymMembers"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "QUALIFY",
          "WHERE",
          "FILTER",
          "HAVING"
        ]
      },
      "slot4": {
        "correct": "AVG(weight_kg) > 10.0;",
        "options": [
          "AVG(weight_kg) > 10.0;",
          "AVG(weight_kg) > 100.0;",
          "AVG(weight_kg) > 10.0;_1",
          "AVG(weight_kg) < 10.0;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Find species whose average patient weight exceeds 10.0 kilograms."
  },
  {
    "id": 391,
    "levelDisplay": "Level 91",
    "title": "Level 91: Syntax #391: Full lifecycle query: filter by salary > 50000, group by department, keep groups with >= 2 staff, and order descending",
    "subtitle": "Full lifecycle query: filter by salary > 50000, group by department, keep groups with >= 2 staff, and order descending.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Full lifecycle query: filter by salary > 50000, group by department, keep groups with >= 2 staff, and order descending.",
    "xp": 202,
    "table": "Employees",
    "scenario": "Full lifecycle query: filter by salary > 50000, group by department, keep groups with >= 2 staff, and order descending.",
    "businessObjective": "Full lifecycle query: filter by salary > 50000, group by department, keep groups with >= 2 staff, and order descending.",
    "schemaSnippet": "Employees(emp_id INT, first_name VARCHAR, last_name VARCHAR, department VARCHAR, salary DECIMAL, hire_date DATE, bonus DECIMAL)",
    "targetQuery": "SELECT department, COUNT(*) AS staff_count\nFROM Employees\nWHERE salary > 50000\nGROUP BY department\nHAVING COUNT(*) >= 2\nORDER BY staff_count DESC;",
    "template": [
      {
        "text": "SELECT department, COUNT(*) AS total_metric\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY department\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " COUNT(*) >= 2\nORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "Employees",
        "options": [
          "GroceryItems",
          "Books",
          "PetClinic",
          "Employees"
        ]
      },
      "slot2": {
        "correct": "salary > 50000",
        "options": [
          "salary > 50000_1",
          "salary > 50000",
          "salary < 50000",
          "status IS NULL"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "WHERE",
          "RESTRICT",
          "CHECK",
          "HAVING"
        ]
      },
      "slot4": {
        "correct": "staff_count DESC;",
        "options": [
          "staff_count DESC;_1",
          "id ASC;",
          "staff_count DESC;",
          "total_metric ASC;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Employees: Full lifecycle query: filter by salary > 50000, group by department, keep groups with >= 2 staff, and order descending."
  },
  {
    "id": 392,
    "levelDisplay": "Level 92",
    "title": "Level 92: Syntax #392: Filter recent students (>= 2023), group by major, filter high-GPA majors (>= 3.5), and sort top 3",
    "subtitle": "Filter recent students (>= 2023), group by major, filter high-GPA majors (>= 3.5), and sort top 3.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Filter recent students (>= 2023), group by major, filter high-GPA majors (>= 3.5), and sort top 3.",
    "xp": 204,
    "table": "Students",
    "scenario": "Filter recent students (>= 2023), group by major, filter high-GPA majors (>= 3.5), and sort top 3.",
    "businessObjective": "Filter recent students (>= 2023), group by major, filter high-GPA majors (>= 3.5), and sort top 3.",
    "schemaSnippet": "Students(student_id INT, first_name VARCHAR, last_name VARCHAR, full_name VARCHAR, age INT, major VARCHAR, gpa DECIMAL, city VARCHAR, enrolled_year INT)",
    "targetQuery": "SELECT major, ROUND(AVG(gpa), 2) AS avg_gpa\nFROM Students\nWHERE enrolled_year >= 2023\nGROUP BY major\nHAVING AVG(gpa) >= 3.5\nORDER BY avg_gpa DESC\nLIMIT 3;",
    "template": [
      {
        "text": "SELECT major, COUNT(*) AS total_metric\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY major\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " AVG(gpa) >= 3.5\nORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nLIMIT ",
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
        "correct": "Students",
        "options": [
          "Employees",
          "FlightSchedule",
          "GroceryItems",
          "Students"
        ]
      },
      "slot2": {
        "correct": "enrolled_year >= 2023",
        "options": [
          "enrolled_year >= 2023",
          "enrolled_year <= 2023",
          "status IS NULL",
          "enrolled_year >!= 2023"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "RESTRICT",
          "HAVING",
          "WHERE",
          "CHECK"
        ]
      },
      "slot4": {
        "correct": "avg_gpa DESC",
        "options": [
          "id ASC",
          "avg_gpa DESC_1",
          "avg_gpa DESC",
          "total_metric ASC"
        ]
      },
      "slot5": {
        "correct": "3;",
        "options": [
          "3;",
          "50;",
          "10;",
          "1;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Students: Filter recent students (>= 2023), group by major, filter high-GPA majors (>= 3.5), and sort top 3."
  },
  {
    "id": 393,
    "levelDisplay": "Level 93",
    "title": "Level 93: Syntax #393: Fix the WHERE vs HAVING trap: replace 'WHERE COUNT(*) >= 2' with 'HAVING COUNT(*) >= 2' (aggregates cannot be in WHERE)",
    "subtitle": "Fix the WHERE vs HAVING trap: replace 'WHERE COUNT(*) >= 2' with 'HAVING COUNT(*) >= 2' (aggregates cannot be in WHERE).",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Fix the WHERE vs HAVING trap: replace 'WHERE COUNT(*) >= 2' with 'HAVING COUNT(*) >= 2' (aggregates cannot be in WHERE).",
    "xp": 206,
    "table": "Books",
    "scenario": "Fix the WHERE vs HAVING trap: replace 'WHERE COUNT(*) >= 2' with 'HAVING COUNT(*) >= 2' (aggregates cannot be in WHERE).",
    "businessObjective": "Fix the WHERE vs HAVING trap: replace 'WHERE COUNT(*) >= 2' with 'HAVING COUNT(*) >= 2' (aggregates cannot be in WHERE).",
    "schemaSnippet": "Books(book_id INT, title VARCHAR, author VARCHAR, genre VARCHAR, price DECIMAL, stock_qty INT, published_year INT, is_hardcover BOOLEAN)",
    "targetQuery": "SELECT genre, COUNT(*) AS title_count\nFROM Books\nGROUP BY genre\nHAVING COUNT(*) >= 2\nORDER BY title_count DESC;",
    "template": [
      {
        "text": "SELECT genre, COUNT(*) AS total_metric\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY genre\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " COUNT(*) >= 2\nORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "Books",
        "options": [
          "GymMembers",
          "Books",
          "PetClinic",
          "GroceryItems"
        ]
      },
      "slot2": {
        "correct": "salary > 50000",
        "options": [
          "salary < 50000",
          "status IS NULL",
          "salary > 50000",
          "salary > 50000_1"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "RESTRICT",
          "HAVING",
          "CHECK",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "title_count DESC;",
        "options": [
          "title_count DESC;_1",
          "title_count DESC;",
          "total_metric ASC;",
          "id ASC;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Books: Fix the WHERE vs HAVING trap: replace 'WHERE COUNT(*) >= 2' with 'HAVING COUNT(*) >= 2' (aggregates cannot be in WHERE)."
  },
  {
    "id": 394,
    "levelDisplay": "Level 94",
    "title": "Level 94: Syntax #394: Properly combine row filtering in WHERE (stock_units > 10) with group filtering in HAVING (avg_price > 3.00)",
    "subtitle": "Properly combine row filtering in WHERE (stock_units > 10) with group filtering in HAVING (avg_price > 3.00).",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Properly combine row filtering in WHERE (stock_units > 10) with group filtering in HAVING (avg_price > 3.00).",
    "xp": 208,
    "table": "GroceryItems",
    "scenario": "Properly combine row filtering in WHERE (stock_units > 10) with group filtering in HAVING (avg_price > 3.00).",
    "businessObjective": "Properly combine row filtering in WHERE (stock_units > 10) with group filtering in HAVING (avg_price > 3.00).",
    "schemaSnippet": "GroceryItems(item_id INT, item_name VARCHAR, category VARCHAR, unit_price DECIMAL, stock_qty INT, calories INT, is_organic BOOLEAN)",
    "targetQuery": "SELECT category, ROUND(AVG(unit_price), 2) AS avg_price\nFROM GroceryItems\nWHERE stock_units > 10\nGROUP BY category\nHAVING AVG(unit_price) > 3.00\nORDER BY avg_price ASC;",
    "template": [
      {
        "text": "SELECT category, COUNT(*) AS total_metric\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY category\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " AVG(unit_price) > 3.00\nORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "GroceryItems",
        "options": [
          "GymMembers",
          "Books",
          "FlightSchedule",
          "GroceryItems"
        ]
      },
      "slot2": {
        "correct": "stock_units > 10",
        "options": [
          "stock_units > 10",
          "stock_units < 10",
          "status IS NULL",
          "stock_units > 10_1"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "WHERE",
          "HAVING",
          "CHECK",
          "RESTRICT"
        ]
      },
      "slot4": {
        "correct": "avg_price ASC;",
        "options": [
          "avg_price DESC;",
          "avg_price ASC;",
          "total_metric ASC;",
          "id ASC;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GroceryItems: Properly combine row filtering in WHERE (stock_units > 10) with group filtering in HAVING (avg_price > 3.00)."
  },
  {
    "id": 395,
    "levelDisplay": "Level 95",
    "title": "Level 95: Syntax #395: Full lifecycle sales pipeline: filter delivered orders, group by city, filter revenue > 500, order by top revenue",
    "subtitle": "Full lifecycle sales pipeline: filter delivered orders, group by city, filter revenue > 500, order by top revenue.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Full lifecycle sales pipeline: filter delivered orders, group by city, filter revenue > 500, order by top revenue.",
    "xp": 210,
    "table": "Orders",
    "scenario": "Full lifecycle sales pipeline: filter delivered orders, group by city, filter revenue > 500, order by top revenue.",
    "businessObjective": "Full lifecycle sales pipeline: filter delivered orders, group by city, filter revenue > 500, order by top revenue.",
    "schemaSnippet": "Orders(order_id INT, customer_name VARCHAR, product_name VARCHAR, quantity INT, unit_price DECIMAL, discount_pct DECIMAL, order_status VARCHAR, shipping_city VARCHAR)",
    "targetQuery": "SELECT shipping_city, SUM(quantity * unit_price) AS total_revenue\nFROM Orders\nWHERE order_status = 'Delivered'\nGROUP BY shipping_city\nHAVING SUM(quantity * unit_price) > 500\nORDER BY total_revenue DESC;",
    "template": [
      {
        "text": "SELECT shipping_city, COUNT(*) AS total_metric\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY shipping_city\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " SUM(quantity * unit_price) > 500\nORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "Orders",
        "options": [
          "Orders",
          "Students",
          "FlightSchedule",
          "Employees"
        ]
      },
      "slot2": {
        "correct": "order_status = 'Delivered'",
        "options": [
          "order_status = 'Delivered'_1",
          "order_status != 'Delivered'",
          "order_status = 'Delivered'",
          "status IS NULL"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "HAVING",
          "WHERE",
          "RESTRICT",
          "CHECK"
        ]
      },
      "slot4": {
        "correct": "total_revenue DESC;",
        "options": [
          "id ASC;",
          "total_revenue DESC;",
          "total_metric ASC;",
          "total_revenue DESC;_1"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on Orders: Full lifecycle sales pipeline: filter delivered orders, group by city, filter revenue > 500, order by top revenue."
  },
  {
    "id": 396,
    "levelDisplay": "Level 96",
    "title": "Level 96: Syntax #396: Fix the missing GROUP BY error: 'SELECT genre, COUNT(*) FROM MusicTracks ORDER BY 2 DESC;' (must GROUP BY genre)",
    "subtitle": "Fix the missing GROUP BY error: 'SELECT genre, COUNT(*) FROM MusicTracks ORDER BY 2 DESC;' (must GROUP BY genre).",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Fix the missing GROUP BY error: 'SELECT genre, COUNT(*) FROM MusicTracks ORDER BY 2 DESC;' (must GROUP BY genre).",
    "xp": 212,
    "table": "MusicTracks",
    "scenario": "Fix the missing GROUP BY error: 'SELECT genre, COUNT(*) FROM MusicTracks ORDER BY 2 DESC;' (must GROUP BY genre).",
    "businessObjective": "Fix the missing GROUP BY error: 'SELECT genre, COUNT(*) FROM MusicTracks ORDER BY 2 DESC;' (must GROUP BY genre).",
    "schemaSnippet": "MusicTracks(track_id INT, title VARCHAR, track_title VARCHAR, artist VARCHAR, artist_name VARCHAR, genre VARCHAR, duration_seconds INT, play_count INT, release_year INT)",
    "targetQuery": "SELECT genre, COUNT(*) AS track_count\nFROM MusicTracks\nGROUP BY genre\nORDER BY track_count DESC\nLIMIT 5;",
    "template": [
      {
        "text": "SELECT department, COUNT(*) AS total_metric\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY department\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " COUNT(*) >= 2\nORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nLIMIT ",
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
        "correct": "MusicTracks",
        "options": [
          "MusicTracks",
          "FlightSchedule",
          "MovieReviews",
          "PetClinic"
        ]
      },
      "slot2": {
        "correct": "salary > 50000",
        "options": [
          "salary > 50000",
          "salary > 50000_1",
          "status IS NULL",
          "salary < 50000"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "CHECK",
          "RESTRICT",
          "HAVING",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "track_count DESC",
        "options": [
          "id ASC",
          "track_count DESC_1",
          "track_count DESC",
          "total_metric ASC"
        ]
      },
      "slot5": {
        "correct": "5;",
        "options": [
          "10;",
          "1;",
          "50;",
          "5;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MusicTracks: Fix the missing GROUP BY error: 'SELECT genre, COUNT(*) FROM MusicTracks ORDER BY 2 DESC;' (must GROUP BY genre)."
  },
  {
    "id": 397,
    "levelDisplay": "Level 97",
    "title": "Level 97: Syntax #397: Filter active gym members, group by plan, enforce active_count >= 2 with HAVING, and order descending",
    "subtitle": "Filter active gym members, group by plan, enforce active_count >= 2 with HAVING, and order descending.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Filter active gym members, group by plan, enforce active_count >= 2 with HAVING, and order descending.",
    "xp": 214,
    "table": "GymMembers",
    "scenario": "Filter active gym members, group by plan, enforce active_count >= 2 with HAVING, and order descending.",
    "businessObjective": "Filter active gym members, group by plan, enforce active_count >= 2 with HAVING, and order descending.",
    "schemaSnippet": "GymMembers(member_id INT, member_name VARCHAR, membership_plan VARCHAR, monthly_fee DECIMAL, joined_date DATE, visits_this_month INT, has_trainer BOOLEAN)",
    "targetQuery": "SELECT membership_plan, COUNT(*) AS active_count\nFROM GymMembers\nWHERE is_active = 1\nGROUP BY membership_plan\nHAVING COUNT(*) >= 2\nORDER BY active_count DESC;",
    "template": [
      {
        "text": "SELECT membership_plan, COUNT(*) AS total_metric\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY membership_plan\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " COUNT(*) >= 2\nORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "GymMembers",
        "options": [
          "Books",
          "Employees",
          "GymMembers",
          "FlightSchedule"
        ]
      },
      "slot2": {
        "correct": "is_active = 1",
        "options": [
          "is_active = 1",
          "status IS NULL",
          "is_active = 1_1",
          "is_active != 1"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "CHECK",
          "RESTRICT",
          "HAVING",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "active_count DESC;",
        "options": [
          "id ASC;",
          "active_count DESC;_1",
          "active_count DESC;",
          "total_metric ASC;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on GymMembers: Filter active gym members, group by plan, enforce active_count >= 2 with HAVING, and order descending."
  },
  {
    "id": 398,
    "levelDisplay": "Level 98",
    "title": "Level 98: Syntax #398: Filter reviews >= 3.0 stars, group by release year, filter years with >= 2 reviews, and sort chronologically",
    "subtitle": "Filter reviews >= 3.0 stars, group by release year, filter years with >= 2 reviews, and sort chronologically.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Filter reviews >= 3.0 stars, group by release year, filter years with >= 2 reviews, and sort chronologically.",
    "xp": 216,
    "table": "MovieReviews",
    "scenario": "Filter reviews >= 3.0 stars, group by release year, filter years with >= 2 reviews, and sort chronologically.",
    "businessObjective": "Filter reviews >= 3.0 stars, group by release year, filter years with >= 2 reviews, and sort chronologically.",
    "schemaSnippet": "MovieReviews(review_id INT, movie_title VARCHAR, director VARCHAR, star_rating DECIMAL, review_count INT, release_year INT, genre VARCHAR)",
    "targetQuery": "SELECT release_year, ROUND(AVG(star_rating), 2) AS avg_rating\nFROM MovieReviews\nWHERE star_rating >= 3.0\nGROUP BY release_year\nHAVING COUNT(*) >= 2\nORDER BY release_year ASC;",
    "template": [
      {
        "text": "SELECT release_year, COUNT(*) AS total_metric\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY release_year\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " COUNT(*) >= 2\nORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "MovieReviews",
        "options": [
          "Employees",
          "GroceryItems",
          "MovieReviews",
          "Books"
        ]
      },
      "slot2": {
        "correct": "star_rating >= 3.0",
        "options": [
          "star_rating <= 3.0",
          "star_rating >= 3.0",
          "status IS NULL",
          "star_rating >!= 3.0"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "CHECK",
          "WHERE",
          "RESTRICT",
          "HAVING"
        ]
      },
      "slot4": {
        "correct": "release_year ASC;",
        "options": [
          "release_year ASC;",
          "release_year DESC;",
          "id ASC;",
          "total_metric ASC;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on MovieReviews: Filter reviews >= 3.0 stars, group by release year, filter years with >= 2 reviews, and sort chronologically."
  },
  {
    "id": 399,
    "levelDisplay": "Level 99",
    "title": "Level 99: Syntax #399: Analyze popular destinations: filter on-time flights, group by destination, filter count >= 2, return top 3",
    "subtitle": "Analyze popular destinations: filter on-time flights, group by destination, filter count >= 2, return top 3.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Analyze popular destinations: filter on-time flights, group by destination, filter count >= 2, return top 3.",
    "xp": 218,
    "table": "FlightSchedule",
    "scenario": "Analyze popular destinations: filter on-time flights, group by destination, filter count >= 2, return top 3.",
    "businessObjective": "Analyze popular destinations: filter on-time flights, group by destination, filter count >= 2, return top 3.",
    "schemaSnippet": "FlightSchedule(flight_id INT, airline VARCHAR, origin_airport VARCHAR, destination_airport VARCHAR, dest_airport VARCHAR, departure_time VARCHAR, delay_minutes INT, ticket_price DECIMAL)",
    "targetQuery": "SELECT destination_airport, COUNT(*) AS flight_count\nFROM FlightSchedule\nWHERE status = 'On Time'\nGROUP BY destination_airport\nHAVING COUNT(*) >= 2\nORDER BY flight_count DESC\nLIMIT 3;",
    "template": [
      {
        "text": "SELECT destination_airport, COUNT(*) AS total_metric\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY destination_airport\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " COUNT(*) >= 2\nORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nLIMIT ",
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
        "correct": "FlightSchedule",
        "options": [
          "Books",
          "GroceryItems",
          "FlightSchedule",
          "Employees"
        ]
      },
      "slot2": {
        "correct": "status = 'On Time'",
        "options": [
          "status = 'On Time'",
          "status = 'On Time'_1",
          "status != 'On Time'",
          "status IS NULL"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "WHERE",
          "CHECK",
          "HAVING",
          "RESTRICT"
        ]
      },
      "slot4": {
        "correct": "flight_count DESC",
        "options": [
          "id ASC",
          "flight_count DESC_1",
          "total_metric ASC",
          "flight_count DESC"
        ]
      },
      "slot5": {
        "correct": "3;",
        "options": [
          "3;",
          "50;",
          "10;",
          "1;"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on FlightSchedule: Analyze popular destinations: filter on-time flights, group by destination, filter count >= 2, return top 3."
  },
  {
    "id": 400,
    "levelDisplay": "Level 100",
    "title": "Level 100: Syntax #400: Fix clause order trap: ensure WHERE comes before GROUP BY and HAVING comes after GROUP BY",
    "subtitle": "Fix clause order trap: ensure WHERE comes before GROUP BY and HAVING comes after GROUP BY.",
    "type": "fill_blank",
    "category": "Section 04: Aggregations & GROUP BY",
    "subcluster": "4.10 Full Lifecycle SQL & Bug Hunts",
    "tier": "Master (FAANG-Ready)",
    "tierColor": "#ec4899",
    "difficulty": "Master (FAANG-Ready)",
    "task": "Fix clause order trap: ensure WHERE comes before GROUP BY and HAVING comes after GROUP BY.",
    "xp": 220,
    "table": "PetClinic",
    "scenario": "Fix clause order trap: ensure WHERE comes before GROUP BY and HAVING comes after GROUP BY.",
    "businessObjective": "Fix clause order trap: ensure WHERE comes before GROUP BY and HAVING comes after GROUP BY.",
    "schemaSnippet": "PetClinic(pet_id INT, pet_name VARCHAR, species VARCHAR, breed VARCHAR, age_years INT, weight_kg DECIMAL, is_vaccinated BOOLEAN)",
    "targetQuery": "SELECT species, ROUND(AVG(weight_kg), 1) AS avg_weight\nFROM PetClinic\nWHERE age_years >= 1\nGROUP BY species\nHAVING AVG(weight_kg) > 5.0\nORDER BY avg_weight DESC;",
    "template": [
      {
        "text": "SELECT species, COUNT(*) AS total_metric\nFROM ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot1",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nWHERE ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot2",
        "placeholder": "[ ___ ]"
      },
      {
        "text": "\nGROUP BY species\n",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot3",
        "placeholder": "[ ___ ]"
      },
      {
        "text": " AVG(weight_kg) > 5.0\nORDER BY ",
        "isBlank": false
      },
      {
        "text": "",
        "isBlank": true,
        "slotId": "slot4",
        "placeholder": "[ ___ ]"
      },
      {
        "text": ";",
        "isBlank": false
      }
    ],
    "slots": {
      "slot1": {
        "correct": "PetClinic",
        "options": [
          "MusicTracks",
          "GymMembers",
          "FlightSchedule",
          "PetClinic"
        ]
      },
      "slot2": {
        "correct": "age_years >= 1",
        "options": [
          "age_years <= 1",
          "age_years >= 1",
          "age_years >!= 1",
          "status IS NULL"
        ]
      },
      "slot3": {
        "correct": "HAVING",
        "options": [
          "RESTRICT",
          "CHECK",
          "HAVING",
          "WHERE"
        ]
      },
      "slot4": {
        "correct": "avg_weight DESC;",
        "options": [
          "avg_weight DESC;",
          "total_metric ASC;",
          "id ASC;",
          "avg_weight DESC;_1"
        ]
      }
    },
    "syntaxRule": "Aggregate functions compute summary metrics. In GROUP BY queries, every column in SELECT must either be aggregated or listed in GROUP BY. Filter rows with WHERE; filter aggregate groups with HAVING.",
    "syntaxTrap": "Writing an aggregate function like 'WHERE COUNT(*) > 1' in the WHERE clause (illegal; use HAVING instead), or omitting a non-aggregated column from the GROUP BY clause.",
    "eli5Story": "Grouping and aggregating data on PetClinic: Fix clause order trap: ensure WHERE comes before GROUP BY and HAVING comes after GROUP BY."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SECTION4_QUESTS: window.QUESTS_SECTION_4 };
}
