import type { Metadata } from "next";
import "./globals.css";
import TickerBar from "@/components/layout/TickerBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL('https://vfx.rajarathnareddy.com'),
  title: "FRAMELINE — AI · VFX · Hollywood · Film Technology",
  description:
    "The premium news platform for film technology, visual effects, AI in cinema, virtual production, and Hollywood industry coverage.",
  keywords: ["VFX", "AI", "Hollywood", "film technology", "virtual production", "visual effects"],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/frameline-logo.png', type: 'image/png' },
    ],
    shortcut: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "FRAMELINE — AI · VFX · Hollywood · Film Technology",
    description:
      "The premium news platform for film technology, visual effects, AI in cinema, virtual production, and Hollywood industry coverage.",
    type: "website",
    siteName: "FRAMELINE",
  },
  twitter: {
    card: "summary_large_image",
    title: "FRAMELINE",
    description: "AI · VFX · Hollywood · Film Technology",
  },
  other: {
    'impact-site-verification': '978cf08d-3365-41b9-b52a-d3e8e5930700',
  },
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
        <link rel="icon" type="image/png" href="/frameline-logo.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta
          name="impact-site-verification"
          content="978cf08d-3365-41b9-b52a-d3e8e5930700"
          {...({ value: "978cf08d-3365-41b9-b52a-d3e8e5930700" } as Record<string, string>)}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="film-grain" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-accent-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <CustomCursor />
        <TickerBar />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
