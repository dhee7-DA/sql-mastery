const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '../visualizer/index.html'), 'utf8');

const scripts = [...html.matchAll(/<script\s+src=["'](.*?)["']/g)].map(m => m[1]);
console.log('Script tags in index.html:');
scripts.forEach((s, idx) => console.log(`${idx + 1}: ${s}`));
