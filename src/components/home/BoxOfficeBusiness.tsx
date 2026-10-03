'use client';

import { ScrollReveal, CountUp } from '@/components/motion';
import { businessStats } from '@/lib/data';

export default function BoxOfficeBusiness() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24" id="business">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-meta text-accent-gold">SCENE 09 / TAKE 01</span>
          <span className="text-meta text-text-secondary/30">—</span>
          <h2 className="text-meta text-text-secondary">BOX OFFICE & BUSINESS</h2>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <h3 className="text-fluid-h2 font-display text-text-primary">
            Numbers That Move the Industry
          </h3>
          <p className="text-text-secondary text-sm max-w-md">
            Capital flows, compute ratios, and acquisitions defining Hollywood’s next fiscal landscape.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {businessStats.map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 0.1}>
            <div className="glass-card rounded-xl p-8 text-center group hover:border-accent-gold/40 transition-all hover:bg-bg-card relative overflow-hidden h-full flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-meta text-[10px] text-text-secondary/60 uppercase font-mono">
                  VERIFIED TRANSACTION
                </span>
                <span className="text-meta text-[9px] px-2 py-0.5 rounded bg-accent-gold/10 text-accent-gold border border-accent-gold/20 font-bold">
                  {item.change}
                </span>
              </div>
              <div className="text-fluid-h1 font-display font-black text-accent-gold mb-3 tracking-tight">
                <CountUp
                  target={item.target}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  duration={1.5}
                />
              </div>
              <div>
                <h4 className="font-display font-bold text-text-primary text-base mb-1.5">
                  {item.label}
                </h4>
                <p className="text-text-secondary/80 text-xs leading-relaxed max-w-sm mx-auto">
                  {item.desc}
                </p>
              </div>
              {item.sourceUrl && (
                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-meta text-[10px] text-accent-cyan hover:underline font-mono"
                  >
                    View Official Source ↗
                  </a>
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
