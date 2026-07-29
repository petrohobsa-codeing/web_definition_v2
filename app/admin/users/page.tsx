"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

const PERMISSION_LABELS: Record<string, string> = {
  dashboard: "لوحة التحكم",
  slides: "شرائح الرئيسية",
  services: "الخدمات",
  service_details: "تفاصيل الخدمات",
  projects: "المشاريع والأعمال",
  news: "الأخبار والمقالات",
  activities: "الأنشطة",
  testimonials: "آراء العملاء",
  stats: "الإحصائيات",
  mission: "المهمة والرؤية",
  regions: "مناطق التغطية",
  network: "شبكتنا",
  credentials: "اعتماداتنا",
  faqs: "الأسئلة الشائعة",
  quotes: "طلبات الأسعار",
  messages: "رسائل التواصل",
  settings: "الإعدادات",
  users: "المستخدمون",
};
const PERMISSION_KEYS = Object.keys(PERMISSION_LABELS);

interface AdminUserRow {
  id: string;
  email: string;
  role: "owner" | "staff";
  permissions: Record<string, boolean>;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePermissions, setInvitePermissions] = useState<Record<string, boolean>>({});
  const [inviting, setInviting] = useState(false);
  const [inviteMsg, setInviteMsg] = useState("");

const load = async () => {
  setLoading(true);
  setError("");
  try {
    const authRes = await fetch("/api/admin/auth");
    const authData = await authRes.json().catch(() => ({}));
    if (!authData.authed) {
      router.push("/admin");
      return;
    }
    if (authData.role !== "owner") {
      setRole(authData.role || "staff");
      setLoading(false);
      return;
    }
    setRole("owner");
    const res = await fetch("/api/admin/users");
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setUsers(data.items || []);
    } else {
      setError(data.error || "تعذر تحميل قائمة المستخدمين");
    }
  } catch {
    setError("حدث خطأ في الاتصال بالخادم");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const toggleInvitePermission = (key: string) => {
  setInvitePermissions((prev) => ({ ...prev, [key]: !prev[key] }));
};


  const handleInvite = async () => {
    setInviting(true);
    setInviteMsg("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, permissions: invitePermissions }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setInviteMsg("تم إرسال دعوة إلى الموظف عبر البريد الإلكتروني.");
        setInviteEmail("");
        setInvitePermissions({});
        load();
      } else {
        setInviteMsg(data.error || "تعذر إرسال الدعوة");
      }
    } catch {
      setInviteMsg("حدث خطأ في الاتصال بالخادم");
    } finally {
      setInviting(false);
    }
  };


  const updateUserPermission = async (user: AdminUserRow, key: string, value: boolean) => {
    const newPermissions = { ...user.permissions, [key]: value };
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, permissions: newPermissions } : u)));
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, permissions: newPermissions }),
    }).catch(() => {});
  };

const updateUserRole = async (user: AdminUserRow, newRole: string) => {
  setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, role: newRole as "owner" | "staff" } : u)));
  await fetch("/api/admin/users", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: user.id, role: newRole }),
  }).catch(() => {});
};


        const deleteUser = async (user: AdminUserRow) => {
          if (!confirm(`هل أنت متأكد من حذف ${user.email}؟`)) return;
          setUsers((prev) => prev.filter((u) => u.id !== user.id));
          await fetch("/api/admin/users", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.id }),
          }).catch(() => {});
        };


if (loading) {
  return (
    <AdminShell title="المستخدمون">
      <p className="text-brand-charcoal-light">جارِ التحميل...</p>
    </AdminShell>
    );
}

  if (role !== "owner") {
    return (
      <AdminShell title="المستخدمون">
      <p className="text-red-600">هذه الصفحة مخصصة للمالك فقط.</p>
      </AdminShell>
      );
  }
  return (
    <AdminShell title="المستخدمون">
      <div className="space-y-8">
        {error && <p className="text-red-600">{error}</p>}

        <section className="bg-white rounded-2xl border border-gray-200 p-5">
          <h2 className="font-bold text-brand-charcoal mb-4">دعوة موظف جديد</h2>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="بريد الموظف الإلكتروني"
              dir="ltr"
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm"
            />
            <button
              onClick={handleInvite}
              disabled={inviting || !inviteEmail}
              className="bg-brand-green text-white font-bold px-6 py-2 rounded-xl disabled:opacity-50"
            >
              {inviting ? "جارِ الإرسال..." : "إرسال دعوة"}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-3">
            {PERMISSION_KEYS.map((key) => (
              <label key={key} className="flex items-center gap-2 text-sm text-brand-charcoal">
                <input
                  type="checkbox"
                  checked={!!invitePermissions[key]}
                  onChange={() => toggleInvitePermission(key)}
                />
                {PERMISSION_LABELS[key]}
              </label>
            ))}
          </div>
          {inviteMsg && <p className="text-sm text-brand-charcoal-light">{inviteMsg}</p>}
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-5">
          <h2 className="font-bold text-brand-charcoal mb-4">المستخدمون الحاليون</h2>
          <div className="space-y-4">
            {users.map((u) => (
              <div key={u.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <span className="font-bold text-brand-charcoal" dir="ltr">{u.email}</span>
                  <div className="flex items-center gap-3">
                    <select
                      value={u.role}
                      onChange={(e) => updateUserRole(u, e.target.value)}
                      className="rounded-xl border border-gray-200 px-3 py-1 text-sm"
                    >
                      <option value="staff">موظف</option>
                      <option value="owner">مالك</option>
                    </select>
                    <button
                      onClick={() => deleteUser(u)}
                      className="text-red-600 text-sm font-bold"
                    >
                      حذف
                    </button>
                  </div>
                </div>
                {u.role !== "owner" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {PERMISSION_KEYS.map((key) => (
                      <label key={key} className="flex items-center gap-2 text-sm text-brand-charcoal">
                        <input
                          type="checkbox"
                          checked={!!u.permissions[key]}
                          onChange={(e) => updateUserPermission(u, key, e.target.checked)}
                        />
                        {PERMISSION_LABELS[key]}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-sm text-brand-charcoal-light">لا يوجد مستخدمون حتى الآن.</p>
            )}
          </div>
        </section>


                {/* Users List Section */}
                        <section className="space-y-6">
                                  <h2 className="text-2xl font-bold">قائمة المستخدمين</h2>
                                            <UsersList users={users} onUpdate={setUsers} />
                                                    </section>
      </div>
    </AdminShell>
  );
}
