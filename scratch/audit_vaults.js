const fs = require('fs');
const path = require('path');

// 1. Inspect MCQs in visualizer/mcqs_vault_500.js
const mcqFile = path.join(__dirname, '../visualizer/mcqs_vault_500.js');
let mcqContent = fs.readFileSync(mcqFile, 'utf8');

const sandbox = { window: {} };
const fn = new Function('window', mcqContent);
fn(sandbox.window);

const allMcqs = sandbox.window.MCQS_VAULT_500 || [];
console.log('=== MCQ VAULT 500 AUDIT ===');
console.log('Total MCQs in mcqs_vault_500.js:', allMcqs.length);

const mcqKeywords = {};
allMcqs.forEach(q => {
  const kw = q.keyword || 'Uncategorized';
  mcqKeywords[kw] = (mcqKeywords[kw] || 0) + 1;
});
console.log('MCQ Categories in mcqs_vault_500.js:');
Object.entries(mcqKeywords).forEach(([kw, count]) => {
  console.log(`  - ${kw}: ${count} questions`);
});

// 2. Inspect joins_master_350_vault.js
const joinVaultFile = path.join(__dirname, '../visualizer/joins_master_350_vault.js');
let joinContent = fs.readFileSync(joinVaultFile, 'utf8');
const sandboxJoin = { window: {} };
const fnJoin = new Function('window', joinContent);
fnJoin(sandboxJoin.window);

const joinMcqs = sandboxJoin.window.JOINS_MASTER_350_MCQS || [];
console.log('\n=== JOINS MASTER 350 VAULT AUDIT ===');
console.log('Total MCQs in joins_master_350_vault.js:', joinMcqs.length);
const joinKeywords = {};
joinMcqs.forEach(q => {
  const kw = q.keyword || 'Uncategorized';
  joinKeywords[kw] = (joinKeywords[kw] || 0) + 1;
});
Object.entries(joinKeywords).forEach(([kw, count]) => {
  console.log(`  - ${kw}: ${count} questions`);
});

// 3. Inspect Case Studies
const caseFile = path.join(__dirname, '../visualizer/case_studies_500.js');
const { ALL_500_CASE_STUDIES } = require(caseFile);
console.log('\n=== CASE STUDIES VAULT AUDIT ===');
console.log('Total Case Studies:', ALL_500_CASE_STUDIES.length);

const caseSections = {};
ALL_500_CASE_STUDIES.forEach(c => {
  caseSections[c.section] = (caseSections[c.section] || 0) + 1;
});
console.log('Case Study Sections:');
Object.entries(caseSections).forEach(([sec, count]) => {
  console.log(`  - ${sec}: ${count} case studies`);
});
