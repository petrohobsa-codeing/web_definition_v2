import type {
  HeroSlide,
  ServiceItem,
  Testimonial,
  StatItem,
  SiteSettings,
  QuoteRequest,
  ContactMessage,
  ProjectItem,
  BlogPost,
} from "./types";

const K = {
  slides: "pn_slides",
  services: "pn_services",
  testimonials: "pn_testimonials",
  stats: "pn_stats",
  settings: "pn_settings",
  quotes: "pn_quotes",
  messages: "pn_messages",
  projects: "pn_projects",
  posts: "pn_posts",
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

// ── Default data ─────────────────────────────────────────────────────────────

export const defaultSlides: HeroSlide[] = [
  {
    id: "1",
    badge: "خدمات بترولية",
    heading: "وسيطك الموثوق للمنتجات البترولية في المملكة",
    description: "نربط الموردين بالعملاء بأسرع طريقة وأعلى كفاءة — بنزين وديزل وغاز مسال لجميع المواقع والمشاريع.",
    cta1Label: "اطلب عرض سعر",
    cta1Href: "/quote",
    cta2Label: "خدماتنا",
    cta2Href: "/services",
  },
  {
    id: "2",
    badge: "حلول بيئية",
    heading: "سحب مياه الصرف والبيارات بسرعة وأمان",
    description: "صهاريج متخصصة لسحب مياه الصرف الصحي والمياه العادمة من جميع المواقع والمنشآت.",
    cta1Label: "اطلب الخدمة",
    cta1Href: "/quote",
    cta2Label: "اعرف المزيد",
    cta2Href: "/services/environment",
  },
  {
    id: "3",
    badge: "إمداد مائي",
    heading: "مياه التحلية والشرب توصل لموقعك مباشرة",
    description: "نوفّر مياه التحلية ومياه الشرب العذبة للمشاريع والمواقع في جميع مناطق تغطيتنا.",
    cta1Label: "اطلب توصيلاً",
    cta1Href: "/quote",
    cta2Label: "اعرف المزيد",
    cta2Href: "/services/water-supply",
  },
  {
    id: "4",
    badge: "طاقة بديلة",
    heading: "مولدات كهربائية بجميع الأحجام للإيجار",
    description: "وساطة لتأجير المولدات الكهربائية للمشاريع والفعاليات والمنشآت بأسعار تنافسية.",
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
    description: "وساطة وتوريد المنتجات البترولية: بنزين بجميع أنواعه (91، 95)، ديزل، وغاز مسال للمنشآت والمشاريع والأساطيل في جميع مناطق التغطية.",
    href: "/services/diesel-supply",
  },
  {
    id: "2",
    iconName: "Droplets",
    title: "الحلول البيئية والصرف",
    description: "تأمين صهاريج سحب مياه الصرف الصحي والبيارات والمياه العادمة للمواقع والمنشآت والمجمعات السكنية والتجارية بكفاءة عالية.",
    href: "/services/environment",
  },
  {
    id: "3",
    iconName: "Truck",
    title: "الإمداد المائي",
    description: "توزيع وتوريد مياه التحلية ومياه الشرب العذبة للمشاريع والمواقع الإنشائية في مناطق الرياض ومكة والمدينة وينبع وتبوك.",
    href: "/services/water-supply",
  },
  {
    id: "4",
    iconName: "Zap",
    title: "الطاقة البديلة (المولدات)",
    description: "وساطة لتأجير المولدات الكهربائية بمختلف الأحجام والأحمال للمشاريع الإنشائية والفعاليات والمنشآت.",
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
    text: "نحتاج مياه التحلية بكميات كبيرة لمواقعنا في ينبع وتبوك، وفاست لينك هي الشريك الموثوق الذي يلتزم بالمواعيد دون تأخير.",
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

export const defaultProjects: ProjectItem[] = [
  {
    id: "1",
    title: "توريد الديزل لمشروع إنشائي كبير بالرياض",
    description: "تأمين إمداد ديزل منتظم لموقع مشروع إنشائي على مدى 6 أشهر، بكميات تجاوزت 50,000 لتر شهرياً.",
    category: "خدمات بترولية",
    city: "الرياض",
    slug: "diesel-riyadh-construction",
  },
  {
    id: "2",
    title: "خدمة سحب الصرف لمجمع سكني بمكة المكرمة",
    description: "تقديم خدمة سحب البيارات والصرف الصحي لمجمع سكني يضم أكثر من 200 وحدة سكنية.",
    category: "حلول بيئية",
    city: "مكة المكرمة",
    slug: "sewage-makkah-complex",
  },
  {
    id: "3",
    title: "إمداد مائي لموقع إنشائي في ينبع",
    description: "توريد مياه التحلية لموقع بناء صناعي في ينبع، مع جدول توصيل أسبوعي منتظم.",
    category: "إمداد مائي",
    city: "ينبع",
    slug: "water-supply-yanbu",
  },
  {
    id: "4",
    title: "تأجير مولدات لفعالية كبرى بالمدينة المنورة",
    description: "توفير مولدات كهربائية بأحجام متنوعة لتأمين الطاقة خلال فعالية استمرت أسبوعاً كاملاً.",
    category: "طاقة بديلة",
    city: "المدينة المنورة",
    slug: "generators-madinah-event",
  },
  {
    id: "5",
    title: "توريد البنزين لأسطول شركة نقل بتبوك",
    description: "إبرام عقد توريد بنزين 91 و95 لأسطول مركبات يتجاوز 80 مركبة في منطقة تبوك.",
    category: "خدمات بترولية",
    city: "تبوك",
    slug: "petrol-tabuk-fleet",
  },
  {
    id: "6",
    title: "حل متكامل للصرف والمياه لمجمع تجاري",
    description: "تقديم خدمة مزدوجة تشمل سحب مياه الصرف الصحي وتوصيل مياه الشرب لمجمع تجاري بالرياض.",
    category: "حلول متكاملة",
    city: "الرياض",
    slug: "integrated-riyadh-commercial",
  },
];

export const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "أهمية الوساطة اللوجستية في قطاع البناء والإنشاء",
    excerpt: "تعرّف على كيف تساهم شركات الوساطة اللوجستية في تسريع وتيرة المشاريع الإنشائية وتقليل تكاليف الإمداد.",
    content: `تُعدّ الوساطة اللوجستية أحد أبرز العوامل التي تحدد نجاح مشاريع البناء والإنشاء في المملكة العربية السعودية. فبدلاً من أن تضطر كل شركة إنشاء إلى إدارة سلسلة التوريد بمفردها، تأتي شركات الوساطة مثل فاست لينك لتوفير الربط المباشر بين الموردين الموثوقين والمشاريع المحتاجة.

## ما الذي تقدمه الوساطة اللوجستية؟

تتمثل قيمة الوساطة اللوجستية في عدة محاور رئيسية:

- **توفير الوقت:** بدلاً من البحث عن موردين، يتولى الوسيط هذه المهمة نيابةً عنك
- **خفض التكاليف:** شبكة العلاقات الواسعة تمنح أسعاراً تنافسية لا تستطيع الحصول عليها بشكل مستقل
- **ضمان الجودة:** الوسيط الموثوق يُرشّح الموردين ويضمن جودة المنتج
- **المرونة:** القدرة على التعامل مع كميات صغيرة وكبيرة حسب متطلبات المشروع

## لماذا تختار فاست لينك؟

تعمل شركة فاست لينك كحلقة وصل استراتيجية في المملكة، مع تغطية تشمل الرياض، مكة المكرمة، المدينة المنورة، ينبع، وتبوك.`,
    category: "لوجستيات",
    date: "2025-06-01",
    slug: "logistics-brokerage-construction",
  },
  {
    id: "2",
    title: "كل ما تحتاج معرفته عن سحب البيارات والصرف الصحي",
    excerpt: "دليل شامل لخدمة سحب البيارات: متى تحتاجها، كيف تختار المزود المناسب، وما هي معايير السلامة البيئية.",
    content: `تُعدّ خدمة سحب البيارات ومياه الصرف الصحي من الخدمات الأساسية التي تحتاجها المجمعات السكنية والتجارية ومواقع البناء بشكل دوري.

## متى تحتاج لسحب البيارة؟

- امتلاء الخزان وظهور روائح كريهة
- تسرّب مياه الصرف إلى الأرض
- قبل وبعد المناسبات الكبرى
- كجدول وقائي دوري (كل 3-6 أشهر)

## كيف تختار المزود المناسب؟

1. التأكد من الترخيص الرسمي للعمل
2. توافر صهاريج بأحجام مناسبة لاحتياجك
3. الالتزام بمعايير التخلص البيئي الآمن
4. سرعة الاستجابة للطلبات الطارئة

فاست لينك تضمن لك جميع هذه المعايير مع تغطية 24/7 للحالات الطارئة.`,
    category: "بيئة وصرف",
    date: "2025-05-20",
    slug: "sewage-pumping-guide",
  },
  {
    id: "3",
    title: "مياه التحلية للمشاريع الإنشائية: الخيار الأمثل",
    excerpt: "لماذا تعتمد المشاريع الإنشائية الكبرى على مياه التحلية؟ وكيف تضمن وصولها لموقعك في الوقت المحدد؟",
    content: `تحتاج المشاريع الإنشائية إلى كميات كبيرة من المياه لأغراض متعددة: خلط الخرسانة، والتبريد، والاستخدام اليومي للعمال. ومياه التحلية هي الخيار الأمثل لضمان النقاء والتوافر المستمر.

## مزايا مياه التحلية للمشاريع

- **نقاء عالٍ:** خالية من الأملاح والشوائب الضارة
- **توافر مستمر:** لا تعتمد على شبكات المياه التي قد تكون غير متوفرة في بعض المواقع
- **تسليم مرن:** يمكن طلبها بالكميات المطلوبة وفق جدول زمني محدد

## مناطق التغطية

تُغطي فاست لينك الرياض، مكة المكرمة، المدينة المنورة، ينبع، وتبوك — مع إمكانية التنسيق لمناطق أخرى حسب الطلب.`,
    category: "إمداد مائي",
    date: "2025-05-10",
    slug: "desalination-water-construction",
  },
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

// ── CRUD helpers ─────────────────────────────────────────────────────────────

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

// Projects
export const getProjects = (): ProjectItem[] => get(K.projects, defaultProjects);
export const setProjects = (v: ProjectItem[]): void => set(K.projects, v);
export const addProject = (p: Omit<ProjectItem, "id">): void => {
  const all = getProjects();
  set(K.projects, [{ ...p, id: Date.now().toString() }, ...all]);
};
export const deleteProject = (id: string): void =>
  set(K.projects, getProjects().filter((p) => p.id !== id));

// Blog posts
export const getPosts = (): BlogPost[] => get(K.posts, defaultPosts);
export const setPosts = (v: BlogPost[]): void => set(K.posts, v);
export const addPost = (p: Omit<BlogPost, "id">): void => {
  const all = getPosts();
  set(K.posts, [{ ...p, id: Date.now().toString() }, ...all]);
};
export const deletePost = (id: string): void =>
  set(K.posts, getPosts().filter((p) => p.id !== id));

// Quotes
export const getQuotes = (): QuoteRequest[] => get(K.quotes, []);
export const addQuote = (q: Omit<QuoteRequest, "id" | "status" | "createdAt">): void => {
  const all = getQuotes();
  const item: QuoteRequest = { ...q, id: Date.now().toString(), status: "new", createdAt: new Date().toISOString() };
  set(K.quotes, [item, ...all]);
};
export const updateQuoteStatus = (id: string, status: QuoteRequest["status"]): void =>
  set(K.quotes, getQuotes().map((q) => (q.id === id ? { ...q, status } : q)));
export const deleteQuote = (id: string): void =>
  set(K.quotes, getQuotes().filter((q) => q.id !== id));

// Messages
export const getMessages = (): ContactMessage[] => get(K.messages, []);
export const addMessage = (m: Omit<ContactMessage, "id" | "status" | "createdAt">): void => {
  const all = getMessages();
  const item: ContactMessage = { ...m, id: Date.now().toString(), status: "new", createdAt: new Date().toISOString() };
  set(K.messages, [item, ...all]);
};
export const updateMessageStatus = (id: string, status: ContactMessage["status"]): void =>
  set(K.messages, getMessages().map((m) => (m.id === id ? { ...m, status } : m)));
export const deleteMessage = (id: string): void =>
  set(K.messages, getMessages().filter((m) => m.id !== id));

// ── Auth ─────────────────────────────────────────────────────────────────────
const AUTH_KEY = "pn_admin_auth";

export const checkAuth = (): boolean => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
};

export const doLogin = (password: string): boolean => {
  // Try cached password from Firestore (set by getSettings in db.ts)
  const cachedPassword =
    typeof window !== "undefined"
      ? localStorage.getItem("pn_cached_password")
      : null;
  const expectedPassword = cachedPassword ?? defaultSettings.adminPassword;
  if (password === expectedPassword) {
    sessionStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
};

export const doLogout = (): void => {
  if (typeof window !== "undefined") sessionStorage.removeItem(AUTH_KEY);
};
