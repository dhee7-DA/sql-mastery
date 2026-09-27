# 🏛️ Important Materials & Reference Guide: Relational JOINs Master Vault

> **Master Reference Compendium**: 7 Join Disciplines × 60 Problems Each (20 Easy / 20 Medium / 20 Hard) = **420 Production Scenarios** across FinTech, Clearinghouses, Quantitative Trading, Healthcare, and Enterprise Data Engineering.

---

## 📊 1. Relational JOINs Master Decision Matrix & Trap Focus

| Join Discipline | Symbol | Primary Concept & Engine Behavior | Real-World Data & Finance Scenarios | Trap Focus / Silent Corruption Gotcha |
| :--- | :---: | :--- | :--- | :--- |
| **`INNER JOIN`** | `⋈` | Strict key intersection; keeps only rows where the join predicate evaluates to `TRUE`. Drops unmatched keys and `NULL`s. | • Matching executed trades to clearing accounts<br>• Settled invoices paired with bank payments<br>• KYC-approved customer orders | **Silent Data Eviction & Cartesian Fan-Out**: Unmatched or `NULL` foreign keys disappear silently from reports. Non-unique join keys cause silent multiplicative row explosion. |
| **`LEFT JOIN`** | `⟕` | Preserves all rows from the left table; fills missing right table attributes with `NULL`. Retains the primary domain entity. | • Identifying churned / inactive accounts (`WHERE right.id IS NULL`)<br>• Customer lifetime spend audit<br>• Unfunded loan applications | **WHERE Clause Predicate Demotion**: Placing a filter on the right table inside `WHERE` (e.g., `WHERE payments.status = 'COMPLETED'`) converts the query into an `INNER JOIN`, dropping non-matching left rows! |
| **`RIGHT JOIN`** | `⟖` | Preserves all rows from the right table; mirrors `LEFT JOIN`. Used when right table represents the master taxonomy or dimension. | • Auditing product master catalogs vs actual sales<br>• Regulatory fee schedule compliance<br>• Merchant tier coverage | **Legibility & Direction Inversion**: Most query optimizers and developers read left-to-right. Using `RIGHT JOIN` across complex chains often leads to subtle operator precedence bugs. |
| **`FULL OUTER JOIN`** | `⟗` | Preserves all rows from both tables; fills missing attributes on either side with `NULL`. Full symmetric reconciliation. | • Inter-bank reconciliation breaks (Internal Ledger vs Swift feeds)<br>• Merged corporate entity customer migration audit<br>• Multi-broker settlement balance check | **Missing COALESCE on Dimension Keys**: Selecting `a.account_id` directly will yield `NULL` for right-only unmatched rows. You must project `COALESCE(a.account_id, b.account_id)`. |
| **`CROSS JOIN`** | `✕` | Unconditional Cartesian product ($M \times N$ rows); pairs every row from Table A with every row in Table B. | • Generating daily FX currency pair matrices ($N \times N$)<br>• Date spine calendar grids for zero-fill analytics<br>• Risk scenario stress-testing combinations | **Unintended OOM & Spilling**: Running a Cartesian join without tight pre-filtering causes massive memory spill and exponential disk bloat ($10^6 \times 10^6 = 10^{12}$ rows). |
| **`SELF JOIN`** | `⟲` | Joining a table to itself using distinct aliases (`e1` and `e2`) to evaluate relationships within the same entity domain. | • Organizational hierarchy & management reporting lines<br>• Consecutive trading day price movement analysis<br>• Detecting concurrent user sessions on the same IP | **Circular Self-Reference & Infinite Loop**: Forgetting to qualify aliases identically or omitting terminal predicates (`WHERE m.manager_id IS NOT NULL`) causes duplicate and inverted pair duplication. |
| **`NON-EQUI JOIN`** | `≶` | Joining on inequality operators (`>`, `<`, `BETWEEN .. AND`, `>=`) rather than direct equality (`=`). | • Progressive income tax brackets & fee tier mapping<br>• Point-in-time SCD Type-2 historical price as-of joins<br>• Rolling 30-day trailing risk exposure windows | **Overlapping Interval Fan-Out**: Overlapping bracket bounds (e.g. `val BETWEEN min AND max` with ambiguous endpoints) cause a single transaction to match multiple fee tiers. |

---

## 📚 2. Complete 420-Problem Inventory by Join Discipline

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TOTAL: 420 Problems | 7 Disciplines × 60 Problems Each (Strict 20 Easy / 20 Med / 20 Hard) │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Discipline 1: ⋈ INNER JOIN (Strict Key Intersection & Matched Pairs) — 60 Problems
*Core Relational Concept: Strict set intersection ($A \cap B$). Drops unmatched records and rows where foreign key is `NULL`.*

* **Easy (Lvl 1 – 20)**:
  * Lvl 1: Settled Orders & Customer Name Resolution
  * Lvl 2: Employee Department Allocation Lookup
  * Lvl 3: Trade Executions to Asset Master Catalog
  * Lvl 4: Loan Disbursals Matched to Underwriter IDs
  * Lvl 5: Merchant Terminal POS Transactions
  * Lvl 6: Daily Warehouse Shipments to Carrier Details
  * Lvl 7: Subscription Plan Billings to Customer Accounts
  * Lvl 8: Equity Ticker Symbols to Exchange Details
  * Lvl 9: Student Course Enrollment Matrix
  * Lvl 10: Invoiced Line Items to Inventory SKU Master
  * Lvl 11: Real Estate Property to Listed Broker Lookup
  * Lvl 12: Credit Card Charges to Billing Cycles
  * Lvl 13: Flight Bookings to Aircraft Fleet Details
  * Lvl 14: Hospital Patient Encounters to Attending Doctors
  * Lvl 15: SaaS User Logins to Tenant Organization Accounts
  * Lvl 16: Bond Coupon Payments to CUSIP Instrument Master
  * Lvl 17: E-commerce Returns to Original Order IDs
  * Lvl 18: Hotel Reservation Stays to Room Type Catalog
  * Lvl 19: Insurance Policyholder Claims to Policy Contracts
  * Lvl 20: Digital Wallet Transfers to Verified Bank Accounts
