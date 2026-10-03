import { Article, Author, Tool, AIModel, Category, VFXBreakdown, ProductReview, DispatchTemplate, IndustrySponsor } from './types';
import { rajaRathnaReddy, authors } from './author';

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

// ─── TOOLS ───
export const tools: Tool[] = [
  {
    name: 'Unreal Engine',
    slug: 'unreal-engine',
    logo: '⚡',
    category: 'Virtual Production',
    pricing: 'Free',
    platforms: ['Windows', 'macOS', 'Linux'],
    version: '5.8 / UE6 Late 2027',
    website: 'https://www.unrealengine.com',
    description: 'Real-time 3D engine powering in-camera VFX (ICVFX), LED volume stages, MegaLights, and the open-source Lore VCS.',
    longDescription: 'Epic Games’ Unreal Engine is the core technology powering modern virtual production stages around the world. UE 5.8 introduces production-ready MegaLights, Movie Render Graph, and Audio Insights, while Unreal Engine 6 targets Early Access in late 2027.',
    features: ['MegaLights Dynamic Emissive System', 'Movie Render Graph ACEScg Pipeline', 'Lore Open-Source VCS (MIT)', 'In-Camera VFX (ICVFX) Multi-User Stage', 'Chaos Cloth & Dataflow Simulation'],
    studioUsers: ['ILM StageCraft', 'Lux Machina', 'Pixomondo', 'Disguise Systems', 'Amazon MGM Studios'],
    rating: 4.9
  },
  {
    name: 'Topaz Video AI',
    slug: 'topaz-video-ai',
    logo: '💎',
    category: 'Upscaling',
    pricing: 'Paid',
    platforms: ['Windows', 'macOS'],
    version: '5.2 (Acquired for $340M)',
    website: 'https://www.topazlabs.com',
    description: 'AI video enhancement, temporal de-flickering, and Neurostream local consumer device inference.',
    longDescription: 'Acquired by Adobe for $340M, Topaz Video AI bridges the critical quality gap between synthetic generative video and professional 4K cinematography. Features Neurostream local device inference and temporal consistency algorithms.',
    features: ['Neurostream Local Inference Architecture', 'Proteus & Iris Neural Enhancement', 'Temporal Flickering Elimination', 'Lossless ProRes 4444 XQ Output', 'Apollo High-Frame-Rate Slow-Motion'],
    studioUsers: ['Adobe Systems', 'The Criterion Collection Partners', 'Hollywood Finishing Houses', 'Archival Film Labs'],
    rating: 4.8
  },
  {
    name: 'Nuke',
    slug: 'nuke',
    logo: '🎯',
    category: 'Compositing',
    pricing: 'Paid',
    platforms: ['Windows', 'macOS', 'Linux'],
    version: '15.1 (CopyCat ML)',
    website: 'https://www.foundry.com/nuke',
    description: 'Industry-standard node-based compositing software featuring CopyCat machine learning used on Dune: Part Two.',
    longDescription: 'Foundry Nuke is the definitive node-based digital compositing application relied upon by the world’s top studios. Powered 1,000 blue-eye shots on Dune: Part Two with its native CopyCat neural network toolset.',
    features: ['CopyCat Neural Network ML Training', 'Deep Image Compositing Pipeline', '3D Scene Graph & OpenUSD', 'Planar Tracking & Lens Distortion', 'ACES 1.3 Native Color Management'],
    studioUsers: ['Industrial Light & Magic', 'Wētā FX', 'Framestore', 'DNEG', 'Sony Pictures Imageworks'],
    rating: 4.9
  },
  {
    name: 'Blender',
    slug: 'blender',
    logo: '🟠',
    category: '3D',
    pricing: 'Free',
    platforms: ['Windows', 'macOS', 'Linux'],
    version: '5.2 LTS',
    website: 'https://www.blender.org',
    description: 'Open-source 3D creation suite with newly announced cloth physics in Geometry Nodes and major Cycles upgrades.',
    longDescription: 'Blender 5.2 LTS brings breakthrough cloth physics directly into procedural Geometry Nodes, alongside massive performance updates to Cycles rendering, making it a formidable alternative to proprietary packages.',
    features: ['Geometry Nodes Cloth Physics Solver', 'Cycles Next GPU Path Tracing', 'Grease Pencil 3.0 Real-Time 2D/3D', 'OpenUSD Stage Composition', 'Full Python 3.12 Automation API'],
    studioUsers: ['Tangential Animation', 'Ubisoft Film', 'Goodbye Kansas Studios', 'Khara Studio'],
    rating: 4.7
  },
  {
    name: 'DaVinci Resolve',
    slug: 'davinci-resolve',
    logo: '🎬',
    category: 'Color',
    pricing: 'Free',
    platforms: ['Windows', 'macOS', 'Linux'],
    version: '20.0 Studio',
    website: 'https://www.blackmagicdesign.com',
    description: 'Premier Hollywood color grading, editing, Fusion VFX, and Fairlight audio post-production suite.',
    longDescription: 'Blackmagic Design DaVinci Resolve 20 Studio combines neural isolation brushes, HDR Dolby Vision 5.2 mastering, Fusion node VFX, and Cloud Multi-Seat Collaboration.',
    features: ['DaVinci Neural Engine AI Masking', 'Fusion Node-Based Compositing', 'HDR Color Wheels & ACEScc 1.3', 'Cloud Timeline Collaboration', 'Fairlight 2000-Track Audio Engine'],
    studioUsers: ['Company 3', 'Harbor Picture Company', 'Fotokem', 'Light Iron', 'Warner Bros. Post'],
    rating: 4.8
  },
  {
    name: 'Houdini',
    slug: 'houdini',
    logo: '🌀',
    category: '3D',
    pricing: 'Paid',
    platforms: ['Windows', 'macOS', 'Linux'],
    version: '21.0',
    website: 'https://www.sidefx.com',
    description: 'Procedural 3D animation, physics simulation, and effects software dominating film pyro, fluid, and destruction.',
    longDescription: 'SideFX Houdini combines procedural node-based workflows with industry-leading simulation dynamics. From massive pyro explosions and oceanic water dynamics to complex crowd simulation.',
    features: ['Solaris USD-based Lookdev', 'Karma XPU Production Renderer', 'KineFX Rigging & Motion Editing', 'Vellum Multi-Physics Solver', 'Pyro & FLIP Fluid Dynamics'],
    studioUsers: ['Scanline VFX', 'ILM', 'Method Studios', 'Rodeo FX', 'Pixar'],
    rating: 4.9
  },
  {
    name: 'Runway',
    slug: 'runway',
    logo: '🤖',
    category: 'AI Video',
    pricing: 'Paid',
    platforms: ['Web'],
    version: 'Gen-4 ($315M Raised)',
    website: 'https://runwayml.com',
    description: 'Multimodal AI video generation platform with director controls, newly backed by $315M in funding.',
    longDescription: 'Runway has raised $315M to expand its Gen-4 multimodal video architecture, offering director-level camera controls, multi-character consistency, and cinematic framing.',
    features: ['Cinematic Camera Movement Controls', 'Multi-Motion Brush Spatial Masking', 'Temporal Consistency Stabilization', 'Prompt-to-Video & Image-to-Video', 'Enterprise API Pipeline Access'],
    studioUsers: ['A24', 'Lionsgate Creative Lab', 'Commercial Agencies', 'Boutique Previs Studios'],
    rating: 4.4
  },
  {
    name: 'Adobe After Effects',
    slug: 'adobe-after-effects',
    logo: '🔮',
    category: 'Compositing',
    pricing: 'Paid',
    platforms: ['Windows', 'macOS'],
    version: '2027',
    website: 'https://www.adobe.com/aftereffects',
    description: 'Industry-standard motion graphics, title design, and visual effects compositing integrating Topaz Neurostream.',
    longDescription: 'Adobe After Effects is the essential motion design and visual effects software, now poised to receive Topaz Labs’ temporal consistency algorithms and Neurostream local inference.',
    features: ['Advanced 3D Workspace & GLTF Importer', 'Roto Brush 3 AI Auto-Segmentation', 'Content-Aware Fill for Video', 'Essential Graphics Shared MOGRTs', 'Hardware-Accelerated Ray Tracing'],
    studioUsers: ['Prologue Films', 'The Mill', 'Imaginary Forces', 'Elastic', 'Buck'],
    rating: 4.5
  },
  {
    name: 'Autodesk Maya',
    slug: 'autodesk-maya',
    logo: '🐉',
    category: '3D',
    pricing: 'Paid',
    platforms: ['Windows', 'macOS', 'Linux'],
    version: '2026.2 (Bifrost & USD)',
    website: 'https://www.autodesk.com/products/maya/overview',
    description: 'Industry-standard 3D animation, rigging, character modeling, and simulation platform powering Hollywood feature animation.',
    longDescription: 'Autodesk Maya is the cornerstone 3D animation software relied on by leading VFX houses and animation studios worldwide, featuring native USD workflows and Bifrost visual programming.',
    features: ['Bifrost Procedural Ocean & Pyro Simulation', 'USD Maya Integration & Lookdev', 'Character Rigging & Retargeting Matrix', 'Arnold High-Fidelity Renderer', 'Python 3 / MEL Pipeline Scripting'],
    studioUsers: ['Walt Disney Animation', 'Sony Pictures Imageworks', 'Framestore', 'MPC Film', 'DreamWorks'],
    rating: 4.9
  },
  {
    name: 'Autodesk ShotGrid',
    slug: 'autodesk-shotgrid',
    logo: '📊',
    category: 'Pipeline Management',
    pricing: 'Paid',
    platforms: ['Web', 'Windows', 'macOS', 'Linux'],
    version: 'Studio Cloud Edition',
    website: 'https://www.autodesk.com/products/shotgrid/overview',
    description: 'Production tracking, review, and asset management software powering collaborative pipelines across global VFX facilities.',
    longDescription: 'Autodesk ShotGrid (formerly Shotgun Software) provides production management, review, and pipeline integration for creative studios worldwide, connecting artists, supervisors, and producers in real-time.',
    features: ['Real-Time Production Tracking & Scheduling', 'High-Resolution Dailies & RV Playback', 'Toolkit (SGTK) Pipeline Integration', 'Asset Lifecycle Tracking & Versioning', 'Multi-Site Security & Cloud Access Control'],
    studioUsers: ['Industrial Light & Magic', 'Wētā FX', 'DNEG', 'The Mill', 'Luma Pictures'],
    rating: 4.9
  },
  {
    name: 'Higgsfield AI Video',
    slug: 'higgsfield',
    logo: '⚡',
    category: 'AI Video',
    pricing: 'Paid',
    platforms: ['Web', 'iOS', 'API'],
    version: '2026.2',
    website: 'https://higgsfield.ai?fpr=raja-rathna-reddy-5b73d0',
    description: 'Generative video platform with granular 3D camera trajectory controls and photorealistic human motion.',
    longDescription: 'Higgsfield AI is the breakout generative video platform engineered for directors, previs artists, and cinematographers, offering granular 3D camera trajectory controls, realistic human motion kinematics, and custom scene direction.',
    features: ['Granular 3D Camera Trajectory Controls', 'Cinematic Pan, Tilt, Dolly & Boom Moves', 'Photorealistic Human Motion Synthesis', 'Actor Consistency Across Shots', 'Pipeline API & Batch Ingest'],
    studioUsers: ['Boutique Previs Studios', 'Independent Filmmakers', 'Commercial Production Labs', 'Festival Creators'],
    rating: 4.9
  },
  {
    name: 'ElevenLabs Cinema Voice AI',
    slug: 'elevenlabs',
    logo: '🗣️',
    category: 'Voice AI',
    pricing: 'Paid',
    platforms: ['Web', 'API', 'Python SDK'],
    version: 'v3 Enterprise',
    website: 'https://try.elevenlabs.io/7dnbvl7c40ip',
    description: 'Hyper-realistic AI voice acting, automated dialogue replacement (ADR), and sound effects generation.',
    longDescription: 'ElevenLabs delivers studio-grade voice performances, automated dialogue replacement (ADR), and synthetic Foley sound effects with nuanced emotional control for cinema, gaming, and commercial localization.',
    features: ['Zero-Shot & High-Fidelity Voice Cloning', 'Emotional & Cadence Inflection Sliders', 'Automated Dialogue Replacement (ADR)', 'Studio-Grade Synthetic Foley & SFX', 'Low-Latency Streaming Speech API'],
    studioUsers: ['Localization Houses', 'Game Audio Studios', 'Independent Post Bays', 'Documentary Producers'],
    rating: 4.8
  },
];

