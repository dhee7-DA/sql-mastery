const fs = require('fs');
const path = require('path');

// =============================================================================
// SCRIPT: GENERATE 390 RELATIONAL JOINS CASE STUDIES FOR FA / DA / BA
// Cases #651 through #1040 (Bringing Master Vault to 1,040 Cases)
// Distribution:
// - 120 INNER JOIN (40 Easy, 40 Medium, 40 Hard)
// - 120 LEFT JOIN (40 Easy, 40 Medium, 40 Hard)
// - 30 LEFT ANTI-JOIN (10 Easy, 10 Medium, 10 Hard)
// - 30 FULL OUTER JOIN (10 Easy, 10 Medium, 10 Hard)
// - 30 SELF JOIN (10 Easy, 10 Medium, 10 Hard)
// - 30 CROSS JOIN (10 Easy, 10 Medium, 10 Hard)
// - 30 NON-EQUI JOIN (10 Easy, 10 Medium, 10 Hard)
// =============================================================================

console.log("Generating 390 Corporate Relational Joins Cases (IDs 651-1040)...");

const industries = ["Fintech", "SaaS", "Retail", "Healthcare", "Logistics", "Media", "Security", "Hardware", "HR", "Platforms"];

const cases = [];
let currentId = 651;

// Helper to construct clean case object
function createCase(config) {
  const caseObj = {
    id: currentId++,
    title: config.title,
    section: "Section 8: Relational Joins & Financial Data Modeling",
    industry: config.industry,
    difficulty: config.difficulty,
    scenario: config.scenario,
    businessObjective: config.businessObjective,
    schemaSnippet: config.schemaSnippet,
    targetQuery: config.targetQuery,
    table: config.table || "PrimaryTable",
    eli5Story: config.eli5Story || `Imagine two Excel spreadsheets on your desk. SQL looks at both sheets, connects matching rows based on ${config.title}, and projects clean reconciled reporting metrics.`,
    commonMistakes: config.commonMistakes || "Forgetting that NULL keys never match in equality joins; placing right-table filter predicates in the WHERE clause instead of the ON clause (turning a LEFT JOIN into an INNER JOIN).",
    learningOutcomes: config.learningOutcomes || "Master multi-table relational join mechanics, zero-preservation with COALESCE, and domain-accurate financial reporting structures."
  };
  cases.push(caseObj);
}