* **Medium (Lvl 21 – 40)**:
  * Lvl 21: Clearinghouse Trade Reconciliation on `(trade_id, trade_date)`
  * Lvl 22: Tri-Party Repo Settlement Chain: Trader $\to$ Broker $\to$ Custodian
  * Lvl 23: Multi-Currency Payment Gateway Fee Pairing
  * Lvl 24: Cross-Branch Account Transfers with Branch Code Matching
  * Lvl 25: Fixed Income Coupon Accrual on `(isin, coupon_period)`
  * Lvl 26: Healthcare Pharmacy Claims with Formulary Tier Matching
  * Lvl 27: Supply Chain 3-Way Invoice Match: PO $\to$ Receipt $\to$ Invoice
  * Lvl 28: FX Spot Arbitrage Trade Pairs with Currency Code Alignment
  * Lvl 29: Loan Delinquency Tranches Paired with Risk Rating History
  * Lvl 30: SaaS Feature Entitlements with Subscription Plan Add-ons
  * Lvl 31: Retail Inventory Reorder Triggers: Warehouse $\to$ Supplier $\to$ SKU
  * Lvl 32: Options Contract Assignment to Underlying Stock Records
  * Lvl 33: Fleet Fuel Cards Matched to Vehicle GPS Check-ins
  * Lvl 34: Venture Capital Investment Tranches to Cap Table Rounds
  * Lvl 35: Mortgage Escrow Disbursals Matched to County Tax Records
  * Lvl 36: Corporate Payroll Line Items Matched to Employee Tax Elections
  * Lvl 37: Telecom Roaming Call Detail Records to Partner Carrier Rates
  * Lvl 38: Mutual Fund Nav Calculation: Holdings $\to$ Security Prices
  * Lvl 39: Digital Ad Click-to-Conversion Tracking on `(click_id, user_token)`
  * Lvl 40: Credit Card Dispute Evidence Matching to Authorization Logs
* **Hard (Lvl 41 – 60)**:
  * Lvl 41: Double-Entry Ledger Imbalance Detection Across Accounts
  * Lvl 42: High-Frequency Limit Order Book Depth Aggregation
  * Lvl 43: Sovereign Debt Default Swap Derivative Settlement
  * Lvl 44: Cross-Border Tax Withholding Compliance with Country Treaties
  * Lvl 45: Automated Market Maker (AMM) Liquidity Pool Arbitrage Matches
  * Lvl 46: Structured Collateralized Debt Obligation (CDO) Cashflow Waterfall
  * Lvl 47: Algorithmic Execution VWAP Slicing Across Broker Feeds
  * Lvl 48: Regulatory Basel III Capital Adequacy Ratio Risk Exposure Join
  * Lvl 49: Private Equity Waterfall Distribution to LP/GP Capital Accounts
  * Lvl 50: Anti-Money Laundering (AML) Smurfing Pattern Transaction Join
  * Lvl 51: Credit Default Swap (CDS) Spread to Benchmark Bond Spreads
  * Lvl 52: Multi-Asset Margin Call Liquidation Requirement Calculation
  * Lvl 53: Energy Grid Spot Market Cleared Bids to Transmission Nodes
  * Lvl 54: Commercial Real Estate Lease Escalation Cashflow Modeling
  * Lvl 55: Reinsurance Treaty Surplus Share Loss Apportionment
  * Lvl 56: Cross-Venue Cryptographic Order Nonce Matching & Audit
  * Lvl 57: Global Custody Multi-Depository Share Reconciliation Break Join
  * Lvl 58: Hedge Fund Factor Attribution: Alpha/Beta Matrix Multi-Join
  * Lvl 59: High-Volume E-Commerce Flash Sale Inventory Lock Ledger
  * Lvl 60: Prime Broker Synthetic Prime Financing Margin Basket Join

---

### Discipline 2: ⟕ LEFT JOIN (Primary Domain Preservation & Churn Audit) — 60 Problems
*Core Relational Concept: Preserves all records from left table ($A$). Missing attributes from right table ($B$) are padded with `NULL`.*

* **Easy (Lvl 1 – 20)**:
  * Lvl 1: All Registered Customers & Their Order Totals (or NULL)
  * Lvl 2: Inactive User Accounts with Zero Recorded Logins
  * Lvl 3: All Catalog Products Without Any Customer Purchases
  * Lvl 4: Loan Applicants Who Never Accepted Disbursals
  * Lvl 5: Merchant Terminals with Zero Transactions in Current Month
  * Lvl 6: Warehouse Bins with No Currently Assigned Stock SKUs
  * Lvl 7: Subscription Customers Without Any Payment Failures
  * Lvl 8: Listed Stock Equities with No Corporate Action Events
  * Lvl 9: Enrolled Students Who Have Not Submitted Coursework
  * Lvl 10: Invoiced Vendors Who Have Never Filed W-9 Tax Forms
  * Lvl 11: Real Estate Listings with Zero Buyer Inquiries
  * Lvl 12: Credit Card Accounts Without Any Rewards Redemption
  * Lvl 13: Flight Routes with No Scheduled Aircraft This Quarter
  * Lvl 14: Hospital Clinic Doctors with No Patient Bookings Today
  * Lvl 15: SaaS Corporate Tenants with No Active API Keys
  * Lvl 16: Bond Issues Without Any Rating Agency Downgrades
  * Lvl 17: E-commerce Categories with Zero Return Requests
  * Lvl 18: Hotel Rooms with Zero Housekeeping Work Orders
  * Lvl 19: Insurance Policies Without Any Filed Claims
  * Lvl 20: Digital Wallet Users Without Any Linked Bank Accounts
