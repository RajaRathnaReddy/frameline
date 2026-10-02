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

  const articleUrl = `https://vfx.rajarathnareddy.com/article/${article.slug}`;
  const ogImageUrl = article.seo.ogImage.startsWith('http')
    ? article.seo.ogImage
    : `https://vfx.rajarathnareddy.com${article.seo.ogImage}`;

  return {
    title: article.seo.title,
    description: article.seo.desc,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.seo.title,
      description: article.seo.desc,
      url: articleUrl,
      siteName: 'FRAMELINE',
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo.title,
      description: article.seo.desc,
      images: [ogImageUrl],
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
