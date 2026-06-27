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
  DemoRequest,
  NewsletterSignup,
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

const demoOk = { fullName: 'Ada Lovelace', workEmail: 'ada@acme.io', company: 'Acme', role: 'IT', companySize: '200-1,000' };
check('DemoRequest valid (business email)', DemoRequest.safeParse(demoOk).success);
check('DemoRequest source defaults to website', DemoRequest.parse(demoOk).source === 'website');
check('NewsletterSignup valid', NewsletterSignup.safeParse({ email: 'reader@example.com' }).success);
check('NewsletterSignup source defaults to footer', NewsletterSignup.parse({ email: 'reader@example.com' }).source === 'footer');

// Invalid values are rejected.
check('ErrorEnvelope rejects bad code', !ErrorEnvelope.safeParse({ error: { code: 'NOPE', message: 'x', requestId: 'r1' } }).success);
check('HealthResponse rejects wrong service', !HealthResponse.safeParse({ status: 'ok', service: 'other', version: '1', uptimeSeconds: 1 }).success);
check('WsClientFrame rejects unknown type', !WsClientFrame.safeParse({ type: 'audio' }).success);
check('WsClientFrame rejects oversized echo', !WsClientFrame.safeParse({ type: 'echo', payload: 'x'.repeat(64_001) }).success);
check('SiteHealth rejects non-ISO time', !SiteHealth.safeParse({ status: 'ok', service: 'website-backend', version: '0.2.0', time: 'not-a-time' }).success);
check('DemoRequest rejects free email (gmail)', !DemoRequest.safeParse({ ...demoOk, workEmail: 'ada@gmail.com' }).success);
check('DemoRequest rejects disposable email', !DemoRequest.safeParse({ ...demoOk, workEmail: 'ada@mailinator.com' }).success);
check('DemoRequest rejects bad role', !DemoRequest.safeParse({ ...demoOk, role: 'CEO' }).success);
check('DemoRequest rejects bad companySize', !DemoRequest.safeParse({ ...demoOk, companySize: 'huge' }).success);
check('NewsletterSignup rejects bad email', !NewsletterSignup.safeParse({ email: 'not-an-email' }).success);

console.log(`\nContract smoke: ${failed === 0 ? 'ALL PASS' : `${failed} FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
