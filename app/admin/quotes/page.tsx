"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { getQuotes, updateQuoteStatus, deleteQuote } from "@/lib/db";
import type { QuoteRequest } from "@/lib/types";
import {
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
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

const fuelLabels: Record<string, string> = {
  diesel: "ديزل",
  gas: "غاز",
  both: "كلاهما",
};
const sensorLabels: Record<string, string> = {
  yes: "نعم",
  no: "لا",
};

export default function QuotesPage() {
  const [quotes, setQuotesState] = useState<QuoteRequest[]>([]);
  const [filter, setFilter] = useState<"all" | "new" | "processed">("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const reload = () => { getQuotes().then(setQuotesState); };

  useEffect(() => {
    reload();
  }, []);

  const filtered = quotes
    .filter((q) => filter === "all" || q.status === filter)
    .filter(
      (q) =>
        !search ||
        q.name.includes(search) ||
        q.phone.includes(search) ||
        q.city.includes(search)
    );

  const handleStatus = async (id: string, status: QuoteRequest["status"]) => {
    await updateQuoteStatus(id, status);
    reload();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("حذف هذا الطلب نهائياً؟")) return;
    await deleteQuote(id);
    reload();
  };

  const handleExport = async () => {
    const XLSX = (await import("xlsx")).default;
    const data = filtered.map((q) => ({
      الاسم: q.name,
      "رقم الجوال": q.phone,
      "البريد الإلكتروني": q.email,
      "نوع النشاط": q.activity,
      "نوع الوقود": fuelLabels[q.fuelType] || q.fuelType,
      "الكمية (لتر)": q.quantity,
      "المدينة": q.city,
      "حساسات ذكية": sensorLabels[q.sensors] || q.sensors,
      الرسالة: q.message,
      الحالة: q.status === "new" ? "جديد" : "تمت المعالجة",
      "تاريخ الطلب": formatDate(q.createdAt),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "طلبات الأسعار");
    XLSX.writeFile(wb, `petronear-quotes-${Date.now()}.xlsx`);
  };

  const newCount = quotes.filter((q) => q.status === "new").length;

  return (
    <AdminShell title="طلبات عروض الأسعار">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "إجمالي الطلبات", value: quotes.length, color: "bg-brand-green" },
          { label: "جديد", value: newCount, color: "bg-amber-500" },
          {
            label: "تمت المعالجة",
            value: quotes.length - newCount,
            color: "bg-gray-400",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-gray-100 p-4 text-center"
          >
            <p
              className={`text-2xl font-black mb-1`}
              style={{ color: s.color.replace("bg-", "") }}
            >
              {s.value}
            </p>
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
            placeholder="بحث بالاسم أو الجوال أو المدينة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm bg-gray-50"
          />
        </div>
        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          {[
            { val: "all", label: "الكل" },
            { val: "new", label: "جديد" },
            { val: "processed", label: "تمت" },
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
            <FileText size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-brand-charcoal-light">لا توجد طلبات</p>
          </div>
        )}
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
          >
            {/* Row header */}
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === q.id ? null : q.id)}
            >
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 min-w-0">
                <div>
                  <p className="font-black text-brand-charcoal text-sm truncate">
                    {q.name}
                  </p>
                  <p className="text-brand-charcoal-light text-xs">{q.phone}</p>
                </div>
                <div>
                  <p className="text-brand-charcoal text-sm font-medium">
                    {q.city}
                  </p>
                  <p className="text-brand-charcoal-light text-xs">
                    {fuelLabels[q.fuelType] || q.fuelType}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-brand-charcoal text-xs">{q.activity}</p>
                  <p className="text-brand-charcoal-light text-xs">
                    {q.quantity ? `${q.quantity} لتر/شهر` : "—"}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-brand-charcoal-light text-xs">
                    {formatDate(q.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    q.status === "new"
                      ? "bg-brand-green-light text-brand-green"
                      : "bg-gray-100 text-brand-charcoal-light"
                  }`}
                >
                  {q.status === "new" ? "جديد" : "تمت"}
                </span>
                {expanded === q.id ? (
                  <ChevronUp size={16} className="text-brand-charcoal-light" />
                ) : (
                  <ChevronDown size={16} className="text-brand-charcoal-light" />
                )}
              </div>
            </div>

            {/* Expanded details */}
            {expanded === q.id && (
              <div className="border-t border-gray-100 p-5 bg-gray-50">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {[
                    { label: "البريد", value: q.email || "—" },
                    { label: "نوع النشاط", value: q.activity || "—" },
                    { label: "الكمية الشهرية", value: q.quantity ? `${q.quantity} لتر` : "—" },
                    { label: "نوع الوقود", value: fuelLabels[q.fuelType] || q.fuelType || "—" },
                    { label: "حساسات ذكية", value: sensorLabels[q.sensors] || q.sensors || "—" },
                    { label: "المدينة", value: q.city || "—" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-brand-charcoal-light mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold text-brand-charcoal">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
                {q.message && (
                  <div className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
                    <p className="text-xs text-brand-charcoal-light mb-1">
                      الرسالة
                    </p>
                    <p className="text-sm text-brand-charcoal">{q.message}</p>
                  </div>
                )}
                <div className="flex gap-3">
                  {q.status === "new" ? (
                    <button
                      onClick={() => handleStatus(q.id, "processed")}
                      className="flex items-center gap-2 bg-brand-green text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-brand-green-mid transition-colors"
                    >
                      <CheckCircle2 size={15} />
                      تمت المعالجة
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatus(q.id, "new")}
                      className="flex items-center gap-2 bg-amber-500 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors"
                    >
                      <Clock size={15} />
                      إعادة لـ &quot;جديد&quot;
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(q.id)}
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
