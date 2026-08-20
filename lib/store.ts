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
    AboutCompanyContent,
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
    badge: "حلول طاقة متكاملة", badgeEn: "Integrated Energy Solutions",
    heading: "Petrohub — حلول متكاملة للطاقة والخدمات اللوجستية", headingEn: "Petrohub - Integrated Energy & Logistics Solutions",
    description: "منظومة تشغيل متطورة تعتمد على الجودة والسلامة والابتكار لخدمة القطاعات السكنية والتجارية والصناعية.", descriptionEn: "An advanced operating system built on quality, safety and innovation, serving the residential, commercial and industrial sectors.",
    cta1Label: "اطلب عرض سعر", cta1LabelEn: "Get a Quote",
    cta1Href: "/quote",
    cta2Label: "خدماتنا", cta2LabelEn: "Our Services",
    cta2Href: "/services",
  },
  {
    id: "2",
    badge: "غاز ومنتجات بترولية", badgeEn: "Gas & Petroleum Products",
    heading: "توريد غاز البترول المسال والمنتجات البترولية", headingEn: "LPG and Petroleum Products Supply",
    description: "إمدادات مستمرة على مدار الساعة بأعلى معايير السلامة المحلية والدولية وأسطول نقل حديث.", descriptionEn: "Round-the-clock supply meeting the highest local and international safety standards, with a modern transport fleet.",
    cta1Label: "اطلب الخدمة", cta1LabelEn: "Request Service",
    cta1Href: "/quote",
    cta2Label: "اعرف المزيد", cta2LabelEn: "Learn More",
    cta2Href: "/services#lpg",
  },
  {
    id: "3",
    badge: "طاقة وتقنية ذكية", badgeEn: "Smart Energy & Technology",
    heading: "حلول طاقة مستدامة ومنصة PetroHub IoT", headingEn: "Sustainable Energy Solutions and the PetroHub IoT Platform",
    description: "نرفع كفاءة استهلاك الطاقة ونخفض الانبعاثات الكربونية بما يتوافق مع رؤية المملكة 2030.", descriptionEn: "We raise energy efficiency and cut carbon emissions in line with Saudi Vision 2030.",
    cta1Label: "اكتشف خدماتنا", cta1LabelEn: "Explore Our Services",
    cta1Href: "/services",
    cta2Label: "اتصل بنا", cta2LabelEn: "Contact Us",
    cta2Href: "/contact",
  },
];

