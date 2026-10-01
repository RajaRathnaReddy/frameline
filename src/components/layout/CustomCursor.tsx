'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for cursor follow
  const cursorX = useSpring(0, { damping: 28, stiffness: 400 });
  const cursorY = useSpring(0, { damping: 28, stiffness: 400 });

  useEffect(() => {
    // Disable on touch devices or if reduced motion is requested
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, input, select, textarea, [role="button"], .card-hover, .comparison-slider');
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Reticle Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors duration-200"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          borderColor: isHovered ? 'rgba(62, 230, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: isHovered ? 'rgba(62, 230, 255, 0.08)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(62, 230, 255, 0.3)' : 'none',
        }}
        transition={{
          width: { type: 'spring', damping: 25, stiffness: 350 },
          height: { type: 'spring', damping: 25, stiffness: 350 },
          opacity: { duration: 0.15 },
        }}
      >
        {/* Center Target Dot */}
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovered
              ? 'w-1 h-1 bg-accent-cyan'
              : 'w-1.5 h-1.5 bg-accent-primary'
          }`}
        />
      </motion.div>
    </div>
  );
}
