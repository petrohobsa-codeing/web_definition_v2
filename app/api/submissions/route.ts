import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAuth, requirePermission } from "@/lib/adminAuth";
import { can } from "@/lib/permissions";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["project", "service", "activity"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToSubmission(r: any) {
  return {
    id: r.id,
    type: r.type,
    payload: r.payload || {},
    status: r.status,
    submittedBy: r.submitted_by || undefined,
    submittedByName: r.submitted_by_name || undefined,
    reviewNote: r.review_note || undefined,
    reviewedBy: r.reviewed_by || undefined,
    reviewedAt: r.reviewed_at || undefined,
    createdAt: r.created_at,
  };
}

export async function GET() {
  const auth = requireAuth();
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { session } = auth;
  try {
    let query = supabaseAdmin
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!can(session.permissions, "submissions", "read")) {
      query = query.eq("submitted_by", session.userId);
    }
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ items: (data || []).map(rowToSubmission) });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ error: "فشل جلب الطلبات" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = requirePermission("submissions", "create");
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { session } = auth;
  try {
    const body = await request.json();
    if (!ALLOWED_TYPES.includes(body.type)) {
      return NextResponse.json({ error: "نوع الطلب غير صحيح" }, { status: 400 });
    }
    if (!body.payload || typeof body.payload !== "object") {
      return NextResponse.json({ error: "بيانات الطلب مطلوبة" }, { status: 400 });
    }
    const newSubmission = {
      id: Date.now().toString(),
      type: body.type,
      payload: body.payload,
      status: "pending",
      submitted_by: session.userId,
      submitted_by_name: session.name || session.email,
    };
    const { data, error } = await supabaseAdmin
      .from("submissions")
      .insert(newSubmission)
      .select("*")
      .single();
    if (error) throw error;
    return NextResponse.json(rowToSubmission(data), { status: 201 });
  } catch (error) {
    console.error("Error creating submission:", error);
    return NextResponse.json({ error: "فشل إرسال الطلب" }, { status: 500 });
  }
}
