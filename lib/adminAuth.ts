import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours
export const RESET_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes

const SECRET = process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";

function sign(value: string): string {
    return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export interface AdminSession {
    uid: string;
    email: string;
    role: "owner" | "staff";
    permissions: Record<string, boolean>;
    expires: number;
}

export function createSessionToken(session: { uid: string; email: string; role: "owner" | "staff"; permissions: Record<string, boolean> }): string {
    const expires = Date.now() + ADMIN_COOKIE_MAX_AGE * 1000;
    const full = { uid: session.uid, email: session.email, role: session.role, permissions: session.permissions, expires };
    const json = JSON.stringify(full);
    const encoded = Buffer.from(json, "utf8").toString("base64url");
    const sig = sign(encoded);
    return encoded + "." + sig;
}

export function verifySessionToken(token: string | undefined | null): AdminSession | null {
    if (!token) return null;
    const dotIndex = token.indexOf(".");
    if (dotIndex === -1) return null;
    const encoded = token.slice(0, dotIndex);
    const sig = token.slice(dotIndex + 1);
    if (!encoded || !sig) return null;
    const expected = sign(encoded);
    if (expected !== sig) return null;
    try {
          const decoded = Buffer.from(encoded, "base64url").toString("utf8");
          const payload = JSON.parse(decoded) as AdminSession;
          if (!payload.expires || Date.now() > payload.expires) return null;
          return payload;
    } catch {
          return null;
    }
}

export function hasPermission(session: AdminSession | null, key: string): boolean {
    if (!session) return false;
    if (session.role === "owner") return true;
    return Boolean(session.permissions && session.permissions[key]);
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
