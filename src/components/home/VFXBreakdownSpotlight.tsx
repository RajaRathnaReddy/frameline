'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/motion';

export default function VFXBreakdownSpotlight() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current) handleMove(e.touches[0].clientX);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMove]);

  return (
    <section className="bg-bg-elevated py-16 md:py-24 border-y border-border-subtle" id="vfx-breakdown">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-meta text-accent-violet">SCENE 06 / TAKE 01</span>
            <span className="text-meta text-text-secondary/30">—</span>
            <h2 className="text-meta text-text-secondary">VFX BREAKDOWN SPOTLIGHT</h2>
          </div>
          <h3 className="text-fluid-h2 font-display text-text-primary mb-3">
            VFX Breakdown Spotlight — How a raw plate becomes a final shot
          </h3>
          <p className="text-text-secondary text-base max-w-2xl mb-8 font-serif">
            Drag the slider to compare the raw camera plate against the final composited shot.
          </p>
        </ScrollReveal>

        {/* Comparison Slider */}
        <ScrollReveal delay={0.2}>
          <div
            ref={containerRef}
            className="relative rounded-lg overflow-hidden cursor-ew-resize aspect-[2.39/1] max-h-[500px] select-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onClick={(e) => handleMove(e.clientX)}
          >
            {/* After (background — full image) */}
            <Image
              src="/images/breakdown/final.webp"
              alt="Final composited shot illustration showing weathered hangar and vintage aircraft in alpine valley"
              fill
              className="object-cover"
              draggable={false}
            />

            {/* Before (clipped) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src="/images/breakdown/plate.webp"
                alt="Raw camera plate illustration showing an empty alpine valley and grass airstrip"
                fill
                className="object-cover"
                draggable={false}
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-meta text-text-primary px-3 py-1.5 rounded">
                PLATE — RAW FOOTAGE
              </div>
            </div>

            {/* Divider Handle */}
            <div
              className="absolute top-0 bottom-0 z-10"
              style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-0.5 h-full bg-white/80" />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" />
                </svg>
              </div>
            </div>

            {/* After label */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-meta text-text-primary px-3 py-1.5 rounded">
              FINAL COMP
            </div>
          </div>

          {/* Visible Caption under slider */}
          <div className="mt-3 flex items-center justify-between text-meta text-text-secondary/60">
            <span>Illustration (AI-generated). Not a frame from any film.</span>
            <span className="font-mono text-[11px]">2400×1350 · 16:9</span>
          </div>
        </ScrollReveal>

        {/* Related Film Reference Box */}
        <ScrollReveal delay={0.4}>
          <div className="mt-8 p-5 rounded-xl border border-white/10 bg-bg-card/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-meta text-accent-gold block mb-1">RELATED FILM REFERENCE</span>
              <p className="text-sm text-text-secondary font-serif">
                <strong className="text-text-primary font-display font-medium">The Dog Stars (2026)</strong>, directed by Ridley Scott, VFX Supervisor Charley Henley, with VFX work by six studios including Outpost VFX.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
              <a
                href="https://www.artofvfx.com/the-dog-stars"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-accent-cyan border border-accent-cyan/30 transition-colors"
              >
                artofvfx.com/the-dog-stars ↗
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
