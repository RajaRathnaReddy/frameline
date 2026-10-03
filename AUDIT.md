# Render Line — System & Content Audit Report (AUDIT.md)

**Date**: 2026-10-03  
**Target Platform**: `vfx.rajarathnareddy.com` (Next.js 16 / React 19)  
**Scope**: Full repository, routing structure, editorial catalog (637 articles across 7 pillars), monetization blocks, and media assets.

---

## a) Occurrences of Old Brand ("FRAMELINE", "Frameline", "frameline")

The following occurrences of the legacy brand name were identified across source code, config files, schemas, and documentation:

| Location / File | Line(s) | Context / Snippet | Action Required |
|---|---|---|---|
| `.env.local` | 6 | `SENDER_NAME=Raja Rathna Reddy \| FRAMELINE` | Update to `Raja Rathna Reddy \| Render Line` |
| `package.json` | 2 | `"name": "frameline"` | Update to `"name": "renderline"` |
| `package-lock.json` | 2, 8 | `"name": "frameline"` | Update package name |
| `README.md` | 1, 5, 43, 44, 57 | Title `# FRAMELINE`, badge `"FRAMELINE EDITORS' CHOICE"`, `"Frameline Verdict"`, `"Frameline news stories"` | Replace with `Render Line` |
| `src/app/layout.tsx` | 47, 66 | `"alternateName": ["RenderLine", "Frameline", "RENDERLINE Film Technology"]` & `"Frameline"` | Replace with `"alternateName": ["Render Line", "renderline"]` |
| `src/app/news/page.tsx` | 22 | `localStorage.removeItem('frameline_custom_articles');` | Clean up legacy key without leaving brand references |
| `src/app/api/newsletter/subscribers/route.ts` | 11 | `key !== 'frameline_admin_2026'` | Update key to `renderline_admin_2026` |
| `src/components/common/FramelineLogo.tsx` | 1–159 | Entire component file & exports (`FramelineIcon`, `FramelineLogo`, `FramelineIconProps`, `FramelineLogoProps`) | Rename component and file to `RenderLineLogo.tsx` |
| `src/components/common/RenderLineLogo.tsx` | 1–2 | Re-exports from `./FramelineLogo` | Consolidate into single `RenderLineLogo.tsx` |
| `src/components/layout/Navbar.tsx` | 9, 92 | `import FramelineLogo from '@/components/common/FramelineLogo';` | Change to `import RenderLineLogo from '@/components/common/RenderLineLogo';` |
| `src/components/layout/Footer.tsx` | 3, 11 | `import FramelineLogo from '@/components/common/FramelineLogo';` | Change to `import RenderLineLogo from '@/components/common/RenderLineLogo';` |
| `src/components/home/LatestNewsGrid.tsx` | 18, 22 | `window.addEventListener('frameline_articles_updated', updateHandler);` | Change event name to `renderline_articles_updated` |
| `src/lib/data.ts` | 495, 501 | `localStorage.getItem('frameline_custom_articles')` and `frameline_articles_updated` event | Use `renderline_custom_articles` and `renderline_articles_updated` |

### Legacy Single-Word / All-Caps Brand Instances Requiring Standardization to "Render Line"
- `src/app/layout.tsx`: `title: "RENDERLINE — ..."`, `openGraph.siteName: "RENDERLINE"`, `publisher.name: "RENDERLINE"`
- `src/lib/seo.ts`: `publisher.name = 'RENDERLINE'`
- `src/app/rss.xml/route.ts`: `<title>RENDERLINE — AI · VFX · Hollywood · Film Technology</title>`
- `src/components/layout/Footer.tsx`: Copyright line `© 2026 RENDERLINE`
- `src/components/layout/Navbar.tsx`: Brand text `RENDERLINE`
- `src/app/newsletter/page.tsx`, `src/app/advertise/page.tsx`, `src/app/about/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`: Inconsistent casing ("RENDERLINE" / "RenderLine") -> Centralize via `SITE_NAME` = `"Render Line"`.

---

## b) Occurrences of "40,000", "subscribers", "Warner Bros, Disney, Sony", "DNEG" in Marketing Text

The audit found unverified audience/subscriber claims and studio logo endorsements across marketing sections:

