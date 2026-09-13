// =============================================================================
// COMPREHENSIVE VAULT AUDIT: SECTION 10 EXPANSION
// 2,100 MCQs & 1,490 Case Studies End-to-End Verification
// =============================================================================

const fs = require('fs');
const path = require('path');

console.log("=== COMPREHENSIVE SECTION 10 VAULTS AUDIT ===\n");

// 1. AUDIT MCQ VAULT
const mcqVaultPath = path.join(__dirname, '..', 'visualizer', 'mcqs_vault_500.js');
const mcqCode = fs.readFileSync(mcqVaultPath, 'utf8');
eval(mcqCode.replace('window.', 'global.'));
const allMCQs = global.MCQS_VAULT_500;

console.log("--- MCQ VAULT AUDIT ---");
console.log(`Total MCQs in vault: ${allMCQs.length}`);
if (allMCQs.length !== 2100) {
  console.error(`FAILED: Expected 2,100 MCQs, found ${allMCQs.length}`);
  process.exit(1);
}

const sec10MCQs = allMCQs.slice(1950);
console.log(`Section 10 MCQs count: ${sec10MCQs.length}`);
if (sec10MCQs.length !== 150) {
  console.error(`FAILED: Expected 150 Section 10 MCQs, found ${sec10MCQs.length}`);
  process.exit(1);
}

const mcqDist = [0, 0, 0, 0];
sec10MCQs.forEach(m => mcqDist[m.correctIndex]++);
console.log(`Section 10 MCQs option distribution (A, B, C, D): [ ${mcqDist.join(', ')} ]`);

// 2. AUDIT CASE STUDIES VAULT
const casesPath = path.join(__dirname, '..', 'visualizer', 'case_studies_500.js');
const casesCode = fs.readFileSync(casesPath, 'utf8');
eval('let ALL_500_CASE_STUDIES;\n' + casesCode.replace('const ALL_500_CASE_STUDIES =', 'global.ALL_CASES = ALL_500_CASE_STUDIES ='));
const allCases = global.ALL_CASES;

console.log("\n--- CASE STUDIES VAULT AUDIT ---");
console.log(`Total Case Studies: ${allCases.length}`);
if (allCases.length !== 1490) {
  console.error(`FAILED: Expected 1,490 Case Studies, found ${allCases.length}`);
  process.exit(1);
}

// Check Contiguity
for (let i = 0; i < allCases.length; i++) {
  if (allCases[i].id !== i + 1) {
    console.error(`FAILED: Contiguity broken at index ${i}, expected id ${i+1}, found ${allCases[i].id}`);
    process.exit(1);
  }
}
console.log("All IDs strictly contiguous from #1 to #1490.");

// Check Title Uniqueness
const titleSet = new Set();
for (const c of allCases) {
  if (titleSet.has(c.title)) {
    console.error(`FAILED: Duplicate title found: "${c.title}" at ID ${c.id}`);
    process.exit(1);
  }
  titleSet.add(c.title);
}
console.log("All 1,490 case study titles are 100% unique.");

// Check Section 10
const sec10Cases = allCases.filter(c => c.section.includes("Section 10"));
console.log(`Section 10 cases count: ${sec10Cases.length}`);
if (sec10Cases.length !== 150) {
  console.error(`FAILED: Expected 150 Section 10 cases, found ${sec10Cases.length}`);
  process.exit(1);
}

const sec10Diff = { Easy: 0, Medium: 0, Hard: 0 };
sec10Cases.forEach(c => sec10Diff[c.difficulty]++);
console.log("Section 10 difficulty distribution:", sec10Diff);
if (sec10Diff.Easy !== 50 || sec10Diff.Medium !== 50 || sec10Diff.Hard !== 50) {
  console.error("FAILED: Section 10 does not have exactly 50 Easy, 50 Medium, 50 Hard.");
  process.exit(1);
}

const totalDiff = { Easy: 0, Medium: 0, Hard: 0 };
allCases.forEach(c => totalDiff[c.difficulty]++);
console.log("Total 1,490 difficulty distribution:", totalDiff);

// Check required fields
const requiredFields = ["id", "title", "section", "difficulty", "domain", "schema", "businessProblem", "targetQuery", "eli5Story", "commonMistakes", "takeaway"];
for (const c of sec10Cases) {
  for (const field of requiredFields) {
    if (!c[field] || (Array.isArray(c[field]) && c[field].length === 0)) {
      console.error(`FAILED: Case ID ${c.id} missing required field: ${field}`);
      process.exit(1);
    }
  }
}
console.log("All required fields populated across all Section 10 cases.");

console.log("\n=== AUDIT PASSED WITH 100% PERFECTION! ===");
