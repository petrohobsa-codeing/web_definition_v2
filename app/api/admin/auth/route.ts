import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE,
  createSessionToken,
  getSession,
} from "@/lib/adminAuth";
import { hashPassword, verifyPassword } from "@/lib/passwords";
import { allPermissions, sanitizePermissions } from "@/lib/permissions";
import type { PermissionsMap } from "@/lib/permissions";

export const dynamic = "force-dynamic";

async function getPermissionsForRole(roleKey: string): Promise<PermissionsMap> {
  const { data } = await supabaseAdmin
    .from("roles")
    .select("permissions")
    .eq("key", roleKey)
    .maybeSingle();
  if (data?.permissions) return sanitizePermissions(data.permissions);
  // Fallback for the built-in admin role, or if the roles table hasn't been
  // seeded yet: the "admin" role always has full access.
  if (roleKey === "admin") return allPermissions();
  return {};
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = (body.email as string | undefined)?.trim().toLowerCase();
  const password = body.password as string | undefined;

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, error: "البريد الإلكتروني وكلمة المرور مطلوبان" },
      { status: 400 }
    );
  }

  const { data: user } = await supabaseAdmin
    .from("app_users")
    .select("id, email, name, role, password_hash")
    .ilike("email", email)
    .maybeSingle();

  let session:
    | {
        userId: string;
        email: string;
        name: string;
        role: string;
        permissions: PermissionsMap;
      }
    | null = null;

  if (user && user.password_hash) {
    // Normal login path.
    if (!verifyPassword(password, user.password_hash)) {
      return NextResponse.json(
        { ok: false, error: "بيانات الدخول غير صحيحة" },
        { status: 401 }
      );
    }
    const role = user.role || "viewer";
    session = {
      userId: String(user.id),
      email: user.email,
      name: user.name || user.email,
      role,
      permissions: await getPermissionsForRole(role),
    };
  } else {
    // First-run bootstrap: if no admin has a password yet, allow the owner to
    // claim the first admin account using the existing site admin password.
    const { count } = await supabaseAdmin
      .from("app_users")
      .select("id", { count: "exact", head: true })
      .not("password_hash", "is", null);

    if ((count || 0) === 0) {
      const { data: settings } = await supabaseAdmin
        .from("settings")
        .select("admin_password")
        .eq("id", "main")
        .maybeSingle();
      const expected = settings?.admin_password;
      if (!expected || password !== expected) {
        return NextResponse.json(
          { ok: false, error: "بيانات الدخول غير صحيحة" },
          { status: 401 }
        );
      }
      const password_hash = hashPassword(password);
      const permissions = await getPermissionsForRole("admin");
      if (user) {
        await supabaseAdmin
          .from("app_users")
          .update({ role: "admin", password_hash })
          .eq("id", user.id);
        session = {
          userId: String(user.id),
          email: user.email,
          name: user.name || user.email,
          role: "admin",
          permissions,
        };
      } else {
        const id = Date.now().toString();
        const { data: created } = await supabaseAdmin
          .from("app_users")
          .insert({
            id,
            name: "Administrator",
            email,
            role: "admin",
            password_hash,
          })
          .select("id, email, name, role")
          .single();
        session = {
          userId: String(created?.id ?? id),
          email: created?.email ?? email,
          name: created?.name ?? "Administrator",
          role: "admin",
          permissions,
        };
      }
    } else {
      return NextResponse.json(
        { ok: false, error: "بيانات الدخول غير صحيحة" },
        { status: 401 }
      );
    }
  }

  const token = createSessionToken(session);
  const res = NextResponse.json({
    ok: true,
    role: session.role,
    email: session.email,
    name: session.name,
  });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}

export async function GET() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  const session = getSession(token);
  return NextResponse.json({
    authed: session !== null,
    role: session?.role ?? null,
    email: session?.email ?? null,
    userId: session?.userId ?? null,
    name: session?.name ?? null,
    permissions: session?.permissions ?? {},
  });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
