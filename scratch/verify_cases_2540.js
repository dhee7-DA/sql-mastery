const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- AUDITING COMPLETE 2,540 CORPORATE CASE STUDIES VAULT ---');

const caseFilePath = path.join(__dirname, '../visualizer/case_studies_500.js');
const rawCode = fs.readFileSync(caseFilePath, 'utf8');

const sandbox = { window: {} };
vm.runInNewContext(rawCode, sandbox);
const cases = sandbox.window.ALL_2540_CASE_STUDIES || sandbox.window.ALL_2000_CASE_STUDIES;

if (!cases || !Array.isArray(cases)) {
  console.error('FAILED: ALL_2540_CASE_STUDIES not exported as an array!');
  process.exit(1);
}

console.log(`Total Cases in Vault: ${cases.length} (Target: 2,540)`);

if (cases.length !== 2540) {
  console.error(`ERROR: Expected exactly 2540 cases, got ${cases.length}`);
  process.exit(1);
}

// 1. Check ID uniqueness & range
const seenIds = new Set();
let duplicates = 0;
let missingFields = 0;
const requiredFields = ['id', 'section', 'title', 'industry', 'difficulty', 'scenario', 'schemaSnippet', 'businessObjective', 'targetQuery', 'table'];

cases.forEach((c, idx) => {
  if (seenIds.has(c.id)) {
    console.error(`Duplicate ID found: ${c.id} at index ${idx}`);
    duplicates++;
  }
  seenIds.add(c.id);

  requiredFields.forEach(f => {
    if (!c[f]) {
      console.error(`Case #${c.id} missing required field: ${f}`);
      missingFields++;
    }
  });
});

console.log(`Unique IDs Count: ${seenIds.size} / 2,540`);
console.log(`Duplicate IDs: ${duplicates}`);
console.log(`Missing Fields: ${missingFields}`);

// 2. Section Breakdown
const secMap = {};
cases.forEach(c => {
  secMap[c.section] = (secMap[c.section] || 0) + 1;
});

console.log('\n--- Section Distribution Breakdown ---');
console.log(JSON.stringify(secMap, null, 2));

// 3. Difficulty Breakdown
const diffMap = {};
cases.forEach(c => {
  diffMap[c.difficulty] = (diffMap[c.difficulty] || 0) + 1;
});
console.log('\n--- Difficulty Breakdown ---');
console.log(JSON.stringify(diffMap, null, 2));

// 4. Verify min count >= 200 per section
let allOver200 = true;
Object.entries(secMap).forEach(([sec, cnt]) => {
  if (cnt < 200) {
    console.error(`WARNING: Section ${sec} has only ${cnt} cases (< 200)`);
    allOver200 = false;
  }
});

if (duplicates === 0 && missingFields === 0 && cases.length === 2540 && allOver200) {
  console.log('\n🎉 ALL 2,540 CASE STUDIES VERIFIED 100% CLEAN & SOUND (ALL >= 200)!');
  process.exit(0);
} else {
  console.error('\nFAILED: Validation errors detected.');
  process.exit(1);
}
