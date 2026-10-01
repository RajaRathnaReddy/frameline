export function getWelcomeEmailHtml(name?: string): string {
  const recipientGreeting = name ? `Dear ${name},` : 'Dear Colleague,';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FRAMELINE Intelligence</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #08090A;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #E2E8F0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #08090A;
      padding: 40px 15px;
    }
    .container {
      max-width: 640px;
      margin: 0 auto;
      background-color: #0F1113;
      border: 1px solid #23272D;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
    }
    .header {
      background: linear-gradient(180deg, #181B1F 0%, #0F1113 100%);
      padding: 36px 36px 28px 36px;
      border-bottom: 1px solid #23272D;
      text-align: left;
    }
    .brand-strip {
      font-family: monospace;
      font-size: 10px;
      letter-spacing: 2px;
      color: #E63946;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #FFFFFF;
      margin: 0;
    }
    .brand-subtitle {
      font-size: 13px;
      color: #94A3B8;
      margin-top: 6px;
      font-family: monospace;
    }
    .content {
      padding: 36px;
      line-height: 1.7;
      font-size: 15px;
      color: #CBD5E1;
    }
    .h1-greeting {
      font-size: 20px;
      font-weight: 700;
      color: #F8FAFC;
      margin-top: 0;
      margin-bottom: 20px;
    }
    .author-badge {
      display: inline-block;
      background: rgba(212, 175, 55, 0.12);
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #D4AF37;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-family: monospace;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .quote-box {
      border-left: 3px solid #E63946;
      background-color: #14171A;
      padding: 16px 20px;
      margin: 24px 0;
      border-radius: 0 8px 8px 0;
      font-style: italic;
      color: #F1F5F9;
    }
    .pillar-card {
      background-color: #15181C;
      border: 1px solid #282D35;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 14px;
    }
    .pillar-title {
      font-weight: 700;
      font-size: 14px;
      color: #3EE6FF;
      margin-bottom: 4px;
      font-family: monospace;
    }
    .pillar-desc {
      font-size: 13px;
      color: #94A3B8;
      margin: 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #E63946;
      color: #FFFFFF !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 13px;
      font-family: monospace;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 14px 28px;
      border-radius: 6px;
      margin: 24px 0 10px 0;
      text-align: center;
    }
    .author-signature {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #23272D;
    }
    .signature-name {
      font-size: 16px;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0;
    }
    .signature-role {
      font-size: 12px;
      font-family: monospace;
      color: #3EE6FF;
      margin-top: 4px;
      margin-bottom: 12px;
    }
    .social-links a {
      color: #D4AF37;
      text-decoration: none;
      font-size: 12px;
      font-family: monospace;
      margin-right: 14px;
      font-weight: 600;
    }
    .footer {
      background-color: #0A0B0D;
      padding: 24px 36px;
      border-top: 1px solid #1C2025;
      font-size: 11px;
      color: #64748B;
      font-family: monospace;
      text-align: center;
      line-height: 1.6;
    }
    .footer a {
      color: #94A3B8;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- Masthead Header -->
      <div class="header">
        <div class="brand-strip">SCENE 01 / TAKE 01 &bull; EDITORIAL DISPATCH</div>
        <h1 class="brand-title">FRAMELINE</h1>
        <div class="brand-subtitle">AI &bull; VFX &bull; HOLLYWOOD &bull; FILM TOOLS &bull; VIRTUAL PRODUCTION</div>
      </div>

      <!-- Main Body -->
      <div class="content">
        <div class="author-badge">EXECUTIVE WELCOME &bull; VERIFIED TRADE BYLINE</div>
        <div class="h1-greeting">${recipientGreeting}</div>

        <p>
          Welcome to <strong>FRAMELINE Intelligence</strong>. You are now officially subscribed to the premier trade briefing for cinema technologists, VFX supervisors, technical directors, and studio executives.
        </p>

        <p>
          We created FRAMELINE with a singular objective: to deliver unfiltered, deeply technical, and commercially rigorous coverage of the technological revolution reshaping Hollywood, visual effects, and generative cinema.
        </p>

        <div class="quote-box">
          "The industry does not need another speculative press release. It needs rigorous pipeline analysis, verified benchmark data, and honest assessments from practitioners who actually ship shots on tentpole productions."
        </div>

        <p style="margin-bottom: 18px; font-weight: 600; color: #F1F5F9;">
          Here is what you will receive directly in your inbox:
        </p>

        <!-- Pillar 1 -->
        <div class="pillar-card">
          <div class="pillar-title">01. HOLLYWOOD & STUDIO DEALS</div>
          <p class="pillar-desc">Inside studio acquisitions, equity ventures, guild regulations (SAG-AFTRA/WGA), and large-scale studio infrastructure financing.</p>
        </div>

        <!-- Pillar 2 -->
        <div class="pillar-card">
          <div class="pillar-title">02. GENERATIVE AI & NEURAL CINEMA</div>
          <p class="pillar-desc">Air-gapped local LLMs, neural video model evaluations (Veo, Kling, Luma), C2PA cryptographic provenance, and compute budget economics.</p>
        </div>

        <!-- Pillar 3 -->
        <div class="pillar-card">
          <div class="pillar-title">03. VFX PIPELINE ARCHITECTURE</div>
          <p class="pillar-desc">OpenUSD Solaris workflows, Houdini VEX solver optimization, multi-node cloud farm bursting, and deep compositing in Nuke.</p>
        </div>

        <!-- Pillar 4 -->
        <div class="pillar-card">
          <div class="pillar-title">04. IN-CAMERA VFX & VIRTUAL PRODUCTION</div>
          <p class="pillar-desc">LED volume calibration, camera sensor-to-panel color synchronization (OpenVPCal), and Unreal Engine 5.8 stage orchestration.</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:3000/news" class="cta-button">Access Today's Latest Intelligence &rarr;</a>
        </div>

        <!-- Author Signature -->
        <div class="author-signature">
          <p class="signature-name">Raja Rathna Reddy</p>
          <p class="signature-role">FX Pipeline TD &amp; AI Architect &bull; Founder, FRAMELINE</p>
          <div class="social-links">
            <a href="https://rajarathnareddy.com" target="_blank">&bull; rajarathnareddy.com</a>
            <a href="https://www.imdb.com/name/nm12830221/" target="_blank">&bull; IMDb (nm12830221)</a>
            <a href="https://www.linkedin.com/in/rajarathnareddy/" target="_blank">&bull; LinkedIn</a>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="margin: 0 0 8px 0;">
          FRAMELINE &bull; Published by Raja Rathna Reddy &bull; High-Throughput Studio Intelligence
        </p>
        <p style="margin: 0;">
          You received this email because you subscribed on <a href="https://rajarathnareddy.com">rajarathnareddy.com</a> or FRAMELINE.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function getWeeklyDigestHtml(articles: any[]): string {
  const articlesHtml = articles.slice(0, 5).map(a => `
    <div style="background-color: #15181C; border: 1px solid #282D35; border-radius: 8px; padding: 18px; margin-bottom: 16px;">
      <div style="font-family: monospace; font-size: 11px; color: #E63946; text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">
        ${(a.category || 'INDUSTRY').toUpperCase()} &bull; ${a.readTime || 7} MIN READ
      </div>
      <h3 style="margin: 0 0 8px 0; font-size: 17px; color: #FFFFFF; font-weight: 700;">
        <a href="http://localhost:3000/article/${a.slug}" style="color: #FFFFFF; text-decoration: none;">
          ${a.title}
        </a>
      </h3>
      <p style="margin: 0; font-size: 13px; color: #94A3B8; line-height: 1.6;">
        ${a.dek}
      </p>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>FRAMELINE Weekly Intelligence Digest</title>
</head>
<body style="margin: 0; padding: 0; background-color: #08090A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #E2E8F0;">
  <div style="width: 100%; background-color: #08090A; padding: 40px 15px;">
    <div style="max-width: 640px; margin: 0 auto; background-color: #0F1113; border: 1px solid #23272D; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(180deg, #181B1F 0%, #0F1113 100%); padding: 32px; border-bottom: 1px solid #23272D;">
        <div style="font-family: monospace; font-size: 10px; letter-spacing: 2px; color: #3EE6FF; text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">WEEKLY INTELLIGENCE REPORT</div>
        <h1 style="font-size: 24px; font-weight: 900; color: #FFFFFF; margin: 0;">FRAMELINE WEEKLY</h1>
        <div style="font-size: 12px; color: #94A3B8; font-family: monospace; margin-top: 4px;">Curated by Raja Rathna Reddy (FX Pipeline TD &amp; AI Architect)</div>
      </div>
      <div style="padding: 32px;">
        <p style="font-size: 14px; color: #CBD5E1; line-height: 1.6; margin-bottom: 24px;">
          Here are this week's highest-priority dispatches across film compute, AI video infrastructure, and visual effects engineering:
        </p>
        ${articlesHtml}
        <div style="text-align: center; margin-top: 30px;">
          <a href="http://localhost:3000/news" style="display: inline-block; background-color: #E63946; color: #FFFFFF; text-decoration: none; font-weight: 700; font-size: 12px; font-family: monospace; letter-spacing: 1px; text-transform: uppercase; padding: 12px 24px; border-radius: 6px;">Read All 600 Catalog Reports &rarr;</a>
        </div>
      </div>
      <div style="background-color: #0A0B0D; padding: 20px; border-top: 1px solid #1C2025; font-size: 11px; color: #64748B; font-family: monospace; text-align: center;">
        FRAMELINE &bull; <a href="https://rajarathnareddy.com" style="color: #94A3B8;">rajarathnareddy.com</a> &bull; IMDb nm12830221
      </div>
    </div>
  </div>
</body>
</html>`;
}
