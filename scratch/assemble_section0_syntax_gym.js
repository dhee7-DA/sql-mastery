// Assembly script for Section 0: The SQL Syntax Gym (300 Micro-Drills)
// Integrates into visualizer/syntax_gym_data.js and merges into visualizer/case_studies_500.js

const fs = require('fs');

const t1 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t1.json', 'utf8'));
const t2 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t2.json', 'utf8'));
const t3 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t3.json', 'utf8'));

console.log(`Loaded drills: T1=${t1.length}, T2=${t2.length}, T3=${t3.length}`);

const all300 = [...t1, ...t2, ...t3];

// 1. Write standalone visualizer/syntax_gym_data.js
const syntaxGymFileContent = `// =============================================================================
// SECTION 0: THE SQL SYNTAX GYM (300 Progressive In-Depth Micro-Drills)
// Topics 1, 2, & 3: SELECT & Projections, WHERE & Predicates, ORDER BY & LIMIT
// =============================================================================

const SYNTAX_GYM_DRILLS = ${JSON.stringify(all300, null, 2)};

if (typeof window !== 'undefined') {
  window.SYNTAX_GYM_DRILLS = SYNTAX_GYM_DRILLS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SYNTAX_GYM_DRILLS };
}
`;

fs.writeFileSync('visualizer/syntax_gym_data.js', syntaxGymFileContent, 'utf8');
console.log('Wrote visualizer/syntax_gym_data.js');

// 2. Format for case_studies_500.js merger
const startingId = 1491;
const caseStudiesSection0 = all300.map((d, index) => {
  const caseId = startingId + index;
  return {
    id: caseId,
    drillNumber: d.drillNumber,
    section: "Section 0: Foundations & Syntax Gym",
    title: d.title,
    industry: "Foundations",
    table: d.table,
    difficulty: "Easy",
    scenario: d.scenario,
    businessObjective: d.businessObjective,
    schemaSnippet: d.schemaSnippet,
    targetQuery: d.targetQuery,
    syntaxBlueprint: d.syntaxBlueprint,
    syntaxRule: d.syntaxRule,
    syntaxTrap: d.syntaxTrap,
    eli5Story: `[SYNTAX BLUEPRINT]:\n${d.syntaxBlueprint}\n\n[RULE]: ${d.syntaxRule}\n\n[TRAP TO AVOID]: ${d.syntaxTrap}`,
    commonMistakes: d.commonMistakes,
    learningOutcomes: d.learningOutcomes,
    challengeSlots: d.challengeSlots
  };
});

// 3. Load existing case_studies_500.js
const caseStudiesPath = 'visualizer/case_studies_500.js';
const content = fs.readFileSync(caseStudiesPath, 'utf8');

// The array starts with: const ALL_500_CASE_STUDIES = [ ... ];
// We can parse the existing array or inspect its length
const { ALL_500_CASE_STUDIES } = require('../visualizer/case_studies_500.js');
console.log('Current case studies in vault:', ALL_500_CASE_STUDIES.length);

// We keep only the first 1490 cases if re-running
const baseCases = ALL_500_CASE_STUDIES.filter(c => c.id <= 1490);
console.log('Base cases count (<= 1490):', baseCases.length);

const mergedCases = [...baseCases, ...caseStudiesSection0];
console.log('New total cases in vault:', mergedCases.length);

// Verify contiguous IDs
for (let i = 0; i < mergedCases.length; i++) {
  if (mergedCases[i].id !== i + 1) {
    console.error(`ID mismatch at index ${i}: expected ${i + 1}, found ${mergedCases[i].id}`);
    process.exit(1);
  }
}
console.log('Contiguous IDs verified: 1 to', mergedCases.length);

// Verify title uniqueness
const titleSet = new Set();
mergedCases.forEach(c => {
  if (titleSet.has(c.title)) {
    console.error('Duplicate title found:', c.title);
    process.exit(1);
  }
  titleSet.add(c.title);
});
console.log('All', mergedCases.length, 'titles are 100% unique!');

// Write updated case_studies_500.js
const updatedCaseStudiesJs = `// =============================================================================
// CORPORATE CASE STUDIES MASTER VAULT (1,790 PRODUCTION & FOUNDATION SCENARIOS)
// Sections 0-10: Complete Enterprise & Syntax Gym Relational Modeling
// =============================================================================

const ALL_500_CASE_STUDIES = ${JSON.stringify(mergedCases, null, 2)};

// Backward compatibility aliases
const ALL_1790_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_1490_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_1340_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_1040_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_700_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_650_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_600_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_300_CASE_STUDIES = ALL_500_CASE_STUDIES;

if (typeof window !== 'undefined') {
  window.ALL_500_CASE_STUDIES = ALL_500_CASE_STUDIES;
  window.ALL_1790_CASE_STUDIES = ALL_1790_CASE_STUDIES;
  window.ALL_1490_CASE_STUDIES = ALL_1490_CASE_STUDIES;
  window.ALL_1340_CASE_STUDIES = ALL_1340_CASE_STUDIES;
  window.ALL_1040_CASE_STUDIES = ALL_1040_CASE_STUDIES;
  window.ALL_700_CASE_STUDIES = ALL_700_CASE_STUDIES;
  window.ALL_650_CASE_STUDIES = ALL_650_CASE_STUDIES;
  window.ALL_600_CASE_STUDIES = ALL_600_CASE_STUDIES;
  window.ALL_300_CASE_STUDIES = ALL_300_CASE_STUDIES;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ALL_500_CASE_STUDIES,
    ALL_1790_CASE_STUDIES,
    ALL_1490_CASE_STUDIES,
    ALL_1340_CASE_STUDIES,
    ALL_1040_CASE_STUDIES,
    ALL_700_CASE_STUDIES,
    ALL_650_CASE_STUDIES,
    ALL_600_CASE_STUDIES,
    ALL_300_CASE_STUDIES
  };
}
`;

fs.writeFileSync(caseStudiesPath, updatedCaseStudiesJs, 'utf8');
console.log('Successfully updated visualizer/case_studies_500.js with 1,790 cases!');
