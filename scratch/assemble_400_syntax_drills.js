// Assembly script for Section 0: The SQL Syntax Gym (400 Micro-Drills)
// Combines Topics 1, 2, 3, & 4 into visualizer/syntax_gym_data.js

const fs = require('fs');

const t1 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t1.json', 'utf8'));
const t2 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t2.json', 'utf8'));
const t3 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t3.json', 'utf8'));
const t4 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t4.json', 'utf8'));

console.log(`Loaded drills: T1=${t1.length}, T2=${t2.length}, T3=${t3.length}, T4=${t4.length}`);

const all400 = [...t1, ...t2, ...t3, ...t4];

// Verify drill numbering is contiguous 1..400
all400.forEach((d, idx) => {
  d.drillNumber = idx + 1;
});

const fileContent = `// =============================================================================
// SECTION 0: THE SQL SYNTAX GYM (400 Progressive In-Depth Micro-Drills)
// Topics 1, 2, 3, & 4: SELECT, WHERE, ORDER BY & LIMIT, Aggregations & GROUP BY
// =============================================================================

const SYNTAX_GYM_DRILLS = ${JSON.stringify(all400, null, 2)};

if (typeof window !== 'undefined') {
  window.SYNTAX_GYM_DRILLS = SYNTAX_GYM_DRILLS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SYNTAX_GYM_DRILLS };
}
`;

fs.writeFileSync('visualizer/syntax_gym_data.js', fileContent, 'utf8');
console.log(`Successfully assembled visualizer/syntax_gym_data.js with ${all400.length} drills!`);
