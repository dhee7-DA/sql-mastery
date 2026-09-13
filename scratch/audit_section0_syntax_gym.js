// Audit script for Section 0: The SQL Syntax Gym & Master Vault Expansion
const { ALL_500_CASE_STUDIES } = require('../visualizer/case_studies_500.js');
const { SYNTAX_GYM_DRILLS } = require('../visualizer/syntax_gym_data.js');

console.log('====================================================');
console.log('      SECTION 0 & 1,790 VAULT VERIFICATION AUDIT     ');
console.log('====================================================');

// 1. Total Count Verification
console.log(`\n1. Vault Size Check:`);
console.log(`- ALL_500_CASE_STUDIES count: ${ALL_500_CASE_STUDIES.length} (Target: 1790)`);
console.log(`- SYNTAX_GYM_DRILLS count:    ${SYNTAX_GYM_DRILLS.length} (Target: 300)`);

if (ALL_500_CASE_STUDIES.length !== 1790) {
  console.error('❌ FAIL: Expected 1790 cases in vault.');
  process.exit(1);
}
if (SYNTAX_GYM_DRILLS.length !== 300) {
  console.error('❌ FAIL: Expected 300 syntax drills in standalone file.');
  process.exit(1);
}
console.log('✅ PASS: Vault size exactly matches 1,790 and Syntax Gym has 300 drills.');

// 2. Contiguous ID Check
console.log(`\n2. Contiguous ID Check:`);
for (let i = 0; i < ALL_500_CASE_STUDIES.length; i++) {
  const expectedId = i + 1;
  if (ALL_500_CASE_STUDIES[i].id !== expectedId) {
    console.error(`❌ FAIL: ID mismatch at index ${i}. Expected ${expectedId}, got ${ALL_500_CASE_STUDIES[i].id}`);
    process.exit(1);
  }
}
console.log('✅ PASS: All IDs are strictly contiguous from #1 to #1790 with zero gaps.');

// 3. Title Uniqueness Check
console.log(`\n3. Title Uniqueness Check:`);
const titleMap = new Map();
let duplicates = 0;
ALL_500_CASE_STUDIES.forEach(c => {
  if (titleMap.has(c.title)) {
    console.error(`❌ Duplicate title found: "${c.title}" (IDs ${titleMap.get(c.title)} and ${c.id})`);
    duplicates++;
  } else {
    titleMap.set(c.title, c.id);
  }
});
if (duplicates > 0) {
  console.error(`❌ FAIL: Found ${duplicates} duplicate titles.`);
  process.exit(1);
}
console.log(`✅ PASS: 1,790 / 1,790 titles are 100% globally unique.`);

// 4. Section 0 Granular Inspection
console.log(`\n4. Section 0 Granular Inspection:`);
const sec0Cases = ALL_500_CASE_STUDIES.filter(c => c.section === 'Section 0: Foundations & Syntax Gym');
console.log(`- Section 0 cases count: ${sec0Cases.length}`);
if (sec0Cases.length !== 300) {
  console.error('❌ FAIL: Expected 300 cases in Section 0.');
  process.exit(1);
}

const t1Cases = sec0Cases.filter(c => c.drillNumber >= 1 && c.drillNumber <= 100);
const t2Cases = sec0Cases.filter(c => c.drillNumber >= 101 && c.drillNumber <= 200);
const t3Cases = sec0Cases.filter(c => c.drillNumber >= 201 && c.drillNumber <= 300);

console.log(`  * Topic 1 (SELECT & Projections):         ${t1Cases.length} drills`);
console.log(`  * Topic 2 (WHERE & Predicates):            ${t2Cases.length} drills`);
console.log(`  * Topic 3 (ORDER BY & Slicing/LIMIT):      ${t3Cases.length} drills`);

if (t1Cases.length !== 100 || t2Cases.length !== 100 || t3Cases.length !== 100) {
  console.error('❌ FAIL: Expected exactly 100 drills per topic.');
  process.exit(1);
}
console.log('✅ PASS: Exactly 100 drills per topic in Section 0.');

// 5. Difficulty Balance Check
console.log(`\n5. Global Difficulty Distribution:`);
const diffCounts = { Easy: 0, Medium: 0, Hard: 0 };
ALL_500_CASE_STUDIES.forEach(c => {
  if (diffCounts[c.difficulty] !== undefined) diffCounts[c.difficulty]++;
});
console.log(`- Easy:   ${diffCounts.Easy} (Target: 830)`);
console.log(`- Medium: ${diffCounts.Medium} (Target: 530)`);
console.log(`- Hard:   ${diffCounts.Hard} (Target: 430)`);

if (diffCounts.Easy !== 830 || diffCounts.Medium !== 530 || diffCounts.Hard !== 430) {
  console.error('❌ FAIL: Difficulty counts mismatch.');
  process.exit(1);
}
console.log('✅ PASS: Difficulty distribution matches exactly 830 Easy, 530 Medium, 430 Hard.');

// 6. Required Fields Completeness
console.log(`\n6. Field Integrity Check:`);
const requiredFields = ['id', 'section', 'title', 'difficulty', 'scenario', 'businessObjective', 'targetQuery', 'eli5Story', 'challengeSlots'];
sec0Cases.forEach((c, idx) => {
  requiredFields.forEach(f => {
    if (!c[f] || (Array.isArray(c[f]) && c[f].length === 0)) {
      console.error(`❌ Missing or empty field "${f}" in Case ID #${c.id}`);
      process.exit(1);
    }
  });
});
console.log('✅ PASS: All required fields are present and populated across all 300 Section 0 drills.');

console.log('\n🎉 ALL AUDITS PASSED WITH 100% SUCCESS!\n');
