'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { getCategoryColor, formatTimecode } from '@/lib/utils';
import AuthorBadge from '@/components/common/AuthorBadge';

interface CategoryArticleListProps {
  articles: Article[];
  categorySlug: string;
  categoryName: string;
}

export default function CategoryArticleList({
  articles,
  categorySlug,
  categoryName,
}: CategoryArticleListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(24);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(articles.flatMap((a) => a.tags || []))
  ).slice(0, 12);

  const filteredArticles = articles.filter((article) => {
    const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag);
    const matchesQuery =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.dek.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (article.seoKeywords && article.seoKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesTag && matchesQuery;
  });

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  return (
    <div>
      {/* Control Bar: Search & Tag Filter */}
      <div className="bg-bg-card border border-border-subtle rounded-xl p-4 md:p-6 mb-10 shadow-lg">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-accent-gold uppercase tracking-wider font-bold">
              CATALOG ARCHIVE:
            </span>
            <span className="font-mono text-xs text-text-primary px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
              {filteredArticles.length} / {articles.length} Verified Reports
            </span>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${categoryName} reports...`}
              className="w-full bg-bg-base border border-border-subtle rounded-lg py-2 px-3.5 text-xs text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-cyan transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tag Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-border-subtle/50">
          <span className="text-meta text-text-secondary/40 text-[10px] mr-1">TAGS:</span>
          <button
            onClick={() => setSelectedTag('all')}
            className={`text-meta text-[11px] px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              selectedTag === 'all'
                ? 'bg-accent-primary text-white font-bold'
                : 'bg-bg-base text-text-secondary hover:text-text-primary border border-border-subtle'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
              className={`text-meta text-[11px] px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-white text-bg-base font-bold'
                  : 'bg-bg-base text-text-secondary hover:text-text-primary border border-border-subtle hover:border-white/20'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {displayedArticles.length === 0 ? (
        <div className="text-center py-20 bg-bg-card rounded-2xl border border-border-subtle">
          <p className="font-serif text-lg text-text-secondary mb-2">No matching reports found</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('all');
            }}
            className="text-meta text-xs text-accent-cyan underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="group flex flex-col justify-between rounded-xl overflow-hidden border border-border-subtle hover:border-accent-primary/40 card-hover bg-bg-card transition-all"
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
                  {article.breaking && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-accent-primary text-white font-bold shadow-md">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div
                    className="h-0.5 w-10 mb-3 rounded"
                    style={{ backgroundColor: getCategoryColor(article.category) }}
                  />
                  <h3 className="font-display font-semibold text-lg text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                    {article.dek}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-border-subtle/50 flex items-center justify-between">
                <AuthorBadge size="sm" />
                <div className="text-right font-mono text-[10px] text-text-secondary/60">
                  <span>{article.readTime} MIN</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {filteredArticles.length > visibleCount && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + 24)}
            className="font-mono text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl border border-white/20 bg-bg-card hover:bg-white/10 text-text-primary font-bold shadow-xl transition-all cursor-pointer"
          >
            Load More Reports ({filteredArticles.length - visibleCount} Remaining) &darr;
          </button>
        </div>
      )}
    </div>
  );
}
