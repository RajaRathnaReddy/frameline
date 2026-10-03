import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/email/subscribers';
import { sendWelcomeEmail, notifyAdminNewSubscriber } from '@/lib/email/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, source, topics } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email format.' },
        { status: 400 }
      );
    }

    // Add subscriber to database
    const { subscriber, isNew } = addSubscriber(email, name, source || 'website', topics);

    // Send welcome letter via real SMTP
    let welcomeStatus: { success: boolean; messageId?: string; error?: string } = { success: false };
    try {
      welcomeStatus = await sendWelcomeEmail(subscriber.email, subscriber.name);
    } catch (mailError: any) {
      console.error('Welcome email dispatch error:', mailError);
      welcomeStatus = { success: false, error: mailError?.message || 'SMTP delivery delayed' };
    }

    // Alert admin of new subscriber so no subscriber is ever lost
    if (isNew) {
      notifyAdminNewSubscriber(subscriber.email, subscriber.name, source || 'website').catch(err => {
        console.error('Admin notification dispatch error:', err);
      });
    }

    return NextResponse.json({
      success: true,
      message: isNew
        ? 'Welcome to RENDERLINE Intelligence! Your inaugural welcome dispatch has been sent to your inbox.'
        : 'Welcome back! Your subscription preferences have been updated.',
      subscriber: {
        email: subscriber.email,
        name: subscriber.name,
        subscribedAt: subscriber.subscribedAt,
        status: subscriber.status,
      },
      welcomeEmailSent: welcomeStatus.success,
      messageId: welcomeStatus.messageId,
    });
  } catch (error: any) {
    console.error('Newsletter subscribe API error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error processing subscription.' },
      { status: 500 }
    );
  }
}