* **Medium (Lvl 21 – 40)**:
  * Lvl 21: Customer Churn Audit: Last Order Date or Flagged Churned
  * Lvl 22: Sales Rep Target Attainment: Reps with Zero Sales Still Kept
  * Lvl 23: Credit Limit Utilization Audit with Inactive Accounts Included
  * Lvl 24: Employee Performance Review Completion Status by Department
  * Lvl 25: Fixed Income Portfolio: All Positions with Optional Credit Watch Flags
  * Lvl 26: Healthcare Patient Registry with Optional Follow-up Lab Results
  * Lvl 27: Multi-Level Product Category Rollup with Empty Subcategories
  * Lvl 28: FX Counterparty Exposure: All Approved Entities vs Active Trades
  * Lvl 29: Loan Portfolio Aging: All Loans with Optional 90-Day Default Notice
  * Lvl 30: SaaS Feature Adoption: All Active Users vs Feature Audit Logs
  * Lvl 31: Supply Chain Vendor Scorecard: All Approved Vendors vs Late Deliveries
  * Lvl 32: Options Portfolio Delta Rollup with Unhedged Underlying Equities
  * Lvl 33: Delivery Driver Shifts with Zero Completed Deliveries Tracked
  * Lvl 34: VC Deal Flow Pipeline: All Reviewed Startups vs Term Sheets Issued
  * Lvl 35: Mortgage Servicing: All Accounts vs Escrow Deficit Notices
  * Lvl 36: Corporate Payroll Departments with Zero Overtime Submissions
  * Lvl 37: Telecom Tower Base Stations with Zero Outage Incidents Reported
  * Lvl 38: Wealth Management Accounts with Unassigned Dedicated Advisors
  * Lvl 39: Marketing Campaign Outreach: All Sent Emails vs Clicks Recorded
  * Lvl 40: Chargeback Dispute Audit: All Disputed Transactions vs Evidence Files
* **Hard (Lvl 41 – 60)**:
  * Lvl 41: Dormant Bank Account Fee Exemption Ledger Audit
  * Lvl 42: Investment Portfolio Cash Drag: Accounts with Zero Asset Allocation
  * Lvl 43: Trade Settlement Failure Ledger: All Orders vs DTCC Clearing Breaks
  * Lvl 44: Cross-Border VAT Reporting: All Export Invoices vs Customs Declarations
  * Lvl 45: Lending Syndicate Participation: Lead Banks with Unsubscribed Tranches
  * Lvl 46: Structured Finance Collateral Pools: Assets with Missing Appraisals
  * Lvl 47: Algorithmic Dark Pool Routed Orders with Zero Fill Confirmations
  * Lvl 48: Regulatory Anti-Bribery Compliance: All Vendors vs Due Diligence Checks
  * Lvl 49: Private Equity Portfolio Companies with Incomplete Quarterly Financials
  * Lvl 50: Anti-Fraud Sanctions Screening: All Remittances vs PEP Blacklists
  * Lvl 51: Asset-Backed Securities: All Mortgage Loans vs Title Insurance Policies
  * Lvl 52: Margin Call Shortfall: All Accounts vs Pledged Collateral Valuations
  * Lvl 53: Energy Futures Contracts vs Physical Pipeline Delivery Nominations
  * Lvl 54: Commercial Real Estate Rent Roll: All Suites vs Tenant Payment Breaks
  * Lvl 55: Reinsurance Loss Triangles: All Cedant Treaties vs Paid Claims Records
  * Lvl 56: Multi-Cloud Billing Ledger: All Provisioned Instances vs Metered Usage
  * Lvl 57: Global Equity Custody: All Holdings vs Proxy Voting Ballots Cast
  * Lvl 58: Hedge Fund Risk Limits: All Books vs VaR Threshold Breach Notices
  * Lvl 59: E-Commerce Loyalty Program: All Tier Members vs Reward Expirations
  * Lvl 60: Prime Broker Omnibus Ledger: All Client Sub-Accounts vs Margin Calls

---

### Discipline 3: ⟖ RIGHT JOIN (Master Catalog & Regulatory Lookup Symmetry) — 60 Problems
*Core Relational Concept: Preserves all records from right table ($B$). Used when auditing operational tables against a master regulatory taxonomy.*

* **Easy (Lvl 1 – 20)**:
  * Lvl 1: Product Master Catalog Coverage Against Daily Store Sales
  * Lvl 2: Global Department Directory vs Assigned Active Employees
  * Lvl 3: Approved Asset Universe Catalog vs Portfolio Executed Trades
  * Lvl 4: Loan Underwriting Tiers vs Actual Applications Received
  * Lvl 5: Merchant Industry SIC Codes vs Onboarded Merchant Terminals
  * Lvl 6: Warehouse Storage Zones vs Allocated Inventory Pallets
  * Lvl 7: Subscription Tier Catalog vs Current Active Subscriptions
  * Lvl 8: Stock Exchange Market Segments vs Active Listed Equities
  * Lvl 9: University Academic Departments vs Scheduled Student Courses
  * Lvl 10: Approved Vendor Master List vs Invoiced Purchase Orders
  * Lvl 11: Real Estate Geographic Territories vs Active Agent Listings
  * Lvl 12: Credit Card Rewards Category Catalog vs Cardholder Transactions
  * Lvl 13: Aircraft Model Specs vs Currently Operated Airline Flights
  * Lvl 14: Hospital Specialty Wards vs Currently Admitted Patients
  * Lvl 15: SaaS Feature Permission Matrix vs Tenant Role Assignments
  * Lvl 16: Sovereign Bond Rating Scale vs Currently Issued Country Bonds
  * Lvl 17: E-Commerce Return Reason Codes vs Customer Return Slips
  * Lvl 18: Hotel Room Amenity Catalog vs Room Configurations
  * Lvl 19: Insurance Coverage Benefit Schedule vs Filed Policy Claims
  * Lvl 20: Central Bank Currency ISO Codes vs Transacted Foreign Exchange
