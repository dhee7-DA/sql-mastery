const fs = require('fs');

// 1. Fix T1 (drills 11 to 20)
const t1 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t1.json', 'utf8'));

const colMapT1 = {
  11: 'first_name, last_name, gpa',
  12: 'title, author, price',
  13: 'first_name, department, salary',
  14: 'item_name, category, unit_price',
  15: 'customer_name, product_name, quantity',
  16: 'title, artist, duration_seconds',
  17: 'member_name, membership_plan, monthly_fee',
  18: 'movie_title, director, star_rating',
  19: 'flight_id, airline, origin_airport, destination_airport',
  20: 'pet_name, species, age_years, weight_kg'
};

for (let i = 10; i < 20; i++) {
  const d = t1[i];
  const num = d.drillNumber;
  const cols = colMapT1[num];
  if (cols) {
    d.targetQuery = `SELECT ${cols}\nFROM ${d.table};`;
    d.syntaxBlueprint = `SELECT ${cols}\nFROM ${d.table};`;
    d.challengeSlots = [
      { type: 'keyword', value: 'SELECT' },
      { type: 'column', value: cols },
      { type: 'keyword', value: 'FROM' },
      { type: 'table', value: `${d.table};` }
    ];
  }
}
fs.writeFileSync('scratch/syntax_drills_t1.json', JSON.stringify(t1, null, 2), 'utf8');

// 2. Fix T4 (drills 391 to 400)
const t4 = JSON.parse(fs.readFileSync('scratch/syntax_drills_t4.json', 'utf8'));
for (let i = 90; i < 100; i++) {
  const d = t4[i];
  if (d && d.syntaxBlueprint && d.syntaxBlueprint.includes('undefined')) {
    d.syntaxBlueprint = `SELECT column_name, AGG(expr)\nFROM ${d.table}\nWHERE condition\nGROUP BY column_name\nHAVING condition;`;
  }
}
fs.writeFileSync('scratch/syntax_drills_t4.json', JSON.stringify(t4, null, 2), 'utf8');

console.log('Fixed T1 and T4 successfully!');
