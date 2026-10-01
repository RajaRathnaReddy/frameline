import Image from 'next/image';
import { rajaRathnaReddy } from '@/lib/author';

interface AuthorBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showRole?: boolean;
  showWebsite?: boolean;
  className?: string;
}

export default function AuthorBadge({
  size = 'md',
  showRole = true,
  showWebsite = false,
  className = '',
}: AuthorBadgeProps) {
  const avatarSizes = {
    sm: 18,
    md: 24,
    lg: 40,
  };

  const tickSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="relative rounded-full overflow-hidden shrink-0 border border-white/20"
        style={{ width: avatarSizes[size], height: avatarSizes[size] }}
      >
        <Image
          src={rajaRathnaReddy.avatar}
          alt={rajaRathnaReddy.name}
          width={avatarSizes[size]}
          height={avatarSizes[size]}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <a
            href={rajaRathnaReddy.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-text-primary hover:text-accent-gold transition-colors font-display font-semibold flex items-center gap-1 text-[11px] sm:text-xs"
          >
            <span className="truncate">{rajaRathnaReddy.name}</span>
            <svg
              className={`${tickSizes[size]} text-[#38BDF8] shrink-0 drop-shadow-sm`}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-label="Verified Trade Journalist"
            >
              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.273 1.273 2.643 2.148 4.223 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.273 2.148-2.643 2.148-4.223zm-12.28 4.49l-3.79-3.79 1.41-1.41 2.38 2.38 5.79-5.79 1.41 1.41-7.2 7.2z" />
            </svg>
          </a>
          {showWebsite && (
            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-accent-gold/15 text-accent-gold border border-accent-gold/30 font-semibold">
              rajarathnareddy.com
            </span>
          )}
        </div>
        {showRole && (
          <span className="text-accent-cyan text-[9px] sm:text-[10px] font-mono leading-tight truncate">
            {rajaRathnaReddy.role}
          </span>
        )}
      </div>
    </div>
  );
}