* **Medium (Lvl 21 – 40)**:
  * Lvl 21: Chart of Accounts Audit: General Ledger Codes Without Journal Entries
  * Lvl 22: Regulatory Reporting Taxonomy: Required Filings vs Submitted Forms
  * Lvl 23: Credit Scoring Scorecard Bands vs Assigned Customer Scores
  * Lvl 24: Enterprise Role Hierarchy: Security Roles vs Provisioned Users
  * Lvl 25: Fixed Income Benchmark Index Constituents vs Portfolio Holdings
  * Lvl 26: Healthcare ICD-10 Diagnosis Codes vs Clinic Billing Records
  * Lvl 27: Supply Chain Supplier Quality Certifications vs Active Shippers
  * Lvl 28: FX Approved Currency Pairs vs Traded Spot Volume
  * Lvl 29: Loan Collateral Asset Classes vs Pledged Property Records
  * Lvl 30: SaaS License SKU Offerings vs Customer Contract Line Items
  * Lvl 31: Retail Store Regional Zones vs Physical Store Outlets Opened
  * Lvl 32: Derivatives Master Clearing Accounts vs Margin Deposit Transfers
  * Lvl 33: Delivery Vehicle Fleet Types vs Dispatched Logistics Trips
  * Lvl 34: Angel Investment Industry Sectors vs Funded Portfolio Ventures
  * Lvl 35: Mortgage Underwriting Guidelines vs Approved Loan Files
  * Lvl 36: Corporate Job Grade Salary Bands vs Employee Compensation Records
  * Lvl 37: Telecom Frequency Spectrum Licenses vs Deployed Cell Towers
  * Lvl 38: Wealth Management Risk Tolerance Profiles vs Client Portfolios
  * Lvl 39: Marketing Channel Attribution Matrix vs Tracked Campaign Inflows
  * Lvl 40: Merchant KYC Verification Statuses vs Processed Payout Batches
* **Hard (Lvl 41 – 60)**:
  * Lvl 41: IFRS-9 Accounting Classification Categories vs Financial Assets
  * Lvl 42: Liquidity Coverage Ratio (LCR) Eligible Asset Tiers vs Bank Reserves
  * Lvl 43: MiFID II Transaction Reporting Fields vs Executed Trade Feeds
  * Lvl 44: Transfer Pricing Master Service Categories vs Intercompany Charges
  * Lvl 45: Bank Capital Tier-1/Tier-2 Instruments vs Issued Subordinated Debt
  * Lvl 46: Collateralized Loan Obligation (CLO) Tranche Definitions vs Bond Issues
  * Lvl 47: Best-Execution Venue Taxonomy vs High-Frequency Trading Fills
  * Lvl 48: Anti-Financial Crime Risk Typology Matrix vs Alert Investigations
  * Lvl 49: ESG Sustainability Taxonomy (EU Article 8/9) vs Fund Investments
  * Lvl 50: Sanctions Screening Watchlist Entities vs Wire Transfer Beneficiaries
  * Lvl 51: Asset Allocation Model Drift: Target Asset Classes vs Current Holdings
  * Lvl 52: ISDA Master Agreement Credit Support Annex (CSA) Terms vs Derivatives
  * Lvl 53: Energy Grid Transmission Pricing Hubs vs Cleared Power Contracts
  * Lvl 54: Commercial Real Estate Property Classifications vs Portfolio Leases
  * Lvl 55: Solvency II Insurance Risk Modules vs Underwritten Exposure Data
  * Lvl 56: Cloud Infrastructure Security Benchmark Rules vs Cloud Audit Logs
  * Lvl 57: Central Securities Depository (CSD) Custody Accounts vs Trade Settlements
  * Lvl 58: Quantitative Factor Universe Definitions vs Factor Return Series
  * Lvl 59: Omnichannel Retail Warehouse Fulfillment Matrix vs Order Dispatches
  * Lvl 60: Prime Broker Approved Collateral Haircut Schedules vs Pledged Bonds

---

### Discipline 4: ⟗ FULL OUTER JOIN (Dual-Sided Reconciliation & Ledger Breaks) — 60 Problems
*Core Relational Concept: Complete union of sets ($A \cup B$). Retains unmatched records from both tables; essential for inter-ledger reconciliation.*

* **Easy (Lvl 1 – 20)**:
  * Lvl 1: Bank Account Statement vs Internal Cash Ledger Reconciliation
  * Lvl 2: HR Employee Records vs IT Provisioned Active Directory Users
  * Lvl 3: Trade Execution Blotter vs Custodian Settlement Confirmation
  * Lvl 4: Loan Origination System Records vs Servicing Payment Records
  * Lvl 5: Merchant POS Terminal Sales vs Payment Processor Payouts
  * Lvl 6: Warehouse Physical Inventory Count vs ERP Recorded Stock
  * Lvl 7: Subscription Billing System vs Payment Gateway Invoices
  * Lvl 8: Equity Portfolio Holdings vs Broker Margin Statement Positions
  * Lvl 9: University Course Registrations vs Student Tuition Bill Records
  * Lvl 10: Accounts Payable Invoices vs Bank Disbursal Transactions
  * Lvl 11: Real Estate MLS Listings vs County Deed Registrar Records
  * Lvl 12: Credit Card Rewards Points Earned vs Points Redeemed Ledger
  * Lvl 13: Airline Flight Ticket Sales vs Boarding Pass Scans at Gate
  * Lvl 14: Hospital Clinical Encounters vs Medical Billing Claims Submitted
  * Lvl 15: SaaS Provisioned User Seats vs Okta SSO Active Accounts
  * Lvl 16: Bond Treasury Custody Holdings vs Depository Trust (DTCC) Records
  * Lvl 17: E-Commerce Cart Checkout Events vs Payment Authorization Logs
  * Lvl 18: Hotel Room Booking Engine vs Front Desk Check-in Ledger
  * Lvl 19: Health Insurance Policy Enrollees vs Employer Monthly Roster
  * Lvl 20: Digital Wallet Balances vs Backing Escrow Account Balances
