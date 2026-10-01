'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TOPIC_OPTIONS = [
  'VFX & OpenUSD Solaris Pipeline',
  'Generative AI & Neural Cinema Models',
  'Hollywood Studio Deals & Guild Agreements',
  'LED Volume & In-Camera VFX (ICVFX)',
  'Film Tools, GPU Compute & Cloud Infrastructure',
];

export default function NewsletterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(TOPIC_OPTIONS);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [previewTab, setPreviewTab] = useState<'welcome' | 'digest'>('welcome');

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    setStatusMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name.trim() || undefined,
          topics: selectedTopics,
          source: 'newsletter_landing_page',
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setStatusMessage(
          `Success! Your inaugural welcome dispatch from Raja Rathna Reddy has been dispatched to ${email}. Check your inbox!`
        );
        setName('');
        setEmail('');
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Failed to complete subscription. Please verify your email.');
      }
    } catch (err: any) {
      console.error('Subscription error:', err);
      setStatus('error');
      setStatusMessage('Network connection error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary mb-8">
          <Link href="/" className="hover:text-accent-primary transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-text-secondary">INTELLIGENCE SUBSCRIPTION</span>
        </div>

        {/* Hero Section */}
        <div className="border-b border-border-subtle pb-12 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            <span className="text-accent-primary font-mono text-xs font-bold uppercase tracking-widest">
              OFFICIAL TRADE PUBLICATION
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight mb-6">
            The FRAMELINE Intelligence Briefing
          </h1>

          <p className="text-text-secondary text-lg md:text-xl font-serif max-w-3xl leading-relaxed mb-6">
            Every week, receive high-throughput architectural breakdowns, AI video benchmark telemetry, Hollywood studio finance analytics, and virtual production engineering directly in your inbox.
          </p>

          {/* Author Badge */}
          <div className="flex flex-wrap items-center gap-4 bg-bg-card/70 border border-border-subtle p-4 rounded-xl max-w-2xl">
            <div className="w-12 h-12 rounded-full bg-accent-primary/20 border border-accent-primary/50 flex items-center justify-center font-mono font-bold text-accent-primary text-lg">
              RR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-text-primary text-base">Raja Rathna Reddy</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-gold/20 text-accent-gold border border-accent-gold/30 font-bold uppercase">
                  Editor-in-Chief
                </span>
              </div>
              <p className="text-xs font-mono text-accent-cyan mt-0.5">
                FX Pipeline TD &amp; AI Architect
              </p>
              <div className="flex items-center gap-3 text-xs font-mono mt-2">
                <a
                  href="https://rajarathnareddy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary underline"
                >
                  rajarathnareddy.com
                </a>
                <span className="text-text-tertiary">&bull;</span>
                <a
                  href="https://www.imdb.com/name/nm12830221/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-gold hover:underline font-bold"
                >
                  IMDb: nm12830221
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Subscribe Form & Live Interactive Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Subscription Form */}
          <div className="lg:col-span-6 bg-bg-card border border-border-subtle rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/10 rounded-full blur-[80px] pointer-events-none" />

            <h2 className="text-2xl font-display font-bold text-text-primary mb-2">
              Subscribe to the Executive Dispatch
            </h2>
            <p className="text-sm text-text-secondary font-serif mb-6">
              Free to all industry professionals. Delivered every Tuesday morning with immediate welcome package upon sign-up.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Christopher Nolan"
                  disabled={status === 'loading'}
                  className="w-full bg-bg-base/70 border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/40 font-mono text-sm focus:outline-none focus:border-accent-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
                  Studio / Work Email <span className="text-accent-primary">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@studio.com"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-bg-base/70 border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/40 font-mono text-sm focus:outline-none focus:border-accent-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-tertiary mb-3">
                  Tailor Your Intelligence Tracks
                </label>
                <div className="space-y-2">
                  {TOPIC_OPTIONS.map(topic => (
                    <label
                      key={topic}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-bg-base/40 border border-border-subtle/60 hover:border-accent-cyan/40 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => toggleTopic(topic)}
                        className="rounded border-border-subtle text-accent-primary focus:ring-accent-primary h-4 w-4 bg-bg-card cursor-pointer"
                      />
                      <span className="text-xs font-mono text-text-secondary">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-accent-primary hover:bg-accent-primary/90 disabled:opacity-50 text-white font-mono font-bold text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-accent-primary/25 transition-all flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Dispatching Confirmation...
                  </>
                ) : (
                  'Authorize Subscription & Send Welcome Letter'
                )}
              </motion.button>
            </form>

            {/* Notification alert */}
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-xl font-mono text-xs leading-relaxed ${
                  status === 'success'
                    ? 'bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/30'
                    : 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30'
                }`}
              >
                {statusMessage}
              </motion.div>
            )}

            {/* Guarantees */}
            <div className="mt-8 pt-6 border-t border-border-subtle/60 grid grid-cols-2 gap-4 text-[11px] font-mono text-text-tertiary">
              <div className="flex items-center gap-2">
                <span className="text-accent-emerald">✓</span> Zero spam or sponsored junk
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-emerald">✓</span> Verified SMTP delivery
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-emerald">✓</span> 1-click instant unsubscribe
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-emerald">✓</span> C2PA cryptographically signed
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Email Template Preview */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase tracking-wider text-text-secondary">
                Live Dispatch Preview
              </h3>
              <div className="inline-flex rounded-lg bg-bg-card p-1 border border-border-subtle">
                <button
                  type="button"
                  onClick={() => setPreviewTab('welcome')}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                    previewTab === 'welcome'
                      ? 'bg-accent-primary text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Welcome Letter
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('digest')}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                    previewTab === 'digest'
                      ? 'bg-accent-primary text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Weekly Digest
                </button>
              </div>
            </div>

            {/* Email Container Mockup */}
            <div className="bg-[#0F1113] border border-[#23272D] rounded-2xl overflow-hidden shadow-2xl">
              {/* Browser/Client Bar */}
              <div className="bg-[#181B1F] border-b border-[#23272D] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E63946]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span className="ml-3 font-mono text-[11px] text-[#94A3B8]">
                    From: Raja Rathna Reddy &lt;vfx@rajarathnareddy.com&gt;
                  </span>
                </div>
                <span className="font-mono text-[10px] text-accent-cyan uppercase">
                  {previewTab === 'welcome' ? 'Inaugural Dispatch' : 'Issue #48'}
                </span>
              </div>

              {/* Email Content Body */}
              <div className="p-6 md:p-8 max-h-[600px] overflow-y-auto font-sans text-sm leading-relaxed text-[#CBD5E1]">
                {previewTab === 'welcome' ? (
                  <div>
                    <div className="font-mono text-[10px] text-[#E63946] font-bold tracking-widest mb-1 uppercase">
                      SCENE 01 / TAKE 01 &bull; EDITORIAL DISPATCH
                    </div>
                    <div className="text-2xl font-black text-white font-display mb-1">FRAMELINE</div>
                    <div className="font-mono text-xs text-[#94A3B8] mb-6">
                      AI &bull; VFX &bull; HOLLYWOOD &bull; FILM TOOLS &bull; VIRTUAL PRODUCTION
                    </div>

                    <div className="inline-block bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-3 py-1 rounded text-[11px] font-mono font-bold mb-4">
                      EXECUTIVE WELCOME &bull; VERIFIED TRADE BYLINE
                    </div>

                    <p className="text-white font-bold text-base mb-4">
                      Dear Colleague,
                    </p>

                    <p className="mb-4">
                      Welcome to <strong>FRAMELINE Intelligence</strong>. You are now subscribed to the premier trade briefing for cinema technologists, VFX supervisors, technical directors, and studio executives.
                    </p>

                    <div className="border-l-2 border-[#E63946] bg-[#14171A] p-4 rounded-r-lg my-5 italic text-[#F1F5F9]">
                      &ldquo;The industry does not need another speculative press release. It needs rigorous pipeline analysis, verified benchmark data, and honest assessments from practitioners who actually ship shots on tentpole productions.&rdquo;
                    </div>

                    <p className="font-semibold text-white mb-3">
                      Here is what you will receive directly in your inbox:
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="bg-[#15181C] border border-[#282D35] p-3 rounded-lg">
                        <div className="font-mono text-xs font-bold text-[#3EE6FF] mb-1">01. HOLLYWOOD &amp; STUDIO DEALS</div>
                        <div className="text-xs text-[#94A3B8]">Inside studio acquisitions, equity ventures, guild regulations, and compute budget economics.</div>
                      </div>
                      <div className="bg-[#15181C] border border-[#282D35] p-3 rounded-lg">
                        <div className="font-mono text-xs font-bold text-[#3EE6FF] mb-1">02. GENERATIVE AI &amp; NEURAL CINEMA</div>
                        <div className="text-xs text-[#94A3B8]">Air-gapped local LLMs, neural video models (Veo, Kling, Luma), and C2PA cryptographic provenance.</div>
                      </div>
                      <div className="bg-[#15181C] border border-[#282D35] p-3 rounded-lg">
                        <div className="font-mono text-xs font-bold text-[#3EE6FF] mb-1">03. VFX PIPELINE ARCHITECTURE</div>
                        <div className="text-xs text-[#94A3B8]">OpenUSD Solaris workflows, Houdini VEX solver optimization, and multi-node cloud farm bursting.</div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#23272D]">
                      <div className="font-bold text-white text-sm">Raja Rathna Reddy</div>
                      <div className="font-mono text-xs text-[#3EE6FF] mt-0.5">FX Pipeline TD &amp; AI Architect &bull; Founder, FRAMELINE</div>
                      <div className="font-mono text-xs text-[#D4AF37] mt-2">
                        &bull; rajarathnareddy.com &bull; IMDb nm12830221
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-mono text-[10px] text-[#3EE6FF] font-bold tracking-widest mb-1 uppercase">
                      WEEKLY INTELLIGENCE REPORT
                    </div>
                    <div className="text-2xl font-black text-white font-display mb-1">FRAMELINE WEEKLY</div>
                    <div className="font-mono text-xs text-[#94A3B8] mb-6">
                      Curated by Raja Rathna Reddy &bull; Issue #48
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="bg-[#15181C] border border-[#282D35] p-4 rounded-lg">
                        <span className="font-mono text-[10px] text-[#E63946] font-bold uppercase">VFX &amp; PIPELINE &bull; 9 MIN READ</span>
                        <h4 className="text-sm font-bold text-white mt-1 mb-2">OpenUSD 24.11 Solaris Pipeline: Native Hydrav2 &amp; Multi-DCC Asset Sync</h4>
                        <p className="text-xs text-[#94A3B8]">Deep architectural dive into Pixar and ILM asset exchange pipelines, USD asset resolvers, and GPU Hydra delegates.</p>
                      </div>

                      <div className="bg-[#15181C] border border-[#282D35] p-4 rounded-lg">
                        <span className="font-mono text-[10px] text-[#E63946] font-bold uppercase">AI IN FILM &bull; 8 MIN READ</span>
                        <h4 className="text-sm font-bold text-white mt-1 mb-2">Neural Video Diffusion at 4K 24fps: Benchmarking Cinematic Coherence</h4>
                        <p className="text-xs text-[#94A3B8]">Rigorous studio benchmark testing temporal consistency, camera motion vectors, and identity preservation.</p>
                      </div>

                      <div className="bg-[#15181C] border border-[#282D35] p-4 rounded-lg">
                        <span className="font-mono text-[10px] text-[#E63946] font-bold uppercase">VIRTUAL PRODUCTION &bull; 10 MIN READ</span>
                        <h4 className="text-sm font-bold text-white mt-1 mb-2">LED Volume In-Camera VFX: Brompton Tessera SX40 &amp; OpenVPCal Color Sync</h4>
                        <p className="text-xs text-[#94A3B8]">Eliminating metamerism and sensor spectral response mismatches on high-end virtual soundstages.</p>
                      </div>
                    </div>

                    <div className="text-center pt-4 border-t border-[#23272D]">
                      <span className="inline-block bg-[#E63946] text-white font-mono text-xs font-bold uppercase px-4 py-2 rounded">
                        Read All 600 Catalog Reports &rarr;
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Studio Logos / Readership Bar */}
        <div className="mt-20 pt-12 border-t border-border-subtle">
          <p className="text-center font-mono text-xs uppercase tracking-widest text-text-tertiary mb-6">
            TRUSTED BY ARTISTS, SUPERVISORS, AND ENGINEERS ACROSS GLOBAL STUDIOS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-text-secondary/40 font-display font-black text-lg md:text-xl tracking-wider">
            <span>WARNER BROS.</span>
            <span>WETA DIGITAL</span>
            <span>ILM</span>
            <span>SONY PICTURES IMAGEWORKS</span>
            <span>DNEG</span>
            <span>DISNEY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
