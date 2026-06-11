import { z } from 'zod';
/**
 * Consistent error envelope returned by EVERY website-backend endpoint, and the
 * shape the frontend relies on. Wire contract only — the server-side AppError
 * class and HTTP status mapping stay in the backend.
 *
 *   { "error": { "code": "BAD_REQUEST", "message": "...", "requestId": "...",
 *                "details"?: unknown } }
 */
export declare const ErrorCode: z.ZodEnum<["BAD_REQUEST", "UNAUTHORIZED", "FORBIDDEN", "NOT_FOUND", "CONFLICT", "RATE_LIMITED", "INTERNAL", "SERVICE_UNAVAILABLE"]>;
export type ErrorCode = z.infer<typeof ErrorCode>;
export declare const ErrorEnvelope: z.ZodObject<{
    error: z.ZodObject<{
        code: z.ZodEnum<["BAD_REQUEST", "UNAUTHORIZED", "FORBIDDEN", "NOT_FOUND", "CONFLICT", "RATE_LIMITED", "INTERNAL", "SERVICE_UNAVAILABLE"]>;
        message: z.ZodString;
        requestId: z.ZodString;
        details: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        code: "BAD_REQUEST" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "RATE_LIMITED" | "INTERNAL" | "SERVICE_UNAVAILABLE";
        message: string;
        requestId: string;
        details?: unknown;
    }, {
        code: "BAD_REQUEST" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "RATE_LIMITED" | "INTERNAL" | "SERVICE_UNAVAILABLE";
        message: string;
        requestId: string;
        details?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: "BAD_REQUEST" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "RATE_LIMITED" | "INTERNAL" | "SERVICE_UNAVAILABLE";
        message: string;
        requestId: string;
        details?: unknown;
    };
}, {
    error: {
        code: "BAD_REQUEST" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "RATE_LIMITED" | "INTERNAL" | "SERVICE_UNAVAILABLE";
        message: string;
        requestId: string;
        details?: unknown;
    };
}>;
export type ErrorEnvelope = z.infer<typeof ErrorEnvelope>;
//# sourceMappingURL=error.d.ts.map