"use client";
import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  getQuotes,
  getMessages,
  getSlides,
  getServices,
  getTestimonials,
} from "@/lib/db";
import type { QuoteRequest, ContactMessage } from "@/lib/types";
import Link from "next/link";
import {
  FileText,
  Mail,
  Layers,
  Briefcase,
  MessageSquare,
  ArrowLeft,
  TrendingUp,
  Clock,
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

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [counts, setCounts] = useState({
    slides: 0,
    services: 0,
    testimonials: 0,
  });

  useEffect(() => {
    Promise.all([
      getQuotes(),
      getMessages(),
      getSlides(),
      getServices(),
      getTestimonials(),
    ]).then(([q, m, slides, services, testimonials]) => {
      setQuotes(q);
      setMessages(m);
      setCounts({
        slides: slides.length,
        services: services.length,
        testimonials: testimonials.length,
      });
    });
  }, []);

  const newQuotes = quotes.filter((q) => q.status === "new").length;
  const newMessages = messages.filter((m) => m.status === "new").length;

  const overview = [
    {
      label: "طلبات الأسعار الجديدة",
      value: newQuotes,
      total: quotes.length,
      icon: FileText,
      color: "bg-brand-green",
      href: "/admin/quotes",
      urgent: newQuotes > 0,
    },
    {
      label: "رسائل غير مقروءة",
      value: newMessages,
      total: messages.length,
      icon: Mail,
      color: "bg-blue-500",
      href: "/admin/messages",
      urgent: newMessages > 0,
    },
    {
      label: "شرائح الرئيسية",
      value: counts.slides,
      icon: Layers,
      color: "bg-purple-500",
      href: "/admin/slides",
    },
    {
      label: "الخدمات المعروضة",
      value: counts.services,
      icon: Briefcase,
      color: "bg-amber-500",
      href: "/admin/services",
    },
    {
      label: "آراء العملاء",
      value: counts.testimonials,
      icon: MessageSquare,
      color: "bg-rose-500",
      href: "/admin/testimonials",
    },
  ];

  return (
    <AdminShell title="لوحة التحكم">
      {/* Welcome */}
      <div className="mb-8 bg-gradient-to-br from-brand-green-dark to-brand-green-mid rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-brand-gold" />
            <span className="text-brand-gold font-bold text-sm">مرحباً بك</span>
          </div>
          <h2 className="text-2xl font-black mb-1">لوحة تحكم PetroHop</h2>
          <p className="text-white/60 text-sm">
            إدارة شاملة لكل محتوى الموقع والطلبات الواردة
          </p>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {overview.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-brand-green/20 transition-all duration-200 relative overflow-hidden"
          >
            {item.urgent && (
              <span className="absolute top-3 left-3 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            )}
            <div
              className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-4`}
            >
              <item.icon size={18} className="text-white" />
            </div>
            <p className="text-3xl font-black text-brand-charcoal mb-1">
              {item.value}
            </p>
            {"total" in item && item.total !== undefined && (
              <p className="text-xs text-brand-charcoal-light mb-1">
                من أصل {item.total} إجمالي
              </p>
            )}
            <p className="text-xs font-medium text-brand-charcoal-light leading-snug">
              {item.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent quotes */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-black text-brand-charcoal">
              آخر طلبات الأسعار
            </h3>
            <Link
              href="/admin/quotes"
              className="text-sm text-brand-green font-bold hover:underline flex items-center gap-1"
            >
              عرض الكل
              <ArrowLeft size={14} className="rotate-180" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {quotes.slice(0, 5).length === 0 ? (
              <p className="text-center text-brand-charcoal-light py-8 text-sm">
                لا توجد طلبات بعد
              </p>
            ) : (
              quotes.slice(0, 5).map((q) => (
                <div key={q.id} className="px-6 py-4 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-brand-green-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText size={15} className="text-brand-green" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-brand-charcoal text-sm truncate">
                      {q.name}
                    </p>
                    <p className="text-brand-charcoal-light text-xs">{q.city} · {q.fuelType}</p>
                    <p className="text-brand-charcoal-light text-xs flex items-center gap-1 mt-0.5">
                      <Clock size={10} />
                      {formatDate(q.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                      q.status === "new"
                        ? "bg-brand-green-light text-brand-green"
                        : "bg-gray-100 text-brand-charcoal-light"
                    }`}
                  >
                    {q.status === "new" ? "جديد" : "تمت"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent messages */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-black text-brand-charcoal">آخر الرسائل</h3>
            <Link
              href="/admin/messages"
              className="text-sm text-brand-green font-bold hover:underline flex items-center gap-1"
            >
              عرض الكل
              <ArrowLeft size={14} className="rotate-180" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {messages.slice(0, 5).length === 0 ? (
              <p className="text-center text-brand-charcoal-light py-8 text-sm">
                لا توجد رسائل بعد
              </p>
            ) : (
              messages.slice(0, 5).map((m) => (
                <div key={m.id} className="px-6 py-4 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={15} className="text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-brand-charcoal text-sm truncate">
                      {m.name}
                    </p>
                    <p className="text-brand-charcoal-light text-xs truncate">
                      {m.message || "—"}
                    </p>
                    <p className="text-brand-charcoal-light text-xs flex items-center gap-1 mt-0.5">
                      <Clock size={10} />
                      {formatDate(m.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                      m.status === "new"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-100 text-brand-charcoal-light"
                    }`}
                  >
                    {m.status === "new" ? "جديد" : "مقروء"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
