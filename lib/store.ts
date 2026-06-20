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
    badge: "خدمات بترولية",
    heading: "وسيطك الموثوق للمنتجات البترولية في المملكة",
    description:
      "نربط الموردين بالعملاء بأسرع طريقة وأعلى كفاءة — بنزين وديزل وغاز مسال لجميع المواقع والمشاريع.",
    cta1Label: "اطلب عرض سعر",
    cta1Href: "/quote",
    cta2Label: "خدماتنا",
    cta2Href: "/services",
  },
  {
    id: "2",
    badge: "حلول بيئية",
    heading: "سحب مياه الصرف والبيارات بسرعة وأمان",
    description:
      "صهاريج متخصصة لسحب مياه الصرف الصحي والمياه العادمة من جميع المواقع والمنشآت.",
    cta1Label: "اطلب الخدمة",
    cta1Href: "/quote",
    cta2Label: "اعرف المزيد",
    cta2Href: "/services/environment",
  },
  {
    id: "3",
    badge: "إمداد مائي",
    heading: "مياه التحلية والشرب توصل لموقعك مباشرة",
    description:
      "نوفّر مياه التحلية ومياه الشرب العذبة للمشاريع والمواقع في جميع مناطق تغطيتنا.",
    cta1Label: "اطلب توصيلاً",
    cta1Href: "/quote",
    cta2Label: "اعرف المزيد",
    cta2Href: "/services/water-supply",
  },
  {
    id: "4",
    badge: "طاقة بديلة",
    heading: "مولدات كهربائية بجميع الأحجام للإيجار",
    description:
      "وساطة لتأجير المولدات الكهربائية للمشاريع والفعاليات والمنشآت بأسعار تنافسية.",
    cta1Label: "اطلب عرض سعر",
    cta1Href: "/quote",
    cta2Label: "اتصل بنا",
    cta2Href: "/contact",
  },
];

export const defaultServices: ServiceItem[] = [
  {
    id: "1",
    iconName: "Fuel",
    title: "الخدمات البترولية والغاز",
    description:
      "وساطة وتوريد المنتجات البترولية: بنزين بجميع أنواعه (91، 95)، ديزل، وغاز مسال للمنشآت والمشاريع والأساطيل في جميع مناطق التغطية.",
    href: "/services/diesel-supply",
  },
  {
    id: "2",
    iconName: "Droplets",
    title: "الحلول البيئية والصرف",
    description:
      "تأمين صهاريج سحب مياه الصرف الصحي والبيارات والمياه العادمة للمواقع والمنشآت والمجمعات السكنية والتجارية بكفاءة عالية.",
    href: "/services/environment",
  },
  {
    id: "3",
    iconName: "Truck",
    title: "الإمداد المائي",
    description:
      "توزيع وتوريد مياه التحلية ومياه الشرب العذبة للمشاريع والمواقع الإنشائية والأحياء والمجمعات في مناطق الرياض ومكة والمدينة وينبع وتبوك.",
    href: "/services/water-supply",
  },
  {
    id: "4",
    iconName: "Zap",
    title: "الطاقة البديلة (المولدات)",
    description:
      "وساطة لتأجير المولدات الكهربائية بمختلف الأحجام والأحمال للمشاريع الإنشائية والفعاليات والمنشآت التي تحتاج مصادر طاقة بديلة أو احتياطية.",
    href: "/services/generators",
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    text: "فاست لينك وفّرت لنا الديزل لموقع المشروع في وقت قياسي، وبأسعار تنافسية جداً. تعاملهم احترافي وسرعة استجابتهم لا تُقارن.",
    name: "م. عبدالرحمن الغامدي",
    role: "مدير المشاريع",
    company: "شركة البنية التحتية للمقاولات",
  },
  {
    id: "2",
    text: "خدمة سحب البيارات كانت من أهم ما يشغل بالنا في الموقع. مع فاست لينك أصبح الأمر مجرد اتصال واحد وتُحلّ المشكلة خلال ساعات.",
    name: "سعد المالكي",
    role: "مشرف الموقع",
    company: "مجموعة التطوير العمراني",
  },
  {
    id: "3",
    text: "نحتاج مياه التحلية بكميات كبيرة لمواقعنا في ينبع وتبوك، وفاست لينك هي الشريك الموثوق الذي يلتزم بالمواعيد ويوفر الكميات المطلوبة دون تأخير.",
    name: "فيصل الحربي",
    role: "مدير العمليات",
    company: "شركة المياه والخدمات المتكاملة",
  },
];

export const defaultStats: StatItem[] = [
  { id: "1", value: "4", label: "خدمات لوجستية متكاملة" },
  { id: "2", value: "5+", label: "مناطق تغطية في المملكة" },
  { id: "3", value: "24/7", label: "متاحون للطلبات الطارئة" },
  { id: "4", value: "100%", label: "التزام بالمواعيد والجودة" },
];

export const defaultSettings: SiteSettings = {
  phone: "+966500000000",
  whatsapp: "+966500000000",
  email: "info@fastlink.sa",
  address: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
  workingHours: "الأحد – الخميس، 8 صباحاً – 6 مساءً",
  cities: "الرياض، مكة المكرمة، المدينة المنورة، ينبع، تبوك",
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
