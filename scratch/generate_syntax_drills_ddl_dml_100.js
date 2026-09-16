// Generator script for Topic 17: DDL & DML Schema Modifications & Data Mutation (#1601 to #1700)
// Exactly 100 drills across 10 everyday relatable schemas:
// Students, Books, Employees, GroceryItems, Orders, MusicTracks, GymMembers, MovieReviews, FlightSchedule, PetClinic

const fs = require('fs');

const SCHEMAS = [
  { table: 'Students', schema: 'id, name, major, gpa, year_level, enrollment_date' },
  { table: 'Books', schema: 'id, title, author, genre, price, published_year, stock_quantity' },
  { table: 'Employees', schema: 'id, name, department, salary, hire_date, state' },
  { table: 'GroceryItems', schema: 'id, item_name, category, price, stock_quantity, supplier_id' },
  { table: 'Orders', schema: 'id, customer_name, order_date, total_amount, status, payment_method' },
  { table: 'MusicTracks', schema: 'id, track_name, artist, album, duration_seconds, release_year, plays' },
  { table: 'GymMembers', schema: 'id, member_name, membership_type, join_date, monthly_fee, active_status' },
  { table: 'MovieReviews', schema: 'id, movie_title, reviewer_name, rating, review_date, platform' },
  { table: 'FlightSchedule', schema: 'id, flight_number, origin, destination, departure_time, ticket_price, status' },
  { table: 'PetClinic', schema: 'id, pet_name, animal_type, breed, age, owner_name, visit_date' }
];

