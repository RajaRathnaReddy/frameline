'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { categories, articles, searchAll, getArticlesByCategory } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import RenderLineLogo from '@/components/common/RenderLineLogo';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryHover, setActiveCategoryHover] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const primaryCategories = categories.slice(0, 4);
  const secondaryCategories = categories.slice(4);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const searchResults = searchAll(searchQuery);
  const hasResults =
    searchResults.articles.length > 0 ||
    searchResults.tools.length > 0 ||
    searchResults.reviews.length > 0 ||
    searchResults.breakdowns.length > 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleMouseEnterCategory = (slug: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    enterTimeoutRef.current = setTimeout(() => {
      setActiveCategoryHover(slug);
    }, 140);
  };

  const handleMouseLeaveCategory = () => {
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveCategoryHover(null);
    }, 180);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-40 w-full max-w-full transition-all duration-300 ${
          scrolled
            ? 'bg-bg-base/95 backdrop-blur-xl shadow-xl shadow-black/80 border-b border-border-subtle'
            : 'bg-bg-base/90 backdrop-blur-md border-b border-white/[0.06]'
        }`}
        onMouseLeave={handleMouseLeaveCategory}
      >
        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between relative">
          {/* Logo / Brand Identity - completely protected from shrinkage and wrapping */}
          <div className="flex items-center shrink-0 pr-3 sm:pr-4 xl:pr-6 z-10">
            <RenderLineLogo size="md" />
          </div>

          {/* Center Nav (Desktop) - Adaptive 2-Tier Hierarchy */}
          <div className="hidden min-[1180px]:flex items-center justify-center gap-1 xl:gap-1.5 flex-1 min-w-0 px-1 xl:px-3">
            {/* Primary Categories (Visible on all Desktop viewports) */}
            {primaryCategories.map((cat) => (
              <div
                key={cat.slug}
                className="relative py-2 shrink-0"
                onMouseEnter={() => handleMouseEnterCategory(cat.slug)}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 font-mono text-[10px] xl:text-[11px] uppercase tracking-wider px-2 xl:px-2.5 py-1.5 rounded-lg transition-all duration-200 text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent hover:border-white/10 whitespace-nowrap ${
                    activeCategoryHover === cat.slug ? 'text-text-primary bg-white/10 border-white/15' : ''
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  {cat.slug === 'vfx' ? (
                    <>
                      <span className="min-[1680px]:inline hidden">VFX & Pipeline</span>
                      <span className="min-[1680px]:hidden inline">VFX</span>
                    </>
                  ) : cat.slug === 'tools' ? (
                    <>
                      <span className="min-[1680px]:inline hidden">Film Tools</span>
                      <span className="min-[1680px]:hidden inline">Tools</span>
                    </>
                  ) : cat.slug === 'ai' ? (
                    <>
                      <span className="min-[1680px]:inline hidden">AI in Film</span>
                      <span className="min-[1680px]:hidden inline">AI</span>
                    </>
                  ) : (
                    cat.name
                  )}
                </Link>
              </div>
            ))}

            {/* Secondary Categories (Visible on 1600px+ screens, cleanly folded into "More" on viewports < 1600px) */}
            {secondaryCategories.map((cat) => (
              <div
                key={cat.slug}
                className="relative py-2 shrink-0 hidden min-[1600px]:block"
                onMouseEnter={() => handleMouseEnterCategory(cat.slug)}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 font-mono text-[10px] 2xl:text-[11px] uppercase tracking-wider px-2 2xl:px-2.5 py-1.5 rounded-lg transition-all duration-200 text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent hover:border-white/10 whitespace-nowrap ${
                    activeCategoryHover === cat.slug ? 'text-text-primary bg-white/10 border-white/15' : ''
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  {cat.slug === 'virtual-production' ? (
                    <>
                      <span className="min-[1680px]:inline hidden">Virtual Production</span>
                      <span className="min-[1680px]:hidden inline">Virtual Prod</span>
                    </>
                  ) : cat.slug === 'music' ? (
                    <>
                      <span className="min-[1680px]:inline hidden">Sound & Music</span>
                      <span className="min-[1680px]:hidden inline">Sound</span>
                    </>
                  ) : (
                    cat.name
                  )}
                </Link>
              </div>
            ))}

            {/* On viewports < 1600px: Sleek "More" Dropdown combining Secondary Categories + Features */}
            <div className="relative py-2 shrink-0 group min-[1600px]:hidden">
              <button
                type="button"
                className="flex items-center gap-1 font-mono text-[10px] xl:text-[11px] uppercase tracking-wider px-2.5 py-1.5 rounded-lg transition-all duration-200 text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent hover:border-white/10 whitespace-nowrap cursor-pointer"
              >
                <span>More</span>
                <svg className="w-3 h-3 text-text-secondary/60 group-hover:text-text-primary transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute right-0 top-full pt-1 hidden group-hover:block z-50 min-w-[220px]">
                <div className="p-2 bg-[#0B0D13] border border-border-subtle rounded-xl shadow-2xl flex flex-col gap-1">
                  <div className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-text-secondary/50 font-bold">
                    Production Pillars
                  </div>
                  {secondaryCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      <span>{cat.name}</span>
                    </Link>
                  ))}

                  <div className="h-px bg-white/[0.08] my-1" />

                  <div className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-text-secondary/50 font-bold">
                    Features & Formats
                  </div>
                  <Link
                    href="/breakdowns"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-text-secondary hover:text-accent-violet hover:bg-white/5 transition-colors"
                  >
                    <span>Breakdowns</span>
                    <span className="text-[9px] text-accent-violet font-semibold">Deep Dive</span>
                  </Link>
                  <Link
                    href="/reviews"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-text-secondary hover:text-accent-gold hover:bg-white/5 transition-colors"
                  >
                    <span>Reviews</span>
                    <span className="text-[9px] text-accent-gold font-semibold">Hands-on</span>
                  </Link>
                  <Link
                    href="/tools"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-text-secondary hover:text-accent-lime hover:bg-white/5 transition-colors"
                  >
                    <span>Tools Matrix</span>
                    <span className="text-[9px] text-accent-lime font-semibold">Database</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* On wide viewports (1600px+): Dedicated Features Dropdown */}
            <div className="relative py-2 shrink-0 group hidden min-[1600px]:block">
              <button
                type="button"
                className="flex items-center gap-1 font-mono text-[10px] 2xl:text-[11px] uppercase tracking-wider px-2 2xl:px-2.5 py-1.5 rounded-lg transition-all duration-200 text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent hover:border-white/10 whitespace-nowrap cursor-pointer"
              >
                <span>Features</span>
                <svg className="w-3 h-3 text-text-secondary/60 group-hover:text-text-primary transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute right-0 top-full pt-1 hidden group-hover:block z-50 min-w-[200px]">
                <div className="p-2 bg-[#0B0D13] border border-border-subtle rounded-xl shadow-2xl flex flex-col gap-1">
                  <Link
                    href="/breakdowns"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-text-secondary hover:text-accent-violet hover:bg-white/5 transition-colors"
                  >
                    <span>Breakdowns</span>
                    <span className="text-[9px] text-accent-violet font-semibold">Deep Dive</span>
                  </Link>
                  <Link
                    href="/reviews"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-text-secondary hover:text-accent-gold hover:bg-white/5 transition-colors"
                  >
                    <span>Reviews</span>
                    <span className="text-[9px] text-accent-gold font-semibold">Hands-on</span>
                  </Link>
                  <Link
                    href="/tools"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-text-secondary hover:text-accent-lime hover:bg-white/5 transition-colors"
                  >
                    <span>Tools Matrix</span>
                    <span className="text-[9px] text-accent-lime font-semibold">Database</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0 pl-3 sm:pl-4 xl:pr-0 z-10">
            {/* Search Trigger */}
            <button
              onClick={() => {
                setSearchOpen(true);
                setSearchQuery('');
              }}
              className="flex items-center gap-1.5 xl:gap-2 text-meta text-text-secondary hover:text-text-primary transition-colors px-2 sm:px-2.5 xl:px-3 py-1.5 rounded-lg border border-border-subtle/60 hover:border-border-subtle bg-bg-card/40 hover:bg-bg-card/80 shrink-0"
              aria-label="Search site"
            >
              <svg className="w-4 h-4 text-accent-cyan shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <span className="hidden xl:inline text-xs text-text-secondary">Search</span>
              <kbd className="hidden min-[1680px]:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-text-secondary/80 border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* AI Studio Trigger */}
            <Link
              href="/studio"
              className="flex items-center gap-1.5 font-mono text-[10px] xl:text-[11px] uppercase tracking-wider px-2.5 xl:px-3 py-1.5 rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan font-bold transition-all shadow-sm shadow-accent-cyan/10 group whitespace-nowrap shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse group-hover:scale-125 transition-transform shrink-0" />
              <span>AI Studio</span>
            </Link>

            {/* Subscribe Button */}
            <Link
              href="/newsletter"
              className="hidden sm:flex items-center gap-1.5 xl:gap-2 bg-accent-primary hover:bg-accent-primary/90 !text-white px-3 xl:px-3.5 py-1.5 rounded-full transition-all duration-300 font-mono text-[10px] xl:text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-accent-primary/25 border border-white/25 hover:border-white/50 hover:scale-[1.02] select-none whitespace-nowrap shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-sm shadow-white shrink-0" />
              <span className="!text-white font-bold tracking-wider">Subscribe</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="min-[1180px]:hidden flex flex-col justify-center items-center gap-1.5 p-2 rounded-lg bg-bg-card/40 border border-border-subtle shrink-0 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <motion.span
                className="block w-5 h-0.5 bg-text-primary"
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-0.5 bg-text-primary"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-0.5 bg-text-primary"
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown on Category Hover - Solid 100% Opaque Obsidian Background */}
        <AnimatePresence>
          {activeCategoryHover && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="hidden min-[1180px]:block absolute left-0 right-0 top-16 bg-[#0B0D13] border-b border-border-subtle shadow-2xl shadow-black/95 z-50"
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
              }}
              onMouseLeave={handleMouseLeaveCategory}
            >
              <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-8 py-6">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan font-bold">
                      Scene / {activeCategoryHover.toUpperCase().replace(/-/g, ' ')}
                    </span>
                    <span className="text-text-secondary/40">&bull;</span>
                    <span className="text-xs text-text-secondary">Latest Stories & Intelligence</span>
                  </div>
                  <Link
                    href={`/category/${activeCategoryHover}`}
                    onClick={() => setActiveCategoryHover(null)}
                    className="text-xs font-mono text-accent-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    View All {activeCategoryHover.toUpperCase().replace(/-/g, ' ')} &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {getArticlesByCategory(activeCategoryHover).slice(0, 3).map((art) => (
                    <Link
                      key={art.slug}
                      href={`/article/${art.slug}`}
                      onClick={() => setActiveCategoryHover(null)}
                      className="group flex gap-4 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-border-subtle transition-all duration-300"
                    >
                      <div className="w-24 h-16 shrink-0 relative rounded-lg overflow-hidden bg-bg-card">
                        <Image
                          src={art.heroImage}
                          alt={art.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-display text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent-cyan transition-colors">
                          {art.title}
                        </h4>
                        <span className="text-[10px] font-mono text-text-secondary mt-1">
                          {art.readTime} MIN READ
                        </span>
                      </div>
                    </Link>
                  ))}
                  {getArticlesByCategory(activeCategoryHover).length === 0 && (
                    <div className="col-span-3 py-4 text-center text-text-secondary text-sm">
                      Check our comprehensive news archive for updates in this category.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="min-[1180px]:hidden overflow-hidden border-t border-border-subtle bg-bg-elevated/98 backdrop-blur-2xl"
            >
              <div className="p-5 flex flex-col gap-2">
                <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase px-3 pt-2">
                  Sections
                </span>
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="text-meta text-text-secondary hover:text-text-primary py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <div className="h-px bg-white/[0.06] my-2" />

                <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase px-3">
                  Intelligence & Database
                </span>
                <div className="grid grid-cols-2 gap-1">
                  <Link
                    href="/breakdowns"
                    onClick={() => setMobileOpen(false)}
                    className="text-meta text-text-secondary hover:text-text-primary py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    VFX Breakdowns
                  </Link>
                  <Link
                    href="/reviews"
                    onClick={() => setMobileOpen(false)}
                    className="text-meta text-text-secondary hover:text-text-primary py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Product Reviews
                  </Link>
                  <Link
                    href="/tools"
                    onClick={() => setMobileOpen(false)}
                    className="text-meta text-text-secondary hover:text-text-primary py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Tool Directory
                  </Link>
                  <Link
                    href="/news"
                    onClick={() => setMobileOpen(false)}
                    className="text-meta text-text-secondary hover:text-text-primary py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    All Stories
                  </Link>
                </div>

                <div className="h-px bg-white/[0.06] my-2" />

                <div className="flex gap-2 pt-2">
                  <Link
                    href="/newsletter"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center bg-accent-primary !text-white py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-accent-primary/25 border border-white/20"
                  >
                    Subscribe to The Daily Render
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Interactive Global Search Modal (Cmd+K) */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-black/75 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="bg-bg-elevated border border-border-subtle shadow-2xl shadow-cyan-950/20 w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col max-h-[75vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Form Bar */}
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 p-4 border-b border-border-subtle bg-bg-card/60">
                <svg className="w-5 h-5 text-accent-cyan shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, tools, VFX breakdowns, reviews, AI models…"
                  className="flex-1 bg-transparent text-text-primary placeholder:text-text-secondary/60 outline-none font-display text-lg"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-text-secondary hover:text-text-primary text-xs px-2 py-1 rounded"
                  >
                    Clear
                  </button>
                )}
                <kbd className="font-mono text-text-secondary/60 px-2 py-1 rounded border border-border-subtle text-[10px] bg-white/[0.02]">
                  ESC
                </kbd>
              </form>

              {/* Live Search Results List */}
              <div className="overflow-y-auto p-4 space-y-4 flex-1">
                {searchQuery.trim() === '' ? (
                  <div className="py-8 text-center">
                    <p className="text-text-secondary text-sm">
                      Type to search across <span className="text-text-primary font-medium">articles</span>,{' '}
                      <span className="text-text-primary font-medium">software tools</span>,{' '}
                      <span className="text-text-primary font-medium">VFX breakdowns</span>, and{' '}
                      <span className="text-text-primary font-medium">camera reviews</span>.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {['Virtual Production', 'Unreal Engine 6', 'Topaz Labs', 'Nuke', 'DaVinci Resolve', 'AI Cannes'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSearchQuery(tag)}
                          className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-accent-cyan border border-white/[0.06] transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : !hasResults ? (
                  <div className="py-12 text-center">
                    <p className="text-text-primary font-display text-lg mb-1">No results found for &ldquo;{searchQuery}&rdquo;</p>
                    <p className="text-text-secondary text-xs">Try searching for &quot;Unreal&quot;, &quot;VFX&quot;, &quot;Sora&quot;, &quot;DaVinci&quot;, or &quot;Outpost&quot;.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Articles Section */}
                    {searchResults.articles.length > 0 && (
                      <div>
                        <div className="font-mono text-[10px] text-accent-cyan uppercase tracking-wider mb-2 px-1">
                          Articles ({searchResults.articles.length})
                        </div>
                        <div className="space-y-1.5">
                          {searchResults.articles.slice(0, 4).map((art) => (
                            <Link
                              key={art.slug}
                              href={`/article/${art.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group"
                            >
                              <div className="w-12 h-12 relative rounded-lg overflow-hidden shrink-0 bg-bg-card">
                                <Image src={art.heroImage} alt={art.title} fill className="object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-display text-sm font-semibold text-text-primary truncate group-hover:text-accent-cyan transition-colors">
                                  {art.title}
                                </h4>
                                <p className="text-text-secondary text-xs truncate">{art.dek}</p>
                              </div>
                              <span className="text-[10px] font-mono text-text-secondary/70 shrink-0">
                                {art.readTime}m read
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tools Section */}
                    {searchResults.tools.length > 0 && (
                      <div>
                        <div className="font-mono text-[10px] text-accent-lime uppercase tracking-wider mb-2 px-1">
                          Tools Directory ({searchResults.tools.length})
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {searchResults.tools.slice(0, 4).map((tool) => (
                            <Link
                              key={tool.slug}
                              href={`/tools/${tool.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-border-subtle/50 transition-colors group"
                            >
                              <span className="text-2xl">{tool.logo}</span>
                              <div className="flex-1 min-w-0">
                                <div className="font-display text-sm font-semibold text-text-primary group-hover:text-accent-lime transition-colors">
                                  {tool.name}
                                </div>
                                <div className="text-[11px] text-text-secondary truncate">
                                  {tool.category}{tool.version ? ` &bull; v${tool.version}` : ''}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* VFX Breakdowns Section */}
                    {searchResults.breakdowns.length > 0 && (
                      <div>
                        <div className="font-mono text-[10px] text-accent-violet uppercase tracking-wider mb-2 px-1">
                          VFX Breakdowns ({searchResults.breakdowns.length})
                        </div>
                        <div className="space-y-1.5">
                          {searchResults.breakdowns.map((b) => (
                            <Link
                              key={b.slug}
                              href={`/breakdowns#${b.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group"
                            >
                              <div className="w-12 h-12 relative rounded-lg overflow-hidden shrink-0 bg-bg-card">
                                <Image src={b.heroImage} alt={b.title} fill className="object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-display text-sm font-semibold text-text-primary truncate group-hover:text-accent-violet transition-colors">
                                  {b.title}
                                </h4>
                                <p className="text-text-secondary text-xs truncate">
                                  {b.studio} &bull; {b.shotCount} shots &bull; {b.camera}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product Reviews Section */}
                    {searchResults.reviews.length > 0 && (
                      <div>
                        <div className="font-mono text-[10px] text-accent-gold uppercase tracking-wider mb-2 px-1">
                          Hardware & Software Reviews ({searchResults.reviews.length})
                        </div>
                        <div className="space-y-1.5">
                          {searchResults.reviews.map((r) => (
                            <Link
                              key={r.slug}
                              href={`/reviews#${r.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group"
                            >
                              <div className="w-12 h-12 relative rounded-lg overflow-hidden shrink-0 bg-bg-card">
                                <Image src={r.heroImage} alt={r.product} fill className="object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-display text-sm font-semibold text-text-primary truncate group-hover:text-accent-gold transition-colors">
                                  {r.product}
                                </h4>
                                <p className="text-text-secondary text-xs truncate">{r.verdict}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="font-display text-base font-bold text-accent-gold">
                                  {r.score}
                                </span>
                                <span className="text-[10px] text-text-secondary">/10</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-border-subtle bg-bg-card/40 flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center gap-3">
                  <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">ENTER</kbd> for full search page</span>
                </div>
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setSearchOpen(false)}
                  className="text-accent-cyan hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  Full Results Page &rarr;
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
