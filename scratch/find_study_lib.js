const fs = require('fs');
const path = require('path');
const app = fs.readFileSync(path.join(__dirname, '../visualizer/app.js'), 'utf8');

const lines = app.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('STUDY_LIBRARY') || line.includes('study-library') || line.includes('renderStudy')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
