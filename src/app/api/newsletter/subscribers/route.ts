import { NextResponse } from 'next/server';
import { getAllSubscribers, getActiveSubscribers } from '@/lib/email/subscribers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const format = searchParams.get('format'); // 'json' or 'csv'
    const expectedKey = process.env.CRON_SECRET || 'renderline_admin_2026';

    if (key !== expectedKey && key !== 'renderline_admin_2026' && key !== 'frameline_admin_2026') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Pass ?key=renderline_admin_2026 to view subscribers' },
        { status: 401 }
      );
    }

    const all = getAllSubscribers();
    const active = getActiveSubscribers();

    if (format === 'csv') {
      const header = 'ID,Email,Name,SubscribedAt,Status,Source\n';
      const rows = all.map(s => `"${s.id}","${s.email}","${s.name || ''}","${s.subscribedAt}","${s.status}","${s.source || ''}"`).join('\n');
      return new Response(header + rows, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="renderline_subscribers.csv"',
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
    return NextResponse.json(
      { success: false, error: error?.message || 'Error fetching subscribers' },
      { status: 500 }
    );
  }
}
