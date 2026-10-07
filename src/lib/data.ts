import { Article, Author, Tool, AIModel, Category, VFXBreakdown, ProductReview, DispatchTemplate, IndustrySponsor } from './types';
import { rajaRathnaReddy, authors } from './author';
import { SPONSOR_NVIDIA_URL } from './config';

export { rajaRathnaReddy, authors };

import { hollywoodArticles } from './data/categories/hollywood';
import { aiArticles } from './data/categories/ai';
import { vfxArticles } from './data/categories/vfx';
import { toolsArticles } from './data/categories/tools';
import { virtualProductionArticles } from './data/categories/virtualProduction';
import { techArticles } from './data/categories/tech';
import { musicArticles } from './data/categories/music';

// ─── ARTICLES (630 Top Curated Industry Articles across 7 Pillars) ───
export const articles: Article[] = [
  ...hollywoodArticles,
  ...aiArticles,
  ...vfxArticles,
  ...toolsArticles,
  ...virtualProductionArticles,
  ...techArticles,
  ...musicArticles,
];

import toolsData from '@/data/tools.json';
import modelsData from '@/data/models.json';

// ─── TOOLS ───
export const tools: Tool[] = toolsData as Tool[];

// ─── AI MODELS (2026 Professional Benchmark) ───
export const aiModels: AIModel[] = modelsData as AIModel[];

// ─── CATEGORIES ───
export const categories: Category[] = [
  { name: 'Hollywood', slug: 'hollywood', color: 'var(--color-accent-gold)', cssClass: 'cat-hollywood' },
  { name: 'AI in Film', slug: 'ai', color: 'var(--color-accent-cyan)', cssClass: 'cat-ai' },
  { name: 'VFX & Pipeline', slug: 'vfx', color: 'var(--color-accent-violet)', cssClass: 'cat-vfx' },
  { name: 'Film Tools', slug: 'tools', color: 'var(--color-accent-lime)', cssClass: 'cat-tools' },
  { name: 'Virtual Production', slug: 'virtual-production', color: 'var(--color-accent-orange)', cssClass: 'cat-virtual-production' },
  { name: 'Sound & Music', slug: 'music', color: '#EC4899', cssClass: 'cat-music' },
  { name: 'Technology', slug: 'tech', color: 'var(--color-text-primary)', cssClass: 'cat-tech' },
];

