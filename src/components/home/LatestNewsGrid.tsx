'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAllArticles } from '@/lib/data';
import { getCategoryColor, formatTimecode } from '@/lib/utils';
import { StaggerContainer, StaggerItem } from '@/components/motion';

export default function LatestNewsGrid() {
  const [allStories, setAllStories] = useState(() => getAllArticles());

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  useEffect(() => {
    const updateHandler = () => setAllStories(getAllArticles());
    window.addEventListener('frameline_articles_updated', updateHandler);
    setAllStories(getAllArticles());
    return () => window.removeEventListener('frameline_articles_updated', updateHandler);
  }, []);

  // Filter stories based on selected pill
  const nonFeatured = allStories.filter(a => !a.featured);
  const filteredStories = selectedFilter === 'all'
    ? nonFeatured
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

      {/* Bento Grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Large Card */}
        <StaggerItem className="md:col-span-2 lg:row-span-2">
          <Link
            href={`/article/${large.slug}`}
            className={`group block h-full rounded-lg overflow-hidden border border-border-subtle card-hover bg-bg-card cat-${large.category === 'virtual-production' ? 'virtual-production' : large.category}`}
          >
            <div className="img-hover-container aspect-[16/10]">
              <Image
                src={large.heroImage}
                alt={large.title}
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div
                className="h-0.5 w-10 mb-3 rounded"
                style={{ backgroundColor: getCategoryColor(large.category) }}
              />
              <span
                className="text-meta text-[10px] block mb-2"
                style={{ color: getCategoryColor(large.category) }}
              >
                {large.category.replace('-', ' ')}
              </span>
              <h3 className="text-fluid-h3 font-display text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                {large.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2">
                {large.dek}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-meta text-text-secondary/50">{large.readTime} MIN</span>
                <span className="text-text-secondary/20">·</span>
                <time className="text-meta text-text-secondary/50" dateTime={large.publishedAt}>
                  {formatTimecode(large.publishedAt)}
                </time>
              </div>
            </div>
          </Link>
        </StaggerItem>

        {/* Medium Cards */}
        {medium.map(article => (
          <StaggerItem key={article.slug} className="lg:col-span-1">
            <Link
              href={`/article/${article.slug}`}
              className={`group block h-full rounded-lg overflow-hidden border border-border-subtle card-hover bg-bg-card`}
            >
              <div className="img-hover-container aspect-video">
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div
                  className="h-0.5 w-8 mb-2.5 rounded"
                  style={{ backgroundColor: getCategoryColor(article.category) }}
                />
                <span
                  className="text-meta text-[10px] block mb-1.5"
                  style={{ color: getCategoryColor(article.category) }}
                >
                  {article.category.replace('-', ' ')}
                </span>
                <h3 className="font-display font-semibold text-sm text-text-primary mb-1.5 group-hover:text-accent-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <span className="text-meta text-text-secondary/50 text-[10px]">{article.readTime} MIN</span>
              </div>
            </Link>
          </StaggerItem>
        ))}

        {/* Small Cards */}
        {small.map(article => (
          <StaggerItem key={article.slug} className="lg:col-span-1">
            <Link
              href={`/article/${article.slug}`}
              className="group flex gap-3 p-3 rounded-lg border border-border-subtle hover:bg-bg-card/50 transition-all card-hover"
            >
              <div className="w-20 h-14 rounded overflow-hidden shrink-0 img-hover-container">
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  width={80}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="text-meta text-[9px] block mb-1"
                  style={{ color: getCategoryColor(article.category) }}
                >
                  {article.category.replace('-', ' ')}
                </span>
                <h4 className="font-display font-semibold text-xs text-text-primary leading-snug group-hover:text-accent-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
