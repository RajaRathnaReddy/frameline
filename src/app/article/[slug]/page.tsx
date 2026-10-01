import { notFound } from 'next/navigation';
import { articles } from '@/lib/data';
import ArticleContent from '@/components/article/ArticleContent';
import ArticleClientLoader from '@/components/article/ArticleClientLoader';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug.includes('toxic') || slug.includes('the-boys') || slug.includes('kalki')) {
    return { title: '404 - Not Found | FRAMELINE' };
  }
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: '404 - Not Found | FRAMELINE' };

  return {
    title: article.seo.title,
    description: article.seo.desc,
    openGraph: {
      title: article.seo.title,
      description: article.seo.desc,
      type: 'article',
      images: [article.seo.ogImage],
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo.title,
      description: article.seo.desc,
      images: [article.seo.ogImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  if (slug.includes('toxic') || slug.includes('the-boys') || slug.includes('kalki')) {
    notFound();
  }

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <ArticleContent article={article} />;
}
