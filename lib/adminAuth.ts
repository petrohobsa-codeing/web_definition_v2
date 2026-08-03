import crypto from "crypto";
import { cookies } from "next/headers";
import type { PermissionsMap, ResourceKey, Action } from "./permissions";
import { can } from "./permissions";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours
export const RESET_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes

const SECRET = process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";

export interface AdminSession {
  userId: string;
  email: string;
  name: string;
  role: string;
  permissions: PermissionsMap;
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
  name: string;
  role: string;
  permissions: PermissionsMap;
}): string {
  const payload: AdminSession = {
    userId: session.userId,
    email: session.email,
    name: session.name,
    role: session.role,
    permissions: session.permissions,
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

export function getSessionFromCookies(): AdminSession | null {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return getSession(token);
}

export function requireAuth():
  | { session: AdminSession }
  | { error: string; status: 401 } {
  const session = getSessionFromCookies();
  if (!session) return { error: "غير مصرح", status: 401 };
  return { session };
}

export function requirePermission(
  resource: ResourceKey,
  action: Action
): { session: AdminSession } | { error: string; status: 401 | 403 } {
  const session = getSessionFromCookies();
  if (!session) return { error: "غير مصرح", status: 401 };
  if (!can(session.permissions, resource, action)) {
    return { error: "الصلاحية غير كافية", status: 403 };
  }
  return { session };
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
