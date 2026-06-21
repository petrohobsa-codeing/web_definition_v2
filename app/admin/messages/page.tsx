"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getMessages, updateMessageStatus, deleteMessage } from "@/lib/db";
import type { ContactMessage } from "@/lib/types";
import {
  Download,
  Trash2,
  MailOpen,
  Mail,
  ChevronDown,
  ChevronUp,
  Search,
  Inbox,
} from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessagesPage() {
  const [messages, setMessagesState] = useState<ContactMessage[]>([]);
  const [filter, setFilter] = useState<"all" | "new" | "read">("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const reload = () => { getMessages().then(setMessagesState); };

  useEffect(() => {
    reload();
  }, []);

  const filtered = messages
    .filter((m) => filter === "all" || m.status === filter)
    .filter(
      (m) =>
        !search ||
        m.name.includes(search) ||
        m.phone.includes(search) ||
        (m.email || "").includes(search)
    );

  const handleStatus = async (id: string, status: ContactMessage["status"]) => {
    await updateMessageStatus(id, status);
    reload();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("حذف هذه الرسالة نهائياً؟")) return;
    await deleteMessage(id);
    reload();
  };

  const handleExport = async () => {
    const XLSX = (await import("xlsx")).default;
    const data = filtered.map((m) => ({
      الاسم: m.name,
      "رقم الجوال": m.phone,
      "البريد الإلكتروني": m.email,
      الرسالة: m.message,
      الحالة: m.status === "new" ? "جديد" : "مقروء",
      "تاريخ الرسالة": formatDate(m.createdAt),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "رسائل التواصل");
    XLSX.writeFile(wb, `petronear-messages-${Date.now()}.xlsx`);
  };

  const newCount = messages.filter((m) => m.status === "new").length;

  return (
    <AdminShell title="رسائل التواصل">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "إجمالي الرسائل", value: messages.length, color: "bg-brand-green" },
          { label: "جديدة", value: newCount, color: "bg-amber-500" },
          { label: "مقروءة", value: messages.length - newCount, color: "bg-gray-400" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-gray-100 p-4 text-center"
          >
            <p className="text-2xl font-black mb-1 text-brand-charcoal">{s.value}</p>
            <p className="text-brand-charcoal-light text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal-light"
          />
          <input
            type="text"
            placeholder="بحث بالاسم أو الجوال أو البريد..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm bg-gray-50"
          />
        </div>
        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          {[
            { val: "all", label: "الكل" },
            { val: "new", label: "جديدة" },
            { val: "read", label: "مقروءة" },
          ].map((opt) => (
            <button
              key={opt.val}
              onClick={() => setFilter(opt.val as typeof filter)}
              className={`px-4 py-2.5 text-sm font-bold transition-colors ${
                filter === opt.val
                  ? "bg-brand-green text-white"
                  : "bg-white text-brand-charcoal-light hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-brand-gold text-brand-green-dark px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-gold-dark transition-colors shadow-lg shadow-brand-gold/20"
        >
          <Download size={16} />
          تصدير Excel
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Inbox size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-brand-charcoal-light">لا توجد رسائل</p>
          </div>
        )}
        {filtered.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
          >
            {/* Row header */}
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => {
                if (expanded !== m.id && m.status === "new") handleStatus(m.id, "read");
                setExpanded(expanded === m.id ? null : m.id);
              }}
            >
              <div className="flex-shrink-0">
                {m.status === "new" ? (
                  <div className="w-2 h-2 rounded-full bg-brand-green" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                )}
              </div>
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 min-w-0">
                <div>
                  <p className={`text-sm truncate ${m.status === "new" ? "font-black text-brand-charcoal" : "font-medium text-brand-charcoal"}`}>
                    {m.name}
                  </p>
                  <p className="text-brand-charcoal-light text-xs">{m.phone}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-brand-charcoal-light text-xs truncate">
                    {m.email || "—"}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-brand-charcoal-light text-xs">
                    {formatDate(m.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    m.status === "new"
                      ? "bg-brand-green-light text-brand-green"
                      : "bg-gray-100 text-brand-charcoal-light"
                  }`}
                >
                  {m.status === "new" ? "جديدة" : "مقروءة"}
                </span>
                {expanded === m.id ? (
                  <ChevronUp size={16} className="text-brand-charcoal-light" />
                ) : (
                  <ChevronDown size={16} className="text-brand-charcoal-light" />
                )}
              </div>
            </div>

            {/* Expanded details */}
            {expanded === m.id && (
              <div className="border-t border-gray-100 p-5 bg-gray-50">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {[
                    { label: "الاسم", value: m.name },
                    { label: "الجوال", value: m.phone },
                    { label: "البريد", value: m.email || "—" },
                    { label: "تاريخ الإرسال", value: formatDate(m.createdAt) },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-brand-charcoal-light mb-0.5">{item.label}</p>
                      <p className="text-sm font-bold text-brand-charcoal">{item.value}</p>
                    </div>
                  ))}
                </div>
                {m.message && (
                  <div className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
                    <p className="text-xs text-brand-charcoal-light mb-1">الرسالة</p>
                    <p className="text-sm text-brand-charcoal leading-relaxed">{m.message}</p>
                  </div>
                )}
                <div className="flex gap-3">
                  {m.status === "new" ? (
                    <button
                      onClick={() => handleStatus(m.id, "read")}
                      className="flex items-center gap-2 bg-brand-green text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors"
                    >
                      <MailOpen size={15} />
                      تعيين كمقروءة
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatus(m.id, "new")}
                      className="flex items-center gap-2 bg-amber-500 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors"
                    >
                      <Mail size={15} />
                      تعيين كجديدة
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="flex items-center gap-2 bg-red-50 text-red-500 px-5 py-2 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={15} />
                    حذف
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
