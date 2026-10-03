const fs = require('fs');
const path = require('path');

const categories = ['hollywood', 'ai', 'vfx', 'tools', 'virtualProduction', 'tech'];

const allTitles = new Map();
const allSlugs = new Map();
let totalArticles = 0;
let errors = 0;

for (const cat of categories) {
  const filePath = path.join(__dirname, '..', 'src', 'lib', 'data', 'categories', `${cat}.ts`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract all titles (properly matching matching quotes)
  const titleMatches = [...content.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
  // Extract all slugs
  const slugMatches = [...content.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
  // Check authors
  const authorMatches = [...content.matchAll(/author:\s*([a-zA-Z0-9_]+)/g)].map(m => m[1]);

  console.log(`📁 Category [${cat}]: ${slugMatches.length} articles found`);
  totalArticles += slugMatches.length;

  // Check titles
  titleMatches.forEach((title, idx) => {
    // skip seo titles if matched
    if (title.endsWith('| RENDERLINE') || title.endsWith('| RENDERLINE')) return;
    if (allTitles.has(title)) {
      console.warn(`⚠️ Duplicate title found in ${cat}: "${title}" (originally in ${allTitles.get(title)})`);
      errors++;
    } else {
      allTitles.set(title, cat);
    }
  });

  // Check slugs
  slugMatches.forEach((slug) => {
    if (allSlugs.has(slug)) {
      console.warn(`⚠️ Duplicate slug found in ${cat}: "${slug}" (originally in ${allSlugs.get(slug)})`);
      errors++;
    } else {
      allSlugs.set(slug, cat);
    }
  });

  // Verify author
  authorMatches.forEach((author) => {
    if (author !== 'rajaRathnaReddy') {
      console.error(`❌ Wrong author in ${cat}: ${author}`);
      errors++;
    }
  });
}

console.log('----------------------------------------------------');
console.log(`Total articles analyzed: ${totalArticles}`);
console.log(`Unique titles: ${allTitles.size}`);
console.log(`Unique slugs: ${allSlugs.size}`);
console.log(`Total discrepancies / duplicates: ${errors}`);
console.log('----------------------------------------------------');
