const fs = require('fs');
const path = require('path');

// 1. Require all 10 window parts
const wp1 = require('./wcases_part1_partition.js');
const wp2 = require('./wcases_part2_lifecycle.js');
const wp3 = require('./wcases_part3_rownumber.js');
const wp4 = require('./wcases_part4_rank.js');
const wp5 = require('./wcases_part5_ntile.js');
const wp6 = require('./wcases_part6_laglead.js');
const wp7 = require('./wcases_part7_firstlast.js');
const wp8 = require('./wcases_part8_running.js');
const wp9 = require('./wcases_part9_moving.js');
const wp10 = require('./wcases_part10_gaps.js');

const parts = [wp1, wp2, wp3, wp4, wp5, wp6, wp7, wp8, wp9, wp10];
console.log('Window Parts loaded:');
parts.forEach((p, i) => console.log(`  Part ${i+1}: ${p.length} cases`));

let all300 = [].concat(...parts);
console.log(`Total 300 raw window cases: ${all300.length}`);
if (all300.length !== 300) {
  throw new Error(`Expected 300 items, got ${all300.length}`);
}

// 2. Check difficulty distribution
const diffCounts = { Easy: 0, Medium: 0, Hard: 0 };
all300.forEach(c => {
  diffCounts[c.diff] = (diffCounts[c.diff] || 0) + 1;
});
console.log('Difficulty counts:', diffCounts);
if (diffCounts.Easy !== 100 || diffCounts.Medium !== 100 || diffCounts.Hard !== 100) {
  throw new Error(`Difficulty mismatch! Easy: ${diffCounts.Easy}, Med: ${diffCounts.Medium}, Hard: ${diffCounts.Hard}`);
}

// 3. Uniqueness check on 300 items
const titleSet = new Set();
all300.forEach((c, idx) => {
  if (titleSet.has(c.title)) {
    throw new Error(`Duplicate title in 300: "${c.title}" at index ${idx}`);
  }
  titleSet.add(c.title);
});
console.log(`Verified 300 completely unique titles in Section 9.`);

// 4. Map into final Case Study schema with IDs 1041 to 1340
let currentId = 1041;
const final300Cases = all300.map(item => {
  return {
    id: currentId++,
    section: "Section 9: Window Functions & Quantitative Financial Analytics",
    title: item.title,
    industry: item.ind,
    difficulty: item.diff,
    scenario: item.scenario,
    businessObjective: item.businessObjective,
    schemaSnippet: item.schemaSnippet,
    targetQuery: item.targetQuery,
    table: item.table,
    eli5Story: item.eli5Story,
    commonMistakes: item.commonMistakes,
    learningOutcomes: item.learningOutcomes
  };
});

// 5. Load visualizer/case_studies_500.js
const targetFile = path.resolve(__dirname, '../visualizer/case_studies_500.js');
const { ALL_500_CASE_STUDIES } = require(targetFile);
console.log(`Existing file total cases: ${ALL_500_CASE_STUDIES.length}`);

// Global uniqueness check across ALL 1,340 titles
const globalTitles = new Set();
ALL_500_CASE_STUDIES.forEach(c => {
  if (globalTitles.has(c.title)) {
    console.warn(`Pre-existing duplicate title in 1..1040: "${c.title}" (ID ${c.id})`);
  }
  globalTitles.add(c.title);
});

final300Cases.forEach(c => {
  if (globalTitles.has(c.title)) {
    throw new Error(`Title collision between 1..1040 and new 300: "${c.title}" (ID ${c.id})`);
  }
  globalTitles.add(c.title);
});
console.log(`Global unique titles verified: ${globalTitles.size} / 1340`);

// Combine
const combined1340 = ALL_500_CASE_STUDIES.concat(final300Cases);
console.log(`Combined total cases: ${combined1340.length}`);

// 6. Generate formatted JS file content
const header = `// =============================================================================
// SQL MASTERY - 1,340 PRODUCTION CASE STUDIES VAULT
// Sections 1 to 7: Foundational, Aggregations, Subqueries & Filtering (IDs 1 to 650)
// Section 8: Relational Joins & Financial Data Modeling (IDs 651 to 1040 - 390 Distinct Enterprise Cases)
// Section 9: Window Functions & Quantitative Financial Analytics (IDs 1041 to 1340 - 300 Distinct Enterprise Cases)
// Difficulty: Balanced distribution across all sections (Section 9: exactly 100 Easy, 100 Medium, 100 Hard)
// Industries: Fintech, SaaS, Retail, Healthcare, Logistics, Media, Security, Hardware, HR, Platforms
// =============================================================================

const ALL_500_CASE_STUDIES = `;

const footer = `;

if (typeof window !== 'undefined') {
  window.ALL_500_CASE_STUDIES = ALL_500_CASE_STUDIES;
  window.ALL_600_CASE_STUDIES = ALL_500_CASE_STUDIES;
  window.ALL_650_CASE_STUDIES = ALL_500_CASE_STUDIES;
  window.ALL_700_CASE_STUDIES = ALL_500_CASE_STUDIES;
  window.ALL_1040_CASE_STUDIES = ALL_500_CASE_STUDIES;
  window.ALL_1340_CASE_STUDIES = ALL_500_CASE_STUDIES;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ALL_500_CASE_STUDIES,
    ALL_600_CASE_STUDIES: ALL_500_CASE_STUDIES,
    ALL_650_CASE_STUDIES: ALL_500_CASE_STUDIES,
    ALL_700_CASE_STUDIES: ALL_500_CASE_STUDIES,
    ALL_1040_CASE_STUDIES: ALL_500_CASE_STUDIES,
    ALL_1340_CASE_STUDIES: ALL_500_CASE_STUDIES
  };
}
`;

const jsonString = JSON.stringify(combined1340, null, 2);
const fullFileContent = header + jsonString + footer;

fs.writeFileSync(targetFile, fullFileContent, 'utf8');
console.log(`Successfully assembled and wrote 1,340 case studies to ${targetFile}!`);

// Verify read-back
const verifySandbox = { window: {}, module: { exports: {} } };
const vm = require('vm');
vm.createContext(verifySandbox);
vm.runInContext(fs.readFileSync(targetFile, 'utf8'), verifySandbox);
console.log(`Verification: ALL_500_CASE_STUDIES.length = ${verifySandbox.window.ALL_1340_CASE_STUDIES.length}`);
