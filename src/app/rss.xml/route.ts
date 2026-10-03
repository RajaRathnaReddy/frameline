import { getAllArticles } from '@/lib/data';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/config';

export async function GET() {
  const rssItems = getAllArticles()
    .map(
      (art) => `
    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>${SITE_URL}/article/${art.slug}</link>
      <guid>${SITE_URL}/article/${art.slug}</guid>
      <pubDate>${new Date(art.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${art.dek}]]></description>
      <category>${art.category}</category>
      <author>${art.author.name}</author>
    </item>`
    )
    .join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
