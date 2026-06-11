import { z } from 'zod';
/**
 * WebSocket frame contracts. Discriminated on `type`.
 *
 * Forward-compat seam: ZAM Guide/Act stream frames (audio/vision/intent) extend
 * these unions in a future contracts bump — clients branch on `frame.type`, so
 * new variants are additive and never inlined in handlers.
 */
export declare const WsClientFrame: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"ping">;
}, "strip", z.ZodTypeAny, {
    type: "ping";
}, {
    type: "ping";
}>, z.ZodObject<{
    type: z.ZodLiteral<"echo">;
    payload: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "echo";
    payload: string;
}, {
    type: "echo";
    payload: string;
}>]>;
export type WsClientFrame = z.infer<typeof WsClientFrame>;
export declare const WsServerFrame: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"pong">;
    at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    at: string;
    type: "pong";
}, {
    at: string;
    type: "pong";
}>, z.ZodObject<{
    type: z.ZodLiteral<"echo">;
    payload: z.ZodString;
    requestId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "echo";
    requestId: string;
    payload: string;
}, {
    type: "echo";
    requestId: string;
    payload: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"error">;
    code: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    type: "error";
}, {
    code: string;
    message: string;
    type: "error";
}>]>;
export type WsServerFrame = z.infer<typeof WsServerFrame>;
//# sourceMappingURL=ws.d.ts.map