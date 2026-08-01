import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours
export const RESET_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes

const SECRET = process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";

export type AdminRole = "admin" | "editor" | "viewer";

export interface AdminSession {
  userId: string;
  email: string;
  role: AdminRole;
  expires: number;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

function b64url(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function fromB64url(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

export function createSessionToken(session: {
  userId: string;
  email: string;
  role: AdminRole;
}): string {
  const payload: AdminSession = {
    userId: session.userId,
    email: session.email,
    role: session.role,
    expires: Date.now() + ADMIN_COOKIE_MAX_AGE * 1000,
  };
  const encoded = b64url(JSON.stringify(payload));
  const sig = sign(encoded);
  return encoded + "." + sig;
}

export function getSession(
  token: string | undefined | null
): AdminSession | null {
  if (!token) return null;
  const parts = token.split(".");
  const encoded = parts[0];
  const sig = parts[1];
  if (!encoded || !sig) return null;
  if (sign(encoded) !== sig) return null;
  let payload: AdminSession;
  try {
    payload = JSON.parse(fromB64url(encoded)) as AdminSession;
  } catch {
    return null;
  }
  if (!payload || typeof payload.expires !== "number") return null;
  if (Date.now() > payload.expires) return null;
  return payload;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  return getSession(token) !== null;
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
