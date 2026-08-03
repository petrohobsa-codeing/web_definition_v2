import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requirePermission } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function publishSubmission(type: string, payload: any) {
  const id = Date.now().toString();
  if (type === "project") {
    const { error } = await supabaseAdmin.from("projects").insert({
      id,
      title: payload.title,
      description: payload.description,
      category: payload.category,
      city: payload.city,
      slug: payload.slug,
      image: payload.image || null,
    });
    if (error) throw error;
    return;
  }
  if (type === "service") {
    const { error } = await supabaseAdmin.from("services").insert({
      id,
      icon_name: payload.iconName,
      title: payload.title,
      description: payload.description,
      href: payload.href,
    });
    if (error) throw error;
    return;
  }
  if (type === "activity") {
    const { error } = await supabaseAdmin.from("activities").insert({
      id,
      title: payload.title,
      description: payload.description,
      category: payload.category,
      date: payload.date,
      image: payload.image || null,
    });
    if (error) throw error;
    return;
  }
  throw new Error("Unknown submission type: " + type);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requirePermission("submissions", "update");
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { session } = auth;
  try {
    const body = await request.json();
    const action = body.action;
    if (action !== "approve" && action !== "reject") {
      return NextResponse.json({ error: "إجراء غير صحيح" }, { status: 400 });
    }
    const { data: submission, error: fetchError } = await supabaseAdmin
      .from("submissions")
      .select("*")
      .eq("id", params.id)
      .maybeSingle();
    if (fetchError) throw fetchError;
    if (!submission)
      return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });
    if (submission.status !== "pending") {
      return NextResponse.json(
        { error: "تمت مراجعة هذا الطلب مسبقاً" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      await publishSubmission(submission.type, submission.payload || {});
    }

    const { data, error } = await supabaseAdmin
      .from("submissions")
      .update({
        status: action === "approve" ? "approved" : "rejected",
        review_note: body.note || null,
        reviewed_by: session.userId,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    return NextResponse.json({
      id: data.id,
      type: data.type,
      payload: data.payload || {},
      status: data.status,
      submittedBy: data.submitted_by || undefined,
      submittedByName: data.submitted_by_name || undefined,
      reviewNote: data.review_note || undefined,
      reviewedBy: data.reviewed_by || undefined,
      reviewedAt: data.reviewed_at || undefined,
      createdAt: data.created_at,
    });
  } catch (error) {
    console.error("Error reviewing submission:", error);
    return NextResponse.json({ error: "فشل تنفيذ العملية" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requirePermission("submissions", "delete");
  if ("error" in auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { error } = await supabaseAdmin
      .from("submissions")
      .delete()
      .eq("id", params.id);
    if (error) throw error;
    return NextResponse.json({ message: "تم حذف الطلب بنجاح" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return NextResponse.json({ error: "فشل حذف الطلب" }, { status: 500 });
  }
}
