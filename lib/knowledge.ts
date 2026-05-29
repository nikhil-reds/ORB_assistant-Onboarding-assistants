export type SitePage = {
  slug: string;          // "/services/web-design"
  title: string;
  summary: string;       // 1–2 sentences
  keywords: string[];    // helps retrieval & guides the model
  content: string;       // full text the model can quote
};

export type FAQ = { q: string; a: string };

export const company = {
  name: "Rubenius",
  tagline: "Design & development studio",
  location: "India",
  contact: {
    email: "hello@rubenius.in",
    website: "https://www.rubenius.in",
  },
};

export const pageIndex: SitePage[] = [
  {
    slug: "/",
    title: "Home",
    summary: "Overview of Rubenius — studio focused on design + dev.",
    keywords: ["home", "studio", "overview"],
    content: `Rubenius is a design and development studio that...`,
  },
  {
    slug: "/services",
    title: "Services",
    summary: "Branding, web design, web development, motion.",
    keywords: ["services", "offerings", "what we do"],
    content: `We offer branding, web design, web development...`,
  },
  {
    slug: "/work",
    title: "Work",
    summary: "Selected client projects and case studies.",
    keywords: ["portfolio", "case studies", "projects"],
    content: `Selected projects include...`,
  },
  {
    slug: "/contact",
    title: "Contact",
    summary: "How to reach the team.",
    keywords: ["contact", "reach", "email"],
    content: `Email hello@rubenius.in or use the form on /contact.`,
  },
];

export const faqs: FAQ[] = [
  { q: "What services do you offer?", a: "Branding, web design, web dev, motion." },
  { q: "How long does a project take?", a: "Typically 4–8 weeks depending on scope." },
];


