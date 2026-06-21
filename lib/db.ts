import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
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
import {
  defaultSlides,
  defaultServices,
  defaultTestimonials,
  defaultStats,
  defaultSettings,
  defaultProjects,
  defaultPosts,
} from "./store";

// ── Slides ───────────────────────────────────────────────────────────────────

export async function getSlides(): Promise<HeroSlide[]> {
  const snap = await getDocs(collection(db, "slides"));
  if (snap.empty) {
    for (const slide of defaultSlides) {
      await setDoc(doc(db, "slides", slide.id), slide);
    }
    return defaultSlides;
  }
  return snap.docs.map((d) => d.data() as HeroSlide);
}

export async function setSlides(slides: HeroSlide[]): Promise<void> {
  const snap = await getDocs(collection(db, "slides"));
  for (const d of snap.docs) await deleteDoc(d.ref);
  for (const slide of slides) await setDoc(doc(db, "slides", slide.id), slide);
}

// ── Services ─────────────────────────────────────────────────────────────────

export async function getServices(): Promise<ServiceItem[]> {
  const snap = await getDocs(collection(db, "services"));
  if (snap.empty) {
    for (const service of defaultServices) {
      await setDoc(doc(db, "services", service.id), service);
    }
    return defaultServices;
  }
  return snap.docs.map((d) => d.data() as ServiceItem);
}

export async function setServices(services: ServiceItem[]): Promise<void> {
  const snap = await getDocs(collection(db, "services"));
  for (const d of snap.docs) await deleteDoc(d.ref);
  for (const service of services) await setDoc(doc(db, "services", service.id), service);
}

// ── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  const snap = await getDocs(collection(db, "testimonials"));
  if (snap.empty) {
    for (const t of defaultTestimonials) {
      await setDoc(doc(db, "testimonials", t.id), t);
    }
    return defaultTestimonials;
  }
  return snap.docs.map((d) => d.data() as Testimonial);
}

export async function setTestimonials(testimonials: Testimonial[]): Promise<void> {
  const snap = await getDocs(collection(db, "testimonials"));
  for (const d of snap.docs) await deleteDoc(d.ref);
  for (const t of testimonials) await setDoc(doc(db, "testimonials", t.id), t);
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export async function getStats(): Promise<StatItem[]> {
  const snap = await getDoc(doc(db, "config", "stats"));
  if (!snap.exists()) {
    await setDoc(doc(db, "config", "stats"), { items: defaultStats });
    return defaultStats;
  }
  return (snap.data() as { items: StatItem[] }).items;
}

export async function setStats(stats: StatItem[]): Promise<void> {
  await setDoc(doc(db, "config", "stats"), { items: stats });
}

// ── Settings ─────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<SiteSettings> {
  const snap = await getDoc(doc(db, "config", "settings"));
  if (!snap.exists()) {
    await setDoc(doc(db, "config", "settings"), defaultSettings);
    // Cache password for auth
    if (typeof window !== "undefined") {
      localStorage.setItem("pn_cached_password", defaultSettings.adminPassword);
    }
    return defaultSettings;
  }
  const settings = snap.data() as SiteSettings;
  // Cache password for auth
  if (typeof window !== "undefined") {
    localStorage.setItem("pn_cached_password", settings.adminPassword);
  }
  return settings;
}

export async function setSettings(settings: SiteSettings): Promise<void> {
  await setDoc(doc(db, "config", "settings"), settings);
  // Update cache
  if (typeof window !== "undefined") {
    localStorage.setItem("pn_cached_password", settings.adminPassword);
  }
}

// ── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<ProjectItem[]> {
  const snap = await getDocs(collection(db, "projects"));
  if (snap.empty) {
    for (const project of defaultProjects) {
      await setDoc(doc(db, "projects", project.id), project);
    }
    return defaultProjects;
  }
  return snap.docs.map((d) => d.data() as ProjectItem);
}

export async function setProjects(projects: ProjectItem[]): Promise<void> {
  const snap = await getDocs(collection(db, "projects"));
  for (const d of snap.docs) await deleteDoc(d.ref);
  for (const project of projects) await setDoc(doc(db, "projects", project.id), project);
}

export async function addProject(p: Omit<ProjectItem, "id">): Promise<void> {
  const id = Date.now().toString();
  await setDoc(doc(db, "projects", id), { ...p, id });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

// ── Blog Posts ────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<BlogPost[]> {
  const snap = await getDocs(collection(db, "posts"));
  if (snap.empty) {
    for (const post of defaultPosts) {
      await setDoc(doc(db, "posts", post.id), post);
    }
    return defaultPosts;
  }
  return snap.docs.map((d) => d.data() as BlogPost);
}

export async function setPosts(posts: BlogPost[]): Promise<void> {
  const snap = await getDocs(collection(db, "posts"));
  for (const d of snap.docs) await deleteDoc(d.ref);
  for (const post of posts) await setDoc(doc(db, "posts", post.id), post);
}

export async function addPost(p: Omit<BlogPost, "id">): Promise<void> {
  const id = Date.now().toString();
  await setDoc(doc(db, "posts", id), { ...p, id });
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, "posts", id));
}

// ── Quotes ────────────────────────────────────────────────────────────────────

export async function getQuotes(): Promise<QuoteRequest[]> {
  const snap = await getDocs(collection(db, "quotes"));
  return snap.docs.map((d) => d.data() as QuoteRequest);
}

export async function addQuote(q: Omit<QuoteRequest, "id" | "status" | "createdAt">): Promise<void> {
  const id = Date.now().toString();
  const item: QuoteRequest = { ...q, id, status: "new", createdAt: new Date().toISOString() };
  await setDoc(doc(db, "quotes", id), item);
}

export async function updateQuoteStatus(id: string, status: QuoteRequest["status"]): Promise<void> {
  await updateDoc(doc(db, "quotes", id), { status });
}

export async function deleteQuote(id: string): Promise<void> {
  await deleteDoc(doc(db, "quotes", id));
}

// ── Messages ──────────────────────────────────────────────────────────────────

export async function getMessages(): Promise<ContactMessage[]> {
  const snap = await getDocs(collection(db, "messages"));
  return snap.docs.map((d) => d.data() as ContactMessage);
}

export async function addMessage(m: Omit<ContactMessage, "id" | "status" | "createdAt">): Promise<void> {
  const id = Date.now().toString();
  const item: ContactMessage = { ...m, id, status: "new", createdAt: new Date().toISOString() };
  await setDoc(doc(db, "messages", id), item);
}

export async function updateMessageStatus(id: string, status: ContactMessage["status"]): Promise<void> {
  await updateDoc(doc(db, "messages", id), { status });
}

export async function deleteMessage(id: string): Promise<void> {
  await deleteDoc(doc(db, "messages", id));
}
