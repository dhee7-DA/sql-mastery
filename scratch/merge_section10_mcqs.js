// =============================================================================
// MERGE SCRIPT: SECTION 10 MCQS (150 MCQs) into visualizer/mcqs_vault_500.js
// Final Vault Total: 1,950 + 150 = 2,100 MCQs
// =============================================================================

const fs = require('fs');
const path = require('path');

const vaultPath = path.join(__dirname, '..', 'visualizer', 'mcqs_vault_500.js');
const sec10Path = path.join(__dirname, 'section10_150_mcqs.json');

const vaultCode = fs.readFileSync(vaultPath, 'utf8');
const sec10MCQs = JSON.parse(fs.readFileSync(sec10Path, 'utf8'));

// Extract existing array
eval(vaultCode.replace('window.', 'global.'));
const existingMCQs = global.MCQS_VAULT_500;
console.log(`Existing MCQs in vault: ${existingMCQs.length}`);

// Assign unique contiguous sequential IDs
const startId = existingMCQs.length + 1;
sec10MCQs.forEach((m, idx) => {
  m.id = `mcq_sec10_${startId + idx}`;
});

const mergedMCQs = existingMCQs.concat(sec10MCQs);
console.log(`Merged Total MCQs: ${mergedMCQs.length}`);

// Check distribution of the 150 added questions
const dist = [0, 0, 0, 0];
sec10MCQs.forEach(m => dist[m.correctIndex]++);
console.log(`Section 10 Added Distribution [A, B, C, D]: [ ${dist.join(', ')} ]`);

// Write back to visualizer/mcqs_vault_500.js
const header = `// =============================================================================\n// MASTER TECHNICAL MCQ VAULT (${mergedMCQs.length} Comprehensive Database Questions)\n// Aligned with ANSI SQL, PostgreSQL, MySQL 8.0+, Snowflake, Oracle, and DB2\n// Includes Sections 1-9 plus Section 10: Advanced SQL Engine Mastery\n// =============================================================================\n\nwindow.MCQS_VAULT_500 = `;

fs.writeFileSync(vaultPath, header + JSON.stringify(mergedMCQs, null, 2) + ';\n', 'utf8');
console.log(`Successfully updated ${vaultPath} with ${mergedMCQs.length} MCQs.`);
