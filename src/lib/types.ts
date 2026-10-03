export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  website?: string;
  imdb?: string;
  aboutUrl?: string;
  filmographyUrl?: string;
  codingUrl?: string;
  automationUrl?: string;
  contactUrl?: string;
  email?: string;
  phone?: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    imdb?: string;
  };
}

export interface Article {
  title: string;
  slug: string;
  dek: string;
  heroImage: string;
  heroVideo?: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  featured: boolean;
  breaking: boolean;
  body: string;
  toolsMentioned?: string[];
  sources?: { label: string; url: string }[];
  citations?: { title: string; url: string }[];
  seoKeywords?: string[];
  aiGenerated?: boolean;
  promptSource?: string;
  seo: {
    title: string;
    desc: string;
    ogImage: string;
  };
}

export interface DispatchTemplate {
  id: string;
  title: string;
  topic: string;
  category: string;
  leadSnippet: string;
  tags: string[];
  keywords: string[];
  toolsMentioned: string[];
}

export interface Tool {
  name: string;
  slug: string;
  logo: string;
  category: string;
  pricing: 'Free' | 'Paid' | 'Open Source';
  platforms: string[];
  version: string;
  website: string;
  description: string;
  longDescription?: string;
  features?: string[];
  studioUsers?: string[];
  rating: number;
}

export interface AIModel {
  name: string;
  company: string;
  maxLength: string;
  resolution: string;
  audioNative: boolean;
  apiStatus: 'live' | 'beta' | 'sunset';
  updatedAt: string;
}

export interface Category {
  name: string;
  slug: string;
  color: string;
  cssClass: string;
}

export interface VFXBreakdown {
  id: string;
  slug: string;
  title: string;
  film: string;
  studio: string;
  supervisor: string;
  shotCount: number;
  camera: string;
  aspectRatio: string;
  colorPipeline: string;
  heroImage: string;
  beforeImage?: string;
  afterImage?: string;
  summary: string;
  passes: {
    name: string;
    description: string;
    image: string;
  }[];
  interviewExcerpt: {
    quote: string;
    speaker: string;
  };
}

export interface ProductReview {
  id: string;
  slug: string;
  title: string;
  product: string;
  manufacturer: string;
  category: 'Software' | 'Hardware' | 'AI Suite' | 'Camera Gear';
  heroImage: string;
  score: number; // e.g. 9.6
  awardBadge?: string; // e.g. "RENDERLINE EDITORS' CHOICE"
  verdict: string;
  pros: string[];
  cons: string[];
  author: Author;
  publishedAt: string;
  testedSpecs: { [key: string]: string };
  price: string;
}

export interface IndustrySponsor {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  badge: string; // e.g. "PARTNER SHOWCASE" | "SPONSORED BRIEF"
  category: string;
  logo: string;
  accentColor: string;
  image: string;
}
