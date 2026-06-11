import { z } from 'zod';

/**
 * Consistent error envelope returned by EVERY website-backend endpoint, and the
 * shape the frontend relies on. Wire contract only — the server-side AppError
 * class and HTTP status mapping stay in the backend.
 *
 *   { "error": { "code": "BAD_REQUEST", "message": "...", "requestId": "...",
 *                "details"?: unknown } }
 */
export const ErrorCode = z.enum([
  'BAD_REQUEST',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'NOT_FOUND',
  'CONFLICT',
  'RATE_LIMITED',
  'INTERNAL',
  'SERVICE_UNAVAILABLE',
]);
export type ErrorCode = z.infer<typeof ErrorCode>;

export const ErrorEnvelope = z.object({
  error: z.object({
    code: ErrorCode,
    message: z.string(),
    requestId: z.string(),
    details: z.unknown().optional(),
  }),
});
export type ErrorEnvelope = z.infer<typeof ErrorEnvelope>;
