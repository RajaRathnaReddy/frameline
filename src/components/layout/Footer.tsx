import Link from 'next/link';
import { categories } from '@/lib/data';
import FramelineLogo from '@/components/common/FramelineLogo';

export default function Footer() {
  return (
    <footer className="bg-bg-base border-t border-border-subtle">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16">
        {/* Brand identity header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-10 mb-12 border-b border-border-subtle gap-6">
          <FramelineLogo size="lg" />
          <p className="text-text-secondary text-sm max-w-md font-serif leading-relaxed">
            The specialized trade journal covering generative cinema, VFX pipelines, real-time engines, and Hollywood technology infrastructure.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Sections */}
          <div>
            <h4 className="text-meta text-text-secondary mb-5">SECTIONS</h4>
            <div className="flex flex-col gap-3">
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  {cat.name}
                </Link>
              ))}
              <Link href="/breakdowns" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Breakdowns</Link>
              <Link href="/reviews" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Reviews</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-meta text-text-secondary mb-5">COMPANY</h4>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors text-sm">About</Link>
              <Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Contact</Link>
              <Link href="/advertise" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Advertise / Media Kit</Link>
              <a href="mailto:vfx@rajarathnareddy.com" className="text-accent-gold hover:text-white transition-colors text-xs font-mono truncate">
                ✉ vfx@rajarathnareddy.com
              </a>
              <a href="https://wa.me/919704506779" target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:text-white transition-colors text-xs font-mono">
                📱 +91 97045 06779
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-meta text-text-secondary mb-5">RESOURCES</h4>
            <div className="flex flex-col gap-3">
              <Link href="/newsletter" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Newsletter</Link>
              <Link href="/tools" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Tool Directory</Link>
              <Link href="/rss.xml" className="text-text-secondary hover:text-text-primary transition-colors text-sm">RSS Feed</Link>
              <Link href="/search" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Global Search</Link>
            </div>
          </div>

          {/* Legal / Social */}
          <div>
            <h4 className="text-meta text-text-secondary mb-5">LEGAL</h4>
            <div className="flex flex-col gap-3">
              <Link href="/privacy" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Terms of Service</Link>
            </div>
            <h4 className="text-meta text-text-secondary mb-4 mt-8">SOCIAL</h4>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Twitter/X" className="w-9 h-9 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Giant Wordmark */}
        <div className="border-t border-border-subtle pt-12">
          <div
            className="text-[clamp(3rem,12vw,10rem)] font-display font-black leading-none tracking-tight text-transparent"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            }}
          >
            FRAMELINE
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-meta text-text-secondary/50">
              © {new Date().getFullYear()} FRAMELINE. All rights reserved.
            </p>
            <p className="text-meta text-text-secondary/30">
              BUILT FOR THE FRAME-BY-FRAME OBSESSED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
