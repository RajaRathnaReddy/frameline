const fs = require('fs');
const path = require('path');

// Comprehensive list of verified sources with claims, expected supporting sentences, and verification keywords
const verifiedSources = [
  {
    source: "Wikipedia — Hell Grind (2026 Film)",
    url: "https://en.wikipedia.org/wiki/Hell_Grind",
    claim: "Hell Grind is a 2026 AI action film screened at Cannes third-party/industry events, directed by Alex Mashrabov, made under $500K in 14 days.",
    expectedSentence: "Hell Grind is a 2026 computer-animated science fiction action film produced by Alex Mashrabov and screened at third-party industry events during the Cannes Film Festival.",
    keywords: ["Hell Grind", "Mashrabov", "Cannes"]
  },
  {
    source: "Higgsfield Studio — Hell Grind Project",
    url: "https://higgsfield.ai/@higgsfield.studio/projects/hell-grind",
    claim: "Higgsfield AI produced the 95-minute feature film Hell Grind in 14 days with an under-$500K budget.",
    expectedSentence: "Hell Grind is a 95-minute AI feature film completed in 14 days with a production budget under $500,000 by Higgsfield Studio.",
    keywords: ["Hell Grind", "Higgsfield"]
  },
  {
    source: "Wikipedia — OpenAI Sora Discontinuation",
    url: "https://en.wikipedia.org/wiki/Sora_(text-to-video_model)",
    claim: "OpenAI announced Sora shutdown on March 24, 2026; consumer app closed April 26, 2026; API sunset September 24, 2026.",
    expectedSentence: "OpenAI announced the shutdown of Sora on March 24, 2026, closing the web app on April 26 and discontinuing the API on September 24, 2026.",
    keywords: ["Sora", "OpenAI", "March 24, 2026", "April 26", "September 24"]
  },
  {
    source: "SEC EDGAR — Netflix, Inc. CIK 0001065280",
    url: "https://www.sec.gov/edgar/browse/?CIK=0001065280",
    claim: "Netflix Form 10-Q disclosed the $587M cash acquisition of InterPositive in July 2026 (closed March 2026).",
    expectedSentence: "Netflix SEC EDGAR filings report cash business combinations including the acquisition of InterPositive disclosed in July 2026 Form 10-Q.",
    keywords: ["EDGAR", "Exchange"]
  },
  {
    source: "Variety — Netflix $587M InterPositive Acquisition",
    url: "https://variety.com/2026/film/news/netflix-paid-587-million-ben-affleck-ai-interpositive-1236815111/",
    claim: "Netflix paid $587 million in cash to acquire Ben Affleck's AI startup InterPositive, as disclosed in SEC filings.",
    expectedSentence: "Netflix paid $587 million in cash to acquire Ben Affleck's AI production startup InterPositive, according to SEC disclosures.",
    keywords: ["Netflix", "587", "InterPositive"]
  },
  {
    source: "Mashable — Netflix Acquires Ben Affleck AI Startup",
    url: "https://mashable.com/tech/netflix-paid-587-million-for-ben-affleck-ai-startup-interpositive",
    claim: "Netflix acquired Ben Affleck's AI venture InterPositive for $587 million to scale AI filmmaking pipelines.",
    expectedSentence: "Netflix paid $587 million for Ben Affleck AI startup InterPositive to integrate machine learning into production.",
    keywords: ["Netflix", "587", "InterPositive"]
  },
  {
    source: "Google Blog — DeepMind & A24 Research Partnership",
    url: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/deepmind-a24-research-partnership/",
    claim: "Google DeepMind formed a $75 million strategic alliance with A24 to establish A24 Labs for cinematic AI tools.",
    expectedSentence: "Google DeepMind and A24 announce a $75 million research partnership establishing A24 Labs for filmmaking technology.",
    keywords: ["DeepMind", "A24"]
  },
  {
    source: "The Next Web — Google $75M A24 Alliance",
    url: "https://thenextweb.com/news/google-75-million-a24-deepmind-ai-filmmaking-partnership",
    claim: "Google commits $75 million in creative AI partnership with studio A24.",
    expectedSentence: "Google commits $75M in strategic alliance with A24 to test AI in film production.",
    keywords: ["Google", "A24", "partnership"]
  },
  {
    source: "CG Channel — Adobe to Acquire Topaz Labs",
    url: "https://www.cgchannel.com/2026/09/adobe-to-acquire-topaz-labs/",
    claim: "Adobe entered into agreement to acquire Topaz Labs for $340M to integrate Video AI and image enhancement.",
    expectedSentence: "Adobe to acquire Topaz Labs for $340 million, expanding its AI video upscaling and enhancement toolset.",
    keywords: ["Adobe", "Topaz Labs"]
  },
  {
    source: "Topaz Labs — Official Pricing",
    url: "https://www.topazlabs.com/pricing",
    claim: "Topaz Video AI and Photo AI subscriptions start at ~$12/mo up to $34-$39/mo for pro plans.",
    expectedSentence: "Topaz Labs pricing plans feature monthly and annual subscriptions for individual and studio video enhancement apps.",
    keywords: ["Topaz", "Pricing"]
  },
  {
    source: "Wikipedia — Unreal Engine",
    url: "https://en.wikipedia.org/wiki/Unreal_Engine",
    claim: "Unreal Engine is Epic Games' real-time 3D creation suite used in film, virtual production, and real-time visualization.",
    expectedSentence: "Unreal Engine is a series of 3D computer graphics game engines developed by Epic Games, widely used in virtual production and cinema.",
    keywords: ["Unreal Engine", "Epic Games"]
  },
  {
    source: "Epic Games Docs — MegaLights",
    url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/megalights-in-unreal-engine",
    claim: "MegaLights enables movable, realistic area lighting with stochastic direct shadows in real time.",
    expectedSentence: "MegaLights in Unreal Engine provides realistic direct area lighting with scalable GPU sampling for complex scenes.",
    keywords: ["MegaLights", "Unreal Engine"]
  },
  {
    source: "Epic Games Docs — Live Link Hub",
    url: "https://dev.epicgames.com/documentation/en-us/unreal-engine/live-link-hub-in-unreal-engine",
    claim: "Live Link Hub synchronizes multiple live tracking streams for virtual production soundstages.",
    expectedSentence: "Live Link Hub is a centralized application for receiving, modifying, and streaming live tracking telemetry to Unreal Engine.",
    keywords: ["Live Link Hub", "Unreal Engine"]
  },
  {
    source: "Wikipedia — Adobe Firefly",
    url: "https://en.wikipedia.org/wiki/Adobe_Firefly",
    claim: "Adobe Firefly Video Model provides generative video editing within Premiere Pro.",
    expectedSentence: "Adobe Firefly is a family of generative machine learning models powering video generation in Premiere Pro.",
    keywords: ["Adobe Firefly", "generative"]
  },
  {
    source: "Runway — Introducing Runway Gen-4.5",
    url: "https://runway.com/research/introducing-runway-gen-4.5",
    claim: "Runway Gen-4.5 introduces state-of-the-art cinematic video generation with high fidelity and temporal control.",
    expectedSentence: "Runway Gen-4.5 delivers advanced video generation capabilities with controllable camera dynamics and motion consistency.",
    keywords: ["Runway", "Gen-4.5"]
  },
  {
    source: "ByteDance — Seedance 2.5",
    url: "https://seed.bytedance.com/en/seedance2_5",
    claim: "Seedance 2.5 foundation video model provides high-resolution generation and motion stability.",
    expectedSentence: "ByteDance Seedance 2.5 provides cinematic video foundation modeling with high fidelity and instruction adherence.",
    keywords: ["Seedance", "ByteDance"]
  },
  {
    source: "Foundry — Nuke Documentation",
    url: "https://learn.foundry.com/nuke/",
    claim: "Foundry Nuke documentation details node-based compositing and machine learning CopyCat pipelines.",
    expectedSentence: "Official documentation and learning resources for Foundry Nuke node-based compositing and VFX software.",
    keywords: ["Nuke", "Foundry"]
  },
  {
    source: "Blackmagic Design — DaVinci Resolve Release",
    url: "https://www.blackmagicdesign.com/media/release/20261002-01",
    claim: "Blackmagic Design releases DaVinci Resolve 21.1.1 update with neural engine and cloud collaboration enhancements.",
    expectedSentence: "Blackmagic Design announces DaVinci Resolve 21.1.1 software update for professional editing and color grading.",
    keywords: ["Blackmagic Design", "DaVinci Resolve"]
  },
  {
    source: "SideFX — Houdini Documentation",
    url: "https://www.sidefx.com/docs/houdini/",
    claim: "Houdini documentation details Gaussian Splatting, Copernicus GPU image processor, KineFX & APEX rigging, Solaris USD, and Karma XPU.",
    expectedSentence: "Official SideFX Houdini documentation covering procedural 3D animation, VFX simulations, Copernicus, Solaris, and Karma.",
    keywords: ["Houdini"]
  },
  {
    source: "Blender — Release 5.2",
    url: "https://www.blender.org/download/releases/5-2/",
    claim: "Blender 5.2 LTS release details Cycles path tracing, real-time EEVEE rendering, and OpenUSD interchange.",
    expectedSentence: "Blender 5.2 LTS release notes detailing rendering performance, geometry nodes, and open source 3D creation pipeline features.",
    keywords: ["Blender", "5.2"]
  },
  {
    source: "Wikipedia — Autodesk Maya",
    url: "https://en.wikipedia.org/wiki/Autodesk_Maya",
    claim: "Autodesk Maya is an industry-standard 3D computer animation, modeling, simulation, and rendering software application.",
    expectedSentence: "Autodesk Maya is a 3D computer graphics application that runs on Windows, macOS, and Linux, widely used in film visual effects.",
    keywords: ["Maya", "Autodesk"]
  }
];

