import CinematicHero from '@/components/home/CinematicHero';
import LatestNewsGrid from '@/components/home/LatestNewsGrid';
import SponsoredIndustrySpotlight from '@/components/home/SponsoredIndustrySpotlight';
import CategoryRails from '@/components/home/CategoryRails';
import VFXBreakdownSpotlight from '@/components/home/VFXBreakdownSpotlight';
import AIModelTracker from '@/components/home/AIModelTracker';
import ToolDirectoryTeaser from '@/components/home/ToolDirectoryTeaser';
import BoxOfficeBusiness from '@/components/home/BoxOfficeBusiness';
import OpinionInterviews from '@/components/home/OpinionInterviews';
import NewsletterCTA from '@/components/home/NewsletterCTA';

export default function HomePage() {
  return (
    <>
      {/* ③ Cinematic Hero */}
      <CinematicHero />

      {/* ④ "The Cut" — Latest News Grid */}
      <LatestNewsGrid />

      {/* ⑤ Cinema-Grade Native Industry Sponsor Showcase */}
      <SponsoredIndustrySpotlight />

      {/* ⑥ Category Rails (All 6 Pillars) */}
      <CategoryRails />

      {/* ⑥ VFX Breakdown Spotlight */}
      <VFXBreakdownSpotlight />

      {/* ⑦ AI Model Tracker */}
      <AIModelTracker />

      {/* ⑧ Tool Directory Teaser */}
      <ToolDirectoryTeaser />

      {/* ⑨ Box Office & Business */}
      <BoxOfficeBusiness />

      {/* ⑩ Opinion & Interviews */}
      <OpinionInterviews />

      {/* ⑪ Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
