// =============================================================================
// ASSEMBLE SECTION 10 CASE STUDIES (150 Cases) & MERGE INTO VAULT
// Expands ALL_500_CASE_STUDIES from 1,340 to 1,490 Case Studies (#1 to #1490)
// =============================================================================

const fs = require('fs');
const path = require('path');

const part1 = require('./sec10_cases_part1.js');
const part2 = require('./sec10_cases_part2.js');

console.log(`Loaded Part 1: ${part1.length} cases.`);
console.log(`Loaded Part 2: ${part2.length} cases.`);

const sec10CasesRaw = part1.concat(part2);
console.log(`Total Section 10 Raw Cases: ${sec10CasesRaw.length}`);

// Load existing case studies from visualizer/case_studies_500.js
const vaultPath = path.join(__dirname, '..', 'visualizer', 'case_studies_500.js');
const vaultContent = fs.readFileSync(vaultPath, 'utf8');

eval('let ALL_500_CASE_STUDIES;\n' + vaultContent.replace('const ALL_500_CASE_STUDIES =', 'global.EXISTING_CASES = ALL_500_CASE_STUDIES ='));
const existingCases = global.EXISTING_CASES;
console.log(`Existing Case Studies in Vault: ${existingCases.length}`);

const START_ID = existingCases.length + 1; // 1341
const SECTION_NAME = "Section 10: Advanced SQL Engine Mastery (Subqueries, CTEs, Recursion & Set Operations)";

const formattedSec10Cases = sec10CasesRaw.map((c, index) => {
  return {
    id: START_ID + index,
    title: c.title,
    section: SECTION_NAME,
    difficulty: c.difficulty,
    domain: c.domain,
    schema: c.schema,
    businessProblem: c.businessProblem,
    targetQuery: c.targetQuery,
    eli5Story: c.eli5Story,
    commonMistakes: c.commonMistakes,
    takeaway: c.takeaway
  };
});

// Difficulty breakdown check for Section 10
const sec10Diff = { Easy: 0, Medium: 0, Hard: 0 };
formattedSec10Cases.forEach(c => sec10Diff[c.difficulty]++);
console.log("Section 10 Difficulty Breakdown:", sec10Diff);

// Combine all cases
const allCases = existingCases.concat(formattedSec10Cases);
console.log(`New Combined Vault Total: ${allCases.length} cases.`);

// Contiguity check
for (let i = 0; i < allCases.length; i++) {
  if (allCases[i].id !== i + 1) {
    console.error(`Contiguity error at index ${i}: expected id ${i+1}, found ${allCases[i].id}`);
    process.exit(1);
  }
}
console.log("Contiguity verified: strictly continuous from #1 to #" + allCases.length);

// Global Title uniqueness check
const titleMap = new Set();
for (const c of allCases) {
  if (titleMap.has(c.title)) {
    console.error(`Duplicate title detected: "${c.title}" at ID ${c.id}`);
    process.exit(1);
  }
  titleMap.add(c.title);
}
console.log(`Title uniqueness verified: 100% unique (${titleMap.size} / ${allCases.length})`);

// Global Difficulty breakdown
const globalDiff = { Easy: 0, Medium: 0, Hard: 0 };
allCases.forEach(c => globalDiff[c.difficulty]++);
console.log("Global Vault Difficulty Breakdown:", globalDiff);

// Write to visualizer/case_studies_500.js
const header = `// =============================================================================
// COMPLETE ENTERPRISE CASE STUDIES REPOSITORY (${allCases.length} Exhaustive Industry Scenarios)
// Strictly Contiguous IDs #1 through #${allCases.length} (100% Unique Titles)
// Section 1: Database Theory & Architecture (IDs 1 to 100)
// Section 2: Physical Query Execution Order & Projections (IDs 101 to 200)
// Section 3: Filtering, Predicates & Three-Valued Logic (IDs 201 to 300)
// Section 4: String Slicing, Text Manipulation & Pattern Matching (IDs 301 to 400)
// Section 5: Sorting, Determinism & Slicing (IDs 401 to 500)
// Section 6: Aggregations, Statistical Metrics & GROUP BY (IDs 501 to 600)
// Section 7: Spatial Coordinates, Math Functions & Medians (IDs 601 to 650)
// Section 8: Relational Joins & Financial Data Modeling (IDs 651 to 1040)
// Section 9: Window Functions & Quantitative Financial Analytics (IDs 1041 to 1340)
// Section 10: Advanced SQL Engine Mastery (Subqueries, CTEs, Recursion & Set Operations) (IDs 1341 to ${allCases.length})
// =============================================================================

const ALL_500_CASE_STUDIES = `;

const footer = `;\n
// Backward compatibility aliases
const ALL_600_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_650_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_700_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_1040_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_1340_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_1490_CASE_STUDIES = ALL_500_CASE_STUDIES;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALL_500_CASE_STUDIES };
}
`;

fs.writeFileSync(vaultPath, header + JSON.stringify(allCases, null, 2) + footer, 'utf8');
console.log(`Successfully merged and saved ${allCases.length} case studies to ${vaultPath}`);
