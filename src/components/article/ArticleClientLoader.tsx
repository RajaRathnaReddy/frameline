'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/data';
import { Article } from '@/lib/types';
import ArticleContent from './ArticleContent';

export default function ArticleClientLoader({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null | undefined>(undefined);

  useEffect(() => {
    const found = getArticleBySlug(slug);
    setArticle(found || null);
  }, [slug]);

  if (article === undefined) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-mono text-xs text-accent-cyan gap-3">
        <svg className="animate-spin h-6 w-6 text-accent-cyan" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>RETRIEVING DISPATCH FROM TELEMETRY CACHE...</span>
      </div>
    );
  }

  if (article === null) {
    notFound();
  }

  return <ArticleContent article={article} />;
}
