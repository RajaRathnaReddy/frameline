'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedArticle, articles } from '@/lib/data';
import { formatTimecode, getCategoryColor } from '@/lib/utils';
import { motion } from 'framer-motion';
import AuthorBadge from '@/components/common/AuthorBadge';

export default function CinematicHero() {
  const featured = getFeaturedArticle();
  const secondary = articles.filter(a => !a.featured).slice(0, 3);

  return (
    <section className="relative w-full max-w-full overflow-hidden border-b border-white/[0.08]" id="hero">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Cover Story Left (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <Link
              href={`/article/${featured.slug}`}
              className="group relative flex-1 flex flex-col justify-end rounded-2xl overflow-hidden border border-white/10 bg-bg-card shadow-2xl min-h-[500px] md:min-h-[580px] p-6 md:p-10 transition-all duration-300 hover:border-white/25"
            >
              {/* Background Media */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={featured.heroImage}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 68vw"
                />
                {/* Cinema Gradient Overlays for absolute legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/75 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-bg-base/80 via-bg-base/30 to-transparent" />
                <div className="hero-glow" />
              </div>

              {/* Breaking / Briefing Badge Top Left */}
              <div className="absolute top-5 left-5 md:top-6 md:left-6 z-10 flex items-center gap-2">
                <span className="bg-accent-primary text-white font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-accent-primary/30">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  OCTOBER 2026 BRIEFING &bull; COVER STORY
                </span>
                <span className="hidden sm:inline-block font-mono text-[10px] text-white/70 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  8 MIN READ
                </span>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 mt-auto pt-24">
                <div className="mb-3">
                  <span
                    className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded border inline-block font-semibold"
                    style={{
                      color: getCategoryColor(featured.category),
                      borderColor: `${getCategoryColor(featured.category)}55`,
                      backgroundColor: `${getCategoryColor(featured.category)}15`,
                    }}
                  >
                    {featured.category.toUpperCase().replace('-', ' ')} &bull; SPECIAL REPORT
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white leading-[1.08] tracking-tight mb-4 group-hover:text-accent-cyan transition-colors duration-300">
                  {featured.title}
                </h1>

                <p className="font-serif text-base sm:text-lg text-text-secondary line-clamp-3 md:line-clamp-none max-w-3xl mb-6 leading-relaxed">
                  {featured.dek}
                </p>

                {/* Metadata & Author Bar */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
                  <AuthorBadge size="md" showWebsite={false} />

                  <div className="flex items-center gap-3 text-right">
                    <div className="font-mono text-xs text-text-secondary">
                      {formatTimecode(featured.publishedAt)}
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 font-mono text-xs text-accent-cyan font-bold group-hover:translate-x-1 transition-transform">
                      Read Briefing &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Also Leading Right Rail (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="p-5 md:p-6 rounded-2xl bg-bg-elevated border border-border-subtle flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-gold" />
                  <span className="font-mono text-xs uppercase tracking-widest text-text-secondary font-bold">
                    Also Leading
                  </span>
                </div>
                <Link
                  href="/news"
                  className="font-mono text-[10px] text-accent-cyan hover:underline uppercase"
                >
                  View All &rarr;
                </Link>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-between">
                {secondary.map((article, i) => (
                  <Link
                    key={article.slug}
                    href={`/article/${article.slug}`}
                    className="group flex gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all duration-300"
                  >
                    <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 relative bg-black border border-white/5">
                      <Image
                        src={article.heroImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span
                        className="font-mono text-[10px] uppercase font-bold tracking-wider mb-1 block"
                        style={{ color: getCategoryColor(article.category) }}
                      >
                        {article.category.replace('-', ' ')}
                      </span>
                      <h3 className="font-display font-bold text-sm text-text-primary leading-snug group-hover:text-accent-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 font-mono text-[10px] text-text-secondary">
                        <span>{article.readTime} MIN READ</span>
                        <span>&bull;</span>
                        <span>{formatTimecode(article.publishedAt).split('&bull;')[0]}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Intelligence Fast Jump & AI Studio CTA */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-text-secondary">
                <span className="text-[11px] text-text-secondary/70">OCTOBER 2026 EDITION</span>
                <Link
                  href="/studio"
                  className="text-accent-cyan hover:text-accent-cyan/80 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                  <span>AI STUDIO &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
