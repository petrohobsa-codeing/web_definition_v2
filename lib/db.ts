import { supabase } from "./supabaseClient";
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
  ActivityItem,
} from "./types";
import {
  defaultSlides,
  defaultServices,
  defaultTestimonials,
  defaultStats,
  defaultProjects,
  defaultPosts,
} from "./store";

async function adminFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`/api/admin/${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "تعذر تنفيذ العملية");
  }
  return res.json();
}

// ── Slides (banner) ──────────────────────────────────────────────────────────

export async function getSlides(): Promise<HeroSlide[]> {
  const { data } = await supabase.from("slides").select("*").order("sort_order", { ascending: true });
  if (!data || data.length === 0) {
    await setSlides(defaultSlides);
    return defaultSlides;
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({
    id: r.id,
    badge: r.badge || "",
    heading: r.heading || "",
    description: r.description || "",
    image: r.image || undefined,
    cta1Label: r.cta1_label || "",
    cta1Href: r.cta1_href || "",
    cta2Label: r.cta2_label || "",
    cta2Href: r.cta2_href || "",
  }));
}

export async function setSlides(slides: HeroSlide[]): Promise<void> {
  await supabase.from("slides").delete().neq("id", "__none__");
  if (slides.length === 0) return;
  const rows = slides.map((s, i) => ({
    id: s.id,
    badge: s.badge,
    heading: s.heading,
    description: s.description,
    image: s.image || null,
    cta1_label: s.cta1Label,
    cta1_href: s.cta1Href,
    cta2_label: s.cta2Label,
    cta2_href: s.cta2Href,
    sort_order: i,
  }));
  await supabase.from("slides").insert(rows);
}

// ── Services ─────────────────────────────────────────────────────────────────

export async function getServices(): Promise<ServiceItem[]> {
  const { data } = await supabase.from("services").select("*");
  if (!data || data.length === 0) {
    await setServices(defaultServices);
    return defaultServices;
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({ id: r.id, iconName: r.icon_name, title: r.title, description: r.description, href: r.href }));
}

export async function setServices(services: ServiceItem[]): Promise<void> {
  await supabase.from("services").delete().neq("id", "__none__");
  if (services.length === 0) return;
  await supabase.from("services").insert(
    services.map((s) => ({ id: s.id, icon_name: s.iconName, title: s.title, description: s.description, href: s.href }))
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase.from("testimonials").select("*");
  if (!data || data.length === 0) {
    await setTestimonials(defaultTestimonials);
    return defaultTestimonials;
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({ id: r.id, text: r.text, name: r.name, role: r.role, company: r.company }));
}

export async function setTestimonials(testimonials: Testimonial[]): Promise<void> {
  await supabase.from("testimonials").delete().neq("id", "__none__");
  if (testimonials.length === 0) return;
  await supabase.from("testimonials").insert(testimonials);
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export async function getStats(): Promise<StatItem[]> {
  const { data } = await supabase.from("stats").select("*");
  if (!data || data.length === 0) {
    await setStats(defaultStats);
    return defaultStats;
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({ id: r.id, value: r.value, label: r.label }));
}

export async function setStats(stats: StatItem[]): Promise<void> {
  await supabase.from("stats").delete().neq("id", "__none__");
  if (stats.length === 0) return;
  await supabase.from("stats").insert(stats);
}

// ── Settings (admin only — includes password, requires login session) ───────

export async function getSettings(): Promise<SiteSettings> {
  const data = await adminFetch("settings");
  return data.item as SiteSettings;
}

export async function setSettings(settings: SiteSettings): Promise<void> {
  await adminFetch("settings", { method: "PUT", body: JSON.stringify(settings) });
}

// ── Projects (الأعمال) ────────────────────────────────────────────────────────

export async function getProjects(): Promise<ProjectItem[]> {
  const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  if (!data || data.length === 0) {
    await setProjects(defaultProjects);
    return defaultProjects;
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({ id: r.id, title: r.title, description: r.description, category: r.category, city: r.city, slug: r.slug, image: r.image || undefined }));
}

export async function setProjects(projects: ProjectItem[]): Promise<void> {
  await supabase.from("projects").delete().neq("id", "__none__");
  if (projects.length === 0) return;
  await supabase.from("projects").insert(projects.map((p) => ({ id: p.id, title: p.title, description: p.description, category: p.category, city: p.city, slug: p.slug, image: p.image || null })));
}

export async function addProject(p: Omit<ProjectItem, "id">): Promise<void> {
  const id = Date.now().toString();
  await supabase.from("projects").insert({ id, title: p.title, description: p.description, category: p.category, city: p.city, slug: p.slug, image: p.image || null });
}

export async function deleteProject(id: string): Promise<void> {
  await supabase.from("projects").delete().eq("id", id);
}

// ── Blog posts (الأخبار) ──────────────────────────────────────────────────────

export async function getPosts(): Promise<BlogPost[]> {
  const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
  if (!data || data.length === 0) {
    await setPosts(defaultPosts);
    return defaultPosts;
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({ id: r.id, title: r.title, excerpt: r.excerpt, content: r.content, category: r.category, date: r.date, slug: r.slug, image: r.image || undefined }));
}

export async function setPosts(posts: BlogPost[]): Promise<void> {
  await supabase.from("posts").delete().neq("id", "__none__");
  if (posts.length === 0) return;
  await supabase.from("posts").insert(posts.map((p) => ({ id: p.id, title: p.title, excerpt: p.excerpt, content: p.content, category: p.category, date: p.date, slug: p.slug, image: p.image || null })));
}

export async function addPost(p: Omit<BlogPost, "id">): Promise<void> {
  const id = Date.now().toString();
  await supabase.from("posts").insert({ id, title: p.title, excerpt: p.excerpt, content: p.content, category: p.category, date: p.date, slug: p.slug, image: p.image || null });
}

export async function deletePost(id: string): Promise<void> {
  await supabase.from("posts").delete().eq("id", id);
}

// ── Activities (الأنشطة) ──────────────────────────────────────────────────────

export async function getActivities(): Promise<ActivityItem[]> {
  const { data } = await supabase.from("activities").select("*").order("created_at", { ascending: false });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((r: any) => ({ id: r.id, title: r.title, description: r.description, category: r.category, date: r.date, image: r.image || undefined }));
}

export async function setActivities(activities: ActivityItem[]): Promise<void> {
  await supabase.from("activities").delete().neq("id", "__none__");
  if (activities.length === 0) return;
  await supabase.from("activities").insert(activities.map((a) => ({ id: a.id, title: a.title, description: a.description, category: a.category, date: a.date, image: a.image || null })));
}

export async function addActivity(a: Omit<ActivityItem, "id">): Promise<void> {
  const id = Date.now().toString();
  await supabase.from("activities").insert({ id, title: a.title, description: a.description, category: a.category, date: a.date, image: a.image || null });
}

export async function deleteActivity(id: string): Promise<void> {
  await supabase.from("activities").delete().eq("id", id);
}

// ── Quotes (admin only) ───────────────────────────────────────────────────────

export async function getQuotes(): Promise<QuoteRequest[]> {
  const data = await adminFetch("quotes");
  return data.items as QuoteRequest[];
}

export async function addQuote(q: Omit<QuoteRequest, "id" | "status" | "createdAt">): Promise<void> {
  const id = Date.now().toString();
  await supabase.from("quotes").insert({
    id,
    name: q.name,
    phone: q.phone,
    email: q.email,
    activity: q.activity,
    fuel_type: q.fuelType,
    quantity: q.quantity,
    city: q.city,
    sensors: q.sensors,
    message: q.message,
    status: "new",
  });
}

export async function updateQuoteStatus(id: string, status: QuoteRequest["status"]): Promise<void> {
  await adminFetch("quotes", { method: "PUT", body: JSON.stringify({ id, status }) });
}

export async function deleteQuote(id: string): Promise<void> {
  await adminFetch("quotes", { method: "DELETE", body: JSON.stringify({ id }) });
}

// ── Messages (admin only for reading/managing) ───────────────────────────────

export async function getMessages(): Promise<ContactMessage[]> {
  const data = await adminFetch("messages");
  return data.items as ContactMessage[];
}

export async function addMessage(m: Omit<ContactMessage, "id" | "status" | "createdAt">): Promise<void> {
  const id = Date.now().toString();
  await supabase.from("messages").insert({ id, name: m.name, phone: m.phone, email: m.email, message: m.message, status: "new" });
}

export async function updateMessageStatus(id: string, status: ContactMessage["status"]): Promise<void> {
  await adminFetch("messages", { method: "PUT", body: JSON.stringify({ id, status }) });
}

export async function deleteMessage(id: string): Promise<void> {
  await adminFetch("messages", { method: "DELETE", body: JSON.stringify({ id }) });
}

export async function replyMessage(id: string, replyText: string): Promise<{ emailSent: boolean; emailError?: string }> {
  const data = await adminFetch("messages/reply", { method: "POST", body: JSON.stringify({ id, replyText }) });
  return { emailSent: !!data.emailSent, emailError: data.emailError };
}
