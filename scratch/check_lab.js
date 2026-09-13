const fs = require('fs');
const path = require('path');
const lab = fs.readFileSync(path.join(__dirname, '../visualizer/guided_lab_data.js'), 'utf8');

const tracks = [...lab.matchAll(/title:\s*['\"`](.*?)['\"`]/g)].map(m => m[1]);
console.log('Guided Lab tracks / steps:');
tracks.slice(0, 15).forEach((t, idx) => console.log(`${idx + 1}: ${t}`));
