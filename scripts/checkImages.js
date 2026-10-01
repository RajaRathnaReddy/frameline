const fs = require('fs');
const catFiles = ['hollywood', 'ai', 'vfx', 'tools', 'virtualProduction', 'tech'];

catFiles.forEach(cat => {
  const content = fs.readFileSync('src/lib/data/categories/' + cat + '.ts', 'utf8');
  const heroMatches = [...content.matchAll(/heroImage:\s*"([^"]+)"/g)].map(m => m[1]);
  console.log(`\n=== Category: ${cat} (Total heroImages: ${heroMatches.length}) ===`);
  const counts = {};
  heroMatches.forEach((img, idx) => {
    counts[img] = (counts[img] || 0) + 1;
    if (idx < 5) console.log(`  Article ${idx + 1}: ${img}`);
  });
  console.log('Distribution:', counts);
});
