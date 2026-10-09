// Comprehensive Audit Script for Concepts 1 to 5
const fs = require('fs');
const path = require('path');

// Mock window
global.window = {};

function loadDataFile(relPath) {
  const fullPath = path.join(__dirname, '..', relPath);
  const code = fs.readFileSync(fullPath, 'utf8');
  eval(code);
}

loadDataFile('visualizer/leetcode_section1_data.js');
loadDataFile('visualizer/leetcode_section2_data.js');
loadDataFile('visualizer/leetcode_section3_data.js');
loadDataFile('visualizer/leetcode_section4_data.js');
loadDataFile('visualizer/leetcode_section5_data.js');
loadDataFile('visualizer/leetcode_section6_data.js');
loadDataFile('visualizer/leetcode_section7_data.js');

const sections = [
  { id: 'concept-1', name: 'Concept 1: Filtering & Three-Valued Logic', data: window.LEETCODE_SECTION_1_DATA },
  { id: 'concept-2', name: 'Concept 2: Relational Joins & Self-Joins', data: window.LEETCODE_SECTION_2_DATA },
  { id: 'concept-3', name: 'Concept 3: Basic Aggregates & Math', data: window.LEETCODE_SECTION_3_DATA },
  { id: 'concept-4', name: 'Concept 4: Sorting & Grouping (HAVING)', data: window.LEETCODE_SECTION_4_DATA },
  { id: 'concept-5', name: 'Concept 5: Advanced Joins & Running Aggregates', data: window.LEETCODE_SECTION_5_DATA },
  { id: 'concept-6', name: 'Concept 6: Subqueries, CTEs & Correlated Subqueries', data: window.LEETCODE_SECTION_6_DATA },
  { id: 'concept-7', name: 'Concept 7: Advanced String Manipulation, Regex & Clauses', data: window.LEETCODE_SECTION_7_DATA }
];

console.log('=== LEETCODE 50 SQL ARENA COMPREHENSIVE 7-SECTION AUDIT ===\n');

let totalProblems = 0;
let totalChapters = 0;
let totalMCQs = 0;
let totalDrills = 0;

sections.forEach((sec, idx) => {
  const d = sec.data;
  if (!d) {
    console.error(`❌ Section ${idx + 1} (${sec.id}) NOT FOUND!`);
    return;
  }

  const mc = d.masterclass;
  const chapters = (mc && mc.chapters) || [];
  const mcqs = d.conceptMcqs || d.mcqs || [];
  const drills = d.prepDrills || d.drills || [];
  const probs = d.leetcodeProblems || d.problems || [];

  totalProblems += probs.length;
  totalChapters += chapters.length;
  totalMCQs += mcqs.length;
  totalDrills += drills.length;

  console.log(`[Concept ${idx + 1}] ${sec.name}`);
  console.log(`  - Root meta: conceptId="${d.conceptId}", title="${d.title}", number=${d.conceptNumber}`);
  const callouts = (mc && mc.callouts) || [];
  console.log(`  - Masterclass: ${chapters.length} chapters, ${callouts.length} callouts`);
  
  // Chapter SVG check
  let chapSvgCount = 0;
  chapters.forEach((c, cIdx) => {
    const hasSvg = !!((c.diagram && c.diagram.svg) || c.svg);
    if (hasSvg) chapSvgCount++;
    else console.warn(`    ⚠️ Chapter ${cIdx + 1} missing SVG`);
  });
  console.log(`    SVGs present: ${chapSvgCount}/${chapters.length}`);

  // MCQs check
  console.log(`  - MCQs: ${mcqs.length} questions`);
  let validMcqs = 0;
  let trapMcqs = 0;
  mcqs.forEach((m, mIdx) => {
    const qText = m.q || m.question;
    const ans = m.correct !== undefined ? m.correct : (m.correctIndex !== undefined ? m.correctIndex : m.answer);
    const opts = m.options || m.opts || [];
    const isTrap = m.isTrap || !!m.trapBadge || !!m.trapWarning;
    if (qText && opts.length >= 2 && ans !== undefined && ans >= 0 && ans < opts.length) {
      validMcqs++;
    } else {
      console.warn(`    ⚠️ MCQ #${mIdx + 1} issue: q="${!!qText}", opts=${opts.length}, ans=${ans}`);
    }
    if (isTrap) trapMcqs++;
  });
  console.log(`    Valid MCQs: ${validMcqs}/${mcqs.length} (${trapMcqs} traps tagged)`);

  // Drills check
  console.log(`  - Prep Drills: ${drills.length} drills`);
  let validDrills = 0;
  drills.forEach((dr, drIdx) => {
    const prompt = dr.prompt || dr.task;
    const sql = dr.starterSQL || dr.solutionSQL || dr.sql;
    if (prompt && sql) validDrills++;
    else console.warn(`    ⚠️ Drill #${drIdx + 1} missing prompt or SQL`);
  });
  console.log(`    Valid Drills: ${validDrills}/${drills.length}`);

  // Problems check
  console.log(`  - LeetCode Problems: ${probs.length} problems`);
  probs.forEach((p, pIdx) => {
    const hasPrompt = !!(p.prompt || p.description);
    const hasSvg = !!(p.svgDiagram || p.schemaDiagram);
    const hasSql = !!p.solutionSQL;
    const hasBreakdown = !!(p.logicBreakdown && p.logicBreakdown.length > 0);
    const hasLines = !!(p.lineByLineExplanation && p.lineByLineExplanation.length > 0);
    const hasTraps = !!(p.trapsAndEdgeCases && p.trapsAndEdgeCases.length > 0) || !!(p.traps && p.traps.length > 0);
    const hasAlts = !!(p.alternativeSolutions && p.alternativeSolutions.length > 0);
    const hasFreq = !!(p.interviewFreq || p.acceptance || p.frequency);

    const issues = [];
    if (!hasPrompt) issues.push('missing prompt');
    if (!hasSvg) issues.push('missing SVG diagram');
    if (!hasSql) issues.push('missing solutionSQL');
    if (!hasBreakdown) issues.push('missing logicBreakdown');
    if (!hasLines) issues.push('missing lineByLineExplanation');
    if (!hasTraps) issues.push('missing traps');
    if (!hasAlts) issues.push('missing alternativeSolutions');
    if (!hasFreq) issues.push('missing interviewFreq');

    if (issues.length > 0) {
      console.warn(`    ⚠️ Problem #${p.id} (${p.title}): ${issues.join(', ')}`);
    }
  });

  console.log('');
});

console.log('=== SUMMARY ACROSS ALL 7 CONCEPTS ===');
console.log(`Total Problems: ${totalProblems}`);
console.log(`Total Masterclass Chapters (with visual SVGs): ${totalChapters}`);
console.log(`Total MCQs: ${totalMCQs}`);
console.log(`Total Prep Drills: ${totalDrills}`);

