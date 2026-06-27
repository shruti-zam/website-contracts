import { z } from 'zod';
/** True when the email is a usable business address (not free/disposable). */
export declare function isBusinessEmail(email: string): boolean;
export declare const DemoRole: z.ZodEnum<["IT", "L&D", "Operations", "HR", "Founder", "Other"]>;
export type DemoRole = z.infer<typeof DemoRole>;
export declare const CompanySize: z.ZodEnum<["<200", "200-1,000", "1,000-5,000", "5,000+"]>;
export type CompanySize = z.infer<typeof CompanySize>;
export declare const DemoRequest: z.ZodObject<{
    fullName: z.ZodString;
    workEmail: z.ZodEffects<z.ZodString, string, string>;
    company: z.ZodString;
    role: z.ZodEnum<["IT", "L&D", "Operations", "HR", "Founder", "Other"]>;
    companySize: z.ZodEnum<["<200", "200-1,000", "1,000-5,000", "5,000+"]>;
    painText: z.ZodOptional<z.ZodString>;
    source: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    fullName: string;
    workEmail: string;
    company: string;
    role: "IT" | "L&D" | "Operations" | "HR" | "Founder" | "Other";
    companySize: "<200" | "200-1,000" | "1,000-5,000" | "5,000+";
    source: string;
    painText?: string | undefined;
}, {
    fullName: string;
    workEmail: string;
    company: string;
    role: "IT" | "L&D" | "Operations" | "HR" | "Founder" | "Other";
    companySize: "<200" | "200-1,000" | "1,000-5,000" | "5,000+";
    painText?: string | undefined;
    source?: string | undefined;
}>;
export type DemoRequest = z.infer<typeof DemoRequest>;
export declare const NewsletterSignup: z.ZodObject<{
    email: z.ZodString;
    source: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    source: string;
    email: string;
}, {
    email: string;
    source?: string | undefined;
}>;
export type NewsletterSignup = z.infer<typeof NewsletterSignup>;
//# sourceMappingURL=leads.d.ts.map