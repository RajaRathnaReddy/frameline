'use client';

import Link from 'next/link';

interface FramelineIconProps {
  size?: number;
  className?: string;
}

export function FramelineIcon({ size = 32, className = '' }: FramelineIconProps) {
  return (
    <div
      className={`relative shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_14px_rgba(255,77,46,0.4)] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
      >
        <defs>
          {/* Chassis Background Gradient */}
          <linearGradient id="flChassisGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#181B24" />
            <stop offset="100%" stopColor="#0B0C10" />
          </linearGradient>

          {/* Border Rim Gradient */}
          <linearGradient id="flBorderGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF4D2E" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3EE6FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E8B44A" stopOpacity="0.7" />
          </linearGradient>

          {/* Cinema Flame Core */}
          <linearGradient id="flFlameGrad" x1="12" y1="10" x2="28" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6B4A" />
            <stop offset="50%" stopColor="#FF3815" />
            <stop offset="100%" stopColor="#D92200" />
          </linearGradient>

          {/* Anamorphic Blue Flare */}
          <linearGradient id="flAnamorphic" x1="4" y1="20" x2="36" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3EE6FF" stopOpacity="0" />
            <stop offset="35%" stopColor="#3EE6FF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#3EE6FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3EE6FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Rounded Sensor Chassis */}
        <rect
          x="1.5"
          y="1.5"
          width="37"
          height="37"
          rx="9"
          fill="url(#flChassisGrad)"
          stroke="url(#flBorderGrad)"
          strokeWidth="1.2"
        />

        {/* Viewfinder Aspect Brackets (Cinema Crop Marks) */}
        {/* Top-Left */}
        <path
          d="M6 13V8C6 7.2 6.8 6.5 7.5 6.5H12.5"
          stroke="#3EE6FF"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Top-Right */}
        <path
          d="M27.5 6.5H32.5C33.2 6.5 34 7.2 34 8V13"
          stroke="#FF4D2E"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Bottom-Left */}
        <path
          d="M6 27V32C6 32.8 6.8 33.5 7.5 33.5H12.5"
          stroke="#FF4D2E"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Bottom-Right */}
        <path
          d="M27.5 33.5H32.5C33.2 33.5 34 32.8 34 32V27"
          stroke="#3EE6FF"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Subtle Anamorphic Flare Streak */}
        <line x1="5" y1="20" x2="35" y2="20" stroke="url(#flAnamorphic)" strokeWidth="0.8" />

        {/* Iconic Geometric "F" / Film Aperture Shutter */}
        {/* Vertical Backbone */}
        <rect x="12" y="10.5" width="4.2" height="19" rx="1.5" fill="url(#flFlameGrad)" />

        {/* Upper Aperture Arm */}
        <path
          d="M16 10.5H26.5C27.3 10.5 28 11.2 28 12V13.5C28 14.3 27.3 15 26.5 15H16V10.5Z"
          fill="url(#flFlameGrad)"
        />

        {/* Middle Arm with Anamorphic Cyan Shutter Accent */}
        <path
          d="M16 18.5H22.5C23.3 18.5 24 19.2 24 20V21.5C24 22.3 23.3 23 22.5 23H16V18.5Z"
          fill="#3EE6FF"
        />

        {/* Optical Sensor Core / Tally Indicator Dot */}
        <circle cx="27.5" cy="20.75" r="2" fill="#FF4D2E" />
        <circle cx="27.5" cy="20.75" r="0.9" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

interface FramelineLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSubtitle?: boolean;
}

export default function FramelineLogo({
  size = 'md',
  className = '',
  showSubtitle = true,
}: FramelineLogoProps) {
  const iconSizes = {
    sm: 30,
    md: 36,
    lg: 44,
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link
      href="/"
      className={`flex items-center gap-3 group shrink-0 select-none ${className}`}
      aria-label="FRAMELINE Home"
    >
      <FramelineIcon size={iconSizes[size]} />
      <div className="flex flex-col shrink-0 min-w-max justify-center">
        <span
          className={`font-display ${titleSizes[size]} font-black tracking-tight text-white leading-none whitespace-nowrap transition-colors duration-200 group-hover:text-white`}
        >
          FRAMELINE
        </span>
        {showSubtitle && (
          <div className="flex items-center gap-1.5 text-[8.5px] font-mono tracking-[0.18em] text-text-secondary/80 uppercase whitespace-nowrap mt-1">
            <span>FILM</span>
            <span className="text-accent-primary text-[6px]">&bull;</span>
            <span>AI</span>
            <span className="text-accent-cyan text-[6px]">&bull;</span>
            <span>VFX</span>
          </div>
        )}
      </div>
    </Link>
  );
}
