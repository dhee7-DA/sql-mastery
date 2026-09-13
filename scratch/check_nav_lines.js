const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '../visualizer/index.html'), 'utf8');

const lines = html.split('\n');
lines.slice(0, 100).forEach((line, idx) => {
  if (line.includes('view') || line.includes('nav') || line.includes('tab') || line.includes('button')) {
    console.log(`L${idx + 1}: ${line.trim()}`);
  }
});
