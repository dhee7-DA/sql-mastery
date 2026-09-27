const { execSync } = require('child_process');

const scripts = [
  'verify_quests.js',
  'verify_section2_quests.js',
  'verify_section3_quests.js',
  'verify_section4_quests.js',
  'verify_section5_quests.js',
  'verify_section6_quests.js',
  'verify_section7_quests.js',
  'verify_section8_quests.js',
  'verify_section9_quests.js',
  'verify_section10_quests.js',
  'verify_section11_quests.js',
  'verify_section12_quests.js',
  'verify_section13_quests.js',
  'verify_section14_quests.js'
];

console.log('=== RUNNING COMPLETE AUDIT OF ALL 14 SQL ARENA SECTIONS (1,720 TOTAL QUESTS) ===');
let totalErrors = 0;

scripts.forEach(script => {
  try {
    const out = execSync(`node scratch/${script}`, { encoding: 'utf8' });
    console.log(out.trim());
  } catch (err) {
    console.error(`FAILED ON ${script}:`, err.stdout || err.message);
    totalErrors++;
  }
});

console.log('================================================================================');
if (totalErrors === 0) {
  console.log('🏆 ALL 14 SECTIONS AUDITED & 100% CLEAN! (1,720/1,720 QUESTS VERIFIED WITH 0 ERRORS)');
} else {
  console.error(`💥 ENCOUNTERED ${totalErrors} SECTION FAILURES!`);
  process.exit(1);
}
