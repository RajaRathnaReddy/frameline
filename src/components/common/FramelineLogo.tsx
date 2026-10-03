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
        <defs>
          <linearGradient id="rGradNav" x1="10" y1="9" x2="26" y2="27" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF5B37"/>
            <stop offset="50%" stopColor="#FF3314"/>
            <stop offset="100%" stopColor="#E02600"/>
          </linearGradient>
          <linearGradient id="rLegNav" x1="17" y1="17" x2="26" y2="27" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF4D2E"/>
            <stop offset="60%" stopColor="#E02600"/>
            <stop offset="100%" stopColor="#3EE6FF"/>
          </linearGradient>
        </defs>

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
          x1="3"
          y1="18"
          x2="33"
          y2="18"
          stroke="#3EE6FF"
          strokeWidth="0.8"
          strokeOpacity="0.35"
        />

        {/* The Iconic Geometric "R" (RenderLine Cinema Core) */}
        {/* Vertical Pillar */}
        <rect x="10.5" y="9.5" width="3.4" height="17" rx="1.2" fill="url(#rGradNav)" />

        {/* Upper Loop of "R" */}
        <path
          d="M13.9 9.5 H20.5 C23.5 9.5 25.5 11.2 25.5 13.8 C25.5 16.4 23.5 18.1 20.5 18.1 H13.9 V9.5 Z M13.9 12.8 V14.8 H20 C20.9 14.8 21.8 14.3 21.8 13.8 C21.8 13.3 20.9 12.8 20 12.8 H13.9 Z"
          fill="url(#rGradNav)"
        />

        {/* Diagonal Kick Leg of "R" */}
        <path
          d="M17.2 17.6 L24 26.2 C24.4 26.7 25 26.7 25.5 26.3 C25.9 25.9 26 25.3 25.6 24.8 L19.8 17.2 Z"
          fill="url(#rLegNav)"
        />

        {/* Optical Sensor Core Dot on flare line */}
        <circle cx="25.5" cy="18" r="1.6" fill="#3EE6FF" />
        <circle cx="25.5" cy="18" r="0.7" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

interface FramelineLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSubtitle?: boolean;
}

export function RenderLineLogo({
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
      aria-label="RENDERLINE Home"
    >
      <FramelineIcon size={iconSizes[size]} />
      <div className="flex flex-col shrink-0 min-w-max justify-center">
        <span
          className={`font-display ${titleSizes[size]} font-black tracking-tight text-white leading-none whitespace-nowrap transition-colors duration-200 group-hover:text-white`}
        >
          RENDERLINE
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

export default RenderLineLogo;
export { RenderLineLogo as FramelineLogo };
