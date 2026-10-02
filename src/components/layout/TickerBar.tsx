'use client';

import { breakingHeadlines } from '@/lib/data';

export default function TickerBar() {
  const doubled = [...breakingHeadlines, ...breakingHeadlines];

  return (
    <div className="w-full max-w-full bg-bg-base border-b border-border-subtle overflow-hidden h-9 flex items-center relative z-50">
      <div className="flex items-center gap-2 px-4 shrink-0">
        <span className="flex items-center gap-1.5 text-meta">
          <span className="relative flex h-2 w-2">
            <span className="animate-[pulse-dot_2s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary" />
          </span>
          <span className="text-accent-primary font-semibold">LIVE</span>
        </span>
      </div>
      <div className="overflow-hidden flex-1 relative group">
        <div
          className="flex whitespace-nowrap animate-[ticker_30s_linear_infinite] group-hover:[animation-play-state:paused]"
        >
          {doubled.map((headline, i) => (
            <span key={i} className="text-meta text-text-secondary mx-8 shrink-0 cursor-default">
              {headline}
              <span className="ml-8 text-border-subtle">●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
