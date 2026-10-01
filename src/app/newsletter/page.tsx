import NewsletterCTA from '@/components/home/NewsletterCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscribe — The Daily Render | FRAMELINE',
  description: 'Join 40,000 artists, engineers, and creatives who start their day with FRAMELINE\'s curated briefing.',
};

export default function NewsletterPage() {
  return (
    <div className="min-h-[60vh] flex items-center">
      <div className="w-full">
        <NewsletterCTA />
      </div>
    </div>
  );
}
