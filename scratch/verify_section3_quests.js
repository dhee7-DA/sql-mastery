const fs = require('fs');

console.log('--- AUDITING SECTION 03 QUESTS ---');
let content = fs.readFileSync('visualizer/quests_section3_data.js', 'utf8');
content = content.replace('window.QUESTS_SECTION_3 =', 'global.QUESTS_SECTION_3 =');
eval(content);

const quests = global.QUESTS_SECTION_3;
console.log('Total Quests:', quests.length);

let errors = 0;
const tierCounts = {};
const blankDist = { '3': 0, '4': 0, '5': 0, 'other': 0 };

quests.forEach((q, idx) => {
  const num = idx + 1;
  tierCounts[q.tier] = (tierCounts[q.tier] || 0) + 1;
  const numSlots = Object.keys(q.slots || {}).length;

  if (numSlots === 3) blankDist['3']++;
  else if (numSlots === 4) blankDist['4']++;
  else if (numSlots === 5) blankDist['5']++;
  else {
    blankDist['other']++;
    console.error(`❌ Quest #${num} has invalid slot count: ${numSlots}`);
    errors++;
  }

  if (!q.explanation || q.explanation.includes('undefined')) {
    console.error(`❌ Quest #${num} has invalid explanation:`, q.explanation);
    errors++;
  }

  if (!q.table) {
    console.error(`❌ Quest #${num} missing table`);
    errors++;
  }

  for (const sId of Object.keys(q.slots || {})) {
    const slot = q.slots[sId];
    if (!slot.correct) {
      console.error(`❌ Quest #${num} slot ${sId} missing correct`);
      errors++;
    }
    if (!Array.isArray(slot.options) || slot.options.length !== 4) {
      console.error(`❌ Quest #${num} slot ${sId} does not have 4 options`);
      errors++;
    }
    const uniqueOptions = new Set(slot.options);
    if (uniqueOptions.size !== 4) {
      console.error(`❌ Quest #${num} slot ${sId} has duplicate options:`, slot.options);
      errors++;
    }
    if (!slot.options.includes(slot.correct)) {
      console.error(`❌ Quest #${num} slot ${sId} options do not include correct answer`);
      errors++;
    }
  }
});

console.log('Tier Breakdown:', tierCounts);
console.log('Blank Count Distribution:', blankDist);
console.log('Total Validation Errors:', errors);

if (errors === 0) {
  console.log('🎉 SECTION 03 AUDIT 100% CLEAN & VERIFIED!');
} else {
  process.exit(1);
}
