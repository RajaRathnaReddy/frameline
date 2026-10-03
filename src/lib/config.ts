/**
 * Render Line — Centralized Application Configuration
 * Single source of truth for site branding, domain, tags, and partner links.
 */

export const SITE_NAME = 'Render Line';
export const SITE_SHORT = 'renderline';
export const SITE_TAGLINE = 'AI · VFX · Hollywood · Film Technology';
export const SITE_DESCRIPTION = 'The premium news platform for film technology, visual effects, AI in cinema, virtual production, and Hollywood industry coverage.';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://vfx.rajarathnareddy.com'
).replace(/\/$/, '');

// Sponsor URLs
export const SPONSOR_NVIDIA_URL = process.env.SPONSOR_NVIDIA_URL || '/advertise';

// Feature Flags
export const SHOW_AI_DISCLOSURE = process.env.SHOW_AI_DISCLOSURE === 'true';

// Email & Administration
export const SENDER_NAME = process.env.SENDER_NAME || `Raja Rathna Reddy | ${SITE_NAME}`;
export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'vfx@rajarathnareddy.com';
export const ADMIN_KEY = 'renderline_admin_2026';
