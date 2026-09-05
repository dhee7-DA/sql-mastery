// =============================================================================
// ENTERPRISE PRODUCTION SCHEMAS & INTERACTIVE ERD REPOSITORY
// 5 Canonical Multi-Table Schemas for Industry Leaders (Stripe, Shopify, Uber, etc.)
// =============================================================================

window.ENTERPRISE_ERD_DATA = {
  stripe: {
    id: "stripe",
    companyName: "Stripe",
    domain: "Fintech & Global Payments",
    icon: "💳",
    description: "Production double-entry payments processing infrastructure, merchant accounts, payment cards, and fraud chargeback disputes.",
    tables: [
      {
        name: "CUSTOMERS",
        caption: "Root Cardholder Profiles",
        description: "Verified KYC consumer and corporate client identities.",
        columns: [
          { name: "customer_id", type: "VARCHAR(32)", isPk: true, desc: "Unique Root Customer ID (e.g. 'cus_9912')" },
          { name: "full_name", type: "VARCHAR(128)", isPk: false, desc: "Legal cardholder name" },
          { name: "email", type: "VARCHAR(128)", isPk: false, desc: "Primary notification email" },
          { name: "country", type: "VARCHAR(3)", isPk: false, desc: "ISO 3166-1 alpha-3 nationality (e.g. 'USA', 'GBR')" },
          { name: "kyc_status", type: "VARCHAR(20)", isPk: false, desc: "'VERIFIED', 'PENDING', 'REJECTED'" },
          { name: "signup_date", type: "DATE", isPk: false, desc: "Onboarding timestamp" }
        ],
        sampleRows: [
          { customer_id: "cus_001", full_name: "Sarah Connor", email: "s.connor@sky.net", country: "USA", kyc_status: "VERIFIED", signup_date: "2024-01-15" },
          { customer_id: "cus_002", full_name: "Marcus Aurelius", email: "marcus@rome.org", country: "ITA", kyc_status: "VERIFIED", signup_date: "2024-03-22" },
          { customer_id: "cus_003", full_name: "Ada Lovelace", email: "ada@engine.co.uk", country: "GBR", kyc_status: "VERIFIED", signup_date: "2024-05-10" },
          { customer_id: "cus_004", full_name: "Elena Rostova", email: "elena@berlin.de", country: "DEU", kyc_status: "PENDING", signup_date: "2025-02-01" }
        ]
      },
      {
        name: "ACCOUNTS",
        caption: "Financial Balances & Ledgers",
        description: "Deposit wallets and risk-profiled settlement ledger accounts.",
        columns: [
          { name: "account_id", type: "VARCHAR(32)", isPk: true, desc: "Unique Account Identifier (e.g. 'acc_4410')" },
          { name: "customer_id", type: "VARCHAR(32)", isFk: true, references: "CUSTOMERS.customer_id", desc: "FK linking to CUSTOMERS" },
          { name: "balance_usd", type: "DECIMAL(12,2)", isPk: false, desc: "Current cleared balance" },
          { name: "risk_tier", type: "VARCHAR(16)", isPk: false, desc: "'LOW_RISK', 'MEDIUM_RISK', 'HIGH_RISK'" },
          { name: "currency", type: "VARCHAR(3)", isPk: false, desc: "Base settlement currency (e.g. 'USD', 'EUR')" },
          { name: "status", type: "VARCHAR(16)", isPk: false, desc: "'ACTIVE', 'FROZEN', 'CLOSED'" }
        ],
        sampleRows: [
          { account_id: "acc_4401", customer_id: "cus_001", balance_usd: 14500.50, risk_tier: "LOW_RISK", currency: "USD", status: "ACTIVE" },
          { account_id: "acc_4402", customer_id: "cus_002", balance_usd: 820.00, risk_tier: "LOW_RISK", currency: "EUR", status: "ACTIVE" },
          { account_id: "acc_4403", customer_id: "cus_003", balance_usd: 54300.00, risk_tier: "MEDIUM_RISK", currency: "GBP", status: "ACTIVE" },
          { account_id: "acc_4404", customer_id: "cus_004", balance_usd: 0.00, risk_tier: "HIGH_RISK", currency: "EUR", status: "FROZEN" }
        ]
      },
      {
        name: "CARDS",
        caption: "Virtual & Physical Cards",
        description: "Payment instruments issued against customer ledger accounts.",
        columns: [
          { name: "card_id", type: "VARCHAR(32)", isPk: true, desc: "Unique Tokenized Card ID (e.g. 'crd_8812')" },
          { name: "account_id", type: "VARCHAR(32)", isFk: true, references: "ACCOUNTS.account_id", desc: "FK linking to ACCOUNTS" },
          { name: "last_four", type: "VARCHAR(4)", isPk: false, desc: "Masked PCI card digits (e.g. '4242')" },
          { name: "brand", type: "VARCHAR(16)", isPk: false, desc: "'VISA', 'MASTERCARD', 'AMEX'" },
          { name: "exp_year", type: "INT", isPk: false, desc: "Expiration Year" },
          { name: "is_frozen", type: "BOOLEAN", isPk: false, desc: "Instant fraud lock toggle" }
        ],
        sampleRows: [
          { card_id: "crd_801", account_id: "acc_4401", last_four: "4242", brand: "VISA", exp_year: 2028, is_frozen: false },
          { card_id: "crd_802", account_id: "acc_4401", last_four: "8821", brand: "MASTERCARD", exp_year: 2027, is_frozen: false },
          { card_id: "crd_803", account_id: "acc_4402", last_four: "1190", brand: "VISA", exp_year: 2026, is_frozen: true },
          { card_id: "crd_804", account_id: "acc_4403", last_four: "3782", brand: "AMEX", exp_year: 2029, is_frozen: false }
        ]
      },
      {
        name: "TRANSACTIONS",
        caption: "Payment Authorization Stream",
        description: "High-velocity sub-100ms merchant authorizations and settlement charges.",
        columns: [
          { name: "tx_id", type: "VARCHAR(32)", isPk: true, desc: "Unique Transaction UUID (e.g. 'tx_7701')" },
          { name: "card_id", type: "VARCHAR(32)", isFk: true, references: "CARDS.card_id", desc: "FK linking to CARDS" },
          { name: "merchant_name", type: "VARCHAR(64)", isPk: false, desc: "Acquiring merchant terminal name" },
          { name: "merchant_category", type: "VARCHAR(32)", isPk: false, desc: "MCC Industry Tag (e.g. 'TRAVEL', 'RETAIL')" },
          { name: "amount_usd", type: "DECIMAL(10,2)", isPk: false, desc: "Settled transaction amount" },
          { name: "status", type: "VARCHAR(16)", isPk: false, desc: "'SUCCEEDED', 'PENDING', 'FAILED', 'REFUNDED'" },
          { name: "created_at", type: "TIMESTAMP", isPk: false, desc: "Atomic settlement clock" }
        ],
        sampleRows: [
          { tx_id: "tx_701", card_id: "crd_801", merchant_name: "Apple Store Online", merchant_category: "ELECTRONICS", amount_usd: 1299.00, status: "SUCCEEDED", created_at: "2026-03-01 10:14:22" },
          { tx_id: "tx_702", card_id: "crd_801", merchant_name: "Uber Trips", merchant_category: "TRANSPORT", amount_usd: 34.50, status: "SUCCEEDED", created_at: "2026-03-01 14:22:05" },
          { tx_id: "tx_703", card_id: "crd_802", merchant_name: "CryptoGateway Ltd", merchant_category: "FINANCIAL", amount_usd: 7500.00, status: "FAILED", created_at: "2026-03-02 03:45:10" },
          { tx_id: "tx_704", card_id: "crd_803", merchant_name: "Delta Air Lines", merchant_category: "TRAVEL", amount_usd: 840.00, status: "REFUNDED", created_at: "2026-03-02 18:30:00" },
          { tx_id: "tx_705", card_id: "crd_804", merchant_name: "Whole Foods Market", merchant_category: "GROCERY", amount_usd: 142.80, status: "SUCCEEDED", created_at: "2026-03-03 11:05:44" }
        ]
      },
      {
        name: "DISPUTES",
        caption: "Chargeback & Fraud Claims",
        description: "Regulatory chargeback files submitted for card-not-present unauthorized activity.",
        columns: [
          { name: "dispute_id", type: "VARCHAR(32)", isPk: true, desc: "Unique Dispute Case File ID" },
          { name: "tx_id", type: "VARCHAR(32)", isFk: true, references: "TRANSACTIONS.tx_id", desc: "FK linking to TRANSACTIONS" },
          { name: "reason_code", type: "VARCHAR(32)", isPk: false, desc: "'FRAUD_UNAUTHORIZED', 'PRODUCT_NOT_RECEIVED'" },
          { name: "dispute_amount_usd", type: "DECIMAL(10,2)", isPk: false, desc: "Amount under dispute liability" },
          { name: "resolution_status", type: "VARCHAR(20)", isPk: false, desc: "'UNDER_REVIEW', 'WON_MERCHANT', 'LOST_REFUNDED'" }
        ],
        sampleRows: [
          { dispute_id: "dsp_001", tx_id: "tx_703", reason_code: "FRAUD_UNAUTHORIZED", dispute_amount_usd: 7500.00, resolution_status: "UNDER_REVIEW" },
          { dispute_id: "dsp_002", tx_id: "tx_704", reason_code: "PRODUCT_NOT_RECEIVED", dispute_amount_usd: 840.00, resolution_status: "WON_MERCHANT" }
        ]
      }
    ],
    relationships: [
      { fromTable: "CUSTOMERS", fromCol: "customer_id", toTable: "ACCOUNTS", toCol: "customer_id", type: "1:N", label: "1 Customer owns 0..N Accounts" },
      { fromTable: "ACCOUNTS", fromCol: "account_id", toTable: "CARDS", toCol: "account_id", type: "1:N", label: "1 Account issues 0..N Cards" },
      { fromTable: "CARDS", fromCol: "card_id", toTable: "TRANSACTIONS", toCol: "card_id", type: "1:N", label: "1 Card performs 0..N Transactions" },
      { fromTable: "TRANSACTIONS", fromCol: "tx_id", toTable: "DISPUTES", toCol: "tx_id", type: "1:1", label: "1 Transaction has 0..1 Dispute" }
    ]
  },

  shopify: {
    id: "shopify",
    companyName: "Shopify",
    domain: "E-Commerce & Merchant Marketplace",
    icon: "🛒",
    description: "Storefront catalog, customer checkout orders, physical warehouse SKU inventory, and carrier delivery fulfillments.",
    tables: [
      {
        name: "CUSTOMERS",
        caption: "Shopper Accounts",
        description: "Registered buyers across global merchant storefronts.",
        columns: [
          { name: "customer_id", type: "INT", isPk: true, desc: "Buyer ID" },
          { name: "email", type: "VARCHAR(128)", isPk: false, desc: "Customer email address" },
          { name: "city", type: "VARCHAR(64)", isPk: false, desc: "Shipping city" },
          { name: "loyalty_tier", type: "VARCHAR(20)", isPk: false, desc: "'BRONZE', 'SILVER', 'GOLD', 'VIP'" },
          { name: "total_orders_count", type: "INT", isPk: false, desc: "Lifetime order count" }
        ],
        sampleRows: [
          { customer_id: 101, email: "jordan@gmail.com", city: "New York", loyalty_tier: "VIP", total_orders_count: 24 },
          { customer_id: 102, email: "chloe@yahoo.com", city: "Austin", loyalty_tier: "SILVER", total_orders_count: 5 },
          { customer_id: 103, email: "raj@tech.in", city: "Seattle", loyalty_tier: "GOLD", total_orders_count: 14 }
        ]
      },
      {
        name: "PRODUCTS",
        caption: "SKU Catalog & Inventory",
        description: "Merchant product catalog with pricing and physical inventory counters.",
        columns: [
          { name: "product_id", type: "INT", isPk: true, desc: "Unique SKU identifier" },
          { name: "title", type: "VARCHAR(128)", isPk: false, desc: "Item display name" },
          { name: "category", type: "VARCHAR(64)", isPk: false, desc: "'Apparel', 'Footwear', 'Electronics'" },
          { name: "unit_price_usd", type: "DECIMAL(8,2)", isPk: false, desc: "Base retail price" },
          { name: "stock_quantity", type: "INT", isPk: false, desc: "Available warehouse units" }
        ],
        sampleRows: [
          { product_id: 5001, title: "Merino Wool Thermal Hoodie", category: "Apparel", unit_price_usd: 120.00, stock_quantity: 45 },
          { product_id: 5002, title: "Carbon Fiber Running Shoes", category: "Footwear", unit_price_usd: 185.00, stock_quantity: 12 },
          { product_id: 5003, title: "Wireless Noise-Cancelling Earbuds", category: "Electronics", unit_price_usd: 79.99, stock_quantity: 0 }
        ]
      },
      {
        name: "ORDERS",
        caption: "Checkout Invoices",
        description: "Customer checkout transactions with payment statuses.",
        columns: [
          { name: "order_id", type: "BIGINT", isPk: true, desc: "Unique Checkout Order ID" },
          { name: "customer_id", type: "INT", isFk: true, references: "CUSTOMERS.customer_id", desc: "FK linking to CUSTOMERS" },
          { name: "order_total_usd", type: "DECIMAL(10,2)", isPk: false, desc: "Total gross amount paid" },
          { name: "order_status", type: "VARCHAR(20)", isPk: false, desc: "'PAID', 'PENDING', 'CANCELLED', 'REFUNDED'" },
          { name: "placed_at", type: "TIMESTAMP", isPk: false, desc: "Order confirmation time" }
        ],
        sampleRows: [
          { order_id: 9901, customer_id: 101, order_total_usd: 240.00, order_status: "PAID", placed_at: "2026-03-01 09:20:00" },
          { order_id: 9902, customer_id: 102, order_total_usd: 79.99, order_status: "PAID", placed_at: "2026-03-01 11:15:30" },
          { order_id: 9903, customer_id: 103, order_total_usd: 370.00, order_status: "CANCELLED", placed_at: "2026-03-02 16:40:12" }
        ]
      },
      {
        name: "ORDER_ITEMS",
        caption: "Line-Item Basket Details",
        description: "Individual item lines within an order linking to specific products.",
        columns: [
          { name: "line_id", type: "BIGINT", isPk: true, desc: "Unique Line Item ID" },
          { name: "order_id", type: "BIGINT", isFk: true, references: "ORDERS.order_id", desc: "FK linking to ORDERS" },
          { name: "product_id", type: "INT", isFk: true, references: "PRODUCTS.product_id", desc: "FK linking to PRODUCTS" },
          { name: "quantity", type: "INT", isPk: false, desc: "Units purchased" },
          { name: "unit_price_at_checkout", type: "DECIMAL(8,2)", isPk: false, desc: "Historical price captured at sale" }
        ],
        sampleRows: [
          { line_id: 1, order_id: 9901, product_id: 5001, quantity: 2, unit_price_at_checkout: 120.00 },
          { line_id: 2, order_id: 9902, product_id: 5003, quantity: 1, unit_price_at_checkout: 79.99 },
          { line_id: 3, order_id: 9903, product_id: 5002, quantity: 2, unit_price_at_checkout: 185.00 }
        ]
      },
      {
        name: "SHIPMENTS",
        caption: "Fulfillment & Tracking",
        description: "Carrier dispatch logistics and delivery state tracking.",
        columns: [
          { name: "shipment_id", type: "VARCHAR(32)", isPk: true, desc: "Package Tracking Number" },
          { name: "order_id", type: "BIGINT", isFk: true, references: "ORDERS.order_id", desc: "FK linking to ORDERS" },
          { name: "carrier_name", type: "VARCHAR(32)", isPk: false, desc: "'UPS', 'FedEx', 'DHL', 'USPS'" },
          { name: "delivery_status", type: "VARCHAR(20)", isPk: false, desc: "'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'" }
        ],
        sampleRows: [
          { shipment_id: "1Z999AA10123", order_id: 9901, carrier_name: "UPS", delivery_status: "DELIVERED" },
          { shipment_id: "940010002022", order_id: 9902, carrier_name: "USPS", delivery_status: "OUT_FOR_DELIVERY" }
        ]
      }
    ],
    relationships: [
      { fromTable: "CUSTOMERS", fromCol: "customer_id", toTable: "ORDERS", toCol: "customer_id", type: "1:N", label: "1 Customer places 0..N Orders" },
      { fromTable: "ORDERS", fromCol: "order_id", toTable: "ORDER_ITEMS", toCol: "order_id", type: "1:N", label: "1 Order contains 1..N Items" },
      { fromTable: "PRODUCTS", fromCol: "product_id", toTable: "ORDER_ITEMS", toCol: "product_id", type: "1:N", label: "1 Product appears in 0..N Lines" },
      { fromTable: "ORDERS", fromCol: "order_id", toTable: "SHIPMENTS", toCol: "order_id", type: "1:1", label: "1 Order has 0..1 Shipment" }
    ]
  },

  uber: {
    id: "uber",
    companyName: "Uber",
    domain: "Mobility & On-Demand Dispatch",
    icon: "🚗",
    description: "Real-time rider ride requests, driver dispatch matchmaking, dynamic surge pricing hex-bins, and trip telematics.",
    tables: [
      {
        name: "RIDERS",
        caption: "Passenger Accounts",
        description: "Registered passengers requesting transport services.",
        columns: [
          { name: "rider_id", type: "VARCHAR(32)", isPk: true, desc: "Unique Rider UUID" },
          { name: "rating", type: "DECIMAL(3,2)", isPk: false, desc: "Average passenger feedback rating" },
          { name: "default_payment_profile", type: "VARCHAR(32)", isPk: false, desc: "Stored card token" }
        ],
        sampleRows: [
          { rider_id: "r_501", rating: 4.92, default_payment_profile: "pay_apple_01" },
          { rider_id: "r_502", rating: 4.75, default_payment_profile: "pay_visa_99" }
        ]
      },
      {
        name: "DRIVERS",
        caption: "Vehicle Operators",
        description: "Background-checked driver partners and active status.",
        columns: [
          { name: "driver_id", type: "VARCHAR(32)", isPk: true, desc: "Unique Driver UUID" },
          { name: "vehicle_model", type: "VARCHAR(64)", isPk: false, desc: "Car make & model" },
          { name: "driver_rating", type: "DECIMAL(3,2)", isPk: false, desc: "Average customer rating" },
          { name: "is_online", type: "BOOLEAN", isPk: false, desc: "Active shift availability toggle" }
        ],
        sampleRows: [
          { driver_id: "d_101", vehicle_model: "Toyota Camry Hybrid", driver_rating: 4.96, is_online: true },
          { driver_id: "d_102", vehicle_model: "Tesla Model 3", driver_rating: 4.98, is_online: true }
        ]
      },
      {
        name: "SURGE_ZONES",
        caption: "Dynamic Pricing Grids",
        description: "Spatial geohash hex clusters calculating real-time pricing multipliers.",
        columns: [
          { name: "geohash_id", type: "VARCHAR(12)", isPk: true, desc: "H3 spatial hex identifier" },
          { name: "city_name", type: "VARCHAR(32)", isPk: false, desc: "Metro area" },
          { name: "surge_multiplier", type: "DECIMAL(3,2)", isPk: false, desc: "Fare multiplier (1.0x to 3.5x)" },
          { name: "is_active", type: "BOOLEAN", isPk: false, desc: "Active surge state" }
        ],
        sampleRows: [
          { geohash_id: "8828308281ff", city_name: "San Francisco", surge_multiplier: 1.75, is_active: true },
          { geohash_id: "8828308283ff", city_name: "San Francisco", surge_multiplier: 1.00, is_active: false }
        ]
      },
      {
        name: "TRIPS",
        caption: "Completed & Active Rides",
        description: "Individual passenger trips with fare calculations and driver pairings.",
        columns: [
          { name: "trip_id", type: "BIGINT", isPk: true, desc: "Unique Trip Identifier" },
          { name: "rider_id", type: "VARCHAR(32)", isFk: true, references: "RIDERS.rider_id", desc: "FK linking to RIDERS" },
          { name: "driver_id", type: "VARCHAR(32)", isFk: true, references: "DRIVERS.driver_id", desc: "FK linking to DRIVERS" },
          { name: "fare_usd", type: "DECIMAL(8,2)", isPk: false, desc: "Total customer ride fare" },
          { name: "distance_miles", type: "DECIMAL(5,2)", isPk: false, desc: "Route mileage" },
          { name: "status", type: "VARCHAR(20)", isPk: false, desc: "'COMPLETED', 'CANCELLED_BY_RIDER', 'IN_PROGRESS'" }
        ],
        sampleRows: [
          { trip_id: 8801, rider_id: "r_501", driver_id: "d_101", fare_usd: 24.50, distance_miles: 4.80, status: "COMPLETED" },
          { trip_id: 8802, rider_id: "r_502", driver_id: "d_102", fare_usd: 48.00, distance_miles: 12.30, status: "COMPLETED" }
        ]
      },
      {
        name: "TRIP_RATINGS",
        caption: "Post-Trip Quality Feedback",
        description: "Passenger feedback, driver reviews, and tip amounts.",
        columns: [
          { name: "rating_id", type: "BIGINT", isPk: true, desc: "Rating Event ID" },
          { name: "trip_id", type: "BIGINT", isFk: true, references: "TRIPS.trip_id", desc: "FK linking to TRIPS" },
          { name: "stars", type: "INT", isPk: false, desc: "1 to 5 star rating" },
          { name: "tip_usd", type: "DECIMAL(6,2)", isPk: false, desc: "Optional passenger driver gratuity" }
        ],
        sampleRows: [
          { rating_id: 1, trip_id: 8801, stars: 5, tip_usd: 5.00 },
          { rating_id: 2, trip_id: 8802, stars: 5, tip_usd: 8.00 }
        ]
      }
    ],
    relationships: [
      { fromTable: "RIDERS", fromCol: "rider_id", toTable: "TRIPS", toCol: "rider_id", type: "1:N", label: "1 Rider books 0..N Trips" },
      { fromTable: "DRIVERS", fromCol: "driver_id", toTable: "TRIPS", toCol: "driver_id", type: "1:N", label: "1 Driver completes 0..N Trips" },
      { fromTable: "TRIPS", fromCol: "trip_id", toTable: "TRIP_RATINGS", toCol: "trip_id", type: "1:1", label: "1 Trip yields 0..1 Rating" }
    ]
  }
};
