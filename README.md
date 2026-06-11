# @crezam/website-contracts

Single source of truth for the shapes that cross the **Crezam website FE↔BE
boundary** — request/response bodies, enums, and WebSocket frame types — as
**Zod** schemas (with inferred TypeScript types).

Consumed by:
- **website-backend** (Hono/Drizzle) — validates inbound requests & outbound responses.
- **website-frontend** (Next) — types API calls and the WS client.

> One package, one truth. FE and BE **pin the same exact SHA** and ship together.
> No contract drift.

## Install (pin by exact SHA — never a range)

```bash
pnpm add github:shruti-zam/website-contracts#<SHA>
```

```ts
import { HealthResponse, ErrorEnvelope, WsClientFrame } from '@crezam/website-contracts';

const parsed = HealthResponse.parse(await res.json());
```

The package builds on install (a `prepare` script runs `tsc` → `dist/`), so a
git/SHA pin is directly importable. **zod is a peerDependency (`^3.23.8`)** —
the consumer provides zod (both FE and BE are on zod 3). Keep the consumer's zod
major in lockstep with this range.

## What's in it (v0.1.0)

| Export | Kind | Notes |
|---|---|---|
| `ErrorCode`, `ErrorEnvelope` | enum + object | The error envelope every BE endpoint returns. |
| `HealthStatus`, `HealthResponse`, `DbHealthResponse` | enum + objects | Liveness/readiness shapes. |
| `WsClientFrame`, `WsServerFrame` | discriminated unions | WS frames (ping/echo today). The seam ZAM Guide/Act stream frames extend. |

Each export is a Zod schema plus a same-named inferred TypeScript type.

## Scripts

| Command | What |
|---|---|
| `pnpm build` | Compile `src/` → `dist/` (`.js` + `.d.ts`). |
| `pnpm typecheck` | `tsc --noEmit` (strict). |
| `pnpm test` | Contract smoke — each schema accepts a valid value and rejects an invalid one. |

## Bumping a contract (the protocol — no drift)

1. **Propose in `ROUND_1_COMMS.md`** — describe the shape change. The OTHER
   window must **ack** before either side builds against it.
2. **Change the schema here**, bump `version`, `pnpm test`, commit, and **tag**
   (`vX.Y.Z`).
3. Record the new **SHA + tag** in `ROUND_1_LOGS.md` (new row) with the rationale
   in `ROUND_1_COMMS.md`.
4. **Both** website-backend and website-frontend update their pin to the **same
   SHA** and ship together. Never let FE and BE sit on different SHAs.

## Versioning

- `0.x` — shapes may change between minors while the apps are pre-1.0; the SHA
  pin (not the semver range) is what guarantees FE/BE agreement.
- Additive frame variants / optional fields → minor bump. Breaking field changes
  → minor bump too while in `0.x`, but require a fresh proposal + ack.