// ─── VFX BREAKDOWNS ───
export const vfxBreakdowns: VFXBreakdown[] = [
  {
    id: 'demo-neural-comp',
    slug: 'demo-neural-comp',
    title: 'Demonstration: Multi-Pass Neural Comp Breakdown',
    film: 'Illustration (AI-generated)',
    studio: 'Render Line Pipeline Breakdown',
    supervisor: 'Demonstration Pipeline',
    shotCount: 1,
    camera: 'ACEScg Pipeline',
    aspectRatio: '2.39:1',
    colorPipeline: 'ACEScg / ACES 1.3',
    heroImage: '/images/breakdown/final.webp',
    beforeImage: '/images/breakdown/plate.webp',
    afterImage: '/images/breakdown/final.webp',
    summary: 'Illustration (AI-generated) showing multi-pass environment reconstruction from raw plate to final grade.',
    passes: [
      { name: '01. Raw Plate', description: 'Clean plate illustration before visual effects compositing passes.', image: '/images/breakdown/plate.webp' },
      { name: '02. 3D Tracking & Geometry', description: 'Spatial solve and geometry alignment pass.', image: '/images/breakdown/plate.webp' },
      { name: '03. Matte & Environment', description: 'Procedural environment layers and background atmospheric integration.', image: '/images/breakdown/final.webp' },
      { name: '04. Final Composite', description: 'Atmospheric volume, flare integration, and film-stock emulation.', image: '/images/breakdown/final.webp' },
    ],
    interviewExcerpt: {
      quote: 'This interactive comparison demonstrates multi-pass environment reconstruction from raw plate to final grade.',
      speaker: 'Render Line Technical Editorial',
    },
  },
  {
    id: 'dune-fremen-eyes',
    slug: 'dune-copycat-breakdown',
    title: 'Dune: Part Two — Foundry CopyCat Fremen Blue-Eye Pipeline',
    film: 'Dune: Part Two',
    studio: 'Wētā FX & DNEG',
    supervisor: 'Paul Lambert & Stephen James',
    shotCount: 1000,
    camera: 'ARRI Alexa LF & Mini LF · Ultra Vista Anamorphic',
    aspectRatio: '2.39:1',
    colorPipeline: 'ACEScg Linear OpenEXR',
    heroImage: '/images/breakdown-creature.jpg',
    beforeImage: '/images/breakdown-creature.jpg',
    afterImage: '/images/breakdown-creature.jpg',
    summary: 'How Foundry’s CopyCat machine-learning toolset automated the iconic Fremen blue-within-blue eyes across 1,000 shots, with 40% needing zero cleanup after the AI pass.',
    passes: [
      { name: '01. Training Ground Truth', description: 'Compositors hand-painted 30 anchor frames across diverse lighting angles to train the neural weight file.', image: '/images/breakdown-creature.jpg' },
      { name: '02. CopyCat Inference', description: 'Node-based ML inference evaluated eye coordinates and pupil dilation frame-by-frame in Nuke.', image: '/images/breakdown-creature.jpg' },
      { name: '03. Sclera Luminescence', description: 'Procedural blue iris glow and subsurface eye-socket light spill matched to practical desert sun.', image: '/images/breakdown-creature.jpg' },
      { name: '04. Final Grade Integration', description: 'Colorist-approved ACES grade preserving natural skin tone while accentuating spice addiction.', image: '/images/breakdown-creature.jpg' },
    ],
    interviewExcerpt: {
      quote: 'CopyCat handled about 40% of our Fremen shots with zero human touchup. That allowed our artists to spend their energy on extreme close-ups and chaotic sandstorm lighting.',
      speaker: 'Stephen James, Compositing Supervisor',
    },
  },
];

