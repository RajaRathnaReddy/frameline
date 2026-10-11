import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/email/subscribers';
import { sendWelcomeEmail, notifyAdminNewSubscriber } from '@/lib/email/mailer';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`subscribe_${clientIp}`, 5, 10 * 60 * 1000);

    if (!rateCheck.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many subscription attempts. Please wait ${rateCheck.resetInSeconds} seconds before trying again.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.resetInSeconds),
          },
        }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }

    // Anti-bot honeypot: automated bots often fill out all input fields
    if (body.hp_website || body.confirm_address) {
      // Return synthetic success so bot thinks it completed, without processing or emailing
      return NextResponse.json({
        success: true,
        message: 'Welcome to RENDERLINE Intelligence! Your inaugural welcome dispatch has been sent to your inbox.',
      });
    }

    const { email, name, source, topics } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim();

    // RFC 5321 length check
    if (trimmedEmail.length > 254) {
      return NextResponse.json(
        { success: false, error: 'Email address exceeds maximum length.' },
        { status: 400 }
      );
    }

    // Prevent SMTP CRLF injection
    if (/[\r\n]/.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid characters in email address.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email format.' },
        { status: 400 }
      );
    }

    // Sanitize name if provided
    let sanitizedName: string | undefined = undefined;
    if (typeof name === 'string' && name.trim().length > 0) {
      const cleanName = name.trim().slice(0, 100);
      if (/[\r\n]/.test(cleanName)) {
        return NextResponse.json(
          { success: false, error: 'Invalid characters in name.' },
          { status: 400 }
        );
      }
      sanitizedName = cleanName;
    }

    const sanitizedSource = typeof source === 'string' ? source.slice(0, 50) : 'website';
    const sanitizedTopics = Array.isArray(topics)
      ? topics.filter((t): t is string => typeof t === 'string').map(t => t.slice(0, 50))
      : undefined;

    // Add subscriber to database
    const { subscriber, isNew } = addSubscriber(trimmedEmail, sanitizedName, sanitizedSource, sanitizedTopics);

    // Send welcome letter via real SMTP
    let welcomeStatus: { success: boolean; messageId?: string; error?: string } = { success: false };
    try {
      welcomeStatus = await sendWelcomeEmail(subscriber.email, subscriber.name);
    } catch (mailError: any) {
      console.error('Welcome email dispatch error:', mailError);
      welcomeStatus = { success: false, error: 'SMTP delivery delayed' };
    }

    // Alert admin of new subscriber so no subscriber is ever lost
    if (isNew) {
      notifyAdminNewSubscriber(subscriber.email, subscriber.name, sanitizedSource).catch(err => {
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
      { success: false, error: 'Internal server error processing subscription.' },
      { status: 500 }
    );
  }
}
