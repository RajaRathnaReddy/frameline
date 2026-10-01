'use client';

import Image from 'next/image';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { industryQuotes } from '@/lib/data';

export default function OpinionInterviews() {
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
              Directors, VFX supervisors, and studio heads on where compute meets craft in late 2026.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industryQuotes.map((opinion) => (
            <StaggerItem key={opinion.author}>
              <div className="glass-card rounded-lg p-6 h-full flex flex-col group hover:border-accent-primary/40 transition-all hover:bg-bg-card">
                {/* Quote Mark */}
                <div className="text-4xl text-accent-primary/40 font-serif leading-none mb-3 font-bold">“</div>

                {/* Quote */}
                <blockquote className="text-text-primary font-serif text-base leading-relaxed flex-1 mb-6 italic">
                  "{opinion.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-border-subtle">
                    <Image
                      src={opinion.image}
                      alt={opinion.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-text-primary text-sm truncate">
                      {opinion.author}
                    </div>
                    <div className="text-meta text-text-secondary/70 text-[10px] leading-tight line-clamp-2">
                      {opinion.role}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
