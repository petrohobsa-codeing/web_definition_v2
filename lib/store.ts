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
    badge: "توصيل الوقود",
    heading: "وقودك يصل قبل أن تحتاجه، في كل وقت",
    description:
      "فاست لينك توصّل الديزل والغاز لمنشأتك بالكمية الصحيحة وفي الموعد المحدد، مع تتبّع لحظي وفواتير ضريبية إلكترونية.",
    cta1Label: "اطلب توصيلاً الآن",
    cta1Href: "/quote",
    cta2Label: "تعرّف على خدماتنا",
    cta2Href: "/services",
  },
  {
    id: "2",
    badge: "أنظمة ذكية",
    heading: "خزانك تحت السيطرة من جوّالك مباشرة",
    description:
      "حساسات IoT متطورة تقيس المستوى لحظياً وتنبّهك تلقائياً قبل النفاد وتكشف أي سحب غير اعتيادي.",
    cta1Label: "اكتشف الحساسات",
    cta1Href: "/services/smart-sensors",
    cta2Label: "احجز عرضاً مجانياً",
    cta2Href: "/contact",
  },
  {
    id: "3",
    badge: "لوحة تحكم موحّدة",
    heading: "أدِر كل مواقعك من شاشة واحدة",
    description:
      "منصة سحابية تجمع بيانات جميع خزاناتك وتقاريرك وفواتيرك في مكان واحد، مع صلاحيات مرنة لفريقك.",
    cta1Label: "اكتشف المنصة",
    cta1Href: "/services/remote-monitoring",
    cta2Label: "اطلب عرض سعر",
    cta2Href: "/quote",
  },
  {
    id: "4",
    badge: "استمرارية بلا توقف",
    heading: "عملياتك لا تتوقف — نضمن ذلك",
    description:
      "نظام الطلب التلقائي لدينا يرصد مستويات الوقود ويرسل شحنتك قبل النفاد، فتركّز على عملك ونحن نتكفّل بالباقي.",
    cta1Label: "ابدأ الآن",
    cta1Href: "/quote",
    cta2Label: "تحدّث مع مختص",
    cta2Href: "/contact",
  },
];

export const defaultServices: ServiceItem[] = [
  {
    id: "1",
    iconName: "Fuel",
    title: "تزويد الديزل",
    description:
      "نوصّل الديزل عالي الجودة لمولّداتك ومعداتك الثقيلة بأي كمية وفي أي موقع داخل المملكة. توصيل مجدول أو فوري مع فواتير ضريبية إلكترونية متوافقة مع هيئة الزكاة والضريبة.",
    href: "/services/diesel-supply",
  },
  {
    id: "2",
    iconName: "Flame",
    title: "تزويد البترول",
    description:
      "توصيل البترول عالي الجودة للمنشآت الصناعية والتجارية والأساطيل بأعلى معايير السلامة والجودة، مع ضمان الإمداد المنتظم وفواتير ضريبية إلكترونية.",
    href: "/services/gas-supply",
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    text: "منذ تعاملنا مع فاست لينك لم يتوقف مولّد الطاقة في موقعنا ولو مرة واحدة. الحساسات تنبّهنا قبل يومين من موعد النفاد وتصل الشحنة دائماً في الوقت المحدد.",
    name: "م. عبدالعزيز السلمي",
    role: "مدير المشاريع",
    company: "شركة مقاولات المستقبل",
  },
  {
    id: "2",
    text: "اكتشفنا بفضل أجهزة الاستشعار أن استهلاكنا الفعلي أقل بـ18٪ من الفواتير القديمة. الشفافية التي توفّرها المنصة غيّرت طريقة تفكيرنا في إدارة التكاليف.",
    name: "ناصر الدوسري",
    role: "المدير المالي",
    company: "مصنع المنتجات البتروكيماوية",
  },
  {
    id: "3",
    text: "لدينا 12 موقعاً في أربع مناطق، وفاست لينك هي الوحيدة التي استطاعت خدمتها جميعاً من منصة واحدة بمرونة عالية ودعم ميداني حقيقي.",
    name: "خالد العتيبي",
    role: "رئيس سلسلة الإمداد",
    company: "مجموعة الخدمات اللوجستية المتكاملة",
  },
];

export const defaultStats: StatItem[] = [
  { id: "1", value: "+600", label: "منشأة نخدمها" },
  { id: "2", value: "99.9%", label: "نسبة التسليم في الموعد" },
  { id: "3", value: "< 90d", label: "متوسط وقت الاستجابة" },
  { id: "4", value: "24/7", label: "دعم فني ميداني" },
];

export const defaultSettings: SiteSettings = {
  phone: "+966500000000",
  whatsapp: "+966500000000",
  email: "info@fastlink.sa",
  address: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
  workingHours: "الأحد – الخميس، 8 صباحاً – 6 مساءً",
  cities: "الرياض، جدة، الدمام، المنطقة الشرقية",
  adminPassword: "fastlink2024",
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
