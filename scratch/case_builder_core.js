const fs = require('fs');
const path = require('path');

// Master specification generator for Section 8 (IDs 651 to 1040) - 390 Distinct Production Case Studies
console.log("Starting build of 390 High-Fidelity Relational Joins Case Studies...");

const cases = [];
let currentId = 651;

function addCase(item) {
  cases.push({
    id: currentId++,
    section: "Section 8: Relational Joins & Financial Data Modeling",
    title: item.title,
    industry: item.ind,
    difficulty: item.diff,
    scenario: item.scenario,
    businessObjective: item.businessObjective,
    schemaSnippet: item.schemaSnippet,
    targetQuery: item.targetQuery,
    table: item.table,
    eli5Story: item.eli5Story,
    commonMistakes: item.commonMistakes,
    learningOutcomes: item.learningOutcomes
  });
}

// Export for modular building
module.exports = { addCase, cases, currentId: () => currentId };
