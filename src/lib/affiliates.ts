import { Article } from './types';

export interface AffiliateOffer {
  id: string;
  toolSlug?: string;
  name: string;
  network: string; // e.g. 'Impact.com', 'Topaz Labs Partners', 'Plugin Boutique', 'B&H / Amazon', 'Autodesk Partner Network'
  company: string;
  logo: string;
  badge: string;
  headline: string;
  description: string;
  perk: string;
  ctaText: string;
  url: string;
  categories: string[];
  keywords: string[];
  pricing: string;
  rating: number;
}

export const PARTNER_CONTACT = {
  name: 'Raja Rathna Reddy',
  email: 'vfx@rajarathnareddy.com',
  instagram: 'https://www.instagram.com/raja_rathna_reddy',
  facebook: 'https://www.facebook.com/RAJARATNAREDDY',
  instagramHandle: '@raja_rathna_reddy',
  facebookHandle: '@RAJARATNAREDDY',
};

/**
 * FRAMELINE Master Monetization & Partner Link Registry
 * 
 * Powered by:
 * - Impact.com (Adobe Creative Cloud, Canva, Envato Elements)
 * - Topaz Labs Partners (Topaz Video AI 5 & Photo AI)
 * - Plugin Boutique & Sweetwater (FabFilter, iZotope, Kontakt, Dolby Atmos)
 * - Amazon Associates & B&H Photo Video (Cameras, GPUs, HDR Reference Monitors)
 * - Autodesk Partner Network (Maya, ShotGrid/Shotgun, 3ds Max)
 * - SideFX, Runway & ElevenLabs
 */
