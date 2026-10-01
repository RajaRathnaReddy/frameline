'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
}

export default function TableOfContents({ headings }: { headings: TOCItem[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24" aria-label="Table of contents">
      <h4 className="text-meta text-text-secondary/50 mb-4">ON THIS PAGE</h4>
      <div className="flex flex-col gap-1">
        {headings.map(({ id, text }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-sm py-1.5 pl-3 border-l-2 transition-colors duration-200 ${
              activeId === id
                ? 'border-accent-primary text-text-primary font-medium'
                : 'border-transparent text-text-secondary/60 hover:text-text-secondary hover:border-border-subtle'
            }`}
          >
            {text}
          </a>
        ))}
      </div>
    </nav>
  );
}
