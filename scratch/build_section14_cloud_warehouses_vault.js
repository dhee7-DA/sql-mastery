const fs = require('fs');
const path = require('path');

const DISCIPLINES = [
  {
    key: 'qualify_window_filtering',
    name: 'QUALIFY WINDOW FILTERING SUPERPOWER',
    symbol: '⚡',
    color: '#38bdf8',
    concept: 'Filtering Window Results Inline (Snowflake / BigQuery / DuckDB / Databricks)',
    whenToUse: 'Deduplicating rows, keeping latest transaction per account, or top-N ranking without nested subqueries.',
    scenarios: 'FinTech customer ledger deduplication, finding the latest credit risk score, latest quote per ticker.',
    traps: 'QUALIFY is native in Snowflake, BigQuery, DuckDB, but does NOT exist in PostgreSQL/MySQL without a subquery!'
  },
  {
    key: 'partition_pruning_clustering',
    name: 'PARTITION PRUNING & CLUSTERING KEYS',
    symbol: '🧊',
    color: '#10b981',
    concept: 'Scanning Only Relevant Date Blocks in 100TB+ Data Warehouses',
    whenToUse: 'High-throughput petabyte analytics where scanning entire tables costs thousands of dollars per query.',
    scenarios: 'BigQuery _PARTITIONDATE pruning on 50TB transaction logs; Snowflake micro-partition pruning via clustering keys.',
    traps: 'Wrapping partition columns in scalar functions (e.g. DATE_ADD(created_at, ...)) destroys pruning and forces a full petabyte scan!'
  },
  {
    key: 'time_travel_zero_copy',
    name: 'TIME TRAVEL & ZERO-COPY CLONING',
    symbol: '⏳',
    color: '#f59e0b',
    concept: 'Point-in-Time Historical Auditing & Instant Metadata-Only Cloning',
    whenToUse: 'Restoring accidentally deleted records, recreating exact month-end financial snapshots before adjustments.',
    scenarios: 'Snowflake AT (TIMESTAMP => ...) or BEFORE (STATEMENT => ...), BigQuery FOR SYSTEM_TIME AS OF, zero-copy CLONE.',
    traps: 'Exceeding the cloud retention window (1 to 90 days); time-travel queries fail if data has moved to Fail-safe storage.'
  },
  {
    key: 'approximate_aggregations',
    name: 'PROBABILISTIC & APPROXIMATE ANALYTICS',
    symbol: '📊',
    color: '#ec4899',
    concept: 'HyperLogLog & Approximate Quantiles for Sub-Second Analytics on Billions of Rows',
    whenToUse: 'Computing unique transacting devices or median latency on billions of events where ~1% error is acceptable.',
    scenarios: 'APPROX_COUNT_DISTINCT(), HLL_COUNT.MERGE(), APPROX_QUANTILES(margin_pct, 100), APPROX_TOP_K().',
    traps: 'APPROX functions are probabilistic! Never use APPROX_COUNT_DISTINCT for regulatory financial balance sheets or tax filings.'
  },
  {
    key: 'parquet_lakehouse_duckdb',
    name: 'PARQUET LAKEHOUSE & ZERO-COPY DUCKDB',
    symbol: '🦆',
    color: '#a855f7',
    concept: 'Querying Compressed Columnar Parquet Files Directly Without Database Ingestion',
    whenToUse: 'Quantitative research on trade tick files, querying S3/GCS data lake files in-situ with projection pushdown.',
    scenarios: 'DuckDB read_parquet("s3://trades/*.parquet"), COPY ... TO "export.parquet", filter pushdown on statistics.',
    traps: 'Wildcard globbing directories with inconsistent Parquet schemas or missing partition directory conventions.'
  }
];