// ─── REVIEWS ───
export const reviews: ProductReview[] = [
  {
    id: 'davinci-resolve-20',
    slug: 'davinci-resolve-20-review',
    title: 'DaVinci Resolve Studio 20 Review: The New Era of AI Color Science',
    product: 'DaVinci Resolve Studio 20',
    manufacturer: 'Blackmagic Design',
    category: 'Software',
    heroImage: '/images/review-davinci.jpg',
    score: 9.6,
    awardBadge: "RENDERLINE EDITORS' CHOICE",
    verdict: 'DaVinci Resolve 20 cements Blackmagic’s absolute supremacy in post-production. Neural isolation brushes, real-time spatial denoise, and cloud multi-seat editing make it the most powerful suite on the market.',
    pros: [
      'Revolutionary AI Magic Mask 3.0 isolates complex subjects in milliseconds',
      'Unmatched HDR color science and Dolby Vision 5.2 workflow',
      'One-time purchase without monthly subscription hostage model',
      'Blazing fast Metal and CUDA multi-GPU playback optimization',
    ],
    cons: [
      'Fusion node workspace remains intimidating for Premiere editors',
      'Advanced hardware panels require significant studio desk real estate',
    ],
    author: rajaRathnaReddy,
    publishedAt: '2026-09-28T12:00:00Z',
    testedSpecs: {
      'Tested Version': 'v20.0.1 Studio',
      'Test Rig': 'Apple Mac Studio M3 Ultra, 192GB Unified RAM',
      'Storage': 'NVMe 8TB RAID (6,400 MB/s)',
      'Primary Display': 'Sony BVM-HX310 4K HDR Master Monitor',
      'ACES Pipeline': 'ACEScc v1.3 with Rec.2020 PQ',
    },
    price: '$295 (Lifetime License)',
  },
  {
    id: 'arri-alexa-35',
    slug: 'arri-alexa-35-long-term-review',
    title: 'ARRI ALEXA 35 Long-Term Field Review: 17 Stops of Pure Film Soul',
    product: 'ALEXA 35 Cinema Camera',
    manufacturer: 'ARRI Group',
    category: 'Camera Gear',
    heroImage: '/images/review-camera.jpg',
    score: 9.8,
    awardBadge: 'MASTER OF CINEMATOGRAPHY',
    verdict: 'With 17 stops of usable dynamic range and REVEAL Color Science, the ALEXA 35 remains the gold standard for dramatic motion picture photography. Highlights roll off like Kodak 5219 film stock.',
    pros: [
      'Unsurpassed 17-stop dynamic range captures harsh highlights without clipping',
      'REVEAL Color Science delivers the most flattering skin tones in digital cinema',
      'Built like an armored tank with IP51 weather sealing for brutal field shoots',
      'ARRI Textures custom grain profiles embedded in ARRIRAW',
    ],
    cons: [
      'Super35 sensor size requires specific glass (no full-frame 2.39x squeeze natively)',
      'Total package with viewfinder, batteries, and media easily exceeds $90,000',
    ],
    author: rajaRathnaReddy,
    publishedAt: '2026-09-25T15:00:00Z',
    testedSpecs: {
      'Sensor': 'Super 35 format ARRI ALEV 4 CMOS (4608 x 3164)',
      'Dynamic Range': '17 stops measured (1.5 stops more highlight latitude)',
      'Recording Formats': 'ARRIRAW, Apple ProRes 4444 XQ up to 120 fps',
      'Base Sensitivity': 'EI 160 to EI 6400 (Native dual gain EI 800 & 3200)',
      'Lens Mount': 'LPL with PL adapter, LDS-2 / /i Cooke metadata',
    },
    price: '$75,000 (Body Only)',
  },
  {
    id: 'topaz-video-ai-5',
    slug: 'topaz-video-ai-5-review',
    title: 'Topaz Video AI 5.2 Review: Archival Upscaling Without the Artifacts',
    product: 'Topaz Video AI 5.2',
    manufacturer: 'Topaz Labs / Adobe',
    category: 'AI Suite',
    heroImage: '/images/article-adobe.jpg',
    score: 8.8,
    verdict: 'Topaz Video AI 5.2 represents the state-of-the-art in neural super-resolution and frame interpolation. It turns archival 16mm/35mm scans and 1080p footage into pristine, razor-sharp 4K without wax-like faces.',
    pros: [
      'Proteus 4 and Iris models provide remarkable face detail recovery',
      'Apollo frame interpolation produces natural 60fps and 120fps slow-motion',
      'Standalone batch rendering with pause/resume support',
      'No cloud dependency—runs entirely locally on your GPU',
    ],
    cons: [
      'Extremely GPU-intensive (requires RTX 4090 or Apple M-series for swift render)',
      'Occasional hallucinations in high-contrast foliage or typography',
    ],
    author: rajaRathnaReddy,
    publishedAt: '2026-09-20T10:00:00Z',
    testedSpecs: {
      'Version': 'v5.2.3 Commercial',
      'Benchmarked Footage': '35mm anamorphic scan (2K), 16mm archival documentary',
      'Target Output': '4K UHD ProRes 422 HQ',
      'Processing Speed': '18.4 fps on Dual NVIDIA RTX 4090',
    },
    price: '$299 (Annual maintenance)',
  },
];

// ─── BREAKING HEADLINES (for ticker) ───
export const breakingHeadlines: string[] = [
  'Adobe completes acquisition of Topaz Labs on 23 Sep 2026 for about $340M, primarily cash',
  'Google DeepMind partners with A24 in ~$75M multiyear research partnership',
  'Alliance for OpenUSD releases v26.08 standardizing 3D Gaussian Splats in core pipelines',
  'Kling 3.0 Omni & Google Veo 3.1 achieve multi-shot narrative camera consistency',
  'Brompton & ROE Visual unveil full-spectrum RGBW LED panels with Dynamic Calibration',
  'Nikon & RED showcase unified cinema flagship with native Z-mount & C2PA hardware provenance',
  'Autodesk releases Maya 2027.1 on 21 May 2026 adding OpenTimelineIO to Sequencer',
  'Dolby Atmos rolls out Room-Adaptive AI Calibration & neural dialogue separation for post suites',
  'Netflix says about 300 of its titles have used generative AI tools (reported July 2026)',
];