* **Medium (Lvl 21 – 40)**:
  * Lvl 21: Daily Inter-Bank Wire Reconciliation: Matched, Missing, Unmatched
  * Lvl 22: M&A Customer Database Consolidation: Company A vs Company B
  * Lvl 23: Credit Card Processor Settlement Break: Fee Amount Discrepancies
  * Lvl 24: Payroll System Gross Pay vs General Ledger Wage Expense
  * Lvl 25: Fixed Income Security Master: Bloomberg vs Refinitiv Ticker Mapping
  * Lvl 26: Healthcare Insurance Claims vs Hospital Patient Ledger Balances
  * Lvl 27: Supply Chain Purchase Order vs Receiving Report with Variance Flags
  * Lvl 28: FX Trade Matching: Counterparty A Confirmation vs Counterparty B
  * Lvl 29: Loan Servicer Escrow Balance vs Tax Assessor Escrow Bill
  * Lvl 30: SaaS Billing MRR Engine vs Stripe Subscription Event Feed
  * Lvl 31: Retail Chain Store Cash Drawer Count vs POS Register Tape
  * Lvl 32: Options Exchange Trade Log vs Clearing Member Trade Confirmation
  * Lvl 33: Delivery Logistics Freight Invoices vs Carrier Contract Rate Cards
  * Lvl 34: Venture Fund Investor Commitments vs Wire Transfer Receipts
  * Lvl 35: Mortgage Secondary Market Loan Sale vs Purchasing Bank Roster
  * Lvl 36: Corporate Expense Reports vs Corporate Credit Card Statement
  * Lvl 37: Telecom Interconnect Billing: Originating vs Terminating Carrier
  * Lvl 38: Wealth Management Custody Assets vs Sub-Advisor Portfolio
  * Lvl 39: Digital Ad Network Impression Tracker vs Advertisers' Log
  * Lvl 40: Merchant Chargeback Log vs Card Network Dispute Roster
* **Hard (Lvl 41 – 60)**:
  * Lvl 41: Tri-Party Repo Cash & Collateral True-Up Across Clearingbanks
  * Lvl 42: Continuous Linked Settlement (CLS) Multi-Currency FX Settlement Break
  * Lvl 43: Depository Trust Company (DTC) Stock Position Sweep vs Internal Ledger
  * Lvl 44: Multinational Intercompany Elimination Balance Sheet Reconciliation
  * Lvl 45: Bank Vault Cash Reserve Physical Count vs Central Bank Reserve Account
  * Lvl 46: Structured Finance Waterfall Cash Inflows vs Trustee Disbursals
  * Lvl 47: High-Frequency Limit Order Execution Fills vs Drop-Copy Feed
  * Lvl 48: Regulatory Dodd-Frank Swap Data Repository (SDR) Trade Match Break
  * Lvl 49: Private Equity Capital Call Notice Dispatched vs LP Wire Inflows
  * Lvl 50: Real-Time Gross Settlement (RTGS) Message Queue vs Bank Core Ledger
  * Lvl 51: Asset-Backed Security Principal & Interest Amortization Break
  * Lvl 52: Prime Broker vs Client Margin Account Cross-Collateral True-Up
  * Lvl 53: Energy Grid Power Nomination Volume vs Metered Substation Draw
  * Lvl 54: Commercial Real Estate Common Area Maintenance (CAM) True-Up
  * Lvl 55: Reinsurance Cedant Loss Bordereau vs Reinsurer Paid Claims Ledger
  * Lvl 56: Multi-Cloud Reserved Instance Reservation vs Physical Virtual Machine Usage
  * Lvl 57: Global Depository Receipt (GDR) Underlying Equity Share True-Up
  * Lvl 58: Quantitative Hedge Fund Strategy P&L: Trading System vs Fund Admin
  * Lvl 59: Omnichannel Retail Inventory: Store Shelf vs Online Reserved Stock
  * Lvl 60: Prime Broker Stock Borrow/Loan Fee Accruals vs Lender Billing Statements

---

### Discipline 5: ✕ CROSS JOIN (Cartesian Products & Matrix Modeling) — 60 Problems
*Core Relational Concept: Unconditional Cartesian product ($M \times N$). Every row from $A$ pairs with every row from $B$. Generates calendar spines, FX grids, and scenario models.*

* **Easy (Lvl 1 – 20)**:
  * Lvl 1: Product SKUs × Store Locations Inventory Baseline Grid
  * Lvl 2: Sales Representatives × Quarters Target Planning Matrix
  * Lvl 3: Currency Pair Trading Matrix: All Base Currencies × Quote Currencies
  * Lvl 4: Loan Products × Risk Grade Tiers Underwriting Matrix
  * Lvl 5: Merchant Terminals × Settlement Payment Windows
  * Lvl 6: Warehouse Storage Zones × Hazardous Material Classes
  * Lvl 7: Subscription Tiers × Billing Frequencies (Monthly/Annual)
  * Lvl 8: Equity Sectors × Economic Macro Scenarios (Bull/Bear/Base)
  * Lvl 9: Student Cohorts × Campus Lecture Halls Scheduling Grid
  * Lvl 10: Vendor Categories × Compliance Audit Checklist Items
  * Lvl 11: Real Estate Property Types × Geographic Regional Quadrants
  * Lvl 12: Credit Card Types × Reward Program Incentive Tiers
  * Lvl 13: Airline Fleet Types × Destination Airport Hubs
  * Lvl 14: Hospital Clinic Wards × Nursing Shift Time Blocks
  * Lvl 15: SaaS Pricing Plans × Add-on Feature Entitlements
  * Lvl 16: Government Bond Yield Maturities (1Y..30Y) × Benchmark Issuers
  * Lvl 17: E-Commerce Customer Segments × Promotional Discount Codes
  * Lvl 18: Hotel Room Classes × Seasonal Rate Seasons (Peak/Off-Peak)
  * Lvl 19: Insurance Policy Lines × Deductible Threshold Levels
  * Lvl 20: Digital Wallet User Tiers × Daily Transaction Limit Bands
