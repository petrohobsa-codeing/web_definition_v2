/**
 * ========================================================
 *   إعدادات الصور — PetroHop
 * ========================================================
 *
 * ضع صورك في المجلدات المناسبة داخل /public/images/
 * ثم غيّر قيمة null إلى مسار الصورة لتفعيلها.
 *
 * مثال: logo: "/images/logo.png"
 * ========================================================
 */

export const siteImages = {

  /** شعار الشركة — يظهر في الهيدر والفوتر
   *  ضع الملف في: public/images/logo.png
   *  (يُفضّل PNG شفاف 200×60px) */
  logo: null as string | null,

  hero: {
    /** خلفية قسم الهيرو (تظهر خلف المحتوى مع طبقة شفافة خضراء)
     *  ضع الملف في: public/images/hero/bg.jpg (1920×1080px) */
    background: null as string | null,

    /** الصورة الجانبية في الهيرو (شاحنة وقود، مبنى المنشأة، إلخ)
     *  ضع الملف في: public/images/hero/truck.jpg (800×600px) */
    side: "/images/hero/truck.svg" as string | null,
  },

  about: {
    /** الصورة الرئيسية في صفحة "من نحن" (فريق أو منشأة)
     *  ضع الملف في: public/images/about/main.jpg (800×600px) */
    main: null as string | null,

    /** صورة ثانوية في "من نحن" (اختياري)
     *  ضع الملف في: public/images/about/secondary.jpg */
    secondary: null as string | null,
  },

  services: {
    /** صور بطاقات الخدمات — ضعها في public/images/services/ */
    diesel:     "/images/services/diesel.svg" as string | null,
    gas:        "/images/services/gas.svg" as string | null,
    sensors:    "/images/services/sensors.svg" as string | null,
    monitoring: "/images/services/monitoring.svg" as string | null,
  },

  /** صورة قسم "لماذا PetroHop"
   *  ضع الملف في: public/images/why-us.jpg */
  whyUs: null as string | null,

  /** شعارات العملاء — تظهر في شريط الثقة أسفل الهيرو
   *  مثال: ["/images/clients/client1.png", "/images/clients/client2.png"]
   *  ضعها في: public/images/clients/ */
  clients: [] as string[],

  /** صور أشخاص آراء العملاء (اختياري — يظهر مكانها أول حرف من الاسم)
   *  ترتيبها يجب أن يطابق ترتيب آراء العملاء
   *  مثال: ["/images/testimonials/person1.jpg", null, "/images/testimonials/person3.jpg"]
   *  ضعها في: public/images/testimonials/ */
  testimonials: [] as (string | null)[],
};
