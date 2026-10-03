import { notFound } from 'next/navigation';
import { getAllArticles } from '@/lib/data';
import ArticleContent from '@/components/article/ArticleContent';
import ArticleClientLoader from '@/components/article/ArticleClientLoader';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/config';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug.includes('toxic') || slug.includes('the-boys') || slug.includes('kalki')) {
    return { title: `404 - Not Found | ${SITE_NAME}` };
  }
  const article = getAllArticles().find((a) => a.slug === slug);
  if (!article) return { title: `404 - Not Found | ${SITE_NAME}` };

  const articleUrl = `${SITE_URL}/article/${article.slug}`;
  const ogImageUrl = article.seo.ogImage.startsWith('http')
    ? article.seo.ogImage
    : `${SITE_URL}${article.seo.ogImage}`;

  const pageTitle = `${article.title} | ${SITE_NAME}`;

  return {
    title: pageTitle,
    description: article.seo.desc,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: pageTitle,
      description: article.seo.desc,
      url: articleUrl,
      siteName: SITE_NAME,
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
      title: pageTitle,
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

  const article = getAllArticles().find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <ArticleContent article={article} />;
}