// ─── FINANCIAL METRICS (for Box Office & Business Strip) ───
export const businessStats = [
  {
    value: '~$75M',
    target: 75,
    prefix: '~$',
    suffix: 'M',
    label: 'Google DeepMind / A24',
    change: 'Research Partnership',
    desc: 'Multiyear non-exclusive research partnership with A24 Labs (announced 22 Jun 2026)',
    sourceUrl: 'https://blog.google/innovation-and-ai/models-and-research/google-deepmind/deepmind-a24-research-partnership/',
  },
  {
    value: '~$340M',
    target: 340,
    prefix: '~$',
    suffix: 'M',
    label: 'Adobe / Topaz Labs',
    change: 'Completed Acquisition',
    desc: 'Acquisition of Topaz Labs completed 23 Sep 2026, about $340M, primarily cash',
    sourceUrl: 'https://www.tvtechnology.com/business/mergers-acquisitions/adobe-completes-purchase-of-topaz-labs',
  },
  {
    value: '$587M',
    target: 587,
    prefix: '$',
    suffix: 'M',
    label: 'Netflix / InterPositive',
    change: 'SEC Filing Cash Deal',
    desc: 'Acquisition of Ben Affleck AI venture pipeline (disclosed July 2026 Form 10-Q, deal closed March 2026)',
    sourceUrl: 'https://variety.com/2026/film/news/netflix-paid-587-million-ben-affleck-ai-interpositive-1236815111/',
  },
];

// ─── INDUSTRY OPINIONS (for Opinion & Interviews) ───
export const industryQuotes = [
  {
    quote: 'The project showed what an AI action film could look like, even if the final product wasn’t great.',
    author: 'Variety Editorial Desk',
    role: 'On Higgsfield AI’s Cannes Debut "Hell Grind"',
    image: '/images/author-avatar.jpg',
  },
  {
    quote: 'We have over 300 programs now utilizing machine-learning tools in production. It is no longer an experiment—it is our operating reality.',
    author: 'Netflix Production Technology',
    role: 'Briefing on the $587M InterPositive Acquisition',
    image: '/images/article-netflix.jpg',
  },
  {
    quote: 'The technology is inevitable. Our job is to ensure humans remain the storytellers while letting automation handle the grind.',
    author: 'James Cameron',
    role: 'Filmmaker & Lightstorm Entertainment',
    image: '/images/hero-vfx-breakdown.jpg',
  },
  {
    quote: 'A good VP supervisor needs to understand cinematography, real-time rendering, and LED panel calibration. That remains a unicorn skill set.',
    author: 'Kathleen Grace',
    role: 'Chief AI Officer, Lionsgate',
    image: '/images/hero-virtual-production.jpg',
  },
];

