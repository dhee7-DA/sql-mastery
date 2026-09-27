const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../visualizer/quests_section14_data.js');
const content = fs.readFileSync(filePath, 'utf8');

// Mock window object
const sandbox = { window: {} };
const fn = new Function('window', content);
fn(sandbox.window);

const quests = sandbox.window.QUESTS_SECTION_14;
const metadata = sandbox.window.WAREHOUSE_DISCIPLINES_METADATA;

console.log('--- AUDITING SECTION 14: CLOUD DATA WAREHOUSES & MODERN SQL (100 QUESTS) ---');
console.log(`Total Quests: ${quests.length}`);

const disciplineCounts = {};
const difficultyCounts = {};
const blankCounts = { '3': 0, '4': 0, '5': 0, other: 0 };
let errors = 0;

quests.forEach(q => {
  disciplineCounts[q.disciplineKey] = (disciplineCounts[q.disciplineKey] || 0) + 1;
  difficultyCounts[q.difficulty] = (difficultyCounts[q.difficulty] || 0) + 1;

  const slotKeys = Object.keys(q.slots || {});
  const numBlanks = slotKeys.length;
  if (numBlanks === 3) blankCounts['3']++;
  else if (numBlanks === 4) blankCounts['4']++;
  else if (numBlanks === 5) blankCounts['5']++;
  else {
    blankCounts.other++;
    console.error(`[INVALID BLANK COUNT] Quest ${q.id} has ${numBlanks} blanks! Must be 3-5.`);
    errors++;
  }

  // Validate slots
  slotKeys.forEach(sKey => {
    const s = q.slots[sKey];
    if (!s.options || s.options.length !== 4) {
      console.error(`[OPTION COUNT ERROR] Quest ${q.id} slot ${sKey} has ${s.options ? s.options.length : 0} options (must be 4)!`);
      errors++;
    }
    const set = new Set(s.options);
    if (set.size !== s.options.length) {
      console.error(`[DUPLICATE OPTIONS] Quest ${q.id} slot ${sKey} has duplicate choices: ${JSON.stringify(s.options)}`);
      errors++;
    }
    if (!s.options.includes(s.correct)) {
      console.error(`[MISSING CORRECT OPTION] Quest ${q.id} slot ${sKey} correct value "${s.correct}" not in options!`);
      errors++;
    }
  });

  // Validate template matches slots
  const templateBlankIds = q.template.filter(t => t.isBlank).map(t => t.slotId);
  if (templateBlankIds.length !== slotKeys.length) {
    console.error(`[TEMPLATE MISMATCH] Quest ${q.id} template blanks (${templateBlankIds.length}) != slots (${slotKeys.length})`);
    errors++;
  }
});

console.log('Discipline Breakdown (Target: 20 each):', disciplineCounts);
console.log('Difficulty Breakdown:', difficultyCounts);
console.log('Blank Count Distribution (3-5 blanks):', blankCounts);
console.log(`Total Validation Errors: ${errors}`);

if (errors === 0 && quests.length === 100) {
  console.log('🎉 SECTION 14 AUDIT 100% CLEAN & VERIFIED (100/100)!');
  process.exit(0);
} else {
  console.error('❌ AUDIT FAILED WITH ERRORS!');
  process.exit(1);
}
