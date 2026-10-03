'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { vfxBreakdowns } from '@/lib/data';
import type { VFXBreakdown } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_NAME, SITE_URL } from '@/lib/config';

export default function BreakdownsPage() {
  const [selectedBreakdown, setSelectedBreakdown] = useState<VFXBreakdown>(vfxBreakdowns[0]);
  const [activePassIndex, setActivePassIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [selectedStudio, setSelectedStudio] = useState<string>('All');

  const studios = ['All', 'Outpost VFX', 'Framestore & Wētā FX'];
  const filtered = selectedStudio === 'All'
    ? vfxBreakdowns
    : vfxBreakdowns.filter(b => b.studio.toLowerCase().includes(selectedStudio.toLowerCase()));

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setSliderPos((offset / rect.width) * 100);
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'VFX Shot Breakdowns',
        item: `${SITE_URL}/breakdowns`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `VFX Shot Breakdowns & Deconstructions — ${SITE_NAME}`,
    description: 'Frame-by-frame breakdowns, LIDAR terrain alignment, creature simulations, and composite passes from Hollywood leading visual effects studios.',
    url: `${SITE_URL}/breakdowns`,
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-16">
      {/* Google-compliant Breadcrumb and Collection Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Slate Header */}
        <div className="border-b border-white/[0.08] pb-8 mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-violet px-2.5 py-1 rounded bg-accent-violet/10 border border-accent-violet/30">
              SCENE 04 / TAKE 01 &mdash; VFX ARCHIVE
            </span>
            <span className="text-text-secondary font-mono text-xs">
              FINAL COMPOSITE &bull; MULTI-PASS
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary uppercase">
            VFX Shot Breakdowns
          </h1>
          <p className="font-serif text-lg md:text-xl text-text-secondary max-w-3xl mt-3">
            Behind the photorealism. Frame-by-frame breakdowns, LIDAR terrain alignment, 
            creature muscle simulations, and composite passes from Hollywood&apos;s leading visual effects studios.
          </p>

          {/* Studio Filters */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="font-mono text-xs text-text-secondary mr-2 uppercase tracking-wider">Studio:</span>
            {studios.map((studio) => (
              <button
                key={studio}
                onClick={() => setSelectedStudio(studio)}
                className={`font-mono text-xs uppercase px-3 py-1.5 rounded-full border transition-all ${
                  selectedStudio === studio
                    ? 'bg-accent-violet text-white border-accent-violet shadow-sm shadow-accent-violet/30'
                    : 'bg-white/[0.03] text-text-secondary hover:text-text-primary border-white/[0.08] hover:border-white/20'
                }`}
              >
                {studio}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Interactive Spotlight */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-violet animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                Interactive Comparison &bull; Drag to Reveal
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary/70">
              {selectedBreakdown.aspectRatio} &bull; {selectedBreakdown.colorPipeline}
            </span>
          </div>

          {/* Interactive Before / After Slider */}
          <div
            className="relative w-full aspect-[2.39/1] min-h-[360px] md:min-h-[500px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl bg-black"
            onMouseMove={handleSliderMove}
            onTouchMove={handleSliderMove}
          >
            {/* After (Full / Comp) Image */}
            <div className="absolute inset-0">
              <Image
                src={selectedBreakdown.heroImage}
                alt="Final Composite"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded font-mono text-[11px] text-accent-cyan border border-accent-cyan/30 uppercase tracking-widest z-10">
                Final Composite
              </div>
            </div>

            {/* Before (Plate / Wireframe) with clip-path */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <Image
                src={selectedBreakdown.beforeImage || selectedBreakdown.heroImage}
                alt="Raw Plate / WIP"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded font-mono text-[11px] text-accent-primary border border-accent-primary/30 uppercase tracking-widest z-10">
                Raw Plate / Tracking
              </div>
            </div>

            {/* Drag Handle Divider */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white z-20 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-xl">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" transform="rotate(-90 12 12)" />
                </svg>
              </div>
            </div>

            {/* Film Slate Overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-wrap items-end justify-between gap-4 z-10 pointer-events-none">
              <div>
                <span className="font-mono text-xs text-accent-violet uppercase tracking-widest block mb-1">
                  {selectedBreakdown.studio} &bull; {selectedBreakdown.film}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {selectedBreakdown.title}
                </h2>
              </div>
              <div className="flex gap-4 text-right font-mono text-xs text-text-secondary">
                <div>
                  <span className="text-white font-bold block">{selectedBreakdown.shotCount}</span>
                  <span>TOTAL SHOTS</span>
                </div>
                <div>
                  <span className="text-white font-bold block">{selectedBreakdown.camera}</span>
                  <span>CAMERA PACKAGE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs & Supervisor Quote */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="md:col-span-2 p-6 rounded-2xl bg-bg-card border border-border-subtle">
              <span className="font-mono text-xs text-text-secondary uppercase tracking-widest block mb-2">
                Supervisor Insights
              </span>
              <blockquote className="font-serif text-lg md:text-xl text-text-primary italic border-l-2 border-accent-violet pl-4 my-2">
                &ldquo;{selectedBreakdown.interviewExcerpt.quote}&rdquo;
              </blockquote>
              <div className="font-mono text-xs text-accent-violet mt-3">
                &mdash; {selectedBreakdown.interviewExcerpt.speaker}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-bg-card border border-border-subtle flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-text-secondary uppercase tracking-widest block mb-3">
                  Shot Pipeline Specs
                </span>
                <ul className="space-y-2 font-mono text-xs text-text-secondary">
                  <li className="flex justify-between pb-1 border-b border-white/[0.04]">
                    <span>Camera:</span>
                    <span className="text-text-primary text-right">{selectedBreakdown.camera.split('·')[0]}</span>
                  </li>
                  <li className="flex justify-between pb-1 border-b border-white/[0.04]">
                    <span>Aspect Ratio:</span>
                    <span className="text-text-primary">{selectedBreakdown.aspectRatio}</span>
                  </li>
                  <li className="flex justify-between pb-1 border-b border-white/[0.04]">
                    <span>Color Space:</span>
                    <span className="text-text-primary">{selectedBreakdown.colorPipeline}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Supervisor:</span>
                    <span className="text-text-primary">{selectedBreakdown.supervisor}</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/article/outpost-vfx-dog-stars-breakdown"
                className="mt-4 inline-flex items-center justify-center gap-2 font-mono text-xs text-accent-violet hover:text-white py-2 px-3 rounded-lg border border-accent-violet/30 hover:bg-accent-violet/20 transition-all text-center"
              >
                Read Full 1,200-Shot Case Study &rarr;
              </Link>
            </div>
          </div>

          {/* Pass-By-Pass Breakdown Tabs */}
          <div className="mt-10 p-6 rounded-2xl bg-bg-elevated border border-border-subtle">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.06]">
              <h3 className="font-display text-xl font-bold text-text-primary uppercase tracking-tight">
                Breakdown Passes
              </h3>
              <span className="font-mono text-xs text-text-secondary">
                Pass {activePassIndex + 1} of {selectedBreakdown.passes.length}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {selectedBreakdown.passes.map((pass: VFXBreakdown['passes'][number], idx: number) => (
                <button
                  key={pass.name}
                  onClick={() => setActivePassIndex(idx)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    activePassIndex === idx
                      ? 'bg-accent-violet/15 border-accent-violet text-white shadow-sm'
                      : 'bg-white/[0.02] border-white/[0.06] text-text-secondary hover:text-text-primary hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="font-mono text-[11px] font-bold text-accent-violet uppercase">
                    {pass.name}
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2 mt-1">
                    {pass.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="relative aspect-[21/9] rounded-xl overflow-hidden border border-white/10 bg-black">
              <Image
                src={selectedBreakdown.passes[activePassIndex].image}
                alt={selectedBreakdown.passes[activePassIndex].name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-xl">
                <span className="font-mono text-xs text-accent-violet uppercase font-semibold">
                  {selectedBreakdown.passes[activePassIndex].name}
                </span>
                <p className="font-serif text-sm text-text-primary mt-1">
                  {selectedBreakdown.passes[activePassIndex].description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Breakdown Catalog Grid */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.08]">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-text-primary">
              All Breakdown Archives ({filtered.length})
            </h3>
            <span className="font-mono text-xs text-text-secondary">
              CLICK TO LOAD IN SPOTLIGHT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                id={item.slug}
                onClick={() => {
                  setSelectedBreakdown(item);
                  setActivePassIndex(0);
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${
                  selectedBreakdown.id === item.id
                    ? 'border-accent-violet bg-bg-elevated shadow-xl shadow-accent-violet/10'
                    : 'border-border-subtle bg-bg-card hover:border-white/20'
                }`}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-black">
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded font-mono text-[10px] text-accent-violet border border-accent-violet/30 uppercase">
                    {item.studio}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded font-mono text-[10px] text-white/80">
                    {item.shotCount} SHOTS
                  </div>
                </div>

                <div className="p-6">
                  <span className="font-mono text-xs text-text-secondary uppercase">
                    {item.film} &bull; {item.camera}
                  </span>
                  <h4 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-violet transition-colors mt-1 mb-2">
                    {item.title}
                  </h4>
                  <p className="font-serif text-sm text-text-secondary line-clamp-2">
                    {item.summary}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                    <span className="text-accent-violet">Click to inspect passes</span>
                    <span className="text-text-secondary group-hover:translate-x-1 transition-transform">
                      View Breakdown &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
