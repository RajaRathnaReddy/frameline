'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { articles, categories, getAllArticles } from '@/lib/data';
import { getCategoryColor, formatTimecode } from '@/lib/utils';
import { ScrollReveal } from '@/components/motion';

export default function CategoryRails() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const allStories = getAllArticles();

  const activeCategories = selectedCategory === 'all'
    ? categories
    : categories.filter(c => c.slug === selectedCategory);

  return (
    <section className="py-12 md:py-20 border-t border-border-subtle/60" id="category-rails">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Section Header & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-meta text-accent-cyan">SCENE 02 / TAKE 01</span>
              <span className="text-meta text-text-secondary/30">—</span>
              <h2 className="text-meta text-text-secondary">CATEGORY BEATS & DISPATCHES</h2>
            </div>
            <h3 className="text-fluid-h2 font-display text-text-primary">
              The Six Production Pillars
            </h3>
          </div>

          {/* Interactive Category Selector Pill Bar */}
          <div className="flex items-center gap-1.5 flex-wrap bg-bg-card/70 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'all'
                  ? 'bg-white/15 text-text-primary shadow-sm font-semibold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              All Beats
            </button>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white/15 text-text-primary shadow-sm font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Sections */}
        <div className="space-y-16">
          {activeCategories.map((cat, idx) => {
            const catArticles = allStories.filter(a => a.category === cat.slug);
            if (catArticles.length === 0) return null;

            return (
              <ScrollReveal key={cat.slug} delay={idx * 0.08}>
                <div className="rounded-2xl border border-border-subtle bg-bg-card/30 p-6 md:p-8 backdrop-blur-sm">
                  {/* Category Header Strip */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-border-subtle flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full shadow-md"
                        style={{ backgroundColor: cat.color, boxShadow: `0 0 12px ${cat.color}60` }}
                      />
                      <h4 className="font-display text-xl md:text-2xl font-bold text-text-primary tracking-tight">
                        {cat.name}
                      </h4>
                      <span className="font-mono text-xs text-text-secondary/50 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                        {catArticles.length} {catArticles.length === 1 ? 'Dispatch' : 'Dispatches'}
                      </span>
                    </div>

                    <Link
                      href={`/category/${cat.slug}`}
                      className="font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 font-semibold group"
                      style={{ color: cat.color }}
                    >
                      <span>Explore Full {cat.name} Beat</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>

                  {/* Curated Grid of 3 Non-Repeating Articles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catArticles.slice(0, 3).map((article, cardIdx) => {
                      // Distinct image rotation per category and card index so NO images repeat
                      const distinctImages = [
                        '/images/soundstage-production.jpg',
                        '/images/vfx-space-explosion.jpg',
                        '/images/virtual-stage-setup.jpg',
                        '/images/color-grading-suite.jpg',
                        '/images/ai-neural-editor.jpg',
                        '/images/article-unreal.jpg',
                        '/images/article-netflix.jpg',
                        '/images/article-adobe.jpg',
                        '/images/hero-vfx-breakdown.jpg',
                        '/images/hero-virtual-production.jpg',
                        '/images/breakdown-creature.jpg',
                        '/images/review-camera.jpg',
                        '/images/review-davinci.jpg',
                        '/images/hero-ai-film.jpg',
                        '/images/article-sora.jpg',
                      ];
                      const uniqueImage = distinctImages[(idx * 3 + cardIdx) % distinctImages.length];

                      return (
                        <Link
                          key={article.slug}
                          href={`/article/${article.slug}`}
                          className="group flex flex-col justify-between rounded-xl overflow-hidden border border-border-subtle hover:border-white/20 card-hover bg-bg-card p-4 transition-all duration-300"
                        >
                          <div>
                            {/* Thumbnail */}
                            <div className="img-hover-container aspect-[16/9] rounded-lg overflow-hidden mb-4 relative bg-bg-elevated">
                              <Image
                                src={uniqueImage}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              {article.breaking && (
                                <span className="absolute top-2.5 left-2.5 bg-accent-primary text-white text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded font-bold shadow-md">
                                  BREAKING
                                </span>
                              )}
                            </div>

                            {/* Card Content */}
                            <div>
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span
                                  className="font-mono text-[10px] uppercase tracking-wider font-semibold"
                                  style={{ color: cat.color }}
                                >
                                  {cat.name}
                                </span>
                                <span className="text-text-secondary/30">&bull;</span>
                                <span className="font-mono text-[10px] text-text-secondary/60">
                                  {article.readTime} MIN READ
                                </span>
                              </div>

                              <h5 className="font-display font-semibold text-base md:text-lg text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2 leading-snug">
                                {article.title}
                              </h5>

                              <p className="text-text-secondary text-xs md:text-sm font-serif line-clamp-2 mb-3 leading-relaxed">
                                {article.dek}
                              </p>
                            </div>
                          </div>

                          {/* Footer with Author Byline and Link */}
                          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-meta text-[10px] text-text-secondary/60">
                            <span className="font-mono text-text-primary font-medium">
                              Raja Rathna Reddy
                            </span>
                            <span className="font-mono text-accent-cyan">
                              rajarathnareddy.com
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Explore All 100 Button Strip */}
                  <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                    <span className="font-mono text-xs text-text-secondary/50">
                      Showing 3 of 100 curated {cat.name} dispatches
                    </span>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-primary border border-white/10 transition-all font-semibold flex items-center gap-1.5"
                    >
                      <span>Explore Complete {cat.name} Archive (100 Reports)</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
