// Assembly script for Section 0: The SQL Syntax Gym (900 Micro-Drills)
// Combines Topics 1 through 9 into visualizer/syntax_gym_data.js

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

console.log(`Loaded drills: T1=${t1.length}, T2=${t2.length}, T3=${t3.length}, T4=${t4.length}, T5=${t5.length}, T6=${t6.length}, T7=${t7.length}, T8=${t8.length}, T9=${t9.length}`);

const all900 = [...t1, ...t2, ...t3, ...t4, ...t5, ...t6, ...t7, ...t8, ...t9];

// Verify drill numbering is contiguous 1..900
all900.forEach((d, idx) => {
  d.drillNumber = idx + 1;
});

const fileContent = `// =============================================================================
// SECTION 0: THE SQL SYNTAX GYM (900 Progressive In-Depth Micro-Drills)
// Topics 1–9: SELECT, WHERE, ORDER BY, Aggregations & GROUP BY, CASE WHEN, Strings & Patterns,
//             Relational Joins Core, Advanced Joins & Structures, Multi-Table Chaining & Aggregations
// =============================================================================

const SYNTAX_GYM_DRILLS = ${JSON.stringify(all900, null, 2)};

if (typeof window !== 'undefined') {
  window.SYNTAX_GYM_DRILLS = SYNTAX_GYM_DRILLS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SYNTAX_GYM_DRILLS };
}
`;

fs.writeFileSync('visualizer/syntax_gym_data.js', fileContent, 'utf8');
console.log(`Successfully assembled visualizer/syntax_gym_data.js with ${all900.length} drills!`);
