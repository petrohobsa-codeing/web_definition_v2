import type {
  HeroSlide,
  ServiceItem,
  Testimonial,
  StatItem,
  SiteSettings,
  QuoteRequest,
  ContactMessage,
  ServiceDetailItem,
  ProjectItem,
  BlogPost,
    MissionCard,
    RegionItem,
    NetworkCard,
    CredentialItem,
    FaqItem,
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
    badge: "حلول طاقة متكاملة",
    heading: "Petrohub — حلول متكاملة للطاقة والخدمات اللوجستية",
    description: "منظومة تشغيل متطورة تعتمد على الجودة والسلامة والابتكار لخدمة القطاعات السكنية والتجارية والصناعية.",
    cta1Label: "اطلب عرض سعر",
    cta1Href: "/quote",
    cta2Label: "خدماتنا",
    cta2Href: "/services",
  },
  {
    id: "2",
    badge: "غاز ومنتجات بترولية",
    heading: "توريد غاز البترول المسال والمنتجات البترولية",
    description: "إمدادات مستمرة على مدار الساعة بأعلى معايير السلامة المحلية والدولية وأسطول نقل حديث.",
    cta1Label: "اطلب الخدمة",
    cta1Href: "/quote",
    cta2Label: "اعرف المزيد",
    cta2Href: "/services#lpg",
  },
  {
    id: "3",
    badge: "طاقة وتقنية ذكية",
    heading: "حلول طاقة مستدامة ومنصة PetroHub IoT",
    description: "نرفع كفاءة استهلاك الطاقة ونخفض الانبعاثات الكربونية بما يتوافق مع رؤية المملكة 2030.",
    cta1Label: "اكتشف خدماتنا",
    cta1Href: "/services",
    cta2Label: "اتصل بنا",
    cta2Href: "/contact",
  },
];

export const defaultServices: ServiceItem[] = [
  {
    id: "1",
    iconName: "Flame",
    title: "توريد غاز البترول المسال (LPG)",
    description: "حلول متكاملة لتوريد وتوزيع غاز البترول المسال وفق أعلى معايير السلامة والجودة للقطاعات السكنية والتجارية والصناعية.",
    href: "/services#lpg",
  },
  {
    id: "2",
    iconName: "Fuel",
    title: "المنتجات البترولية (Oil Services)",
    description: "توريد المنتجات البترولية لمختلف القطاعات بسلسلة إمداد مرنة تضمن الكميات المطلوبة في الوقت المحدد.",
    href: "/services#oil",
  },
  {
    id: "3",
    iconName: "Droplets",
    title: "خدمات المياه والبيئة",
    description: "توريد المياه الصالحة للشرب والصناعية وخدمات الصرف الصحي والحلول البيئية مع الحفاظ على الصحة العامة.",
    href: "/services#water",
  },
  {
    id: "4",
    iconName: "Zap",
    title: "حلول الطاقة (Energy Solutions)",
    description: "حلول طاقة متقدمة ترفع كفاءة الاستهلاك وتخفض الانبعاثات بما يتوافق مع مستهدفات رؤية 2030.",
    href: "/services#energy",
  },
  {
    id: "5",
    iconName: "Cpu",
    title: "منصة PetroHub IoT",
    description: "منصة رقمية ذكية لإدارة ومراقبة استهلاك الطاقة والمعدات في الوقت الفعلي باستخدام إنترنت الأشياء.",
    href: "/services#iot",
  },
  {
    id: "6",
    iconName: "Truck",
    title: "الخدمات اللوجستية",
    description: "نقل وتوزيع البضائع والمواد بكفاءة عالية عبر شبكة تشغيل تغطي مختلف مناطق المملكة مع تتبع مباشر.",
    href: "/services#logistics",
  },
  {
    id: "7",
    iconName: "MonitorCheck",
    title: "أنظمة التتبع ومراقبة المركبات",
    description: "حلول ذكية لإدارة الأساطيل تعتمد على GPS وGSM وكاميرات Dash Cam لمراقبة المركبات وتحليل الأداء.",
    href: "/services#tracking",
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    text: "بتروهب وفّرت لنا الديزل لموقع المشروع في وقت قياسي، وبأسعار تنافسية جداً. تعاملهم احترافي وسرعة استجابتهم لا تُقارن.",
    name: "م. عبدالرحمن الغامدي",
    role: "مدير المشاريع",
    company: "شركة البنية التحتية للمقاولات",
  },
  {
    id: "2",
    text: "خدمة سحب البيارات كانت من أهم ما يشغل بالنا في الموقع. مع بتروهب أصبح الأمر مجرد اتصال واحد وتُحلّ المشكلة خلال ساعات.",
    name: "سعد المالكي",
    role: "مشرف الموقع",
    company: "مجموعة التطوير العمراني",
  },
  {
    id: "3",
    text: "نحتاج مياه التحلية بكميات كبيرة لمواقعنا في ينبع وتبوك، وبتروهب هي الشريك الموثوق الذي يلتزم بالمواعيد دون تأخير.",
    name: "فيصل الحربي",
    role: "مدير العمليات",
    company: "شركة المياه والخدمات المتكاملة",
  },
];

