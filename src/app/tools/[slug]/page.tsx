import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { tools, articles, getToolBySlug } from '@/lib/data';
import { getAffiliateOfferForTool } from '@/lib/affiliates';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Tool Not Found | RENDERLINE' };

  return {
    title: `${tool.name} (v${tool.version}) — Film & VFX Tool Profile | RENDERLINE`,
    description: tool.description,
  };
}

export default async function ToolProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const affiliateOffer = getAffiliateOfferForTool(slug);

  // Find related articles that mention this tool
  const relatedArticles = articles.filter(
    (a) => a.toolsMentioned?.some((t) => t.toLowerCase() === tool.name.toLowerCase())
  );

  // Find alternatives in the same category
  const alternatives = tools.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug
  );

  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-xs text-text-secondary mb-8">
          <Link href="/tools" className="hover:text-accent-primary transition-colors">
            &larr; ALL TOOLS
          </Link>
          <span>/</span>
          <span className="uppercase text-text-primary">{tool.name}</span>
        </div>

        {/* Hero Header Card */}
        <div className="p-6 md:p-10 rounded-3xl bg-bg-elevated border border-border-subtle shadow-2xl relative overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-bg-card border border-white/10 flex items-center justify-center text-4xl shadow-lg">
                {tool.logo}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-display text-3xl md:text-5xl font-black text-text-primary">
                    {tool.name}
                  </h1>
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-accent-cyan">
                    v{tool.version}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-text-secondary">
                  <span className="text-accent-lime uppercase">{tool.category}</span>
                  <span>&bull;</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-text-primary">
                    {tool.pricing}
                  </span>
                  <span>&bull;</span>
                  <span>{tool.platforms.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Action & Rating */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <div className="font-display text-3xl font-black text-accent-gold">
                  {tool.rating}
                  <span className="text-xs font-normal text-text-secondary"> / 5.0</span>
                </div>
                <span className="font-mono text-[10px] text-text-secondary uppercase">
                  Studio Consensus
                </span>
              </div>
              <a
                href={affiliateOffer?.url || tool.website}
                target="_blank"
                rel={affiliateOffer ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
                className="bg-accent-primary hover:bg-accent-primary/90 text-white font-mono text-xs uppercase px-5 py-3 rounded-full font-bold transition-all shadow-lg shadow-accent-primary/20 hover:scale-105 flex items-center gap-2"
              >
                <span>{affiliateOffer ? affiliateOffer.ctaText : 'Visit Official Site'}</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>

          {/* Studio Partner Deal Perk Banner */}
          {affiliateOffer && (
            <div className="mt-6 p-4 rounded-xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-accent-gold font-bold font-mono text-xs uppercase">
                  ⚡ {affiliateOffer.badge}:
                </span>
                <span className="text-text-primary text-sm font-serif">
                  {affiliateOffer.perk}
                </span>
              </div>
              <a
                href={affiliateOffer.url}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="text-xs font-mono font-bold uppercase text-accent-gold hover:underline whitespace-nowrap"
              >
                Claim Deal &rarr;
              </a>
            </div>
          )}

          {/* Overview Text */}
          <div className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-3">
              Executive Overview
            </h2>
            <p className="font-serif text-lg text-text-primary leading-relaxed max-w-4xl">
              {tool.longDescription || tool.description}
            </p>
          </div>
        </div>

        {/* Feature Grid & Studio Users */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Key Features (2 cols) */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-bg-card border border-border-subtle">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-text-primary mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-lime" />
              Key Pipeline Features
            </h3>
            {tool.features && tool.features.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tool.features.map((feature, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-start gap-3">
                    <span className="font-mono text-accent-lime font-bold text-sm shrink-0">0{i + 1}</span>
                    <span className="font-serif text-sm text-text-primary">{feature}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-serif text-sm text-text-secondary">Standard visual production toolset with API integration.</p>
            )}
          </div>

          {/* Studio Adoption (1 col) */}
          <div className="p-8 rounded-2xl bg-bg-card border border-border-subtle">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-text-primary mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" />
              Studio Adoption
            </h3>
            {tool.studioUsers && tool.studioUsers.length > 0 ? (
              <ul className="space-y-3 font-mono text-xs text-text-secondary">
                {tool.studioUsers.map((studio, i) => (
                  <li key={i} className="flex items-center gap-2 pb-2 border-b border-white/[0.04]">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/80" />
                    <span className="text-text-primary font-medium">{studio}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-serif text-sm text-text-secondary">Widely deployed across global indie and commercial post houses.</p>
            )}
          </div>
        </div>

        {/* Related News Coverage */}
        {relatedArticles.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-text-primary mb-6">
              RenderLine Coverage of {tool.name} ({relatedArticles.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((art) => (
                <Link
                  key={art.slug}
                  href={`/article/${art.slug}`}
                  className="group flex gap-4 p-4 rounded-2xl bg-bg-card border border-border-subtle hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-32 h-24 relative rounded-xl overflow-hidden shrink-0 bg-black">
                    <Image src={art.heroImage} alt={art.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-mono text-[10px] text-accent-cyan uppercase mb-1">
                      {art.category} &bull; {art.readTime} MIN READ
                    </span>
                    <h4 className="font-display text-base font-bold text-text-primary group-hover:text-accent-cyan transition-colors line-clamp-2">
                      {art.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Alternatives */}
        {alternatives.length > 0 && (
          <div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-text-primary mb-4">
              Alternative {tool.category} Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {alternatives.slice(0, 3).map((alt) => (
                <Link
                  key={alt.slug}
                  href={`/tools/${alt.slug}`}
                  className="p-4 rounded-xl bg-bg-card border border-border-subtle hover:border-accent-lime/40 transition-all group flex items-center gap-3"
                >
                  <span className="text-3xl">{alt.logo}</span>
                  <div>
                    <h5 className="font-display text-base font-bold text-text-primary group-hover:text-accent-lime transition-colors">
                      {alt.name}
                    </h5>
                    <span className="font-mono text-[11px] text-text-secondary">
                      v{alt.version} &bull; {alt.pricing}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
