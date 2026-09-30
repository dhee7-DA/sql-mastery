const fs = require('fs');

global.window = {};
require('../visualizer/capstones_data.js');

const capstones = window.CAPSTONES_DATA;
console.log('--- AUDITING CAPSTONES DATA VAULT ---');

let errors = 0;
if (!Array.isArray(capstones) || capstones.length !== 10) {
  console.error(`ERROR: Expected 10 capstones, found ${capstones ? capstones.length : 0}`);
  errors++;
}

const domainCount = {};

capstones.forEach((cap, idx) => {
  domainCount[cap.domain] = (domainCount[cap.domain] || 0) + 1;
  if (!cap.id || !cap.title || !cap.steps || cap.steps.length === 0) {
    console.error(`Capstone #${idx + 1} missing required metadata or steps.`);
    errors++;
  }

  cap.steps.forEach((step, sIdx) => {
    if (!step.title || !step.targetQuery || !step.prerequisites) {
      console.error(`Capstone ${cap.id} Step #${sIdx + 1} missing title, targetQuery, or prerequisites.`);
      errors++;
    }

    // Check prerequisites have valid sectionKey
    step.prerequisites.forEach(pr => {
      if (!pr.sectionKey || !pr.label) {
        console.error(`Capstone ${cap.id} Step #${sIdx + 1} prerequisite missing sectionKey or label.`);
        errors++;
      }
    });

    // Check slots
    const slotKeys = Object.keys(step.slots || {});
    slotKeys.forEach(sId => {
      const slot = step.slots[sId];
      if (!slot.correct || !slot.options) {
        console.error(`Capstone ${cap.id} Step #${sIdx + 1} slot ${sId} invalid.`);
        errors++;
      } else {
        if (!slot.options.includes(slot.correct)) {
          console.error(`Capstone ${cap.id} Step #${sIdx + 1} slot ${sId} correct answer '${slot.correct}' not in options.`);
          errors++;
        }
      }
    });

    const blankCount = (step.template || []).filter(t => t.isBlank).length;
    if (blankCount !== slotKeys.length) {
      console.error(`Capstone ${cap.id} Step #${sIdx + 1} template blanks (${blankCount}) != slots count (${slotKeys.length}).`);
      errors++;
    }
  });
});

console.log('Domains Checked:', domainCount);
console.log('Total Capstones:', capstones.length);
console.log('Total Validation Errors:', errors);

if (errors === 0) {
  console.log('🎉 CAPSTONES DATA VAULT 100% CLEAN & VERIFIED (10/10 Projects)!');
} else {
  process.exit(1);
}
