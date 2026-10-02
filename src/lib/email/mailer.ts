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
      text: `Welcome to FRAMELINE Intelligence. Published by Raja Rathna Reddy (FX Pipeline TD & AI Architect). Access our daily briefings at https://vfx.rajarathnareddy.com/news`,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`Failed to send welcome email to ${toEmail}:`, error);
    return { success: false, error: error?.message || 'Failed to dispatch welcome email.' };
  }
}

export async function notifyAdminNewSubscriber(
  subscriberEmail: string,
  subscriberName?: string,
  source?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = createMailerTransport();
    await transporter.sendMail({
      from: FROM_ADDRESS,
      to: 'vfx@rajarathnareddy.com',
      subject: `🔔 New FRAMELINE Subscriber: ${subscriberEmail}`,
      text: `New subscriber joined FRAMELINE Intelligence:\n\nEmail: ${subscriberEmail}\nName: ${subscriberName || 'Not specified'}\nSource: ${source || 'Website'}\nTime: ${new Date().toUTCString()}\n\nView list at: https://vfx.rajarathnareddy.com/api/newsletter/subscribers?key=frameline_admin_2026`,
      html: `
        <div style="font-family: sans-serif; background: #08090A; color: #FFFFFF; padding: 24px; border-radius: 8px;">
          <h2 style="color: #3EE6FF; margin-top: 0;">🔔 New FRAMELINE Subscriber!</h2>
          <p style="font-size: 15px;">A new reader just subscribed to <strong>The Daily Render / FRAMELINE Intelligence</strong>:</p>
          <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
            <tr><td style="padding: 8px; color: #9BA1A9;">Email:</td><td style="padding: 8px; font-weight: bold; color: #E8B44A;">${subscriberEmail}</td></tr>
            <tr><td style="padding: 8px; color: #9BA1A9;">Name:</td><td style="padding: 8px;">${subscriberName || 'Anonymous'}</td></tr>
            <tr><td style="padding: 8px; color: #9BA1A9;">Source:</td><td style="padding: 8px;">${source || 'Website'}</td></tr>
            <tr><td style="padding: 8px; color: #9BA1A9;">Date:</td><td style="padding: 8px;">${new Date().toUTCString()}</td></tr>
          </table>
          <p style="font-size: 13px; color: #9BA1A9; margin-top: 24px;">This notification was automatically dispatched by the FRAMELINE Newsroom Engine.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error: any) {
    console.error('Failed to notify admin of new subscriber:', error);
    return { success: false, error: error?.message };
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
      text: `FRAMELINE Weekly Intelligence Report curated by Raja Rathna Reddy. Read the full reports at https://vfx.rajarathnareddy.com/news`,
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
