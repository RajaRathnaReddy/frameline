import { rajaRathnaReddy } from '@/lib/data';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — FRAMELINE',
  description: 'FRAMELINE is the premium news platform for film technology, visual effects, AI in cinema, and virtual production.',
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
            FRAMELINE is the premier destination for news and analysis at the intersection of filmmaking and technology. We cover the tools, techniques, and talent shaping the future of visual storytelling — from AI-powered post-production to virtual production stages, from indie VFX breakthroughs to Hollywood&apos;s biggest technical achievements.
          </p>
          <p>
            Founded in 2024, we&apos;ve quickly become the go-to source for VFX supervisors, directors, editors, colorists, and technology leaders who need to stay ahead of a rapidly evolving industry.
          </p>
          <p>
            Our editorial team combines decades of hands-on production experience with deep technical knowledge, ensuring that every story we publish is informed, nuanced, and actionable.
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