// -----------------------------------------------------------------------------
// 1. INNER JOIN (120 Cases: 40 Easy, 40 Medium, 40 Hard)
// -----------------------------------------------------------------------------
const innerJoinSpecs = [
  // 40 EASY INNER JOINS
  { ind: "Fintech", diff: "Easy", topic: "Settled Card Swipes to Customer Account Profiles", left: "CardSwipes", right: "CustomerAccounts", k: "account_id" },
  { ind: "Fintech", diff: "Easy", topic: "Merchant Payout Batches to Bank Routing Directory", left: "PayoutBatches", right: "BankDirectory", k: "routing_number" },
  { ind: "Fintech", diff: "Easy", topic: "Wire Transfer Ledger to Beneficiary Verification Records", left: "WireTransfers", right: "BeneficiaryWhitelist", k: "beneficiary_id" },
  { ind: "Fintech", diff: "Easy", topic: "Broker Trading Orders to Exchange Execution Gateway", left: "TradeOrders", right: "ExchangeGateways", k: "exchange_id" },
  { ind: "SaaS", diff: "Easy", topic: "Subscription Invoices to Account Master Records", left: "Invoices", right: "Accounts", k: "account_id" },
  { ind: "SaaS", diff: "Easy", topic: "Active User Licenses to Workspaces", left: "UserLicenses", right: "Workspaces", k: "workspace_id" },
  { ind: "SaaS", diff: "Easy", topic: "Cloud API Metered Usage to Tenant Pricing Plans", left: "ApiUsageLogs", right: "PricingPlans", k: "plan_id" },
  { ind: "SaaS", diff: "Easy", topic: "Support SLA Tickets to Customer Contract Tiers", left: "SupportTickets", right: "ContractTiers", k: "contract_id" },
  { ind: "Retail", diff: "Easy", topic: "E-Commerce Order Line Items to Product Master Catalog", left: "OrderItems", right: "ProductCatalog", k: "sku" },
  { ind: "Retail", diff: "Easy", topic: "Warehouse Inventory Counts to Supplier Master", left: "InventoryStock", right: "Suppliers", k: "supplier_id" },
  { ind: "Retail", diff: "Easy", topic: "Store Cash Register Batches to Cashier Profiles", left: "RegisterBatches", right: "CashierRoster", k: "cashier_id" },
  { ind: "Retail", diff: "Easy", topic: "Customer Product Reviews to Verified Purchase Receipts", left: "ProductReviews", right: "ReceiptRecords", k: "receipt_id" },
  { ind: "Healthcare", diff: "Easy", topic: "Patient Hospital Encounters to Attending Physician Registry", left: "Encounters", right: "Physicians", k: "doctor_id" },
  { ind: "Healthcare", diff: "Easy", topic: "Prescription Dispensations to Pharmacy Master Index", left: "Dispensations", right: "Medications", k: "ndc_code" },
  { ind: "Healthcare", diff: "Easy", topic: "Insurance Claim Filings to Policyholder Master", left: "InsuranceClaims", right: "Policyholders", k: "policy_id" },
  { ind: "Healthcare", diff: "Easy", topic: "Inpatient Bed Allocations to Hospital Ward Directory", left: "BedAllocations", right: "HospitalWards", k: "ward_id" },
  { ind: "Logistics", diff: "Easy", topic: "Freight Shipments to 3PL Carrier Contracts", left: "FreightShipments", right: "CarrierContracts", k: "carrier_id" },
  { ind: "Logistics", diff: "Easy", topic: "Delivery Route Stops to GPS Depot Hubs", left: "RouteStops", right: "DepotHubs", k: "hub_id" },
  { ind: "Logistics", diff: "Easy", topic: "Warehouse Pick Lists to Bin Storage Locations", left: "PickLists", right: "BinLocations", k: "bin_id" },
  { ind: "Logistics", diff: "Easy", topic: "Fleet Truck Fuel Card Swipes to Vehicle Master", left: "FuelSwipes", right: "VehicleFleet", k: "vehicle_id" },
  { ind: "Media", diff: "Easy", topic: "Streaming Video Plays to Content Royalty Catalog", left: "StreamPlays", right: "ContentCatalog", k: "content_id" },
  { ind: "Media", diff: "Easy", topic: "Digital Ad Impressions to Advertiser Campaigns", left: "AdImpressions", right: "AdCampaigns", k: "campaign_id" },
  { ind: "Media", diff: "Easy", topic: "Subscriber Paywall Unlocks to Publication Outlets", left: "PaywallUnlocks", right: "Publications", k: "outlet_id" },
  { ind: "Media", diff: "Easy", topic: "Podcast Sponsorship Spots to Sponsor Contracts", left: "SponsorSpots", right: "SponsorContracts", k: "contract_id" },
  { ind: "Security", diff: "Easy", topic: "Firewall Block Events to Threat Intelligence Feeds", left: "BlockEvents", right: "ThreatIndicators", k: "ip_address" },
  { ind: "Security", diff: "Easy", topic: "IAM Single Sign-On Authentications to Active Directory", left: "SsoLogs", right: "UserDirectory", k: "user_guid" },
  { ind: "Security", diff: "Easy", topic: "Vulnerability Scan CVE Alerts to Server Inventory", left: "VulnerabilityAlerts", right: "ServerAssets", k: "asset_tag" },
  { ind: "Security", diff: "Easy", topic: "Security Badge Gate Swipes to Employee Facility Profiles", left: "BadgeSwipes", right: "FacilityBadges", k: "badge_id" },
  { ind: "Hardware", diff: "Easy", topic: "Assembly Line Work Orders to Factory Stations", left: "WorkOrders", right: "FactoryStations", k: "station_id" },
  { ind: "Hardware", diff: "Easy", topic: "Component Quality Defect Logs to Vendor Lots", left: "DefectLogs", right: "VendorLots", k: "lot_number" },
  { ind: "Hardware", diff: "Easy", topic: "Finished Device Serial Numbers to Warranty Coverage", left: "DeviceSerials", right: "WarrantyPlans", k: "serial_no" },
  { ind: "Hardware", diff: "Easy", topic: "Semiconductor Wafer Runs to Cleanroom Fabrication Tools", left: "WaferRuns", right: "FabTools", k: "tool_id" },
  { ind: "HR", diff: "Easy", topic: "Employee Payroll Disbursements to Department Cost Centers", left: "PayrollLedger", right: "CostCenters", k: "cost_center_id" },
  { ind: "HR", diff: "Easy", topic: "Health Benefit Deductions to Insurance Plan Master", left: "BenefitDeductions", right: "BenefitPlans", k: "plan_id" },
  { ind: "HR", diff: "Easy", topic: "Quarterly Performance Ratings to Job Level Bands", left: "PerformanceReviews", right: "SalaryBands", k: "job_level" },
  { ind: "HR", diff: "Easy", topic: "Corporate Expense Reimbursals to Bank Direct Deposit Vault", left: "ExpenseClaims", right: "DirectDepositAccounts", k: "employee_id" },
  { ind: "Platforms", diff: "Easy", topic: "Ride-Share Passenger Trips to Driver Payout Vault", left: "RideTrips", right: "DriverProfiles", k: "driver_id" },
  { ind: "Platforms", diff: "Easy", topic: "Marketplace Buyer Orders to Seller Merchant Accounts", left: "MarketplaceOrders", right: "MerchantAccounts", k: "seller_id" },
  { ind: "Platforms", diff: "Easy", topic: "Food Delivery Orders to Restaurant Kitchen Directory", left: "DeliveryOrders", right: "RestaurantKitchens", k: "restaurant_id" },
  { ind: "Platforms", diff: "Easy", topic: "Developer App Store Purchases to Developer Escrow Wallets", left: "AppPurchases", right: "DeveloperWallets", k: "developer_id" }
];

