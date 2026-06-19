"use client";
import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  checkAuth,
  doLogout,
  getQuotes,
  getMessages,
} from "@/lib/store";
import {
  LayoutDashboard,
  Layers,
  Briefcase,
  MessageSquare,
  BarChart2,
  FileText,
  Mail,
  Settings,
  LogOut,
  Fuel,
  Menu,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/slides", label: "شرائح الرئيسية", icon: Layers },
  { href: "/admin/services", label: "الخدمات", icon: Briefcase },
  { href: "/admin/testimonials", label: "آراء العملاء", icon: MessageSquare },
  { href: "/admin/stats", label: "الإحصائيات", icon: BarChart2 },
  { href: "/admin/quotes", label: "طلبات الأسعار", icon: FileText, badge: "quotes" },
  { href: "/admin/messages", label: "رسائل التواصل", icon: Mail, badge: "messages" },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

interface Props {
  children: ReactNode;
  title: string;
}

export default function AdminShell({ children, title }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newQuotes, setNewQuotes] = useState(0);
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    if (!checkAuth()) {
      router.push("/admin");
      return;
    }
    const refreshBadges = () => {
      setNewQuotes(getQuotes().filter((q) => q.status === "new").length);
      setNewMessages(getMessages().filter((m) => m.status === "new").length);
    };
    refreshBadges();
    window.addEventListener("focus", refreshBadges);
    return () => window.removeEventListener("focus", refreshBadges);
  }, [router, pathname]);

  const handleLogout = () => {
    doLogout();
    router.push("/admin");
  };

  const getBadge = (key?: string) => {
    if (key === "quotes") return newQuotes;
    if (key === "messages") return newMessages;
    return 0;
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-arabic" dir="rtl">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-64 bg-brand-green-dark flex flex-col z-30 transition-transform duration-300 shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center flex-shrink-0">
              <Fuel size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-black text-lg leading-none">Fast Link</p>
              <p className="text-white/40 text-xs mt-0.5">لوحة التحكم</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const badge = getBadge(item.badge);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-brand-gold text-brand-green-dark font-black shadow-lg shadow-brand-gold/30"
                    : "text-white/65 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {badge > 0 && (
                  <span className="bg-red-500 text-white text-xs font-black min-w-5 h-5 rounded-full flex items-center justify-center px-1">
                    {badge}
                  </span>
                )}
                {isActive && <ChevronRight size={14} className="rotate-180 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 text-sm transition-colors duration-200"
          >
            <ExternalLink size={16} />
            <span>عرض الموقع</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/50 hover:text-red-300 hover:bg-red-500/10 w-full text-sm transition-colors duration-200"
          >
            <LogOut size={16} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:mr-64 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4 flex-shrink-0">
          <button
            className="lg:hidden p-2 rounded-xl text-brand-charcoal hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="فتح القائمة"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-black text-brand-charcoal truncate">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            {(newQuotes > 0 || newMessages > 0) && (
              <span className="hidden sm:flex items-center gap-1.5 bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full border border-red-100">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                {newQuotes + newMessages} جديد
              </span>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
