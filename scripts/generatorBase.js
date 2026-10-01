const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'src', 'lib', 'data', 'categories');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Public images to cycle through realistically
const imagePool = [
  '/images/hero-virtual-production.jpg',
  '/images/hero-vfx-breakdown.jpg',
  '/images/hero-ai-film.jpg',
  '/images/article-unreal.jpg',
  '/images/article-adobe.jpg',
  '/images/article-netflix.jpg',
  '/images/article-sora.jpg',
  '/images/review-davinci.jpg',
  '/images/review-camera.jpg',
  '/images/breakdown-creature.jpg',
];

function getImage(idx) {
  return imagePool[idx % imagePool.length];
}

function cleanSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Function to generate full TS file content for a category
function buildCategoryFile(categorySlug, categoryName, stories) {
  let output = `import { Article } from '../../types';\nimport { rajaRathnaReddy } from '../../author';\n\n`;
  output += `export const ${categorySlug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Articles: Article[] = [\n`;

  stories.forEach((s, i) => {
    const slug = cleanSlug(s.title);
    const heroImage = s.heroImage || getImage(i);
    const readTime = s.readTime || (6 + (i % 6));
    const publishedDay = String((i % 28) + 1).padStart(2, '0');
    const publishedAt = `2026-09-${publishedDay}T${String(8 + (i % 12)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}:00Z`;
    const featured = i === 0;
    const breaking = i < 3;
    const tagsJson = JSON.stringify(s.tags);
    const toolsJson = JSON.stringify(s.toolsMentioned || ['Houdini', 'OpenUSD', 'Unreal Engine']);
    const seoKwJson = JSON.stringify(s.tags.map(t => t.toLowerCase()));

    // Escape backticks in body text
    const escapedBody = s.body.replace(/`/g, '\\`').replace(/\${/g, '\\${');

    output += `  {\n`;
    output += `    title: ${JSON.stringify(s.title)},\n`;
    output += `    slug: ${JSON.stringify(slug)},\n`;
    output += `    dek: ${JSON.stringify(s.dek)},\n`;
    output += `    heroImage: ${JSON.stringify(heroImage)},\n`;
    output += `    category: ${JSON.stringify(categorySlug)},\n`;
    output += `    tags: ${tagsJson},\n`;
    output += `    author: rajaRathnaReddy,\n`;
    output += `    publishedAt: ${JSON.stringify(publishedAt)},\n`;
    output += `    readTime: ${readTime},\n`;
    output += `    featured: ${featured},\n`;
    output += `    breaking: ${breaking},\n`;
    output += `    toolsMentioned: ${toolsJson},\n`;
    output += `    seoKeywords: ${seoKwJson},\n`;
    output += `    body: \`${escapedBody}\`,\n`;
    output += `    seo: {\n`;
    output += `      title: ${JSON.stringify(s.title + ' | FRAMELINE')},\n`;
    output += `      desc: ${JSON.stringify(s.dek)},\n`;
    output += `      ogImage: ${JSON.stringify(heroImage)},\n`;
    output += `    },\n`;
    output += `  },\n`;
  });

  output += `];\n`;
  return output;
}

module.exports = {
  buildCategoryFile,
  targetDir,
  cleanSlug,
  getImage
};