innerJoinSpecs.forEach(spec => {
  createCase({
    title: spec.topic,
    industry: spec.ind,
    difficulty: spec.diff,
    table: spec.left,
    scenario: `Connecting daily ${spec.topic.toLowerCase()} on common key ${spec.k} to prepare audit reports.`,
    businessObjective: `Perform an exact INNER JOIN between ${spec.left} and ${spec.right} on ${spec.k} to project matched operational records.`,
    schemaSnippet: `\`${spec.left} (record_id VARCHAR(32) PRIMARY KEY, ${spec.k} VARCHAR(32), amount_usd DECIMAL(12,2), created_at DATE)\` & \`${spec.right} (${spec.k} VARCHAR(32) PRIMARY KEY, entity_name VARCHAR(64), status VARCHAR(20))\``,
    targetQuery: `SELECT a.record_id, a.${spec.k}, b.entity_name, a.amount_usd, a.created_at\nFROM ${spec.left} a\nINNER JOIN ${spec.right} b\n  ON a.${spec.k} = b.${spec.k}\nWHERE b.status = 'ACTIVE'\nORDER BY a.created_at DESC;`,
    eli5Story: `Think of linking sales receipts (${spec.left}) with the official customer list (${spec.right}). Only receipts that match an active customer on file make it to the report.`,
    commonMistakes: `Omitting the ON predicate or forgetting that records with unmatched ${spec.k} are dropped entirely from an INNER JOIN.`,
    learningOutcomes: `Master foreign key intersection matching and basic predicate filtering after joining.`
  });
});

// 40 MEDIUM INNER JOINS (Aggregations & Compound Math)
for (let i = 1; i <= 40; i++) {
  const ind = industries[(i - 1) % industries.length];
  createCase({
    title: `${ind} Compound Revenue & Margin Reconciliation Suite #${i}`,
    industry: ind,
    difficulty: "Medium",
    table: `Transactions_${ind}`,
    scenario: `Aggregating gross revenue, COGS, and net gross margin per cost category by joining operational line items to product cost masters.`,
    businessObjective: `Join line item charges with unit cost masters, aggregate total volume and net margins grouped by reporting category, and filter with HAVING.`,
    schemaSnippet: `\`Transactions_${ind} (tx_id VARCHAR(32) PRIMARY KEY, category_id VARCHAR(32), item_units INT, revenue_usd DECIMAL(12,2))\` & \`CostMaster_${ind} (category_id VARCHAR(32) PRIMARY KEY, category_name VARCHAR(64), unit_cost DECIMAL(10,2))\``,
    targetQuery: `SELECT b.category_name,\n       SUM(a.item_units) AS total_units_sold,\n       SUM(a.revenue_usd) AS gross_revenue_usd,\n       ROUND(SUM(a.item_units * b.unit_cost), 2) AS total_cogs_usd,\n       ROUND(SUM(a.revenue_usd) - SUM(a.item_units * b.unit_cost), 2) AS gross_profit_usd\nFROM Transactions_${ind} a\nINNER JOIN CostMaster_${ind} b\n  ON a.category_id = b.category_id\nGROUP BY b.category_name\nHAVING SUM(a.revenue_usd) > 50000.00\nORDER BY gross_profit_usd DESC;`,
    eli5Story: `You have sales records on one sheet and product manufacturing costs on another. You join them together, multiply units by cost to get COGS, subtract from revenue to get gross profit, and group by category.`,
    commonMistakes: `Performing arithmetic after aggregation without wrapping individual column metrics in SUM(); forgetting to group by all non-aggregated SELECT columns.`,
    learningOutcomes: `Combine INNER JOIN with multi-column aggregations, derived gross profit calculations, and HAVING filters.`
  });
}

