import { z } from 'zod';

/**
 * WebSocket frame contracts. Discriminated on `type`.
 *
 * Forward-compat seam: ZAM Guide/Act stream frames (audio/vision/intent) extend
 * these unions in a future contracts bump — clients branch on `frame.type`, so
 * new variants are additive and never inlined in handlers.
 */
export const WsClientFrame = z.discriminatedUnion('type', [
  z.object({ type: z.literal('ping') }),
  z.object({ type: z.literal('echo'), payload: z.string().max(64_000) }),
]);
export type WsClientFrame = z.infer<typeof WsClientFrame>;

export const WsServerFrame = z.discriminatedUnion('type', [
  z.object({ type: z.literal('pong'), at: z.string() }),
  z.object({ type: z.literal('echo'), payload: z.string(), requestId: z.string() }),
  z.object({ type: z.literal('error'), code: z.string(), message: z.string() }),
]);
export type WsServerFrame = z.infer<typeof WsServerFrame>;
