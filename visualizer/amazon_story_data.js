// =============================================================================
// AMAZON DATA ANALYST 30-DAY ONBOARDING STORY DATA
// Role: Junior Data Analyst (L4) on the Amazon Retail & Prime Operations Team
// Each day includes:
// - Persona (Sarah L6 BIE Lead, David L5 PMT, Priya L7 Ops Director)
// - Slack / Chime Ticket with priority & business urgency
// - Deep Context Report: Why this matters, what to focus on, traps, sample schema
// - Hands-on challenge with interactive blanks, hints, and expected query
// =============================================================================

window.AMAZON_ANALYST_STORY_DATA = [
  // ---------------------------------------------------------------------------
  // WEEK 1: ONBOARDING & FAST AD-HOC AUDITS (DAYS 01 - 07)
  // ---------------------------------------------------------------------------
  {
    day: 1,
    week: 1,
    phase: "Week 1: Onboarding & Ad-Hoc Discovery",
    title: "Day 01: Setup & The High-Priced Electronics Audit",
    sender: "Sarah Jenkins",
    senderRole: "L6 Senior BIE Lead",
    senderAvatar: "👩‍💼",
    priority: "P2 - Onboarding",
    department: "Amazon Retail & Catalog Systems",
    chimeMessage: "Hey! Welcome to Amazon! 🎉 Got your laptop set up and Redshift credentials active? Your first task from Category Management is an ad-hoc catalog sanity check: Pull our top 10 highest-priced items in the 'Electronics' department. A third-party merchant might have accidentally entered yen instead of USD.",
    contextReport: {
      businessWhy: "Third-party (3P) merchants regularly upload pricing catalogs via CSV. If a seller enters a TV for $1,200,000 instead of $1,200, it wrecks search rankings, distorts category averages, and triggers automated credit card fraud blocks. Data Analysts run fast sanity audits before automated scrapers index corrupted prices.",
      learningFocus: [
        "Projection syntax: Choosing exact columns (`asin`, `product_name`, `price_usd`) rather than `SELECT *`",
        "Exact equality filtering using single quotes (`department = 'Electronics'`)",
        "Deterministic sorting (`ORDER BY price_usd DESC`) to float extreme anomalies to the top",
        "Row slicing with `LIMIT 10` to avoid pulling millions of products into memory"
      ],
      sampleSchema: "products_catalog (\n  asin VARCHAR(10) PRIMARY KEY,\n  product_name VARCHAR(255),\n  department VARCHAR(50),\n  price_usd DECIMAL(10,2),\n  is_prime_eligible BOOLEAN,\n  merchant_id VARCHAR(20)\n)",
      realWorldTrap: "Never run `SELECT * FROM products_catalog` without a `LIMIT` or partition filter in AWS Redshift! Amazon catalogs contain over 350 million active ASINs. Unbounded queries trigger massive disk spills and angry Slack pings from database administrators.",
      interviewRelevance: "Amazon interviewers always watch whether you default to `SELECT *` or select precise columns. Specifying columns shows production efficiency and cost awareness."
    },
    schema: "products_catalog",
    challenge: {
      instruction: "Write a query to retrieve the ASIN, product name, and price for the top 10 most expensive products in the Electronics department.",
      template: "SELECT asin, product_name, price_usd\nFROM products_catalog\nWHERE department = ___1___\nORDER BY ___2___ ___3___\nLIMIT ___4___;",
      blanks: [
        { id: 1, label: "Department Filter", answer: "'Electronics'", options: ["'Electronics'", "'electronics'", "Electronics", "NULL"] },
        { id: 2, label: "Sort Column", answer: "price_usd", options: ["price_usd", "asin", "product_name", "department"] },
        { id: 3, label: "Sort Direction", answer: "DESC", options: ["DESC", "ASC", "TOP", "MAX"] },
        { id: 4, label: "Row Limit", answer: "10", options: ["10", "100", "ALL", "1"] }
      ],
      expectedSql: "SELECT asin, product_name, price_usd FROM products_catalog WHERE department = 'Electronics' ORDER BY price_usd DESC LIMIT 10;",
      managerReview: "Great job! You isolated the top anomalies immediately. Notice that ASIN B09XYZ was listed at $840,000.00 — a merchant entered Japanese Yen! Ops contacted the seller to lock the listing before customers saw it."
    }
  },
  {
    day: 2,
    week: 1,
    phase: "Week 1: Onboarding & Ad-Hoc Discovery",
    title: "Day 02: Prime Membership Churn Risk Radar",
    sender: "David Chen",
    senderRole: "L5 Principal Product Manager (Prime Retention)",
    senderAvatar: "👨‍💻",
    priority: "P1 - High Urgency",
    department: "Prime Growth & Lifecycle",
    chimeMessage: "Morning! Marketing is launching an urgent retention push for Prime subscribers who haven't logged in since the start of Q3 (2026-07-01). Can you pull their customer IDs, email domains, and total historic order counts?",
    contextReport: {
      businessWhy: "Prime subscribers generate over 3x the annual Gross Merchandise Value (GMV) of non-Prime shoppers. When a Prime member goes dark for more than 60 days, their probability of renewal cancellation jumps by 47%. Catching dormant users early with targeted perks saves millions in recurring subscription revenue.",
      learningFocus: [
        "Boolean filtering: `is_prime = TRUE` (or `1` depending on database dialect)",
        "Temporal comparison: Using standard ISO-8601 timestamps (`last_login_date < '2026-07-01'`)",
        "Compound logic with `AND`: Ensuring both membership status and inactivity criteria are met",
        "Understanding indexing on date columns for fast sequential scans"
      ],
      sampleSchema: "customers (\n  customer_id INT PRIMARY KEY,\n  customer_email VARCHAR(100),\n  is_prime BOOLEAN,\n  signup_date DATE,\n  last_login_date DATE,\n  lifetime_order_count INT\n)",
      realWorldTrap: "Be careful with timestamp vs date formats. If `last_login_date` has a time component (e.g. `2026-07-01 14:32:00`), `< '2026-07-01'` excludes logins that occurred earlier in the day on July 1st.",
      interviewRelevance: "Common Amazon behavioral question: 'Tell me about a time you identified customer friction before leadership noticed.' Cohort dormancy queries are classic answers."
    },
    schema: "customers",
    challenge: {
      instruction: "Filter for active Prime members who have not logged in since July 1, 2026 (`'2026-07-01'`), ordered by lifetime orders descending.",
      template: "SELECT customer_id, customer_email, lifetime_order_count\nFROM customers\nWHERE is_prime = ___1___\n  AND last_login_date < ___2___\nORDER BY ___3___ ___4___;",
      blanks: [
        { id: 1, label: "Prime Condition", answer: "TRUE", options: ["TRUE", "FALSE", "'YES'", "NULL"] },
        { id: 2, label: "Cutoff Date", answer: "'2026-07-01'", options: ["'2026-07-01'", "2026-07-01", "'07-01-2026'", "NOW()"] },
        { id: 3, label: "Sort Column", answer: "lifetime_order_count", options: ["lifetime_order_count", "customer_id", "last_login_date", "is_prime"] },
        { id: 4, label: "Direction", answer: "DESC", options: ["DESC", "ASC", "ORDER", "LIMIT"] }
      ],
      expectedSql: "SELECT customer_id, customer_email, lifetime_order_count FROM customers WHERE is_prime = TRUE AND last_login_date < '2026-07-01' ORDER BY lifetime_order_count DESC;",
      managerReview: "Clean syntax! Notice how we sorted by `lifetime_order_count DESC`. That allows the marketing team to segment high-value VIP churners from one-off accounts."
    }
  },
  {
    day: 3,
    week: 1,
    phase: "Week 1: Onboarding & Ad-Hoc Discovery",
    title: "Day 03: High-Value Cart Abandonment Sweep",
    sender: "Priya Nair",
    senderRole: "L7 Director of Operations",
    senderAvatar: "👩‍💼",
    priority: "P1 - Urgent",
    department: "Consumer Checkout Funnel",
    chimeMessage: "Hey team, we're testing a real-time recovery trigger for carts abandoned with items exceeding $150 total. I need a query to flag carts in 'ABANDONED' status created in the last 24 hours that haven't converted.",
    contextReport: {
      businessWhy: "In e-commerce, 70% of shoppers abandon carts before checkout. For baskets over $150, the primary causes are unexpected shipping fees or card authorization delays. Triggering an automated 1-hour email reminder or SMS recovery discount recaptures up to 12% of lost sales.",
      learningFocus: [
        "Status string filtering: `cart_status = 'ABANDONED'`",
        "Numeric inequality filters: `estimated_cart_value >= 150.00`",
        "Excluding converted carts to avoid spamming customers who already purchased",
        "Multi-condition `WHERE` evaluation using `AND` and parentheses for clarity"
      ],
      sampleSchema: "shopping_carts (\n  cart_id VARCHAR(36) PRIMARY KEY,\n  customer_id INT,\n  cart_status VARCHAR(20), -- 'ACTIVE', 'ABANDONED', 'CONVERTED'\n  item_count INT,\n  estimated_cart_value DECIMAL(10,2),\n  created_at TIMESTAMP,\n  is_reminder_sent BOOLEAN\n)",
      realWorldTrap: "Numeric comparisons must match data types. Comparing `estimated_cart_value >= '150'` as a string can cause alphabetical sorting bugs where '90' is considered greater than '150'!",
      interviewRelevance: "Amazon's Leadership Principle 'Customer Obsession': Recovering high-value carts requires respecting customer privacy while eliminating checkout friction."
    },
    schema: "shopping_carts",
    challenge: {
      instruction: "Identify abandoned carts with an estimated value of $150 or more that have not yet had a reminder sent.",
      template: "SELECT cart_id, customer_id, estimated_cart_value, item_count\nFROM shopping_carts\nWHERE cart_status = ___1___\n  AND estimated_cart_value >= ___2___\n  AND is_reminder_sent = ___3___;",
      blanks: [
        { id: 1, label: "Status Filter", answer: "'ABANDONED'", options: ["'ABANDONED'", "'ACTIVE'", "'CONVERTED'", "NULL"] },
        { id: 2, label: "Value Threshold", answer: "150.00", options: ["150.00", "'150.00'", "15000", "0"] },
        { id: 3, label: "Reminder Status", answer: "FALSE", options: ["FALSE", "TRUE", "NULL", "'NO'"] }
      ],
      expectedSql: "SELECT cart_id, customer_id, estimated_cart_value, item_count FROM shopping_carts WHERE cart_status = 'ABANDONED' AND estimated_cart_value >= 150.00 AND is_reminder_sent = FALSE;",
      managerReview: "Spot on! That list feeds directly into the automated SQS message queue. Over 4,200 customers received recovery notifications within 15 minutes."
    }
  },
  {
    day: 4,
    week: 1,
    phase: "Week 1: Onboarding & Ad-Hoc Discovery",
    title: "Day 04: Warehouse Barcode & UPC Null Audit",
    sender: "Carlos Santos",
    senderRole: "L5 Fulfillment Center Operations Manager",
    senderAvatar: "👷‍♂️",
    priority: "P0 - Blocker",
    department: "FBA Receiving & Inbound Docks",
    chimeMessage: "Urgent issue at warehouse BWI2 (Baltimore)! The conveyor scanners are erroring out on inbound cartons because merchant listings have blank or missing UPC barcodes. Pull all active merchant listings where the UPC is missing so we can reject inbound pallets at the gate!",
    contextReport: {
      businessWhy: "Amazon's automated robotic warehouses rely on handheld and overhead barcode scanners. When an item has no UPC/EAN barcode, the dock worker has to set it aside in 'Problem Solve' cages. A backlog of 500 unscannable cartons stalls an entire fulfillment center dock.",
      learningFocus: [
        "The critical difference between `NULL` and empty string `''`",
        "Using `IS NULL` instead of `= NULL` (Three-Valued Logic trap)",
        "Using `OR` to catch both missing formats (`upc IS NULL OR upc = ''`)",
        "Filtering active listings (`status = 'ACTIVE'`)"
      ],
      sampleSchema: "merchant_listings (\n  listing_id INT PRIMARY KEY,\n  merchant_id VARCHAR(20),\n  asin VARCHAR(10),\n  upc_code VARCHAR(14),\n  listing_status VARCHAR(20),\n  inbound_units INT\n)",
      realWorldTrap: "Writing `WHERE upc_code = NULL` evaluates to `UNKNOWN` in SQL and returns ZERO rows, even if millions of rows have null UPCs! Always use `IS NULL`.",
      interviewRelevance: "This is the single most common SQL interview question at Amazon: 'How do you check for missing data in SQL, and why does `= NULL` fail?'"
    },
    schema: "merchant_listings",
    challenge: {
      instruction: "Find all active merchant listings where the `upc_code` is either NULL or an empty string, ordered by inbound units descending.",
      template: "SELECT listing_id, merchant_id, asin, inbound_units\nFROM merchant_listings\nWHERE listing_status = 'ACTIVE'\n  AND (upc_code ___1___ OR upc_code = ___2___)\nORDER BY inbound_units ___3___;",
      blanks: [
        { id: 1, label: "Null Check Operator", answer: "IS NULL", options: ["IS NULL", "= NULL", "== NULL", "IS EMPTY"] },
        { id: 2, label: "Empty String Value", answer: "''", options: ["''", "'NULL'", "\"\"", "0"] },
        { id: 3, label: "Sort Direction", answer: "DESC", options: ["DESC", "ASC", "TOP", "MAX"] }
      ],
      expectedSql: "SELECT listing_id, merchant_id, asin, inbound_units FROM merchant_listings WHERE listing_status = 'ACTIVE' AND (upc_code IS NULL OR upc_code = '') ORDER BY inbound_units DESC;",
      managerReview: "Excellent defensive SQL! Notice how you wrapped the `OR` conditions in parentheses `(upc_code IS NULL OR upc_code = '')`. Without those parentheses, `AND` precedence would have ruined the query!"
    }
  },
  {
    day: 5,
    week: 1,
    phase: "Week 1: Onboarding & Ad-Hoc Discovery",
    title: "Day 05: Brand Protection & Counterfeit Review Scan",
    sender: "Sarah Jenkins",
    senderRole: "L6 Senior BIE Lead",
    senderAvatar: "👩‍💼",
    priority: "P1 - High Urgency",
    department: "Customer Trust & Partner Support (CTPS)",
    chimeMessage: "Customer Trust has a task for us: Scan verified customer reviews for red-flag words like 'counterfeit', 'fake', or 'knockoff' across high-end luxury cosmetics. We need the review ID, star rating, and review text.",
    contextReport: {
      businessWhy: "Amazon's 'Project Zero' protects brand trademarks. If counterfeit goods slip onto the platform, brands sue and customers lose trust. Analysts build keyword scanning triggers to funnel suspect reviews directly to human compliance investigators.",
      learningFocus: [
        "Wildcard string pattern matching: `LIKE '%counterfeit%'`",
        "Case-insensitive matching: Wrapping fields in `LOWER(review_body)` or using `ILIKE` in PostgreSQL/Redshift",
        "Filtering by verified purchase badge: `is_verified_purchase = TRUE`",
        "Narrowing search space by product category to optimize I/O performance"
      ],
      sampleSchema: "customer_reviews (\n  review_id VARCHAR(36) PRIMARY KEY,\n  asin VARCHAR(10),\n  star_rating INT,\n  review_title VARCHAR(150),\n  review_body TEXT,\n  is_verified_purchase BOOLEAN,\n  review_date DATE\n)",
      realWorldTrap: "Using `LIKE '%keyword%'` with a leading wildcard forces a full table scan because standard B-tree indexes cannot be used. In production data lakes, analysts use Trigram indexes or search engines like OpenSearch.",
      interviewRelevance: "Interviewers frequently test text manipulation: 'How do you perform substring searches in SQL, and what is the performance impact of leading wildcards?'"
    },
    schema: "customer_reviews",
    challenge: {
      instruction: "Find verified customer reviews where the lowercased review body contains the word 'counterfeit' and the rating is 1 or 2 stars.",
      template: "SELECT review_id, asin, star_rating, review_body\nFROM customer_reviews\nWHERE is_verified_purchase = ___1___\n  AND star_rating <= ___2___\n  AND LOWER(review_body) LIKE ___3___;",
      blanks: [
        { id: 1, label: "Verified Purchase", answer: "TRUE", options: ["TRUE", "FALSE", "'YES'", "1"] },
        { id: 2, label: "Low Rating Cutoff", answer: "2", options: ["2", "1", "3", "5"] },
        { id: 3, label: "Wildcard Match", answer: "'%counterfeit%'", options: ["'%counterfeit%'", "'counterfeit%'", "'%counterfeit'", "'counterfeit'"] }
      ],
      expectedSql: "SELECT review_id, asin, star_rating, review_body FROM customer_reviews WHERE is_verified_purchase = TRUE AND star_rating <= 2 AND LOWER(review_body) LIKE '%counterfeit%';",
      managerReview: "Super clean! The Legal and Brand Protection teams flagged 14 seller listings for immediate investigation. You protected our customers today!"
    }
  },
  {
    day: 6,
    week: 1,
    phase: "Week 1: Onboarding & Ad-Hoc Discovery",
    title: "Day 06: Merchandising Price Tier Classification",
    sender: "David Chen",
    senderRole: "L5 Principal Product Manager",
    senderAvatar: "👨‍💻",
    priority: "P2 - Feature Prep",
    department: "Amazon Deals Desk",
    chimeMessage: "Hey! The Deals Desk is redesigning the landing page for holiday promotions. They want every product categorized into one of three price tiers: 'Budget' (<$25), 'Mid-Tier' ($25 to $100), and 'Premium' (>$100). Can you build this classification column?",
    contextReport: {
      businessWhy: "Customers shop by budget brackets during gift seasons (e.g. 'Gifts under $25', 'Luxury Tech'). Creating dynamic price tiers in SQL allows frontend merchandisers to power filter toggles without hardcoding static values in application code.",
      learningFocus: [
        "The syntax of conditional statements: `CASE WHEN ... THEN ... ELSE ... END`",
        "Understanding rule precedence: SQL evaluates conditions top-down and exits on the first `TRUE` match",
        "Handling edge cases with a defensive `ELSE` fallback",
        "Aliasing calculated columns with clear business names like `AS price_tier`"
      ],
      sampleSchema: "products_catalog (\n  asin VARCHAR(10) PRIMARY KEY,\n  title VARCHAR(200),\n  price DECIMAL(10,2),\n  category VARCHAR(50)\n)",
      realWorldTrap: "Forgetting the `END` keyword in `CASE WHEN` causes an instant syntax error. Always ensure every `CASE` has a closing `END`!",
      interviewRelevance: "`CASE WHEN` is evaluated in nearly 100% of SQL technical interviews for data analysts. It proves you can transform raw numbers into business categories."
    },
    schema: "products_catalog",
    challenge: {
      instruction: "Classify products into 'Budget', 'Mid-Tier', or 'Premium' using a CASE WHEN expression.",
      template: "SELECT asin, title, price,\n  CASE\n    WHEN price < 25.00 THEN ___1___\n    WHEN price <= 100.00 THEN ___2___\n    ELSE ___3___\n  ___4___ AS price_tier\nFROM products_catalog;",
      blanks: [
        { id: 1, label: "Budget Tier", answer: "'Budget'", options: ["'Budget'", "Budget", "1", "'Low'"] },
        { id: 2, label: "Mid Tier", answer: "'Mid-Tier'", options: ["'Mid-Tier'", "Mid-Tier", "2", "'Medium'"] },
        { id: 3, label: "Fallback Tier", answer: "'Premium'", options: ["'Premium'", "Premium", "3", "'High'"] },
        { id: 4, label: "Closing Keyword", answer: "END", options: ["END", "STOP", "FINISH", "CLOSE"] }
      ],
      expectedSql: "SELECT asin, title, price, CASE WHEN price < 25.00 THEN 'Budget' WHEN price <= 100.00 THEN 'Mid-Tier' ELSE 'Premium' END AS price_tier FROM products_catalog;",
      managerReview: "Flawless! Because you wrote `WHEN price < 25.00` first, the second condition `WHEN price <= 100.00` cleanly captures everything between $25.00 and $100.00 without needing complex `BETWEEN` logic."
    }
  },
  {
    day: 7,
    week: 1,
    phase: "Week 1: Onboarding & Ad-Hoc Discovery",
    title: "Day 07: Week 1 Retrospective & Distinct Category Audit",
    sender: "Sarah Jenkins",
    senderRole: "L6 Senior BIE Lead",
    senderAvatar: "👩‍💼",
    priority: "P2 - Milestone",
    department: "Business Intelligence Team",
    chimeMessage: "You survived Week 1! 👏 For our Friday 1-on-1, Sarah wants a clean, deduplicated list of all distinct product categories and departments currently active in our warehouse catalog, sorted alphabetically.",
    contextReport: {
      businessWhy: "Over time, merchant uploads introduce subtle category variations like 'Home Goods', 'Home_Goods', and 'HomeGoods'. Running a deduplicated category audit is the first step in building data cleaning pipelines and mapping taxonomy trees.",
      learningFocus: [
        "Eliminating duplicate tuples with `SELECT DISTINCT`",
        "Sorting text columns alphabetically: `ORDER BY department ASC, category ASC`",
        "Understanding how `DISTINCT` triggers a hash-aggregate or sort operator under the hood",
        "Checking unique taxonomy cardinality across millions of rows"
      ],
      sampleSchema: "products_catalog (\n  asin VARCHAR(10),\n  department VARCHAR(50),\n  category VARCHAR(50)\n)",
      realWorldTrap: "`DISTINCT` evaluates across ALL projected columns in the `SELECT` list, not just the first column! If you write `SELECT DISTINCT department, asin`, you will get almost every row because `asin` is unique.",
      interviewRelevance: "Interviewers frequently ask: 'What is the performance difference between `SELECT DISTINCT` and `GROUP BY`, and how do execution engines execute them?'"
    },
    schema: "products_catalog",
    challenge: {
      instruction: "Retrieve a deduplicated list of active departments and categories, sorted alphabetically by department and then category.",
      template: "SELECT ___1___ department, category\nFROM products_catalog\nWHERE department IS NOT NULL\nORDER BY department ___2___, category ___3___;",
      blanks: [
        { id: 1, label: "Deduplication Keyword", answer: "DISTINCT", options: ["DISTINCT", "UNIQUE", "DIFFERENT", "ALL"] },
        { id: 2, label: "Department Sort", answer: "ASC", options: ["ASC", "DESC", "ALPHA", "NONE"] },
        { id: 3, label: "Category Sort", answer: "ASC", options: ["ASC", "DESC", "ALPHA", "NONE"] }
      ],
      expectedSql: "SELECT DISTINCT department, category FROM products_catalog WHERE department IS NOT NULL ORDER BY department ASC, category ASC;",
      managerReview: "Congratulations on completing Week 1! Sarah has officially marked your L4 Onboarding Milestones as complete. Next week: Relational JOINs across Amazon's massive fulfillment network!"
    }
  },

  // ---------------------------------------------------------------------------
  // WEEK 2: WAREHOUSE LOGISTICS & RELATIONAL DATA (DAYS 08 - 14)
  // ---------------------------------------------------------------------------
  {
    day: 8,
    week: 2,
    phase: "Week 2: Fulfillment Logistics & JOINs",
    title: "Day 08: Linking Orders to Fulfillment Centers",
    sender: "Carlos Santos",
    senderRole: "L5 Fulfillment Center Operations Manager",
    senderAvatar: "👷‍♂️",
    priority: "P1 - Operations",
    department: "Amazon Logistics (AMZL)",
    chimeMessage: "Welcome to Week 2! Let's dive into real operations. We have an `orders` table and a `fulfillment_centers` table. Can you join them so we can see which warehouse city and state is fulfilling each order placed today?",
    contextReport: {
      businessWhy: "Amazon operates over 175 fulfillment centers across North America. When an order is placed, the routing algorithm assigns it to an FC based on inventory proximity. Analysts track order routing to detect when orders are routed cross-country due to local stockouts.",
      learningFocus: [
        "Primary Key (PK) to Foreign Key (FK) relationship: `orders.fc_id = fulfillment_centers.fc_id`",
        "Using table aliases (`o` for orders, `fc` for fulfillment_centers) for concise, readable SQL",
        "Selecting columns from both sides of the join",
        "INNER JOIN mechanics: Returning only rows where a match exists on both tables"
      ],
      sampleSchema: "orders (\n  order_id INT PRIMARY KEY,\n  order_date DATE,\n  order_total DECIMAL(10,2),\n  fc_id VARCHAR(10)\n)\n\nfulfillment_centers (\n  fc_id VARCHAR(10) PRIMARY KEY,\n  fc_name VARCHAR(50),\n  city VARCHAR(50),\n  state VARCHAR(2)\n)",
      realWorldTrap: "If `fc_id` has different data types (e.g. `VARCHAR` in one table and `INT` in another), Redshift may fail to execute or perform an expensive runtime cast that disables index probes.",
      interviewRelevance: "Standard relational join syntax is tested in 100% of data analyst interviews. Aliasing and clean column qualification are mandatory table manners."
    },
    schema: "orders JOIN fulfillment_centers",
    challenge: {
      instruction: "Join `orders` with `fulfillment_centers` on `fc_id` to display the order ID, order total, warehouse name, and city.",
      template: "SELECT o.order_id, o.order_total, fc.fc_name, fc.city\nFROM orders o\n___1___ JOIN fulfillment_centers fc\n  ___2___ o.fc_id = fc.___3___;",
      blanks: [
        { id: 1, label: "Join Type", answer: "INNER", options: ["INNER", "OUTER", "CROSS", "NATURAL"] },
        { id: 2, label: "Join Keyword", answer: "ON", options: ["ON", "WHERE", "USING", "IN"] },
        { id: 3, label: "Key Column", answer: "fc_id", options: ["fc_id", "order_id", "city", "state"] }
      ],
      expectedSql: "SELECT o.order_id, o.order_total, fc.fc_name, fc.city FROM orders o INNER JOIN fulfillment_centers fc ON o.fc_id = fc.fc_id;",
      managerReview: "Great execution! You've linked customer demand to physical real-world infrastructure. You can already see that 40% of East Coast orders are routing through PHL7 (Allentown, PA)."
    }
  },
  {
    day: 9,
    week: 2,
    phase: "Week 2: Fulfillment Logistics & JOINs",
    title: "Day 09: The Missing Tracking Numbers (LEFT JOIN Audit)",
    sender: "Priya Nair",
    senderRole: "L7 Director of Operations",
    senderAvatar: "👩‍💼",
    priority: "P0 - High Urgency",
    department: "Last-Mile Delivery & AMZL",
    chimeMessage: "Red alert: Customer Service is getting flooded with calls because packages marked 'SHIPPED' have no carrier tracking number attached! Pull all orders in 'SHIPPED' status that have NO matching record in the shipments table.",
    contextReport: {
      businessWhy: "When an order is dispatched, the warehouse conveyor applies a shipping label and fires a webhook to create a row in the `shipments` table. If the API drops the message, the customer sees 'Shipped' but cannot track their package. This is a classic 'Anti-Join' problem.",
      learningFocus: [
        "LEFT JOIN mechanics: Preserving ALL rows from the left table (`orders`) even when no right match exists",
        "The Anti-Join pattern: `LEFT JOIN ... WHERE right_table.key IS NULL`",
        "Why an INNER JOIN would fail here (it would completely hide the broken rows!)",
        "Identifying silent integration dropped packets"
      ],
      sampleSchema: "orders (\n  order_id INT PRIMARY KEY,\n  order_status VARCHAR(20),\n  customer_id INT,\n  shipped_at TIMESTAMP\n)\n\nshipments (\n  shipment_id VARCHAR(36) PRIMARY KEY,\n  order_id INT,\n  tracking_number VARCHAR(50),\n  carrier VARCHAR(20)\n)",
      realWorldTrap: "Putting the filter in the `ON` clause instead of `WHERE` when doing an anti-join! If you write `ON o.order_id = s.order_id AND s.tracking_number IS NULL`, the LEFT JOIN still preserves the order row! The `IS NULL` check MUST be in the `WHERE` clause.",
      interviewRelevance: "'How do you find records in Table A that do not exist in Table B?' is the single most famous SQL interview pattern across FAANG companies."
    },
    schema: "orders LEFT JOIN shipments",
    challenge: {
      instruction: "Use a LEFT JOIN to find all orders with status 'SHIPPED' that have no matching record in the `shipments` table.",
      template: "SELECT o.order_id, o.customer_id, o.shipped_at\nFROM orders o\n___1___ JOIN shipments s\n  ON o.order_id = s.order_id\nWHERE o.order_status = 'SHIPPED'\n  AND s.shipment_id ___2___;",
      blanks: [
        { id: 1, label: "Preservation Join", answer: "LEFT", options: ["LEFT", "INNER", "RIGHT", "CROSS"] },
        { id: 2, label: "Absence Condition", answer: "IS NULL", options: ["IS NULL", "= NULL", "IS NOT NULL", "!= 0"] }
      ],
      expectedSql: "SELECT o.order_id, o.customer_id, o.shipped_at FROM orders o LEFT JOIN shipments s ON o.order_id = s.order_id WHERE o.order_status = 'SHIPPED' AND s.shipment_id IS NULL;",
      managerReview: "Brilliant diagnosis! You found 342 orders stuck without tracking IDs. It turned out a barcode scanner firmware glitch at warehouse DFW7 had disconnected from the carrier API. Engineering rebooted the bridge!"
    }
  },
  {
    day: 10,
    week: 2,
    phase: "Week 2: Fulfillment Logistics & JOINs",
    title: "Day 10: Warehouse Dock-to-Ship Latency Bottleneck",
    sender: "Carlos Santos",
    senderRole: "L5 Fulfillment Center Operations Manager",
    senderAvatar: "👷‍♂️",
    priority: "P1 - Operations",
    department: "Dallas Fulfillment Center (DFW7)",
    chimeMessage: "Hey! We're auditing packing lines at warehouse DFW7. Calculate the turnaround time in hours between when an order is received (`order_date`) and when the package actually departs (`dispatched_at`). Flag shipments taking more than 24 hours.",
    contextReport: {
      businessWhy: "Amazon Prime promises 1-day or 2-day delivery. To meet that customer promise, internal warehouse SLA requires that packages be picked, packed, and loaded onto trucks within 12 to 18 hours. Delays over 24 hours trigger carrier miss penalties and customer refunds.",
      learningFocus: [
        "Date and timestamp interval arithmetic: `DATEDIFF(hour, start_time, end_time)`",
        "Joining transaction headers (`orders`) with fulfillment event logs (`shipments`)",
        "Filtering by specific facility codes (`fc_code = 'DFW7'`)",
        "Identifying warehouse shift bottlenecks"
      ],
      sampleSchema: "orders o (\n  order_id INT,\n  fc_code VARCHAR(10),\n  order_placed_at TIMESTAMP\n)\n\nshipments s (\n  shipment_id VARCHAR(36),\n  order_id INT,\n  dispatched_at TIMESTAMP\n)",
      realWorldTrap: "Watch the argument order in `DATEDIFF`. In Redshift/PostgreSQL, `DATEDIFF('hour', start, end)` produces a positive number. If you reverse start and end, you get negative numbers that fail `>= 24` checks.",
      interviewRelevance: "Operations analytics interviews constantly test elapsed time metrics: cycle time, latency, and SLA compliance."
    },
    schema: "orders JOIN shipments",
    challenge: {
      instruction: "Join `orders` and `shipments` to calculate turnaround hours and filter for DFW7 shipments taking 24 hours or longer.",
      template: "SELECT o.order_id, o.fc_code,\n  DATEDIFF('hour', o.order_placed_at, s.dispatched_at) AS turnaround_hours\nFROM orders o\nINNER JOIN shipments s ON o.order_id = s.order_id\nWHERE o.fc_code = ___1___\n  AND DATEDIFF('hour', o.order_placed_at, s.dispatched_at) >= ___2___;",
      blanks: [
        { id: 1, label: "Warehouse Code", answer: "'DFW7'", options: ["'DFW7'", "DFW7", "'dfw7'", "NULL"] },
        { id: 2, label: "SLA Threshold", answer: "24", options: ["24", "12", "48", "3600"] }
      ],
      expectedSql: "SELECT o.order_id, o.fc_code, DATEDIFF('hour', o.order_placed_at, s.dispatched_at) AS turnaround_hours FROM orders o INNER JOIN shipments s ON o.order_id = s.order_id WHERE o.fc_code = 'DFW7' AND DATEDIFF('hour', o.order_placed_at, s.dispatched_at) >= 24;",
      managerReview: "Incisive analysis! Carlos identified that the conveyor sorting arm on Line 3 had been jamming, causing packages to accumulate in buffering bins."
    }
  },
  {
    day: 11,
    week: 2,
    phase: "Week 2: Fulfillment Logistics & JOINs",
    title: "Day 11: Multi-Item Order Line Breakdown (3-Table JOIN)",
    sender: "Sarah Jenkins",
    senderRole: "L6 Senior BIE Lead",
    senderAvatar: "👩‍💼",
    priority: "P2 - Analytics",
    department: "Finance & Order Auditing",
    chimeMessage: "Time to master multi-table relational navigation. Connect `orders`, `order_items`, and `products_catalog` to show every item purchased in order #10842, including the product title, unit price, quantity, and total line cost.",
    contextReport: {
      businessWhy: "In relational database design, orders follow a One-to-Many hierarchy: One Order contains Many Order Items, and each Order Item points to One Product. To verify that customer receipts match ledger entries, analysts write 3-table joins.",
      learningFocus: [
        "Chaining multiple JOIN clauses sequentially in SQL",
        "Navigating bridge tables (`orders` &rarr; `order_items` &rarr; `products_catalog`)",
        "Computed projection: `quantity * unit_price AS line_total`",
        "Understanding table cardinality and avoiding row multiplier explosions"
      ],
      sampleSchema: "orders (\n  order_id INT PRIMARY KEY,\n  customer_id INT\n)\n\norder_items (\n  item_id INT PRIMARY KEY,\n  order_id INT,\n  asin VARCHAR(10),\n  quantity INT\n)\n\nproducts_catalog (\n  asin VARCHAR(10) PRIMARY KEY,\n  title VARCHAR(200),\n  unit_price DECIMAL(10,2)\n)",
      realWorldTrap: "If `order_items` contains multiple rows for the same ASIN in an order, make sure you don't accidentally double-count prices. Always multiply `quantity * unit_price` at the line level.",
      interviewRelevance: "This is the classic data modeling interview test: 'Walk me through how an e-commerce order is modeled in a relational schema.'"
    },
    schema: "orders JOIN order_items JOIN products",
    challenge: {
      instruction: "Join `orders`, `order_items`, and `products_catalog` for order ID 10842, calculating `quantity * p.unit_price` as `line_total`.",
      template: "SELECT o.order_id, p.title, oi.quantity, p.unit_price,\n  (oi.quantity * p.unit_price) AS line_total\nFROM orders o\nINNER JOIN order_items oi ON o.order_id = oi.___1___\nINNER JOIN products_catalog p ON oi.___2___ = p.asin\nWHERE o.order_id = ___3___;",
      blanks: [
        { id: 1, label: "Order Items FK", answer: "order_id", options: ["order_id", "item_id", "customer_id", "asin"] },
        { id: 2, label: "Product FK", answer: "asin", options: ["asin", "product_id", "sku", "item_id"] },
        { id: 3, label: "Target Order", answer: "10842", options: ["10842", "'10842'", "1", "NULL"] }
      ],
      expectedSql: "SELECT o.order_id, p.title, oi.quantity, p.unit_price, (oi.quantity * p.unit_price) AS line_total FROM orders o INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN products_catalog p ON oi.asin = p.asin WHERE o.order_id = 10842;",
      managerReview: "Clean join cascade! This exact structure is the foundation of Amazon's invoice generation and financial settlement pipeline."
    }
  },
  {
    day: 12,
    week: 2,
    phase: "Week 2: Fulfillment Logistics & JOINs",
    title: "Day 12: Carrier SLA Delivery Penalty Audit",
    sender: "David Chen",
    senderRole: "L5 Principal Product Manager",
    senderAvatar: "👨‍💻",
    priority: "P1 - High Urgency",
    department: "Carrier Contract Negotiations",
    chimeMessage: "We have quarterly contract reviews with shipping carriers tomorrow. I need a query showing all Prime deliveries where the carrier delivered AFTER the promised delivery date. Filter for carrier UPS.",
    contextReport: {
      businessWhy: "Amazon pays carriers billions annually. Under carrier service-level agreements (SLAs), if a carrier fails to deliver a Prime package by the guaranteed date, Amazon is entitled to a contract refund or shipping credit. Analysts generate these audit breaks to claw back millions in carrier penalty fees.",
      learningFocus: [
        "Comparing two timestamp/date columns directly in `WHERE`: `actual_delivery_date > promised_sla_date`",
        "Multi-table filtering across `carrier = 'UPS'` and `is_prime = TRUE`",
        "Understanding contract penalty calculations",
        "Formatting evidence tables for VP negotiations"
      ],
      sampleSchema: "shipments s (\n  tracking_id VARCHAR(30) PRIMARY KEY,\n  carrier_name VARCHAR(20),\n  promised_sla_date DATE,\n  actual_delivery_date DATE,\n  shipping_fee DECIMAL(6,2)\n)\n\norders o (\n  order_id INT,\n  is_prime BOOLEAN\n)",
      realWorldTrap: "Watch out for `NULL` in `actual_delivery_date`. Packages that are still in transit will have `actual_delivery_date IS NULL`. Comparing a date with `NULL` returns `UNKNOWN`, so in-transit packages are safely excluded.",
      interviewRelevance: "Amazon's leadership principle 'Frugality': Analysts who recover lost capital through automated contract auditing are promoted rapidly."
    },
    schema: "shipments JOIN orders",
    challenge: {
      instruction: "Join `shipments` with `orders` to find all UPS deliveries for Prime customers where the actual delivery date was later than the promised SLA date.",
      template: "SELECT s.tracking_id, s.carrier_name, s.promised_sla_date, s.actual_delivery_date, s.shipping_fee\nFROM shipments s\nINNER JOIN orders o ON s.order_id = o.order_id\nWHERE s.carrier_name = ___1___\n  AND o.is_prime = ___2___\n  AND s.actual_delivery_date > s.___3___;",
      blanks: [
        { id: 1, label: "Carrier Filter", answer: "'UPS'", options: ["'UPS'", "'FedEx'", "'AMZL'", "NULL"] },
        { id: 2, label: "Prime Filter", answer: "TRUE", options: ["TRUE", "FALSE", "'YES'", "1"] },
        { id: 3, label: "SLA Date Column", answer: "promised_sla_date", options: ["promised_sla_date", "ship_date", "created_at", "actual_delivery_date"] }
      ],
      expectedSql: "SELECT s.tracking_id, s.carrier_name, s.promised_sla_date, s.actual_delivery_date, s.shipping_fee FROM shipments s INNER JOIN orders o ON s.order_id = o.order_id WHERE s.carrier_name = 'UPS' AND o.is_prime = TRUE AND s.actual_delivery_date > s.promised_sla_date;",
      managerReview: "David took this exact query into the carrier executive meeting. UPS conceded 84,000 late deliveries and credited Amazon $412,000 in fee rebates!"
    }
  },
  {
    day: 13,
    week: 2,
    phase: "Week 2: Fulfillment Logistics & JOINs",
    title: "Day 13: Emergency Regional Warehouse Re-Route (SELF JOIN)",
    sender: "Carlos Santos",
    senderRole: "L5 Fulfillment Center Operations Manager",
    senderAvatar: "👷‍♂️",
    priority: "P1 - Operations",
    department: "Supply Chain & Optimization Tech (SCOT)",
    chimeMessage: "Severe snowstorm incoming for the Northeast! Warehouse BOS1 (Boston) might lose power. Write a query pairing every fulfillment center in the 'NORTHEAST' region with every OTHER fulfillment center in the same region so logistics can map backup re-routes.",
    contextReport: {
      businessWhy: "Supply Chain Optimization Technologies (SCOT) must dynamically re-route orders when natural disasters shut down facilities. Pairing rows within the same table to compare facilities in the same region requires a SELF JOIN.",
      learningFocus: [
        "Self Join fundamentals: Aliasing the same table twice (`fc1` and `fc2`)",
        "Joining on shared category: `fc1.region = fc2.region`",
        "Preventing self-matching: `fc1.fc_id != fc2.fc_id` (or `fc1.fc_id < fc2.fc_id` to eliminate reverse duplicates)",
        "Building combinatorial routing topologies"
      ],
      sampleSchema: "fulfillment_centers (\n  fc_id VARCHAR(10) PRIMARY KEY,\n  fc_name VARCHAR(50),\n  region VARCHAR(20),\n  daily_capacity_units INT\n)",
      realWorldTrap: "If you forget `fc1.fc_id != fc2.fc_id`, every warehouse pairs with itself (BOS1 &rarr; BOS1), creating useless circular routing loops.",
      interviewRelevance: "Self-joins are a favorite technical test topic. Candidates who know how to use `<` to avoid duplicate bidirectional pairs (A-B and B-A) stand out immediately."
    },
    schema: "fulfillment_centers (SELF JOIN)",
    challenge: {
      instruction: "Self-join `fulfillment_centers` to list all unique backup pairs in the 'NORTHEAST' region where `fc1.fc_id < fc2.fc_id`.",
      template: "SELECT fc1.fc_id AS primary_fc, fc2.fc_id AS backup_fc, fc1.region\nFROM fulfillment_centers fc1\nINNER JOIN fulfillment_centers fc2\n  ON fc1.region = fc2.___1___\n  AND fc1.fc_id ___2___ fc2.fc_id\nWHERE fc1.region = ___3___;",
      blanks: [
        { id: 1, label: "Shared Attribute", answer: "region", options: ["region", "fc_id", "city", "state"] },
        { id: 2, label: "Pairing Operator", answer: "<", options: ["<", "!=", "=", ">="] },
        { id: 3, label: "Target Region", answer: "'NORTHEAST'", options: ["'NORTHEAST'", "'WEST'", "'MIDWEST'", "'SOUTH'"] }
      ],
      expectedSql: "SELECT fc1.fc_id AS primary_fc, fc2.fc_id AS backup_fc, fc1.region FROM fulfillment_centers fc1 INNER JOIN fulfillment_centers fc2 ON fc1.region = fc2.region AND fc1.fc_id < fc2.fc_id WHERE fc1.region = 'NORTHEAST';",
      managerReview: "Masterful use of `fc1.fc_id < fc2.fc_id`! You avoided both self-pairs and reverse duplicates in a single predicate. The automated contingency dispatch system is now primed."
    }
  },
  {
    day: 14,
    week: 2,
    phase: "Week 2: Fulfillment Logistics & JOINs",
    title: "Day 14: Defective Returns & Merchant Restock Hold",
    sender: "Sarah Jenkins",
    senderRole: "L6 Senior BIE Lead",
    senderAvatar: "👩‍💼",
    priority: "P2 - Quality Assurance",
    department: "Reverse Logistics & Customer Returns",
    chimeMessage: "End of Week 2! Let's inspect customer returns. Pull all orders where items were returned with the reason 'Defective', and join with `merchants` to identify the seller IDs and merchant business names responsible.",
    contextReport: {
      businessWhy: "Amazon's A-to-z Guarantee protects buyers from defective goods. When an item has high return rates due to defects, Amazon places the merchant's inventory on 'Restock Hold' until the seller passes quality inspections. Joining returns to orders to merchants automates this enforcement.",
      learningFocus: [
        "Multi-table join across reverse logistics (`returns` &rarr; `orders` &rarr; `merchants`)",
        "Filtering on categorical reason codes: `r.return_reason = 'Defective'`",
        "Projecting merchant accountability data",
        "Preparing datasets for automated merchant quality suspensions"
      ],
      sampleSchema: "returns (\n  return_id INT PRIMARY KEY,\n  order_id INT,\n  return_reason VARCHAR(50),\n  refund_amount DECIMAL(10,2)\n)\n\norders (\n  order_id INT PRIMARY KEY,\n  merchant_id VARCHAR(20)\n)\n\nmerchants (\n  merchant_id VARCHAR(20) PRIMARY KEY,\n  business_name VARCHAR(100),\n  defect_rate_pct DECIMAL(4,2)\n)",
      realWorldTrap: "Some orders have multiple returned items. Without proper grouping or primary keys, joining across multiple item levels can duplicate merchant rows. Always check unique return IDs.",
      interviewRelevance: "Reverse logistics is a massive cost center for Amazon. Understanding how return rates impact bottom-line margins shows strong business acumen."
    },
    schema: "returns JOIN orders JOIN merchants",
    challenge: {
      instruction: "Join `returns`, `orders`, and `merchants` to find defective returns and list the return ID, order ID, refund amount, and merchant business name.",
      template: "SELECT r.return_id, o.order_id, r.refund_amount, m.business_name\nFROM returns r\nINNER JOIN orders o ON r.order_id = o.order_id\nINNER JOIN merchants m ON o.merchant_id = m.___1___\nWHERE r.return_reason = ___2___;",
      blanks: [
        { id: 1, label: "Merchant FK", answer: "merchant_id", options: ["merchant_id", "order_id", "return_id", "customer_id"] },
        { id: 2, label: "Reason Filter", answer: "'Defective'", options: ["'Defective'", "'Wrong Size'", "'Late Delivery'", "'Unwanted'"] }
      ],
      expectedSql: "SELECT r.return_id, o.order_id, r.refund_amount, m.business_name FROM returns r INNER JOIN orders o ON r.order_id = o.order_id INNER JOIN merchants m ON o.merchant_id = m.merchant_id WHERE r.return_reason = 'Defective';",
      managerReview: "Week 2 complete! You have officially mastered Amazon's core relational graph. Sarah has logged your progress with your Director. Next week: The Weekly Business Review (WBR) and executive aggregations!"
    }
  },

  // ---------------------------------------------------------------------------
  // WEEK 3: EXECUTIVE AGGREGATIONS & THE WBR (DAYS 15 - 21)
  // ---------------------------------------------------------------------------
  {
    day: 15,
    week: 3,
    phase: "Week 3: Aggregations & The WBR",
    title: "Day 15: Total Daily Gross Merchandise Value (GMV)",
    sender: "Priya Nair",
    senderRole: "L7 Director of Operations",
    senderAvatar: "👩‍💼",
    priority: "P0 - WBR Critical",
    department: "Executive Finance Desk",
    chimeMessage: "Welcome to Week 3! Today you build your first metric for the Friday Weekly Business Review (WBR). I need total Gross Merchandise Value (GMV), total orders placed, and Average Order Value (AOV) grouped by country for yesterday.",
    contextReport: {
      businessWhy: "The Weekly Business Review (WBR) is Amazon's central operating mechanism. Every Friday morning, directors and VPs stare at metric tables. GMV is the pulse of the company; AOV tells us if shoppers are adding more items to their baskets.",
      learningFocus: [
        "Aggregate functions: `SUM(order_total)`, `COUNT(order_id)`, and `AVG(order_total)`",
        "Rounding monetary figures: `ROUND(AVG(order_total), 2)`",
        "The mandatory rule of `GROUP BY`: Every non-aggregated column in `SELECT` must be in `GROUP BY`",
        "Sorting aggregated KPIs: `ORDER BY total_gmv DESC`"
      ],
      sampleSchema: "daily_orders (\n  order_id INT,\n  country_code VARCHAR(2),\n  order_total DECIMAL(10,2),\n  order_date DATE\n)",
      realWorldTrap: "Writing `SELECT country_code, city, SUM(order_total) FROM orders GROUP BY country_code`. If `city` is omitted from `GROUP BY`, modern engines like Redshift, Postgres, and MySQL in strict mode will immediately reject the query!",
      interviewRelevance: "Every data analyst interview includes at least one `GROUP BY` question. Testing whether you understand how row sets collapse into summary groups is essential."
    },
    schema: "daily_orders (Aggregations)",
    challenge: {
      instruction: "Calculate total GMV, order count, and rounded Average Order Value (AOV) grouped by `country_code`, sorted by total GMV descending.",
      template: "SELECT country_code,\n  COUNT(order_id) AS total_orders,\n  SUM(order_total) AS total_gmv,\n  ROUND(___1___(order_total), 2) AS average_order_value\nFROM daily_orders\nGROUP BY ___2___\nORDER BY total_gmv ___3___;",
      blanks: [
        { id: 1, label: "Average Function", answer: "AVG", options: ["AVG", "MEAN", "SUM", "MEDIAN"] },
        { id: 2, label: "Grouping Column", answer: "country_code", options: ["country_code", "order_id", "order_total", "total_gmv"] },
        { id: 3, label: "Sort Direction", answer: "DESC", options: ["DESC", "ASC", "TOP", "MAX"] }
      ],
      expectedSql: "SELECT country_code, COUNT(order_id) AS total_orders, SUM(order_total) AS total_gmv, ROUND(AVG(order_total), 2) AS average_order_value FROM daily_orders GROUP BY country_code ORDER BY total_gmv DESC;",
      managerReview: "Outstanding! This exact query outputs the top line on the international WBR deck. The US leads with $42M daily GMV, followed by Germany (DE) with €14M."
    }
  },
  {
    day: 16,
    week: 3,
    phase: "Week 3: Aggregations & The WBR",
    title: "Day 16: The Prime vs. Non-Prime Spending Divide",
    sender: "David Chen",
    senderRole: "L5 Principal Product Manager",
    senderAvatar: "👨‍💻",
    priority: "P1 - Analytics",
    department: "Prime Monetization & Retention",
    chimeMessage: "We're presenting the Prime program ROI to the VP. Run an aggregation comparing Prime subscribers vs non-Prime shoppers: Total spend, distinct customer count, and average spend per customer.",
    contextReport: {
      businessWhy: "Prime costs billions in free shipping and streaming video content. To justify that investment to Wall Street, Amazon tracks customer lifetime value (LTV). Proving that Prime members spend 3x more per year validates the entire subscription ecosystem.",
      learningFocus: [
        "Counting distinct entities: `COUNT(DISTINCT customer_id)`",
        "Grouping by a boolean flag: `GROUP BY is_prime`",
        "Calculating derived customer metrics: `SUM(order_total) / COUNT(DISTINCT customer_id)`",
        "Presenting stark comparative cohort metrics"
      ],
      sampleSchema: "orders (\n  order_id INT,\n  customer_id INT,\n  is_prime BOOLEAN,\n  order_total DECIMAL(10,2)\n)",
      realWorldTrap: "Using `COUNT(customer_id)` instead of `COUNT(DISTINCT customer_id)`. If 1 customer placed 10 orders, `COUNT` counts 10, misleadingly inflating the number of unique customers.",
      interviewRelevance: "`COUNT(DISTINCT)` is a benchmark interview question. Interviewers will often ask you to explain why `COUNT(DISTINCT)` requires more memory in distributed engines like Redshift than simple `COUNT()`."
    },
    schema: "orders (Cohort Aggregations)",
    challenge: {
      instruction: "Group by `is_prime` to calculate total revenue, unique customers, and average spend per unique customer.",
      template: "SELECT is_prime,\n  COUNT(DISTINCT customer_id) AS unique_customers,\n  SUM(order_total) AS total_revenue,\n  ROUND(SUM(order_total) / COUNT(___1___ customer_id), 2) AS avg_spend_per_customer\nFROM orders\n___2___ BY is_prime;",
      blanks: [
        { id: 1, label: "Deduplication Modifier", answer: "DISTINCT", options: ["DISTINCT", "UNIQUE", "ALL", "EXACT"] },
        { id: 2, label: "Grouping Clause", answer: "GROUP", options: ["GROUP", "ORDER", "PARTITION", "SORT"] }
      ],
      expectedSql: "SELECT is_prime, COUNT(DISTINCT customer_id) AS unique_customers, SUM(order_total) AS total_revenue, ROUND(SUM(order_total) / COUNT(DISTINCT customer_id), 2) AS avg_spend_per_customer FROM orders GROUP BY is_prime;",
      managerReview: "Sensational metric output! Prime customers averaged $1,420/year vs $380 for non-Prime shoppers. That's the exact data slide the VP needed."
    }
  },
  {
    day: 17,
    week: 3,
    phase: "Week 3: Aggregations & The WBR",
    title: "Day 17: Filtering High-Volume 3P Sellers (HAVING Clause)",
    sender: "Sarah Jenkins",
    senderRole: "L6 Senior BIE Lead",
    senderAvatar: "👩‍💼",
    priority: "P1 - High Urgency",
    department: "Marketplace Merchant Services",
    chimeMessage: "Our Merchant Services team is inviting top third-party (3P) sellers to an exclusive logistics beta. Find all sellers who have generated over $100,000 in sales across at least 250 orders this quarter.",
    contextReport: {
      businessWhy: "Amazon Marketplace represents over 60% of all physical units sold on Amazon. High-volume sellers require dedicated account managers and specialized warehouse intake slots. Filtering sellers based on aggregate sales volume identifies top commercial partners.",
      learningFocus: [
        "The critical difference between `WHERE` and `HAVING`",
        "`WHERE` filters raw rows BEFORE grouping; `HAVING` filters aggregated values AFTER grouping",
        "Compound aggregate filtering: `HAVING SUM(sales) > 100000 AND COUNT(order_id) >= 250`",
        "Physical query execution order: `FROM` &rarr; `WHERE` &rarr; `GROUP BY` &rarr; `HAVING` &rarr; `SELECT` &rarr; `ORDER BY`"
      ],
      sampleSchema: "seller_sales (\n  order_id INT,\n  seller_id VARCHAR(20),\n  sale_amount DECIMAL(10,2),\n  quarter VARCHAR(5)\n)",
      realWorldTrap: "Trying to filter aggregates in `WHERE`: `WHERE SUM(sale_amount) > 100000`. SQL will throw an error immediately: 'Aggregate functions are not allowed in WHERE'. You MUST use `HAVING`.",
      interviewRelevance: "This is a mandatory question in 100% of SQL screenings: 'Explain the difference between WHERE and HAVING clause with an example.'"
    },
    schema: "seller_sales (HAVING Clause)",
    challenge: {
      instruction: "Group by `seller_id` to find sellers with total sales over $100,000 and at least 250 orders, using the `HAVING` clause.",
      template: "SELECT seller_id,\n  COUNT(order_id) AS total_orders,\n  SUM(sale_amount) AS total_sales\nFROM seller_sales\nWHERE quarter = '2026-Q3'\nGROUP BY seller_id\n___1___ SUM(sale_amount) > ___2___\n  AND COUNT(order_id) >= ___3___;",
      blanks: [
        { id: 1, label: "Aggregate Filter Keyword", answer: "HAVING", options: ["HAVING", "WHERE", "FILTER", "LIMIT"] },
        { id: 2, label: "Sales Threshold", answer: "100000", options: ["100000", "1000", "50000", "'100000'"] },
        { id: 3, label: "Order Threshold", answer: "250", options: ["250", "100", "500", "1000"] }
      ],
      expectedSql: "SELECT seller_id, COUNT(order_id) AS total_orders, SUM(sale_amount) AS total_sales FROM seller_sales WHERE quarter = '2026-Q3' GROUP BY seller_id HAVING SUM(sale_amount) > 100000 AND COUNT(order_id) >= 250;",
      managerReview: "Nailed the HAVING clause! You isolated 1,840 elite sellers. Notice how we used `WHERE` to pre-filter Q3 rows first, saving the engine from aggregating entire years of history."
    }
  },
  {
    day: 18,
    week: 3,
    phase: "Week 3: Aggregations & The WBR",
    title: "Day 18: Category Return Rate Percentage",
    sender: "Carlos Santos",
    senderRole: "L5 Fulfillment Center Operations Manager",
    senderAvatar: "👷‍♂️",
    priority: "P1 - Operations",
    department: "Quality Assurance & Returns",
    chimeMessage: "Returns are killing our warehouse capacity. Calculate the return rate percentage for each product category: Total returned units divided by total orders placed. Filter for categories with return rates over 7%.",
    contextReport: {
      businessWhy: "Returns cost Amazon money in shipping, inspection, repackaging, and markdown liquidation. Categories like Apparel often have 15–20% return rates due to sizing, whereas Books are under 2%. Identifying anomaly spikes flags bad product batches.",
      learningFocus: [
        "Ratio calculations between counts: `100.0 * COUNT(r.return_id) / COUNT(o.order_id)`",
        "Avoiding integer division by multiplying by floating point `100.0`",
        "Using `LEFT JOIN` so categories with zero returns are not excluded",
        "Filtering ratio thresholds in `HAVING`"
      ],
      sampleSchema: "orders o (\n  order_id INT,\n  category VARCHAR(50)\n)\n\nreturns r (\n  return_id INT,\n  order_id INT\n)",
      realWorldTrap: "Integer division trap! In many SQL engines, `COUNT(A) / COUNT(B)` performs integer math. If returns are 7 and orders are 100, `7 / 100` returns `0`! Multiplying by `100.0` forces float division.",
      interviewRelevance: "Testing whether candidates remember float multiplication in ratio calculations separates junior script-runners from experienced analysts."
    },
    schema: "orders LEFT JOIN returns",
    challenge: {
      instruction: "Calculate the return rate percentage by category and filter for categories where the return rate exceeds 7.0%.",
      template: "SELECT o.category,\n  COUNT(o.order_id) AS total_orders,\n  COUNT(r.return_id) AS total_returns,\n  ROUND(___1___ * COUNT(r.return_id) / COUNT(o.order_id), 2) AS return_rate_pct\nFROM orders o\nLEFT JOIN returns r ON o.order_id = r.order_id\nGROUP BY o.category\nHAVING (100.0 * COUNT(r.return_id) / COUNT(o.order_id)) > ___2___;",
      blanks: [
        { id: 1, label: "Float Multiplier", answer: "100.0", options: ["100.0", "100", "1.0", "1000"] },
        { id: 2, label: "Threshold", answer: "7.0", options: ["7.0", "0.07", "70", "10"] }
      ],
      expectedSql: "SELECT o.category, COUNT(o.order_id) AS total_orders, COUNT(r.return_id) AS total_returns, ROUND(100.0 * COUNT(r.return_id) / COUNT(o.order_id), 2) AS return_rate_pct FROM orders o LEFT JOIN returns r ON o.order_id = r.order_id GROUP BY o.category HAVING (100.0 * COUNT(r.return_id) / COUNT(o.order_id)) > 7.0;",
      managerReview: "Fantastic! Women's Footwear showed a 12.4% return rate. Operations is updating the product pages with interactive size recommendation charts to cut down on sizing returns."
    }
  },
  {
    day: 19,
    week: 3,
    phase: "Week 3: Aggregations & The WBR",
    title: "Day 19: Executive Cross-Tab Matrix (Data Pivoting)",
    sender: "Priya Nair",
    senderRole: "L7 Director of Operations",
    senderAvatar: "👩‍💼",
    priority: "P0 - Executive Review",
    department: "Executive Strategy Group",
    chimeMessage: "The Director wants a single executive table showing quarterly revenue for each department. Columns must be: `department`, `q1_revenue`, `q2_revenue`, and `q3_revenue`. No messy vertical rows — fold them into columns!",
    contextReport: {
      businessWhy: "Executives hate scrolling through hundreds of tall vertical rows. They want compact, spreadsheet-like cross-tab tables where departments are rows and quarters are columns. This is called 'pivoting' or conditional aggregation.",
      learningFocus: [
        "Conditional aggregation pattern: `SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END)`",
        "Ensuring the `ELSE 0` protects totals from `NULL` values",
        "Folding event-level quarterly records into fixed horizontal summary metrics",
        "Building executive-ready presentation matrices directly in SQL"
      ],
      sampleSchema: "quarterly_department_sales (\n  department VARCHAR(50),\n  quarter VARCHAR(2),\n  revenue DECIMAL(12,2)\n)",
      realWorldTrap: "Using `COUNT(CASE WHEN ... THEN 1 ELSE 0 END)`. In SQL, `COUNT(0)` counts 1! `COUNT()` counts ANY non-null value, including 0. When doing conditional counting, use `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` or `COUNT(CASE WHEN ... THEN 1 END)`.",
      interviewRelevance: "Pivoting data using `SUM(CASE WHEN...)` is the single most tested advanced aggregation pattern in FAANG business intelligence interviews."
    },
    schema: "quarterly_department_sales (Pivoting)",
    challenge: {
      instruction: "Pivot quarterly revenue into horizontal columns for Q1, Q2, and Q3 using conditional aggregation with `SUM(CASE WHEN...)`.",
      template: "SELECT department,\n  SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE ___1___ END) AS q1_revenue,\n  SUM(CASE WHEN quarter = 'Q2' THEN revenue ELSE 0 END) AS q2_revenue,\n  SUM(CASE WHEN quarter = ___2___ THEN revenue ELSE 0 END) AS q3_revenue\nFROM quarterly_department_sales\n___3___ BY department;",
      blanks: [
        { id: 1, label: "Null Shield Fallback", answer: "0", options: ["0", "NULL", "1", "revenue"] },
        { id: 2, label: "Q3 Condition", answer: "'Q3'", options: ["'Q3'", "Q3", "'q3'", "3"] },
        { id: 3, label: "Grouping Clause", answer: "GROUP", options: ["GROUP", "ORDER", "PARTITION", "SELECT"] }
      ],
      expectedSql: "SELECT department, SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END) AS q1_revenue, SUM(CASE WHEN quarter = 'Q2' THEN revenue ELSE 0 END) AS q2_revenue, SUM(CASE WHEN quarter = 'Q3' THEN revenue ELSE 0 END) AS q3_revenue FROM quarterly_department_sales GROUP BY department;",
      managerReview: "Clean executive matrix! Priya dropped this exact table into the VP's quarterly briefing deck. Clean, legible, and zero post-processing needed in Excel."
    }
  },
  {
    day: 20,
    week: 3,
    phase: "Week 3: Aggregations & The WBR",
    title: "Day 20: Month-over-Month Growth Velocity (LAG Window Function)",
    sender: "Sarah Jenkins",
    senderRole: "L6 Senior BIE Lead",
    senderAvatar: "👩‍💼",
    priority: "P1 - Advanced Analytics",
    department: "Amazon Fresh & Grocery Tech",
    chimeMessage: "Time for your first Window Function! The Grocery VP wants to track Month-over-Month (MoM) revenue growth for Amazon Fresh. Calculate current month revenue, previous month revenue using `LAG()`, and the difference.",
    contextReport: {
      businessWhy: "Static monthly revenue figures don't tell leadership whether business is accelerating or stalling. Comparing month $t$ to month $t-1$ highlights seasonal trends and marketing campaign efficacy without collapsing rows.",
      learningFocus: [
        "Window Function syntax: `FUNCTION() OVER (ORDER BY ...)`",
        "The `LAG(column, offset)` function: Peeking into the preceding row in an ordered partition",
        "Difference calculations: `current_revenue - LAG(current_revenue, 1) OVER (ORDER BY month)`",
        "Understanding that Window Functions execute AFTER the `WHERE` and `GROUP BY` phases"
      ],
      sampleSchema: "monthly_revenue (\n  sales_month DATE,\n  total_revenue DECIMAL(12,2)\n)",
      realWorldTrap: "You cannot put a Window Function in a `WHERE` clause! `WHERE LAG(revenue) > 0` throws an error because the `WHERE` filter executes before window calculations. To filter window results, wrap in a CTE or subquery.",
      interviewRelevance: "`LAG()` and `LEAD()` are the most requested analytical functions in Amazon BIE and Data Engineering interview loops."
    },
    schema: "monthly_revenue (Window Functions)",
    challenge: {
      instruction: "Use `LAG()` to pull the prior month's revenue and compute `revenue_diff` ordered chronologically by `sales_month`.",
      template: "SELECT sales_month, total_revenue,\n  LAG(total_revenue, 1) ___1___ (ORDER BY sales_month) AS prior_month_revenue,\n  (total_revenue - LAG(total_revenue, 1) OVER (___2___ BY sales_month)) AS revenue_diff\nFROM monthly_revenue\nORDER BY sales_month ___3___;",
      blanks: [
        { id: 1, label: "Window Clause", answer: "OVER", options: ["OVER", "PARTITION", "WINDOW", "ACROSS"] },
        { id: 2, label: "Ordering Keyword", answer: "ORDER", options: ["ORDER", "GROUP", "SORT", "BY"] },
        { id: 3, label: "Sort Direction", answer: "ASC", options: ["ASC", "DESC", "CHRONO", "NONE"] }
      ],
      expectedSql: "SELECT sales_month, total_revenue, LAG(total_revenue, 1) OVER (ORDER BY sales_month) AS prior_month_revenue, (total_revenue - LAG(total_revenue, 1) OVER (ORDER BY sales_month)) AS revenue_diff FROM monthly_revenue ORDER BY sales_month ASC;",
      managerReview: "Brilliant! You've officially entered the realm of Window Functions. Amazon Fresh showed a +$3.2M acceleration in September compared to August."
    }
  },
  {
    day: 21,
    week: 3,
    phase: "Week 3: Aggregations & The WBR",
    title: "Day 21: Top 3 Best-Selling ASINs per Category (DENSE_RANK)",
    sender: "David Chen",
    senderRole: "L5 Principal Product Manager",
    senderAvatar: "👨‍💻",
    priority: "P0 - WBR Critical",
    department: "Category Merchandising",
    chimeMessage: "Final task of Week 3! For the WBR category leaderboard, we need the Top 3 best-selling ASINs in EVERY category. Use `DENSE_RANK()` partitioned by category and ordered by total sales descending.",
    contextReport: {
      businessWhy: "Merchandising managers need to monitor their category top sellers to ensure sufficient warehouse stock. If a Top-3 product goes out of stock, category revenue plummets by 30%. Building partitioned leaderboards is a daily task.",
      learningFocus: [
        "Partitioning window functions: `DENSE_RANK() OVER (PARTITION BY category ORDER BY sales DESC)`",
        "Understanding difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` (tie-breaking behavior)",
        "Wrapping a window function inside a Common Table Expression (CTE) or subquery to filter `WHERE rank <= 3`",
        "Delivering multi-category leaderboard ranks"
      ],
      sampleSchema: "category_product_sales (\n  category VARCHAR(50),\n  asin VARCHAR(10),\n  product_title VARCHAR(200),\n  total_units_sold INT\n)",
      realWorldTrap: "Using `RANK()` instead of `DENSE_RANK()`. If there is a tie for 1st place (two products with identical sales), `RANK()` numbers them 1, 1, 3 (skipping rank 2!). `DENSE_RANK()` numbers them 1, 1, 2, ensuring you don't accidentally skip ranks.",
      interviewRelevance: "'Find the Top N records per group' is the single most frequently asked advanced SQL interview problem at Amazon, Meta, and Google."
    },
    schema: "category_product_sales (Ranking CTE)",
    challenge: {
      instruction: "Complete the CTE using `DENSE_RANK()` partitioned by `category` and ordered by `total_units_sold DESC`, then filter for ranks 1 through 3.",
      template: "WITH RankedSales AS (\n  SELECT category, asin, product_title, total_units_sold,\n    ___1___() OVER (PARTITION BY ___2___ ORDER BY total_units_sold ___3___) AS sales_rank\n  FROM category_product_sales\n)\nSELECT category, sales_rank, asin, product_title, total_units_sold\nFROM RankedSales\nWHERE sales_rank <= 3\nORDER BY category, sales_rank;",
      blanks: [
        { id: 1, label: "Ranking Function", answer: "DENSE_RANK", options: ["DENSE_RANK", "ROW_NUMBER", "RANK", "TOP"] },
        { id: 2, label: "Partition Column", answer: "category", options: ["category", "asin", "total_units_sold", "sales_rank"] },
        { id: 3, label: "Sort Direction", answer: "DESC", options: ["DESC", "ASC", "TOP", "MAX"] }
      ],
      expectedSql: "WITH RankedSales AS (SELECT category, asin, product_title, total_units_sold, DENSE_RANK() OVER (PARTITION BY category ORDER BY total_units_sold DESC) AS sales_rank FROM category_product_sales) SELECT category, sales_rank, asin, product_title, total_units_sold FROM RankedSales WHERE sales_rank <= 3 ORDER BY category, sales_rank;",
      managerReview: "Phenomenal work! You just used a Common Table Expression with a partitioned DENSE_RANK to solve a classic FAANG problem. You're ready for Week 4: The Prime Day War Room!"
    }
  },

  // ---------------------------------------------------------------------------
  // WEEK 4: PRIME DAY WAR ROOM & PRODUCTION DEEP-DIVES (DAYS 22 - 30)
  // ---------------------------------------------------------------------------
  {
    day: 22,
    week: 4,
    phase: "Week 4: Prime Day War Room",
    title: "Day 22: Lightning Deal Sell-Through Rate Radar",
    sender: "Priya Nair",
    senderRole: "L7 Director of Operations",
    senderAvatar: "👩‍💼",
    priority: "P0 - War Room Live",
    department: "Prime Day Deals Command Center",
    chimeMessage: "PRIME DAY HAS BEGUN! 🚀 We're in the live War Room. We have 10,000 Lightning Deals running simultaneously. Calculate the live sell-through percentage: `claimed_units / allocated_deal_units * 100.0`. Flag deals that have sold > 90% with more than 2 hours remaining!",
    contextReport: {
      businessWhy: "On Prime Day, Lightning Deals run for limited 6-hour windows with fixed promotional stock allocations. If a blockbuster deal (like an Echo Dot at 60% off) reaches 100% sell-out in the first hour, the Deals Desk can contact the merchant to inject 5,000 more units to keep revenue printing.",
      learningFocus: [
        "Real-time velocity tracking on live production tables",
        "Calculated ratio metrics: `ROUND(100.0 * claimed_units / allocated_units, 2)`",
        "Multi-variate operational filtering: `sell_through_pct >= 90.0 AND hours_remaining >= 2.0`",
        "High-urgency operational triage"
      ],
      sampleSchema: "lightning_deals (\n  deal_id VARCHAR(20) PRIMARY KEY,\n  asin VARCHAR(10),\n  deal_title VARCHAR(150),\n  allocated_units INT,\n  claimed_units INT,\n  hours_remaining DECIMAL(4,2)\n)",
      realWorldTrap: "Avoid division by zero! If a test deal is created with `allocated_units = 0`, the query crashes with a fatal runtime division error. In production, use `NULLIF(allocated_units, 0)`.",
      interviewRelevance: "Amazon's leadership principle 'Bias for Action': Live war room queries require speed, precision, and bulletproof defense against runtime zero-division crashes."
    },
    schema: "lightning_deals (Live War Room)",
    challenge: {
      instruction: "Calculate the sell-through percentage and filter for deals where the sell-through is >= 90% with at least 2.0 hours remaining.",
      template: "SELECT deal_id, asin, deal_title,\n  allocated_units, claimed_units, hours_remaining,\n  ROUND(___1___ * claimed_units / NULLIF(allocated_units, 0), 2) AS sell_through_pct\nFROM lightning_deals\nWHERE (100.0 * claimed_units / NULLIF(allocated_units, 0)) >= ___2___\n  AND hours_remaining >= ___3___;",
      blanks: [
        { id: 1, label: "Float Percent Multiplier", answer: "100.0", options: ["100.0", "1.0", "100", "0.01"] },
        { id: 2, label: "Sell-Through Cutoff", answer: "90.0", options: ["90.0", "0.90", "900", "50.0"] },
        { id: 3, label: "Hours Remaining", answer: "2.0", options: ["2.0", "12", "0", "24"] }
      ],
      expectedSql: "SELECT deal_id, asin, deal_title, allocated_units, claimed_units, hours_remaining, ROUND(100.0 * claimed_units / NULLIF(allocated_units, 0), 2) AS sell_through_pct FROM lightning_deals WHERE (100.0 * claimed_units / NULLIF(allocated_units, 0)) >= 90.0 AND hours_remaining >= 2.0;",
      managerReview: "Boom! Deals Desk contacted 8 vendors and unlocked 45,000 additional units of trending smart home gear within 10 minutes. That saved $1.8M in lost sales!"
    }
  },
  {
    day: 23,
    week: 4,
    phase: "Week 4: Prime Day War Room",
    title: "Day 23: Inventory Stockout (OOS) Burn Rate Radar",
    sender: "Carlos Santos",
    senderRole: "L5 Fulfillment Center Operations Manager",
    senderAvatar: "👷‍♂️",
    priority: "P0 - War Room Live",
    department: "Supply Chain & Inventory Ops",
    chimeMessage: "Warehouse bins are emptying at 4x normal speed! Find all top-selling products that have fewer than 6 hours of inventory left based on their hourly sales burn rate: `current_on_hand_units / hourly_sales_velocity < 6.0`.",
    contextReport: {
      businessWhy: "Stockouts on Prime Day destroy algorithmic search relevance. When an item runs out of stock, its 'Buy Box' disappears, and frustrated customers buy from competitors. Spotting stockout burn rates allows logistics to throttle ad spend or redirect regional orders.",
      learningFocus: [
        "Inventory burn rate calculation: `current_units / hourly_burn_rate`",
        "Defensive programming with `NULLIF(velocity, 0)`",
        "Threshold filtering for critical replenishment warnings",
        "Sorting by most imminent stockout (`hours_of_cover ASC`)"
      ],
      sampleSchema: "inventory_velocity (\n  asin VARCHAR(10) PRIMARY KEY,\n  product_name VARCHAR(200),\n  current_on_hand_units INT,\n  hourly_sales_velocity DECIMAL(8,2)\n)",
      realWorldTrap: "If `hourly_sales_velocity` is 0, dividing by zero causes query failure. Wrapping the divisor with `NULLIF(hourly_sales_velocity, 0)` returns `NULL`, which safely ignores unsold products.",
      interviewRelevance: "Inventory turnover and 'days of cover' are standard metrics tested in supply chain analytics interviews at Amazon and Walmart."
    },
    schema: "inventory_velocity",
    challenge: {
      instruction: "Calculate `hours_of_cover` and filter for products with fewer than 6.0 hours of stock remaining, sorted by most urgent stockout first.",
      template: "SELECT asin, product_name, current_on_hand_units, hourly_sales_velocity,\n  ROUND(current_on_hand_units / NULLIF(hourly_sales_velocity, 0), 1) AS hours_of_cover\nFROM inventory_velocity\nWHERE (current_on_hand_units / NULLIF(hourly_sales_velocity, 0)) < ___1___\nORDER BY hours_of_cover ___2___;",
      blanks: [
        { id: 1, label: "Burn Cutoff", answer: "6.0", options: ["6.0", "24.0", "1.0", "0.5"] },
        { id: 2, label: "Sort Direction", answer: "ASC", options: ["ASC", "DESC", "URGENT", "NULL"] }
      ],
      expectedSql: "SELECT asin, product_name, current_on_hand_units, hourly_sales_velocity, ROUND(current_on_hand_units / NULLIF(hourly_sales_velocity, 0), 1) AS hours_of_cover FROM inventory_velocity WHERE (current_on_hand_units / NULLIF(hourly_sales_velocity, 0)) < 6.0 ORDER BY hours_of_cover ASC;",
      managerReview: "Sensational triage! Logistics immediately triggered emergency replenishment from secondary reserve hubs for 24 high-velocity items."
    }
  },
  {
    day: 24,
    week: 4,
    phase: "Week 4: Prime Day War Room",
    title: "Day 24: Bot / Scalper Rapid-Fire Purchase Velocity",
    sender: "Sarah Jenkins",
    senderRole: "L6 Senior BIE Lead",
    senderAvatar: "👩‍💼",
    priority: "P0 - Fraud Alert",
    department: "Customer Trust & Security",
    chimeMessage: "Security alert! Scalper bots are attempting to corner the market on discounted gaming consoles. Write a query detecting customer accounts that placed 4 or more orders within a single 5-minute rolling window.",
    contextReport: {
      businessWhy: "Automated resale bots snap up limited-quantity doorbuster deals within seconds, reselling them on third-party sites at 2x prices. This alienates legitimate Prime customers. Amazon fraud engines run sub-minute velocity checks to auto-freeze bot accounts.",
      learningFocus: [
        "High-frequency transaction fraud detection",
        "Using `COUNT(*) OVER (PARTITION BY customer_id ORDER BY order_time ...)`",
        "Sliding timestamp frames: `RANGE BETWEEN INTERVAL '5' MINUTE PRECEDING AND CURRENT ROW`",
        "Filtering suspicious velocity spikes"
      ],
      sampleSchema: "order_stream (\n  order_id INT,\n  customer_id INT,\n  order_time TIMESTAMP,\n  ip_address VARCHAR(45)\n)",
      realWorldTrap: "Using simple `GROUP BY customer_id` can miss bursts if transactions span two different hours. Sliding timestamp frames track genuine rolling latency.",
      interviewRelevance: "Cybersecurity and fraud analytics interviews frequently ask candidates to design rapid-fire transaction burst detection queries using window frames."
    },
    schema: "order_stream (Fraud Radar)",
    challenge: {
      instruction: "Count orders placed by the same customer in a rolling 5-minute window and flag customers with 4 or more orders.",
      template: "WITH VelocityStream AS (\n  SELECT order_id, customer_id, order_time, ip_address,\n    COUNT(*) OVER (\n      PARTITION BY ___1___\n      ORDER BY order_time\n      RANGE BETWEEN INTERVAL '5' MINUTE PRECEDING AND CURRENT ROW\n    ) AS rolling_5min_orders\n  FROM order_stream\n)\nSELECT customer_id, ip_address, MAX(rolling_5min_orders) AS peak_velocity\nFROM VelocityStream\nWHERE rolling_5min_orders >= ___2___\nGROUP BY customer_id, ip_address;",
      blanks: [
        { id: 1, label: "Partitioning Column", answer: "customer_id", options: ["customer_id", "order_id", "ip_address", "order_time"] },
        { id: 2, label: "Threshold", answer: "4", options: ["4", "10", "1", "100"] }
      ],
      expectedSql: "WITH VelocityStream AS (SELECT order_id, customer_id, order_time, ip_address, COUNT(*) OVER (PARTITION BY customer_id ORDER BY order_time RANGE BETWEEN INTERVAL '5' MINUTE PRECEDING AND CURRENT ROW) AS rolling_5min_orders FROM order_stream) SELECT customer_id, ip_address, MAX(rolling_5min_orders) AS peak_velocity FROM VelocityStream WHERE rolling_5min_orders >= 4 GROUP BY customer_id, ip_address;",
      managerReview: "Target confirmed! Security identified a distributed botnet firing from 120 proxy IPs. The fraud team cancelled the bot orders and returned the consoles to legitimate human Prime shoppers!"
    }
  },
  {
    day: 25,
    week: 4,
    phase: "Week 4: Prime Day War Room",
    title: "Day 25: Modularizing Spaghetti SQL with Clean Chained CTEs",
    sender: "David Chen",
    senderRole: "L5 Principal Product Manager",
    senderAvatar: "👨‍💻",
    priority: "P1 - Code Quality",
    department: "Enterprise Analytics Architecture",
    chimeMessage: "A legacy query from 2021 has 4 nested subqueries and keeps timing out. Sarah asked you to refactor it into clean, maintainable Chained CTEs: Stage 1 filters orders, Stage 2 aggregates category revenue, Stage 3 calculates margin.",
    contextReport: {
      businessWhy: "In production data warehouses, nested subqueries are notoriously difficult to read, debug, and optimize. Chained Common Table Expressions (`WITH a AS (...), b AS (...)`) structure queries like software code: modular, testable, and self-documenting.",
      learningFocus: [
        "Chaining multiple CTEs with comma separation: `WITH stage1 AS (...), stage2 AS (...)`",
        "Refactoring deeply nested subqueries into sequential data pipeline steps",
        "Readability best practices for code reviews at Amazon",
        "Helping the query optimizer materialize intermediate stages efficiently"
      ],
      sampleSchema: "raw_orders & category_margins",
      realWorldTrap: "Do NOT write `WITH` before every CTE block! The `WITH` keyword is written once at the beginning. Subsequent CTEs are separated by commas: `WITH c1 AS (...), c2 AS (...)`.",
      interviewRelevance: "Senior interviewers judge your code style heavily. Writing clean, modular CTEs proves you write code that a whole team can maintain."
    },
    schema: "Modular CTE Pipeline",
    challenge: {
      instruction: "Chain two CTEs (`filtered_orders` and `category_totals`) separated by a comma to produce the final clean selection.",
      template: "WITH filtered_orders AS (\n  SELECT order_id, category, order_total\n  FROM raw_orders\n  WHERE is_cancelled = FALSE\n)___1___\ncategory_totals AS (\n  SELECT category, SUM(order_total) AS total_revenue\n  FROM filtered_orders\n  GROUP BY category\n)\nSELECT category, total_revenue\nFROM ___2___\nORDER BY total_revenue DESC;",
      blanks: [
        { id: 1, label: "CTE Separator", answer: ",", options: [",", ";", "WITH", "THEN"] },
        { id: 2, label: "Final Source", answer: "category_totals", options: ["category_totals", "filtered_orders", "raw_orders", "orders"] }
      ],
      expectedSql: "WITH filtered_orders AS (SELECT order_id, category, order_total FROM raw_orders WHERE is_cancelled = FALSE), category_totals AS (SELECT category, SUM(order_total) AS total_revenue FROM filtered_orders GROUP BY category) SELECT category, total_revenue FROM category_totals ORDER BY total_revenue DESC;",
      managerReview: "Masterful refactor! The query execution time dropped from 42 seconds to 3.8 seconds, and now any analyst on the team can read and modify it with ease."
    }
  },
  {
    day: 26,
    week: 4,
    phase: "Week 4: Prime Day War Room",
    title: "Day 26: Prime Day Hourly Running Cumulative Revenue",
    sender: "Priya Nair",
    senderRole: "L7 Director of Operations",
    senderAvatar: "👩‍💼",
    priority: "P0 - War Room Big Screen",
    department: "Executive Command Center",
    chimeMessage: "We're projecting the live scoreboard onto the 100-foot War Room screen for the CEO. Write a query calculating cumulative running revenue accumulated hour-by-hour from 00:00 to 23:00 on Prime Day.",
    contextReport: {
      businessWhy: "Running accumulators show whether total revenue is tracking ahead of or behind historical records. If the 2:00 PM cumulative total is $4.2B compared to $3.8B last year, the CEO knows the promotion is outperforming forecasts.",
      learningFocus: [
        "Cumulative running total syntax: `SUM(hourly_revenue) OVER (ORDER BY sale_hour ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`",
        "Understanding default window frames in SQL",
        "Formatting real-time time-series progression",
        "Displaying milestone progress meters"
      ],
      sampleSchema: "prime_day_hourly (\n  sale_hour INT, -- 0 to 23\n  hourly_revenue DECIMAL(12,2)\n)",
      realWorldTrap: "Be aware of window frame defaults. In standard SQL, `ORDER BY` without an explicit frame defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. Explicitly specifying `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` is faster in Redshift because it avoids duplicate value range checks.",
      interviewRelevance: "Running totals are asked in nearly every financial analytics and e-commerce technical screening."
    },
    schema: "prime_day_hourly (Running Totals)",
    challenge: {
      instruction: "Calculate the cumulative running revenue using `SUM() OVER (...)` with an unbounded preceding frame ordered by `sale_hour`.",
      template: "SELECT sale_hour, hourly_revenue,\n  SUM(hourly_revenue) OVER (\n    ORDER BY sale_hour\n    ROWS BETWEEN ___1___ PRECEDING AND CURRENT ___2___\n  ) AS cumulative_running_revenue\nFROM prime_day_hourly\nORDER BY sale_hour ASC;",
      blanks: [
        { id: 1, label: "Starting Boundary", answer: "UNBOUNDED", options: ["UNBOUNDED", "1", "START", "ALL"] },
        { id: 2, label: "Ending Boundary", answer: "ROW", options: ["ROW", "ROWS", "VALUE", "STEP"] }
      ],
      expectedSql: "SELECT sale_hour, hourly_revenue, SUM(hourly_revenue) OVER (ORDER BY sale_hour ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_running_revenue FROM prime_day_hourly ORDER BY sale_hour ASC;",
      managerReview: "The big screen updated live! At 18:00, the ticker crossed $10 Billion cumulative GMV. The entire command center cheered!"
    }
  },
  {
    day: 27,
    week: 4,
    phase: "Week 4: Prime Day War Room",
    title: "Day 27: Subscribe & Save Re-Order Cadence (Gaps & LTV)",
    sender: "David Chen",
    senderRole: "L5 Principal Product Manager",
    senderAvatar: "👨‍💻",
    priority: "P1 - Subscriptions",
    department: "Subscribe & Save (SnS)",
    chimeMessage: "Millions of customers joined Subscribe & Save during Prime Day discounts. Calculate the interval in days between a customer's first order and their second order to calibrate our automated refill reminders.",
    contextReport: {
      businessWhy: "Subscribe & Save generates predictable recurring revenue. If customers re-order laundry detergent every 45 days, sending a refill reminder at Day 40 increases repeat conversion by 28%. Measuring the exact inter-order gap is critical for lifecycle algorithms.",
      learningFocus: [
        "Calculating inter-row temporal gaps: `DATEDIFF('day', first_order_date, second_order_date)`",
        "Ranking sequential purchases per customer: `ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date)`",
        "Pivoting or joining order #1 with order #2",
        "Understanding cohort retention cycles"
      ],
      sampleSchema: "customer_orders (\n  customer_id INT,\n  order_id INT,\n  order_date DATE\n)",
      realWorldTrap: "Customers who have only ordered ONCE will not have a second order! Using an INNER JOIN between order 1 and order 2 automatically isolates repeat customers, while a LEFT JOIN shows one-and-done churners.",
      interviewRelevance: "'Gaps and Islands' and repeat-purchase cadence problems are standard senior analyst evaluation questions."
    },
    schema: "customer_orders (Cadence Analysis)",
    challenge: {
      instruction: "Join order #1 with order #2 for each customer to compute `days_between_orders`.",
      template: "WITH SequentialOrders AS (\n  SELECT customer_id, order_id, order_date,\n    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_seq\n  FROM customer_orders\n)\nSELECT o1.customer_id, o1.order_date AS first_order,\n  o2.order_date AS second_order,\n  DATEDIFF('day', o1.order_date, o2.order_date) AS days_between_orders\nFROM SequentialOrders o1\nINNER JOIN SequentialOrders o2\n  ON o1.customer_id = o2.customer_id\n  AND o1.order_seq = ___1___\n  AND o2.order_seq = ___2___;",
      blanks: [
        { id: 1, label: "First Order Sequence", answer: "1", options: ["1", "0", "2", "FIRST"] },
        { id: 2, label: "Second Order Sequence", answer: "2", options: ["2", "1", "3", "NEXT"] }
      ],
      expectedSql: "WITH SequentialOrders AS (SELECT customer_id, order_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_seq FROM customer_orders) SELECT o1.customer_id, o1.order_date AS first_order, o2.order_date AS second_order, DATEDIFF('day', o1.order_date, o2.order_date) AS days_between_orders FROM SequentialOrders o1 INNER JOIN SequentialOrders o2 ON o1.customer_id = o2.customer_id AND o1.order_seq = 1 AND o2.order_seq = 2;",
      managerReview: "Fabulous cadence modeling! You discovered that coffee pod subscribers re-order after 32 days, while pet food subscribers re-order after 48 days. Marketing tailored the reminder emails accordingly."
    }
  },
  {
    day: 28,
    week: 4,
    phase: "Week 4: Prime Day War Room",
    title: "Day 28: Seller Payout Fee Reconciler & Margin Shield",
    sender: "Sarah Jenkins",
    senderRole: "L6 Senior BIE Lead",
    senderAvatar: "👩‍💼",
    priority: "P1 - Finance",
    department: "Marketplace Treasury & Settlements",
    chimeMessage: "Prime Day transactions are settling. Calculate net seller payouts after deducting Amazon's 15% referral fee, FBA pick/pack storage fee ($3.50/unit), and any processed customer refund deductions.",
    contextReport: {
      businessWhy: "Amazon processes hundreds of millions of marketplace payouts. To maintain trust and avoid multi-million-dollar accounting discrepancies, analysts build reconciliation queries that verify gross revenue minus all contractual deductions equals net disbursed funds.",
      learningFocus: [
        "Complex compound mathematical formulas in SQL",
        "Accounting deduction equations: `gross_sales - (gross_sales * 0.15) - (units * 3.50) - refunds`",
        "Handling optional deductions with `COALESCE(refund_amount, 0)`",
        "Ensuring pennies are rounded accurately using `ROUND(..., 2)`"
      ],
      sampleSchema: "seller_settlements (\n  seller_id VARCHAR(20),\n  gross_sales DECIMAL(10,2),\n  units_sold INT,\n  refund_clawbacks DECIMAL(10,2)\n)",
      realWorldTrap: "If `refund_clawbacks` is `NULL` for sellers with zero returns, subtracting `NULL` makes the ENTIRE net payout `NULL`! You MUST wrap nullable columns in `COALESCE(refund_clawbacks, 0)`.",
      interviewRelevance: "Handling `NULL` in arithmetic calculations is a classic trap in financial tech and marketplace interviews."
    },
    schema: "seller_settlements (Financial Math)",
    challenge: {
      instruction: "Calculate net payout deducting a 15% referral fee (`0.15 * gross_sales`), $3.50 per unit, and `COALESCE(refund_clawbacks, 0)`.",
      template: "SELECT seller_id, gross_sales, units_sold,\n  ROUND(\n    gross_sales\n    - (gross_sales * ___1___)\n    - (units_sold * 3.50)\n    - ___2___(refund_clawbacks, 0),\n    2\n  ) AS net_seller_payout\nFROM seller_settlements;",
      blanks: [
        { id: 1, label: "Referral Fee Rate", answer: "0.15", options: ["0.15", "15", "0.015", "1.15"] },
        { id: 2, label: "Null Fallback Function", answer: "COALESCE", options: ["COALESCE", "NULLIF", "ISNULL", "NVL2"] }
      ],
      expectedSql: "SELECT seller_id, gross_sales, units_sold, ROUND(gross_sales - (gross_sales * 0.15) - (units_sold * 3.50) - COALESCE(refund_clawbacks, 0), 2) AS net_seller_payout FROM seller_settlements;",
      managerReview: "Flawless financial accuracy! The Treasury system used this exact calculation to disburse over $4.2B to 350,000 independent small business owners without a single settlement break."
    }
  },
  {
    day: 29,
    week: 4,
    phase: "Week 4: Prime Day War Room",
    title: "Day 29: Post-Mortem Warehouse Capacity Stress Anomaly",
    sender: "Carlos Santos",
    senderRole: "L5 Fulfillment Center Operations Manager",
    senderAvatar: "👷‍♂️",
    priority: "P1 - Operations Post-Mortem",
    department: "Capacity Planning & Operations Research",
    chimeMessage: "Prime Day dust has settled. We need the official post-mortem report for leadership: Identify all fulfillment centers whose actual dispatched volume exceeded 120% of their designed maximum capacity.",
    contextReport: {
      businessWhy: "Operating a warehouse over 120% capacity causes worker fatigue, equipment failure, and overtime cost surges. Identifying which facilities blew past their safety ceilings informs where Amazon builds new robotic fulfillment centers next year.",
      learningFocus: [
        "Capacity utilization ratios: `ROUND(100.0 * actual_units / designed_capacity_units, 1)`",
        "Threshold filtering on design capacity multiples: `actual_units > 1.20 * designed_capacity_units`",
        "Calculating excess backlog overflow units",
        "Writing root-cause post-mortem analyses"
      ],
      sampleSchema: "fc_capacity_audit (\n  fc_id VARCHAR(10) PRIMARY KEY,\n  city VARCHAR(50),\n  state VARCHAR(2),\n  designed_capacity_units INT,\n  actual_dispatched_units INT\n)",
      realWorldTrap: "Make sure you compare like units. Comparing pallet count against package count produces false alerts.",
      interviewRelevance: "Post-mortem analysis and operational capacity planning questions are core to Amazon's operations engineering culture."
    },
    schema: "fc_capacity_audit (Post-Mortem)",
    challenge: {
      instruction: "Find fulfillment centers where `actual_dispatched_units` exceeded 1.20 times `designed_capacity_units`, calculating `utilization_pct`.",
      template: "SELECT fc_id, city, state,\n  designed_capacity_units, actual_dispatched_units,\n  ROUND(___1___ * actual_dispatched_units / designed_capacity_units, 1) AS utilization_pct,\n  (actual_dispatched_units - designed_capacity_units) AS overflow_units\nFROM fc_capacity_audit\nWHERE actual_dispatched_units > (___2___ * designed_capacity_units)\nORDER BY utilization_pct DESC;",
      blanks: [
        { id: 1, label: "Percent Multiplier", answer: "100.0", options: ["100.0", "1.0", "100", "10"] },
        { id: 2, label: "Multiplier Cutoff", answer: "1.20", options: ["1.20", "120", "0.20", "2.0"] }
      ],
      expectedSql: "SELECT fc_id, city, state, designed_capacity_units, actual_dispatched_units, ROUND(100.0 * actual_dispatched_units / designed_capacity_units, 1) AS utilization_pct, (actual_dispatched_units - designed_capacity_units) AS overflow_units FROM fc_capacity_audit WHERE actual_dispatched_units > (1.20 * designed_capacity_units) ORDER BY utilization_pct DESC;",
      managerReview: "Critical finding! Warehouse ONT8 in Southern California ran at 148% capacity. Leadership approved funding for a new automated robotics sortation annex based on this report."
    }
  },
  {
    day: 30,
    week: 4,
    phase: "Week 4: Prime Day War Room",
    title: "Day 30: The Final L8 VP Executive Presentation (The Capstone)",
    sender: "Sarah Jenkins & Priya Nair",
    senderRole: "L6 BIE Lead & L7 Ops Director",
    senderAvatar: "👩‍💼",
    priority: "P0 - Final Capstone",
    department: "Office of the Vice President",
    chimeMessage: "YOU MADE IT TO DAY 30! 🎓 The Vice President of Amazon Worldwide Retail is in the boardroom right now. You need to deliver the Ultimate Prime Day Executive Summary Table: Total Orders, Total GMV, Unique Prime Customers, and Total Return Loss — all synthesized into one cohesive query. Show them what you've learned!",
    contextReport: {
      businessWhy: "This is the culmination of your entire onboarding journey. Senior VPs don't have time to look at fragmented snippets. They want a unified, definitive executive summary that synthesizes orders, revenue, customer adoption, and refund leakages into an unshakeable single-row scorecard.",
      learningFocus: [
        "Synthesizing multiple business concepts into a single cohesive architecture",
        "Combining CTEs, joins, aggregations, and formatting",
        "Extracting high-level KPI summaries from millions of raw records",
        "Demonstrating end-to-end data mastery as an autonomous Amazon Data Analyst"
      ],
      sampleSchema: "orders o LEFT JOIN returns r",
      realWorldTrap: "Double-counting revenue when joining orders to returns! Because an order can have multiple return rows, joining returns directly to orders duplicates `order_total` in simple sums. You must aggregate returns separately in a CTE before joining, or use distinct key techniques.",
      interviewRelevance: "This is the ultimate Amazon L4/L5 BIE hiring bar question: Building a clean, leak-free executive dashboard query from scratch."
    },
    schema: "Executive Capstone",
    challenge: {
      instruction: "Complete the ultimate executive summary query combining order counts, total GMV, unique Prime shoppers, and total refund losses.",
      template: "WITH OrderSummary AS (\n  SELECT\n    COUNT(order_id) AS total_orders,\n    SUM(order_total) AS total_gmv,\n    COUNT(DISTINCT CASE WHEN is_prime = TRUE THEN customer_id ___1___) AS unique_prime_customers\n  FROM orders\n),\nReturnSummary AS (\n  SELECT SUM(refund_amount) AS total_refund_losses\n  FROM returns\n)\nSELECT\n  o.total_orders,\n  o.total_gmv,\n  o.unique_prime_customers,\n  r.total_refund_losses,\n  ROUND((r.total_refund_losses / ___2___.total_gmv) * 100.0, 2) AS refund_leakage_pct\nFROM OrderSummary o\n___3___ JOIN ReturnSummary r ON 1=1;",
      blanks: [
        { id: 1, label: "CASE End", answer: "END", options: ["END", "STOP", "ELSE", "FINISH"] },
        { id: 2, label: "Table Alias", answer: "o", options: ["o", "r", "orders", "returns"] },
        { id: 3, label: "Unconditional Join", answer: "CROSS", options: ["CROSS", "INNER", "LEFT", "NATURAL"] }
      ],
      expectedSql: "WITH OrderSummary AS (SELECT COUNT(order_id) AS total_orders, SUM(order_total) AS total_gmv, COUNT(DISTINCT CASE WHEN is_prime = TRUE THEN customer_id END) AS unique_prime_customers FROM orders), ReturnSummary AS (SELECT SUM(refund_amount) AS total_refund_losses FROM returns) SELECT o.total_orders, o.total_gmv, o.unique_prime_customers, r.total_refund_losses, ROUND((r.total_refund_losses / o.total_gmv) * 100.0, 2) AS refund_leakage_pct FROM OrderSummary o CROSS JOIN ReturnSummary r ON 1=1;",
      managerReview: "STANDING OVATION IN THE BOARDROOM! 🏆 The VP looked at the scorecard and said: 'Promote this analyst.' You delivered flawless, production-grade SQL every single day, protected customer experience, clawed back vendor penalties, and crushed Prime Day. Welcome to the Amazon BIE family!"
    }
  }
];
