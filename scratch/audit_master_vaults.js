const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log("=== COMPREHENSIVE VAULTS AUDIT ===");

// 1. Audit MCQs Vault
const mcqFile = path.resolve(__dirname, '../visualizer/mcqs_vault_500.js');
const mcqContent = fs.readFileSync(mcqFile, 'utf8');
const mcqSandbox = { window: {} };
vm.createContext(mcqSandbox);
vm.runInContext(mcqContent, mcqSandbox);

const mcqs = mcqSandbox.window.MCQS_VAULT_500;
console.log(`\n--- MCQ VAULT AUDIT ---`);
console.log(`Total MCQs in vault: ${mcqs.length}`);
if (mcqs.length !== 1950) {
  throw new Error(`Expected 1950 MCQs, found ${mcqs.length}`);
}

const windowMcqs = mcqs.filter(m => m.id && m.id.startsWith('mcq_window_'));
console.log(`Window MCQs count: ${windowMcqs.length}`);
if (windowMcqs.length !== 500) {
  throw new Error(`Expected 500 Window MCQs, found ${windowMcqs.length}`);
}

const optDist = [0, 0, 0, 0];
windowMcqs.forEach(m => optDist[m.correctIndex]++);
console.log(`Window MCQs option distribution (A, B, C, D):`, optDist);
if (optDist[0] !== 125 || optDist[1] !== 125 || optDist[2] !== 125 || optDist[3] !== 125) {
  throw new Error(`Window MCQs option distribution not balanced! ${JSON.stringify(optDist)}`);
}

// 2. Audit Case Studies Vault
const caseFile = path.resolve(__dirname, '../visualizer/case_studies_500.js');
const { ALL_500_CASE_STUDIES } = require(caseFile);

console.log(`\n--- CASE STUDIES VAULT AUDIT ---`);
console.log(`Total Case Studies: ${ALL_500_CASE_STUDIES.length}`);
if (ALL_500_CASE_STUDIES.length !== 1340) {
  throw new Error(`Expected 1340 Case Studies, found ${ALL_500_CASE_STUDIES.length}`);
}

// Check IDs
for (let i = 0; i < 1340; i++) {
  if (ALL_500_CASE_STUDIES[i].id !== i + 1) {
    throw new Error(`ID mismatch at index ${i}: expected ${i+1}, found ${ALL_500_CASE_STUDIES[i].id}`);
  }
}
console.log(`All IDs strictly contiguous from #1 to #1340.`);

// Check titles uniqueness
const titles = new Set();
ALL_500_CASE_STUDIES.forEach((c, idx) => {
  if (titles.has(c.title)) {
    throw new Error(`Duplicate title: "${c.title}" at ID ${c.id}`);
  }
  titles.add(c.title);
});
console.log(`All 1,340 case study titles are 100% unique.`);

// Section 9 audit
const sec9 = ALL_500_CASE_STUDIES.filter(c => c.section && c.section.includes("Section 9"));
console.log(`Section 9 cases count: ${sec9.length}`);
if (sec9.length !== 300) {
  throw new Error(`Expected 300 Section 9 cases, found ${sec9.length}`);
}

const sec9Diff = { Easy: 0, Medium: 0, Hard: 0 };
sec9.forEach(c => sec9Diff[c.difficulty]++);
console.log(`Section 9 difficulty distribution:`, sec9Diff);
if (sec9Diff.Easy !== 100 || sec9Diff.Medium !== 100 || sec9Diff.Hard !== 100) {
  throw new Error(`Section 9 difficulty distribution mismatch! ${JSON.stringify(sec9Diff)}`);
}

const totalDiff = { Easy: 0, Medium: 0, Hard: 0 };
ALL_500_CASE_STUDIES.forEach(c => totalDiff[c.difficulty]++);
console.log(`Total 1,340 difficulty distribution:`, totalDiff);

// Check required fields
const requiredFields = [
  'id', 'section', 'title', 'industry', 'difficulty', 'scenario',
  'businessObjective', 'schemaSnippet', 'targetQuery', 'table',
  'eli5Story', 'commonMistakes', 'learningOutcomes'
];
sec9.forEach(c => {
  for (let f of requiredFields) {
    if (!c[f] || String(c[f]).trim().length === 0) {
      throw new Error(`Empty required field "${f}" in Case Study ID ${c.id} ("${c.title}")`);
    }
  }
});
console.log(`All required fields populated across all Section 9 cases.`);

console.log(`\n=== AUDIT PASSED WITH 100% PERFECTION! ===`);