const SUBCLUSTERS = [
  {
    subcluster: "17.1 Basic Single-Row INSERT INTO",
    pattern: (t) => {
      const col1 = t.schema.split(', ')[1];
      const col2 = t.schema.split(', ')[2];
      const q = `INSERT INTO ${t.table} (${col1}, ${col2}) VALUES ('New Entry', 'Standard');`;
      return {
        title: `${t.table} Single-Row Ingestion`,
        scenario: `A new record has arrived for ${t.table}. Ingest the entity providing explicit column targets and values.`,
        objective: `Execute a standard INSERT INTO statement specifying target columns and literal values.`,
        query: q,
        blueprint: `INSERT INTO table_name (col1, col2)\nVALUES ('val1', 'val2');`,
        rule: `Explicitly listing target columns in the INSERT statement makes code resilient against future schema changes and column reordering.`,
        trap: `Omitting the column list (INSERT INTO table VALUES (...)) fails immediately if any new column or default timestamp is added to the table definition.`,
        eli5: `Like filling out a form with specific boxes labeled 'Name' and 'Category' instead of just writing words on a blank sheet hoping they go in the right spots.`,
        commonMistakes: [`Forgetting the column list in INSERT INTO`, `Mismatched order between column names and VALUES items`],
        learningOutcomes: [`Write explicit-target INSERT statements`, `Prevent column-shift failures in production migrations`],
        slots: [
          { blank: "INSERT INTO", answer: "INSERT INTO", alternatives: ["UPDATE", "SELECT INTO"] },
          { blank: "VALUES", answer: "VALUES", alternatives: ["SET", "VALUE"] }
        ]
      };
    }
  },
  {
    subcluster: "17.2 Multi-Row Bulk INSERT INTO",
    pattern: (t) => {
      const col1 = t.schema.split(', ')[1];
      const col2 = t.schema.split(', ')[2];
      const q = `INSERT INTO ${t.table} (${col1}, ${col2}) VALUES ('Batch Alpha', 'Tier 1'), ('Batch Beta', 'Tier 2');`;
      return {
        title: `${t.table} High-Throughput Batch Ingestion`,
        scenario: `A microservice receives a batch payload of 2 new ${t.table} entities. Ingest both rows in a single atomic database roundtrip.`,
        objective: `Use multi-row VALUES syntax to insert multiple records within a single SQL statement.`,
        query: q,
        blueprint: `INSERT INTO table_name (col1, col2)\nVALUES ('val1_a', 'val2_a'), ('val1_b', 'val2_b');`,
        rule: `Comma-separated tuples inside VALUES allow inserting hundreds or thousands of rows in one roundtrip, drastically reducing network latency and transaction overhead.`,
        trap: `Each tuple must contain the exact same number of values matching the column target list.`,
        eli5: `Instead of making two separate trips to mail two letters, put both letters in the same mailbox in one single visit!`,
        commonMistakes: [`Writing separate INSERT statements in a slow loop instead of bulk VALUES`, `Missing commas between parentheses tuples`],
        learningOutcomes: [`Execute multi-row batch inserts in a single transaction`, `Optimize network and transaction log throughput`],
        slots: [
          { blank: "VALUES", answer: "VALUES", alternatives: ["ROWS", "ENTRIES"] },
          { blank: "INSERT INTO", answer: "INSERT INTO", alternatives: ["ADD INTO"] }
        ]
      };
    }
  },
  {
    subcluster: "17.3 INSERT INTO ... SELECT (ETL Staging)",
    pattern: (t) => {
      const col1 = t.schema.split(', ')[1];
      const col2 = t.schema.split(', ')[2];
      const archiveTable = `${t.table}_Archive`;
      const q = `INSERT INTO ${archiveTable} (${col1}, ${col2}) SELECT ${col1}, ${col2} FROM ${t.table} WHERE ${t.schema.split(', ')[0]} > 100;`;
      return {
        title: `${t.table} Archive Ingestion via SELECT`,
        scenario: `Migrate all overflow records from ${t.table} directly into ${archiveTable} without bringing the rows into application memory.`,
        objective: `Use INSERT INTO ... SELECT to populate a target table directly from an existing query result.`,
        query: q,
        blueprint: `INSERT INTO target_table (col1, col2)\nSELECT col1, col2 FROM source_table WHERE condition;`,
        rule: `INSERT INTO ... SELECT executes an in-engine data pump. No VALUES keyword is used; the SELECT projection directly feeds the target schema.`,
        trap: `Do NOT include the VALUES keyword when piping from a SELECT query. Writing INSERT INTO ... VALUES SELECT ... is a syntax error.`,
        eli5: `Like a conveyor belt directly between two rooms: rows move straight from Table A into Table B without any human carrying them one by one.`,
        commonMistakes: [`Accidentally typing VALUES before SELECT`, `Mismatched column order between target list and SELECT projection`],
        learningOutcomes: [`Execute set-based ETL transformations inside the database`, `Eliminate application-side data roundtrips for table copies`],
        slots: [
          { blank: "INSERT INTO", answer: "INSERT INTO", alternatives: ["INSERT", "COPY INTO"] },
          { blank: "SELECT", answer: "SELECT", alternatives: ["VALUES", "FROM"] }
        ]
      };
    }
  },
  {
    subcluster: "17.4 Targeted UPDATE with WHERE Clause",
    pattern: (t) => {
      const colName = t.schema.split(', ')[1];
      const colTarget = t.schema.split(', ')[2];
      const q = `UPDATE ${t.table} SET ${colTarget} = 'Archived' WHERE ${t.schema.split(', ')[0]} = 42;`;
      return {
        title: `${t.table} Primary-Key Targeted UPDATE`,
        scenario: `Update the status/category of record #42 in ${t.table} to 'Archived' while safeguarding all other rows in the table.`,
        objective: `Execute a targeted UPDATE statement bound to an exact row identifier via WHERE.`,
        query: q,
        blueprint: `UPDATE table_name\nSET target_col = 'new_value'\nWHERE id_col = 42;`,
        rule: `UPDATE modifies existing records in place. The SET clause specifies the column-value pairs, and the WHERE clause restricts which rows are touched.`,
        trap: `Running UPDATE without a WHERE clause silently overwrites EVERY row in the entire table!`,
        eli5: `Targeted update is like using a laser pointer to change one student's locker tag, rather than a paint roller that changes all 500 lockers at once!`,
        commonMistakes: [`Forgetting the WHERE clause and causing global data loss`, `Using WHERE in place of SET for the assignment`],
        learningOutcomes: [`Safely update targeted rows in database tables`, `Enforce strict WHERE predicate hygiene before modifying state`],
        slots: [
          { blank: "UPDATE", answer: "UPDATE", alternatives: ["SET", "MODIFY"] },
          { blank: "SET", answer: "SET", alternatives: ["UPDATE", "ASSIGN"] }
        ]
      };
    }
  },
  {
    subcluster: "17.5 Multi-Column & Arithmetic UPDATE",
    pattern: (t) => {
      const colNum = t.schema.split(', ')[3];
      const colText = t.schema.split(', ')[2];
      const q = `UPDATE ${t.table} SET ${colNum} = ${colNum} * 1.10, ${colText} = 'Adjusted' WHERE ${t.schema.split(', ')[0]} <= 10;`;
      return {
        title: `${t.table} Multi-Column Adjustment`,
        scenario: `Apply a 10% upward arithmetic adjustment to ${colNum} and mark ${colText} as 'Adjusted' for the first 10 rows of ${t.table}.`,
        objective: `Update multiple columns simultaneously including arithmetic field modifications in a single statement.`,
        query: q,
        blueprint: `UPDATE table_name\nSET numeric_col = numeric_col * 1.10, status_col = 'Updated'\nWHERE condition;`,
        rule: `Multiple column assignments in a SET clause are separated by commas. Columns can reference their own current values in expressions.`,
        trap: `Do not use AND between SET assignments! Write 'SET a = 1, b = 2', NOT 'SET a = 1 AND b = 2'.`,
        eli5: `In one step, increase prices by 10% AND stamp the receipt with 'Adjusted'—just separate the two tasks with a comma!`,
        commonMistakes: [`Using AND instead of commas between column assignments in SET`, `Forgetting to qualify numeric operations`],
        learningOutcomes: [`Perform in-place arithmetic updates across multiple columns`, `Apply proper comma syntax for multi-column SET operations`],
        slots: [
          { blank: "SET", answer: "SET", alternatives: ["WHERE", "VALUES"] },
          { blank: "WHERE", answer: "WHERE", alternatives: ["HAVING", "ON"] }
        ]
      };
    }
  },
  {
    subcluster: "17.6 Safe DELETE with WHERE Predicate",
    pattern: (t) => {
      const idCol = t.schema.split(', ')[0];
      const q = `DELETE FROM ${t.table} WHERE ${idCol} = 999;`;
      return {
        title: `${t.table} Targeted Record Deletion`,
        scenario: `A canceled entity (#999) needs to be permanently purged from ${t.table}.`,
        objective: `Execute a guarded DELETE FROM statement targeting an exact primary key.`,
        query: q,
        blueprint: `DELETE FROM table_name\nWHERE id_column = 999;`,
        rule: `DELETE FROM removes specific rows matching the WHERE predicate while preserving table structure, schema definition, and indexes.`,
        trap: `DELETE FROM table without a WHERE clause empties the entire table row by row, firing triggers and filling transaction logs!`,
        eli5: `Take the file folder with ID 999 out of the filing cabinet and shred it. All other folders stay in the cabinet untouched.`,
        commonMistakes: [`Writing DELETE * FROM table (asterisk is invalid syntax for DELETE)`, `Omitting WHERE clause in production scripts`],
        learningOutcomes: [`Execute safe row-level deletion with exact predicates`, `Distinguish row-level deletion from table destruction`],
        slots: [
          { blank: "DELETE FROM", answer: "DELETE FROM", alternatives: ["DROP FROM", "REMOVE FROM"] },
          { blank: "WHERE", answer: "WHERE", alternatives: ["HAVING", "ON"] }
        ]
      };
    }
  },
  {
    subcluster: "17.7 High-Performance TRUNCATE TABLE",
    pattern: (t) => {
      const stagingTable = `${t.table}_Staging`;
      const q = `TRUNCATE TABLE ${stagingTable};`;
      return {
        title: `${t.table} Staging Environment Flush`,
        scenario: `Before the nightly ETL run, the temporary staging table ${stagingTable} must be instantly cleared with zero row-by-row logging overhead.`,
        objective: `Use TRUNCATE TABLE to perform a fast, DDL-level deallocation of all table pages and reset auto-increment counters.`,
        query: q,
        blueprint: `TRUNCATE TABLE table_name;`,
        rule: `TRUNCATE TABLE is a DDL command that deallocates the table's data storage pages directly. It is much faster than DELETE, cannot take a WHERE clause, and resets identity seeds.`,
        trap: `TRUNCATE cannot be filtered with WHERE and cannot be executed on tables referenced by active FOREIGN KEY constraints.`,
        eli5: `DELETE is like using an eraser on every single line in a notebook. TRUNCATE is tearing out all the written pages at once—instant and brand new!`,
        commonMistakes: [`Trying to add a WHERE clause to TRUNCATE`, `Expecting row-level DELETE triggers to fire during a TRUNCATE`],
        learningOutcomes: [`Differentiate DDL TRUNCATE vs DML DELETE performance`, `Manage staging table flushes and identity seed resets`],
        slots: [
          { blank: "TRUNCATE TABLE", answer: "TRUNCATE TABLE", alternatives: ["DELETE TABLE", "DROP TABLE"] },
          { blank: stagingTable, answer: stagingTable, alternatives: [t.table] }
        ]
      };
    }
  },
  {
    subcluster: "17.8 Basic CREATE TABLE with Constraints",
    pattern: (t) => {
      const newTable = `${t.table}_Catalog`;
      const q = `CREATE TABLE ${newTable} (item_id INT PRIMARY KEY, title VARCHAR(120) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
      return {
        title: `${t.table} Catalog Schema Creation`,
        scenario: `Provision a dedicated catalog table with a Primary Key, a required NOT NULL title, and an automatic timestamp default.`,
        objective: `Write a clean DDL CREATE TABLE statement defining column types and foundational constraints.`,
        query: q,
        blueprint: `CREATE TABLE table_name (\n  col1 INT PRIMARY KEY,\n  col2 VARCHAR(100) NOT NULL,\n  col3 TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`,
        rule: `CREATE TABLE defines the physical schema structure, column data types, nullability rules, primary keys, and default expressions.`,
        trap: `Forgetting comma separators between column definitions, or putting a trailing comma after the final column before the closing parenthesis.`,
        eli5: `Like designing a blueprint for a brand new building before any furniture or people move inside!`,
        commonMistakes: [`Placing a trailing comma after the last column definition`, `Omitting PRIMARY KEY on newly created entity tables`],
        learningOutcomes: [`Write standard DDL table creation statements`, `Enforce data integrity with PRIMARY KEY, NOT NULL, and DEFAULT`],
        slots: [
          { blank: "CREATE TABLE", answer: "CREATE TABLE", alternatives: ["NEW TABLE", "MAKE TABLE"] },
          { blank: "PRIMARY KEY", answer: "PRIMARY KEY", alternatives: ["UNIQUE", "INDEX"] }
        ]
      };
    }
  },
  {
    subcluster: "17.9 Schema Evolution with ALTER TABLE",
    pattern: (t) => {
      const q = `ALTER TABLE ${t.table} ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;`;
      return {
        title: `${t.table} Verification Flag Migration`,
        scenario: `Extend the live ${t.table} schema by adding a new boolean verification column with a safe default value.`,
        objective: `Use ALTER TABLE ADD COLUMN to evolve an existing relational table without dropping or re-creating it.`,
        query: q,
        blueprint: `ALTER TABLE table_name\nADD COLUMN new_col_name DATA_TYPE DEFAULT default_value;`,
        rule: `ALTER TABLE allows in-place structural changes including adding columns, dropping columns, modifying types, and adding constraints.`,
        trap: `Adding a NOT NULL column without a DEFAULT value on a table with existing rows will fail because existing rows have no valid value for the new column.`,
        eli5: `Like adding a new room onto an existing house while people are still living inside it!`,
        commonMistakes: [`Omitting the DEFAULT value when adding a NOT NULL column to populated tables`, `Using CREATE instead of ALTER for existing tables`],
        learningOutcomes: [`Perform zero-downtime schema evolution with ALTER TABLE`, `Set safe defaults during column additions`],
        slots: [
          { blank: "ALTER TABLE", answer: "ALTER TABLE", alternatives: ["UPDATE TABLE", "MODIFY TABLE"] },
          { blank: "ADD COLUMN", answer: "ADD COLUMN", alternatives: ["INSERT COLUMN", "NEW COLUMN"] }
        ]
      };
    }
  },
  {
    subcluster: "17.10 Idempotent UPSERT (ON DUPLICATE KEY UPDATE)",
    pattern: (t) => {
      const idCol = t.schema.split(', ')[0];
      const colVal = t.schema.split(', ')[3];
      const q = `INSERT INTO ${t.table} (${idCol}, ${colVal}) VALUES (1, 100) ON DUPLICATE KEY UPDATE ${colVal} = ${colVal} + 1;`;
      return {
        title: `${t.table} Conflict-Free Counter Upsert`,
        scenario: `Increment a counter metric on ${t.table} record #1 if it already exists, or insert it cleanly with an initial value if absent.`,
        objective: `Execute an idempotent UPSERT using MySQL's ON DUPLICATE KEY UPDATE syntax.`,
        query: q,
        blueprint: `INSERT INTO table_name (id, metric)\nVALUES (1, 100)\nON DUPLICATE KEY UPDATE metric = metric + 1;`,
        rule: `ON DUPLICATE KEY UPDATE attempts a standard INSERT. If a duplicate PRIMARY KEY or UNIQUE constraint is triggered, it automatically pivots to an UPDATE.`,
        trap: `The conflict detection only triggers on duplicate PRIMARY KEY or UNIQUE indexed columns, not regular unindexed columns.`,
        eli5: `If the locker is empty, put the box inside. If someone already has that locker, just add one more sticker to their box instead of crashing!`,
        commonMistakes: [`Assuming UPSERT works on non-unique columns`, `Forgetting the UPDATE keyword after ON DUPLICATE KEY`],
        learningOutcomes: [`Write idempotent write operations with ON DUPLICATE KEY UPDATE`, `Eliminate race conditions between SELECT and INSERT checks`],
        slots: [
          { blank: "ON DUPLICATE KEY UPDATE", answer: "ON DUPLICATE KEY UPDATE", alternatives: ["ON CONFLICT DO UPDATE", "IF EXISTS UPDATE"] },
          { blank: "INSERT INTO", answer: "INSERT INTO", alternatives: ["UPDATE"] }
        ]
      };
    }
  }
];

