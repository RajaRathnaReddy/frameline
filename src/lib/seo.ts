import { Article } from './types';
import type { Metadata } from 'next';

/**
 * Known Film, AI, VFX, and Virtual Production keywords dictionary
 * used for autonomous tag and keyword extraction.
 */
const FILM_TECH_TAXONOMY: { [key: string]: string[] } = {
  'ai': ['generative video', 'AI video', 'diffusion model', 'neural upscaling', 'temporal consistency', 'LLM', 'AI ethics', 'synthetic media', 'deep learning', 'compute clusters'],
  'vfx': ['compositing', 'ACEScg', 'OpenEXR', 'Houdini pyro', 'FLIP fluid', 'CopyCat ML', 'deep compositing', 'radiance fields', '3D Gaussian Splatting', 'photogrammetry', 'denoising'],
  'hollywood': ['box office', 'studio acquisitions', 'SAG-AFTRA', 'WGA', 'labor guardrails', 'franchise IP', 'theatrical distribution', 'streaming economics', 'equity deals'],
  'tools': ['Unreal Engine', 'DaVinci Resolve', 'Foundry Nuke', 'SideFX Houdini', 'Blender', 'Topaz Video AI', 'Runway', 'Adobe Premiere Pro', 'After Effects'],
  'virtual-production': ['LED volume', 'in-camera VFX', 'ICVFX', 'StageCraft', 'moiré prevention', 'SMPTE 2110', 'genlock', 'OpenVPCal', 'metamerism', 'camera tracking'],
  'tech': ['NVIDIA Blackwell', 'C2PA provenance', 'cryptographic watermarking', 'GPU render farms', 'Apple Silicon', 'cloud pipeline', 'spectral rendering', 'OpenUSD'],
};

/**
 * Autonomous Semantic Extractor:
 * Analyzes article text and extracts high-intent SEO keywords and relevant DCC tags.
 */
export function extractAutonomousTags(body: string, category: string): { tags: string[]; seoKeywords: string[]; toolsMentioned: string[] } {
  const lowerBody = body.toLowerCase();
  const matchedTags = new Set<string>();
  const matchedKeywords = new Set<string>();
  const matchedTools = new Set<string>();

  // Scan category taxonomy
  const categoryTerms = FILM_TECH_TAXONOMY[category] || [];
  categoryTerms.forEach(term => {
    if (lowerBody.includes(term.toLowerCase())) {
      matchedKeywords.add(term);
    }
  });

  // Scan all tools
  const allTools = FILM_TECH_TAXONOMY['tools'];
  allTools.forEach(tool => {
    if (lowerBody.includes(tool.toLowerCase())) {
      matchedTools.add(tool);
      matchedTags.add(tool);
    }
  });

  // Add category specific primary tags
  matchedTags.add(category.replace('-', ' ').toUpperCase());

  // Fill tags if sparse
  if (matchedTags.size < 4) {
    matchedTags.add('Film Technology');
    matchedTags.add('2026 Cinema');
    matchedTags.add('Production Pipeline');
  }

  // Ensure high-value SEO keywords
  matchedKeywords.add(`${category} film technology 2026`);
  matchedKeywords.add(`cinematic post-production`);

  return {
    tags: Array.from(matchedTags).slice(0, 6),
    seoKeywords: Array.from(matchedKeywords).slice(0, 8),
    toolsMentioned: Array.from(matchedTools).slice(0, 5),
  };
}

/**
 * Generate Google-compliant JSON-LD structured data for articles
 */
export function generateArticleJsonLd(article: Article, siteUrl: string = 'https://vfx.rajarathnareddy.com') {
  return {
    '@context': 'https://schema.org',
    '@type': article.category === 'tech' || article.category === 'tools' ? 'TechArticle' : 'NewsArticle',
    headline: article.title,
    description: article.dek,
    image: [`${siteUrl}${article.heroImage}`],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RENDERLINE',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/renderline-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/article/${article.slug}`,
    },
    keywords: (article.seoKeywords || article.tags).join(', '),
    articleSection: article.category.toUpperCase(),
    about: (article.toolsMentioned || []).map(tool => ({
      '@type': 'SoftwareApplication',
      name: tool,
    })),
  };
}

/**
 * Generate complete Next.js Metadata object with OpenGraph and Twitter cards
 */
export function buildArticleMetadata(article: Article, siteUrl: string = 'https://vfx.rajarathnareddy.com'): Metadata {
  const url = `${siteUrl}/article/${article.slug}`;
  const keywords = [...(article.seoKeywords || []), ...article.tags];

  return {
    title: `${article.title} — RENDERLINE`,
    description: article.dek,
    keywords,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.dek,
      url,
      siteName: 'RENDERLINE',
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: article.heroImage.startsWith('http') ? article.heroImage : `${siteUrl}${article.heroImage}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.dek,
      images: [article.heroImage.startsWith('http') ? article.heroImage : `${siteUrl}${article.heroImage}`],
      creator: article.author.socials?.twitter || '@RAJARATHNAREDDY',
    },
    alternates: {
      canonical: url,
    },
  };
}
