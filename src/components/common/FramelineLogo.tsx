import Image from 'next/image';
import Link from 'next/link';

interface FramelineIconProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export function FramelineIcon({ size = 38, className = '', glow = true }: FramelineIconProps) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-white/15 bg-black/60 shadow-lg shadow-black/50 group-hover:border-accent-primary/60 transition-all duration-300 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute -inset-1 rounded-xl bg-accent-primary/20 blur-md pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"
        />
      )}
      <Image
        src="/frameline-logo.png"
        alt="FRAMELINE Brand Identity"
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-cover relative z-10 transition-transform duration-300 group-hover:scale-105"
        priority
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
    sm: 30,
    md: 38,
    lg: 48,
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
          <span className="text-[9px] font-mono tracking-widest text-text-secondary/70 uppercase whitespace-nowrap mt-1 flex items-center gap-1.5">
            <span className="text-accent-primary font-bold">FILM</span>
            <span className="text-white/30">&middot;</span>
            <span className="text-accent-cyan font-bold">AI</span>
            <span className="text-white/30">&middot;</span>
            <span className="text-accent-gold font-bold">VFX</span>
          </span>
        )}
      </div>
    </Link>
  );
}
