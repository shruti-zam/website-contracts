/**
 * Contract smoke — asserts each exported schema accepts a valid value and
 * rejects an invalid one. Run with `pnpm test`. This is the package's proof
 * that the schemas behave; not a substitute for the backend's real-stack smoke.
 */
import {
  ErrorEnvelope,
  HealthResponse,
  DbHealthResponse,
  SiteHealth,
  WsClientFrame,
  WsServerFrame,
} from '../src/index.js';

let failed = 0;
function check(name: string, cond: boolean): void {
  if (cond) {
    console.log(`  PASS  ${name}`);
  } else {
    console.error(`  FAIL  ${name}`);
    failed++;
  }
}

// Valid values parse.
check('ErrorEnvelope valid', ErrorEnvelope.safeParse({ error: { code: 'NOT_FOUND', message: 'x', requestId: 'r1' } }).success);
check('HealthResponse valid', HealthResponse.safeParse({ status: 'ok', service: 'website-backend', version: '0.0.1', uptimeSeconds: 1 }).success);
check('DbHealthResponse valid', DbHealthResponse.safeParse({ status: 'degraded', db: 'unconfigured' }).success);
check('WsClientFrame ping valid', WsClientFrame.safeParse({ type: 'ping' }).success);
check('WsClientFrame echo valid', WsClientFrame.safeParse({ type: 'echo', payload: 'hi' }).success);
check('WsServerFrame echo valid', WsServerFrame.safeParse({ type: 'echo', payload: 'hi', requestId: 'r1' }).success);
check('SiteHealth valid', SiteHealth.safeParse({ status: 'ok', service: 'website-backend', version: '0.2.0', time: '2026-06-19T12:00:00.000Z' }).success);

// Invalid values are rejected.
check('ErrorEnvelope rejects bad code', !ErrorEnvelope.safeParse({ error: { code: 'NOPE', message: 'x', requestId: 'r1' } }).success);
check('HealthResponse rejects wrong service', !HealthResponse.safeParse({ status: 'ok', service: 'other', version: '1', uptimeSeconds: 1 }).success);
check('WsClientFrame rejects unknown type', !WsClientFrame.safeParse({ type: 'audio' }).success);
check('WsClientFrame rejects oversized echo', !WsClientFrame.safeParse({ type: 'echo', payload: 'x'.repeat(64_001) }).success);
check('SiteHealth rejects non-ISO time', !SiteHealth.safeParse({ status: 'ok', service: 'website-backend', version: '0.2.0', time: 'not-a-time' }).success);

console.log(`\nContract smoke: ${failed === 0 ? 'ALL PASS' : `${failed} FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
