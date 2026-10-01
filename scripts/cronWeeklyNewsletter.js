/**
 * FRAMELINE Intelligence — Weekly Newsletter Cron Dispatcher
 * Run directly via: node scripts/cronWeeklyNewsletter.js
 * Or automate via Windows Task Scheduler, PM2 cron, or GitHub Actions
 */

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Load .env.local if present
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length > 0) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    }
  });
}

const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.rajarathnareddy.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'vfx@rajarathnareddy.com',
    pass: process.env.SMTP_PASS || 'Raja@777.',
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const FROM_ADDRESS = process.env.SMTP_FROM || '"Raja Rathna Reddy | FRAMELINE" <vfx@rajarathnareddy.com>';

async function runCron() {
  console.log('====================================================');
  console.log('🎬 FRAMELINE WEEKLY NEWSLETTER CRON DISPATCHER');
  console.log('Curated by: Raja Rathna Reddy (FX Pipeline TD & AI Architect)');
  console.log('Timestamp:', new Date().toISOString());
  console.log('====================================================');

  const subscribersPath = path.join(__dirname, '..', 'src', 'data', 'subscribers.json');
  if (!fs.existsSync(subscribersPath)) {
    console.log('❌ Subscribers database not found at:', subscribersPath);
    return;
  }

  const subscribers = JSON.parse(fs.readFileSync(subscribersPath, 'utf8'));
  const activeSubscribers = subscribers.filter(s => s.status === 'active');

  console.log(`📋 Total subscribers: ${subscribers.length} | Active: ${activeSubscribers.length}`);

  if (activeSubscribers.length === 0) {
    console.log('⚠️ No active subscribers found. Exiting.');
    return;
  }

  // Connect to SMTP
  console.log(`🔌 Connecting to SMTP ${SMTP_CONFIG.host}:${SMTP_CONFIG.port} (User: ${SMTP_CONFIG.auth.user})...`);
  const transporter = nodemailer.createTransport(SMTP_CONFIG);

  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
  } catch (err) {
    console.error('❌ SMTP verification failed:', err.message);
    return;
  }

  // Featured articles for this week's digest
  const featuredArticles = [
    {
      title: 'OpenUSD 24.11 Solaris Pipeline: Native Hydrav2 & Multi-DCC Asset Sync',
      category: 'VFX & Pipeline',
      readTime: 9,
      slug: 'openusd-solaris-pipeline-hydra2',
      dek: 'Deep architectural dive into Pixar and ILM asset exchange pipelines, USD asset resolvers, and GPU Hydra delegates.',
    },
    {
      title: 'Neural Video Diffusion at 4K 24fps: Benchmarking Cinematic Coherence',
      category: 'AI in Film',
      readTime: 8,
      slug: 'neural-video-diffusion-4k-benchmarks',
      dek: 'Rigorous studio benchmark testing temporal consistency, camera motion vectors, and identity preservation across cutting-edge models.',
    },
    {
      title: 'LED Volume In-Camera VFX: Brompton Tessera SX40 & OpenVPCal Color Sync',
      category: 'Virtual Production',
      readTime: 10,
      slug: 'led-volume-brompton-color-sync',
      dek: 'Eliminating metamerism and sensor spectral response mismatches on high-end Hollywood virtual production soundstages.',
    },
    {
      title: 'Major Hollywood Studios Consolidate Streaming Tech & Compute Budgets',
      category: 'Hollywood',
      readTime: 7,
      slug: 'hollywood-studios-compute-consolidation',
      dek: 'Analysis of studio cloud render farm capital expenditures, local on-prem GPU cluster ROI, and guild compliance mandates.',
    },
  ];

  // Build HTML email
  const articlesHtml = featuredArticles.map(a => `
    <div style="background-color: #15181C; border: 1px solid #282D35; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
      <div style="font-family: monospace; font-size: 11px; color: #E63946; text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">
        ${a.category.toUpperCase()} &bull; ${a.readTime} MIN READ
      </div>
      <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #FFFFFF; font-weight: 700;">
        <a href="http://localhost:3000/article/${a.slug}" style="color: #FFFFFF; text-decoration: none;">
          ${a.title}
        </a>
      </h3>
      <p style="margin: 0; font-size: 13px; color: #94A3B8; line-height: 1.6;">
        ${a.dek}
      </p>
    </div>
  `).join('');

  const digestHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>FRAMELINE Weekly Intelligence Digest</title>
</head>
<body style="margin: 0; padding: 0; background-color: #08090A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #E2E8F0;">
  <div style="width: 100%; background-color: #08090A; padding: 40px 15px;">
    <div style="max-width: 640px; margin: 0 auto; background-color: #0F1113; border: 1px solid #23272D; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
      <div style="background: linear-gradient(180deg, #181B1F 0%, #0F1113 100%); padding: 36px; border-bottom: 1px solid #23272D;">
        <div style="font-family: monospace; font-size: 11px; letter-spacing: 2px; color: #3EE6FF; text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">WEEKLY INTELLIGENCE REPORT</div>
        <h1 style="font-size: 26px; font-weight: 900; color: #FFFFFF; margin: 0;">FRAMELINE WEEKLY</h1>
        <div style="font-size: 13px; color: #94A3B8; font-family: monospace; margin-top: 6px;">Curated by Raja Rathna Reddy &bull; FX Pipeline TD &amp; AI Architect</div>
      </div>
      <div style="padding: 36px;">
        <p style="font-size: 15px; color: #CBD5E1; line-height: 1.7; margin-bottom: 24px;">
          Welcome to this week's executive briefing on film compute, generative neural pipelines, and visual effects engineering. Here are the week's key industry breakthroughs:
        </p>
        ${articlesHtml}
        <div style="text-align: center; margin: 32px 0 16px 0;">
          <a href="http://localhost:3000/news" style="display: inline-block; background-color: #E63946; color: #FFFFFF; text-decoration: none; font-weight: 700; font-size: 13px; font-family: monospace; letter-spacing: 1px; text-transform: uppercase; padding: 14px 28px; border-radius: 6px;">
            Explore All 600 Industry Reports &rarr;
          </a>
        </div>
      </div>
      <div style="background-color: #0A0B0D; padding: 24px 36px; border-top: 1px solid #1C2025; font-size: 11px; color: #64748B; font-family: monospace; text-align: center; line-height: 1.6;">
        <p style="margin: 0 0 6px 0;">FRAMELINE &bull; Published by Raja Rathna Reddy</p>
        <p style="margin: 0;"><a href="https://rajarathnareddy.com" style="color: #94A3B8; text-decoration: underline;">rajarathnareddy.com</a> &bull; IMDb nm12830221</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  console.log(`🚀 Dispatching weekly digest to ${activeSubscribers.length} subscriber(s)...`);

  let sentCount = 0;
  for (const sub of activeSubscribers) {
    try {
      console.log(`📧 Sending to ${sub.email}...`);
      const info = await transporter.sendMail({
        from: FROM_ADDRESS,
        to: sub.email,
        subject: `FRAMELINE Weekly Intelligence Dispatch — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        html: digestHtml,
        text: `FRAMELINE Weekly Intelligence Digest. Read top reports at http://localhost:3000/news`,
      });
      console.log(`   ✅ Sent! MessageID: ${info.messageId}`);
      sentCount++;
    } catch (sendErr) {
      console.error(`   ❌ Failed sending to ${sub.email}:`, sendErr.message);
    }
  }

  console.log('====================================================');
  console.log(`🎉 Cron completed! Successfully sent: ${sentCount}/${activeSubscribers.length}`);
  console.log('====================================================');
}

runCron();