function generateQuests() {
  const quests = [];
  let globalId = 14001;

  DISCIPLINES.forEach((disc, discIndex) => {
    for (let i = 1; i <= 20; i++) {
      const level = i;
      let difficulty = 'Easy';
      if (level > 15) difficulty = 'Hard';
      else if (level > 7) difficulty = 'Medium';

      let questObj = null;

      if (disc.key === 'qualify_window_filtering') {
        questObj = generateQualifyQuest(globalId, level, difficulty, disc);
      } else if (disc.key === 'partition_pruning_clustering') {
        questObj = generatePartitionQuest(globalId, level, difficulty, disc);
      } else if (disc.key === 'time_travel_zero_copy') {
        questObj = generateTimeTravelQuest(globalId, level, difficulty, disc);
      } else if (disc.key === 'approximate_aggregations') {
        questObj = generateApproximateQuest(globalId, level, difficulty, disc);
      } else {
        questObj = generateParquetQuest(globalId, level, difficulty, disc);
      }

      quests.push(questObj);
      globalId++;
    }
  });

  return quests;
}

// 1. QUALIFY Window Filtering
function generateQualifyQuest(id, level, difficulty, disc) {
  const tables = ['Transactions', 'CustomerPortfolios', 'OrderFills', 'MarketTicks', 'CreditRiskLogs'];
  const t = tables[level % tables.length];

  if (level <= 7) {
    // Deduplication with ROW_NUMBER() = 1
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `QUALIFY Lvl ${level}: Deduplicate Latest ${t} via ROW_NUMBER()`,
      difficulty,
      description: `In modern data warehouses (Snowflake, BigQuery, DuckDB), the QUALIFY clause filters window calculations directly without nesting queries. Select the most recent record per account.`,
      table: t,
      template: [
        { text: 'SELECT account_id, tx_id, tx_timestamp, balance\nFROM ' },
        { isBlank: true, slotId: 'tbl', placeholder: '<table>' },
        { text: '\n' },
        { isBlank: true, slotId: 'qualify_kw', placeholder: '<filter_clause>' },
        { text: ' ROW_NUMBER() OVER (\n  PARTITION BY account_id\n  ORDER BY tx_timestamp ' },
        { isBlank: true, slotId: 'order_dir', placeholder: '<direction>' },
        { text: '\n) = ' },
        { isBlank: true, slotId: 'rank_val', placeholder: '<rank_n>' },
        { text: ';' }
      ],
      slots: {
        tbl: { correct: t, options: [t, 'AuditLogs', 'DimAccounts', 'TempLedger'] },
        qualify_kw: { correct: 'QUALIFY', options: ['QUALIFY', 'WHERE', 'HAVING', 'FILTER'] },
        order_dir: { correct: 'DESC', options: ['DESC', 'ASC', 'NULLS FIRST', 'LIMIT 1'] },
        rank_val: { correct: '1', options: ['1', '0', 'ALL', 'TOP'] }
      },
      explanation: `QUALIFY evaluates after window functions are computed, filtering rows where ROW_NUMBER() = 1 in a single scan without subquery overhead!`
    };
  } else if (level <= 15) {
    // Top-N per group via RANK() / DENSE_RANK() <= N
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `QUALIFY Lvl ${level}: Top Volume Trades per Desk via DENSE_RANK()`,
      difficulty,
      description: `Filter for the top 3 highest notional trades executed per trading desk today using QUALIFY and DENSE_RANK().`,
      table: t,
      template: [
        { text: 'SELECT desk_id, trader_id, trade_id, notional_amount\nFROM ' },
        { isBlank: true, slotId: 'tbl', placeholder: '<table>' },
        { text: '\nWHERE trade_status = \'SETTLED\'\n' },
        { isBlank: true, slotId: 'qualify_kw', placeholder: '<filter_clause>' },
        { text: ' ' },
        { isBlank: true, slotId: 'rank_fn', placeholder: '<window_func>' },
        { text: '() OVER (PARTITION BY desk_id ORDER BY notional_amount DESC) <= ' },
        { isBlank: true, slotId: 'top_n', placeholder: '<n>' },
        { text: ';' }
      ],
      slots: {
        tbl: { correct: t, options: [t, 'ArchivedTrades', 'OrderBook', 'SettlementQueue'] },
        qualify_kw: { correct: 'QUALIFY', options: ['QUALIFY', 'HAVING', 'WHERE', 'ORDER BY'] },
        rank_fn: { correct: 'DENSE_RANK', options: ['DENSE_RANK', 'SUM', 'COUNT_IF', 'NTILE'] },
        top_n: { correct: '3', options: ['3', '0', '1', '100'] }
      },
      explanation: `QUALIFY DENSE_RANK() OVER (...) <= 3 isolates top-3 positions without requiring a CTE or derived table!`
    };
  } else {
    // Temporal LEAD / LAG anomaly detection in QUALIFY
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `QUALIFY Lvl ${level}: Detect Sudden Price Jump via LAG()`,
      difficulty,
      description: `Identify ticks where the stock price deviated by more than $5.00 compared to the preceding quote using LAG() inside QUALIFY.`,
      table: t,
      template: [
        { text: 'SELECT ticker, quote_time, price\nFROM ' },
        { isBlank: true, slotId: 'tbl', placeholder: '<table>' },
        { text: '\n' },
        { isBlank: true, slotId: 'qualify_kw', placeholder: '<clause>' },
        { text: ' ABS(price - ' },
        { isBlank: true, slotId: 'lag_fn', placeholder: '<offset_fn>' },
        { text: '(price) OVER (PARTITION BY ticker ORDER BY quote_time)) > ' },
        { isBlank: true, slotId: 'thresh', placeholder: '<threshold>' },
        { text: ';' }
      ],
      slots: {
        tbl: { correct: t, options: [t, 'QuoteFeed', 'TapeA', 'HistoricalPrices'] },
        qualify_kw: { correct: 'QUALIFY', options: ['QUALIFY', 'HAVING', 'WHERE', 'CASE'] },
        lag_fn: { correct: 'LAG', options: ['LAG', 'LEAD', 'FIRST_VALUE', 'AVG'] },
        thresh: { correct: '5.00', options: ['5.00', '0.00', 'NULL', 'MAX'] }
      },
      explanation: `Evaluating LAG() directly in QUALIFY lets you pinpoint price volatility jumps in one clean pass across the dataset.`
    };
  }
}

