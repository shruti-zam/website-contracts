import { z } from 'zod';
/** Shared health/readiness shapes for the website-backend. */
export declare const HealthStatus: z.ZodEnum<["ok", "degraded"]>;
export type HealthStatus = z.infer<typeof HealthStatus>;
export declare const HealthResponse: z.ZodObject<{
    status: z.ZodEnum<["ok", "degraded"]>;
    service: z.ZodLiteral<"website-backend">;
    version: z.ZodString;
    uptimeSeconds: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    status: "ok" | "degraded";
    service: "website-backend";
    version: string;
    uptimeSeconds: number;
}, {
    status: "ok" | "degraded";
    service: "website-backend";
    version: string;
    uptimeSeconds: number;
}>;
export type HealthResponse = z.infer<typeof HealthResponse>;
export declare const DbHealthResponse: z.ZodObject<{
    status: z.ZodEnum<["ok", "degraded"]>;
    db: z.ZodEnum<["connected", "unconfigured", "unreachable"]>;
}, "strip", z.ZodTypeAny, {
    status: "ok" | "degraded";
    db: "connected" | "unconfigured" | "unreachable";
}, {
    status: "ok" | "degraded";
    db: "connected" | "unconfigured" | "unreachable";
}>;
export type DbHealthResponse = z.infer<typeof DbHealthResponse>;
//# sourceMappingURL=health.d.ts.map