// ─── AI MODELS (2026 Professional Benchmark) ───
export const aiModels: AIModel[] = [
  { name: 'Google Veo 3.1', company: 'Google DeepMind (Gemini API)', maxLength: '90s', resolution: '4K', audioNative: true, apiStatus: 'live', updatedAt: '2026-10-01' },
  { name: 'Kling 4.0', company: 'Kuaishou (Early Studio Access)', maxLength: '30s (10 Keyframes)', resolution: '4K', audioNative: true, apiStatus: 'beta', updatedAt: '2026-09-30' },
  { name: 'Luma Ray 3.2', company: 'Luma AI (16-bit EXR Export)', maxLength: '60s', resolution: '4K', audioNative: true, apiStatus: 'live', updatedAt: '2026-09-28' },
  { name: 'Adobe Firefly Video 2.0', company: 'Adobe (Infinite Boards)', maxLength: '60s', resolution: '4K', audioNative: true, apiStatus: 'live', updatedAt: '2026-09-25' },
  { name: 'Runway Gen-3 Alpha Turbo', company: 'Runway / Lionsgate Partner', maxLength: '90s', resolution: '4K', audioNative: true, apiStatus: 'live', updatedAt: '2026-09-24' },
  { name: 'ByteDance Seedance 2.0', company: 'ByteDance (Strict Guardrails)', maxLength: '120s', resolution: '4K', audioNative: true, apiStatus: 'live', updatedAt: '2026-09-20' },
  { name: 'Higgsfield AI Engine', company: 'Higgsfield (Hell Grind Cannes)', maxLength: '95m (Compute)', resolution: '1080p', audioNative: true, apiStatus: 'live', updatedAt: '2026-09-18' },
  { name: 'OpenAI Sora', company: 'OpenAI (API Discontinued)', maxLength: '60s', resolution: '1080p', audioNative: false, apiStatus: 'sunset', updatedAt: '2026-09-24' },
];

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
    id: 'dog-stars-wasteland',
    slug: 'outpost-vfx-dog-stars',
    title: 'The Dog Stars: Outpost VFX Builds Ridley Scott’s Arid Wasteland',
    film: 'The Dog Stars (2026)',
    studio: 'Outpost VFX',
    supervisor: 'Sebastien Raets',
    shotCount: 1240,
    camera: 'ARRI Alexa 35 · Cooke Anamorphic /i Full Frame Plus',
    aspectRatio: '2.39:1',
    colorPipeline: 'ACEScg / ACES 1.3',
    heroImage: '/images/hero-vfx-breakdown.jpg',
    beforeImage: '/images/hero-virtual-production.jpg',
    afterImage: '/images/hero-vfx-breakdown.jpg',
    summary: 'VFX Supervisor Sebastien Raets breaks down the 1,200+ shots Outpost VFX created for Ridley Scott’s The Dog Stars, blending LIDAR drone scans and procedural weathering in Houdini.',
    passes: [
      { name: '01. Raw Plate', description: 'Clean physical backlot footage captured in Calgary under overcast daylight.', image: '/images/hero-virtual-production.jpg' },
      { name: '02. 3D Tracking & LIDAR', description: 'Centimeter-accurate camera solve and terrain registration using Leica Geosystems LIDAR.', image: '/images/breakdown-creature.jpg' },
      { name: '03. Environment Extension', description: 'Procedural building decay, abandoned highways, and overgrown vegetation generated in Houdini.', image: '/images/article-unreal.jpg' },
      { name: '04. Atmospheric Comp', description: 'Dust volume passes, anamorphic optical flares, heat distortion, and final film-stock emulation.', image: '/images/hero-vfx-breakdown.jpg' },
    ],
    interviewExcerpt: {
      quote: 'We spent four months calibrating weathering algorithms. In an arid post-apocalyptic environment, concrete does not rot like wood—it exfoliates under intense UV.',
      speaker: 'Sebastien Raets, VFX Supervisor',
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
  'Google DeepMind partners with A24 in $75M research alliance to launch A24 Labs',
  'Alliance for OpenUSD releases v26.08 standardizing 3D Gaussian Splats in core pipelines',
  'Kling 3.0 Omni & Google Veo 3.1 achieve multi-shot narrative camera consistency',
  'Brompton & ROE Visual unveil full-spectrum RGBW LED panels with Dynamic Calibration',
  'Nikon & RED showcase unified cinema flagship with native Z-mount & C2PA hardware provenance',
  'Adobe Firefly Video 2.0 embeds multi-model generative AI directly into Premiere Pro',
  'Dolby Atmos rolls out Room-Adaptive AI Calibration & neural dialogue separation for post suites',
  'Netflix confirms 300+ active productions using InterPositive AI conforming pipelines',
];

