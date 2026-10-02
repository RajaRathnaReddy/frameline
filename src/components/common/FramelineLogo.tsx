import Link from 'next/link';

interface FramelineIconProps {
  size?: number;
  className?: string;
}

export function FramelineIcon({ size = 34, className = '' }: FramelineIconProps) {
  return (
    <div
      className={`relative shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(255,77,46,0.35)] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 36 36"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
      >
        {/* Outer Precision Sensor Chassis */}
        <rect
          x="1.2"
          y="1.2"
          width="33.6"
          height="33.6"
          rx="7.5"
          fill="#0D0F14"
          stroke="rgba(255, 255, 255, 0.14)"
          strokeWidth="1.2"
        />

        {/* Viewfinder Framelines (Optical Aspect Crop Brackets) */}
        {/* Top-Left */}
        <path
          d="M5.5 11.5V7C5.5 6.17 6.17 5.5 7 5.5H11.5"
          stroke="#3EE6FF"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Top-Right */}
        <path
          d="M24.5 5.5H29C29.83 5.5 30.5 6.17 30.5 7V11.5"
          stroke="#FF4D2E"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Bottom-Left */}
        <path
          d="M5.5 24.5V29C5.5 29.83 6.17 30.5 7 30.5H11.5"
          stroke="#FF4D2E"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Bottom-Right */}
        <path
          d="M24.5 30.5H29C29.83 30.5 30.5 29.83 30.5 29V24.5"
          stroke="#3EE6FF"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Anamorphic Blue Flare Line across Lens Center */}
        <line
          x1="4"
          y1="18"
          x2="32"
          y2="18"
          stroke="#3EE6FF"
          strokeWidth="0.8"
          strokeOpacity="0.25"
        />

        {/* Iconic Studio Tally Indicator (Preserving the core tally mark with cinema precision) */}
        <circle
          cx="18"
          cy="18"
          r="6.5"
          stroke="#FF4D2E"
          strokeWidth="1.4"
          strokeOpacity="0.6"
        />
        <circle
          cx="18"
          cy="18"
          r="3.5"
          fill="#FF4D2E"
          className="animate-pulse"
        />
        <circle
          cx="18"
          cy="18"
          r="1.2"
          fill="#FFFFFF"
          opacity="0.9"
        />
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
    sm: 28,
    md: 34,
    lg: 42,
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg xl:text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none ${className}`}
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
          <div className="flex items-center gap-1.5 text-[8.5px] font-mono tracking-[0.18em] text-text-secondary/75 uppercase whitespace-nowrap mt-1">
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