// 40 HARD INNER JOINS (Multi-Table 3-Way Joins & DATEDIFF Slippage)
for (let i = 1; i <= 40; i++) {
  const ind = industries[(i - 1) % industries.length];
  createCase({
    title: `${ind} Tri-Table Enterprise Audit & SLA Slippage Schedule #${i}`,
    industry: ind,
    difficulty: "Hard",
    table: `Dispatches_${ind}`,
    scenario: `Joining dispatches across carrier contracts and delivery checkpoints to measure SLA breach rates and basis points cost penalties.`,
    businessObjective: `Perform a 3-table INNER JOIN linking dispatches to carrier service terms and audit checkpoints to calculate penalty adjustments.`,
    schemaSnippet: `\`Dispatches_${ind} (dispatch_id VARCHAR(32) PRIMARY KEY, carrier_id VARCHAR(32), checkpoint_id VARCHAR(32), agreed_days INT, dispatch_date DATE)\` & \`Carriers_${ind} (carrier_id VARCHAR(32) PRIMARY KEY, carrier_name VARCHAR(64), penalty_rate_bps INT)\` & \`Checkpoints_${ind} (checkpoint_id VARCHAR(32) PRIMARY KEY, delivery_date DATE, delivery_status VARCHAR(20))\``,
    targetQuery: `SELECT d.dispatch_id, c.carrier_name,\n       d.agreed_days,\n       DATEDIFF(k.delivery_date, d.dispatch_date) AS actual_transit_days,\n       DATEDIFF(k.delivery_date, d.dispatch_date) - d.agreed_days AS days_delayed,\n       CASE\n         WHEN DATEDIFF(k.delivery_date, d.dispatch_date) > d.agreed_days THEN 'SLA_BREACH'\n         ELSE 'ON_TIME'\n       END AS compliance_status\nFROM Dispatches_${ind} d\nINNER JOIN Carriers_${ind} c\n  ON d.carrier_id = c.carrier_id\nINNER JOIN Checkpoints_${ind} k\n  ON d.checkpoint_id = k.checkpoint_id\nWHERE k.delivery_status = 'DELIVERED'\nORDER BY days_delayed DESC;`,
    eli5Story: `Connecting three sheets together: the dispatch manifest, the carrier rate contract, and the final delivery receipt. You calculate transit days, compare against agreed SLA, and flag breaches.`,
    commonMistakes: `Mixing up join conditions across 3 tables causing unintended Cartesian partial cross products; incorrect DATEDIFF argument ordering.`,
    learningOutcomes: `Master 3-table multi-join execution chaining and compound date math evaluation.`
  });
}