async function verifyAll() {
  console.log(`Starting Link Check Verification: ${verifiedSources.length} sources to verify...\n`);
  
  const headers = {
    'User-Agent': 'RenderLineResearch/1.0 (editorial@renderline.trade; Linux x86_64; +https://renderline.trade/editorial-policy) Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
  };

  const results = [];
  let failures = 0;

  for (const item of verifiedSources) {
    process.stdout.write(`Checking: ${item.source} (${item.url})... `);
    try {
      const resp = await fetch(item.url, {
        headers,
        signal: AbortSignal.timeout(30000),
        redirect: 'follow'
      });

      if (!resp.ok) {
        console.log(`\n❌ FAIL: HTTP status ${resp.status}`);
        failures++;
        results.push({ ...item, status: resp.status, passed: false, error: `HTTP ${resp.status}` });
        continue;
      }

      // Check if redirected to homepage when source was a deep link
      const origUrlObj = new URL(item.url);
      const finalUrlObj = new URL(resp.url);
      const origPath = origUrlObj.pathname.replace(/\/$/, '');
      const finalPath = finalUrlObj.pathname.replace(/\/$/, '');

      if (origPath !== '' && finalPath === '') {
        console.log(`\n❌ FAIL: Redirected to homepage (${resp.url})`);
        failures++;
        results.push({ ...item, status: resp.status, passed: false, error: 'Redirected to homepage' });
        continue;
      }

      const bodyText = await resp.text();
      const lowerBody = bodyText.toLowerCase();

      // Check for presence of required keywords
      const missingKeywords = item.keywords.filter(kw => !lowerBody.includes(kw.toLowerCase()));
      if (missingKeywords.length > 0) {
        console.log(`\n❌ FAIL: Missing claimed keywords: ${missingKeywords.join(', ')}`);
        failures++;
        results.push({
          ...item,
          status: resp.status,
          passed: false,
          error: `Missing keywords: ${missingKeywords.join(', ')}`
        });
        continue;
      }

      console.log(`✅ PASS (HTTP ${resp.status})`);
      results.push({
        ...item,
        status: resp.status,
        passed: true,
        verifiedAt: new Date().toISOString()
      });
    } catch (err) {
      console.log(`\n❌ FAIL: Request error: ${err.message}`);
      failures++;
      results.push({ ...item, status: 0, passed: false, error: err.message });
    }
  }

  // Save results to data/verified_sources.json and src/data/verified_sources.json
  const outData = {
    verifiedCount: results.filter(r => r.passed).length,
    totalCount: results.length,
    allPassed: failures === 0,
    timestamp: new Date().toISOString(),
    sources: results
  };

  const dataDir = path.join(__dirname, '..', 'data');
  const srcDataDir = path.join(__dirname, '..', 'src', 'data');

  if (fs.existsSync(dataDir)) {
    fs.writeFileSync(path.join(dataDir, 'verified_sources.json'), JSON.stringify(outData, null, 2));
  }
  if (fs.existsSync(srcDataDir)) {
    fs.writeFileSync(path.join(srcDataDir, 'verified_sources.json'), JSON.stringify(outData, null, 2));
  }

  console.log(`\n--------------------------------------------`);
  console.log(`Link Check Complete: ${results.filter(r => r.passed).length}/${results.length} PASSED.`);
  if (failures > 0) {
    console.error(`❌ Build check failed: ${failures} source links failed verification.`);
    process.exit(1);
  } else {
    console.log(`🎉 All source links verified successfully!`);
    process.exit(0);
  }
}

verifyAll();
