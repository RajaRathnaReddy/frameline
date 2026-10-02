import Link from 'next/link';

interface FramelineIconProps {
  size?: number;
  className?: string;
}

export function FramelineIcon({ size = 32, className = '' }: FramelineIconProps) {
  const dotSize = Math.max(8, Math.round(size * 0.375));
  return (
    <div
      className={`rounded-full border-2 border-accent-primary flex items-center justify-center group-hover:bg-accent-primary/20 transition-all duration-300 group-hover:scale-105 shadow-sm shadow-accent-primary/20 shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="rounded-full bg-accent-primary animate-pulse"
        style={{ width: dotSize, height: dotSize }}
      />
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
    md: 32,
    lg: 40,
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link href="/" className={`flex items-center gap-3 group shrink-0 select-none ${className}`}>
      <FramelineIcon size={iconSizes[size]} />
      <div className="flex flex-col shrink-0 min-w-max">
        <span
          className={`font-display ${titleSizes[size]} font-black tracking-tight text-text-primary leading-none whitespace-nowrap transition-colors duration-200 group-hover:text-white`}
        >
          FRAMELINE
        </span>
        {showSubtitle && (
          <span className="text-[9px] font-mono tracking-widest text-text-secondary/70 uppercase whitespace-nowrap mt-1">
            FILM &middot; AI &middot; VFX
          </span>
        )}
      </div>
    </Link>
  );
}