export const defaultStats: StatItem[] = [
  { id: "1", value: "7", label: "خدمات وحلول متكاملة" },
  { id: "2", value: "5+", label: "مناطق تغطية في المملكة" },
  { id: "3", value: "24/7", label: "تشغيل ومراقبة متواصلة" },
  { id: "4", value: "30%", label: "خفض في استهلاك الطاقة" },
];

export const defaultProjects: ProjectItem[] = [
  {
    id: "1",
    title: "توريد غاز LPG لمجمع صناعي بالرياض",
    description: "تأمين إمدادات غاز البترول المسال على مدار الساعة لمجمع صناعي وفق أعلى معايير السلامة، مع أسطول نقل مجهّز.",
    category: "غاز LPG",
    city: "الرياض",
    slug: "lpg-riyadh-industrial",
  },
  {
    id: "2",
    title: "حلول طاقة مستدامة لمنشأة تجارية بمكة المكرمة",
    description: "تنفيذ حلول طاقة رفعت كفاءة الاستهلاك وخفضت الانبعاثات بما يتوافق مع مستهدفات رؤية 2030.",
    category: "حلول طاقة",
    city: "مكة المكرمة",
    slug: "energy-makkah-commercial",
  },
  {
    id: "3",
    title: "تركيب منصة PetroHub IoT لمراقبة الاستهلاك",
    description: "ربط معدات منشأة صناعية بمنصة PetroHub IoT لمراقبة الطاقة لحظياً وخفض الاستهلاك حتى 30%.",
    category: "PetroHub IoT",
    city: "ينبع",
    slug: "iot-yanbu-monitoring",
  },
  {
    id: "4",
    title: "خدمات مياه وبيئة لموقع إنشائي بالمدينة المنورة",
    description: "توريد مياه صناعية وخدمات بيئية متخصصة مع استجابة سريعة والتزام بالمعايير الصحية والبيئية.",
    category: "مياه وبيئة",
    city: "المدينة المنورة",
    slug: "water-madinah-site",
  },
  {
    id: "5",
    title: "إدارة أسطول وتتبع مركبات لشركة نقل بتبوك",
    description: "تركيب أنظمة GPS وكاميرات Dash Cam لأسطول يتجاوز 80 مركبة لمراقبة الأداء وخفض استهلاك الوقود.",
    category: "تتبع المركبات",
    city: "تبوك",
    slug: "tracking-tabuk-fleet",
  },
  {
    id: "6",
    title: "حلول لوجستية متكاملة لمجمع تجاري بالرياض",
    description: "إدارة احترافية لسلسلة الإمداد مع تتبع مباشر للشحنات وسرعة في التنفيذ والتسليم.",
    category: "لوجستيات",
    city: "الرياض",
    slug: "logistics-riyadh-commercial",
  },
];

