'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/config';

export default function AdvertisePage() {
  const [requestedKit, setRequestedKit] = useState(false);

  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="border-b border-white/[0.08] pb-8 mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-gold px-2.5 py-1 rounded bg-accent-gold/10 border border-accent-gold/30 inline-block mb-3">
            PARTNERSHIPS & MEDIA KIT
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-text-primary tracking-tight uppercase">
            Partner With {SITE_NAME}
          </h1>
          <p className="font-serif text-lg md:text-xl text-text-secondary max-w-3xl mt-3">
            Connect with industry decision-makers across film production, VFX pipelines, 
            cinematography, and emerging media technology.
          </p>
        </div>

        {/* Focus Areas Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle text-center">
            <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
              EDITORIAL PILLAR
            </span>
            <div className="font-display text-2xl md:text-3xl font-black text-text-primary">
              Virtual Production
            </div>
            <span className="font-mono text-[11px] text-accent-cyan mt-1 block">
              In-Camera VFX &amp; LED Stages
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle text-center">
            <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
              EDITORIAL PILLAR
            </span>
            <div className="font-display text-2xl md:text-3xl font-black text-accent-primary">
              AI in Cinema
            </div>
            <span className="font-mono text-[11px] text-text-secondary mt-1 block">
              Generative Models &amp; Provenance
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle text-center">
            <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
              EDITORIAL PILLAR
            </span>
            <div className="font-display text-2xl md:text-3xl font-black text-accent-gold">
              VFX Pipeline
            </div>
            <span className="font-mono text-[11px] text-text-secondary mt-1 block">
              OpenUSD, Compositing &amp; 3D
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle text-center">
            <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
              EDITORIAL PILLAR
            </span>
            <div className="font-display text-2xl md:text-3xl font-black text-accent-lime">
              Film Tools
            </div>
            <span className="font-mono text-[11px] text-text-secondary mt-1 block">
              Software, Hardware &amp; Compute
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
                  Weekly Briefing
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  The Weekly Dispatch
                </h3>
                <p className="font-serif text-sm text-text-secondary mb-6">
                  Exclusive header banner + native editorial spotlight delivered directly to cinema technologists, supervisors, and studio engineers.
                </p>
                <ul className="space-y-2 font-mono text-xs text-text-secondary">
                  <li>&bull; Sole Presenting Sponsor per edition</li>
                  <li>&bull; Contextual alignment with lead dispatch</li>
                  <li>&bull; Full delivery telemetry report</li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="font-mono text-xs text-white font-bold">Custom Package</span>
                <span className="font-mono text-[11px] text-accent-primary">Direct Placement</span>
              </div>
            </div>

            {/* Homepage Takeover */}
            <div className="p-8 rounded-2xl bg-bg-card border border-accent-gold/40 flex flex-col justify-between shadow-xl shadow-gold/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent-gold text-black font-mono text-[10px] font-bold px-3 py-1 uppercase rounded-bl-lg">
                High Impact
              </div>
              <div>
                <span className="font-mono text-xs uppercase text-accent-gold font-bold block mb-2">
                  Homepage Placement
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Cinematic Hero Feature
                </h3>
                <p className="font-serif text-sm text-text-secondary mb-6">
                  Full 2.39:1 letterboxed billboard unit across the top of {SITE_NAME} desktop and mobile, with interactive click-through to your product launch or architecture demo.
                </p>
                <ul className="space-y-2 font-mono text-xs text-text-secondary">
                  <li>&bull; Prime visibility on Home</li>
                  <li>&bull; Dedicated partner badge styling</li>
                  <li>&bull; Interactive media supported</li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="font-mono text-xs text-white font-bold">Custom Package</span>
                <span className="font-mono text-[11px] text-accent-gold">Direct Placement</span>
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
                  Prominent placement in the VFX &amp; AI Tool Directory, verified studio partner badge, and direct lead generation buttons linking to your trial or enterprise pipeline contact.
                </p>
                <ul className="space-y-2 font-mono text-xs text-text-secondary">
                  <li>&bull; Pinned in relevant category</li>
                  <li>&bull; Custom CTA buttons on profile</li>
                  <li>&bull; Contextual links from reviews</li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="font-mono text-xs text-white font-bold">Custom Package</span>
                <span className="font-mono text-[11px] text-accent-lime">Direct Placement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Media Kit Download CTA */}
        <div className="p-10 rounded-3xl bg-bg-elevated border border-border-subtle text-center max-w-2xl mx-auto shadow-2xl">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase mb-3">
            Request {SITE_NAME} Media Kit
          </h3>
          <p className="font-serif text-sm text-text-secondary mb-6">
            Get editorial calendar outlines, format specifications, and partnership guidelines.
          </p>

          {requestedKit ? (
            <div className="p-4 rounded-xl bg-accent-gold/10 border border-accent-gold/30 text-accent-gold font-mono text-xs">
              ✓ Media Kit PDF dispatched to our partnership team. We will connect shortly.
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

        {/* Direct Executive Partnership Contacts */}
        <div className="mt-12 p-8 md:p-10 rounded-3xl bg-bg-card border border-white/10 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan block mb-1">
                DIRECT PARTNERSHIP DESK
              </span>
              <h3 className="font-display text-2xl font-black text-text-primary">
                Commercial Partnerships &amp; Media Inquiries
              </h3>
              <p className="font-serif text-sm text-text-secondary mt-1 max-w-xl">
                For custom brand integrations, sponsored pipeline breakdowns, or tool directory listings, contact Raja Rathna Reddy directly:
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <a
                href={`mailto:vfx@rajarathnareddy.com?subject=${encodeURIComponent(SITE_NAME + ' Advertising & Partnership')}`}
                className="px-5 py-3 rounded-xl bg-accent-gold text-black font-mono text-xs uppercase font-bold text-center hover:bg-accent-gold/90 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>✉ Email Desk</span>
              </a>
              <a
                href="https://www.instagram.com/raja_rathna_reddy"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-400 hover:text-pink-300 font-mono text-xs uppercase font-bold text-center border border-pink-500/30 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/RAJARATNAREDDY"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 hover:text-blue-300 font-mono text-xs uppercase font-bold text-center border border-blue-500/30 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-text-secondary/70">
            <span>Partnership Desks: Los Angeles &bull; London &bull; Vancouver</span>
            <span>Social: @raja_rathna_reddy &bull; @RAJARATNAREDDY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
