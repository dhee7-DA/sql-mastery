const fs = require('fs');

global.window = global;
let code = fs.readFileSync('visualizer/quests_section5_data.js', 'utf8');
eval(code);

const quests = global.QUESTS_SECTION_5;
const metadata = global.JOIN_DISCIPLINES_METADATA;

console.log('--- AUDITING SECTION 05: RELATIONAL JOINS ARENA (420 QUESTS) ---');
console.log(`Total Disciplines: ${metadata.length}`);
console.log(`Total Quests: ${quests.length}`);

let totalErrors = 0;
const disciplineCounts = {};
const difficultyCounts = {};
const blankCounts = { '3': 0, '4': 0, '5': 0, other: 0 };

quests.forEach((q, idx) => {
  const qNum = idx + 1;
  disciplineCounts[q.discipline] = (disciplineCounts[q.discipline] || 0) + 1;
  difficultyCounts[q.difficulty] = (difficultyCounts[q.difficulty] || 0) + 1;

  const blanksInTemplate = q.template.filter(t => t.isBlank);
  const slotKeys = Object.keys(q.slots);

  if (blanksInTemplate.length !== slotKeys.length) {
    console.error(`[Quest ${qNum}] Template blanks (${blanksInTemplate.length}) != slot count (${slotKeys.length})`);
    totalErrors++;
  }

  const numBlanks = slotKeys.length;
  if (numBlanks === 3) blankCounts['3']++;
  else if (numBlanks === 4) blankCounts['4']++;
  else if (numBlanks === 5) blankCounts['5']++;
  else {
    blankCounts.other++;
    console.error(`[Quest ${qNum}] Invalid blank count: ${numBlanks}`);
    totalErrors++;
  }

  slotKeys.forEach(sId => {
    const slot = q.slots[sId];
    if (!slot || !slot.correct) {
      console.error(`[Quest ${qNum}] Missing slot or correct answer for ${sId}`);
      totalErrors++;
    }

    if (!Array.isArray(slot.options) || slot.options.length !== 4) {
      console.error(`[Quest ${qNum}] Slot ${sId} does not have exactly 4 options`);
      totalErrors++;
    }

    if (!slot.options.includes(slot.correct)) {
      console.error(`[Quest ${qNum}] Slot ${sId} options do not include correct '${slot.correct}'`);
      totalErrors++;
    }

    const uniq = new Set(slot.options);
    if (uniq.size !== slot.options.length) {
      console.error(`[Quest ${qNum}] Slot ${sId} has duplicate options: ${JSON.stringify(slot.options)}`);
      totalErrors++;
    }
  });
});

console.log('Discipline Breakdown (Target: 60 each):', disciplineCounts);
console.log('Difficulty Breakdown (Target: 140 each):', difficultyCounts);
console.log('Blank Count Distribution (3-5 blanks):', blankCounts);
console.log(`Total Validation Errors: ${totalErrors}`);

if (totalErrors === 0 && quests.length === 420) {
  console.log('🎉 SECTION 05 AUDIT 100% CLEAN & VERIFIED (420/420)!');
} else {
  process.exit(1);
}
