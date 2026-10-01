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
    window.addEventListener('frameline_articles_updated', updateHandler);
    setAllStories(getAllArticles());
    return () => window.removeEventListener('frameline_articles_updated', updateHandler);
  }, []);

  // Filter stories based on selected pill; when 'all', skip the 3 leading stories shown in Hero
  const nonFeatured = allStories.filter(a => !a.featured);
  const filteredStories = selectedFilter === 'all'
    ? nonFeatured.slice(3)
    : nonFeatured.filter(a => a.category === selectedFilter);

  const gridArticles = filteredStories.slice(0, 7);
  const large = gridArticles[0] || nonFeatured[0];
  const rest = gridArticles.slice(1);
  const medium = rest.slice(0, 2);
  const small = rest.slice(2, 6);

  const filterTabs = [
    { label: 'All Beats', value: 'all' },
    { label: 'AI in Film', value: 'ai' },
    { label: 'VFX', value: 'vfx' },
    { label: 'Hollywood', value: 'hollywood' },
    { label: 'Film Tools', value: 'tools' },
    { label: 'Virtual Prod', value: 'virtual-production' },
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
              className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md transition-all ${
                selectedFilter === tab.value
                  ? 'bg-accent-primary text-white font-bold shadow-sm'
                  : 'text-text-secondary hover:text-text-primary bg-white/5 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <Link href="/news" className="text-meta text-text-secondary hover:text-accent-primary transition-colors ml-2 font-mono text-[10px]">
            NEWSROOM →
          </Link>
        </div>
      </div>

      {/* Bento Grid with 100% Non-Repeating Cinema Media & Verified Byline */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Large Card */}
        <StaggerItem className="md:col-span-2 lg:row-span-2">
          <Link
            href={`/article/${large.slug}`}
            className={`group flex flex-col justify-between h-full rounded-xl overflow-hidden border border-border-subtle card-hover bg-bg-card cat-${large.category === 'virtual-production' ? 'virtual-production' : large.category}`}
          >
            <div>
              <div className="img-hover-container aspect-[16/10]">
                <Image
                  src={large.heroImage}
                  alt={large.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div
                  className="h-0.5 w-10 mb-3 rounded"
                  style={{ backgroundColor: getCategoryColor(large.category) }}
                />
                <span
                  className="text-meta text-[10px] block mb-2 font-mono uppercase tracking-wider font-semibold"
                  style={{ color: getCategoryColor(large.category) }}
                >
                  {large.category.replace('-', ' ')}
                </span>
                <h3 className="text-fluid-h3 font-display text-text-primary mb-3 group-hover:text-accent-primary transition-colors font-bold leading-tight">
                  {large.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                  {large.dek}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-border-subtle/50 flex items-center justify-between">
              <AuthorBadge size="sm" showWebsite={true} />
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-secondary/60">
                <span>{large.readTime} MIN READ</span>
                <span>·</span>
                <time dateTime={large.publishedAt}>
                  {formatTimecode(large.publishedAt)}
                </time>
              </div>
            </div>
          </Link>
        </StaggerItem>

        {/* Medium Cards */}
        {medium.map((article) => (
          <StaggerItem key={article.slug} className="lg:col-span-1">
            <Link
              href={`/article/${article.slug}`}
              className="group flex flex-col justify-between h-full rounded-xl overflow-hidden border border-border-subtle card-hover bg-bg-card"
            >
              <div>
                <div className="img-hover-container aspect-video">
                  <Image
                    src={article.heroImage}
                    alt={article.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div
                    className="h-0.5 w-8 mb-2.5 rounded"
                    style={{ backgroundColor: getCategoryColor(article.category) }}
                  />
                  <span
                    className="text-meta text-[10px] block mb-1.5 font-mono uppercase tracking-wider"
                    style={{ color: getCategoryColor(article.category) }}
                  >
                    {article.category.replace('-', ' ')}
                  </span>
                  <h3 className="font-display font-semibold text-sm text-text-primary mb-1.5 group-hover:text-accent-primary transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-border-subtle/40 flex items-center justify-between">
                <AuthorBadge size="sm" showRole={false} />
                <span className="text-meta text-text-secondary/50 text-[10px] font-mono">{article.readTime} MIN</span>
              </div>
            </Link>
          </StaggerItem>
        ))}

        {/* Small Cards */}
        {small.map((article) => (
          <StaggerItem key={article.slug} className="lg:col-span-1">
            <Link
              href={`/article/${article.slug}`}
              className="group flex flex-col justify-between p-3.5 rounded-xl border border-border-subtle hover:bg-bg-card/70 transition-all card-hover h-full"
            >
              <div className="flex gap-3">
                <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 img-hover-container">
                  <Image
                    src={article.heroImage}
                    alt={article.title}
                    width={80}
                    height={64}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className="text-meta text-[9px] block mb-1 font-mono uppercase tracking-wider"
                    style={{ color: getCategoryColor(article.category) }}
                  >
                    {article.category.replace('-', ' ')}
                  </span>
                  <h4 className="font-display font-semibold text-xs text-text-primary leading-snug group-hover:text-accent-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-border-subtle/40 flex items-center justify-between">
                <AuthorBadge size="sm" showRole={false} />
                <span className="text-meta text-text-secondary/40 text-[9px] font-mono">{article.readTime}M</span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
