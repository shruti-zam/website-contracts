/**
 * @crezam/website-contracts — single source of truth for shapes crossing the
 * Crezam website FE↔BE boundary (request/response, enums, WS frame types).
 *
 * Consumers (website-backend, website-frontend) pin this package by exact SHA
 * and import from `@crezam/website-contracts`. FE & BE always ship at the SAME
 * SHA — no contract drift. See README "Bumping a contract".
 */
export * from './error.js';
export * from './health.js';
export * from './site.js';
export * from './ws.js';
//# sourceMappingURL=index.d.ts.map