// -----------------------------------------------------------------------------
// 2. LEFT JOIN (120 Cases: 40 Easy, 40 Medium, 40 Hard)
// -----------------------------------------------------------------------------
// 40 EASY LEFT JOINS (Preserving 100% of driving table)
for (let i = 1; i <= 40; i++) {
  const ind = industries[(i - 1) % industries.length];
  createCase({
    title: `${ind} Driving Table Retention & Unassigned Master Check #${i}`,
    industry: ind,
    difficulty: "Easy",
    table: `MasterAccounts_${ind}`,
    scenario: `Ensuring 100% of accounts appear on the executive roster even if they have zero associated billing transactions.`,
    businessObjective: `Use LEFT JOIN to retain all master accounts, displaying unassigned accounts cleanly.`,
    schemaSnippet: `\`MasterAccounts_${ind} (account_id VARCHAR(32) PRIMARY KEY, account_name VARCHAR(64), tier VARCHAR(16))\` & \`ActivityLogs_${ind} (log_id VARCHAR(32) PRIMARY KEY, account_id VARCHAR(32), log_event VARCHAR(32))\``,
    targetQuery: `SELECT m.account_id, m.account_name, m.tier, a.log_event\nFROM MasterAccounts_${ind} m\nLEFT JOIN ActivityLogs_${ind} a\n  ON m.account_id = a.account_id\nORDER BY m.account_id ASC;`,
    eli5Story: `We start with the master customer directory and attach activity logs. If an account never did anything, they stay on the sheet with blank activity columns.`,
    commonMistakes: `Using an INNER JOIN by mistake which secretly drops newly onboarded or silent accounts.`,
    learningOutcomes: `Grasp left driving table preservation and NULL column padding.`
  });
}

// 40 MEDIUM LEFT JOINS (Budget vs Actuals with COALESCE Zero-Preservation)
for (let i = 1; i <= 40; i++) {
  const ind = industries[(i - 1) % industries.length];
  createCase({
    title: `${ind} Budget vs. Actual Spend Variance (COALESCE Zero-Preservation) #${i}`,
    industry: ind,
    difficulty: "Medium",
    table: `BudgetAllocations_${ind}`,
    scenario: `Calculating department budget variances where departments with $0 actual spend must remain visible with $0 rather than vanishing.`,
    businessObjective: `Join budget lines to actual expenses, applying COALESCE to actual spend to compute true variance.`,
    schemaSnippet: `\`BudgetAllocations_${ind} (dept_id VARCHAR(32) PRIMARY KEY, dept_name VARCHAR(64), allocated_usd DECIMAL(12,2))\` & \`ActualSpend_${ind} (dept_id VARCHAR(32), actual_usd DECIMAL(12,2))\``,
    targetQuery: `SELECT b.dept_id, b.dept_name,\n       b.allocated_usd,\n       COALESCE(SUM(s.actual_usd), 0.00) AS total_actual_spend,\n       b.allocated_usd - COALESCE(SUM(s.actual_usd), 0.00) AS remaining_budget,\n       CASE\n         WHEN COALESCE(SUM(s.actual_usd), 0.00) > b.allocated_usd THEN 'OVER_BUDGET'\n         WHEN COALESCE(SUM(s.actual_usd), 0.00) = 0.00 THEN 'ZERO_SPEND'\n         ELSE 'WITHIN_BUDGET'\n       END AS variance_audit_tag\nFROM BudgetAllocations_${ind} b\nLEFT JOIN ActualSpend_${ind} s\n  ON b.dept_id = s.dept_id\nGROUP BY b.dept_id, b.dept_name, b.allocated_usd\nORDER BY remaining_budget ASC;`,
    eli5Story: `If R&D was given $200k but spent $0, an INNER JOIN drops them entirely! A LEFT JOIN with COALESCE keeps R&D on the board and displays $0 spend and $200k remaining budget.`,
    commonMistakes: `Subtracting NULL directly from allocated budget: 'allocated - NULL' evaluates to NULL in SQL! You must wrap the right side in COALESCE(..., 0).`,
    learningOutcomes: `Master zero-preservation with COALESCE and conditional variance classification.`
  });
}

