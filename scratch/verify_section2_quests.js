const fs = require('fs');

let code = fs.readFileSync('visualizer/quests_section2_data.js', 'utf8');
code = code.replace('window.QUESTS_SECTION_2 =', 'global.QUESTS_SECTION_2 =');
eval(code);

const quests = global.QUESTS_SECTION_2;

console.log('--- AUDITING SECTION 02 QUESTS ---');
console.log('Total Quests:', quests.length);

let errors = 0;
let blankDistribution = { 3: 0, 4: 0, 5: 0, other: 0 };
let tierCount = {};

quests.forEach((q, idx) => {
  const levelNum = idx + 1;
  tierCount[q.tier] = (tierCount[q.tier] || 0) + 1;

  // Check blanks count
  const slotCount = Object.keys(q.slots || {}).length;
  if (slotCount === 3) blankDistribution[3]++;
  else if (slotCount === 4) blankDistribution[4]++;
  else if (slotCount === 5) blankDistribution[5]++;
  else {
    blankDistribution.other++;
    console.error(`[Error] Quest #${levelNum} (${q.title}) has invalid slot count: ${slotCount}`);
    errors++;
  }

  // Check slots
  for (const [slotId, slotData] of Object.entries(q.slots || {})) {
    if (!slotData.correct) {
      console.error(`[Error] Quest #${levelNum} slot ${slotId} missing 'correct'`);
      errors++;
    }
    if (!Array.isArray(slotData.options) || slotData.options.length !== 4) {
      console.error(`[Error] Quest #${levelNum} slot ${slotId} does not have exactly 4 options (has ${slotData.options ? slotData.options.length : 0})`);
      errors++;
    }
    const unique = new Set(slotData.options);
    if (unique.size !== 4) {
      console.error(`[Error] Quest #${levelNum} slot ${slotId} contains duplicate options:`, slotData.options);
      errors++;
    }
    if (!slotData.options.includes(slotData.correct)) {
      console.error(`[Error] Quest #${levelNum} slot ${slotId} options does NOT include correct value '${slotData.correct}'`);
      errors++;
    }
  }

  // Check template slots match slots object
  const templateSlots = q.template.filter(t => t.isBlank).map(t => t.slotId);
  const declaredSlots = Object.keys(q.slots);
  if (templateSlots.length !== declaredSlots.length) {
    console.error(`[Error] Quest #${levelNum} template blank count (${templateSlots.length}) != slots keys count (${declaredSlots.length})`);
    errors++;
  }
});

console.log('Tier Breakdown:', tierCount);
console.log('Blank Count Distribution:', blankDistribution);
console.log('Total Validation Errors:', errors);

if (errors === 0) {
  console.log('🎉 SECTION 02 AUDIT 100% CLEAN & VERIFIED!');
} else {
  process.exit(1);
}
