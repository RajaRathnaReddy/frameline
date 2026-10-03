import { notFound } from 'next/navigation';
import { getAllArticles, categories } from '@/lib/data';
import { getCategoryColor } from '@/lib/utils';
import CategoryArticleList from '@/components/category/CategoryArticleList';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/config';

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
  if (!cat) return { title: `Not Found | ${SITE_NAME}` };

  const catArticles = getAllArticles().filter((a) => a.category === slug);

  return {
    title: `${cat.name} — ${SITE_NAME}`,
    description: `Latest ${catArticles.length} ${cat.name} reports and deep technical briefings by Raja Rathna Reddy (FX Pipeline TD & AI Architect).`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);

  if (!cat) {
    notFound();
  }

  const catArticles = getAllArticles().filter((a) => a.category === slug);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: cat.name,
        item: `${SITE_URL}/category/${slug}`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} Dispatches — ${SITE_NAME}`,
    description: `Comprehensive technical intelligence and analysis covering ${cat.name.toLowerCase()} by Raja Rathna Reddy.`,
    url: `${SITE_URL}/category/${slug}`,
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 md:py-16">
      {/* Google-compliant Breadcrumb and Collection Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getCategoryColor(slug) }}
          />
          <span className="text-meta text-text-secondary/50 font-mono tracking-widest text-xs">
            SPECIALIZED TRADE VERTICAL &bull; {catArticles.length} CURATED DISPATCHES
          </span>
        </div>
        <h1
          className="text-fluid-h1 font-display mb-3 font-bold"
          style={{ color: getCategoryColor(slug) }}
        >
          {cat.name}
        </h1>
        <p className="text-text-secondary text-lg font-serif max-w-2xl leading-relaxed">
          Comprehensive, non-repeating technical intelligence and field analysis covering {cat.name.toLowerCase()} — curated and rewritten for maximum depth by Raja Rathna Reddy.
        </p>
        <div className="h-px bg-border-subtle mt-8" />
      </div>

      {/* Interactive Catalog Grid with Search, Tag Filtering, and Pagination */}
      <CategoryArticleList
        articles={catArticles}
        categorySlug={slug}
        categoryName={cat.name}
      />
    </div>
  );
}