export const defaultServices: ServiceItem[] = [
  {
    id: "1",
    iconName: "Flame",
    title: "توريد غاز البترول المسال (LPG)",
    titleEn: "LPG Supply",
    description: "حلول متكاملة لتوريد وتوزيع غاز البترول المسال وفق أعلى معايير السلامة والجودة للقطاعات السكنية والتجارية والصناعية.",
    descriptionEn: "Integrated solutions for supplying and distributing LPG to the highest safety and quality standards, serving residential, commercial and industrial sectors.",
    href: "/services#lpg",
  },
  {
    id: "2",
    iconName: "Fuel",
    title: "المنتجات البترولية (Oil Services)",
    titleEn: "Petroleum Products (Oil Services)",
    description: "توريد المنتجات البترولية لمختلف القطاعات بسلسلة إمداد مرنة تضمن الكميات المطلوبة في الوقت المحدد.",
    descriptionEn: "Supplying petroleum products across sectors through a flexible supply chain that delivers the required quantities on time.",
    href: "/services#oil",
  },
  {
    id: "3",
    iconName: "Droplets",
    title: "خدمات المياه والبيئة",
    titleEn: "Water & Environmental Services",
    description: "توريد المياه الصالحة للشرب والصناعية وخدمات الصرف الصحي والحلول البيئية مع الحفاظ على الصحة العامة.",
    descriptionEn: "Supplying potable and industrial water, sewage services and environmental solutions while safeguarding public health.",
    href: "/services#water",
  },
  {
    id: "4",
    iconName: "Zap",
    title: "حلول الطاقة (Energy Solutions)",
    titleEn: "Energy Solutions",
    description: "حلول طاقة متقدمة ترفع كفاءة الاستهلاك وتخفض الانبعاثات بما يتوافق مع مستهدفات رؤية 2030.",
    descriptionEn: "Advanced energy solutions that raise consumption efficiency and cut emissions in line with Vision 2030 targets.",
    href: "/services#energy",
  },
  {
    id: "5",
    iconName: "Cpu",
    title: "منصة PetroHub IoT",
    titleEn: "PetroHub IoT Platform",
    description: "منصة رقمية ذكية لإدارة ومراقبة استهلاك الطاقة والمعدات في الوقت الفعلي باستخدام إنترنت الأشياء.",
    descriptionEn: "A smart digital platform to manage and monitor energy and equipment consumption in real time using IoT.",
    href: "/services#iot",
  },
  {
    id: "6",
    iconName: "Truck",
    title: "الخدمات اللوجستية",
    titleEn: "Logistics Services",
    description: "نقل وتوزيع البضائع والمواد بكفاءة عالية عبر شبكة تشغيل تغطي مختلف مناطق المملكة مع تتبع مباشر.",
    descriptionEn: "Efficient transport and distribution of goods and materials across an operating network covering the Kingdom, with live tracking.",
    href: "/services#logistics",
  },
  {
    id: "7",
    iconName: "MonitorCheck",
    title: "أنظمة التتبع ومراقبة المركبات",
    titleEn: "Vehicle Tracking & Monitoring",
    description: "حلول ذكية لإدارة الأساطيل تعتمد على GPS وGSM وكاميرات Dash Cam لمراقبة المركبات وتحليل الأداء.",
    descriptionEn: "Smart fleet management solutions using GPS, GSM and dash cams to monitor vehicles and analyse performance.",
    href: "/services#tracking",
  },
  {
    id: "8",
    iconName: "Fuel",
    image: "/images/services/energy-logistics.jpg",
    title: "إمدادات الطاقة والإدارة اللوجستية",
    titleEn: "Power Supply and Logistics Administration",
    description: "تنفيذ منظم لا ينتهي عند توفير المنتج، يغطي نطاقًا واسعًا من الإمدادات مع إدارة لوجستية وتشغيلية متكاملة.",
    descriptionEn: "Structured execution that extends beyond product delivery, covering a wide supply range with integrated logistics and operations administration.",
    href: "/services#energy-logistics",
  },
  {
    id: "9",
    iconName: "MonitorCheck",
    image: "/images/services/petrohob-monitor.jpg",
    title: "Petrohub Monitor",
    titleEn: "Petrohub Monitor",
    description: "منتج تقني يبني رؤية موحدة للأصول والاستهلاك؛ راقب، قِس، واربط بياناتك في شاشة واحدة.",
    descriptionEn: "A technological solution that creates a comprehensive perspective on assets and consumption - monitor, assess, and connect your data on a unified display.",
    href: "/services#monitor",
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
  { id: "1", value: "7", label: "خدمات وحلول متكاملة", labelEn: "Integrated Services & Solutions" },
  { id: "2", value: "5+", label: "مناطق تغطية في المملكة", labelEn: "Coverage Regions in the Kingdom" },
  { id: "3", value: "24/7", label: "تشغيل ومراقبة متواصلة", labelEn: "Continuous Operation & Monitoring" },
  { id: "4", value: "30%", label: "خفض في استهلاك الطاقة", labelEn: "Reduction in Energy Consumption" },
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
  website: "petrohub.com.sa",
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


export const defaultMissionCards: MissionCard[] = [
  { id: "1", title: "مهمتنا", description: "تقديم خدمات وحلول طاقة موثوقة عالية الجودة تعزز كفاءة الأعمال وتدعم الاستدامة لعملائنا." },
  { id: "2", title: "رؤيتنا", description: "أن نكون الشريك الأول في حلول الطاقة والخدمات المتكاملة في المملكة، بما يتوافق مع رؤية 2030." },
  { id: "3", title: "قصتنا", description: "Petrohub — منظومة متكاملة للطاقة والخدمات اللوجستية تخدم القطاعات السكنية والتجارية والصناعية بالجودة والابتكار." },
  ];

export const defaultRegions: RegionItem[] = [
  { id: "1", name: "الرياض", nameEn: "Riyadh" },
  { id: "2", name: "مكة المكرمة", nameEn: "Makkah" },
  { id: "3", name: "المدينة المنورة", nameEn: "Madinah" },
  { id: "4", name: "ينبع", nameEn: "Yanbu" },
  { id: "5", name: "تبوك", nameEn: "Tabuk" },
  ];

export const defaultNetworkCards: NetworkCard[] = [
  { id: "1", iconName: "Store", title: "الموردون", titleEn: "Suppliers" },
  { id: "2", iconName: "Truck", title: "شركات اللوجستيات والسائقون", titleEn: "Logistics Companies & Drivers" },
  { id: "3", iconName: "Building2", title: "الشركات والمؤسسات", titleEn: "Companies & Institutions" },
  ];

export const defaultCredentials: CredentialItem[] = [
  { id: "1", iconName: "ShieldCheck", title: "الجودة والسلامة", titleEn: "Quality & Safety", description: "التزام كامل بأعلى معايير الجودة والسلامة المحلية والدولية في كل خدماتنا.", descriptionEn: "Full commitment to the highest local and international quality and safety standards across all our services." },
  { id: "2", iconName: "FileCheck2", title: "تقنيات حديثة", titleEn: "Modern Technologies", description: "حلول رقمية ومنصة PetroHub IoT لمراقبة الاستهلاك واتخاذ قرارات دقيقة.", descriptionEn: "Digital solutions and the PetroHub IoT platform to monitor consumption and make accurate decisions." },
  { id: "3", iconName: "Award", title: "حلول مستدامة", titleEn: "Sustainable Solutions", description: "حلول طاقة تخفض الانبعاثات وتدعم مستهدفات رؤية المملكة 2030.", descriptionEn: "Energy solutions that reduce emissions and support Saudi Vision 2030 targets." },
  { id: "4", iconName: "Headset", title: "دعم على مدار الساعة", titleEn: "24/7 Support", description: "فريق متاح 24/7 للطلبات الطارئة والاستفسارات في أي وقت.", descriptionEn: "A team available 24/7 for urgent requests and enquiries at any time." },
  ];

export const defaultFaqs: FaqItem[] = [
  { id: "1", question: "ما الخدمات التي تقدمها Petrohub؟", questionEn: "What services does Petrohub offer?", answer: "نقدم سبع خدمات متكاملة: توريد غاز البترول المسال (LPG)، المنتجات البترولية، خدمات المياه والبيئة، حلول الطاقة، منصة PetroHub IoT، الخدمات اللوجستية، وأنظمة تتبع ومراقبة المركبات.", answerEn: "We offer seven integrated services: LPG supply, petroleum products, water and environmental services, energy solutions, the PetroHub IoT platform, logistics services, and vehicle tracking and monitoring systems." },
  { id: "2", question: "ما المناطق التي تغطيها خدماتكم؟", questionEn: "Which regions do your services cover?", answer: "نغطي شبكة تشغيل واسعة تشمل الرياض، مكة المكرمة، المدينة المنورة، ينبع، وتبوك، مع إمكانية التنسيق لمناطق أخرى حسب الطلب.", answerEn: "We cover a wide operating network including Riyadh, Makkah, Madinah, Yanbu and Tabuk, with the option to coordinate other regions on request." },
  { id: "3", question: "كيف تضمنون معايير السلامة والجودة؟", questionEn: "How do you ensure safety and quality standards?", answer: "نلتزم بأعلى معايير السلامة المحلية والدولية في جميع مراحل النقل والتسليم، باستخدام أسطول حديث مجهز بأحدث أنظمة الأمان وفرق متخصصة مدربة.", answerEn: "We adhere to the highest local and international safety standards throughout transport and delivery, using a modern fleet equipped with the latest safety systems and trained specialist teams." },
  { id: "4", question: "ما هي منصة PetroHub IoT؟", questionEn: "What is the PetroHub IoT platform?", answer: "منصة رقمية ذكية لمراقبة استهلاك الطاقة والمعدات في الوقت الفعلي، تساعد على خفض الاستهلاك حتى 30% وتقليل الأعطال عبر الصيانة الوقائية والتنبيهات الذكية.", answerEn: "A smart digital platform for monitoring energy and equipment consumption in real time, helping cut consumption by up to 30% and reduce breakdowns through preventive maintenance and smart alerts." },
  { id: "5", question: "كيف أحصل على عرض سعر؟", questionEn: "How do I get a quote?", answer: "يمكنك طلب عرض سعر مخصص عبر صفحة اطلب عرض سعر، وسيتواصل معك فريقنا خلال 24 ساعة بعرض مصمم وفق احتياجاتك.", answerEn: "You can request a tailored quote through the Get a Quote page, and our team will contact you within 24 hours with an offer designed around your needs." },
  ];


export const defaultServiceDetails: ServiceDetailItem[] = [
  {
        id: "1",
        slug: "lpg",
        iconName: "Flame",
        title: "توريد غاز البترول المسال (LPG)",
        titleEn: "LPG Supply",
        intro: "توفر Petrohub حلولاً متكاملة لتوريد وتوزيع غاز البترول المسال (LPG) وفق أعلى معايير السلامة والجودة، لتلبية احتياجات القطاعات السكنية والتجارية والصناعية. وتعتمد خدماتنا على شبكة توزيع فعّالة وأساطيل نقل مجهزة وفريق متخصص يضمن استمرارية الإمداد وسرعة الاستجابة في جميع أنحاء المملكة.",
        introEn: "Petrohub provides integrated solutions for supplying and distributing LPG to the highest safety and quality standards, meeting the needs of residential, commercial and industrial sectors. Our services rely on an effective distribution network, equipped transport fleets and a specialist team that ensures supply continuity and fast response across the Kingdom.",
        advantages: ["إمدادات مستمرة على مدار الساعة.", "التزام كامل بمعايير السلامة المحلية والدولية.", "أسطول نقل حديث ومجهز بأحدث أنظمة الأمان.", "سرعة في التوريد والاستجابة لطلبات العملاء.", "جودة مضمونة في جميع مراحل النقل والتسليم."],
        advantagesEn: ["Round-the-clock continuous supply.", "Full compliance with local and international safety standards.", "A modern transport fleet equipped with the latest safety systems.", "Fast supply and response to client requests.", "Guaranteed quality throughout transport and delivery."],
        value: ["استمرارية الأعمال دون انقطاع.", "تقليل المخاطر التشغيلية.", "تعزيز كفاءة التشغيل.", "خدمة موثوقة تدعم احتياجات العملاء على المدى الطويل."],
        valueEn: ["Uninterrupted business continuity.", "Reduced operational risk.", "Enhanced operational efficiency.", "A reliable service supporting client needs long term."],
  },
  {
        id: "2",
        slug: "oil",
        iconName: "Fuel",
        title: "المنتجات البترولية (Oil Services)",
        titleEn: "Petroleum Products (Oil Services)",
        intro: "توفر Petrohub حلولاً متكاملة لتوريد المنتجات البترولية لمختلف القطاعات، مع الالتزام بأعلى معايير الجودة والاستدامة. ونوفر سلسلة إمداد مرنة تضمن وصول المنتجات بالكميات المطلوبة وفي الوقت المحدد، بما يدعم استمرارية العمليات التشغيلية ويعزز كفاءة الأداء.",
        introEn: "Petrohub provides integrated solutions for supplying petroleum products across sectors, committed to the highest quality and sustainability standards. We offer a flexible supply chain that ensures products arrive in the required quantities and on time, supporting operational continuity and boosting performance efficiency.",
        advantages: ["منتجات مطابقة للمواصفات القياسية.", "حلول توريد مرنة تناسب مختلف المشاريع.", "أسطول نقل حديث وآمن.", "ضمان الجودة والكمية.", "التزام بالاشتراطات البيئية والتنظيمية."],
        advantagesEn: ["Products compliant with standard specifications.", "Flexible supply solutions suited to different projects.", "A modern, safe transport fleet.", "Quality and quantity assurance.", "Compliance with environmental and regulatory requirements."],
        value: ["رفع كفاءة تشغيل المعدات.", "تقليل الأعطال والتوقفات.", "تعزيز الإنتاجية.", "توفير حلول موثوقة ومستدامة."],
        valueEn: ["Improved equipment operating efficiency.", "Fewer breakdowns and stoppages.", "Increased productivity.", "Reliable and sustainable solutions."],
  },
  {
        id: "3",
        slug: "water",
        iconName: "Droplets",
        title: "خدمات المياه والبيئة",
        titleEn: "Water & Environmental Services",
        intro: "تقدم Petrohub حلولاً متكاملة في قطاع المياه والخدمات البيئية، تشمل توريد المياه الصالحة للشرب والمياه الصناعية، بالإضافة إلى خدمات الصرف الصحي والحلول البيئية، بما يضمن استدامة الخدمات والمحافظة على الصحة العامة والبيئة.",
        introEn: "Petrohub offers integrated solutions in the water and environmental services sector, including potable and industrial water supply as well as sewage services and environmental solutions, ensuring service sustainability and protecting public health and the environment.",
        advantages: ["توفير المياه بجميع الكميات المطلوبة.", "خدمات بيئية متخصصة.", "استجابة سريعة للحالات الطارئة.", "الالتزام بالمعايير الصحية والبيئية.", "تغطية تشغيلية واسعة."],
        advantagesEn: ["Water supplied in all required quantities.", "Specialised environmental services.", "Rapid response to emergencies.", "Compliance with health and environmental standards.", "Wide operational coverage."],
        value: ["ضمان استمرارية الإمدادات.", "تحسين كفاءة الخدمات البيئية.", "تقليل المخاطر التشغيلية.", "حلول متكاملة من مصدر واحد."],
        valueEn: ["Guaranteed supply continuity.", "Improved efficiency of environmental services.", "Reduced operational risk.", "Integrated solutions from a single source."],
  },
  {
        id: "4",
        slug: "energy",
        iconName: "Zap",
        title: "حلول الطاقة (Energy Solutions)",
        titleEn: "Energy Solutions",
        intro: "نساعد عملاءنا على بناء مستقبل أكثر استدامة من خلال تقديم حلول متقدمة في قطاع الطاقة، تسهم في رفع كفاءة استهلاك الطاقة، وخفض الانبعاثات الكربونية، وتعزيز الاعتماد على التقنيات الحديثة، بما يتوافق مع مستهدفات رؤية المملكة 2030.",
        introEn: "We help our clients build a more sustainable future through advanced energy-sector solutions that raise energy efficiency, cut carbon emissions and increase reliance on modern technologies, in line with Saudi Vision 2030 targets.",
        advantages: ["حلول مستدامة وصديقة للبيئة.", "تحسين كفاءة استهلاك الطاقة.", "تقليل الانبعاثات الكربونية.", "حلول مصممة وفق احتياجات كل مشروع.", "الالتزام بأعلى معايير الجودة والاستدامة."],
        advantagesEn: ["Sustainable, environmentally friendly solutions.", "Improved energy consumption efficiency.", "Reduced carbon emissions.", "Solutions designed around each project's needs.", "Commitment to the highest quality and sustainability standards."],
        value: ["خفض التكاليف التشغيلية.", "تحسين الأداء.", "تعزيز الاستدامة البيئية.", "تحقيق أعلى عائد على الاستثمار."],
        valueEn: ["Lower operating costs.", "Improved performance.", "Greater environmental sustainability.", "Maximum return on investment."],
  },
  {
        id: "5",
        slug: "iot",
        iconName: "Cpu",
        title: "منصة PetroHub IoT",
        titleEn: "PetroHub IoT Platform",
        intro: "PetroHub IoT منصة رقمية ذكية لإدارة ومراقبة استهلاك الطاقة والمعدات في الوقت الفعلي، تعتمد على تقنيات إنترنت الأشياء والذكاء التحليلي، مما يساعد المنشآت على تحسين كفاءة التشغيل، وتقليل استهلاك الطاقة، واتخاذ قرارات مبنية على بيانات دقيقة.",
        introEn: "PetroHub IoT is a smart digital platform for managing and monitoring energy and equipment consumption in real time, built on IoT and analytics technologies to help facilities improve operational efficiency, reduce energy consumption and make decisions based on accurate data.",
        advantages: ["مراقبة مباشرة للأصول والمعدات.", "تنبيهات ذكية عند حدوث أي خلل.", "تقارير وتحليلات تفصيلية.", "صيانة وقائية تعتمد على البيانات.", "تحكم ذكي وأتمتة للعمليات."],
        advantagesEn: ["Live monitoring of assets and equipment.", "Smart alerts when any fault occurs.", "Detailed reports and analytics.", "Data-driven preventive maintenance.", "Smart control and process automation."],
        value: ["خفض استهلاك الطاقة بنسبة تصل إلى 30%.", "تقليل الأعطال غير المخطط لها.", "رفع الإنتاجية.", "تحسين جودة اتخاذ القرار."],
        valueEn: ["Energy consumption cut by up to 30%.", "Fewer unplanned breakdowns.", "Higher productivity.", "Better decision-making quality."],
  },
  {
        id: "6",
        slug: "logistics",
        iconName: "Truck",
        title: "الخدمات اللوجستية",
        titleEn: "Logistics Services",
        intro: "توفر Petrohub حلولاً لوجستية متكاملة تشمل نقل وتوزيع البضائع والمواد بكفاءة عالية عبر شبكة تشغيل تغطي مختلف مناطق المملكة، مع الالتزام بالمواعيد، وسلامة الشحنات، واستخدام أحدث تقنيات التتبع والإدارة.",
        introEn: "Petrohub provides integrated logistics solutions covering the efficient transport and distribution of goods and materials across an operating network spanning the Kingdom's regions, with commitment to schedules, shipment safety and the latest tracking and management technologies.",
        advantages: ["شبكة نقل تغطي جميع أنحاء المملكة.", "إدارة احترافية لسلسلة الإمداد.", "تتبع مباشر للشحنات.", "سرعة في التنفيذ والتسليم.", "أعلى معايير السلامة أثناء النقل."],
        advantagesEn: ["A transport network covering the whole Kingdom.", "Professional supply-chain management.", "Live shipment tracking.", "Fast execution and delivery.", "The highest safety standards during transport."],
        value: ["تقليل زمن التسليم.", "تحسين كفاءة سلسلة التوريد.", "تقليل الخسائر والأضرار.", "تعزيز موثوقية العمليات اللوجستية."],
        valueEn: ["Reduced delivery time.", "Improved supply-chain efficiency.", "Fewer losses and damages.", "Greater reliability of logistics operations."],
  },
  {
        id: "7",
        slug: "tracking",
        iconName: "MonitorCheck",
        title: "أنظمة التتبع ومراقبة المركبات",
        titleEn: "Vehicle Tracking & Monitoring",
        intro: "توفر Petrohub حلولاً ذكية لإدارة الأساطيل تعتمد على تقنيات GPS وGSM وكاميرات Dash Cam، بما يتيح مراقبة المركبات والمعدات لحظياً، وتحليل الأداء، وتحسين كفاءة التشغيل، وتعزيز مستويات السلامة.",
        introEn: "Petrohub provides smart fleet management solutions based on GPS, GSM and dash cam technologies, enabling real-time monitoring of vehicles and equipment, performance analysis, improved operational efficiency and higher safety levels.",
        advantages: ["تتبع مباشر ودقيق للمركبات.", "مراقبة أداء السائقين.", "تحليل المسارات واستهلاك الوقود.", "تنبيهات فورية للحوادث والانحرافات.", "تقارير تشغيلية وإدارية متقدمة.", "متابعة حالة المركبات والصيانة."],
        advantagesEn: ["Live, accurate vehicle tracking.", "Driver performance monitoring.", "Route and fuel consumption analysis.", "Instant alerts for incidents and deviations.", "Advanced operational and management reports.", "Vehicle status and maintenance tracking."],
        value: ["حماية الأصول والمركبات.", "تقليل استهلاك الوقود.", "رفع كفاءة إدارة الأساطيل.", "تحسين مستويات السلامة.", "دعم اتخاذ القرارات التشغيلية."],
        valueEn: ["Protection of assets and vehicles.", "Reduced fuel consumption.", "More efficient fleet management.", "Improved safety levels.", "Support for operational decision-making."],
  },
  {
        id: "8",
        slug: "energy-logistics",
        iconName: "Fuel",
        image: "/images/services/energy-logistics.jpg",
        title: "إمدادات الطاقة والإدارة اللوجستية",
        titleEn: "Power Supply and Logistics Administration",
        intro: "تغطي Petrohub نطاقًا متنوعًا من احتياجات الطاقة والمياه، وتنسّق تنفيذها بما يراعي طبيعة الموقع، وحجم الطلب، ومتطلبات السلامة، وأولوية الاستمرارية. يمتد دورنا من تحديد الاحتياج حتى تنظيم الحركة والتسليم وإغلاق الطلب بصورة واضحة — تنفيذ منظم لا ينتهي عند توفير المنتج.",
        introEn: "Petrohub addresses a wide array of energy and water requirements, orchestrating their implementation based on site characteristics, demand volume, safety standards, and continuity priorities. Our responsibilities encompass identifying needs, coordinating logistics, facilitating delivery, and ensuring transparent order fulfillment - structured execution that extends beyond product delivery.",
        advantages: ["غاز البترول المسال (LPG).", "المنتجات البترولية.", "الوقود الصناعي.", "البتروكيماويات.", "حلول المياه.", "الطاقة الاحتياطية."],
        advantagesEn: ["Liquefied petroleum gas (LPG)", "Petroleum derivatives", "Industrial fuel", "Petrochemicals", "Aqueous solutions", "Auxiliary power"],
        value: ["إدارة عمليات النقل والتوزيع.", "التخطيط والجدولة والتنسيق.", "توفير وتأجير وسائل نقل مخصصة للمشاريع بحسب المتطلبات.", "متابعة حركة الشحنات وحالة الطلب.", "إدارة التسليم والتوثيق.", "دعم سلسلة الإمداد وربط الأطراف."],
        valueEn: ["Transportation and distribution operations management", "Strategic planning, scheduling, and coordination", "Offering and leasing transportation vehicles specifically tailored for projects based on requirements", "Monitor shipment progress and order status", "Delivery and documentation oversight", "Supply chain assistance and stakeholder connectivity"],
  },
  {
        id: "9",
        slug: "monitor",
        iconName: "MonitorCheck",
        image: "/images/services/petrohob-monitor.jpg",
        title: "Petrohub Monitor",
        titleEn: "Petrohub Monitor",
        intro: "منتج تقني يبني رؤية موحدة للأصول والاستهلاك — راقب، قِس، واربط بياناتك في شاشة واحدة. يربط Petrohub Monitor مصادر البيانات والأجهزة والأنظمة التشغيلية ضمن واجهة موحدة، ليمنح المنشأة صورة لحظية عن مواد الطاقة والمياه والمركبات والأصول، ويُصمَّم نطاق النظام وفق احتياج كل منشأة.",
        introEn: "A technological solution that creates a comprehensive perspective on assets and consumption - monitor, assess, and connect your data on a unified display. Petrohub Monitor is a comprehensive monitoring and measurement system, tailored and configured to align with the client's environment. It integrates data sources and operational devices within a cohesive interface, offering the facility a real-time overview of energy, water, vehicles, and assets, thereby improving its capacity to monitor, analyze, and make informed decisions.",
        advantages: ["حساسات مستويات الخزانات والعدادات.", "قراءات التدفق والضغط والحرارة والاستهلاك بحسب طبيعة التطبيق.", "أجهزة تحديد المواقع وحركة المركبات والمسارات.", "متابعة التوقفات وحالة الأصول الميدانية."],
        advantagesEn: ["Sensors for tank levels, as well as meters", "Readings for flow, pressure, temperature, and consumption, tailored to the specific requirements of the application", "Positioning devices, vehicular movement, routes and stops", "The status of field assets"],
        value: ["كاميرات ثابتة وكاميرات مركبات (Dash Cam) لسياق بصري يدعم المتابعة والسلامة.", "تنبيهات فورية عند تجاوز الحدود.", "لوحات مؤشرات وسجلات وتقارير تدعم التحليل والتخطيط."],
        valueEn: ["Fixed cameras and vehicle-mounted cameras (Dash Cams) offer visual context that enhances monitoring and safety", "Immediate notifications upon limit exceedance", "Dashboards, logs, and reports that facilitate analysis and strategic planning"],
  },
  ];

// ── About the company (البطاقة التعريفية عن الشركة) ──────────────────────────

export const defaultAboutCompany: AboutCompanyContent = {
  photo: "/images/hero/petrohub-hq.jpg",
  titleTop: "عن",
  titleBottom: "بتروهب",
  eyebrow: "خبرة ميدانية، تنفيذ منضبط، ومعلومة يمكن الاعتماد عليها",
  headline: "نحو إدارة أكثر وعيًا بكل وحدة طاقة",
  paragraph:
    "Petrohub شركة تتخذ من الرياض مقرًا رئيسيًا، وتمتد خبرتها منذ عام 2004. تعمل داخل المملكة العربية السعودية وخارجها، وتخدم المنشآت والمشروعات عبر مزيج متكامل من إمدادات الطاقة والمياه، والإدارة اللوجستية والتشغيلية، وأنظمة المراقبة والتحكم الذكي. لا ننظر إلى الطلب كعملية منفصلة، بل كدورة تبدأ بفهم الاحتياج، وتمر بالتخطيط والتنفيذ والتحقق، وتنتهي بصورة أوضح تساعد العميل على اتخاذ قرار أفضل.",
  since: "منذ عام 2004",
  visionLabel: "رؤيتنا",
  visionText:
    "أن نكون من أبرز الشركات في تطوير نماذج متقدمة لإدارة الطاقة، ورفع معايير الوضوح والانضباط والكفاءة في القطاع.",
  missionLabel: "رسالتنا",
  missionText:
    "تمكين المنشآت من إدارة احتياجاتها بثقة، عبر تنفيذ ميداني منظم، ومتابعة فعالة، وأنظمة تمنحها بيانات أدق وتحكمًا أكبر.",
  titleTopEn: "About",
  titleBottomEn: "Petrohub",
  eyebrowEn: "Practical experience, methodical implementation, and trustworthy data",
  headlineEn: "Towards a more mindful management of each unit of energy",
  paragraphEn:
    "Petrohub is a Riyadh-based enterprise with a legacy that extends back to 2004. Operating both domestically and internationally, it supports facilities and projects through a comprehensive blend of energy and water supply, logistics and operational management, as well as advanced monitoring and control systems. We regard energy as a strategic component that significantly influences business continuity and performance quality. Consequently, we do not perceive demand as an isolated purchasing process; rather, we view it as a cycle that commences with identifying the need, advances through planning, implementation, and verification, and culminates in a clearer understanding that enables the client to make informed decisions.",
  sinceEn: "Since 2004",
  visionLabelEn: "Our Vision",
  visionTextEn:
    "To rank among the foremost companies in the development of advanced energy management models, and to elevate the standards of clarity, discipline and efficiency within the sector.",
  missionLabelEn: "Our Mission",
  missionTextEn:
    "Empowering organizations to adeptly manage their requirements through structured on-site execution, effective follow-up, and systems that deliver more precise data and greater control.",
};
