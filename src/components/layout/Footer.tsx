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
              <a
                href="https://www.instagram.com/raja_rathna_reddy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-pink-500/30 bg-pink-500/10 flex items-center justify-center text-pink-400 hover:text-white hover:bg-pink-500/20 hover:border-pink-500/60 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/RAJARATNAREDDY"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-blue-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/60 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://x.com/RAJARATHNAREDDY"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-secondary/30 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/rajarathnareddy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/40 transition-colors"
              >
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
