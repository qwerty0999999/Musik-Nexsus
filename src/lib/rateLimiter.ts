type Entry = { count: number; expiresAt: number };

const store = new Map<string, Entry>();

export function checkRateLimit(request: Request, limit = 60, windowMs = 60_000) {
  const forwarded = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
  const ip = forwarded.split(',')[0].trim() || request.headers.get('host') || 'unknown';

  const now = Date.now();
  const existing = store.get(ip);
  if (!existing || existing.expiresAt <= now) {
    store.set(ip, { count: 1, expiresAt: now + windowMs });
    return { remaining: limit - 1, reset: now + windowMs };
  }

  existing.count += 1;
  store.set(ip, existing);

  if (existing.count > limit) {
    const retryAfter = Math.ceil((existing.expiresAt - now) / 1000);
    const err: any = new Error('Rate limit exceeded');
    err.retryAfter = retryAfter;
    throw err;
  }

  return { remaining: Math.max(0, limit - existing.count), reset: existing.expiresAt };
}