// ─── FINANCIAL METRICS (for Box Office & Business Strip) ───
export const businessStats = [
  { value: '$75M', target: 75, prefix: '$', suffix: 'M', label: 'Google DeepMind / A24', change: 'A24 Labs Alliance', desc: 'Bespoke artist-first studio AI incubator' },
  { value: '$587M', target: 587, prefix: '$', suffix: 'M', label: 'Netflix / Ben Affleck Deal', change: '+300 Productions', desc: 'InterPositive AI venture acquisition' },
  { value: '$2.3B', target: 2.3, prefix: '$', suffix: 'B', label: 'AI Sound & Stem Market', change: '2026 Forecast', desc: 'Neural stem separation and spatial audio suites' },
  { value: '$340M', target: 340, prefix: '$', suffix: 'M', label: 'Adobe / Topaz Labs', change: 'All-Cash Deal', desc: 'Neurostream local device inference buyout' },
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
      const stored = JSON.parse(localStorage.getItem('renderline_custom_articles') || localStorage.getItem('frameline_custom_articles') || '[]');
      // Deduplicate by slug
      const filtered = stored.filter((a: Article) => a.slug !== article.slug);
      filtered.unshift(article);
      localStorage.setItem('renderline_custom_articles', JSON.stringify(filtered));
      window.dispatchEvent(new Event('renderline_articles_updated'));
      window.dispatchEvent(new Event('frameline_articles_updated'));
    } catch {
      // fallback
    }
  }
}

export function getAllArticles(): Article[] {
  return articles;
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
    ctaUrl: '/tools/unreal-engine',
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

