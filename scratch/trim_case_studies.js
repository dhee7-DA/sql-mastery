const fs = require('fs');
const { ALL_500_CASE_STUDIES } = require('../visualizer/case_studies_500.js');

console.log('Current total in case_studies_500.js:', ALL_500_CASE_STUDIES.length);

const base1490 = ALL_500_CASE_STUDIES.filter(c => c.id <= 1490);
console.log('Filtered base cases (1 to 1490):', base1490.length);

const header = `// =============================================================================
// CORPORATE CASE STUDIES MASTER VAULT (1,490 PRODUCTION ENTERPRISE SCENARIOS)
// Sections 1-10: Complete Enterprise Relational Modeling Across 10 Industries
// =============================================================================

const ALL_500_CASE_STUDIES = `;

const footer = `;

// Backward compatibility aliases
const ALL_1490_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_1790_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_1340_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_1040_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_700_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_650_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_600_CASE_STUDIES = ALL_500_CASE_STUDIES;
const ALL_300_CASE_STUDIES = ALL_500_CASE_STUDIES;

if (typeof window !== 'undefined') {
  window.ALL_500_CASE_STUDIES = ALL_500_CASE_STUDIES;
  window.ALL_1490_CASE_STUDIES = ALL_1490_CASE_STUDIES;
  window.ALL_1790_CASE_STUDIES = ALL_1790_CASE_STUDIES;
  window.ALL_1340_CASE_STUDIES = ALL_1340_CASE_STUDIES;
  window.ALL_1040_CASE_STUDIES = ALL_1040_CASE_STUDIES;
  window.ALL_700_CASE_STUDIES = ALL_700_CASE_STUDIES;
  window.ALL_650_CASE_STUDIES = ALL_650_CASE_STUDIES;
  window.ALL_600_CASE_STUDIES = ALL_600_CASE_STUDIES;
  window.ALL_300_CASE_STUDIES = ALL_300_CASE_STUDIES;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ALL_500_CASE_STUDIES,
    ALL_1490_CASE_STUDIES,
    ALL_1790_CASE_STUDIES,
    ALL_1340_CASE_STUDIES,
    ALL_1040_CASE_STUDIES,
    ALL_700_CASE_STUDIES,
    ALL_650_CASE_STUDIES,
    ALL_600_CASE_STUDIES,
    ALL_300_CASE_STUDIES
  };
}
`;

fs.writeFileSync('visualizer/case_studies_500.js', header + JSON.stringify(base1490, null, 2) + footer, 'utf8');
console.log('Successfully written visualizer/case_studies_500.js with exactly 1,490 cases!');