1. **`src/components/home/NewsletterCTA.tsx` (Line 72)**:
   - *Found*: `"Join 40,000+ VFX supervisors, technical directors, and studio executives who rely on RENDERLINE for unfiltered pipeline analysis and compute economics."`
   - *Action*: Replace with `"Get the free weekly briefing on AI, VFX and film technology."`
2. **`src/components/home/NewsletterCTA.tsx` (Line 156)**:
   - *Found*: `"JOIN 40,000+ SUBSCRIBERS FROM WARNER BROS, DISNEY, SONY, & DNEG"`
   - *Action*: Delete entirely.
3. **`src/app/newsletter/page.tsx` (Lines 410–423)**:
   - *Found*: `"TRUSTED BY ARTISTS, SUPERVISORS, AND ENGINEERS ACROSS GLOBAL STUDIOS"` with studio names: `WARNER BROS.`, `WETA DIGITAL`, `ILM`, `SONY PICTURES IMAGEWORKS`, `DNEG`, `DISNEY`.
   - *Action*: Remove this unverified studio endorsement rail entirely.
4. **`src/app/advertise/page.tsx` (Lines 21–75)**:
   - *Found*:
     - `"Reach 45,000+ decision-makers across Hollywood studios..."`
     - `"MONTHLY ACTIVE READERS 185,000+"`
     - `"DAILY RENDER SUBSCRIBERS 42,800"`
     - `"STUDIO SUBSCRIBERS 85% Top 20 VFX & Animation Studios"`
     - `"HARDWARE/SOFTWARE PURCHASERS $140M+"`
     - `"850,000+ monthly impressions"`
     - `"delivered every weekday morning to 42,000+ senior technical directors..."`
   - *Action*: Remove all synthetic audience metrics from `/advertise` and media kit sections until measurable analytics exist.
5. **Editorial Context (`src/lib/data/categories/hollywood.ts` Line 4055)**:
   - *Found*: Title: `"Satellite KDM Theatrical Delivery: Encrypted Distribution to 40,000 Screens"`.
   - *Note*: This is technical coverage of theatrical satellite delivery to cinema theater screens, not an audience claim.

---

## c) Sponsor / Partner / Showcase / Non-Programmatic Blocks

1. **`src/components/home/SponsoredIndustrySpotlight.tsx`**:
   - Primary Sponsor Block: `NVIDIA Omniverse™ Enterprise` (Line 10)
     - Badge: `INDUSTRY PARTNER SHOWCASE`
     - Text: `CURATED INDUSTRY SHOWCASE • NON-PROGRAMMATIC` (Line 64)
     - Link target: `/tools/unreal-engine` (**Bug: Incorrect internal link instead of advertiser destination**)
   - Secondary Partner Rail ("MORE TRADE BRIEFS") (Line 72):
     - `Blackmagic Cloud 19.5` (links to `/reviews/davinci-resolve-20-review`)
     - `Disguise rx III Stage Platform` (links to `/category/virtual-production`)
2. **`src/lib/data.ts` (`industrySponsors` array, lines 578–622)**:
   - Contains definitions for NVIDIA, Blackmagic, and Disguise showcases.
3. **`src/components/monetization/IndustrySponsorCard.tsx` & `IndustrySponsorSidebar.tsx`**:
   - Component rendering affiliate tool offerings (`Higgsfield AI Video`, `ElevenLabs Cinema Voice AI`).
   - Requires explicit `Sponsored` badge and `rel="sponsored nofollow noopener"`.

---

## d) Articles with Banned Template Phrases in Summary/Dek

A scan of all 637 catalog articles identified **480 articles** utilizing repetitive template phrasing in their `dek` summaries:

| Template Phrase | Matches | Example Affected Slugs |
|---|---|---|
| `Evaluating .* for production deployment` | 77 | `hell-grind-...`, `kling-3-omni-...`, `google-veo-3-1-...` |
| `Executive briefing on` | 33 | `the-new-frame-...`, `sony-pictures-culver-city-...` |
| `Inside Hollywood's evolving business model` | 67 | `google-deepmind-strikes-75m-...`, `satellite-kdm-...` |
| `Enterprise hardware teardown` | 100 | `red-v-raptor-x-...`, `arri-alexa-35-...` |
| `How .* implements` | 100 | `ilm-deploys-openusd-...`, `weta-fx-open-sources-...` |
| `Behind-the-scenes engineering report on` | 4 | `hans-zimmer-...`, `remote-control-productions-...` |
| `On-stage field analysis` | 99 | `virtual-production-forecast-...`, `in-camera-vfx-...` |
| **Total Template Occurrences** | **480** | Across all 7 category data files |

