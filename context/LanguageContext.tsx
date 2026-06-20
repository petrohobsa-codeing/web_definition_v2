"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "@/lib/translations";

interface LangCtx {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LangCtx>({ lang: "ar", toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
