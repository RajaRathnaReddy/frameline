'use client';

import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { industryQuotes } from '@/lib/data';

interface IndustryQuote {
  quote: string;
  author: string;
  role: string;
  source_url?: string;
  date?: string;
  verified?: boolean;
}

export default function OpinionInterviews() {
  // Task 6: Only display quotes that have verified source URLs and exact dates.
  const verifiedQuotes = (industryQuotes as IndustryQuote[]).filter(
    (q) => q.source_url && q.verified
  );

  // If fewer than 3 verified quotes remain, hide the whole "Opinion & Dispatches" section.
  if (verifiedQuotes.length < 3) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section className="bg-bg-elevated py-16 md:py-24 border-y border-border-subtle" id="opinions">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-meta text-accent-primary">SCENE 10 / TAKE 01</span>
            <span className="text-meta text-text-secondary/30">—</span>
            <h2 className="text-meta text-text-secondary">OPINION & DISPATCHES</h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <h3 className="text-fluid-h2 font-display text-text-primary">
              Perspectives From The Trenches
            </h3>
            <p className="text-text-secondary text-sm max-w-md">
              Verified industry commentary on where compute meets craft.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedQuotes.map((opinion) => (
            <StaggerItem key={opinion.author}>
              <div className="glass-card rounded-lg p-6 h-full flex flex-col group hover:border-accent-primary/40 transition-all hover:bg-bg-card">
                {/* Quote Mark */}
                <div className="text-4xl text-accent-primary/40 font-serif leading-none mb-3 font-bold">“</div>

                {/* Quote */}
                <blockquote className="text-text-primary font-serif text-base leading-relaxed flex-1 mb-6 italic">
                  "{opinion.quote}"
                </blockquote>

                {/* Author with neutral initials circle */}
                <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-accent-cyan">
                      {getInitials(opinion.author)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-display font-semibold text-text-primary text-sm truncate">
                        {opinion.author}
                      </div>
                      <div className="text-meta text-text-secondary/70 text-[10px] leading-tight line-clamp-1">
                        {opinion.role}
                      </div>
                    </div>
                  </div>
                  {opinion.source_url && (
                    <a
                      href={opinion.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-accent-cyan hover:underline ml-2 shrink-0"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