const drills = [];
let drillId = 1601;

SUBCLUSTERS.forEach((sub, subIdx) => {
  SCHEMAS.forEach((schemaObj, schemaIdx) => {
    const p = sub.pattern(schemaObj);
    const num = drillId++;
    
    // Generate token bank
    const tokens = [];
    p.slots.forEach((s, sIdx) => {
      tokens.push({ id: `tok_${num}_${sIdx}`, text: s.answer });
      if (s.alternatives) {
        s.alternatives.forEach((alt, aIdx) => {
          tokens.push({ id: `tok_${num}_alt_${sIdx}_${aIdx}`, text: alt });
        });
      }
    });

    // Shuffle tokens
    const shuffledTokens = tokens.sort(() => Math.random() - 0.5);

    drills.push({
      drillNumber: num,
      topicId: 17,
      topicName: "Topic 17: DDL & DML Schema Modifications & Data Mutation",
      subcluster: sub.subcluster,
      title: `Drill #${num}: ${p.title}`,
      table: schemaObj.table,
      scenario: p.scenario,
      businessObjective: p.objective,
      schemaSnippet: schemaObj.schema,
      targetQuery: p.query,
      syntaxBlueprint: p.blueprint,
      syntaxRule: p.rule,
      syntaxTrap: p.trap,
      eli5Story: p.eli5,
      commonMistakes: p.commonMistakes,
      learningOutcomes: p.learningOutcomes,
      challengeSlots: {
        blanks: p.slots.map(s => s.blank),
        correctAnswers: p.slots.map(s => s.answer),
        tokenBank: shuffledTokens
      }
    });
  });
});

console.log(`Topic 17: Generated ${drills.length} drills (Drill #1601 to #${drillId - 1})`);
fs.writeFileSync('scratch/syntax_drills_t17.json', JSON.stringify(drills, null, 2), 'utf8');
console.log('Successfully written scratch/syntax_drills_t17.json');
