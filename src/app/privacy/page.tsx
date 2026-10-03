import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/config';

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `Editorial privacy standards, cookie policies, and data handling practices at ${SITE_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-20">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        <div className="border-b border-white/[0.08] pb-8 mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan block mb-2">
            LEGAL ARCHIVE &bull; REVISED OCTOBER 2026
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight uppercase">
            Privacy Policy
          </h1>
          <p className="font-serif text-base text-text-secondary mt-2">
            How {SITE_NAME} collects, secures, and honors reader telemetry, confidential source data, and subscriber accounts.
          </p>
        </div>

        <div className="prose prose-invert max-w-none font-serif text-text-secondary space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-text-primary uppercase tracking-tight mb-3">
              1. Editorial Integrity & Confidential Sources
            </h2>
            <p>
              {SITE_NAME} operates under strict journalistic standards. Communications sent to our confidential newsroom desk, including encrypted Signal transmissions, are shielded by shield law protections to the fullest extent permitted by law. We do not sell, rent, or trade confidential source data under any circumstances.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-primary uppercase tracking-tight mb-3">
              2. Data We Collect
            </h2>
            <p>
              When you browse {SITE_NAME}, we collect minimal telemetry necessary to provide high-performance delivery:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Newsletter Subscriptions:</strong> Your email address and topic preferences for &ldquo;The Daily Render&rdquo;.</li>
              <li><strong>Anonymous Performance Metrics:</strong> Core Web Vitals, page render speeds, and CDN edge delivery logs.</li>
              <li><strong>Preferences:</strong> User theme selections, reading progress coordinates, and viewport dimensions.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-primary uppercase tracking-tight mb-3">
              3. Cookies & Tracking Technologies
            </h2>
            <p>
              We do not employ intrusive third-party cross-site behavioral tracking ad cookies. We use privacy-friendly analytics and local session storage strictly for remembering your reading progress, dark mode preferences, and newsletter authentication status.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-primary uppercase tracking-tight mb-3">
              4. Data Subject Rights (GDPR & CCPA)
            </h2>
            <p>
              Regardless of your geographic location, you retain the full right to inspect, correct, export, or permanently delete any personal data associated with your subscription account by contacting vfx@rajarathnareddy.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