export const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "كيف يساهم إنترنت الأشياء في خفض استهلاك الطاقة",
    excerpt: "تعرّف على كيف تساعد منصة PetroHub IoT المنشآت على مراقبة الطاقة لحظياً وخفض الاستهلاك حتى 30%.",
    content: `أصبحت تقنيات إنترنت الأشياء (IoT) ركيزة أساسية في إدارة الطاقة الحديثة. ومن خلال منصة PetroHub IoT، تستطيع المنشآت مراقبة استهلاك الطاقة والمعدات في الوقت الفعلي واتخاذ قرارات مبنية على بيانات دقيقة.

## ما الذي تقدمه منصة PetroHub IoT؟

- **مراقبة مباشرة:** متابعة الأصول والمعدات لحظياً
- **تنبيهات ذكية:** إشعارات فورية عند حدوث أي خلل
- **صيانة وقائية:** قرارات صيانة مبنية على البيانات
- **تقارير تحليلية:** رؤى دقيقة لتحسين الأداء

## القيمة المضافة

يساعد ذلك على خفض استهلاك الطاقة بنسبة تصل إلى 30%، وتقليل الأعطال غير المخطط لها، ورفع الإنتاجية.`,
    category: "طاقة وتقنية",
    date: "2025-06-01",
    slug: "iot-energy-efficiency",
  },
  {
    id: "2",
    title: "معايير السلامة في توريد غاز البترول المسال (LPG)",
    excerpt: "دليل حول أهمية الالتزام بمعايير السلامة المحلية والدولية في نقل وتوزيع غاز البترول المسال.",
    content: `يُعدّ غاز البترول المسال (LPG) مصدر طاقة أساسياً للقطاعات السكنية والتجارية والصناعية، ويتطلب التزاماً صارماً بمعايير السلامة في جميع مراحل النقل والتسليم.

## ركائز السلامة في توريد LPG

- التزام كامل بمعايير السلامة المحلية والدولية
- أسطول نقل حديث مجهّز بأحدث أنظمة الأمان
- فرق متخصصة ومدرّبة على التعامل مع الحالات الطارئة
- جودة مضمونة في جميع مراحل النقل

## لماذا Petrohub؟

توفر Petrohub إمدادات مستمرة على مدار الساعة مع سرعة في الاستجابة وجودة مضمونة في كل مرحلة.`,
    category: "غاز وسلامة",
    date: "2025-05-20",
    slug: "lpg-safety-standards",
  },
  {
    id: "3",
    title: "حلول الطاقة المستدامة ودورها في رؤية 2030",
    excerpt: "كيف تسهم حلول الطاقة الحديثة في خفض الانبعاثات الكربونية ودعم مستهدفات رؤية المملكة 2030؟",
    content: `تُعدّ الاستدامة محوراً رئيسياً في رؤية المملكة 2030، وتلعب حلول الطاقة الحديثة دوراً جوهرياً في تحقيق هذا الهدف من خلال رفع الكفاءة وخفض الانبعاثات.

## مزايا حلول الطاقة المستدامة

- **تحسين كفاءة الاستهلاك:** خفض الفاقد ورفع الأداء
- **تقليل الانبعاثات:** حلول صديقة للبيئة
- **خفض التكاليف:** تقليل التكاليف التشغيلية على المدى الطويل
- **عائد استثماري أعلى:** تحقيق أقصى قيمة من الأصول

## التزام Petrohub

تصمّم Petrohub حلولها وفق احتياجات كل مشروع، مع الالتزام بأعلى معايير الجودة والاستدامة.`,
    category: "استدامة",
    date: "2025-05-10",
    slug: "sustainable-energy-vision-2030",
  },
];

