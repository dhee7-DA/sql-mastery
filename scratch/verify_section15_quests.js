const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, '../visualizer/quests_section15_data.js'), 'utf8');

const sandbox = {};
const fn = new Function('window', fileContent);
fn(sandbox);

const metadata = sandbox.JSON_DISCIPLINES_METADATA;
const quests = sandbox.QUESTS_SECTION_15;

console.log('--- AUDITING SECTION 15: JSON & SEMI-STRUCTURED DATA IN SQL (100 QUESTS) ---');
console.log('Total Disciplines:', metadata.length);
console.log('Total Quests:', quests.length);

let errors = [];

if (quests.length !== 100) {
  errors.push(`Expected 100 quests, got ${quests.length}`);
}

const discCounts = {};
const diffCounts = {};
const blankCounts = { '2': 0, '3': 0, '4': 0, '5': 0, other: 0 };

quests.forEach((q, idx) => {
  discCounts[q.disciplineKey] = (discCounts[q.disciplineKey] || 0) + 1;
  diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;

  const slotKeys = Object.keys(q.slots || {});
  const numSlots = slotKeys.length;
  if (blankCounts[numSlots] !== undefined) {
    blankCounts[numSlots]++;
  } else {
    blankCounts.other++;
  }

  if (numSlots < 2 || numSlots > 5) {
    errors.push(`Quest ${q.id} (index ${idx}) has invalid blank count: ${numSlots}`);
  }

  slotKeys.forEach(sk => {
    const slot = q.slots[sk];
    if (!slot.correct) {
      errors.push(`Quest ${q.id} slot ${sk} missing correct answer`);
    }
    if (!Array.isArray(slot.options) || slot.options.length !== 4) {
      errors.push(`Quest ${q.id} slot ${sk} options count != 4`);
    }
    const unique = new Set(slot.options);
    if (unique.size !== slot.options.length) {
      errors.push(`Quest ${q.id} slot ${sk} has duplicate options: ${JSON.stringify(slot.options)}`);
    }
    if (!slot.options.includes(slot.correct)) {
      errors.push(`Quest ${q.id} slot ${sk} options does not include correct answer '${slot.correct}'`);
    }
  });

  if (!q.story || q.story.length < 10) {
    errors.push(`Quest ${q.id} missing or short story`);
  }
  if (!q.targetQuery || !q.targetQuery.includes('SELECT') && !q.targetQuery.includes('CREATE INDEX')) {
    errors.push(`Quest ${q.id} targetQuery invalid`);
  }
});

console.log('Discipline Breakdown (Target: 20 each):', discCounts);
console.log('Difficulty Breakdown:', diffCounts);
console.log('Blank Count Distribution:', blankCounts);

metadata.forEach(d => {
  if (discCounts[d.key] !== 20) {
    errors.push(`Discipline ${d.key} has ${discCounts[d.key]} quests, expected exactly 20`);
  }
});

if (errors.length > 0) {
  console.error(`💥 Validation failed with ${errors.length} errors:`);
  errors.slice(0, 15).forEach(e => console.error(' -', e));
  process.exit(1);
} else {
  console.log('🎉 SECTION 15 AUDIT 100% CLEAN & VERIFIED (100/100)!');
}