* **Medium (Lvl 21 – 40)**:
  * Lvl 21: Calendar Date Spine: Dates × Customers for Zero-Fill Activity Reports
  * Lvl 22: FX Cross-Rate Triangulation Matrix: Base × Intermediate × Quote
  * Lvl 23: Credit Risk Stress Testing: Loan Portfolio × Interest Rate Hikes (+50bps..+300bps)
  * Lvl 24: Employee Roster × All 12 Months for Complete Attendance Ledger
  * Lvl 25: Fixed Income Yield Curve Sensitivity: Shift Scenarios × Bond Portfolio
  * Lvl 26: Healthcare Hospital Capacity Grid: Dates × Intensive Care Beds
  * Lvl 27: Supply Chain Shipping Lane Combinations: Origins × Hubs × Destinations
  * Lvl 28: FX Spot Arbitrage Triangle Generation with Spread Calculation
  * Lvl 29: Loan Portfolio Loss Reserves Under Varied Unemployment Rates
  * Lvl 30: SaaS Cohort Retention Grid: Signup Months × Activity Months
  * Lvl 31: Retail Store Assortment Matrix: Store Formats × Mandatory Stock Items
  * Lvl 32: Options Strike Price × Expiration Date Volatility Surface Grid
  * Lvl 33: Delivery Route Timetable: Hub Terminals × Hourly Dispatch Intervals
  * Lvl 34: Venture Fund Portfolio Company Valuations Under Multiple Exit Multiples
  * Lvl 35: Mortgage Prepayment Sensitivity Grid: Interest Rates × CPR Speeds
  * Lvl 36: Corporate Budget Variance Model: Cost Centers × All 12 Fiscal Months
  * Lvl 37: Telecom Network Bandwidth Modeling: Regions × Peak Hour Intervals
  * Lvl 38: Wealth Management Asset Allocation Mix: Risk Scores × Model Portfolios
  * Lvl 39: Digital Ad Placement Inventory: Ad Units × Screen Sizes × Geography
  * Lvl 40: Merchant Interchange Fee Schedule: Card Networks × Transaction Types
* **Hard (Lvl 41 – 60)**:
  * Lvl 41: Monte Carlo VaR Simulation: 10,000 Shock Scenarios × Asset Positions
  * Lvl 42: Foreign Exchange Arbitrage Bellman-Ford Negative Cycle Generator
  * Lvl 43: Asset-Liability Management (ALM): Cashflow Time Buckets × Liquidity Pools
  * Lvl 44: Global Transfer Pricing Matrix: Intercompany Entity Pairs × Service Types
  * Lvl 45: Bank Resolution Living Will: Operational Entities × Critical Functions
  * Lvl 46: Collateralized Debt Obligation (CDO) Tranche Loss Distribution Engine
  * Lvl 47: Algorithmic Execution Dark Pool Crossing Engine Candidate Pairs
  * Lvl 48: Regulatory Comprehensive Capital Analysis & Review (CCAR) Stress Matrix
  * Lvl 49: Private Equity LBO Returns: Entry Multiples × Exit Multiples × Leverage Levels
  * Lvl 50: Anti-Fraud Graph Edge Generator: Customer Accounts × Shared Identifiers
  * Lvl 51: Bond Portfolio Key Rate Duration Shocks: 11 Maturity Points × Scenarios
  * Lvl 52: Multi-Asset Margin Haircut Surface: Security Types × Rating Tiers × Tenors
  * Lvl 53: Energy Grid N-1 Contingency Analysis: Transmission Lines × Generator Outages
  * Lvl 54: Commercial Real Estate Tenant Mix Optimization: Unit Types × Industry Sectors
  * Lvl 55: Catastrophe Reinsurance Modeling: Hurricane Paths × Insured Exposure Zones
  * Lvl 56: Multi-Region Cloud Redundancy Matrix: Availability Zones × Service Tiers
  * Lvl 57: Global Securities Lending Borrow Fee Matrix: Equity Tickers × Lender Desks
  * Lvl 58: Quantitative Multi-Factor Covariance Matrix: 50 Asset Factors × 50 Factors
  * Lvl 59: Omnichannel Dynamic Routing Grid: Order Locations × Fulfillment Centers
  * Lvl 60: Prime Broker Cross-Margin Optimization: Long Equities × Short Futures Baskets

---

### Discipline 6: ⟲ SELF JOIN (Hierarchies & Sequential Row Comparisons) — 60 Problems
*Core Relational Concept: Joining a table to itself using distinct aliases (`t1` and `t2`). Models organizational trees, consecutive day deltas, and graph paths.*

* **Easy (Lvl 1 – 20)**:
  * Lvl 1: Employee to Direct Manager Name Resolution
  * Lvl 2: Product Category to Parent Category Rollup
  * Lvl 3: Daily Stock Closing Price vs Previous Day Closing Price
  * Lvl 4: Loan Refinancing: Current Loan ID Matched to Prior Loan ID
  * Lvl 5: Consecutive ATM Cash Withdrawals by the Same Cardholder
  * Lvl 6: Warehouse Pallet Movement: Previous Location to New Location
  * Lvl 7: Subscription Plan Upgrades: Prior Plan ID vs Upgraded Plan ID
  * Lvl 8: Bond Rating Migrations: Prior Credit Rating vs New Credit Rating
  * Lvl 9: Student Course Prerequisites: Required Course vs Target Course
  * Lvl 10: Vendor Parent Corporate Entity to Subsidiary Entity Link
  * Lvl 11: Real Estate Property Price Cuts: Previous Listed Price vs Current Price
  * Lvl 12: Credit Card Transaction Sequences: Consecutive Swipes Within 1 Hour
  * Lvl 13: Aircraft Tail Number Consecutive Flights: Origin to Destination Chain
  * Lvl 14: Hospital Patient Readmissions: Discharged Visit vs Readmitted Visit
  * Lvl 15: SaaS User Account Migrations: Old User ID to New User ID
  * Lvl 16: Corporate Entity Ultimate Beneficial Owner (UBO) Parent Link
  * Lvl 17: E-Commerce Customer Order Sequence: First Order vs Second Order
  * Lvl 18: Hotel Room Consecutive Night Stays by Same Guest
  * Lvl 19: Insurance Policy Renewal Chains: Expiring Policy vs Active Renewal
  * Lvl 20: Digital Wallet Fund Cycling: A $\to$ B and B $\to$ A Transfer Pairs
