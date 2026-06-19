import type {
  HeroSlide,
  ServiceItem,
  Testimonial,
  StatItem,
  SiteSettings,
  QuoteRequest,
  ContactMessage,
} from "./types";

const K = {
  slides: "pn_slides",
  services: "pn_services",
  testimonials: "pn_testimonials",
  stats: "pn_stats",
  settings: "pn_settings",
  quotes: "pn_quotes",
  messages: "pn_messages",
};

function get<T>(key: string, def: T): T {
  if (typeof window === "undefined") return def;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : def;
  } catch {
    return def;
  }
}

function set<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Default data (mirrors what's hardcoded in components) ──────────────────

export const defaultSlides: HeroSlide[] = [
  {
    id: "1",
    badge: "تزويد الوقود",
    heading: "وقودك يصل في الوقت المحدد، كل مرة",
    description:
      "تزويد الديزل والغاز للمنشآت بأي كمية ولأي موقع في المملكة، مع تتبّع لحظي وفواتير إلكترونية.",
    cta1Label: "اطلب الوقود الآن",
    cta1Href: "/quote",
    cta2Label: "اعرف المزيد",
    cta2Href: "/services/diesel-supply",
  },
  {
    id: "2",
    badge: "حساسات ذكية",
    heading: "اعرف مستوى خزانك من جوّالك",
    description:
      "حساسات IoT تراقب لحظياً، وتنبّهك قبل النفاد، وتكشف السرقة والهدر فوراً.",
    cta1Label: "اعرف المزيد",
    cta1Href: "/services/smart-sensors",
    cta2Label: "احجز عرضاً توضيحياً",
    cta2Href: "/contact",
  },
  {
    id: "3",
    badge: "مراقبة عن بُعد",
    heading: "تحكّم كامل في طاقتك من شاشة واحدة",
    description:
      "لوحة تحكم سحابية تجمع كل خزاناتك ومواقعك وتقاريرك في مكان واحد.",
    cta1Label: "اعرف المزيد",
    cta1Href: "/services/remote-monitoring",
    cta2Label: "اطلب عرض سعر",
    cta2Href: "/quote",
  },
  {
    id: "4",
    badge: "إمداد لا ينقطع",
    heading: "منشأتك لا تتوقّف… أبداً",
    description:
      "الطلب التلقائي يضمن وصول الوقود قبل أن تحتاجه فعلاً، فلا توقّف للعمليات.",
    cta1Label: "اطلب عرض سعر",
    cta1Href: "/quote",
    cta2Label: "تحدّث مع خبير",
    cta2Href: "/contact",
  },
  {
    id: "5",
    badge: "شفافية كاملة",
    heading: "كل فاتورة وكل لتر… أمام عينيك",
    description:
      "تتبّع الاستهلاك والفواتير الإلكترونية والتقارير لحظياً من أي جهاز.",
    cta1Label: "اطلب عرض سعر",
    cta1Href: "/quote",
    cta2Label: "اعرف المزيد",
    cta2Href: "/about",
  },
];

export const defaultServices: ServiceItem[] = [
  {
    id: "1",
    iconName: "Fuel",
    title: "تزويد الديزل الذكي",
    description:
      "إمداد منتظم بأي كمية، لأي موقع، في الوقت المحدد. نخدم المولّدات والمعدّات الثقيلة وأساطيل النقل بفواتير إلكترونية متكاملة.",
    href: "/services/diesel-supply",
  },
  {
    id: "2",
    iconName: "Cpu",
    title: "حساسات IoT",
    description:
      "راقب مستوى خزانك من جوّالك، وامنع السرقة والهدر. تنبيهات فورية وطلب تلقائي قبل النفاد.",
    href: "/services/smart-sensors",
  },
  {
    id: "3",
    iconName: "Flame",
    title: "تزويد الغاز",
    description:
      "حلول غاز آمنة وموثوقة للمنشآت الصناعية والتجارية مع فحص دوري وامتثال كامل للدفاع المدني.",
    href: "/services/gas-supply",
  },
  {
    id: "4",
    iconName: "MonitorCheck",
    title: "المراقبة عن بُعد",
    description:
      "لوحة تحكم سحابية تجمع كل خزاناتك ومواقعك وتقاريرك في مكان واحد.",
    href: "/services/remote-monitoring",
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    text: "بترونير غيّرت طريقة إدارتنا للوقود تماماً. لم نعد نقلق بشأن نفاد الديزل المفاجئ الذي كان يعطّل العمل لساعات.",
    name: "م. أحمد القحطاني",
    role: "مدير العمليات",
    company: "شركة إنشاءات كبرى",
  },
  {
    id: "2",
    text: "الحساسات الذكية كشفت لنا عن هدر كبير في الاستهلاك لم نكن نلاحظه. نظام الشفافية لديهم لا يُعلى عليه.",
    name: "سلطان الراشد",
    role: "المدير اللوجستي",
    company: "مصنع صناعات غذائية",
  },
  {
    id: "3",
    text: "سرعة الاستجابة والدقة في المواعيد هي ما جعلنا نعتمد عليهم كشريك أساسي لجميع مواقعنا في المنطقة الشرقية.",
    name: "فهد المطيري",
    role: "رئيس المشتريات",
    company: "مجموعة خدمات لوجستية",
  },
];

export const defaultStats: StatItem[] = [
  { id: "1", value: "+500", label: "منشأة نخدمها" },
  { id: "2", value: "99.8%", label: "نسبة الإمداد" },
  { id: "3", value: "< 2h", label: "زمن الاستجابة" },
  { id: "4", value: "24/7", label: "مراقبة ودعم" },
];

export const defaultSettings: SiteSettings = {
  phone: "+966500000000",
  whatsapp: "+966500000000",
  email: "info@petronear.sa",
  address: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
  workingHours: "الأحد – الخميس، 8 صباحاً – 6 مساءً",
  cities: "الرياض، جدة، الدمام",
  adminPassword: "petronear2024",
};

// ── CRUD helpers ────────────────────────────────────────────────────────────

export const getSlides = (): HeroSlide[] => get(K.slides, defaultSlides);
export const setSlides = (v: HeroSlide[]): void => set(K.slides, v);

export const getServices = (): ServiceItem[] => get(K.services, defaultServices);
export const setServices = (v: ServiceItem[]): void => set(K.services, v);

export const getTestimonials = (): Testimonial[] => get(K.testimonials, defaultTestimonials);
export const setTestimonials = (v: Testimonial[]): void => set(K.testimonials, v);

export const getStats = (): StatItem[] => get(K.stats, defaultStats);
export const setStats = (v: StatItem[]): void => set(K.stats, v);

export const getSettings = (): SiteSettings => get(K.settings, defaultSettings);
export const setSettings = (v: SiteSettings): void => set(K.settings, v);

// Quotes
export const getQuotes = (): QuoteRequest[] => get(K.quotes, []);
export const addQuote = (
  q: Omit<QuoteRequest, "id" | "status" | "createdAt">
): void => {
  const all = getQuotes();
  const item: QuoteRequest = {
    ...q,
    id: Date.now().toString(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  set(K.quotes, [item, ...all]);
};
export const updateQuoteStatus = (
  id: string,
  status: QuoteRequest["status"]
): void => set(K.quotes, getQuotes().map((q) => (q.id === id ? { ...q, status } : q)));
export const deleteQuote = (id: string): void =>
  set(K.quotes, getQuotes().filter((q) => q.id !== id));

// Messages
export const getMessages = (): ContactMessage[] => get(K.messages, []);
export const addMessage = (
  m: Omit<ContactMessage, "id" | "status" | "createdAt">
): void => {
  const all = getMessages();
  const item: ContactMessage = {
    ...m,
    id: Date.now().toString(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  set(K.messages, [item, ...all]);
};
export const updateMessageStatus = (
  id: string,
  status: ContactMessage["status"]
): void =>
  set(K.messages, getMessages().map((m) => (m.id === id ? { ...m, status } : m)));
export const deleteMessage = (id: string): void =>
  set(K.messages, getMessages().filter((m) => m.id !== id));

// ── Auth ────────────────────────────────────────────────────────────────────
const AUTH_KEY = "pn_admin_auth";

export const checkAuth = (): boolean => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
};

export const doLogin = (password: string): boolean => {
  const settings = getSettings();
  if (password === settings.adminPassword) {
    sessionStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
};

export const doLogout = (): void => {
  if (typeof window !== "undefined") sessionStorage.removeItem(AUTH_KEY);
};
