import nodemailer from 'nodemailer';
import { getWelcomeEmailHtml, getWeeklyDigestHtml } from './templates';
import { getActiveSubscribers } from './subscribers';

const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.rajarathnareddy.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true, // SSL for 465
  auth: {
    user: process.env.SMTP_USER || 'vfx@rajarathnareddy.com',
    pass: process.env.SMTP_PASS || 'Raja@777.',
  },
  tls: {
    rejectUnauthorized: false, // Required for server-level self-signed cert chain
  },
};

const FROM_ADDRESS = process.env.SMTP_FROM || '"Raja Rathna Reddy | FRAMELINE" <vfx@rajarathnareddy.com>';

export function createMailerTransport() {
  return nodemailer.createTransport(SMTP_CONFIG);
}

export async function verifyTransporter(): Promise<{ success: boolean; message: string }> {
  try {
    const transporter = createMailerTransport();
    await transporter.verify();
    return { success: true, message: 'SMTP server connection established and verified.' };
  } catch (error: any) {
    console.error('SMTP connection error:', error);
    return { success: false, message: error?.message || 'SMTP verification failed.' };
  }
}

export async function sendWelcomeEmail(
  toEmail: string,
  name?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = createMailerTransport();
    const html = getWelcomeEmailHtml(name);

    const info = await transporter.sendMail({
      from: FROM_ADDRESS,
      to: toEmail,
      subject: 'Welcome to FRAMELINE Intelligence — Scene 01 / Dispatch 01',
      html,
      text: `Welcome to FRAMELINE Intelligence. Published by Raja Rathna Reddy (FX Pipeline TD & AI Architect). Access our daily briefings at http://localhost:3000/news`,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`Failed to send welcome email to ${toEmail}:`, error);
    return { success: false, error: error?.message || 'Failed to dispatch welcome email.' };
  }
}

export async function sendWeeklyDigestEmail(
  toEmail: string,
  articles: any[]
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = createMailerTransport();
    const html = getWeeklyDigestHtml(articles);

    const info = await transporter.sendMail({
      from: FROM_ADDRESS,
      to: toEmail,
      subject: `FRAMELINE Weekly Intelligence Digest — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      html,
      text: `FRAMELINE Weekly Intelligence Report curated by Raja Rathna Reddy. Read the full reports at http://localhost:3000/news`,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`Failed to send weekly digest to ${toEmail}:`, error);
    return { success: false, error: error?.message || 'Failed to dispatch weekly digest.' };
  }
}

export async function sendBroadcastDigest(
  articles: any[]
): Promise<{ total: number; sent: number; failed: number; errors: any[] }> {
  const subscribers = getActiveSubscribers();
  let sent = 0;
  let failed = 0;
  const errors: any[] = [];

  for (const sub of subscribers) {
    const res = await sendWeeklyDigestEmail(sub.email, articles);
    if (res.success) {
      sent++;
    } else {
      failed++;
      errors.push({ email: sub.email, error: res.error });
    }
  }

  return { total: subscribers.length, sent, failed, errors };
}