* **Medium (Lvl 21 – 40)**:
  * Lvl 21: Organizational Tree: Employee $\to$ Manager $\to$ Director 3-Level Chain
  * Lvl 22: Identifying Consecutive Days of Daily Stock Price Increases (Streaks)
  * Lvl 23: Anti-Fraud Velocity Check: Consecutive Credit Card Swipes > 500 Miles Apart in 10 Mins
  * Lvl 24: Employee Peer Comparisons: Workers in the Same Department with Higher Salary
  * Lvl 25: Fixed Income Yield Curve Inversions: 2-Year Yield > 10-Year Yield on Same Date
  * Lvl 26: Healthcare Patient Encounter Gaps: Days Between Successive Hospital Visits
  * Lvl 27: Supply Chain Bill of Materials (BOM) Sub-Assembly Component Breakdown
  * Lvl 28: FX Triangulation Discrepancy Within Same Exchange Quotes Table
  * Lvl 29: Loan Delinquency Escalation: Loans That Jumped 30 Days to 60 Days Late
  * Lvl 30: SaaS User Login Streaks: Consecutive Days of Active Platform Usage
  * Lvl 31: Retail Inventory Out-of-Stock Spans: Stockout Date to Restock Date Pairs
  * Lvl 32: Options Strike Arbitrage: Same Expiration Call Spreads with Pricing Anomalies
  * Lvl 33: Delivery Driver Overlapping Shift Detection: Same Driver Assigned Overlapping Hours
  * Lvl 34: VC Portfolio Investment Rounds: Series A Valuation vs Series B Valuation
  * Lvl 35: Mortgage Payment Gaps: Missing Monthly Payments in Amortization Ledger
  * Lvl 36: Corporate Accounting Audit: Duplicate Invoice Numbers with Different Vendor Names
  * Lvl 37: Telecom Call Drop Chains: Successive Dropped Calls from Same Cell Tower
  * Lvl 38: Wealth Advisor Client Transfers: Former Advisor ID vs Newly Assigned Advisor ID
  * Lvl 39: Marketing Lead Touchpoint Sequence: Initial Ad Click $\to$ Webinar $\to$ Purchase
  * Lvl 40: Merchant Daily Settlement Variance: Today's Total vs 7-Day Trailing Same-Day
* **Hard (Lvl 41 – 60)**:
  * Lvl 41: Detecting Circular Ownership Loops in Corporate Holding Structures
  * Lvl 42: Graph Cycle Detection in Payment Routing Networks (Money Laundering Rings)
  * Lvl 43: Complete Multi-Tier Bill of Materials Explosion Down to Raw Materials
  * Lvl 44: Global Entity Organizational Rollup: Subsidiary $\to$ Holding Company $\to$ Parent
  * Lvl 45: Bank Clearing Network Cascading Default Contagion Simulation
  * Lvl 46: Structured Financial Entity Pass-Through Ownership Share Calculation
  * Lvl 47: High-Frequency Order Replacement Cancellation Audit Trail Pairs
  * Lvl 48: Regulatory Ultimate Beneficial Ownership (UBO) > 25% Shareholder Unwrapping
  * Lvl 49: Private Equity Cross-Fund Co-Investment Allocation Conflict Finder
  * Lvl 50: Anti-Money Laundering Rapid Fund Layering Hop Sequence (A $\to$ B $\to$ C $\to$ D)
  * Lvl 51: Sovereign Bond Cross-Default Clause Trigger Network Mapping
  * Lvl 52: Margin Account Collateral Rehypothecation Chain Verification
  * Lvl 53: Energy Pipeline Gas Flow Nominations: Upstream Well to Downstream City Gate
  * Lvl 54: Commercial Real Estate Sublease Chains: Master Landlord $\to$ Tenant $\to$ Subtenant
  * Lvl 55: Reinsurance Retrocession Cascades: Direct Insurer $\to$ Reinsurer $\to$ Retrocessionaire
  * Lvl 56: Microservice Architecture Call Graph Dependency Cycle Finder
  * Lvl 57: Global Equity Depository Share Voting Entitlement Chain Audit
  * Lvl 58: Quantitative Strategy Alpha Signal Autocorrelation Across Lags 1..30
  * Lvl 59: Omnichannel Return Logistics: Return Depot $\to$ Refurbishment $\to$ Restock
  * Lvl 60: Prime Broker Cross-Affiliate Margin Netting Hierarchy Collapse

---

### Discipline 7: ≶ NON-EQUI JOIN (Inequalities, Bands & As-Of Historical Joins) — 60 Problems
*Core Relational Concept: Joining with inequality operators (`>`, `<`, `BETWEEN`, `>=`, `<=`). Critical for fee schedules, progressive tax brackets, and point-in-time financial joins.*

* **Easy (Lvl 1 – 20)**:
  * Lvl 1: Employee Salaries Mapped to Corporate Salary Grade Bands
  * Lvl 2: Customer Purchase Volume Mapped to Loyalty Discount Tiers
  * Lvl 3: Progressive Income Tax Bracket Calculation for Annual Earnings
  * Lvl 4: Credit Score FICO Ranges Mapped to Interest Rate Offers
  * Lvl 5: Merchant Processing Volume Mapped to Interchange Fee Tiers
  * Lvl 6: Warehouse Package Weights Mapped to Freight Shipping Rate Brackets
  * Lvl 7: Subscription User Counts Mapped to Enterprise Tier Pricing Bands
  * Lvl 8: Bond Yield Spreads Mapped to Credit Default Risk Buckets
  * Lvl 9: Student Exam Percentage Scores Mapped to Letter Grade Bands
  * Lvl 10: Vendor Order Quantities Mapped to Wholesale Volume Discount Bands
  * Lvl 11: Real Estate Property Square Footage Mapped to Property Tax Tiers
  * Lvl 12: Credit Card Revolving Balances Mapped to Minimum Payment Tiers
  * Lvl 13: Airline Flight Mileage Mapped to Frequent Flyer Reward Tier Tiers
  * Lvl 14: Hospital Patient Triage Vital Signs Mapped to Emergency Acuity Levels
  * Lvl 15: SaaS API Monthly Call Volume Mapped to Overage Billing Tiers
  * Lvl 16: Government Treasury Bill Maturities Mapped to Yield Curve Buckets
  * Lvl 17: E-Commerce Basket Total Mapped to Free Shipping Eligibility Tiers
  * Lvl 18: Hotel Room Lead Time Booking Days Mapped to Advance Purchase Rates
  * Lvl 19: Insurance Driver Age & Driving Record Mapped to Premium Surcharge Bands
  * Lvl 20: Digital Wallet Transfer Amounts Mapped to Anti-Fraud Velocity Risk Bands
