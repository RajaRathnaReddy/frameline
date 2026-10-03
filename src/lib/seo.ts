import { Article } from './types';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from './config';

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
export function generateArticleJsonLd(article: Article, siteUrl: string = SITE_URL) {
  const imageUrl = article.heroImage.startsWith('http')
    ? article.heroImage
    : `${siteUrl}${article.heroImage}`;

  const articleUrl = `${siteUrl}/article/${article.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': article.category === 'tech' || article.category === 'tools' ? 'TechArticle' : 'NewsArticle',
    headline: article.title,
    description: article.dek,
    image: [imageUrl],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      url: article.author.website || 'https://rajarathnareddy.com',
      sameAs: [
        'https://rajarathnareddy.com',
        'https://www.imdb.com/name/nm12830221/',
        'https://www.linkedin.com/in/rajarathnareddy/',
        'https://x.com/RAJARATHNAREDDY',
        'https://www.instagram.com/raja_rathna_reddy/',
      ],
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: SITE_NAME,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/renderline-logo.png`,
        width: 512,
        height: 512,
      },
    },
    keywords: (article.seoKeywords || article.tags).join(', '),
    articleSection: article.category.toUpperCase(),
    inLanguage: 'en-US',
    about: (article.toolsMentioned || []).map((tool) => ({
      '@type': 'Thing',
      name: tool,
    })),
  };
}

/**
 * Generate standard Google-compliant BreadcrumbList structured data
 */
export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Google-compliant VideoObject structured data for video indexation
 */
export function generateVideoJsonLd(
  video: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    contentUrl?: string;
    embedUrl?: string;
  },
  siteUrl: string = SITE_URL
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: [
      video.thumbnailUrl.startsWith('http') ? video.thumbnailUrl : `${siteUrl}${video.thumbnailUrl}`,
    ],
    uploadDate: video.uploadDate,
    ...(video.contentUrl ? { contentUrl: video.contentUrl } : {}),
    ...(video.embedUrl ? { embedUrl: video.embedUrl } : {}),
  };
}

/**
 * Generate complete Next.js Metadata object with OpenGraph and Twitter cards
 */
export function buildArticleMetadata(article: Article, siteUrl: string = SITE_URL): Metadata {
  const url = `${siteUrl}/article/${article.slug}`;
  const keywords = [...(article.seoKeywords || []), ...article.tags];

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: article.dek,
    keywords,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: `${article.title} | ${SITE_NAME}`,
      description: article.dek,
      url,
      siteName: SITE_NAME,
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
      title: `${article.title} | ${SITE_NAME}`,
      description: article.dek,
      images: [article.heroImage.startsWith('http') ? article.heroImage : `${siteUrl}${article.heroImage}`],
      creator: article.author.socials?.twitter || '@RAJARATHNAREDDY',
    },
    alternates: {
      canonical: url,
    },
  };
}
