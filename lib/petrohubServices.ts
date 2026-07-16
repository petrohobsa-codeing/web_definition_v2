// Central Petrohub services dataset (bilingual). Single source of truth
// used by the home Speciality section and the Services page.

export type IconKey =
  | "lpg"
  | "oil"
  | "water"
  | "energy"
  | "iot"
  | "logistics"
  | "tracking";

export interface ServiceContent {
  slug: string;
  icon: IconKey;
  ar: { title: string; intro: string; advantages: string[]; value: string[] };
  en: { title: string; intro: string; advantages: string[]; value: string[] };
}

export const services: ServiceContent[] = [
  {
    slug: "lpg",
    icon: "lpg",
    ar: {
      title: "توريد غاز البترول المسال (LPG)",
      intro:
        "توفر Petrohub حلولاً متكاملة لتوريد وتوزيع غاز البترول المسال (LPG) وفق أعلى معايير السلامة والجودة، لتلبية احتياجات القطاعات السكنية والتجارية والصناعية. وتعتمد خدماتنا على شبكة توزيع فعّالة وأساطيل نقل مجهزة وفريق متخصص يضمن استمرارية الإمداد وسرعة الاستجابة في جميع أنحاء المملكة.",
      advantages: [
        "إمدادات مستمرة على مدار الساعة.",
        "التزام كامل بمعايير السلامة المحلية والدولية.",
        "أسطول نقل حديث ومجهز بأحدث أنظمة الأمان.",
        "سرعة في التوريد والاستجابة لطلبات العملاء.",
        "جودة مضمونة في جميع مراحل النقل والتسليم.",
      ],
      value: [
        "استمرارية الأعمال دون انقطاع.",
        "تقليل المخاطر التشغيلية.",
        "تعزيز كفاءة التشغيل.",
        "خدمة موثوقة تدعم احتياجات العملاء على المدى الطويل.",
      ],
    },
    en: {
      title: "Liquefied Petroleum Gas (LPG) Supply",
      intro:
        "Petrohub provides integrated solutions for supplying and distributing LPG to the highest safety and quality standards, serving residential, commercial and industrial sectors. Our services rely on an effective distribution network, equipped transport fleets and a specialized team ensuring continuous supply and fast response across the Kingdom.",
      advantages: [
        "Round-the-clock continuous supply.",
        "Full compliance with local and international safety standards.",
        "Modern fleet equipped with the latest safety systems.",
        "Fast supply and response to customer requests.",
        "Guaranteed quality across every transport and delivery stage.",
      ],
      value: [
        "Uninterrupted business continuity.",
        "Reduced operational risks.",
        "Enhanced operational efficiency.",
        "A reliable service supporting customers' long-term needs.",
      ],
    },
  },
  {
    slug: "oil",
    icon: "oil",
    ar: {
      title: "المنتجات البترولية (Oil Services)",
      intro:
        "توفر Petrohub حلولاً متكاملة لتوريد المنتجات البترولية لمختلف القطاعات، مع الالتزام بأعلى معايير الجودة والاستدامة. ونوفر سلسلة إمداد مرنة تضمن وصول المنتجات بالكميات المطلوبة وفي الوقت المحدد، بما يدعم استمرارية العمليات التشغيلية ويعزز كفاءة الأداء.",
      advantages: [
        "منتجات مطابقة للمواصفات القياسية.",
        "حلول توريد مرنة تناسب مختلف المشاريع.",
        "أسطول نقل حديث وآمن.",
        "ضمان الجودة والكمية.",
        "التزام بالاشتراطات البيئية والتنظيمية.",
      ],
      value: [
        "رفع كفاءة تشغيل المعدات.",
        "تقليل الأعطال والتوقفات.",
        "تعزيز الإنتاجية.",
        "توفير حلول موثوقة ومستدامة.",
      ],
    },
    en: {
      title: "Petroleum Products (Oil Services)",
      intro:
        "Petrohub provides integrated solutions for supplying petroleum products to various sectors with a commitment to the highest quality and sustainability standards. We offer a flexible supply chain ensuring products arrive in the required quantities and on time, supporting operational continuity and performance efficiency.",
      advantages: [
        "Products compliant with standard specifications.",
        "Flexible supply solutions suited to different projects.",
        "Modern and safe transport fleet.",
        "Quality and quantity assurance.",
        "Compliance with environmental and regulatory requirements.",
      ],
      value: [
        "Improved equipment operating efficiency.",
        "Fewer breakdowns and stoppages.",
        "Enhanced productivity.",
        "Reliable and sustainable solutions.",
      ],
    },
  },
  {
    slug: "water",
    icon: "water",
    ar: {
      title: "خدمات المياه والبيئة",
      intro:
        "تقدم Petrohub حلولاً متكاملة في قطاع المياه والخدمات البيئية، تشمل توريد المياه الصالحة للشرب والمياه الصناعية، بالإضافة إلى خدمات الصرف الصحي والحلول البيئية، بما يضمن استدامة الخدمات والمحافظة على الصحة العامة والبيئة.",
      advantages: [
        "توفير المياه بجميع الكميات المطلوبة.",
        "خدمات بيئية متخصصة.",
        "استجابة سريعة للحالات الطارئة.",
        "الالتزام بالمعايير الصحية والبيئية.",
        "تغطية تشغيلية واسعة.",
      ],
      value: [
        "ضمان استمرارية الإمدادات.",
        "تحسين كفاءة الخدمات البيئية.",
        "تقليل المخاطر التشغيلية.",
        "حلول متكاملة من مصدر واحد.",
      ],
    },
    en: {
      title: "Water & Environmental Services",
      intro:
        "Petrohub offers integrated solutions in the water and environmental sector, including the supply of potable and industrial water alongside sewage services and environmental solutions — ensuring service sustainability and protecting public health and the environment.",
      advantages: [
        "Water supply in all required quantities.",
        "Specialized environmental services.",
        "Fast response to emergencies.",
        "Compliance with health and environmental standards.",
        "Wide operational coverage.",
      ],
      value: [
        "Guaranteed supply continuity.",
        "Improved efficiency of environmental services.",
        "Reduced operational risks.",
        "Integrated solutions from a single source.",
      ],
    },
  },
  {
    slug: "energy",
    icon: "energy",
    ar: {
      title: "حلول الطاقة (Energy Solutions)",
      intro:
        "نساعد عملاءنا على بناء مستقبل أكثر استدامة من خلال تقديم حلول متقدمة في قطاع الطاقة، تسهم في رفع كفاءة استهلاك الطاقة، وخفض الانبعاثات الكربونية، وتعزيز الاعتماد على التقنيات الحديثة، بما يتوافق مع مستهدفات رؤية المملكة 2030.",
      advantages: [
        "حلول مستدامة وصديقة للبيئة.",
        "تحسين كفاءة استهلاك الطاقة.",
        "تقليل الانبعاثات الكربونية.",
        "حلول مصممة وفق احتياجات كل مشروع.",
        "الالتزام بأعلى معايير الجودة والاستدامة.",
      ],
      value: [
        "خفض التكاليف التشغيلية.",
        "تحسين الأداء.",
        "تعزيز الاستدامة البيئية.",
        "تحقيق أعلى عائد على الاستثمار.",
      ],
    },
    en: {
      title: "Energy Solutions",
      intro:
        "We help our clients build a more sustainable future by delivering advanced energy solutions that improve energy efficiency, reduce carbon emissions and increase reliance on modern technologies — aligned with the goals of Saudi Vision 2030.",
      advantages: [
        "Sustainable, eco-friendly solutions.",
        "Improved energy-consumption efficiency.",
        "Reduced carbon emissions.",
        "Solutions designed for each project's needs.",
        "Commitment to the highest quality and sustainability standards.",
      ],
      value: [
        "Lower operating costs.",
        "Improved performance.",
        "Enhanced environmental sustainability.",
        "Maximum return on investment.",
      ],
    },
  },
  {
    slug: "iot",
    icon: "iot",
    ar: {
      title: "منصة PetroHub IoT",
      intro:
        "PetroHub IoT منصة رقمية ذكية لإدارة ومراقبة استهلاك الطاقة والمعدات في الوقت الفعلي، تعتمد على تقنيات إنترنت الأشياء والذكاء التحليلي، مما يساعد المنشآت على تحسين كفاءة التشغيل، وتقليل استهلاك الطاقة، واتخاذ قرارات مبنية على بيانات دقيقة.",
      advantages: [
        "مراقبة مباشرة للأصول والمعدات.",
        "تنبيهات ذكية عند حدوث أي خلل.",
        "تقارير وتحليلات تفصيلية.",
        "صيانة وقائية تعتمد على البيانات.",
        "تحكم ذكي وأتمتة للعمليات.",
      ],
      value: [
        "خفض استهلاك الطاقة بنسبة تصل إلى 30%.",
        "تقليل الأعطال غير المخطط لها.",
        "رفع الإنتاجية.",
        "تحسين جودة اتخاذ القرار.",
      ],
    },
    en: {
      title: "PetroHub IoT Platform",
      intro:
        "PetroHub IoT is a smart digital platform for managing and monitoring energy and equipment consumption in real time, powered by IoT technologies and analytical intelligence — helping facilities improve operational efficiency, reduce energy use and make data-driven decisions.",
      advantages: [
        "Real-time monitoring of assets and equipment.",
        "Smart alerts on any malfunction.",
        "Detailed reports and analytics.",
        "Data-driven preventive maintenance.",
        "Smart control and process automation.",
      ],
      value: [
        "Up to 30% reduction in energy consumption.",
        "Fewer unplanned breakdowns.",
        "Higher productivity.",
        "Better decision-making quality.",
      ],
    },
  },
  {
    slug: "logistics",
    icon: "logistics",
    ar: {
      title: "الخدمات اللوجستية",
      intro:
        "توفر Petrohub حلولاً لوجستية متكاملة تشمل نقل وتوزيع البضائع والمواد بكفاءة عالية عبر شبكة تشغيل تغطي مختلف مناطق المملكة، مع الالتزام بالمواعيد، وسلامة الشحنات، واستخدام أحدث تقنيات التتبع والإدارة.",
      advantages: [
        "شبكة نقل تغطي جميع أنحاء المملكة.",
        "إدارة احترافية لسلسلة الإمداد.",
        "تتبع مباشر للشحنات.",
        "سرعة في التنفيذ والتسليم.",
        "أعلى معايير السلامة أثناء النقل.",
      ],
      value: [
        "تقليل زمن التسليم.",
        "تحسين كفاءة سلسلة التوريد.",
        "تقليل الخسائر والأضرار.",
        "تعزيز موثوقية العمليات اللوجستية.",
      ],
    },
    en: {
      title: "Logistics Services",
      intro:
        "Petrohub provides integrated logistics solutions covering the transport and distribution of goods and materials with high efficiency across an operational network spanning the Kingdom's regions — committed to schedules, shipment safety and the latest tracking and management technologies.",
      advantages: [
        "Transport network covering the whole Kingdom.",
        "Professional supply-chain management.",
        "Real-time shipment tracking.",
        "Fast execution and delivery.",
        "Highest safety standards during transport.",
      ],
      value: [
        "Reduced delivery time.",
        "Improved supply-chain efficiency.",
        "Fewer losses and damages.",
        "Enhanced reliability of logistics operations.",
      ],
    },
  },
  {
    slug: "tracking",
    icon: "tracking",
    ar: {
      title: "أنظمة التتبع ومراقبة المركبات",
      intro:
        "توفر Petrohub حلولاً ذكية لإدارة الأساطيل تعتمد على تقنيات GPS وGSM وكاميرات Dash Cam، بما يتيح مراقبة المركبات والمعدات لحظياً، وتحليل الأداء، وتحسين كفاءة التشغيل، وتعزيز مستويات السلامة.",
      advantages: [
        "تتبع مباشر ودقيق للمركبات.",
        "مراقبة أداء السائقين.",
        "تحليل المسارات واستهلاك الوقود.",
        "تنبيهات فورية للحوادث والانحرافات.",
        "تقارير تشغيلية وإدارية متقدمة.",
        "متابعة حالة المركبات والصيانة.",
      ],
      value: [
        "حماية الأصول والمركبات.",
        "تقليل استهلاك الوقود.",
        "رفع كفاءة إدارة الأساطيل.",
        "تحسين مستويات السلامة.",
        "دعم اتخاذ القرارات التشغيلية.",
      ],
    },
    en: {
      title: "Vehicle Tracking & Fleet Monitoring",
      intro:
        "Petrohub offers smart fleet-management solutions powered by GPS, GSM and dash-cam technologies, enabling real-time vehicle and equipment monitoring, performance analysis, improved operational efficiency and enhanced safety levels.",
      advantages: [
        "Accurate real-time vehicle tracking.",
        "Driver performance monitoring.",
        "Route and fuel-consumption analysis.",
        "Instant alerts for incidents and deviations.",
        "Advanced operational and management reports.",
        "Vehicle status and maintenance tracking.",
      ],
      value: [
        "Asset and vehicle protection.",
        "Reduced fuel consumption.",
        "Improved fleet-management efficiency.",
        "Enhanced safety levels.",
        "Support for operational decision-making.",
      ],
    },
  },
];