// ─── AI STUDIO DISPATCH TEMPLATES ───
export const dispatchTemplates: DispatchTemplate[] = [
  {
    id: 'lionsgate-runway',
    title: 'Lionsgate Expands Runway Deal: Equity Stake in Generative Cinema',
    topic: 'Lionsgate taking an equity stake in Runway AI and co-developing original franchise IP and episodic series',
    category: 'hollywood',
    leadSnippet: 'Moving past pre-visualization, Lionsgate formalizes an equity partnership with Runway to explore generative episodic storytelling.',
    tags: ['Lionsgate', 'Runway AI', 'Equity Co-Production', 'Franchise IP'],
    keywords: ['Lionsgate equity', 'Runway generative models', 'Hollywood studio AI', 'episodic series'],
    toolsMentioned: ['Runway', 'Topaz Video AI', 'DaVinci Resolve'],
  },
  {
    id: 'ue58-megalights',
    title: 'Unreal Engine 5.8 MegaLights: The Stochastic Direct Lighting Breakthrough',
    topic: 'UE 5.8 MegaLights production readiness for LED volume virtual production stages and Nanite mesh terrain',
    category: 'tools',
    leadSnippet: 'Epic Games unleashes importance-sampled lighting, allowing hundreds of dynamic shadow-casting lights without LED stage frame drops.',
    tags: ['Unreal Engine 5.8', 'MegaLights', 'Virtual Production', 'ICVFX'],
    keywords: ['MegaLights stochastic lighting', 'LED volume performance', 'Nanite mesh terrain', 'Lore VCS'],
    toolsMentioned: ['Unreal Engine', 'Nuke', 'Blender'],
  },
  {
    id: 'kling-vs-luma-hdr',
    title: 'Generative Post-Production: 16-Bit EXR Exports in Kling 4.0 and Luma Ray 3.2',
    topic: 'Pro-grade video AI models supporting ACEScg color science, 16-bit linear EXR outputs, and 10-keyframe direction',
    category: 'ai',
    leadSnippet: 'As Sora departs, post houses embrace Kling 4.0 and Luma Ray 3.2 for linear HDR color grading in Nuke and DaVinci Resolve.',
    tags: ['Kling 4.0', 'Luma Ray 3.2', '16-Bit EXR', 'ACES Pipeline'],
    keywords: ['ACEScg video generation', '16-bit float EXR', 'Kling keyframes', 'Luma Ray continuity'],
    toolsMentioned: ['Runway', 'Topaz Video AI', 'DaVinci Resolve'],
  },
  {
    id: 'james-cameron-vfx',
    title: 'James Cameron on Stability AI: Guarding Human Performers While Slicing Turnarounds',
    topic: 'James Cameron joining Stability AI board of directors, halving VFX timelines, and rejecting synthetic deepfake actors',
    category: 'hollywood',
    leadSnippet: 'The Avatar director advocates mastering generative tools to double VFX throughput while fiercely rejecting synthetic deepfake actors.',
    tags: ['James Cameron', 'Stability AI', 'Avatar VFX', 'Actor Rights'],
    keywords: ['James Cameron AI advisory', 'human storytelling', 'synthetic performers', 'VFX automation'],
    toolsMentioned: ['Houdini', 'Nuke', 'Unreal Engine'],
  },
  {
    id: 'eu-ai-act-provenance',
    title: 'EU Mandates Machine-Readable Provenance on AI Video: The Compliance Scramble',
    topic: 'European Union machine-readable provenance marking deadline and C2PA cryptographic standards for film distributors',
    category: 'tech',
    leadSnippet: 'Distributors face market exclusion unless every AI-generated frame carries cryptographically verifiable C2PA metadata.',
    tags: ['EU AI Act', 'Provenance', 'C2PA Watermarking', 'Streaming Regulation'],
    keywords: ['machine-readable provenance', 'C2PA metadata', 'EU AI compliance', 'streaming distribution'],
    toolsMentioned: ['DaVinci Resolve', 'Topaz Video AI'],
  },
];

// ─── CLIENT-SIDE DYNAMIC ARTICLE PERSISTENCE ───
export const customArticles: Article[] = [];

export function addCustomArticle(article: Article) {
  customArticles.unshift(article);
  if (typeof window !== 'undefined') {
    try {
      const stored = JSON.parse(localStorage.getItem('renderline_custom_articles') || '[]');
      // Deduplicate by slug
      const filtered = stored.filter((a: Article) => a.slug !== article.slug);
      filtered.unshift(article);
      localStorage.setItem('renderline_custom_articles', JSON.stringify(filtered));
      window.dispatchEvent(new Event('renderline_articles_updated'));
    } catch {
      // fallback
    }
  }
}

export function getAllArticles(): Article[] {
  return articles.filter(a => a.status !== 'unverified');
}

// ─── HELPERS ───
export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(a => a.category === category);
}

export function getFeaturedArticle(): Article {
  const all = getAllArticles();
  return all.find(a => a.featured) || all[0];
}

