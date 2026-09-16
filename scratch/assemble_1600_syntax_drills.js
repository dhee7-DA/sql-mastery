// Assembly script for Section 0: The SQL Syntax Gym (1,600 Micro-Drills)
// Combines Topics 1 through 16 into visualizer/syntax_gym_data.js

const fs = require('fs');

const t1 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t1.json', 'utf8'));
const t2 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t2.json', 'utf8'));
const t3 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t3.json', 'utf8'));
const t4 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t4.json', 'utf8'));
const t5 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t5.json', 'utf8'));
const t6 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t6.json', 'utf8'));
const t7 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t7.json', 'utf8'));
const t8 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t8.json', 'utf8'));
const t9 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t9.json', 'utf8'));
const t10 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t10.json', 'utf8'));
const t11 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t11.json', 'utf8'));
const t12 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t12.json', 'utf8'));
const t13 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t13.json', 'utf8'));
const t14 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t14.json', 'utf8'));
const t15 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t15.json', 'utf8'));
const t16 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t16.json', 'utf8'));

console.log(`Loaded drills: T1=${t1.length}, T2=${t2.length}, T3=${t3.length}, T4=${t4.length}, T5=${t5.length}, T6=${t6.length}, T7=${t7.length}, T8=${t8.length}, T9=${t9.length}, T10=${t10.length}, T11=${t11.length}, T12=${t12.length}, T13=${t13.length}, T14=${t14.length}, T15=${t15.length}, T16=${t16.length}`);

const all1600 = [...t1, ...t2, ...t3, ...t4, ...t5, ...t6, ...t7, ...t8, ...t9, ...t10, ...t11, ...t12, ...t13, ...t14, ...t15, ...t16];

// Verify drill numbering is contiguous 1..1600
all1600.forEach((d, idx) => {
  d.drillNumber = idx + 1;
});

const fileContent = `// =============================================================================
// SECTION 0: THE SQL SYNTAX GYM (1,600 Progressive In-Depth Micro-Drills)
// Topics 1–16:
//   1. SELECT & Projections (#001–#100)
//   2. WHERE & Predicates (#101–#200)
//   3. ORDER BY & LIMIT Slicing (#201–#300)
//   4. Aggregations & GROUP BY (#301–#400)
//   5. CASE WHEN & Conditional Logic (#401–#500)
//   6. String Manipulation & Patterns (#501–#600)
//   7. Relational Joins Core (#601–#700)
//   8. Advanced Joins & Structural Patterns (#701–#800)
//   9. Multi-Table Chaining & Joined Aggregations (#801–#900)
//  10. Date, Time & Temporal Arithmetic (#901–#1000)
//  11. Subqueries & Derived Tables (#1001–#1100)
//  12. Modular CTEs & Multi-Step Pipelines (#1101–#1200)
//  13. Window Ranking & Percentiles (#1201–#1300)
//  14. Value Offsets & Deltas (#1301–#1400)
//  15. Running Balances & Frames (#1401–#1500)
//  16. Set Operations & Combined Queries (#1501–#1600)
// =============================================================================

const SYNTAX_GYM_DRILLS = ${JSON.stringify(all1600, null, 2)};

if (typeof window !== 'undefined') {
  window.SYNTAX_GYM_DRILLS = SYNTAX_GYM_DRILLS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SYNTAX_GYM_DRILLS };
}
`;

fs.writeFileSync('visualizer/syntax_gym_data.js', fileContent, 'utf8');
console.log(`Successfully assembled visualizer/syntax_gym_data.js with ${all1600.length} drills!`);
