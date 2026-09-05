// =============================================================================
// DOMAIN ERD ENGINE & VISUAL SCHEMA GENERATOR (BEGINNER-FRIENDLY EDITION)
// Provides:
// 1. Complete visual ERD models for all 10 corporate domains with SVG relationship arrows.
// 2. Mini-ERD component builder for case study cards (replacing raw text schemas).
// 3. Full-screen interactive Domain ERD diagram viewer with plain-English callouts.
// =============================================================================

window.DOMAIN_ERD_ENGINE = (() => {

  // Comprehensive multi-table schemas for all 10 corporate domains
  const DOMAIN_SCHEMAS = {
    'Fintech': {
      domain: 'Fintech',
      icon: '💳',
      title: 'Neobank & Global Payments Infrastructure',
      overview: 'How money moves safely: Customers own Accounts, Accounts issue Cards, Cards make Transactions, and suspicious charges trigger Disputes.',
      tables: [
        {
          name: 'CUSTOMERS',
          caption: 'Account Holders',
          icon: '👤',
          desc: 'Verified identity and personal details of the cardholder.',
          columns: [
            { name: 'customer_id', type: 'VARCHAR(32)', isPk: true, desc: 'Unique Person ID [Like a Passport #]' },
            { name: 'full_name', type: 'VARCHAR(128)', isPk: false, desc: 'Legal Cardholder Name' },
            { name: 'kyc_status', type: 'VARCHAR(20)', isPk: false, desc: 'Identity Check: VERIFIED or PENDING' }
          ]
        },
        {
          name: 'ACCOUNTS',
          caption: 'Bank Wallets',
          icon: '🏦',
          desc: 'Digital money account holding the balance in USD or EUR.',
          columns: [
            { name: 'account_id', type: 'VARCHAR(32)', isPk: true, desc: 'Unique Wallet ID' },
            { name: 'customer_id', type: 'VARCHAR(32)', isFk: true, ref: 'CUSTOMERS.customer_id', desc: 'FK [Which customer owns this wallet]' },
            { name: 'balance_usd', type: 'DECIMAL(12,2)', isPk: false, desc: 'Current Available Balance ($)' },
            { name: 'status', type: 'VARCHAR(16)', isPk: false, desc: 'ACTIVE or FROZEN' }
          ]
        },
        {
          name: 'CardAuthProfiles',
          caption: 'Payment Cards',
          icon: '💳',
          desc: 'Physical or virtual cards used to swipe at store registers.',
          columns: [
            { name: 'card_id', type: 'VARCHAR(32)', isPk: true, desc: 'Unique Card Token [Safe Chip ID]' },
            { name: 'account_id', type: 'VARCHAR(32)', isFk: true, ref: 'ACCOUNTS.account_id', desc: 'FK [Which bank wallet pays for swipes]' },
            { name: 'daily_spend_limit_usd', type: 'INT', isPk: false, desc: 'Maximum $ allowed to spend per day' },
            { name: 'is_card_frozen', type: 'BOOLEAN', isPk: false, desc: 'Lock Toggle: TRUE=Locked, FALSE=Swipeable' }
          ]
        },
        {
          name: 'TRANSACTIONS',
          caption: 'Card Swipes & Charges',
          icon: '🧾',
          desc: 'Every single purchase made at a store or online website.',
          columns: [
            { name: 'tx_id', type: 'VARCHAR(32)', isPk: true, desc: 'Unique Receipt / Charge Number' },
            { name: 'card_id', type: 'VARCHAR(32)', isFk: true, ref: 'CardAuthProfiles.card_id', desc: 'FK [Which card was swiped]' },
            { name: 'merchant_name', type: 'VARCHAR(64)', isPk: false, desc: 'Store Name (e.g. Apple, Uber, Walmart)' },
            { name: 'amount_usd', type: 'DECIMAL(10,2)', isPk: false, desc: 'Total Price Charged in Dollars' },
            { name: 'status', type: 'VARCHAR(16)', isPk: false, desc: 'SUCCEEDED, PENDING, or DECLINED' }
          ]
        },
        {
          name: 'DISPUTES',
          caption: 'Fraud Claims',
          icon: '🚨',
          desc: 'When a customer says "I did not buy this! Someone stole my card!"',
          columns: [
            { name: 'dispute_id', type: 'VARCHAR(32)', isPk: true, desc: 'Case Ticket Number' },
            { name: 'tx_id', type: 'VARCHAR(32)', isFk: true, ref: 'TRANSACTIONS.tx_id', desc: 'FK [Which transaction is being challenged]' },
            { name: 'reason_code', type: 'VARCHAR(32)', isPk: false, desc: 'FRAUD or UNAUTHORIZED' }
          ]
        }
      ],
      relationships: [
        { from: 'CUSTOMERS', to: 'ACCOUNTS', label: '1 : N [One customer can open multiple bank wallets]' },
        { from: 'ACCOUNTS', to: 'CardAuthProfiles', label: '1 : N [One bank wallet can issue multiple debit cards]' },
        { from: 'CardAuthProfiles', to: 'TRANSACTIONS', label: '1 : N [One card can make thousands of purchase swipes]' },
        { from: 'TRANSACTIONS', to: 'DISPUTES', label: '1 : 1 [One purchase can have at most one dispute claim]' }
      ]
    },

    'SaaS': {
      domain: 'SaaS',
      icon: '☁️',
      title: 'Cloud Software & Subscription Platform',
      overview: 'How cloud tools work: Companies sign up for Organizations, buy Subscriptions, invite Users to Workspaces, and monitor AuditLogs.',
      tables: [
        {
          name: 'ORGANIZATIONS',
          caption: 'Client Companies',
          icon: '🏢',
          desc: 'The paying company or enterprise holding the account.',
          columns: [
            { name: 'org_id', type: 'VARCHAR(32)', isPk: true, desc: 'Unique Company ID' },
            { name: 'company_name', type: 'VARCHAR(128)', isPk: false, desc: 'Business Name (e.g. Acme Corp)' },
            { name: 'tier', type: 'VARCHAR(24)', isPk: false, desc: 'FREE, PRO, or ENTERPRISE' }
          ]
        },
        {
          name: 'SUBSCRIPTIONS',
          caption: 'Billing Plans',
          icon: '📄',
          desc: 'Monthly or yearly software licensing contract.',
          columns: [
            { name: 'sub_id', type: 'VARCHAR(32)', isPk: true, desc: 'Subscription Agreement ID' },
            { name: 'org_id', type: 'VARCHAR(32)', isFk: true, ref: 'ORGANIZATIONS.org_id', desc: 'FK [Company paying the bill]' },
            { name: 'seats_purchased', type: 'INT', isPk: false, desc: 'Total User Logins Allowed' },
            { name: 'monthly_rate_usd', type: 'DECIMAL(10,2)', isPk: false, desc: 'Cost Per Month ($)' }
          ]
        },
        {
          name: 'USERS',
          caption: 'Team Members',
          icon: '👥',
          desc: 'Employees using the software to do their daily jobs.',
          columns: [
            { name: 'user_id', type: 'VARCHAR(32)', isPk: true, desc: 'Employee Login ID' },
            { name: 'org_id', type: 'VARCHAR(32)', isFk: true, ref: 'ORGANIZATIONS.org_id', desc: 'FK [Which company they work for]' },
            { name: 'email', type: 'VARCHAR(128)', isPk: false, desc: 'Work Email Address' },
            { name: 'role', type: 'VARCHAR(24)', isPk: false, desc: 'ADMIN, EDITOR, or VIEWER' }
          ]
        },
        {
          name: 'AUDIT_LOGS',
          caption: 'Security Activity Stream',
          icon: '🛡️',
          desc: 'Timestamped record of every password change, file export, or login.',
          columns: [
            { name: 'log_id', type: 'VARCHAR(32)', isPk: true, desc: 'Event Audit Record ID' },
            { name: 'user_id', type: 'VARCHAR(32)', isFk: true, ref: 'USERS.user_id', desc: 'FK [Who performed the action]' },
            { name: 'action', type: 'VARCHAR(64)', isPk: false, desc: 'LOGIN, FILE_EXPORT, PASSWORD_RESET' },
            { name: 'ip_address', type: 'VARCHAR(45)', isPk: false, desc: 'Internet Address of User Device' }
          ]
        }
      ],
      relationships: [
        { from: 'ORGANIZATIONS', to: 'SUBSCRIPTIONS', label: '1 : 1 [One company has one active subscription contract]' },
        { from: 'ORGANIZATIONS', to: 'USERS', label: '1 : N [One company employs many user members]' },
        { from: 'USERS', to: 'AUDIT_LOGS', label: '1 : N [One user performs many trackable actions]' }
      ]
    },

    'Retail': {
      domain: 'Retail',
      icon: '🛒',
      title: 'E-Commerce Store & Warehouse Fulfillment',
      overview: 'How shopping carts work: Customers browse Products, build Orders with OrderItems, and Warehouses track Inventory stock.',
      tables: [
        {
          name: 'CUSTOMERS',
          caption: 'Online Shoppers',
          icon: '🛍️',
          desc: 'Registered shoppers placing orders with shipping addresses.',
          columns: [
            { name: 'customer_id', type: 'INT', isPk: true, desc: 'Shopper ID' },
            { name: 'email', type: 'VARCHAR(128)', isPk: false, desc: 'Customer Email' },
            { name: 'loyalty_tier', type: 'VARCHAR(20)', isPk: false, desc: 'BRONZE, SILVER, GOLD' }
          ]
        },
        {
          name: 'PRODUCTS',
          caption: 'Catalog Items',
          icon: '📦',
          desc: 'Items listed in store catalog with pricing and descriptions.',
          columns: [
            { name: 'product_id', type: 'INT', isPk: true, desc: 'Barcode / Item Number' },
            { name: 'product_name', type: 'VARCHAR(128)', isPk: false, desc: 'Product Title' },
            { name: 'unit_price', type: 'DECIMAL(10,2)', isPk: false, desc: 'Retail Shelf Price' },
            { name: 'category', type: 'VARCHAR(64)', isPk: false, desc: 'ELECTRONICS, CLOTHING, etc.' }
          ]
        },
        {
          name: 'ORDERS',
          caption: 'Shopping Receipts',
          icon: '🧾',
          desc: 'A customer checkout order with total cost and delivery status.',
          columns: [
            { name: 'order_id', type: 'INT', isPk: true, desc: 'Receipt Tracking ID' },
            { name: 'customer_id', type: 'INT', isFk: true, ref: 'CUSTOMERS.customer_id', desc: 'FK [Who placed the order]' },
            { name: 'total_amount', type: 'DECIMAL(10,2)', isPk: false, desc: 'Final Checkout Total ($)' },
            { name: 'order_status', type: 'VARCHAR(24)', isPk: false, desc: 'PENDING, SHIPPED, DELIVERED' }
          ]
        },
        {
          name: 'ORDER_ITEMS',
          caption: 'Lines in Cart',
          icon: '📋',
          desc: 'Each line item in an order: which product and how many units.',
          columns: [
            { name: 'item_id', type: 'INT', isPk: true, desc: 'Line Item ID' },
            { name: 'order_id', type: 'INT', isFk: true, ref: 'ORDERS.order_id', desc: 'FK [Which order receipt]' },
            { name: 'product_id', type: 'INT', isFk: true, ref: 'PRODUCTS.product_id', desc: 'FK [Which product was bought]' },
            { name: 'quantity', type: 'INT', isPk: false, desc: 'How Many Units Purchased' }
          ]
        }
      ],
      relationships: [
        { from: 'CUSTOMERS', to: 'ORDERS', label: '1 : N [One shopper places multiple orders]' },
        { from: 'ORDERS', to: 'ORDER_ITEMS', label: '1 : N [One order receipt contains multiple items in the box]' },
        { from: 'PRODUCTS', to: 'ORDER_ITEMS', label: '1 : N [One product catalog item is ordered by many customers]' }
      ]
    },

    'Healthcare': {
      domain: 'Healthcare',
      icon: '🏥',
      title: 'Hospital Clinical Records & EHR System',
      overview: 'How hospitals organize medical care: Patients visit Doctors during Encounters, Doctors write Prescriptions, and Pharmacies dispense Medications.',
      tables: [
        {
          name: 'PATIENTS',
          caption: 'Hospital Patients',
          icon: '🩺',
          desc: 'Registered patients receiving medical care.',
          columns: [
            { name: 'patient_id', type: 'VARCHAR(32)', isPk: true, desc: 'Medical Record Number (MRN)' },
            { name: 'full_name', type: 'VARCHAR(128)', isPk: false, desc: 'Patient Legal Name' },
            { name: 'birth_date', type: 'DATE', isPk: false, desc: 'Patient Date of Birth' },
            { name: 'blood_type', type: 'VARCHAR(4)', isPk: false, desc: 'A+, O-, B+, AB+, etc.' }
          ]
        },
        {
          name: 'ENCOUNTERS',
          caption: 'Doctor Visits',
          icon: '🏥',
          desc: 'Emergency room visits, outpatient appointments, or surgeries.',
          columns: [
            { name: 'encounter_id', type: 'VARCHAR(32)', isPk: true, desc: 'Visit Record ID' },
            { name: 'patient_id', type: 'VARCHAR(32)', isFk: true, ref: 'PATIENTS.patient_id', desc: 'FK [Which patient was seen]' },
            { name: 'admission_date', type: 'DATETIME', isPk: false, desc: 'When the patient checked into hospital' },
            { name: 'discharge_date', type: 'DATETIME', isPk: false, desc: 'When patient was allowed to go home' }
          ]
        },
        {
          name: 'PRESCRIPTIONS',
          caption: 'Medicine Orders',
          icon: '💊',
          desc: 'Written prescription dosage orders authorized by a licensed physician.',
          columns: [
            { name: 'prescription_id', type: 'VARCHAR(32)', isPk: true, desc: 'Rx Order ID' },
            { name: 'encounter_id', type: 'VARCHAR(32)', isFk: true, ref: 'ENCOUNTERS.encounter_id', desc: 'FK [During which hospital visit]' },
            { name: 'medication_name', type: 'VARCHAR(128)', isPk: false, desc: 'Drug Name (e.g. Amoxicillin, Insulin)' },
            { name: 'dosage_mg', type: 'INT', isPk: false, desc: 'Strength in Milligrams' }
          ]
        }
      ],
      relationships: [
        { from: 'PATIENTS', to: 'ENCOUNTERS', label: '1 : N [One patient has multiple hospital visits]' },
        { from: 'ENCOUNTERS', to: 'PRESCRIPTIONS', label: '1 : N [One doctor visit can generate multiple medicine prescriptions]' }
      ]
    },

    'Logistics': {
      domain: 'Logistics',
      icon: '🚚',
      title: 'Global Supply Chain & Freight Tracking',
      overview: 'How cargo travels around the globe: Shippers book Shipments, Trucks carry packages between Warehouses, and Checkpoints track GPS scans.',
      tables: [
        {
          name: 'WAREHOUSES',
          caption: 'Sorting Hubs',
          icon: '🏭',
          desc: 'Distribution centers where boxes are sorted and loaded onto trucks.',
          columns: [
            { name: 'warehouse_id', type: 'VARCHAR(16)', isPk: true, desc: 'Facility Code (e.g. JFK-1)' },
            { name: 'city', type: 'VARCHAR(64)', isPk: false, desc: 'Location City' },
            { name: 'capacity_sqft', type: 'INT', isPk: false, desc: 'Floor Storage Area' }
          ]
        },
        {
          name: 'SHIPMENTS',
          caption: 'Cargo Packages',
          icon: '📦',
          desc: 'Box or shipping container moving from origin to destination.',
          columns: [
            { name: 'tracking_num', type: 'VARCHAR(32)', isPk: true, desc: 'Unique Tracking Barcode' },
            { name: 'origin_hub_id', type: 'VARCHAR(16)', isFk: true, ref: 'WAREHOUSES.warehouse_id', desc: 'FK [Starting warehouse]' },
            { name: 'weight_kg', type: 'DECIMAL(8,2)', isPk: false, desc: 'Weight in Kilograms' },
            { name: 'status', type: 'VARCHAR(24)', isPk: false, desc: 'IN_TRANSIT, DELIVERED, DELAYED' }
          ]
        },
        {
          name: 'GPS_CHECKPOINTS',
          caption: 'Scanner Pings',
          icon: '📡',
          desc: 'Barcode scans at airports, customs inspection, or local trucks.',
          columns: [
            { name: 'ping_id', type: 'BIGINT', isPk: true, desc: 'Timestamped Event Ping' },
            { name: 'tracking_num', type: 'VARCHAR(32)', isFk: true, ref: 'SHIPMENTS.tracking_num', desc: 'FK [Which package was scanned]' },
            { name: 'scan_location', type: 'VARCHAR(64)', isPk: false, desc: 'City or GPS Coordinates' }
          ]
        }
      ],
      relationships: [
        { from: 'WAREHOUSES', to: 'SHIPMENTS', label: '1 : N [One sorting warehouse dispatches thousands of shipments]' },
        { from: 'SHIPMENTS', to: 'GPS_CHECKPOINTS', label: '1 : N [One shipment gets scanned at multiple transit checkpoints]' }
      ]
    },

    'Media': {
      domain: 'Media',
      icon: '🎬',
      title: 'Streaming Entertainment & Audio Catalog',
      overview: 'How Netflix & Spotify stream media: Viewers subscribe, Creators publish Movies & Songs, and Playback streams record view duration.',
      tables: [
        {
          name: 'MEDIA_CATALOG',
          caption: 'Movies & Songs',
          icon: '📼',
          desc: 'Licensed digital content ready to stream on TVs and phones.',
          columns: [
            { name: 'content_id', type: 'VARCHAR(32)', isPk: true, desc: 'Content Catalog ID' },
            { name: 'title', type: 'VARCHAR(128)', isPk: false, desc: 'Show or Song Title' },
            { name: 'duration_seconds', type: 'INT', isPk: false, desc: 'Length in Seconds' }
          ]
        },
        {
          name: 'VIEWERS',
          caption: 'Subscribers',
          icon: '🍿',
          desc: 'Users streaming video and audio on their home screens.',
          columns: [
            { name: 'viewer_id', type: 'VARCHAR(32)', isPk: true, desc: 'User Profile ID' },
            { name: 'subscription_plan', type: 'VARCHAR(20)', isPk: false, desc: 'STANDARD_HD, PREMIUM_4K' }
          ]
        },
        {
          name: 'STREAM_SESSIONS',
          caption: 'Watch History',
          icon: '▶️',
          desc: 'Timestamped playback sessions recording seconds watched.',
          columns: [
            { name: 'session_id', type: 'BIGINT', isPk: true, desc: 'Streaming Session UUID' },
            { name: 'viewer_id', type: 'VARCHAR(32)', isFk: true, ref: 'VIEWERS.viewer_id', desc: 'FK [Who pressed play]' },
            { name: 'content_id', type: 'VARCHAR(32)', isFk: true, ref: 'MEDIA_CATALOG.content_id', desc: 'FK [Which movie/song was played]' },
            { name: 'seconds_watched', type: 'INT', isPk: false, desc: 'How long they watched before stopping' }
          ]
        }
      ],
      relationships: [
        { from: 'VIEWERS', to: 'STREAM_SESSIONS', label: '1 : N [One viewer watches hundreds of streaming sessions]' },
        { from: 'MEDIA_CATALOG', to: 'STREAM_SESSIONS', label: '1 : N [One movie title is streamed by millions of viewers]' }
      ]
    },

    'Security': {
      domain: 'Security',
      icon: '🛡️',
      title: 'Cybersecurity & Zero-Trust Authentication',
      overview: 'How cybersecurity firewalls operate: Employee Identities log in through AuthEvents, and suspicious breaches trigger SecurityIncidents.',
      tables: [
        {
          name: 'IDENTITIES',
          caption: 'User Accounts',
          icon: '🔑',
          desc: 'Verified employee accounts with multi-factor authentication.',
          columns: [
            { name: 'identity_id', type: 'VARCHAR(32)', isPk: true, desc: 'Employee SSO ID' },
            { name: 'email', type: 'VARCHAR(128)', isPk: false, desc: 'Corporate Email' },
            { name: 'mfa_enabled', type: 'BOOLEAN', isPk: false, desc: 'Two-Factor Auth Toggle' }
          ]
        },
        {
          name: 'AUTH_EVENTS',
          caption: 'Login Attempts',
          icon: '🚪',
          desc: 'Every login attempt from laptops, phones, and VPN tunnels.',
          columns: [
            { name: 'event_id', type: 'BIGINT', isPk: true, desc: 'Audit Log Entry ID' },
            { name: 'identity_id', type: 'VARCHAR(32)', isFk: true, ref: 'IDENTITIES.identity_id', desc: 'FK [Who tried to log in]' },
            { name: 'login_result', type: 'VARCHAR(16)', isPk: false, desc: 'SUCCESS, WRONG_PASSWORD, BLOCKED' },
            { name: 'country', type: 'VARCHAR(3)', isPk: false, desc: 'Login Location Country' }
          ]
        },
        {
          name: 'SECURITY_INCIDENTS',
          caption: 'Breach Tickets',
          icon: '🚨',
          desc: 'High-severity alerts investigated by the cybersecurity team.',
          columns: [
            { name: 'incident_id', type: 'VARCHAR(32)', isPk: true, desc: 'SOC Case Ticket' },
            { name: 'event_id', type: 'BIGINT', isFk: true, ref: 'AUTH_EVENTS.event_id', desc: 'FK [Suspicious login event]' },
            { name: 'severity', type: 'VARCHAR(16)', isPk: false, desc: 'LOW, HIGH, CRITICAL' }
          ]
        }
      ],
      relationships: [
        { from: 'IDENTITIES', to: 'AUTH_EVENTS', label: '1 : N [One identity attempts many daily logins]' },
        { from: 'AUTH_EVENTS', to: 'SECURITY_INCIDENTS', label: '1 : 1 [Suspicious failed logins trigger a security case ticket]' }
      ]
    },

    'Hardware': {
      domain: 'Hardware',
      icon: '⚡',
      title: 'IoT Telemetry & Embedded Sensor Fleets',
      overview: 'How connected devices report health: Devices run Firmware, stream SensorReadings every minute, and flag HardwareFaults.',
      tables: [
        {
          name: 'DEVICES',
          caption: 'Physical IoT Units',
          icon: '📱',
          desc: 'Smart thermostats, electric vehicle chips, or factory sensors.',
          columns: [
            { name: 'device_id', type: 'VARCHAR(32)', isPk: true, desc: 'Serial Number / MAC Address' },
            { name: 'device_model', type: 'VARCHAR(64)', isPk: false, desc: 'Hardware Model (e.g. Model X-99)' },
            { name: 'battery_pct', type: 'INT', isPk: false, desc: 'Battery Charge Level (0-100%)' }
          ]
        },
        {
          name: 'SENSOR_READINGS',
          caption: 'Telemetry Stream',
          icon: '📊',
          desc: 'Continuous streams of temperature, voltage, and vibration data.',
          columns: [
            { name: 'reading_id', type: 'BIGINT', isPk: true, desc: 'Atomic Metric Packet ID' },
            { name: 'device_id', type: 'VARCHAR(32)', isFk: true, ref: 'DEVICES.device_id', desc: 'FK [Which physical sensor sent data]' },
            { name: 'temperature_celsius', type: 'DECIMAL(6,2)', isPk: false, desc: 'Heat Sensor Value' },
            { name: 'voltage', type: 'DECIMAL(6,2)', isPk: false, desc: 'Power Supply Voltage' }
          ]
        }
      ],
      relationships: [
        { from: 'DEVICES', to: 'SENSOR_READINGS', label: '1 : N [One device broadcasts thousands of sensor reading packets]' }
      ]
    },

    'HR': {
      domain: 'HR',
      icon: '🏢',
      title: 'Enterprise Workforce & Payroll Ledger',
      overview: 'How companies manage teams: Departments hire Employees, and accounting runs monthly Payroll checks with tax withholdings.',
      tables: [
        {
          name: 'DEPARTMENTS',
          caption: 'Business Divisions',
          icon: '🏛️',
          desc: 'Engineering, Sales, Marketing, and Legal teams.',
          columns: [
            { name: 'dept_id', type: 'INT', isPk: true, desc: 'Department Code' },
            { name: 'dept_name', type: 'VARCHAR(64)', isPk: false, desc: 'Team Name' },
            { name: 'budget_usd', type: 'INT', isPk: false, desc: 'Annual Operating Budget' }
          ]
        },
        {
          name: 'EMPLOYEES',
          caption: 'Company Staff',
          icon: '👔',
          desc: 'Staff members, job titles, hire dates, and compensation tiers.',
          columns: [
            { name: 'emp_id', type: 'INT', isPk: true, desc: 'Employee Badge Number' },
            { name: 'full_name', type: 'VARCHAR(128)', isPk: false, desc: 'Legal Name' },
            { name: 'dept_id', type: 'INT', isFk: true, ref: 'DEPARTMENTS.dept_id', desc: 'FK [Which department they work in]' },
            { name: 'salary_usd', type: 'INT', isPk: false, desc: 'Annual Base Salary ($)' }
          ]
        },
        {
          name: 'PAYROLL_RUNS',
          caption: 'Paychecks',
          icon: '💵',
          desc: 'Bi-weekly direct deposits deposited into employee bank accounts.',
          columns: [
            { name: 'paycheck_id', type: 'INT', isPk: true, desc: 'Paycheck Voucher ID' },
            { name: 'emp_id', type: 'INT', isFk: true, ref: 'EMPLOYEES.emp_id', desc: 'FK [Who received this paycheck]' },
            { name: 'net_pay_usd', type: 'DECIMAL(10,2)', isPk: false, desc: 'Take-Home Cash After Taxes' }
          ]
        }
      ],
      relationships: [
        { from: 'DEPARTMENTS', to: 'EMPLOYEES', label: '1 : N [One department has many employees]' },
        { from: 'EMPLOYEES', to: 'PAYROLL_RUNS', label: '1 : N [One employee receives 24 paychecks every year]' }
      ]
    },

    'Platforms': {
      domain: 'Platforms',
      icon: '🚗',
      title: 'Two-Sided Marketplace & Gig Platform',
      overview: 'How Uber & Airbnb connect worlds: Drivers & Riders register Profiles, Riders book Trips, and platform settles Payouts.',
      tables: [
        {
          name: 'PLATFORM_USERS',
          caption: 'Drivers & Riders',
          icon: '🧑‍🤝‍🧑',
          desc: 'Registered drivers, couriers, and passengers with rating scores.',
          columns: [
            { name: 'user_id', type: 'VARCHAR(32)', isPk: true, desc: 'Marketplace Profile ID' },
            { name: 'role', type: 'VARCHAR(16)', isPk: false, desc: 'DRIVER or RIDER' },
            { name: 'rating_score', type: 'DECIMAL(3,2)', isPk: false, desc: 'Average Star Rating (e.g. 4.95)' }
          ]
        },
        {
          name: 'TRIPS',
          caption: 'Rides & Deliveries',
          icon: '🚘',
          desc: 'A passenger ride hailing route from pickup point to dropoff.',
          columns: [
            { name: 'trip_id', type: 'VARCHAR(32)', isPk: true, desc: 'Trip UUID' },
            { name: 'rider_id', type: 'VARCHAR(32)', isFk: true, ref: 'PLATFORM_USERS.user_id', desc: 'FK [Passenger who hailed the ride]' },
            { name: 'driver_id', type: 'VARCHAR(32)', isFk: true, ref: 'PLATFORM_USERS.user_id', desc: 'FK [Driver who accepted the fare]' },
            { name: 'fare_usd', type: 'DECIMAL(8,2)', isPk: false, desc: 'Fare Charged ($)' },
            { name: 'distance_miles', type: 'DECIMAL(6,2)', isPk: false, desc: 'Trip Route Length' }
          ]
        }
      ],
      relationships: [
        { from: 'PLATFORM_USERS', to: 'TRIPS', label: '1 : N [Riders book many trips; Drivers fulfill many fares]' }
      ]
    }
  };

  // Helper to parse a raw DDL schema string like "CardAuthProfiles (card_id VARCHAR(32) PRIMARY KEY, ...)"
  function parseSchemaSnippet(rawSnippet) {
    if (!rawSnippet) return { tableName: 'TABLE', columns: [] };
    
    // Extract table name before '('
    const match = rawSnippet.match(/^([a-zA-Z0-9_]+)\s*\((.*)\)$/);
    if (!match) {
      return { tableName: rawSnippet.split(' ')[0] || 'TABLE', columns: [] };
    }

    const tableName = match[1];
    const colsPart = match[2];
    
    // Parse comma-separated column definitions
    const cols = [];
    // Split by commas not inside parentheses
    const tokens = colsPart.split(/,(?![^(]*\))/);
    tokens.forEach(tok => {
      const clean = tok.trim();
      if (!clean) return;
      
      const parts = clean.split(/\s+/);
      const colName = parts[0];
      const colType = parts[1] || 'TEXT';
      const isPk = clean.toUpperCase().includes('PRIMARY KEY');
      const isFk = clean.toUpperCase().includes('FOREIGN KEY') || clean.toUpperCase().includes('REFERENCES');
      
      // Friendly meaning tag based on column name pattern
      let meaning = '';
      if (isPk) meaning = '🔑 Primary Key [Unique Row ID]';
      else if (isFk) meaning = '🔗 Foreign Key [Link to Other Table]';
      else if (colName.includes('limit')) meaning = '💰 Spending Cap';
      else if (colName.includes('frozen') || colName.includes('active') || colName.includes('delivered') || colName.includes('is_')) meaning = '❄️ Boolean Flag [1 or 0]';
      else if (colName.includes('usd') || colName.includes('amount') || colName.includes('price') || colName.includes('balance') || colName.includes('yield')) meaning = '💵 Dollar Value';
      else if (colName.includes('date') || colName.includes('at') || colName.includes('time')) meaning = '🕒 Timestamp';
      else if (colName.includes('id')) meaning = '🏷️ Identifier';
      else meaning = '📝 Column Data';

      cols.push({
        name: colName,
        type: colType,
        isPk: isPk,
        isFk: isFk,
        meaning: meaning
      });
    });

    return { tableName, columns: cols };
  }

  // Generate visual mini-ERD entity card HTML for a case study card
  function renderMiniERD(cs) {
    const parsed = parseSchemaSnippet(cs.schemaSnippet);
    const domainData = DOMAIN_SCHEMAS[cs.industry] || DOMAIN_SCHEMAS['Fintech'];
    const domainIcon = domainData.icon || '📊';

    let colsHtml = '';
    parsed.columns.forEach(col => {
      const pkClass = col.isPk ? 'erd-col-pk' : '';
      const keyBadge = col.isPk 
        ? `<span class="erd-key-badge" title="Primary Key [Unique identifier for this row]"><span class="erd-key-icon">🔑</span> PK</span>` 
        : (col.isFk ? `<span class="erd-fk-badge" title="Foreign Key [Points to another table]"><span class="erd-fk-icon">🔗</span> FK</span>` : '');

      colsHtml += `
        <div class="erd-col-pill ${pkClass}" title="${col.name}: ${col.meaning}">
          <div class="erd-col-left">
            ${keyBadge}
            <span class="erd-col-name">${col.name}</span>
          </div>
          <div class="erd-col-right">
            <span class="erd-col-type">${col.type}</span>
            <span class="erd-col-meaning-tag">${col.meaning}</span>
          </div>
        </div>
      `;
    });

    return `
      <div class="case-erd-preview">
        <div class="case-erd-header">
          <div class="case-erd-title-wrap">
            <span class="case-erd-icon">${domainIcon}</span>
            <span class="case-erd-table-name">${parsed.tableName}</span>
            <span class="case-erd-domain-badge">${cs.industry} Schema</span>
          </div>
          <button class="btn-open-domain-erd" data-domain="${escapeHtml(cs.industry)}" data-table="${escapeHtml(parsed.tableName)}" title="Open interactive visual ERD diagram with relationship arrows">
            📐 View Domain ERD Diagram
          </button>
        </div>

        <div class="case-erd-columns-list">
          ${colsHtml}
        </div>
      </div>
    `;
  }

  // Render the Full-Screen Interactive Domain ERD Diagram Modal
  function openDomainERD(domainName, highlightTable) {
    const domain = DOMAIN_SCHEMAS[domainName] || DOMAIN_SCHEMAS['Fintech'];
    const modal = document.getElementById('domainErdModal');
    const container = document.getElementById('domainErdContent');
    if (!modal || !container) return;

    // Render Tables Entity Boxes
    let tablesHtml = '';
    domain.tables.forEach(tbl => {
      const isSelected = highlightTable && tbl.name.toLowerCase() === highlightTable.toLowerCase();
      const cardClass = isSelected ? 'erd-entity-box erd-entity-selected' : 'erd-entity-box';

      let colsHtml = '';
      tbl.columns.forEach(col => {
        const pkFkBadge = col.isPk 
          ? `<span class="erd-badge-pk" title="Primary Key: Guaranteed unique for every single row">🔑 PK</span>` 
          : (col.isFk ? `<span class="erd-badge-fk" title="Foreign Key: Links to parent table ${col.ref}">🔗 FK</span>` : '');

        colsHtml += `
          <tr class="erd-row ${col.isPk ? 'erd-row-pk' : ''}">
            <td class="erd-cell-key">${pkFkBadge}</td>
            <td class="erd-cell-name"><strong>${escapeHtml(col.name)}</strong></td>
            <td class="erd-cell-type"><code>${escapeHtml(col.type)}</code></td>
            <td class="erd-cell-desc">${escapeHtml(col.desc)}</td>
          </tr>
        `;
      });

      tablesHtml += `
        <div class="${cardClass}" id="erd_entity_${tbl.name}">
          <div class="erd-entity-header">
            <div class="erd-entity-title">
              <span class="erd-table-icon">${tbl.icon || '📋'}</span>
              <span class="erd-table-title">${escapeHtml(tbl.name)}</span>
            </div>
            <span class="erd-table-caption">${escapeHtml(tbl.caption)}</span>
          </div>
          <div class="erd-entity-desc">${escapeHtml(tbl.desc)}</div>
          <table class="erd-entity-table">
            <thead>
              <tr>
                <th style="width: 45px;">Key</th>
                <th>Column Name</th>
                <th>Data Type</th>
                <th>Beginner Meaning [Plain English]</th>
              </tr>
            </thead>
            <tbody>
              ${colsHtml}
            </tbody>
          </table>
        </div>
      `;
    });

    // Render Relationship Connectors with SVG Arrows & Callouts
    let relationshipsHtml = '';
    domain.relationships.forEach((rel, idx) => {
      relationshipsHtml += `
        <div class="erd-rel-card">
          <div class="erd-rel-indicator">
            <span class="erd-rel-from">${escapeHtml(rel.from)}</span>
            <span class="erd-rel-arrow">&xrarr;</span>
            <span class="erd-rel-to">${escapeHtml(rel.to)}</span>
          </div>
          <div class="erd-rel-callout">
            <span class="erd-rel-badge">RELATIONSHIP ${idx + 1}</span>
            <span class="erd-rel-text">${escapeHtml(rel.label)}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="erd-modal-inner">
        <div class="erd-modal-header">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 24px;">${domain.icon}</span>
              <h2 style="font-size: 20px; font-weight: 700; color: #f4f4f5; margin: 0;">${escapeHtml(domain.domain)} Domain Interactive ERD Map</h2>
              <span class="status-pill" style="font-size: 11px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
                ${domain.tables.length} Production Tables
              </span>
            </div>
            <p style="font-size: 13px; color: var(--text-secondary); margin: 0; max-width: 850px; line-height: 1.5;">
              ${escapeHtml(domain.overview)}
            </p>
          </div>
          <button class="dossier-close-btn" onclick="DOMAIN_ERD_ENGINE.closeDomainERD()">&times;</button>
        </div>

        <div class="erd-domain-switcher-bar">
          <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Switch Industry:</span>
          ${Object.keys(DOMAIN_SCHEMAS).map(domKey => {
            const activeClass = domKey === domain.domain ? 'active' : '';
            return `<button class="erd-domain-btn ${activeClass}" onclick="DOMAIN_ERD_ENGINE.openDomainERD('${domKey}')">${DOMAIN_SCHEMAS[domKey].icon} ${domKey}</button>`;
          }).join('')}
        </div>

        <div class="erd-relationships-banner">
          <h4 style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #fbbf24; margin: 0 0 10px 0; display: flex; align-items: center; gap: 6px;">
            <span>📐</span> Visual Foreign Key Connections &amp; Cardinality Rules (1 : Many)
          </h4>
          <div class="erd-rel-grid">
            ${relationshipsHtml}
          </div>
        </div>

        <div class="erd-entities-grid">
          ${tablesHtml}
        </div>
      </div>
    `;

    modal.style.display = 'flex';
  }

  function closeDomainERD() {
    const modal = document.getElementById('domainErdModal');
    if (modal) modal.style.display = 'none';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  return {
    DOMAIN_SCHEMAS,
    parseSchemaSnippet,
    renderMiniERD,
    openDomainERD,
    closeDomainERD
  };

})();
