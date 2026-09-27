const fs = require('fs');
const path = require('path');

const DISCIPLINES = [
  {
    key: 'json_path_extraction',
    name: 'JSON PATH & SCALAR EXTRACTION',
    symbol: '{}',
    color: '#38bdf8',
    concept: 'Extracting Nested Attributes & Scalar Values (-> vs ->>, JSON_VALUE, JSON_QUERY)',
    whenToUse: 'Accessing properties from webhook payloads, transaction metadata, or polymorphic event attributes.',
    scenarios: 'Stripe webhook payment parsing, Plaid transaction account ID lookup, customer device telemetry extraction.',
    traps: '`->` returns a JSON/JSONB object (with quotes), whereas `->>` returns text (scalar unquoted). Comparing `payload->\'status\' = \'active\'` fails because `"active"` != `active`!'
  },
  {
    key: 'json_array_unnesting',
    name: 'JSON ARRAY UNNESTING & LATERAL FLATTEN',
    symbol: '⇲',
    color: '#10b981',
    concept: 'Expanding Nested Document Arrays into Tabular Rows (jsonb_array_elements, UNNEST, FLATTEN)',
    whenToUse: 'Relationalizing multi-item orders, execution leg fills, audit log entries, or tagged metadata.',
    scenarios: 'Expanding e-commerce line items from shopping carts, trading multi-leg option fills, unnesting user permission arrays.',
    traps: 'A standard CROSS JOIN LATERAL or UNNEST drops parent rows if the JSON array is empty `[]` or NULL! Use LEFT JOIN LATERAL to preserve parents.'
  },
  {
    key: 'json_schema_validation',
    name: 'JSON SCHEMA VALIDATION & TYPE CASTING',
    symbol: '🛡️',
    color: '#f59e0b',
    concept: 'Guarding Ingestion Pipelines & Defensive Casting (IS JSON, JSON_VALID, TRY_CAST)',
    whenToUse: 'Defending analytics tables against malformed JSON, schema drift, and type mismatch exceptions in raw API streams.',
    scenarios: 'Validating KYC identity document payloads, filtering corrupted Kafka event strings, safe parsing of optional currency rates.',
    traps: 'Directly casting `(data->>\'amount\')::NUMERIC` causes catastrophic query failure if a malformed payload has `"amount": "pending"`. Always use TRY_CAST or regex guards!'
  },
  {
    key: 'json_aggregation_construction',
    name: 'JSON OBJECT & ARRAY AGGREGATION',
    symbol: '📦',
    color: '#ec4899',
    concept: 'Transforming Relational Rows into Hierarchical JSON Documents (JSON_OBJECT, JSON_ARRAYAGG, jsonb_build_object)',
    whenToUse: 'Generating ready-to-serve REST/GraphQL API payloads, serializing hierarchical customer snapshots for microservices.',
    scenarios: 'Aggregating a customer with nested arrays of recent transactions, building OpenAPI-compliant nested response documents.',
    traps: 'Omitting GROUP BY when combining scalar columns with `JSON_ARRAYAGG`, or forgetting to handle NULL child records which create `[null]` instead of `[]`.'
  },
  {
    key: 'json_indexing_querying',
    name: 'JSONB GIN INDEXING & CONTAINMENT OPERATORS',
    symbol: '⚡',
    color: '#a855f7',
    concept: 'Sub-Millisecond Document Queries with GIN & Containment Operators (@>, ?, jsonb_path_query)',
    whenToUse: 'Querying semi-structured tags, feature flags, or custom user attributes at high throughput without sequential table scans.',
    scenarios: 'Searching for accounts containing `{"vip": true, "region": "EMEA"}`, filtering logs matching specific JSONPath predicates.',
    traps: 'Standard B-Tree indexes on JSONB columns only accelerate exact whole-document equality; containment queries (`@>`) require GIN indexes with `jsonb_path_ops` or default GIN!'
  }
];

