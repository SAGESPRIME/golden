/**
 * Rate limiter in-memory par IP.
 * Adapté pour Vercel Edge / serverless : chaque instance a son propre état.
 * Pour un déploiement multi-instance à fort trafic, remplacer par Upstash Redis.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Nettoyage périodique pour éviter la fuite mémoire
let lastCleanup = Date.now();
function maybeCleanup() {
  if (Date.now() - lastCleanup < 60_000) return;
  lastCleanup = Date.now();
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}

/**
 * @param key    Identifiant (ex: IP)
 * @param limit  Nombre maximum de requêtes sur la fenêtre
 * @param windowMs  Durée de la fenêtre en ms
 * @returns true si la requête est autorisée, false si la limite est dépassée
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  maybeCleanup();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}

/** Extrait l'IP depuis les headers Next.js (compatible Vercel) */
export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers.get('x-real-ip') ??
    'unknown'
  );
}
