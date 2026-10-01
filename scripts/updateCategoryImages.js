const fs = require('fs');
const path = require('path');

const CINEMA_IMAGES = [
  '/images/hero-virtual-production.jpg',
  '/images/soundstage-production.jpg',
  '/images/hero-vfx-breakdown.jpg',
  '/images/ai-neural-editor.jpg',
  '/images/hero-ai-film.jpg',
  '/images/color-grading-suite.jpg',
  '/images/article-unreal.jpg',
  '/images/vfx-space-explosion.jpg',
  '/images/article-adobe.jpg',
  '/images/virtual-stage-setup.jpg',
  '/images/article-netflix.jpg',
  '/images/review-davinci.jpg',
  '/images/article-sora.jpg',
  '/images/review-camera.jpg',
  '/images/breakdown-creature.jpg',
];

const categoryOffsets = {
  hollywood: 0,
  ai: 3,
  vfx: 6,
  tools: 9,
  virtualProduction: 12,
  tech: 1,
};

for (const [cat, offset] of Object.entries(categoryOffsets)) {
  const filePath = path.join(__dirname, '..', 'src', 'lib', 'data', 'categories', `${cat}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');

  let articleIndex = 0;
  // Replace each heroImage: "..." sequentially
  content = content.replace(/heroImage:\s*"[^"]+"/g, () => {
    const assignedImage = CINEMA_IMAGES[(offset + articleIndex) % CINEMA_IMAGES.length];
    articleIndex++;
    return `heroImage: "${assignedImage}"`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${cat}.ts with ${articleIndex} non-repeating cinema images (offset: ${offset})`);
}
