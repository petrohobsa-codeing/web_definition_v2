"use client";
import { useState, FormEvent, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

function ResetPasswordForm() {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (!error) {
        setSuccess(true);
        setTimeout(() => router.push("/admin"), 2000);
      } else {
        setError(error.message || "تعذر إعادة تعيين كلمة المرور");
      }
    } catch {
      setError("حدث خطأ في الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-brand-green-dark via-brand-green-mid to-brand-green flex items-center justify-center p-4 font-arabic"
      dir="rtl"
    >
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-4xl shadow-2xl shadow-brand-green-dark/30 overflow-hidden">
          <div className="bg-gradient-to-br from-brand-green-dark to-brand-green-mid p-8 text-center relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#0067E3]" />
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">
              <span className="text-white">Petro</span>
              <span className="text-white/70">Hop</span>
            </h1>
            <p className="text-white/60 text-sm">إعادة تعيين كلمة المرور</p>
          </div>

          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center">
                <ShieldCheck size={20} className="text-brand-green" />
              </div>
              <div>
                <p className="font-black text-brand-charcoal">كلمة مرور جديدة</p>
                <p className="text-brand-charcoal-light text-xs">
                  أدخل كلمة المرور الجديدة مرتين للتأكيد
                </p>
              </div>
            </div>

            {success ? (
              <div className="bg-green-50 border border-green-100 text-green-700 text-sm font-medium px-4 py-3 rounded-xl">
                تم تغيير كلمة المرور بنجاح. جارٍ تحويلك لصفحة الدخول...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-brand-charcoal mb-2">
                    كلمة المرور الجديدة
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <Lock size={16} className="text-brand-charcoal-light" />
                    </div>
                    <input
                      type={showPw ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pr-11 pl-12 py-3.5 rounded-2xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute inset-y-0 left-0 flex items-center pl-4 text-brand-charcoal-light hover:text-brand-charcoal transition-colors"
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-brand-charcoal mb-2">
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type={showPw ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-gray-50 text-brand-charcoal"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !newPassword || !confirmPassword}
                  className="w-full bg-brand-green text-white font-black py-4 rounded-2xl hover:bg-brand-green-mid transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "جارٍ الحفظ..." : "حفظ كلمة المرور"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
