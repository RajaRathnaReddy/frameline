import type { Metadata } from "next";
import "./globals.css";
import TickerBar from "@/components/layout/TickerBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_NAME, SITE_SHORT, SITE_TAGLINE, SITE_URL, SITE_DESCRIPTION } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  keywords: ["VFX", "AI", "Hollywood", "film technology", "virtual production", "visual effects", SITE_NAME, SITE_SHORT],
  icons: {
    icon: [
      { url: '/icon.svg?v=2', type: 'image/svg+xml' },
      { url: '/renderline-logo.png?v=2', type: 'image/png' },
      { url: '/favicon.ico?v=2', sizes: 'any' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/apple-icon.png?v=2',
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_TAGLINE,
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": SITE_NAME,
      "alternateName": [SITE_SHORT, "RenderLine"],
      "description": SITE_DESCRIPTION,
      "publisher": {
        "@id": `${SITE_URL}/#organization`
      },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "NewsMediaOrganization",
      "@id": `${SITE_URL}/#organization`,
      "name": SITE_NAME,
      "alternateName": [SITE_SHORT],
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        "url": `${SITE_URL}/renderline-logo.png`,
        "contentUrl": `${SITE_URL}/renderline-logo.png`,
        "caption": SITE_NAME,
        "width": 512,
        "height": 512
      },
      "image": `${SITE_URL}/renderline-logo.png`,
      "description": SITE_DESCRIPTION,
      "founder": {
        "@type": "Person",
        "name": "Raja Rathna Reddy",
        "jobTitle": `FX Pipeline TD & AI Architect • Founder, ${SITE_NAME}`,
        "url": "https://rajarathnareddy.com",
        "sameAs": [
          "https://rajarathnareddy.com",
          "https://www.imdb.com/name/nm12830221/",
          "https://www.linkedin.com/in/rajarathnareddy/",
          "https://x.com/RAJARATHNAREDDY",
          "https://www.instagram.com/raja_rathna_reddy/",
          "https://www.facebook.com/RAJARATNAREDDY"
        ]
      },
      "sameAs": [
        "https://x.com/RAJARATHNAREDDY",
        "https://www.linkedin.com/in/rajarathnareddy/",
        "https://www.instagram.com/raja_rathna_reddy/",
        "https://www.facebook.com/RAJARATNAREDDY",
        "https://www.imdb.com/name/nm12830221/"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/renderline-logo.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="film-grain" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-accent-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <TickerBar />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
