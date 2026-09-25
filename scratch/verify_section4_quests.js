const fs = require('fs');
global.window = global;
let code = fs.readFileSync('visualizer/quests_section4_data.js', 'utf8');
eval(code);
const quests = global.QUESTS_SECTION_4;
console.log('--- AUDITING SECTION 04 QUESTS ---');
console.log(`Total Quests: ${quests.length}`);

let totalErrors = 0;
const tierCounts = {};
const blankCounts = { '3': 0, '4': 0, '5': 0, other: 0 };

quests.forEach((q, idx) => {
  const qNum = idx + 1;
  tierCounts[q.tier] = (tierCounts[q.tier] || 0) + 1;

  // Count blanks in template
  const blanksInTemplate = q.template.filter(t => t.isBlank);
  const slotKeys = Object.keys(q.slots);

  if (blanksInTemplate.length !== slotKeys.length) {
    console.error(`[Quest ${qNum}] Mismatch: ${blanksInTemplate.length} template blanks vs ${slotKeys.length} slot definitions.`);
    totalErrors++;
  }

  const numBlanks = slotKeys.length;
  if (numBlanks === 3) blankCounts['3']++;
  else if (numBlanks === 4) blankCounts['4']++;
  else if (numBlanks === 5) blankCounts['5']++;
  else {
    blankCounts.other++;
    console.error(`[Quest ${qNum}] Invalid blank count: ${numBlanks} (must be 3, 4, or 5).`);
    totalErrors++;
  }

  // Validate each slot
  slotKeys.forEach(sId => {
    const slot = q.slots[sId];
    if (!slot) {
      console.error(`[Quest ${qNum}] Missing slot data for ${sId}`);
      totalErrors++;
      return;
    }

    if (!slot.correct) {
      console.error(`[Quest ${qNum}] Slot ${sId} has no correct value.`);
      totalErrors++;
    }

    if (!Array.isArray(slot.options) || slot.options.length !== 4) {
      console.error(`[Quest ${qNum}] Slot ${sId} does not have exactly 4 options: ${JSON.stringify(slot.options)}`);
      totalErrors++;
    }

    if (!slot.options.includes(slot.correct)) {
      console.error(`[Quest ${qNum}] Slot ${sId} options do not include correct answer '${slot.correct}'`);
      totalErrors++;
    }

    const uniqueOpts = new Set(slot.options);
    if (uniqueOpts.size !== slot.options.length) {
      console.error(`[Quest ${qNum}] Slot ${sId} has duplicate options: ${JSON.stringify(slot.options)}`);
      totalErrors++;
    }
  });
});

console.log('Tier Breakdown:', tierCounts);
console.log('Blank Count Distribution:', blankCounts);
console.log(`Total Validation Errors: ${totalErrors}`);

if (totalErrors === 0) {
  console.log('🎉 SECTION 04 AUDIT 100% CLEAN & VERIFIED!');
} else {
  process.exit(1);
}
