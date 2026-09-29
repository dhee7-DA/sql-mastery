const fs = require('fs');
['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'].forEach(s => {
  const file = 'visualizer/quests_section' + s + '_data.js';
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const m = content.match(/"id":\s*(\d+)/g);
    if (m) {
      const ids = m.map(x => parseInt(x.replace(/\D/g, '')));
      console.log('Section ' + s + ': ' + ids.length + ' quests, min: ' + Math.min(...ids) + ', max: ' + Math.max(...ids));
    }
  }
});
