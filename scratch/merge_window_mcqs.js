const fs = require('fs');
const path = require('path');

const vaultPath = path.join(__dirname, '..', 'visualizer', 'mcqs_vault_500.js');
const windowMcqsPath = path.join(__dirname, 'window_500_mcqs.json');

const windowMcqs = JSON.parse(fs.readFileSync(windowMcqsPath, 'utf8'));
console.log(`Loaded ${windowMcqs.length} window MCQs from ${windowMcqsPath}`);

// Read existing mcqs_vault_500.js
const vaultContent = fs.readFileSync(vaultPath, 'utf8');

// Use a safe sandbox VM to extract window.MCQS_VAULT_500
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(vaultContent, sandbox);

const existingMcqs = sandbox.window.MCQS_VAULT_500;
console.log(`Current MCQs in vault: ${existingMcqs.length}`);

// Combine
const combined = [...existingMcqs, ...windowMcqs];
console.log(`New total MCQs in vault: ${combined.length}`);

// Check distribution of the newly appended window MCQs
const optCounts = [0, 0, 0, 0];
windowMcqs.forEach(q => optCounts[q.correctIndex]++);
console.log(`Window MCQs option distribution (A, B, C, D):`, optCounts);

// Generate new file content
const header = `// =============================================================================
// THE 1,950 MASTER MCQ TECHNICAL VAULT: INSTITUTIONAL-GRADE QUESTIONS
// 100 Deep Questions across 11 Foundation Topics + 350 Deep Questions across 10 Relational Join Disciplines + 500 Master Questions across 10 Window Function Disciplines
// Physical Execution, NULL Semantics, Aggregations, Spatial Math, 10 Join Families & Analytical Window Engines
// =============================================================================

window.MCQS_VAULT_500 = `;

const jsonStr = JSON.stringify(combined, null, 2);
const finalContent = header + jsonStr + ';\n';

fs.writeFileSync(vaultPath, finalContent, 'utf8');
console.log(`Successfully updated ${vaultPath} with ${combined.length} MCQs!`);

// Verify read-back
const verifySandbox = { window: {} };
vm.createContext(verifySandbox);
vm.runInContext(fs.readFileSync(vaultPath, 'utf8'), verifySandbox);
console.log(`Verification: window.MCQS_VAULT_500.length = ${verifySandbox.window.MCQS_VAULT_500.length}`);