export const defaultSettings: SiteSettings = {
  phone: "+966500000000",
  whatsapp: "+966500000000",
  email: "info@petrohub.sa",
  address: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
  workingHours: "الأحد – الخميس، 8 صباحاً – 6 مساءً",
  cities: "الرياض، مكة المكرمة، المدينة المنورة، ينبع، تبوك",
  adminPassword: "petrohub2024",
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

export const doLogin = (): void => {
  if (typeof window !== "undefined") sessionStorage.setItem(AUTH_KEY, "true");
};

export const doLogout = (): void => {
  if (typeof window !== "undefined") sessionStorage.removeItem(AUTH_KEY);
};


export const defaultMissionCards: MissionCard[] = [
  { id: "1", title: "مهمتنا", description: "تقديم خدمات وحلول طاقة موثوقة عالية الجودة تعزز كفاءة الأعمال وتدعم الاستدامة لعملائنا." },
  { id: "2", title: "رؤيتنا", description: "أن نكون الشريك الأول في حلول الطاقة والخدمات المتكاملة في المملكة، بما يتوافق مع رؤية 2030." },
  { id: "3", title: "قصتنا", description: "Petrohub — منظومة متكاملة للطاقة والخدمات اللوجستية تخدم القطاعات السكنية والتجارية والصناعية بالجودة والابتكار." },
  ];

export const defaultRegions: RegionItem[] = [
  { id: "1", name: "الرياض" },
  { id: "2", name: "مكة المكرمة" },
  { id: "3", name: "المدينة المنورة" },
  { id: "4", name: "ينبع" },
  { id: "5", name: "تبوك" },
  ];

export const defaultNetworkCards: NetworkCard[] = [
  { id: "1", iconName: "Store", title: "الموردون" },
  { id: "2", iconName: "Truck", title: "شركات اللوجستيات والسائقون" },
  { id: "3", iconName: "Building2", title: "الشركات والمؤسسات" },
  ];

export const defaultCredentials: CredentialItem[] = [
  { id: "1", iconName: "ShieldCheck", title: "الجودة والسلامة", description: "التزام كامل بأعلى معايير الجودة والسلامة المحلية والدولية في كل خدماتنا." },
  { id: "2", iconName: "FileCheck2", title: "تقنيات حديثة", description: "حلول رقمية ومنصة PetroHub IoT لمراقبة الاستهلاك واتخاذ قرارات دقيقة." },
  { id: "3", iconName: "Award", title: "حلول مستدامة", description: "حلول طاقة تخفض الانبعاثات وتدعم مستهدفات رؤية المملكة 2030." },
  { id: "4", iconName: "Headset", title: "دعم على مدار الساعة", description: "فريق متاح 24/7 للطلبات الطارئة والاستفسارات في أي وقت." },
  ];

export const defaultFaqs: FaqItem[] = [
  { id: "1", question: "ما الخدمات التي تقدمها Petrohub؟", answer: "نقدم سبع خدمات متكاملة: توريد غاز البترول المسال (LPG)، المنتجات البترولية، خدمات المياه والبيئة، حلول الطاقة، منصة PetroHub IoT، الخدمات اللوجستية، وأنظمة تتبع ومراقبة المركبات." },
  { id: "2", question: "ما المناطق التي تغطيها خدماتكم؟", answer: "نغطي شبكة تشغيل واسعة تشمل الرياض، مكة المكرمة، المدينة المنورة، ينبع، وتبوك، مع إمكانية التنسيق لمناطق أخرى حسب الطلب." },
  { id: "3", question: "كيف تضمنون معايير السلامة والجودة؟", answer: "نلتزم بأعلى معايير السلامة المحلية والدولية في جميع مراحل النقل والتسليم، باستخدام أسطول حديث مجهز بأحدث أنظمة الأمان وفرق متخصصة مدربة." },
  { id: "4", question: "ما هي منصة PetroHub IoT؟", answer: "منصة رقمية ذكية لمراقبة استهلاك الطاقة والمعدات في الوقت الفعلي، تساعد على خفض الاستهلاك حتى 30% وتقليل الأعطال عبر الصيانة الوقائية والتنبيهات الذكية." },
  { id: "5", question: "كيف أحصل على عرض سعر؟", answer: "يمكنك طلب عرض سعر مخصص عبر صفحة اطلب عرض سعر، وسيتواصل معك فريقنا خلال 24 ساعة بعرض مصمم وفق احتياجاتك." },
  ];


export const defaultServiceDetails: ServiceDetailItem[] = [
  {
        id: "1",
        slug: "lpg",
        iconName: "Flame",
        title: "توريد غاز البترول المسال (LPG)",
        intro: "توفر Petrohub حلولاً متكاملة لتوريد وتوزيع غاز البترول المسال (LPG) وفق أعلى معايير السلامة والجودة، لتلبية احتياجات القطاعات السكنية والتجارية والصناعية. وتعتمد خدماتنا على شبكة توزيع فعّالة وأساطيل نقل مجهزة وفريق متخصص يضمن استمرارية الإمداد وسرعة الاستجابة في جميع أنحاء المملكة.",
        advantages: ["إمدادات مستمرة على مدار الساعة.", "التزام كامل بمعايير السلامة المحلية والدولية.", "أسطول نقل حديث ومجهز بأحدث أنظمة الأمان.", "سرعة في التوريد والاستجابة لطلبات العملاء.", "جودة مضمونة في جميع مراحل النقل والتسليم."],
        value: ["استمرارية الأعمال دون انقطاع.", "تقليل المخاطر التشغيلية.", "تعزيز كفاءة التشغيل.", "خدمة موثوقة تدعم احتياجات العملاء على المدى الطويل."],
  },
  {
        id: "2",
        slug: "oil",
        iconName: "Fuel",
        title: "المنتجات البترولية (Oil Services)",
        intro: "توفر Petrohub حلولاً متكاملة لتوريد المنتجات البترولية لمختلف القطاعات، مع الالتزام بأعلى معايير الجودة والاستدامة. ونوفر سلسلة إمداد مرنة تضمن وصول المنتجات بالكميات المطلوبة وفي الوقت المحدد، بما يدعم استمرارية العمليات التشغيلية ويعزز كفاءة الأداء.",
        advantages: ["منتجات مطابقة للمواصفات القياسية.", "حلول توريد مرنة تناسب مختلف المشاريع.", "أسطول نقل حديث وآمن.", "ضمان الجودة والكمية.", "التزام بالاشتراطات البيئية والتنظيمية."],
        value: ["رفع كفاءة تشغيل المعدات.", "تقليل الأعطال والتوقفات.", "تعزيز الإنتاجية.", "توفير حلول موثوقة ومستدامة."],
  },
  {
        id: "3",
        slug: "water",
        iconName: "Droplets",
        title: "خدمات المياه والبيئة",
        intro: "تقدم Petrohub حلولاً متكاملة في قطاع المياه والخدمات البيئية، تشمل توريد المياه الصالحة للشرب والمياه الصناعية، بالإضافة إلى خدمات الصرف الصحي والحلول البيئية، بما يضمن استدامة الخدمات والمحافظة على الصحة العامة والبيئة.",
        advantages: ["توفير المياه بجميع الكميات المطلوبة.", "خدمات بيئية متخصصة.", "استجابة سريعة للحالات الطارئة.", "الالتزام بالمعايير الصحية والبيئية.", "تغطية تشغيلية واسعة."],
        value: ["ضمان استمرارية الإمدادات.", "تحسين كفاءة الخدمات البيئية.", "تقليل المخاطر التشغيلية.", "حلول متكاملة من مصدر واحد."],
  },
  {
        id: "4",
        slug: "energy",
        iconName: "Zap",
        title: "حلول الطاقة (Energy Solutions)",
        intro: "نساعد عملاءنا على بناء مستقبل أكثر استدامة من خلال تقديم حلول متقدمة في قطاع الطاقة، تسهم في رفع كفاءة استهلاك الطاقة، وخفض الانبعاثات الكربونية، وتعزيز الاعتماد على التقنيات الحديثة، بما يتوافق مع مستهدفات رؤية المملكة 2030.",
        advantages: ["حلول مستدامة وصديقة للبيئة.", "تحسين كفاءة استهلاك الطاقة.", "تقليل الانبعاثات الكربونية.", "حلول مصممة وفق احتياجات كل مشروع.", "الالتزام بأعلى معايير الجودة والاستدامة."],
        value: ["خفض التكاليف التشغيلية.", "تحسين الأداء.", "تعزيز الاستدامة البيئية.", "تحقيق أعلى عائد على الاستثمار."],
  },
  {
        id: "5",
        slug: "iot",
        iconName: "Cpu",
        title: "منصة PetroHub IoT",
        intro: "PetroHub IoT منصة رقمية ذكية لإدارة ومراقبة استهلاك الطاقة والمعدات في الوقت الفعلي، تعتمد على تقنيات إنترنت الأشياء والذكاء التحليلي، مما يساعد المنشآت على تحسين كفاءة التشغيل، وتقليل استهلاك الطاقة، واتخاذ قرارات مبنية على بيانات دقيقة.",
        advantages: ["مراقبة مباشرة للأصول والمعدات.", "تنبيهات ذكية عند حدوث أي خلل.", "تقارير وتحليلات تفصيلية.", "صيانة وقائية تعتمد على البيانات.", "تحكم ذكي وأتمتة للعمليات."],
        value: ["خفض استهلاك الطاقة بنسبة تصل إلى 30%.", "تقليل الأعطال غير المخطط لها.", "رفع الإنتاجية.", "تحسين جودة اتخاذ القرار."],
  },
  {
        id: "6",
        slug: "logistics",
        iconName: "Truck",
        title: "الخدمات اللوجستية",
        intro: "توفر Petrohub حلولاً لوجستية متكاملة تشمل نقل وتوزيع البضائع والمواد بكفاءة عالية عبر شبكة تشغيل تغطي مختلف مناطق المملكة، مع الالتزام بالمواعيد، وسلامة الشحنات، واستخدام أحدث تقنيات التتبع والإدارة.",
        advantages: ["شبكة نقل تغطي جميع أنحاء المملكة.", "إدارة احترافية لسلسلة الإمداد.", "تتبع مباشر للشحنات.", "سرعة في التنفيذ والتسليم.", "أعلى معايير السلامة أثناء النقل."],
        value: ["تقليل زمن التسليم.", "تحسين كفاءة سلسلة التوريد.", "تقليل الخسائر والأضرار.", "تعزيز موثوقية العمليات اللوجستية."],
  },
  {
        id: "7",
        slug: "tracking",
        iconName: "MonitorCheck",
        title: "أنظمة التتبع ومراقبة المركبات",
        intro: "توفر Petrohub حلولاً ذكية لإدارة الأساطيل تعتمد على تقنيات GPS وGSM وكاميرات Dash Cam، بما يتيح مراقبة المركبات والمعدات لحظياً، وتحليل الأداء، وتحسين كفاءة التشغيل، وتعزيز مستويات السلامة.",
        advantages: ["تتبع مباشر ودقيق للمركبات.", "مراقبة أداء السائقين.", "تحليل المسارات واستهلاك الوقود.", "تنبيهات فورية للحوادث والانحرافات.", "تقارير تشغيلية وإدارية متقدمة.", "متابعة حالة المركبات والصيانة."],
        value: ["حماية الأصول والمركبات.", "تقليل استهلاك الوقود.", "رفع كفاءة إدارة الأساطيل.", "تحسين مستويات السلامة.", "دعم اتخاذ القرارات التشغيلية."],
  },
  ];
