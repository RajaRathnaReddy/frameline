import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { articles, categories } from '@/lib/data';
import { getCategoryColor, formatTimecode } from '@/lib/utils';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: 'Not Found' };

  return {
    title: `${cat.name} — FRAMELINE`,
    description: `Latest ${cat.name} news and coverage from FRAMELINE.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);

  if (!cat) {
    notFound();
  }

  const catArticles = articles.filter((a) => a.category === slug);
  // Pad with articles from other categories if needed for display
  const displayArticles = catArticles.length > 0 ? catArticles : articles.slice(0, 4);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getCategoryColor(slug) }}
          />
          <span className="text-meta text-text-secondary/50">CATEGORY</span>
        </div>
        <h1
          className="text-fluid-h1 font-display mb-3"
          style={{ color: getCategoryColor(slug) }}
        >
          {cat.name}
        </h1>
        <p className="text-text-secondary text-lg font-serif max-w-2xl">
          The latest coverage in {cat.name.toLowerCase()} — breaking news, analysis, and deep dives from the FRAMELINE editorial team.
        </p>
        <div className="h-px bg-border-subtle mt-8" />
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            className="group block rounded-lg overflow-hidden border border-border-subtle card-hover bg-bg-card"
          >
            <div className="img-hover-container aspect-video">
              <Image
                src={article.heroImage}
                alt={article.title}
                width={500}
                height={280}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div
                className="h-0.5 w-10 mb-3 rounded"
                style={{ backgroundColor: getCategoryColor(article.category) }}
              />
              <h3 className="font-display font-semibold text-lg text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2">
                {article.dek}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-meta text-text-secondary/60 text-[10px]">
                    {article.author.name}
                  </span>
                </div>
                <span className="text-text-secondary/20">·</span>
                <span className="text-meta text-text-secondary/50 text-[10px]">
                  {article.readTime} MIN
                </span>
                <span className="text-text-secondary/20">·</span>
                <time className="text-meta text-text-secondary/50 text-[10px]" dateTime={article.publishedAt}>
                  {formatTimecode(article.publishedAt)}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
