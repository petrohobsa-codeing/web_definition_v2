import { supabase } from "./supabaseClient";
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
  ActivityItem,
    MissionCard,
    RegionItem,
    NetworkCard,
    CredentialItem,
    FaqItem,
    AboutCompanyContent,
    FooterContent,
    ChallengesContent,
    OperatingModelContent,
    SectorsContent,
} from "./types";
import {
  defaultSlides,
  defaultServices,
  defaultTestimonials,
  defaultStats,
  defaultProjects,
  defaultPosts,
    defaultMissionCards,
    defaultRegions,
    defaultNetworkCards,
    defaultCredentials,
    defaultFaqs,
  defaultServiceDetails,
  defaultAboutCompany,
  defaultFooterContent,
  defaultChallengesContent,
  defaultOperatingModelContent,
  defaultSectorsContent,
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
    badgeEn: r.badge_en || undefined,
    headingEn: r.heading_en || undefined,
    descriptionEn: r.description_en || undefined,
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
  return data.map((r: any) => ({
    id: r.id,
    iconName: r.icon_name,
    image: r.image || undefined,
    title: r.title,
    description: r.description,
    titleEn: r.title_en || undefined,
    descriptionEn: r.description_en || undefined,
    href: r.href,
  }));
}

export async function setServices(services: ServiceItem[]): Promise<void> {
  await supabase.from("services").delete().neq("id", "__none__");
  if (services.length === 0) return;
  await supabase.from("services").insert(
    services.map((s) => ({
      id: s.id,
      icon_name: s.iconName,
      image: s.image || null,
      title: s.title,
      description: s.description,
      title_en: s.titleEn || null,
      description_en: s.descriptionEn || null,
      href: s.href,
    }))
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
    const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(q),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "فشل حفظ الطلب");
    }
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


// ── Mission / Vision / Story ─────────────────────────────────────────────────

export async function getMissionCards(): Promise<MissionCard[]> {
    const { data } = await supabase.from("mission_cards").select("*").order("sort_order", { ascending: true });
    if (!data || data.length === 0) {
          await setMissionCards(defaultMissionCards);
          return defaultMissionCards;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({ id: r.id, title: r.title, description: r.description }));
}

export async function setMissionCards(items: MissionCard[]): Promise<void> {
    await supabase.from("mission_cards").delete().neq("id", "__none__");
    if (items.length === 0) return;
    await supabase.from("mission_cards").insert(
          items.map((m, i) => ({ id: m.id, title: m.title, description: m.description, sort_order: i }))
        );
}

// ── Coverage regions ──────────────────────────────────────────────────────────

export async function getRegions(): Promise<RegionItem[]> {
    const { data } = await supabase.from("regions").select("*").order("sort_order", { ascending: true });
    if (!data || data.length === 0) {
          await setRegions(defaultRegions);
          return defaultRegions;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({ id: r.id, name: r.name }));
}

export async function setRegions(items: RegionItem[]): Promise<void> {
    await supabase.from("regions").delete().neq("id", "__none__");
    if (items.length === 0) return;
    await supabase.from("regions").insert(
          items.map((r, i) => ({ id: r.id, name: r.name, sort_order: i }))
        );
}

// ── Extensive network cards ───────────────────────────────────────────────────

export async function getNetworkCards(): Promise<NetworkCard[]> {
    const { data } = await supabase.from("network_cards").select("*").order("sort_order", { ascending: true });
    if (!data || data.length === 0) {
          await setNetworkCards(defaultNetworkCards);
          return defaultNetworkCards;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({ id: r.id, iconName: r.icon_name, title: r.title }));
}

export async function setNetworkCards(items: NetworkCard[]): Promise<void> {
    await supabase.from("network_cards").delete().neq("id", "__none__");
    if (items.length === 0) return;
    await supabase.from("network_cards").insert(
          items.map((n, i) => ({ id: n.id, icon_name: n.iconName, title: n.title, sort_order: i }))
        );
}

// ── Credentials ────────────────────────────────────────────────────────────────

