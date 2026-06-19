import { z } from 'zod';
/**
 * Public, homepage-facing site health. Returned by the backend's
 * `GET /api/site/health` — the first real FE→BE cross-origin call.
 *
 * Reuses `HealthStatus` for consistency. Distinct from the internal
 * `HealthResponse` (which carries `uptimeSeconds`): this public shape carries an
 * ISO-8601 `time` instead and has no DB dependency.
 */
export declare const SiteHealth: z.ZodObject<{
    status: z.ZodEnum<["ok", "degraded"]>;
    service: z.ZodLiteral<"website-backend">;
    version: z.ZodString;
    time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "ok" | "degraded";
    service: "website-backend";
    version: string;
    time: string;
}, {
    status: "ok" | "degraded";
    service: "website-backend";
    version: string;
    time: string;
}>;
export type SiteHealth = z.infer<typeof SiteHealth>;
//# sourceMappingURL=site.d.ts.map