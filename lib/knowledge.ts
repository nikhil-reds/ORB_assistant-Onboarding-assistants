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


// export type SitePage = {
//   slug: string;
//   title: string;
//   summary: string;
//   keywords: string[];
//   content: string;
// };

// export type FAQ = {
//   q: string;
//   a: string;
// };

// export const company = {
//   name: "Future City TG",
//   tagline: "Future-ready urban development and real estate platform",
//   location: "Telangana, India",
//   contact: {
//     website: "https://futurecitytg.in",
//   },
// };

// export const pageIndex: SitePage[] = [
//   {
//     slug: "/",
//     title: "Home",
//     summary:
//       "Overview of Future City TG and its vision for modern urban development in Telangana.",
//     keywords: [
//       "future city",
//       "telangana",
//       "urban development",
//       "smart city",
//       "real estate",
//     ],
//     content: `
// Future City TG is focused on future-ready urban infrastructure, smart development,
// modern planning, and sustainable growth across Telangana.

// The platform highlights visionary projects, infrastructure opportunities,
// investment potential, and next-generation city development initiatives.
//     `,
//   },

//   {
//     slug: "/about",
//     title: "About",
//     summary:
//       "Learn about the mission, vision, and development goals of Future City TG.",
//     keywords: [
//       "about",
//       "mission",
//       "vision",
//       "future infrastructure",
//       "smart development",
//     ],
//     content: `
// Future City TG aims to transform urban experiences through innovation,
// infrastructure modernization, sustainability, and strategic planning.

// The initiative focuses on creating connected, intelligent, and livable cities.
//     `,
//   },

//   {
//     slug: "/projects",
//     title: "Projects",
//     summary:
//       "Explore infrastructure, urban planning, and smart city projects.",
//     keywords: [
//       "projects",
//       "smart city projects",
//       "infrastructure",
//       "urban planning",
//       "development",
//     ],
//     content: `
// Future City TG showcases modern infrastructure initiatives,
// smart urban projects, mobility systems, commercial development,
// and future-ready residential ecosystems.
//     `,
//   },

//   {
//     slug: "/investment",
//     title: "Investment Opportunities",
//     summary:
//       "Information about real estate, infrastructure, and future investment opportunities.",
//     keywords: [
//       "investment",
//       "real estate",
//       "future city investment",
//       "property",
//       "development opportunities",
//     ],
//     content: `
// The platform highlights strategic investment opportunities
// across real estate, infrastructure, commercial growth,
// and urban expansion initiatives in Telangana.
//     `,
//   },

//   {
//     slug: "/contact",
//     title: "Contact",
//     summary:
//       "Reach out to Future City TG for inquiries and partnerships.",
//     keywords: [
//       "contact",
//       "support",
//       "partnership",
//       "future city tg",
//     ],
//     content: `
// Visitors can connect with the Future City TG team
// through the official website for inquiries,
// collaborations, and project-related information.
//     `,
//   },
// ];

// export const faqs: FAQ[] = [
//   {
//     q: "What is Future City TG?",
//     a: "Future City TG is a platform focused on smart urban development and future-ready infrastructure initiatives in Telangana.",
//   },

//   {
//     q: "What kind of projects are featured?",
//     a: "The platform features smart city projects, infrastructure development, mobility systems, and urban planning initiatives.",
//   },

//   {
//     q: "Does Future City TG provide investment opportunities?",
//     a: "Yes, the platform highlights future-focused investment and development opportunities across real estate and infrastructure sectors.",
//   },

//   {
//     q: "Where is Future City TG located?",
//     a: "Future City TG is based in Telangana, India.",
//   },
// ];