export const AFFILIATE_OFFERS: AffiliateOffer[] = [
  // ─── 1. TOPAZ LABS (Upscaling & Neural Restoration) ───
  {
    id: 'topaz-video-ai',
    toolSlug: 'topaz-video-ai',
    network: 'Topaz Labs Partners',
    name: 'Topaz Video AI 5',
    company: 'Topaz Labs',
    logo: '💎',
    badge: '15% STUDIO LICENSE',
    headline: 'Eliminate AI Video Artifacts & Upscale to 8K Cinema Quality',
    description: 'The industry-standard temporal stabilization, de-flickering, and neural upscaling engine used by Hollywood archival labs and generative film directors.',
    perk: 'Includes 12 months of neural model updates & lossless ProRes 4444 XQ export.',
    ctaText: 'Get Studio License →',
    url: 'https://www.topazlabs.com/topaz-video-ai?ref=frameline',
    categories: ['ai', 'tools', 'vfx', 'hollywood'],
    keywords: ['topaz', 'upscaling', 'video ai', 'neural', '4k', '8k', 'de-flicker', 'stabilization', 'restoration'],
    pricing: '$299 One-Time (No Subscriptions)',
    rating: 4.8,
  },

  // ─── 2. AUTODESK MAYA (3D Animation, Rigging & Bifrost) ───
  {
    id: 'autodesk-maya',
    toolSlug: 'autodesk-maya',
    network: 'Autodesk Partner Network',
    name: 'Autodesk Maya 2026',
    company: 'Autodesk',
    logo: '🐉',
    badge: 'HOLLYWOOD 3D BENCHMARK',
    headline: 'The Industry Standard for Feature Animation, Character Rigging & VFX',
    description: 'Power your studio with native OpenUSD workflows, Bifrost procedural oceans and liquid simulation, and production-proven Arnold rendering.',
    perk: 'Eligible for Maya Indie license ($305/yr) or Studio Flex tokens.',
    ctaText: 'Explore Autodesk Maya →',
    url: 'https://www.autodesk.com/products/maya/overview?ref=frameline',
    categories: ['vfx', 'tools', 'virtual-production'],
    keywords: ['maya', 'autodesk', 'rigging', 'animation', 'bifrost', '3d modeling', 'character', 'arnold'],
    pricing: 'Indie $305/yr / Studio Commercial',
    rating: 4.9,
  },

  // ─── 3. AUTODESK SHOTGRID / SHOTGUN (VFX Pipeline Management) ───
  {
    id: 'autodesk-shotgrid',
    toolSlug: 'autodesk-shotgrid',
    network: 'Autodesk Partner Network',
    name: 'Autodesk ShotGrid (Shotgun)',
    company: 'Autodesk',
    logo: '📊',
    badge: 'STUDIO PIPELINE STANDARD',
    headline: 'Production Tracking, Dailies Review & Studio Asset Management',
    description: 'Unite global VFX artists, technical directors, and studio producers with real-time shot scheduling, high-res RV playback, and SGTK pipeline integrations.',
    perk: '30-day enterprise studio pilot with cloud asset security certifications.',
    ctaText: 'Deploy ShotGrid Pipeline →',
    url: 'https://www.autodesk.com/products/shotgrid/overview?ref=frameline',
    categories: ['vfx', 'hollywood', 'tools'],
    keywords: ['shotgun', 'shotgrid', 'pipeline', 'tracking', 'dailies', 'asset management', 'review', 'rv', 'sgtk', 'vfx management'],
    pricing: 'Studio Cloud Seats / Enterprise',
    rating: 4.9,
  },

  // ─── 4. SIDEFX HOUDINI (Procedural Simulation & Pyro/FX) ───
  {
    id: 'sidefx-houdini',
    toolSlug: 'houdini',
    network: 'SideFX Studios',
    name: 'SideFX Houdini 21',
    company: 'SideFX',
    logo: '🌀',
    badge: 'ACADEMY SCI-TECH AWARD',
    headline: 'World Leader in Procedural Destruction, Fluids, Pyro & Solaris Lookdev',
    description: 'Empower your effects department with Karma XPU rendering, Solaris USD stage composition, and real-time GPU Vellum multi-physics.',
    perk: 'Houdini Indie tier gives full commercial rendering privileges for studios under $100k gross.',
    ctaText: 'Get Houdini Studio / Indie →',
    url: 'https://www.sidefx.com?ref=frameline',
    categories: ['vfx', 'tools', 'technology'],
    keywords: ['houdini', 'sidefx', 'procedural', 'pyro', 'fluids', 'destruction', 'simulation', 'solaris', 'karma'],
    pricing: 'Indie $269/yr / Studio Floating',
    rating: 4.9,
  },

  // ─── 5. IMPACT.COM: ADOBE CREATIVE CLOUD (Editing, Motion & Sound) ───
  {
    id: 'adobe-creative-cloud',
    toolSlug: 'adobe-after-effects',
    network: 'Impact.com',
    name: 'Adobe Creative Cloud Pro',
    company: 'Adobe Systems',
    logo: '🔮',
    badge: 'OFFICIAL HOLLYWOOD SUITE',
    headline: 'Premiere Pro, After Effects, Photoshop & Firefly Video Generative Suite',
    description: 'Deploy seamless Team Projects, Topaz-accelerated motion graphics, and frame-accurate editorial pipelines across your post-production facility.',
    perk: 'Includes 100GB cloud storage, Adobe Fonts library, and monthly Generative AI credits.',
    ctaText: 'Claim Adobe Studio Plan →',
    url: 'https://www.adobe.com/creativecloud.html?ref=frameline',
    categories: ['hollywood', 'tools', 'vfx', 'virtual-production'],
    keywords: ['adobe', 'after effects', 'premiere', 'photoshop', 'illustrator', 'firefly', 'motion graphics', 'editing', 'color grading'],
    pricing: 'Special Studio & Individual Pricing',
    rating: 4.7,
  },

  // ─── 6. IMPACT.COM: ENVATO ELEMENTS (Film Assets, Stock & LUTs) ───
  {
    id: 'envato-elements',
    network: 'Impact.com',
    name: 'Envato Elements Unlimited',
    company: 'Envato',
    logo: '🍃',
    badge: 'UNLIMITED DOWNLOADS',
    headline: '16M+ Cinematic Video Templates, Sound FX, LUTs & 3D Assets',
    description: 'Essential library for filmmakers and post houses. Download unlimited DaVinci Resolve title packs, After Effects VFX assets, Foley sound effects, and royalty-free cinema music.',
    perk: 'Lifetime commercial license on all downloaded assets, even if you cancel.',
    ctaText: 'Access Unlimited Assets →',
    url: 'https://elements.envato.com?ref=frameline',
    categories: ['hollywood', 'music', 'vfx', 'tools'],
    keywords: ['envato', 'stock footage', 'sound effects', 'luts', 'video templates', 'assets', 'foley', 'cinema music', 'titles'],
    pricing: '$16.50/mo Unlimited Studio Access',
    rating: 4.8,
  },

  // ─── 7. IMPACT.COM: CANVA PRO (Pitch Decks, Moodboards & Storyboarding) ───
  {
    id: 'canva-pro',
    network: 'Impact.com',
    name: 'Canva Pro for Filmmakers',
    company: 'Canva',
    logo: '🎨',
    badge: 'STUDIO PITCH ESSENTIAL',
    headline: 'Create Hollywood-Caliber Pitch Decks, Lookbooks & Moodboards',
    description: 'Collaborate with co-producers and directors on film treatment decks, character design boards, festival one-sheets, and executive presentations in real-time.',
    perk: 'Free 30-day trial with 100M+ premium stock photos, brand kits, and AI background remover.',
    ctaText: 'Start Free Studio Trial →',
    url: 'https://www.canva.com?ref=frameline',
    categories: ['hollywood', 'ai'],
    keywords: ['canva', 'pitch deck', 'lookbook', 'moodboard', 'treatment', 'presentation', 'storyboard', 'poster', 'one-sheet'],
    pricing: 'Free / $12.99/mo Pro',
    rating: 4.7,
  },

  // ─── 8. PLUGIN BOUTIQUE (Film Scoring, VST/AU & DAWs) ───
  {
    id: 'plugin-boutique-audio',
    network: 'Plugin Boutique / Loopmasters',
    name: 'Plugin Boutique Film Audio Suite',
    company: 'Plugin Boutique',
    logo: '🎹',
    badge: 'UP TO 60% OFF FILM SCORING',
    headline: 'Cinematic Orchestral Libraries, FabFilter Plugins & iZotope Mastering',
    description: 'The definitive catalog for film composers, game sound designers, and re-recording mixers featuring Kontakt libraries, dialogue de-noising tools, and spatial reverb suites.',
    perk: 'Free monthly premium plugin gift with every checkout + virtual cash loyalty rewards.',
    ctaText: 'Browse Studio Audio Deals →',
    url: 'https://www.pluginboutique.com/?a_aid=rajarathnareddy',
    categories: ['music'],
    keywords: ['plugin boutique', 'loopmasters', 'kontakt', 'fabfilter', 'izotope', 'audio', 'music', 'sound', 'daw', 'synth', 'scoring', 'orchestral', 'vst'],
    pricing: 'Deals from $19 / Free Monthly Gifts',
    rating: 4.9,
  },

  // ─── 9. SWEETWATER (Dolby Atmos Hardware & Studio Monitors) ───
  {
    id: 'sweetwater-gear',
    network: 'Sweetwater',
    name: 'Sweetwater Pro Cinema Sound Gear',
    company: 'Sweetwater',
    logo: '🎙️',
    badge: 'AUTHORIZED HOLLYWOOD DEALER',
    headline: 'Dolby Atmos 7.1.4 Monitoring, Genelec Speakers & Universal Audio',
    description: 'Outfit your mixing stage with calibrated reference monitors, Apollo interfaces, Neumann microphones, and hardware DSP processors backed by free 2-year warranties.',
    perk: 'Free 2-year total warranty, fast free shipping, and dedicated audio engineers.',
    ctaText: 'Explore Pro Studio Audio →',
    url: 'https://www.sweetwater.com?ref=frameline',
    categories: ['music', 'technology'],
    keywords: ['sweetwater', 'dolby atmos', 'genelec', 'neumann', 'apollo', 'universal audio', 'microphones', 'monitors', 'audio interface'],
    pricing: 'Authorized Pro Studio Dealer',
    rating: 4.9,
  },

  // ─── 10. AMAZON PRO ASSOCIATES (Cinema Cameras, Monitors & Workstation GPUs) ───
  {
    id: 'bh-amazon-cinema-gear',
    network: 'Amazon Associates',
    name: 'Amazon Pro Cinema & Studio Gear',
    company: 'Amazon Associates',
    logo: '🎥',
    badge: 'VERIFIED CINEMA HARDWARE',
    headline: 'HDR Reference Monitors, RTX 6000 Ada GPUs, Mac Studio & Camera Rigs',
    description: 'Equip your pipeline infrastructure with calibrated HDR OLED reference monitors, dual-GPU compute workstations, anamorphic lenses, cinema wireless rigs, and high-speed NVMe arrays.',
    perk: 'Direct Prime delivery, verified studio seller warranties, and corporate financing.',
    ctaText: 'Shop Amazon Pro Hardware →',
    url: 'https://www.amazon.in/?tag=frameline-21',
    categories: ['technology', 'virtual-production', 'hollywood', 'tools'],
    keywords: ['camera', 'lens', 'arri', 'red', 'sony', 'gpu', 'nvidia', 'rtx', 'workstation', 'monitor', 'asus proart', 'flanders', 'hardware', 'amazon'],
    pricing: 'Pro Studio Hardware Pricing',
    rating: 4.9,
  },

  // ─── 11. HIGGSFIELD AI (Controllable Camera Motion & Video Dynamics) ───
  {
    id: 'higgsfield-ai',
    toolSlug: 'higgsfield',
    network: 'Higgsfield Partner',
    name: 'Higgsfield AI Video',
    company: 'Higgsfield AI',
    logo: '⚡',
    badge: 'CINEMA CAMERA AI',
    headline: 'Control Cinematic Camera Motion, Dynamics & Character Realism',
    description: 'Advanced generative video platform engineered for directors, previs artists, and cinematographers with granular 3D camera controls and realistic human motion.',
    perk: 'Free creative tokens to direct camera motion paths and character action.',
    ctaText: 'Launch Higgsfield AI →',
    url: 'https://higgsfield.ai?fpr=raja-rathna-reddy-5b73d0',
    categories: ['ai', 'hollywood', 'virtual-production', 'tools'],
    keywords: ['higgsfield', 'higgs field', 'camera movement', 'camera control', 'ai video', 'generative video', 'motion', 'previs'],
    pricing: 'Free Credits / Creator Pro',
    rating: 4.8,
  },

  // ─── 12. RUNWAY GEN-4 (Multimodal AI Directing) ───
  {
    id: 'runway-gen4',
    toolSlug: 'runway',
    network: 'Runway AI',
    name: 'Runway Gen-4 Studio',
    company: 'Runway AI Inc.',
    logo: '🤖',
    badge: 'CREATIVE DIRECTOR TIER',
    headline: 'Cinematic Generative Video with Multi-Motion Camera Controls',
    description: 'Empower your pre-production and VFX pipeline with high-fidelity prompt-to-video, spatial camera paths, and director-level temporal framing.',
    perk: 'Free tier available with monthly generative credits & 4K upsampling.',
    ctaText: 'Start Free AI Trial →',
    url: 'https://runwayml.com?ref=frameline',
    categories: ['ai', 'hollywood', 'tools'],
    keywords: ['runway', 'gen-3', 'gen-4', 'ai video', 'generative video', 'camera controls', 'previs', 'ai film'],
    pricing: 'Free / $12/mo Pro',
    rating: 4.5,
  },

  // ─── 13. ELEVENLABS (Voice Acting, Dubbing & ADR) ───
  {
    id: 'elevenlabs-voice',
    network: 'ElevenLabs',
    name: 'ElevenLabs Cinema Voice AI',
    company: 'ElevenLabs',
    logo: '🗣️',
    badge: 'ENTERPRISE VOICE AI',
    headline: 'Hyper-Realistic AI Voice Acting, ADR & Multilingual Dubbing',
    description: 'Generate studio-grade voice performances, automated dialogue replacement (ADR), and sound effects with nuanced emotional inflection for cinema & games.',
    perk: 'Direct voice cloning & low-latency streaming API for pipeline integrations.',
    ctaText: 'Try Free Voice Studio →',
    url: 'https://try.elevenlabs.io/7dnbvl7c40ip',
    categories: ['ai', 'music'],
    keywords: ['elevenlabs', 'voice ai', 'adr', 'dubbing', 'voice acting', 'audio ai', 'speech', 'voice cloning'],
    pricing: 'Free Tier / $5 Starter',
    rating: 4.8,
  },
];

