'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { reviews } from '@/lib/data';
import type { ProductReview } from '@/lib/types';
import { motion } from 'framer-motion';

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeReview, setActiveReview] = useState<ProductReview>(reviews[0]);

  const categories = ['All', 'Software', 'Camera Gear', 'AI Suite'];
  const filtered = selectedCategory === 'All'
    ? reviews
    : reviews.filter(r => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="border-b border-white/[0.08] pb-8 mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-gold px-2.5 py-1 rounded bg-accent-gold/10 border border-accent-gold/30">
              SCENE 05 / TAKE 01 &mdash; LAB BENCHMARKS
            </span>
            <span className="text-text-secondary font-mono text-xs">
              LAB TESTED &bull; UNCOMPROMISING VERDICTS
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary uppercase">
            Hardware & Software Reviews
          </h1>
          <p className="font-serif text-lg md:text-xl text-text-secondary max-w-3xl mt-3">
            Rigorous studio benchmarks of cinema cameras, grading consoles, neural upscalers, 
            and post-production software. Tested in production environments under real deadline pressures.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs uppercase px-4 py-2 rounded-full border transition-all ${
                  selectedCategory === cat
                    ? 'bg-accent-gold text-black font-bold border-accent-gold shadow-md shadow-accent-gold/20'
                    : 'bg-white/[0.03] text-text-secondary hover:text-text-primary border-white/[0.08] hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Deep-Dive Review */}
        <section className="mb-20">
          <div className="p-6 md:p-10 rounded-3xl bg-bg-elevated border border-border-subtle shadow-2xl relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Media Left */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black">
                  <Image
                    src={activeReview.heroImage}
                    alt={activeReview.product}
                    fill
                    priority
                    className="object-cover"
                  />
                  {activeReview.awardBadge && (
                    <div className="absolute top-4 left-4 bg-accent-gold text-black font-display font-black text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {activeReview.awardBadge}
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg font-mono text-xs text-text-secondary border border-white/10">
                    MSRP: <span className="text-white font-bold">{activeReview.price}</span>
                  </div>
                </div>

                {/* Scorecard Strip */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-bg-card border border-white/[0.06] text-center">
                    <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
                      RENDERLINE SCORE
                    </span>
                    <div className="font-display text-3xl md:text-4xl font-black text-accent-gold">
                      {activeReview.score}
                      <span className="text-sm font-normal text-text-secondary">/10</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-bg-card border border-white/[0.06] text-center">
                    <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
                      MANUFACTURER
                    </span>
                    <div className="font-display text-base md:text-lg font-bold text-white truncate">
                      {activeReview.manufacturer}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-bg-card border border-white/[0.06] text-center">
                    <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
                      RECOMMENDATION
                    </span>
                    <div className="font-display text-base md:text-lg font-bold text-accent-cyan">
                      Essential
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Details Right */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-accent-gold uppercase tracking-widest mb-2">
                    <span>{activeReview.category}</span>
                    <span>&bull;</span>
                    <span>Review by {activeReview.author.name}</span>
                  </div>

                  <h2 className="font-display text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-4">
                    {activeReview.title}
                  </h2>

                  {/* Verdict Box */}
                  <div className="p-5 rounded-2xl bg-bg-card border border-white/[0.08] mb-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent-gold font-bold block mb-1">
                      The RenderLine Verdict
                    </span>
                    <p className="font-serif text-base text-text-primary leading-relaxed">
                      &ldquo;{activeReview.verdict}&rdquo;
                    </p>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                        + The Good
                      </span>
                      <ul className="space-y-2 text-xs font-serif text-text-secondary">
                        {activeReview.pros.map((pro: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider block mb-2">
                        − The Bad
                      </span>
                      <ul className="space-y-2 text-xs font-serif text-text-secondary">
                        {activeReview.cons.map((con: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-400 font-bold shrink-0">−</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Lab Benchmark Test Specs */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <span className="font-mono text-[11px] text-text-secondary uppercase tracking-widest block mb-2">
                    Studio Lab Rig Specs
                  </span>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-text-secondary">
                    {Object.entries(activeReview.testedSpecs).map(([key, val]) => (
                      <div key={key} className="p-2 rounded bg-black/40 border border-white/[0.04]">
                        <span className="text-white/40 block text-[9px] uppercase">{key}</span>
                        <span className="text-text-primary truncate block">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Reviews Catalog */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.08]">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-text-primary">
              All Lab Reviews ({filtered.length})
            </h3>
            <span className="font-mono text-xs text-text-secondary">
              CLICK ANY REVIEW TO EXPAND ABOVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <div
                key={r.id}
                id={r.slug}
                onClick={() => {
                  setActiveReview(r);
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                className={`group cursor-pointer rounded-2xl overflow-hidden border p-5 transition-all duration-300 ${
                  activeReview.id === r.id
                    ? 'border-accent-gold bg-bg-elevated shadow-xl shadow-gold/10'
                    : 'border-border-subtle bg-bg-card hover:border-white/20'
                }`}
              >
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-black">
                  <Image
                    src={r.heroImage}
                    alt={r.product}
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md font-display font-black text-base text-accent-gold border border-accent-gold/40">
                    {r.score}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-text-secondary mb-1">
                  <span>{r.category}</span>
                  <span>{r.price}</span>
                </div>

                <h4 className="font-display text-lg font-bold text-text-primary group-hover:text-accent-gold transition-colors line-clamp-2 mb-2">
                  {r.product}
                </h4>

                <p className="font-serif text-xs text-text-secondary line-clamp-3 mb-4">
                  {r.verdict}
                </p>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px]">
                  <span className="text-accent-gold">Inspect Benchmark</span>
                  <span className="text-text-secondary group-hover:translate-x-1 transition-transform">
                    Read &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
