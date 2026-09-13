const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../visualizer/study_library_data.js');
const content = fs.readFileSync(filePath, 'utf8');

// evaluate or parse window.STUDY_LIBRARY
const sandbox = { window: {} };
const fn = new Function('window', content);
fn(sandbox.window);

const lib = sandbox.window.STUDY_LIBRARY || [];
console.log('Total Masterclass Modules:', lib.length);
lib.forEach((m, idx) => {
  console.log(`${idx + 1}. ID: ${m.id} | Title: ${m.title}`);
});