*Action*: Each summary must be rewritten into 1–2 concise, fact-based sentences derived strictly from verified body content and sources, banning these templates in generator scripts.

---

## e) Quotes Attributed to Persons or Industry Outlets

Examined all quotes in `src/lib/data.ts` (`industryQuotes` and `vfxBreakdowns`):

| Speaker / Entity | Stated Role | Stated Quote | Verification Status | Action |
|---|---|---|---|---|
| **James Cameron** | Filmmaker & Lightstorm Entertainment | *"The technology is inevitable. Our job is to ensure humans remain the storytellers while letting automation handle the grind."* | **Unconfirmed** (Synthesized quote; not found in verified interviews or Stability AI announcements) | Remove quote |
| **Kathleen Grace** | Chief AI Officer, Lionsgate | *"A good VP supervisor needs to understand cinematography, real-time rendering, and LED panel calibration. That remains a unicorn skill set."* | **Unconfirmed** (Synthesized quote; not found in public interviews) | Remove quote |
| **Variety Editorial Desk** | On Cannes Debut "Hell Grind" | *"The project showed what an AI action film could look like, even if the final product wasn't great."* | **Unconfirmed** (Not published by Variety) | Remove quote |
| **Netflix Production Technology** | Briefing on InterPositive | *"We have over 300 programs now utilizing machine-learning tools in production. It is no longer an experiment—it is our operating reality."* | **Unconfirmed Verbatim** (Actual statement was by Ted Sarandos in earnings call stating ~300 titles used Gen AI tools) | Update to factual statement or remove quote |
| **Sebastien Raets** | VFX Supervisor, Outpost VFX | *"We spent four months calibrating weathering algorithms. In an arid post-apocalyptic environment, concrete does not rot like wood—it exfoliates under intense UV."* | **Unconfirmed for The Dog Stars** | Remove from spotlight |
| **Stephen James** | Compositing Supervisor, DNEG | *"CopyCat handled about 40% of our Fremen shots with zero human touchup..."* | **Verified** (*Dune: Part Two* CopyCat workflow documented in fxguide / Foundry case study) | Keep with source URL |

*Threshold Rule*: Fewer than 3 verified quotes remain for the Opinion section. The whole "Opinion & Dispatches" section on the homepage will be hidden until verified quotes are provided.

---

## f) Tool, Model & Version Numbers (Inventory & Conflict Analysis)

| Tool / Model | Ticker Version | Articles Version | Tools Page (`tools`) | AI Tracker (`aiModels`) | Conflict Status | Canonical Truth |
|---|---|---|---|---|---|---|
| **Foundry Nuke** | — | **Nuke 17** (`vfx.ts`) | **15.1 (CopyCat ML)** | — | **CONFLICT** (Nuke 17 does not exist) | **Nuke 15.1 / 16.0** (Foundry official) |
| **SideFX Houdini** | — | **Houdini 22** (`vfx.ts`) | **21.0** | — | **CONFLICT** (Houdini 22 does not exist) | **Houdini 20.5 / 21.0** (SideFX official) |
| **Kuaishou Kling** | **Kling 3.0 Omni** | **Kling 3.0 Omni** (`ai.ts`) | — | **Kling 4.0** | **CONFLICT** (3.0 Omni vs 4.0) | **Kling 1.5 / 2.0 / Kling AI** (Canonicalize to single verified version) |
| **Runway** | — | Runway Gen-3 | **Gen-4 ($315M Raised)** | **Gen-3 Alpha Turbo** | **CONFLICT** (Gen-4 vs Gen-3 Alpha Turbo) | **Runway Gen-3 Alpha Turbo** (Tools updated to match) |
| **DaVinci Resolve** | — | DaVinci Resolve 20 | **20.0 Studio (Labeled "Free")** | — | **CONFLICT** (Studio edition is $295 paid) | Label changed to **"Free / Studio paid"** |
| **Topaz Video AI** | — | Topaz Video AI 5.2 | **5.2 (Acquired for $340M)** | — | **Inconsistent deal wording** | Update to **"v5.2 (Adobe deal announced)"** |

---

## g) "BREAKING" Labels & Publication Dates

Out of 28 articles with `breaking: true`, **21 articles are over 30 days old** (published September 1–3, 2026), violating news timeliness standards:

