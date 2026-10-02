export interface AffiliateOffer {
  id: string;
  toolSlug?: string;
  name: string;
  company: string;
  logo: string;
  badge: string;
  headline: string;
  description: string;
  perk: string;
  ctaText: string;
  url: string;
  categories: string[]; // e.g. ['ai', 'tools', 'vfx', 'music', 'hollywood', 'virtual-production', 'technology']
  pricing: string;
  rating: number;
}

/**
 * FRAMELINE Centralized Monetization & Affiliate Link Registry
 * 
 * To activate or customize your partner links:
 * Simply replace any 'url' field below with your direct affiliate tracking URL from:
 * - Topaz Labs Partners (topazlabs.com/affiliates)
 * - Adobe Impact.com Program
 * - Plugin Boutique (pluginboutique.com)
 * - Runway ML / ElevenLabs Creators
 * - Boris FX / Sweetwater / B&H Photo Video
 */
export const AFFILIATE_OFFERS: AffiliateOffer[] = [
  {
    id: 'topaz-video-ai',
    toolSlug: 'topaz-video-ai',
    name: 'Topaz Video AI 5',
    company: 'Topaz Labs',
    logo: '💎',
    badge: '15% STUDIO LICENSE',
    headline: 'Eliminate AI Video Artifacts & Upscale to 8K Cinema Quality',
    description: 'The industry-standard temporal stabilization and neural upscaling engine used by Hollywood archival labs and generative film directors.',
    perk: 'Includes 12 months of neural model updates & lossless ProRes 4444 XQ output.',
    ctaText: 'Get Studio License →',
    url: 'https://www.topazlabs.com/topaz-video-ai?ref=frameline',
    categories: ['ai', 'tools', 'vfx', 'hollywood'],
    pricing: '$299 One-Time (No Subscriptions)',
    rating: 4.8,
  },
  {
    id: 'runway-gen4',
    toolSlug: 'runway',
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
    pricing: 'Free / $12/mo Pro',
    rating: 4.5,
  },
  {
    id: 'boris-fx-mocha-pro',
    toolSlug: 'nuke',
    name: 'Boris FX Mocha Pro 2026',
    company: 'Boris FX',
    logo: '🎯',
    badge: 'ACADEMY AWARD WINNING',
    headline: 'World’s Most Powerful Planar Tracking & Object Removal Suite',
    description: 'Essential VFX finishing tool for matchmoving, rotoscoping, lens calibration, and PowerMesh sub-surface tracking across Nuke, After Effects, and Premiere.',
    perk: 'Compatible with all major DAWs and compositing hosts on Win/Mac/Linux.',
    ctaText: 'Explore Boris FX Suite →',
    url: 'https://borisfx.com/products/mocha-pro/?ref=frameline',
    categories: ['vfx', 'tools'],
    pricing: 'Perpetual or Annual Studio License',
    rating: 4.9,
  },
  {
    id: 'adobe-creative-cloud',
    toolSlug: 'adobe-after-effects',
    name: 'Adobe Creative Cloud Pro',
    company: 'Adobe Systems',
    logo: '🔮',
    badge: 'OFFICIAL HOLLYWOOD DEAL',
    headline: 'The Complete Film Editing, VFX & Sound Post-Production Bundle',
    description: 'Access Premiere Pro, After Effects, Audition, Photoshop, and Firefly AI video generative tools with seamless Team Projects collaboration.',
    perk: 'Includes 100GB cloud storage, Adobe Fonts, and monthly Generative AI credits.',
    ctaText: 'Claim Adobe Studio Plan →',
    url: 'https://www.adobe.com/creativecloud.html?ref=frameline',
    categories: ['hollywood', 'tools', 'vfx', 'virtual-production'],
    pricing: 'Special Studio & Individual Pricing',
    rating: 4.6,
  },
  {
    id: 'plugin-boutique-audio',
    name: 'Plugin Boutique Film Audio Suite',
    company: 'Plugin Boutique',
    logo: '🎹',
    badge: 'UP TO 60% OFF FILM SCORING',
    headline: 'Cinematic Virtual Instruments, Reverbs & Dolby Atmos Mastering',
    description: 'The premier catalog for film composers, game sound designers, and post-production re-recording mixers featuring FabFilter, iZotope, and Spitfire Audio.',
    perk: 'Free monthly plugin gift with every purchase + loyalty virtual cash rewards.',
    ctaText: 'Browse Studio Audio Deals →',
    url: 'https://www.pluginboutique.com?ref=frameline',
    categories: ['music'],
    pricing: 'Deals from $19 / Free Monthly Gifts',
    rating: 4.9,
  },
  {
    id: 'elevenlabs-voice',
    name: 'ElevenLabs Cinema Audio AI',
    company: 'ElevenLabs',
    logo: '🎙️',
    badge: 'ENTERPRISE VOICE AI',
    headline: 'Hyper-Realistic AI Voice Acting, ADR & Multilingual Dubbing',
    description: 'Generate studio-grade voice performances, automated dialogue replacement (ADR), and sound effects with nuanced emotional inflection for cinema & games.',
    perk: 'Direct voice cloning & low-latency streaming API for pipeline integrations.',
    ctaText: 'Try Free Voice Studio →',
    url: 'https://elevenlabs.io?ref=frameline',
    categories: ['ai', 'music'],
    pricing: 'Free Tier / $5 Starter',
    rating: 4.7,
  },
  {
    id: 'puget-systems-workstations',
    name: 'Puget Systems VFX Workstations',
    company: 'Puget Systems',
    logo: '⚡',
    badge: 'CERTIFIED VFX WORKSTATION',
    headline: 'Purpose-Built Hardware for Unreal Engine, Nuke & DaVinci Resolve',
    description: 'Custom-tailored workstations benchmarked and validated for dual RTX 6000 Ada GPUs, thread-heavy rendering, and real-time LED volume processing.',
    perk: 'Lifetime labor and tech support with customized studio hardware benchmarks.',
    ctaText: 'Configure Studio Rig →',
    url: 'https://www.pugetsystems.com?ref=frameline',
    categories: ['technology', 'virtual-production', 'vfx'],
    pricing: 'Custom Studio Configuration',
    rating: 4.9,
  },
];

/**
 * Get the most relevant affiliate offer for a given category or tool
 */
export function getAffiliateOfferForCategory(category: string): AffiliateOffer {
  const normalizedCategory = category.toLowerCase().trim();
  const match = AFFILIATE_OFFERS.find(offer => 
    offer.categories.includes(normalizedCategory)
  );

  return match || AFFILIATE_OFFERS[0];
}

/**
 * Get affiliate offer matching a specific tool slug
 */
export function getAffiliateOfferForTool(slug: string): AffiliateOffer | undefined {
  return AFFILIATE_OFFERS.find(offer => offer.toolSlug === slug);
}
