const fs = require('fs');

console.log('--- AUDITING SECTION 06: WINDOW FUNCTIONS ARENA (420 QUESTS) ---');

const fileContent = fs.readFileSync('visualizer/quests_section6_data.js', 'utf8');

// Mock window object
const window = {};
eval(fileContent);

const metadata = window.WINDOW_DISCIPLINES_METADATA || [];
const quests = window.QUESTS_SECTION_6 || [];

console.log(`Total Disciplines: ${metadata.length}`);
console.log(`Total Quests: ${quests.length}`);

let errors = [];

if (metadata.length !== 7) {
  errors.push(`Expected 7 metadata disciplines, found ${metadata.length}`);
}

if (quests.length !== 420) {
  errors.push(`Expected 420 quests, found ${quests.length}`);
}

const discCounts = {};
const diffCounts = { Easy: 0, Medium: 0, Hard: 0 };
const blankCounts = { 3: 0, 4: 0, 5: 0, other: 0 };

quests.forEach((q, idx) => {
  // 1. Check ID sequence
  if (q.id !== idx + 1) {
    errors.push(`Quest at index ${idx} has mismatched id ${q.id}`);
  }

  // 2. Count discipline
  discCounts[q.disciplineName] = (discCounts[q.disciplineName] || 0) + 1;

  // 3. Count difficulty
  if (diffCounts[q.difficulty] !== undefined) {
    diffCounts[q.difficulty]++;
  } else {
    errors.push(`Quest ${q.id} has unexpected difficulty ${q.difficulty}`);
  }

  // 4. Check slots and options
  const slotKeys = Object.keys(q.slots || {});
  const numSlots = slotKeys.length;
  if (blankCounts[numSlots] !== undefined) {
    blankCounts[numSlots]++;
  } else {
    blankCounts.other++;
    errors.push(`Quest ${q.id} has invalid slot count: ${numSlots}`);
  }

  slotKeys.forEach(sKey => {
    const slotObj = q.slots[sKey];
    if (!slotObj) {
      errors.push(`Quest ${q.id} missing slot object for ${sKey}`);
      return;
    }

    if (!slotObj.correct) {
      errors.push(`Quest ${q.id} slot ${sKey} missing correct answer`);
    }

    if (!Array.isArray(slotObj.options) || slotObj.options.length !== 4) {
      errors.push(`Quest ${q.id} slot ${sKey} does not have exactly 4 options`);
    }

    // Check for duplicate options
    const uniqueOpts = new Set(slotObj.options);
    if (uniqueOpts.size !== slotObj.options.length) {
      errors.push(`Quest ${q.id} slot ${sKey} has duplicate options: ${JSON.stringify(slotObj.options)}`);
    }

    // Check that correct answer is among options
    if (!uniqueOpts.has(slotObj.correct)) {
      errors.push(`Quest ${q.id} slot ${sKey} correct answer "${slotObj.correct}" is not in options`);
    }
  });

  // 5. Template check
  if (!Array.isArray(q.template) || q.template.length < 3) {
    errors.push(`Quest ${q.id} has invalid template structure`);
  }
});

console.log('Discipline Breakdown (Target: 60 each):', discCounts);
console.log('Difficulty Breakdown (Target: 140 each):', diffCounts);
console.log('Blank Count Distribution (3-5 blanks):', blankCounts);

if (errors.length > 0) {
  console.error(`🚨 FOUND ${errors.length} ERRORS:`);
  errors.slice(0, 10).forEach(e => console.error(' - ' + e));
  process.exit(1);
} else {
  console.log('🎉 SECTION 06 AUDIT 100% CLEAN & VERIFIED (420/420)!');
}
