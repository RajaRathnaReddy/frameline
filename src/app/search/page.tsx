'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { searchAll, articles, tools, reviews, vfxBreakdowns } from '@/lib/data';

function SearchComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'All' | 'Articles' | 'Tools' | 'Breakdowns' | 'Reviews'>('All');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const results = searchAll(query);

  const totalCount =
    results.articles.length +
    results.tools.length +
    results.reviews.length +
    results.breakdowns.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header Search Box */}
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan block mb-2">
            DATABASE ARCHIVE SEARCH
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black text-text-primary tracking-tight mb-6">
            Search RenderLine
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search keywords, director, software, camera model, or studio…"
              className="w-full h-14 bg-bg-elevated border border-border-subtle rounded-2xl pl-14 pr-28 text-base md:text-lg font-display text-text-primary placeholder:text-text-secondary/50 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan outline-none transition-all shadow-xl leading-normal"
              autoFocus
            />
            <svg
              className="w-6 h-6 text-accent-cyan absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-accent-cyan text-black font-mono text-xs uppercase px-4 py-2 rounded-xl font-bold hover:bg-accent-cyan/90 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Quick Keyword Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="font-mono text-xs text-text-secondary mr-1">Trending:</span>
            {['Virtual Production', 'Unreal Engine 6', 'Topaz Labs', 'Nuke', 'DaVinci Resolve', 'ARRI ALEXA 35'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setQuery(tag);
                  router.push(`/search?q=${encodeURIComponent(tag)}`);
                }}
                className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-text-secondary hover:text-white border border-white/[0.06] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Filters */}
        {query && (
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-8 flex-wrap gap-4">
            <div className="flex gap-2">
              {(['All', 'Articles', 'Tools', 'Breakdowns', 'Reviews'] as const).map((tab) => {
                const count =
                  tab === 'All'
                    ? totalCount
                    : tab === 'Articles'
                    ? results.articles.length
                    : tab === 'Tools'
                    ? results.tools.length
                    : tab === 'Breakdowns'
                    ? results.breakdowns.length
                    : results.reviews.length;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-mono text-xs uppercase px-3.5 py-1.5 rounded-full border transition-all ${
                      activeTab === tab
                        ? 'bg-white text-black font-bold border-white shadow-sm'
                        : 'bg-white/[0.02] text-text-secondary hover:text-white border-white/[0.06]'
                    }`}
                  >
                    {tab} ({count})
                  </button>
                );
              })}
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Found {totalCount} matching records for &ldquo;{query}&rdquo;
            </span>
          </div>
        )}

        {/* Results Sections */}
        {!query.trim() ? (
          <div className="p-12 text-center border border-dashed border-border-subtle rounded-3xl">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="font-display text-xl font-bold text-text-primary mb-2">
              Explore the RenderLine Intelligence Archive
            </h3>
            <p className="font-serif text-sm text-text-secondary max-w-md mx-auto">
              Enter any camera package, VFX studio, AI algorithm, or software suite to search through our full index.
            </p>
          </div>
        ) : totalCount === 0 ? (
          <div className="p-16 text-center border border-dashed border-border-subtle rounded-3xl">
            <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
              No matching records found for &ldquo;{query}&rdquo;
            </h3>
            <p className="font-serif text-sm text-text-secondary max-w-md mx-auto mb-6">
              Check your spelling or try broader search terms like &quot;VFX&quot;, &quot;Cinema&quot;, &quot;Pipeline&quot;, or &quot;AI&quot;.
            </p>
            <button
              onClick={() => {
                setQuery('');
                router.push('/search');
              }}
              className="font-mono text-xs text-accent-cyan uppercase underline"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Articles */}
            {(activeTab === 'All' || activeTab === 'Articles') && results.articles.length > 0 && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent-cyan mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan" />
                  Editorial Articles ({results.articles.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.articles.map((art) => (
                    <Link
                      key={art.slug}
                      href={`/article/${art.slug}`}
                      className="group p-5 rounded-2xl bg-bg-card border border-border-subtle hover:border-accent-cyan/40 transition-all flex gap-4"
                    >
                      <div className="w-28 h-24 relative rounded-xl overflow-hidden shrink-0 bg-black">
                        <Image src={art.heroImage} alt={art.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[10px] text-accent-cyan uppercase mb-1 block">
                          {art.category} &bull; {art.readTime} MIN READ
                        </span>
                        <h4 className="font-display text-base font-bold text-text-primary group-hover:text-accent-cyan transition-colors line-clamp-2">
                          {art.title}
                        </h4>
                        <p className="font-serif text-xs text-text-secondary line-clamp-2 mt-1">
                          {art.dek}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {(activeTab === 'All' || activeTab === 'Tools') && results.tools.length > 0 && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent-lime mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-lime" />
                  Software & Tools Directory ({results.tools.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {results.tools.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      className="p-4 rounded-xl bg-bg-card border border-border-subtle hover:border-accent-lime/40 transition-all flex items-center gap-4 group"
                    >
                      <span className="text-3xl p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">{t.logo}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-base font-bold text-text-primary group-hover:text-accent-lime transition-colors">
                          {t.name}
                        </h4>
                        <span className="font-mono text-[11px] text-text-secondary block">
                          {t.category} &bull; v{t.version}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-accent-gold font-bold">
                        ★ {t.rating}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* VFX Breakdowns */}
            {(activeTab === 'All' || activeTab === 'Breakdowns') && results.breakdowns.length > 0 && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent-violet mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-violet" />
                  VFX Shot Breakdowns ({results.breakdowns.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.breakdowns.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/breakdowns#${b.slug}`}
                      className="group p-5 rounded-2xl bg-bg-card border border-border-subtle hover:border-accent-violet/40 transition-all flex gap-4"
                    >
                      <div className="w-28 h-24 relative rounded-xl overflow-hidden shrink-0 bg-black">
                        <Image src={b.heroImage} alt={b.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[10px] text-accent-violet uppercase mb-1 block">
                          {b.studio} &bull; {b.shotCount} SHOTS
                        </span>
                        <h4 className="font-display text-base font-bold text-text-primary group-hover:text-accent-violet transition-colors line-clamp-2">
                          {b.title}
                        </h4>
                        <p className="font-serif text-xs text-text-secondary line-clamp-2 mt-1">
                          {b.summary}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {(activeTab === 'All' || activeTab === 'Reviews') && results.reviews.length > 0 && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent-gold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-gold" />
                  Hardware & Software Reviews ({results.reviews.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.reviews.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/reviews#${r.slug}`}
                      className="group p-5 rounded-2xl bg-bg-card border border-border-subtle hover:border-accent-gold/40 transition-all flex gap-4"
                    >
                      <div className="w-28 h-24 relative rounded-xl overflow-hidden shrink-0 bg-black">
                        <Image src={r.heroImage} alt={r.product} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-accent-gold uppercase mb-1 block">
                            {r.category} &bull; {r.price}
                          </span>
                          <span className="font-display text-base font-black text-accent-gold">
                            {r.score}/10
                          </span>
                        </div>
                        <h4 className="font-display text-base font-bold text-text-primary group-hover:text-accent-gold transition-colors line-clamp-1">
                          {r.product}
                        </h4>
                        <p className="font-serif text-xs text-text-secondary line-clamp-2 mt-1">
                          {r.verdict}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-base py-20 text-center font-mono text-xs text-text-secondary">LOADING DATABASE INDEX...</div>}>
      <SearchComponent />
    </Suspense>
  );
}
