import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/config';

export const metadata: Metadata = {
  title: `Editorial Policy — ${SITE_NAME}`,
  description: `Editorial guidelines, verification standards, and AI disclosure policy for ${SITE_NAME}.`,
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="max-w-3xl mx-auto">
        <span className="text-meta text-accent-primary mb-3 block">STANDARDS & ETHICS</span>
        <h1 className="text-fluid-h1 font-display text-text-primary mb-6">
          Editorial Policy & Fact-Checking Standards
        </h1>

        <div className="text-body text-text-secondary space-y-6 mb-12">
          <p>
            {SITE_NAME} is dedicated to reporting on artificial intelligence, visual effects, virtual production, and film technology with clarity, rigor, and factual integrity.
          </p>

          <h2 className="text-xl font-display font-bold text-text-primary pt-4">
            1. Fact-Checking & Primary Sources
          </h2>
          <p>
            We adhere to strict verification standards. Every transaction value, product release version, quote, and technical specification published on {SITE_NAME} must be grounded in official corporate filings, primary press releases, direct developer documentation, or reputable industry reporting. Speculative numbers and unconfirmed rumors are flagged as unconfirmed or excluded until official confirmation is obtained.
          </p>

          <h2 className="text-xl font-display font-bold text-text-primary pt-4">
            2. AI Assistance & Human Review
          </h2>
          <p>
            To deliver comprehensive industry coverage, automated and AI-assisted workflows may assist our editorial desk with transcription, synthesis, and initial draft formulation. However, all visible articles undergo human review by Raja Rathna Reddy before final publication. Automated drafts are cross-checked against source texts to verify every date, name, number, and technical specification.
          </p>

          <h2 className="text-xl font-display font-bold text-text-primary pt-4">
            3. Personal Opinions & Independence
          </h2>
          <p className="border-l-2 border-accent-gold/40 pl-4 py-1 italic">
            Opinions on this site are personal and do not represent any employer or company.
          </p>
          <p>
            Editorial analysis, tool evaluations, and architectural recommendations reflect independent technical assessments.
          </p>

          <h2 className="text-xl font-display font-bold text-text-primary pt-4">
            4. Sponsored Content Transparency
          </h2>
          <p>
            All paid promotions, advertiser showcases, and affiliate partnerships are visibly badged as &quot;Sponsored&quot; at the top of the relevant block and employ appropriate search engine relations (<code>rel=&quot;sponsored nofollow noopener&quot;</code>). Advertising relationships do not influence newsroom evaluation or review verdicts.
          </p>

          <h2 className="text-xl font-display font-bold text-text-primary pt-4">
            5. Corrections Policy
          </h2>
          <p>
            If an article contains an error of fact or an unconfirmed claim, we promptly update the text and note the correction. Readers and industry practitioners can submit factual corrections to{' '}
            <a href="mailto:vfx@rajarathnareddy.com" className="text-accent-cyan hover:underline font-mono">
              vfx@rajarathnareddy.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