// 40 HARD LEFT JOINS (Pre-Aggregated Right Subquery to Prevent Row Explosion)
for (let i = 1; i <= 40; i++) {
  const ind = industries[(i - 1) % industries.length];
  createCase({
    title: `${ind} AR Aging & Pre-Aggregated Receipt Reconciliation #${i}`,
    industry: ind,
    difficulty: "Hard",
    table: `Invoices_${ind}`,
    scenario: `Reconciling multi-payment receipts against corporate invoices by pre-aggregating payments in a subquery to avoid duplicate invoice rows.`,
    businessObjective: `Left join invoices to an aggregated payment summary subquery to calculate outstanding balances and AR aging buckets.`,
    schemaSnippet: `\`Invoices_${ind} (invoice_id VARCHAR(32) PRIMARY KEY, client_id VARCHAR(32), invoice_amt DECIMAL(12,2), due_date DATE)\` & \`Payments_${ind} (payment_id VARCHAR(32) PRIMARY KEY, invoice_id VARCHAR(32), amount_paid DECIMAL(12,2))\``,
    targetQuery: `SELECT inv.invoice_id, inv.client_id, inv.invoice_amt,\n       COALESCE(p.paid_sum, 0.00) AS total_paid_to_date,\n       inv.invoice_amt - COALESCE(p.paid_sum, 0.00) AS current_balance_due,\n       CASE\n         WHEN inv.invoice_amt - COALESCE(p.paid_sum, 0.00) <= 0.00 THEN 'PAID_IN_FULL'\n         WHEN DATEDIFF('2026-09-30', inv.due_date) > 90 THEN '90_PLUS_DAYS_OVERDUE'\n         WHEN DATEDIFF('2026-09-30', inv.due_date) > 30 THEN '31_TO_90_DAYS_PAST_DUE'\n         ELSE 'CURRENT'\n       END AS ar_aging_tier\nFROM Invoices_${ind} inv\nLEFT JOIN (\n  SELECT invoice_id, SUM(amount_paid) AS paid_sum\n  FROM Payments_${ind}\n  GROUP BY invoice_id\n) p ON inv.invoice_id = p.invoice_id\nWHERE inv.invoice_amt - COALESCE(p.paid_sum, 0.00) > 0.00\nORDER BY current_balance_due DESC;`,
    eli5Story: `If a client paid an invoice with 3 partial payments, a raw join would duplicate the invoice 3 times and inflate counts. Pre-summing payments in a subquery keeps 1 row per invoice.`,
    commonMistakes: `Joining directly to an unaggregated payment table and summing invoice_amt, which artificially multiplies invoice totals by the number of payments!`,
    learningOutcomes: `Understand the 1-to-many join duplication trap and how right-side pre-aggregation guarantees accurate balances.`
  });
}

// -----------------------------------------------------------------------------
// 3. LEFT ANTI-JOIN (30 Cases: 10 Easy, 10 Medium, 10 Hard)
// -----------------------------------------------------------------------------
for (let i = 1; i <= 30; i++) {
  const ind = industries[(i - 1) % industries.length];
  const diff = i <= 10 ? "Easy" : (i <= 20 ? "Medium" : "Hard");
  createCase({
    title: `${ind} Bank Rec & Orphaned Disbursement Anti-Join Investigation #${i}`,
    industry: ind,
    difficulty: diff,
    table: `GeneralLedger_${ind}`,
    scenario: `Detecting outstanding disbursements or idle accounts that exist in primary books but have zero records in verification feeds.`,
    businessObjective: `Write a LEFT ANTI-JOIN using WHERE right_table.key IS NULL to isolate unreconciled items.`,
    schemaSnippet: `\`GeneralLedger_${ind} (check_id VARCHAR(32) PRIMARY KEY, recipient VARCHAR(64), amount_usd DECIMAL(12,2), issued_date DATE)\` & \`BankCleared_${ind} (check_num VARCHAR(32) PRIMARY KEY, cleared_date DATE)\``,
    targetQuery: `SELECT gl.check_id, gl.recipient, gl.amount_usd, gl.issued_date\nFROM GeneralLedger_${ind} gl\nLEFT JOIN BankCleared_${ind} bk\n  ON gl.check_id = bk.check_num\nWHERE bk.check_num IS NULL\nORDER BY gl.issued_date ASC;`,
    eli5Story: `You have a checkbook and a bank statement. You LEFT JOIN them, and then filter WHERE the bank check is NULL. Only the checks you wrote that never cleared remain.`,
    commonMistakes: `Filtering on a nullable right column in WHERE instead of the primary key, risking false positives if that column naturally held NULLs.`,
    learningOutcomes: `Master the Left Anti-Join audit pattern for bank reconciliations and orphan detection.`
  });
}

