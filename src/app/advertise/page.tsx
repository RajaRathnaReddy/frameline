'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdvertisePage() {
  const [requestedKit, setRequestedKit] = useState(false);

  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="border-b border-white/[0.08] pb-8 mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-gold px-2.5 py-1 rounded bg-accent-gold/10 border border-accent-gold/30 inline-block mb-3">
            PARTNERSHIPS & MEDIA KIT 2026/2027
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-text-primary tracking-tight uppercase">
            Partner With Frameline
          </h1>
          <p className="font-serif text-lg md:text-xl text-text-secondary max-w-3xl mt-3">
            Reach 45,000+ decision-makers across Hollywood studios, VFX powerhouses, 
            cinematography guilds, and generative media labs.
          </p>
        </div>

        {/* Audience Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle text-center">
            <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
              MONTHLY ACTIVE READERS
            </span>
            <div className="font-display text-3xl md:text-5xl font-black text-text-primary">
              185,000+
            </div>
            <span className="font-mono text-[11px] text-accent-cyan mt-1 block">
              Global Film Professionals
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle text-center">
            <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
              DAILY RENDER SUBSCRIBERS
            </span>
            <div className="font-display text-3xl md:text-5xl font-black text-accent-primary">
              42,800
            </div>
            <span className="font-mono text-[11px] text-text-secondary mt-1 block">
              48.6% Open Rate
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle text-center">
            <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
              STUDIO SUBSCRIBERS
            </span>
            <div className="font-display text-3xl md:text-5xl font-black text-accent-gold">
              85%
            </div>
            <span className="font-mono text-[11px] text-text-secondary mt-1 block">
              Top 20 VFX & Animation Studios
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle text-center">
            <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
              HARDWARE/SOFTWARE PURCHASERS
            </span>
            <div className="font-display text-3xl md:text-5xl font-black text-accent-lime">
              $140M+
            </div>
            <span className="font-mono text-[11px] text-text-secondary mt-1 block">
              Annual Tech Spend Influenced
            </span>
          </div>
        </div>

        {/* Sponsorship Tiers */}
        <div className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary mb-8">
            Available Sponsorship Placements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Newsletter Sponsor */}
            <div className="p-8 rounded-2xl bg-bg-card border border-border-subtle flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase text-accent-primary font-bold block mb-2">
                  Daily Intelligence
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  The Daily Render Newsletter
                </h3>
                <p className="font-serif text-sm text-text-secondary mb-6">
                  Exclusive header banner + 120-word native editorial spotlight delivered every weekday morning to 42,000+ senior technical directors and studio executives.
                </p>
                <ul className="space-y-2 font-mono text-xs text-text-secondary">
                  <li>&bull; Sole Presenting Sponsor per edition</li>
                  <li>&bull; High CTR (avg 6.4%)</li>
                  <li>&bull; Full tracking metrics report</li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="font-mono text-xs text-white font-bold">$3,500 / week</span>
                <span className="font-mono text-[11px] text-accent-primary">Limited Slots</span>
              </div>
            </div>

            {/* Homepage Takeover */}
            <div className="p-8 rounded-2xl bg-bg-card border border-accent-gold/40 flex flex-col justify-between shadow-xl shadow-gold/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent-gold text-black font-mono text-[10px] font-bold px-3 py-1 uppercase rounded-bl-lg">
                Most High-Impact
              </div>
              <div>
                <span className="font-mono text-xs uppercase text-accent-gold font-bold block mb-2">
                  Homepage Dominance
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Cinematic Hero Takeover
                </h3>
                <p className="font-serif text-sm text-text-secondary mb-6">
                  Full 2.39:1 letterboxed billboard unit across the top of Frameline desktop and mobile, with interactive click-through to your product launch video or demo.
                </p>
                <ul className="space-y-2 font-mono text-xs text-text-secondary">
                  <li>&bull; 100% Share of Voice on Home</li>
                  <li>&bull; 850,000+ monthly impressions</li>
                  <li>&bull; Video & interactive canvas supported</li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="font-mono text-xs text-white font-bold">$6,500 / week</span>
                <span className="font-mono text-[11px] text-accent-gold">Quarterly Bookings</span>
              </div>
            </div>

            {/* Tool Directory Verified Partner */}
            <div className="p-8 rounded-2xl bg-bg-card border border-border-subtle flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase text-accent-lime font-bold block mb-2">
                  Directory Integration
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Featured Tool Placement
                </h3>
                <p className="font-serif text-sm text-text-secondary mb-6">
                  Guaranteed top placement in the VFX & AI Tool Directory, verified studio partner badge, and direct lead generation buttons linking to your trial or sales reps.
                </p>
                <ul className="space-y-2 font-mono text-xs text-text-secondary">
                  <li>&bull; Pinned in relevant category</li>
                  <li>&bull; Custom CTA buttons on profile</li>
                  <li>&bull; Mentioned across related reviews</li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="font-mono text-xs text-white font-bold">$1,800 / month</span>
                <span className="font-mono text-[11px] text-accent-lime">Annual Tier</span>
              </div>
            </div>
          </div>
        </div>

        {/* Media Kit Download CTA */}
        <div className="p-10 rounded-3xl bg-bg-elevated border border-border-subtle text-center max-w-2xl mx-auto shadow-2xl">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase mb-3">
            Request Frameline Media Kit 2026/2027
          </h3>
          <p className="font-serif text-sm text-text-secondary mb-6">
            Get complete demographic breakdowns by job title, studio size, purchasing authority, and quarterly editorial calendar.
          </p>

          {requestedKit ? (
            <div className="p-4 rounded-xl bg-accent-gold/10 border border-accent-gold/30 text-accent-gold font-mono text-xs">
              ✓ Media Kit PDF dispatched to our partnership team. We will connect within 4 business hours.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="marketing@company.com"
                className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:border-accent-gold outline-none"
              />
              <button
                onClick={() => setRequestedKit(true)}
                className="bg-accent-gold text-black font-mono text-xs uppercase px-6 py-3 rounded-xl font-bold hover:bg-accent-gold/90 transition-colors shadow-lg shadow-gold/20"
              >
                Download Media Kit &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
