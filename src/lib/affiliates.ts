import { Article } from './types';

export interface AffiliateOffer {
  id: string;
  toolSlug?: string;
  name: string;
  network: string; // 'Amazon Associates' | 'Higgsfield Partner' | 'ElevenLabs'
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
 * Official Amazon Associates Tag for RENDERLINE
 */
export const AMAZON_ASSOCIATE_TAG = 'renderline-21';

/**
 * Generates an exact, post-relevant Amazon India gear search URL
 * tagged with our verified associate ID renderline-21.
 */
export function buildAmazonGearUrl(searchQuery: string): string {
  const encoded = encodeURIComponent(searchQuery.trim());
  return `https://www.amazon.in/s?k=${encoded}&tag=${AMAZON_ASSOCIATE_TAG}`;
}

/**
 * RENDERLINE Master Verified Partner Registry
 * 
 * Powered ONLY by active, commission-earning accounts:
 * 1. Higgsfield AI Partner: https://higgsfield.ai?fpr=raja-rathna-reddy-5b73d0
 * 2. ElevenLabs Affiliate: https://try.elevenlabs.io/7dnbvl7c40ip
 * 3. Amazon Associates: renderline-21 (Targeted Cinema, Post & VFX Gear)
 */
export const AFFILIATE_OFFERS: AffiliateOffer[] = [
  // ─── 1. HIGGSFIELD AI (Cinema Camera Motion & Previs) ───
  {
    id: 'higgsfield-ai',
    toolSlug: 'higgsfield',
    network: 'Higgsfield Partner',
    name: 'Higgsfield AI Video',
    company: 'Higgsfield AI',
    logo: '⚡',
    badge: 'CINEMA CAMERA AI',
    headline: 'Direct Cinematic Camera Motion, Dynamics & Temporal Framing',
    description: 'Advanced generative video platform engineered for directors, previs artists, and cinematographers with granular 3D camera controls and photorealistic human motion.',
    perk: 'Free creative tokens to direct 3D camera paths and character kinematics.',
    ctaText: 'Launch Higgsfield AI Studio →',
    url: 'https://higgsfield.ai?fpr=raja-rathna-reddy-5b73d0',
    categories: ['ai', 'virtual-production', 'tools', 'hollywood'],
    keywords: [
      'higgsfield', 'higgs field', 'camera movement', 'camera control', 'ai video',
      'generative video', 'motion', 'previs', 'sora', 'runway', 'kling', 'luma',
      'seedance', 'diffusion', 'prompt to video', 'text to video', 'generative film', 'synthetic video'
    ],
    pricing: 'Free Credits / Creator Pro',
    rating: 4.9,
  },

  // ─── 2. ELEVENLABS (Voice Acting, ADR & Audio AI) ───
  {
    id: 'elevenlabs-voice',
    toolSlug: 'elevenlabs',
    network: 'ElevenLabs',
    name: 'ElevenLabs Cinema Voice AI',
    company: 'ElevenLabs',
    logo: '🗣️',
    badge: 'ENTERPRISE VOICE AI',
    headline: 'Hyper-Realistic AI Voice Acting, ADR & Multilingual Dubbing',
    description: 'Generate studio-grade voice performances, automated dialogue replacement (ADR), and synthetic Foley sound effects with nuanced emotional control for cinema & gaming.',
    perk: 'Direct voice cloning & low-latency streaming API for pipeline integrations.',
    ctaText: 'Try Free Voice Studio →',
    url: 'https://try.elevenlabs.io/7dnbvl7c40ip',
    categories: ['ai', 'music', 'tools'],
    keywords: [
      'elevenlabs', 'voice ai', 'adr', 'dubbing', 'voice acting', 'audio ai',
      'speech', 'voice cloning', 'synthetic voice', 'dialogue replacement', 'foley ai', 'voiceover'
    ],
    pricing: 'Free Tier / $5 Starter',
    rating: 4.8,
  },

  // ─── 3. AMAZON PRO: COLOR GRADING & HDR REFERENCE MONITORS ───
  {
    id: 'amazon-hdr-monitors',
    network: 'Amazon Associates',
    name: 'Amazon Pro Color Grading & HDR Reference Monitors',
    company: 'Amazon Associates',
    logo: '🖥️',
    badge: 'VERIFIED COLOR HARDWARE',
    headline: 'ASUS ProArt 4K HDR, Calibrite ColorCheckers & OLED Master Displays',
    description: 'Equip your color grading suite with 10-bit Rec.709/DCI-P3 calibrated HDR reference monitors, hardware calibrators, and 12G-SDI clean feed breakout boxes.',
    perk: 'Direct Prime delivery, verified 100% Rec.709/DCI-P3 color accuracy.',
    ctaText: 'Shop Calibrated Monitors on Amazon →',
    url: buildAmazonGearUrl('color grading monitor asus proart'),
    categories: ['vfx', 'tools', 'hollywood', 'technology'],
    keywords: [
      'monitor', 'display', 'color grading', 'davinci', 'hdr', 'oled', 'asus proart',
      'flanders', 'calibrite', 'colorchecker', 'lut', 'rec.709', 'aces', 'grading panel', 'master monitor', 'reference monitor'
    ],
    pricing: 'Pro Studio Hardware Pricing',
    rating: 4.9,
  },

  // ─── 4. AMAZON PRO: CINEMA CAMERAS, LENSES & RIGS ───
  {
    id: 'amazon-cinema-cameras',
    network: 'Amazon Associates',
    name: 'Amazon Cinema Cameras, Lenses & Production Rigs',
    company: 'Amazon Associates',
    logo: '🎥',
    badge: 'VERIFIED CINEMA GEAR',
    headline: 'Full-Frame Cinema Cages, Anamorphic Cine Glass & Wireless Video Rigs',
    description: 'Rig your cinema camera with professional Tilta/SmallRig armor, matte boxes, follow focus systems, V-mount power distribution, and zero-latency wireless transmitters.',
    perk: 'Prime studio delivery with verified cinema rigging warranties.',
    ctaText: 'Shop Cinema Rigs on Amazon →',
    url: buildAmazonGearUrl('cinema camera rig cage tilta'),
    categories: ['hollywood', 'technology', 'virtual-production'],
    keywords: [
      'camera', 'lens', 'arri', 'red', 'sony fx3', 'sony fx6', 'sony venice',
      'blackmagic camera', 'cage', 'tilta', 'smallrig', 'anamorphic', 'follow focus',
      'matte box', 'teradek', 'hollyland', 'gimbal', 'ronin', 'cinematography', 'optics'
    ],
    pricing: 'Verified Cinema Pricing',
    rating: 4.9,
  },

  // ─── 5. AMAZON PRO: WORKSTATION GPUS & 3D COMPUTE ───
  {
    id: 'amazon-workstation-gpus',
    network: 'Amazon Associates',
    name: 'Amazon Pro Studio Workstations & RTX GPUs',
    company: 'Amazon Associates',
    logo: '⚡',
    badge: 'VERIFIED VFX HARDWARE',
    headline: 'NVIDIA GeForce RTX 4090/5090 GPUs, Mac Studio & High-TDP Workstations',
    description: 'Accelerate real-time Unreal Engine 5.8 playback, Solaris Karma XPU, and neural model training with ultra-fast CUDA graphics cards and high-memory studio towers.',
    perk: 'Enterprise hardware seller warranty, GST invoice & fast Prime dispatch.',
    ctaText: 'Shop Studio GPUs on Amazon →',
    url: buildAmazonGearUrl('nvidia rtx graphics card'),
    categories: ['vfx', 'technology', 'tools', 'virtual-production'],
    keywords: [
      'gpu', 'nvidia', 'rtx', 'cuda', 'workstation', 'threadripper', 'compute',
      'rendering', 'render farm', 'blender', 'maya', 'houdini', 'unreal engine',
      'cycles', 'octane', 'redshift', 'arnold', 'pc build', '3d graphics card'
    ],
    pricing: 'Studio Hardware Pricing',
    rating: 4.9,
  },

  // ─── 6. AMAZON PRO: STUDIO STORAGE & NVME RAID ───
  {
    id: 'amazon-studio-storage',
    network: 'Amazon Associates',
    name: 'Amazon Pro NVMe SSDs & Studio RAID Storage',
    company: 'Amazon Associates',
    logo: '💾',
    badge: 'VERIFIED DATA ARRAYS',
    headline: 'SanDisk Professional G-RAID, Thunderbolt 4 NVMe & High-Speed Portable SSDs',
    description: 'Prevent playback bottlenecking on 8K ARRIRAW and EXR image sequences with 2,800MB/s Thunderbolt 4 external NVMe drives and studio RAID backup enclosures.',
    perk: 'Rugged drop-resistant encasings with multi-terabyte sustained throughput.',
    ctaText: 'Shop Studio Storage on Amazon →',
    url: buildAmazonGearUrl('sandisk professional external ssd'),
    categories: ['technology', 'vfx', 'hollywood', 'tools'],
    keywords: [
      'storage', 'ssd', 'nvme', 'raid', 'sandisk professional', 'g-raid',
      'thunderbolt', 'owc', 'backup', 'nas', 'dailies', 'cache', 'data pipeline',
      'hard drive', 'exr cache', 'pipeline storage'
    ],
    pricing: 'High-Speed Studio Storage',
    rating: 4.8,
  },

  // ─── 7. AMAZON PRO: STUDIO AUDIO & MICROPHONES ───
  {
    id: 'amazon-studio-audio',
    network: 'Amazon Associates',
    name: 'Amazon Pro Studio Microphones & Audio Interfaces',
    company: 'Amazon Associates',
    logo: '🎙️',
    badge: 'VERIFIED AUDIO GEAR',
    headline: 'Shure SM7B, Rode Shotgun Mics, Audio Interfaces & Studio Headphones',
    description: 'Capture immaculate on-set dialogue, ADR, and Foley with broadcast-standard XLR microphones, clean preamps, and open-back acoustic mixing headphones.',
    perk: 'Authentic manufacturer warranties and studio acoustic isolation gear.',
    ctaText: 'Shop Pro Audio on Amazon →',
    url: buildAmazonGearUrl('studio recording microphone shure'),
    categories: ['music', 'technology'],
    keywords: [
      'audio', 'sound', 'microphone', 'mic', 'shure sm7b', 'rode', 'shotgun mic',
      'audio interface', 'focusrite', 'headphones', 'mixing', 'mastering', 'sound design',
      'foley', 'acoustics', 'music studio', 'daw gear'
    ],
    pricing: 'Pro Audio Hardware Deals',
    rating: 4.9,
  },

  // ─── 8. AMAZON PRO: VIRTUAL PRODUCTION & LIGHTING ───
  {
    id: 'amazon-virtual-production',
    network: 'Amazon Associates',
    name: 'Amazon Studio Lighting & Virtual Production Rigs',
    company: 'Amazon Associates',
    logo: '💡',
    badge: 'VERIFIED STAGE LIGHTING',
    headline: 'Aputure & Godox Studio LED Lights, Bowens Mount Softboxes & C-Stands',
    description: 'Match virtual LED volume environments with high-CRI bi-color continuous studio lighting, motorized fresnels, and heavy-duty steel grip hardware.',
    perk: '96+ CRI cinema color fidelity with remote Bluetooth / DMX control.',
    ctaText: 'Shop Studio Lighting on Amazon →',
    url: buildAmazonGearUrl('aputure led video light'),
    categories: ['virtual-production', 'hollywood', 'technology'],
    keywords: [
      'lighting', 'led', 'aputure', 'godox', 'nanlite', 'softbox', 'c-stand',
      'virtual production', 'icvfx', 'stagecraft', 'volume', 'studio light',
      'dmx', 'cinematography lighting', 'key light'
    ],
    pricing: 'Studio Grip & Lighting',
    rating: 4.9,
  },

  // ─── 9. AMAZON PRO: PEN DISPLAYS & DRAWING TABLETS ───
  {
    id: 'amazon-art-tablets',
    network: 'Amazon Associates',
    name: 'Amazon Pro Pen Displays & Drawing Tablets',
    company: 'Amazon Associates',
    logo: '✏️',
    badge: 'VERIFIED ART HARDWARE',
    headline: 'Wacom Cintiq Pro Pen Displays, 4K Drawing Tablets & Texture Styluses',
    description: 'Craft intricate matte paintings, 3D digital sculpts, and film pitch storyboards with pressure-sensitive, parallax-free 4K pen displays.',
    perk: '8,192 levels of pressure sensitivity with etched anti-glare glass.',
    ctaText: 'Shop Drawing Tablets on Amazon →',
    url: buildAmazonGearUrl('wacom cintiq drawing tablet'),
    categories: ['vfx', 'tools'],
    keywords: [
      'drawing tablet', 'wacom', 'cintiq', 'pen display', 'stylus', 'concept art',
      'storyboard', 'matte painting', 'sculpting', 'zbrush', 'texture painting',
      'digital art', 'huion'
    ],
    pricing: 'Creative Studio Hardware',
    rating: 4.8,
  },

  // ─── 10. AMAZON PRO: POST-PRODUCTION & EDITORIAL BAY ───
  {
    id: 'amazon-editing-gear',
    network: 'Amazon Associates',
    name: 'Amazon Pro Post-Production & Editorial Hardware',
    company: 'Amazon Associates',
    logo: '🖥️',
    badge: 'VERIFIED EDITORIAL GEAR',
    headline: 'Apple Mac Studio, Loupedeck Editing Consoles & Ergonomic Studio Gear',
    description: 'Build a world-class post-production edit bay with dedicated color grading shortcut consoles, Mac Studio workstations, and heavy-duty monitor arms.',
    perk: 'Dedicated editing shortcut control surfaces with multi-monitor mount kits.',
    ctaText: 'Shop Editorial Gear on Amazon →',
    url: buildAmazonGearUrl('apple mac studio'),
    categories: ['hollywood', 'technology', 'tools'],
    keywords: [
      'mac studio', 'editing console', 'loupedeck', 'speed editor', 'keyboard',
      'monitor arm', 'editorial', 'post production', 'premiere pro desk', 'edit suite', 'studio desk'
    ],
    pricing: 'Post Suite Hardware',
    rating: 4.9,
  },
];

/**
 * Hyper-Smart Matching Engine:
 * Returns the exact, most relevant affiliate / partner advertisement for any given article.
 * 
 * Powered ONLY by:
 * - Higgsfield AI (for AI video, motion, camera dynamics, previs, generative film)
 * - ElevenLabs (for voice acting, speech, ADR, dubbing, audio synthesis)
 * - Amazon Pro Gear with tag renderline-21 (for cameras, rigs, GPUs, displays, storage, audio, lighting)
 */
export function getAffiliateOfferForArticle(article: Article): AffiliateOffer {
  const titleLower = article.title.toLowerCase();
  const dekLower = article.dek.toLowerCase();
  const allText = `${titleLower} ${dekLower} ${(article.toolsMentioned || []).join(' ')} ${(article.tags || []).join(' ')} ${(article.seoKeywords || []).join(' ')}`.toLowerCase();

  // 1. High-priority AI Video & Camera Motion -> Higgsfield AI
  if (
    allText.includes('higgsfield') ||
    allText.includes('higgs field') ||
    allText.includes('camera movement') ||
    allText.includes('camera control') ||
    allText.includes('ai video') ||
    allText.includes('generative video') ||
    allText.includes('prompt-to-video') ||
    allText.includes('text-to-video') ||
    allText.includes('image-to-video') ||
    allText.includes('sora') ||
    allText.includes('runway') ||
    allText.includes('kling') ||
    allText.includes('luma ray') ||
    allText.includes('seedance') ||
    allText.includes('previs') ||
    allText.includes('generative film') ||
    allText.includes('diffusion model')
  ) {
    return AFFILIATE_OFFERS.find(o => o.id === 'higgsfield-ai')!;
  }

  // 2. High-priority AI Voice, ADR & Dialogue -> ElevenLabs
  if (
    allText.includes('voice') ||
    allText.includes('adr') ||
    allText.includes('elevenlabs') ||
    allText.includes('dubbing') ||
    allText.includes('speech') ||
    allText.includes('voice cloning') ||
    allText.includes('audio ai') ||
    allText.includes('voice acting')
  ) {
    return AFFILIATE_OFFERS.find(o => o.id === 'elevenlabs-voice')!;
  }

  // 3. Exact Equipment / Amazon Gear Matching
  let baseOffer: AffiliateOffer;

  if (
    allText.includes('monitor') ||
    allText.includes('color grading') ||
    allText.includes('davinci') ||
    allText.includes('hdr') ||
    allText.includes('oled') ||
    allText.includes('proart') ||
    allText.includes('flanders') ||
    allText.includes('calibrat') ||
    allText.includes('colorchecker') ||
    allText.includes('lut') ||
    allText.includes('rec.709') ||
    allText.includes('aces')
  ) {
    baseOffer = AFFILIATE_OFFERS.find(o => o.id === 'amazon-hdr-monitors')!;
  } else if (
    allText.includes('camera') ||
    allText.includes('lens') ||
    allText.includes('arri') ||
    allText.includes('alexa') ||
    allText.includes('red ') ||
    allText.includes('sony venice') ||
    allText.includes('sony fx') ||
    allText.includes('cage') ||
    allText.includes('tilta') ||
    allText.includes('smallrig') ||
    allText.includes('anamorphic') ||
    allText.includes('cinematograph') ||
    allText.includes('follow focus') ||
    allText.includes('matte box') ||
    allText.includes('teradek') ||
    allText.includes('hollyland') ||
    allText.includes('gimbal') ||
    allText.includes('ronin')
  ) {
    baseOffer = AFFILIATE_OFFERS.find(o => o.id === 'amazon-cinema-cameras')!;
  } else if (
    allText.includes('gpu') ||
    allText.includes('nvidia') ||
    allText.includes('rtx') ||
    allText.includes('cuda') ||
    allText.includes('workstation') ||
    allText.includes('compute') ||
    allText.includes('rendering') ||
    allText.includes('render farm') ||
    allText.includes('blender') ||
    allText.includes('maya') ||
    allText.includes('houdini') ||
    allText.includes('unreal engine') ||
    allText.includes('cycles') ||
    allText.includes('octane') ||
    allText.includes('redshift') ||
    allText.includes('arnold')
  ) {
    baseOffer = AFFILIATE_OFFERS.find(o => o.id === 'amazon-workstation-gpus')!;
  } else if (
    allText.includes('storage') ||
    allText.includes('ssd') ||
    allText.includes('nvme') ||
    allText.includes('raid') ||
    allText.includes('sandisk') ||
    allText.includes('g-raid') ||
    allText.includes('thunderbolt') ||
    allText.includes('backup') ||
    allText.includes('nas') ||
    allText.includes('dailies') ||
    allText.includes('cache')
  ) {
    baseOffer = AFFILIATE_OFFERS.find(o => o.id === 'amazon-studio-storage')!;
  } else if (
    allText.includes('lighting') ||
    allText.includes('led') ||
    allText.includes('aputure') ||
    allText.includes('godox') ||
    allText.includes('virtual production') ||
    allText.includes('icvfx') ||
    allText.includes('stagecraft') ||
    allText.includes('c-stand') ||
    allText.includes('softbox')
  ) {
    baseOffer = AFFILIATE_OFFERS.find(o => o.id === 'amazon-virtual-production')!;
  } else if (
    allText.includes('audio') ||
    allText.includes('sound') ||
    allText.includes('microphone') ||
    allText.includes('mic') ||
    allText.includes('shure') ||
    allText.includes('rode') ||
    allText.includes('headphones') ||
    allText.includes('scoring') ||
    allText.includes('foley') ||
    allText.includes('music')
  ) {
    baseOffer = AFFILIATE_OFFERS.find(o => o.id === 'amazon-studio-audio')!;
  } else if (
    allText.includes('drawing tablet') ||
    allText.includes('wacom') ||
    allText.includes('cintiq') ||
    allText.includes('concept art') ||
    allText.includes('matte painting') ||
    allText.includes('storyboard') ||
    allText.includes('sculpting') ||
    allText.includes('zbrush')
  ) {
    baseOffer = AFFILIATE_OFFERS.find(o => o.id === 'amazon-art-tablets')!;
  } else if (
    allText.includes('mac studio') ||
    allText.includes('editing') ||
    allText.includes('editorial') ||
    allText.includes('post production') ||
    allText.includes('premiere') ||
    allText.includes('after effects') ||
    allText.includes('loupedeck')
  ) {
    baseOffer = AFFILIATE_OFFERS.find(o => o.id === 'amazon-editing-gear')!;
  } else {
    // 4. Fallback by Category
    const cat = article.category.toLowerCase();
    if (cat === 'ai') return AFFILIATE_OFFERS.find(o => o.id === 'higgsfield-ai')!;
    if (cat === 'music') return AFFILIATE_OFFERS.find(o => o.id === 'amazon-studio-audio')!;
    if (cat === 'virtual-production') return AFFILIATE_OFFERS.find(o => o.id === 'amazon-virtual-production')!;
    if (cat === 'vfx') return AFFILIATE_OFFERS.find(o => o.id === 'amazon-workstation-gpus')!;
    if (cat === 'hollywood') return AFFILIATE_OFFERS.find(o => o.id === 'amazon-cinema-cameras')!;
    if (cat === 'technology') return AFFILIATE_OFFERS.find(o => o.id === 'amazon-studio-storage')!;
    if (cat === 'tools') return AFFILIATE_OFFERS.find(o => o.id === 'amazon-hdr-monitors')!;

    baseOffer = AFFILIATE_OFFERS.find(o => o.id === 'amazon-cinema-cameras')!;
  }

  // Refine Amazon search query if a very specific hardware keyword is in the article
  if (baseOffer.network === 'Amazon Associates') {
    let customQuery = '';
    if (allText.includes('sony fx3') || allText.includes('fx3')) customQuery = 'sony fx3 camera cage accessories';
    else if (allText.includes('sony venice')) customQuery = 'sony cinema camera accessories';
    else if (allText.includes('arri') || allText.includes('alexa')) customQuery = 'arri cinema camera accessories rig';
    else if (allText.includes('red komodo') || allText.includes('v-raptor')) customQuery = 'red komodo camera accessories';
    else if (allText.includes('proart') || allText.includes('asus')) customQuery = 'asus proart color grading monitor';
    else if (allText.includes('rtx 4090') || allText.includes('4090')) customQuery = 'nvidia rtx 4090 graphics card';
    else if (allText.includes('rtx') || allText.includes('cuda')) customQuery = 'nvidia rtx graphics card';
    else if (allText.includes('sandisk') || allText.includes('g-raid')) customQuery = 'sandisk professional external ssd';
    else if (allText.includes('aputure') || allText.includes('nanlite')) customQuery = 'aputure led video light';
    else if (allText.includes('shure sm7b') || allText.includes('sm7b')) customQuery = 'shure sm7b vocal microphone';
    else if (allText.includes('wacom cintiq') || allText.includes('cintiq')) customQuery = 'wacom cintiq drawing tablet';
    else if (allText.includes('mac studio')) customQuery = 'apple mac studio';
    else if (allText.includes('davinci resolve') || allText.includes('speed editor')) customQuery = 'davinci resolve speed editor blackmagic';

    if (customQuery) {
      return {
        ...baseOffer,
        url: buildAmazonGearUrl(customQuery),
      };
    }
  }

  return baseOffer;
}

/**
 * Get affiliate offer matching a specific tool slug.
 * Strictly returns genuine verified partners:
 * - 'higgsfield' -> Higgsfield AI
 * - 'elevenlabs' -> ElevenLabs
 */
export function getAffiliateOfferForTool(slug: string): AffiliateOffer | undefined {
  if (slug === 'higgsfield') {
    return AFFILIATE_OFFERS.find(offer => offer.id === 'higgsfield-ai');
  }
  if (slug === 'elevenlabs') {
    return AFFILIATE_OFFERS.find(offer => offer.id === 'elevenlabs-voice');
  }
  return undefined;
}
