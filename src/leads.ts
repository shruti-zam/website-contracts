import { z } from 'zod';

/**
 * Lead-capture contracts — Book-a-Demo + newsletter. Validated by the SAME
 * schema on both sides (FE form + BE endpoint), so the business-email rule and
 * field constraints can never drift.
 */

// Free / consumer email providers rejected for the demo "work email" field.
const FREE_EMAIL_DOMAINS = new Set<string>([
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.co.uk', 'yahoo.co.in', 'ymail.com', 'rocketmail.com',
  'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'live.com', 'msn.com',
  'icloud.com', 'me.com', 'mac.com',
  'proton.me', 'protonmail.com', 'pm.me',
  'aol.com', 'gmx.com', 'gmx.net', 'gmx.de', 'mail.com',
  'zoho.com', 'yandex.com', 'yandex.ru',
]);

// Obvious disposable / throwaway providers.
const DISPOSABLE_EMAIL_DOMAINS = new Set<string>([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', 'sharklasers.com',
  '10minutemail.com', 'tempmail.com', 'temp-mail.org', 'trashmail.com',
  'yopmail.com', 'getnada.com', 'dispostable.com', 'maildrop.cc',
  'throwawaymail.com', 'fakeinbox.com', 'mailnesia.com', 'mintemail.com',
  'tempmailo.com', 'moakt.com', 'emailondeck.com',
]);

/** Extract the lowercased domain from an email address. */
function emailDomain(email: string): string {
  return email.slice(email.lastIndexOf('@') + 1).toLowerCase().trim();
}

/** True when the email is a usable business address (not free/disposable). */
export function isBusinessEmail(email: string): boolean {
  const domain = emailDomain(email);
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain) && !DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

export const DemoRole = z.enum(['IT', 'L&D', 'Operations', 'HR', 'Founder', 'Other']);
export type DemoRole = z.infer<typeof DemoRole>;

export const CompanySize = z.enum(['<200', '200-1,000', '1,000-5,000', '5,000+']);
export type CompanySize = z.infer<typeof CompanySize>;

export const DemoRequest = z.object({
  fullName: z.string().min(1).max(200),
  workEmail: z
    .string()
    .email()
    .max(320)
    .refine(isBusinessEmail, { message: 'Please use your work email.' }),
  company: z.string().min(1).max(200),
  role: DemoRole,
  companySize: CompanySize,
  painText: z.string().max(4000).optional(),
  source: z.string().max(64).optional().default('website'),
});
export type DemoRequest = z.infer<typeof DemoRequest>;

export const NewsletterSignup = z.object({
  email: z.string().email().max(320),
  source: z.string().max(64).optional().default('footer'),
});
export type NewsletterSignup = z.infer<typeof NewsletterSignup>;
