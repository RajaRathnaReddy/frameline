'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/motion';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage_cta' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFeedbackMessage('Welcome! An executive confirmation letter has been dispatched to your inbox.');
        setEmail('');
        setTimeout(() => {
          setStatus('idle');
          setFeedbackMessage('');
        }, 7000);
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Failed to complete subscription. Please verify your email.');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err: any) {
      console.error('Subscription error:', err);
      setStatus('error');
      setFeedbackMessage('Network error. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24" id="newsletter">
      <ScrollReveal>
        <div className="gradient-border rounded-2xl p-8 md:p-14 text-center relative overflow-hidden bg-bg-card/70 border border-border-subtle shadow-2xl">
          {/* Background Glow */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
              <span className="text-meta text-accent-primary font-mono text-[11px] font-bold tracking-widest uppercase">
                SCENE 01 / EDITORIAL DISPATCH
              </span>
            </div>

            <h2 className="text-fluid-h2 font-display text-text-primary mb-4 max-w-2xl mx-auto font-black tracking-tight">
              Executive Film &amp; AI Intelligence.
            </h2>
            <p className="text-text-secondary text-base md:text-lg font-serif mb-2 max-w-xl mx-auto leading-relaxed">
              Join 40,000+ VFX supervisors, technical directors, and studio executives who rely on RENDERLINE for unfiltered pipeline analysis and compute economics.
            </p>
            <p className="text-xs font-mono text-text-tertiary mb-8">
              Curated by{' '}
              <a
                href="https://rajarathnareddy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-cyan hover:underline font-bold"
              >
                Raja Rathna Reddy
              </a>{' '}
              &bull; FX Pipeline TD &amp; AI Architect &bull;{' '}
              <a
                href="https://www.imdb.com/name/nm12830221/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-gold hover:underline"
              >
                IMDb (nm12830221)
              </a>
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="colleague@studio.com"
                required
                disabled={status === 'loading'}
                className="w-full sm:flex-1 bg-bg-base/70 border border-border-subtle rounded-full px-5 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-primary/80 transition-colors font-mono text-sm"
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-accent-primary hover:bg-accent-primary/90 disabled:opacity-50 text-white font-mono font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all shadow-lg shadow-accent-primary/20 shrink-0"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Dispatching...
                  </span>
                ) : status === 'success' ? (
                  '✓ Subscribed!'
                ) : (
                  'Subscribe Free'
                )}
              </motion.button>
            </form>

            {/* Status Message */}
            {feedbackMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xs font-mono mb-4 px-4 py-2 rounded-lg inline-block ${
                  status === 'success'
                    ? 'bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/30'
                    : 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30'
                }`}
              >
                {feedbackMessage}
              </motion.div>
            )}

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <div className="flex -space-x-2">
                {['🎬', '🎨', '🤖', '⚡'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-bg-card border-2 border-bg-elevated flex items-center justify-center text-[10px] text-text-secondary shadow-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <span className="text-meta text-text-secondary/70 font-mono text-[11px]">
                JOIN 40,000+ SUBSCRIBERS FROM WARNER BROS, DISNEY, SONY, &amp; DNEG
              </span>
              <span className="text-text-tertiary text-xs">&bull;</span>
              <Link href="/newsletter" className="text-accent-cyan hover:underline text-xs font-mono font-medium">
                View Sample Issues &rarr;
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
