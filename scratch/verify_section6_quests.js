const fs = require('fs');

// Mock window object
global.window = {};
require('../visualizer/quests_section6_data.js');

const quests = window.QUESTS_SECTION_6;
console.log('--- AUDITING SECTION 06: WINDOW FUNCTIONS ARENA (100 QUESTS) ---');

let errors = 0;
const discCounts = {};
const diffCounts = {};
const blankDist = { '3': 0, '4': 0, '5': 0, other: 0 };

if (!Array.isArray(quests) || quests.length !== 100) {
  console.error(`ERROR: Expected 100 quests, found ${quests ? quests.length : 0}`);
  errors++;
}

quests.forEach((q, idx) => {
  discCounts[q.discipline] = (discCounts[q.discipline] || 0) + 1;
  diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;

  const slotKeys = Object.keys(q.slots || {});
  const numBlanks = slotKeys.length;
  if (blankDist[numBlanks] !== undefined) blankDist[numBlanks]++;
  else blankDist.other++;

  if (numBlanks < 3 || numBlanks > 5) {
    console.error(`Quest #${q.id} (index ${idx}) has invalid blank count: ${numBlanks}`);
    errors++;
  }

  // Check slots
  slotKeys.forEach(sId => {
    const slot = q.slots[sId];
    if (!slot.correct) {
      console.error(`Quest #${q.id} slot ${sId} missing correct answer`);
      errors++;
    }
    if (!slot.options || !Array.isArray(slot.options)) {
      console.error(`Quest #${q.id} slot ${sId} missing options array`);
      errors++;
    } else {
      if (!slot.options.includes(slot.correct)) {
        console.error(`Quest #${q.id} slot ${sId} correct answer "${slot.correct}" not in options [${slot.options.join(', ')}]`);
        errors++;
      }
      const uniqueOpts = new Set(slot.options);
      if (uniqueOpts.size !== slot.options.length) {
        console.error(`Quest #${q.id} slot ${sId} contains duplicate options: [${slot.options.join(', ')}]`);
        errors++;
      }
    }
  });

  // Verify template matches slots
  const templateSlotCount = (q.template || []).filter(t => t.isBlank).length;
  if (templateSlotCount !== numBlanks) {
    console.error(`Quest #${q.id} template blanks (${templateSlotCount}) != slots count (${numBlanks})`);
    errors++;
  }
});

console.log('Total Quests:', quests.length);
console.log('Discipline Breakdown (Target: 20 each):', discCounts);
console.log('Difficulty Breakdown:', diffCounts);
console.log('Blank Count Distribution (3-5 blanks):', blankDist);
console.log('Total Validation Errors:', errors);

if (errors === 0) {
  console.log('🎉 SECTION 06 AUDIT 100% CLEAN & VERIFIED (100/100)!');
} else {
  process.exit(1);
}