| Category | Article Title | `publishedAt` | Real Age | Status |
|---|---|---|---|---|
| Hollywood | Google DeepMind Strikes $75M Strategic Alliance with A24 | 2026-10-02T19:30:00Z | Deal was announced **22 Jun 2026** | **Fix date to 2026-06-22; remove BREAKING** |
| Hollywood | The New Frame: How AI, Real-Time Engines... | 2026-09-01T08:00:00Z | 32 days old | **Remove BREAKING** |
| Hollywood | Netflix Drops $587M for Ben Affleck’s InterPositive... | 2026-09-02T09:07:00Z | 31 days old | **Remove BREAKING** |
| Hollywood | Lionsgate Expands Runway Partnership... | 2026-09-03T10:14:00Z | 30 days old | **Remove BREAKING** |
| AI | Hell Grind: Inside the $500K AI Action Film... | 2026-09-01T08:00:00Z | 32 days old | **Remove BREAKING** |
| AI | Google Veo 3.1 Gemini API Integration... | 2026-09-02T09:07:00Z | 31 days old | **Remove BREAKING** |
| AI | OpenAI Sora API Sunset Post-Mortem... | 2026-09-03T10:14:00Z | 30 days old | **Remove BREAKING** |
| Tools | Unreal Engine 6 Roadmap: Early Access... | 2026-09-01T08:00:00Z | 32 days old | **Remove BREAKING** |
| Tools | Unreal Engine 5.8 MegaLights... | 2026-09-02T09:07:00Z | 31 days old | **Remove BREAKING** |
| Tools | Adobe Closes $340M Topaz Labs Deal... | 2026-09-03T10:14:00Z | 30 days old | **Remove BREAKING** |
| VFX | ILM Deploys OpenUSD 24.11 Solaris Pipeline... | 2026-09-01T08:00:00Z | 32 days old | **Remove BREAKING** |
| VFX | Wētā FX Open-Sources Deep Comp... | 2026-09-02T09:07:00Z | 31 days old | **Remove BREAKING** (and hide as unverified) |
| Virtual Prod | Virtual Production Forecast Reaches $18.5B... | 2026-09-01T08:00:00Z | 32 days old | **Remove BREAKING** |

*Rule Implemented*: Any article whose `publishedAt` is older than 48 hours must not display a `BREAKING` label.

---

## h) Empty Links, Missing Alt Text & Wrong Link Targets

1. **Wrong Link Target**:
   - `src/components/home/SponsoredIndustrySpotlight.tsx` line 51: NVIDIA Omniverse CTA links to `/tools/unreal-engine`. Must link to `SPONSOR_NVIDIA_URL` (configured to `/advertise` pending real URL).
2. **Missing Alt Text on Images**:
   - `src/app/about/page.tsx` line 39: `<Image src="/images/author-avatar.jpg" ...>` missing descriptive alt text.
   - `src/app/breakdowns/page.tsx` lines 132, 149, 277, 323: multiple `<Image>` tags missing proper pass alt descriptions.
   - `src/components/home/VFXBreakdownSpotlight.tsx` line 87: raw plate `<Image>` had generic alt text.
3. **Card Anchor Redundancy**:
   - Cards in `CinematicHero.tsx` and `CategoryRails.tsx` had separate nested link wrappers or unlabelled image anchors causing accessibility warnings. Single semantic link per card with descriptive `aria-label` required.

---

## i) $0M / $0B Values & Animated Counters

1. **`src/components/home/BoxOfficeBusiness.tsx` & `src/components/motion/index.tsx`**:
   - The `<CountUp>` component evaluated `isInView` on the client only. On initial SSR render, it output `<span>{prefix}0{suffix}</span>`, leaving literal `$0M` and `$0B` in server-rendered HTML.
   - Fix: Server-render the full target value in HTML, layer progressive client hydration for animation, and provide a `<noscript>` fallback.
2. **Unverified Financial Metric Cards in `businessStats`**:
   - `"AI Sound & Stem Market $2.3B"`: Unverified market projection. Must be hidden until officially sourced.
   - `"Adobe / Topaz Labs $340M"`: Must be hidden from financial strip until officially filed.
   - Verified cards retained:
     - Google DeepMind / A24: **~$75M**
     - Netflix / InterPositive: **$587M**

---

*End of AUDIT.md. Proceeding to task implementations.*
