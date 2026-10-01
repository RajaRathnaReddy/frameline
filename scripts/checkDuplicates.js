const fs = require('fs');
const content = fs.readFileSync('src/lib/data/categories/tech.ts', 'utf8');
const regex = /title:\s*["']([^"']+)["']/g;
let m;
while ((m = regex.exec(content)) !== null) {
  if (m[1].length < 5) {
    console.log('Short title match at index', m.index, ':', m[0]);
    console.log(content.slice(Math.max(0, m.index - 50), m.index + 100));
  }
}
