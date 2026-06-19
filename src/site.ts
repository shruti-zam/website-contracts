import { z } from 'zod';
import { HealthStatus } from './health.js';

/**
 * Public, homepage-facing site health. Returned by the backend's
 * `GET /api/site/health` — the first real FE→BE cross-origin call.
 *
 * Reuses `HealthStatus` for consistency. Distinct from the internal
 * `HealthResponse` (which carries `uptimeSeconds`): this public shape carries an
 * ISO-8601 `time` instead and has no DB dependency.
 */
export const SiteHealth = z.object({
  status: HealthStatus, // 'ok' | 'degraded' (endpoint returns 'ok' when serving)
  service: z.literal('website-backend'),
  version: z.string(),
  time: z.string().datetime(), // ISO-8601, e.g. '2026-06-19T12:00:00.000Z'
});
export type SiteHealth = z.infer<typeof SiteHealth>;