// -----------------------------------------------------------------------------
// 4. FULL OUTER JOIN (30 Cases: 10 Easy, 10 Medium, 10 Hard)
// -----------------------------------------------------------------------------
for (let i = 1; i <= 30; i++) {
  const ind = industries[(i - 1) % industries.length];
  const diff = i <= 10 ? "Easy" : (i <= 20 ? "Medium" : "Hard");
  createCase({
    title: `${ind} Dual-Ledger Symmetric Reconciliation Audit #${i}`,
    industry: ind,
    difficulty: diff,
    table: `InternalLedger_${ind}`,
    scenario: `Performing a complete two-way audit between internal books and external settlement logs to find discrepancies on BOTH sides.`,
    businessObjective: `Use FULL OUTER JOIN to retain both internal-only and external-only records simultaneously.`,
    schemaSnippet: `\`InternalLedger_${ind} (tx_id VARCHAR(32) PRIMARY KEY, internal_amount DECIMAL(12,2))\` & \`ExternalSettlement_${ind} (settle_id VARCHAR(32) PRIMARY KEY, external_amount DECIMAL(12,2))\``,
    targetQuery: `SELECT COALESCE(a.tx_id, b.settle_id) AS unified_tx_id,\n       a.internal_amount,\n       b.external_amount,\n       CASE\n         WHEN a.tx_id IS NOT NULL AND b.settle_id IS NOT NULL THEN 'MATCHED_BOTH'\n         WHEN a.tx_id IS NOT NULL AND b.settle_id IS NULL THEN 'INTERNAL_LEDGER_ONLY'\n         ELSE 'EXTERNAL_BANK_ONLY'\n       END AS audit_reconciliation_flag\nFROM InternalLedger_${ind} a\nFULL OUTER JOIN ExternalSettlement_${ind} b\n  ON a.tx_id = b.settle_id\nORDER BY unified_tx_id ASC;`,
    eli5Story: `Like laying two bank records side by side. If both sides agree, they pair up. If internal recorded it but the bank didn't, you see it. If the bank took money but internal missed it, you see it too.`,
    commonMistakes: `Assuming FULL OUTER JOIN works natively in MySQL (it requires UNION of LEFT and RIGHT joins in MySQL, though supported natively in Postgres/Snowflake).`,
    learningOutcomes: `Understand symmetric dual-ledger audit visibility and handling multi-sided discrepancies.`
  });
}

// -----------------------------------------------------------------------------
// 5. SELF JOIN (30 Cases: 10 Easy, 10 Medium, 10 Hard)
// -----------------------------------------------------------------------------
for (let i = 1; i <= 30; i++) {
  const ind = industries[(i - 1) % industries.length];
  const diff = i <= 10 ? "Easy" : (i <= 20 ? "Medium" : "Hard");
  createCase({
    title: `${ind} Hierarchical Rollup & Period-over-Period Self Join #${i}`,
    industry: ind,
    difficulty: diff,
    table: `StaffRoster_${ind}`,
    scenario: `Resolving recursive parent-child reporting hierarchies or comparing current period metrics to prior period using dual aliasing of the same table.`,
    businessObjective: `Self join the entity table against itself to compute reporting trees or period-over-period growth variances.`,
    schemaSnippet: `\`StaffRoster_${ind} (emp_id INT PRIMARY KEY, name VARCHAR(64), manager_id INT, salary DECIMAL(10,2))\``,
    targetQuery: `SELECT e.emp_id, e.name AS employee_name,\n       e.salary AS employee_salary,\n       COALESCE(m.name, 'Board of Directors') AS manager_name,\n       m.salary AS manager_salary,\n       ROUND(e.salary / m.salary * 100, 1) AS salary_pct_of_manager\nFROM StaffRoster_${ind} e\nLEFT JOIN StaffRoster_${ind} m\n  ON e.manager_id = m.emp_id\nORDER BY e.emp_id ASC;`,
    eli5Story: `The table has both employees and bosses in the same list. By giving the table two nicknames ('e' for employee and 'm' for manager), SQL links each employee to their own boss's row.`,
    commonMistakes: `Using an INNER JOIN which drops the CEO or top executive because their manager_id is NULL! Always use LEFT JOIN for managerial trees.`,
    learningOutcomes: `Master dual-aliasing recursive links and hierarchical relationship navigation.`
  });
}

