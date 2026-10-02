import { articles } from '@/lib/data';

export async function GET() {
  const siteUrl = 'https://vfx.rajarathnareddy.com';

  const rssItems = articles
    .map(
      (art) => `
    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>${siteUrl}/article/${art.slug}</link>
      <guid>${siteUrl}/article/${art.slug}</guid>
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
    <title>FRAMELINE — AI · VFX · Hollywood · Film Technology</title>
    <link>${siteUrl}</link>
    <description>The premium news and editorial platform for visual effects, AI in cinema, virtual production, and film technology.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
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
