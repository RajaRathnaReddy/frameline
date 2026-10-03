'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getIndustrySponsors } from '@/lib/data';
import { ScrollReveal } from '@/components/motion';
import SponsoredBlock, { SponsoredBadge } from '@/components/common/SponsoredBlock';

export default function SponsoredIndustrySpotlight() {
  const sponsors = getIndustrySponsors();
  const primarySponsor = sponsors[0];
  const secondarySponsors = sponsors.slice(1);

  if (!primarySponsor) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-8" id="industry-spotlight">
      <ScrollReveal>
        <SponsoredBlock>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-r from-bg-card via-bg-elevated to-bg-card p-6 md:p-8 pt-12 md:pt-10 shadow-2xl">
            {/* Subtle Ambient Glow */}
            <div
              className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
              style={{ backgroundColor: primarySponsor.accentColor }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Content */}
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-white/5 border border-white/15 text-text-secondary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primarySponsor.accentColor }} />
                    {primarySponsor.badge}
                  </span>
                  <span className="text-text-secondary/30 font-mono text-xs">—</span>
                  <span className="font-mono text-[11px] text-text-secondary uppercase tracking-wider">
                    {primarySponsor.category}
                  </span>
                </div>

                <h3 className="text-fluid-h3 font-display font-bold text-text-primary mb-2">
                  {primarySponsor.name}
                  <span className="text-text-secondary font-normal font-serif text-lg md:text-xl block mt-1">
                    {primarySponsor.tagline}
                  </span>
                </h3>

                <p className="text-text-secondary text-sm md:text-base font-serif leading-relaxed mb-4 max-w-2xl">
                  {primarySponsor.description}
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href={primarySponsor.ctaUrl}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 group hover:scale-[1.02]"
                    style={{
                      backgroundColor: `${primarySponsor.accentColor}20`,
                      color: primarySponsor.accentColor,
                      border: `1px solid ${primarySponsor.accentColor}50`,
                    }}
                  >
                    {primarySponsor.ctaText}
                  </Link>

                  <SponsoredBadge />
                </div>
              </div>

            {/* Right Mini Partner Rail */}
            <div className="lg:w-80 shrink-0 flex flex-col gap-3 pt-4 lg:pt-0 lg:border-l lg:border-white/10 lg:pl-6">
              <span className="text-meta text-[10px] text-text-secondary/50 font-mono tracking-widest">
                MORE TRADE BRIEFS
              </span>
              {secondarySponsors.map((sec) => (
                <Link
                  key={sec.id}
                  href={sec.ctaUrl}
                  className="p-3 rounded-lg border border-white/5 bg-black/30 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-semibold text-xs text-text-primary group-hover:text-accent-primary transition-colors">
                      {sec.name}
                    </span>
                    <span className="text-[10px] font-mono text-text-secondary/50">
                      {sec.category.split('/')[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary font-serif line-clamp-1">
                    {sec.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SponsoredBlock>
    </ScrollReveal>
    </section>
  );
}
