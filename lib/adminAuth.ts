import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours
export const RESET_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes

const SECRET = process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";

function sign(value: string): string {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createSessionToken(): string {
  const expires = Date.now() + ADMIN_COOKIE_MAX_AGE * 1000;
  const payload = String(expires);
  const sig = sign(payload);
  return payload + "." + sig;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  const payload = parts[0];
  const sig = parts[1];
  if (!payload || !sig) return false;
  const expected = sign(payload);
  if (expected !== sig) return false;
  const expires = Number(payload);
  if (Number.isNaN(expires) || Date.now() > expires) return false;
  return true;
}

export function createResetToken(): string {
  const expires = Date.now() + RESET_TOKEN_MAX_AGE;
  const payload = "reset." + String(expires);
  const sig = sign(payload);
  return payload + "." + sig;
}

export function verifyResetToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "reset") return false;
  const payload = parts[0] + "." + parts[1];
  const sig = parts[2];
  const expected = sign(payload);
  if (expected !== sig) return false;
  const expires = Number(parts[1]);
  if (Number.isNaN(expires) || Date.now() > expires) return false;
  return true;
}