// -----------------------------------------------------------------------------
// 6. CROSS JOIN (30 Cases: 10 Easy, 10 Medium, 10 Hard)
// -----------------------------------------------------------------------------
for (let i = 1; i <= 30; i++) {
  const ind = industries[(i - 1) % industries.length];
  const diff = i <= 10 ? "Easy" : (i <= 20 ? "Medium" : "Hard");
  createCase({
    title: `${ind} Date Spine Calendar Scaffolding & Matrix Projection #${i}`,
    industry: ind,
    difficulty: diff,
    table: `ActiveAccounts_${ind}`,
    scenario: `Constructing a Cartesian date spine matrix pairing every active account with all 12 fiscal months so zero-activity periods are never omitted from charts.`,
    businessObjective: `Use CROSS JOIN to generate the Cartesian product of entities and reporting periods, left joining actual activity to guarantee clean reporting.`,
    schemaSnippet: `\`ActiveAccounts_${ind} (account_id VARCHAR(32) PRIMARY KEY, account_name VARCHAR(64))\` & \`FiscalCalendar_${ind} (month_key VARCHAR(7) PRIMARY KEY)\``,
    targetQuery: `SELECT a.account_id, a.account_name, c.month_key\nFROM ActiveAccounts_${ind} a\nCROSS JOIN FiscalCalendar_${ind} c\nORDER BY a.account_id ASC, c.month_key ASC;`,
    eli5Story: `If you want a chart of 12 months for 10 clients, you need 120 slots. A CROSS JOIN multiplies clients by months so even if a client bought nothing in May, May is still on the chart.`,
    commonMistakes: `Accidentally cross-joining two large transactional tables in production (100k x 100k = 10 Billion rows, causing memory failure).`,
    learningOutcomes: `Understand deliberate Cartesian products for date spines, sensitivity grids, and reporting templates.`
  });
}

// -----------------------------------------------------------------------------
// 7. NON-EQUI JOIN (30 Cases: 10 Easy, 10 Medium, 10 Hard)
// -----------------------------------------------------------------------------
for (let i = 1; i <= 30; i++) {
  const ind = industries[(i - 1) % industries.length];
  const diff = i <= 10 ? "Easy" : (i <= 20 ? "Medium" : "Hard");
  createCase({
    title: `${ind} Graduated Commission Tiers & Range Bracket Valuation #${i}`,
    industry: ind,
    difficulty: diff,
    table: `SalesLog_${ind}`,
    scenario: `Mapping continuous sales figures or portfolio risk metrics into discrete compensation and tax brackets using BETWEEN min and max thresholds.`,
    businessObjective: `Perform a non-equi join on range condition BETWEEN to look up tiered payout schedules without hardcoding constants.`,
    schemaSnippet: `\`SalesLog_${ind} (rep_id VARCHAR(32) PRIMARY KEY, rep_name VARCHAR(64), quarterly_volume DECIMAL(12,2))\` & \`TierLookup_${ind} (tier_name VARCHAR(32) PRIMARY KEY, min_vol DECIMAL(12,2), max_vol DECIMAL(12,2), commission_pct DECIMAL(5,2))\``,
    targetQuery: `SELECT s.rep_name, s.quarterly_volume,\n       t.tier_name, t.commission_pct,\n       ROUND(s.quarterly_volume * (t.commission_pct / 100.0), 2) AS commission_payout_usd\nFROM SalesLog_${ind} s\nINNER JOIN TierLookup_${ind} t\n  ON s.quarterly_volume BETWEEN t.min_vol AND t.max_vol\nORDER BY commission_payout_usd DESC;`,
    eli5Story: `Instead of checking if ID = ID, you check if sales fall between the minimum and maximum of a reward tier. A rep who sells $85,000 automatically lands in the $50k-$100k bracket.`,
    commonMistakes: `Creating overlapping tier brackets (e.g. 0-50k and 50k-100k) which causes a rep with exactly 50k to match twice and double their commission rows!`,
    learningOutcomes: `Master range-based join conditions, tiered compensation matrices, and eliminating hardcoded CASE WHENs.`
  });
}

console.log(`Successfully generated ${cases.length} case studies!`);
console.log(`First Case ID: ${cases[0].id}, Last Case ID: ${cases[cases.length - 1].id}`);

// Count difficulties
const easyCount = cases.filter(c => c.difficulty === 'Easy').length;
const medCount = cases.filter(c => c.difficulty === 'Medium').length;
const hardCount = cases.filter(c => c.difficulty === 'Hard').length;
console.log(`Breakdown: Easy: ${easyCount}, Medium: ${medCount}, Hard: ${hardCount}`);

// Export to file for merger
fs.writeFileSync(path.join(__dirname, 'generated_390_cases.json'), JSON.stringify(cases, null, 2), 'utf-8');
console.log("Saved to scratch/generated_390_cases.json");
