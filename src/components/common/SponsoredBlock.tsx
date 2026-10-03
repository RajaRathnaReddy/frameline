import React from 'react';

interface SponsoredBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function SponsoredBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm backdrop-blur-md ${className}`}
      aria-label="Sponsored advertisement"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      Sponsored
    </span>
  );
}

export default function SponsoredBlock({
  children,
  className = '',
}: SponsoredBlockProps) {
  return (
    <div className={`relative ${className}`} data-sponsored="true">
      <div className="absolute top-4 left-4 z-20">
        <SponsoredBadge />
      </div>
      {children}
    </div>
  );
}
