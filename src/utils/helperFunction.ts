import { PUBLIC_EMAIL_DOMAINS } from "../constants/auth.message";


/**
 * Extract full domain from email
 * example: admin@eclearnix.com -> eclearnix.com
 */
export function getEmailDomain(email: string): string {
  return email.split("@")[1].toLowerCase();
}

/**
 * Extract company name from email
 * example: admin@eclearnix.com -> eclearnix
 */
export function getCompanyFromEmail(email: string): string {
  const domain = getEmailDomain(email);
  return domain.split(".")[0];
}

/**
 * Normalize org name for comparison
 * example: "EC Learnix Pvt Ltd" -> eclearnixpvtltd
 */
export function normalizeOrgName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Check if email is from public provider
 */
export function isPublicEmail(email: string): boolean {
  const domain = getEmailDomain(email);
  return PUBLIC_EMAIL_DOMAINS.some(
    publicDomain =>
      domain === publicDomain || domain.endsWith(`.${publicDomain}`)
  );
}
