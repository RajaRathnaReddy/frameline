'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Editorial Pitches',
    subject: '',
    message: '',
    isConfidentialTip: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="border-b border-white/[0.08] pb-8 mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-primary px-2.5 py-1 rounded bg-accent-primary/10 border border-accent-primary/30 inline-block mb-3">
            COMMUNICATIONS / NEWSROOM
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-text-primary tracking-tight uppercase">
            Contact & Editorial Tips
          </h1>
          <p className="font-serif text-lg md:text-xl text-text-secondary max-w-2xl mt-3">
            Got an industry scoop, confidential film pipeline document, or press release? 
            Reach out to our global newsrooms in Los Angeles, London, and Vancouver.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Left (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-bg-elevated border border-border-subtle shadow-xl">
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Message Dispatched to Newsroom
                  </h3>
                  <p className="font-serif text-sm text-text-secondary max-w-md mx-auto mb-6">
                    Our editorial bureau has received your transmission. Confidential tips are routed through encrypted air-gapped workstations.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-mono text-xs text-accent-primary uppercase underline"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs uppercase text-text-secondary mb-2">
                        Full Name / Alias *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Thorne"
                        className="w-full bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:border-accent-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase text-text-secondary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="editor@studio.com"
                        className="w-full bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:border-accent-primary outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs uppercase text-text-secondary mb-2">
                        Bureau Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary focus:border-accent-primary outline-none transition-colors"
                      >
                        <option>Editorial Pitches</option>
                        <option>Confidential News Tip</option>
                        <option>VFX Breakdown Submission</option>
                        <option>Hardware/Software Review Sample</option>
                        <option>Press Release & Media Relations</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase text-text-secondary mb-2">
                        Subject Line *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Breakdown pitch / Tool announcement"
                        className="w-full bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:border-accent-primary outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase text-text-secondary mb-2">
                      Transmission Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please provide context, film credits, tools involved, or embargo deadlines…"
                      className="w-full bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:border-accent-primary outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-bg-card border border-border-subtle">
                    <input
                      type="checkbox"
                      id="confidential"
                      checked={formData.isConfidentialTip}
                      onChange={(e) => setFormData({ ...formData, isConfidentialTip: e.target.checked })}
                      className="w-4 h-4 rounded text-accent-primary bg-bg-base border-border-subtle focus:ring-accent-primary"
                    />
                    <label htmlFor="confidential" className="font-mono text-xs text-text-secondary cursor-pointer">
                      Protect my identity: Treat this as an off-the-record confidential source tip.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white font-mono text-xs uppercase tracking-wider py-4 rounded-xl font-bold transition-all shadow-lg shadow-accent-primary/25 hover:scale-[1.01]"
                  >
                    Transmit to Bureau &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bureau Info Right (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Executive Contact */}
            <div className="p-6 rounded-2xl bg-bg-card border border-accent-gold/40 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-gold animate-pulse" />
                <span className="font-mono text-xs font-bold text-accent-gold uppercase tracking-wider">
                  Executive Desk & Editorial Leadership
                </span>
              </div>
              <div className="text-white font-display font-bold text-base mb-1">
                Raja Rathna Reddy
              </div>
              <div className="font-mono text-[11px] text-accent-cyan mb-4">
                FX Pipeline TD & AI Newsroom Architect
              </div>
              <div className="space-y-2.5 font-mono text-xs">
                <a
                  href="mailto:vfx@rajarathnareddy.com"
                  className="flex items-center gap-2 text-text-primary hover:text-accent-gold transition-colors p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  <span className="text-accent-gold">✉</span>
                  <span className="truncate">vfx@rajarathnareddy.com</span>
                </a>
                <a
                  href="https://www.instagram.com/raja_rathna_reddy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-primary hover:text-pink-400 transition-colors p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  <svg className="w-3.5 h-3.5 text-pink-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@raja_rathna_reddy (Instagram)</span>
                </a>
                <a
                  href="https://www.facebook.com/RAJARATNAREDDY/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-primary hover:text-blue-400 transition-colors p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>@RAJARATNAREDDY (Facebook)</span>
                </a>
              </div>
            </div>

            {/* Secure Tip Box */}
            <div className="p-6 rounded-2xl bg-bg-card border border-accent-cyan/30 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse" />
                <span className="font-mono text-xs font-bold text-accent-cyan uppercase tracking-wider">
                  Encrypted Signal Tip Line
                </span>
              </div>
              <p className="font-serif text-sm text-text-secondary mb-3">
                For highly confidential studio documents, internal roadmaps, or whistleblower leaks, message our investigative desk directly on Signal:
              </p>
              <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-accent-cyan select-all border border-accent-cyan/20">
                +1 (310) 555-FRAME &bull; @frameline.tip
              </div>
            </div>

            {/* Global Bureaus */}
            <div className="p-6 rounded-2xl bg-bg-card border border-border-subtle">
              <span className="font-mono text-xs uppercase tracking-widest text-text-secondary block mb-4">
                Global Bureau Desks
              </span>
              <div className="space-y-4 font-mono text-xs">
                <div className="pb-3 border-b border-white/[0.04]">
                  <div className="text-white font-bold mb-0.5">LOS ANGELES (HQ)</div>
                  <div className="text-text-secondary">9255 Sunset Blvd, Suite 800 &bull; West Hollywood, CA 90069</div>
                  <div className="text-text-secondary/60 text-[10px]">la@frameline.film</div>
                </div>
                <div className="pb-3 border-b border-white/[0.04]">
                  <div className="text-white font-bold mb-0.5">LONDON (VFX & POST)</div>
                  <div className="text-text-secondary">14 Wardour Street, Soho &bull; London W1D 6PJ, UK</div>
                  <div className="text-text-secondary/60 text-[10px]">london@frameline.film</div>
                </div>
                <div>
                  <div className="text-white font-bold mb-0.5">VANCOUVER (VIRTUAL PRODUCTION)</div>
                  <div className="text-text-secondary">250 Northern St &bull; Vancouver, BC V6A 2P7, Canada</div>
                  <div className="text-text-secondary/60 text-[10px]">vancouver@frameline.film</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
