// scratch/build_section8_complete.js
// Assembles visualizer/leetcode_section8_data.js from modular components

const fs = require('fs');
const path = require('path');

console.log('Compiling Concept 8: Advanced Premium Core (50 Problems)...');

const masterclassData = require('./section8_masterclass');
const problemsBatch1 = require('./section8_problems_batch1');
const problemsBatch2 = require('./section8_problems_batch2');

const allProblems = [...problemsBatch1, ...problemsBatch2];
console.log(`Loaded ${allProblems.length} curated LeetCode Premium problems.`);

const finalData = {
  conceptId: "concept-8",
  conceptNumber: 8,
  title: "Advanced Premium Core & Analytics",
  subtitle: "50 LeetCode Premium Classics: UDFs, Dense Ranks, Weighted Medians, Graph Degrees & Island-Gaps",
  description: "Master the official LeetCode Advanced SQL 50 and canonical premium interview questions asked by Amazon, Meta, Google, Uber, Twitter, and Apple. Deep-dive into user-defined scalar functions, weighted frequency medians, rolling window exclusions, bidirectional graph normalization, organizational hierarchy traversal, and Islands & Gaps state machines.",
  masterclass: {
    chapters: masterclassData.chapters,
    callouts: masterclassData.callouts
  },
  conceptMcqs: masterclassData.mcqs,
  mcqs: masterclassData.mcqs,
  prepDrills: masterclassData.drills,
  drills: masterclassData.drills,
  leetcodeProblems: allProblems,
  problems: allProblems
};

const fileContent = `/**
 * LeetCode SQL Arena - Concept 8 Data File
 * Concept: Advanced Premium Core & Analytics
 * Includes:
 *   - 8 Visual Masterclass Chapters with bespoke Vector SVGs
 *   - 3 Masterclass Callouts (Danger, Warning, Info)
 *   - 100 Concept MCQs (#801-900)
 *   - 100 Prep Drills (#801-900)
 *   - 50 Curated LeetCode Premium Problems (Problems #77 to #126 in Arena)
 */

window.LEETCODE_SECTION_8_DATA = ${JSON.stringify(finalData, null, 2)};
`;

const targetPath = path.join(__dirname, '..', 'visualizer', 'leetcode_section8_data.js');
fs.writeFileSync(targetPath, fileContent, 'utf8');

const stats = fs.statSync(targetPath);
console.log(`Successfully generated visualizer/leetcode_section8_data.js (${(stats.size / 1024).toFixed(1)} KB)`);
console.log(`Total Problems: ${allProblems.length}`);
console.log(`Total Masterclass Chapters: ${masterclassData.chapters.length}`);
console.log(`Total MCQs: ${masterclassData.mcqs.length}`);
console.log(`Total Prep Drills: ${masterclassData.drills.length}`);
