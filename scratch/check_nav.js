const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '../visualizer/index.html'), 'utf8');

const navMatches = [...html.matchAll(/class=["'][^"']*nav-btn[^"']*["'][^>]*data-view=["'](.*?)["'][^>]*>([\s\S]*?)<\/button>/gi)];
console.log('Navigation buttons:');
navMatches.forEach(m => console.log(`Data-view: ${m[1]} | Label: ${m[2].trim().replace(/<[^>]+>/g, '')}`));
