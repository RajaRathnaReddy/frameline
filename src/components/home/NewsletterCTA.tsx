'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/motion';
import { motion } from 'framer-motion';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24" id="newsletter">
      <ScrollReveal>
        <div className="gradient-border rounded-2xl p-8 md:p-14 text-center relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10">
            <span className="text-meta text-accent-primary mb-4 block">
              THE DAILY RENDER
            </span>
            <h2 className="text-fluid-h2 font-display text-text-primary mb-4 max-w-2xl mx-auto">
              Industry intel in 5 minutes.
            </h2>
            <p className="text-text-secondary text-base md:text-lg font-serif mb-8 max-w-xl mx-auto">
              Join 40,000 artists, engineers, and creatives who start their day with FRAMELINE&apos;s curated briefing on AI, VFX, and film technology.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-6">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full sm:flex-1 bg-bg-base/50 border border-border-subtle rounded-full px-5 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-primary/50 transition-colors font-display text-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-accent-primary hover:bg-accent-primary/90 text-white font-display font-semibold text-sm px-8 py-3 rounded-full transition-colors"
              >
                {submitted ? '✓ Subscribed!' : 'Subscribe'}
              </motion.button>
            </form>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-bg-card border-2 border-bg-elevated flex items-center justify-center text-[10px] text-text-secondary/50"
                  >
                    {['🎬', '🎨', '🤖', '⚡'][i - 1]}
                  </div>
                ))}
              </div>
              <span className="text-meta text-text-secondary/50 text-[10px]">
                JOIN 40,000+ SUBSCRIBERS
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
