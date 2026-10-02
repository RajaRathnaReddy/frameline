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
        {/* Partnerize Universal Auto-Tracking Tag for vfx.rajarathnareddy.com */}
        <script
          id="partnerize-universal-tag"
          dangerouslySetInnerHTML={{
            __html: `(function () {
            var pztt = 3;
            var pztp = {"p":"pzt","mi":0,"ma":99,"e":[]};
            var tid = '085d29d7-be61-4120-b07a-82cf0e58b1c0';

            var pzth = function (i) {
                var enc = new TextEncoder();
                var bin = enc.encode(i);
                return window.crypto.subtle.digest('SHA-1', bin).then(function (b) {
                    var u = new Uint8Array(b);
                    var a = [];
                    for (var j = 0; j < u.length; j++) {
                        var hex = u[j].toString(16);
                        if (hex.length < 2) hex = '0' + hex;
                        a.push(hex);
                    }
                    return a.join('');
                });
            };

            var pzth2d = function (h) {
                return h.slice(0, 6) + 'p.' + h + '.com';
            };

            var pztd = function () {
                var i;
                do {
                    i = Math.floor(Math.random() * ((pztp.ma + 1) - pztp.mi)) + pztp.mi;
                } while (pztp.e && pztp.e.indexOf(i) !== -1);
                return pzth(pztp.p + i).then(pzth2d);
            };

            var pzti = function () {
                if (pztt <= 0) return;
                var s = document.createElement('script');
                s.onerror = function () {
                    pztt--;
                    pzti();
                };
                s.onload = function () {
                    l = true;
                    pzthc();
                };
                var d;
                pztd().then(function (domain) {
                    d = domain;
                    s.src = 'https://' + d + '/tag/' + tid;
                    document.body.appendChild(s);
                }).catch(function () {
                    e.push({ error: 'Load failed from ' + d, parameter: '' });
                    pzthc();
                });
            };

            var l = false;
            var e = [];

            window.pztr = window.pztr || function (t, f, m, p) {
                var b = (window.pztb = window.pztb || {});
                var x = (b[t] = b[t] || { fe: {} });
                (x.fe[f] = x.fe[f] || []).push({ error: m, parameter: p });
            };
            window.pztb = window.pztb || {};
            window.pztb[tid] = window.pztb[tid] || { fe: {} };

            var pzthc = function () {
                var features_errors = window.pztb[tid].fe;
                window.pztb[tid].fe = {};
                var loaded = l;
                var errors = e;
                l = false;
                e = [];

                if (Object.keys(features_errors).length === 0) {
                    features_errors = { x: [] };
                }

                fetch('https://api.performancehorizon.com/v3/pzthc/' + tid, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                        loaded: loaded,
                        errors: errors,
                        features_errors: features_errors,
                        url: window.location.href
                    })
                }).catch(function () {});
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', pzti);
            } else {
                pzti();
            }
        })();`,
          }}
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
