type Bucket = {
  count: number;
  expiresAt: number;
};

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string) {
  const now = Date.now();
  const max = Number(process.env.FORM_RATE_LIMIT_MAX ?? 5);
  const windowMs = Number(process.env.FORM_RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);
  const current = buckets.get(key);

  if (!current || current.expiresAt <= now) {
    buckets.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }

  if (current.count >= max) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  buckets.set(key, current);

  return { allowed: true, remaining: max - current.count };
}