// 2. Partition Pruning & Clustering
function generatePartitionQuest(id, level, difficulty, disc) {
  const tables = ['LedgerTransactions', 'ClickstreamEvents', 'CardAuths', 'MarketDepth', 'AuditTraces'];
  const t = tables[level % tables.length];

  if (level <= 7) {
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Partitioning Lvl ${level}: BigQuery Date-Partition Pruning`,
      difficulty,
      description: `In BigQuery, date-partitioned tables store days in separate physical storage blocks. Query transactions from the last 7 days without scanning the entire 50TB historical ledger.`,
      table: t,
      template: [
        { text: 'SELECT account_id, SUM(amount) AS total_settled\nFROM ' },
        { isBlank: true, slotId: 'tbl', placeholder: '<table>' },
        { text: '\nWHERE ' },
        { isBlank: true, slotId: 'part_col', placeholder: '<partition_pseudo_col>' },
        { text: ' >= DATE_SUB(CURRENT_DATE(), ' },
        { isBlank: true, slotId: 'interval_kw', placeholder: '<interval>' },
        { text: ' 7 DAY)\nGROUP BY account_id;' }
      ],
      slots: {
        tbl: { correct: t, options: [t, 'RawLedger', 'ArchiveStore', 'UnpartitionedLedger'] },
        part_col: { correct: '_PARTITIONDATE', options: ['_PARTITIONDATE', 'ROWNUM', 'BLOCK_ID', 'ID'] },
        interval_kw: { correct: 'INTERVAL', options: ['INTERVAL', 'DURATION', 'STEP', 'RANGE'] }
      },
      explanation: `Filtering directly on _PARTITIONDATE instructs BigQuery's storage engine to skip thousands of unread day partitions, saving petabytes of data scan fees!`
    };
  } else if (level <= 15) {
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Partitioning Lvl ${level}: Snowflake Cluster Keys for Range Pruning`,
      difficulty,
      description: `Specify table clustering keys in Snowflake to co-locate records physically by settlement date and organization ID, maximizing micro-partition pruning.`,
      table: t,
      template: [
        { text: 'ALTER TABLE ' },
        { isBlank: true, slotId: 'tbl', placeholder: '<table>' },
        { text: ' ' },
        { isBlank: true, slotId: 'cluster_kw', placeholder: '<cluster_clause>' },
        { text: ' (' },
        { isBlank: true, slotId: 'cluster_cols', placeholder: '<columns>' },
        { text: ');' }
      ],
      slots: {
        tbl: { correct: t, options: [t, 'TransactionsBackup', 'TempStore', 'StagingTbl'] },
        cluster_kw: { correct: 'CLUSTER BY', options: ['CLUSTER BY', 'PARTITION BY', 'GROUP BY', 'DISTRIBUTE BY'] },
        cluster_cols: { correct: 'settlement_date, org_id', options: ['settlement_date, org_id', 'amount, memo', 'status', 'tx_id'] }
      },
      explanation: `Snowflake uses CLUSTER BY (date, org_id) to organize 16MB micro-partitions. Queries filtering by those keys prune 99%+ of micro-partitions!`
    };
  } else {
    // SARGable partition boundary without function wrap
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Partitioning Lvl ${level}: Prune Partitions Without Function Blinding`,
      difficulty,
      description: `Never wrap partition columns in scalar functions. Filter the partition timestamp column directly between exact boundaries.`,
      table: t,
      template: [
        { text: 'SELECT COUNT(*) AS tx_count\nFROM ' },
        { isBlank: true, slotId: 'tbl', placeholder: '<table>' },
        { text: '\nWHERE ' },
        { isBlank: true, slotId: 'col_name', placeholder: '<col>' },
        { text: ' ' },
        { isBlank: true, slotId: 'between_kw', placeholder: '<range_operator>' },
        { text: ' \'2024-01-01 00:00:00\' AND \'2024-01-31 23:59:59\';' }
      ],
      slots: {
        tbl: { correct: t, options: [t, 'AllEvents', 'StagingHeap', 'ColdStorage'] },
        col_name: { correct: 'tx_timestamp', options: ['tx_timestamp', 'DATE(tx_timestamp)', 'TO_CHAR(tx_timestamp)', 'YEAR(tx_timestamp)'] },
        between_kw: { correct: 'BETWEEN', options: ['BETWEEN', 'IN', 'LIKE', 'OVERLAPS'] }
      },
      explanation: `Writing raw column boundaries with BETWEEN allows the query engine to prune partition blocks. Function wraps blind the pruning metadata!`
    };
  }
}

