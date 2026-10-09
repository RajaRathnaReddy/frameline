'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAllArticles } from '@/lib/data';
import { getCategoryColor, formatTimecode, isBreaking } from '@/lib/utils';
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

  // Filter stories based on selected pill
  const nonFeatured = allStories.filter((a) => !a.featured);
  const filteredStories =
    selectedFilter === 'all'
      ? nonFeatured
      : allStories.filter((a) => a.category === selectedFilter);

  const hasStories = filteredStories.length > 0;
  const gridArticles = filteredStories.slice(0, 7);
  const large = gridArticles[0] || nonFeatured[0];
  const rest = gridArticles.slice(1);
  const medium = rest.slice(0, 2);
  const small = rest.slice(2, 6);
  const rail = filteredStories.slice(7, 11);

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
          <span className="text-meta text-accent-primary font-semibold">SCENE 01 / TAKE 01</span>
          <span className="text-meta text-text-secondary/30">—</span>
          <h2 className="text-meta text-text-secondary font-bold">THE CUT &bull; LATEST DISPATCHES</h2>
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

      {/* Empty State */}
      {!hasStories ? (
        <div className="py-16 px-6 text-center rounded-2xl border border-dashed border-border-subtle bg-bg-card/40 my-6">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block mb-2 font-bold">
            Editorial Beat In Development
          </span>
          <h3 className="font-display font-bold text-xl text-text-primary mb-2">
            More {filterTabs.find((t) => t.value === selectedFilter)?.label} Dispatches Coming Soon
          </h3>
          <p className="text-text-secondary text-sm font-serif max-w-md mx-auto">
            Render Line enforces a strict verification standard against primary technical documentation.
          </p>
        </div>
      ) : (
        <>
          {/* Classic Authentic Bento Grid from First Deployment */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Large Bento Card (2 columns x 2 rows) */}
            {large && (
              <StaggerItem className="md:col-span-2 lg:row-span-2 flex flex-col">
                <Link
                  href={`/article/${large.slug}`}
                  aria-label={large.title}
                  className={`group flex flex-col justify-between h-full rounded-2xl overflow-hidden border border-border-subtle hover:border-white/20 card-hover bg-bg-card transition-all duration-300 cat-${
                    large.category === 'virtual-production' ? 'virtual-production' : large.category
                  }`}
                >
                  <div>
                    <div className="img-hover-container aspect-[16/10] relative overflow-hidden bg-bg-elevated">
                      <Image
                        src={large.heroImage}
                        alt={large.title}
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
                            borderColor: `${getCategoryColor(large.category)}60`,
                            color: getCategoryColor(large.category),
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: getCategoryColor(large.category) }}
                          />
                          {large.category.replace('-', ' ')}
                        </span>
                        {isBreaking(large.publishedAt, large.breaking) && (
                          <span className="font-mono text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-accent-primary text-white shadow-lg">
                            BREAKING
                          </span>
                        )}
                      </div>

                      <div className="absolute top-4 right-4 z-10">
                        <span className="font-mono text-[10px] text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                          {large.readTime} MIN READ
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div
                        className="h-0.5 w-10 mb-3 rounded"
                        style={{ backgroundColor: getCategoryColor(large.category) }}
                      />
                      <span
                        className="text-meta text-[10px] block mb-2 font-semibold"
                        style={{ color: getCategoryColor(large.category) }}
                      >
                        {large.category.replace('-', ' ')}
                      </span>
                      <h3 className="text-fluid-h3 font-display text-text-primary mb-3 group-hover:text-accent-primary transition-colors leading-tight font-bold">
                        {large.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 font-serif">
                        {large.dek}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-border-subtle/50 flex items-center justify-between">
                    <AuthorBadge size="sm" showRole={false} showWebsite={false} />
                    <div className="flex items-center gap-2 text-meta text-text-secondary/50 text-[10px]">
                      <time dateTime={large.publishedAt}>
                        {formatTimecode(large.publishedAt).split('&bull;')[0]}
                      </time>
                      <span className="text-accent-cyan font-bold font-mono">Read &rarr;</span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            )}

            {/* Medium Cards (1 col each) */}
            {medium.map((article) => (
              <StaggerItem key={article.slug} className="lg:col-span-1 flex flex-col">
                <Link
                  href={`/article/${article.slug}`}
                  aria-label={article.title}
                  className="group flex flex-col justify-between h-full rounded-2xl overflow-hidden border border-border-subtle hover:border-white/20 card-hover bg-bg-card transition-all duration-300"
                >
                  <div>
                    <div className="img-hover-container aspect-[16/10] relative overflow-hidden bg-bg-elevated">
                      <Image
                        src={article.heroImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      {isBreaking(article.publishedAt, article.breaking) && (
                        <span className="absolute top-2 left-2 bg-accent-primary text-white text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded font-bold shadow-md">
                          BREAKING
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div
                        className="h-0.5 w-8 mb-2.5 rounded"
                        style={{ backgroundColor: getCategoryColor(article.category) }}
                      />
                      <span
                        className="text-meta text-[10px] block mb-1.5 font-semibold"
                        style={{ color: getCategoryColor(article.category) }}
                      >
                        {article.category.replace('-', ' ')}
                      </span>
                      <h4 className="font-display font-semibold text-sm text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                      <p className="text-text-secondary text-xs font-serif line-clamp-2 mb-2 leading-relaxed">
                        {article.dek}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-2 border-t border-border-subtle/40 flex items-center justify-between text-meta text-text-secondary/50 text-[10px]">
                    <AuthorBadge size="sm" showRole={false} showWebsite={false} />
                    <span>{article.readTime} MIN</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}

            {/* Small Cards (1 col each) */}
            {small.map((article) => (
              <StaggerItem key={article.slug} className="lg:col-span-1 flex flex-col">
                <Link
                  href={`/article/${article.slug}`}
                  aria-label={article.title}
                  className="group flex gap-3 p-3.5 rounded-xl border border-border-subtle hover:bg-bg-elevated hover:border-white/20 transition-all card-hover bg-bg-card h-full justify-between"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative bg-bg-elevated border border-white/5 img-hover-container">
                    <Image
                      src={article.heroImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
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
                      <h4 className="font-display font-semibold text-xs text-text-primary leading-snug group-hover:text-accent-primary transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <AuthorBadge size="sm" showRole={false} showWebsite={false} />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Full-Width Dispatch Rail (4 columns) */}
          {rail.length > 0 && (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {rail.map((article) => (
                <StaggerItem key={article.slug} className="flex flex-col">
                  <Link
                    href={`/article/${article.slug}`}
                    aria-label={article.title}
                    className="group flex gap-3 p-3.5 rounded-xl border border-border-subtle hover:border-white/20 bg-bg-card hover:bg-bg-elevated transition-all duration-300 card-hover h-full"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative bg-bg-elevated border border-white/5 img-hover-container">
                      <Image
                        src={article.heroImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
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
                        <h4 className="font-display font-semibold text-xs text-text-primary leading-snug group-hover:text-accent-primary transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-text-secondary/50">
                        <span>{formatTimecode(article.publishedAt).split('&bull;')[0]}</span>
                        <span className="text-accent-cyan font-semibold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </>
      )}
    </section>
  );
}
