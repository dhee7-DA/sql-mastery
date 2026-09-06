const fs = require('fs');

// Read mcqs_vault_500.js
const filePath = 'visualizer/mcqs_vault_500.js';
let content = fs.readFileSync(filePath, 'utf8');

// Extract the array
const jsonStart = content.indexOf('[');
const jsonEnd = content.lastIndexOf(']');

if (jsonStart === -1 || jsonEnd === -1) {
  console.error('Could not find JSON array in mcqs_vault_500.js');
  process.exit(1);
}

const prefix = content.slice(0, jsonStart);
const suffix = content.slice(jsonEnd + 1);
const jsonString = content.slice(jsonStart, jsonEnd + 1);

const mcqs = JSON.parse(jsonString);
console.log(`Loaded ${mcqs.length} MCQs.`);

// Check current distribution
const initialCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };
mcqs.forEach(m => {
  initialCounts[m.correctIndex] = (initialCounts[m.correctIndex] || 0) + 1;
});
console.log('Initial distribution:', initialCounts);

// Simple deterministic PRNG based on question index and id
function getTargetIndex(idx, qid) {
  let hash = 0;
  for (let i = 0; i < qid.length; i++) {
    hash = (hash * 31 + qid.charCodeAt(i)) >>> 0;
  }
  // Rotate smoothly across 0, 1, 2, 3 with pseudo-random offset
  return (idx + (hash % 4)) % 4;
}

// Deterministic pseudo-random permutation
function pseudoRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rng = pseudoRandom(42981);
const finalCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };

mcqs.forEach((mcq, qIdx) => {
  const correctText = mcq.options[mcq.correctIndex];
  
  // Fisher-Yates shuffle
  const opts = [...mcq.options];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  
  mcq.options = opts;
  mcq.correctIndex = opts.indexOf(correctText);
  finalCounts[mcq.correctIndex] = (finalCounts[mcq.correctIndex] || 0) + 1;
});

console.log('Final pseudo-random distribution:', finalCounts);

// Write back formatted
const newContent = prefix + JSON.stringify(mcqs, null, 2) + suffix;
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully updated mcqs_vault_500.js!');
