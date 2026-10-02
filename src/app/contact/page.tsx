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
                  href="mailto:a.rajarathnareddychenni@gmail.com"
                  className="flex items-center gap-2 text-text-primary hover:text-accent-gold transition-colors p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  <span className="text-accent-gold">✉</span>
                  <span className="truncate">a.rajarathnareddychenni@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/919704506779"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-primary hover:text-accent-lime transition-colors p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  <span className="text-accent-lime">📱</span>
                  <span>+91 97045 06779 (Direct / WhatsApp)</span>
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
