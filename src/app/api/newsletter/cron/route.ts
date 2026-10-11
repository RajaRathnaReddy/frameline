import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAllArticles } from '@/lib/data';
import { getActiveSubscribers } from '@/lib/email/subscribers';
import { sendBroadcastDigest } from '@/lib/email/mailer';

function safeCompare(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function verifyCronAuth(request: Request): boolean {
  const { searchParams } = new URL(request.url);
  const queryKey = searchParams.get('key');
  const authHeader = request.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const candidate = bearerToken || queryKey;

  if (!candidate) return false;

  const cronSecret = process.env.CRON_SECRET;
  const adminKey = process.env.ADMIN_API_KEY;

  if (cronSecret && safeCompare(candidate, cronSecret)) return true;
  if (adminKey && safeCompare(candidate, adminKey)) return true;

  return false;
}

export async function GET(request: Request) {
  return handleCron(request);
}

export async function POST(request: Request) {
  return handleCron(request);
}

async function handleCron(request: Request) {
  try {
    if (!verifyCronAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized.' },
        { status: 401 }
      );
    }

    const allArticles = getAllArticles();
    // Select top 5 latest articles for the digest
    const digestArticles = allArticles.slice(0, 5);

    const activeSubscribers = getActiveSubscribers();

    if (activeSubscribers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No active subscribers found in database.',
        dispatched: 0,
      });
    }

    const results = await sendBroadcastDigest(digestArticles);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      digestEdition: `RENDERLINE Weekly Dispatch — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      articlesIncluded: digestArticles.map(a => ({ title: a.title, slug: a.slug, category: a.category })),
      summary: results,
    });
  } catch (error: any) {
    console.error('Newsletter cron dispatch failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed executing newsletter cron job.' },
      { status: 500 }
    );
  }
}