/**
 * Hyper-Smart Matching Engine:
 * Returns the exact, most relevant affiliate / partner advertisement for any given article.
 * 
 * 1. Checks exact tools mentioned (Maya, Shotgun, Houdini, Topaz, After Effects, etc.)
 * 2. Checks tags, keywords, and title matches (cameras, stock footage, music, pitch decks, etc.)
 * 3. Falls back to curated category alignment.
 */
export function getAffiliateOfferForArticle(article: Article): AffiliateOffer {
  const titleLower = article.title.toLowerCase();
  const dekLower = article.dek.toLowerCase();
  const allText = `${titleLower} ${dekLower} ${(article.toolsMentioned || []).join(' ')} ${(article.tags || []).join(' ')} ${(article.seoKeywords || []).join(' ')}`.toLowerCase();

  // 1. Check tools mentioned
  if (article.toolsMentioned && article.toolsMentioned.length > 0) {
    for (const tool of article.toolsMentioned) {
      const match = AFFILIATE_OFFERS.find(o => 
        o.toolSlug?.toLowerCase() === tool.toLowerCase() ||
        o.name.toLowerCase().includes(tool.toLowerCase()) ||
        o.keywords.some(k => k === tool.toLowerCase())
      );
      if (match) return match;
    }
  }

  // 2. High-priority keyword matches across article content
  if (allText.includes('shotgun') || allText.includes('shotgrid') || allText.includes('dailies') || allText.includes('tracking pipeline')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'autodesk-shotgrid')!;
  }

  if (allText.includes('maya') || allText.includes('bifrost') || allText.includes('character rigging') || allText.includes('3d animation')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'autodesk-maya')!;
  }

  if (allText.includes('houdini') || allText.includes('sidefx') || allText.includes('procedural') || allText.includes('destruction') || allText.includes('pyro')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'sidefx-houdini')!;
  }

  if (allText.includes('topaz') || allText.includes('upscal') || allText.includes('super-resolution') || allText.includes('restoration') || allText.includes('de-flicker')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'topaz-video-ai')!;
  }

  if (allText.includes('camera') || allText.includes('lens') || allText.includes('arri') || allText.includes('red ') || allText.includes('sony venice') || allText.includes('gpu') || allText.includes('nvidia') || allText.includes('hardware') || allText.includes('monitor')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'bh-amazon-cinema-gear')!;
  }

  if (allText.includes('stock') || allText.includes('template') || allText.includes('luts') || allText.includes('lut ') || allText.includes('foley') || allText.includes('envato')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'envato-elements')!;
  }

  if (allText.includes('music') || allText.includes('audio') || allText.includes('scoring') || allText.includes('kontakt') || allText.includes('fabfilter') || allText.includes('plugin boutique') || allText.includes('synth') || allText.includes('composer')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'plugin-boutique-audio')!;
  }

  if (allText.includes('dolby atmos') || allText.includes('microphone') || allText.includes('genelec') || allText.includes('apollo') || allText.includes('sweetwater')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'sweetwater-gear')!;
  }

  if (allText.includes('pitch deck') || allText.includes('canva') || allText.includes('lookbook') || allText.includes('moodboard') || allText.includes('treatment')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'canva-pro')!;
  }

  if (allText.includes('voice') || allText.includes('adr') || allText.includes('elevenlabs') || allText.includes('dubbing') || allText.includes('speech')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'elevenlabs-voice')!;
  }

  if (allText.includes('higgsfield') || allText.includes('higgs field') || allText.includes('camera movement') || allText.includes('camera control')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'higgsfield-ai')!;
  }

  if (allText.includes('runway') || allText.includes('gen-3') || allText.includes('gen-4') || allText.includes('generative video') || allText.includes('text-to-video')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'runway-gen4')!;
  }

  if (allText.includes('after effects') || allText.includes('premiere') || allText.includes('photoshop') || allText.includes('adobe')) {
    return AFFILIATE_OFFERS.find(o => o.id === 'adobe-creative-cloud')!;
  }

  // 3. Category Fallback
  const cat = article.category.toLowerCase();
  if (cat === 'music') return AFFILIATE_OFFERS.find(o => o.id === 'plugin-boutique-audio')!;
  if (cat === 'ai') return AFFILIATE_OFFERS.find(o => o.id === 'topaz-video-ai')!;
  if (cat === 'vfx') return AFFILIATE_OFFERS.find(o => o.id === 'autodesk-maya')!;
  if (cat === 'hollywood') return AFFILIATE_OFFERS.find(o => o.id === 'autodesk-shotgrid')!;
  if (cat === 'technology' || cat === 'virtual-production') return AFFILIATE_OFFERS.find(o => o.id === 'bh-amazon-cinema-gear')!;
  if (cat === 'tools') return AFFILIATE_OFFERS.find(o => o.id === 'topaz-video-ai')!;

  return AFFILIATE_OFFERS[0];
}

/**
 * Get affiliate offer matching a specific tool slug
 */
export function getAffiliateOfferForTool(slug: string): AffiliateOffer | undefined {
  return AFFILIATE_OFFERS.find(offer => offer.toolSlug === slug || offer.id === slug);
}
