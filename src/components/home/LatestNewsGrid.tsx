'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAllArticles } from '@/lib/data';
import { getCategoryColor, formatTimecode } from '@/lib/utils';
import { StaggerContainer, StaggerItem } from '@/components/motion';
import AuthorBadge from '@/components/common/AuthorBadge';

export default function LatestNewsGrid() {
  const [allStories, setAllStories] = useState(() => getAllArticles());
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  useEffect(() => {
    const updateHandler = () => setAllStories(getAllArticles());
    window.addEventListener('renderline_articles_updated', updateHandler);
    setAllStories(getAllArticles());
    return () => {
      window.removeEventListener('renderline_articles_updated', updateHandler);
    };
  }, []);

  // Filter stories based on selected pill; when 'all', skip the 3 leading stories shown in Hero
  const nonFeatured = allStories.filter((a) => !a.featured);
  const filteredStories =
    selectedFilter === 'all'
      ? nonFeatured.slice(3)
      : nonFeatured.filter((a) => a.category === selectedFilter);

  const lead = filteredStories[0] || nonFeatured[0];
  const secondary = filteredStories.slice(1, 5); // 4 articles
  const rail = filteredStories.slice(5, 9); // 4 articles

  const filterTabs = [
    { label: 'All Beats', value: 'all' },
    { label: 'AI in Film', value: 'ai' },
    { label: 'VFX', value: 'vfx' },
    { label: 'Hollywood', value: 'hollywood' },
    { label: 'Film Tools', value: 'tools' },
    { label: 'Virtual Prod', value: 'virtual-production' },
    { label: 'Sound & Music', value: 'music' },
    { label: 'Tech', value: 'tech' },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-20" id="latest">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-meta text-accent-primary">SCENE 01 / TAKE 01</span>
          <span className="text-meta text-text-secondary/30">—</span>
          <h2 className="text-meta text-text-secondary">THE CUT &bull; LATEST DISPATCHES</h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedFilter(tab.value)}
              className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                selectedFilter === tab.value
                  ? 'bg-accent-primary text-white font-bold shadow-sm'
                  : 'text-text-secondary hover:text-text-primary bg-white/5 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <Link
            href="/news"
            className="text-meta text-text-secondary hover:text-accent-primary transition-colors ml-2 font-mono text-[10px]"
          >
            NEWSROOM →
          </Link>
        </div>
      </div>

      {/* Bento Grid with Zero Dead Space */}
      <StaggerContainer>
        {/* Top Tier: Lead Card (Left 6 cols) + Secondary 2x2 Grid (Right 6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 items-stretch">
          {/* Lead Card (lg:col-span-6) */}
          <StaggerItem className="lg:col-span-6 flex flex-col">
            <Link
              href={`/article/${lead.slug}`}
              className={`group flex flex-col justify-between h-full rounded-2xl overflow-hidden border border-border-subtle hover:border-white/20 card-hover bg-bg-card transition-all duration-300 cat-${
                lead.category === 'virtual-production' ? 'virtual-production' : lead.category
              }`}
            >
              <div>
                <div className="img-hover-container aspect-[16/10] relative overflow-hidden bg-bg-elevated">
                  <Image
                    src={lead.heroImage}
                    alt={lead.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span
                      className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border shadow-lg flex items-center gap-1.5"
                      style={{
                        backgroundColor: 'rgba(10, 10, 12, 0.75)',
                        borderColor: `${getCategoryColor(lead.category)}60`,
                        color: getCategoryColor(lead.category),
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: getCategoryColor(lead.category) }}
                      />
                      {lead.category.replace('-', ' ')}
                    </span>
                    {lead.breaking && (
                      <span className="font-mono text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-accent-primary text-white shadow-lg">
                        BREAKING
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className="font-mono text-[10px] text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {lead.readTime} MIN READ
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div
                    className="h-0.5 w-10 mb-3 rounded"
                    style={{ backgroundColor: getCategoryColor(lead.category) }}
                  />
                  <span
                    className="text-meta text-[10px] block mb-2 font-mono uppercase tracking-wider font-semibold"
                    style={{ color: getCategoryColor(lead.category) }}
                  >
                    {lead.category.replace('-', ' ')}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-display text-text-primary mb-3 group-hover:text-accent-primary transition-colors font-bold leading-tight">
                    {lead.title}
                  </h3>
                  <p className="text-text-secondary text-sm md:text-base font-serif leading-relaxed mb-4 line-clamp-3">
                    {lead.dek}
                  </p>
                  {lead.tags && lead.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {lead.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] text-text-secondary/60 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-border-subtle/50 flex items-center justify-between">
                <AuthorBadge size="sm" showWebsite={true} />
                <div className="flex items-center gap-2 font-mono text-[10px] text-text-secondary/60">
                  <time dateTime={lead.publishedAt}>{formatTimecode(lead.publishedAt)}</time>
                  <span className="hidden sm:inline-block text-accent-cyan font-semibold group-hover:translate-x-1 transition-transform">
                    Read &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>

          {/* Secondary 2x2 Grid (lg:col-span-6) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {secondary.map((article) => (
              <StaggerItem key={article.slug} className="flex flex-col">
                <Link
                  href={`/article/${article.slug}`}
                  className="group flex flex-col justify-between h-full rounded-xl overflow-hidden border border-border-subtle hover:border-white/20 card-hover bg-bg-card transition-all duration-300 p-4"
                >
                  <div>
                    <div className="img-hover-container aspect-[16/10] rounded-lg overflow-hidden relative mb-3 bg-bg-elevated border border-white/5">
                      <Image
                        src={article.heroImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {article.breaking && (
                        <span className="absolute top-2 left-2 bg-accent-primary text-white text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded font-bold shadow-md">
                          BREAKING
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: getCategoryColor(article.category) }}
                        />
                        <span
                          className="font-mono text-[10px] uppercase tracking-wider font-semibold"
                          style={{ color: getCategoryColor(article.category) }}
                        >
                          {article.category.replace('-', ' ')}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-text-secondary/50">
                        {article.readTime} MIN
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-sm sm:text-[15px] text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h4>

                    {/* Rich Dek / Summary */}
                    <p className="text-text-secondary text-xs font-serif line-clamp-2 leading-relaxed mb-3">
                      {article.dek}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-border-subtle/40 flex items-center justify-between">
                    <AuthorBadge size="sm" showRole={false} />
                    <span className="font-mono text-[10px] text-accent-cyan/80 group-hover:translate-x-0.5 transition-transform font-semibold">
                      Read &rarr;
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </div>

        {/* Bottom Tier: 4-Column Full-Width Dispatches (No empty columns) */}
        {rail.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {rail.map((article) => (
              <StaggerItem key={article.slug}>
                <Link
                  href={`/article/${article.slug}`}
                  className="group flex flex-col justify-between p-3.5 rounded-xl border border-border-subtle hover:border-white/20 bg-bg-card hover:bg-bg-elevated transition-all duration-300 card-hover h-full"
                >
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative bg-bg-elevated border border-white/5 img-hover-container">
                      <Image
                        src={article.heroImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 font-mono text-[9px] uppercase tracking-wider">
                        <span
                          style={{ color: getCategoryColor(article.category) }}
                          className="font-semibold"
                        >
                          {article.category.replace('-', ' ')}
                        </span>
                        <span className="text-text-secondary/40">&bull;</span>
                        <span className="text-text-secondary/60">{article.readTime}M</span>
                      </div>
                      <h4 className="font-display font-semibold text-xs text-text-primary leading-snug group-hover:text-accent-primary transition-colors line-clamp-2 mb-1">
                        {article.title}
                      </h4>
                      <p className="text-text-secondary text-[11px] font-serif line-clamp-1 leading-normal">
                        {article.dek}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-border-subtle/40 flex items-center justify-between">
                    <AuthorBadge size="sm" showRole={false} />
                    <span className="font-mono text-[9px] text-text-secondary/50">
                      {formatTimecode(article.publishedAt).split('&bull;')[0]}
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        )}
      </StaggerContainer>
    </section>
  );
}
