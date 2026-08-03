export const RESOURCES = [
  { key: "slides", label: "شرائح الرئيسية" },
  { key: "services", label: "الخدمات" },
  { key: "serviceDetails", label: "تفاصيل الخدمات" },
  { key: "projects", label: "المشاريع والأعمال" },
  { key: "news", label: "الأخبار والمقالات" },
  { key: "activities", label: "الأنشطة" },
  { key: "testimonials", label: "آراء العملاء" },
  { key: "stats", label: "الإحصائيات" },
  { key: "mission", label: "المهمة والرؤية" },
  { key: "regions", label: "مناطق التغطية" },
  { key: "network", label: "شبكتنا" },
  { key: "credentials", label: "اعتماداتنا" },
  { key: "faqs", label: "الأسئلة الشائعة" },
  { key: "quotes", label: "طلبات الأسعار" },
  { key: "messages", label: "رسائل التواصل" },
  { key: "users", label: "المستخدمون" },
  { key: "roles", label: "الأدوار والصلاحيات" },
  { key: "settings", label: "الإعدادات" },
  { key: "submissions", label: "طلبات الموافقة (الأعمال والخدمات)" },
  ] as const;

export type ResourceKey = (typeof RESOURCES)[number]["key"];

export type Action = "create" | "read" | "update" | "delete";

export const ACTIONS: { key: Action; label: string }[] = [
  { key: "read", label: "عرض" },
  { key: "create", label: "إضافة" },
  { key: "update", label: "تعديل" },
  { key: "delete", label: "حذف" },
  ];

export type ResourcePermissions = Partial<Record<Action, boolean>>;
export type PermissionsMap = Partial<Record<ResourceKey, ResourcePermissions>>;

export function can(
    permissions: PermissionsMap | null | undefined,
    resource: ResourceKey,
    action: Action
  ): boolean {
    if (!permissions) return false;
    return Boolean(permissions[resource]?.[action]);
}

export function emptyPermissions(): PermissionsMap {
    const map: PermissionsMap = {};
    for (const r of RESOURCES) {
          map[r.key] = { create: false, read: false, update: false, delete: false };
    }
    return map;
}

export function allPermissions(): PermissionsMap {
    const map: PermissionsMap = {};
    for (const r of RESOURCES) {
          map[r.key] = { create: true, read: true, update: true, delete: true };
    }
    return map;
}

// Normalizes an arbitrary object coming from the DB/client into a safe
// PermissionsMap that only contains known resources/actions with boolean values.
export function sanitizePermissions(input: unknown): PermissionsMap {
    const result = emptyPermissions();
    if (!input || typeof input !== "object") return result;
    const obj = input as Record<string, unknown>;
    for (const r of RESOURCES) {
          const val = obj[r.key];
          if (!val || typeof val !== "object") continue;
          const valObj = val as Record<string, unknown>;
          for (const a of ACTIONS) {
                  if (typeof valObj[a.key] === "boolean") {
                            result[r.key]![a.key] = valObj[a.key] as boolean;
                  }
          }
    }
    return result;
}

export function countEnabled(permissions: PermissionsMap | null | undefined): number {
    if (!permissions) return 0;
    let count = 0;
    for (const r of RESOURCES) {
          const p = permissions[r.key];
          if (!p) continue;
          for (const a of ACTIONS) {
                  if (p[a.key]) count++;
          }
    }
    return count;
}
