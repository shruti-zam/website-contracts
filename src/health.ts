import { z } from 'zod';

/** Shared health/readiness shapes for the website-backend. */
export const HealthStatus = z.enum(['ok', 'degraded']);
export type HealthStatus = z.infer<typeof HealthStatus>;

export const HealthResponse = z.object({
  status: HealthStatus,
  service: z.literal('website-backend'),
  version: z.string(),
  uptimeSeconds: z.number().nonnegative(),
});
export type HealthResponse = z.infer<typeof HealthResponse>;

export const DbHealthResponse = z.object({
  status: HealthStatus,
  db: z.enum(['connected', 'unconfigured', 'unreachable']),
});
export type DbHealthResponse = z.infer<typeof DbHealthResponse>;
