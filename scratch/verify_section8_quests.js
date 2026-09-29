// =============================================================================
// SECTION 08 VERIFIER: CONDITIONAL LOGIC & DATA PIVOTING ARENA (420 QUESTS)
// Audits 7 Disciplines x 60 Levels, Option Uniqueness, Blanks (3-5), Schema, Previews
// =============================================================================

const fs = require('fs');

const fileContent = fs.readFileSync('visualizer/quests_section8_data.js', 'utf8');

const metaMatch = fileContent.match(/window\.PIVOT_DISCIPLINES_METADATA\s*=\s*(\[[\s\S]*?\]);\s*window\.QUESTS_SECTION_8/);
const questsMatch = fileContent.match(/window\.QUESTS_SECTION_8\s*=\s*(\[[\s\S]*?\]);\s*$/);

if (!metaMatch || !questsMatch) {
  console.error("Failed to parse visualizer/quests_section8_data.js regex!");
  process.exit(1);
}

const metadata = JSON.parse(metaMatch[1]);
const quests = JSON.parse(questsMatch[1]);

console.log("--- AUDITING SECTION 08: CONDITIONAL LOGIC & PIVOTING ARENA (420 QUESTS) ---");
console.log(`Total Disciplines: ${metadata.length}`);
console.log(`Total Quests: ${quests.length}`);

let errors = [];

// 1. Check metadata length
if (metadata.length !== 7) {
  errors.push(`Expected 7 disciplines in metadata, got ${metadata.length}`);
}

// 2. Discipline counts
const disciplineCounts = {};
quests.forEach(q => {
  disciplineCounts[q.discipline] = (disciplineCounts[q.discipline] || 0) + 1;
});
console.log("Discipline Breakdown (Target: 60 each):", disciplineCounts);

metadata.forEach(d => {
  if (disciplineCounts[d.name] !== 60) {
    errors.push(`Discipline ${d.name} has ${disciplineCounts[d.name]} quests, expected 60`);
  }
});

// 3. Difficulty counts
const difficultyCounts = { Easy: 0, Medium: 0, Hard: 0 };
quests.forEach(q => {
  if (difficultyCounts[q.difficulty] !== undefined) {
    difficultyCounts[q.difficulty]++;
  } else {
    errors.push(`Quest ${q.id} has invalid difficulty: ${q.difficulty}`);
  }
});
console.log("Difficulty Breakdown (Target: 140 each):", difficultyCounts);

if (difficultyCounts.Easy !== 140 || difficultyCounts.Medium !== 140 || difficultyCounts.Hard !== 140) {
  errors.push(`Expected 140 Easy, 140 Medium, 140 Hard! Got ${JSON.stringify(difficultyCounts)}`);
}

// 4. Validate slots and options
const blankDistribution = { '3': 0, '4': 0, '5': 0, other: 0 };
quests.forEach(q => {
  const slotKeys = Object.keys(q.slots || {});
  const numSlots = slotKeys.length;
  if (numSlots >= 3 && numSlots <= 5) {
    blankDistribution[numSlots.toString()]++;
  } else {
    blankDistribution.other++;
    errors.push(`Quest ${q.id} (${q.title}) has invalid slot count: ${numSlots}`);
  }

  slotKeys.forEach(sk => {
    const slot = q.slots[sk];
    if (!slot.correct) {
      errors.push(`Quest ${q.id} slot ${sk} missing correct answer`);
    }
    if (!Array.isArray(slot.options) || slot.options.length !== 4) {
      errors.push(`Quest ${q.id} slot ${sk} options count != 4`);
    }
    const uniqueOptions = new Set(slot.options);
    if (uniqueOptions.size !== slot.options.length) {
      errors.push(`Quest ${q.id} slot ${sk} has duplicate options: ${JSON.stringify(slot.options)}`);
    }
    if (!slot.options.includes(slot.correct)) {
      errors.push(`Quest ${q.id} slot ${sk} options missing correct value: ${slot.correct}`);
    }
  });

  // Check template placeholder match
  slotKeys.forEach(sk => {
    if (!q.template.includes(`{{${sk}}}`)) {
      errors.push(`Quest ${q.id} template missing placeholder {{${sk}}}`);
    }
  });

  if (!q.targetQuery || q.targetQuery.trim() === '') {
    errors.push(`Quest ${q.id} has empty targetQuery`);
  }
});

console.log("Blank Count Distribution (3-5 blanks):", blankDistribution);

if (errors.length > 0) {
  console.error(`Validation Failed with ${errors.length} errors:`);
  errors.slice(0, 10).forEach(e => console.error(" - " + e));
  process.exit(1);
} else {
  console.log("🎉 SECTION 08 AUDIT 100% CLEAN & VERIFIED (420/420)!");
}
