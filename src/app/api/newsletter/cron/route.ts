import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/data';
import { getActiveSubscribers } from '@/lib/email/subscribers';
import { sendBroadcastDigest } from '@/lib/email/mailer';

export async function GET(request: Request) {
  return handleCron(request);
}

export async function POST(request: Request) {
  return handleCron(request);
}

async function handleCron(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const expectedKey = process.env.CRON_SECRET || 'renderline_secret_2026';

    // Optional secret key verification (if CRON_SECRET is set)
    if (process.env.CRON_SECRET && key !== expectedKey) {
      return NextResponse.json({ success: false, error: 'Unauthorized cron key.' }, { status: 401 });
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
      { success: false, error: error?.message || 'Failed executing newsletter cron job.' },
      { status: 500 }
    );
  }
}
