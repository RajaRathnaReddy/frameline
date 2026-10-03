import { categories } from './data';

/**
 * Format a date as timecode-style: "00:14:32 · 01 OCT 2026"
 */
export function formatTimecode(dateStr: string): string {
  const date = new Date(dateStr);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  return `${hours}:${minutes}:${seconds} · ${day} ${month} ${year}`;
}

/**
 * Get category CSS class for color coding
 */
export function getCategoryClass(categorySlug: string): string {
  const cat = categories.find(c => c.slug === categorySlug);
  return cat?.cssClass || 'cat-tech';
}

/**
 * Get category display name
 */
export function getCategoryName(categorySlug: string): string {
  const cat = categories.find(c => c.slug === categorySlug);
  return cat?.name || categorySlug;
}

/**
 * Get category color
 */
export function getCategoryColor(categorySlug: string): string {
  const colorMap: Record<string, string> = {
    ai: '#3EE6FF',
    vfx: '#8B5CFF',
    hollywood: '#E8B44A',
    tools: '#B4F34A',
    'virtual-production': '#FF8C42',
    tech: '#F2F2F0',
    music: '#EC4899',
  };
  return colorMap[categorySlug] || '#F2F2F0';
}

/**
 * Truncate text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Generate reading time estimate
 */
export function estimateReadTime(text: string): number {
  if (!text) return 5;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * cn – simple class name joiner
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Check if article qualifies for BREAKING label:
 * Must have breaking flag AND published within the last 48 hours
 */
export function isBreaking(publishedAt?: string, breaking?: boolean): boolean {
  if (!breaking || !publishedAt) return false;
  const pubTime = new Date(publishedAt).getTime();
  if (isNaN(pubTime)) return false;
  const diffHours = (Date.now() - pubTime) / (1000 * 60 * 60);
  return diffHours >= 0 && diffHours <= 48;
}