// 3. Time Travel & Zero-Copy Cloning
function generateTimeTravelQuest(id, level, difficulty, disc) {
  const tables = ['TradingPositions', 'CustomerBalances', 'GeneralLedger', 'LoanPortfolios', 'SecuritiesInventory'];
  const t = tables[level % tables.length];

  if (level <= 7) {
    // Snowflake AT (TIMESTAMP => ...)
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Time Travel Lvl ${level}: Query Historical Balances via AT TIMESTAMP`,
      difficulty,
      description: `In Snowflake, query historical ledger records exactly as they existed before an erroneous batch update occurred at 14:30 UTC.`,
      table: t,
      template: [
        { text: 'SELECT account_id, balance\nFROM ' },
        { isBlank: true, slotId: 'tbl', placeholder: '<table>' },
        { text: ' ' },
        { isBlank: true, slotId: 'at_kw', placeholder: '<travel_clause>' },
        { text: ' (' },
        { isBlank: true, slotId: 'ts_param', placeholder: '<timestamp_specifier>' },
        { text: ' => \'2024-03-15 14:29:00\'::TIMESTAMP_TZ)\nWHERE account_id = ' },
        { isBlank: true, slotId: 'acc_id', placeholder: '<acc>' },
        { text: ';' }
      ],
      slots: {
        tbl: { correct: t, options: [t, 'BalanceSnapshot', 'LedgerHistory', 'StagingTbl'] },
        at_kw: { correct: 'AT', options: ['AT', 'BEFORE', 'AS OF', 'PAST'] },
        ts_param: { correct: 'TIMESTAMP', options: ['TIMESTAMP', 'OFFSET', 'STATEMENT', 'VERSION'] },
        acc_id: { correct: '\'ACC-9021\'', options: ['\'ACC-9021\'', 'NULL', 'ALL', '0'] }
      },
      explanation: `Snowflake's AT (TIMESTAMP => ...) accesses immutable historical micro-partitions, reading table state at an exact point in time!`
    };
  } else if (level <= 15) {
    // BigQuery FOR SYSTEM_TIME AS OF
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Time Travel Lvl ${level}: BigQuery FOR SYSTEM_TIME AS OF`,
      difficulty,
      description: `In Google BigQuery, audit month-end balances as of exactly 2024-02-29 23:59:59 UTC using standard SQL time travel syntax.`,
      table: t,
      template: [
        { text: 'SELECT portfolio_id, total_nav\nFROM ' },
        { isBlank: true, slotId: 'tbl', placeholder: '<table>' },
        { text: '\n' },
        { isBlank: true, slotId: 'time_clause', placeholder: '<time_travel_syntax>' },
        { text: ' ' },
        { isBlank: true, slotId: 'ts_fn', placeholder: '<timestamp_fn>' },
        { text: '(\'2024-02-29 23:59:59\', \'UTC\')\nORDER BY total_nav DESC;' }
      ],
      slots: {
        tbl: { correct: t, options: [t, 'NavHistory', 'TempPortfolios', 'ArchiveLedger'] },
        time_clause: { correct: 'FOR SYSTEM_TIME AS OF', options: ['FOR SYSTEM_TIME AS OF', 'AT TIMESTAMP', 'WITH HISTORICAL TIME', 'TIME TRAVEL'] },
        ts_fn: { correct: 'TIMESTAMP', options: ['TIMESTAMP', 'DATE', 'PARSE_DATETIME', 'MAKE_TIMESTAMP'] }
      },
      explanation: `BigQuery's FOR SYSTEM_TIME AS OF clause lets you reconstruct exact historical table states within the 7-day time-travel window!`
    };
  } else {
    // Zero-Copy Clone
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Time Travel Lvl ${level}: Zero-Copy CLONE for Financial Backtesting`,
      difficulty,
      description: `Create an instantaneous, zero-cost replica of the production ledger table in the analytics schema without duplicating physical storage blocks.`,
      table: t,
      template: [
        { text: 'CREATE OR REPLACE TABLE analytics.' },
        { isBlank: true, slotId: 'clone_tbl', placeholder: '<target_table>' },
        { text: '\n' },
        { isBlank: true, slotId: 'clone_kw', placeholder: '<clone_keyword>' },
        { text: ' production.' },
        { isBlank: true, slotId: 'src_tbl', placeholder: '<source_table>' },
        { text: ' ' },
        { isBlank: true, slotId: 'before_kw', placeholder: '<historical_modifier>' },
        { text: ' (STATEMENT => \'0192a3f4-0001-2e45\');' }
      ],
      slots: {
        clone_tbl: { correct: `${t}_qa_clone`, options: [`${t}_qa_clone`, 'temp_copy', 'dump', 'backup'] },
        clone_kw: { correct: 'CLONE', options: ['CLONE', 'COPY', 'DUPLICATE', 'MIRROR'] },
        src_tbl: { correct: t, options: [t, 'ProdStore', 'StagingTbl', 'Archive'] },
        before_kw: { correct: 'BEFORE', options: ['BEFORE', 'AFTER', 'DURING', 'EXACT'] }
      },
      explanation: `Zero-copy CLONE in Snowflake copies metadata pointers only. It creates an isolated sandbox table in seconds without incurring extra storage fees until mutations occur!`
    };
  }
}

// 4. Probabilistic & Approximate Analytics
function generateApproximateQuest(id, level, difficulty, disc) {
  const tables = ['DeviceTelemetry', 'AdImpressions', 'PaymentClickstream', 'MarketQuotes', 'HighFreqOrders'];
  const t = tables[level % tables.length];

  if (level <= 7) {
    // APPROX_COUNT_DISTINCT
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Approximate Lvl ${level}: Sub-Second Unique Visitors via APPROX_COUNT_DISTINCT`,
      difficulty,
      description: `Counting exact distinct users over 100M rows with COUNT(DISTINCT user_id) causes heavy memory stalls. Use the probabilistic HyperLogLog algorithm for sub-second responses.`,
      table: t,
      template: [
        { text: 'SELECT date_key, ' },
        { isBlank: true, slotId: 'approx_fn', placeholder: '<approx_distinct_fn>' },
        { text: '(user_id) AS approx_dau\nFROM ' },
        { isBlank: true, slotId: 'tbl', placeholder: '<table>' },
        { text: '\n' },
        { isBlank: true, slotId: 'grp_kw', placeholder: '<group_clause>' },
        { text: ' date_key\nORDER BY date_key DESC;' }
      ],
      slots: {
        approx_fn: { correct: 'APPROX_COUNT_DISTINCT', options: ['APPROX_COUNT_DISTINCT', 'COUNT_DISTINCT', 'FAST_COUNT', 'ESTIMATE_USERS'] },
        tbl: { correct: t, options: [t, 'UserLogs', 'EventStream', 'ColdStore'] },
        grp_kw: { correct: 'GROUP BY', options: ['GROUP BY', 'ORDER BY', 'PARTITION BY', 'QUALIFY'] }
      },
      explanation: `APPROX_COUNT_DISTINCT() employs HyperLogLog sketches, calculating cardinality on millions of rows in milliseconds within a 1% error margin!`
    };
  } else if (level <= 15) {
    // APPROX_QUANTILES / APPROX_PERCENTILE
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Approximate Lvl ${level}: Fast Latency Percentiles via APPROX_QUANTILES`,
      difficulty,
      description: `Compute the p50, p90, and p99 transaction processing latencies using BigQuery's APPROX_QUANTILES array function.`,
      table: t,
      template: [
        { text: 'SELECT ' },
        { isBlank: true, slotId: 'quant_fn', placeholder: '<quantile_function>' },
        { text: '(latency_ms, ' },
        { isBlank: true, slotId: 'buckets', placeholder: '<num_quantiles>' },
        { text: ')[OFFSET(99)] AS p99_latency_ms\nFROM ' },
        { isBlank: true, slotId: 'tbl', placeholder: '<table>' },
        { text: '\nWHERE ' },
        { isBlank: true, slotId: 'status_cond', placeholder: '<filter>' },
        { text: ' = \'COMPLETED\';' }
      ],
      slots: {
        quant_fn: { correct: 'APPROX_QUANTILES', options: ['APPROX_QUANTILES', 'PERCENTILE_CONT', 'NTILE', 'BUCKET_ARRAY'] },
        buckets: { correct: '100', options: ['100', '10', '1', '1000'] },
        tbl: { correct: t, options: [t, 'LatencyAudit', 'HttpLog', 'GatewayMetrics'] },
        status_cond: { correct: 'tx_status', options: ['tx_status', 'flag', 'status_id', 'result'] }
      },
      explanation: `APPROX_QUANTILES(metric, 100) breaks values into 101 percentile thresholds, allowing instant extraction of p99 without full memory sorting!`
    };
  } else {
    // HyperLogLog Sketches HLL_COUNT.MERGE
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Approximate Lvl ${level}: Merge Precomputed HyperLogLog Sketches`,
      difficulty,
      description: `In BigQuery, merge daily precomputed HyperLogLog sketches to calculate 30-day rolling unique transacting accounts without scanning raw event streams.`,
      table: t,
      template: [
        { text: 'SELECT ' },
        { isBlank: true, slotId: 'merge_fn', placeholder: '<hll_merge_extract>' },
        { text: '(daily_hll_sketch) AS rolling_monthly_uniques\nFROM ' },
        { isBlank: true, slotId: 'tbl', placeholder: '<table>' },
        { text: '\nWHERE report_date >= DATE_SUB(CURRENT_DATE(), INTERVAL ' },
        { isBlank: true, slotId: 'days', placeholder: '<n>' },
        { text: ' DAY);' }
      ],
      slots: {
        merge_fn: { correct: 'HLL_COUNT.MERGE', options: ['HLL_COUNT.MERGE', 'COUNT.DISTINCT', 'MERGE_SKETCH', 'SUM_HLL'] },
        tbl: { correct: 'DailyUserSketches', options: ['DailyUserSketches', t, 'RawEvents', 'Archive'] },
        days: { correct: '30', options: ['30', '7', '365', '1'] }
      },
      explanation: `HyperLogLog sketches are additive! HLL_COUNT.MERGE combines daily summary sketches into multi-week distinct counts with zero row-level data access.`
    };
  }
}

// 5. Parquet Lakehouse & DuckDB
function generateParquetQuest(id, level, difficulty, disc) {
  const tables = ['trades', 'equities', 'orderbook', 'fx_quotes', 'settlements'];
  const t = tables[level % tables.length];

  if (level <= 7) {
    // DuckDB read_parquet
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Parquet Lvl ${level}: Query Remote Parquet Lake directly in DuckDB`,
      difficulty,
      description: `In DuckDB or modern lakehouses, query compressed columnar Parquet files on S3 directly using SQL without creating or loading a database table.`,
      table: 'trades_lake',
      template: [
        { text: 'SELECT symbol, SUM(volume) AS total_vol\nFROM ' },
        { isBlank: true, slotId: 'read_fn', placeholder: '<parquet_reader>' },
        { text: '(\'' },
        { isBlank: true, slotId: 'path_uri', placeholder: '<s3_uri>' },
        { text: '\')\n' },
        { isBlank: true, slotId: 'grp_kw', placeholder: '<group_clause>' },
        { text: ' symbol\nHAVING total_vol > 100000;' }
      ],
      slots: {
        read_fn: { correct: 'read_parquet', options: ['read_parquet', 'load_csv', 'scan_table', 'import_parquet'] },
        path_uri: { correct: `s3://financial-lake/${t}/*.parquet`, options: [`s3://financial-lake/${t}/*.parquet`, '/tmp/file.csv', 'trades.db', 'http://api/data'] },
        grp_kw: { correct: 'GROUP BY', options: ['GROUP BY', 'ORDER BY', 'QUALIFY', 'WHERE'] }
      },
      explanation: `read_parquet() streams only the requested column chunks and leverages row-group statistics to skip irrelevant blocks in remote S3 storage!`
    };
  } else if (level <= 15) {
    // Export query results directly to compressed Parquet
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Parquet Lvl ${level}: Export Analytical Results via COPY TO PARQUET`,
      difficulty,
      description: `Export the consolidated portfolio risk summary directly to Snappy-compressed Parquet for downstream data science consumption.`,
      table: 'portfolio_risk',
      template: [
        { text: 'COPY (\n  SELECT portfolio_id, risk_score, var_95\n  FROM portfolio_risk\n) TO \'' },
        { isBlank: true, slotId: 'target_path', placeholder: '<file_path>' },
        { text: '\' (' },
        { isBlank: true, slotId: 'fmt_kw', placeholder: '<format_keyword>' },
        { text: ' ' },
        { isBlank: true, slotId: 'fmt_type', placeholder: '<format_type>' },
        { text: ', COMPRESSION \'' },
        { isBlank: true, slotId: 'codec', placeholder: '<compression_codec>' },
        { text: '\');' }
      ],
      slots: {
        target_path: { correct: 's3://lake/risk_summary.parquet', options: ['s3://lake/risk_summary.parquet', 'risk.txt', 'stdout', 'null'] },
        fmt_kw: { correct: 'FORMAT', options: ['FORMAT', 'TYPE', 'ENCODING', 'OUTPUT'] },
        fmt_type: { correct: 'PARQUET', options: ['PARQUET', 'CSV', 'JSON', 'AVRO'] },
        codec: { correct: 'SNAPPY', options: ['SNAPPY', 'RAW', 'ZIP', 'GZIP_FAST'] }
      },
      explanation: `COPY (...) TO 'path.parquet' (FORMAT PARQUET, COMPRESSION 'SNAPPY') creates high-performance columnar outputs with built-in min/max metadata.`
    };
  } else {
    // Hive Partition pushdown filtering
    return {
      id,
      section: 'section14',
      disciplineKey: disc.key,
      title: `Parquet Lvl ${level}: Zero-Copy Hive Partition Pushdown`,
      difficulty,
      description: `DuckDB automatically discovers directory partition variables (e.g. year=2024/month=03) and prunes entire directory trees before reading Parquet headers.`,
      table: 'market_data',
      template: [
        { text: 'SELECT ticker, trade_price\nFROM read_parquet(\'s3://lake/market/' },
        { isBlank: true, slotId: 'hive_glob', placeholder: '<hive_pattern>' },
        { text: '\', ' },
        { isBlank: true, slotId: 'param_kw', placeholder: '<hive_flag>' },
        { text: ' = true)\nWHERE year = 2024 AND month = ' },
        { isBlank: true, slotId: 'month_num', placeholder: '<month>' },
        { text: ' AND ticker = \'NVDA\';' }
      ],
      slots: {
        hive_glob: { correct: '*/*/*.parquet', options: ['*/*/*.parquet', '*.csv', 'all.dat', 'data.parquet'] },
        param_kw: { correct: 'hive_partitioning', options: ['hive_partitioning', 'auto_detect', 'schema_inference', 'prune_dirs'] },
        month_num: { correct: '3', options: ['3', '0', 'NULL', 'ALL'] }
      },
      explanation: `Setting hive_partitioning = true allows DuckDB to read directory paths as virtual columns and skip unneeded month folders completely!`
    };
  }
}

// Generate all 100
const allQuests = generateQuests();
console.log(`Generated ${allQuests.length} Section 14 Cloud Warehouse Quests!`);

const outputContent = `// SECTION 14: CLOUD DATA WAREHOUSES & MODERN SQL (SNOWFLAKE, BIGQUERY, DUCKDB, QUALIFY)
// 100 Master Quests across 5 Core Modern Analytical Disciplines (20 Quests Each)

window.WAREHOUSE_DISCIPLINES_METADATA = ${JSON.stringify(DISCIPLINES, null, 2)};

window.QUESTS_SECTION_14 = ${JSON.stringify(allQuests, null, 2)};
`;

const outputPath = path.join(__dirname, '../visualizer/quests_section14_data.js');
fs.writeFileSync(outputPath, outputContent, 'utf8');
console.log(`Saved Section 14 data to: ${outputPath}`);
