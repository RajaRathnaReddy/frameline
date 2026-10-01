import fs from 'fs';
import path from 'path';

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  source?: string;
  topics?: string[];
}

const SUBSCRIBERS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'subscribers.json');

function ensureSubscribersFile(): void {
  const dir = path.dirname(SUBSCRIBERS_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(SUBSCRIBERS_FILE_PATH)) {
    fs.writeFileSync(SUBSCRIBERS_FILE_PATH, JSON.stringify([], null, 2), 'utf8');
  }
}

export function getAllSubscribers(): Subscriber[] {
  try {
    ensureSubscribersFile();
    const data = fs.readFileSync(SUBSCRIBERS_FILE_PATH, 'utf8');
    return JSON.parse(data) as Subscriber[];
  } catch (error) {
    console.error('Error reading subscribers file:', error);
    return [];
  }
}

export function getActiveSubscribers(): Subscriber[] {
  return getAllSubscribers().filter(sub => sub.status === 'active');
}

export function addSubscriber(
  email: string,
  name?: string,
  source: string = 'website',
  topics?: string[]
): { subscriber: Subscriber; isNew: boolean } {
  ensureSubscribersFile();
  const subscribers = getAllSubscribers();
  const normalizedEmail = email.trim().toLowerCase();

  const existingIndex = subscribers.findIndex(
    s => s.email.toLowerCase() === normalizedEmail
  );

  if (existingIndex >= 0) {
    // Reactivate if unsubscribed or update metadata
    const existing = subscribers[existingIndex];
    existing.status = 'active';
    if (name) existing.name = name;
    if (topics && topics.length > 0) existing.topics = topics;
    subscribers[existingIndex] = existing;

    try {
      fs.writeFileSync(SUBSCRIBERS_FILE_PATH, JSON.stringify(subscribers, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to write updated subscribers:', err);
    }

    return { subscriber: existing, isNew: false };
  }

  const newSubscriber: Subscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: normalizedEmail,
    name: name?.trim() || undefined,
    subscribedAt: new Date().toISOString(),
    status: 'active',
    source,
    topics: topics && topics.length > 0 ? topics : ['General Intelligence'],
  };

  subscribers.push(newSubscriber);

  try {
    fs.writeFileSync(SUBSCRIBERS_FILE_PATH, JSON.stringify(subscribers, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write new subscriber:', err);
  }

  return { subscriber: newSubscriber, isNew: true };
}

export function unsubscribeSubscriber(email: string): boolean {
  ensureSubscribersFile();
  const subscribers = getAllSubscribers();
  const normalizedEmail = email.trim().toLowerCase();

  const sub = subscribers.find(s => s.email.toLowerCase() === normalizedEmail);
  if (!sub) return false;

  sub.status = 'unsubscribed';
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE_PATH, JSON.stringify(subscribers, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Failed to unsubscribe:', err);
    return false;
  }
}
