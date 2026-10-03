import { rajaRathnaReddy } from '@/lib/data';
import Image from 'next/image';
import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/config';

export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
  description: `${SITE_NAME} is the premium news platform for film technology, visual effects, AI in cinema, and virtual production.`,
};

export default function AboutPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="max-w-3xl mx-auto">
        <span className="text-meta text-accent-primary mb-3 block">ABOUT</span>
        <h1 className="text-fluid-h1 font-display text-text-primary mb-6">
          Built for the frame-by-frame obsessed.
        </h1>
        <div className="text-body text-text-secondary space-y-6 mb-16">
          <p>
            {SITE_NAME} is the premier destination for news and analysis at the intersection of filmmaking and technology. We cover the tools, techniques, and talent shaping the future of visual storytelling — from AI-powered post-production to virtual production stages, from indie VFX breakthroughs to Hollywood&apos;s biggest technical achievements.
          </p>
          <p>
            Founded in 2024, we&apos;ve quickly become the go-to source for VFX supervisors, directors, editors, colorists, and technology leaders who need to stay ahead of a rapidly evolving industry.
          </p>
          <p>
            Our editorial team combines decades of hands-on production experience with deep technical knowledge, ensuring that every story we publish is informed, nuanced, and actionable.
          </p>
          <p className="text-sm text-text-secondary/80 italic border-l-2 border-accent-gold/40 pl-4 py-1">
            Opinions on this site are personal and do not represent any employer or company.
          </p>
        </div>

        <h2 className="text-meta text-accent-gold mb-8 flex items-center gap-2">
          <span>EDITORIAL & TECHNICAL DIRECTION</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
        </h2>

        <div className="glass-card rounded-2xl p-8 border border-white/10 bg-bg-card/60 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-accent-gold/40 shadow-xl shadow-black/80">
                <Image
                  src={rajaRathnaReddy.avatar}
                  alt={rajaRathnaReddy.name}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-accent-gold text-bg-base font-mono text-[9px] font-bold">
                LEAD TD
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <h3 className="font-display text-2xl font-bold text-text-primary tracking-tight">
                  {rajaRathnaReddy.name}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded bg-accent-gold/15 text-accent-gold border border-accent-gold/30 font-bold">
                  DNEG · ReDefine
                </span>
              </div>

              <p className="font-mono text-xs text-accent-cyan font-medium mb-3">
                {rajaRathnaReddy.role}
              </p>

              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Technical Director with 8+ years of production experience managing FX pipelines, tool automation, and render farm optimization for high-volume delivery. Key production credits include <em>Toxic</em> (2026), <em>The Boys</em> (2026/2024), <em>Kalki 2898 AD</em> (FX Lead), <em>The Penguin</em>, <em>Borderlands</em>, and <em>Brahmāstra</em>. Specialized in Houdini VEX, OpenUSD, Python APIs, n8n studio orchestration, and local privacy-first AI systems.
              </p>

              {/* Direct Portfolio & Credentials Link Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/[0.08]">
                <a
                  href={rajaRathnaReddy.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-2 rounded-lg bg-white/5 hover:bg-accent-primary/20 text-text-primary hover:text-accent-primary border border-white/10 hover:border-accent-primary/40 transition-all font-semibold"
                >
                  <span>🌐</span>
                  <span>Portfolio</span>
                </a>
                <a
                  href="https://www.instagram.com/raja_rathna_reddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-2 rounded-lg bg-pink-500/15 hover:bg-pink-500/25 text-pink-300 hover:text-white border border-pink-500/40 transition-all font-bold"
                >
                  <svg className="w-3.5 h-3.5 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/RAJARATNAREDDY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-2 rounded-lg bg-blue-600/15 hover:bg-blue-600/25 text-blue-300 hover:text-white border border-blue-500/40 transition-all font-bold"
                >
                  <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                <a
                  href={rajaRathnaReddy.imdb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-2 rounded-lg bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold border border-accent-gold/30 transition-all font-bold"
                >
                  <span>🎬</span>
                  <span>IMDb Profile</span>
                </a>
                <a
                  href={rajaRathnaReddy.filmographyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary border border-white/10 transition-all"
                >
                  <span>🎥</span>
                  <span>Filmography</span>
                </a>
                <a
                  href={rajaRathnaReddy.codingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-accent-cyan border border-white/10 transition-all"
                >
                  <span>💻</span>
                  <span>USD & Code</span>
                </a>
                <a
                  href={rajaRathnaReddy.automationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-accent-lime border border-white/10 transition-all"
                >
                  <span>⚙️</span>
                  <span>Automation</span>
                </a>
                <a
                  href={rajaRathnaReddy.contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary border border-white/10 transition-all"
                >
                  <span>✉️</span>
                  <span>Contact</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
