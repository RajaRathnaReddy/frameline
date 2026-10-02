'use client';

import { AffiliateOffer } from '@/lib/affiliates';
import { getCategoryColor } from '@/lib/utils';

interface IndustrySponsorSidebarProps {
  offer: AffiliateOffer;
  category: string;
}

export default function IndustrySponsorSidebar({
  offer,
  category,
}: IndustrySponsorSidebarProps) {
  const accentColor = getCategoryColor(category);

  return (
    <div className="mt-8 rounded-xl p-4 bg-bg-card border border-white/10 shadow-lg relative overflow-hidden group">
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-text-secondary/70">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          RECOMMENDED TOOL
        </span>
        <span
          className="px-1.5 py-0.5 rounded text-[9px] font-semibold border"
          style={{
            color: accentColor,
            borderColor: `${accentColor}30`,
            backgroundColor: `${accentColor}10`,
          }}
        >
          {offer.badge}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-xl shrink-0">
          {offer.logo}
        </div>
        <div>
          <h4 className="font-display text-sm font-bold text-text-primary group-hover:text-white leading-tight">
            {offer.name}
          </h4>
          <span className="text-[11px] font-mono text-text-secondary/60">
            {offer.company}
          </span>
        </div>
      </div>

      <p className="font-serif text-xs text-text-secondary leading-snug mb-3">
        {offer.headline}
      </p>

      <a
        href={offer.url}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="w-full py-2 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider text-white text-center block transition-all duration-200 hover:brightness-110 active:scale-95 shadow-md"
        style={{ backgroundColor: accentColor || 'var(--accent-primary)' }}
      >
        {offer.ctaText}
      </a>

      <div className="mt-2 text-[9px] font-mono text-text-secondary/40 text-center">
        Sponsored Studio Partner
      </div>
    </div>
  );
}