export async function getCredentials(): Promise<CredentialItem[]> {
    const { data } = await supabase.from("credentials").select("*").order("sort_order", { ascending: true });
    if (!data || data.length === 0) {
          await setCredentials(defaultCredentials);
          return defaultCredentials;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({ id: r.id, iconName: r.icon_name, title: r.title, description: r.description }));
}

export async function setCredentials(items: CredentialItem[]): Promise<void> {
    await supabase.from("credentials").delete().neq("id", "__none__");
    if (items.length === 0) return;
    await supabase.from("credentials").insert(
          items.map((c, i) => ({ id: c.id, icon_name: c.iconName, title: c.title, description: c.description, sort_order: i }))
        );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

export async function getFaqs(): Promise<FaqItem[]> {
    const { data } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
    if (!data || data.length === 0) {
          await setFaqs(defaultFaqs);
          return defaultFaqs;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({ id: r.id, question: r.question, answer: r.answer }));
}

export async function setFaqs(items: FaqItem[]): Promise<void> {
    await supabase.from("faqs").delete().neq("id", "__none__");
    if (items.length === 0) return;
    await supabase.from("faqs").insert(
          items.map((f, i) => ({ id: f.id, question: f.question, answer: f.answer, sort_order: i }))
        );
}


// ── Service details (تفاصيل الخدمات) ──────────────────────────────────────────

export async function getServiceDetails(): Promise<ServiceDetailItem[]> {
    const { data } = await supabase.from("service_details").select("*").order("sort_order", { ascending: true });
    if (!data || data.length === 0) {
          await setServiceDetails(defaultServiceDetails);
          return defaultServiceDetails;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((r: any) => ({
    id: r.id,
    slug: r.slug,
    iconName: r.icon_name,
    image: r.image || undefined,
    title: r.title,
    intro: r.intro,
    advantages: r.advantages || [],
    value: r.value || [],
    titleEn: r.title_en || undefined,
    introEn: r.intro_en || undefined,
    advantagesEn: r.advantages_en || undefined,
    valueEn: r.value_en || undefined,
  }));
}

export async function setServiceDetails(items: ServiceDetailItem[]): Promise<void> {
    await supabase.from("service_details").delete().neq("id", "__none__");
    if (items.length === 0) return;
    await supabase.from("service_details").insert(
          items.map((s, i) => ({
            id: s.id,
            slug: s.slug,
            icon_name: s.iconName,
            image: s.image || null,
            title: s.title,
            intro: s.intro,
            advantages: s.advantages,
            value: s.value,
            title_en: s.titleEn || null,
            intro_en: s.introEn || null,
            advantages_en: s.advantagesEn || null,
            value_en: s.valueEn || null,
            sort_order: i,
          }))
        );
}


// ── About the company card (عن الشركة) ────────────────────────────────────────

export async function getAboutCompany(): Promise<AboutCompanyContent> {
  const { data } = await supabase.from("about_company").select("*").eq("id", "main").maybeSingle();
  if (!data) {
    await setAboutCompany(defaultAboutCompany);
    return defaultAboutCompany;
  }
  return {
    photo: data.photo || defaultAboutCompany.photo,
    titleTop: data.title_top || "",
    titleBottom: data.title_bottom || "",
    eyebrow: data.eyebrow || "",
    headline: data.headline || "",
    paragraph: data.paragraph || "",
    since: data.since_label || "",
    visionLabel: data.vision_label || "",
    visionText: data.vision_text || "",
    missionLabel: data.mission_label || "",
    missionText: data.mission_text || "",
    titleTopEn: data.title_top_en || undefined,
    titleBottomEn: data.title_bottom_en || undefined,
    eyebrowEn: data.eyebrow_en || undefined,
    headlineEn: data.headline_en || undefined,
    paragraphEn: data.paragraph_en || undefined,
    sinceEn: data.since_label_en || undefined,
    visionLabelEn: data.vision_label_en || undefined,
    visionTextEn: data.vision_text_en || undefined,
    missionLabelEn: data.mission_label_en || undefined,
    missionTextEn: data.mission_text_en || undefined,
  };
}

export async function setAboutCompany(content: AboutCompanyContent): Promise<void> {
  await supabase.from("about_company").upsert({
    id: "main",
    photo: content.photo || null,
    title_top: content.titleTop,
    title_bottom: content.titleBottom,
    eyebrow: content.eyebrow,
    headline: content.headline,
    paragraph: content.paragraph,
    since_label: content.since,
    vision_label: content.visionLabel,
    vision_text: content.visionText,
    mission_label: content.missionLabel,
    mission_text: content.missionText,
    title_top_en: content.titleTopEn || null,
    title_bottom_en: content.titleBottomEn || null,
    eyebrow_en: content.eyebrowEn || null,
    headline_en: content.headlineEn || null,
    paragraph_en: content.paragraphEn || null,
    since_label_en: content.sinceEn || null,
    vision_label_en: content.visionLabelEn || null,
    vision_text_en: content.visionTextEn || null,
    mission_label_en: content.missionLabelEn || null,
    mission_text_en: content.missionTextEn || null,
  });
}

// ── Footer content ────────────────────────────────────────────────────────────

export async function getFooterContent(): Promise<FooterContent> {
  const { data } = await supabase.from("footer_content").select("*").eq("id", "main").maybeSingle();
  if (!data) {
    await setFooterContent(defaultFooterContent);
    return defaultFooterContent;
  }
  return {
    tagline: data.tagline || defaultFooterContent.tagline,
    heading: data.heading || defaultFooterContent.heading,
    paragraph: data.paragraph || defaultFooterContent.paragraph,
    closing: data.closing || defaultFooterContent.closing,
    taglineEn: data.tagline_en || undefined,
    headingEn: data.heading_en || undefined,
    paragraphEn: data.paragraph_en || undefined,
    closingEn: data.closing_en || undefined,
  };
}

export async function setFooterContent(content: FooterContent): Promise<void> {
  await supabase.from("footer_content").upsert({
    id: "main",
    tagline: content.tagline,
    heading: content.heading,
    paragraph: content.paragraph,
    closing: content.closing,
    tagline_en: content.taglineEn || null,
    heading_en: content.headingEn || null,
    paragraph_en: content.paragraphEn || null,
    closing_en: content.closingEn || null,
  });
}

// ── Challenges content ────────────────────────────────────────────────────────

export async function getChallengesContent(): Promise<ChallengesContent> {
  const { data } = await supabase.from("challenges_content").select("*").eq("id", "main").maybeSingle();
  if (!data) {
    await setChallengesContent(defaultChallengesContent);
    return defaultChallengesContent;
  }
  return {
    badge: data.badge || defaultChallengesContent.badge,
    headline: data.headline || defaultChallengesContent.headline,
    subheading: data.subheading || defaultChallengesContent.subheading,
    paragraph: data.paragraph || defaultChallengesContent.paragraph,
    badgeEn: data.badge_en || undefined,
    headlineEn: data.headline_en || undefined,
    subheadingEn: data.subheading_en || undefined,
    paragraphEn: data.paragraph_en || undefined,
    items: data.items || defaultChallengesContent.items,
  };
}

export async function setChallengesContent(content: ChallengesContent): Promise<void> {
  await supabase.from("challenges_content").upsert({
    id: "main",
    badge: content.badge,
    headline: content.headline,
    subheading: content.subheading,
    paragraph: content.paragraph,
    badge_en: content.badgeEn || null,
    headline_en: content.headlineEn || null,
    subheading_en: content.subheadingEn || null,
    paragraph_en: content.paragraphEn || null,
    items: content.items,
  });
}

// ── Operating Model content ───────────────────────────────────────────────────

export async function getOperatingModelContent(): Promise<OperatingModelContent> {
  const { data } = await supabase.from("operating_model").select("*").eq("id", "main").maybeSingle();
  if (!data) {
    await setOperatingModelContent(defaultOperatingModelContent);
    return defaultOperatingModelContent;
  }
  return {
    badge: data.badge || defaultOperatingModelContent.badge,
    tagline: data.tagline || defaultOperatingModelContent.tagline,
    heading: data.heading || defaultOperatingModelContent.heading,
    paragraph: data.paragraph || defaultOperatingModelContent.paragraph,
    cycleLabel: data.cycle_label || defaultOperatingModelContent.cycleLabel,
    badgeEn: data.badge_en || undefined,
    taglineEn: data.tagline_en || undefined,
    headingEn: data.heading_en || undefined,
    paragraphEn: data.paragraph_en || undefined,
    cycleLabelEn: data.cycle_label_en || undefined,
    steps: data.steps || defaultOperatingModelContent.steps,
  };
}

export async function setOperatingModelContent(content: OperatingModelContent): Promise<void> {
  await supabase.from("operating_model").upsert({
    id: "main",
    badge: content.badge,
    tagline: content.tagline,
    heading: content.heading,
    paragraph: content.paragraph,
    cycle_label: content.cycleLabel,
    badge_en: content.badgeEn || null,
    tagline_en: content.taglineEn || null,
    heading_en: content.headingEn || null,
    paragraph_en: content.paragraphEn || null,
    cycle_label_en: content.cycleLabelEn || null,
    steps: content.steps,
  });
}

// ── Sectors content ───────────────────────────────────────────────────────────

export async function getSectorsContent(): Promise<SectorsContent> {
  const { data } = await supabase.from("sectors_content").select("*").eq("id", "main").maybeSingle();
  if (!data) {
    await setSectorsContent(defaultSectorsContent);
    return defaultSectorsContent;
  }
  return {
    badge: data.badge || defaultSectorsContent.badge,
    heading: data.heading || defaultSectorsContent.heading,
    paragraph: data.paragraph || defaultSectorsContent.paragraph,
    teamsLabel: data.teams_label || defaultSectorsContent.teamsLabel,
    teamsText: data.teams_text || defaultSectorsContent.teamsText,
    coverageLabel: data.coverage_label || defaultSectorsContent.coverageLabel,
    coverageText: data.coverage_text || defaultSectorsContent.coverageText,
    commitLabel: data.commit_label || defaultSectorsContent.commitLabel,
    sectorsAr: data.sectors_ar || defaultSectorsContent.sectorsAr,
    sectorsEn: data.sectors_en || defaultSectorsContent.sectorsEn,
    badgeEn: data.badge_en || undefined,
    headingEn: data.heading_en || undefined,
    paragraphEn: data.paragraph_en || undefined,
    teamsLabelEn: data.teams_label_en || undefined,
    teamsTextEn: data.teams_text_en || undefined,
    coverageLabelEn: data.coverage_label_en || undefined,
    coverageTextEn: data.coverage_text_en || undefined,
    commitLabelEn: data.commit_label_en || undefined,
    commitments: data.commitments || defaultSectorsContent.commitments,
  };
}

export async function setSectorsContent(content: SectorsContent): Promise<void> {
  await supabase.from("sectors_content").upsert({
    id: "main",
    badge: content.badge,
    heading: content.heading,
    paragraph: content.paragraph,
    teams_label: content.teamsLabel,
    teams_text: content.teamsText,
    coverage_label: content.coverageLabel,
    coverage_text: content.coverageText,
    commit_label: content.commitLabel,
    sectors_ar: content.sectorsAr,
    sectors_en: content.sectorsEn,
    badge_en: content.badgeEn || null,
    heading_en: content.headingEn || null,
    paragraph_en: content.paragraphEn || null,
    teams_label_en: content.teamsLabelEn || null,
    teams_text_en: content.teamsTextEn || null,
    coverage_label_en: content.coverageLabelEn || null,
    coverage_text_en: content.coverageTextEn || null,
    commit_label_en: content.commitLabelEn || null,
    commitments: content.commitments,
  });
}
