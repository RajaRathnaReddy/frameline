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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {businessStats.map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 0.1}>
            <div className="glass-card rounded-lg p-6 text-center group hover:border-accent-gold/40 transition-all hover:bg-bg-card relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="text-meta text-[9px] px-2 py-0.5 rounded bg-accent-gold/10 text-accent-gold border border-accent-gold/20">
                  {item.change}
                </span>
              </div>
              <div className="text-fluid-h1 font-display font-black text-accent-gold mb-2 tracking-tight">
                <CountUp
                  target={item.target}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  duration={1.5}
                />
              </div>
              <h4 className="font-display font-semibold text-text-primary text-sm mb-1.5">
                {item.label}
              </h4>
              <p className="text-text-secondary/70 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
