// Generator script for Topic 16: Set Operations & Combined Queries (#1501 to #1600)
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
    subcluster: "16.1 UNION ALL Simple Row Stacking",
    pattern: (t) => {
      const q = `SELECT ${t.schema.split(', ')[1]} AS name, ${t.schema.split(', ')[3]} AS metric FROM ${t.table} WHERE ${t.schema.split(', ')[3]} > 50 UNION ALL SELECT ${t.schema.split(', ')[1]} AS name, ${t.schema.split(', ')[3]} AS metric FROM ${t.table} WHERE ${t.schema.split(', ')[3]} <= 50;`;
      return {
        title: `${t.table} Full Metric Union Stack`,
        scenario: `Management wants an un-deduplicated stack of high-metric and low-metric ${t.table} combined into a single unified stream.`,
        objective: `Combine two query result sets from ${t.table} using UNION ALL to stack rows without deduplication.`,
        query: q,
        blueprint: `SELECT col1, col2 FROM table1 WHERE condition1\nUNION ALL\nSELECT col1, col2 FROM table1 WHERE condition2;`,
        rule: `UNION ALL directly appends result sets from two SELECT statements. It does NOT remove duplicate rows and avoids the sorting overhead of UNION.`,
        trap: `Both SELECT queries must have the exact same number of columns with compatible data types.`,
        eli5: `Think of UNION ALL as taping two lists together end-to-end. It takes every single row from list 1 and dumps list 2 right under it without checking for duplicates.`,
        commonMistakes: [`Using UNION instead of UNION ALL when duplicates should be preserved or sorting is unnecessary`, `Mismatched column counts between the top and bottom queries`],
        learningOutcomes: [`Master basic row concatenation with UNION ALL`, `Understand performance advantages of avoiding implicit deduplication`],
        slots: [
          { blank: "UNION ALL", answer: "UNION ALL", alternatives: ["UNION"] },
          { blank: "metric", answer: "metric", alternatives: ["val", "score"] }
        ]
      };
    }
  },
  {
    subcluster: "16.2 UNION with Implicit Deduplication",
    pattern: (t) => {
      const col = t.schema.split(', ')[2];
      const q = `SELECT ${col} FROM ${t.table} WHERE ${t.schema.split(', ')[3]} > 40 UNION SELECT ${col} FROM ${t.table} WHERE ${t.schema.split(', ')[0]} < 5;`;
      return {
        title: `${t.table} Distinct Attribute Union`,
        scenario: `The analytics department needs a distinct, unique roster of ${col} values extracted from both high-value and early ${t.table} rows.`,
        objective: `Combine two SELECT queries with UNION to automatically discard duplicate rows.`,
        query: q,
        blueprint: `SELECT col FROM table WHERE condition1\nUNION\nSELECT col FROM table WHERE condition2;`,
        rule: `UNION performs an implicit DISTINCT across the combined result set, executing an internal sort or hash to eliminate identical rows.`,
        trap: `UNION has a performance cost on large tables because the database must sort the combined rows to drop duplicates. Use UNION ALL if duplicates are impossible or acceptable.`,
        eli5: `UNION is like combining two guest lists and erasing anyone whose name appears on both lists, so each name only appears once.`,
        commonMistakes: [`Forgetting that UNION discards duplicate values across both sets`, `Assuming UNION runs faster than UNION ALL`],
        learningOutcomes: [`Use UNION for set union with automatic deduplication`, `Evaluate sort overhead vs row uniqueness requirements`],
        slots: [
          { blank: "UNION", answer: "UNION", alternatives: ["UNION ALL"] },
          { blank: col, answer: col, alternatives: ["*"] }
        ]
      };
    }
  },
  {
    subcluster: "16.3 Matching Column Arity & Compatibility",
    pattern: (t) => {
      const col1 = t.schema.split(', ')[0];
      const col2 = t.schema.split(', ')[1];
      const q = `SELECT ${col1} AS entity_id, ${col2} AS entity_label FROM ${t.table} WHERE ${col1} <= 5 UNION ALL SELECT ${col1} AS entity_id, ${col2} AS entity_label FROM ${t.table} WHERE ${col1} > 5;`;
      return {
        title: `${t.table} Strict Two-Column Arity Match`,
        scenario: `Ensure the set query adheres strictly to relational calculus by matching identical column arity (2 columns) across both branches.`,
        objective: `Construct a set query ensuring column count and data types are aligned.`,
        query: q,
        blueprint: `SELECT id AS entity_id, label AS entity_label FROM table WHERE id <= 5\nUNION ALL\nSELECT id AS entity_id, label AS entity_label FROM table WHERE id > 5;`,
        rule: `Set operators require identical column arity (the same number of selected attributes) in every branch of the query.`,
        trap: `Attempting to SELECT 3 columns in the top query and 2 columns in the bottom query causes a fatal SQL syntax error.`,
        eli5: `You cannot stack a 2-column table on top of a 3-column table—the blocks won't fit! Every query in the union must have the exact same number of columns.`,
        commonMistakes: [`Selecting different numbers of columns across UNION branches`, `Mismatching data types (e.g., stacking text onto integers without casting)`],
        learningOutcomes: [`Enforce strict column count parity across set operations`, `Guarantee type compatibility between corresponding columns`],
        slots: [
          { blank: "entity_id", answer: "entity_id", alternatives: ["id"] },
          { blank: "UNION ALL", answer: "UNION ALL", alternatives: ["UNION"] }
        ]
      };
    }
  },
  {
    subcluster: "16.4 Positional Alias Naming Rule",
    pattern: (t) => {
      const col1 = t.schema.split(', ')[1];
      const col2 = t.schema.split(', ')[2];
      const q = `SELECT ${col1} AS primary_descriptor FROM ${t.table} WHERE ${t.schema.split(', ')[0]} = 1 UNION ALL SELECT ${col2} AS secondary_descriptor FROM ${t.table} WHERE ${t.schema.split(', ')[0]} = 2;`;
      return {
        title: `${t.table} Header Alias Inheritance`,
        scenario: `Test the positional alias inheritance rule where the final output column header is determined solely by the first SELECT statement.`,
        objective: `Observe that the first SELECT statement's alias (primary_descriptor) controls the final result set column name.`,
        query: q,
        blueprint: `SELECT col1 AS output_header FROM table WHERE condition1\nUNION ALL\nSELECT col2 AS ignored_alias FROM table WHERE condition2;`,
        rule: `In SQL set operations, the column names in the final result set are governed entirely by the first SELECT query. Subsequent aliases in lower branches are ignored.`,
        trap: `Do not expect the output column to be called 'secondary_descriptor'—the first query's alias 'primary_descriptor' always wins.`,
        eli5: `The first query sets the name badge on top of the column. Even if the second query tries to rename it, SQL only reads the badge from the very first query!`,
        commonMistakes: [`Trying to reference lower-branch column aliases in downstream code`, `Assuming each branch can have separate output column headers`],
        learningOutcomes: [`Understand alias inheritance in SQL set operations`, `Structure first-branch column naming cleanly`],
        slots: [
          { blank: "primary_descriptor", answer: "primary_descriptor", alternatives: ["descriptor"] },
          { blank: "UNION ALL", answer: "UNION ALL", alternatives: ["UNION"] }
        ]
      };
    }
  },
  {
    subcluster: "16.5 Global ORDER BY Placement",
    pattern: (t) => {
      const col1 = t.schema.split(', ')[1];
      const colOrder = t.schema.split(', ')[3];
      const q = `SELECT ${col1}, ${colOrder} FROM ${t.table} WHERE ${colOrder} > 80 UNION ALL SELECT ${col1}, ${colOrder} FROM ${t.table} WHERE ${colOrder} < 40 ORDER BY ${colOrder} DESC;`;
      return {
        title: `${t.table} Global Set Ordering`,
        scenario: `Combine extreme ends of ${t.table} and sort the final consolidated result set globally in descending order.`,
        objective: `Apply a single ORDER BY clause at the very end of the set query to sort the entire unioned dataset.`,
        query: q,
        blueprint: `SELECT col1, col2 FROM table WHERE condition1\nUNION ALL\nSELECT col1, col2 FROM table WHERE condition2\nORDER BY col2 DESC;`,
        rule: `The ORDER BY clause applies to the final combined result of all UNION branches and must appear after the final SELECT statement.`,
        trap: `Placing an ORDER BY clause inside individual UNION branches without surrounding parentheses and LIMIT will trigger a syntax error in standard SQL.`,
        eli5: `Stack all your papers first, and only sort the stack at the very end. You can't sort the top half and bottom half separately in standard union queries!`,
        commonMistakes: [`Placing ORDER BY before the UNION keyword`, `Attempting to use different sorting columns in each branch without subqueries`],
        learningOutcomes: [`Place ORDER BY correctly at the end of set operations`, `Sort combined result sets deterministically`],
        slots: [
          { blank: "ORDER BY", answer: "ORDER BY", alternatives: ["GROUP BY"] },
          { blank: "DESC", answer: "DESC", alternatives: ["ASC"] }
        ]
      };
    }
  },
  {
    subcluster: "16.6 Combining Disjoint Filters from Same Table",
    pattern: (t) => {
      const colName = t.schema.split(', ')[1];
      const colCat = t.schema.split(', ')[2];
      const q = `SELECT ${colName}, '${t.table} Group A' AS partition_segment FROM ${t.table} WHERE ${t.schema.split(', ')[0]} <= 3 UNION ALL SELECT ${colName}, '${t.table} Group B' AS partition_segment FROM ${t.table} WHERE ${t.schema.split(', ')[0]} >= 8;`;
      return {
        title: `${t.table} Disjoint Partition Segmentation`,
        scenario: `Split ${t.table} into distinct operational segments (Group A and Group B) using two targeted SELECT queries united together.`,
        objective: `Use UNION ALL to combine mutually exclusive subsets of the same table with clear segment labels.`,
        query: q,
        blueprint: `SELECT col, 'Segment A' AS segment FROM table WHERE id <= 3\nUNION ALL\nSELECT col, 'Segment B' AS segment FROM table WHERE id >= 8;`,
        rule: `When queries target non-overlapping (disjoint) conditions on the same table, UNION ALL is faster than UNION because deduplication is logically unnecessary.`,
        trap: `Using UNION instead of UNION ALL on mutually exclusive subsets wastes CPU cycles on deduplication scans.`,
        eli5: `If you already know the two baskets have completely different items, don't waste time checking for duplicates—just dump them together with UNION ALL!`,
        commonMistakes: [`Defaulting to UNION when sets are already guaranteed to be disjoint`, `Forgetting the segment label literal`],
        learningOutcomes: [`Partition data streams using disjoint queries`, `Optimize performance by selecting UNION ALL for known non-overlapping sets`],
        slots: [
          { blank: "partition_segment", answer: "partition_segment", alternatives: ["segment"] },
          { blank: "UNION ALL", answer: "UNION ALL", alternatives: ["UNION"] }
        ]
      };
    }
  },
  {
    subcluster: "16.7 INTERSECT (Common Elements Between Sets)",
    pattern: (t) => {
      const col = t.schema.split(', ')[1];
      const q = `SELECT ${col} FROM ${t.table} WHERE ${t.schema.split(', ')[0]} <= 6 INTERSECT SELECT ${col} FROM ${t.table} WHERE ${t.schema.split(', ')[0]} >= 4;`;
      return {
        title: `${t.table} Overlapping Cohort Intersect`,
        scenario: `Find the exact ${col} records that qualify simultaneously in both the lower-half cohort and the middle-upper cohort.`,
        objective: `Use the INTERSECT set operator to return only rows that appear in both query result sets.`,
        query: q,
        blueprint: `SELECT col FROM table WHERE condition1\nINTERSECT\nSELECT col FROM table WHERE condition2;`,
        rule: `INTERSECT returns the mathematical intersection of two queries—only rows present in both result sets are returned, automatically deduplicated.`,
        trap: `In MySQL versions prior to 8.0.31, INTERSECT is not supported directly and must be emulated with INNER JOIN or WHERE IN. In modern standard SQL, INTERSECT is native.`,
        eli5: `INTERSECT is the middle overlap of a Venn diagram. It only gives you the items that are present in BOTH list A and list B.`,
        commonMistakes: [`Confusing INTERSECT with INNER JOIN on columns instead of full rows`, `Expecting duplicate rows without INTERSECT ALL`],
        learningOutcomes: [`Apply the INTERSECT operator for common member identification`, `Understand ANSI SQL set intersection semantics`],
        slots: [
          { blank: "INTERSECT", answer: "INTERSECT", alternatives: ["UNION", "EXCEPT"] },
          { blank: col, answer: col, alternatives: ["*"] }
        ]
      };
    }
  },
  {
    subcluster: "16.8 EXCEPT / MINUS (Set Difference)",
    pattern: (t) => {
      const col = t.schema.split(', ')[1];
      const q = `SELECT ${col} FROM ${t.table} WHERE ${t.schema.split(', ')[0]} <= 8 EXCEPT SELECT ${col} FROM ${t.table} WHERE ${t.schema.split(', ')[0]} <= 3;`;
      return {
        title: `${t.table} Subtractive Set Exclusion`,
        scenario: `Extract all ${col} entries from the first 8 records of ${t.table}, strictly excluding any that belong to the initial 3 records.`,
        objective: `Use EXCEPT (or MINUS) to subtract rows produced by the second query from the first query's result set.`,
        query: q,
        blueprint: `SELECT col FROM table WHERE condition1\nEXCEPT\nSELECT col FROM table WHERE condition2;`,
        rule: `EXCEPT returns distinct rows from the first query that do not exist in the second query's results.`,
        trap: `Order matters in EXCEPT! Query A EXCEPT Query B is completely different from Query B EXCEPT Query A.`,
        eli5: `EXCEPT is subtraction for data. Take everything on list A, cross off anything that also appears on list B, and keep what is left over.`,
        commonMistakes: [`Reversing the order of the two queries in EXCEPT`, `Confusing EXCEPT with NOT IN when NULLs are involved`],
        learningOutcomes: [`Execute set difference calculations using EXCEPT`, `Understand order-dependency in subtractive set queries`],
        slots: [
          { blank: "EXCEPT", answer: "EXCEPT", alternatives: ["MINUS", "UNION"] },
          { blank: col, answer: col, alternatives: ["*"] }
        ]
      };
    }
  },
  {
    subcluster: "16.9 Source Tagging with Literal Discriminator Columns",
    pattern: (t) => {
      const colName = t.schema.split(', ')[1];
      const colMetric = t.schema.split(', ')[3];
      const q = `SELECT ${colName} AS label, ${colMetric} AS score, 'VIP Tier' AS tier_level FROM ${t.table} WHERE ${colMetric} >= 75 UNION ALL SELECT ${colName} AS label, ${colMetric} AS score, 'Standard Tier' AS tier_level FROM ${t.table} WHERE ${colMetric} < 75;`;
      return {
        title: `${t.table} Explicit Tier Tagging`,
        scenario: `Label and union all ${t.table} records by injecting a literal discriminator column ('VIP Tier' vs 'Standard Tier').`,
        objective: `Inject a hardcoded constant string column in each UNION branch to preserve originating source identity.`,
        query: q,
        blueprint: `SELECT col1, col2, 'Source A' AS origin FROM table1\nUNION ALL\nSELECT col1, col2, 'Source B' AS origin FROM table2;`,
        rule: `A literal string (e.g. 'VIP Tier') placed in the SELECT clause acts as a constant discriminator column, providing source provenance across unioned sets.`,
        trap: `Ensure the discriminator column is placed in the exact same ordinal position in both SELECT queries.`,
        eli5: `Before you dump two different folders into one box, put a sticky note on each paper saying which folder it came from so you never mix them up!`,
        commonMistakes: [`Placing the literal tag in column 3 of query 1 and column 2 of query 2`, `Omitting the column alias on the first query's literal tag`],
        learningOutcomes: [`Inject literal discriminator columns into unified streams`, `Maintain data lineage and category origin across set unions`],
        slots: [
          { blank: "tier_level", answer: "tier_level", alternatives: ["tier"] },
          { blank: "UNION ALL", answer: "UNION ALL", alternatives: ["UNION"] }
        ]
      };
    }
  },
  {
    subcluster: "16.10 Multi-Branch Pipelines & Set Traps",
    pattern: (t) => {
      const col1 = t.schema.split(', ')[1];
      const col2 = t.schema.split(', ')[2];
      const q = `SELECT ${col1} AS entity_name, 'Tier High' AS tier_tag FROM ${t.table} WHERE ${t.schema.split(', ')[0]} IN (1, 2) UNION ALL SELECT ${col1} AS entity_name, 'Tier Mid' AS tier_tag FROM ${t.table} WHERE ${t.schema.split(', ')[0]} IN (3, 4) UNION ALL SELECT ${col1} AS entity_name, 'Tier Low' AS tier_tag FROM ${t.table} WHERE ${t.schema.split(', ')[0]} IN (5, 6) ORDER BY entity_name ASC;`;
      return {
        title: `${t.table} 3-Tier Multi-Branch Pipeline`,
        scenario: `Construct a 3-way UNION ALL pipeline categorizing ${t.table} into High, Mid, and Low tiers, sorted alphabetically by entity name.`,
        objective: `Chain three distinct queries using UNION ALL with global sorting across the entire combined pipeline.`,
        query: q,
        blueprint: `SELECT col, 'High' AS tag FROM t WHERE cond1\nUNION ALL\nSELECT col, 'Mid' AS tag FROM t WHERE cond2\nUNION ALL\nSELECT col, 'Low' AS tag FROM t WHERE cond3\nORDER BY col ASC;`,
        rule: `You can chain arbitrarily many SELECT queries with UNION / UNION ALL. The trailing ORDER BY sorts the aggregated outcome of all combined branches.`,
        trap: `Forgetting that operators have equal precedence: UNION and UNION ALL evaluate left-to-right unless parentheses are used to dictate evaluation order.`,
        eli5: `You can glue together 3, 4, or 10 lists in a row! Stack them one after another with UNION ALL, and put one ORDER BY at the bottom to sort them all together.`,
        commonMistakes: [`Inserting semicolons between branches instead of at the very end of the statement`, `Mismatching columns in the middle branch of a multi-tier union`],
        learningOutcomes: [`Chain 3+ queries in a multi-tier set operation pipeline`, `Execute multi-branch classification pipelines with global ordering`],
        slots: [
          { blank: "UNION ALL", answer: "UNION ALL", alternatives: ["UNION"] },
          { blank: "ORDER BY", answer: "ORDER BY", alternatives: ["GROUP BY"] }
        ]
      };
    }
  }
];

const drills = [];
let drillId = 1501;

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
      topicId: 16,
      topicName: "Topic 16: Set Operations & Combined Queries",
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

console.log(`Topic 16: Generated ${drills.length} drills (Drill #1501 to #${drillId - 1})`);
fs.writeFileSync('scratch/syntax_drills_t16.json', JSON.stringify(drills, null, 2), 'utf8');
console.log('Successfully written scratch/syntax_drills_t16.json');
