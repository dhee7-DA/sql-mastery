// =============================================================================
// DATABASE THEORY, ARCHITECTURE & TECHNICAL INTERVIEW PREP COMPENDIUM
// Section 01 Foundations: RDBMS vs NoSQL, OLTP vs OLAP, ACID, B-Tree Indexes
// =============================================================================

window.THEORY_INTERVIEW_PREP = {
  overview: {
    title: "Database Theory, Architecture & Technical Interview Foundations",
    subtitle: "The core engineering principles, storage trade-offs, and transaction mechanics every data & financial analyst must know."
  },
  modules: [
    {
      id: "mod_rdbms_vs_nosql",
      title: "1. RDBMS vs. NoSQL Architecture",
      icon: "🏛️",
      summary: "Understanding the trade-offs between ACID relational systems and distributed document/key-value databases.",
      concepts: [
        {
          heading: "Relational Database Management Systems (RDBMS)",
          bullets: [
            "Examples: PostgreSQL, MySQL, Oracle, Microsoft SQL Server.",
            "Storage Model: Strict tabular structure with predefined schemas (columns, datatypes, constraints).",
            "Relationships: Normalized tables linked via Foreign Keys to prevent data redundancy (3NF).",
            "Transactions: Strict ACID compliance guaranteeing complete consistency.",
            "Best For: Financial ledgers, payment transactions, ERP, order fulfillment, and relational reporting."
          ]
        },
        {
          heading: "NoSQL Databases (Non-Relational)",
          bullets: [
            "Document (MongoDB): JSON/BSON documents with flexible schemas. Great for user profiles and nested catalogs.",
            "Key-Value (Redis, DynamoDB): O(1) latency key lookups. Ideal for session caches, rate-limiting, and cart states.",
            "Column-Family (Cassandra, ScyllaDB): High-throughput write distribution for time-series and IoT telemetry.",
            "Trade-Offs: Sacrifices ACID guarantees (often BASE: Basically Available, Soft state, Eventual consistency) to scale horizontally."
          ]
        }
      ],
      interviewTrap: "Interview Question: 'Why would Stripe never use MongoDB as their primary ledger database?'\nAnswer: Financial ledgers demand strict atomicity and serializability. MongoDB's eventual consistency can lead to phantom balances, dirty reads, and race conditions where money is spent twice."
    },
    {
      id: "mod_oltp_vs_olap",
      title: "2. OLTP vs. OLAP & Storage Layouts",
      icon: "⚡",
      summary: "Why transactional databases store rows together while analytical warehouses store columns together.",
      concepts: [
        {
          heading: "OLTP (Online Transaction Processing)",
          bullets: [
            "Examples: PostgreSQL, MySQL, AWS Aurora.",
            "Storage Engine: Row-oriented (pages store complete rows: colA, colB, colC sequentially on disk).",
            "Access Pattern: High volume of small, fast writes/updates and primary-key seeks (e.g. 'insert payment order #8812').",
            "Bottleneck: Massive aggregation queries (e.g. 'SUM(sales) across 50 million rows') require reading entire rows from disk into memory."
          ]
        },
        {
          heading: "OLAP (Online Analytical Processing)",
          bullets: [
            "Examples: Snowflake, Google BigQuery, ClickHouse, Amazon Redshift.",
            "Storage Engine: Columnar (pages store entire columns together: all values of 'amount_usd' stored in contiguous blocks).",
            "Access Pattern: Long-running analytical scans aggregating millions of rows on 2 or 3 columns.",
            "Benefit: Reading 'amount_usd' only reads that single column from disk. Unused columns (names, addresses) are completely skipped. Extreme compression ratios (10x)."
          ]
        }
      ],
      interviewTrap: "Interview Question: 'Why is running a SELECT * considered catastrophic in Snowflake or BigQuery?'\nAnswer: Columnar warehouses bill based on bytes scanned from storage. SELECT * forces the engine to uncompress and read every single column partition off disk, multiplying compute costs by 20x to 50x."
    },
    {
      id: "mod_acid_transactions",
      title: "3. ACID Guarantees & Transaction Isolation Levels",
      icon: "🛡️",
      summary: "The four non-negotiable guarantees that protect database integrity under concurrent user operations.",
      concepts: [
        {
          heading: "The ACID Principles",
          bullets: [
            "Atomicity (All-or-Nothing): A transaction either completes 100% or rolls back completely. If a bank transfer deducts $500 from Account A but crashes before crediting Account B, the entire transaction rolls back.",
            "Consistency: Transactions can only transition the database from one valid state to another, strictly satisfying all constraints (Foreign Keys, Unique, Check, Not Null).",
            "Isolation: Concurrent transactions execute without interfering with one another.",
            "Durability: Once a transaction commits, its writes are permanently saved to non-volatile disk/WAL logs even during sudden power failure."
          ]
        },
        {
          heading: "The 4 ANSI SQL Isolation Levels",
          bullets: [
            "Read Uncommitted (Weakest): Allows 'Dirty Reads' — reading uncommitted changes from another transaction that might later roll back.",
            "Read Committed (Default in Postgres): Only reads committed rows. Eliminates dirty reads, but allows 'Non-Repeatable Reads' (reading the same row twice in one transaction can yield different values).",
            "Repeatable Read (Default in MySQL InnoDB): Guarantees that any row read during a transaction retains the same value throughout.",
            "Serializable (Highest / Strict): Complete emulation of serial execution. Eliminates Phantom Reads. Prevents race conditions at the cost of higher lock contention."
          ]
        }
      ],
      interviewTrap: "Interview Question: 'What is a Dirty Read?'\nAnswer: A dirty read occurs when Transaction 1 updates a row without committing, and Transaction 2 reads that uncommitted data. If Transaction 1 subsequently rolls back, Transaction 2 has operated on phantom data that never legally existed."
    },
    {
      id: "mod_relational_integrity",
      title: "4. Relational Constraints & Schema Hygiene",
      icon: "🔑",
      summary: "How keys and integrity rules guarantee data correctness before data enters disk pages.",
      concepts: [
        {
          heading: "Key Types & Enforcements",
          bullets: [
            "Primary Key (PK): Uniquely identifies each row in a table. Must be strictly UNIQUE and NOT NULL. Almost always automatically backed by a B-Tree index.",
            "Natural Key vs. Surrogate Key: A natural key uses real-world attributes (e.g. SSN, VIN, Email); a surrogate key uses an arbitrary sequence (e.g. BIGSERIAL auto-increment or UUIDv4). Surrogate keys isolate databases from business changes.",
            "Foreign Key (FK): Enforces referential integrity between tables. Guarantees child rows cannot reference non-existent parent rows.",
            "UNIQUE Constraint: Ensures all non-null values in a column are distinct. Unlike Primary Keys, a column with a UNIQUE constraint can contain NULL values (in SQL standards, each NULL is distinct).",
            "CHECK Constraint: Enforces domain-level business validation (e.g. CHECK (price >= 0.00))."
          ]
        }
      ],
      interviewTrap: "Interview Question: 'Can a UNIQUE column contain more than one NULL value?'\nAnswer: In ANSI SQL and PostgreSQL/MySQL, YES! Because NULL represents 'UNKNOWN', NULL does not equal NULL. Therefore, multiple rows with NULL can exist in a UNIQUE column unless marked NOT NULL."
    },
    {
      id: "mod_indexing_btree",
      title: "5. B-Tree Index Mechanics & Storage Pages",
      icon: "🔍",
      summary: "How databases locate one record out of 100 million in 3 disk I/O operations.",
      concepts: [
        {
          heading: "B-Tree Index Anatomy",
          bullets: [
            "Balanced Tree Structure: Self-balancing search tree with Root Node -> Intermediate Branch Nodes -> Leaf Nodes.",
            "O(log N) Time Complexity: Searching a table of 100,000,000 rows requires traversing approximately 3 to 4 node levels.",
            "Clustered Index: Determines the physical order of rows on disk pages (usually the Primary Key). A table can only have ONE clustered index.",
            "Non-Clustered (Secondary) Index: A separate search structure containing the indexed column and a pointer back to the clustered index row (or disk page TID)."
          ]
        },
        {
          heading: "Index Seek vs. Full Table Scan",
          bullets: [
            "Index Seek: Fast traversal directly down the tree to the target leaf page. Used for selective filters (e.g. WHERE user_id = 9012).",
            "Full Table Scan (FTS): Reading every data page sequentially from disk. Executed when no index exists or when the query is non-selective (e.g. WHERE status != 'INACTIVE' matching 98% of rows).",
            "Buffer Pool Hit: Reading data pages already cached in RAM rather than incurring physical NVMe/SSD disk I/O."
          ]
        }
      ],
      interviewTrap: "Interview Question: 'Why does adding WHERE UPPER(email) = 'ALICE@CORP.COM' break an existing index on email?'\nAnswer: Wrapping an indexed column inside a scalar function forces the database engine to perform a Full Table Scan because the index holds raw 'email' values, not evaluated 'UPPER(email)' values. To fix this, use a Functional Index or normalize inputs before querying."
    }
  ]
};
