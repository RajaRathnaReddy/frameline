'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles, categories } from '@/lib/data';
import { getCategoryColor, formatTimecode } from '@/lib/utils';
import { Article } from '@/lib/types';

export default function NewsPage() {
  const [allStories, setAllStories] = useState<Article[]>(() => getAllArticles());
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  useEffect(() => {
    const updateHandler = () => setAllStories(getAllArticles());
    window.addEventListener('frameline_articles_updated', updateHandler);
    setAllStories(getAllArticles());
    return () => window.removeEventListener('frameline_articles_updated', updateHandler);
  }, []);

  const filteredArticles = allStories.filter((article) => {
    const matchesCategory = selectedCat === 'all' || article.category === selectedCat;
    const matchesSearch =
      searchFilter.trim() === '' ||
      article.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      article.dek.toLowerCase().includes(searchFilter.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (article.seoKeywords && article.seoKeywords.some((k) => k.toLowerCase().includes(searchFilter.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
          <span className="text-meta text-accent-primary">SCENE 01 / TAKE 01 — THE LIVE WIRE</span>
          <Link
            href="/studio"
            className="flex items-center gap-1.5 font-mono text-xs uppercase px-3 py-1.5 rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan/20 transition-all font-bold"
          >
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span>AI Newsroom Studio &rarr;</span>
          </Link>
        </div>
        <h1 className="text-fluid-h1 font-display text-text-primary mb-3">
          The Latest Intelligence
        </h1>
        <p className="text-text-secondary text-lg font-serif max-w-2xl mb-8">
          The complete news stream across Hollywood deals, AI video models, real-time engines, and VFX pipeline breakthroughs.
        </p>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-bg-card p-4 rounded-xl border border-border-subtle">
          {/* Category tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCat('all')}
              className={`text-meta px-3 py-1.5 rounded-full text-[11px] transition-all cursor-pointer ${
                selectedCat === 'all'
                  ? 'bg-accent-primary text-white font-bold'
                  : 'text-text-secondary hover:text-text-primary border border-border-subtle bg-bg-base'
              }`}
            >
              ALL ({allStories.length})
            </button>
            {categories.map((cat) => {
              const count = allStories.filter((a) => a.category === cat.slug).length;
              const isSelected = selectedCat === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCat(cat.slug)}
                  className={`text-meta px-3 py-1.5 rounded-full text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-white text-bg-base font-bold shadow-md'
                      : 'text-text-secondary hover:text-text-primary border border-border-subtle bg-bg-base hover:border-white/20'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name.toUpperCase()} ({count})
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by keyword or tag..."
              className="w-full bg-bg-base border border-border-subtle rounded-lg py-1.5 px-3 text-xs text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-cyan"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="py-20 text-center glass-card rounded-2xl p-10 border border-border-subtle">
          <p className="font-display text-text-primary text-lg mb-2">No matching dispatches found.</p>
          <p className="text-text-secondary text-sm max-w-md mx-auto mb-6">
            Try adjusting your search filter, or launch the AI Studio to synthesize a new dispatch on this topic.
          </p>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 bg-accent-cyan text-bg-base font-display font-bold text-xs uppercase px-5 py-2.5 rounded-xl hover:bg-accent-cyan/90 transition-all shadow-lg shadow-accent-cyan/20"
          >
            <span>Launch AI Dispatch Studio &rarr;</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="group block rounded-xl overflow-hidden border border-border-subtle card-hover bg-bg-card flex flex-col justify-between"
            >
              <div>
                <div className="img-hover-container aspect-video relative">
                  <Image
                    src={article.heroImage}
                    alt={article.title}
                    width={500}
                    height={280}
                    className="w-full h-full object-cover"
                  />
                  {article.aiGenerated && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-black/80 text-accent-cyan border border-accent-cyan/40 backdrop-blur-md">
                        AI SYNTHESIZED
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div
                    className="h-0.5 w-10 mb-3 rounded"
                    style={{ backgroundColor: getCategoryColor(article.category) }}
                  />
                  <span
                    className="text-meta text-[10px] block mb-1.5 uppercase font-bold"
                    style={{ color: getCategoryColor(article.category) }}
                  >
                    {article.category.replace('-', ' ')}
                  </span>
                  <h3 className="font-display font-bold text-base text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                    {article.dek}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-border-subtle/60 flex items-center justify-between text-meta text-text-secondary/50 text-[10px]">
                <div className="flex items-center gap-2">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={18}
                    height={18}
                    className="rounded-full"
                  />
                  <span className="text-text-secondary/70 truncate max-w-[100px]">
                    {article.author.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <span>{article.readTime} MIN</span>
                  <span>&bull;</span>
                  <time dateTime={article.publishedAt}>
                    {formatTimecode(article.publishedAt).split('&bull;')[0]}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
