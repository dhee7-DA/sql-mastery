// =============================================================================
// PART 6: FULL OUTER JOIN (35 DISTINCT CASES: 11 Easy, 12 Medium, 12 Hard)
// Bidirectional Dual-Ledger Reconciliation & Discrepancy Audits Across 10 Industries
// Pattern: TableA a FULL OUTER JOIN TableB b ON a.id = b.id + COALESCE(a.id, b.id)
// =============================================================================

module.exports = [
  // --- FINTECH ---
  {
    title: "Internal Bank Ledger vs External Stripe Settlement Clearing Records",
    ind: "Fintech",
    diff: "Easy",
    table: "InternalBankLedger",
    scenario: "Performing daily end-of-day cash reconciliation between internal application payment records and external Stripe merchant settlement payout batches.",
    businessObjective: "Full outer join InternalBankLedger to StripeSettlements on charge_id to categorize records into MATCHED, INTERNAL_ONLY, and STRIPE_ONLY.",
    schemaSnippet: "`InternalBankLedger (charge_id VARCHAR(32) PRIMARY KEY, internal_amount DECIMAL(10,2))` & `StripeSettlements (charge_id VARCHAR(32) PRIMARY KEY, settled_amount DECIMAL(10,2))`",
    targetQuery: `SELECT COALESCE(i.charge_id, s.charge_id) AS unified_charge_id,\n       i.internal_amount,\n       s.settled_amount,\n       CASE\n         WHEN i.charge_id IS NOT NULL AND s.charge_id IS NOT NULL THEN 'RECONCILED_MATCH'\n         WHEN i.charge_id IS NOT NULL THEN 'INTERNAL_LEDGER_ONLY_PENDING_STRIPE'\n         ELSE 'STRIPE_SETTLED_MISSING_FROM_INTERNAL_BOOKS'\n       END AS reconciliation_disposition\nFROM InternalBankLedger i\nFULL OUTER JOIN StripeSettlements s\n  ON i.charge_id = s.charge_id\nORDER BY unified_charge_id ASC;`,
    eli5Story: "Laying our internal cash register book side-by-side with Stripe's bank deposit statement. If both agree, great. If we have a sale Stripe didn't deposit, or Stripe took a fee we didn't write down, flag it!",
    commonMistakes: "Selecting i.charge_id directly instead of COALESCE(i.charge_id, s.charge_id), which produces NULL IDs for rows that only existed in Stripe.",
    learningOutcomes: "Master symmetric dual-ledger reconciliation using COALESCE unified keys and outer join conditional tagging."
  },
  {
    title: "Broker Trading Orders vs Stock Exchange Gateway Execution Fill Feeds",
    ind: "Fintech",
    diff: "Medium",
    table: "BrokerOrders",
    scenario: "Auditing trade execution slippage by matching broker-routed stock orders against official Nasdaq/NYSE trade execution gateway drop-copy feeds.",
    businessObjective: "Full outer join BrokerOrders to ExchangeFills on order_id to detect unexecuted orders, ghost fills, and execution price variances.",
    schemaSnippet: "`BrokerOrders (order_id VARCHAR(32) PRIMARY KEY, client_acct VARCHAR(32), ordered_shares INT, limit_price DECIMAL(10,2))` & `ExchangeFills (order_id VARCHAR(32) PRIMARY KEY, executed_shares INT, fill_price DECIMAL(10,2))`",
    targetQuery: `SELECT COALESCE(b.order_id, e.order_id) AS order_id,\n       b.ordered_shares, e.executed_shares,\n       b.limit_price, e.fill_price,\n       CASE\n         WHEN b.order_id IS NOT NULL AND e.order_id IS NOT NULL THEN 'EXECUTED_FILL'\n         WHEN b.order_id IS NOT NULL THEN 'PENDING_UNFILLED_ORDER'\n         ELSE 'UNMAPPED_GHOST_FILL_CRITICAL_AUDIT'\n       END AS trade_status\nFROM BrokerOrders b\nFULL OUTER JOIN ExchangeFills e\n  ON b.order_id = e.order_id\nORDER BY order_id ASC;`,
    eli5Story: "Comparing our trading desk order book with the stock exchange's trade receipts. If the exchange says they bought shares for an order our system has no record of, investigate immediately!",
    commonMistakes: "Using an INNER JOIN which silently hides both unfilled customer orders and dangerous unmapped exchange fills.",
    learningOutcomes: "Detect trade execution discrepancies and orphan fills using full outer join audits."
  },
  {
    title: "Card Issuer Authorization Holds vs Settled Merchant Clearing Batches",
    ind: "Fintech",
    diff: "Hard",
    table: "IssuerAuthHolds",
    scenario: "Reconciling credit card temporary authorization holds against actual merchant capture settlement files across a 7-day rolling window.",
    businessObjective: "Full outer join IssuerAuthHolds to MerchantCaptures on auth_code to calculate expired uncaptured holds and forced post-settlements.",
    schemaSnippet: "`IssuerAuthHolds (auth_code VARCHAR(16) PRIMARY KEY, card_id VARCHAR(32), hold_amount_usd DECIMAL(10,2), hold_date DATE)` & `MerchantCaptures (auth_code VARCHAR(16) PRIMARY KEY, captured_amount_usd DECIMAL(10,2), capture_date DATE)`",
    targetQuery: `SELECT COALESCE(h.auth_code, m.auth_code) AS auth_code,\n       h.hold_amount_usd, m.captured_amount_usd,\n       ROUND(COALESCE(m.captured_amount_usd, 0.00) - COALESCE(h.hold_amount_usd, 0.00), 2) AS settlement_delta,\n       CASE\n         WHEN h.auth_code IS NOT NULL AND m.auth_code IS NOT NULL THEN 'SETTLED_HOLD'\n         WHEN h.auth_code IS NOT NULL THEN 'EXPIRED_UNCAPTURED_HOLD'\n         ELSE 'FORCED_CAPTURE_NO_PRIOR_AUTH'\n       END AS settlement_classification\nFROM IssuerAuthHolds h\nFULL OUTER JOIN MerchantCaptures m\n  ON h.auth_code = m.auth_code\nORDER BY ABS(COALESCE(m.captured_amount_usd, 0.00) - COALESCE(h.hold_amount_usd, 0.00)) DESC;`,
    eli5Story: "Comparing gas station temporary $1 holds with the final $45 gas bill. If the hold never cleared, release the customer's funds; if money cleared without an authorization, flag it for fraud.",
    commonMistakes: "Subtracting h.hold_amount_usd directly without COALESCE, turning the delta to NULL whenever a row exists on only one side.",
    learningOutcomes: "Compute bidirectional financial deltas using full outer joins with COALESCE math."
  },
  {
    title: "Federal Reserve Fedwire Settlement File vs Internal Nostro Account Entries",
    ind: "Fintech",
    diff: "Medium",
    table: "FedwireFeed",
    scenario: "Reconciling foreign exchange bank nostro cash balances with central bank daily gross settlement (RTGS) wire logs.",
    businessObjective: "Full outer join FedwireFeed to NostroLedger on wire_imad to detect settlement breaks between correspondent banks.",
    schemaSnippet: "`FedwireFeed (wire_imad VARCHAR(24) PRIMARY KEY, fed_amount DECIMAL(14,2))` & `NostroLedger (wire_imad VARCHAR(24) PRIMARY KEY, nostro_amount DECIMAL(14,2))`",
    targetQuery: `SELECT COALESCE(f.wire_imad, n.wire_imad) AS wire_imad,\n       f.fed_amount, n.nostro_amount,\n       CASE\n         WHEN f.fed_amount = n.nostro_amount THEN 'BALANCED'\n         WHEN f.wire_imad IS NOT NULL AND n.wire_imad IS NOT NULL THEN 'AMOUNT_MISMATCH_BREAK'\n         WHEN f.wire_imad IS NOT NULL THEN 'FEDWIRE_UNMATCHED'\n         ELSE 'NOSTRO_UNMATCHED'\n       END AS break_status\nFROM FedwireFeed f\nFULL OUTER JOIN NostroLedger n\n  ON f.wire_imad = n.wire_imad\nWHERE f.fed_amount <> n.nostro_amount\n   OR f.wire_imad IS NULL\n   OR n.wire_imad IS NULL\nORDER BY wire_imad ASC;`,
    eli5Story: "Checking multi-million dollar bank wire balances between our internal accounting team and the Federal Reserve, isolating every wire where amounts don't match.",
    commonMistakes: "Using WHERE f.fed_amount <> n.nostro_amount alone, which drops rows where either side is NULL because NULL <> 100 evaluates to UNKNOWN.",
    learningOutcomes: "Filter full outer join discrepancy breaks using three-valued logic awareness."
  },

  // --- SAAS ---
  {
    title: "Customer Billing Database Subscriptions vs Stripe Webhook Events",
    ind: "SaaS",
    diff: "Easy",
    table: "AppSubscriptions",
    scenario: "Auditing billing synchronization by comparing customer subscription states in the internal MySQL database with inbound Stripe webhook events.",
    businessObjective: "Full outer join AppSubscriptions to StripeWebhooks on subscription_id to detect desynchronized billing state records.",
    schemaSnippet: "`AppSubscriptions (subscription_id VARCHAR(32) PRIMARY KEY, internal_status VARCHAR(20))` & `StripeWebhooks (subscription_id VARCHAR(32) PRIMARY KEY, stripe_status VARCHAR(20))`",
    targetQuery: `SELECT COALESCE(a.subscription_id, s.subscription_id) AS sub_id,\n       a.internal_status, s.stripe_status,\n       CASE\n         WHEN a.internal_status = s.stripe_status THEN 'SYNCHRONIZED'\n         WHEN a.subscription_id IS NULL THEN 'MISSING_IN_APP_DATABASE'\n         WHEN s.subscription_id IS NULL THEN 'MISSING_IN_STRIPE_FEED'\n         ELSE 'STATUS_MISMATCH_OUT_OF_SYNC'\n       END AS sync_audit_flag\nFROM AppSubscriptions a\nFULL OUTER JOIN StripeWebhooks s\n  ON a.subscription_id = s.subscription_id\nORDER BY sync_audit_flag DESC;`,
    eli5Story: "Making sure our app knows when a customer cancels their subscription on Stripe so we don't accidentally keep giving them free premium access.",
    commonMistakes: "Assuming webhooks always arrive in order; full outer join surfaces orphaned events where webhooks arrived before database records.",
    learningOutcomes: "Identify distributed system state drift between internal databases and third-party SaaS billing webhooks."
  },
  {
    title: "AWS CloudWatch Provisioned EC2 Instances vs FinOps Tagging Directory",
    ind: "SaaS",
    diff: "Medium",
    table: "CloudWatchInstances",
    scenario: "Finding untagged rogue cloud servers by comparing live AWS CloudWatch running instance IDs with FinOps cost allocation tagging databases.",
    businessObjective: "Full outer join CloudWatchInstances to FinOpsTags on instance_id to identify active servers lacking cost center tags.",
    schemaSnippet: "`CloudWatchInstances (instance_id VARCHAR(19) PRIMARY KEY, instance_type VARCHAR(16), monthly_cost_usd DECIMAL(8,2))` & `FinOpsTags (instance_id VARCHAR(19) PRIMARY KEY, cost_center VARCHAR(32), owner_team VARCHAR(32))`",
    targetQuery: `SELECT COALESCE(c.instance_id, f.instance_id) AS instance_id,\n       c.instance_type, c.monthly_cost_usd,\n       f.cost_center, f.owner_team,\n       CASE\n         WHEN c.instance_id IS NOT NULL AND f.instance_id IS NOT NULL THEN 'TAGGED_AND_ACTIVE'\n         WHEN c.instance_id IS NOT NULL THEN 'ROGUE_UNTAGGED_RUNNING_COST'\n         ELSE 'GHOST_TAGGED_DECOMMISSIONED'\n       END AS cloud_audit_status\nFROM CloudWatchInstances c\nFULL OUTER JOIN FinOpsTags f\n  ON c.instance_id = f.instance_id\nORDER BY c.monthly_cost_usd DESC;`,
    eli5Story: "Finding mystery cloud servers costing $5,000/month that someone turned on without writing their name or team on the budget tag.",
    commonMistakes: "Using LEFT JOIN which ignores decommissioned ghost servers that still have active billing tags.",
    learningOutcomes: "Conduct bidirectional cloud asset FinOps governance audits using full outer joins."
  },
  {
    title: "CRM Salesforce Pipeline Opportunities vs Invoiced ERP Billings",
    ind: "SaaS",
    diff: "Hard",
    table: "SalesforceDeals",
    scenario: "Bridging sales and accounting by reconciling closed-won opportunities in Salesforce CRM against official invoices billed in NetSuite ERP.",
    businessObjective: "Full outer join SalesforceDeals to NetsuiteInvoices on contract_id to calculate sales bookings vs accounting recognized billing variances.",
    schemaSnippet: "`SalesforceDeals (contract_id VARCHAR(32) PRIMARY KEY, rep_name VARCHAR(100), booked_arr_usd DECIMAL(12,2))` & `NetsuiteInvoices (contract_id VARCHAR(32) PRIMARY KEY, billed_arr_usd DECIMAL(12,2))`",
    targetQuery: `SELECT COALESCE(s.contract_id, n.contract_id) AS contract_id,\n       s.rep_name,\n       s.booked_arr_usd, n.billed_arr_usd,\n       ROUND(COALESCE(s.booked_arr_usd, 0.00) - COALESCE(n.billed_arr_usd, 0.00), 2) AS arr_variance_usd,\n       CASE\n         WHEN s.contract_id IS NOT NULL AND n.contract_id IS NOT NULL THEN 'RECONCILED_BOOKED_AND_BILLED'\n         WHEN s.contract_id IS NOT NULL THEN 'BOOKED_NOT_YET_INVOICED'\n         ELSE 'BILLED_WITHOUT_CRM_RECORD'\n       END AS rev_rec_status\nFROM SalesforceDeals s\nFULL OUTER JOIN NetsuiteInvoices n\n  ON s.contract_id = n.contract_id\nORDER BY ABS(COALESCE(s.booked_arr_usd, 0.00) - COALESCE(n.billed_arr_usd, 0.00)) DESC;`,
    eli5Story: "Comparing what the sales reps claim they sold on Salesforce with what accounting actually collected on the official company invoices.",
    commonMistakes: "Subtracting without COALESCE, hiding deals that were booked but not yet invoiced.",
    learningOutcomes: "Reconcile sales bookings against accounting revenue recognition schedules."
  },
  {
    title: "Kubernetes Desired Replica Counts vs Running Pod Telemetry",
    ind: "SaaS",
    diff: "Easy",
    table: "DeploymentSpecs",
    scenario: "Detecting cluster deployment anomalies by comparing desired replica pod counts in GitOps deployment manifests with actual running pods.",
    businessObjective: "Full outer join DeploymentSpecs to RunningPods on deployment_name to identify crash-looping or over-provisioned deployments.",
    schemaSnippet: "`DeploymentSpecs (deployment_name VARCHAR(64) PRIMARY KEY, desired_replicas INT)` & `RunningPods (deployment_name VARCHAR(64) PRIMARY KEY, running_pod_count INT)`",
    targetQuery: `SELECT COALESCE(d.deployment_name, r.deployment_name) AS deployment_name,\n       d.desired_replicas, r.running_pod_count,\n       CASE\n         WHEN d.desired_replicas = r.running_pod_count THEN 'HEALTHY_SYNC'\n         WHEN r.running_pod_count = 0 THEN 'CRITICAL_ZERO_PODS_OUTAGE'\n         WHEN r.running_pod_count < d.desired_replicas THEN 'UNDER_PROVISIONED_CRASH_LOOP'\n         ELSE 'OVER_PROVISIONED'\n       END AS k8s_cluster_health\nFROM DeploymentSpecs d\nFULL OUTER JOIN RunningPods r\n  ON d.deployment_name = r.deployment_name\nORDER BY deployment_name ASC;`,
    eli5Story: "Checking if our website server pods are running as promised. If we asked Kubernetes for 10 pods but only 2 are running, sound the alarm!",
    commonMistakes: "Using an INNER JOIN which completely misses crashed services that have 0 running pods.",
    learningOutcomes: "Audit containerized cluster state convergence using outer join comparisons."
  },

  // --- RETAIL ---
  {
    title: "Shopify E-Commerce Orders vs 3PL Warehouse Fulfillment Orders",
    ind: "Retail",
    diff: "Easy",
    table: "ShopifyOrders",
    scenario: "Ensuring customer orders are fulfilled by reconciling online storefront purchases with 3PL logistics warehouse fulfillment manifests.",
    businessObjective: "Full outer join ShopifyOrders to WarehouseFulfillments on order_id to detect lost orders or unauthorized warehouse shipments.",
    schemaSnippet: "`ShopifyOrders (order_id VARCHAR(32) PRIMARY KEY, order_total_usd DECIMAL(10,2))` & `WarehouseFulfillments (order_id VARCHAR(32) PRIMARY KEY, fulfillment_status VARCHAR(20))`",
    targetQuery: `SELECT COALESCE(s.order_id, w.order_id) AS order_id,\n       s.order_total_usd, w.fulfillment_status,\n       CASE\n         WHEN s.order_id IS NOT NULL AND w.order_id IS NOT NULL THEN 'ORDER_FULFILLED'\n         WHEN s.order_id IS NOT NULL THEN 'SHOPIFY_PAID_AWAITING_WAREHOUSE_PICK'\n         ELSE 'WAREHOUSE_SHIPPED_NO_SHOPIFY_RECORD_GHOST'\n       END AS fulfillment_audit_status\nFROM ShopifyOrders s\nFULL OUTER JOIN WarehouseFulfillments w\n  ON s.order_id = w.order_id\nORDER BY order_id ASC;`,
    eli5Story: "Checking if orders placed on our website made it to the warehouse packing desk, and making sure the warehouse didn't ship boxes without an online order.",
    commonMistakes: "Assuming all orders flow to the warehouse instantly, ignoring network API sync latency.",
    learningOutcomes: "Detect e-commerce fulfillment breaks using symmetric outer joins."
  },
  {
    title: "Store Physical Stock Counts vs POS Perpetual Inventory Ledger",
    ind: "Retail",
    diff: "Hard",
    table: "PhysicalStockCount",
    scenario: "Auditing retail inventory shrinkage and employee theft by comparing annual physical shelf inventory scans against POS perpetual inventory logs.",
    businessObjective: "Full outer join PhysicalStockCount to PerpetualInventory on sku to calculate shrinkage units and dollar inventory write-offs.",
    schemaSnippet: "`PhysicalStockCount (sku VARCHAR(32) PRIMARY KEY, counted_units INT, unit_cost_usd DECIMAL(8,2))` & `PerpetualInventory (sku VARCHAR(32) PRIMARY KEY, book_units INT)`",
    targetQuery: `SELECT COALESCE(p.sku, b.sku) AS sku,\n       COALESCE(p.counted_units, 0) AS physical_shelf_count,\n       COALESCE(b.book_units, 0) AS computer_book_count,\n       (COALESCE(p.counted_units, 0) - COALESCE(b.book_units, 0)) AS inventory_shrinkage_units,\n       ROUND((COALESCE(p.counted_units, 0) - COALESCE(b.book_units, 0)) * COALESCE(p.unit_cost_usd, 15.00), 2) AS shrinkage_financial_impact_usd\nFROM PhysicalStockCount p\nFULL OUTER JOIN PerpetualInventory b\n  ON p.sku = b.sku\nWHERE COALESCE(p.counted_units, 0) <> COALESCE(b.book_units, 0)\nORDER BY shrinkage_financial_impact_usd ASC;`,
    eli5Story: "Comparing the number of jeans workers counted on the store shelves with what the computer system thought was in stock, calculating how many were stolen or lost.",
    commonMistakes: "Using INNER JOIN which completely ignores SKUs that were completely stolen (physical count = 0, no record in physical scan table).",
    learningOutcomes: "Compute inventory shrinkage adjustments and financial balance sheet write-offs using full outer joins."
  },
  {
    title: "Supplier Delivery Packing Slips vs Received Inbound Dock Scans",
    ind: "Retail",
    diff: "Medium",
    table: "SupplierPackingSlips",
    scenario: "Reconciling supplier delivery manifests against dock barcode receiving scans to catch misplaced pallets and missing merchandise cartons.",
    businessObjective: "Full outer join SupplierPackingSlips to DockScans on carton_barcode to identify missing cartons and overage cartons.",
    schemaSnippet: "`SupplierPackingSlips (carton_barcode VARCHAR(32) PRIMARY KEY, expected_items INT)` & `DockScans (carton_barcode VARCHAR(32) PRIMARY KEY, scanned_items INT)`",
    targetQuery: `SELECT COALESCE(s.carton_barcode, d.carton_barcode) AS carton_barcode,\n       s.expected_items, d.scanned_items,\n       CASE\n         WHEN s.carton_barcode IS NOT NULL AND d.carton_barcode IS NOT NULL THEN 'MATCHED_CARTON'\n         WHEN s.carton_barcode IS NOT NULL THEN 'MISSING_IN_TRANSIT_SHORTAGE'\n         ELSE 'EXTRA_OVERAGE_UNMANIFESTED_CARTON'\n       END AS receiving_disposition\nFROM SupplierPackingSlips s\nFULL OUTER JOIN DockScans d\n  ON s.carton_barcode = d.carton_barcode\nORDER BY receiving_disposition ASC;`,
    eli5Story: "Checking every box that came off the delivery truck against the supplier's packing paper to see which boxes are missing and which extra boxes were sent by mistake.",
    commonMistakes: "Using an INNER JOIN which only shows the cartons that matched perfectly, hiding all discrepancies.",
    learningOutcomes: "Identify logistics receiving shortages and overages via full outer joins."
  },

  // --- HEALTHCARE ---
  {
    title: "Electronic Health Record Encounters vs External Pathology Diagnostic Lab Results",
    ind: "Healthcare",
    diff: "Medium",
    table: "EhrEncounters",
    scenario: "Reconciling hospital inpatient diagnostic orders with external pathology laboratory diagnostic reports to ensure no test results were lost.",
    businessObjective: "Full outer join EhrEncounters to PathologyResults on lab_order_id to detect unreturned pathology results and unlinked lab reports.",
    schemaSnippet: "`EhrEncounters (lab_order_id VARCHAR(32) PRIMARY KEY, patient_mrn VARCHAR(16), ordered_test VARCHAR(64))` & `PathologyResults (lab_order_id VARCHAR(32) PRIMARY KEY, diagnostic_result VARCHAR(100), specimen_status VARCHAR(16))`",
    targetQuery: `SELECT COALESCE(e.lab_order_id, p.lab_order_id) AS lab_order_id,\n       e.patient_mrn, e.ordered_test, p.diagnostic_result,\n       CASE\n         WHEN e.lab_order_id IS NOT NULL AND p.lab_order_id IS NOT NULL THEN 'RESULTS_INTEGRATED'\n         WHEN e.lab_order_id IS NOT NULL THEN 'PENDING_LAB_RETURN_OVERDUE'\n         ELSE 'UNLINKED_LAB_RESULT_CRITICAL_PATIENT_SAFETY'\n       END AS clinical_audit_status\nFROM EhrEncounters e\nFULL OUTER JOIN PathologyResults p\n  ON e.lab_order_id = p.lab_order_id\nORDER BY clinical_audit_status DESC;`,
    eli5Story: "Making sure the blood and biopsy test results sent to an outside lab came back into the patient's medical file so doctors don't miss a cancer diagnosis.",
    commonMistakes: "Missing unlinked lab results that came back from the lab with a typo in the order number, endangering patient safety.",
    learningOutcomes: "Ensure patient safety and diagnostic continuity using clinical full outer join audits."
  },
  {
    title: "Hospital Bed Occupancy Roster vs Central Nursing Station Telemetry",
    ind: "Healthcare",
    diff: "Hard",
    table: "BedRoster",
    scenario: "Auditing hospital room utilization by comparing the official patient room admission directory with central nursing station bedside vital monitor heartbeats.",
    businessObjective: "Full outer join BedRoster to BedsideTelemetry on bed_id to identify ghost admissions and patients placed in unregistered beds.",
    schemaSnippet: "`BedRoster (bed_id VARCHAR(16) PRIMARY KEY, patient_mrn VARCHAR(16), admitted_ward VARCHAR(32))` & `BedsideTelemetry (bed_id VARCHAR(16) PRIMARY KEY, monitor_online BOOLEAN, pulse_rate INT)`",
    targetQuery: `SELECT COALESCE(b.bed_id, t.bed_id) AS bed_id,\n       b.patient_mrn, b.admitted_ward,\n       t.pulse_rate,\n       CASE\n         WHEN b.bed_id IS NOT NULL AND t.bed_id IS NOT NULL THEN 'OCCUPIED_AND_MONITORED'\n         WHEN b.bed_id IS NOT NULL THEN 'PATIENT_RECORDED_MONITOR_DISCONNECTED'\n         ELSE 'ACTIVE_MONITOR_GHOST_PATIENT_UNREGISTERED'\n       END AS bed_safety_status\nFROM BedRoster b\nFULL OUTER JOIN BedsideTelemetry t\n  ON b.bed_id = t.bed_id\nORDER BY bed_safety_status ASC;`,
    eli5Story: "Checking if a hospital bed that has a patient listed on paper actually has a person lying in it with a working heart monitor attached.",
    commonMistakes: "Using an INNER JOIN which leaves out empty beds with active alarms or patients whose monitors got accidentally unplugged.",
    learningOutcomes: "Audit patient physical presence and telemetry connectivity using hospital full outer joins."
  },
  {
    title: "State Prescription Monitoring Program (PMP) vs Internal Hospital Pharmacy Dispensations",
    ind: "Healthcare",
    diff: "Easy",
    table: "PmpStateDatabase",
    scenario: "Auditing controlled substance compliance by comparing state-level controlled substance registry filings against internal hospital pharmacy dispensation logs.",
    businessObjective: "Full outer join PmpStateDatabase to HospitalDispensations on rx_number to detect reporting compliance failures.",
    schemaSnippet: "`PmpStateDatabase (rx_number VARCHAR(20) PRIMARY KEY, state_pills_reported INT)` & `HospitalDispensations (rx_number VARCHAR(20) PRIMARY KEY, hospital_pills_dispensed INT)`",
    targetQuery: `SELECT COALESCE(s.rx_number, h.rx_number) AS rx_number,\n       s.state_pills_reported, h.hospital_pills_dispensed,\n       CASE\n         WHEN s.state_pills_reported = h.hospital_pills_dispensed THEN 'COMPLIANT'\n         WHEN s.rx_number IS NOT NULL AND h.rx_number IS NOT NULL THEN 'QUANTITY_DISCREPANCY'\n         WHEN h.rx_number IS NOT NULL THEN 'FAILED_TO_REPORT_TO_STATE_VIOLATION'\n         ELSE 'STATE_HAS_RECORD_MISSING_IN_HOSPITAL'\n       END AS compliance_disposition\nFROM PmpStateDatabase s\nFULL OUTER JOIN HospitalDispensations h\n  ON s.rx_number = h.rx_number\nORDER BY compliance_disposition DESC;`,
    eli5Story: "Comparing our hospital pharmacy pill records with the state government's drug database to make sure every single painkiller was reported accurately.",
    commonMistakes: "Failing to flag medications that were dispensed internally but never transmitted to the state monitoring database.",
    learningOutcomes: "Enforce pharmaceutical legal compliance reporting using full outer join audits."
  },

  // --- LOGISTICS ---
  {
    title: "Carrier Billed Freight Invoices vs Receiver Logged Dock Manifests",
    ind: "Logistics",
    diff: "Medium",
    table: "CarrierInvoices",
    scenario: "Auditing freight billing by comparing trucking carrier billed charges against destination warehouse received dock manifests.",
    businessObjective: "Full outer join CarrierInvoices to DockManifests on pro_tracking_number to detect ghost freight bills and unbilled freight deliveries.",
    schemaSnippet: "`CarrierInvoices (pro_number VARCHAR(32) PRIMARY KEY, carrier_name VARCHAR(64), invoice_amount_usd DECIMAL(10,2))` & `DockManifests (pro_number VARCHAR(32) PRIMARY KEY, weight_delivered_lbs INT)`",
    targetQuery: `SELECT COALESCE(c.pro_number, d.pro_number) AS pro_number,\n       c.carrier_name, c.invoice_amount_usd, d.weight_delivered_lbs,\n       CASE\n         WHEN c.pro_number IS NOT NULL AND d.pro_number IS NOT NULL THEN 'RECONCILED_BILL_AND_DELIVERY'\n         WHEN c.pro_number IS NOT NULL THEN 'BILLED_WITHOUT_PROOF_OF_DELIVERY'\n         ELSE 'DELIVERED_PENDING_CARRIER_INVOICE'\n       END AS freight_audit_flag\nFROM CarrierInvoices c\nFULL OUTER JOIN DockManifests d\n  ON c.pro_number = d.pro_number\nORDER BY freight_audit_flag ASC;`,
    eli5Story: "Making sure a freight trucking company doesn't bill us for deliveries that never arrived at our warehouse.",
    commonMistakes: "Paying carrier freight bills without verifying delivery proof against dock manifests.",
    learningOutcomes: "Execute freight audit reconciliation workflows via full outer joins."
  },
  {
    title: "Ocean Freight Booking Confirmations vs Container Terminal Gate In-Gate Scans",
    ind: "Logistics",
    diff: "Easy",
    table: "BookingConfirmations",
    scenario: "Tracking sea container terminal congestion by reconciling booked container export reservations with actual physical gate in-gate truck drop-offs.",
    businessObjective: "Full outer join BookingConfirmations to TerminalGateScans on container_number to identify no-show bookings and unbooked gate arrivals.",
    schemaSnippet: "`BookingConfirmations (container_number VARCHAR(11) PRIMARY KEY, booking_reference VARCHAR(32))` & `TerminalGateScans (container_number VARCHAR(11) PRIMARY KEY, in_gate_timestamp TIMESTAMP)`",
    targetQuery: `SELECT COALESCE(b.container_number, g.container_number) AS container_number,\n       b.booking_reference, g.in_gate_timestamp,\n       CASE\n         WHEN b.container_number IS NOT NULL AND g.container_number IS NOT NULL THEN 'CONTAINER_RECEIVED_FOR_VESSEL'\n         WHEN b.container_number IS NOT NULL THEN 'NO_SHOW_BOOKING_EMPTY_SLOT'\n         ELSE 'UNBOOKED_CONTAINER_GATE_REJECTION'\n       END AS terminal_gate_disposition\nFROM BookingConfirmations b\nFULL OUTER JOIN TerminalGateScans g\n  ON b.container_number = g.container_number\nORDER BY terminal_gate_disposition ASC;`,
    eli5Story: "Checking which shipping containers actually drove through the port gates for loading onto the cargo ship vs containers that canceled without telling us.",
    commonMistakes: "Using an INNER JOIN which omits container bookings where the truck never showed up.",
    learningOutcomes: "Track port terminal container gate flow using full outer join status classification."
  },

  // --- MEDIA ---
  {
    title: "Spotify Streaming Log vs Record Label Royalty Registry",
    ind: "Media",
    diff: "Hard",
    table: "SpotifyStreamLogs",
    scenario: "Auditing international music streaming royalties by reconciling daily stream play counts reported by Spotify with the record label master catalog.",
    businessObjective: "Full outer join SpotifyStreamLogs to MasterRoyaltyCatalog on isrc_code to detect unallocated royalties and unmonetized stream plays.",
    schemaSnippet: "`SpotifyStreamLogs (isrc_code VARCHAR(12) PRIMARY KEY, reported_streams BIGINT)` & `MasterRoyaltyCatalog (isrc_code VARCHAR(12) PRIMARY KEY, track_title VARCHAR(100), label_share_pct DECIMAL(5,2))`",
    targetQuery: `SELECT COALESCE(s.isrc_code, m.isrc_code) AS isrc_code,\n       m.track_title,\n       s.reported_streams, m.label_share_pct,\n       CASE\n         WHEN s.isrc_code IS NOT NULL AND m.isrc_code IS NOT NULL THEN 'MATCHED_AND_ALLOCATED'\n         WHEN s.isrc_code IS NOT NULL THEN 'UNCLAIMED_BLACK_BOX_ROYALTY_POOL'\n         ELSE 'CATALOG_TRACK_ZERO_STREAM_ACTIVITY'\n       END AS royalty_reconciliation_category\nFROM SpotifyStreamLogs s\nFULL OUTER JOIN MasterRoyaltyCatalog m\n  ON s.isrc_code = m.isrc_code\nORDER BY s.reported_streams DESC;`,
    eli5Story: "Finding streaming music money sitting in Spotify's 'black box' pool that belongs to our record label because of a typo in the song's digital code.",
    commonMistakes: "Using an INNER JOIN which completely ignores unclaimed black box streaming royalties.",
    learningOutcomes: "Reconcile digital music royalties and identify black box unallocated streaming revenue."
  },
  {
    title: "Digital Advertising Agency Ad Spend vs Publisher Verified Impressions",
    ind: "Media",
    diff: "Medium",
    table: "AgencyAdSpend",
    scenario: "Detecting digital ad fraud and impression under-delivery by reconciling media agency billed ad spend with publisher third-party verified impressions.",
    businessObjective: "Full outer join AgencyAdSpend to PublisherVerifiedLogs on campaign_id to compute impression delivery discrepancies.",
    schemaSnippet: "`AgencyAdSpend (campaign_id VARCHAR(32) PRIMARY KEY, billed_impressions INT, agency_cpm_usd DECIMAL(6,2))` & `PublisherVerifiedLogs (campaign_id VARCHAR(32) PRIMARY KEY, verified_impressions INT)`",
    targetQuery: `SELECT COALESCE(a.campaign_id, p.campaign_id) AS campaign_id,\n       a.billed_impressions, p.verified_impressions,\n       (COALESCE(a.billed_impressions, 0) - COALESCE(p.verified_impressions, 0)) AS impression_discrepancy,\n       CASE\n         WHEN ABS(COALESCE(a.billed_impressions, 0) - COALESCE(p.verified_impressions, 0)) <= 100 THEN 'RECONCILED'\n         WHEN a.billed_impressions > p.verified_impressions THEN 'AGENCY_OVERBILLING_CLAIM'\n         ELSE 'PUBLISHER_BONUS_OVER_DELIVERY'\n       END AS ad_delivery_status\nFROM AgencyAdSpend a\nFULL OUTER JOIN PublisherVerifiedLogs p\n  ON a.campaign_id = p.campaign_id\nORDER BY ABS(COALESCE(a.billed_impressions, 0) - COALESCE(p.verified_impressions, 0)) DESC;`,
    eli5Story: "Comparing what an ad agency charged us for banner ads vs what independent audit meters proved was actually shown on real people's phone screens.",
    commonMistakes: "Failing to allow an acceptable 100-impression measurement buffer before filing financial overbilling claims.",
    learningOutcomes: "Audit digital media ad campaigns using bidirectional impression reconciliation."
  },

  // --- SECURITY ---
  {
    title: "Active Directory Corporate Employee Roster vs Okta Identity SSO Directory",
    ind: "Security",
    diff: "Medium",
    table: "ActiveDirectoryUsers",
    scenario: "Maintaining corporate directory synchronization by comparing Windows Active Directory on-prem accounts with cloud Okta SSO directory accounts.",
    businessObjective: "Full outer join ActiveDirectoryUsers to OktaDirectory on work_email to identify orphaned accounts and synchronization breaks.",
    schemaSnippet: "`ActiveDirectoryUsers (work_email VARCHAR(100) PRIMARY KEY, ad_status VARCHAR(16))` & `OktaDirectory (work_email VARCHAR(100) PRIMARY KEY, okta_status VARCHAR(16))`",
    targetQuery: `SELECT COALESCE(a.work_email, o.work_email) AS work_email,\n       a.ad_status, o.okta_status,\n       CASE\n         WHEN a.work_email IS NOT NULL AND o.work_email IS NOT NULL THEN 'SYNCHRONIZED_IDENTITY'\n         WHEN a.work_email IS NOT NULL THEN 'ACTIVE_DIRECTORY_ONLY_PENDING_OKTA_SYNC'\n         ELSE 'ORPHANED_OKTA_ACCOUNT_POTENTIAL_SECURITY_RISK'\n       END AS identity_sync_state\nFROM ActiveDirectoryUsers a\nFULL OUTER JOIN OktaDirectory o\n  ON a.work_email = o.work_email\nORDER BY identity_sync_state DESC;`,
    eli5Story: "Making sure our cloud password system (Okta) and corporate office network (Active Directory) have the exact same list of employees.",
    commonMistakes: "Using LEFT JOIN which ignores orphaned Okta accounts where an employee was deleted from AD but still has active Okta access.",
    learningOutcomes: "Detect orphaned cloud identity accounts using bidirectional identity directory audits."
  },
  {
    title: "IT Asset Management (ITAM) CMDB Database vs CrowdStrike Live Host Sensor Feed",
    ind: "Security",
    diff: "Hard",
    table: "CmdbAssetDatabase",
    scenario: "Discovering shadow IT and zombie servers by comparing the ServiceNow CMDB hardware asset database against live CrowdStrike sensor heartbeats.",
    businessObjective: "Full outer join CmdbAssetDatabase to CrowdStrikeSensors on hostname to identify unmanaged shadow IT and decommissioned zombie assets.",
    schemaSnippet: "`CmdbAssetDatabase (hostname VARCHAR(64) PRIMARY KEY, asset_owner VARCHAR(64))` & `CrowdStrikeSensors (hostname VARCHAR(64) PRIMARY KEY, last_seen_ip VARCHAR(45))`",
    targetQuery: `SELECT COALESCE(c.hostname, s.hostname) AS hostname,\n       c.asset_owner, s.last_seen_ip,\n       CASE\n         WHEN c.hostname IS NOT NULL AND s.hostname IS NOT NULL THEN 'MANAGED_AND_PROTECTED'\n         WHEN c.hostname IS NOT NULL THEN 'CMDB_RECORDED_OFFLINE_OR_MISSING_SENSOR'\n         ELSE 'SHADOW_IT_UNMANAGED_ROGUE_DEVICE'\n       END AS itam_compliance_disposition\nFROM CmdbAssetDatabase c\nFULL OUTER JOIN CrowdStrikeSensors s\n  ON c.hostname = s.hostname\nORDER BY itam_compliance_disposition ASC;`,
    eli5Story: "Finding rogue server computers that someone plugged in under their desk that are running on our company network without IT knowing about them.",
    commonMistakes: "Using an INNER JOIN which only shows computers that are already registered and working properly.",
    learningOutcomes: "Identify shadow IT and unmanaged hardware assets via full outer join infrastructure scans."
  },

  // --- HARDWARE ---
  {
    title: "Assembly Line Work Orders vs Quality Inspection Station Acceptance Logs",
    ind: "Hardware",
    diff: "Easy",
    table: "FactoryWorkOrders",
    scenario: "Tracking factory assembly line throughput by reconciling scheduled manufacturing work orders against final quality assurance acceptance stamps.",
    businessObjective: "Full outer join FactoryWorkOrders to QaAcceptanceLogs on order_id to detect uninspected work orders and unrecorded production units.",
    schemaSnippet: "`FactoryWorkOrders (order_id VARCHAR(32) PRIMARY KEY, planned_units INT)` & `QaAcceptanceLogs (order_id VARCHAR(32) PRIMARY KEY, accepted_units INT)`",
    targetQuery: `SELECT COALESCE(w.order_id, q.order_id) AS order_id,\n       w.planned_units, q.accepted_units,\n       CASE\n         WHEN w.order_id IS NOT NULL AND q.order_id IS NOT NULL THEN 'INSPECTED'\n         WHEN w.order_id IS NOT NULL THEN 'IN_PRODUCTION_AWAITING_QA'\n         ELSE 'UNRECORDED_GHOST_PRODUCTION'\n       END AS production_status\nFROM FactoryWorkOrders w\nFULL OUTER JOIN QaAcceptanceLogs q\n  ON w.order_id = q.order_id\nORDER BY production_status ASC;`,
    eli5Story: "Making sure every batch of laptops scheduled on the assembly line got inspected by quality testing before leaving the factory.",
    commonMistakes: "Ignoring ghost production where factory operators built extra units without a formal work order.",
    learningOutcomes: "Reconcile manufacturing work order flow against quality inspection acceptance."
  },
  {
    title: "Silicon Wafer Cleanroom Lot Traveler vs Final Automated Test Equipment (ATE) Yield",
    ind: "Hardware",
    diff: "Hard",
    table: "WaferLotTraveler",
    scenario: "Reconciling semiconductor cleanroom manufacturing travelers against final ATE automated tester die yield outputs to detect lost wafer boats.",
    businessObjective: "Full outer join WaferLotTraveler to AteYieldLogs on lot_id to identify wafer manufacturing shrinkage and unlinked tester test files.",
    schemaSnippet: "`WaferLotTraveler (lot_id VARCHAR(32) PRIMARY KEY, wafers_started INT, fab_line VARCHAR(16))` & `AteYieldLogs (lot_id VARCHAR(32) PRIMARY KEY, wafers_tested INT, passing_dies BIGINT)`",
    targetQuery: `SELECT COALESCE(t.lot_id, y.lot_id) AS lot_id,\n       t.wafers_started, y.wafers_tested,\n       (COALESCE(t.wafers_started, 0) - COALESCE(y.wafers_tested, 0)) AS lost_wafer_count,\n       CASE\n         WHEN t.lot_id IS NOT NULL AND y.lot_id IS NOT NULL THEN 'TESTED_AND_ACCOUNTED'\n         WHEN t.lot_id IS NOT NULL THEN 'SCRAPPED_OR_LOST_IN_FAB'\n         ELSE 'TESTED_UNLINKED_TESTER_FILE'\n       END AS wafer_accounting_status\nFROM WaferLotTraveler t\nFULL OUTER JOIN AteYieldLogs y\n  ON t.lot_id = y.lot_id\nORDER BY lost_wafer_count DESC;`,
    eli5Story: "Tracking 25-wafer cassettes of computer chips from the cleanroom to the testing robot. If 25 went in and only 20 were tested, find out where 5 wafers were broken or lost.",
    commonMistakes: "Using an INNER JOIN which hides broken or vanished wafer lots completely from fab scrap accounting.",
    learningOutcomes: "Model cleanroom semiconductor wafer shrinkage using full outer join accounting."
  },

  // --- HR ---
  {
    title: "Workday HR Master Employee Directory vs Bi-Weekly ADP Payroll Register",
    ind: "HR",
    diff: "Medium",
    table: "WorkdayMaster",
    scenario: "Preventing payroll overpayments and omissions by reconciling active employees in Workday HRIS against active payees in the ADP payroll engine.",
    businessObjective: "Full outer join WorkdayMaster to AdpPayroll on employee_id to detect active employees missing paychecks and terminated employees still getting paid.",
    schemaSnippet: "`WorkdayMaster (employee_id VARCHAR(32) PRIMARY KEY, employee_name VARCHAR(100), hr_status VARCHAR(16))` & `AdpPayroll (employee_id VARCHAR(32) PRIMARY KEY, net_pay_usd DECIMAL(10,2))`",
    targetQuery: `SELECT COALESCE(w.employee_id, a.employee_id) AS employee_id,\n       w.employee_name, w.hr_status, a.net_pay_usd,\n       CASE\n         WHEN w.hr_status = 'ACTIVE' AND a.employee_id IS NOT NULL THEN 'ACTIVE_AND_PAID'\n         WHEN w.hr_status = 'ACTIVE' AND a.employee_id IS NULL THEN 'PAYROLL_OMISSION_ERROR_ACTIVE_UNPAID'\n         WHEN w.hr_status = 'TERMINATED' AND a.employee_id IS NOT NULL THEN 'CRITICAL_GHOST_PAYROLL_TERMINATED_EMPLOYEE_PAID'\n         ELSE 'RECONCILED_TERMINATED_UNPAID'\n       END AS payroll_audit_classification\nFROM WorkdayMaster w\nFULL OUTER JOIN AdpPayroll a\n  ON w.employee_id = a.employee_id\nORDER BY payroll_audit_classification DESC;`,
    eli5Story: "Making sure we don't accidentally pay paychecks to workers who got fired last month ('ghost employees'), and ensuring hard-working new hires don't get missed on payday.",
    commonMistakes: "Using an INNER JOIN which only shows workers who DID get paid, hiding both unpaid active workers and terminated ghost payees.",
    learningOutcomes: "Audit enterprise HR and payroll synchronization to prevent payroll leakage."
  },
  {
    title: "Corporate Organization Chart Position Seats vs Active Office Desk Allocations",
    ind: "HR",
    diff: "Easy",
    table: "ApprovedPositions",
    scenario: "Managing corporate real estate office space by comparing approved department headcount seats with facilities desk badge assignments.",
    businessObjective: "Full outer join ApprovedPositions to DeskAllocations on position_code to identify empty unassigned desks and unseated employees.",
    schemaSnippet: "`ApprovedPositions (position_code VARCHAR(16) PRIMARY KEY, dept_name VARCHAR(64))` & `DeskAllocations (position_code VARCHAR(16) PRIMARY KEY, desk_number VARCHAR(16))`",
    targetQuery: `SELECT COALESCE(p.position_code, d.position_code) AS position_code,\n       p.dept_name, d.desk_number,\n       CASE\n         WHEN p.position_code IS NOT NULL AND d.position_code IS NOT NULL THEN 'SEATED'\n         WHEN p.position_code IS NOT NULL THEN 'UNASSIGNED_REMOTE_OR_UNSEATED'\n         ELSE 'SQUATTER_DESK_NO_APPROVED_HEADCOUNT'\n       END AS facilities_status\nFROM ApprovedPositions p\nFULL OUTER JOIN DeskAllocations d\n  ON p.position_code = d.position_code\nORDER BY facilities_status ASC;`,
    eli5Story: "Checking which office desks in our downtown building are sitting empty vs desks occupied by people whose positions aren't on the official company budget.",
    commonMistakes: "Using an INNER JOIN which only shows seats that have a desk assigned.",
    learningOutcomes: "Reconcile real estate desk allocations against approved HR headcount seats."
  },

  // --- PLATFORMS ---
  {
    title: "Ride-Share Platform Dispatch Trips vs Driver GPS In-Vehicle Telematics Log",
    ind: "Platforms",
    diff: "Hard",
    table: "PlatformDispatches",
    scenario: "Detecting off-platform cash rides and street hails by reconciling platform dispatch records against vehicle OBD-II telematics odometer logs.",
    businessObjective: "Full outer join PlatformDispatches to VehicleTelematics on trip_session_id to identify unregistered off-platform commercial driving.",
    schemaSnippet: "`PlatformDispatches (session_id VARCHAR(32) PRIMARY KEY, passenger_fare DECIMAL(8,2))` & `VehicleTelematics (session_id VARCHAR(32) PRIMARY KEY, miles_driven DECIMAL(6,2))`",
    targetQuery: `SELECT COALESCE(p.session_id, v.session_id) AS session_id,\n       p.passenger_fare, v.miles_driven,\n       CASE\n         WHEN p.session_id IS NOT NULL AND v.session_id IS NOT NULL THEN 'VALIDATED_PLATFORM_TRIP'\n         WHEN p.session_id IS NOT NULL THEN 'VIRTUAL_DISPATCH_NO_TELEMATICS_GPS_ERROR'\n         ELSE 'SUSPICIOUS_OFF_PLATFORM_STREET_HAIL'\n       END AS ride_audit_disposition\nFROM PlatformDispatches p\nFULL OUTER JOIN VehicleTelematics v\n  ON p.session_id = v.session_id\nORDER BY ride_audit_disposition DESC;`,
    eli5Story: "Catching taxi drivers who turned off the ride-share app to pick up cash passengers off the street while driving our fleet car.",
    commonMistakes: "Using an INNER JOIN which only looks at rides that went through the app, missing off-platform rides.",
    learningOutcomes: "Detect platform leakage and unauthorized commercial usage via full outer join telemetry."
  },
  {
    title: "Food Delivery Restaurant Menu Pricing vs Delivered Customer Receipt Items",
    ind: "Platforms",
    diff: "Medium",
    table: "PlatformMenuPrices",
    scenario: "Auditing menu item pricing discrepancies between restaurant digital menus and final charged checkout prices.",
    businessObjective: "Full outer join PlatformMenuPrices to BilledReceiptItems on item_sku to detect pricing drift and unlisted charged add-ons.",
    schemaSnippet: "`PlatformMenuPrices (item_sku VARCHAR(32) PRIMARY KEY, menu_price_usd DECIMAL(6,2))` & `BilledReceiptItems (item_sku VARCHAR(32) PRIMARY KEY, billed_price_usd DECIMAL(6,2))`",
    targetQuery: `SELECT COALESCE(m.item_sku, r.item_sku) AS item_sku,\n       m.menu_price_usd, r.billed_price_usd,\n       ROUND(COALESCE(r.billed_price_usd, 0.00) - COALESCE(m.menu_price_usd, 0.00), 2) AS price_variance,\n       CASE\n         WHEN m.item_sku IS NOT NULL AND r.item_sku IS NOT NULL THEN 'MATCHED_PRICE'\n         WHEN m.item_sku IS NOT NULL THEN 'MENU_ITEM_NEVER_ORDERED'\n         ELSE 'UNLISTED_SURCHARGE_OR_SPECIAL_REQUEST'\n       END AS pricing_audit_status\nFROM PlatformMenuPrices m\nFULL OUTER JOIN BilledReceiptItems r\n  ON m.item_sku = r.item_sku\nORDER BY price_variance DESC;`,
    eli5Story: "Making sure restaurants don't charge customers $18 on their receipt for a burger that was listed on the menu for $14.",
    commonMistakes: "Dropping menu items that were never ordered by using an INNER JOIN.",
    learningOutcomes: "Audit consumer pricing transparency using full outer join price delta queries."
  },
  {
    title: "Electric Vehicle Smart Charging Reservations vs Physical Plugs Telemetry",
    ind: "Platforms",
    diff: "Easy",
    table: "ChargingReservations",
    scenario: "Managing EV charger reservation queues by reconciling reserved charging time slots with physical charging station cord connection sensors.",
    businessObjective: "Full outer join ChargingReservations to PhysicalConnections on plug_id to identify reservation no-shows and unauthorized parking plug-ins.",
    schemaSnippet: "`ChargingReservations (plug_id VARCHAR(16) PRIMARY KEY, driver_user_id VARCHAR(32))` & `PhysicalConnections (plug_id VARCHAR(16) PRIMARY KEY, is_plugged_in BOOLEAN)`",
    targetQuery: `SELECT COALESCE(r.plug_id, p.plug_id) AS plug_id,\n       r.driver_user_id,\n       p.is_plugged_in,\n       CASE\n         WHEN r.plug_id IS NOT NULL AND p.plug_id IS NOT NULL THEN 'AUTHORIZED_SESSION_ACTIVE'\n         WHEN r.plug_id IS NOT NULL THEN 'NO_SHOW_RESERVED_STALL_EMPTY'\n         ELSE 'UNAUTHORIZED_SQUATTER_CAR_PLUGGED_IN'\n       END AS stall_status\nFROM ChargingReservations r\nFULL OUTER JOIN PhysicalConnections p\n  ON r.plug_id = p.plug_id\nORDER BY stall_status ASC;`,
    eli5Story: "Checking if someone parked their gas car or unauthorized car in a reserved EV fast-charging stall without reserving it on the app.",
    commonMistakes: "Using an INNER JOIN which omits both empty reserved stalls and unreserved plugged-in cars.",
    learningOutcomes: "Reconcile digital app reservations with physical IoT sensor connections using full outer joins."
  },
  {
    title: "Shipping Manifest Pallet Count vs Physical Dock Receiving Scan Reconciliation",
    ind: "Logistics",
    diff: "Medium",
    table: "ManifestPallets",
    scenario: "Cross-dock warehouse audit reconciling Bill of Lading manifest pallet tags against inbound RFID dock receiving gate scans to detect discrepancies.",
    businessObjective: "Full outer join ManifestPallets to DockReceivingScans on pallet_id to catch short-shipped, over-shipped, or unmanifested cargo.",
    schemaSnippet: "`ManifestPallets (pallet_id VARCHAR(32) PRIMARY KEY, manifest_weight_kg DECIMAL(8,2))` & `DockReceivingScans (pallet_id VARCHAR(32) PRIMARY KEY, scan_weight_kg DECIMAL(8,2))`",
    targetQuery: `SELECT COALESCE(m.pallet_id, d.pallet_id) AS pallet_id,\n       m.manifest_weight_kg, d.scan_weight_kg,\n       CASE\n         WHEN m.pallet_id IS NOT NULL AND d.pallet_id IS NOT NULL THEN 'MATCHED_RECEIPT'\n         WHEN m.pallet_id IS NOT NULL THEN 'SHORT_SHIPPED_MISSING_PALLET'\n         ELSE 'OVER_SHIPPED_UNMANIFESTED_PALLET'\n       END AS dock_reconciliation_status\nFROM ManifestPallets m\nFULL OUTER JOIN DockReceivingScans d\n  ON m.pallet_id = d.pallet_id\nORDER BY dock_reconciliation_status ASC;`,
    eli5Story: "Comparing what the shipping paperwork promised was in the truck versus what our dock scanners actually saw arrive on the pallets.",
    commonMistakes: "Using a LEFT JOIN which completely conceals extra pallets dropped off by mistake without paperwork.",
    learningOutcomes: "Reconcile physical warehouse inbound freight against shipping manifests using full outer joins."
  },
  {
    title: "Content Rights Ingestion Ledger vs Streaming Royalty Playback Logs Audit",
    ind: "Media",
    diff: "Hard",
    table: "LicensedAssets",
    scenario: "Digital streaming platform reconciling studio copyright licensing contracts against playback telemetry to audit royalty accounting breaks.",
    businessObjective: "Full outer join LicensedAssets to PlaybackStreams on license_code to find unstreamed paid rights and unauthorized unlicensed streams.",
    schemaSnippet: "`LicensedAssets (license_code VARCHAR(32) PRIMARY KEY, guaranteed_fee DECIMAL(10,2))` & `PlaybackStreams (license_code VARCHAR(32) PRIMARY KEY, stream_count BIGINT)`",
    targetQuery: `SELECT COALESCE(l.license_code, p.license_code) AS license_code,\n       l.guaranteed_fee, p.stream_count,\n       CASE\n         WHEN l.license_code IS NOT NULL AND p.license_code IS NOT NULL THEN 'ACTIVE_MONETIZED_LICENSE'\n         WHEN l.license_code IS NOT NULL THEN 'UNSTREAMED_CATALOG_SUNK_COST'\n         ELSE 'UNLICENSED_ILLEGAL_STREAM_EVENT'\n       END AS royalty_audit_flag\nFROM LicensedAssets l\nFULL OUTER JOIN PlaybackStreams p\n  ON l.license_code = p.license_code\nORDER BY royalty_audit_flag ASC;`,
    eli5Story: "Spotting movies we paid for that nobody is watching, and movies users are watching that we forgot to pay licensing royalties for.",
    commonMistakes: "Using an INNER JOIN which ignores unlicensed rogue streams and dormant catalog licenses.",
    learningOutcomes: "Audit digital media intellectual property monetization compliance using full outer joins."
  },
  {
    title: "Cloud Infrastructure Inventory vs Vulnerability Scanner Discovery Discrepancy Audit",
    ind: "Security",
    diff: "Hard",
    table: "CloudInstances",
    scenario: "Cybersecurity operations comparing AWS EC2 / GCP Compute instances against automated vulnerability scanner host inventories.",
    businessObjective: "Full outer join CloudInstances to ScannerInventory on instance_arn to find unmonitored shadow servers or ghost scan licenses.",
    schemaSnippet: "`CloudInstances (instance_arn VARCHAR(128) PRIMARY KEY, environment VARCHAR(16))` & `ScannerInventory (instance_arn VARCHAR(128) PRIMARY KEY, last_scan_date DATE)`",
    targetQuery: `SELECT COALESCE(c.instance_arn, s.instance_arn) AS instance_arn,\n       c.environment, s.last_scan_date,\n       CASE\n         WHEN c.instance_arn IS NOT NULL AND s.instance_arn IS NOT NULL THEN 'PROTECTED_INSTANCE'\n         WHEN c.instance_arn IS NOT NULL THEN 'SHADOW_SERVER_UNSCANNED_RISK'\n         ELSE 'GHOST_SCAN_TARGET_TERMINATED'\n       END AS security_posture_state\nFROM CloudInstances c\nFULL OUTER JOIN ScannerInventory s\n  ON c.instance_arn = s.instance_arn\nORDER BY security_posture_state ASC;`,
    eli5Story: "Finding rogue servers created by developers that aren't protected by our security scanner, and old terminated servers our scanner is still wasting licenses on.",
    commonMistakes: "Using a LEFT JOIN which omits zombie scanner targets that are still consuming expensive enterprise security licenses.",
    learningOutcomes: "Expose blind spots in infrastructure security and asset management using full outer joins."
  },
  {
    title: "ASIC Wafer Fabrication Batch Run vs Die Assembly Yield Test Ledger Discrepancy",
    ind: "Hardware",
    diff: "Medium",
    table: "WaferBatches",
    scenario: "Semiconductor quality engineering reconciling fab wafer lots against packaging cleanroom die assembly yield testing records.",
    businessObjective: "Full outer join WaferBatches to DieYieldTests on wafer_batch_id to audit manufacturing batch handoffs.",
    schemaSnippet: "`WaferBatches (wafer_batch_id VARCHAR(32) PRIMARY KEY, fabricated_dies INT)` & `DieYieldTests (wafer_batch_id VARCHAR(32) PRIMARY KEY, tested_good_dies INT)`",
    targetQuery: `SELECT COALESCE(w.wafer_batch_id, d.wafer_batch_id) AS wafer_batch_id,\n       w.fabricated_dies, d.tested_good_dies,\n       CASE\n         WHEN w.wafer_batch_id IS NOT NULL AND d.wafer_batch_id IS NOT NULL THEN 'VERIFIED_TEST_BATCH'\n         WHEN w.wafer_batch_id IS NOT NULL THEN 'UNTESTED_WIP_IN_CLEANROOM'\n         ELSE 'ORPHAN_TEST_RESULT_NO_FAB_RECORD'\n       END AS fab_discrepancy_status\nFROM WaferBatches w\nFULL OUTER JOIN DieYieldTests d\n  ON w.wafer_batch_id = d.wafer_batch_id\nORDER BY fab_discrepancy_status ASC;`,
    eli5Story: "Making sure microchip batches made in the foundry actually got tested for defects in the packaging lab, and catching any test logs with no origin wafer.",
    commonMistakes: "Assuming fab batch IDs match 100% and using an INNER JOIN, which misses untested silicon lots in the staging cleanroom.",
    learningOutcomes: "Audit high-tech semiconductor cleanroom batch handoffs using full outer joins."
  },
  {
    title: "Workday Employee Headcount vs Corporate IT Active Directory Roster Sync Break",
    ind: "HR",
    diff: "Easy",
    table: "HrDirectory",
    scenario: "Enterprise Identity & Access Management (IAM) comparing Workday official human resources records against Okta Active Directory user profiles.",
    businessObjective: "Full outer join HrDirectory to ActiveDirectoryUsers on employee_id to spot zombie ex-employee accounts and new hires missing access.",
    schemaSnippet: "`HrDirectory (employee_id VARCHAR(16) PRIMARY KEY, employment_status VARCHAR(16))` & `ActiveDirectoryUsers (employee_id VARCHAR(16) PRIMARY KEY, account_enabled BOOLEAN)`",
    targetQuery: `SELECT COALESCE(h.employee_id, a.employee_id) AS employee_id,\n       h.employment_status, a.account_enabled,\n       CASE\n         WHEN h.employee_id IS NOT NULL AND a.employee_id IS NOT NULL THEN 'ACTIVE_AND_PROVISIONED'\n         WHEN h.employee_id IS NOT NULL THEN 'NEW_HIRE_MISSING_IT_LOGIN'\n         ELSE 'TERMINATED_EMPLOYEE_ACTIVE_ACCOUNT_RISK'\n       END AS iam_compliance_status\nFROM HrDirectory h\nFULL OUTER JOIN ActiveDirectoryUsers a\n  ON h.employee_id = a.employee_id\nORDER BY iam_compliance_status ASC;`,
    eli5Story: "Catching terminated ex-employees whose corporate email and Slack logins are still active, and helping brand-new hires who can't log in on day one.",
    commonMistakes: "Using a LEFT JOIN from HR which fails to detect orphaned corporate accounts for people who were quietly fired or contractor staff.",
    learningOutcomes: "Identify critical enterprise identity compliance and security risks via full outer join sync checks."
  },
  {
    title: "Point-of-Sale Shift Register Cash Counts vs Armored Carrier Bank Deposits",
    ind: "Retail",
    diff: "Hard",
    table: "RegisterDropSlips",
    scenario: "Retail treasury audit department comparing physical cashier shift cash drop envelopes against armored car courier bank deposit slips.",
    businessObjective: "Full outer join RegisterDropSlips to ArmoredDeposits on deposit_slip_id to detect cash shrink, misplaced bags, or unaccounted bank deposits.",
    schemaSnippet: "`RegisterDropSlips (deposit_slip_id VARCHAR(32) PRIMARY KEY, store_cash_usd DECIMAL(8,2))` & `ArmoredDeposits (deposit_slip_id VARCHAR(32) PRIMARY KEY, bank_cleared_usd DECIMAL(8,2))`",
    targetQuery: `SELECT COALESCE(r.deposit_slip_id, a.deposit_slip_id) AS deposit_slip_id,\n       r.store_cash_usd, a.bank_cleared_usd,\n       ROUND(COALESCE(a.bank_cleared_usd, 0.00) - COALESCE(r.store_cash_usd, 0.00), 2) AS cash_variance,\n       CASE\n         WHEN r.deposit_slip_id IS NOT NULL AND a.deposit_slip_id IS NOT NULL THEN 'CONFIRMED_BANK_DEPOSIT'\n         WHEN r.deposit_slip_id IS NOT NULL THEN 'IN_TRANSIT_OR_LOST_CASH_BAG'\n         ELSE 'UNLINKED_CARRIER_BANK_CREDIT'\n       END AS treasury_audit_disposition\nFROM RegisterDropSlips r\nFULL OUTER JOIN ArmoredDeposits a\n  ON r.deposit_slip_id = a.deposit_slip_id\nORDER BY cash_variance ASC;`,
    eli5Story: "Making sure the cash physical cashiers dropped in the store safe actually made it into the armored truck and showed up in our corporate bank account.",
    commonMistakes: "Using an INNER JOIN which completely masks cash bags that were stolen or lost between the store safe and the bank vault.",
    learningOutcomes: "Conduct retail physical cash audit reconciliations with full outer join variance tracking."
  },
  {
    title: "Hospital Radiology PACS Scans vs Medical Claims Billing Ledger Reconciliation",
    ind: "Healthcare",
    diff: "Hard",
    table: "PacsProcedures",
    scenario: "Hospital revenue integrity audit comparing diagnostic radiology imaging server (PACS) scans against submitted insurance claim charge codes.",
    businessObjective: "Full outer join PacsProcedures to BillingClaims on accession_number to identify unbilled MRI/CT scans and fraudulent phantom claims.",
    schemaSnippet: "`PacsProcedures (accession_number VARCHAR(32) PRIMARY KEY, modality VARCHAR(8))` & `BillingClaims (accession_number VARCHAR(32) PRIMARY KEY, billed_cpt VARCHAR(10))`",
    targetQuery: `SELECT COALESCE(p.accession_number, b.accession_number) AS accession_number,\n       p.modality, b.billed_cpt,\n       CASE\n         WHEN p.accession_number IS NOT NULL AND b.accession_number IS NOT NULL THEN 'COMPLIANT_BILLED_IMAGING'\n         WHEN p.accession_number IS NOT NULL THEN 'UNBILLED_COMPLETED_SCAN_REVENUE_LEAK'\n         ELSE 'PHANTOM_CLAIM_WITHOUT_PACS_IMAGE_AUDIT_RISK'\n       END AS billing_compliance_verdict\nFROM PacsProcedures p\nFULL OUTER JOIN BillingClaims b\n  ON p.accession_number = b.accession_number\nORDER BY billing_compliance_verdict ASC;`,
    eli5Story: "Finding expensive MRI scans performed on patients that doctors forgot to bill, and catching insurance bills submitted for scans that never actually happened.",
    commonMistakes: "Using an INNER JOIN which hides hundreds of thousands of dollars in unbilled scans and phantom insurance fraud risks.",
    learningOutcomes: "Audit clinical diagnostic workflows against billing ledgers to prevent revenue leakage and fraud."
  },
  {
    title: "Ride-Hailing App Driver Toll Charges vs State Highway Transponder Invoices",
    ind: "Platforms",
    diff: "Medium",
    table: "DriverTripTolls",
    scenario: "Mobility platform auditing driver toll reimbursements against state electronic toll plaza transponder monthly statements.",
    businessObjective: "Full outer join DriverTripTolls to HighwayTollInvoices on transponder_tag and trip_date to detect unauthorized personal toll submissions.",
    schemaSnippet: "`DriverTripTolls (toll_record_id VARCHAR(32) PRIMARY KEY, transponder_tag VARCHAR(16), trip_date DATE, claimed_toll DECIMAL(6,2))` & `HighwayTollInvoices (toll_record_id VARCHAR(32) PRIMARY KEY, invoice_toll DECIMAL(6,2))`",
    targetQuery: `SELECT COALESCE(d.toll_record_id, h.toll_record_id) AS toll_record_id,\n       d.claimed_toll, h.invoice_toll,\n       CASE\n         WHEN d.toll_record_id IS NOT NULL AND h.toll_record_id IS NOT NULL THEN 'VERIFIED_BUSINESS_TOLL'\n         WHEN d.toll_record_id IS NOT NULL THEN 'PHANTOM_DRIVER_TOLL_CLAIM'\n         ELSE 'UNREIMBURSED_HIGHWAY_AGENCY_INVOICE'\n       END AS toll_reconciliation_verdict\nFROM DriverTripTolls d\nFULL OUTER JOIN HighwayTollInvoices h\n  ON d.toll_record_id = h.toll_record_id\nORDER BY toll_reconciliation_verdict ASC;`,
    eli5Story: "Matching the bridge and tunnel tolls our taxi drivers asked us to reimburse against the official electronic transponder bills from the department of transportation.",
    commonMistakes: "Using an INNER JOIN which omits fake driver toll claims and unexpected highway agency charges.",
    learningOutcomes: "Reconcile gig-economy platform operational expenses against external utility ledgers."
  }
];
