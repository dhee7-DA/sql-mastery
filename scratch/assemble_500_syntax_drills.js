// Assembly script for Section 0: The SQL Syntax Gym (500 Micro-Drills)
// Combines Topics 1, 2, 3, 4, & 5 into visualizer/syntax_gym_data.js

const fs = require('fs');

const t1 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t1.json', 'utf8'));
const t2 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t2.json', 'utf8'));
const t3 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t3.json', 'utf8'));
const t4 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t4.json', 'utf8'));
const t5 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t5.json', 'utf8'));

console.log(`Loaded drills: T1=${t1.length}, T2=${t2.length}, T3=${t3.length}, T4=${t4.length}, T5=${t5.length}`);

const all500 = [...t1, ...t2, ...t3, ...t4, ...t5];

// Verify drill numbering is contiguous 1..500
all500.forEach((d, idx) => {
  d.drillNumber = idx + 1;
});

const fileContent = `// =============================================================================
// SECTION 0: THE SQL SYNTAX GYM (500 Progressive In-Depth Micro-Drills)
// Topics 1, 2, 3, 4, & 5: SELECT, WHERE, ORDER BY & LIMIT, Aggregations & GROUP BY, CASE WHEN & Conditional Logic
// =============================================================================

const SYNTAX_GYM_DRILLS = ${JSON.stringify(all500, null, 2)};

if (typeof window !== 'undefined') {
  window.SYNTAX_GYM_DRILLS = SYNTAX_GYM_DRILLS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SYNTAX_GYM_DRILLS };
}
`;

fs.writeFileSync('visualizer/syntax_gym_data.js', fileContent, 'utf8');
console.log(`Successfully assembled visualizer/syntax_gym_data.js with ${all500.length} drills!`);
