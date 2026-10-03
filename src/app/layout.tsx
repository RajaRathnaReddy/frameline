import type { Metadata } from "next";
import "./globals.css";
import TickerBar from "@/components/layout/TickerBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://vfx.rajarathnareddy.com'),
  title: "RENDERLINE — AI · VFX · Hollywood · Film Technology",
  description:
    "The premium news platform for film technology, visual effects, AI in cinema, virtual production, and Hollywood industry coverage.",
  keywords: ["VFX", "AI", "Hollywood", "film technology", "virtual production", "visual effects", "RenderLine"],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/renderline-logo.png', type: 'image/png' },
    ],
    shortcut: '/icon.svg',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: 'https://vfx.rajarathnareddy.com',
  },
  openGraph: {
    title: "RENDERLINE — AI · VFX · Hollywood · Film Technology",
    description:
      "The premium news platform for film technology, visual effects, AI in cinema, virtual production, and Hollywood industry coverage.",
    type: "website",
    siteName: "RENDERLINE",
  },
  twitter: {
    card: "summary_large_image",
    title: "RENDERLINE",
    description: "AI · VFX · Hollywood · Film Technology",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  "name": "RENDERLINE",
  "url": "https://vfx.rajarathnareddy.com",
  "logo": "https://vfx.rajarathnareddy.com/renderline-logo.png",
  "description": "The premium news platform for film technology, visual effects, AI in cinema, virtual production, and Hollywood industry coverage.",
  "founder": {
    "@type": "Person",
    "name": "Raja Rathna Reddy",
    "jobTitle": "FX Pipeline TD & AI Architect • Founder, RENDERLINE",
    "url": "https://rajarathnareddy.com",
    "sameAs": [
      "https://rajarathnareddy.com",
      "https://www.imdb.com/name/nm12830221/",
      "https://www.linkedin.com/in/rajarathnareddy/",
      "https://x.com/RAJARATHNAREDDY",
      "https://www.instagram.com/raja_rathna_reddy/"
    ]
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://vfx.rajarathnareddy.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="icon" type="image/png" href="/renderline-logo.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