function generateQuests() {
  const quests = [];
  let globalId = 15001;

  // 1. JSON Path & Scalar Extraction (20 Quests)
  for (let i = 1; i <= 20; i++) {
    const isEasy = i <= 7;
    const isMed = i > 7 && i <= 14;
    const tier = isEasy ? 'Apprentice' : isMed ? 'Practitioner' : 'Master (FAANG-Ready)';
    const difficulty = isEasy ? 'Easy' : isMed ? 'Medium' : 'Hard';
    const tierColor = isEasy ? '#38bdf8' : isMed ? '#10b981' : '#f59e0b';

    let story, targetQuery, slots, takeaway, commonTrap;

    if (i === 1) {
      story = 'Extract the unquoted payment status string from Stripe API webhook payloads stored in a JSONB column.';
      targetQuery = `SELECT \n  event_id,\n  payload->'payment'->>'status' AS payment_status\nFROM webhook_events\nWHERE payload->'payment'->>'status' = 'succeeded';`;
      slots = {
        blank1: { correct: '->', options: ['->', '->>', '#>', '#>>'] },
        blank2: { correct: '->>', options: ['->>', '->', '@>', '?'] },
        blank3: { correct: '=', options: ['=', 'LIKE', 'IN', 'IS'] }
      };
      takeaway = 'Use -> to traverse nested JSON objects, and ->> on the final leaf to extract text as an unquoted SQL string.';
      commonTrap = 'Using -> instead of ->> leaves double quotes on strings (`"succeeded"`), causing equality checks with \'succeeded\' to fail!';
    } else if (i === 2) {
      story = 'Extract the nested customer email and cast the order amount to numeric from raw e-commerce order payloads.';
      targetQuery = `SELECT \n  order_id,\n  payload->'customer'->>'email' AS customer_email,\n  (payload->'payment'->>'amount')::NUMERIC AS charged_amount\nFROM raw_orders\nWHERE payload->'customer'->>'email' IS NOT NULL;`;
      slots = {
        blank1: { correct: '->>', options: ['->>', '->', '#>', '@>'] },
        blank2: { correct: '::NUMERIC', options: ['::NUMERIC', '::BOOLEAN', '::DATE', '::INTEGER'] },
        blank3: { correct: 'IS NOT NULL', options: ['IS NOT NULL', '= TRUE', '> 0', 'EXISTS'] }
      };
      takeaway = 'Leaf values extracted with ->> are text strings; cast them explicitly to ::NUMERIC for arithmetic or comparisons.';
      commonTrap = 'Casting without ->> (e.g. `(payload->\'payment\'->\'amount\')::NUMERIC`) causes a datatype error in PostgreSQL because JSONB cannot directly cast to numeric.';
    } else if (i === 3) {
      story = 'Use ANSI SQL standard JSON_VALUE to extract the merchant city from a JSON column across cloud warehouses.';
      targetQuery = `SELECT \n  txn_id,\n  JSON_VALUE(txn_data, '$.merchant.address.city') AS merchant_city\nFROM card_transactions\nWHERE JSON_VALUE(txn_data, '$.merchant.category') = 'fintech';`;
      slots = {
        blank1: { correct: 'JSON_VALUE', options: ['JSON_VALUE', 'JSON_QUERY', 'JSON_ARRAY', 'JSON_OBJECT'] },
        blank2: { correct: '$.merchant.address.city', options: ['$.merchant.address.city', '*.merchant.city', '#.merchant.address', 'merchant->city'] },
        blank3: { correct: '=', options: ['=', 'IS', 'IN', 'CONTAINS'] }
      };
      takeaway = 'JSON_VALUE extracts a scalar string/number using standard JSONPath notation starting with `$`.';
      commonTrap = 'Using JSON_QUERY instead of JSON_VALUE: JSON_QUERY returns a JSON object or array, not a scalar text value.';
    } else if (i === 4) {
      story = 'Retrieve the primary currency code from the second element of a nested currencies array using bracket index notation.';
      targetQuery = `SELECT \n  account_id,\n  payload->'supported_currencies'->>1 AS secondary_currency\nFROM multi_currency_accounts\nWHERE payload->'supported_currencies'->>1 = 'EUR';`;
      slots = {
        blank1: { correct: '->', options: ['->', '->>', '@>', '#>'] },
        blank2: { correct: '->>1', options: ['->>1', '->>0', '->>[1]', '#>>1'] },
        blank3: { correct: '=', options: ['=', 'LIKE', 'ILIKE', 'IS'] }
      };
      takeaway = 'JSON array index traversal is zero-indexed in PostgreSQL and DuckDB: `->>0` gets the first element, `->>1` gets the second.';
      commonTrap = 'Using 1-based indexing as in SQL arrays. JSON arrays follow standard JavaScript 0-based indexing!';
    } else if (i === 5) {
      story = 'Extract deeply nested risk score metrics using the path array operator `#>>`.';
      targetQuery = `SELECT \n  user_id,\n  (payload #>> '{risk_assessment,engine_v2,score}')::FLOAT AS risk_score\nFROM user_kyc_events\nWHERE (payload #>> '{risk_assessment,engine_v2,score}')::FLOAT >= 85.0;`;
      slots = {
        blank1: { correct: '#>>', options: ['#>>', '#>', '->>', '->'] },
        blank2: { correct: '{risk_assessment,engine_v2,score}', options: ['{risk_assessment,engine_v2,score}', '[risk_assessment.engine_v2.score]', '$.risk_assessment.engine_v2.score', 'risk_assessment/engine_v2/score'] },
        blank3: { correct: '>=', options: ['>=', '=', 'IS', 'BETWEEN'] }
      };
      takeaway = '#>> takes a text array path like \'{a,b,c}\' to navigate multiple nesting levels at once and return unquoted text.';
      commonTrap = 'Using #> instead of #>> returns a JSONB fragment rather than unquoted text, requiring extra conversion.';
    } else if (i === 6) {
      story = 'In Snowflake/BigQuery, extract the top-level IP address string using dot notation and JSON_EXTRACT_SCALAR.';
      targetQuery = `SELECT \n  log_id,\n  JSON_EXTRACT_SCALAR(client_info, '$.ip_address') AS client_ip\nFROM auth_logs\nWHERE JSON_EXTRACT_SCALAR(client_info, '$.auth_status') = 'SUCCESS';`;
      slots = {
        blank1: { correct: 'JSON_EXTRACT_SCALAR', options: ['JSON_EXTRACT_SCALAR', 'JSON_EXTRACT_ARRAY', 'JSON_OBJECT_KEYS', 'PARSE_JSON'] },
        blank2: { correct: '$.ip_address', options: ['$.ip_address', 'ip_address', '*.ip_address', '[ip_address]'] },
        blank3: { correct: '=', options: ['=', 'IS', 'LIKE', 'IN'] }
      };
      takeaway = 'In BigQuery and Snowflake, JSON_EXTRACT_SCALAR extracts the target JSONPath property directly as a standard SQL string.';
      commonTrap = 'Using JSON_EXTRACT instead of JSON_EXTRACT_SCALAR: JSON_EXTRACT preserves quotes around strings!';
    } else if (i === 7) {
      story = 'Safely parse boolean feature flags from a customer settings JSON document.';
      targetQuery = `SELECT \n  tenant_id,\n  (settings->'flags'->>'two_factor_auth')::BOOLEAN AS is_2fa_enabled\nFROM tenant_configurations\nWHERE (settings->'flags'->>'two_factor_auth')::BOOLEAN = TRUE;`;
      slots = {
        blank1: { correct: '->>', options: ['->>', '->', '#>', '@>'] },
        blank2: { correct: '::BOOLEAN', options: ['::BOOLEAN', '::INTEGER', '::TEXT', '::DATE'] },
        blank3: { correct: '= TRUE', options: ['= TRUE', 'IS NOT NULL', '= 1', 'EXISTS'] }
      };
      takeaway = 'Extract boolean strings with `->>` and cast with `::BOOLEAN` to enable true boolean predicate logic.';
      commonTrap = 'Comparing `settings->\'flags\'->\'two_factor_auth\' = \'true\'`: JSON boolean values are not string literals.';
    } else if (i <= 14) {
      story = `Parse multi-layered trading metadata object for tier #${i} order routing analysis.`;
      targetQuery = `SELECT \n  order_token,\n  payload->'broker'->>'routing_venue' AS venue,\n  (payload->'execution'->>'slippage_bps')::NUMERIC AS slippage\nFROM execution_reports\nWHERE payload->'broker'->>'routing_venue' IN ('DARK_POOL_A', 'LIT_EXCHANGE_B')\n  AND (payload->'execution'->>'slippage_bps')::NUMERIC < 5.0;`;
      slots = {
        blank1: { correct: '->>', options: ['->>', '->', '#>', '@>'] },
        blank2: { correct: 'IN', options: ['IN', 'BETWEEN', 'LIKE', 'IS'] },
        blank3: { correct: '::NUMERIC', options: ['::NUMERIC', '::TEXT', '::BOOLEAN', '::TIME'] },
        blank4: { correct: '<', options: ['<', '>', '=', '!='] }
      };
      takeaway = 'Combine multiple path extractions in WHERE clauses using standard boolean operators and explicit type casting.';
      commonTrap = 'Filtering on uncast strings (e.g. `slippage_bps < \'5.0\'`), which applies alphabetical lexicographical ordering rather than numeric comparison!';
    } else {
      story = `Enterprise quantitative trade settlement JSON parsing for high-volume scenario #${i}.`;
      targetQuery = `SELECT \n  trade_id,\n  payload #>> '{counterparty,legal_entity_id}' AS lei,\n  COALESCE((payload #>> '{pricing,adjusted_notional}')::NUMERIC, 0.0) AS net_notional\nFROM derivatives_blotter\nWHERE payload #>> '{clearing,status}' = 'CLEARED'\n  AND (payload #>> '{pricing,adjusted_notional}')::NUMERIC > 1000000;`;
      slots = {
        blank1: { correct: '#>>', options: ['#>>', '->', '->>', '#>'] },
        blank2: { correct: 'COALESCE', options: ['COALESCE', 'NULLIF', 'GREATEST', 'LEAST'] },
        blank3: { correct: '::NUMERIC', options: ['::NUMERIC', '::INTEGER', '::BIGINT', '::FLOAT'] },
        blank4: { correct: '>', options: ['>', '<', '=', 'IN'] }
      };
      takeaway = 'Use COALESCE on numeric path extractions to provide safe fallback defaults for missing optional nested fields.';
      commonTrap = 'Failing to COALESCE NULL paths causes arithmetic expressions to silently return NULL, corrupting portfolio rollups.';
    }

    quests.push({
      id: globalId++,
      discipline: 'JSON PATH & SCALAR EXTRACTION',
      disciplineKey: 'json_path_extraction',
      tier,
      difficulty,
      tierColor,
      title: `Quest ${i}: ${DISCIPLINES[0].name} (Level ${i})`,
      category: 'JSON & Semi-Structured SQL',
      subcluster: 'Path Navigation & Scalars',
      story,
      table: 'webhook_events',
      schemaSnippet: `CREATE TABLE webhook_events (\n  event_id UUID PRIMARY KEY,\n  source VARCHAR(50),\n  payload JSONB NOT NULL,\n  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`,
      targetQuery,
      slots,
      scaffolding: {
        hint: 'Remember: -> extracts JSON objects or arrays; ->> extracts scalar values as plain text without quotes.',
        commonTrap,
        takeaway
      }
    });
  }

  // 2. JSON Array Unnesting & Lateral Flatten (20 Quests)
  for (let i = 1; i <= 20; i++) {
    const isEasy = i <= 7;
    const isMed = i > 7 && i <= 14;
    const tier = isEasy ? 'Apprentice' : isMed ? 'Practitioner' : 'Master (FAANG-Ready)';
    const difficulty = isEasy ? 'Easy' : isMed ? 'Medium' : 'Hard';
    const tierColor = isEasy ? '#38bdf8' : isMed ? '#10b981' : '#f59e0b';

    let story, targetQuery, slots, takeaway, commonTrap;

    if (i === 1) {
      story = 'Expand a JSON array of invoice line items into individual relational rows using jsonb_array_elements.';
      targetQuery = `SELECT \n  inv.invoice_id,\n  item->>'sku' AS item_sku,\n  (item->>'quantity')::INT AS qty\nFROM invoices inv,\nLATERAL jsonb_array_elements(inv.payload->'items') AS item;`;
      slots = {
        blank1: { correct: 'LATERAL', options: ['LATERAL', 'OUTER', 'CROSS', 'INNER'] },
        blank2: { correct: 'jsonb_array_elements', options: ['jsonb_array_elements', 'jsonb_each', 'jsonb_object_keys', 'jsonb_populate_record'] },
        blank3: { correct: 'item->>\'sku\'', options: ['item->>\'sku\'', 'item->\'sku\'', 'inv->\'sku\'', 'payload->\'sku\''] }
      };
      takeaway = 'jsonb_array_elements decomposes a JSON array into a set of JSONB rows, which can be queried with -> and ->>.';
      commonTrap = 'Using jsonb_each instead of jsonb_array_elements: jsonb_each decomposes key/value objects, not array items.';
    } else if (i === 2) {
      story = 'Unnest multi-currency account tags using Snowflake FLATTEN or BigQuery UNNEST.';
      targetQuery = `SELECT \n  account_id,\n  tag.value::VARCHAR AS assigned_tag\nFROM account_profiles,\nLATERAL FLATTEN(input => metadata:tags) tag\nWHERE tag.value::VARCHAR LIKE 'FIN_%';`;
      slots = {
        blank1: { correct: 'LATERAL FLATTEN', options: ['LATERAL FLATTEN', 'CROSS JOIN', 'UNNEST ARRAY', 'JSON_SPLIT'] },
        blank2: { correct: 'input =>', options: ['input =>', 'data =>', 'source =>', 'json =>'] },
        blank3: { correct: 'LIKE', options: ['LIKE', '=', 'IN', 'IS'] }
      };
      takeaway = 'Snowflake FLATTEN takes `input => array_expression` and produces `seq`, `key`, `path`, `index`, and `value` columns.';
      commonTrap = 'Forgetting to cast `tag.value::VARCHAR`: FLATTEN value columns are Variant types in Snowflake and must be cast to string.';
    } else if (i === 3) {
      story = 'Use LEFT JOIN LATERAL to unnest line items while preserving orders that have empty or NULL line items.';
      targetQuery = `SELECT \n  ord.order_id,\n  item->>'product_id' AS product_id\nFROM orders ord\nLEFT JOIN LATERAL jsonb_array_elements(ord.details->'items') AS item ON TRUE;`;
      slots = {
        blank1: { correct: 'LEFT JOIN LATERAL', options: ['LEFT JOIN LATERAL', 'CROSS JOIN LATERAL', 'INNER JOIN', 'NATURAL JOIN'] },
        blank2: { correct: 'jsonb_array_elements', options: ['jsonb_array_elements', 'jsonb_extract_path', 'json_build_array', 'json_agg'] },
        blank3: { correct: 'ON TRUE', options: ['ON TRUE', 'ON ord.id = item.id', 'WHERE item IS NOT NULL', 'USING (id)'] }
      };
      takeaway = 'LEFT JOIN LATERAL ... ON TRUE ensures orders with 0 items are retained in the result set rather than dropped.';
      commonTrap = 'Using CROSS JOIN LATERAL: If `items` is empty `[]`, the row vanishes completely, silently biasing financial totals!';
    } else if (i === 4) {
      story = 'Extract the array element index with jsonb_array_elements_text with ordinality.';
      targetQuery = `SELECT \n  portfolio_id,\n  elem_idx,\n  asset_ticker\nFROM investment_portfolios,\nLATERAL jsonb_array_elements_text(holdings->'tickers') WITH ORDINALITY AS t(asset_ticker, elem_idx);`;
      slots = {
        blank1: { correct: 'jsonb_array_elements_text', options: ['jsonb_array_elements_text', 'jsonb_array_elements', 'json_object_keys', 'json_array_length'] },
        blank2: { correct: 'WITH ORDINALITY', options: ['WITH ORDINALITY', 'WITH INDEX', 'GENERATE ROW_NUMBER', 'BY POSITION'] },
        blank3: { correct: 'asset_ticker, elem_idx', options: ['asset_ticker, elem_idx', 'elem_idx, asset_ticker', 'asset_ticker', 'holdings'] }
      };
      takeaway = 'WITH ORDINALITY appends a 1-based sequential integer index tracking the exact element position in the array.';
      commonTrap = 'Assuming WITH ORDINALITY indices are 0-based. In standard SQL, ORDINALITY is always 1-based (1, 2, 3...).';
    } else if (i <= 14) {
      story = `Relationalize nested sub-transaction legs for risk compliance level #${i}.`;
      targetQuery = `SELECT \n  b.batch_id,\n  leg->>'instrument' AS symbol,\n  (leg->>'notional')::NUMERIC AS notional_usd\nFROM settlement_batches b\nLEFT JOIN LATERAL jsonb_array_elements(b.batch_data->'legs') AS leg ON TRUE\nWHERE (leg->>'notional')::NUMERIC > 50000.0;`;
      slots = {
        blank1: { correct: 'LEFT JOIN LATERAL', options: ['LEFT JOIN LATERAL', 'CROSS JOIN', 'RIGHT JOIN', 'FULL JOIN'] },
        blank2: { correct: 'jsonb_array_elements', options: ['jsonb_array_elements', 'jsonb_each', 'jsonb_strip_nulls', 'jsonb_to_recordset'] },
        blank3: { correct: 'ON TRUE', options: ['ON TRUE', 'ON b.id = leg.id', 'WHERE leg IS NOT NULL', 'USING (batch_id)'] },
        blank4: { correct: '>', options: ['>', '<', '=', 'IS'] }
      };
      takeaway = 'Unnesting combined with numeric casting allows granular downstream filtering on individual array elements.';
      commonTrap = 'Placing the WHERE condition inside the ON clause of a LEFT JOIN: In a LEFT JOIN, predicates on the unnested table in ON do not filter parent rows!';
    } else {
      story = `Advanced multi-dimensional JSON array expansion for complex derivatives audit #${i}.`;
      targetQuery = `SELECT \n  d.deal_reference,\n  tranche->>'tranche_id' AS tranche_id,\n  SUM((tranche->>'allocated_capital')::NUMERIC) AS total_allocation\nFROM structured_deals d\nCROSS JOIN LATERAL jsonb_array_elements(d.contract_json->'tranches') AS tranche\nGROUP BY d.deal_reference, tranche->>'tranche_id'\nHAVING SUM((tranche->>'allocated_capital')::NUMERIC) >= 1000000;`;
      slots = {
        blank1: { correct: 'CROSS JOIN LATERAL', options: ['CROSS JOIN LATERAL', 'UNION ALL', 'LEFT JOIN', 'INNER JOIN ON FALSE'] },
        blank2: { correct: 'jsonb_array_elements', options: ['jsonb_array_elements', 'json_query', 'json_value', 'json_extract'] },
        blank3: { correct: 'GROUP BY', options: ['GROUP BY', 'ORDER BY', 'PARTITION BY', 'WINDOW'] },
        blank4: { correct: 'HAVING', options: ['HAVING', 'WHERE', 'QUALIFY', 'LIMIT'] }
      };
      takeaway = 'Unnested array items can be grouped and aggregated just like regular relational columns.';
      commonTrap = 'Filtering aggregated sums in WHERE instead of HAVING: WHERE evaluates before unnested row aggregation!';
    }

    quests.push({
      id: globalId++,
      discipline: 'JSON ARRAY UNNESTING & LATERAL FLATTEN',
      disciplineKey: 'json_array_unnesting',
      tier,
      difficulty,
      tierColor,
      title: `Quest ${i}: ${DISCIPLINES[1].name} (Level ${i})`,
      category: 'JSON & Semi-Structured SQL',
      subcluster: 'Array Flatten & Lateral Expansion',
      story,
      table: 'invoices',
      schemaSnippet: `CREATE TABLE invoices (\n  invoice_id INT PRIMARY KEY,\n  customer_id INT NOT NULL,\n  payload JSONB NOT NULL,\n  created_at DATE\n);`,
      targetQuery,
      slots,
      scaffolding: {
        hint: 'Use jsonb_array_elements with LATERAL to turn each item in a JSON array into a separate row.',
        commonTrap,
        takeaway
      }
    });
  }

  // 3. JSON Schema Validation & Type Casting (20 Quests)
  for (let i = 1; i <= 20; i++) {
    const isEasy = i <= 7;
    const isMed = i > 7 && i <= 14;
    const tier = isEasy ? 'Apprentice' : isMed ? 'Practitioner' : 'Master (FAANG-Ready)';
    const difficulty = isEasy ? 'Easy' : isMed ? 'Medium' : 'Hard';
    const tierColor = isEasy ? '#38bdf8' : isMed ? '#10b981' : '#f59e0b';

    let story, targetQuery, slots, takeaway, commonTrap;

    if (i === 1) {
      story = 'Filter out malformed JSON strings in raw ingestion tables using the ANSI SQL `IS JSON` predicate.';
      targetQuery = `SELECT \n  raw_id,\n  raw_payload\nFROM incoming_telemetry_stream\nWHERE raw_payload IS JSON\n  AND raw_payload IS NOT NULL;`;
      slots = {
        blank1: { correct: 'IS JSON', options: ['IS JSON', 'IS VALID', 'IS OBJECT', '= JSON'] },
        blank2: { correct: 'IS NOT NULL', options: ['IS NOT NULL', '!= NULL', '> 0', '= TRUE'] }
      };
      takeaway = 'The ANSI SQL `IS JSON` predicate checks if a string is syntactically valid JSON before attempting extraction.';
      commonTrap = 'Parsing an invalid JSON string directly with json functions causes a syntax error that aborts the entire transaction.';
    } else if (i === 2) {
      story = 'Enforce that an ingested JSON document is specifically a JSON object rather than a bare array or scalar.';
      targetQuery = `SELECT \n  msg_id,\n  payload_str\nFROM api_ingestion_queue\nWHERE payload_str IS JSON OBJECT;`;
      slots = {
        blank1: { correct: 'IS JSON OBJECT', options: ['IS JSON OBJECT', 'IS JSON ARRAY', 'IS JSON SCALAR', 'IS STRUCT'] },
        blank2: { correct: 'payload_str', options: ['payload_str', 'msg_id', 'JSON(msg_id)', 'OBJECT(payload_str)'] }
      };
      takeaway = 'ANSI SQL supports `IS JSON OBJECT`, `IS JSON ARRAY`, and `IS JSON SCALAR` for precise type validation.';
      commonTrap = 'Assuming all valid JSON strings are key-value objects: `"hello"`, `123`, and `[1, 2]` are all valid JSON!';
    } else if (i === 3) {
      story = 'Inspect the runtime JSON datatype of a specific property using jsonb_typeof.';
      targetQuery = `SELECT \n  audit_id,\n  jsonb_typeof(metadata->'risk_rating') AS rating_datatype\nFROM credit_applications\nWHERE jsonb_typeof(metadata->'risk_rating') = 'number';`;
      slots = {
        blank1: { correct: 'jsonb_typeof', options: ['jsonb_typeof', 'pg_typeof', 'json_type', 'datatype_of'] },
        blank2: { correct: 'metadata->\'risk_rating\'', options: ['metadata->\'risk_rating\'', 'metadata->>\'risk_rating\'', 'risk_rating', 'metadata'] },
        blank3: { correct: '\'number\'', options: ['\'number\'', '\'numeric\'', '\'integer\'', '\'float\''] }
      };
      takeaway = 'jsonb_typeof returns \'object\', \'array\', \'string\', \'number\', \'boolean\', or \'null\'. Note: pass `->` (JSONB), not `->>` (text)!';
      commonTrap = 'Passing `->>` to jsonb_typeof: `jsonb_typeof(\'123\')` fails because ->> returns plain text, not a jsonb object!';
    } else if (i === 4) {
      story = 'Defensively cast an optional discount rate from JSON using SAFE_CAST or TRY_CAST to prevent query failure.';
      targetQuery = `SELECT \n  quote_id,\n  TRY_CAST(attributes->>'discount_rate' AS NUMERIC) AS discount_pct\nFROM client_quotes\nWHERE TRY_CAST(attributes->>'discount_rate' AS NUMERIC) IS NOT NULL;`;
      slots = {
        blank1: { correct: 'TRY_CAST', options: ['TRY_CAST', 'CAST', 'CONVERT', 'SAFE_PARSE'] },
        blank2: { correct: 'AS NUMERIC', options: ['AS NUMERIC', 'AS BOOLEAN', 'AS DATE', 'AS TIMESTAMP'] },
        blank3: { correct: 'IS NOT NULL', options: ['IS NOT NULL', '> 0', '= TRUE', 'EXISTS'] }
      };
      takeaway = 'TRY_CAST returns NULL on conversion failure instead of raising a runtime exception when malformed text occurs.';
      commonTrap = 'Using standard `::NUMERIC`: If an unexpected string like `"FREE"` or `"N/A"` appears, the entire batch query crashes.';
    } else if (i <= 14) {
      story = `Audit KYC customer risk payloads for schema compliance and format integrity level #${i}.`;
      targetQuery = `SELECT \n  application_id,\n  payload->>'applicant_ssn' AS masked_ssn\nFROM kyc_records\nWHERE payload IS JSON OBJECT\n  AND jsonb_typeof(payload->'score') = 'number'\n  AND TRY_CAST(payload->>'score' AS INT) BETWEEN 300 AND 850;`;
      slots = {
        blank1: { correct: 'IS JSON OBJECT', options: ['IS JSON OBJECT', 'IS JSON ARRAY', 'IS VALID', 'IS STRUCT'] },
        blank2: { correct: 'jsonb_typeof', options: ['jsonb_typeof', 'pg_typeof', 'type_of', 'json_valid'] },
        blank3: { correct: 'TRY_CAST', options: ['TRY_CAST', 'CAST', 'COALESCE', 'NULLIF'] },
        blank4: { correct: 'BETWEEN', options: ['BETWEEN', 'IN', 'LIKE', 'OVERLAPS'] }
      };
      takeaway = 'Combine structural validation (IS JSON), type checking (jsonb_typeof), and defensive casting (TRY_CAST) for zero-crash ETL.';
      commonTrap = 'Ordering predicates incorrectly: Always validate IS JSON before applying json extraction operators!';
    } else {
      story = `High-reliability financial message schema firewall verification #${i}.`;
      targetQuery = `SELECT \n  msg_id,\n  header->>'sender_lei' AS sender,\n  COALESCE(TRY_CAST(body->>'amount' AS NUMERIC), 0.0) AS safe_amount\nFROM swift_json_packets\nWHERE body IS JSON OBJECT\n  AND body ? 'amount'\n  AND TRY_CAST(body->>'amount' AS NUMERIC) > 0;`;
      slots = {
        blank1: { correct: 'COALESCE', options: ['COALESCE', 'GREATEST', 'LEAST', 'NULLIF'] },
        blank2: { correct: 'IS JSON OBJECT', options: ['IS JSON OBJECT', 'IS JSON ARRAY', 'IS STRING', 'IS NULL'] },
        blank3: { correct: '?', options: ['?', '@>', '<@', '&&'] },
        blank4: { correct: '>', options: ['>', '<', '=', '!='] }
      };
      takeaway = 'The `?` operator checks whether a top-level key exists in the JSON document before attempting extraction.';
      commonTrap = 'Assuming key presence implies non-null: `body ? \'amount\'` returns TRUE even if the JSON is `{"amount": null}`!';
    }

    quests.push({
      id: globalId++,
      discipline: 'JSON SCHEMA VALIDATION & TYPE CASTING',
      disciplineKey: 'json_schema_validation',
      tier,
      difficulty,
      tierColor,
      title: `Quest ${i}: ${DISCIPLINES[2].name} (Level ${i})`,
      category: 'JSON & Semi-Structured SQL',
      subcluster: 'Validation & Defensive Casting',
      story,
      table: 'incoming_telemetry_stream',
      schemaSnippet: `CREATE TABLE incoming_telemetry_stream (\n  raw_id BIGINT PRIMARY KEY,\n  raw_payload TEXT NOT NULL,\n  received_at TIMESTAMP\n);`,
      targetQuery,
      slots,
      scaffolding: {
        hint: 'Use IS JSON to verify syntax, jsonb_typeof to check datatypes, and TRY_CAST to avoid fatal query exceptions.',
        commonTrap,
        takeaway
      }
    });
  }

  // 4. JSON Aggregation & Object Construction (20 Quests)
  for (let i = 1; i <= 20; i++) {
    const isEasy = i <= 7;
    const isMed = i > 7 && i <= 14;
    const tier = isEasy ? 'Apprentice' : isMed ? 'Practitioner' : 'Master (FAANG-Ready)';
    const difficulty = isEasy ? 'Easy' : isMed ? 'Medium' : 'Hard';
    const tierColor = isEasy ? '#38bdf8' : isMed ? '#10b981' : '#f59e0b';

    let story, targetQuery, slots, takeaway, commonTrap;

    if (i === 1) {
      story = 'Construct a JSON object with key-value pairs from relational customer columns using jsonb_build_object.';
      targetQuery = `SELECT \n  customer_id,\n  jsonb_build_object(\n    'id', customer_id,\n    'name', full_name,\n    'tier', loyalty_tier\n  ) AS customer_doc\nFROM customers\nWHERE status = 'ACTIVE';`;
      slots = {
        blank1: { correct: 'jsonb_build_object', options: ['jsonb_build_object', 'jsonb_build_array', 'json_agg', 'json_extract'] },
        blank2: { correct: '\'tier\', loyalty_tier', options: ['\'tier\', loyalty_tier', 'tier: loyalty_tier', 'loyalty_tier AS tier', 'tier => loyalty_tier'] },
        blank3: { correct: '=', options: ['=', 'IS', 'LIKE', 'IN'] }
      };
      takeaway = 'jsonb_build_object takes alternating key and value arguments: (\'k1\', v1, \'k2\', v2, ...).';
      commonTrap = 'Passing an odd number of arguments to jsonb_build_object causes a runtime syntax error!';
    } else if (i === 2) {
      story = 'Aggregate relational transaction rows into a single JSON array per account using json_agg or jsonb_agg.';
      targetQuery = `SELECT \n  account_id,\n  jsonb_agg(amount ORDER BY txn_date DESC) AS recent_amounts\nFROM transactions\nGROUP BY account_id;`;
      slots = {
        blank1: { correct: 'jsonb_agg', options: ['jsonb_agg', 'jsonb_object_agg', 'array_agg', 'string_agg'] },
        blank2: { correct: 'ORDER BY txn_date DESC', options: ['ORDER BY txn_date DESC', 'SORT BY txn_date', 'GROUP BY txn_date', 'INDEX BY txn_date'] },
        blank3: { correct: 'GROUP BY', options: ['GROUP BY', 'ORDER BY', 'PARTITION BY', 'HAVING'] }
      };
      takeaway = 'jsonb_agg supports internal ORDER BY clauses to guarantee element ordering inside the resulting JSON array.';
      commonTrap = 'Omitting ORDER BY inside jsonb_agg: SQL row sets are unordered by default, resulting in nondeterministic JSON array orders!';
    } else if (i === 3) {
      story = 'Construct a structured parent-child JSON document combining account header with an array of nested transaction objects.';
      targetQuery = `SELECT \n  a.account_id,\n  jsonb_build_object(\n    'account_id', a.account_id,\n    'balance', a.current_balance,\n    'transactions', jsonb_agg(jsonb_build_object('id', t.txn_id, 'amount', t.amount))\n  ) AS statement_json\nFROM accounts a\nJOIN transactions t ON a.account_id = t.account_id\nGROUP BY a.account_id, a.current_balance;`;
      slots = {
        blank1: { correct: 'jsonb_build_object', options: ['jsonb_build_object', 'jsonb_build_array', 'json_agg', 'json_query'] },
        blank2: { correct: 'jsonb_agg', options: ['jsonb_agg', 'jsonb_each', 'array_to_json', 'json_object'] },
        blank3: { correct: 'GROUP BY', options: ['GROUP BY', 'ORDER BY', 'HAVING', 'QUALIFY'] }
      };
      takeaway = 'Nest jsonb_build_object inside jsonb_agg to convert one-to-many relational tables into full hierarchical JSON documents.';
      commonTrap = 'Forgetting to include all non-aggregated columns (`a.current_balance`) in the GROUP BY clause.';
    } else if (i === 4) {
      story = 'Build a key-value dictionary from dynamic config key and value columns using jsonb_object_agg.';
      targetQuery = `SELECT \n  org_id,\n  jsonb_object_agg(config_key, config_value) AS settings_map\nFROM system_configurations\nGROUP BY org_id;`;
      slots = {
        blank1: { correct: 'jsonb_object_agg', options: ['jsonb_object_agg', 'jsonb_agg', 'jsonb_build_object', 'jsonb_each'] },
        blank2: { correct: 'config_key, config_value', options: ['config_key, config_value', 'config_key: config_value', 'config_key AS config_value', 'config_value, config_key'] },
        blank3: { correct: 'GROUP BY', options: ['GROUP BY', 'ORDER BY', 'PARTITION BY', 'WHERE'] }
      };
      takeaway = 'jsonb_object_agg aggregates two columns (key, value) into a single JSON object where keys are dynamically populated.';
      commonTrap = 'If duplicate keys exist within a group, the last row processed silently overwrites previous values!';
    } else if (i <= 14) {
      story = `Package client risk profiles and recent compliance audits into a single JSON response document level #${i}.`;
      targetQuery = `SELECT \n  c.client_id,\n  jsonb_build_object(\n    'client', c.company_name,\n    'risk_grade', c.risk_tier,\n    'audits', COALESCE(jsonb_agg(jsonb_build_object('audit_id', a.audit_id, 'status', a.verdict)) FILTER (WHERE a.audit_id IS NOT NULL), '[]'::jsonb)\n  ) AS compliance_dossier\nFROM enterprise_clients c\nLEFT JOIN compliance_audits a ON c.client_id = a.client_id\nGROUP BY c.client_id, c.company_name, c.risk_tier;`;
      slots = {
        blank1: { correct: 'jsonb_build_object', options: ['jsonb_build_object', 'jsonb_build_array', 'json_query', 'json_strip_nulls'] },
        blank2: { correct: 'FILTER (WHERE a.audit_id IS NOT NULL)', options: ['FILTER (WHERE a.audit_id IS NOT NULL)', 'HAVING a.audit_id IS NOT NULL', 'WHERE a.audit_id IS NOT NULL', 'ON TRUE'] },
        blank3: { correct: '\'[]\'::jsonb', options: ['\'[]\'::jsonb', '\'{}\'::jsonb', 'NULL', '\'""\'::jsonb'] },
        blank4: { correct: 'LEFT JOIN', options: ['LEFT JOIN', 'INNER JOIN', 'CROSS JOIN', 'RIGHT JOIN'] }
      };
      takeaway = 'Use `FILTER (WHERE ... IS NOT NULL)` and COALESCE with `\'[]\'::jsonb` to ensure clients with 0 child records produce empty arrays `[]` instead of `[null]`.';
      commonTrap = 'Standard LEFT JOIN + jsonb_agg produces `[null]` when no matching children exist, violating JSON schema contracts!';
    } else {
      story = `Multi-table enterprise balance sheet JSON serialization #${i}.`;
      targetQuery = `SELECT \n  e.entity_id,\n  jsonb_strip_nulls(jsonb_build_object(\n    'entity_code', e.entity_code,\n    'reporting_currency', e.currency,\n    'sub_ledgers', jsonb_agg(jsonb_build_object('code', l.ledger_code, 'balance', l.amount))\n  )) AS balance_sheet_json\nFROM legal_entities e\nJOIN entity_ledgers l ON e.entity_id = l.entity_id\nGROUP BY e.entity_id, e.entity_code, e.currency\nHAVING COUNT(l.ledger_code) > 0;`;
      slots = {
        blank1: { correct: 'jsonb_strip_nulls', options: ['jsonb_strip_nulls', 'jsonb_clean', 'jsonb_compact', 'jsonb_delete_null'] },
        blank2: { correct: 'jsonb_build_object', options: ['jsonb_build_object', 'jsonb_build_array', 'json_each', 'json_query'] },
        blank3: { correct: 'GROUP BY', options: ['GROUP BY', 'ORDER BY', 'PARTITION BY', 'WINDOW'] },
        blank4: { correct: 'HAVING', options: ['HAVING', 'WHERE', 'QUALIFY', 'LIMIT'] }
      };
      takeaway = 'jsonb_strip_nulls recursively removes object keys that have NULL values, dramatically reducing payload bandwidth.';
      commonTrap = 'jsonb_strip_nulls only removes NULLs from JSON objects; it preserves NULL elements inside JSON arrays!';
    }

    quests.push({
      id: globalId++,
      discipline: 'JSON OBJECT & ARRAY AGGREGATION',
      disciplineKey: 'json_aggregation_construction',
      tier,
      difficulty,
      tierColor,
      title: `Quest ${i}: ${DISCIPLINES[3].name} (Level ${i})`,
      category: 'JSON & Semi-Structured SQL',
      subcluster: 'Aggregation & Document Construction',
      story,
      table: 'customers',
      schemaSnippet: `CREATE TABLE customers (\n  customer_id INT PRIMARY KEY,\n  full_name VARCHAR(100),\n  loyalty_tier VARCHAR(20),\n  status VARCHAR(20)\n);`,
      targetQuery,
      slots,
      scaffolding: {
        hint: 'Use jsonb_build_object to construct single objects, and jsonb_agg to group child rows into JSON arrays.',
        commonTrap,
        takeaway
      }
    });
  }

  // 5. JSONB GIN Indexing & Containment Operators (20 Quests)
  for (let i = 1; i <= 20; i++) {
    const isEasy = i <= 7;
    const isMed = i > 7 && i <= 14;
    const tier = isEasy ? 'Apprentice' : isMed ? 'Practitioner' : 'Master (FAANG-Ready)';
    const difficulty = isEasy ? 'Easy' : isMed ? 'Medium' : 'Hard';
    const tierColor = isEasy ? '#38bdf8' : isMed ? '#10b981' : '#f59e0b';

    let story, targetQuery, slots, takeaway, commonTrap;

    if (i === 1) {
      story = 'Find all user profiles whose settings JSON contains the key-value pair `{"vip": true}` using the containment operator `@>`.';
      targetQuery = `SELECT \n  user_id,\n  profile_json->>'email' AS email\nFROM user_profiles\nWHERE profile_json @> '{"vip": true}';`;
      slots = {
        blank1: { correct: '@>', options: ['@>', '<@', '?', '?&'] },
        blank2: { correct: '\'{"vip": true}\'', options: ['\'{"vip": true}\'', '\'vip = true\'', '\'vip: true\'', '{"vip": true}'] }
      };
      takeaway = 'The `@>` containment operator checks whether the left JSONB value contains the right JSONB structure.';
      commonTrap = 'Using `<@` instead of `@>`: `<@` checks if the left side is contained by the right side!';
    } else if (i === 2) {
      story = 'Check if a top-level string key exists in a JSONB document using the existence operator `?`.';
      targetQuery = `SELECT \n  event_id,\n  payload\nFROM raw_events\nWHERE payload ? 'error_code';`;
      slots = {
        blank1: { correct: '?', options: ['?', '?&', '?|', '@>'] },
        blank2: { correct: '\'error_code\'', options: ['\'error_code\'', '"error_code"', 'error_code', '$.error_code'] }
      };
      takeaway = 'The `?` operator tests whether a specific top-level text key or string element exists in a JSONB document.';
      commonTrap = 'The `?` operator only checks top-level keys; it does not recurse into nested sub-objects.';
    } else if (i === 3) {
      story = 'Find transactions where ANY of the specified compliance flags (`SUSPICIOUS` or `SANCTION_HIT`) exist using `?|`.';
      targetQuery = `SELECT \n  txn_id,\n  audit_tags\nFROM flagged_transactions\nWHERE audit_tags ?| array['SUSPICIOUS', 'SANCTION_HIT'];`;
      slots = {
        blank1: { correct: '?|', options: ['?|', '?&', '?', '@>'] },
        blank2: { correct: 'array[\'SUSPICIOUS\', \'SANCTION_HIT\']', options: ['array[\'SUSPICIOUS\', \'SANCTION_HIT\']', '\'SUSPICIOUS, SANCTION_HIT\'', '(\'SUSPICIOUS\', \'SANCTION_HIT\')', '[\'SUSPICIOUS\', \'SANCTION_HIT\']'] }
      };
      takeaway = '`?|` checks if ANY string in the provided text array exists as a top-level key or array element.';
      commonTrap = 'Confusing `?|` (OR / ANY) with `?&` (AND / ALL): `?&` requires all specified keys to exist!';
    } else if (i === 4) {
      story = 'Accelerate containment queries on a 10M-row table by creating a GIN index on the JSONB column.';
      targetQuery = `CREATE INDEX idx_user_prefs_gin \nON user_profiles \nUSING GIN (preferences jsonb_path_ops);`;
      slots = {
        blank1: { correct: 'USING GIN', options: ['USING GIN', 'USING BTREE', 'USING HASH', 'USING BRIN'] },
        blank2: { correct: 'jsonb_path_ops', options: ['jsonb_path_ops', 'jsonb_ops', 'gist_ops', 'btree_ops'] }
      };
      takeaway = 'A GIN index with `jsonb_path_ops` creates hashes of entire path+value pairs, making `@>` containment queries much smaller and faster.';
      commonTrap = '`jsonb_path_ops` only supports the `@>` operator; it does not support `?`, `?|`, or `?&` (which require default `jsonb_ops`).';
    } else if (i <= 14) {
      story = `High-throughput index-accelerated portfolio screening level #${i}.`;
      targetQuery = `SELECT \n  fund_id,\n  metadata->>'fund_name' AS fund_name\nFROM investment_funds\nWHERE metadata @> '{"asset_class": "EQUITY", "regulated": true}'\n  AND (metadata->>'aum_millions')::NUMERIC >= 500;`;
      slots = {
        blank1: { correct: '@>', options: ['@>', '<@', '?', '?&'] },
        blank2: { correct: '\'{"asset_class": "EQUITY", "regulated": true}\'', options: ['\'{"asset_class": "EQUITY", "regulated": true}\'', '\'asset_class = EQUITY\'', 'metadata.asset_class', 'true'] },
        blank3: { correct: '::NUMERIC', options: ['::NUMERIC', '::BOOLEAN', '::TEXT', '::DATE'] },
        blank4: { correct: '>=', options: ['>=', '<=', '=', 'IS'] }
      };
      takeaway = 'GIN containment `@>` efficiently filters candidates before applying fine-grained numeric scalar comparisons.';
      commonTrap = 'Creating a standard B-Tree index on `metadata`: PostgreSQL cannot use a B-Tree index for `@>` containment queries!';
    } else {
      story = `Advanced JSONPath predicate querying with jsonb_path_exists for institutional risk management #${i}.`;
      targetQuery = `SELECT \n  contract_id,\n  counterparty_data->>'legal_name' AS cp_name\nFROM derivatives_contracts\nWHERE jsonb_path_exists(\n  counterparty_data,\n  '$.credit_ratings[*] ? (@.score >= 80 && @.agency == "MOODYS")'\n);`;
      slots = {
        blank1: { correct: 'jsonb_path_exists', options: ['jsonb_path_exists', 'jsonb_path_query', 'jsonb_path_match', 'json_extract'] },
        blank2: { correct: 'counterparty_data', options: ['counterparty_data', 'contract_id', '$.credit_ratings', 'metadata'] },
        blank3: { correct: '>=', options: ['>=', '<=', '=', 'LIKE'] },
        blank4: { correct: '==', options: ['==', '=', 'IS', 'MATCH'] }
      };
      takeaway = 'SQL/JSON standard `jsonb_path_exists` filters complex nested arrays with predicate filters `? (...)` inside the path.';
      commonTrap = 'Using single `=` inside JSONPath predicate expressions: JSONPath standard comparison requires `==`!';
    }

    quests.push({
      id: globalId++,
      discipline: 'JSONB GIN INDEXING & CONTAINMENT OPERATORS',
      disciplineKey: 'json_indexing_querying',
      tier,
      difficulty,
      tierColor,
      title: `Quest ${i}: ${DISCIPLINES[4].name} (Level ${i})`,
      category: 'JSON & Semi-Structured SQL',
      subcluster: 'GIN Indexes & Containment Operators',
      story,
      table: 'user_profiles',
      schemaSnippet: `CREATE TABLE user_profiles (\n  user_id INT PRIMARY KEY,\n  preferences JSONB NOT NULL,\n  updated_at TIMESTAMP\n);`,
      targetQuery,
      slots,
      scaffolding: {
        hint: 'Use @> for JSON containment, ? for key existence, and GIN indexes to make document queries lightning fast.',
        commonTrap,
        takeaway
      }
    });
  }

  return { metadata: DISCIPLINES, quests };
}

const { metadata, quests } = generateQuests();

const outJs = `// SECTION 15: JSON & SEMI-STRUCTURED DATA IN SQL (100 QUESTS)
// Generated by scratch/build_section15_json_vault.js

window.JSON_DISCIPLINES_METADATA = ${JSON.stringify(metadata, null, 2)};

window.QUESTS_SECTION_15 = ${JSON.stringify(quests, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../visualizer/quests_section15_data.js'), outJs, 'utf8');
console.log(`Generated visualizer/quests_section15_data.js with ${quests.length} quests across ${metadata.length} disciplines!`);
