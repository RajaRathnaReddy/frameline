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
            The Dog Stars — Post-Apocalyptic Colorado
          </h3>
          <p className="text-text-secondary text-base max-w-2xl mb-8 font-serif">
            Drag the slider to compare the raw plate footage against the final composited shot by Outpost VFX.
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
              src="/images/hero-vfx-breakdown.jpg"
              alt="Final composited shot"
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
                src="/images/hero-virtual-production.jpg"
                alt="Raw plate footage"
                fill
                className="object-cover grayscale-[30%] brightness-90"
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
        </ScrollReveal>

        {/* Credits */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap items-center gap-6 mt-6">
            <div>
              <span className="text-meta text-text-secondary/50 block">STUDIO</span>
              <span className="text-text-primary text-sm font-display font-semibold">Outpost VFX</span>
            </div>
            <div className="w-px h-8 bg-border-subtle" />
            <div>
              <span className="text-meta text-text-secondary/50 block">SHOT COUNT</span>
              <span className="text-text-primary text-sm font-display font-semibold">1,247</span>
            </div>
            <div className="w-px h-8 bg-border-subtle" />
            <div>
              <span className="text-meta text-text-secondary/50 block">VFX SUPERVISOR</span>
              <span className="text-text-primary text-sm font-display font-semibold">James Whitehurst</span>
            </div>
            <div className="w-px h-8 bg-border-subtle" />
            <div>
              <span className="text-meta text-text-secondary/50 block">DIRECTOR</span>
              <span className="text-text-primary text-sm font-display font-semibold">Denis Villeneuve</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
