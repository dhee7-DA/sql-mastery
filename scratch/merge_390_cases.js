const fs = require('fs');
const path = require('path');

console.log("Starting safe merge of 390 Join cases into visualizer/case_studies_500.js...");

const originalPath = path.join(__dirname, '../visualizer/case_studies_500.js');
const generatedPath = path.join(__dirname, 'generated_390_cases.json');

// Read existing file text or load cases safely
const casesContent = fs.readFileSync(originalPath, 'utf-8');
// Evaluate in a sandbox with window object
const sandbox = { window: {} };
const fn = new Function('window', casesContent);
fn(sandbox.window);

const originalCases = sandbox.window.ALL_500_CASE_STUDIES || sandbox.window.ALL_1040_CASE_STUDIES;
console.log("Loaded original cases count:", originalCases.length);

// Slice the first 650 cases (Sections 1 to 7)
const cases1To650 = originalCases.slice(0, 650);
console.log("Preserved base cases 1-650 (Sections 1-7). Last ID:", cases1To650[cases1To650.length - 1].id);

// Load the 390 generated Section 8 cases
const new390Cases = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));
console.log("Loaded 390 Section 8 cases. Range:", new390Cases[0].id, "to", new390Cases[new390Cases.length - 1].id);

// Combine
const all1040 = [...cases1To650, ...new390Cases];
console.log("Total merged cases count:", all1040.length);

// Write to case_studies_500.js with universal browser + node support
const fileContent = `// =============================================================================
// CORPORATE CASE STUDIES MASTER VAULT (1,040 PRODUCTION ANALYTICS SCENARIOS)
// Spans 10 Global Corporate Industries & 8 Core SQL Foundations
// Section 8 Features 390 Relational Join Mastery Cases (130 Easy, 130 Medium, 130 Hard)
// =============================================================================

const ALL_500_CASE_STUDIES = ${JSON.stringify(all1040, null, 2)};

if (typeof window !== 'undefined') {
  window.ALL_500_CASE_STUDIES = ALL_500_CASE_STUDIES;
  window.ALL_600_CASE_STUDIES = ALL_500_CASE_STUDIES;
  window.ALL_650_CASE_STUDIES = ALL_500_CASE_STUDIES;
  window.ALL_700_CASE_STUDIES = ALL_500_CASE_STUDIES;
  window.ALL_1040_CASE_STUDIES = ALL_500_CASE_STUDIES;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ALL_500_CASE_STUDIES,
    ALL_600_CASE_STUDIES: ALL_500_CASE_STUDIES,
    ALL_650_CASE_STUDIES: ALL_500_CASE_STUDIES,
    ALL_700_CASE_STUDIES: ALL_500_CASE_STUDIES,
    ALL_1040_CASE_STUDIES: ALL_500_CASE_STUDIES
  };
}
`;

fs.writeFileSync(originalPath, fileContent, 'utf-8');
console.log("Successfully wrote 1,040 cases to visualizer/case_studies_500.js with node + browser support!");