export function getArticleBySlug(slug: string): Article | undefined {
  if (
    slug.includes('toxic') ||
    slug.includes('the-boys') ||
    slug.includes('kalki-brahmastra')
  ) {
    return undefined;
  }
  return getAllArticles().find(a => a.slug === slug);
}

export function getCategoryMeta(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug || t.name.toLowerCase().replace(/\s+/g, '-') === slug);
}

export function getBreakdownBySlug(slug: string): VFXBreakdown | undefined {
  return vfxBreakdowns.find(b => b.slug === slug || b.id === slug);
}

export function getReviewBySlug(slug: string): ProductReview | undefined {
  return reviews.find(r => r.slug === slug || r.id === slug);
}

export function searchAll(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return { articles: [], tools: [], reviews: [], breakdowns: [] };

  const matchedArticles = getAllArticles().filter(
    a => a.title.toLowerCase().includes(q) || a.dek.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q)) || a.body.toLowerCase().includes(q)
  );

  const matchedTools = tools.filter(
    t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
  );

  const matchedReviews = reviews.filter(
    r => r.title.toLowerCase().includes(q) || r.product.toLowerCase().includes(q) || r.verdict.toLowerCase().includes(q)
  );

  const matchedBreakdowns = vfxBreakdowns.filter(
    b => b.title.toLowerCase().includes(q) || b.film.toLowerCase().includes(q) || b.studio.toLowerCase().includes(q)
  );

  return {
    articles: matchedArticles,
    tools: matchedTools,
    reviews: matchedReviews,
    breakdowns: matchedBreakdowns,
  };
}

// ─── INDUSTRY SPONSORS & PARTNERS (Cinema-Grade Discreet Showcases) ───
export const industrySponsors: IndustrySponsor[] = [
  {
    id: 'nvidia-omniverse-cinema',
    name: 'NVIDIA Omniverse™ Enterprise',
    tagline: 'The Digital Backbone for Real-Time Hollywood Virtual Production',
    description: 'Connect multi-GPU clusters to OpenUSD stages with live spectral ray tracing. Powering in-camera visual effects (ICVFX) and neural rendering across premier studio volumes.',
    ctaText: 'Explore Studio Architecture →',
    ctaUrl: SPONSOR_NVIDIA_URL,
    badge: 'INDUSTRY PARTNER SHOWCASE',
    category: 'Virtual Production / Compute',
    logo: '🟢',
    accentColor: '#76B900',
    image: '/images/hero-virtual-production.jpg',
  },
  {
    id: 'blackmagic-cloud-19-5',
    name: 'Blackmagic Cloud 19.5',
    tagline: 'Collaborative Multi-Seat Post-Production & Neural Denoise',
    description: 'Host project libraries globally with zero latency. Sync camera originals directly from set to DaVinci Resolve color suites across London, Los Angeles, and Tokyo simultaneously.',
    ctaText: 'View Color Pipeline →',
    ctaUrl: '/reviews/davinci-resolve-20-review',
    badge: 'FEATURED POST PIPELINE',
    category: 'Post-Production / Color',
    logo: '⚡',
    accentColor: '#E8B44A',
    image: '/images/review-davinci.jpg',
  },
  {
    id: 'disguise-rx-virtual-stage',
    name: 'Disguise rx III Stage Platform',
    tagline: 'Uncompressed SMPTE 2110 IP Video Routing for LED Volumes',
    description: 'Ultra-low-latency real-time video playback and ICVFX stage orchestration. Direct fiber pipeline from Unreal Engine render nodes to high-density LED walls.',
    ctaText: 'Inspect Stage Systems →',
    ctaUrl: '/category/virtual-production',
    badge: 'STAGE HARDWARE PARTNER',
    category: 'In-Camera VFX',
    logo: '💎',
    accentColor: '#3EE6FF',
    image: '/images/article-unreal.jpg',
  },
];

export function getIndustrySponsors(): IndustrySponsor[] {
  return industrySponsors;
}

