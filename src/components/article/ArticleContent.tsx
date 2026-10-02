'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { formatTimecode, getCategoryColor } from '@/lib/utils';
import { articles } from '@/lib/data';
import { rajaRathnaReddy } from '@/lib/author';
import { generateArticleJsonLd } from '@/lib/seo';
import ReadingProgress from './ReadingProgress';
import TableOfContents from './TableOfContents';
import { ScrollReveal } from '@/components/motion';
import { useMemo } from 'react';
import { getAffiliateOfferForArticle } from '@/lib/affiliates';
import IndustrySponsorCard from '@/components/monetization/IndustrySponsorCard';
import IndustrySponsorSidebar from '@/components/monetization/IndustrySponsorSidebar';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function formatInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-text-primary/90">$1</em>');
}

function parseBody(body: string): { html: string; headings: { id: string; text: string }[] } {
  const headings: { id: string; text: string }[] = [];
  const lines = body.split('\n');

  let inList = false;
  let listItems: string[] = [];
  let isOrderedList = false;
  const blocks: string[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      const tag = isOrderedList ? 'ol' : 'ul';
      const listClass = isOrderedList
        ? 'list-decimal list-inside space-y-2 mb-6 text-text-secondary pl-2 font-serif text-lg leading-relaxed'
        : 'list-disc list-inside space-y-2 mb-6 text-text-secondary pl-2 font-serif text-lg leading-relaxed';
      blocks.push(`<${tag} class="${listClass}">${listItems.join('')}</${tag}>`);
      listItems = [];
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // H2 Headings
    if (trimmed.startsWith('## ')) {
      flushList();
      const text = trimmed.replace('## ', '').trim();
      const id = slugify(text);
      headings.push({ id, text });
      blocks.push(`<h2 id="${id}" class="text-2xl md:text-3xl font-display font-bold text-text-primary mt-12 mb-4 scroll-mt-24 border-b border-border-subtle/50 pb-2">${text}</h2>`);
      continue;
    }

    // Numbered lists: e.g. "1. " or "2. "
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      if (!inList || !isOrderedList) {
        flushList();
        inList = true;
        isOrderedList = true;
      }
      listItems.push(`<li class="leading-relaxed"><span class="text-text-secondary">${formatInlineMarkdown(orderedMatch[1])}</span></li>`);
      continue;
    }

    // Bullet lists: e.g. "- " or "* "
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList || isOrderedList) {
        flushList();
        inList = true;
        isOrderedList = false;
      }
      const itemContent = trimmed.replace(/^[-*]\s+/, '');
      listItems.push(`<li class="leading-relaxed"><span class="text-text-secondary">${formatInlineMarkdown(itemContent)}</span></li>`);
      continue;
    }

    // Blockquote: e.g. "> "
    if (trimmed.startsWith('> ')) {
      flushList();
      const quoteContent = trimmed.replace(/^>\s*/, '');
      blocks.push(`<blockquote class="border-l-2 border-accent-primary bg-bg-card/40 rounded-r-md px-5 py-4 my-6 text-text-primary italic font-serif text-lg leading-relaxed">${formatInlineMarkdown(quoteContent)}</blockquote>`);
      continue;
    }

    flushList();
    blocks.push(`<p class="text-body text-text-secondary mb-6 leading-relaxed font-serif text-lg md:text-[19px]">${formatInlineMarkdown(trimmed)}</p>`);
  }

  flushList();

  return { html: blocks.join('\n'), headings };
}

