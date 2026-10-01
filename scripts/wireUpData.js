const fs = require('fs');
const path = require('path');

const dataTsPath = path.join(__dirname, '..', 'src', 'lib', 'data.ts');
const content = fs.readFileSync(dataTsPath, 'utf8');

const toolsIndex = content.indexOf('// ─── TOOLS ───');
if (toolsIndex === -1) {
  console.error('Could not find tools marker in data.ts');
  process.exit(1);
}

const remainder = content.slice(toolsIndex);

const newHeader = `import { Article, Author, Tool, AIModel, Category, VFXBreakdown, ProductReview, DispatchTemplate, IndustrySponsor } from './types';
import { rajaRathnaReddy, authors } from './author';

export { rajaRathnaReddy, authors };

import { hollywoodArticles } from './data/categories/hollywood';
import { aiArticles } from './data/categories/ai';
import { vfxArticles } from './data/categories/vfx';
import { toolsArticles } from './data/categories/tools';
import { virtualProductionArticles } from './data/categories/virtualProduction';
import { techArticles } from './data/categories/tech';

// ─── ARTICLES (600 Top Non-Repeating Curated Articles across 6 Categories) ───
export const articles: Article[] = [
  ...hollywoodArticles,
  ...aiArticles,
  ...vfxArticles,
  ...toolsArticles,
  ...virtualProductionArticles,
  ...techArticles,
];

`;

const updated = newHeader + remainder;
fs.writeFileSync(dataTsPath, updated, 'utf8');
console.log('Successfully updated data.ts with modular category articles!');
