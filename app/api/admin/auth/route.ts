import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE, createSessionToken, verifySessionToken } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => ({}));
    const email = body.email as string | undefined;
    const password = body.password as string | undefined;

  if (!email || !password) {
        return NextResponse.json({ ok: false, error: "الرجاء إدخال الإيميل وكلمة المرور" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    const authClient = createClient(supabaseUrl, supabaseAnonKey);

  const signInResult = await authClient.auth.signInWithPassword({ email, password });
    const signInError = signInResult.error;
    const signInUser = signInResult.data.user;

  if (signInError || !signInUser) {
        return NextResponse.json({ ok: false, error: "الإيميل أو كلمة المرور غير صحيحة" }, { status: 401 });
  }

  const adminLookup = await supabaseAdmin
      .from("admin_users")
      .select("role, permissions, email")
      .eq("id", signInUser.id)
      .maybeSingle();
    const adminRow = adminLookup.data;

  if (!adminRow) {
        return NextResponse.json({ ok: false, error: "لا تملك صلاحية الوصول إلى لوحة التحكم" }, { status: 403 });
  }

  const token = createSessionToken({
        uid: signInUser.id,
        email: adminRow.email || email,
        role: adminRow.role,
        permissions: adminRow.permissions || {},
  });

  const res = NextResponse.json({ ok: true, role: adminRow.role, permissions: adminRow.permissions || {} });
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
    const session = verifySessionToken(token);
    if (!session) {
          return NextResponse.json({ authed: false });
    }
    return NextResponse.json({ authed: true, email: session.email, role: session.role, permissions: session.permissions });
}

export async function DELETE() {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, "", { maxAge: 0, path: "/" });
    return res;
}
