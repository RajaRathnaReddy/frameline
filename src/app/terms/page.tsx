import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/config';

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: `Editorial terms of service, copyright notice, and licensing policies at ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-20">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        <div className="border-b border-white/[0.08] pb-8 mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan block mb-2">
            LEGAL ARCHIVE &bull; REVISED OCTOBER 2026
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight uppercase">
            Terms of Service
          </h1>
          <p className="font-serif text-base text-text-secondary mt-2">
            Terms governing access to {SITE_NAME} news, editorial analyses, database directories, and technical benchmarks.
          </p>
        </div>

        <div className="prose prose-invert max-w-none font-serif text-text-secondary space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-text-primary uppercase tracking-tight mb-3">
              1. Intellectual Property & Copyright
            </h2>
            <p>
              All original reporting, film industry analyses, VFX shot breakdown diagrams, hardware lab benchmark charts, and proprietary photography featured on {SITE_NAME} are the copyright &copy; 2026 {SITE_NAME} Media Group LLC. Film stills, studio logos, and tool marks are used strictly under fair use for commentary and criticism.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-primary uppercase tracking-tight mb-3">
              2. Syndication & Academic Citations
            </h2>
            <p>
              Excerpts of up to 150 words may be quoted in academic papers, industry newsletters, or peer publications with explicit attribution and a direct canonical hyperlink back to the original {SITE_NAME} article URL.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-primary uppercase tracking-tight mb-3">
              3. Independent Editorial Disclosures
            </h2>
            <p>
              {SITE_NAME} maintains absolute editorial independence. Software reviews, hardware benchmarks, and rating scores are determined solely by our testing lab editors. Advertising sponsorships never dictate or modify review scores or editorial opinions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-primary uppercase tracking-tight mb-3">
              4. Governing Law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the State of California and United States copyright statutes, without regard to conflict of law principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
