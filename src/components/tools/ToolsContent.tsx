'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tools } from '@/lib/data';
import { getAffiliateOfferForTool } from '@/lib/affiliates';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';

const toolCategories = ['All', 'Compositing', '3D', 'Rendering', 'AI Video', 'Upscaling', 'Virtual Production', 'Color', 'Editing'];
const pricingFilters = ['All', 'Free', 'Paid', 'Open Source'];

export default function ToolsContent() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [pricingFilter, setPricingFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTools = tools.filter(tool => {
    if (categoryFilter !== 'All' && tool.category !== categoryFilter) return false;
    if (pricingFilter !== 'All') {
      if (pricingFilter === 'Free') {
        if (!tool.pricing.includes('Free')) return false;
      } else if (pricingFilter === 'Paid') {
        if (!tool.pricing.includes('Paid') && !tool.pricing.includes('paid')) return false;
      } else if (tool.pricing !== pricingFilter) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 md:py-16">
      {/* Header */}
      <ScrollReveal>
        <div className="mb-10">
          <span className="text-meta text-accent-lime mb-3 block">TOOL DIRECTORY</span>
          <h1 className="text-fluid-h1 font-display text-text-primary mb-3">
            Industry Tools
          </h1>
          <p className="text-text-secondary text-lg font-serif max-w-2xl">
            The definitive directory of VFX, AI, and filmmaking software — tracked, reviewed, and compared.
          </p>
        </div>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border-subtle">
          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {toolCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-meta px-3 py-1.5 rounded-full transition-colors text-[10px] ${
                  categoryFilter === cat
                    ? 'bg-accent-lime/20 text-accent-lime border border-accent-lime/30'
                    : 'text-text-secondary border border-border-subtle hover:text-text-primary hover:border-text-secondary/30'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Pricing Filter */}
            <div className="flex items-center gap-1.5">
              {pricingFilters.map(price => (
                <button
                  key={price}
                  onClick={() => setPricingFilter(price)}
                  className={`text-meta px-2.5 py-1 rounded transition-colors text-[10px] ${
                    pricingFilter === price
                      ? 'bg-white/10 text-text-primary'
                      : 'text-text-secondary/50 hover:text-text-secondary'
                  }`}
                >
                  {price.toUpperCase()}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center border border-border-subtle rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-text-primary' : 'text-text-secondary/50'}`}
                aria-label="Grid view"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-white/10 text-text-primary' : 'text-text-secondary/50'}`}
                aria-label="List view"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Results count */}
      <p className="text-meta text-text-secondary/50 mb-6 text-[10px]">
        {filteredTools.length} TOOLS FOUND
      </p>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTools.map(tool => (
            <StaggerItem key={tool.name}>
              <Link href={`/tools/${tool.slug}`} className="block h-full">
                <div className="glass-card rounded-xl p-6 h-full card-hover group hover:border-accent-lime/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:scale-110 transition-transform">
                        {tool.logo}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {getAffiliateOfferForTool(tool.slug) && (
                          <span className="text-meta text-[9px] px-2 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold border border-accent-gold/30 font-bold">
                            ⚡ DEAL
                          </span>
                        )}
                        <span className={`text-meta text-[10px] px-2 py-0.5 rounded-full ${
                          tool.pricing === 'Free' ? 'pill-live' :
                          tool.pricing === 'Open Source' ? 'pill-beta' :
                          tool.pricing === 'Free / Studio paid' ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30' :
                          'text-text-secondary border border-border-subtle'
                        }`}>
                          {tool.pricing.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display font-semibold text-text-primary text-lg mb-1 group-hover:text-accent-lime transition-colors">
                      {tool.name}
                    </h3>
                    <span className="text-meta text-text-secondary/60 text-[10px] block mb-3">
                      {tool.category} · V{tool.version}
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                    <div className="flex gap-1.5 flex-wrap">
                      {tool.platforms.map(p => (
                        <span key={p} className="text-meta text-text-secondary/60 text-[9px] px-1.5 py-0.5 border border-border-subtle rounded">
                          {p}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-accent-gold text-xs">★</span>
                      <span className="text-text-primary text-xs font-display font-semibold">{tool.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        /* List View */
        <div className="border border-border-subtle rounded-lg overflow-hidden">
          {filteredTools.map((tool, i) => (
            <div
              key={tool.name}
              className={`flex items-center gap-4 p-4 hover:bg-bg-card/50 transition-colors ${
                i < filteredTools.length - 1 ? 'border-b border-border-subtle' : ''
              }`}
            >
              <div className="text-2xl w-10 text-center">{tool.logo}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-text-primary text-sm">
                  {tool.name}
                </h3>
                <span className="text-meta text-text-secondary/50 text-[10px]">
                  {tool.category} · V{tool.version}
                </span>
              </div>
              <div className="hidden md:flex gap-1.5">
                {tool.platforms.map(p => (
                  <span key={p} className="text-meta text-text-secondary/40 text-[9px] px-1.5 py-0.5 border border-border-subtle rounded">
                    {p}
                  </span>
                ))}
              </div>
              <span className={`text-meta text-[10px] px-2 py-0.5 rounded-full ${
                tool.pricing === 'Free' ? 'pill-live' :
                tool.pricing === 'Open Source' ? 'pill-beta' :
                tool.pricing === 'Free / Studio paid' ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30' :
                'text-text-secondary border border-border-subtle'
              }`}>
                {tool.pricing.toUpperCase()}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-accent-gold text-xs">★</span>
                <span className="text-text-primary text-xs font-display font-semibold">{tool.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Verification footer */}
      <div className="mt-8 pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between text-meta text-text-secondary/60 gap-2">
        <span>Software releases and version numbers verified against official developer release notes.</span>
        <span className="font-mono text-xs">Last verified: October 1, 2026</span>
      </div>
    </div>
  );
}