export const intro = {
  ar: {
    title: "خدمات Petrohub",
    subtitle: "حلول متكاملة للطاقة والخدمات اللوجستية",
    body:
      "تقدم Petrohub مجموعة متكاملة من الخدمات والحلول التي تلبي احتياجات القطاعات السكنية والتجارية والصناعية، من خلال منظومة تشغيل متطورة تعتمد على الجودة، والسلامة، والابتكار، بما يضمن تقديم خدمات موثوقة تعزز كفاءة الأعمال وتحقق قيمة مضافة مستدامة لعملائنا.",
  },
  en: {
    title: "Petrohub Services",
    subtitle: "Integrated Energy & Logistics Solutions",
    body:
      "Petrohub offers an integrated range of services and solutions that meet the needs of the residential, commercial and industrial sectors through an advanced operating system built on quality, safety and innovation — ensuring reliable services that boost business efficiency and deliver sustainable added value to our clients.",
  },
};

export const commitment = {
  ar: {
    title: "التزامنا",
    body:
      "لا تقتصر خدمات Petrohub على توفير المنتجات والحلول فحسب، بل تمتد إلى بناء شراكات استراتيجية طويلة الأمد مع عملائنا، من خلال تقديم خدمات موثوقة، وتقنيات حديثة، ودعم فني متخصص، بما يضمن استدامة الأعمال وتحقيق أعلى مستويات الكفاءة والجودة.",
  },
  en: {
    title: "Our Commitment",
    body:
      "Petrohub's services are not limited to providing products and solutions — they extend to building long-term strategic partnerships with our clients through reliable services, modern technologies and specialized technical support, ensuring business sustainability and the highest levels of efficiency and quality.",
  },
};

export const advantagesLabel = { ar: "المزايا", en: "Advantages" };
export const valueLabel = { ar: "القيمة المضافة", en: "Added Value" };
