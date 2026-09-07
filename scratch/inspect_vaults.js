const fs = require('fs');

const mcqText = fs.readFileSync('visualizer/mcqs_vault_500.js', 'utf8');
const kwMatches = [...mcqText.matchAll(/"keyword":\s*"([^"]+)"/g)].map(m => m[1]);
const kwCounts = {};
for (const k of kwMatches) {
  kwCounts[k] = (kwCounts[k] || 0) + 1;
}
console.log('MCQ Keyword Counts:', kwCounts);

const caseText = fs.readFileSync('visualizer/case_studies_500.js', 'utf8');
const secMatches = [...caseText.matchAll(/"section":\s*"([^"]+)"/g)].map(m => m[1]);
const secCounts = {};
for (const s of secMatches) {
  secCounts[s] = (secCounts[s] || 0) + 1;
}
console.log('Case Study Section Counts:', secCounts);
