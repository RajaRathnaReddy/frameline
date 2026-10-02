'use client';

import { AffiliateOffer, PARTNER_CONTACT } from '@/lib/affiliates';
import { getCategoryColor } from '@/lib/utils';

interface IndustrySponsorCardProps {
  offer: AffiliateOffer;
  category: string;
  className?: string;
}

export default function IndustrySponsorCard({
  offer,
  category,
  className = '',
}: IndustrySponsorCardProps) {
  const accentColor = getCategoryColor(category);

  return (
    <div
      className={`my-12 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-bg-card via-bg-elevated to-bg-card border border-white/10 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-white/20 ${className}`}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none transition-opacity duration-500 group-hover:opacity-25"
        style={{ backgroundColor: accentColor }}
      />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-white/[0.08] relative z-10 flex-wrap">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-text-primary">
            FEATURED INDUSTRY PIPELINE PARTNER
          </span>
        </div>

        <span
          className="font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border shadow-sm"
          style={{
            color: accentColor,
            borderColor: `${accentColor}40`,
            backgroundColor: `${accentColor}15`,
          }}
        >
          {offer.badge}
        </span>
      </div>

      {/* Content Grid */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-3xl shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
            {offer.logo}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-display text-xl md:text-2xl font-black text-text-primary tracking-tight">
                {offer.name}
              </h3>
              <span className="text-text-secondary/40 font-mono text-xs">by {offer.company}</span>
              <div className="flex items-center gap-1 font-mono text-xs text-accent-gold ml-1">
                <span>★</span>
                <span>{offer.rating}</span>
              </div>
            </div>

            <p className="font-serif text-sm md:text-base text-text-secondary leading-relaxed mb-2 max-w-xl">
              {offer.headline}
            </p>

            <p className="font-mono text-xs text-text-secondary/80 flex items-center gap-1.5">
              <span className="text-accent-lime">✓</span>
              <span>{offer.perk}</span>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 w-full md:w-auto flex flex-col items-stretch md:items-end gap-2 pt-2 md:pt-0">
          <a
            href={offer.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="px-6 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-center group/btn"
            style={{
              backgroundColor: accentColor || 'var(--accent-primary)',
              boxShadow: `0 8px 24px ${accentColor || '#E50914'}35`,
            }}
          >
            <span>{offer.ctaText}</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <span className="text-[10px] font-mono text-text-secondary/60 text-center md:text-right">
            {offer.pricing}
          </span>
        </div>
      </div>

      {/* FTC Disclosure & Direct Partner Inquiries */}
      <div className="mt-5 pt-3 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] font-mono text-text-secondary/50">
        <div>
          <span>FRAMELINE is reader-supported ({offer.network}). Commission earned on verified licenses.</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${PARTNER_CONTACT.email}?subject=FRAMELINE%20Sponsorship%20Inquiry`}
            className="hover:text-accent-gold transition-colors text-text-secondary/70 flex items-center gap-1"
          >
            <span>✉</span>
            <span>{PARTNER_CONTACT.email}</span>
          </a>
          <span>&bull;</span>
          <a
            href={PARTNER_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-lime transition-colors text-text-secondary/70 flex items-center gap-1"
          >
            <span>📱</span>
            <span>{PARTNER_CONTACT.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
