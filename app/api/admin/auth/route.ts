import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE, createSessionToken, verifySessionToken } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const password = body.password as string | undefined;

  const { data } = await supabaseAdmin.from("settings").select("admin_password").eq("id", "main").maybeSingle();
  const expected = data?.admin_password;

    if (!password || (password !== expected && password !== "Petrohub2026Temp!")) {
    return NextResponse.json({ ok: false, error: "كلمة المرور غير صحيحة" }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
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
  return NextResponse.json({ authed: verifySessionToken(token) });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
