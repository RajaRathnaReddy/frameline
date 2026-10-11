import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAllSubscribers, getActiveSubscribers } from '@/lib/email/subscribers';

function safeCompare(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function verifyAdminAuth(request: Request): boolean {
  const { searchParams } = new URL(request.url);
  const queryKey = searchParams.get('key');
  const authHeader = request.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const candidate = bearerToken || queryKey;

  if (!candidate) return false;

  const adminKey = process.env.ADMIN_API_KEY;
  const cronSecret = process.env.CRON_SECRET;

  if (adminKey && safeCompare(candidate, adminKey)) return true;
  if (cronSecret && safeCompare(candidate, cronSecret)) return true;

  return false;
}

export async function GET(request: Request) {
  try {
    if (!verifyAdminAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format'); // 'json' or 'csv'

    const all = getAllSubscribers();
    const active = getActiveSubscribers();

    if (format === 'csv') {
      const header = 'ID,Email,Name,SubscribedAt,Status,Source\n';
      const rows = all
        .map(s => {
          // Escape quotes to prevent CSV injection
          const safeId = String(s.id).replace(/"/g, '""');
          const safeEmail = String(s.email).replace(/"/g, '""');
          const safeName = (s.name || '').replace(/"/g, '""');
          const safeDate = String(s.subscribedAt).replace(/"/g, '""');
          const safeStatus = String(s.status).replace(/"/g, '""');
          const safeSource = (s.source || '').replace(/"/g, '""');
          return `"${safeId}","${safeEmail}","${safeName}","${safeDate}","${safeStatus}","${safeSource}"`;
        })
        .join('\n');

      return new Response(header + rows, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="renderline_subscribers.csv"',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }

    return NextResponse.json({
      success: true,
      totalSubscribers: all.length,
      activeSubscribers: active.length,
      subscribers: all,
    });
  } catch (error: any) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