export default function ArticleContent({ article }: { article: Article }) {
  const { html, headings } = useMemo(() => parseBody(article.body), [article.body]);
  const sponsorOffer = useMemo(() => getAffiliateOfferForArticle(article), [article]);

  const relatedArticles = articles
    .filter(a => a.slug !== article.slug)
    .filter(a => a.category === article.category || a.tags.some(t => article.tags.includes(t)))
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />

      <article itemScope itemType="https://schema.org/NewsArticle">
        {/* Google-compliant Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateArticleJsonLd(article)) }}
        />

        {/* Hero */}
        <ScrollReveal>
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-6 md:pt-10">
            <div className="letterbox rounded-lg overflow-hidden relative">
              <Image
                src={article.heroImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/30 to-transparent" />

              {/* Breaking badge */}
              {article.breaking && (
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-accent-primary !text-white px-3 py-1 rounded-sm font-mono text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 border border-white/20 shadow-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-[pulse-dot_2s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    BREAKING BRIEFING
                  </span>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Header */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 -mt-20 md:-mt-32 relative z-10">
          <ScrollReveal delay={0.2}>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <span
                  className="category-tag inline-block"
                  style={{
                    color: getCategoryColor(article.category),
                    borderColor: getCategoryColor(article.category),
                  }}
                >
                  {article.category.replace('-', ' ')}
                </span>

                {article.aiGenerated && (
                  <span className="font-mono text-[11px] text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm shadow-accent-cyan/10">
                    <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                    AUTONOMOUS AI NEWSROOM DISPATCH
                  </span>
                )}
              </div>

              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-display font-black text-text-primary mb-4 leading-[1.18] tracking-tight max-w-4xl"
                itemProp="headline"
              >
                {article.title}
              </h1>

              <p className="text-text-secondary text-lg md:text-xl font-serif leading-relaxed mb-6" itemProp="description">
                {article.dek}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 flex-wrap pb-8 border-b border-border-subtle mb-8">
                <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <Image
                    src={rajaRathnaReddy.avatar}
                    alt={rajaRathnaReddy.name}
                    width={40}
                    height={40}
                    className="rounded-full border border-accent-gold/40 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={rajaRathnaReddy.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-primary hover:text-accent-gold transition-colors text-sm font-display font-bold flex items-center gap-1.5"
                        itemProp="name"
                      >
                        <span>{rajaRathnaReddy.name}</span>
                        <svg
                          className="w-4 h-4 text-[#38BDF8] shrink-0 drop-shadow-sm"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-label="Verified"
                        >
                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.273 1.273 2.643 2.148 4.223 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.273 2.148-2.643 2.148-4.223zm-12.28 4.49l-3.79-3.79 1.41-1.41 2.38 2.38 5.79-5.79 1.41 1.41-7.2 7.2z"/>
                        </svg>
                      </a>
                    </div>
                    <span className="text-meta text-accent-cyan text-[10px] font-mono block">
                      {rajaRathnaReddy.role}
                    </span>
                  </div>
                </div>
                <span className="text-text-secondary/20">|</span>
                <span className="text-meta text-text-secondary">{article.readTime} MIN READ</span>
                <span className="text-text-secondary/20">|</span>
                <time
                  className="text-meta text-text-secondary"
                  dateTime={article.publishedAt}
                  itemProp="datePublished"
                >
                  {formatTimecode(article.publishedAt)}
                </time>

                {/* Share buttons */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button
                    className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-colors"
                    aria-label="Copy link"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-5.54a4.5 4.5 0 0 0-1.242-7.244l-4.5-4.5a4.5 4.5 0 0 0-6.364 6.364L4.343 8.81" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Body + TOC */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 pb-16">
          <div className="flex gap-12 max-w-5xl mx-auto">
            {/* TOC & Sticky Partner Sponsor (desktop only) */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                <TableOfContents headings={headings} />
                <IndustrySponsorSidebar offer={sponsorOffer} category={article.category} />
              </div>
            </aside>

            {/* Article body */}
            <div className="flex-1 max-w-[680px]" itemProp="articleBody">
              <ScrollReveal>
                <div
                  className="drop-cap"
                  dangerouslySetInnerHTML={{ __html: html }}
                />

                {/* Tools Mentioned Chips */}
                {article.toolsMentioned && article.toolsMentioned.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border-subtle">
                    <div className="text-meta text-accent-cyan text-[11px] mb-3 flex items-center gap-2 font-mono">
                      <svg className="w-3.5 h-3.5 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      TOOLS & PIPELINES REFERENCED
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.toolsMentioned.map((tool) => (
                        <Link
                          key={tool}
                          href="/tools"
                          className="text-xs px-3 py-1.5 rounded bg-bg-card border border-border-subtle hover:border-accent-cyan/60 hover:text-accent-cyan text-text-secondary transition-all flex items-center gap-2 font-mono group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/60 group-hover:bg-accent-cyan transition-colors" />
                          {tool}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Keyword Telemetry & Tags */}
                {article.seoKeywords && article.seoKeywords.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-border-subtle">
                    <div className="text-meta text-accent-gold text-[11px] mb-3 flex items-center gap-2 font-mono">
                      <span>KEYWORD TELEMETRY & INDEXING</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {article.seoKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="text-[11px] px-2.5 py-1 rounded bg-bg-card border border-border-subtle text-text-secondary font-mono"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Dispatch Origin Card */}
                {article.aiGenerated && article.promptSource && (
                  <div className="mt-8 p-4 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 font-mono text-xs">
                    <div className="text-accent-cyan font-semibold mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-cyan" />
                      AI NEWSROOM INGEST TELEMETRY
                    </div>
                    <p className="text-text-secondary">
                      Synthesized from query prompt: <span className="text-text-primary italic font-serif">"{article.promptSource}"</span>
                    </p>
                  </div>
                )}

                {/* Industry Pipeline Partner & Monetization Spotlight */}
                <IndustrySponsorCard offer={sponsorOffer} category={article.category} />
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        {/* Author Bio & Executive Profile */}
        <div className="max-w-[760px] mx-auto px-4 md:px-8 mb-16">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 bg-bg-card/70 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-accent-gold/40 shadow-lg shadow-black/60 relative">
                    <Image
                      src={rajaRathnaReddy.avatar}
                      alt={rajaRathnaReddy.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-bg-base flex items-center justify-center border border-white/20">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-pulse" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="font-display text-lg font-bold text-text-primary tracking-tight flex items-center gap-1.5">
                      <span>{rajaRathnaReddy.name}</span>
                      <svg
                        className="w-5 h-5 text-[#38BDF8] shrink-0 drop-shadow-sm"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-label="Verified"
                      >
                        <title>Verified Trade Architect</title>
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.273 1.273 2.643 2.148 4.223 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.273 2.148-2.643 2.148-4.223zm-12.28 4.49l-3.79-3.79 1.41-1.41 2.38 2.38 5.79-5.79 1.41 1.41-7.2 7.2z"/>
                      </svg>
                    </h4>
                  </div>

                  <p className="font-mono text-xs text-accent-cyan font-medium mb-3">
                    {rajaRathnaReddy.role}
                  </p>

                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {rajaRathnaReddy.bio}
                  </p>

                  {/* Verified Trade Links */}
                  <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/[0.08]">
                    <a
                      href={rajaRathnaReddy.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold border border-accent-gold/30 transition-all font-bold"
                    >
                      <span>🌐</span>
                      <span>rajarathnareddy.com</span>
                    </a>
                    {rajaRathnaReddy.socials?.instagram && (
                      <a
                        href={rajaRathnaReddy.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-pink-300 hover:text-white border border-pink-500/40 shadow-sm transition-all font-bold"
                      >
                        <svg className="w-3.5 h-3.5 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span>Instagram</span>
                      </a>
                    )}
                    {rajaRathnaReddy.socials?.facebook && (
                      <a
                        href={rajaRathnaReddy.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-500/40 shadow-sm transition-all font-bold"
                      >
                        <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span>Facebook</span>
                      </a>
                    )}
                    <a
                      href={rajaRathnaReddy.imdb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-primary border border-white/10 transition-all font-semibold"
                    >
                      <span>🎬</span>
                      <span>IMDb (nm12830221)</span>
                    </a>
                    {rajaRathnaReddy.socials?.linkedin && (
                      <a
                        href={rajaRathnaReddy.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-accent-cyan border border-white/10 transition-all"
                      >
                        <span>💼</span>
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {rajaRathnaReddy.socials?.twitter && (
                      <a
                        href={rajaRathnaReddy.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary border border-white/10 transition-all"
                      >
                        <span>𝕏</span>
                        <span>Twitter</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Related Stories */}
        {relatedArticles.length > 0 && (
          <div className="bg-bg-elevated border-t border-border-subtle py-16">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
              <ScrollReveal>
                <h3 className="text-meta text-text-secondary mb-8">
                  MORE IN {article.category.replace('-', ' ').toUpperCase()}
                </h3>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related, i) => (
                  <ScrollReveal key={related.slug} delay={i * 0.1}>
                    <Link
                      href={`/article/${related.slug}`}
                      className="group block rounded-lg overflow-hidden border border-border-subtle hover:border-border-subtle card-hover bg-bg-card"
                    >
                      <div className="img-hover-container aspect-video">
                        <Image
                          src={related.heroImage}
                          alt={related.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div
                          className="h-0.5 w-8 mb-2.5 rounded"
                          style={{ backgroundColor: getCategoryColor(related.category) }}
                        />
                        <h4 className="font-display font-semibold text-sm text-text-primary mb-1.5 group-hover:text-accent-primary transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <span className="text-meta text-text-secondary/50 text-[10px]">
                          {related.readTime} MIN READ
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>

      {/* JSON-LD with verified Person Schema and SameAs Knowledge Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.title,
            description: article.dek,
            image: article.heroImage.startsWith('http') ? article.heroImage : `https://vfx.rajarathnareddy.com${article.heroImage}`,
            datePublished: article.publishedAt,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://vfx.rajarathnareddy.com/article/${article.slug}`,
            },
            author: {
              '@type': 'Person',
              name: article.author.name,
              jobTitle: article.author.role,
              url: article.author.website || 'https://rajarathnareddy.com',
              sameAs: [
                'https://rajarathnareddy.com',
                'https://www.imdb.com/name/nm12830221/',
                'https://rajarathnareddy.com/about/',
                'https://rajarathnareddy.com/filmography/',
                'https://rajarathnareddy.com/coding/',
                'https://rajarathnareddy.com/automation/',
                'https://rajarathnareddy.com/contact/',
                'https://www.linkedin.com/in/rajarathnareddy/',
                'https://x.com/RAJARATHNAREDDY',
                'https://www.instagram.com/raja_rathna_reddy/',
              ],
            },
            publisher: {
              '@type': 'Organization',
              name: 'FRAMELINE',
              url: 'https://vfx.rajarathnareddy.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://vfx.rajarathnareddy.com/frameline-logo.png',
              },
            },
          }),
        }}
      />
    </>
  );
}
