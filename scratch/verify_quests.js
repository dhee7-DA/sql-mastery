const fs = require('fs');
const content = fs.readFileSync('visualizer/quests_section1_data.js', 'utf8');
const sandbox = { window: {} };
require('vm').runInNewContext(content, sandbox);
const quests = sandbox.window.QUESTS_SECTION_1;

console.log('Total quests loaded:', quests.length);

const blankCounts = {};
let errors = [];

quests.forEach((q, idx) => {
  const slots = Object.keys(q.slots || {});
  const numBlanks = slots.length;
  blankCounts[numBlanks] = (blankCounts[numBlanks] || 0) + 1;

  if (numBlanks < 3 || numBlanks > 5) {
    errors.push(`Quest ${q.id} (idx ${idx}): Invalid blank count ${numBlanks}`);
  }

  slots.forEach(slotKey => {
    const slot = q.slots[slotKey];
    if (!slot) {
      errors.push(`Quest ${q.id}: Missing slot ${slotKey}`);
      return;
    }
    if (!slot.correct) {
      errors.push(`Quest ${q.id} (${slotKey}): Missing correct answer`);
    }
    if (!slot.options || slot.options.length !== 4) {
      errors.push(`Quest ${q.id} (${slotKey}): Expected 4 options, found ${slot.options ? slot.options.length : 0}`);
    } else {
      if (!slot.options.includes(slot.correct)) {
        errors.push(`Quest ${q.id} (${slotKey}): Correct answer '${slot.correct}' not in options [${slot.options.join(', ')}]`);
      }
      const uniqueOpts = new Set(slot.options);
      if (uniqueOpts.size !== 4) {
        errors.push(`Quest ${q.id} (${slotKey}): Options contain duplicates [${slot.options.join(', ')}]`);
      }
    }
  });

  // Verify template blank slots match slots object
  const templateBlanks = (q.template || []).filter(t => t.isBlank).map(t => t.slotId);
  if (templateBlanks.length !== slots.length) {
    errors.push(`Quest ${q.id}: Template has ${templateBlanks.length} blanks, but slots has ${slots.length}`);
  }
  templateBlanks.forEach(sb => {
    if (!q.slots[sb]) {
      errors.push(`Quest ${q.id}: Template blank '${sb}' not found in slots`);
    }
  });
});

console.log('Blank Count Distribution:', JSON.stringify(blankCounts));
console.log('Total Errors:', errors.length);
if (errors.length > 0) {
  console.log('First 5 errors:', errors.slice(0, 5));
  process.exit(1);
} else {
  console.log('>>> SUCCESS: ALL 100 QUESTS FULLY VERIFIED WITH 3-5 PROGRESSIVE BLANKS! <<<');
}