* **Medium (Lvl 21 – 40)**:
  * Lvl 21: Slowly Changing Dimensions (SCD Type 2): As-Of Customer Address Lookup
  * Lvl 22: Point-in-Time Historical Stock Pricing: Trade Execution As-Of Price
  * Lvl 23: Credit Limit History As-Of Transaction Timestamp Audit
  * Lvl 24: Employee Department Transfer History: Expense As-Of Department Assignment
  * Lvl 25: Fixed Income Benchmark Rebalancing: Holdings As-Of Index Effective Dates
  * Lvl 26: Healthcare Patient Medication Dosages As-Of Prescription Effective Window
  * Lvl 27: Supply Chain Supplier Contract Pricing As-Of Purchase Order Issue Date
  * Lvl 28: FX Forward Contract Valuation As-Of Specific Currency Fix Dates
  * Lvl 29: Loan Interest Rate Adjustments As-Of Benchmark LIBOR/SOFR Reset Dates
  * Lvl 30: SaaS Subscription Tier Changes: Usage Billed As-Of Active Plan Interval
  * Lvl 31: Retail Dynamic Pricing: Sales Transactions As-Of Promotional Price Windows
  * Lvl 32: Options Strike Volatility Surface Lookup As-Of Market Tick Time
  * Lvl 33: Delivery Driver Hourly Pay Rate As-Of Specific Surge Pricing Windows
  * Lvl 34: VC Portfolio Valuation As-Of Last Financing Round Date
  * Lvl 35: Mortgage Escrow Insurance Premiums As-Of Annual Policy Effective Period
  * Lvl 36: Corporate Tax Rates As-Of Multi-Jurisdiction Statutory Fiscal Years
  * Lvl 37: Telecom Roaming Tariff Rates As-Of Call Timestamp Interval
  * Lvl 38: Wealth Management Fee Schedules As-Of Assets Under Management (AUM) Tier
  * Lvl 39: Digital Ad Bidding Rates As-Of Hourly Auction Time Window
  * Lvl 40: Merchant Chargeback Liability Period: Claims Filed Within 90 Days of Charge
* **Hard (Lvl 41 – 60)**:
  * Lvl 41: Nanosecond As-Of Order Book Top-of-Book Matching for Trade Executions
  * Lvl 42: Continuous Linked Settlement (CLS) As-Of Multilateral Netting Windows
  * Lvl 43: Depository Collateral Valuation As-Of Haircut Schedule Changes
  * Lvl 44: Cross-Border Tax Treaty Withholding Rates As-Of Dividend Payment Date
  * Lvl 45: Bank Reserve Adequacy As-Of Intraday Liquidity Stress Windows
  * Lvl 46: Collateralized Debt Obligation (CDO) Cashflow Reinvestment Window Mapping
  * Lvl 47: Algorithmic VWAP Benchmark Execution Window As-Of Order Slices
  * Lvl 48: Regulatory Basel III Capital Charge Rates As-Of Counterparty Rating Transitions
  * Lvl 49: Private Equity Capital Call Notice As-Of Hurdle Rate Catch-up Intervals
  * Lvl 50: Anti-Fraud Temporal Proximity: Account Takeover Followed by Withdrawal Within 15 Mins
  * Lvl 51: Credit Default Swap (CDS) Auction Settlement Price As-Of Credit Event Notice
  * Lvl 52: Margin Call Variation Margin True-Up As-Of Daily Mark-to-Market Feeds
  * Lvl 53: Energy Grid Real-Time Locational Marginal Pricing (LMP) As-Of Dispatch Intervals
  * Lvl 54: Commercial Real Estate Lease Escalation Clauses As-Of Tenancy Anniversary Dates
  * Lvl 55: Reinsurance Treaty Excess of Loss Attachment As-Of Catastrophe Occurrence Date
  * Lvl 56: Cloud Infrastructure Spot Instance Dynamic Pricing As-Of Running Workload Minutes
  * Lvl 57: Global Securities Lending Dividend Compensation As-Of Record Date Intervals
  * Lvl 58: Quantitative Factor Alpha Signal Decay Curve: Signals As-Of Forward Return Horizon
  * Lvl 59: Omnichannel Order Fulfillment Window: Orders Assigned to Next Available Carrier Wave
  * Lvl 60: Prime Broker Cross-Margin Haircut Matrix As-Of Historical Volatility Spikes

---

## 🎯 3. Where to Access This in the Codebase & Visualizer

1. **In the Web App**: Open `http://localhost:8000/visualizer/index.html` $\to$ click **Section 05: Relational JOINs Arena (420 Quests)**.
2. **In Source Code**: [visualizer/quests_section5_data.js](file:///i:/sqlmastery(github)/sql-mastery/visualizer/quests_section5_data.js) (Data Vault) and [visualizer/app.js](file:///i:/sqlmastery(github)/sql-mastery/visualizer/app.js) (Matrix Rendering Engine).
3. **In Day 08 Interview Prep**: [day-08-basic-joins/INTERVIEW_QUESTIONS.md](file:///i:/sqlmastery(github)/sql-mastery/day-08-basic-joins/INTERVIEW_QUESTIONS.md).
