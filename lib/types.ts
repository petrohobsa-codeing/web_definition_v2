export interface HeroSlide {
  id: string;
  badge: string;
  heading: string;
  description: string;
  badgeEn?: string;
  headingEn?: string;
  descriptionEn?: string;
  cta1LabelEn?: string;
  cta2LabelEn?: string;
  image?: string;
  cta1Label: string;
  cta1Href: string;
  cta2Label: string;
  cta2Href: string;
}

export interface ServiceItem {
  id: string;
  iconName: "Fuel" | "Cpu" | "Flame" | "MonitorCheck" | "Droplets" | "Zap" | "Truck";
  image?: string;
  title: string;
  description: string;
  titleEn?: string;
  descriptionEn?: string;
  href: string;
}

export interface Testimonial {
  id: string;
  text: string;
  name: string;
  role: string;
  company: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  labelEn?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  slug: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  slug: string;
  image?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image?: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  activity: string;
  fuelType: string;
  quantity: string;
  city: string;
  sensors: string;
  message: string;
  status: "new" | "processed";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: "new" | "read";
  replyText?: string;
  repliedAt?: string;
  createdAt: string;
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  snapchat?: string;
}

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  cities: string;
  website: string;
  adminPassword?: string;
  socialLinks?: SocialLinks;
}


export interface MissionCard {
    id: string;
    title: string;
    description: string;
}

export interface RegionItem {
    id: string;
    name: string;
    nameEn?: string;
}

export interface NetworkCard {
    id: string;
    iconName: "Store" | "Truck" | "Building2";
    title: string;
    titleEn?: string;
}

export interface CredentialItem {
    id: string;
    iconName: "ShieldCheck" | "FileCheck2" | "Award" | "Headset";
    title: string;
    description: string;
    titleEn?: string;
    descriptionEn?: string;
}

export interface FaqItem {
    id: string;
    question: string;
    answer: string;
    questionEn?: string;
    answerEn?: string;
}


export interface ServiceDetailItem {
  id: string;
  slug: string;
  iconName: string;
  image?: string;
  title: string;
  intro: string;
  advantages: string[];
  value: string[];
  titleEn?: string;
  introEn?: string;
  advantagesEn?: string[];
  valueEn?: string[];
}


export interface AboutCompanyContent {
  photo: string;
  titleTop: string;
  titleBottom: string;
  eyebrow: string;
  headline: string;
  paragraph: string;
  since: string;
  visionLabel: string;
  visionText: string;
  missionLabel: string;
  missionText: string;
  titleTopEn?: string;
  titleBottomEn?: string;
  eyebrowEn?: string;
  headlineEn?: string;
  paragraphEn?: string;
  sinceEn?: string;
  visionLabelEn?: string;
  visionTextEn?: string;
  missionLabelEn?: string;
  missionTextEn?: string;
}

export interface FooterContent {
  tagline: string;
  heading: string;
  paragraph: string;
  closing: string;
  taglineEn?: string;
  headingEn?: string;
  paragraphEn?: string;
  closingEn?: string;
}

export interface ChallengeItem {
  id: string;
  titleAr: string;
  descAr: string;
  titleEn: string;
  descEn: string;
}

export interface ChallengesContent {
  badge: string;
  headline: string;
  subheading: string;
  paragraph: string;
  badgeEn?: string;
  headlineEn?: string;
  subheadingEn?: string;
  paragraphEn?: string;
  items: ChallengeItem[];
}

export interface OperatingStep {
  id: string;
  number: string;
  titleAr: string;
  descAr: string;
  titleEn: string;
  descEn: string;
}

export interface OperatingModelContent {
  badge: string;
  tagline: string;
  heading: string;
  paragraph: string;
  cycleLabel: string;
  badgeEn?: string;
  taglineEn?: string;
  headingEn?: string;
  paragraphEn?: string;
  cycleLabelEn?: string;
  steps: OperatingStep[];
}

export interface SectorCommitment {
  id: string;
  icon: string;
  titleAr: string;
  descAr: string;
  titleEn: string;
  descEn: string;
}

export interface SectorsContent {
  badge: string;
  heading: string;
  paragraph: string;
  teamsLabel: string;
  teamsText: string;
  coverageLabel: string;
  coverageText: string;
  commitLabel: string;
  sectorsAr: string[];
  sectorsEn: string[];
  badgeEn?: string;
  headingEn?: string;
  paragraphEn?: string;
  teamsLabelEn?: string;
  teamsTextEn?: string;
  coverageLabelEn?: string;
  coverageTextEn?: string;
  commitLabelEn?: string;
  commitments: SectorCommitment[];
}
